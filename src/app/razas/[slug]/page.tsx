import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient, createStaticClient } from '@/lib/supabase/server';
import { DnDRace } from '@/lib/types/race';
import { getRaceIcon, getRaceColor, extractTextColor } from '@/lib/utils/icons';
import { convertSupabaseRace } from '@/lib/data/races-management';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FormattedDistance } from '@/components/ui/FormattedDistance';
import {
  Users,
  TrendingUp,
  Shield,
  BookOpen,
  MessageCircle,
  Sparkles,
  Eye,
  Moon,
  Zap,
  ChevronRight,
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

  // Format ability modifiers
  const abilityMods = Object.entries(raceData.abilityModifiers || {}).map(([key, value]) => {
    const abilityNames: Record<string, string> = {
      strength: 'Fuerza',
      dexterity: 'Destreza',
      constitution: 'Constitución',
      intelligence: 'Inteligencia',
      wisdom: 'Sabiduría',
      charisma: 'Carisma',
    };
    return {
      ability: abilityNames[key] || key,
      modifier: value as number,
    };
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-dungeon-400 mb-6">
        <Link href="/" className="hover:text-dungeon-200 transition-colors">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/razas" className="hover:text-dungeon-200 transition-colors">
          Razas
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-dungeon-200">{raceData.name}</span>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-10 overflow-visible">
        <div className="w-full md:flex-1 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <Icon className={`h-10 w-10 md:h-12 md:w-12 ${iconColor}`} />
            <div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dungeon-100">
                {raceData.name}
              </h1>
              {/* Source Book Badge */}
              {raceData.source?.book && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-900/40 border border-amber-700/50 text-amber-300 text-xs font-semibold">
                    <BookOpen className="h-3.5 w-3.5" />
                    {raceData.source.book}
                  </span>
                  {isSupplemental && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-900/40 border border-amber-700/50 text-amber-300 text-xs font-semibold">
                      <Sparkles className="h-3.5 w-3.5" />
                      Suplementaria
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-dungeon-200 text-base md:text-lg leading-relaxed">
              {raceData.description.split('\n\n')[0]}
            </p>
            {raceData.description.split('\n\n').length > 1 && (
              <div className="mt-4 text-dungeon-300 text-sm md:text-base whitespace-pre-line">
                {raceData.description.split('\n\n').slice(1).join('\n\n')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="border-dungeon-700 bg-dungeon-900/50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-dungeon-400 uppercase tracking-wider flex items-center gap-2">
              <Users className="h-4 w-4" />
              Tamaño y Velocidad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-dungeon-400">Tamaño:</span>
              <span className="text-dungeon-100 font-semibold">{raceData.size}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-dungeon-400">Velocidad:</span>
              <span className="text-dungeon-100 font-semibold">
                <FormattedDistance feet={raceData.speed} />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dungeon-700 bg-dungeon-900/50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-dungeon-400 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Modificadores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {abilityMods.length > 0 ? (
              abilityMods.map(({ ability, modifier }) => (
                <div key={ability} className="flex justify-between items-center">
                  <span className="text-dungeon-400">{ability}:</span>
                  <span className={`font-semibold ${modifier > 0 ? 'text-green-400' : modifier < 0 ? 'text-red-400' : 'text-dungeon-400'}`}>
                    {modifier > 0 ? '+' : ''}{modifier}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-dungeon-400">Sin modificadores</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-dungeon-700 bg-dungeon-900/50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-dungeon-400 uppercase tracking-wider flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Clase y Nivel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-dungeon-400">Clase Favorita:</span>
              <span className="text-dungeon-100 font-semibold">
                {Array.isArray(raceData.favoredClass)
                  ? raceData.favoredClass.join(', ')
                  : raceData.favoredClass}
              </span>
            </div>
            {raceData.levelAdjustment > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-dungeon-400">Ajuste de Nivel:</span>
                <span className="text-amber-400 font-semibold">+{raceData.levelAdjustment}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Special Abilities */}
      {(raceData.specialAbilities?.darkvision || raceData.specialAbilities?.lowLightVision) && (
        <div className="mb-10">
          <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-4 flex items-center gap-2">
            <Eye className="h-6 w-6 text-purple-400" />
            Habilidades Especiales de Visión
          </h2>
          <Card className="border-dungeon-700 bg-dungeon-900/50">
            <CardContent className="pt-6 space-y-3">
              {raceData.specialAbilities.darkvision && (
                <div className="flex items-start gap-3">
                  <Moon className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-dungeon-100">Visión en la Oscuridad</p>
                    <p className="text-sm text-dungeon-400">
                      <FormattedDistance feet={raceData.specialAbilities.darkvision} /> de rango
                    </p>
                  </div>
                </div>
              )}
              {raceData.specialAbilities.lowLightVision && (
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-dungeon-100">Visión con Poca Luz</p>
                    <p className="text-sm text-dungeon-400">
                      Puede ver el doble de lejos que un humano en condiciones de poca luz
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Languages */}
      {(raceData.languages?.automatic?.length || raceData.languages?.bonus?.length) && (
        <div className="mb-10">
          <h2 className="text-2xl font-heading font-bold text-dungeon-100 mb-4 flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-blue-400" />
            Idiomas
          </h2>
          <Card className="border-dungeon-700 bg-dungeon-900/50">
            <CardContent className="pt-6 space-y-3">
              {raceData.languages.automatic && raceData.languages.automatic.length > 0 && (
                <div>
                  <p className="font-semibold text-dungeon-100 mb-1">Idiomas Automáticos:</p>
                  <p className="text-sm text-dungeon-400">{raceData.languages.automatic.join(', ')}</p>
                </div>
              )}
              {raceData.languages.bonus && raceData.languages.bonus.length > 0 && (
                <div>
                  <p className="font-semibold text-dungeon-100 mb-1">Idiomas Bonus:</p>
                  <p className="text-sm text-dungeon-400">{raceData.languages.bonus.join(', ')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Warning Banner for Supplemental Races */}
      {isSupplemental && (
        <Card className="bg-amber-900/20 border-amber-800/50 mt-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-amber-300">
                  Raza Suplementaria
                </p>
                <p className="text-sm text-amber-200/80">
                  Esta raza proviene de un libro suplementario. Algunas opciones pueden tener ajuste de nivel y requieren aprobación del DM antes de usarse en una campaña.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
