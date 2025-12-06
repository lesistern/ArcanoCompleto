'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface ExpandableRuleSectionProps {
    title: string;
    summary: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    defaultExpanded?: boolean;
}

export function ExpandableRuleSection({
    title,
    summary,
    children,
    icon,
    defaultExpanded = false
}: ExpandableRuleSectionProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <Card className="card hover:border-gold-500/30 transition-colors">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                        {icon && <div className="flex-shrink-0 mt-1">{icon}</div>}
                        <div className="flex-1 min-w-0">
                            <CardTitle className="text-xl text-dungeon-100 mb-2">
                                {title}
                            </CardTitle>
                            <p className="text-sm text-dungeon-300 leading-relaxed">
                                {summary}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex-shrink-0 p-2 rounded-md hover:bg-dungeon-800 transition-colors text-gold-500"
                        aria-label={isExpanded ? 'Contraer' : 'Expandir'}
                    >
                        {isExpanded ? (
                            <ChevronUp className="h-5 w-5" />
                        ) : (
                            <ChevronDown className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </CardHeader>

            {isExpanded && (
                <CardContent className="pt-0 border-t border-dungeon-700 mt-3">
                    <div className="prose prose-invert prose-sm max-w-none mt-4">
                        {children}
                    </div>
                </CardContent>
            )}

            {!isExpanded && (
                <CardContent className="pt-0">
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="text-sm text-gold-500 hover:text-gold-400 transition-colors font-medium"
                    >
                        Leer más →
                    </button>
                </CardContent>
            )}
        </Card>
    );
}
