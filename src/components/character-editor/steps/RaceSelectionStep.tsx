import React from 'react';
import { DnDRace } from '@/lib/types/race';
import SelectableRaceCard from '../SelectableRaceCard';
import { convertSupabaseRace } from '@/lib/data/races-management';

interface RaceSelectionStepProps {
    races: any[]; // Raw supabase data
    selectedRace: DnDRace | null;
    onSelect: (race: DnDRace) => void;
}

export function RaceSelectionStep({ races, selectedRace, onSelect }: RaceSelectionStepProps) {
    // Convert raw data to DnDRace
    const formattedRaces: DnDRace[] = races.map(convertSupabaseRace);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formattedRaces.map((race) => (
                    <SelectableRaceCard
                        key={race.id}
                        raceData={race}
                        isSelected={selectedRace?.id === race.id}
                        onSelect={() => onSelect(race)}
                        supplemental={!['humano', 'elfo', 'enano', 'mediano', 'gnomo', 'semielfo', 'semiorco'].includes(race.slug.toLowerCase())}
                    />
                ))}
            </div>
        </div>
    );
}
