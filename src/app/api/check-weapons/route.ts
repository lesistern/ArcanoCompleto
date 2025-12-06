import { createClient } from '@/lib/supabase/server';

export async function GET() {
    const supabase = await createClient();

    const { data: items, error } = await supabase
        .from('srd_items')
        .select('id, name, slug')
        .limit(10)

    if (error) {
        return Response.json({ error }, { status: 500 });
    }

    return Response.json({ items });
}
