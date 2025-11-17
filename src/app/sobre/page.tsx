import { Metadata } from 'next';
import Link from 'next/link';
import {
  Book, Users, Code, Globe, Heart, Shield, Zap,
  TrendingUp, Award, MessageCircle,
  DollarSign, Coffee, Star, ChevronRight
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

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
    <div className="min-h-screen bg-gradient-to-b from-dungeon-950 via-dungeon-900 to-dungeon-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-dungeon-700">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gold-300 via-gold-400 to-orange-400 bg-clip-text text-transparent mb-6">
              Compendio Arcano
            </h1>
            <p className="text-xl md:text-2xl text-dungeon-300 mb-4 max-w-3xl mx-auto">
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
          <h2 className="text-3xl font-bold text-gold-400 mb-8 flex items-center gap-3">
            <Book className="h-8 w-8" />
            Ediciones Disponibles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* D&D 3.5 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-dungeon-800 to-dungeon-900 border-2 border-green-500/40 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-green-400 mb-2">D&D 3.5</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                      ✅ Disponible Ahora
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-dungeon-300 mb-4">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>118 libros</strong> catalogados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>605 conjuros</strong> (554 traducidos oficialmente)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>143 dotes</strong> categorizadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>11 clases</strong> con progresión 1-20</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>16 razas</strong> jugables</span>
                  </li>
                </ul>
                <Link
                  href="/clases"
                  className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold transition-colors"
                >
                  Explorar Compendio 3.5 <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* D&D 5e */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-dungeon-800 to-dungeon-900 border-2 border-blue-500/40 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">D&D 5e</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                      🚧 En Desarrollo
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-dungeon-300 mb-4">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>50+ libros</strong> oficiales planificados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>13 clases</strong> (incluyendo Artificer)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>50+ subclases</strong> oficiales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>500+ conjuros</strong> con upcast</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Editor de personajes</strong> 5e completo</span>
                  </li>
                </ul>
                <div className="text-sm text-dungeon-400">
                  <strong className="text-blue-400">Lanzamiento:</strong> Q1 2026
                </div>
              </div>
            </div>

            {/* D&D 5.5e / One D&D */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-dungeon-800 to-dungeon-900 border-2 border-purple-500/40 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-400 mb-2">One D&D</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                      📋 Planificado
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-dungeon-300 mb-4">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>PHB 2024</strong> completo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Nuevas versiones</strong> de clases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Species</strong> (reemplazo de razas)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Compatibilidad</strong> retroactiva con 5e</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Migrador</strong> de personajes 5e → 5.5e</span>
                  </li>
                </ul>
                <div className="text-sm text-dungeon-400">
                  <strong className="text-purple-400">Lanzamiento:</strong> Q2-Q3 2026
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestra Visión */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gold-400 mb-8 flex items-center gap-3">
            <Globe className="h-8 w-8" />
            Nuestra Visión
          </h2>

          <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-8">
            <p className="text-lg text-dungeon-300 leading-relaxed mb-6">
              Crear el <strong className="text-gold-400">recurso definitivo en español</strong> para la comunidad de D&D,
              donde jugadores de todas las ediciones puedan consultar reglas, crear personajes, compartir conocimiento
              y conectar con otros jugadores hispanohablantes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-dungeon-400">
                  <strong className="text-dungeon-200">100% gratuito</strong> sin publicidad invasiva
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-dungeon-400">
                  <strong className="text-dungeon-200">Comunidad primero</strong> - Decisiones guiadas por feedback
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-dungeon-400">
                  <strong className="text-dungeon-200">Mantenido por la comunidad</strong> para la comunidad
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-dungeon-400">
                  <strong className="text-dungeon-200">Multi-edición</strong> 3.5, 5e y 5.5e
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gold-400 mb-8 flex items-center gap-3">
            <TrendingUp className="h-8 w-8" />
            Estadísticas del Proyecto
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">118</div>
              <div className="text-sm text-dungeon-400">Libros Catalogados</div>
            </div>
            <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-blue-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">605</div>
              <div className="text-sm text-dungeon-400">Conjuros D&D 3.5</div>
            </div>
            <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-purple-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
              <div className="text-sm text-dungeon-400">Usuarios Registrados</div>
            </div>
            <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-orange-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">95+</div>
              <div className="text-sm text-dungeon-400">Score Lighthouse</div>
            </div>
          </div>
        </section>

        {/* Colaboradores Destacados */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gold-400 mb-8 flex items-center gap-3">
            <Users className="h-8 w-8" />
            Colaboradores Destacados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-gold-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Code className="h-5 w-5 text-gold-400" />
                <h3 className="text-lg font-bold text-gold-300">Desarrollador Principal</h3>
              </div>
              <p className="text-2xl font-bold text-white">LeSistern</p>
              <p className="text-sm text-dungeon-400 mt-1">Arquitectura y desarrollo full-stack</p>
            </div>

            <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-blue-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-bold text-blue-300">Traductores</h3>
              </div>
              <p className="text-2xl font-bold text-white">{translatorCount || 0}</p>
              <p className="text-sm text-dungeon-400 mt-1">Contribuidores de traducciones verificadas</p>
            </div>

            <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-purple-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Award className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-bold text-purple-300">Beta Testers</h3>
              </div>
              <p className="text-2xl font-bold text-white">{betaTesterCount || 0}</p>
              <p className="text-sm text-dungeon-400 mt-1">Usuarios ayudando a identificar bugs</p>
            </div>

            <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-green-400" />
                <h3 className="text-lg font-bold text-green-300">Moderadores</h3>
              </div>
              <p className="text-2xl font-bold text-white">{modCount || 0}</p>
              <p className="text-sm text-dungeon-400 mt-1">Moderadores del foro voluntarios</p>
            </div>
          </div>
        </section>

        {/* Funcionalidades Destacadas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gold-400 mb-8 flex items-center gap-3">
            <Zap className="h-8 w-8" />
            Funcionalidades Destacadas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gold-300 mb-4 flex items-center gap-2">
                <Code className="h-5 w-5" />
                Editor de Personajes
              </h3>
              <ul className="space-y-2 text-sm text-dungeon-300">
                <li>✅ Point Buy de 25 puntos automático</li>
                <li>✅ Tiradas 4d6 con animación</li>
                <li>✅ Guardado en la nube</li>
                <li>✅ Generador de nombres por raza</li>
                <li>✅ Export/Import JSON</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gold-300 mb-4 flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Sistema de Foro
              </h3>
              <ul className="space-y-2 text-sm text-dungeon-300">
                <li>✅ 6 categorías especializadas</li>
                <li>✅ Sistema de votación (upvote/downvote)</li>
                <li>✅ Trust Levels y XP</li>
                <li>✅ Marcar respuestas como solución</li>
                <li>✅ 20 achievements desbloqueables</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gold-300 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Traducciones Colaborativas
              </h3>
              <ul className="space-y-2 text-sm text-dungeon-300">
                <li>✅ 554 conjuros traducidos oficialmente</li>
                <li>✅ Sistema de tiers de usuario</li>
                <li>✅ Votación comunitaria</li>
                <li>✅ Integración DeepL API</li>
                <li>✅ Sistema de reputación</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gold-300 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Seguridad y Privacidad
              </h3>
              <ul className="space-y-2 text-sm text-dungeon-300">
                <li>✅ Row Level Security (RLS)</li>
                <li>✅ 7 headers de seguridad</li>
                <li>✅ Sin tracking de terceros</li>
                <li>✅ Datos encriptados</li>
                <li>✅ Perfiles públicos opcionales</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cómo Contribuir */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gold-400 mb-8 flex items-center gap-3">
            <Heart className="h-8 w-8" />
            Cómo Contribuir
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gold-300 mb-4">💬 Participa en la Comunidad</h3>
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
            </div>

            <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gold-300 mb-4">💰 Apoya Económicamente</h3>
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
            </div>

          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-gold-900/30 via-dungeon-800 to-dungeon-900 border-2 border-gold-500/40 rounded-lg p-12">
            <h2 className="text-3xl font-bold text-gold-400 mb-6">
              ¿Listo para Empezar tu Aventura?
            </h2>
            <p className="text-lg text-dungeon-300 mb-8 max-w-2xl mx-auto">
              Únete a cientos de jugadores que ya están usando Compendio Arcano para sus partidas de D&D
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/editor-personajes"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-orange-500 text-white font-bold rounded-lg hover:from-gold-600 hover:to-orange-600 transition-all transform hover:scale-105"
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
            <h3 className="text-lg font-bold text-dungeon-300 mb-4">⚖️ Aviso Legal</h3>
            <p className="text-sm text-dungeon-400 leading-relaxed mb-4">
              Compendio Arcano es un proyecto de fans creado bajo Fair Use para fines educativos y de referencia.
              Todo el contenido de Dungeons & Dragons es propiedad de <strong>Wizards of the Coast LLC</strong>,
              una subsidiaria de Hasbro, Inc.
            </p>
            <p className="text-xs text-dungeon-500 italic">
              Este sitio no está afiliado, asociado, autorizado, respaldado por, ni de ninguna manera conectado
              oficialmente con Wizards of the Coast, Hasbro, Inc., ni con ninguna de sus subsidiarias o afiliados.
              Parte del contenido está disponible bajo la Open Game License v1.0a.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
