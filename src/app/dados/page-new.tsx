import { Metadata } from 'next';
import Link from 'next/link';
import { Dices, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dados 3D | Compendio Arcano',
  description: 'Simulador de dados 3D interactivo para D&D 3.5',
};

export default function DadosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dungeon-950 via-dungeon-900 to-dungeon-950 py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-full mb-4">
            <Dices className="w-8 h-8 text-orange-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gold-400 mb-4">
            Simulador de Dados 3D
          </h1>
          
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-orange-300 font-semibold mb-2">Característica en Desarrollo</p>
                <p className="text-dungeon-300 text-sm">
                  Esta página está temporalmente deshabilitada mientras instalamos las dependencias necesarias para el simulador 3D.
                  Volverá pronto con una experiencia de dados completamente interactiva.
                </p>
              </div>
            </div>
          </div>

          <div className="text-dungeon-400 mb-6">
            <p className="mb-2">Mientras tanto, puedes usar:</p>
            <ul className="text-sm space-y-1">
              <li>• El editor de personajes tiene un generador de habilidades con dados</li>
              <li>• Simuladores de dados online externos</li>
              <li>• ¡Tus dados físicos de siempre!</li>
            </ul>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-orange-500 text-white font-bold rounded-lg hover:from-gold-600 hover:to-orange-600 transition-all"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
