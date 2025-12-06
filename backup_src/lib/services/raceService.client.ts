/**
 * Servicio para trabajar con razas desde Supabase (Browser/Client Side)
 * Para usar en componentes con 'use client'
 */

import { createClient } from '@/lib/supabase/client';
import { CharacterRace } from '@/lib/types/character';
import { parseRacialModifiers } from '@/lib/utils/character';

/**
 * Estructura de datos de raza en Supabase
 */
export interface SupabaseRace {
  id: string;
  slug: string;
  name: string;
  size: string;
  base_speed: number;
  ability_adjustments: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  racial_traits: string[];
  automatic_languages: string[];
  bonus_languages: string[];
  favored_class: string;
  level_adjustment: number;
  creature_type: string;
  subtypes: string[] | null;
  darkvision: number | null;
  low_light_vision: boolean;
  description: string;
  source_book: string;
  source_page: number | null;
}

/**
 * Convierte una raza de Supabase al formato optimizado para el editor de personajes
 */
export function convertToCharacterRace(race: SupabaseRace): CharacterRace {
  return {
    slug: race.slug,
    name: race.name,
    size: race.size as CharacterRace['size'],
    baseSpeed: race.base_speed,
    abilityModifiers: parseRacialModifiers(race.ability_adjustments),
    favoredClass: race.favored_class,
    levelAdjustment: race.level_adjustment,
    darkvision: race.darkvision || undefined,
    lowLightVision: race.low_light_vision,
    creatureType: race.creature_type,
    subtypes: race.subtypes || undefined,
  };
}

/**
 * Obtiene todas las razas disponibles para el editor de personajes
 * Por defecto solo retorna razas sin ajuste de nivel (LA = 0)
 */
export async function getAvailableRaces(options?: {
  includeSupplemental?: boolean;
  includeWithLA?: boolean;
}): Promise<CharacterRace[]> {
  const supabase = createClient();

  let query = supabase
    .from('races')
    .select('*')
    .order('name');

  // Filtrar por ajuste de nivel
  if (!options?.includeWithLA) {
    query = query.eq('level_adjustment', 0);
  }

  // Filtrar por fuente
  if (!options?.includeSupplemental) {
    query = query.in('source_book', ['Manual del Jugador', "Player's Handbook"]);
  }

  const { data: races, error } = await query;

  if (error || !races) {
    console.error('Error fetching races:', error);
    return [];
  }

  return races.map(convertToCharacterRace);
}

/**
 * Obtiene una raza específica por slug
 */
export async function getRaceBySlug(slug: string): Promise<CharacterRace | null> {
  const supabase = createClient();

  const { data: race, error } = await supabase
    .from('races')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !race) {
    console.error('Error fetching race:', error);
    return null;
  }

  return convertToCharacterRace(race);
}

/**
 * Obtiene las razas más populares (del Player's Handbook sin LA)
 */
export async function getPopularRaces(): Promise<CharacterRace[]> {
  const supabase = createClient();

  const { data: races, error } = await supabase
    .from('races')
    .select('*')
    .in('source_book', ['Manual del Jugador', "Player's Handbook"])
    .eq('level_adjustment', 0)
    .order('name');

  if (error || !races) {
    return [];
  }

  return races.map(convertToCharacterRace);
}

/**
 * Agrupa las razas por categoría para mostrar en el selector
 */
export async function getRacesGrouped(): Promise<{
  core: CharacterRace[];
  supplemental: CharacterRace[];
  withLA: CharacterRace[];
}> {
  const supabase = createClient();

  const { data: allRaces, error } = await supabase
    .from('races')
    .select('*')
    .order('name');

  if (error || !allRaces) {
    return { core: [], supplemental: [], withLA: [] };
  }

  const core: CharacterRace[] = [];
  const supplemental: CharacterRace[] = [];
  const withLA: CharacterRace[] = [];

  for (const race of allRaces) {
    const characterRace = convertToCharacterRace(race);

    // Categorizar
    if (race.level_adjustment > 0) {
      withLA.push(characterRace);
    } else if (
      race.source_book === 'Manual del Jugador' ||
      race.source_book === "Player's Handbook"
    ) {
      core.push(characterRace);
    } else {
      supplemental.push(characterRace);
    }
  }

  return { core, supplemental, withLA };
}

/**
 * Verifica si una raza requiere aprobación del DM
 */
export function requiresDMApproval(race: CharacterRace): boolean {
  return (
    race.levelAdjustment > 0 ||
    (race.creatureType !== 'Humanoide' && race.creatureType !== 'Humanoide Monstruoso')
  );
}

/**
 * Obtiene información legible de los modificadores raciales
 */
export function getRacialModifiersSummary(race: CharacterRace): string {
  const mods = race.abilityModifiers;
  if (!mods || Object.keys(mods).length === 0) {
    return 'Sin modificadores';
  }

  const modStrings: string[] = [];
  if (mods.str) modStrings.push(`${mods.str > 0 ? '+' : ''}${mods.str} Fue`);
  if (mods.dex) modStrings.push(`${mods.dex > 0 ? '+' : ''}${mods.dex} Des`);
  if (mods.con) modStrings.push(`${mods.con > 0 ? '+' : ''}${mods.con} Con`);
  if (mods.int) modStrings.push(`${mods.int > 0 ? '+' : ''}${mods.int} Int`);
  if (mods.wis) modStrings.push(`${mods.wis > 0 ? '+' : ''}${mods.wis} Sab`);
  if (mods.cha) modStrings.push(`${mods.cha > 0 ? '+' : ''}${mods.cha} Car`);

  return modStrings.join(', ');
}
