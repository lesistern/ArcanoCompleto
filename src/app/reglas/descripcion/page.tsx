'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Scroll, Swords, Scale, User, Palette, BookOpen, Sun, Moon, Skull, Heart, Zap, BarChart3, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { alignmentDetails, ALIGNMENT_CONFIG, slugToCode, ALIGNMENT_GENERAL_INFO } from '@/lib/data/alignments';

const alignmentOrder = [
    'legal-bueno', 'neutral-bueno', 'caotico-bueno',
    'legal-neutral', 'neutral', 'caotico-neutral',
    'legal-malvado', 'neutral-malvado', 'caotico-malvado'
];

export default function DescriptionPage() {
    const [activeTab, setActiveTab] = useState('alineamiento');

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
                            Descripcion del Personaje
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Mas alla de las estadisticas y los numeros, tu personaje es una persona con personalidad, creencias y apariencia.
                        </p>
                    </div>

                    <div className="p-6 rounded-full bg-gold-500/10 border border-gold-500/30 backdrop-blur-sm">
                        <Scroll className="h-12 w-12 text-gold-500" />
                    </div>
                </div>
            </div>

            {/* TL;DR - Resumen Rápido */}
            <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/20 to-gray-900 border-2 border-green-500/40 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500/20 rounded-full p-2">
                        <Zap className="h-6 w-6 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-400">TL;DR - Descripción en 30 Segundos</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 hover:bg-blue-900/30 transition-colors">
                        <Scale className="h-8 w-8 text-blue-400 mb-2" />
                        <div className="font-bold text-blue-400 mb-1">9 Alineamientos</div>
                        <div className="text-gray-400 text-xs">
                            Combina Ley/Neutral/Caos con Bien/Neutral/Mal
                        </div>
                    </div>
                    <div className="bg-gold-900/20 border border-gold-500/30 rounded-lg p-4 hover:bg-gold-900/30 transition-colors">
                        <Sun className="h-8 w-8 text-gold-400 mb-2" />
                        <div className="font-bold text-gold-400 mb-1">Elige Deidad</div>
                        <div className="text-gray-400 text-xs">
                            Importante para Clérigos/Paladines. Opcional para otros.
                        </div>
                    </div>
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-900/30 transition-colors">
                        <Clock className="h-8 w-8 text-purple-400 mb-2" />
                        <div className="font-bold text-purple-400 mb-1">Edad = Cambios Stats</div>
                        <div className="text-gray-400 text-xs">
                            Viejos: -Físico, +Mental. Jóvenes: opuesto.
                        </div>
                    </div>
                    <div className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-4 hover:bg-pink-900/30 transition-colors">
                        <Sparkles className="h-8 w-8 text-pink-400 mb-2" />
                        <div className="font-bold text-pink-400 mb-1">Trasfondo = Motivación</div>
                        <div className="text-gray-400 text-xs">
                            ¿Por qué aventura? ¿Familia? ¿Secretos?
                        </div>
                    </div>
                </div>

                {/* Ejemplo Visual de Alineamiento */}
                <div className="mt-6 bg-gray-950/50 border border-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>Ejemplo: Matriz de Alineamientos 3×3:</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-center max-w-md">
                        {alignmentOrder.map((slug) => {
                            const details = alignmentDetails[slug];
                            const code = slugToCode[slug];
                            const config = ALIGNMENT_CONFIG[code];
                            return (
                                <span
                                    key={slug}
                                    title={`${details.archetype}: ${details.shortDesc}`}
                                    className="px-2 py-1 rounded cursor-help transition-transform hover:scale-105"
                                    style={{
                                        backgroundColor: `${config.hex}20`,
                                        borderWidth: '1px',
                                        borderColor: `${config.hex}50`,
                                        color: config.hex
                                    }}
                                >
                                    {details.name}
                                </span>
                            );
                        })}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">El alineamiento guía tu roleplay, pero no te limita. Puedes cambiar con el tiempo.</p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700 pb-1">
                <button
                    onClick={() => setActiveTab('alineamiento')}
                    className={`px-4 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-2 ${activeTab === 'alineamiento'
                        ? 'bg-gray-800 text-gold-400 border-t border-x border-gray-700'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/50'
                        }`}
                >
                    <Scale className="h-4 w-4" />
                    Alineamiento
                </button>
                <button
                    onClick={() => setActiveTab('religion')}
                    className={`px-4 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-2 ${activeTab === 'religion'
                        ? 'bg-gray-800 text-gold-400 border-t border-x border-gray-700'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/50'
                        }`}
                >
                    <Sun className="h-4 w-4" />
                    Religión
                </button>
                <button
                    onClick={() => setActiveTab('vitales')}
                    className={`px-4 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-2 ${activeTab === 'vitales'
                        ? 'bg-gray-800 text-gold-400 border-t border-x border-gray-700'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/50'
                        }`}
                >
                    <User className="h-4 w-4" />
                    Estadísticas Vitales
                </button>
                <button
                    onClick={() => setActiveTab('personalidad')}
                    className={`px-4 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-2 ${activeTab === 'personalidad'
                        ? 'bg-gray-800 text-gold-400 border-t border-x border-gray-700'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/50'
                        }`}
                >
                    <Palette className="h-4 w-4" />
                    Personalidad y Trasfondo
                </button>
            </div>

            {/* Content Area */}
            <div className="space-y-8 min-h-[500px]">

                {/* ALINEAMIENTO TAB */}
                {activeTab === 'alineamiento' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <Card className="card border-blue-500/30">
                                <CardHeader className="bg-gradient-to-r from-blue-900/20 to-transparent pb-3">
                                    <div className="flex items-center gap-3">
                                        <Swords className="h-6 w-6 text-blue-400" />
                                        <CardTitle className="text-xl text-gray-100">
                                            Bien vs. Mal
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        El <strong>Bien</strong> implica altruismo, respeto por la vida y sacrificio personal.
                                        El <strong>Mal</strong> implica herir, oprimir y matar por diversión o beneficio.
                                        La <strong>Neutralidad</strong> es la falta de compromiso hacia uno u otro, o una visión equilibrada.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="card border-gold-500/30">
                                <CardHeader className="bg-gradient-to-r from-gold-900/20 to-transparent pb-3">
                                    <div className="flex items-center gap-3">
                                        <Scale className="h-6 w-6 text-gold-400" />
                                        <CardTitle className="text-xl text-gray-100">
                                            Ley vs. Caos
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        La <strong>Ley</strong> implica honor, obediencia a la autoridad y fiabilidad.
                                        El <strong>Caos</strong> implica libertad, adaptabilidad y flexibilidad, pero también imprudencia.
                                        La <strong>Neutralidad</strong> es el respeto normal por la autoridad sin compulsión a obedecer o rebelarse.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {alignmentOrder.map((slug) => {
                                const details = alignmentDetails[slug];
                                const code = slugToCode[slug];
                                const config = ALIGNMENT_CONFIG[code];
                                const Icon = config.icon;
                                const isBest = details.quoteType === 'best';

                                return (
                                    <Link
                                        key={slug}
                                        href={`/reglas/descripcion/${slug}`}
                                        className="block h-full transition-transform hover:scale-[1.02]"
                                    >
                                        <Card
                                            className="card h-full flex flex-col transition-all duration-200 hover:border-opacity-50"
                                            style={{ borderColor: `${config.hex}4D` }}
                                        >
                                            <CardHeader
                                                className="pb-3"
                                                style={{ background: `linear-gradient(to right, ${config.hex}26, transparent)` }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Icon className="h-6 w-6" style={{ color: config.hex }} />
                                                    <CardTitle className="text-xl font-bold" style={{ color: config.hex }}>
                                                        {details.name}
                                                    </CardTitle>
                                                </div>
                                                <div className="mt-1">
                                                    <span className="text-xs font-serif italic text-gray-400 opacity-80">
                                                        &quot;{details.archetype}&quot;
                                                    </span>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-6 flex-grow flex flex-col gap-4">
                                                <p className="text-gray-200 leading-relaxed text-sm">
                                                    {details.description}
                                                </p>
                                                <div className={`mt-auto p-3 rounded border ${isBest ? 'bg-green-900/10 border-green-500/20' : 'bg-red-900/10 border-red-500/20'}`}>
                                                    <p className="text-xs italic text-gray-300">
                                                        &quot;{details.quote}&quot;
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* RELIGION TAB */}
                {activeTab === 'religion' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-8">
                        <Card className="card border-gray-700">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <Sun className="h-6 w-6 text-yellow-500" />
                                    <CardTitle className="text-xl text-gray-100">Deidades y Fe</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4 text-gray-300">
                                <p>
                                    Los dioses son reales y poderosos. Aunque los clérigos son sus siervos más devotos, la mayoría de la gente tiene una deidad patrona a la que reza.
                                </p>
                                <p>
                                    Elegir una deidad es importante para Clérigos y Paladines, ya que define sus poderes y dominios. Para otros, es una cuestión de trasfondo y creencias.
                                </p>
                            </CardContent>
                        </Card>

                        <div className="grid md:grid-cols-2 gap-8">
                            <Card className="card border-gray-700">
                                <CardHeader className="pb-3 bg-gray-900/50">
                                    <CardTitle className="text-lg text-gray-100">Deidades por Raza</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <table className="w-full text-sm text-left text-gray-300">
                                        <thead className="bg-gray-900 text-gray-100 uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-3">Raza</th>
                                                <th className="px-4 py-3">Deidades Comunes</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            <tr className="hover:bg-gray-800/30">
                                                <td className="px-4 py-3 font-medium text-gray-200">Humano</td>
                                                <td className="px-4 py-3">Cualquiera (según clase/alineamiento)</td>
                                            </tr>
                                            <tr className="hover:bg-gray-800/30">
                                                <td className="px-4 py-3 font-medium text-gray-200">Enano</td>
                                                <td className="px-4 py-3">Moradin</td>
                                            </tr>
                                            <tr className="hover:bg-gray-800/30">
                                                <td className="px-4 py-3 font-medium text-gray-200">Elfo</td>
                                                <td className="px-4 py-3">Corellon Larethian, Ehlonna</td>
                                            </tr>
                                            <tr className="hover:bg-gray-800/30">
                                                <td className="px-4 py-3 font-medium text-gray-200">Gnomo</td>
                                                <td className="px-4 py-3">Garl Glittergold, Ehlonna</td>
                                            </tr>
                                            <tr className="hover:bg-gray-800/30">
                                                <td className="px-4 py-3 font-medium text-gray-200">Mediano</td>
                                                <td className="px-4 py-3">Yondalla, Ehlonna</td>
                                            </tr>
                                            <tr className="hover:bg-gray-800/30">
                                                <td className="px-4 py-3 font-medium text-gray-200">Semiorco</td>
                                                <td className="px-4 py-3">Gruumsh</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CardContent>
                            </Card>

                            <Card className="card border-gray-700">
                                <CardHeader className="pb-3 bg-gray-900/50">
                                    <CardTitle className="text-lg text-gray-100">Deidades por Clase</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <table className="w-full text-sm text-left text-gray-300">
                                        <thead className="bg-gray-900 text-gray-100 uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-3">Clase</th>
                                                <th className="px-4 py-3">Deidades Típicas</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            <tr className="hover:bg-gray-800/30">
                                                <td className="px-4 py-3 font-medium text-gray-200">Bárbaro</td>
                                                <td className="px-4 py-3">Kord (CB), Obad-Hai (N), Erythnul (CM)</td>
                                            </tr>
                                            <tr className="hover:bg-gray-800/30">
                                                <td className="px-4 py-3 font-medium text-gray-200">Bardo</td>
                                                <td className="px-4 py-3">Pelor (NB), Fharlanghn (N), Olidammara (CN)</td>
                                            </tr>
                                            <tr className="hover:bg-gray-800/30">
                                                <td className="px-4 py-3 font-medium text-gray-200">Druida</td>
                                                <td className="px-4 py-3">Obad-Hai (N)</td>
                                            </tr>
                                            <tr className="hover:bg-gray-800/30">
                                                <td className="px-4 py-3 font-medium text-gray-200">Guerrero/Monje</td>
                                                <td className="px-4 py-3">Heironeous (LB), Kord (CB), Hextor (LM)</td>
                                            </tr>
                                            <tr className="hover:bg-gray-800/30">
                                                <td className="px-4 py-3 font-medium text-gray-200">Paladín</td>
                                                <td className="px-4 py-3">Heironeous (LB)</td>
                                            </tr>
                                            <tr className="hover:bg-gray-800/30">
                                                <td className="px-4 py-3 font-medium text-gray-200">Pícaro</td>
                                                <td className="px-4 py-3">Olidammara (CN), Nerull (NM)</td>
                                            </tr>
                                            <tr className="hover:bg-gray-800/30">
                                                <td className="px-4 py-3 font-medium text-gray-200">Mago/Hechicero</td>
                                                <td className="px-4 py-3">Boccob (N), Wee Jas (LN), Vecna (NM)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* VITALES TAB */}
                {activeTab === 'vitales' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card className="card border-gray-700">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center gap-3">
                                        <User className="h-6 w-6 text-gray-300" />
                                        <CardTitle className="text-xl text-gray-100">Edad</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4 text-gray-300 text-sm">
                                    <p>
                                        Puedes elegir la edad de tu personaje o generarla aleatoriamente.
                                        La edad mínima depende de tu raza y clase (las clases que requieren más entrenamiento, como magos, empiezan siendo más viejos).
                                    </p>
                                    <div className="bg-gray-900/50 p-4 rounded border border-gray-700">
                                        <h4 className="font-bold text-gray-100 mb-2">Efectos del Envejecimiento</h4>
                                        <p>
                                            Con la edad, las características físicas (Fuerza, Destreza, Constitución) disminuyen, mientras que las mentales (Inteligencia, Sabiduría, Carisma) aumentan.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="card border-gray-700">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center gap-3">
                                        <Scale className="h-6 w-6 text-gray-300" />
                                        <CardTitle className="text-xl text-gray-100">Altura y Peso</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4 text-gray-300 text-sm">
                                    <p>
                                        Elige la altura y peso basándote en la descripción de tu raza, o tíralo aleatoriamente.
                                    </p>
                                    <p>
                                        Piensa en cómo tus características afectan a tu apariencia. Un personaje con mucha Fuerza podría ser corpulento, mientras que uno con mucha Destreza podría ser esbelto.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* PERSONALIDAD TAB */}
                {activeTab === 'personalidad' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-8">
                        <Card className="card border-gray-700">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <Palette className="h-6 w-6 text-purple-400" />
                                    <CardTitle className="text-xl text-gray-100">Apariencia y Personalidad</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6 text-gray-300">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="font-bold text-gray-100 mb-2 text-lg">Apariencia</h3>
                                        <p className="text-sm mb-4">
                                            ¿Cómo es tu personaje? ¿Tiene cicatrices, tatuajes o rasgos distintivos?
                                            El Carisma alto suele implicar belleza o magnetismo, pero también puede ser una presencia intimidante o exótica.
                                        </p>
                                        <ul className="list-disc pl-5 text-sm space-y-1 text-gray-400">
                                            <li>Color de ojos, pelo y piel.</li>
                                            <li>Ropa y estilo (¿Limpio y ordenado o salvaje y sucio?).</li>
                                            <li>Marcas distintivas (Cicatrices de batalla, símbolos sagrados).</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-100 mb-2 text-lg">Personalidad</h3>
                                        <p className="text-sm mb-4">
                                            ¿Qué le gusta? ¿Qué odia? ¿A qué teme?
                                            Usa tu alineamiento como guía, pero no dejes que te limite.
                                        </p>
                                        <p className="text-sm italic text-gray-400">
                                            Consejo: Dale a tu personaje un conflicto interno o un defecto (ej. "Es legal, pero un poco codicioso"). Esto lo hace más interesante.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="card border-gray-700">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <BookOpen className="h-6 w-6 text-blue-400" />
                                    <CardTitle className="text-xl text-gray-100">Trasfondo (Background)</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4 text-gray-300 text-sm">
                                <p>
                                    Decide qué ha sido de la vida de tu personaje hasta ahora.
                                </p>
                                <ul className="grid md:grid-cols-2 gap-4">
                                    <li className="bg-gray-900/30 p-3 rounded border border-gray-800">
                                        <strong>¿Por qué es aventurero?</strong> ¿Busca gloria, oro, venganza o redención?
                                    </li>
                                    <li className="bg-gray-900/30 p-3 rounded border border-gray-800">
                                        <strong>¿Cómo aprendió su clase?</strong> ¿Fue un soldado, un aprendiz de mago, o un huérfano que aprendió a robar?
                                    </li>
                                    <li className="bg-gray-900/30 p-3 rounded border border-gray-800">
                                        <strong>¿Familia y Amigos?</strong> ¿Siguen vivos? ¿Se llevan bien?
                                    </li>
                                    <li className="bg-gray-900/30 p-3 rounded border border-gray-800">
                                        <strong>Momentos Clave:</strong> ¿Cuál es el mejor y el peor recuerdo de su vida?
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
