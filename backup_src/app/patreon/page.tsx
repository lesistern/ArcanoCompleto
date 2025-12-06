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
    color: 'text-blue-400',
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
    color: 'text-gold-400',
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
    color: 'text-purple-400',
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-dungeon-700 bg-dungeon-900/50">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-gold-400 drop-shadow-lg">
              🎲 Conviértete en Mecenas
            </h1>
            <p className="text-xl md:text-2xl text-dungeon-200 max-w-3xl mx-auto font-medium">
              Apoya el desarrollo de Compendio Arcano y obtén beneficios exclusivos
            </p>
            <p className="text-lg text-dungeon-400 max-w-2xl mx-auto">
              La plataforma más completa de D&D 3.5 en español. Tu apoyo nos ayuda a mantener este proyecto vivo y en constante crecimiento.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 space-y-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-6 text-center hover:-translate-y-1 transition-transform">
            <div className="text-3xl font-bold text-gold-400 mb-2">118</div>
            <div className="label text-xs">Libros Catalogados</div>
          </div>
          <div className="card p-6 text-center hover:-translate-y-1 transition-transform">
            <div className="text-3xl font-bold text-blue-400 mb-2">605</div>
            <div className="label text-xs">Conjuros</div>
          </div>
          <div className="card p-6 text-center hover:-translate-y-1 transition-transform">
            <div className="text-3xl font-bold text-green-400 mb-2">143</div>
            <div className="label text-xs">Dotes del PHB</div>
          </div>
          <div className="card p-6 text-center hover:-translate-y-1 transition-transform">
            <div className="text-3xl font-bold text-purple-400 mb-2">16</div>
            <div className="label text-xs">Razas Jugables</div>
          </div>
        </div>

        {/* Tiers Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gold-400 text-center font-heading">
            Elige Tu Tier
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`
                  card p-8 flex flex-col relative
                  ${tier.popular ? 'border-gold-500 shadow-gold-900/20 shadow-xl scale-105 z-10' : 'hover:border-dungeon-600'}
                `}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-dungeon-950 text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    MÁS POPULAR
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-5xl mb-4 filter drop-shadow-md">{tier.icon}</div>
                  <h3 className={`text-2xl font-bold mb-2 ${tier.color}`}>
                    {tier.name}
                  </h3>
                  <div className="text-4xl font-bold text-dungeon-100 mb-1">
                    {tier.price}
                    <span className="text-base text-dungeon-400 font-normal">/mes</span>
                  </div>
                  {tier.priceNote && (
                    <div className="tag tag-primary mt-2">
                      {tier.priceNote}
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-dungeon-300 flex items-start gap-2">
                      <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-dungeon-600 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn w-full ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {tier.id === 'heroe_emergente' ? 'Prueba Gratis 7 días' : 'Súmate Ahora'}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-dungeon-800 bg-dungeon-900/50">
            <h2 className="text-2xl font-bold text-gold-400 font-heading">
              Comparación de Beneficios
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-dungeon-950/50">
                  <th className="text-left py-4 px-6 text-dungeon-400 font-bold uppercase tracking-wider">Beneficio</th>
                  <th className="text-center py-4 px-6 text-dungeon-400 font-bold uppercase tracking-wider">Gratis</th>
                  <th className="text-center py-4 px-6 text-blue-400 font-bold uppercase tracking-wider">🛡️ Héroe</th>
                  <th className="text-center py-4 px-6 text-gold-400 font-bold uppercase tracking-wider">👑 Campeón</th>
                  <th className="text-center py-4 px-6 text-purple-400 font-bold uppercase tracking-wider">✨ Leyenda</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dungeon-800">
                {[
                  { name: 'Usar el compendio', free: true, hero: true, champ: true, legend: true },
                  { name: 'Créditos en /sobre', free: false, hero: true, champ: true, legend: true },
                  { name: 'Discord de mecenas', free: false, hero: true, champ: true, legend: true },
                  { name: 'Badge exclusivo', free: false, hero: false, champ: 'Oro', legend: 'Animado' },
                  { name: 'Votar roadmap', free: false, hero: false, champ: true, legend: true },
                  { name: 'Estadísticas', free: false, hero: false, champ: true, legend: true },
                  { name: 'Prioridad queue', free: false, hero: false, champ: false, legend: true },
                  { name: 'Acceso directo', free: false, hero: false, champ: false, legend: true },
                  { name: 'Homebrew propio', free: false, hero: false, champ: false, legend: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-dungeon-800/30 transition-colors">
                    <td className="py-4 px-6 text-dungeon-200 font-medium">{row.name}</td>
                    <td className="text-center py-4 px-6">{renderCheck(row.free)}</td>
                    <td className="text-center py-4 px-6">{renderCheck(row.hero)}</td>
                    <td className="text-center py-4 px-6">{renderCheck(row.champ)}</td>
                    <td className="text-center py-4 px-6">{renderCheck(row.legend)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Funding Goals */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gold-400 mb-8 flex items-center gap-3 font-heading">
            <TrendingUp className="w-6 h-6" />
            Metas de Financiamiento
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="rounded-xl border border-dungeon-700 bg-dungeon-950/30 p-5 hover:border-gold-500/30 transition-colors"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gold-400">{goal.amount}</div>
                    <div className="text-xs text-dungeon-400 uppercase tracking-wide font-bold">{goal.title}</div>
                  </div>
                </div>
                <p className="text-dungeon-300 pl-14 text-sm">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="card p-12 text-center border-gold-500/30 bg-gradient-to-b from-dungeon-900 to-dungeon-950">
          <h2 className="text-3xl font-bold text-gold-400 mb-4 font-heading">
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
              className="btn btn-primary text-lg px-8 py-4"
            >
              <Heart className="w-5 h-5" />
              Convertirme en Mecenas
            </a>

            <Link
              href="/sobre"
              className="btn btn-secondary text-lg px-8 py-4"
            >
              Conocer Más del Proyecto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderCheck(value: boolean | string) {
  if (value === true) return <Check className="w-5 h-5 text-green-400 inline" />;
  if (value === false) return <X className="w-5 h-5 text-dungeon-600 inline" />;
  return <span className="tag tag-primary">{value}</span>;
}
