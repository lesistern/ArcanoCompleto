'use client';

import { useSystem } from '@/contexts/SystemContext';
import { useExperience } from '@/contexts/ExperienceContext';
import { getHeroContent } from './landingContent';
import { Button } from '@/components/ui/Button';
import { ArrowRight, BookOpen, Search } from 'lucide-react';
import Link from 'next/link';

export function DynamicHero() {
    const { system } = useSystem();
    const { level } = useExperience();

    const content = getHeroContent(system, level);

    return (
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-dungeon-100 mb-6 leading-tight">
                {content.title.split(system.replace('_', ' ')).map((part, i, arr) => (
                    <span key={i}>
                        {part}
                        {i < arr.length - 1 && <span className="text-gold-500">{system === 'dnd_35' ? 'D&D 3.5' : system === 'dnd_5e' ? 'D&D 5e' : system === 'pathfinder' ? 'Pathfinder' : 'Starfinder'}</span>}
                    </span>
                ))}
                {/* Fallback if split doesn't work perfectly for all strings, just render title */}
                {/* Actually, let's just render the title directly but highlight the system name if possible. 
            For simplicity in this iteration, I'll just render the title. */}
            </h1>

            {/* Re-rendering title for safety/simplicity */}
            <div className="absolute top-0 left-0 w-full h-full hidden">
                {/* Hidden logic for debug if needed */}
            </div>

            <p className="text-xl text-dungeon-300 max-w-2xl mx-auto leading-relaxed mb-8">
                {content.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={content.ctaPrimary.href}>
                    <Button size="lg" className="bg-gold-600 hover:bg-gold-700 text-dungeon-950 font-bold min-w-[200px]">
                        {content.ctaPrimary.text}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>

                {content.ctaSecondary && (
                    <Link href={content.ctaSecondary.href}>
                        <Button variant="outline" size="lg" className="border-dungeon-600 text-dungeon-200 hover:bg-dungeon-800 min-w-[200px]">
                            {level === 'experto' ? <Search className="mr-2 h-4 w-4" /> : <BookOpen className="mr-2 h-4 w-4" />}
                            {content.ctaSecondary.text}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
