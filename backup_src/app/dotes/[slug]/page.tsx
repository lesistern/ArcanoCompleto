import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { createClient, createStaticClient } from '@/lib/supabase/server';
import { DnDFeat } from '@/lib/types/feat';
import {
  getFeatTypeIcon,
  getFeatTypeColor,
  getClassColor,
  extractTextColor,
  extractBorderColor,
} from '@/lib/utils/icons';
import { getClassIcon } from '@/lib/utils/classIcons';

interface FeatPageProps {
  params: Promise<{
    slug: string;
  }>;
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
  };

  const Icon = getFeatTypeIcon(featData.type);
  const typeColor = getFeatTypeColor(featData.type);
  const iconColor = extractTextColor(typeColor);

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-8">
        <Link href="/dotes">
          <Button variant="secondary">Volver a Dotes</Button>
        </Link>
      </div>

      {/* Header */}
      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <div className="flex items-center gap-4 mb-3">
          <Icon className={`h-8 w-8 ${iconColor}`} />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
            {featData.name}
          </h1>
        </div>
        <p className="text-lg text-dungeon-300 mb-4">{featData.shortDescription}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className={`px-3 py-1 rounded border font-semibold ${typeColor}`}>
            {featData.type}
          </span>
          <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
            <span className="text-dungeon-500">Categoría:</span> {featData.category}
          </span>
          {featData.bonusFeatClasses && featData.bonusFeatClasses.map((bonusClass, idx) => {
            const ClassIcon = getClassIcon(bonusClass.className);
            const classColor = getClassColor(bonusClass.className);
            const classIconColor = extractTextColor(classColor);
            return (
              <span
                key={idx}
                className={`px-3 py-1 rounded border ${classColor} flex items-center gap-2`}
              >
                <ClassIcon className={`h-4 w-4 ${classIconColor}`} />
                <span>
                  <span className="font-semibold">{bonusClass.className}</span>
                  {bonusClass.level && <span className="opacity-80"> (Nvl {bonusClass.level})</span>}
                  {bonusClass.condition && <span className="opacity-80 text-xs block">{bonusClass.condition}</span>}
                </span>
              </span>
            );
          })}
          {featData.multipleAllowed && (
            <span className="px-3 py-1 rounded bg-spell-blue/20 text-spell-blue border border-spell-blue/30 flex items-center gap-1">
              <Check className="h-3 w-3" />
              Múltiple
            </span>
          )}
        </div>
      </div>

      {/* Clases que pueden obtener como bonus feat */}
      {featData.bonusFeatClasses && featData.bonusFeatClasses.length > 0 && (
        <Card className="mb-8 border-gold-500/30 bg-gold-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gold-500">
              <Star className="h-5 w-5" />
              Dote Adicional de Clase
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-dungeon-300 mb-4">
              Las siguientes clases pueden obtener esta dote como dote adicional:
            </p>
            <div className="space-y-3">
              {featData.bonusFeatClasses.map((bonusClass, idx) => {
                const ClassIcon = getClassIcon(bonusClass.className);
                const classColor = getClassColor(bonusClass.className);
                const textColor = extractTextColor(classColor);
                const borderColor = extractBorderColor(classColor);

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 bg-dungeon-800/50 rounded-lg p-4 border ${borderColor}`}
                  >
                    <ClassIcon className={`h-5 w-5 ${textColor} mt-0.5`} />
                    <div className="flex-1">
                      <div className={`font-semibold ${textColor} mb-1`}>
                        {bonusClass.className}
                        {bonusClass.level && (
                          <span className="opacity-80 font-normal"> • Nivel {bonusClass.level}</span>
                        )}
                      </div>
                      {bonusClass.condition && (
                        <p className="text-sm text-dungeon-300">
                          <span className="text-dungeon-500">Condición:</span> {bonusClass.condition}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Descripción */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Descripción</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dungeon-300 leading-relaxed">{featData.description}</p>
        </CardContent>
      </Card>

      {/* Prerrequisitos */}
      {featData.prerequisites && featData.prerequisites.length > 0 ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              Prerrequisitos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {featData.prerequisites.map((prereq, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-sm bg-dungeon-800/30 rounded p-3"
                >
                  <span className="text-red-400 font-semibold min-w-[100px] capitalize">
                    {prereq.type === 'ability' && 'Habilidad:'}
                    {prereq.type === 'skill' && 'Habilidad:'}
                    {prereq.type === 'feat' && 'Dote:'}
                    {prereq.type === 'bab' && 'BAB:'}
                    {prereq.type === 'casterLevel' && 'Nivel Lanzador:'}
                    {prereq.type === 'race' && 'Raza:'}
                    {prereq.type === 'class' && 'Clase:'}
                    {prereq.type === 'special' && 'Especial:'}
                  </span>
                  <span className="text-dungeon-300">{prereq.description}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-400" />
              Sin Prerrequisitos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-400">
              Esta dote no tiene prerrequisitos y puede ser tomada por cualquier personaje que cumpla
              con los requisitos generales para obtener dotes.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Beneficio */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Beneficio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dungeon-300 leading-relaxed whitespace-pre-line">{featData.benefit}</p>
        </CardContent>
      </Card>

      {/* Normal */}
      {featData.normal && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Normal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-dungeon-400 italic">{featData.normal}</p>
          </CardContent>
        </Card>
      )}

      {/* Especial */}
      {featData.special && featData.special.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Especial</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {featData.special.map((rule, index) => (
                <li key={index} className="text-sm text-dungeon-300 flex gap-2">
                  <span className="text-gold-500">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Múltiple */}
      {featData.multipleAllowed && featData.multipleDetails && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Se Puede Tomar Múltiples Veces</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-dungeon-300">{featData.multipleDetails}</p>
          </CardContent>
        </Card>
      )}

      {/* Dotes Relacionadas */}
      {featData.relatedFeats && featData.relatedFeats.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Dotes Relacionadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {featData.relatedFeats.map((relatedFeat) => (
                <span
                  key={relatedFeat}
                  className="text-xs px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700 hover:border-gold-500 transition-colors"
                >
                  {relatedFeat}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Información de fuente */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-4 mb-8">
        <p className="text-xs text-dungeon-500">
          Fuente: {featData.source.book}, página {featData.source.page}
        </p>
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
