import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Shield, EyeOff, Users, Swords, HelpCircle, Dices } from 'lucide-react';

export function Modifiers() {
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Cobertura - Blue */}
                <Card className="border-blue-500/30 bg-gray-900/50 shadow-lg shadow-blue-900/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-100">
                            <Shield className="h-5 w-5 text-blue-400" />
                            Cobertura (Cover)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-200 space-y-3">
                        <p>
                            Ocurre cuando hay un obstáculo físico (muro, árbol, otra criatura) entre tú y el atacante. El obstáculo bloquea parte del ataque.
                        </p>
                        <div className="bg-blue-950/20 border border-blue-900/30 p-3 rounded">
                            <h4 className="font-bold text-blue-200 mb-1 text-xs uppercase">Beneficios</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-300">
                                <li><strong>+4 a la CA:</strong> Es mucho más difícil golpearte.</li>
                                <li><strong>+2 a Salvaciones de Reflejos:</strong> El obstáculo te protege de explosiones (como bolas de fuego).</li>
                                <li><strong>Sin AdO:</strong> No puedes recibir Ataques de Oportunidad de alguien si tienes cobertura contra él.</li>
                            </ul>
                        </div>
                        <p className="text-xs text-gray-400 italic">
                            Nota: Si tienes "Cobertura Total" (totalmente tapado), no puedes ser atacado directamente.
                        </p>
                    </CardContent>
                </Card>

                {/* Ocultación - Purple */}
                <Card className="border-purple-500/30 bg-gray-900/50 shadow-lg shadow-purple-900/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-100">
                            <EyeOff className="h-5 w-5 text-purple-400" />
                            Ocultación (Concealment)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-200 space-y-3">
                        <p>
                            Ocurre cuando no se te ve bien (oscuridad, niebla, invisibilidad). No hay nada físico parando el golpe, pero es difícil apuntar.
                        </p>

                        <div className="bg-purple-950/20 border border-purple-900/30 p-3 rounded">
                            <h4 className="font-bold text-purple-200 mb-2 flex items-center gap-2">
                                <Dices className="h-4 w-4" />
                                Probabilidad de Fallo (Miss Chance)
                            </h4>
                            <p className="mb-2">
                                Incluso si el ataque supera tu CA, el atacante debe tirar <strong>1d100</strong> (o d%) para ver si realmente conecta.
                            </p>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="bg-gray-800 px-1.5 rounded text-gray-100 font-bold text-xs mt-0.5">20%</span>
                                    <span>
                                        <strong>Ocultación Parcial:</strong> (Niebla suave, penumbra). <br />
                                        Si saca <strong>01-20</strong> en el d100, el ataque falla.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="bg-gray-800 px-1.5 rounded text-gray-100 font-bold text-xs mt-0.5">50%</span>
                                    <span>
                                        <strong>Ocultación Total:</strong> (Invisibilidad, oscuridad total). <br />
                                        Si saca <strong>01-50</strong> en el d100, el ataque falla.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Flanqueo - Green */}
                <Card className="border-green-500/30 bg-gray-900/50 shadow-lg shadow-green-900/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-100">
                            <Users className="h-5 w-5 text-green-400" />
                            Flanqueo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-200">
                        <p className="mb-3">
                            Es la táctica de rodear al enemigo. Ocurre cuando tú y un aliado están en lados exactamente opuestos de un enemigo.
                        </p>
                        <div className="bg-green-950/20 border border-green-900/30 p-3 rounded flex items-center gap-3">
                            <div className="text-2xl font-bold text-green-400">+2</div>
                            <div>
                                <p className="font-bold text-green-100">Bonificador al Ataque</p>
                                <p className="text-xs text-gray-300">Tú y tu aliado reciben este bono mientras mantengan la posición.</p>
                            </div>
                        </div>
                        <p className="mt-3 text-gray-400 text-xs flex items-center gap-1">
                            <HelpCircle className="h-3 w-3" />
                            Esencial para que el Pícaro pueda hacer sus Ataques Furtivos.
                        </p>
                    </CardContent>
                </Card>

                {/* Dos Armas - Red */}
                <Card className="border-red-500/30 bg-gray-900/50 shadow-lg shadow-red-900/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-100">
                            <Swords className="h-5 w-5 text-red-400" />
                            Combate con Dos Armas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-200">
                        <p className="mb-2">
                            Si llevas un arma en cada mano, puedes obtener <strong>1 ataque extra</strong> por asalto con la segunda arma (mano torpe), pero sufres penalizadores al ataque.
                        </p>
                        <table className="w-full text-xs text-left mt-2 border-collapse">
                            <thead className="text-red-200 border-b border-red-900/30 bg-red-950/20">
                                <tr>
                                    <th className="p-2">Circunstancia</th>
                                    <th className="p-2 text-center">Mano Principal</th>
                                    <th className="p-2 text-center">Mano Torpe</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300 divide-y divide-gray-800/50">
                                <tr><td className="p-2">Normal</td><td className="p-2 text-center text-red-400">-6</td><td className="p-2 text-center text-red-400">-10</td></tr>
                                <tr><td className="p-2">Arma ligera en 2ª mano</td><td className="p-2 text-center text-orange-400">-4</td><td className="p-2 text-center text-orange-400">-8</td></tr>
                                <tr><td className="p-2">Dote: Combate con 2 armas</td><td className="p-2 text-center text-yellow-400">-4</td><td className="p-2 text-center text-yellow-400">-4</td></tr>
                                <tr><td className="p-2 font-bold text-gray-100">Dote + Arma ligera</td><td className="p-2 text-center text-green-400 font-bold">-2</td><td className="p-2 text-center text-green-400 font-bold">-2</td></tr>
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
