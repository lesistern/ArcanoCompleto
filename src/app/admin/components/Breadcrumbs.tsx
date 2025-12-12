'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    href?: string;
    current?: boolean;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            <Link
                href="/admin"
                className="flex items-center gap-1 text-gray-400 hover:text-gold-400 transition-colors"
            >
                <Home className="h-4 w-4" />
                <span>Admin</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                    {item.current || !item.href ? (
                        <span className="text-gold-400 font-medium">{item.label}</span>
                    ) : (
                        <Link
                            href={item.href}
                            className="text-gray-400 hover:text-gold-400 transition-colors"
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
