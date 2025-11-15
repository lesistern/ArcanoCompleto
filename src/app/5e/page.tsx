import Link from 'next/link';
import { ArrowLeft, Construction } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function FifthEditionPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-8">
        <Link href="/">
          <Button variant="secondary">Volver al inicio</Button>
        </Link>
      </div>

      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 mb-3">
          D&D 5e
        </h1>
        <p className="text-lg text-dungeon-300">
          Quinta Edición • En desarrollo
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Construction className="h-6 w-6 text-gold-500" />
            <CardTitle className="text-2xl text-gold-500">Próximamente</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-dungeon-300 mb-4">
            El compendio de D&D 5e está actualmente en desarrollo. Esta sección incluirá:
          </p>
          <ul className="space-y-2 text-sm text-dungeon-300 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-gold-500 mt-1">•</span>
              <span>Todas las criaturas del Monster Manual y suplementos oficiales</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-500 mt-1">•</span>
              <span>Hechizos del Player's Handbook y expansiones</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-500 mt-1">•</span>
              <span>Clases, subclases y opciones de personaje</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-500 mt-1">•</span>
              <span>Objetos mágicos y equipamiento</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-500 mt-1">•</span>
              <span>Reglas y mecánicas de juego</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
          Estado del Proyecto
        </h3>
        <p className="text-sm text-dungeon-400 mb-4">
          Actualmente estamos enfocados en completar el contenido de D&D 3.5e.
          Una vez finalizado, comenzaremos con la implementación de la Quinta Edición.
        </p>
        <p className="text-xs text-dungeon-500">
          Mientras tanto, puedes explorar el contenido completo de la edición 3.5.
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/">
          <Button variant="secondary">
            Volver a D&D 3.5e
          </Button>
        </Link>
      </div>
    </div>
  );
}
