// src/components/profile/AchievementBadge.tsx
'use client';

import { useState, memo } from 'react';
import { Lock, Share2, Check } from 'lucide-react';

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

interface AchievementBadgeProps {
  achievement: Achievement;
  locked?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  progress?: AchievementProgress | null;
  userPercentage?: number | null;
  showShareButton?: boolean;
  onShare?: (achievementId: string) => void;
}

export const AchievementBadge = memo(function AchievementBadge({
  achievement,
  locked = false,
  size = 'md',
  progress = null,
  userPercentage = null,
  showShareButton = false,
  onShare
}: AchievementBadgeProps) {
  const [copied, setCopied] = useState(false);

  // Dimensiones estándar 64x64px según RetroAchievements guidelines
  const sizes = {
    sm: {
      container: 'w-12 h-12',
      icon: 'text-xl',
      title: 'text-[10px]',
      date: 'text-[8px]'
    },
    md: {
      container: 'w-16 h-16', // 64x64px estándar
      icon: 'text-3xl',
      title: 'text-xs',
      date: 'text-[10px]'
    },
    lg: {
      container: 'w-20 h-20',
      icon: 'text-4xl',
      title: 'text-sm',
      date: 'text-xs'
    },
    xl: {
      container: 'w-24 h-24',
      icon: 'text-5xl',
      title: 'text-base',
      date: 'text-sm'
    }
  };

  const sizeClasses = sizes[size];

  const handleShare = () => {
    if (onShare) {
      onShare(achievement.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      {/* Efecto de glow al hover para desbloqueados */}
      {!locked && (
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/30 to-orange-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-75 transition-all duration-300" />
      )}

      <div className="relative">
        {/* Badge Principal - Dimensiones fijas 64x64px */}
        <div
          className={`relative ${sizeClasses.container} rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center ${
            locked
              ? 'bg-dungeon-900/50 border-dungeon-700 grayscale opacity-40 cursor-not-allowed'
              : 'bg-gradient-to-br from-gold-900/30 via-orange-900/20 to-dungeon-800 border-gold-500/40 hover:border-gold-400/70 hover:shadow-xl hover:shadow-gold-900/30 cursor-pointer hover:-translate-y-1'
          }`}
          title={locked ? '🔒 Bloqueado' : achievement.description}
        >
          {/* Brillo de fondo sutil */}
          {!locked && (
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent rounded-xl pointer-events-none" />
          )}

          {/* Icono del achievement */}
          <div className={`${sizeClasses.icon} text-center relative drop-shadow-lg`}>
            {locked ? '❓' : achievement.icon}
          </div>

          {/* Candado para bloqueados */}
          {locked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="w-8 h-8 text-dungeon-600 opacity-20" />
            </div>
          )}

          {/* Botón de compartir */}
          {showShareButton && !locked && (
            <button
              onClick={handleShare}
              className="absolute top-1 right-1 p-1 bg-dungeon-800/90 hover:bg-dungeon-700 rounded-md transition-colors opacity-0 group-hover:opacity-100"
              title="Compartir achievement"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <Share2 className="w-3 h-3 text-gold-400" />
              )}
            </button>
          )}
        </div>

        {/* Información debajo del badge */}
        <div className="mt-2 space-y-1">
          {/* Nombre */}
          <div
            className={`${sizeClasses.title} font-bold text-center ${
              locked ? 'text-dungeon-500' : 'text-gold-300'
            }`}
          >
            {locked ? '???' : achievement.name}
          </div>

          {/* Barra de progreso (solo para achievements parciales) */}
          {progress && !locked && progress.current < progress.required && (
            <div className="w-full space-y-1">
              <div className="w-full bg-dungeon-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-gold-500 to-orange-500 h-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
              <div className="text-[10px] text-dungeon-400 text-center font-medium">
                {progress.current}/{progress.required} ({Math.round(progress.percentage)}%)
              </div>
            </div>
          )}

          {/* Fecha de desbloqueo */}
          {achievement.unlocked_at && !locked && (
            <div className={`${sizeClasses.date} text-dungeon-400 text-center font-medium`}>
              {new Date(achievement.unlocked_at).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </div>
          )}

          {/* Porcentaje de usuarios */}
          {userPercentage !== null && !locked && (
            <div className="text-[10px] text-blue-400 text-center font-medium">
              {userPercentage}% de usuarios
            </div>
          )}

          {/* Recompensa de XP */}
          {achievement.xp_reward && achievement.xp_reward > 0 && !locked && (
            <div className="text-[10px] bg-gold-500/20 text-gold-400 px-2 py-0.5 rounded-full text-center font-bold border border-gold-500/30">
              +{achievement.xp_reward} XP
            </div>
          )}
        </div>

        {/* Tooltip en hover para desbloqueados */}
        {!locked && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-dungeon-950/95 backdrop-blur-sm border-2 border-gold-500/40 rounded-xl text-xs text-dungeon-200 max-w-xs opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 shadow-2xl">
            <div className="font-bold text-gold-400 mb-1">{achievement.name}</div>
            <div className="text-dungeon-300">{achievement.description}</div>
            {progress && progress.current < progress.required && (
              <div className="mt-2 pt-2 border-t border-dungeon-700 text-dungeon-400">
                Progreso: {progress.current}/{progress.required}
              </div>
            )}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] w-3 h-3 bg-dungeon-950 border-r-2 border-b-2 border-gold-500/40 rotate-45" />
          </div>
        )}
      </div>
    </div>
  );
});
