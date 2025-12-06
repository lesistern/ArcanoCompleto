'use client';

import { useUnitPreference } from '@/lib/hooks/useUnitPreference';
import { Ruler } from 'lucide-react';

interface UnitSelectorProps {
  /** Variante de estilo */
  variant?: 'button' | 'toggle' | 'dropdown';
  /** Clase CSS adicional */
  className?: string;
  /** Mostrar etiqueta de texto */
  showLabel?: boolean;
}

/**
 * Selector de sistema de unidades (Imperial/Metrico)
 */
export function UnitSelector({ variant = 'toggle', className = '', showLabel = true }: UnitSelectorProps) {
  const { unitSystem, setUnitSystem, isLoaded } = useUnitPreference();

  if (!isLoaded) {
    return null; // No renderizar hasta que se cargue la preferencia
  }

  if (variant === 'toggle') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showLabel && (
          <span className="text-xs text-dungeon-400 flex items-center gap-1">
            <Ruler className="h-3 w-3" />
            Unidades:
          </span>
        )}
        <div className="flex rounded-lg overflow-hidden border border-dungeon-700 bg-dungeon-900">
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              unitSystem === 'imperial'
                ? 'bg-gold-600 text-dungeon-950'
                : 'text-dungeon-400 hover:text-dungeon-200 hover:bg-dungeon-800'
            }`}
            title="Sistema Imperial (pies, pulgadas)"
          >
            Imperial
          </button>
          <button
            onClick={() => setUnitSystem('metric')}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              unitSystem === 'metric'
                ? 'bg-gold-600 text-dungeon-950'
                : 'text-dungeon-400 hover:text-dungeon-200 hover:bg-dungeon-800'
            }`}
            title="Sistema Metrico (metros)"
          >
            Metrico
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <button
        onClick={() => setUnitSystem(unitSystem === 'imperial' ? 'metric' : 'imperial')}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-dungeon-700 bg-dungeon-900 hover:bg-dungeon-800 transition-colors ${className}`}
        title={`Cambiar a ${unitSystem === 'imperial' ? 'Metrico' : 'Imperial'}`}
      >
        <Ruler className="h-4 w-4 text-gold-500" />
        <span className="text-sm text-dungeon-200">
          {unitSystem === 'imperial' ? 'Pies' : 'Metros'}
        </span>
      </button>
    );
  }

  // dropdown variant
  return (
    <div className={`relative ${className}`}>
      <select
        value={unitSystem}
        onChange={(e) => setUnitSystem(e.target.value as 'imperial' | 'metric')}
        className="appearance-none px-3 py-2 pr-8 rounded-lg border border-dungeon-700 bg-dungeon-900 text-dungeon-200 text-sm cursor-pointer hover:bg-dungeon-800 transition-colors"
      >
        <option value="imperial">Imperial (pies)</option>
        <option value="metric">Metrico (metros)</option>
      </select>
      <Ruler className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-dungeon-500 pointer-events-none" />
    </div>
  );
}
