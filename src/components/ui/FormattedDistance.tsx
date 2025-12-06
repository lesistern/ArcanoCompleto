'use client';

import { useUnitPreference } from '@/lib/hooks/useUnitPreference';
import { formatDistance, formatDistanceBoth, convertDistancesInText } from '@/lib/utils/distance';

interface FormattedDistanceProps {
  /** Distancia en pies (unidad base de D&D) */
  feet: number;
  /** Mostrar ambas unidades */
  showBoth?: boolean;
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Componente para mostrar una distancia formateada segun preferencia del usuario
 */
export function FormattedDistance({ feet, showBoth = false, className }: FormattedDistanceProps) {
  const { unitSystem, isLoaded } = useUnitPreference();

  // Mientras carga, mostrar en imperial (default)
  if (!isLoaded) {
    return <span className={className}>{formatDistance(feet, 'imperial')}</span>;
  }

  if (showBoth) {
    return <span className={className}>{formatDistanceBoth(feet, unitSystem)}</span>;
  }

  return <span className={className}>{formatDistance(feet, unitSystem)}</span>;
}

interface FormattedTextWithDistancesProps {
  /** Texto que puede contener distancias */
  text: string;
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Componente para mostrar texto con distancias convertidas automaticamente
 */
export function FormattedTextWithDistances({ text, className }: FormattedTextWithDistancesProps) {
  const { unitSystem, isLoaded } = useUnitPreference();

  // Mientras carga, mostrar texto original
  if (!isLoaded) {
    return <span className={className}>{text}</span>;
  }

  const convertedText = convertDistancesInText(text, unitSystem);
  return <span className={className}>{convertedText}</span>;
}
