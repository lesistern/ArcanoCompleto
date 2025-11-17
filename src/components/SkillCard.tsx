import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { DnDSkill } from '@/lib/types/skill';
import { getSkillCategoryIcon, getSkillCategoryColor, getAbilityColor, getAbilityIcon, extractTextColor } from '@/lib/utils/icons';

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
    <Link href={`/habilidades/${skillData.slug}`}>
      <Card className="h-full transition-all hover:border-dungeon-600 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <Icon className={`h-6 w-6 ${iconColor}`} />
              <CardTitle className="text-lg group-hover:text-gold-500 transition-colors">
                {skillData.name}
              </CardTitle>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs px-2 py-0.5 rounded border bg-dungeon-800/50 border-dungeon-700 font-semibold ${abilityColor} flex items-center gap-1`}>
              <AbilityIcon className="h-3 w-3" />
              {skillData.keyAbility}
            </span>
            {skillData.trainedOnly && (
              <span className="text-xs px-2 py-0.5 rounded border bg-red-500/20 text-red-400 border-red-500/30">
                Solo entrenado
              </span>
            )}
            {skillData.armorCheckPenalty && (
              <span className="text-xs px-2 py-0.5 rounded border bg-orange-500/20 text-orange-400 border-orange-500/30">
                Penaliz. armadura
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-dungeon-300 mb-3">
            {skillData.shortDescription}
          </p>

          <div className="space-y-2">
            <div className="flex items-start gap-2 text-xs">
              <span className="text-dungeon-500 font-semibold min-w-[70px]">Categoría:</span>
              <span className="text-dungeon-400">{skillData.category}</span>
            </div>

            {skillData.classSkillFor && skillData.classSkillFor.length > 0 && (
              <div className="flex items-start gap-2 text-xs">
                <span className="text-dungeon-500 font-semibold min-w-[70px]">Clases:</span>
                <span className="text-dungeon-400 line-clamp-2">
                  {skillData.classSkillFor.slice(0, 4).join(', ')}
                  {skillData.classSkillFor.length > 4 && '...'}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
