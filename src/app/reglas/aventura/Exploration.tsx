'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Lightbulb, Eye, Hammer, Shield } from 'lucide-react';
import { useUnitPreference } from '@/lib/hooks/useUnitPreference';
import { formatDistance } from '@/lib/utils/distance';

export function Exploration() {
    const { unitSystem } = useUnitPreference();
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                            <Lightbulb className="h-5 w-5 text-yellow-400" />
                            Luz y Visión
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-200 text-sm">
                        <div>
                            <h4 className="font-bold text-gray-100 mb-2">Fuentes de Luz</h4>
                            <table className="w-full text-xs text-left border-collapse">
                                <thead className="text-yellow-200 border-b border-yellow-900/30 bg-yellow-950/20">
                                    <tr>
                                        <th className="p-2">Objeto</th>
                                        <th className="p-2">Luz Brillante</th>
                                        <th className="p-2">Duración</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300 divide-y divide-gray-800/30">
                                    <tr><td className="p-2">Antorcha</td><td>{formatDistance(20, unitSystem)}</td><td>1 hora</td></tr>
                                    <tr><td className="p-2">Lámpara</td><td>{formatDistance(15, unitSystem)}</td><td>6 horas/pint</td></tr>
                                    <tr><td className="p-2">Linterna Ojo de Buey</td><td>{formatDistance(60, unitSystem)} (cono)</td><td>6 horas/pint</td></tr>
                                    <tr><td className="p-2">Vara Solar</td><td>{formatDistance(30, unitSystem)}</td><td>6 horas</td></tr>
                                    <tr><td className="p-2 text-purple-300">Conjuro: Luz</td><td className="text-purple-300">{formatDistance(20, unitSystem)}</td><td className="text-purple-300">10 min/nivel</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-gray-950/30 p-2 rounded">
                            <h4 className="font-bold text-gray-100 text-xs mb-1">Tipos de Visión</h4>
                            <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                                <li><strong>Visión en la Penumbra (Elfos):</strong> Ven el doble de lejos con la misma luz.</li>
                                <li><strong>Visión en la Oscuridad (Enanos):</strong> Ven {formatDistance(60, unitSystem)} en oscuridad total (en blanco y negro).</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                            <Hammer className="h-5 w-5 text-stone-400" />
                            Romper Objetos
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-200 text-sm">
                        <p>
                            Hay dos formas de destruir un objeto:
                        </p>
                        <ul className="list-disc list-inside text-xs text-gray-300 mb-2">
                            <li><strong>Golpear (Sunder):</strong> Atacas a la CA del objeto. Restas la <strong>Dureza</strong> al daño.</li>
                            <li><strong>Romper (Burst):</strong> Haces una prueba de <strong>Fuerza</strong> contra la CD del objeto.</li>
                        </ul>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-stone-950/30 p-2 rounded">
                                <h5 className="font-bold text-stone-200 text-xs">Dureza (Hardness)</h5>
                                <p className="text-[10px] text-stone-400">
                                    Como la RD. Resta este número de cada daño que hagas al objeto.
                                    <br />
                                    Madera: 5 | Piedra: 8 | Hierro: 10
                                </p>
                            </div>
                            <div className="bg-stone-950/30 p-2 rounded">
                                <h5 className="font-bold text-stone-200 text-xs">Puntos de Golpe</h5>
                                <p className="text-[10px] text-stone-400">
                                    Cuánto aguanta antes de romperse.
                                    <br />
                                    Puerta madera: 10-15 pg.
                                    <br />
                                    Cofre hierro: 30 pg.
                                </p>
                            </div>
                        </div>

                        <div className="bg-stone-950/30 p-2 rounded">
                            <h4 className="font-bold text-stone-200 text-xs mb-2">Ejemplos Comunes</h4>
                            <table className="w-full text-xs text-left border-collapse">
                                <thead className="text-stone-300 border-b border-stone-800/50">
                                    <tr>
                                        <th className="p-1">Objeto</th>
                                        <th className="p-1">Dureza</th>
                                        <th className="p-1">PG</th>
                                        <th className="p-1">CD Romper</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300 divide-y divide-stone-800/30">
                                    <tr><td className="p-1">Puerta de Madera</td><td>5</td><td>10-15</td><td>13-18</td></tr>
                                    <tr><td className="p-1">Puerta Reforzada</td><td>5</td><td>20</td><td>23</td></tr>
                                    <tr><td className="p-1">Cofre Pequeño</td><td>5</td><td>5</td><td>17</td></tr>
                                    <tr><td className="p-1">Grilletes</td><td>10</td><td>10</td><td>26</td></tr>
                                    <tr><td className="p-1">Muro de Piedra ({formatDistance(1, unitSystem, false)} {unitSystem === 'metric' ? 'm' : 'pie'})</td><td>8</td><td>90</td><td>35+</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-red-950/20 p-2 rounded">
                            <h4 className="font-bold text-red-200 text-xs mb-1">Daño de Energía vs Objetos</h4>
                            <ul className="text-xs text-gray-300 space-y-1">
                                <li><span className="text-green-400">Ácido / Sónico:</span> Daño completo.</li>
                                <li><span className="text-orange-400">Fuego / Electricidad:</span> Mitad de daño.</li>
                                <li><span className="text-blue-400">Frío:</span> Un cuarto de daño.</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
