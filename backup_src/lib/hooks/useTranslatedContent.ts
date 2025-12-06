/**
 * Hook para obtener contenido traducido desde las tablas *_translations
 * Con fallback automático al inglés si no existe traducción
 */

import { useMemo } from 'react';
import type { Locale } from '@/i18n/config';

export interface TranslatableContent {
  id: string;
  name: string;
  description?: string | null;
  [key: string]: any;
}

export interface Translation {
  name: string;
  description?: string | null;
  [key: string]: any;
}

/**
 * Obtiene el contenido en el idioma especificado, con fallback a inglés
 *
 * @param translations - Objeto con traducciones por idioma { en: {...}, es: {...} }
 * @param locale - Idioma actual ('en' | 'es')
 * @returns Contenido traducido
 *
 * @example
 * const spell = {
 *   id: '123',
 *   translations: {
 *     en: { name: 'Fireball', description: '...' },
 *     es: { name: 'Bola de Fuego', description: '...' }
 *   }
 * };
 * const translated = useTranslatedContent(spell.translations, 'es');
 * // => { name: 'Bola de Fuego', description: '...' }
 */
export function useTranslatedContent<T extends Translation>(
  translations: Record<string, T> | null | undefined,
  locale: Locale
): T | null {
  return useMemo(() => {
    if (!translations) return null;

    // Intentar obtener traducción en el idioma actual
    if (translations[locale]) {
      return translations[locale];
    }

    // Fallback a inglés
    if (translations['en']) {
      return translations['en'];
    }

    // Si no hay ninguna traducción, retornar null
    return null;
  }, [translations, locale]);
}

/**
 * Versión simplificada que combina contenido base con traducción
 *
 * @param baseContent - Contenido base con datos no traducibles (id, slug, etc.)
 * @param translations - Traducciones por idioma
 * @param locale - Idioma actual
 * @returns Contenido combinado con traducción aplicada
 *
 * @example
 * const spell = {
 *   id: '123',
 *   slug: 'fireball',
 *   school: 'Evocation',
 *   translations: { en: {...}, es: {...} }
 * };
 * const content = useMergedContent(spell, spell.translations, 'es');
 * // => { id: '123', slug: 'fireball', school: 'Evocation', name: 'Bola de Fuego', ... }
 */
export function useMergedContent<
  TBase extends TranslatableContent,
  TTranslation extends Translation
>(
  baseContent: TBase,
  translations: Record<string, TTranslation> | null | undefined,
  locale: Locale
): TBase & Partial<TTranslation> {
  const translation = useTranslatedContent(translations, locale);

  return useMemo(() => {
    if (!translation) return baseContent as TBase & Partial<TTranslation>;

    return {
      ...baseContent,
      ...translation,
    };
  }, [baseContent, translation]);
}
