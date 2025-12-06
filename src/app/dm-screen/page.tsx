import { Metadata } from 'next';
import Link from 'next/link';
import {
    ArrowLeft, Shield, Info, Users, Bug, Map, Crown, Mountain,
    Swords, Coins, Scroll, Dice6, BookOpen, Target, Zap,
    AlertTriangle, Clock, Scale, Sparkles, Brain, MessageSquare,
    Skull, Heart, Star, Flame, ChevronRight, GraduationCap,
    HelpCircle, CheckCircle, Lightbulb, PartyPopper
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Pantalla del DM - Reglas D&D 3.5 | Compendio Arcano',
    description: 'Herramientas y referencias rápidas para Dungeon Masters de D&D 3.5: encuentros, tesoros, PNJs, y más.',
};

// DM-specific rule sections
const DM_SECTIONS = [
    {
        name: 'Clases de PNJ',
        href: '/reglas/clases-pnj',
        description: 'Adepto, Aristócrata, Experto, Guerrero y Plebeyo para poblar tu mundo.',
        icon: Users,
        color: 'text-stone-400',
        bgColor: 'bg-stone-500/20',
        borderColor: 'border-stone-500/30'
    },
    {
        name: 'Tipos de Criaturas',
        href: '/reglas/tipos-criaturas',
        description: '15 tipos y 14 subtipos para entender monstruos y crear encuentros.',
        icon: Bug,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/20',
        borderColor: 'border-purple-500/30'
    },
    {
        name: 'Los Planos',
        href: '/reglas/planos',
        description: 'Planos transitivos, interiores y exteriores para aventuras planares.',
        icon: Map,
        color: 'text-indigo-400',
        bgColor: 'bg-indigo-500/20',
        borderColor: 'border-indigo-500/30'
    },
    {
        name: 'Contenido Épico',
        href: '/reglas/epico',
        description: 'Niveles 21+, dotes épicas y desafíos para campañas legendarias.',
        icon: Crown,
        color: 'text-gold-400',
        bgColor: 'bg-gold-500/20',
        borderColor: 'border-gold-500/30'
    },
    {
        name: 'Entorno y Clima',
        href: '/reglas/entorno',
        description: 'Peligros ambientales, terreno y condiciones climáticas.',
        icon: Mountain,
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/20',
        borderColor: 'border-emerald-500/30'
    },
    {
        name: 'Trampas',
        href: '/reglas/trampas',
        description: 'Diseño, detección y desactivación de trampas para mazmorras.',
        icon: AlertTriangle,
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/20',
        borderColor: 'border-orange-500/30'
    }
];

// Difficulty Class reference
const DC_REFERENCE = [
    { dc: 0, difficulty: 'Muy fácil', example: 'Notar algo obvio' },
    { dc: 5, difficulty: 'Fácil', example: 'Trepar una cuerda con nudos' },
    { dc: 10, difficulty: 'Media', example: 'Escuchar una conversación' },
    { dc: 15, difficulty: 'Difícil', example: 'Abrir una cerradura simple' },
    { dc: 20, difficulty: 'Muy difícil', example: 'Rastrear en terreno difícil' },
    { dc: 25, difficulty: 'Heroica', example: 'Escalar una pared lisa mojada' },
    { dc: 30, difficulty: 'Casi imposible', example: 'Rastrear en piedra' },
    { dc: 40, difficulty: 'Legendaria', example: 'Hazañas de leyenda' },
];

// CR to XP conversion
const CR_XP_TABLE = [
    { cr: '1/8', xp: 50 },
    { cr: '1/4', xp: 100 },
    { cr: '1/2', xp: 150 },
    { cr: '1', xp: 300 },
    { cr: '2', xp: 600 },
    { cr: '3', xp: 900 },
    { cr: '4', xp: 1350 },
    { cr: '5', xp: 1800 },
    { cr: '6', xp: 2700 },
    { cr: '7', xp: 3600 },
    { cr: '8', xp: 4800 },
    { cr: '10', xp: 7200 },
    { cr: '12', xp: 12000 },
    { cr: '15', xp: 22500 },
    { cr: '20', xp: 60000 },
];

// Encounter difficulty
const ENCOUNTER_DIFFICULTY = [
    {
        level: 'Fácil',
        crRange: 'ND = Nivel del grupo - 2',
        description: 'Los PJs gastan pocos recursos. Ideal para calentar.',
        color: 'text-green-400'
    },
    {
        level: 'Media',
        crRange: 'ND = Nivel del grupo',
        description: 'Encuentro estándar. Gastan algunos recursos.',
        color: 'text-yellow-400'
    },
    {
        level: 'Difícil',
        crRange: 'ND = Nivel del grupo + 2',
        description: 'Encuentro desafiante. Pueden necesitar descansar después.',
        color: 'text-orange-400'
    },
    {
        level: 'Mortal',
        crRange: 'ND = Nivel del grupo + 4',
        description: 'Alto riesgo de muertes. Reservar para momentos épicos.',
        color: 'text-red-400'
    },
];

// Treasure by level
const TREASURE_BY_LEVEL = [
    { level: '1', coins: '300 po', items: 'Ninguno o poción menor' },
    { level: '2', coins: '600 po', items: 'Poción o pergamino nivel 1' },
    { level: '3', coins: '900 po', items: 'Poción, pergamino o arma +1' },
    { level: '4', coins: '1,200 po', items: 'Arma +1 o armadura +1' },
    { level: '5', coins: '1,600 po', items: 'Objeto maravilloso menor' },
    { level: '6-7', coins: '2,400-3,000 po', items: 'Arma +2 o anillo menor' },
    { level: '8-10', coins: '4,000-6,000 po', items: 'Objetos medianos' },
    { level: '11-15', coins: '8,000-20,000 po', items: 'Objetos mayores' },
    { level: '16-20', coins: '30,000-100,000 po', items: 'Artefactos menores' },
];

// Random NPC traits
const NPC_TRAITS = {
    personality: [
        'Nervioso y paranoico', 'Alegre y optimista', 'Gruñón y sarcástico',
        'Misterioso y críptico', 'Amable pero distraído', 'Ambicioso sin escrúpulos',
        'Cobarde pero leal', 'Honorable hasta la muerte', 'Curioso en exceso'
    ],
    quirks: [
        'Tartamudea cuando miente', 'Siempre come algo', 'Cita proverbios constantemente',
        'Habla en tercera persona', 'Ríe en momentos inapropiados', 'Colecciona algo extraño',
        'Tiene un tic nervioso', 'Susurra secretos imaginarios', 'Siempre mira sobre el hombro'
    ],
    motivations: [
        'Venganza contra alguien', 'Encontrar un ser querido', 'Pagar una deuda enorme',
        'Obtener poder/estatus', 'Proteger a su familia', 'Descubrir la verdad',
        'Escapar de su pasado', 'Cumplir una profecía', 'Simplemente sobrevivir'
    ]
};

// Quick combat modifiers
const COMBAT_MODIFIERS = [
    { situation: 'Flanqueo', modifier: '+2 al ataque' },
    { situation: 'Posición elevada', modifier: '+1 al ataque cuerpo a cuerpo' },
    { situation: 'Cargando', modifier: '+2 ataque, -2 CA' },
    { situation: 'Lucha defensiva', modifier: '-4 ataque, +2 CA' },
    { situation: 'Defensa total', modifier: 'Sin ataques, +4 CA' },
    { situation: 'Ataque de oportunidad', modifier: '+4 si enemigo se levanta/desplaza' },
    { situation: 'Derribado (prone)', modifier: '-4 ataque cuerpo a cuerpo, +4 ataque a distancia vs él' },
    { situation: 'Agarrado (grapple)', modifier: '-4 Destreza, pierde bonificador de escudo' },
];

// Improvisation tips
const IMPROV_TIPS = [
    {
        title: 'Di "Sí, y..."',
        description: 'Acepta las ideas de los jugadores y añade complicaciones interesantes.',
        icon: MessageSquare
    },
    {
        title: 'Falla hacia adelante',
        description: 'Un fallo en una tirada no significa que nada pase. Algo malo o interesante ocurre.',
        icon: Dice6
    },
    {
        title: 'Los 3 pistas',
        description: 'Para cualquier información importante, incluye al menos 3 formas de descubrirla.',
        icon: Target
    },
    {
        title: 'Nombres preparados',
        description: 'Ten una lista de nombres listos. Los jugadores hablarán con PNJs que no esperabas.',
        icon: Scroll
    },
    {
        title: 'El reloj corre',
        description: 'Si los jugadores se estancan, algo malo avanza. Añade urgencia.',
        icon: Clock
    },
    {
        title: 'Pregunta a los jugadores',
        description: '"¿Qué crees que hay ahí?" o "¿Conoces a alguien aquí?" involúcralos en la narrativa.',
        icon: Brain
    }
];

// Session zero checklist
const SESSION_ZERO = [
    'Tono de la campaña (serio, cómico, mixto)',
    'Temas sensibles a evitar',
    'Nivel de violencia/romance',
    'PvP: ¿permitido o prohibido?',
    'Reglas de muerte de personajes',
    'Frecuencia y duración de sesiones',
    'Método de comunicación entre sesiones',
    'Expectativas de asistencia',
    'Reglas caseras que se usarán',
    'Cómo manejar ausencias'
];

// Common rulings
const COMMON_RULINGS = [
    {
        question: '¿Puedo atacar mientras estoy agarrado?',
        answer: 'Sí, con armas ligeras o naturales, pero con -4 al ataque.'
    },
    {
        question: '¿La visión en la oscuridad ve a través de Oscuridad mágica?',
        answer: 'No. Oscuridad mágica crea oscuridad sobrenatural que bloquea la visión en la oscuridad normal.'
    },
    {
        question: '¿Puedo usar Sanar para estabilizar en combate?',
        answer: 'Sí, es una acción estándar (CD 15). Provoca ataques de oportunidad.'
    },
    {
        question: '¿Cuánto tarda identificar un objeto mágico?',
        answer: 'Detectar magia + Conocimiento Arcano CD 15+nivel del conjuro. Identificar es instantáneo pero cuesta 100 po.'
    },
    {
        question: '¿Qué pasa si un conjuro dice "criatura voluntaria"?',
        answer: 'Una criatura inconsciente o dormida cuenta como voluntaria. Una criatura puede resistirse si lo desea.'
    },
    {
        question: '¿Puedo preparar una acción fuera de combate?',
        answer: 'Sí, pero solo puedes mantener la preparación durante 1 asalto (6 segundos).'
    }
];

export default function DMScreenPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
                <Link href="/reglas">
                    <Button variant="ghost" size="sm" className="mb-4 text-dungeon-400 hover:text-dungeon-200">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a Reglas
                    </Button>
                </Link>
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                        <Shield className="h-8 w-8 text-red-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-dungeon-100">Pantalla del DM</h1>
                        <p className="text-dungeon-400">Herramientas y referencias rápidas para Dungeon Masters</p>
                    </div>
                </div>
            </div>

            {/* Introduction */}
            <Card className="mb-8 bg-red-900/20 border-red-500/30">
                <CardContent className="p-6">
                    <div className="flex gap-3">
                        <Info className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div className="text-dungeon-300 space-y-2">
                            <p>
                                Bienvenido, <strong className="text-red-400">Dungeon Master</strong>. Esta sección contiene
                                todo lo que necesitas para dirigir sesiones fluidas: tablas de referencia rápida, guías
                                de improvisación, y herramientas para crear encuentros memorables.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* First Time DM Guide - Highlighted */}
            <Link href="/dm-screen/guia-principiante" className="block mb-8 group">
                <Card className="bg-gradient-to-r from-pink-900/30 via-purple-900/30 to-blue-900/30 border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-[1.01]">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-pink-500/20 border border-pink-500/30 group-hover:bg-pink-500/30 transition-colors">
                                <GraduationCap className="h-8 w-8 text-pink-400" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-pink-300 group-hover:text-pink-200 transition-colors flex items-center gap-2">
                                    <PartyPopper className="h-5 w-5" />
                                    ¿Primera vez como DM?
                                    <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h2>
                                <p className="text-dungeon-300 mt-1">
                                    No te preocupes, todos empezamos así. Esta guía sin estrés te enseña lo esencial:
                                    reglas de oro, errores comunes, y cómo estructurar tu primera sesión.
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm font-medium">
                                    Recomendado
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            {/* DM-Specific Sections */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-red-400" />
                    Secciones para el DM
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {DM_SECTIONS.map((section) => (
                        <Link key={section.href} href={section.href} className="group">
                            <Card className={`h-full bg-dungeon-900/50 border-dungeon-700 hover:${section.borderColor} transition-all duration-300 hover:scale-[1.02]`}>
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg ${section.bgColor}`}>
                                            <section.icon className={`h-5 w-5 ${section.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`font-semibold ${section.color} group-hover:text-dungeon-100 transition-colors flex items-center gap-1`}>
                                                {section.name}
                                                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </h3>
                                            <p className="text-sm text-dungeon-400 mt-1">{section.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Quick Reference Tables */}
            <div className="grid lg:grid-cols-2 gap-6 mb-10">
                {/* DC Reference */}
                <section>
                    <h2 className="text-xl font-bold text-dungeon-100 mb-3 flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-400" />
                        Clases de Dificultad (CD)
                    </h2>
                    <Card className="bg-dungeon-900/50 border-dungeon-700">
                        <CardContent className="p-0">
                            <table className="w-full text-sm">
                                <thead className="bg-dungeon-800/50">
                                    <tr>
                                        <th className="text-left p-2 text-dungeon-300">CD</th>
                                        <th className="text-left p-2 text-dungeon-300">Dificultad</th>
                                        <th className="text-left p-2 text-dungeon-300">Ejemplo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DC_REFERENCE.map((row, idx) => (
                                        <tr key={row.dc} className={idx % 2 === 0 ? 'bg-dungeon-800/20' : ''}>
                                            <td className="p-2 text-gold-400 font-bold">{row.dc}</td>
                                            <td className="p-2 text-dungeon-200">{row.difficulty}</td>
                                            <td className="p-2 text-dungeon-400 text-xs">{row.example}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </section>

                {/* CR to XP */}
                <section>
                    <h2 className="text-xl font-bold text-dungeon-100 mb-3 flex items-center gap-2">
                        <Skull className="h-5 w-5 text-purple-400" />
                        ND a Experiencia (XP)
                    </h2>
                    <Card className="bg-dungeon-900/50 border-dungeon-700">
                        <CardContent className="p-3">
                            <div className="grid grid-cols-3 gap-2">
                                {CR_XP_TABLE.map((row) => (
                                    <div key={row.cr} className="bg-dungeon-800/50 p-2 rounded text-center">
                                        <div className="text-purple-400 font-bold text-sm">ND {row.cr}</div>
                                        <div className="text-dungeon-200 text-xs">{row.xp.toLocaleString()} XP</div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-dungeon-500 mt-2 text-center">
                                XP por criatura individual. Dividir entre el grupo.
                            </p>
                        </CardContent>
                    </Card>
                </section>
            </div>

            {/* Encounter Building */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                    <Swords className="h-6 w-6 text-red-400" />
                    Construcción de Encuentros
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {ENCOUNTER_DIFFICULTY.map((enc) => (
                        <Card key={enc.level} className="bg-dungeon-900/50 border-dungeon-700">
                            <CardContent className="p-4 text-center">
                                <h3 className={`font-bold text-lg ${enc.color}`}>{enc.level}</h3>
                                <p className="text-sm text-dungeon-300 font-mono mt-1">{enc.crRange}</p>
                                <p className="text-xs text-dungeon-400 mt-2">{enc.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Card className="mt-4 bg-dungeon-900/50 border-dungeon-700">
                    <CardContent className="p-4">
                        <h4 className="font-semibold text-dungeon-200 mb-2 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-yellow-400" />
                            Consejos de Encuentros
                        </h4>
                        <ul className="text-sm text-dungeon-300 space-y-1">
                            <li>• <strong>Múltiples enemigos débiles</strong> son más peligrosos de lo que parece (acción economy)</li>
                            <li>• <strong>El terreno importa</strong>: Cobertura, terreno difícil y altura cambian todo</li>
                            <li>• <strong>Mezcla tipos</strong>: Combina cuerpo a cuerpo, distancia y magia para variedad</li>
                            <li>• <strong>Ten un plan de escape</strong>: Los enemigos inteligentes huyen si están perdiendo</li>
                            <li>• <strong>4-6 encuentros/día</strong>: Este es el balance esperado para recursos del grupo</li>
                        </ul>
                    </CardContent>
                </Card>
            </section>

            {/* Combat Quick Reference */}
            <section className="mb-10">
                <h2 className="text-xl font-bold text-dungeon-100 mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    Modificadores de Combate Rápidos
                </h2>
                <Card className="bg-dungeon-900/50 border-dungeon-700">
                    <CardContent className="p-3">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                            {COMBAT_MODIFIERS.map((mod) => (
                                <div key={mod.situation} className="bg-dungeon-800/50 p-2 rounded">
                                    <div className="text-dungeon-200 font-medium text-sm">{mod.situation}</div>
                                    <div className="text-yellow-400 text-xs">{mod.modifier}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Treasure */}
            <section className="mb-10">
                <h2 className="text-xl font-bold text-dungeon-100 mb-3 flex items-center gap-2">
                    <Coins className="h-5 w-5 text-gold-400" />
                    Tesoro por Nivel
                </h2>
                <Card className="bg-dungeon-900/50 border-dungeon-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-dungeon-800/50">
                                <tr>
                                    <th className="text-left p-2 text-dungeon-300">Nivel</th>
                                    <th className="text-left p-2 text-dungeon-300">Monedas</th>
                                    <th className="text-left p-2 text-dungeon-300">Objetos Sugeridos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TREASURE_BY_LEVEL.map((row, idx) => (
                                    <tr key={row.level} className={idx % 2 === 0 ? 'bg-dungeon-800/20' : ''}>
                                        <td className="p-2 text-gold-400 font-bold">{row.level}</td>
                                        <td className="p-2 text-dungeon-200">{row.coins}</td>
                                        <td className="p-2 text-dungeon-400 text-xs">{row.items}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>

            {/* NPC Generation */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                    <Users className="h-6 w-6 text-blue-400" />
                    Generador Rápido de PNJs
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-dungeon-900/50 border-dungeon-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-blue-400 text-lg flex items-center gap-2">
                                <Heart className="h-4 w-4" />
                                Personalidad
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-dungeon-300 space-y-1">
                                {NPC_TRAITS.personality.map((trait, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="text-blue-500">{idx + 1}.</span>
                                        <span>{trait}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-dungeon-900/50 border-dungeon-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-purple-400 text-lg flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                Manías/Quirks
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-dungeon-300 space-y-1">
                                {NPC_TRAITS.quirks.map((quirk, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="text-purple-500">{idx + 1}.</span>
                                        <span>{quirk}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-dungeon-900/50 border-dungeon-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-green-400 text-lg flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                Motivaciones
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-dungeon-300 space-y-1">
                                {NPC_TRAITS.motivations.map((mot, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="text-green-500">{idx + 1}.</span>
                                        <span>{mot}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                <p className="text-xs text-dungeon-500 mt-2 text-center">
                    Tira 1d10 en cada columna para un PNJ instantáneo, o elige lo que encaje.
                </p>
            </section>

            {/* Improvisation Tips */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                    <Brain className="h-6 w-6 text-pink-400" />
                    Técnicas de Improvisación
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {IMPROV_TIPS.map((tip) => (
                        <Card key={tip.title} className="bg-dungeon-900/50 border-dungeon-700">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-pink-500/20">
                                        <tip.icon className="h-5 w-5 text-pink-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-pink-400">{tip.title}</h3>
                                        <p className="text-sm text-dungeon-300 mt-1">{tip.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Common Rulings */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                    <Scale className="h-6 w-6 text-cyan-400" />
                    Resoluciones Comunes
                </h2>
                <Card className="bg-dungeon-900/50 border-dungeon-700">
                    <CardContent className="p-4 space-y-4">
                        {COMMON_RULINGS.map((ruling, idx) => (
                            <div key={idx} className="border-b border-dungeon-700 last:border-0 pb-3 last:pb-0">
                                <p className="text-dungeon-200 font-medium flex items-start gap-2">
                                    <HelpCircle className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    {ruling.question}
                                </p>
                                <p className="text-sm text-dungeon-400 mt-1 flex items-start gap-2 ml-6">
                                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    {ruling.answer}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            {/* Session Zero */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                    <Star className="h-6 w-6 text-gold-400" />
                    Checklist de Sesión Cero
                </h2>
                <Card className="bg-gold-900/20 border-gold-500/30">
                    <CardContent className="p-4">
                        <p className="text-dungeon-300 mb-4">
                            La <strong className="text-gold-400">Sesión Cero</strong> es donde estableces expectativas
                            con tus jugadores antes de empezar la campaña. Cubre estos temas:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2">
                            {SESSION_ZERO.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                    <div className="h-4 w-4 border border-gold-500/50 rounded flex-shrink-0" />
                                    <span className="text-dungeon-200">{item}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Emergency Tables */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                    <Flame className="h-6 w-6 text-orange-400" />
                    Tablas de Emergencia
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-dungeon-900/50 border-dungeon-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-orange-400 text-lg">¿Qué pasa ahora? (d8)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ol className="text-sm text-dungeon-300 space-y-1">
                                <li>1. Llegan refuerzos enemigos</li>
                                <li>2. El entorno cambia (fuego, inundación, derrumbe)</li>
                                <li>3. Aparece un tercero con sus propios intereses</li>
                                <li>4. Se revela información crucial</li>
                                <li>5. Un aliado está en peligro</li>
                                <li>6. El tiempo se acaba (ritual, bomba, etc.)</li>
                                <li>7. Oportunidad de negociación/rendición</li>
                                <li>8. Giro dramático (traición, revelación)</li>
                            </ol>
                        </CardContent>
                    </Card>

                    <Card className="bg-dungeon-900/50 border-dungeon-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-orange-400 text-lg">Complicaciones de Viaje (d8)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ol className="text-sm text-dungeon-300 space-y-1">
                                <li>1. Clima extremo (tormenta, calor, frío)</li>
                                <li>2. El camino está bloqueado</li>
                                <li>3. Viajeros en apuros piden ayuda</li>
                                <li>4. Cruce de caminos con decisión</li>
                                <li>5. Ruinas misteriosas a la vista</li>
                                <li>6. Criaturas hostiles en el camino</li>
                                <li>7. Mercader ambulante con objetos raros</li>
                                <li>8. Señales de algo grande que pasó aquí</li>
                            </ol>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA */}
            <div className="mt-8 text-center">
                <p className="text-dungeon-400 mb-4">¿Necesitas más herramientas para tu campaña?</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/monstruos">
                        <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                            <Bug className="h-4 w-4 mr-2" />
                            Bestiario
                        </Button>
                    </Link>
                    <Link href="/objetos">
                        <Button variant="outline" className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10">
                            <Coins className="h-4 w-4 mr-2" />
                            Objetos
                        </Button>
                    </Link>
                    <Link href="/conjuros">
                        <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Conjuros
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
