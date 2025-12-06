'use client';

import Link from 'next/link';

interface VariantCardProps {
    name: string;
    slug: string;
    classSlug: string;
    level?: string;
    levels?: string;
    benefit?: string;
    features?: string;
}

export default function VariantCard({ name, slug, classSlug, level, levels, benefit, features }: VariantCardProps) {
    // Create summary text
    const getSummary = () => {
        if (levels) {
            return `Niveles ${levels}`;
        }
        if (level) {
            return `Nivel ${level}`;
        }
        return '';
    };

    const description = benefit || features || 'Sin descripción';

    return (
        <Link
            href={`/clases/${classSlug}/variantes/${slug}`}
            className="block bg-dungeon-900/40 border border-dungeon-700 rounded-lg p-4 hover:border-gold-500 hover:bg-dungeon-900/60 hover:shadow-lg hover:shadow-gold-500/10 transition-all duration-300 ease-out transform hover:-translate-y-1 will-change-transform animate-fade-in"
            style={{
                animationDelay: '0ms',
                animationFillMode: 'both'
            }}
        >
            <div className="flex-1">
                <h4 className="text-dungeon-100 font-semibold mb-1 transition-colors duration-200 group-hover:text-gold-500">
                    {name}
                </h4>
                {getSummary() && (
                    <p className="text-xs text-gold-500 mb-2 transition-opacity duration-200">
                        {getSummary()}
                    </p>
                )}
            </div>

            {/* Summary - always visible, truncated to 2 lines */}
            <p className="text-sm text-dungeon-300 leading-relaxed line-clamp-2 transition-colors duration-200">
                {description}
            </p>
        </Link>
    );
}
