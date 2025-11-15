'use client';

import { useState, useEffect } from 'react';
import { useCharacterStore } from '@/lib/store/characterStore';
import { getAvailableRaces, getRacialModifiersSummary } from '@/lib/services/raceService.client';
import { CharacterRace } from '@/lib/types/character';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AlertTriangle } from 'lucide-react';

const ALIGNMENTS = [
  'Legal Bueno',
  'Neutral Bueno',
  'Caótico Bueno',
  'Legal Neutral',
  'Neutral',
  'Caótico Neutral',
  'Legal Malvado',
  'Neutral Malvado',
  'Caótico Malvado',
];

export default function BasicInfoSection() {
  const { character, setCharacterName, setAlignment, setDeity, setRace } = useCharacterStore();
  const [availableRaces, setAvailableRaces] = useState<CharacterRace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAvailableRaces({ includeSupplemental: true, includeWithLA: true }).then((races) => {
      setAvailableRaces(races);
      setLoading(false);
    });
  }, []);

  const selectedRace = character.race;
  const isSupplemental =
    selectedRace &&
    (selectedRace.creatureType !== 'Humanoide' ||
     (selectedRace.levelAdjustment ?? 0) > 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Información del Personaje */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Personaje</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre del Personaje */}
            <div>
              <label htmlFor="character-name" className="block text-sm font-semibold text-gold-500 mb-2">
                Nombre del Personaje
              </label>
              <input
                id="character-name"
                type="text"
                value={character.name || ''}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Introduce el nombre"
                className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>

            {/* Alineamiento */}
            <div>
              <label htmlFor="alignment" className="block text-sm font-semibold text-gold-500 mb-2">
                Alineamiento
              </label>
              <select
                id="alignment"
                value={character.alignment || 'Neutral'}
                onChange={(e) => setAlignment(e.target.value)}
                className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded text-dungeon-100 focus:outline-none focus:border-gold-500 transition-colors"
              >
                {ALIGNMENTS.map((alignment) => (
                  <option key={alignment} value={alignment}>
                    {alignment}
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
          <CardTitle>Raza</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
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

      {/* Clase - Próximamente */}
      <Card>
        <CardHeader>
          <CardTitle>Clase</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-dungeon-400 py-8">
            <p className="mb-2">Selector de clase - Próximamente</p>
            <p className="text-sm">
              Podrás seleccionar clase base y niveles de multiclase
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
