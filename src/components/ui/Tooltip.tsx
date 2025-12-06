'use client';

import React, { useState, useRef } from 'react';

interface TooltipProps {
  content: string | React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: React.ReactNode;
}

export default function Tooltip({
  content,
  position = 'top',
  delay = 300,
  children,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute ${positionClasses[position]} z-50 px-2 py-1 bg-dungeon-900 text-dungeon-100 text-xs rounded whitespace-nowrap border border-dungeon-600`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
