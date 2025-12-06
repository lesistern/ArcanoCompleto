'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AchievementBadge } from './AchievementBadge';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  unlocked_at?: string | null;
  xp_reward?: number;
}

interface AchievementProgress {
  current: number;
  required: number;
  percentage: number;
}

interface CategoryProgress {
  unlocked: number;
  total: number;
  percentage: number;
}

interface AchievementsByCategoryProps {
  achievements: Achievement[];
  achievementProgress?: Record<string, AchievementProgress>;
  userPercentages?: Record<string, number>;
  showShareButtons?: boolean;
  onShareAchievement?: (achievementId: string) => void;
  defaultExpandedCategories?: string[];
}

export function AchievementsByCategory({
  achievements,
  achievementProgress = {},
  userPercentages = {},
  showShareButtons = false,
  onShareAchievement,
  defaultExpandedCategories = []
}: AchievementsByCategoryProps) {
  // Agrupar achievements por categoría
  const categories = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  // Estado de categorías expandidas
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(defaultExpandedCategories.length > 0 ? defaultExpandedCategories : Object.keys(categories))
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const getCategoryProgress = (categoryAchievements: Achievement[]): CategoryProgress => {
    const unlocked = categoryAchievements.filter(a => a.unlocked_at).length;
    const total = categoryAchievements.length;
    return {
      unlocked,
      total,
      percentage: total > 0 ? Math.round((unlocked / total) * 100) : 0
    };
  };

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      'reportes': '🐛',
      'votos': '⬆️',
      'niveles': '📈',
      'personajes': '🎭',
      'traducciones': '📝',
      'especiales': '🌟',
      'social': '👥',
      'explorador': '🗺️'
    };
    return icons[category.toLowerCase()] || '⭐';
  };

  return (
    <div className="space-y-4">
      {Object.entries(categories).map(([category, categoryAchievements]) => {
        const progress = getCategoryProgress(categoryAchievements);
        const isExpanded = expandedCategories.has(category);
        const icon = getCategoryIcon(category);

        return (
          <div key={category} className="border border-dungeon-700 rounded-xl overflow-hidden">
            {/* Header de categoría */}
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-dungeon-800 to-dungeon-900 hover:from-dungeon-700 hover:to-dungeon-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gold-400">
                    {category}
                  </h3>
                  <p className="text-sm text-dungeon-300">
                    {progress.unlocked} de {progress.total} desbloqueados ({progress.percentage}%)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Barra de progreso de categoría */}
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-32 bg-dungeon-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-gold-500 to-orange-500 h-full transition-all duration-300"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-dungeon-400 font-medium min-w-[3rem] text-right">
                    {progress.percentage}%
                  </span>
                </div>

                {/* Icono de expandir/colapsar */}
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gold-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-dungeon-400" />
                )}
              </div>
            </button>

            {/* Achievements de la categoría */}
            {isExpanded && (
              <div className="p-4 bg-dungeon-950">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {categoryAchievements.map(achievement => (
                    <AchievementBadge
                      key={achievement.id}
                      achievement={achievement}
                      locked={!achievement.unlocked_at}
                      size="md"
                      progress={achievementProgress[achievement.id]}
                      userPercentage={userPercentages[achievement.id]}
                      showShareButton={showShareButtons && !!achievement.unlocked_at}
                      onShare={onShareAchievement}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
