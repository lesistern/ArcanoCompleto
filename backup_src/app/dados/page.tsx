
import { Metadata } from 'next';
import Link from 'next/link';
import { Dices, ArrowLeft } from 'lucide-react';
import DiceBoxRoller from '@/components/dice3d/DiceBoxRoller';

export const metadata: Metadata = {
  title: 'Dados 3D | Compendio Arcano',
  description: 'Simulador de dados 3D interactivo para D&D 3.5',
};

export default function DadosPage() {
  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-lg hover:bg-dungeon-800 text-dungeon-400 hover:text-gold-500 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-heading font-bold text-dungeon-100 flex items-center gap-3">
                <Dices className="w-8 h-8 text-gold-500" />
                Simulador de Dados
              </h1>
              <p className="text-dungeon-400">Lanza los dados del destino</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dice Roller Area */}
          <div className="lg:col-span-3">
            <DiceBoxRoller />
          </div>
        </div>
      </div>
    </div>
  );
}