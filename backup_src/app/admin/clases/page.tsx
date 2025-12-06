'use client';

import { useState, useEffect } from 'react';
import { RichTextEditor } from '@/components/RichTextEditor';
import { ArrowLeft, Save, Pencil, Loader2, CheckCircle2, AlertCircle, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { ProficienciesEditor } from '@/components/admin/ProficienciesEditor';
import { LevelProgressionEditor } from '@/components/admin/LevelProgressionEditor';
import { ImageUpload } from '@/components/admin/ImageUpload';

interface ClassData {
    id: string;
    slug: string;
    name: string;
    hit_die: string;
    skill_points: number;
    bab_progression: 'good' | 'medium' | 'poor';
    fort_save: 'good' | 'poor';
    ref_save: 'good' | 'poor';
    will_save: 'good' | 'poor';
    image_url?: string;
    spell_type?: 'arcanos' | 'divinos' | null;
    spell_ability?: string;
    class_skills: string[];
    weapon_proficiencies: string[];
    armor_proficiencies: string[];

    // Fluff (joined)
    short_description?: string;
    description?: string;
    adventures?: string;
    characteristics?: string;
    alignment?: string;
    religion?: string;
    background?: string;
    races?: string;
    other_classes?: string;
    role?: string;

    // Progression (joined/json)
    level_progression?: any[];
}

export default function ClassesAdminPage() {
    const [classes, setClasses] = useState<ClassData[]>([]);
    const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
    const [syncMessage, setSyncMessage] = useState('');

    const supabase = createClient();

    useEffect(() => {
        loadClasses();
    }, []);

    const loadClasses = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('classes')
                .select(`
                    *,
                    class_fluff (*),
                    level_progression (*)
                `)
                .order('name');

            if (error) throw error;

            if (data) {
                const formattedClasses: ClassData[] = data.map((c: any) => ({
                    ...c,
                    // Flatten fluff
                    short_description: c.class_fluff?.[0]?.short_description || '',
                    description: c.class_fluff?.[0]?.description || '',
                    adventures: c.class_fluff?.[0]?.adventures || '',
                    characteristics: c.class_fluff?.[0]?.characteristics || '',
                    alignment: c.class_fluff?.[0]?.alignment || '',
                    religion: c.class_fluff?.[0]?.religion || '',
                    background: c.class_fluff?.[0]?.background || '',
                    races: c.class_fluff?.[0]?.races || '',
                    other_classes: c.class_fluff?.[0]?.other_classes || '',
                    role: c.class_fluff?.[0]?.role || '',
                    // Flatten progression
                    level_progression: c.level_progression?.sort((a: any, b: any) => a.level - b.level) || []
                }));
                setClasses(formattedClasses);
            }
        } catch (error) {
            console.error('Error loading classes:', error);
            setSyncStatus('error');
            setSyncMessage('Error al cargar las clases');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNew = () => {
        const newClass: ClassData = {
            id: 'new',
            slug: '',
            name: '',
            hit_die: 'd8',
            skill_points: 2,
            bab_progression: 'medium',
            fort_save: 'poor',
            ref_save: 'poor',
            will_save: 'poor',
            class_skills: [],
            weapon_proficiencies: [],
            armor_proficiencies: [],
            level_progression: []
        };
        setSelectedClass(newClass);
        setIsCreating(true);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!selectedClass) return;

        if (!selectedClass.name) {
            setSyncStatus('error');
            setSyncMessage('El nombre es obligatorio');
            return;
        }

        setSyncStatus('syncing');
        setSyncMessage('Guardando en Supabase...');

        try {
            const slug = selectedClass.slug || selectedClass.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            // 1. Save Class Base Data
            const classDataToSave = {
                slug,
                name: selectedClass.name,
                hit_die: selectedClass.hit_die,
                skill_points: selectedClass.skill_points,
                bab_progression: selectedClass.bab_progression,
                fort_save: selectedClass.fort_save,
                ref_save: selectedClass.ref_save,
                will_save: selectedClass.will_save,
                image_url: selectedClass.image_url,
                spell_type: selectedClass.spell_type,
                spell_ability: selectedClass.spell_ability,
                class_skills: selectedClass.class_skills,
                weapon_proficiencies: selectedClass.weapon_proficiencies,
                armor_proficiencies: selectedClass.armor_proficiencies
            };

            let classId = selectedClass.id;

            if (isCreating) {
                const { data, error } = await supabase
                    .from('classes')
                    .insert(classDataToSave)
                    .select()
                    .single();

                if (error) throw error;
                classId = data.id;
            } else {
                const { error } = await supabase
                    .from('classes')
                    .update(classDataToSave)
                    .eq('id', classId);
                if (error) throw error;
            }

            // 2. Save Fluff
            const fluffData = {
                class_id: classId,
                short_description: selectedClass.short_description,
                description: selectedClass.description,
                adventures: selectedClass.adventures,
                characteristics: selectedClass.characteristics,
                alignment: selectedClass.alignment,
                religion: selectedClass.religion,
                background: selectedClass.background,
                races: selectedClass.races,
                other_classes: selectedClass.other_classes,
                role: selectedClass.role
            };

            // Upsert fluff (check if exists first or use upsert with conflict on class_id if unique constraint exists)
            // Assuming 1:1 relationship and class_id is unique or we just delete and insert?
            // Safer to upsert if we can, or just try insert and if fail update.
            // Let's try upserting based on class_id if possible, but standard upsert needs a constraint.
            // We'll check if fluff exists.
            const { data: existingFluff } = await supabase.from('class_fluff').select('id').eq('class_id', classId).single();

            if (existingFluff) {
                await supabase.from('class_fluff').update(fluffData).eq('class_id', classId);
            } else {
                await supabase.from('class_fluff').insert(fluffData);
            }

            // 3. Save Level Progression
            // Delete existing and re-insert is easiest for full list replacement
            if (selectedClass.level_progression) {
                await supabase.from('level_progression').delete().eq('class_id', classId);

                const progressionData = selectedClass.level_progression.map(p => ({
                    class_id: classId,
                    level: p.level,
                    base_attack_bonus: p.base_attack_bonus,
                    fort_save: p.fort_save,
                    ref_save: p.ref_save,
                    will_save: p.will_save,
                    special_abilities: p.special_abilities,
                    spells_per_day: p.spells_per_day
                }));

                if (progressionData.length > 0) {
                    const { error: progError } = await supabase.from('level_progression').insert(progressionData);
                    if (progError) throw progError;
                }
            }

            await loadClasses();

            setSyncStatus('success');
            setSyncMessage('Guardado correctamente');
            setIsEditing(false);
            setIsCreating(false);
            setTimeout(() => setSyncStatus('idle'), 3000);
        } catch (err: any) {
            console.error('Error saving class:', err);
            setSyncStatus('error');
            setSyncMessage(`Error: ${err.message}`);
            setTimeout(() => setSyncStatus('idle'), 3000);
        }
    };

    const filteredClasses = classes.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-dungeon-900 via-dungeon-800 to-dungeon-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/admin"
                        className="p-2 rounded-lg bg-dungeon-700 hover:bg-dungeon-600 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gold-400" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gold-400 mb-2">
                            Editor de Clases
                        </h1>
                        <p className="text-dungeon-300">
                            Total: {classes.length} clases
                        </p>
                        {syncStatus !== 'idle' && (
                            <div className={`mt-2 flex items-center gap-2 text-sm ${syncStatus === 'syncing' ? 'text-blue-400' :
                                syncStatus === 'success' ? 'text-green-400' :
                                    'text-red-400'
                                }`}>
                                {syncStatus === 'syncing' && <Loader2 className="h-4 w-4 animate-spin" />}
                                {syncStatus === 'success' && <CheckCircle2 className="h-4 w-4" />}
                                {syncStatus === 'error' && <AlertCircle className="h-4 w-4" />}
                                {syncMessage}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="px-4 py-2 bg-gold-600 hover:bg-gold-700 rounded-lg flex items-center gap-2 transition-colors font-bold text-dungeon-900"
                    >
                        <Plus className="h-5 w-5" />
                        Nueva Clase
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Class List */}
                    <div className="lg:col-span-1 bg-dungeon-800 rounded-lg p-4 flex flex-col h-[calc(100vh-200px)]">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dungeon-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Buscar clase..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-400"
                            />
                        </div>
                        <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                            {isLoading ? (
                                <div className="text-center py-4 text-dungeon-400">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                                    Cargando clases...
                                </div>
                            ) : filteredClasses.map((c) => (
                                <div
                                    key={c.id}
                                    onClick={() => {
                                        setSelectedClass(c);
                                        setIsEditing(false);
                                        setIsCreating(false);
                                    }}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedClass?.id === c.id
                                        ? 'bg-gold-900/30 border border-gold-400'
                                        : 'bg-dungeon-700 hover:bg-dungeon-600'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold text-gold-300">
                                                {c.name}
                                            </div>
                                            <div className="text-xs text-dungeon-400">
                                                {c.hit_die} | {c.bab_progression}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedClass(c);
                                                setIsEditing(true);
                                                setIsCreating(false);
                                            }}
                                            className="p-1 hover:bg-dungeon-600 rounded"
                                        >
                                            <Pencil className="h-4 w-4 text-gold-400" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Class Editor */}
                    {selectedClass && (
                        <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6 overflow-y-auto h-[calc(100vh-200px)] custom-scrollbar">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gold-400">
                                    {isCreating ? 'Crear Nueva Clase' : `Editar: ${selectedClass.name}`}
                                </h2>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setIsCreating(false);
                                                if (isCreating) setSelectedClass(null);
                                            }}
                                            className="px-4 py-2 bg-dungeon-700 hover:bg-dungeon-600 rounded-lg transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleSave}
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
                                        onClick={() => setIsEditing(true)}
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
                                                value={selectedClass.name}
                                                onChange={(e) =>
                                                    setSelectedClass({ ...selectedClass, name: e.target.value })
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
                                                    setSelectedClass({ ...selectedClass, slug: e.target.value })
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
                                                imageUrl={selectedClass.image_url}
                                                onImageChange={(url: string) => setSelectedClass({ ...selectedClass, image_url: url })}
                                                disabled={!isEditing}
                                                itemName={selectedClass.name}
                                                itemSlug={selectedClass.slug}
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
                                                onChange={(e) => setSelectedClass({ ...selectedClass, hit_die: e.target.value })}
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
                                                onChange={(e) => setSelectedClass({ ...selectedClass, skill_points: parseInt(e.target.value) })}
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
                                                onChange={(e) => setSelectedClass({ ...selectedClass, bab_progression: e.target.value as any })}
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
                                                onChange={(e) => setSelectedClass({ ...selectedClass, fort_save: e.target.value as any })}
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
                                                onChange={(e) => setSelectedClass({ ...selectedClass, ref_save: e.target.value as any })}
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
                                                onChange={(e) => setSelectedClass({ ...selectedClass, will_save: e.target.value as any })}
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
                                            onChange={(items) => setSelectedClass({ ...selectedClass, class_skills: items })}
                                            placeholder="Ej: Avistar"
                                        />
                                        <div className="space-y-6">
                                            <ProficienciesEditor
                                                title="Competencia con Armas"
                                                items={selectedClass.weapon_proficiencies || []}
                                                onChange={(items) => setSelectedClass({ ...selectedClass, weapon_proficiencies: items })}
                                                placeholder="Ej: Sencillas, Marciales..."
                                            />
                                            <ProficienciesEditor
                                                title="Competencia con Armaduras"
                                                items={selectedClass.armor_proficiencies || []}
                                                onChange={(items) => setSelectedClass({ ...selectedClass, armor_proficiencies: items })}
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
                                        onChange={(progression) => setSelectedClass({ ...selectedClass, level_progression: progression })}
                                    />
                                </section>

                                {/* Descriptions (Fluff) */}
                                <section className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gold-500 border-b border-dungeon-700 pb-2">Descripción y Lore</h3>

                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">Descripción Corta</label>
                                        <textarea
                                            value={selectedClass.short_description || ''}
                                            onChange={(e) => setSelectedClass({ ...selectedClass, short_description: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400 h-20"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">Descripción Completa</label>
                                        <RichTextEditor
                                            value={selectedClass.description || ''}
                                            onChange={(value) => setSelectedClass({ ...selectedClass, description: value })}
                                            disabled={!isEditing}
                                            height="200px"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Aventuras</label>
                                            <RichTextEditor
                                                value={selectedClass.adventures || ''}
                                                onChange={(value) => setSelectedClass({ ...selectedClass, adventures: value })}
                                                disabled={!isEditing}
                                                height="150px"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Peculiaridades</label>
                                            <RichTextEditor
                                                value={selectedClass.characteristics || ''}
                                                onChange={(value) => setSelectedClass({ ...selectedClass, characteristics: value })}
                                                disabled={!isEditing}
                                                height="150px"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Alineamiento</label>
                                            <RichTextEditor
                                                value={selectedClass.alignment || ''}
                                                onChange={(value) => setSelectedClass({ ...selectedClass, alignment: value })}
                                                disabled={!isEditing}
                                                height="150px"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Religión</label>
                                            <RichTextEditor
                                                value={selectedClass.religion || ''}
                                                onChange={(value) => setSelectedClass({ ...selectedClass, religion: value })}
                                                disabled={!isEditing}
                                                height="150px"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Trasfondo</label>
                                            <RichTextEditor
                                                value={selectedClass.background || ''}
                                                onChange={(value) => setSelectedClass({ ...selectedClass, background: value })}
                                                disabled={!isEditing}
                                                height="150px"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Razas</label>
                                            <RichTextEditor
                                                value={selectedClass.races || ''}
                                                onChange={(value) => setSelectedClass({ ...selectedClass, races: value })}
                                                disabled={!isEditing}
                                                height="150px"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Otras Clases</label>
                                            <RichTextEditor
                                                value={selectedClass.other_classes || ''}
                                                onChange={(value) => setSelectedClass({ ...selectedClass, other_classes: value })}
                                                disabled={!isEditing}
                                                height="150px"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">Papel</label>
                                            <RichTextEditor
                                                value={selectedClass.role || ''}
                                                onChange={(value) => setSelectedClass({ ...selectedClass, role: value })}
                                                disabled={!isEditing}
                                                height="150px"
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
