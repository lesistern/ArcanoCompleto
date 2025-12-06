'use client';

import { memo } from 'react';
import Image from 'next/image';
import { MapPin, Globe, Twitter, Calendar } from 'lucide-react';
import { ProfileAvatar } from './ProfileAvatar';
import { XPProgressBar } from './XPProgressBar';

interface ProfileHeaderProps {
  profile: {
    id: string;
    username_slug: string;
    display_name: string | null;
    avatar_url: string | null;
    bio: string | null;
    tier: string;
    level: number;
    level_title: string;
    experience_points: number;
    location: string | null;
    website_url: string | null;
    twitter_url: string | null;
    created_at: string;
    show_location: boolean;
    banner_url?: string | null;
  };
  nextLevelXp: number;
  currentLevelXp: number;
}

const TIER_BADGES = {
  admin: { label: 'Admin', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
  reviewer: { label: 'Revisor', color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
  translator: { label: 'Traductor', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
  contributor: { label: 'Colaborador', color: 'text-green-400 border-green-500/30 bg-green-500/10' },
  beta_tester: { label: 'Beta Tester', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
  user: { label: 'Usuario', color: 'text-dungeon-400 border-dungeon-700 bg-dungeon-800' },
};

export const ProfileHeader = memo(function ProfileHeader({ profile, nextLevelXp, currentLevelXp }: ProfileHeaderProps) {
  const tierInfo = TIER_BADGES[profile.tier as keyof typeof TIER_BADGES] || TIER_BADGES.user;
  const joinDate = new Date(profile.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <>
      {/* Banner (if exists) */}
      {profile.banner_url && (
        <div className="w-full h-48 md:h-64 rounded-t-lg overflow-hidden relative mb-[-32px]">
          <Image
            src={profile.banner_url}
            alt={`Banner de ${profile.display_name || profile.username_slug}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1152px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Profile Card */}
      <div className={`bg-gradient-to-br from-gold-900/30 via-dungeon-800 to-dungeon-900 border border-gold-500/30 ${profile.banner_url ? 'rounded-b-lg pt-10' : 'rounded-lg'} p-6 md:p-8 relative overflow-hidden mb-8`}>
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none" />

        <div className="relative">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <ProfileAvatar userId={profile.id} avatarUrl={profile.avatar_url} displayName={profile.display_name || profile.username_slug} size="lg" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {/* Name + Tier */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-bold text-gold-300">
                  {profile.display_name || profile.username_slug}
                </h1>
                <div className={`inline-flex items-center px-3 py-1 rounded-full border font-semibold text-sm ${tierInfo.color}`}>
                  {tierInfo.label}
                </div>
              </div>

              {/* Bio */}
              {profile.bio && (
                <p className="text-dungeon-200 mb-3 text-base">{profile.bio}</p>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-sm text-dungeon-300 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>Se unió en {joinDate}</span>
                </div>
                {profile.show_location && profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.website_url && (
                  <a
                    href={profile.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-800 rounded-md px-1 py-0.5 -mx-1 -my-0.5 transition-all"
                    aria-label={`Visitar sitio web de ${profile.display_name || profile.username_slug}`}
                  >
                    <Globe className="w-4 h-4" aria-hidden="true" />
                    Web
                  </a>
                )}
                {profile.twitter_url && (
                  <a
                    href={profile.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-800 rounded-md px-1 py-0.5 -mx-1 -my-0.5 transition-all"
                    aria-label={`Seguir a ${profile.display_name || profile.username_slug} en Twitter`}
                  >
                    <Twitter className="w-4 h-4" aria-hidden="true" />
                    Twitter
                  </a>
                )}
              </div>

              {/* XP Bar */}
              <XPProgressBar
                currentXp={profile.experience_points}
                currentLevelXp={currentLevelXp}
                nextLevelXp={nextLevelXp}
                level={profile.level}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
