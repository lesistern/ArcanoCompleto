/**
 * Servicio de Personajes para Supabase
 *
 * Proporciona operaciones CRUD para la tabla `characters`
 * Integrado con el sistema de guardado automático del editor de personajes
 */

import { createClient } from '@/lib/supabase/client';
import type { Character } from '@/lib/types/character';

// ============================================================================
// TIPOS
// ============================================================================

export interface CharacterRow {
  id: string;
  user_id: string;
  name: string;
  race_slug: string | null;
  class_slug: string | null;
  level: number;
  experience_points: number;
  alignment: string | null;
  deity: string | null;
  ability_scores: {
    base: Record<string, number>;
    racial: Record<string, number>;
    current: Record<string, number>;
  };
  hit_points_current: number | null;
  hit_points_max: number | null;
  armor_class: number | null;
  speed: number | null;
  skills: Record<string, number>;
  feats: string[];
  equipment: {
    weapons: any[];
    armor: any[];
    items: any[];
    gold: number;
    silver: number;
    copper: number;
  };
  avatar_url: string | null;
  background: string | null;
  notes: string | null;
  is_public: boolean;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
  last_played_at: string | null;
}

export interface CharacterSummary {
  id: string;
  name: string;
  race_slug: string | null;
  class_slug: string | null;
  level: number;
  is_favorite: boolean;
  is_public?: boolean;
  updated_at: string;
  user_id?: string;
}

export interface CreateCharacterData {
  name?: string;
  race_slug?: string | null;
  class_slug?: string | null;
  level?: number;
  experience_points?: number;
  alignment?: string | null;
  deity?: string | null;
  ability_scores?: CharacterRow['ability_scores'];
  skills?: Record<string, number>;
  feats?: string[];
  equipment?: CharacterRow['equipment'];
  avatar_url?: string | null;
  background?: string | null;
  notes?: string | null;
  is_public?: boolean;
   is_favorite?: boolean;
   last_played_at?: string | null;
}

export interface UpdateCharacterData extends Partial<CreateCharacterData> {
  hit_points_current?: number | null;
  hit_points_max?: number | null;
  armor_class?: number | null;
  speed?: number | null;
  avatar_url?: string | null;
  is_public?: boolean;
  is_favorite?: boolean;
}

// ============================================================================
// CREAR PERSONAJE
// ============================================================================

/**
 * Crea un nuevo personaje en Supabase
 *
 * @param data - Datos del personaje a crear
 * @returns ID del personaje creado
 * @throws Error si no hay usuario autenticado o falla la creación
 */
export async function createCharacter(data: CreateCharacterData): Promise<string> {
  const supabase = createClient();

  // Verificar autenticación
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Debes estar autenticado para crear un personaje');
  }

  // Validaciones rápidas para evitar errores opacos de la BD
  if (!data.race_slug) {
    throw new Error('Debes seleccionar una raza antes de guardar el personaje');
  }
  if (!data.class_slug) {
    throw new Error('Debes seleccionar una clase antes de guardar el personaje');
  }

  // Helper para normalizar puntajes al formato esperado por la BD
  const mapAbilityScores = (scores?: any) => {
    if (!scores) return undefined;
    return {
      str: scores.str ?? scores.strength ?? 10,
      dex: scores.dex ?? scores.dexterity ?? 10,
      con: scores.con ?? scores.constitution ?? 10,
      int: scores.int ?? scores.intelligence ?? 10,
      wis: scores.wis ?? scores.wisdom ?? 10,
      cha: scores.cha ?? scores.charisma ?? 10,
    };
  };

  // Payload con valores por defecto seguros
  const payload = {
    user_id: user.id,
    name: data.name || 'Sin nombre',
    race_slug: data.race_slug ?? null,
    class_slug: data.class_slug ?? null,
    level: data.level ?? 1,
    experience_points: data.experience_points ?? 0,
    alignment: data.alignment ?? null,
    deity: data.deity ?? null,
    ability_scores: {
      base: mapAbilityScores(data.ability_scores?.base) || {
        str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10
      },
      racial: mapAbilityScores(data.ability_scores?.racial) || {
        str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0
      },
      current: mapAbilityScores(data.ability_scores?.current) || {
        str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10
      },
    },
    skills: data.skills || {},
    feats: data.feats || [],
    equipment: data.equipment || {
      weapons: [],
      armor: [],
      items: [],
      gold: 0,
      silver: 0,
      copper: 0
    },
    background: data.background ?? null,
    notes: data.notes ?? null,
    is_public: data.is_public ?? false,
    is_favorite: data.is_favorite ?? false,
    last_played_at: data.last_played_at ?? new Date().toISOString(),
  };

  // Crear personaje
  const { data: character, error, status, statusText } = await supabase
    .from('characters')
    .insert(payload)
    .select('id')
    .single();

  if (error) {
    const errorMessage =
      (error as any)?.message ||
      (error as any)?.details ||
      (error as any)?.hint ||
      (typeof error === 'object' ? JSON.stringify(error) : String(error)) ||
      statusText ||
      'Error desconocido';
    console.error('Error creating character:', { error, status, statusText, payload });
    throw new Error(`Error al crear personaje: ${errorMessage}`);
  }

  if (!character) {
    throw new Error('No se recibió el ID del personaje creado');
  }

  return character.id;
}

// ============================================================================
// ACTUALIZAR PERSONAJE
// ============================================================================

/**
 * Actualiza un personaje existente
 *
 * @param characterId - ID del personaje a actualizar
 * @param data - Datos a actualizar (solo los campos proporcionados)
 * @returns true si la actualización fue exitosa
 * @throws Error si el personaje no existe o no pertenece al usuario
 */
export async function updateCharacter(
  characterId: string,
  data: UpdateCharacterData
): Promise<boolean> {
  const supabase = createClient();

  // Verificar autenticación
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Debes estar autenticado para actualizar un personaje');
  }

  // Actualizar personaje (RLS verificará que pertenece al usuario)
  const { error } = await supabase
    .from('characters')
    .update({
      ...data,
      last_played_at: new Date().toISOString()
    })
    .eq('id', characterId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error updating character:', error);
    throw new Error(`Error al actualizar personaje: ${error.message}`);
  }

  return true;
}

// ============================================================================
// ELIMINAR PERSONAJE
// ============================================================================

/**
 * Elimina un personaje (hard delete)
 *
 * @param characterId - ID del personaje a eliminar
 * @returns true si la eliminación fue exitosa
 * @throws Error si el personaje no existe o no pertenece al usuario
 */
export async function deleteCharacter(characterId: string): Promise<boolean> {
  const supabase = createClient();

  // Verificar autenticación
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Debes estar autenticado para eliminar un personaje');
  }

  // Eliminar personaje (RLS verificará que pertenece al usuario)
  const { error } = await supabase
    .from('characters')
    .delete()
    .eq('id', characterId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting character:', error);
    throw new Error(`Error al eliminar personaje: ${error.message}`);
  }

  return true;
}

// ============================================================================
// OBTENER PERSONAJE
// ============================================================================

/**
 * Obtiene un personaje por su ID
 *
 * @param characterId - ID del personaje
 * @returns Datos completos del personaje
 * @throws Error si el personaje no existe o el usuario no tiene acceso
 */
export async function getCharacter(characterId: string): Promise<CharacterRow> {
  const supabase = createClient();

  const { data: character, error } = await supabase
    .from('characters')
    .select('*')
    .eq('id', characterId)
    .single();

  if (error) {
    console.error('Error fetching character:', error);
    throw new Error(`Error al obtener personaje: ${error.message}`);
  }

  if (!character) {
    throw new Error('Personaje no encontrado');
  }

  return character as CharacterRow;
}

// ============================================================================
// OBTENER PERSONAJES DEL USUARIO
// ============================================================================

/**
 * Obtiene todos los personajes del usuario autenticado
 * Ordenados por favoritos primero, luego por fecha de actualización
 *
 * @returns Lista de personajes (resumen)
 * @throws Error si no hay usuario autenticado
 */
export async function getUserCharacters(): Promise<CharacterSummary[]> {
  const supabase = createClient();

  // Verificar autenticación
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Debes estar autenticado para ver tus personajes');
  }

  // Obtener personajes directamente (con is_public)
  const { data: characters, error } = await supabase
    .from('characters')
    .select('id, name, race_slug, class_slug, level, is_favorite, is_public, updated_at')
    .eq('user_id', user.id)
    .order('is_favorite', { ascending: false })
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching user characters:', error);
    throw new Error(`Error al obtener personajes: ${error.message}`);
  }

  return characters || [];
}

// ============================================================================
// DUPLICAR PERSONAJE
// ============================================================================

/**
 * Duplica un personaje existente
 * Crea una copia con el nombre " (copia)" agregado
 *
 * @param characterId - ID del personaje a duplicar
 * @returns ID del nuevo personaje
 * @throws Error si el personaje no existe o no pertenece al usuario
 */
export async function duplicateCharacter(characterId: string): Promise<string> {
  const supabase = createClient();

  // Verificar autenticación
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Debes estar autenticado para duplicar un personaje');
  }

  // Usar función RPC definida en SQL
  const { data: newCharacterId, error } = await supabase
    .rpc('duplicate_character', { character_id: characterId });

  if (error) {
    console.error('Error duplicating character:', error);
    throw new Error(`Error al duplicar personaje: ${error.message}`);
  }

  if (!newCharacterId) {
    throw new Error('No se recibió el ID del personaje duplicado');
  }

  return newCharacterId;
}

// ============================================================================
// MARCAR/DESMARCAR FAVORITO
// ============================================================================

/**
 * Marca o desmarca un personaje como favorito
 *
 * @param characterId - ID del personaje
 * @param isFavorite - true para marcar, false para desmarcar
 * @returns true si la operación fue exitosa
 */
export async function toggleFavorite(
  characterId: string,
  isFavorite: boolean
): Promise<boolean> {
  return updateCharacter(characterId, { is_favorite: isFavorite });
}

// ============================================================================
// MARCAR/DESMARCAR PÚBLICO
// ============================================================================

/**
 * Cambia la visibilidad del personaje (público/privado)
 *
 * @param characterId - ID del personaje
 * @param isPublic - true para hacer público, false para privado
 * @returns true si la operación fue exitosa
 */
export async function togglePublic(
  characterId: string,
  isPublic: boolean
): Promise<boolean> {
  return updateCharacter(characterId, { is_public: isPublic });
}

// ============================================================================
// COPIAR PERSONAJE PÚBLICO
// ============================================================================

/**
 * Copia un personaje público a la cuenta del usuario actual
 * Similar a duplicar, pero puede copiar personajes de otros usuarios
 *
 * @param characterId - ID del personaje público a copiar
 * @returns ID del nuevo personaje
 * @throws Error si el personaje no es público o no existe
 */
export async function copyPublicCharacter(characterId: string): Promise<string> {
  const supabase = createClient();

  // Verificar autenticación
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Debes estar autenticado para copiar un personaje');
  }

  // Obtener el personaje original (debe ser público)
  const { data: originalCharacter, error: fetchError } = await supabase
    .from('characters')
    .select('*')
    .eq('id', characterId)
    .eq('is_public', true)
    .single();

  if (fetchError || !originalCharacter) {
    throw new Error('Personaje no encontrado o no es público');
  }

  // Crear copia en la cuenta del usuario actual
  const { data: newCharacter, error: createError } = await supabase
    .from('characters')
    .insert({
      user_id: user.id, // Usuario actual (no el dueño original)
      name: `${originalCharacter.name} (Copia)`,
      race_slug: originalCharacter.race_slug,
      class_slug: originalCharacter.class_slug,
      level: originalCharacter.level,
      experience_points: originalCharacter.experience_points,
      alignment: originalCharacter.alignment,
      deity: originalCharacter.deity,
      ability_scores: originalCharacter.ability_scores,
      hit_points_current: originalCharacter.hit_points_max, // Restaurar HP
      hit_points_max: originalCharacter.hit_points_max,
      armor_class: originalCharacter.armor_class,
      speed: originalCharacter.speed,
      skills: originalCharacter.skills,
      feats: originalCharacter.feats,
      equipment: originalCharacter.equipment,
      avatar_url: originalCharacter.avatar_url, // Copiar avatar
      background: originalCharacter.background,
      notes: originalCharacter.notes,
      is_public: false, // La copia es privada por defecto
      is_favorite: false
    })
    .select('id')
    .single();

  if (createError || !newCharacter) {
    console.error('Error copying character:', createError);
    throw new Error(`Error al copiar personaje: ${createError?.message}`);
  }

  return newCharacter.id;
}

// ============================================================================
// OBTENER PERSONAJES PÚBLICOS
// ============================================================================

/**
 * Obtiene todos los personajes públicos
 * Ordenados por fecha de actualización (más recientes primero)
 *
 * @param limit - Número máximo de personajes a retornar (default: 50)
 * @returns Lista de personajes públicos con información del autor
 */
export async function getPublicCharacters(limit: number = 50): Promise<CharacterSummary[]> {
  const supabase = createClient();

  const { data: characters, error } = await supabase
    .from('characters')
    .select('id, name, race_slug, class_slug, level, is_favorite, updated_at, user_id')
    .eq('is_public', true)
    .order('updated_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching public characters:', error);
    throw new Error(`Error al obtener personajes públicos: ${error.message}`);
  }

  return characters || [];
}

// ============================================================================
// CONVERTIR A FORMATO DEL EDITOR
// ============================================================================

/**
 * Convierte un CharacterRow de Supabase al formato Character del editor
 *
 * @param characterRow - Datos del personaje desde Supabase
 * @returns Personaje en formato del editor
 */
export function toEditorFormat(characterRow: CharacterRow): Partial<Character> {
  return {
    name: characterRow.name,
    race: (characterRow.race_slug as any) || undefined,
    classes: characterRow.class_slug
      ? [{ class: { slug: characterRow.class_slug } as any, level: characterRow.level || 1 }]
      : [],
    effectiveCharacterLevel: characterRow.level,
    experience: {
      current: characterRow.experience_points || 0,
      needed: 0,
    },
    alignment: characterRow.alignment || undefined,
    deity: characterRow.deity || undefined,
    abilityScores: {
      base: characterRow.ability_scores.base as any,
      racial: characterRow.ability_scores.racial as any,
      current: characterRow.ability_scores.current as any
    },
    abilityModifiers: {
      str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0,
    },
    hitPoints: {
      current: characterRow.hit_points_current || 0,
      max: characterRow.hit_points_max || 0,
      temporary: 0,
    },
    armorClass: {
      total: characterRow.armor_class || 10,
      flatFooted: characterRow.armor_class || 10,
      touch: characterRow.armor_class || 10,
      breakdown: {
        base: 10,
        armor: 0,
        shield: 0,
        dex: 0,
        size: 0,
        natural: 0,
        deflection: 0,
        misc: 0,
      },
    },
    speed: {
      base: characterRow.speed || 30,
      armored: characterRow.speed || 30,
      current: characterRow.speed || 30,
    },
    initiative: 0,
    saves: {
      fortitude: { total: 0, base: 0, ability: 0, magic: 0, misc: 0 },
      reflex: { total: 0, base: 0, ability: 0, magic: 0, misc: 0 },
      will: { total: 0, base: 0, ability: 0, magic: 0, misc: 0 },
    },
    skills: characterRow.skills as any,
    feats: characterRow.feats as any,
    specialAbilities: [],
    languages: [],
    wealth: {
      platinum: 0,
      gold: characterRow.equipment.gold || 0,
      silver: characterRow.equipment.silver || 0,
      copper: characterRow.equipment.copper || 0,
    },
    equipment: {
      weapons: characterRow.equipment.weapons,
      armor: characterRow.equipment.armor,
      items: characterRow.equipment.items,
      magicItems: [],
    },
    background: characterRow.background || undefined,
    notes: characterRow.notes || undefined,
    avatarUrl: characterRow.avatar_url || undefined
  };
}

// ============================================================================
// CONVERTIR A FORMATO DE SUPABASE
// ============================================================================

/**
 * Convierte un Character del editor al formato CreateCharacterData de Supabase
 *
 * @param character - Personaje en formato del editor
 * @returns Datos para crear/actualizar en Supabase
 */
export function fromEditorFormat(character: Partial<Character>): CreateCharacterData {
  // Valores por defecto para equipment
  const defaultEquipment = {
    weapons: [],
    armor: [],
    items: [],
    gold: 0,
    silver: 0,
    copper: 0
  };

  return {
    name: character.name || 'Sin nombre',
    race_slug: (character as any).race?.slug ?? (character as any).race ?? null,
    class_slug: (character as any).classes?.[0]?.class?.slug ?? (character as any).class ?? null,
    level: (character as any).effectiveCharacterLevel || (character as any).level || 1,
    experience_points: (character as any).experience?.current ?? (character as any).experiencePoints ?? 0,
    alignment: (character as any).alignment || null,
    deity: (character as any).deity || null,
    ability_scores: character.abilityScores ? {
      base: character.abilityScores.base as any,
      racial: character.abilityScores.racial as any,
      current: character.abilityScores.current as any
    } : undefined,
    skills: (character as any).skills as any,
    feats: (character.feats as any) || [],
    equipment: {
      weapons: character.equipment?.weapons || defaultEquipment.weapons,
      armor: character.equipment?.armor || defaultEquipment.armor,
      items: character.equipment?.items || defaultEquipment.items,
      gold: (character as any).wealth?.gold ?? 0,
      silver: (character as any).wealth?.silver ?? 0,
      copper: (character as any).wealth?.copper ?? 0
    },
    avatar_url: (character as any).avatarUrl || null,
    background: character.background || null,
    notes: character.notes || null,
    is_public: (character as any).isPublic ?? false,
    is_favorite: (character as any).isFavorite ?? false,
    last_played_at: (character as any).lastPlayedAt ?? null
  };
}

