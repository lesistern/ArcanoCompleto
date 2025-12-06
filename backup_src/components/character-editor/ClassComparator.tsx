'use client';

import { useState } from 'react';
import { X, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { CharacterClass } from '@/lib/services/classService.client';
import { getClassIcon } from '@/lib/utils/classIcons';
import { getDiceIcon } from '@/lib/utils/diceIcons';
import { getClassSummary, getGoodSaves } from '@/lib/services/classService.client';

interface ClassComparatorProps {
  isOpen: boolean;
  onClose: () => void;
  availableClasses: CharacterClass[];
  onSelectClass: (cls: CharacterClass) => void;
}

/**
 * Modal comparador de clases lado a lado
 * Permite seleccionar hasta 3 clases y compararlas
 */
export default function ClassComparator({
  isOpen,
  onClose,
  availableClasses,
  onSelectClass,
}: ClassComparatorProps) {
  const [selectedForCompare, setSelectedForCompare] = useState<CharacterClass[]>([]);
  const maxCompare = 3;

  if (!isOpen) return null;

  const toggleClassForComparison = (cls: CharacterClass) => {
    if (selectedForCompare.find(c => c.slug === cls.slug)) {
      setSelectedForCompare(selectedForCompare.filter(c => c.slug !== cls.slug));
    } else if (selectedForCompare.length < maxCompare) {
      setSelectedForCompare([...selectedForCompare, cls]);
    }
  };

  const handleSelectAndClose = (cls: CharacterClass) => {
    onSelectClass(cls);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-7xl max-h-[90vh] bg-dungeon-900 border border-dungeon-700 rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dungeon-700 bg-dungeon-950/50">
          <div className="flex items-center gap-3">
            <GitCompare className="h-6 w-6 text-gold-400" />
            <h2 className="text-2xl font-heading font-bold text-dungeon-100">
              Comparar Clases
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-dungeon-800 transition-colors"
          >
            <X className="h-5 w-5 text-dungeon-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Selector de clases */}
          {selectedForCompare.length === 0 && (
            <div className="mb-6 text-center">
              <p className="text-dungeon-400 mb-4">
                Selecciona hasta {maxCompare} clases para compararlas lado a lado
              </p>
            </div>
          )}

          {/* Grid de selección */}
          {selectedForCompare.length < maxCompare && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gold-500 mb-3 font-heading">Seleccionar Clases</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {availableClasses.map((cls) => {
                  const Icon = getClassIcon(cls.slug);
                  const isSelected = selectedForCompare.find(c => c.slug === cls.slug);

                  return (
                    <button
                      key={cls.slug}
                      onClick={() => toggleClassForComparison(cls)}
                      disabled={!isSelected && selectedForCompare.length >= maxCompare}
                      className={`
                        p-3 rounded-lg border-2 transition-all
                        flex flex-col items-center gap-1
                        ${isSelected
                          ? 'border-gold-500 bg-gold-900/20'
                          : 'border-dungeon-700 bg-dungeon-800/30 hover:border-gold-600'
                        }
                        disabled:opacity-30 disabled:cursor-not-allowed
                      `}
                    >
                      <Icon className={`h-6 w-6 ${isSelected ? 'text-gold-400' : 'text-dungeon-300'}`} />
                      <span className="text-xs text-center text-dungeon-200">{cls.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Comparación lado a lado */}
          {selectedForCompare.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gold-500 font-heading">
                  Comparando {selectedForCompare.length} clase(s)
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedForCompare([])}
                >
                  Limpiar selección
                </Button>
              </div>

              <div className={`grid grid-cols-1 ${selectedForCompare.length === 2 ? 'md:grid-cols-2' : selectedForCompare.length === 3 ? 'md:grid-cols-3' : ''} gap-4`}>
                {selectedForCompare.map((cls) => {
                  const Icon = getClassIcon(cls.slug);
                  const DiceIcon = getDiceIcon(cls.hitDie);
                  const goodSaves = getGoodSaves(cls);

                  return (
                    <Card key={cls.slug} className="relative h-full">
                      <CardHeader className="pb-3 bg-dungeon-950/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-gold-400" />
                            <CardTitle className="text-lg font-heading">{cls.name}</CardTitle>
                          </div>
                          <button
                            onClick={() => toggleClassForComparison(cls)}
                            className="p-1 rounded hover:bg-dungeon-800 transition-colors"
                          >
                            <X className="h-4 w-4 text-dungeon-500" />
                          </button>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Resumen */}
                        <p className="text-xs text-dungeon-300 leading-relaxed">
                          {getClassSummary(cls)}
                        </p>

                        {/* Stats principales */}
                        <div className="space-y-2 pt-2 border-t border-dungeon-700">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-dungeon-500">Dado de Golpe</span>
                            <div className="flex items-center gap-1">
                              <DiceIcon className="h-4 w-4 text-gold-400" />
                              <span className="text-xs font-semibold text-dungeon-200">
                                {typeof cls.hitDie === 'number' ? `d${cls.hitDie}` : cls.hitDie}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-dungeon-500">Skills/Nivel</span>
                            <span className="text-xs font-semibold text-dungeon-200">
                              {cls.skillPoints} + Int
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-dungeon-500">BAB</span>
                            <span className="text-xs font-semibold text-dungeon-200">
                              {cls.baseAttackBonus === 'good' && 'Bueno'}
                              {cls.baseAttackBonus === 'average' && 'Medio'}
                              {cls.baseAttackBonus === 'poor' && 'Bajo'}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-dungeon-500">Salv. Buenas</span>
                            <span className="text-xs font-semibold text-dungeon-200">
                              {goodSaves.join(', ') || 'Ninguna'}
                            </span>
                          </div>
                        </div>

                        {/* Proficiencias */}
                        <div className="space-y-2 pt-2 border-t border-dungeon-700">
                          <div>
                            <p className="text-xs text-dungeon-500 mb-1">Armas</p>
                            <p className="text-xs text-dungeon-300">{cls.weaponProficiencies}</p>
                          </div>
                          <div>
                            <p className="text-xs text-dungeon-500 mb-1">Armadura</p>
                            <p className="text-xs text-dungeon-300">{cls.armorProficiencies}</p>
                          </div>
                        </div>

                        {/* Botón Seleccionar */}
                        <div className="pt-4 mt-auto">
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-full"
                            onClick={() => handleSelectAndClose(cls)}
                          >
                            Seleccionar {cls.name}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
