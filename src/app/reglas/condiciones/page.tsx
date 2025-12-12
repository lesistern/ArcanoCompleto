import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Condiciones - Reglas D&D 3.5 | Compendio Arcano',
    description: 'Guía completa de condiciones y estados en D&D 3.5: cegado, aturdido, paralizado, envenenado, asustado y más.',
};

interface Condition {
    name: string;
    description: string;
    effects: string[];
    cure?: string;
}

const CONDITIONS: Condition[] = [
    {
        name: 'Asustado',
        description: 'El personaje huye de la fuente de su miedo lo más rápido posible.',
        effects: [
            '-2 a tiradas de ataque, salvaciones, pruebas de habilidad y característica',
            'Puede usar habilidades y conjuros especiales para huir',
            'Si no puede huir, puede luchar pero con las penalizaciones'
        ],
        cure: 'Eliminar la fuente del miedo o conjuro apropiado'
    },
    {
        name: 'Aturdido',
        description: 'El personaje queda incapacitado brevemente, incapaz de actuar.',
        effects: [
            'Deja caer todo lo que sostiene',
            'No puede realizar acciones',
            'Penalizador de -2 a la CA',
            'Pierde el bonificador de Destreza a la CA'
        ],
        cure: 'Termina automáticamente después de la duración indicada'
    },
    {
        name: 'Cegado',
        description: 'El personaje no puede ver. Sufre penalizaciones severas.',
        effects: [
            '-2 a la CA',
            'Pierde el bonificador de Destreza a la CA',
            'Se mueve a la mitad de velocidad',
            '-4 a Buscar y otras habilidades basadas en visión',
            '50% de probabilidad de fallo en ataques',
            'Todos los oponentes tienen ocultación total'
        ],
        cure: 'Curar ceguera/sordera, restauración o similar'
    },
    {
        name: 'Confuso',
        description: 'El personaje actúa erráticamente, incapaz de distinguir amigos de enemigos.',
        effects: [
            'Cada turno, tira 1d10 para determinar acción:',
            '1: Ataca al lanzador con cuerpo a cuerpo o arma a distancia',
            '2-6: No hace nada más que balbucear',
            '7-9: Ataca a la criatura más cercana',
            '10: Actúa normalmente'
        ],
        cure: 'Disipar magia, calmar emociones o termina la duración'
    },
    {
        name: 'Deslumbrado',
        description: 'El personaje es incapaz de ver bien debido a sobreestimulación visual.',
        effects: [
            '-1 a tiradas de ataque',
            '-1 a pruebas de Buscar y Avistar'
        ],
        cure: 'Alejarse de la fuente de luz brillante'
    },
    {
        name: 'Derribado',
        description: 'El personaje está tendido en el suelo.',
        effects: [
            '-4 a tiradas de ataque cuerpo a cuerpo',
            'No puede usar armas a distancia (excepto ballestas)',
            '+4 a la CA contra ataques a distancia',
            '-4 a la CA contra ataques cuerpo a cuerpo',
            'Levantarse provoca ataques de oportunidad'
        ],
        cure: 'Acción de movimiento para levantarse'
    },
    {
        name: 'Desprevenido',
        description: 'El personaje no es consciente de una amenaza.',
        effects: [
            'Pierde el bonificador de Destreza a la CA',
            'Puede ser objetivo de ataques furtivos'
        ],
        cure: 'Percibir la amenaza'
    },
    {
        name: 'Encantado',
        description: 'El personaje trata al encantador como amigo de confianza.',
        effects: [
            'No atacará al encantador',
            'El encantador tiene +5 a pruebas de Diplomacia',
            'No obedece órdenes suicidas ni claramente dañinas',
            'Puede actuar normalmente contra otros enemigos'
        ],
        cure: 'Disipar magia, o si el encantador o aliados dañan al encantado'
    },
    {
        name: 'Enfermo',
        description: 'El personaje sufre de una enfermedad debilitante.',
        effects: [
            '-2 a tiradas de ataque, salvaciones, pruebas de habilidad y característica',
            'Efectos adicionales según la enfermedad específica'
        ],
        cure: 'Curar enfermedad o recuperación natural'
    },
    {
        name: 'Enredado',
        description: 'El personaje está atrapado en una red, telaraña o efecto similar.',
        effects: [
            'No puede moverse',
            '-2 a tiradas de ataque',
            '-4 a Destreza',
            'Concentración CD 15 para lanzar conjuros'
        ],
        cure: 'Escapar (Escapismo o Fuerza) o destruir la trampa'
    },
    {
        name: 'Exhausto',
        description: 'El personaje está extremadamente fatigado.',
        effects: [
            'Se mueve a la mitad de velocidad',
            '-6 a Fuerza y Destreza',
            'Una hora de descanso reduce a fatigado'
        ],
        cure: '8 horas de descanso completo'
    },
    {
        name: 'Fascinado',
        description: 'El personaje está absorto en algo y no presta atención a su entorno.',
        effects: [
            '-4 a pruebas de habilidad reactivas (Avistar, Escuchar)',
            'Cualquier amenaza potencial permite nueva salvación',
            'Cualquier amenaza obvia rompe el efecto'
        ],
        cure: 'Amenaza obvia o daño'
    },
    {
        name: 'Fatigado',
        description: 'El personaje está cansado por esfuerzo.',
        effects: [
            'No puede correr ni cargar',
            '-2 a Fuerza y Destreza',
            'Fatiga adicional causa exhausto'
        ],
        cure: '8 horas de descanso'
    },
    {
        name: 'Indefenso',
        description: 'El personaje está completamente a merced de sus atacantes.',
        effects: [
            'CA efectiva de 5 + modificadores de tamaño',
            'Atacante cuerpo a cuerpo puede hacer golpe de gracia',
            'Puede ser objetivo de ataque furtivo'
        ],
        cure: 'Depende de la causa (despertar, liberarse, etc.)'
    },
    {
        name: 'Invisible',
        description: 'El personaje no puede ser visto con visión normal.',
        effects: [
            '+2 a tiradas de ataque contra criaturas que no te ven',
            'Ignora el bonificador de Destreza del objetivo a la CA',
            '50% de ocultación si atacan tu cuadro',
            'Puede hacer ataques furtivos'
        ],
        cure: 'Disipar magia, ver invisibilidad, polvo o similar'
    },
    {
        name: 'Mareado',
        description: 'El personaje está atontado y con náuseas.',
        effects: [
            'Solo puede realizar una acción de movimiento por turno',
            'No puede realizar ataques de oportunidad'
        ],
        cure: 'Termina después de la duración o curación mágica'
    },
    {
        name: 'Muerto',
        description: 'El personaje ha perdido toda la vida.',
        effects: [
            'El alma abandona el cuerpo',
            'No puede ser curado con curación normal',
            'El cuerpo comienza a descomponerse'
        ],
        cure: 'Resurrección, resurreción verdadera, reencarnación o deseo'
    },
    {
        name: 'Náuseas',
        description: 'El personaje siente náuseas intensas.',
        effects: [
            'Solo puede realizar una acción de movimiento por turno',
            'No puede atacar, lanzar conjuros ni concentrarse'
        ],
        cure: 'Termina después de la duración indicada'
    },
    {
        name: 'Paralizado',
        description: 'El personaje está completamente inmóvil.',
        effects: [
            'No puede moverse ni actuar',
            'CA efectiva basada en 5 + tamaño (como indefenso)',
            'Fuerza y Destreza efectivas de 0',
            'Puede ser objetivo de golpe de gracia'
        ],
        cure: 'Termina la duración, eliminar parálisis o similar'
    },
    {
        name: 'Petrificado',
        description: 'El personaje se ha convertido en piedra.',
        effects: [
            'Considerado inconsciente',
            'Si se rompe la estatua, el personaje muere',
            'Peso aumenta ×10'
        ],
        cure: 'Romper encantamiento, piedra a carne'
    },
    {
        name: 'Presa',
        description: 'El personaje está siendo sujetado en un agarre.',
        effects: [
            'No puede moverse',
            '-4 a Destreza',
            '-2 a tiradas de ataque',
            'Solo puede atacar con armas ligeras o agarrar',
            'Concentración CD 20 para lanzar conjuros'
        ],
        cure: 'Ganar prueba de presa o Escapismo'
    },
    {
        name: 'Sacudido',
        description: 'El personaje sufre miedo menor.',
        effects: [
            '-2 a tiradas de ataque, salvaciones y pruebas de habilidad'
        ],
        cure: 'Eliminar fuente de miedo o duración termina'
    },
    {
        name: 'Sordo',
        description: 'El personaje no puede oír.',
        effects: [
            '-4 a Iniciativa',
            'Fallo automático en pruebas de Escuchar',
            '20% de probabilidad de fallo en conjuros con componente verbal'
        ],
        cure: 'Curar ceguera/sordera, restauración o similar'
    },
    {
        name: 'Tambaleante',
        description: 'El personaje apenas puede mantenerse en pie.',
        effects: [
            'Solo puede realizar una acción estándar o de movimiento (no ambas)',
            'Puede realizar acciones gratuitas y rápidas normalmente'
        ],
        cure: 'Curación que suba los PG por encima de 0'
    }
];

export default function CondicionesPage() {
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
                    <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/30">
                        <AlertTriangle className="h-8 w-8 text-rose-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Condiciones</h1>
                        <p className="text-gray-400">Estados y efectos que afectan a las criaturas</p>
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
                                Las <strong className="text-gray-100">condiciones</strong> son estados que afectan
                                las capacidades de una criatura. Pueden ser causadas por conjuros, habilidades
                                especiales, trampas, venenos o el entorno.
                            </p>
                            <p>
                                Algunas condiciones son menores (como sacudido), mientras que otras pueden ser
                                devastadoras (como paralizado o petrificado). Conocer estas condiciones es esencial
                                para el combate táctico.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Conditions Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                {CONDITIONS.map((condition) => (
                    <Card key={condition.name} className="bg-gray-900/50 border-gray-700 hover:border-rose-500/30 transition-colors">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-rose-400">{condition.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-gray-300">{condition.description}</p>
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-gray-400 uppercase">Efectos:</p>
                                <ul className="text-sm text-gray-200 space-y-1">
                                    {condition.effects.map((effect, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-rose-500 mt-1">•</span>
                                            <span>{effect}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {condition.cure && (
                                <div className="pt-2 border-t border-gray-700">
                                    <p className="text-xs text-gray-400">
                                        <strong className="text-green-400">Cura:</strong> {condition.cure}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
