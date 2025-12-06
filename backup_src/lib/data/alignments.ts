/**
 * Sistema Global de Alineamientos D&D 3.5
 * Colores y configuración centralizada para toda la aplicación
 *
 * Paleta de colores diseñada para:
 * - Distinción visual clara entre alineamientos
 * - Accesibilidad WCAG AA (contraste ≥ 4.5:1)
 * - Consistencia con la temática de D&D
 */

export interface AlignmentConfig {
  code: string;
  label: string;
  hex: string;
  tailwindClass: string;
  description: string;
  morality: 'good' | 'neutral' | 'evil';
  order: 'lawful' | 'neutral' | 'chaotic';
}

/**
 * Configuración centralizada de alineamientos
 * Orden: 3x3 grid (Ley-Neutral-Caos × Bueno-Neutral-Malo)
 */
export const ALIGNMENT_CONFIG: Record<string, AlignmentConfig> = {
  LG: {
    code: 'LG',
    label: 'Legal Bueno',
    hex: '#3CE76B',
    tailwindClass: 'text-[#3CE76B]',
    description: 'Verde brillante - Disciplinado y virtuoso',
    morality: 'good',
    order: 'lawful',
  },
  NG: {
    code: 'NG',
    label: 'Neutral Bueno',
    hex: '#9AFF6B',
    tailwindClass: 'text-[#9AFF6B]',
    description: 'Verde lima - Benévolo y compasivo',
    morality: 'good',
    order: 'neutral',
  },
  CG: {
    code: 'CG',
    label: 'Caótico Bueno',
    hex: '#1DE5D1',
    tailwindClass: 'text-[#1DE5D1]',
    description: 'Turquesa - Libre y heroico',
    morality: 'good',
    order: 'chaotic',
  },
  LN: {
    code: 'LN',
    label: 'Legal Neutral',
    hex: '#32A5FF',
    tailwindClass: 'text-[#32A5FF]',
    description: 'Azul - Lógico y ordenado',
    morality: 'neutral',
    order: 'lawful',
  },
  TN: {
    code: 'TN',
    label: 'Neutral Verdadero',
    hex: '#B8BBC2',
    tailwindClass: 'text-[#B8BBC2]',
    description: 'Gris luminoso - Balanceado',
    morality: 'neutral',
    order: 'neutral',
  },
  CN: {
    code: 'CN',
    label: 'Caótico Neutral',
    hex: '#F6C843',
    tailwindClass: 'text-[#F6C843]',
    description: 'Dorado - Impulsivo e independiente',
    morality: 'neutral',
    order: 'chaotic',
  },
  LE: {
    code: 'LE',
    label: 'Legal Malvado',
    hex: '#D24CFF',
    tailwindClass: 'text-[#D24CFF]',
    description: 'Púrpura brillante - Tiránico',
    morality: 'evil',
    order: 'lawful',
  },
  NE: {
    code: 'NE',
    label: 'Neutral Malvado',
    hex: '#FF4A4A',
    tailwindClass: 'text-[#FF4A4A]',
    description: 'Rojo - Egoísta y dominante',
    morality: 'evil',
    order: 'neutral',
  },
  CE: {
    code: 'CE',
    label: 'Caótico Malvado',
    hex: '#FF2A6E',
    tailwindClass: 'text-[#FF2A6E]',
    description: 'Magenta - Destructivo y malvado',
    morality: 'evil',
    order: 'chaotic',
  },
};

/**
 * Paleta de alineamientos ordenada (para dropdowns, etc)
 */
export const ALIGNMENTS_ORDERED = [
  ALIGNMENT_CONFIG.LG,
  ALIGNMENT_CONFIG.NG,
  ALIGNMENT_CONFIG.CG,
  ALIGNMENT_CONFIG.LN,
  ALIGNMENT_CONFIG.TN,
  ALIGNMENT_CONFIG.CN,
  ALIGNMENT_CONFIG.LE,
  ALIGNMENT_CONFIG.NE,
  ALIGNMENT_CONFIG.CE,
];

/**
 * Obtener configuración de alineamiento por código
 * @param code Código de alineamiento (ej: 'LG', 'NE')
 * @returns Configuración del alineamiento o undefined
 */
export function getAlignmentConfig(code: string): AlignmentConfig | undefined {
  return ALIGNMENT_CONFIG[code.toUpperCase()];
}

/**
 * Obtener color HEX de un alineamiento
 * @param code Código de alineamiento
 * @returns Color HEX (ej: '#3CE76B') o undefined
 */
export function getAlignmentColor(code: string): string | undefined {
  return getAlignmentConfig(code)?.hex;
}

/**
 * Obtener clase Tailwind de un alineamiento
 * @param code Código de alineamiento
 * @returns Clase Tailwind con color o undefined
 */
export function getAlignmentTailwindClass(code: string): string | undefined {
  return getAlignmentConfig(code)?.tailwindClass;
}

/**
 * Obtener etiqueta legible de un alineamiento
 * @param code Código de alineamiento (ej: 'LG')
 * @returns Etiqueta en español (ej: 'Legal Bueno')
 */
export function getAlignmentLabel(code: string): string | undefined {
  return getAlignmentConfig(code)?.label;
}

/**
 * Obtener todos los códigos de alineamiento
 */
export function getAllAlignmentCodes(): string[] {
  return Object.keys(ALIGNMENT_CONFIG);
}

/**
 * Filtrar alineamientos por moralidad
 * @param morality 'good' | 'neutral' | 'evil'
 */
export function getAlignmentsByMorality(morality: 'good' | 'neutral' | 'evil'): AlignmentConfig[] {
  return ALIGNMENTS_ORDERED.filter(a => a.morality === morality);
}

/**
 * Filtrar alineamientos por orden
 * @param order 'lawful' | 'neutral' | 'chaotic'
 */
export function getAlignmentsByOrder(order: 'lawful' | 'neutral' | 'chaotic'): AlignmentConfig[] {
  return ALIGNMENTS_ORDERED.filter(a => a.order === order);
}

/**
 * Crear una clase CSS de fondo basada en alineamiento
 * @param code Código de alineamiento
 * @param opacity Opacidad del fondo (default: 0.1)
 * @returns Clase Tailwind con fondo coloreado
 */
export function getAlignmentBackgroundClass(code: string, opacity: number = 0.1): string {
  const config = getAlignmentConfig(code);
  if (!config) return '';

  // Convertir opacidad a formato Tailwind (0.1 → 10%, 0.2 → 20%, etc)
  const tailwindOpacity = Math.round(opacity * 100);

  // Usar clase con variable CSS personalizada
  return `[background-color:${config.hex}${Math.round(opacity * 255).toString(16).padStart(2, '0')}]`;
}

/**
 * Grid visual de alineamientos (3x3)
 * Útil para selectores visuales
 */
export const ALIGNMENT_GRID = [
  [ALIGNMENT_CONFIG.LG, ALIGNMENT_CONFIG.NG, ALIGNMENT_CONFIG.CG],
  [ALIGNMENT_CONFIG.LN, ALIGNMENT_CONFIG.TN, ALIGNMENT_CONFIG.CN],
  [ALIGNMENT_CONFIG.LE, ALIGNMENT_CONFIG.NE, ALIGNMENT_CONFIG.CE],
];

/**
 * Converter bidireccional entre códigos y labels
 */
export const ALIGNMENT_CONVERTER = {
  codeToLabel: (code: string): string | undefined => getAlignmentLabel(code),
  labelToCode: (label: string): string | undefined => {
    const found = Object.values(ALIGNMENT_CONFIG).find(a => a.label === label);
    return found?.code;
  },
};
