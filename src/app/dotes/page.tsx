'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';
import FeatCard from '@/components/FeatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import featsData from '@/lib/data/3.5/feats.json';
import { DnDFeat, FeatType, FeatCategory } from '@/lib/types/feat';

export default function FeatsPage() {
  const feats = featsData as DnDFeat[];

  const [selectedType, setSelectedType] = useState<FeatType | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<FeatCategory | 'all'>('all');
  const [fighterBonusFilter, setFighterBonusFilter] = useState<boolean | 'all'>('all');
  const [hasPrereqsFilter, setHasPrereqsFilter] = useState<boolean | 'all'>('all');

  // Filtrar dotes
  const filteredFeats = feats.filter(feat => {
    if (selectedType !== 'all' && feat.type !== selectedType) return false;
    if (selectedCategory !== 'all' && feat.category !== selectedCategory) return false;
    if (fighterBonusFilter !== 'all' && feat.fighterBonus !== fighterBonusFilter) return false;
    if (hasPrereqsFilter !== 'all') {
      const hasPrereqs = feat.prerequisites && feat.prerequisites.length > 0;
      if (hasPrereqs !== hasPrereqsFilter) return false;
    }
    return true;
  });

  // Obtener tipos y categorías únicos
  const types: FeatType[] = ['General', 'Combate', 'Metamagia', 'Creación de Objetos', 'Especial'];
  const categories: FeatCategory[] = ['Combate', 'Magia', 'Habilidades', 'Creación', 'Racial', 'Varios'];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 mb-3">
          Dotes
        </h1>
        <p className="text-lg text-dungeon-300">
          Dotes del Manual del Jugador de D&D 3.5
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
            {/* Filtro por Tipo */}
            <div>
              <label className="block text-sm font-semibold text-gold-500 mb-2">
                Tipo
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as FeatType | 'all')}
                className="w-full bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">Todos</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
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
                onChange={(e) => setSelectedCategory(e.target.value as FeatCategory | 'all')}
                className="w-full bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">Todas</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Filtro Dote de Guerrero */}
            <div>
              <label className="block text-sm font-semibold text-gold-500 mb-2">
                Dote de Guerrero
              </label>
              <select
                value={fighterBonusFilter === 'all' ? 'all' : String(fighterBonusFilter)}
                onChange={(e) => setFighterBonusFilter(e.target.value === 'all' ? 'all' : e.target.value === 'true')}
                className="w-full bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">Todas</option>
                <option value="true">Solo dotes de guerrero</option>
                <option value="false">No dotes de guerrero</option>
              </select>
            </div>

            {/* Filtro Prerrequisitos */}
            <div>
              <label className="block text-sm font-semibold text-gold-500 mb-2">
                Prerrequisitos
              </label>
              <select
                value={hasPrereqsFilter === 'all' ? 'all' : String(hasPrereqsFilter)}
                onChange={(e) => setHasPrereqsFilter(e.target.value === 'all' ? 'all' : e.target.value === 'true')}
                className="w-full bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">Todas</option>
                <option value="true">Con prerrequisitos</option>
                <option value="false">Sin prerrequisitos</option>
              </select>
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 pt-4 border-t border-dungeon-700">
            <p className="text-sm text-dungeon-400">
              Mostrando <span className="text-gold-500 font-semibold">{filteredFeats.length}</span> de {feats.length} dotes
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Dotes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {filteredFeats.map((featData) => (
          <FeatCard key={featData.id} featData={featData} />
        ))}
      </div>

      {filteredFeats.length === 0 && (
        <div className="text-center py-12">
          <p className="text-dungeon-400">No se encontraron dotes con los filtros seleccionados</p>
        </div>
      )}

      {/* Información adicional */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
          Información de Dotes
        </h3>
        <div className="space-y-3 text-sm text-dungeon-300">
          <p>
            Las dotes representan capacidades especiales de tu personaje más allá de las otorgadas
            por su raza y clase.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">Dotes de Guerrero:</span> Los guerreros
            obtienen dotes adicionales de combate en ciertos niveles.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">Dotes de Metamagia:</span> Permiten a los
            lanzadores de conjuros modificar sus hechizos de formas útiles.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">Múltiple:</span> Algunas dotes pueden
            tomarse múltiples veces, con efectos que se acumulan o aplican a diferentes aspectos.
          </p>
        </div>
      </div>
    </div>
  );
}
