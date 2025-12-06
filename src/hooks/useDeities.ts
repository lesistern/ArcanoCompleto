import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Deity,
  createNewDeityTemplate,
  buildDeityDataToSave,
  validateDeityData,
  filterDeities,
  calculateTranslatedCount,
} from '@/lib/data/deity-management';

interface UseDeititiesReturn {
  // Data
  deities: Deity[];
  filteredDeities: Deity[];
  selectedDeity: Deity | null;

  // UI State
  isEditing: boolean;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  syncMessage: string;

  // Actions
  loadDeities: () => void;
  handleCreateNew: () => void;
  handleSave: () => Promise<void>;
  handleDelete: (slug: string) => void;
  handleSelectDeity: (deity: Deity, editing: boolean) => void;
  handleSearchChange: (term: string) => void;
  handleDeityUpdate: (deity: Deity) => void;
  handleEditToggle: () => void;
  handleExport: () => void;
  handleImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDuplicate: (deity: Deity) => void;
  translatedCount: number;
  searchTerm: string;
}

/**
 * Custom hook for deities administration page logic
 * Manages state, data fetching, and CRUD operations
 */
export function useDeities(): UseDeititiesReturn {
  const supabase = createClient();

  // Data state
  const [deities, setDeities] = useState<Deity[]>([]);
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);

  // UI state
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState('');

  // Load deities on mount
  useEffect(() => {
    loadDeities();
  }, []);

  /**
   * Load all deities from localStorage with Supabase fallback
   */
  const loadDeities = useCallback(() => {
    const stored = localStorage.getItem('dnd_deities');
    if (stored) {
      try {
        setDeities(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing stored deities:', error);
        setDeities([]);
      }
    }
  }, []);

  /**
   * Save deities to localStorage
   */
  const saveDeities = useCallback((newDeities: Deity[]) => {
    localStorage.setItem('dnd_deities', JSON.stringify(newDeities));
    setDeities(newDeities);
  }, []);

  /**
   * Sync a deity to Supabase
   */
  const syncToSupabase = useCallback(async (deity: Deity) => {
    setSyncStatus('syncing');
    setSyncMessage('Sincronizando con Supabase...');

    try {
      const deityData = buildDeityDataToSave(deity);
      const { error } = await supabase
        .from('deities')
        .upsert(deityData, {
          onConflict: 'slug'
        });

      if (error) {
        console.error('Error sincronizando:', error);
        setSyncStatus('error');
        setSyncMessage(`Error: ${error.message}`);
        setTimeout(() => setSyncStatus('idle'), 3000);
        return;
      }

      setSyncStatus('success');
      setSyncMessage(`✅ ${deity.name_es} sincronizado correctamente`);
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (err) {
      console.error('Error:', err);
      setSyncStatus('error');
      setSyncMessage('Error al sincronizar');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  }, [supabase]);

  /**
   * Save deity
   */
  const handleSave = useCallback(async () => {
    if (!selectedDeity) return;

    const validationError = validateDeityData(selectedDeity);
    if (validationError) {
      setSyncStatus('error');
      setSyncMessage(validationError);
      setTimeout(() => setSyncStatus('idle'), 3000);
      return;
    }

    const updatedDeities = deities.map(d =>
      d.slug === selectedDeity.slug ? selectedDeity : d
    );

    // Save locally first
    saveDeities(updatedDeities);

    // Sync to Supabase
    await syncToSupabase(selectedDeity);

    setIsEditing(false);
  }, [selectedDeity, deities, saveDeities, syncToSupabase]);

  /**
   * Delete deity
   */
  const handleDelete = useCallback((slug: string) => {
    if (confirm('¿Estás seguro de eliminar esta deidad?')) {
      const updatedDeities = deities.filter(d => d.slug !== slug);
      saveDeities(updatedDeities);
      if (selectedDeity?.slug === slug) {
        setSelectedDeity(null);
        setIsEditing(false);
      }
    }
  }, [deities, selectedDeity, saveDeities]);

  /**
   * Create new deity
   */
  const handleCreateNew = useCallback(() => {
    const newDeity = createNewDeityTemplate();
    setDeities([...deities, newDeity]);
    setSelectedDeity(newDeity);
    setIsEditing(true);
  }, [deities]);

  /**
   * Select a deity
   */
  const handleSelectDeity = useCallback((deity: Deity, editing: boolean) => {
    setSelectedDeity(deity);
    setIsEditing(editing);
  }, []);

  /**
   * Update search term
   */
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  /**
   * Update selected deity
   */
  const handleDeityUpdate = useCallback((deity: Deity) => {
    setSelectedDeity(deity);
  }, []);

  /**
   * Toggle edit mode
   */
  const handleEditToggle = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  /**
   * Export deities to JSON file
   */
  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify(deities, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'deidades_dnd.json';
    link.click();
  }, [deities]);

  /**
   * Import deities from JSON file
   */
  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (Array.isArray(imported)) {
          saveDeities(imported);
          alert('Deidades importadas correctamente');
        }
      } catch (error) {
        alert('Error al importar el archivo');
      }
    };
    reader.readAsText(file);
  }, [saveDeities]);

  /**
   * Duplicate a deity
   */
  const handleDuplicate = useCallback((deity: Deity) => {
    const newDeity = {
      ...deity,
      slug: deity.slug + '-copy-' + Date.now(),
      id: undefined,
    };
    setDeities([...deities, newDeity]);
  }, [deities]);

  // Filter deities based on search term
  const filteredDeities = filterDeities(deities, searchTerm);
  const translatedCount = calculateTranslatedCount(deities);

  return {
    // Data
    deities,
    filteredDeities,
    selectedDeity,

    // UI State
    isEditing,
    syncStatus,
    syncMessage,

    // Actions
    loadDeities,
    handleCreateNew,
    handleSave,
    handleDelete,
    handleSelectDeity,
    handleSearchChange,
    handleDeityUpdate,
    handleEditToggle,
    handleExport,
    handleImport,
    handleDuplicate,
    translatedCount,
    searchTerm,
  };
}
