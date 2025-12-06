// ============================================================================
// Equipment Management Configuration
// ============================================================================

export interface EquipmentFieldConfig {
  label: string;
  placeholder?: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  key: string;
}

export interface EquipmentTypeOption {
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

export interface CostFieldGroup {
  weightLabel: string;
  costGoldLabel: string;
  costSilverLabel: string;
  costCopperLabel: string;
}

export interface SourceFieldGroup {
  descriptionLabel: string;
  sourceBookLabel: string;
  sourcePageLabel: string;
}

// ============================================================================
// Equipment Type Options
// ============================================================================

export const EQUIPMENT_TYPES: EquipmentTypeOption[] = [
  { value: 'Herramienta', label: 'Herramienta' },
  { value: 'Kit de Aventurero', label: 'Kit de Aventurero' },
  { value: 'Montura', label: 'Montura' },
  { value: 'Vehículo', label: 'Vehículo' },
  { value: 'Contenedor', label: 'Contenedor' },
  { value: 'Ropa', label: 'Ropa' },
  { value: 'Comida y Bebida', label: 'Comida y Bebida' },
  { value: 'Alojamiento', label: 'Alojamiento' },
  { value: 'Servicio', label: 'Servicio' },
  { value: 'Otro', label: 'Otro' }
];

// ============================================================================
// Default Equipment Template
// ============================================================================

export const DEFAULT_EQUIPMENT_TEMPLATE = {
  id: 'new',
  slug: '',
  name: '',
  equipment_type: 'Herramienta'
};

// ============================================================================
// Error Messages
// ============================================================================

export const ERROR_MESSAGES: ErrorMessages = {
  loadError: 'Error al cargar el equipo',
  nameRequired: 'El nombre es obligatorio',
  saveError: 'Error al guardar el equipo',
  savingStatus: 'Guardando en Supabase...',
  saveSuccess: 'Guardado correctamente'
};

// ============================================================================
// UI Text
// ============================================================================

export const UI_TEXT: UIText = {
  pageTitle: 'Editor de Equipo General',
  totalItems: 'Total',
  newItemButton: 'Nuevo Equipo',
  createTitle: 'Crear Nuevo Equipo',
  editTitle: 'Editar',
  cancelButton: 'Cancelar',
  saveButton: 'Guardar',
  editButton: 'Editar',
  searchPlaceholder: 'Buscar equipo...',
  loadingMessage: 'Cargando...',
  savingButton: 'Guardando...',
  noType: 'Sin tipo'
};

// ============================================================================
// Field Definitions - Basic
// ============================================================================

export const BASIC_FIELDS: BasicFieldGroup = {
  nameLabel: 'Nombre',
  typeLabel: 'Tipo de Equipo'
};

// ============================================================================
// Field Definitions - Cost and Weight
// ============================================================================

export const COST_FIELDS: CostFieldGroup = {
  weightLabel: 'Peso (lb)',
  costGoldLabel: 'Coste (oro)',
  costSilverLabel: 'Coste (plata)',
  costCopperLabel: 'Coste (cobre)'
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

export const BASIC_FIELD_CONFIGS: EquipmentFieldConfig[] = [
  {
    label: 'Nombre',
    type: 'text',
    key: 'name'
  },
  {
    label: 'Tipo de Equipo',
    type: 'select',
    key: 'equipment_type'
  }
];
