/**
 * Tipos de datos para el sistema de personajes D&D 3.5
 */

import { AbilityScores, AbilityModifiers } from '@/lib/utils/character';

export interface CharacterRace {
  slug: string;
  name: string;
  size: 'Diminuto' | 'Pequeño' | 'Mediano' | 'Grande' | 'Enorme' | 'Gargantuesco';
  baseSpeed: number;
  abilityModifiers: Partial<AbilityModifiers>;
  favoredClass: string | string[];
  levelAdjustment: number;
  darkvision?: number;
  lowLightVision?: boolean;
  creatureType: string;
  subtypes?: string[];
}

export interface CharacterClass {
  slug: string;
  name: string;
  hitDie: number; // d4, d6, d8, d10, d12
  skillPointsPerLevel: number;
  baseAttackBonus: 'good' | 'average' | 'poor';
  fortitudeSave: 'good' | 'poor';
  reflexSave: 'good' | 'poor';
  willSave: 'good' | 'poor';
  classSkills: string[];
  proficiencies: {
    weapons: string[];
    armor: string[];
    shields: string[];
  };
}

export interface Character {
  // Información básica
  id: string;
  name: string;
  race: CharacterRace;
  alignment: string;
  deity?: string;

  // Clases (multiclase posible)
  classes: Array<{
    class: CharacterClass;
    level: number;
  }>;

  // Nivel efectivo del personaje
  effectiveCharacterLevel: number; // Suma de niveles de clase + LA

  // Puntajes de habilidad
  abilityScores: {
    base: AbilityScores; // Puntajes base (tirada/point buy)
    racial: AbilityScores; // Base + modificadores raciales
    current: AbilityScores; // Racial + items/buffs/penalizadores
  };

  // Modificadores calculados
  abilityModifiers: AbilityModifiers;

  // Combate
  hitPoints: {
    max: number;
    current: number;
    temporary: number;
  };

  armorClass: {
    total: number;
    flatFooted: number;
    touch: number;
    breakdown: {
      base: 10;
      armor: number;
      shield: number;
      dex: number;
      size: number;
      natural: number;
      deflection: number;
      misc: number;
    };
  };

  initiative: number;

  speed: {
    base: number;
    armored: number;
    current: number;
  };

  // Salvaciones
  saves: {
    fortitude: {
      total: number;
      base: number;
      ability: number;
      magic: number;
      misc: number;
    };
    reflex: {
      total: number;
      base: number;
      ability: number;
      magic: number;
      misc: number;
    };
    will: {
      total: number;
      base: number;
      ability: number;
      magic: number;
      misc: number;
    };
  };

  // Ataques
  baseAttackBonus: number;
  grapple: number;
  attacks: Array<{
    name: string;
    bonus: number;
    damage: string;
    critical: string;
    range?: number;
    type: 'melee' | 'ranged';
  }>;

  // Habilidades (Skills)
  skills: Array<{
    name: string;
    ranks: number;
    abilityModifier: number;
    miscModifier: number;
    total: number;
    classSkill: boolean;
  }>;

  // Dotes
  feats: Array<{
    name: string;
    description: string;
    source: string;
  }>;

  // Habilidades especiales
  specialAbilities: Array<{
    name: string;
    description: string;
    source: 'race' | 'class' | 'feat' | 'item';
  }>;

  // Idiomas
  languages: string[];

  // Equipamiento
  equipment: {
    weapons: any[]; // TODO: Definir tipo Weapon
    armor: any[]; // TODO: Definir tipo Armor
    items: any[]; // TODO: Definir tipo Item
    magicItems: any[]; // TODO: Definir tipo MagicItem
  };

  // Riqueza
  wealth: {
    platinum: number;
    gold: number;
    silver: number;
    copper: number;
  };

  // Experiencia
  experience: {
    current: number;
    needed: number;
  };

  // Información adicional
  background?: string;
  appearance?: string;
  notes?: string;
}

/**
 * Plantilla para crear un nuevo personaje
 */
export function createEmptyCharacter(): Partial<Character> {
  return {
    name: '',
    alignment: 'Neutral',
    classes: [],
    effectiveCharacterLevel: 1,
    abilityScores: {
      base: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      racial: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      current: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    },
    hitPoints: {
      max: 0,
      current: 0,
      temporary: 0,
    },
    skills: [],
    feats: [],
    specialAbilities: [],
    languages: ['Común'],
    wealth: {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 0,
    },
  };
}

/**
 * Niveles de experiencia por nivel de personaje
 * D&D 3.5 usa progresión estándar hasta nivel 20
 */
export const EXPERIENCE_TABLE: Record<number, number> = {
  1: 0,
  2: 1000,
  3: 3000,
  4: 6000,
  5: 10000,
  6: 15000,
  7: 21000,
  8: 28000,
  9: 36000,
  10: 45000,
  11: 55000,
  12: 66000,
  13: 78000,
  14: 91000,
  15: 105000,
  16: 120000,
  17: 136000,
  18: 153000,
  19: 171000,
  20: 190000,
};

/**
 * Bonificadores de tamaño
 */
export const SIZE_MODIFIERS = {
  'Diminuto': { ac: 2, attack: 2, grapple: -8, hide: 8 },
  'Pequeño': { ac: 1, attack: 1, grapple: -4, hide: 4 },
  'Mediano': { ac: 0, attack: 0, grapple: 0, hide: 0 },
  'Grande': { ac: -1, attack: -1, grapple: 4, hide: -4 },
  'Enorme': { ac: -2, attack: -2, grapple: 8, hide: -8 },
  'Gargantuesco': { ac: -4, attack: -4, grapple: 12, hide: -12 },
};
