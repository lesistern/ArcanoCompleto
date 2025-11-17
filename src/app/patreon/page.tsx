import { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, Heart, Crown, Sparkles, Shield, ExternalLink, TrendingUp } from 'lucide-react';

interface Tier {
  id: string;
  name: string;
  icon: string;
  price: string;
  priceNote?: string;
  checkoutUrl: string;
  color: string;
  borderColor: string;
  bgGradient: string;
  popular?: boolean;
  benefits: string[];
}

export const metadata: Metadata = {
  title: 'Conviértete en Mecenas | Compendio Arcano',
  description: 'Apoya el desarrollo de Compendio Arcano y obtén beneficios exclusivos. 3 tiers disponibles: Héroe Emergente, Campeón Consagrado y Leyenda Viviente.',
  keywords: [
    'Patreon',
    'mecenas',
    'apoyo',
    'suscripción',
    'Compendio Arcano',
    'D&D 3.5',
    'beneficios exclusivos',
    'badge',
    'Discord',
    'votación',
  ],
  openGraph: {
    title: 'Conviértete en Mecenas | Compendio Arcano',
    description: 'Apoya el proyecto y obtén acceso a beneficios exclusivos. Desde $2/mes.',
    type: 'website',
  },
};

const tiers: Tier[] = [
  {
    id: 'heroe_emergente',
    name: 'Héroe Emergente',
    icon: '🛡️',
    price: '$2',
    priceNote: '7 días de prueba gratis',
    checkoutUrl: 'https://www.patreon.com/checkout/compendioarcano?rid=4626044&slug=compendioarcano&is_free_trial=true',
    color: 'blue',
    borderColor: 'border-blue-500/40',
    bgGradient: 'from-blue-900/30 via-dungeon-800 to-dungeon-900',
    benefits: [
      '🎖️ Tu nombre en la página /sobre eternamente',
      '📢 Acceso al muro de Patreon con actualizaciones exclusivas',
      '📢 Sneak peeks de nuevas funcionalidades',
      '💬 Acceso al Discord de Mecenas privado',
      '💬 Reporta bugs con prioridad y prueba features beta',
      '🙌 Tu apoyo mantiene los servidores funcionando',
    ],
  },
  {
    id: 'campeon_consagrado',
    name: 'Campeón Consagrado',
    icon: '👑',
    price: '$5',
    checkoutUrl: 'https://www.patreon.com/checkout/compendioarcano?rid=4626050&slug=compendioarcano',
    color: 'gold',
    borderColor: 'border-gold-500/40',
    bgGradient: 'from-gold-900/30 via-dungeon-800 to-dungeon-900',
    popular: true,
    benefits: [
      '✨ Todo lo de Héroe Emergente',
      '👑 Badge dorado exclusivo en foro, leaderboard y perfiles',
      '🗳️ Vota el roadmap de desarrollo mensual',
      '🗳️ Tu voto tiene peso real en decisiones',
      '📊 Vota propuestas de la comunidad (voto doble)',
      '📈 Dashboard con métricas en tiempo real',
      '🎯 Tu voto da forma al futuro del compendio',
    ],
  },
  {
    id: 'leyenda_viviente',
    name: 'Leyenda Viviente',
    icon: '✨',
    price: '$10',
    checkoutUrl: 'https://www.patreon.com/checkout/compendioarcano?rid=4626045&slug=compendioarcano',
    color: 'purple',
    borderColor: 'border-purple-500/40',
    bgGradient: 'from-purple-900/30 via-dungeon-800 to-dungeon-900',
    benefits: [
      '✨ Todo lo de Campeón Consagrado',
      '✨ Badge púrpura con animación (efecto glow pulsante)',
      '🚀 Prioridad en queue de procesamiento',
      '🚀 Respuesta garantizada en 24-48h',
      '📧 Acceso directo al desarrollador (Discord DM/email)',
      '🎨 Creación de contenido homebrew personalizado',
      '🎨 Tu creación se añade con tu nombre como autor',
      '💎 Bienvenido al círculo interno - desarrollo full-time posible',
    ],
  },
];

const goals = [
  { amount: 'u$d 100/mes', title: 'Servidor Dedicado', description: 'Rendimiento 50% mejor, uptime 99.9%' },
  { amount: 'u$d 250/mes', title: 'Traductor Profesional', description: '100+ traducciones por semana' },
  { amount: 'u$d 500/mes', title: 'Desarrollo Part-Time', description: '20h/semana de desarrollo' },
  { amount: 'u$d 1000/mes', title: 'Desarrollo Full-Time', description: '40h/semana + proyectos complementarios' },
];

export default function PatreonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dungeon-950 via-dungeon-900 to-dungeon-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-dungeon-700">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gold-300 via-gold-400 to-orange-400 bg-clip-text text-transparent mb-6">
              🎲 Conviértete en Mecenas
            </h1>
            <p className="text-xl md:text-2xl text-dungeon-300 mb-4 max-w-3xl mx-auto">
              Apoya el desarrollo de Compendio Arcano y obtén beneficios exclusivos
            </p>
            <p className="text-lg text-dungeon-400 max-w-2xl mx-auto">
              La plataforma más completa de D&D 3.5 en español. Tu apoyo nos ayuda a mantener este proyecto vivo y en constante crecimiento.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-gold-400 mb-2">118</div>
            <div className="text-sm text-dungeon-400">Libros Catalogados</div>
          </div>
          <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">605</div>
            <div className="text-sm text-dungeon-400">Conjuros</div>
          </div>
          <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">143</div>
            <div className="text-sm text-dungeon-400">Dotes del PHB</div>
          </div>
          <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">16</div>
            <div className="text-sm text-dungeon-400">Razas Jugables</div>
          </div>
        </div>

        {/* Tiers Section */}
        <h2 className="text-3xl font-bold text-gold-400 mb-8 text-center">
          Elige Tu Tier
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`
                relative bg-gradient-to-br ${tier.bgGradient}
                border-2 ${tier.borderColor} rounded-lg p-8
                ${tier.popular ? 'ring-2 ring-gold-500/50' : ''}
                transition-all duration-300 hover:scale-105
              `}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  MÁS POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{tier.icon}</div>
                <h3 className="text-2xl font-bold text-dungeon-100 mb-2">
                  {tier.name}
                </h3>
                <div className="text-4xl font-bold text-gold-400 mb-1">
                  {tier.price}
                  <span className="text-base text-dungeon-400 font-normal">/mes</span>
                </div>
                {tier.priceNote && (
                  <div className="text-xs text-green-400 font-semibold mt-1">
                    {tier.priceNote}
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm text-dungeon-300">
                    {benefit}
                  </li>
                ))}
              </ul>

              <a
                href={tier.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  block w-full py-3 px-6 text-center font-bold rounded-lg
                  bg-gradient-to-r from-${tier.color}-500 to-${tier.color}-600
                  hover:from-${tier.color}-600 hover:to-${tier.color}-700
                  text-white transition-all transform hover:scale-105
                  flex items-center justify-center gap-2
                `}
              >
                {tier.id === 'heroe_emergente' ? 'Iniciar prueba gratuita de 7 días' : 'Súmate'}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-8 mb-16 overflow-x-auto">
          <h2 className="text-2xl font-bold text-gold-400 mb-6">
            Comparación de Beneficios
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dungeon-700">
                <th className="text-left py-3 px-4 text-dungeon-400">Beneficio</th>
                <th className="text-center py-3 px-4 text-dungeon-400">Gratis</th>
                <th className="text-center py-3 px-4 text-blue-400">🛡️ Héroe</th>
                <th className="text-center py-3 px-4 text-gold-400">👑 Campeón</th>
                <th className="text-center py-3 px-4 text-purple-400">✨ Leyenda</th>
              </tr>
            </thead>
            <tbody className="text-dungeon-300">
              <tr className="border-b border-dungeon-700/50">
                <td className="py-3 px-4">Usar el compendio</td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
              </tr>
              <tr className="border-b border-dungeon-700/50">
                <td className="py-3 px-4">Créditos en /sobre</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
              </tr>
              <tr className="border-b border-dungeon-700/50">
                <td className="py-3 px-4">Discord de mecenas</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
              </tr>
              <tr className="border-b border-dungeon-700/50">
                <td className="py-3 px-4">Badge exclusivo</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4">👑 Oro</td>
                <td className="text-center py-3 px-4">✨ Animado</td>
              </tr>
              <tr className="border-b border-dungeon-700/50">
                <td className="py-3 px-4">Votar roadmap</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
              </tr>
              <tr className="border-b border-dungeon-700/50">
                <td className="py-3 px-4">Estadísticas del proyecto</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
              </tr>
              <tr className="border-b border-dungeon-700/50">
                <td className="py-3 px-4">Prioridad en queue</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
              </tr>
              <tr className="border-b border-dungeon-700/50">
                <td className="py-3 px-4">Acceso directo</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4">Contenido homebrew</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-red-400 inline" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-green-400 inline" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Funding Goals */}
        <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gold-400 mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6" />
            Metas de Financiamiento
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="bg-dungeon-900/50 border border-dungeon-700 rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gold-500/10 rounded-full p-2">
                    <TrendingUp className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gold-400">{goal.amount}</div>
                    <div className="text-sm text-dungeon-400">{goal.title}</div>
                  </div>
                </div>
                <p className="text-sm text-dungeon-300">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-gold-900/30 via-dungeon-800 to-dungeon-900 border-2 border-gold-500/40 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gold-400 mb-6">
            ¿Listo para Apoyar el Proyecto?
          </h2>
          <p className="text-lg text-dungeon-300 mb-8 max-w-2xl mx-auto">
            Tu apoyo hace posible el desarrollo continuo de la mejor herramienta de D&D en español.
            Cada dólar cuenta. ¡Gracias por hacer esto posible!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.patreon.com/join/compendioarcano"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-500 to-orange-500 text-white font-bold rounded-lg hover:from-gold-600 hover:to-orange-600 transition-all transform hover:scale-105 text-lg"
            >
              <Heart className="w-5 h-5" />
              Convertirme en Mecenas
              <ExternalLink className="w-4 h-4" />
            </a>

            <Link
              href="/sobre"
              className="inline-flex items-center gap-2 px-8 py-4 bg-dungeon-800 border-2 border-dungeon-700 text-dungeon-300 font-bold rounded-lg hover:border-gold-500/50 hover:text-gold-400 transition-all text-lg"
            >
              Conocer Más del Proyecto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
