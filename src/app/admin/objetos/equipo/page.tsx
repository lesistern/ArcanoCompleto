'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, Save, Pencil, Loader2, CheckCircle2, AlertCircle, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  EQUIPMENT_TYPES,
  DEFAULT_EQUIPMENT_TEMPLATE,
  ERROR_MESSAGES,
  UI_TEXT,
  BASIC_FIELDS,
  COST_FIELDS,
  SOURCE_FIELDS
} from '@/lib/data/equipment-config';

// Lazy-load heavy editor (only needed when editing)
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor').then(mod => ({ default: mod.RichTextEditor })), {
  loading: () => <div className="h-64 bg-gray-800 rounded animate-pulse" />
});

interface EquipmentData {
    id: string;
    slug: string;
    name: string;
    equipment_type?: string;
    weight_lb?: number;
    cost_gold?: number;
    cost_silver?: number;
    cost_copper?: number;
    description?: string;
    source_book?: string;
    source_page?: number;
}

export default function EquipmentAdminPage() {
    const [equipment, setEquipment] = useState<EquipmentData[]>([]);
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
    const [syncMessage, setSyncMessage] = useState('');

    const supabase = createClient();

    useEffect(() => {
        loadEquipment();
    }, []);

    const loadEquipment = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('equipment')
                .select('*')
                .order('name')
                .limit(100);

            if (error) throw error;
            if (data) setEquipment(data);
        } catch (error) {
            console.error('Error loading equipment:', error);
            setSyncStatus('error');
            setSyncMessage(ERROR_MESSAGES.loadError);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (term: string) => {
        setSearchTerm(term);
        if (term.length < 3) {
            loadEquipment();
            return;
        }

        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('equipment')
                .select('*')
                .ilike('name', `%${term}%`)
                .order('name')
                .limit(50);

            if (error) throw error;
            if (data) setEquipment(data);
        } catch (error) {
            console.error('Error searching equipment:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNew = () => {
        const newEquipment: EquipmentData = {
            ...DEFAULT_EQUIPMENT_TEMPLATE
        };
        setSelectedEquipment(newEquipment);
        setIsCreating(true);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!selectedEquipment) return;

        if (!selectedEquipment.name) {
            setSyncStatus('error');
            setSyncMessage(ERROR_MESSAGES.nameRequired);
            return;
        }

        setSyncStatus('syncing');
        setSyncMessage(ERROR_MESSAGES.savingStatus);

        try {
            const slug = selectedEquipment.slug || selectedEquipment.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            const equipmentDataToSave = {
                slug,
                name: selectedEquipment.name,
                equipment_type: selectedEquipment.equipment_type,
                weight_lb: selectedEquipment.weight_lb,
                cost_gold: selectedEquipment.cost_gold,
                cost_silver: selectedEquipment.cost_silver,
                cost_copper: selectedEquipment.cost_copper,
                description: selectedEquipment.description,
                source_book: selectedEquipment.source_book,
                source_page: selectedEquipment.source_page
            };

            if (isCreating) {
                const { error } = await supabase
                    .from('equipment')
                    .insert(equipmentDataToSave);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('equipment')
                    .update(equipmentDataToSave)
                    .eq('id', selectedEquipment.id);
                if (error) throw error;
            }

            if (searchTerm) {
                await handleSearch(searchTerm);
            } else {
                await loadEquipment();
            }

            setSyncStatus('success');
            setSyncMessage(ERROR_MESSAGES.saveSuccess);
            setIsEditing(false);
            setIsCreating(false);
            setTimeout(() => setSyncStatus('idle'), 3000);
        } catch (err: any) {
            console.error('Error saving equipment:', err);
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
                        <p className="text-gray-300">{UI_TEXT.totalItems}: {equipment.length} objetos</p>
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
                            ) : equipment.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        setSelectedEquipment(item);
                                        setIsEditing(false);
                                        setIsCreating(false);
                                    }}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedEquipment?.id === item.id
                                            ? 'bg-gold-900/30 border border-gold-400'
                                            : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-semibold text-gold-300">{item.name}</div>
                                            <div className="text-xs text-gray-400">
                                                {item.equipment_type || UI_TEXT.noType} • {item.cost_gold || 0} po
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedEquipment(item);
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

                    {selectedEquipment && (
                        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 overflow-y-auto h-[calc(100vh-200px)] custom-scrollbar">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gold-400">
                                    {isCreating ? UI_TEXT.createTitle : `${UI_TEXT.editTitle}: ${selectedEquipment.name}`}
                                </h2>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setIsCreating(false);
                                                if (isCreating) setSelectedEquipment(null);
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
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">{BASIC_FIELDS.nameLabel}</label>
                                        <input
                                            type="text"
                                            value={selectedEquipment.name}
                                            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, name: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">{BASIC_FIELDS.typeLabel}</label>
                                        <select
                                            value={selectedEquipment.equipment_type || 'Herramienta'}
                                            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, equipment_type: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        >
                                            {EQUIPMENT_TYPES.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">{COST_FIELDS.weightLabel}</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={selectedEquipment.weight_lb || 0}
                                            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, weight_lb: parseFloat(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">{COST_FIELDS.costGoldLabel}</label>
                                        <input
                                            type="number"
                                            value={selectedEquipment.cost_gold || 0}
                                            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, cost_gold: parseFloat(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">{COST_FIELDS.costSilverLabel}</label>
                                        <input
                                            type="number"
                                            value={selectedEquipment.cost_silver || 0}
                                            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, cost_silver: parseFloat(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">{COST_FIELDS.costCopperLabel}</label>
                                        <input
                                            type="number"
                                            value={selectedEquipment.cost_copper || 0}
                                            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, cost_copper: parseFloat(e.target.value) || 0 })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">{SOURCE_FIELDS.descriptionLabel}</label>
                                    <RichTextEditor
                                        value={selectedEquipment.description || ''}
                                        onChange={(value) => setSelectedEquipment({ ...selectedEquipment, description: value })}
                                        disabled={!isEditing}
                                        height="300px"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">{SOURCE_FIELDS.sourceBookLabel}</label>
                                        <input
                                            type="text"
                                            value={selectedEquipment.source_book || ''}
                                            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, source_book: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">{SOURCE_FIELDS.sourcePageLabel}</label>
                                        <input
                                            type="number"
                                            value={selectedEquipment.source_page || ''}
                                            onChange={(e) => setSelectedEquipment({ ...selectedEquipment, source_page: parseInt(e.target.value) || undefined })}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 disabled:opacity-50 focus:outline-none focus:border-gold-400"
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
