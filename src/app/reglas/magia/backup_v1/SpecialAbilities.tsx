import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Sparkles, Ghost, Activity, Ban } from 'lucide-react';

export function SpecialAbilities() {
    return (
        <Card className="border-dungeon-700 bg-dungeon-900/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-dungeon-100">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    Habilidades Especiales
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-dungeon-200 text-sm">
                <p>
                    No toda la magia proviene de lanzar conjuros. Algunas criaturas y clases tienen habilidades innatas.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                    {/* Aptitudes Sortílegas */}
                    <div className="bg-purple-900/10 border border-purple-500/20 p-4 rounded space-y-2">
                        <div className="flex items-center gap-2 font-bold text-purple-300">
                            <Sparkles className="h-4 w-4" />
                            Aptitudes Sortílegas (St)
                        </div>
                        <p className="text-xs text-dungeon-300">
                            Capacidad innata para lanzar conjuros específicos sin necesidad de preparación.
                        </p>
                        <ul className="list-disc list-inside text-[10px] text-dungeon-400 space-y-1">
                            <li><strong>Sin componentes:</strong> Se activan mentalmente.</li>
                            <li><strong>Provocan AoO:</strong> Sí, distraen como un conjuro normal.</li>
                            <li><strong>Se puede anular:</strong> Sí (Disipar Magia, RC).</li>
                        </ul>
                    </div>

                    {/* Sobrenaturales */}
                    <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded space-y-2">
                        <div className="flex items-center gap-2 font-bold text-blue-300">
                            <Ghost className="h-4 w-4" />
                            Habilidades Sobrenaturales (Sb)
                        </div>
                        <p className="text-xs text-dungeon-300">
                            Poderes mágicos que no funcionan como conjuros y son parte de la naturaleza de la criatura.
                        </p>
                        <ul className="list-disc list-inside text-[10px] text-dungeon-400 space-y-1">
                            <li><strong>Ejemplos:</strong> Aliento de dragón, Mirada petrificante.</li>
                            <li><strong>No provocan AoO:</strong> No requieren concentración vulnerable.</li>
                            <li><strong>Imparable:</strong> No les afecta la Resistencia a Conjuros.</li>
                        </ul>
                    </div>

                    {/* Extraordinarias */}
                    <div className="bg-green-900/10 border border-green-500/20 p-4 rounded space-y-2">
                        <div className="flex items-center gap-2 font-bold text-green-300">
                            <Activity className="h-4 w-4" />
                            Habilidades Extraordinarias (Ex)
                        </div>
                        <p className="text-xs text-dungeon-300">
                            Capacidades no mágicas derivadas de la biología o entrenamiento extremo.
                        </p>
                        <ul className="list-disc list-inside text-[10px] text-dungeon-400 space-y-1">
                            <li><strong>Ejemplos:</strong> Regeneración, Esquiva asombrosa.</li>
                            <li><strong>NO es magia:</strong> Funcionan incluso en campos antimagia.</li>
                            <li><strong>No se puede disipar:</strong> Son habilidades físicas o biológicas.</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
