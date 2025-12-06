'use client';

import { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'red' | 'blue' | 'green' | 'orange' | 'purple';
  trend?: {
    value: number;
    positive: boolean;
    label: string;
  };
  description?: string;
}

const colorSchemes = {
  red: {
    bg: 'bg-red-50 dark:bg-red-900/10',
    border: 'border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-500',
    iconBg: 'bg-red-100 dark:bg-red-900/20',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-500',
    iconBg: 'bg-blue-100 dark:bg-blue-900/20',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/10',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-500',
    iconBg: 'bg-green-100 dark:bg-green-900/20',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/10',
    border: 'border-orange-200 dark:border-orange-800',
    icon: 'text-orange-600 dark:text-orange-500',
    iconBg: 'bg-orange-100 dark:bg-orange-900/20',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/10',
    border: 'border-purple-200 dark:border-purple-800',
    icon: 'text-purple-600 dark:text-purple-500',
    iconBg: 'bg-purple-100 dark:bg-purple-900/20',
  },
};

export function MetricCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
  description,
}: MetricCardProps) {
  const scheme = colorSchemes[color];

  return (
    <div
      className={`
        ${scheme.bg}
        ${scheme.border}
        rounded-lg border p-6
        hover:shadow-md transition-shadow
      `}
    >
      {/* Header: Icon + Label */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`${scheme.iconBg} w-10 h-10 rounded-lg flex items-center justify-center`}>
          <Icon className={`${scheme.icon} w-5 h-5`} />
        </div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </p>
      </div>

      {/* Main Value */}
      <div className="mb-3">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {value.toLocaleString()}
        </p>
      </div>

      {/* Trend Indicator or Description */}
      {trend ? (
        <div className="flex items-center gap-1 text-sm">
          {trend.positive ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span
            className={`${
              trend.positive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            } font-medium`}
          >
            {trend.positive ? '+' : '-'}
            {trend.value}%
          </span>
          <span className="text-gray-500 dark:text-gray-500">
            {trend.label}
          </span>
        </div>
      ) : description ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}
