import { Metadata } from 'next';
import Link from 'next/link';
import {
    ArrowLeft,
    Sparkles,
    Heart,
    Users,
    BookOpen,
    Lightbulb,
    MessageCircle,
    Clock,
    Target,
    Shield,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Zap,
    Coffee,
    Map,
    Swords,
    HelpCircle,
    Star,
    ThumbsUp,
    Volume2,
    Eye,
    Pause,
    Dice6,
    Flame,
    Video,
    Globe,
    Gavel
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Guía para DMs Principiantes - Tu Primera Partida | Compendio Arcano',
    description: 'Consejos esenciales para tu primera vez como Dungeon Master. Aprende a narrar, manejar jugadores y crear aventuras memorables sin estrés.',
};

interface Tip {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

interface Mistake {
    wrong: string;
    right: string;
    explanation: string;
}

interface Phase {
    name: string;
    duration: string;
    tips: string[];
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

const GOLDEN_RULES: Tip[] = [
    {
        title: 'La diversión es lo primero',
        description: 'Si todos se están divirtiendo, estás haciendo un buen trabajo. Las reglas son una guía, no una ley. Si una regla arruina la diversión, ignórala.',
        icon: Heart,
        color: 'text-pink-400'
    },
    {
        title: 'Di "Sí, y..." o "Sí, pero..."',
        description: 'En lugar de decir "no puedes hacer eso", intenta "sí, puedes intentarlo, pero será difícil" o "sí, y además descubres que...". Fomenta la creatividad.',
        icon: Sparkles,
        color: 'text-yellow-400'
    },
    {
        title: 'No eres el enemigo de los jugadores',
        description: 'Tu trabajo es crear desafíos interesantes, no destruir a los personajes. Quieres que los héroes triunfen... eventualmente.',
        icon: Users,
        color: 'text-blue-400'
    },
    {
        title: 'Está bien no saber algo',
        description: '"No estoy seguro de esa regla, déjame buscarla" o "Vamos a resolverlo así por ahora y lo verificamos después" son respuestas perfectamente válidas.',
        icon: HelpCircle,
        color: 'text-purple-400'
    },
    {
        title: 'Prepara situaciones, no soluciones',
        description: 'Crea problemas interesantes y deja que los jugadores encuentren las soluciones. Te sorprenderán con ideas que nunca imaginaste.',
        icon: Lightbulb,
        color: 'text-amber-400'
    },
    {
        title: 'Menos es más',
        description: 'Es mejor tener una aventura corta y memorable que una épica que nunca termina. Empieza pequeño: una mazmorra, un pueblo, un villano.',
        icon: Target,
        color: 'text-green-400'
    }
];

const COMMON_MISTAKES: Mistake[] = [
    {
        wrong: 'Preparar cada detalle de la historia',
        right: 'Preparar situaciones flexibles',
        explanation: 'Los jugadores SIEMPRE harán algo inesperado. Ten un villano con motivaciones claras y algunos encuentros listos, pero deja espacio para improvisar.'
    },
    {
        wrong: 'Leer todas las reglas antes de empezar',
        right: 'Conocer lo básico y aprender sobre la marcha',
        explanation: 'Solo necesitas saber: cómo tirar dados, cómo funciona el combate básico, y cómo hacer pruebas de habilidad. El resto lo aprenderás jugando.'
    },
    {
        wrong: 'Hacer que todo sea "realista"',
        right: 'Hacer que todo sea "divertido"',
        explanation: '¿Es realista que un bárbaro salte 10 metros? No. ¿Es épico? Sí. D&D es fantasía heroica, no simulación medieval.'
    },
    {
        wrong: 'Competir contra los jugadores',
        right: 'Colaborar para contar una historia',
        explanation: 'Si quisieras "ganar", podrías matar a todos los personajes en la primera sesión. Pero eso no es divertido para nadie.'
    },
    {
        wrong: 'Nunca matar personajes',
        right: 'Dejar que las consecuencias sean reales',
        explanation: 'Si nunca hay riesgo real, no hay tensión. Pero la muerte debe sentirse justa, no arbitraria. Advierte cuando algo es peligroso.'
    },
    {
        wrong: 'Seguir el módulo al pie de la letra',
        right: 'Adaptar el módulo a tu mesa',
        explanation: 'Los módulos son guías, no escrituras sagradas. Cambia nombres, ajusta dificultades, elimina lo que no te guste.'
    }
];

const FIRST_SESSION_PHASES: Phase[] = [
    {
        name: 'Antes de empezar',
        duration: '15-30 min',
        tips: [
            'Confirma que todos tienen sus personajes listos',
            'Explica brevemente el tono de la aventura',
            'Establece expectativas: "Hoy haremos X"',
            'Ten snacks y bebidas (¡importante!)',
            'Pon música ambiental de fondo (opcional pero genial)'
        ],
        icon: Coffee,
        color: 'text-amber-400'
    },
    {
        name: 'La introducción',
        duration: '10-15 min',
        tips: [
            'Describe dónde están los personajes',
            'Dale a cada jugador un momento para presentarse',
            'Introduce el gancho de la aventura claramente',
            'No hagas un monólogo de 20 minutos',
            'Termina con una pregunta: "¿Qué van a hacer?"'
        ],
        icon: BookOpen,
        color: 'text-blue-400'
    },
    {
        name: 'Exploración y roleplay',
        duration: '30-60 min',
        tips: [
            'Deja que los jugadores investiguen a su ritmo',
            'Da información cuando pregunten',
            'Usa NPCs para dar pistas si se atascan',
            'No tengas miedo de los silencios - están pensando',
            'Celebra las buenas ideas de los jugadores'
        ],
        icon: Map,
        color: 'text-green-400'
    },
    {
        name: 'El combate',
        duration: '30-45 min',
        tips: [
            'Ten las estadísticas de los monstruos a mano',
            'Describe las acciones de forma épica',
            'Mantén el ritmo - si alguien tarda, pasa al siguiente',
            'Está bien hacer las tiradas en secreto',
            'Si el combate se alarga, los enemigos pueden huir'
        ],
        icon: Swords,
        color: 'text-red-400'
    },
    {
        name: 'El cierre',
        duration: '10-15 min',
        tips: [
            'Resume lo que lograron los personajes',
            'Intenta no cortar en medio de un combate',
            'Pregunta qué les gustó de la sesión',
            'Agenda la próxima fecha YA',
            'Agradece a todos'
        ],
        icon: Star,
        color: 'text-yellow-400'
    }
];

const DM_ROLES: Tip[] = [
    {
        title: 'Actor',
        description: 'Interpretas a los monstruos y a todos los que los personajes conocen.',
        icon: Video,
        color: 'text-pink-400'
    },
    {
        title: 'Director',
        description: 'Decides el ritmo y lo que "enfoca" la cámara.',
        icon: Video,
        color: 'text-yellow-400'
    },
    {
        title: 'Improvisador',
        description: 'Reaccionas ante lo inesperado para que la historia siga.',
        icon: Sparkles,
        color: 'text-purple-400'
    },
    {
        title: 'Árbitro',
        description: 'Interpretas las reglas de forma justa cuando hay dudas.',
        icon: Gavel,
        color: 'text-blue-400'
    },
    {
        title: 'Narrador',
        description: 'Creas ganchos y situaciones que invitan a la aventura.',
        icon: BookOpen,
        color: 'text-amber-400'
    },
    {
        title: 'Maestro',
        description: 'Enseñas el juego a los nuevos (¡y aprendes con ellos!)',
        icon: Lightbulb,
        color: 'text-green-400'
    },
    {
        title: 'Constructor de Mundos',
        description: 'Creas el escenario donde todo ocurre (o lo haces tuyo).',
        icon: Globe,
        color: 'text-cyan-400'
    }
];

const NARRATION_TIPS: Tip[] = [
    {
        title: 'Usa los cinco sentidos',
        description: '"Entran en la taberna. Huele a cerveza rancia y sudor. El fuego crepita en la chimenea. Un bardo desafina en la esquina."',
        icon: Eye,
        color: 'text-cyan-400'
    },
    {
        title: 'Varía el volumen y ritmo',
        description: 'Susurra para momentos tensos. Habla rápido en persecuciones. Haz pausas dramáticas antes de revelaciones.',
        icon: Volume2,
        color: 'text-purple-400'
    },
    {
        title: 'No describas todo',
        description: 'Deja que los jugadores pregunten. "Hay algo extraño en la habitación" es mejor que describir cada objeto.',
        icon: HelpCircle,
        color: 'text-amber-400'
    },
    {
        title: 'Usa voces (si quieres)',
        description: 'No necesitas ser actor de doblaje. Un pequeño cambio de tono o acento ya diferencia a los NPCs.',
        icon: MessageCircle,
        color: 'text-pink-400'
    }
];

const PROBLEM_SOLUTIONS = [
    {
        problem: 'Los jugadores no saben qué hacer',
        solutions: [
            'Un NPC les da una pista directa',
            'Algo explota o ataca - ahora tienen un problema inmediato',
            'Pregunta: "¿Qué quiere hacer tu personaje?"',
            'Ofrece 2-3 opciones claras'
        ]
    },
    {
        problem: 'Un jugador domina la conversación',
        solutions: [
            '"Mientras [nombre] hace eso, ¿qué hace [otro]?"',
            'Dirige preguntas específicas a jugadores callados',
            'Crea situaciones donde diferentes habilidades brillen',
            'Habla con el jugador en privado si persiste'
        ]
    },
    {
        problem: 'Los jugadores discuten entre ellos',
        solutions: [
            'Deja que lo resuelvan en personaje (roleplay)',
            'Pon un límite de tiempo: "Tienen 2 minutos para decidir"',
            'Si es fuera de personaje, toma un descanso',
            'Recuerda: el conflicto entre personajes puede ser divertido'
        ]
    },
    {
        problem: 'El combate se hace eterno',
        solutions: [
            'Los enemigos se rinden o huyen',
            'Llegan refuerzos... para los jugadores',
            'Describe el final de forma narrativa',
            'Para la próxima vez: menos enemigos, más peligrosos'
        ]
    },
    {
        problem: 'Alguien quiere hacer algo "imposible"',
        solutions: [
            'Deja que lo intenten con una CD muy alta',
            '"Puedes intentarlo, pero las consecuencias serán..."',
            'Ofrece una alternativa más factible',
            'A veces, solo di que sí - es fantasía'
        ]
    }
];

const ENCOURAGEMENT = [
    'Tu primera sesión NO será perfecta, y eso está bien.',
    'Los jugadores no conocen tus planes, así que no pueden saber si "te equivocas".',
    'Si todos se rieron al menos una vez, fue una buena sesión.',
    'Cada DM veterano empezó exactamente donde estás tú ahora.',
    'Los errores son historias graciosas para contar después.',
    'Tus jugadores QUIEREN que tengas éxito. Están de tu lado.'
];

export default function GuiaPrincipiantePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Back Button */}
            <Link href="/dm-screen">
                <Button variant="ghost" size="sm" className="mb-4 text-dungeon-400 hover:text-dungeon-200">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver a Pantalla del DM
                </Button>
            </Link>

            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-dungeon-950 via-dungeon-900/90 to-red-950/30" />
                <div className="relative p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-4">
                        <Shield className="h-12 w-12 text-red-400" />
                        <div>
                            <div className="text-xs font-mono uppercase tracking-wider text-red-400 mb-2">
                                Guía para Principiantes
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-red-400">
                                Tu Primera Vez como DM
                            </h1>
                        </div>
                    </div>
                    <p className="text-lg text-dungeon-300 leading-relaxed max-w-3xl">
                        Una guía sin estrés para nuevos Dungeon Masters. Aprende a narrar, manejar jugadores y crear aventuras memorables.
                    </p>
                </div>
            </div>

            <div className="space-y-10">
                    {/* Encouragement Banner */}
                    <div className="bg-gradient-to-r from-pink-900/30 via-purple-900/30 to-blue-900/30 border border-pink-500/30 rounded-lg p-6">
                        <div className="flex gap-4 items-start">
                            <Heart className="h-8 w-8 text-pink-400 flex-shrink-0 animate-pulse" />
                            <div>
                                <h2 className="text-xl font-bold text-pink-300 mb-2">¡Vas a hacerlo genial!</h2>
                                <p className="text-dungeon-300 leading-relaxed">
                                    Ser DM por primera vez puede dar nervios, pero recuerda: no existe la sesión
                                    "perfecta". Si tú y tus amigos se divierten, ya ganaste. Esta guía te dará
                                    las herramientas básicas, pero la más importante ya la tienes: las ganas de
                                    crear algo especial con tus amigos.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Golden Rules */}
                    <section>
                        <h2 className="text-2xl font-bold text-gold-400 mb-4 flex items-center gap-2">
                            <Star className="h-6 w-6" />
                            Las 6 Reglas de Oro
                        </h2>
                        <p className="text-dungeon-400 mb-6">
                            Memoriza estas y estarás mejor preparado que muchos DMs con años de experiencia.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {GOLDEN_RULES.map((rule, idx) => (
                                <div key={idx} className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg p-4 hover:border-dungeon-600 transition-colors">
                                    <div className="flex gap-3">
                                        <rule.icon className={`h-6 w-6 ${rule.color} flex-shrink-0 mt-1`} />
                                        <div>
                                            <h3 className="font-bold text-dungeon-100 mb-1">{rule.title}</h3>
                                            <p className="text-sm text-dungeon-300">{rule.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* The 7 Roles of a DM */}
                    <section>
                        <h2 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
                            <Users className="h-6 w-6" />
                            Los 7 Roles del DM
                        </h2>
                        <p className="text-dungeon-400 mb-6">
                            Ser DM es desempeñar muchos papeles a la vez. No tienes que ser perfecto en todos, ¡pero es divertido intentarlo!
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {DM_ROLES.map((role, idx) => (
                                <div key={idx} className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg p-4">
                                    <div className="flex gap-3">
                                        <role.icon className={`h-5 w-5 ${role.color} flex-shrink-0 mt-1`} />
                                        <div>
                                            <h3 className="font-bold text-dungeon-100 mb-1">{role.title}</h3>
                                            <p className="text-sm text-dungeon-300">{role.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* The DM's Secret - Fudging Rolls */}
                    <div className="bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-purple-900/30 border border-purple-500/30 rounded-lg p-6">
                        <div className="flex gap-4 items-start">
                            <div className="p-3 rounded-full bg-purple-500/20 border border-purple-500/30">
                                <Dice6 className="h-8 w-8 text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-purple-300 mb-3 flex items-center gap-2">
                                    <Dice6 className="h-5 w-5" />
                                    El Secreto Mejor Guardado del DM
                                </h2>
                                <p className="text-dungeon-300 mb-4 leading-relaxed">
                                    <strong className="text-purple-200">Puedes mentir tus tiradas.</strong> Sí, leíste bien.
                                    El DM tira sus dados detrás de la pantalla por una razón: la narrativa está por encima
                                    de los números.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div className="bg-dungeon-800/50 p-3 rounded-lg border border-dungeon-700">
                                        <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4" />
                                            Cuándo "ajustar" tiradas:
                                        </h4>
                                        <ul className="text-sm text-dungeon-300 space-y-1">
                                            <li>• Un crítico mataría al héroe en su momento de gloria</li>
                                            <li>• El combate final sería anticlimático si el villano muere al primer golpe</li>
                                            <li>• Un fallo arruinaría un momento épico de roleplay</li>
                                            <li>• Los jugadores están desmotivados por una racha de mala suerte</li>
                                        </ul>
                                    </div>
                                    <div className="bg-dungeon-800/50 p-3 rounded-lg border border-dungeon-700">
                                        <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                                            <XCircle className="h-4 w-4" />
                                            Cuándo NO hacerlo:
                                        </h4>
                                        <ul className="text-sm text-dungeon-300 space-y-1">
                                            <li>• Para salvar a jugadores de sus propias malas decisiones (¡sin riesgo no hay gloria!)</li>
                                            <li>• Siempre a favor de los jugadores (quita tensión)</li>
                                            <li>• Para forzar un resultado hacia TÚ historia</li>
                                            <li>• Si los jugadores pueden ver tus dados</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-purple-900/30 p-3 rounded-lg border border-purple-500/20">
                                    <p className="text-sm text-purple-200 flex items-start gap-2">
                                        <Lightbulb className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                        <span>
                                            <strong>La regla de oro:</strong> Ajusta las tiradas para hacer la historia más emocionante,
                                            no para hacerla más fácil.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preparation - The One Hour Rule */}
                    <section>
                        <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
                            <Clock className="h-6 w-6" />
                            Preparación: La Regla de la Hora
                        </h2>
                        <p className="text-dungeon-400 mb-6">
                            No necesitas días para preparar. La mayoría de los grupos avanzan lento.
                            Con <strong>una hora</strong> puedes tener lista una gran sesión:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg p-6">
                                <h3 className="text-lg font-bold text-dungeon-200 mb-4"> Lo que realmente necesitas</h3>
                                <ul className="space-y-4">
                                    <li className="flex gap-3">
                                        <div className="bg-dungeon-800 p-2 rounded h-fit">
                                            <BookOpen className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <strong className="text-dungeon-100 block">1. Repasa la Historia</strong>
                                            <span className="text-sm text-dungeon-400">Lee tus notas de la sesión anterior. ¿Dónde quedaron? ¿Qué querían hacer?</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="bg-dungeon-800 p-2 rounded h-fit">
                                            <Swords className="h-4 w-4 text-red-400" />
                                        </div>
                                        <div>
                                            <strong className="text-dungeon-100 block">2. Selecciona Encuentros</strong>
                                            <span className="text-sm text-dungeon-400">Prepara 1 o 2 encuentros "Seguros" (combate o social) y ten un par de "Posibles".</span>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="bg-dungeon-800 p-2 rounded h-fit">
                                            <Map className="h-4 w-4 text-green-400" />
                                        </div>
                                        <div>
                                            <strong className="text-dungeon-100 block">3. Reúne Materiales</strong>
                                            <span className="text-sm text-dungeon-400">Mapas para los encuentros seguros y stats de los monstruos. ¡Listo!</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
                                    <CheckCircle className="h-6 w-6" />
                                    Checklist Express
                                </h3>
                                <ul className="space-y-2 text-sm text-green-200/80">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                        ¿Sabes cómo empieza la sesión?
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                        ¿Tienes un combate listo por si acaso?
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                        ¿Tienes 2 nombres de NPCs anotados?
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                        ¿Tienes a mano los dados?
                                    </li>
                                </ul>
                                <p className="mt-4 text-sm italic text-green-400 text-center">
                                    "Si tienes más tiempo, genial. Si no, con esto basta."
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Common Mistakes */}
                    <section>
                        <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                            <AlertTriangle className="h-6 w-6" />
                            Errores Comunes (y cómo evitarlos)
                        </h2>
                        <div className="space-y-4">
                            {COMMON_MISTAKES.map((mistake, idx) => (
                                <div key={idx} className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg p-4">
                                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                                        <div className="flex items-center gap-2">
                                            <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                                            <span className="text-red-300 line-through">{mistake.wrong}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                                            <span className="text-green-300 font-medium">{mistake.right}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-dungeon-400 pl-7">{mistake.explanation}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* First Session Timeline */}
                    <section>
                        <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                            <Clock className="h-6 w-6" />
                            Anatomía de Tu Primera Sesión
                        </h2>
                        <p className="text-dungeon-400 mb-6">
                            Una sesión típica dura 3-4 horas. Así es como podrías estructurarla:
                        </p>
                        <div className="space-y-4">
                            {FIRST_SESSION_PHASES.map((phase, idx) => (
                                <div key={idx} className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg overflow-hidden">
                                    <div className="px-4 py-3 bg-dungeon-800/50 border-b border-dungeon-700/50 flex items-center justify-between">
                                        <span className={`flex items-center gap-2 font-bold ${phase.color}`}>
                                            <phase.icon className="h-5 w-5" />
                                            {phase.name}
                                        </span>
                                        <span className="text-sm text-dungeon-500 font-normal">
                                            ~{phase.duration}
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <ul className="space-y-1">
                                            {phase.tips.map((tip, tipIdx) => (
                                                <li key={tipIdx} className="text-sm text-dungeon-300 flex items-start gap-2">
                                                    <span className={`${phase.color} mt-1`}>•</span>
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Narration Tips */}
                    <section>
                        <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                            <MessageCircle className="h-6 w-6" />
                            Consejos de Narración
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {NARRATION_TIPS.map((tip, idx) => (
                                <div key={idx} className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg p-4">
                                    <div className="flex gap-3">
                                        <tip.icon className={`h-5 w-5 ${tip.color} flex-shrink-0 mt-1`} />
                                        <div>
                                            <h3 className="font-bold text-dungeon-100 mb-1">{tip.title}</h3>
                                            <p className="text-sm text-dungeon-400 italic">"{tip.description}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Problem Solving */}
                    <section>
                        <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                            <Zap className="h-6 w-6" />
                            Soluciones Rápidas a Problemas Comunes
                        </h2>
                        <div className="space-y-4">
                            {PROBLEM_SOLUTIONS.map((item, idx) => (
                                <div key={idx} className="bg-dungeon-900/50 border border-dungeon-700/50 rounded-lg overflow-hidden">
                                    <div className="px-4 py-3 bg-dungeon-800/50 border-b border-dungeon-700/50">
                                        <h3 className="text-lg text-amber-300 flex items-center gap-2 font-bold">
                                            <Flame className="h-5 w-5" />
                                            {item.problem}
                                        </h3>
                                    </div>
                                    <div className="p-4">
                                        <ul className="space-y-1">
                                            {item.solutions.map((solution, solIdx) => (
                                                <li key={solIdx} className="text-sm text-dungeon-300 flex items-start gap-2">
                                                    <ThumbsUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                    {solution}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* The Pause Button */}
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
                        <div className="flex gap-4 items-start">
                            <Pause className="h-8 w-8 text-blue-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-blue-300 mb-2">El Botón de Pausa</h3>
                                <p className="text-dungeon-300 mb-3">
                                    Recuerda: siempre puedes pausar el juego. Nadie espera que seas una máquina.
                                </p>
                                <ul className="text-sm text-dungeon-400 space-y-1">
                                    <li>• Buscar una regla → "Denme un minuto para verificar esto"</li>
                                    <li>• Pensar qué pasa después → "Tomemos un descanso de 5 minutos, voy al baño"</li>
                                    <li>• Manejar una discusión → "Pausa. Hablemos de esto fuera de personaje"</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Final Encouragement */}
                    <div className="bg-gradient-to-r from-gold-900/30 via-amber-900/30 to-orange-900/30 border border-gold-500/30 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gold-400 mb-4 flex items-center gap-2">
                            <Sparkles className="h-6 w-6" />
                            Recordatorios Finales
                        </h2>
                        <div className="grid md:grid-cols-2 gap-3">
                            {ENCOURAGEMENT.map((text, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                    <Star className="h-4 w-4 text-gold-400 flex-shrink-0 mt-1" />
                                    <p className="text-sm text-dungeon-300">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-8 border-t border-dungeon-700">
                        <p className="text-dungeon-300 mb-6 text-lg">
                            ¿Listo para las herramientas técnicas? La Pantalla del DM tiene todo lo que necesitas.
                        </p>
                        <Link href="/dm-screen">
                            <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white border-0">
                                <Shield className="h-5 w-5 mr-2" />
                                Ir a la Pantalla del DM
                            </Button>
                        </Link>
                    </div>
            </div>
        </div>
    );
}
