import { type ClassFeature } from '@/lib/supabase/classFeatures';
import { Sparkles } from 'lucide-react';

interface ClassFeaturesSectionProps {
  features: ClassFeature[];
  className?: string;
}

export function ClassFeaturesSection({ features, className = '' }: ClassFeaturesSectionProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="h-6 w-6 text-gold-400" />
        <h2 className="text-3xl font-bold text-gold-400">Características Especiales</h2>
      </div>

      <div className="grid gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="border border-dungeon-700 rounded-lg p-6 bg-dungeon-900/50 hover:bg-dungeon-900/70 transition-colors"
          >
            <div className="flex justify-between items-start gap-4 mb-2">
              <div>
                <h3 className="text-xl font-bold text-gold-300">{feature.title}</h3>
                <p className="text-sm text-dungeon-400 mt-1">{feature.summary}</p>
              </div>
              {feature.level && (
                <div className="text-right">
                  <div className="text-sm text-dungeon-400">Nivel</div>
                  <div className="text-2xl font-bold text-gold-400">{feature.level}</div>
                </div>
              )}
            </div>
            <p className="text-dungeon-300 mt-4 text-sm leading-relaxed">{feature.full_description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
