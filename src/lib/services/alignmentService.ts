import { createClient } from '@/lib/supabase/server';

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
 * Get all alignments from Supabase
 */
export async function getAlignments(): Promise<Alignment[]> {
  const supabase = await createClient();

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
 * Get a specific alignment by code
 */
export async function getAlignmentByCode(code: string): Promise<Alignment | null> {
  const supabase = await createClient();

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

/**
 * Get alignments by law/chaos axis
 */
export async function getAlignmentsByLawChaosAxis(axis: 'Lawful' | 'Neutral' | 'Chaotic'): Promise<Alignment[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('alignments')
    .select('*')
    .eq('axis_law_chaos', axis)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error(`Error fetching alignments for axis ${axis}:`, error);
    return [];
  }

  return data || [];
}

/**
 * Get alignments by good/evil axis
 */
export async function getAlignmentsByGoodEvilAxis(axis: 'Good' | 'Neutral' | 'Evil'): Promise<Alignment[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('alignments')
    .select('*')
    .eq('axis_good_evil', axis)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error(`Error fetching alignments for axis ${axis}:`, error);
    return [];
  }

  return data || [];
}

/**
 * Format alignment for display (Spanish)
 */
export function formatAlignmentSpanish(alignment: Alignment): string {
  return alignment.name_es;
}

/**
 * Format alignment for display (English)
 */
export function formatAlignmentEnglish(alignment: Alignment): string {
  return alignment.name_en;
}

/**
 * Get alignment abbreviation
 */
export function getAlignmentAbbreviation(alignment: Alignment): string {
  return alignment.code;
}