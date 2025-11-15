/**
 * Módulo de Fetching con rate limiting y retry logic
 */

import https from 'https';
import http from 'http';
import { SCRAPER_CONFIG } from './config.mjs';
import { sleep, Logger } from './utils.mjs';

const logger = new Logger('fetcher');

/**
 * Fetch con reintentos y timeout
 */
export async function fetchWithRetry(url, options = {}, retries = SCRAPER_CONFIG.MAX_RETRIES) {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'User-Agent': SCRAPER_CONFIG.USER_AGENT,
      ...SCRAPER_CONFIG.HEADERS,
      ...options.headers
    },
    timeout: options.timeout || SCRAPER_CONFIG.REQUEST_TIMEOUT
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      logger.info(`Fetching: ${url} (attempt ${attempt}/${retries})`);

      const response = await fetchURL(url, fetchOptions);

      if (response.statusCode === 200) {
        logger.success(`✓ Fetched: ${url}`);
        return {
          success: true,
          data: response.body,
          statusCode: response.statusCode,
          url
        };
      }

      if (response.statusCode === 404) {
        logger.warn(`404 Not Found: ${url}`);
        return {
          success: false,
          error: '404 Not Found',
          statusCode: 404,
          url
        };
      }

      logger.warn(`HTTP ${response.statusCode} for ${url}, retrying...`);

      if (attempt < retries) {
        await sleep(1000 * attempt); // Backoff exponencial
      }

    } catch (error) {
      logger.error(`Error fetching ${url}: ${error.message}`);

      if (attempt === retries) {
        return {
          success: false,
          error: error.message,
          url
        };
      }

      await sleep(1000 * attempt);
    }
  }

  return {
    success: false,
    error: 'Max retries exceeded',
    url
  };
}

/**
 * Fetch usando módulos nativos de Node.js (con soporte para redirects)
 */
function fetchURL(url, options, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;

    const req = protocol.request(url, {
      method: options.method,
      headers: options.headers,
      timeout: options.timeout
    }, (res) => {
      // Manejar redirects (301, 302, 307, 308)
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        if (maxRedirects === 0) {
          reject(new Error('Too many redirects'));
          return;
        }

        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;

        logger.info(`Following redirect to: ${redirectUrl}`);

        // Seguir el redirect
        fetchURL(redirectUrl, options, maxRedirects - 1)
          .then(resolve)
          .catch(reject);
        return;
      }

      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

/**
 * Fetch en lote con rate limiting
 */
export async function fetchBatch(urls, rateLimiter) {
  const results = [];

  for (const url of urls) {
    await rateLimiter.waitIfNeeded();

    const result = await fetchWithRetry(url);
    results.push(result);

    // Log progreso
    const completed = results.length;
    const total = urls.length;
    const successCount = results.filter(r => r.success).length;

    logger.info(`Progress: ${completed}/${total} (${successCount} successful)`);
  }

  return results;
}

/**
 * Fetch con chunks paralelos
 */
export async function fetchParallel(urls, concurrency = 5, rateLimiter) {
  const results = [];
  const chunks = [];

  // Dividir URLs en chunks
  for (let i = 0; i < urls.length; i += concurrency) {
    chunks.push(urls.slice(i, i + concurrency));
  }

  for (const chunk of chunks) {
    const chunkPromises = chunk.map(async (url) => {
      await rateLimiter.waitIfNeeded();
      return fetchWithRetry(url);
    });

    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults);

    // Log progreso
    const completed = results.length;
    const total = urls.length;
    const successCount = results.filter(r => r.success).length;

    logger.info(`Progress: ${completed}/${total} (${successCount} successful)`);
  }

  return results;
}

export default {
  fetchWithRetry,
  fetchBatch,
  fetchParallel
};
