import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Skull, Info, Bug, Ghost, Flame, Leaf, Brain, Shield, Zap, Users, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Tipos de Criaturas - Reglas D&D 3.5 | Compendio Arcano',
    description: 'Tipos y subtipos de criaturas en D&D 3.5: aberraciones, dragones, no-muertos, elementales y más.',
};

interface CreatureType {
    name: string;
    hitDie: string;
    bab: string;
    goodSaves: string[];
    skillPoints: string;
    traits: string[];
    examples: string[];
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

const CREATURE_TYPES: CreatureType[] = [
    {
        name: 'Aberración',
        hitDie: 'd8',
        bab: 'Medio (+3/4 DG)',
        goodSaves: ['Voluntad'],
        skillPoints: '2 + Int',
        traits: [
            'Visión en la oscuridad 60 pies',
            'Competencia con armas naturales y simples',
            'Sin competencia con armaduras'
        ],
        examples: ['Contemplador', 'Aboleth', 'Mente Desolladora'],
        icon: Brain,
        color: 'text-purple-400'
    },
    {
        name: 'Animal',
        hitDie: 'd8',
        bab: 'Medio (+3/4 DG)',
        goodSaves: ['Fortaleza', 'Reflejos'],
        skillPoints: '2 + Int (mín 1)',
        traits: [
            'Inteligencia 1 o 2',
            'Visión en penumbra',
            'No tienen competencia con armaduras',
            'Solo armas naturales'
        ],
        examples: ['Lobo', 'Oso', 'Águila', 'Serpiente'],
        icon: Bug,
        color: 'text-green-400'
    },
    {
        name: 'Constructo',
        hitDie: 'd10',
        bab: 'Medio (+3/4 DG)',
        goodSaves: ['Ninguna'],
        skillPoints: 'Ninguno',
        traits: [
            'Sin puntuación de Constitución',
            'Visión en la oscuridad 60 pies + visión en penumbra',
            'Inmune a efectos mentales, veneno, sueño, parálisis, aturdimiento, enfermedad, muerte, nigromancia',
            'No puede sanar daño (reparar)',
            'Inmune a críticos y daño de precisión'
        ],
        examples: ['Gólem de Piedra', 'Gólem de Hierro', 'Escudo Animado'],
        icon: Shield,
        color: 'text-gray-400'
    },
    {
        name: 'Dragón',
        hitDie: 'd12',
        bab: 'Bueno (+1 DG)',
        goodSaves: ['Fortaleza', 'Reflejos', 'Voluntad'],
        skillPoints: '6 + Int',
        traits: [
            'Visión en la oscuridad 60 pies + visión en penumbra',
            'Inmune a sueño y parálisis mágicos',
            'Competencia con todas las armas simples y marciales',
            'Come, duerme, respira'
        ],
        examples: ['Dragón Rojo', 'Dragón Dorado', 'Dragón Negro'],
        icon: Flame,
        color: 'text-red-400'
    },
    {
        name: 'Elemental',
        hitDie: 'd8',
        bab: 'Medio (+3/4 DG)',
        goodSaves: ['Variable'],
        skillPoints: '2 + Int',
        traits: [
            'Visión en la oscuridad 60 pies',
            'Sin puntuación de Constitución para propósitos de efectos de Fortaleza',
            'Inmune a veneno, sueño, parálisis, aturdimiento',
            'No sujeto a críticos o flanqueo'
        ],
        examples: ['Elemental de Fuego', 'Elemental de Agua', 'Elemental de Tierra'],
        icon: Zap,
        color: 'text-cyan-400'
    },
    {
        name: 'Hada',
        hitDie: 'd6',
        bab: 'Bajo (+1/2 DG)',
        goodSaves: ['Reflejos', 'Voluntad'],
        skillPoints: '6 + Int',
        traits: [
            'Visión en penumbra',
            'Competencia con armas simples y marciales',
            'Competencia con armaduras ligeras'
        ],
        examples: ['Pixie', 'Driada', 'Ninfa', 'Sátiro'],
        icon: Leaf,
        color: 'text-emerald-400'
    },
    {
        name: 'Gigante',
        hitDie: 'd8',
        bab: 'Medio (+3/4 DG)',
        goodSaves: ['Fortaleza'],
        skillPoints: '2 + Int',
        traits: [
            'Visión en penumbra',
            'Competencia con armas simples y marciales',
            'Competencia con armaduras que lleven'
        ],
        examples: ['Ogro', 'Trol', 'Gigante de las Colinas', 'Gigante de Fuego'],
        icon: Users,
        color: 'text-amber-400'
    },
    {
        name: 'Humanoide',
        hitDie: 'd8',
        bab: 'Medio (+3/4 DG)',
        goodSaves: ['Variable (1)'],
        skillPoints: '2 + Int',
        traits: [
            'Competencia con armas simples',
            'Competencia según cultura (armaduras, marciales)',
            'Come, duerme, respira'
        ],
        examples: ['Orco', 'Goblin', 'Gnoll', 'Kobold'],
        icon: Users,
        color: 'text-stone-400'
    },
    {
        name: 'Humanoide Monstruoso',
        hitDie: 'd8',
        bab: 'Bueno (+1 DG)',
        goodSaves: ['Reflejos', 'Voluntad'],
        skillPoints: '2 + Int',
        traits: [
            'Visión en la oscuridad 60 pies',
            'Competencia con armas simples y naturales',
            'Competencia con armaduras ligeras y medias'
        ],
        examples: ['Medusa', 'Minotauro', 'Arpía', 'Yuan-ti'],
        icon: Skull,
        color: 'text-indigo-400'
    },
    {
        name: 'Cieno',
        hitDie: 'd10',
        bab: 'Medio (+3/4 DG)',
        goodSaves: ['Ninguna'],
        skillPoints: 'Ninguno',
        traits: [
            'Sin Inteligencia, ciego',
            'Inmune a veneno, sueño, parálisis, polimorfar, aturdimiento',
            'Inmune a críticos, flanqueo, ataques de precisión',
            'Come y respira, no duerme'
        ],
        examples: ['Cubo Gelatinoso', 'Cieno Gris', 'Pudín Negro'],
        icon: Bug,
        color: 'text-lime-400'
    },
    {
        name: 'Planta',
        hitDie: 'd8',
        bab: 'Medio (+3/4 DG)',
        goodSaves: ['Fortaleza'],
        skillPoints: 'Ninguno',
        traits: [
            'Visión en penumbra',
            'Inmune a efectos mentales, veneno, sueño, parálisis, polimorfar, aturdimiento',
            'No sujeto a críticos'
        ],
        examples: ['Treant', 'Mandragora', 'Esporas Amarillas'],
        icon: Leaf,
        color: 'text-green-500'
    },
    {
        name: 'No-Muerto',
        hitDie: 'd12',
        bab: 'Bajo (+1/2 DG)',
        goodSaves: ['Voluntad'],
        skillPoints: '4 + Int',
        traits: [
            'Sin puntuación de Constitución',
            'Visión en la oscuridad 60 pies',
            'Inmune a efectos mentales, veneno, sueño, parálisis, aturdimiento, enfermedad, muerte',
            'Inmune a críticos, daño no letal, fatiga, agotamiento, drenaje de energía',
            'No puede sanar daño (solo energía negativa)'
        ],
        examples: ['Zombi', 'Esqueleto', 'Vampiro', 'Liche'],
        icon: Ghost,
        color: 'text-slate-300'
    },
    {
        name: 'Espíritu',
        hitDie: 'd8',
        bab: 'Bajo (+1/2 DG)',
        goodSaves: ['Reflejos', 'Voluntad'],
        skillPoints: '6 + Int',
        traits: [
            'Visión en penumbra',
            'Puede ser expulsado o controlado como no-muerto (algunos)',
            'Come, duerme, respira (a menos que sea incorpóreo)'
        ],
        examples: ['Sombra', 'Fantasma', 'Espectro'],
        icon: Ghost,
        color: 'text-blue-300'
    },
    {
        name: 'Bestia Mágica',
        hitDie: 'd10',
        bab: 'Bueno (+1 DG)',
        goodSaves: ['Fortaleza', 'Reflejos'],
        skillPoints: '2 + Int',
        traits: [
            'Visión en la oscuridad 60 pies + visión en penumbra',
            'Competencia con armas naturales',
            'No tiene competencia con armaduras'
        ],
        examples: ['Grifón', 'Pegaso', 'Displacer Beast', 'Quimera'],
        icon: Heart,
        color: 'text-pink-400'
    },
    {
        name: 'Exterior',
        hitDie: 'd8',
        bab: 'Bueno (+1 DG)',
        goodSaves: ['Fortaleza', 'Reflejos', 'Voluntad'],
        skillPoints: '8 + Int',
        traits: [
            'Visión en la oscuridad 60 pies',
            'No puede ser devuelto a la vida excepto con deseo o milagro',
            'Competencia con todas las armas simples y marciales',
            'A diferencia de otras criaturas, los exteriores no mueren realmente al llegar a -10 pg'
        ],
        examples: ['Demonio', 'Diablo', 'Ángel', 'Genio'],
        icon: Flame,
        color: 'text-orange-400'
    }
];

const SUBTYPES = [
    { name: 'Acuático', description: 'Puede respirar bajo el agua. Muchos tienen velocidad de nado.' },
    { name: 'Aire', description: 'Criatura compuesta de aire elemental o con afinidad al aire.' },
    { name: 'Caótico', description: 'Aura caótica. Las armas son tratadas como caóticas.' },
    { name: 'Frío', description: 'Inmune al frío. Vulnerable al fuego (×1.5 daño).' },
    { name: 'Fuego', description: 'Inmune al fuego. Vulnerable al frío (×1.5 daño).' },
    { name: 'Bien', description: 'Aura de bien. Las armas son tratadas como buenas.' },
    { name: 'Incorpóreo', description: '50% de fallo contra ataques corpóreos. Puede atravesar objetos sólidos.' },
    { name: 'Maligno', description: 'Aura de mal. Las armas son tratadas como malignas.' },
    { name: 'Nativo', description: 'Exterior que nació en el plano material. Puede ser resucitado.' },
    { name: 'Reptil', description: 'Criatura de sangre fría con escamas. Incluye serpientes y lagartos.' },
    { name: 'Cambiaformas', description: 'Puede asumir formas alternativas de manera sobrenatural.' },
    { name: 'Enjambre', description: 'Colección de criaturas finas o diminutas. Inmune a ataques dirigidos.' },
    { name: 'Tierra', description: 'Criatura compuesta de tierra elemental o con afinidad a la tierra.' },
    { name: 'Agua', description: 'Criatura compuesta de agua elemental o con afinidad al agua.' },
];

export default function TiposCriaturasPage() {
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
                    <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                        <Skull className="h-8 w-8 text-purple-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-dungeon-100">Tipos de Criaturas</h1>
                        <p className="text-dungeon-400">Clasificación de monstruos y seres del juego</p>
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
                                El <strong className="text-dungeon-100">tipo de criatura</strong> determina muchas de sus
                                características básicas: dado de golpe, base de ataque, salvaciones buenas, puntos de
                                habilidad e inmunidades especiales.
                            </p>
                            <p>
                                Cada criatura tiene exactamente un tipo, pero puede tener múltiples subtipos que
                                modifican o añaden características.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Creature Types */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4">Tipos de Criaturas ({CREATURE_TYPES.length})</h2>
                <div className="space-y-4">
                    {CREATURE_TYPES.map((type) => (
                        <Card key={type.name} className="bg-dungeon-900/50 border-dungeon-700">
                            <CardHeader className="pb-2">
                                <CardTitle className={`flex items-center gap-3 text-xl ${type.color}`}>
                                    <type.icon className="h-6 w-6" />
                                    {type.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div className="bg-dungeon-800/50 p-3 rounded-lg">
                                        <div className="text-xs text-dungeon-400 uppercase">Dado de Golpe</div>
                                        <div className="text-lg font-bold text-dungeon-100">{type.hitDie}</div>
                                    </div>
                                    <div className="bg-dungeon-800/50 p-3 rounded-lg">
                                        <div className="text-xs text-dungeon-400 uppercase">BAB</div>
                                        <div className="text-sm font-medium text-dungeon-200">{type.bab}</div>
                                    </div>
                                    <div className="bg-dungeon-800/50 p-3 rounded-lg">
                                        <div className="text-xs text-dungeon-400 uppercase">Salv. Buenas</div>
                                        <div className="text-sm font-medium text-dungeon-200">
                                            {type.goodSaves.join(', ')}
                                        </div>
                                    </div>
                                    <div className="bg-dungeon-800/50 p-3 rounded-lg">
                                        <div className="text-xs text-dungeon-400 uppercase">Puntos Hab.</div>
                                        <div className="text-sm font-medium text-dungeon-200">{type.skillPoints}</div>
                                    </div>
                                </div>

                                {/* Traits */}
                                <div>
                                    <h4 className="text-sm font-semibold text-dungeon-400 uppercase mb-2">Rasgos</h4>
                                    <ul className="text-sm text-dungeon-200 space-y-1">
                                        {type.traits.map((trait, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className={`mt-1 ${type.color}`}>•</span>
                                                <span>{trait}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Examples */}
                                <div className="flex flex-wrap gap-1 pt-2 border-t border-dungeon-700">
                                    <span className="text-xs text-dungeon-500 mr-1">Ejemplos:</span>
                                    {type.examples.map((ex) => (
                                        <span key={ex} className="text-xs bg-dungeon-800 text-dungeon-300 px-2 py-1 rounded">
                                            {ex}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Subtypes */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4">Subtipos Comunes</h2>
                <div className="grid md:grid-cols-2 gap-3">
                    {SUBTYPES.map((subtype) => (
                        <Card key={subtype.name} className="bg-dungeon-900/50 border-dungeon-700">
                            <CardContent className="p-4">
                                <h3 className="font-semibold text-purple-400 mb-1">{subtype.name}</h3>
                                <p className="text-sm text-dungeon-300">{subtype.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Link to Bestiary */}
            <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-500/30">
                <CardContent className="p-6 text-center">
                    <Skull className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-dungeon-100 mb-2">Explorar Bestiario</h3>
                    <p className="text-dungeon-300 mb-4">
                        Navega por nuestra base de datos de más de 275 criaturas.
                    </p>
                    <Link href="/monstruos">
                        <Button className="bg-purple-600 hover:bg-purple-500">
                            Ver Bestiario
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
