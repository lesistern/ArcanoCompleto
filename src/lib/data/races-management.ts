import { DnDRace } from '@/lib/types/race';

// ============================================================
// TYPES - Database schema
// ============================================================

export interface SupabaseRace {
  id: string;
  slug: string;
  name: string;
  size: string;
  base_speed: number;
  ability_adjustments: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  racial_traits: string[];
  automatic_languages: string[];
  bonus_languages: string[];
  favored_class: string;
  level_adjustment: number;
  creature_type: string;
  subtypes: string[] | null;
  darkvision: number | null;
  low_light_vision: boolean;
  description: string;
  source_book: string;
  source_page: number | null;
}

// ============================================================
// CONSTANTS - Race categories and definitions
// ============================================================

export const COMMON_RACE_NAMES = ['Humano', 'Elfo', 'Enano', 'Mediano'];

export const UNCOMMON_RACE_NAMES = ['Gnomo', 'Semielfo', 'Semiorco'];

export const PH_BOOKS = ['Manual del Jugador', "Player's Handbook"];

// ============================================================
// INTERFACES - Filter and organization states
// ============================================================

export interface CategorizedRaces {
  playerHandbookRaces: DnDRace[];
  supplementalRaces: DnDRace[];
}

export interface SubcategorizedPHRaces {
  commonRaces: DnDRace[];
  uncommonRaces: DnDRace[];
}

// ============================================================
// FUNCTIONS - Data transformation
// ============================================================

/**
 * Converts Supabase race record to DnDRace format
 * @param race - Raw Supabase race data
 * @returns Formatted DnDRace object
 */
export function convertSupabaseRace(race: SupabaseRace): DnDRace {
  const abilityModifiers: any = {};

  if (race.ability_adjustments.str !== 0) abilityModifiers.strength = race.ability_adjustments.str;
  if (race.ability_adjustments.dex !== 0) abilityModifiers.dexterity = race.ability_adjustments.dex;
  if (race.ability_adjustments.con !== 0) abilityModifiers.constitution = race.ability_adjustments.con;
  if (race.ability_adjustments.int !== 0) abilityModifiers.intelligence = race.ability_adjustments.int;
  if (race.ability_adjustments.wis !== 0) abilityModifiers.wisdom = race.ability_adjustments.wis;
  if (race.ability_adjustments.cha !== 0) abilityModifiers.charisma = race.ability_adjustments.cha;

  return {
    id: race.slug,
    name: race.name,
    slug: race.slug,
    shortDescription: race.description.split('\n\n')[0].substring(0, 150) + '...',
    description: race.description,
    size: race.size as 'Diminuto' | 'Menudo' | 'Pequeño' | 'Mediano' | 'Grande' | 'Enorme' | 'Gargantuesco',
    speed: race.base_speed,
    type: race.creature_type as 'Humanoide' | 'Monstruoso' | 'Dragón' | 'Gigante' | 'Aberración' | 'Elemental' | 'Feérico' | 'Muerto viviente',
    abilityModifiers,
    racialTraits: race.racial_traits.map(trait => ({
      name: trait,
      description: '',
      type: 'habilidad especial'
    })),
    languages: {
      automatic: race.automatic_languages,
      bonus: race.bonus_languages
    },
    specialAbilities: {
      darkvision: race.darkvision || undefined,
      lowLightVision: race.low_light_vision
    },
    favoredClass: race.favored_class,
    levelAdjustment: race.level_adjustment,
    typicalAlignment: '',
    advantageousClasses: [],
    source: {
      book: race.source_book,
      page: race.source_page || 0
    }
  };
}

/**
 * Categorizes races into Player's Handbook and supplemental
 * @param races - Array of races to categorize
 * @returns Object with categorized races
 */
export function categorizeRaces(races: DnDRace[]): CategorizedRaces {
  const playerHandbookRaces = races.filter(r =>
    r.source?.book === 'Manual del Jugador' || r.source?.book === "Player's Handbook"
  );

  const supplementalRaces = races.filter(r =>
    r.source?.book !== 'Manual del Jugador' && r.source?.book !== "Player's Handbook"
  );

  return {
    playerHandbookRaces,
    supplementalRaces
  };
}

/**
 * Subcategorizes Player's Handbook races into common and uncommon
 * @param races - Array of PH races to subcategorize
 * @returns Object with common and uncommon races
 */
export function subcategorizePlayerHandbookRaces(races: DnDRace[]): SubcategorizedPHRaces {
  const commonRaces = races.filter(r =>
    COMMON_RACE_NAMES.includes(r.name)
  );

  const uncommonRaces = races.filter(r =>
    UNCOMMON_RACE_NAMES.includes(r.name)
  );

  return {
    commonRaces,
    uncommonRaces
  };
}

/**
 * Groups races by their source book
 * @param races - Array of races to group
 * @returns Record mapping book name to races from that book
 */
export function groupRacesByBook(races: DnDRace[]): Record<string, DnDRace[]> {
  const racesByBook: Record<string, DnDRace[]> = {};

  races.forEach(race => {
    const book = race.source?.book || 'Otros';
    if (!racesByBook[book]) {
      racesByBook[book] = [];
    }
    racesByBook[book].push(race);
  });

  return racesByBook;
}
