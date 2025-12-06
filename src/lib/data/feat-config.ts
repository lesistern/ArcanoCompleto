// ============================================================================
// Feats Management Configuration
// ============================================================================

export interface FeatFieldConfig {
  label: string;
  placeholder?: string;
  type: 'text' | 'number' | 'select';
  key: string;
}

export interface FeatCategoryOption {
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
  totalFeats: string;
  newFeatButton: string;
  createTitle: string;
  editTitle: string;
  cancelButton: string;
  saveButton: string;
  editButton: string;
  searchPlaceholder: string;
  loadingMessage: string;
  savingButton: string;
}

export interface FeatBasicFieldGroup {
  nameLabel: string;
  categoryLabel: string;
}

export interface FeatFlagsFieldGroup {
  metamagicLabel: string;
  itemCreationLabel: string;
  multipleLabel: string;
}

export interface FeatPrerequisiteFieldGroup {
  textLabel: string;
  featsLabel: string;
  featsPlaceholder: string;
  babLabel: string;
}

export interface FeatDescriptionFieldGroup {
  benefitLabel: string;
  normalLabel: string;
  specialLabel: string;
}

export interface FeatSourceFieldGroup {
  bookLabel: string;
  pageLabel: string;
}

// ============================================================================
// Feat Category Options
// ============================================================================

export const FEAT_CATEGORIES: FeatCategoryOption[] = [
  { value: 'General', label: 'General' },
  { value: 'Combat', label: 'Combate' },
  { value: 'Item Creation', label: 'Creación de Objetos' },
  { value: 'Metamagic', label: 'Metamagia' },
  { value: 'Racial', label: 'Racial' },
  { value: 'Regional', label: 'Regional' },
  { value: 'Divine', label: 'Divino' },
  { value: 'Wild', label: 'Salvaje' }
];

// ============================================================================
// Default Feat Template
// ============================================================================

export const DEFAULT_FEAT_TEMPLATE = {
  id: 'new',
  slug: '',
  name: '',
  category: 'General',
  benefit: '',
  prerequisites_legacy: '',
  is_metamagic: false,
  is_item_creation: false,
  can_take_multiple: false,
  prerequisite_feats: []
};

// ============================================================================
// Error Messages
// ============================================================================

export const ERROR_MESSAGES: ErrorMessages = {
  loadError: 'Error al cargar las dotes',
  nameRequired: 'El nombre es obligatorio',
  saveError: 'Error al guardar la dote',
  savingStatus: 'Guardando en Supabase...',
  saveSuccess: 'Guardado correctamente'
};

// ============================================================================
// UI Text
// ============================================================================

export const UI_TEXT: UIText = {
  pageTitle: 'Editor de Dotes',
  totalFeats: 'Total',
  newFeatButton: 'Nueva Dote',
  createTitle: 'Crear Nueva Dote',
  editTitle: 'Editar',
  cancelButton: 'Cancelar',
  saveButton: 'Guardar',
  editButton: 'Editar',
  searchPlaceholder: 'Buscar dote...',
  loadingMessage: 'Cargando dotes...',
  savingButton: 'Guardando...'
};

// ============================================================================
// Field Definitions - Basic
// ============================================================================

export const FEAT_BASIC_FIELDS: FeatBasicFieldGroup = {
  nameLabel: 'Nombre',
  categoryLabel: 'Categoría'
};

// ============================================================================
// Field Definitions - Flags
// ============================================================================

export const FEAT_FLAGS_FIELDS: FeatFlagsFieldGroup = {
  metamagicLabel: 'Es Metamagia',
  itemCreationLabel: 'Es Creación de Objetos',
  multipleLabel: 'Se puede tomar múltiples veces'
};

// ============================================================================
// Field Definitions - Prerequisites
// ============================================================================

export const FEAT_PREREQUISITE_FIELDS: FeatPrerequisiteFieldGroup = {
  textLabel: 'Prerrequisitos (Texto)',
  featsLabel: 'Dotes Prerrequisito',
  featsPlaceholder: 'Ej: Ataque Poderoso...',
  babLabel: 'BAB Requerido'
};

// ============================================================================
// Field Definitions - Descriptions
// ============================================================================

export const FEAT_DESCRIPTION_FIELDS: FeatDescriptionFieldGroup = {
  benefitLabel: 'Beneficio',
  normalLabel: 'Normal (Sin la dote)',
  specialLabel: 'Especial'
};

// ============================================================================
// Field Definitions - Source
// ============================================================================

export const FEAT_SOURCE_FIELDS: FeatSourceFieldGroup = {
  bookLabel: 'Libro Fuente',
  pageLabel: 'Página'
};

// ============================================================================
// Base Field Configurations
// ============================================================================

export const BASIC_FIELDS: FeatFieldConfig[] = [
  {
    label: 'Nombre',
    type: 'text',
    key: 'name'
  },
  {
    label: 'Categoría',
    type: 'select',
    key: 'category'
  }
];
