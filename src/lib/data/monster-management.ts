import { AlertTriangle, Skull, Shield, Zap } from 'lucide-react';
import type { Monster } from '@/lib/services/monsterService.client';

// ============================================================
// TYPES - Creature categorization
// ============================================================

export type CreatureCategory = 'Humanoides y Gigantes' | 'No-Muertos' | 'Dragones y Bestias Mágicas' | 'Otros';

// ============================================================
// CONSTANTS - Categories and mappings
// ============================================================

/**
 * Orden de categorías de criaturas para mostrar en la UI
 */
export const CATEGORY_ORDER: CreatureCategory[] = [
  'Humanoides y Gigantes',
  'No-Muertos',
  'Dragones y Bestias Mágicas',
  'Otros'
];

/**
 * Tipos de criaturas que pertenecen a cada categoría
 */
const CREATURE_TYPE_MAPPINGS: Record<CreatureCategory, string[]> = {
  'Humanoides y Gigantes': ['Humanoide', 'Gigante', 'Humanoide Monstruoso'],
  'No-Muertos': ['No-Muerto'],
  'Dragones y Bestias Mágicas': ['Dragón', 'Bestia', 'Bestia Mágica'],
  'Otros': [] // Catch-all category
};

/**
 * Tipos de criaturas que NO pertenecen a otras categorías (para "Otros")
 */
const ALL_KNOWN_CREATURE_TYPES = [
  'Humanoide',
  'Gigante',
  'Humanoide Monstruoso',
  'No-Muerto',
  'Dragón',
  'Bestia',
  'Bestia Mágica'
];

/**
 * Colores por categoría de criatura
 */
const CATEGORY_COLORS: Record<CreatureCategory, string> = {
  'Humanoides y Gigantes': 'text-orange-400',
  'No-Muertos': 'text-purple-400',
  'Dragones y Bestias Mágicas': 'text-red-400',
  'Otros': 'text-blue-400'
};

/**
 * Iconos por categoría de criatura (LucideReact components)
 */
const CATEGORY_ICONS: Record<CreatureCategory, any> = {
  'Humanoides y Gigantes': Skull,
  'No-Muertos': AlertTriangle,
  'Dragones y Bestias Mágicas': Zap,
  'Otros': Shield
};

// ============================================================
// FUNCTIONS - Categorization and styling
// ============================================================

/**
 * Obtiene el color de Tailwind para una categoría
 * @param category - Categoría de criatura
 * @returns Clase de color Tailwind
 */
export function getCategoryColor(category: CreatureCategory): string {
  return CATEGORY_COLORS[category] || 'text-dungeon-400';
}

/**
 * Obtiene el icono de Lucide para una categoría
 * @param category - Categoría de criatura
 * @returns Componente de icono de Lucide
 */
export function getCategoryIcon(category: CreatureCategory) {
  return CATEGORY_ICONS[category] || Shield;
}

/**
 * Categoriza monstruos según su tipo de criatura
 * @param monsters - Array de monstruos a categorizar
 * @returns Record con monstruos agrupados por categoría
 */
export function categorizeMonsters(monsters: Monster[]): Record<CreatureCategory, Monster[]> {
  const result: Record<CreatureCategory, Monster[]> = {
    'Humanoides y Gigantes': [],
    'No-Muertos': [],
    'Dragones y Bestias Mágicas': [],
    'Otros': []
  };

  monsters.forEach(monster => {
    // Buscar en qué categoría pertenece el tipo de criatura
    if (CREATURE_TYPE_MAPPINGS['Humanoides y Gigantes'].includes(monster.creature_type)) {
      result['Humanoides y Gigantes'].push(monster);
    } else if (CREATURE_TYPE_MAPPINGS['No-Muertos'].includes(monster.creature_type)) {
      result['No-Muertos'].push(monster);
    } else if (CREATURE_TYPE_MAPPINGS['Dragones y Bestias Mágicas'].includes(monster.creature_type)) {
      result['Dragones y Bestias Mágicas'].push(monster);
    } else if (!ALL_KNOWN_CREATURE_TYPES.includes(monster.creature_type)) {
      // Si no es un tipo conocido, va a "Otros"
      result['Otros'].push(monster);
    }
  });

  return result;
}

/**
 * Filtra monstruos según un término de búsqueda
 * @param monsters - Array de monstruos a filtrar
 * @param searchTerm - Término de búsqueda
 * @returns Array de monstruos que coinciden con la búsqueda
 */
export function filterMonstersByName(monsters: Monster[], searchTerm: string): Monster[] {
  return monsters.filter(monster =>
    monster.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
