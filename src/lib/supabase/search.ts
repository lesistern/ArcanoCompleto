/**
 * Full-Text Search Helpers
 * Funciones para búsqueda en spells, feats, classes usando PostgreSQL FTS
 */

import { createClient } from './client';

// Types
export interface SpellSearchResult {
  id: string;
  name: string;
  level: number;
  school: string;
  description: string;
  casting_time: string;
  range_info: string;
  duration: string;
  relevance: number;
}

export interface FeatSearchResult {
  id: string;
  slug: string;
  name: string;
  category: string;
  prerequisites: string | null;
  benefit: string;
  special: string | null;
  relevance: number;
}

export interface ClassSearchResult {
  id: string;
  slug: string;
  name: string;
  class_type: string;
  hit_die: string;
  skill_points_per_level: number;
  description: string;
  relevance: number;
}

export type SearchResultType = 'spell' | 'feat' | 'class' | 'race' | 'skill' | 'weapon' | 'deity' | 'monster';

export interface GlobalSearchResult {
  result_type: SearchResultType;
  id: string;
  slug?: string;
  name: string;
  category: string;
  description: string;
  relevance: number;
}

export interface SearchCountResult {
  result_type: SearchResultType;
  total_results: number;
}

// ============================================================================
// BÚSQUEDA DE CONJUROS
// ============================================================================

/**
 * Buscar conjuros por término
 * @param query - Término de búsqueda (soporta sintaxis web: OR, -, "frase exacta")
 * @param maxResults - Máximo de resultados (default: 50)
 */
export async function searchSpells(
  query: string,
  maxResults = 50
): Promise<{ data: SpellSearchResult[] | null; error: any }> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('search_spells', {
    search_query: query,
    max_results: maxResults,
  });

  return { data, error };
}

/**
 * Buscar conjuros con filtros avanzados
 */
export async function searchSpellsFiltered(
  query: string,
  options: {
    minLevel?: number;
    maxLevel?: number;
    school?: string;
    maxResults?: number;
  } = {}
): Promise<{ data: SpellSearchResult[] | null; error: any }> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('search_spells_filtered', {
    search_query: query,
    min_level: options.minLevel ?? 0,
    max_level: options.maxLevel ?? 9,
    spell_school: options.school ?? null,
    max_results: options.maxResults ?? 50,
  });

  return { data, error };
}

/**
 * Buscar conjuros con términos destacados (para mostrar en UI)
 */
export async function searchSpellsWithHighlights(
  query: string,
  maxResults = 50
): Promise<{
  data: Array<{
    id: string;
    name: string;
    level: number;
    school: string;
    description_highlight: string; // Con <mark> tags
    relevance: number;
  }> | null;
  error: any;
}> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('search_spells_with_highlights', {
    search_query: query,
    max_results: maxResults,
  });

  return { data, error };
}

// ============================================================================
// BÚSQUEDA DE DOTES
// ============================================================================

/**
 * Buscar dotes por término
 */
export async function searchFeats(
  query: string,
  maxResults = 50
): Promise<{ data: FeatSearchResult[] | null; error: any }> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('search_feats', {
    search_query: query,
    max_results: maxResults,
  });

  return { data, error };
}

/**
 * Buscar dotes con filtros
 */
export async function searchFeatsFiltered(
  query: string,
  options: {
    category?: string;
    maxResults?: number;
  } = {}
): Promise<{
  data: Array<{
    id: string;
    slug: string;
    name: string;
    category: string;
    prerequisites: string | null;
    benefit: string;
    relevance: number;
  }> | null;
  error: any;
}> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('search_feats_filtered', {
    search_query: query,
    feat_category: options.category ?? null,
    max_results: options.maxResults ?? 50,
  });

  return { data, error };
}

/**
 * Buscar dotes con términos destacados
 */
export async function searchFeatsWithHighlights(
  query: string,
  maxResults = 50
): Promise<{
  data: Array<{
    id: string;
    name: string;
    category: string;
    benefit_highlight: string; // Con <mark> tags
    relevance: number;
  }> | null;
  error: any;
}> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('search_feats_with_highlights', {
    search_query: query,
    max_results: maxResults,
  });

  return { data, error };
}

// ============================================================================
// BÚSQUEDA DE CLASES
// ============================================================================

/**
 * Buscar clases por término
 */
export async function searchClasses(
  query: string,
  maxResults = 20
): Promise<{ data: ClassSearchResult[] | null; error: any }> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('search_classes', {
    search_query: query,
    max_results: maxResults,
  });

  return { data, error };
}

/**
 * Buscar clases con filtros
 */
export async function searchClassesFiltered(
  query: string,
  options: {
    // La BD usa 'prestigio' (español), no 'prestige' (inglés)
    classType?: 'base' | 'prestigio' | 'npc';
    maxResults?: number;
  } = {}
): Promise<{
  data: Array<{
    id: string;
    slug: string;
    name: string;
    class_type: string;
    hit_die: string;
    description: string;
    relevance: number;
  }> | null;
  error: any;
}> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('search_classes_filtered', {
    search_query: query,
    class_type_filter: options.classType ?? null,
    max_results: options.maxResults ?? 20,
  });

  return { data, error };
}

// ============================================================================
// BÚSQUEDA GLOBAL
// ============================================================================

/**
 * Buscar en todas las tablas (spells, feats, classes) - Versión RPC original
 * @param query - Término de búsqueda
 * @param maxPerType - Máximo de resultados por tipo (default: 10)
 */
export async function searchAllRPC(
  query: string,
  maxPerType = 10
): Promise<{ data: GlobalSearchResult[] | null; error: any }> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('search_all', {
    search_query: query,
    max_results_per_type: maxPerType,
  });

  return { data, error };
}

/**
 * Buscar en TODAS las tablas usando PostgreSQL Full-Text Search (FTS)
 * @param query - Término de búsqueda (soporta sintaxis web: OR, -, "frase exacta")
 * @param maxPerType - Máximo de resultados por tipo (default: 5)
 *
 * ⚡ ULTRA-OPTIMIZADO: Usa Full-Text Search con índices GIN
 * Mejora de rendimiento total: 2.4s → 50-100ms (24-48x más rápido)
 *
 * ⚠️ REQUISITO: Ejecutar primero 'add-fulltext-search-remaining-tables.sql' en Supabase
 */
export async function searchAll(
  query: string,
  maxPerType = 5
): Promise<{ data: GlobalSearchResult[] | null; error: any }> {
  const supabase = createClient();

  // Llamar a la función RPC que usa Full-Text Search para los 8 tipos
  const { data, error } = await supabase.rpc('search_all_fts', {
    search_query: query,
    max_results_per_type: maxPerType,
  });

  if (error) {
    console.error('Error in search_all_fts:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Obtener conteo de resultados por tipo
 * Útil para mostrar "X conjuros, Y dotes, Z clases encontrados"
 */
export async function getSearchCount(
  query: string
): Promise<{ data: SearchCountResult[] | null; error: any }> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('search_count', {
    search_query: query,
  });

  return { data, error };
}

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Escapa caracteres especiales de PostgreSQL FTS
 */
export function escapeSearchQuery(query: string): string {
  // Escapa caracteres que tienen significado especial en tsquery
  return query
    .replace(/[&|!<>()]/g, ' ')
    .trim();
}

/**
 * Convierte <mark> tags a componentes React-friendly
 */
export function parseHighlight(text: string): string {
  return text; // El frontend puede usar dangerouslySetInnerHTML o un parser
}

/**
 * Construye sugerencias de búsqueda basadas en errores de tipeo
 */
export function getSuggestions(query: string): string[] {
  // Implementación básica - puede mejorarse con un diccionario
  const suggestions: string[] = [];

  // Sugerir búsqueda sin acentos
  const withoutAccents = query
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (withoutAccents !== query) {
    suggestions.push(withoutAccents);
  }

  return suggestions;
}
