'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar si ha scrolleado más de 300px
      if (window.scrollY > 300) {
        setIsVisible(true);

        // Limpiar timeout anterior
        if (hideTimeout) {
          clearTimeout(hideTimeout);
        }

        // Ocultar después de 2 segundos
        const timeout = setTimeout(() => {
          setIsVisible(false);
        }, 2000);

        setHideTimeout(timeout);
      } else {
        setIsVisible(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Mostrar si el mouse está en el 20% inferior de la pantalla
      const windowHeight = window.innerHeight;
      const mouseY = e.clientY;

      if (mouseY > windowHeight * 0.8 && window.scrollY > 300) {
        setIsVisible(true);

        // Limpiar timeout anterior
        if (hideTimeout) {
          clearTimeout(hideTimeout);
        }

        // Ocultar después de 2 segundos
        const timeout = setTimeout(() => {
          setIsVisible(false);
        }, 2000);

        setHideTimeout(timeout);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-4 rounded-full bg-gold-600 text-dungeon-950 shadow-xl hover:bg-gold-500 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Volver arriba"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}
