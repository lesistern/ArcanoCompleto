import Link from 'next/link';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Trampas - Dungeon Master',
    description: 'Diseño y mecánicas de trampas',
};

export default function TrampasPage() {
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
                    <Zap className="h-8 w-8 text-gold-500" />
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
                        Trampas
                    </h1>
                </div>
                <p className="text-lg text-dungeon-300">
                    Diseño, mecánicas y desactivación de trampas
                </p>
            </div>

            <div className="bg-dungeon-800 border border-dungeon-700 rounded-lg p-8 text-center">
                <p className="text-dungeon-300 mb-4">
                    Esta sección está en desarrollo. Próximamente incluirá:
                </p>
                <ul className="text-left max-w-md mx-auto space-y-2 text-dungeon-400">
                    <li>• Trampas mecánicas</li>
                    <li>• Trampas mágicas</li>
                    <li>• CD de detección y desactivación</li>
                    <li>• Efectos y daño por nivel</li>
                    <li>• Diseño de trampas personalizadas</li>
                    <li>• Ejemplos de trampas por CR</li>
                </ul>
            </div>
        </div>
    );
}
