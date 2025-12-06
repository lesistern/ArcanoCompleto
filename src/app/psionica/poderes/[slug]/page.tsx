import { notFound } from 'next/navigation';

import { Brain, Clock, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { createClient, createStaticClient } from '@/lib/supabase/server';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface PowerPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PowerPage({ params }: PowerPageProps) {
    const { slug } = await params;

    const supabase = await createClient();
    const { data: power } = await supabase
        .from('srd_spells')
        .select('*')
        .eq('slug', slug)
        .eq('is_psionic', true)
        .single();

    if (!power) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <Breadcrumbs items={[
                { label: 'Poderes Psiónicos', href: '/psionica' },
                { label: power.name }
            ]} />

            {/* Header */}
            <div className="border-l-4 border-purple-500 pl-6 mb-12">
                <div className="flex items-center gap-4 mb-3">
                    <Brain className="h-8 w-8 text-purple-400" />
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
                        {power.name}
                    </h1>
                </div>
                {power.school && (
                    <p className="text-lg text-purple-300 mb-4 italic">{power.school}</p>
                )}
                <div className="flex flex-wrap gap-3 text-sm">
                    {power.level && (
                        <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
                            <span className="text-dungeon-500">Nivel:</span> {power.level}
                        </span>
                    )}
                    {power.power_points_section && (
                        <span className="px-3 py-1 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            <span className="font-semibold">{power.power_points_section}</span> PP
                        </span>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {power.casting_time && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-blue-400" />
                                Tiempo de manifestación
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-dungeon-200">{power.casting_time}</p>
                        </CardContent>
                    </Card>
                )}

                {power.range && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Target className="h-4 w-4 text-green-400" />
                                Alcance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-dungeon-200">{power.range}</p>
                        </CardContent>
                    </Card>
                )}

                {power.target && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Target className="h-4 w-4 text-yellow-400" />
                                Objetivo
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-dungeon-200">{power.target}</p>
                        </CardContent>
                    </Card>
                )}

                {power.duration && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-orange-400" />
                                Duración
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-dungeon-200">{power.duration}</p>
                        </CardContent>
                    </Card>
                )}

                {power.saving_throw && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Zap className="h-4 w-4 text-red-400" />
                                Tirada de salvación
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-dungeon-200">{power.saving_throw}</p>
                        </CardContent>
                    </Card>
                )}

                {power.spell_resistance && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Zap className="h-4 w-4 text-purple-400" />
                                Resistencia al poder
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-dungeon-200">{power.spell_resistance}</p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Description */}
            {power.description && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Descripción</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-dungeon-300 leading-relaxed whitespace-pre-line">{power.description}</p>
                    </CardContent>
                </Card>
            )}

            {/* Source */}
            <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-4 mb-8">
                <p className="text-xs text-dungeon-500">
                    Fuente: Manual Expandido de Psiónica
                </p>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const supabase = await createStaticClient();
    const { data: powers } = await supabase
        .from('srd_spells')
        .select('slug')
        .eq('is_psionic', true);

    return (powers || []).map((power) => ({
        slug: power.slug,
    }));
}
