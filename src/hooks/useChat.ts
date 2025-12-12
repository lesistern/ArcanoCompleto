/**
 * Hook de React para Chat en Tiempo Real
 * Usa Supabase Realtime para actualizar mensajes automáticamente
 */

'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  getMyConversations,
  getMessagesWithSender,
  sendMessage,
  markConversationAsRead,
  getTotalUnreadCount,
  type ConversationWithDetails,
  type MessageWithSender,
} from '@/lib/supabase/chat';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface UseChatConversationsReturn {
  conversations: ConversationWithDetails[];
  totalUnreadCount: number;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

interface UseChatMessagesReturn {
  messages: MessageWithSender[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (message: string) => Promise<void>;
  markAsRead: () => Promise<void>;
  refresh: () => Promise<void>;
}

// =====================================================
// Hook para Conversaciones
// =====================================================

export function useChatConversations(): UseChatConversationsReturn {
  const [conversations, setConversations] = useState<ConversationWithDetails[]>([]);
  const [totalUnreadCount, setTotalUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  const supabase = createClient();

  const loadConversations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [convs, unreadCount] = await Promise.all([
        getMyConversations(),
        getTotalUnreadCount(),
      ]);

      setConversations(convs);
      setTotalUnreadCount(unreadCount);
    } catch (err) {
      console.error('Error loading conversations:', err);
      setError(err instanceof Error ? err : new Error('Error loading conversations'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConversations();

    // Suscribirse a cambios en conversaciones
    const newChannel = supabase
      .channel('conversations_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_conversations',
        },
        () => {
          // Recargar conversaciones cuando hay cambios
          loadConversations();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
        },
        () => {
          // Recargar conversaciones cuando hay nuevos mensajes
          loadConversations();
        }
      )
      .subscribe();

    setChannel(newChannel);

    return () => {
      if (newChannel) {
        supabase.removeChannel(newChannel);
      }
    };
  }, [loadConversations, supabase]);

  return {
    conversations,
    totalUnreadCount,
    isLoading,
    error,
    refresh: loadConversations,
  };
}

// =====================================================
// Hook para Mensajes de una Conversación
// =====================================================

export function useChatMessages(conversationId: string | null): UseChatMessagesReturn {
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  const supabase = createClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadMessages = useCallback(async () => {
    if (!conversationId) {
      setMessages([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const msgs = await getMessagesWithSender(conversationId);
      setMessages(msgs);

      // Scroll al final después de cargar mensajes
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Error loading messages:', err);
      setError(err instanceof Error ? err : new Error('Error loading messages'));
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  const handleSendMessage = useCallback(
    async (messageText: string) => {
      if (!conversationId || !messageText.trim()) return;

      try {
        await sendMessage(conversationId, messageText.trim());
        // Los mensajes se actualizarán automáticamente vía Realtime
      } catch (err) {
        console.error('Error sending message:', err);
        setError(err instanceof Error ? err : new Error('Error sending message'));
      }
    },
    [conversationId]
  );

  const handleMarkAsRead = useCallback(async () => {
    if (!conversationId) return;

    try {
      await markConversationAsRead(conversationId);
    } catch (err) {
      console.error('Error marking conversation as read:', err);
    }
  }, [conversationId]);

  useEffect(() => {
    if (!conversationId) return;

    loadMessages();

    // Marcar como leída al abrir la conversación
    handleMarkAsRead();

    // Suscribirse a nuevos mensajes
    const newChannel = supabase
      .channel(`messages_${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          console.log('New message received:', payload);

          // Cargar mensaje completo con información del remitente
          loadMessages();

          // Scroll al final
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          console.log('Message updated:', payload);

          // Actualizar mensaje en la lista
          const updatedMessage = payload.new as MessageWithSender;
          setMessages((prev) =>
            prev.map((m) => (m.id === updatedMessage.id ? updatedMessage : m))
          );
        }
      )
      .subscribe();

    setChannel(newChannel);

    return () => {
      if (newChannel) {
        supabase.removeChannel(newChannel);
      }
    };
  }, [conversationId, loadMessages, handleMarkAsRead, supabase]);

  return {
    messages,
    isLoading,
    error,
    sendMessage: handleSendMessage,
    markAsRead: handleMarkAsRead,
    refresh: loadMessages,
  };
}

// =====================================================
// Hook Combinado para Chat Completo
// =====================================================

interface UseChatReturn {
  // Conversaciones
  conversations: ConversationWithDetails[];
  totalUnreadCount: number;
  isLoadingConversations: boolean;
  conversationsError: Error | null;
  refreshConversations: () => Promise<void>;

  // Mensajes
  messages: MessageWithSender[];
  isLoadingMessages: boolean;
  messagesError: Error | null;
  sendMessage: (message: string) => Promise<void>;
  markConversationAsRead: () => Promise<void>;
  refreshMessages: () => Promise<void>;

  // Conversación activa
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
}

export function useChat(): UseChatReturn {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const {
    conversations,
    totalUnreadCount,
    isLoading: isLoadingConversations,
    error: conversationsError,
    refresh: refreshConversations,
  } = useChatConversations();

  const {
    messages,
    isLoading: isLoadingMessages,
    error: messagesError,
    sendMessage,
    markAsRead: markConversationAsRead,
    refresh: refreshMessages,
  } = useChatMessages(activeConversationId);

  return {
    // Conversaciones
    conversations,
    totalUnreadCount,
    isLoadingConversations,
    conversationsError,
    refreshConversations,

    // Mensajes
    messages,
    isLoadingMessages,
    messagesError,
    sendMessage,
    markConversationAsRead,
    refreshMessages,

    // Conversación activa
    activeConversationId,
    setActiveConversationId,
  };
}
