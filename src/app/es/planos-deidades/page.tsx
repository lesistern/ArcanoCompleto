'use client';

import Link from 'next/link';
import { Globe, Crown, Sparkles, ArrowRight, BookOpen, Map } from 'lucide-react';

export default function PlanosDeidadesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-dungeon-950 via-dungeon-900 to-dungeon-950">
            {/* Header */}
            <div className="relative overflow-hidden border-b border-gold-500/20 bg-gradient-to-r from-dungeon-900 via-dungeon-800 to-dungeon-900">
                <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5"></div>
                <div className="container mx-auto px-4 py-16 relative">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/20 border-2 border-gold-500/50 mb-6">
                            <Globe className="w-10 h-10 text-gold-400" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gold-400 font-cinzel mb-4">
                            Planos y Deidades
                        </h1>
                        <p className="text-xl text-dungeon-300 max-w-2xl mx-auto">
                            Explora los Planos Exteriores y conoce a las poderosas deidades que los habitan.
                            Descubre sus dominios, seguidores y los misterios de la cosmología de D&D 3.5.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content - Two Sections */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Planos Card */}
                    <Link
                        href="/es/planos-deidades/planos"
                        className="group relative overflow-hidden rounded-xl border-2 border-dungeon-700 bg-gradient-to-br from-dungeon-800/90 to-dungeon-900/90 p-8 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                    >
                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50 mb-6">
                                <Map className="w-8 h-8 text-blue-400" />
                            </div>

                            <h2 className="text-3xl font-bold text-blue-400 font-cinzel mb-4 group-hover:text-blue-300 transition-colors">
                                Los Planos
                            </h2>

                            <p className="text-dungeon-300 mb-6 leading-relaxed">
                                Viaja a través de los Planos Exteriores, el Plano Etéreo, el Plano Astral y más.
                                Conoce la geografía cósmica del multiverso de D&D.
                            </p>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-sm text-dungeon-400">
                                    <Sparkles className="w-4 h-4 text-blue-400" />
                                    <span>Planos Exteriores (17 planos)</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-dungeon-400">
                                    <Sparkles className="w-4 h-4 text-blue-400" />
                                    <span>Planos Interiores y Elementales</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-dungeon-400">
                                    <Sparkles className="w-4 h-4 text-blue-400" />
                                    <span>Plano Material, Etéreo y Astral</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 font-semibold">
                                <span>Explorar Planos</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>

                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full opacity-50"></div>
                    </Link>

                    {/* Deidades Card */}
                    <Link
                        href="/es/planos-deidades/deidades"
                        className="group relative overflow-hidden rounded-xl border-2 border-dungeon-700 bg-gradient-to-br from-dungeon-800/90 to-dungeon-900/90 p-8 hover:border-gold-500/50 transition-all duration-300 hover:scale-105"
                    >
                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gold-500/20 to-amber-500/20 border-2 border-gold-500/50 mb-6">
                                <Crown className="w-8 h-8 text-gold-400" />
                            </div>

                            <h2 className="text-3xl font-bold text-gold-400 font-cinzel mb-4 group-hover:text-gold-300 transition-colors">
                                Las Deidades
                            </h2>

                            <p className="text-dungeon-300 mb-6 leading-relaxed">
                                Conoce a los dioses de D&D 3.5: sus dominios, seguidores, enseñanzas y los secretos
                                de su poder divino.
                            </p>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 text-sm text-dungeon-400">
                                    <Sparkles className="w-4 h-4 text-gold-400" />
                                    <span>Deidades Mayores y Menores</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-dungeon-400">
                                    <Sparkles className="w-4 h-4 text-gold-400" />
                                    <span>Dominios y Armas Predilectas</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-dungeon-400">
                                    <Sparkles className="w-4 h-4 text-gold-400" />
                                    <span>Dogmas y Seguidores</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-gold-400 group-hover:text-gold-300 font-semibold">
                                <span>Ver Deidades</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>

                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-500/20 to-transparent rounded-bl-full opacity-50"></div>
                    </Link>
                </div>

                {/* Additional Info Section */}
                <div className="max-w-4xl mx-auto mt-12 p-8 rounded-xl border border-dungeon-700 bg-gradient-to-br from-dungeon-800/50 to-dungeon-900/50">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <BookOpen className="w-6 h-6 text-gold-400 mt-1" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gold-400 font-cinzel mb-3">
                                Sobre esta Sección
                            </h3>
                            <p className="text-dungeon-300 leading-relaxed mb-4">
                                Esta sección del compendio cubre la cosmología de D&D 3.5, incluyendo información
                                detallada sobre los planos de existencia y las deidades que los gobiernan. Aquí
                                encontrarás todo lo necesario para entender el multiverso y sus habitantes divinos.
                            </p>
                            <p className="text-dungeon-400 text-sm">
                                <strong className="text-gold-400">Fuentes:</strong> Player's Handbook, Deities and Demigods,
                                Manual of the Planes, Complete Divine
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
