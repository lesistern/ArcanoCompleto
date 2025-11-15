import Link from 'next/link';
import { Skull, Wand2, Sword, Package, Target, Users, Brain, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Home() {
  const categories = [
    {
      name: 'Clases',
      description: '11 clases base del Manual del Jugador',
      href: '/clases',
      icon: Sword,
      color: 'class-green',
      count: '11',
    },
    {
      name: 'Razas',
      description: '7 razas jugables principales',
      href: '/razas',
      icon: Users,
      color: 'dungeon-200',
      count: '7',
    },
    {
      name: 'Habilidades',
      description: '43 habilidades estándar de D&D 3.5',
      href: '/habilidades',
      icon: Brain,
      color: 'spell-blue',
      count: '43',
    },
    {
      name: 'Dotes',
      description: 'Dotes del Manual del Jugador',
      href: '/dotes',
      icon: Target,
      color: 'gold-500',
      count: '41',
    },
    {
      name: 'Conjuros',
      description: 'Conjuros arcanos y divinos',
      href: '/conjuros',
      icon: Wand2,
      color: 'spell-blue',
      count: 'Próximamente',
    },
    {
      name: 'Objetos',
      description: 'Equipamiento y objetos mágicos',
      href: '/objetos',
      icon: Package,
      color: 'item-gold',
      count: 'Próximamente',
    },
    {
      name: 'Monstruos',
      description: 'Criaturas y enemigos',
      href: '/monstruos',
      icon: Skull,
      color: 'monster-red',
      count: 'Próximamente',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero Section */}
      <div className="mb-20">
        <div className="border-l-4 border-gold-500 pl-6 mb-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 mb-3">
            Compendio D&D 3.5
          </h1>
          <p className="text-lg text-dungeon-300 max-w-2xl mb-6">
            Sistema de Referencia Completo • Dungeons & Dragons Edición 3.5
          </p>
          <Link href="/editor-personajes">
            <Button variant="primary">
              <UserPlus className="h-5 w-5 mr-2" />
              Crear Personaje
            </Button>
          </Link>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link key={category.name} href={category.href}>
              <Card className="h-full transition-colors hover:border-dungeon-600 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-dungeon-400" />
                      <CardTitle className="text-lg group-hover:text-gold-500 transition-colors">
                        {category.name}
                      </CardTitle>
                    </div>
                    <span className="text-xs font-mono text-dungeon-400 bg-dungeon-800 px-2 py-1 rounded">
                      {category.count}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-dungeon-300">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="border-t border-dungeon-700 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
              Contenido OGL
            </h3>
            <p className="text-sm text-dungeon-300 leading-relaxed">
              Todo el contenido bajo Open Game License. Datos del System Reference Document oficial.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
              Búsqueda Avanzada
            </h3>
            <p className="text-sm text-dungeon-300 leading-relaxed">
              Sistema de filtros multi-criterio. Encuentra exactamente lo que necesitas.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
              Multiplataforma
            </h3>
            <p className="text-sm text-dungeon-300 leading-relaxed">
              Optimizado para escritorio y dispositivos móviles. Acceso desde cualquier lugar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
