/**
 * Configuración de internacionalización (i18n)
 * Soporta: 9 idiomas principales
 */

export const locales = ['en', 'es', 'zh', 'ar', 'pt', 'fr', 'ru', 'de', 'ja'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'es'; // Español por defecto

export const localeNames: Record<Locale, string> = {
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

export const localeFlags: Record<Locale, string> = {
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
