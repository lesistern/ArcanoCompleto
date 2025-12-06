'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@/lib/supabase/client';
import { SkillEditorHeader } from '@/components/admin/SkillEditorHeader';
import { SkillListSidebar } from '@/components/admin/SkillListSidebar';
import { SkillData } from '@/types/admin-skills';

// Lazy-load heavy form editor component
const SkillFormEditor = dynamic(() => import('@/components/admin/SkillFormEditor').then(mod => ({ default: mod.SkillFormEditor })), {
  loading: () => <div className="h-96 bg-dungeon-800 rounded animate-pulse" />
});

export default function SkillsAdminPage() {
    const [skills, setSkills] = useState<SkillData[]>([]);
    const [selectedSkill, setSelectedSkill] = useState<SkillData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
    const [syncMessage, setSyncMessage] = useState('');

    const supabase = createClient();

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        setIsLoading(true);
        try {
            const { data: skillsData, error: skillError } = await supabase
                .from('skills')
                .select('*')
                .order('name');

            if (skillError) {
                console.error('Supabase error details:', skillError);
                throw skillError;
            }

            if (skillsData && skillsData.length > 0) {
                console.log('Sample skill data:', skillsData[0]);

                const sortedSkills = [...skillsData].sort((a: any, b: any) => {
                    const nameA = a.name || a.slug || '';
                    const nameB = b.name || b.slug || '';
                    return (nameA as string).localeCompare(nameB as string);
                });

                setSkills(sortedSkills as SkillData[]);
            }
        } catch (error: any) {
            console.error('Error loading skills:', error);
            setSyncStatus('error');
            setSyncMessage(`Error: ${error?.message || 'Error al cargar las habilidades'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNew = () => {
        const newSkill: SkillData = {
            id: 'new',
            slug: '',
            name: '',
            keyAbility: 'Inteligencia',
            category: 'Mental',
            trainedOnly: false,
            armorCheckPenalty: false,
            check: '',
            action: '',
            retry: false,
            classSkillFor: [],
            shortDescription: '',
            description: '',
            source: {
                book: 'Player\'s Handbook',
                page: 1,
            },
        };
        setSelectedSkill(newSkill);
        setIsCreating(true);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!selectedSkill) return;

        if (!selectedSkill.name) {
            setSyncStatus('error');
            setSyncMessage('El nombre es obligatorio');
            return;
        }

        setSyncStatus('syncing');
        setSyncMessage('Guardando en Supabase...');

        try {
            const slug = selectedSkill.slug || selectedSkill.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            const skillDataToSave = {
                slug,
                name: selectedSkill.name,
                keyAbility: selectedSkill.keyAbility,
                category: selectedSkill.category,
                trainedOnly: selectedSkill.trainedOnly,
                armorCheckPenalty: selectedSkill.armorCheckPenalty,
                shortDescription: selectedSkill.shortDescription,
                description: selectedSkill.description,
                check: selectedSkill.check,
                action: selectedSkill.action,
                retry: selectedSkill.retry,
                special: selectedSkill.special,
                classSkillFor: selectedSkill.classSkillFor,
                source: selectedSkill.source,
            };

            let skillId = selectedSkill.id;

            if (isCreating) {
                const { data, error } = await supabase
                    .from('skills')
                    .insert(skillDataToSave)
                    .select()
                    .single();

                if (error) throw error;
                skillId = data.id;
            } else {
                const { error } = await supabase
                    .from('skills')
                    .update(skillDataToSave)
                    .eq('id', skillId);
                if (error) throw error;
            }

            await loadSkills();

            setSyncStatus('success');
            setSyncMessage('Guardado correctamente');
            setIsEditing(false);
            setIsCreating(false);
            setTimeout(() => setSyncStatus('idle'), 3000);
        } catch (err: any) {
            console.error('Error saving skill:', err);
            setSyncStatus('error');
            setSyncMessage(`Error: ${err.message}`);
            setTimeout(() => setSyncStatus('idle'), 3000);
        }
    };

    const filteredSkills = skills.filter(s => {
        const displayName = (s.name || s.slug || '').toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        return displayName.includes(searchLower);
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-dungeon-900 via-dungeon-800 to-dungeon-900">
            <div className="container mx-auto px-4 py-8">
                <SkillEditorHeader
                    skillsCount={skills.length}
                    syncStatus={syncStatus}
                    syncMessage={syncMessage}
                    onCreateNew={handleCreateNew}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <SkillListSidebar
                        skills={skills}
                        selectedSkill={selectedSkill}
                        searchTerm={searchTerm}
                        isLoading={isLoading}
                        onSearchChange={setSearchTerm}
                        onSelectSkill={(s) => {
                            setSelectedSkill(s);
                            setIsEditing(false);
                            setIsCreating(false);
                        }}
                        onEdit={(s) => {
                            setSelectedSkill(s);
                            setIsEditing(true);
                            setIsCreating(false);
                        }}
                    />

                    <SkillFormEditor
                        selectedSkill={selectedSkill}
                        isEditing={isEditing}
                        isCreating={isCreating}
                        syncStatus={syncStatus}
                        onUpdate={setSelectedSkill}
                        onEditToggle={() => setIsEditing(!isEditing)}
                        onSave={handleSave}
                        onCancel={() => {
                            setIsEditing(false);
                            setIsCreating(false);
                            if (isCreating) setSelectedSkill(null);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
