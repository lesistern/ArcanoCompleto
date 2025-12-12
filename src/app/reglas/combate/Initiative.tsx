import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Clock, AlertTriangle, Eye, Zap } from 'lucide-react';

export function Initiative() {
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                            <Clock className="h-5 w-5 text-amber-400" />
                            Iniciativa
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-200 text-sm">
                        <p>
                            Al comienzo de una batalla, cada combatiente hace una prueba de iniciativa (1d20 + mod. Destreza). Los personajes actúan en orden, de mayor a menor resultado.
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            <li><strong>Empates:</strong> Actúa primero quien tenga mayor modificador de Destreza. Si persiste el empate, tiran de nuevo.</li>
                            <li><strong>Desprevenido (Flat-footed):</strong> Al inicio del combate, antes de tu primer turno, estás desprevenido. No puedes usar tu bono de Des a la CA y no puedes hacer ataques de oportunidad.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                            <Eye className="h-5 w-5 text-purple-400" />
                            Sorpresa
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-200 text-sm">
                        <p>
                            Si algunos combatientes no son conscientes de sus enemigos al inicio, ocurre un <strong>asalto de sorpresa</strong> antes del primer asalto regular.
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            <li><strong>Conscientes:</strong> Tiran iniciativa y pueden tomar una acción estándar o de movimiento durante el asalto de sorpresa.</li>
                            <li><strong>Inconscientes:</strong> No actúan en el asalto de sorpresa y están desprevenidos.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-gray-700 bg-gray-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-100">
                        <Zap className="h-5 w-5 text-yellow-400" />
                        Ataques de Oportunidad (AdO)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-200">
                    <p>
                        A veces un combatiente baja la guardia. En este caso, los enemigos cercanos pueden aprovechar para atacarlo "gratis".
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <h4 className="font-bold text-gray-100 mb-2 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                Amenazar Casillas
                            </h4>
                            <p className="text-sm mb-2">
                                Amenazas todas las casillas a las que puedes hacer un ataque cuerpo a cuerpo.
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                <li>Normalmente, casillas adyacentes (5 pies).</li>
                                <li><strong>Armas de Alcance:</strong> Amenazan a 10 pies, pero no adyacentes.</li>
                                <li>Si estás desarmado, normalmente no amenazas (salvo monjes, etc.).</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-100 mb-2">Provocar un AdO</h4>
                            <p className="text-sm mb-2">
                                Dos tipos de acciones provocan AdO:
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                <li><strong>Moverse:</strong> Salir de una casilla amenazada. (El paso de 5 pies y la acción de Retirada evitan esto).</li>
                                <li><strong>Acción Distractora:</strong> Lanzar un conjuro, atacar a distancia, beber una poción, etc. en una casilla amenazada.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gray-950/50 p-4 rounded border border-gray-800 mt-4">
                        <h4 className="font-bold text-gray-100 mb-2">Reglas Clave</h4>
                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                            <li>Solo puedes hacer <strong>un AdO por asalto</strong> (salvo con la dote Reflejos de Combate).</li>
                            <li>El AdO se realiza con tu <strong>bonificador de ataque base completo</strong>.</li>
                            <li>El AdO <strong>interrumpe</strong> la acción que lo provocó.</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-100">
                        <Zap className="h-5 w-5 text-yellow-400" />
                        Visualización de Amenaza
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-8 justify-items-center">
                        {/* Normal Reach (3x3 Grid) */}
                        <div className="space-y-4 text-center">
                            <h4 className="text-gray-100 font-bold text-sm">Alcance Normal (5 pies)</h4>
                            <table className="border-collapse w-fit mx-auto">
                                <tbody>
                                    {Array.from({ length: 3 }).map((_, y) => (
                                        <tr key={y}>
                                            {Array.from({ length: 3 }).map((_, x) => {
                                                const isCenter = x === 1 && y === 1;
                                                const isAdjacent = !isCenter;
                                                return (
                                                    <td
                                                        key={x}
                                                        className={`
                                                            w-10 h-10 md:w-12 md:h-12 text-center align-middle text-[10px] md:text-xs font-medium border border-gray-700 p-0
                                                            ${isCenter ? 'bg-blue-600 text-white' : ''}
                                                            ${isAdjacent ? 'bg-red-500/20 text-red-200' : 'bg-gray-900/40 text-gray-500'}
                                                        `}
                                                        title={isCenter ? "Tú" : "Amenazado"}
                                                    >
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            {isCenter && "Tú"}
                                                            {isAdjacent && "AdO"}
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="text-xs text-gray-300 max-w-[200px] mx-auto">
                                Amenazas las 8 casillas adyacentes a ti.
                            </p>
                        </div>

                        {/* Reach Weapon (5x5 Grid) */}
                        <div className="space-y-4 text-center">
                            <h4 className="text-gray-100 font-bold text-sm">Arma de Alcance (10 pies)</h4>
                            <table className="border-collapse w-fit mx-auto">
                                <tbody>
                                    {Array.from({ length: 5 }).map((_, y) => (
                                        <tr key={y}>
                                            {Array.from({ length: 5 }).map((_, x) => {
                                                const isCenter = x === 2 && y === 2;
                                                const isAdjacent = Math.abs(x - 2) <= 1 && Math.abs(y - 2) <= 1 && !isCenter;
                                                const isReach = (Math.abs(x - 2) === 2 || Math.abs(y - 2) === 2) && (Math.abs(x - 2) <= 2 && Math.abs(y - 2) <= 2);

                                                return (
                                                    <td
                                                        key={x}
                                                        className={`
                                                            w-10 h-10 md:w-12 md:h-12 text-center align-middle text-[10px] md:text-xs font-medium border border-gray-700 p-0
                                                            ${isCenter ? 'bg-blue-600 text-white' : ''}
                                                            ${isReach ? 'bg-red-500/20 text-red-200' : ''}
                                                            ${isAdjacent ? 'bg-emerald-500/10 text-emerald-400/50' : ''}
                                                            ${!isCenter && !isReach && !isAdjacent ? 'bg-gray-900/40 text-gray-600' : ''}
                                                        `}
                                                        title={isCenter ? "Tú" : isReach ? "Amenazado" : isAdjacent ? "Seguro (Demasiado cerca)" : "Fuera de alcance"}
                                                    >
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            {isCenter && "Tú"}
                                                            {isReach && "AdO"}
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="text-xs text-gray-300 max-w-[200px] mx-auto">
                                Amenazas a 10 pies, pero NO a 5 pies (salvo cadena armada).
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
