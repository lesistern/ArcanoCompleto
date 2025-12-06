'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, Save, Pencil, Loader2, CheckCircle2, AlertCircle, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { ImageUpload } from '@/components/admin/ImageUpload';
import {
  ARMOR_TYPES,
  DEFAULT_ARMOR_TEMPLATE,
  ERROR_MESSAGES,
  UI_TEXT,
  ARMOR_STATS_FIELDS,
  ARMOR_COST_FIELDS,
  ARMOR_DESC_FIELDS,
  BASIC_FIELDS
} from '@/lib/data/armor-config';

// Lazy-load heavy editor (only needed when editing)
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor').then(mod => ({ default: mod.RichTextEditor })), {
  loading: () => <div className="h-64 bg-dungeon-800 rounded animate-pulse" />
});

interface ArmorData {
    id: string;
    slug: string;
    name: string;
    armor_type?: string;
    cost_gold?: number;
    cost_silver?: number;
    armor_bonus?: number;
    max_dex_bonus?: number;
    armor_check_penalty?: number;
    arcane_spell_failure?: number;
    base_speed_30?: number;
    base_speed_20?: number;
    weight_lb?: number;
    description?: string;
    special_properties?: string;
    source_book?: string;
    source_page?: number;
    image_url?: string;
}

export default function ArmorAdminPage() {
    const [armors, setArmors] = useState<ArmorData[]>([]);
    const [selectedArmor, setSelectedArmor] = useState<ArmorData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
    const [syncMessage, setSyncMessage] = useState('');

    const supabase = createClient();

    useEffect(() => {
        loadArmors();
    }, []);

    const loadArmors = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('armor')
                .select('*')
                .order('name')
                .limit(100);

            if (error) throw error;

            if (data) {
                setArmors(data);
            }
        } catch (error) {
            console.error('Error loading armors:', error);
            setSyncStatus('error');
            setSyncMessage(ERROR_MESSAGES.loadError);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (term: string) => {
        setSearchTerm(term);
        if (term.length < 3) {
            loadArmors();
            return;
        }

        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('armor')
                .select('*')
                .ilike('name', `%${term}%`)
                .order('name')
                .limit(50);

            if (error) throw error;
            if (data) setArmors(data);
        } catch (error) {
            console.error('Error searching armors:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNew = () => {
        const newArmor: ArmorData = {
            ...DEFAULT_ARMOR_TEMPLATE
        } as ArmorData;
        setSelectedArmor(newArmor);
        setIsCreating(true);
        setIsEditing(true);
    };



    const handleSave = async () => {
        if (!selectedArmor) return;

        if (!selectedArmor.name) {
            setSyncStatus('error');
            setSyncMessage(ERROR_MESSAGES.nameRequired);
            return;
        }

        setSyncStatus('syncing');
        setSyncMessage(ERROR_MESSAGES.savingStatus);

        try {
            const slug = selectedArmor.slug || selectedArmor.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            const armorDataToSave = {
                slug,
                name: selectedArmor.name,
                armor_type: selectedArmor.armor_type,
                cost_gold: selectedArmor.cost_gold,
                cost_silver: selectedArmor.cost_silver,
                armor_bonus: selectedArmor.armor_bonus,
                max_dex_bonus: selectedArmor.max_dex_bonus,
                armor_check_penalty: selectedArmor.armor_check_penalty,
                arcane_spell_failure: selectedArmor.arcane_spell_failure,
                base_speed_30: selectedArmor.base_speed_30,
                base_speed_20: selectedArmor.base_speed_20,
                weight_lb: selectedArmor.weight_lb,
                description: selectedArmor.description,
                special_properties: selectedArmor.special_properties,
                source_book: selectedArmor.source_book,
                source_page: selectedArmor.source_page,
                image_url: selectedArmor.image_url
            };

            if (isCreating) {
                const { error } = await supabase
                    .from('armor')
                    .insert(armorDataToSave);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('armor')
                    .update(armorDataToSave)
                    .eq('id', selectedArmor.id);
                if (error) throw error;
            }

            if (searchTerm) {
                await handleSearch(searchTerm);
            } else {
                await loadArmors();
            }

            setSyncStatus('success');
            setSyncMessage(ERROR_MESSAGES.saveSuccess);
            setIsEditing(false);
            setIsCreating(false);
            setTimeout(() => setSyncStatus('idle'), 3000);
        } catch (err: any) {
            console.error('Error saving armor:', err);
            setSyncStatus('error');
            setSyncMessage(`${ERROR_MESSAGES.saveError}: ${err.message}`);
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
                            {UI_TEXT.pageTitle}
                        </h1>
                        <p className="text-dungeon-300">
                            {UI_TEXT.totalArmor}: {armors.length} {UI_TEXT.newArmorButton.toLowerCase()}
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
                        {UI_TEXT.newArmorButton}
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
                            ) : armors.map((armor) => (
                                <div
                                    key={armor.id}
                                    onClick={() => {
                                        setSelectedArmor(armor);
                                        setIsEditing(false);
                                        setIsCreating(false);
                                    }}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedArmor?.id === armor.id
                                        ? 'bg-gold-900/30 border border-gold-400'
                                        : 'bg-dungeon-700 hover:bg-dungeon-600'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold text-gold-300">
                                                {armor.name}
                                            </div>
                                            <div className="text-xs text-dungeon-400">
                                                {armor.armor_type || UI_TEXT.noType} • CA +{armor.armor_bonus || 0}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedArmor(armor);
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

                    {selectedArmor && (
                        <div className="lg:col-span-2 bg-dungeon-800 rounded-lg p-6 overflow-y-auto h-[calc(100vh-200px)] custom-scrollbar">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gold-400">
                                    {isCreating ? UI_TEXT.createTitle : `${UI_TEXT.editTitle}: ${selectedArmor.name}`}
                                </h2>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setIsCreating(false);
                                                if (isCreating) setSelectedArmor(null);
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
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                                {BASIC_FIELDS[0]?.label}
                                            </label>
                                            <input
                                                type="text"
                                                value={selectedArmor.name}
                                                onChange={(e) => setSelectedArmor({ ...selectedArmor, name: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                                {BASIC_FIELDS[1]?.label}
                                            </label>
                                            <select
                                                value={selectedArmor.armor_type || ARMOR_TYPES[0].value}
                                                onChange={(e) => setSelectedArmor({ ...selectedArmor, armor_type: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                            >
                                                {ARMOR_TYPES.map((type) => (
                                                    <option key={type.value} value={type.value}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <ImageUpload
                                            imageUrl={selectedArmor.image_url}
                                            onImageChange={(url) => setSelectedArmor({ ...selectedArmor, image_url: url })}
                                            disabled={!isEditing}
                                            itemName={selectedArmor.name}
                                            itemSlug={selectedArmor.slug}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            {ARMOR_STATS_FIELDS.armorBonusLabel}
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedArmor.armor_bonus || 0}
                                            onChange={(e) => setSelectedArmor({ ...selectedArmor, armor_bonus: parseInt(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            {ARMOR_STATS_FIELDS.maxDexBonusLabel}
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedArmor.max_dex_bonus || 0}
                                            onChange={(e) => setSelectedArmor({ ...selectedArmor, max_dex_bonus: parseInt(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            {ARMOR_STATS_FIELDS.penaltyLabel}
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedArmor.armor_check_penalty || 0}
                                            onChange={(e) => setSelectedArmor({ ...selectedArmor, armor_check_penalty: parseInt(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            {ARMOR_STATS_FIELDS.arcaneFailureLabel}
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedArmor.arcane_spell_failure || 0}
                                            onChange={(e) => setSelectedArmor({ ...selectedArmor, arcane_spell_failure: parseInt(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            {ARMOR_STATS_FIELDS.speed30Label}
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedArmor.base_speed_30 || 0}
                                            onChange={(e) => setSelectedArmor({ ...selectedArmor, base_speed_30: parseInt(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            {ARMOR_STATS_FIELDS.speed20Label}
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedArmor.base_speed_20 || 0}
                                            onChange={(e) => setSelectedArmor({ ...selectedArmor, base_speed_20: parseInt(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            {ARMOR_COST_FIELDS.weightLabel}
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={selectedArmor.weight_lb || 0}
                                            onChange={(e) => setSelectedArmor({ ...selectedArmor, weight_lb: parseFloat(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            {ARMOR_COST_FIELDS.costGoldLabel}
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedArmor.cost_gold || 0}
                                            onChange={(e) => setSelectedArmor({ ...selectedArmor, cost_gold: parseFloat(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                            {ARMOR_COST_FIELDS.costSilverLabel}
                                        </label>
                                        <input
                                            type="number"
                                            value={selectedArmor.cost_silver || 0}
                                            onChange={(e) => setSelectedArmor({ ...selectedArmor, cost_silver: parseFloat(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                        {ARMOR_DESC_FIELDS.descriptionLabel}
                                    </label>
                                    <RichTextEditor
                                        value={selectedArmor.description || ''}
                                        onChange={(value) => setSelectedArmor({ ...selectedArmor, description: value })}
                                        disabled={!isEditing}
                                        height="200px"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-dungeon-300 mb-2">
                                        {ARMOR_DESC_FIELDS.specialPropertiesLabel}
                                    </label>
                                    <textarea
                                        value={selectedArmor.special_properties || ''}
                                        onChange={(e) => setSelectedArmor({ ...selectedArmor, special_properties: e.target.value })}
                                        disabled={!isEditing}
                                        rows={3}
                                        className="w-full px-3 py-2 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
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
