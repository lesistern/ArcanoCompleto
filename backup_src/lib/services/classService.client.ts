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
    .order('titulo');

  if (error) {
    console.error('Error fetching classes:', error);
    return [];
  }

  return (classes || []).map((cls) => {
    const babMap: Record<string, 'good' | 'average' | 'poor'> = {
      bueno: 'good',
      medio: 'average',
      pobre: 'poor'
    };

    const saveMap: Record<string, 'good' | 'poor'> = {
      bueno: 'good',
      medio: 'poor', // Should not happen for saves usually
      pobre: 'poor'
    };

    return {
      slug: cls.slug,
      name: cls.titulo,
      hitDie: cls.dg,
      skillPoints: cls.skill_points_per_level_base,
      baseAttackBonus: babMap[cls.bab] || 'average',
      fortitudeSave: saveMap[cls.fort] || 'poor',
      reflexSave: saveMap[cls.ref] || 'poor',
      willSave: saveMap[cls.will] || 'poor',
      classSkills: [], // Not in DB yet
      weaponProficiencies: 'Ver descripción',
      armorProficiencies: 'Ver descripción',
      description: cls.subtitulo || ''
    };
  });
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
