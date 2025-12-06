import { createClient } from '@/lib/supabase/client';

export interface CharacterTemplate {
  id: string;
  template_slug: string;
  template_name: string;
  concept: string;
  description: string;
  suggested_race: string;
  suggested_class: string;
  suggested_alignment: string;
  ability_scores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  recommended_skills: string[];
  recommended_feats: string[];
  tags: string[];
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  created_at?: string;
}

/**
 * Get all character templates from Supabase (client-side)
 */
export async function getCharacterTemplates(): Promise<CharacterTemplate[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('character_templates')
    .select('*')
    .order('template_name', { ascending: true });

  if (error) {
    console.error('Error fetching character templates:', error);
    return [];
  }

  return data || [];
}

/**
 * Get character templates by class (client-side)
 */
export async function getCharacterTemplatesByClass(classSlug: string): Promise<CharacterTemplate[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('character_templates')
    .select('*')
    .eq('suggested_class', classSlug)
    .order('template_name', { ascending: true });

  if (error) {
    console.error(`Error fetching templates for class ${classSlug}:`, error);
    return [];
  }

  return data || [];
}

/**
 * Search character templates by text (client-side)
 */
export async function searchCharacterTemplates(searchTerm: string): Promise<CharacterTemplate[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('character_templates')
    .select('*')
    .or(`template_name.ilike.%${searchTerm}%,concept.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order('template_name', { ascending: true });

  if (error) {
    console.error(`Error searching templates for "${searchTerm}":`, error);
    return [];
  }

  return data || [];
}