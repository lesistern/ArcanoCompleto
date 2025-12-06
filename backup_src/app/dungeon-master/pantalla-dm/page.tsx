import Link from 'next/link';
import { Monitor } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Pantalla DM - Dungeon Master',
    description: 'Tablas de referencia rápida y reglas esenciales para el DM',
};

export default function PantallaDMPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <Link href="/dungeon-master">
                <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all text-dungeon-300 hover:text-gold-400">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a Dungeon Master
                </Button>
            </Link>

            <div className="mb-12 border-l-4 border-gold-500 pl-6">
                <div className="flex items-center gap-3 mb-3">
                    <Monitor className="h-8 w-8 text-gold-500" />
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
                        Pantalla DM
                    </h1>
                </div>
                <p className="text-lg text-dungeon-300">
                    Tablas de referencia rápida y reglas esenciales para el Dungeon Master
                </p>
            </div>

            <div className="bg-dungeon-800 border border-dungeon-700 rounded-lg p-8 text-center">
                <p className="text-dungeon-300 mb-4">
                    Esta sección está en desarrollo. Próximamente incluirá:
                </p>
                <ul className="text-left max-w-md mx-auto space-y-2 text-dungeon-400">
                    <li>• Tablas de combate y modificadores</li>
                    <li>• Condiciones y estados</li>
                    <li>• Reglas de movimiento</li>
                    <li>• Dificultades de CD comunes</li>
                    <li>• Generación rápida de encuentros</li>
                </ul>
            </div>
        </div>
    );
}
