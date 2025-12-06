'use client';

import Link from 'next/link';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface ActionCardProps {
  title: string;
  count: number;
  href: string;
  icon: LucideIcon;
  description?: string;
  color?: 'red' | 'blue' | 'orange' | 'green';
}

const colorSchemes = {
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    icon: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    hover: 'hover:bg-red-100 dark:hover:bg-red-900/30',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    icon: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    icon: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
    hover: 'hover:bg-orange-100 dark:hover:bg-orange-900/30',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    icon: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    hover: 'hover:bg-green-100 dark:hover:bg-green-900/30',
  },
};

export function ActionCard({
  title,
  count,
  href,
  icon: Icon,
  description,
  color = 'blue',
}: ActionCardProps) {
  const scheme = colorSchemes[color];

  return (
    <Link href={href}>
      <div
        className={`
          ${scheme.bg}
          ${scheme.border}
          ${scheme.hover}
          border rounded-lg p-6
          transition-all duration-200
          cursor-pointer
          flex items-start justify-between
        `}
      >
        {/* Left: Icon + Text */}
        <div className="flex items-start gap-4">
          <div className={`${scheme.icon} mt-1`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-base">
              {title}
            </p>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {count}
              </span>{' '}
              elemento{count !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Right: Arrow */}
        <ChevronRight className={`${scheme.icon} w-5 h-5 mt-1 flex-shrink-0`} />
      </div>
    </Link>
  );
}
