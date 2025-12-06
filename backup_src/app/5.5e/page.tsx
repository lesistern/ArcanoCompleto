import Link from 'next/link';
import { ArrowLeft, Construction, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function FifthPointFiveEditionPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-8">
        <Link href="/">
          <Button variant="secondary">Volver al inicio</Button>
        </Link>
      </div>

      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 mb-3">
          D&D 5.5e
        </h1>
        <p className="text-lg text-dungeon-300">
          Revisión 2024 (Complemento Opcional) • En desarrollo
        </p>
      </div>

      <Card className="mb-8 border-gold-500/30 bg-gold-500/5">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Info className="h-6 w-6 text-gold-500" />
            <CardTitle className="text-2xl text-gold-500">Contenido Opcional</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-dungeon-300 mb-4">
            La edición 5.5e (también conocida como la Revisión 2024) es un complemento opcional
            de D&D 5e que introduce cambios y mejoras a las reglas existentes.
          </p>
          <p className="text-sm text-dungeon-400">
            No todos los grupos utilizan estas reglas revisadas. Muchas mesas continúan
            jugando con las reglas originales de 5e del 2014.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Construction className="h-6 w-6 text-dungeon-400" />
            <CardTitle className="text-2xl">Próximamente</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-dungeon-300 mb-4">
            El compendio de D&D 5.5e incluirá las reglas y contenido revisado:
          </p>
          <ul className="space-y-2 text-sm text-dungeon-300 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-gold-500 mt-1">•</span>
              <span>Cambios y mejoras a las clases del Player's Handbook 2024</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-500 mt-1">•</span>
              <span>Reglas actualizadas de combate y exploración</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-500 mt-1">•</span>
              <span>Nuevas opciones de subclases y dotes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-500 mt-1">•</span>
              <span>Hechizos revisados y balanceados</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-500 mt-1">•</span>
              <span>Comparativas con las reglas de 5e original</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
          Orden de Desarrollo
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-gold-500 font-mono mt-0.5">1.</span>
            <div>
              <p className="text-dungeon-200 font-semibold">D&D 3.5e</p>
              <p className="text-dungeon-400 text-xs">En desarrollo activo</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-dungeon-500 font-mono mt-0.5">2.</span>
            <div>
              <p className="text-dungeon-400">D&D 5e</p>
              <p className="text-dungeon-500 text-xs">Planificado</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-dungeon-600 font-mono mt-0.5">3.</span>
            <div>
              <p className="text-dungeon-500">D&D 5.5e (Opcional)</p>
              <p className="text-dungeon-600 text-xs">Futuro</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/">
          <Button variant="secondary">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
