'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, Save, Pencil, Loader2, CheckCircle2, AlertCircle, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  POTION_TYPES,
  DEFAULT_POTION_TEMPLATE,
  ERROR_MESSAGES,
  UI_TEXT,
  BASIC_FIELDS,
  EFFECT_FIELDS,
  SOURCE_FIELDS
} from '@/lib/data/potions-config';

// Lazy-load heavy editor (only needed when editing)
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor').then(mod => ({ default: mod.RichTextEditor })), {
  loading: () => <div className="h-64 bg-dungeon-800 rounded animate-pulse" />
});

interface PotionData {
    id: string;
    slug: string;
    name: string;
    potion_type?: string;
    spell_effect?: string;
    caster_level?: number;
    price_gold?: number;
    description?: string;
    source_book?: string;
    source_page?: number;
}

export default function PotionsAdminPage() {
    const [potions, setPotions] = useState<PotionData[]>([]);
    const [selectedPotion, setSelectedPotion] = useState<PotionData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
    const [syncMessage, setSyncMessage] = useState('');

    const supabase = createClient();

    useEffect(() => {
        loadPotions();
    }, []);

    const loadPotions = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('potions')
                .select('*')
                .order('name')
                .limit(100);

            if (error) throw error;
            if (data) setPotions(data);
        } catch (error) {
            console.error('Error loading potions:', error);
            setSyncStatus('error');
            setSyncMessage(ERROR_MESSAGES.loadError);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (term: string) => {
        setSearchTerm(term);
        if (term.length < 3) {
            loadPotions();
            return;
        }

        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('potions')
                .select('*')
                .ilike('name', `%${term}%`)
                .order('name')
                .limit(50);

            if (error) throw error;
            if (data) setPotions(data);
        } catch (error) {
            console.error('Error searching potions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNew = () => {
        const newPotion: PotionData = { ...DEFAULT_POTION_TEMPLATE };
        setSelectedPotion(newPotion);
        setIsCreating(true);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!selectedPotion) return;

        if (!selectedPotion.name) {
            setSyncStatus('error');
            setSyncMessage(ERROR_MESSAGES.nameRequired);
            return;
        }

        setSyncStatus('syncing');
        setSyncMessage(ERROR_MESSAGES.savingStatus);

        try {
            const slug = selectedPotion.slug || selectedPotion.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            const potionDataToSave = {
                slug,
                name: selectedPotion.name,
                potion_type: selectedPotion.potion_type,
                spell_effect: selectedPotion.spell_effect,
                caster_level: selectedPotion.caster_level,
                price_gold: selectedPotion.price_gold,
                description: selectedPotion.description,
                source_book: selectedPotion.source_book,
                source_page: selectedPotion.source_page
            };

            if (isCreating) {
                const { error } = await supabase
                    .from('potions')
                    .insert(potionDataToSave);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('potions')
                    .update(potionDataToSave)
                    .eq('id', selectedPotion.id);
                if (error) throw error;
            }

            if (searchTerm) {
                await handleSearch(searchTerm);
            } else {
                await loadPotions();
            }

            setSyncStatus('success');
            setSyncMessage(ERROR_MESSAGES.saveSuccess);
            setIsEditing(false);
            setIsCreating(false);
            setTimeout(() => setSyncStatus('idle'), 3000);
        } catch (err: any) {
            console.error('Error saving potion:', err);
            setSyncStatus('error');
            setSyncMessage(`${ERROR_MESSAGES.saveError}: ${err.message}`);
            setTimeout(() => setSyncStatus('idle'), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-dungeon-900 via-dungeon-800 to-dungeon-900">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/objetos" className="p-2 rounded-lg bg-dungeon-700 hover:bg-dungeon-600 transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gold-400" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gold-400 mb-2">{UI_TEXT.pageTitle}</h1>
                        <p className="text-dungeon-300">{UI_TEXT.totalItems}: {potions.length} pociones</p>
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
                        {UI_TEXT.newItemButton}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 bg-dungeon-800 rounded-lg p-4 flex flex-col h-[calc(100vh-200px)]">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dungeon-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder={UI_TEXT.searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-400"
                            />
                        </div>
                        <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                            {isLoading ? (
                                <div className="text-center py-4 text-dungeon-400">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                                    {UI_TEXT.loadingMessage}
                                </div>
                            ) : potions.map((potion) => (
                                <div
                                    key={potion.id}
                                    onClick={() => {
                                        setSelectedPotion(potion);
                                        setIsEditing(false);
                                        setIsCreating(false);
                                    }}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedPotion?.id === potion.id
                                            ? 'bg-gold-900/30 border border-gold-400'
                                            : 'bg-dungeon-700 hover:bg-dungeon-600'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold text-gold-300">{potion.name}</div>
                                            <div className="text-xs text-dungeon-400">
                                                {potion.potion_type || UI_TEXT.noType} • NC {potion.caster_level || 1}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedPotion(potion);
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

                    {selectedPotion && (
                        <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6 overflow-y-auto h-[calc(100vh-200px)] custom-scrollbar">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gold-400">
                                    {isCreating ? UI_TEXT.createTitle : `${UI_TEXT.editTitle}: ${selectedPotion.name}`}
                                </h2>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setIsCreating(false);
                                                if (isCreating) setSelectedPotion(null);
                                            }}
                                            className="px-4 py-2 bg-dungeon-700 hover:bg-dungeon-600 rounded-lg transition-colors"
                                        >
                                            {UI_TEXT.cancelButton}
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={syncStatus === 'syncing'}
                                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {syncStatus === 'syncing' ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    {UI_TEXT.savingButton}
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="h-4 w-4" />
                                                    {UI_TEXT.saveButton}
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
                                        {UI_TEXT.editButton}
                                    </button>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">{BASIC_FIELDS.nameLabel}</label>
                                        <input
                                            type="text"
                                            value={selectedPotion.name}
                                            onChange={(e) => setSelectedPotion({ ...selectedPotion, name: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">{BASIC_FIELDS.typeLabel}</label>
                                        <select
                                            value={selectedPotion.potion_type || 'Poción'}
                                            onChange={(e) => setSelectedPotion({ ...selectedPotion, potion_type: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        >
                                            {POTION_TYPES.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">{EFFECT_FIELDS.spellEffectLabel}</label>
                                        <input
                                            type="text"
                                            value={selectedPotion.spell_effect || ''}
                                            onChange={(e) => setSelectedPotion({ ...selectedPotion, spell_effect: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder={EFFECT_FIELDS.spellEffectPlaceholder}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">{EFFECT_FIELDS.casterLevelLabel}</label>
                                        <input
                                            type="number"
                                            value={selectedPotion.caster_level || 1}
                                            onChange={(e) => setSelectedPotion({ ...selectedPotion, caster_level: parseInt(e.target.value) || 1 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">{EFFECT_FIELDS.priceLabel}</label>
                                        <input
                                            type="number"
                                            value={selectedPotion.price_gold || 0}
                                            onChange={(e) => setSelectedPotion({ ...selectedPotion, price_gold: parseFloat(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">{SOURCE_FIELDS.descriptionLabel}</label>
                                    <RichTextEditor
                                        value={selectedPotion.description || ''}
                                        onChange={(value) => setSelectedPotion({ ...selectedPotion, description: value })}
                                        disabled={!isEditing}
                                        height="300px"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">{SOURCE_FIELDS.sourceBookLabel}</label>
                                        <input
                                            type="text"
                                            value={selectedPotion.source_book || ''}
                                            onChange={(e) => setSelectedPotion({ ...selectedPotion, source_book: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">{SOURCE_FIELDS.sourcePageLabel}</label>
                                        <input
                                            type="number"
                                            value={selectedPotion.source_page || ''}
                                            onChange={(e) => setSelectedPotion({ ...selectedPotion, source_page: parseInt(e.target.value) || undefined })}
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
