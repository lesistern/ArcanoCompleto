'use client';

/**
 * Componente selector de idioma
 * Permite cambiar entre inglés y español
 */

import { useState, useEffect } from 'react';
import { locales, localeNames, type Locale } from '@/i18n/config';

const LOCALE_STORAGE_KEY = 'preferred-locale';

// SVG Flags para mejor compatibilidad
const FlagIcon = ({ locale }: { locale: Locale }) => {
  if (locale === 'es') {
    return (
      <svg viewBox="0 0 36 36" className="w-7 h-7">
        <path fill="#C60A1D" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"/>
        <path fill="#FFC400" d="M0 12h36v12H0z"/>
        <path fill="#EA596E" d="M0 12h36v3H0z"/>
        <path fill="#F4A2B2" d="M0 21h36v3H0z"/>
      </svg>
    );
  }
  // UK Flag (Union Jack)
  return (
    <svg viewBox="0 0 36 36" className="w-7 h-7">
      <path fill="#00247D" d="M0 0h36v36H0z"/>
      <path d="M0 0l36 36M36 0L0 36" stroke="#FFF" strokeWidth="6"/>
      <path d="M0 0l36 36M36 0L0 36" stroke="#CF142B" strokeWidth="4"/>
      <path d="M18 0v36M0 18h36" stroke="#FFF" strokeWidth="10"/>
      <path d="M18 0v36M0 18h36" stroke="#CF142B" strokeWidth="6"/>
    </svg>
  );
};

export function LanguageSelector() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('es');
  const [isOpen, setIsOpen] = useState(false);

  // Cargar idioma guardado en localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (saved && locales.includes(saved)) {
      setCurrentLocale(saved);
    }
  }, []);

  const handleLocaleChange = (locale: Locale) => {
    setCurrentLocale(locale);
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    setIsOpen(false);

    // Recargar la página para aplicar el nuevo idioma
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-dungeon-800 transition-all focus:outline-none"
        aria-label="Seleccionar idioma"
        title={localeNames[currentLocale]}
      >
        <FlagIcon locale={currentLocale} />
      </button>

      {isOpen && (
        <>
          {/* Overlay para cerrar al hacer click fuera */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-2 w-auto rounded-md bg-dungeon-800 shadow-xl border border-dungeon-700">
            <div className="py-1" role="menu">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => handleLocaleChange(locale)}
                  className={`flex items-center justify-center w-12 h-12 p-2 transition-all first:rounded-t-md last:rounded-b-md ${
                    currentLocale === locale
                      ? 'bg-dungeon-700 ring-2 ring-gold-500 ring-inset'
                      : 'hover:bg-dungeon-700'
                  }`}
                  role="menuitem"
                  title={localeNames[locale]}
                >
                  <FlagIcon locale={locale} />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Hook para obtener el idioma actual
 */
export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>('es');

  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (saved && locales.includes(saved)) {
      setLocale(saved);
    }
  }, []);

  return locale;
}
