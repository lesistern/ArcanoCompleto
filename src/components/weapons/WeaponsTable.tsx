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

    const renderMobileCard = (weapon: DnDWeapon) => (
        <div key={weapon.id} className="bg-dungeon-950/40 p-3 rounded-lg border border-dungeon-800">
            <div className="flex justify-between items-start mb-2">
                <Link
                    href={`/objetos/armas/${weapon.slug}`}
                    className="font-bold text-base text-gold-400 hover:text-gold-300 hover:underline decoration-gold-400/50"
                >
                    {weapon.name}
                </Link>
                <div className="flex flex-col items-end">
                    <span className="font-bold text-dungeon-200">{weapon.stats.damage.medium || '—'}</span>
                    <span className="text-[10px] text-dungeon-500 uppercase">Daño (M)</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-dungeon-300 mb-2">
                <div className="flex justify-between">
                    <span className="text-dungeon-500">Costo:</span>
                    <span>{formatCost(weapon.cost)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-dungeon-500">Peso:</span>
                    <span>{weapon.stats.weight ? <FormattedWeight lbs={weapon.stats.weight} /> : '—'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-dungeon-500">Crítico:</span>
                    <span className="text-red-300">{weapon.stats.critical}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-dungeon-500">Tipo:</span>
                    <span className="capitalize">{weapon.stats.damageType.join('/')}</span>
                </div>
            </div>

            {weapon.stats.range && (
                <div className="text-xs text-dungeon-400 border-t border-dungeon-800/50 pt-1 mt-1 flex justify-between">
                    <span>Incremento de distancia:</span>
                    <FormattedDistance feet={weapon.stats.range} />
                </div>
            )}
        </div>
    );

    const renderSection = (
        title: string,
        weaponsList: DnDWeapon[],
        categories: Record<string, string[]>
    ) => {
        if (weaponsList.length === 0) return null;

        const subcategorized = subcategorizeByType(weaponsList, categories);

        // Helper to render subcategories in a specific order for Table
        const renderSubTable = (key: string, subTitle: string) => {
            // @ts-ignore - dynamic access
            const list = subcategorized[key] as DnDWeapon[];
            if (list && list.length > 0) {
                return renderCategoryRows(list, subTitle);
            }
            return null;
        };

        // Helper to render subcategories for Mobile
        const renderSubMobile = (key: string, subTitle: string) => {
            // @ts-ignore
            const list = subcategorized[key] as DnDWeapon[];
            if (list && list.length > 0) {
                return (
                    <div className="mb-6 last:mb-0">
                        <h4 className="text-dungeon-300 font-bold text-sm uppercase tracking-wider mb-3 border-b border-dungeon-800 pb-1">{subTitle}</h4>
                        <div className="space-y-3">
                            {list.map(w => renderMobileCard(w))}
                        </div>
                    </div>
                );
            }
            return null;
        };

        return (
            <div className="rounded-xl border border-dungeon-700 bg-dungeon-900/20 mb-12 shadow-sm overflow-hidden">
                <div className="bg-dungeon-900 px-4 py-3 border-b-2 border-dungeon-600">
                    <h3 className="font-heading font-bold text-lg text-dungeon-100 uppercase tracking-wide">{title}</h3>
                </div>

                {/* Mobile Content */}
                <div className="block md:hidden p-4">
                    {renderSubMobile('unarmed', 'Ataques sin arma')}
                    {renderSubMobile('lightMelee', 'Armas ligeras de cuerpo a cuerpo')}
                    {renderSubMobile('oneHandedMelee', 'Armas a una mano de cuerpo a cuerpo')}
                    {renderSubMobile('twoHandedMelee', 'Armas a dos manos de cuerpo a cuerpo')}
                    {renderSubMobile('ranged', 'Armas de ataque a distancia')}
                </div>

                {/* Desktop Content */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <tbody className="divide-y divide-dungeon-800/50">
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
                            {renderSubTable('unarmed', 'Ataques sin arma')}
                            {renderSubTable('lightMelee', 'Armas ligeras de cuerpo a cuerpo')}
                            {renderSubTable('oneHandedMelee', 'Armas a una mano de cuerpo a cuerpo')}
                            {renderSubTable('twoHandedMelee', 'Armas a dos manos de cuerpo a cuerpo')}
                            {renderSubTable('ranged', 'Armas de ataque a distancia')}
                        </tbody>
                    </table>
                </div>
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
