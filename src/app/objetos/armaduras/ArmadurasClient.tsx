'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, ChevronRight, BookOpen, ChevronDown, ChevronUp, Feather, ShieldHalf, ShieldAlert, CircleDot, Search, Sparkles, Filter, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  type ArmorItem,
  filterArmors,
  groupArmorsByType,
  translateArmorName,
  getArmorDescription,
  formatArmorBonus,
  formatMaxDexBonus,
  formatArmorCheckPenalty,
  formatArcaneSpellFailure,
  formatSpeed30,
  formatSpeed20,
  formatArmorCost,
  formatArmorWeight,
} from '@/lib/utils/armor-categorizer';

interface ArmadurasClientProps {
  armors: ArmorItem[];
}

// Row colors by armor type
function getRowColorClasses(armorType: string): string {
  switch (armorType) {
    case 'light':
      return 'bg-green-900/20 hover:bg-green-900/40 border-l-4 border-green-500';
    case 'medium':
      return 'bg-blue-900/20 hover:bg-blue-900/40 border-l-4 border-blue-500';
    case 'heavy':
      return 'bg-red-900/20 hover:bg-red-900/40 border-l-4 border-red-500';
    case 'shield':
      return 'bg-gold-900/20 hover:bg-gold-900/40 border-l-4 border-gold-500';
    default:
      return 'bg-dungeon-800/50 hover:bg-dungeon-800';
  }
}

function getTypeTextColor(armorType: string): string {
  switch (armorType) {
    case 'light': return 'text-green-400';
    case 'medium': return 'text-blue-400';
    case 'heavy': return 'text-red-400';
    case 'shield': return 'text-gold-400';
    default: return 'text-gray-400';
  }
}

function ArmorTableRow({ armor, isExpanded, onToggle }: {
  armor: ArmorItem;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const armorNameEs = translateArmorName(armor.name);
  const description = getArmorDescription(armor.name);
  const rowClasses = getRowColorClasses(armor.armor_type);
  const typeColor = getTypeTextColor(armor.armor_type);

  return (
    <>
      <tr className={`${rowClasses} transition-colors cursor-pointer`} onClick={onToggle}>
        <td className="py-3 px-4">
          <div className="flex items-center gap-2">
            {description && (
              <button className="text-gray-400 hover:text-gold-400 transition-colors">
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            )}
            <Link
              href={`/objetos/armaduras/${armor.slug}`}
              className="font-semibold text-gray-200 hover:text-gold-400 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {armorNameEs}
            </Link>
          </div>
        </td>
        <td className={`py-3 px-3 text-center font-bold text-lg ${typeColor}`}>
          {formatArmorBonus(armor.armor_bonus)}
        </td>
        <td className="py-3 px-3 text-center text-green-400">
          {formatMaxDexBonus(armor.max_dex_bonus)}
        </td>
        <td className="py-3 px-3 text-center text-red-400">
          {formatArmorCheckPenalty(armor.armor_check_penalty)}
        </td>
        <td className="py-3 px-3 text-center text-purple-400">
          {formatArcaneSpellFailure(armor.arcane_spell_failure)}
        </td>
        <td className="py-3 px-3 text-center text-gray-400 text-sm">
          {armor.base_speed_30 ? `${formatSpeed30(armor.base_speed_30)}/${formatSpeed20(armor.base_speed_20)}` : '—'}
        </td>
        <td className="py-3 px-3 text-center text-gold-400 font-medium">
          {formatArmorCost(armor.cost_gold, armor.cost_silver)}
        </td>
        <td className="py-3 px-3 text-center text-gray-400">
          {formatArmorWeight(armor.weight_lb)}
        </td>
        <td className="py-3 px-3 text-center">
          <Link
            href={`/objetos/armaduras/${armor.slug}`}
            className="text-gold-400 hover:text-gold-300 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ChevronRight className="h-5 w-5 inline" />
          </Link>
        </td>
      </tr>
      {/* Description Row (expandable) */}
      {isExpanded && description && (
        <tr className={`${rowClasses.replace('hover:', '')} border-l-4 border-transparent`}>
          <td colSpan={9} className="py-3 px-4 pl-12">
            <p className="text-gray-400 text-sm leading-relaxed max-w-4xl">
              {description}
            </p>
          </td>
        </tr>
      )}
    </>
  );
}

// Lucide icons for armor types
function getArmorTypeIconComponent(type: string) {
  switch (type) {
    case 'light':
    case 'Ligera':
      return <Feather className="h-7 w-7 text-green-400" />;
    case 'medium':
    case 'Media':
      return <ShieldHalf className="h-7 w-7 text-blue-400" />;
    case 'heavy':
    case 'Pesada':
      return <ShieldAlert className="h-7 w-7 text-red-400" />;
    case 'shield':
    case 'Escudo':
      return <CircleDot className="h-7 w-7 text-gold-400" />;
    default:
      return <Shield className="h-7 w-7 text-gray-400" />;
  }
}

import { ArmorCardMobile } from '@/components/armor/ArmorCardMobile';

function ArmorTable({ armors, title, typeKey }: {
  armors: ArmorItem[];
  title: string;
  typeKey: string;
}) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const typeColor = getTypeTextColor(typeKey);

  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (armors.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        {getArmorTypeIconComponent(typeKey)}
        <h2 className={`text-2xl font-bold ${typeColor}`}>{title}</h2>
        <span className="text-sm text-gray-500">({armors.length})</span>
      </div>

      {/* Mobile View: Cards */}
      <div className="block md:hidden">
        {armors.map((armor) => (
          <ArmorCardMobile
            key={armor.id}
            armor={armor}
            getRowColorClasses={getRowColorClasses}
            getTypeTextColor={getTypeTextColor}
            isExpanded={expandedRows.has(armor.id)}
            onToggle={() => toggleRow(armor.id)}
          />
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-dungeon-700">
        <table className="w-full text-sm">
          <thead className="bg-dungeon-800">
            <tr className="border-b border-dungeon-700">
              <th className="py-3 px-4 text-left text-gray-400 font-semibold">Armadura</th>
              <th className="py-3 px-3 text-center text-gray-400 font-semibold">CA</th>
              <th className="py-3 px-3 text-center text-gray-400 font-semibold">Máx DES</th>
              <th className="py-3 px-3 text-center text-gray-400 font-semibold">Penaliz.</th>
              <th className="py-3 px-3 text-center text-gray-400 font-semibold">F. Arcano</th>
              <th className="py-3 px-3 text-center text-gray-400 font-semibold">Velocidad</th>
              <th className="py-3 px-3 text-center text-gray-400 font-semibold">Coste</th>
              <th className="py-3 px-3 text-center text-gray-400 font-semibold">Peso</th>
              <th className="py-3 px-3 text-center text-gray-400 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dungeon-800">
            {armors.map((armor) => (
              <ArmorTableRow
                key={armor.id}
                armor={armor}
                isExpanded={expandedRows.has(armor.id)}
                onToggle={() => toggleRow(armor.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ArmadurasClient({ armors }: ArmadurasClientProps) {
  const [selectedType, setSelectedType] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredArmors = filterArmors(armors, selectedType, searchTerm);
  const groupedByType = groupArmorsByType(filteredArmors, selectedType);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dungeon-950 via-dungeon-900/90 to-dungeon-950/50"></div>

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Link href="/objetos">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300 pl-0">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-200 leading-tight">
              Armaduras y Escudos
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Protege tu vida con la mejor defensa. Encuentra armaduras ligeras para moverte con sigilo,
              o pesadas placas para resistir los golpes más duros.
            </p>
          </div>

          {/* Link a Reglas */}
          <Link href="/reglas/equipamiento" className="flex items-center gap-3 px-6 py-4 bg-dungeon-950/50 rounded-lg border border-dungeon-800 backdrop-blur-sm hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group cursor-pointer">
            <Shield className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-sm font-bold text-blue-500 uppercase tracking-wider">Reglas de Armadura</div>
              <div className="text-xs text-gray-400">CA, Penalizadores y más</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Control Panel / Filters */}
      <div className="sticky top-4 z-30 bg-dungeon-950/95 backdrop-blur-md border border-dungeon-800 rounded-xl shadow-lg p-4 transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500 group-focus-within:text-gold-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Buscar armadura..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 bg-dungeon-900 border border-dungeon-700 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
            />
          </div>

          {/* Filter Toggle (Mobile) & Active Filters Summary */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
              <Sparkles className="h-4 w-4 text-gold-500" />
              <span>Mostrando {filteredArmors.length} objetos</span>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${mobileFiltersOpen
                ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                : 'bg-dungeon-800 border-dungeon-700 text-gray-300 hover:border-dungeon-600'
                }`}
            >
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filtros</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {mobileFiltersOpen && (
          <div className="mt-6 pt-6 border-t border-dungeon-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2">
            {/* Filtro por Tipo de Armadura */}
            <div className="space-y-2 col-span-full">
              <label className="text-xs font-bold text-gold-500 uppercase tracking-wider block mb-2">
                Tipo de armadura
              </label>
              <div className="flex flex-wrap gap-2">
                {['Todas', 'Ligera', 'Media', 'Pesada', 'Escudo'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedType === type
                      ? 'bg-gold-600 text-gray-950'
                      : 'bg-dungeon-800 border border-dungeon-700 text-gray-300 hover:border-gold-500/50'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm px-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-400">Ligera</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-gray-400">Media</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-400">Pesada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gold-500"></div>
          <span className="text-gray-400">Escudo</span>
        </div>
      </div>

      {/* Armor Tables by Type */}
      {groupedByType['Ligera'] && (
        <ArmorTable
          armors={groupedByType['Ligera']}
          title="Armadura Ligera"
          typeKey="light"
        />
      )}

      {groupedByType['Media'] && (
        <ArmorTable
          armors={groupedByType['Media']}
          title="Armadura Media"
          typeKey="medium"
        />
      )}

      {groupedByType['Pesada'] && (
        <ArmorTable
          armors={groupedByType['Pesada']}
          title="Armadura Pesada"
          typeKey="heavy"
        />
      )}

      {groupedByType['Escudo'] && (
        <ArmorTable
          armors={groupedByType['Escudo']}
          title="Escudos"
          typeKey="shield"
        />
      )}

      {/* Empty State */}
      {filteredArmors.length === 0 && (
        <div className="text-center py-16 bg-dungeon-900/50 rounded-xl border border-dungeon-800 border-dashed">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dungeon-800 mb-4">
            <Search className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-heading font-semibold text-gray-300 mb-2">No se encontraron armaduras</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Intenta ajustar los filtros o buscar con otros términos.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedType('Todas');
            }}
            className="mt-6 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
