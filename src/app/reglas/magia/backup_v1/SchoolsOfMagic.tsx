import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from '@/components/ui/Button';
import { Shield, Cloud, Eye, Brain, Flame, EyeOff, Skull, RefreshCw, ArrowRight } from 'lucide-react';

interface SchoolsOfMagicProps {
    onNextTab?: () => void;
}

export function SchoolsOfMagic({ onNextTab }: SchoolsOfMagicProps) {
    const schools = [
        {
            name: "Abjuración (Protección)",
            icon: Shield,
            color: "text-blue-400",
            desc: "Especializada en la defensa. Crea barreras mágicas, escudos y disipa efectos mágicos dañinos."
        },
        {
            name: "Conjuración (Invocar)",
            icon: Cloud,
            color: "text-amber-400",
            desc: "Trae criaturas u objetos de otros lugares. También incluye magia de curación y teletransportación."
        },
        {
            name: "Adivinación (Información)",
            icon: Eye,
            color: "text-cyan-400",
            desc: "Permite ver el futuro, localizar objetos perdidos o espiar lugares lejanos mediante magia."
        },
        {
            name: "Encantamiento (Mente)",
            icon: Brain,
            color: "text-pink-400",
            desc: "Afecta la mente de otros. Puede calmar emociones, controlar acciones o influir en el comportamiento."
        },
        {
            name: "Evocación (Energía)",
            icon: Flame,
            color: "text-red-400",
            desc: "Manipula energía pura para crear efectos destructivos como fuego, rayos, hielo o fuerza mágica."
        },
        {
            name: "Ilusión (Engaño)",
            icon: EyeOff,
            color: "text-purple-400",
            desc: "Engaña a los sentidos, haciendo ver, oír o sentir cosas que no son reales."
        },
        {
            name: "Nigromancia (Vida/Muerte)",
            icon: Skull,
            color: "text-gray-400",
            desc: "Manipula las fuerzas de la vida y la muerte. Puede drenar vitalidad o animar a los muertos."
        },
        {
            name: "Transmutación (Cambio)",
            icon: RefreshCw,
            color: "text-green-400",
            desc: "Altera las propiedades físicas de criaturas u objetos. Puede cambiar formas o mejorar atributos."
        }
    ];

    return (
        <Card className="border-dungeon-700 bg-dungeon-900/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-dungeon-100">
                    <Flame className="h-5 w-5 text-orange-500" />
                    Escuelas de Magia
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {schools.map((school) => (
                        <div key={school.name} className="bg-dungeon-950/30 p-3 rounded border border-dungeon-800 hover:border-dungeon-600 transition-colors">
                            <div className={`flex items-center gap-2 font-bold mb-1 ${school.color}`}>
                                <school.icon className="h-4 w-4" />
                                {school.name}
                            </div>
                            <p className="text-xs text-dungeon-300 leading-tight">
                                {school.desc}
                            </p>
                        </div>
                    ))}
                </div>
                {onNextTab && (
                    <div className="flex justify-end pt-4 border-t border-dungeon-800">
                        <Button onClick={onNextTab} className="bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-100">
                            Siguiente Sección: Habilidades <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
