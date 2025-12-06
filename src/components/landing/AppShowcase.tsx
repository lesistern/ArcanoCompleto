'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AppShowcase() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Text Content */}
                    <div className="w-full md:w-1/2 z-10">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading"
                        >
                            Herramientas para <br />
                            <span className="text-[var(--color-legendary-gold)]">Dungeon Masters</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-gray-300 mb-8 leading-relaxed"
                        >
                            Gestiona tus campañas con herramientas diseñadas para la velocidad y la inmersión.
                            Desde un bestiario completo hasta un gestor de inventario inteligente.
                        </motion.p>

                        <motion.ul
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-4"
                        >
                            {[
                                "Búsqueda instantánea de reglas y hechizos",
                                "Calculadora de peso y valor de inventario",
                                "Hoja de personaje interactiva",
                                "Modo oscuro optimizado para sesiones nocturnas"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-200">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-arcane-blue)]/20 flex items-center justify-center border border-[var(--color-arcane-blue)]/50">
                                        <svg className="w-4 h-4 text-[var(--color-arcane-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </motion.ul>
                    </div>

                    {/* Device Mockup */}
                    <div className="w-full md:w-1/2 relative perspective-1000">
                        <motion.div
                            initial={{ opacity: 0, rotateY: 15, x: 50 }}
                            whileInView={{ opacity: 1, rotateY: -5, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, type: "spring" }}
                            className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-[var(--color-dungeon-700)] bg-[var(--color-dungeon-900)]"
                        >
                            {/* Browser Bar */}
                            <div className="h-8 bg-[var(--color-dungeon-950)] border-b border-[var(--color-dungeon-800)] flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>

                            {/* App Screenshot Placeholder - In a real app, use a real screenshot */}
                            <div className="aspect-video bg-[var(--color-dungeon-800)] relative flex items-center justify-center overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-dungeon-800)] to-[var(--color-dungeon-900)]" />

                                {/* Abstract UI Representation */}
                                <div className="w-3/4 h-3/4 bg-[var(--color-dungeon-900)] rounded-lg shadow-lg border border-[var(--color-dungeon-700)] p-4 relative z-10 flex gap-4">
                                    <div className="w-1/4 h-full bg-[var(--color-dungeon-800)] rounded animate-pulse" />
                                    <div className="w-3/4 h-full flex flex-col gap-3">
                                        <div className="w-full h-8 bg-[var(--color-dungeon-800)] rounded animate-pulse delay-75" />
                                        <div className="w-full h-32 bg-[var(--color-dungeon-800)] rounded animate-pulse delay-150" />
                                        <div className="flex gap-3">
                                            <div className="w-1/2 h-20 bg-[var(--color-dungeon-800)] rounded animate-pulse delay-200" />
                                            <div className="w-1/2 h-20 bg-[var(--color-dungeon-800)] rounded animate-pulse delay-300" />
                                        </div>
                                    </div>
                                </div>

                                {/* Glow Effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-arcane-blue)] to-[var(--color-legendary-gold)] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
                            </div>
                        </motion.div>

                        {/* Decorative Elements behind */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[var(--color-arcane-blue)] rounded-full blur-[100px] opacity-20" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[var(--color-legendary-gold)] rounded-full blur-[100px] opacity-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
