'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, Plus, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { SpellList } from '@/components/admin/SpellList';

// Lazy-load heavy spell editor component (only shown when editing/creating)
const SpellEditor = dynamic(() => import('@/components/admin/SpellEditor').then(mod => ({ default: mod.SpellEditor })), {
  loading: () => <div className="h-80 bg-dungeon-800 rounded animate-pulse" />
});
import type { SpellData } from '@/lib/data/spell-management';
import {
  createNewSpellTemplate,
  generateSpellSlug,
  prepareSpellForSave,
  validateSpell,
} from '@/lib/data/spell-management';

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
    const newSpell = createNewSpellTemplate();
    setSelectedSpell(newSpell);
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedSpell) return;

    // Validate spell
    const validationError = validateSpell(selectedSpell);
    if (validationError) {
      setSyncStatus('error');
      setSyncMessage(validationError);
      return;
    }

    setSyncStatus('syncing');
    setSyncMessage('Guardando en Supabase...');

    try {
      const spellDataToSave = prepareSpellForSave(selectedSpell);

      if (isCreating) {
        const { error } = await supabase.from('spells').insert(spellDataToSave);
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
              Editor de Conjuros
            </h1>
            <p className="text-dungeon-300">
              Gestión de la base de datos de magia
            </p>
            {syncStatus !== 'idle' && (
              <div
                className={`mt-2 flex items-center gap-2 text-sm ${
                  syncStatus === 'syncing'
                    ? 'text-blue-400'
                    : syncStatus === 'success'
                      ? 'text-green-400'
                      : 'text-red-400'
                }`}
              >
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spell List Component */}
          <SpellList
            spells={spells}
            selectedSpell={selectedSpell}
            isLoading={isLoading}
            searchTerm={searchTerm}
            onSelectSpell={(spell) => {
              setSelectedSpell(spell);
              setIsEditing(false);
              setIsCreating(false);
            }}
            onEditSpell={(spell) => {
              setSelectedSpell(spell);
              setIsEditing(true);
              setIsCreating(false);
            }}
            onSearch={handleSearch}
          />

          {/* Spell Editor Component */}
          {selectedSpell && (
            <SpellEditor
              spell={selectedSpell}
              isCreating={isCreating}
              isEditing={isEditing}
              isSyncing={syncStatus === 'syncing'}
              onSpellChange={setSelectedSpell}
              onEdit={() => setIsEditing(true)}
              onCancel={() => {
                setIsEditing(false);
                setIsCreating(false);
                if (isCreating) setSelectedSpell(null);
              }}
              onSave={handleSave}
            />
          )}
        </div>
      </div>
    </div>
  );
}
