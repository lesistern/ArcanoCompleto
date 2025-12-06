'use client';

import { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Tooltip simple sin dependencias externas
 * Muestra contenido al hacer hover sobre el children
 */
export default function Tooltip({ content, children, delay = 300, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({ x: rect.left + rect.width / 2, y: rect.top });
      }
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}

      {isVisible && (
        <div
          className={`
            absolute z-50 ${getPositionStyles()}
            px-3 py-2 rounded-lg
            bg-dungeon-800 border border-dungeon-600
            text-dungeon-100 text-xs
            shadow-xl
            pointer-events-none
            animate-in fade-in-0 zoom-in-95
            duration-200
            max-w-xs
          `}
          role="tooltip"
        >
          {content}
          {/* Arrow */}
          <div
            className={`
              absolute w-2 h-2 bg-dungeon-800 border-dungeon-600
              rotate-45
              ${position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2 border-b border-r' : ''}
              ${position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2 border-t border-l' : ''}
              ${position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2 border-t border-r' : ''}
              ${position === 'right' ? 'left-[-4px] top-1/2 -translate-y-1/2 border-b border-l' : ''}
            `}
          />
        </div>
      )}
    </div>
  );
}
