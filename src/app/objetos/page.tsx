import Link from 'next/link';
import { Package, Sword, Shield as ShieldIcon, FlaskConical, Scroll, Sparkles } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import weaponsData from '@/lib/data/3.5/weapons.json';
import { DnDWeapon } from '@/lib/types/item';

export default function ObjectsPage() {
  const weapons = weaponsData as DnDWeapon[];

  // Organizar por categorías
  const mundaneWeapons = weapons.filter(w => !w.isMagic);
  const magicWeapons = weapons.filter(w => w.isMagic);

  const categories = [
    {
      name: 'Armas',
      description: `${mundaneWeapons.length} armas mundanas`,
      icon: Sword,
      color: 'red-400',
      count: mundaneWeapons.length,
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
      description: `${magicWeapons.length} objetos disponibles`,
      icon: Sparkles,
      color: 'purple-400',
      count: magicWeapons.length,
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
              <Card className="h-full transition-all hover:border-gold-500 cursor-pointer group">
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
