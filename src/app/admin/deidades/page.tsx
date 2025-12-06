'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { DeityCard } from '@/components/admin/DeityCard';
import { DeityEditorHeader } from '@/components/admin/DeityEditorHeader';
import { DeityListSidebar } from '@/components/admin/DeityListSidebar';
import { initialDeities } from '@/lib/data/deities-initial';
import { ALIGNMENT_CONFIG } from '@/lib/data/alignments';
import { RANK_LABELS, formatDeityForCard } from '@/lib/data/deity-management';
import { useDeities } from '@/hooks/useDeities';

// Lazy-load heavy editor and modal components
const DeityFormEditor = dynamic(() => import('@/components/admin/DeityFormEditor').then(mod => ({ default: mod.DeityFormEditor })), {
  loading: () => <div className="h-96 bg-dungeon-800 rounded animate-pulse" />
});
const DeityModal = dynamic(() => import('@/components/admin/DeityModal').then(mod => ({ default: mod.DeityModal })), {
  loading: () => <div className="h-64 bg-dungeon-800 rounded animate-pulse" />
});

const alignmentLabels = Object.fromEntries(
  Object.entries(ALIGNMENT_CONFIG).map(([code, config]) => [code, config.label])
);

export default function DeitiesAdminPage() {
  const [showGrid, setShowGrid] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    deities,
    filteredDeities,
    selectedDeity,
    isEditing,
    syncStatus,
    syncMessage,
    translatedCount,
    searchTerm,
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
  } = useDeities();

  return (
    <div className="min-h-screen bg-gradient-to-b from-dungeon-900 via-dungeon-800 to-dungeon-900">
      <div className="container mx-auto px-4 py-8">
        <DeityEditorHeader
          deitiesCount={deities.length}
          translatedCount={translatedCount}
          syncStatus={syncStatus}
          syncMessage={syncMessage}
          onCreateNew={handleCreateNew}
          onExport={handleExport}
          onImport={handleImport}
        />

        {/* Toggle Vista */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setShowGrid(false)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !showGrid ? 'bg-gold-600 text-white' : 'bg-dungeon-700 text-dungeon-300 hover:bg-dungeon-600'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setShowGrid(true)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showGrid ? 'bg-gold-600 text-white' : 'bg-dungeon-700 text-dungeon-300 hover:bg-dungeon-600'
            }`}
          >
            Grid de Deidades
          </button>
        </div>

        {showGrid ? (
          /* Grid View */
          <div>
            <input
              type="text"
              placeholder="Buscar deidad..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-2 mb-6 bg-dungeon-700 border border-dungeon-600 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-400"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeities.map((deity) => (
                <div key={deity.slug}>
                  <DeityCard
                    deity={formatDeityForCard(deity)}
                    onEdit={() => {
                      handleSelectDeity(deity, true);
                      setShowGrid(false);
                    }}
                    onDelete={() => handleDelete(deity.slug)}
                    onDuplicate={() => handleDuplicate(deity)}
                  />
                  <button
                    onClick={() => {
                      handleSelectDeity(deity, false);
                      setModalOpen(true);
                    }}
                    className="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
                  >
                    Ver Detalle
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Editor View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DeityListSidebar
              deities={deities}
              selectedDeity={selectedDeity}
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onSelectDeity={handleSelectDeity}
              onEdit={(deity) => {
                handleSelectDeity(deity, true);
              }}
              onDelete={handleDelete}
              rankLabels={RANK_LABELS}
              alignmentLabels={alignmentLabels}
            />

            <DeityFormEditor
              deity={selectedDeity}
              isEditing={isEditing}
              syncStatus={syncStatus}
              rankLabels={RANK_LABELS}
              alignmentLabels={alignmentLabels}
              onUpdate={handleDeityUpdate}
              onEditToggle={handleEditToggle}
              onSave={handleSave}
            />
          </div>
        )}
      </div>

      {/* Modal de detalle */}
      {selectedDeity && (
        <DeityModal
          isOpen={modalOpen}
          deity={formatDeityForCard(selectedDeity)}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}