import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { DnDClass } from '@/lib/types/class';
import { getClassIcon } from '@/lib/utils/classIcons';
import { getDiceIcon } from '@/lib/utils/diceIcons';
import { getClassColor, extractTextColor } from '@/lib/utils/icons';

interface ClassCardProps {
  classData: DnDClass;
}

const getSpellcastingBadge = (classData: DnDClass) => {
  if (!classData.spellcasting) return null;

  const typeColor = classData.spellcasting.spellType === 'arcanos'
    ? 'bg-spell-blue/20 text-spell-blue border-spell-blue/30'
    : 'bg-gold-500/20 text-gold-500 border-gold-500/30';

  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${typeColor}`}>
      Conjuros {classData.spellcasting.spellType}
    </span>
  );
};

export default function ClassCard({ classData }: ClassCardProps) {
  const Icon = getClassIcon(classData.slug);
  const DiceIcon = getDiceIcon(classData.hitDie);
  const colorClasses = getClassColor(classData.name);
  const iconColor = extractTextColor(colorClasses);

  return (
    <Link href={`/clases/${classData.slug}`}>
      <Card className="h-full transition-all hover:border-dungeon-600 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <Icon className={`h-6 w-6 ${iconColor}`} />
              <CardTitle className="text-lg group-hover:text-gold-500 transition-colors">
                {classData.name}
              </CardTitle>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-mono text-dungeon-400 bg-dungeon-800 px-2.5 py-1.5 rounded">
              <DiceIcon className="h-6 w-6" />
              <span className="font-semibold">{classData.hitDie}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {getSpellcastingBadge(classData)}
            <span className="text-xs px-2 py-0.5 rounded border bg-dungeon-800/50 text-dungeon-300 border-dungeon-700">
              {classData.skillPointsPerLevel} puntos/nivel
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-dungeon-300 mb-3">
            {classData.shortDescription}
          </p>

          <div className="space-y-2">
            <div className="flex items-start gap-2 text-xs">
              <span className="text-dungeon-500 font-semibold min-w-[80px]">Habilidad:</span>
              <span className="text-dungeon-400">
                {classData.primaryAbility.join(', ')}
              </span>
            </div>

            <div className="flex items-start gap-2 text-xs">
              <span className="text-dungeon-500 font-semibold min-w-[80px]">Salvaciones:</span>
              <span className="text-dungeon-400">
                {classData.goodSaves.join(', ')}
              </span>
            </div>

            {classData.alignment && classData.alignment.length > 0 && (
              <div className="flex items-start gap-2 text-xs">
                <span className="text-dungeon-500 font-semibold min-w-[80px]">Alineamiento:</span>
                <span className="text-dungeon-400">
                  {classData.alignment.join(', ')}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
