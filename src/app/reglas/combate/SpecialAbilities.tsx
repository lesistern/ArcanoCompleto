import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Flame, Sparkles, Ghost, AlertCircle, ShieldAlert, Eye, Zap, Activity } from 'lucide-react';

export function SpecialAbilities() {
    const conditions = [
        { name: "Cegado", desc: "-2 CA, lento, falla todo lo visual.", icon: Eye, color: "text-stone-400" },
        { name: "Confuso", desc: "Actúas al azar (atacas, huyes, nada).", icon: Sparkles, color: "text-purple-400" },
        { name: "Asustado", desc: "Huyes del miedo. -2 a todo.", icon: Ghost, color: "text-indigo-400" },
        { name: "Aturdido", desc: "Sueltas todo, no haces nada. -2 CA.", icon: Zap, color: "text-yellow-400" },
        { name: "Derribado", desc: "En el suelo. +4 CA vs distancia, -4 ataque.", icon: Activity, color: "text-orange-400" },
        { name: "Entorpecido", desc: "Lento, -2 ataque, -4 Destreza.", icon: Activity, color: "text-green-400" },
        { name: "Fatigado", desc: "No corres. -2 Fuerza/Destreza.", icon: Activity, color: "text-stone-500" },
        { name: "Invisible", desc: "+2 ataque, nadie te ve (50% fallo).", icon: Ghost, color: "text-blue-300" },
        { name: "Paralizado", desc: "Congelado. Indefenso. Golpe de gracia.", icon: AlertCircle, color: "text-red-400" },
    ];

    return (
        <div className="space-y-6">
            <Card className="border-dungeon-700 bg-dungeon-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-dungeon-100">
                        <Sparkles className="h-5 w-5 text-purple-400" />
                        Tipos de Habilidades (La Magia Innata)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-dungeon-200">
                        <div className="bg-dungeon-950/30 p-3 rounded border border-dungeon-800/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-1 opacity-10"><Activity className="h-12 w-12" /></div>
                            <h4 className="font-bold text-dungeon-100 mb-1">Extraordinarias (Ex)</h4>
                            <p className="text-xs text-dungeon-300">Habilidades físicas extremas. <strong>No son mágicas</strong>. Funcionan donde sea.</p>
                        </div>
                        <div className="bg-dungeon-950/30 p-3 rounded border border-dungeon-800/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-1 opacity-10"><Sparkles className="h-12 w-12" /></div>
                            <h4 className="font-bold text-purple-200 mb-1">Semejantes a Conjuros (Sp)</h4>
                            <p className="text-xs text-dungeon-300">Como lanzar un hechizo pero sin componentes. <strong>Provocan AdO</strong> y se pueden disipar.</p>
                        </div>
                        <div className="bg-dungeon-950/30 p-3 rounded border border-dungeon-800/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-1 opacity-10"><Flame className="h-12 w-12" /></div>
                            <h4 className="font-bold text-orange-200 mb-1">Sobrenaturales (Su)</h4>
                            <p className="text-xs text-dungeon-300">Mágicas pero innatas (ej. aliento de dragón). <strong>No provocan AdO</strong> y no se disipan.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-dungeon-700 bg-dungeon-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-dungeon-100">
                            <ShieldAlert className="h-5 w-5 text-blue-400" />
                            Defensas Especiales
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-dungeon-200 text-sm">
                        <div className="flex items-start gap-3 bg-blue-950/10 p-2 rounded border border-blue-900/20">
                            <div className="bg-blue-900/30 p-1.5 rounded text-blue-400 font-bold text-xs shrink-0">RD</div>
                            <div>
                                <h4 className="font-bold text-blue-200 text-xs">Reducción de Daño</h4>
                                <p className="text-[10px] text-dungeon-300">
                                    La piel es tan dura que las armas rebotan. Ignora X daño de cada golpe, salvo que sea de un material especial (Plata, Adamantina, Mágico).
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 bg-purple-950/10 p-2 rounded border border-purple-900/20">
                            <div className="bg-purple-900/30 p-1.5 rounded text-purple-400 font-bold text-xs shrink-0">RC</div>
                            <div>
                                <h4 className="font-bold text-purple-200 text-xs">Resistencia a Conjuros</h4>
                                <p className="text-[10px] text-dungeon-300">
                                    Armadura contra la magia. El mago debe superar tu RC con su nivel para afectarte.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 bg-stone-950/10 p-2 rounded border border-stone-900/20">
                            <div className="bg-stone-900/30 p-1.5 rounded text-stone-400 font-bold text-xs shrink-0">INC</div>
                            <div>
                                <h4 className="font-bold text-stone-200 text-xs">Incorpóreo</h4>
                                <p className="text-[10px] text-dungeon-300">
                                    Fantasmas. Solo les afecta la magia (y solo el 50% de las veces). Atraviesan muros.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-dungeon-700 bg-dungeon-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-dungeon-100">
                            <Ghost className="h-5 w-5 text-stone-400" />
                            Sentidos Especiales
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-dungeon-200 text-sm">
                        <div className="grid grid-cols-1 gap-2">
                            <div className="flex justify-between items-center border-b border-dungeon-800 pb-1">
                                <span className="font-bold text-dungeon-100">Vista Ciega</span>
                                <span className="text-[10px] text-green-400 bg-green-950/30 px-2 rounded">Radar perfecto</span>
                            </div>
                            <p className="text-xs text-dungeon-300 mb-2">Ves sin ojos. La invisibilidad y la oscuridad no te afectan.</p>

                            <div className="flex justify-between items-center border-b border-dungeon-800 pb-1">
                                <span className="font-bold text-dungeon-100">Sentido Ciego</span>
                                <span className="text-[10px] text-yellow-400 bg-yellow-950/30 px-2 rounded">Radar borroso</span>
                            </div>
                            <p className="text-xs text-dungeon-300 mb-2">Sabes dónde están, pero no los ves bien (tienen ocultación).</p>

                            <div className="flex justify-between items-center border-b border-dungeon-800 pb-1">
                                <span className="font-bold text-dungeon-100">Olfato</span>
                                <span className="text-[10px] text-orange-400 bg-orange-950/30 px-2 rounded">Rastreo</span>
                            </div>
                            <p className="text-xs text-dungeon-300">Detectas enemigos cercanos por el olor y puedes seguirlos.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-dungeon-700 bg-dungeon-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-dungeon-100">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        Estados Comunes (Resumen)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {conditions.map((c, i) => {
                            const Icon = c.icon;
                            return (
                                <div key={i} className="bg-dungeon-950/20 p-2 rounded border border-dungeon-800/30 hover:bg-dungeon-900/40 transition-colors flex flex-col gap-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Icon className={`h-3 w-3 ${c.color}`} />
                                        <h5 className="font-bold text-dungeon-100 text-xs">{c.name}</h5>
                                    </div>
                                    <p className="text-[10px] text-dungeon-400 leading-tight">{c.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
