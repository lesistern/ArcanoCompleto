import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Gem, Info, Sparkles, Shield, Swords, CircleDot, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Objetos Mágicos - Reglas D&D 3.5 | Compendio Arcano',
    description: 'Reglas completas para objetos mágicos en D&D 3.5: identificación, uso, ranuras de cuerpo, activación y creación.',
};

const BODY_SLOTS = [
    { slot: 'Cabeza', examples: 'Diademas, yelmos, filacterias, sombreros', limit: '1 objeto' },
    { slot: 'Rostro', examples: 'Lentes, gafas, máscaras', limit: '1 objeto' },
    { slot: 'Garganta', examples: 'Amuletos, broches, medallones, collares, perreras', limit: '1 objeto' },
    { slot: 'Hombros', examples: 'Capas, mantos', limit: '1 objeto' },
    { slot: 'Cuerpo', examples: 'Armaduras, túnicas', limit: '1 objeto' },
    { slot: 'Torso', examples: 'Camisas, chalecos, vestidos', limit: '1 objeto' },
    { slot: 'Brazos', examples: 'Brazaletes, brazales', limit: '1 par' },
    { slot: 'Manos', examples: 'Guantes, manoplas', limit: '1 par' },
    { slot: 'Anillos', examples: 'Anillos', limit: '2 anillos' },
    { slot: 'Cintura', examples: 'Cinturones', limit: '1 objeto' },
    { slot: 'Pies', examples: 'Botas, zapatos, sandalias', limit: '1 par' },
];

const ITEM_CATEGORIES = [
    {
        name: 'Armas Mágicas',
        icon: Swords,
        color: 'text-red-400',
        description: 'Armas con bonificadores de mejora o propiedades especiales.',
        examples: ['Espada +1', 'Arco flamígero', 'Daga vorpal'],
        bonuses: '+1 a +5 mejora, propiedades especiales'
    },
    {
        name: 'Armaduras Mágicas',
        icon: Shield,
        color: 'text-blue-400',
        description: 'Armaduras y escudos con bonificadores o propiedades.',
        examples: ['Cota de mallas +2', 'Escudo de reflejo de conjuros'],
        bonuses: '+1 a +5 mejora, propiedades especiales'
    },
    {
        name: 'Anillos',
        icon: CircleDot,
        color: 'text-purple-400',
        description: 'Objetos que se llevan en los dedos con diversos poderes.',
        examples: ['Anillo de protección', 'Anillo de invisibilidad'],
        bonuses: 'Máximo 2 anillos activos'
    },
    {
        name: 'Varitas',
        icon: Wand2,
        color: 'text-amber-400',
        description: 'Objetos que almacenan conjuros de nivel 4 o menor.',
        examples: ['Varita de bola de fuego', 'Varita de curar heridas ligeras'],
        bonuses: '50 cargas máximo, nivel de lanzador fijo'
    },
    {
        name: 'Objetos Maravillosos',
        icon: Sparkles,
        color: 'text-cyan-400',
        description: 'Categoría general para objetos mágicos variados.',
        examples: ['Botas de velocidad', 'Capa de desplazamiento', 'Bolsa de contención'],
        bonuses: 'Efectos muy variados'
    },
];

export default function ObjetosMagicosPage() {
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
                    <div className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                        <Gem className="h-8 w-8 text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-dungeon-100">Objetos Mágicos</h1>
                        <p className="text-dungeon-400">Reglas para usar, identificar y crear objetos mágicos</p>
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
                                Los <strong className="text-dungeon-100">objetos mágicos</strong> son tesoros que
                                proporcionan bonificadores, habilidades especiales o efectos únicos. Pueden ser
                                armas, armaduras, anillos, varitas, pergaminos, pociones u objetos maravillosos.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Identification */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-gold-400" />
                    Identificación de Objetos
                </h2>
                <Card className="bg-dungeon-900/50 border-dungeon-700">
                    <CardContent className="p-6 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gold-400">Detectar magia</h3>
                                <p className="text-sm text-dungeon-300">
                                    Revela la presencia de auras mágicas. Tras 3 asaltos de concentración,
                                    revela la escuela de magia y la intensidad del aura.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gold-400">Identificar</h3>
                                <p className="text-sm text-dungeon-300">
                                    Conjuro de nivel 1 que revela todas las propiedades mágicas de un objeto.
                                    Cuesta 100 po en componentes materiales (perla).
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gold-400">Conocimiento Arcano</h3>
                                <p className="text-sm text-dungeon-300">
                                    Prueba de Conocimiento (arcano) CD 20 + nivel de lanzador del objeto
                                    puede revelar propiedades básicas.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gold-400">Usar Objeto Mágico</h3>
                                <p className="text-sm text-dungeon-300">
                                    Prueba de Usar Objeto Mágico CD 25 para determinar propiedades
                                    mediante experimentación.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Body Slots */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4">Ranuras de Cuerpo</h2>
                <p className="text-dungeon-300 mb-4">
                    Un personaje solo puede beneficiarse de un número limitado de objetos mágicos debido
                    a las ranuras del cuerpo. Llevar más objetos del límite en una ranura hace que
                    ninguno funcione.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {BODY_SLOTS.map((slot) => (
                        <Card key={slot.slot} className="bg-dungeon-900/50 border-dungeon-700">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-cyan-400">{slot.slot}</h3>
                                    <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
                                        {slot.limit}
                                    </span>
                                </div>
                                <p className="text-xs text-dungeon-400">{slot.examples}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4">Categorías de Objetos</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {ITEM_CATEGORIES.map((cat) => (
                        <Card key={cat.name} className="bg-dungeon-900/50 border-dungeon-700 hover:border-cyan-500/30 transition-colors">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <cat.icon className={`h-5 w-5 ${cat.color}`} />
                                    <span className={cat.color}>{cat.name}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-dungeon-300">{cat.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {cat.examples.map((ex) => (
                                        <span key={ex} className="text-xs bg-dungeon-800 text-dungeon-300 px-2 py-1 rounded">
                                            {ex}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-xs text-dungeon-400 pt-2 border-t border-dungeon-700">
                                    {cat.bonuses}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Activation */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4">Activación de Objetos</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-dungeon-900/50 border-dungeon-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-gold-400">Por Comando</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-dungeon-300">
                                Acción estándar. Requiere decir una palabra de comando.
                                Algunos objetos revelan su palabra al ser identificados.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-dungeon-900/50 border-dungeon-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-gold-400">Por Uso/Continuo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-dungeon-300">
                                Siempre activo mientras se lleva puesto.
                                Ejemplo: anillo de protección, botas de velocidad.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-dungeon-900/50 border-dungeon-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-gold-400">Completar Conjuro</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-dungeon-300">
                                Pergaminos. Requiere que el conjuro esté en tu lista de clase.
                                Acción estándar, no provoca ataques de oportunidad.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-dungeon-900/50 border-dungeon-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-gold-400">Detonador de Conjuro</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-dungeon-300">
                                Varitas y bastones. Acción estándar.
                                No requiere componentes, pero sí que el conjuro esté en tu lista.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Link to Items */}
            <Card className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border-cyan-500/30">
                <CardContent className="p-6 text-center">
                    <Gem className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-dungeon-100 mb-2">Explorar Objetos Mágicos</h3>
                    <p className="text-dungeon-300 mb-4">
                        Navega por nuestra base de datos de más de 600 objetos mágicos.
                    </p>
                    <Link href="/objetos">
                        <Button className="bg-cyan-600 hover:bg-cyan-500">
                            Ver Catálogo de Objetos
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
