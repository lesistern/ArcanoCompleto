import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DnDRace } from '@/lib/types/race';
import { getRaceIcon, getRaceColor, extractTextColor } from '@/lib/utils/icons';
import { FormattedDistance } from '@/components/ui/FormattedDistance';
import { Check } from 'lucide-react';

interface SelectableRaceCardProps {
    raceData: DnDRace;
    isSelected: boolean;
    onSelect: () => void;
    supplemental?: boolean;
}

const formatAbilityModifiers = (modifiers: DnDRace['abilityModifiers']) => {
    const mods: string[] = [];

    if (modifiers.strength) mods.push(`${modifiers.strength > 0 ? '+' : ''}${modifiers.strength} Fue`);
    if (modifiers.dexterity) mods.push(`${modifiers.dexterity > 0 ? '+' : ''}${modifiers.dexterity} Des`);
    if (modifiers.constitution) mods.push(`${modifiers.constitution > 0 ? '+' : ''}${modifiers.constitution} Con`);
    if (modifiers.intelligence) mods.push(`${modifiers.intelligence > 0 ? '+' : ''}${modifiers.intelligence} Int`);
    if (modifiers.wisdom) mods.push(`${modifiers.wisdom > 0 ? '+' : ''}${modifiers.wisdom} Sab`);
    if (modifiers.charisma) mods.push(`${modifiers.charisma > 0 ? '+' : ''}${modifiers.charisma} Car`);

    return mods.length > 0 ? mods.join(', ') : 'Ninguno';
};

export default function SelectableRaceCard({ raceData, isSelected, onSelect, supplemental = false }: SelectableRaceCardProps) {
    const Icon = getRaceIcon(raceData.name);
    const colorClasses = getRaceColor(raceData.name);
    const iconColor = extractTextColor(colorClasses);

    return (
        <div onClick={onSelect} className="relative h-full">
            {isSelected && (
                <div className="absolute -top-2 -right-2 z-10 bg-indigo-500 rounded-full p-1 shadow-lg border-2 border-dungeon-900">
                    <Check className="h-4 w-4 text-white" />
                </div>
            )}
            <Card className={`h-full transition-all cursor-pointer group ${isSelected
                    ? 'border-indigo-500 ring-2 ring-indigo-500/50 bg-indigo-500/5'
                    : supplemental
                        ? 'border-amber-800/50 hover:border-amber-600'
                        : 'hover:border-dungeon-600'
                }`}>
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3 flex-wrap">
                            <Icon className={`h-6 w-6 ${iconColor}`} />
                            <CardTitle className={`text-lg transition-colors ${isSelected ? 'text-indigo-400' : 'group-hover:text-gold-500'}`}>
                                {raceData.name}
                            </CardTitle>
                            {supplemental && (
                                <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-amber-900/50 text-amber-400 border border-amber-700/50">
                                    Suplemento
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-xs font-mono text-dungeon-400 bg-dungeon-800 px-2 py-1 rounded">
                                {raceData.size}
                            </span>
                            {raceData.specialAbilities?.darkvision && (
                                <span className="text-xs px-2 py-0.5 rounded border bg-dungeon-800/50 text-dungeon-300 border-dungeon-700">
                                    Visión oscura
                                </span>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    <p className="text-sm text-dungeon-300 mb-3 line-clamp-3">
                        {raceData.shortDescription}
                    </p>

                    <div className="space-y-2">
                        <div className="flex items-start gap-2 text-xs">
                            <span className="text-dungeon-500 font-semibold min-w-[90px]">Habilidades:</span>
                            <span className="text-dungeon-400">
                                {formatAbilityModifiers(raceData.abilityModifiers)}
                            </span>
                        </div>

                        <div className="flex items-start gap-2 text-xs">
                            <span className="text-dungeon-500 font-semibold min-w-[90px]">Velocidad:</span>
                            <span className="text-dungeon-400"><FormattedDistance feet={raceData.speed} /></span>
                        </div>

                        {raceData.favoredClass && (
                            <div className="flex items-start gap-2 text-xs">
                                <span className="text-dungeon-500 font-semibold min-w-[90px]">Clase favorita:</span>
                                <span className="text-dungeon-400">
                                    {Array.isArray(raceData.favoredClass)
                                        ? raceData.favoredClass.join(', ')
                                        : raceData.favoredClass}
                                </span>
                            </div>
                        )}

                        {raceData.levelAdjustment > 0 && (
                            <div className="flex items-start gap-2 text-xs">
                                <span className="text-dungeon-500 font-semibold min-w-[90px]">Ajuste de nivel:</span>
                                <span className="text-amber-400 font-semibold">+{raceData.levelAdjustment}</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
