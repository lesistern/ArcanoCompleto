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
 * Buscar en TODAS las tablas incluyendo razas, habilidades, armas, deidades, monstruos
 * @param query - Término de búsqueda
 * @param maxPerType - Máximo de resultados por tipo (default: 5)
 */
export async function searchAll(
  query: string,
  maxPerType = 5
): Promise<{ data: GlobalSearchResult[] | null; error: any }> {
  const supabase = createClient();
  const searchPattern = `%${query.toLowerCase()}%`; // PostgreSQL usa % como wildcard en ilike
  const results: GlobalSearchResult[] = [];

  try {
    // Buscar en razas
    const { data: races, error: racesError } = await supabase
      .from('races')
      .select('id, slug, name, creature_type, description')
      .ilike('name', searchPattern)
      .limit(maxPerType);

    if (racesError) console.error('Races search error:', racesError);
    if (races) {
      races.forEach((race) => {
        results.push({
          result_type: 'race',
          id: race.id,
          slug: race.slug,
          name: race.name,
          category: race.creature_type || 'Humanoide',
          description: race.description || '',
          relevance: race.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0.5,
        });
      });
    }

    // Buscar en clases
    const { data: classes, error: classesError } = await supabase
      .from('classes')
      .select('id, slug, titulo, class_type, description_es')
      .or(`titulo.ilike.${searchPattern},slug.ilike.${searchPattern}`)
      .limit(maxPerType);

    if (classesError) console.error('Classes search error:', classesError);

    if (classes) {
      classes.forEach((cls) => {
        results.push({
          result_type: 'class',
          id: cls.id,
          slug: cls.slug,
          name: cls.titulo || cls.slug,
          category: cls.class_type === 'base' ? 'Clase Base' : cls.class_type === 'prestigio' ? 'Clase de Prestigio' : 'NPC',
          description: cls.description_es || '',
          relevance: (cls.titulo || cls.slug).toLowerCase().includes(query.toLowerCase()) ? 1 : 0.5,
        });
      });
    }

    // Buscar en habilidades
    const { data: skills } = await supabase
      .from('skills')
      .select('id, slug, name, key_ability, description')
      .or(`name.ilike.${searchPattern},slug.ilike.${searchPattern},description.ilike.${searchPattern}`)
      .limit(maxPerType);

    if (skills) {
      skills.forEach((skill) => {
        results.push({
          result_type: 'skill',
          id: skill.id,
          slug: skill.slug,
          name: skill.name,
          category: skill.key_ability || 'Habilidad',
          description: skill.description || '',
          relevance: skill.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0.5,
        });
      });
    }

    // Buscar en dotes
    const { data: feats } = await supabase
      .from('feats')
      .select('id, slug, name, category, benefit')
      .or(`name.ilike.${searchPattern},slug.ilike.${searchPattern},benefit.ilike.${searchPattern}`)
      .limit(maxPerType);

    if (feats) {
      feats.forEach((feat) => {
        results.push({
          result_type: 'feat',
          id: feat.id,
          slug: feat.slug,
          name: feat.name,
          category: feat.category || 'General',
          description: feat.benefit || '',
          relevance: feat.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0.5,
        });
      });
    }

    // Buscar en conjuros
    const { data: spells } = await supabase
      .from('spells')
      .select('id, slug, name, school, description')
      .or(`name.ilike.${searchPattern},slug.ilike.${searchPattern},description.ilike.${searchPattern}`)
      .limit(maxPerType);

    if (spells) {
      spells.forEach((spell) => {
        results.push({
          result_type: 'spell',
          id: spell.id,
          slug: spell.slug,
          name: spell.name,
          category: spell.school || 'Conjuro',
          description: spell.description || '',
          relevance: spell.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0.5,
        });
      });
    }

    // Buscar en armas
    const { data: weapons } = await supabase
      .from('weapons')
      .select('id, slug, name, weapon_type, damage')
      .or(`name.ilike.${searchPattern},slug.ilike.${searchPattern}`)
      .limit(maxPerType);

    if (weapons) {
      weapons.forEach((weapon) => {
        results.push({
          result_type: 'weapon',
          id: weapon.id,
          slug: weapon.slug,
          name: weapon.name,
          category: weapon.weapon_type || 'Arma',
          description: weapon.damage || '',
          relevance: weapon.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0.5,
        });
      });
    }

    // Buscar en deidades
    const { data: deities } = await supabase
      .from('deities')
      .select('id, slug, name_es, alignment, portfolio_es')
      .or(`name_es.ilike.${searchPattern},slug.ilike.${searchPattern},portfolio_es.ilike.${searchPattern}`)
      .limit(maxPerType);

    if (deities) {
      deities.forEach((deity) => {
        results.push({
          result_type: 'deity',
          id: deity.id,
          slug: deity.slug,
          name: deity.name_es || deity.slug,
          category: deity.alignment || 'Deidad',
          description: deity.portfolio_es || '',
          relevance: (deity.name_es || '').toLowerCase().includes(query.toLowerCase()) ? 1 : 0.5,
        });
      });
    }

    // Buscar en monstruos
    const { data: monsters } = await supabase
      .from('monsters')
      .select('id, slug, name, creature_type, challenge_rating')
      .or(`name.ilike.${searchPattern},slug.ilike.${searchPattern},creature_type.ilike.${searchPattern}`)
      .limit(maxPerType);

    if (monsters) {
      monsters.forEach((monster) => {
        results.push({
          result_type: 'monster',
          id: monster.id,
          slug: monster.slug,
          name: monster.name,
          category: monster.creature_type || 'Monstruo',
          description: monster.challenge_rating ? `CR ${monster.challenge_rating}` : '',
          relevance: monster.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0.5,
        });
      });
    }

    // Ordenar por relevancia (coincidencias en nombre primero)
    results.sort((a, b) => b.relevance - a.relevance);

    return { data: results, error: null };
  } catch (error) {
    console.error('Error in searchAll:', error);
    return { data: null, error };
  }
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
