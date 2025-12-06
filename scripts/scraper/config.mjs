/**
 * Configuración del Scraper de D&D Tools SRD
 * https://srd.dndtools.org/
 */

export const BASE_URL = 'https://srd.dndtools.org';

// Categorías principales a scrapear
export const CATEGORIES = {
  // Clases
  CLASSES_BASE: '/srd/classes/baseCore',
  CLASSES_PRESTIGE: '/srd/classes/prestige',
  CLASSES_NPC: '/srd/classes/npc',

  // Razas
  RACES: '/srd/races',

  // Habilidades
  SKILLS: '/srd/skills',

  // Dotes
  FEATS: '/srd/feats',

  // Conjuros
  SPELLS: '/srd/spells',

  // Equipo
  EQUIPMENT: '/srd/equipment',
  WEAPONS: '/srd/equipment/weapons',
  ARMOR: '/srd/equipment/armor',
  GOODS: '/srd/equipment/goodsAndServices',

  // Objetos Mágicos
  MAGIC_ITEMS: '/srd/magicItems',

  // Monstruos
  MONSTERS: '/srd/monsters',

  // Reglas
  COMBAT: '/srd/combat',
  MAGIC: '/srd/magic',
  DIVINE: '/srd/divine',
  PSIONICS: '/srd/psionics',

  // Campaña
  CAMPAIGN: '/srd/campaign',
  PLANES: '/srd/planes',
  EPIC: '/srd/epic',

  // Libros
  BOOKS: '/srd/meta/bookList.html'
};

// Configuración de rate limiting
export const SCRAPER_CONFIG = {
  // Delay entre requests (ms) - ser respetuoso con el servidor
  REQUEST_DELAY: 500,

  // Timeout para cada request (ms)
  REQUEST_TIMEOUT: 30000,

  // Máximo de reintentos en caso de error
  MAX_RETRIES: 3,

  // User agent
  USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',

  // Headers
  HEADERS: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
  }
};

// Selectores CSS para extraer datos
export const SELECTORS = {
  // Selectores generales
  TITLE: 'h1, .title',
  CONTENT: '#content, .content, main',
  TABLE: 'table',

  // Clases
  CLASS_TABLE: 'table.class-table',
  CLASS_FEATURES: '.class-features',

  // Stats de monstruos
  MONSTER_STAT_BLOCK: '.stat-block',

  // Conjuros
  SPELL_LEVEL: '.spell-level',
  SPELL_SCHOOL: '.spell-school',
  SPELL_COMPONENTS: '.components',

  // Links de navegación
  NAV_LINKS: 'a[href*="/srd/"]',
  LIST_ITEMS: 'ul li a, ol li a'
};

// Patrones para identificar tipos de contenido
export const URL_PATTERNS = {
  CLASS: /\/classes\/(base|prestige|npc)\//,
  RACE: /\/races\//,
  SKILL: /\/skills\//,
  FEAT: /\/feats\//,
  SPELL: /\/spells\//,
  WEAPON: /\/equipment\/weapons\//,
  ARMOR: /\/equipment\/armor\//,
  MAGIC_ITEM: /\/magicItems\//,
  MONSTER: /\/monsters\//
};

// Directorios de salida
export const OUTPUT_DIRS = {
  BASE: './scraped-data',
  CLASSES: './scraped-data/classes',
  RACES: './scraped-data/races',
  SKILLS: './scraped-data/skills',
  FEATS: './scraped-data/feats',
  SPELLS: './scraped-data/spells',
  EQUIPMENT: './scraped-data/equipment',
  MAGIC_ITEMS: './scraped-data/magic-items',
  MONSTERS: './scraped-data/monsters',
  RAW: './scraped-data/raw',
  LOGS: './scraped-data/logs'
};

// Expresiones regulares para limpieza de texto
export const REGEX = {
  // Eliminar múltiples espacios
  MULTIPLE_SPACES: /\s+/g,

  // Eliminar tabs y newlines extras
  CLEAN_WHITESPACE: /[\t\n\r]+/g,

  // Extraer números de dados (ej: 2d6, 1d8+2)
  DICE: /(\d+)d(\d+)([+-]\d+)?/gi,

  // Extraer nivel de conjuro (ej: "Sor/Wiz 3")
  SPELL_LEVEL: /(Sor|Wiz|Clr|Drd|Brd|Pal|Rgr)\/?(Wiz)?\s*(\d+)/gi,

  // Extraer modificadores (+2, -1, etc)
  MODIFIER: /([+-]\d+)/g
};

export default {
  BASE_URL,
  CATEGORIES,
  SCRAPER_CONFIG,
  SELECTORS,
  URL_PATTERNS,
  OUTPUT_DIRS,
  REGEX
};
