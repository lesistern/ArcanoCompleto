'use client';

import { useState, useEffect } from 'react';
import {
  Ruler,
  BookOpen,
  Dice6,
  Layout,
  Info,
  Loader2,
  CheckCircle,
} from 'lucide-react';

interface GamePrefs {
  unit_system: 'imperial' | 'metric';
  default_edition: '3.5' | '5e' | '5.5e';
  character_sheet_style: 'classic' | 'modern' | 'compact';
  dice_animation: boolean;
  auto_calculate: boolean;
  show_source_books: boolean;
}

interface GamePreferencesProps {
  userId: string;
}

const EDITION_INFO = {
  '3.5': {
    name: 'D&D 3.5',
    description: 'Sistema clásico con mecánicas detalladas',
    status: 'Disponible',
    statusColor: 'text-emerald-400',
  },
  '5e': {
    name: 'D&D 5e',
    description: 'Sistema simplificado y popular',
    status: 'Próximamente',
    statusColor: 'text-amber-400',
  },
  '5.5e': {
    name: 'D&D 5.5e / One D&D',
    description: 'Edición 2024 actualizada',
    status: 'Planificado',
    statusColor: 'text-blue-400',
  },
};

const SHEET_STYLES = [
  { value: 'classic', label: 'Clásico', description: 'Diseño tradicional de hoja de personaje' },
  { value: 'modern', label: 'Moderno', description: 'Interfaz limpia y minimalista' },
  { value: 'compact', label: 'Compacto', description: 'Más información en menos espacio' },
];

export function GamePreferences({ userId }: GamePreferencesProps) {
  const [prefs, setPrefs] = useState<GamePrefs>({
    unit_system: 'imperial',
    default_edition: '3.5',
    character_sheet_style: 'classic',
    dice_animation: true,
    auto_calculate: true,
    show_source_books: true,
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('game_preferences');
    if (stored) {
      try {
        setPrefs(JSON.parse(stored));
      } catch {
        // Use defaults
      }
    }

    // Also check unit preference from the existing hook
    const unitPref = localStorage.getItem('unit_preference');
    if (unitPref) {
      setPrefs(p => ({ ...p, unit_system: unitPref as 'imperial' | 'metric' }));
    }

    setLoading(false);
  }, []);

  const savePrefs = (newPrefs: GamePrefs) => {
    setPrefs(newPrefs);
    localStorage.setItem('game_preferences', JSON.stringify(newPrefs));

    // Also update unit preference for the header toggle
    localStorage.setItem('unit_preference', newPrefs.unit_system);

    // Show saved feedback
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
          <span className="text-sm text-emerald-400">Preferencias guardadas</span>
        </div>
      )}

      {/* Unit System */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/10">
            <Ruler className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-dungeon-100">Sistema de Unidades</h3>
            <p className="text-xs text-dungeon-400">Para distancias, pesos y medidas</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(['imperial', 'metric'] as const).map((system) => (
            <button
              key={system}
              onClick={() => savePrefs({ ...prefs, unit_system: system })}
              className={`p-4 rounded-lg border transition-all ${
                prefs.unit_system === system
                  ? 'bg-gold-500/20 border-gold-500/50 text-gold-300'
                  : 'bg-dungeon-800/50 border-dungeon-700 text-dungeon-300 hover:border-dungeon-600'
              }`}
            >
              <div className="text-2xl font-bold mb-1">
                {system === 'imperial' ? 'ft' : 'm'}
              </div>
              <div className="text-sm">
                {system === 'imperial' ? 'Imperial' : 'Métrico'}
              </div>
              <div className="text-xs text-dungeon-500 mt-1">
                {system === 'imperial' ? 'Pies, libras, millas' : 'Metros, kilos, kilómetros'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Default Edition */}
      <div className="pt-6 border-t border-dungeon-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <BookOpen className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-dungeon-100">Edición por Defecto</h3>
            <p className="text-xs text-dungeon-400">Para búsquedas y nuevo contenido</p>
          </div>
        </div>
        <div className="space-y-3">
          {(Object.keys(EDITION_INFO) as Array<keyof typeof EDITION_INFO>).map((edition) => {
            const info = EDITION_INFO[edition];
            const isSelected = prefs.default_edition === edition;
            const isDisabled = edition !== '3.5';

            return (
              <button
                key={edition}
                onClick={() => !isDisabled && savePrefs({ ...prefs, default_edition: edition })}
                disabled={isDisabled}
                className={`w-full p-4 rounded-lg border transition-all text-left ${
                  isSelected
                    ? 'bg-gold-500/20 border-gold-500/50'
                    : isDisabled
                    ? 'bg-dungeon-800/30 border-dungeon-700/30 opacity-60 cursor-not-allowed'
                    : 'bg-dungeon-800/50 border-dungeon-700 hover:border-dungeon-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${isSelected ? 'text-gold-300' : 'text-dungeon-200'}`}>
                      {info.name}
                    </div>
                    <div className="text-xs text-dungeon-400 mt-0.5">{info.description}</div>
                  </div>
                  <span className={`text-xs font-medium ${info.statusColor}`}>
                    {info.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Character Sheet Style */}
      <div className="pt-6 border-t border-dungeon-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <Layout className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-dungeon-100">Estilo de Hoja de Personaje</h3>
            <p className="text-xs text-dungeon-400">Apariencia del editor de personajes</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SHEET_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() => savePrefs({ ...prefs, character_sheet_style: style.value as GamePrefs['character_sheet_style'] })}
              className={`p-4 rounded-lg border transition-all text-left ${
                prefs.character_sheet_style === style.value
                  ? 'bg-gold-500/20 border-gold-500/50'
                  : 'bg-dungeon-800/50 border-dungeon-700 hover:border-dungeon-600'
              }`}
            >
              <div className={`font-medium ${prefs.character_sheet_style === style.value ? 'text-gold-300' : 'text-dungeon-200'}`}>
                {style.label}
              </div>
              <div className="text-xs text-dungeon-400 mt-1">{style.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Options */}
      <div className="pt-6 border-t border-dungeon-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <Dice6 className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-dungeon-100">Opciones de Juego</h3>
            <p className="text-xs text-dungeon-400">Comportamiento del editor y herramientas</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { key: 'dice_animation' as const, label: 'Animación de dados', description: 'Mostrar animación al tirar dados' },
            { key: 'auto_calculate' as const, label: 'Cálculo automático', description: 'Calcular modificadores y bonificadores automáticamente' },
            { key: 'show_source_books' as const, label: 'Mostrar libros fuente', description: 'Indicar de qué libro proviene cada contenido' },
          ].map((option) => (
            <div
              key={option.key}
              className="flex items-center justify-between p-4 rounded-lg bg-dungeon-800/30 border border-dungeon-700/30"
            >
              <div>
                <p className="text-sm font-medium text-dungeon-200">{option.label}</p>
                <p className="text-xs text-dungeon-400 mt-0.5">{option.description}</p>
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
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <Info className="w-5 h-5 text-blue-400 mt-0.5" />
        <div>
          <p className="text-sm text-dungeon-200">
            El sistema de unidades también se puede cambiar desde el header usando el botón <span className="font-mono bg-dungeon-700 px-1 rounded">ft/m</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
