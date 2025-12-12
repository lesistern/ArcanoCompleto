import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Flame, Info, Crown, Swords, Wand2, Shield, Star, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Reglas Épicas - D&D 3.5 | Compendio Arcano',
    description: 'Reglas para personajes de nivel 21+ en D&D 3.5: progresión épica, dotes épicas, conjuros épicos y desafíos.',
};

const EPIC_PROGRESSION = [
    { level: 21, bab: '+21', fort: '+12', ref: '+12', will: '+12', feats: 'Dote épica' },
    { level: 22, bab: '+22', fort: '+13', ref: '+13', will: '+13', feats: '-' },
    { level: 23, bab: '+23', fort: '+13', ref: '+13', will: '+13', feats: '-' },
    { level: 24, bab: '+24', fort: '+14', ref: '+14', will: '+14', feats: 'Dote épica' },
    { level: 25, bab: '+25', fort: '+14', ref: '+14', will: '+14', feats: '-' },
    { level: 26, bab: '+26', fort: '+15', ref: '+15', will: '+15', feats: '-' },
    { level: 27, bab: '+27', fort: '+15', ref: '+15', will: '+15', feats: 'Dote épica' },
    { level: 28, bab: '+28', fort: '+16', ref: '+16', will: '+16', feats: '-' },
    { level: 29, bab: '+29', fort: '+16', ref: '+16', will: '+16', feats: '-' },
    { level: 30, bab: '+30', fort: '+17', ref: '+17', will: '+17', feats: 'Dote épica' },
];

const EPIC_FEATS = [
    {
        name: 'Armadura Épica',
        prerequisites: 'Armadura pesada, nivel 21+',
        benefit: 'Tu armadura proporciona RD 3/— adicional.',
        category: 'Defensa'
    },
    {
        name: 'Conjuro Devastador',
        prerequisites: 'Nivel de lanzador 21+, Conjuro potenciado',
        benefit: 'Un conjuro por día ignora resistencia a la magia y resistencias.',
        category: 'Magia'
    },
    {
        name: 'Crítico Letal',
        prerequisites: 'BAB +21, Crítico mejorado',
        benefit: 'Los críticos confirmados causan daño máximo.',
        category: 'Combate'
    },
    {
        name: 'Dote Épica de Arma',
        prerequisites: 'BAB +21, Arma superior',
        benefit: '+2 adicional al ataque y daño con un arma específica.',
        category: 'Combate'
    },
    {
        name: 'Fortaleza Épica',
        prerequisites: 'Nivel 21+',
        benefit: '+4 a las salvaciones de Fortaleza.',
        category: 'Defensa'
    },
    {
        name: 'Gran Especialización en Arma',
        prerequisites: 'Especialización en arma, Guerrero nivel 12, BAB +21',
        benefit: '+2 adicional al daño con el arma seleccionada.',
        category: 'Combate'
    },
    {
        name: 'Liderazgo Épico',
        prerequisites: 'Liderazgo, nivel 21+, Carisma 25+',
        benefit: 'Puedes tener seguidores y compañeros de nivel épico.',
        category: 'General'
    },
    {
        name: 'Reflexología Épica',
        prerequisites: 'Nivel 21+',
        benefit: '+4 a las salvaciones de Reflejos.',
        category: 'Defensa'
    },
    {
        name: 'Resistencia Épica a la Magia',
        prerequisites: 'Resistencia a la magia racial, nivel 21+',
        benefit: '+2 a tu RM por cada dote épica que tengas.',
        category: 'Defensa'
    },
    {
        name: 'Voluntad Épica',
        prerequisites: 'Nivel 21+',
        benefit: '+4 a las salvaciones de Voluntad.',
        category: 'Defensa'
    },
    {
        name: 'Velocidad Épica',
        prerequisites: 'Destreza 25+, nivel 21+',
        benefit: '+30 pies a tu velocidad base.',
        category: 'General'
    },
    {
        name: 'Puntos de Golpe Mejorados',
        prerequisites: 'Nivel 21+',
        benefit: 'Ganas +30 puntos de golpe.',
        category: 'Defensa'
    }
];

const EPIC_SPELLCASTING = [
    {
        title: '¿Qué son los Conjuros Épicos?',
        content: 'Los conjuros épicos van más allá del nivel 9. Son rituales complejos que requieren investigación, componentes raros y checks de Conocimiento (arcano) o Conocimiento (religión).'
    },
    {
        title: 'Requisitos',
        content: 'Para lanzar conjuros épicos necesitas: nivel de lanzador 21+, la dote Lanzamiento de Conjuros Épico, y éxito en un check de Conocimiento contra la CD del conjuro.'
    },
    {
        title: 'CD del Conjuro',
        content: 'La CD base es 20 + modificadores de semilla + modificadores de factores. Reducir la CD requiere componentes extra, tiempo de lanzamiento mayor, o backlash (daño al lanzador).'
    },
    {
        title: 'Semillas de Conjuro',
        content: 'Las semillas son los efectos básicos (destrucción, vida, transformación, etc.). Cada semilla tiene un factor de CD base que se modifica según el efecto deseado.'
    }
];

const EPIC_CHALLENGES = [
    { cr: '21-25', description: 'Dragones ancestrales, demonios menores, liches poderosos' },
    { cr: '26-30', description: 'Señores demoniacos menores, dioses menores, tarrasques' },
    { cr: '31-40', description: 'Avatares divinos, príncipes demoniacos, entidades cósmicas' },
    { cr: '40+', description: 'Deidades verdaderas, primordiales, amenazas multiversales' },
];

export default function EpicoPage() {
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
                    <div className="p-3 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                        <Flame className="h-8 w-8 text-yellow-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Reglas Épicas</h1>
                        <p className="text-gray-400">Contenido para personajes de nivel 21 y superior</p>
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
                                Las <strong className="text-gray-100">reglas épicas</strong> extienden el juego más allá
                                del nivel 20. Los personajes épicos enfrentan desafíos cósmicos, pueden lanzar conjuros
                                que alteran la realidad y obtienen dotes de poder legendario.
                            </p>
                            <p>
                                A partir del nivel 21, los personajes ganan nuevas dotes épicas cada 3 niveles y su
                                progresión de BAB y salvaciones continúa de forma lineal.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Epic Progression Table */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                    <Crown className="h-6 w-6 text-gold-400" />
                    Progresión Épica (Niveles 21-30)
                </h2>
                <Card className="bg-gray-900/50 border-gray-700 overflow-hidden">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-800">
                                    <tr className="text-gray-300">
                                        <th className="px-4 py-3 text-left">Nivel</th>
                                        <th className="px-4 py-3 text-center">BAB</th>
                                        <th className="px-4 py-3 text-center">Fort</th>
                                        <th className="px-4 py-3 text-center">Ref</th>
                                        <th className="px-4 py-3 text-center">Vol</th>
                                        <th className="px-4 py-3 text-left">Especial</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {EPIC_PROGRESSION.map((row, idx) => (
                                        <tr key={row.level} className={idx % 2 === 0 ? 'bg-gray-900/30' : ''}>
                                            <td className="px-4 py-2 font-bold text-gold-400">{row.level}</td>
                                            <td className="px-4 py-2 text-center text-gray-200">{row.bab}</td>
                                            <td className="px-4 py-2 text-center text-green-400">{row.fort}</td>
                                            <td className="px-4 py-2 text-center text-blue-400">{row.ref}</td>
                                            <td className="px-4 py-2 text-center text-purple-400">{row.will}</td>
                                            <td className="px-4 py-2 text-gray-300">
                                                {row.feats !== '-' ? (
                                                    <span className="text-yellow-400">{row.feats}</span>
                                                ) : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
                <p className="text-sm text-gray-400 mt-2">
                    * Las salvaciones mostradas son para clases con buena progresión. Las salvaciones pobres usan +1 por cada 3 niveles.
                </p>
            </section>

            {/* Epic Feats */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                    <Star className="h-6 w-6 text-gold-400" />
                    Dotes Épicas Destacadas
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {EPIC_FEATS.map((feat) => (
                        <Card key={feat.name} className="bg-gray-900/50 border-gray-700">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-gold-400">{feat.name}</h3>
                                    <span className={`text-xs px-2 py-1 rounded ${
                                        feat.category === 'Combate' ? 'bg-red-500/20 text-red-400' :
                                        feat.category === 'Magia' ? 'bg-purple-500/20 text-purple-400' :
                                        feat.category === 'Defensa' ? 'bg-blue-500/20 text-blue-400' :
                                        'bg-gray-500/20 text-gray-400'
                                    }`}>
                                        {feat.category}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">
                                    <strong>Requisitos:</strong> {feat.prerequisites}
                                </p>
                                <p className="text-sm text-gray-300">{feat.benefit}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Epic Spellcasting */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                    <Wand2 className="h-6 w-6 text-purple-400" />
                    Conjuros Épicos
                </h2>
                <div className="space-y-4">
                    {EPIC_SPELLCASTING.map((section) => (
                        <Card key={section.title} className="bg-gray-900/50 border-gray-700">
                            <CardContent className="p-4">
                                <h3 className="font-semibold text-purple-400 mb-2">{section.title}</h3>
                                <p className="text-sm text-gray-300">{section.content}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Epic Challenges */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                    <Swords className="h-6 w-6 text-red-400" />
                    Desafíos Épicos
                </h2>
                <Card className="bg-gray-900/50 border-gray-700">
                    <CardContent className="p-6 space-y-4">
                        <p className="text-gray-300">
                            Los encuentros épicos involucran amenazas de escala cósmica. Aquí una guía de CR:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {EPIC_CHALLENGES.map((challenge) => (
                                <div key={challenge.cr} className="bg-gray-800/50 p-4 rounded-lg">
                                    <div className="text-lg font-bold text-red-400 mb-1">CR {challenge.cr}</div>
                                    <p className="text-sm text-gray-300">{challenge.description}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Special Rules */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                    <Shield className="h-6 w-6 text-blue-400" />
                    Reglas Especiales Épicas
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-gray-900/50 border-gray-700">
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-blue-400 mb-2">Puntos de Golpe</h3>
                            <p className="text-sm text-gray-300">
                                Después del nivel 20, los personajes ganan puntos de golpe fijos (sin tirar dados):
                                normalmente el promedio del dado de golpe de su clase + modificador de Constitución.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900/50 border-gray-700">
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-blue-400 mb-2">Incremento de Características</h3>
                            <p className="text-sm text-gray-300">
                                Los personajes continúan ganando +1 a una característica cada 4 niveles
                                (nivel 24, 28, 32, etc.).
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900/50 border-gray-700">
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-blue-400 mb-2">Conjuros por Día</h3>
                            <p className="text-sm text-gray-300">
                                La cantidad de conjuros por día sigue aumentando según las tablas de clase,
                                pero no se ganan nuevos niveles de conjuro más allá del 9º.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900/50 border-gray-700">
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-blue-400 mb-2">Nivel de Lanzador</h3>
                            <p className="text-sm text-gray-300">
                                El nivel de lanzador sigue subiendo, aumentando la efectividad de
                                conjuros que dependen del nivel (duración, daño, etc.).
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Warning */}
            <Card className="bg-amber-900/20 border-amber-500/30">
                <CardContent className="p-6">
                    <div className="flex gap-3">
                        <Zap className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div className="text-gray-300 space-y-2">
                            <p className="font-semibold text-amber-400">Nota para DMs</p>
                            <p className="text-sm">
                                El juego épico requiere una planificación cuidadosa. Los personajes de nivel 21+
                                pueden trivializar muchos encuentros si no se balancean correctamente. Considera
                                amenazas que afecten múltiples planos, enemigos con inmunidades épicas y desafíos
                                que requieran más que simple combate.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
