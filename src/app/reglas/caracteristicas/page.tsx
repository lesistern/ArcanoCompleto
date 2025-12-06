import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Brain, Sword, Shield, Zap, Book, Eye, Heart, Target, Sparkles, Dumbbell, BarChart3, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ModifiersTable } from './ModifiersTable';

export const metadata = {
    title: 'Características - Compendio Arcano',
    description: 'Detalle de las seis características base: Fuerza, Destreza, Constitución, Inteligencia, Sabiduría y Carisma.',
};

export default function CaracteristicasPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-dungeon-950 via-dungeon-900/90 to-gold-950/30"></div>

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Link href="/reglas">
                                <Button variant="ghost" size="sm" className="text-dungeon-400 hover:text-dungeon-200 pl-0">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver a Reglas
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-dungeon-100 leading-tight">
                            Caracteristicas
                        </h1>
                        <p className="text-lg text-dungeon-300 leading-relaxed">
                            Las seis caracteristicas definen las capacidades basicas de tu personaje: Fuerza, Destreza, Constitucion, Inteligencia, Sabiduria y Carisma.
                        </p>
                    </div>

                    <div className="p-6 rounded-full bg-gold-500/10 border border-gold-500/30 backdrop-blur-sm">
                        <User className="h-12 w-12 text-gold-400" />
                    </div>
                </div>
            </div>

            {/* TL;DR - Resumen Rapido */}
            <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/20 to-dungeon-900 border-2 border-green-500/40 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500/20 rounded-full p-2">
                        <Zap className="h-6 w-6 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-400">TL;DR - Características en 30 Segundos</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-sm mb-4">
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 hover:bg-red-900/30 transition-colors text-center">
                        <Dumbbell className="h-6 w-6 text-red-400 mx-auto mb-1" />
                        <div className="font-bold text-red-400 text-xs">FUE</div>
                        <div className="text-dungeon-400 text-[10px]">Daño cuerpo a cuerpo</div>
                    </div>
                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 hover:bg-green-900/30 transition-colors text-center">
                        <Target className="h-6 w-6 text-green-400 mx-auto mb-1" />
                        <div className="font-bold text-green-400 text-xs">DES</div>
                        <div className="text-dungeon-400 text-[10px]">CA, reflejos, puntería</div>
                    </div>
                    <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-3 hover:bg-orange-900/30 transition-colors text-center">
                        <Heart className="h-6 w-6 text-orange-400 mx-auto mb-1" />
                        <div className="font-bold text-orange-400 text-xs">CON</div>
                        <div className="text-dungeon-400 text-[10px]">Puntos de golpe</div>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 hover:bg-blue-900/30 transition-colors text-center">
                        <Book className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                        <div className="font-bold text-blue-400 text-xs">INT</div>
                        <div className="text-dungeon-400 text-[10px]">Magos, habilidades</div>
                    </div>
                    <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3 hover:bg-cyan-900/30 transition-colors text-center">
                        <Eye className="h-6 w-6 text-cyan-400 mx-auto mb-1" />
                        <div className="font-bold text-cyan-400 text-xs">SAB</div>
                        <div className="text-dungeon-400 text-[10px]">Clérigos, percepción</div>
                    </div>
                    <div className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-3 hover:bg-pink-900/30 transition-colors text-center">
                        <Sparkles className="h-6 w-6 text-pink-400 mx-auto mb-1" />
                        <div className="font-bold text-pink-400 text-xs">CAR</div>
                        <div className="text-dungeon-400 text-[10px]">Hechiceros, social</div>
                    </div>
                </div>

                {/* Ejemplo Visual de Modificador */}
                <div className="bg-dungeon-950/50 border border-dungeon-700 rounded-lg p-4">
                    <div className="text-sm text-dungeon-400 mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>Fórmula del modificador:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="bg-dungeon-800 px-3 py-1 rounded font-mono">Modificador</span>
                        <span className="text-dungeon-500">=</span>
                        <span className="bg-gold-900/40 border border-gold-500/30 px-3 py-1 rounded">(Puntuación - 10) ÷ 2</span>
                        <span className="text-dungeon-500">→</span>
                        <span className="bg-green-900/40 border border-green-500/30 px-3 py-1 rounded">Ej: 16 → <span className="text-green-400 font-bold">+3</span></span>
                        <span className="bg-yellow-900/40 border border-yellow-500/30 px-3 py-1 rounded">Ej: 10 → <span className="text-yellow-400 font-bold">+0</span></span>
                        <span className="bg-red-900/40 border border-red-500/30 px-3 py-1 rounded">Ej: 8 → <span className="text-red-400 font-bold">-1</span></span>
                    </div>
                    <p className="text-xs text-dungeon-500 mt-2">+1 permanente cada 4 niveles (4°, 8°, 12°, 16°, 20°). Rango base nivel 1: 3-18.</p>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
                {/* Tabla de Modificadores */}
                <Card className="card border-gold-500/30">
                    <CardHeader className="bg-gradient-to-r from-gold-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Target className="h-6 w-6 text-gold-400" />
                            Modificadores de característica
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <p className="text-dungeon-200 mb-6">
                            El modificador es el número que sumas o restas a las tiradas. Se calcula como: <code className="bg-dungeon-900 px-2 py-1 rounded text-gold-400">(Puntuación - 10) / 2</code> (redondeando hacia abajo).
                        </p>
                        <div className="bg-dungeon-900/30 p-4 rounded mb-6 border-l-4 border-gold-500/50">
                            <p className="text-sm text-dungeon-300">
                                <strong className="text-gold-400">Rango a nivel 1:</strong> Las puntuaciones base (antes de aplicar la raza) van de <strong>3 a 18</strong>. Los modificadores raciales pueden extender este rango: por ejemplo, un Semiorco podría comenzar con Carisma 1 (3 base - 2 racial), y un Elfo con Destreza 20 (18 base + 2 racial).
                            </p>
                        </div>
                        <ModifiersTable />
                    </CardContent>
                </Card>

                {/* Fuerza */}
                <Card className="card border-red-500/30">
                    <CardHeader className="bg-gradient-to-r from-red-500/25 to-transparent pb-3">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Sword className="h-6 w-6 text-red-400" />
                            <span className="text-red-400">Fuerza (Fue)</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <p className="text-lg text-dungeon-200">
                            La fuerza mide tu poder físico y capacidad atlética.
                        </p>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-red-900/10 border-l-4 border-red-500 p-4 rounded">
                                <h4 className="font-bold text-red-400 mb-2 text-sm">Crítica para:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-0.5">●</span>
                                        <span>Bárbaro</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-0.5">●</span>
                                        <span>Guerrero</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-0.5">●</span>
                                        <span>Paladín</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-0.5">●</span>
                                        <span>Explorador</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-orange-900/10 border-l-4 border-orange-500 p-4 rounded">
                                <h4 className="font-bold text-orange-400 mb-2 text-sm">Importante para:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-400 mt-0.5">●</span>
                                        <span>Clérigo</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-400 mt-0.5">●</span>
                                        <span>Druida</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-400 mt-0.5">●</span>
                                        <span>Monje</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-dungeon-900/30 border-l-4 border-dungeon-600 p-4 rounded">
                                <h4 className="font-bold text-dungeon-400 mb-2 text-sm">Menos importante:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-400">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-0.5">○</span>
                                        <span>Bardo</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-0.5">○</span>
                                        <span>Hechicero</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-0.5">○</span>
                                        <span>Mago</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-0.5">○</span>
                                        <span>Pícaro</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gold-400 mb-3">El modificador de fuerza se aplica a:</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded">
                                    <Sword className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-dungeon-200">Tiradas de ataque cuerpo a cuerpo</span>
                                </div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded">
                                    <Sword className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-dungeon-200">Tiradas de daño (armas cuerpo a cuerpo y arrojadizas)</span>
                                </div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded">
                                    <Shield className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-dungeon-200">Pruebas de trepar, saltar y nadar</span>
                                </div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded">
                                    <Shield className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-dungeon-200">Romper objetos o forzar puertas</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-900/20 border-l-4 border-red-400 p-4 rounded">
                            <p className="text-sm text-dungeon-200">
                                <strong className="text-red-400">Nota:</strong> con un arma a dos manos, aplicas 1.5× tu modificador de fuerza al daño. Con la mano torpe, solo aplicas la mitad.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Destreza */}
                <Card className="card border-green-500/30">
                    <CardHeader className="bg-gradient-to-r from-green-500/25 to-transparent pb-3">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Zap className="h-6 w-6 text-green-400" />
                            <span className="text-green-400">Destreza (Des)</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <p className="text-lg text-dungeon-200">
                            La destreza mide tu agilidad, reflejos y coordinación mano-ojo.
                        </p>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-green-900/10 border-l-4 border-green-500 p-4 rounded">
                                <h4 className="font-bold text-green-400 mb-2 text-sm">Crítica para:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-300">
                                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">●</span><span>Monje</span></li>
                                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">●</span><span>Pícaro</span></li>
                                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">●</span><span>Explorador</span></li>
                                </ul>
                            </div>
                            <div className="bg-cyan-900/10 border-l-4 border-cyan-500 p-4 rounded">
                                <h4 className="font-bold text-cyan-400 mb-2 text-sm">Importante para:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-300">
                                    <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">●</span><span>Bardo</span></li>
                                    <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">●</span><span>Guerrero</span></li>
                                </ul>
                            </div>
                            <div className="bg-dungeon-900/30 border-l-4 border-dungeon-600 p-4 rounded">
                                <h4 className="font-bold text-dungeon-400 mb-2 text-sm">Menos importante:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-400">
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Bárbaro</span></li>
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Clérigo</span></li>
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Hechicero</span></li>
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Mago</span></li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gold-400 mb-3">El modificador de destreza se aplica a:</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Target className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Tiradas de ataque a distancia</span></div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Clase de armadura (CA)</span></div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Zap className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Tiros de salvación de reflejos</span></div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Zap className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Habilidades de agilidad y sigilo</span></div>
                            </div>
                        </div>

                        <div className="bg-green-900/20 border-l-4 border-green-400 p-4 rounded">
                            <p className="text-sm text-dungeon-200"><strong className="text-green-400">Limitación:</strong> las armaduras pesadas limitan cuánto de tu bonificador de destreza puedes aplicar a tu CA.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Constitución */}
                <Card className="card border-orange-500/30">
                    <CardHeader className="bg-gradient-to-r from-orange-500/25 to-transparent pb-3">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Heart className="h-6 w-6 text-orange-400" />
                            <span className="text-orange-400">Constitución (Con)</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <p className="text-lg text-dungeon-200">
                            La constitución representa tu salud, resistencia y vitalidad.
                        </p>

                        <div className="bg-orange-900/10 border-l-4 border-orange-500 p-4 rounded">
                            <h4 className="font-bold text-orange-400 mb-3">Importante para TODAS las clases</h4>
                            <p className="text-sm text-dungeon-200 mb-3">La constitución afecta tus puntos de golpe, haciendo que sobrevivas más tiempo.</p>
                            <div className="bg-orange-900/20 p-3 rounded">
                                <p className="text-xs text-orange-300"><strong>Especialmente crítica para:</strong> Bárbaro, Guerrero, Monje (primera línea)</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gold-400 mb-3">El modificador de constitución se aplica a:</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Heart className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Cada dado de golpe al subir de nivel</span></div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Shield className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Tiros de salvación de fortaleza</span></div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Brain className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Pruebas de concentración</span></div>
                            </div>
                        </div>

                        <div className="bg-orange-900/20 border-l-4 border-orange-400 p-4 rounded">
                            <p className="text-sm text-dungeon-200"><strong className="text-orange-400">Importante:</strong> un penalizador de constitución nunca puede reducir el resultado de un dado de golpe por debajo de 1.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Inteligencia */}
                <Card className="card border-blue-500/30">
                    <CardHeader className="bg-gradient-to-r from-blue-500/25 to-transparent pb-3">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Book className="h-6 w-6 text-blue-400" />
                            <span className="text-blue-400">Inteligencia (Int)</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <p className="text-lg text-dungeon-200">
                            La inteligencia mide tu capacidad de razonamiento, memoria y aprendizaje.
                        </p>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-blue-900/10 border-l-4 border-blue-500 p-4 rounded">
                                <h4 className="font-bold text-blue-400 mb-2 text-sm">Crítica para:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-300">
                                    <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">●</span><span>Mago</span></li>
                                </ul>
                            </div>
                            <div className="bg-cyan-900/10 border-l-4 border-cyan-500 p-4 rounded">
                                <h4 className="font-bold text-cyan-400 mb-2 text-sm">Importante para:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-300">
                                    <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">●</span><span>Todas las clases (puntos de habilidad)</span></li>
                                </ul>
                            </div>
                            <div className="bg-dungeon-900/30 border-l-4 border-dungeon-600 p-4 rounded">
                                <h4 className="font-bold text-dungeon-400 mb-2 text-sm">Menos importante:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-400">
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Bárbaro</span></li>
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Guerrero</span></li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gold-400 mb-3">El modificador de inteligencia se aplica a:</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Book className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Puntos de habilidad por nivel</span></div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Brain className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Idiomas adicionales</span></div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Eye className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Pruebas de buscar y saber</span></div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Zap className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Conocimiento de conjuros</span></div>
                            </div>
                        </div>

                        <div className="bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
                            <p className="text-sm text-dungeon-200"><strong className="text-blue-400">Lanzadores arcanos:</strong> los magos necesitan inteligencia de al menos 10 + nivel del conjuro para lanzarlo.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Sabiduría */}
                <Card className="card border-cyan-500/30">
                    <CardHeader className="bg-gradient-to-r from-cyan-500/25 to-transparent pb-3">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Eye className="h-6 w-6 text-cyan-400" />
                            <span className="text-cyan-400">Sabiduría (Sab)</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <p className="text-lg text-dungeon-200">
                            La sabiduría representa tu intuición, percepción del entorno y fuerza de voluntad.
                        </p>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-cyan-900/10 border-l-4 border-cyan-500 p-4 rounded">
                                <h4 className="font-bold text-cyan-400 mb-2 text-sm">Crítica para:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-300">
                                    <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">●</span><span>Clérigo</span></li>
                                    <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">●</span><span>Druida</span></li>
                                </ul>
                            </div>
                            <div className="bg-blue-900/10 border-l-4 border-blue-500 p-4 rounded">
                                <h4 className="font-bold text-blue-400 mb-2 text-sm">Importante para:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-300">
                                    <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">●</span><span>Monje</span></li>
                                    <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">●</span><span>Explorador</span></li>
                                    <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">●</span><span>Paladín</span></li>
                                </ul>
                            </div>
                            <div className="bg-dungeon-900/30 border-l-4 border-dungeon-600 p-4 rounded">
                                <h4 className="font-bold text-dungeon-400 mb-2 text-sm">Menos importante:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-400">
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Bárbaro</span></li>
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Guerrero</span></li>
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Hechicero</span></li>
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Mago</span></li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gold-400 mb-3">El modificador de sabiduría se aplica a:</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Brain className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Tiros de salvación de voluntad</span></div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Eye className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Pruebas de avistar y escuchar</span></div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Target className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Averiguar intenciones</span></div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Heart className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Sanar y supervivencia</span></div>
                            </div>
                        </div>

                        <div className="bg-cyan-900/20 border-l-4 border-cyan-400 p-4 rounded">
                            <p className="text-sm text-dungeon-200"><strong className="text-cyan-400">Lanzadores divinos:</strong> clérigos, druidas, exploradores y paladines necesitan sabiduría de al menos 10 + nivel del conjuro.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Carisma */}
                <Card className="card border-pink-500/30">
                    <CardHeader className="bg-gradient-to-r from-pink-500/25 to-transparent pb-3">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Sparkles className="h-6 w-6 text-pink-400" />
                            <span className="text-pink-400">Carisma (Car)</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <p className="text-lg text-dungeon-200">
                            El carisma mide tu fuerza de personalidad, persuasión y magnetismo personal.
                        </p>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-pink-900/10 border-l-4 border-pink-500 p-4 rounded">
                                <h4 className="font-bold text-pink-400 mb-2 text-sm">Crítica para:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-300">
                                    <li className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">●</span><span>Bardo</span></li>
                                    <li className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">●</span><span>Hechicero</span></li>
                                    <li className="flex items-start gap-2"><span className="text-pink-400 mt-0.5">●</span><span>Paladín</span></li>
                                </ul>
                            </div>
                            <div className="bg-purple-900/10 border-l-4 border-purple-500 p-4 rounded">
                                <h4 className="font-bold text-purple-400 mb-2 text-sm">Importante para:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-300">
                                    <li className="flex items-start gap-2"><span className="text-purple-400 mt-0.5">●</span><span>Clérigo (expulsar)</span></li>
                                </ul>
                            </div>
                            <div className="bg-dungeon-900/30 border-l-4 border-dungeon-600 p-4 rounded">
                                <h4 className="font-bold text-dungeon-400 mb-2 text-sm">Menos importante:</h4>
                                <ul className="space-y-1 text-xs text-dungeon-400">
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Bárbaro</span></li>
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Guerrero</span></li>
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Mago</span></li>
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Monje</span></li>
                                    <li className="flex items-start gap-2"><span className="mt-0.5">○</span><span>Explorador</span></li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gold-400 mb-3">El modificador de carisma se aplica a:</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Sparkles className="h-5 w-5 text-pink-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Habilidades sociales (diplomacia, engañar)</span></div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Target className="h-5 w-5 text-pink-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Influir en otros</span></div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Zap className="h-5 w-5 text-pink-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Expulsar muertos vivientes</span></div>
                                <div className="flex items-start gap-3 bg-dungeon-900/30 p-3 rounded"><Book className="h-5 w-5 text-pink-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-dungeon-200">Reunir información</span></div>
                            </div>
                        </div>

                        <div className="bg-pink-900/20 border-l-4 border-pink-400 p-4 rounded">
                            <p className="text-sm text-dungeon-200"><strong className="text-pink-400">Lanzadores espontáneos:</strong> bardos y hechiceros necesitan carisma de al menos 10 + nivel del conjuro.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Cambios */}
                <Card className="card border-green-500/30">
                    <CardHeader className="bg-gradient-to-r from-green-500/25 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Zap className="h-6 w-6 text-green-400" />
                            <span className="text-green-400">Cambios en las características</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <p className="text-lg text-dungeon-200">
                            Las puntuaciones de características pueden cambiar durante el juego:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                                    <ArrowLeft className="h-4 w-4 rotate-90" /> Mejoras por nivel
                                </h4>
                                <p className="text-sm text-dungeon-300">
                                    Cada cuatro niveles (4°, 8°, 12°, 16°, 20°) obtienes <strong className="text-green-400">+1 permanente</strong> a cualquier característica que elijas.
                                </p>
                            </div>

                            <div className="bg-blue-900/10 border border-blue-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" /> Efectos temporales
                                </h4>
                                <p className="text-sm text-dungeon-300 mb-2">Muchos conjuros otorgan bonificadores temporales:</p>
                                <ul className="text-xs text-dungeon-400 space-y-1">
                                    <li>• Fuerza de toro: +4 a fuerza</li>
                                    <li>• Gracia felina: +4 a destreza</li>
                                    <li>• Resistencia del oso: +4 a constitución</li>
                                </ul>
                            </div>

                            <div className="bg-gold-900/10 border border-gold-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-gold-400 mb-2 flex items-center gap-2">
                                    <Shield className="h-4 w-4" /> Objetos mágicos
                                </h4>
                                <p className="text-sm text-dungeon-300 mb-2">Bonificadores mientras los uses:</p>
                                <ul className="text-xs text-dungeon-400 space-y-1">
                                    <li>• Guantes de destreza</li>
                                    <li>• Cíngulo de fuerza de gigante</li>
                                    <li>• Amuleto de salud</li>
                                </ul>
                            </div>

                            <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                                    <Heart className="h-4 w-4" /> Daño y consunción
                                </h4>
                                <ul className="text-sm text-dungeon-300 space-y-2">
                                    <li>
                                        <strong className="text-red-300">Daño:</strong> se recupera naturalmente a 1 punto por día.
                                    </li>
                                    <li>
                                        <strong className="text-red-400">Consunción:</strong> permanente, solo restaurable con magia poderosa.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Back Button */}
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
