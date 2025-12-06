/**
 * Utilidades para trabajar con alineamientos de D&D 3.5
 */

export type AlignmentCode = 'LG' | 'NG' | 'CG' | 'LN' | 'TN' | 'CN' | 'LE' | 'NE' | 'CE';

export const ALIGNMENT_LABELS: Record<AlignmentCode, string> = {
  LG: 'Legal Bueno',
  NG: 'Neutral Bueno',
  CG: 'Caótico Bueno',
  LN: 'Legal Neutral',
  TN: 'Neutral',
  CN: 'Caótico Neutral',
  LE: 'Legal Malvado',
  NE: 'Neutral Malvado',
  CE: 'Caótico Malvado',
};

/**
 * Convierte una abreviatura de alineamiento a su nombre completo en español
 */
export function getAlignmentLabel(code: string | null | undefined): string {
  if (!code) return 'Sin alineamiento';

  // Manejar formato antiguo (nombres completos)
  if (code.length > 2) {
    return code; // Ya está en formato legible
  }

  return ALIGNMENT_LABELS[code as AlignmentCode] || code;
}

/**
 * Convierte un nombre completo de alineamiento a su abreviatura
 */
export function getAlignmentCode(label: string | null | undefined): AlignmentCode | null {
  if (!label) return null;

  // Si ya es una abreviatura, devolverla
  if (label.length === 2 && label.toUpperCase() in ALIGNMENT_LABELS) {
    return label.toUpperCase() as AlignmentCode;
  }

  // Buscar por nombre completo
  const entry = Object.entries(ALIGNMENT_LABELS).find(([_, value]) => value === label);
  return entry ? (entry[0] as AlignmentCode) : null;
}

/**
 * Migra un alineamiento del formato antiguo (nombre completo) al nuevo (abreviatura)
 */
export function migrateAlignment(alignment: string | null | undefined): AlignmentCode | null {
  if (!alignment) return null;

  // Si ya es una abreviatura válida, devolverla
  if (alignment.length === 2 && alignment.toUpperCase() in ALIGNMENT_LABELS) {
    return alignment.toUpperCase() as AlignmentCode;
  }

  // Convertir nombre completo a abreviatura
  return getAlignmentCode(alignment);
}
