/**
 * Servicios de Notificaciones con Supabase
 * Sistema completo de notificaciones en tiempo real
 */

import { createClient } from '@/lib/supabase/client';

// =====================================================
// TYPES
// =====================================================

export type NotificationType =
  | 'forum_reply'
  | 'forum_mention'
  | 'forum_solution'
  | 'forum_vote'
  | 'chat_message'
  | 'achievement_unlocked'
  | 'level_up'
  | 'feedback_update'
  | 'translation_approved'
  | 'translation_rejected'
  | 'system_announcement'
  | 'system';

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  link: string | null;
  metadata: Record<string, any>;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}

export interface NotificationWithUser extends Notification {
  display_name: string | null;
  username_slug: string | null;
  avatar_url: string | null;
}

export interface CreateNotificationParams {
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string | null;
  metadata?: Record<string, any>;
}

// =====================================================
// NOTIFICATION CRUD
// =====================================================

/**
 * Obtiene todas las notificaciones del usuario actual
 */
export async function getUserNotifications(
  limit: number = 50,
  offset: number = 0
): Promise<Notification[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }

  return data || [];
}

/**
 * Obtiene solo las notificaciones no leídas
 */
export async function getUnreadNotifications(): Promise<Notification[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('is_read', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching unread notifications:', error);
    return [];
  }

  return data || [];
}

/**
 * Obtiene el contador de notificaciones no leídas
 */
export async function getUnreadCount(): Promise<number> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('get_unread_notification_count');

  if (error) {
    console.error('Error fetching unread count:', error);
    return 0;
  }

  return data || 0;
}

/**
 * Marca una notificación como leída
 */
export async function markAsRead(notificationId: string): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase.rpc('mark_notification_as_read', {
    p_notification_id: notificationId,
  });

  if (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }

  return true;
}

/**
 * Marca todas las notificaciones como leídas
 */
export async function markAllAsRead(): Promise<number> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('mark_all_notifications_as_read');

  if (error) {
    console.error('Error marking all as read:', error);
    return 0;
  }

  return data || 0;
}

/**
 * Crea una notificación manualmente (solo admins)
 */
export async function createNotification(
  params: CreateNotificationParams
): Promise<string | null> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('create_notification', {
    p_user_id: params.user_id,
    p_type: params.type,
    p_title: params.title,
    p_message: params.message,
    p_link: params.link || null,
    p_metadata: params.metadata || {},
  });

  if (error) {
    console.error('Error creating notification:', error);
    return null;
  }

  return data;
}

/**
 * Elimina una notificación (solo el propietario)
 */
export async function deleteNotification(notificationId: string): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId);

  if (error) {
    console.error('Error deleting notification:', error);
    return false;
  }

  return true;
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Obtiene el ícono apropiado para cada tipo de notificación
 */
export function getNotificationIcon(type: NotificationType): string {
  const icons: Record<NotificationType, string> = {
    forum_reply: '💬',
    forum_mention: '@',
    forum_solution: '✅',
    forum_vote: '👍',
    chat_message: '💌',
    achievement_unlocked: '🏆',
    level_up: '⬆️',
    feedback_update: '📝',
    translation_approved: '✓',
    translation_rejected: '✗',
    system_announcement: '📢',
    system: '🔔',
  };

  return icons[type] || '🔔';
}

/**
 * Obtiene el color apropiado para cada tipo de notificación (Tailwind class)
 */
export function getNotificationColor(type: NotificationType): string {
  const colors: Record<NotificationType, string> = {
    forum_reply: 'blue',
    forum_mention: 'purple',
    forum_solution: 'green',
    forum_vote: 'orange',
    chat_message: 'pink',
    achievement_unlocked: 'gold',
    level_up: 'cyan',
    feedback_update: 'indigo',
    translation_approved: 'green',
    translation_rejected: 'red',
    system_announcement: 'yellow',
    system: 'gray',
  };

  return colors[type] || 'gray';
}

/**
 * Formatea el tiempo transcurrido desde la notificación
 */
export function getNotificationTimeAgo(createdAt: string): string {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now.getTime() - created.getTime();

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return 'ahora';
  } else if (diffMinutes < 60) {
    return `hace ${diffMinutes}m`;
  } else if (diffHours < 24) {
    return `hace ${diffHours}h`;
  } else if (diffDays < 7) {
    return `hace ${diffDays}d`;
  } else {
    return created.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
    });
  }
}

/**
 * Obtiene el título traducido para cada tipo de notificación
 */
export function getNotificationTypeLabel(type: NotificationType): string {
  const labels: Record<NotificationType, string> = {
    forum_reply: 'Respuesta al hilo',
    forum_mention: 'Mención en foro',
    forum_solution: 'Solución aceptada',
    forum_vote: 'Voto recibido',
    chat_message: 'Nuevo mensaje',
    achievement_unlocked: 'Achievement desbloqueado',
    level_up: 'Subida de nivel',
    feedback_update: 'Actualización de reporte',
    translation_approved: 'Traducción aprobada',
    translation_rejected: 'Traducción rechazada',
    system_announcement: 'Anuncio del sistema',
    system: 'Notificación del sistema',
  };

  return labels[type] || 'Notificación';
}
