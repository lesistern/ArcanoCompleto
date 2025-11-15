/**
 * Utilidades para creación y gestión de personajes D&D 3.5
 */

export type AbilityScore = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface AbilityModifiers {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

/**
 * Nombres completos de las habilidades en español
 */
export const ABILITY_NAMES: Record<AbilityScore, string> = {
  str: 'Fuerza',
  dex: 'Destreza',
  con: 'Constitución',
  int: 'Inteligencia',
  wis: 'Sabiduría',
  cha: 'Carisma',
};

/**
 * Abreviaturas de las habilidades en español
 */
export const ABILITY_SHORT_NAMES: Record<AbilityScore, string> = {
  str: 'Fue',
  dex: 'Des',
  con: 'Con',
  int: 'Int',
  wis: 'Sab',
  cha: 'Car',
};

/**
 * Calcula el modificador de una habilidad dado su puntaje
 * Fórmula D&D 3.5: (Puntaje - 10) / 2 (redondeado hacia abajo)
 */
export function calculateAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

/**
 * Calcula el puntaje final de una habilidad aplicando modificadores raciales
 * @param baseScore - Puntaje base del personaje (generalmente 8-18)
 * @param racialModifier - Modificador racial de la raza elegida
 */
export function applyRacialModifier(baseScore: number, racialModifier: number): number {
  return baseScore + racialModifier;
}

/**
 * Aplica todos los modificadores raciales a un set de puntajes base
 */
export function applyRacialModifiers(
  baseScores: AbilityScores,
  racialModifiers: Partial<AbilityModifiers>
): AbilityScores {
  return {
    str: baseScores.str + (racialModifiers.str || 0),
    dex: baseScores.dex + (racialModifiers.dex || 0),
    con: baseScores.con + (racialModifiers.con || 0),
    int: baseScores.int + (racialModifiers.int || 0),
    wis: baseScores.wis + (racialModifiers.wis || 0),
    cha: baseScores.cha + (racialModifiers.cha || 0),
  };
}

/**
 * Calcula todos los modificadores de habilidad a partir de los puntajes finales
 */
export function calculateAllModifiers(scores: AbilityScores): AbilityModifiers {
  return {
    str: calculateAbilityModifier(scores.str),
    dex: calculateAbilityModifier(scores.dex),
    con: calculateAbilityModifier(scores.con),
    int: calculateAbilityModifier(scores.int),
    wis: calculateAbilityModifier(scores.wis),
    cha: calculateAbilityModifier(scores.cha),
  };
}

/**
 * Convierte modificadores raciales del formato de Supabase al formato interno
 * Supabase usa: { str: 2, dex: 0, con: -2, int: 0, wis: 0, cha: 0 }
 */
export function parseRacialModifiers(supabaseModifiers: {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}): Partial<AbilityModifiers> {
  const modifiers: Partial<AbilityModifiers> = {};

  if (supabaseModifiers.str !== 0) modifiers.str = supabaseModifiers.str;
  if (supabaseModifiers.dex !== 0) modifiers.dex = supabaseModifiers.dex;
  if (supabaseModifiers.con !== 0) modifiers.con = supabaseModifiers.con;
  if (supabaseModifiers.int !== 0) modifiers.int = supabaseModifiers.int;
  if (supabaseModifiers.wis !== 0) modifiers.wis = supabaseModifiers.wis;
  if (supabaseModifiers.cha !== 0) modifiers.cha = supabaseModifiers.cha;

  return modifiers;
}

/**
 * Formatea un modificador para mostrar (con signo +/-)
 */
export function formatModifier(modifier: number): string {
  if (modifier > 0) return `+${modifier}`;
  return modifier.toString();
}

/**
 * Obtiene el color apropiado para mostrar un modificador
 * Positivo = verde, Negativo = rojo, Cero = gris
 */
export function getModifierColor(modifier: number): 'positive' | 'negative' | 'neutral' {
  if (modifier > 0) return 'positive';
  if (modifier < 0) return 'negative';
  return 'neutral';
}

/**
 * Valida que un puntaje de habilidad esté en el rango válido (3-20 para personajes normales)
 */
export function isValidAbilityScore(score: number, allowExtraordinary = false): boolean {
  const min = 3;
  const max = allowExtraordinary ? 50 : 20; // Criaturas pueden tener hasta 50
  return score >= min && score <= max;
}

/**
 * Genera puntajes de habilidad usando el método de compra de puntos (Point Buy)
 * Estándar D&D 3.5: 25 puntos, puntajes de 8 a 18
 */
export const POINT_BUY_COSTS: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 6,
  15: 8,
  16: 10,
  17: 13,
  18: 16,
};

/**
 * Calcula el costo total de un set de puntajes usando Point Buy
 */
export function calculatePointBuyCost(scores: AbilityScores): number {
  return (
    POINT_BUY_COSTS[scores.str] +
    POINT_BUY_COSTS[scores.dex] +
    POINT_BUY_COSTS[scores.con] +
    POINT_BUY_COSTS[scores.int] +
    POINT_BUY_COSTS[scores.wis] +
    POINT_BUY_COSTS[scores.cha]
  );
}

/**
 * Método de tirada estándar: 4d6, descartar el dado más bajo
 * Retorna un número entre 3 y 18 (más probable 12-13)
 */
export function rollAbilityScore(): number {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ].sort((a, b) => a - b);

  // Sumar los 3 dados más altos
  return rolls[1] + rolls[2] + rolls[3];
}

/**
 * Genera un set completo de puntajes de habilidad usando 4d6 drop lowest
 */
export function rollAbilityScores(): AbilityScores {
  return {
    str: rollAbilityScore(),
    dex: rollAbilityScore(),
    con: rollAbilityScore(),
    int: rollAbilityScore(),
    wis: rollAbilityScore(),
    cha: rollAbilityScore(),
  };
}

/**
 * Ejemplo de uso en el editor de personajes:
 *
 * ```typescript
 * // 1. Usuario selecciona raza
 * const race = await fetchRaceFromSupabase('elfo');
 * const racialMods = parseRacialModifiers(race.ability_adjustments);
 *
 * // 2. Usuario genera/asigna puntajes base
 * const baseScores = rollAbilityScores(); // o Point Buy
 *
 * // 3. Aplicar modificadores raciales
 * const finalScores = applyRacialModifiers(baseScores, racialMods);
 *
 * // 4. Calcular modificadores finales
 * const modifiers = calculateAllModifiers(finalScores);
 *
 * // 5. Mostrar
 * console.log(`Fuerza: ${finalScores.str} (${formatModifier(modifiers.str)})`);
 * ```
 */
