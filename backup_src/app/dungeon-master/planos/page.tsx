import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Planos - Dungeon Master',
    description: 'Cosmología y descripción de los planos de existencia',
};

export default function PlanosPage() {
    const subItems = [
        {
            name: 'Cosmología y descripción de planos',
            description: 'Estructura del multiverso y características de cada plano',
            href: '/dungeon-master/planos/cosmologia',
            count: 'Próximamente',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <Link href="/dungeon-master">
                <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all text-dungeon-300 hover:text-gold-400">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a Dungeon Master
                </Button>
            </Link>

            <div className="mb-12 border-l-4 border-gold-500 pl-6">
                <div className="flex items-center gap-3 mb-3">
                    <Globe className="h-8 w-8 text-gold-500" />
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
                        Planos
                    </h1>
                </div>
                <p className="text-lg text-dungeon-300">
                    Cosmología y descripción de los planos de existencia en D&D 3.5
                </p>
            </div>

            <div className="grid gap-6">
                {subItems.map((item) => (
                    <Link key={item.name} href={item.href}>
                        <Card className="transition-colors hover:border-dungeon-600 cursor-pointer group">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-xl group-hover:text-gold-500 transition-colors">
                                        {item.name}
                                    </CardTitle>
                                    <span className="text-xs font-mono text-dungeon-400 bg-dungeon-800 px-2 py-1 rounded">
                                        {item.count}
                                    </span>
                                </div>
                                <CardDescription className="text-dungeon-300 mt-2">
                                    {item.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
