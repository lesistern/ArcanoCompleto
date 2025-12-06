import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          // Base styles
          'btn',
          // Variants
          {
            'btn-primary': variant === 'primary',
            'btn-secondary': variant === 'secondary',
            'btn-ghost': variant === 'ghost',
            'bg-crimson-500 text-white hover:bg-crimson-600 focus-visible:ring-crimson-500':
              variant === 'danger',
            'bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-500':
              variant === 'success',
            'border border-dungeon-700 text-dungeon-100 hover:bg-dungeon-800 focus-visible:ring-dungeon-500':
              variant === 'outline',
          },
          // Sizes (handled by global .btn but overrides possible here if needed, 
          // currently .btn handles padding, so we might just need text size adjustments if global doesn't cover it fully 
          // or if we want to keep the specific sizing logic)
          {
            'text-sm py-1.5 px-3': size === 'sm',
            'text-base py-2.5 px-5': size === 'md',
            'text-lg py-3 px-6': size === 'lg',
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

export { Button };
