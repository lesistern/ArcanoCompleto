'use client';

import { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

interface HelpTooltipProps {
  content: React.ReactNode;
  /**
   * Si es true, el tooltip se muestra inicialmente (modo ayuda activo)
   * Si es false, solo se muestra al hacer hover
   */
  alwaysVisible?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

/**
 * Tooltip de ayuda contextual con icono de "?"
 * - En modo ayuda (alwaysVisible=true): Se muestra 5 segundos, luego desaparece
 * - Click en "?": Muestra el tooltip de nuevo
 * - Click fuera: Oculta el tooltip
 * - Hover: Muestra el tooltip (cuando no está en modo ayuda)
 */
export default function HelpTooltip({
  content,
  alwaysVisible = false,
  position = 'right',
  className = ''
}: HelpTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExplicitlyOpen, setIsExplicitlyOpen] = useState(false);
  const [showAfterDelay, setShowAfterDelay] = useState(true);
  const triggerRef = useRef<HTMLDivElement>(null);
  const manualOpenTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Timer de 5 segundos para ocultar automáticamente en modo alwaysVisible
  useEffect(() => {
    if (alwaysVisible && showAfterDelay && !isExplicitlyOpen) {
      const timer = setTimeout(() => {
        setShowAfterDelay(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alwaysVisible, showAfterDelay, isExplicitlyOpen]);

  // Resetear showAfterDelay cuando cambia alwaysVisible
  useEffect(() => {
    if (alwaysVisible) {
      setShowAfterDelay(true);
    }
  }, [alwaysVisible]);

  // Timer de 10 segundos cuando se abre manualmente
  useEffect(() => {
    if (isExplicitlyOpen) {
      manualOpenTimeoutRef.current = setTimeout(() => {
        setIsExplicitlyOpen(false);
      }, 10000); // 10 segundos

      return () => {
        if (manualOpenTimeoutRef.current) {
          clearTimeout(manualOpenTimeoutRef.current);
        }
      };
    }
  }, [isExplicitlyOpen]);

  // Click fuera para cerrar tooltip explícitamente abierto
  useEffect(() => {
    if (!isExplicitlyOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Si el click es fuera del componente, cerrar inmediatamente
      if (triggerRef.current && !triggerRef.current.contains(target)) {
        setIsExplicitlyOpen(false);
      }
    };

    // Usar setTimeout para evitar que el click de apertura cierre inmediatamente
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside, true); // Usar fase de captura
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isExplicitlyOpen]);

  // Click en el icono "?" para mostrar de nuevo el tooltip
  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation(); // Detener también propagación de evento nativo

    setIsExplicitlyOpen(!isExplicitlyOpen);
    if (!isExplicitlyOpen) {
      setShowAfterDelay(true);
    }
  };

  // Mostrar tooltip si:
  // 1. Modo ayuda activo Y dentro del periodo de 5 segundos
  // 2. Usuario hizo hover
  // 3. Usuario hizo click en "?" (explícitamente abierto)
  const isVisible = (alwaysVisible && showAfterDelay) || isHovered || isExplicitlyOpen;

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
    }
  };

  const getArrowStyles = () => {
    const baseStyles = 'absolute w-2 h-2 bg-blue-900 border-blue-500 rotate-45';
    switch (position) {
      case 'top':
        return `${baseStyles} bottom-[-4px] left-1/2 -translate-x-1/2 border-b border-r`;
      case 'bottom':
        return `${baseStyles} top-[-4px] left-1/2 -translate-x-1/2 border-t border-l`;
      case 'left':
        return `${baseStyles} right-[-4px] top-1/2 -translate-y-1/2 border-t border-r`;
      case 'right':
        return `${baseStyles} left-[-4px] top-1/2 -translate-y-1/2 border-b border-l`;
    }
  };

  return (
    <div
      ref={triggerRef}
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icono de ayuda */}
      <button
        type="button"
        onMouseDown={handleIconClick}
        className={`
          flex items-center justify-center
          rounded-full w-5 h-5
          transition-all duration-200
          cursor-pointer
          ${alwaysVisible || isExplicitlyOpen
            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
            : 'bg-dungeon-800 text-dungeon-500 border border-dungeon-700 hover:text-blue-400 hover:border-blue-500/50'
          }
        `}
        aria-label="Ayuda"
      >
        <HelpCircle className="h-3.5 w-3.5" />
      </button>

      {/* Tooltip */}
      <div
        className={`
          absolute z-50 ${getPositionStyles()}
          w-64
          px-4 py-3 rounded-lg
          bg-blue-900 border-2 border-blue-500
          text-blue-100 text-xs leading-relaxed
          shadow-xl shadow-blue-500/20
          pointer-events-none
          transition-all duration-300 ease-in-out
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
        role="tooltip"
      >
          {/* Contenido del tooltip */}
          <div className="relative z-10">
            {typeof content === 'string' ? (
              <p>{content}</p>
            ) : (
              content
            )}
          </div>

          {/* Arrow */}
          <div className={getArrowStyles()} />
      </div>
    </div>
  );
}
