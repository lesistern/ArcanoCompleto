'use client';

import { useState } from 'react';
import { Search, Pencil, Loader2 } from 'lucide-react';
import type { SpellData, SpellListProps } from '@/lib/data/spell-management';
import { getSchoolColor } from '@/lib/data/spell-management';

/**
 * SpellList Component
 * Displays searchable list of spells with edit button
 *
 * Features:
 * - Search input with debounce handling
 * - Spell selection with visual feedback
 * - Edit button for quick access
 * - School color coding
 * - Loading state indicator
 */
export function SpellList({
  spells,
  selectedSpell,
  isLoading,
  searchTerm,
  onSelectSpell,
  onEditSpell,
  onSearch,
}: SpellListProps) {
  return (
    <div className="lg:col-span-1 bg-dungeon-800 rounded-lg p-4 flex flex-col h-[calc(100vh-200px)]">
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dungeon-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Buscar conjuro (min 3 letras)..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-400 transition-colors"
        />
      </div>

      {/* Spells List */}
      <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
        {isLoading ? (
          <div className="text-center py-4 text-dungeon-400">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            Cargando...
          </div>
        ) : spells.length === 0 ? (
          <div className="text-center py-4 text-dungeon-400">
            No se encontraron conjuros
          </div>
        ) : (
          spells.map((spell) => (
            <div
              key={spell.id}
              onClick={() => onSelectSpell(spell)}
              className={`p-3 rounded-lg cursor-pointer transition-all group ${
                selectedSpell?.id === spell.id
                  ? 'bg-gold-900/30 border border-gold-400 shadow-lg shadow-gold-500/20'
                  : 'bg-dungeon-700 hover:bg-dungeon-600 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-gold-300 group-hover:text-gold-200 transition-colors">
                    {spell.name}
                  </div>
                  <div className={`text-xs ${getSchoolColor(spell.school)}`}>
                    {spell.school} {spell.level ? `• ${spell.level.split(',')[0]}` : ''}
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditSpell(spell);
                  }}
                  className="p-1.5 hover:bg-dungeon-600 rounded transition-colors opacity-0 group-hover:opacity-100"
                  title="Editar conjuro"
                >
                  <Pencil className="h-4 w-4 text-gold-400" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
