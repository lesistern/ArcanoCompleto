import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Coins, Weight, Crosshair, Swords } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import weaponsData from '@/lib/data/3.5/weapons.json';
import { DnDWeapon } from '@/lib/types/item';
import { getItemCategoryIcon, getItemCategoryColor, getWeaponIcon } from '@/lib/utils/icons';

interface ObjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ObjectPage({ params }: ObjectPageProps) {
  const { slug } = await params;
  const itemData = (weaponsData as DnDWeapon[]).find(
    (i) => i.slug === slug
  );

  if (!itemData) {
    notFound();
  }

  const Icon = getWeaponIcon(itemData);
  const categoryColor = getItemCategoryColor(itemData.category);

  // Determinar color del tag de tipo de arma (simple/marcial/exótica)
  const getWeaponTypeColor = (weaponType: string) => {
    if (weaponType.includes('simple')) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (weaponType.includes('marcial')) return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (weaponType.includes('exótica')) return 'bg-gold-500/20 text-gold-500 border-gold-500/30';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  // Formatear costo
  const costText = itemData.cost.gold
    ? `${itemData.cost.gold.toLocaleString()} po`
    : itemData.cost.silver
      ? `${itemData.cost.silver} pp`
      : 'Gratis';

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-8">
        <Link href="/objetos/armas">
          <Button variant="secondary">Volver a armas</Button>
        </Link>
      </div>

      {/* Header */}
      <div className={`border-l-4 ${itemData.isMagic ? 'border-purple-500' : 'border-gold-500'} pl-6 mb-12`}>
        <div className="flex items-center gap-4 mb-3">
          <Icon className={`h-8 w-8 ${itemData.isMagic ? 'text-purple-400' : 'text-class-green'}`} />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
            {itemData.name}
          </h1>
        </div>
        <p className="text-lg text-dungeon-300 mb-4">{itemData.shortDescription}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className={`px-3 py-1 rounded border font-semibold ${getWeaponTypeColor(itemData.weaponType)}`}>
            {itemData.weaponType}
          </span>
          <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
            <span className="text-dungeon-500">Tamaño:</span> {itemData.size}
          </span>
          {itemData.isMagic && itemData.magicBonus && (
            <span className="px-3 py-1 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Mágico +{itemData.magicBonus}
            </span>
          )}
        </div>
      </div>

      {/* Descripción */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Descripción</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dungeon-300 leading-relaxed">{itemData.description}</p>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Swords className="h-5 w-5 text-red-400" />
            Estadísticas de combate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Daño</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-dungeon-400">Pequeño:</span>
                    <span className="text-sm font-bold text-dungeon-200">{itemData.stats.damage.small}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-dungeon-400">Mediano:</span>
                    <span className="text-sm font-bold text-dungeon-200">{itemData.stats.damage.medium}</span>
                  </div>
                  {itemData.stats.damage.large && (
                    <div className="flex justify-between">
                      <span className="text-sm text-dungeon-400">Grande:</span>
                      <span className="text-sm font-bold text-dungeon-200">{itemData.stats.damage.large}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Crítico</h3>
                <p className="text-lg font-bold text-red-400">{itemData.stats.critical}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Tipo de daño</h3>
                <div className="flex flex-wrap gap-2 items-center">
                  {itemData.stats.damageType.map((type, idx) => {
                    const colorClass = type === 'Perforante' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                       type === 'Cortante' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                       'bg-blue-500/20 text-blue-400 border-blue-500/30';

                    // Determinar si el arma hace daño "y" o "o"
                    const andWeapons = ['lucero del alba', 'guadaña'];
                    const isAnd = andWeapons.some(name => itemData.name.toLowerCase().includes(name));

                    return (
                      <>
                        {idx > 0 && (
                          <span className="text-sm text-dungeon-400 mx-1">
                            {isAnd ? 'y' : 'o'}
                          </span>
                        )}
                        <span key={idx} className={`text-sm px-2 py-1 rounded border ${colorClass}`}>
                          {type}
                        </span>
                      </>
                    );
                  })}
                </div>
              </div>

              {itemData.stats.range && (
                <div className="bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                  <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Alcance</h3>
                  <div className="flex items-center gap-2">
                    <Crosshair className="h-4 w-4 text-blue-400" />
                    <p className="text-lg font-bold text-blue-400">{itemData.stats.range} pies</p>
                  </div>
                </div>
              )}

              <div className="bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Peso</h3>
                <div className="flex items-center gap-2">
                  <Weight className="h-4 w-4 text-gray-400" />
                  <p className="text-lg font-bold text-gray-400">{itemData.stats.weight} lb</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Costo */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-gold-500" />
            Costo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-gold-500">{costText}</p>
        </CardContent>
      </Card>

      {/* Propiedades */}
      {itemData.properties && itemData.properties.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Propiedades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {itemData.properties.map((prop, index) => (
                <span
                  key={index}
                  className="text-sm px-3 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30"
                >
                  {prop}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Especial */}
      {itemData.special && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Especial</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-dungeon-300">{itemData.special}</p>
          </CardContent>
        </Card>
      )}

      {/* Información Mágica */}
      {itemData.isMagic && itemData.magicStats && (
        <Card className="mb-8 border-purple-500/30 bg-purple-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Sparkles className="h-5 w-5" />
              Propiedades mágicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm bg-dungeon-800/30 rounded p-3">
                <span className="text-purple-400 font-semibold min-w-[120px]">Aura:</span>
                <span className="text-dungeon-300">{itemData.magicStats.aura}</span>
              </div>
              <div className="flex items-start gap-2 text-sm bg-dungeon-800/30 rounded p-3">
                <span className="text-purple-400 font-semibold min-w-[120px]">Nivel de lanzador:</span>
                <span className="text-dungeon-300">{itemData.magicStats.casterLevel}</span>
              </div>
              {itemData.magicBonus && (
                <div className="flex items-start gap-2 text-sm bg-dungeon-800/30 rounded p-3">
                  <span className="text-purple-400 font-semibold min-w-[120px]">Bonificador:</span>
                  <span className="text-dungeon-300">+{itemData.magicBonus} a tiradas de ataque y daño</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Información de fuente */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-4 mb-8">
        <p className="text-xs text-dungeon-500">
          Fuente: {itemData.source.book}, página {itemData.source.page}
        </p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const weapons = weaponsData as DnDWeapon[];

  return weapons.map((item) => ({
    slug: item.slug,
  }));
}
