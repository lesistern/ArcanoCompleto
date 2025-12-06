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

  // Iconos de alineamientos
  Scale,
  Skull,
  HandHeart,
  Gavel,
  Flame as FlameIcon,
  Compass,
  CircleDashed,
  Landmark,
  Siren,

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
  | 'Mágicas'
  | 'Versátiles';

/**
 * Iconos para categorías de clases
 */
export const CLASS_CATEGORY_ICONS: Record<ClassCategory, LucideIcon> = {
  'Marciales': Swords,      // Espadas cruzadas para clases de combate
  'Mágicas': Wand2,        // Varita para clases mágicas
  'Versátiles': Star,       // Estrella para clases híbridas
};

/**
 * Colores para categorías de clases
 */
export const CLASS_CATEGORY_COLORS: Record<ClassCategory, string> = {
  'Marciales': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Mágicas': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Versátiles': 'bg-gold-500/20 text-gold-500 border-gold-500/30',
};

export function getClassCategoryIcon(category: string): LucideIcon {
  return CLASS_CATEGORY_ICONS[category as ClassCategory] || Shield;
}

export function getClassCategoryColor(category: string): string {
  return CLASS_CATEGORY_COLORS[category as ClassCategory] || 'bg-dungeon-800 text-dungeon-300 border-dungeon-700';
}

// ============================================
// TAGS DE FUENTE (LIBROS) - Códigos y Colores
// ============================================

export type SourceTagConfig = {
  code: string;
  className: string;
  Icon?: LucideIcon;
  label?: string;
};

const SOURCE_TAG_PRESETS: Record<string, SourceTagConfig> = {
  phb: { code: 'PHB', className: 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/30', Icon: Book },
  ph2: { code: 'PH2', className: 'bg-green-500/15 text-green-200 border border-green-500/30', Icon: Book },
  xph: { code: 'XPH', className: 'bg-indigo-500/15 text-indigo-200 border border-indigo-500/30', Icon: Book },
  cad: { code: 'CAD', className: 'bg-amber-500/15 text-amber-100 border border-amber-500/30', Icon: Book },
  car: { code: 'CAR', className: 'bg-blue-500/15 text-blue-200 border border-blue-500/30', Icon: Book },
  cdv: { code: 'CDV', className: 'bg-lime-500/15 text-lime-100 border border-lime-500/30', Icon: Book },
  cps: { code: 'CPS', className: 'bg-fuchsia-500/15 text-fuchsia-200 border border-fuchsia-500/30', Icon: Book },
  cwr: { code: 'CWR', className: 'bg-red-500/15 text-red-200 border border-red-500/30', Icon: Book },
  dco: { code: 'DCO', className: 'bg-orange-500/15 text-orange-200 border border-orange-500/30', Icon: Book },
  drm: { code: 'DRM', className: 'bg-rose-500/15 text-rose-100 border border-rose-500/30', Icon: Book },
  dlc: { code: 'DLC', className: 'bg-cyan-500/15 text-cyan-100 border border-cyan-500/30', Icon: Book },
  dsc: { code: 'DSC', className: 'bg-slate-500/15 text-slate-200 border border-slate-500/30', Icon: Book },
  ecs: { code: 'ECS', className: 'bg-amber-400/15 text-amber-100 border border-amber-400/30', Icon: Book },
  hoh: { code: 'HOH', className: 'bg-purple-600/15 text-purple-100 border border-purple-600/30', Icon: Book },
  moi: { code: 'MOI', className: 'bg-sky-500/15 text-sky-100 border border-sky-500/30', Icon: Book },
  mhb: { code: 'MHB', className: 'bg-teal-500/15 text-teal-100 border border-teal-500/30', Icon: Book },
  oad: { code: 'OAD', className: 'bg-yellow-500/15 text-yellow-100 border border-yellow-500/30', Icon: Book },
  tob: { code: 'TOB', className: 'bg-blue-600/15 text-blue-100 border border-blue-600/30', Icon: Book },
  tom: { code: 'TOM', className: 'bg-indigo-400/15 text-indigo-100 border border-indigo-400/30', Icon: Book },
  web: { code: 'WEB', className: 'bg-dungeon-800 text-dungeon-200 border border-dungeon-600', Icon: Book },
  default: { code: 'SRC', className: 'bg-dungeon-800 text-dungeon-200 border border-dungeon-700', Icon: Book },
};

const SOURCE_BOOK_MAP: Record<string, keyof typeof SOURCE_TAG_PRESETS> = {
  'manualdeljugador': 'phb',
  'playershandbook': 'phb',
  'playershandbooki': 'phb',
  'playershandbookii': 'ph2',
  'playershandbook2': 'ph2',
  'expandedpsionicshandbook': 'xph',
  'completeadventurer': 'cad',
  'completearcane': 'car',
  'completedivine': 'cdv',
  'completepsionic': 'cps',
  'completewarrior': 'cwr',
  'dragoncompendium': 'dco',
  'dragonmagic': 'drm',
  'dragonlancecampaignsetting': 'dlc',
  'dungeonscape': 'dsc',
  'eberroncampaignsetting': 'ecs',
  'heroesofhorror': 'hoh',
  'magicofincarnum': 'moi',
  'miniatureshandbook': 'mhb',
  'orientaladventures': 'oad',
  'tomeofbattle': 'tob',
  'tomeofmagic': 'tom',
  'sitiowebdewizards': 'web',
  'wizardsofthescoastwebsite': 'web',
};

const normalizeSourceKey = (value?: string) =>
  value
    ? value
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '')
    : '';

export function getSourceTag(book?: string): SourceTagConfig {
  const normalized = normalizeSourceKey(book);
  const presetKey = SOURCE_BOOK_MAP[normalized];
  const preset = presetKey ? SOURCE_TAG_PRESETS[presetKey] : null;
  const selected = preset || SOURCE_TAG_PRESETS[normalized] || SOURCE_TAG_PRESETS.default;
  return { ...selected, label: book || selected.label };
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

/**
 * Mapeo de IDs de habilidades (str, dex, etc.) a nombres completos
 */
export const ABILITY_ID_TO_NAME: Record<string, AbilityScore> = {
  'str': 'Fuerza',
  'dex': 'Destreza',
  'con': 'Constitución',
  'int': 'Inteligencia',
  'wis': 'Sabiduría',
  'cha': 'Carisma',
};

/**
 * Iconos por ID de habilidad (str, dex, con, int, wis, cha)
 */
export const ABILITY_ICONS_BY_ID: Record<string, LucideIcon> = {
  'str': Dumbbell,
  'dex': Feather,
  'con': ShieldCheck,
  'int': Brain,
  'wis': Lightbulb,
  'cha': Sparkle,
};

/**
 * Colores por ID de habilidad (str, dex, con, int, wis, cha)
 */
export const ABILITY_COLORS_BY_ID: Record<string, string> = {
  'str': 'text-red-400',
  'dex': 'text-green-400',
  'con': 'text-orange-400',
  'int': 'text-blue-400',
  'wis': 'text-purple-400',
  'cha': 'text-pink-400',
};

// ============================================
// ALINEAMIENTOS - Iconos y Colores
// ============================================

export type AlignmentName =
  | 'Legal Bueno'
  | 'Neutral Bueno'
  | 'Caótico Bueno'
  | 'Legal Neutral'
  | 'Neutral'
  | 'Caótico Neutral'
  | 'Legal Maligno'
  | 'Neutral Maligno'
  | 'Caótico Maligno';

/**
 * Iconos temáticos para alineamientos de D&D 3.5
 */
export const ALIGNMENT_ICONS: Record<AlignmentName, LucideIcon> = {
  'Legal Bueno': Landmark,        // Orden y justicia
  'Neutral Bueno': HandHeart,     // Bondad y compasión
  'Caótico Bueno': Heart,         // Libertad y bondad
  'Legal Neutral': Gavel,         // Ley y orden
  'Neutral': Scale,               // Balance perfecto
  'Caótico Neutral': Compass,     // Libertad sin restricciones
  'Legal Maligno': Skull,         // Tiranía y opresión
  'Neutral Maligno': Siren,       // Maldad pragmática
  'Caótico Maligno': FlameIcon,   // Destrucción y caos
};

/**
 * Mapeo de IDs de alineamientos a nombres completos
 */
export const ALIGNMENT_ID_TO_NAME: Record<string, AlignmentName> = {
  'LB': 'Legal Bueno',
  'NB': 'Neutral Bueno',
  'CB': 'Caótico Bueno',
  'LN': 'Legal Neutral',
  'N': 'Neutral',
  'CN': 'Caótico Neutral',
  'LM': 'Legal Maligno',
  'NM': 'Neutral Maligno',
  'CM': 'Caótico Maligno',
};

/**
 * Iconos por ID de alineamiento
 */
export const ALIGNMENT_ICONS_BY_ID: Record<string, LucideIcon> = {
  'LB': Landmark,
  'NB': HandHeart,
  'CB': Heart,
  'LN': Gavel,
  'N': Scale,
  'CN': Compass,
  'LM': Skull,
  'NM': Siren,
  'CM': FlameIcon,
};

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

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

/**
 * Obtiene el icono de habilidad por ID (str, dex, etc.)
 */
export function getAbilityIconById(id: string): LucideIcon {
  return ABILITY_ICONS_BY_ID[id] || Brain;
}

/**
 * Obtiene el color de habilidad por ID (str, dex, etc.)
 */
export function getAbilityColorById(id: string): string {
  return ABILITY_COLORS_BY_ID[id] || 'text-dungeon-400';
}

/**
 * Obtiene el icono de alineamiento por nombre completo
 */
export function getAlignmentIcon(alignment: string): LucideIcon {
  return ALIGNMENT_ICONS[alignment as AlignmentName] || Scale;
}

/**
 * Obtiene el icono de alineamiento por ID (lg, ng, etc.)
 */
export function getAlignmentIconById(id: string): LucideIcon {
  return ALIGNMENT_ICONS_BY_ID[id] || Scale;
}
