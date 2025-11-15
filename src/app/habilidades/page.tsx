'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';
import SkillCard from '@/components/SkillCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import skillsData from '@/lib/data/3.5/skills.json';
import { DnDSkill, AbilityScore, SkillCategory } from '@/lib/types/skill';

export default function SkillsPage() {
  const skills = skillsData as DnDSkill[];

  const [selectedAbility, setSelectedAbility] = useState<AbilityScore | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
  const [trainedOnlyFilter, setTrainedOnlyFilter] = useState<boolean | 'all'>('all');
  const [armorPenaltyFilter, setArmorPenaltyFilter] = useState<boolean | 'all'>('all');

  // Filtrar habilidades
  const filteredSkills = skills.filter(skill => {
    if (selectedAbility !== 'all' && skill.keyAbility !== selectedAbility) return false;
    if (selectedCategory !== 'all' && skill.category !== selectedCategory) return false;
    if (trainedOnlyFilter !== 'all' && skill.trainedOnly !== trainedOnlyFilter) return false;
    if (armorPenaltyFilter !== 'all' && skill.armorCheckPenalty !== armorPenaltyFilter) return false;
    return true;
  });

  // Categorizar habilidades
  const categories = Array.from(new Set(skills.map(s => s.category)));
  const abilities: AbilityScore[] = ['Fuerza', 'Destreza', 'Constitución', 'Inteligencia', 'Sabiduría', 'Carisma'];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 mb-3">
          Habilidades
        </h1>
        <p className="text-lg text-dungeon-300">
          Las 43 habilidades estándar de D&D 3.5
        </p>
      </div>

      {/* Filtros */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gold-500" />
            <CardTitle className="text-lg">Filtros</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtro por Habilidad Clave */}
            <div>
              <label className="block text-sm font-semibold text-gold-500 mb-2">
                Habilidad Clave
              </label>
              <select
                value={selectedAbility}
                onChange={(e) => setSelectedAbility(e.target.value as AbilityScore | 'all')}
                className="w-full bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">Todas</option>
                {abilities.map(ability => (
                  <option key={ability} value={ability}>{ability}</option>
                ))}
              </select>
            </div>

            {/* Filtro por Categoría */}
            <div>
              <label className="block text-sm font-semibold text-gold-500 mb-2">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as SkillCategory | 'all')}
                className="w-full bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">Todas</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Filtro Solo Entrenado */}
            <div>
              <label className="block text-sm font-semibold text-gold-500 mb-2">
                Entrenamiento
              </label>
              <select
                value={trainedOnlyFilter === 'all' ? 'all' : String(trainedOnlyFilter)}
                onChange={(e) => setTrainedOnlyFilter(e.target.value === 'all' ? 'all' : e.target.value === 'true')}
                className="w-full bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">Todas</option>
                <option value="true">Solo entrenado</option>
                <option value="false">Sin entrenamiento</option>
              </select>
            </div>

            {/* Filtro Penalización Armadura */}
            <div>
              <label className="block text-sm font-semibold text-gold-500 mb-2">
                Penalización Armadura
              </label>
              <select
                value={armorPenaltyFilter === 'all' ? 'all' : String(armorPenaltyFilter)}
                onChange={(e) => setArmorPenaltyFilter(e.target.value === 'all' ? 'all' : e.target.value === 'true')}
                className="w-full bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">Todas</option>
                <option value="true">Con penalización</option>
                <option value="false">Sin penalización</option>
              </select>
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 pt-4 border-t border-dungeon-700">
            <p className="text-sm text-dungeon-400">
              Mostrando <span className="text-gold-500 font-semibold">{filteredSkills.length}</span> de {skills.length} habilidades
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Habilidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {filteredSkills.map((skillData) => (
          <SkillCard key={skillData.id} skillData={skillData} />
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-dungeon-400">No se encontraron habilidades con los filtros seleccionados</p>
        </div>
      )}

      {/* Información adicional */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
          Información de Habilidades
        </h3>
        <div className="space-y-3 text-sm text-dungeon-300">
          <p>
            Las habilidades representan áreas de experiencia y capacidades especiales de tu personaje.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">Solo Entrenado:</span> Algunas habilidades
            solo pueden usarse si tienes al menos 1 rango en ellas.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">Penalización por Armadura:</span> Las habilidades
            marcadas se ven afectadas por la penalización de tu armadura.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">Sinergia:</span> Tener 5 o más rangos en ciertas
            habilidades otorga bonificadores +2 a otras habilidades relacionadas.
          </p>
        </div>
      </div>
    </div>
  );
}
