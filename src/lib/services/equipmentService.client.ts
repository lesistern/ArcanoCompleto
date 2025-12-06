import { createClient } from '@/lib/supabase/client';

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

export interface Weapon {
  id: string;
  name: string;
  cost: string;
  damage_s: string;
  damage_m: string;
  critical: string;
  range_increment: string;
  weight: string;
  type: string; // Slashing, Piercing, Bludgeoning
  category: string; // Simple, Martial, Exotic
  proficiency: string; // Light, One-Handed, Two-Handed, Ranged
  description?: string;
}

export interface Armor {
  id: string;
  name: string;
  cost: string;
  armor_bonus: number;
  max_dex_bonus: number | null; // null for no max
  armor_check_penalty: number;
  arcane_spell_failure: number;
  speed_30: string;
  speed_20: string;
  weight: string;
  category: string; // Light, Medium, Heavy, Shield
  description?: string;
}

export interface GearItem {
  id: string;
  name: string;
  cost: string;
  weight: string;
  category?: string;
  description?: string;
}

/**
 * Get all starting equipment kits from Supabase (client-side)
 */
export async function getStartingEquipmentKits(): Promise<StartingEquipmentKit[]> {
  const supabase = createClient();

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
 * Get starting equipment kits for a specific class (client-side)
 */
export async function getStartingEquipmentKitsByClass(classSlug: string): Promise<StartingEquipmentKit[]> {
  const supabase = createClient();

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

export async function getWeapons(): Promise<Weapon[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from('weapons').select('*').order('name');
  if (error) {
    console.error('Error fetching weapons:', error);
    return [];
  }
  return data || [];
}

export async function getArmor(): Promise<Armor[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from('armor').select('*').order('name');
  if (error) {
    console.error('Error fetching armor:', error);
    return [];
  }
  return data || [];
}

export async function getGear(): Promise<GearItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from('items').select('*').order('name');
  if (error) {
    console.error('Error fetching gear:', error);
    return [];
  }
  return data || [];
}