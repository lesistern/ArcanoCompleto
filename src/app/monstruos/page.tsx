import { createClient } from '@/lib/supabase/server';
import MonstersClient from './MonstersClient';
import { Monster } from '@/lib/services/monsterService.client';
import localMonstersData from '@/lib/data/3.5/monsters.json';

export const metadata = {
  title: 'Monstruos | Compendio Arcano',
  description: 'Bestiario de D&D 3.5',
};

export const revalidate = 3600;

export default async function MonstruosPage() {
  let monsters: Monster[] = [];

  // 1. Try Supabase
  try {
    const supabase = await createClient();
    const { data: monstersData, error } = await supabase
      .from('monsters')
      .select('*')
      .order('name');

    if (!error && monstersData) {
      monsters = monstersData as Monster[];
    }
  } catch (e) {
    console.warn('Supabase fetch failed for list');
  }

  // 2. Fallback / Merge
  // If no monsters found in DB, use local
  if (monsters.length === 0) {
    monsters = localMonstersData.map(p => ({
      id: p.id,
      slug: p.id,
      name: p.name,
      creature_type: p.type,
      size: p.size,
      challenge_rating: p.challenge_rating,
      armor_class: typeof p.armor_class === 'object' ? p.armor_class.total : p.armor_class,
      hit_dice: p.hit_dice,
      alignment: p.alignment,
      environment: p.environment,
      source_book: p.sources?.[0]?.book,
      description: p.description
    })) as unknown as Monster[];
  }

  return <MonstersClient monsters={monsters} />;
}
