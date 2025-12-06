// ============================================================================
// Scrolls Management Configuration
// ============================================================================

export interface ScrollFieldConfig {
  label: string;
  placeholder?: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  key: string;
}

export interface ScrollTypeOption {
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

export interface SpellFieldGroup {
  spellNameLabel: string;
  spellNamePlaceholder: string;
  spellLevelLabel: string;
  casterLevelLabel: string;
  priceLabel: string;
}

export interface SourceFieldGroup {
  descriptionLabel: string;
  sourceBookLabel: string;
  sourcePageLabel: string;
}

// ============================================================================
// Scroll Type Options
// ============================================================================

export const SCROLL_TYPES: ScrollTypeOption[] = [
  { value: 'Arcano', label: 'Arcano' },
  { value: 'Divino', label: 'Divino' }
];

// ============================================================================
// Default Scroll Template
// ============================================================================

export const DEFAULT_SCROLL_TEMPLATE = {
  id: 'new',
  slug: '',
  name: '',
  scroll_type: 'Arcano',
  spell_name: '',
  spell_level: 1,
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
  loadError: 'Error al cargar los pergaminos',
  nameRequired: 'El nombre es obligatorio',
  saveError: 'Error al guardar el pergamino',
  savingStatus: 'Guardando en Supabase...',
  saveSuccess: 'Guardado correctamente'
};

// ============================================================================
// UI Text
// ============================================================================

export const UI_TEXT: UIText = {
  pageTitle: 'Editor de Pergaminos',
  totalItems: 'Total',
  newItemButton: 'Nuevo Pergamino',
  createTitle: 'Crear Nuevo Pergamino',
  editTitle: 'Editar',
  cancelButton: 'Cancelar',
  saveButton: 'Guardar',
  editButton: 'Editar',
  searchPlaceholder: 'Buscar pergamino...',
  loadingMessage: 'Cargando...',
  savingButton: 'Guardando...',
  noType: 'Sin tipo'
};

// ============================================================================
// Field Definitions - Basic
// ============================================================================

export const BASIC_FIELDS: BasicFieldGroup = {
  nameLabel: 'Nombre',
  typeLabel: 'Tipo de Pergamino'
};

// ============================================================================
// Field Definitions - Spell
// ============================================================================

export const SPELL_FIELDS: SpellFieldGroup = {
  spellNameLabel: 'Nombre del Conjuro',
  spellNamePlaceholder: 'Ej: Bola de fuego',
  spellLevelLabel: 'Nivel del Conjuro',
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

export const BASIC_FIELD_CONFIGS: ScrollFieldConfig[] = [
  {
    label: 'Nombre',
    type: 'text',
    key: 'name'
  },
  {
    label: 'Tipo de Pergamino',
    type: 'select',
    key: 'scroll_type'
  }
];
