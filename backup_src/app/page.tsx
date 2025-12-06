import Link from 'next/link';
import { BookOpen, Construction, ArrowRight, Sparkles, Scroll } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl min-h-[80vh] flex flex-col justify-center">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="font-heading text-5xl md:text-6xl font-bold text-dungeon-100 mb-6">
          Compendio <span className="text-gold-500">Arcano</span>
        </h1>
        <p className="text-xl text-dungeon-300 max-w-2xl mx-auto leading-relaxed">
          Tu fuente definitiva de conocimiento.
        </p>
        <p className="text-xl text-dungeon-300 max-w-2xl mx-auto leading-relaxed">
          Selecciona tu edición para comenzar tu aventura.
        </p>
      </div>

      {/* Edition Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">

        {/* D&D 3.5e - Primary */}
        <Link href="/3.5e" className="group relative">

          <Card className="relative h-full bg-dungeon-900 border-dungeon-700 hover:border-gold-500/50 transition-all duration-300 transform group-hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-gold-500/10 border border-gold-500/20">
                  <BookOpen className="h-8 w-8 text-gold-500" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-500/20 text-gold-400 border border-gold-500/30">
                  DISPONIBLE
                </span>
              </div>
              <CardTitle className="text-3xl font-heading text-dungeon-50 group-hover:text-gold-400 transition-colors">
                Edición 3.5
              </CardTitle>
              <CardDescription className="text-dungeon-300 text-base mt-2">
                El sistema clásico y robusto. Miles de opciones para la personalización definitiva.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-dungeon-400">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gold-500" />
                  <span>Base de datos en expansión</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gold-500" />
                  <span>Creador de personajes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gold-500" />
                  <span>Foro de comunidad</span>
                </li>
              </ul>
              <Button className="w-full group-hover:bg-gold-500 group-hover:text-dungeon-950 transition-all">
                Entrar al Compendio <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        {/* D&D 5e - Secondary */}
        <Link href="/5e" className="group">
          <Card className="h-full border-dungeon-700 hover:border-dungeon-500 transition-all duration-300 hover:bg-dungeon-800/50">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-dungeon-800 border border-dungeon-700">
                  <Scroll className="h-8 w-8 text-dungeon-300" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-dungeon-800 text-dungeon-400 border border-dungeon-700">
                  EN DESARROLLO
                </span>
              </div>
              <CardTitle className="text-2xl font-heading text-dungeon-200 group-hover:text-dungeon-100 transition-colors">
                Edición 5e
              </CardTitle>
              <CardDescription className="text-dungeon-400 mt-2">
                La edición más popular del mundo. Simplificada y narrativa.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dungeon-500 mb-6">
                Actualmente estamos trabajando en la migración de contenido para la quinta edición.
              </p>
              <Button variant="secondary" className="w-full">
                Ver Estado <Construction className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        {/* D&D 5.5e - Tertiary */}
        <Link href="/5.5e" className="group">
          <Card className="h-full border-dungeon-800 bg-dungeon-900/50 hover:border-dungeon-700 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-dungeon-800/50 border border-dungeon-800">
                  <Sparkles className="h-8 w-8 text-dungeon-500" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-dungeon-900 text-dungeon-600 border border-dungeon-800">
                  FUTURO
                </span>
              </div>
              <CardTitle className="text-2xl font-heading text-dungeon-400 group-hover:text-dungeon-300 transition-colors">
                Edición 5.5e
              </CardTitle>
              <CardDescription className="text-dungeon-500 mt-2">
                La revisión 2024. Nuevas reglas y actualizaciones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dungeon-600 mb-6">
                Planificado para el futuro, una vez completada la integración de 5e.
              </p>
              <Button variant="ghost" className="w-full text-dungeon-500 hover:text-dungeon-400">
                Más Información
              </Button>
            </CardContent>
          </Card>
        </Link>

      </div>
    </div>
  );
}
