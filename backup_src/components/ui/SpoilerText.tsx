'use client';

import { useState, ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface SpoilerTextProps {
  children: ReactNode;
  defaultHidden?: boolean;
  className?: string;
  /** Modo inline (para palabras/frases) o block (para párrafos) */
  mode?: 'inline' | 'block';
}

/**
 * Componente de texto con spoiler (ocultar/mostrar)
 *
 * Features:
 * - Click para revelar/ocultar
 * - Blur + fondo negro cuando está oculto
 * - Soporte inline y block
 * - Hover hint para revelar
 *
 * Ejemplo de uso:
 * ```tsx
 * <SpoilerText>El asesino es el mayordomo</SpoilerText>
 * <SpoilerText mode="block">
 *   Párrafo completo con información sensible...
 * </SpoilerText>
 * ```
 */
export default function SpoilerText({
  children,
  defaultHidden = true,
  className = '',
  mode = 'inline'
}: SpoilerTextProps) {
  const [isHidden, setIsHidden] = useState(defaultHidden);

  const handleToggle = () => {
    setIsHidden(!isHidden);
  };

  // ========================================================================
  // CLASES CSS
  // ========================================================================

  const baseClasses = `
    relative
    transition-all
    duration-300
    cursor-pointer
    select-none
  `;

  const modeClasses = mode === 'inline'
    ? 'inline-block px-1 py-0.5 rounded'
    : 'block p-3 rounded-lg my-2';

  const hiddenClasses = isHidden
    ? `
      bg-dungeon-900
      text-transparent
      blur-sm
      hover:blur-md
      border
      border-dungeon-700
      hover:border-gold-600
    `
    : `
      bg-transparent
      text-dungeon-100
      border
      border-transparent
    `;

  const combinedClasses = `${baseClasses} ${modeClasses} ${hiddenClasses} ${className}`.trim();

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <span className={combinedClasses} onClick={handleToggle} title={isHidden ? 'Click para revelar' : 'Click para ocultar'}>
      {/* Contenido */}
      <span className={isHidden ? 'invisible' : 'visible'}>
        {children}
      </span>

      {/* Texto de placeholder cuando está oculto */}
      {isHidden && (
        <span className="absolute inset-0 flex items-center justify-center text-dungeon-500 text-xs font-medium gap-1">
          <EyeOff className="h-3 w-3" />
          {mode === 'inline' ? 'Spoiler' : 'Click para revelar'}
        </span>
      )}

      {/* Badge cuando está visible (opcional) */}
      {!isHidden && mode === 'block' && (
        <span className="absolute top-1 right-1 bg-dungeon-800 text-dungeon-400 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <Eye className="h-3 w-3" />
          Spoiler
        </span>
      )}
    </span>
  );
}
