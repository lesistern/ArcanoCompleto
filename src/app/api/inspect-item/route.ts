import { createClient } from '@/lib/supabase/server';

export async function GET() {
    const supabase = await createClient();

    const { data: item } = await supabase
        .from('srd_items')
        .select('*')
        .limit(1)
        .single();

    return Response.json({ item });
}
