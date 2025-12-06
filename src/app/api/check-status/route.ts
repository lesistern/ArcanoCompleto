import { createClient } from '@/lib/supabase/server';

export async function GET() {
    const supabase = await createClient();

    const { count } = await supabase
        .from('srd_items')
        .select('*', { count: 'exact', head: true });

    const { data: english_items } = await supabase
        .from('srd_items')
        .select('id, name, slug')
        .not('name', 'ilike', '%á%')
        .not('name', 'ilike', '%é%')
        .not('name', 'ilike', '%í%')
        .not('name', 'ilike', '%ó%')
        .not('name', 'ilike', '%ú%')
        .not('name', 'ilike', '%ñ%')
        .limit(20);

    return Response.json({ total: count, sample_english: english_items });
}
