/**
 * Tipos para las habilidades de D&D 3.5
 */

export type AbilityScore = 'Fuerza' | 'Destreza' | 'Constitución' | 'Inteligencia' | 'Sabiduría' | 'Carisma';

export type SkillCategory =
  | 'Física'
  | 'Mental'
  | 'Social'
  | 'Conocimiento'
  | 'Oficio'
  | 'Profesión'
  | 'Interpretación';

export interface SkillSynergy {
  skill: string; // Nombre de la habilidad que otorga sinergia
  bonus: number; // Bonificador otorgado (usualmente +2)
  condition?: string; // Condición para obtener la sinergia
}

export interface SkillUse {
  action: string; // Tipo de acción requerida
  description: string;
  dc?: string; // CD típica si aplica
  retry?: boolean; // Si se puede reintentar
  specialConditions?: string;
}

export interface DnDSkill {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  // Características de la habilidad
  keyAbility: AbilityScore;
  category: SkillCategory;
  trainedOnly: boolean; // Si requiere entrenamiento para usar
  armorCheckPenalty: boolean; // Si aplica penalización por armadura

  // Usos de la habilidad
  uses: SkillUse[];

  // Reglas especiales
  check: string; // Cómo hacer la tirada
  action: string; // Qué tipo de acción requiere
  retry: boolean; // Si se puede reintentar en general
  retryDetails?: string; // Detalles sobre reintentos
  special?: string[]; // Reglas especiales

  // Sinergia
  synergies?: SkillSynergy[]; // Sinergias que OTORGA esta habilidad
  benefitsFrom?: SkillSynergy[]; // Sinergias que RECIBE esta habilidad

  // Clases que la tienen como habilidad de clase
  classSkillFor: string[];

  // Untrained (qué se puede hacer sin entrenamiento)
  untrainedUse?: string;

  // Información adicional
  source: {
    book: string;
    page: number;
  };
}

export interface SkillFilter {
  keyAbility?: AbilityScore;
  category?: SkillCategory;
  trainedOnly?: boolean;
  armorCheckPenalty?: boolean;
  classSkill?: string; // Filtrar por clase
}
