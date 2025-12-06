'use client';

import Link from 'next/link';
import { QuickActionCardProps } from '@/lib/data/forum-moderation';

/**
 * QuickActionCard component for navigation shortcuts
 *
 * Used in moderation dashboard to provide quick access to
 * user management and hidden content sections
 *
 * Usage:
 * ```tsx
 * <QuickActionCard
 *   icon={<UserX className="w-6 h-6" />}
 *   title="Gestión de Usuarios"
 *   description="Ver usuarios suspendidos..."
 *   href="/admin/foro/usuarios"
 *   color="orange"
 * />
 * ```
 */
export function QuickActionCard({
  icon,
  title,
  description,
  href,
  color,
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className={`block bg-dungeon-800 rounded-lg border border-${color}-500/30 p-6 hover:border-${color}-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-${color}-500/10`}
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-${color}-900/30 border border-${color}-500/30 mb-4`}>
        <div className={`text-${color}-400`}>{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-dungeon-100 mb-2">{title}</h3>
      <p className="text-sm text-dungeon-400">{description}</p>
    </Link>
  );
}
