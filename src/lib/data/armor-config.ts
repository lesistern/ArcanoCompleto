// ============================================================================
// Armor Management Configuration
// ============================================================================

export interface ArmorFieldConfig {
  label: string;
  placeholder?: string;
  type: 'text' | 'number' | 'select';
  key: string;
}

export interface ArmorTypeOption {
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
  totalArmor: string;
  newArmorButton: string;
  createTitle: string;
  editTitle: string;
  cancelButton: string;
  saveButton: string;
  editButton: string;
  searchPlaceholder: string;
  loadingMessage: string;
  noType: string;
  savingButton: string;
}

export interface ArmorStatsFieldGroup {
  armorBonusLabel: string;
  maxDexBonusLabel: string;
  penaltyLabel: string;
  arcaneFailureLabel: string;
  speed30Label: string;
  speed20Label: string;
}

export interface ArmorCostFieldGroup {
  weightLabel: string;
  costGoldLabel: string;
  costSilverLabel: string;
}

export interface ArmorDescFieldGroup {
  descriptionLabel: string;
  specialPropertiesLabel: string;
}

// ============================================================================
// Armor Type Options
// ============================================================================

export const ARMOR_TYPES: ArmorTypeOption[] = [
  { value: 'Ligera', label: 'Ligera' },
  { value: 'Media', label: 'Media' },
  { value: 'Pesada', label: 'Pesada' },
  { value: 'Escudo', label: 'Escudo' }
];

// ============================================================================
// Default Armor Template
// ============================================================================

export const DEFAULT_ARMOR_TEMPLATE = {
  id: 'new',
  slug: '',
  name: '',
  armor_type: 'Ligera',
  armor_bonus: 0,
  max_dex_bonus: 0,
  armor_check_penalty: 0,
  arcane_spell_failure: 0
};

// ============================================================================
// Error Messages
// ============================================================================

export const ERROR_MESSAGES: ErrorMessages = {
  loadError: 'Error al cargar las armaduras',
  nameRequired: 'El nombre es obligatorio',
  saveError: 'Error al guardar la armadura',
  savingStatus: 'Guardando en Supabase...',
  saveSuccess: 'Guardado correctamente'
};

// ============================================================================
// UI Text
// ============================================================================

export const UI_TEXT: UIText = {
  pageTitle: 'Editor de Armaduras',
  totalArmor: 'Total',
  newArmorButton: 'Nueva Armadura',
  createTitle: 'Crear Nueva Armadura',
  editTitle: 'Editar',
  cancelButton: 'Cancelar',
  saveButton: 'Guardar',
  editButton: 'Editar',
  searchPlaceholder: 'Buscar armadura...',
  loadingMessage: 'Cargando...',
  noType: 'Sin tipo',
  savingButton: 'Guardando...'
};

// ============================================================================
// Field Definitions - Stats
// ============================================================================

export const ARMOR_STATS_FIELDS: ArmorStatsFieldGroup = {
  armorBonusLabel: 'Bonus de Armadura',
  maxDexBonusLabel: 'Bonus DES Máx',
  penaltyLabel: 'Penalización',
  arcaneFailureLabel: 'Fallo Arcano %',
  speed30Label: 'Velocidad 30',
  speed20Label: 'Velocidad 20'
};

// ============================================================================
// Field Definitions - Cost & Weight
// ============================================================================

export const ARMOR_COST_FIELDS: ArmorCostFieldGroup = {
  weightLabel: 'Peso (lb)',
  costGoldLabel: 'Coste (oro)',
  costSilverLabel: 'Coste (plata)'
};

// ============================================================================
// Field Definitions - Description
// ============================================================================

export const ARMOR_DESC_FIELDS: ArmorDescFieldGroup = {
  descriptionLabel: 'Descripción',
  specialPropertiesLabel: 'Propiedades Especiales'
};

// ============================================================================
// Base Field Configurations
// ============================================================================

export const BASIC_FIELDS: ArmorFieldConfig[] = [
  {
    label: 'Nombre',
    type: 'text',
    key: 'name'
  },
  {
    label: 'Tipo de Armadura',
    type: 'select',
    key: 'armor_type'
  }
];
