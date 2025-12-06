/**
 * Tipos para el editor de habilidades admin
 * Soporta múltiples nombres de columna para flexibilidad de BD
 */

import { DnDSkill, SkillCategory, AbilityScore, SkillSynergy, SkillUse } from '@/lib/types/skill';

export interface SkillData extends Partial<DnDSkill> {
  id: string;
  slug: string;
  name?: string;
  // Allow any other fields from database
  [key: string]: any;
}

/**
 * Obtener el nombre de la habilidad desde múltiples posibles columnas
 */
export function getSkillName(skillData: SkillData): string {
  return (
    skillData.name ||
    skillData.slug ||
    'Unknown'
  );
}

/**
 * Obtener la categoría de la habilidad
 */
export function getSkillCategory(skillData: SkillData): SkillCategory | undefined {
  return skillData.category;
}

/**
 * Obtener la habilidad clave (ability) de la habilidad
 */
export function getSkillAbility(skillData: SkillData): AbilityScore | undefined {
  return skillData.keyAbility;
}
