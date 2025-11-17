// src/components/profile/ProfileTabs.tsx
'use client';

import { useState } from 'react';
import { User, Activity, Users, Bug, BarChart3 } from 'lucide-react';

export type TabKey = 'resumen' | 'actividad' | 'personajes' | 'reportes' | 'stats';

const TABS = [
  { key: 'resumen' as const, label: 'Resumen', icon: User },
  { key: 'actividad' as const, label: 'Actividad', icon: Activity },
  { key: 'personajes' as const, label: 'Personajes', icon: Users },
  { key: 'reportes' as const, label: 'Reportes', icon: Bug },
  { key: 'stats' as const, label: 'Estadísticas', icon: BarChart3 },
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
      <div className="flex gap-2 border-b border-dungeon-700 mb-6 overflow-x-auto scrollbar-thin scrollbar-thumb-dungeon-700 scrollbar-track-dungeon-900">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-gold-400 text-gold-400 bg-gold-900/10'
                  : 'border-transparent text-dungeon-400 hover:text-dungeon-200 hover:bg-dungeon-800/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in duration-300">{children[activeTab]}</div>
    </div>
  );
}
