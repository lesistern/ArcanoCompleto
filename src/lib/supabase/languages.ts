/**
 * Servicio de Lenguajes
 * Manejo de idiomas soportados
 */

import { createClient } from '@/lib/supabase/client';

export interface Language {
  code: string;
  name_en: string;
  name_native: string;
  iso_639_1: string;
  created_at?: string;
}

/**
 * Obtiene todos los idiomas soportados
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

/**
 * Obtiene múltiples idiomas por códigos
 */
export async function getLanguagesByCodes(codes: string[]): Promise<Language[]> {
  const client = createClient();

  const { data, error } = await client
    .from('languages')
    .select('*')
    .in('code', codes)
    .order('code');

  if (error) {
    console.error('Error fetching languages by codes:', error);
    throw error;
  }

  return data || [];
}

// ========================================
// CONSTANTES
// ========================================

/**
 * Códigos de idiomas soportados
 * En orden de prioridad/popularidad
 */
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

/**
 * Nombres de idiomas en inglés y su nombre nativo
 */
export const LANGUAGE_NAMES: Record<LanguageCode, { en: string; native: string }> = {
  en: { en: 'English', native: 'English' },
  es: { en: 'Spanish', native: 'Español' },
  zh: { en: 'Chinese (Mandarin)', native: '中文 (简体)' },
  ar: { en: 'Arabic', native: 'العربية' },
  pt: { en: 'Portuguese', native: 'Português' },
  fr: { en: 'French', native: 'Français' },
  ru: { en: 'Russian', native: 'Русский' },
  de: { en: 'German', native: 'Deutsch' },
  ja: { en: 'Japanese', native: '日本語' },
};

/**
 * Banderas emoji por idioma
 */
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

/**
 * Colores temáticos por idioma para UI
 */
export const LANGUAGE_COLORS: Record<LanguageCode, string> = {
  en: 'text-blue-400',
  es: 'text-red-400',
  zh: 'text-yellow-400',
  ar: 'text-orange-400',
  pt: 'text-green-400',
  fr: 'text-purple-400',
  ru: 'text-cyan-400',
  de: 'text-pink-400',
  ja: 'text-rose-400',
};

/**
 * Colores de fondo por idioma
 */
export const LANGUAGE_BG_COLORS: Record<LanguageCode, string> = {
  en: 'bg-blue-900/20',
  es: 'bg-red-900/20',
  zh: 'bg-yellow-900/20',
  ar: 'bg-orange-900/20',
  pt: 'bg-green-900/20',
  fr: 'bg-purple-900/20',
  ru: 'bg-cyan-900/20',
  de: 'bg-pink-900/20',
  ja: 'bg-rose-900/20',
};

/**
 * Colores de borde por idioma
 */
export const LANGUAGE_BORDER_COLORS: Record<LanguageCode, string> = {
  en: 'border-blue-500',
  es: 'border-red-500',
  zh: 'border-yellow-500',
  ar: 'border-orange-500',
  pt: 'border-green-500',
  fr: 'border-purple-500',
  ru: 'border-cyan-500',
  de: 'border-pink-500',
  ja: 'border-rose-500',
};

/**
 * Obtiene el nombre de un idioma
 * @param code - Código de idioma
 * @param format - 'native' para nombre nativo, 'en' para inglés
 */
export function getLanguageName(code: LanguageCode, format: 'native' | 'en' = 'native'): string {
  return LANGUAGE_NAMES[code]?.[format] || code;
}

/**
 * Obtiene la bandera de un idioma
 */
export function getLanguageFlag(code: LanguageCode): string {
  return LANGUAGE_FLAGS[code] || '🌐';
}

/**
 * Obtiene el color de UI de un idioma
 */
export function getLanguageColor(code: LanguageCode): string {
  return LANGUAGE_COLORS[code] || 'text-gray-400';
}

/**
 * Obtiene el color de fondo de un idioma
 */
export function getLanguageBgColor(code: LanguageCode): string {
  return LANGUAGE_BG_COLORS[code] || 'bg-gray-900/20';
}

/**
 * Obtiene el color de borde de un idioma
 */
export function getLanguageBorderColor(code: LanguageCode): string {
  return LANGUAGE_BORDER_COLORS[code] || 'border-gray-500';
}

/**
 * Valida si un código de idioma es válido
 */
export function isValidLanguageCode(code: string): code is LanguageCode {
  return LANGUAGE_CODES.includes(code as LanguageCode);
}
