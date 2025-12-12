import {
    translateArmorName,
    getArmorDescription,
    formatArmorBonus,
    formatMaxDexBonus,
    formatArmorCheckPenalty,
    formatArcaneSpellFailure,
    formatSpeed30,
    formatSpeed20,
    formatArmorCost,
    formatArmorWeight,
    type ArmorItem,
} from '@/lib/utils/armor-categorizer';
import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import Link from 'next/link';

interface ArmorCardProps {
    armor: ArmorItem;
    getRowColorClasses: (type: string) => string;
    getTypeTextColor: (type: string) => string;
    isExpanded: boolean;
    onToggle: () => void;
}

export function ArmorCardMobile({
    armor,
    getRowColorClasses,
    getTypeTextColor,
    isExpanded,
    onToggle,
}: ArmorCardProps) {
    const armorNameEs = translateArmorName(armor.name);
    const description = getArmorDescription(armor.name);
    const rowClasses = getRowColorClasses(armor.armor_type);
    const typeColor = getTypeTextColor(armor.armor_type);

    return (
        <div
            className={`border rounded-lg mb-3 overflow-hidden ${rowClasses.replace(
                'border-l-4',
                'border-l-4'
            )}`}
            onClick={onToggle}
        >
            <div className="p-3">
                <div className="flex justify-between items-start mb-2">
                    <Link
                        href={`/objetos/armaduras/${armor.slug}`}
                        className="font-bold text-lg text-dungeon-100 hover:text-gold-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {armorNameEs}
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className={`font-bold ${typeColor}`}>
                            {formatArmorBonus(armor.armor_bonus)}
                        </span>
                        {description && (
                            <button>
                                {isExpanded ? (
                                    <ChevronUp className="h-5 w-5 text-dungeon-400" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-dungeon-400" />
                                )}
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm text-center mb-2">
                    <div className="bg-dungeon-950/30 rounded p-1">
                        <span className="block text-[10px] uppercase text-dungeon-500 font-bold">
                            Máx DES
                        </span>
                        <span className="text-green-400">
                            {formatMaxDexBonus(armor.max_dex_bonus)}
                        </span>
                    </div>
                    <div className="bg-dungeon-950/30 rounded p-1">
                        <span className="block text-[10px] uppercase text-dungeon-500 font-bold">
                            Penaliz.
                        </span>
                        <span className="text-red-400">
                            {formatArmorCheckPenalty(armor.armor_check_penalty)}
                        </span>
                    </div>
                    <div className="bg-dungeon-950/30 rounded p-1">
                        <span className="block text-[10px] uppercase text-dungeon-500 font-bold">
                            F. Arcano
                        </span>
                        <span className="text-purple-400">
                            {formatArcaneSpellFailure(armor.arcane_spell_failure)}
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center text-xs text-dungeon-400 mt-2 pt-2 border-t border-dungeon-800/50">
                    <div className="flex gap-3">
                        <span>{formatArmorCost(armor.cost_gold, armor.cost_silver)}</span>
                        <span>{formatArmorWeight(armor.weight_lb)}</span>
                    </div>
                    {armor.base_speed_30 && (
                        <span>Vel: {formatSpeed30(armor.base_speed_30)} / {formatSpeed20(armor.base_speed_20)}</span>
                    )}
                </div>
            </div>

            {isExpanded && description && (
                <div className="px-4 pb-4 pt-1 text-sm text-dungeon-300 border-t border-dungeon-800/50 bg-dungeon-950/20">
                    <p>{description}</p>
                    <div className="flex justify-end mt-2">
                        <Link
                            href={`/objetos/armaduras/${armor.slug}`}
                            className="text-gold-400 text-xs flex items-center hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Ver detalles completos <ChevronRight className="h-3 w-3 ml-1" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
