import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import React from 'react';
import { Users, Map, Target, Zap, Church, BookOpen, Wand2, Shield } from 'lucide-react';
import { createClient, createStaticClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/class-info/InfoCard';
import { createSummary } from '@/lib/utils/text';
import ClassDetailClient from '@/components/classes/ClassDetailClient';
import { getClassIcon } from '@/lib/utils/classIcons';
import { getClassColor, extractTextColor } from '@/lib/utils/icons';
import type { DnDSkill } from '@/lib/types/skill';

export const revalidate = 86400;

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

// Helper function to generate slug from name
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const normalizeSlug = (slug: string) =>
  slug
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const capitalizeFirst = (str: string) => {
  if (!str) return str;
  if (str.startsWith('¿')) {
    return '¿' + str.charAt(1).toUpperCase() + str.slice(2);
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const CLASS_IMAGES: Record<string, string> = {
  barbaro: '/images/classes/Barbarian.webp',
  barbarian: '/images/classes/Barbarian.webp',
  bardo: '/images/classes/Bard.webp',
  bard: '/images/classes/Bard.webp',
  clerigo: '/images/classes/Cleric.webp',
  cleric: '/images/classes/Cleric.webp',
  druida: '/images/classes/Druid.webp',
  druid: '/images/classes/Druid.webp',
  guerrero: '/images/classes/Fighter.webp',
  fighter: '/images/classes/Fighter.webp',
  monje: '/images/classes/Monk.webp',
  monk: '/images/classes/Monk.webp',
  paladin: '/images/classes/Paladin.webp',
  explorador: '/images/classes/Ranger.webp',
  ranger: '/images/classes/Ranger.webp',
  picaro: '/images/classes/Rogue.webp',
  rogue: '/images/classes/Rogue.webp',
  brujo: '/images/classes/Warlock.webp',
  warlock: '/images/classes/Warlock.webp',
  mago: '/images/classes/Wizard.webp',
  wizard: '/images/classes/Wizard.webp',
  archivista: '/images/classes/Archivist.webp',
  archivist: '/images/classes/Archivist.webp',
};

const getClassImage = (slug: string): string | null => {
  const normalized = normalizeSlug(slug);
  return CLASS_IMAGES[slug] || CLASS_IMAGES[normalized] || null;
};

type GlowStops = { from: string; via: string; to: string };

const CLASS_IMAGE_GLOWS: Record<string, GlowStops> = {
  red: { from: '#dc2626', via: '#f97316', to: '#fb923c' },
  pink: { from: '#ec4899', via: '#fb7185', to: '#fbbf24' },
  yellow: { from: '#facc15', via: '#f59e0b', to: '#fb923c' },
  green: { from: '#10b981', via: '#22c55e', to: '#a3e635' },
  purple: { from: '#a855f7', via: '#8b5cf6', to: '#ec4899' },
  blue: { from: '#3b82f6', via: '#38bdf8', to: '#22d3ee' },
  orange: { from: '#f97316', via: '#fb923c', to: '#fbbf24' },
  cyan: { from: '#06b6d4', via: '#0ea5e9', to: '#22d3ee' },
  gray: { from: '#9ca3af', via: '#cbd5e1', to: '#e5e7eb' },
};

const DEFAULT_GLOW: GlowStops = { from: '#fbbf24', via: '#f59e0b', to: '#10b981' };

const getClassImageGlow = (colorClasses: string): GlowStops => {
  const hue = colorClasses.match(/text-([a-z]+)/)?.[1];
  return (hue && CLASS_IMAGE_GLOWS[hue]) || DEFAULT_GLOW;
};

const ALIGNMENT_REPLACEMENTS: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /\bany\s+non-evil\s*\(any\s+non-chaotic\)/gi, replacement: 'Cualquiera que no sea malvado (cualquiera que no sea caótico)' },
  { pattern: /\bany\s+non[- ]?lawful\b/gi, replacement: 'Cualquiera que no sea legal' },
  { pattern: /\bany\s+non[- ]?chaotic\b/gi, replacement: 'Cualquiera que no sea caótico' },
  { pattern: /\bany\s+non[- ]?good\b/gi, replacement: 'Cualquiera que no sea bueno' },
  { pattern: /\bany\s+non[- ]?evil\b/gi, replacement: 'Cualquiera que no sea malvado' },
  { pattern: /\bany\s+lawful\b/gi, replacement: 'Cualquiera legal' },
  { pattern: /\bany\s+chaotic\b/gi, replacement: 'Cualquiera caótico' },
  { pattern: /\bany\s+good\b/gi, replacement: 'Cualquiera bueno' },
  { pattern: /\bany\s+evil\b/gi, replacement: 'Cualquiera malvado' },
  { pattern: /\bany\s+neutral\b/gi, replacement: 'Cualquiera neutral' },
  { pattern: /\bany\s+alignment\b/gi, replacement: 'Cualquier alineamiento' },
  { pattern: /\blawful\s+good\b/gi, replacement: 'Legal bueno' },
  { pattern: /\bneutral\s+good\b/gi, replacement: 'Neutral bueno' },
  { pattern: /\bchaotic\s+good\b/gi, replacement: 'Caótico bueno' },
  { pattern: /\blawful\s+neutral\b/gi, replacement: 'Legal neutral' },
  { pattern: /\btrue\s+neutral\b/gi, replacement: 'Neutral verdadero' },
  { pattern: /\bchaotic\s+neutral\b/gi, replacement: 'Caótico neutral' },
  { pattern: /\bneutral\s+evil\b/gi, replacement: 'Neutral malvado' },
  { pattern: /\blawful\s+evil\b/gi, replacement: 'Legal malvado' },
  { pattern: /\bchaotic\s+evil\b/gi, replacement: 'Caótico malvado' },
  { pattern: /\bneutral\b/gi, replacement: 'Neutral' },
  { pattern: /\bany\b/gi, replacement: 'Cualquiera' },
  { pattern: /\bor\b/gi, replacement: 'o' },
  { pattern: /\band\b/gi, replacement: 'y' },
];

const translateAlignmentText = (text?: string | null): string | null => {
  if (!text) return null;
  return ALIGNMENT_REPLACEMENTS.reduce((acc, { pattern, replacement }) => acc.replace(pattern, replacement), text).trim();
};

const renderAlignmentRule = (rule: string, trend?: string | null) => {
  // Simply render the alignment rule as plain text, without interactive buttons
  return (
    <div className="space-y-3 text-dungeon-200">
      <p className="leading-relaxed">{rule}</p>
    </div>
  );
};

export async function generateMetadata({ params }: ClassPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createStaticClient();

  const { data: classes } = await supabase.from('classes').select('titulo, subtitulo, slug');
  const classData = classes?.find((c: any) => normalizeSlug(c.slug) === normalizeSlug(slug));

  if (!classData) return { title: 'Clase no encontrada - Compendio Arcano' };
  const title = `${classData.titulo} - Compendio Arcano`;
  const description = (classData.subtitulo || '').slice(0, 160);
  return {
    title,
    description,
    openGraph: { title, description, type: 'article', siteName: 'Compendio Arcano' },
    twitter: { card: 'summary', title, description },
    keywords: [classData.titulo, 'D&D 3.5', 'clase', 'character class'],
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
    supabase.from('class_features').select('*').eq('class_id', classId).order('nivel', { ascending: true }).order('sort_order', { ascending: true }),
    supabase.from('class_progression').select('*').eq('class_slug', slug).order('level', { ascending: true }),
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

  // 4. Process Features
  const processedFeatures: Feature[] = (featuresData || []).map((f: any) => ({
    name: f.nombre,
    description: f.descripcion_long,
    level: f.nivel,
    shortDescription: f.descripcion_long.slice(0, 100) + '...'
  }));

  // 5. Process Progression
  const processedProgression: ProgressionRow[] = (progressionData || []).map((p: any) => ({
    level: p.level,
    baseAttackBonus: p.base_attack_bonus,
    fortitudeSave: p.fort_save,
    reflexSave: p.ref_save,
    willSave: p.will_save,
    special: p.special_abilities ? p.special_abilities.split(',').map((s: string) => s.trim()) : [],
    spellsPerDay: p.spells_per_day || undefined,
    spellsKnown: p.spells_known || undefined
  }));

  // 6. Construct ClassData object
  const classData = {
    id: classesData.id,
    name: classesData.titulo,
    slug: classesData.slug,
    hitDie: `d${classesData.dg}`,
    skillPoints: classesData.skill_points_per_level_base,
    skillPointsFirstLevel: classesData.skill_points_first_level_base,
    classSkills: [] as string[],
    weaponProficiencies: proficienciesData?.weapons || [],
    armorProficiencies: [...(proficienciesData?.armors || []), ...(proficienciesData?.shields || [])],
    proficiencyRestrictions: proficienciesData?.restrictions_long || null,
    description: fluffData?.intro_long || classesData.subtitulo || '',
    babProgression: classesData.bab === 'bueno' ? 'good' : classesData.bab === 'pobre' ? 'poor' : 'medium',
    fortitudeSave: classesData.fort === 'bueno' ? 'good' : 'poor',
    reflexSave: classesData.ref === 'bueno' ? 'good' : 'poor',
    willSave: classesData.will === 'bueno' ? 'good' : 'poor',
    levelProgression: processedProgression,
    classFeatures: processedFeatures,

    // Fluff fields for UI
    motivacion_aventura: fluffData?.why_adventure_long,
    motivacion_aventura_short: fluffData?.why_adventure_short,

    tipo_poder_principal: fluffData?.power_source_type,
    descripcion_poder: fluffData?.power_source_long,
    descripcion_poder_short: fluffData?.power_source_short,

    rol_party: fluffData?.group_role_long,
    rol_party_short: fluffData?.group_role_short,

    origen_social: fluffData?.social_origin_long,
    origen_social_short: fluffData?.social_origin_short,

    enfoque_religioso: fluffData?.religious_focus_long,
    enfoque_religioso_short: fluffData?.religious_focus_short,
    deidades_tipicas: fluffData?.typical_deities ? fluffData.typical_deities.join(', ') : null,

    razas_comunes: fluffData?.typical_races ? fluffData.typical_races.join(', ') : null,

    regla_alineamiento: fluffData?.alignment_long,
    regla_alineamiento_short: fluffData?.alignment_short,
    tendencia_alineamiento: fluffData?.alignment_tendency,

    tiene_magia: classesData.spellcasting === 'si',
    spellcastingType: classesData.spellcasting, // 'si', 'no', 'variante'
    tipo_magia: null,
    estilo_conjuros: null
  };

  // Fallback for class skills if empty
  if (classData.slug === 'barbarian' || classData.slug === 'barbaro') {
    classData.classSkills = ['Trepar', 'Artesania', 'Trato con animales', 'Intimidar', 'Saltar', 'Escuchar', 'Montar', 'Supervivencia', 'Nadar'];
  }

  const Icon = getClassIcon(classData.slug);
  const colorClasses = getClassColor(classData.name);
  const iconColor = extractTextColor(colorClasses);
  const classImageGlow = getClassImageGlow(colorClasses);
  const classImage = classesData.image_url || getClassImage(classData.slug);
  const isBarbarian = classData.slug === 'barbarian' || classData.slug === 'barbaro';
  const alignmentRule = translateAlignmentText(classData.regla_alineamiento_short || classData.regla_alineamiento);
  const alignmentTrend = translateAlignmentText(classData.tendencia_alineamiento);

  const spellcastingStatus = classData.spellcastingType === 'si' ? 'Sí puede lanzar' : classData.spellcastingType === 'variante' ? 'Depende de la variante' : 'No puede lanzar';
  const spellcastingColor = classData.spellcastingType === 'si' ? 'text-emerald-400' : classData.spellcastingType === 'variante' ? 'text-blue-400' : 'text-red-400';

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-8">
        <Link href="/clases">
          <Button variant="secondary">Volver a Clases</Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-10 overflow-visible">
        {/* Left Side - Title and Description */}
        <div className="w-full md:flex-1 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <Icon className={`h-10 w-10 md:h-12 md:w-12 ${iconColor}`} />
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dungeon-100">
              {classData.name}
            </h1>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-dungeon-200 text-base md:text-lg leading-relaxed">
              {classesData.subtitulo}
            </p>
            {fluffData?.intro_long && (
              <div className="mt-4 text-dungeon-300 text-sm md:text-base whitespace-pre-line">
                {fluffData.intro_long.split('\n\n')[0]}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Image with Shadow */}
        {classImage && (
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

      {/* Lore Section */}
      <div className="mb-10 space-y-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-dungeon-100 flex items-center gap-3">
          <BookOpen className="h-7 w-7 text-amber-400" />
          {capitalizeFirst('trasfondo y narrativa')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Adventure Motivation */}
          {classData.motivacion_aventura && (
            <InfoCard
              title={capitalizeFirst("¿por qué se aventuran?")}
              summary={classData.motivacion_aventura_short || classData.motivacion_aventura}
              fullContent={classData.motivacion_aventura}
              icon={<Target className="h-5 w-5" />}
              iconColor="text-emerald-400"
            />
          )}

          {/* Power Source */}
          {classData.tipo_poder_principal && (
            <InfoCard
              title={capitalizeFirst("fuente de poder")}
              summary={classData.descripcion_poder_short || classData.descripcion_poder || `El poder de esta clase proviene de fuentes ${classData.tipo_poder_principal.toLowerCase()}.`}
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
              summary={classData.rol_party_short || classData.rol_party}
              fullContent={classData.rol_party}
              icon={<Users className="h-5 w-5" />}
              iconColor="text-cyan-400"
            />
          )}

          {/* Social Origin */}
          {classData.origen_social && (
            <InfoCard
              title={capitalizeFirst("origen social")}
              summary={classData.origen_social_short || classData.origen_social}
              fullContent={classData.origen_social}
              icon={<Map className="h-5 w-5" />}
              iconColor="text-orange-400"
            />
          )}
        </div>

        {/* Religion & Organization Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Religious Focus */}
          {classData.enfoque_religioso && (
            <InfoCard
              title={capitalizeFirst("enfoque religioso")}
              summary={classData.enfoque_religioso_short || classData.enfoque_religioso}
              fullContent={classData.enfoque_religioso}
              icon={<Church className="h-5 w-5" />}
              iconColor="text-yellow-400"
              additionalInfo={classData.deidades_tipicas ? {
                label: capitalizeFirst('deidades típicas'),
                value: classData.deidades_tipicas
              } : undefined}
            />
          )}

          {/* Magic Info */}
          <InfoCard
            title={capitalizeFirst("conjuros")}
            summary={classData.tiene_magia ? 'Esta clase posee capacidades mágicas.' : 'Esta clase no tiene acceso a magia.'}
            fullContent={classData.tiene_magia ? 'Esta clase posee capacidades mágicas.' : 'Esta clase no tiene acceso a magia.'}
            icon={<Wand2 className="h-5 w-5" />}
            iconColor={spellcastingColor}
            additionalInfo={{
              label: 'Estado',
              value: spellcastingStatus
            }}
            noTruncate={true}
          />
        </div>

        {/* Alignment & Races Row */}
        {(classData.regla_alineamiento || classData.razas_comunes) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {alignmentRule && (
              <InfoCard
                title={capitalizeFirst("restricciones de alineamiento")}
                summary={classData.regla_alineamiento_short || classData.regla_alineamiento}
                fullContent={classData.regla_alineamiento}
                icon={<Shield className="h-5 w-5" />}
                iconColor="text-red-400"
                additionalInfo={{
                  label: 'REGLA',
                  value: renderAlignmentRule(capitalizeFirst(alignmentRule.toLowerCase()), alignmentTrend)
                }}
              />
            )}

            {classData.razas_comunes && (
              <div className="bg-dungeon-900/50 backdrop-blur-sm rounded-xl border border-dungeon-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-5 w-5 text-blue-400" />
                  <h3 className="font-heading text-lg font-bold text-dungeon-100">
                    {capitalizeFirst("razas comunes")}
                  </h3>
                </div>
                <div className="text-sm text-dungeon-300 space-y-2">
                  <p className="mb-3">Aunque cualquier raza puede elegir esta clase, estas son las que más frecuentemente se sienten atraídas por este camino:</p>
                  <div className="flex flex-wrap gap-2">
                    {classData.razas_comunes.split(',').map((race: string) => {
                      const cleanRace = race.trim().replace(/[()]/g, '').split(' ')[0];
                      const raceSlug = generateSlug(cleanRace);
                      return (
                        <Link
                          key={cleanRace}
                          href={`/razas/${raceSlug}`}
                          className="px-3 py-1.5 rounded-lg bg-dungeon-800/80 hover:bg-dungeon-700 border border-dungeon-700 hover:border-blue-500/50 text-dungeon-200 hover:text-blue-300 transition-all duration-200 text-sm font-medium"
                        >
                          {cleanRace}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ClassDetailClient
        classData={classData as any}
        barbarianVariants={isBarbarian ? classVariants : undefined}
        iconColor={iconColor}
        skillsData={skills}
      />
    </div>
  );
}
