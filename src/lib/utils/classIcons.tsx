/**
 * Iconos de Clases de D&D 3.5
 *
 * Sistema centralizado de iconos para clases de personajes.
 * Usar en cualquier componente que necesite mostrar iconos de clases.
 *
 * Ejemplo de uso:
 * ```tsx
 * import { getClassIcon, CLASS_ICONS } from '@/lib/utils/classIcons';
 *
 * const Icon = getClassIcon(classSlug);
 * <Icon className="h-8 w-8 text-gold-400" />
 * ```
 */

import {
  // Clases Base PHB
  Axe,        // Bárbaro - Hacha de combate
  Music,      // Bardo - Instrumento musical
  Cross,      // Clérigo - Símbolo sagrado
  Leaf,       // Druida - Naturaleza
  Swords,     // Guerrero - Espadas cruzadas
  Hand,       // Monje - Puño/mano desnuda
  Shield,     // Paladín - Escudo protector
  Target,     // Explorador - Puntería/objetivo
  Eye,        // Pícaro - Sigilo/percepción
  Sparkles,   // Hechicero - Magia innata
  Wand2,      // Mago - Varita mágica

  // Clases Psiónicas
  Brain,      // Psion - Poder mental
  Zap,        // Guerrero Psíquico - Energía psíquica
  Flame,      // Wilder/Desatado - Emociones salvajes
  Gem,        // Cuchilla del Alma - Hoja cristalina
  Heart,      // Ardiente/Alma Elegida - Pasión/Fe
  BrainCog,   // Mente Divina - Mente + Divinidad

  // Clases Marciales/ToB
  Sword,      // Múltiples clases marciales
  Compass,    // Batidor - Exploración
  Footprints, // Bailarín de Batalla
  Moon,       // Ninja/Shadowcaster
  Crown,      // Caballero/Noble

  // Clases Arcanas Alternativas
  Skull,      // Nigromante
  Wind,       // Wu Jen/Sha'ir
  Droplet,    // Shugenja - Elementos
  Bomb,       // Mago de Guerra
  Ghost,      // Chamán de Espíritus

  // Clases Especializadas
  Wrench,     // Artificiero
  Star,       // Factótum
  Link,       // Vinculador
  Quote,      // Nominador
  PawPrint,   // Totemista
  Smile,      // Embaucador/Bufón
  Anchor,     // Marinero
  Flag,       // Mariscal
  Scroll,     // Archivista
  BookOpen,   // Erudito
  Users,      // Chamán
  Feather,    // Místico
  Bird,       // Acechador
  CircleDot,  // Sabio de la Espada
  Dices,      // Charlatán
  TreeDeciduous, // Druida Urbano
  FlameKindling, // Adepto del Fuego Dragón
  HeartPulse, // Sanador
  Scale,      // Almacido
  Glasses,    // Sabio

  // Clases de Prestigio
  Crosshair,  // Arquero Arcano
  Sparkle,    // Archimago
  CircleDashed, // Asesino - sigilo
  Move,       // Bailarín de Sombras
  Drama,      // Evangelista
  Gavel,      // Inquisidor
  Mountain,   // Defensor Enano
  Tornado,    // Derviche
  Trophy,     // Kensai/Maestro
  Lock,       // Maestro del Saber
  FlaskConical, // Mago de Sangre
  Orbit,      // Tejedor del Destino
  Church,     // Templario/Sacerdote
  Atom,       // Teurgo Místico
  CircleOff,  // Guardia Negro
  Beer,       // Maestro Borracho
  Maximize,   // Metamente
  Activity,   // Mente de Guerra
  Shapes,     // Moldeador de Guerra
  SunMoon,    // Ninja Sol de Sombras
  Waypoints,  // Caminante del Horizonte
  FlameIcon,  // Pirocinetico
} from 'lucide-react';

// Renombrar iconos duplicados
const FlameIcon2 = Flame;

/**
 * Mapeo de iconos por clase
 * Incluye todas las variantes posibles: con/sin acentos, español/inglés
 */
export const CLASS_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  // ===== CLASES BASE PHB =====
  // Bárbaro
  'barbaro': Axe,
  'bárbaro': Axe,
  'barbarian': Axe,

  // Bardo
  'bardo': Music,
  'bard': Music,

  // Clérigo
  'clerigo': Cross,
  'clérigo': Cross,
  'cleric': Cross,

  // Druida
  'druida': Leaf,
  'druid': Leaf,

  // Guerrero
  'guerrero': Swords,
  'fighter': Swords,

  // Monje
  'monje': Hand,
  'monk': Hand,

  // Paladín
  'paladin': Shield,
  'paladín': Shield,

  // Explorador
  'explorador': Target,
  'ranger': Target,

  // Pícaro
  'picaro': Eye,
  'pícaro': Eye,
  'rogue': Eye,

  // Hechicero
  'hechicero': Sparkles,
  'sorcerer': Sparkles,

  // Mago
  'mago': Wand2,
  'wizard': Wand2,

  // ===== CLASES PSIÓNICAS =====
  // Psion (Psiónico)
  'psion': Brain,
  'psionico': Brain,
  'psiónico': Brain,

  // Guerrero Psíquico
  'psychic-warrior': Zap,
  'guerrero-psiquico': Zap,
  'guerrero-psíquico': Zap,

  // Wilder (Desatado)
  'wilder': Flame,
  'desatado': Flame,

  // Cuchilla del Alma
  'soulknife': Gem,
  'cuchilla-del-alma': Gem,

  // Ardiente
  'ardent': Heart,
  'ardiente': Heart,

  // Mente Divina
  'divine-mind': BrainCog,
  'mente-divina': BrainCog,

  // Erudito
  'erudite': BookOpen,
  'erudito': BookOpen,

  // Pícaro Psíquico
  'psychic-rogue': Eye,
  'picaro-psiquico': Eye,

  // ===== CLASES MARCIALES (Tome of Battle) =====
  // Cruzado
  'crusader': Sword,
  'cruzado': Sword,

  // Espada de Guerra
  'warblade': Swords,
  'espada-de-guerra': Swords,

  // Sabio de la Espada
  'swordsage': CircleDot,
  'sabio-de-la-espada': CircleDot,

  // Caballero
  'knight': Crown,
  'caballero': Crown,

  // Espadachín
  'swashbuckler': Sword,
  'espadachin': Sword,
  'espadachín': Sword,

  // Samurái
  'samurai': Sword,
  'samurái': Sword,

  // Batidor
  'scout': Compass,
  'batidor': Compass,

  // Bailarín de Batalla
  'battle-dancer': Footprints,
  'bailarin-de-batalla': Footprints,

  // Ninja
  'ninja': Moon,

  // ===== CLASES ARCANAS ALTERNATIVAS =====
  // Brujo
  'warlock': Flame,
  'brujo': Flame,

  // Mago de Guerra
  'warmage': Bomb,
  'mago-de-guerra': Bomb,

  // Embaucador
  'beguiler': Smile,
  'embaucador': Smile,

  // Lanzasombras
  'shadowcaster': Moon,
  'lanzasombras': Moon,

  // Nigromante Macabro
  'dread-necromancer': Skull,
  'nigromante-macabro': Skull,

  // Wu Jen
  'wu-jen': Wind,

  // Shugenja
  'shugenja': Droplet,

  // Sha'ir
  'shair': Wind,

  // Espada del Ocaso
  'duskblade': Sword,
  'espada-del-ocaso': Sword,

  // Ladrón de Conjuros
  'spellthief': Eye,
  'ladron-de-conjuros': Eye,

  // ===== CLASES DIVINAS =====
  // Alma Elegida
  'favored-soul': Heart,
  'alma-elegida': Heart,

  // Chamán
  'shaman': Users,
  'chamán': Users,

  // Chamán de los Espíritus
  'spirit-shaman': Ghost,
  'chaman-de-los-espiritus': Ghost,

  // Chamán Dragón
  'dragon-shaman': Flame,
  'chaman-dragon': Flame,

  // Sanador
  'healer': HeartPulse,
  'sanador': HeartPulse,

  // Sohei
  'sohei': Sword,

  // ===== CLASES ESPECIALIZADAS =====
  // Artificiero
  'artificer': Wrench,
  'artificiero': Wrench,

  // Factótum
  'factotum': Star,
  'factótum': Star,

  // Vinculador
  'binder': Link,
  'vinculador': Link,

  // Nominador
  'truenamer': Quote,
  'nominador': Quote,

  // Totemista
  'totemist': PawPrint,
  'totemista': PawPrint,

  // Encarnado
  'incarnate': Sparkles,
  'encarnado': Sparkles,

  // Almacido
  'soulborn': Scale,
  'almacido': Scale,

  // Bufón
  'jester': Smile,
  'bufón': Smile,

  // Charlatán
  'mountebank': Dices,
  'charlatán': Dices,

  // Marinero
  'mariner': Anchor,
  'marinero': Anchor,

  // Mariscal
  'marshal': Flag,
  'mariscal': Flag,

  // Archivista
  'archivist': Scroll,
  'archivista': Scroll,

  // Místico
  'mystic': Feather,
  'místico': Feather,

  // Noble
  'noble': Crown,

  // Druida Urbano
  'urban-druid': TreeDeciduous,
  'druida-urbano': TreeDeciduous,

  // Adepto del Fuego Dragón
  'dragonfire-adept': FlameKindling,
  'adepto-del-fuego-dragon': FlameKindling,

  // Sabio
  'savant': Glasses,
  'sabio': Glasses,

  // Maestro
  'master': Trophy,
  'maestro': Trophy,

  // Maestro de la Muerte
  'death-master': Skull,
  'maestro-de-la-muerte': Skull,

  // Acechador
  'lurk': Bird,
  'acechador': Bird,

  // Acechador Nocturno
  'nightstalker': Moon,
  'acechador-nocturno': Moon,

  // Malaespada
  'hexblade': Sword,
  'malaespada': Sword,

  // ===== CLASES DE PRESTIGIO =====
  // Arquero Arcano
  'arcane-archer': Crosshair,
  'arquero-arcano': Crosshair,

  // Archimago
  'archmage': Sparkle,
  'archimago': Sparkle,

  // Asesino
  'assassin': CircleDashed,
  'asesino': CircleDashed,

  // Bailarín de las Sombras
  'shadowdancer': Move,
  'bailarin-de-las-sombras': Move,

  // Berserker Frenético
  'frenzied-berserker': Axe,
  'berserker-frenetico': Axe,

  // Caballero (prestigio)
  'cavalier': Crown,

  // Caballero Arcano
  'eldritch-knight': Sword,
  'caballero-arcano': Sword,

  // Caballero Protector
  'knight-protector': Shield,
  'caballero-protector': Shield,

  // Caballero Rubí Vindicador
  'ruby-knight-vindicator': Gem,
  'caballero-rubi-vindicador': Gem,

  // Caminante del Horizonte
  'horizon-walker': Waypoints,
  'caminante-del-horizonte': Waypoints,

  // Cantor de la Espada
  'bladesinger': Music,
  'cantor-de-la-espada': Music,

  // Cazador de Ilítidos
  'illithid-slayer': Brain,
  'cazador-de-ilithidos': Brain,

  // Cazador Oscuro
  'dark-hunter': Eye,
  'cazador-oscuro': Eye,

  // Centinela de Piedra Profunda
  'deepstone-sentinel': Mountain,
  'centinela-de-piedra-profunda': Mountain,

  // Cerebromante
  'cerebremancer': Brain,
  'cerebromante': Brain,

  // Contemplativo
  'contemplative': Cross,
  'contemplativo': Cross,

  // Defensor Enano
  'dwarven-defender': Mountain,
  'defensor-enano': Mountain,

  // Derviche
  'dervish': Tornado,
  'derviche': Tornado,

  // Discípulo del Dragón
  'dragon-disciple': Flame,
  'discipulo-del-dragon': Flame,

  // Doblegador de Mentes
  'mindbender': Brain,
  'doblegador-de-mentes': Brain,

  // Duelista
  'duelist': Sword,
  'duelista': Sword,

  // Elocador
  'elocater': Waypoints,
  'elocador': Waypoints,

  // Embaucador Arcano
  'arcane-trickster': Smile,
  'embaucador-arcano': Smile,

  // Entropomante
  'entropomancer': Atom,
  'entropomante': Atom,

  // Espada de la Tormenta de Sangre
  'bloodstorm-blade': Swords,
  'espada-de-la-tormenta-de-sangre': Swords,

  // Espada Eterna
  'eternal-blade': Sword,
  'espada-eterna': Sword,

  // Espada Invisible
  'invisible-blade': Eye,
  'espada-invisible': Eye,

  // Evangelista
  'evangelist': Drama,
  'evangelista': Drama,

  // Guardia Negro
  'blackguard': CircleOff,
  'guardia-negro': CircleOff,

  // Guerrero Oso
  'bear-warrior': PawPrint,
  'guerrero-oso': PawPrint,

  // Hierofante
  'hierophant': Cross,
  'hierofante': Cross,

  // Iniciado del Séptimo Velo
  'initiate-of-the-sevenfold-veil': Sparkles,
  'iniciado-del-septimo-velo': Sparkles,

  // Inquisidor de la Iglesia
  'church-inquisitor': Gavel,
  'inquisidor-de-la-iglesia': Gavel,

  // Kensai
  'kensai': Sword,

  // Libertador Sagrado
  'holy-liberator': Shield,
  'libertador-sagrado': Shield,

  // Maestro Borracho
  'drunken-master': Beer,
  'maestro-borracho': Beer,

  // Maestro de Armas Exóticas
  'exotic-weapon-master': Swords,
  'maestro-de-armas-exoticas': Swords,

  // Maestro de las Nueve
  'master-of-nine': CircleDot,
  'maestro-de-las-nueve': CircleDot,

  // Maestro del Saber
  'loremaster': Lock,
  'maestro-del-saber': Lock,

  // Maestro Garra Sangrienta
  'bloodclaw-master': PawPrint,
  'maestro-garra-sangrienta': PawPrint,

  // Mago de la Furia
  'rage-mage': Flame,
  'mago-de-la-furia': Flame,

  // Mago de la Orden Arcana
  'mage-of-the-arcane-order': Wand2,
  'mago-de-la-orden-arcana': Wand2,

  // Mago de Sangre
  'blood-magus': FlaskConical,
  'mago-de-sangre': FlaskConical,

  // Mago del Fénix de Jade
  'jade-phoenix-mage': Flame,
  'mago-del-fenix-de-jade': Flame,

  // Mago Salvaje
  'wild-mage-prestige': Sparkles,
  'mago-salvaje': Sparkles,

  // Mente de Guerra
  'war-mind': Activity,
  'mente-de-guerra': Activity,

  // Metamente
  'metamind': Maximize,
  'metamente': Maximize,

  // Moldeador de Guerra
  'warshaper': Shapes,
  'moldeador-de-guerra': Shapes,

  // Ninja Sol de Sombras
  'shadow-sun-ninja': SunMoon,
  'ninja-sol-de-sombras': SunMoon,

  // Oráculo Divino
  'divine-oracle': Eye,
  'oraculo-divino': Eye,

  // Pastor de Esclavos
  'thrallherd': Users,
  'pastor-de-esclavos': Users,

  // Pirocinetico
  'pyrokineticist': FlameIcon2,
  'pirocinetico': FlameIcon2,

  // Psion Desencarnado
  'psion-uncarnate': Ghost,
  'psion-desencarnado': Ghost,

  // Puño de Zuoken
  'fist-of-zuoken': Hand,
  'puno-de-zuoken': Hand,

  // Sabio Argento
  'argent-savant': Sparkle,
  'sabio-argento': Sparkle,

  // Sabio Elemental
  'elemental-savant': Droplet,
  'sabio-elemental': Droplet,

  // Sacerdote de Guerra
  'warpriest': Cross,
  'sacerdote-de-guerra': Cross,

  // Señor de las Tormentas
  'stormlord': Tornado,
  'senor-de-las-tormentas': Tornado,

  // Servidor Radiante de Pelor
  'radiant-servant-of-pelor': Star,
  'servidor-radiante-de-pelor': Star,

  // Taumaturgo
  'thaumaturgist': Wand2,
  'taumaturgo': Wand2,

  // Tejedor del Destino
  'fatespinner': Orbit,
  'tejedor-del-destino': Orbit,

  // Templario Piadoso
  'pious-templar': Church,
  'templario-piadoso': Church,

  // Teurgo Místico
  'mystic-theurge': Atom,
  'teurgo-mistico': Atom,

  // Acólito de la Piel
  'acolyte-of-the-skin': Skull,
  'acolito-de-la-piel': Skull,

  // Acorde Sublime
  'sublime-chord': Music,
  'acorde-sublime': Music,

  // Adepto de la Estrella Verde
  'green-star-adept': Star,
  'adepto-de-la-estrella-verde': Star,
};

/**
 * Obtiene el icono correspondiente a una clase
 *
 * @param slug - Slug de la clase (puede tener acentos, estar en mayúsculas, etc.)
 * @returns Componente de icono de lucide-react
 *
 * @example
 * const Icon = getClassIcon('bárbaro');
 * <Icon className="h-6 w-6 text-gold-500" />
 */
export const getClassIcon = (slug: string): React.ComponentType<{ className?: string }> => {
  // Intentar primero con el slug exacto (case-sensitive)
  if (CLASS_ICONS[slug]) {
    return CLASS_ICONS[slug];
  }

  // Normalizar: convertir a lowercase y remover acentos
  const normalized = slug
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Buscar con slug normalizado
  if (CLASS_ICONS[normalized]) {
    return CLASS_ICONS[normalized];
  }

  // Fallback: Shield (escudo genérico)
  return Shield;
};

/**
 * Obtiene el nombre del icono como string (útil para debugging)
 */
export const getClassIconName = (slug: string): string => {
  const Icon = getClassIcon(slug);
  // Simplificado: retorna el nombre del componente directamente
  return Icon.displayName || Icon.name || 'Shield';
};

/**
 * Lista de todas las clases base de D&D 3.5 (PHB)
 */
export const BASE_CLASSES_PHB = [
  'barbaro', 'bardo', 'clerigo', 'druida', 'explorador',
  'guerrero', 'hechicero', 'mago', 'monje', 'paladin', 'picaro',
] as const;

/**
 * Lista de clases psiónicas (Expanded Psionics Handbook)
 */
export const PSIONIC_CLASSES = [
  'psion', 'psychic-warrior', 'wilder', 'soulknife', 'ardent', 'divine-mind', 'erudite', 'psychic-rogue',
] as const;

/**
 * Lista de clases marciales (Tome of Battle)
 */
export const MARTIAL_CLASSES = [
  'crusader', 'swordsage', 'warblade',
] as const;

/**
 * Mantener compatibilidad con código existente
 */
export const BASE_CLASSES = BASE_CLASSES_PHB;

export type BaseClass = typeof BASE_CLASSES[number];
export type PsionicClass = typeof PSIONIC_CLASSES[number];
export type MartialClass = typeof MARTIAL_CLASSES[number];
