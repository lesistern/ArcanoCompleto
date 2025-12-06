import { Metadata } from 'next';
import Link from 'next/link';
import {
  Check, X, Heart, Crown, Sparkles, Shield, ExternalLink, TrendingUp,
  BookOpen, ArrowLeft, Users, MessageCircle, Megaphone, Vote,
  BarChart, Zap, Mail, PenTool, Medal, Star, User
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getPatronCount } from '@/lib/patreon-server';

interface Tier {
  id: string;
  name: string;
  icon: React.ReactNode;
  price: string;
  priceNote?: string;
  checkoutUrl: string;
  color: string;
  popular?: boolean;
  benefits: { test: string, icon?: React.ReactNode }[];
}

export const metadata: Metadata = {
  title: 'Conviértete en Mecenas | Compendio Arcano',
  description: 'Apoya el desarrollo de Compendio Arcano y obtén beneficios exclusivos.',
  keywords: [
    'Patreon',
    'mecenas',
    'apoyo',
    'suscripción',
    'Compendio Arcano',
    'D&D 3.5',
    'beneficios exclusivos',
  ],
};

const tiers: Tier[] = [
  {
    id: 'heroe_emergente',
    name: 'Héroe Emergente',
    icon: <Shield className="w-12 h-12" />,
    price: '$2',
    priceNote: '7 días de prueba gratis',
    checkoutUrl: 'https://www.patreon.com/checkout/compendioarcano?rid=4626044&slug=compendioarcano&is_free_trial=true',
    color: 'text-blue-400',
    benefits: [
      { test: 'Tu nombre en la página /sobre eternamente', icon: <Medal className="w-4 h-4 text-blue-400" /> },
      { test: 'Acceso al muro de Patreon con actualizaciones exclusivas', icon: <Megaphone className="w-4 h-4 text-blue-400" /> },
      { test: 'Sneak peeks de nuevas funcionalidades', icon: <Sparkles className="w-4 h-4 text-blue-400" /> },
      { test: 'Acceso al Discord de Mecenas privado', icon: <MessageCircle className="w-4 h-4 text-blue-400" /> },
      { test: 'Reporta bugs con prioridad y prueba features beta', icon: <Zap className="w-4 h-4 text-blue-400" /> },
      { test: 'Tu apoyo mantiene los servidores funcionando', icon: <Heart className="w-4 h-4 text-blue-400" /> },
    ],
  },
  {
    id: 'campeon_consagrado',
    name: 'Campeón Consagrado',
    icon: <Crown className="w-12 h-12" />,
    price: '$5',
    checkoutUrl: 'https://www.patreon.com/checkout/compendioarcano?rid=4626050&slug=compendioarcano',
    color: 'text-gold-400',
    popular: true,
    benefits: [
      { test: 'Todo lo de Héroe Emergente', icon: <Shield className="w-4 h-4 text-gold-400" /> },
      { test: 'Badge dorado exclusivo en foro, leaderboard y perfiles', icon: <Crown className="w-4 h-4 text-gold-400" /> },
      { test: 'Vota el roadmap de desarrollo mensual', icon: <Vote className="w-4 h-4 text-gold-400" /> },
      { test: 'Tu voto tiene peso real en decisiones', icon: <Check className="w-4 h-4 text-gold-400" /> },
      { test: 'Vota propuestas de la comunidad (voto doble)', icon: <Users className="w-4 h-4 text-gold-400" /> },
      { test: 'Dashboard con métricas en tiempo real', icon: <BarChart className="w-4 h-4 text-gold-400" /> },
      { test: 'Tu voto da forma al futuro del compendio', icon: <TargetIcon className="w-4 h-4 text-gold-400" /> },
    ],
  },
  {
    id: 'leyenda_viviente',
    name: 'Leyenda Viviente',
    icon: <Star className="w-12 h-12" />,
    price: '$10',
    checkoutUrl: 'https://www.patreon.com/checkout/compendioarcano?rid=4626045&slug=compendioarcano',
    color: 'text-purple-400',
    benefits: [
      { test: 'Todo lo de Campeón Consagrado', icon: <Crown className="w-4 h-4 text-purple-400" /> },
      { test: 'Badge púrpura con animación (efecto glow pulsante)', icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
      { test: 'Prioridad en queue de procesamiento', icon: <Zap className="w-4 h-4 text-purple-400" /> },
      { test: 'Respuesta garantizada en 24-48h', icon: <MessageCircle className="w-4 h-4 text-purple-400" /> },
      { test: 'Acceso directo al desarrollador (Discord DM/email)', icon: <Mail className="w-4 h-4 text-purple-400" /> },
      { test: 'Creación de contenido homebrew personalizado', icon: <PenTool className="w-4 h-4 text-purple-400" /> },
      { test: 'Tu creación se añade con tu nombre como autor', icon: <User className="w-4 h-4 text-purple-400" /> },
      { test: 'Bienvenido al círculo interno', icon: <Heart className="w-4 h-4 text-purple-400" /> },
    ],
  },
];

const goals = [
  { amount: 'u$d 100/mes', title: 'Servidor Dedicado', description: 'Rendimiento 50% mejor, uptime 99.9%' },
  { amount: 'u$d 250/mes', title: 'Artista Profesional', description: 'Diseños UI/UX y arte exclusivo para la plataforma' },
  { amount: 'u$d 500/mes', title: 'Desarrollo Part-Time', description: '20h/semana de desarrollo' },
  { amount: 'u$d 1000/mes', title: 'Desarrollo Full-Time', description: '40h/semana + proyectos complementarios' },
];

function TargetIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
}

// Force dynamic rendering to fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // but revalidate every hour if possible

export default async function PatreonPage() {
  const patronCount = await getPatronCount();

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dungeon-950 via-dungeon-900/90 to-dungeon-950/50"></div>

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-dungeon-400 hover:text-dungeon-200 pl-0 gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Volver al Inicio
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-dungeon-100 leading-tight">
                Conviértete en Mecenas
              </h1>
              <p className="text-lg text-dungeon-300 leading-relaxed">
                Apoya el desarrollo de Compendio Arcano. Tu contribución nos ayuda a mantener los servidores, traducir contenido y desarrollar nuevas funcionalidades para la comunidad.
              </p>
            </div>

            {/* Active Subscribers Indicator (Real Data, No Progress Bar) */}
            {(patronCount !== null && patronCount > 0) && (
              <div className="inline-flex items-center gap-3 bg-dungeon-950/50 border border-dungeon-700/50 rounded-full px-5 py-2 backdrop-blur-sm">
                <Users className="h-5 w-5 text-gold-400" />
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gold-400">{patronCount}</span>
                  <span className="text-sm font-bold text-dungeon-300 uppercase tracking-wider">Mecenas Activos</span>
                </div>
              </div>
            )}

            {(patronCount === null || patronCount === 0) && (
              <div className="inline-flex items-center gap-3 bg-dungeon-950/50 border border-dungeon-700/50 rounded-full px-5 py-2 backdrop-blur-sm">
                <Users className="h-5 w-5 text-gold-400" />
                <span className="text-sm font-bold text-dungeon-300 uppercase tracking-wider">Únete a la comunidad</span>
              </div>
            )}

          </div>

          {/* Icon Display */}
          <div className="hidden md:block p-6 rounded-full bg-gold-500/10 border border-gold-500/30 backdrop-blur-sm shadow-[0_0_30px_rgba(234,179,8,0.2)]">
            <Heart className="h-16 w-16 text-gold-500 animate-pulse-slow" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-6 text-center hover:-translate-y-1 transition-transform bg-dungeon-800 border border-dungeon-700 group">
          <BookOpen className="w-8 h-8 text-gold-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <div className="text-3xl font-bold text-dungeon-100 mb-1">118</div>
          <div className="label text-xs text-dungeon-400 uppercase tracking-wide">Libros</div>
        </div>
        <div className="card p-6 text-center hover:-translate-y-1 transition-transform bg-dungeon-800 border border-dungeon-700 group">
          <Sparkles className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <div className="text-3xl font-bold text-dungeon-100 mb-1">605</div>
          <div className="label text-xs text-dungeon-400 uppercase tracking-wide">Conjuros</div>
        </div>
        <div className="card p-6 text-center hover:-translate-y-1 transition-transform bg-dungeon-800 border border-dungeon-700 group">
          <Zap className="w-8 h-8 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <div className="text-3xl font-bold text-dungeon-100 mb-1">143</div>
          <div className="label text-xs text-dungeon-400 uppercase tracking-wide">Dotes</div>
        </div>
        <div className="card p-6 text-center hover:-translate-y-1 transition-transform bg-dungeon-800 border border-dungeon-700 group">
          <Users className="w-8 h-8 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <div className="text-3xl font-bold text-dungeon-100 mb-1">16</div>
          <div className="label text-xs text-dungeon-400 uppercase tracking-wide">Razas</div>
        </div>
      </div>

      {/* Tiers Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Crown className="h-8 w-8 text-gold-500" />
          <h2 className="text-2xl font-bold text-dungeon-100">Elige Tu Tier</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`
                card flex flex-col relative bg-dungeon-800 border transition-all duration-300
                ${tier.popular ? 'border-gold-500 shadow-xl scale-105 z-10' : 'border-dungeon-700 hover:border-dungeon-500'}
              `}
              style={tier.popular ? { overflow: 'visible' } : undefined}
            >
              <div className="p-8 pb-0">
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-dungeon-950 text-xs font-bold px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    MÁS POPULAR
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`inline-flex p-4 rounded-full bg-dungeon-900/50 mb-4 ${tier.color}`}>
                    {tier.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${tier.color}`}>
                    {tier.name}
                  </h3>
                  <div className="text-4xl font-bold text-dungeon-100 mb-1">
                    {tier.price}
                    <span className="text-base text-dungeon-400 font-normal">/mes</span>
                  </div>
                  {tier.priceNote && (
                    <div className="tag tag-primary mt-2 inline-block px-2 py-1 bg-dungeon-700 text-dungeon-300 rounded text-xs">
                      {tier.priceNote}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8 pt-0 flex-1 flex flex-col">
                <div className="space-y-4 mb-8 flex-1">
                  {tier.benefits.map((benefit, index) => (
                    <div key={index} className="text-sm text-dungeon-300 flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 opacity-80">
                        {benefit.icon}
                      </div>
                      <span className="leading-snug">{benefit.test}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={tier.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn w-full py-3 px-4 rounded-lg font-bold text-center transition-all flex items-center justify-center gap-2 group
                        ${tier.popular
                      ? 'bg-gold-500 text-dungeon-950 hover:bg-gold-400 shadow-lg shadow-gold-900/20'
                      : 'bg-dungeon-700 text-dungeon-200 hover:bg-dungeon-600 hover:text-dungeon-100'}`}
                >
                  {tier.id === 'heroe_emergente' ? 'Prueba Gratis 7 días' : 'Súmate Ahora'}
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card overflow-hidden bg-dungeon-800 border border-dungeon-700 rounded-lg">
        <div className="p-6 border-b border-dungeon-700 bg-dungeon-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart className="h-6 w-6 text-gold-400" />
            <h2 className="text-2xl font-bold text-gold-400 font-heading">
              Comparación de Beneficios
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-dungeon-950/50 text-left">
                <th className="py-4 px-6 text-dungeon-400 font-bold uppercase tracking-wider">Beneficio</th>
                <th className="text-center py-4 px-6 text-dungeon-500 font-bold uppercase tracking-wider">Gratis</th>
                <th className="text-center py-4 px-6 text-blue-400 font-bold uppercase tracking-wider">
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="w-5 h-5" />
                    Héroe
                  </div>
                </th>
                <th className="text-center py-4 px-6 text-gold-400 font-bold uppercase tracking-wider">
                  <div className="flex flex-col items-center gap-1">
                    <Crown className="w-5 h-5" />
                    Campeón
                  </div>
                </th>
                <th className="text-center py-4 px-6 text-purple-400 font-bold uppercase tracking-wider">
                  <div className="flex flex-col items-center gap-1">
                    <Star className="w-5 h-5" />
                    Leyenda
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dungeon-700/50">
              {[
                { name: 'Usar el compendio', icon: <BookOpen className="w-4 h-4" />, free: true, hero: true, champ: true, legend: true },
                { name: 'Créditos en /sobre', icon: <Medal className="w-4 h-4" />, free: false, hero: true, champ: true, legend: true },
                { name: 'Discord de mecenas', icon: <MessageCircle className="w-4 h-4" />, free: false, hero: true, champ: true, legend: true },
                { name: 'Badge exclusivo', icon: <User className="w-4 h-4" />, free: false, hero: false, champ: 'Oro', legend: 'Animado' },
                { name: 'Votar roadmap', icon: <Vote className="w-4 h-4" />, free: false, hero: false, champ: true, legend: true },
                { name: 'Estadísticas', icon: <BarChart className="w-4 h-4" />, free: false, hero: false, champ: true, legend: true },
                { name: 'Prioridad queue', icon: <Zap className="w-4 h-4" />, free: false, hero: false, champ: false, legend: true },
                { name: 'Acceso directo', icon: <Mail className="w-4 h-4" />, free: false, hero: false, champ: false, legend: true },
                { name: 'Homebrew propio', icon: <PenTool className="w-4 h-4" />, free: false, hero: false, champ: false, legend: true },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-dungeon-700/30 transition-colors">
                  <td className="py-4 px-6 text-dungeon-200 font-medium">
                    <div className="flex items-center gap-3">
                      <span className="text-dungeon-500">{row.icon}</span>
                      {row.name}
                    </div>
                  </td>
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
      <div className="card p-8 bg-dungeon-800 border border-dungeon-700 rounded-lg">
        <h2 className="text-2xl font-bold text-gold-400 mb-8 flex items-center gap-3 font-heading">
          <TrendingUp className="w-6 h-6" />
          Metas de Financiamiento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="rounded-xl border border-dungeon-700 bg-dungeon-950/30 p-5 hover:border-gold-500/30 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 font-bold group-hover:scale-110 transition-transform">
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
      <div className="card p-12 text-center border-gold-500/30 bg-gradient-to-b from-dungeon-800 to-dungeon-900 rounded-lg border">
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
            className="btn btn-primary text-lg px-8 py-4 rounded font-bold shadow-lg shadow-gold-900/20"
          >
            <Heart className="w-5 h-5 fill-current" />
            Convertirme en Mecenas
          </a>

          <Link
            href="/sobre"
            className="btn btn-secondary text-lg px-8 py-4 rounded font-bold"
          >
            Conocer Más del Proyecto
          </Link>
        </div>
      </div>
    </div>
  );
}

function renderCheck(value: boolean | string) {
  if (value === true) return <Check className="w-5 h-5 text-green-400 inline" />;
  if (value === false) return <X className="w-5 h-5 text-dungeon-600/50 inline" />;
  return <span className="text-xs font-bold px-2 py-1 rounded bg-dungeon-700 text-gold-400 border border-gold-500/30 whitespace-nowrap">{value}</span>;
}
