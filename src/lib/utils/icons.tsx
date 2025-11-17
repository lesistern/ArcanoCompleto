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
  User,
  Mountain,
  Trees,
  TreePine,
  Leaf,
  Coins,
  Moon,
  Bird,
  Cat,
  CircleUser,
  Sprout,
  Sun,
  Eye,
  Footprints,
  Home,

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

  // Iconos de habilidades (skills)
  Brain,
  BookOpen,
  Briefcase,

  // Iconos de puntuaciones de habilidad (ability scores)
  Dumbbell,
  Feather,
  ShieldCheck,
  Lightbulb,
  Sparkle,

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
// CATEGORÍAS DE CLASES - Iconos y Colores
// ============================================

export type ClassCategory =
  | 'Marciales'
  | 'Lanzadores de conjuros'
  | 'Versátiles';

/**
 * Iconos para categorías de clases
 */
export const CLASS_CATEGORY_ICONS: Record<ClassCategory, LucideIcon> = {
  'Marciales': Swords,              // Espadas cruzadas para clases de combate
  'Lanzadores de conjuros': Wand2,  // Varita para clases mágicas
  'Versátiles': Star,               // Estrella para clases híbridas
};

/**
 * Colores para categorías de clases
 */
export const CLASS_CATEGORY_COLORS: Record<ClassCategory, string> = {
  'Marciales': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Lanzadores de conjuros': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Versátiles': 'bg-gold-500/20 text-gold-500 border-gold-500/30',
};

export function getClassCategoryIcon(category: string): LucideIcon {
  return CLASS_CATEGORY_ICONS[category as ClassCategory] || Shield;
}

export function getClassCategoryColor(category: string): string {
  return CLASS_CATEGORY_COLORS[category as ClassCategory] || 'bg-dungeon-800 text-dungeon-300 border-dungeon-700';
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
  // Player's Handbook (7 razas)
  | 'Humano'
  | 'Elfo'
  | 'Enano'
  | 'Mediano'
  | 'Gnomo'
  | 'Semielfo'
  | 'Semiorco'
  // Razas Suplementarias (9 razas)
  | 'Aasimar'
  | 'Tiefling'
  | 'Goliath'
  | 'Raptoran'
  | 'Killoren'
  | 'Illumian'
  | 'Gnomo Susurrante'
  | 'Centauro'
  | 'Felino';

/**
 * Iconos temáticos para cada raza de D&D 3.5
 * Basados en las características principales de cada raza
 */
export const RACE_ICONS: Record<RaceName, LucideIcon> = {
  // Player's Handbook
  'Humano': Users,           // Versátil, comunidad
  'Elfo': TreePine,          // Bosque, naturaleza
  'Enano': Mountain,         // Montaña, minería
  'Mediano': Home,           // Hogareño, pacífico
  'Gnomo': Sprout,           // Pequeño, conectado con la naturaleza
  'Semielfo': Moon,          // Dualidad, entre dos mundos
  'Semiorco': Axe,           // Guerrero, fuerza

  // Razas Suplementarias
  'Aasimar': Sun,            // Celestial, divino
  'Tiefling': Flame,         // Infernal, fuego
  'Goliath': Mountain,       // Gigante, montañés
  'Raptoran': Bird,          // Alado, volador
  'Killoren': Leaf,          // Feérico, naturaleza
  'Illumian': Eye,           // Conocimiento, sabiduría
  'Gnomo Susurrante': Wind,  // Silencioso, comunicador
  'Centauro': Footprints,    // Cuadrúpedo, nómada
  'Felino': Cat,             // Felino, ágil
};

/**
 * Colores temáticos para cada raza
 * Usando la paleta de Tailwind CSS con opacidades para mantener consistencia
 */
export const RACE_COLORS: Record<RaceName, string> = {
  // Player's Handbook
  'Humano': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  'Elfo': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Enano': 'bg-orange-600/20 text-orange-400 border-orange-600/30',
  'Mediano': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Gnomo': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'Semielfo': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'Semiorco': 'bg-red-600/20 text-red-400 border-red-600/30',

  // Razas Suplementarias
  'Aasimar': 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',      // Dorado celestial
  'Tiefling': 'bg-rose-600/20 text-rose-400 border-rose-600/30',          // Rojo infernal
  'Goliath': 'bg-slate-600/20 text-slate-400 border-slate-600/30',        // Gris piedra
  'Raptoran': 'bg-sky-500/20 text-sky-400 border-sky-500/30',             // Azul cielo
  'Killoren': 'bg-lime-500/20 text-lime-400 border-lime-500/30',          // Verde vivo
  'Illumian': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',    // Azul místico
  'Gnomo Susurrante': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',  // Azul claro
  'Centauro': 'bg-amber-700/20 text-amber-500 border-amber-700/30',       // Marrón tierra
  'Felino': 'bg-orange-500/20 text-orange-400 border-orange-500/30',      // Naranja felino
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

// ============================================
// HABILIDADES - Categorías, Iconos y Colores
// ============================================

export type SkillCategory =
  | 'Física'
  | 'Mental'
  | 'Social'
  | 'Conocimiento'
  | 'Oficio'
  | 'Profesión'
  | 'Interpretación';

export type AbilityScore =
  | 'Fuerza'
  | 'Destreza'
  | 'Constitución'
  | 'Inteligencia'
  | 'Sabiduría'
  | 'Carisma';

/**
 * Iconos temáticos para categorías de habilidades
 */
export const SKILL_CATEGORY_ICONS: Record<SkillCategory, LucideIcon> = {
  'Física': Zap,
  'Mental': Brain,
  'Social': Users,
  'Conocimiento': BookOpen,
  'Oficio': Hammer,
  'Profesión': Briefcase,
  'Interpretación': Music,
};

/**
 * Colores temáticos para categorías de habilidades
 */
export const SKILL_CATEGORY_COLORS: Record<SkillCategory, string> = {
  'Física': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Mental': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Social': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Conocimiento': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Oficio': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Profesión': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Interpretación': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

/**
 * Iconos temáticos para puntuaciones de habilidad (Ability Scores)
 */
export const ABILITY_ICONS: Record<AbilityScore, LucideIcon> = {
  'Fuerza': Dumbbell,        // Mancuerna para fuerza física
  'Destreza': Feather,       // Pluma para agilidad y destreza
  'Constitución': ShieldCheck, // Escudo para resistencia
  'Inteligencia': Brain,     // Cerebro para inteligencia
  'Sabiduría': Lightbulb,    // Bombilla para sabiduría/insight
  'Carisma': Sparkle,        // Brillo para carisma y presencia
};

/**
 * Colores temáticos para puntuaciones de habilidad (Ability Scores)
 */
export const ABILITY_COLORS: Record<AbilityScore, string> = {
  'Fuerza': 'text-red-400',
  'Destreza': 'text-green-400',
  'Constitución': 'text-orange-400',
  'Inteligencia': 'text-blue-400',
  'Sabiduría': 'text-purple-400',
  'Carisma': 'text-pink-400',
};

export function getSkillCategoryIcon(category: string): LucideIcon {
  return SKILL_CATEGORY_ICONS[category as SkillCategory] || Brain;
}

export function getSkillCategoryColor(category: string): string {
  return SKILL_CATEGORY_COLORS[category as SkillCategory] || 'bg-dungeon-800 text-dungeon-300 border-dungeon-700';
}

export function getAbilityColor(ability: string): string {
  return ABILITY_COLORS[ability as AbilityScore] || 'text-dungeon-400';
}

export function getAbilityIcon(ability: string): LucideIcon {
  return ABILITY_ICONS[ability as AbilityScore] || Brain;
}
