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

// Helper to derive axes from code
function getAxes(code: string): { lawChaos: Alignment['axis_law_chaos'], goodEvil: Alignment['axis_good_evil'] } {
  const first = code.charAt(0);
  const second = code.charAt(1) || first; // For 'N' (Neutral)

  let lawChaos: Alignment['axis_law_chaos'] = 'Neutral';
  let goodEvil: Alignment['axis_good_evil'] = 'Neutral';

  // Law/Chaos axis
  if (first === 'L') lawChaos = 'Lawful';
  else if (first === 'C') lawChaos = 'Chaotic';
  else if (first === 'N') lawChaos = 'Neutral';

  // Good/Evil axis
  // Special case for 'N' (True Neutral) -> Neutral Neutral
  if (code === 'N') {
    goodEvil = 'Neutral';
  } else {
    if (second === 'B') goodEvil = 'Good';
    else if (second === 'M') goodEvil = 'Evil';
    else if (second === 'N') goodEvil = 'Neutral';
  }

  return { lawChaos, goodEvil };
}

/**
 * Get all alignments from Supabase (client-side)
 */
export async function getAlignments(): Promise<Alignment[]> {
  const supabase = createClient();

  // Fetch the actual columns that exist in the DB
  const { data, error } = await supabase
    .from('alignments')
    .select('id, name, description, abbreviation')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching alignments:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      fullError: error
    });
    return [];
  }

  // Map DB fields to Alignment interface
  return (data || []).map((item: any, index: number) => {
    const { lawChaos, goodEvil } = getAxes(item.id);
    return {
      code: item.id,
      name_es: item.name,
      name_en: item.name, // Fallback
      description_es: item.description,
      description_en: item.description, // Fallback
      axis_law_chaos: lawChaos,
      axis_good_evil: goodEvil,
      sort_order: index + 1,
    };
  });
}

/**
 * Get a specific alignment by code (client-side)
 */
export async function getAlignmentByCode(code: string): Promise<Alignment | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('alignments')
    .select('id, name, description, abbreviation')
    .eq('id', code) // Query by 'id' which stores the code (e.g., 'LB')
    .single();

  if (error) {
    console.error(`Error fetching alignment ${code}:`, {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      fullError: error
    });
    return null;
  }

  const { lawChaos, goodEvil } = getAxes(data.id);
  return {
    code: data.id,
    name_es: data.name,
    name_en: data.name,
    description_es: data.description,
    description_en: data.description,
    axis_law_chaos: lawChaos,
    axis_good_evil: goodEvil,
    sort_order: 0,
  };
}