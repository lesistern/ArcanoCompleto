'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, Save, Pencil, Loader2, CheckCircle2, AlertCircle, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { ImageUpload } from '@/components/admin/ImageUpload';
import {
  MAGIC_ITEM_TYPES,
  DEFAULT_MAGIC_ITEM_TEMPLATE,
  ERROR_MESSAGES,
  UI_TEXT,
  BASIC_FIELDS,
  STATS_FIELDS,
  DESCRIPTION_FIELDS
} from '@/lib/data/magical-items-config';

// Lazy-load heavy editor (only needed when editing)
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor').then(mod => ({ default: mod.RichTextEditor })), {
  loading: () => <div className="h-64 bg-gray-800 rounded animate-pulse" />
});

interface MagicItemData {
    id: string;
    slug: string;
    name: string;
    item_type?: string;
    item_slot?: string;
    caster_level?: number;
    aura?: string;
    price_gold?: number;
    weight_lb?: number;
    description?: string;
    construction_requirements?: string;
    construction_cost_gold?: number;
    source_book?: string;
    source_page?: number;
    image_url?: string;
}

export default function MagicItemsAdminPage() {
    const [items, setItems] = useState<MagicItemData[]>([]);
    const [selectedItem, setSelectedItem] = useState<MagicItemData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
    const [syncMessage, setSyncMessage] = useState('');

    const supabase = createClient();

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('magic_items')
                .select('*')
                .order('name')
                .limit(100);

            if (error) throw error;
            if (data) setItems(data);
        } catch (error) {
            console.error('Error loading magic items:', error);
            setSyncStatus('error');
            setSyncMessage(ERROR_MESSAGES.loadError);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (term: string) => {
        setSearchTerm(term);
        if (term.length < 3) {
            loadItems();
            return;
        }

        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('magic_items')
                .select('*')
                .ilike('name', `%${term}%`)
                .order('name')
                .limit(50);

            if (error) throw error;
            if (data) setItems(data);
        } catch (error) {
            console.error('Error searching magic items:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNew = () => {
        const newItem: MagicItemData = {
            ...DEFAULT_MAGIC_ITEM_TEMPLATE
        };
        setSelectedItem(newItem);
        setIsCreating(true);
        setIsEditing(true);
    };



    const handleSave = async () => {
        if (!selectedItem) return;

        if (!selectedItem.name) {
            setSyncStatus('error');
            setSyncMessage(ERROR_MESSAGES.nameRequired);
            return;
        }

        setSyncStatus('syncing');
        setSyncMessage(ERROR_MESSAGES.savingStatus);

        try {
            const slug = selectedItem.slug || selectedItem.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            const itemDataToSave = {
                slug,
                name: selectedItem.name,
                item_type: selectedItem.item_type,
                item_slot: selectedItem.item_slot,
                caster_level: selectedItem.caster_level,
                aura: selectedItem.aura,
                price_gold: selectedItem.price_gold,
                weight_lb: selectedItem.weight_lb,
                description: selectedItem.description,
                construction_requirements: selectedItem.construction_requirements,
                construction_cost_gold: selectedItem.construction_cost_gold,
                source_book: selectedItem.source_book,
                source_page: selectedItem.source_page,
                image_url: selectedItem.image_url
            };

            if (isCreating) {
                const { error } = await supabase
                    .from('magic_items')
                    .insert(itemDataToSave);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('magic_items')
                    .update(itemDataToSave)
                    .eq('id', selectedItem.id);
                if (error) throw error;
            }

            if (searchTerm) {
                await handleSearch(searchTerm);
            } else {
                await loadItems();
            }

            setSyncStatus('success');
            setSyncMessage(ERROR_MESSAGES.saveSuccess);
            setIsEditing(false);
            setIsCreating(false);
            setTimeout(() => setSyncStatus('idle'), 3000);
        } catch (err: any) {
            console.error('Error saving magic item:', err);
            setSyncStatus('error');
            setSyncMessage(`${ERROR_MESSAGES.saveError}: ${err.message}`);
            setTimeout(() => setSyncStatus('idle'), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/objetos" className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gold-400" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gold-400 mb-2">{UI_TEXT.pageTitle}</h1>
                        <p className="text-gray-300">{UI_TEXT.totalItems}: {items.length}</p>
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
                        className="px-4 py-2 bg-gold-600 hover:bg-gold-700 rounded-lg flex items-center gap-2 transition-colors font-bold text-gray-900"
                    >
                        <Plus className="h-5 w-5" />
                        {UI_TEXT.newItemButton}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 bg-gray-800 rounded-lg p-4 flex flex-col h-[calc(100vh-200px)]">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder={UI_TEXT.searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gold-400"
                            />
                        </div>
                        <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                            {isLoading ? (
                                <div className="text-center py-4 text-gray-400">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                                    {UI_TEXT.loadingMessage}
                                </div>
                            ) : items.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setIsEditing(false);
                                        setIsCreating(false);
                                    }}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedItem?.id === item.id
                                        ? 'bg-gold-900/30 border border-gold-400'
                                        : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold text-gold-300">{item.name}</div>
                                            <div className="text-xs text-gray-400">
                                                {item.item_type || 'Sin tipo'} • NC {item.caster_level || 0}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedItem(item);
                                                setIsEditing(true);
                                                setIsCreating(false);
                                            }}
                                            className="p-1 hover:bg-gray-600 rounded"
                                        >
                                            <Pencil className="h-4 w-4 text-gold-400" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedItem && (
                        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 overflow-y-auto h-[calc(100vh-200px)] custom-scrollbar">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gold-400">
                                    {isCreating ? UI_TEXT.createTitle : `${UI_TEXT.editTitle}: ${selectedItem.name}`}
                                </h2>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setIsCreating(false);
                                                if (isCreating) setSelectedItem(null);
                                            }}
                                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
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
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">{BASIC_FIELDS.nameLabel}</label>
                                            <input
                                                type="text"
                                                value={selectedItem.name}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">{BASIC_FIELDS.typeLabel}</label>
                                            <select
                                                value={selectedItem.item_type || 'Objeto Maravilloso'}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, item_type: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                            >
                                                {MAGIC_ITEM_TYPES.map((type) => (
                                                    <option key={type.value} value={type.value}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">{BASIC_FIELDS.slotLabel}</label>
                                            <input
                                                type="text"
                                                value={selectedItem.item_slot || ''}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, item_slot: e.target.value })}
                                                disabled={!isEditing}
                                                placeholder={BASIC_FIELDS.slotPlaceholder}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <ImageUpload
                                            imageUrl={selectedItem.image_url}
                                            onImageChange={(url) => setSelectedItem({ ...selectedItem, image_url: url })}
                                            disabled={!isEditing}
                                            itemName={selectedItem.name}
                                            itemSlug={selectedItem.slug}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">{STATS_FIELDS.casterLevelLabel}</label>
                                        <input
                                            type="number"
                                            value={selectedItem.caster_level || 1}
                                            onChange={(e) => setSelectedItem({ ...selectedItem, caster_level: parseInt(e.target.value) || 1 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">{STATS_FIELDS.auraLabel}</label>
                                        <input
                                            type="text"
                                            value={selectedItem.aura || ''}
                                            onChange={(e) => setSelectedItem({ ...selectedItem, aura: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder={STATS_FIELDS.auraPlaceholder}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">{STATS_FIELDS.priceLabel}</label>
                                        <input
                                            type="number"
                                            value={selectedItem.price_gold || 0}
                                            onChange={(e) => setSelectedItem({ ...selectedItem, price_gold: parseFloat(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">{STATS_FIELDS.weightLabel}</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={selectedItem.weight_lb || 0}
                                            onChange={(e) => setSelectedItem({ ...selectedItem, weight_lb: parseFloat(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">{DESCRIPTION_FIELDS.descriptionLabel}</label>
                                    <RichTextEditor
                                        value={selectedItem.description || ''}
                                        onChange={(value) => setSelectedItem({ ...selectedItem, description: value })}
                                        disabled={!isEditing}
                                        height="200px"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">{DESCRIPTION_FIELDS.constructionReqLabel}</label>
                                    <textarea
                                        value={selectedItem.construction_requirements || ''}
                                        onChange={(e) => setSelectedItem({ ...selectedItem, construction_requirements: e.target.value })}
                                        disabled={!isEditing}
                                        rows={3}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">{DESCRIPTION_FIELDS.constructionCostLabel}</label>
                                    <input
                                        type="number"
                                        value={selectedItem.construction_cost_gold || 0}
                                        onChange={(e) => setSelectedItem({ ...selectedItem, construction_cost_gold: parseFloat(e.target.value) || 0 })}
                                        disabled={!isEditing}
                                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
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
