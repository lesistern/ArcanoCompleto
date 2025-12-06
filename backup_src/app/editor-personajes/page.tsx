'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Download, Upload, Check, Loader2, AlertCircle, FolderOpen, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCharacterStore } from '@/lib/store/characterStore';
import LoadCharacterModal from '@/components/character-editor/LoadCharacterModal';
import ProgressSidebar from '@/components/character-editor/ProgressSidebar';
import AutoSaveIndicator from '@/components/character-editor/AutoSaveIndicator';
import dynamic from 'next/dynamic';

// Componente de carga para las secciones
const LoadingSection = () => (
  <div className="w-full h-[400px] flex flex-col items-center justify-center gap-4 bg-dungeon-900/20 border border-dungeon-800/50 rounded-xl animate-pulse">
    <Loader2 className="w-10 h-10 animate-spin text-gold-500/50" />
    <p className="text-dungeon-400 text-sm">Cargando sección...</p>
  </div>
);

// Lazy load de secciones pesadas
const BasicInfoSection = dynamic(() => import('@/components/character-editor/BasicInfoSection'), {
  loading: () => <LoadingSection />,
});
const AbilityScoresSection = dynamic(() => import('@/components/character-editor/AbilityScoresSection'), {
  loading: () => <LoadingSection />,
});
const CombatStatsSection = dynamic(() => import('@/components/character-editor/CombatStatsSection'), {
  loading: () => <LoadingSection />,
});
const SkillsSection = dynamic(() => import('@/components/character-editor/SkillsSection'), {
  loading: () => <LoadingSection />,
});
const EquipmentSection = dynamic(() => import('@/components/character-editor/EquipmentSection'), {
  loading: () => <LoadingSection />,
});

export default function CharacterEditorPage() {
  const {
    character,
    resetCharacter,
    saveToSupabase,
    autoSave,
    isSaving,
    lastSaved,
    saveError
  } = useCharacterStore();
  const [activeTab, setActiveTab] = useState<'basic' | 'abilities' | 'combat' | 'skills' | 'feats' | 'equipment'>('basic');
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(true); // Modo ayuda activo por defecto

  // ========================================================================
  // AUTO-GUARDADO CADA 30 SEGUNDOS
  // ========================================================================
  useEffect(() => {
    const interval = setInterval(() => {
      autoSave();
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [autoSave]);

  // ========================================================================
  // FUNCIONES DE GUARDADO
  // ========================================================================

  /**
   * Maneja el guardado manual del personaje
   */
  const handleSaveCharacter = async () => {
    try {
      await saveToSupabase();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Información Básica', icon: '📋' },
    { id: 'abilities', label: 'Habilidades', icon: '💪' },
    { id: 'combat', label: 'Combate', icon: '⚔️' },
    { id: 'skills', label: 'Pericias', icon: '🎯' },
    { id: 'feats', label: 'Dotes', icon: '✨' },
    { id: 'equipment', label: 'Equipo', icon: '🎒' },
  ];

  const handleExportCharacter = () => {
    const dataStr = JSON.stringify(character, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${character.name || 'personaje'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportCharacter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedCharacter = JSON.parse(e.target?.result as string);
        useCharacterStore.getState().loadCharacter(importedCharacter);
        alert('Personaje importado correctamente');
      } catch (error) {
        alert('Error al importar el personaje');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-dungeon-950">
      {/* Header */}
      <div className="border-b border-dungeon-700 bg-dungeon-900/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            {/* Título responsive */}
            <h1 className="text-lg sm:text-2xl font-heading font-bold text-dungeon-100 truncate flex items-center gap-2">
              <Link href="/" className="hover:text-gold-500 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <span className="hidden sm:inline">Editor de Personajes</span>
              <span className="sm:hidden">Editor</span>
            </h1>

            <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-end">
              {/* Estado de guardado - siempre visible */}
              <div className="hidden sm:block">
                <AutoSaveIndicator
                  isSaving={isSaving}
                  lastSaved={lastSaved}
                  saveError={saveError}
                />
              </div>

              {/* Toggle de ayuda - solo desktop */}
              <Button
                variant={showHelp ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setShowHelp(!showHelp)}
                title={showHelp ? 'Ocultar ayuda' : 'Mostrar ayuda'}
                className="hidden md:flex"
              >
                <HelpCircle className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">{showHelp ? 'Ayuda activa' : 'Ayuda'}</span>
              </Button>

              {/* Botón de ayuda mobile (solo icono) */}
              <Button
                variant={showHelp ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setShowHelp(!showHelp)}
                title={showHelp ? 'Ocultar ayuda' : 'Mostrar ayuda'}
                className="md:hidden"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>

              {/* Cargar - con texto en desktop */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLoadModalOpen(true)}
                title="Cargar personaje"
              >
                <FolderOpen className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Cargar</span>
              </Button>

              {/* Importar - solo desktop */}
              <label htmlFor="import-character" className="cursor-pointer hidden sm:block">
                <span className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-dungeon-700 hover:text-dungeon-100 h-9 px-3 text-dungeon-300">
                  <Upload className="h-4 w-4 mr-2" />
                  Importar
                </span>
              </label>
              <input
                id="import-character"
                type="file"
                accept=".json"
                onChange={handleImportCharacter}
                className="hidden"
              />

              {/* Exportar - solo desktop */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExportCharacter}
                className="hidden sm:flex"
                title="Exportar personaje"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>

              {/* Guardar - siempre visible, texto solo desktop */}
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveCharacter}
                disabled={isSaving}
                title="Guardar personaje"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 sm:mr-2 animate-spin" />
                    <span className="hidden sm:inline">Guardando...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Guardar</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Character Name Display */}
      <div className="border-b border-dungeon-700 bg-dungeon-900/30">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
            <h2 className="text-base sm:text-xl font-heading text-dungeon-100 whitespace-nowrap">
              {character.name || 'Nuevo Personaje'}
            </h2>
            {character.race && (
              <>
                <span className="text-dungeon-500 hidden sm:inline">•</span>
                <span className="text-xs sm:text-sm text-dungeon-400 whitespace-nowrap">
                  {character.race.name}
                </span>
              </>
            )}
            {character.classes && character.classes.length > 0 && (
              <>
                <span className="text-dungeon-500 hidden sm:inline">•</span>
                <span className="text-xs sm:text-sm text-dungeon-400 whitespace-nowrap">
                  {character.classes.map(c => `${c.class.name} ${c.level}`).join(', ')}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-dungeon-700 bg-dungeon-900/20 sticky top-[65px] z-40 backdrop-blur-sm">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 border-b-2 transition-colors whitespace-nowrap text-xs sm:text-sm ${activeTab === tab.id
                  ? 'border-gold-500 text-gold-500'
                  : 'border-transparent text-dungeon-400 hover:text-dungeon-200'
                  }`}
              >
                <span className="text-sm sm:text-base">{tab.icon}</span>
                <span className="font-medium hidden xs:inline sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Layout con sidebar en desktop */}
      <div className="lg:flex lg:min-h-[calc(100vh-180px)]">
        {/* Contenido principal */}
        <div className="flex-1 container mx-auto px-2 sm:px-4 py-4 sm:py-8 pb-20 lg:pb-8">
          {/* Progress Sidebar - Versión móvil (arriba del contenido) */}
          <ProgressSidebar character={character} className="lg:hidden" />

          {activeTab === 'basic' && (
            <div data-section="basic">
              <BasicInfoSection
                showHelp={showHelp}
                onContinue={() => {
                  setActiveTab('abilities');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}
          {activeTab === 'abilities' && (
            <div data-section="abilities">
              <AbilityScoresSection
                showHelp={showHelp}
                onContinue={() => {
                  setActiveTab('combat');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}
          {activeTab === 'combat' && (
            <div data-section="combat">
              <CombatStatsSection
                onContinue={() => {
                  setActiveTab('skills');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}
          {activeTab === 'skills' && (
            <div data-section="skills">
              <SkillsSection
                onContinue={() => {
                  setActiveTab('equipment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}
          {activeTab === 'feats' && (
            <div className="text-center text-dungeon-400 py-12 card bg-dungeon-800/30 border-dashed">
              <p className="text-lg font-heading mb-2">Sección de Dotes</p>
              <p className="text-sm">Próximamente disponible</p>
            </div>
          )}
          {activeTab === 'equipment' && (
            <div data-section="equipment">
              <EquipmentSection
                showHelp={showHelp}
                onContinue={() => {
                  setActiveTab('basic');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}
        </div>

        {/* Progress Sidebar - Versión desktop (lateral) */}
        <ProgressSidebar character={character} className="lg:sticky lg:top-[120px] lg:h-[calc(100vh-120px)]" />
      </div>

      {/* Load Character Modal */}
      <LoadCharacterModal
        isOpen={isLoadModalOpen}
        onClose={() => setIsLoadModalOpen(false)}
      />
    </div>
  );
}
