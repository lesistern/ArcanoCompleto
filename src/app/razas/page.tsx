import { AlertTriangle } from 'lucide-react';
import RaceCard from '@/components/RaceCard';
import { createClient } from '@/lib/supabase/server';
import { DnDRace } from '@/lib/types/race';

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

// Convertir datos de Supabase al formato DnDRace
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

export default async function RacesPage() {
  const supabase = await createClient();

  // Obtener todas las razas de Supabase
  const { data: racesFromDb, error } = await supabase
    .from('races')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching races:', error);
  }

  const races: DnDRace[] = racesFromDb
    ? racesFromDb.map(convertSupabaseRace)
    : [];

  // Categorizar razas
  const playerHandbookRaces = races.filter(r =>
    r.source?.book === 'Manual del Jugador' || r.source?.book === "Player's Handbook"
  );

  const supplementalRaces = races.filter(r =>
    r.source?.book !== 'Manual del Jugador' && r.source?.book !== "Player's Handbook"
  );

  // Subcategorizar razas del PH
  const commonRaces = playerHandbookRaces.filter(r =>
    ['Humano', 'Elfo', 'Enano', 'Mediano'].includes(r.name)
  );

  const uncommonRaces = playerHandbookRaces.filter(r =>
    ['Gnomo', 'Semielfo', 'Semiorco'].includes(r.name)
  );

  // Agrupar razas suplementarias por libro
  const racesByBook: Record<string, DnDRace[]> = {};
  supplementalRaces.forEach(race => {
    const book = race.source?.book || 'Otros';
    if (!racesByBook[book]) {
      racesByBook[book] = [];
    }
    racesByBook[book].push(race);
  });

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 mb-3">
          Razas de D&D 3.5
        </h1>
        <p className="text-lg text-dungeon-300">
          {races.length} razas disponibles ({playerHandbookRaces.length} del Player's Handbook, {supplementalRaces.length} de suplementos)
        </p>
      </div>

      {/* Razas del Player's Handbook */}
      <div className="mb-16">
        <div className="border-l-4 border-dungeon-500 pl-6 mb-8">
          <h2 className="text-3xl font-heading font-bold text-dungeon-100 mb-2">
            Player's Handbook
          </h2>
          <p className="text-sm text-dungeon-400">
            Las 7 razas principales de D&D 3.5
          </p>
        </div>

        {/* Razas Comunes */}
        <div className="mb-12">
          <div className="mb-6">
            <h3 className="text-xl font-heading font-bold text-dungeon-100 mb-2">
              Razas Comunes
            </h3>
            <p className="text-sm text-dungeon-400">
              Las razas más frecuentes en el mundo de D&D
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {commonRaces.map((raceData) => (
              <RaceCard key={raceData.id} raceData={raceData} />
            ))}
          </div>
        </div>

        {/* Razas Poco Comunes */}
        <div className="mb-12">
          <div className="mb-6">
            <h3 className="text-xl font-heading font-bold text-dungeon-100 mb-2">
              Razas Poco Comunes
            </h3>
            <p className="text-sm text-dungeon-400">
              Razas híbridas y menos frecuentes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {uncommonRaces.map((raceData) => (
              <RaceCard key={raceData.id} raceData={raceData} />
            ))}
          </div>
        </div>
      </div>

      {/* Razas Suplementarias */}
      {supplementalRaces.length > 0 && (
        <div className="mb-16">
          <div className="border-l-4 border-amber-500 pl-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-heading font-bold text-dungeon-100 mb-2">
                  Razas Suplementarias
                </h2>
                <p className="text-sm text-amber-400 mb-2">
                  ⚠️ Estas razas requieren aprobación del Dungeon Master
                </p>
                <p className="text-sm text-dungeon-400">
                  Razas de libros suplementarios como Races of Stone, Races of Destiny y Races of the Wild
                </p>
              </div>
            </div>
          </div>

          {Object.entries(racesByBook).map(([book, bookRaces]) => (
            <div key={book} className="mb-12">
              <div className="mb-6">
                <h3 className="text-xl font-heading font-bold text-amber-300 mb-1">
                  {book}
                </h3>
                <p className="text-sm text-dungeon-400">
                  {bookRaces.length} {bookRaces.length === 1 ? 'raza' : 'razas'} disponibles
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {bookRaces.map((raceData) => (
                  <RaceCard key={raceData.id} raceData={raceData} supplemental />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Información adicional */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
          Información de Razas
        </h3>
        <div className="space-y-3 text-sm text-dungeon-300">
          <p>
            La elección de raza es fundamental al crear un personaje, ya que proporciona
            modificadores de habilidad, rasgos especiales y ventajas únicas.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">Clase Favorita:</span> Los personajes
            multiclase no sufren penalización de XP si la clase favorecida es una de sus clases.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">Ajuste de Nivel (LA):</span> Algunas razas
            poderosas tienen un ajuste de nivel, lo que significa que cuentan como un nivel más
            alto para determinar el nivel efectivo del personaje (ECL = Nivel de Clase + LA).
          </p>
          <p>
            <span className="text-amber-500 font-semibold">⚠️ Razas Suplementarias:</span> Las razas
            marcadas provienen de libros suplementarios y deben ser aprobadas por el DM antes de usarse
            en una campaña.
          </p>
        </div>
      </div>
    </div>
  );
}
