import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createStaticClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { getAbilityIconById, getAlignmentIconById } from '@/lib/utils/icons';
import { getDiceIcon } from '@/lib/utils/diceIcons';

export const revalidate = 86400;

interface PageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

const CATEGORY_TABLE_MAP: Record<string, string> = {

    'dados': 'dice',
    'puntuaciones-caracteristica': 'ability_scores',
    'salvaciones': 'saving_throws',
};

const CATEGORY_TITLE_MAP: Record<string, string> = {

    'dados': 'Dado',
    'puntuaciones-caracteristica': 'Puntuación de Característica',
    'salvaciones': 'Tirada de Salvación',
};

export async function generateStaticParams() {
    const supabase = await createStaticClient();

    const [

        { data: dice },
        { data: abilityScores },
        { data: savingThrows },
    ] = await Promise.all([

        supabase.from('dice').select('slug'),
        supabase.from('ability_scores').select('slug'),
        supabase.from('saving_throws').select('slug'),
    ]);

    const params = [];


    if (dice) {
        params.push(...dice.map(i => ({ category: 'dados', slug: i.slug })));
    }
    if (abilityScores) {
        params.push(...abilityScores.map(i => ({ category: 'puntuaciones-caracteristica', slug: i.slug })));
    }
    if (savingThrows) {
        params.push(...savingThrows.map(i => ({ category: 'salvaciones', slug: i.slug })));
    }

    return params;
}

export async function generateMetadata({ params }: PageProps) {
    const { category, slug } = await params;
    const tableName = CATEGORY_TABLE_MAP[category];

    if (!tableName) return { title: 'No encontrado' };

    const supabase = await createStaticClient();
    const { data } = await supabase.from(tableName).select('name, description').eq('slug', slug).single();

    if (!data) return { title: 'No encontrado' };

    return {
        title: `${data.name} - Reglas D&D 3.5`,
        description: data.description?.slice(0, 160),
    };
}

export default async function RuleDetailPage({ params }: PageProps) {
    const { category, slug } = await params;
    const tableName = CATEGORY_TABLE_MAP[category];

    if (!tableName) {
        notFound();
    }

    const supabase = await createStaticClient();
    const { data: item } = await supabase.from(tableName).select('*').eq('slug', slug).single();

    if (!item) {
        notFound();
    }

    const categoryTitle = CATEGORY_TITLE_MAP[category];

    // Helper to get ability info for saving throws
    let relatedAbility = null;
    if (category === 'salvaciones' && item.ability_score_id) {
        const { data: ability } = await supabase
            .from('ability_scores')
            .select('*')
            .eq('id', item.ability_score_id)
            .single();
        relatedAbility = ability;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Link href="/reglas">
                <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all text-dungeon-300 hover:text-gold-400">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a Reglas
                </Button>
            </Link>

            <Card className="card overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-gold-600 to-gold-400" />
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-gold-500 bg-dungeon-900/50 px-2 py-1 rounded">
                            {categoryTitle}
                        </span>
                        {item.abbreviation && (
                            <span className="text-xs font-mono text-dungeon-400 bg-dungeon-900/50 px-2 py-1 rounded">
                                {item.abbreviation}
                            </span>
                        )}
                    </div>
                    <CardTitle className="text-3xl md:text-4xl font-bold text-dungeon-100">
                        {item.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg text-dungeon-200 leading-relaxed">
                            {item.description}
                        </p>
                    </div>

                    {/* Specific content based on category */}
                    {category === 'dados' && (
                        <div className="flex items-center gap-4 p-4 bg-dungeon-900/30 rounded-lg border border-dungeon-700/50">
                            {(() => {
                                const DiceIcon = getDiceIcon(item.sides);
                                return <DiceIcon className="h-8 w-8 text-gold-500" />;
                            })()}
                            <div>
                                <p className="text-sm font-medium text-dungeon-300">Caras</p>
                                <p className="text-xl font-bold text-dungeon-100">{item.sides}</p>
                            </div>
                        </div>
                    )}



                    {category === 'puntuaciones-caracteristica' && (
                        <div className="flex items-center gap-4 p-4 bg-dungeon-900/30 rounded-lg border border-dungeon-700/50">
                            {(() => {
                                const AbilityIcon = getAbilityIconById(item.id);
                                return <AbilityIcon className="h-8 w-8 text-gold-500" />;
                            })()}
                            <div>
                                <p className="text-sm font-medium text-dungeon-300">Abreviación</p>
                                <p className="text-xl font-bold text-dungeon-100 font-mono">{item.abbreviation}</p>
                            </div>
                        </div>
                    )}

                    {category === 'salvaciones' && relatedAbility && (
                        <div className="flex items-center gap-4 p-4 bg-dungeon-900/30 rounded-lg border border-dungeon-700/50">
                            {(() => {
                                const Icon = getAbilityIconById(relatedAbility.id);
                                return <Icon className="h-8 w-8 text-gold-500" />;
                            })()}
                            <div>
                                <p className="text-sm font-medium text-dungeon-300">Característica Clave</p>
                                <Link href={`/reglas/puntuaciones-caracteristica/${relatedAbility.slug}`} className="hover:underline">
                                    <p className="text-xl font-bold text-dungeon-100">{relatedAbility.name}</p>
                                </Link>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
