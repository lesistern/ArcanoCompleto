'use client';

import {
  AlertTriangle,
  MessageSquare,
  UserX,
  EyeOff,
} from 'lucide-react';
import {
  StatCardProps,
  formatStatValue,
  COLOR_CLASSES,
} from '@/lib/data/forum-moderation';

/**
 * Icon map for stat cards
 * Maps icon names to Lucide React components
 */
const ICON_MAP = {
  AlertTriangle: <AlertTriangle className="w-5 h-5 text-red-400" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-blue-400" />,
  UserX: <UserX className="w-5 h-5 text-orange-400" />,
  EyeOff: <EyeOff className="w-5 h-5 text-purple-400" />,
} as const;

/**
 * StatCard component for displaying moderation statistics
 *
 * Usage:
 * ```tsx
 * <ModerationStatCard
 *   icon={<AlertTriangle />}
 *   label="Reportes Pendientes"
 *   value={5}
 *   color="red"
 * />
 * ```
 */
export function ModerationStatCard({
  icon,
  label,
  value,
  color,
}: StatCardProps) {
  const colorClasses = COLOR_CLASSES[color as keyof typeof COLOR_CLASSES] || COLOR_CLASSES.blue;

  return (
    <div className={`bg-dungeon-800 rounded-lg border ${colorClasses.border} p-4 transition-all hover:border-opacity-50`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-dungeon-400">{label}</span>
      </div>
      <div className={`text-2xl font-bold ${colorClasses.text}`}>
        {formatStatValue(value)}
      </div>
    </div>
  );
}
