'use client';

import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import FeatCard from '@/components/FeatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import featsData from '@/lib/data/3.5/feats.json';
import { DnDFeat, FeatType } from '@/lib/types/feat';
import { getFeatTypeIcon, getFeatTypeColor, extractTextColor } from '@/lib/utils/icons';

export default function FeatsPage() {
  const feats = featsData as DnDFeat[];

  const [selectedType, setSelectedType] = useState<FeatType | 'all'>('all');
  const [fighterBonusFilter, setFighterBonusFilter] = useState<boolean | 'all'>('all');
  const [hasPrereqsFilter, setHasPrereqsFilter] = useState<boolean | 'all'>('all');
  const [multipleFilter, setMultipleFilter] = useState<boolean | 'all'>('all');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filtrar dotes
  const filteredFeats = feats.filter(feat => {
    if (selectedType !== 'all' && feat.type !== selectedType) return false;
    if (fighterBonusFilter !== 'all' && feat.fighterBonus !== fighterBonusFilter) return false;
    if (hasPrereqsFilter !== 'all') {
      const hasPrereqs = feat.prerequisites && feat.prerequisites.length > 0;
      if (hasPrereqs !== hasPrereqsFilter) return false;
    }
    if (multipleFilter !== 'all' && feat.multipleAllowed !== multipleFilter) return false;
    return true;
  });

  // Obtener tipos únicos
  const types: FeatType[] = ['General', 'Combate', 'Metamagia', 'Creación de Objetos'];

  // Agrupar dotes filtradas por tipo
  const featsByType: Record<FeatType, DnDFeat[]> = {
    'General': filteredFeats.filter(f => f.type === 'General'),
    'Combate': filteredFeats.filter(f => f.type === 'Combate'),
    'Metamagia': filteredFeats.filter(f => f.type === 'Metamagia'),
    'Creación de Objetos': filteredFeats.filter(f => f.type === 'Creación de Objetos'),
  };

  // Ordenar tipos
  const typeOrder: FeatType[] = ['General', 'Combate', 'Metamagia', 'Creación de Objetos'];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Header */}
      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 mb-3">
          Dotes
        </h1>
        <p className="text-lg text-dungeon-300">
          Dotes del Manual del Jugador de D&D 3.5
        </p>
      </div>

      {/* Botón de Filtros Desplegable */}
      <div className="mb-6">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="w-full flex items-center justify-between bg-dungeon-800 border border-dungeon-700 rounded-lg px-4 py-3 text-dungeon-200 hover:border-gold-500 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gold-500" />
            <span className="font-semibold">Filtros</span>
            <span className="text-sm text-dungeon-400">
              ({filteredFeats.length} de {feats.length})
            </span>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-gold-500 transition-transform ${
              filtersOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Panel de Filtros Desplegable */}
        {filtersOpen && (
          <Card className="mt-4">
            <CardContent className="pt-6">
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

            {/* Filtro Múltiple */}
            <div>
              <label className="block text-sm font-semibold text-gold-500 mb-2">
                Múltiple
              </label>
              <select
                value={multipleFilter === 'all' ? 'all' : String(multipleFilter)}
                onChange={(e) => setMultipleFilter(e.target.value === 'all' ? 'all' : e.target.value === 'true')}
                className="w-full bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2 text-sm text-dungeon-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="all">Todas</option>
                <option value="true">Se puede tomar múltiples veces</option>
                <option value="false">Solo una vez</option>
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
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dotes por Tipo */}
      {filteredFeats.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-dungeon-400">No se encontraron dotes con los filtros seleccionados</p>
        </div>
      ) : (
        <div className="space-y-6 mb-16">
          {typeOrder.map((type) => {
            const typeFeats = featsByType[type];

            // Solo mostrar tipo si tiene dotes
            if (typeFeats.length === 0) return null;

            const Icon = getFeatTypeIcon(type);
            const colorClasses = getFeatTypeColor(type);
            const iconColor = extractTextColor(colorClasses);

            return (
              <Card key={type} className="bg-dungeon-800 border-dungeon-700">
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${iconColor}`}>
                    <Icon className="h-5 w-5" />
                    {type} ({typeFeats.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {typeFeats.map((featData) => (
                      <FeatCard key={featData.id} featData={featData} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
