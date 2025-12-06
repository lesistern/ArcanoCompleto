// src/components/profile/ActivityTimeline.tsx
import { memo } from 'react';
import {
  Bug,
  CheckCircle2,
  Activity as ActivityIcon,
  TrendingUp,
  User,
  Trophy,
  Star,
  ArrowUp,
  FileEdit
} from 'lucide-react';

interface Activity {
  id: string;
  activity_type: string;
  activity_data: any;
  xp_earned: number;
  created_at: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
  limit?: number;
}

const ACTIVITY_CONFIG = {
  report_created: { icon: Bug, color: 'text-blue-400', bgColor: 'bg-blue-900/20', label: 'Reportó' },
  report_resolved: { icon: CheckCircle2, color: 'text-green-400', bgColor: 'bg-green-900/20', label: 'Reporte resuelto' },
  vote_received: { icon: TrendingUp, color: 'text-purple-400', bgColor: 'bg-purple-900/20', label: 'Recibió votos' },
  vote_given: { icon: ArrowUp, color: 'text-indigo-400', bgColor: 'bg-indigo-900/20', label: 'Votó' },
  character_created: { icon: User, color: 'text-gold-400', bgColor: 'bg-gold-900/20', label: 'Creó personaje' },
  character_updated: { icon: FileEdit, color: 'text-cyan-400', bgColor: 'bg-cyan-900/20', label: 'Actualizó personaje' },
  level_up: { icon: Trophy, color: 'text-orange-400', bgColor: 'bg-orange-900/20', label: 'Subió de nivel' },
  achievement_unlocked: { icon: Star, color: 'text-yellow-400', bgColor: 'bg-yellow-900/20', label: 'Desbloqueó' },
};

export const ActivityTimeline = memo(function ActivityTimeline({ activities, limit }: ActivityTimelineProps) {
  const displayedActivities = limit ? activities.slice(0, limit) : activities;

  if (displayedActivities.length === 0) {
    return (
      <div className="text-center py-8 text-dungeon-500" role="status" aria-label="Sin actividad">
        <ActivityIcon className="w-12 h-12 mx-auto mb-2 opacity-50" aria-hidden="true" />
        <p>No hay actividad reciente</p>
      </div>
    );
  }

  return (
    <div className="space-y-3" role="feed" aria-label="Actividad reciente">
      {displayedActivities.map((activity, index) => {
        const config = ACTIVITY_CONFIG[activity.activity_type as keyof typeof ACTIVITY_CONFIG];
        if (!config) return null;

        const Icon = config.icon;
        const timeAgo = formatTimeAgo(activity.created_at);

        return (
          <div
            key={activity.id}
            className="group relative"
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
            }}
          >
            {/* Glow effect en hover */}
            <div className={`absolute inset-0 ${config.bgColor} rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />

            <div className="relative flex gap-4 items-start p-4 rounded-lg border border-dungeon-700/50 bg-gradient-to-br from-dungeon-800/80 to-dungeon-900/80 hover:border-dungeon-600 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
              {/* Icono con glow */}
              <div className="relative flex-shrink-0">
                <div className={`absolute inset-0 ${config.bgColor} rounded-lg blur-md opacity-50`} />
                <div className={`relative p-2.5 rounded-lg ${config.bgColor} border border-dungeon-700/50 ${config.color}`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <div className="text-dungeon-200 leading-relaxed">
                  <span className={`${config.color} font-semibold`}>{config.label}</span>
                  {' '}
                  <span className="text-dungeon-300">{formatActivityMessage(activity)}</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-dungeon-500 font-medium">{timeAgo}</span>
                  {activity.xp_earned > 0 && (
                    <>
                      <span className="text-dungeon-600">•</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-400 font-semibold border border-gold-500/30">
                        +{activity.xp_earned} XP
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

function formatActivityMessage(activity: Activity): string {
  const data = activity.activity_data;

  switch (activity.activity_type) {
    case 'report_created':
      return `"${data.title}"`;
    case 'report_resolved':
      return `"${data.title}"`;
    case 'vote_received':
      return `en "${data.ticket_title || 'un reporte'}"`;
    case 'vote_given':
      return `en "${data.ticket_title || 'un reporte'}"`;
    case 'character_created':
      return `"${data.name}" (${data.race} ${data.class})`;
    case 'character_updated':
      return `"${data.name}"`;
    case 'level_up':
      return `a Nivel ${data.new_level} "${data.level_title}"`;
    case 'achievement_unlocked':
      return `"${data.name}"`;
    default:
      return '';
  }
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'hace un momento';
  if (seconds < 120) return 'hace 1 minuto';
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} minutos`;
  if (seconds < 7200) return 'hace 1 hora';
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)} horas`;
  if (seconds < 172800) return 'hace 1 día';
  if (seconds < 604800) return `hace ${Math.floor(seconds / 86400)} días`;
  if (seconds < 1209600) return 'hace 1 semana';
  if (seconds < 2592000) return `hace ${Math.floor(seconds / 604800)} semanas`;
  if (seconds < 5184000) return 'hace 1 mes';
  if (seconds < 31536000) return `hace ${Math.floor(seconds / 2592000)} meses`;

  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}
