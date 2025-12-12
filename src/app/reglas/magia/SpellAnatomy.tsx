import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Mic, Hand, Package, Clock, Ruler, ShieldCheck, Book } from 'lucide-react';

export function SpellAnatomy() {
    return (
        <div className="space-y-6">
            <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg flex gap-4 items-start">
                <Book className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-purple-300 text-lg">La Ficha del Conjuro</h3>
                    <p className="text-gray-200 text-sm">
                        Cada conjuro tiene 4 datos clave. Si los entiendes, puedes leer cualquier hechizo del manual.
                    </p>
                </div>
            </div>

            {/* Componentes */}
            <Card id="components" className="border-gray-700 bg-gray-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-100">
                        <Package className="h-5 w-5 text-amber-400" />
                        1. ¿Qué necesito? (Componentes)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-200 text-sm">
                    <p>
                        Mira las letras al lado de "Componentes". Te dicen qué debes hacer físicamente.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-950/30 p-3 rounded border border-gray-800">
                            <div className="flex items-center gap-2 mb-1">
                                <Mic className="h-4 w-4 text-amber-400" />
                                <strong className="text-amber-200">V (Verbal)</strong>
                            </div>
                            <p className="text-xs text-gray-300">Tienes que hablar fuerte. <br /><span className="text-gray-500 italic">No funciona si estás amordazado o en silencio mágico.</span></p>
                        </div>
                        <div className="bg-gray-950/30 p-3 rounded border border-gray-800">
                            <div className="flex items-center gap-2 mb-1">
                                <Hand className="h-4 w-4 text-amber-400" />
                                <strong className="text-amber-200">S (Somático)</strong>
                            </div>
                            <p className="text-xs text-gray-300">Tienes que mover las manos. <br /><span className="text-gray-500 italic">No funciona si estás atado.</span></p>
                        </div>
                        <div className="bg-gray-950/30 p-3 rounded border border-gray-800">
                            <div className="flex items-center gap-2 mb-1">
                                <Package className="h-4 w-4 text-amber-400" />
                                <strong className="text-amber-200">M (Material)</strong>
                            </div>
                            <p className="text-xs text-gray-300">Necesitas un ingrediente (pata de araña, arena, etc). <br /><span className="text-gray-500 italic">Suele venir en tu bolsa de componentes.</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tiempo */}
            <Card id="time-range" className="border-gray-700 bg-gray-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-100">
                        <Clock className="h-5 w-5 text-cyan-400" />
                        2. ¿Cuánto tardo? (Tiempo de Lanzamiento)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-200 text-sm">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-100 font-bold">1 Acción Estándar</span>
                            <span className="text-cyan-200 text-right text-xs max-w-[60%]">Lo normal. Lanzas y todavía te puedes mover.</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-100 font-bold">1 Asalto Completo</span>
                            <span className="text-cyan-200 text-right text-xs max-w-[60%]">Muy lento. Empiezas ahora y termina justo antes de tu próximo turno.</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                            <span className="text-gray-100 font-bold">Acción Rápida</span>
                            <span className="text-cyan-200 text-right text-xs max-w-[60%]">¡Instantáneo! Lo lanzas y aún puedes atacar o lanzar otro conjuro normal.</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Distancia */}
            <Card id="area-target" className="border-gray-700 bg-gray-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-100">
                        <Ruler className="h-5 w-5 text-red-400" />
                        3. ¿Llego? (Alcance y Área)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-200 text-sm">
                    <p>
                        No puedes lanzar una Bola de Fuego si no llegas.
                    </p>
                    <ul className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                        <li className="bg-gray-950/30 p-2 rounded"><strong>Personal:</strong> Solo para ti.</li>
                        <li className="bg-gray-950/30 p-2 rounded"><strong>Toque:</strong> Tienes que tocar al objetivo (¡peligroso!).</li>
                        <li className="bg-gray-950/30 p-2 rounded"><strong>Cercano:</strong> ~7.5m (25 pies).</li>
                        <li className="bg-gray-950/30 p-2 rounded"><strong>Medio:</strong> ~30m (100 pies).</li>
                        <li className="bg-gray-950/30 p-2 rounded"><strong>Largo:</strong> ~120m (400 pies).</li>
                    </ul>
                    <div className="mt-4 border-t border-gray-800 pt-2">
                        <strong className="text-red-300 text-xs">Formas de Área:</strong>
                        <p className="text-xs text-gray-400 mt-1">
                            A veces no apuntas a uno, sino a una zona. <strong>Cono</strong> (Manos Ardientes), <strong>Explosión</strong> (Bola de Fuego), <strong>Línea</strong> (Rayo Relámpago).
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Duración */}
            <Card id="saving-throws" className="border-gray-700 bg-gray-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-100">
                        <ShieldCheck className="h-5 w-5 text-green-400" />
                        4. ¿Cuánto dura?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-200 text-sm">
                    <ul className="list-disc list-inside space-y-2 text-xs text-gray-300">
                        <li><strong>Instantáneo:</strong> Pasa y se acaba (como una explosión). El daño se queda, pero la magia se va.</li>
                        <li><strong>Rounds/Minutos/Horas:</strong> El efecto persiste un tiempo.</li>
                        <li>
                            <strong className="text-green-400">Concentración:</strong> ¡Ojo! El conjuro dura mientras te concentres. Si lanzas otro conjuro o te pegan fuerte, se puede acabar antes.
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
