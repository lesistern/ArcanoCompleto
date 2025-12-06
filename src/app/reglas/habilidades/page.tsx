import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Target, Book, Brain, Users, Clock, AlertTriangle, Zap, HelpingHand, BarChart3, GraduationCap, Coins, PauseCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata = {
    title: 'Habilidades - Reglas D&D 3.5',
    description: 'Reglas completas sobre habilidades: obtención, uso, rangos, pruebas y sinergias.',
};

export default function SkillsPage() {
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
                    <Target className="h-10 w-10 md:h-12 md:w-12 text-gold-400" />
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dungeon-100">
                        Habilidades
                    </h1>
                </div>
                <p className="text-lg text-dungeon-300 leading-relaxed max-w-4xl">
                    Las habilidades representan una variedad de capacidades. A medida que un personaje avanza de nivel, mejora en el uso de algunas o todas sus habilidades.
                </p>
            </div>

            {/* TL;DR - Resumen Rápido */}
            <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/20 to-dungeon-900 border-2 border-green-500/40 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500/20 rounded-full p-2">
                        <Zap className="h-6 w-6 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-400">TL;DR - Habilidades en 30 Segundos</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 hover:bg-blue-900/30 transition-colors">
                        <Target className="h-8 w-8 text-blue-400 mb-2" />
                        <div className="font-bold text-blue-400 mb-1">Tirada = d20 + mod</div>
                        <div className="text-dungeon-400 text-xs">
                            Mod = rangos + caract + otros. Iguala o supera la CD
                        </div>
                    </div>
                    <div className="bg-gold-900/20 border border-gold-500/30 rounded-lg p-4 hover:bg-gold-900/30 transition-colors">
                        <GraduationCap className="h-8 w-8 text-gold-400 mb-2" />
                        <div className="font-bold text-gold-400 mb-1">Puntos por nivel</div>
                        <div className="text-dungeon-400 text-xs">
                            Base de clase + mod Int. Nivel 1 = (base+Int) × 4
                        </div>
                    </div>
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-900/30 transition-colors">
                        <Coins className="h-8 w-8 text-purple-400 mb-2" />
                        <div className="font-bold text-purple-400 mb-1">Coste de rangos</div>
                        <div className="text-dungeon-400 text-xs">
                            Clase: 1 pto = 1 rango | Transclásea: 1 pto = ½ rango
                        </div>
                    </div>
                    <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4 hover:bg-cyan-900/30 transition-colors">
                        <PauseCircle className="h-8 w-8 text-cyan-400 mb-2" />
                        <div className="font-bold text-cyan-400 mb-1">Elegir 10 / 20</div>
                        <div className="text-dungeon-400 text-xs">
                            Sin estrés = asume 10. Con tiempo = asume 20
                        </div>
                    </div>
                </div>

                {/* Ejemplo Visual */}
                <div className="mt-6 bg-dungeon-950/50 border border-dungeon-700 rounded-lg p-4">
                    <div className="text-sm text-dungeon-400 mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>Ejemplo: Pícaro nivel 3 con Trepar (habilidad de clase):</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="bg-dungeon-800 px-3 py-1 rounded font-mono">d20</span>
                        <span className="text-green-400 font-bold">+</span>
                        <span className="bg-purple-900/40 border border-purple-500/30 px-3 py-1 rounded">6 <span className="text-dungeon-500 text-xs">(rangos)</span></span>
                        <span className="text-green-400 font-bold">+</span>
                        <span className="bg-blue-900/40 border border-blue-500/30 px-3 py-1 rounded">2 <span className="text-dungeon-500 text-xs">(Fue)</span></span>
                        <span className="text-dungeon-500">=</span>
                        <span className="bg-green-900/40 border border-green-500/50 px-4 py-1 rounded font-bold text-green-400">d20 + 8</span>
                    </div>
                    <p className="text-xs text-dungeon-500 mt-2">Rango máximo a nivel 3 = 3+3 = 6. Con +8, supera CD 15 con un 7 o más.</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Resumen y Obtención */}
                <Card className="card border-gold-500/30">
                    <CardHeader className="bg-gradient-to-r from-gold-900/20 to-transparent pb-3">
                        <div className="flex items-center gap-3">
                            <Book className="h-6 w-6 text-gold-400" />
                            <CardTitle className="text-xl text-dungeon-100">
                                Obtención de Habilidades
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-dungeon-100 mb-2">Puntos de Habilidad</h3>
                                <p className="text-dungeon-300 text-sm mb-4">
                                    Cada nivel, obtienes puntos según tu clase + modificador de Inteligencia.
                                    <br />
                                    <strong>A nivel 1:</strong> (Puntos base + mod Int) × 4.
                                    <br />
                                    <em>Los humanos añaden +4 puntos extra a nivel 1 y +1 en cada nivel posterior.</em>
                                </p>

                                <div className="bg-dungeon-900/50 p-3 rounded border border-dungeon-700 text-xs text-dungeon-300 space-y-2">
                                    <p><strong className="text-gold-400">8 + Int:</strong> Pícaro, Explorador (variante).</p>
                                    <p><strong className="text-gold-400">6 + Int:</strong> Bardo, Explorador.</p>
                                    <p><strong className="text-gold-400">4 + Int:</strong> Bárbaro, Druida, Monje.</p>
                                    <p><strong className="text-gold-400">2 + Int:</strong> Clérigo, Guerrero, Paladín, Hechicero, Mago.</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-dungeon-100 mb-2">Rangos y Coste</h3>
                                <ul className="space-y-2 text-sm text-dungeon-300 mb-4">
                                    <li className="flex items-start gap-2">
                                        <span className="text-gold-400">•</span>
                                        <span><strong>Habilidad de Clase:</strong> 1 punto = 1 rango.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-gold-400">•</span>
                                        <span><strong>Habilidad Transclásea:</strong> 1 punto = ½ rango.</span>
                                    </li>
                                </ul>

                                <h3 className="font-bold text-dungeon-100 mb-2">Límite de Rangos</h3>
                                <div className="bg-dungeon-900/50 p-3 rounded border border-dungeon-700">
                                    <p className="text-sm text-dungeon-200 mb-1">
                                        <strong>Habilidad de Clase:</strong> Nivel + 3
                                    </p>
                                    <p className="text-sm text-dungeon-200">
                                        <strong>Transclásea:</strong> (Nivel + 3) / 2
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Uso de Habilidades */}
                <Card className="card border-blue-500/30">
                    <CardHeader className="bg-gradient-to-r from-blue-900/20 to-transparent pb-3">
                        <div className="flex items-center gap-3">
                            <Zap className="h-6 w-6 text-blue-400" />
                            <CardTitle className="text-xl text-dungeon-100">
                                Uso de Habilidades
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-1">
                                <h3 className="font-bold text-dungeon-100 mb-3">La Prueba de Habilidad</h3>
                                <div className="bg-dungeon-900/50 p-4 rounded text-center mb-4 border border-blue-500/20">
                                    <span className="text-2xl font-bold text-blue-400">1d20 + Modificador</span>
                                </div>
                                <p className="text-dungeon-300 text-sm mb-4">
                                    Debes igualar o superar la <strong>Clase de Dificultad (CD)</strong>.
                                    <br />
                                    El modificador incluye: <strong>Rangos + Característica + Otros</strong> (raciales, dotes, armadura).
                                </p>
                                <div className="text-xs text-dungeon-400 space-y-1">
                                    <p>• <strong>Tiempo:</strong> Usar una habilidad suele ser una <strong>Acción Estándar</strong>, pero algunas son parte del movimiento o toman más tiempo.</p>
                                    <p>• <strong>Reintentar:</strong> Usualmente puedes probar de nuevo si fallas, a menos que el fallo tenga consecuencias (ej. trepar y caer).</p>
                                </div>
                            </div>
                            <div className="flex-1 space-y-3">
                                <div className="p-3 rounded bg-blue-900/10 border border-blue-500/20">
                                    <h4 className="font-bold text-blue-400 text-sm mb-1">Sin Entrenar</h4>
                                    <p className="text-xs text-dungeon-300">
                                        Usas solo tu mod. de característica. Algunas habilidades (ej. Abrir Cerraduras) no se pueden usar sin entrenamiento.
                                    </p>
                                </div>
                                <div className="p-3 rounded bg-blue-900/10 border border-blue-500/20">
                                    <h4 className="font-bold text-blue-400 text-sm mb-1">Elegir 10 (Take 10)</h4>
                                    <p className="text-xs text-dungeon-300">
                                        Si no hay peligro ni distracciones, asume que sacaste un 10. Útil para tareas rutinarias.
                                    </p>
                                </div>
                                <div className="p-3 rounded bg-blue-900/10 border border-blue-500/20">
                                    <h4 className="font-bold text-blue-400 text-sm mb-1">Elegir 20 (Take 20)</h4>
                                    <p className="text-xs text-dungeon-300">
                                        Tarda 20 veces más. Asume que fallas muchas veces hasta que te sale perfecto (un 20). No se puede usar si fallar tiene consecuencias.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Ejemplo Práctico */}
                <Card className="card border-dungeon-600 bg-dungeon-900/20">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            <CardTitle className="text-lg text-dungeon-100">
                                Ejemplo Práctico
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-dungeon-200 text-sm mb-4">
                            <strong>Situación:</strong> El pícaro <em>Gareth</em> intenta trepar un muro de piedra rugosa.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 text-sm bg-dungeon-900/50 p-4 rounded border border-dungeon-700">
                            <div className="flex-1">
                                <p className="text-dungeon-400 text-xs uppercase tracking-wider mb-1">Datos de Gareth</p>
                                <ul className="space-y-1">
                                    <li>• <strong>Fuerza:</strong> 14 (+2)</li>
                                    <li>• <strong>Rangos en Trepar:</strong> 4</li>
                                    <li>• <strong>Penalizador Armadura:</strong> -1 (Cuero tachonado)</li>
                                    <li className="text-blue-400 font-bold mt-2">Modificador Total: +5</li>
                                </ul>
                            </div>
                            <div className="flex items-center justify-center">
                                <ArrowLeft className="hidden md:block h-6 w-6 text-dungeon-600 rotate-180" />
                            </div>
                            <div className="flex-1">
                                <p className="text-dungeon-400 text-xs uppercase tracking-wider mb-1">La Tirada</p>
                                <p className="mb-2">Gareth tira 1d20 y saca un <strong>12</strong>.</p>
                                <p className="font-mono text-lg text-dungeon-100 bg-dungeon-800 p-2 rounded text-center">
                                    12 (dado) + 5 (mod) = <strong>17</strong>
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <ArrowLeft className="hidden md:block h-6 w-6 text-dungeon-600 rotate-180" />
                            </div>
                            <div className="flex-1">
                                <p className="text-dungeon-400 text-xs uppercase tracking-wider mb-1">Resultado</p>
                                <p className="mb-1">La CD del muro es <strong>15</strong>.</p>
                                <p className="text-green-400 font-bold">¡Éxito!</p>
                                <p className="text-xs text-dungeon-300 mt-1">Gareth trepa el muro sin problemas.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tablas de Referencia */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Ejemplos de CD */}
                    <Card className="card border-dungeon-700">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-dungeon-100">Ejemplos de Dificultad (CD)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-dungeon-900/50 text-dungeon-200">
                                    <tr>
                                        <th className="p-3">Dificultad (CD)</th>
                                        <th className="p-3">Ejemplo</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dungeon-800 text-dungeon-300">
                                    <tr><td className="p-3">Muy fácil (0)</td><td className="p-3">Notar algo grande a simple vista</td></tr>
                                    <tr><td className="p-3">Fácil (5)</td><td className="p-3">Trepar una cuerda con nudos</td></tr>
                                    <tr><td className="p-3">Normal (10)</td><td className="p-3">Oír un guardia acercándose</td></tr>
                                    <tr><td className="p-3">Difícil (15)</td><td className="p-3">Sabotear una rueda de carro</td></tr>
                                    <tr><td className="p-3">Desafiante (20)</td><td className="p-3">Nadar en aguas tormentosas</td></tr>
                                    <tr><td className="p-3">Formidable (25)</td><td className="p-3">Abrir una cerradura normal</td></tr>
                                    <tr><td className="p-3">Heroica (30)</td><td className="p-3">Saltar un abismo de 30 pies</td></tr>
                                    <tr><td className="p-3">Casi imposible (40)</td><td className="p-3">Rastrear orcos tras lluvia intensa</td></tr>
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>

                    {/* Pruebas Opuestas */}
                    <Card className="card border-dungeon-700">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-dungeon-100">Pruebas Opuestas</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-dungeon-900/50 text-dungeon-200">
                                    <tr>
                                        <th className="p-3">Acción</th>
                                        <th className="p-3">Habilidad vs. Oponente</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dungeon-800 text-dungeon-300">
                                    <tr><td className="p-3">Engañar a alguien</td><td className="p-3">Engañar vs. Averiguar Intenciones</td></tr>
                                    <tr><td className="p-3">Esconderse</td><td className="p-3">Esconderse vs. Avistar</td></tr>
                                    <tr><td className="p-3">Moverse en silencio</td><td className="p-3">Moverse Sigilosamente vs. Escuchar</td></tr>
                                    <tr><td className="p-3">Robar bolsa</td><td className="p-3">Juego de Manos vs. Avistar</td></tr>
                                    <tr><td className="p-3">Falsificar mapa</td><td className="p-3">Falsificar vs. Falsificar</td></tr>
                                    <tr><td className="p-3">Atar prisionero</td><td className="p-3">Uso de Cuerdas vs. Escapismo</td></tr>
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>

                {/* Cooperación y Sinergia */}
                <Card className="card border-purple-500/30">
                    <CardHeader className="bg-gradient-to-r from-purple-900/20 to-transparent pb-3">
                        <div className="flex items-center gap-3">
                            <HelpingHand className="h-6 w-6 text-purple-400" />
                            <CardTitle className="text-xl text-dungeon-100">
                                Cooperación y Sinergia
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-dungeon-100 mb-2">Ayudar a Otro</h3>
                                <p className="text-dungeon-300 text-sm mb-4">
                                    Puedes ayudar a otro personaje superando una prueba contra <strong>CD 10</strong>. Si tienes éxito, otorgas un bonificador de <strong>+2</strong> a su prueba.
                                </p>
                                <p className="text-xs text-dungeon-400 italic">
                                    Nota: No puedes elegir 10 cuando ayudas a otro.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-dungeon-100 mb-2">Sinergia</h3>
                                <p className="text-dungeon-300 text-sm mb-4">
                                    Tener 5 o más rangos en una habilidad puede darte un bonificador de <strong>+2</strong> en otra habilidad relacionada.
                                </p>
                                <p className="text-xs text-dungeon-400">
                                    Ejemplo: 5 rangos en <em>Acrobacias</em> otorgan +2 a <em>Equilibrio</em> y <em>Saltar</em>.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pruebas de Característica */}
                <Card className="card border-green-500/30">
                    <CardHeader className="bg-gradient-to-r from-green-900/20 to-transparent pb-3">
                        <div className="flex items-center gap-3">
                            <Brain className="h-6 w-6 text-green-400" />
                            <CardTitle className="text-xl text-dungeon-100">
                                Pruebas de Característica
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-dungeon-300 text-sm mb-4">
                            Se usan cuando ninguna habilidad específica aplica. Es simplemente <strong>1d20 + Modificador de Característica</strong>.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-dungeon-300">
                            <div className="p-2 bg-dungeon-900/30 rounded">
                                <strong className="text-green-400 block mb-1">Fuerza</strong>
                                Romper una puerta atascada
                            </div>
                            <div className="p-2 bg-dungeon-900/30 rounded">
                                <strong className="text-green-400 block mb-1">Destreza</strong>
                                Enhebrar una aguja
                            </div>
                            <div className="p-2 bg-dungeon-900/30 rounded">
                                <strong className="text-green-400 block mb-1">Constitución</strong>
                                Aguantar la respiración
                            </div>
                            <div className="p-2 bg-dungeon-900/30 rounded">
                                <strong className="text-green-400 block mb-1">Inteligencia</strong>
                                Navegar un laberinto
                            </div>
                            <div className="p-2 bg-dungeon-900/30 rounded">
                                <strong className="text-green-400 block mb-1">Sabiduría</strong>
                                Reconocer a un extraño
                            </div>
                            <div className="p-2 bg-dungeon-900/30 rounded">
                                <strong className="text-green-400 block mb-1">Carisma</strong>
                                Llamar la atención en una multitud
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Formato de Descripciones */}
                <Card className="card border-dungeon-600">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                            <Book className="h-6 w-6 text-dungeon-300" />
                            <CardTitle className="text-xl text-dungeon-100">
                                Formato de las Habilidades
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <p className="text-dungeon-300 text-sm">
                            Las descripciones de habilidades siguen un formato estándar que incluye la siguiente información:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-dungeon-100 text-sm mb-1">Línea de Información</h4>
                                    <ul className="list-disc pl-4 space-y-1 text-xs text-dungeon-300">
                                        <li><strong>Característica Clave:</strong> La característica cuyo modificador se suma a la prueba.</li>
                                        <li><strong>Solo Entrenada:</strong> Si aparece, necesitas al menos 1 rango para usarla.</li>
                                        <li><strong>Penalizador por Armadura:</strong> Si aparece, la armadura estorba (se aplica el penalizador de armadura a la prueba).</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-dungeon-100 text-sm mb-1">Prueba</h4>
                                    <p className="text-xs text-dungeon-300">
                                        Qué puedes lograr con una prueba exitosa y cuál es la CD típica.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-dungeon-100 text-sm mb-1">Acción</h4>
                                    <p className="text-xs text-dungeon-300">
                                        El tipo de acción (estándar, movimiento, etc.) o tiempo que requiere el uso de la habilidad.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-dungeon-100 text-sm mb-1">Reintentar</h4>
                                    <p className="text-xs text-dungeon-300">
                                        Si puedes volver a intentar la prueba tras fallar, o si el fallo tiene consecuencias.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-dungeon-100 text-sm mb-1">Especial</h4>
                                    <p className="text-xs text-dungeon-300">
                                        Bonificadores raciales, efectos de dotes, o reglas específicas para ciertas clases.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-dungeon-100 text-sm mb-1">Sinergia</h4>
                                    <p className="text-xs text-dungeon-300">
                                        Si tener 5+ rangos en esta habilidad otorga bonificadores a otras habilidades.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-dungeon-100 text-sm mb-1">Sin Entrenar</h4>
                                    <p className="text-xs text-dungeon-300">
                                        Qué puede (y qué no puede) hacer un personaje con 0 rangos en la habilidad.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CTA - Lista completa de habilidades */}
                <div className="bg-gradient-to-r from-gold-900/30 via-amber-900/20 to-dungeon-900 border-2 border-gold-500/40 rounded-xl p-6 text-center">
                    <h3 className="text-xl font-bold text-gold-400 mb-2">¿Quieres ver todas las habilidades?</h3>
                    <p className="text-dungeon-300 text-sm mb-4">
                        Consulta la lista completa de las 43 habilidades de D&D 3.5 con descripciones detalladas, CDs y ejemplos.
                    </p>
                    <Link href="/habilidades">
                        <Button className="bg-gold-600 hover:bg-gold-500 text-dungeon-950">
                            <Target className="h-4 w-4 mr-2" />
                            Ver Lista Completa de Habilidades
                            <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
