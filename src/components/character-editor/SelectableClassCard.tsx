import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { Sword, Shield, Zap, Book, Check } from 'lucide-react';
import { formatClassName } from '@/lib/utils/formatters';
import React from 'react';

interface SelectableClassCardProps {
    classData: any;
    isSelected: boolean;
    onSelect: () => void;
    supplemental?: boolean;
}

const formatClassSpecs = (cls: any) => {
    // Helper to format class main specs in a single line similar to races
    const specs = [];
    if (cls.hit_die) specs.push(`DG: d${cls.hit_die}`);
    if (cls.skill_points) specs.push(`Hab: ${cls.skill_points}+INT`);
    return specs.join(' | ');
};

export default function SelectableClassCard({ classData, isSelected, onSelect, supplemental = false }: SelectableClassCardProps) {
    // Helper to get icon based on class role
    const getIcon = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('guerrero') || n.includes('bárbaro') || n.includes('paladín') || n.includes('explorador')) return Sword;
        if (n.includes('mago') || n.includes('hechicero') || n.includes('clérigo') || n.includes('druida')) return Book;
        if (n.includes('pícaro') || n.includes('bardo') || n.includes('monje')) return Zap;
        return Shield;
    };

    const Icon = getIcon(classData.name);
    // Determine colors mostly based on role or selection, similar to Race card
    // Using a consistent Indigo theme for selection to match Race card

    return (
        <div onClick={onSelect} className="relative h-full">
            {isSelected && (
                <div className="absolute -top-2 -right-2 z-10 bg-indigo-500 rounded-full p-2 shadow-lg border-2 border-dungeon-900 animate-pulse">
                    <Check className="h-5 w-5 text-white" />
                </div>
            )}

            <Card className={`h-full transition-all duration-200 cursor-pointer group overflow-hidden ${
                // Mobile-first: active states para feedback táctil
                'active:scale-95 active:shadow-lg ' +
                // Desktop: hover states
                'md:active:scale-100 md:hover:scale-[1.02] ' +
                (isSelected
                    ? 'border-indigo-500/50 ring-2 ring-indigo-500/30 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-dungeon-900 shadow-lg shadow-indigo-500/20'
                    : supplemental
                        ? 'border-amber-700/50 hover:border-amber-500/50 bg-gradient-to-br from-amber-900/20 to-dungeon-900 hover:shadow-amber-500/10'
                        : 'border-dungeon-700/50 hover:border-gold-500/50 bg-gradient-to-br from-dungeon-800/30 to-dungeon-900 hover:shadow-gold-500/10')
                }`}>
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className={`p-2 rounded-lg ${
                                isSelected
                                    ? 'bg-indigo-500/20 border border-indigo-500/30'
                                    : supplemental
                                        ? 'bg-amber-500/10 border border-amber-700/30 group-hover:bg-amber-500/20'
                                        : 'bg-gold-500/10 border border-gold-700/30 group-hover:bg-gold-500/20'
                            }`}>
                                <Icon className={`h-6 w-6 ${
                                    isSelected
                                        ? 'text-indigo-400'
                                        : 'text-gold-400 group-hover:text-gold-300'
                                }`} />
                            </div>
                            <div className="flex-1">
                                <CardTitle className={`text-lg font-bold transition-colors ${
                                    isSelected ? 'text-indigo-300' : 'text-dungeon-100 group-hover:text-gold-400'
                                }`}>
                                    {formatClassName(classData.name)}
                                </CardTitle>
                                {supplemental && (
                                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-amber-900/50 text-amber-400 border border-amber-700/50 inline-block mt-1">
                                        Suplemento
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                    <p className={`text-sm line-clamp-3 min-h-[60px] transition-colors ${
                        isSelected ? 'text-dungeon-200' : 'text-dungeon-300 group-hover:text-dungeon-200'
                    }`}>
                        {classData.description || "Una clase versátil y poderosa."}
                    </p>

                    <div className="space-y-2.5 text-xs">
                        <div className="flex items-center gap-2">
                            <span className={`font-semibold min-w-[70px] transition-colors ${
                                isSelected ? 'text-indigo-400' : 'text-dungeon-400 group-hover:text-gold-400'
                            }`}>Ataque:</span>
                            <span className={`font-mono transition-colors ${
                                isSelected ? 'text-gold-300 font-medium' : 'text-gold-500/90'
                            }`}>
                                {classData.bab_progression === 'Alta' ? 'Alto (+1/nv)' :
                                    classData.bab_progression === 'Media' ? 'Medio (+0.75/nv)' : 'Bajo (+0.5/nv)'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`font-semibold min-w-[70px] transition-colors ${
                                isSelected ? 'text-indigo-400' : 'text-dungeon-400 group-hover:text-gold-400'
                            }`}>DG / Skill:</span>
                            <span className={`font-mono transition-colors ${
                                isSelected ? 'text-dungeon-200 font-medium' : 'text-dungeon-300'
                            }`}>d{classData.hit_die} / {classData.skill_points}+INT</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`font-semibold min-w-[70px] transition-colors ${
                                isSelected ? 'text-indigo-400' : 'text-dungeon-400 group-hover:text-gold-400'
                            }`}>Salv. Altas:</span>
                            <div className="flex gap-1.5">
                                {classData.fort_save === 'good' && <Badge variant="outline" className="px-1.5 py-0 h-5 text-[10px] border-green-700/50 text-green-300 bg-green-900/30">Fort</Badge>}
                                {classData.ref_save === 'good' && <Badge variant="outline" className="px-1.5 py-0 h-5 text-[10px] border-blue-700/50 text-blue-300 bg-blue-900/30">Ref</Badge>}
                                {classData.will_save === 'good' && <Badge variant="outline" className="px-1.5 py-0 h-5 text-[10px] border-purple-700/50 text-purple-300 bg-purple-900/30">Vol</Badge>}
                                {classData.fort_save !== 'good' && classData.ref_save !== 'good' && classData.will_save !== 'good' && <span className="text-dungeon-500">-</span>}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
