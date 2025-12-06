/**
 * Deity Management Utilities
 * Centralized types, constants, and helper functions for deity administration
 */

export interface Deity {
  id?: string;
  slug: string;
  name_en: string;
  name_es: string;
  rank: string;
  titles_en: string;
  titles_es: string;
  portfolio_en: string;
  portfolio_es: string;
  alignment: string;
  domains: string[];
  favored_weapon: string;
  symbol_en: string;
  symbol_es: string;
  worshipers_en: string;
  worshipers_es: string;
  home_plane_en: string;
  home_plane_es: string;
  description_en: string;
  description_es: string;
  teachings_en?: string;
  teachings_es?: string;
  clergy_en?: string;
  clergy_es?: string;
  temples_en?: string;
  temples_es?: string;
  rites_en?: string;
  rites_es?: string;
  is_major_deity?: boolean;
  is_minor_deity?: boolean;
  is_demigod?: boolean;
  is_philosophy?: boolean;
}

export interface DeityCardFormat {
  id: string;
  slug: string;
  name: string;
  alignment: string;
  portfolio: string;
  description: string;
  symbol: string;
  worshipers: string;
  home_plane: string;
}

/**
 * Rank labels for deities
 */
export const RANK_LABELS: Record<string, string> = {
  greater: 'Deidad Mayor',
  intermediate: 'Deidad Intermedia',
  lesser: 'Deidad Menor',
  demigod: 'Semidiós',
  demon_lord: 'Señor Demonio',
};

/**
 * Create a new deity template with default values
 */
export function createNewDeityTemplate(): Deity {
  return {
    slug: 'nueva-deidad-' + Date.now(),
    name_en: 'New Deity',
    name_es: 'Nueva Deidad',
    rank: 'lesser',
    titles_en: '',
    titles_es: '',
    portfolio_en: '',
    portfolio_es: '',
    alignment: 'N',
    domains: [],
    favored_weapon: '',
    symbol_en: '',
    symbol_es: '',
    worshipers_en: '',
    worshipers_es: '',
    home_plane_en: '',
    home_plane_es: '',
    description_en: '',
    description_es: '',
    is_major_deity: false,
    is_minor_deity: false,
    is_demigod: false,
    is_philosophy: false,
  };
}

/**
 * Format deity for card display
 * @param deity - Deity data
 * @returns Formatted deity for DeityCard component
 */
export function formatDeityForCard(deity: Deity): DeityCardFormat {
  return {
    id: deity.id || deity.slug,
    slug: deity.slug,
    name: deity.name_es || deity.name_en,
    alignment: deity.alignment,
    portfolio: deity.portfolio_es || deity.portfolio_en,
    description: deity.description_es || deity.description_en,
    symbol: deity.symbol_es || deity.symbol_en,
    worshipers: deity.worshipers_es || deity.worshipers_en,
    home_plane: deity.home_plane_es || deity.home_plane_en,
  };
}

/**
 * Validate deity data before saving
 * @param deity - Deity data to validate
 * @returns Error message if invalid, null if valid
 */
export function validateDeityData(deity: Deity): string | null {
  if (!deity.name_es || deity.name_es.trim() === '') {
    return 'El nombre en español es obligatorio';
  }

  if (!deity.name_en || deity.name_en.trim() === '') {
    return 'El nombre en inglés es obligatorio';
  }

  if (deity.name_es.length < 2) {
    return 'El nombre debe tener al menos 2 caracteres';
  }

  if (deity.name_es.length > 100) {
    return 'El nombre no puede exceder 100 caracteres';
  }

  if (deity.description_es && deity.description_es.length > 5000) {
    return 'La descripción no puede exceder 5000 caracteres';
  }

  return null;
}

/**
 * Generate slug from deity name
 * @param name - Deity name
 * @returns Slug in kebab-case
 */
export function generateDeitySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calculate count of translated deities
 * @param deities - Array of deities
 * @returns Number of fully translated deities
 */
export function calculateTranslatedCount(deities: Deity[]): number {
  return deities.filter(d =>
    d.name_es && d.name_es !== d.name_en &&
    d.description_es && d.description_es !== d.description_en
  ).length;
}

/**
 * Filter deities by search term
 * @param deities - Array of deities
 * @param searchTerm - Search term
 * @returns Filtered deities
 */
export function filterDeities(deities: Deity[], searchTerm: string): Deity[] {
  if (!searchTerm.trim()) return deities;

  const lowerSearchTerm = searchTerm.toLowerCase();
  return deities.filter(
    (deity) =>
      deity.name_es.toLowerCase().includes(lowerSearchTerm) ||
      deity.name_en.toLowerCase().includes(lowerSearchTerm)
  );
}

/**
 * Prepare deity data for Supabase upsert
 * @param deity - Deity data
 * @returns Cleaned deity data ready for database
 */
export function buildDeityDataToSave(deity: Deity): Omit<Deity, 'id'> {
  return {
    slug: deity.slug,
    name_en: deity.name_en,
    name_es: deity.name_es,
    rank: deity.rank,
    titles_en: deity.titles_en,
    titles_es: deity.titles_es,
    portfolio_en: deity.portfolio_en,
    portfolio_es: deity.portfolio_es,
    alignment: deity.alignment,
    domains: deity.domains,
    favored_weapon: deity.favored_weapon,
    symbol_en: deity.symbol_en,
    symbol_es: deity.symbol_es,
    worshipers_en: deity.worshipers_en,
    worshipers_es: deity.worshipers_es,
    home_plane_en: deity.home_plane_en,
    home_plane_es: deity.home_plane_es,
    description_en: deity.description_en,
    description_es: deity.description_es,
    teachings_en: deity.teachings_en,
    teachings_es: deity.teachings_es,
    clergy_en: deity.clergy_en,
    clergy_es: deity.clergy_es,
    temples_en: deity.temples_en,
    temples_es: deity.temples_es,
    rites_en: deity.rites_en,
    rites_es: deity.rites_es,
    is_major_deity: deity.is_major_deity,
    is_minor_deity: deity.is_minor_deity,
    is_demigod: deity.is_demigod,
    is_philosophy: deity.is_philosophy,
  };
}

/**
 * Duplicate a deity with a new slug
 * @param deity - Deity to duplicate
 * @returns New deity with copied data
 */
export function duplicateDeity(deity: Deity): Deity {
  return {
    ...deity,
    id: undefined,
    slug: deity.slug + '-copy-' + Date.now(),
  };
}
