import { createStaticClient } from '@/lib/supabase/server';

export interface ClassFeature {
  id: string;
  class_slug: string;
  title: string;
  summary: string;
  full_description: string;
  level: number;
  created_at?: string;
  updated_at?: string;
}

export async function getClassFeatures(classSlug: string): Promise<ClassFeature[]> {
  const supabase = await createStaticClient();

  const { data, error } = await supabase
    .from('class_features')
    .select('*')
    .eq('class_slug', classSlug)
    .order('level', { ascending: true });

  if (error) {
    console.error(`Error fetching class features for ${classSlug}:`, error);
    return [];
  }

  return data || [];
}

export async function getClassFeaturesBySlug(classSlug: string): Promise<ClassFeature[]> {
  const supabase = await createStaticClient();

  const { data, error } = await supabase
    .from('class_features')
    .select('*')
    .eq('class_slug', classSlug)
    .order('level', { ascending: true });

  if (error) {
    console.error(`Error fetching class features for slug ${classSlug}:`, error);
    return [];
  }

  return data || [];
}
