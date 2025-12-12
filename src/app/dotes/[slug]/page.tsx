import { notFound } from 'next/navigation';

import { createClient, createStaticClient } from '@/lib/supabase/server';
import { DnDFeat, FeatType } from '@/lib/types/feat';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { translateType } from '@/lib/utils/translations';
import { getFeatTypeIcon, getFeatTypeColor, extractTextColor } from '@/lib/utils/icons';

interface FeatPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: FeatPageProps) {
  const { slug } = await params;
  const supabase = await createStaticClient();
  const { data: feat } = await supabase
    .from('feats')
    .select('name, short_description')
    .eq('slug', slug)
    .single();

  if (!feat) {
    return {
      title: 'Dote no encontrada',
    };
  }

  const description = feat.short_description || `Detalles de la dote ${feat.name}`;

  return {
    title: `${feat.name} | Dotes D&D 3.5`,
    description,
    openGraph: {
      title: feat.name,
      description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(feat.name)}&type=Dote&description=${encodeURIComponent(description)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function FeatPage({ params }: FeatPageProps) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: feat } = await supabase
    .from('feats')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!feat) {
    notFound();
  }

  // Map database feat to DnDFeat interface
  const featData: DnDFeat = {
    id: feat.slug,
    slug: feat.slug,
    name: feat.name,
    shortDescription: feat.short_description || '',
    description: feat.description || '',
    type: feat.type as FeatType,
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
  };

  const translatedType = translateType(featData.type);
  const Icon = getFeatTypeIcon(featData.type);
  const colorClasses = getFeatTypeColor(featData.type);
  const iconColor = extractTextColor(colorClasses);

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <Breadcrumbs items={[
        { label: 'Dotes', href: '/dotes' },
        { label: featData.name }
      ]} />

      {/* Hero Section */}
      <div className="border-l-4 border-gold-500 pl-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Icon className={`h-10 w-10 md:h-12 md:w-12 ${iconColor}`} />
          <div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-300">
              {featData.name}
            </h1>
            <span className={`inline-block mt-2 px-3 py-1 rounded text-sm font-semibold ${colorClasses}`}>
              {translatedType}
            </span>
          </div>
        </div>
        {featData.shortDescription && (
          <p className="text-gray-400 text-lg max-w-3xl">
            {featData.shortDescription}
          </p>
        )}
      </div>

      <div className="bg-dungeon-900/30 border border-dungeon-700 rounded-lg p-8 shadow-lg relative overflow-hidden">

        <div className="space-y-6 text-gray-300">

          {/* Requisito */}
          {featData.prerequisites && featData.prerequisites.length > 0 && (
            <div>
              <h3 className="font-bold text-gold-500 text-lg mb-1">Requisito:</h3>
              <div className="text-gray-400">
                {featData.prerequisites.map((prereq, index) => (
                  <span key={index}>
                    {prereq.description}
                    {index < featData.prerequisites.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Beneficio */}
          <div>
            <h3 className="font-bold text-gold-500 text-lg mb-1">Beneficio:</h3>
            <p className="whitespace-pre-line leading-relaxed">
              {featData.benefit}
            </p>
          </div>

          {/* Normal */}
          {featData.normal && (
            <div>
              <h3 className="font-bold text-gold-500 text-lg mb-1">Normal:</h3>
              <p className="leading-relaxed">
                {featData.normal}
              </p>
            </div>
          )}

          {/* Especial */}
          {featData.special && featData.special.length > 0 && (
            <div>
              <h3 className="font-bold text-gold-500 text-lg mb-1">Especial:</h3>
              <ul className="list-disc list-inside space-y-1">
                {featData.special.map((item, index) => (
                  <li key={index} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Source Footer */}
          <div className="mt-8 pt-4 border-t border-dungeon-700/50 text-xs text-gray-500 text-right">
            Fuente: {featData.source.book}, pág. {featData.source.page}
          </div>

        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const supabase = await createStaticClient();
  const { data: feats } = await supabase
    .from('feats')
    .select('slug');

  return (feats || []).map((feat) => ({
    slug: feat.slug,
  }));
}
