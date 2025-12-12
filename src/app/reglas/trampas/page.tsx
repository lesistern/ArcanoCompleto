import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Lock, Info, Search, Wrench, Zap, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Trampas - Reglas D&D 3.5 | Compendio Arcano',
    description: 'Reglas completas de trampas en D&D 3.5: detección, desactivación, tipos de trampas y creación.',
};

const TRAP_TYPES = [
    {
        name: 'Trampas Mecánicas',
        description: 'Dispositivos físicos que se activan con gatillos de presión, hilos tensados u otros mecanismos.',
        examples: ['Foso con pinchos', 'Dardos envenenados', 'Piedra rodante', 'Cuchillas pendulares'],
        detection: 'Buscar CD variable (20-35)',
        disable: 'Inutilizar mecanismo CD variable (20-35)',
        icon: Wrench,
        color: 'text-orange-400'
    },
    {
        name: 'Trampas Mágicas',
        description: 'Trampas creadas mediante conjuros o efectos mágicos. Pueden ser permanentes o de un solo uso.',
        examples: ['Glifo de custodia', 'Símbolo de muerte', 'Trampa de fuego', 'Runa explosiva'],
        detection: 'Buscar CD 25 + nivel de conjuro',
        disable: 'Inutilizar mecanismo CD 25 + nivel de conjuro, o Disipar magia',
        icon: Zap,
        color: 'text-purple-400'
    }
];

const DETECTION_DCS = [
    { dc: '20', difficulty: 'Simple', example: 'Foso básico, trampa de dardos sencilla' },
    { dc: '25', difficulty: 'Media', example: 'Trampa de gas, cuchillas ocultas' },
    { dc: '30', difficulty: 'Difícil', example: 'Trampa elaborada de múltiples partes' },
    { dc: '35+', difficulty: 'Muy Difícil', example: 'Obra maestra de un artesano legendario' },
];

const TRAP_ELEMENTS = [
    { element: 'Gatillo', description: 'Lo que activa la trampa: placa de presión, hilo, proximidad, apertura de puerta' },
    { element: 'Efecto', description: 'Lo que hace la trampa: daño, condición, alarma, aprisionamiento' },
    { element: 'Duración', description: 'Única vez, múltiples activaciones, o perpetua' },
    { element: 'Reset', description: 'Manual (alguien la rearma), automático (se rearma sola), o ninguno' },
];

export default function TrampasPage() {
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
                    <div className="p-3 rounded-lg bg-orange-500/20 border border-orange-500/30">
                        <Lock className="h-8 w-8 text-orange-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Trampas</h1>
                        <p className="text-gray-400">Detección, desactivación y tipos de trampas</p>
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
                                Las <strong className="text-gray-100">trampas</strong> son peligros ocultos diseñados
                                para dañar, capturar o alertar sobre intrusos. Pueden ser mecánicas o mágicas, y varían
                                desde simples fosos hasta elaboradas defensas mortales.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Trap Types */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4">Tipos de Trampas</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {TRAP_TYPES.map((type) => (
                        <Card key={type.name} className="bg-gray-900/50 border-gray-700">
                            <CardHeader className="pb-2">
                                <CardTitle className={`flex items-center gap-2 text-lg ${type.color}`}>
                                    <type.icon className="h-5 w-5" />
                                    {type.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-gray-300">{type.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {type.examples.map((ex) => (
                                        <span key={ex} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                                            {ex}
                                        </span>
                                    ))}
                                </div>
                                <div className="pt-2 border-t border-gray-700 space-y-1 text-sm">
                                    <p><strong className="text-green-400">Detectar:</strong> {type.detection}</p>
                                    <p><strong className="text-blue-400">Desactivar:</strong> {type.disable}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Detection Process */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                    <Search className="h-6 w-6 text-gold-400" />
                    Detección de Trampas
                </h2>
                <Card className="bg-gray-900/50 border-gray-700">
                    <CardContent className="p-6 space-y-4">
                        <p className="text-gray-300">
                            Detectar una trampa requiere una prueba de <strong className="text-gold-400">Buscar</strong>.
                            El personaje debe declarar que está buscando trampas y especificar el área.
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                            {DETECTION_DCS.map((item) => (
                                <div key={item.dc} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                                    <div className="text-lg font-bold text-gold-400 mb-1">CD {item.dc}</div>
                                    <div className="text-sm text-gray-200 font-medium">{item.difficulty}</div>
                                    <div className="text-xs text-gray-400 mt-1">{item.example}</div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-rose-900/20 border border-rose-500/30 rounded-lg p-4">
                            <div className="flex gap-2 items-start">
                                <AlertTriangle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-gray-300">
                                    <strong className="text-rose-400">Importante:</strong> Los pícaros tienen la capacidad
                                    especial de encontrar trampas con CD mayor a 20. Otras clases solo pueden detectar
                                    trampas mecánicas con CD 20 o menor.
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Disabling */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                    <Wrench className="h-6 w-6 text-gold-400" />
                    Desactivar Trampas
                </h2>
                <Card className="bg-gray-900/50 border-gray-700">
                    <CardContent className="p-6 space-y-4">
                        <p className="text-gray-300">
                            Desactivar una trampa requiere <strong className="text-gold-400">Inutilizar mecanismo</strong>.
                            Esta habilidad es exclusiva de pícaros y algunas clases similares.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <h4 className="font-semibold text-green-400">Éxito</h4>
                                <p className="text-sm text-gray-300">
                                    La trampa queda desactivada de forma segura. Puedes intentar rearmarla o destruirla.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold text-red-400">Fallo por 5 o más</h4>
                                <p className="text-sm text-gray-300">
                                    ¡La trampa se activa! Afecta al personaje que intentó desactivarla.
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">
                            <strong>Tiempo:</strong> Desactivar una trampa típicamente requiere 2d4 asaltos
                            (1d4 si sacas 10 o más sobre la CD).
                        </p>
                    </CardContent>
                </Card>
            </section>

            {/* Trap Elements */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-4">Elementos de una Trampa</h2>
                <div className="grid md:grid-cols-2 gap-3">
                    {TRAP_ELEMENTS.map((el) => (
                        <Card key={el.element} className="bg-gray-900/50 border-gray-700">
                            <CardContent className="p-4">
                                <h3 className="font-semibold text-orange-400 mb-1">{el.element}</h3>
                                <p className="text-sm text-gray-300">{el.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CR Calculation */}
            <section>
                <h2 className="text-2xl font-bold text-gray-100 mb-4">Nivel de Desafío (ND)</h2>
                <Card className="bg-gray-900/50 border-gray-700">
                    <CardContent className="p-6">
                        <p className="text-gray-300 mb-4">
                            El ND de una trampa depende de su daño potencial, CD de detección/desactivación,
                            y efectos secundarios. Una trampa típica tiene ND igual a:
                        </p>
                        <ul className="text-sm text-gray-200 space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span>
                                <span><strong>ND 1-2:</strong> Trampas simples (foso, dardos básicos, 1d6-2d6 daño)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span>
                                <span><strong>ND 3-5:</strong> Trampas moderadas (gas venenoso, cuchillas, 3d6-5d6 daño)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span>
                                <span><strong>ND 6-9:</strong> Trampas peligrosas (trampas mágicas, efectos de muerte)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span>
                                <span><strong>ND 10+:</strong> Trampas mortales (símbolos de muerte, desintegración)</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
