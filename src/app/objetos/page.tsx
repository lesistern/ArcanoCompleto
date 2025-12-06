import Link from 'next/link';
import { Sword, Shield, Package, Gem, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import ScrollReveal from '@/components/ScrollReveal';
import { createClient } from '@/lib/supabase/server';


export default async function EquipmentPage() {
  const supabase = await createClient();

  // Get counts for each category
  const { count: weaponsCount } = await supabase
    .from('srd_items')
    .select('*', { count: 'exact', head: true })
    .eq('item_category', 'weapon');

  const { count: armorsCount } = await supabase
    .from('srd_items')
    .select('*', { count: 'exact', head: true })
    .eq('item_category', 'armor');

  const { count: goodsCount } = await supabase
    .from('srd_items')
    .select('*', { count: 'exact', head: true })
    .eq('item_category', 'goods');

  const { count: materialsCount } = await supabase
    .from('srd_items')
    .select('*', { count: 'exact', head: true })
    .eq('item_category', 'material');

  // Get count for magic items
  const { count: magicCount } = await supabase
    .from('magic_items')
    .select('*', { count: 'exact', head: true });

  const categories = [
    {
      slug: 'armas',
      title: 'Armas',
      description: 'Armas simples, marciales y exóticas',
      icon: Sword,
      color: 'red',
      count: weaponsCount || 0
    },
    {
      slug: 'armaduras',
      title: 'Armaduras y escudos',
      description: 'Armaduras ligeras, medias, pesadas y escudos',
      icon: Shield,
      color: 'blue',
      count: armorsCount || 0
    },
    {
      slug: 'bienes',
      title: 'Bienes y servicios',
      description: 'Equipo de aventurero, herramientas y servicios',
      icon: Package,
      color: 'green',
      count: goodsCount || 0
    },
    {
      slug: 'materiales',
      title: 'Materiales especiales',
      description: 'Mithral, adamantino, madera oscura, etc.',
      icon: Gem,
      color: 'purple',
      count: materialsCount || 0
    },
    {
      slug: 'magicos',
      title: 'Objetos mágicos',
      description: 'Varitas, anillos, bastones, objetos maravillosos y más',
      icon: Sparkles,
      color: 'amber',
      count: magicCount || 0
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Header */}
      <ScrollReveal direction="down">
        <div className="border-l-4 border-amber-500 pl-6 mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 mb-3">
            Equipo y objetos
          </h1>
          <p className="text-lg text-dungeon-300">
            Armas, armaduras, bienes y servicios del SRD 3.5
          </p>
        </div>
      </ScrollReveal>



      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <ScrollReveal key={category.slug} delay={index * 100}>
              <Link href={`/objetos/${category.slug}`}>
                <Card className="card group hover:border-amber-500 transition-all duration-300 cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-3 text-${category.color}-400 group-hover:text-amber-400 transition-colors`}>
                      <Icon className="h-6 w-6" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span>{category.title}</span>
                          <span className="text-sm font-normal text-dungeon-400">
                            {category.count} {category.count === 1 ? 'objeto' : 'objetos'}
                          </span>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-dungeon-300">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>


    </div>
  );
}
