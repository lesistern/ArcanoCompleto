import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { Sword, Shield, Zap, Book, Check } from 'lucide-react';
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
                <div className="absolute -top-2 -right-2 z-10 bg-indigo-500 rounded-full p-1 shadow-lg border-2 border-dungeon-900">
                    <Check className="h-4 w-4 text-white" />
                </div>
            )}

            <Card className={cn(
                "h-full transition-all cursor-pointer group",
                isSelected
                    ? "border-indigo-500 ring-2 ring-indigo-500/50 bg-indigo-500/5"
                    : supplemental
                        ? "border-amber-800/50 hover:border-amber-600"
                        : "hover:border-dungeon-600 border-dungeon-700 bg-dungeon-900/50"
            )}>
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className={cn(
                                "p-1.5 rounded-lg",
                                isSelected ? "bg-indigo-500/20 text-indigo-400" : "bg-dungeon-800 text-dungeon-400 group-hover:text-gold-500 group-hover:bg-dungeon-700"
                            )}>
                                <Icon className="h-5 w-5" />
                            </div>
                            <CardTitle className={cn(
                                "text-lg transition-colors",
                                isSelected ? "text-indigo-400" : "text-dungeon-100 group-hover:text-gold-500"
                            )}>
                                {classData.name}
                            </CardTitle>
                            {supplemental && (
                                <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-amber-900/50 text-amber-400 border border-amber-700/50">
                                    Suplemento
                                </span>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                    <p className="text-sm text-dungeon-300 line-clamp-3 min-h-[60px]">
                        {classData.description || "Una clase versátil y poderosa."}
                    </p>

                    <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                            <span className="text-dungeon-500 font-semibold min-w-[70px]">Ataque:</span>
                            <span className="text-gold-500/90 font-mono">
                                {classData.bab_progression === 'Alta' ? 'Alto (+1/nv)' :
                                    classData.bab_progression === 'Media' ? 'Medio (+0.75/nv)' : 'Bajo (+0.5/nv)'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-dungeon-500 font-semibold min-w-[70px]">DG / Skill:</span>
                            <span className="text-dungeon-300 font-mono">d{classData.hit_die} / {classData.skill_points}+INT</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-dungeon-500 font-semibold min-w-[70px]">Salv. Altas:</span>
                            <div className="flex gap-1.5">
                                {classData.fort_save === 'good' && <Badge variant="outline" className="px-1 py-0 h-5 text-[10px] border-green-800 text-green-400 bg-green-950/30">Fort</Badge>}
                                {classData.ref_save === 'good' && <Badge variant="outline" className="px-1 py-0 h-5 text-[10px] border-blue-800 text-blue-400 bg-blue-950/30">Ref</Badge>}
                                {classData.will_save === 'good' && <Badge variant="outline" className="px-1 py-0 h-5 text-[10px] border-purple-800 text-purple-400 bg-purple-950/30">Vol</Badge>}
                                {classData.fort_save !== 'good' && classData.ref_save !== 'good' && classData.will_save !== 'good' && <span className="text-dungeon-500">-</span>}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
