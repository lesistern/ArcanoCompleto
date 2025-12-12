import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Trophy, Info, Star, Target, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { createStaticClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
    title: 'Clases de Prestigio - Reglas D&D 3.5 | Compendio Arcano',
    description: 'Guía de clases de prestigio en D&D 3.5: requisitos, mecánicas y cómo desbloquearlas.',
};

export const revalidate = 3600;

export default async function ClasesPrestigioPage() {
    const supabase = await createStaticClient();

    // Get prestige classes count
    const { count: prestigeCount } = await supabase
        .from('classes')
        .select('*', { count: 'exact', head: true })
        .eq('class_type', 'prestige');

    // Get some example prestige classes
    const { data: prestigeClasses } = await supabase
        .from('classes')
        .select('slug, titulo, description_es, source_book')
        .eq('class_type', 'prestige')
        .limit(12)
        .order('titulo');

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
                <Link href="/reglas">
                    <Button variant="ghost" size="sm" className="mb-4 text-gray-400 hover:text-gray-200">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a Reglas
                    </Button>
                </Link>
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-amber-500/20 border border-amber-500/30">
                        <Trophy className="h-8 w-8 text-amber-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Clases de Prestigio</h1>
                        <p className="text-gray-400">Clases avanzadas con requisitos especiales</p>
                    </div>
                </div>
            </div>

            {/* Introduction */}
            <Card className="mb-8 bg-gray-900/50 border-gray-700">
                <CardContent className="p-6">
                    <div className="flex gap-3">
                        <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-gray-300 space-y-2">
                            <p>
                                Las <strong className="text-gray-100">clases de prestigio</strong> son clases
                                especializadas que representan metas difíciles de alcanzar para muchos personajes.
                                A diferencia de las clases base, tienen requisitos previos que deben cumplirse
                                antes de poder tomar niveles en ellas.
                            </p>
                            <p>
                                Actualmente hay <strong className="text-amber-400">{prestigeCount || 0} clases de prestigio</strong> en
                                la base de datos.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Key Concepts */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                    <Star className="h-6 w-6 text-gold-400" />
                    Conceptos Clave
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-gray-900/50 border-gray-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-amber-400">Requisitos Previos</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-300 space-y-2">
                            <p>Antes de tomar tu primer nivel en una clase de prestigio, debes cumplir todos sus requisitos:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>BAB mínimo:</strong> Ej. BAB +5, +6, +7</li>
                                <li><strong>Rangos de habilidad:</strong> Ej. 8 rangos en Conocimiento (arcano)</li>
                                <li><strong>Dotes específicas:</strong> Ej. Esquivar, Soltura con armas marciales</li>
                                <li><strong>Capacidad de lanzar conjuros:</strong> Ej. "Capaz de lanzar conjuros arcanos de nivel 3"</li>
                                <li><strong>Especiales:</strong> Ej. "Debe haber matado a alguien solo por dinero"</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900/50 border-gray-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-amber-400">Multiclase</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-300 space-y-2">
                            <p>Las clases de prestigio se toman mediante multiclase normal:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Puedes tomar niveles en cualquier momento si cumples requisitos</li>
                                <li>No hay penalizador de XP por multiclase con clases de prestigio</li>
                                <li>Los niveles se suman para efectos como PG, BAB, salvaciones</li>
                                <li>Las capacidades de clase son independientes de otras clases</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Requirements Guide */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                    <Target className="h-6 w-6 text-gold-400" />
                    Tipos de Requisitos
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-gray-900/50 border-gray-700">
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-green-400 mb-2">Combate</h3>
                            <p className="text-sm text-gray-300">
                                Requisitos como BAB +5 o más, dotes de combate específicas,
                                o competencia con armas/armaduras.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900/50 border-gray-700">
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-blue-400 mb-2">Magia</h3>
                            <p className="text-sm text-gray-300">
                                Capacidad de lanzar conjuros de cierto nivel, conocer conjuros
                                específicos, o tener nivel de lanzador mínimo.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900/50 border-gray-700">
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-purple-400 mb-2">Habilidades</h3>
                            <p className="text-sm text-gray-300">
                                Rangos mínimos en habilidades específicas, típicamente
                                entre 5 y 13 rangos.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Example Classes */}
            {prestigeClasses && prestigeClasses.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                        <BookOpen className="h-6 w-6 text-gold-400" />
                        Ejemplos de Clases de Prestigio
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {prestigeClasses.map((cls) => (
                            <Link key={cls.slug} href={`/clases/${cls.slug}`}>
                                <Card className="bg-gray-900/50 border-gray-700 hover:border-amber-500/50 transition-colors h-full">
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-amber-400 mb-1">{cls.titulo}</h3>
                                        {cls.source_book && (
                                            <p className="text-xs text-gray-500 mb-2">{cls.source_book}</p>
                                        )}
                                        <p className="text-sm text-gray-300 line-clamp-2">
                                            {cls.description_es || 'Descripción no disponible'}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            <Card className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-500/30">
                <CardContent className="p-6 text-center">
                    <Trophy className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-100 mb-2">Explorar Todas las Clases</h3>
                    <p className="text-gray-300 mb-4">
                        Navega por la lista completa de clases base y de prestigio.
                    </p>
                    <Link href="/clases">
                        <Button className="bg-amber-600 hover:bg-amber-500">
                            Ver Todas las Clases
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
