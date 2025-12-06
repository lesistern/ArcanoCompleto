import { createClient } from '@/lib/supabase/server';

export async function GET() {
    const supabase = await createClient();

    const { data: items } = await supabase
        .from('srd_items')
        .select('id, name, slug, weight')
        .ilike('name', '%Unarmed%');

    return Response.json({ items });
}
