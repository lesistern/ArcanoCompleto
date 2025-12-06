'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';

/**
 * Floating feedback button component
 *
 * Muestra un botón flotante en la esquina inferior derecha
 * que redirige a la página de feedback (/feedback)
 *
 * Con un globo de texto animado que se muestra automáticamente
 * y se autocolapsa después de 5 segundos
 *
 * Solo visible para usuarios autenticados
 */
export default function FeedbackButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
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

  // Mostrar tooltip automáticamente al cargar
  useEffect(() => {
    if (isAuthenticated) {
      // Esperar 1 segundo antes de mostrar el tooltip
      const showTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 1000);

      // Ocultar tooltip después de 5 segundos
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 6000); // 1s de delay + 5s de duración

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isAuthenticated]);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
  }

  function handleClick() {
    router.push('/feedback');
  }

  // No mostrar si no está autenticado
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex justify-end">
      {/* Contenedor relativo para posicionar el tooltip */}
      <div className="relative">
        {/* Globo de texto (tooltip) */}
        <div
          className={`
            absolute bottom-0 right-full mr-3
            bg-dungeon-800 border-2 border-gold-500 rounded-lg shadow-xl
            px-3 py-2 w-[240px]
            transition-all duration-500 ease-out
            ${showTooltip
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-4 pointer-events-none'
            }
          `}
          style={{
            transformOrigin: 'left center'
          }}
        >
          {/* Flecha apuntando al botón */}
          <div
            className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-dungeon-800 border-l-2 border-b-2 border-gold-500 rotate-[45deg]"
          />

          {/* Contenido del tooltip */}
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-gold-500" />
              <span className="font-bold text-gold-400 text-xs">
                Reportar Problema
              </span>
            </div>
            <p className="text-dungeon-200 text-[11px] leading-tight mb-1">
              ¿Encontraste un bug o sugerencia?
            </p>
            <p className="text-dungeon-500 text-[10px] leading-tight">
              Tu feedback nos ayuda a mejorar
            </p>
          </div>
        </div>

        {/* Botón flotante */}
        <button
          onClick={handleClick}
          className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-dungeon-900 bg-gradient-to-br from-blue-500 to-cyan-500"
          aria-label="Reportar problema o sugerencia"
          title="Reportar problema"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
