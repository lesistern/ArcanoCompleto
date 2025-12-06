
import { createClient } from '@/lib/supabase/server';

const WEIGHTS: Record<string, number> = {
    'battleaxe': 6,
    'dagger': 1,
    'dagger-punching': 1,
    'gauntlet': 1,
    'gauntlet-spiked': 1,
    'mace-light': 4,
    'mace-heavy': 8,
    'morningstar': 6,
    'sickle': 2,
    'club': 3,
    'shortspear': 3,
    'spear': 6,
    'longspear': 9,
    'quarterstaff': 4,
    'crossbow-light': 4,
    'crossbow-heavy': 8,
    'dart': 0.5,
    'javelin': 2,
    'sling': 0,
    'shortbow': 2,
    'longbow': 3,
    'axe-throwing': 2,
    'hammer-light': 2,
    'handaxe': 3,
    'kukri': 2,
    'pick-light': 3,
    'sap': 2,
    'shield-light-wood': 5,
    'shield-light-steel': 6,
    'shield-heavy-wood': 10,
    'shield-heavy-steel': 15,
    'shield-tower': 45,
    'shortsword': 2,
    'falchion': 8,
    'glaive': 10,
    'greataxe': 12,
    'greatclub': 8,
    'flail-heavy': 10,
    'greatsword': 8,
    'guisarme': 12,
    'halberd': 12,
    'lance': 10,
    'longsword': 4,
    'pick-heavy': 6,
    'ranseur': 12,
    'scythe': 10,
    'trident': 4,
    'warhammer': 5,
    'whip': 2,
    'padded': 10,
    'leather': 15,
    'studded-leather': 20,
    'chain-shirt': 25,
    'hide': 25,
    'scale-mail': 30,
    'chainmail': 40,
    'breastplate': 30,
    'splint-mail': 45,
    'banded-mail': 35,
    'half-plate': 50,
    'full-plate': 50,
    'buckler': 5
};

export async function GET() {
    const supabase = await createClient();
    const results = [];

    for (const [slug, weight] of Object.entries(WEIGHTS)) {
        // Buscar item por slug (o aproximado)
        const { data: items } = await supabase
            .from('srd_items')
            .select('id, name, slug')
            .ilike('slug', slug); // Usamos ilike para coincidencia flexible

        if (items && items.length > 0) {
            for (const item of items) {
                // Solo actualizar si coincide bien el slug (para evitar falsos positivos con nombres parecidos)
                // O si es una coincidencia exacta
                if (item.slug === slug || item.slug.includes(slug)) {
                    const { error } = await supabase
                        .from('srd_items')
                        .update({
                            weight_lb: weight,
                            weight_text: `${weight} lb.`
                        })
                        .eq('id', item.id);

                    results.push({
                        slug,
                        name: item.name,
                        weight,
                        success: !error
                    });
                }
            }
        }
    }

    return Response.json({
        updated: results.length,
        details: results
    });
}
