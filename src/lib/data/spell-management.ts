// ====================================================================
// Spell Management - Types, Interfaces and Helper Functions
// ====================================================================
// Centralized utility file for spell admin page
// Contains: SpellData interface, helper functions, constants

export interface SpellData {
  id: string;
  slug: string;
  name: string;
  school: string;
  subschool?: string;
  descriptors?: string;
  level: string;
  components: string;
  casting_time: string;
  range: string;
  target?: string;
  area?: string;
  effect?: string;
  duration: string;
  saving_throw?: string;
  spell_resistance?: string;
  description: string;
  source_book?: string;
  book_id?: number | null;
  source_page?: number;
  component_verbal?: boolean;
  component_somatic?: boolean;
  component_material?: boolean;
  component_focus?: boolean;
  component_divine_focus?: boolean;
  component_xp?: boolean;
  is_psionic?: boolean;
}

export interface SpellListProps {
  spells: SpellData[];
  selectedSpell: SpellData | null;
  isLoading: boolean;
  searchTerm: string;
  onSelectSpell: (spell: SpellData) => void;
  onEditSpell: (spell: SpellData) => void;
  onSearch: (term: string) => void;
}

export interface SpellEditorProps {
  spell: SpellData;
  isCreating: boolean;
  isEditing: boolean;
  isSyncing: boolean;
  onSpellChange: (spell: SpellData) => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export interface ComponentsCheckboxProps {
  spell: SpellData;
  isEditing: boolean;
  onSpellChange: (spell: SpellData) => void;
}

// ====================================================================
// Helper Functions
// ====================================================================

/**
 * Generate slug from spell name
 * Normalizes text: lowercase, removes special chars, replaces spaces with hyphens
 */
export function generateSpellSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Format spell level for display
 * Input: "Hechicero/Mago 3, Clérigo 3"
 * Output: "3 (Hechicero/Mago, Clérigo)"
 */
export function formatSpellLevel(level: string): string {
  if (!level) return 'Sin nivel';

  // Extract level number and classes
  const parts = level.split(',').map((p) => p.trim());
  const levelNum = parts[0]?.split(' ').pop() || '';
  const classes = parts.map((p) => p.replace(/\s+\d+$/, '')).join(', ');

  return `${levelNum} (${classes})`;
}

/**
 * Get spell school color for display
 * Returns Tailwind color class based on school
 */
export function getSchoolColor(school: string): string {
  const colors: Record<string, string> = {
    'Abjuración': 'text-blue-400',
    'Adivinación': 'text-purple-400',
    'Evocación': 'text-red-400',
    'Ilusión': 'text-pink-400',
    'Encantamiento': 'text-rose-400',
    'Nigromancia': 'text-gray-400',
    'Transmutación': 'text-green-400',
    'Universal': 'text-gold-400',
  };

  return colors[school] || 'text-dungeon-300';
}

/**
 * Extract component abbreviations from spell data
 * Example: "V, S, M (diamond dust)" or just components text field
 */
export function extractComponentAbbreviations(spell: SpellData): string[] {
  const components: string[] = [];

  if (spell.component_verbal) components.push('V');
  if (spell.component_somatic) components.push('S');
  if (spell.component_material) components.push('M');
  if (spell.component_focus) components.push('F');
  if (spell.component_divine_focus) components.push('FD');
  if (spell.component_xp) components.push('XP');

  return components;
}

/**
 * Create spell data object for Supabase INSERT/UPDATE
 * Filters out undefined fields and sets defaults
 */
export function prepareSpellForSave(spell: SpellData): Partial<SpellData> {
  return {
    slug: spell.slug || generateSpellSlug(spell.name),
    name: spell.name,
    school: spell.school || 'Universal',
    subschool: spell.subschool || undefined,
    descriptors: spell.descriptors || undefined,
    level: spell.level,
    components: spell.components,
    casting_time: spell.casting_time,
    range: spell.range,
    target: spell.target || undefined,
    area: spell.area || undefined,
    effect: spell.effect || undefined,
    duration: spell.duration,
    saving_throw: spell.saving_throw || undefined,
    spell_resistance: spell.spell_resistance || undefined,
    description: spell.description,
    source_book: spell.source_book || undefined,
    book_id: spell.book_id || null,
    source_page: spell.source_page || undefined,
    component_verbal: spell.component_verbal || false,
    component_somatic: spell.component_somatic || false,
    component_material: spell.component_material || false,
    component_focus: spell.component_focus || false,
    component_divine_focus: spell.component_divine_focus || false,
    component_xp: spell.component_xp || false,
  };
}

/**
 * Create new empty spell template
 * Used when creating a new spell
 */
export function createNewSpellTemplate(): SpellData {
  return {
    id: 'new',
    slug: '',
    name: '',
    school: 'Universal',
    level: 'Hechicero/Mago 1',
    components: 'V, S',
    casting_time: '1 acción estándar',
    range: 'Cercano (25 pies + 5 pies/2 niveles)',
    duration: 'Instantáneo',
    description: '',
    component_verbal: true,
    component_somatic: true,
  };
}

// ====================================================================
// Validation Functions
// ====================================================================

/**
 * Validate spell data before saving
 * Returns error message if invalid, empty string if valid
 */
export function validateSpell(spell: SpellData): string {
  if (!spell.name || spell.name.trim().length === 0) {
    return 'El nombre es obligatorio';
  }

  if (!spell.school || spell.school.trim().length === 0) {
    return 'La escuela es obligatoria';
  }

  if (!spell.level || spell.level.trim().length === 0) {
    return 'El nivel es obligatorio';
  }

  if (!spell.description || spell.description.trim().length === 0) {
    return 'La descripción es obligatoria';
  }

  return '';
}

// ====================================================================
// Constants
// ====================================================================

export const SPELL_SCHOOLS = [
  'Abjuración',
  'Adivinación',
  'Evocación',
  'Ilusión',
  'Encantamiento',
  'Nigromancia',
  'Transmutación',
  'Universal',
] as const;

export const SPELL_LEVELS = [
  'Hechicero/Mago 0',
  'Hechicero/Mago 1',
  'Hechicero/Mago 2',
  'Hechicero/Mago 3',
  'Hechicero/Mago 4',
  'Hechicero/Mago 5',
  'Hechicero/Mago 6',
  'Hechicero/Mago 7',
  'Hechicero/Mago 8',
  'Hechicero/Mago 9',
  'Clérigo 0',
  'Clérigo 1',
  'Clérigo 2',
  'Clérigo 3',
  'Clérigo 4',
  'Clérigo 5',
  'Clérigo 6',
  'Clérigo 7',
  'Clérigo 8',
  'Clérigo 9',
] as const;

export const CASTING_TIMES = [
  '1 acción estándar',
  '1 acción de movimiento',
  '1 acción libre',
  '1 asalto',
  '1 minuto',
  '10 minutos',
  '1 hora',
] as const;

export const RANGE_TYPES = [
  'Personal',
  'Toque',
  'Cercano (25 pies + 5 pies/2 niveles)',
  'Medio (100 pies + 10 pies/nivel)',
  'Largo (400 pies + 40 pies/nivel)',
  'Ilimitado',
] as const;
