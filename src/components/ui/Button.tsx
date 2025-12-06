import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'outline' | 'destructive' | 'danger' | 'ghost' | 'secondary' | 'success' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses = {
  default: 'bg-gold-500 hover:bg-gold-600 text-white',
  primary: 'bg-gold-500 hover:bg-gold-600 text-white',
  outline: 'border border-dungeon-600 text-dungeon-100 hover:bg-dungeon-700',
  destructive: 'bg-red-500 hover:bg-red-600 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  ghost: 'hover:bg-dungeon-700 text-dungeon-100',
  secondary: 'bg-dungeon-700 hover:bg-dungeon-600 text-dungeon-100',
  success: 'bg-green-500 hover:bg-green-600 text-white',
  link: 'text-gold-500 hover:underline bg-transparent',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  className = '',
  variant = 'default',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
