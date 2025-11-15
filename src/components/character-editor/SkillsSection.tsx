'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useCharacterStore } from '@/lib/store/characterStore';
import { ABILITY_SHORT_NAMES } from '@/lib/utils/character';

// Lista de habilidades de D&D 3.5
const SKILLS = [
  { name: 'Abrir cerraduras', ability: 'dex', trainedOnly: false },
  { name: 'Artesanía', ability: 'int', trainedOnly: false },
  { name: 'Averiguar intenciones', ability: 'wis', trainedOnly: false },
  { name: 'Avistar', ability: 'wis', trainedOnly: false },
  { name: 'Buscar', ability: 'int', trainedOnly: false },
  { name: 'Concentración', ability: 'con', trainedOnly: false },
  { name: 'Conocimiento de conjuros', ability: 'int', trainedOnly: true },
  { name: 'Descifrar escritura', ability: 'int', trainedOnly: true },
  { name: 'Diplomacia', ability: 'cha', trainedOnly: false },
  { name: 'Disfrazarse', ability: 'cha', trainedOnly: false },
  { name: 'Engañar', ability: 'cha', trainedOnly: false },
  { name: 'Equilibrio', ability: 'dex', trainedOnly: false },
  { name: 'Escapismo', ability: 'dex', trainedOnly: false },
  { name: 'Esconderse', ability: 'dex', trainedOnly: false },
  { name: 'Escuchar', ability: 'wis', trainedOnly: false },
  { name: 'Falsificar', ability: 'int', trainedOnly: false },
  { name: 'Interpretar', ability: 'cha', trainedOnly: false },
  { name: 'Intimidar', ability: 'cha', trainedOnly: false },
  { name: 'Inutilizar mecanismo', ability: 'int', trainedOnly: true },
  { name: 'Juego de manos', ability: 'dex', trainedOnly: true },
  { name: 'Montar', ability: 'dex', trainedOnly: false },
  { name: 'Moverse sigilosamente', ability: 'dex', trainedOnly: false },
  { name: 'Nadar', ability: 'str', trainedOnly: false },
  { name: 'Oficio', ability: 'wis', trainedOnly: false },
  { name: 'Piruetas', ability: 'dex', trainedOnly: true },
  { name: 'Reunir información', ability: 'cha', trainedOnly: false },
  { name: 'Saber (arcano)', ability: 'int', trainedOnly: true },
  { name: 'Saber (arquitectura)', ability: 'int', trainedOnly: true },
  { name: 'Saber (dungeon)', ability: 'int', trainedOnly: true },
  { name: 'Saber (geografía)', ability: 'int', trainedOnly: true },
  { name: 'Saber (historia)', ability: 'int', trainedOnly: true },
  { name: 'Saber (local)', ability: 'int', trainedOnly: true },
  { name: 'Saber (naturaleza)', ability: 'int', trainedOnly: true },
  { name: 'Saber (nobleza)', ability: 'int', trainedOnly: true },
  { name: 'Saber (los planos)', ability: 'int', trainedOnly: true },
  { name: 'Saber (religión)', ability: 'int', trainedOnly: true },
  { name: 'Saltar', ability: 'str', trainedOnly: false },
  { name: 'Sanar', ability: 'wis', trainedOnly: false },
  { name: 'Supervivencia', ability: 'wis', trainedOnly: false },
  { name: 'Tasación', ability: 'int', trainedOnly: false },
  { name: 'Trato con animales', ability: 'cha', trainedOnly: true },
  { name: 'Trepar', ability: 'str', trainedOnly: false },
  { name: 'Usar objeto mágico', ability: 'cha', trainedOnly: true },
  { name: 'Uso de cuerdas', ability: 'dex', trainedOnly: false },
];

export default function SkillsSection() {
  const { character } = useCharacterStore();

  const modifiers = character.abilityModifiers || {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Habilidades (Skills)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-dungeon-800/30 border border-dungeon-700 rounded">
            <p className="text-sm text-dungeon-400 mb-2">
              Las habilidades se activarán completamente cuando selecciones una clase.
            </p>
            <p className="text-xs text-dungeon-500">
              Por ahora puedes ver los modificadores de habilidad que aplicarían a cada skill.
            </p>
          </div>

          <div className="space-y-1">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-dungeon-900/50 rounded text-xs font-semibold text-dungeon-500 sticky top-0">
              <div className="col-span-5">Habilidad</div>
              <div className="col-span-2 text-center">Mod.</div>
              <div className="col-span-2 text-center">Rangos</div>
              <div className="col-span-1 text-center">Clase</div>
              <div className="col-span-2 text-center">Total</div>
            </div>

            {/* Skills List */}
            {SKILLS.map((skill, index) => {
              const abilityMod = modifiers[skill.ability as keyof typeof modifiers];

              return (
                <div
                  key={index}
                  className={`grid grid-cols-12 gap-2 px-3 py-2 rounded hover:bg-dungeon-800/30 transition-colors ${
                    index % 2 === 0 ? 'bg-dungeon-900/20' : ''
                  }`}
                >
                  {/* Skill Name */}
                  <div className="col-span-5 flex items-center gap-2">
                    <span className="text-sm text-dungeon-200">{skill.name}</span>
                    {skill.trainedOnly && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-red-900/30 text-red-400 rounded border border-red-700/50">
                        Solo entrenada
                      </span>
                    )}
                  </div>

                  {/* Ability Modifier */}
                  <div className="col-span-2 flex items-center justify-center gap-1">
                    <span className="text-xs text-dungeon-500">{ABILITY_SHORT_NAMES[skill.ability as keyof typeof ABILITY_SHORT_NAMES]}</span>
                    <span
                      className={`text-sm font-semibold ${
                        abilityMod > 0 ? 'text-green-400' : abilityMod < 0 ? 'text-red-400' : 'text-dungeon-400'
                      }`}
                    >
                      {abilityMod > 0 ? '+' : ''}{abilityMod}
                    </span>
                  </div>

                  {/* Ranks */}
                  <div className="col-span-2 flex items-center justify-center">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      defaultValue="0"
                      disabled
                      className="w-16 text-center text-sm bg-dungeon-800 border border-dungeon-700 rounded py-1 text-dungeon-400 opacity-50 cursor-not-allowed"
                    />
                  </div>

                  {/* Class Skill */}
                  <div className="col-span-1 flex items-center justify-center">
                    <input
                      type="checkbox"
                      disabled
                      className="w-4 h-4 opacity-50 cursor-not-allowed"
                    />
                  </div>

                  {/* Total */}
                  <div className="col-span-2 flex items-center justify-center">
                    <span className="text-sm font-semibold text-dungeon-300">
                      {abilityMod > 0 ? '+' : ''}{abilityMod}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-dungeon-800/30 border border-dungeon-700 rounded text-sm text-dungeon-400">
            <p className="font-semibold mb-2">Leyenda:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li><strong>Mod.</strong>: Modificador de la habilidad clave</li>
              <li><strong>Rangos</strong>: Puntos invertidos en la habilidad (máx. nivel + 3)</li>
              <li><strong>Clase</strong>: +3 si es habilidad de clase</li>
              <li><strong>Solo entrenada</strong>: Requiere al menos 1 rango para usarse</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
