'use client';

import { useSystem } from '@/contexts/SystemContext';
import { useExperience } from '@/contexts/ExperienceContext';
import { getFeatureBlocks } from './landingContent';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ChevronRight, Star, Shield, Zap, Scroll } from 'lucide-react';

export function ContentHub() {
    const { system } = useSystem();
    const { level } = useExperience();

    const blocks = getFeatureBlocks(system, level);

    // Helper to get icon based on label (simple heuristic)
    const getIcon = (label: string) => {
        const l = label.toLowerCase();
        if (l.includes('clase')) return Shield;
        if (l.includes('dote') || l.includes('feat')) return Star;
        if (l.includes('conjuro') || l.includes('magia')) return Zap;
        return Scroll;
    };

    return (
        <div className="w-full max-w-6xl mx-auto mt-12">
            {blocks.map((block, idx) => (
                <div key={idx} className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <h2 className="text-2xl font-heading font-bold text-dungeon-200 mb-6 border-b border-dungeon-700 pb-2">
                        {block.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {block.items.map((item, itemIdx) => {
                            const Icon = getIcon(item.label);

                            return (
                                <Link key={itemIdx} href={item.href} className="group">
                                    <Card className="h-full bg-dungeon-900/50 border-dungeon-700 hover:border-gold-500/50 hover:bg-dungeon-800 transition-all duration-300">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg font-bold text-dungeon-100 group-hover:text-gold-400 transition-colors">
                                                    {item.label}
                                                </CardTitle>
                                                <Icon className="text-dungeon-500 group-hover:text-gold-500 transition-colors" size={20} />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            {item.description && (
                                                <p className="text-sm text-dungeon-400 mb-4">
                                                    {item.description}
                                                </p>
                                            )}
                                            <div className="flex items-center text-xs font-bold text-dungeon-500 group-hover:text-gold-500 transition-colors uppercase tracking-wider">
                                                Ver más <ChevronRight size={14} className="ml-1" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
