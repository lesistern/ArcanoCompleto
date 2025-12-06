'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sword, Target, Hand, Scale, AlertTriangle, Zap, X, Hammer, Skull, Move, Shield } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';

interface RuleSection {
    id: string;
    title: string;
    icon: React.ReactNode;
    summary: React.ReactNode;
    fullText: string;
}

export function WeaponsRulesInfo() {
    const [selectedRule, setSelectedRule] = useState<RuleSection | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRulesOpen, setIsRulesOpen] = useState(false);

    const handleOpenRule = (rule: RuleSection) => {
        setSelectedRule(rule);
        setIsModalOpen(true);
    };

    const rules: RuleSection[] = [
        {
            id: 'competencia',
            title: 'Competencia',
            icon: <Target className="h-5 w-5" />,
            summary: (
                <div className="space-y-3">
                    <p>
                        <strong className="text-dungeon-100">Armas sencillas, marciales y exóticas:</strong> Todo personaje es competente
                        con la totalidad de armas sencillas, a excepción de los druidas, magos y monjes.
                    </p>
                    <p className="bg-red-900/20 p-3 rounded border border-red-900/30">
                        Un personaje que utilice un arma con la que no sea competente sufre un penalizador <strong>-4</strong> en las tiradas de ataque.
                    </p>
                </div>
            ),
            fullText: `Armas sencillas, marciales y exóticas: todo personaje es competente con la totalidad de armas sencillas, a excepción de los druidas, magos y monjes. Los bárbaros, exploradores, guerreros y paladines son competentes con todas las armas sencillas y marciales. Los personajes de las demás clases son competentes con varias armas, principalmente sencillas y quizá también alguna marcial o incluso exótica.

Un personaje que utilice un arma con la que no sea competente sufre un penalizador -4 en las tiradas de ataque.`
        },
        {
            id: 'tipos',
            title: 'Tipos de combate',
            icon: <Sword className="h-5 w-5" />,
            summary: (
                <div className="space-y-3">
                    <p>
                        <strong className="text-dungeon-100">Cuerpo a cuerpo:</strong> Se utilizan para atacar en combate cerrado.
                    </p>
                    <p>
                        <strong className="text-dungeon-100">Ataque a distancia:</strong> Incluyen armas arrojadizas y de proyectil.
                    </p>
                    <p>
                        <strong className="text-dungeon-100">Alcance:</strong> Armas que doblan el alcance natural del esgrimidor (10 pies).
                    </p>
                </div>
            ),
            fullText: `Armas de cuerpo a cuerpo y de ataque a distancia: las armas de cuerpo a cuerpo se utilizan para atacar en combate cerrado, aunque algunas de ellas pueden lanzarse. Las armas de ataque a distancia incluyen a las armas arrojadizas y a las de proyectil, y resultan ineficaces en el cuerpo a cuerpo.

Armas de alcance: las bisarmas, cadenas armadas, gujas, lanzas de caballería, lanzas largas, látigos y roncas son armas de alcance. Un arma de alcance es un arma de cuerpo a cuerpo que permite a su esgrimidor atacar a objetivos que no estén adyacentes a él. La mayoría de las armas de alcance descritas en este capítulo doblan el alcance natural del esgrimidor, lo cual quiere decir que un esgrimidor Pequeño o Mediano normal puede atacar a una criatura a 10' de distancia, pero no a una criatura en una casilla adyacente. Un personaje Grande típico que esgrima un arma de alcance del tamaño apropiado puede atacar a una criatura que esté a 15' o 20' de distancia, pero no a criaturas adyacentes o a 10' de distancia.`
        },
        {
            id: 'manejabilidad',
            title: 'Manejabilidad y esfuerzo',
            icon: <Hand className="h-5 w-5" />,
            summary: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-dungeon-900/30 p-3 rounded border border-dungeon-700">
                        <h4 className="font-bold text-dungeon-100 mb-2">Ligera</h4>
                        <p className="text-dungeon-300">
                            Se usa con una mano. Fácil en mano torpe.
                        </p>
                    </div>
                    <div className="bg-dungeon-900/30 p-3 rounded border border-dungeon-700">
                        <h4 className="font-bold text-dungeon-100 mb-2">A una mano</h4>
                        <p className="text-dungeon-300">
                            Versátil. Permite usar escudo, o blandirla a dos manos para sumar <strong>1.5 veces</strong> la Fuerza.
                        </p>
                    </div>
                    <div className="bg-dungeon-900/30 p-3 rounded border border-dungeon-700">
                        <h4 className="font-bold text-dungeon-100 mb-2">A dos manos</h4>
                        <p className="text-dungeon-300">
                            Pesada. Requiere ambas manos y aplica siempre <strong>1.5 veces</strong> la Fuerza al daño.
                        </p>
                    </div>
                </div>
            ),
            fullText: `Ligera: un arma ligera se utiliza con una mano. Es más fácil de usar en la mano torpe que un arma a una mano, y puede ser utilizada mientras se participa en una presa. Suma el bonificador de Fuerza del esgrimidor (si lo hay) a las tiradas de daño de los ataques cuerpo a cuerpo con un arma ligera si está siendo usada con la mano hábil, o la mitad del bonificador si se usa con la mano torpe. Utilizar las dos manos para esgrimir un arma ligera no proporciona ninguna ventaja en el daño. Un impacto sin arma siempre se considera un arma ligera.

A una mano: un arma a una mano puede ser utilizada tanto en la mano hábil como en la mano torpe. Suma el bonificador de Fuerza del esgrimidor a las tiradas de daño de los ataques cuerpo a cuerpo con un arma a una mano si está siendo usada con la mano hábil, o la mitad del bonificador si se usa con la mano torpe. Si un arma a una mano es esgrimida con las dos manos durante un combate cuerpo a cuerpo, se sumará a las tiradas de daño una vez y media el bonificador de Fuerza del personaje.

A dos manos: para utilizar con efectividad un arma de cuerpo a cuerpo a dos manos son necesarias ambas manos. Suma una vez y media el bonificador de Fuerza del personaje a las tiradas de daño de los ataques cuerpo a cuerpo con armas de este tipo.`
        },
        {
            id: 'tamano',
            title: 'Tamaño del arma',
            icon: <Scale className="h-5 w-5" />,
            summary: (
                <div className="space-y-3">
                    <p>
                        Cada arma tiene una categoría de tamaño (Pequeña, Mediana, Grande) que indica el tamaño de la criatura para la cual fue diseñada.
                    </p>
                    <div className="bg-red-900/10 p-3 rounded border border-red-900/20">
                        <p className="font-semibold text-red-300 mb-1">Armas de tamaño no apropiado</p>
                        <p>
                            Una criatura sufre un penalizador acumulativo de <strong>-2</strong> al ataque por cada categoría de diferencia entre su tamaño y el del arma.
                        </p>
                    </div>
                </div>
            ),
            fullText: `Tamaño del arma: cada arma tiene una categoría de tamaño, como Pequeña, Mediana o Grande. Esta indicación señala el tamaño de la criatura a la cual fue diseñada el arma. Un espadón Pequeño es un espadón fabricado para una criatura Pequeña, como un mediano. Una espada larga Mediana es una espada larga diseñada para una criatura Mediana, como un elfo.

La categoría de tamaño de un arma no es lo mismo que su tamaño como objeto. Por ejemplo, una daga Mediana es un objeto Menudo. La categoría de tamaño de un arma va unida al tamaño del esgrimidor para el que se creó. En general, un arma ligera es un objeto dos categorías de tamaño más pequeño que su esgrimidor, un arma a una mano es un objeto una categoría de tamaño más pequeño que su esgrimidor, y un arma a dos manos es un arma de la misma categoría de tamaño que su esgrimidor.

Armas de tamaño no apropiado: una criatura no puede darle el uso óptimo a un arma que no sea de un tamaño adecuado al suyo. Se aplica un penalizador -2 acumulativo a las tiradas de ataque por cada categoría de tamaño que haya entre el tamaño para el que fue creada un arma y el tamaño de su esgrimidor actual. Si la criatura no es competente con el arma, también se aplica el penalizador -4 por no ser competente.`
        },
        {
            id: 'improvisadas',
            title: 'Armas improvisadas',
            icon: <AlertTriangle className="h-5 w-5" />,
            summary: (
                <div className="space-y-3">
                    <p>
                        Objetos no diseñados para el combate (botellas rotas, patas de silla).
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-dungeon-300">
                        <li>Se consideran armas con las que <strong>no se es competente</strong> (-4 al ataque).</li>
                        <li>Amenaza de crítico con 20 natural (x2 daño).</li>
                        <li>Incremento de distancia de 10 pies si se lanzan.</li>
                    </ul>
                </div>
            ),
            fullText: `Armas improvisadas: a veces se utilizan en el combate objetos que ni remotamente se han construido pensando en él. La gente lucha con cualquier cosa, desde botellas rotas hasta patas de sillas o tirándose las jarras. Ya que estos objetos no están diseñados para ese uso, cualquier criatura que utilice uno de ellos en combate lo hará como si no fuese competente en él, recibiendo un penalizador -4 a las tiradas de ataque con dicho objeto.

Para determinar la categoría de tamaño y el daño apropiado para un arma improvisada, el DM debe comparar su tamaño relativo y su daño potencial con la lista de armas para encontrar un parecido razonable. Un arma improvisada produce una amenaza (un posible impacto crítico) con una tirada sin modificar de 20, e inflige doble daño en caso de impacto crítico. Un arma arrojadiza improvisada tiene un incremento de distancia de 10'.`
        },
        {
            id: 'dano',
            title: 'Daño',
            icon: <Hammer className="h-5 w-5" />,
            summary: (
                <div className="space-y-3">
                    <p>
                        El daño que inflige al acertar. Varía según si el arma es Pequeña o Mediana.
                    </p>
                </div>
            ),
            fullText: `La columna de Daño indica el daño que infliges con el arma en un golpe exitoso. La columna etiquetada "Daño (P)" es para armas Pequeñas, como las que típicamente empuña un gnomo o mediano. La columna etiquetada "Daño (M)" es para armas Medianas, como las que típicamente empuña un enano, elfo, semielfo, semiorco o humano. Si se dan dos rangos de daño, como "1d6/1d6" para el bastón, entonces el arma es un arma doble. Usa la segunda cifra de daño dada para el ataque extra del arma doble.

Por ejemplo, una espada larga Menuda (como la que podría empuñar un guerrero mediano o gnomo bajo el efecto de un hechizo de reducir persona) inflige 1d4 puntos de daño, mientras que una gran hacha Grande (empuñada por un bárbaro semiorco bajo el efecto de un hechizo de agrandar persona) inflige 3d6 puntos de daño. La Guía del Dungeon Master tiene más información sobre armas y combate para criaturas más pequeñas que Pequeñas y más grandes que Medianas.`
        },
        {
            id: 'critico',
            title: 'Crítico',
            icon: <Skull className="h-5 w-5" />,
            summary: (
                <div className="space-y-3">
                    <p>
                        El rango de amenaza (ej. 19-20) y el multiplicador de daño (ej. x3) en un golpe crítico.
                    </p>
                </div>
            ),
            fullText: `La columna de Crítico indica cómo se usa el arma con respecto a las reglas de golpes críticos. Cuando logras un golpe crítico, tiras el daño dos, tres o cuatro veces (según lo indicado por su multiplicador de crítico) y sumas todos los resultados para obtener el daño total.

Excepción: El daño adicional por encima del daño normal de un arma, como el infligido por un ataque furtivo o la habilidad especial de una espada flamígera, no se multiplica cuando logras un golpe crítico.

×2: El arma inflige doble daño en un golpe crítico.
×3: El arma inflige triple daño en un golpe crítico.
×3/×4: Una cabeza de esta arma doble inflige triple daño en un golpe crítico. La otra cabeza inflige cuádruple daño en un golpe crítico.
×4: El arma inflige cuádruple daño en un golpe crítico.
19–20/×2: El arma logra una amenaza (un posible golpe crítico) con una tirada natural de 19 o 20 (en lugar de solo con un 20) e inflige doble daño en un golpe crítico. (El arma tiene un rango de amenaza de 19–20).
18–20/×2: El arma logra una amenaza con una tirada natural de 18, 19 o 20 (en lugar de solo con un 20) e inflige doble daño en un golpe crítico. (El arma tiene un rango de amenaza de 18–20).`
        },
        {
            id: 'distancia',
            title: 'Incremento de distancia',
            icon: <Move className="h-5 w-5" />,
            summary: (
                <div className="space-y-3">
                    <p>
                        Penalizador -2 al ataque por cada incremento de distancia más allá del primero.
                    </p>
                </div>
            ),
            fullText: `Cualquier ataque a menos de esta distancia no es penalizado por la distancia. Sin embargo, cada incremento de distancia completo impone un penalizador acumulativo de –2 a la tirada de ataque.`
        },
        {
            id: 'tipo_dano',
            title: 'Tipo de daño',
            icon: <Shield className="h-5 w-5" />,
            summary: (
                <div className="space-y-3">
                    <p>
                        Contundente, perforante o cortante. Algunos monstruos son resistentes a ciertos tipos.
                    </p>
                </div>
            ),
            fullText: `Las armas se clasifican según el tipo de daño que infligen: contundente, perforante o cortante. Algunos monstruos pueden ser resistentes o inmunes a ataques de ciertos tipos de daño.`
        },
    ];

    return (
        <div className="space-y-8 mb-12">
            {/* Intro Section */}
            <section className="prose prose-invert max-w-none">
                <Button
                    variant="ghost"
                    onClick={() => setIsRulesOpen(!isRulesOpen)}
                    className="flex items-center gap-2 text-2xl font-bold text-red-400 mb-4 w-full justify-start hover:text-red-300 hover:bg-dungeon-800/50 transition-all p-4 rounded-lg border border-transparent hover:border-red-500/20"
                >
                    <Sword className="h-6 w-6" />
                    Categorías de las armas
                    <span className="ml-auto text-sm font-normal text-dungeon-300 bg-dungeon-800 px-3 py-1 rounded-full border border-dungeon-700">
                        {isRulesOpen ? 'Ocultar reglas' : 'Ver reglas'}
                    </span>
                </Button>

                {isRulesOpen && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                        <p className="text-dungeon-200 leading-relaxed mb-8">
                            Las armas se agrupan en varios tipos de categorías interrelacionadas. Las categorías tienen que ver con qué entrenamiento
                            es necesario para ser competente en el uso del arma (sencilla, marcial o exótica), la utilidad de esta en
                            combate cerrado (cuerpo a cuerpo) o en ataque a distancia (que incluye tanto armas arrojadizas
                            como de proyectil), su manejabilidad (ligera, a una mano o a dos manos) y el tamaño del arma (Pequeña, Mediana o Grande).
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {rules.map((rule) => (
                                <Card
                                    key={rule.id}
                                    className={`bg-dungeon-800/50 border-dungeon-700 flex flex-col ${rule.id === 'manejabilidad' || rule.id === 'cualidades' ? 'md:col-span-2' : ''
                                        }`}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-red-400 text-lg">
                                            {rule.icon}
                                            {rule.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-dungeon-200 text-sm flex-grow flex flex-col">
                                        <div className="mb-4 flex-grow">
                                            {rule.summary}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full mt-auto border-dungeon-600 hover:bg-dungeon-700 text-dungeon-200"
                                            onClick={() => handleOpenRule(rule)}
                                        >
                                            Leer más
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Modal de lectura completa */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-dungeon-900 border-dungeon-700 text-dungeon-100 w-[95vw] max-w-2xl max-h-[90vh] md:max-h-[80vh] overflow-y-auto p-4 md:p-6">
                    <DialogHeader className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                {selectedRule?.icon}
                                <DialogTitle className="text-xl md:text-2xl font-bold text-red-400 text-left leading-tight">
                                    {selectedRule?.title}
                                </DialogTitle>
                            </div>
                            <DialogClose asChild>
                                <Button variant="ghost" className="h-8 w-8 -mt-2 -mr-2 text-dungeon-400 hover:text-dungeon-100 p-0">
                                    <X className="h-5 w-5" />
                                </Button>
                            </DialogClose>
                        </div>
                    </DialogHeader>
                    <div className="mt-2 md:mt-4">
                        <DialogDescription className="text-dungeon-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap text-justify">
                            {selectedRule?.fullText}
                        </DialogDescription>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <DialogClose asChild>
                            <Button variant="secondary" className="w-full md:w-auto">Cerrar</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
