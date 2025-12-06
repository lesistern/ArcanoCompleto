import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { SpellcastingBasics } from './SpellcastingBasics';
import { SpellAnatomy } from './SpellAnatomy';
import { ArcaneDivine } from './ArcaneDivine';
import { SchoolsOfMagic } from './SchoolsOfMagic';
import { SpecialAbilities } from './SpecialAbilities';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata = {
    title: 'Magia | D&D 3.5 Compendio',
    description: 'Reglas completas sobre el lanzamiento de conjuros, tipos de magia y habilidades especiales.',
};

export default function MagiaPage() {
    const [activeTab, setActiveTab] = React.useState("basics");

    return (
        <div className="min-h-screen bg-dungeon-950 text-dungeon-100 p-4 md:p-8 font-serif">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-dungeon-800 pb-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-dungeon-400 text-sm mb-2">
                            <Link href="/reglas" className="hover:text-dungeon-200 transition-colors flex items-center gap-1">
                                <ArrowLeft className="h-4 w-4" />
                                Volver a Reglas
                            </Link>
                            <span>/</span>
                            <span className="text-dungeon-200">Magia</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
                            Magia y Conjuros
                        </h1>
                        <p className="text-xl text-dungeon-300 max-w-3xl">
                            Desde las palabras arcanas de un mago hasta las oraciones devotas de un clérigo, la magia es una fuerza fundamental que altera la realidad.
                        </p>
                    </div>
                    <Sparkles className="h-16 w-16 text-purple-500/20 hidden md:block" />
                </div>

                {/* Intro para Principiantes */}
                <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-dungeon-900/50">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-purple-300 mb-2 flex items-center gap-2">
                            <Sparkles className="h-5 w-5" />
                            ¿Nuevo en la Magia? Lee esto primero
                        </h3>
                        <p className="text-dungeon-200 mb-4">
                            La magia en D&D es tu herramienta para romper las reglas de la realidad. No te preocupes por memorizar todo de golpe. Aquí tienes lo esencial:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-dungeon-950/40 p-3 rounded border border-purple-500/20">
                                <strong className="text-purple-200 block mb-1">Espacios de Conjuro = Balas</strong>
                                <p className="text-dungeon-300">Tienes una cantidad limitada por día. Cuando se acaban, debes descansar para recargar. ¡No los gastes todos en el primer combate!</p>
                            </div>
                            <div className="bg-dungeon-950/40 p-3 rounded border border-blue-500/20">
                                <strong className="text-blue-200 block mb-1">Conocido vs. Preparado</strong>
                                <p className="text-dungeon-300">Algunos (Hechiceros) saben pocos trucos pero los usan siempre. Otros (Magos/Clérigos) saben muchos, pero deben elegir cuáles llevar cada mañana.</p>
                            </div>
                            <div className="bg-dungeon-950/40 p-3 rounded border border-gold-500/20">
                                <strong className="text-gold-200 block mb-1">CD de Salvación</strong>
                                <p className="text-dungeon-300">Es el número que tus enemigos deben superar para resistir tu magia. Cuanto más alta tu característica principal (Int/Sab/Car), ¡más difícil es resistirte!</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Content with Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto bg-dungeon-900/80 p-1">
                        <TabsTrigger value="basics">Fundamentos</TabsTrigger>
                        <TabsTrigger value="anatomy">Anatomía</TabsTrigger>
                        <TabsTrigger value="types">Arcana vs Divina</TabsTrigger>
                        <TabsTrigger value="schools">Escuelas</TabsTrigger>
                        <TabsTrigger value="abilities">Habilidades</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basics" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section>
                            <h2 className="text-2xl font-bold text-dungeon-100 mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
                                Fundamentos del Lanzamiento
                            </h2>
                            <SpellcastingBasics onNextTab={() => setActiveTab("anatomy")} />
                        </section>
                    </TabsContent>

                    <TabsContent value="anatomy" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section>
                            <h2 className="text-2xl font-bold text-dungeon-100 mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                                Anatomía de un Conjuro
                            </h2>
                            <SpellAnatomy onNextTab={() => setActiveTab("types")} />
                        </section>
                    </TabsContent>

                    <TabsContent value="types" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section>
                            <h2 className="text-2xl font-bold text-dungeon-100 mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-gold-500 rounded-full"></span>
                                Arcana vs Divina
                            </h2>
                            <ArcaneDivine onNextTab={() => setActiveTab("schools")} />
                        </section>
                    </TabsContent>

                    <TabsContent value="schools" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section>
                            <SchoolsOfMagic onNextTab={() => setActiveTab("abilities")} />
                        </section>
                    </TabsContent>

                    <TabsContent value="abilities" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section>
                            <h2 className="text-2xl font-bold text-dungeon-100 mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-green-500 rounded-full"></span>
                                Habilidades Especiales
                            </h2>
                            <SpecialAbilities />
                        </section>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
