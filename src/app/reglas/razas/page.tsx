import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Users, Languages, Star, BookOpen, Check, AlertTriangle, ArrowUp, ArrowDown, Dna, Zap, User, Leaf, Mountain, Footprints, Sparkles, UserPlus, Swords, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata = {
    title: 'Razas - Reglas D&D 3.5',
    description: 'Guía sobre las razas, cómo elegirlas, cualidades raciales e idiomas en D&D 3.5.',
};

export default function RacesRulesPage() {
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
            <div className="border-l-4 border-green-500 pl-6 mb-12">
                <div className="flex items-center gap-4 mb-3">
                    <Users className="h-10 w-10 md:h-12 md:w-12 text-green-400" />
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dungeon-100">
                        Razas
                    </h1>
                </div>
                <p className="text-lg text-dungeon-300">
                    Tu raza determina tu aspecto, tu herencia cultural y tus capacidades innatas.
                </p>
            </div>

            {/* TL;DR - Resumen Rápido */}
            <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/20 to-dungeon-900 border-2 border-green-500/40 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500/20 rounded-full p-2">
                        <Zap className="h-6 w-6 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-400">TL;DR - Razas en 30 Segundos</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 hover:bg-blue-900/30 transition-colors">
                        <User className="h-6 w-6 text-blue-400 mb-1" />
                        <div className="font-bold text-blue-400">Humano</div>
                        <div className="text-dungeon-400 text-xs">+1 dote, +4 skills</div>
                        <div className="text-dungeon-500 text-xs">Predilecta: Cualquiera</div>
                    </div>
                    <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-3 hover:bg-emerald-900/30 transition-colors">
                        <Leaf className="h-6 w-6 text-emerald-400 mb-1" />
                        <div className="font-bold text-emerald-400">Elfo</div>
                        <div className="text-dungeon-400 text-xs">+2 Des, -2 Con</div>
                        <div className="text-dungeon-500 text-xs">Predilecta: Mago</div>
                    </div>
                    <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-3 hover:bg-orange-900/30 transition-colors">
                        <Mountain className="h-6 w-6 text-orange-400 mb-1" />
                        <div className="font-bold text-orange-400">Enano</div>
                        <div className="text-dungeon-400 text-xs">+2 Con, -2 Car</div>
                        <div className="text-dungeon-500 text-xs">Predilecta: Guerrero</div>
                    </div>
                    <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 hover:bg-yellow-900/30 transition-colors">
                        <Footprints className="h-6 w-6 text-yellow-400 mb-1" />
                        <div className="font-bold text-yellow-400">Mediano</div>
                        <div className="text-dungeon-400 text-xs">+2 Des, -2 Fue</div>
                        <div className="text-dungeon-500 text-xs">Predilecta: Pícaro</div>
                    </div>
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 hover:bg-purple-900/30 transition-colors">
                        <Sparkles className="h-6 w-6 text-purple-400 mb-1" />
                        <div className="font-bold text-purple-400">Gnomo</div>
                        <div className="text-dungeon-400 text-xs">+2 Con, -2 Fue</div>
                        <div className="text-dungeon-500 text-xs">Predilecta: Bardo</div>
                    </div>
                    <div className="bg-teal-900/20 border border-teal-500/30 rounded-lg p-3 hover:bg-teal-900/30 transition-colors">
                        <UserPlus className="h-6 w-6 text-teal-400 mb-1" />
                        <div className="font-bold text-teal-400">Semielfo</div>
                        <div className="text-dungeon-400 text-xs">Sin ajustes</div>
                        <div className="text-dungeon-500 text-xs">Predilecta: Cualquiera</div>
                    </div>
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 hover:bg-red-900/30 transition-colors">
                        <Swords className="h-6 w-6 text-red-400 mb-1" />
                        <div className="font-bold text-red-400">Semiorco</div>
                        <div className="text-dungeon-400 text-xs">+2 Fue, -2 Int, -2 Car</div>
                        <div className="text-dungeon-500 text-xs">Predilecta: Bárbaro</div>
                    </div>
                </div>

                {/* Ejemplo Visual */}
                <div className="mt-6 bg-dungeon-950/50 border border-dungeon-700 rounded-lg p-4">
                    <div className="text-sm text-dungeon-400 mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>Ejemplo: Elfo Mago con Inteligencia base 16:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="bg-dungeon-800 px-3 py-1 rounded font-mono">Int 16</span>
                        <span className="text-dungeon-500">+</span>
                        <span className="bg-emerald-900/40 border border-emerald-500/30 px-3 py-1 rounded">+2 Des <span className="text-emerald-400 text-xs">(racial)</span></span>
                        <span className="text-dungeon-500">+</span>
                        <span className="bg-red-900/40 border border-red-500/30 px-3 py-1 rounded">-2 Con <span className="text-red-400 text-xs">(racial)</span></span>
                        <span className="text-dungeon-500">=</span>
                        <span className="bg-green-900/40 border border-green-500/50 px-4 py-1 rounded font-bold text-green-400">Int 16, Des 14, Con 12</span>
                    </div>
                    <p className="text-xs text-dungeon-500 mt-2">Los modificadores raciales se aplican DESPUÉS de tirar o asignar puntuaciones base.</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Cómo elegir una raza */}
                <Card className="card border-green-500/30">
                    <CardHeader className="bg-gradient-to-r from-green-500/25 to-transparent pb-3">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Users className="h-6 w-6 text-green-400" />
                            <span className="text-green-400">Cómo elegir una raza</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <p className="text-lg text-dungeon-200">
                            Después de tirar tus puntuaciones de característica, elige la raza de tu personaje. Al mismo tiempo, deberías elegir una clase, ya que la raza afecta a qué tan bien puede desempeñarse un personaje en cada clase.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-green-900/10 border-l-4 border-green-500 p-4 rounded">
                                <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                                    <Dna className="h-4 w-4" /> Diversidad
                                </h4>
                                <p className="text-sm text-dungeon-300">
                                    Puedes jugar un personaje de cualquier combinación de raza y clase, pero ciertas razas se desempeñan mejor en ciertas carreras.
                                </p>
                            </div>
                            <div className="bg-dungeon-900/30 border-l-4 border-dungeon-600 p-4 rounded">
                                <h4 className="font-bold text-dungeon-400 mb-2 flex items-center gap-2">
                                    <Star className="h-4 w-4" /> Ejemplo
                                </h4>
                                <p className="text-sm text-dungeon-300">
                                    Los medianos pueden ser guerreros, pero su tamaño pequeño y rasgos especiales los hacen mejores pícaros.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Cualidades raciales */}
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="card border-gold-500/30 h-full">
                        <CardHeader className="bg-gradient-to-r from-gold-500/25 to-transparent pb-3">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <ArrowUp className="h-5 w-5 text-gold-400" />
                                <span className="text-gold-400">Ajustes a las características</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 text-dungeon-200 space-y-4">
                            <p>
                                Encuentra los ajustes raciales de característica de tu personaje y aplícalos a sus puntuaciones.
                            </p>
                            <div className="bg-gold-900/10 p-4 rounded border border-gold-500/20">
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <Check className="h-4 w-4 text-gold-400 mt-0.5" />
                                        <span>Si estos cambios ponen tu puntuación por encima de 18 o por debajo de 3, está bien.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5" />
                                        <span><strong className="text-orange-400">Excepción importante:</strong> La Inteligencia mínima de un personaje jugador es siempre 3, incluso si los penalizadores raciales la bajarían matemáticamente a 1 o 2.</span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="card border-purple-500/30 h-full">
                        <CardHeader className="bg-gradient-to-r from-purple-500/25 to-transparent pb-3">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <Star className="h-5 w-5 text-purple-400" />
                                <span className="text-purple-400">Clase predilecta</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 text-dungeon-200 space-y-4">
                            <p>
                                La clase predilecta de un personaje no cuenta en su contra al determinar penalizaciones de puntos de experiencia por multiclase.
                            </p>
                            <div className="bg-purple-900/10 p-4 rounded border border-purple-500/20">
                                <p className="text-sm text-purple-200">
                                    <strong className="text-purple-400">Ejemplo:</strong> La clase predilecta de un mago elfo es Mago, por lo que sus niveles de mago no cuentan al verificar si sus clases están desequilibradas.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Raza e idiomas */}
                <Card className="card border-blue-500/30">
                    <CardHeader className="bg-gradient-to-r from-blue-500/25 to-transparent pb-3">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Languages className="h-6 w-6 text-blue-400" />
                            <span className="text-blue-400">Raza e idiomas</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                                    <Languages className="h-5 w-5 text-blue-400" /> Idiomas comunes
                                </h3>
                                <p className="text-dungeon-200 mb-4">
                                    Todos los personajes saben hablar Común. Un enano, elfo, gnomo, semielfo, semiorco o mediano también habla un idioma racial.
                                </p>
                                <div className="bg-blue-900/10 p-4 rounded border-l-4 border-blue-500">
                                    <p className="text-sm text-dungeon-300">
                                        Un personaje con un bonificador de Inteligencia a nivel 1 habla otros idiomas también, un idioma extra por punto de bonificador.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-blue-400" /> Alfabetización
                                </h3>
                                <p className="text-dungeon-200 mb-4">
                                    Cualquier personaje excepto un bárbaro puede leer y escribir todos los idiomas que habla.
                                </p>
                                <div className="bg-dungeon-900/30 p-4 rounded border-l-4 border-dungeon-600">
                                    <p className="text-sm text-dungeon-300">
                                        Un bárbaro puede volverse alfabetizado gastando <strong>2 puntos de habilidad</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-dungeon-700">
                            <h3 className="font-bold text-gold-400 mb-4">Idiomas de clase</h3>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="bg-dungeon-900/50 p-3 rounded text-center border border-dungeon-700">
                                    <strong className="block text-dungeon-100 mb-1">Clérigo</strong>
                                    <span className="text-xs text-dungeon-400">Abisal, Celestial, Infernal</span>
                                </div>
                                <div className="bg-dungeon-900/50 p-3 rounded text-center border border-dungeon-700">
                                    <strong className="block text-dungeon-100 mb-1">Druida</strong>
                                    <span className="text-xs text-dungeon-400">Silvano (y Druídico gratis)</span>
                                </div>
                                <div className="bg-dungeon-900/50 p-3 rounded text-center border border-dungeon-700">
                                    <strong className="block text-dungeon-100 mb-1">Mago</strong>
                                    <span className="text-xs text-dungeon-400">Dracónico</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Footer Navigation */}
            <div className="flex gap-4 mt-12">
                <Link href="/reglas">
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a reglas
                    </Button>
                </Link>
                <Link href="/">
                    <Button variant="ghost">Inicio</Button>
                </Link>
            </div>
        </div>
    );
}
