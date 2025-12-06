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
} from 'lucide-react';

/**
 * Mapeo de iconos por clase
 * Incluye todas las variantes posibles: con/sin acentos, español/inglés
 */
export const CLASS_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
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

  // Mapeo inverso para obtener el nombre
  const iconNames: Record<string, string> = {
    [Axe.name]: 'Axe',
    [Music.name]: 'Music',
    [Cross.name]: 'Cross',
    [Leaf.name]: 'Leaf',
    [Swords.name]: 'Swords',
    [Hand.name]: 'Hand',
    [Shield.name]: 'Shield',
    [Target.name]: 'Target',
    [Eye.name]: 'Eye',
    [Sparkles.name]: 'Sparkles',
    [Wand2.name]: 'Wand2',
  };

  return iconNames[Icon.name] || 'Shield';
};

/**
 * Lista de todas las clases base de D&D 3.5
 * (útil para testing o renderizado de listas completas)
 */
export const BASE_CLASSES = [
  'barbaro',
  'bardo',
  'clerigo',
  'druida',
  'explorador',
  'guerrero',
  'hechicero',
  'mago',
  'monje',
  'paladin',
  'picaro',
] as const;

export type BaseClass = typeof BASE_CLASSES[number];
