'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function BackToHome() {
  const pathname = usePathname();

  // No mostrar en la página de inicio
  if (pathname === '/') {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-dungeon-400 hover:text-dungeon-200 transition-colors bg-dungeon-800/80 backdrop-blur-sm border border-dungeon-700 rounded-lg px-4 py-2 shadow-lg hover:bg-dungeon-700/80"
      >
        <Home className="h-4 w-4 mr-2" />
        Volver al inicio
      </Link>
    </div>
  );
}
