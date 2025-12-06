'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { ALIGNMENT_CONFIG } from '@/lib/data/alignments';

interface Deity {
  id?: string;
  slug: string;
  name_en: string;
  name_es: string;
  rank: string;
  titles_en: string;
  titles_es: string;
  portfolio_en: string;
  portfolio_es: string;
  alignment: string;
  domains: string[];
  favored_weapon: string;
  symbol_en: string;
  symbol_es: string;
  worshipers_en: string;
  worshipers_es: string;
  home_plane_en: string;
  home_plane_es: string;
  description_en: string;
  description_es: string;
  teachings_en?: string;
  teachings_es?: string;
  clergy_en?: string;
  clergy_es?: string;
  temples_en?: string;
  temples_es?: string;
  rites_en?: string;
  rites_es?: string;
}

interface DeityListSidebarProps {
  deities: Deity[];
  selectedDeity: Deity | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSelectDeity: (deity: Deity, editing: boolean) => void;
  onEdit: (deity: Deity) => void;
  onDelete: (slug: string) => void;
  rankLabels: Record<string, string>;
  alignmentLabels: Record<string, string>;
}

export function DeityListSidebar({
  deities,
  selectedDeity,
  searchTerm,
  onSearchChange,
  onSelectDeity,
  onEdit,
  onDelete,
  rankLabels,
  alignmentLabels,
}: DeityListSidebarProps) {
  const filteredDeities = deities.filter(deity =>
    deity.name_es.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deity.name_en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lg:col-span-1 bg-dungeon-800 rounded-lg p-4">
      <input
        type="text"
        placeholder="Buscar deidad..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2 mb-4 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-400"
      />
      <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
        {filteredDeities.map((deity) => (
          <div
            key={deity.slug}
            onClick={() => onSelectDeity(deity, false)}
            className={`p-3 rounded-lg cursor-pointer transition-all ${
              selectedDeity?.slug === deity.slug
                ? 'bg-gold-900/30 border border-gold-400'
                : 'bg-dungeon-700 hover:bg-dungeon-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gold-300">
                  {deity.name_es || deity.name_en}
                </div>
                <div className="text-sm text-dungeon-400 flex items-center gap-2">
                  <span>{rankLabels[deity.rank]}</span>
                  <span>•</span>
                  <span
                    className="px-2 py-1 rounded text-xs font-semibold"
                    style={{
                      backgroundColor: ALIGNMENT_CONFIG[deity.alignment]?.hex + '30' || '#3d3d3d',
                      color: ALIGNMENT_CONFIG[deity.alignment]?.hex || '#9ca3af',
                      borderLeft: `3px solid ${ALIGNMENT_CONFIG[deity.alignment]?.hex || '#3d3d3d'}`,
                    }}
                  >
                    {alignmentLabels[deity.alignment]}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(deity);
                  }}
                  className="p-1 hover:bg-dungeon-600 rounded"
                >
                  <Pencil className="h-4 w-4 text-gold-400" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(deity.slug);
                  }}
                  className="p-1 hover:bg-red-900 rounded"
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
