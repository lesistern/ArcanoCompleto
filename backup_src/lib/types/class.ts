/**
 * Tipos para las clases de D&D 3.5
 */

export type Alignment = 'LB' | 'LN' | 'LM' | 'NB' | 'N' | 'NM' | 'CB' | 'CN' | 'CM' | 'cualquiera' | 'cualquiera no legal' | 'cualquiera no malvado' | 'cualquiera no bueno';

export type DieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12';

export type AbilityScore = 'Fuerza' | 'Destreza' | 'Constitución' | 'Inteligencia' | 'Sabiduría' | 'Carisma';

export type SavingThrow = 'Fortaleza' | 'Reflejos' | 'Voluntad';

export interface ClassSkill {
  name: string;
  keyAbility: AbilityScore;
  trainedOnly?: boolean;
  armorCheckPenalty?: boolean;
}

export interface ClassFeature {
  name: string;
  level: number;
  description: string;
  shortDescription?: string;
}

export interface SpellProgression {
  level: number;
  spellsPerDay: {
    level0?: number;
    level1?: number;
    level2?: number;
    level3?: number;
    level4?: number;
    level5?: number;
    level6?: number;
    level7?: number;
    level8?: number;
    level9?: number;
  };
  spellsKnown?: {
    level0?: number;
    level1?: number;
    level2?: number;
    level3?: number;
    level4?: number;
    level5?: number;
    level6?: number;
    level7?: number;
    level8?: number;
    level9?: number;
  };
}

export interface LevelProgression {
  level: number;
  baseAttackBonus: string; // e.g., "+0", "+1", "+6/+1"
  fortitudeSave: number;
  reflexSave: number;
  willSave: number;
  special?: string[]; // Habilidades especiales ganadas en este nivel

  // Monk-specific
  flurryOfBlows?: string; // e.g., "-2/-2", "+8/+8/+8/+3"
  unarmedDamageSmall?: string; // e.g., "1d4"
  unarmedDamageMedium?: string; // e.g., "1d6"
  unarmedDamageLarge?: string; // e.g., "1d8"
  acBonus?: number; // Wisdom bonus to AC
  speedBonus?: number; // Bonus to speed in feet
}

export interface ClassWeaponProficiencies {
  simple?: boolean;
  martial?: boolean;
  exotic?: string[]; // Lista de armas exóticas específicas
  specific?: string[]; // Armas específicas si no tiene categorías completas
}

export interface ClassArmorProficiencies {
  light?: boolean;
  medium?: boolean;
  heavy?: boolean;
  shields?: boolean;
  towerShields?: boolean;
}

export interface DnDClass {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  // Características básicas
  hitDie: DieType;
  skillPointsPerLevel: number;

  // Requisitos
  alignment?: Alignment[];

  // Competencias
  weaponProficiencies: ClassWeaponProficiencies;
  armorProficiencies: ClassArmorProficiencies;

  // Habilidades de clase
  classSkills: string[]; // Solo nombres, la lista completa está en otro archivo

  // Características especiales
  classFeatures: ClassFeature[];

  // Progresión de nivel
  levelProgression: LevelProgression[];

  // Lanzamiento de conjuros (si aplica)
  spellcasting?: {
    ability: AbilityScore;
    spellType: 'arcanos' | 'divinos';
    spellProgression: SpellProgression[];
    cantripsAtWill?: boolean;
  };

  // Animales compañeros u otras opciones especiales
  companionOptions?: {
    type: string;
    description: string;
  };

  // Información adicional
  primaryAbility: AbilityScore[];
  goodSaves: SavingThrow[];
  source: {
    book: string;
    page: number;
  };

  // Metadatos adicionales
  classType?: string;
  hasMagic?: boolean;
  powerSource?: string;
  babProgression?: 'good' | 'medium' | 'poor';
}

export interface ClassCategory {
  id: string;
  name: string;
  description: string;
  classes: string[]; // IDs de clases
}
