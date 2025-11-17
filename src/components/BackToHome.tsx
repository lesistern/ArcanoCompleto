'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function BackToHome() {
  const pathname = usePathname();
  const [isPressed, setIsPressed] = useState(false);

  // No mostrar en la página de inicio
  if (pathname === '/') {
    return null;
  }

  return (
    <div className="fixed bottom-8 left-8 z-40">
      <Link
        href="/"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={`
          inline-flex items-center text-sm transition-all duration-150
          bg-dungeon-800/80 backdrop-blur-sm border rounded-lg px-4 py-2 shadow-lg
          ${isPressed
            ? 'scale-95 bg-dungeon-600 border-gold-500/50 text-dungeon-100 shadow-inner'
            : 'text-dungeon-400 border-dungeon-700 hover:text-dungeon-200 hover:bg-dungeon-700/80 hover:shadow-xl hover:shadow-gold-500/10'
          }
        `}
      >
        <Home className={`h-4 w-4 mr-2 transition-transform duration-150 ${isPressed ? 'scale-90' : ''}`} />
        Volver al inicio
      </Link>
    </div>
  );
}
