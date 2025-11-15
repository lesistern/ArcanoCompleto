/**
 * Utilidades para el Scraper
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SCRAPER_CONFIG, OUTPUT_DIRS, REGEX } from './config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Sleep/delay asíncrono
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Limpia texto eliminando espacios extras y caracteres de control
 */
export function cleanText(text) {
  if (!text) return '';

  return text
    .replace(REGEX.CLEAN_WHITESPACE, ' ')
    .replace(REGEX.MULTIPLE_SPACES, ' ')
    .trim();
}

/**
 * Normaliza una URL relativa a absoluta
 */
export function normalizeUrl(url, baseUrl) {
  if (!url) return '';

  // Ya es absoluta
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Es relativa
  if (url.startsWith('/')) {
    return `${baseUrl}${url}`;
  }

  return `${baseUrl}/${url}`;
}

/**
 * Crea un slug a partir de un texto
 */
export function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Asegura que un directorio exista
 */
export function ensureDir(dir) {
  const fullPath = path.resolve(__dirname, '../../', dir);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  return fullPath;
}

/**
 * Guarda datos en un archivo JSON
 */
export function saveJSON(data, category, filename) {
  const dir = OUTPUT_DIRS[category.toUpperCase()] || OUTPUT_DIRS.RAW;
  const dirPath = ensureDir(dir);
  const filePath = path.join(dirPath, filename);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

  return filePath;
}

/**
 * Guarda HTML raw
 */
export function saveHTML(html, category, filename) {
  const dir = OUTPUT_DIRS[category.toUpperCase()] || OUTPUT_DIRS.RAW;
  const dirPath = ensureDir(dir);
  const filePath = path.join(dirPath, filename);

  fs.writeFileSync(filePath, html, 'utf-8');

  return filePath;
}

/**
 * Logger con timestamp
 */
export class Logger {
  constructor(name) {
    this.name = name;
    this.logFile = null;
  }

  init() {
    ensureDir(OUTPUT_DIRS.LOGS);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const logPath = path.resolve(
      __dirname,
      '../../',
      OUTPUT_DIRS.LOGS,
      `${this.name}-${timestamp}.log`
    );
    this.logFile = logPath;
    fs.writeFileSync(this.logFile, `Log iniciado: ${new Date().toISOString()}\n`, 'utf-8');
  }

  log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}`;

    console.log(logMessage);

    if (this.logFile) {
      fs.appendFileSync(this.logFile, logMessage + '\n', 'utf-8');
    }
  }

  info(message) {
    this.log(message, 'INFO');
  }

  success(message) {
    this.log(message, 'SUCCESS');
  }

  warn(message) {
    this.log(message, 'WARN');
  }

  error(message) {
    this.log(message, 'ERROR');
  }
}

/**
 * Rate limiter simple
 */
export class RateLimiter {
  constructor(delay = SCRAPER_CONFIG.REQUEST_DELAY) {
    this.delay = delay;
    this.lastRequest = 0;
  }

  async waitIfNeeded() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;

    if (timeSinceLastRequest < this.delay) {
      const waitTime = this.delay - timeSinceLastRequest;
      await sleep(waitTime);
    }

    this.lastRequest = Date.now();
  }
}

/**
 * Extrae texto de un elemento HTML (usando regex básico)
 */
export function extractTextFromHTML(html, selector) {
  // Buscar el contenido dentro de tags específicos
  const patterns = {
    'h1': /<h1[^>]*>(.*?)<\/h1>/is,
    '.title': /<[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)<\/[^>]+>/is,
    'table': /<table[^>]*>(.*?)<\/table>/gis
  };

  const pattern = patterns[selector];
  if (!pattern) return '';

  const match = html.match(pattern);
  if (!match) return '';

  // Limpiar HTML tags
  return match[1]
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

/**
 * Extrae todos los links de un HTML
 */
export function extractLinks(html, baseUrl) {
  const linkPattern = /<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  const links = [];
  let match;

  while ((match = linkPattern.exec(html)) !== null) {
    const url = normalizeUrl(match[1], baseUrl);
    const text = cleanText(match[2].replace(/<[^>]+>/g, ''));

    if (url.includes('srd.dndtools.org')) {
      links.push({ url, text });
    }
  }

  return links;
}

/**
 * Extrae tablas de un HTML
 */
export function extractTables(html) {
  const tablePattern = /<table[^>]*>(.*?)<\/table>/gis;
  const tables = [];
  let match;

  while ((match = tablePattern.exec(html)) !== null) {
    tables.push(match[1]);
  }

  return tables;
}

/**
 * Parsea una tabla HTML simple a array de objetos
 */
export function parseTable(tableHtml) {
  const rows = [];
  const headerPattern = /<th[^>]*>(.*?)<\/th>/gi;
  const rowPattern = /<tr[^>]*>(.*?)<\/tr>/gis;
  const cellPattern = /<td[^>]*>(.*?)<\/td>/gi;

  // Extraer headers
  const headers = [];
  let headerMatch;
  while ((headerMatch = headerPattern.exec(tableHtml)) !== null) {
    headers.push(cleanText(headerMatch[1].replace(/<[^>]+>/g, '')));
  }

  // Extraer filas
  let rowMatch;
  while ((rowMatch = rowPattern.exec(tableHtml)) !== null) {
    const cells = [];
    let cellMatch;

    while ((cellMatch = cellPattern.exec(rowMatch[1])) !== null) {
      cells.push(cleanText(cellMatch[1].replace(/<[^>]+>/g, '')));
    }

    if (cells.length > 0) {
      const row = {};
      cells.forEach((cell, index) => {
        const key = headers[index] || `col_${index}`;
        row[key] = cell;
      });
      rows.push(row);
    }
  }

  return rows;
}

/**
 * Genera estadísticas del scraping
 */
export function generateStats(results) {
  return {
    total: results.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    categories: results.reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {}),
    timestamp: new Date().toISOString()
  };
}

export default {
  sleep,
  cleanText,
  normalizeUrl,
  createSlug,
  ensureDir,
  saveJSON,
  saveHTML,
  Logger,
  RateLimiter,
  extractTextFromHTML,
  extractLinks,
  extractTables,
  parseTable,
  generateStats
};
