import { createClient } from '@/lib/supabase/server';
import SpellsClient from './SpellsClient';
import { SpellData } from '@/lib/data/spell-management';

export const metadata = {
  title: 'Conjuros | Compendio Arcano',
  description: 'Listado de conjuros de D&D 3.5',
};

export const revalidate = 3600;

export default async function ConjurosPage() {
  const supabase = await createClient();
  const { data: spellsData } = await supabase
    .from('spells')
    .select('*, book_id')
    .order('name');

  // Cast to SpellData[] assuming the DB schema matches
  const spells = (spellsData || []) as unknown as SpellData[];

  return <SpellsClient spells={spells} />;
}
