// Nombres de los 20 niveles del sistema de experiencia
// Basados en la tabla user_levels de Supabase

export const LEVEL_TITLES: Record<number, string> = {
  1: 'Cazagoblins Verde',
  2: 'Rastreador de Tumbas',
  3: 'Juramentado del Sendero',
  4: 'Rompe-Mareas de Mazmorras',
  5: 'Quebrantahuesos del Valle',
  6: 'Señor de las Armas Menores',
  7: 'Cazador de Bestias',
  8: 'Portador del Acero Encantado',
  9: 'Aplastador de Engendros',
  10: 'Campeón de la Guardia Libre',
  11: 'Domador de Dragones Jóvenes',
  12: 'Señor de la Forja Arcana',
  13: 'Tejedor de Tempestades',
  14: 'Alto Conjurador de Senderos Velados',
  15: 'Destructor de Tiranos',
  16: 'Adalid de los Reinos Interiores',
  17: 'Cazador de Demonios Antiguos',
  18: 'Guardián de los Portales Eternos',
  19: 'Mano del Último Oráculo',
  20: 'Parangón de los Seis Planos',
};

/**
 * Obtiene el nombre del título de un nivel específico
 * @param level Número de nivel (1-20)
 * @returns Nombre del título o 'Recién nacido en la aventura' si está fuera de rango
 */
export function getLevelTitle(level?: number): string {
  if (!level || level < 1 || level > 20) {
    return LEVEL_TITLES[1];
  }
  return LEVEL_TITLES[level];
}

/**
 * Obtiene el tier de un nivel específico
 * @param level Número de nivel (1-20)
 * @returns 'Novato' | 'Héroe' | 'Épico' | 'Legendario'
 */
export function getLevelTier(level?: number): 'Novato' | 'Héroe' | 'Épico' | 'Legendario' {
  if (!level) return 'Novato';
  if (level <= 4) return 'Novato';
  if (level <= 10) return 'Héroe';
  if (level <= 16) return 'Épico';
  return 'Legendario';
}
