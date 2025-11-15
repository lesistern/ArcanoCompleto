/**
 * Sistema centralizado de iconos y colores para el compendio D&D 3.5
 * Mantiene consistencia visual en toda la aplicación
 */

import {
  // Iconos de clases
  Swords,
  Shield,
  Wind,
  Flame,
  Wand2,
  Sparkles,
  Book,
  Music,
  Heart,
  Zap,
  Cross,

  // Iconos de tipos de dotes
  Hammer,
  Star,

  // Iconos de razas
  Users,
  Mountain,
  Trees,
  Coins,
  Moon,

  // Iconos de objetos
  Sword,
  Axe,
  Crosshair,
  Package,
  Scroll,
  Gem,
  FlaskConical,
  Crown,
  CircleDot,

  // Iconos de armas específicas
  Swords as SwordsIcon,
  Grip,
  Hammer as HammerIcon,
  Minus,
  Target,
  Zap as ZapIcon,
  // Iconos adicionales para armas
  Slash,
  ArrowUpRight,
  Waypoints,
  type LucideIcon,
} from 'lucide-react';

// ============================================
// CLASES - Iconos y Colores
// ============================================

export type ClassName =
  | 'Bárbaro'
  | 'Bardo'
  | 'Clérigo'
  | 'Druida'
  | 'Explorador'
  | 'Guerrero'
  | 'Hechicero'
  | 'Mago'
  | 'Monje'
  | 'Paladín'
  | 'Pícaro';

export const CLASS_ICONS: Record<ClassName, LucideIcon> = {
  'Bárbaro': Swords,
  'Bardo': Music,
  'Clérigo': Cross,
  'Druida': Trees,
  'Explorador': Wind,
  'Guerrero': Swords,
  'Hechicero': Sparkles,
  'Mago': Wand2,
  'Monje': Flame,
  'Paladín': Shield,
  'Pícaro': Zap,
};

export const CLASS_COLORS: Record<ClassName, string> = {
  'Bárbaro': 'bg-red-600/20 text-red-400 border-red-600/30',
  'Bardo': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Clérigo': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Druida': 'bg-green-600/20 text-green-400 border-green-600/30',
  'Explorador': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Guerrero': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Hechicero': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Mago': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Monje': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Paladín': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Pícaro': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export function getClassIcon(className: string): LucideIcon {
  return CLASS_ICONS[className as ClassName] || Shield;
}

export function getClassColor(className: string): string {
  return CLASS_COLORS[className as ClassName] || 'bg-dungeon-800 text-dungeon-300 border-dungeon-700';
}

// ============================================
// DOTES - Tipos, Iconos y Colores
// ============================================

export type FeatType =
  | 'General'
  | 'Combate'
  | 'Metamagia'
  | 'Creación de Objetos'
  | 'Especial';

export const FEAT_TYPE_ICONS: Record<FeatType, LucideIcon> = {
  'Combate': Swords,
  'Metamagia': Sparkles,
  'Creación de Objetos': Hammer,
  'General': Star,
  'Especial': Zap,
};

export const FEAT_TYPE_COLORS: Record<FeatType, string> = {
  'Combate': 'text-red-400 bg-red-500/20 border-red-500/30',
  'Metamagia': 'text-purple-400 bg-purple-500/20 border-purple-500/30',
  'Creación de Objetos': 'text-orange-400 bg-orange-500/20 border-orange-500/30',
  'General': 'text-blue-400 bg-blue-500/20 border-blue-500/30',
  'Especial': 'text-gold-500 bg-gold-500/20 border-gold-500/30',
};

export function getFeatTypeIcon(type: string): LucideIcon {
  return FEAT_TYPE_ICONS[type as FeatType] || Star;
}

export function getFeatTypeColor(type: string): string {
  return FEAT_TYPE_COLORS[type as FeatType] || 'text-dungeon-400 bg-dungeon-800 border-dungeon-700';
}

// ============================================
// RAZAS - Iconos y Colores
// ============================================

export type RaceName =
  | 'Humano'
  | 'Elfo'
  | 'Enano'
  | 'Mediano'
  | 'Gnomo'
  | 'Semielfo'
  | 'Semiorco';

export const RACE_ICONS: Record<RaceName, LucideIcon> = {
  'Humano': Users,
  'Elfo': Trees,
  'Enano': Mountain,
  'Mediano': Heart,
  'Gnomo': Coins,
  'Semielfo': Moon,
  'Semiorco': Swords,
};

export const RACE_COLORS: Record<RaceName, string> = {
  'Humano': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'Elfo': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Enano': 'bg-orange-600/20 text-orange-400 border-orange-600/30',
  'Mediano': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Gnomo': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Semielfo': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'Semiorco': 'bg-red-600/20 text-red-400 border-red-600/30',
};

export function getRaceIcon(raceName: string): LucideIcon {
  return RACE_ICONS[raceName as RaceName] || Users;
}

export function getRaceColor(raceName: string): string {
  return RACE_COLORS[raceName as RaceName] || 'bg-dungeon-800 text-dungeon-300 border-dungeon-700';
}

// ============================================
// UTILIDADES
// ============================================

/**
 * Extrae el color de texto de una clase de Tailwind compuesta
 * Ej: "bg-red-500/20 text-red-400 border-red-500/30" -> "text-red-400"
 */
export function extractTextColor(colorClass: string): string {
  const match = colorClass.match(/text-[\w-]+/);
  return match ? match[0] : 'text-dungeon-300';
}

/**
 * Extrae el color de borde de una clase de Tailwind compuesta
 * Ej: "bg-red-500/20 text-red-400 border-red-500/30" -> "border-red-500/30"
 */
export function extractBorderColor(colorClass: string): string {
  const match = colorClass.match(/border-[\w-/]+/);
  return match ? match[0] : 'border-dungeon-700';
}

/**
 * Extrae el color de fondo de una clase de Tailwind compuesta
 * Ej: "bg-red-500/20 text-red-400 border-red-500/30" -> "bg-red-500/20"
 */
export function extractBackgroundColor(colorClass: string): string {
  const match = colorClass.match(/bg-[\w-/]+/);
  return match ? match[0] : 'bg-dungeon-800';
}

// ============================================
// OBJETOS - Categorías, Iconos y Colores
// ============================================

export type ItemCategoryName =
  | 'Arma'
  | 'Armadura'
  | 'Escudo'
  | 'Equipamiento'
  | 'Objeto Mágico'
  | 'Poción'
  | 'Pergamino'
  | 'Varita'
  | 'Bastón'
  | 'Anillo'
  | 'Vara'
  | 'Objeto Maravilloso';

export const ITEM_CATEGORY_ICONS: Record<ItemCategoryName, LucideIcon> = {
  'Arma': Sword,
  'Armadura': Shield,
  'Escudo': Shield,
  'Equipamiento': Package,
  'Objeto Mágico': Sparkles,
  'Poción': FlaskConical,
  'Pergamino': Scroll,
  'Varita': Wand2,
  'Bastón': Wand2,
  'Anillo': CircleDot,
  'Vara': Wand2,
  'Objeto Maravilloso': Gem,
};

export const ITEM_CATEGORY_COLORS: Record<ItemCategoryName, string> = {
  'Arma': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Armadura': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'Escudo': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Equipamiento': 'bg-yellow-600/20 text-yellow-500 border-yellow-600/30',
  'Objeto Mágico': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Poción': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Pergamino': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Varita': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Bastón': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'Anillo': 'bg-gold-500/20 text-gold-500 border-gold-500/30',
  'Vara': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'Objeto Maravilloso': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

export function getItemCategoryIcon(category: string): LucideIcon {
  return ITEM_CATEGORY_ICONS[category as ItemCategoryName] || Package;
}

export function getItemCategoryColor(category: string): string {
  return ITEM_CATEGORY_COLORS[category as ItemCategoryName] || 'bg-dungeon-800 text-dungeon-300 border-dungeon-700';
}

// ============================================
// ARMAS - Iconos específicos por tipo de daño
// ============================================

/**
 * Obtiene el icono específico para un arma basado en su tipo de daño y alcance
 * - Martillo: Contundente
 * - Espada: Cortante
 * - Diana: A distancia
 * - Flecha: Perforante
 * - Waypoints: Armas con 2 tipos de daño (dualidad)
 */
export function getWeaponIcon(weapon: { stats?: { damageType?: string[]; range?: number } }): LucideIcon {
  // Validación de datos
  if (!weapon || !weapon.stats || !weapon.stats.damageType || weapon.stats.damageType.length === 0) {
    return Sword; // Default icon
  }

  const damageTypes = weapon.stats.damageType;
  const hasRange = weapon.stats.range && weapon.stats.range > 0;

  // Armas a distancia
  if (hasRange) {
    return Target;
  }

  // Armas con dos tipos de daño (dualidad)
  if (damageTypes.length > 1) {
    return Waypoints;
  }

  // Armas con un solo tipo de daño
  const damageType = damageTypes[0];

  if (damageType === 'Contundente') {
    return HammerIcon;
  } else if (damageType === 'Cortante') {
    return Sword;
  } else if (damageType === 'Perforante') {
    return ArrowUpRight;
  }

  // Por defecto, icono genérico de espada
  return Sword;
}
