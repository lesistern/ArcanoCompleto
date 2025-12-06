'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaBook, FaDiceD20, FaDragon, FaDungeon, FaFistRaised, FaHatWizard, FaScroll, FaShieldAlt } from 'react-icons/fa';

interface BentoItemProps {
    title: string;
    description: string;
    icon: ReactNode;
    href: string;
    className?: string;
    color: string;
}

function BentoItem({ title, description, icon, href, className = "", color }: BentoItemProps) {
    return (
        <Link href={href} className={`group relative overflow-hidden rounded-3xl bg-[var(--color-dungeon-900)] border border-[var(--color-dungeon-700)] hover:border-[var(--color-dungeon-400)] transition-all duration-300 hover:shadow-xl ${className}`}>

            {/* Hover Gradient Only */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
            />

            <div className="relative h-full p-8 flex flex-col justify-between z-10">
                <div className="mb-4">
                    <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110 shadow-md bg-[var(--color-dungeon-800)]"
                        style={{ color: color, borderColor: `${color}40`, borderWidth: '1px' }}
                    >
                        {icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">{title}</h3>
                    <p className="text-[var(--color-dungeon-300)] text-sm leading-relaxed group-hover:text-[var(--color-dungeon-100)] transition-colors">{description}</p>
                </div>

                <div className="flex items-center text-sm font-bold text-[var(--color-dungeon-400)] group-hover:text-white transition-colors duration-300">
                    Explorar <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </div>
        </Link>
    );
}

export default function BentoGrid() {
    return (
        <section className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">

                {/* Large Items */}
                <BentoItem
                    title="Clases"
                    description="Guerreros, Magos y más. 11 clases base."
                    icon={<FaFistRaised />}
                    href="/clases"
                    className="md:col-span-2 md:row-span-2"
                    color="var(--color-class-green)"
                />

                <BentoItem
                    title="Hechizos"
                    description="Compendio de magia arcana y divina."
                    icon={<FaScroll />}
                    href="/hechizos"
                    className="md:col-span-2 md:row-span-1"
                    color="var(--color-arcane-blue)"
                />

                {/* Medium Items */}
                <BentoItem
                    title="Bestiario"
                    description="Cientos de monstruos."
                    icon={<FaDragon />}
                    href="/bestiario"
                    className="md:col-span-1 md:row-span-1"
                    color="var(--color-monster-red)"
                />

                <BentoItem
                    title="Objetos"
                    description="Armas y equipo."
                    icon={<FaShieldAlt />}
                    href="/objetos"
                    className="md:col-span-1 md:row-span-1"
                    color="#9ca3af" // Gray
                />

                {/* Small Items Row */}
                <BentoItem
                    title="Razas"
                    description="Especies del mundo."
                    icon={<FaDungeon />}
                    href="/razas"
                    className="md:col-span-1"
                    color="var(--color-legendary-gold)"
                />

                <BentoItem
                    title="Dotes"
                    description="Habilidades únicas."
                    icon={<FaDiceD20 />}
                    href="/dotes"
                    className="md:col-span-1"
                    color="#a855f7" // Purple
                />

                <BentoItem
                    title="Reglas"
                    description="Mecánicas de juego."
                    icon={<FaBook />}
                    href="/reglas"
                    className="md:col-span-2"
                    color="#ec4899" // Pink
                />

            </div>
        </section>
    );
}
