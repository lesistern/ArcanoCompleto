import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Scroll, Crown, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { alignmentDetails, axisDescriptions } from '@/lib/data/alignments';

// Metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const details = alignmentDetails[params.slug as keyof typeof alignmentDetails];
    if (!details) return { title: 'Alineamiento no encontrado' };
    return {
        title: `${details.name} - Reglas D&D 3.5`,
        description: details.shortDesc,
    };
}

export default function AlignmentDetailPage({ params }: { params: { slug: string } }) {
    const details = alignmentDetails[params.slug as keyof typeof alignmentDetails];

    if (!details) {
        notFound();
    }

    const Axis1 = axisDescriptions[details.axis.lawChaos];
    const Axis2 = axisDescriptions[details.axis.goodEvil];

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            {/* Back Button */}
            <div className="mb-8">
                <Link href="/reglas/descripcion">
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a descripción
                    </Button>
                </Link>
            </div>

            {/* Header */}
            <div className="border-l-4 border-gold-500 pl-6 mb-12">
                <div className="flex items-center gap-3 mb-3">
                    <Scroll className="h-8 w-8 text-gold-400" />
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100">
                        {details.name}
                    </h1>
                </div>
                <div className="flex items-center gap-2 text-xl text-gold-500 font-serif italic">
                    <Crown className="h-5 w-5" />
                    <span>&quot;{details.archetype}&quot;</span>
                </div>
            </div>

            <div className="space-y-8">
                {/* Main Description */}
                <Card className="card border-gold-500/30">
                    <CardHeader className="bg-gradient-to-r from-gold-900/20 to-transparent">
                        <CardTitle className="text-2xl text-dungeon-100">Descripción</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <p className="text-lg text-dungeon-200 leading-relaxed">
                            {details.description}
                        </p>
                    </CardContent>
                </Card>

                {/* The "Quote" (Best/Dangerous) */}
                <Card className={`card ${details.quoteType === 'best' ? 'border-green-500/30' : 'border-red-500/30'}`}>
                    <CardContent className="p-8 flex gap-4 items-start">
                        {details.quoteType === 'best' ? (
                            <Shield className="h-8 w-8 text-green-400 flex-shrink-0 mt-1" />
                        ) : (
                            <AlertTriangle className="h-8 w-8 text-red-400 flex-shrink-0 mt-1" />
                        )}
                        <div>
                            <h3 className={`font-bold text-lg mb-2 ${details.quoteType === 'best' ? 'text-green-400' : 'text-red-400'}`}>
                                {details.quoteType === 'best' ? 'Por qué es el mejor:' : 'Por qué es peligroso:'}
                            </h3>
                            <p className="text-dungeon-200 italic text-lg">
                                &quot;{details.quote}&quot;
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Axis Breakdown */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Axis 1 (Law/Chaos) */}
                    <Card className={`card ${Axis1.borderColor}`}>
                        <CardHeader className={`${Axis1.bg} border-b ${Axis1.borderColor}`}>
                            <CardTitle className={`flex items-center gap-2 ${Axis1.color}`}>
                                <Axis1.icon className="h-5 w-5" />
                                {Axis1.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-dungeon-300 text-sm">
                                {Axis1.desc}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Axis 2 (Good/Evil) */}
                    <Card className={`card ${Axis2.borderColor}`}>
                        <CardHeader className={`${Axis2.bg} border-b ${Axis2.borderColor}`}>
                            <CardTitle className={`flex items-center gap-2 ${Axis2.color}`}>
                                <Axis2.icon className="h-5 w-5" />
                                {Axis2.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-dungeon-300 text-sm">
                                {Axis2.desc}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
