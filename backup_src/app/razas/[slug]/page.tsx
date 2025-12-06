import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Eye, Zap, AlertTriangle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/server';
import { DnDRace } from '@/lib/types/race';
import { getRaceIcon, getRaceColor, extractTextColor } from '@/lib/utils/icons';

export const revalidate = 3600; // Revalidar cada hora

interface SupabaseRace {
  id: string;
  slug: string;
  name: string;
  size: string;
  base_speed: number;
  ability_adjustments: {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  racial_traits: string[];
  automatic_languages: string[];
  bonus_languages: string[];
  favored_class: string;
  level_adjustment: number;
  creature_type: string;
  subtypes: string[] | null;
  darkvision: number | null;
  low_light_vision: boolean;
  description: string;
  source_book: string;
  source_page: number | null;
}

function convertSupabaseRace(race: SupabaseRace): DnDRace {
  const abilityModifiers: any = {};

  if (race.ability_adjustments.str !== 0) abilityModifiers.strength = race.ability_adjustments.str;
  if (race.ability_adjustments.dex !== 0) abilityModifiers.dexterity = race.ability_adjustments.dex;
  if (race.ability_adjustments.con !== 0) abilityModifiers.constitution = race.ability_adjustments.con;
  if (race.ability_adjustments.int !== 0) abilityModifiers.intelligence = race.ability_adjustments.int;
  if (race.ability_adjustments.wis !== 0) abilityModifiers.wisdom = race.ability_adjustments.wis;
  if (race.ability_adjustments.cha !== 0) abilityModifiers.charisma = race.ability_adjustments.cha;

  return {
    id: race.slug,
    name: race.name,
    slug: race.slug,
    shortDescription: race.description.split('\n\n')[0].substring(0, 150) + '...',
    description: race.description,
    size: race.size as 'Diminuto' | 'Menudo' | 'Pequeño' | 'Mediano' | 'Grande' | 'Enorme' | 'Gargantuesco',
    speed: race.base_speed,
    type: race.creature_type as 'Humanoide' | 'Monstruoso' | 'Dragón' | 'Gigante' | 'Aberración' | 'Elemental' | 'Feérico' | 'Muerto viviente',
    abilityModifiers,
    racialTraits: race.racial_traits.map(trait => ({
      name: trait,
      description: '',
      type: 'habilidad especial'
    })),
    languages: {
      automatic: race.automatic_languages,
      bonus: race.bonus_languages
    },
    specialAbilities: {
      darkvision: race.darkvision || undefined,
      lowLightVision: race.low_light_vision
    },
    favoredClass: race.favored_class,
    levelAdjustment: race.level_adjustment,
    typicalAlignment: '',
    advantageousClasses: [],
    source: {
      book: race.source_book,
      page: race.source_page || 0
    }
  };
}

interface RacePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const formatAbilityModifiers = (modifiers: DnDRace['abilityModifiers']) => {
  const entries: { ability: string; modifier: number }[] = [];

  if (modifiers.strength) entries.push({ ability: 'Fuerza', modifier: modifiers.strength });
  if (modifiers.dexterity) entries.push({ ability: 'Destreza', modifier: modifiers.dexterity });
  if (modifiers.constitution) entries.push({ ability: 'Constitución', modifier: modifiers.constitution });
  if (modifiers.intelligence) entries.push({ ability: 'Inteligencia', modifier: modifiers.intelligence });
  if (modifiers.wisdom) entries.push({ ability: 'Sabiduría', modifier: modifiers.wisdom });
  if (modifiers.charisma) entries.push({ ability: 'Carisma', modifier: modifiers.charisma });

  return entries;
};

// Metadata dinámica para SEO
export async function generateMetadata({ params }: RacePageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: raceData } = await supabase
    .from('races')
    .select('name, description, size, base_speed, creature_type, source_book, level_adjustment')
    .eq('slug', slug)
    .single();

  if (!raceData) {
    return {
      title: 'Raza no encontrada - Compendio Arcano',
    };
  }

  const title = `${raceData.name} - Compendio Arcano`;
  const description = raceData.description.slice(0, 160);
  const isSupplemental = raceData.source_book !== 'Manual del Jugador' && raceData.source_book !== "Player's Handbook";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'Compendio Arcano',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    keywords: [
      raceData.name,
      'D&D 3.5',
      'Dungeons & Dragons',
      'raza',
      'race',
      raceData.size,
      raceData.creature_type,
      isSupplemental ? 'suplemento' : 'Player\'s Handbook',
      raceData.level_adjustment > 0 ? `LA +${raceData.level_adjustment}` : 'LA 0',
    ],
  };
}

export default async function RacePage({ params }: RacePageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Obtener la raza de Supabase
  const { data: raceFromDb, error } = await supabase
    .from('races')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !raceFromDb) {
    notFound();
  }

  const raceData = convertSupabaseRace(raceFromDb);
  const isSupplemental = raceData.source?.book !== 'Manual del Jugador' && raceData.source?.book !== "Player's Handbook";
  const Icon = getRaceIcon(raceData.name);
  const colorClasses = getRaceColor(raceData.name);
  const iconColor = extractTextColor(colorClasses);
  const abilityMods = formatAbilityModifiers(raceData.abilityModifiers);

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-8">
        <Link href="/razas">
          <Button variant="secondary">Volver a Razas</Button>
        </Link>
      </div>

      {/* Header */}
      <div className="border-l-4 border-gold-500 pl-6 mb-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <Icon className={`h-8 w-8 ${iconColor}`} />
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
              {raceData.name}
            </h1>
          </div>
          {isSupplemental && (
            <span className="text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded bg-amber-900/50 text-amber-400 border border-amber-700/50">
              Suplemento
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
            <span className="text-dungeon-500">Tamaño:</span> {raceData.size}
          </span>
          <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
            <span className="text-dungeon-500">Velocidad:</span> {raceData.speed} pies
          </span>
          <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
            <span className="text-dungeon-500">Tipo:</span> {raceData.type}
          </span>
          {raceData.specialAbilities?.darkvision && (
            <span className="px-3 py-1 rounded bg-spell-blue/20 text-spell-blue border border-spell-blue/30">
              <Eye className="h-3 w-3 inline mr-1" />
              Visión oscura {raceData.specialAbilities.darkvision} pies
            </span>
          )}
          {raceData.specialAbilities?.lowLightVision && (
            <span className="px-3 py-1 rounded bg-gold-500/20 text-gold-500 border border-gold-500/30">
              <Eye className="h-3 w-3 inline mr-1" />
              Visión con poca luz
            </span>
          )}
        </div>
      </div>

      {/* Warning for supplemental races */}
      {isSupplemental && (
        <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-400 font-semibold mb-1">
                Raza Suplementaria
              </p>
              <p className="text-sm text-dungeon-300">
                Esta raza proviene de {raceData.source?.book} y requiere aprobación del Dungeon Master antes de ser utilizada en una campaña.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Descripción */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Descripción</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dungeon-300 leading-relaxed">{raceData.description}</p>
        </CardContent>
      </Card>

      {/* Modificadores de Habilidad */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Modificadores de Habilidad</CardTitle>
        </CardHeader>
        <CardContent>
          {abilityMods.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {abilityMods.map((mod) => (
                <div
                  key={mod.ability}
                  className={`p-3 rounded border ${
                    mod.modifier > 0
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  <div className="text-sm font-semibold">{mod.ability}</div>
                  <div className="text-2xl font-bold font-mono">
                    {mod.modifier > 0 ? '+' : ''}{mod.modifier}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-dungeon-400">No hay modificadores de habilidad</p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {raceData.favoredClass && (
              <div>
                <span className="text-sm font-semibold text-gold-500">Clase Favorita:</span>
                <p className="text-sm text-dungeon-300">
                  {Array.isArray(raceData.favoredClass)
                    ? raceData.favoredClass.join(', ')
                    : raceData.favoredClass}
                </p>
              </div>
            )}
            <div>
              <span className="text-sm font-semibold text-gold-500">Ajuste de Nivel:</span>
              <p className="text-sm text-dungeon-300">
                {raceData.levelAdjustment === 0 ? 'Ninguno' : `+${raceData.levelAdjustment}`}
              </p>
            </div>
            {raceData.typicalAlignment && (
              <div>
                <span className="text-sm font-semibold text-gold-500">Alineamiento Típico:</span>
                <p className="text-sm text-dungeon-300">{raceData.typicalAlignment}</p>
              </div>
            )}
            {raceData.advantageousClasses && raceData.advantageousClasses.length > 0 && (
              <div>
                <span className="text-sm font-semibold text-gold-500">Clases Ventajosas:</span>
                <p className="text-sm text-dungeon-300">{raceData.advantageousClasses.join(', ')}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Idiomas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Idiomas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm font-semibold text-gold-500">Automáticos:</span>
              <p className="text-sm text-dungeon-300">{raceData.languages.automatic.join(', ')}</p>
            </div>
            {raceData.languages.bonus && raceData.languages.bonus.length > 0 && (
              <div>
                <span className="text-sm font-semibold text-gold-500">Adicionales:</span>
                <p className="text-sm text-dungeon-300">{raceData.languages.bonus.join(', ')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Rasgos Raciales */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Rasgos Raciales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {raceData.racialTraits.map((trait, index) => (
              <div
                key={index}
                className="border-l-2 border-gold-500/30 pl-4 py-2"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <h4 className="text-base font-semibold text-dungeon-100">{trait.name}</h4>
                  {trait.type && (
                    <span className="text-xs px-2 py-0.5 rounded bg-dungeon-800 text-dungeon-400 border border-dungeon-700">
                      {trait.type}
                    </span>
                  )}
                </div>
                <p className="text-sm text-dungeon-300">{trait.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competencias (si las hay) */}
      {((raceData.weaponProficiencies && raceData.weaponProficiencies.length > 0) ||
        (raceData.armorProficiencies && raceData.armorProficiencies.length > 0)) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Competencias Automáticas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {raceData.weaponProficiencies && raceData.weaponProficiencies.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gold-500 mb-2">Armas</h4>
                <p className="text-sm text-dungeon-300">{raceData.weaponProficiencies.join(', ')}</p>
              </div>
            )}
            {raceData.armorProficiencies && raceData.armorProficiencies.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gold-500 mb-2">Armaduras</h4>
                <p className="text-sm text-dungeon-300">{raceData.armorProficiencies.join(', ')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Información de fuente */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-dungeon-400">
          <BookOpen className="h-4 w-4" />
          <span>
            Fuente: <span className="text-dungeon-300">{raceData.source.book}</span>
            {raceData.source.page && raceData.source.page > 0 && (
              <>, página {raceData.source.page}</>
            )}
          </span>
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

  // Usar createClient directamente desde @supabase/supabase-js para build time
  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');

  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: races } = await supabase
    .from('races')
    .select('slug');

  if (!races) return [];

  return races.map((race) => ({
    slug: race.slug,
  }));
}
