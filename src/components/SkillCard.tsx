import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { DnDSkill } from '@/lib/types/skill';
import { Brain, Zap, Users, BookOpen, Hammer, Briefcase, Music } from 'lucide-react';

interface SkillCardProps {
  skillData: DnDSkill;
}

const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, any> = {
    'Física': Zap,
    'Mental': Brain,
    'Social': Users,
    'Conocimiento': BookOpen,
    'Oficio': Hammer,
    'Profesión': Briefcase,
    'Interpretación': Music,
  };
  return iconMap[category] || Brain;
};

const getAbilityColor = (ability: string) => {
  const colorMap: Record<string, string> = {
    'Fuerza': 'text-red-400',
    'Destreza': 'text-green-400',
    'Constitución': 'text-orange-400',
    'Inteligencia': 'text-blue-400',
    'Sabiduría': 'text-purple-400',
    'Carisma': 'text-pink-400',
  };
  return colorMap[ability] || 'text-dungeon-400';
};

export default function SkillCard({ skillData }: SkillCardProps) {
  const Icon = getCategoryIcon(skillData.category);
  const abilityColor = getAbilityColor(skillData.keyAbility);

  return (
    <Link href={`/habilidades/${skillData.slug}`}>
      <Card className="h-full transition-all hover:border-dungeon-600 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-class-green" />
              <CardTitle className="text-lg group-hover:text-gold-500 transition-colors">
                {skillData.name}
              </CardTitle>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs px-2 py-0.5 rounded border bg-dungeon-800/50 border-dungeon-700 font-semibold ${abilityColor}`}>
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
