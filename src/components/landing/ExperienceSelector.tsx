'use client';

import { useExperience, ExperienceLevel } from '@/contexts/ExperienceContext';
import { Sprout, Sword, Crown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const levels: { key: ExperienceLevel; name: string; icon: LucideIcon; description: string }[] = [
    {
        key: 'novato',
        name: 'Novato',
        icon: Sprout,
        description: 'Aprendiendo a jugar'
    },
    {
        key: 'intermedio',
        name: 'Intermedio',
        icon: Sword,
        description: 'Conozco las reglas'
    },
    {
        key: 'experto',
        name: 'Experto',
        icon: Crown,
        description: 'Veterano / DM'
    },
];

export function ExperienceSelector() {
    const { level, setLevel } = useExperience();

    return (
        <div className="w-full max-w-3xl mx-auto mb-12">
            <div className="flex justify-center mb-4">
                <span className="text-dungeon-300 text-sm uppercase tracking-widest font-semibold">
                    Nivel de Experiencia
                </span>
            </div>

            <div className="bg-dungeon-950/50 p-1 rounded-full border border-dungeon-800 flex relative">
                {levels.map((l) => {
                    const Icon = l.icon;
                    const isActive = level === l.key;

                    return (
                        <button
                            key={l.key}
                            onClick={() => setLevel(l.key)}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full transition-all duration-300 relative z-10",
                                isActive
                                    ? "text-dungeon-950 font-bold"
                                    : "text-dungeon-400 hover:text-dungeon-200"
                            )}
                        >
                            <Icon size={16} className={isActive ? "text-dungeon-900" : ""} />
                            <span>{l.name}</span>
                        </button>
                    );
                })}

                {/* Sliding background */}
                <div
                    className="absolute top-1 bottom-1 rounded-full bg-gold-500 transition-all duration-300 shadow-lg"
                    style={{
                        left: level === 'novato' ? '0.5%' : level === 'intermedio' ? '33.33%' : '66.66%',
                        width: '33%'
                    }}
                />
            </div>

            <div className="text-center mt-4 min-h-[24px]">
                <p className="text-sm text-gold-400/80 animate-in fade-in slide-in-from-top-1 duration-300 key={level}">
                    {levels.find(l => l.key === level)?.description}
                </p>
            </div>
        </div>
    );
}
