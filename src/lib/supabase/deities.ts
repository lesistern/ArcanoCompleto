/**
 * Servicios de Supabase para el Módulo de Deidades
 * Funciones para CRUD, búsqueda, filtrado y relaciones con dominios
 *
 * Uso:
 * - En server components: `import { getDeity } from '@/lib/supabase/deities'`
 * - En client components: `import { getDeity } from '@/lib/supabase/deities.client'`
 */

import { createClient } from '@/lib/supabase/server';
import {
  Deity,
  DeityDomain,
  CreateDeityInput,
  UpdateDeityInput,
  DeityWithDomains,
  DeityFilterOptions,
  DeityType
} from '@/lib/types/deity';

/**
 * Obtiene una deidad por ID
 */
export async function getDeity(id: bigint): Promise<Deity | null> {
  const supabase = await createClient();

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
 * Obtiene una deidad por slug
 */
export async function getDeityBySlug(slug: string): Promise<Deity | null> {
  const supabase = await createClient();

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
 * Obtiene una deidad con sus dominios asociados
 */
export async function getDeityWithDomains(id: bigint): Promise<DeityWithDomains | null> {
  const supabase = await createClient();

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
    domains ?? [];
  }

  return {
    ...(deity as Deity),
    domains: (domains as DeityDomain[]) || []
  } as DeityWithDomains;
}

/**
 * Obtiene todas las deidades con opciones de filtrado
 */
export async function getDeities(options?: DeityFilterOptions): Promise<Deity[]> {
  const supabase = await createClient();

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

  // Filtrar por tags (contiene cualquiera de los tags especificados)
  if (options?.tags && options.tags.length > 0) {
    // PostgreSQL array overlap operator
    query = query.overlaps('tags', options.tags);
  }

  // Búsqueda por texto (en nombre, portfolio, descripción)
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
 * Obtiene deidades por panteón
 */
export async function getDeitiesByPantheon(pantheonName: string): Promise<Deity[]> {
  const supabase = await createClient();

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
 * Obtiene deidades por alineamiento
 */
export async function getDeitiesByAlignment(alignment: string): Promise<Deity[]> {
  const supabase = await createClient();

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
 * Obtiene deidades que tienen un tag específico
 */
export async function getDeitiesByTag(tag: string): Promise<Deity[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('deities')
    .select('*')
    .contains('tags', [tag]) // Array contains
    .order('name');

  if (error) {
    console.error('Error fetching deities by tag:', error);
    return [];
  }

  return (data as Deity[]) || [];
}

/**
 * Obtiene deidades por tipo (mayor, menor, semidios, filosofía)
 */
export async function getDeitiesByType(type: DeityType): Promise<Deity[]> {
  const supabase = await createClient();

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
 * Obtiene deidades mayores (is_major_deity = true)
 */
export async function getMajorDeities(): Promise<Deity[]> {
  return getDeitiesByType('major');
}

/**
 * Obtiene deidades menores (is_minor_deity = true)
 */
export async function getMinorDeities(): Promise<Deity[]> {
  return getDeitiesByType('minor');
}

/**
 * Obtiene semidioses (is_demigod = true)
 */
export async function getDemigods(): Promise<Deity[]> {
  return getDeitiesByType('demigod');
}

/**
 * Crea una nueva deidad
 */
export async function createDeity(data: CreateDeityInput): Promise<Deity | null> {
  const supabase = await createClient();

  const { data: deity, error } = await supabase
    .from('deities')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating deity:', error);
    return null;
  }

  return deity as Deity;
}

/**
 * Actualiza una deidad existente
 */
export async function updateDeity(id: bigint, data: UpdateDeityInput): Promise<Deity | null> {
  const supabase = await createClient();

  const { data: deity, error } = await supabase
    .from('deities')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating deity:', error);
    return null;
  }

  return deity as Deity;
}

/**
 * Actualiza flags de clasificación de deidad
 */
export async function updateDeityFlags(
  id: bigint,
  flags: {
    is_major_deity?: boolean;
    is_minor_deity?: boolean;
    is_demigod?: boolean;
    is_philosophy?: boolean;
  }
): Promise<Deity | null> {
  return updateDeity(id, flags);
}

/**
 * Elimina una deidad
 */
export async function deleteDeity(id: bigint): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase
    .from('deities')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting deity:', error);
    return false;
  }

  return true;
}

/**
 * Obtiene dominios de clérigo asociados a una deidad
 */
export async function getDeityDomains(deityId: bigint): Promise<DeityDomain[]> {
  const supabase = await createClient();

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
 * Añade un dominio de clérigo a una deidad
 */
export async function addDeityDomain(
  deityId: bigint,
  domainSlug: string,
  domainName: string
): Promise<DeityDomain | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('deity_domains')
    .insert([{ deity_id: deityId, domain_slug: domainSlug, domain_name: domainName }])
    .select()
    .single();

  if (error) {
    console.error('Error adding deity domain:', error);
    return null;
  }

  return data as DeityDomain;
}

/**
 * Elimina un dominio de clérigo de una deidad
 */
export async function removeDeityDomain(deityDomainId: bigint): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase
    .from('deity_domains')
    .delete()
    .eq('id', deityDomainId);

  if (error) {
    console.error('Error removing deity domain:', error);
    return false;
  }

  return true;
}

/**
 * Obtiene todas las deidades con sus dominios
 * (Puede ser costoso, usar con cuidado)
 */
export async function getAllDeitiesWithDomains(): Promise<DeityWithDomains[]> {
  const supabase = await createClient();

  const { data: deities, error: deitiesError } = await supabase
    .from('deities')
    .select('*')
    .order('name');

  if (deitiesError) {
    console.error('Error fetching all deities:', deitiesError);
    return [];
  }

  // Para cada deidad, obtener sus dominios
  const deitiesWithDomains = await Promise.all(
    (deities as Deity[]).map(async (deity) => {
      const domains = await getDeityDomains(deity.id);
      return { ...deity, domains } as DeityWithDomains;
    })
  );

  return deitiesWithDomains;
}

/**
 * Búsqueda avanzada de deidades
 * Combina múltiples criterios
 */
export async function searchDeities(query: string, options?: DeityFilterOptions): Promise<Deity[]> {
  return getDeities({
    ...options,
    search: query
  });
}

/**
 * Obtiene todas las panteones únicos
 */
export async function getAllPantheons(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('deities')
    .select('pantheon_name')
    .not('pantheon_name', 'is', null);

  if (error) {
    console.error('Error fetching pantheons:', error);
    return [];
  }

  // Deduplicar y ordenar
  const pantheons = Array.from(new Set((data as any[]).map(d => d.pantheon_name).filter(Boolean)));
  return pantheons.sort();
}

/**
 * Obtiene todos los tags únicos usados en deidades
 */
export async function getAllDeityTags(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('deities')
    .select('tags');

  if (error) {
    console.error('Error fetching deity tags:', error);
    return [];
  }

  // Combinar todos los tags y deduplicar
  const allTags = new Set<string>();
  (data as any[]).forEach(d => {
    if (Array.isArray(d.tags)) {
      d.tags.forEach((tag: string) => allTags.add(tag));
    }
  });

  return Array.from(allTags).sort();
}

/**
 * Obtiene estadísticas del módulo de deidades
 */
export async function getDeityStats(): Promise<{
  total: number;
  major: number;
  minor: number;
  demigods: number;
  philosophies: number;
  pantheonCount: number;
  tagCount: number;
}> {
  const supabase = await createClient();

  const { data: stats, error } = await supabase
    .rpc('get_deity_stats') // Función SQL personalizada (pendiente crear)
    .single();

  if (error) {
    console.error('Error fetching deity stats:', error);
    return {
      total: 0,
      major: 0,
      minor: 0,
      demigods: 0,
      philosophies: 0,
      pantheonCount: 0,
      tagCount: 0
    };
  }

  return stats as any;
}
