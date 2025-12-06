'use client';

import { memo } from 'react';
import { Users, Award, TrendingUp, Calendar } from 'lucide-react';

interface ProfileStatsGridProps {
  charactersCount: number;
  achievementsUnlocked: number;
  level: number;
  memberSince: string; // ISO date string
}

export const ProfileStatsGrid = memo(function ProfileStatsGrid({
  charactersCount,
  achievementsUnlocked,
  level,
  memberSince
}: ProfileStatsGridProps) {
  // Calcular días como miembro
  const daysSinceMember = Math.floor(
    (Date.now() - new Date(memberSince).getTime()) / (1000 * 60 * 60 * 24)
  );

  const stats = [
    {
      icon: Users,
      label: 'Personajes Creados',
      value: charactersCount.toString(),
      color: 'from-blue-500/20 to-blue-600/10',
      textColor: 'text-blue-400',
    },
    {
      icon: Award,
      label: 'Achievements',
      value: achievementsUnlocked.toString(),
      color: 'from-gold-500/20 to-gold-600/10',
      textColor: 'text-gold-400',
    },
    {
      icon: TrendingUp,
      label: 'Nivel de Jugador',
      value: `Nivel ${level}`,
      color: 'from-purple-500/20 to-purple-600/10',
      textColor: 'text-purple-400',
    },
    {
      icon: Calendar,
      label: 'Miembro Desde',
      value: `${daysSinceMember} días`,
      color: 'from-green-500/20 to-green-600/10',
      textColor: 'text-green-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="Estadísticas del perfil">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            role="listitem"
            className={`bg-gradient-to-br ${stat.color} border border-dungeon-700 rounded-lg p-4 group hover:border-dungeon-600 transition-colors`}
          >
            <Icon className={`w-6 h-6 ${stat.textColor} mb-2 group-hover:scale-110 transition-transform`} aria-hidden="true" />
            <p className="text-xs text-dungeon-400 font-semibold mb-1 uppercase">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.textColor}`} aria-label={`${stat.label}: ${stat.value}`}>{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
});
