import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient, createStaticClient } from '@/lib/supabase/server';
import { DnDRace } from '@/lib/types/race';
import { getRaceIcon, getRaceColor, extractTextColor } from '@/lib/utils/icons';
import { convertSupabaseRace } from '@/lib/data/races-management';
import { Button } from '@/components/ui/Button';
import { FormattedDistance } from '@/components/ui/FormattedDistance';
import {
  ArrowLeft,
  Users,
  Footprints,
  Shield,
  BookOpen,
  MessageCircle,
  Sparkles,
  Eye,
  Moon,
  Zap,
  Swords,
  Heart,
  Brain,
  Star,
  TrendingUp,
  Award
} from 'lucide-react';

export const revalidate = 3600;

interface RacePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: RacePageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createStaticClient();

  const { data: race } = await supabase
    .from('races')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!race) {
    return {
      title: 'Raza no encontrada | D&D Compendium',
    };
  }

  const raceName = race.name;
  const description = race.description.split('\n\n')[0].substring(0, 160);

  return {
    title: `${raceName} | Razas de D&D 3.5 | D&D Compendium`,
    description,
    keywords: [
      'D&D 3.5',
      'raza',
      raceName,
      'Dungeons & Dragons',
      'personaje',
      'rasgos raciales',
    ].join(', '),
    openGraph: {
      title: `${raceName} - Raza de D&D 3.5`,
      description,
      type: 'article',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(raceName)}&type=Raza&description=${encodeURIComponent(description)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const supabase = await createStaticClient();
  const { data: races } = await supabase.from('races').select('slug');

  if (!races) return [];

  return races.map((race) => ({
    slug: race.slug,
  }));
}

export default async function RacePage({ params }: RacePageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: raceFromDb, error } = await supabase
    .from('races')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !raceFromDb) {
    notFound();
  }

  const raceData: DnDRace = convertSupabaseRace(raceFromDb);

  const Icon = getRaceIcon(raceData.name);
  const colorClasses = getRaceColor(raceData.name);
  const iconColor = extractTextColor(colorClasses);

  // Check if race is supplemental
  const isSupplemental = raceData.source?.book !== "Player's Handbook" && raceData.source?.book !== 'Manual del Jugador';

  // Format ability modifiers with icons
  const abilityMods = [
    {
      name: 'Fuerza',
      value: raceData.abilityModifiers.strength || 0,
      icon: Swords,
      color: 'text-red-400'
    },
    {
      name: 'Destreza',
      value: raceData.abilityModifiers.dexterity || 0,
      icon: Zap,
      color: 'text-green-400'
    },
    {
      name: 'Constitución',
      value: raceData.abilityModifiers.constitution || 0,
      icon: Heart,
      color: 'text-pink-400'
    },
    {
      name: 'Inteligencia',
      value: raceData.abilityModifiers.intelligence || 0,
      icon: Brain,
      color: 'text-blue-400'
    },
    {
      name: 'Sabiduría',
      value: raceData.abilityModifiers.wisdom || 0,
      icon: Eye,
      color: 'text-purple-400'
    },
    {
      name: 'Carisma',
      value: raceData.abilityModifiers.charisma || 0,
      icon: Star,
      color: 'text-yellow-400'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Back Button */}
      <Link href="/razas">
        <Button variant="ghost" size="sm" className="mb-4 text-gray-400 hover:text-gray-300">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Razas
        </Button>
      </Link>

      {/* Hero Section - Igual que guia-principiante */}
      <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl mb-8">
        <div className={`absolute inset-0 bg-gradient-to-br from-dungeon-950 via-dungeon-900/90 ${colorClasses.replace('text-', 'to-')}/30`} />
        <div className="relative p-8 md:p-12">
          <div className="flex items-center gap-4 mb-4">
            <Icon className={`h-12 w-12 ${iconColor}`} />
            <div>
              <div className={`text-xs font-mono uppercase tracking-wider ${iconColor} mb-2`}>
                {isSupplemental ? 'Raza Suplementaria' : 'Raza del Player\'s Handbook'}
              </div>
              <h1 className={`text-4xl md:text-5xl font-bold ${iconColor}`}>
                {raceData.name}
              </h1>
            </div>
          </div>
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl">
            {raceData.description.split('\n\n')[0]}
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {/* Warning Banner for Supplemental Races */}
        {isSupplemental && (
          <div className="bg-gradient-to-r from-amber-900/30 via-orange-900/30 to-amber-900/30 border border-amber-500/30 rounded-lg p-6">
            <div className="flex gap-4 items-start">
              <Sparkles className="h-8 w-8 text-amber-400 flex-shrink-0 animate-pulse" />
              <div>
                <h2 className="text-xl font-bold text-amber-300 mb-2">Raza Suplementaria</h2>
                <p className="text-gray-400 leading-relaxed">
                  Esta raza proviene del libro <strong>{raceData.source?.book}</strong>. Las opciones pueden tener ajuste de nivel y requieren aprobación del DM antes de usarse en una campaña.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Características Básicas */}
        <section>
          <h2 className="text-2xl font-bold text-gold-400 mb-4 flex items-center gap-2">
            <Users className="h-6 w-6" />
            Características Básicas
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg p-4 hover:border-gold-400/50 transition-colors">
              <div className="flex gap-3">
                <Users className="h-6 w-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-300 mb-1">Tamaño</h3>
                  <p className="text-sm text-gray-400">{raceData.size}</p>
                </div>
              </div>
            </div>

            <div className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg p-4 hover:border-gold-400/50 transition-colors">
              <div className="flex gap-3">
                <Footprints className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-300 mb-1">Velocidad</h3>
                  <p className="text-sm text-gray-400">
                    <FormattedDistance feet={raceData.speed} />
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg p-4 hover:border-gold-400/50 transition-colors">
              <div className="flex gap-3">
                <Shield className="h-6 w-6 text-gold-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-300 mb-1">Clase Favorita</h3>
                  <p className="text-sm text-gray-400">
                    {Array.isArray(raceData.favoredClass)
                      ? raceData.favoredClass.join(', ')
                      : raceData.favoredClass}
                  </p>
                </div>
              </div>
            </div>

            {raceData.levelAdjustment > 0 && (
              <div className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg p-4 hover:border-gold-400/50 transition-colors">
                <div className="flex gap-3">
                  <Award className="h-6 w-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-300 mb-1">Ajuste de Nivel</h3>
                    <p className="text-sm text-amber-300 font-bold">+{raceData.levelAdjustment}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Modificadores de Habilidad */}
        <section>
          <h2 className="text-2xl font-bold text-gold-400 mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Modificadores de Habilidad
          </h2>
          <p className="text-gray-400 mb-6">
            Bonificadores raciales que se aplican a las puntuaciones de habilidad de tu personaje.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {abilityMods.map((mod, idx) => (
              <div key={idx} className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg p-4">
                <div className="flex gap-3">
                  <mod.icon className={`h-5 w-5 ${mod.color} flex-shrink-0 mt-1`} />
                  <div>
                    <h3 className="font-bold text-gray-300 mb-1">{mod.name}</h3>
                    <p className={`text-sm font-semibold ${mod.value > 0 ? 'text-green-400' : mod.value < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                      {mod.value > 0 ? '+' : ''}{mod.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Habilidades Especiales de Visión */}
        {(raceData.specialAbilities?.darkvision || raceData.specialAbilities?.lowLightVision) && (
          <section>
            <h2 className="text-2xl font-bold text-gold-400 mb-4 flex items-center gap-2">
              <Eye className="h-6 w-6" />
              Habilidades Especiales de Visión
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {raceData.specialAbilities.darkvision && (
                <div className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Moon className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-300 mb-1">Visión en la Oscuridad</h3>
                      <p className="text-sm text-gray-400">
                        Rango de <FormattedDistance feet={raceData.specialAbilities.darkvision} />
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {raceData.specialAbilities.lowLightVision && (
                <div className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Zap className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-300 mb-1">Visión con Poca Luz</h3>
                      <p className="text-sm text-gray-400">
                        Puede ver el doble de lejos que un humano en condiciones de poca luz
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Idiomas */}
        {(raceData.languages?.automatic?.length || raceData.languages?.bonus?.length) && (
          <section>
            <h2 className="text-2xl font-bold text-gold-400 mb-4 flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Idiomas
            </h2>
            <div className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg p-6">
              <div className="space-y-4">
                {raceData.languages.automatic && raceData.languages.automatic.length > 0 && (
                  <div className="flex gap-3">
                    <BookOpen className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-300 mb-1">Idiomas Automáticos</h3>
                      <p className="text-sm text-gray-400">{raceData.languages.automatic.join(', ')}</p>
                    </div>
                  </div>
                )}
                {raceData.languages.bonus && raceData.languages.bonus.length > 0 && (
                  <div className="flex gap-3">
                    <Sparkles className="h-5 w-5 text-amber-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-300 mb-1">Idiomas Bonus</h3>
                      <p className="text-sm text-gray-400">{raceData.languages.bonus.join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Descripción Completa */}
        {raceData.description.split('\n\n').length > 1 && (
          <section>
            <h2 className="text-2xl font-bold text-gold-400 mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Descripción Completa
            </h2>
            <div className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg p-6">
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-400 text-sm md:text-base whitespace-pre-line leading-relaxed">
                  {raceData.description.split('\n\n').slice(1).join('\n\n')}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="text-center pt-8 border-t border-dungeon-700">
          <p className="text-gray-400 mb-6 text-lg">
            ¿Listo para crear un personaje de esta raza?
          </p>
          <Link href="/editor-personajes">
            <Button size="lg" className={`bg-gradient-to-r ${colorClasses.replace('text-', 'from-')}/80 ${colorClasses.replace('text-', 'to-')}/60 hover:${colorClasses.replace('text-', 'from-')}/70 hover:${colorClasses.replace('text-', 'to-')}/50 text-white border-0`}>
              <Users className="h-5 w-5 mr-2" />
              Crear Personaje
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
