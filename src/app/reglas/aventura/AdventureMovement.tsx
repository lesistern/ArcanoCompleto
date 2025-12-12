'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Footprints, Map, Compass, AlertTriangle } from 'lucide-react';
import { useUnitPreference } from '@/lib/hooks/useUnitPreference';
import { formatDistance, formatMiles } from '@/lib/utils/distance';

export function AdventureMovement() {
    const { unitSystem } = useUnitPreference();
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100 text-base">
                            <Footprints className="h-4 w-4 text-blue-400" />
                            Táctico
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-gray-200">
                        <p className="mb-2"><strong>Para Combate.</strong></p>
                        <p>Se mide en {unitSystem === 'metric' ? 'metros' : 'pies'} (o casillas) por asalto (6 segundos).</p>
                        <div className="mt-2 bg-gray-950/30 p-2 rounded">
                            <p>Humano: {formatDistance(30, unitSystem)}/asalto</p>
                            <p>Enano: {formatDistance(20, unitSystem)}/asalto</p>
                            <p className="mt-1 text-[10px] text-gray-400">
                                Correr: x4 (Ligera/Sin armadura) | x3 (Pesada)
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100 text-base">
                            <Compass className="h-4 w-4 text-green-400" />
                            Local
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-gray-200">
                        <p className="mb-2"><strong>Para Mazmorras.</strong></p>
                        <p>Se mide en {unitSystem === 'metric' ? 'metros' : 'pies'} por minuto.</p>
                        <div className="mt-2 bg-gray-950/30 p-2 rounded">
                            <p>Caminar: {formatDistance(300, unitSystem)}/min</p>
                            <p>Buscar trampas: Mitad de velocidad</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100 text-base">
                            <Map className="h-4 w-4 text-amber-400" />
                            Por Tierra
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-gray-200">
                        <p className="mb-2"><strong>Para Viajes.</strong></p>
                        <p>Se mide en {unitSystem === 'metric' ? 'kilómetros' : 'millas'} por hora o día.</p>
                        <div className="mt-2 bg-gray-950/30 p-2 rounded">
                            <p>Caminar: {formatMiles(3, unitSystem)}/hora</p>
                            <p>Día (8h): {formatMiles(24, unitSystem)}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                            <AlertTriangle className="h-5 w-5 text-orange-400" />
                            Terreno y Marcha Forzada
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-200 text-sm">
                        <div>
                            <h4 className="font-bold text-gray-100 mb-1">Terreno Difícil</h4>
                            <p className="text-xs text-gray-300">
                                Bosques densos, pantanos, montañas.
                                <br />
                                <span className="text-orange-300">Coste: x2 (Te mueves a la mitad).</span>
                                <br />
                                Si no hay camino (campo a través), la velocidad se reduce aún más.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-100 mb-1">Marcha Forzada</h4>
                            <p className="text-xs text-gray-300">
                                Caminar más de 8 horas al día.
                            </p>
                            <ul className="list-disc list-inside mt-1 text-xs text-gray-400">
                                <li>Cada hora extra requiere prueba de <strong>Constitución (CD 10 + 2/hora)</strong>.</li>
                                <li>Fallo: <strong>1d6 daño no letal</strong> y quedas <strong>Fatigado</strong>.</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                            <Footprints className="h-5 w-5 text-stone-400" />
                            Monturas y Vehículos
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-200">
                        <table className="w-full text-xs text-left border-collapse">
                            <thead className="text-gray-200 border-b border-gray-800 bg-gray-950/20">
                                <tr>
                                    <th className="p-2">Transporte</th>
                                    <th className="p-2">Por Hora</th>
                                    <th className="p-2">Por Día</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300 divide-y divide-gray-800/30">
                                <tr><td className="p-2">Caballo Ligero</td><td>{formatMiles(6, unitSystem)}</td><td>{formatMiles(48, unitSystem)}</td></tr>
                                <tr><td className="p-2">Caballo Pesado</td><td>{formatMiles(5, unitSystem)}</td><td>{formatMiles(40, unitSystem)}</td></tr>
                                <tr><td className="p-2">Pony / Mula</td><td>{formatMiles(3, unitSystem)}</td><td>{formatMiles(24, unitSystem)}</td></tr>
                                <tr><td className="p-2">Carreta</td><td>{formatMiles(2, unitSystem)}</td><td>{formatMiles(16, unitSystem)}</td></tr>
                                <tr><td className="p-2 text-blue-300">Barco de Vela</td><td className="text-blue-300">{formatMiles(2, unitSystem)}</td><td className="text-blue-300">{formatMiles(48, unitSystem)} (24h)</td></tr>
                            </tbody>
                        </table>
                        <p className="text-[10px] text-gray-400 mt-2">
                            * Los caballos también se cansan y sufren daño letal si se les fuerza a marchar.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                            <Footprints className="h-5 w-5 text-cyan-400" />
                            Movimiento Especial
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-200 text-sm">
                        <div>
                            <h4 className="font-bold text-gray-100 mb-1">Vuelo y Maniobrabilidad</h4>
                            <p className="text-xs text-gray-300 mb-2">
                                Volar no es tan fácil como caminar. Cada criatura tiene una clase de maniobrabilidad.
                            </p>
                            <div className="bg-gray-950/30 p-2 rounded grid grid-cols-2 gap-2 text-xs">
                                <div>
                                    <span className="text-cyan-300 font-bold">Perfecta/Buena:</span>
                                    <br />Puede flotar y girar fácil.
                                </div>
                                <div>
                                    <span className="text-red-300 font-bold">Media/Pobre:</span>
                                    <br />Debe moverse para no caer. Giros amplios.
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-100 mb-1">Persecuciones</h4>
                            <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                                <li>
                                    <strong>Corta (Rondas):</strong> Chequeos opuestos de <span className="text-green-400">Destreza</span>.
                                </li>
                                <li>
                                    <strong>Larga (Horas):</strong> Chequeos opuestos de <span className="text-orange-400">Constitución</span>.
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                            <Map className="h-5 w-5 text-purple-400" />
                            Orden de Marcha
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-200">
                        <p className="mb-2">
                            Decidir quién va delante y quién detrás es vital para sobrevivir a una emboscada.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 text-xs text-center">
                            <div className="bg-gray-950/30 p-2 rounded">
                                <strong className="text-red-400 block mb-1">Vanguardia</strong>
                                <p className="text-gray-300">Guerreros, Paladines, Bárbaros.</p>
                                <p className="text-[10px] text-gray-400">Los más duros para recibir el primer golpe.</p>
                            </div>
                            <div className="bg-gray-950/30 p-2 rounded">
                                <strong className="text-blue-400 block mb-1">Centro</strong>
                                <p className="text-gray-300">Magos, Hechiceros, Bardos.</p>
                                <p className="text-[10px] text-gray-400">Protegidos por ambos lados.</p>
                            </div>
                            <div className="bg-gray-950/30 p-2 rounded">
                                <strong className="text-green-400 block mb-1">Retaguardia</strong>
                                <p className="text-gray-300">Clérigos, Druidas, Pícaros.</p>
                                <p className="text-[10px] text-gray-400">Vigilan la espalda y protegen a los débiles.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
