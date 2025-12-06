import { createClient } from '@/lib/supabase/client';

export interface Feat {
    id: string;
    name: string;
    slug: string;
    type: string;
    description: string;
    prerequisites: string;
    benefit: string;
    normal?: string;
    special?: string;
    source: string;
}

export async function getFeats(): Promise<Feat[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('feats')
        .select('id, name, slug, type, description, prerequisites, benefit, normal, special, source_book')
        .order('name');

    if (error) {
        console.error('Error fetching feats:', error);
        return [];
    }

    return (data || []).map((item: any) => ({
        ...item,
        source: item.source_book || 'Unknown'
    }));
}

export async function getFeatBySlug(slug: string): Promise<Feat | null> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('feats')
        .select('id, name, slug, type, description, prerequisites, benefit, normal, special, source_book')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching feat:', error);
        return null;
    }

    return {
        ...data,
        source: data.source_book || 'Unknown'
    };
}
