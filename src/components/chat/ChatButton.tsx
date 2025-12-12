'use client';

/**
 * ChatButton - Botón flotante de chat
 * Muestra contador de mensajes no leídos y abre ventana de chat
 */

import { useState, useEffect } from 'react';
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import { useChatConversations } from '@/hooks/useChat';
import ChatWindow from './ChatWindow';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [pulse, setPulse] = useState(false);

  const { totalUnreadCount } = useChatConversations();

  // Animación de pulse cuando llega nuevo mensaje
  useEffect(() => {
    if (totalUnreadCount > 0 && !isOpen) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [totalUnreadCount, isOpen]);

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl ${
          pulse ? 'animate-pulse' : ''
        } ${isOpen ? 'hidden' : ''}`}
        aria-label="Chat"
      >
        <MessageCircle className="h-6 w-6" />

        {/* Badge de contador */}
        {totalUnreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white ring-2 ring-dungeon-900">
            {totalUnreadCount > 9 ? '9+' : totalUnreadCount}
          </span>
        )}
      </button>

      {/* Ventana de chat */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex flex-col rounded-lg border border-dungeon-700 bg-dungeon-900 shadow-2xl transition-all duration-200 ${
            isMinimized
              ? 'h-14 w-80'
              : 'h-[600px] w-[380px] md:h-[700px] md:w-[420px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-dungeon-700 p-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-white">Mensajes</h3>
              {totalUnreadCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {totalUnreadCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="rounded p-1 text-dungeon-400 hover:bg-dungeon-800 hover:text-dungeon-300 transition-colors"
                title={isMinimized ? 'Maximizar' : 'Minimizar'}
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 text-dungeon-400 hover:bg-dungeon-800 hover:text-dungeon-300 transition-colors"
                title="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Contenido */}
          {!isMinimized && (
            <div className="flex-1 overflow-hidden">
              <ChatWindow />
            </div>
          )}
        </div>
      )}
    </>
  );
}
