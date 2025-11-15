import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          // Base styles
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          // Variants
          {
            'bg-gold-500 text-dungeon-900 hover:bg-gold-600 focus-visible:ring-gold-500':
              variant === 'primary',
            'bg-dungeon-700 text-dungeon-100 hover:bg-dungeon-600 focus-visible:ring-dungeon-500':
              variant === 'secondary',
            'bg-transparent hover:bg-dungeon-700/50 text-dungeon-100':
              variant === 'ghost',
            'bg-crimson-500 text-white hover:bg-crimson-600 focus-visible:ring-crimson-500':
              variant === 'danger',
          },
          // Sizes
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
