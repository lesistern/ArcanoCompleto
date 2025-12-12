/**
 * Servicio para gestionar monstruos desde Supabase
 */

import { createClient } from '@/lib/supabase/server';

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
  fortitude: number;
  reflex: number;
  will: number;
}

export interface Abilities {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
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
  hit_dice: HitDice;
  initiative: string;
  speed: string;
  armor_class: ArmorClass;
  base_attack: string;
  grapple: string;
  attack: string;
  full_attack: string;
  space_reach: string;
  special_attacks?: string;
  special_qualities?: string;
  saves: Saves;
  abilities: Abilities;
  skills?: string;
  feats?: string;
  environment?: string;
  organization?: string;
  challenge_rating: number;
  treasure?: string;
  alignment: string;
  advancement?: string;
  level_adjustment?: string;
  description?: string;
  special_abilities?: SpecialAbility[];
  source_book?: string;
}

/**
 * Obtiene todos los monstruos desde Supabase
 */
export async function getMonsters(): Promise<Monster[]> {
  const supabase = await createClient();

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
  const supabase = await createClient();

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

/**
 * Busca monstruos por nombre (para el sistema de búsqueda)
 */
export async function searchMonsters(searchTerm: string): Promise<Monster[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('monsters')
    .select('*')
    .ilike('name', `%${searchTerm}%`)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error searching monsters:', error);
    throw new Error('Error al buscar monstruos');
  }

  return data || [];
}

/**
 * Filtra monstruos por tipo de criatura
 */
export async function getMonstersByType(creatureType: string): Promise<Monster[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('monsters')
    .select('*')
    .eq('creature_type', creatureType)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching monsters by type:', error);
    throw new Error('Error al filtrar monstruos por tipo');
  }

  return data || [];
}

/**
 * Filtra monstruos por CR (Challenge Rating)
 */
export async function getMonstersByCR(challengeRating: number): Promise<Monster[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('monsters')
    .select('*')
    .eq('challenge_rating', challengeRating)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching monsters by CR:', error);
    throw new Error('Error al filtrar monstruos por CR');
  }

  return data || [];
}

/**
 * Calcula el modificador de habilidad
 */
export function getAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}
