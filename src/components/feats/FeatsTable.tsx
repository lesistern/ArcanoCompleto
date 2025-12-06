'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Book } from 'lucide-react';
import { DnDFeat } from '@/lib/types/feat';
import { capitalizeFirst } from '@/lib/utils/text';
import {
    translateBook,
    translateType,
    ATTRIBUTE_TRANSLATIONS
} from '@/lib/utils/translations';

interface FeatsTableProps {
    feats: DnDFeat[];
}

function BookSection({ title, feats, featsMap }: { title: string, feats: DnDFeat[], featsMap: Map<string, string> }) {
    const [isOpen, setIsOpen] = useState(false);

    const renderPrerequisite = (text: string) => {
        let translated = text;
        Object.entries(ATTRIBUTE_TRANSLATIONS).forEach(([eng, esp]) => {
            translated = translated.replace(new RegExp(`\\b${eng}\\b`, 'gi'), esp);
        });

        const cleanText = text.trim().replace(/[.,]$/, '');
        const slug = featsMap.get(cleanText.toLowerCase());

        if (slug) {
            return (
                <Link
                    href={`/dotes/${slug}`}
                    className="text-gold-500 hover:text-gold-400 hover:underline transition-colors"
                >
                    {translated}
                </Link>
            );
        }

        return <span>{translated}</span>;
    };

    const parsePrerequisites = (prereqs: string[] | any[] | string) => {
        if (!prereqs || (Array.isArray(prereqs) && prereqs.length === 0)) return '-';

        let list: string[] = [];
        if (Array.isArray(prereqs)) {
            list = prereqs.map(p => typeof p === 'string' ? p : p.description || p.name);
        } else {
            list = [String(prereqs)];
        }

        return (
            <div className="flex flex-wrap gap-1">
                {list.map((item, idx) => (
                    <span key={idx}>
                        {renderPrerequisite(item)}
                        {idx < list.length - 1 && <span className="mr-1">,</span>}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="border-b border-dungeon-700 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-6 py-3 bg-dungeon-800/30 hover:bg-dungeon-800/50 transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    <Book className="h-4 w-4 text-dungeon-400" />
                    <span className="font-medium text-dungeon-200">
                        {title}
                    </span>
                    <span className="text-xs text-dungeon-500">
                        ({feats.length})
                    </span>
                </div>
                {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-dungeon-400" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-dungeon-400" />
                )}
            </button>

            {isOpen && (
                <div className="overflow-x-auto bg-dungeon-900/20">
                    <table className="w-full text-left border-collapse">
                        <tbody className="divide-y divide-dungeon-800/30">
                            <tr className="text-dungeon-500 text-xs uppercase tracking-wider">
                                <th className="px-4 py-2 font-medium text-left w-1/3">Dote</th>
                                <th className="px-4 py-2 font-medium text-left w-1/4">Tipo</th>
                                <th className="px-4 py-2 font-medium text-left w-1/3">Prerrequisitos</th>
                            </tr>
                            {feats.map((feat) => (
                                <tr
                                    key={feat.id}
                                    className="hover:bg-dungeon-800/30 transition-colors text-sm group"
                                >
                                    <td className="px-4 py-2 font-medium text-dungeon-100">
                                        <Link
                                            href={`/dotes/${feat.slug}`}
                                            className="text-gold-500 hover:text-gold-400 hover:underline transition-colors"
                                        >
                                            {capitalizeFirst(feat.name)}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2 text-dungeon-300">
                                        {translateType(feat.type)}
                                    </td>
                                    <td className="px-4 py-2 text-dungeon-300">
                                        {parsePrerequisites(feat.prerequisites)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default function FeatsTable({ feats }: FeatsTableProps) {
    const [isOpen, setIsOpen] = useState(false);

    const featsMap = useMemo(() => {
        const map = new Map<string, string>();
        feats.forEach(feat => {
            map.set(feat.name.toLowerCase(), feat.slug);
        });
        return map;
    }, [feats]);

    // Group feats by book
    const featsByBook = useMemo(() => {
        const groups: Record<string, DnDFeat[]> = {};
        feats.forEach(feat => {
            const bookName = translateBook(feat.source?.book || 'Core');
            if (!groups[bookName]) groups[bookName] = [];
            groups[bookName].push(feat);
        });

        // Sort feats within each book
        Object.keys(groups).forEach(key => {
            groups[key].sort((a, b) => a.name.localeCompare(b.name, 'es'));
        });

        return groups;
    }, [feats]);

    // Sort books alphabetically
    const sortedBooks = useMemo(() => {
        return Object.keys(featsByBook).sort((a, b) => a.localeCompare(b, 'es'));
    }, [featsByBook]);

    if (feats.length === 0) return null;

    return (
        <div className="rounded-lg border border-dungeon-700 bg-dungeon-900/30 mb-12 overflow-hidden">
            {/* Main Toggle Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-6 py-4 bg-dungeon-800/50 hover:bg-dungeon-800 transition-colors text-left border-b border-dungeon-700"
            >
                <div className="flex items-center gap-3">
                    <span className="font-heading font-bold text-lg text-dungeon-100">
                        Tabla Completa de Dotes por libro
                    </span>
                    <span className="text-sm text-dungeon-400">
                        ({feats.length} dotes en total)
                    </span>
                </div>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-gold-500" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gold-500" />
                )}
            </button>

            {/* Main Collapsible Content */}
            {isOpen && (
                <div className="bg-dungeon-900/10">
                    {sortedBooks.map(bookName => (
                        <BookSection
                            key={bookName}
                            title={bookName}
                            feats={featsByBook[bookName]}
                            featsMap={featsMap}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
