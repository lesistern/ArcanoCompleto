/**
 * Servicio para gestionar monstruos desde Supabase
 */

import { createClient } from '@/lib/supabase/server';

export interface Monster {
  id: string;
  slug: string;
  name: string;
  creature_type: string;
  size: string;
  challenge_rating: string;
  armor_class: number;
  hit_dice: string;
  alignment: string;
  environment?: string;
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
export async function getMonstersByCR(challengeRating: string): Promise<Monster[]> {
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
