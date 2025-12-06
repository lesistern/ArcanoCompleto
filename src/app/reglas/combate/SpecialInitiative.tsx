import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Clock, Target, ArrowDownCircle, HelpCircle } from 'lucide-react';

export function SpecialInitiative() {
    return (
        <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-6">
                <p className="text-dungeon-200 text-sm">
                    ¿No es el momento adecuado para actuar? No te preocupes.
                    <br />
                    Puedes manipular tu turno para actuar exactamente cuando lo necesites.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Retrasar */}
                <Card className="border-amber-500/30 bg-dungeon-900/50 shadow-lg shadow-amber-900/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-100">
                            <ArrowDownCircle className="h-5 w-5 text-amber-400" />
                            Retrasar (Delay)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-dungeon-200 text-sm">
                        <div className="bg-amber-950/20 p-3 rounded border border-amber-900/30">
                            <p className="font-bold text-amber-200 text-xs uppercase mb-1">¿Qué es?</p>
                            <p className="text-xs text-dungeon-300">
                                Simplemente <strong>esperas</strong>. Dejas pasar tu turno actual para actuar más tarde en el mismo asalto.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-dungeon-100 text-xs mb-2 flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                Cómo funciona
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-xs text-dungeon-300">
                                <li>Eliges tu nuevo lugar en la Iniciativa.</li>
                                <li>Puedes volver a entrar en el combate <strong>después</strong> del turno de cualquier otra persona.</li>
                                <li>Tu Iniciativa cambia permanentemente a ese nuevo número.</li>
                            </ul>
                        </div>

                        <div className="flex items-start gap-2 text-[10px] text-dungeon-400 italic bg-dungeon-950/30 p-2 rounded">
                            <HelpCircle className="h-3 w-3 shrink-0" />
                            Úsalo cuando quieras ver qué hacen los enemigos antes de comprometerte, o para dejar que el Clérigo te cure primero.
                        </div>
                    </CardContent>
                </Card>

                {/* Preparar */}
                <Card className="border-red-500/30 bg-dungeon-900/50 shadow-lg shadow-red-900/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-100">
                            <Target className="h-5 w-5 text-red-400" />
                            Preparar (Ready)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-dungeon-200 text-sm">
                        <div className="bg-red-950/20 p-3 rounded border border-red-900/30">
                            <p className="font-bold text-red-200 text-xs uppercase mb-1">¿Qué es?</p>
                            <p className="text-xs text-dungeon-300">
                                Preparas una <strong>trampa</strong> o reacción específica. "Si pasa X, hago Y".
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-dungeon-100 text-xs mb-2 flex items-center gap-2">
                                <Target className="h-3 w-3" />
                                Cómo funciona
                            </h4>
                            <ol className="list-decimal list-inside space-y-1 text-xs text-dungeon-300">
                                <li>Declaras la <strong>Acción</strong> (ej. disparar arco) y el <strong>Desencadenante</strong> (ej. si el orco abre la puerta).</li>
                                <li>Si ocurre el evento, actúas <strong>inmediatamente antes</strong> de que termine.</li>
                                <li>Puedes interrumpir conjuros enemigos.</li>
                            </ol>
                        </div>

                        <div className="flex items-start gap-2 text-[10px] text-dungeon-400 italic bg-dungeon-950/30 p-2 rounded">
                            <HelpCircle className="h-3 w-3 shrink-0" />
                            Úsalo para interrumpir magos ("Le disparo si empieza a conjurar") o para atacar a alguien que entra y sale de cobertura.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
