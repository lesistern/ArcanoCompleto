'use client';

import { Button } from '@/components/ui/Button';
import { UserProfile, TIER_BADGES, SAFE_FORMAT, getTierBadge } from '@/lib/data/user-management';
import { Ban, X, Plus } from 'lucide-react';

interface UserCardProps {
  user: UserProfile;
  userTiers: string[];
  onNavigate: (userId: string) => void;
  onEditTiers: (user: UserProfile) => void;
  onRemoveTier: (userId: string, tier: string) => void;
  onBan: (user: UserProfile) => void;
  processing: boolean;
  currentUserIsAdmin: boolean;
}

export function UserCard({
  user,
  userTiers,
  onNavigate,
  onEditTiers,
  onRemoveTier,
  onBan,
  processing,
  currentUserIsAdmin,
}: UserCardProps) {
  const badge = TIER_BADGES[userTiers[0] as keyof typeof TIER_BADGES] || TIER_BADGES.user;
  const BadgeIcon = badge.icon;
  const banned = Boolean(user.forum_banned_until);

  return (
    <div className="border border-dungeon-700 rounded-lg p-4 bg-dungeon-900 flex flex-col md:flex-row justify-between gap-3">
      <div className="flex gap-4 items-start">
        <div className="w-11 h-11 rounded bg-dungeon-800 border border-dungeon-700 flex items-center justify-center uppercase text-lg font-semibold text-gold-400 font-heading">
          {(user.display_name || user.email || '?').slice(0, 1)}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-3 py-1 rounded-full text-sm font-semibold border flex items-center gap-2 bg-dungeon-800 border-dungeon-700">
              <BadgeIcon className="w-4 h-4" />
              <span>{user.display_name || 'Sin nombre'}</span>
              <span className="text-dungeon-400 text-xs">{user.email}</span>
            </div>
            {banned && (
              <span className="text-xs px-2 py-1 rounded border border-red-500/40 text-red-300 bg-red-500/10">
                Baneado
              </span>
            )}
          </div>
          <div className="mt-2 grid md:grid-cols-2 gap-1 text-sm text-dungeon-300">
            <div>
              <span className="font-semibold text-dungeon-400">Slug:</span> {SAFE_FORMAT.val(user.username_slug)}
            </div>
            <div>
              <span className="font-semibold text-dungeon-400">Telefono:</span> {SAFE_FORMAT.val(user.phone)}
            </div>
            <div>
              <span className="font-semibold text-dungeon-400">Nivel:</span> {SAFE_FORMAT.val(user.level)}
            </div>
            <div>
              <span className="font-semibold text-dungeon-400">EXP:</span>{' '}
              {SAFE_FORMAT.val(user.experience_points)}
            </div>
            <div>
              <span className="font-semibold text-dungeon-400">Reportes:</span>{' '}
              {SAFE_FORMAT.val(user.reports_submitted)} / {SAFE_FORMAT.val(user.reports_resolved)}
            </div>
            <div>
              <span className="font-semibold text-dungeon-400">Votos recibidos:</span>{' '}
              {SAFE_FORMAT.val(user.total_votes_received)}
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2 flex-wrap mt-2">
            {userTiers.map((tier) => {
              const tierInfo = TIER_BADGES[tier as keyof typeof TIER_BADGES] || TIER_BADGES.user;
              const TierIcon = tierInfo.icon;
              return (
                <div
                  key={tier}
                  className={`px-2 py-1 rounded text-xs font-semibold border ${tierInfo.color} flex items-center gap-1.5`}
                >
                  <TierIcon className="w-3 h-3" />
                  <span>{tierInfo.label}</span>
                  {currentUserIsAdmin && tier !== 'admin' && (
                    <button
                      onClick={() => onRemoveTier(user.id, tier)}
                      disabled={processing}
                      className="ml-1 hover:text-red-400 transition-colors disabled:opacity-50"
                      title={`Remover tier ${tierInfo.label}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => onNavigate(user.id)} variant="ghost" className="flex items-center gap-2">
          Ver perfil
        </Button>
        <Button
          onClick={() => onEditTiers(user)}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tiers
        </Button>
        <Button
          onClick={() => onBan(user)}
          variant={banned ? 'secondary' : 'danger'}
          className="flex items-center gap-2"
          disabled={processing}
        >
          <Ban className="w-4 h-4" />
          {banned ? 'Desbanear' : 'Banear'}
        </Button>
      </div>
    </div>
  );
}
