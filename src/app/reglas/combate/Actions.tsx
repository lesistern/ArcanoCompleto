import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Activity, ArrowRight, Zap, Clock, AlertTriangle, Info } from 'lucide-react';

export function Actions() {
    const actionTypes = [
        {
            title: "Acción Estándar",
            icon: Activity,
            desc: "Hacer algo, normalmente atacar o lanzar un conjuro.",
            examples: ["Ataque (cuerpo a cuerpo/distancia)", "Lanzar conjuro", "Activar objeto mágico", "Defensa Total", "Uso de habilidad"]
        },
        {
            title: "Acción de Movimiento",
            icon: ArrowRight,
            desc: "Moverse tu velocidad o realizar una acción equivalente.",
            examples: ["Moverse", "Sacar arma", "Levantarse", "Cargar ballesta ligera", "Abrir puerta"]
        },
        {
            title: "Acción de Asalto Completo",
            icon: Clock,
            desc: "Consume todo tu esfuerzo del asalto. Solo puedes dar un paso de 5 pies.",
            examples: ["Ataque completo", "Cargar", "Correr", "Retirada", "Lanzar conjuro (1 asalto)"]
        },
        {
            title: "Acción Gratuita / Rápida",
            icon: Zap,
            desc: "Consume muy poco tiempo. Límites razonables.",
            examples: ["Hablar", "Dejar caer objeto", "Paso de 5 pies (especial)", "Conjuro apresurado (Rápida)"]
        }
    ];

    const actionsSummary = [
        {
            action: "Ataque (cuerpo a cuerpo)",
            desc: "Golpear a un enemigo con tu arma o puño.",
            type: "Estándar",
            icon: Activity,
            ado: false
        },
        {
            action: "Ataque (a distancia)",
            desc: "Disparar un arco, ballesta o lanzar una daga.",
            type: "Estándar",
            icon: Activity,
            ado: true
        },
        {
            action: "Ataque (desarmado)",
            desc: "Golpear sin armas (si no tienes la dote).",
            type: "Estándar",
            icon: Activity,
            ado: true
        },
        {
            action: "Lanzar un conjuro",
            desc: "Invocar magia (salvo que sea Rápido).",
            type: "Estándar",
            icon: Activity,
            ado: true
        },
        {
            action: "Beber poción",
            desc: "Consumir una poción o aceite.",
            type: "Estándar",
            icon: Activity,
            ado: true
        },
        {
            action: "Defensa Total",
            desc: "No atacas, solo te defiendes (+4 CA).",
            type: "Estándar",
            icon: Activity,
            ado: false
        },
        {
            action: "Moverse",
            desc: "Desplazarte hasta tu velocidad.",
            type: "Movimiento",
            icon: ArrowRight,
            ado: true
        },
        {
            action: "Sacar arma",
            desc: "Preparar tu arma para el combate.",
            type: "Movimiento",
            icon: ArrowRight,
            ado: false
        },
        {
            action: "Levantarse",
            desc: "Ponerse de pie desde el suelo (Prone).",
            type: "Movimiento",
            icon: ArrowRight,
            ado: true
        },
        {
            action: "Cargar",
            desc: "Moverse y atacar en línea recta (+2 ataque, -2 CA).",
            type: "Completo",
            icon: Clock,
            ado: false
        },
        {
            action: "Correr",
            desc: "Moverse 4 veces tu velocidad (pierdes Des a la CA).",
            type: "Completo",
            icon: Clock,
            ado: true
        },
        {
            action: "Paso de 5 pies",
            desc: "Pequeño ajuste de posición que no provoca AdO.",
            type: "Sin Acción",
            icon: Zap,
            ado: false
        },
    ];

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                {actionTypes.map((type, i) => {
                    const Icon = type.icon;
                    return (
                        <Card key={i} className="border-dungeon-700 bg-dungeon-900/50">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-dungeon-100 text-lg">
                                    <Icon className="h-5 w-5 text-dungeon-400" />
                                    {type.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-dungeon-200">
                                <p className="mb-2">{type.desc}</p>
                                <div className="bg-dungeon-950/30 p-2 rounded border border-dungeon-800/50">
                                    <span className="text-dungeon-400 font-bold text-xs uppercase tracking-wider">Ejemplos:</span>
                                    <p className="text-dungeon-300 mt-1">{type.examples.join(", ")}.</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Card className="border-dungeon-700 bg-dungeon-900/50">
                <CardHeader>
                    <CardTitle className="text-dungeon-100 flex items-center gap-2">
                        <Info className="h-5 w-5 text-blue-400" />
                        Tabla Resumida de Acciones
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 bg-blue-950/20 border border-blue-900/50 p-3 rounded-md flex gap-3 items-start">
                        <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                        <div className="text-sm text-dungeon-200">
                            <p className="font-bold text-dungeon-100 mb-1">¡Cuidado con los Ataques de Oportunidad!</p>
                            <p>
                                Las acciones marcadas con <span className="text-red-300 font-bold">Sí</span> bajan tu guardia.
                                Si las haces estando al lado de un enemigo armado, ¡te podrá atacar gratis!
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="text-dungeon-100 border-b border-dungeon-700 bg-dungeon-950/50">
                                <tr>
                                    <th className="p-3">Acción</th>
                                    <th className="p-3">Tipo</th>
                                    <th className="p-3 text-center">¿Provoca AdO?</th>
                                </tr>
                            </thead>
                            <tbody className="text-dungeon-300 divide-y divide-dungeon-800">
                                {actionsSummary.map((item, index) => {
                                    const TypeIcon = item.icon;
                                    return (
                                        <tr
                                            key={index}
                                            className={`
                                                transition-colors
                                                ${item.ado ? 'bg-red-950/20 hover:bg-red-900/30' : 'hover:bg-dungeon-800/30'}
                                            `}
                                        >
                                            <td className="p-3">
                                                <div className="font-bold text-dungeon-100">{item.action}</div>
                                                <div className="text-xs text-dungeon-400">{item.desc}</div>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-2">
                                                    <TypeIcon className="h-4 w-4 text-dungeon-500" />
                                                    {item.type}
                                                </div>
                                            </td>
                                            <td className="p-3 text-center">
                                                {item.ado ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-500/20 text-red-200 font-bold text-xs border border-red-500/30 shadow-sm shadow-red-900/20">
                                                        <AlertTriangle className="w-3 h-3" />
                                                        Sí
                                                    </span>
                                                ) : (
                                                    <span className="text-dungeon-500/50 font-medium">No</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
