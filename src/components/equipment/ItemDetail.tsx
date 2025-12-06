import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Sword, Shield, Package, Coins, Weight, Zap, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { createClient } from '@/lib/supabase/server';
import { Breadcrumbs } from '@/components/Breadcrumbs';

// Notas al pie del SRD para Goods and Services
const FOOTNOTES: Record<string, string> = {
    '1': 'Este objeto pesa una cuarta parte cuando se fabrica para personajes Pequeños. Los contenedores para personajes Pequeños también tienen una cuarta parte de la capacidad.',
    '2': 'Ver descripción del conjuro para costos adicionales. Si el conjuro lanzado incluye un componente de coste material, añádelo al coste mostrado.',
};

// Función para detectar y extraer notas al pie
function parseFootnotes(text: string | null | undefined): {
    cleanText: string | null;
    footnotes: string[]
} {
    if (!text) return { cleanText: null, footnotes: [] };

    const footnotes: string[] = [];
    let cleanText = text;

    // Detectar superíndices al final (después de lb., gp, sp, cp, pp, etc.)
    const match = text.match(/^(.+?)([12]+)$/);
    if (match) {
        cleanText = match[1].trim();
        // Extraer cada dígito como nota al pie separada
        const footnoteNumbers = match[2].split('');
        footnoteNumbers.forEach(num => {
            if (FOOTNOTES[num] && !footnotes.includes(num)) {
                footnotes.push(num);
            }
        });
    }

    return { cleanText, footnotes };
}

interface ItemDetailProps {
    slug: string;
    category?: string; // Opcional, para breadcrumbs o lógica específica
}

export async function ItemDetail({ slug, category }: ItemDetailProps) {
    const supabase = await createClient();
    const { data: item } = await supabase
        .from('srd_items')
        .select(`
      *,
      srd_weapons(*),
      srd_armors(*)
    `)
        .eq('slug', slug)
        .single();

    if (!item) {
        notFound();
    }

    const weapon = item.srd_weapons?.[0];
    const armor = item.srd_armors?.[0];

    // Parsear notas al pie de precio y peso
    const priceData = parseFootnotes(item.price_text);
    const weightData = parseFootnotes(item.weight_text);

    // Recolectar todas las notas al pie únicas
    const allFootnotes = [...new Set([...priceData.footnotes, ...weightData.footnotes])].sort();

    // Get icon based on category
    const getIcon = () => {
        if (item.item_category === 'weapon') return Sword;
        if (item.item_category === 'armor') return Shield;
        return Package;
    };

    const Icon = getIcon();

    // Get category label
    const getCategoryLabel = (cat: string) => {
        const labels: Record<string, string> = {
            'weapon': 'Arma',
            'armor': 'Armadura',
            'goods': 'Bien o Servicio',
            'material': 'Material Especial'
        };
        return labels[cat] || cat;
    };

    // Determinar la ruta base para breadcrumbs
    const getCategoryPath = (cat: string) => {
        const paths: Record<string, string> = {
            'weapon': 'armas',
            'armor': 'armaduras',
            'goods': 'bienes',
            'material': 'materiales',
            'magic': 'magicos'
        };
        return paths[cat] || 'otros';
    };

    const categoryPath = getCategoryPath(item.item_category);

    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <Breadcrumbs items={[
                { label: 'Equipo', href: '/objetos' },
                { label: getCategoryLabel(item.item_category), href: `/objetos/${categoryPath}` },
                { label: item.name }
            ]} />

            {/* Header */}
            <div className="border-l-4 border-amber-500 pl-6 mb-12">
                <div className="flex items-center gap-4 mb-3">
                    <Icon className="h-8 w-8 text-amber-400" />
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
                        {item.name}
                    </h1>
                </div>
                <div className="flex flex-wrap gap-3 text-sm mb-4">
                    <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold">
                        {getCategoryLabel(item.item_category)}
                    </span>
                    {weapon && (
                        <>
                            <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
                                <span className="text-dungeon-500">Categoría:</span> {weapon.weapon_category}
                            </span>
                            <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
                                <span className="text-dungeon-500">Tipo:</span> {weapon.weapon_type}
                            </span>
                        </>
                    )}
                    {armor && (
                        <span className="px-3 py-1 rounded bg-dungeon-800 text-dungeon-300 border border-dungeon-700">
                            <span className="text-dungeon-500">Categoría:</span> {armor.armor_category}
                        </span>
                    )}
                </div>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {priceData.cleanText && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Coins className="h-4 w-4 text-amber-400" />
                                Precio
                                {priceData.footnotes.length > 0 && (
                                    <span className="text-amber-500 text-xs ml-1">
                                        {priceData.footnotes.map(n => `[${n}]`).join('')}
                                    </span>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-dungeon-200 font-semibold">{priceData.cleanText}</p>
                        </CardContent>
                    </Card>
                )}

                {weightData.cleanText && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Weight className="h-4 w-4 text-gray-400" />
                                Peso
                                {weightData.footnotes.length > 0 && (
                                    <span className="text-amber-500 text-xs ml-1">
                                        {weightData.footnotes.map(n => `[${n}]`).join('')}
                                    </span>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-dungeon-200">{weightData.cleanText}</p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Weapon Stats */}
            {weapon && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sword className="h-5 w-5 text-red-400" />
                            Estadísticas de arma
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                                <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Empuñadura</h3>
                                <p className="text-dungeon-200">{weapon.handedness}</p>
                            </div>

                            {weapon.damage_by_size && (
                                <div className="bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                                    <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Daño (Medio)</h3>
                                    <p className="text-dungeon-200 font-bold">
                                        {weapon.damage_by_size.M || weapon.damage_by_size.S || 'N/A'}
                                    </p>
                                </div>
                            )}

                            <div className="bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                                <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Crítico</h3>
                                <p className="text-dungeon-200 font-bold text-red-400">
                                    {weapon.critical_range}/{weapon.critical_mult}
                                </p>
                            </div>

                            {weapon.damage_type && weapon.damage_type.length > 0 && (
                                <div className="bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                                    <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Tipo de daño</h3>
                                    <p className="text-dungeon-200">{weapon.damage_type.join(', ')}</p>
                                </div>
                            )}

                            {weapon.range_increment_ft && (
                                <div className="bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                                    <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Alcance</h3>
                                    <p className="text-dungeon-200">{weapon.range_increment_ft} pies</p>
                                </div>
                            )}

                            {weapon.special_rules && (
                                <div className="md:col-span-2 bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                                    <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Especial</h3>
                                    <p className="text-dungeon-200">{weapon.special_rules}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Armor Stats */}
            {armor && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-400" />
                            Estadísticas de armadura
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                                <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Bonificador de armadura</h3>
                                <p className="text-dungeon-200 font-bold text-blue-400">+{armor.armor_bonus}</p>
                            </div>

                            {armor.max_dex_bonus !== null && (
                                <div className="bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                                    <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Bonificador máx. de Des</h3>
                                    <p className="text-dungeon-200">+{armor.max_dex_bonus}</p>
                                </div>
                            )}

                            <div className="bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                                <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Penalizador de armadura</h3>
                                <p className="text-dungeon-200">{armor.armor_check_penalty}</p>
                            </div>

                            <div className="bg-dungeon-800/30 rounded-lg p-4 border border-dungeon-700">
                                <h3 className="text-sm font-semibold text-dungeon-500 mb-2">Fallo de conjuros arcanos</h3>
                                <p className="text-dungeon-200">{armor.arcane_spell_failure}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Description */}
            {item.description_full && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Info className="h-5 w-5 text-amber-400" />
                            Descripción
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="prose prose-invert prose-sm max-w-none prose-headings:text-amber-400 prose-p:text-dungeon-200 prose-strong:text-dungeon-100 prose-table:border-dungeon-700 [&_table]:w-full [&_th]:text-left [&_th]:text-amber-400 [&_td]:text-dungeon-200"
                            dangerouslySetInnerHTML={{ __html: item.description_full }}
                        />
                    </CardContent>
                </Card>
            )}

            {/* Notas al pie (solo si hay) */}
            {allFootnotes.length > 0 && (
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-blue-400">Notas del SRD</h4>
                            {allFootnotes.map(num => (
                                <p key={num} className="text-xs text-dungeon-300">
                                    <span className="text-blue-400 font-bold">[{num}]</span>{' '}
                                    {FOOTNOTES[num]}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Source */}
            <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-4 mb-8">
                <p className="text-xs text-dungeon-500">
                    Fuente: Manual del Jugador 3.5
                </p>
            </div>
        </div>
    );
}
