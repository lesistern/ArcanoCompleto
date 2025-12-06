'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Dices, Sparkles, Zap, Map, Rocket, Clock, ChevronRight } from 'lucide-react';

// Sistema principal (disponible)
const MAIN_SYSTEM = {
  id: '3.5',
  title: 'D&D 3.5',
  subtitle: 'El Sistema Clásico',
  description: 'Clásico, detallado y táctico. La edición más completa con miles de opciones de personalización, reglas profundas y un legado legendario.',
  href: '/3.5',
  icon: Dices,
  color: 'gold',
  available: true,
  stats: ['605+ Conjuros', '143+ Dotes', '11 Clases Base', '118 Libros']
};

// Sistemas secundarios (próximamente)
const SECONDARY_SYSTEMS = [
  {
    id: '5e',
    title: 'D&D 5e',
    description: 'Moderno y accesible. Equilibrio perfecto entre narrativa y mecánicas.',
    href: '/5e',
    icon: Sparkles,
    iconColor: 'text-emerald-400/70',
    available: false
  },
  {
    id: '5.5',
    title: 'D&D 5.5',
    description: 'La evolución más reciente con reglas refinadas.',
    href: '/5.5',
    icon: Zap,
    iconColor: 'text-violet-400/70',
    available: false
  },
  {
    id: 'pathfinder',
    title: 'Pathfinder',
    description: 'Estratégico y modular. Builds complejas y progresión profunda.',
    href: '/pathfinder',
    icon: Map,
    iconColor: 'text-red-400/70',
    available: false
  },
  {
    id: 'starfinder',
    title: 'Starfinder',
    description: 'Ciencia ficción y fantasía. Aventuras interestelares.',
    href: '/starfinder',
    icon: Rocket,
    iconColor: 'text-indigo-400/70',
    available: false
  }
];

export default function SystemSelectorPage() {
  return (
    <div className="min-h-screen bg-dungeon-950 font-sans flex flex-col items-center justify-center p-4">

      {/* Background - Reusing existing assets/style */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-dungeon-950 opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dungeon-950 via-dungeon-900 to-dungeon-950 opacity-80"></div>
        {/* Simple Glow Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-600/5 rounded-full blur-[120px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">

        {/* Header con Logo */}
        <div className="mb-6 sm:mb-10 text-center animate-fade-in-up px-4">
          <Image
            src="/logo.png"
            alt="Compendio Arcano"
            width={500}
            height={150}
            priority
            className="h-36 sm:h-44 md:h-52 w-auto mx-auto drop-shadow-2xl mb-4 sm:mb-6"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-dungeon-100 mb-2 sm:mb-3 drop-shadow-md">
            Elegí tu <span className="text-gold-500">Sistema</span>
          </h1>
          <p className="text-sm sm:text-base text-dungeon-400 max-w-xl mx-auto">
            Tu compendio de rol favorito, ahora en español
          </p>
        </div>

        {/* HERO CARD - D&D 3.5 (Sistema Principal) */}
        <Link href={MAIN_SYSTEM.href} className="group w-full max-w-2xl px-4 mb-8">
          <Card className="relative overflow-hidden bg-gradient-to-br from-dungeon-900/80 via-dungeon-900/60 to-gold-900/20 border-2 border-gold-500/30 hover:border-gold-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-500/20">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <CardHeader className="relative p-5 sm:p-6 pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/30 group-hover:border-gold-500/50 transition-colors">
                    <MAIN_SYSTEM.icon className="h-8 w-8 sm:h-10 sm:w-10 text-gold-400 group-hover:text-gold-300 transition-colors" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold font-mono text-gold-500/70 uppercase tracking-widest">{MAIN_SYSTEM.subtitle}</span>
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-white mt-1">{MAIN_SYSTEM.title}</CardTitle>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wide">
                  Disponible
                </span>
              </div>
            </CardHeader>

            <CardContent className="relative p-5 sm:p-6 pt-2">
              <p className="text-dungeon-300 group-hover:text-dungeon-200 text-sm sm:text-base leading-relaxed mb-4 transition-colors">
                {MAIN_SYSTEM.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-2 mb-4">
                {MAIN_SYSTEM.stats.map((stat, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-dungeon-800/60 border border-dungeon-700/50 text-dungeon-300 text-xs font-medium">
                    {stat}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-gold-400 group-hover:text-gold-300 font-semibold text-sm sm:text-base transition-colors">
                <span>Comenzar aventura</span>
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Separador */}
        <div className="flex items-center gap-4 w-full max-w-2xl px-4 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-dungeon-700 to-transparent" />
          <span className="text-dungeon-600 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
            <Clock className="h-3 w-3" />
            Próximamente
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-dungeon-700 to-transparent" />
        </div>

        {/* Sistemas Secundarios */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl px-4">
          {SECONDARY_SYSTEMS.map((sys) => (
            <div key={sys.id} className="group cursor-not-allowed">
              <Card className="h-full bg-dungeon-900/30 border-dungeon-800/50 opacity-60 hover:opacity-80 transition-all duration-300">
                <CardHeader className="p-3 pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-lg bg-dungeon-950/80 border border-dungeon-800/50`}>
                      <sys.icon className={`h-4 w-4 ${sys.iconColor}`} />
                    </div>
                  </div>
                  <CardTitle className="text-sm font-semibold text-dungeon-300">{sys.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <p className="text-dungeon-500 text-xs leading-relaxed line-clamp-2">
                    {sys.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <footer className="mt-12 sm:mt-16 text-dungeon-600 text-xs sm:text-sm font-mono tracking-widest uppercase">
          Compendio Arcano — Multiverso
        </footer>

      </main>
    </div>
  );
}
