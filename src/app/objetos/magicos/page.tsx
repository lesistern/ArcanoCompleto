import { createClient } from '@/lib/supabase/server';
import MagicItemsClient from './MagicItemsClient';

interface MagicItem {
  id: string;
  slug: string;
  name: string;
  item_type?: string;
  item_slot?: string;
  caster_level?: number;
  aura?: string;
  price_gold?: number;
  weight_lb?: number;
  description?: string;
  image_url?: string;
}

export default async function MagicItemsPage() {
  const supabase = await createClient();

  const { data: items } = await supabase
    .from('magic_items')
    .select('*')
    .order('name');

  const magicItems: MagicItem[] = items || [];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <MagicItemsClient magicItems={magicItems} />
    </div>
  );
}
