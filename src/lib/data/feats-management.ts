/**
 * Feats Management Utilities
 * Centralized functions and constants for feats page
 */

import { DnDFeat, FeatType } from '@/lib/types/feat';

/**
 * All feat types in D&D 3.5
 */
export const FEAT_TYPES: FeatType[] = [
  'General',
  'Combate',
  'Metamagia',
  'Creación de Objetos',
  'Especial',
];

/**
 * Feat types in order of importance/frequency
 */
export const FEAT_TYPE_ORDER: FeatType[] = [
  'General',
  'Combate',
  'Metamagia',
  'Creación de Objetos',
  'Especial',
];

/**
 * Filter state for feats
 */
export interface FeatsFilterState {
  selectedType: FeatType | 'all';
  fighterBonusFilter: boolean | 'all';
  hasPrereqsFilter: boolean | 'all';
  multipleFilter: boolean | 'all';
  bookIds: number[];
}

/**
 * Filter feats based on multiple criteria
 * @param feats - All feats to filter
 * @param filters - Current filter state
 * @returns Filtered feats array
 */
export function filterFeats(
  feats: DnDFeat[],
  filters: FeatsFilterState
): DnDFeat[] {
  return feats.filter((feat) => {
    if (filters.selectedType !== 'all' && feat.type !== filters.selectedType) {
      return false;
    }
    if (filters.fighterBonusFilter !== 'all' && feat.fighterBonus !== filters.fighterBonusFilter) {
      return false;
    }
    if (filters.hasPrereqsFilter !== 'all') {
      const hasPrereqs = feat.prerequisites && feat.prerequisites.length > 0;
      if (hasPrereqs !== filters.hasPrereqsFilter) {
        return false;
      }
    }
    if (filters.multipleFilter !== 'all' && feat.multipleAllowed !== filters.multipleFilter) {
      return false;
    }
    if (filters.bookIds && filters.bookIds.length > 0) {
      if (!feat.bookId || !filters.bookIds.includes(feat.bookId)) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Extract unique feat types from feats
 * @param feats - Feats to extract types from
 * @returns Array of unique feat types found
 */
export function getUniqueFeatTypes(feats: DnDFeat[]): FeatType[] {
  const types = new Set<FeatType>();
  feats.forEach((feat) => {
    if (feat.type) {
      types.add(feat.type);
    }
  });
  return Array.from(types);
}

/**
 * Group feats by type
 * @param feats - Feats to group
 * @returns Record of feats grouped by type
 */
export function groupFeatsByType(feats: DnDFeat[]): Record<FeatType, DnDFeat[]> {
  return {
    'General': feats.filter((f) => f.type === 'General'),
    'Combate': feats.filter((f) => f.type === 'Combate'),
    'Metamagia': feats.filter((f) => f.type === 'Metamagia'),
    'Creación de Objetos': feats.filter((f) => f.type === 'Creación de Objetos'),
    'Especial': feats.filter((f) => f.type === 'Especial'),
  };
}

/**
 * Check if any filters are active
 * @param filters - Current filter state
 * @returns True if any non-default filter is selected
 */
export function hasActiveFilters(filters: FeatsFilterState): boolean {
  return (
    filters.selectedType !== 'all' ||
    filters.fighterBonusFilter !== 'all' ||
    filters.hasPrereqsFilter !== 'all' ||
    filters.multipleFilter !== 'all'
  );
}

/**
 * Map database feat record to DnDFeat type
 * @param feat - Raw database feat record
 * @returns Formatted DnDFeat object
 */
export function mapDatabaseFeat(feat: any): DnDFeat {
  return {
    id: feat.slug,
    slug: feat.slug,
    name: feat.name,
    shortDescription: feat.short_description || '',
    description: feat.description || '',
    type: feat.type as FeatType,
    category: feat.category,
    prerequisites: feat.prerequisites || [],
    benefit: feat.benefit || '',
    normal: feat.normal,
    special: feat.special || [],
    fighterBonus: feat.fighter_bonus || false,
    multipleAllowed: feat.multiple_allowed || false,
    relatedFeats: feat.related_feats || [],
    source: {
      book: feat.source_book || '',
      page: feat.source_page || 0,
    },
    bookId: feat.book_id,
  };
}
