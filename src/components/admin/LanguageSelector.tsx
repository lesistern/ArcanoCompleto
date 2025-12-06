'use client';

import { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  native_name: string;
  flag?: string;
}

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: string;
  onSelectLanguage: (code: string) => void;
  disabled?: boolean;
  variant?: 'dropdown' | 'tabs';
  showFlags?: boolean;
  className?: string;
}

export function LanguageSelector({
  languages,
  selectedLanguage,
  onSelectLanguage,
  disabled = false,
  variant = 'dropdown',
  showFlags = true,
  className = '',
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selected = languages.find((l) => l.code === selectedLanguage);

  // Mapa de banderas emoji para idiomas
  const flagMap: Record<string, string> = {
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

  if (variant === 'tabs') {
    return (
      <div className={`flex gap-2 flex-wrap ${className}`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelectLanguage(lang.code)}
            disabled={disabled}
            className={`
              px-3 py-2 rounded-lg font-medium transition-all text-sm
              ${
                selectedLanguage === lang.code
                  ? 'bg-gold-500 text-dungeon-900 shadow-lg'
                  : 'bg-dungeon-700 text-dungeon-200 hover:bg-dungeon-600'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {showFlags && <span className="mr-1">{flagMap[lang.code] || '🌐'}</span>}
            {lang.code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  // Variant: dropdown (por defecto)
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-3 py-2 rounded-lg
          bg-dungeon-900 border border-dungeon-600
          text-dungeon-100 hover:border-dungeon-500
          focus:outline-none focus:ring-2 focus:ring-gold-400
          transition-colors duration-200
          flex items-center justify-between gap-2
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <div className="flex items-center gap-2">
          {showFlags && <span className="text-lg">{flagMap[selectedLanguage] || '🌐'}</span>}
          <div className="text-left">
            <div className="text-xs text-dungeon-400">Idioma</div>
            <div className="font-medium">
              {selected ? `${selected.native_name} (${selected.code.toUpperCase()})` : 'Seleccionar...'}
            </div>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && !disabled && (
        <div
          className="
            absolute z-50 mt-2 w-full
            bg-dungeon-800 border border-dungeon-600 rounded-lg
            shadow-xl overflow-hidden
          "
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onSelectLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`
                w-full px-4 py-3 text-left transition-colors
                flex items-center gap-3
                ${
                  selectedLanguage === lang.code
                    ? 'bg-gold-500/20 border-l-4 border-gold-500'
                    : 'hover:bg-dungeon-700 border-l-4 border-transparent'
                }
              `}
            >
              {showFlags && <span className="text-xl">{flagMap[lang.code] || '🌐'}</span>}
              <div className="flex-1">
                <div className="font-medium text-dungeon-100">{lang.native_name}</div>
                <div className="text-xs text-dungeon-400">{lang.code.toUpperCase()}</div>
              </div>
              {selectedLanguage === lang.code && (
                <div className="text-gold-400">✓</div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay para cerrar dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
