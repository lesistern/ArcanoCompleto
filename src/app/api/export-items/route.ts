import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * API endpoint para exportar todos los items de equipo de Supabase
 * Incluye items, weapons y armors relacionados
 * 
 * Uso: GET /api/export-items
 */
export async function GET() {
    const supabase = await createClient();

    try {
        // Obtener todos los items con sus relaciones
        const { data: items, error } = await supabase
            .from('srd_items')
            .select(`
        *,
        srd_weapons(*),
        srd_armors(*)
      `)
            .order('name');

        if (error) {
            console.error('Error fetching items:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Estadísticas
        const stats = {
            total_items: items?.length || 0,
            weapons: items?.filter(i => i.srd_weapons && i.srd_weapons.length > 0).length || 0,
            armors: items?.filter(i => i.srd_armors && i.srd_armors.length > 0).length || 0,
            by_category: items?.reduce((acc, item) => {
                acc[item.item_category] = (acc[item.item_category] || 0) + 1;
                return acc;
            }, {} as Record<string, number>) || {}
        };

        return NextResponse.json({
            success: true,
            stats,
            items: items || [],
            exported_at: new Date().toISOString()
        });

    } catch (error: any) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}
