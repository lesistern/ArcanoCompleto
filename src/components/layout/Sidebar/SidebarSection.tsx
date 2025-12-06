'use client';

import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  icon?: ReactNode;
  isCollapsed?: boolean;
}

export default function SidebarSection({
  title,
  children,
  collapsible = false,
  defaultOpen = true,
  icon,
  isCollapsed = false,
}: SidebarSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (collapsible) {
    return (
      <div>
        {!isCollapsed && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-2 text-xs font-semibold text-dungeon-500 uppercase tracking-wider flex items-center justify-between gap-2 rounded-lg hover:text-dungeon-400 hover:bg-dungeon-800/50 transition-colors"
            aria-expanded={isOpen}
          >
            <span className="flex items-center gap-2">
              {icon}
              {title}
            </span>
            <ChevronDown
              size={14}
              className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        )}

        {(isOpen || isCollapsed) && <div className="space-y-1 mt-2">{children}</div>}
      </div>
    );
  }

  return (
    <div>
      {!isCollapsed && (
        <div className="px-4 py-2 text-xs font-semibold text-dungeon-500 uppercase tracking-wider flex items-center gap-2">
          {icon}
          {title}
        </div>
      )}
      <div className="space-y-1 mt-2">{children}</div>
    </div>
  );
}
