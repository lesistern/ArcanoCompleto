import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Sword, Shield, Heart, Activity, Dna, ArrowDown, HelpCircle, Hand, EyeOff, Clock, AlertTriangle } from 'lucide-react';

export function CombatBasics() {
    return (
        <div className="space-y-6">
            <Card className="border-dungeon-700 bg-dungeon-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-dungeon-100">
                        <Activity className="h-5 w-5 text-blue-400" />
                        Secuencia de Combate Paso a Paso
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-dungeon-200">
                    <p className="text-sm">
                        El combate en D&D es cíclico. El tiempo se divide en unidades de <strong>6 segundos</strong> llamadas <strong>Asaltos (Rounds)</strong>.
                        Durante un asalto, todos los participantes tienen su turno para actuar.
                    </p>

                    <div className="space-y-4 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-dungeon-800 -z-10"></div>

                        {/* Step 1: Start */}
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold shadow-lg shadow-blue-900/20 z-10">1</div>
                            <div className="bg-dungeon-950/40 p-4 rounded border border-dungeon-800/50 flex-1">
                                <h4 className="font-bold text-dungeon-100 text-sm mb-2">Inicio: ¿Hay Sorpresa?</h4>
                                <p className="text-xs text-dungeon-300 mb-2">
                                    El DM determina si alguien fue pillado desprevenido (ej: emboscada).
                                </p>
                                <ul className="text-xs text-dungeon-400 list-disc list-inside bg-dungeon-900/50 p-2 rounded">
                                    <li>Si todos se ven: Pasa directo al paso 3.</li>
                                    <li>Si algunos no se ven: Ocurre un <strong>Asalto de Sorpresa</strong>.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Step 2: Initiative */}
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold shadow-lg shadow-blue-900/20 z-10">2</div>
                            <div className="bg-dungeon-950/40 p-4 rounded border border-dungeon-800/50 flex-1">
                                <h4 className="font-bold text-dungeon-100 text-sm mb-2">Tirar Iniciativa</h4>
                                <p className="text-xs text-dungeon-300 mb-2">
                                    Todos tiran <strong>1d20 + Mod. Destreza</strong>.
                                </p>
                                <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-950/20 p-2 rounded border border-amber-900/30">
                                    <AlertTriangle className="h-3 w-3" />
                                    <span>Estás <strong>Desprevenido</strong> hasta que llegue tu primer turno.</span>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Surprise Round */}
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold shadow-lg shadow-purple-900/20 z-10">3</div>
                            <div className="bg-dungeon-950/40 p-4 rounded border border-dungeon-800/50 flex-1">
                                <h4 className="font-bold text-dungeon-100 text-sm mb-2">Asalto de Sorpresa (Solo si aplica)</h4>
                                <p className="text-xs text-dungeon-300 mb-2">
                                    Solo actúan los que son conscientes de sus enemigos.
                                </p>
                                <p className="text-xs text-dungeon-400 italic">
                                    Limitación: Solo pueden hacer una <strong>Acción Estándar</strong> o de <strong>Movimiento</strong> (no ambas).
                                </p>
                            </div>
                        </div>

                        {/* Step 4: Regular Rounds */}
                        <div className="flex items-start gap-4">
                            <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold shadow-lg shadow-green-900/20 z-10">4</div>
                            <div className="bg-dungeon-950/40 p-4 rounded border border-dungeon-800/50 flex-1">
                                <h4 className="font-bold text-dungeon-100 text-sm mb-2">Asaltos Regulares (El Ciclo)</h4>
                                <p className="text-xs text-dungeon-300 mb-2">
                                    Los combatientes actúan en orden de Iniciativa (de mayor a menor).
                                </p>
                                <ul className="text-xs text-dungeon-400 list-disc list-inside space-y-1">
                                    <li>Cada uno tiene un <strong>Turno Completo</strong>.</li>
                                    <li>Cuando el último termina, empieza un nuevo asalto con el mismo orden.</li>
                                    <li>Esto se repite hasta que un bando gana o huye.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-dungeon-700 bg-dungeon-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-dungeon-100">
                            <Sword className="h-5 w-5 text-red-400" />
                            Ataque y Daño
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-dungeon-200 text-sm">
                        <div className="bg-red-950/20 border border-red-900/30 p-3 rounded">
                            <h4 className="font-bold text-red-200 mb-2 text-xs uppercase">Fórmula de Ataque</h4>
                            <div className="font-mono text-center text-lg bg-dungeon-950/50 p-2 rounded border border-dungeon-800 mb-2">
                                1d20 + Ataque Base + Mod. Característica
                            </div>
                            <p className="text-xs text-dungeon-300 text-center">
                                Si el resultado es <strong>igual o mayor</strong> a la CA del enemigo, ¡impactas!
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs border-b border-dungeon-800 pb-1">
                                <span>1 Natural (pifia)</span>
                                <span className="text-red-400 font-bold">Fallo Automático</span>
                            </div>
                            <div className="flex justify-between text-xs border-b border-dungeon-800 pb-1">
                                <span>20 Natural (crítico)</span>
                                <span className="text-green-400 font-bold">Impacto Automático</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-dungeon-100 mb-1">Daño</h4>
                            <p className="text-xs text-dungeon-300 mb-2">Si impactas, tiras los dados de daño de tu arma.</p>
                            <ul className="list-disc list-inside text-xs text-dungeon-300 space-y-1">
                                <li><strong>Arma a una mano:</strong> + Mod. Fuerza completo.</li>
                                <li><strong>Arma a dos manos:</strong> + 1.5 veces tu Mod. Fuerza.</li>
                                <li><strong>Mano torpe (segunda arma):</strong> + 0.5 veces tu Mod. Fuerza.</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-dungeon-700 bg-dungeon-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-dungeon-100">
                            <Shield className="h-5 w-5 text-blue-400" />
                            Defensa (CA)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-dungeon-200 text-sm">
                        <p>Tu <strong>Clase de Armadura (CA)</strong> es el número que el enemigo debe superar para herirte.</p>

                        <div className="bg-blue-950/20 border border-blue-900/30 p-3 rounded">
                            <h4 className="font-bold text-blue-200 mb-2 text-xs uppercase">Fórmula de CA Normal</h4>
                            <div className="font-mono text-center text-lg bg-dungeon-950/50 p-2 rounded border border-dungeon-800">
                                10 + Armadura + Escudo + Des
                            </div>
                        </div>

                        <div className="space-y-3 mt-2">
                            <div className="bg-dungeon-950/30 p-3 rounded border border-dungeon-800/50">
                                <h5 className="font-bold text-dungeon-100 text-xs mb-1 flex items-center gap-2">
                                    <Hand className="h-3 w-3 text-purple-400" />
                                    CA de Toque (Touch AC)
                                </h5>
                                <p className="text-xs text-dungeon-300 mb-2">
                                    Se usa cuando el ataque solo necesita <strong>tocarte</strong> para afectarte (ej: rayos mágicos, trampas de contacto). Tu armadura dura no ayuda aquí.
                                </p>
                                <div className="font-mono text-center text-xs bg-dungeon-900/50 p-1 rounded text-dungeon-400">
                                    10 + Destreza + Tamaño
                                </div>
                                <p className="text-[10px] text-red-300 mt-1 text-center">
                                    (Ignoras Armadura y Escudo)
                                </p>
                            </div>

                            <div className="bg-dungeon-950/30 p-3 rounded border border-dungeon-800/50">
                                <h5 className="font-bold text-dungeon-100 text-xs mb-1 flex items-center gap-2">
                                    <EyeOff className="h-3 w-3 text-amber-400" />
                                    CA Desprevenido (Flat-footed)
                                </h5>
                                <p className="text-xs text-dungeon-300 mb-2">
                                    Se usa cuando <strong>no puedes reaccionar</strong> (sorpresa, invisible, escalando). No puedes moverte para esquivar.
                                </p>
                                <div className="font-mono text-center text-xs bg-dungeon-900/50 p-1 rounded text-dungeon-400">
                                    10 + Armadura + Escudo + Tamaño
                                </div>
                                <p className="text-[10px] text-red-300 mt-1 text-center">
                                    (Ignoras tu Destreza)
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-dungeon-700 bg-dungeon-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-dungeon-100">
                        <Dna className="h-5 w-5 text-green-400" />
                        Modificadores de Tamaño
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="text-sm text-dungeon-200">
                            <p className="mb-4">
                                El tamaño de una criatura afecta drásticamente sus capacidades en combate. No es solo cuestión de altura, sino de masa y agilidad.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-dungeon-950/30 p-3 rounded border border-dungeon-800/50">
                                    <h5 className="font-bold text-green-400 text-xs uppercase mb-2">Ser Pequeño</h5>
                                    <ul className="space-y-2 text-xs text-dungeon-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400 font-bold">+</span>
                                            <span>Más difícil de golpear (+CA).</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400 font-bold">+</span>
                                            <span>Más preciso al atacar (+Ataque).</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400 font-bold">+</span>
                                            <span>Mucho mejor escondiéndose (+4 Sigilo).</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-400 font-bold">-</span>
                                            <span>Muy débil en presas (-4 Presa).</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-dungeon-950/30 p-3 rounded border border-dungeon-800/50">
                                    <h5 className="font-bold text-orange-400 text-xs uppercase mb-2">Ser Grande</h5>
                                    <ul className="space-y-2 text-xs text-dungeon-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-400 font-bold">-</span>
                                            <span>Más fácil de golpear (-CA).</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-400 font-bold">-</span>
                                            <span>Menos preciso al atacar (-Ataque).</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400 font-bold">+</span>
                                            <span>Muy fuerte en presas (+4 Presa).</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400 font-bold">+</span>
                                            <span>Mayor alcance (10+ pies).</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left border-collapse">
                                <thead className="text-dungeon-100 border-b border-dungeon-700 bg-dungeon-950/50">
                                    <tr>
                                        <th className="p-2">Tamaño</th>
                                        <th className="p-2 text-center">Ataque / CA</th>
                                        <th className="p-2 text-center">Presa (Grapple)</th>
                                        <th className="p-2 text-center">Sigilo (Hide)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-dungeon-300 divide-y divide-dungeon-800">
                                    <tr>
                                        <td className="p-2 font-medium text-dungeon-200">Colosal</td>
                                        <td className="p-2 text-center text-red-400">-8</td>
                                        <td className="p-2 text-center text-green-400">+16</td>
                                        <td className="p-2 text-center text-red-400">-16</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-medium text-dungeon-200">Gargantuesco</td>
                                        <td className="p-2 text-center text-red-400">-4</td>
                                        <td className="p-2 text-center text-green-400">+12</td>
                                        <td className="p-2 text-center text-red-400">-12</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-medium text-dungeon-200">Enorme</td>
                                        <td className="p-2 text-center text-red-400">-2</td>
                                        <td className="p-2 text-center text-green-400">+8</td>
                                        <td className="p-2 text-center text-red-400">-8</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-medium text-dungeon-200">Grande</td>
                                        <td className="p-2 text-center text-red-400">-1</td>
                                        <td className="p-2 text-center text-green-400">+4</td>
                                        <td className="p-2 text-center text-red-400">-4</td>
                                    </tr>
                                    <tr className="bg-dungeon-800/20">
                                        <td className="p-2 font-medium text-dungeon-100">Mediano</td>
                                        <td className="p-2 text-center text-dungeon-400">0</td>
                                        <td className="p-2 text-center text-dungeon-400">0</td>
                                        <td className="p-2 text-center text-dungeon-400">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-medium text-dungeon-200">Pequeño</td>
                                        <td className="p-2 text-center text-green-400">+1</td>
                                        <td className="p-2 text-center text-red-400">-4</td>
                                        <td className="p-2 text-center text-green-400">+4</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-medium text-dungeon-200">Diminuto</td>
                                        <td className="p-2 text-center text-green-400">+2</td>
                                        <td className="p-2 text-center text-red-400">-8</td>
                                        <td className="p-2 text-center text-green-400">+8</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-medium text-dungeon-200">Minúsculo</td>
                                        <td className="p-2 text-center text-green-400">+4</td>
                                        <td className="p-2 text-center text-red-400">-12</td>
                                        <td className="p-2 text-center text-green-400">+12</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-medium text-dungeon-200">Fino</td>
                                        <td className="p-2 text-center text-green-400">+8</td>
                                        <td className="p-2 text-center text-red-400">-16</td>
                                        <td className="p-2 text-center text-green-400">+16</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
