import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import weaponsData from '@/lib/data/3.5/weapons.json';
import { DnDWeapon } from '@/lib/types/item';
import { getWeaponIcon } from '@/lib/utils/icons';

export default function MagicosPage() {
  const weapons = weaponsData as DnDWeapon[];

  // Filtrar solo objetos mágicos
  const magicWeapons = weapons.filter(w => w.isMagic);

  // Formatear costo
  const formatCost = (weapon: DnDWeapon) => {
    return weapon.cost.gold
      ? `${weapon.cost.gold.toLocaleString()} po`
      : 'Invaluable';
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Back Link */}
      <div className="mb-8">
        <Link href="/objetos">
          <Button variant="secondary">Volver a objetos</Button>
        </Link>
      </div>

      {/* Header */}
      <div className="border-l-4 border-purple-500 pl-6 mb-12">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="h-8 w-8 text-purple-400" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
            Objetos mágicos
          </h1>
        </div>
        <p className="text-lg text-dungeon-300">
          {magicWeapons.length} objetos mágicos disponibles
        </p>
      </div>

      {/* Magic Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {magicWeapons.map((weapon) => {
          const Icon = getWeaponIcon(weapon);
          const costText = formatCost(weapon);

          return (
            <Link key={weapon.id} href={`/objetos/${weapon.slug}`}>
              <Card className="h-full transition-all hover:border-purple-500 cursor-pointer group bg-purple-500/5">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-purple-400" />
                      <CardTitle className="text-lg group-hover:text-gold-500 transition-colors">
                        {weapon.name}
                      </CardTitle>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-0.5 rounded border bg-purple-500/20 text-purple-400 border-purple-500/30 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Mágico +{weapon.magicBonus}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
                      {weapon.stats.damage.medium}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-gold-500/20 text-gold-500 border border-gold-500/30">
                      {costText}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-dungeon-300 mb-3 line-clamp-2">
                    {weapon.shortDescription}
                  </p>
                  {weapon.magicStats && (
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-xs">
                        <span className="text-purple-400 font-semibold min-w-[80px]">Aura:</span>
                        <span className="text-dungeon-400">{weapon.magicStats.aura}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <span className="text-purple-400 font-semibold min-w-[80px]">NL:</span>
                        <span className="text-dungeon-400">{weapon.magicStats.casterLevel}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {magicWeapons.length === 0 && (
        <div className="text-center py-16">
          <Sparkles className="h-16 w-16 text-dungeon-600 mx-auto mb-4" />
          <h2 className="text-2xl font-heading text-dungeon-300 mb-2">
            No hay objetos mágicos disponibles
          </h2>
          <p className="text-dungeon-400">
            Esta sección está en desarrollo
          </p>
        </div>
      )}

      {/* Back Button */}
      <div className="flex gap-4 mt-12">
        <Link href="/objetos">
          <Button variant="secondary">Volver a objetos</Button>
        </Link>
        <Link href="/">
          <Button variant="ghost">Inicio</Button>
        </Link>
      </div>
    </div>
  );
}
