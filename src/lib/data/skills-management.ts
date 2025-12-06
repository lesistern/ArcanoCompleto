/**
 * Skills Management Utilities
 * Centralized functions and constants for skills page
 */

import { DnDSkill, AbilityScore, SkillCategory } from '@/lib/types/skill';

/**
 * All ability scores in D&D 3.5
 */
export const ABILITY_SCORES: AbilityScore[] = [
  'Fuerza',
  'Destreza',
  'Constitución',
  'Inteligencia',
  'Sabiduría',
  'Carisma',
];

/**
 * Skill categories in order of importance/frequency
 */
export const CATEGORY_ORDER: SkillCategory[] = [
  'Física',
  'Mental',
  'Social',
  'Conocimiento',
  'Oficio',
  'Profesión',
  'Interpretación',
];

/**
 * Filter state for skills
 */
export interface SkillsFilterState {
  selectedAbility: AbilityScore | 'all';
  selectedCategory: SkillCategory | 'all';
  trainedOnlyFilter: boolean | 'all';
  armorPenaltyFilter: boolean | 'all';
  searchQuery: string;
}

/**
 * Filter skills based on multiple criteria
 * @param skills - All skills to filter
 * @param filters - Current filter state
 * @returns Filtered skills array
 */
export function filterSkills(
  skills: DnDSkill[],
  filters: SkillsFilterState
): DnDSkill[] {
  return skills.filter((skill) => {
    // Search Query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesName = skill.name.toLowerCase().includes(query);
      const matchesSlug = skill.slug.toLowerCase().includes(query);
      const matchesKeyAbility = skill.keyAbility.toLowerCase().includes(query);

      if (!matchesName && !matchesSlug && !matchesKeyAbility) {
        return false;
      }
    }

    if (filters.selectedAbility !== 'all' && skill.keyAbility !== filters.selectedAbility) {
      return false;
    }
    if (filters.selectedCategory !== 'all' && skill.category !== filters.selectedCategory) {
      return false;
    }
    if (filters.trainedOnlyFilter !== 'all' && skill.trainedOnly !== filters.trainedOnlyFilter) {
      return false;
    }
    if (
      filters.armorPenaltyFilter !== 'all' &&
      skill.armorCheckPenalty !== filters.armorPenaltyFilter
    ) {
      return false;
    }
    return true;
  });
}

/**
 * Extract unique categories from skills
 * @param skills - Skills to extract categories from
 * @returns Array of unique categories found
 */
export function getUniqueCategoriesFromSkills(skills: DnDSkill[]): SkillCategory[] {
  return Array.from(new Set(skills.map((s) => s.category))) as SkillCategory[];
}

/**
 * Group skills by category
 * @param skills - Skills to group
 * @returns Record of skills grouped by category
 */
export function groupSkillsByCategory(
  skills: DnDSkill[]
): Record<SkillCategory, DnDSkill[]> {
  return {
    'Física': skills.filter((s) => s.category === 'Física'),
    'Mental': skills.filter((s) => s.category === 'Mental'),
    'Social': skills.filter((s) => s.category === 'Social'),
    'Conocimiento': skills.filter((s) => s.category === 'Conocimiento'),
    'Oficio': skills.filter((s) => s.category === 'Oficio'),
    'Profesión': skills.filter((s) => s.category === 'Profesión'),
    'Interpretación': skills.filter((s) => s.category === 'Interpretación'),
  };
}

/**
 * Calculate total result count for filter summary
 * @param filteredCount - Number of filtered results
 * @param totalCount - Total number of skills
 * @returns Formatted count string
 */
export function getFilterCountText(filteredCount: number, totalCount: number): string {
  return `(${filteredCount} de ${totalCount})`;
}

/**
 * Check if any filters are active
 * @param filters - Current filter state
 * @returns True if any non-default filter is selected
 */
export function hasActiveFilters(filters: SkillsFilterState): boolean {
  return (
    filters.selectedAbility !== 'all' ||
    filters.selectedCategory !== 'all' ||
    filters.trainedOnlyFilter !== 'all' ||
    filters.armorPenaltyFilter !== 'all'
  );
}
