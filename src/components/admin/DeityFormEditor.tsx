'use client';

import { useState } from 'react';
import { Save, Pencil, Loader2 } from 'lucide-react';
import { RichTextEditor } from '@/components/RichTextEditor';
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
  is_major_deity?: boolean;
  is_minor_deity?: boolean;
  is_demigod?: boolean;
  is_philosophy?: boolean;
}

interface DeityFormEditorProps {
  deity: Deity | null;
  isEditing: boolean;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  rankLabels: Record<string, string>;
  alignmentLabels: Record<string, string>;
  onUpdate: (deity: Deity) => void;
  onEditToggle: () => void;
  onSave: () => void;
}

export function DeityFormEditor({
  deity,
  isEditing,
  syncStatus,
  rankLabels,
  alignmentLabels,
  onUpdate,
  onEditToggle,
  onSave,
}: DeityFormEditorProps) {
  const [activeTab, setActiveTab] = useState<'es' | 'en'>('es');

  if (!deity) {
    return (
      <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6">
        <p className="text-dungeon-400">Selecciona una deidad para verla</p>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gold-400">
          {isEditing ? 'Editar' : 'Ver'} Deidad
        </h2>
        {isEditing ? (
          <button
            onClick={onSave}
            disabled={syncStatus === 'syncing'}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {syncStatus === 'syncing' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sincronizando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Guardar en Supabase
              </>
            )}
          </button>
        ) : (
          <button
            onClick={onEditToggle}
            className="px-4 py-2 bg-gold-600 hover:bg-gold-700 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Pencil className="h-4 w-4" />
            Editar
          </button>
        )}
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-dungeon-300 mb-2">
            Rango
          </label>
          <select
            value={deity.rank}
            onChange={(e) => onUpdate({ ...deity, rank: e.target.value })}
            disabled={!isEditing}
            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
          >
            {Object.entries(rankLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-dungeon-300 mb-2">
            Alineamiento
          </label>
          <select
            value={deity.alignment}
            onChange={(e) => onUpdate({ ...deity, alignment: e.target.value })}
            disabled={!isEditing}
            style={{
              borderColor: deity.alignment && ALIGNMENT_CONFIG[deity.alignment]
                ? ALIGNMENT_CONFIG[deity.alignment].hex
                : '#3d3d3d',
              backgroundColor: deity.alignment && ALIGNMENT_CONFIG[deity.alignment]
                ? ALIGNMENT_CONFIG[deity.alignment].hex + '20'
                : '#3d3d3d',
            }}
            className="w-full px-3 py-2 border-2 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400 transition-colors"
          >
            {Object.entries(alignmentLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Language Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('es')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'es'
              ? 'bg-gold-600 text-white'
              : 'bg-dungeon-700 text-dungeon-300 hover:bg-dungeon-600'
          }`}
        >
          Español
        </button>
        <button
          onClick={() => setActiveTab('en')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'en'
              ? 'bg-gold-600 text-white'
              : 'bg-dungeon-700 text-dungeon-300 hover:bg-dungeon-600'
          }`}
        >
          English
        </button>
      </div>

      {/* Content Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={activeTab === 'es' ? deity.name_es : deity.name_en}
              onChange={(e) =>
                onUpdate({
                  ...deity,
                  [activeTab === 'es' ? 'name_es' : 'name_en']: e.target.value,
                })
              }
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Títulos
            </label>
            <input
              type="text"
              value={activeTab === 'es' ? deity.titles_es : deity.titles_en}
              onChange={(e) =>
                onUpdate({
                  ...deity,
                  [activeTab === 'es' ? 'titles_es' : 'titles_en']: e.target.value,
                })
              }
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-dungeon-300 mb-2">
            Portfolio
          </label>
          <input
            type="text"
            value={activeTab === 'es' ? deity.portfolio_es : deity.portfolio_en}
            onChange={(e) =>
              onUpdate({
                ...deity,
                [activeTab === 'es' ? 'portfolio_es' : 'portfolio_en']: e.target.value,
              })
            }
            disabled={!isEditing}
            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Símbolo
            </label>
            <input
              type="text"
              value={activeTab === 'es' ? deity.symbol_es : deity.symbol_en}
              onChange={(e) =>
                onUpdate({
                  ...deity,
                  [activeTab === 'es' ? 'symbol_es' : 'symbol_en']: e.target.value,
                })
              }
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Arma Predilecta
            </label>
            <input
              type="text"
              value={deity.favored_weapon}
              onChange={(e) =>
                onUpdate({ ...deity, favored_weapon: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-dungeon-300 mb-2">
            Dominios (separados por comas)
          </label>
          <input
            type="text"
            value={deity.domains.join(', ')}
            onChange={(e) =>
              onUpdate({
                ...deity,
                domains: e.target.value.split(',').map(d => d.trim()).filter(d => d),
              })
            }
            disabled={!isEditing}
            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Adoradores
            </label>
            <input
              type="text"
              value={activeTab === 'es' ? deity.worshipers_es : deity.worshipers_en}
              onChange={(e) =>
                onUpdate({
                  ...deity,
                  [activeTab === 'es' ? 'worshipers_es' : 'worshipers_en']: e.target.value,
                })
              }
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Plano Hogar
            </label>
            <input
              type="text"
              value={activeTab === 'es' ? deity.home_plane_es : deity.home_plane_en}
              onChange={(e) =>
                onUpdate({
                  ...deity,
                  [activeTab === 'es' ? 'home_plane_es' : 'home_plane_en']: e.target.value,
                })
              }
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-dungeon-300 mb-2">
            Descripción
          </label>
          {isEditing ? (
            <RichTextEditor
              value={activeTab === 'es' ? deity.description_es : deity.description_en}
              onChange={(value) =>
                onUpdate({
                  ...deity,
                  [activeTab === 'es' ? 'description_es' : 'description_en']: value,
                })
              }
              placeholder="Describe esta deidad..."
              height="400px"
            />
          ) : (
            <div className="bg-dungeon-900/50 rounded-lg p-4 border border-dungeon-700 min-h-[400px] text-dungeon-200 whitespace-pre-wrap">
              {activeTab === 'es' ? deity.description_es : deity.description_en}
            </div>
          )}
        </div>

        {/* Nuevos campos del Phase 1 */}
        {isEditing && (
          <>
            {/* Información Textual */}
            <div className="border-t border-dungeon-700 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gold-400 mb-4">Información Textual Adicional</h3>

              {/* Clero */}
              <div>
                <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                  Clero y Jerarquía
                </label>
                {isEditing ? (
                  <RichTextEditor
                    value={activeTab === 'es' ? (deity.clergy_es || '') : (deity.clergy_en || '')}
                    onChange={(value) =>
                      onUpdate({
                        ...deity,
                        [activeTab === 'es' ? 'clergy_es' : 'clergy_en']: value,
                      })
                    }
                    placeholder="Describe cómo es el clero de esta deidad..."
                    height="300px"
                  />
                ) : (
                  <div className="bg-dungeon-900/50 rounded-lg p-4 border border-dungeon-700 min-h-[300px] text-dungeon-200 whitespace-pre-wrap">
                    {activeTab === 'es' ? deity.clergy_es : deity.clergy_en}
                  </div>
                )}
              </div>

              {/* Templos */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                  Templos y Lugares de Culto
                </label>
                {isEditing ? (
                  <RichTextEditor
                    value={activeTab === 'es' ? (deity.temples_es || '') : (deity.temples_en || '')}
                    onChange={(value) =>
                      onUpdate({
                        ...deity,
                        [activeTab === 'es' ? 'temples_es' : 'temples_en']: value,
                      })
                    }
                    placeholder="Describe los templos típicos de esta deidad..."
                    height="300px"
                  />
                ) : (
                  <div className="bg-dungeon-900/50 rounded-lg p-4 border border-dungeon-700 min-h-[300px] text-dungeon-200 whitespace-pre-wrap">
                    {activeTab === 'es' ? deity.temples_es : deity.temples_en}
                  </div>
                )}
              </div>

              {/* Dogma */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                  Dogma y Enseñanzas
                </label>
                {isEditing ? (
                  <RichTextEditor
                    value={activeTab === 'es' ? (deity.teachings_es || '') : (deity.teachings_en || '')}
                    onChange={(value) =>
                      onUpdate({
                        ...deity,
                        [activeTab === 'es' ? 'teachings_es' : 'teachings_en']: value,
                      })
                    }
                    placeholder="Describe el dogma y enseñanzas centrales..."
                    height="300px"
                  />
                ) : (
                  <div className="bg-dungeon-900/50 rounded-lg p-4 border border-dungeon-700 min-h-[300px] text-dungeon-200 whitespace-pre-wrap">
                    {activeTab === 'es' ? deity.teachings_es : deity.teachings_en}
                  </div>
                )}
              </div>

              {/* Ritos y Celebraciones */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                  Ritos, Fiestas y Celebraciones
                </label>
                {isEditing ? (
                  <RichTextEditor
                    value={activeTab === 'es' ? (deity.rites_es || '') : (deity.rites_en || '')}
                    onChange={(value) =>
                      onUpdate({
                        ...deity,
                        [activeTab === 'es' ? 'rites_es' : 'rites_en']: value,
                      })
                    }
                    placeholder="Describe los ritos y celebraciones importantes..."
                    height="300px"
                  />
                ) : (
                  <div className="bg-dungeon-900/50 rounded-lg p-4 border border-dungeon-700 min-h-[300px] text-dungeon-200 whitespace-pre-wrap">
                    {activeTab === 'es' ? deity.rites_es : deity.rites_en}
                  </div>
                )}
              </div>
            </div>

            {/* Clasificación */}
            <div className="border-t border-dungeon-700 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gold-400 mb-4">Clasificación</h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deity.is_major_deity || false}
                    onChange={(e) => onUpdate({ ...deity, is_major_deity: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-dungeon-300">Deidad Mayor</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deity.is_minor_deity || false}
                    onChange={(e) => onUpdate({ ...deity, is_minor_deity: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-dungeon-300">Deidad Menor</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deity.is_demigod || false}
                    onChange={(e) => onUpdate({ ...deity, is_demigod: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-dungeon-300">Semidios</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deity.is_philosophy || false}
                    onChange={(e) => onUpdate({ ...deity, is_philosophy: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-dungeon-300">Filosofía</span>
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
