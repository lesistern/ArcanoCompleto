import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { LucideIcon } from 'lucide-react';

interface RuleCardProps {
    href: string;
    icon: LucideIcon;
    iconColor?: string;
    title: string;
    abbreviation?: string;
    description: string;
    compact?: boolean;
}

export function RuleCard({
    href,
    icon: Icon,
    iconColor = 'text-gold-500',
    title,
    abbreviation,
    description,
    compact = false,
}: RuleCardProps) {
    return (
        <Link href={href} className="block transition-transform hover:scale-[1.02]">
            <Card className="card h-full hover:border-gold-500/50 transition-colors">
                <CardHeader className="pb-2">
                    <CardTitle className={`flex items-center justify-between ${compact ? 'text-base' : 'text-lg'}`}>
                        <span className="flex items-center gap-2">
                            <Icon className={`h-5 w-5 ${iconColor}`} />
                            {title}
                        </span>
                        {abbreviation && (
                            <span className="text-xs font-mono text-dungeon-400 bg-dungeon-900 px-2 py-1 rounded">
                                {abbreviation}
                            </span>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-dungeon-300 line-clamp-3">{description}</p>
                </CardContent>
            </Card>
        </Link>
    );
}
