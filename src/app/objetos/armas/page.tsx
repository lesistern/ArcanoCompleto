import { createClient } from '@/lib/supabase/server';
import ArmasClient from './ArmasClient';
import { mapDatabaseItemToWeapon } from '@/lib/utils/itemMapper';
import { DnDWeapon } from '@/lib/types/item';

export default async function WeaponsPage() {
  const supabase = await createClient();

  // Fetch weapons
  const { data: itemsData } = await supabase
    .from('srd_items')
    .select(`
      *,
      srd_weapons(*)
    `)
    .eq('item_category', 'weapon')
    .order('name');

  const items = itemsData || [];

  // Map database items to DnDWeapon type
  const weapons: DnDWeapon[] = items.map((item: any) => {
    // Flatten the structure if srd_weapons is present
    const weaponData = item.srd_weapons && item.srd_weapons.length > 0
      ? { ...item, ...item.srd_weapons[0] }
      : item;

    return mapDatabaseItemToWeapon(weaponData);
  });



  return <ArmasClient weapons={weapons} />;
}
