'use client';

/**
 * Página de Chat Completa
 * Layout de dos columnas: Conversaciones | Conversación Activa
 */

import { useState } from 'react';
import { MessageCircle, Search, User, Send, ArrowLeft, Users } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { formatLastMessageTime, truncateMessage, isOwnMessage } from '@/lib/supabase/chat';
import { useEffect, useRef } from 'react';

export default function ChatPage() {
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    conversations,
    isLoadingConversations,
    messages,
    isLoadingMessages,
    sendMessage,
    markConversationAsRead,
    activeConversationId,
    setActiveConversationId,
  } = useChat();

  // Obtener datos de la conversación activa
  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  // Scroll al final cuando cargan mensajes nuevos
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Filtrar conversaciones por búsqueda
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.other_user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.other_user_username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageText.trim() || !activeConversationId) return;

    await sendMessage(messageText);
    setMessageText('');
  };

  const handleConversationClick = (conversationId: string) => {
    setActiveConversationId(conversationId);
    markConversationAsRead();
  };

  const handleBackToList = () => {
    setActiveConversationId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Mensajes</h1>
        </div>
        <p className="text-dungeon-400">
          Chatea con otros miembros de la comunidad
        </p>
      </div>

      {/* Layout de 2 columnas (responsive) */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 h-[calc(100vh-240px)]">
        {/* Columna 1: Lista de Conversaciones */}
        <div
          className={`bg-dungeon-900 border border-dungeon-700 rounded-lg flex flex-col ${
            activeConversationId ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Header de conversaciones */}
          <div className="p-4 border-b border-dungeon-800">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Conversaciones</h2>
            </div>

            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dungeon-500" />
              <input
                type="text"
                placeholder="Buscar conversaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-dungeon-700 bg-dungeon-800 py-2 pl-10 pr-4 text-sm text-white placeholder-dungeon-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Lista de conversaciones */}
          <div className="flex-1 overflow-y-auto">
            {isLoadingConversations ? (
              <div className="flex items-center justify-center p-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center">
                <MessageCircle className="mx-auto h-12 w-12 text-dungeon-600 mb-3" />
                <p className="text-dungeon-400 text-sm">
                  {searchQuery
                    ? 'No se encontraron conversaciones'
                    : 'No tienes conversaciones'}
                </p>
                <p className="text-dungeon-500 text-xs mt-1">
                  Visita un perfil de usuario para iniciar un chat
                </p>
              </div>
            ) : (
              <div className="divide-y divide-dungeon-800">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => handleConversationClick(conv.id)}
                    className={`w-full p-4 text-left transition-colors ${
                      activeConversationId === conv.id
                        ? 'bg-blue-500/10 border-l-4 border-blue-500'
                        : 'hover:bg-dungeon-850'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {conv.other_user_avatar ? (
                          <img
                            src={conv.other_user_avatar}
                            alt={conv.other_user_name || 'Usuario'}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-dungeon-700">
                            <User className="h-6 w-6 text-dungeon-400" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-white text-sm truncate">
                            {conv.other_user_name || conv.other_user_username || 'Usuario'}
                          </h4>
                          <span className="text-xs text-dungeon-500 flex-shrink-0">
                            {formatLastMessageTime(conv.last_message_at)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs text-dungeon-400 truncate">
                            {conv.last_message
                              ? truncateMessage(conv.last_message, 40)
                              : 'Sin mensajes'}
                          </p>
                          {conv.unread_count > 0 && (
                            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                              {conv.unread_count > 9 ? '9+' : conv.unread_count}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Columna 2: Conversación Activa */}
        <div
          className={`bg-dungeon-900 border border-dungeon-700 rounded-lg flex flex-col ${
            !activeConversationId ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {!activeConversationId ? (
            // Estado vacío cuando no hay conversación seleccionada
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <MessageCircle className="h-16 w-16 text-dungeon-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Selecciona una conversación
              </h3>
              <p className="text-dungeon-400">
                Elige una conversación de la lista para empezar a chatear
              </p>
            </div>
          ) : (
            <>
              {/* Header de conversación */}
              <div className="flex items-center gap-3 border-b border-dungeon-800 p-4">
                {/* Botón volver (solo móvil) */}
                <button
                  onClick={handleBackToList}
                  className="lg:hidden rounded p-1 text-dungeon-400 hover:bg-dungeon-800 hover:text-dungeon-300 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                {/* Info del usuario */}
                {activeConversation && (
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {activeConversation.other_user_avatar ? (
                      <img
                        src={activeConversation.other_user_avatar}
                        alt={activeConversation.other_user_name || 'Usuario'}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dungeon-700">
                        <User className="h-5 w-5 text-dungeon-400" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white truncate">
                        {activeConversation.other_user_name ||
                          activeConversation.other_user_username ||
                          'Usuario'}
                      </h4>
                      <p className="text-xs text-dungeon-500">
                        @{activeConversation.other_user_username}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoadingMessages ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-dungeon-500 text-sm">Inicia la conversación</p>
                  </div>
                ) : (
                  messages.map((message, index) => {
                    const isOwn = isOwnMessage(
                      message,
                      activeConversation?.other_user_id || ''
                    );
                    const showAvatar =
                      index === 0 || messages[index - 1].sender_id !== message.sender_id;

                    return (
                      <div
                        key={message.id}
                        className={`flex gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        {/* Avatar */}
                        {!isOwn && (
                          <div className="flex-shrink-0">
                            {showAvatar ? (
                              message.sender_avatar ? (
                                <img
                                  src={message.sender_avatar}
                                  alt={message.sender_name || 'Usuario'}
                                  className="h-8 w-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-dungeon-700">
                                  <User className="h-4 w-4 text-dungeon-400" />
                                </div>
                              )
                            ) : (
                              <div className="h-8 w-8" />
                            )}
                          </div>
                        )}

                        {/* Burbuja de mensaje */}
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            isOwn
                              ? 'bg-blue-600 text-white'
                              : 'bg-dungeon-800 text-dungeon-200'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {message.message}
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              isOwn ? 'text-blue-200' : 'text-dungeon-500'
                            }`}
                          >
                            {new Date(message.created_at).toLocaleTimeString('es-ES', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input de mensaje */}
              <form
                onSubmit={handleSendMessage}
                className="border-t border-dungeon-800 p-4"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    maxLength={2000}
                    className="flex-1 rounded-lg border border-dungeon-700 bg-dungeon-800 px-4 py-2 text-sm text-white placeholder-dungeon-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!messageText.trim()}
                    className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                {messageText.length > 1900 && (
                  <p className="text-xs text-orange-400 mt-2">
                    {2000 - messageText.length} caracteres restantes
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
