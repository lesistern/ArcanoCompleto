'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const systems = [
    { id: '3.5', label: 'D&D 3.5', color: 'var(--color-system-35)' },
    { id: '5e', label: 'D&D 5e', color: 'var(--color-system-5e)' },
    { id: 'pf', label: 'Pathfinder', color: 'var(--color-system-pf)' },
    { id: 'sf', label: 'Starfinder', color: 'var(--color-system-sf)' },
    { id: 'coc', label: 'Cthulhu', color: 'var(--color-system-coc)' },
];

export default function SystemSelector() {
    const [activeSystem, setActiveSystem] = useState('3.5');

    return (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
            {systems.map((sys) => (
                <button
                    key={sys.id}
                    onClick={() => setActiveSystem(sys.id)}
                    className={`relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeSystem === sys.id
                            ? 'text-black scale-105 shadow-lg'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    style={{
                        backgroundColor: activeSystem === sys.id ? sys.color : 'transparent',
                        boxShadow: activeSystem === sys.id ? `0 0 20px ${sys.color}60` : 'none'
                    }}
                >
                    {sys.label}
                    {activeSystem === sys.id && (
                        <motion.div
                            layoutId="active-glow"
                            className="absolute inset-0 rounded-full blur-md -z-10"
                            style={{ backgroundColor: sys.color }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
