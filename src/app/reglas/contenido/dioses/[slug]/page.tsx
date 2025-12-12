'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Sword, Shield, Skull, Crown, ArrowLeft, Book, Users, Home, Scroll, Info } from 'lucide-react';
import { ALIGNMENT_CONFIG, getAlignmentImageGlow } from '@/lib/data/alignments';
import { DEITY_RANK_CONFIG } from '@/lib/data/deity-ranks';
import { getDeityImageUrl, hasDeityImage } from '@/lib/data/deity-images';
import { DeityDebugInfo } from './debug';
import { FormattedText } from '@/components/FormattedText';
import type { CSSProperties } from 'react';

interface Deity {
    slug: string;
    name_es: string;
    rank: string;
    titles_es: string;
    portfolio_es: string;
    alignment: string;
    domains: string[];
    favored_weapon: string;
    symbol_es: string;
    worshipers_es: string;
    home_plane_es: string;
    description_es: string;
    teachings_es?: string;
    clergy_es?: string;
    temples_es?: string;
    rites_es?: string;
    herald_allies_es?: string;
    image_url?: string | null;
}


function InfoCard({ title, icon: Icon, children, formatted = false }: { title: string; icon: any; children: React.ReactNode; formatted?: boolean }) {
    return (
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center gap-2 mb-4">
                <Icon className="w-5 h-5 text-gold-400" />
                <h3 className="text-lg font-semibold text-gold-400 font-cinzel">{title}</h3>
            </div>
            {formatted ? (
                <FormattedText text={typeof children === 'string' ? children : ''} className="text-gray-200" />
            ) : (
                <div className="text-gray-200 space-y-2">
                    {children}
                </div>
            )}
        </div>
    );
}

export default function DeityDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [deity, setDeity] = useState<Deity | null>(null);
    const [loading, setLoading] = useState(true);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        async function fetchDeity() {
            const { data, error } = await supabase
                .from('deities')
                .select('slug, name_es, rank, titles_es, portfolio_es, alignment, domains, favored_weapon, symbol_es, worshipers_es, home_plane_es, description_es, teachings_es, clergy_es, temples_es, rites_es, herald_allies_es, image_url')
                .eq('slug', slug)
                .single();

            if (error) {
                console.error('Error fetching deity:', error);
            } else {
                setDeity(data);
            }
            setLoading(false);
        }

        if (slug) {
            fetchDeity();
        }
    }, [slug, supabase]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
                <div className="text-gold-400 text-xl">Cargando deidad...</div>
            </div>
        );
    }

    if (!deity) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-400 text-xl mb-4">Deidad no encontrada</p>
                    <Link href="/reglas/contenido/dioses" className="text-gold-400 hover:text-gold-300">
                        ← Volver a dioses
                    </Link>
                </div>
            </div>
        );
    }

    const rankConfig = DEITY_RANK_CONFIG[deity.rank];
    const RankIcon = rankConfig?.icon || Shield;
    const alignmentGlow = getAlignmentImageGlow(deity.alignment);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
            <DeityDebugInfo slug={slug} />
            {/* Header */}
            <div className="relative overflow-hidden border-b border-gold-500/20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5"></div>
                <div className="container mx-auto px-4 py-12 relative">
                    <Link
                        href="/reglas/contenido/dioses"
                        className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a dioses
                    </Link>

                    <div className="flex items-stretch gap-6 justify-between">
                        <div className="flex items-stretch gap-6">
                            {/* Deity Image as Icon */}
                            {(deity.image_url || hasDeityImage(deity.slug)) ? (
                                <div className="flex-shrink-0">
                                    <div className="relative w-40 h-72 flex-shrink-0 rounded-lg bg-transparent flex items-center justify-center overflow-hidden">
                                        {/* Glow layer */}
                                        <div
                                            className="absolute inset-0 opacity-40 blur-2xl"
                                            style={{
                                                background: `radial-gradient(ellipse at center, ${alignmentGlow.from} 0%, ${alignmentGlow.via} 35%, ${alignmentGlow.to} 70%, transparent 100%)`
                                            } as CSSProperties}
                                        />
                                        {/* Image */}
                                        <Image
                                            src={deity.image_url || getDeityImageUrl(deity.slug) || ''}
                                            alt={deity.name_es}
                                            width={160}
                                            height={300}
                                            className="object-contain p-2 relative z-10 drop-shadow-2xl"
                                            sizes="160px"
                                            priority
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/20 border-2 border-gold-500/50 flex items-center justify-center">
                                        <RankIcon className="w-10 h-10" style={{ color: rankConfig?.hex || '#FFCE45' }} />
                                    </div>
                                </div>
                            )}

                            <div className="flex-1">
                                <h1 className="text-5xl font-bold text-gold-400 font-cinzel mb-2">
                                    {deity.name_es}
                                </h1>
                                <p className="text-xl text-gray-300 italic mb-4">
                                    {deity.titles_es}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    <span
                                        className={`px-3 py-1.5 rounded-lg border bg-gray-900/50 cursor-help `}
                                        style={{
                                            color: rankConfig?.hex || '#B8BBC2',
                                            borderColor: `${rankConfig?.hex || '#B8BBC2'}80`
                                        }}
                                        title={rankConfig?.justification || 'Rango desconocido'}
                                    >
                                        {rankConfig?.label || deity.rank}
                                    </span>
                                    <span
                                        className={`px-3 py-1.5 rounded-lg border bg-gray-900/50 cursor-help `}
                                        style={{
                                            color: ALIGNMENT_CONFIG[deity.alignment]?.hex || '#B8BBC2',
                                            borderColor: `${ALIGNMENT_CONFIG[deity.alignment]?.hex || '#B8BBC2'}80`
                                        }}
                                        title={ALIGNMENT_CONFIG[deity.alignment]?.description || 'Alineamiento desconocido'}
                                    >
                                        {ALIGNMENT_CONFIG[deity.alignment]?.label || deity.alignment}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">{/* Description */}
                        <InfoCard title="Descripción" icon={Book} formatted={true}>
                            {deity.description_es}
                        </InfoCard>

                        {/* Teachings */}
                        {deity.teachings_es && (
                            <InfoCard title="Enseñanzas" icon={Scroll} formatted={true}>
                                {deity.teachings_es}
                            </InfoCard>
                        )}

                        {/* Clergy */}
                        {deity.clergy_es && (
                            <InfoCard title="Clero" icon={Users} formatted={true}>
                                {deity.clergy_es}
                            </InfoCard>
                        )}

                        {/* Temples */}
                        {deity.temples_es && (
                            <InfoCard title="Templos" icon={Home} formatted={true}>
                                {deity.temples_es}
                            </InfoCard>
                        )}

                        {/* Rites */}
                        {deity.rites_es && (
                            <InfoCard title="Ritos" icon={Sparkles} formatted={true}>
                                {deity.rites_es}
                            </InfoCard>
                        )}

                        {/* Herald & Allies */}
                        {deity.herald_allies_es && (
                            <InfoCard title="Heraldos y Aliados Planares" icon={Shield} formatted={true}>
                                {deity.herald_allies_es}
                            </InfoCard>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info */}
                        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-lg border border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gold-400 font-cinzel mb-4">Información Rápida</h3>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-gold-400/80 mb-1">Portafolio:</h4>
                                    <p className="text-sm text-gray-200">{deity.portfolio_es}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gold-400/80 mb-1">Símbolo:</h4>
                                    <p className="text-sm text-gray-200">{deity.symbol_es}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gold-400/80 mb-1">Arma Predilecta:</h4>
                                    <p className="text-sm text-gray-200">{deity.favored_weapon}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gold-400/80 mb-1">Adoradores:</h4>
                                    <p className="text-sm text-gray-200">{deity.worshipers_es}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gold-400/80 mb-1">Plano Hogar:</h4>
                                    <p className="text-sm text-gray-200">{deity.home_plane_es}</p>
                                </div>
                            </div>
                        </div>

                        {/* Domains */}
                        {deity.domains && deity.domains.length > 0 && (
                            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-lg border border-gray-700 p-6">
                                <h3 className="text-lg font-semibold text-gold-400 font-cinzel mb-4">Dominios</h3>
                                <div className="flex flex-wrap gap-2">
                                    {deity.domains.map((domain, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 rounded-lg bg-gray-900/70 border border-gray-600 text-gray-200 text-sm"
                                        >
                                            {domain}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
