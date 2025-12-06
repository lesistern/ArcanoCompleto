import Link from 'next/link';
import {
  type ArmorItem,
  getArmorTypeColor,
  getArmorTypeBadgeColor,
  translateArmorType,
  translateArmorName,
  formatMaxDexBonus,
  formatArmorCheckPenalty,
  formatArcaneSpellFailure,
  formatArmorBonus,
} from '@/lib/utils/armor-categorizer';

interface ArmorCardProps {
  armor: ArmorItem;
}

/**
 * Card component for displaying individual armor item
 * Shows name, type, AC bonus, DEX bonus, penalty, arcane failure, weight, and cost
 */
export function ArmorCard({ armor }: ArmorCardProps) {
  const colorClasses = getArmorTypeColor(armor.armor_type);
  const badgeClasses = getArmorTypeBadgeColor(armor.armor_type);
  const typeLabel = translateArmorType(armor.armor_type);

  return (
    <Link
      href={`/objetos/armaduras/${armor.slug}`}
      className={`group border rounded-lg p-4 transition-all hover:shadow-lg hover:border-gold-400 ${colorClasses}`}
    >
      <div className="space-y-3">
        {/* Name and Type Badge */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg text-dungeon-100 group-hover:text-gold-400 transition-colors">
            {translateArmorName(armor.name)}
          </h3>
          <span className={`text-xs px-2 py-0.5 rounded border ${badgeClasses}`}>
            {typeLabel}
          </span>
        </div>

        {/* Stats Grid - Primary */}
        <div className="grid grid-cols-3 gap-2 text-sm">
          {/* AC Bonus */}
          <div className="bg-dungeon-800/50 rounded p-2 text-center">
            <span className="text-dungeon-400 text-xs block">CA</span>
            <p className="font-bold text-blue-400 text-lg">
              {formatArmorBonus(armor.armor_bonus)}
            </p>
          </div>

          {/* Max DEX Bonus */}
          <div className="bg-dungeon-800/50 rounded p-2 text-center">
            <span className="text-dungeon-400 text-xs block">Max DES</span>
            <p className="font-bold text-green-400 text-lg">
              {formatMaxDexBonus(armor.max_dex_bonus)}
            </p>
          </div>

          {/* Armor Check Penalty */}
          <div className="bg-dungeon-800/50 rounded p-2 text-center">
            <span className="text-dungeon-400 text-xs block">Penaliz.</span>
            <p className="font-bold text-red-400 text-lg">
              {formatArmorCheckPenalty(armor.armor_check_penalty)}
            </p>
          </div>
        </div>

        {/* Stats Grid - Secondary */}
        <div className="grid grid-cols-3 gap-2 text-sm">
          {/* Arcane Spell Failure */}
          <div className="bg-dungeon-800/30 rounded p-1.5 text-center">
            <span className="text-dungeon-500 text-xs block">Arcano</span>
            <p className="font-medium text-purple-400 text-sm">
              {formatArcaneSpellFailure(armor.arcane_spell_failure)}
            </p>
          </div>

          {/* Weight */}
          <div className="bg-dungeon-800/30 rounded p-1.5 text-center">
            <span className="text-dungeon-500 text-xs block">Peso</span>
            <p className="font-medium text-dungeon-200 text-sm">{armor.weight_lb} lb</p>
          </div>

          {/* Cost */}
          <div className="bg-dungeon-800/30 rounded p-1.5 text-center">
            <span className="text-dungeon-500 text-xs block">Costo</span>
            <p className="font-medium text-gold-400 text-sm">{armor.cost_gold} po</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="pt-2 border-t border-dungeon-700/50">
          <span className="text-xs text-gold-400 font-semibold group-hover:translate-x-1 transition-transform inline-block">
            Ver detalles →
          </span>
        </div>
      </div>
    </Link>
  );
}
