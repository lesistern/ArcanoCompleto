/**
 * Forum Moderation Utilities and Types
 * Extracted from /admin/foro/page.tsx for reusability and maintainability
 */

export interface ForumReport {
  id: string;
  thread_id: string | null;
  post_id: string | null;
  reporter_id: string;
  reporter_name: string;
  reporter_username: string;
  reason: string;
  status: 'open' | 'reviewed' | 'dismissed';
  created_at: string;
  thread_title: string | null;
  thread_slug?: string | null;
  thread_category_slug?: string | null;
  post_content: string | null;
  reported_user_id: string | null;
  reported_user_name: string | null;
  reported_user_username?: string | null;
  is_deleted?: boolean;
  thread_locked?: boolean;
  thread_pinned?: boolean;
}

export interface ModerationStats {
  pending_reports: number;
  total_threads: number;
  total_posts: number;
  suspended_users: number;
  hidden_threads: number;
  hidden_posts: number;
}

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

export interface ReportCardProps {
  report: ForumReport;
}

export interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
}

/**
 * Format date string to relative time in Spanish
 * @example
 * formatDate('2025-11-21T10:00:00Z') // 'Hace 5 minutos'
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Hace un momento';
  if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
  if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;

  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Generate link href for reported content
 * Handles both thread and post reports with proper navigation
 */
export function generateReportLink(report: ForumReport): string {
  if (!report.thread_category_slug || !report.thread_slug) {
    return '#';
  }

  if (report.post_id) {
    return `/foro/${report.thread_category_slug}/${report.thread_slug}#post-${report.post_id}`;
  }

  return `/foro/${report.thread_category_slug}/${report.thread_slug}`;
}

/**
 * Get report type label in Spanish
 */
export function getReportTypeLabel(report: ForumReport): string {
  return report.thread_id && !report.post_id ? 'Hilo reportado' : 'Respuesta reportada';
}

/**
 * Format stat value with locale string
 */
export function formatStatValue(value: number): string {
  return value.toLocaleString('es-ES');
}

/**
 * Stat cards configuration for moderation dashboard
 * Defines icons, labels, colors and their order
 */
export const STAT_CARDS_CONFIG = [
  {
    key: 'pending_reports',
    label: 'Reportes Pendientes',
    color: 'red',
    icon: 'AlertTriangle',
  },
  {
    key: 'total_threads',
    label: 'Total Hilos',
    color: 'blue',
    icon: 'MessageSquare',
  },
  {
    key: 'total_posts',
    label: 'Total Respuestas',
    color: 'green',
    icon: 'MessageSquare',
  },
  {
    key: 'suspended_users',
    label: 'Usuarios Suspendidos',
    color: 'orange',
    icon: 'UserX',
  },
  {
    key: 'hidden_threads',
    label: 'Hilos Ocultos',
    color: 'purple',
    icon: 'EyeOff',
  },
  {
    key: 'hidden_posts',
    label: 'Posts Ocultos',
    color: 'pink',
    icon: 'EyeOff',
  },
] as const;

/**
 * Quick action cards configuration for navigation shortcuts
 */
export const QUICK_ACTION_CARDS = [
  {
    icon: 'UserX',
    title: 'Gestión de Usuarios',
    description: 'Ver usuarios suspendidos y gestionar sanciones',
    href: '/admin/foro/usuarios',
    color: 'orange',
  },
  {
    icon: 'EyeOff',
    title: 'Contenido Oculto',
    description: 'Ver y gestionar hilos y posts ocultos',
    href: '/admin/foro/contenido-oculto',
    color: 'purple',
  },
] as const;

/**
 * Tailwind color classes for stat cards
 * Maps color names to Tailwind classes
 */
export const COLOR_CLASSES = {
  red: { border: 'border-red-500/30', text: 'text-red-400' },
  blue: { border: 'border-blue-500/30', text: 'text-blue-400' },
  green: { border: 'border-green-500/30', text: 'text-green-400' },
  orange: { border: 'border-orange-500/30', text: 'text-orange-400' },
  purple: { border: 'border-purple-500/30', text: 'text-purple-400' },
  pink: { border: 'border-pink-500/30', text: 'text-pink-400' },
} as const;
