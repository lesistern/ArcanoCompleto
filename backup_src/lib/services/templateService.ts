import { createClient } from '@/lib/supabase/server';

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
 * Get all character templates from Supabase
 */
export async function getCharacterTemplates(): Promise<CharacterTemplate[]> {
  const supabase = await createClient();

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
 * Get character templates by class
 */
export async function getCharacterTemplatesByClass(classSlug: string): Promise<CharacterTemplate[]> {
  const supabase = await createClient();

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
 * Get character templates by alignment
 */
export async function getCharacterTemplatesByAlignment(alignment: string): Promise<CharacterTemplate[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('character_templates')
    .select('*')
    .eq('suggested_alignment', alignment)
    .order('template_name', { ascending: true });

  if (error) {
    console.error(`Error fetching templates for alignment ${alignment}:`, error);
    return [];
  }

  return data || [];
}

/**
 * Get character templates by tag
 */
export async function getCharacterTemplatesByTag(tag: string): Promise<CharacterTemplate[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('character_templates')
    .select('*')
    .contains('tags', [tag])
    .order('template_name', { ascending: true });

  if (error) {
    console.error(`Error fetching templates for tag ${tag}:`, error);
    return [];
  }

  return data || [];
}

/**
 * Get a specific character template by slug
 */
export async function getCharacterTemplateBySlug(templateSlug: string): Promise<CharacterTemplate | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('character_templates')
    .select('*')
    .eq('template_slug', templateSlug)
    .single();

  if (error) {
    console.error(`Error fetching template ${templateSlug}:`, error);
    return null;
  }

  return data;
}

/**
 * Search character templates by text
 */
export async function searchCharacterTemplates(searchTerm: string): Promise<CharacterTemplate[]> {
  const supabase = await createClient();

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