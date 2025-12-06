'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DnDWeapon } from '@/lib/types/item';
import { getItemCategoryColor, getWeaponIcon, extractTextColor } from '@/lib/utils/icons';
import {
    formatCost,
    getDamageTypeAbbr,
    getSingleDamageColor,
    isDamageTypeAnd,
    getDualDamageGradientClass,
    getSingleDamageBgClass,
} from '@/lib/utils/weapon-categorizer';

interface WeaponCardProps {
    weapon: DnDWeapon;
}

export function WeaponCard({ weapon }: WeaponCardProps) {
    const Icon = getWeaponIcon(weapon);
    const categoryColor = getItemCategoryColor(weapon.category);
    const iconColor = extractTextColor(categoryColor);
    const costText = formatCost(weapon);

    /**
     * Render damage type tag(s)
     * Handles single damage types, dual "and" damage, and dual "or" damage
     */
    const renderDamageTypeTag = () => {
        const types = weapon.stats.damageType;

        if (types.length === 1) {
            // Single damage type
            const abbr = getDamageTypeAbbr(types[0]);
            const colorClass = getSingleDamageColor(types[0]);
            const bgClass = getSingleDamageBgClass(types[0]);

            return (
                <span className={`text-xs px-2 py-0.5 rounded border ${bgClass} ${colorClass}`}>
                    {abbr}
                </span>
            );
        }

        // Multiple damage types
        const isAnd = isDamageTypeAnd(weapon.name);
        const abbrs = types.map(getDamageTypeAbbr);

        if (isAnd) {
            // "And" damage - show with "/" separator
            const colors = types.map(getSingleDamageColor);
            const type1 = types[0];
            const type2 = types[1];
            const { gradient, border } = getDualDamageGradientClass(type1, type2);

            return (
                <span className={`text-xs px-2 py-0.5 rounded border ${gradient} ${border}`}>
                    <span className={colors[0]}>{abbrs[0]}</span>
                    <span className="text-dungeon-400">/</span>
                    <span className={colors[1]}>{abbrs[1]}</span>
                </span>
            );
        }

        // "Or" damage - show as separate tags
        return (
            <div className="flex items-center gap-1">
                {types.map((type, index) => {
                    const abbr = getDamageTypeAbbr(type);
                    const colorClass = getSingleDamageColor(type);
                    const bgClass = getSingleDamageBgClass(type);

                    return (
                        <span key={index} className={`text-xs px-2 py-0.5 rounded border ${bgClass} ${colorClass}`}>
                            {abbr}
                        </span>
                    );
                })}
            </div>
        );
    };

    return (
        <Link href={`/objetos/armas/${weapon.slug}`}>
            <Card className="h-full transition-all hover:border-dungeon-600 cursor-pointer group">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <Icon className={`h-6 w-6 ${iconColor}`} />
                            <CardTitle className="text-lg group-hover:text-gold-500 transition-colors">
                                {weapon.name}
                            </CardTitle>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {renderDamageTypeTag()}
                        <span className="text-xs px-2 py-0.5 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
                            {weapon.stats.damage.medium}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
                            {costText}
                        </span>
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    <p className="text-sm text-dungeon-300 mb-3 line-clamp-2">
                        {weapon.shortDescription}
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2 text-xs">
                            <span className="text-dungeon-500 font-semibold min-w-[80px]">Crítico:</span>
                            <span className="text-dungeon-400">{weapon.stats.critical}</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs">
                            <span className="text-dungeon-500 font-semibold min-w-[80px]">Daño:</span>
                            <span className="text-dungeon-400">
                                {weapon.stats.damageType.join(', ')}
                            </span>
                        </div>
                        {weapon.stats.range && (
                            <div className="flex items-start gap-2 text-xs">
                                <span className="text-dungeon-500 font-semibold min-w-[80px]">Alcance:</span>
                                <span className="text-dungeon-400">{weapon.stats.range} pies</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
