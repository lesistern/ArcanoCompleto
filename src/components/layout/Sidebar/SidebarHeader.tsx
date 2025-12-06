'use client';

import Link from 'next/link';
import Image from 'next/image';
import { User } from 'lucide-react';

interface UserProfile {
  id?: string;
  display_name?: string;
  username?: string;
  avatar_url?: string;
  tier_code?: string;
  level?: number;
}

interface SidebarHeaderProps {
  user?: {
    email?: string;
  };
  profile?: UserProfile;
}

export default function SidebarHeader({ user, profile }: SidebarHeaderProps) {
  if (!user || !profile) {
    return (
      <div className="px-4 py-6 border-b border-dungeon-700">
        <button
          onClick={() => {}}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-dungeon-300 hover:bg-dungeon-800 hover:text-gold-400 transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-full bg-dungeon-700 flex items-center justify-center">
            <User size={20} className="text-dungeon-400" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium text-dungeon-300">Iniciar Sesión</p>
            <p className="text-xs text-dungeon-500">Haz login para más opciones</p>
          </div>
        </button>
      </div>
    );
  }

  const displayName = profile?.display_name || profile?.username || user?.email || 'Usuario';
  const tierColor: Record<string, string> = {
    admin: 'bg-red-500/20 text-red-400',
    mod: 'bg-pink-500/20 text-pink-400',
    reviewer: 'bg-orange-500/20 text-orange-400',
    translator: 'bg-purple-500/20 text-purple-400',
    contributor: 'bg-green-500/20 text-green-400',
    user: 'bg-blue-500/20 text-blue-400',
    guest: 'bg-gray-500/20 text-gray-400',
  };

  const tierClass = tierColor[profile?.tier_code || 'guest'] || tierColor.guest;
  const tierLabel = (profile?.tier_code || 'guest').toUpperCase();

  return (
    <div className="px-4 py-6 border-b border-dungeon-700">
      <Link
        href="/profile"
        className="flex items-center gap-3 rounded-lg p-2 hover:bg-dungeon-800 transition-all duration-200 group"
      >
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full overflow-hidden bg-dungeon-800 flex-shrink-0">
          {profile?.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={displayName}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-dungeon-100 truncate group-hover:text-gold-400 transition-colors">
            {displayName}
          </p>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${tierClass}`}>
              {tierLabel}
            </span>
            {profile?.level && (
              <span className="text-xs text-dungeon-500">Nivel {profile.level}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
