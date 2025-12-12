'use client';

import { useUnitPreference } from '@/lib/hooks/useUnitPreference';
import { formatDistance as formatDistanceUtil } from '@/lib/utils/distance';
import { formatWeight as formatWeightUtil } from '@/lib/utils/weight';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Crosshair, Sparkles, Zap, Weight } from 'lucide-react';

interface WeaponStatsDisplayProps {
    weapon: any;
}

const MATERIAL_TRANSLATIONS: Record<string, string> = {
    "Steel": "Acero",
    "Steel and Wood": "Acero y Madera",
    "Adamantine": "Adamantina",
    "Deep Crystal": "Cristal Profundo",
    "Mundane Crystal": "Cristal Mundano",
    "Darkwood": "Madera Oscura",
    "Iron, Cold": "Hierro Frío",
    "Mithral": "Mithral",
    "Silver, Alchemical": "Plata Alquímica",
    "Wood": "Madera"
};

const translateMaterial = (mat: string) => {
    return MATERIAL_TRANSLATIONS[mat] || mat;
};

const translateSpecial = (special: string) => {
    if (!special || special === '—') return null;
    // Basic translations for common special properties
    if (special.includes("Bypass hardness")) return "Ignora dureza menor a 20";
    if (special.includes("No rusting")) return "No se oxida, no es metal";
    if (special.includes("1/2 weight")) return "Mitad de peso";
    if (special.includes("Magical enchantments cost")) return "Encantamientos mágicos cuestan 2,000 po adicionales";
    if (special.includes("damage")) return special.replace("damage", "daño");
    return special;
};

export function WeaponStatsDisplay({ weapon }: WeaponStatsDisplayProps) {
    const { unitSystem } = useUnitPreference();

    const formatDistance = (feet: number | null) => {
        if (!feet) return '—';
        return formatDistanceUtil(feet, unitSystem);
    };

    const formatWeight = (weightStr: string) => {
        if (!weightStr || weightStr === '—') return '—';
        const match = weightStr.match(/(\d+(\.\d+)?)/);
        if (!match) return weightStr;
        const lbs = parseFloat(match[1]);
        return formatWeightUtil(lbs, unitSystem);
    };

    const formatCritical = (range: string, mult: string) => {
        if (range === '20') return `x${mult}`;
        return `${range}/x${mult}`;
    };

    const formatCost = (text: string | null) => {
        if (!text) return '—';
        return text.replace('&mdash;', '—').replace(/(\d+)\s*gp/, '$1 po').replace(/(\d+)\s*sp/, '$1 pp').replace(/(\d+)\s*cp/, '$1 pc');
    };

    const hasMaterials = weapon.material_enhancements && weapon.material_enhancements.length > 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Combat Stats Card */}
            <Card className="bg-dungeon-900/50 border-dungeon-700 backdrop-blur-sm h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-dungeon-100">
                        <Crosshair className="w-5 h-5 text-red-400" />
                        Estadísticas de Combate
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-3">
                        <div className="p-3 rounded-xl bg-dungeon-950/50 border border-dungeon-800 flex justify-between items-center">
                            <span className="text-xs text-dungeon-400 uppercase tracking-wider">Daño (P)</span>
                            <span className="text-xl font-bold text-gold-400">
                                {weapon.stats_by_size?.S?.damage || '—'}
                            </span>
                        </div>
                        <div className="p-3 rounded-xl bg-dungeon-950/50 border border-dungeon-800 flex justify-between items-center">
                            <span className="text-xs text-dungeon-400 uppercase tracking-wider">Daño (Medio)</span>
                            <span className="text-xl font-bold text-gold-400">
                                {weapon.stats_by_size?.M?.damage || '—'}
                            </span>
                        </div>
                        <div className="p-3 rounded-xl bg-dungeon-950/50 border border-dungeon-800 flex justify-between items-center">
                            <span className="text-xs text-dungeon-400 uppercase tracking-wider">Crítico</span>
                            <span className="text-xl font-bold text-red-400">
                                {formatCritical(weapon.critical_range, weapon.critical_mult)}
                            </span>
                        </div>
                        <div className="p-3 rounded-xl bg-dungeon-950/50 border border-dungeon-800 flex justify-between items-center">
                            <span className="text-xs text-dungeon-400 uppercase tracking-wider">Inc. Dist.</span>
                            <span className="text-lg font-bold text-dungeon-200">
                                {formatDistance(weapon.range_increment_ft)}
                            </span>
                        </div>
                        <div className="p-3 rounded-xl bg-dungeon-950/50 border border-dungeon-800 flex flex-col gap-1">
                            <span className="text-xs text-dungeon-400 uppercase tracking-wider">Tipo</span>
                            <span className="text-lg font-bold text-dungeon-200 capitalize">
                                {weapon.damage_type?.join(', ') || '—'}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Material Enhancements Table */}
            {hasMaterials && (
                <Card className="bg-dungeon-900/50 border-dungeon-700 backdrop-blur-sm lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-dungeon-100">
                            <Sparkles className="w-5 h-5 text-gold-400" />
                            Materiales y Mejoras
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Mobile View */}
                        <div className="block md:hidden space-y-3">
                            {weapon.material_enhancements.map((enh: any, idx: number) => (
                                <div key={idx} className="bg-dungeon-950/30 rounded-lg p-3 border border-dungeon-800">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-bold text-dungeon-200">{translateMaterial(enh.material)}</span>
                                        <div className="text-right">
                                            <div className="text-xs text-dungeon-400 uppercase">Dureza/PG</div>
                                            <div className="text-dungeon-300 font-mono text-sm">
                                                {enh.hardness === 'n/a' && enh.hp === 'n/a' ? 'n/a' : `${enh.hardness} / ${enh.hp}`}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                                        <div className="bg-dungeon-900/40 p-2 rounded">
                                            <span className="block text-dungeon-500 uppercase font-bold">Normal</span>
                                            <span className="text-dungeon-100 font-bold">{formatCost(enh.average_cost)}</span>
                                        </div>
                                        <div className="bg-dungeon-900/40 p-2 rounded">
                                            <span className="block text-dungeon-500 uppercase font-bold">Gran Calidad</span>
                                            <span className="text-dungeon-300">{formatCost(enh.masterwork_cost)}</span>
                                        </div>
                                    </div>

                                    {enh.special && enh.special !== '-' && (
                                        <div className="text-xs text-dungeon-400 mt-2 pt-2 border-t border-dungeon-800/50 italic">
                                            {translateSpecial(enh.special)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-dungeon-400 uppercase bg-dungeon-950/50">
                                    <tr>
                                        <th className="px-3 py-2 rounded-l-lg">Material</th>
                                        <th className="px-3 py-2 text-right">Normal</th>
                                        <th className="px-3 py-2 text-right">Gran Calidad</th>
                                        <th className="px-3 py-2 text-right">Dureza/PG</th>
                                        <th className="px-3 py-2 text-left rounded-r-lg">Especial</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dungeon-800/50">
                                    {weapon.material_enhancements.map((enh: any, idx: number) => (
                                        <tr key={idx} className="hover:bg-dungeon-800/30 transition-colors">
                                            <td className="px-3 py-2 font-medium text-dungeon-300">
                                                {translateMaterial(enh.material)}
                                            </td>
                                            <td className="px-3 py-2 text-right text-dungeon-100 font-bold">
                                                {formatCost(enh.average_cost)}
                                            </td>
                                            <td className="px-3 py-2 text-right text-dungeon-300">
                                                {formatCost(enh.masterwork_cost)}
                                            </td>
                                            <td className="px-3 py-2 text-right text-dungeon-300">
                                                {enh.hardness === 'n/a' && enh.hp === 'n/a' ? 'n/a' : `${enh.hardness} / ${enh.hp}`}
                                            </td>
                                            <td className="px-3 py-2 text-left text-dungeon-400 text-xs">
                                                {enh.special && enh.special !== '-' ? translateSpecial(enh.special) : '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Special Properties Tags */}
            {(weapon.is_reach || weapon.is_double || weapon.is_thrown || weapon.is_trip) && (
                <Card className="bg-dungeon-900/50 border-dungeon-700 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-dungeon-100">
                            <Zap className="w-5 h-5 text-gold-400" />
                            Propiedades
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {weapon.is_reach && (
                                <span className="px-3 py-1 rounded-md bg-blue-900/20 text-blue-400 border border-blue-800/50 text-sm font-medium">
                                    Alcance
                                </span>
                            )}
                            {weapon.is_double && (
                                <span className="px-3 py-1 rounded-md bg-purple-900/20 text-purple-400 border border-purple-800/50 text-sm font-medium">
                                    Doble
                                </span>
                            )}
                            {weapon.is_thrown && (
                                <span className="px-3 py-1 rounded-md bg-green-900/20 text-green-400 border border-green-800/50 text-sm font-medium">
                                    Arrojadiza
                                </span>
                            )}
                            {weapon.is_trip && (
                                <span className="px-3 py-1 rounded-md bg-amber-900/20 text-amber-400 border border-amber-800/50 text-sm font-medium">
                                    Derribo
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Damage by Size Table */}
            {weapon.stats_by_size && Object.keys(weapon.stats_by_size).length > 2 && (
                <Card className={`bg-dungeon-900/50 border-dungeon-700 backdrop-blur-sm md:col-span-2 ${hasMaterials ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-dungeon-100">
                            <Weight className="w-5 h-5 text-dungeon-400" />
                            Estadísticas por Tamaño
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Mobile View */}
                        <div className="block md:hidden grid grid-cols-2 gap-3">
                            {[
                                { k: 'F', l: 'Minúscula' },
                                { k: 'D', l: 'Diminuta' },
                                { k: 'T', l: 'Menuda' },
                                { k: 'S', l: 'Pequeña' },
                                { k: 'M', l: 'Medio' },
                                { k: 'L', l: 'Grande' },
                                { k: 'H', l: 'Enorme' },
                                { k: 'G', l: 'Gargantuesca' },
                                { k: 'C', l: 'Colosal' }
                            ].map(({ k, l }) => {
                                const stats = weapon.stats_by_size[k];
                                if (!stats) return null;
                                return (
                                    <div key={k} className="bg-dungeon-950/30 rounded-lg p-3 border border-dungeon-800 flex flex-col items-center text-center">
                                        <span className="text-xs text-dungeon-400 uppercase font-bold mb-1">{l}</span>
                                        <span className="text-xl text-gold-400 font-bold mb-2">{stats.damage}</span>

                                        <div className="w-full space-y-1 text-xs text-dungeon-300">
                                            <div className="flex justify-between w-full">
                                                <span>Peso:</span>
                                                <span className="font-mono">{formatWeight(stats.weight)}</span>
                                            </div>
                                            <div className="flex justify-between w-full">
                                                <span>HP:</span>
                                                <span className="font-mono">{stats.hp}</span>
                                            </div>
                                            <div className="flex justify-between w-full pt-1 border-t border-dungeon-800/50">
                                                <span>Coste:</span>
                                                <span>{formatCost(stats.cost)}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Desktop View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-dungeon-400 uppercase bg-dungeon-950/50">
                                    <tr>
                                        <th className="px-3 py-2 rounded-l-lg">Tamaño</th>
                                        <th className="px-3 py-2 text-center">Daño</th>
                                        <th className="px-3 py-2 text-center">Costo</th>
                                        <th className="px-3 py-2 text-center">Peso</th>
                                        <th className="px-3 py-2 text-right rounded-r-lg">HP</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dungeon-800/50">
                                    {[
                                        { k: 'F', l: 'Minúscula' },
                                        { k: 'D', l: 'Diminuta' },
                                        { k: 'T', l: 'Menuda' },
                                        { k: 'S', l: 'Pequeña' },
                                        { k: 'M', l: 'Medio' },
                                        { k: 'L', l: 'Grande' },
                                        { k: 'H', l: 'Enorme' },
                                        { k: 'G', l: 'Gargantuesca' },
                                        { k: 'C', l: 'Colosal' }
                                    ].map(({ k, l }) => {
                                        const stats = weapon.stats_by_size[k];
                                        if (!stats) return null;
                                        return (
                                            <tr key={k} className="hover:bg-dungeon-800/30 transition-colors">
                                                <td className="px-3 py-2 font-medium text-dungeon-300">{l}</td>
                                                <td className="px-3 py-2 text-center text-gold-400 font-bold">{stats.damage}</td>
                                                <td className="px-3 py-2 text-center text-dungeon-400">{formatCost(stats.cost)}</td>
                                                <td className="px-3 py-2 text-center text-dungeon-400">{formatWeight(stats.weight)}</td>
                                                <td className="px-3 py-2 text-right text-dungeon-400">{stats.hp}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-dungeon-400 mt-4 italic">
                            * Para los valores marcados con un asterisco, el SRD no proporciona este valor directamente ni un medio para determinarlo. Estos valores dependen del criterio del DM.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
