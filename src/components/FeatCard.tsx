import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { DnDFeat } from '@/lib/types/feat';
import { getFeatTypeIcon, getFeatTypeColor, getClassIcon, getClassColor } from '@/lib/utils/icons';

interface FeatCardProps {
  featData: DnDFeat;
}

export default function FeatCard({ featData }: FeatCardProps) {
  const Icon = getFeatTypeIcon(featData.type);
  const typeColor = getFeatTypeColor(featData.type);

  return (
    <Link href={`/dotes/${featData.slug}`}>
      <Card className="h-full transition-all hover:border-dungeon-600 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-class-green" />
              <CardTitle className="text-lg group-hover:text-gold-500 transition-colors">
                {featData.name}
              </CardTitle>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs px-2 py-0.5 rounded border font-semibold ${typeColor}`}>
              {featData.type}
            </span>
            {featData.bonusFeatClasses && featData.bonusFeatClasses.map((bonusClass, idx) => {
              const ClassIcon = getClassIcon(bonusClass.className);
              const classColor = getClassColor(bonusClass.className);
              return (
                <span
                  key={idx}
                  className={`text-xs px-2 py-0.5 rounded border ${classColor} flex items-center gap-1`}
                  title={bonusClass.condition ? bonusClass.condition : undefined}
                >
                  <ClassIcon className="h-3 w-3" />
                  {bonusClass.className}
                  {bonusClass.level && ` ${bonusClass.level}`}
                </span>
              );
            })}
            {featData.multipleAllowed && (
              <span className="text-xs px-2 py-0.5 rounded border bg-spell-blue/20 text-spell-blue border-spell-blue/30">
                Múltiple
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-dungeon-300 mb-3 line-clamp-2">
            {featData.shortDescription}
          </p>

          <div className="space-y-2">
            {featData.prerequisites && featData.prerequisites.length > 0 && (
              <div className="flex items-start gap-2 text-xs">
                <span className="text-red-400 font-semibold min-w-[80px]">Requisitos:</span>
                <span className="text-dungeon-400 line-clamp-2">
                  {featData.prerequisites.map(p => p.description).join(', ')}
                </span>
              </div>
            )}
            {(!featData.prerequisites || featData.prerequisites.length === 0) && (
              <div className="flex items-start gap-2 text-xs">
                <span className="text-green-400 font-semibold">Sin requisitos</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
