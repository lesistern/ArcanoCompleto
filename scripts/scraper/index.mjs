#!/usr/bin/env node

/**
 * Scraper Principal para D&D Tools SRD
 * https://srd.dndtools.org/
 *
 * Uso:
 *   node scripts/scraper/index.mjs --category classes
 *   node scripts/scraper/index.mjs --category all
 *   node scripts/scraper/index.mjs --url "https://srd.dndtools.org/srd/classes/baseCore"
 */

import { BASE_URL, CATEGORIES, OUTPUT_DIRS } from './config.mjs';
import { Logger, RateLimiter, extractLinks, saveJSON, saveHTML, generateStats, ensureDir } from './utils.mjs';
import { fetchWithRetry, fetchBatch } from './fetcher.mjs';

const logger = new Logger('scraper');
const rateLimiter = new RateLimiter();

/**
 * Parsea argumentos de línea de comandos
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    category: null,
    url: null,
    parallel: false,
    saveRaw: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--category' && args[i + 1]) {
      options.category = args[i + 1];
      i++;
    } else if (args[i] === '--url' && args[i + 1]) {
      options.url = args[i + 1];
      i++;
    } else if (args[i] === '--parallel') {
      options.parallel = true;
    } else if (args[i] === '--save-raw') {
      options.saveRaw = true;
    }
  }

  return options;
}

/**
 * Scrapea una categoría completa
 */
async function scrapeCategory(categoryKey) {
  const categoryUrl = CATEGORIES[categoryKey.toUpperCase()];

  if (!categoryUrl) {
    logger.error(`Category not found: ${categoryKey}`);
    logger.info('Available categories:');
    Object.keys(CATEGORIES).forEach(key => {
      logger.info(`  - ${key.toLowerCase()}`);
    });
    return;
  }

  const fullUrl = `${BASE_URL}${categoryUrl}`;

  logger.info(`Starting scrape of category: ${categoryKey}`);
  logger.info(`URL: ${fullUrl}`);

  // Fetch la página principal
  const response = await fetchWithRetry(fullUrl);

  if (!response.success) {
    logger.error(`Failed to fetch category page: ${response.error}`);
    return;
  }

  // Extraer todos los links
  const links = extractLinks(response.data, BASE_URL);

  logger.info(`Found ${links.length} links in category ${categoryKey}`);

  // Filtrar solo links del SRD
  const srdLinks = links.filter(link =>
    link.url.includes('/srd/') && link.url.includes(categoryUrl)
  );

  logger.info(`Filtered to ${srdLinks.length} SRD links`);

  // Fetch todos los links
  const urls = srdLinks.map(link => link.url);
  const results = await fetchBatch(urls, rateLimiter);

  // Procesar y guardar resultados
  const processedData = results.map((result, index) => {
    if (!result.success) {
      return {
        url: result.url,
        success: false,
        error: result.error
      };
    }

    const linkInfo = srdLinks[index];

    return {
      url: result.url,
      title: linkInfo.text,
      html: result.data,
      success: true,
      category: categoryKey
    };
  });

  // Guardar datos
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const filename = `${categoryKey}-${timestamp}.json`;

  saveJSON(processedData, categoryKey, filename);

  logger.success(`Saved ${processedData.length} items to ${filename}`);

  // Guardar estadísticas
  const stats = generateStats(processedData);
  saveJSON(stats, 'logs', `stats-${categoryKey}-${timestamp}.json`);

  logger.success(`Scraping complete for category: ${categoryKey}`);
  logger.info(`Success: ${stats.successful}/${stats.total}`);
  logger.info(`Failed: ${stats.failed}/${stats.total}`);

  return processedData;
}

/**
 * Scrapea una URL individual
 */
async function scrapeUrl(url) {
  logger.info(`Scraping single URL: ${url}`);

  const response = await fetchWithRetry(url);

  if (!response.success) {
    logger.error(`Failed to fetch URL: ${response.error}`);
    return;
  }

  // Extraer links de la página
  const links = extractLinks(response.data, BASE_URL);

  logger.info(`Found ${links.length} links`);

  // Guardar HTML raw
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const filename = `single-page-${timestamp}.html`;

  saveHTML(response.data, 'raw', filename);

  logger.success(`Saved HTML to ${filename}`);

  // Guardar links como JSON
  const linksFilename = `links-${timestamp}.json`;
  saveJSON(links, 'raw', linksFilename);

  logger.success(`Saved ${links.length} links to ${linksFilename}`);

  return {
    html: response.data,
    links
  };
}

/**
 * Scrapea todas las categorías
 */
async function scrapeAll() {
  logger.info('Starting FULL scrape of all categories');

  const categoryKeys = Object.keys(CATEGORIES).filter(key => key !== 'BOOKS');

  for (const categoryKey of categoryKeys) {
    logger.info(`\n=== Processing category: ${categoryKey} ===\n`);

    try {
      await scrapeCategory(categoryKey);
    } catch (error) {
      logger.error(`Error scraping category ${categoryKey}: ${error.message}`);
    }

    logger.info(`\n=== Finished category: ${categoryKey} ===\n`);
  }

  logger.success('FULL SCRAPE COMPLETE');
}

/**
 * Función principal
 */
async function main() {
  logger.init();
  logger.info('='.repeat(60));
  logger.info('D&D Tools SRD Scraper');
  logger.info('='.repeat(60));

  // Crear directorios de salida
  Object.values(OUTPUT_DIRS).forEach(dir => ensureDir(dir));

  const options = parseArgs();

  if (!options.category && !options.url) {
    logger.error('Please specify --category or --url');
    logger.info('\nUsage:');
    logger.info('  node scripts/scraper/index.mjs --category classes');
    logger.info('  node scripts/scraper/index.mjs --category all');
    logger.info('  node scripts/scraper/index.mjs --url "https://srd.dndtools.org/..."');
    logger.info('\nAvailable categories:');
    Object.keys(CATEGORIES).forEach(key => {
      logger.info(`  - ${key.toLowerCase()}`);
    });
    logger.info('  - all (scrapes everything)');
    process.exit(1);
  }

  try {
    if (options.url) {
      await scrapeUrl(options.url);
    } else if (options.category === 'all') {
      await scrapeAll();
    } else {
      await scrapeCategory(options.category);
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
