/**
 * Servicios de Supabase para el Módulo de Deidades (Client Side)
 * Versión cliente para usar en componentes 'use client'
 *
 * Uso:
 * - En client components: `import { getDeity } from '@/lib/supabase/deities.client'`
 */

import { createClient } from '@/lib/supabase/client';
import {
  Deity,
  DeityDomain,
  DeityWithDomains,
  DeityFilterOptions,
  DeityType
} from '@/lib/types/deity';

/**
 * Obtiene una deidad por ID (client-side)
 */
export async function getDeity(id: bigint): Promise<Deity | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('deities')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching deity:', error);
    return null;
  }

  return data as Deity;
}

/**
 * Obtiene una deidad por slug (client-side)
 */
export async function getDeityBySlug(slug: string): Promise<Deity | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('deities')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching deity by slug:', error);
    return null;
  }

  return data as Deity;
}

/**
 * Obtiene una deidad con sus dominios asociados (client-side)
 */
export async function getDeityWithDomains(id: bigint): Promise<DeityWithDomains | null> {
  const supabase = createClient();

  const { data: deity, error: deityError } = await supabase
    .from('deities')
    .select('*')
    .eq('id', id)
    .single();

  if (deityError) {
    console.error('Error fetching deity:', deityError);
    return null;
  }

  const { data: domains, error: domainsError } = await supabase
    .from('deity_domains')
    .select('*')
    .eq('deity_id', id)
    .order('domain_name');

  if (domainsError) {
    console.error('Error fetching deity domains:', domainsError);
  }

  return {
    ...(deity as Deity),
    domains: (domains as DeityDomain[]) || []
  } as DeityWithDomains;
}

/**
 * Obtiene todas las deidades con opciones de filtrado (client-side)
 */
export async function getDeities(options?: DeityFilterOptions): Promise<Deity[]> {
  const supabase = createClient();

  let query = supabase.from('deities').select('*');

  // Filtrar por panteón
  if (options?.pantheon) {
    query = query.eq('pantheon_name', options.pantheon);
  }

  // Filtrar por alineamiento
  if (options?.alignment) {
    query = query.eq('alignment_code', options.alignment);
  }

  // Filtrar por tipo de deidad
  if (options?.type) {
    switch (options.type) {
      case 'major':
        query = query.eq('is_major_deity', true);
        break;
      case 'minor':
        query = query.eq('is_minor_deity', true);
        break;
      case 'demigod':
        query = query.eq('is_demigod', true);
        break;
      case 'philosophy':
        query = query.eq('is_philosophy', true);
        break;
    }
  }

  // Filtrar por tags
  if (options?.tags && options.tags.length > 0) {
    query = query.overlaps('tags', options.tags);
  }

  // Búsqueda por texto
  if (options?.search) {
    const searchTerm = `%${options.search}%`;
    query = query.or(
      `name.ilike.${searchTerm},portfolio.ilike.${searchTerm},description_full.ilike.${searchTerm}`
    );
  }

  // Excluir filosofías si no se especifica
  if (!options?.includePhilosophies) {
    query = query.eq('is_philosophy', false);
  }

  const { data, error } = await query.order('name');

  if (error) {
    console.error('Error fetching deities:', error);
    return [];
  }

  return (data as Deity[]) || [];
}

/**
 * Obtiene deidades por panteón (client-side)
 */
export async function getDeitiesByPantheon(pantheonName: string): Promise<Deity[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('deities')
    .select('*')
    .eq('pantheon_name', pantheonName)
    .order('name');

  if (error) {
    console.error('Error fetching deities by pantheon:', error);
    return [];
  }

  return (data as Deity[]) || [];
}

/**
 * Obtiene deidades por alineamiento (client-side)
 */
export async function getDeitiesByAlignment(alignment: string): Promise<Deity[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('deities')
    .select('*')
    .eq('alignment_code', alignment)
    .order('name');

  if (error) {
    console.error('Error fetching deities by alignment:', error);
    return [];
  }

  return (data as Deity[]) || [];
}

/**
 * Obtiene deidades por tipo (client-side)
 */
export async function getDeitiesByType(type: DeityType): Promise<Deity[]> {
  const supabase = createClient();

  let query = supabase.from('deities').select('*');

  switch (type) {
    case 'major':
      query = query.eq('is_major_deity', true);
      break;
    case 'minor':
      query = query.eq('is_minor_deity', true);
      break;
    case 'demigod':
      query = query.eq('is_demigod', true);
      break;
    case 'philosophy':
      query = query.eq('is_philosophy', true);
      break;
  }

  const { data, error } = await query.order('name');

  if (error) {
    console.error('Error fetching deities by type:', error);
    return [];
  }

  return (data as Deity[]) || [];
}

/**
 * Obtiene dominios de clérigo asociados a una deidad (client-side)
 */
export async function getDeityDomains(deityId: bigint): Promise<DeityDomain[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('deity_domains')
    .select('*')
    .eq('deity_id', deityId)
    .order('domain_name');

  if (error) {
    console.error('Error fetching deity domains:', error);
    return [];
  }

  return (data as DeityDomain[]) || [];
}

/**
 * Búsqueda avanzada de deidades (client-side)
 */
export async function searchDeities(query: string, options?: DeityFilterOptions): Promise<Deity[]> {
  return getDeities({
    ...options,
    search: query
  });
}

/**
 * Obtiene todos los panteones únicos (client-side)
 */
export async function getAllPantheons(): Promise<string[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('deities')
    .select('pantheon_name')
    .not('pantheon_name', 'is', null);

  if (error) {
    console.error('Error fetching pantheons:', error);
    return [];
  }

  const pantheons = Array.from(new Set((data as any[]).map(d => d.pantheon_name).filter(Boolean)));
  return pantheons.sort();
}

/**
 * Obtiene todos los tags únicos usados en deidades (client-side)
 */
export async function getAllDeityTags(): Promise<string[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('deities')
    .select('tags');

  if (error) {
    console.error('Error fetching deity tags:', error);
    return [];
  }

  const allTags = new Set<string>();
  (data as any[]).forEach(d => {
    if (Array.isArray(d.tags)) {
      d.tags.forEach((tag: string) => allTags.add(tag));
    }
  });

  return Array.from(allTags).sort();
}
