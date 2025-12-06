import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Footprints, Map, Maximize, Minimize, AlertTriangle } from 'lucide-react';
import { FormattedDistance } from '@/components/ui/FormattedDistance';

export function Movement() {
    return (
        <div className="space-y-6">
            <Card className="border-dungeon-700 bg-dungeon-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-dungeon-100">
                        <Map className="h-5 w-5 text-emerald-400" />
                        Movimiento Táctico
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-dungeon-200 text-sm">
                    <p>
                        El combate se juega en una cuadrícula. Cada cuadrado (casilla) mide <strong><FormattedDistance feet={5} showBoth /></strong>.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-dungeon-950/30 p-4 rounded border border-dungeon-800/50">
                            <h4 className="font-bold text-dungeon-100 mb-3 flex items-center gap-2">
                                <Footprints className="h-4 w-4 text-dungeon-400" />
                                Coste de Movimiento
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex justify-between items-center border-b border-dungeon-800/50 pb-2">
                                    <span>Movimiento recto</span>
                                    <span className="font-mono bg-dungeon-900 px-2 py-0.5 rounded text-xs"><FormattedDistance feet={5} /> / casilla</span>
                                </li>
                                <li className="flex flex-col gap-1 border-b border-dungeon-800/50 pb-2">
                                    <div className="flex justify-between items-center">
                                        <span>Movimiento diagonal</span>
                                        <span className="font-mono bg-dungeon-900 px-2 py-0.5 rounded text-xs">Variable</span>
                                    </div>
                                    <p className="text-[10px] text-dungeon-400">
                                        La 1ª diagonal cuesta <FormattedDistance feet={5} />. La 2ª cuesta <FormattedDistance feet={10} />.
                                        <br />
                                        (Ej: 2 casillas diagonales = <FormattedDistance feet={15} />).
                                    </p>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-amber-400 font-medium">Terreno Difícil</span>
                                        <span className="font-mono bg-dungeon-900 px-2 py-0.5 rounded text-xs text-amber-400">x2 Coste</span>
                                    </div>
                                    <p className="text-[10px] text-dungeon-400">
                                        Escombros, maleza, escaleras. Cada casilla cuesta <strong><FormattedDistance feet={10} /></strong>.
                                        <br />
                                        <span className="text-red-400">No puedes correr ni cargar.</span>
                                    </p>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-dungeon-950/30 p-4 rounded border border-dungeon-800/50">
                            <h4 className="font-bold text-dungeon-100 mb-3">Atravesar Casillas</h4>
                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-bold text-green-400 text-xs uppercase mb-1">Aliados</h5>
                                    <p className="text-xs text-dungeon-300">
                                        Puedes moverte a través de la casilla de un amigo, pero <strong>no puedes terminar tu turno allí</strong>.
                                    </p>
                                </div>
                                <div>
                                    <h5 className="font-bold text-red-400 text-xs uppercase mb-1">Enemigos</h5>
                                    <p className="text-xs text-dungeon-300">
                                        <strong>NO</strong> puedes atravesar la casilla de un enemigo, a menos que sea mucho más grande/pequeño que tú o esté indefenso.
                                    </p>
                                </div>
                                <div className="flex items-start gap-2 bg-red-950/20 p-2 rounded border border-red-900/30">
                                    <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                                    <p className="text-[10px] text-red-200">
                                        Salir de una casilla amenazada por un enemigo provoca un <strong>Ataque de Oportunidad</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-dungeon-700 bg-dungeon-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-dungeon-100">
                            <Minimize className="h-5 w-5 text-blue-400" />
                            Criaturas Pequeñas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-dungeon-200">
                        <p className="mb-3 text-xs text-dungeon-400">Diminutas, Menudas y Finas (Gatos, Hadas, Insectos)</p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                <span><strong>Ocupan menos de 1 casilla:</strong> Pueden compartir espacio con otros.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                <span><strong>Alcance <FormattedDistance feet={0} />:</strong> Deben entrar en TU casilla para atacarte.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                <span className="text-red-300">Entrar en tu casilla provoca AdO.</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-dungeon-700 bg-dungeon-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-dungeon-100">
                            <Maximize className="h-5 w-5 text-orange-400" />
                            Criaturas Grandes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-dungeon-200">
                        <p className="mb-3 text-xs text-dungeon-400">Grandes, Enormes, Gargantuescas (Ogros, Dragones)</p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                <span><strong>Ocupan múltiples casillas:</strong> Un Ogro ocupa 2x2 (4 casillas).</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                <span><strong>Alcance Largo:</strong> Suelen atacar a <FormattedDistance feet={10} /> o más de distancia.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                <span className="text-red-300">Amenazan un área muy grande a su alrededor.</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
