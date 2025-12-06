'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
    { label: 'Hechizos', value: '300+', color: 'var(--color-arcane-blue)' },
    { label: 'Clases', value: '11', color: 'var(--color-class-green)' },
    { label: 'Razas', value: '7', color: 'var(--color-legendary-gold)' },
    { label: 'Monstruos', value: '50+', color: 'var(--color-monster-red)' },
];

export default function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 border-y border-[var(--color-dungeon-800)] bg-[var(--color-dungeon-900)]/50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-[var(--color-dungeon-800)]/50">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center px-4"
                        >
                            <div
                                className="text-4xl md:text-5xl font-bold font-heading mb-2"
                                style={{ color: stat.color }}
                            >
                                {stat.value}
                            </div>
                            <p className="text-[var(--color-dungeon-400)] uppercase tracking-widest text-xs font-semibold">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
