#!/usr/bin/env node

/**
 * Scraper con Playwright para D&D Tools SRD
 * Evita bloqueos 403 usando un navegador real
 *
 * Uso:
 *   node scripts/scraper/playwright-scraper.mjs --category classes
 *   node scripts/scraper/playwright-scraper.mjs --url "https://srd.dndtools.org/srd/classes/baseCore/barbarian.html"
 */

import { chromium } from 'playwright';
import { BASE_URL, CATEGORIES } from './config.mjs';
import { Logger, RateLimiter, saveJSON, saveHTML, generateStats, ensureDir, createSlug } from './utils.mjs';
import { sleep } from './utils.mjs';

const logger = new Logger('playwright-scraper');
const rateLimiter = new RateLimiter(2000); // 2 segundos entre páginas

/**
 * Extrae links de una página
 */
async function extractLinks(page) {
  return await page.evaluate(() => {
    const links = [];
    const anchors = document.querySelectorAll('a[href]');

    anchors.forEach(a => {
      const url = a.href;
      const text = a.textContent.trim();

      if (url.includes('srd.dndtools.org/srd/')) {
        links.push({ url, text });
      }
    });

    return links;
  });
}

/**
 * Extrae contenido de una página
 */
async function extractContent(page) {
  return await page.evaluate(() => {
    const result = {
      title: '',
      content: '',
      tables: [],
      lists: []
    };

    // Título
    const titleEl = document.querySelector('h1, .title, .page-title');
    if (titleEl) {
      result.title = titleEl.textContent.trim();
    }

    // Contenido principal
    const contentEl = document.querySelector('#content, .content, main, article');
    if (contentEl) {
      result.content = contentEl.innerHTML;
    }

    // Tablas
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
      const rows = [];
      const trs = table.querySelectorAll('tr');

      trs.forEach(tr => {
        const row = [];
        const cells = tr.querySelectorAll('th, td');

        cells.forEach(cell => {
          row.push(cell.textContent.trim());
        });

        if (row.length > 0) {
          rows.push(row);
        }
      });

      if (rows.length > 0) {
        result.tables.push(rows);
      }
    });

    // Listas
    const lists = document.querySelectorAll('ul, ol');
    lists.forEach(list => {
      const items = [];
      const lis = list.querySelectorAll('li');

      lis.forEach(li => {
        items.push(li.textContent.trim());
      });

      if (items.length > 0) {
        result.lists.push(items);
      }
    });

    return result;
  });
}

/**
 * Scrapea una URL individual
 */
async function scrapeUrl(browser, url) {
  const page = await browser.newPage();

  try {
    logger.info(`Scraping: ${url}`);

    // Navegar a la URL
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    // Esperar que el contenido cargue
    await page.waitForSelector('body', { timeout: 10000 });

    // Extraer datos
    const content = await extractContent(page);
    const links = await extractLinks(page);
    const html = await page.content();

    logger.success(`✓ Scraped: ${url}`);

    return {
      success: true,
      url,
      title: content.title,
      content: content.content,
      tables: content.tables,
      lists: content.lists,
      links,
      html
    };

  } catch (error) {
    logger.error(`Error scraping ${url}: ${error.message}`);

    return {
      success: false,
      url,
      error: error.message
    };

  } finally {
    await page.close();
  }
}

/**
 * Scrapea una categoría completa
 */
async function scrapeCategory(categoryKey) {
  const categoryUrl = CATEGORIES[categoryKey.toUpperCase()];

  if (!categoryUrl) {
    logger.error(`Category not found: ${categoryKey}`);
    return;
  }

  const fullUrl = `${BASE_URL}${categoryUrl}`;

  logger.info(`Starting Playwright scrape of category: ${categoryKey}`);
  logger.info(`URL: ${fullUrl}`);

  // Lanzar navegador
  logger.info('Launching browser...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // Scrapear página principal
    logger.info('Scraping main page...');
    const mainPage = await scrapeUrl(browser, fullUrl);

    if (!mainPage.success) {
      logger.error('Failed to scrape main page');
      return;
    }

    // Filtrar links relevantes
    const relevantLinks = mainPage.links.filter(link =>
      link.url.includes(categoryUrl) &&
      link.url !== fullUrl &&
      !link.url.includes('#') &&
      !link.url.includes('?')
    );

    // Eliminar duplicados
    const uniqueUrls = [...new Set(relevantLinks.map(l => l.url))];

    logger.info(`Found ${uniqueUrls.length} unique pages to scrape`);

    // Scrapear todas las páginas
    const results = [mainPage];

    for (const url of uniqueUrls) {
      await rateLimiter.waitIfNeeded();

      const result = await scrapeUrl(browser, url);
      results.push(result);

      // Log progreso
      const completed = results.length;
      const total = uniqueUrls.length + 1;
      const successCount = results.filter(r => r.success).length;

      logger.info(`Progress: ${completed}/${total} (${successCount} successful)`);
    }

    // Guardar resultados
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `${categoryKey}-${timestamp}.json`;

    saveJSON(results, categoryKey, filename);

    logger.success(`Saved ${results.length} items to ${filename}`);

    // Guardar estadísticas
    const stats = generateStats(results);
    saveJSON(stats, 'logs', `stats-${categoryKey}-${timestamp}.json`);

    logger.success(`Scraping complete for category: ${categoryKey}`);
    logger.info(`Success: ${stats.successful}/${stats.total}`);
    logger.info(`Failed: ${stats.failed}/${stats.total}`);

    return results;

  } finally {
    await browser.close();
    logger.info('Browser closed');
  }
}

/**
 * Scrapea múltiples URLs específicas
 */
async function scrapeUrls(urls) {
  logger.info(`Scraping ${urls.length} URLs`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const results = [];

    for (const url of urls) {
      await rateLimiter.waitIfNeeded();

      const result = await scrapeUrl(browser, url);
      results.push(result);

      logger.info(`Progress: ${results.length}/${urls.length}`);
    }

    // Guardar resultados
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `custom-urls-${timestamp}.json`;

    saveJSON(results, 'raw', filename);

    logger.success(`Saved ${results.length} items to ${filename}`);

    return results;

  } finally {
    await browser.close();
  }
}

/**
 * Parsea argumentos
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    category: null,
    urls: []
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--category' && args[i + 1]) {
      options.category = args[i + 1];
      i++;
    } else if (args[i] === '--url' && args[i + 1]) {
      options.urls.push(args[i + 1]);
      i++;
    } else if (args[i] === '--urls' && args[i + 1]) {
      // Lista de URLs separadas por coma
      options.urls = args[i + 1].split(',');
      i++;
    }
  }

  return options;
}

/**
 * Main
 */
async function main() {
  logger.init();
  logger.info('='.repeat(60));
  logger.info('D&D Tools SRD Playwright Scraper');
  logger.info('='.repeat(60));

  // Crear directorios
  ensureDir('./scraped-data');

  const options = parseArgs();

  if (!options.category && options.urls.length === 0) {
    logger.error('Please specify --category or --url(s)');
    logger.info('\nUsage:');
    logger.info('  node scripts/scraper/playwright-scraper.mjs --category classes_base');
    logger.info('  node scripts/scraper/playwright-scraper.mjs --url "https://..."');
    logger.info('  node scripts/scraper/playwright-scraper.mjs --urls "url1,url2,url3"');
    logger.info('\nAvailable categories:');
    Object.keys(CATEGORIES).forEach(key => {
      logger.info(`  - ${key.toLowerCase()}`);
    });
    process.exit(1);
  }

  try {
    if (options.category) {
      await scrapeCategory(options.category);
    } else if (options.urls.length > 0) {
      await scrapeUrls(options.urls);
    }

    logger.success('Scraping completed successfully');

  } catch (error) {
    logger.error(`Fatal error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Ejecutar
main();
