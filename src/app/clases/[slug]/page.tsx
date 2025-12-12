import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { Users, Map, Target, Zap, Church, BookOpen, Wand2, Shield, Sparkles, Scale, UserCircle2 } from 'lucide-react';
import { createClient, createStaticClient } from '@/lib/supabase/server';
import { InfoCard } from '@/components/class-info/InfoCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { extractFirstSentences } from '@/lib/utils/text';
import ClassDetailClient from '@/components/classes/ClassDetailClient';
import { getClassIcon } from '@/lib/utils/classIcons';
import { getClassColor, extractTextColor } from '@/lib/utils/icons';
import type { DnDSkill } from '@/lib/types/skill';
import type { ClassFeature } from '@/lib/supabase/classFeatures';
import {
  generateSlug,
  normalizeSlug,
  capitalizeFirst,
  getClassImage,
  getClassImageGlow,
  translateAlignmentText,
} from '@/lib/data/class-config';

export const revalidate = 86400;

// ============================================================================
// 🎨 CONFIGURACIÓN DE IMÁGENES DE CLASE
// Cambiar a `true` cuando tengas imágenes personalizadas (libres de copyright)
// Las imágenes deben estar en: /public/images/classes/[slug].png
// ============================================================================
const SHOW_CLASS_IMAGES = false;

// Mapping from Spanish slugs to English slugs (for class_progression table)
const SLUG_ES_TO_EN: Record<string, string> = {
  'barbaro': 'barbarian',
  'bardo': 'bard',
  'clerigo': 'cleric',
  'druida': 'druid',
  'guerrero': 'fighter',
  'monje': 'monk',
  'paladin': 'paladin',
  'explorador': 'ranger',
  'picaro': 'rogue',
  'hechicero': 'sorcerer',
  'mago': 'wizard',
};

interface ClassPageProps {
  params: Promise<{
    slug: string;
  }>;
}

type ProgressionRow = {
  level: number;
  baseAttackBonus: string;
  fortitudeSave: number;
  reflexSave: number;
  willSave: number;
  special: string[];
  spellsPerDay?: Record<string, number>;
  spellsKnown?: Record<string, number>;
  [key: string]: any;
};

type Feature = {
  name: string;
  description: string;
  level?: number;
  shortDescription?: string;
};

export async function generateMetadata({ params }: ClassPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createStaticClient();

  const { data: classes } = await supabase.from('classes').select('titulo, subtitulo, summary_es, slug, source_book');
  const classData = classes?.find((c: any) => normalizeSlug(c.slug) === normalizeSlug(slug));

  if (!classData) return { title: 'Clase no encontrada - Compendio Arcano' };
  const title = `${classData.titulo} - Compendio Arcano`;
  const description = (classData.summary_es || classData.subtitulo || `Clase ${classData.titulo} de D&D 3.5`).slice(0, 160);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'Compendio Arcano',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(classData.titulo)}&type=Clase&description=${encodeURIComponent(description)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: { card: 'summary_large_image', title, description },
    keywords: [classData.titulo, 'D&D 3.5', 'clase', 'character class', classData.source_book].filter(Boolean),
  };
}

export default async function ClassPage({ params }: ClassPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // 1. Fetch Core Class Data
  const { data: classesData, error } = await supabase
    .from('classes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !classesData) {
    notFound();
  }

  const classId = classesData.id;

  // 2. Fetch Related Data in Parallel
  const [
    { data: fluffData },
    { data: proficienciesData },
    { data: featuresData },
    { data: progressionData },
    { data: skillsData },
    { data: variantsData },
    { data: altFeaturesData },
    { data: substLevelsData }
  ] = await Promise.all([
    supabase.from('class_fluff').select('*').eq('class_id', classId).single(),
    supabase.from('class_proficiencies').select('*').eq('class_id', classId).single(),
    supabase.from('class_features').select('*').eq('class_slug', SLUG_ES_TO_EN[slug] || slug).order('level', { ascending: true }),
    supabase.from('class_progression').select('*').eq('class_slug', SLUG_ES_TO_EN[slug] || slug).order('level', { ascending: true }),
    supabase.from('skills').select('*'),
    supabase.from('class_variants').select('*').eq('class_id', classId),
    supabase.from('class_alternative_features').select('*').eq('class_id', classId),
    supabase.from('class_substitution_levels').select('*').eq('class_id', classId)
  ]);

  const skills = (skillsData || []) as DnDSkill[];

  // 3. Process Variants
  const classVariants = {
    variantClasses: (variantsData || []).map((v: any) => ({
      name: v.nombre,
      slug: generateSlug(v.nombre),
      level: '1',
      replaces: '',
      benefit: v.descripcion_long || ''
    })),
    alternativeFeatures: (altFeaturesData || []).map((v: any) => ({
      name: v.nombre,
      slug: generateSlug(v.nombre),
      level: v.nivel_minimo ? v.nivel_minimo.toString() : '1',
      replaces: v.reemplaza || '',
      benefit: v.descripcion_long || ''
    })),
    substitutionLevels: (substLevelsData || []).map((v: any) => ({
      name: v.nombre || `${v.raza} ${classesData.titulo}`,
      slug: generateSlug(v.nombre || `${v.raza} ${classesData.titulo}`),
      levels: v.nivel.toString(),
      requirements: `Raza: ${v.raza}`,
      features: v.descripcion_long || ''
    })),
  };

  // 4. Process Features (use new schema from class_features table)
  const classFeatures: ClassFeature[] = featuresData || [];

  const processedFeatures: Feature[] = classFeatures.map((f: any) => ({
    name: f.name_es || f.name_en || f.title || f.nombre,
    description: f.description_es || f.description_en || f.full_description || f.descripcion_long,
    level: f.level || f.nivel,
    shortDescription: f.summary_es || f.summary_en || f.summary || (f.description_en ? f.description_en.slice(0, 100) + '...' : '')
  }));

  // 5. Process Progression
  const processedProgression: ProgressionRow[] = (progressionData || []).map((p: any) => ({
    level: p.level,
    baseAttackBonus: p.base_attack_bonus,
    fortitudeSave: p.fort_save,
    reflexSave: p.ref_save,
    willSave: p.will_save,
    special: p.special_es || p.special_en || [], // Priorizar español, fallback a inglés
    spellsPerDay: p.spells_per_day || undefined,
    spellsKnown: p.spells_known || undefined,
    // Psionic progression fields
    psionicProgression: p.psionic_progression || undefined
  }));

  // 6. Construct ClassData object
  // Use weapon/armor proficiencies from classes table (updated via SQL) first, fallback to class_proficiencies
  const weaponProfs = classesData.weapon_proficiencies_es
    ? [classesData.weapon_proficiencies_es]
    : (proficienciesData?.weapons || []);
  const armorProfs = classesData.armor_proficiencies_es
    ? [classesData.armor_proficiencies_es]
    : [...(proficienciesData?.armors || []), ...(proficienciesData?.shields || [])];

  const classData = {
    id: classesData.id,
    name: classesData.titulo,
    slug: classesData.slug,
    hitDie: `d${classesData.dg}`,
    skillPoints: classesData.skill_points_per_level_base,
    skillPointsFirstLevel: classesData.skill_points_first_level_base,
    classSkills: classesData.class_skills_es || classesData.class_skills_en || [],
    weaponProficiencies: weaponProfs,
    armorProficiencies: armorProfs,
    proficiencyRestrictions: proficienciesData?.restrictions_long || null,
    description: classesData.description_es || fluffData?.intro_long || classesData.summary_es || classesData.subtitulo || '',
    babProgression: classesData.bab === 'bueno' ? 'good' : classesData.bab === 'pobre' ? 'poor' : 'medium',
    fortitudeSave: classesData.fort === 'bueno' ? 'good' : 'poor',
    reflexSave: classesData.ref === 'bueno' ? 'good' : 'poor',
    willSave: classesData.will === 'bueno' ? 'good' : 'poor',
    levelProgression: processedProgression,
    classFeatures: processedFeatures,

    // Fluff fields for UI - Use classes table first (SRD accurate), fallback to class_fluff
    motivacion_aventura: classesData.adventures || fluffData?.why_adventure_long,
    motivacion_aventura_short: fluffData?.why_adventure_short,

    caracteristicas: classesData.characteristics,

    tipo_poder_principal: fluffData?.power_source_type,
    descripcion_poder: fluffData?.power_source_long,
    descripcion_poder_short: fluffData?.power_source_short,

    rol_party: classesData.role || fluffData?.group_role_long,
    rol_party_short: fluffData?.group_role_short,

    origen_social: classesData.background || fluffData?.social_origin_long,
    origen_social_short: fluffData?.social_origin_short,

    enfoque_religioso: classesData.religion || fluffData?.religious_focus_long,
    enfoque_religioso_short: fluffData?.religious_focus_short,
    deidades_tipicas: fluffData?.typical_deities ? fluffData.typical_deities.join(', ') : null,

    razas_comunes: classesData.races || (fluffData?.typical_races ? fluffData.typical_races.join(', ') : null),

    otras_clases: classesData.other_classes,

    alineamiento_descripcion: classesData.alignment,

    // Use alignment_restriction from classes table first (SRD accurate), fallback to fluffData
    regla_alineamiento: classesData.alignment_restriction_es || fluffData?.alignment_long,
    regla_alineamiento_short: fluffData?.alignment_short,
    tendencia_alineamiento: fluffData?.alignment_tendency,

    tiene_magia: classesData.spellcasting === 'si',
    spellcastingType: classesData.spellcasting, // 'si', 'no', 'variante'
    tipo_magia: null,
    estilo_conjuros: null
  };

  // Fetch variants if applicable (currently only for barbarian)
  let variants = null;
  if (classData.slug === 'barbaro' || classData.slug === 'barbarian') {
    try {
      const variantsData = await import('@/lib/data/variants/barbarian_variants.json');
      variants = variantsData.default;
    } catch (e) {
      console.error('Error loading variants:', e);
    }
  }

  const Icon = getClassIcon(classData.slug);
  const colorClasses = getClassColor(classData.name);
  const iconColor = extractTextColor(colorClasses);
  const classImageGlow = getClassImageGlow(colorClasses);
  const classImage = classesData.image_url || getClassImage(classData.slug);
  // const isBarbarian = classData.slug === 'barbarian' || classData.slug === 'barbaro'; // No longer needed
  const alignmentRule = translateAlignmentText(classData.regla_alineamiento_short || classData.regla_alineamiento);
  const alignmentTrend = translateAlignmentText(classData.tendencia_alineamiento);

  const spellcastingStatus = classData.spellcastingType === 'si' ? 'Sí puede lanzar' : classData.spellcastingType === 'variante' ? 'Depende de la variante' : 'No puede lanzar';
  const spellcastingColor = classData.spellcastingType === 'si' ? 'text-emerald-400' : classData.spellcastingType === 'variante' ? 'text-blue-400' : 'text-red-400';

  // Check if there's any lore/fluff data to display
  const hasLoreData = Boolean(
    classData.motivacion_aventura ||
    classData.caracteristicas ||
    classData.tipo_poder_principal ||
    classData.rol_party ||
    classData.origen_social ||
    classData.enfoque_religioso ||
    classData.regla_alineamiento ||
    classData.razas_comunes ||
    classData.otras_clases ||
    classData.alineamiento_descripcion
  );

  // Check if there's progression data
  const hasProgressionData = processedProgression.length > 0;

  // Check if there's features data
  const hasFeaturesData = processedFeatures.length > 0;

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <Breadcrumbs items={[
        { label: 'Clases', href: '/clases' },
        { label: classData.name }
      ]} />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-10 overflow-visible">
        {/* Left Side - Title and Description */}
        <div className="w-full md:flex-1 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <Icon className={`h-10 w-10 md:h-12 md:w-12 ${iconColor}`} />
            <div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-200">
                {classData.name}
              </h1>
              {/* Source Book Badge */}
              {classesData.source_book_abbr && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-900/40 border border-amber-700/50 text-amber-300 text-xs font-semibold">
                    <BookOpen className="h-3.5 w-3.5" />
                    {classesData.source_book_abbr}
                  </span>
                  {classesData.source_page && (
                    <span className="text-gray-500 text-xs">
                      pág. {classesData.source_page}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              {classesData.summary_es || classesData.subtitulo || `Clase ${classesData.titulo} de D&D 3.5`}
            </p>
            {fluffData?.intro_long && (
              <div className="mt-4 text-gray-400 text-sm md:text-base whitespace-pre-line">
                {fluffData.intro_long.split('\n\n')[0]}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Image with Shadow */}
        {/* 🎨 DESACTIVADO POR COPYRIGHT - Cambiar SHOW_CLASS_IMAGES a true cuando tengas imágenes propias */}
        {SHOW_CLASS_IMAGES && classImage && (
          <div className="relative w-full md:flex-1 flex items-center justify-center md:justify-end">
            <div className="relative h-72 md:h-80 lg:h-96 w-full max-w-md hero-figure">
              <div
                className="absolute inset-0 glow-layer"
                style={
                  {
                    '--glow-from': classImageGlow.from,
                    '--glow-via': classImageGlow.via,
                    '--glow-to': classImageGlow.to,
                  } as CSSProperties
                }
              />
              <Image
                src={classImage}
                alt={classData.name}
                fill
                className="hero-image object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)] relative z-10"
                sizes="(max-width: 768px) 100vw, 28rem"
                priority
              />
            </div>
          </div>
        )}
      </div>

      {/* Lore Section - Only show if there's fluff data */}
      {hasLoreData && (
        <div className="mb-10 space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-200 flex items-center gap-3">
            <BookOpen className="h-7 w-7 text-amber-400" />
            {capitalizeFirst('trasfondo y narrativa')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Adventure Motivation */}
            {classData.motivacion_aventura && (
              <InfoCard
                title={capitalizeFirst("¿por qué se aventuran?")}
                summary={extractFirstSentences(classData.motivacion_aventura, 180)}
                fullContent={classData.motivacion_aventura}
                icon={<Target className="h-5 w-5" />}
                iconColor="text-emerald-400"
              />
            )}

            {/* Characteristics */}
            {classData.caracteristicas && (
              <InfoCard
                title={capitalizeFirst("características")}
                summary={extractFirstSentences(classData.caracteristicas, 180)}
                fullContent={classData.caracteristicas}
                icon={<Sparkles className="h-5 w-5" />}
                iconColor="text-amber-400"
              />
            )}

            {/* Power Source */}
            {classData.tipo_poder_principal && (
              <InfoCard
                title={capitalizeFirst("fuente de poder")}
                summary={extractFirstSentences(classData.descripcion_poder || `El poder de esta clase proviene de fuentes ${classData.tipo_poder_principal.toLowerCase()}.`, 180)}
                fullContent={classData.descripcion_poder || `El poder de esta clase proviene de fuentes ${classData.tipo_poder_principal.toLowerCase()}.`}
                icon={<Zap className="h-5 w-5" />}
                iconColor="text-violet-400"
                additionalInfo={{
                  label: 'Tipo',
                  value: capitalizeFirst(classData.tipo_poder_principal)
                }}
              />
            )}

            {/* Party Role */}
            {classData.rol_party && (
              <InfoCard
                title={capitalizeFirst("rol en el grupo")}
                summary={extractFirstSentences(classData.rol_party, 180)}
                fullContent={classData.rol_party}
                icon={<Users className="h-5 w-5" />}
                iconColor="text-cyan-400"
              />
            )}

            {/* Social Origin */}
            {classData.origen_social && (
              <InfoCard
                title={capitalizeFirst("origen social")}
                summary={extractFirstSentences(classData.origen_social, 180)}
                fullContent={classData.origen_social}
                icon={<Map className="h-5 w-5" />}
                iconColor="text-orange-400"
              />
            )}

            {/* Religious Focus */}
            {classData.enfoque_religioso && (
              <InfoCard
                title={capitalizeFirst("enfoque religioso")}
                summary={extractFirstSentences(classData.enfoque_religioso, 180)}
                fullContent={classData.enfoque_religioso}
                icon={<Church className="h-5 w-5" />}
                iconColor="text-yellow-400"
                additionalInfo={classData.deidades_tipicas ? {
                  label: capitalizeFirst('deidades típicas'),
                  value: classData.deidades_tipicas
                } : undefined}
              />
            )}

            {/* Combined: Magic + Alignment Restrictions - Using Card component */}
            <Card className="border-dungeon-700 bg-dungeon-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="text-amber-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  {capitalizeFirst("reglas de clase")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Magic */}
                <div className="flex items-start gap-3">
                  <Wand2 className={`h-5 w-5 mt-0.5 ${spellcastingColor}`} />
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Conjuros</span>
                    <p className={`text-sm ${spellcastingColor}`}>{spellcastingStatus}</p>
                  </div>
                </div>
                {/* Alignment */}
                {alignmentRule && (
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 mt-0.5 text-red-400" />
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Alineamiento</span>
                      <p className="text-sm text-gray-300">{capitalizeFirst(alignmentRule.toLowerCase())}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Common Races */}
            {classData.razas_comunes && (
              <InfoCard
                title={capitalizeFirst("razas comunes")}
                summary={extractFirstSentences(classData.razas_comunes, 180)}
                fullContent={classData.razas_comunes}
                icon={<Users className="h-5 w-5" />}
                iconColor="text-blue-400"
              />
            )}

            {/* How this class views other classes */}
            {classData.otras_clases && (
              <InfoCard
                title={capitalizeFirst("relación con otras clases")}
                summary={extractFirstSentences(classData.otras_clases, 180)}
                fullContent={classData.otras_clases}
                icon={<UserCircle2 className="h-5 w-5" />}
                iconColor="text-indigo-400"
              />
            )}

            {/* Alignment description */}
            {classData.alineamiento_descripcion && (
              <InfoCard
                title={capitalizeFirst("alineamiento típico")}
                summary={extractFirstSentences(classData.alineamiento_descripcion, 180)}
                fullContent={classData.alineamiento_descripcion}
                icon={<Scale className="h-5 w-5" />}
                iconColor="text-purple-400"
              />
            )}
          </div>
        </div>
      )}

      <ClassDetailClient
        classData={classData as any}
        variants={variants || undefined}
        iconColor={iconColor}
        skillsData={skills}
        hasProgressionData={hasProgressionData}
        hasFeaturesData={hasFeaturesData}
      />
    </div>
  );
}
