import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Zap, Hand, ShieldAlert, Skull, Sword, ArrowRight } from 'lucide-react';

export function SpecialAttacks() {
    const maneuvers = [
        {
            name: "Embestida (Bull Rush)",
            desc: "Empujar al enemigo hacia atrás.",
            mechanic: "Prueba de Fuerza vs Fuerza.",
            ado: true,
            icon: ArrowRight
        },
        {
            name: "Desarmar (Disarm)",
            desc: "Quitarle el arma de las manos.",
            mechanic: "Tirada de Ataque Opuesta.",
            ado: true,
            icon: Hand
        },
        {
            name: "Presa (Grapple)",
            desc: "Agarrar y luchar cuerpo a cuerpo.",
            mechanic: "Toque -> Prueba de Presa.",
            ado: true,
            icon: Hand
        },
        {
            name: "Romper (Sunder)",
            desc: "Destruir su arma o escudo.",
            mechanic: "Ataque vs Arma.",
            ado: true,
            icon: Sword
        },
        {
            name: "Derribar (Trip)",
            desc: "Tirarlo al suelo (Prone).",
            mechanic: "Toque -> Fuerza vs Des/Fue.",
            ado: true,
            icon: ArrowRight
        },
    ];

    return (
        <div className="space-y-6">
            <Card className="border-gray-700 bg-gray-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-100">
                        <Hand className="h-5 w-5 text-orange-400" />
                        Maniobras de Combate
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-200 mb-4">
                        No siempre tienes que golpear para hacer daño. Puedes empujar, tirar o desarmar.
                        <br />
                        <span className="text-red-300 text-xs italic">
                            ¡Cuidado! La mayoría de estas maniobras provocan un Ataque de Oportunidad si no tienes la dote "Mejorado".
                        </span>
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {maneuvers.map((m, i) => {
                            const Icon = m.icon;
                            return (
                                <div key={i} className="bg-gray-950/30 p-3 rounded border border-gray-800/50 hover:bg-gray-900/40 transition-colors group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-gray-100 text-sm group-hover:text-orange-300 transition-colors">{m.name}</h4>
                                        <Icon className="h-4 w-4 text-gray-500 group-hover:text-orange-400" />
                                    </div>
                                    <p className="text-xs text-gray-300 mb-2">{m.desc}</p>
                                    <div className="bg-gray-900/50 p-1.5 rounded text-[10px] text-gray-400 font-mono border border-gray-800/30">
                                        {m.mechanic}
                                    </div>
                                    {m.ado && (
                                        <div className="mt-2 flex items-center gap-1 text-[10px] text-red-400">
                                            <ShieldAlert className="h-3 w-3" />
                                            <span>Provoca AdO</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                            <Zap className="h-5 w-5 text-yellow-400" />
                            Acciones Tácticas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-200 text-sm">
                        <div className="bg-gray-950/30 p-3 rounded border border-gray-800/50">
                            <h4 className="font-bold text-yellow-200 mb-1 flex justify-between">
                                Cargar (Charge)
                                <span className="text-[10px] bg-yellow-900/30 px-1.5 py-0.5 rounded text-yellow-500 border border-yellow-900/50">Asalto Completo</span>
                            </h4>
                            <p className="text-xs text-gray-300 mb-2">Corres en línea recta hacia el enemigo y golpeas con fuerza.</p>
                            <div className="flex gap-2 text-xs">
                                <span className="text-green-400 font-bold">+2 Ataque</span>
                                <span className="text-gray-600">|</span>
                                <span className="text-red-400 font-bold">-2 CA</span>
                            </div>
                        </div>

                        <div className="bg-gray-950/30 p-3 rounded border border-gray-800/50">
                            <h4 className="font-bold text-blue-200 mb-1 flex justify-between">
                                Ayudar (Aid Another)
                                <span className="text-[10px] bg-blue-900/30 px-1.5 py-0.5 rounded text-blue-400 border border-blue-900/50">Estándar</span>
                            </h4>
                            <p className="text-xs text-gray-300 mb-2">Distraes al enemigo para ayudar a un amigo.</p>
                            <div className="text-xs text-gray-300">
                                Si aciertas CA 10, das <strong className="text-green-400">+2 Ataque</strong> o <strong className="text-blue-400">+2 CA</strong> a tu aliado.
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-gray-700 bg-gray-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                            <Skull className="h-5 w-5 text-stone-400" />
                            Expulsar Muertos Vivientes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-200">
                        <p className="mb-3 text-xs text-gray-300">
                            Clérigos y Paladines pueden canalizar energía divina para aterrorizar o destruir zombies, esqueletos y fantasmas.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 bg-stone-950/30 p-2 rounded border border-stone-800/50">
                                <div className="bg-stone-800 text-stone-200 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">1</div>
                                <div>
                                    <h5 className="font-bold text-stone-200 text-xs">Prueba de Carisma</h5>
                                    <p className="text-[10px] text-stone-400">Determina el muerto viviente más poderoso que puedes afectar.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-stone-950/30 p-2 rounded border border-stone-800/50">
                                <div className="bg-stone-800 text-stone-200 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-xs">2</div>
                                <div>
                                    <h5 className="font-bold text-stone-200 text-xs">Daño de Expulsión</h5>
                                    <p className="text-[10px] text-stone-400">2d6 + Nivel + Carisma. Determina cuántos dados de golpe totales ahuyentas.</p>
                                </div>
                            </div>
                            <div className="bg-stone-900/50 p-2 rounded text-center border border-stone-800">
                                <p className="text-xs text-stone-300">
                                    Si tienes el doble de nivel que ellos... <strong className="text-yellow-400 uppercase">¡Destruidos!</strong>
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
