/**
 * Servicio de Traducciones de Deidades
 * CRUD + Aprobación + Votación
 */

import { createClient } from '@/lib/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';

// ========================================
// TIPOS
// ========================================

export interface DeityTranslation {
  id: string;
  deity_id: string;
  language_code: string;
  name: string;
  titles?: string | null;
  portfolio?: string | null;
  symbol?: string | null;
  worshipers?: string | null;
  home_plane?: string | null;
  description?: string | null;
  translation_status: 'pending' | 'approved' | 'rejected';
  translation_quality?: number | null;
  translated_by?: string | null;
  reviewed_by?: string | null;
  rejection_reason?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DeityTranslationWithVotes extends DeityTranslation {
  translator_name?: string | null;
  vote_count: number;
  upvote_count: number;
  downvote_count: number;
}

export interface Language {
  code: string;
  name_en: string;
  name_native: string;
  iso_639_1: string;
}

export interface TranslationVote {
  id: string;
  translation_id: string;
  user_id: string;
  vote_value: -1 | 1;
  created_at: string;
  updated_at: string;
}

export interface PendingTranslation {
  id: string;
  deity_id: string;
  deity_slug: string;
  language_code: string;
  language_name: string;
  name: string;
  description?: string | null;
  translator_name: string;
  translator_tier: string;
  created_at: string;
  vote_count: number;
}

export interface TranslatorStatistics {
  id: string;
  display_name: string;
  tier_code: string;
  approved_translations: number;
  pending_translations: number;
  rejected_translations: number;
  languages_contributed: number;
  approval_rate_percent: number;
  total_upvotes: number;
}

export type CreateTranslationData = Omit<
  DeityTranslation,
  'id' | 'translation_status' | 'created_at' | 'updated_at' | 'translated_by'
> & {
  translated_by: string;
};

export type UpdateTranslationData = Partial<Omit<
  DeityTranslation,
  'id' | 'deity_id' | 'language_code' | 'created_at' | 'updated_at'
>>;

// ========================================
// FUNCIONES DE IDIOMAS
// ========================================

/**
 * Obtiene la lista de todos los idiomas soportados
 */
export async function getLanguages(): Promise<Language[]> {
  const client = createClient();

  const { data, error } = await client
    .from('languages')
    .select('*')
    .order('code');

  if (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene un idioma específico por código
 */
export async function getLanguageByCode(code: string): Promise<Language | null> {
  const client = createClient();

  const { data, error } = await client
    .from('languages')
    .select('*')
    .eq('code', code)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching language:', error);
    throw error;
  }

  return data || null;
}

// ========================================
// FUNCIONES CRUD DE TRADUCCIONES
// ========================================

/**
 * Obtiene traducciones de una deidad
 * @param deityId - ID de la deidad
 * @param languageCode - (Opcional) Código de idioma específico
 * @param includeRejected - (Opcional) Incluir traducciones rechazadas
 */
export async function getDeityTranslations(
  deityId: string,
  languageCode?: string,
  includeRejected: boolean = false
): Promise<DeityTranslation[]> {
  const client = createClient();

  let query = client
    .from('deity_translations')
    .select('*')
    .eq('deity_id', deityId);

  if (languageCode) {
    query = query.eq('language_code', languageCode);
  }

  if (!includeRejected) {
    query = query.neq('translation_status', 'rejected');
  }

  const { data, error } = await query.order('language_code');

  if (error) {
    console.error('Error fetching deity translations:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene una traducción específica con votos
 */
export async function getDeityTranslationWithVotes(
  translationId: string
): Promise<DeityTranslationWithVotes | null> {
  const client = createClient();

  const { data, error } = await client
    .from('v_deity_translations_with_votes')
    .select('*')
    .eq('id', translationId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching translation with votes:', error);
    throw error;
  }

  return data || null;
}

/**
 * Crea una nueva traducción
 */
export async function createDeityTranslation(
  data: CreateTranslationData
): Promise<DeityTranslation> {
  const client = createClient();

  const { data: result, error } = await client
    .from('deity_translations')
    .insert([
      {
        deity_id: data.deity_id,
        language_code: data.language_code,
        name: data.name,
        titles: data.titles,
        portfolio: data.portfolio,
        symbol: data.symbol,
        worshipers: data.worshipers,
        home_plane: data.home_plane,
        description: data.description,
        translated_by: data.translated_by,
        translation_status: 'pending',
      },
    ])
    .select('*')
    .single();

  if (error) {
    console.error('Error creating translation:', error);
    throw error;
  }

  return result;
}

/**
 * Actualiza una traducción existente
 */
export async function updateDeityTranslation(
  translationId: string,
  data: UpdateTranslationData
): Promise<DeityTranslation> {
  const client = createClient();

  const { data: result, error } = await client
    .from('deity_translations')
    .update(data)
    .eq('id', translationId)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating translation:', error);
    throw error;
  }

  return result;
}

/**
 * Elimina una traducción (solo creador o admin)
 */
export async function deleteDeityTranslation(translationId: string): Promise<void> {
  const client = createClient();

  const { error } = await client
    .from('deity_translations')
    .delete()
    .eq('id', translationId);

  if (error) {
    console.error('Error deleting translation:', error);
    throw error;
  }
}

// ========================================
// FUNCIONES DE APROBACIÓN/RECHAZO
// ========================================

/**
 * Aprueba una traducción y otorga XP
 * Solo para users con tier 'reviewer' o 'admin'
 */
export async function approveDeityTranslation(
  translationId: string,
  reviewerId: string,
  qualityScore: number = 5
): Promise<{ success: boolean; message: string; xpAwarded: number }> {
  const client = createClient();

  const { data, error } = await client
    .rpc('approve_translation', {
      p_translation_id: translationId,
      p_reviewer_id: reviewerId,
      p_quality_score: qualityScore,
    })
    .single() as { data: { success?: boolean; message?: string; xp_awarded?: number } | null; error: any };

  if (error) {
    console.error('Error approving translation:', error);
    throw error;
  }

  return {
    success: data?.success || false,
    message: data?.message || 'Error desconocido',
    xpAwarded: data?.xp_awarded || 0,
  };
}

/**
 * Rechaza una traducción con comentario
 * Solo para users con tier 'reviewer' o 'admin'
 */
export async function rejectDeityTranslation(
  translationId: string,
  reviewerId: string,
  rejectionReason: string
): Promise<{ success: boolean; message: string }> {
  const client = createClient();

  const { data, error } = await client
    .rpc('reject_translation', {
      p_translation_id: translationId,
      p_reviewer_id: reviewerId,
      p_rejection_reason: rejectionReason,
    })
    .single() as { data: { success?: boolean; message?: string } | null; error: any };

  if (error) {
    console.error('Error rejecting translation:', error);
    throw error;
  }

  return {
    success: data?.success || false,
    message: data?.message || 'Error desconocido',
  };
}

// ========================================
// FUNCIONES DE VOTACIÓN
// ========================================

/**
 * Vota una traducción (upvote: 1, downvote: -1, clear: 0)
 */
export async function toggleTranslationVote(
  translationId: string,
  userId: string,
  voteValue: 1 | -1 | 0
): Promise<{ success: boolean; message: string; voteCount: number }> {
  const client = createClient();

  const { data, error } = await client
    .rpc('toggle_translation_vote', {
      p_translation_id: translationId,
      p_user_id: userId,
      p_vote_value: voteValue,
    })
    .single() as { data: { success?: boolean; message?: string; current_vote_count?: number } | null; error: any };

  if (error) {
    console.error('Error toggling vote:', error);
    throw error;
  }

  return {
    success: data?.success || false,
    message: data?.message || 'Error desconocido',
    voteCount: data?.current_vote_count || 0,
  };
}

/**
 * Obtiene el voto actual del usuario para una traducción
 */
export async function getUserVote(
  translationId: string,
  userId: string
): Promise<TranslationVote | null> {
  const client = createClient();

  const { data, error } = await client
    .from('translation_votes')
    .select('*')
    .eq('translation_id', translationId)
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user vote:', error);
    throw error;
  }

  return data || null;
}

// ========================================
// FUNCIONES DE LISTADO
// ========================================

/**
 * Obtiene traducciones pendientes de revisión
 */
export async function getPendingTranslations(
  languageCode?: string,
  limit: number = 50
): Promise<PendingTranslation[]> {
  const client = createClient();

  let query = client
    .from('v_pending_translations_for_review')
    .select('*')
    .limit(limit);

  if (languageCode) {
    query = query.eq('language_code', languageCode);
  }

  const { data, error } = await query.order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching pending translations:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene traducciones de un usuario
 */
export async function getUserTranslations(userId: string): Promise<DeityTranslationWithVotes[]> {
  const client = createClient();

  const { data, error } = await client
    .from('v_deity_translations_with_votes')
    .select('*')
    .eq('translated_by', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user translations:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene traducciones aprobadas de una deidad
 */
export async function getApprovedDeityTranslations(deityId: string): Promise<DeityTranslation[]> {
  const client = createClient();

  const { data, error } = await client
    .rpc('get_deity_translations', {
      p_deity_id: deityId,
    });

  if (error) {
    console.error('Error fetching approved translations:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene estadísticas de traducciones por idioma
 */
export async function getTranslationStatsByLanguage(): Promise<
  Array<{
    language_code: string;
    language_name: string;
    pending_count: number;
  }>
> {
  const client = createClient();

  const { data, error } = await client
    .rpc('count_pending_translations_by_language');

  if (error) {
    console.error('Error fetching translation stats:', error);
    throw error;
  }

  return data || [];
}

// ========================================
// FUNCIONES DE ESTADÍSTICAS
// ========================================

/**
 * Obtiene estadísticas de un traductor
 */
export async function getTranslatorStatistics(userId: string): Promise<TranslatorStatistics | null> {
  const client = createClient();

  const { data, error } = await client
    .from('v_translator_statistics')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching translator statistics:', error);
    throw error;
  }

  return data || null;
}

/**
 * Obtiene los traductores más activos
 */
export async function getTopTranslators(limit: number = 10): Promise<TranslatorStatistics[]> {
  const client = createClient();

  const { data, error } = await client
    .from('v_translator_statistics')
    .select('*')
    .gt('approved_translations', 0)
    .order('approved_translations', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching top translators:', error);
    throw error;
  }

  return data || [];
}

// ========================================
// CONSTANTES
// ========================================

export const LANGUAGE_CODES = [
  'en', // Inglés
  'es', // Español
  'zh', // Chino Mandarín
  'ar', // Árabe
  'pt', // Portugués
  'fr', // Francés
  'ru', // Ruso
  'de', // Alemán
  'ja', // Japonés
] as const;

export type LanguageCode = (typeof LANGUAGE_CODES)[number];

// Mapeo de códigos a nombres
export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: 'English',
  es: 'Español',
  zh: '中文 (简体)',
  ar: 'العربية',
  pt: 'Português',
  fr: 'Français',
  ru: 'Русский',
  de: 'Deutsch',
  ja: '日本語',
};

// Emojis por idioma
export const LANGUAGE_FLAGS: Record<LanguageCode, string> = {
  en: '🇬🇧',
  es: '🇪🇸',
  zh: '🇨🇳',
  ar: '🇸🇦',
  pt: '🇵🇹',
  fr: '🇫🇷',
  ru: '🇷🇺',
  de: '🇩🇪',
  ja: '🇯🇵',
};
