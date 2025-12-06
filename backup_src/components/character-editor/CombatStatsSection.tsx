'use client';

import { useCharacterStore } from '@/lib/store/characterStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Shield, Heart, Zap } from 'lucide-react';

interface CombatStatsSectionProps {
  onContinue?: () => void;
}

export default function CombatStatsSection({ onContinue }: CombatStatsSectionProps = {}) {
  const { character } = useCharacterStore();

  const dexMod = character.abilityModifiers?.dex || 0;
  const conMod = character.abilityModifiers?.con || 0;
  const activeClass = character.classes?.[0];
  const classData: any = activeClass?.class;
  const classLevel = activeClass?.level || character.effectiveCharacterLevel || 1;

  // Valores temporales hasta que se implementen clases
  const baseAC = 10;
  const totalAC = baseAC + dexMod;
  const touchAC = baseAC + dexMod;
  const flatFootedAC = baseAC;

  // Soportar camelCase y snake_case según fuente de datos
  const hitDieRaw = classData?.hitDie ?? (classData as any)?.hit_die;
  const hitDie =
    typeof hitDieRaw === 'number'
      ? hitDieRaw
      : typeof hitDieRaw === 'string'
        ? (() => {
          const match = hitDieRaw.match(/(\d+)/);
          return match ? parseInt(match[1], 10) : (activeClass ? 8 : 0);
        })()
        : activeClass
          ? 8 // fallback razonable si hay clase pero no viene el dado
          : 0;

  const storedHP = character.hitPoints;
  const computedMaxHP = hitDie > 0 ? Math.max(1, hitDie + conMod) * classLevel : undefined;
  const maxHP = (storedHP?.max && storedHP.max > 0 ? storedHP.max : computedMaxHP) ?? 0;
  const currentHP = (storedHP?.current && storedHP.current > 0 ? storedHP.current : maxHP) ?? maxHP ?? 0;

  const calcBAB = (progression: 'good' | 'average' | 'poor' | undefined, lvl: number) => {
    if (!progression) return 0;
    if (progression === 'good') return lvl;
    if (progression === 'average') return Math.floor((3 * lvl) / 4);
    return Math.floor(lvl / 2);
  };

  const calcSave = (progression: 'good' | 'poor' | undefined, lvl: number) => {
    if (!progression) return 0;
    if (progression === 'good') return 2 + Math.floor(lvl / 2);
    return Math.floor(lvl / 3);
  };

  const bab =
    calcBAB(classData?.baseAttackBonus as any, classLevel);

  const fort = calcSave(classData?.fortitudeSave as any, classLevel) + conMod;
  const ref = calcSave(classData?.reflexSave as any, classLevel) + dexMod;
  const will = calcSave(classData?.willSave as any, classLevel) + (character.abilityModifiers?.wis || 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Clase de Armadura */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-gold-500" />
            <CardTitle>Clase de Armadura (CA)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CA Total */}
            <div className="text-center">
              <div className="bg-dungeon-900/50 rounded-lg p-6 border-2 border-gold-500">
                <div className="text-sm text-dungeon-400 mb-2">CA Total</div>
                <div className="text-5xl font-bold text-gold-500 font-heading">{totalAC}</div>
              </div>
              <div className="mt-4 text-xs text-dungeon-500 space-y-1">
                <div className="flex justify-between">
                  <span>Base:</span>
                  <span>10</span>
                </div>
                <div className="flex justify-between">
                  <span>Mod. Destreza:</span>
                  <span className={dexMod > 0 ? 'text-green-400' : dexMod < 0 ? 'text-red-400' : ''}>
                    {dexMod > 0 ? '+' : ''}{dexMod}
                  </span>
                </div>
                <div className="flex justify-between text-dungeon-600">
                  <span>Armadura:</span>
                  <span>+0</span>
                </div>
                <div className="flex justify-between text-dungeon-600">
                  <span>Escudo:</span>
                  <span>+0</span>
                </div>
              </div>
            </div>

            {/* CA de Toque */}
            <div className="text-center">
              <div className="bg-dungeon-800/50 rounded-lg p-6 border border-dungeon-700">
                <div className="text-sm text-dungeon-400 mb-2">CA de Toque</div>
                <div className="text-4xl font-bold text-dungeon-100 font-heading">{touchAC}</div>
              </div>
              <div className="mt-4 text-xs text-dungeon-500">
                Sin armadura ni escudo
              </div>
            </div>

            {/* CA Desprevenido */}
            <div className="text-center">
              <div className="bg-dungeon-800/50 rounded-lg p-6 border border-dungeon-700">
                <div className="text-sm text-dungeon-400 mb-2">CA Desprevenido</div>
                <div className="text-4xl font-bold text-dungeon-100 font-heading">{flatFootedAC}</div>
              </div>
              <div className="mt-4 text-xs text-dungeon-500">
                Sin mod. Destreza
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Puntos de Golpe */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            <CardTitle>Puntos de Golpe</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center text-dungeon-400 py-8">
            {classData ? (
              <>
                <p className="mb-2 text-4xl font-bold text-dungeon-100 font-heading">
                  {currentHP}/{maxHP} PG
                </p>
                <p className="text-sm text-dungeon-500">
                  {hitDie
                    ? `${classData?.name || classData?.slug || 'Clase'} d${hitDie} × nivel (${classLevel}) + Mod. Constitución (${conMod > 0 ? '+' : ''}${conMod}) por nivel`
                    : 'Usando PG almacenados del personaje'}
                </p>
              </>
            ) : (
              <>
                <p className="mb-2">Los PG se calcularán automáticamente cuando selecciones una clase</p>
                <p className="text-sm text-dungeon-500">
                  Dado de Golpe de la clase + Modificador de Constitución ({conMod > 0 ? '+' : ''}{conMod})
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Iniciativa y Velocidad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <CardTitle>Iniciativa</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-500 mb-2 font-heading">
                {dexMod > 0 ? '+' : ''}{dexMod}
              </div>
              <div className="text-sm text-dungeon-400">
                Modificador de Destreza
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Velocidad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-bold text-dungeon-100 mb-2 font-heading">
                {character.race?.baseSpeed || 30}
              </div>
              <div className="text-sm text-dungeon-400">
                pies por round
              </div>
              {character.race && (
                <div className="mt-4 text-xs text-dungeon-500">
                  Velocidad base de {character.race.name}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tiros de Salvación */}
      <Card>
        <CardHeader>
          <CardTitle>Tiros de Salvación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-dungeon-400 py-8">
            {classData ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-dungeon-100">
                <div className="bg-dungeon-900/40 rounded-lg p-4 border border-dungeon-800">
                  <p className="text-sm text-dungeon-400 mb-1">Fortaleza</p>
                  <p className="text-3xl font-bold font-heading">{fort > 0 ? '+' : ''}{fort}</p>
                  <p className="text-xs text-dungeon-500">Base {calcSave(classData?.fortitudeSave as any, classLevel)} + Con {conMod > 0 ? '+' : ''}{conMod}</p>
                </div>
                <div className="bg-dungeon-900/40 rounded-lg p-4 border border-dungeon-800">
                  <p className="text-sm text-dungeon-400 mb-1">Reflejos</p>
                  <p className="text-3xl font-bold font-heading">{ref > 0 ? '+' : ''}{ref}</p>
                  <p className="text-xs text-dungeon-500">Base {calcSave(classData?.reflexSave as any, classLevel)} + Des {dexMod > 0 ? '+' : ''}{dexMod}</p>
                </div>
                <div className="bg-dungeon-900/40 rounded-lg p-4 border border-dungeon-800">
                  <p className="text-sm text-dungeon-400 mb-1">Voluntad</p>
                  <p className="text-3xl font-bold font-heading">{will > 0 ? '+' : ''}{will}</p>
                  <p className="text-xs text-dungeon-500">Base {calcSave(classData?.willSave as any, classLevel)} + Sab {(character.abilityModifiers?.wis || 0) > 0 ? '+' : ''}{character.abilityModifiers?.wis || 0}</p>
                </div>
              </div>
            ) : (
              <>
                <p className="mb-2">Las salvaciones se calcularán automáticamente cuando selecciones una clase</p>
                <p className="text-sm text-dungeon-500">
                  Salvación base + modificador de habilidad + modificadores varios
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ataque Base */}
      <Card>
        <CardHeader>
          <CardTitle>Bonificador de Ataque Base (BAB)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-dungeon-400 py-8">
            {classData ? (
              <>
                <p className="mb-2 text-4xl font-bold text-dungeon-100 font-heading">
                  {bab > 0 ? '+' : ''}{bab}
                </p>
                <p className="text-sm text-dungeon-500">
                  Progresión {classData?.baseAttackBonus || 'N/D'} a nivel {classLevel}
                </p>
              </>
            ) : (
              <>
                <p className="mb-2">El BAB se calculará automáticamente según tu clase y nivel</p>
                <p className="text-sm text-dungeon-500">
                  Las clases tienen progresión buena, media o pobre
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Botón Continuar */}
      {onContinue && (
        <div className="flex justify-end">
          <Button
            onClick={onContinue}
            variant="primary"
            size="lg"
          >
            Continuar a Pericias →
          </Button>
        </div>
      )}
    </div>
  );
}
