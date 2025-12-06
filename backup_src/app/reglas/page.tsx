import Link from 'next/link';
import { createStaticClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Shield, Brain, Dices, BookOpen } from 'lucide-react';
import { getAbilityIconById, getAbilityColorById, getAlignmentIconById } from '@/lib/utils/icons';
import { getDiceIcon } from '@/lib/utils/diceIcons';
import { RuleCard } from '@/components/reglas/RuleCard';

// Force static generation and cache for 1 hour
export const revalidate = 3600;
export const dynamic = 'force-static';
export const dynamicParams = false;

export const metadata = {
    title: 'Reglas - Compendio Arcano',
    description: 'Definiciones de reglas básicas: Alineamientos, Dados, Puntuaciones de Característica y Salvaciones.',
};

export default async function RulesPage() {
    const supabase = await createStaticClient();

    const [
        { data: alignments },
        { data: dice },
        { data: abilityScores },
        { data: savingThrows },
        { data: rulesContent },
    ] = await Promise.all([
        supabase.from('alignments').select('id, name, abbreviation, description, slug').order('id'),
        supabase.from('dice').select('id, sides, description, slug').order('sides'),
        supabase.from('ability_scores').select('id, name, abbreviation, description, slug').order('id'),
        supabase.from('saving_throws').select('id, name, description, slug, ability_score_id'),
        supabase.from('rules_content').select('slug, title, description, category').order('display_order'),
    ]);

    // Pre-sorted data (sorted once during build)
    const abilityOrder = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    const sortedAbilities = abilityScores?.slice().sort(
        (a, b) => abilityOrder.indexOf(a.id) - abilityOrder.indexOf(b.id)
    );

    // Pre-sorted alignments (grid layout: LB, LN, LM, NB, N, NM, CB, CN, CM)
    const alignmentOrder = ['LB', 'LN', 'LM', 'NB', 'N', 'NM', 'CB', 'CN', 'CM'];
    const sortedAlignments = alignments?.slice().sort(
        (a, b) => alignmentOrder.indexOf(a.id) - alignmentOrder.indexOf(b.id)
    );

    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="mb-12 space-y-3 border-l-4 border-gold-500 pl-6">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
                    Reglas Básicas
                </h1>
                <p className="text-lg text-dungeon-300">
                    Conceptos fundamentales de D&D 3.5: Alineamientos, Dados, Características y Salvaciones.
                </p>
            </div>

            <div className="space-y-16">
                {/* Puntuaciones de Característica */}
                <section id="caracteristicas">
                    <div className="flex items-center gap-3 mb-6">
                        <Brain className="h-8 w-8 text-gold-500" />
                        <h2 className="text-2xl font-bold text-dungeon-100">Puntuaciones de Característica</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {sortedAbilities?.map((ability) => (
                            <RuleCard
                                key={ability.id}
                                href={`/reglas/puntuaciones-caracteristica/${ability.slug}`}
                                icon={getAbilityIconById(ability.id)}
                                iconColor={getAbilityColorById(ability.id)}
                                title={ability.name}
                                abbreviation={ability.abbreviation}
                                description={ability.description}
                            />
                        ))}
                    </div>
                </section>

                {/* Salvaciones */}
                <section id="salvaciones">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="h-8 w-8 text-gold-500" />
                        <h2 className="text-2xl font-bold text-dungeon-100">Tiradas de Salvación</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {savingThrows?.map((save) => {
                            const ability = sortedAbilities?.find(a => a.id === save.ability_score_id);
                            const AbilityIcon = ability ? getAbilityIconById(ability.id) : Brain;
                            const colorClass = ability ? getAbilityColorById(ability.id) : 'text-dungeon-400';

                            return (
                                <Link
                                    key={save.id}
                                    href={`/reglas/salvaciones/${save.slug}`}
                                    className="block transition-transform hover:scale-[1.02]"
                                >
                                    <Card className="bg-dungeon-800 border-dungeon-700 h-full hover:border-gold-500/50 transition-colors">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="flex items-center gap-2 text-lg text-dungeon-100">
                                                {save.name}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <p className="text-sm text-dungeon-200 line-clamp-3">{save.description}</p>
                                            <div className="flex items-center gap-2 text-xs text-dungeon-400 bg-dungeon-900/50 p-2 rounded">
                                                <AbilityIcon className={`h-4 w-4 ${colorClass}`} />
                                                <span>Basada en {ability?.name || 'Característica'}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Alineamientos */}
                <section id="alineamientos">
                    <div className="flex items-center gap-3 mb-6">
                        <Brain className="h-8 w-8 text-gold-500" />
                        <h2 className="text-2xl font-bold text-dungeon-100">Alineamientos</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {sortedAlignments?.map((alignment) => (
                            <RuleCard
                                key={alignment.id}
                                href={`/reglas/alineamientos/${alignment.slug}`}
                                icon={getAlignmentIconById(alignment.id)}
                                title={alignment.name}
                                abbreviation={alignment.abbreviation}
                                description={alignment.description}
                                compact
                            />
                        ))}
                    </div>
                </section>

                {/* Dados */}
                <section id="dados">
                    <div className="flex items-center gap-3 mb-6">
                        <Dices className="h-8 w-8 text-gold-500" />
                        <h2 className="text-2xl font-bold text-dungeon-100">Dados</h2>
                    </div>
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                        {dice?.map((d) => {
                            const DiceIcon = getDiceIcon(d.sides);
                            return (
                                <Link
                                    key={d.id}
                                    href={`/reglas/dados/${d.slug}`}
                                    className="block transition-transform hover:scale-[1.02]"
                                >
                                    <Card className="bg-dungeon-800 border-dungeon-700 text-center h-full hover:border-gold-500/50 transition-colors">
                                        <CardHeader className="pb-2 pt-4">
                                            <div className="flex justify-center mb-2">
                                                <DiceIcon className="h-8 w-8 text-gold-400" />
                                            </div>
                                            <CardTitle className="text-lg font-mono text-gold-400">
                                                {d.id}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pb-4">
                                            <p className="text-xs text-dungeon-300 line-clamp-3" title={d.description}>
                                                {d.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Reglas Adicionales */}
                {rulesContent && rulesContent.length > 0 && (
                    <section id="reglas-adicionales">
                        <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="h-8 w-8 text-gold-500" />
                            <h2 className="text-2xl font-bold text-dungeon-100">Reglas adicionales</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {rulesContent.map((rule) => (
                                <Link
                                    key={rule.slug}
                                    href={`/reglas/contenido/${rule.slug}`}
                                    className="block transition-transform hover:scale-[1.02]"
                                >
                                    <Card className="bg-dungeon-800 border-dungeon-700 h-full hover:border-gold-500/50 transition-colors">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="flex items-center gap-2 text-lg text-dungeon-100">
                                                {rule.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <p className="text-sm text-dungeon-200 line-clamp-3">{rule.description}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
