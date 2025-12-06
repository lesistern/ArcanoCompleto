import Link from 'next/link';
import { Monitor, Users, Gem, Trees, Zap, Globe, Mountain, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata = {
    title: 'Dungeon Master - Compendio Arcano',
    description: 'Herramientas y recursos para el Dungeon Master de D&D 3.5',
};

export default function DungeonMasterPage() {
    const subcategories = [
        {
            name: 'Pantalla DM',
            description: 'Tablas de referencia rápida y reglas esenciales',
            href: '/dungeon-master/pantalla-dm',
            icon: Monitor,
            color: 'gold-500',
            count: 'Próximamente',
        },
        {
            name: 'Clases PNJ',
            description: 'Clases para personajes no jugadores',
            href: '/dungeon-master/clases-pnj',
            icon: Users,
            color: 'class-green',
            count: 'Próximamente',
        },
        {
            name: 'Tesoros',
            description: 'Generación y distribución de tesoros',
            href: '/dungeon-master/tesoros',
            icon: Gem,
            color: 'item-gold',
            count: 'Próximamente',
        },
        {
            name: 'Tierras salvajes, clima y ambiente',
            description: 'Reglas para exploración y entornos',
            href: '/dungeon-master/tierras-salvajes',
            icon: Trees,
            color: 'spell-blue',
            count: 'Próximamente',
        },
        {
            name: 'Trampas',
            description: 'Diseño y mecánicas de trampas',
            href: '/dungeon-master/trampas',
            icon: Zap,
            color: 'monster-red',
            count: 'Próximamente',
        },
        {
            name: 'Planos',
            description: 'Cosmología y descripción de planos',
            href: '/dungeon-master/planos',
            icon: Globe,
            color: 'spell-blue',
            count: '1',
            hasSubItems: true,
        },
        {
            name: 'Obstáculos épicos',
            description: 'Desafíos para personajes de alto nivel',
            href: '/dungeon-master/obstaculos-epicos',
            icon: Mountain,
            color: 'gold-500',
            count: 'Próximamente',
        },
        {
            name: 'Divino',
            description: 'Poderes divinos y deidades',
            href: '/dungeon-master/divino',
            icon: Sparkles,
            color: 'gold-500',
            count: '4',
            hasSubItems: true,
        },
    ];

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            {/* Hero Section */}
            <div className="mb-12 border-l-4 border-gold-500 pl-6">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 mb-3">
                    Dungeon Master
                </h1>
                <p className="text-lg text-dungeon-300 max-w-2xl">
                    Herramientas, reglas y recursos esenciales para dirigir tus partidas de D&D 3.5
                </p>
            </div>

            {/* Subcategories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subcategories.map((subcategory) => {
                    const Icon = subcategory.icon;
                    return (
                        <Link key={subcategory.name} href={subcategory.href}>
                            <Card className="h-full transition-colors hover:border-dungeon-600 cursor-pointer group relative">
                                {subcategory.hasSubItems && (
                                    <div className="absolute top-3 right-3">
                                        <span className="text-xs font-mono text-gold-500 bg-gold-500/10 px-2 py-1 rounded border border-gold-500/30">
                                            SUB-ITEMS
                                        </span>
                                    </div>
                                )}
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <Icon className="h-5 w-5 text-dungeon-400" />
                                            <CardTitle className="text-lg group-hover:text-gold-500 transition-colors">
                                                {subcategory.name}
                                            </CardTitle>
                                        </div>
                                        {!subcategory.hasSubItems && (
                                            <span className="text-xs font-mono text-dungeon-400 bg-dungeon-800 px-2 py-1 rounded">
                                                {subcategory.count}
                                            </span>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-sm text-dungeon-300">
                                        {subcategory.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
