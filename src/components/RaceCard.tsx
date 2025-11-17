import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { DnDRace } from '@/lib/types/race';
import { getRaceIcon, getRaceColor, extractTextColor } from '@/lib/utils/icons';

interface RaceCardProps {
  raceData: DnDRace;
  supplemental?: boolean;
}

const formatAbilityModifiers = (modifiers: DnDRace['abilityModifiers']) => {
  const mods: string[] = [];

  if (modifiers.strength) mods.push(`${modifiers.strength > 0 ? '+' : ''}${modifiers.strength} Fue`);
  if (modifiers.dexterity) mods.push(`${modifiers.dexterity > 0 ? '+' : ''}${modifiers.dexterity} Des`);
  if (modifiers.constitution) mods.push(`${modifiers.constitution > 0 ? '+' : ''}${modifiers.constitution} Con`);
  if (modifiers.intelligence) mods.push(`${modifiers.intelligence > 0 ? '+' : ''}${modifiers.intelligence} Int`);
  if (modifiers.wisdom) mods.push(`${modifiers.wisdom > 0 ? '+' : ''}${modifiers.wisdom} Sab`);
  if (modifiers.charisma) mods.push(`${modifiers.charisma > 0 ? '+' : ''}${modifiers.charisma} Car`);

  return mods.length > 0 ? mods.join(', ') : 'Ninguno';
};

export default function RaceCard({ raceData, supplemental = false }: RaceCardProps) {
  const Icon = getRaceIcon(raceData.name);
  const colorClasses = getRaceColor(raceData.name);
  const iconColor = extractTextColor(colorClasses);

  return (
    <Link href={`/razas/${raceData.slug}`}>
      <Card className={`h-full transition-all cursor-pointer group ${
        supplemental
          ? 'border-amber-800/50 hover:border-amber-600'
          : 'hover:border-dungeon-600'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3 flex-wrap">
              <Icon className={`h-6 w-6 ${iconColor}`} />
              <CardTitle className="text-lg group-hover:text-gold-500 transition-colors">
                {raceData.name}
              </CardTitle>
              {supplemental && (
                <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-amber-900/50 text-amber-400 border border-amber-700/50">
                  Suplemento
                </span>
              )}
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-mono text-dungeon-400 bg-dungeon-800 px-2 py-1 rounded">
                {raceData.size}
              </span>
              {raceData.specialAbilities?.darkvision && (
                <span className="text-xs px-2 py-0.5 rounded border bg-dungeon-800/50 text-dungeon-300 border-dungeon-700">
                  Visión oscura
                </span>
              )}
              {raceData.specialAbilities?.lowLightVision && (
                <span className="text-xs px-2 py-0.5 rounded border bg-dungeon-800/50 text-dungeon-300 border-dungeon-700">
                  Visión baja luz
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-dungeon-300 mb-3">
            {raceData.shortDescription}
          </p>

          <div className="space-y-2">
            <div className="flex items-start gap-2 text-xs">
              <span className="text-dungeon-500 font-semibold min-w-[90px]">Habilidades:</span>
              <span className="text-dungeon-400">
                {formatAbilityModifiers(raceData.abilityModifiers)}
              </span>
            </div>

            <div className="flex items-start gap-2 text-xs">
              <span className="text-dungeon-500 font-semibold min-w-[90px]">Velocidad:</span>
              <span className="text-dungeon-400">{raceData.speed} pies</span>
            </div>

            {raceData.favoredClass && (
              <div className="flex items-start gap-2 text-xs">
                <span className="text-dungeon-500 font-semibold min-w-[90px]">Clase favorita:</span>
                <span className="text-dungeon-400">
                  {Array.isArray(raceData.favoredClass)
                    ? raceData.favoredClass.join(', ')
                    : raceData.favoredClass}
                </span>
              </div>
            )}

            {raceData.levelAdjustment > 0 && (
              <div className="flex items-start gap-2 text-xs">
                <span className="text-dungeon-500 font-semibold min-w-[90px]">Ajuste de nivel:</span>
                <span className="text-amber-400 font-semibold">+{raceData.levelAdjustment}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
