'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@/lib/supabase/client';
import { ClassEditorHeader } from '@/components/admin/ClassEditorHeader';
import { ClassListSidebar } from '@/components/admin/ClassListSidebar';
import { ClassData } from '@/types/admin-classes';

// Lazy-load heavy form editor component
const ClassFormEditor = dynamic(() => import('@/components/admin/ClassFormEditor').then(mod => ({ default: mod.ClassFormEditor })), {
  loading: () => <div className="h-96 bg-dungeon-800 rounded animate-pulse" />
});

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
            // Load classes from main table
            const { data: classesData, error: classError } = await supabase
                .from('classes')
                .select('*');

            if (classError) {
                console.error('Supabase error details:', classError);
                throw classError;
            }

            if (classesData && classesData.length > 0) {
                // Log first class to see available columns
                console.log('Sample class data:', classesData[0]);

                // Detect which column contains the class name
                // Check common column names: name, title, class_name, label
                const sampleClass = classesData[0] as any;
                const nameColumn =
                    sampleClass.name ? 'name' :
                    sampleClass.title ? 'title' :
                    sampleClass.class_name ? 'class_name' :
                    sampleClass.label ? 'label' :
                    'slug'; // Fallback to slug

                console.log('Using column for name:', nameColumn);

                // Sort by detected name column, otherwise by slug
                const sortedClasses = [...classesData].sort((a: any, b: any) => {
                    const nameA = a[nameColumn] || a.slug || '';
                    const nameB = b[nameColumn] || b.slug || '';
                    return (nameA as string).localeCompare(nameB as string);
                });

                // Load progression data for each class
                const classesWithProgression: ClassData[] = await Promise.all(
                    sortedClasses.map(async (c: any) => {
                        // Try to load progression if class_progression table exists
                        let progressionData = [];
                        try {
                            const { data: progData } = await supabase
                                .from('class_progression')
                                .select('*')
                                .eq('class_slug', c.slug)
                                .order('level');

                            if (progData) {
                                progressionData = progData;
                            }
                        } catch (e) {
                            // Table might not exist, just continue without progression
                            console.debug('class_progression table not found for', c.slug);
                        }

                        return {
                            ...c,
                            // Initialize fluff fields from class table columns if they exist
                            short_description: c.short_description || '',
                            description: c.description || '',
                            adventures: c.adventures || '',
                            characteristics: c.characteristics || '',
                            alignment: c.alignment || '',
                            religion: c.religion || '',
                            background: c.background || '',
                            races: c.races || '',
                            other_classes: c.other_classes || '',
                            role: c.role || '',
                            level_progression: progressionData
                        };
                    })
                );
                setClasses(classesWithProgression);
            }
        } catch (error: any) {
            console.error('Error loading classes:', error);
            setSyncStatus('error');
            setSyncMessage(`Error: ${error?.message || 'Error al cargar las clases'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNew = () => {
        const newClass: ClassData = {
            id: 'new',
            slug: '',
            titulo: '',
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

        // Use titulo (Spanish column name) - fallback to name for backwards compatibility
        const classTitle = selectedClass.titulo || selectedClass.name;

        if (!classTitle) {
            setSyncStatus('error');
            setSyncMessage('El título es obligatorio');
            return;
        }

        setSyncStatus('syncing');
        setSyncMessage('Guardando en Supabase...');

        try {
            const slug = selectedClass.slug || classTitle.toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            // 1. Save Class Base Data - using 'titulo' column (not 'name')
            const classDataToSave = {
                slug,
                titulo: classTitle,
                subtitulo: selectedClass.subtitulo || selectedClass.short_description || '',
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
                armor_proficiencies: selectedClass.armor_proficiencies,
                descripcion: selectedClass.description || selectedClass.descripcion || ''
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

            // 2. Note: Fluff fields are now stored directly in classes table
            // The following fields are stored as direct columns in the classes table:
            // short_description, description, adventures, characteristics, alignment, religion, background, races, other_classes, role
            // They are already included in the classDataToSave above, so no separate fluff table save needed

            // 3. Save Level Progression (if class_progression table exists)
            // Delete existing and re-insert is easiest for full list replacement
            if (selectedClass.level_progression && selectedClass.level_progression.length > 0) {
                try {
                    await supabase.from('class_progression').delete().eq('class_slug', slug);

                    const progressionData = selectedClass.level_progression.map(p => ({
                        class_slug: slug,
                        level: p.level,
                        base_attack_bonus: p.base_attack_bonus,
                        fort_save: p.fort_save,
                        ref_save: p.ref_save,
                        will_save: p.will_save,
                        special_abilities: p.special_abilities,
                        spells_per_day: p.spells_per_day
                    }));

                    if (progressionData.length > 0) {
                        const { error: progError } = await supabase.from('class_progression').insert(progressionData);
                        if (progError) throw progError;
                    }
                } catch (e) {
                    // class_progression table might not exist yet, skip this step
                    console.debug('class_progression table not available, skipping progression save');
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

    const filteredClasses = classes.filter(c => {
        const displayName = (c.titulo || c.name || c.title || c.class_name || c.label || c.slug || '').toLowerCase();
        const slug = (c.slug || '').toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        return displayName.includes(searchLower) || slug.includes(searchLower);
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-dungeon-900 via-dungeon-800 to-dungeon-900">
            <div className="container mx-auto px-4 py-8">
                <ClassEditorHeader
                    classesCount={classes.length}
                    syncStatus={syncStatus}
                    syncMessage={syncMessage}
                    onCreateNew={handleCreateNew}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <ClassListSidebar
                        classes={classes}
                        selectedClass={selectedClass}
                        searchTerm={searchTerm}
                        isLoading={isLoading}
                        onSearchChange={setSearchTerm}
                        onSelectClass={(c) => {
                            setSelectedClass(c);
                            setIsEditing(false);
                            setIsCreating(false);
                        }}
                        onEdit={(c) => {
                            setSelectedClass(c);
                            setIsEditing(true);
                            setIsCreating(false);
                        }}
                    />

                    <ClassFormEditor
                        selectedClass={selectedClass}
                        isEditing={isEditing}
                        isCreating={isCreating}
                        syncStatus={syncStatus}
                        onUpdate={setSelectedClass}
                        onEditToggle={() => setIsEditing(!isEditing)}
                        onSave={handleSave}
                        onCancel={() => {
                            setIsEditing(false);
                            setIsCreating(false);
                            if (isCreating) setSelectedClass(null);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
