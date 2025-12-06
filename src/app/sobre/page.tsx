import { Metadata } from 'next';
import Link from 'next/link';
import {
  Book, Users, Code, Globe, Heart, Shield, Zap,
  TrendingUp, Award, MessageCircle,
  DollarSign, Coffee, Star, ChevronRight
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/Card';
import {
  EDITIONS,
  PROJECT_STATS,
  FEATURED_FEATURES,
  CONTRIBUTION_LINKS,
  VISION_POINTS,
} from '@/lib/data/about-page-config';

export const metadata: Metadata = {
  title: 'Quiénes Somos | Compendio Arcano - Compendio Multi-Edición de D&D en Español',
  description: 'Conoce el proyecto más ambicioso de D&D en español: 118 libros de D&D 3.5, próximamente 5e y 5.5e. Editor de personajes, foro, traducciones y comunidad.',
  keywords: [
    'Compendio Arcano',
    'quiénes somos',
    'sobre nosotros',
    'D&D 3.5 español',
    'D&D 5e español',
    'One D&D',
    'D&D 5.5e',
    'compendio D&D',
    'editor personajes D&D',
    'comunidad D&D español',
    'traducciones D&D',
    'proyecto código abierto',
    'Dungeons and Dragons español'
  ],
  openGraph: {
    title: 'Quiénes Somos | Compendio Arcano',
    description: 'El compendio más completo de D&D en español. Actualmente con D&D 3.5 completo, próximamente 5e y 5.5e (One D&D).',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quiénes Somos | Compendio Arcano',
    description: 'El compendio más completo de D&D en español con 3 ediciones',
  },
};

// Map icon names to Lucide components
const FEATURE_ICONS: Record<string, typeof Code> = {
  Code,
  MessageCircle,
  Users,
  Shield,
};

export default async function SobrePage() {
  // Obtener datos reales de colaboradores desde Supabase
  const supabase = await createClient();

  const { count: translatorCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('tier_code', 'translator');

  const { count: betaTesterCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('tier_code', 'beta_tester');

  const { count: modCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('tier_code', 'mod');

  return (
    <div className="min-h-screen bg-dungeon-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-dungeon-700 bg-dungeon-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-gold-400 mb-6">
              Compendio Arcano
            </h1>
            <p className="text-xl md:text-2xl text-dungeon-200 mb-4 max-w-3xl mx-auto font-heading">
              La Enciclopedia Definitiva de Dungeons & Dragons en Español
            </p>
            <p className="text-lg text-dungeon-400 max-w-2xl mx-auto">
              Compendio Multi-Edición • Editor de Personajes • Base de Datos Completa • Comunidad Activa
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Ediciones Disponibles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gold-400 mb-8 flex items-center gap-3 font-heading">
            <Book className="h-8 w-8" />
            Ediciones Disponibles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(EDITIONS).map(([key, edition]) => (
              <Card
                key={key}
                className={`relative group ${edition.cardBorder} bg-dungeon-800/50 hover:${edition.cardHoverBorder} transition-colors`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${edition.cardGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-2xl font-bold ${edition.featureColor} mb-2 font-heading`}>
                        {edition.title}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 ${edition.statusBgColor} ${edition.statusColor} text-xs rounded-full border ${edition.statusBorderColor}`}>
                        {edition.badge} {edition.status}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-dungeon-300 mb-4">
                    {edition.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight className={`h-4 w-4 ${edition.featureColor} mt-0.5 flex-shrink-0`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {edition.cta && (
                    <Link
                      href={edition.cta.href}
                      className={`inline-flex items-center gap-2 ${edition.featureColor} hover:opacity-80 font-semibold transition-colors`}
                    >
                      {edition.cta.text} <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                  {edition.releaseDate && (
                    <div className="text-sm text-dungeon-400">
                      <strong className={edition.featureColor}>Lanzamiento:</strong> {edition.releaseDate}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Nuestra Visión */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gold-400 mb-8 flex items-center gap-3 font-heading">
            <Globe className="h-8 w-8" />
            Nuestra Visión
          </h2>

          <Card className="bg-dungeon-800/80 border-dungeon-700">
            <CardContent className="p-8">
              <p className="text-lg text-dungeon-300 leading-relaxed mb-6">
                Crear el <strong className="text-gold-400">recurso definitivo en español</strong> para la comunidad de D&D,
                donde jugadores de todas las ediciones puedan consultar reglas, crear personajes, compartir conocimiento
                y conectar con otros jugadores hispanohablantes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VISION_POINTS.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-dungeon-400">
                      <strong className="text-dungeon-200">{point.title}</strong> {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Estadísticas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gold-400 mb-8 flex items-center gap-3 font-heading">
            <TrendingUp className="h-8 w-8" />
            Estadísticas del Proyecto
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROJECT_STATS.map((stat, idx) => (
              <Card key={idx} className={`${stat.bgColor} ${stat.borderColor}`}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-dungeon-100 mb-2 font-heading">{stat.value}</div>
                  <div className="text-sm text-dungeon-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Colaboradores Destacados */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gold-400 mb-8 flex items-center gap-3 font-heading">
            <Users className="h-8 w-8" />
            Colaboradores Destacados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-dungeon-800/50 border-gold-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Code className="h-5 w-5 text-gold-400" />
                  <h3 className="text-lg font-bold text-gold-300 font-heading">Desarrollador Principal</h3>
                </div>
                <p className="text-2xl font-bold text-dungeon-100">LeSistern</p>
                <p className="text-sm text-dungeon-400 mt-1">Arquitectura y desarrollo full-stack</p>
              </CardContent>
            </Card>

            <Card className="bg-dungeon-800/50 border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-blue-300 font-heading">Traductores</h3>
                </div>
                <p className="text-2xl font-bold text-dungeon-100">{translatorCount || 0}</p>
                <p className="text-sm text-dungeon-400 mt-1">Contribuidores de traducciones verificadas</p>
              </CardContent>
            </Card>

            <Card className="bg-dungeon-800/50 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-5 w-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-purple-300 font-heading">Beta Testers</h3>
                </div>
                <p className="text-2xl font-bold text-dungeon-100">{betaTesterCount || 0}</p>
                <p className="text-sm text-dungeon-400 mt-1">Usuarios ayudando a identificar bugs</p>
              </CardContent>
            </Card>

            <Card className="bg-dungeon-800/50 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <h3 className="text-lg font-bold text-green-300 font-heading">Moderadores</h3>
                </div>
                <p className="text-2xl font-bold text-dungeon-100">{modCount || 0}</p>
                <p className="text-sm text-dungeon-400 mt-1">Moderadores del foro voluntarios</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Funcionalidades Destacadas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gold-400 mb-8 flex items-center gap-3 font-heading">
            <Zap className="h-8 w-8" />
            Funcionalidades Destacadas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURED_FEATURES.map((feature, idx) => {
              const IconComponent = FEATURE_ICONS[feature.icon] || Code;
              return (
                <Card key={idx} className="bg-dungeon-800/50 border-dungeon-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gold-300 mb-4 flex items-center gap-2 font-heading">
                      <IconComponent className="h-5 w-5" />
                      {feature.title}
                    </h3>
                    <ul className="space-y-2 text-sm text-dungeon-300">
                      {feature.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Cómo Contribuir */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gold-400 mb-8 flex items-center gap-3 font-heading">
            <Heart className="h-8 w-8" />
            Cómo Contribuir
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-dungeon-800/50 border-dungeon-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gold-300 mb-4 font-heading">💬 Participa en la Comunidad</h3>
                <ul className="space-y-3 text-sm text-dungeon-300">
                  <li>
                    <Link href="/foro" className="text-blue-400 hover:text-blue-300 transition-colors">
                      → Únete al foro
                    </Link>
                  </li>
                  <li>
                    <Link href="/feedback" className="text-blue-400 hover:text-blue-300 transition-colors">
                      → Reporta bugs
                    </Link>
                  </li>
                  <li>
                    <Link href="/contribute/translate" className="text-blue-400 hover:text-blue-300 transition-colors">
                      → Ayuda con traducciones
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-dungeon-800/50 border-dungeon-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gold-300 mb-4 font-heading">💰 Apoya Económicamente</h3>
                <ul className="space-y-3 text-sm text-dungeon-300">
                  <li className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-pink-400" />
                    <a href="https://www.patreon.com/c/compendioarcano" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      Patreon
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Coffee className="h-4 w-4 text-orange-400" />
                    <a href="https://cafecito.app/compendioarcano" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      Cafecito
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-400" />
                    <a href="https://link.mercadopago.com.ar/compendioarcano" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      Mercado Pago
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-gold-900/30 via-dungeon-800 to-dungeon-900 border-2 border-gold-500/40 rounded-lg p-12">
            <h2 className="text-3xl font-bold text-gold-400 mb-6 font-heading">
              ¿Listo para Empezar tu Aventura?
            </h2>
            <p className="text-lg text-dungeon-300 mb-8 max-w-2xl mx-auto">
              Únete a cientos de jugadores que ya están usando Compendio Arcano para sus partidas de D&D
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/editor-personajes"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-orange-500 text-white font-bold rounded-lg hover:from-gold-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
              >
                🎭 Crear Personaje
              </Link>
              <Link
                href="/clases"
                className="inline-flex items-center gap-2 px-6 py-3 bg-dungeon-700 text-gold-400 font-bold rounded-lg border-2 border-gold-500/40 hover:bg-dungeon-600 transition-all"
              >
                📚 Explorar Compendio
              </Link>
              <Link
                href="/foro"
                className="inline-flex items-center gap-2 px-6 py-3 bg-dungeon-700 text-blue-400 font-bold rounded-lg border-2 border-blue-500/40 hover:bg-dungeon-600 transition-all"
              >
                💬 Unirse al Foro
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer Legal */}
        <section className="mt-16 pt-8 border-t border-dungeon-700">
          <div className="bg-dungeon-800/50 border border-dungeon-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-dungeon-300 mb-4 font-heading">⚖️ Aviso Legal</h3>
            <p className="text-sm text-dungeon-400 leading-relaxed mb-4">
              Compendio Arcano es contenido de fans no oficial permitido por la Política de contenido de fans. No está aprobado ni respaldado por Wizards. Parte de los materiales utilizados es propiedad de Wizards of the Coast. ©Wizards of the Coast LLC.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
