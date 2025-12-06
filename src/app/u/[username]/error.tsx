'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { pageContainerPadding } from '@/lib/utils/responsive-spacing';
import { Card, CardContent } from '@/components/ui/Card';

export default function ProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log del error para debugging
    console.error('Profile page error:', error);
  }, [error]);

  return (
    <div className={`min-h-screen bg-dungeon-950 ${pageContainerPadding}`}>
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border-red-500/30 bg-dungeon-900">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />

            <h1 className="text-2xl font-bold text-dungeon-100 mb-2">
              Error al cargar el perfil
            </h1>

            <p className="text-dungeon-300 mb-6">
              Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
            </p>

            {error.digest && (
              <p className="text-sm text-dungeon-500 mb-6">
                Código de error: {error.digest}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-dungeon-950 font-semibold rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reintentar
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-dungeon-600 hover:border-dungeon-500 text-dungeon-200 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                Ir al inicio
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
