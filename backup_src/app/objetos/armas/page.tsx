import { createClient } from '@/lib/supabase/server';
import { mapDatabaseItemToWeapon } from '@/lib/utils/itemMapper';
import ArmasClient from './ArmasClient';

export default async function ArmasPage() {
  const supabase = await createClient();

  const { data: items } = await supabase
    .from('items')
    .select('*')
    .eq('category', 'Arma');

  const weapons = (items || []).map(mapDatabaseItemToWeapon);

  return <ArmasClient weapons={weapons} />;
}
