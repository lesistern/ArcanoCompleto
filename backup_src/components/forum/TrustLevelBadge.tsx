'use client';

import { Shield } from 'lucide-react';

export type TrustLevel = 'TL0' | 'TL1' | 'TL2' | 'TL3' | 'TL4';

interface TrustLevelBadgeProps {
  level: TrustLevel;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const TRUST_LEVEL_CONFIG = {
  TL0: {
    name: 'Nuevo',
    color: 'text-gray-400',
    bgColor: 'bg-gray-900/50',
    borderColor: 'border-gray-500/30',
    description: 'Puede ver y crear hilos',
  },
  TL1: {
    name: 'Básico',
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/50',
    borderColor: 'border-blue-500/30',
    description: '100 XP - Puede votar',
  },
  TL2: {
    name: 'Regular',
    color: 'text-green-400',
    bgColor: 'bg-green-900/50',
    borderColor: 'border-green-500/30',
    description: '500 XP - Puede dar downvotes',
  },
  TL3: {
    name: 'Confiable',
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/50',
    borderColor: 'border-purple-500/30',
    description: '2,000 XP - Puede editar posts de otros',
  },
  TL4: {
    name: 'Líder',
    color: 'text-gold-400',
    bgColor: 'bg-gold-900/50',
    borderColor: 'border-gold-500/30',
    description: '10,000 XP - Puede moderar',
  },
} as const;

const SIZE_CLASSES = {
  sm: {
    text: 'text-xs',
    padding: 'px-2 py-0.5',
    icon: 'w-3 h-3',
  },
  md: {
    text: 'text-sm',
    padding: 'px-3 py-1',
    icon: 'w-4 h-4',
  },
  lg: {
    text: 'text-base',
    padding: 'px-4 py-2',
    icon: 'w-5 h-5',
  },
};

export default function TrustLevelBadge({
  level,
  showLabel = true,
  size = 'md',
}: TrustLevelBadgeProps) {
  const config = TRUST_LEVEL_CONFIG[level];
  const sizeClasses = SIZE_CLASSES[size];

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${sizeClasses.padding} ${config.bgColor} ${config.borderColor} border rounded-full ${sizeClasses.text} font-semibold`}
      title={config.description}
    >
      <Shield className={`${sizeClasses.icon} ${config.color}`} />
      <span className={config.color}>
        {level}
        {showLabel && size !== 'sm' && ` - ${config.name}`}
      </span>
    </div>
  );
}
