// ============================================================================
// Magical Items Management Configuration
// ============================================================================

export interface MagicItemFieldConfig {
  label: string;
  placeholder?: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  key: string;
}

export interface MagicItemTypeOption {
  value: string;
  label: string;
}

export interface ErrorMessages {
  loadError: string;
  nameRequired: string;
  saveError: string;
  savingStatus: string;
  saveSuccess: string;
}

export interface UIText {
  pageTitle: string;
  totalItems: string;
  newItemButton: string;
  createTitle: string;
  editTitle: string;
  cancelButton: string;
  saveButton: string;
  editButton: string;
  searchPlaceholder: string;
  loadingMessage: string;
  savingButton: string;
  noType: string;
}

export interface BasicFieldGroup {
  nameLabel: string;
  typeLabel: string;
  slotLabel: string;
  slotPlaceholder: string;
}

export interface StatsFieldGroup {
  casterLevelLabel: string;
  auraLabel: string;
  auraPlaceholder: string;
  priceLabel: string;
  weightLabel: string;
}

export interface DescriptionFieldGroup {
  descriptionLabel: string;
  constructionReqLabel: string;
  constructionCostLabel: string;
}

// ============================================================================
// Magic Item Type Options
// ============================================================================

export const MAGIC_ITEM_TYPES: MagicItemTypeOption[] = [
  { value: 'Objeto Maravilloso', label: 'Objeto Maravilloso' },
  { value: 'Anillo', label: 'Anillo' },
  { value: 'Varita', label: 'Varita' },
  { value: 'Bastón', label: 'Bastón' },
  { value: 'Vara', label: 'Vara' },
  { value: 'Arma Mágica', label: 'Arma Mágica' },
  { value: 'Armadura Mágica', label: 'Armadura Mágica' }
];

// ============================================================================
// Default Magic Item Template
// ============================================================================

export const DEFAULT_MAGIC_ITEM_TEMPLATE = {
  id: 'new',
  slug: '',
  name: '',
  item_type: 'Objeto Maravilloso',
  caster_level: 1
};

// ============================================================================
// Error Messages
// ============================================================================

export const ERROR_MESSAGES: ErrorMessages = {
  loadError: 'Error al cargar los objetos mágicos',
  nameRequired: 'El nombre es obligatorio',
  saveError: 'Error al guardar el objeto mágico',
  savingStatus: 'Guardando en Supabase...',
  saveSuccess: 'Guardado correctamente'
};

// ============================================================================
// UI Text
// ============================================================================

export const UI_TEXT: UIText = {
  pageTitle: 'Editor de Objetos Mágicos',
  totalItems: 'Total',
  newItemButton: 'Nuevo Objeto Mágico',
  createTitle: 'Crear Nuevo Objeto Mágico',
  editTitle: 'Editar',
  cancelButton: 'Cancelar',
  saveButton: 'Guardar',
  editButton: 'Editar',
  searchPlaceholder: 'Buscar objeto mágico...',
  loadingMessage: 'Cargando...',
  savingButton: 'Guardando...',
  noType: 'Sin tipo'
};

// ============================================================================
// Field Definitions - Basic
// ============================================================================

export const BASIC_FIELDS: BasicFieldGroup = {
  nameLabel: 'Nombre',
  typeLabel: 'Tipo de Objeto',
  slotLabel: 'Ranura',
  slotPlaceholder: 'Ej: Manos, Cabeza, Cuello...'
};

// ============================================================================
// Field Definitions - Stats
// ============================================================================

export const STATS_FIELDS: StatsFieldGroup = {
  casterLevelLabel: 'Nivel de Lanzador',
  auraLabel: 'Aura',
  auraPlaceholder: 'Ej: Moderada evocación',
  priceLabel: 'Precio (oro)',
  weightLabel: 'Peso (lb)'
};

// ============================================================================
// Field Definitions - Description
// ============================================================================

export const DESCRIPTION_FIELDS: DescriptionFieldGroup = {
  descriptionLabel: 'Descripción',
  constructionReqLabel: 'Requisitos de Construcción',
  constructionCostLabel: 'Coste de Construcción (oro)'
};

// ============================================================================
// Base Field Configurations
// ============================================================================

export const BASIC_FIELD_CONFIGS: MagicItemFieldConfig[] = [
  {
    label: 'Nombre',
    type: 'text',
    key: 'name'
  },
  {
    label: 'Tipo de Objeto',
    type: 'select',
    key: 'item_type'
  }
];
