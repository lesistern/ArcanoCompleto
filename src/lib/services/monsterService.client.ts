/**
 * Servicio de monstruos para Client Components
 */

import { createClient } from '@/lib/supabase/client';

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
