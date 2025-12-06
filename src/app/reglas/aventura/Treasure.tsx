import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Coins, Crown, Castle, Scale } from 'lucide-react';

export function Treasure() {
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-dungeon-700 bg-dungeon-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-dungeon-100">
                            <Coins className="h-5 w-5 text-yellow-400" />
                            Tesoros y Reparto
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-dungeon-200 text-sm">
                        <p>
                            La regla de oro: <strong>Repartir equitativamente</strong>.
                        </p>
                        <div className="bg-yellow-950/20 p-3 rounded">
                            <h4 className="font-bold text-yellow-200 text-xs mb-2 flex items-center gap-2">
                                <Scale className="h-3 w-3" />
                                Objetos Mágicos
                            </h4>
                            <p className="text-xs text-dungeon-300 mb-2">
                                Los objetos mágicos son difíciles de dividir.
                            </p>
                            <ul className="list-disc list-inside text-xs text-dungeon-300 space-y-1">
                                <li><strong>Venta:</strong> Si lo vendes, obtienes el <strong>50%</strong> de su valor de mercado.</li>
                                <li><strong>Quedárselo:</strong> Si un jugador se lo queda, cuenta como parte de su "paga".</li>
                            </ul>
                            <p className="text-[10px] text-dungeon-400 mt-2 italic">
                                Ejemplo: Si hay 5000 po y un escudo de 1000 po. El tesoro total es 6000 po. Cada uno (de 4) recibe 1500 po. El que se queda el escudo recibe el escudo + 500 po.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-dungeon-700 bg-dungeon-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-dungeon-100">
                            <Crown className="h-5 w-5 text-purple-400" />
                            Otras Recompensas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-dungeon-200 text-sm">
                        <div className="flex gap-3 items-start">
                            <div className="bg-purple-950/30 p-2 rounded text-purple-300"><Crown className="h-4 w-4" /></div>
                            <div>
                                <h4 className="font-bold text-dungeon-100 text-xs">Títulos y Honores</h4>
                                <p className="text-xs text-dungeon-300">
                                    Ser nombrado Caballero, Barón o Defensor del Reino. Otorga prestigio y acceso a la corte.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start">
                            <div className="bg-stone-950/30 p-2 rounded text-stone-300"><Castle className="h-4 w-4" /></div>
                            <div>
                                <h4 className="font-bold text-dungeon-100 text-xs">Tierras y Fortalezas</h4>
                                <p className="text-xs text-dungeon-300">
                                    Un castillo en la frontera o una torre de mago. Generan ingresos (impuestos) pero requieren mantenimiento y defensa.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-dungeon-700 bg-dungeon-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-dungeon-100">
                            <Coins className="h-5 w-5 text-stone-400" />
                            Gastos y Fondo del Grupo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-dungeon-200 text-sm">
                        <div>
                            <h4 className="font-bold text-dungeon-100 text-xs mb-1">Costes de Aventura</h4>
                            <p className="text-xs text-dungeon-300">
                                A veces hay que pagar para curar una maldición o revivir a un compañero.
                                <br />
                                <span className="italic">Regla recomendada:</span> Pagar estos gastos del tesoro total <strong>antes</strong> de repartir el botín.
                            </p>
                        </div>
                        <div className="bg-stone-950/30 p-2 rounded">
                            <h4 className="font-bold text-stone-200 text-xs mb-1">Fondo del Grupo (Party Fund)</h4>
                            <p className="text-xs text-dungeon-300">
                                Es útil guardar un 10-20% del tesoro en un "bote" común para comprar pociones de curación, sobornos o pagar posadas para todos.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-dungeon-700 bg-dungeon-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-dungeon-100">
                            <Coins className="h-5 w-5 text-gold-400" />
                            Riqueza por Nivel
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-dungeon-200 text-sm">
                        <p className="text-xs text-dungeon-300">
                            Valor total estimado del equipo de un PJ al iniciar en un nivel superior al 1.
                        </p>
                        <div className="h-64 overflow-y-auto pr-2 custom-scrollbar">
                            <table className="w-full text-xs text-left border-collapse">
                                <thead className="text-dungeon-200 sticky top-0 bg-dungeon-900">
                                    <tr>
                                        <th className="p-2 border-b border-dungeon-700">Nivel</th>
                                        <th className="p-2 border-b border-dungeon-700">Riqueza (po)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dungeon-800/30">
                                    {[
                                        { l: 1, g: '300' }, { l: 2, g: '900' }, { l: 3, g: '2,700' }, { l: 4, g: '5,400' },
                                        { l: 5, g: '9,000' }, { l: 6, g: '13,000' }, { l: 7, g: '19,000' }, { l: 8, g: '27,000' },
                                        { l: 9, g: '36,000' }, { l: 10, g: '49,000' }, { l: 11, g: '66,000' }, { l: 12, g: '88,000' },
                                        { l: 13, g: '110,000' }, { l: 14, g: '150,000' }, { l: 15, g: '200,000' }, { l: 16, g: '260,000' },
                                        { l: 17, g: '340,000' }, { l: 18, g: '440,000' }, { l: 19, g: '580,000' }, { l: 20, g: '760,000' }
                                    ].map((row) => (
                                        <tr key={row.l}>
                                            <td className="p-2 text-dungeon-300">{row.l}º</td>
                                            <td className="p-2 text-gold-400 font-mono">{row.g} po</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
