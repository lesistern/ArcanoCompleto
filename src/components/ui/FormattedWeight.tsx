'use client';

import { useUnitPreference } from '@/lib/hooks/useUnitPreference';
import { formatWeight, formatWeightBoth } from '@/lib/utils/weight';

interface FormattedWeightProps {
  /** Peso en libras (unidad base de D&D) */
  lbs: number;
  /** Mostrar ambas unidades */
  showBoth?: boolean;
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Componente para mostrar un peso formateado segun preferencia del usuario
 */
export function FormattedWeight({ lbs, showBoth = false, className }: FormattedWeightProps) {
  const { unitSystem, isLoaded } = useUnitPreference();

  // Mientras carga, mostrar en imperial (default)
  if (!isLoaded) {
    return <span className={className}>{formatWeight(lbs, 'imperial')}</span>;
  }

  if (showBoth) {
    return <span className={className}>{formatWeightBoth(lbs, unitSystem)}</span>;
  }

  return <span className={className}>{formatWeight(lbs, unitSystem)}</span>;
}
