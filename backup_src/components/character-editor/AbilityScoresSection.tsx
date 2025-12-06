'use client';

import { useState } from 'react';
import { useCharacterStore } from '@/lib/store/characterStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  AbilityScore,
  ABILITY_NAMES,
  ABILITY_SHORT_NAMES,
  rollAbilityScores,
  rollAbilityScoreDetailed,
  DiceRollResult,
  calculatePointBuyCost,
  POINT_BUY_COSTS,
  formatModifier,
} from '@/lib/utils/character';
import { Dices, RefreshCw } from 'lucide-react';
import ValidationBadge from './ValidationBadge';
import HelpTooltip from '@/components/ui/HelpTooltip';
import DiceRollAnimation from './DiceRollAnimation';

type GenerationMethod = 'manual' | 'roll' | 'pointbuy';

interface AbilityScoresSectionProps {
  showHelp?: boolean;
  onContinue?: () => void;
}

export default function AbilityScoresSection({ showHelp = false, onContinue }: AbilityScoresSectionProps = {}) {
  const { character, setBaseAbilityScores } = useCharacterStore();
  const [method, setMethod] = useState<GenerationMethod>('pointbuy');
  const [tempScores, setTempScores] = useState({
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
  });

  // Estados para animación de dados
  const [rollingAbility, setRollingAbility] = useState<AbilityScore | null>(null);
  const [currentRoll, setCurrentRoll] = useState<DiceRollResult | null>(null);
  const [isRollingAll, setIsRollingAll] = useState(false);

  const baseScores = character.abilityScores?.base || tempScores;
  const racialScores = character.abilityScores?.racial || tempScores;
  const modifiers = character.abilityModifiers || {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  };

  const abilities: AbilityScore[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

  const handleRollAll = () => {
    setIsRollingAll(true);
    const rolled = rollAbilityScores();
    setTempScores(rolled);
    setBaseAbilityScores(rolled);

    // Quitar animación después de 0.6s
    setTimeout(() => setIsRollingAll(false), 600);
  };

  const handleRollSingle = (ability: AbilityScore) => {
    // Tirar con detalles para mostrar animación
    const rollResult = rollAbilityScoreDetailed();

    setRollingAbility(ability);
    setCurrentRoll(rollResult);
  };

  const handleRollComplete = () => {
    if (rollingAbility && currentRoll) {
      const newScores = { ...tempScores, [rollingAbility]: currentRoll.total };
      setTempScores(newScores);
      setBaseAbilityScores(newScores);

      // Limpiar estados
      setRollingAbility(null);
      setCurrentRoll(null);
    }
  };

  const handleManualChange = (ability: AbilityScore, value: number) => {
    const clamped = Math.max(3, Math.min(18, value));
    const newScores = { ...tempScores, [ability]: clamped };
    setTempScores(newScores);
    setBaseAbilityScores(newScores);
  };

  const pointBuyCost = calculatePointBuyCost(baseScores);
  const maxPoints = 25;

  // Validación: todas las habilidades deben tener un valor > 0
  const isAbilitiesValid = Object.values(character.abilityScores?.current || tempScores).every(score => score > 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Method Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Método de Generación</CardTitle>
            <ValidationBadge isValid={isAbilitiesValid} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <div className="relative inline-flex">
              <Button
                variant={method === 'pointbuy' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setMethod('pointbuy')}
              >
                Point Buy (25 puntos)
              </Button>
              {method === 'pointbuy' && showHelp && (
                <div className="absolute -bottom-16 left-0 z-10 w-64 px-3 py-2 bg-blue-900 border-2 border-blue-500 rounded-lg text-xs text-blue-100">
                  Sistema de 25 puntos. Puntuaciones altas cuestan más. Rango: 8-18.
                </div>
              )}
            </div>
            <div className="relative inline-flex">
              <Button
                variant={method === 'roll' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setMethod('roll')}
              >
                Tirada de Dados (4d6 drop lowest)
              </Button>
              {method === 'roll' && showHelp && (
                <div className="absolute -bottom-16 left-0 z-10 w-64 px-3 py-2 bg-blue-900 border-2 border-blue-500 rounded-lg text-xs text-blue-100">
                  Tira 4 dados de 6 caras y descarta el menor. Resultados aleatorios.
                </div>
              )}
            </div>
            <div className="relative inline-flex">
              <Button
                variant={method === 'manual' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setMethod('manual')}
              >
                Manual
              </Button>
              {method === 'manual' && showHelp && (
                <div className="absolute -bottom-16 left-0 z-10 w-64 px-3 py-2 bg-blue-900 border-2 border-blue-500 rounded-lg text-xs text-blue-100">
                  Introduce los valores manualmente. Útil para personajes pre-generados.
                </div>
              )}
            </div>
          </div>

          {method === 'pointbuy' && (
            <div className="mt-4 p-4 bg-dungeon-800/30 border border-dungeon-700 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dungeon-400">Puntos usados:</span>
                <span
                  className={`text-lg font-bold ${pointBuyCost > maxPoints
                      ? 'text-red-400'
                      : pointBuyCost === maxPoints
                        ? 'text-green-400'
                        : 'text-dungeon-200'
                    }`}
                >
                  {pointBuyCost} / {maxPoints}
                </span>
              </div>
              {pointBuyCost > maxPoints && (
                <p className="text-xs text-red-400">Has excedido el límite de puntos</p>
              )}
            </div>
          )}

          {method === 'roll' && (
            <div className="mt-4">
              <Button
                variant="primary"
                size="sm"
                onClick={handleRollAll}
                className={isRollingAll ? 'animate-[shake_0.6s_ease-in-out]' : ''}
              >
                <Dices className={`h-4 w-4 mr-2 ${isRollingAll ? 'animate-spin' : ''}`} />
                Tirar Todas las Habilidades
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ability Scores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {abilities.map((ability) => {
          const baseScore = baseScores[ability];
          const racialScore = racialScores[ability];
          const modifier = modifiers[ability];
          const racialMod = racialScore - baseScore;
          const canDecrease = method === 'pointbuy' ? baseScore > 8 : baseScore > 3;
          const canIncrease = method === 'pointbuy' ? baseScore < 18 : baseScore < 20;

          return (
            <Card key={ability} className="relative">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{ABILITY_NAMES[ability]}</span>
                  <span className="text-xs font-mono text-dungeon-400">
                    {ABILITY_SHORT_NAMES[ability]}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Base Score */}
                <div>
                  <label className="block text-xs text-dungeon-500 mb-2">Puntaje Base</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleManualChange(ability, baseScore - 1)}
                      disabled={!canDecrease}
                      className="btn btn-ghost w-8 h-8 p-0 flex items-center justify-center"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={baseScore}
                      onChange={(e) => handleManualChange(ability, parseInt(e.target.value) || 10)}
                      className="input flex-1 text-center text-2xl font-bold py-2"
                      min="3"
                      max={method === 'pointbuy' ? 18 : 20}
                    />
                    <button
                      onClick={() => handleManualChange(ability, baseScore + 1)}
                      disabled={!canIncrease}
                      className="btn btn-ghost w-8 h-8 p-0 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  {method === 'pointbuy' && (
                    <p className="text-xs text-dungeon-500 mt-1 text-center">
                      Costo: {POINT_BUY_COSTS[baseScore as keyof typeof POINT_BUY_COSTS] || 0} puntos
                    </p>
                  )}
                  {method === 'roll' && (
                    <>
                      {rollingAbility === ability && currentRoll ? (
                        <div className="mt-3">
                          <DiceRollAnimation
                            rolls={currentRoll.rolls}
                            total={currentRoll.total}
                            onComplete={handleRollComplete}
                          />
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRollSingle(ability)}
                          disabled={rollingAbility !== null}
                          className="w-full mt-2 text-xs text-dungeon-400 hover:text-dungeon-200 transition-colors flex items-center justify-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <RefreshCw className="h-3 w-3" />
                          Tirar de nuevo
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* Racial Modifier */}
                {racialMod !== 0 && (
                  <div className="pt-3 border-t border-dungeon-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-dungeon-500">Mod. Racial:</span>
                      <span
                        className={racialMod > 0 ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}
                      >
                        {formatModifier(racialMod)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Final Score & Modifier */}
                <div className="pt-3 border-t border-dungeon-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-dungeon-500">Puntaje Final:</span>
                    <span className="text-lg font-bold text-dungeon-100">{racialScore}</span>
                  </div>
                  <div className="bg-dungeon-900/50 rounded p-3 text-center">
                    <div className="text-xs text-dungeon-500 mb-1">Modificador</div>
                    <div
                      className={`text-3xl font-bold ${modifier > 0 ? 'text-green-400' : modifier < 0 ? 'text-red-400' : 'text-dungeon-400'
                        }`}
                    >
                      {formatModifier(modifier)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            {abilities.map((ability) => (
              <div key={ability}>
                <div className="text-xs text-dungeon-500 mb-1">{ABILITY_SHORT_NAMES[ability]}</div>
                <div className="text-2xl font-bold text-dungeon-100">{racialScores[ability]}</div>
                <div
                  className={`text-sm ${modifiers[ability] > 0
                      ? 'text-green-400'
                      : modifiers[ability] < 0
                        ? 'text-red-400'
                        : 'text-dungeon-400'
                    }`}
                >
                  ({formatModifier(modifiers[ability])})
                </div>
              </div>
            ))}
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
            Continuar a Combate →
          </Button>
        </div>
      )}
    </div>
  );
}
