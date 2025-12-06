import { createClient } from '@/lib/supabase/server';

export async function GET() {
    const supabase = await createClient();

    // Buscar items que parezcan no traducidos
    const { data: untranslated } = await supabase
        .from('srd_items')
        .select('id, name, slug, weight')
        .or('name.ilike.%Attack%,name.ilike.%Unarmed%,name.ilike.%Strike%,name.ilike.%Spiked%')
        .limit(50);

    // Buscar items con peso nulo o extraño
    const { data: weight_issues } = await supabase
        .from('srd_items')
        .select('id, name, weight')
        .is('weight', null)
        .limit(20);

    return Response.json({ untranslated, weight_issues });
}
