/**
 * Classes Management Utilities
 * Centralized types, constants, and helper functions for classes page
 */

import { DnDClass, SavingThrow, AbilityScore } from '@/lib/types/class';
import { getSourceTag } from '@/lib/utils/icons';

export type ClassCategory = 'Marciales' | 'Mágicas' | 'Versátiles';

/**
 * Convert class name to URL-friendly slug
 * @param name - Class name
 * @returns Slug in kebab-case without accents
 */
export function slugifyClassName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Convert BAB string to enum value
 * @param bab - BAB string from database
 * @returns BAB progression type
 */
function getBABProgression(bab: string): 'good' | 'medium' | 'poor' {
  if (bab === 'bueno') return 'good';
  if (bab === 'pobre') return 'poor';
  return 'medium';
}

/**
 * Determine primary ability scores by BAB progression
 * @param babProgression - BAB progression type
 * @returns Array of primary abilities
 */
function getPrimaryAbilities(babProgression: 'good' | 'medium' | 'poor'): AbilityScore[] {
  if (babProgression === 'good') return ['Fuerza' as AbilityScore, 'Destreza' as AbilityScore];
  if (babProgression === 'poor')
    return ['Inteligencia' as AbilityScore, 'Sabiduría' as AbilityScore, 'Carisma' as AbilityScore];
  return [
    'Fuerza' as AbilityScore,
    'Destreza' as AbilityScore,
    'Inteligencia' as AbilityScore,
    'Sabiduría' as AbilityScore,
    'Carisma' as AbilityScore,
  ];
}

/**
 * Extract good saves from database fields
 * @param fort - Fortaleza value
 * @param ref - Reflejos value
 * @param will - Voluntad value
 * @returns Array of good save types
 */
function getGoodSaves(fort: string, ref: string, will: string): SavingThrow[] {
  const goodSaves: SavingThrow[] = [];
  if (fort === 'bueno') goodSaves.push('Fortaleza' as SavingThrow);
  if (ref === 'bueno') goodSaves.push('Reflejos' as SavingThrow);
  if (will === 'bueno') goodSaves.push('Voluntad' as SavingThrow);
  return goodSaves;
}

/**
 * Map database class record to DnDClass type
 * @param c - Raw database class record
 * @returns Formatted DnDClass object
 */
export function mapDatabaseClass(c: any): DnDClass {
  const babProgression = getBABProgression(c.bab);
  const hasMagic = c.spellcasting === 'si';
  const powerSource = hasMagic ? 'magico' : 'marcial';
  // Use actual source_book from database instead of hardcoded value
  const sourceBook = c.source_book || 'Manual del Jugador';
  const sourcePage = c.source_page || 0;

  // Use summary_es for short description, fallback to subtitulo
  const shortDesc = c.summary_es || c.subtitulo || 'Clase de D&D 3.5';

  // Parse alignment restriction if available
  const alignments = c.alignment_restriction_es ? [c.alignment_restriction_es] : [];

  return {
    id: c.slug,
    name: c.titulo,
    slug: c.slug,
    hitDie: `d${c.dg}` as any,
    skillPointsPerLevel: c.skill_points_per_level_base || 2,
    primaryAbility: getPrimaryAbilities(babProgression),
    goodSaves: getGoodSaves(c.fort, c.ref, c.will),
    description: c.description_es || c.subtitulo || '',
    shortDescription: shortDesc,
    classSkills: [],
    weaponProficiencies: {},
    armorProficiencies: {},
    alignment: alignments,
    classFeatures: [],
    levelProgression: [],
    source: { book: sourceBook, page: sourcePage },
    classType: c.class_type || 'base',
    hasMagic,
    powerSource,
    babProgression,
  };
}

/**
 * Create placeholder class for supplemental sources
 * @param entry - Supplemental class entry with name and source
 * @param existingSlugs - Set of existing class slugs to avoid duplicates
 * @returns Placeholder DnDClass or null if duplicate
 */
export function createPlaceholderClass(
  entry: { name: string; source: string },
  categoryOverrides: Record<string, ClassCategory>,
  existingSlugs: Set<string>
): DnDClass | null {
  const slug = slugifyClassName(entry.name);

  // Skip if already exists in database
  if (existingSlugs.has(slug)) {
    return null;
  }

  const category = categoryOverrides[slug];
  const powerSource = category === 'Marciales' ? 'marcial' : category === 'Mágicas' ? 'arcano' : 'mixto';
  const hasMagic = category === 'Mágicas';

  return {
    id: slug,
    name: entry.name,
    slug,
    hitDie: 'd8',
    skillPointsPerLevel: 0,
    primaryAbility: [],
    goodSaves: [],
    description: 'Contenido pendiente de carga.',
    shortDescription: 'Contenido pendiente de carga.',
    classSkills: [],
    weaponProficiencies: {},
    armorProficiencies: {},
    alignment: [],
    classFeatures: [],
    levelProgression: [],
    source: { book: entry.source, page: 0 },
    classType: 'base',
    hasMagic,
    powerSource,
    babProgression: 'medium',
  };
}

/**
 * Categorize a class based on various attributes
 * @param classData - Class to categorize
 * @param categoryOverrides - Override mappings by slug
 * @returns ClassCategory
 */
export function categorizeClass(
  classData: DnDClass,
  categoryOverrides: Record<string, ClassCategory>
): ClassCategory {
  const slug = (classData.slug || '').toLowerCase();
  const override = categoryOverrides[slug];
  if (override) return override;

  const powerSource = (classData.powerSource ?? '').toString().toLowerCase();
  const normalizedPower = powerSource.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const babProgression = classData.babProgression || 'medium';
  const hasMagic = classData.hasMagic ?? Boolean((classData as any).spellcasting);

  if (powerSource === 'marcial') return 'Marciales';
  if (['arcano', 'divino', 'magico', 'psionico', 'psiquico'].some((keyword) => normalizedPower.includes(keyword))) {
    return 'Mágicas';
  }
  if (['mixto', 'versatil', 'hibrido'].includes(normalizedPower)) {
    return 'Versátiles';
  }
  if (hasMagic) return 'Mágicas';
  if (babProgression === 'good') return 'Marciales';
  return 'Versátiles';
}

/**
 * Comparator for sorting classes by source (PHB first) then by name
 * @param a - First class
 * @param b - Second class
 * @returns Sort order
 */
export function sortBySourceAndName(a: DnDClass, b: DnDClass): number {
  const isPhb = (cls: DnDClass) => getSourceTag(cls.source?.book).code.toUpperCase() === 'PHB';
  const aPhb = isPhb(a);
  const bPhb = isPhb(b);

  if (aPhb && !bPhb) return -1;
  if (!aPhb && bPhb) return 1;
  return a.name.localeCompare(b.name, 'es');
}

/**
 * Group classes by category
 * @param classes - All classes
 * @param categoryOverrides - Override mappings
 * @returns Record with classes grouped by category
 */
export function groupClassesByCategory(
  classes: DnDClass[],
  categoryOverrides: Record<string, ClassCategory>
): Record<ClassCategory, DnDClass[]> {
  return classes.reduce<Record<ClassCategory, DnDClass[]>>(
    (acc, cls) => {
      const category = categorizeClass(cls, categoryOverrides);
      acc[category].push(cls);
      return acc;
    },
    { Marciales: [], 'Mágicas': [], 'Versátiles': [] }
  );
}

/**
 * Category order for consistent display
 */
export const CATEGORY_ORDER: ClassCategory[] = ['Marciales', 'Mágicas', 'Versátiles'];
