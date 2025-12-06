import { createClient } from '@/lib/supabase/server';
import FeatsClient from './FeatsClient';
import { DnDFeat } from '@/lib/types/feat';

export default async function FeatsPage() {
  const supabase = await createClient();
  const { data: featsData } = await supabase
    .from('feats')
    .select('*')
    .order('name');

  // Map database feats to DnDFeat interface
  const feats: DnDFeat[] = (featsData || []).map(feat => ({
    id: feat.slug,
    slug: feat.slug,
    name: feat.name,
    shortDescription: feat.short_description || '',
    description: feat.description || '',
    type: feat.type as any,
    category: feat.category,
    prerequisites: feat.prerequisites || [],
    benefit: feat.benefit || '',
    normal: feat.normal,
    special: feat.special || [],
    fighterBonus: feat.fighter_bonus || false,
    multipleAllowed: feat.multiple_allowed || false,
    relatedFeats: feat.related_feats || [],
    source: {
      book: feat.source_book || '',
      page: feat.source_page || 0,
    },
  }));

  return <FeatsClient feats={feats} />;
}
