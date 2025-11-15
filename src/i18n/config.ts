/**
 * Configuración de internacionalización (i18n)
 * Soporta: Inglés (en), Español (es)
 */

export const locales = ['en', 'es'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'es'; // Español por defecto

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
};
