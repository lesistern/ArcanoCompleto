/**
 * Servicio de Personajes para Supabase
 *
 * Proporciona operaciones CRUD para la tabla `characters`
 * Integrado con el sistema de guardado automático del editor de personajes
 */

import { createClient } from '@/lib/supabase/client';
import type { Character } from '@/types/character';

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
}

export interface UpdateCharacterData extends Partial<CreateCharacterData> {
  hit_points_current?: number | null;
  hit_points_max?: number | null;
  armor_class?: number | null;
  speed?: number | null;
  avatar_url?: string | null;
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

  // Crear personaje
  const { data: character, error } = await supabase
    .from('characters')
    .insert({
      user_id: user.id,
      name: data.name || 'Sin nombre',
      race_slug: data.race_slug,
      class_slug: data.class_slug,
      level: data.level || 1,
      experience_points: data.experience_points || 0,
      alignment: data.alignment,
      deity: data.deity,
      ability_scores: data.ability_scores || {
        base: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
        racial: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 },
        current: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 }
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
      background: data.background,
      notes: data.notes,
      is_public: data.is_public || false,
      last_played_at: new Date().toISOString()
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating character:', error);
    throw new Error(`Error al crear personaje: ${error.message}`);
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
export function toEditorFormat(characterRow: CharacterRow): Character {
  return {
    name: characterRow.name,
    race: characterRow.race_slug || undefined,
    class: characterRow.class_slug || undefined,
    level: characterRow.level,
    experiencePoints: characterRow.experience_points,
    alignment: characterRow.alignment || undefined,
    deity: characterRow.deity || undefined,
    abilityScores: {
      base: characterRow.ability_scores.base,
      racial: characterRow.ability_scores.racial,
      current: characterRow.ability_scores.current
    },
    hitPoints: {
      current: characterRow.hit_points_current || 0,
      max: characterRow.hit_points_max || 0
    },
    armorClass: characterRow.armor_class || 10,
    speed: characterRow.speed || 30,
    skills: characterRow.skills,
    feats: characterRow.feats,
    equipment: {
      weapons: characterRow.equipment.weapons,
      armor: characterRow.equipment.armor,
      items: characterRow.equipment.items,
      currency: {
        gold: characterRow.equipment.gold,
        silver: characterRow.equipment.silver,
        copper: characterRow.equipment.copper
      }
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
    race_slug: character.race || null,
    class_slug: character.class || null,
    level: character.level || 1,
    experience_points: character.experiencePoints || 0,
    alignment: character.alignment || null,
    deity: character.deity || null,
    ability_scores: character.abilityScores ? {
      base: character.abilityScores.base,
      racial: character.abilityScores.racial,
      current: character.abilityScores.current
    } : undefined,
    skills: character.skills || {},
    feats: character.feats || [],
    equipment: character.equipment ? {
      weapons: character.equipment.weapons || [],
      armor: character.equipment.armor || [],
      items: character.equipment.items || [],
      gold: character.equipment.currency?.gold || 0,
      silver: character.equipment.currency?.silver || 0,
      copper: character.equipment.currency?.copper || 0
    } : defaultEquipment,
    avatar_url: character.avatarUrl || null,
    background: character.background || null,
    notes: character.notes || null
  };
}
