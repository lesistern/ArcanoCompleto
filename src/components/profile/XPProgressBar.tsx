// src/components/profile/XPProgressBar.tsx
import { memo } from 'react';

interface XPProgressBarProps {
  currentXp: number;
  currentLevelXp: number;
  nextLevelXp: number;
  level: number;
  showPercentage?: boolean;
}

export const XPProgressBar = memo(function XPProgressBar({
  currentXp,
  currentLevelXp,
  nextLevelXp,
  level,
  showPercentage = true
}: XPProgressBarProps) {
  const xpInLevel = currentXp - currentLevelXp;
  const levelRange = nextLevelXp - currentLevelXp;
  const percentage = Math.min(100, Math.round((xpInLevel / levelRange) * 100));

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-dungeon-400 mb-1">
        <span>Nivel {level}</span>
        <span className="text-gold-400">
          {xpInLevel.toLocaleString()} / {levelRange.toLocaleString()} XP
        </span>
        <span>Nivel {level + 1}</span>
      </div>

      <div
        className="w-full h-3 bg-dungeon-800 rounded-full overflow-hidden border border-dungeon-700 relative"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progreso de nivel: ${percentage}% completo`}
      >
        <div
          className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
        {/* Efecto de brillo */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
          style={{
            width: `${percentage}%`,
            animationDuration: '2s',
            animationIterationCount: 'infinite'
          }}
        />
      </div>

      {showPercentage && (
        <div className="text-center text-sm text-gold-400 mt-1 font-semibold">
          {percentage}% completo
        </div>
      )}
    </div>
  );
});
