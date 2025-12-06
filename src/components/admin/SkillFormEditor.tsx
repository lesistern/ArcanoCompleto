'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SkillData } from '@/types/admin-skills';
import { SkillCategory, AbilityScore } from '@/lib/types/skill';
import { RichTextEditor } from '../RichTextEditor';

const ABILITIES: AbilityScore[] = ['Fuerza', 'Destreza', 'Constitución', 'Inteligencia', 'Sabiduría', 'Carisma'];
const CATEGORIES: SkillCategory[] = ['Física', 'Mental', 'Social', 'Conocimiento', 'Oficio', 'Profesión', 'Interpretación'];

interface SkillFormEditorProps {
    selectedSkill: SkillData | null;
    isEditing: boolean;
    isCreating: boolean;
    syncStatus: 'idle' | 'syncing' | 'success' | 'error';
    onUpdate: (skill: SkillData) => void;
    onEditToggle: () => void;
    onSave: () => void;
    onCancel: () => void;
}

export function SkillFormEditor({
    selectedSkill,
    isEditing,
    isCreating,
    syncStatus,
    onUpdate,
    onEditToggle,
    onSave,
    onCancel,
}: SkillFormEditorProps) {
    const [expandedSections, setExpandedSections] = useState({
        basic: true,
        rules: true,
        classes: false,
        source: false,
    });

    if (!selectedSkill) {
        return (
            <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-8 flex items-center justify-center h-[calc(100vh-200px)]">
                <div className="text-center">
                    <p className="text-dungeon-400 text-lg">Selecciona una habilidad para editar</p>
                </div>
            </div>
        );
    }

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6 flex flex-col h-[calc(100vh-200px)] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-dungeon-700">
                <div>
                    <h2 className="text-2xl font-bold text-gold-400">
                        {isCreating ? 'Nueva Habilidad' : selectedSkill.name || selectedSkill.slug}
                    </h2>
                    {!isCreating && (
                        <p className="text-sm text-dungeon-400 mt-1">
                            ID: {selectedSkill.id}
                        </p>
                    )}
                </div>
                <div className="flex gap-2">
                    {!isEditing && !isCreating && (
                        <button
                            onClick={onEditToggle}
                            className="px-4 py-2 bg-gold-600 hover:bg-gold-700 rounded-lg text-dungeon-900 font-bold transition-colors"
                        >
                            Editar
                        </button>
                    )}
                    {(isEditing || isCreating) && (
                        <>
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 bg-dungeon-700 hover:bg-dungeon-600 rounded-lg text-dungeon-100 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={onSave}
                                disabled={syncStatus === 'syncing'}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-bold transition-colors disabled:opacity-50"
                            >
                                {syncStatus === 'syncing' ? 'Guardando...' : 'Guardar'}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Información Básica */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('basic')}
                    className="w-full flex items-center justify-between p-4 bg-dungeon-700 hover:bg-dungeon-600 rounded-lg transition-colors mb-3"
                >
                    <h3 className="text-lg font-semibold text-gold-400">Información Básica</h3>
                    {expandedSections.basic ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>

                {expandedSections.basic && (
                    <div className="space-y-4 p-4 bg-dungeon-900/50 rounded-lg border border-dungeon-700">
                        {/* Nombre */}
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Nombre</label>
                            <input
                                type="text"
                                value={selectedSkill.name || ''}
                                onChange={(e) => onUpdate({ ...selectedSkill, name: e.target.value })}
                                disabled={!isEditing && !isCreating}
                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Slug</label>
                            <input
                                type="text"
                                value={selectedSkill.slug || ''}
                                onChange={(e) => onUpdate({ ...selectedSkill, slug: e.target.value })}
                                disabled={!isEditing && !isCreating}
                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                            />
                        </div>

                        {/* Descripción Corta */}
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Descripción Corta</label>
                            <textarea
                                value={selectedSkill.shortDescription || ''}
                                onChange={(e) => onUpdate({ ...selectedSkill, shortDescription: e.target.value })}
                                disabled={!isEditing && !isCreating}
                                placeholder="Descripción breve de la habilidad..."
                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400 resize-none h-20"
                            />
                        </div>

                        {/* Descripción Completa */}
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Descripción Completa</label>
                            {isEditing || isCreating ? (
                                <RichTextEditor
                                    value={selectedSkill.description || ''}
                                    onChange={(value: string) => onUpdate({ ...selectedSkill, description: value })}
                                    height="300px"
                                />
                            ) : (
                                <div className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 min-h-20 whitespace-pre-wrap">
                                    {selectedSkill.description || 'Sin descripción'}
                                </div>
                            )}
                        </div>

                        {/* Habilidad Clave */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-dungeon-300 mb-2">Habilidad Clave</label>
                                <select
                                    value={selectedSkill.keyAbility || ''}
                                    onChange={(e) => onUpdate({ ...selectedSkill, keyAbility: e.target.value as AbilityScore })}
                                    disabled={!isEditing && !isCreating}
                                    className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                >
                                    <option value="">Seleccionar...</option>
                                    {ABILITIES.map(ability => (
                                        <option key={ability} value={ability}>{ability}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-dungeon-300 mb-2">Categoría</label>
                                <select
                                    value={selectedSkill.category || ''}
                                    onChange={(e) => onUpdate({ ...selectedSkill, category: e.target.value as SkillCategory })}
                                    disabled={!isEditing && !isCreating}
                                    className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                >
                                    <option value="">Seleccionar...</option>
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Checkboxes */}
                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedSkill.trainedOnly || false}
                                    onChange={(e) => onUpdate({ ...selectedSkill, trainedOnly: e.target.checked })}
                                    disabled={!isEditing && !isCreating}
                                    className="w-4 h-4 rounded border-dungeon-600"
                                />
                                <span className="text-sm text-dungeon-300">Solo Entrenada</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedSkill.armorCheckPenalty || false}
                                    onChange={(e) => onUpdate({ ...selectedSkill, armorCheckPenalty: e.target.checked })}
                                    disabled={!isEditing && !isCreating}
                                    className="w-4 h-4 rounded border-dungeon-600"
                                />
                                <span className="text-sm text-dungeon-300">Penalización por Armadura</span>
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Reglas */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('rules')}
                    className="w-full flex items-center justify-between p-4 bg-dungeon-700 hover:bg-dungeon-600 rounded-lg transition-colors mb-3"
                >
                    <h3 className="text-lg font-semibold text-gold-400">Reglas</h3>
                    {expandedSections.rules ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>

                {expandedSections.rules && (
                    <div className="space-y-4 p-4 bg-dungeon-900/50 rounded-lg border border-dungeon-700">
                        {/* Check */}
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Tirada</label>
                            <textarea
                                value={selectedSkill.check || ''}
                                onChange={(e) => onUpdate({ ...selectedSkill, check: e.target.value })}
                                disabled={!isEditing && !isCreating}
                                placeholder="Cómo se realiza la tirada..."
                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400 resize-none h-20"
                            />
                        </div>

                        {/* Action */}
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Tipo de Acción</label>
                            <textarea
                                value={selectedSkill.action || ''}
                                onChange={(e) => onUpdate({ ...selectedSkill, action: e.target.value })}
                                disabled={!isEditing && !isCreating}
                                placeholder="Qué tipo de acción requiere..."
                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400 resize-none h-20"
                            />
                        </div>

                        {/* Special */}
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Reglas Especiales</label>
                            <textarea
                                value={Array.isArray(selectedSkill.special) ? selectedSkill.special.join('\n') : selectedSkill.special || ''}
                                onChange={(e) => onUpdate({ ...selectedSkill, special: e.target.value.split('\n').filter(s => s.trim()) })}
                                disabled={!isEditing && !isCreating}
                                placeholder="Reglas especiales (una por línea)..."
                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400 resize-none h-24"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Clases que la tienen */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('classes')}
                    className="w-full flex items-center justify-between p-4 bg-dungeon-700 hover:bg-dungeon-600 rounded-lg transition-colors mb-3"
                >
                    <h3 className="text-lg font-semibold text-gold-400">Clases que la tienen</h3>
                    {expandedSections.classes ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>

                {expandedSections.classes && (
                    <div className="space-y-4 p-4 bg-dungeon-900/50 rounded-lg border border-dungeon-700">
                        <div className="flex flex-wrap gap-2">
                            {selectedSkill.classSkillFor && selectedSkill.classSkillFor.length > 0 ? (
                                selectedSkill.classSkillFor.map((className) => (
                                    <div key={className} className="flex items-center gap-1 bg-dungeon-700 text-dungeon-100 px-2 py-1 rounded border border-dungeon-600">
                                        <span className="text-sm">{className}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-dungeon-400 text-sm">Ninguna clase</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Información de Fuente */}
            <div>
                <button
                    onClick={() => toggleSection('source')}
                    className="w-full flex items-center justify-between p-4 bg-dungeon-700 hover:bg-dungeon-600 rounded-lg transition-colors mb-3"
                >
                    <h3 className="text-lg font-semibold text-gold-400">Información de Fuente</h3>
                    {expandedSections.source ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>

                {expandedSections.source && (
                    <div className="space-y-4 p-4 bg-dungeon-900/50 rounded-lg border border-dungeon-700">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-dungeon-300 mb-2">Libro</label>
                                <input
                                    type="text"
                                    value={selectedSkill.source?.book || ''}
                                    onChange={(e) => onUpdate({
                                        ...selectedSkill,
                                        source: { ...selectedSkill.source || {}, book: e.target.value } as any
                                    })}
                                    disabled={!isEditing && !isCreating}
                                    className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-dungeon-300 mb-2">Página</label>
                                <input
                                    type="number"
                                    value={selectedSkill.source?.page || ''}
                                    onChange={(e) => onUpdate({
                                        ...selectedSkill,
                                        source: { ...selectedSkill.source || {}, page: parseInt(e.target.value) || 0 } as any
                                    })}
                                    disabled={!isEditing && !isCreating}
                                    className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
