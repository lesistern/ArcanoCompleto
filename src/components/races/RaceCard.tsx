import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DnDRace } from '@/lib/types/race';
import { getRaceIcon, getRaceColor, extractTextColor } from '@/lib/utils/icons';
import { FormattedDistance } from '@/components/ui/FormattedDistance';
import { formatRaceName } from '@/lib/utils/formatters';

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
  // DEBUG: Ver datos reales
  console.log('🔍 RaceCard DEBUG:', {
    name: raceData.name,
    slug: raceData.slug,
    formatted: formatRaceName(raceData.slug)
  });

  const Icon = getRaceIcon(raceData.name);
  const colorClasses = getRaceColor(raceData.name);
  const iconColor = extractTextColor(colorClasses);

  return (
    <Link href={`/razas/${raceData.slug}`}>
      <Card className={`h-full transition-all duration-200 cursor-pointer group overflow-hidden ${
        // Mobile-first: active states para feedback táctil
        'active:scale-95 active:shadow-lg ' +
        // Desktop: hover states
        'md:active:scale-100 md:hover:scale-[1.02] ' +
        (supplemental
          ? 'border-amber-700/50 hover:border-amber-500/50 bg-gradient-to-br from-amber-900/20 to-dungeon-900 hover:shadow-amber-500/10'
          : 'border-dungeon-700/50 hover:border-green-500/50 bg-gradient-to-br from-green-900/20 to-dungeon-900 hover:shadow-green-500/10')
        }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3 flex-wrap">
              <div className={`p-2 rounded-lg ${
                supplemental
                  ? 'bg-amber-500/10 border border-amber-700/30 group-hover:bg-amber-500/20'
                  : 'bg-green-500/10 border border-green-700/30 group-hover:bg-green-500/20'
              }`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg font-bold text-gray-300 group-hover:text-gold-400 transition-colors">
                  {formatRaceName(raceData.slug)}
                </CardTitle>
                {supplemental && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-amber-900/50 text-amber-400 border border-amber-700/50 inline-block mt-1">
                    Suplemento
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-mono text-gray-400 bg-dungeon-800/80 px-2 py-1 rounded border border-dungeon-700">
                {raceData.size}
              </span>
              {raceData.specialAbilities?.darkvision && (
                <span className="text-xs px-2 py-0.5 rounded border bg-purple-900/30 text-purple-300 border-purple-700/50">
                  Visión oscura
                </span>
              )}
              {raceData.specialAbilities?.lowLightVision && (
                <span className="text-xs px-2 py-0.5 rounded border bg-blue-900/30 text-blue-300 border-blue-700/50">
                  Visión baja luz
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-400 group-hover:text-gray-300 mb-4 transition-colors">
            {raceData.shortDescription}
          </p>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2 text-xs">
              <span className="text-gray-500 group-hover:text-gold-400 font-semibold min-w-[90px] transition-colors">Habilidades:</span>
              <span className="text-gray-400">
                {formatAbilityModifiers(raceData.abilityModifiers)}
              </span>
            </div>

            <div className="flex items-start gap-2 text-xs">
              <span className="text-gray-500 group-hover:text-gold-400 font-semibold min-w-[90px] transition-colors">Velocidad:</span>
              <span className="text-gray-400"><FormattedDistance feet={raceData.speed} /></span>
            </div>

            {raceData.favoredClass && (
              <div className="flex items-start gap-2 text-xs">
                <span className="text-gray-500 group-hover:text-gold-400 font-semibold min-w-[90px] transition-colors">Clase favorita:</span>
                <span className="text-gray-400">
                  {Array.isArray(raceData.favoredClass)
                    ? raceData.favoredClass.join(', ')
                    : raceData.favoredClass}
                </span>
              </div>
            )}

            {raceData.levelAdjustment > 0 && (
              <div className="flex items-start gap-2 text-xs">
                <span className="text-gray-500 group-hover:text-gold-400 font-semibold min-w-[90px] transition-colors">Ajuste de nivel:</span>
                <span className="text-amber-400 font-bold">+{raceData.levelAdjustment}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
