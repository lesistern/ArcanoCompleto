/**
 * Ejemplos de Uso - Componentes de Alineamientos
 *
 * Este archivo contiene ejemplos de cómo utilizar los componentes
 * AlignmentBadge y AlignmentSelector en diferentes contextos
 */

import { AlignmentBadge } from './AlignmentBadge';
import { AlignmentSelector } from './AlignmentSelector';
import { useState } from 'react';

/**
 * Ejemplo 1: Badge de Alineamiento
 * Perfecto para mostrar el alineamiento de una deidad, clase o personaje
 */
export function AlignmentBadgeExample() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Tamaños disponibles:</h3>
        <div className="flex gap-2 flex-wrap">
          <AlignmentBadge code="LG" size="sm" />
          <AlignmentBadge code="NG" size="md" />
          <AlignmentBadge code="CG" size="lg" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Mostrar código en lugar de label:</h3>
        <div className="flex gap-2 flex-wrap">
          <AlignmentBadge code="LG" showLabel={false} />
          <AlignmentBadge code="NE" showLabel={false} />
          <AlignmentBadge code="CE" showLabel={false} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Todos los alineamientos:</h3>
        <div className="grid grid-cols-3 gap-2">
          <AlignmentBadge code="LG" />
          <AlignmentBadge code="NG" />
          <AlignmentBadge code="CG" />
          <AlignmentBadge code="LN" />
          <AlignmentBadge code="TN" />
          <AlignmentBadge code="CN" />
          <AlignmentBadge code="LE" />
          <AlignmentBadge code="NE" />
          <AlignmentBadge code="CE" />
        </div>
      </div>
    </div>
  );
}

/**
 * Ejemplo 2: Selector Dropdown
 * Para formularios donde el usuario selecciona un alineamiento
 */
export function AlignmentSelectorDropdownExample() {
  const [selected, setSelected] = useState('');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">
          Selecciona un alineamiento:
        </label>
        <AlignmentSelector value={selected} onChange={setSelected} />
      </div>

      {selected && (
        <div className="p-4 bg-dungeon-800 rounded-lg border border-dungeon-700">
          <p className="text-sm">Seleccionado: <AlignmentBadge code={selected} /></p>
        </div>
      )}
    </div>
  );
}

/**
 * Ejemplo 3: Selector Grid Visual
 * Para una selección más visual e interactiva
 */
export function AlignmentSelectorGridExample() {
  const [selected, setSelected] = useState('');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-4">
          Selecciona visualmente un alineamiento:
        </label>
        <AlignmentSelector value={selected} onChange={setSelected} showGrid />
      </div>

      {selected && (
        <div className="p-4 bg-dungeon-800 rounded-lg border border-dungeon-700">
          <p className="text-sm">Seleccionado: <AlignmentBadge code={selected} /></p>
        </div>
      )}
    </div>
  );
}

/**
 * Ejemplo 4: Lista de Deidades con Badges
 * Caso de uso real en la página de deidades
 */
export function DeitiesListExample() {
  const deities = [
    { name: 'Bahamut', alignment: 'LG' },
    { name: 'Corellon Larethian', alignment: 'CG' },
    { name: 'Moradin', alignment: 'LG' },
    { name: 'Pelor', alignment: 'NG' },
    { name: 'Gruumsh', alignment: 'CE' },
    { name: 'Lolth', alignment: 'CE' },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold mb-4">Deidades (con alineamientos coloreados):</h3>
      <div className="space-y-2">
        {deities.map((deity) => (
          <div
            key={deity.name}
            className="flex items-center justify-between p-3 bg-dungeon-800 rounded-lg border border-dungeon-700 hover:border-gold-500/50 transition-colors"
          >
            <span className="text-sm">{deity.name}</span>
            <AlignmentBadge code={deity.alignment} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
