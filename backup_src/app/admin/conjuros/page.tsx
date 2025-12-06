'use client';

import { useState, useEffect } from 'react';
import { RichTextEditor } from '@/components/RichTextEditor';
import { ArrowLeft, Save, Pencil, Loader2, CheckCircle2, AlertCircle, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface SpellData {
    id: string;
    slug: string;
    name: string;
    school: string;
    subschool?: string;
    descriptors?: string;
    level: string;
    components: string;
    casting_time: string;
    range: string;
    target?: string;
    area?: string;
    effect?: string;
    duration: string;
    saving_throw?: string;
    spell_resistance?: string;
    description: string;
    source_book?: string;
    source_page?: number;
    component_verbal?: boolean;
    component_somatic?: boolean;
    component_material?: boolean;
    component_focus?: boolean;
    component_divine_focus?: boolean;
    component_xp?: boolean;
}

export default function SpellsAdminPage() {
    const [spells, setSpells] = useState<SpellData[]>([]);
    const [selectedSpell, setSelectedSpell] = useState<SpellData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
    const [syncMessage, setSyncMessage] = useState('');

    const supabase = createClient();

    useEffect(() => {
        loadSpells();
    }, []);

    const loadSpells = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('spells')
                .select('*')
                .order('name')
                .limit(100);

            if (error) throw error;

            if (data) {
                setSpells(data);
            }
        } catch (error) {
            console.error('Error loading spells:', error);
            setSyncStatus('error');
            setSyncMessage('Error al cargar los conjuros');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (term: string) => {
        setSearchTerm(term);
        if (term.length < 3) return;

        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('spells')
                .select('*')
                .ilike('name', `%${term}%`)
                .order('name')
                .limit(50);

            if (error) throw error;
            if (data) setSpells(data);
        } catch (error) {
            console.error('Error searching spells:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNew = () => {
        const newSpell: SpellData = {
            id: 'new',
            slug: '',
            name: '',
            school: 'Universal',
            level: 'Hechicero/Mago 1',
            components: 'V, S',
            casting_time: '1 acción estándar',
            range: 'Cercano (25 pies + 5 pies/2 niveles)',
            duration: 'Instantáneo',
            description: '',
            component_verbal: true,
            component_somatic: true
        };
        setSelectedSpell(newSpell);
        setIsCreating(true);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!selectedSpell) return;

        if (!selectedSpell.name) {
            setSyncStatus('error');
            setSyncMessage('El nombre es obligatorio');
            return;
        }

        setSyncStatus('syncing');
        setSyncMessage('Guardando en Supabase...');

        try {
            const slug = selectedSpell.slug || selectedSpell.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            const spellDataToSave = {
                slug,
                name: selectedSpell.name,
                school: selectedSpell.school,
                subschool: selectedSpell.subschool,
                descriptors: selectedSpell.descriptors,
                level: selectedSpell.level,
                components: selectedSpell.components,
                casting_time: selectedSpell.casting_time,
                range: selectedSpell.range,
                target: selectedSpell.target,
                area: selectedSpell.area,
                effect: selectedSpell.effect,
                duration: selectedSpell.duration,
                saving_throw: selectedSpell.saving_throw,
                spell_resistance: selectedSpell.spell_resistance,
                description: selectedSpell.description,
                source_book: selectedSpell.source_book,
                source_page: selectedSpell.source_page,
                component_verbal: selectedSpell.component_verbal,
                component_somatic: selectedSpell.component_somatic,
                component_material: selectedSpell.component_material,
                component_focus: selectedSpell.component_focus,
                component_divine_focus: selectedSpell.component_divine_focus,
                component_xp: selectedSpell.component_xp
            };

            if (isCreating) {
                const { error } = await supabase
                    .from('spells')
                    .insert(spellDataToSave);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('spells')
                    .update(spellDataToSave)
                    .eq('id', selectedSpell.id);
                if (error) throw error;
            }

            if (searchTerm) {
                await handleSearch(searchTerm);
            } else {
                await loadSpells();
            }

            setSyncStatus('success');
            setSyncMessage('Guardado correctamente');
            setIsEditing(false);
            setIsCreating(false);
            setTimeout(() => setSyncStatus('idle'), 3000);
        } catch (err: any) {
            console.error('Error saving spell:', err);
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
                        href="/admin"
                        className="p-2 rounded-lg bg-dungeon-700 hover:bg-dungeon-600 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gold-400" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gold-400 mb-2">
                            Editor de Conjuros
                        </h1>
                        <p className="text-dungeon-300">
                            Gestión de la base de datos de magia
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
                        Nuevo Conjuro
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 bg-dungeon-800 rounded-lg p-4 flex flex-col h-[calc(100vh-200px)]">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dungeon-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Buscar conjuro (min 3 letras)..."
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
                            ) : spells.map((s) => (
                                <div
                                    key={s.id}
                                    onClick={() => {
                                        setSelectedSpell(s);
                                        setIsEditing(false);
                                        setIsCreating(false);
                                    }}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedSpell?.id === s.id
                                            ? 'bg-gold-900/30 border border-gold-400'
                                            : 'bg-dungeon-700 hover:bg-dungeon-600'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold text-gold-300">
                                                {s.name}
                                            </div>
                                            <div className="text-xs text-dungeon-400">
                                                {s.school} • {s.level ? s.level.split(',')[0] : 'Sin nivel'}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedSpell(s);
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

                    {selectedSpell && (
                        <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6 overflow-y-auto h-[calc(100vh-200px)] custom-scrollbar">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gold-400">
                                    {isCreating ? 'Crear Nuevo Conjuro' : `Editar: ${selectedSpell.name}`}
                                </h2>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setIsCreating(false);
                                                if (isCreating) setSelectedSpell(null);
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
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSpell.name}
                                            onChange={(e) => setSelectedSpell({ ...selectedSpell, name: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Escuela
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSpell.school}
                                            onChange={(e) => setSelectedSpell({ ...selectedSpell, school: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Subescuela
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSpell.subschool || ''}
                                            onChange={(e) => setSelectedSpell({ ...selectedSpell, subschool: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Descriptores
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSpell.descriptors || ''}
                                            onChange={(e) => setSelectedSpell({ ...selectedSpell, descriptors: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Ej: Fuego, Mente..."
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                        Nivel (Clase Nivel, ...)
                                    </label>
                                    <input
                                        type="text"
                                        value={selectedSpell.level}
                                        onChange={(e) => setSelectedSpell({ ...selectedSpell, level: e.target.value })}
                                        disabled={!isEditing}
                                        placeholder="Ej: Hechicero/Mago 3, Clérigo 3"
                                        className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                    />
                                </div>

                                <div className="p-4 bg-dungeon-900/30 rounded-lg border border-dungeon-700">
                                    <h3 className="text-lg font-semibold text-gold-400 mb-4">Componentes</h3>
                                    <div className="flex flex-wrap gap-4 mb-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedSpell.component_verbal || false}
                                                onChange={(e) => setSelectedSpell({ ...selectedSpell, component_verbal: e.target.checked })}
                                                disabled={!isEditing}
                                                className="w-4 h-4 rounded border-dungeon-600 text-gold-600 focus:ring-gold-500 bg-dungeon-700"
                                            />
                                            <span className="text-dungeon-200">Verbal (V)</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedSpell.component_somatic || false}
                                                onChange={(e) => setSelectedSpell({ ...selectedSpell, component_somatic: e.target.checked })}
                                                disabled={!isEditing}
                                                className="w-4 h-4 rounded border-dungeon-600 text-gold-600 focus:ring-gold-500 bg-dungeon-700"
                                            />
                                            <span className="text-dungeon-200">Somático (S)</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedSpell.component_material || false}
                                                onChange={(e) => setSelectedSpell({ ...selectedSpell, component_material: e.target.checked })}
                                                disabled={!isEditing}
                                                className="w-4 h-4 rounded border-dungeon-600 text-gold-600 focus:ring-gold-500 bg-dungeon-700"
                                            />
                                            <span className="text-dungeon-200">Material (M)</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedSpell.component_focus || false}
                                                onChange={(e) => setSelectedSpell({ ...selectedSpell, component_focus: e.target.checked })}
                                                disabled={!isEditing}
                                                className="w-4 h-4 rounded border-dungeon-600 text-gold-600 focus:ring-gold-500 bg-dungeon-700"
                                            />
                                            <span className="text-dungeon-200">Foco (F)</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedSpell.component_divine_focus || false}
                                                onChange={(e) => setSelectedSpell({ ...selectedSpell, component_divine_focus: e.target.checked })}
                                                disabled={!isEditing}
                                                className="w-4 h-4 rounded border-dungeon-600 text-gold-600 focus:ring-gold-500 bg-dungeon-700"
                                            />
                                            <span className="text-dungeon-200">Foco Divino (FD)</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedSpell.component_xp || false}
                                                onChange={(e) => setSelectedSpell({ ...selectedSpell, component_xp: e.target.checked })}
                                                disabled={!isEditing}
                                                className="w-4 h-4 rounded border-dungeon-600 text-gold-600 focus:ring-gold-500 bg-dungeon-700"
                                            />
                                            <span className="text-dungeon-200">Coste de XP</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Componentes (texto)
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSpell.components}
                                            onChange={(e) => setSelectedSpell({ ...selectedSpell, components: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Ej: V, S, M (polvo de diamante)"
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Tiempo de Lanzamiento
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSpell.casting_time}
                                            onChange={(e) => setSelectedSpell({ ...selectedSpell, casting_time: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Alcance
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSpell.range}
                                            onChange={(e) => setSelectedSpell({ ...selectedSpell, range: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Objetivo / Área / Efecto
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSpell.target || selectedSpell.area || selectedSpell.effect || ''}
                                            onChange={(e) => setSelectedSpell({ ...selectedSpell, target: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Objetivo, Área o Efecto"
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Duración
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSpell.duration}
                                            onChange={(e) => setSelectedSpell({ ...selectedSpell, duration: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Tiro de Salvación
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSpell.saving_throw || ''}
                                            onChange={(e) => setSelectedSpell({ ...selectedSpell, saving_throw: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Resistencia a Conjuros
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSpell.spell_resistance || ''}
                                            onChange={(e) => setSelectedSpell({ ...selectedSpell, spell_resistance: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                        Descripción
                                    </label>
                                    <RichTextEditor
                                        value={selectedSpell.description || ''}
                                        onChange={(value) => setSelectedSpell({ ...selectedSpell, description: value })}
                                        disabled={!isEditing}
                                        height="300px"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Libro Fuente
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSpell.source_book || ''}
                                            onChange={(e) => setSelectedSpell({ ...selectedSpell, source_book: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Ej: Player's Handbook"
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            Página
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedSpell.source_page || ''}
                                            onChange={(e) => setSelectedSpell({ ...selectedSpell, source_page: parseInt(e.target.value) || undefined })}
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
