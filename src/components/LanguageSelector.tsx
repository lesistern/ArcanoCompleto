'use client';

/**
 * Componente selector de idioma
 * Permite cambiar entre múltiples idiomas disponibles
 */

import { useState, useEffect, useRef, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Globe, Check } from 'lucide-react';
import { defaultLocale, localeNames, type Locale } from '@/i18n/config';
import { LANGUAGE_CODES, LANGUAGE_NAMES, LANGUAGE_FLAGS, type LanguageCode } from '@/lib/supabase/languages';

const LOCALE_COOKIE_KEY = 'NEXT_LOCALE';

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Detectar idioma actual desde la ruta
  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];

    if (firstSegment && LANGUAGE_CODES.includes(firstSegment as LanguageCode)) {
      setCurrentLocale(firstSegment as Locale);
    }
  }, [pathname]);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return;
      const target = event.target as Node;
      if (menuRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLocaleChange = (newLocale: Locale) => {
    setIsOpen(false);

    // Construir nueva ruta
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];

    // Si el primer segmento es un idioma, reemplazarlo
    if (firstSegment && LANGUAGE_CODES.includes(firstSegment as LanguageCode)) {
      segments[0] = newLocale;
    } else {
      // Si no hay idioma, agregarlo al inicio
      segments.unshift(newLocale);
    }

    const newPath = `/${segments.join('/')}`;

    // Guardar preferencia en cookie
    document.cookie = `${LOCALE_COOKIE_KEY}=${newLocale};path=/;max-age=31536000`;

    // Navegar usando el router de Next.js
    startTransition(() => {
      router.push(newPath);
      router.refresh();
    });
  };

  return (
    <div className="relative">
      {/* Botón de globo */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-dungeon-800 transition-all focus:outline-none text-dungeon-300 hover:text-gold-400"
        aria-label={`Seleccionar idioma (actual: ${localeNames[currentLocale]})`}
        title={`Idioma: ${localeNames[currentLocale]}`}
      >
        <Globe size={20} />
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-56 bg-dungeon-800 border border-dungeon-700 rounded-lg shadow-xl z-50 overflow-hidden"
        >
          <div className="p-2">
            {LANGUAGE_CODES.map((langCode) => {
              const langName = LANGUAGE_NAMES[langCode as LanguageCode];
              const langFlag = LANGUAGE_FLAGS[langCode as LanguageCode];
              const isCurrent = currentLocale === langCode;

              return (
                <button
                  key={langCode}
                  onClick={() => handleLocaleChange(langCode as Locale)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                    isCurrent
                      ? 'bg-gold-500/20 text-gold-400'
                      : 'text-dungeon-300 hover:bg-dungeon-700 hover:text-gold-400'
                  }`}
                  role="menuitem"
                  title={`Cambiar a ${langName.native} (${langName.en})`}
                >
                  {/* Bandera emoji */}
                  <span className="text-lg">{langFlag}</span>
                  {/* Nombres del idioma */}
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{langName.native}</div>
                    <div className="text-xs text-dungeon-500">{langName.en}</div>
                  </div>
                  {/* Icono de estado */}
                  {isCurrent && (
                    <Check size={18} className="text-gold-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Hook para obtener el idioma actual desde la URL
 */
export function useLocale(): Locale {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];

    if (firstSegment && LANGUAGE_CODES.includes(firstSegment as LanguageCode)) {
      setLocale(firstSegment as Locale);
    } else {
      setLocale(defaultLocale);
    }
  }, [pathname]);

  return locale;
}
