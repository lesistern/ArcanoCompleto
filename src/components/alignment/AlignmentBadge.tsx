'use client';

import { ALIGNMENT_CONFIG } from '@/lib/data/alignments';

interface AlignmentBadgeProps {
  code: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function AlignmentBadge({
  code,
  size = 'md',
  showLabel = true,
}: AlignmentBadgeProps) {
  const config = ALIGNMENT_CONFIG[code];

  if (!config) {
    return null;
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded font-semibold whitespace-nowrap ${sizeClasses[size]}`}
      style={{
        backgroundColor: config.hex + '30',
        color: config.hex,
        borderLeft: `3px solid ${config.hex}`,
      }}
      title={config.description}
    >
      {showLabel ? config.label : config.code}
    </span>
  );
}
