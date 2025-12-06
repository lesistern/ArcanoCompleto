import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Wand2, Brain, Zap, Shield, AlertTriangle, Layers, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SpellcastingBasicsProps {
    onNextTab?: () => void;
}

export function SpellcastingBasics({ onNextTab }: SpellcastingBasicsProps) {
    const scrollToId = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Concentración */}
                <Card id="concentration" className="border-dungeon-700 bg-dungeon-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-dungeon-100">
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                            Concentración
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-dungeon-200 text-sm">
                        <p>
                            Lanzar un conjuro requiere enfoque mental. Si te golpean o distraen mientras lanzas, puedes perder el conjuro.
                        </p>
                        <div className="bg-dungeon-950/30 p-3 rounded border border-dungeon-800">
                            <h4 className="font-bold text-dungeon-100 mb-2 text-xs uppercase tracking-wider">Prueba de Concentración</h4>
                            <p className="font-mono text-purple-300 text-center text-lg mb-2">
                                1d20 + Mod. Constitución + Rangos
                            </p>
                            <p className="text-xs text-dungeon-400 text-center">vs CD de la Distracción</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-dungeon-300 text-xs">CDs Comunes:</h4>
                            <ul className="list-disc list-inside text-xs text-dungeon-400 space-y-1">
                                <li><strong>Daño recibido:</strong> 10 + Daño + Nivel Conjuro</li>
                                <li><strong>Movimiento vigoroso:</strong> 10 + Nivel Conjuro</li>
                                <li><strong>Enredado/Apresado:</strong> 20 + Nivel Conjuro</li>
                            </ul>
                        </div>
                        <div className="flex justify-end pt-2">
                            <Button variant="ghost" size="sm" onClick={() => scrollToId('counterspells')} className="text-purple-300 hover:text-purple-200">
                                Siguiente: Contraconjuros <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Contraconjuros y Nivel de Lanzador */}
                <div className="space-y-6">
                    <Card id="counterspells" className="border-dungeon-700 bg-dungeon-900/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-dungeon-100">
                                <Shield className="h-5 w-5 text-blue-400" />
                                Contraconjuros
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-dungeon-200 text-sm">
                            <p>
                                Puedes intentar anular el conjuro de un oponente mientras lo está lanzando.
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-xs text-dungeon-300">
                                <li><strong>Acción Preparada:</strong> Debes preparar tu acción para esperar a que el oponente lance su conjuro.</li>
                                <li><strong>Identificar:</strong> Realizas una prueba de Conocimiento de Conjuros para saber qué está lanzando.</li>
                                <li><strong>Anular:</strong> Debes gastar el mismo conjuro (o <em>Disipar Magia</em>) para contrarrestar el efecto del oponente.</li>
                            </ul>
                            <div className="flex justify-end pt-2">
                                <Button variant="ghost" size="sm" onClick={() => scrollToId('caster-level')} className="text-blue-300 hover:text-blue-200">
                                    Siguiente: Nivel de Lanzador <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card id="caster-level" className="border-dungeon-700 bg-dungeon-900/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-dungeon-100">
                                <Wand2 className="h-5 w-5 text-gold-400" />
                                Nivel de Lanzador (NL)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-dungeon-200 text-sm">
                            <p>
                                Representa la potencia de tu magia, generalmente igual a tu nivel en la clase lanzadora.
                            </p>
                            <div className="bg-dungeon-950/30 p-2 rounded">
                                <p className="text-[10px] text-dungeon-400 italic">
                                    Ejemplo: Una Bola de Fuego lanzada por un Mago de Nivel 10 es más potente (10d6 daño) que una de Nivel 5 (5d6 daño).
                                </p>
                            </div>
                            <div className="flex justify-end pt-2">
                                <Button variant="ghost" size="sm" onClick={() => scrollToId('stacking')} className="text-gold-300 hover:text-gold-200">
                                    Siguiente: Combinar Efectos <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Combinar Efectos */}
            <Card id="stacking" className="border-dungeon-700 bg-dungeon-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-dungeon-100">
                        <Layers className="h-5 w-5 text-green-400" />
                        Combinar Efectos (Stacking)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-dungeon-200 text-sm">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold text-green-400 mb-2">Reglas de Apilamiento</h4>
                            <p className="text-xs text-dungeon-300 mb-2">
                                Generalmente, los bonificadores del mismo tipo no se suman entre sí.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-xs text-dungeon-300">
                                <li>
                                    <strong>Bonos Iguales NO suman:</strong> Dos objetos que den bonificador de "Desvío" no se suman, solo cuenta el mayor.
                                </li>
                                <li>
                                    <strong>Tipos Diferentes SÍ suman:</strong> Un bonificador de "Armadura" y uno de "Desvío" se suman porque son tipos distintos.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-green-400 mb-2">Ejemplo Práctico</h4>
                            <div className="bg-dungeon-950/30 p-3 rounded border border-dungeon-800">
                                <ul className="space-y-2 text-[11px]">
                                    <li className="flex justify-between">
                                        <span className="text-dungeon-400">Fuerza de Toro (+4 Mejora)</span>
                                        <span className="text-green-400">✅ Aplica</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-dungeon-400">Cinto de Fuerza (+4 Mejora)</span>
                                        <span className="text-red-400">❌ No suma (Mismo tipo)</span>
                                    </li>
                                    <li className="flex justify-between border-t border-dungeon-700 pt-1 mt-1">
                                        <span className="text-dungeon-200 font-bold">Total Bono Fuerza</span>
                                        <span className="text-green-300 font-bold">+4 (No +8)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {onNextTab && (
                        <div className="flex justify-end pt-4 border-t border-dungeon-800 mt-4">
                            <Button onClick={onNextTab} className="bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-100">
                                Siguiente Sección: Anatomía <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
