import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Mic, Hand, Package, Clock, Ruler, Target, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SpellAnatomyProps {
    onNextTab?: () => void;
}

export function SpellAnatomy({ onNextTab }: SpellAnatomyProps) {
    const scrollToId = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="space-y-6">
            {/* Componentes */}
            <Card id="components" className="border-dungeon-700 bg-dungeon-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-dungeon-100">
                        <Package className="h-5 w-5 text-amber-400" />
                        Componentes (¿Qué necesitas?)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-dungeon-200 text-sm">
                    <p>
                        La mayoría de los conjuros requieren que hagas o tengas algo específico.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                            <Mic className="h-4 w-4 text-dungeon-400 mt-1" />
                            <div>
                                <strong className="text-amber-200">Verbal (V)</strong>
                                <p className="text-xs text-dungeon-300">Requiere recitar palabras de poder con voz fuerte y clara.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Hand className="h-4 w-4 text-dungeon-400 mt-1" />
                            <div>
                                <strong className="text-amber-200">Somático (S)</strong>
                                <p className="text-xs text-dungeon-300">Requiere realizar gestos precisos con al menos una mano libre.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Package className="h-4 w-4 text-dungeon-400 mt-1" />
                            <div>
                                <strong className="text-amber-200">Material (M)</strong>
                                <p className="text-xs text-dungeon-300">Requiere ingredientes físicos específicos que se consumen al lanzar.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-dungeon-400 mt-1" />
                            <div>
                                <strong className="text-amber-200">Foco (F/FD)</strong>
                                <p className="text-xs text-dungeon-300">Un objeto especial (como un símbolo sagrado) que debes tener en mano.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button variant="ghost" size="sm" onClick={() => scrollToId('time-range')} className="text-amber-300 hover:text-amber-200">
                            Siguiente: Tiempos y Distancias <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Tiempo y Alcance */}
            <Card id="time-range" className="border-dungeon-700 bg-dungeon-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-dungeon-100">
                        <Clock className="h-5 w-5 text-cyan-400" />
                        Tiempos y Distancias
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-dungeon-200 text-sm">
                    <div className="space-y-2">
                        <div className="flex justify-between border-b border-dungeon-800 pb-1">
                            <span className="text-dungeon-300">Acción Estándar</span>
                            <span className="text-cyan-200">Permite lanzar el conjuro y realizar un movimiento en el mismo turno.</span>
                        </div>
                        <div className="flex justify-between border-b border-dungeon-800 pb-1">
                            <span className="text-dungeon-300">Asalto Completo</span>
                            <span className="text-cyan-200">Consume todo el turno. El conjuro se completa al inicio del siguiente.</span>
                        </div>
                        <div className="flex justify-between border-b border-dungeon-800 pb-1">
                            <span className="text-dungeon-300">Cercano</span>
                            <span className="text-cyan-200">~7.5m (25 pies + 5 pies/2 niveles).</span>
                        </div>
                        <div className="flex justify-between border-b border-dungeon-800 pb-1">
                            <span className="text-dungeon-300">Medio</span>
                            <span className="text-cyan-200">~30m (100 pies + 10 pies/nivel).</span>
                        </div>
                        <div className="flex justify-between border-b border-dungeon-800 pb-1">
                            <span className="text-dungeon-300">Largo</span>
                            <span className="text-cyan-200">~120m (400 pies + 40 pies/nivel).</span>
                        </div>
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button variant="ghost" size="sm" onClick={() => scrollToId('area-target')} className="text-cyan-300 hover:text-cyan-200">
                            Siguiente: Área y Objetivo <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Área y Objetivo */}
            <Card id="area-target" className="border-dungeon-700 bg-dungeon-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-dungeon-100">
                        <Ruler className="h-5 w-5 text-red-400" />
                        Área y Objetivo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-dungeon-200 text-sm">
                    <ul className="list-disc list-inside space-y-1 text-xs text-dungeon-300">
                        <li><strong>Objetivo:</strong> Eliges una criatura u objeto específico que puedas ver.</li>
                        <li><strong>Rayo:</strong> Requiere un ataque de toque a distancia. No necesitas ver al objetivo, solo línea de visión.</li>
                        <li><strong>Explosión (Burst):</strong> Afecta todo en un radio desde un punto central. No dobla esquinas.</li>
                        <li><strong>Cono:</strong> Un área que se proyecta desde tus manos hacia afuera.</li>
                        <li><strong>Línea:</strong> Un rayo recto que atraviesa a todas las criaturas en su trayectoria.</li>
                    </ul>
                    <div className="flex justify-end pt-2">
                        <Button variant="ghost" size="sm" onClick={() => scrollToId('saving-throws')} className="text-red-300 hover:text-red-200">
                            Siguiente: Salvaciones <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Duración y Salvación */}
            <Card id="saving-throws" className="border-dungeon-700 bg-dungeon-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-dungeon-100">
                        <ShieldCheck className="h-5 w-5 text-green-400" />
                        Salvaciones y Resistencia
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-dungeon-200 text-sm">
                    <div className="bg-dungeon-950/30 p-2 rounded mb-2">
                        <p className="text-xs text-center font-mono text-green-400">
                            CD = 10 + Nivel Conjuro + Mod. Característica
                        </p>
                        <p className="text-[10px] text-center text-dungeon-400 mt-1">
                            (Dificultad que el objetivo debe superar para resistir el efecto)
                        </p>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-dungeon-300">
                        <li><strong>Niega:</strong> Si supera la salvación, el conjuro no tiene efecto.</li>
                        <li><strong>Mitad:</strong> Si supera la salvación, recibe la mitad del daño.</li>
                        <li><strong>Parcial:</strong> Si supera la salvación, sufre un efecto reducido.</li>
                        <li><strong>Resistencia a Conjuros (RC):</strong> Defensa mágica natural de algunas criaturas. Debes superarla con una prueba de Nivel de Lanzador.</li>
                    </ul>
                    {onNextTab && (
                        <div className="flex justify-end pt-4 border-t border-dungeon-800 mt-4">
                            <Button onClick={onNextTab} className="bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-100">
                                Siguiente Sección: Arcana vs Divina <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
