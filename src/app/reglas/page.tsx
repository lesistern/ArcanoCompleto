import { createStaticClient } from '@/lib/supabase/server';
import RulesClient from './RulesClient';

// Force static generation and cache for 1 hour
export const revalidate = 3600;
export const dynamic = 'force-static';
export const dynamicParams = false;

export const metadata = {
    title: 'Reglas - Compendio Arcano',
    description: 'Guía completa de reglas del sistema d20: reglas básicas, creación de personaje, características y más.',
};

export default async function RulesPage() {
    const supabase = await createStaticClient();

    const [
        { data: dice },
        { data: abilityScores },
        { data: savingThrows },
        { data: rulesContent },
    ] = await Promise.all([
        supabase.from('dice').select('id, sides, description, slug').order('sides'),
        supabase.from('ability_scores').select('id, name, abbreviation, description, slug').order('id'),
        supabase.from('saving_throws').select('id, name, description, slug, ability_score_id'),
        supabase.from('rules_content').select('slug, title, description, category').order('display_order'),
    ]);

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            <RulesClient
                dice={dice || []}
                abilityScores={abilityScores || []}
                savingThrows={savingThrows || []}
                rulesContent={rulesContent || []}
            />
        </div>
    );
}
