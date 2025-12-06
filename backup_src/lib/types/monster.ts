/**
 * Tipos TypeScript para monstruos de D&D 3.5
 */

export interface MonsterAbilities {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface MonsterSaves {
  fort: number;
  ref: number;
  will: number;
}

export interface MonsterSpeed {
  base: number;
  fly?: number;
  swim?: number;
  climb?: number;
  burrow?: number;
}

export interface MonsterArmorClass {
  total: number;
  touch: number;
  flat_footed: number;
  breakdown: string;
}

export interface MonsterAttack {
  name: string;
  type: 'melee' | 'ranged';
  bonus: number;
  damage: string;
  critical?: string;
  range?: number;
  notes?: string;
}

export interface MonsterSkill {
  name: string;
  bonus: number;
}

export interface MonsterSpecialAbility {
  name: string;
  description: string;
}

export interface MonsterSource {
  book: string;
  abbreviation: string;
  page: number;
}

export type MonsterSize = 'Fine' | 'Diminutive' | 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan' | 'Colossal';
export type MonsterAlignment = 'Lawful Good' | 'Neutral Good' | 'Chaotic Good' | 'Lawful Neutral' | 'True Neutral' | 'Chaotic Neutral' | 'Lawful Evil' | 'Neutral Evil' | 'Chaotic Evil' | 'Unaligned';

export interface Monster {
  id: string;
  name: string;
  type: string;
  subtypes?: string[];
  size: MonsterSize;
  hit_dice: string;
  hp: number;
  initiative: number;
  speed: MonsterSpeed;
  armor_class: MonsterArmorClass;
  base_attack: number;
  grapple: number;
  attacks: MonsterAttack[];
  full_attack?: string;
  space?: number;
  reach?: number;
  special_attacks?: string[];
  special_qualities?: string[];
  special_abilities?: MonsterSpecialAbility[];
  abilities: MonsterAbilities;
  saves: MonsterSaves;
  skills: MonsterSkill[];
  feats: string[];
  environment: string;
  organization: string;
  challenge_rating: string;
  treasure: string;
  alignment: string;
  advancement?: string;
  level_adjustment?: number;
  sources: MonsterSource[];
  tags?: string[];
  description?: string;
}

export interface MonsterFilters {
  search?: string;
  type?: string;
  size?: MonsterSize;
  cr_min?: number;
  cr_max?: number;
  environment?: string;
  alignment?: string;
}
