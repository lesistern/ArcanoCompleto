import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Sword, Coins, Weight, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/Button';
import { WeaponStatsDisplay } from '@/components/weapons/WeaponStatsDisplay';

interface WeaponDetailProps {
    slug: string;
}

export async function WeaponDetail({ slug }: WeaponDetailProps) {
    const supabase = await createClient();
    const { data: item } = await supabase
        .from('srd_items')
        .select(`
            *,
            srd_weapons(*)
        `)
        .eq('slug', slug)
        .eq('item_category', 'weapon')
        .single();

    if (!item || !item.srd_weapons?.[0]) {
        notFound();
    }

    const weapon = item.srd_weapons[0];

    // Helper to format cost
    const formatCost = (text: string | null) => {
        if (!text) return '—';
        return text.replace(/(\d+)\s*gp/, '$1 po').replace(/(\d+)\s*sp/, '$1 pp').replace(/(\d+)\s*cp/, '$1 pc');
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            {/* Navigation */}
            <div className="mb-8">
                <Link href="/objetos/armas">
                    <Button variant="ghost" className="text-dungeon-300 hover:text-dungeon-100 pl-0">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a Armas
                    </Button>
                </Link>
            </div>

            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dungeon-900 to-dungeon-800 border border-dungeon-700 shadow-2xl mb-10">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                    <Sword className="w-64 h-64 text-dungeon-100" />
                </div>

                <div className="relative z-10 p-8 md:p-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-red-900/30 text-red-400 border border-red-900/50">
                                    {weapon.weapon_category}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-dungeon-700/50 text-dungeon-300 border border-dungeon-600">
                                    {weapon.weapon_type}
                                </span>
                            </div>
                            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-dungeon-100 via-dungeon-200 to-dungeon-400 mb-4">
                                {item.name}
                            </h1>
                            {item.description_full ? (
                                <div
                                    className="mt-4 prose prose-invert prose-lg max-w-none 
                                    prose-headings:text-gold-400 prose-headings:font-heading
                                    prose-p:text-dungeon-200 prose-p:leading-relaxed
                                    prose-strong:text-dungeon-100 prose-strong:font-bold
                                    prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300 hover:prose-a:underline
                                    [&_span.text-gold-400]:text-gold-400 [&_span.text-gold-500]:text-gold-500
                                    [&_span.text-sky-400]:text-sky-400 [&_span.text-red-400]:text-red-400
                                    "
                                    dangerouslySetInnerHTML={{ __html: item.description_full }}
                                />
                            ) : (
                                <p className="text-lg text-dungeon-300 max-w-2xl leading-relaxed">
                                    {weapon.special_rules || "Un arma confiable para cualquier aventurero."}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 min-w-[200px]">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-dungeon-950/50 border border-dungeon-800/50 backdrop-blur-sm">
                                <div className="flex items-center gap-2 text-dungeon-400">
                                    <Coins className="w-4 h-4" />
                                    <span className="text-sm font-medium">Costo</span>
                                </div>
                                <span className="text-gold-400 font-bold">{formatCost(item.price_text)}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-dungeon-950/50 border border-dungeon-800/50 backdrop-blur-sm">
                                <div className="flex items-center gap-2 text-dungeon-400">
                                    <Weight className="w-4 h-4" />
                                    <span className="text-sm font-medium">Peso</span>
                                </div>
                                <span className="text-dungeon-200 font-bold">{item.weight_text ? item.weight_text.replace('&mdash;', '—') : "—"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Display (Client Component) */}
            <WeaponStatsDisplay weapon={weapon} />
        </div>
    );
}
