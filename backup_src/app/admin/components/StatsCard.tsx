'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    href?: string;
    description?: string;
    loading?: boolean;
}

export function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    href,
    description,
    loading = false
}: StatsCardProps) {
    const cardContent = (
        <div
            className={`
        relative overflow-hidden rounded-lg border border-dungeon-700 
        bg-gradient-to-br from-dungeon-800 to-dungeon-900 p-6
        transition-all duration-200
        ${href ? 'hover:border-gold-400 hover:shadow-lg hover:shadow-gold-900/20 cursor-pointer' : ''}
      `}
        >
            {/* Icon Background */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
                <Icon className="h-32 w-32 text-gold-400" />
            </div>

            {/* Content */}
            <div className="relative">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gold-900/30 border border-gold-400/30">
                            <Icon className="h-5 w-5 text-gold-400" />
                        </div>
                        <h3 className="text-sm font-semibold text-dungeon-300">
                            {title}
                        </h3>
                    </div>
                    {trend && (
                        <div className={`flex items-center gap-1 text-xs font-medium ${trend.isPositive ? 'text-green-400' : 'text-red-400'
                            }`}>
                            <span>{trend.isPositive ? '↑' : '↓'}</span>
                            <span>{trend.value}</span>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="h-10 flex items-center">
                        <div className="h-8 w-24 bg-dungeon-700 animate-pulse rounded" />
                    </div>
                ) : (
                    <>
                        <div className="text-3xl font-bold text-gold-400 mb-1">
                            {value.toLocaleString()}
                        </div>
                        {description && (
                            <p className="text-xs text-dungeon-400">
                                {description}
                            </p>
                        )}
                    </>
                )}
            </div>

            {/* Hover Effect Border */}
            {href && (
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-400 rounded-lg pointer-events-none transition-colors" />
            )}
        </div>
    );

    if (href) {
        return <Link href={href}>{cardContent}</Link>;
    }

    return cardContent;
}
