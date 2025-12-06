'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowLeft, BookOpen, Dices, Users, Sword, Shield, Brain, Heart, Eye, Sparkles, Target, Zap, TrendingUp, Film, Gamepad2, Theater, User, ScrollText, Map, Coins, Award } from 'lucide-react';
import { D4Icon, D6Icon, D8Icon, D10Icon, D12Icon, D20Icon } from '@/lib/utils/diceIcons';
import Link from 'next/link';

export default function IntroduccionPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Back to Rules */}
      <Link
        href="/reglas"
        className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors mb-6 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Volver a Reglas
      </Link>

      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-dungeon-950 via-dungeon-900/90 to-gold-950/30" />
        <div className="relative p-8 md:p-12">
          <div className="flex items-center gap-4 mb-4">
            <BookOpen className="h-12 w-12 text-gold-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-gold-400">
              Cómo Jugar D&amp;D 3.5
            </h1>
          </div>
          <p className="text-dungeon-300 text-lg max-w-3xl">
            Guía completa para principiantes: Todo lo que necesitás saber para empezar tu aventura en el mundo de Dungeons &amp; Dragons 3.5
          </p>
        </div>
      </div>

      {/* TL;DR Box */}
      <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/20 to-dungeon-900 border-2 border-green-500/40 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
          <Target className="h-6 w-6" />
          En Resumen
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-dungeon-300">
          <div>
            <p className="font-semibold text-green-400 mb-2">● Lo Básico:</p>
            <p className="ml-4">D&amp;D es un juego de rol donde creás un personaje y vivís aventuras en un mundo de fantasía. Un jugador (el DM) describe el mundo, y vos decidís qué hace tu personaje.</p>
          </div>
          <div>
            <p className="font-semibold text-green-400 mb-2">● Cómo se Juega:</p>
            <p className="ml-4">Tirás dados para resolver acciones. El dado más importante es el d20 (dado de 20 caras). Sumás bonificadores de tu personaje y comparás con la dificultad de la acción.</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-dungeon-800/50 border border-dungeon-700 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-4">Navegación Rápida</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '#que-es', icon: BookOpen, label: '¿Qué es?' },
            { href: '#como-se-juega', icon: Dices, label: 'Cómo se Juega' },
            { href: '#crear-personaje', icon: User, label: 'Crear Personaje' },
            { href: '#habilidades', icon: Brain, label: 'Habilidades' },
            { href: '#dados', icon: Target, label: 'Sistema de Dados' },
            { href: '#combate', icon: Sword, label: 'Combate' },
            { href: '#equipamiento', icon: Coins, label: 'Equipamiento' },
            { href: '#recursos', icon: ScrollText, label: 'Recursos' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-dungeon-400 hover:text-gold-400 transition-colors p-2 rounded hover:bg-dungeon-800"
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ¿Qué es D&D? */}
      <Card id="que-es" className="card border-purple-500/30 mb-8">
        <CardHeader className="bg-gradient-to-r from-purple-500/25 to-transparent pb-3">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <BookOpen className="h-6 w-6 text-purple-400" />
            <span className="text-purple-400">¿Qué es Dungeons &amp; Dragons?</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-dungeon-300 leading-relaxed">
            D&amp;D es un <strong>juego de rol de mesa</strong> donde vos y tus amigos crean una historia juntos. No es como un videojuego o un juego de mesa tradicional: acá no hay "ganar" o "perder", sino crear una aventura épica colaborativa.
          </p>

          <div className="bg-purple-900/20 border-l-4 border-purple-400 p-4 rounded">
            <p className="text-purple-300 font-semibold mb-2">Analogías para entenderlo mejor:</p>
            <div className="space-y-2 text-dungeon-300">
              <p>● <strong>Como una película improvisada:</strong> El DM es el director que describe el mundo, pero vos decidís qué hace tu personaje. No hay guion escrito.</p>
              <p>● <strong>Como un videojuego de mundo abierto:</strong> Podés hacer lo que quieras. ¿Querés negociar con el dragón en vez de pelear? Adelante. ¿Querés ignorar la misión principal y abrir una taberna? También.</p>
              <p>● <strong>Como teatro participativo:</strong> Todos están actuando sus personajes y reaccionando a lo que pasa en el momento.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-dungeon-800/50 border border-dungeon-700 rounded-lg p-4">
              <Film className="h-8 w-8 text-purple-400 mb-2" />
              <h4 className="font-semibold text-purple-400 mb-2">Narrativa Colaborativa</h4>
              <p className="text-sm text-dungeon-400">Todos contribuyen a la historia que se está contando</p>
            </div>
            <div className="bg-dungeon-800/50 border border-dungeon-700 rounded-lg p-4">
              <Gamepad2 className="h-8 w-8 text-purple-400 mb-2" />
              <h4 className="font-semibold text-purple-400 mb-2">Libertad Total</h4>
              <p className="text-sm text-dungeon-400">No hay límites excepto tu imaginación y las reglas del mundo</p>
            </div>
            <div className="bg-dungeon-800/50 border border-dungeon-700 rounded-lg p-4">
              <Theater className="h-8 w-8 text-purple-400 mb-2" />
              <h4 className="font-semibold text-purple-400 mb-2">Interpretación</h4>
              <p className="text-sm text-dungeon-400">Actuás como tu personaje, con su personalidad y motivaciones</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cómo se Juega */}
      <Card id="como-se-juega" className="card border-blue-500/30 mb-8">
        <CardHeader className="bg-gradient-to-r from-blue-500/25 to-transparent pb-3">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Users className="h-6 w-6 text-blue-400" />
            <span className="text-blue-400">¿Cómo se Juega?</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-dungeon-300 leading-relaxed">
            El juego se divide en dos roles principales: el <strong className="text-blue-400">Dungeon Master (DM)</strong> y los <strong className="text-blue-400">Jugadores</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-5">
              <h4 className="font-bold text-blue-400 text-lg mb-3 flex items-center gap-2">
                <ScrollText className="h-5 w-5" />
                El Dungeon Master (DM)
              </h4>
              <ul className="space-y-2 text-dungeon-300">
                <li>● Describe el mundo y lo que pasa en él</li>
                <li>● Controla a los NPCs (personajes no jugadores) y monstruos</li>
                <li>● Arbitra las reglas y decide cómo resolver situaciones</li>
                <li>● Crea o adapta la aventura que van a jugar</li>
                <li>● No es "enemigo" de los jugadores, es el narrador</li>
              </ul>
            </div>

            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-5">
              <h4 className="font-bold text-green-400 text-lg mb-3 flex items-center gap-2">
                <User className="h-5 w-5" />
                Los Jugadores
              </h4>
              <ul className="space-y-2 text-dungeon-300">
                <li>● Crean y controlan un personaje (PC - Player Character)</li>
                <li>● Deciden qué hace su personaje en cada situación</li>
                <li>● Tiran dados para resolver acciones inciertas</li>
                <li>● Colaboran con el resto del grupo</li>
                <li>● Interpretan a su personaje y toman decisiones</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
            <p className="text-blue-300 font-semibold mb-2">Ejemplo de Juego:</p>
            <div className="space-y-2 text-dungeon-300 text-sm">
              <p><strong className="text-blue-400">DM:</strong> "Entrás a la taberna. Está llena de humo y ruido. Un enano borracho te mira con desconfianza."</p>
              <p><strong className="text-green-400">Jugador:</strong> "Me acerco al enano y le pregunto si ha visto pasar a un grupo de bandidos."</p>
              <p><strong className="text-blue-400">DM:</strong> "Hacé una tirada de Diplomacia para convencerlo de que confíe en vos."</p>
              <p><strong className="text-green-400">Jugador:</strong> "Tiré un 15 en el d20, más mi bonificador de +5... 20 total."</p>
              <p><strong className="text-blue-400">DM:</strong> "El enano se relaja. 'Sí, los vi hace dos horas. Fueron hacia el norte, al bosque...'"</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crear Personaje */}
      <Card id="crear-personaje" className="card border-gold-500/30 mb-8">
        <CardHeader className="bg-gradient-to-r from-gold-500/25 to-transparent pb-3">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <User className="h-6 w-6 text-gold-400" />
            <span className="text-gold-400">Crear tu Personaje</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-dungeon-300 leading-relaxed">
            Tu personaje es tu avatar en el mundo de D&amp;D. Lo definís con varias características:
          </p>

          <div className="grid gap-4">
            <div className="bg-dungeon-800/50 border border-gold-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-gold-400 mb-2 flex items-center gap-2">
                <Award className="h-5 w-5" />
                1. Raza
              </h4>
              <p className="text-dungeon-300 text-sm">
                Qué sos físicamente: Humano, Elfo, Enano, Halfling, Gnomo, Semielfo, u Semiorco. Cada raza tiene habilidades especiales.
              </p>
            </div>

            <div className="bg-dungeon-800/50 border border-gold-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-gold-400 mb-2 flex items-center gap-2">
                <Sword className="h-5 w-5" />
                2. Clase
              </h4>
              <p className="text-dungeon-300 text-sm mb-2">
                Tu profesión o entrenamiento: Guerrero, Mago, Clérigo, etc. Define qué podés hacer bien.
              </p>
              <div className="grid md:grid-cols-3 gap-2 text-xs text-dungeon-400">
                <div>○ <strong>Guerrero:</strong> Experto en combate físico</div>
                <div>○ <strong>Mago:</strong> Lanza conjuros arcanos poderosos</div>
                <div>○ <strong>Clérigo:</strong> Sanador con magia divina</div>
                <div>○ <strong>Pícaro:</strong> Habilidoso, sigiloso, tramposo</div>
                <div>○ <strong>Bárbaro:</strong> Guerrero salvaje y furioso</div>
                <div>○ <strong>Bardo:</strong> Músico con magia y habilidades</div>
              </div>
            </div>

            <div className="bg-dungeon-800/50 border border-gold-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-gold-400 mb-2 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                3. Puntuaciones de Habilidad
              </h4>
              <p className="text-dungeon-300 text-sm">
                Seis números que definen qué tan fuerte, inteligente, ágil, etc. sos. Ver sección de Habilidades más abajo.
              </p>
            </div>

            <div className="bg-dungeon-800/50 border border-gold-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-gold-400 mb-2 flex items-center gap-2">
                <Coins className="h-5 w-5" />
                4. Equipamiento
              </h4>
              <p className="text-dungeon-300 text-sm">
                Armas, armaduras, herramientas. Empezás con oro para comprar tu equipo inicial.
              </p>
            </div>

            <div className="bg-dungeon-800/50 border border-gold-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-gold-400 mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                5. Personalidad
              </h4>
              <p className="text-dungeon-300 text-sm">
                Cómo es tu personaje: valiente o cobarde, honesto o tramposo, amigable o huraño. Esto NO está en las reglas, es pura interpretación.
              </p>
            </div>
          </div>

          <div className="bg-gold-900/20 border-l-4 border-gold-400 p-4 rounded">
            <p className="text-gold-300 font-semibold mb-2">Tip para Principiantes:</p>
            <p className="text-dungeon-300 text-sm">
              Si es tu primera vez, elegí una clase sencilla como Guerrero o Clérigo. Los magos son poderosos pero tienen muchas reglas complicadas. Dejá las clases complejas para cuando entiendas mejor el juego.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Habilidades */}
      <Card id="habilidades" className="card border-cyan-500/30 mb-8">
        <CardHeader className="bg-gradient-to-r from-cyan-500/25 to-transparent pb-3">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Brain className="h-6 w-6 text-cyan-400" />
            <span className="text-cyan-400">Las Seis Habilidades</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-dungeon-300 leading-relaxed">
            Tu personaje tiene seis <strong>habilidades</strong> que definen sus capacidades naturales. Cada una se mide con un número (generalmente entre 8 y 18 para personajes iniciales):
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Fuerza */}
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sword className="h-5 w-5 text-red-400" />
                <h4 className="font-bold text-red-400">Fuerza (Fue)</h4>
              </div>
              <p className="text-dungeon-300 text-sm mb-2">Poder físico y músculo.</p>
              <p className="text-dungeon-400 text-xs">
                ○ Ataques cuerpo a cuerpo<br />
                ○ Daño con armas pesadas<br />
                ○ Saltar, trepar, nadar
              </p>
            </div>

            {/* Destreza */}
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-orange-400" />
                <h4 className="font-bold text-orange-400">Destreza (Des)</h4>
              </div>
              <p className="text-dungeon-300 text-sm mb-2">Agilidad, reflejos y coordinación.</p>
              <p className="text-dungeon-400 text-xs">
                ○ Clase de Armadura (CA)<br />
                ○ Ataques a distancia<br />
                ○ Iniciativa en combate
              </p>
            </div>

            {/* Constitución */}
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                <h4 className="font-bold text-yellow-400">Constitución (Con)</h4>
              </div>
              <p className="text-dungeon-300 text-sm mb-2">Resistencia y salud.</p>
              <p className="text-dungeon-400 text-xs">
                ○ Puntos de Golpe (HP)<br />
                ○ Resistir venenos<br />
                ○ Aguantar cansancio
              </p>
            </div>

            {/* Inteligencia */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-blue-400" />
                <h4 className="font-bold text-blue-400">Inteligencia (Int)</h4>
              </div>
              <p className="text-dungeon-300 text-sm mb-2">Razonamiento y aprendizaje.</p>
              <p className="text-dungeon-400 text-xs">
                ○ Puntos de habilidad extra<br />
                ○ Conocimientos varios<br />
                ○ Magos usan Int para conjuros
              </p>
            </div>

            {/* Sabiduría */}
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-cyan-400" />
                <h4 className="font-bold text-cyan-400">Sabiduría (Sab)</h4>
              </div>
              <p className="text-dungeon-300 text-sm mb-2">Percepción e intuición.</p>
              <p className="text-dungeon-400 text-xs">
                ○ Detectar mentiras<br />
                ○ Percepción del entorno<br />
                ○ Clérigos usan Sab para conjuros
              </p>
            </div>

            {/* Carisma */}
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <h4 className="font-bold text-purple-400">Carisma (Car)</h4>
              </div>
              <p className="text-dungeon-300 text-sm mb-2">Personalidad y presencia.</p>
              <p className="text-dungeon-400 text-xs">
                ○ Diplomacia y persuasión<br />
                ○ Intimidación<br />
                ○ Hechiceros usan Car para conjuros
              </p>
            </div>
          </div>

          <div className="bg-cyan-900/20 border-l-4 border-cyan-400 p-4 rounded">
            <p className="text-cyan-300 font-semibold mb-2">Modificadores:</p>
            <p className="text-dungeon-300 text-sm">
              Cada puntuación de habilidad tiene un <strong>modificador</strong> que es lo que realmente sumás a tus tiradas. Por ejemplo:
            </p>
            <ul className="text-dungeon-400 text-sm mt-2 space-y-1">
              <li>● Puntuación 10-11 = Modificador +0 (promedio)</li>
              <li>● Puntuación 12-13 = Modificador +1</li>
              <li>● Puntuación 14-15 = Modificador +2</li>
              <li>● Puntuación 16-17 = Modificador +3</li>
              <li>● Puntuación 18-19 = Modificador +4</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Sistema de Dados */}
      <Card id="dados" className="card border-emerald-500/30 mb-8">
        <CardHeader className="bg-gradient-to-r from-emerald-500/25 to-transparent pb-3">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Dices className="h-6 w-6 text-emerald-400" />
            <span className="text-emerald-400">Sistema de Dados</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-dungeon-300 leading-relaxed">
            D&amp;D usa dados de diferentes formas para resolver acciones inciertas. Los dados se nombran con "d" + número de caras:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-dungeon-800/50 border border-emerald-500/30 rounded-lg p-4 text-center">
              <D4Icon className="h-12 w-12 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bold text-emerald-400">d4</h4>
              <p className="text-dungeon-400 text-xs">Dado de 4 caras</p>
              <p className="text-dungeon-500 text-xs">Daño de dagas</p>
            </div>

            <div className="bg-dungeon-800/50 border border-emerald-500/30 rounded-lg p-4 text-center">
              <D6Icon className="h-12 w-12 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bold text-emerald-400">d6</h4>
              <p className="text-dungeon-400 text-xs">Dado de 6 caras</p>
              <p className="text-dungeon-500 text-xs">Daño de espadas</p>
            </div>

            <div className="bg-dungeon-800/50 border border-emerald-500/30 rounded-lg p-4 text-center">
              <D8Icon className="h-12 w-12 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bold text-emerald-400">d8</h4>
              <p className="text-dungeon-400 text-xs">Dado de 8 caras</p>
              <p className="text-dungeon-500 text-xs">HP de clérigos</p>
            </div>

            <div className="bg-dungeon-800/50 border border-emerald-500/30 rounded-lg p-4 text-center">
              <D10Icon className="h-12 w-12 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bold text-emerald-400">d10</h4>
              <p className="text-dungeon-400 text-xs">Dado de 10 caras</p>
              <p className="text-dungeon-500 text-xs">HP de guerreros</p>
            </div>

            <div className="bg-dungeon-800/50 border border-emerald-500/30 rounded-lg p-4 text-center">
              <D12Icon className="h-12 w-12 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bold text-emerald-400">d12</h4>
              <p className="text-dungeon-400 text-xs">Dado de 12 caras</p>
              <p className="text-dungeon-500 text-xs">HP de bárbaros</p>
            </div>

            <div className="bg-dungeon-800/50 border border-gold-500/50 rounded-lg p-4 text-center ring-2 ring-gold-500/30">
              <D20Icon className="h-12 w-12 text-gold-400 mx-auto mb-2" />
              <h4 className="font-bold text-gold-400">d20</h4>
              <p className="text-dungeon-400 text-xs">Dado de 20 caras</p>
              <p className="text-gold-400 text-xs font-semibold">El más importante</p>
            </div>
          </div>

          <div className="bg-emerald-900/20 border-l-4 border-emerald-400 p-4 rounded">
            <p className="text-emerald-300 font-semibold mb-2">Cómo Funcionan las Tiradas:</p>
            <div className="space-y-3 text-dungeon-300 text-sm">
              <div>
                <p className="font-semibold text-emerald-400 mb-1">1. Tirada de Ataque:</p>
                <p className="ml-4">Tirás 1d20 + tu bonificador de ataque. Si el resultado es igual o mayor que la Clase de Armadura (CA) del enemigo, le pegás.</p>
              </div>
              <div>
                <p className="font-semibold text-emerald-400 mb-1">2. Tirada de Daño:</p>
                <p className="ml-4">Si pegás, tirás el dado de daño de tu arma (por ejemplo, 1d8 para una espada larga) y sumás tu modificador de Fuerza.</p>
              </div>
              <div>
                <p className="font-semibold text-emerald-400 mb-1">3. Tirada de Habilidad:</p>
                <p className="ml-4">Para intentar algo (trepar, persuadir, esconderse), tirás 1d20 + modificador de habilidad relevante + bonus de habilidad. El DM decide la dificultad.</p>
              </div>
            </div>
          </div>

          <div className="bg-dungeon-800/50 border border-emerald-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-emerald-400 mb-2">Dificultades Típicas (DC):</h4>
            <div className="grid md:grid-cols-2 gap-2 text-dungeon-300 text-sm">
              <div>● DC 10: Fácil (abrir puerta común)</div>
              <div>● DC 15: Moderado (trepar pared con grietas)</div>
              <div>● DC 20: Difícil (convencer al guardia)</div>
              <div>● DC 25: Muy difícil (saltar un abismo)</div>
              <div>● DC 30: Casi imposible (persuadir al rey)</div>
              <div>● DC 40: Heroico (romper cadenas mágicas)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Combate */}
      <Card id="combate" className="card border-red-500/30 mb-8">
        <CardHeader className="bg-gradient-to-r from-red-500/25 to-transparent pb-3">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Sword className="h-6 w-6 text-red-400" />
            <span className="text-red-400">Combate Básico</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-dungeon-300 leading-relaxed">
            Cuando empieza un combate, el juego se vuelve más estructurado. Se divide en <strong>rondas</strong> de 6 segundos cada una:
          </p>

          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-5">
            <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Orden de Combate:
            </h4>
            <ol className="space-y-2 text-dungeon-300">
              <li><strong className="text-red-400">1. Iniciativa:</strong> Todos tiran 1d20 + modificador de Destreza. El orden de mayor a menor determina quién actúa primero.</li>
              <li><strong className="text-red-400">2. Turnos:</strong> En tu turno, tenés una <strong>acción estándar</strong> (atacar, lanzar conjuro) y una <strong>acción de movimiento</strong> (moverte tu velocidad).</li>
              <li><strong className="text-red-400">3. Repetir:</strong> Cuando todos actuaron, empieza una nueva ronda en el mismo orden.</li>
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-dungeon-800/50 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2">En tu Turno Podés:</h4>
              <ul className="space-y-1 text-dungeon-300 text-sm">
                <li>○ Atacar con un arma</li>
                <li>○ Lanzar un conjuro</li>
                <li>○ Moverte (tu velocidad, generalmente 30 pies)</li>
                <li>○ Usar un objeto (beber poción)</li>
                <li>○ Ayudar a un aliado</li>
                <li>○ Defender (bonus a CA)</li>
              </ul>
            </div>

            <div className="bg-dungeon-800/50 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2">Conceptos Clave:</h4>
              <ul className="space-y-1 text-dungeon-300 text-sm">
                <li>○ <strong>HP:</strong> Puntos de Golpe, tu salud</li>
                <li>○ <strong>CA:</strong> Clase de Armadura, dificultad para pegarte</li>
                <li>○ <strong>BAB:</strong> Base Attack Bonus, tu bonus a ataques</li>
                <li>○ <strong>Crítico:</strong> Sacar 20 en el d20 (daño doble)</li>
                <li>○ <strong>Pifia:</strong> Sacar 1 en el d20 (fallo automático)</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-900/20 border-l-4 border-red-400 p-4 rounded">
            <p className="text-red-300 font-semibold mb-2">Ejemplo de Combate:</p>
            <div className="space-y-2 text-dungeon-300 text-sm">
              <p><strong className="text-red-400">Iniciativa:</strong> Tirás 1d20+2 (tu Destreza) = 15. El orco tira 8. Vos actuás primero.</p>
              <p><strong className="text-red-400">Tu turno:</strong> Te movés 30 pies hacia el orco y atacás con tu espada. Tirás 1d20+5 (tu BAB+Fuerza) = 18. La CA del orco es 15. Le pegás!</p>
              <p><strong className="text-red-400">Daño:</strong> Tu espada hace 1d8. Tirás y sale 6, más tu Fuerza +3 = 9 de daño. El orco tenía 12 HP, ahora tiene 3.</p>
              <p><strong className="text-red-400">Turno del orco:</strong> El orco te ataca y falla. Vuelve a ser tu turno...</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipamiento */}
      <Card id="equipamiento" className="card border-amber-500/30 mb-8">
        <CardHeader className="bg-gradient-to-r from-amber-500/25 to-transparent pb-3">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Coins className="h-6 w-6 text-amber-400" />
            <span className="text-amber-400">Equipamiento Inicial</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-dungeon-300 leading-relaxed">
            Tu personaje empieza con <strong>oro</strong> para comprar equipo. La cantidad depende de tu clase (por ejemplo, un Guerrero empieza con más oro que un Monje):
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
              <Sword className="h-8 w-8 text-amber-400 mb-2" />
              <h4 className="font-semibold text-amber-400 mb-2">Armas</h4>
              <ul className="text-dungeon-300 text-sm space-y-1">
                <li>○ Simples: Daga, maza (fáciles)</li>
                <li>○ Marciales: Espada, hacha (entrenamiento)</li>
                <li>○ Exóticas: Bastón doble (muy raras)</li>
              </ul>
            </div>

            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
              <Shield className="h-8 w-8 text-amber-400 mb-2" />
              <h4 className="font-semibold text-amber-400 mb-2">Armaduras</h4>
              <ul className="text-dungeon-300 text-sm space-y-1">
                <li>○ Ligeras: Cuero (CA baja, ágil)</li>
                <li>○ Medias: Cota de malla (balance)</li>
                <li>○ Pesadas: Placas (CA alta, lento)</li>
              </ul>
            </div>

            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
              <Map className="h-8 w-8 text-amber-400 mb-2" />
              <h4 className="font-semibold text-amber-400 mb-2">Equipo de Aventura</h4>
              <ul className="text-dungeon-300 text-sm space-y-1">
                <li>○ Mochila, cuerda, antorcha</li>
                <li>○ Kit de sanación, pociones</li>
                <li>○ Herramientas (ganzúas, etc.)</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded">
            <p className="text-amber-300 font-semibold mb-2">Tip de Equipamiento:</p>
            <p className="text-dungeon-300 text-sm">
              No gastes todo tu oro inicial. Dejá algo para emergencias (pociones, sobornos, reparaciones). Una poción de curar heridas leves puede salvarte la vida.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recursos y Siguiente Paso */}
      <Card id="recursos" className="card border-green-500/30 mb-8">
        <CardHeader className="bg-gradient-to-r from-green-500/25 to-transparent pb-3">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <ScrollText className="h-6 w-6 text-green-400" />
            <span className="text-green-400">Recursos y Siguiente Paso</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-dungeon-300 leading-relaxed">
            Ahora que sabés lo básico, el siguiente paso es crear tu primer personaje y empezar a jugar:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/editor-personajes" className="block">
              <div className="bg-gradient-to-r from-green-500/25 to-transparent border border-green-500/30 rounded-lg p-5 hover:border-green-400/50 transition-colors group h-full">
                <User className="h-10 w-10 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-green-400 text-lg mb-2">Crear tu Personaje</h4>
                <p className="text-dungeon-300 text-sm">Usá nuestro editor interactivo para crear tu primer personaje paso a paso.</p>
                <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                  Ir al Editor <TrendingUp className="h-4 w-4" />
                </p>
              </div>
            </Link>

            <Link href="/reglas" className="block">
              <div className="bg-gradient-to-r from-blue-500/25 to-transparent border border-blue-500/30 rounded-lg p-5 hover:border-blue-400/50 transition-colors group h-full">
                <BookOpen className="h-10 w-10 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-blue-400 text-lg mb-2">Ver Reglas Completas</h4>
                <p className="text-dungeon-300 text-sm">Profundizá en las reglas: combate avanzado, conjuros, clases, razas y más.</p>
                <p className="text-blue-400 text-sm mt-2 flex items-center gap-1">
                  Explorar Reglas <TrendingUp className="h-4 w-4" />
                </p>
              </div>
            </Link>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-5">
            <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Otros Recursos Útiles:
            </h4>
            <div className="grid md:grid-cols-2 gap-3 text-dungeon-300 text-sm">
              <Link href="/clases" className="hover:text-green-400 transition-colors">○ Ver todas las Clases</Link>
              <Link href="/razas" className="hover:text-green-400 transition-colors">○ Ver todas las Razas</Link>
              <Link href="/dotes" className="hover:text-green-400 transition-colors">○ Explorar Dotes</Link>
              <Link href="/habilidades" className="hover:text-green-400 transition-colors">○ Consultar Habilidades</Link>
              <Link href="/objetos/armas" className="hover:text-green-400 transition-colors">○ Listado de Armas</Link>
              <Link href="/foro" className="hover:text-green-400 transition-colors">○ Unirte al Foro</Link>
            </div>
          </div>

          <div className="bg-green-900/20 border-l-4 border-green-400 p-4 rounded">
            <p className="text-green-300 font-semibold mb-2">Último Consejo:</p>
            <p className="text-dungeon-300 text-sm">
              D&amp;D puede parecer complicado al principio, pero la mejor forma de aprender es jugando. No te preocupes si te equivocás o no sabés alguna regla: hasta los jugadores con años de experiencia tienen que consultar el manual a veces. Lo importante es divertirse con tus amigos y crear historias épicas juntos.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Final CTA */}
      <div className="text-center py-8">
        <Link href="/editor-personajes">
          <button className="bg-gradient-to-r from-gold-600 to-orange-600 hover:from-gold-500 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105">
            Crear Mi Primer Personaje
          </button>
        </Link>
        <p className="text-dungeon-400 text-sm mt-3">
          Listo para empezar tu aventura
        </p>
      </div>
    </div>
  );
}
