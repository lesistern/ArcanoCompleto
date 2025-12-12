import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skull, Heart, Activity, AlertOctagon } from 'lucide-react';

export function Injury() {
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-yellow-700/50 bg-yellow-900/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-yellow-200 text-lg">
                            <Activity className="h-5 w-5" />
                            Incapacitado (0 PG)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-200">
                        <p>Puedes realizar una acción de movimiento o estándar, pero no ambas.</p>
                        <p className="mt-2 text-yellow-300">Si realizas una acción extenuante, recibes 1 punto de daño y pasas a estar moribundo (-1 PG).</p>
                    </CardContent>
                </Card>

                <Card className="border-red-700/50 bg-red-900/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-red-200 text-lg">
                            <Heart className="h-5 w-5 animate-pulse" />
                            Moribundo (-1 a -9 PG)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-200">
                        <p>Estás inconsciente y no puedes actuar.</p>
                        <p className="mt-2 text-red-300">Pierdes 1 PG por asalto hasta que te estabilizas o mueres.</p>
                    </CardContent>
                </Card>

                <Card className="border-stone-700/50 bg-stone-900/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-stone-400 text-lg">
                            <Skull className="h-5 w-5" />
                            Muerto (-10 PG)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-200">
                        <p>Tu personaje ha muerto.</p>
                        <p className="mt-2 text-stone-500">Solo la magia poderosa puede traerte de vuelta.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="text-gray-100">Estabilización y Recuperación</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-200 text-sm">
                        <div>
                            <h4 className="font-bold text-gray-100">Estabilizarse</h4>
                            <p>Un personaje moribundo debe hacer una tirada porcentual (d%) cada asalto:</p>
                            <ul className="list-disc list-inside mt-1 text-gray-300">
                                <li><strong>10% de éxito:</strong> Se estabiliza (deja de perder PG).</li>
                                <li><strong>Fallo:</strong> Pierde 1 PG.</li>
                                <li><strong>Ayuda:</strong> Prueba de Sanar CD 15 o cualquier curación mágica estabiliza automáticamente.</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-100">Curación Natural</h4>
                            <p>Con 8 horas de descanso: Recuperas <strong>1 PG por nivel</strong>.</p>
                            <p>Descanso completo (24h): Recuperas <strong>2 PG por nivel</strong>.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="text-gray-100">Reglas Especiales</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-200 text-sm">
                        <div>
                            <h4 className="font-bold text-gray-100 flex items-center gap-2">
                                <AlertOctagon className="h-4 w-4 text-red-500" />
                                Daño Masivo
                            </h4>
                            <p>Si recibes <strong>50 puntos de daño o más</strong> de un solo golpe y no mueres:</p>
                            <p className="mt-1">Debes superar una salvación de <strong>Fortaleza CD 15</strong> o morir instantáneamente.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-100">Daño No Letal</h4>
                            <p>Se acumula por separado. No se resta de tus PG actuales.</p>
                            <ul className="list-disc list-inside mt-1 text-gray-300">
                                <li><strong>No Letal == PG Actuales:</strong> Estás <em>aturdido</em> (Staggered).</li>
                                <li><strong>No Letal &gt; PG Actuales:</strong> Caes inconsciente.</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
