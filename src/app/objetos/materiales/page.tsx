import { createClient } from '@/lib/supabase/server';
import EquipmentCategoryClient from '../EquipmentCategoryClient';

export default async function MaterialsPage() {
    const supabase = await createClient();

    // Fetch special materials
    const { data: itemsData } = await supabase
        .from('srd_items')
        .select(`
      *,
      srd_weapons(*),
      srd_armors(*)
    `)
        .eq('item_category', 'material')
        .order('name');

    const items = itemsData || [];

    return <EquipmentCategoryClient items={items} category="materiales" />;
}
