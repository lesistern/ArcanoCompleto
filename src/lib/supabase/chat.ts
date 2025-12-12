/**
 * Servicios de Chat con Supabase
 * Sistema completo de mensajería directa en tiempo real
 */

import { createClient } from '@/lib/supabase/client';

// =====================================================
// TYPES
// =====================================================

export interface ChatConversation {
  id: string;
  user1_id: string;
  user2_id: string;
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  message: string;
  is_read: boolean;
  read_at: string | null;
  metadata: Record<string, any>;
  is_deleted: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ConversationWithDetails {
  id: string;
  other_user_id: string;
  other_user_name: string | null;
  other_user_username: string | null;
  other_user_avatar: string | null;
  last_message: string | null;
  last_message_at: string;
  unread_count: number;
}

export interface MessageWithSender extends ChatMessage {
  sender_name: string | null;
  sender_username: string | null;
  sender_avatar: string | null;
}

// =====================================================
// CONVERSATION CRUD
// =====================================================

/**
 * Obtiene todas las conversaciones del usuario actual
 */
export async function getMyConversations(): Promise<ConversationWithDetails[]> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('get_my_conversations');

  if (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }

  return data || [];
}

/**
 * Obtiene o crea una conversación con otro usuario
 */
export async function getOrCreateConversation(
  otherUserId: string
): Promise<string | null> {
  const supabase = createClient();

  // Obtener el ID del usuario actual
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error('User not authenticated');
    return null;
  }

  const { data, error } = await supabase.rpc('get_or_create_conversation', {
    p_user1_id: user.id,
    p_user2_id: otherUserId,
  });

  if (error) {
    console.error('Error getting/creating conversation:', error);
    return null;
  }

  return data;
}

/**
 * Obtiene una conversación específica
 */
export async function getConversation(
  conversationId: string
): Promise<ChatConversation | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('chat_conversations')
    .select('*')
    .eq('id', conversationId)
    .single();

  if (error) {
    console.error('Error fetching conversation:', error);
    return null;
  }

  return data;
}

// =====================================================
// MESSAGE CRUD
// =====================================================

/**
 * Obtiene todos los mensajes de una conversación
 */
export async function getConversationMessages(
  conversationId: string,
  limit: number = 50,
  offset: number = 0
): Promise<ChatMessage[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .eq('is_deleted', false)
    .order('created_at', { ascending: true })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data || [];
}

/**
 * Obtiene mensajes con información del remitente
 */
export async function getMessagesWithSender(
  conversationId: string,
  limit: number = 50
): Promise<MessageWithSender[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('chat_messages')
    .select(
      `
      *,
      profiles:sender_id (
        display_name,
        username_slug,
        avatar_url
      )
    `
    )
    .eq('conversation_id', conversationId)
    .eq('is_deleted', false)
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching messages with sender:', error);
    return [];
  }

  // Transform data to match MessageWithSender type
  return (
    data?.map((msg: any) => ({
      ...msg,
      sender_name: msg.profiles?.display_name || null,
      sender_username: msg.profiles?.username_slug || null,
      sender_avatar: msg.profiles?.avatar_url || null,
    })) || []
  );
}

/**
 * Envía un mensaje en una conversación
 */
export async function sendMessage(
  conversationId: string,
  message: string
): Promise<string | null> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('send_chat_message', {
    p_conversation_id: conversationId,
    p_message: message,
  });

  if (error) {
    console.error('Error sending message:', error);
    return null;
  }

  return data;
}

/**
 * Marca un mensaje como leído
 */
export async function markMessageAsRead(messageId: string): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from('chat_messages')
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq('id', messageId);

  if (error) {
    console.error('Error marking message as read:', error);
    return false;
  }

  return true;
}

/**
 * Marca todos los mensajes de una conversación como leídos
 */
export async function markConversationAsRead(
  conversationId: string
): Promise<boolean> {
  const supabase = createClient();

  // Obtener el ID del usuario actual
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error('User not authenticated');
    return false;
  }

  const { error } = await supabase
    .from('chat_messages')
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq('conversation_id', conversationId)
    .eq('is_read', false)
    .neq('sender_id', user.id); // Solo marcar mensajes de otros usuarios

  if (error) {
    console.error('Error marking conversation as read:', error);
    return false;
  }

  return true;
}

/**
 * Soft delete de un mensaje (solo el remitente)
 */
export async function deleteMessage(messageId: string): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from('chat_messages')
    .update({ is_deleted: true, deleted_at: new Date().toISOString() })
    .eq('id', messageId);

  if (error) {
    console.error('Error deleting message:', error);
    return false;
  }

  return true;
}

/**
 * Obtiene el contador de mensajes no leídos totales
 */
export async function getTotalUnreadCount(): Promise<number> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 0;

  const { count, error } = await supabase
    .from('chat_messages')
    .select('*', { count: 'exact', head: true })
    .eq('is_read', false)
    .neq('sender_id', user.id);

  if (error) {
    console.error('Error counting unread messages:', error);
    return 0;
  }

  return count || 0;
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Obtiene el ID del otro usuario en una conversación
 */
export function getOtherUserId(
  conversation: ChatConversation,
  currentUserId: string
): string {
  return conversation.user1_id === currentUserId
    ? conversation.user2_id
    : conversation.user1_id;
}

/**
 * Formatea el timestamp del último mensaje
 */
export function formatLastMessageTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return 'ahora';
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  } else if (diffHours < 24) {
    return `${diffHours}h`;
  } else if (diffDays === 1) {
    return 'ayer';
  } else if (diffDays < 7) {
    return `${diffDays}d`;
  } else {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
    });
  }
}

/**
 * Trunca un mensaje largo para vista previa
 */
export function truncateMessage(message: string, maxLength: number = 50): string {
  if (message.length <= maxLength) return message;
  return message.substring(0, maxLength) + '...';
}

/**
 * Verifica si el usuario actual es el remitente de un mensaje
 */
export function isOwnMessage(message: ChatMessage, currentUserId: string): boolean {
  return message.sender_id === currentUserId;
}

/**
 * Agrupa mensajes por fecha
 */
export function groupMessagesByDate(
  messages: ChatMessage[]
): Map<string, ChatMessage[]> {
  const grouped = new Map<string, ChatMessage[]>();

  messages.forEach((msg) => {
    const date = new Date(msg.created_at).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    if (!grouped.has(date)) {
      grouped.set(date, []);
    }

    grouped.get(date)!.push(msg);
  });

  return grouped;
}
