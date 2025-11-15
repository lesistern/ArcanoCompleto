'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Download, Upload } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCharacterStore } from '@/lib/store/characterStore';
import BasicInfoSection from '@/components/character-editor/BasicInfoSection';
import AbilityScoresSection from '@/components/character-editor/AbilityScoresSection';
import CombatStatsSection from '@/components/character-editor/CombatStatsSection';
import SkillsSection from '@/components/character-editor/SkillsSection';

export default function CharacterEditorPage() {
  const { character, resetCharacter } = useCharacterStore();
  const [activeTab, setActiveTab] = useState<'basic' | 'abilities' | 'combat' | 'skills' | 'feats' | 'equipment'>('basic');

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
      <div className="border-b border-dungeon-700 bg-dungeon-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold text-dungeon-100">
              Editor de Personajes
            </h1>

            <div className="flex items-center gap-2">
              <label htmlFor="import-character" className="cursor-pointer">
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

              <Button variant="ghost" size="sm" onClick={handleExportCharacter}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm('¿Estás seguro de que quieres reiniciar el personaje?')) {
                    resetCharacter();
                  }
                }}
              >
                Reiniciar
              </Button>

              <Button variant="primary" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Character Name Display */}
      <div className="border-b border-dungeon-700 bg-dungeon-900/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-heading text-dungeon-100">
              {character.name || 'Nuevo Personaje'}
            </h2>
            {character.race && (
              <>
                <span className="text-dungeon-500">•</span>
                <span className="text-sm text-dungeon-400">
                  {character.race.name}
                </span>
              </>
            )}
            {character.classes && character.classes.length > 0 && (
              <>
                <span className="text-dungeon-500">•</span>
                <span className="text-sm text-dungeon-400">
                  {character.classes.map(c => `${c.class.name} ${c.level}`).join(', ')}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-dungeon-700 bg-dungeon-900/20">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-gold-500 text-gold-500'
                    : 'border-transparent text-dungeon-400 hover:text-dungeon-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'basic' && <BasicInfoSection />}
        {activeTab === 'abilities' && <AbilityScoresSection />}
        {activeTab === 'combat' && <CombatStatsSection />}
        {activeTab === 'skills' && <SkillsSection />}
        {activeTab === 'feats' && (
          <div className="text-center text-dungeon-400 py-12">
            Sección de Dotes - Próximamente
          </div>
        )}
        {activeTab === 'equipment' && (
          <div className="text-center text-dungeon-400 py-12">
            Sección de Equipo - Próximamente
          </div>
        )}
      </div>
    </div>
  );
}
