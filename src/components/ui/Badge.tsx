import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

const variantClasses = {
  default: 'bg-gold-500/20 text-gold-400 border border-gold-500/30',
  secondary: 'bg-dungeon-700 text-dungeon-200 border border-dungeon-600',
  outline: 'bg-transparent text-dungeon-300 border border-dungeon-600',
  destructive: 'bg-red-500/20 text-red-400 border border-red-500/30',
};

export function Badge({
  className = '',
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
