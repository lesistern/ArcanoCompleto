import { createClient } from '@/lib/supabase/server';

export interface StartingEquipmentKit {
  id: string;
  class_slug: string;
  kit_name: string;
  kit_slug: string;
  description?: string;
  items: {
    name: string;
    quantity: number;
  }[];
  total_cost_gp: number;
  total_weight_lb: number;
  created_at?: string;
}

/**
 * Get all starting equipment kits from Supabase
 */
export async function getStartingEquipmentKits(): Promise<StartingEquipmentKit[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('starting_equipment_kits')
    .select('*')
    .order('class_slug', { ascending: true })
    .order('kit_name', { ascending: true });

  if (error) {
    console.error('Error fetching starting equipment kits:', error);
    return [];
  }

  return data || [];
}

/**
 * Get starting equipment kits for a specific class
 */
export async function getStartingEquipmentKitsByClass(classSlug: string): Promise<StartingEquipmentKit[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('starting_equipment_kits')
    .select('*')
    .eq('class_slug', classSlug)
    .order('kit_name', { ascending: true });

  if (error) {
    console.error(`Error fetching equipment kits for class ${classSlug}:`, error);
    return [];
  }

  return data || [];
}

/**
 * Get a specific starting equipment kit by slug
 */
export async function getStartingEquipmentKitBySlug(kitSlug: string): Promise<StartingEquipmentKit | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('starting_equipment_kits')
    .select('*')
    .eq('kit_slug', kitSlug)
    .single();

  if (error) {
    console.error(`Error fetching equipment kit ${kitSlug}:`, error);
    return null;
  }

  return data;
}