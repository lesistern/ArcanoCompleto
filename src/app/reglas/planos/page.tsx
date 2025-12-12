import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Globe, Info, Flame, Droplet, Wind, Mountain, Sun, Moon, Sparkles, Skull, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Planos de Existencia - Reglas D&D 3.5 | Compendio Arcano',
    description: 'Los planos de existencia en D&D 3.5: Plano Material, Interior, Exterior, Transicionales y sus características.',
};

interface Plane {
    name: string;
    category: string;
    traits: string[];
    description: string;
    inhabitants: string[];
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

const PLANE_CATEGORIES = [
    {
        name: 'Plano Material',
        description: 'El plano donde existe la mayoría de las campañas. Es el "mundo real" de D&D.',
        color: 'text-green-400'
    },
    {
        name: 'Planos Transicionales',
        description: 'Planos que conectan otros planos entre sí: Plano Astral, Plano Etéreo y Plano de las Sombras.',
        color: 'text-purple-400'
    },
    {
        name: 'Planos Interiores',
        description: 'Los planos elementales que forman los bloques básicos de la realidad.',
        color: 'text-cyan-400'
    },
    {
        name: 'Planos Exteriores',
        description: 'Los planos de alineamiento donde moran los dioses, demonios, diablos y ángeles.',
        color: 'text-amber-400'
    }
];

const INNER_PLANES: Plane[] = [
    {
        name: 'Plano del Fuego',
        category: 'Interior',
        traits: ['Morfología Fuego-dominante', 'Daño de fuego constante sin protección', 'Gravedad normal'],
        description: 'Un infinito mar de llamas donde todo arde eternamente. El aire mismo es fuego.',
        inhabitants: ['Elementales de Fuego', 'Efreets', 'Salamandras', 'Azers'],
        icon: Flame,
        color: 'text-red-500'
    },
    {
        name: 'Plano del Agua',
        category: 'Interior',
        traits: ['Morfología Agua-dominante', 'Sin aire natural', 'Gravedad subjetiva'],
        description: 'Un océano infinito sin superficie ni fondo. La presión es constante en todas partes.',
        inhabitants: ['Elementales de Agua', 'Marids', 'Tritons', 'Nereidas'],
        icon: Droplet,
        color: 'text-blue-500'
    },
    {
        name: 'Plano del Aire',
        category: 'Interior',
        traits: ['Morfología Aire-dominante', 'Sin gravedad direccional', 'Viento constante'],
        description: 'Un vacío infinito de cielo azul con nubes flotantes y vientos eternos.',
        inhabitants: ['Elementales de Aire', 'Djinns', 'Invisible Stalkers', 'Arrowhawks'],
        icon: Wind,
        color: 'text-sky-400'
    },
    {
        name: 'Plano de la Tierra',
        category: 'Interior',
        traits: ['Morfología Tierra-dominante', 'Sin espacios vacíos naturales', 'Gravedad normal'],
        description: 'Roca sólida infinita con ocasionales cavernas y vetas de minerales preciosos.',
        inhabitants: ['Elementales de Tierra', 'Dao', 'Xorn', 'Thoqqua'],
        icon: Mountain,
        color: 'text-amber-600'
    }
];

const TRANSITIVE_PLANES: Plane[] = [
    {
        name: 'Plano Astral',
        category: 'Transicional',
        traits: ['Sin gravedad', 'Tiempo alterado', 'Altamente mágico', 'Conecta todos los Planos Exteriores'],
        description: 'Un vacío plateado que conecta el Plano Material con los Planos Exteriores. El pensamiento es movimiento.',
        inhabitants: ['Githyanki', 'Astral Dreadnought', 'Viajeros planares'],
        icon: Sparkles,
        color: 'text-slate-300'
    },
    {
        name: 'Plano Etéreo',
        category: 'Transicional',
        traits: ['Sin gravedad', 'Morfología de niebla', 'Conecta con Plano Material y Planos Interiores'],
        description: 'Una niebla gris donde el Plano Material aparece como siluetas borrosas. Los fantasmas habitan aquí.',
        inhabitants: ['Fantasmas', 'Criaturas Etéreas', 'Pesadillas', 'Xill'],
        icon: Globe,
        color: 'text-gray-400'
    },
    {
        name: 'Plano de las Sombras',
        category: 'Transicional',
        traits: ['Gravedad normal', 'Visión reducida', 'Magia de sombras potenciada', 'Reflejo oscuro del Material'],
        description: 'Una versión sombría y retorcida del Plano Material. Todo está descolorido y distorsionado.',
        inhabitants: ['Sombras', 'Nightshades', 'Shadar-kai', 'Dark Ones'],
        icon: Moon,
        color: 'text-indigo-400'
    }
];

const OUTER_PLANES: Plane[] = [
    {
        name: 'Monte Celestia',
        category: 'Exterior (LG)',
        traits: ['Legal Bueno', 'Siete capas de montañas', 'Magia de bien potenciada'],
        description: 'Montañas doradas que ascienden hacia la perfección. Hogar de archones y celestiales.',
        inhabitants: ['Archones', 'Ángeles', 'Almas justas'],
        icon: Sun,
        color: 'text-gold-400'
    },
    {
        name: 'Eliseo',
        category: 'Exterior (NG)',
        traits: ['Neutral Bueno', 'Cuatro capas de naturaleza idílica', 'Efecto calmante'],
        description: 'Praderas perfectas y bosques serenos. El plano de la bondad pura.',
        inhabitants: ['Guardinals', 'Titanes', 'Almas bondadosas'],
        icon: Sun,
        color: 'text-yellow-400'
    },
    {
        name: 'Arborea',
        category: 'Exterior (CG)',
        traits: ['Caótico Bueno', 'Tres capas de emociones intensas', 'Pasión amplificada'],
        description: 'Montañas épicas, bosques exuberantes. Hogar de los dioses griegos.',
        inhabitants: ['Eladrins', 'Titanes', 'Almas apasionadas'],
        icon: Sun,
        color: 'text-orange-400'
    },
    {
        name: 'Mechanus',
        category: 'Exterior (LN)',
        traits: ['Legal Neutral', 'Engranajes infinitos', 'Ley absoluta'],
        description: 'Un infinito mecanismo de engranajes gigantes. La ley perfecta sin moralidad.',
        inhabitants: ['Modrons', 'Inevitables', 'Formians'],
        icon: Shield,
        color: 'text-slate-400'
    },
    {
        name: 'Limbo',
        category: 'Exterior (CN)',
        traits: ['Caótico Neutral', 'Caos elemental puro', 'Morfología controlada por voluntad'],
        description: 'Sopa de caos primordial donde la materia cambia constantemente.',
        inhabitants: ['Slaadi', 'Githzerai', 'Caos encarnado'],
        icon: Wind,
        color: 'text-purple-400'
    },
    {
        name: 'Los Nueve Infiernos',
        category: 'Exterior (LE)',
        traits: ['Legal Malvado', 'Nueve capas de tormento', 'Contratos vinculantes'],
        description: 'Capas de tortura organizada gobernadas por Asmodeus. Hogar de los diablos.',
        inhabitants: ['Diablos', 'Condenados', 'Legiones infernales'],
        icon: Skull,
        color: 'text-red-600'
    },
    {
        name: 'El Abismo',
        category: 'Exterior (CE)',
        traits: ['Caótico Malvado', 'Capas infinitas', 'Corrupción pura'],
        description: 'Infinitas capas de horror y maldad. Cada capa es peor que la anterior.',
        inhabitants: ['Demonios', 'Almas corruptas', 'Señores demoniacos'],
        icon: Skull,
        color: 'text-purple-600'
    },
    {
        name: 'Hades',
        category: 'Exterior (NE)',
        traits: ['Neutral Malvado', 'Tres capas grises', 'Desesperanza absoluta'],
        description: 'Llanuras grises de desesperación donde las almas olvidan quiénes eran.',
        inhabitants: ['Daemons (Yugoloths)', 'Almas perdidas', 'Night Hags'],
        icon: Skull,
        color: 'text-gray-600'
    }
];

export default function PlanosPage() {
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
                    <div className="p-3 rounded-lg bg-sky-500/20 border border-sky-500/30">
                        <Globe className="h-8 w-8 text-sky-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Planos de Existencia</h1>
                        <p className="text-gray-400">Los múltiples mundos de la cosmología de D&D</p>
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
                                El <strong className="text-gray-100">multiverso de D&D</strong> está compuesto por
                                múltiples planos de existencia. Cada plano tiene sus propias reglas físicas, habitantes
                                y conexiones con otros planos.
                            </p>
                            <p>
                                Los conjuros como <em>Desplazamiento entre planos</em>, <em>Puerta</em> y <em>Viaje astral</em> permiten
                                a los aventureros explorar estos reinos.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Categories Overview */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4">Categorías de Planos</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {PLANE_CATEGORIES.map((cat) => (
                        <Card key={cat.name} className="bg-gray-900/50 border-gray-700">
                            <CardContent className="p-4">
                                <h3 className={`font-semibold mb-1 ${cat.color}`}>{cat.name}</h3>
                                <p className="text-sm text-gray-300">{cat.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Transitive Planes */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-purple-400" />
                    Planos Transicionales
                </h2>
                <div className="space-y-4">
                    {TRANSITIVE_PLANES.map((plane) => (
                        <Card key={plane.name} className="bg-gray-900/50 border-gray-700">
                            <CardHeader className="pb-2">
                                <CardTitle className={`flex items-center gap-2 text-lg ${plane.color}`}>
                                    <plane.icon className="h-5 w-5" />
                                    {plane.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-gray-300">{plane.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {plane.traits.map((trait) => (
                                        <span key={trait} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-xs text-gray-400">
                                    <strong>Habitantes:</strong> {plane.inhabitants.join(', ')}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Inner Planes */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                    <Flame className="h-6 w-6 text-cyan-400" />
                    Planos Interiores (Elementales)
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {INNER_PLANES.map((plane) => (
                        <Card key={plane.name} className="bg-gray-900/50 border-gray-700">
                            <CardHeader className="pb-2">
                                <CardTitle className={`flex items-center gap-2 text-lg ${plane.color}`}>
                                    <plane.icon className="h-5 w-5" />
                                    {plane.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-gray-300">{plane.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {plane.traits.map((trait) => (
                                        <span key={trait} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-xs text-gray-400">
                                    <strong>Habitantes:</strong> {plane.inhabitants.join(', ')}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Outer Planes */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                    <Sun className="h-6 w-6 text-amber-400" />
                    Planos Exteriores (Alineamiento)
                </h2>
                <p className="text-gray-300 mb-4">
                    Los Planos Exteriores están organizados según la Gran Rueda, con cada plano representando una
                    combinación de ley/caos y bien/mal.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {OUTER_PLANES.map((plane) => (
                        <Card key={plane.name} className="bg-gray-900/50 border-gray-700">
                            <CardHeader className="pb-2">
                                <CardTitle className={`flex items-center gap-2 text-base ${plane.color}`}>
                                    <plane.icon className="h-5 w-5" />
                                    {plane.name}
                                </CardTitle>
                                <span className="text-xs text-gray-500">{plane.category}</span>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-xs text-gray-300">{plane.description}</p>
                                <div className="text-xs text-gray-400">
                                    <strong>Habitantes:</strong> {plane.inhabitants.join(', ')}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Travel Note */}
            <Card className="bg-blue-900/20 border-blue-500/30">
                <CardContent className="p-6">
                    <div className="flex gap-3">
                        <Globe className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-gray-300 space-y-2">
                            <p className="font-semibold text-blue-400">Viaje entre Planos</p>
                            <p className="text-sm">
                                Los métodos más comunes de viajar entre planos incluyen conjuros como
                                <strong className="text-gray-200"> Desplazamiento entre planos</strong> (5º nivel),
                                <strong className="text-gray-200"> Puerta</strong> (9º nivel) y
                                <strong className="text-gray-200"> Viaje astral</strong> (9º nivel).
                                También existen portales naturales, objetos mágicos y rituales específicos.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
