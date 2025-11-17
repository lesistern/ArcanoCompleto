/**
 * Servicio de Clases para Client Components
 *
 * Proporciona funciones para obtener información de clases
 * Optimizado para uso en Client Components de Next.js
 */

import { createClient } from '@/lib/supabase/client';

export interface CharacterClass {
  slug: string;
  name: string;
  hitDie: number;
  skillPoints: number;
  baseAttackBonus: 'good' | 'average' | 'poor';
  fortitudeSave: 'good' | 'poor';
  reflexSave: 'good' | 'poor';
  willSave: 'good' | 'poor';
  classSkills: string[];
  weaponProficiencies: string;
  armorProficiencies: string;
  description: string;
}

/**
 * Obtiene todas las clases base disponibles
 */
export async function getAvailableClasses(): Promise<CharacterClass[]> {
  const supabase = createClient();

  const { data: classes, error } = await supabase
    .from('classes')
    .select('*')
    .eq('class_type', 'base')
    .order('name');

  if (error) {
    console.error('Error fetching classes:', error);
    return [];
  }

  // DEBUG: Log para verificar datos de la BD
  if (classes && classes.length > 0) {
    console.log('🔍 DEBUG - Primera clase desde BD:', {
      name: classes[0].name,
      fort_save: classes[0].fort_save_progression,
      ref_save: classes[0].ref_save_progression,
      will_save: classes[0].will_save_progression,
      weapon_prof: classes[0].weapon_proficiencies,
      armor_prof: classes[0].armor_proficiencies
    });
  }

  // Función auxiliar para capitalizar primera letra
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (classes || []).map((cls) => ({
    slug: cls.slug,
    name: cls.name,
    hitDie: cls.hit_die,
    skillPoints: cls.skill_points_per_level,
    baseAttackBonus: cls.base_attack_bonus_progression,
    fortitudeSave: cls.fort_save_progression?.toLowerCase(),
    reflexSave: cls.ref_save_progression?.toLowerCase(),
    willSave: cls.will_save_progression?.toLowerCase(),
    classSkills: cls.class_skills || [],
    weaponProficiencies: Array.isArray(cls.weapon_proficiencies)
      ? cls.weapon_proficiencies.length > 0
        ? cls.weapon_proficiencies.map(capitalize).join(', ')
        : 'Ninguna'
      : cls.weapon_proficiencies || 'Ninguna',
    armorProficiencies: Array.isArray(cls.armor_proficiencies)
      ? cls.armor_proficiencies.length > 0
        ? cls.armor_proficiencies.map(capitalize).join(', ')
        : 'Ninguna'
      : cls.armor_proficiencies || 'Ninguna',
    description: cls.description || ''
  }));
}

/**
 * Obtiene un resumen de información clave de la clase
 */
export function getClassSummary(characterClass: CharacterClass): string {
  const parts = [];

  // Hit Die
  parts.push(`DG: d${characterClass.hitDie}`);

  // Skill Points
  parts.push(`${characterClass.skillPoints} puntos de habilidad`);

  // BAB
  const babText = {
    good: 'BAB Bueno',
    average: 'BAB Medio',
    poor: 'BAB Bajo'
  };
  parts.push(babText[characterClass.baseAttackBonus]);

  return parts.join(' • ');
}

/**
 * Obtiene las salvaciones buenas de la clase
 */
export function getGoodSaves(characterClass: CharacterClass): string[] {
  const saves = [];
  if (characterClass.fortitudeSave === 'good') saves.push('Fortaleza');
  if (characterClass.reflexSave === 'good') saves.push('Reflejos');
  if (characterClass.willSave === 'good') saves.push('Voluntad');
  return saves;
}
