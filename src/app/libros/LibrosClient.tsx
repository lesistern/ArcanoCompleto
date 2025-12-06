'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Book, BookOpen, Library, ArrowLeft, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import BookTocSidebar from '@/components/BookTocSidebar';
import ScrollReveal from '@/components/ScrollReveal';

export default function LibrosClient() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Mobile Header for Sidebar Toggle */}
            <div className="md:hidden bg-dungeon-900 border-b border-dungeon-800 p-4 flex items-center justify-between sticky top-0 z-40">
                <span className="font-bold text-gold-400 flex items-center gap-2">
                    <Library className="h-5 w-5" />
                    Biblioteca
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-dungeon-300"
                >
                    {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            <div className="flex flex-1 relative">
                {/* Sidebar */}
                <div className={`
                    fixed inset-y-0 left-0 z-50 w-72 bg-dungeon-900 border-r border-dungeon-700 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:block md:h-auto
                `}>
                    <div className="h-full overflow-hidden">
                        <BookTocSidebar />
                    </div>
                </div>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <div className="max-w-5xl mx-auto space-y-8">
                        {/* Hero Section */}
                        <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl">
                            <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-dungeon-950 via-dungeon-900/90 to-dungeon-950/50"></div>

                            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="max-w-2xl space-y-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Link href="/3.5">
                                            <Button variant="ghost" size="sm" className="text-dungeon-400 hover:text-dungeon-200 pl-0">
                                                <ArrowLeft className="h-4 w-4 mr-2" />
                                                Volver al Inicio
                                            </Button>
                                        </Link>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-dungeon-100 leading-tight">
                                        Biblioteca de D&D 3.5
                                    </h1>
                                    <p className="text-lg text-dungeon-300 leading-relaxed">
                                        Explora el índice completo de los manuales oficiales. Más de 19,000 entradas categorizadas para fácil referencia.
                                    </p>
                                </div>

                                {/* Icon Display */}
                                <div className="p-6 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm">
                                    <Library className="h-12 w-12 text-amber-500" />
                                </div>
                            </div>
                        </div>

                        {/* Estadísticas */}
                        <ScrollReveal>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-dungeon-800/50 border border-dungeon-700 rounded-xl p-5 backdrop-blur-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-gold-500/20 rounded-lg">
                                            <Book className="h-6 w-6 text-gold-400" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gold-400">47</p>
                                            <p className="text-sm text-dungeon-400">Libros indexados</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-dungeon-800/50 border border-dungeon-700 rounded-xl p-5 backdrop-blur-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-blue-500/20 rounded-lg">
                                            <BookOpen className="h-6 w-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-blue-400">19,500+</p>
                                            <p className="text-sm text-dungeon-400">Entradas de índice</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-dungeon-800/50 border border-dungeon-700 rounded-xl p-5 backdrop-blur-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-purple-500/20 rounded-lg">
                                            <Library className="h-6 w-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-purple-400">10</p>
                                            <p className="text-sm text-dungeon-400">Categorías</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Instrucciones */}
                        <ScrollReveal delay={100}>
                            <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-gold-400 mb-4">
                                    Cómo usar el índice
                                </h2>
                                <ul className="space-y-3 text-dungeon-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-gold-400 font-bold">1.</span>
                                        <span>Usa el <strong className="text-gold-300">panel izquierdo</strong> (o menú en móvil) para navegar por los libros organizados por categoría.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-gold-400 font-bold">2.</span>
                                        <span>Haz clic en una <strong className="text-gold-300">categoría</strong> para expandirla y ver los libros disponibles.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-gold-400 font-bold">3.</span>
                                        <span>Haz clic en un <strong className="text-gold-300">libro</strong> para ver sus capítulos principales.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-gold-400 font-bold">4.</span>
                                        <span>Usa la <strong className="text-gold-300">búsqueda</strong> en el panel para encontrar libros o capítulos específicos.</span>
                                    </li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        {/* Categorías destacadas */}
                        <ScrollReveal delay={200}>
                            <div>
                                <h2 className="text-xl font-semibold text-gold-400 mb-4">
                                    Categorías disponibles
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                    {[
                                        { name: 'Manual del Jugador', count: 3, color: 'gold' },
                                        { name: 'Guía del DM', count: 2, color: 'purple' },
                                        { name: 'Monstruos', count: 6, color: 'red' },
                                        { name: 'Serie Completa', count: 8, color: 'blue' },
                                        { name: 'Razas', count: 4, color: 'green' },
                                        { name: 'Magia', count: 6, color: 'cyan' },
                                        { name: 'Tomos', count: 2, color: 'orange' },
                                        { name: 'Códices', count: 2, color: 'pink' },
                                        { name: 'Manuales', count: 5, color: 'yellow' },
                                        { name: 'Suplementos', count: 9, color: 'gray' },
                                    ].map(cat => (
                                        <div
                                            key={cat.name}
                                            className="bg-dungeon-800 border border-dungeon-700 rounded-lg p-3 text-center hover:border-gold-500/50 transition-colors cursor-pointer"
                                        >
                                            <p className="text-sm font-medium text-dungeon-200">{cat.name}</p>
                                            <p className="text-xs text-dungeon-500">{cat.count} libros</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
