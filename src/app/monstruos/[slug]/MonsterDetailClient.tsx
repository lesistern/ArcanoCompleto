'use client';

import React, { useState, useMemo } from 'react';
import { Monster } from '@/lib/services/monsterService.client';
import { calculateAdvancedMonster } from '@/lib/data/monster-advancement-rules';
import MonsterStatBlock from '@/components/monsters/MonsterStatBlock';
import { Skull, BookOpen, Scroll, Sword, ArrowLeft, Users } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface MonsterDetailClientProps {
    monster: Monster;
}

interface Section {
    title: string;
    content: string;
}

// Robust Rich Text Renderer for D&D Terms and Markdown
const RichTextRenderer = ({ text }: { text: string }) => {
    if (!text) return null;

    const paragraphs = text.split('\n\n');
    // Enhanced Token Regex including Damage Types and Conditions
    const tokenRegex = /(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\d+d\d+(?:[+-]\d+)?)|(CD \d+)|(Fuerza|Destreza|Constitución|Inteligencia|Sabiduría|Carisma)|(Reflejos|Fortaleza|Voluntad)|(ácido|contundente|frío|fuego|fuerza|relámpago|necrótico|perforante|veneno|psíquico|radiante|cortante|trueno)|(cegado|hechizado|ensordecido|asustado|agarrado|incapacitado|invisible|paralizado|petrificado|envenenado|derribado|tumbado|apresado|aturdido|inconsciente)/gi;

    return (
        <div className="space-y-6 text-slate-200 font-serif text-lg leading-8 tracking-wide">
            {paragraphs.map((paragraph, pIdx) => {
                const parts = paragraph.split(tokenRegex).filter(part => part !== undefined && part !== '');

                return (
                    <p key={pIdx} className="mb-6 last:mb-0">
                        {parts.map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                const content = part.slice(2, -2);
                                return <span key={i} className="font-bold text-white bg-dungeon-800/70 px-2 py-0.5 rounded shadow-sm border border-dungeon-600/60">{content}</span>;
                            }
                            if (part.startsWith('*') && part.endsWith('*')) {
                                return <span key={i} className="italic text-slate-300">{part.slice(1, -1)}</span>;
                            }
                            if (/^\d+d\d+(?:[+-]\d+)?$/.test(part)) {
                                return <span key={i} className="text-gold-200 font-bold whitespace-nowrap bg-gold-900/40 px-2 py-0.5 rounded border border-gold-500/30 shadow-sm">{part}</span>;
                            }
                            if (/^CD \d+$/.test(part)) {
                                return <span key={i} className="text-red-200 font-bold whitespace-nowrap bg-red-900/30 px-1.5 py-0.5 rounded border border-red-500/30">{part}</span>;
                            }
                            // Abilities
                            if (/^(Fuerza|Destreza|Constitución|Inteligencia|Sabiduría|Carisma)$/i.test(part)) {
                                return <span key={i} className="text-blue-200 font-bold bg-blue-900/20 px-1 py-0.5 rounded">{part}</span>;
                            }
                            // Saves
                            if (/^(Reflejos|Fortaleza|Voluntad)$/i.test(part)) {
                                return <span key={i} className="text-emerald-200 font-bold bg-emerald-900/20 px-1 py-0.5 rounded">{part}</span>;
                            }
                            // Damage Types
                            if (/^(ácido|contundente|frío|fuego|fuerza|relámpago|necrótico|perforante|veneno|psíquico|radiante|cortante|trueno)$/i.test(part)) {
                                return <span key={i} className="text-orange-200 font-semibold bg-orange-900/25 px-1.5 py-0.5 rounded border-b-2 border-orange-500/40">{part}</span>;
                            }
                            // Conditions
                            if (/^(cegado|hechizado|ensordecido|asustado|agarrado|incapacitado|invisible|paralizado|petrificado|envenenado|derribado|tumbado|apresado|aturdido|inconsciente)$/i.test(part)) {
                                return <span key={i} className="text-purple-200 font-semibold bg-purple-900/25 px-1.5 py-0.5 rounded border-b-2 border-purple-500/40">{part}</span>;
                            }

                            return <span key={i}>{part}</span>;
                        })}
                    </p>
                );
            })}
        </div>
    );
};


export default function MonsterDetailClient({ monster }: MonsterDetailClientProps) {
    // Parse initial CR
    const initialCR = useMemo(() => {
        if (!monster.challenge_rating) return 1;
        if (monster.challenge_rating.includes('/')) {
            const [num, den] = monster.challenge_rating.split('/');
            return parseInt(num) / parseInt(den);
        }
        return parseFloat(monster.challenge_rating);
    }, [monster.challenge_rating]);

    const [targetCR, setTargetCR] = useState<number>(initialCR);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleCRChange = (newCR: number) => {
        setTargetCR(newCR);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
    };

    const advancedStats = useMemo(() => {
        return calculateAdvancedMonster(monster, targetCR);
    }, [monster, targetCR]);

    const fullDescription = (advancedStats as any).description || (monster as any).description || '';

    // Improved Section Parsing with Intro separation
    const { intro, sections } = useMemo(() => {
        if (!fullDescription) return { intro: '', sections: [] };

        // 1. Check if there are headers
        if (fullDescription.includes('### ')) {
            const rawParts = fullDescription.split('### ');
            // The first part before the first ### is the Intro
            const introText = rawParts[0].trim();

            const parsedSections = rawParts.slice(1).map((s: string) => {
                const firstLineEnd = s.indexOf('\n');
                if (firstLineEnd === -1) return { title: '', content: s };
                const title = s.substring(0, firstLineEnd).trim();
                const content = s.substring(firstLineEnd).trim();
                return { title, content };
            }).filter((s: Section) => s.content.trim() || s.title.trim());

            return { intro: introText, sections: parsedSections };
        }

        // 2. If no headers, check for paragraphs. 
        // Strategy: Treat the first paragraph as Intro, rest as Description body if long?
        // Or just ALL as Intro if it's short?
        // Let's treat standard blocks as Intro if no specific sections defined.
        return { intro: fullDescription, sections: [] };

    }, [fullDescription]);


    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <Breadcrumbs items={[
                { label: 'Bestiario', href: '/monstruos' },
                { label: monster.name }
            ]} />

            {/* Hero Section - Global Style */}
            <div className="relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl mb-10">
                <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/90 to-gray-950/50"></div>

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl space-y-4 flex-1">
                        {/* Source Book Badge */}
                        {(monster.source_book || (monster as any).source_page) && (
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-900/40 border border-amber-700/50 text-amber-300 text-xs font-semibold">
                                    <BookOpen className="h-3.5 w-3.5" />
                                    {monster.source_book || 'Manual de Monstruos'}
                                </span>
                                {(monster as any).source_page && (
                                    <span className="text-gray-500 text-xs">
                                        pág. {(monster as any).source_page}
                                    </span>
                                )}
                            </div>
                        )}

                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-100 leading-tight drop-shadow-sm">
                            {monster.name}
                        </h1>

                        {intro && (
                            <div className="text-lg text-slate-200 leading-relaxed">
                                <RichTextRenderer text={intro} />
                            </div>
                        )}
                    </div>

                    {/* Icon Display */}
                    <div className="p-6 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-sm shrink-0">
                        <Skull className="h-12 w-12 text-red-500" />
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="space-y-12 max-w-5xl mx-auto">

                {/* 1. Interactive Stat Block */}
                <div className="mx-auto w-full">
                    <MonsterStatBlock
                        stats={advancedStats}
                        targetCR={targetCR}
                        initialCR={initialCR}
                        onCRChange={handleCRChange}
                    />
                </div>

                {/* 2. Organization Section */}
                {advancedStats.organization && (
                    <Card className="card border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-dungeon-900/50 to-dungeon-950/80">
                        <CardHeader className="bg-gradient-to-r from-amber-900/30 to-transparent">
                            <CardTitle className="flex items-center gap-3 text-2xl">
                                <Users className="h-6 w-6 text-amber-300" />
                                Organización
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <p className="text-slate-200 text-base md:text-lg leading-relaxed">
                                {advancedStats.organization}
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* 3. Additional Sections (Combat, Ecology, etc) */}
                {sections.length > 0 && (
                    <div className="space-y-8">
                        {sections.map((section: Section, idx: number) => {
                            if (!section.content.trim()) return null;

                            const titleLower = section.title.toLowerCase();

                            // Determine theme based on section type
                            let theme = {
                                borderColor: 'border-blue-500/40',
                                bgGradient: 'bg-gradient-to-br from-blue-950/30 via-dungeon-900/50 to-dungeon-950/80',
                                headerGradient: 'from-blue-900/30',
                                borderBottom: 'border-blue-900/20',
                                iconColor: 'text-blue-300',
                                icon: <BookOpen className="h-6 w-6" />
                            };

                            if (titleLower.includes('combat') || titleLower.includes('lucha') || titleLower.includes('batalla') || titleLower.includes('combate')) {
                                theme = {
                                    borderColor: 'border-red-500/40',
                                    bgGradient: 'bg-gradient-to-br from-red-950/30 via-dungeon-900/50 to-dungeon-950/80',
                                    headerGradient: 'from-red-900/30',
                                    borderBottom: 'border-red-900/20',
                                    iconColor: 'text-red-300',
                                    icon: <Sword className="h-6 w-6" />
                                };
                            } else if (titleLower.includes('ecología') || titleLower.includes('ecology') || titleLower.includes('hábitat') || titleLower.includes('habitat')) {
                                theme = {
                                    borderColor: 'border-green-500/40',
                                    bgGradient: 'bg-gradient-to-br from-green-950/30 via-dungeon-900/50 to-dungeon-950/80',
                                    headerGradient: 'from-green-900/30',
                                    borderBottom: 'border-green-900/20',
                                    iconColor: 'text-green-300',
                                    icon: <Scroll className="h-6 w-6" />
                                };
                            } else if (titleLower.includes('sociedad') || titleLower.includes('cultura') || titleLower.includes('society')) {
                                theme = {
                                    borderColor: 'border-purple-500/40',
                                    bgGradient: 'bg-gradient-to-br from-purple-950/30 via-dungeon-900/50 to-dungeon-950/80',
                                    headerGradient: 'from-purple-900/30',
                                    borderBottom: 'border-purple-900/20',
                                    iconColor: 'text-purple-300',
                                    icon: <Users className="h-6 w-6" />
                                };
                            }

                            return (
                                <Card key={idx} className={`card ${theme.borderColor} ${theme.bgGradient}`}>
                                    <CardHeader className={`bg-gradient-to-r ${theme.headerGradient} to-transparent border-b ${theme.borderBottom}`}>
                                        <CardTitle className="flex items-center gap-3 text-2xl">
                                            <span className={theme.iconColor}>{theme.icon}</span>
                                            {section.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <RichTextRenderer text={section.content} />
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
