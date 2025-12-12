'use client';

import Link from 'next/link';
import { Wand2, PenTool, Layout, Box, ArrowRight } from 'lucide-react';

const tools = [
    {
        title: 'Removedor de Fondo',
        description: 'Elimina el fondo de tus imágenes automáticamente con IA. Ideal para tokens y avatares.',
        icon: Wand2,
        href: '/herramientas/removedor-fondo',
        color: 'text-purple-400',
        bg: 'bg-purple-500/10'
    },
    // Placeholder for other tools you might have or want to add
    /*
    {
      title: 'Editor de Personajes',
      description: 'Crea y personaliza tus personajes en 3D.',
      icon: PenTool,
      href: '/editor-personajes',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    }
    */
];

export default function HerramientasPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col font-sans">

            {/* Navbar Minimalista */}
            <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                        <Layout className="w-6 h-6 text-purple-500" />
                        <span>Studio</span>
                    </Link>
                    <div className="flex gap-4 text-sm text-neutral-400">
                        <Link href="/" className="hover:text-white transition-colors">Volver al Inicio</Link>
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-12">
                <div className="text-center space-y-4 py-8">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        Herramientas <span className="text-purple-500">Creativas</span>
                    </h1>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        Una colección de utilidades potenciadas por IA y código para mejorar tus partidas de rol.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <Link
                            key={tool.href}
                            href={tool.href}
                            className="group relative bg-neutral-900/50 border border-white/10 rounded-2xl p-6 hover:bg-neutral-800/50 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10"
                        >
                            <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <tool.icon className={`w-6 h-6 ${tool.color}`} />
                            </div>

                            <h2 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                                {tool.title}
                            </h2>

                            <p className="text-sm text-neutral-400 mb-4 h-10">
                                {tool.description}
                            </p>

                            <div className="flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                                Probar herramienta <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
