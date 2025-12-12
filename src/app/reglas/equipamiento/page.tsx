"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Backpack, Coins, Sword, Shield, Package, Scale, Info, Clock, Hammer, CircleDollarSign, AlertTriangle, HelpCircle, Zap, Target, Crosshair, Ruler, Sparkles, BookOpen, Lightbulb, Star, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function EquipamientoPage() {
    const [activeTab, setActiveTab] = useState('general');

    return (
        <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl mb-12">
                <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/90 to-gray-950/50"></div>

                <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Link href="/reglas">
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200 pl-0">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver a Reglas
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-100 leading-tight">
                            Equipamiento
                        </h1>
                        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                            Todo lo que necesitas saber sobre riqueza, armas y armaduras para sobrevivir a tus aventuras.
                        </p>
                    </div>

                    <div className="p-6 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm">
                        <Backpack className="h-12 w-12 text-amber-500" />
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700 pb-1">
                <button
                    onClick={() => setActiveTab('general')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${activeTab === 'general'
                        ? 'bg-amber-500 text-gray-900 font-bold'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                >
                    <Coins className="h-4 w-4" />
                    Economía y general
                </button>
                <button
                    onClick={() => setActiveTab('armas')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${activeTab === 'armas'
                        ? 'bg-red-500 text-gray-100 font-bold'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                >
                    <Sword className="h-4 w-4" />
                    Armas
                </button>
                <button
                    onClick={() => setActiveTab('armaduras')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${activeTab === 'armaduras'
                        ? 'bg-blue-500 text-gray-100 font-bold'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                >
                    <Shield className="h-4 w-4" />
                    Armaduras
                </button>
            </div>

            {/* Content */}
            <div className="space-y-8 text-gray-200">
                {activeTab === 'general' && (
                    <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* TL;DR - Lo básico para principiantes */}
                        <Card className="card border-green-500/30 bg-gradient-to-r from-green-900/20 to-gray-900">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-green-400">
                                    <Sparkles className="h-5 w-5" />
                                    Lo Básico (TL;DR)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4 text-sm">
                                    ¿Primera vez con el dinero en D&D? Esto es lo esencial:
                                </p>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex items-start gap-3">
                                        <div className="bg-amber-500/20 p-2 rounded-full shrink-0">
                                            <Coins className="h-4 w-4 text-amber-400" />
                                        </div>
                                        <div>
                                            <strong className="text-gray-100 text-sm block">Moneda principal</strong>
                                            <p className="text-xs text-gray-400">La <strong className="text-amber-300">pieza de oro (po)</strong> es el estándar. 10 pp = 1 po = 10 pc.</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex items-start gap-3">
                                        <div className="bg-green-500/20 p-2 rounded-full shrink-0">
                                            <Package className="h-4 w-4 text-green-400" />
                                        </div>
                                        <div>
                                            <strong className="text-gray-100 text-sm block">Inicio rápido</strong>
                                            <p className="text-xs text-gray-400">Usa el <strong className="text-green-300">paquete inicial</strong> de tu clase. Ya viene todo listo.</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex items-start gap-3">
                                        <div className="bg-red-500/20 p-2 rounded-full shrink-0">
                                            <Scale className="h-4 w-4 text-red-400" />
                                        </div>
                                        <div>
                                            <strong className="text-gray-100 text-sm block">Vender botín</strong>
                                            <p className="text-xs text-gray-400">El equipo usado se vende al <strong className="text-red-300">50%</strong>. Las gemas y arte al 100%.</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex items-start gap-3">
                                        <div className="bg-blue-500/20 p-2 rounded-full shrink-0">
                                            <Info className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <strong className="text-gray-100 text-sm block">Disponibilidad</strong>
                                            <p className="text-xs text-gray-400">Objetos caros (+3,000 po) solo en <strong className="text-blue-300">ciudades grandes</strong>.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-amber-900/20 rounded-lg border border-amber-500/30">
                                    <p className="text-sm flex items-start gap-2">
                                        <BookOpen className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                                        <span>
                                            <strong className="text-amber-400">Consejo para empezar:</strong> Un <span className="text-red-400">guerrero</span> empieza con ~150 po (suficiente para cota de mallas + espada). Un <span className="text-blue-400">mago</span> solo ~75 po pero no necesita armadura.
                                        </span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Equipamiento Inicial */}
                        <Card className="card border-amber-500/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-amber-400">
                                    <Package className="h-5 w-5" />
                                    Equipando a un personaje
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p>
                                    Un personaje recién creado suele comenzar con lo básico: un arma, una armadura sencilla y una mochila con provisiones. A medida que completes aventuras, encontrarás tesoros que te permitirán comprar mejor equipo.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-green-500 hover:bg-gray-800/50 transition-colors">
                                        <strong className="text-green-400 block mb-2 text-base flex items-center gap-2">
                                            <span className="bg-green-500/20 px-2 py-0.5 rounded text-xs">RÁPIDO</span>
                                            Paquetes iniciales
                                        </strong>
                                        <p className="text-sm mb-2">
                                            Es la opción más rápida. Cada clase tiene un "kit" predefinido que incluye todo lo necesario para empezar a jugar.
                                        </p>
                                        <div className="text-xs text-gray-400 space-y-1 border-t border-gray-700 pt-2">
                                            <p><strong className="text-green-300">Incluye:</strong> Armas, armadura, mochila, saco de dormir, antorchas...</p>
                                            <p><strong className="text-green-300">Personalizable:</strong> Intercambia objetos por otros de igual valor</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-purple-500 hover:bg-gray-800/50 transition-colors">
                                        <strong className="text-purple-400 block mb-2 text-base flex items-center gap-2">
                                            <span className="bg-purple-500/20 px-2 py-0.5 rounded text-xs">AVANZADO</span>
                                            Equipo a la carta
                                        </strong>
                                        <p className="text-sm mb-2">
                                            Para jugadores que quieren control total. Tiras dados para tu oro y compras cada objeto por separado.
                                        </p>
                                        <div className="text-xs text-gray-400 space-y-1 border-t border-gray-700 pt-2">
                                            <p><strong className="text-purple-300">Ventaja:</strong> Personalización exacta de tu equipamiento</p>
                                            <p><strong className="text-purple-300">Desventaja:</strong> Requiere más tiempo y conocimiento</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Coins className="h-5 w-5 text-amber-400" />
                                        <h4 className="font-bold text-amber-300 text-sm uppercase tracking-wider">Oro inicial aleatorio por clase</h4>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-3 bg-gray-800/30 p-2 rounded">
                                        <strong className="text-gray-300">¿Cómo funciona?</strong> Tira los dados indicados y multiplica. El número entre paréntesis es el promedio.
                                    </p>
                                    <div className="overflow-x-auto bg-gray-900/30 rounded-lg border border-gray-700">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-gray-400 border-b border-gray-700 bg-gray-800/50 text-xs">
                                                <tr>
                                                    <th className="py-2 px-4 text-red-400">Clase</th>
                                                    <th className="py-2 px-4 text-amber-400">Oro inicial</th>
                                                    <th className="py-2 px-4 border-l border-gray-600 text-blue-400">Clase</th>
                                                    <th className="py-2 px-4 text-amber-400">Oro inicial</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-800">
                                                <tr className="hover:bg-gray-800/30">
                                                    <td className="py-2 px-4 text-red-300">Bárbaro</td>
                                                    <td className="py-2 px-4"><span className="text-amber-300">4d4 × 10</span> <span className="text-gray-500">(~100 po)</span></td>
                                                    <td className="py-2 px-4 border-l border-gray-600 text-blue-300">Monje</td>
                                                    <td className="py-2 px-4"><span className="text-amber-300">5d4</span> <span className="text-gray-500">(~12 po)</span></td>
                                                </tr>
                                                <tr className="hover:bg-gray-800/30">
                                                    <td className="py-2 px-4 text-red-300">Bardo</td>
                                                    <td className="py-2 px-4"><span className="text-amber-300">4d4 × 10</span> <span className="text-gray-500">(~100 po)</span></td>
                                                    <td className="py-2 px-4 border-l border-gray-600 text-blue-300">Paladín</td>
                                                    <td className="py-2 px-4"><span className="text-amber-300 font-bold">6d4 × 10</span> <span className="text-green-400">(~150 po)</span></td>
                                                </tr>
                                                <tr className="hover:bg-gray-800/30">
                                                    <td className="py-2 px-4 text-red-300">Clérigo</td>
                                                    <td className="py-2 px-4"><span className="text-amber-300">5d4 × 10</span> <span className="text-gray-500">(~125 po)</span></td>
                                                    <td className="py-2 px-4 border-l border-gray-600 text-blue-300">Explorador</td>
                                                    <td className="py-2 px-4"><span className="text-amber-300 font-bold">6d4 × 10</span> <span className="text-green-400">(~150 po)</span></td>
                                                </tr>
                                                <tr className="hover:bg-gray-800/30">
                                                    <td className="py-2 px-4 text-red-300">Druida</td>
                                                    <td className="py-2 px-4"><span className="text-amber-300">2d4 × 10</span> <span className="text-red-400">(~50 po)</span></td>
                                                    <td className="py-2 px-4 border-l border-gray-600 text-blue-300">Pícaro</td>
                                                    <td className="py-2 px-4"><span className="text-amber-300">5d4 × 10</span> <span className="text-gray-500">(~125 po)</span></td>
                                                </tr>
                                                <tr className="hover:bg-gray-800/30">
                                                    <td className="py-2 px-4 text-red-300">Guerrero</td>
                                                    <td className="py-2 px-4"><span className="text-amber-300 font-bold">6d4 × 10</span> <span className="text-green-400">(~150 po)</span></td>
                                                    <td className="py-2 px-4 border-l border-gray-600 text-blue-300">Hechicero/Mago</td>
                                                    <td className="py-2 px-4"><span className="text-amber-300">3d4 × 10</span> <span className="text-red-400">(~75 po)</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 italic flex items-start gap-1">
                                        <Lightbulb className="h-3 w-3 text-amber-400 mt-0.5 shrink-0" />
                                        Los guerreros, paladines y exploradores empiezan con más oro porque necesitan comprar armas y armaduras caras.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3 bg-amber-900/10 p-4 rounded border border-amber-500/20">
                                    <Info className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                                    <div className="text-sm">
                                        <strong className="text-amber-400 block mb-1">Disponibilidad de objetos</strong>
                                        No todos los objetos están disponibles en todas partes. En una <span className="text-red-400">aldea pequeña</span> será difícil encontrar armaduras completas. Para objetos de más de <strong className="text-amber-300">3,000 po</strong>, necesitarás viajar a una <span className="text-green-400">gran ciudad</span>.
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Economía */}
                        <Card className="card border-amber-500/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-amber-400">
                                    <CircleDollarSign className="h-5 w-5" />
                                    Economía
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p>
                                    La moneda estándar de D&D es la <strong>Pieza de Oro (po)</strong>. Aunque los plebeyos suelen usar plata o cobre para sus transacciones diarias, los aventureros manejan sumas mayores.
                                </p>

                                {/* Monedas visuales */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Coins className="h-5 w-5 text-amber-400" />
                                        <h4 className="font-bold text-amber-300 text-sm">Las 4 monedas de D&D</h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                        <div className="bg-gradient-to-br from-orange-900/30 to-gray-900 p-3 rounded-lg border border-orange-500/30 text-center hover:border-orange-500/60 transition-colors">
                                            <Circle className="h-6 w-6 text-orange-600 mx-auto mb-1 fill-orange-800" />
                                            <strong className="text-orange-400 text-sm block">Cobre (pc)</strong>
                                            <p className="text-xs text-gray-400">La más común</p>
                                            <p className="text-xs text-orange-300 mt-1">100 pc = 1 po</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-slate-800/50 to-gray-900 p-3 rounded-lg border border-slate-400/30 text-center hover:border-slate-400/60 transition-colors">
                                            <Circle className="h-6 w-6 text-slate-300 mx-auto mb-1 fill-slate-500" />
                                            <strong className="text-slate-300 text-sm block">Plata (pp)</strong>
                                            <p className="text-xs text-gray-400">Uso cotidiano</p>
                                            <p className="text-xs text-slate-300 mt-1">10 pp = 1 po</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-amber-900/30 to-gray-900 p-3 rounded-lg border border-amber-500/50 text-center hover:border-amber-500 transition-colors">
                                            <Circle className="h-6 w-6 text-amber-400 mx-auto mb-1 fill-amber-600" />
                                            <strong className="text-amber-400 text-sm block">Oro (po)</strong>
                                            <p className="text-xs text-gray-400 flex items-center justify-center gap-1">El estándar <Star className="h-3 w-3 text-amber-400 fill-amber-400" /></p>
                                            <p className="text-xs text-amber-300 mt-1">Moneda base</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-slate-600/30 to-gray-900 p-3 rounded-lg border border-slate-300/30 text-center hover:border-slate-300/60 transition-colors">
                                            <Circle className="h-6 w-6 text-slate-200 mx-auto mb-1 fill-slate-400" />
                                            <strong className="text-slate-200 text-sm block">Platino (ppt)</strong>
                                            <p className="text-xs text-gray-400">La más rara</p>
                                            <p className="text-xs text-slate-200 mt-1">1 ppt = 10 po</p>
                                        </div>
                                    </div>

                                    {/* Tabla de conversión */}
                                    <div className="bg-gray-800/30 p-3 rounded-lg text-xs">
                                        <p className="text-gray-300 mb-2 flex items-center gap-1"><Lightbulb className="h-3 w-3 text-amber-400" /><strong className="text-amber-400">Conversión rápida:</strong></p>
                                        <div className="font-mono text-center">
                                            <span className="text-orange-400">1,000 pc</span> = <span className="text-slate-300">100 pp</span> = <span className="text-amber-400 font-bold">10 po</span> = <span className="text-slate-200">1 ppt</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-blue-500">
                                        <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                                            <Scale className="h-4 w-4" />
                                            Comercio y trueque
                                        </h4>
                                        <p className="text-sm mb-3">
                                            Llevar miles de monedas pesa mucho. Usa <strong className="text-blue-300">bienes comerciales</strong> (gemas, joyas, arte) que mantienen su valor y son fáciles de transportar.
                                        </p>
                                        <div className="bg-gray-900/50 rounded border border-gray-700 p-3 text-xs">
                                            <p className="text-gray-400 mb-2 text-[10px] uppercase tracking-wider">Valores de referencia:</p>
                                            <ul className="space-y-1">
                                                <li className="flex justify-between hover:bg-gray-800/30 px-1 rounded"><span>1 lb. de trigo</span> <span className="text-orange-300">1 pc</span></li>
                                                <li className="flex justify-between hover:bg-gray-800/30 px-1 rounded"><span>1 lb. de hierro</span> <span className="text-slate-300">1 pp</span></li>
                                                <li className="flex justify-between hover:bg-gray-800/30 px-1 rounded"><span>1 cabra</span> <span className="text-amber-300">1 po</span></li>
                                                <li className="flex justify-between hover:bg-gray-800/30 px-1 rounded"><span>1 lb. de oro en lingotes</span> <span className="text-amber-300">50 po</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-red-500">
                                        <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                                            <Package className="h-4 w-4" />
                                            Venta de botín
                                        </h4>
                                        <p className="text-sm mb-3">
                                            Al vender equipo encontrado en un dungeon, los comerciantes no pagan el precio completo.
                                        </p>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-3 bg-red-900/20 p-2 rounded border border-red-500/30">
                                                <span className="bg-red-500/30 text-red-300 font-bold px-2 py-1 rounded text-lg">50%</span>
                                                <span className="text-xs">Equipo usado (armas, armaduras, escudos...)</span>
                                            </div>
                                            <div className="flex items-center gap-3 bg-green-900/20 p-2 rounded border border-green-500/30">
                                                <span className="bg-green-500/30 text-green-300 font-bold px-2 py-1 rounded text-lg">100%</span>
                                                <span className="text-xs">Gemas, arte, bienes comerciales</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Link al catálogo general */}
                        <Card className="card border-gold-500/30 bg-gradient-to-r from-gold-900/20 to-gray-900">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gold-400 mb-1 flex items-center gap-2">
                                            <Backpack className="h-5 w-5" />
                                            ¿Listo para equipar a tu personaje?
                                        </h3>
                                        <p className="text-gray-300 text-sm">
                                            Explora nuestro catálogo de objetos: armas, armaduras, equipo de aventurero y más.
                                        </p>
                                    </div>
                                    <Link href="/objetos">
                                        <Button className="bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold">
                                            <Backpack className="h-4 w-4 mr-2" />
                                            Ver catálogo de objetos
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === 'armas' && (
                    <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* TL;DR - Lo básico para principiantes */}
                        <Card className="card border-green-500/30 bg-gradient-to-r from-green-900/20 to-gray-900">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-green-400">
                                    <Sparkles className="h-5 w-5" />
                                    Lo Básico (TL;DR)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4 text-sm">
                                    ¿Primera vez? Esto es lo que <strong>realmente necesitas saber</strong>:
                                </p>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex items-start gap-3">
                                        <div className="bg-red-500/20 p-2 rounded-full shrink-0">
                                            <Sword className="h-4 w-4 text-red-400" />
                                        </div>
                                        <div>
                                            <strong className="text-gray-100 text-sm block">Tipo de arma</strong>
                                            <p className="text-xs text-gray-400">Simple, Marcial o Exótica. Si no la sabes usar, -4 al ataque.</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex items-start gap-3">
                                        <div className="bg-amber-500/20 p-2 rounded-full shrink-0">
                                            <Zap className="h-4 w-4 text-amber-400" />
                                        </div>
                                        <div>
                                            <strong className="text-gray-100 text-sm block">Daño</strong>
                                            <p className="text-xs text-gray-400">Ej: 1d8 = tiras 1 dado de 8 caras + tu bonificador de Fuerza.</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex items-start gap-3">
                                        <div className="bg-purple-500/20 p-2 rounded-full shrink-0">
                                            <Target className="h-4 w-4 text-purple-400" />
                                        </div>
                                        <div>
                                            <strong className="text-gray-100 text-sm block">Crítico</strong>
                                            <p className="text-xs text-gray-400">19-20/x2 = crítico con 19 o 20, el daño se duplica.</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex items-start gap-3">
                                        <div className="bg-blue-500/20 p-2 rounded-full shrink-0">
                                            <Crosshair className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <strong className="text-gray-100 text-sm block">Alcance</strong>
                                            <p className="text-xs text-gray-400">30 pies = disparo normal. Más lejos = -2 por cada 30 pies extra.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-amber-900/20 rounded-lg border border-amber-500/30">
                                    <p className="text-sm flex items-start gap-2">
                                        <BookOpen className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                                        <span>
                                            <strong className="text-amber-400">Consejo para empezar:</strong> Si eres guerrero, la <span className="text-red-400">espada larga</span> (1d8, 19-20/x2) es versátil y efectiva. Si eres mago y necesitas defenderte, un <span className="text-green-400">bastón</span> (1d6, x2) es simple y no cuesta nada.
                                        </span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Clasificación */}
                        <Card className="card border-red-500/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-red-400">
                                    <Sword className="h-5 w-5" />
                                    Clasificación de armas
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p>
                                    No todas las armas son iguales. Algunas son herramientas simples que cualquiera puede usar, mientras que otras requieren años de entrenamiento especializado.
                                </p>
                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                    <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-green-500 hover:bg-gray-800/50 transition-colors">
                                        <strong className="text-green-400 block mb-2 text-base flex items-center gap-2">
                                            <span className="bg-green-500/20 px-2 py-0.5 rounded text-xs">FÁCIL</span>
                                            Sencillas
                                        </strong>
                                        <p className="mb-3">Armas de uso intuitivo. Casi todas las clases saben usarlas.</p>
                                        <div className="text-xs text-gray-400 space-y-1 border-t border-gray-700 pt-2">
                                            <p><strong className="text-green-300">Ejemplos:</strong> Daga, Garrote, Lanza, Ballesta ligera, Honda</p>
                                            <p><strong className="text-green-300">Quién las usa:</strong> Todos excepto magos y hechiceros</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-red-500 hover:bg-gray-800/50 transition-colors">
                                        <strong className="text-red-400 block mb-2 text-base flex items-center gap-2">
                                            <span className="bg-red-500/20 px-2 py-0.5 rounded text-xs">MILITAR</span>
                                            Marciales
                                        </strong>
                                        <p className="mb-3">Armas de guerra. Requieren entrenamiento específico.</p>
                                        <div className="text-xs text-gray-400 space-y-1 border-t border-gray-700 pt-2">
                                            <p><strong className="text-red-300">Ejemplos:</strong> Espada larga, Hacha de batalla, Arco largo, Alabarda</p>
                                            <p><strong className="text-red-300">Quién las usa:</strong> Guerreros, Paladines, Bárbaros, Exploradores</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-purple-500 hover:bg-gray-800/50 transition-colors">
                                        <strong className="text-purple-400 block mb-2 text-base flex items-center gap-2">
                                            <span className="bg-purple-500/20 px-2 py-0.5 rounded text-xs">DOTE</span>
                                            Exóticas
                                        </strong>
                                        <p className="mb-3">Armas complejas. Necesitas gastar una dote para usarlas.</p>
                                        <div className="text-xs text-gray-400 space-y-1 border-t border-gray-700 pt-2">
                                            <p><strong className="text-purple-300">Ejemplos:</strong> Espada bastarda, Cadena armada, Kukri, Shuriken</p>
                                            <p><strong className="text-purple-300">Dote requerida:</strong> "Competencia con arma exótica"</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold text-red-300 mb-3 border-b border-red-500/20 pb-1">Categorías de uso</h4>
                                        <ul className="space-y-3 text-sm">
                                            <li>
                                                <strong className="text-gray-100 block">Cuerpo a cuerpo vs A distancia</strong>
                                                Las armas cuerpo a cuerpo se usan adyacentes al enemigo. Las armas a distancia atacan desde lejos.
                                            </li>
                                            <li>
                                                <strong className="text-gray-100 block">Alcance (Reach)</strong>
                                                Armas largas (como lanzas) que permiten atacar a enemigos a 10 pies de distancia, golpeándolos antes de que se acerquen a ti.
                                            </li>
                                            <li>
                                                <strong className="text-gray-100 block">Arrojadizas vs Proyectil</strong>
                                                Las arrojadizas (hachas de mano, jabalinas) suman tu Fuerza al daño. Las de proyectil (arcos, ballestas) generalmente no, pero tienen mucho mayor alcance.
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-red-300 mb-3 border-b border-red-500/20 pb-1">Esfuerzo y tamaño</h4>
                                        <ul className="space-y-3 text-sm">
                                            <li>
                                                <strong className="text-gray-100 block">Ligeras</strong>
                                                Se pueden usar en una sola mano y son ideales para combatir con dos armas (usándola en la mano torpe).
                                            </li>
                                            <li>
                                                <strong className="text-gray-100 block">A dos manos</strong>
                                                Requieren ambas manos para usarse, por lo que no puedes llevar escudo. A cambio, haces mucho más daño (x1.5 tu bonificador de Fuerza).
                                            </li>
                                            <li className="bg-red-900/10 p-2 rounded border border-red-500/20 text-xs">
                                                <strong>Nota sobre tamaño:</strong> Las armas están hechas para un tamaño específico (Pequeño, Mediano). Si un humano intenta usar una espada de ogro (Grande), tendrá un penalizador de -2 al ataque por la diferencia de tamaño.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 bg-red-900/10 p-3 rounded border border-red-500/20 text-sm">
                                    <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                                    <span>
                                        <strong>Armas improvisadas:</strong> A veces tienes que pelear con lo que tienes a mano (una silla, una botella rota). Como no están equilibradas para el combate, tienes un penalizador de <strong>-4 al ataque</strong>.
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Estadísticas */}
                        <Card className="card border-red-500/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-red-400">
                                    <Info className="h-5 w-5" />
                                    Entendiendo las estadísticas
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                {/* Ejemplo visual de cómo leer stats de un arma */}
                                <div className="bg-gradient-to-r from-red-900/30 to-gray-900 p-4 rounded-lg border border-red-500/30">
                                    <p className="text-sm text-gray-300 mb-3">
                                        <strong className="text-red-400 flex items-center gap-1"><BookOpen className="h-4 w-4" /> Ejemplo: ¿Cómo leer las estadísticas de una espada larga?</strong>
                                    </p>
                                    <div className="bg-gray-800/80 p-3 rounded-lg text-sm font-mono mb-3">
                                        <span className="text-gray-100">Espada larga:</span> <span className="text-amber-400">15 po</span> | <span className="text-red-400">1d8</span> | <span className="text-purple-400">19-20/x2</span> | <span className="text-blue-400">3 lb</span> | <span className="text-green-400">Cortante</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                                        <div className="flex items-center gap-1"><Coins className="h-3 w-3 text-amber-400" /><span className="text-gray-400">Precio</span></div>
                                        <div className="flex items-center gap-1"><Zap className="h-3 w-3 text-red-400" /><span className="text-gray-400">Daño base</span></div>
                                        <div className="flex items-center gap-1"><Target className="h-3 w-3 text-purple-400" /><span className="text-gray-400">Crítico</span></div>
                                        <div className="flex items-center gap-1"><Scale className="h-3 w-3 text-blue-400" /><span className="text-gray-400">Peso</span></div>
                                        <div className="flex items-center gap-1"><Sword className="h-3 w-3 text-green-400" /><span className="text-gray-400">Tipo daño</span></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                    <div className="space-y-4">
                                        <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Target className="h-5 w-5 text-purple-400" />
                                                <strong className="text-red-400">Crítico (Ej: 19-20/x2)</strong>
                                            </div>
                                            <p className="text-gray-300 text-sm mb-2">
                                                <strong className="text-purple-300">Rango:</strong> Qué sacas en d20 para amenazar (19-20 = con 19 o 20).
                                            </p>
                                            <p className="text-gray-300 text-sm">
                                                <strong className="text-purple-300">Multiplicador:</strong> Por cuánto multiplicas el daño (x2 = daño doble).
                                            </p>
                                            <div className="mt-2 p-2 bg-purple-900/20 rounded text-xs">
                                                <strong>Comparación:</strong> Espada larga (19-20/x2) vs Hacha de guerra (x3). La espada critica más seguido, el hacha hace más daño al criticar.
                                            </div>
                                        </div>
                                        <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Crosshair className="h-5 w-5 text-blue-400" />
                                                <strong className="text-red-400">Incremento de distancia</strong>
                                            </div>
                                            <p className="text-gray-300 text-sm">
                                                Cada "incremento" extra = <strong className="text-blue-400">-2 al ataque</strong>.
                                            </p>
                                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                                <div className="bg-blue-900/20 p-2 rounded">
                                                    <strong className="text-blue-300">Arrojadizas:</strong> Máx 5 incrementos
                                                </div>
                                                <div className="bg-blue-900/20 p-2 rounded">
                                                    <strong className="text-blue-300">Proyectil:</strong> Máx 10 incrementos
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Zap className="h-5 w-5 text-green-400" />
                                                <strong className="text-red-400">Tipo de daño</strong>
                                            </div>
                                            <p className="text-gray-300 text-sm mb-2">
                                                ¡Importante contra ciertos monstruos! Los esqueletos resisten todo menos contundente.
                                            </p>
                                            <div className="grid grid-cols-3 gap-2 text-xs">
                                                <div className="bg-amber-900/20 p-2 rounded text-center">
                                                    <Hammer className="h-4 w-4 mx-auto text-amber-400 mb-1" />
                                                    <span className="text-amber-300">Contundente</span>
                                                    <p className="text-gray-500">Mazas</p>
                                                </div>
                                                <div className="bg-blue-900/20 p-2 rounded text-center">
                                                    <Crosshair className="h-4 w-4 mx-auto text-blue-400 mb-1" />
                                                    <span className="text-blue-300">Perforante</span>
                                                    <p className="text-gray-500">Lanzas</p>
                                                </div>
                                                <div className="bg-red-900/20 p-2 rounded text-center">
                                                    <Sword className="h-4 w-4 mx-auto text-red-400 mb-1" />
                                                    <span className="text-red-300">Cortante</span>
                                                    <p className="text-gray-500">Espadas</p>
                                                </div>
                                            </div>
                                            <div className="mt-2 p-2 bg-red-900/10 rounded border border-red-500/20 text-xs">
                                                <strong className="text-red-400">Tipos múltiples:</strong> Estrella matutina = contundente Y perforante. Daga = perforar O cortar (tú eliges).
                                            </div>
                                        </div>
                                        <div className="bg-amber-900/10 p-3 rounded-lg border border-amber-500/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Sparkles className="h-5 w-5 text-amber-400" />
                                                <strong className="text-amber-400">Gran Calidad (Masterwork)</strong>
                                            </div>
                                            <p className="text-gray-300 text-xs">
                                                Cuesta <strong className="text-amber-300">+300 po extra</strong> pero te da <strong className="text-green-400">+1 al ataque</strong> (no al daño). Ideal para armas que ya tienes competencia.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Ruler className="h-5 w-5 text-red-400" />
                                        <h4 className="font-bold text-red-300 text-sm">Daño según tamaño (Tabla 7-4)</h4>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-3 bg-gray-800/30 p-2 rounded">
                                        <strong className="text-gray-300">¿Eres Gnomo o Mediano?</strong> Tu espada hace menos daño porque es más pequeña. ¿Eres un ogro? Hace más daño. Esta tabla te muestra cómo cambia.
                                    </p>
                                    <div className="overflow-x-auto bg-gray-900/30 rounded-lg border border-gray-700">
                                        <table className="w-full text-sm text-center">
                                            <thead className="text-gray-400 bg-gray-800/50 text-xs">
                                                <tr>
                                                    <th className="py-2 px-3 text-amber-400 font-bold">Mediana ⚔️</th>
                                                    <th className="py-2 px-3 text-green-400">Pequeña ↓</th>
                                                    <th className="py-2 px-3 text-red-400">Grande ↑</th>
                                                    <th className="py-2 px-3 border-l border-gray-600 text-amber-400 font-bold">Mediana ⚔️</th>
                                                    <th className="py-2 px-3 text-green-400">Pequeña ↓</th>
                                                    <th className="py-2 px-3 text-red-400">Grande ↑</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-800 text-gray-300">
                                                <tr className="hover:bg-gray-800/30">
                                                    <td className="py-2 px-3 font-bold text-amber-200 bg-amber-900/10">1d2</td><td className="text-green-300">—</td><td className="text-red-300">1d3</td>
                                                    <td className="py-2 px-3 border-l border-gray-600 font-bold text-amber-200 bg-amber-900/10">1d10</td><td className="text-green-300">1d6</td><td className="text-red-300">2d8</td>
                                                </tr>
                                                <tr className="hover:bg-gray-800/30">
                                                    <td className="py-2 px-3 font-bold text-amber-200 bg-amber-900/10">1d3</td><td className="text-green-300">1</td><td className="text-red-300">1d4</td>
                                                    <td className="py-2 px-3 border-l border-gray-600 font-bold text-amber-200 bg-amber-900/10">1d12</td><td className="text-green-300">1d8</td><td className="text-red-300">3d6</td>
                                                </tr>
                                                <tr className="hover:bg-gray-800/30">
                                                    <td className="py-2 px-3 font-bold text-amber-200 bg-amber-900/10">1d4</td><td className="text-green-300">1d2</td><td className="text-red-300">1d6</td>
                                                    <td className="py-2 px-3 border-l border-gray-600 font-bold text-amber-200 bg-amber-900/10">2d4</td><td className="text-green-300">1d4</td><td className="text-red-300">2d6</td>
                                                </tr>
                                                <tr className="hover:bg-gray-800/30">
                                                    <td className="py-2 px-3 font-bold text-amber-200 bg-amber-900/10">1d6</td><td className="text-green-300">1d3</td><td className="text-red-300">1d8</td>
                                                    <td className="py-2 px-3 border-l border-gray-600 font-bold text-amber-200 bg-amber-900/10">2d6</td><td className="text-green-300">1d8</td><td className="text-red-300">3d6</td>
                                                </tr>
                                                <tr className="hover:bg-gray-800/30">
                                                    <td className="py-2 px-3 font-bold text-amber-200 bg-amber-900/10">1d8</td><td className="text-green-300">1d4</td><td className="text-red-300">2d6</td>
                                                    <td className="py-2 px-3 border-l border-gray-600 font-bold text-amber-200 bg-amber-900/10">2d8</td><td className="text-green-300">1d10</td><td className="text-red-300">3d8</td>
                                                </tr>
                                                <tr className="hover:bg-gray-800/30">
                                                    <td className="py-2 px-3" colSpan={3}></td>
                                                    <td className="py-2 px-3 border-l border-gray-600 font-bold text-amber-200 bg-amber-900/10">2d10</td><td className="text-green-300">2d6</td><td className="text-red-300">4d8</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 italic">
                                        Ejemplo: Una espada larga (1d8 mediana) hace 1d4 si la usa un Mediano, o 2d6 si la empuña un ogro.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Link al catálogo de armas */}
                        <Card className="card border-gold-500/30 bg-gradient-to-r from-gold-900/20 to-gray-900">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gold-400 mb-1 flex items-center gap-2">
                                            <Sword className="h-5 w-5" />
                                            ¿Listo para elegir tu arma?
                                        </h3>
                                        <p className="text-gray-300 text-sm">
                                            Explora nuestro catálogo completo con todas las armas del SRD: daños, críticos, precios y más.
                                        </p>
                                    </div>
                                    <Link href="/objetos/armas">
                                        <Button className="bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold">
                                            <Sword className="h-4 w-4 mr-2" />
                                            Ver catálogo de armas
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === 'armaduras' && (
                    <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* TL;DR - Lo básico para principiantes */}
                        <Card className="card border-green-500/30 bg-gradient-to-r from-green-900/20 to-gray-900">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-green-400">
                                    <Sparkles className="h-5 w-5" />
                                    Lo Básico (TL;DR)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4 text-sm">
                                    ¿Primera vez con armaduras? Esto es lo esencial:
                                </p>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex items-start gap-3">
                                        <div className="bg-blue-500/20 p-2 rounded-full shrink-0">
                                            <Shield className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <strong className="text-gray-100 text-sm block">Bonificador CA</strong>
                                            <p className="text-xs text-gray-400">El número que <strong className="text-blue-300">sumas a tu Clase de Armadura</strong>. Más alto = más difícil de golpear.</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex items-start gap-3">
                                        <div className="bg-amber-500/20 p-2 rounded-full shrink-0">
                                            <Zap className="h-4 w-4 text-amber-400" />
                                        </div>
                                        <div>
                                            <strong className="text-gray-100 text-sm block">Máx DES</strong>
                                            <p className="text-xs text-gray-400">Límite de cuánta <strong className="text-amber-300">Destreza puedes sumar</strong> a tu CA con esa armadura.</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex items-start gap-3">
                                        <div className="bg-red-500/20 p-2 rounded-full shrink-0">
                                            <AlertTriangle className="h-4 w-4 text-red-400" />
                                        </div>
                                        <div>
                                            <strong className="text-gray-100 text-sm block">Penalización</strong>
                                            <p className="text-xs text-gray-400">Armaduras pesadas <strong className="text-red-300">penalizan</strong> Sigilo, Trepar, Nadar...</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex items-start gap-3">
                                        <div className="bg-purple-500/20 p-2 rounded-full shrink-0">
                                            <Sparkles className="h-4 w-4 text-purple-400" />
                                        </div>
                                        <div>
                                            <strong className="text-gray-100 text-sm block">Fallo Arcano</strong>
                                            <p className="text-xs text-gray-400">Los <strong className="text-purple-300">magos fallan conjuros</strong> con armadura. Cota de mallas = 30% fallo.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-amber-900/20 rounded-lg border border-amber-500/30">
                                    <p className="text-sm flex items-start gap-2">
                                        <BookOpen className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                                        <span>
                                            <strong className="text-amber-400">Consejo para empezar:</strong> Si eres <span className="text-red-400">guerrero</span>, una cota de mallas (+5 CA, 150 po) es accesible. Si eres <span className="text-green-400">pícaro</span>, cuero tachonado (+3 CA, 25 po) no penaliza tu Sigilo.
                                        </span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Clasificación */}
                        <Card className="card border-blue-500/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-400">
                                    <Shield className="h-5 w-5" />
                                    Clasificación de armaduras
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p>
                                    Las armaduras protegen de los golpes, pero las más pesadas limitan tu agilidad. Escoger la armadura adecuada es un equilibrio entre protección y movilidad.
                                </p>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                    <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-green-500 hover:bg-gray-800/50 transition-colors">
                                        <strong className="text-green-400 block mb-2 text-base flex items-center gap-2">
                                            <span className="bg-green-500/20 px-2 py-0.5 rounded text-xs">ÁGIL</span>
                                            Ligera
                                        </strong>
                                        <p className="mb-2">No limitan casi nada tu Destreza y tienen poco peso.</p>
                                        <div className="text-xs text-gray-400 space-y-1 border-t border-gray-700 pt-2">
                                            <p><strong className="text-green-300">Ejemplos:</strong> Cuero, Cuero tachonado</p>
                                            <p><strong className="text-green-300">Ideal para:</strong> Pícaros, Exploradores, Bardos</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-blue-500 hover:bg-gray-800/50 transition-colors">
                                        <strong className="text-blue-400 block mb-2 text-base flex items-center gap-2">
                                            <span className="bg-blue-500/20 px-2 py-0.5 rounded text-xs">EQUILIBRADA</span>
                                            Media
                                        </strong>
                                        <p className="mb-2">Equilibrio entre protección y movilidad.</p>
                                        <div className="text-xs text-gray-400 space-y-1 border-t border-gray-700 pt-2">
                                            <p><strong className="text-blue-300">Ejemplos:</strong> Cota de mallas, Peto</p>
                                            <p><strong className="text-blue-300">Ideal para:</strong> Clérigos, Druidas</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-red-500 hover:bg-gray-800/50 transition-colors">
                                        <strong className="text-red-400 block mb-2 text-base flex items-center gap-2">
                                            <span className="bg-red-500/20 px-2 py-0.5 rounded text-xs">TANQUE</span>
                                            Pesada
                                        </strong>
                                        <p className="mb-2">Máxima protección pero muy restrictiva.</p>
                                        <div className="text-xs text-gray-400 space-y-1 border-t border-gray-700 pt-2">
                                            <p><strong className="text-red-300">Ejemplos:</strong> Media armadura, Completa</p>
                                            <p><strong className="text-red-300">Ideal para:</strong> Guerreros, Paladines</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-gold-500 hover:bg-gray-800/50 transition-colors">
                                        <strong className="text-gold-400 block mb-2 text-base flex items-center gap-2">
                                            <span className="bg-gold-500/20 px-2 py-0.5 rounded text-xs">EXTRA</span>
                                            Escudos
                                        </strong>
                                        <p className="mb-2">Añaden CA pero ocupan una mano.</p>
                                        <div className="text-xs text-gray-400 space-y-1 border-t border-gray-700 pt-2">
                                            <p><strong className="text-gold-300">Ejemplos:</strong> Broquel, Escudo pesado</p>
                                            <p><strong className="text-gold-300">Nota:</strong> No afectan velocidad</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 bg-green-900/10 p-3 rounded border border-green-500/20 text-sm">
                                    <AlertTriangle className="h-5 w-5 text-green-500 shrink-0" />
                                    <span>
                                        <strong className="text-green-400">Druidas:</strong> Por razones religiosas, los druidas <strong>no usan armaduras metálicas</strong>. Solo pueden usar cuero, pieles u otras armaduras de materiales naturales.
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Estadísticas */}
                        <Card className="card border-blue-500/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-400">
                                    <Info className="h-5 w-5" />
                                    Entendiendo las estadísticas
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                {/* Ejemplo visual de cómo leer stats de una armadura */}
                                <div className="bg-gradient-to-r from-blue-900/30 to-gray-900 p-4 rounded-lg border border-blue-500/30">
                                    <p className="text-sm text-gray-300 mb-3">
                                        <strong className="text-blue-400 flex items-center gap-1"><BookOpen className="h-4 w-4" /> Ejemplo: ¿Cómo leer las estadísticas de una cota de mallas?</strong>
                                    </p>
                                    <div className="bg-gray-800/80 p-3 rounded-lg text-sm font-mono mb-3">
                                        <span className="text-gray-100">Cota de mallas:</span> <span className="text-blue-400">+5 CA</span> | <span className="text-amber-400">Máx DES +2</span> | <span className="text-red-400">-5 Penal.</span> | <span className="text-purple-400">30% F.Arc</span> | <span className="text-green-400">20 pies</span> | <span className="text-amber-300">150 po</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-xs">
                                        <div className="flex items-center gap-1"><Shield className="h-3 w-3 text-blue-400" /><span className="text-gray-400">Protección</span></div>
                                        <div className="flex items-center gap-1"><Zap className="h-3 w-3 text-amber-400" /><span className="text-gray-400">Límite DES</span></div>
                                        <div className="flex items-center gap-1"><AlertTriangle className="h-3 w-3 text-red-400" /><span className="text-gray-400">Penaliz.</span></div>
                                        <div className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-purple-400" /><span className="text-gray-400">Fallo magia</span></div>
                                        <div className="flex items-center gap-1"><Clock className="h-3 w-3 text-green-400" /><span className="text-gray-400">Velocidad</span></div>
                                        <div className="flex items-center gap-1"><Coins className="h-3 w-3 text-amber-300" /><span className="text-gray-400">Precio</span></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                    <div className="space-y-4">
                                        <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Shield className="h-5 w-5 text-blue-400" />
                                                <strong className="text-blue-400">Bonificador de Armadura</strong>
                                            </div>
                                            <p className="text-gray-300 text-sm mb-2">
                                                El número que se suma a tu Clase de Armadura (CA). Cuanto mayor, más difícil golpearte.
                                            </p>
                                            <div className="mt-2 p-2 bg-blue-900/20 rounded text-xs">
                                                <strong>Ejemplo:</strong> CA base 10 + armadura +5 + DES +2 = <span className="text-blue-300 font-bold">CA 17</span>
                                            </div>
                                        </div>
                                        <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Zap className="h-5 w-5 text-amber-400" />
                                                <strong className="text-blue-400">Bonificador máximo de DES</strong>
                                            </div>
                                            <p className="text-gray-300 text-sm mb-2">
                                                Límite de cuánta Destreza puedes aplicar a tu CA. Armadura completa = +1, cuero = +6.
                                            </p>
                                            <div className="mt-2 p-2 bg-amber-900/20 rounded text-xs">
                                                <strong>Si tienes DES +4:</strong> Con armadura completa (máx +1), solo sumas +1, no +4.
                                            </div>
                                        </div>
                                        <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                                            <div className="flex items-center gap-2 mb-2">
                                                <AlertTriangle className="h-5 w-5 text-red-400" />
                                                <strong className="text-blue-400">Penalización por armadura</strong>
                                            </div>
                                            <p className="text-gray-300 text-sm">
                                                Penalizador a habilidades físicas (Trepar, Nadar, Sigilo, Equilibrio, Escapismo...).
                                            </p>
                                            <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
                                                <div className="bg-green-900/20 p-1 rounded text-center">
                                                    <span className="text-green-300">Ligera</span>
                                                    <p className="text-gray-500">0 a -1</p>
                                                </div>
                                                <div className="bg-blue-900/20 p-1 rounded text-center">
                                                    <span className="text-blue-300">Media</span>
                                                    <p className="text-gray-500">-2 a -5</p>
                                                </div>
                                                <div className="bg-red-900/20 p-1 rounded text-center">
                                                    <span className="text-red-300">Pesada</span>
                                                    <p className="text-gray-500">-6 a -8</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Sparkles className="h-5 w-5 text-purple-400" />
                                                <strong className="text-blue-400">Probabilidad de fallo arcano</strong>
                                            </div>
                                            <p className="text-gray-300 text-sm mb-2">
                                                <strong className="text-purple-300">Solo afecta a magos/hechiceros.</strong> Este % de tus conjuros con componente somático falla.
                                            </p>
                                            <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
                                                <div className="bg-green-900/20 p-1 rounded text-center">
                                                    <span className="text-green-300">Ligera</span>
                                                    <p className="text-gray-500">5-20%</p>
                                                </div>
                                                <div className="bg-blue-900/20 p-1 rounded text-center">
                                                    <span className="text-blue-300">Media</span>
                                                    <p className="text-gray-500">20-30%</p>
                                                </div>
                                                <div className="bg-red-900/20 p-1 rounded text-center">
                                                    <span className="text-red-300">Pesada</span>
                                                    <p className="text-gray-500">35-40%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Clock className="h-5 w-5 text-green-400" />
                                                <strong className="text-blue-400">Velocidad</strong>
                                            </div>
                                            <p className="text-gray-300 text-sm mb-2">
                                                Armaduras medias/pesadas reducen tu movimiento. Un humano pasa de 30 a 20 pies.
                                            </p>
                                            <div className="mt-2 p-2 bg-green-900/20 rounded text-xs">
                                                <strong className="text-green-300">Nota:</strong> Los enanos ignoran esta reducción por su entrenamiento.
                                            </div>
                                        </div>
                                        <div className="bg-amber-900/10 p-3 rounded-lg border border-amber-500/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Hammer className="h-5 w-5 text-amber-400" />
                                                <strong className="text-amber-400">Gran Calidad (Masterwork)</strong>
                                            </div>
                                            <p className="text-gray-300 text-xs">
                                                Cuesta <strong className="text-amber-300">+150 po extra</strong> pero reduce la penalización en <strong className="text-green-400">1 punto</strong>. Ideal para pícaros que quieren más CA sin perder Sigilo.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Shield className="h-5 w-5 text-blue-400" />
                                        <h4 className="font-bold text-blue-300 text-sm uppercase tracking-wider">Comparación de armaduras comunes</h4>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-3 bg-gray-800/30 p-2 rounded">
                                        <strong className="text-gray-300">Código de colores:</strong> <span className="text-green-400">Verde</span> = Ligera (ágil) | <span className="text-blue-400">Azul</span> = Media (equilibrada) | <span className="text-red-400">Rojo</span> = Pesada (máx protección)
                                    </p>
                                    <div className="overflow-x-auto bg-gray-900/30 rounded-lg border border-gray-700">
                                        <table className="w-full text-sm text-center">
                                            <thead className="text-gray-400 border-b border-gray-700 bg-gray-800/50 text-xs">
                                                <tr>
                                                    <th className="py-2 px-3 text-left">Armadura</th>
                                                    <th className="py-2 px-3 text-blue-400">CA</th>
                                                    <th className="py-2 px-3 text-amber-400">Máx DES</th>
                                                    <th className="py-2 px-3 text-red-400">Penaliz.</th>
                                                    <th className="py-2 px-3 text-purple-400">F. Arcano</th>
                                                    <th className="py-2 px-3 text-green-400">Vel.</th>
                                                    <th className="py-2 px-3 text-amber-300">Coste</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-800 text-gray-200">
                                                <tr className="bg-green-900/10 hover:bg-green-900/20 transition-colors">
                                                    <td className="py-2 px-3 text-left font-medium text-green-400">Cuero</td>
                                                    <td className="text-blue-300">+2</td><td className="text-amber-300">+6</td><td className="text-green-300">0</td><td className="text-green-300">10%</td><td className="text-green-300">30</td><td className="text-amber-200">10 po</td>
                                                </tr>
                                                <tr className="bg-green-900/10 hover:bg-green-900/20 transition-colors">
                                                    <td className="py-2 px-3 text-left font-medium text-green-400">Cuero tachonado</td>
                                                    <td className="text-blue-300">+3</td><td className="text-amber-300">+5</td><td className="text-amber-300">-1</td><td className="text-amber-300">15%</td><td className="text-green-300">30</td><td className="text-amber-200">25 po</td>
                                                </tr>
                                                <tr className="bg-blue-900/10 hover:bg-blue-900/20 transition-colors">
                                                    <td className="py-2 px-3 text-left font-medium text-blue-400">Camisa de mallas</td>
                                                    <td className="text-blue-300">+4</td><td className="text-amber-300">+4</td><td className="text-amber-300">-2</td><td className="text-amber-300">20%</td><td className="text-green-300">30</td><td className="text-amber-200">100 po</td>
                                                </tr>
                                                <tr className="bg-blue-900/10 hover:bg-blue-900/20 transition-colors">
                                                    <td className="py-2 px-3 text-left font-medium text-blue-400">Peto</td>
                                                    <td className="text-blue-300">+5</td><td className="text-amber-300">+3</td><td className="text-red-300">-4</td><td className="text-amber-300">25%</td><td className="text-amber-300">20</td><td className="text-amber-200">200 po</td>
                                                </tr>
                                                <tr className="bg-red-900/10 hover:bg-red-900/20 transition-colors">
                                                    <td className="py-2 px-3 text-left font-medium text-red-400">Media armadura</td>
                                                    <td className="text-blue-300 font-bold">+7</td><td className="text-red-300">+0</td><td className="text-red-300 font-bold">-7</td><td className="text-red-300">40%</td><td className="text-amber-300">20</td><td className="text-amber-200">600 po</td>
                                                </tr>
                                                <tr className="bg-red-900/10 hover:bg-red-900/20 transition-colors">
                                                    <td className="py-2 px-3 text-left font-medium text-red-400">Armadura completa</td>
                                                    <td className="text-blue-300 font-bold">+8</td><td className="text-red-300">+1</td><td className="text-red-300">-6</td><td className="text-red-300">35%</td><td className="text-amber-300">20</td><td className="text-amber-200">1,500 po</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 italic flex items-start gap-1">
                                        <Lightbulb className="h-3 w-3 text-amber-400 mt-0.5 shrink-0" />
                                        <span><strong>Recomendación para novatos:</strong> Pícaro → Cuero tachonado (+3 CA, sin penalizar Sigilo). Guerrero → Cota de mallas o Peto (buen balance). Tanque → Armadura completa (+8 CA máximo).</span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Ponerse armadura */}
                        <Card className="card border-blue-500/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-400">
                                    <Clock className="h-5 w-5" />
                                    Ponerse y quitarse armadura
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm">
                                    No puedes simplemente "ponerte" una armadura completa en segundos. Una emboscada nocturna puede ser mortal si duermes sin protección.
                                </p>

                                {/* Cards visuales de tiempo */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                    <div className="bg-gradient-to-br from-gold-900/30 to-gray-900 p-3 rounded-lg border border-gold-500/30 text-center hover:border-gold-500/60 transition-colors">
                                        <div className="text-2xl mb-1">🛡️</div>
                                        <strong className="text-gold-400 text-sm block">Escudo</strong>
                                        <p className="text-xs text-gray-400">El más rápido</p>
                                        <p className="text-xs text-green-300 mt-1">1 acción</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-900/30 to-gray-900 p-3 rounded-lg border border-green-500/30 text-center hover:border-green-500/60 transition-colors">
                                        <div className="text-2xl mb-1">🧥</div>
                                        <strong className="text-green-400 text-sm block">Ligera</strong>
                                        <p className="text-xs text-gray-400">Cuero, tachonado</p>
                                        <p className="text-xs text-green-300 mt-1">1 minuto</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-900/30 to-gray-900 p-3 rounded-lg border border-blue-500/30 text-center hover:border-blue-500/60 transition-colors">
                                        <div className="text-2xl mb-1">⛓️</div>
                                        <strong className="text-blue-400 text-sm block">Media</strong>
                                        <p className="text-xs text-gray-400">Cota, peto</p>
                                        <p className="text-xs text-amber-300 mt-1">4 minutos</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-red-900/30 to-gray-900 p-3 rounded-lg border border-red-500/30 text-center hover:border-red-500/60 transition-colors">
                                        <div className="text-2xl mb-1">🏰</div>
                                        <strong className="text-red-400 text-sm block">Pesada</strong>
                                        <p className="text-xs text-gray-400">Completa, media</p>
                                        <p className="text-xs text-red-300 mt-1">4 min + ayuda</p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto bg-gray-900/30 rounded-lg border border-gray-700">
                                    <table className="w-full text-sm">
                                        <thead className="text-gray-400 border-b border-gray-700 bg-gray-800/50 text-xs">
                                            <tr>
                                                <th className="py-2 px-4 text-left">Tipo</th>
                                                <th className="py-2 px-4 text-center text-green-400">Ponerse</th>
                                                <th className="py-2 px-4 text-center text-amber-400">Con prisa</th>
                                                <th className="py-2 px-4 text-center text-red-400">Quitarse</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800 text-gray-200">
                                            <tr className="hover:bg-gray-800/30 transition-colors">
                                                <td className="py-2 px-4 font-medium text-gold-400">Escudo</td>
                                                <td className="py-2 px-4 text-center text-green-300">1 acción mov.</td>
                                                <td className="py-2 px-4 text-center text-gray-500">—</td>
                                                <td className="py-2 px-4 text-center text-green-300">1 acción mov.</td>
                                            </tr>
                                            <tr className="bg-green-900/10 hover:bg-green-900/20 transition-colors">
                                                <td className="py-2 px-4 font-medium text-green-400">Armadura ligera</td>
                                                <td className="py-2 px-4 text-center text-green-300">1 minuto</td>
                                                <td className="py-2 px-4 text-center text-amber-300">5 asaltos</td>
                                                <td className="py-2 px-4 text-center text-green-300">1 minuto</td>
                                            </tr>
                                            <tr className="bg-blue-900/10 hover:bg-blue-900/20 transition-colors">
                                                <td className="py-2 px-4 font-medium text-blue-400">Armadura media</td>
                                                <td className="py-2 px-4 text-center text-amber-300">4 minutos</td>
                                                <td className="py-2 px-4 text-center text-amber-300">1 minuto</td>
                                                <td className="py-2 px-4 text-center text-green-300">1 minuto</td>
                                            </tr>
                                            <tr className="bg-red-900/10 hover:bg-red-900/20 transition-colors">
                                                <td className="py-2 px-4 font-medium text-red-400">Armadura pesada</td>
                                                <td className="py-2 px-4 text-center text-red-300">4 min*</td>
                                                <td className="py-2 px-4 text-center text-red-300">4 min*</td>
                                                <td className="py-2 px-4 text-center text-amber-300">1d4+1 min*</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-xs bg-red-900/10 p-2 rounded border border-red-500/20">
                                    <strong className="text-red-400">* Armaduras pesadas:</strong> Requieren ayuda. Con ayuda = la mitad del tiempo. Sin ayuda = el doble del tiempo.
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3 bg-amber-900/10 p-3 rounded border border-amber-500/20">
                                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                                        <div className="text-sm">
                                            <strong className="text-amber-400 block mb-1">Ponerse con prisa</strong>
                                            <p className="text-xs text-gray-300">
                                                Puedes acelerar, pero tu CA tiene <strong className="text-red-400">-1 penalizador</strong> y la penalización por armadura <strong className="text-red-400">se dobla</strong> hasta que te la ajustes bien (1 minuto de arreglo).
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 bg-blue-900/10 p-3 rounded border border-blue-500/20">
                                        <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                                        <div className="text-sm">
                                            <strong className="text-blue-400 block mb-1">Dormir con armadura</strong>
                                            <p className="text-xs text-gray-300">
                                                <span className="text-green-400">Ligera:</span> Sin problemas. <span className="text-red-400">Media/Pesada:</span> Recuperas <strong>la mitad</strong> de PG y quedas <strong>fatigado</strong>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Link al catálogo */}
                        <Card className="card border-gold-500/30 bg-gradient-to-r from-gold-900/20 to-gray-900">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gold-400 mb-1 flex items-center gap-2">
                                            <Shield className="h-5 w-5" />
                                            ¿Listo para elegir tu armadura?
                                        </h3>
                                        <p className="text-gray-300 text-sm">
                                            Explora nuestro catálogo completo con todas las armaduras y escudos del SRD: CA, penalizadores, precios y más.
                                        </p>
                                    </div>
                                    <Link href="/objetos/armaduras">
                                        <Button className="bg-gold-500 hover:bg-gold-600 text-gray-900 font-bold">
                                            <Shield className="h-4 w-4 mr-2" />
                                            Ver catálogo de armaduras
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
