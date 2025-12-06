import { createClient } from '@/lib/supabase/server';
import EquipmentCategoryClient from '../EquipmentCategoryClient';

export default async function GoodsPage() {
    const supabase = await createClient();

    // Fetch goods and services
    const { data: itemsData } = await supabase
        .from('srd_items')
        .select(`
      *,
      srd_weapons(*),
      srd_armors(*)
    `)
        .eq('item_category', 'goods')
        .order('name');

    const items = itemsData || [];

    return <EquipmentCategoryClient items={items} category="bienes" />;
}
