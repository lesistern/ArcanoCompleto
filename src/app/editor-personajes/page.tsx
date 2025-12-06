import { createClient } from '@/lib/supabase/server';
import { CharacterEditorClient } from '@/components/character-editor/CharacterEditorClient';
import { FALLBACK_CLASSES } from '@/lib/data/fallback-classes';
import { FALLBACK_RACES } from '@/lib/data/fallback-races';

export const metadata = {
    title: 'Editor de Personajes - Compendio Arcano',
    description: 'Crea y gestiona tus personajes de D&D 3.5',
};

export default async function CharacterEditorPage() {
    const supabase = await createClient();

    // Fetch Races
    let { data: races } = await supabase
        .from('races')
        .select('*')
        .order('name');

    // Filter only core races if we got data from DB
    if (races && races.length > 0) {
        const coreRaceNames = ['Humano', 'Elfo', 'Enano', 'Mediano', 'Gnomo', 'Semielfo', 'Semiorco'];
        races = races.filter(r => coreRaceNames.includes(r.name));
    }

    // Fetch Classes
    let { data: classes } = await supabase
        .from('classes')
        .select('*')
        .order('name');

    // Use fallback if DB is empty
    if (!classes || classes.length === 0) {
        classes = FALLBACK_CLASSES;
    }

    // Use fallback if DB is empty
    if (!races || races.length === 0) {
        // We cast to any here because the database structure might vary slightly from DnDRace
        // but FALLBACK_RACES is strictly DnDRace compatible.
        // The Client expects a mix of both currently, but mostly DnDRace.
        races = FALLBACK_RACES as any;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <CharacterEditorClient
                initialRaces={races || []}
                initialClasses={classes}
            />
        </div>
    );
}
