import React from 'react';
import { BookOpen, Sun, ArrowRight, Sparkles, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ArcaneDivineProps {
    onNextTab?: () => void;
}

export function ArcaneDivine({ onNextTab }: ArcaneDivineProps) {
    const scrollToId = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Magia Arcana */}
            <Card id="arcane" className="border-purple-500/30 bg-gray-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-300">
                        <Sparkles className="h-5 w-5" />
                        Magia Arcana (Ciencia)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-200 text-sm">
                    <p>
                        Es como hackear la realidad. Usas fórmulas y gestos para forzar al universo a hacer lo que quieres.
                    </p>
                    <div className="space-y-3">
                        <div className="bg-purple-900/10 border border-purple-500/20 p-3 rounded">
                            <h4 className="font-bold text-purple-300 text-xs mb-1 flex items-center gap-2">
                                <BookOpen className="h-3 w-3" /> Magos (Los Nerds)
                            </h4>
                            <p className="text-[10px] text-gray-400 mb-2">
                                Estudian libros. Si pierden su libro, son inútiles. Son los más versátiles porque pueden aprenderlo todo.
                            </p>
                        </div>

                        <div className="bg-pink-900/10 border border-pink-500/20 p-3 rounded">
                            <h4 className="font-bold text-pink-300 text-xs mb-1 flex items-center gap-2">
                                <Flame className="h-3 w-3" /> Hechiceros (Los Artistas)
                            </h4>
                            <p className="text-[10px] text-gray-400 mb-2">
                                Nacieron con magia. No estudian, simplemente "lo sienten". Saben pocos trucos, pero los hacen muchas veces.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button variant="ghost" size="sm" onClick={() => scrollToId('divine')} className="text-purple-300 hover:text-purple-200">
                            Siguiente: Magia Divina <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Magia Divina */}
            <Card id="divine" className="border-gold-500/30 bg-gray-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gold-300">
                        <Sun className="h-5 w-5" />
                        Magia Divina (Fe)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-200 text-sm">
                    <p>
                        Es pedir un milagro. Tu poder viene de un Dios o de la Naturaleza misma.
                    </p>
                    <div className="space-y-3">
                        <div className="bg-gold-900/10 border border-gold-500/20 p-3 rounded">
                            <h4 className="font-bold text-gold-300 text-xs mb-1">Clérigos y Druidas</h4>
                            <p className="text-[10px] text-gray-400 mb-2">
                                No necesitan libros. Solo rezan por la mañana y su Dios les "carga" los conjuros del día.
                            </p>
                        </div>

                        <div className="bg-green-900/10 border border-green-500/20 p-3 rounded">
                            <h4 className="font-bold text-green-300 text-xs mb-1">Ventaja: Armadura</h4>
                            <p className="text-xs text-gray-400 mb-1">
                                A diferencia de los magos, ¡tú sí puedes llevar armadura y lanzar conjuros a la vez!
                            </p>
                        </div>
                    </div>
                    {onNextTab && (
                        <div className="flex justify-end pt-4 border-t border-gray-800 mt-4">
                            <Button onClick={onNextTab} className="bg-gray-800 hover:bg-gray-700 text-gray-100">
                                Siguiente: Escuelas <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
