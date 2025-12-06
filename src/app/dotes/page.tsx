import { createClient } from '@/lib/supabase/server';
import FeatsClient from './FeatsClient';
import { mapDatabaseFeat } from '@/lib/data/feats-management';

export default async function FeatsPage() {
  const supabase = await createClient();
  const { data: featsData } = await supabase
    .from('feats')
    .select('*, book_id')
    .order('name');

  // Map database feats to DnDFeat interface using centralized function
  const feats = (featsData || []).map(mapDatabaseFeat);

  return <FeatsClient feats={feats} />;
}
