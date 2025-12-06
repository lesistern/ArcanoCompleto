import { createClient } from '@/lib/supabase/server';

export async function GET() {
    const supabase = await createClient();

    const { data: items } = await supabase
        .from('srd_items')
        .select('id, name, weight_lb, weight_text')
        .or('weight_text.ilike.%mdash%,weight_text.is.null')
        .limit(50);

    return Response.json({ items });
}
