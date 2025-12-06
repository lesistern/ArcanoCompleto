'use client';

import { Loader2, Pencil } from 'lucide-react';

interface RaceData {
  id: string;
  slug: string;
  name: string;
  [key: string]: any;
}

interface RacesListProps {
  races: RaceData[];
  filteredRaces: RaceData[];
  selectedRace: RaceData | null;
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onRaceSelect: (race: RaceData, edit: boolean) => void;
}

export function RacesList({
  races,
  filteredRaces,
  selectedRace,
  isLoading,
  searchTerm,
  onSearchChange,
  onRaceSelect,
}: RacesListProps) {
  return (
    <div className="lg:col-span-1 bg-dungeon-800 rounded-lg p-4">
      <input
        type="text"
        placeholder="Buscar raza..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2 mb-4 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-400"
      />
      <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
        {isLoading ? (
          <div className="text-center py-4 text-dungeon-400">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            Cargando razas...
          </div>
        ) : filteredRaces.map((r) => (
          <div
            key={r.id}
            onClick={() => onRaceSelect(r, false)}
            className={`p-3 rounded-lg cursor-pointer transition-all ${selectedRace?.id === r.id
              ? 'bg-gold-900/30 border border-gold-400'
              : 'bg-dungeon-700 hover:bg-dungeon-600'
              }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gold-300">
                  {r.name}
                </div>
                <div className="text-sm text-dungeon-400">
                  {r.slug}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRaceSelect(r, true);
                }}
                className="p-1 hover:bg-dungeon-600 rounded"
              >
                <Pencil className="h-4 w-4 text-gold-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
