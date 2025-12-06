import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Conjuros | Compendio Arcano',
  description: 'Listado de conjuros',
};

export const revalidate = 3600;

export default function ConjurosPage() {
  return (
    <div className="min-h-screen bg-dungeon-950 py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="card p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-500/10 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-gold-400" />
          </div>

          <h1 className="text-3xl font-bold text-gold-400 mb-4 font-heading">
            Conjuros
          </h1>

          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-orange-300 font-semibold mb-2">Característica en Desarrollo</p>
                <p className="text-dungeon-300 text-sm">
                  Esta sección está temporalmente deshabilitada mientras preparamos el compendio completo de conjuros. Volverá pronto con toda la información y filtrados.
                </p>
              </div>
            </div>
          </div>

          <div className="text-dungeon-400 mb-6">
            <p className="mb-2">Mientras tanto, puedes:</p>
            <ul className="text-sm space-y-1">
              <li>- Revisar clases y sus listas de conjuros en <Link href="/clases" className="text-gold-400 hover:underline">/clases</Link></li>
              <li>- Explorar dotes relacionadas en <Link href="/dotes" className="text-gold-400 hover:underline">/dotes</Link></li>
              <li>- Volver al manual principal para seguir navegando</li>
            </ul>
          </div>

          <Link href="/">
            <Button variant="primary" size="lg">
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
