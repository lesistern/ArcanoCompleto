// src/components/profile/AchievementBadge.tsx
import { Lock } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  unlocked_at?: string | null;
  xp_reward?: number;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  locked?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function AchievementBadge({
  achievement,
  locked = false,
  size = 'md'
}: AchievementBadgeProps) {
  const sizes = {
    sm: {
      container: 'p-3',
      icon: 'text-2xl',
      title: 'text-xs',
      date: 'text-[10px]'
    },
    md: {
      container: 'p-4',
      icon: 'text-4xl',
      title: 'text-sm',
      date: 'text-xs'
    },
    lg: {
      container: 'p-6',
      icon: 'text-6xl',
      title: 'text-base',
      date: 'text-sm'
    }
  };

  const sizeClasses = sizes[size];

  return (
    <div className="relative group">
      {/* Efecto de glow al hover para desbloqueados */}
      {!locked && (
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/30 to-orange-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-75 transition-all duration-300" />
      )}

      <div
        className={`relative ${sizeClasses.container} rounded-xl border-2 transition-all duration-300 ${
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
        <div className={`${sizeClasses.icon} mb-2 text-center relative drop-shadow-lg`}>
          {locked ? '❓' : achievement.icon}
        </div>

        {/* Nombre */}
        <div
          className={`${sizeClasses.title} font-bold text-center ${
            locked ? 'text-dungeon-500' : 'text-gold-300'
          }`}
        >
          {locked ? '???' : achievement.name}
        </div>

        {/* Fecha de desbloqueo */}
        {achievement.unlocked_at && !locked && (
          <div className={`${sizeClasses.date} text-dungeon-400 mt-1 text-center font-medium`}>
            {new Date(achievement.unlocked_at).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </div>
        )}

        {/* Recompensa de XP */}
        {achievement.xp_reward && achievement.xp_reward > 0 && !locked && (
          <div className="text-xs bg-gold-500/20 text-gold-400 mt-2 px-2 py-1 rounded-full text-center font-bold border border-gold-500/30">
            +{achievement.xp_reward} XP
          </div>
        )}

        {/* Candado para bloqueados */}
        {locked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock className="w-12 h-12 text-dungeon-600 opacity-20" />
          </div>
        )}

        {/* Tooltip en hover para desbloqueados */}
        {!locked && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-dungeon-950/95 backdrop-blur-sm border-2 border-gold-500/40 rounded-xl text-xs text-dungeon-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 shadow-2xl">
            {achievement.description}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] w-3 h-3 bg-dungeon-950 border-r-2 border-b-2 border-gold-500/40 rotate-45" />
          </div>
        )}
      </div>
    </div>
  );
}
