'use client';

import dynamic from 'next/dynamic';
import { RacesHeader } from '@/components/admin/RacesHeader';
import { RacesList } from '@/components/admin/RacesList';
import { useRacesAdmin } from '@/hooks/useRacesAdmin';

// Lazy-load heavy form editor component (only needed when editing)
const RaceFormEditor = dynamic(() => import('@/components/admin/RaceFormEditor').then(mod => ({ default: mod.RaceFormEditor })), {
  loading: () => <div className="h-96 bg-gray-800 rounded animate-pulse" />
});

export default function RacesAdminPage() {
  const {
    races,
    filteredRaces,
    selectedRace,
    isLoading,
    isEditing,
    isCreating,
    searchTerm,
    syncStatus,
    syncMessage,
    handleCreateNew,
    handleSave,
    handleCancel,
    handleRaceSelect,
    handleSearchChange,
    handleRaceUpdate,
    handleAbilityAdjustmentUpdate,
    handleEditToggle,
  } = useRacesAdmin();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <RacesHeader
          racesCount={races.length}
          syncStatus={syncStatus}
          syncMessage={syncMessage}
          onCreateNew={handleCreateNew}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RacesList
            races={races}
            filteredRaces={filteredRaces}
            selectedRace={selectedRace}
            isLoading={isLoading}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onRaceSelect={handleRaceSelect}
          />

          <RaceFormEditor
            selectedRace={selectedRace}
            isEditing={isEditing}
            isCreating={isCreating}
            syncStatus={syncStatus}
            onUpdate={handleRaceUpdate}
            onEditToggle={handleEditToggle}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}
