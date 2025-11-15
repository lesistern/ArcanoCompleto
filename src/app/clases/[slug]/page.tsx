import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/server';
import { getClassIcon } from '@/lib/utils/icons';

// ISR: Revalidar cada 24 horas (contenido estático)
export const revalidate = 86400;

interface ClassPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Metadata dinámica para SEO
export async function generateMetadata({ params }: ClassPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: classData } = await supabase
    .from('classes')
    .select('name, description, hit_die, skill_points_per_level, bab_progression')
    .eq('slug', slug)
    .single();

  if (!classData) {
    return {
      title: 'Clase no encontrada - D&D 3.5 Compendium',
    };
  }

  const title = `${classData.name} - D&D 3.5 Compendium`;
  const description = classData.description.slice(0, 160);
  const babText = classData.bab_progression === 'good' ? 'Bueno' : classData.bab_progression === 'medium' ? 'Medio' : 'Bajo';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'D&D 3.5 Compendium',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    keywords: [
      classData.name,
      'D&D 3.5',
      'Dungeons & Dragons',
      'clase',
      'character class',
      classData.hit_die,
      `BAB ${babText}`,
    ],
  };
}

export default async function ClassPage({ params }: ClassPageProps) {
  const { slug } = await params;

  // Fetch class from Supabase con cached query
  const { getClassBySlug } = await import('@/lib/supabase/cached-queries');
  const classFromDB = await getClassBySlug(slug);

  if (!classFromDB) {
    notFound();
  }

  // Map database format to display format
  const classData = {
    id: classFromDB.slug,
    name: classFromDB.name,
    slug: classFromDB.slug,
    hitDie: classFromDB.hit_die,
    skillPoints: classFromDB.skill_points_per_level,
    classSkills: classFromDB.class_skills || [],
    weaponProficiencies: classFromDB.weapon_proficiencies || [],
    armorProficiencies: classFromDB.armor_proficiencies || [],
    description: classFromDB.description,
    babProgression: classFromDB.bab_progression,
    fortitudeSave: classFromDB.fortitude_save,
    reflexSave: classFromDB.reflex_save,
    willSave: classFromDB.will_save,
  };

  const Icon = getClassIcon(classData.name);

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-8">
        <Link href="/clases">
          <Button variant="secondary">Volver a Clases</Button>
        </Link>
      </div>

      {/* Header */}
      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <div className="flex items-center gap-4 mb-3">
          <Icon className="h-8 w-8 text-class-green" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
            {classData.name}
          </h1>
        </div>
        <p className="text-lg text-dungeon-300 mb-4">{classData.description}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
            <span className="text-dungeon-500">DG:</span> {classData.hitDie}
          </span>
          <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
            <span className="text-dungeon-500">Puntos de habilidad:</span>{' '}
            {classData.skillPoints} + mod. Int
          </span>
          <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
            <span className="text-dungeon-500">BAB:</span>{' '}
            {classData.babProgression === 'good' ? 'Bueno' : classData.babProgression === 'medium' ? 'Medio' : 'Bajo'}
          </span>
        </div>
      </div>

      {/* Información básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Competencias */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Competencias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gold-500 mb-2">Armas</h4>
              <div className="text-sm text-dungeon-300 space-y-1">
                {classData.weaponProficiencies.length > 0 ? (
                  classData.weaponProficiencies.map((prof: string) => (
                    <p key={prof}>• {prof.charAt(0).toUpperCase() + prof.slice(1)}</p>
                  ))
                ) : (
                  <p className="text-dungeon-500">Limitadas</p>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gold-500 mb-2">Armaduras</h4>
              <div className="text-sm text-dungeon-300 space-y-1">
                {classData.armorProficiencies.length > 0 ? (
                  classData.armorProficiencies.map((prof: string) => (
                    <p key={prof}>• {prof.charAt(0).toUpperCase() + prof.slice(1)}</p>
                  ))
                ) : (
                  <p className="text-dungeon-500">Ninguna</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Salvaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tiradas de Salvación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs text-dungeon-500 mb-1">Fortaleza</p>
                <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                  classData.fortitudeSave === 'good'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-dungeon-800 text-dungeon-400 border border-dungeon-700'
                }`}>
                  {classData.fortitudeSave === 'good' ? 'Buena' : 'Pobre'}
                </span>
              </div>
              <div className="text-center">
                <p className="text-xs text-dungeon-500 mb-1">Reflejos</p>
                <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                  classData.reflexSave === 'good'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-dungeon-800 text-dungeon-400 border border-dungeon-700'
                }`}>
                  {classData.reflexSave === 'good' ? 'Buena' : 'Pobre'}
                </span>
              </div>
              <div className="text-center">
                <p className="text-xs text-dungeon-500 mb-1">Voluntad</p>
                <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                  classData.willSave === 'good'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-dungeon-800 text-dungeon-400 border border-dungeon-700'
                }`}>
                  {classData.willSave === 'good' ? 'Buena' : 'Pobre'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Habilidades de clase */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Habilidades de Clase</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {classData.classSkills.map((skill: string) => (
              <span
                key={skill}
                className="text-xs px-2 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-xs text-dungeon-500">
            Puntos de habilidad por nivel: {classData.skillPoints} + modificador de Inteligencia
          </p>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6 mb-8">
        <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
          Acerca de {classData.name}
        </h3>
        <div className="space-y-3 text-sm text-dungeon-300">
          <p>
            <span className="text-gold-500 font-semibold">Dado de Golpe:</span> {classData.hitDie} - Determina los puntos de golpe que gana el personaje en cada nivel.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">BAB:</span> {classData.babProgression === 'good' ? 'Bueno' : classData.babProgression === 'medium' ? 'Medio' : 'Bajo'} - Tasa de crecimiento del Bonus de Ataque Base.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">Habilidades de clase:</span> {classData.classSkills.length} habilidades disponibles como habilidades de clase.
          </p>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  // Skip static generation if env vars not available (use dynamic rendering)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [];
  }

  // Usar cliente directo sin cookies para build-time
  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: classes } = await supabase
    .from('classes')
    .select('slug');

  return (classes || []).map((classData) => ({
    slug: classData.slug,
  }));
}
