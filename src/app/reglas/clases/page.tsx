import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Shield, BookOpen, Zap, Scroll, Swords, Award, Star, CheckCircle, AlertCircle, Plus, Minus, Heart, Target, Dices, User, Brain, Grip, HelpCircle, ArrowUpCircle, BarChart3, Flame, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata = {
    title: 'Clases - Reglas D&D 3.5',
    description: 'Reglas completas sobre las clases, bonificadores, beneficios por nivel y descripciones detalladas.',
};

export default function ClassesRulesPage() {
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
            <div className="border-l-4 border-red-500 pl-6 mb-12">
                <div className="flex items-center gap-4 mb-3">
                    <Shield className="h-10 w-10 md:h-12 md:w-12 text-red-400" />
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dungeon-100">
                        Clases
                    </h1>
                </div>
                <p className="text-lg text-dungeon-300 leading-relaxed">
                    Las clases definen el arquetipo de tu personaje y son el componente más importante de su identidad. Determinan sus capacidades de combate, sus habilidades mágicas (si las tiene), sus aptitudes y su rol en el grupo. Desde el bárbaro salvaje hasta el mago estudioso, tu elección de clase moldeará cómo interactúas con el mundo y cómo superas los desafíos.
                </p>
            </div>

            {/* TL;DR - Resumen Rápido */}
            <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/20 to-dungeon-900 border-2 border-green-500/40 rounded-xl p-6 mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500/20 rounded-full p-2">
                        <Zap className="h-6 w-6 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-400">TL;DR - Clases en 30 Segundos</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 hover:bg-orange-900/30 transition-colors">
                        <Swords className="h-8 w-8 text-orange-400 mb-2" />
                        <div className="font-bold text-orange-400 mb-1">BAB = Tu precisión</div>
                        <div className="text-dungeon-400 text-xs">
                            Guerrero: +1/niv | Clérigo: +¾/niv | Mago: +½/niv
                        </div>
                    </div>
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 hover:bg-red-900/30 transition-colors">
                        <Heart className="h-8 w-8 text-red-400 mb-2" />
                        <div className="font-bold text-red-400 mb-1">Dado de Golpe (DG)</div>
                        <div className="text-dungeon-400 text-xs">
                            d12 (Bárbaro) → d4 (Mago). Más grande = más PG
                        </div>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 hover:bg-blue-900/30 transition-colors">
                        <Shield className="h-8 w-8 text-blue-400 mb-2" />
                        <div className="font-bold text-blue-400 mb-1">Salvaciones</div>
                        <div className="text-dungeon-400 text-xs">
                            Buena (+2 base) o Pobre (+0). Varía por clase
                        </div>
                    </div>
                    <div className="bg-gold-900/20 border border-gold-500/30 rounded-lg p-4 hover:bg-gold-900/30 transition-colors">
                        <TrendingUp className="h-8 w-8 text-gold-400 mb-2" />
                        <div className="font-bold text-gold-400 mb-1">Al subir nivel</div>
                        <div className="text-dungeon-400 text-xs">
                            Dote cada 3 niv (3,6,9...) | +1 Caract cada 4 niv
                        </div>
                    </div>
                </div>

                {/* Ejemplo Visual */}
                <div className="mt-6 bg-dungeon-950/50 border border-dungeon-700 rounded-lg p-4">
                    <div className="text-sm text-dungeon-400 mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>Ejemplo: Guerrero nivel 6 atacando:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="bg-dungeon-800 px-3 py-1 rounded font-mono">d20</span>
                        <span className="text-green-400 font-bold">+</span>
                        <span className="bg-orange-900/40 border border-orange-500/30 px-3 py-1 rounded">+6/+1 <span className="text-dungeon-500 text-xs">(BAB)</span></span>
                        <span className="text-green-400 font-bold">+</span>
                        <span className="bg-red-900/40 border border-red-500/30 px-3 py-1 rounded">+3 <span className="text-dungeon-500 text-xs">(Fue)</span></span>
                        <span className="text-dungeon-500">=</span>
                        <span className="bg-green-900/40 border border-green-500/50 px-4 py-1 rounded font-bold text-green-400">2 ataques: +9 y +4</span>
                    </div>
                    <p className="text-xs text-dungeon-500 mt-2">BAB +6 te da un segundo ataque con -5 de penalización (+6-5=+1).</p>
                </div>
            </div>

            <div className="space-y-12">

                {/* 1. Bonificadores de clase y nivel */}
                <section id="bonificadores" className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Target className="h-8 w-8 text-orange-500" />
                        <h2 className="text-3xl font-bold text-dungeon-100">Bonificadores de clase y nivel</h2>
                    </div>
                    <Card className="card border-orange-500/30">
                        <CardContent className="p-8 space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-orange-400 mb-3 flex items-center gap-2">
                                        <Swords className="h-5 w-5" /> Ataque base (BAB)
                                    </h3>
                                    <p className="text-dungeon-200 text-sm mb-4">
                                        Es tu habilidad pura para golpear. Cuanto más alto, mejor. Dependiendo de tu clase, sube a diferentes velocidades:
                                    </p>
                                    <ul className="space-y-2 text-sm text-dungeon-300 mb-6">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400 font-bold whitespace-nowrap">Rápido (+1/nivel):</span>
                                            <span>Combatientes puros (Guerrero, Bárbaro, Paladín, Explorador).</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-yellow-400 font-bold whitespace-nowrap">Medio (+3/4 nivel):</span>
                                            <span>Combatientes mixtos (Clérigo, Pícaro, Druida, Monje, Bardo).</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-400 font-bold whitespace-nowrap">Lento (+1/2 nivel):</span>
                                            <span>Lanzadores de conjuros (Mago, Hechicero).</span>
                                        </li>
                                    </ul>

                                    <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg space-y-4">
                                        <div>
                                            <h4 className="font-bold text-orange-300 mb-2 text-sm flex items-center gap-2">
                                                <HelpCircle className="h-4 w-4" /> ¿Qué significan los números como "+6/+1"?
                                            </h4>
                                            <p className="text-xs text-dungeon-200 mb-2">
                                                ¡Significa que tienes <strong>múltiples ataques</strong> en un solo turno!
                                            </p>
                                            <p className="text-xs text-dungeon-300">
                                                Cuando tu ataque base llega a <strong>+6</strong>, ganas un segundo ataque con un penalizador de -5 (por eso el +1). A <strong>+11</strong> ganas un tercero, y a <strong>+16</strong> un cuarto.
                                            </p>
                                        </div>
                                        <div className="pt-2 border-t border-orange-500/30">
                                            <h4 className="font-bold text-orange-300 mb-1 text-sm">Fórmula de ataque</h4>
                                            <code className="block bg-black/30 p-2 rounded text-xs text-green-400 font-mono">
                                                d20 + BAB + Mod. Característica + Otros
                                            </code>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-orange-400 mb-3 flex items-center gap-2">
                                        <Shield className="h-5 w-5" /> Salvaciones base
                                    </h3>
                                    <p className="text-dungeon-200 text-sm mb-4">
                                        Representan tu resistencia natural y heroica a diferentes peligros. Se suman a tu Constitución (Fortaleza), Destreza (Reflejos) o Sabiduría (Voluntad).
                                    </p>
                                    <ul className="space-y-4 text-sm text-dungeon-300">
                                        <li className="bg-dungeon-900/30 p-3 rounded border-l-2 border-green-500">
                                            <strong className="text-green-400 block mb-1">Progresión buena</strong>
                                            Empiezas con un <strong>+2</strong> base. Son las fortalezas de tu clase (ej. un Monje tiene buenos Reflejos).
                                        </li>
                                        <li className="bg-dungeon-900/30 p-3 rounded border-l-2 border-red-500">
                                            <strong className="text-red-400 block mb-1">Progresión pobre</strong>
                                            Empiezas con <strong>+0</strong>. Son tus puntos débiles (ej. un Mago tiene mala Fortaleza).
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-dungeon-100 mb-4">Tabla: Bonificadores de salvación y ataque base</h3>
                                <div className="overflow-x-auto rounded-lg border border-dungeon-700">
                                    <table className="w-full text-sm text-left text-dungeon-200">
                                        <thead className="text-xs text-orange-400 uppercase bg-dungeon-900/80 border-b border-dungeon-700">
                                            <tr>
                                                <th className="px-4 py-2">Nivel</th>
                                                <th className="px-4 py-2">BAB (Bueno)</th>
                                                <th className="px-4 py-2">BAB (Medio)</th>
                                                <th className="px-4 py-2">BAB (Pobre)</th>
                                                <th className="px-4 py-2">Salv. (Buena)</th>
                                                <th className="px-4 py-2">Salv. (Pobre)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-dungeon-700 bg-dungeon-900/20">
                                            {[...Array(20)].map((_, i) => {
                                                const level = i + 1;
                                                const babGood = `+${level}`;
                                                const babAvg = `+${Math.floor(level * 0.75)}`;
                                                const babPoor = `+${Math.floor(level * 0.5)}`;
                                                const saveGood = `+${2 + Math.floor(level / 2)}`;
                                                const savePoor = `+${Math.floor(level / 3)}`;

                                                // Iterative attacks logic for Good BAB
                                                let babGoodDisplay = babGood;
                                                if (level >= 6) babGoodDisplay += ` / +${level - 5}`;
                                                if (level >= 11) babGoodDisplay += ` / +${level - 10}`;
                                                if (level >= 16) babGoodDisplay += ` / +${level - 15}`;

                                                return (
                                                    <tr key={level} className="hover:bg-dungeon-800/50">
                                                        <td className="px-4 py-2 font-bold text-dungeon-100">{level}</td>
                                                        <td className="px-4 py-2 text-green-400 font-mono">{babGoodDisplay}</td>
                                                        <td className="px-4 py-2 text-yellow-400 font-mono">{babAvg}</td>
                                                        <td className="px-4 py-2 text-red-400 font-mono">{babPoor}</td>
                                                        <td className="px-4 py-2 text-green-400 font-mono">{saveGood}</td>
                                                        <td className="px-4 py-2 text-red-400 font-mono">{savePoor}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* 2. Beneficios del nivel */}
                <section id="beneficios" className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Award className="h-8 w-8 text-gold-500" />
                        <h2 className="text-3xl font-bold text-dungeon-100">Beneficios del nivel</h2>
                    </div>
                    <Card className="card border-gold-500/30">
                        <CardContent className="p-8 space-y-8">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-dungeon-900/30 p-4 rounded border border-dungeon-700">
                                    <strong className="text-gold-400 block mb-2 flex items-center gap-2">
                                        <Star className="h-4 w-4" /> Puntos de experiencia
                                    </strong>
                                    <p className="text-xs text-dungeon-300">
                                        Total de PX necesarios para alcanzar el nivel. Generalmente: Nivel actual × 1,000.
                                    </p>
                                </div>
                                <div className="bg-dungeon-900/30 p-4 rounded border border-dungeon-700">
                                    <strong className="text-gold-400 block mb-2 flex items-center gap-2">
                                        <BookOpen className="h-4 w-4" /> Rangos máximos
                                    </strong>
                                    <ul className="text-xs text-dungeon-300 space-y-1">
                                        <li><strong className="text-dungeon-100">Cláseas:</strong> Nivel + 3</li>
                                        <li><strong className="text-dungeon-100">Transcláseas:</strong> (Nivel + 3) / 2</li>
                                    </ul>
                                </div>
                                <div className="bg-dungeon-900/30 p-4 rounded border border-dungeon-700">
                                    <strong className="text-gold-400 block mb-2 flex items-center gap-2">
                                        <Zap className="h-4 w-4" /> Dotes
                                    </strong>
                                    <p className="text-xs text-dungeon-300">
                                        Ganas una dote a nivel 1 y otra cada 3 niveles (3, 6, 9, 12, 15, 18).
                                    </p>
                                </div>
                                <div className="bg-dungeon-900/30 p-4 rounded border border-dungeon-700">
                                    <strong className="text-gold-400 block mb-2 flex items-center gap-2">
                                        <Target className="h-4 w-4" /> Características
                                    </strong>
                                    <p className="text-xs text-dungeon-300">
                                        Aumentas 1 punto de característica cada 4 niveles (4, 8, 12, 16, 20).
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gold-900/10 border-l-4 border-gold-500 p-4 rounded">
                                <h4 className="font-bold text-gold-400 mb-2 text-sm flex items-center gap-2">
                                    <HelpCircle className="h-4 w-4" /> Consejo: ¿Clásea o transclásea?
                                </h4>
                                <p className="text-sm text-dungeon-200">
                                    Las <strong>habilidades de clase</strong> son las que tu personaje aprendió durante su formación. Son más baratas de subir (1 punto = 1 rango).
                                    <br />
                                    Las <strong>transcláseas</strong> son conocimientos fuera de su especialidad. Cuestan el doble (1 punto = ½ rango).
                                </p>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-dungeon-100 mb-4">Tabla: Experiencia y beneficios dependientes del nivel</h3>
                                <div className="overflow-x-auto rounded-lg border border-dungeon-700">
                                    <table className="w-full text-sm text-left text-dungeon-200">
                                        <thead className="text-xs text-gold-400 uppercase bg-dungeon-900/80 border-b border-dungeon-700">
                                            <tr>
                                                <th className="px-4 py-2">Nivel</th>
                                                <th className="px-4 py-2">PX necesarios</th>
                                                <th className="px-4 py-2">Rango máx. (clase)</th>
                                                <th className="px-4 py-2">Rango máx. (trans)</th>
                                                <th className="px-4 py-2">Dotes</th>
                                                <th className="px-4 py-2">Aumento caract.</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-dungeon-700 bg-dungeon-900/20">
                                            {[...Array(20)].map((_, i) => {
                                                const level = i + 1;
                                                const xp = level === 1 ? 0 : (level * (level - 1)) * 500; // Formula: sum of levels * 1000 basically
                                                const maxRankClass = level + 3;
                                                const maxRankCross = maxRankClass / 2;
                                                const feat = level === 1 || level % 3 === 0 ? "Sí" : "-";
                                                const ability = level % 4 === 0 ? "Sí" : "-";

                                                return (
                                                    <tr key={level} className="hover:bg-dungeon-800/50">
                                                        <td className="px-4 py-2 font-bold text-dungeon-100">{level}</td>
                                                        <td className="px-4 py-2">{xp.toLocaleString()}</td>
                                                        <td className="px-4 py-2">{maxRankClass}</td>
                                                        <td className="px-4 py-2">{maxRankCross}</td>
                                                        <td className={`px-4 py-2 ${feat === "Sí" ? "text-green-400 font-bold" : "text-dungeon-500"}`}>{feat}</td>
                                                        <td className={`px-4 py-2 ${ability === "Sí" ? "text-gold-400 font-bold" : "text-dungeon-500"}`}>{ability}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* 3. Guía de ascenso de nivel */}
                <section id="guia-nivel" className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <ArrowUpCircle className="h-8 w-8 text-green-500" />
                        <h2 className="text-3xl font-bold text-dungeon-100">Guía de ascenso de nivel</h2>
                    </div>
                    <Card className="card border-green-500/30">
                        <CardContent className="p-8">
                            <p className="text-dungeon-200 mb-6">
                                Cuando acumulas suficiente experiencia (PX), tu personaje sube de nivel. Sigue estos pasos:
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="bg-green-900/30 h-8 w-8 flex items-center justify-center rounded-full border border-green-500 text-green-400 font-bold shrink-0">1</div>
                                        <div>
                                            <h4 className="font-bold text-green-400">Elige clase</h4>
                                            <p className="text-xs text-dungeon-300">Sube un nivel en tu clase actual o elige una nueva (multiclase).</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="bg-green-900/30 h-8 w-8 flex items-center justify-center rounded-full border border-green-500 text-green-400 font-bold shrink-0">2</div>
                                        <div>
                                            <h4 className="font-bold text-green-400">Ataque y salvaciones</h4>
                                            <p className="text-xs text-dungeon-300">Consulta la tabla de tu clase. Si suben, actualiza tu hoja.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="bg-green-900/30 h-8 w-8 flex items-center justify-center rounded-full border border-green-500 text-green-400 font-bold shrink-0">3</div>
                                        <div>
                                            <h4 className="font-bold text-green-400">Puntos de golpe</h4>
                                            <p className="text-xs text-dungeon-300">Tira el dado de golpe de tu clase y suma tu mod. de Constitución.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="bg-green-900/30 h-8 w-8 flex items-center justify-center rounded-full border border-green-500 text-green-400 font-bold shrink-0">4</div>
                                        <div>
                                            <h4 className="font-bold text-green-400">Habilidades</h4>
                                            <p className="text-xs text-dungeon-300">Gasta tus puntos de habilidad. (Puntos = Base de clase + Mod. Inteligencia).</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="bg-green-900/30 h-8 w-8 flex items-center justify-center rounded-full border border-green-500 text-green-400 font-bold shrink-0">5</div>
                                        <div>
                                            <h4 className="font-bold text-green-400">Dotes</h4>
                                            <p className="text-xs text-dungeon-300">Si tu nivel total es múltiplo de 3 (3, 6, 9...), elige una nueva dote.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="bg-green-900/30 h-8 w-8 flex items-center justify-center rounded-full border border-green-500 text-green-400 font-bold shrink-0">6</div>
                                        <div>
                                            <h4 className="font-bold text-green-400">Características</h4>
                                            <p className="text-xs text-dungeon-300">Si tu nivel total es múltiplo de 4 (4, 8, 12...), suma +1 a una característica.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="bg-green-900/30 h-8 w-8 flex items-center justify-center rounded-full border border-green-500 text-green-400 font-bold shrink-0">7</div>
                                        <div>
                                            <h4 className="font-bold text-green-400">Conjuros y rasgos</h4>
                                            <p className="text-xs text-dungeon-300">Revisa la descripción de tu clase para ver qué poderes nuevos ganas.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* 4. Descripción de las clases */}
                <section id="descripcion" className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="h-8 w-8 text-blue-500" />
                        <h2 className="text-3xl font-bold text-dungeon-100">Descripción de las clases</h2>
                    </div>
                    <Card className="card border-blue-500/30">
                        <CardContent className="p-8 space-y-8 text-dungeon-200">
                            <p className="text-lg">
                                A continuación se detalla la información de reglas de juego que encontrarás en cada clase.
                            </p>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="bg-dungeon-900/30 p-4 rounded border-l-4 border-blue-500">
                                        <h4 className="font-bold text-blue-400 mb-2">Características</h4>
                                        <p className="text-sm">
                                            Indica qué puntuaciones de característica son más importantes para la clase. Los jugadores pueden "jugar contra el tipo", pero típicamente buscarán potenciar estas características.
                                        </p>
                                    </div>
                                    <div className="bg-dungeon-900/30 p-4 rounded border-l-4 border-blue-500">
                                        <h4 className="font-bold text-blue-400 mb-2">Alineamiento</h4>
                                        <p className="text-sm">
                                            Restricciones de alineamiento si las hay (ej. Bardo no legal). "Cualquiera" significa sin restricciones.
                                        </p>
                                    </div>
                                    <div className="bg-dungeon-900/30 p-4 rounded border-l-4 border-blue-500">
                                        <h4 className="font-bold text-blue-400 mb-2">Dado de golpe</h4>
                                        <p className="text-sm mb-2">
                                            El tipo de dado usado para determinar los puntos de golpe ganados por nivel.
                                        </p>
                                        <div className="grid grid-cols-5 gap-2 text-center text-xs">
                                            <div className="bg-dungeon-900 p-1 rounded border border-dungeon-700">d4<br /><span className="text-dungeon-400">Mag/Hec</span></div>
                                            <div className="bg-dungeon-900 p-1 rounded border border-dungeon-700">d6<br /><span className="text-dungeon-400">Bar/Píc</span></div>
                                            <div className="bg-dungeon-900 p-1 rounded border border-dungeon-700">d8<br /><span className="text-dungeon-400">Clé/Dru</span></div>
                                            <div className="bg-dungeon-900 p-1 rounded border border-dungeon-700">d10<br /><span className="text-dungeon-400">Gue/Pal</span></div>
                                            <div className="bg-dungeon-900 p-1 rounded border border-dungeon-700">d12<br /><span className="text-dungeon-400">Bár</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-dungeon-900/30 p-4 rounded border-l-4 border-green-500">
                                        <h4 className="font-bold text-green-400 mb-2">Tabla de clase</h4>
                                        <p className="text-sm mb-2">Detalla el avance nivel a nivel:</p>
                                        <ul className="text-xs space-y-1 list-disc list-inside text-dungeon-300">
                                            <li><strong>Nivel:</strong> Nivel en la clase.</li>
                                            <li><strong>Ataque base:</strong> Bonificador al ataque.</li>
                                            <li><strong>Salvaciones:</strong> Fort, Ref, Vol base.</li>
                                            <li><strong>Especial:</strong> Habilidades ganadas.</li>
                                            <li><strong>Conjuros al día:</strong> Espacios de conjuro.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-dungeon-900/30 p-4 rounded border-l-4 border-green-500">
                                        <h4 className="font-bold text-green-400 mb-2">Habilidades de clase</h4>
                                        <p className="text-sm">
                                            Lista de habilidades y puntos por nivel.
                                            <br />
                                            <span className="text-xs text-dungeon-300">Puntos al nivel 1: (Base + Int) × 4.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mt-6">
                                <div className="bg-purple-900/10 p-4 rounded border border-purple-500/30">
                                    <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
                                        <Zap className="h-4 w-4" /> Rasgos de clase
                                    </h4>
                                    <p className="text-xs text-dungeon-300">
                                        Competencias con armas/armaduras, conjuros y capacidades únicas (extraordinarias, sobrenaturales o sortílegas).
                                    </p>
                                </div>
                                <div className="bg-red-900/10 p-4 rounded border border-red-500/30">
                                    <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4" /> Exmiembros
                                    </h4>
                                    <p className="text-xs text-dungeon-300">
                                        Reglas para personajes que dejan de cumplir los requisitos de la clase o violan su código de conducta.
                                    </p>
                                </div>
                                <div className="bg-cyan-900/10 p-4 rounded border border-cyan-500/30">
                                    <h4 className="font-bold text-cyan-400 mb-2 flex items-center gap-2">
                                        <User className="h-4 w-4" /> Conjunto inicial
                                    </h4>
                                    <p className="text-xs text-dungeon-300">
                                        Paquete predefinido de equipo, dotes y habilidades para creación rápida de personajes.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-dungeon-900/30 border border-dungeon-700 rounded-lg p-6 mt-8">
                                <h3 className="font-bold text-gold-400 mb-3 flex items-center gap-2 text-lg">
                                    <Plus className="h-5 w-5" /> Personajes multiclase
                                </h3>
                                <p className="mb-4 text-sm">
                                    Un personaje puede ganar niveles en más de una clase. Esto se llama ser multiclase. Por ejemplo, un guerrero de nivel 5 podría decidir tomar un nivel de mago, convirtiéndose en un Guerrero 5 / Mago 1 (personaje de nivel 6).
                                </p>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div className="bg-red-900/10 p-4 rounded border-l-4 border-red-500">
                                        <strong className="text-red-400 block mb-1">Acumulación</strong>
                                        <p className="text-xs text-dungeon-300">
                                            El ataque base y las salvaciones base de todas tus clases se suman.
                                        </p>
                                    </div>
                                    <div className="bg-gold-900/10 p-4 rounded border-l-4 border-gold-500">
                                        <strong className="text-gold-400 block mb-1">Nivel de personaje</strong>
                                        <p className="text-xs text-dungeon-300">
                                            Las dotes (cada 3 niveles) y aumentos de característica (cada 4 niveles) dependen de tu nivel total, no de clase.
                                        </p>
                                    </div>
                                    <div className="bg-dungeon-800/50 p-4 rounded border-l-4 border-dungeon-500">
                                        <strong className="text-dungeon-100 block mb-1">Penalización de experiencia</strong>
                                        <p className="text-xs text-dungeon-300">
                                            Si tus clases están desequilibradas (diferencia de 2+ niveles), sufres <strong>-20% a los PX</strong>.
                                        </p>
                                    </div>
                                    <div className="bg-dungeon-800/50 p-4 rounded border-l-4 border-dungeon-500">
                                        <strong className="text-dungeon-100 block mb-1">Clase predilecta</strong>
                                        <p className="text-xs text-dungeon-300">
                                            La clase predilecta de tu raza (ej. Mago para Elfos) no cuenta para la penalización de experiencia.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

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
