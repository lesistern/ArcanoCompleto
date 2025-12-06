import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DnDSkill } from '@/lib/types/skill';
import { getSkillCategoryIcon, getSkillCategoryColor, getAbilityColor, getAbilityIcon, extractTextColor } from '@/lib/utils/icons';
import { ChevronRight } from 'lucide-react';

interface SkillCardProps {
  skillData: DnDSkill;
}

export default function SkillCard({ skillData }: SkillCardProps) {
  const Icon = getSkillCategoryIcon(skillData.category);
  const categoryColor = getSkillCategoryColor(skillData.category);
  const iconColor = extractTextColor(categoryColor);
  const abilityColor = getAbilityColor(skillData.keyAbility);
  const AbilityIcon = getAbilityIcon(skillData.keyAbility);

  return (
    <Link href={`/habilidades/${skillData.slug}`} className="block h-full group">
      <div className="relative h-full bg-dungeon-900 border border-dungeon-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-gold-500/50 hover:shadow-lg hover:shadow-gold-500/10 hover:-translate-y-1">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('/images/textures/noise.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-dungeon-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <div className="relative p-5 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-dungeon-950 border border-dungeon-800 group-hover:border-gold-500/30 transition-colors ${iconColor}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-dungeon-100 group-hover:text-gold-500 transition-colors leading-tight">
                  {skillData.name}
                </h3>
                <span className="text-xs text-dungeon-500 font-medium uppercase tracking-wider">
                  {skillData.category}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-dungeon-300 mb-4 line-clamp-2 flex-grow leading-relaxed">
            {skillData.shortDescription ||
              (skillData.description
                ? skillData.description.substring(0, 120) + (skillData.description.length > 120 ? '...' : '')
                : 'Sin descripción disponible'
              )
            }
          </p>

          {/* Footer / Badges */}
          <div className="mt-auto pt-4 border-t border-dungeon-800/50 flex flex-wrap gap-2">
            <span className={`text-xs px-2 py-1 rounded-md border bg-dungeon-950/50 border-dungeon-800 font-semibold ${abilityColor} flex items-center gap-1.5`}>
              <AbilityIcon className="h-3 w-3" />
              {skillData.keyAbility}
            </span>

            {skillData.trainedOnly && (
              <span className="text-xs px-2 py-1 rounded-md border bg-red-950/30 text-red-400 border-red-900/50" title="Solo entrenado">
                Entrenado
              </span>
            )}

            {skillData.armorCheckPenalty && (
              <span className="text-xs px-2 py-1 rounded-md border bg-orange-950/30 text-orange-400 border-orange-900/50" title="Penalización por armadura">
                Penaliz.
              </span>
            )}
          </div>

          {/* Hover Indicator */}
          <div className="absolute top-5 right-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <ChevronRight className="h-5 w-5 text-gold-500" />
          </div>
        </div>
      </div>
    </Link>
  );
}
