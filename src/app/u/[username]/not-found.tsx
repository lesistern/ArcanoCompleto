import Link from 'next/link';
import { UserX, Home, Users } from 'lucide-react';
import { pageContainerPadding } from '@/lib/utils/responsive-spacing';
import { Card, CardContent } from '@/components/ui/Card';

export default function ProfileNotFound() {
  return (
    <div className={`min-h-screen bg-dungeon-950 ${pageContainerPadding}`}>
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border-dungeon-700 bg-dungeon-900">
          <CardContent className="p-8 text-center">
            <UserX className="w-16 h-16 text-dungeon-500 mx-auto mb-4" />

            <h1 className="text-2xl font-bold text-dungeon-100 mb-2">
              Perfil no encontrado
            </h1>

            <p className="text-dungeon-300 mb-6">
              Este usuario no existe o ha configurado su perfil como privado.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/leaderboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-dungeon-950 font-semibold rounded-lg transition-colors"
              >
                <Users className="w-4 h-4" />
                Ver Leaderboard
              </Link>

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
