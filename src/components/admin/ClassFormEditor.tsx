'use client';

import { useState } from 'react';
import { Save, Pencil, Loader2 } from 'lucide-react';
import { RichTextEditor } from '@/components/RichTextEditor';
import { ProficienciesEditor } from '@/components/admin/ProficienciesEditor';
import { LevelProgressionEditor } from '@/components/admin/LevelProgressionEditor';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { ClassData, getClassName } from '@/types/admin-classes';

interface ClassFormEditorProps {
    selectedClass: ClassData | null;
    isEditing: boolean;
    isCreating: boolean;
    syncStatus: 'idle' | 'syncing' | 'success' | 'error';
    onUpdate: (classData: ClassData) => void;
    onEditToggle: () => void;
    onSave: () => void;
    onCancel: () => void;
}

export function ClassFormEditor({
    selectedClass,
    isEditing,
    isCreating,
    syncStatus,
    onUpdate,
    onEditToggle,
    onSave,
    onCancel,
}: ClassFormEditorProps) {
    if (!selectedClass) {
        return (
            <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6">
                <p className="text-dungeon-400">Selecciona una clase para editarla</p>
            </div>
        );
    }

    return (
        <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6 overflow-y-auto h-[calc(100vh-200px)] custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gold-400">
                    {isCreating ? 'Crear Nueva Clase' : `Editar: ${getClassName(selectedClass)}`}
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
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-gold-500 border-b border-dungeon-700 pb-2">Información Básica</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                Nombre
                            </label>
                            <input
                                type="text"
                                value={selectedClass.titulo || selectedClass.name || ''}
                                onChange={(e) =>
                                    onUpdate({ ...selectedClass, titulo: e.target.value })
                                }
                                disabled={!isEditing}
                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                Slug (URL)
                            </label>
                            <input
                                type="text"
                                value={selectedClass.slug}
                                onChange={(e) =>
                                    onUpdate({ ...selectedClass, slug: e.target.value })
                                }
                                disabled={!isEditing}
                                placeholder="Auto-generado si está vacío"
                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                            Imagen de la Clase
                        </label>
                        <div className="max-w-md">
                            <ImageUpload
                                imageUrl={selectedClass?.image_url}
                                onImageChange={(url: string) => selectedClass && onUpdate({ ...selectedClass, image_url: url })}
                                disabled={!isEditing}
                                itemName={selectedClass?.titulo || selectedClass?.name || ''}
                                itemSlug={selectedClass?.slug || ''}
                            />
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-gold-500 border-b border-dungeon-700 pb-2">Estadísticas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                Dado de Golpe
                            </label>
                            <select
                                value={selectedClass.hit_die}
                                onChange={(e) => onUpdate({ ...selectedClass, hit_die: e.target.value })}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                            >
                                <option value="d4">d4</option>
                                <option value="d6">d6</option>
                                <option value="d8">d8</option>
                                <option value="d10">d10</option>
                                <option value="d12">d12</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                Puntos de Habilidad
                            </label>
                            <input
                                type="number"
                                value={selectedClass.skill_points}
                                onChange={(e) => onUpdate({ ...selectedClass, skill_points: parseInt(e.target.value) })}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                Progresión BAB
                            </label>
                            <select
                                value={selectedClass.bab_progression}
                                onChange={(e) => onUpdate({ ...selectedClass, bab_progression: e.target.value as any })}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                            >
                                <option value="good">Alta (Guerrero)</option>
                                <option value="medium">Media (Clérigo)</option>
                                <option value="poor">Baja (Mago)</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                Fortaleza
                            </label>
                            <select
                                value={selectedClass.fort_save}
                                onChange={(e) => onUpdate({ ...selectedClass, fort_save: e.target.value as any })}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                            >
                                <option value="good">Buena</option>
                                <option value="poor">Mala</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                Reflejos
                            </label>
                            <select
                                value={selectedClass.ref_save}
                                onChange={(e) => onUpdate({ ...selectedClass, ref_save: e.target.value as any })}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                            >
                                <option value="good">Buena</option>
                                <option value="poor">Mala</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                Voluntad
                            </label>
                            <select
                                value={selectedClass.will_save}
                                onChange={(e) => onUpdate({ ...selectedClass, will_save: e.target.value as any })}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                            >
                                <option value="good">Buena</option>
                                <option value="poor">Mala</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Proficiencies */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-gold-500 border-b border-dungeon-700 pb-2">Competencias</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ProficienciesEditor
                            title="Habilidades de Clase"
                            items={selectedClass.class_skills || []}
                            onChange={(items) => onUpdate({ ...selectedClass, class_skills: items })}
                            placeholder="Ej: Avistar"
                        />
                        <div className="space-y-6">
                            <ProficienciesEditor
                                title="Competencia con Armas"
                                items={selectedClass.weapon_proficiencies || []}
                                onChange={(items) => onUpdate({ ...selectedClass, weapon_proficiencies: items })}
                                placeholder="Ej: Sencillas, Marciales..."
                            />
                            <ProficienciesEditor
                                title="Competencia con Armaduras"
                                items={selectedClass.armor_proficiencies || []}
                                onChange={(items) => onUpdate({ ...selectedClass, armor_proficiencies: items })}
                                placeholder="Ej: Ligeras, Escudos..."
                            />
                        </div>
                    </div>
                </section>

                {/* Level Progression */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-gold-500 border-b border-dungeon-700 pb-2">Progresión de Niveles</h3>
                    <LevelProgressionEditor
                        progression={selectedClass.level_progression || []}
                        onChange={(progression) => onUpdate({ ...selectedClass, level_progression: progression })}
                    />
                </section>

                {/* Descriptions (Fluff) */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold text-gold-500 border-b border-dungeon-700 pb-2">Descripción y Lore</h3>

                    <div>
                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">Descripción Corta</label>
                        <textarea
                            value={selectedClass.short_description || ''}
                            onChange={(e) => onUpdate({ ...selectedClass, short_description: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400 h-20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">Descripción Completa</label>
                        <RichTextEditor
                            value={selectedClass.description || ''}
                            onChange={(value) => onUpdate({ ...selectedClass, description: value })}
                            disabled={!isEditing}
                            height="200px"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Aventuras</label>
                            <RichTextEditor
                                value={selectedClass.adventures || ''}
                                onChange={(value) => onUpdate({ ...selectedClass, adventures: value })}
                                disabled={!isEditing}
                                height="150px"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Peculiaridades</label>
                            <RichTextEditor
                                value={selectedClass.characteristics || ''}
                                onChange={(value) => onUpdate({ ...selectedClass, characteristics: value })}
                                disabled={!isEditing}
                                height="150px"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Alineamiento</label>
                            <RichTextEditor
                                value={selectedClass.alignment || ''}
                                onChange={(value) => onUpdate({ ...selectedClass, alignment: value })}
                                disabled={!isEditing}
                                height="150px"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Religión</label>
                            <RichTextEditor
                                value={selectedClass.religion || ''}
                                onChange={(value) => onUpdate({ ...selectedClass, religion: value })}
                                disabled={!isEditing}
                                height="150px"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Trasfondo</label>
                            <RichTextEditor
                                value={selectedClass.background || ''}
                                onChange={(value) => onUpdate({ ...selectedClass, background: value })}
                                disabled={!isEditing}
                                height="150px"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Razas</label>
                            <RichTextEditor
                                value={selectedClass.races || ''}
                                onChange={(value) => onUpdate({ ...selectedClass, races: value })}
                                disabled={!isEditing}
                                height="150px"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Otras Clases</label>
                            <RichTextEditor
                                value={selectedClass.other_classes || ''}
                                onChange={(value) => onUpdate({ ...selectedClass, other_classes: value })}
                                disabled={!isEditing}
                                height="150px"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Papel</label>
                            <RichTextEditor
                                value={selectedClass.role || ''}
                                onChange={(value) => onUpdate({ ...selectedClass, role: value })}
                                disabled={!isEditing}
                                height="150px"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
