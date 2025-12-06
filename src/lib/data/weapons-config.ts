// ============================================================================
// Weapons Management Configuration
// ============================================================================

export interface WeaponFieldConfig {
  label: string;
  placeholder?: string;
  type: 'text' | 'number' | 'select';
  key: string;
}

export interface WeaponTypeOption {
  value: string;
  label: string;
}

export interface SizeOption {
  value: string;
  label: string;
}

export interface ErrorMessages {
  nameRequired: string;
  loadError: string;
  saveError: string;
  savingStatus: string;
  saveSuccess: string;
}

export interface UIText {
  pageTitle: string;
  totalWeapons: string;
  newWeaponButton: string;
  createTitle: string;
  editTitle: string;
  cancelButton: string;
  saveButton: string;
  editButton: string;
  searchPlaceholder: string;
  loadingMessage: string;
  noType: string;
  noDamage: string;
  savingButton: string;
}

export interface DamageFieldGroup {
  smallLabel: string;
  smallPlaceholder: string;
  mediumLabel: string;
  mediumPlaceholder: string;
  largeLabel: string;
  largePlaceholder: string;
}

export interface StatFieldGroup {
  criticalLabel: string;
  criticalPlaceholder: string;
  rangeLabel: string;
  weightLabel: string;
  costLabel: string;
}

export interface SpecialFieldGroup {
  damageTypesTitle: string;
  damageTypesPlaceholder: string;
  propertiesTitle: string;
  propertiesPlaceholder: string;
  descriptionLabel: string;
}

// ============================================================================
// Weapon Type Options
// ============================================================================

export const WEAPON_TYPES: WeaponTypeOption[] = [
  { value: 'Cuerpo a cuerpo', label: 'Cuerpo a cuerpo' },
  { value: 'A distancia', label: 'A distancia' },
  { value: 'Exótica', label: 'Exótica' }
];

// ============================================================================
// Size Options
// ============================================================================

export const SIZES: SizeOption[] = [
  { value: 'Diminuto', label: 'Diminuto' },
  { value: 'Pequeño', label: 'Pequeño' },
  { value: 'Mediano', label: 'Mediano' },
  { value: 'Grande', label: 'Grande' },
  { value: 'Enorme', label: 'Enorme' }
];

// ============================================================================
// Default Weapon Template
// ============================================================================

export const DEFAULT_WEAPON_TEMPLATE = {
  id: 'new',
  slug: '',
  name: '',
  category: 'Arma',
  weapon_type: 'Cuerpo a cuerpo',
  size: 'Mediano',
  critical: '20/x2',
  damage_type: [],
  properties: []
};

// ============================================================================
// Error Messages
// ============================================================================

export const ERROR_MESSAGES: ErrorMessages = {
  nameRequired: 'El nombre es obligatorio',
  loadError: 'Error al cargar las armas',
  saveError: 'Error al guardar el arma',
  savingStatus: 'Guardando en Supabase...',
  saveSuccess: 'Guardado correctamente'
};

// ============================================================================
// UI Text
// ============================================================================

export const UI_TEXT: UIText = {
  pageTitle: 'Editor de Armas',
  totalWeapons: 'Total',
  newWeaponButton: 'Nueva Arma',
  createTitle: 'Crear Nueva Arma',
  editTitle: 'Editar',
  cancelButton: 'Cancelar',
  saveButton: 'Guardar',
  editButton: 'Editar',
  searchPlaceholder: 'Buscar arma...',
  loadingMessage: 'Cargando...',
  noType: 'Sin tipo',
  noDamage: 'Sin daño',
  savingButton: 'Guardando...'
};

// ============================================================================
// Field Definitions
// ============================================================================

export const DAMAGE_FIELDS: DamageFieldGroup = {
  smallLabel: 'Daño (Pequeño)',
  smallPlaceholder: '1d4',
  mediumLabel: 'Daño (Mediano)',
  mediumPlaceholder: '1d6',
  largeLabel: 'Daño (Grande)',
  largePlaceholder: '1d8'
};

export const STAT_FIELDS: StatFieldGroup = {
  criticalLabel: 'Crítico',
  criticalPlaceholder: '20/x2',
  rangeLabel: 'Alcance (pies)',
  weightLabel: 'Peso (lb)',
  costLabel: 'Coste (oro)'
};

export const SPECIAL_FIELDS: SpecialFieldGroup = {
  damageTypesTitle: 'Tipos de Daño',
  damageTypesPlaceholder: 'Ej: Cortante, Perforante, Contundente...',
  propertiesTitle: 'Propiedades',
  propertiesPlaceholder: 'Ej: Ligera, Versátil, Alcance...',
  descriptionLabel: 'Descripción'
};

// ============================================================================
// Base Field Configurations
// ============================================================================

export const BASIC_FIELDS: WeaponFieldConfig[] = [
  {
    label: 'Nombre',
    type: 'text',
    key: 'name'
  },
  {
    label: 'Tipo de Arma',
    type: 'select',
    key: 'weapon_type'
  },
  {
    label: 'Tamaño',
    type: 'select',
    key: 'size'
  }
];
