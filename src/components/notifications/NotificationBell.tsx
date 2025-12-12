'use client';

/**
 * NotificationBell - Botón de notificaciones en el Header
 * Muestra contador de no leídas y dropdown con últimas notificaciones
 */

import { useState, useEffect, useRef } from 'react';
import { Bell, Check, CheckCheck, X } from 'lucide-react';
import Link from 'next/link';
import { useNotifications } from '@/hooks/useNotifications';
import {
  getNotificationIcon,
  getNotificationColor,
  getNotificationTimeAgo,
  getNotificationTypeLabel,
} from '@/lib/supabase/notifications';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [shake, setShake] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Animación de shake cuando llega nueva notificación
  useEffect(() => {
    if (unreadCount > 0 && !isOpen) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount, isOpen]);

  const handleNotificationClick = async (notificationId: string, link: string | null) => {
    await markAsRead(notificationId);
    setIsOpen(false);

    // Redirigir si hay link
    if (link) {
      window.location.href = link;
    }
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  // Últimas 10 notificaciones para el dropdown
  const recentNotifications = notifications.slice(0, 10);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón de campana */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-lg transition-all duration-200 hover:bg-dungeon-800 ${
          shake ? 'animate-shake' : ''
        }`}
        aria-label="Notificaciones"
      >
        <Bell className="h-5 w-5 text-dungeon-400" />

        {/* Badge de contador */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown de notificaciones */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[380px] rounded-lg border border-dungeon-700 bg-dungeon-900 shadow-2xl z-50">
          {/* Header del dropdown */}
          <div className="flex items-center justify-between border-b border-dungeon-700 p-4">
            <h3 className="text-lg font-semibold text-gold-400">Notificaciones</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  title="Marcar todas como leídas"
                >
                  <CheckCheck className="h-3 w-3" />
                  Marcar todas
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-dungeon-400 hover:text-dungeon-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Lista de notificaciones */}
          <div className="max-h-[500px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold-400 border-t-transparent" />
              </div>
            ) : recentNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="mx-auto h-12 w-12 text-dungeon-600 mb-3" />
                <p className="text-dungeon-400">No tienes notificaciones</p>
              </div>
            ) : (
              <div className="divide-y divide-dungeon-800">
                {recentNotifications.map((notification) => {
                  const color = getNotificationColor(notification.type);
                  const icon = getNotificationIcon(notification.type);
                  const timeAgo = getNotificationTimeAgo(notification.created_at);

                  return (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id, notification.link)}
                      className={`p-4 cursor-pointer transition-colors hover:bg-dungeon-800 ${
                        !notification.is_read ? 'bg-dungeon-850' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Icono de tipo */}
                        <div
                          className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-${color}-500/20`}
                        >
                          <span className="text-xl">{icon}</span>
                        </div>

                        {/* Contenido */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4
                              className={`text-sm font-semibold ${
                                notification.is_read ? 'text-dungeon-300' : 'text-white'
                              }`}
                            >
                              {notification.title}
                            </h4>
                            {!notification.is_read && (
                              <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-500" />
                            )}
                          </div>

                          <p className="text-xs text-dungeon-400 mb-1 line-clamp-2">
                            {notification.message}
                          </p>

                          <div className="flex items-center gap-2 text-xs">
                            <span className={`text-${color}-400`}>
                              {getNotificationTypeLabel(notification.type)}
                            </span>
                            <span className="text-dungeon-500">•</span>
                            <span className="text-dungeon-500">{timeAgo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer con link a ver todas */}
          {recentNotifications.length > 0 && (
            <div className="border-t border-dungeon-700 p-3">
              <Link
                href="/notifications"
                onClick={() => setIsOpen(false)}
                className="block text-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Ver todas las notificaciones →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* CSS para animación de shake */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px) rotate(-5deg); }
          75% { transform: translateX(4px) rotate(5deg); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
