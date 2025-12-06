import { createClient } from '@/lib/supabase/server';

export interface DMCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon_name?: string;
  color?: string;
  parent_slug?: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DMCategoryWithChildren extends DMCategory {
  children?: DMCategory[];
}

/**
 * Get all DM categories from Supabase
 */
export async function getDMCategories(): Promise<DMCategory[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('dm_categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching DM categories:', error);
    return [];
  }

  return data || [];
}

/**
 * Get DM categories organized in a tree structure
 */
export async function getDMCategoriesTree(): Promise<DMCategoryWithChildren[]> {
  const categories = await getDMCategories();

  // Separate parent and child categories
  const parentCategories = categories.filter(cat => !cat.parent_slug);
  const childCategories = categories.filter(cat => cat.parent_slug);

  // Build tree structure
  const tree: DMCategoryWithChildren[] = parentCategories.map(parent => ({
    ...parent,
    children: childCategories
      .filter(child => child.parent_slug === parent.slug)
      .sort((a, b) => a.sort_order - b.sort_order)
  }));

  return tree;
}

/**
 * Get only parent DM categories
 */
export async function getParentDMCategories(): Promise<DMCategory[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('dm_categories')
    .select('*')
    .is('parent_slug', null)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching parent DM categories:', error);
    return [];
  }

  return data || [];
}

/**
 * Get child categories for a specific parent
 */
export async function getChildDMCategories(parentSlug: string): Promise<DMCategory[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('dm_categories')
    .select('*')
    .eq('parent_slug', parentSlug)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error(`Error fetching child categories for ${parentSlug}:`, error);
    return [];
  }

  return data || [];
}

/**
 * Get a specific DM category by slug
 */
export async function getDMCategoryBySlug(slug: string): Promise<DMCategory | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('dm_categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching DM category ${slug}:`, error);
    return null;
  }

  return data;
}

/**
 * Search DM categories by name or description
 */
export async function searchDMCategories(searchTerm: string): Promise<DMCategory[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('dm_categories')
    .select('*')
    .eq('is_active', true)
    .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error(`Error searching DM categories for "${searchTerm}":`, error);
    return [];
  }

  return data || [];
}