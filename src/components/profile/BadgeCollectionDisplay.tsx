'use client';

import { useState, useEffect } from 'react';
import { Award, Lock, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Badge {
  badge_id: string;
  badge_name: string;
  badge_description: string;
  badge_icon: string;
  badge_rarity: 'common' | 'rare' | 'epic' | 'legendary';
  badge_category: string;
}

interface BadgeCollectionDisplayProps {
  userId: string;
  unlockedBadges: string[];
  isOwner: boolean;
}

const RARITY_COLORS = {
  common: {
    border: 'border-gray-500/50',
    bg: 'bg-gray-500/10',
    text: 'text-gray-400',
    label: 'Común',
  },
  rare: {
    border: 'border-blue-500/50',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    label: 'Raro',
  },
  epic: {
    border: 'border-purple-500/50',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    label: 'Épico',
  },
  legendary: {
    border: 'border-gold-500/50',
    bg: 'bg-gold-500/10',
    text: 'text-gold-400',
    label: 'Legendario',
  },
};

export function BadgeCollectionDisplay({
  userId,
  unlockedBadges,
  isOwner,
}: BadgeCollectionDisplayProps) {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [allBadges, setAllBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const supabase = createClient();

  useEffect(() => {
    loadBadges();
  }, [userId, unlockedBadges]);

  async function loadBadges() {
    try {
      setLoading(true);
      setError(null);

      // First, try to load all available badges from the table
      const { data: allBadgesData, error: allBadgesError } = await supabase
        .from('profile_badges')
        .select('*')
        .order('rarity', { ascending: true });

      // If table doesn't exist or is empty, show empty state (not an error)
      if (allBadgesError) {
        // Table might not exist yet - this is ok, just show empty state
        console.log('Badge table not available:', allBadgesError.message);
        setBadges([]);
        setAllBadges([]);
        setLoading(false);
        return;
      }

      setAllBadges(allBadgesData || []);

      // Map unlocked badges from props to full badge data
      if (unlockedBadges && unlockedBadges.length > 0 && allBadgesData) {
        const userBadges = allBadgesData
          .filter((b: any) => unlockedBadges.includes(b.id))
          .map((b: any) => ({
            badge_id: b.id,
            badge_name: b.name,
            badge_description: b.description,
            badge_icon: b.icon,
            badge_rarity: b.rarity,
            badge_category: b.category,
          }));
        setBadges(userBadges);
      } else {
        setBadges([]);
      }
    } catch (err) {
      console.error('Error loading badges:', err);
      // Don't show error state, just empty badges
      setBadges([]);
      setAllBadges([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12" role="status" aria-label="Cargando badges">
        <Loader2 className="h-8 w-8 text-gold-400 animate-spin" aria-hidden="true" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/40 rounded-xl">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  // Filter badges
  const filteredBadges =
    activeFilter === 'all'
      ? badges
      : badges.filter((b) => b.badge_category === activeFilter);

  const categories = Array.from(new Set(badges.map((b) => b.badge_category)));

  // Get locked badges (only for owners)
  const lockedBadges = isOwner
    ? allBadges.filter((b) => !unlockedBadges.includes(b.id))
    : [];

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gold-300">
            Colección de Badges
          </h3>
          <p className="text-sm text-dungeon-400 mt-1">
            {badges.length} badge{badges.length !== 1 ? 's' : ''} desbloqueado{badges.length !== 1 ? 's' : ''}
            {isOwner && ` de ${allBadges.length} totales`}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/40 rounded-lg">
          <Award className="h-5 w-5 text-gold-400" aria-hidden="true" />
          <span className="text-lg font-bold text-gold-300" aria-label={`${badges.length} badges desbloqueados`}>{badges.length}</span>
        </div>
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-gold-500 text-dungeon-950'
                : 'bg-dungeon-800 text-dungeon-300 hover:bg-dungeon-700'
            }`}
          >
            Todos ({badges.length})
          </button>
          {categories.map((category) => {
            const count = badges.filter((b) => b.badge_category === category).length;
            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                  activeFilter === category
                    ? 'bg-gold-500 text-dungeon-950'
                    : 'bg-dungeon-800 text-dungeon-300 hover:bg-dungeon-700'
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Unlocked Badges Grid */}
      {filteredBadges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Badges desbloqueados">
          {filteredBadges.map((badge) => {
            const rarity = RARITY_COLORS[badge.badge_rarity];
            return (
              <div
                key={badge.badge_id}
                role="listitem"
                className={`relative p-4 rounded-xl border-2 ${rarity.border} ${rarity.bg} transition-all group hover:scale-[1.02]`}
              >
                {/* Badge Icon */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl" role="img" aria-label={badge.badge_name}>
                    {badge.badge_icon}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-bold text-gold-300">{badge.badge_name}</h4>
                    <span className={`text-xs font-semibold ${rarity.text}`}>
                      {rarity.label}
                    </span>
                  </div>
                </div>

                {/* Badge Description */}
                <p className="text-sm text-dungeon-300">{badge.badge_description}</p>

                {/* Category */}
                <div className="mt-2">
                  <span className="inline-block px-2 py-0.5 bg-dungeon-800/50 border border-dungeon-700 rounded text-xs text-dungeon-400 capitalize">
                    {badge.badge_category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-dungeon-700 rounded-xl bg-dungeon-950/50" role="status">
          <Award className="h-12 w-12 text-dungeon-500 mx-auto mb-3" aria-hidden="true" />
          <p className="text-dungeon-300">
            {activeFilter === 'all'
              ? 'No hay badges desbloqueados aún'
              : `No hay badges de la categoría "${activeFilter}"`}
          </p>
        </div>
      )}

      {/* Locked Badges (Only for owners) */}
      {isOwner && lockedBadges.length > 0 && (
        <div className="pt-6 border-t border-dungeon-700">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-5 w-5 text-dungeon-500" aria-hidden="true" />
            <h3 className="text-lg font-bold text-dungeon-400">
              Badges Bloqueados ({lockedBadges.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Badges bloqueados">
            {lockedBadges.map((badge) => {
              const rarity = RARITY_COLORS[badge.rarity as keyof typeof RARITY_COLORS];
              return (
                <div
                  key={badge.id}
                  role="listitem"
                  className="relative p-4 rounded-xl border-2 border-dungeon-700 bg-dungeon-900/50 opacity-50"
                >
                  {/* Lock Icon Overlay */}
                  <div className="absolute top-3 right-3">
                    <Lock className="h-4 w-4 text-dungeon-600" aria-hidden="true" />
                  </div>

                  {/* Badge Icon (grayscale) */}
                  <div className="flex items-center gap-3 mb-2 grayscale">
                    <span className="text-3xl" role="img" aria-label={badge.name}>
                      {badge.icon}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-bold text-dungeon-400">{badge.name}</h4>
                      <span className="text-xs font-semibold text-dungeon-500">
                        {rarity.label}
                      </span>
                    </div>
                  </div>

                  {/* Badge Description */}
                  <p className="text-sm text-dungeon-500">{badge.description}</p>

                  {/* Unlock Condition */}
                  <p className="text-xs text-dungeon-600 mt-2 italic">
                    Desbloquear: {badge.unlock_condition}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
