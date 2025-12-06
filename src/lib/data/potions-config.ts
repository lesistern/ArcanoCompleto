// ============================================================================
// Potions Management Configuration
// ============================================================================

export interface PotionFieldConfig {
  label: string;
  placeholder?: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  key: string;
}

export interface PotionTypeOption {
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
}

export interface EffectFieldGroup {
  spellEffectLabel: string;
  spellEffectPlaceholder: string;
  casterLevelLabel: string;
  priceLabel: string;
}

export interface SourceFieldGroup {
  descriptionLabel: string;
  sourceBookLabel: string;
  sourcePageLabel: string;
}

// ============================================================================
// Potion Type Options
// ============================================================================

export const POTION_TYPES: PotionTypeOption[] = [
  { value: 'Poción', label: 'Poción' },
  { value: 'Elixir', label: 'Elixir' },
  { value: 'Aceite', label: 'Aceite' }
];

// ============================================================================
// Default Potion Template
// ============================================================================

export const DEFAULT_POTION_TEMPLATE = {
  id: 'new',
  slug: '',
  name: '',
  potion_type: 'Poción',
  spell_effect: '',
  caster_level: 1,
  price_gold: 0,
  description: '',
  source_book: '',
  source_page: 0
};

// ============================================================================
// Error Messages
// ============================================================================

export const ERROR_MESSAGES: ErrorMessages = {
  loadError: 'Error al cargar las pociones',
  nameRequired: 'El nombre es obligatorio',
  saveError: 'Error al guardar la poción',
  savingStatus: 'Guardando en Supabase...',
  saveSuccess: 'Guardado correctamente'
};

// ============================================================================
// UI Text
// ============================================================================

export const UI_TEXT: UIText = {
  pageTitle: 'Editor de Pociones',
  totalItems: 'Total',
  newItemButton: 'Nueva Poción',
  createTitle: 'Crear Nueva Poción',
  editTitle: 'Editar',
  cancelButton: 'Cancelar',
  saveButton: 'Guardar',
  editButton: 'Editar',
  searchPlaceholder: 'Buscar poción...',
  loadingMessage: 'Cargando...',
  savingButton: 'Guardando...',
  noType: 'Sin tipo'
};

// ============================================================================
// Field Definitions - Basic
// ============================================================================

export const BASIC_FIELDS: BasicFieldGroup = {
  nameLabel: 'Nombre',
  typeLabel: 'Tipo de Poción'
};

// ============================================================================
// Field Definitions - Effect
// ============================================================================

export const EFFECT_FIELDS: EffectFieldGroup = {
  spellEffectLabel: 'Efecto de Conjuro',
  spellEffectPlaceholder: 'Ej: Curar heridas leves',
  casterLevelLabel: 'Nivel de Lanzador',
  priceLabel: 'Precio (oro)'
};

// ============================================================================
// Field Definitions - Source
// ============================================================================

export const SOURCE_FIELDS: SourceFieldGroup = {
  descriptionLabel: 'Descripción',
  sourceBookLabel: 'Libro Fuente',
  sourcePageLabel: 'Página'
};

// ============================================================================
// Base Field Configurations
// ============================================================================

export const BASIC_FIELD_CONFIGS: PotionFieldConfig[] = [
  {
    label: 'Nombre',
    type: 'text',
    key: 'name'
  },
  {
    label: 'Tipo de Poción',
    type: 'select',
    key: 'potion_type'
  }
];
