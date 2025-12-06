import { UnitSystem } from '@/lib/hooks/useUnitPreference';

// Constantes de conversion
const LBS_TO_KG = 0.453592;
const KG_TO_LBS = 2.20462;

/**
 * Redondea un valor a un decimal
 */
export function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Convierte libras a kilogramos
 */
export function lbsToKg(lbs: number): number {
  return roundToOneDecimal(lbs * LBS_TO_KG);
}

/**
 * Convierte kilogramos a libras
 */
export function kgToLbs(kg: number): number {
  return Math.round(kg * KG_TO_LBS);
}

/**
 * Formatea un peso segun el sistema de unidades
 * @param lbs - Peso en libras (unidad base de D&D)
 * @param unitSystem - Sistema de unidades a usar
 * @param includeUnit - Si incluir la unidad en el string (default: true)
 */
export function formatWeight(
  lbs: number,
  unitSystem: UnitSystem,
  includeUnit: boolean = true
): string {
  if (unitSystem === 'metric') {
    const kg = lbsToKg(lbs);
    // Formatear: si es entero, mostrar sin decimales
    const formatted = kg % 1 === 0 ? kg.toString() : kg.toFixed(1);
    return includeUnit ? `${formatted} kg` : formatted;
  } else {
    return includeUnit ? `${lbs} lb` : lbs.toString();
  }
}

/**
 * Formatea un peso con ambas unidades
 * Ej: "100 lb (45 kg)" o "45 kg (100 lb)"
 */
export function formatWeightBoth(
  lbs: number,
  primaryUnit: UnitSystem = 'imperial'
): string {
  const imperial = `${lbs} lb`;
  const metric = `${lbsToKg(lbs)} kg`;

  if (primaryUnit === 'imperial') {
    return `${imperial} (${metric})`;
  } else {
    return `${metric} (${imperial})`;
  }
}

/**
 * Tabla de conversiones de carga por Fuerza en D&D 3.5
 * Valores en libras (unidad base)
 */
export const CARRYING_CAPACITY_TABLE: Record<number, { light: number; medium: number; heavy: number }> = {
  1: { light: 3, medium: 6, heavy: 10 },
  2: { light: 6, medium: 13, heavy: 20 },
  3: { light: 10, medium: 20, heavy: 30 },
  4: { light: 13, medium: 26, heavy: 40 },
  5: { light: 16, medium: 33, heavy: 50 },
  6: { light: 20, medium: 40, heavy: 60 },
  7: { light: 23, medium: 46, heavy: 70 },
  8: { light: 26, medium: 53, heavy: 80 },
  9: { light: 30, medium: 60, heavy: 90 },
  10: { light: 33, medium: 66, heavy: 100 },
  11: { light: 38, medium: 76, heavy: 115 },
  12: { light: 43, medium: 86, heavy: 130 },
  13: { light: 50, medium: 100, heavy: 150 },
  14: { light: 58, medium: 116, heavy: 175 },
  15: { light: 66, medium: 133, heavy: 200 },
  16: { light: 76, medium: 153, heavy: 230 },
  17: { light: 86, medium: 173, heavy: 260 },
  18: { light: 100, medium: 200, heavy: 300 },
  19: { light: 116, medium: 233, heavy: 350 },
  20: { light: 133, medium: 266, heavy: 400 },
};

/**
 * Peso de monedas
 * 50 monedas = 1 lb
 */
export const COINS_PER_LB = 50;
