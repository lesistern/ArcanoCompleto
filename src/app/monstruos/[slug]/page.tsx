import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import MonsterDetailClient from './MonsterDetailClient';
import localMonstersData from '@/lib/data/3.5/monsters.json';
import { Monster } from '@/lib/services/monsterService.client';

interface MonsterPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Helper to find monster in local JSON
function findLocalMonster(slug: string): Monster | undefined {
    // The JSON uses 'id' which matches our slugs (e.g. 'goblin', 'orco')
    // We map the JSON fields to our Monster interface
    const p = localMonstersData.find((m) => m.id === slug);
    if (!p) return undefined;

    return {
        id: p.id,
        slug: p.id,
        name: p.name,
        creature_type: p.type, // Map 'type' to 'creature_type'
        size: p.size,
        challenge_rating: p.challenge_rating,
        armor_class: typeof p.armor_class === 'object' ? p.armor_class.total : p.armor_class,
        hit_dice: p.hit_dice,
        alignment: p.alignment,
        environment: p.environment,
        source_book: p.sources?.[0]?.book,
        source_page: p.sources?.[0]?.page,
        description: p.description,
        abilities: p.abilities,
        attacks: p.attacks,
        speed: p.speed,
        saves: p.saves,
        skills: p.skills, // Note: JSON skills are array, Interface expects Record? Check Service.
        // Actually Service interface doesn't enforce strict structure strictly for optional JSONB fields, 
        // but we treat them as any in the calculator.
        special_qualities: p.special_qualities
    } as unknown as Monster;
}


export async function generateMetadata({ params }: MonsterPageProps): Promise<Metadata> {
    const { slug } = await params;
    let monster: Monster | null = null;

    // Try Supabase
    try {
        const supabase = await createClient();
        const { data } = await supabase.from('monsters').select('name, description').eq('slug', slug).single();
        if (data) monster = data as any;
    } catch (e) {
        // Ignore Supabase error
    }

    // Fallback
    if (!monster) {
        monster = findLocalMonster(slug) || null;
    }

    if (!monster) {
        return {
            title: 'Monstruo no encontrado',
        };
    }

    const description = monster.description || `Estadísticas detalladas de ${monster.name}`;

    return {
        title: `${monster.name} | Bestiario D&D 3.5`,
        description,
    };
}

export async function generateStaticParams() {
    let slugs: string[] = [];

    // Try Supabase
    try {
        const supabase = await createClient();
        const { data } = await supabase.from('monsters').select('slug');
        if (data) slugs = data.map(m => m.slug);
    } catch (e) {
        // Ignore
    }

    // Merge or Fallback to Local
    const localSlugs = localMonstersData.map(m => m.id);
    // Combine unique
    const allSlugs = Array.from(new Set([...slugs, ...localSlugs]));

    return allSlugs.map((slug) => ({
        slug,
    }));
}

export default async function MonsterPage({ params }: MonsterPageProps) {
    const { slug } = await params;
    let monster: Monster | null = null;

    // 1. Try Supabase
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('monsters')
            .select('*')
            .eq('slug', slug)
            .single();

        if (!error && data) {
            monster = data as Monster;
        }
    } catch (e) {
        console.warn('Supabase fetch failed, falling back to local data');
    }

    // 2. Fallback to Local JSON
    if (!monster) {
        monster = findLocalMonster(slug) || null;
    }

    if (!monster) {
        notFound();
    }

    return <MonsterDetailClient monster={monster} />;
}
