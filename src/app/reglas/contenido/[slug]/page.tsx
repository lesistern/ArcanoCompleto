import { notFound } from 'next/navigation';
import { createStaticClient } from '@/lib/supabase/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent } from '@/components/ui/Card';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { RuleCard } from '@/components/reglas/RuleCard';
import { getAlignmentIconById } from '@/lib/utils/icons';

export const revalidate = 86400; // cache for a day
// force revalidate 4

export async function generateStaticParams() {
    const supabase = await createStaticClient();
    const { data, error } = await supabase.from('rules_content').select('slug');
    if (error) {
        console.error('Error fetching slugs for static params:', error.message);
        return [];
    }
    if (!data) return [];
    return data.map((item: any) => ({ slug: item.slug }));
}

export default async function RuleDetailPage({ params }: { params?: { slug?: string } }) {
    // `params` may be a Promise in some dev/runtime setups — await it to be safe.
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    if (!slug) {
        notFound();
        return null;
    }

    const supabase = await createStaticClient();

    // Parallel fetch for rule content and optionally alignments
    const rulePromise = supabase
        .from('rules_content')
        .select('title, description, content, category')
        .eq('slug', slug)
        .single();

    const alignmentsPromise = slug === 'alineamiento-descripcion'
        ? supabase.from('alignments').select('id, name, abbreviation, description, slug').order('id')
        : Promise.resolve({ data: null });

    const [
        { data: rule, error: ruleError },
        { data: alignments }
    ] = await Promise.all([rulePromise, alignmentsPromise]);

    if (ruleError) {
        console.error('Error fetching rule for slug', slug, ':', ruleError.message);
        notFound();
        return null;
    }
    if (!rule) {
        notFound();
        return null;
    }

    // Pre-sorted alignments (grid layout: LB, LN, LM, NB, N, NM, CB, CN, CM)
    const alignmentOrder = ['LB', 'LN', 'LM', 'NB', 'N', 'NM', 'CB', 'CN', 'CM'];
    const sortedAlignments = alignments?.slice().sort(
        (a: any, b: any) => alignmentOrder.indexOf(a.id) - alignmentOrder.indexOf(b.id)
    );

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="mb-8">
                <Link href="/reglas">
                    <Button variant="secondary" className="group">
                        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Volver a Reglas
                    </Button>
                </Link>
            </div>

            {/* Hero Section */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-16 border-l-4 border-gold-500 pl-8 py-4">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3 text-gold-500 mb-4">
                        <BookOpen className="h-6 w-6" />
                        <span className="text-sm font-bold uppercase tracking-wider text-dungeon-300">
                            {rule.category || 'Reglas Básicas'}
                        </span>
                    </div>
                    <h1 className="font-heading text-5xl md:text-6xl font-bold text-dungeon-100 leading-tight">
                        {rule.title}
                    </h1>
                    {rule.description && (
                        <p className="text-xl md:text-2xl text-dungeon-300 max-w-3xl leading-relaxed">
                            {rule.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Content Card */}
            <Card className="bg-dungeon-800/50 border-dungeon-700 backdrop-blur-sm overflow-hidden shadow-2xl mb-16">
                <CardContent className="p-10 md:p-16">
                    <div className="prose prose-invert prose-lg max-w-none
                        prose-headings:font-heading prose-headings:text-dungeon-100
                        prose-h1:text-4xl prose-h1:text-gold-500 prose-h1:mb-12 prose-h1:font-bold
                        prose-h2:text-3xl prose-h2:text-dungeon-100 prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-dungeon-700 prose-h2:pb-4
                        prose-h3:text-2xl prose-h3:text-gold-400 prose-h3:mt-12 prose-h3:mb-6
                        prose-p:text-dungeon-200 prose-p:leading-loose prose-p:mb-6 prose-p:text-lg
                        prose-strong:text-dungeon-100 prose-strong:font-bold
                        prose-ul:my-8 prose-li:my-3 prose-li:marker:text-gold-500
                        prose-blockquote:border-l-4 prose-blockquote:border-gold-500 prose-blockquote:bg-dungeon-900/50 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:my-10
                        prose-hr:border-dungeon-700 prose-hr:my-12
                        ">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{rule.content}</ReactMarkdown>
                    </div>
                </CardContent>
            </Card>

            {/* Alignment Grid (Only for alignment page) */}
            {sortedAlignments && sortedAlignments.length > 0 && (
                <div className="mb-16">
                    <h2 className="text-3xl font-heading font-bold text-dungeon-100 mb-8 border-l-4 border-gold-500 pl-4">
                        Los 9 Alineamientos
                    </h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {sortedAlignments.map((alignment: any) => (
                            <RuleCard
                                key={alignment.id}
                                href={`/reglas/descripcion/${alignment.slug}`}
                                icon={getAlignmentIconById(alignment.id)}
                                title={alignment.name}
                                abbreviation={alignment.abbreviation}
                                description={alignment.description}
                                compact
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
