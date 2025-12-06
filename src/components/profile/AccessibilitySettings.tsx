'use client';

import { useState, useEffect } from 'react';
import {
  Eye,
  Type,
  Zap,
  Contrast,
  Info,
  Loader2,
  CheckCircle,
  RotateCcw,
} from 'lucide-react';

interface AccessibilityPrefs {
  reduced_motion: boolean;
  high_contrast: boolean;
  font_size: 'small' | 'normal' | 'large' | 'xlarge';
  dyslexia_font: boolean;
  focus_indicators: boolean;
  screen_reader_mode: boolean;
}

interface AccessibilitySettingsProps {
  userId: string;
}

const FONT_SIZES = [
  { value: 'small', label: 'Pequeño', size: '14px', example: 'text-sm' },
  { value: 'normal', label: 'Normal', size: '16px', example: 'text-base' },
  { value: 'large', label: 'Grande', size: '18px', example: 'text-lg' },
  { value: 'xlarge', label: 'Extra Grande', size: '20px', example: 'text-xl' },
];

const DEFAULT_PREFS: AccessibilityPrefs = {
  reduced_motion: false,
  high_contrast: false,
  font_size: 'normal',
  dyslexia_font: false,
  focus_indicators: true,
  screen_reader_mode: false,
};

export function AccessibilitySettings({ userId }: AccessibilitySettingsProps) {
  const [prefs, setPrefs] = useState<AccessibilityPrefs>(DEFAULT_PREFS);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('accessibility_preferences');
    if (stored) {
      try {
        setPrefs(JSON.parse(stored));
      } catch {
        // Use defaults
      }
    }
    setLoading(false);
  }, []);

  // Apply preferences to document
  useEffect(() => {
    if (loading) return;

    const html = document.documentElement;

    // Reduced motion
    if (prefs.reduced_motion) {
      html.classList.add('reduce-motion');
    } else {
      html.classList.remove('reduce-motion');
    }

    // High contrast
    if (prefs.high_contrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }

    // Font size
    html.style.fontSize = FONT_SIZES.find(f => f.value === prefs.font_size)?.size || '16px';

    // Dyslexia font
    if (prefs.dyslexia_font) {
      html.classList.add('dyslexia-font');
    } else {
      html.classList.remove('dyslexia-font');
    }

    // Focus indicators
    if (prefs.focus_indicators) {
      html.classList.add('focus-visible');
    } else {
      html.classList.remove('focus-visible');
    }
  }, [prefs, loading]);

  const savePrefs = (newPrefs: AccessibilityPrefs) => {
    setPrefs(newPrefs);
    localStorage.setItem('accessibility_preferences', JSON.stringify(newPrefs));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetDefaults = () => {
    savePrefs(DEFAULT_PREFS);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Saved indicator */}
      {saved && (
        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg animate-pulse">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-emerald-400">Preferencias de accesibilidad guardadas</span>
        </div>
      )}

      {/* Font Size */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Type className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-dungeon-100">Tamaño de Fuente</h3>
            <p className="text-xs text-dungeon-400">Ajusta el tamaño del texto en todo el sitio</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FONT_SIZES.map((size) => (
            <button
              key={size.value}
              onClick={() => savePrefs({ ...prefs, font_size: size.value as AccessibilityPrefs['font_size'] })}
              className={`p-4 rounded-lg border transition-all text-center ${
                prefs.font_size === size.value
                  ? 'bg-gold-500/20 border-gold-500/50'
                  : 'bg-dungeon-800/50 border-dungeon-700 hover:border-dungeon-600'
              }`}
            >
              <div className={`font-medium mb-1 ${prefs.font_size === size.value ? 'text-gold-300' : 'text-dungeon-200'}`}>
                {size.label}
              </div>
              <div className="text-xs text-dungeon-500">{size.size}</div>
            </button>
          ))}
        </div>
        {/* Preview */}
        <div className="mt-4 p-4 rounded-lg bg-dungeon-800/30 border border-dungeon-700/30">
          <p className="text-dungeon-400 text-xs mb-2">Vista previa:</p>
          <p className={`text-dungeon-200 ${FONT_SIZES.find(f => f.value === prefs.font_size)?.example}`}>
            Este es un texto de ejemplo para mostrar el tamaño seleccionado.
          </p>
        </div>
      </div>

      {/* Visual Options */}
      <div className="pt-6 border-t border-dungeon-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Eye className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-dungeon-100">Opciones Visuales</h3>
            <p className="text-xs text-dungeon-400">Ajusta la apariencia para mayor comodidad</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            {
              key: 'high_contrast' as const,
              label: 'Alto contraste',
              description: 'Aumenta el contraste de colores para mejor legibilidad',
              icon: Contrast,
              color: 'text-amber-400',
              bgColor: 'bg-amber-500/10',
            },
            {
              key: 'dyslexia_font' as const,
              label: 'Fuente para dislexia',
              description: 'Usa una fuente diseñada para facilitar la lectura',
              icon: Type,
              color: 'text-emerald-400',
              bgColor: 'bg-emerald-500/10',
            },
            {
              key: 'focus_indicators' as const,
              label: 'Indicadores de foco',
              description: 'Muestra indicadores claros al navegar con teclado',
              icon: Eye,
              color: 'text-cyan-400',
              bgColor: 'bg-cyan-500/10',
            },
          ].map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.key}
                className="flex items-center justify-between p-4 rounded-lg bg-dungeon-800/30 border border-dungeon-700/30"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${option.bgColor}`}>
                    <Icon className={`w-5 h-5 ${option.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dungeon-200">{option.label}</p>
                    <p className="text-xs text-dungeon-400 mt-0.5">{option.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => savePrefs({ ...prefs, [option.key]: !prefs[option.key] })}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    prefs[option.key] ? 'bg-gold-500' : 'bg-dungeon-600'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      prefs[option.key] ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motion Options */}
      <div className="pt-6 border-t border-dungeon-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-rose-500/10">
            <Zap className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-dungeon-100">Movimiento y Animaciones</h3>
            <p className="text-xs text-dungeon-400">Controla las animaciones del sitio</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg bg-dungeon-800/30 border border-dungeon-700/30">
            <div>
              <p className="text-sm font-medium text-dungeon-200">Reducir movimiento</p>
              <p className="text-xs text-dungeon-400 mt-0.5">
                Minimiza animaciones y transiciones para reducir distracciones
              </p>
            </div>
            <button
              onClick={() => savePrefs({ ...prefs, reduced_motion: !prefs.reduced_motion })}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                prefs.reduced_motion ? 'bg-gold-500' : 'bg-dungeon-600'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  prefs.reduced_motion ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-dungeon-800/30 border border-dungeon-700/30">
            <div>
              <p className="text-sm font-medium text-dungeon-200">Modo lector de pantalla</p>
              <p className="text-xs text-dungeon-400 mt-0.5">
                Optimiza la estructura para lectores de pantalla (NVDA, JAWS, VoiceOver)
              </p>
            </div>
            <button
              onClick={() => savePrefs({ ...prefs, screen_reader_mode: !prefs.screen_reader_mode })}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                prefs.screen_reader_mode ? 'bg-gold-500' : 'bg-dungeon-600'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  prefs.screen_reader_mode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="pt-6 border-t border-dungeon-700/50">
        <button
          onClick={resetDefaults}
          className="flex items-center gap-2 px-4 py-2.5 text-sm text-dungeon-300 hover:text-dungeon-100 bg-dungeon-700/50 hover:bg-dungeon-700 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Restablecer valores por defecto
        </button>
      </div>

      {/* Info */}
      <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <Info className="w-5 h-5 text-blue-400 mt-0.5" />
        <div>
          <p className="text-sm text-dungeon-200">
            Estas preferencias se guardan localmente en tu navegador y se aplicarán automáticamente en futuras visitas.
          </p>
          <p className="text-xs text-dungeon-400 mt-1">
            Si usas el modo &quot;Reducir movimiento&quot; de tu sistema operativo, se respetará automáticamente.
          </p>
        </div>
      </div>
    </div>
  );
}
