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
            name: "Abjuración",
            icon: Shield,
            color: "text-blue-400",
            desc: "Escudos y Protección. Lo usas para que no te peguen."
        },
        {
            name: "Conjuración",
            icon: Cloud,
            color: "text-amber-400",
            desc: "Crear cosas o traerlas. Teletransporte y Curación entran aquí."
        },
        {
            name: "Adivinación",
            icon: Eye,
            color: "text-cyan-400",
            desc: "Ver el futuro o espiar. El GPS mágico."
        },
        {
            name: "Encantamiento",
            icon: Brain,
            color: "text-pink-400",
            desc: "Control mental. Haces amigos a la fuerza o calmas bestias."
        },
        {
            name: "Evocación",
            icon: Flame,
            color: "text-red-400",
            desc: "¡BOOM! Bolas de fuego, rayos y explosiones."
        },
        {
            name: "Ilusión",
            icon: EyeOff,
            color: "text-purple-400",
            desc: "Mentiras visuales. Te haces invisible o creas dragones falsos."
        },
        {
            name: "Nigromancia",
            icon: Skull,
            color: "text-gray-400",
            desc: "Vida y Muerte. Zombies, esqueletos y chupar vida."
        },
        {
            name: "Transmutación",
            icon: RefreshCw,
            color: "text-green-400",
            desc: "Transformación. Conviertes plomo en oro o a tu amigo en rana."
        }
    ];

    return (
        <Card className="border-dungeon-700 bg-dungeon-900/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-dungeon-100">
                    <Flame className="h-5 w-5 text-orange-500" />
                    Los 8 Sabores de la Magia
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-sm text-dungeon-200">
                    Los magos clasifican la magia en "Escuelas". Si te especializas en una, eres muy bueno en ella pero terrible en sus opuestas.
                </p>
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
                            Siguiente: Habilidades Especiales <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
