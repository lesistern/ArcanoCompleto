'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';

/**
 * Botón flotante de traducción
 *
 * Muestra un botón flotante a la izquierda del botón de feedback
 * que redirige a la página de traducciones (/contribute/translate)
 *
 * Con un globo de texto animado que se muestra automáticamente
 * y se autocolapsa después de 5 segundos
 *
 * Solo visible para usuarios autenticados
 */
export default function TranslatePageButton() {
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
      // Esperar 2 segundos antes de mostrar el tooltip (después del de feedback)
      const showTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 2000);

      // Ocultar tooltip después de 5 segundos
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 7000); // 2s de delay + 5s de duración

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
    router.push('/contribute/translate');
  }

  // No mostrar si no está autenticado
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-[88px] z-[55]">
      {/* Contenedor relativo para posicionar el tooltip */}
      <div className="relative">
        {/* Globo de texto (tooltip) */}
        <div
          className={`
            absolute bottom-0 right-full mr-3
            bg-dungeon-800 border-2 border-purple-500 rounded-lg shadow-xl
            px-3 py-2 w-[240px]
            transition-all duration-500 ease-out
            ${showTooltip
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-4 pointer-events-none'
            }
          `}
          style={{
            transformOrigin: 'right center'
          }}
        >
          {/* Flecha apuntando al botón */}
          <div
            className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-dungeon-800 border-r-2 border-b-2 border-purple-500 rotate-[-45deg]"
          />

          {/* Contenido del tooltip */}
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Languages className="w-3.5 h-3.5 text-purple-500" />
              <span className="font-bold text-purple-400 text-xs">
                Traducciones
              </span>
            </div>
            <p className="text-dungeon-200 text-[11px] leading-tight mb-1">
              Ayuda a traducir contenido al español
            </p>
            <p className="text-dungeon-500 text-[10px] leading-tight">
              Gana XP contribuyendo traducciones
            </p>
          </div>
        </div>

        {/* Botón flotante */}
        <button
          onClick={handleClick}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-dungeon-950"
          aria-label="Traducir contenido"
          title="Traducciones colaborativas"
        >
          <Languages className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
