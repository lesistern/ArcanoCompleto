'use client';

import { useState, useEffect } from 'react';
import { RichTextEditor } from '@/components/RichTextEditor';
import { ArrowLeft, Save, Pencil, Loader2, CheckCircle2, AlertCircle, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { ProficienciesEditor } from '@/components/admin/ProficienciesEditor';
import { ImageUpload } from '@/components/admin/ImageUpload';

interface WeaponData {
    id: string;
    slug: string;
    name: string;
    description?: string;
    weapon_type?: string;
    category?: string;
    size?: string;
    damage_small?: string;
    damage_medium?: string;
    damage_large?: string;
    critical?: string;
    damage_type?: string[];
    range_increment?: number;
    weight?: number;
    cost_gold?: number;
    cost_silver?: number;
    properties?: string[];
    special?: string;
    source_book?: string;
    source_page?: number;
    image_url?: string;
}

export default function WeaponsAdminPage() {
    const [weapons, setWeapons] = useState<WeaponData[]>([]);
    const [selectedWeapon, setSelectedWeapon] = useState<WeaponData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
    const [syncMessage, setSyncMessage] = useState('');

    const supabase = createClient();

    useEffect(() => {
        loadWeapons();
    }, []);

    const loadWeapons = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('items')
                .select('*')
                .eq('category', 'Arma')
                .order('name')
                .limit(100);

            if (error) throw error;

            if (data) {
                setWeapons(data);
            }
        } catch (error) {
            console.error('Error loading weapons:', error);
            setSyncStatus('error');
            setSyncMessage('Error al cargar las armas');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (term: string) => {
        setSearchTerm(term);
        if (term.length < 3) {
            loadWeapons();
            return;
        }

        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('items')
                .select('*')
                .eq('category', 'Arma')
                .ilike('name', `%${term}%`)
                .order('name')
                .limit(50);

            if (error) throw error;
            if (data) setWeapons(data);
        } catch (error) {
            console.error('Error searching weapons:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNew = () => {
        const newWeapon: WeaponData = {
            id: 'new',
            slug: '',
            name: '',
            category: 'Arma',
            weapon_type: 'Cuerpo a cuerpo',
            size: 'Mediano',
            critical: '20/x2',
            damage_type: [],
            properties: []
        };
        setSelectedWeapon(newWeapon);
        setIsCreating(true);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!selectedWeapon) return;

        if (!selectedWeapon.name) {
            setSyncStatus('error');
            setSyncMessage('El nombre es obligatorio');
            return;
        }

        setSyncStatus('syncing');
        setSyncMessage('Guardando en Supabase...');

        try {
            const slug = selectedWeapon.slug || selectedWeapon.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            const weaponDataToSave = {
                slug,
                name: selectedWeapon.name,
                short_description: selectedWeapon.description,
                description: selectedWeapon.description,
                category: 'Arma',
                weapon_type: selectedWeapon.weapon_type,
                size: selectedWeapon.size,
                damage_small: selectedWeapon.damage_small,
                damage_medium: selectedWeapon.damage_medium,
                damage_large: selectedWeapon.damage_large,
                critical: selectedWeapon.critical,
                damage_type: selectedWeapon.damage_type,
                range_increment: selectedWeapon.range_increment,
                weight: selectedWeapon.weight,
                cost_gold: selectedWeapon.cost_gold,
                cost_silver: selectedWeapon.cost_silver,
                properties: selectedWeapon.properties,
                special: selectedWeapon.special,
                source_book: selectedWeapon.source_book,
                source_page: selectedWeapon.source_page,
                image_url: selectedWeapon.image_url,
                is_magic: false
            };

            if (isCreating) {
                const { error } = await supabase
                    .from('items')
                    .insert(weaponDataToSave);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('items')
                    .update(weaponDataToSave)
                    .eq('id', selectedWeapon.id);
                if (error) throw error;
            }

            if (searchTerm) {
                await handleSearch(searchTerm);
            } else {
                await loadWeapons();
            }

            setSyncStatus('success');
            setSyncMessage('Guardado correctamente');
            setIsEditing(false);
            setIsCreating(false);
            setTimeout(() => setSyncStatus('idle'), 3000);
        } catch (err: any) {
            console.error('Error saving weapon:', err);
            setSyncStatus('error');
            setSyncMessage(`Error: ${err.message}`);
            setTimeout(() => setSyncStatus('idle'), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-dungeon-900 via-dungeon-800 to-dungeon-900">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/admin/objetos"
                        className="p-2 rounded-lg bg-dungeon-700 hover:bg-dungeon-600 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gold-400" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gold-400 mb-2">
                            Editor de Armas
                        </h1>
                        <p className="text-dungeon-300">
                            Total: {weapons.length} armas
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
                        Nueva Arma
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 bg-dungeon-800 rounded-lg p-4 flex flex-col h-[calc(100vh-200px)]">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dungeon-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Buscar arma..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-400"
                            />
                        </div>
                        <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                            {isLoading ? (
                                <div className="text-center py-4 text-dungeon-400">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                                    Cargando...
                                </div>
                            ) : weapons.map((weapon) => (
                                <div
                                    key={weapon.id}
                                    onClick={() => {
                                        setSelectedWeapon(weapon);
                                        setIsEditing(false);
                                        setIsCreating(false);
                                    }}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedWeapon?.id === weapon.id
                                            ? 'bg-gold-900/30 border border-gold-400'
                                            : 'bg-dungeon-700 hover:bg-dungeon-600'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold text-gold-300">
                                                {weapon.name}
                                            </div>
                                            <div className="text-xs text-dungeon-400">
                                                {weapon.weapon_type || 'Sin tipo'} • {weapon.damage_medium || 'Sin daño'}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedWeapon(weapon);
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

                    {selectedWeapon && (
                        <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6 overflow-y-auto h-[calc(100vh-200px)] custom-scrollbar">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gold-400">
                                    {isCreating ? 'Crear Nueva Arma' : `Editar: ${selectedWeapon.name}`}
                                </h2>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setIsCreating(false);
                                                if (isCreating) setSelectedWeapon(null);
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

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                                Nombre
                                            </label>
                                            <input
                                                type="text"
                                                value={selectedWeapon.name}
                                                onChange={(e) =>
                                                    setSelectedWeapon({ ...selectedWeapon, name: e.target.value })
                                                }
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                                Tipo de Arma
                                            </label>
                                            <select
                                                value={selectedWeapon.weapon_type || 'Cuerpo a cuerpo'}
                                                onChange={(e) => setSelectedWeapon({ ...selectedWeapon, weapon_type: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                            >
                                                <option value="Cuerpo a cuerpo">Cuerpo a cuerpo</option>
                                                <option value="A distancia">A distancia</option>
                                                <option value="Exótica">Exótica</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                                Tamaño
                                            </label>
                                            <select
                                                value={selectedWeapon.size || 'Mediano'}
                                                onChange={(e) => setSelectedWeapon({ ...selectedWeapon, size: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                            >
                                                <option value="Diminuto">Diminuto</option>
                                                <option value="Pequeño">Pequeño</option>
                                                <option value="Mediano">Mediano</option>
                                                <option value="Grande">Grande</option>
                                                <option value="Enorme">Enorme</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <ImageUpload
                                            imageUrl={selectedWeapon.image_url}
                                            onImageChange={(url) => setSelectedWeapon({ ...selectedWeapon, image_url: url })}
                                            disabled={!isEditing}
                                            itemName={selectedWeapon.name}
                                            itemSlug={selectedWeapon.slug}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Daño (Pequeño)
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedWeapon.damage_small || ''}
                                            onChange={(e) => setSelectedWeapon({ ...selectedWeapon, damage_small: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="1d4"
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Daño (Mediano)
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedWeapon.damage_medium || ''}
                                            onChange={(e) => setSelectedWeapon({ ...selectedWeapon, damage_medium: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="1d6"
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Daño (Grande)
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedWeapon.damage_large || ''}
                                            onChange={(e) => setSelectedWeapon({ ...selectedWeapon, damage_large: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="1d8"
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Crítico
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedWeapon.critical || ''}
                                            onChange={(e) => setSelectedWeapon({ ...selectedWeapon, critical: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="20/x2"
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Alcance (pies)
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedWeapon.range_increment || ''}
                                            onChange={(e) => setSelectedWeapon({ ...selectedWeapon, range_increment: parseInt(e.target.value) || undefined })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Peso (lb)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={selectedWeapon.weight || ''}
                                            onChange={(e) => setSelectedWeapon({ ...selectedWeapon, weight: parseFloat(e.target.value) || undefined })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Coste (oro)
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedWeapon.cost_gold || ''}
                                            onChange={(e) => setSelectedWeapon({ ...selectedWeapon, cost_gold: parseFloat(e.target.value) || undefined })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 p-4 bg-dungeon-900/30 rounded-lg border border-dungeon-700">
                                    <ProficienciesEditor
                                        title="Tipos de Daño"
                                        items={selectedWeapon.damage_type || []}
                                        onChange={(items) => setSelectedWeapon({ ...selectedWeapon, damage_type: items })}
                                        placeholder="Ej: Cortante, Perforante, Contundente..."
                                    />
                                    <ProficienciesEditor
                                        title="Propiedades"
                                        items={selectedWeapon.properties || []}
                                        onChange={(items) => setSelectedWeapon({ ...selectedWeapon, properties: items })}
                                        placeholder="Ej: Ligera, Versátil, Alcance..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                        Descripción
                                    </label>
                                    <RichTextEditor
                                        value={selectedWeapon.description || ''}
                                        onChange={(value) => setSelectedWeapon({ ...selectedWeapon, description: value })}
                                        disabled={!isEditing}
                                        height="200px"
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
