import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Dices, Target, Swords, Heart, Shield, Zap, CheckCircle, XCircle, Calculator, Divide, BookOpen, ChevronDown, Skull, Star, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata = {
    title: 'Reglas Básicas - Compendio Arcano',
    description: 'Guía completa de las reglas básicas del sistema d20: mecánica central, tipos de tiradas y combate.',
};

export default function ReglasBasicasPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl mb-12">
                <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-dungeon-950 via-dungeon-900/90 to-dungeon-950/50"></div>

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
                            Reglas Basicas del Sistema d20
                        </h1>
                        <p className="text-lg text-dungeon-300 leading-relaxed">
                            Todo lo que necesitas saber para empezar a jugar.
                        </p>
                    </div>

                    <div className="p-6 rounded-full bg-gold-500/10 border border-gold-500/30 backdrop-blur-sm">
                        <Dices className="h-12 w-12 text-gold-500" />
                    </div>
                </div>
            </div>

            {/* Nota para nuevos jugadores */}
            <div className="bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded mb-6">
                <p className="text-blue-300 font-semibold mb-2">¿Nuevo en D&D?</p>
                <p className="text-dungeon-300 text-sm">
                    Si es tu primera vez jugando D&D 3.5, te recomendamos leer primero la{' '}
                    <Link href="/introduccion" className="text-blue-400 hover:text-blue-300 underline">
                        Introducción
                    </Link>
                    {' '}para entender los conceptos básicos con ejemplos simples. Esta página es una referencia técnica para consultas rápidas.
                </p>
            </div>


            {/* Ejemplo Visual de Tirada */}
            <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-dungeon-900 border border-blue-500/30 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Ejemplo: Atacar a un Goblin
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-3 text-lg mb-4">
                    <div className="bg-dungeon-800 border border-gold-500/50 rounded-lg px-4 py-3 text-center">
                        <div className="text-3xl font-mono text-gold-400">15</div>
                        <div className="text-xs text-dungeon-400">Tirada d20</div>
                    </div>
                    <span className="text-gold-400 text-3xl font-bold">+</span>
                    <div className="bg-dungeon-800 border border-green-500/50 rounded-lg px-4 py-3 text-center">
                        <div className="text-3xl font-mono text-green-400">+4</div>
                        <div className="text-xs text-dungeon-400">BAB</div>
                    </div>
                    <span className="text-gold-400 text-3xl font-bold">+</span>
                    <div className="bg-dungeon-800 border border-blue-500/50 rounded-lg px-4 py-3 text-center">
                        <div className="text-3xl font-mono text-blue-400">+3</div>
                        <div className="text-xs text-dungeon-400">Mod. Fuerza</div>
                    </div>
                    <span className="text-gold-400 text-3xl font-bold">=</span>
                    <div className="bg-green-900/30 border-2 border-green-500/50 rounded-lg px-4 py-3 text-center">
                        <div className="text-3xl font-mono text-green-400 font-bold">22</div>
                        <div className="text-xs text-green-400">Total</div>
                    </div>
                    <span className="text-2xl mx-2">vs</span>
                    <div className="bg-red-900/30 border border-red-500/50 rounded-lg px-4 py-3 text-center">
                        <div className="text-3xl font-mono text-red-400">15</div>
                        <div className="text-xs text-dungeon-400">CA Goblin</div>
                    </div>
                </div>
                <div className="text-center">
                    <span className="inline-flex items-center gap-2 bg-green-900/40 text-green-400 px-4 py-2 rounded-full font-bold">
                        <CheckCircle className="h-5 w-5" />
                        ¡IMPACTO! 22 ≥ 15 — Ahora tira daño
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
                {/* Glosario de Términos */}
                <Card className="card border-dungeon-500/30">
                    <details className="group">
                        <summary className="flex items-center justify-between p-6 cursor-pointer list-none bg-gradient-to-r from-dungeon-800/50 to-transparent rounded-t-lg hover:bg-dungeon-800/70 transition-colors">
                            <div className="flex items-center gap-3 text-2xl font-bold text-dungeon-100">
                                <BookOpen className="h-6 w-6 text-dungeon-200" />
                                Glosario de Términos Comunes
                            </div>
                            <ChevronDown className="h-6 w-6 text-dungeon-400 transition-transform group-open:rotate-180" />
                        </summary>
                        <CardContent className="p-6 border-t border-dungeon-700">
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                                {[
                                    { term: 'DG (Dados de Golpe)', def: 'Determinan tus Puntos de Golpe (PG) y reflejan tu nivel y resistencia.' },
                                    { term: 'BAB (Ataque Base)', def: 'Tu bonificador base al ataque, derivado de tu clase y nivel.' },
                                    { term: 'CA (Clase de Armadura)', def: 'La dificultad para ser golpeado en combate. 10 + bonificadores.' },
                                    { term: 'CD (Clase de Dificultad)', def: 'El número objetivo que debes igualar o superar en una tirada para tener éxito.' },
                                    { term: 'PG (Puntos de Golpe)', def: 'La cantidad de daño que puedes soportar antes de caer inconsciente o morir.' },
                                    { term: 'PJE (Personaje Jugador)', def: 'Un personaje controlado por un jugador.' },
                                    { term: 'PNJ (Personaje No Jugador)', def: 'Un personaje controlado por el Dungeon Master.' },
                                    { term: 'DM (Dungeon Master)', def: 'El narrador y árbitro del juego.' },
                                    { term: 'Iniciativa', def: 'Determina el orden de actuación en combate.' },
                                    { term: 'Asalto (Round)', def: 'Un periodo de tiempo de aproximadamente 6 segundos en el juego.' },
                                ].map((item) => (
                                    <div key={item.term} className="text-sm">
                                        <span className="font-bold text-gold-400 block mb-1">{item.term}</span>
                                        <span className="text-dungeon-300">{item.def}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </details>
                </Card>
                {/* La mecánica central */}
                <Card className="card border-gold-500/30">
                    <CardHeader className="bg-gradient-to-r from-gold-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Target className="h-6 w-6 text-gold-400" />
                            La mecánica central
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <p className="text-lg text-dungeon-200 mb-6">
                            El sistema utiliza un <span className="text-gold-400 font-bold">dado de veinte caras (d20)</span> como base para resolver todas las acciones importantes.
                        </p>

                        <div className="bg-gradient-to-r from-gold-900/20 to-purple-900/20 border-2 border-gold-500/50 rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-bold text-gold-300 mb-4">Fórmula básica:</h3>
                            <div className="flex items-center gap-3 flex-wrap justify-center text-lg font-mono">
                                <span className="bg-dungeon-800 px-4 py-2 rounded border border-gold-500/30">1d20</span>
                                <span className="text-gold-400 text-2xl">+</span>
                                <span className="bg-dungeon-800 px-4 py-2 rounded border border-blue-500/30">Modificadores</span>
                                <span className="text-gold-400 text-2xl">≥</span>
                                <span className="bg-dungeon-800 px-4 py-2 rounded border border-green-500/30">Número objetivo</span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 text-center">
                            <div className="bg-dungeon-900/50 p-4 rounded border-l-4 border-gold-500">
                                <div className="text-3xl font-bold text-gold-400 mb-2">1</div>
                                <div className="text-sm text-dungeon-300">Tira un d20</div>
                            </div>
                            <div className="bg-dungeon-900/50 p-4 rounded border-l-4 border-blue-500">
                                <div className="text-3xl font-bold text-blue-400 mb-2">2</div>
                                <div className="text-sm text-dungeon-300">Suma modificadores</div>
                            </div>
                            <div className="bg-dungeon-900/50 p-4 rounded border-l-4 border-green-500">
                                <div className="text-3xl font-bold text-green-400 mb-2">3</div>
                                <div className="text-sm text-dungeon-300">Compara con CD</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tipos de tiradas */}
                <Card className="card border-blue-500/30">
                    <CardHeader className="bg-gradient-to-r from-blue-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Dices className="h-6 w-6 text-blue-400" />
                            Tipos de tiradas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        {/* Tabla de tipos */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-blue-500/30">
                                        <th className="text-left p-3 text-blue-400">Tipo</th>
                                        <th className="text-left p-3 text-blue-400">Cuándo usar</th>
                                        <th className="text-left p-3 text-blue-400">Fórmula</th>
                                    </tr>
                                </thead>
                                <tbody className="text-dungeon-200">
                                    <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                        <td className="p-3">
                                            <span className="font-bold text-green-400">Prueba de habilidad</span>
                                        </td>
                                        <td className="p-3 text-sm">Usar una habilidad entrenada</td>
                                        <td className="p-3 font-mono text-sm">1d20 + rangos + mod característica</td>
                                    </tr>
                                    <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                        <td className="p-3">
                                            <span className="font-bold text-yellow-400">Prueba de característica</span>
                                        </td>
                                        <td className="p-3 text-sm">Sin habilidad aplicable</td>
                                        <td className="p-3 font-mono text-sm">1d20 + mod característica</td>
                                    </tr>
                                    <tr className="border-b border-dungeon-700 hover:bg-dungeon-900/30">
                                        <td className="p-3">
                                            <span className="font-bold text-red-400">Tirada de ataque</span>
                                        </td>
                                        <td className="p-3 text-sm">Golpear a un enemigo</td>
                                        <td className="p-3 font-mono text-sm">1d20 + BAB + mod + bonos</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Detalles de pruebas */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4" />
                                    Pruebas no enfrentadas
                                </h4>
                                <p className="text-sm text-dungeon-300">
                                    El DM establece una CD fija (típicamente 10-30). Ejemplo: escalar un muro (CD 15).
                                </p>
                            </div>
                            <div className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
                                    <Swords className="h-4 w-4" />
                                    Pruebas enfrentadas
                                </h4>
                                <p className="text-sm text-dungeon-300">
                                    Tu resultado vs. el resultado del oponente. Ejemplo: esconderse vs. avistar.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notación de dados y dados especiales */}
                <Card className="card border-purple-500/30">
                    <CardHeader className="bg-gradient-to-r from-purple-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Dices className="h-6 w-6 text-purple-400" />
                            Notación de dados
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4">
                        <div className="bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
                            <p className="text-dungeon-300 text-sm">
                                Para ver una explicación completa de los dados básicos (d4, d6, d8, d10, d12, d20) con ejemplos,
                                consulta la sección{' '}
                                <Link href="/introduccion#dados" className="text-blue-400 hover:text-blue-300 underline">
                                    Sistema de Dados en la Introducción
                                </Link>.
                            </p>
                        </div>

                        <div className="bg-dungeon-900/50 border border-dungeon-700 rounded-lg p-4">
                            <h4 className="font-bold text-gold-400 mb-3">Notación estándar:</h4>
                            <div className="grid md:grid-cols-3 gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <code className="bg-dungeon-800 px-2 py-1 rounded text-green-400">3d6</code>
                                    <span className="text-dungeon-300">= 3 dados de 6 caras</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <code className="bg-dungeon-800 px-2 py-1 rounded text-blue-400">2d8+5</code>
                                    <span className="text-dungeon-300">= 2 dados de 8 caras + 5</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <code className="bg-dungeon-800 px-2 py-1 rounded text-purple-400">1d20+7</code>
                                    <span className="text-dungeon-300">= 1 dado de 20 caras + 7</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-purple-400 mb-3">Dados especiales para tablas:</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                                    <div className="text-2xl font-mono font-bold text-cyan-400 mb-2">d%</div>
                                    <div className="text-sm text-dungeon-300">
                                        <strong>Dado percentil:</strong> Se usa para generar un número del 1 al 100.
                                        Útil para consultar tablas de tesoros, encuentros aleatorios, etc.
                                    </div>
                                </div>
                                <div className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-4">
                                    <div className="text-2xl font-mono font-bold text-pink-400 mb-2">d100</div>
                                    <div className="text-sm text-dungeon-300">
                                        <strong>Alternativa:</strong> Tira 2d10, uno para decenas y otro para unidades.
                                        Ejemplo: 40 + 7 = 47
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Reglas matemáticas */}
                <Card className="card border-dungeon-500/30">
                    <CardHeader className="bg-gradient-to-r from-dungeon-800/50 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Calculator className="h-6 w-6 text-dungeon-200" />
                            Reglas matemáticas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold text-dungeon-100 mb-2 flex items-center gap-2">
                                    <Divide className="h-4 w-4 text-dungeon-300" />
                                    Redondeo de fracciones
                                </h4>
                                <p className="text-sm text-dungeon-200 mb-2">
                                    En general, si obtienes una fracción, <strong>redondea siempre hacia abajo</strong>, incluso si es 0.5 o más.
                                </p>
                                <div className="bg-dungeon-900/30 p-3 rounded border-l-2 border-dungeon-500 text-xs text-dungeon-300">
                                    <strong>Excepción:</strong> Ciertas tiradas, como el daño y los puntos de golpe, tienen un mínimo de 1.
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-dungeon-100 mb-2 flex items-center gap-2">
                                    <XCircle className="h-4 w-4 text-dungeon-300" />
                                    Multiplicadores
                                </h4>
                                <p className="text-sm text-dungeon-200 mb-2">
                                    Cuando aplicas dos o más multiplicadores a una tirada (ej. un crítico x2 y una espada x2), se suman los multiplicadores, no se multiplican.
                                </p>
                                <div className="bg-dungeon-900/30 p-3 rounded border-l-2 border-dungeon-500 text-xs font-mono text-dungeon-300">
                                    x2 + x2 = x3<br />
                                    x2 + x3 = x4
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Cuándo tirar los dados */}
                <Card className="card border-cyan-500/30">
                    <CardHeader className="bg-gradient-to-r from-cyan-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Zap className="h-6 w-6 text-cyan-400" />
                            Cuándo tirar los dados
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                    <h4 className="font-bold text-green-400">TIRA dados cuando:</h4>
                                </div>
                                <ul className="space-y-2 text-dungeon-200">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-1">•</span>
                                        <span>El resultado es incierto</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-1">•</span>
                                        <span>El fracaso tiene consecuencias</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-1">•</span>
                                        <span>Estás en combate</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-1">•</span>
                                        <span>Hay presión de tiempo</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <XCircle className="h-5 w-5 text-red-400" />
                                    <h4 className="font-bold text-red-400">NO tires dados cuando:</h4>
                                </div>
                                <ul className="space-y-2 text-dungeon-200">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">•</span>
                                        <span>El éxito es automático</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">•</span>
                                        <span>El fracaso es imposible</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">•</span>
                                        <span>No hay consecuencias</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">•</span>
                                        <span>Solo requiere tiempo</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* El asalto de combate */}
                <Card className="card border-red-500/30">
                    <CardHeader className="bg-gradient-to-r from-red-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Swords className="h-6 w-6 text-red-400" />
                            El asalto de combate
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4">
                        <div className="bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded mb-4">
                            <p className="text-dungeon-300 text-sm">
                                Para una explicación completa del combate con ejemplos narrativos, consulta{' '}
                                <Link href="/introduccion#combate" className="text-blue-400 hover:text-blue-300 underline">
                                    Combate Básico en la Introducción
                                </Link>.
                            </p>
                        </div>

                        <div className="bg-dungeon-900/50 border border-dungeon-700 rounded-lg p-4">
                            <h4 className="font-bold text-red-400 mb-3">Mecánica técnica:</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex gap-2">
                                    <span className="text-gold-400 font-bold">1.</span>
                                    <span className="text-dungeon-200">Tirada de iniciativa (1d20 + modificador de Destreza)</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-gold-400 font-bold">2.</span>
                                    <span className="text-dungeon-200">Orden descendente de iniciativa (mayor a menor)</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-gold-400 font-bold">3.</span>
                                    <span className="text-dungeon-200">Cada asalto = 6 segundos de tiempo del juego</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-gold-400 font-bold">4.</span>
                                    <span className="text-dungeon-200">En tu turno: acción estándar + acción de movimiento (o 2 movimientos, o asalto completo)</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Críticos y daño */}
                <Card className="card border-red-500/30">
                    <CardHeader className="bg-gradient-to-r from-red-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Heart className="h-6 w-6 text-red-400" />
                            Críticos y daño
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4">
                        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                            <h4 className="font-bold text-red-400 mb-3">Golpe crítico:</h4>
                            <ul className="space-y-2 text-sm text-dungeon-200">
                                <li className="flex gap-2">
                                    <span className="text-yellow-400">•</span>
                                    <span>Natural 20 en tirada de ataque = amenaza de crítico</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-orange-400">•</span>
                                    <span>Confirmar crítico: segunda tirada de ataque vs CA</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-red-400">•</span>
                                    <span>Si confirma: multiplicador de daño (×2, ×3, o ×4 según arma)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-purple-400">•</span>
                                    <span>Rango de crítico: algunas armas critican en 19-20 o 18-20</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-dungeon-900/50 border border-dungeon-700 rounded-lg p-4">
                            <h4 className="font-bold text-gold-400 mb-3">Ejemplo técnico:</h4>
                            <p className="text-sm text-dungeon-300">
                                Espada larga (crítico 19-20/×2): Si sacas 19 o 20 natural, tiras de nuevo.
                                Si la segunda tirada impacta, multiplicas el daño base por 2.
                            </p>
                        </div>

                        <div className="bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
                            <p className="text-dungeon-300 text-sm">
                                Para explicación de Puntos de Golpe (PG) y estados (consciente, inconsciente, muriendo, muerto), consulta{' '}
                                <Link href="/introduccion#combate" className="text-blue-400 hover:text-blue-300 underline">
                                    la Introducción
                                </Link>.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Modificadores comunes */}
                <Card className="card border-gold-500/30">
                    <CardHeader className="bg-gradient-to-r from-gold-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Shield className="h-6 w-6 text-gold-400" />
                            Modificadores comunes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-4 hover:bg-red-900/20 transition-colors">
                                <div className="font-bold text-red-400 mb-1">Características</div>
                                <div className="text-sm text-dungeon-400">Fue, Des, Con, Int, Sab, Car</div>
                                <div className="text-xs text-dungeon-500 mt-1 font-mono">(Puntuación - 10) / 2</div>
                            </div>
                            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-4 hover:bg-green-900/20 transition-colors">
                                <div className="font-bold text-green-400 mb-1">Rangos de habilidad</div>
                                <div className="text-sm text-dungeon-400">Entrenamiento específico</div>
                            </div>
                            <div className="bg-blue-900/10 border border-blue-500/30 rounded-lg p-4 hover:bg-blue-900/20 transition-colors">
                                <div className="font-bold text-blue-400 mb-1">Dotes</div>
                                <div className="text-sm text-dungeon-400">Talentos especiales</div>
                            </div>
                            <div className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-900/20 transition-colors">
                                <div className="font-bold text-purple-400 mb-1">Objetos mágicos</div>
                                <div className="text-sm text-dungeon-400">Bonificadores de equipo</div>
                            </div>
                            <div className="bg-cyan-900/10 border border-cyan-500/30 rounded-lg p-4 hover:bg-cyan-900/20 transition-colors">
                                <div className="font-bold text-cyan-400 mb-1">Conjuros</div>
                                <div className="text-sm text-dungeon-400">Efectos temporales</div>
                            </div>
                            <div className="bg-yellow-900/10 border border-yellow-500/30 rounded-lg p-4 hover:bg-yellow-900/20 transition-colors">
                                <div className="font-bold text-yellow-400 mb-1">Circunstancias</div>
                                <div className="text-sm text-dungeon-400">Situacionales</div>
                            </div>
                        </div>
                        <div className="mt-6 bg-gold-900/20 border-2 border-gold-500/50 rounded-lg p-4 text-center">
                            <p className="text-gold-300 font-bold text-lg">
                                ⚠️ Regla importante: bonificadores del mismo tipo NO se acumulan
                            </p>
                            <p className="text-sm text-dungeon-300 mt-2">
                                Solo aplicas el bonificador mayor de cada tipo.
                            </p>
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
