/**
 * Race Management Utilities
 * Centralized types, constants, and helper functions for race administration
 */

export interface RaceData {
  id: string;
  slug: string;
  name: string;
  description?: string;
  size?: string;
  base_speed?: number;
  level_adjustment?: number;
  favored_class?: string;
  image_url?: string;
  automatic_languages?: string[];
  bonus_languages?: string[];
  racial_traits?: string[];
  ability_adjustments?: Record<string, number>;
  creature_type?: string;
  subtypes?: string[];
  darkvision?: number;
  low_light_vision?: boolean;
}

/**
 * Default ability adjustments template
 */
export const DEFAULT_ABILITY_ADJUSTMENTS = {
  STR: 0,
  DEX: 0,
  CON: 0,
  INT: 0,
  WIS: 0,
  CHA: 0,
} as const;

/**
 * Create a new race template with default values
 */
export function createNewRaceTemplate(): RaceData {
  return {
    id: 'new',
    slug: '',
    name: '',
    description: '',
    automatic_languages: [],
    bonus_languages: [],
    racial_traits: [],
    ability_adjustments: { ...DEFAULT_ABILITY_ADJUSTMENTS },
    subtypes: [],
  };
}

/**
 * Generate slug from race name
 * @param name - Race name
 * @returns Slug in kebab-case
 */
export function generateRaceSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Build race data object for saving to database
 * @param race - Race data
 * @param forceSlug - Optional slug to use instead of generating
 * @returns Cleaned race data ready for database insert/update
 */
export function buildRaceDataToSave(
  race: RaceData,
  forceSlug?: string
): Omit<RaceData, 'id'> {
  const slug = forceSlug || race.slug || generateRaceSlug(race.name);

  return {
    slug,
    name: race.name,
    description: race.description,
    size: race.size,
    base_speed: race.base_speed,
    level_adjustment: race.level_adjustment,
    favored_class: race.favored_class,
    image_url: race.image_url,
    automatic_languages: race.automatic_languages,
    bonus_languages: race.bonus_languages,
    racial_traits: race.racial_traits,
    ability_adjustments: race.ability_adjustments,
    creature_type: race.creature_type,
    subtypes: race.subtypes,
    darkvision: race.darkvision,
    low_light_vision: race.low_light_vision,
  };
}

/**
 * Validate race data before saving
 * @param race - Race data to validate
 * @returns Error message if invalid, null if valid
 */
export function validateRaceData(race: RaceData): string | null {
  if (!race.name || race.name.trim() === '') {
    return 'El nombre es obligatorio';
  }

  if (race.name.length < 2) {
    return 'El nombre debe tener al menos 2 caracteres';
  }

  if (race.name.length > 50) {
    return 'El nombre no puede exceder 50 caracteres';
  }

  if (race.description && race.description.length > 5000) {
    return 'La descripción no puede exceder 5000 caracteres';
  }

  return null;
}

/**
 * Filter races by search term
 * @param races - Array of races
 * @param searchTerm - Search term
 * @returns Filtered races
 */
export function filterRacesBySearch(races: RaceData[], searchTerm: string): RaceData[] {
  if (!searchTerm.trim()) return races;

  const lowerSearchTerm = searchTerm.toLowerCase();
  return races.filter(
    (race) =>
      race.name.toLowerCase().includes(lowerSearchTerm) ||
      race.slug.toLowerCase().includes(lowerSearchTerm) ||
      (race.description && race.description.toLowerCase().includes(lowerSearchTerm))
  );
}

/**
 * Update a specific ability adjustment
 * @param adjustments - Current adjustments
 * @param stat - Ability stat (STR, DEX, etc.)
 * @param value - New value
 * @returns Updated adjustments
 */
export function updateAbilityAdjustment(
  adjustments: Record<string, number> | undefined,
  stat: string,
  value: number
): Record<string, number> {
  return {
    ...(adjustments || DEFAULT_ABILITY_ADJUSTMENTS),
    [stat]: value,
  };
}

/**
 * Format ability adjustments for display
 * @param adjustments - Ability adjustments
 * @returns Formatted string
 */
export function formatAbilityAdjustments(
  adjustments: Record<string, number> | undefined
): string {
  if (!adjustments || Object.keys(adjustments).length === 0) {
    return 'Sin ajustes';
  }

  return Object.entries(adjustments)
    .filter(([_, value]) => value !== 0)
    .map(([stat, value]) => `${stat} ${value > 0 ? '+' : ''}${value}`)
    .join(', ');
}

/**
 * Sync status type for UI feedback
 */
export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

/**
 * Get display message for sync status
 */
export function getSyncStatusMessage(status: SyncStatus): string {
  const messages: Record<SyncStatus, string> = {
    idle: '',
    syncing: 'Sincronizando...',
    success: '✓ Guardado correctamente',
    error: '✗ Error al guardar',
  };
  return messages[status];
}
