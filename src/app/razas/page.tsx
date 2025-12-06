import { createClient } from '@/lib/supabase/server';
import { DnDRace } from '@/lib/types/race';
import { convertSupabaseRace, categorizeRaces } from '@/lib/data/races-management';
import RacesClient from './RacesClient';

export const revalidate = 3600; // Revalidar cada hora

export default async function RacesPage() {
  const supabase = await createClient();

  // Obtener todas las razas de Supabase
  const { data: racesFromDb, error } = await supabase
    .from('races')
    .select('*');

  if (error || !racesFromDb) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Razas</h1>
        <p className="text-red-600">Error al cargar las razas</p>
      </div>
    );
  }

  // Convertir todas las razas al formato DnDRace
  const allRaces: DnDRace[] = racesFromDb.map(convertSupabaseRace);

  // Categorizar razas en PHB y Suplementarias
  const { playerHandbookRaces, supplementalRaces } = categorizeRaces(allRaces);

  // Ordenar alfabéticamente
  const phbRaces = playerHandbookRaces.sort((a, b) => a.name.localeCompare(b.name, 'es'));
  const supplementalRacesSorted = supplementalRaces.sort((a, b) => a.name.localeCompare(b.name, 'es'));

  return (
    <div className="container mx-auto px-4 py-8">
      <RacesClient
        phbRaces={phbRaces}
        supplementalRaces={supplementalRacesSorted}
      />
    </div>
  );
}
