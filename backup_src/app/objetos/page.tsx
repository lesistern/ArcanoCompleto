import Link from 'next/link';
import { Package, Sword, Shield as ShieldIcon, FlaskConical, Scroll, Sparkles } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { createClient } from '@/lib/supabase/server';

export default async function ObjectsPage() {
  const supabase = await createClient();

  // Obtener conteos de la base de datos
  const { count: mundaneCount } = await supabase
    .from('items')
    .select('*', { count: 'exact', head: true })
    .eq('is_magic', false);

  const { count: magicCount } = await supabase
    .from('items')
    .select('*', { count: 'exact', head: true })
    .eq('is_magic', true);

  const categories = [
    {
      name: 'Armas',
      description: `${mundaneCount || 0} armas mundanas`,
      icon: Sword,
      color: 'red-400',
      count: mundaneCount || 0,
      href: '/objetos/armas',
    },
    {
      name: 'Armaduras',
      description: 'Próximamente',
      icon: ShieldIcon,
      color: 'gray-400',
      count: 0,
      href: '/objetos/armaduras',
    },
    {
      name: 'Objetos mágicos',
      description: `${magicCount || 0} objetos disponibles`,
      icon: Sparkles,
      color: 'purple-400',
      count: magicCount || 0,
      href: '/objetos/magicos',
    },
    {
      name: 'Pociones',
      description: 'Próximamente',
      icon: FlaskConical,
      color: 'green-400',
      count: 0,
      href: '/objetos/pociones',
    },
    {
      name: 'Pergaminos',
      description: 'Próximamente',
      icon: Scroll,
      color: 'amber-400',
      count: 0,
      href: '/objetos/pergaminos',
    },
    {
      name: 'Equipamiento',
      description: 'Próximamente',
      icon: Package,
      color: 'yellow-500',
      count: 0,
      href: '/objetos/equipamiento',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Header */}
      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 mb-3">
          Objetos y Equipamiento
        </h1>
        <p className="text-lg text-dungeon-300">
          Armas, armaduras, objetos mágicos y equipamiento de D&D 3.5
        </p>
      </div>

      {/* Categorías */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link key={category.name} href={category.href}>
              <Card className="h-full transition-all bg-dungeon-800 border-dungeon-700 hover:border-gold-500/50 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-6 w-6 text-${category.color}`} />
                    <span className="text-2xl font-bold text-dungeon-400">
                      {category.count > 0 ? category.count : '—'}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-gold-500 transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
