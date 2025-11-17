/**
 * Iconos de Dados Poliédricos de D&D
 * Usando Material Design Icons (MDI) - Apache 2.0 License
 * https://pictogrammers.com/library/mdi/
 */

import React from 'react';
import Icon from '@mdi/react';
import {
  mdiDiceD4,
  mdiDiceD6,
  mdiDiceD8,
  mdiDiceD10,
  mdiDiceD12,
  mdiDiceD20,
} from '@mdi/js';

/**
 * Wrapper para iconos MDI que acepta className de Tailwind
 */
const createDiceIcon = (path: string) => {
  const DiceIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon path={path} className={className} />
  );
  return DiceIcon;
};

/**
 * D4 - Tetraedro (pirámide triangular)
 */
export const D4Icon = createDiceIcon(mdiDiceD4);

/**
 * D6 - Cubo (dado estándar)
 */
export const D6Icon = createDiceIcon(mdiDiceD6);

/**
 * D8 - Octaedro (diamante)
 */
export const D8Icon = createDiceIcon(mdiDiceD8);

/**
 * D10 - Pentagonal trapezohedron
 */
export const D10Icon = createDiceIcon(mdiDiceD10);

/**
 * D12 - Dodecaedro (pentágono)
 */
export const D12Icon = createDiceIcon(mdiDiceD12);

/**
 * D20 - Icosaedro (dado de 20 caras)
 */
export const D20Icon = createDiceIcon(mdiDiceD20);

/**
 * Mapeo de número de caras a componente de icono
 */
export const DICE_ICONS: Record<number, React.FC<{ className?: string }>> = {
  4: D4Icon,
  6: D6Icon,
  8: D8Icon,
  10: D10Icon,
  12: D12Icon,
  20: D20Icon,
};

/**
 * Obtiene el icono correspondiente a un dado
 * @param sides - Número de caras (puede ser número, string "12", o "d12")
 */
export const getDiceIcon = (sides: number | string): React.FC<{ className?: string }> => {
  // Convertir a número si es string
  let numSides: number;

  if (typeof sides === 'string') {
    // Si viene como "d12", extraer el número
    numSides = sides.toLowerCase().startsWith('d')
      ? parseInt(sides.substring(1))
      : parseInt(sides);
  } else {
    numSides = sides;
  }

  return DICE_ICONS[numSides] || D6Icon;
};

export const STANDARD_DICE = [4, 6, 8, 10, 12, 20] as const;
export type DiceType = typeof STANDARD_DICE[number];
