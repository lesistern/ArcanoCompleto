'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Dumbbell, Shield, ArrowDown } from 'lucide-react';
import { useUnitPreference } from '@/lib/hooks/useUnitPreference';
import { formatDistance } from '@/lib/utils/distance';
import { formatWeight, CARRYING_CAPACITY_TABLE } from '@/lib/utils/weight';

export function CarryingCapacity() {
    const { unitSystem } = useUnitPreference();
    return (
        <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-6">
                <p className="text-dungeon-200 text-sm">
                    Todo aventurero necesita equipo, pero llevar demasiado peso te ralentiza.
                    <br />
                    Aquí explicamos cómo afecta el peso de tu mochila a tu capacidad de combate y movimiento.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-dungeon-700 bg-dungeon-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-dungeon-100">
                            <Dumbbell className="h-5 w-5 text-orange-400" />
                            Capacidad de Carga
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-dungeon-200 text-sm">
                        <p>
                            Tu Fuerza determina cuánto puedes llevar. Se divide en tres categorías:
                        </p>
                        <div className="space-y-2">
                            <div className="bg-green-950/20 p-2 rounded flex justify-between items-center">
                                <span className="font-bold text-green-200">Carga Ligera</span>
                                <span className="text-xs text-green-400">Sin penalizadores</span>
                            </div>
                            <div className="bg-yellow-950/20 p-2 rounded flex justify-between items-center">
                                <span className="font-bold text-yellow-200">Carga Media</span>
                                <span className="text-xs text-yellow-400">Lento (-{formatDistance(10, unitSystem)}), Max Des +3, Penalizador -3</span>
                            </div>
                            <div className="bg-red-950/20 p-2 rounded flex justify-between items-center">
                                <span className="font-bold text-red-200">Carga Pesada</span>
                                <span className="text-xs text-red-400">Muy Lento (-{formatDistance(10, unitSystem)}), Max Des +1, Penalizador -6</span>
                            </div>
                        </div>
                        <p className="text-xs text-dungeon-400 italic mt-2">
                            Nota: Si llevas armadura, usa el penalizador que sea peor (el de la armadura o el de la carga), no se suman.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-dungeon-700 bg-dungeon-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-dungeon-100">
                            <ArrowDown className="h-5 w-5 text-blue-400" />
                            Levantar y Arrastrar
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-dungeon-200 text-sm">
                        <div className="grid grid-cols-[140px_1fr] gap-3 items-center">
                            <div className="bg-dungeon-950/40 p-2 rounded text-dungeon-100 font-bold text-xs text-left">
                                Sobre la cabeza
                            </div>
                            <p className="text-xs text-dungeon-300">
                                Igual a tu <strong>Carga Máxima</strong>.
                            </p>

                            <div className="bg-dungeon-950/40 p-2 rounded text-dungeon-100 font-bold text-xs text-left">
                                Del suelo
                            </div>
                            <p className="text-xs text-dungeon-300">
                                Doble de tu Carga Maxima. Pero pierdes tu bono de Destreza a la CA y solo te mueves {formatDistance(5, unitSystem)} por asalto.
                            </p>

                            <div className="bg-dungeon-950/40 p-2 rounded text-dungeon-100 font-bold text-xs text-left">
                                Empujar/Arrastrar
                            </div>
                            <p className="text-xs text-dungeon-300">
                                Hasta <strong>5 veces</strong> tu Carga Máxima.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-dungeon-700 bg-dungeon-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-dungeon-100">
                        <Shield className="h-5 w-5 text-stone-400" />
                        Tabla de Referencia Rápida (Fuerza 8-18)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                            <thead className="text-dungeon-200 border-b border-dungeon-800 bg-dungeon-950/20">
                                <tr>
                                    <th className="p-2">Fuerza</th>
                                    <th className="p-2 text-green-400">Ligera (Hasta...)</th>
                                    <th className="p-2 text-yellow-400">Media (Hasta...)</th>
                                    <th className="p-2 text-red-400">Pesada (Hasta...)</th>
                                </tr>
                            </thead>
                            <tbody className="text-dungeon-300 divide-y divide-dungeon-800/30">
                                {[8, 10, 12, 14, 16, 18].map(str => (
                                    <tr key={str}>
                                        <td className="p-2 font-bold">{str}</td>
                                        <td>{formatWeight(CARRYING_CAPACITY_TABLE[str].light, unitSystem)}</td>
                                        <td>{formatWeight(CARRYING_CAPACITY_TABLE[str].medium, unitSystem)}</td>
                                        <td>{formatWeight(CARRYING_CAPACITY_TABLE[str].heavy, unitSystem)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-[10px] text-dungeon-400 mt-2 text-center">
                        {unitSystem === 'imperial' ? '1 lb = 0.45 kg aproximadamente' : '1 kg = 2.2 lb aproximadamente'}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
