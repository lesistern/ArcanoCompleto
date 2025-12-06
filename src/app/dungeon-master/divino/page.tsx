import Link from 'next/link';
import { Sparkles, Zap, Wand2, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Divino - Dungeon Master',
    description: 'Poderes divinos, deidades y reglas épicas',
};

export default function DivinoPage() {
    const subItems = [
        {
            name: 'Habilidades divinas destacadas',
            description: 'Poderes y habilidades de nivel divino',
            href: '/dungeon-master/divino/habilidades',
            icon: Zap,
            count: 'Próximamente',
        },
        {
            name: 'Dotes',
            description: 'Dotes divinas y épicas',
            href: '/dungeon-master/divino/dotes',
            icon: Sparkles,
            count: 'Próximamente',
        },
        {
            name: 'Conjuros',
            description: 'Conjuros divinos de alto nivel',
            href: '/dungeon-master/divino/conjuros',
            icon: Wand2,
            count: 'Próximamente',
        },
        {
            name: 'Súbditos',
            description: 'Seguidores y sirvientes divinos',
            href: '/dungeon-master/divino/subditos',
            icon: Users,
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
                    <Sparkles className="h-8 w-8 text-gold-500" />
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
                        Divino
                    </h1>
                </div>
                <p className="text-lg text-dungeon-300">
                    Poderes divinos, deidades y reglas para personajes de nivel épico
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link key={item.name} href={item.href}>
                            <Card className="h-full transition-colors hover:border-dungeon-600 cursor-pointer group">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <Icon className="h-5 w-5 text-dungeon-400" />
                                            <CardTitle className="text-lg group-hover:text-gold-500 transition-colors">
                                                {item.name}
                                            </CardTitle>
                                        </div>
                                        <span className="text-xs font-mono text-dungeon-400 bg-dungeon-800 px-2 py-1 rounded">
                                            {item.count}
                                        </span>
                                    </div>
                                    <CardDescription className="text-dungeon-300 mt-2 ml-8">
                                        {item.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
