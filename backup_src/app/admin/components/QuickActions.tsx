'use client';

import Link from 'next/link';
import { LucideIcon, Plus } from 'lucide-react';

interface QuickAction {
    label: string;
    href: string;
    icon: LucideIcon;
    description?: string;
}

interface QuickActionsProps {
    actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
    return (
        <div className="bg-dungeon-800 rounded-lg border border-dungeon-700 p-6">
            <h2 className="text-xl font-bold text-gold-400 mb-4 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Acciones Rápidas
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {actions.map((action) => (
                    <Link
                        key={action.href}
                        href={action.href}
                        className="
              group relative overflow-hidden
              flex items-center gap-3 p-4
              bg-dungeon-900 rounded-lg border border-dungeon-700
              hover:border-gold-400 hover:bg-dungeon-800
              transition-all duration-200
            "
                    >
                        <div className="p-2 rounded-lg bg-gold-900/20 border border-gold-400/30 group-hover:bg-gold-900/40 transition-colors">
                            <action.icon className="h-5 w-5 text-gold-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-dungeon-100 group-hover:text-gold-400 transition-colors">
                                {action.label}
                            </div>
                            {action.description && (
                                <div className="text-xs text-dungeon-400 truncate">
                                    {action.description}
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
