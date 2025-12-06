/**
 * Cached Supabase Queries - Server Components Only
 *
 * Este archivo contiene todas las queries de Supabase que deben ejecutarse
 * en Server Components y pueden beneficiarse del cache de React.
 *
 * ✅ Beneficios:
 * - Deduplicación automática de queries idénticas en un mismo request
 * - Menor JavaScript en el bundle del cliente
 * - Queries más rápidas gracias al cache
 */

import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

// ============================================================================
// CLASSES (Clases)
// ============================================================================

/**
 * Obtiene todas las clases ordenadas por nombre
 * Cached para evitar queries duplicadas en un mismo request
 */
// Helper to generate slug
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const normalizeSlug = (slug: string) =>
  slug
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

/**
 * Obtiene todas las clases ordenadas por nombre
 * Cached para evitar queries duplicadas en un mismo request
 */
export const getAllClasses = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .order('titulo');

  if (error) {
    console.error('Error fetching classes:', error);
    return [];
  }

  return data || [];
});

/**
 * Obtiene una clase por su slug
 * @param slug - Slug único de la clase (ej: 'barbaro', 'mago')
 */
export const getClassBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching class ${slug}:`, error);
    return null;
  }

  return data;
});

/**
 * Obtiene solo los slugs de todas las clases
 * Útil para generateStaticParams()
 */
export const getAllClassSlugs = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('classes')
    .select('slug');

  if (error) {
    console.error('Error fetching class slugs:', error);
    return [];
  }

  return data || [];
});

// ============================================================================
// RACES (Razas)
// ============================================================================

/**
 * Obtiene todas las razas ordenadas por nombre
 */
export const getAllRaces = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('races')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching races:', error);
    return [];
  }

  return data || [];
});

/**
 * Obtiene una raza por su slug
 * @param slug - Slug único de la raza (ej: 'humano', 'elfo')
 */
export const getRaceBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('races')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching race ${slug}:`, error);
    return null;
  }

  return data;
});

/**
 * Obtiene solo los slugs de todas las razas
 * Útil para generateStaticParams()
 */
export const getAllRaceSlugs = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('races')
    .select('slug');

  if (error) {
    console.error('Error fetching race slugs:', error);
    return [];
  }

  return data || [];
});

// ============================================================================
// FEATS (Dotes)
// ============================================================================

/**
 * Obtiene todas las dotes ordenadas por nombre
 */
export const getAllFeats = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('feats')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching feats:', error);
    return [];
  }

  return data || [];
});

/**
 * Obtiene una dote por su slug
 * @param slug - Slug único de la dote (ej: 'power-attack', 'cleave')
 */
export const getFeatBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('feats')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching feat ${slug}:`, error);
    return null;
  }

  return data;
});

/**
 * Obtiene solo los slugs de todas las dotes
 * Útil para generateStaticParams()
 */
export const getAllFeatSlugs = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('feats')
    .select('slug');

  if (error) {
    console.error('Error fetching feat slugs:', error);
    return [];
  }

  return data || [];
});

/**
 * Obtiene dotes por categoría
 * @param category - Categoría de la dote (ej: 'General', 'Metamágica')
 */
export const getFeatsByCategory = cache(async (category: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('feats')
    .select('*')
    .eq('category', category)
    .order('name');

  if (error) {
    console.error(`Error fetching feats by category ${category}:`, error);
    return [];
  }

  return data || [];
});

// ============================================================================
// SPELLS (Conjuros)
// ============================================================================

/**
 * Obtiene todos los conjuros ordenados por nivel y nombre
 */
export const getAllSpells = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('spells')
    .select('*')
    .order('level', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching spells:', error);
    return [];
  }

  return data || [];
});

/**
 * Obtiene un conjuro por su slug
 * @param slug - Slug único del conjuro (ej: 'fireball', 'magic-missile')
 */
export const getSpellBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('spells')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching spell ${slug}:`, error);
    return null;
  }

  return data;
});

/**
 * Obtiene solo los slugs de todos los conjuros
 * Útil para generateStaticParams()
 */
export const getAllSpellSlugs = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('spells')
    .select('slug');

  if (error) {
    console.error('Error fetching spell slugs:', error);
    return [];
  }

  return data || [];
});

/**
 * Obtiene conjuros por escuela
 * @param school - Escuela de magia (ej: 'Evocation', 'Abjuration')
 */
export const getSpellsBySchool = cache(async (school: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('spells')
    .select('*')
    .eq('school', school)
    .order('level', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error(`Error fetching spells by school ${school}:`, error);
    return [];
  }

  return data || [];
});

/**
 * Obtiene conjuros por nivel
 * @param level - Nivel del conjuro (0-9)
 */
export const getSpellsByLevel = cache(async (level: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('spells')
    .select('*')
    .eq('level', level)
    .order('name', { ascending: true });

  if (error) {
    console.error(`Error fetching spells by level ${level}:`, error);
    return [];
  }

  return data || [];
});

// ============================================================================
// SKILLS (Habilidades)
// ============================================================================

/**
 * Obtiene todas las habilidades ordenadas por nombre
 */
export const getAllSkills = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('v_skills')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }

  return data || [];
});

/**
 * Obtiene una habilidad por su slug
 * @param slug - Slug único de la habilidad (ej: 'climb', 'hide')
 */
export const getSkillBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('v_skills')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching skill ${slug}:`, error);
    return null;
  }

  return data;
});

// ============================================================================
// WEAPONS (Armas)
// ============================================================================

/**
 * Obtiene todas las armas ordenadas por nombre
 */
export const getAllWeapons = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('weapons')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching weapons:', error);
    return [];
  }

  return data || [];
});

/**
 * Obtiene un arma por su slug
 * @param slug - Slug único del arma (ej: 'longsword', 'greataxe')
 */
export const getWeaponBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('weapons')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching weapon ${slug}:`, error);
    return null;
  }

  return data;
});

// ============================================================================
// BOOKS (Libros)
// ============================================================================

/**
 * Obtiene todos los libros ordenados por prioridad
 */
export const getAllBooks = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('priority', { ascending: false })
    .order('name');

  if (error) {
    console.error('Error fetching books:', error);
    return [];
  }

  return data || [];
});

/**
 * Obtiene un libro por su slug
 * @param slug - Slug único del libro (ej: 'player-handbook', 'monster-manual')
 */
export const getBookBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching book ${slug}:`, error);
    return null;
  }

  return data;
});
