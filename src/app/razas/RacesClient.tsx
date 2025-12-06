'use client';

import { useState, useMemo } from 'react';
import { DnDRace } from '@/lib/types/race';
import RaceCard from '@/components/races/RaceCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Search,
  Users,
  BookOpen,
  Sparkles,
  Info,
  AlertCircle,
} from 'lucide-react';

interface RacesClientProps {
  phbRaces: DnDRace[];
  supplementalRaces: DnDRace[];
}

export default function RacesClient({ phbRaces, supplementalRaces }: RacesClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Filtrar razas por categoría
  const filteredRaces = useMemo(() => {
    let racesToFilter: DnDRace[] = [];

    switch (selectedCategory) {
      case 'PHB':
        racesToFilter = phbRaces;
        break;
      case 'Suplementos':
        racesToFilter = supplementalRaces;
        break;
      default: // 'Todas'
        racesToFilter = [...phbRaces, ...supplementalRaces];
    }

    if (searchTerm) {
      return racesToFilter.filter((race) =>
        race.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return racesToFilter;
  }, [searchTerm, selectedCategory, phbRaces, supplementalRaces]);

  // Separate filtered races for display
  const filteredPhbRaces = useMemo(() => {
    if (selectedCategory === 'Suplementos') return [];
    return filteredRaces.filter(race => phbRaces.some(phb => phb.id === race.id));
  }, [filteredRaces, phbRaces, selectedCategory]);

  const filteredSupplementalRaces = useMemo(() => {
    if (selectedCategory === 'PHB') return [];
    return filteredRaces.filter(race => supplementalRaces.some(sup => sup.id === race.id));
  }, [filteredRaces, supplementalRaces, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl">
        {/* Background texture and gradient */}
        <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dungeon-950 via-dungeon-900/90 to-dungeon-950/50"></div>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-dungeon-100 leading-tight">
              Razas de Personaje
            </h1>
            <p className="text-lg text-dungeon-300">
              Explora las diferentes razas jugables de D&D 3.5. Desde las razas clásicas del Manual del Jugador hasta opciones suplementarias de libros adicionales.
            </p>

            {/* Stats badges */}
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-lg bg-dungeon-950/50 border border-dungeon-700 backdrop-blur-sm">
                <p className="text-sm text-dungeon-400">Total de razas</p>
                <p className="text-2xl font-bold text-dungeon-100">{phbRaces.length + supplementalRaces.length}</p>
              </div>
              <div className="px-4 py-2 rounded-lg bg-dungeon-950/50 border border-dungeon-700 backdrop-blur-sm">
                <p className="text-sm text-dungeon-400">Del PHB</p>
                <p className="text-2xl font-bold text-green-400">{phbRaces.length}</p>
              </div>
              <div className="px-4 py-2 rounded-lg bg-dungeon-950/50 border border-dungeon-700 backdrop-blur-sm">
                <p className="text-sm text-dungeon-400">Suplementarias</p>
                <p className="text-2xl font-bold text-amber-400">{supplementalRaces.length}</p>
              </div>
            </div>
          </div>

          {/* Icon */}
          <div className="p-6 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-sm">
            <Users className="h-12 w-12 text-green-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-dungeon-900 border-dungeon-800">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dungeon-500" />
              <input
                type="text"
                placeholder="Buscar razas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded-lg text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2">
              {['Todas', 'PHB', 'Suplementos'].map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={selectedCategory === category ? '' : 'bg-dungeon-800 border-dungeon-700 hover:bg-dungeon-700'}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count */}
          {searchTerm && (
            <p className="mt-4 text-sm text-dungeon-400">
              {filteredRaces.length} resultado{filteredRaces.length !== 1 ? 's' : ''} encontrado{filteredRaces.length !== 1 ? 's' : ''}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Info Cards - Only show when no search/filter active */}
      {!searchTerm && selectedCategory === 'Todas' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-dungeon-900 border-dungeon-800 hover:border-green-500/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <BookOpen className="h-5 w-5" />
                Razas del PHB
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dungeon-400">
                Las 7 razas clásicas del Manual del Jugador. Balanceadas y probadas, perfectas para nuevos jugadores.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-dungeon-900 border-dungeon-800 hover:border-amber-500/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-400">
                <Sparkles className="h-5 w-5" />
                Razas Suplementarias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dungeon-400">
                Razas de libros adicionales. Algunas pueden tener ajuste de nivel y requieren aprobación del DM.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-dungeon-900 border-dungeon-800 hover:border-blue-500/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Info className="h-5 w-5" />
                ¿Cómo elegir?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dungeon-400">
                Considera los modificadores de habilidad, rasgos raciales y clase favorita para tu concepto de personaje.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* PHB Races Section */}
      {filteredPhbRaces.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-green-500/30">
            <BookOpen className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-heading font-bold text-green-400">
              Manual del Jugador ({filteredPhbRaces.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhbRaces.map((race) => (
              <RaceCard key={race.id} raceData={race} supplemental={false} />
            ))}
          </div>
        </div>
      )}

      {/* Supplemental Races Section */}
      {filteredSupplementalRaces.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-amber-500/30">
            <Sparkles className="h-6 w-6 text-amber-400" />
            <h2 className="text-2xl font-heading font-bold text-amber-400">
              Razas Suplementarias ({filteredSupplementalRaces.length})
            </h2>
          </div>

          {/* Warning Banner */}
          <Card className="bg-amber-900/20 border-amber-800/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-amber-300">
                    Requiere Aprobación del DM
                  </p>
                  <p className="text-sm text-amber-200/80">
                    Estas razas provienen de libros suplementarios. Algunas pueden tener ajuste de nivel (+1 o superior) que afecta tu progresión. Consulta con tu DM antes de usar estas opciones.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSupplementalRaces.map((race) => (
              <RaceCard key={race.id} raceData={race} supplemental={true} />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredRaces.length === 0 && (
        <Card className="bg-dungeon-900 border-dungeon-800">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-dungeon-600 mx-auto mb-4" />
              <p className="text-dungeon-400">No se encontraron razas con ese criterio de búsqueda.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
