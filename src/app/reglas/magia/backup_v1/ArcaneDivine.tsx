import React from 'react';
import { BookOpen, Sun, ArrowRight } from 'lucide-react';
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
            <Card id="arcane" className="border-purple-500/30 bg-dungeon-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-300">
                        <BookOpen className="h-5 w-5" />
                        Magia Arcana
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-dungeon-200 text-sm">
                    <p>
                        La magia arcana manipula la energía mágica latente en el universo a través del estudio, fórmulas complejas o talento innato. Es más técnica y destructiva.
                    </p>
                    <div className="bg-dungeon-950/30 p-3 rounded border border-purple-500/10">
                        <h4 className="font-bold text-purple-300 text-xs mb-1">Preparación y Requisitos</h4>
                        <ul className="list-disc list-inside text-xs text-dungeon-400">
                            <li><strong>Inteligencia (Magos):</strong> Necesitan estudiar sus libros de conjuros cada día.</li>
                            <li><strong>Carisma (Hechiceros/Bardos):</strong> Usan su fuerza de personalidad, no necesitan libros.</li>
                            <li><strong>Fallo de Conjuro Arcano:</strong> Las armaduras interfieren con los gestos precisos (S) necesarios.</li>
                        </ul>
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button variant="ghost" size="sm" onClick={() => scrollToId('divine')} className="text-purple-300 hover:text-purple-200">
                            Siguiente: Magia Divina <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Magia Divina */}
            <Card id="divine" className="border-gold-500/30 bg-dungeon-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gold-300">
                        <Sun className="h-5 w-5" />
                        Magia Divina
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-dungeon-200 text-sm">
                    <p>
                        La magia divina proviene de la fe, la devoción a una deidad o la conexión con la naturaleza. Se centra en la curación, protección y apoyo.
                    </p>
                    <div className="bg-dungeon-950/30 p-3 rounded border border-gold-500/10">
                        <h4 className="font-bold text-gold-300 text-xs mb-1">Preparación y Requisitos</h4>
                        <ul className="list-disc list-inside text-xs text-dungeon-400">
                            <li><strong>Sabiduría:</strong> Es la característica clave para determinar el poder de los conjuros.</li>
                            <li><strong>Oración:</strong> Deben rezar o meditar a una hora específica del día para recuperar sus conjuros.</li>
                            <li><strong>Acceso Completo:</strong> Tienen acceso a toda la lista de conjuros de su clase, no necesitan aprenderlos individualmente.</li>
                        </ul>
                    </div>
                    <div className="bg-dungeon-950/30 p-3 rounded border border-gold-500/10">
                        <h4 className="font-bold text-gold-300 text-xs mb-1">Reglas Especiales</h4>
                        <ul className="list-disc list-inside text-xs text-dungeon-400">
                            <li><strong>Sin Fallo de Armadura:</strong> Pueden lanzar conjuros con armadura sin penalización (si saben usarla).</li>
                            <li><strong>Conversión Espontánea:</strong> Los clérigos buenos pueden cambiar cualquier conjuro por uno de "Curar Heridas".</li>
                        </ul>
                    </div>
                    {onNextTab && (
                        <div className="flex justify-end pt-4 border-t border-dungeon-800 mt-4">
                            <Button onClick={onNextTab} className="bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-100">
                                Siguiente Sección: Escuelas <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
