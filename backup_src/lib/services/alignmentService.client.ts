import { createClient } from '@/lib/supabase/client';

export interface Alignment {
  code: string;
  name_es: string;
  name_en: string;
  description_es: string;
  description_en: string;
  axis_law_chaos: 'Lawful' | 'Neutral' | 'Chaotic';
  axis_good_evil: 'Good' | 'Neutral' | 'Evil';
  sort_order: number;
  created_at?: string;
}

/**
 * Get all alignments from Supabase (client-side)
 */
export async function getAlignments(): Promise<Alignment[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('alignments')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching alignments:', error);
    return [];
  }

  return data || [];
}

/**
 * Get a specific alignment by code (client-side)
 */
export async function getAlignmentByCode(code: string): Promise<Alignment | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('alignments')
    .select('*')
    .eq('code', code)
    .single();

  if (error) {
    console.error(`Error fetching alignment ${code}:`, error);
    return null;
  }

  return data;
}