'use client';

import { Pencil, Save, Loader2 } from 'lucide-react';
import { RichTextEditor } from '@/components/RichTextEditor';
import { ProficienciesEditor } from '@/components/admin/ProficienciesEditor';
import { ImageUpload } from '@/components/admin/ImageUpload';

interface RaceData {
  id: string;
  slug: string;
  name: string;
  description?: string;
  size?: string;
  base_speed?: number;
  level_adjustment?: number;
  favored_class?: string;
  image_url?: string;
  automatic_languages?: string[];
  bonus_languages?: string[];
  racial_traits?: string[];
  ability_adjustments?: Record<string, number>;
  creature_type?: string;
  subtypes?: string[];
  darkvision?: number;
  low_light_vision?: boolean;
  [key: string]: any;
}

interface RaceFormEditorProps {
  selectedRace: RaceData | null;
  isEditing: boolean;
  isCreating: boolean;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  onUpdate: (race: RaceData) => void;
  onEditToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function RaceFormEditor({
  selectedRace,
  isEditing,
  isCreating,
  syncStatus,
  onUpdate,
  onEditToggle,
  onSave,
  onCancel,
}: RaceFormEditorProps) {
  if (!selectedRace) return null;

  const updateAbilityAdjustment = (stat: string, value: number) => {
    const newAdjustments = { ...(selectedRace.ability_adjustments || {}), [stat]: value };
    onUpdate({ ...selectedRace, ability_adjustments: newAdjustments });
  };

  return (
    <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gold-400">
          {isCreating ? 'Crear Nueva Raza' : `Editar: ${selectedRace.name}`}
        </h2>
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-dungeon-700 hover:bg-dungeon-600 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onSave}
              disabled={syncStatus === 'syncing'}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {syncStatus === 'syncing' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Guardar
                </>
              )}
            </button>
          </div>
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

      <div className="space-y-8">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={selectedRace.name}
                onChange={(e) =>
                  onUpdate({ ...selectedRace, name: e.target.value })
                }
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                Slug
              </label>
              <input
                type="text"
                value={selectedRace.slug}
                onChange={(e) =>
                  onUpdate({ ...selectedRace, slug: e.target.value })
                }
                disabled={!isEditing}
                placeholder="Generado automáticamente"
                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                  Tamaño
                </label>
                <select
                  value={selectedRace.size || 'Medium'}
                  onChange={(e) => onUpdate({ ...selectedRace, size: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                >
                  <option value="Fine">Diminuto (Fine)</option>
                  <option value="Diminutive">Diminuto (Diminutive)</option>
                  <option value="Tiny">Minúsculo</option>
                  <option value="Small">Pequeño</option>
                  <option value="Medium">Mediano</option>
                  <option value="Large">Grande</option>
                  <option value="Huge">Enorme</option>
                  <option value="Gargantuan">Gargantuesco</option>
                  <option value="Colossal">Colosal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                  Velocidad Base (pies)
                </label>
                <input
                  type="number"
                  value={selectedRace.base_speed || 30}
                  onChange={(e) => onUpdate({ ...selectedRace, base_speed: parseInt(e.target.value) })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>
          </div>

          <div>
            <ImageUpload
              imageUrl={selectedRace?.image_url}
              onImageChange={(url) => onUpdate({ ...selectedRace, image_url: url })}
              disabled={!isEditing}
              itemName={selectedRace?.name || ''}
              itemSlug={selectedRace?.slug || ''}
            />
          </div>
        </div>

        {/* Ability Adjustments */}
        <div className="p-4 bg-dungeon-900/30 rounded-lg border border-dungeon-700">
          <h3 className="text-lg font-bold text-gold-400 mb-4">Ajustes de Característica</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map((stat) => (
              <div key={stat}>
                <label className="block text-xs font-semibold text-dungeon-300 mb-1 text-center">
                  {stat}
                </label>
                <input
                  type="number"
                  value={selectedRace.ability_adjustments?.[stat] || 0}
                  onChange={(e) => updateAbilityAdjustment(stat, parseInt(e.target.value))}
                  disabled={!isEditing}
                  className="w-full px-2 py-1 bg-dungeon-700 border border-dungeon-600 rounded text-center text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Clase Predilecta
            </label>
            <input
              type="text"
              value={selectedRace.favored_class || ''}
              onChange={(e) => onUpdate({ ...selectedRace, favored_class: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Ajuste de Nivel
            </label>
            <input
              type="number"
              value={selectedRace.level_adjustment || 0}
              onChange={(e) => onUpdate({ ...selectedRace, level_adjustment: parseInt(e.target.value) })}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>

        {/* Lists */}
        <div className="space-y-6 p-4 bg-dungeon-900/30 rounded-lg border border-dungeon-700">
          <ProficienciesEditor
            title="Idiomas Automáticos"
            items={selectedRace.automatic_languages || []}
            onChange={(items) => onUpdate({ ...selectedRace, automatic_languages: items })}
            placeholder="Ej: Común, Élfico..."
            disabled={!isEditing}
          />
          <ProficienciesEditor
            title="Idiomas Adicionales"
            items={selectedRace.bonus_languages || []}
            onChange={(items) => onUpdate({ ...selectedRace, bonus_languages: items })}
            placeholder="Ej: Dracónico, Orco..."
            disabled={!isEditing}
          />
          <ProficienciesEditor
            title="Rasgos Raciales (Lista simple)"
            items={selectedRace.racial_traits || []}
            onChange={(items) => onUpdate({ ...selectedRace, racial_traits: items })}
            placeholder="Ej: Visión en la penumbra..."
            disabled={!isEditing}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-dungeon-300 mb-2">
            Descripción Completa
          </label>
          <RichTextEditor
            value={selectedRace.description || ''}
            onChange={(value) => onUpdate({ ...selectedRace, description: value })}
            disabled={!isEditing}
            height="400px"
          />
        </div>
      </div>
    </div>
  );
}
