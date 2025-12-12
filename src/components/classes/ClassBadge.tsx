// src/components/classes/ClassBadge.tsx
'use client';

import Link from 'next/link';
import { getClassIcon } from '@/lib/utils/classIcons';
import { getClassColor, extractTextColor } from '@/lib/utils/icons';
import { formatClassName as formatClassNameUtil } from '@/lib/utils/formatters';

// Re-exportar la función para mantener compatibilidad
export { formatClassName } from '@/lib/utils/formatters';

interface ClassBadgeProps {
  classSlug: string;
  /** Mostrar icono de clase */
  showIcon?: boolean;
  /** Tamaño del badge */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Hacer clickeable (enlace a /clases/[slug]) */
  clickable?: boolean;
  /** Clases CSS adicionales */
  className?: string;
}

export function ClassBadge({
  classSlug,
  showIcon = true,
  size = 'sm',
  clickable = true,
  className = ''
}: ClassBadgeProps) {
  const ClassIcon = getClassIcon(classSlug);
  const classColor = getClassColor(formatClassNameUtil(classSlug));
  const iconColor = extractTextColor(classColor);
  const formattedName = formatClassNameUtil(classSlug);

  // Configuración de tamaños
  const sizeClasses = {
    xs: {
      padding: 'px-2 py-0.5',
      text: 'text-xs',
      icon: 'h-2.5 w-2.5',
      gap: 'gap-1'
    },
    sm: {
      padding: 'px-3 py-1.5',
      text: 'text-xs',
      icon: 'h-3 w-3',
      gap: 'gap-1.5'
    },
    md: {
      padding: 'px-4 py-2',
      text: 'text-sm',
      icon: 'h-4 w-4',
      gap: 'gap-2'
    },
    lg: {
      padding: 'px-5 py-2.5',
      text: 'text-base',
      icon: 'h-5 w-5',
      gap: 'gap-2.5'
    }
  };

  const config = sizeClasses[size];

  // Clases base del badge
  const badgeClasses = `
    inline-flex items-center ${config.gap} ${config.padding} ${config.text}
    rounded-lg border font-medium
    bg-dungeon-950/80 border-dungeon-800
    transition-all duration-200
    ${className}
  `.trim();

  // Clases adicionales si es clickeable
  const hoverClasses = clickable
    ? 'hover:border-gold-500/50 hover:bg-dungeon-900/60 hover:scale-[1.02] cursor-pointer group'
    : '';

  const content = (
    <>
      {showIcon && (
        <ClassIcon
          className={`${config.icon} ${iconColor} transition-colors ${
            clickable ? 'group-hover:text-gold-500' : ''
          }`}
        />
      )}
      <span className={`${clickable ? 'group-hover:text-gold-400' : 'text-dungeon-200'} transition-colors`}>
        {formattedName}
      </span>
    </>
  );

  if (clickable) {
    return (
      <Link
        href={`/clases/${classSlug}`}
        className={`${badgeClasses} ${hoverClasses}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <span className={badgeClasses}>
      {content}
    </span>
  );
}
