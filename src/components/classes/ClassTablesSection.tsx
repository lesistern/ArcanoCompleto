/**
 * ClassTablesSection Component
 * Displays class-related reference tables
 * Extracted from /clases/page.tsx to reduce main page size
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { baseSaveAttackTable, levelBenefitTable, wealthTable } from '@/lib/data/classes-page-data';

export function ClassTablesSection() {
  return (
    <div className="space-y-6 mb-12">
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {/* Base Save and Attack Table */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="text-gold-400 text-lg">Bonos base de salvación y ataque</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-dungeon-200 space-y-3">
            <p>El bono de salvación base depende de si la tirada es buena o pobre para tu clase. Monjes tienen las tres tiradas buenas, por ejemplo.</p>
            <p>El ataque base se usa en cada ataque. Buen ataque (guerrero, bárbaro, paladín, explorador) progresa a +20; medio (clérigo, druida, monje, pícaro) termina en +15; pobre (hechicero, mago) llega a +10.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs md:text-sm text-left border border-dungeon-700">
                <thead className="bg-dungeon-900 text-dungeon-100">
                  <tr>
                    <th className="px-3 py-2 border-b border-dungeon-700">Nivel</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Salvación buena</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Salvación pobre</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Ataque bueno</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Ataque medio</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Ataque pobre</th>
                  </tr>
                </thead>
                <tbody>
                  {baseSaveAttackTable.map((row) => (
                    <tr key={row.level} className="odd:bg-dungeon-900/40">
                      <td className="px-3 py-2 border-b border-dungeon-800 text-dungeon-100">{row.level}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.goodSave}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.poorSave}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.goodBab}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.averageBab}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.poorBab}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Level Benefit Table */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="text-gold-400 text-lg">Beneficios dependientes del nivel</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-dungeon-200 space-y-3">
            <p>Máximos de rangos: habilidad de clase = nivel + 3. Habilidad cruzada = (nivel + 3) ÷ 2. Los valores de XP son acumulativos.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs md:text-sm text-left border border-dungeon-700">
                <thead className="bg-dungeon-900 text-dungeon-100">
                  <tr>
                    <th className="px-3 py-2 border-b border-dungeon-700">Nivel</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">XP total</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Rangos máx. (clase)</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Rangos máx. (cruzada)</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Dotes</th>
                    <th className="px-3 py-2 border-b border-dungeon-700">Mejora de característica</th>
                  </tr>
                </thead>
                <tbody>
                  {levelBenefitTable.map((row) => (
                    <tr key={row.level} className="odd:bg-dungeon-900/40">
                      <td className="px-3 py-2 border-b border-dungeon-800 text-dungeon-100">{row.level}º</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.xp}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.classSkillMax}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.crossClassMax}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.feats}</td>
                      <td className="px-3 py-2 border-b border-dungeon-800">{row.abilityIncrease}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experience and Leveling Section */}
      <Card className="card mb-12">
        <CardHeader>
          <CardTitle className="text-gold-400 text-lg">Experiencia, entrenamiento y subida de nivel</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 text-sm text-dungeon-200">
          <div className="space-y-3">
            <p>La XP mide lo que tu personaje aprende tras cada aventura. Al alcanzar el mínimo de la tabla anterior subes de nivel inmediatamente: aplica beneficios y continúa con la XP sobrante.</p>
            <p>Si el DJ otorga tanta XP que saltarías más de un nivel, solo subes uno y quedas a 1 XP del siguiente; el resto se pierde.</p>
            <p>El entrenamiento entre aventuras consolida habilidades. Si un personaje no puede practicar durante largo tiempo, el DJ puede reducir o negar XP.</p>
          </div>
          <div className="bg-dungeon-900/50 border border-dungeon-700 rounded-lg p-4 space-y-3">
            <h3 className="text-dungeon-100 font-semibold">Pasos al subir de nivel</h3>
            <ol className="list-decimal list-inside space-y-2 text-dungeon-200 text-xs">
              <li><span className="font-semibold text-dungeon-100">Elegir clase:</span> Súbete un nivel en tu clase actual o desbloquea una nueva clase a nivel 1.</li>
              <li><span className="font-semibold text-dungeon-100">Ataque base:</span> Actualiza el ataque base según la tabla de progresión de tu clase.</li>
              <li><span className="font-semibold text-dungeon-100">Salvaciones:</span> Aumenta los bonos base de Fortaleza, Reflejos y Voluntad que mejoren.</li>
              <li><span className="font-semibold text-dungeon-100">Aumento de característica:</span> En niveles 4, 8, 12, 16 y 20 suma +1.</li>
              <li><span className="font-semibold text-dungeon-100">Puntos de golpe:</span> Tira tu dado de golpe y suma al total.</li>
              <li><span className="font-semibold text-dungeon-100">Puntos de habilidad:</span> Recibe y gasta puntos según tu clase.</li>
              <li><span className="font-semibold text-dungeon-100">Dotes:</span> Ganas una dote en niveles 3, 6, 9, 12, 15 y 18.</li>
              <li><span className="font-semibold text-dungeon-100">Conjuros:</span> Amplía conjuros por día según tu tabla.</li>
              <li><span className="font-semibold text-dungeon-100">Rasgos de clase:</span> Aplica facultades nuevas o mejoradas.</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Wealth by Level Table */}
      <Card className="card">
        <CardHeader>
          <CardTitle className="text-gold-400 text-lg">Riqueza por nivel</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-dungeon-200 space-y-3">
          <p>Los PJs nuevos empiezan con oro según su nivel. Los NPCs generan menos riqueza (funcionan con menos recursos). Estos valores son sugerencias base para el DJ.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs md:text-sm text-left border border-dungeon-700">
              <thead className="bg-dungeon-900 text-dungeon-100">
                <tr>
                  <th className="px-3 py-2 border-b border-dungeon-700">Nivel</th>
                  <th className="px-3 py-2 border-b border-dungeon-700">Personaje jugable</th>
                  <th className="px-3 py-2 border-b border-dungeon-700">NPC</th>
                </tr>
              </thead>
              <tbody>
                {wealthTable.map((row) => (
                  <tr key={row.level} className="odd:bg-dungeon-900/40">
                    <td className="px-3 py-2 border-b border-dungeon-800 text-dungeon-100">{row.level}º</td>
                    <td className="px-3 py-2 border-b border-dungeon-800">{row.pc}</td>
                    <td className="px-3 py-2 border-b border-dungeon-800">{row.npc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
