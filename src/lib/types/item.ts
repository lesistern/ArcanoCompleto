/**
 * Tipos para objetos de D&D 3.5
 * Incluye equipamiento mundano y objetos mágicos
 */

// ============================================
// CATEGORÍAS Y TIPOS BASE
// ============================================

export type ItemCategory =
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

export type WeaponType =
  | 'Arma simple cuerpo a cuerpo'
  | 'Arma simple a distancia'
  | 'Arma marcial cuerpo a cuerpo'
  | 'Arma marcial a distancia'
  | 'Arma exótica cuerpo a cuerpo'
  | 'Arma exótica a distancia';

export type WeaponSize = 'Diminuta' | 'Pequeña' | 'Mediana' | 'Grande';

export type DamageType = 'Contundente' | 'Perforante' | 'Cortante' | 'Mixto';

export type ArmorType =
  | 'Armadura ligera'
  | 'Armadura media'
  | 'Armadura pesada';

export type ShieldType = 'Escudo ligero' | 'Escudo pesado' | 'Escudo de torre';

export type MagicItemRarity =
  | 'Menor'
  | 'Medio'
  | 'Mayor'
  | 'Artefacto';

// ============================================
// INTERFACES DE DATOS
// ============================================

export interface ItemSource {
  book: string;
  page: number;
}

export interface ItemCost {
  gold?: number; // En piezas de oro
  silver?: number; // En piezas de plata
  copper?: number; // En piezas de cobre
}

export interface WeaponDamage {
  small: string; // Daño para arma pequeña (ej: "1d4")
  medium: string; // Daño para arma mediana (ej: "1d6")
  large?: string; // Daño para arma grande (ej: "1d8")
}

export interface WeaponStats {
  damage: WeaponDamage;
  critical: string; // Ej: "19-20/x2", "x3"
  range?: number; // Alcance en pies (solo armas a distancia)
  damageType: DamageType[];
  weight: number; // En libras
}

export interface ArmorStats {
  armorBonus: number; // Bonificador a CA
  maxDexBonus?: number; // Máximo bonificador de Des
  armorCheckPenalty: number; // Penalizador a pruebas
  arcaneSpellFailure: number; // % de fallo de conjuros arcanos
  speed30: number; // Velocidad si la base es 30
  speed20: number; // Velocidad si la base es 20
  weight: number; // En libras
}

export interface ShieldStats {
  armorBonus: number; // Bonificador a CA
  armorCheckPenalty: number; // Penalizador a pruebas
  arcaneSpellFailure: number; // % de fallo de conjuros arcanos
  weight: number; // En libras
}

export interface MagicItemStats {
  casterLevel: number; // Nivel de lanzador
  aura?: string; // Aura mágica (ej: "Evocación moderada")
  activation?: string; // Método de activación
  charges?: number; // Cargas (si aplica)
}

// ============================================
// INTERFACE PRINCIPAL - ARMA
// ============================================

export interface DnDWeapon {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  // Categoría y tipo
  category: 'Arma';
  weaponType: WeaponType;
  size: WeaponSize;

  // Estadísticas
  stats: WeaponStats;

  // Costo y peso
  cost: ItemCost;

  // Propiedades especiales
  properties?: string[]; // Ej: ["Alcance", "A dos manos", "Arrojadiza"]
  special?: string; // Reglas especiales

  // Mágico
  isMagic?: boolean;
  magicBonus?: number; // +1, +2, etc.
  magicProperties?: string[]; // Propiedades mágicas especiales
  magicStats?: MagicItemStats;

  // Información adicional
  source: ItemSource;
}

// ============================================
// INTERFACE PRINCIPAL - ARMADURA
// ============================================

export interface DnDArmor {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  // Categoría y tipo
  category: 'Armadura';
  armorType: ArmorType;

  // Estadísticas
  stats: ArmorStats;

  // Costo
  cost: ItemCost;

  // Propiedades especiales
  properties?: string[];
  special?: string;

  // Mágico
  isMagic?: boolean;
  magicBonus?: number;
  magicProperties?: string[];
  magicStats?: MagicItemStats;

  // Información adicional
  source: ItemSource;
}

// ============================================
// INTERFACE PRINCIPAL - ESCUDO
// ============================================

export interface DnDShield {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  // Categoría y tipo
  category: 'Escudo';
  shieldType: ShieldType;

  // Estadísticas
  stats: ShieldStats;

  // Costo
  cost: ItemCost;

  // Propiedades especiales
  properties?: string[];
  special?: string;

  // Mágico
  isMagic?: boolean;
  magicBonus?: number;
  magicProperties?: string[];
  magicStats?: MagicItemStats;

  // Información adicional
  source: ItemSource;
}

// ============================================
// INTERFACE PRINCIPAL - EQUIPAMIENTO GENERAL
// ============================================

export interface DnDEquipment {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  // Categoría
  category: 'Equipamiento';
  subcategory?: string; // Ej: "Equipo de aventurero", "Herramientas", "Ropa"

  // Costo y peso
  cost: ItemCost;
  weight?: number; // En libras

  // Propiedades
  properties?: string[];
  special?: string;

  // Información adicional
  source: ItemSource;
}

// ============================================
// INTERFACE PRINCIPAL - OBJETO MÁGICO
// ============================================

export interface DnDMagicItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  // Categoría
  category: 'Objeto Mágico' | 'Poción' | 'Pergamino' | 'Varita' | 'Bastón' | 'Anillo' | 'Vara' | 'Objeto Maravilloso';

  // Rareza y estadísticas mágicas
  rarity: MagicItemRarity;
  stats: MagicItemStats;

  // Costo y peso
  cost: ItemCost;
  weight?: number;

  // Efecto y uso
  effect: string;
  activation?: string;
  duration?: string;

  // Prerrequisitos de creación
  prerequisites?: string[];
  creationCost?: ItemCost;

  // Información adicional
  slot?: string; // Ranura de objeto (ej: "Cuello", "Manos", "Anillo")
  special?: string;
  source: ItemSource;
}

// ============================================
// UNION TYPE - CUALQUIER OBJETO
// ============================================

export type DnDItem =
  | DnDWeapon
  | DnDArmor
  | DnDShield
  | DnDEquipment
  | DnDMagicItem;

// ============================================
// FILTROS
// ============================================

export interface ItemFilter {
  category?: ItemCategory;
  weaponType?: WeaponType;
  armorType?: ArmorType;
  isMagic?: boolean;
  rarity?: MagicItemRarity;
  maxCost?: number;
  minCost?: number;
}
