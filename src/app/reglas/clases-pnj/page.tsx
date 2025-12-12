import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users, Info, Briefcase, Crown, BookOpen, Swords, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Clases de PNJ - Reglas D&D 3.5 | Compendio Arcano',
    description: 'Clases de personajes no jugadores en D&D 3.5: Adepto, Aristócrata, Experto, Guerrero y Plebeyo.',
};

interface NPCClass {
    name: string;
    hitDie: string;
    bab: string;
    goodSaves: string[];
    skillPoints: number;
    description: string;
    keyAbility: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    features: string[];
}

const NPC_CLASSES: NPCClass[] = [
    {
        name: 'Adepto',
        hitDie: 'd6',
        bab: 'Bajo (+1/2 nivel)',
        goodSaves: ['Voluntad'],
        skillPoints: 2,
        description: 'Lanzadores de conjuros divinos menores. Representan curanderos de pueblo, chamanes tribales o hechiceros rurales.',
        keyAbility: 'Sabiduría',
        icon: Wand2,
        color: 'text-purple-400',
        features: [
            'Lista de conjuros propia (más limitada que clérigo)',
            'Conjuros de nivel 0-5',
            'Familiar a nivel 2',
            'No tiene acceso a dominios'
        ]
    },
    {
        name: 'Aristócrata',
        hitDie: 'd8',
        bab: 'Medio (+3/4 nivel)',
        goodSaves: ['Fortaleza', 'Voluntad'],
        skillPoints: 4,
        description: 'Nobles, diplomáticos y líderes. Representan a aquellos nacidos en la riqueza y el poder.',
        keyAbility: 'Carisma',
        icon: Crown,
        color: 'text-gold-400',
        features: [
            'Acceso a todas las armas simples y marciales',
            'Competencia con armaduras ligeras, medias y escudos',
            'Amplia selección de habilidades de clase',
            'Sin capacidades especiales de combate o magia'
        ]
    },
    {
        name: 'Experto',
        hitDie: 'd6',
        bab: 'Medio (+3/4 nivel)',
        goodSaves: ['Reflejos', 'Voluntad'],
        skillPoints: 6,
        description: 'Artesanos, comerciantes y profesionales. Representan a la clase trabajadora especializada.',
        keyAbility: 'Variable',
        icon: Briefcase,
        color: 'text-blue-400',
        features: [
            'Elige 10 habilidades de clase (cualquier habilidad)',
            'Más puntos de habilidad que otras clases de PNJ',
            'Solo armas simples',
            'Armadura ligera'
        ]
    },
    {
        name: 'Guerrero',
        hitDie: 'd8',
        bab: 'Bueno (+1 nivel)',
        goodSaves: ['Fortaleza'],
        skillPoints: 2,
        description: 'Soldados, guardias y mercenarios comunes. La tropa básica de cualquier ejército.',
        keyAbility: 'Fuerza o Destreza',
        icon: Swords,
        color: 'text-red-400',
        features: [
            'Competencia con todas las armas simples y marciales',
            'Competencia con todas las armaduras y escudos',
            'BAB completo (como Fighter)',
            'Sin dotes de bonificación'
        ]
    },
    {
        name: 'Plebeyo',
        hitDie: 'd4',
        bab: 'Bajo (+1/2 nivel)',
        goodSaves: ['Ninguna'],
        skillPoints: 2,
        description: 'Granjeros, sirvientes y gente común. La mayoría de la población del mundo.',
        keyAbility: 'Variable',
        icon: Users,
        color: 'text-stone-400',
        features: [
            'Solo competencia con una arma simple',
            'Sin competencia con armaduras',
            'PG muy bajos',
            'Salvaciones pobres en todo'
        ]
    }
];

export default function ClasesPNJPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
                <Link href="/reglas">
                    <Button variant="ghost" size="sm" className="mb-4 text-gray-400 hover:text-gray-200">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a Reglas
                    </Button>
                </Link>
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-stone-500/20 border border-stone-500/30">
                        <Users className="h-8 w-8 text-stone-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Clases de PNJ</h1>
                        <p className="text-gray-400">Clases para personajes no jugadores</p>
                    </div>
                </div>
            </div>

            {/* Introduction */}
            <Card className="mb-8 bg-gray-900/50 border-gray-700">
                <CardContent className="p-6">
                    <div className="flex gap-3">
                        <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-gray-300 space-y-2">
                            <p>
                                Las <strong className="text-gray-100">clases de PNJ</strong> representan a la gente
                                común del mundo. Son más débiles que las clases de personaje jugador y están diseñadas
                                para poblar el mundo con personajes realistas pero no heroicos.
                            </p>
                            <p>
                                Los jugadores normalmente no pueden elegir estas clases, aunque algunas campañas
                                especiales podrían permitirlo.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Class Cards */}
            <div className="space-y-6">
                {NPC_CLASSES.map((cls) => (
                    <Card key={cls.name} className="bg-gray-900/50 border-gray-700">
                        <CardHeader className="pb-2">
                            <CardTitle className={`flex items-center gap-3 text-xl ${cls.color}`}>
                                <cls.icon className="h-6 w-6" />
                                {cls.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-300">{cls.description}</p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-gray-800/50 p-3 rounded-lg">
                                    <div className="text-xs text-gray-400 uppercase">Dado de Golpe</div>
                                    <div className="text-lg font-bold text-gray-100">{cls.hitDie}</div>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded-lg">
                                    <div className="text-xs text-gray-400 uppercase">BAB</div>
                                    <div className="text-sm font-medium text-gray-200">{cls.bab}</div>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded-lg">
                                    <div className="text-xs text-gray-400 uppercase">Salv. Buenas</div>
                                    <div className="text-sm font-medium text-gray-200">
                                        {cls.goodSaves.length > 0 ? cls.goodSaves.join(', ') : 'Ninguna'}
                                    </div>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded-lg">
                                    <div className="text-xs text-gray-400 uppercase">Puntos Hab.</div>
                                    <div className="text-sm font-medium text-gray-200">{cls.skillPoints} + Int</div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="pt-3 border-t border-gray-700">
                                <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Características</h4>
                                <ul className="text-sm text-gray-200 space-y-1">
                                    {cls.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className={`mt-1 ${cls.color}`}>•</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="text-xs text-gray-500">
                                Característica principal: <span className="text-gray-300">{cls.keyAbility}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Usage Note */}
            <Card className="mt-8 bg-blue-900/20 border-blue-500/30">
                <CardContent className="p-6">
                    <div className="flex gap-3">
                        <BookOpen className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-gray-300 space-y-2">
                            <p className="font-semibold text-blue-400">Uso para Dungeon Masters</p>
                            <p className="text-sm">
                                Estas clases son ideales para crear rápidamente PNJs como guardias de ciudad (Guerrero 2),
                                comerciantes (Experto 3), nobles (Aristócrata 4) o aldeanos (Plebeyo 1).
                                Recuerda que la mayoría de la población son Plebeyos de nivel 1-3.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
