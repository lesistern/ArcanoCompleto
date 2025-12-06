
import { createClient } from '@/lib/supabase/server';

// Mapa de correcciones manuales finales
const FIXES = [
    { pattern: '%Unarmed Attacks%', fix: 'Ataques desarmados' },
    { pattern: '%Unarmed strike%', fix: 'Golpe desarmado' },
    { pattern: '%Gauntlet, spiked%', fix: 'Guantelete con púas' },
    { pattern: '%Spiked shield, light%', fix: 'Escudo ligero con púas' },
    { pattern: '%Spiked shield, heavy%', fix: 'Escudo pesado con púas' },
    { pattern: '%Spiked armor%', fix: 'Armadura con púas' },
    { pattern: '%Chain, spiked%', fix: 'Cadena con púas' }
];

export async function GET() {
    const supabase = await createClient();
    const results = [];

    // 1. Aplicar correcciones de nombres
    for (const item of FIXES) {
        // Buscar ID primero
        const { data: found } = await supabase
            .from('srd_items')
            .select('id, name')
            .ilike('name', item.pattern);

        if (found && found.length > 0) {
            for (const f of found) {
                const { error } = await supabase
                    .from('srd_items')
                    .update({ name: item.fix })
                    .eq('id', f.id);

                results.push({
                    original: f.name,
                    new: item.fix,
                    success: !error,
                    error: error?.message
                });
            }
        }
    }

    // 2. Arreglar pesos nulos
    // Primero obtenemos los IDs con peso null
    const { data: nullWeights } = await supabase
        .from('srd_items')
        .select('id, name')
        .is('weight', null);

    let weightFixedCount = 0;

    if (nullWeights && nullWeights.length > 0) {
        for (const item of nullWeights) {
            const { error } = await supabase
                .from('srd_items')
                .update({ weight: 0 })
                .eq('id', item.id);

            if (!error) weightFixedCount++;
        }
    }

    return Response.json({
        name_fixes: results,
        weight_fixes: {
            found: nullWeights?.length || 0,
            fixed: weightFixedCount
        }
    });
}
