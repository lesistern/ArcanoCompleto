'use client';

import { Save, Pencil, Loader2 } from 'lucide-react';
import { RichTextEditor } from '@/components/RichTextEditor';
import { ComponentsCheckbox } from './ComponentsCheckbox';
import type { SpellEditorProps } from '@/lib/data/spell-management';
import { SPELL_SCHOOLS, CASTING_TIMES, RANGE_TYPES } from '@/lib/data/spell-management';

/**
 * SpellEditor Component
 * Displays spell detail form with edit/save functionality
 *
 * Features:
 * - Read-only display by default
 * - Edit mode with all fields editable
 * - RichTextEditor for descriptions
 * - Component checkboxes
 * - Source information fields
 * - Save/Cancel buttons
 */
export function SpellEditor({
  spell,
  isCreating,
  isEditing,
  isSyncing,
  onSpellChange,
  onEdit,
  onCancel,
  onSave,
}: SpellEditorProps) {
  return (
    <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6 overflow-y-auto h-[calc(100vh-200px)] custom-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gold-400">
          {isCreating ? 'Crear Nuevo Conjuro' : `Editar: ${spell.name}`}
        </h2>

        {/* Action Buttons */}
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-dungeon-700 hover:bg-dungeon-600 rounded-lg transition-colors font-medium text-dungeon-100"
            >
              Cancelar
            </button>
            <button
              onClick={onSave}
              disabled={isSyncing}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSyncing ? (
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
            onClick={onEdit}
            className="px-4 py-2 bg-gold-600 hover:bg-gold-700 rounded-lg flex items-center gap-2 transition-colors font-medium"
          >
            <Pencil className="h-4 w-4" />
            Editar
          </button>
        )}
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {/* Name and School */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={spell.name}
              onChange={(e) => onSpellChange({ ...spell, name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Escuela
            </label>
            <select
              value={spell.school}
              onChange={(e) => onSpellChange({ ...spell, school: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-gold-400 transition-colors"
            >
              {SPELL_SCHOOLS.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subschool and Descriptors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Subescuela
            </label>
            <input
              type="text"
              value={spell.subschool || ''}
              onChange={(e) => onSpellChange({ ...spell, subschool: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Descriptores
            </label>
            <input
              type="text"
              value={spell.descriptors || ''}
              onChange={(e) => onSpellChange({ ...spell, descriptors: e.target.value })}
              disabled={!isEditing}
              placeholder="Ej: Fuego, Mente..."
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-500 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-semibold text-dungeon-300 mb-2">
            Nivel (Clase Nivel, ...)
          </label>
          <input
            type="text"
            value={spell.level}
            onChange={(e) => onSpellChange({ ...spell, level: e.target.value })}
            disabled={!isEditing}
            placeholder="Ej: Hechicero/Mago 3, Clérigo 3"
            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-500 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-gold-400 transition-colors"
          />
        </div>

        {/* Components Section */}
        <ComponentsCheckbox
          spell={spell}
          isEditing={isEditing}
          onSpellChange={onSpellChange}
        />

        {/* Casting, Range, Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Tiempo de Lanzamiento
            </label>
            <select
              value={spell.casting_time}
              onChange={(e) => onSpellChange({ ...spell, casting_time: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-gold-400 transition-colors"
            >
              {CASTING_TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Alcance
            </label>
            <select
              value={spell.range}
              onChange={(e) => onSpellChange({ ...spell, range: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-gold-400 transition-colors"
            >
              {RANGE_TYPES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Objetivo / Área / Efecto
            </label>
            <input
              type="text"
              value={spell.target || spell.area || spell.effect || ''}
              onChange={(e) => onSpellChange({ ...spell, target: e.target.value })}
              disabled={!isEditing}
              placeholder="Objetivo, Área o Efecto"
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-500 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Duración
            </label>
            <input
              type="text"
              value={spell.duration}
              onChange={(e) => onSpellChange({ ...spell, duration: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Tiro de Salvación
            </label>
            <input
              type="text"
              value={spell.saving_throw || ''}
              onChange={(e) => onSpellChange({ ...spell, saving_throw: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Resistencia a Conjuros
            </label>
            <input
              type="text"
              value={spell.spell_resistance || ''}
              onChange={(e) => onSpellChange({ ...spell, spell_resistance: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-dungeon-300 mb-2">
            Descripción
          </label>
          <RichTextEditor
            value={spell.description || ''}
            onChange={(value) => onSpellChange({ ...spell, description: value })}
            disabled={!isEditing}
            height="300px"
          />
        </div>

        {/* Source */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Libro Fuente
            </label>
            <input
              type="text"
              value={spell.source_book || ''}
              onChange={(e) => onSpellChange({ ...spell, source_book: e.target.value })}
              disabled={!isEditing}
              placeholder="Ej: Player's Handbook"
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-500 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
              Página
            </label>
            <input
              type="number"
              value={spell.source_page || ''}
              onChange={(e) => onSpellChange({ ...spell, source_page: parseInt(e.target.value) || undefined })}
              disabled={!isEditing}
              className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
