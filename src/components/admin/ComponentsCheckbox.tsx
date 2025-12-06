'use client';

import type { SpellData, ComponentsCheckboxProps } from '@/lib/data/spell-management';

/**
 * ComponentsCheckbox Component
 * Displays checkboxes for spell components (V, S, M, F, FD, XP)
 *
 * Features:
 * - 6 component type checkboxes
 * - Text input for component details
 * - Disabled state when not editing
 * - Accessibility labels
 */
export function ComponentsCheckbox({
  spell,
  isEditing,
  onSpellChange,
}: ComponentsCheckboxProps) {
  const components = [
    { key: 'component_verbal' as const, label: 'Verbal (V)' },
    { key: 'component_somatic' as const, label: 'Somático (S)' },
    { key: 'component_material' as const, label: 'Material (M)' },
    { key: 'component_focus' as const, label: 'Foco (F)' },
    { key: 'component_divine_focus' as const, label: 'Foco Divino (FD)' },
    { key: 'component_xp' as const, label: 'Coste de XP' },
  ];

  return (
    <div className="p-4 bg-dungeon-900/30 rounded-lg border border-dungeon-700">
      <h3 className="text-lg font-semibold text-gold-400 mb-4">Componentes</h3>

      {/* Checkboxes */}
      <div className="flex flex-wrap gap-4 mb-4">
        {components.map(({ key, label }) => {
          const isComponentKey = key as keyof SpellData;
          const value = spell[isComponentKey];
          const isBoolean = typeof value === 'boolean';

            return (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBoolean ? (value as boolean) : false}
                  onChange={(e) =>
                    onSpellChange({
                      ...spell,
                      [key]: e.target.checked,
                    })
                  }
                  disabled={!isEditing}
                  className="w-4 h-4 rounded border-dungeon-600 text-gold-600 focus:ring-gold-500 bg-dungeon-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-opacity"
                />
                <span className="text-dungeon-200 select-none">{label}</span>
              </label>
            );
        })}
      </div>

      {/* Components Text */}
      <div>
        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
          Componentes (texto)
        </label>
        <input
          type="text"
          value={spell.components}
          onChange={(e) =>
            onSpellChange({
              ...spell,
              components: e.target.value,
            })
          }
          disabled={!isEditing}
          placeholder="Ej: V, S, M (polvo de diamante)"
          className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-500 disabled:opacity-50 focus:outline-none focus:border-gold-400 transition-colors disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
