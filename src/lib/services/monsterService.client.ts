/**
 * Servicio de monstruos para Client Components
 */

import { createClient } from '@/lib/supabase/client';

export interface HitDice {
  dice: string;
  modifier: number;
  average: number;
}

export interface ArmorClass {
  total: number;
  touch: number;
  flatFooted: number;
  breakdown: string;
}

export interface Saves {
  fort: number;
  ref: number;
  will: number;
}

export interface Abilities {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface Skill {
  name: string;
  bonus: number;
}

export interface Source {
  book: string;
  abbreviation?: string;
  page?: number;
}

export interface SpecialAbility {
  name: string;
  description: string;
}

export interface Monster {
  id: string;
  slug: string;
  name: string;
  size: string;
  creature_type: string;
  subtypes?: string[];
  hit_dice: HitDice | string;
  initiative?: string;
  speed?: string | any;
  armor_class: ArmorClass | number;
  base_attack?: string;
  grapple?: string;
  attack?: string;
  full_attack?: string;
  attacks?: any;
  space_reach?: string;
  special_attacks?: string;
  special_qualities?: string | any;
  saves: Saves | any;
  abilities: Abilities | any;
  skills?: Skill[] | string;
  feats?: string[] | string;
  environment?: string;
  organization?: string;
  challenge_rating: string;
  treasure?: string;
  alignment: string;
  advancement?: string;
  level_adjustment?: number | string;
  description?: string;
  special_abilities?: SpecialAbility[] | any;
  source_book?: string;
  source_page?: number;
  sources?: Source[];
  tags?: string[];
}

/**
 * Obtiene todos los monstruos desde el cliente
 */
export async function getMonsters(): Promise<Monster[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('monsters')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching monsters:', error);
    throw new Error('Error al cargar monstruos');
  }

  return data || [];
}

/**
 * Obtiene un monstruo por su slug
 */
export async function getMonsterBySlug(slug: string): Promise<Monster | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('monsters')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching monster:', error);
    return null;
  }

  return data;
}
