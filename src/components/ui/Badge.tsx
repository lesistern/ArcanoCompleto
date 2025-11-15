import { HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'monster' | 'spell' | 'item' | 'class' | 'outline';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          {
            'bg-dungeon-600 text-dungeon-100': variant === 'default',
            'bg-monster-red/20 text-monster-red border border-monster-red/50': variant === 'monster',
            'bg-spell-blue/20 text-spell-blue border border-spell-blue/50': variant === 'spell',
            'bg-item-gold/20 text-item-gold border border-item-gold/50': variant === 'item',
            'bg-class-green/20 text-class-green border border-class-green/50': variant === 'class',
            'border border-dungeon-500 text-dungeon-200': variant === 'outline',
          },
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
