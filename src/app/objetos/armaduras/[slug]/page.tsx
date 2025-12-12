// Dynamic rendering - pages are generated on demand
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Shield, ArrowLeft, Coins, Scale, Zap, Eye, Footprints, Feather, ShieldHalf, ShieldAlert, CircleDot, BookOpen } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  type ArmorItem,
  translateArmorType,
  translateArmorName,
  getArmorTypeColor,
  getArmorTypeBadgeColor,
  getArmorTypeLabel,
  formatArmorBonus,
  formatMaxDexBonus,
  formatArmorCheckPenalty,
  formatArcaneSpellFailure,
  formatSpeed30,
  formatSpeed20,
  formatArmorCost,
  formatArmorWeight,
  getArmorDescription,
} from '@/lib/utils/armor-categorizer';

// Lucide icon component for armor types
function getArmorTypeIconComponent(type: string) {
  switch (type) {
    case 'light':
      return <Feather className="h-10 w-10 text-green-400" />;
    case 'medium':
      return <ShieldHalf className="h-10 w-10 text-blue-400" />;
    case 'heavy':
      return <ShieldAlert className="h-10 w-10 text-red-400" />;
    case 'shield':
      return <CircleDot className="h-10 w-10 text-gold-400" />;
    default:
      return <Shield className="h-10 w-10 text-gray-400" />;
  }
}

export const revalidate = 3600;

interface ArmorDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getArmor(slug: string): Promise<ArmorItem | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('armor')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data as ArmorItem;
}

export async function generateMetadata({ params }: ArmorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const armor = await getArmor(slug);

  if (!armor) {
    return {
      title: 'Armadura no encontrada | D&D Compendium',
    };
  }

  const typeLabel = getArmorTypeLabel(armor.armor_type);
  const armorNameEs = translateArmorName(armor.name);
  return {
    title: `${armorNameEs} | ${typeLabel} | D&D 3.5 Compendium`,
    description: armor.description || `${armorNameEs} - ${typeLabel} con bonificador de CA +${armor.armor_bonus}`,
    keywords: ['D&D 3.5', 'armadura', armorNameEs, typeLabel, 'equipo'],
  };
}


export default async function ArmorDetailPage({ params }: ArmorDetailPageProps) {
  const { slug } = await params;
  const armor = await getArmor(slug);

  if (!armor) {
    notFound();
  }

  const typeLabel = getArmorTypeLabel(armor.armor_type);
  const colorClasses = getArmorTypeColor(armor.armor_type);
  const badgeClasses = getArmorTypeBadgeColor(armor.armor_type);
  const srdDescription = getArmorDescription(armor.name);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link href="/objetos/armaduras">
          <Button variant="secondary" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a Armaduras
          </Button>
        </Link>
      </div>

      {/* Header Card */}
      <Card className={`mb-8 border-2 ${colorClasses}`}>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {getArmorTypeIconComponent(armor.armor_type)}
                <div>
                  <h1 className="font-heading text-4xl font-bold text-gray-200">
                    {translateArmorName(armor.name)}
                  </h1>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium border ${badgeClasses}`}>
                    {typeLabel}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <div className="text-sm text-gray-400 uppercase tracking-wide">Bonif. CA</div>
                <div className="text-4xl font-bold text-gold-400">
                  {formatArmorBonus(armor.armor_bonus)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <Card className="border-dungeon-700">
          <CardContent className="p-4 text-center">
            <Shield className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-sm text-gray-400 mb-1">Bonificador CA</div>
            <div className="text-2xl font-bold text-gray-200">
              {formatArmorBonus(armor.armor_bonus)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-dungeon-700">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
            <div className="text-sm text-gray-400 mb-1">Máx. DES</div>
            <div className="text-2xl font-bold text-gray-200">
              {formatMaxDexBonus(armor.max_dex_bonus)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-dungeon-700">
          <CardContent className="p-4 text-center">
            <Scale className="h-6 w-6 mx-auto mb-2 text-red-400" />
            <div className="text-sm text-gray-400 mb-1">Penalización</div>
            <div className="text-2xl font-bold text-gray-200">
              {formatArmorCheckPenalty(armor.armor_check_penalty)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-dungeon-700">
          <CardContent className="p-4 text-center">
            <Eye className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-sm text-gray-400 mb-1">Fallo Arcano</div>
            <div className="text-2xl font-bold text-gray-200">
              {formatArcaneSpellFailure(armor.arcane_spell_failure)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-dungeon-700">
          <CardContent className="p-4 text-center">
            <Footprints className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-sm text-gray-400 mb-1">Vel. (30 pies)</div>
            <div className="text-2xl font-bold text-gray-200">
              {formatSpeed30(armor.base_speed_30)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-dungeon-700">
          <CardContent className="p-4 text-center">
            <Footprints className="h-6 w-6 mx-auto mb-2 text-teal-400" />
            <div className="text-sm text-gray-400 mb-1">Vel. (20 pies)</div>
            <div className="text-2xl font-bold text-gray-200">
              {formatSpeed20(armor.base_speed_20)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost and Weight */}
      <Card className="mb-8 border-dungeon-700">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gold-400 mb-4 flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Coste y Peso
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-sm text-gray-400 mb-1">Coste</div>
              <div className="text-xl font-semibold text-gray-200">
                {formatArmorCost(armor.cost_gold, armor.cost_silver)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Peso</div>
              <div className="text-xl font-semibold text-gray-200">
                {formatArmorWeight(armor.weight_lb)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {armor.description && (
        <Card className="mb-8 border-dungeon-700">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gold-400 mb-4">Descripción</h2>
            <p className="text-gray-400 leading-relaxed">
              {armor.description}
            </p>
          </CardContent>
        </Card>
      )}

      {armor.special_properties && (
        <Card className="mb-8 border-gold-500/30 bg-gold-500/5">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gold-400 mb-4">Propiedades Especiales</h2>
            <p className="text-gray-400 leading-relaxed">
              {armor.special_properties}
            </p>
          </CardContent>
        </Card>
      )}

      {/* SRD Description */}
      {srdDescription && (
        <Card className="mb-8 border-blue-500/30 bg-blue-500/5">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Descripción del SRD
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {srdDescription}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stats Summary Table */}
      <Card className="border-dungeon-700">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gold-400 mb-4">Resumen de Estadísticas</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-dungeon-700">
                  <th className="py-2 px-3 text-gray-400 font-medium">Estadística</th>
                  <th className="py-2 px-3 text-gray-400 font-medium">Valor</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-dungeon-800">
                  <td className="py-2 px-3">Tipo</td>
                  <td className="py-2 px-3">{typeLabel}</td>
                </tr>
                <tr className="border-b border-dungeon-800">
                  <td className="py-2 px-3">Bonificador de Armadura</td>
                  <td className="py-2 px-3">{formatArmorBonus(armor.armor_bonus)}</td>
                </tr>
                <tr className="border-b border-dungeon-800">
                  <td className="py-2 px-3">Bonificador Máximo de DES</td>
                  <td className="py-2 px-3">{formatMaxDexBonus(armor.max_dex_bonus)}</td>
                </tr>
                <tr className="border-b border-dungeon-800">
                  <td className="py-2 px-3">Penalización por Armadura</td>
                  <td className="py-2 px-3">{formatArmorCheckPenalty(armor.armor_check_penalty)}</td>
                </tr>
                <tr className="border-b border-dungeon-800">
                  <td className="py-2 px-3">Probabilidad de Fallo Arcano</td>
                  <td className="py-2 px-3">{formatArcaneSpellFailure(armor.arcane_spell_failure)}</td>
                </tr>
                <tr className="border-b border-dungeon-800">
                  <td className="py-2 px-3">Velocidad (30 pies base)</td>
                  <td className="py-2 px-3">{formatSpeed30(armor.base_speed_30)}</td>
                </tr>
                <tr className="border-b border-dungeon-800">
                  <td className="py-2 px-3">Velocidad (20 pies base)</td>
                  <td className="py-2 px-3">{formatSpeed20(armor.base_speed_20)}</td>
                </tr>
                <tr className="border-b border-dungeon-800">
                  <td className="py-2 px-3">Coste</td>
                  <td className="py-2 px-3">{formatArmorCost(armor.cost_gold, armor.cost_silver)}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Peso</td>
                  <td className="py-2 px-3">{formatArmorWeight(armor.weight_lb)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
