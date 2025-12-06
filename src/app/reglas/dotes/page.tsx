import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Zap, Book, Shield, Flame, Skull, Star, Sparkles, Crown, Eye, Hand, Ghost, Moon, Sun, ChevronDown, BarChart3, Calendar, CheckSquare, Lock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata = {
    title: 'Dotes - Reglas D&D 3.5',
    description: 'Reglas completas sobre dotes: prerrequisitos, tipos y beneficios.',
};

export default function FeatsRulesPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            {/* Back Button */}
            <div className="mb-8">
                <Link href="/reglas">
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a reglas
                    </Button>
                </Link>
            </div>

            {/* Header */}
            <div className="border-l-4 border-gold-500 pl-6 mb-12">
                <div className="flex items-center gap-3 mb-3">
                    <Zap className="h-10 w-10 md:h-12 md:w-12 text-gold-400" />
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dungeon-100">
                        Dotes
                    </h1>
                </div>
                <p className="text-lg text-dungeon-300 leading-relaxed max-w-4xl">
                    Las dotes representan capacidades especiales que dan a tu personaje nuevas habilidades o mejoran las que ya tiene. A diferencia de las habilidades, no tienen rangos; simplemente tienes la dote o no la tienes.
                </p>
            </div>

            {/* TL;DR - Resumen Rápido */}
            <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/20 to-dungeon-900 border-2 border-green-500/40 rounded-xl p-6 mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500/20 rounded-full p-2">
                        <Zap className="h-6 w-6 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-400">TL;DR - Dotes en 30 Segundos</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 hover:bg-blue-900/30 transition-colors">
                        <Calendar className="h-8 w-8 text-blue-400 mb-2" />
                        <div className="font-bold text-blue-400 mb-1">Nivel 1, 3, 6, 9...</div>
                        <div className="text-dungeon-400 text-xs">
                            Ganas dotes cada 3 niveles (humanos +1 extra a niv 1)
                        </div>
                    </div>
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 hover:bg-red-900/30 transition-colors">
                        <Lock className="h-8 w-8 text-red-400 mb-2" />
                        <div className="font-bold text-red-400 mb-1">Prerrequisitos</div>
                        <div className="text-dungeon-400 text-xs">
                            Muchas dotes requieren stats, BAB o otras dotes previas
                        </div>
                    </div>
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-900/30 transition-colors">
                        <Sparkles className="h-8 w-8 text-purple-400 mb-2" />
                        <div className="font-bold text-purple-400 mb-1">Metamágicas = +Nivel</div>
                        <div className="text-dungeon-400 text-xs">
                            Mejoran conjuros pero usan espacio de nivel superior
                        </div>
                    </div>
                    <div className="bg-gold-900/20 border border-gold-500/30 rounded-lg p-4 hover:bg-gold-900/30 transition-colors">
                        <CheckSquare className="h-8 w-8 text-gold-400 mb-2" />
                        <div className="font-bold text-gold-400 mb-1">Sin rangos</div>
                        <div className="text-dungeon-400 text-xs">
                            O la tienes o no. No se acumulan (salvo excepciones)
                        </div>
                    </div>
                </div>

                {/* Ejemplo Visual de Cadena de Dotes */}
                <div className="mt-6 bg-dungeon-950/50 border border-dungeon-700 rounded-lg p-4">
                    <div className="text-sm text-dungeon-400 mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>Ejemplo: Cadena de prerrequisitos para Torbellino:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="bg-green-900/40 border border-green-500/30 px-3 py-1 rounded">Int 13 <span className="text-dungeon-500 text-xs">(stat)</span></span>
                        <span className="text-green-400 font-bold">→</span>
                        <span className="bg-blue-900/40 border border-blue-500/30 px-3 py-1 rounded">Combate con Experiencia</span>
                        <span className="text-green-400 font-bold">→</span>
                        <span className="bg-blue-900/40 border border-blue-500/30 px-3 py-1 rounded">Movilidad</span>
                        <span className="text-green-400 font-bold">→</span>
                        <span className="bg-blue-900/40 border border-blue-500/30 px-3 py-1 rounded">Ataque Primaveral</span>
                        <span className="text-green-400 font-bold">→</span>
                        <span className="bg-gold-900/40 border border-gold-500/50 px-4 py-1 rounded font-bold text-gold-400">Torbellino</span>
                    </div>
                    <p className="text-xs text-dungeon-500 mt-2">Planifica tus dotes con antelación para conseguir las más poderosas.</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Conceptos Básicos */}
                <Card className="card border-gold-500/30">
                    <CardHeader className="bg-gradient-to-r from-gold-900/20 to-transparent pb-3">
                        <div className="flex items-center gap-3">
                            <Book className="h-6 w-6 text-gold-400" />
                            <CardTitle className="text-xl text-dungeon-100">
                                Conceptos Básicos
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-dungeon-100 mb-2">Prerrequisitos</h3>
                                <p className="text-dungeon-300 text-sm mb-4">
                                    Algunas dotes tienen requisitos que debes cumplir para seleccionarlas (nivel, característica, otra dote, ataque base, etc.).
                                </p>
                                <div className="bg-dungeon-900/50 p-3 rounded border border-dungeon-700 text-xs text-dungeon-300">
                                    <p>
                                        <strong className="text-red-400">Importante:</strong> Si pierdes un prerrequisito (por ejemplo, si tu Fuerza baja temporalmente), no puedes usar la dote hasta que lo recuperes.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-dungeon-100 mb-2">Adquisición</h3>
                                <p className="text-dungeon-300 text-sm mb-4">
                                    Ganas dotes según tu nivel de personaje y tu clase.
                                    <br />
                                    Normalmente ganas una dote a nivel 1, y otra cada nivel divisible por 3 (3, 6, 9, etc.).
                                    <br />
                                    <em>Los humanos ganan una dote extra a nivel 1. Los guerreros ganan dotes adicionales de combate.</em>
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tipos Principales */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="card border-dungeon-700">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <Star className="h-5 w-5 text-dungeon-200" />
                                <CardTitle className="text-lg text-dungeon-100">Generales</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-dungeon-300">
                                Dotes estándar sin reglas especiales de grupo. Mejoran el combate, las habilidades o las salvaciones.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="card border-purple-500/30">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-purple-400" />
                                <CardTitle className="text-lg text-dungeon-100">Metamágicas</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-dungeon-300 mb-2">
                                Permiten a los lanzadores de conjuros preparar o lanzar hechizos con mayor efecto (más alcance, sin componentes, etc.) usando un espacio de conjuro de nivel superior.
                            </p>
                            <p className="text-xs text-dungeon-400 italic">
                                Magos: Preparan el conjuro con antelación.<br />
                                Hechiceros/Bardos: Tardan una acción completa al lanzarlo.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="card border-blue-500/30">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <Hand className="h-5 w-5 text-blue-400" />
                                <CardTitle className="text-lg text-dungeon-100">Creación de Objetos</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-dungeon-300 mb-2">
                                Permiten crear objetos mágicos (pociones, varitas, armas).
                            </p>
                            <ul className="text-xs text-dungeon-400 list-disc pl-4">
                                <li>Cuestan XP (1/25 del precio base).</li>
                                <li>Cuestan Oro (1/2 del precio base).</li>
                                <li>Requieren tiempo (mínimo 1 día).</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Categorías Especializadas (Accordion Replacement) */}
                <Card className="card border-dungeon-700">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                            <Crown className="h-6 w-6 text-dungeon-300" />
                            <CardTitle className="text-xl text-dungeon-100">
                                Categorías Especializadas
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-dungeon-700">
                            <details className="group">
                                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-dungeon-900/30 transition-colors list-none">
                                    <span className="font-medium text-dungeon-100 group-hover:text-gold-400 transition-colors">
                                        Específicas de Clase (Guerrero, Divinas, Salvajes, etc.)
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-dungeon-400 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="p-4 pt-0 text-dungeon-300 text-sm space-y-2">
                                    <p><strong>Dotes de Guerrero:</strong> Pueden seleccionarse como dotes adicionales de la clase Guerrero.</p>
                                    <p><strong>Dotes Divinas:</strong> Requieren la capacidad de expulsar/reprender muertos vivientes. Gastan usos diarios de expulsión para activar efectos.</p>
                                    <p><strong>Dotes Salvajes:</strong> Requieren <em>Forma Salvaje</em>. Gastan usos diarios de forma salvaje para obtener beneficios.</p>
                                    <p><strong>Dotes de Música de Bardo:</strong> Requieren música de bardo y gastan usos diarios para efectos especiales.</p>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-dungeon-900/30 transition-colors list-none">
                                    <span className="font-medium text-dungeon-100 group-hover:text-gold-400 transition-colors">
                                        Raciales y de Herencia
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-dungeon-400 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="p-4 pt-0 text-dungeon-300 text-sm space-y-2">
                                    <p><strong>Dotes Raciales:</strong> Solo para razas específicas. A menudo alteran características raciales.</p>
                                    <p><strong>Dotes de Herencia:</strong> Indican un ancestro especial (dracónico, celestial, infernal). Suelen dar habilidades mágicas menores.</p>
                                    <p><strong>Dotes Dracónicas:</strong> Para hechiceros con ancestros dragones. Otorgan garras, aliento o resistencias.</p>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-dungeon-900/30 transition-colors list-none">
                                    <span className="font-medium text-dungeon-100 group-hover:text-gold-400 transition-colors">
                                        Psiónicas y Metapsiónicas
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-dungeon-400 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="p-4 pt-0 text-dungeon-300 text-sm space-y-2">
                                    <p><strong>Dotes Psiónicas:</strong> Requieren capacidad de manifestar poderes. Son sobrenaturales. Muchas requieren o gastan el <em>Foco Psiónico</em>.</p>
                                    <p><strong>Dotes Metapsiónicas:</strong> Similares a las metamágicas pero para poderes psiónicos. Cuestan puntos de poder adicionales y requieren gastar el foco psiónico.</p>
                                    <p><strong>Creación de Objetos Psiónicos:</strong> Para crear piedras de poder, dorjes, tatuajes, etc.</p>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-dungeon-900/30 transition-colors list-none">
                                    <span className="font-medium text-dungeon-100 group-hover:text-gold-400 transition-colors">
                                        Oscuras y Monstruosas (Vileza, Aberrantes, etc.)
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-dungeon-400 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="p-4 pt-0 text-dungeon-300 text-sm space-y-2">
                                    <p><strong>Dotes de Vileza (Vile):</strong> Solo para personajes malvados. Otorgadas por demonios o dioses oscuros. Son sobrenaturales.</p>
                                    <p><strong>Dotes Aberrantes:</strong> Deforman físicamente al personaje. Dan penalizadores a habilidades sociales (Diplomacia, etc.) pero otorgan poderes extraños.</p>
                                    <p><strong>Herencia Abisal:</strong> Vinculadas al caos y demonios. Hacen al personaje caótico. Se vuelven más fuertes cuantas más tengas.</p>
                                    <p><strong>Dotes Monstruosas:</strong> Requieren formas o apéndices monstruosos (alas, colas, etc.).</p>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-dungeon-900/30 transition-colors list-none">
                                    <span className="font-medium text-dungeon-100 group-hover:text-gold-400 transition-colors">
                                        Combate Avanzado (Tácticas, Estilos, Emboscada)
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-dungeon-400 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="p-4 pt-0 text-dungeon-300 text-sm space-y-2">
                                    <p><strong>Dotes Tácticas:</strong> Permiten maniobras complejas que a menudo requieren varias rondas o acciones específicas para activarse.</p>
                                    <p><strong>Estilos de Arma:</strong> Beneficios al usar combinaciones específicas de armas y dotes (ej. Estilo de la Luna Creciente).</p>
                                    <p><strong>Dotes de Emboscada:</strong> Permiten sacrificar dados de daño de ataque furtivo para causar efectos de estado (cegar, derribar, etc.).</p>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-dungeon-900/30 transition-colors list-none">
                                    <span className="font-medium text-dungeon-100 group-hover:text-gold-400 transition-colors">
                                        Otras Categorías (Suerte, Reserva, etc.)
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-dungeon-400 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="p-4 pt-0 text-dungeon-300 text-sm space-y-2">
                                    <p><strong>Dotes de Suerte:</strong> Otorgan "rerolls" (volver a tirar) diarios y capacidades de supervivencia basadas en la fortuna.</p>
                                    <p><strong>Dotes de Reserva:</strong> Para lanzadores de conjuros. Otorgan habilidades sobrenaturales "a voluntad" siempre que tengas un conjuro de cierto tipo preparado/disponible.</p>
                                    <p><strong>Dotes de Dominio:</strong> Para clérigos o devotos. Otorgan poderes relacionados con un dominio (ej. Bien, Ley, Fuego).</p>
                                </div>
                            </details>
                        </div>
                    </CardContent>
                </Card>

                {/* Formato de Descripciones */}
                <Card className="card border-dungeon-600">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                            <Book className="h-6 w-6 text-dungeon-300" />
                            <CardTitle className="text-xl text-dungeon-100">
                                Formato de las Dotes
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <p className="text-dungeon-300 text-sm">
                            Las descripciones de las dotes siguen este formato estándar:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-dungeon-100 text-sm mb-1">Prerrequisito</h4>
                                    <p className="text-xs text-dungeon-300">
                                        Lo que necesitas tener antes de elegir la dote. Si no lo cumples, no puedes cogerla. Si dejas de cumplirlo más tarde, pierdes el beneficio de la dote.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-dungeon-100 text-sm mb-1">Beneficio</h4>
                                    <p className="text-xs text-dungeon-300">
                                        Lo que la dote te permite hacer. Normalmente, coger la misma dote dos veces no acumula sus beneficios, a menos que diga lo contrario.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-dungeon-100 text-sm mb-1">Normal</h4>
                                    <p className="text-xs text-dungeon-300">
                                        Qué es lo que puede (o no puede) hacer un personaje que NO tiene esta dote. Útil para entender qué ventaja real te da.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-dungeon-100 text-sm mb-1">Especial</h4>
                                    <p className="text-xs text-dungeon-300">
                                        Información adicional, como si un Guerrero puede elegirla como dote adicional, o si tiene efectos extra para ciertas clases.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
