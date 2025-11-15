/**
 * Tipos para las razas de D&D 3.5
 */

export type Size = 'Diminuto' | 'Menudo' | 'Pequeño' | 'Mediano' | 'Grande' | 'Enorme' | 'Gargantuesco';

export type CreatureType = 'Humanoide' | 'Monstruoso' | 'Dragón' | 'Gigante' | 'Aberración' | 'Elemental' | 'Feérico' | 'Muerto viviente';

export interface AbilityModifiers {
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
}

export interface RacialTrait {
  name: string;
  description: string;
  type?: 'bonificador' | 'penalizador' | 'habilidad especial' | 'competencia' | 'inmunidad' | 'resistencia';
}

export interface LanguageInfo {
  automatic: string[]; // Idiomas automáticos
  bonus?: string[]; // Idiomas adicionales disponibles
}

export interface DnDRace {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  // Características físicas
  size: Size;
  speed: number; // en pies
  type: CreatureType;

  // Modificadores de habilidad
  abilityModifiers: AbilityModifiers;

  // Rasgos raciales
  racialTraits: RacialTrait[];

  // Competencias automáticas
  weaponProficiencies?: string[];
  armorProficiencies?: string[];

  // Idiomas
  languages: LanguageInfo;

  // Habilidades especiales
  specialAbilities?: {
    darkvision?: number; // rango en pies
    lowLightVision?: boolean;
    bonusSkills?: { skill: string; bonus: number }[];
    bonusSaves?: { save: string; bonus: number; condition?: string }[];
    spellLikeAbilities?: string[];
  };

  // Información de clase favorecida
  favoredClass?: string | string[]; // Puede ser 'cualquiera' o clases específicas

  // Ajuste de nivel (para razas poderosas)
  levelAdjustment: number;

  // Información adicional
  typicalAlignment?: string;
  advantageousClasses?: string[];
  source: {
    book: string;
    page: number;
  };
}

export interface RaceCategory {
  id: string;
  name: string;
  description: string;
  races: string[]; // IDs de razas
}
