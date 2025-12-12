'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Heart, ExternalLink, Coffee, DollarSign } from 'lucide-react';

/**
 * Floating donation button component
 *
 * Muestra un botón flotante en la esquina inferior izquierda
 * que expande un menú con opciones de donación
 *
 * Con un globo de texto animado que se muestra automáticamente
 * y se autocolapsa después de 7 segundos
 *
 * Siempre visible para todos los usuarios
 */
export default function DonationButton() {

  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);



  // Cerrar menú cuando se hace click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isExpanded]);

  // Enlaces de donación (actualizar con tus URLs reales)
  const donationLinks = [
    {
      name: 'Cafecito',
      icon: Coffee,
      url: 'https://cafecito.app/compendioarcano', // Cambiar por tu URL real
      description: 'Invitame un cafecito',
      color: 'text-[#00D9C0] hover:text-[#00D9C0]/80',
    },
    {
      name: 'Mercado Pago',
      icon: DollarSign,
      url: 'https://link.mercadopago.com.ar/compendioarcano', // Cambiar por tu URL real
      description: 'Donación por MP',
      color: 'text-[#009EE3] hover:text-[#009EE3]/80',
    },
    {
      name: 'Patreon',
      icon: Heart,
      url: '/patreon',
      description: 'Conviértete en patrón',
      color: 'text-[#FF424D] hover:text-[#FF424D]/80',
    },
  ];

  return (
    <div className="flex justify-end">
      {/* Contenedor relativo para posicionar el tooltip */}
      <div className="relative" ref={containerRef}>


        {/* Menú expandido de donaciones */}
        {isExpanded && (
          <div
            className="
              absolute bottom-0 right-full mr-3
              bg-dungeon-800 border-2 border-gold-500 rounded-lg shadow-xl
              py-2 w-[280px]
              animate-in fade-in slide-in-from-right-2 duration-200
            "
          >
            {/* Flecha abajo a la derecha */}
            <div className="absolute right-0 bottom-6 translate-x-full">
              <div className="border-8 border-transparent border-l-gold-500" />
              <div className="absolute top-1/2 right-[2px] -translate-y-1/2 border-8 border-transparent border-l-dungeon-800" />
            </div>

            {/* Header */}
            <div className="px-4 pb-2 border-b border-dungeon-700">
              <h3 className="text-gold-400 font-semibold text-sm">
                Apoya el proyecto
              </h3>
              <p className="text-dungeon-400 text-xs mt-1">
                Tu ayuda mantiene este proyecto vivo
              </p>
            </div>

            {/* Opciones de donación */}
            <div className="py-1">
              {donationLinks.map((link) => {
                const isInternal = link.url.startsWith('/');
                const linkContent = (
                  <>
                    <div className={`flex-shrink-0 ${link.color}`}>
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-dungeon-100 group-hover:text-gold-400 transition-colors">
                          {link.name}
                        </span>
                        {!isInternal && (
                          <ExternalLink className="w-3 h-3 text-dungeon-500 group-hover:text-gold-500 transition-colors" />
                        )}
                      </div>
                      <p className="text-xs text-dungeon-400 mt-0.5">
                        {link.description}
                      </p>
                    </div>
                  </>
                );

                const linkClassName = `
                  flex items-center gap-3 px-4 py-3
                  hover:bg-dungeon-700
                  transition-colors
                  group
                `;

                return isInternal ? (
                  <Link
                    key={link.name}
                    href={link.url}
                    className={linkClassName}
                    onClick={() => setIsExpanded(false)}
                  >
                    {linkContent}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  >
                    {linkContent}
                  </a>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-4 pt-2 border-t border-dungeon-700">
              <p className="text-dungeon-500 text-[10px] text-center leading-tight">
                Todas las donaciones son voluntarias.<br />
                ¡Gracias por tu apoyo! ❤️
              </p>
            </div>
          </div>
        )}

        {/* Botón principal - Más grande y llamativo */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}

          className={`
            flex items-center justify-center
            rounded-full shadow-lg
            transition-all duration-300 ease-in-out
            hover:scale-110 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-900
            ${isExpanded
              ? 'w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500'
              : 'w-14 h-14 bg-gradient-to-br from-gold-500 to-orange-500'
            }
          `}
          aria-label={isExpanded ? 'Cerrar menú de donaciones' : 'Abrir menú de donaciones'}
        >
          <Heart className={`w-7 h-7 text-white ${isExpanded ? 'fill-white' : ''}`} />
        </button>
      </div>
    </div>
  );
}
