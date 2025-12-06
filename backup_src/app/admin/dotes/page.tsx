'use client';

import { useState, useEffect } from 'react';
import { RichTextEditor } from '@/components/RichTextEditor';
import { ArrowLeft, Save, Pencil, Loader2, CheckCircle2, AlertCircle, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { ProficienciesEditor } from '@/components/admin/ProficienciesEditor';

interface FeatData {
    id: string;
    slug: string;
    name: string;
    category: string;
    benefit: string;
    normal?: string;
    special?: string;
    prerequisites_legacy?: string;
    source_book?: string;
    source_page?: number;
    is_metamagic?: boolean;
    is_item_creation?: boolean;
    can_take_multiple?: boolean;
    prerequisite_feats?: string[];
    prerequisite_bab?: number;
}

export default function FeatsAdminPage() {
    const [feats, setFeats] = useState<FeatData[]>([]);
    const [selectedFeat, setSelectedFeat] = useState<FeatData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
    const [syncMessage, setSyncMessage] = useState('');

    const supabase = createClient();

    useEffect(() => {
        loadFeats();
    }, []);

    const loadFeats = async () => {
        setIsLoading(true);
        try {
            // Limit to 100 initially or implement pagination if too many
            const { data, error } = await supabase
                .from('feats')
                .select('*')
                .order('name');

            if (error) throw error;

            if (data) {
                setFeats(data);
            }
        } catch (error) {
            console.error('Error loading feats:', error);
            setSyncStatus('error');
            setSyncMessage('Error al cargar las dotes');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNew = () => {
        const newFeat: FeatData = {
            id: 'new',
            slug: '',
            name: '',
            category: 'General',
            benefit: '',
            prerequisites_legacy: '',
            is_metamagic: false,
            is_item_creation: false,
            can_take_multiple: false,
            prerequisite_feats: []
        };
        setSelectedFeat(newFeat);
        setIsCreating(true);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!selectedFeat) return;

        if (!selectedFeat.name) {
            setSyncStatus('error');
            setSyncMessage('El nombre es obligatorio');
            return;
        }

        setSyncStatus('syncing');
        setSyncMessage('Guardando en Supabase...');

        try {
            const slug = selectedFeat.slug || selectedFeat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            const featDataToSave = {
                slug,
                name: selectedFeat.name,
                category: selectedFeat.category,
                benefit: selectedFeat.benefit,
                normal: selectedFeat.normal,
                special: selectedFeat.special,
                prerequisites_legacy: selectedFeat.prerequisites_legacy,
                source_book: selectedFeat.source_book,
                source_page: selectedFeat.source_page,
                is_metamagic: selectedFeat.is_metamagic,
                is_item_creation: selectedFeat.is_item_creation,
                can_take_multiple: selectedFeat.can_take_multiple,
                prerequisite_feats: selectedFeat.prerequisite_feats,
                prerequisite_bab: selectedFeat.prerequisite_bab
            };

            if (isCreating) {
                const { error } = await supabase
                    .from('feats')
                    .insert(featDataToSave);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('feats')
                    .update(featDataToSave)
                    .eq('id', selectedFeat.id);
                if (error) throw error;
            }

            await loadFeats();

            setSyncStatus('success');
            setSyncMessage('Guardado correctamente');
            setIsEditing(false);
            setIsCreating(false);
            setTimeout(() => setSyncStatus('idle'), 3000);
        } catch (err: any) {
            console.error('Error saving feat:', err);
            setSyncStatus('error');
            setSyncMessage(`Error: ${err.message}`);
            setTimeout(() => setSyncStatus('idle'), 3000);
        }
    };

    const filteredFeats = feats.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.slug.toLowerCase().includes(searchTerm.toLowerCase())
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
                            Editor de Dotes
                        </h1>
                        <p className="text-dungeon-300">
                            Total: {feats.length} dotes
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
                        Nueva Dote
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Feat List */}
                    <div className="lg:col-span-1 bg-dungeon-800 rounded-lg p-4 flex flex-col h-[calc(100vh-200px)]">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dungeon-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Buscar dote..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-400"
                            />
                        </div>
                        <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                            {isLoading ? (
                                <div className="text-center py-4 text-dungeon-400">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                                    Cargando dotes...
                                </div>
                            ) : filteredFeats.map((f) => (
                                <div
                                    key={f.id}
                                    onClick={() => {
                                        setSelectedFeat(f);
                                        setIsEditing(false);
                                        setIsCreating(false);
                                    }}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedFeat?.id === f.id
                                            ? 'bg-gold-900/30 border border-gold-400'
                                            : 'bg-dungeon-700 hover:bg-dungeon-600'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold text-gold-300">
                                                {f.name}
                                            </div>
                                            <div className="text-xs text-dungeon-400">
                                                {f.category}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedFeat(f);
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

                    {/* Feat Editor */}
                    {selectedFeat && (
                        <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6 overflow-y-auto h-[calc(100vh-200px)] custom-scrollbar">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gold-400">
                                    {isCreating ? 'Crear Nueva Dote' : `Editar: ${selectedFeat.name}`}
                                </h2>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setIsCreating(false);
                                                if (isCreating) setSelectedFeat(null);
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
                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedFeat.name}
                                            onChange={(e) =>
                                                setSelectedFeat({ ...selectedFeat, name: e.target.value })
                                            }
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Categoría
                                        </label>
                                        <select
                                            value={selectedFeat.category || 'General'}
                                            onChange={(e) => setSelectedFeat({ ...selectedFeat, category: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        >
                                            <option value="General">General</option>
                                            <option value="Combat">Combate</option>
                                            <option value="Item Creation">Creación de Objetos</option>
                                            <option value="Metamagic">Metamagia</option>
                                            <option value="Racial">Racial</option>
                                            <option value="Regional">Regional</option>
                                            <option value="Divine">Divino</option>
                                            <option value="Wild">Salvaje</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Flags */}
                                <div className="flex flex-wrap gap-4 p-4 bg-dungeon-900/30 rounded-lg border border-dungeon-700">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedFeat.is_metamagic || false}
                                            onChange={(e) => setSelectedFeat({ ...selectedFeat, is_metamagic: e.target.checked })}
                                            disabled={!isEditing}
                                            className="w-4 h-4 rounded border-dungeon-600 text-gold-600 focus:ring-gold-500 bg-dungeon-700"
                                        />
                                        <span className="text-dungeon-200">Es Metamagia</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedFeat.is_item_creation || false}
                                            onChange={(e) => setSelectedFeat({ ...selectedFeat, is_item_creation: e.target.checked })}
                                            disabled={!isEditing}
                                            className="w-4 h-4 rounded border-dungeon-600 text-gold-600 focus:ring-gold-500 bg-dungeon-700"
                                        />
                                        <span className="text-dungeon-200">Es Creación de Objetos</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedFeat.can_take_multiple || false}
                                            onChange={(e) => setSelectedFeat({ ...selectedFeat, can_take_multiple: e.target.checked })}
                                            disabled={!isEditing}
                                            className="w-4 h-4 rounded border-dungeon-600 text-gold-600 focus:ring-gold-500 bg-dungeon-700"
                                        />
                                        <span className="text-dungeon-200">Se puede tomar múltiples veces</span>
                                    </label>
                                </div>

                                {/* Prerequisites */}
                                <div>
                                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                        Prerrequisitos (Texto)
                                    </label>
                                    <input
                                        type="text"
                                        value={selectedFeat.prerequisites_legacy || ''}
                                        onChange={(e) => setSelectedFeat({ ...selectedFeat, prerequisites_legacy: e.target.value })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <ProficienciesEditor
                                        title="Dotes Prerrequisito"
                                        items={selectedFeat.prerequisite_feats || []}
                                        onChange={(items) => setSelectedFeat({ ...selectedFeat, prerequisite_feats: items })}
                                        placeholder="Ej: Ataque Poderoso..."
                                    />
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            BAB Requerido
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedFeat.prerequisite_bab || 0}
                                            onChange={(e) => setSelectedFeat({ ...selectedFeat, prerequisite_bab: parseInt(e.target.value) })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                </div>

                                {/* Descriptions */}
                                <div>
                                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                        Beneficio
                                    </label>
                                    <RichTextEditor
                                        value={selectedFeat.benefit || ''}
                                        onChange={(value) => setSelectedFeat({ ...selectedFeat, benefit: value })}
                                        disabled={!isEditing}
                                        height="200px"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                        Normal (Sin la dote)
                                    </label>
                                    <RichTextEditor
                                        value={selectedFeat.normal || ''}
                                        onChange={(value) => setSelectedFeat({ ...selectedFeat, normal: value })}
                                        disabled={!isEditing}
                                        height="100px"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                        Especial
                                    </label>
                                    <RichTextEditor
                                        value={selectedFeat.special || ''}
                                        onChange={(value) => setSelectedFeat({ ...selectedFeat, special: value })}
                                        disabled={!isEditing}
                                        height="100px"
                                    />
                                </div>

                                {/* Source */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Libro Fuente
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedFeat.source_book || ''}
                                            onChange={(e) => setSelectedFeat({ ...selectedFeat, source_book: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Página
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedFeat.source_page || 0}
                                            onChange={(e) => setSelectedFeat({ ...selectedFeat, source_page: parseInt(e.target.value) })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
