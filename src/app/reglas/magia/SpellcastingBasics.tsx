import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Battery, Zap, Target, Skull, ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SpellcastingBasicsProps {
    onNextTab?: () => void;
}

export function SpellcastingBasics({ onNextTab }: SpellcastingBasicsProps) {

    return (
        <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg flex gap-4 items-start">
                <HelpCircle className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-blue-300 text-lg">¿Cómo lanzo un hechizo?</h3>
                    <p className="text-gray-200 text-sm">
                        Lanzar un conjuro requiere seguir un proceso. Estos 4 pasos te guiarán para canalizar tu magia correctamente.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* PASO 1 */}
                <Card id="step-1" className="border-gray-700 bg-gray-900/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-gray-800 px-3 py-1 rounded-bl text-xs font-bold text-gray-400">PASO 1</div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                            <Battery className="h-5 w-5 text-purple-400" />
                            La Energía (Espacios)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-200 text-sm">
                        <p>
                            Antes de nada, ¿te queda energía? En D&D, tu magia se mide en <strong>Espacios de Conjuro</strong> (Spell Slots).
                        </p>
                        <div className="bg-gray-950/30 p-3 rounded border border-purple-500/20">
                            <ul className="space-y-2 text-xs">
                                <li className="flex items-center gap-2">
                                    <span className="bg-purple-900/50 px-2 py-0.5 rounded text-purple-300 font-bold">Nivel 1</span>
                                    <span>Conjuros básicos. Tienes varios al día.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="bg-purple-900/50 px-2 py-0.5 rounded text-purple-300 font-bold">Nivel 9</span>
                                    <span>Conjuros devastadores. Tienes muy pocos (o ninguno).</span>
                                </li>
                            </ul>
                        </div>
                        <p className="text-xs text-gray-400 italic">
                            Si no tienes espacios de ese nivel, no puedes lanzar ese conjuro. Descansa para recuperarlos.
                        </p>
                    </CardContent>
                </Card>

                {/* PASO 2 */}
                <Card id="step-2" className="border-gray-700 bg-gray-900/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-gray-800 px-3 py-1 rounded-bl text-xs font-bold text-gray-400">PASO 2</div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                            <Zap className="h-5 w-5 text-yellow-400" />
                            La Canalización (Lanzar)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-200 text-sm">
                        <p>
                            Ahora gastas tu acción para liberar la magia.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-xs text-gray-300">
                            <li>
                                <strong>No te distraigas:</strong> Si te pegan mientras lanzas, ¡puedes perder el hechizo! (Esto se llama <em>Concentración</em>).
                            </li>
                            <li>
                                <strong>No lleves armadura (si eres mago):</strong> La armadura estorba tus movimientos mágicos y puede hacer que falles.
                            </li>
                        </ul>
                        <div className="bg-yellow-900/10 p-2 rounded border border-yellow-500/20 text-center">
                            <span className="text-yellow-200 font-bold text-xs">El conjuro sale de tus manos.</span>
                        </div>
                    </CardContent>
                </Card>

                {/* PASO 3 */}
                <Card id="step-3" className="border-gray-700 bg-gray-900/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-gray-800 px-3 py-1 rounded-bl text-xs font-bold text-gray-400">PASO 3</div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                            <Target className="h-5 w-5 text-red-400" />
                            ¿Le di? (Ataque vs CD)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-200 text-sm">
                        <p>
                            Hay dos formas de saber si tu magia afecta al enemigo. El conjuro te dirá cuál usar:
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gray-950/30 p-2 rounded border border-red-500/20">
                                <strong className="text-red-300 block text-xs mb-1">Ataque de Toque</strong>
                                <p className="text-[10px] text-gray-400">
                                    TÚ tiras el dado (d20). Si superas su Armadura, le das. Es tu puntería mágica.
                                </p>
                            </div>
                            <div className="bg-gray-950/30 p-2 rounded border border-blue-500/20">
                                <strong className="text-blue-300 block text-xs mb-1">Salvación (CD)</strong>
                                <p className="text-[10px] text-gray-400">
                                    ÉL tira el dado. Debe superar tu <strong>Clase de Dificultad (CD)</strong> para resistir.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* PASO 4 */}
                <Card id="step-4" className="border-gray-700 bg-gray-900/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-gray-800 px-3 py-1 rounded-bl text-xs font-bold text-gray-400">PASO 4</div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                            <Skull className="h-5 w-5 text-green-400" />
                            El Resultado
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-200 text-sm">
                        <p>
                            Si tuviste éxito (o él falló su salvación), ¡aplica el efecto!
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-xs text-gray-300">
                            <li><strong>Daño:</strong> Tira los dados de daño (ej. 6d6 fuego).</li>
                            <li><strong>Estado:</strong> El enemigo queda paralizado, dormido, etc.</li>
                            <li><strong>Mitad:</strong> A veces, aunque el enemigo resista, recibe la mitad del daño. ¡Algo es algo!</li>
                        </ul>
                        {onNextTab && (
                            <div className="flex justify-end pt-4 border-t border-gray-800 mt-4">
                                <Button onClick={onNextTab} className="bg-blue-600 hover:bg-blue-500 text-white">
                                    Ir a: Como leer un conjuro <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
