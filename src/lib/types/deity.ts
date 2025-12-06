/**
 * Tipos TypeScript para el Módulo de Deidades
 * Define interfaces para deidades, dominios y relaciones
 *
 * Sincronizado con schema SQL en: supabase/fase1-deities-schema-migration.sql
 */

/**
 * Interfaz principal para una deidad D&D 3.5
 */
export interface Deity {
  // Identificadores
  id: bigint;
  slug: string;
  name: string;
  title?: string;

  // Alineamiento (9 opciones D&D)
  alignment_code: 'LG' | 'NG' | 'CG' | 'LN' | 'TN' | 'CN' | 'LE' | 'NE' | 'CE';
  alignment_text: string;

  // Información principal
  portfolio?: string; // Áreas de influencia: "Sun, Healing, Strength"
  description_short?: string; // Descripción breve
  description_full?: string; // Texto SRD completo (fluff)

  // Culto y clero
  worshipers_text?: string; // Quién adora a esta deidad
  clergy_text?: string; // Cómo es el clero, vestimentas, jerarquía
  temples_text?: string; // Dónde y cómo son los templos
  dogma_text?: string; // Enseñanzas centrales
  avatar_manifestations_text?: string; // Cómo se manifiesta

  // Símbolos y celebraciones
  favored_weapon_name?: string; // Nombre del arma predilecta
  favored_weapon_details?: string; // Descripción del arma
  holy_symbol_text?: string; // Descripción del símbolo sagrado
  holy_days_text?: string; // Fiestas y días sagrados

  // Clasificación de deidades
  is_major_deity: boolean; // ¿Es deidad mayor (mayor poder)?
  is_minor_deity: boolean; // ¿Es deidad menor?
  is_demigod: boolean; // ¿Es semidios?
  is_philosophy: boolean; // ¿Es filosofía (sin entidad personal)?

  // Relaciones y contexto
  pantheon_name?: string; // 'Core D&D', 'Greyhawk', 'Forgotten Realms', etc.
  home_plane_id?: bigint; // ID del plano natal (relación a tabla planes)
  home_plane_name?: string; // Nombre del plano (computed en queries)

  // Dominios de clérigo (relación con deity_domains)
  domains?: DeityDomain[]; // Array de dominios asociados

  // Categorización y búsqueda
  tags: string[]; // Array de tags: ['sun','healing','war','nature','death']

  // Metadata flexible
  meta: Record<string, any>; // JSONB para datos arbitrarios

  // Timestamps
  created_at: string;
  updated_at: string;
}

/**
 * Interfaz para la relación entre deidad y dominio de clérigo
 * Tabla: public.deity_domains (muchos-a-muchos)
 */
export interface DeityDomain {
  id: bigint;
  deity_id: bigint;
  domain_slug: string; // p.ej. 'air', 'animal', 'evil', 'good'
  domain_name: string; // p.ej. 'Air Domain', 'Animal Domain'
  created_at: string;
}

/**
 * Tipo para crear una nueva deidad
 * Todas las propiedades opcionales excepto id (generado por BD)
 */
export type CreateDeityInput = Omit<Deity, 'id' | 'created_at' | 'updated_at'>;

/**
 * Tipo para actualizar una deidad existente
 * Todas las propiedades son opcionales
 */
export type UpdateDeityInput = Partial<Omit<Deity, 'id' | 'created_at' | 'updated_at'>>;

/**
 * Clasificación de deidades
 */
export type DeityType = 'major' | 'minor' | 'demigod' | 'philosophy';

/**
 * Alineamientos D&D (9 combinaciones)
 */
export type AlignmentCode = 'LG' | 'NG' | 'CG' | 'LN' | 'TN' | 'CN' | 'LE' | 'NE' | 'CE';

/**
 * Nombres de panteones conocidos
 */
export type PantheonName =
  | 'Core D&D'
  | 'Greyhawk'
  | 'Forgotten Realms'
  | 'Eberron'
  | 'Dragonlance'
  | 'Planescape'
  | 'Ravenloft'
  | 'Birthright'
  | string; // Permite panteones personalizados

/**
 * Tags comunes para deidades
 * Ayuda a categorizar y hacer búsquedas
 */
export const DEITY_TAGS = {
  domains: ['sun', 'healing', 'war', 'nature', 'death', 'trickery', 'magic', 'travel', 'knowledge', 'tempest'] as const,
  alignment: ['good', 'evil', 'law', 'chaos', 'neutral'] as const,
  domains_extended: [
    'air', 'animal', 'chaos', 'cold', 'craft', 'darkness', 'death', 'deception',
    'divine', 'dwarves', 'earth', 'elves', 'evil', 'fire', 'gnomes', 'good', 'gravity',
    'halflings', 'healing', 'heroism', 'hunting', 'knowledge', 'law', 'luck', 'magic',
    'metals', 'moonlight', 'mountain', 'nature', 'night', 'nobility', 'ocean', 'protection',
    'repose', 'rune', 'secret', 'shadow', 'sky', 'spell', 'stone', 'strength', 'suffering',
    'sun', 'tempest', 'time', 'trade', 'travel', 'tricks', 'twilight', 'undeath', 'war',
    'water', 'wealth', 'weather', 'wine', 'winter', 'wizard'
  ] as const
} as const;

/**
 * Validador de deidad
 * Verifica que los campos requeridos estén presentes
 */
export function isValidDeity(deity: unknown): deity is Deity {
  if (typeof deity !== 'object' || deity === null) return false;

  const d = deity as any;

  return (
    typeof d.id === 'bigint' &&
    typeof d.slug === 'string' &&
    typeof d.name === 'string' &&
    typeof d.alignment_code === 'string' &&
    ['LG', 'NG', 'CG', 'LN', 'TN', 'CN', 'LE', 'NE', 'CE'].includes(d.alignment_code) &&
    Array.isArray(d.tags) &&
    typeof d.meta === 'object' &&
    typeof d.created_at === 'string' &&
    typeof d.updated_at === 'string'
  );
}

/**
 * Obtiene el tipo de deidad basado en las banderas
 */
export function getDeityType(deity: Deity): DeityType {
  if (deity.is_major_deity) return 'major';
  if (deity.is_minor_deity) return 'minor';
  if (deity.is_demigod) return 'demigod';
  if (deity.is_philosophy) return 'philosophy';
  return 'minor'; // Por defecto
}

/**
 * Obtiene una descripción legible del tipo de deidad
 */
export function getDeityTypeLabel(type: DeityType | null | undefined): string {
  switch (type) {
    case 'major':
      return 'Deidad Mayor';
    case 'minor':
      return 'Deidad Menor';
    case 'demigod':
      return 'Semidios';
    case 'philosophy':
      return 'Filosofía';
    default:
      return 'Deidad';
  }
}

/**
 * Enum para facilitar acceso a tipos de deidades
 */
export enum DeityTypeEnum {
  Major = 'major',
  Minor = 'minor',
  Demigod = 'demigod',
  Philosophy = 'philosophy'
}

/**
 * Estructura para respuesta de API con deidad + dominios
 */
export interface DeityWithDomains extends Deity {
  domains: DeityDomain[];
}

/**
 * Estructura para búsqueda/filtrado
 */
export interface DeityFilterOptions {
  pantheon?: string;
  alignment?: AlignmentCode;
  type?: DeityType;
  tags?: string[];
  search?: string;
  includePhilosophies?: boolean;
}

/**
 * Constantes de validación
 */
export const DEITY_VALIDATION = {
  minNameLength: 2,
  maxNameLength: 100,
  minPortfolioLength: 3,
  maxPortfolioLength: 200,
  minDescriptionLength: 10,
  maxDescriptionLength: 5000,
  maxTags: 10,
  maxDomains: 5
} as const;
