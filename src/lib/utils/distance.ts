import { UnitSystem } from '@/lib/hooks/useUnitPreference';

// Constantes de conversion
const FEET_TO_METERS = 0.3048;
const METERS_TO_FEET = 3.28084;
const MILES_TO_KM = 1.60934;
const KM_TO_MILES = 0.621371;

/**
 * Redondea un valor al 0.5 mas cercano
 * Ej: 1.3 -> 1.5, 1.7 -> 1.5, 1.8 -> 2.0, 4.6 -> 4.5
 */
export function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

/**
 * Convierte pies a metros (redondeado a 0.5)
 */
export function feetToMeters(feet: number): number {
  return roundToHalf(feet * FEET_TO_METERS);
}

/**
 * Convierte metros a pies (redondeado a entero)
 */
export function metersToFeet(meters: number): number {
  return Math.round(meters * METERS_TO_FEET);
}

/**
 * Formatea una distancia segun el sistema de unidades
 * @param feet - Distancia en pies (unidad base de D&D)
 * @param unitSystem - Sistema de unidades a usar
 * @param includeUnit - Si incluir la unidad en el string (default: true)
 */
export function formatDistance(
  feet: number,
  unitSystem: UnitSystem,
  includeUnit: boolean = true
): string {
  if (unitSystem === 'metric') {
    const meters = feetToMeters(feet);
    // Formatear: si es entero, mostrar sin decimales
    const formatted = meters % 1 === 0 ? meters.toString() : meters.toFixed(1).replace('.0', '');
    return includeUnit ? `${formatted} m` : formatted;
  } else {
    return includeUnit ? `${feet} pies` : feet.toString();
  }
}

/**
 * Formatea una distancia con ambas unidades
 * Ej: "30 pies (9 m)" o "9 m (30 pies)"
 */
export function formatDistanceBoth(
  feet: number,
  primaryUnit: UnitSystem = 'imperial'
): string {
  const imperial = `${feet} pies`;
  const metric = `${feetToMeters(feet)} m`;

  if (primaryUnit === 'imperial') {
    return `${imperial} (${metric})`;
  } else {
    return `${metric} (${imperial})`;
  }
}

/**
 * Parsea un string de distancia y extrae el valor numerico en pies
 * Soporta formatos: "30 pies", "30 feet", "30 ft", "30'", "9 m", "9 metros", "9 meters"
 */
export function parseDistance(text: string): { feet: number; original: string } | null {
  // Patrones para pies
  const feetPatterns = [
    /(\d+(?:\.\d+)?)\s*(?:pies|feet|ft|')/i,
    /(\d+(?:\.\d+)?)\s*(?:pie|foot)/i,
  ];

  // Patrones para metros
  const meterPatterns = [
    /(\d+(?:[.,]\d+)?)\s*(?:metros?|meters?|m\b)/i,
  ];

  // Intentar parsear como pies
  for (const pattern of feetPatterns) {
    const match = text.match(pattern);
    if (match) {
      return {
        feet: parseFloat(match[1]),
        original: match[0],
      };
    }
  }

  // Intentar parsear como metros
  for (const pattern of meterPatterns) {
    const match = text.match(pattern);
    if (match) {
      const meters = parseFloat(match[1].replace(',', '.'));
      return {
        feet: metersToFeet(meters),
        original: match[0],
      };
    }
  }

  return null;
}

/**
 * Reemplaza todas las distancias en un texto con el formato del sistema de unidades seleccionado
 */
export function convertDistancesInText(
  text: string,
  unitSystem: UnitSystem
): string {
  // Patron para encontrar distancias (pies o metros)
  const distancePattern = /(\d+(?:[.,]\d+)?)\s*(?:pies|pie|feet|foot|ft|'|metros?|meters?|m\b)/gi;

  return text.replace(distancePattern, (match) => {
    const parsed = parseDistance(match);
    if (parsed) {
      return formatDistance(parsed.feet, unitSystem);
    }
    return match;
  });
}

/**
 * Tabla de conversiones comunes en D&D 3.5
 */
export const COMMON_DISTANCES = {
  square: { feet: 5, description: '1 casilla' },
  close: { feet: 25, description: 'Corto (25 pies + 5 pies/2 niveles)' },
  medium: { feet: 100, description: 'Medio (100 pies + 10 pies/nivel)' },
  long: { feet: 400, description: 'Largo (400 pies + 40 pies/nivel)' },
  touch: { feet: 0, description: 'Toque' },
  personal: { feet: 0, description: 'Personal' },
} as const;

/**
 * Convierte millas a kilometros
 */
export function milesToKm(miles: number): number {
  return roundToHalf(miles * MILES_TO_KM);
}

/**
 * Convierte kilometros a millas
 */
export function kmToMiles(km: number): number {
  return Math.round(km * KM_TO_MILES);
}

/**
 * Formatea una distancia en millas segun el sistema de unidades
 * @param miles - Distancia en millas (unidad base de D&D para viajes)
 * @param unitSystem - Sistema de unidades a usar
 * @param includeUnit - Si incluir la unidad en el string (default: true)
 */
export function formatMiles(
  miles: number,
  unitSystem: UnitSystem,
  includeUnit: boolean = true
): string {
  if (unitSystem === 'metric') {
    const km = milesToKm(miles);
    const formatted = km % 1 === 0 ? km.toString() : km.toFixed(1);
    return includeUnit ? `${formatted} km` : formatted;
  } else {
    return includeUnit ? `${miles} millas` : miles.toString();
  }
}
