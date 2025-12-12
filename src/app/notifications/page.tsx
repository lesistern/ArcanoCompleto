'use client';

/**
 * Página de Notificaciones Completa
 * Lista todas las notificaciones con filtros y paginación
 */

import { useState, useMemo } from 'react';
import { Bell, Filter, Check, CheckCheck, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useNotifications } from '@/hooks/useNotifications';
import {
  getNotificationIcon,
  getNotificationColor,
  getNotificationTimeAgo,
  getNotificationTypeLabel,
  type NotificationType,
} from '@/lib/supabase/notifications';

const NOTIFICATION_TYPES: { value: NotificationType | 'all'; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'forum_reply', label: 'Respuestas al hilo' },
  { value: 'forum_mention', label: 'Menciones' },
  { value: 'forum_solution', label: 'Soluciones' },
  { value: 'forum_vote', label: 'Votos' },
  { value: 'chat_message', label: 'Mensajes' },
  { value: 'achievement_unlocked', label: 'Achievements' },
  { value: 'level_up', label: 'Niveles' },
  { value: 'feedback_update', label: 'Reportes' },
  { value: 'translation_approved', label: 'Traducciones aprobadas' },
  { value: 'translation_rejected', label: 'Traducciones rechazadas' },
  { value: 'system_announcement', label: 'Anuncios' },
];

export default function NotificationsPage() {
  const [typeFilter, setTypeFilter] = useState<NotificationType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'read' | 'unread'>('all');

  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead } =
    useNotifications();

  // Filtrar notificaciones
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      // Filtro por tipo
      if (typeFilter !== 'all' && notif.type !== typeFilter) {
        return false;
      }

      // Filtro por estado
      if (statusFilter === 'read' && !notif.is_read) {
        return false;
      }
      if (statusFilter === 'unread' && notif.is_read) {
        return false;
      }

      return true;
    });
  }, [notifications, typeFilter, statusFilter]);

  const handleNotificationClick = async (notificationId: string, link: string | null) => {
    await markAsRead(notificationId);

    // Redirigir si hay link
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="h-8 w-8 text-gold-400" />
          <h1 className="text-3xl font-bold text-white">Notificaciones</h1>
        </div>
        <p className="text-dungeon-400">
          Gestiona todas tus notificaciones en un solo lugar
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dungeon-400">Total</p>
              <p className="text-2xl font-bold text-white">{notifications.length}</p>
            </div>
            <Bell className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dungeon-400">No leídas</p>
              <p className="text-2xl font-bold text-white">{unreadCount}</p>
            </div>
            <Bell className="h-8 w-8 text-orange-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dungeon-400">Leídas</p>
              <p className="text-2xl font-bold text-white">
                {notifications.length - unreadCount}
              </p>
            </div>
            <CheckCheck className="h-8 w-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Filtros y Acciones */}
      <div className="bg-dungeon-900 border border-dungeon-700 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Filtro de tipo */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dungeon-500" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as NotificationType | 'all')}
                className="appearance-none rounded-lg border border-dungeon-700 bg-dungeon-800 py-2 pl-10 pr-8 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {NOTIFICATION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro de estado */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as 'all' | 'read' | 'unread')
                }
                className="appearance-none rounded-lg border border-dungeon-700 bg-dungeon-800 py-2 px-4 pr-8 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">Todas</option>
                <option value="unread">No leídas</option>
                <option value="read">Leídas</option>
              </select>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
              >
                <CheckCheck className="h-4 w-4" />
                Marcar todas como leídas
              </button>
            )}
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-3 pt-3 border-t border-dungeon-800">
          <p className="text-sm text-dungeon-400">
            Mostrando <span className="text-white font-semibold">{filteredNotifications.length}</span> de{' '}
            <span className="text-white font-semibold">{notifications.length}</span> notificaciones
          </p>
        </div>
      </div>

      {/* Lista de Notificaciones */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold-400 border-t-transparent" />
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="bg-dungeon-900 border border-dungeon-700 rounded-lg p-12 text-center">
          <Bell className="mx-auto h-16 w-16 text-dungeon-600 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No hay notificaciones
          </h3>
          <p className="text-dungeon-400">
            {typeFilter !== 'all' || statusFilter !== 'all'
              ? 'Prueba ajustando los filtros'
              : 'Tus notificaciones aparecerán aquí'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => {
            const color = getNotificationColor(notification.type);
            const icon = getNotificationIcon(notification.type);
            const timeAgo = getNotificationTimeAgo(notification.created_at);

            return (
              <div
                key={notification.id}
                onClick={() =>
                  handleNotificationClick(notification.id, notification.link)
                }
                className={`group bg-dungeon-900 border rounded-lg p-4 transition-all cursor-pointer ${
                  notification.is_read
                    ? 'border-dungeon-700 hover:border-dungeon-600'
                    : 'border-blue-500/50 bg-dungeon-850 hover:border-blue-500'
                }`}
              >
                <div className="flex gap-4">
                  {/* Icono */}
                  <div
                    className={`flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-${color}-500/20`}
                  >
                    <span className="text-2xl">{icon}</span>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3
                        className={`font-semibold ${
                          notification.is_read ? 'text-dungeon-300' : 'text-white'
                        }`}
                      >
                        {notification.title}
                      </h3>
                      {!notification.is_read && (
                        <span className="flex-shrink-0 h-2.5 w-2.5 rounded-full bg-blue-500" />
                      )}
                    </div>

                    <p className="text-sm text-dungeon-400 mb-3 line-clamp-3">
                      {notification.message}
                    </p>

                    <div className="flex items-center gap-3 text-xs">
                      <span className={`text-${color}-400 font-medium`}>
                        {getNotificationTypeLabel(notification.type)}
                      </span>
                      <span className="text-dungeon-600">•</span>
                      <span className="text-dungeon-500">{timeAgo}</span>
                      {notification.link && (
                        <>
                          <span className="text-dungeon-600">•</span>
                          <span className="text-blue-400 group-hover:text-blue-300">
                            Ver detalles →
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
      )}
    </div>
  );
}
