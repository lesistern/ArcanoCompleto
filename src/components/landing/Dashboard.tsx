'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Sword,
  Users,
  Sparkles,
  Shield,
  Scroll,
  ChevronRight,
  User,
  MessageSquare,
  Heart,
  Dumbbell,
  Lightbulb,
  ArrowRight,
  Map,
  Crown,
  BookOpen,
  ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Simplified, game-focused sections
const MAIN_SECTIONS = [
  {
    title: 'Héroes y Clases',
    description: 'Guerreros, Magos, Ladrónes y más. ¿Quién quieres ser?',
    href: '/clases',
    icon: Crown,
    color: 'text-red-400',
  },
  {
    title: 'Razas',
    description: 'Elfos, Enanos, Humanos. Elige tu origen.',
    href: '/razas',
    icon: Users,
    color: 'text-blue-400',
  },
  {
    title: 'Libro de Hechizos',
    description: 'Bolas de fuego, curación y magia poderosa.',
    href: '/conjuros',
    icon: Sparkles,
    color: 'text-purple-400',
  },
  {
    title: 'Dotes',
    description: 'Habilidades especiales que hacen único a tu héroe.',
    href: '/dotes',
    icon: Scroll,
    color: 'text-amber-400',
  },
  {
    title: 'Habilidades',
    description: 'Saltar, esconderse, investigar. Lo que sabes hacer.',
    href: '/reglas/habilidades',
    icon: Dumbbell,
    color: 'text-green-400',
  },
  {
    title: 'Armería y Equipo',
    description: 'Espadas, escudos, pociones y objetos mágicos.',
    href: '/objetos',
    icon: Shield,
    color: 'text-cyan-400',
  },
];

const GAME_FUNDAMENTALS = [
  { title: 'Aprende a Jugar', href: '/introduccion', icon: Lightbulb, desc: 'Guía para principiantes' },
  { title: 'Crear Personaje', href: '/editor-personajes', icon: User, desc: 'Diseña tu héroe paso a paso' },
  { title: 'Bestiario', href: '/monstruos', icon: Sword, desc: 'Dragones y criaturas' },
  { title: 'Dioses y Planos', href: '/reglas/contenido/dioses', icon: Map, desc: 'El universo del juego' },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl space-y-12">

      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dungeon-950 via-dungeon-900/90 to-dungeon-950/50"></div>

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-dungeon-400 hover:text-dungeon-200 pl-0 gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Volver al Inicio
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight text-dungeon-100 drop-shadow-md">
                Vive tu Propia <span className="text-gold-500">Leyenda</span>
              </h1>
              <p className="text-xl text-dungeon-300 leading-relaxed font-light">
                Bienvenido al Compendio Arcano. <br />
                <strong className="text-gold-500 font-medium">Reúne a tus amigos</strong>, tira los dados y forja historias inolvidables.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/introduccion">
                <Button className="btn-primary text-lg px-8 py-3 h-auto">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  ¿Cómo se Juega?
                </Button>
              </Link>

              <Link href="/editor-personajes">
                <Button variant="secondary" className="text-lg px-8 py-3 h-auto border-dungeon-600">
                  <User className="w-5 h-5 mr-2" />
                  Crear mi Héroe
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <Image
              src="/logo.png"
              alt="Dungeons & Dragons"
              width={300}
              height={300}
              priority
              className="drop-shadow-2xl opacity-90 animate-fade-in-up"
            />
          </div>
        </div>
      </div>

      {/* Game Fundamentals Section */}
      <div className="card p-8 bg-dungeon-800 border border-dungeon-700 rounded-lg">
        <div className="flex items-center gap-3 mb-8">
          <Map className="h-8 w-8 text-gold-500" />
          <h2 className="text-2xl font-bold text-dungeon-100 font-heading">Empieza tu Aventura</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {GAME_FUNDAMENTALS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group block"
            >
              <div className="h-full p-6 rounded-xl bg-dungeon-950/40 border border-dungeon-700 hover:border-gold-500/50 hover:bg-dungeon-900 transition-all hover:-translate-y-1 text-center group">
                <div className="mx-auto p-4 rounded-full bg-dungeon-950 border border-dungeon-800 group-hover:border-gold-500/50 mb-4 w-fit transition-colors">
                  <item.icon className="w-8 h-8 text-dungeon-400 group-hover:text-gold-400 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-dungeon-100 group-hover:text-gold-400 mb-2 transition-colors">{item.title}</h3>
                <p className="text-sm text-dungeon-400">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Library/Compendium Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 border-b border-dungeon-800 pb-4">
          <BookOpen className="h-8 w-8 text-gold-500" />
          <div>
            <h2 className="text-3xl font-heading font-bold text-dungeon-100">Biblioteca del Juego</h2>
            <p className="text-dungeon-400 text-sm mt-1">Reglas, opciones y secretos para tu campaña.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MAIN_SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group block"
            >
              <Card className="h-full bg-dungeon-900/30 border-dungeon-700 hover:border-gold-500/50 hover:bg-dungeon-900/50 transition-all hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-dungeon-950 border border-dungeon-800`}>
                      <section.icon className={`h-6 w-6 ${section.color}`} />
                    </div>
                    <ChevronRight className="h-5 w-5 text-dungeon-600 group-hover:text-gold-500 transition-colors" />
                  </div>
                  <CardTitle className="text-xl text-dungeon-100 group-hover:text-gold-400 transition-colors">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-dungeon-400 text-sm leading-relaxed">
                    {section.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Community Compact Section */}
      <div className="card p-8 bg-gradient-to-br from-dungeon-900 to-dungeon-950 border border-dungeon-800 rounded-lg">
        <h2 className="text-2xl font-bold text-dungeon-200 mb-6 text-center">Únete a la Comunidad</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/foro">
            <Button variant="secondary" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Foro de Discusión
            </Button>
          </Link>
          <Link href="/discord">
            <Button variant="secondary" className="gap-2 hover:text-indigo-300 hover:border-indigo-500/30">
              <Users className="w-4 h-4" />
              Discord
            </Button>
          </Link>
          <Link href="/patreon">
            <Button variant="secondary" className="gap-2 hover:text-rose-300 hover:border-rose-500/30">
              <Heart className="w-4 h-4" />
              Apoyar el Proyecto
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
