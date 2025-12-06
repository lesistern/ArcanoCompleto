import { Metadata } from 'next';
import Link from 'next/link';
import {
    ArrowLeft, Mountain, Info, CloudRain, Thermometer, Wind, Droplets,
    Sun, Moon, Eye, Footprints, AlertTriangle, Snowflake, Flame,
    TreePine, Waves, Building, Map
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Entorno y Clima - Reglas D&D 3.5 | Compendio Arcano',
    description: 'Reglas de entorno en D&D 3.5: clima, peligros ambientales, terreno, iluminación y movimiento.',
};

interface WeatherType {
    name: string;
    description: string;
    effects: string[];
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

interface EnvironmentalHazard {
    name: string;
    description: string;
    damage: string;
    save: string;
    notes: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

interface TerrainType {
    name: string;
    movementCost: string;
    examples: string[];
    specialRules: string[];
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

interface LightingCondition {
    name: string;
    visibility: string;
    combatPenalty: string;
    description: string;
}

const WEATHER_TYPES: WeatherType[] = [
    {
        name: 'Lluvia',
        description: 'Precipitación moderada que reduce visibilidad y afecta el combate.',
        effects: [
            '-4 a pruebas de Avistar y Escuchar',
            '-4 a ataques a distancia',
            'Apaga llamas pequeñas automáticamente',
            'Rastros más difíciles de seguir (+5 CD)'
        ],
        icon: CloudRain,
        color: 'text-blue-400'
    },
    {
        name: 'Tormenta',
        description: 'Lluvia intensa con vientos fuertes y posibles rayos.',
        effects: [
            '-8 a pruebas de Avistar y Escuchar',
            '-4 a ataques a distancia',
            'Rayos pueden impactar (1d10 daño eléctrico)',
            'Criaturas Pequeñas pueden ser derribadas',
            'Concentración CD 15 para conjuros'
        ],
        icon: Wind,
        color: 'text-purple-500'
    },
    {
        name: 'Niebla',
        description: 'Condensación que reduce drásticamente la visibilidad.',
        effects: [
            'Ocultación a 1.5m o más',
            'Ocultación total a 3m o más',
            'Criaturas a 1.5m tienen ocultación parcial (20%)',
            'Rastrear es casi imposible'
        ],
        icon: Droplets,
        color: 'text-gray-400'
    },
    {
        name: 'Nevada',
        description: 'Nieve cayendo que reduce visibilidad y cubre el terreno.',
        effects: [
            '-4 a pruebas de Avistar y Escuchar',
            '-4 a ataques a distancia',
            'Terreno cubierto se vuelve difícil',
            'Rastros muy fáciles de seguir (-10 CD)',
            'Hipotermia si no hay protección'
        ],
        icon: Snowflake,
        color: 'text-cyan-300'
    },
    {
        name: 'Ventisca',
        description: 'Nevada extrema con vientos huracanados.',
        effects: [
            'Visibilidad reducida a 0 a más de 1.5m',
            'Imposible realizar ataques a distancia',
            'Criaturas Medianas pueden ser derribadas',
            'Daño por frío cada hora sin protección',
            'Perderse es casi seguro sin guía'
        ],
        icon: Wind,
        color: 'text-blue-200'
    },
    {
        name: 'Calor Extremo',
        description: 'Temperaturas sofocantes que agotan a los viajeros.',
        effects: [
            'Salvación de Fortaleza CD 15 cada hora',
            'Fallo causa 1d4 daño no letal',
            'Armadura pesada añade +4 a la CD',
            'Sin agua, CD aumenta +1 por hora',
            'Puede causar agotamiento por calor'
        ],
        icon: Sun,
        color: 'text-orange-400'
    }
];

const ENVIRONMENTAL_HAZARDS: EnvironmentalHazard[] = [
    {
        name: 'Frío Extremo',
        description: 'Temperaturas bajo cero que congelan a los desprotegidos.',
        damage: '1d6 daño no letal por hora',
        save: 'Fortaleza CD 15 (+ 1 por hora previa)',
        notes: 'Ropa de invierno da +5. Hipotermia si alcanzas 0 PG no letales.',
        icon: Snowflake,
        color: 'text-cyan-400'
    },
    {
        name: 'Calor Extremo',
        description: 'Temperaturas sofocantes que deshidratan.',
        damage: '1d4 daño no letal por hora',
        save: 'Fortaleza CD 15 (+ 1 por hora previa)',
        notes: 'Armadura pesada +4 CD. Necesitas doble ración de agua.',
        icon: Flame,
        color: 'text-red-400'
    },
    {
        name: 'Ahogamiento',
        description: 'Sin aire, una criatura comienza a ahogarse.',
        damage: '0 PG y moribundo tras Constitución asaltos',
        save: 'Ninguna (automático)',
        notes: 'Puedes aguantar respiración: Con rounds × 2. Actividad intensa reduce a la mitad.',
        icon: Droplets,
        color: 'text-blue-500'
    },
    {
        name: 'Caída',
        description: 'Daño por impacto al caer desde altura.',
        damage: '1d6 por cada 3m (máx 20d6)',
        save: 'Ninguna (pero Acrobacias CD 15 reduce 1d6)',
        notes: 'Caída en agua reduce daño. Caída sobre pinchos añade daño.',
        icon: AlertTriangle,
        color: 'text-yellow-400'
    },
    {
        name: 'Humo',
        description: 'Inhalar humo causa asfixia progresiva.',
        damage: '1d6 daño no letal por asalto',
        save: 'Fortaleza CD 15 (+ 1 por asalto previo)',
        notes: 'Pañuelo mojado da +2. Inmersión total en humo: daño letal.',
        icon: Wind,
        color: 'text-gray-500'
    },
    {
        name: 'Lava',
        description: 'Roca fundida que incinera instantáneamente.',
        damage: '2d6 por asalto (contacto), 20d6 (inmersión)',
        save: 'Ninguna',
        notes: 'Daño continúa 1d3 asaltos después de salir. Derrite equipo.',
        icon: Flame,
        color: 'text-orange-600'
    },
    {
        name: 'Ácido',
        description: 'Sustancias corrosivas que disuelven materia.',
        damage: '1d6 a 10d6 según concentración',
        save: 'Reflejos CD variable para mitad',
        notes: 'Puede destruir equipo. El daño puede continuar 1 asalto más.',
        icon: Droplets,
        color: 'text-green-500'
    }
];

const TERRAIN_TYPES: TerrainType[] = [
    {
        name: 'Bosque',
        movementCost: '×2 (denso) o normal (ligero)',
        examples: ['Bosque templado', 'Jungla', 'Bosque de coníferas'],
        specialRules: [
            'Árboles proporcionan cobertura',
            'Maleza densa da ocultación',
            'Trepar árboles: Escalar CD 15-25',
            'Animales salvajes comunes'
        ],
        icon: TreePine,
        color: 'text-green-500'
    },
    {
        name: 'Montaña',
        movementCost: '×2 (colinas) o ×4 (escarpado)',
        examples: ['Colinas', 'Montañas bajas', 'Picos alpinos'],
        specialRules: [
            'Escalar requerido en pendientes >60°',
            'Riesgo de avalancha en nieve',
            'Mal de altura sobre 4500m',
            'Vientos fuertes comunes'
        ],
        icon: Mountain,
        color: 'text-stone-400'
    },
    {
        name: 'Pantano',
        movementCost: '×2 (húmedo) o ×4 (ciénaga profunda)',
        examples: ['Marisma', 'Ciénaga', 'Manglar'],
        specialRules: [
            'Arenas movedizas posibles (CD 10 para notar)',
            'Enfermedades más comunes',
            'Nadar puede ser necesario',
            'Olores fuertes (-2 Avistar basado en olfato)'
        ],
        icon: Waves,
        color: 'text-emerald-600'
    },
    {
        name: 'Desierto',
        movementCost: '×2 (arena) o normal (rocoso)',
        examples: ['Desierto de arena', 'Badlands', 'Salinas'],
        specialRules: [
            'Calor extremo durante el día',
            'Frío extremo durante la noche',
            'Agua escasa (Supervivencia CD 20)',
            'Tormentas de arena posibles'
        ],
        icon: Sun,
        color: 'text-yellow-500'
    },
    {
        name: 'Acuático',
        movementCost: 'Velocidad de nado o ×4 nadando',
        examples: ['Océano', 'Lago', 'Río profundo'],
        specialRules: [
            'Nadar CD 10 (aguas tranquilas) a CD 20 (tormentosas)',
            'Combate bajo agua tiene penalizadores',
            'Conjuros con componente verbal difíciles',
            'Visibilidad limitada bajo agua'
        ],
        icon: Waves,
        color: 'text-blue-500'
    },
    {
        name: 'Urbano',
        movementCost: 'Normal (calles) o ×2 (callejones)',
        examples: ['Ciudad', 'Pueblo', 'Ruinas'],
        specialRules: [
            'Edificios proporcionan cobertura total',
            'Multitudes dificultan movimiento',
            'Tejados permiten rutas alternativas',
            'Guardias y leyes a considerar'
        ],
        icon: Building,
        color: 'text-slate-400'
    },
    {
        name: 'Subterráneo',
        movementCost: 'Normal (túnel) o ×2 (natural)',
        examples: ['Mazmorra', 'Caverna natural', 'Mina'],
        specialRules: [
            'Oscuridad total sin luz',
            'Ecos afectan Escuchar (+2 o -2)',
            'Espacios reducidos posibles',
            'Derrumbes como peligro'
        ],
        icon: Map,
        color: 'text-amber-600'
    }
];

const LIGHTING_CONDITIONS: LightingCondition[] = [
    {
        name: 'Luz Brillante',
        visibility: 'Normal',
        combatPenalty: 'Ninguno',
        description: 'Luz del día, antorchas cercanas, conjuro Luz. Visión normal sin penalizadores.'
    },
    {
        name: 'Luz Tenue',
        visibility: 'Reducida',
        combatPenalty: '-2 a ataques',
        description: 'Amanecer/atardecer, luz de luna, antorcha lejana. Criaturas tienen ocultación parcial.'
    },
    {
        name: 'Oscuridad',
        visibility: 'Ninguna (sin visión en la oscuridad)',
        combatPenalty: '-4 a ataques, 50% fallo',
        description: 'Sin fuente de luz. Todas las criaturas tienen ocultación total.'
    },
    {
        name: 'Oscuridad Mágica',
        visibility: 'Ninguna (incluso con visión en la oscuridad)',
        combatPenalty: '-4 a ataques, 50% fallo',
        description: 'Creada por conjuros como Oscuridad. Anula visión en la oscuridad normal.'
    }
];

const VISIBILITY_RANGES = [
    { condition: 'Aire claro, día', range: 'Hasta el horizonte (~5 km a nivel del suelo)' },
    { condition: 'Aire claro, noche', range: 'Depende de la luz (luna llena: ~60m)' },
    { condition: 'Lluvia ligera', range: '~1 km' },
    { condition: 'Lluvia fuerte', range: '~150m' },
    { condition: 'Niebla', range: '3-15m' },
    { condition: 'Niebla densa', range: '1.5m o menos' },
    { condition: 'Ventisca', range: '1.5m' },
    { condition: 'Bajo agua (clara)', range: '12m' },
    { condition: 'Bajo agua (turbia)', range: '3m' },
];

export default function EntornoPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
                <Link href="/reglas">
                    <Button variant="ghost" size="sm" className="mb-4 text-dungeon-400 hover:text-dungeon-200">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a Reglas
                    </Button>
                </Link>
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                        <Mountain className="h-8 w-8 text-emerald-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-dungeon-100">Entorno y Clima</h1>
                        <p className="text-dungeon-400">Peligros ambientales, terreno y condiciones</p>
                    </div>
                </div>
            </div>

            {/* Introduction */}
            <Card className="mb-8 bg-dungeon-900/50 border-dungeon-700">
                <CardContent className="p-6">
                    <div className="flex gap-3">
                        <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-dungeon-300 space-y-2">
                            <p>
                                El <strong className="text-dungeon-100">entorno</strong> puede ser tan peligroso como
                                cualquier monstruo. Desde tormentas mortales hasta desiertos abrasadores, los aventureros
                                deben estar preparados para enfrentar los elementos.
                            </p>
                            <p>
                                Esta sección cubre clima, peligros ambientales, tipos de terreno e iluminación.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Weather Types */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                    <CloudRain className="h-6 w-6 text-blue-400" />
                    Tipos de Clima
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {WEATHER_TYPES.map((weather) => (
                        <Card key={weather.name} className="bg-dungeon-900/50 border-dungeon-700">
                            <CardHeader className="pb-2">
                                <CardTitle className={`flex items-center gap-2 text-lg ${weather.color}`}>
                                    <weather.icon className="h-5 w-5" />
                                    {weather.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-dungeon-300 mb-3">{weather.description}</p>
                                <ul className="text-xs text-dungeon-200 space-y-1">
                                    {weather.effects.map((effect, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className={`mt-0.5 ${weather.color}`}>•</span>
                                            <span>{effect}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Environmental Hazards */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                    Peligros Ambientales
                </h2>
                <div className="space-y-4">
                    {ENVIRONMENTAL_HAZARDS.map((hazard) => (
                        <Card key={hazard.name} className="bg-dungeon-900/50 border-dungeon-700">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                    <div className={`p-2 rounded-lg bg-dungeon-800 ${hazard.color}`}>
                                        <hazard.icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold text-lg ${hazard.color}`}>{hazard.name}</h3>
                                        <p className="text-sm text-dungeon-300 mb-2">{hazard.description}</p>
                                        <div className="grid sm:grid-cols-3 gap-2 text-xs">
                                            <div className="bg-dungeon-800/50 p-2 rounded">
                                                <span className="text-dungeon-400 block">Daño</span>
                                                <span className="text-red-400 font-medium">{hazard.damage}</span>
                                            </div>
                                            <div className="bg-dungeon-800/50 p-2 rounded">
                                                <span className="text-dungeon-400 block">Salvación</span>
                                                <span className="text-blue-400 font-medium">{hazard.save}</span>
                                            </div>
                                            <div className="bg-dungeon-800/50 p-2 rounded sm:col-span-1">
                                                <span className="text-dungeon-400 block">Notas</span>
                                                <span className="text-dungeon-200">{hazard.notes}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Terrain Types */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                    <Footprints className="h-6 w-6 text-amber-400" />
                    Tipos de Terreno
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {TERRAIN_TYPES.map((terrain) => (
                        <Card key={terrain.name} className="bg-dungeon-900/50 border-dungeon-700">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className={`flex items-center gap-2 text-lg ${terrain.color}`}>
                                        <terrain.icon className="h-5 w-5" />
                                        {terrain.name}
                                    </CardTitle>
                                    <span className="text-xs bg-dungeon-800 text-dungeon-300 px-2 py-1 rounded">
                                        Movimiento: {terrain.movementCost}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex flex-wrap gap-1">
                                    {terrain.examples.map((ex) => (
                                        <span key={ex} className="text-xs bg-dungeon-800/70 text-dungeon-300 px-2 py-0.5 rounded">
                                            {ex}
                                        </span>
                                    ))}
                                </div>
                                <ul className="text-xs text-dungeon-200 space-y-1">
                                    {terrain.specialRules.map((rule, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className={`mt-0.5 ${terrain.color}`}>•</span>
                                            <span>{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Lighting Conditions */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                    <Eye className="h-6 w-6 text-yellow-400" />
                    Condiciones de Iluminación
                </h2>
                <Card className="bg-dungeon-900/50 border-dungeon-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-dungeon-800/50">
                                <tr>
                                    <th className="text-left p-3 text-dungeon-300 font-semibold">Condición</th>
                                    <th className="text-left p-3 text-dungeon-300 font-semibold">Visibilidad</th>
                                    <th className="text-left p-3 text-dungeon-300 font-semibold">Penalizador</th>
                                    <th className="text-left p-3 text-dungeon-300 font-semibold">Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {LIGHTING_CONDITIONS.map((light, idx) => (
                                    <tr key={light.name} className={idx % 2 === 0 ? 'bg-dungeon-800/20' : ''}>
                                        <td className="p-3">
                                            <span className="flex items-center gap-2 text-dungeon-100 font-medium">
                                                {light.name === 'Luz Brillante' && <Sun className="h-4 w-4 text-yellow-400" />}
                                                {light.name === 'Luz Tenue' && <Moon className="h-4 w-4 text-blue-300" />}
                                                {light.name.includes('Oscuridad') && <Moon className="h-4 w-4 text-purple-400" />}
                                                {light.name}
                                            </span>
                                        </td>
                                        <td className="p-3 text-dungeon-300">{light.visibility}</td>
                                        <td className="p-3 text-red-400">{light.combatPenalty}</td>
                                        <td className="p-3 text-dungeon-400 text-xs">{light.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>

            {/* Visibility Ranges */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                    <Eye className="h-6 w-6 text-green-400" />
                    Rangos de Visibilidad
                </h2>
                <Card className="bg-dungeon-900/50 border-dungeon-700">
                    <CardContent className="p-4">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {VISIBILITY_RANGES.map((vis) => (
                                <div key={vis.condition} className="bg-dungeon-800/50 p-3 rounded-lg">
                                    <div className="text-sm text-dungeon-300 mb-1">{vis.condition}</div>
                                    <div className="text-dungeon-100 font-medium">{vis.range}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Survival Tips */}
            <Card className="bg-emerald-900/20 border-emerald-500/30">
                <CardContent className="p-6">
                    <div className="flex gap-3">
                        <Thermometer className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div className="text-dungeon-300 space-y-2">
                            <p className="font-semibold text-emerald-400">Consejos de Supervivencia</p>
                            <ul className="text-sm space-y-1">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500">•</span>
                                    <span><strong>Ropa de invierno</strong> proporciona +5 a salvaciones contra frío.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500">•</span>
                                    <span><strong>Resistencia a elementos</strong> (conjuro) protege contra temperaturas extremas.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500">•</span>
                                    <span><strong>Supervivencia CD 15</strong> permite encontrar refugio y evitar perderse.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-500">•</span>
                                    <span><strong>Crear agua</strong> y <strong>crear comida y agua</strong> son esenciales en desiertos.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* CTA */}
            <div className="mt-8 text-center">
                <p className="text-dungeon-400 mb-4">¿Listo para explorar más reglas de aventura?</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/reglas/trampas">
                        <Button variant="outline" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10">
                            Ver Trampas
                        </Button>
                    </Link>
                    <Link href="/reglas/combate">
                        <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                            Ver Combate
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
