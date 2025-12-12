/**
 * Hook de React para Notificaciones en Tiempo Real
 * Usa Supabase Realtime para actualizar notificaciones automáticamente
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  getUserNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  type Notification,
} from '@/lib/supabase/notifications';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: Error | null;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  const supabase = createClient();

  // Función para cargar notificaciones
  const loadNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [notifs, count] = await Promise.all([
        getUserNotifications(50),
        getUnreadCount(),
      ]);

      setNotifications(notifs);
      setUnreadCount(count);
    } catch (err) {
      console.error('Error loading notifications:', err);
      setError(
        err instanceof Error ? err : new Error('Error loading notifications')
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Marca una notificación como leída
  const handleMarkAsRead = useCallback(
    async (notificationId: string) => {
      const success = await markAsRead(notificationId);

      if (success) {
        // Actualizar estado local inmediatamente (optimistic update)
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId
              ? { ...n, is_read: true, read_at: new Date().toISOString() }
              : n
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    },
    []
  );

  // Marca todas como leídas
  const handleMarkAllAsRead = useCallback(async () => {
    const count = await markAllAsRead();

    if (count > 0) {
      // Actualizar estado local
      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          is_read: true,
          read_at: new Date().toISOString(),
        }))
      );
      setUnreadCount(0);
    }
  }, []);

  // Setup Realtime subscription
  useEffect(() => {
    loadNotifications();

    // Suscribirse a nuevas notificaciones
    const newChannel = supabase
      .channel('notifications_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          console.log('New notification received:', payload);

          // Añadir nueva notificación al principio
          const newNotification = payload.new as Notification;
          setNotifications((prev) => [newNotification, ...prev]);

          // Incrementar contador de no leídas si la nueva no está leída
          if (!newNotification.is_read) {
            setUnreadCount((prev) => prev + 1);
          }

          // Opcional: Mostrar notificación del navegador
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(newNotification.title, {
              body: newNotification.message,
              icon: '/logo.png',
              badge: '/logo.png',
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          console.log('Notification updated:', payload);

          const updatedNotification = payload.new as Notification;

          // Actualizar notificación en la lista
          setNotifications((prev) =>
            prev.map((n) => (n.id === updatedNotification.id ? updatedNotification : n))
          );

          // Actualizar contador si cambió el estado de leída
          const oldNotification = payload.old as Notification;
          if (!oldNotification.is_read && updatedNotification.is_read) {
            setUnreadCount((prev) => Math.max(0, prev - 1));
          }
        }
      )
      .subscribe();

    setChannel(newChannel);

    // Cleanup al desmontar
    return () => {
      if (newChannel) {
        supabase.removeChannel(newChannel);
      }
    };
  }, [loadNotifications, supabase]);

  // Solicitar permiso para notificaciones del navegador
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        console.log('Notification permission:', permission);
      });
    }
  }, []);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    refresh: loadNotifications,
  };
}
