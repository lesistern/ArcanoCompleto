import { Metadata } from 'next';
import Link from 'next/link';
import {
    ArrowLeft, Users, MessageSquare, Swords, HelpCircle,
    Mic, Shield, ExternalLink, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getDiscordStats } from '@/lib/discord-server';

export const metadata: Metadata = {
    title: 'Comunidad de Discord | Compendio Arcano',
    description: 'Únete a la comunidad de D&D 3.5 más grande en español. Encuentra grupo, resuelve dudas y comparte tus historias.',
};

// Force dynamic rendering to fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 300;

export default async function DiscordPage() {
    const discordData = await getDiscordStats();
    const inviteUrl = discordData?.instant_invite || process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || 'https://discord.gg/';
    const onlineCount = discordData?.presence_count || 0;

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl space-y-12">

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
                                La Taberna de <span className="text-gold-500">Discord</span>
                            </h1>
                            <p className="text-lg text-dungeon-300 leading-relaxed">
                                El corazón de nuestra comunidad. Un lugar para encontrar grupo, debatir reglas, compartir homebrew y charlar con otros aventureros.
                            </p>
                        </div>

                        {/* Online Stats Indicator */}
                        {onlineCount > 0 ? (
                            <div className="inline-flex items-center gap-3 bg-dungeon-950/50 border border-dungeon-700/50 rounded-full px-5 py-2 backdrop-blur-sm animate-fade-in">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-green-400">{onlineCount}</span>
                                    <span className="text-sm font-bold text-dungeon-300 uppercase tracking-wider">Aventureros en línea</span>
                                </div>
                            </div>
                        ) : (
                            <div className="inline-flex items-center gap-3 bg-dungeon-950/50 border border-dungeon-700/50 rounded-full px-5 py-2 backdrop-blur-sm">
                                <Users className="h-4 w-4 text-dungeon-400" />
                                <span className="text-sm font-bold text-dungeon-300 uppercase tracking-wider">Comunidad Activa</span>
                            </div>
                        )}

                        <div className="pt-4">
                            <a
                                href={inviteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary text-lg px-8 py-4 rounded font-bold shadow-lg shadow-gold-900/20 inline-flex items-center gap-2"
                            >
                                <MessageSquare className="w-5 h-5 fill-current" />
                                Unirse al Servidor
                            </a>
                        </div>

                    </div>

                    {/* Icon/Logo Display */}
                    <div className="hidden md:block p-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-sm shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                        <div className="relative">
                            <MessageSquare className="h-24 w-24 text-indigo-400 relative z-10" />
                            <Swords className="h-12 w-12 text-indigo-600 absolute -bottom-2 -right-2 z-20" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Card 1 */}
                <div className="card p-6 bg-dungeon-800 border border-dungeon-700 hover:border-indigo-500/50 transition-colors group">
                    <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <HelpCircle className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-dungeon-100 mb-2">Resolución de Dudas</h3>
                    <p className="text-dungeon-300 text-sm">
                        ¿No sabes cómo funciona la Lucha de Presa? ¿Dudas con un conjuro? Nuestros veteranos y moderadores te ayudarán a interpretar las reglas.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="card p-6 bg-dungeon-800 border border-dungeon-700 hover:border-indigo-500/50 transition-colors group">
                    <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-dungeon-100 mb-2">Búsqueda de Grupo</h3>
                    <p className="text-dungeon-300 text-sm">
                        Encuentra mesas para jugar o jugadores para tu campaña. Tenemos canales dedicados a LFG (Looking For Group) para D&D 3.5.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="card p-6 bg-dungeon-800 border border-dungeon-700 hover:border-indigo-500/50 transition-colors group">
                    <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Mic className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-dungeon-100 mb-2">Canales de Voz</h3>
                    <p className="text-dungeon-300 text-sm">
                        Salas de voz para tus partidas, música ambiental y charlas casuales sobre rol, videojuegos y más.
                    </p>
                </div>

                {/* Card 4 */}
                <div className="card p-6 bg-dungeon-800 border border-dungeon-700 hover:border-indigo-500/50 transition-colors group">
                    <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-dungeon-100 mb-2">Desarrollo del Compendio</h3>
                    <p className="text-dungeon-300 text-sm">
                        Participa en el desarrollo de esta web. Reporta bugs, sugiere funcionalidades y vota en encuestas de desarrollo (Mecenas).
                    </p>
                </div>
            </div>

            {/* Community Rules Preview */}
            <div className="card p-8 bg-dungeon-900/50 border border-dungeon-800 rounded-lg">
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="h-6 w-6 text-gold-500" />
                    <h2 className="text-2xl font-bold text-dungeon-100">Normas de Convivencia</h2>
                </div>

                <ul className="space-y-4 text-dungeon-300">
                    <li className="flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                        <span><strong>Respeto ante todo:</strong> No se toleran insultos, acoso o discriminación de ningún tipo.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                        <span><strong>No Spam:</strong> Evita el flood, publicidad no autorizada o enlaces sospechosos.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                        <span><strong>Temática:</strong> Mantén los temas en sus canales correspondientes (reglas en #reglas, memes en #off-topic).</span>
                    </li>
                </ul>
            </div>

        </div>
    );
}
