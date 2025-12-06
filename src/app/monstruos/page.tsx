import { createClient } from '@/lib/supabase/server';
import MonstersClient from './MonstersClient';
import { Monster } from '@/lib/services/monsterService.client';

export const metadata = {
  title: 'Monstruos | Compendio Arcano',
  description: 'Bestiario de D&D 3.5',
};

export const revalidate = 3600;

export default async function MonstruosPage() {
  const supabase = await createClient();
  const { data: monstersData } = await supabase
    .from('monsters')
    .select('*')
    .order('name');

  const monsters = (monstersData || []) as Monster[];

  return <MonstersClient monsters={monsters} />;
}
