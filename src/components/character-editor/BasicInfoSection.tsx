'use client';

import { useState, useEffect } from 'react';
import { useCharacterStore } from '@/lib/store/characterStore';
import { getAvailableRaces, getRacialModifiersSummary } from '@/lib/services/raceService.client';
import { getAvailableClasses, getClassSummary, getGoodSaves } from '@/lib/services/classService.client';
import { CharacterRace } from '@/lib/types/character';
import type { CharacterClass } from '@/lib/services/classService.client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { AlertTriangle, Dices } from 'lucide-react';
import { getClassIcon } from '@/lib/utils/classIcons';
import { getDiceIcon } from '@/lib/utils/diceIcons';
import ValidationBadge from './ValidationBadge';
import Tooltip from '@/components/ui/Tooltip';
import HelpTooltip from '@/components/ui/HelpTooltip';
import ClassComparator from './ClassComparator';
import { GitCompare } from 'lucide-react';
import { generateRandomName } from '@/lib/data/character-names';
import CharacterAvatarSelector from './CharacterAvatarSelector';

const ALIGNMENTS = [
  { value: 'LG', label: 'Legal Bueno' },
  { value: 'NG', label: 'Neutral Bueno' },
  { value: 'CG', label: 'Caótico Bueno' },
  { value: 'LN', label: 'Legal Neutral' },
  { value: 'TN', label: 'Neutral' },
  { value: 'CN', label: 'Caótico Neutral' },
  { value: 'LE', label: 'Legal Malvado' },
  { value: 'NE', label: 'Neutral Malvado' },
  { value: 'CE', label: 'Caótico Malvado' },
];

interface BasicInfoSectionProps {
  showHelp?: boolean;
  onContinue?: () => void;
}

export default function BasicInfoSection({ showHelp = false, onContinue }: BasicInfoSectionProps = {}) {
  const { character, setCharacterName, setAlignment, setDeity, setRace, setClass } = useCharacterStore();
  const [availableRaces, setAvailableRaces] = useState<CharacterRace[]>([]);
  const [availableClasses, setAvailableClasses] = useState<CharacterClass[]>([]);
  const [loadingRaces, setLoadingRaces] = useState(true);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [isComparatorOpen, setIsComparatorOpen] = useState(false);

  useEffect(() => {
    getAvailableRaces({ includeSupplemental: true, includeWithLA: true }).then((races) => {
      setAvailableRaces(races);
      setLoadingRaces(false);
    });

    getAvailableClasses().then((classes) => {
      console.log('Classes loaded:', classes.map(c => ({ slug: c.slug, name: c.name, hitDie: c.hitDie })));
      setAvailableClasses(classes);
      setLoadingClasses(false);
    });
  }, []);

  const selectedRace = character.race;
  const isSupplemental =
    selectedRace &&
    (selectedRace.creatureType !== 'Humanoide' ||
     (selectedRace.levelAdjustment ?? 0) > 0);

  // Obtener la clase seleccionada (solo la primera por ahora, sin multiclase)
  const selectedClass = character.classes?.[0]?.class;

  // Validaciones
  const isBasicInfoValid = !!character.name && character.name.trim().length > 0;
  const isRaceValid = !!character.race;
  const isClassValid = character.classes.length > 0;

  // Generador de nombres aleatorios
  const handleGenerateName = () => {
    if (!selectedRace) {
      // Si no hay raza seleccionada, usar nombres humanos por defecto
      const randomName = generateRandomName('human');
      setCharacterName(randomName);
    } else {
      const randomName = generateRandomName(selectedRace.slug);
      setCharacterName(randomName);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Información del Personaje */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Información del Personaje</CardTitle>
            <ValidationBadge isValid={isBasicInfoValid} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Avatar del Personaje */}
          <div className="pb-4 border-b border-dungeon-700">
            <CharacterAvatarSelector />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre del Personaje */}
            <div>
              <label htmlFor="character-name" className="flex items-center gap-2 text-sm font-semibold text-gold-500 mb-2">
                Nombre del Personaje
                <HelpTooltip
                  alwaysVisible={showHelp}
                  content="El nombre de tu personaje. Puedes cambiarlo en cualquier momento. Usa el botón de dados para generar un nombre aleatorio."
                />
              </label>
              <div className="flex gap-2">
                <input
                  id="character-name"
                  type="text"
                  value={character.name || ''}
                  onChange={(e) => setCharacterName(e.target.value)}
                  placeholder="Introduce el nombre"
                  className="flex-1 px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:border-gold-500 transition-colors"
                />
                <Tooltip
                  content={
                    selectedRace
                      ? `Generar nombre aleatorio ${selectedRace.name.toLowerCase()}`
                      : "Generar nombre aleatorio (humano por defecto)"
                  }
                  position="top"
                >
                  <button
                    onClick={handleGenerateName}
                    className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded transition-colors flex items-center gap-2 group"
                    aria-label="Generar nombre aleatorio"
                  >
                    <Dices className="h-5 w-5 group-hover:animate-pulse" />
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* Alineamiento */}
            <div>
              <label htmlFor="alignment" className="flex items-center gap-2 text-sm font-semibold text-gold-500 mb-2">
                Alineamiento
                <HelpTooltip
                  alwaysVisible={showHelp}
                  content="El alineamiento representa la moralidad y ética de tu personaje. Elige entre nueve opciones que combinan Ley/Caos (orden vs libertad) y Bien/Mal."
                />
              </label>
              <select
                id="alignment"
                value={character.alignment || 'TN'}
                onChange={(e) => setAlignment(e.target.value)}
                className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded text-dungeon-100 focus:outline-none focus:border-gold-500 transition-colors"
              >
                {ALIGNMENTS.map((alignment) => (
                  <option key={alignment.value} value={alignment.value}>
                    {alignment.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Deidad */}
          <div>
            <label htmlFor="deity" className="block text-sm font-semibold text-gold-500 mb-2">
              Deidad (Opcional)
            </label>
            <input
              id="deity"
              type="text"
              value={character.deity || ''}
              onChange={(e) => setDeity(e.target.value)}
              placeholder="Introduce la deidad"
              className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>
        </CardContent>
      </Card>

      {/* Raza */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Raza</CardTitle>
              <HelpTooltip
                alwaysVisible={showHelp}
                content="La raza determina tus modificadores raciales de habilidad, velocidad base, tamaño y rasgos especiales como visión en la oscuridad."
              />
            </div>
            <ValidationBadge isValid={isRaceValid} />
          </div>
        </CardHeader>
        <CardContent>
          {loadingRaces ? (
            <div className="text-center text-dungeon-400 py-4">Cargando razas...</div>
          ) : (
            <>
              <select
                value={selectedRace?.slug || ''}
                onChange={(e) => {
                  const race = availableRaces.find((r) => r.slug === e.target.value);
                  if (race) setRace(race);
                }}
                className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded text-dungeon-100 focus:outline-none focus:border-gold-500 transition-colors mb-4"
              >
                <option value="">-- Selecciona una raza --</option>
                {availableRaces.map((race) => (
                  <option key={race.slug} value={race.slug}>
                    {race.name}
                    {(race.levelAdjustment ?? 0) > 0 && ` (LA +${race.levelAdjustment})`}
                  </option>
                ))}
              </select>

              {selectedRace && (
                <div className="space-y-4">
                  {/* Warning para razas suplementarias */}
                  {isSupplemental && (
                    <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-amber-400 font-semibold mb-1">
                            Raza Suplementaria o con Ajuste de Nivel
                          </p>
                          <p className="text-sm text-dungeon-300">
                            Esta raza requiere aprobación del Dungeon Master antes de ser utilizada.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Información de la raza */}
                  <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-dungeon-500 mb-1">Tamaño</p>
                        <p className="text-dungeon-200 font-semibold">{selectedRace.size}</p>
                      </div>
                      <div>
                        <p className="text-xs text-dungeon-500 mb-1">Velocidad</p>
                        <p className="text-dungeon-200 font-semibold">{selectedRace.baseSpeed} pies</p>
                      </div>
                      <div>
                        <p className="text-xs text-dungeon-500 mb-1">Clase Favorita</p>
                        <p className="text-dungeon-200 font-semibold">
                          {Array.isArray(selectedRace.favoredClass)
                            ? selectedRace.favoredClass.join(', ')
                            : selectedRace.favoredClass}
                        </p>
                      </div>
                      {(selectedRace.levelAdjustment ?? 0) > 0 && (
                        <div>
                          <p className="text-xs text-dungeon-500 mb-1">Ajuste de Nivel</p>
                          <p className="text-amber-400 font-semibold">+{selectedRace.levelAdjustment}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-dungeon-700">
                      <p className="text-xs text-dungeon-500 mb-2">Modificadores de Habilidad</p>
                      <p className="text-dungeon-200">
                        {getRacialModifiersSummary(selectedRace)}
                      </p>
                    </div>

                    {(selectedRace.darkvision || selectedRace.lowLightVision) && (
                      <div className="mt-4 pt-4 border-t border-dungeon-700">
                        <p className="text-xs text-dungeon-500 mb-2">Sentidos Especiales</p>
                        <div className="space-y-1">
                          {selectedRace.darkvision && (
                            <p className="text-sm text-dungeon-200">
                              Visión en la oscuridad {selectedRace.darkvision} pies
                            </p>
                          )}
                          {selectedRace.lowLightVision && (
                            <p className="text-sm text-dungeon-200">Visión en penumbra</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Clase */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Clase</CardTitle>
              <HelpTooltip
                alwaysVisible={showHelp}
                content="La clase define tu dado de golpe (puntos de vida), habilidades de clase, progresión de BAB (Bonificador de Ataque Base) y qué salvaciones son buenas. Elige sabiamente según tu estilo de juego."
              />
            </div>
            <ValidationBadge isValid={isClassValid} />
          </div>
        </CardHeader>
        <CardContent>
          {loadingClasses ? (
            <div className="text-center text-dungeon-400 py-4">Cargando clases...</div>
          ) : (
            <>
              {/* Botón Comparar Clases */}
              <div className="mb-4 flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsComparatorOpen(true)}
                >
                  <GitCompare className="h-4 w-4 mr-2" />
                  Comparar Clases
                </Button>
              </div>

              {/* Grid de clases - Responsive mejorado */}
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mb-4">
                {availableClasses.map((cls) => {
                  const Icon = getClassIcon(cls.slug);
                  const DiceIcon = getDiceIcon(cls.hitDie);
                  const isSelected = selectedClass?.slug === cls.slug;
                  const goodSaves = getGoodSaves(cls);

                  const tooltipContent = (
                    <div className="space-y-2">
                      <p className="text-xs text-dungeon-200 leading-relaxed">
                        {getClassSummary(cls).slice(0, 150)}...
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-dungeon-600">
                        <span className="text-xs text-dungeon-400">
                          <span className="text-dungeon-500">Skills:</span> {cls.skillPoints}/nivel
                        </span>
                        <span className="text-xs text-dungeon-400">
                          <span className="text-dungeon-500">Salvaciones:</span> {goodSaves.join(', ')}
                        </span>
                      </div>
                    </div>
                  );

                  return (
                    <Tooltip key={cls.slug} content={tooltipContent} position="top" delay={400}>
                      <button
                        onClick={() => setClass(cls, 1)}
                        className={`
                          relative w-full p-5 rounded-lg border-2 transition-all duration-300
                          flex flex-col items-center justify-center gap-3
                          hover:scale-[1.02] sm:hover:scale-105
                          hover:shadow-xl hover:shadow-gold-500/10
                          active:scale-[0.98]
                          h-[170px] sm:h-[180px]
                          ${isSelected
                            ? 'border-gold-500 bg-gold-900/20 shadow-lg shadow-gold-500/20 ring-2 ring-gold-500/30'
                            : 'border-dungeon-700 bg-dungeon-800/30 hover:border-gold-600 hover:bg-dungeon-800/50'
                          }
                        `}
                      >
                      {/* Icono de clase */}
                      <div className={`transition-all duration-300 ${isSelected ? 'scale-110' : ''}`}>
                        <Icon className={`h-10 w-10 sm:h-12 sm:w-12 transition-colors ${isSelected ? 'text-gold-400' : 'text-dungeon-300'}`} />
                      </div>

                      {/* Nombre de clase */}
                      <span className={`
                        text-sm sm:text-base font-semibold text-center leading-tight
                        transition-colors
                        ${isSelected ? 'text-gold-300' : 'text-dungeon-200'}
                      `}>
                        {cls.name}
                      </span>

                      {/* Dado de golpe con icono mejorado */}
                      <div className={`
                        flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base
                        px-2 sm:px-3 py-1 rounded-md
                        transition-all duration-300
                        ${isSelected
                          ? 'text-gold-400 bg-gold-500/10'
                          : 'text-dungeon-400 bg-dungeon-700/50'}
                      `}>
                        <DiceIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${isSelected ? 'animate-pulse' : ''}`} />
                        <span className="font-bold">{typeof cls.hitDie === 'number' ? `d${cls.hitDie}` : cls.hitDie}</span>
                      </div>

                      {/* Indicador de selección mejorado */}
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <div className="relative">
                            <div className="w-3 h-3 bg-gold-400 rounded-full animate-ping absolute opacity-75" />
                            <div className="w-3 h-3 bg-gold-400 rounded-full relative" />
                          </div>
                        </div>
                      )}
                    </button>
                    </Tooltip>
                  );
                })}
              </div>

              {selectedClass && (() => {
                const DiceIcon = getDiceIcon(selectedClass.hitDie);

                return (
                <div className="space-y-4">
                  {/* Información de la clase */}
                  <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-4">
                    {/* Salvaciones */}
                    <div className="mb-4 pb-4 border-b border-dungeon-700">
                      <p className="text-xs text-dungeon-500 mb-2">Salvaciones Buenas</p>
                      <div className="flex flex-wrap gap-2">
                        {getGoodSaves(selectedClass).map((save) => (
                          <span
                            key={save}
                            className="px-3 py-1 bg-green-900/30 border border-green-700/50 rounded text-sm text-green-400"
                          >
                            {save}
                          </span>
                        ))}
                        {getGoodSaves(selectedClass).length === 0 && (
                          <span className="text-sm text-dungeon-400 italic">Ninguna</span>
                        )}
                      </div>
                    </div>

                    {/* Competencias */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-dungeon-500 mb-1">Competencia en Armas</p>
                        <p className="text-sm text-dungeon-200">{selectedClass.weaponProficiencies}</p>
                      </div>
                      <div>
                        <p className="text-xs text-dungeon-500 mb-1">Competencia en Armadura</p>
                        <p className="text-sm text-dungeon-200">{selectedClass.armorProficiencies}</p>
                      </div>
                    </div>

                    {/* Habilidades de Clase */}
                    {selectedClass.classSkills && selectedClass.classSkills.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-dungeon-700">
                        <p className="text-xs text-dungeon-500 mb-2">
                          Habilidades de Clase ({selectedClass.classSkills.length})
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {selectedClass.classSkills.map((skill, index) => (
                            <span key={index} className="text-xs text-dungeon-300">
                              {skill}
                              {index < selectedClass.classSkills.length - 1 && ','}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Botón Continuar */}
                  <div className="flex justify-center pt-4">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        if (onContinue) {
                          onContinue();
                        }
                      }}
                    >
                      Continuar a Habilidades
                    </Button>
                  </div>
                </div>
                );
              })()}
            </>
          )}
        </CardContent>
      </Card>

      {/* Class Comparator Modal */}
      <ClassComparator
        isOpen={isComparatorOpen}
        onClose={() => setIsComparatorOpen(false)}
        availableClasses={availableClasses}
        onSelectClass={(cls) => setClass(cls, 1)}
      />
    </div>
  );
}
