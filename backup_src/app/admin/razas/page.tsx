'use client';

import { useState, useEffect } from 'react';
import { RichTextEditor } from '@/components/RichTextEditor';
import { ArrowLeft, Save, Pencil, Loader2, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
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
}

export default function RacesAdminPage() {
    const [races, setRaces] = useState<RaceData[]>([]);
    const [selectedRace, setSelectedRace] = useState<RaceData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
    const [syncMessage, setSyncMessage] = useState('');

    const supabase = createClient();

    useEffect(() => {
        loadRaces();
    }, []);

    const loadRaces = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('races')
                .select('*')
                .order('name');

            if (error) throw error;

            if (data) {
                setRaces(data);
            }
        } catch (error) {
            console.error('Error loading races:', error);
            setSyncStatus('error');
            setSyncMessage('Error al cargar las razas');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNew = () => {
        const newRace: RaceData = {
            id: 'new',
            slug: '',
            name: '',
            description: '',
            automatic_languages: [],
            bonus_languages: [],
            racial_traits: [],
            ability_adjustments: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
            subtypes: []
        };
        setSelectedRace(newRace);
        setIsCreating(true);
        setIsEditing(true);
    };



    const handleSave = async () => {
        if (!selectedRace) return;

        if (!selectedRace.name) {
            setSyncStatus('error');
            setSyncMessage('El nombre es obligatorio');
            return;
        }

        setSyncStatus('syncing');
        setSyncMessage('Guardando en Supabase...');

        try {
            const slug = selectedRace.slug || selectedRace.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            const raceDataToSave = {
                slug,
                name: selectedRace.name,
                description: selectedRace.description,
                size: selectedRace.size,
                base_speed: selectedRace.base_speed,
                level_adjustment: selectedRace.level_adjustment,
                favored_class: selectedRace.favored_class,
                image_url: selectedRace.image_url,
                automatic_languages: selectedRace.automatic_languages,
                bonus_languages: selectedRace.bonus_languages,
                racial_traits: selectedRace.racial_traits,
                ability_adjustments: selectedRace.ability_adjustments,
                creature_type: selectedRace.creature_type,
                subtypes: selectedRace.subtypes,
                darkvision: selectedRace.darkvision,
                low_light_vision: selectedRace.low_light_vision,
            };

            if (isCreating) {
                const { error } = await supabase
                    .from('races')
                    .insert(raceDataToSave);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('races')
                    .update(raceDataToSave)
                    .eq('id', selectedRace.id);
                if (error) throw error;
            }

            await loadRaces();

            setSyncStatus('success');
            setSyncMessage('Guardado correctamente');
            setIsEditing(false);
            setIsCreating(false);
            setTimeout(() => setSyncStatus('idle'), 3000);
        } catch (err: any) {
            console.error('Error saving race:', err);
            setSyncStatus('error');
            setSyncMessage(`Error: ${err.message}`);
            setTimeout(() => setSyncStatus('idle'), 3000);
        }
    };

    const updateAbilityAdjustment = (stat: string, value: number) => {
        if (!selectedRace) return;
        const newAdjustments = { ...(selectedRace.ability_adjustments || {}), [stat]: value };
        setSelectedRace({ ...selectedRace, ability_adjustments: newAdjustments });
    };

    const filteredRaces = races.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.slug.toLowerCase().includes(searchTerm.toLowerCase())
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
                            Editor de Razas
                        </h1>
                        <p className="text-dungeon-300">
                            Total: {races.length} razas
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
                        Nueva Raza
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Race List */}
                    <div className="lg:col-span-1 bg-dungeon-800 rounded-lg p-4">
                        <input
                            type="text"
                            placeholder="Buscar raza..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 mb-4 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-400"
                        />
                        <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                            {isLoading ? (
                                <div className="text-center py-4 text-dungeon-400">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                                    Cargando razas...
                                </div>
                            ) : filteredRaces.map((r) => (
                                <div
                                    key={r.id}
                                    onClick={() => {
                                        setSelectedRace(r);
                                        setIsEditing(false);
                                        setIsCreating(false);
                                    }}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedRace?.id === r.id
                                        ? 'bg-gold-900/30 border border-gold-400'
                                        : 'bg-dungeon-700 hover:bg-dungeon-600'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold text-gold-300">
                                                {r.name}
                                            </div>
                                            <div className="text-sm text-dungeon-400">
                                                {r.slug}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedRace(r);
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

                    {/* Race Editor */}
                    {selectedRace && (
                        <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gold-400">
                                    {isCreating ? 'Crear Nueva Raza' : `Editar: ${selectedRace.name}`}
                                </h2>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setIsCreating(false);
                                                if (isCreating) setSelectedRace(null);
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
                                                    setSelectedRace({ ...selectedRace, name: e.target.value })
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
                                                    setSelectedRace({ ...selectedRace, slug: e.target.value })
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
                                                    onChange={(e) => setSelectedRace({ ...selectedRace, size: e.target.value })}
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
                                                    onChange={(e) => setSelectedRace({ ...selectedRace, base_speed: parseInt(e.target.value) })}
                                                    disabled={!isEditing}
                                                    className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <ImageUpload
                                            imageUrl={selectedRace.image_url}
                                            onImageChange={(url) => setSelectedRace({ ...selectedRace, image_url: url })}
                                            disabled={!isEditing}
                                            itemName={selectedRace.name}
                                            itemSlug={selectedRace.slug}
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
                                            onChange={(e) => setSelectedRace({ ...selectedRace, favored_class: e.target.value })}
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
                                            onChange={(e) => setSelectedRace({ ...selectedRace, level_adjustment: parseInt(e.target.value) })}
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
                                        onChange={(items) => setSelectedRace({ ...selectedRace, automatic_languages: items })}
                                        placeholder="Ej: Común, Élfico..."
                                    />
                                    <ProficienciesEditor
                                        title="Idiomas Adicionales"
                                        items={selectedRace.bonus_languages || []}
                                        onChange={(items) => setSelectedRace({ ...selectedRace, bonus_languages: items })}
                                        placeholder="Ej: Dracónico, Orco..."
                                    />
                                    <ProficienciesEditor
                                        title="Rasgos Raciales (Lista simple)"
                                        items={selectedRace.racial_traits || []}
                                        onChange={(items) => setSelectedRace({ ...selectedRace, racial_traits: items })}
                                        placeholder="Ej: Visión en la penumbra..."
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                        Descripción Completa
                                    </label>
                                    <RichTextEditor
                                        value={selectedRace.description || ''}
                                        onChange={(value) => setSelectedRace({ ...selectedRace, description: value })}
                                        disabled={!isEditing}
                                        height="300px"
                                    />
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
