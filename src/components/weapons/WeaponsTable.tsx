import { DnDWeapon } from '@/lib/types/item';
import {
    subcategorizeByType,
    simpleWeaponCategories,
    martialWeaponCategories,
    exoticWeaponCategories,
} from '@/lib/utils/weapon-categorizer';

import Link from 'next/link';

import { FormattedDistance } from '@/components/ui/FormattedDistance';
import { FormattedWeight } from '@/components/ui/FormattedWeight';

interface WeaponsTableProps {
    weapons: DnDWeapon[];
}

export function WeaponsTable({ weapons }: WeaponsTableProps) {
    // Categorize weapons by type (simple, martial, exotic)
    const simpleWeapons = weapons.filter(w => w.weaponType.toLowerCase().includes('simple'));
    const martialWeapons = weapons.filter(w => w.weaponType.toLowerCase().includes('marcial') || w.weaponType.toLowerCase().includes('martial'));
    const exoticWeapons = weapons.filter(w => w.weaponType.toLowerCase().includes('exótica') || w.weaponType.toLowerCase().includes('exotic'));

    const formatCost = (cost: { gold?: number; silver?: number; copper?: number }) => {
        if (cost.gold) return `${cost.gold} po`;
        if (cost.silver) return `${cost.silver} pp`;
        if (cost.copper) return `${cost.copper} pc`;
        return '—';
    };

    const renderCategoryRows = (categoryWeapons: DnDWeapon[], title: string) => {
        if (categoryWeapons.length === 0) return null;

        return (
            <>
                {/* Subcategory header row */}
                <tr className="bg-dungeon-800/30">
                    <td colSpan={8} className="px-4 py-2 font-semibold text-dungeon-200 text-sm border-b border-dungeon-700">
                        {title}
                    </td>
                </tr>
                {/* Weapon rows */}
                {categoryWeapons.map((weapon) => (
                    <tr
                        key={weapon.id}
                        className="hover:bg-dungeon-700/30 transition-colors border-b border-dungeon-800/30 text-sm"
                    >
                        <td className="px-4 py-2 font-medium text-dungeon-100">
                            <Link
                                href={`/objetos/armas/${weapon.slug}`}
                                className="text-gold-400 hover:text-gold-300 hover:underline decoration-gold-400/50 transition-colors"
                            >
                                {weapon.name}
                            </Link>
                        </td>
                        <td className="px-4 py-2 text-dungeon-300">{formatCost(weapon.cost)}</td>
                        <td className="px-4 py-2 text-dungeon-300">{weapon.stats.damage.small || '—'}</td>
                        <td className="px-4 py-2 text-dungeon-300">{weapon.stats.damage.medium || '—'}</td>
                        <td className="px-4 py-2 text-dungeon-300">{weapon.stats.critical}</td>
                        <td className="px-4 py-2 text-dungeon-300">{weapon.stats.range ? <FormattedDistance feet={weapon.stats.range} /> : '—'}</td>
                        <td className="px-4 py-2 text-dungeon-300">{weapon.stats.weight ? <FormattedWeight lbs={weapon.stats.weight} /> : '—'}</td>
                        <td className="px-4 py-2 text-dungeon-300">{weapon.stats.damageType.join(' y ')}</td>
                    </tr>
                ))}
            </>
        );
    };

    const renderSection = (
        title: string,
        weaponsList: DnDWeapon[],
        categories: Record<string, string[]>
    ) => {
        if (weaponsList.length === 0) return null;

        const subcategorized = subcategorizeByType(weaponsList, categories);

        // Helper to render subcategories in a specific order
        const renderSub = (key: string, subTitle: string) => {
            // @ts-ignore - dynamic access
            const list = subcategorized[key] as DnDWeapon[];
            if (list && list.length > 0) {
                return renderCategoryRows(list, subTitle);
            }
            return null;
        };

        return (
            <div className="overflow-x-auto rounded-lg border border-dungeon-700 bg-dungeon-900/30 mb-12">
                <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-dungeon-800/50">
                        {/* Main category header */}
                        <tr className="bg-dungeon-900">
                            <td colSpan={8} className="px-4 py-3 font-heading font-bold text-lg text-dungeon-100 border-b-2 border-dungeon-600 uppercase tracking-wide">
                                {title}
                            </td>
                        </tr>
                        {/* Column headers for this section */}
                        <tr className="bg-dungeon-900/50 text-dungeon-400 text-xs uppercase tracking-wider border-b border-dungeon-700">
                            <th className="px-4 py-2 font-medium text-left">Arma</th>
                            <th className="px-4 py-2 font-medium text-left">Costo</th>
                            <th className="px-4 py-2 font-medium text-left">Daño (P)</th>
                            <th className="px-4 py-2 font-medium text-left">Daño (M)</th>
                            <th className="px-4 py-2 font-medium text-left">Crítico</th>
                            <th className="px-4 py-2 font-medium text-left">Inc. Dist.</th>
                            <th className="px-4 py-2 font-medium text-left">Peso</th>
                            <th className="px-4 py-2 font-medium text-left">Tipo</th>
                        </tr>
                        {renderSub('unarmed', 'Ataques sin arma')}
                        {renderSub('lightMelee', 'Armas ligeras de cuerpo a cuerpo')}
                        {renderSub('oneHandedMelee', 'Armas a una mano de cuerpo a cuerpo')}
                        {renderSub('twoHandedMelee', 'Armas a dos manos de cuerpo a cuerpo')}
                        {renderSub('ranged', 'Armas de ataque a distancia')}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {renderSection('Armas Simples', simpleWeapons, simpleWeaponCategories)}
            {renderSection('Armas Marciales', martialWeapons, martialWeaponCategories)}
            {renderSection('Armas Exóticas', exoticWeapons, exoticWeaponCategories)}
        </div>
    );
}
