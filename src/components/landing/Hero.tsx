'use client';

import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SystemSelector from './SystemSelector';

export default function Hero() {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">

            {/* Magic Circle Animation - Reduced Opacity */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none">
                <div className="absolute inset-0 border-2 border-[var(--color-legendary-gold)] rounded-full animate-spin-slow border-dashed" />
                <div className="absolute inset-8 border border-[var(--color-arcane-blue)] rounded-full animate-spin-reverse-slower" />
            </div>

            {/* Background Glow - Subtle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-arcane-blue)]/5 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl mx-auto"
            >
                <SystemSelector />

                <h1 className="text-6xl md:text-8xl font-bold font-heading tracking-tighter mb-6 drop-shadow-2xl">
                    <span className="text-white">D&D</span> <span className="text-gradient-gold">Compendium</span>
                </h1>

                <p className="text-xl md:text-2xl text-[var(--color-dungeon-300)] font-light mb-12 max-w-2xl mx-auto">
                    Grimorio Digital Multiverso
                </p>

                {/* Functional Search Bar */}
                <div className="relative max-w-xl mx-auto group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-arcane-blue)] to-[var(--color-legendary-gold)] rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300" />
                    <form onSubmit={handleSearch} className="relative flex items-center bg-[var(--color-dungeon-900)] border border-[var(--color-dungeon-700)] rounded-full px-6 py-4 shadow-2xl group-hover:border-[var(--color-dungeon-500)] transition-colors">
                        <FaSearch className="text-[var(--color-dungeon-400)] text-xl mr-4" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar hechizo, clase, monstruo..."
                            className="bg-transparent border-none outline-none text-white w-full placeholder-[var(--color-dungeon-500)] text-lg"
                        />
                        <button type="submit" className="hidden md:flex items-center gap-2 text-xs text-[var(--color-dungeon-500)] border border-[var(--color-dungeon-700)] rounded px-2 py-1 hover:text-white hover:border-white transition-colors">
                            BUSCAR
                        </button>
                    </form>
                </div>

            </motion.div>
        </div>
    );
}
