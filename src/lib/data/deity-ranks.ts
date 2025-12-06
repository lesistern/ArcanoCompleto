/**
 * Sistema Global de Rangos/Jerarquías de Deidades D&D 3.5
 * Fuente única de verdad para colores, iconos y estilos
 */

import { Crown, Gem, Sparkles, Star, Skull } from 'lucide-react';

export interface DeityRankConfig {
  code: string;           // 'greater', 'intermediate', 'lesser', 'demigod', 'demon_lord'
  label: string;          // Etiqueta en español
  hex: string;            // Color hexadecimal oficial
  tailwindClass: string;  // Clase Tailwind (para compatibilidad)
  description: string;    // Descripción de la jerarquía
  icon: typeof Crown;     // Icono Lucide React
  justification: string;  // Justificación del color y símbolo
}

/**
 * Configuración completa de 5 rangos de deidades
 * Ordenado de mayor a menor poder
 */
export const DEITY_RANK_CONFIG: Record<string, DeityRankConfig> = {
  greater: {
    code: 'greater',
    label: 'Deidad Mayor',
    hex: '#FFCE45',
    tailwindClass: 'text-[#FFCE45]',
    description: 'Autoridad suprema, realeza cósmica',
    icon: Crown,
    justification: 'Oro divino puro - Autoridad suprema, dominio absoluto',
  },
  intermediate: {
    code: 'intermediate',
    label: 'Deidad Intermedia',
    hex: '#C9D2FF',
    tailwindClass: 'text-[#C9D2FF]',
    description: 'Poder notable, pero no absoluto',
    icon: Gem,
    justification: 'Plata encantada - Poder significativo pero no absoluto',
  },
  lesser: {
    code: 'lesser',
    label: 'Deidad Menor',
    hex: '#B8FFE7',
    tailwindClass: 'text-[#B8FFE7]',
    description: 'Milagros, luz menor y efímera',
    icon: Sparkles,
    justification: 'Cuarzo lumínico - Poder divino menor, milagros limitados',
  },
  demigod: {
    code: 'demigod',
    label: 'Semidiós',
    hex: '#FFA861',
    tailwindClass: 'text-[#FFA861]',
    description: 'Ascendidos, héroes míticos',
    icon: Star,
    justification: 'Estrella ámbar - Parte divina, héroes ascendidos, linaje celestial',
  },
  demon_lord: {
    code: 'demon_lord',
    label: 'Señor Demonio',
    hex: '#B6002F',
    tailwindClass: 'text-[#B6002F]',
    description: 'Corrupción abismal, tiranía oscura',
    icon: Skull,
    justification: 'Carmesí infernal - Maldad máxima, tiranía infernal',
  },
};

/**
 * Obtiene la configuración completa de un rango
 * @param code - Código del rango ('greater', 'intermediate', etc.)
 * @returns Configuración del rango o undefined si no existe
 */
export function getDeityRankConfig(code: string): DeityRankConfig | undefined {
  return DEITY_RANK_CONFIG[code];
}

/**
 * Obtiene solo el color hexadecimal de un rango
 * @param code - Código del rango
 * @returns Color hexadecimal (ej: '#FFCE45') o color por defecto gris
 */
export function getDeityRankColor(code: string): string {
  return DEITY_RANK_CONFIG[code]?.hex || '#B8BBC2';
}

/**
 * Obtiene la etiqueta en español de un rango
 * @param code - Código del rango
 * @returns Etiqueta (ej: 'Deidad Mayor')
 */
export function getDeityRankLabel(code: string): string {
  return DEITY_RANK_CONFIG[code]?.label || code;
}

/**
 * Obtiene el icono Lucide del rango
 * @param code - Código del rango
 * @returns Componente de icono Lucide React
 */
export function getDeityRankIcon(code: string): typeof Crown {
  return DEITY_RANK_CONFIG[code]?.icon || Crown;
}

/**
 * Obtiene la descripción/justificación de un rango
 * @param code - Código del rango
 * @returns Descripción del rango
 */
export function getDeityRankDescription(code: string): string {
  return DEITY_RANK_CONFIG[code]?.description || 'Rango desconocido';
}

/**
 * Obtiene todos los códigos de rangos en orden de jerarquía
 * @returns Array de códigos ordenados de mayor a menor poder
 */
export function getAllDeityRankCodes(): string[] {
  return ['greater', 'intermediate', 'lesser', 'demigod', 'demon_lord'];
}

/**
 * Clase Tailwind de color para un rango
 * Nota: Usar inline styles es más confiable para hex dinámicos
 * @param code - Código del rango
 * @returns Clase Tailwind (puede ser vacía si se usa inline styles)
 */
export function getDeityRankTailwindClass(code: string): string {
  return DEITY_RANK_CONFIG[code]?.tailwindClass || 'text-dungeon-400';
}
