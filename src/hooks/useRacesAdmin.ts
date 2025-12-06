import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  RaceData,
  createNewRaceTemplate,
  buildRaceDataToSave,
  validateRaceData,
  filterRacesBySearch,
  updateAbilityAdjustment as updateAbilityAdjustmentHelper,
  SyncStatus,
} from '@/lib/data/race-management';

interface UseRacesAdminReturn {
  // Data
  races: RaceData[];
  filteredRaces: RaceData[];
  selectedRace: RaceData | null;

  // UI State
  isLoading: boolean;
  isEditing: boolean;
  isCreating: boolean;
  searchTerm: string;
  syncStatus: SyncStatus;
  syncMessage: string;

  // Actions
  loadRaces: () => Promise<void>;
  handleCreateNew: () => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  handleRaceSelect: (race: RaceData, edit: boolean) => void;
  handleSearchChange: (term: string) => void;
  handleRaceUpdate: (race: RaceData) => void;
  handleAbilityAdjustmentUpdate: (stat: string, value: number) => void;
  handleEditToggle: () => void;
}

/**
 * Custom hook for races administration page logic
 * Manages state, data fetching, and CRUD operations
 */
export function useRacesAdmin(): UseRacesAdminReturn {
  const supabase = createClient();

  // Data state
  const [races, setRaces] = useState<RaceData[]>([]);
  const [selectedRace, setSelectedRace] = useState<RaceData | null>(null);

  // UI state
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [syncMessage, setSyncMessage] = useState('');

  // Load races on mount
  useEffect(() => {
    loadRaces();
  }, []);

  /**
   * Load all races from database
   */
  const loadRaces = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('races')
        .select('*')
        .order('name');

      if (error) throw error;

      if (data) {
        setRaces(data as RaceData[]);
      }
    } catch (error) {
      console.error('Error loading races:', error);
      setSyncStatus('error');
      setSyncMessage('Error al cargar las razas');
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  /**
   * Create new race template
   */
  const handleCreateNew = useCallback(() => {
    setSelectedRace(createNewRaceTemplate());
    setIsCreating(true);
    setIsEditing(true);
  }, []);

  /**
   * Save race to database (create or update)
   */
  const handleSave = useCallback(async () => {
    if (!selectedRace) return;

    // Validate
    const validationError = validateRaceData(selectedRace);
    if (validationError) {
      setSyncStatus('error');
      setSyncMessage(validationError);
      return;
    }

    setSyncStatus('syncing');
    setSyncMessage('Guardando en Supabase...');

    try {
      const raceDataToSave = buildRaceDataToSave(selectedRace);

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

      // Reset status after 3 seconds
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (err: any) {
      console.error('Error saving race:', err);
      setSyncStatus('error');
      setSyncMessage(`Error: ${err.message}`);
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  }, [selectedRace, isCreating, supabase, loadRaces]);

  /**
   * Cancel editing
   */
  const handleCancel = useCallback(() => {
    setIsEditing(false);
    if (isCreating) {
      setSelectedRace(null);
    }
    setIsCreating(false);
  }, [isCreating]);

  /**
   * Select a race to view/edit
   */
  const handleRaceSelect = useCallback((race: RaceData, edit: boolean) => {
    setSelectedRace(race);
    setIsEditing(edit);
    setIsCreating(false);
  }, []);

  /**
   * Update search term
   */
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  /**
   * Update selected race data
   */
  const handleRaceUpdate = useCallback((race: RaceData) => {
    setSelectedRace(race);
  }, []);

  /**
   * Update ability adjustment
   */
  const handleAbilityAdjustmentUpdate = useCallback((stat: string, value: number) => {
    if (!selectedRace) return;
    const newAdjustments = updateAbilityAdjustmentHelper(
      selectedRace.ability_adjustments,
      stat,
      value
    );
    setSelectedRace({
      ...selectedRace,
      ability_adjustments: newAdjustments,
    });
  }, [selectedRace]);

  /**
   * Toggle edit mode
   */
  const handleEditToggle = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  // Filter races based on search term
  const filteredRaces = filterRacesBySearch(races, searchTerm);

  return {
    // Data
    races,
    filteredRaces,
    selectedRace,

    // UI State
    isLoading,
    isEditing,
    isCreating,
    searchTerm,
    syncStatus,
    syncMessage,

    // Actions
    loadRaces,
    handleCreateNew,
    handleSave,
    handleCancel,
    handleRaceSelect,
    handleSearchChange,
    handleRaceUpdate,
    handleAbilityAdjustmentUpdate,
    handleEditToggle,
  };
}
