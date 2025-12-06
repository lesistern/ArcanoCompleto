// src/components/profile/ProfileTabs.tsx
'use client';

import { useState } from 'react';
import { User, Users } from 'lucide-react';

export type TabKey = 'resumen' | 'personajes';

const TABS = [
  { key: 'resumen' as const, label: 'Resumen', icon: User },
  { key: 'personajes' as const, label: 'Personajes', icon: Users },
];

interface ProfileTabsProps {
  children: Record<TabKey, React.ReactNode>;
  defaultTab?: TabKey;
  onTabChange?: (tab: TabKey) => void;
}

export function ProfileTabs({
  children,
  defaultTab = 'resumen',
  onTabChange
}: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>(defaultTab);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div>
      {/* Tabs Navigation */}
      <div
        className="flex gap-2 border-b border-dungeon-700 mb-6 overflow-x-auto scrollbar-thin scrollbar-thumb-dungeon-700 scrollbar-track-dungeon-900"
        role="tablist"
        aria-label="Secciones del perfil"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.key}`}
              id={`tab-${tab.key}`}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-gold-400 text-gold-400 bg-gold-900/10'
                  : 'border-transparent text-dungeon-400 hover:text-dungeon-200 hover:bg-dungeon-800/50'
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div
        className="animate-in fade-in duration-300"
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {children[activeTab]}
      </div>
    </div>
  );
}
