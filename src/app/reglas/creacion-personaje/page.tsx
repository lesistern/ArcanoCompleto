import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Users, Dices, PersonStanding, Palette, Wrench, Sword, Shield, Target, BookOpen, Sparkles, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata = {
    title: 'Creación de Personaje - Compendio Arcano',
    description: 'Guía completa paso a paso para crear tu personaje de D&D 3.5: características, raza, clase, habilidades y más.',
};

export default function CreacionPersonajePage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl mb-12">
                <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/90 to-gray-950/50"></div>

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Link href="/reglas">
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200 pl-0">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver a Reglas
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-100 leading-tight">
                            Creacion de Personaje
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Guia paso a paso para crear tu aventurero desde cero.
                        </p>
                    </div>

                    <div className="p-6 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
                        <Users className="h-12 w-12 text-blue-500" />
                    </div>
                </div>
            </div>

            {/* TL;DR - Resumen Rápido */}
            <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/20 to-gray-900 border-2 border-green-500/40 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500/20 rounded-full p-2">
                        <Sparkles className="h-6 w-6 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-400">TL;DR - 9 Pasos en 1 Minuto</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="bg-gold-500/20 rounded-full w-6 h-6 flex items-center justify-center text-gold-400 font-bold text-xs">1</span>
                            <span className="text-gray-200">Tira <strong className="text-gold-400">4d6 (descarta 1)</strong> × 6</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-green-500/20 rounded-full w-6 h-6 flex items-center justify-center text-green-400 font-bold text-xs">2</span>
                            <span className="text-gray-200">Elige <strong className="text-green-400">raza</strong> (modificadores)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-purple-500/20 rounded-full w-6 h-6 flex items-center justify-center text-purple-400 font-bold text-xs">3</span>
                            <span className="text-gray-200">Elige <strong className="text-purple-400">clase</strong> (rol en equipo)</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="bg-cyan-500/20 rounded-full w-6 h-6 flex items-center justify-center text-cyan-400 font-bold text-xs">4</span>
                            <span className="text-gray-200">Asigna puntuaciones a <strong className="text-cyan-400">características</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-orange-500/20 rounded-full w-6 h-6 flex items-center justify-center text-orange-400 font-bold text-xs">5</span>
                            <span className="text-gray-200">Gasta puntos de <strong className="text-orange-400">habilidad</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-pink-500/20 rounded-full w-6 h-6 flex items-center justify-center text-pink-400 font-bold text-xs">6</span>
                            <span className="text-gray-200">Elige <strong className="text-pink-400">1 dote</strong> gratis</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="bg-red-500/20 rounded-full w-6 h-6 flex items-center justify-center text-red-400 font-bold text-xs">7</span>
                            <span className="text-gray-200">Calcula <strong className="text-red-400">PG, CA, BAB</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-blue-500/20 rounded-full w-6 h-6 flex items-center justify-center text-blue-400 font-bold text-xs">8</span>
                            <span className="text-gray-200">Elige <strong className="text-blue-400">equipo</strong> inicial</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-yellow-500/20 rounded-full w-6 h-6 flex items-center justify-center text-yellow-400 font-bold text-xs">9</span>
                            <span className="text-gray-200">Dale <strong className="text-yellow-400">nombre</strong> y personalidad</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
                {/* Intro */}
                <Card className="card border-blue-500/30">
                    <CardHeader className="bg-gradient-to-r from-blue-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Sparkles className="h-6 w-6 text-blue-400" />
                            Antes de empezar
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <p className="text-lg text-gray-200 mb-4">
                            Crear tu primer personaje puede parecer abrumador, pero este proceso te guiará a través de cada paso.
                        </p>
                        <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
                            <p className="text-gray-200">
                                <strong className="text-blue-400">Tip:</strong> piensa en qué tipo de aventurero quieres interpretar antes de tirar dados. ¿Un guerrero valiente? ¿Un mago estudioso? ¿Un pícaro astuto? Este concepto te ayudará a tomar decisiones.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Paso 1: Características */}
                <Card className="card border-gold-500/30">
                    <CardHeader className="bg-gradient-to-r from-gold-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <div className="bg-gold-500/20 rounded-full w-10 h-10 flex items-center justify-center">
                                <span className="text-gold-400 font-bold text-xl">1</span>
                            </div>
                            Generar puntuaciones de características
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <p className="text-gray-200">
                            Tus características representan las capacidades innatas de tu personaje. El método estándar es:
                        </p>

                        <div className="grid md:grid-cols-5 gap-3 text-center">
                            <div className="bg-gold-900/20 border border-gold-500/30 rounded-lg p-3 hover:bg-gold-900/30 transition-colors">
                                <div className="text-2xl font-bold text-gold-400 mb-1">1</div>
                                <div className="text-xs text-gray-300">Tira 4d6</div>
                            </div>
                            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 hover:bg-blue-900/30 transition-colors">
                                <div className="text-2xl font-bold text-blue-400 mb-1">2</div>
                                <div className="text-xs text-gray-300">Descarta el más bajo</div>
                            </div>
                            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 hover:bg-green-900/30 transition-colors">
                                <div className="text-2xl font-bold text-green-400 mb-1">3</div>
                                <div className="text-xs text-gray-300">Suma los 3 restantes</div>
                            </div>
                            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 hover:bg-purple-900/30 transition-colors">
                                <div className="text-2xl font-bold text-purple-400 mb-1">4</div>
                                <div className="text-xs text-gray-300">Repite 6 veces</div>
                            </div>
                            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 hover:bg-red-900/30 transition-colors">
                                <div className="text-2xl font-bold text-red-400 mb-1">5</div>
                                <div className="text-xs text-gray-300">Asigna a gusto</div>
                            </div>
                        </div>

                        <div className="bg-gold-900/20 border-l-4 border-gold-500 p-4 rounded">
                            <p className="font-mono text-gold-200">
                                <strong className="text-gold-400">Ejemplo:</strong> tiras 5, 4, 4, 1 → descartas el 1 → <span className="text-green-400">total: 13</span>
                            </p>
                        </div>

                        <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-4">
                            <h4 className="font-bold text-red-400 mb-2">Re-tirar resultados muy bajos:</h4>
                            <ul className="space-y-1 text-sm text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 mt-1">•</span>
                                    <span>Total de modificadores es 0 o negativo</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 mt-1">•</span>
                                    <span>Tu puntuación más alta es 13 o menos</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Paso 2: Elegir Raza */}
                <Card className="card border-green-500/30">
                    <CardHeader className="bg-gradient-to-r from-green-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <div className="bg-green-500/20 rounded-full w-10 h-10 flex items-center justify-center">
                                <span className="text-green-400 font-bold text-xl">2</span>
                            </div>
                            Elegir raza
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-green-500/30">
                                        <th className="text-left p-3 text-green-400">Raza</th>
                                        <th className="text-left p-3 text-green-400">Modificadores</th>
                                        <th className="text-left p-3 text-green-400">Ventajas clave</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-200 text-sm">
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3 font-bold text-gold-400">Humanos</td>
                                        <td className="p-3">—</td>
                                        <td className="p-3">+1 dote, +4 puntos habilidad</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3 font-bold text-blue-400">Enanos</td>
                                        <td className="p-3">+2 Con, -2 Car</td>
                                        <td className="p-3">Visión oscuridad, resistentes</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3 font-bold text-green-400">Elfos</td>
                                        <td className="p-3">+2 Des, -2 Con</td>
                                        <td className="p-3">Inmunes sueño mágico, sentidos agudos</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3 font-bold text-yellow-400">Medianos</td>
                                        <td className="p-3">+2 Des, -2 Fue</td>
                                        <td className="p-3">Pequeños, sigilosos</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3 font-bold text-purple-400">Gnomos</td>
                                        <td className="p-3">+2 Con, -2 Fue</td>
                                        <td className="p-3">Pequeños, vs gigantes</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3 font-bold text-cyan-400">Semielfos</td>
                                        <td className="p-3">—</td>
                                        <td className="p-3">Equilibrados, visión oscuridad</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3 font-bold text-red-400">Semiorcos</td>
                                        <td className="p-3">+2 Fue, -2 Int, -2 Car</td>
                                        <td className="p-3">Fuertes, visión oscuridad</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Paso 3: Elegir Clase */}
                <Card className="card border-purple-500/30">
                    <CardHeader className="bg-gradient-to-r from-purple-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <div className="bg-purple-500/20 rounded-full w-10 h-10 flex items-center justify-center">
                                <span className="text-purple-400 font-bold text-xl">3</span>
                            </div>
                            Elegir clase
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        {/* Marciales */}
                        <div>
                            <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                                <Sword className="h-5 w-5" />
                                Clases marciales
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="bg-red-900/10 border border-red-500/30 rounded p-3">
                                    <div className="font-bold text-red-400">Bárbaro</div>
                                    <div className="text-xs text-gray-400">Guerrero salvaje • d12 pg</div>
                                </div>
                                <div className="bg-red-900/10 border border-red-500/30 rounded p-3">
                                    <div className="font-bold text-red-400">Guerrero</div>
                                    <div className="text-xs text-gray-400">Maestro armas • d10 pg</div>
                                </div>
                                <div className="bg-red-900/10 border border-red-500/30 rounded p-3">
                                    <div className="font-bold text-red-400">Paladín</div>
                                    <div className="text-xs text-gray-400">Campeón sagrado • d10 pg</div>
                                </div>
                                <div className="bg-red-900/10 border border-red-500/30 rounded p-3">
                                    <div className="font-bold text-red-400">Explorador</div>
                                    <div className="text-xs text-gray-400">Rastreador arquero • d8 pg</div>
                                </div>
                            </div>
                        </div>

                        {/* Furtivas */}
                        <div>
                            <h4 className="font-bold text-yellow-400 mb-3 flex items-center gap-2">
                                <Target className="h-5 w-5" />
                                Clases furtivas
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="bg-yellow-900/10 border border-yellow-500/30 rounded p-3">
                                    <div className="font-bold text-yellow-400">Pícaro</div>
                                    <div className="text-xs text-gray-400">Experto habilidades • d6 pg</div>
                                </div>
                                <div className="bg-yellow-900/10 border border-yellow-500/30 rounded p-3">
                                    <div className="font-bold text-yellow-400">Monje</div>
                                    <div className="text-xs text-gray-400">Artista marcial • d8 pg</div>
                                </div>
                            </div>
                        </div>

                        {/* Mágicas */}
                        <div>
                            <h4 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
                                <Sparkles className="h-5 w-5" />
                                Clases mágicas
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="bg-blue-900/10 border border-blue-500/30 rounded p-3">
                                    <div className="font-bold text-blue-400">Clérigo</div>
                                    <div className="text-xs text-gray-400">Conjuros divinos • d8 pg</div>
                                </div>
                                <div className="bg-blue-900/10 border border-blue-500/30 rounded p-3">
                                    <div className="font-bold text-blue-400">Druida</div>
                                    <div className="text-xs text-gray-400">Mago naturaleza • d8 pg</div>
                                </div>
                                <div className="bg-blue-900/10 border border-blue-500/30 rounded p-3">
                                    <div className="font-bold text-blue-400">Mago</div>
                                    <div className="text-xs text-gray-400">Arcano preparado • d4 pg</div>
                                </div>
                                <div className="bg-blue-900/10 border border-blue-500/30 rounded p-3">
                                    <div className="font-bold text-blue-400">Hechicero</div>
                                    <div className="text-xs text-gray-400">Arcano espontáneo • d4 pg</div>
                                </div>
                                <div className="bg-blue-900/10 border border-blue-500/30 rounded p-3">
                                    <div className="font-bold text-blue-400">Bardo</div>
                                    <div className="text-xs text-gray-400">Músico mágico • d6 pg</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Paso 4: Asignar Características */}
                <Card className="card border-cyan-500/30">
                    <CardHeader className="bg-gradient-to-r from-cyan-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <div className="bg-cyan-500/20 rounded-full w-10 h-10 flex items-center justify-center">
                                <span className="text-cyan-400 font-bold text-xl">4</span>
                            </div>
                            Asignar puntuaciones
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="overflow-x-auto mb-6">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-cyan-500/30">
                                        <th className="text-left p-3 text-cyan-400">Clase</th>
                                        <th className="text-left p-3 text-cyan-400">Característica principal</th>
                                        <th className="text-left p-3 text-cyan-400">Secundaria</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-200 text-sm">
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3">Bárbaro</td>
                                        <td className="p-3 text-red-400 font-bold">Fuerza</td>
                                        <td className="p-3">Constitución</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3">Bardo</td>
                                        <td className="p-3 text-pink-400 font-bold">Carisma</td>
                                        <td className="p-3">Destreza</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3">Clérigo</td>
                                        <td className="p-3 text-cyan-400 font-bold">Sabiduría</td>
                                        <td className="p-3">Constitución</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3">Druida</td>
                                        <td className="p-3 text-cyan-400 font-bold">Sabiduría</td>
                                        <td className="p-3">Constitución</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3">Guerrero</td>
                                        <td className="p-3 text-red-400 font-bold">Fuerza/Destreza</td>
                                        <td className="p-3">Constitución</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3">Hechicero</td>
                                        <td className="p-3 text-pink-400 font-bold">Carisma</td>
                                        <td className="p-3">Constitución</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3">Mago</td>
                                        <td className="p-3 text-blue-400 font-bold">Inteligencia</td>
                                        <td className="p-3">Destreza</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3">Monje</td>
                                        <td className="p-3 text-cyan-400 font-bold">Sabiduría</td>
                                        <td className="p-3">Destreza</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3">Explorador</td>
                                        <td className="p-3 text-green-400 font-bold">Destreza</td>
                                        <td className="p-3">Sabiduría</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3">Paladín</td>
                                        <td className="p-3 text-pink-400 font-bold">Carisma</td>
                                        <td className="p-3">Fuerza</td>
                                    </tr>
                                    <tr className="border-b border-gray-700 hover:bg-gray-900/30">
                                        <td className="p-3">Pícaro</td>
                                        <td className="p-3 text-green-400 font-bold">Destreza</td>
                                        <td className="p-3">Inteligencia</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-cyan-900/20 border-l-4 border-cyan-500 p-4 rounded">
                            <p className="text-sm text-gray-200">
                                <strong className="text-cyan-400">Consejo:</strong> coloca tu puntuación más alta en la característica principal de tu clase para mejores resultados.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Pasos 5-7 Compactos */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="card border-orange-500/30">
                        <CardHeader className="bg-gradient-to-r from-orange-900/20 to-transparent pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <div className="bg-orange-500/20 rounded-full w-8 h-8 flex items-center justify-center">
                                    <span className="text-orange-400 font-bold">5</span>
                                </div>
                                Habilidades
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-sm text-gray-300 mb-3">
                                A nivel 1:
                            </p>
                            <div className="bg-orange-900/20 rounded p-3 text-center mb-3">
                                <code className="text-orange-400 font-bold">
                                    (Base + Int) × 4
                                </code>
                            </div>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Habilidad de clase: 1 punto = 1 rango</li>
                                <li>• Habilidad de otra clase: 2 puntos = 1 rango</li>
                                <li>• Máximo: 4 rangos a nivel 1</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="card border-pink-500/30">
                        <CardHeader className="bg-gradient-to-r from-pink-900/20 to-transparent pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <div className="bg-pink-500/20 rounded-full w-8 h-8 flex items-center justify-center">
                                    <span className="text-pink-400 font-bold">6</span>
                                </div>
                                Dotes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-sm text-gray-300 mb-3">
                                Todas las clases:
                            </p>
                            <div className="bg-pink-900/20 rounded p-3 text-center mb-3">
                                <span className="text-pink-400 font-bold text-lg">1 dote gratis</span>
                            </div>
                            <p className="text-xs text-gray-400">
                                Los humanos obtienen +1 dote adicional
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="card border-red-500/30">
                        <CardHeader className="bg-gradient-to-r from-red-900/20 to-transparent pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <div className="bg-red-500/20 rounded-full w-8 h-8 flex items-center justify-center">
                                    <span className="text-red-400 font-bold">7</span>
                                </div>
                                Combate
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 text-xs space-y-2">
                            <div className="flex justify-between p-2 bg-gray-900/50 rounded">
                                <span className="text-gray-400">PG:</span>
                                <span className="text-green-400 font-mono">DG max + Con</span>
                            </div>
                            <div className="flex justify-between p-2 bg-gray-900/50 rounded">
                                <span className="text-gray-400">CA:</span>
                                <span className="text-blue-400 font-mono">10 + arm + Des</span>
                            </div>
                            <div className="flex justify-between p-2 bg-gray-900/50 rounded">
                                <span className="text-gray-400">Atq:</span>
                                <span className="text-red-400 font-mono">BAB + mod</span>
                            </div>
                            <div className="flex justify-between p-2 bg-gray-900/50 rounded">
                                <span className="text-gray-400">Salv:</span>
                                <span className="text-purple-400 font-mono">Base + mod</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Pasos finales */}
                <Card className="card border-green-500/30">
                    <CardHeader className="bg-gradient-to-r from-green-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Palette className="h-6 w-6 text-green-400" />
                            Detalles finales (8-9)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold text-green-400 mb-3">8. Equipo:</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <Shield className="h-4 w-4 text-green-400 mt-0.5" />
                                        <span>Usa paquete inicial (recomendado)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Dices className="h-4 w-4 text-blue-400 mt-0.5" />
                                        <span>O tira oro inicial y compra libre</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-400 mb-3">9. Personalidad:</h4>
                                <ul className="space-y-1 text-xs text-gray-400">
                                    <li>• Nombre y alineamiento</li>
                                    <li>• Edad y apariencia</li>
                                    <li>• Personalidad y motivación</li>
                                    <li>• Trasfondo (opcional)</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Subir de Nivel */}
                <Card className="card border-purple-500/30">
                    <CardHeader className="bg-gradient-to-r from-purple-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Crown className="h-6 w-6 text-purple-400" />
                            Subir de Nivel
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <p className="text-gray-200 mb-6">
                            Cuando acumulas suficiente experiencia (XP), tu personaje avanza de nivel y se vuelve más poderoso.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-purple-400 mb-3">Pasos para subir de nivel:</h4>
                                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                                    <li><strong>Elige Clase:</strong> Sube tu clase actual o añade una nueva (Multiclase).</li>
                                    <li><strong>Ataque Base:</strong> Consulta la tabla de tu clase.</li>
                                    <li><strong>Salvaciones:</strong> Consulta la tabla de tu clase.</li>
                                    <li><strong>Característica:</strong> A nivel 4, 8, 12, 16, 20 ganas +1 punto.</li>
                                    <li><strong>Puntos de Golpe:</strong> Tira dado de golpe + mod Con.</li>
                                    <li><strong>Habilidades:</strong> Gasta puntos (Clase + Int).</li>
                                    <li><strong>Dotes:</strong> A nivel 3, 6, 9, 12, 15, 18 ganas una dote.</li>
                                    <li><strong>Conjuros:</strong> Si lanzas conjuros, ganas nuevos espacios.</li>
                                    <li><strong>Rasgos de Clase:</strong> Nuevas habilidades especiales.</li>
                                </ol>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gray-950/30 p-4 rounded border border-gray-700">
                                    <h4 className="font-bold text-gray-100 text-sm mb-2">Tabla de Experiencia (Resumen)</h4>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="text-gray-400">Nivel 2: <span className="text-purple-300">1,000 XP</span></div>
                                        <div className="text-gray-400">Nivel 3: <span className="text-purple-300">3,000 XP</span></div>
                                        <div className="text-gray-400">Nivel 4: <span className="text-purple-300">6,000 XP</span></div>
                                        <div className="text-gray-400">Nivel 5: <span className="text-purple-300">10,000 XP</span></div>
                                        <div className="text-gray-400">Nivel 6: <span className="text-purple-300">15,000 XP</span></div>
                                        <div className="text-gray-400">Nivel 10: <span className="text-purple-300">45,000 XP</span></div>
                                    </div>
                                </div>

                                <div className="bg-purple-900/10 border-l-4 border-purple-500 p-3 rounded">
                                    <h5 className="font-bold text-purple-400 text-sm mb-1">Multiclase</h5>
                                    <p className="text-xs text-gray-300">
                                        Puedes tener niveles en diferentes clases (ej. Guerrero 4 / Mago 3).
                                        Sumas tus bonificadores de ataque y salvación, pero tus habilidades de clase (como conjuros) progresan por separado.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Consejos */}
                <Card className="card border-gold-500/30">
                    <CardHeader className="bg-gradient-to-r from-gold-900/20 to-transparent">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <BookOpen className="h-6 w-6 text-gold-400" />
                            Consejos para nuevos jugadores
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-gold-900/10 border-l-4 border-gold-500 p-3 rounded">
                                <p className="text-gray-200">
                                    <strong className="text-gold-400">No optimizes demasiado:</strong> elige lo que te parezca divertido, no solo lo más poderoso.
                                </p>
                            </div>
                            <div className="bg-blue-900/10 border-l-4 border-blue-500 p-3 rounded">
                                <p className="text-gray-200">
                                    <strong className="text-blue-400">Pregunta al DM:</strong> si tienes dudas, tu DM está ahí para ayudarte.
                                </p>
                            </div>
                            <div className="bg-green-900/10 border-l-4 border-green-500 p-3 rounded">
                                <p className="text-gray-200">
                                    <strong className="text-green-400">Coordina con el grupo:</strong> asegúrate de que el equipo esté equilibrado.
                                </p>
                            </div>
                            <div className="bg-purple-900/10 border-l-4 border-purple-500 p-3 rounded">
                                <p className="text-gray-200">
                                    <strong className="text-purple-400">Diviértete:</strong> es un juego, ¡disfruta la experiencia!
                                </p>
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
