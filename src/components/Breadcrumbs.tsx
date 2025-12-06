'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav
      className={`flex items-center gap-2 text-sm text-dungeon-400 mb-6 ${className}`}
      aria-label="Breadcrumbs"
    >
      {/* Home link */}
      <Link
        href="/3.5"
        className="flex items-center gap-1 hover:text-gold-400 transition-colors"
        title="Ir a inicio"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Inicio</span>
      </Link>

      {/* Breadcrumb items */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-gold-400 transition-colors truncate"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-dungeon-300 truncate">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
