'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { MessageSquare, X } from 'lucide-react';

/**
 * Floating feedback button component
 *
 * Muestra un botón flotante en la esquina inferior derecha
 * que redirige a la página de feedback (/feedback)
 *
 * Solo visible para usuarios autenticados con tier beta_tester o superior
 */
export default function FeedbackButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuth();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
  }

  function handleClick() {
    router.push('/feedback');
  }

  function toggleMinimize() {
    setIsMinimized(!isMinimized);
  }

  // No mostrar si no está autenticado
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Botón flotante */}
      <div className="fixed bottom-6 right-6 z-50">
        {isMinimized ? (
          // Versión minimizada - solo icono
          <button
            onClick={toggleMinimize}
            className="bg-gold-600 hover:bg-gold-700 text-dungeon-950 rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-950"
            aria-label="Abrir botón de feedback"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        ) : (
          // Versión expandida - con texto
          <div className="bg-dungeon-800 border-2 border-gold-500 rounded-lg shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gold-600 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-dungeon-950" />
                <span className="font-bold text-dungeon-950 text-sm">
                  Reportar Problema
                </span>
              </div>
              <button
                onClick={toggleMinimize}
                className="text-dungeon-950 hover:text-dungeon-700 transition-colors"
                aria-label="Minimizar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4">
              <p className="text-dungeon-200 text-sm mb-3">
                ¿Encontraste un bug o tienes una sugerencia?
              </p>
              <button
                onClick={handleClick}
                className="w-full bg-gold-600 hover:bg-gold-700 text-dungeon-950 font-bold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                Abrir Formulario
              </button>
            </div>

            {/* Footer */}
            <div className="bg-dungeon-900 px-4 py-2 text-center">
              <p className="text-dungeon-500 text-xs">
                Tu feedback nos ayuda a mejorar
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
