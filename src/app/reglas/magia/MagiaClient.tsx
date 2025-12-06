"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Sparkles, Zap, Target, BookOpen, Users, Wand2, Heart, Shield, Leaf, Sun, Star, GraduationCap, Layers, Flame, Eye, Skull, Battery, HelpCircle, Dice6, Package, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import { SpellcastingBasics } from './SpellcastingBasics';
import { SpellAnatomy } from './SpellAnatomy';
import { ArcaneDivine } from './ArcaneDivine';
import { SchoolsOfMagic } from './SchoolsOfMagic';
import { SpecialAbilities } from './SpecialAbilities';
import { Card, CardContent } from '@/components/ui/Card';

export function MagiaClient() {
    const [activeTab, setActiveTab] = useState('basics');
    const [showAdvanced, setShowAdvanced] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl">
                <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-dungeon-950 via-dungeon-900/90 to-purple-950/30"></div>

                <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Link href="/reglas">
                                <Button variant="ghost" size="sm" className="text-dungeon-400 hover:text-dungeon-200 pl-0">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver a Reglas
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-dungeon-100 leading-tight">
                            Magia y Conjuros
                        </h1>
                        <p className="text-base md:text-lg text-dungeon-300 leading-relaxed">
                            Desde las palabras arcanas de un mago hasta las oraciones devotas de un clerigo, la magia es una fuerza fundamental que altera la realidad.
                        </p>
                    </div>

                    <div className="p-6 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
                        <Sparkles className="h-12 w-12 text-purple-400" />
                    </div>
                </div>
            </div>

            <div className="space-y-8">

                {/* TL;DR - Resumen Rapido (menos intimidante) */}
                <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/20 to-dungeon-900 border-2 border-green-500/40 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-500/20 rounded-full p-2">
                            <Zap className="h-6 w-6 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-400">TL;DR - Magia en 30 Segundos</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-900/30 transition-colors">
                            <Target className="h-8 w-8 text-purple-400 mb-2" />
                            <div className="font-bold text-purple-400 mb-1">Tu magia es mas fuerte...</div>
                            <div className="text-dungeon-400 text-xs">
                                ...cuanto mas alta tu caracteristica (Int/Sab/Car). Esto afecta que tan dificil es resistirla.
                            </div>
                        </div>
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 hover:bg-blue-900/30 transition-colors">
                            <Package className="h-8 w-8 text-blue-400 mb-2" />
                            <div className="font-bold text-blue-400 mb-1">Espacios = Energia</div>
                            <div className="text-dungeon-400 text-xs">
                                Cada conjuro gasta un espacio. Cuando se acaban, debes descansar para recuperarlos.
                            </div>
                        </div>
                        <div className="bg-gold-900/20 border border-gold-500/30 rounded-lg p-4 hover:bg-gold-900/30 transition-colors">
                            <BookOpen className="h-8 w-8 text-gold-400 mb-2" />
                            <div className="font-bold text-gold-400 mb-1">Mago = Preparar</div>
                            <div className="text-dungeon-400 text-xs">
                                Estudia su libro cada manana y elige que conjuros llevar ese dia.
                            </div>
                        </div>
                        <div className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-4 hover:bg-pink-900/30 transition-colors">
                            <Sparkles className="h-8 w-8 text-pink-400 mb-2" />
                            <div className="font-bold text-pink-400 mb-1">Hechicero = Espontaneo</div>
                            <div className="text-dungeon-400 text-xs">
                                Conoce pocos conjuros pero puede lanzar cualquiera sin preparar.
                            </div>
                        </div>
                    </div>

                    {/* Ejemplo Visual Simplificado */}
                    <div className="mt-6 bg-dungeon-950/50 border border-dungeon-700 rounded-lg p-4">
                        <div className="text-sm text-dungeon-400 mb-2 flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            <span>Ejemplo: Lanzas Bola de Fuego. El enemigo debe tirar para resistir.</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                            <span className="text-dungeon-400">Si tu enemigo saca menos que</span>
                            <span className="bg-green-900/40 border border-green-500/50 px-4 py-1 rounded font-bold text-green-400">tu CD</span>
                            <span className="text-dungeon-400">recibe todo el dano.</span>
                        </div>
                        <p className="text-xs text-dungeon-500 mt-2">La CD depende de tu nivel y tu caracteristica principal. Mas adelante te explicamos como calcularla.</p>
                    </div>
                </div>

                {/* HOOK - What can magic do for you? */}
                <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-dungeon-900 border-2 border-purple-500/40 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-purple-500/20 rounded-full p-2">
                            <Sparkles className="h-6 w-6 text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-purple-300">Con la magia puedes...</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-3 text-center hover:bg-red-900/40 transition-colors">
                            <Flame className="h-8 w-8 text-red-400 mx-auto mb-2" />
                            <span className="text-red-200 font-medium">Lanzar bolas de fuego</span>
                        </div>
                        <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3 text-center hover:bg-green-900/40 transition-colors">
                            <Heart className="h-8 w-8 text-green-400 mx-auto mb-2" />
                            <span className="text-green-200 font-medium">Curar heridas mortales</span>
                        </div>
                        <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3 text-center hover:bg-blue-900/40 transition-colors">
                            <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                            <span className="text-blue-200 font-medium">Volverte invisible</span>
                        </div>
                        <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 text-center hover:bg-purple-900/40 transition-colors">
                            <Skull className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                            <span className="text-purple-200 font-medium">Controlar mentes</span>
                        </div>
                    </div>
                </div>

                {/* 3 SIMPLE STEPS - Beginner friendly */}
                <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-dungeon-900/50">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                            <HelpCircle className="h-5 w-5" />
                            Las 3 preguntas de todo lanzador
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Step 1 */}
                            <div className="bg-dungeon-950/50 p-4 rounded-lg border-2 border-purple-500/30 relative">
                                <div className="absolute -top-3 -left-3 bg-purple-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">1</div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Battery className="h-5 w-5 text-purple-400" />
                                    <strong className="text-purple-300">¿Tengo energia?</strong>
                                </div>
                                <p className="text-dungeon-300 text-sm">
                                    Tus <span className="text-purple-300 font-medium">Espacios de Conjuro</span> son tu reserva de energia magica.
                                    Cuando se agotan, necesitas descansar para recuperarlos.
                                </p>
                                <div className="mt-2 text-xs text-dungeon-500">
                                    Piensa en ellos como tu stamina magica.
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-dungeon-950/50 p-4 rounded-lg border-2 border-blue-500/30 relative">
                                <div className="absolute -top-3 -left-3 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">2</div>
                                <div className="flex items-center gap-2 mb-2">
                                    <BookOpen className="h-5 w-5 text-blue-400" />
                                    <strong className="text-blue-300">¿Que conjuro uso?</strong>
                                </div>
                                <p className="text-dungeon-300 text-sm">
                                    Cada conjuro tiene un <span className="text-blue-300 font-medium">nivel</span> (0-9).
                                    Los de nivel alto son mas poderosos pero gastan mas energia.
                                </p>
                                <div className="mt-2 text-xs text-dungeon-500">
                                    Conjuros de nivel 0 tambien gastan espacios.
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-dungeon-950/50 p-4 rounded-lg border-2 border-gold-500/30 relative">
                                <div className="absolute -top-3 -left-3 bg-gold-500 text-dungeon-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">3</div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Dice6 className="h-5 w-5 text-gold-400" />
                                    <strong className="text-gold-300">¿Funciona?</strong>
                                </div>
                                <p className="text-dungeon-300 text-sm">
                                    Algunos conjuros piden una <span className="text-gold-300 font-medium">tirada de ataque</span>.
                                    Otros hacen que el enemigo tire para <span className="text-gold-300 font-medium">resistir</span>.
                                </p>
                                <div className="mt-2 text-xs text-dungeon-500">
                                    Tu clase te dira cual usar en cada caso.
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <p className="text-dungeon-400 text-sm">
                                Eso es todo lo basico. El resto son detalles que aprenderas jugando.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Class Selector - Moved after understanding basics */}
                <Card className="border-gold-500/30 bg-gradient-to-br from-gold-900/10 to-dungeon-900/50">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gold-300 mb-4 flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Elige tu estilo de magia
                        </h3>
                        <p className="text-dungeon-300 mb-4 text-sm">
                            Ahora que entiendes lo basico, elige el tipo de lanzador que te atrae:
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            {/* Mago */}
                            <div className="bg-dungeon-950/40 p-4 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <Wand2 className="h-5 w-5 text-blue-400" />
                                    <strong className="text-blue-300">Mago</strong>
                                </div>
                                <p className="text-dungeon-400 text-xs mb-2">"Quiero el maximo poder y variedad"</p>
                                <ul className="text-dungeon-300 text-xs space-y-1">
                                    <li>Estudias un libro de conjuros</li>
                                    <li>Caracteristica: <span className="text-blue-400">Inteligencia</span></li>
                                    <li>Ideal para: estrategas</li>
                                </ul>
                            </div>

                            {/* Hechicero */}
                            <div className="bg-dungeon-950/40 p-4 rounded-lg border border-pink-500/30 hover:border-pink-500/50 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="h-5 w-5 text-pink-400" />
                                    <strong className="text-pink-300">Hechicero</strong>
                                </div>
                                <p className="text-dungeon-400 text-xs mb-2">"Quiero simplicidad"</p>
                                <ul className="text-dungeon-300 text-xs space-y-1">
                                    <li>Magia innata, sin libros</li>
                                    <li>Caracteristica: <span className="text-pink-400">Carisma</span></li>
                                    <li>Ideal para: principiantes</li>
                                </ul>
                            </div>

                            {/* Clerigo */}
                            <div className="bg-dungeon-950/40 p-4 rounded-lg border border-gold-500/30 hover:border-gold-500/50 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sun className="h-5 w-5 text-gold-400" />
                                    <strong className="text-gold-300">Clerigo</strong>
                                </div>
                                <p className="text-dungeon-400 text-xs mb-2">"Quiero curar y proteger"</p>
                                <ul className="text-dungeon-300 text-xs space-y-1">
                                    <li>Poder divino + armadura</li>
                                    <li>Caracteristica: <span className="text-gold-400">Sabiduria</span></li>
                                    <li>Ideal para: apoyo del grupo</li>
                                </ul>
                            </div>

                            {/* Druida */}
                            <div className="bg-dungeon-950/40 p-4 rounded-lg border border-green-500/30 hover:border-green-500/50 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <Leaf className="h-5 w-5 text-green-400" />
                                    <strong className="text-green-300">Druida</strong>
                                </div>
                                <p className="text-dungeon-400 text-xs mb-2">"Quiero transformarme"</p>
                                <ul className="text-dungeon-300 text-xs space-y-1">
                                    <li>Magia natural + forma animal</li>
                                    <li>Caracteristica: <span className="text-green-400">Sabiduria</span></li>
                                    <li>Ideal para: versatilidad</li>
                                </ul>
                            </div>

                            {/* Bardo */}
                            <div className="bg-dungeon-950/40 p-4 rounded-lg border border-purple-500/30 hover:border-purple-500/50 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <Heart className="h-5 w-5 text-purple-400" />
                                    <strong className="text-purple-300">Bardo</strong>
                                </div>
                                <p className="text-dungeon-400 text-xs mb-2">"Quiero hacer de todo"</p>
                                <ul className="text-dungeon-300 text-xs space-y-1">
                                    <li>Magia + musica + habilidades</li>
                                    <li>Caracteristica: <span className="text-purple-400">Carisma</span></li>
                                    <li>Ideal para: rol social</li>
                                </ul>
                            </div>

                            {/* Paladin */}
                            <div className="bg-dungeon-950/40 p-4 rounded-lg border border-amber-500/30 hover:border-amber-500/50 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield className="h-5 w-5 text-amber-400" />
                                    <strong className="text-amber-300">Paladin</strong>
                                </div>
                                <p className="text-dungeon-400 text-xs mb-2">"Quiero pelear con algo de magia"</p>
                                <ul className="text-dungeon-300 text-xs space-y-1">
                                    <li>Guerrero santo con conjuros</li>
                                    <li>Caracteristica: <span className="text-amber-400">Sabiduria + Carisma</span></li>
                                    <li>Ideal para: tanques</li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-xs text-dungeon-500 mt-4 flex items-center gap-2">
                            <Sparkles className="h-3 w-3" />
                            Consulta las paginas de <Link href="/clases" className="text-gold-400 hover:text-gold-300 underline">clases</Link> para mas detalles.
                        </p>
                    </CardContent>
                </Card>

                {/* Tabs Navigation - Solo 2 esenciales */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('basics')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-colors ${activeTab === 'basics'
                            ? 'bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/30'
                            : 'bg-dungeon-800 text-dungeon-300 hover:bg-dungeon-700'
                            }`}
                    >
                        <Zap className="h-5 w-5" />
                        ¿Como lanzo?
                    </button>
                    <button
                        onClick={() => setActiveTab('anatomy')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-colors ${activeTab === 'anatomy'
                            ? 'bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30'
                            : 'bg-dungeon-800 text-dungeon-300 hover:bg-dungeon-700'
                            }`}
                    >
                        <BookOpen className="h-5 w-5" />
                        ¿Como leo un conjuro?
                    </button>
                </div>

                {/* Content - Solo las 2 tabs esenciales */}
                <div className="space-y-8 text-dungeon-200">
                    {activeTab === 'basics' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SpellcastingBasics onNextTab={() => setActiveTab("anatomy")} />
                        </div>
                    )}

                    {activeTab === 'anatomy' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <SpellAnatomy />
                        </div>
                    )}
                </div>

                {/* Seccion Avanzada - Colapsable */}
                <div className="mt-12 border-t border-dungeon-700 pt-8">
                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="w-full flex items-center justify-between bg-dungeon-800/50 hover:bg-dungeon-800 rounded-lg p-4 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <GraduationCap className="h-5 w-5 text-dungeon-400 group-hover:text-gold-400 transition-colors" />
                            <span className="text-dungeon-300 group-hover:text-dungeon-100 transition-colors">
                                Para curiosos: Escuelas, tipos de magia y mas
                            </span>
                        </div>
                        {showAdvanced ? (
                            <ChevronUp className="h-5 w-5 text-dungeon-400" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-dungeon-400" />
                        )}
                    </button>

                    {showAdvanced && (
                        <div className="mt-6 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
                            {/* Mini-nav para secciones avanzadas */}
                            <div className="flex flex-wrap gap-2 text-sm">
                                <a href="#arcane-divine" className="px-3 py-1 bg-gold-900/30 border border-gold-500/30 rounded text-gold-300 hover:bg-gold-900/50 transition-colors">
                                    Arcana vs Divina
                                </a>
                                <a href="#schools" className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded text-cyan-300 hover:bg-cyan-900/50 transition-colors">
                                    Las 8 Escuelas
                                </a>
                                <a href="#special" className="px-3 py-1 bg-green-900/30 border border-green-500/30 rounded text-green-300 hover:bg-green-900/50 transition-colors">
                                    Habilidades Especiales
                                </a>
                            </div>

                            {/* Arcana vs Divina */}
                            <div id="arcane-divine">
                                <h3 className="text-lg font-bold text-gold-400 mb-4 flex items-center gap-2">
                                    <Layers className="h-5 w-5" />
                                    Magia Arcana vs Divina
                                </h3>
                                <ArcaneDivine />
                            </div>

                            {/* Las 8 Escuelas */}
                            <div id="schools">
                                <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5" />
                                    Las 8 Escuelas de Magia
                                </h3>
                                <SchoolsOfMagic />
                            </div>

                            {/* Habilidades Especiales */}
                            <div id="special">
                                <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                                    <Star className="h-5 w-5" />
                                    Habilidades Especiales
                                </h3>
                                <SpecialAbilities />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
