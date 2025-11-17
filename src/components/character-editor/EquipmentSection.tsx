'use client';

import { useState } from 'react';
import { useCharacterStore } from '@/lib/store/characterStore';
import { getStarterKits, StarterKit } from '@/lib/data/starting-equipment';
import { Package, Edit, Check, X, Plus, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';

interface EquipmentSectionProps {
  showHelp?: boolean;
  onContinue?: () => void;
}

type EquipmentMode = 'selection' | 'custom';

export default function EquipmentSection({ showHelp, onContinue }: EquipmentSectionProps) {
  const { character, updateCharacter } = useCharacterStore();
  const [mode, setMode] = useState<EquipmentMode>('selection');
  const [selectedKit, setSelectedKit] = useState<number | null>(null);
  const [customItem, setCustomItem] = useState({ name: '', quantity: 1 });

  // Obtener kits de la clase seleccionada
  const kits = character.class ? getStarterKits(character.class) : [];

  // Manejar selección de kit predefinido
  const handleSelectKit = (kitIndex: number) => {
    const kit = kits[kitIndex];
    if (!kit) return;

    setSelectedKit(kitIndex);

    // Convertir items del kit al formato del personaje
    const equipmentItems = kit.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      equipped: true,
    }));

    updateCharacter({
      equipment: {
        weapons: [],
        armor: [],
        items: equipmentItems,
        currency: {
          pp: 0,
          gp: 0,
          sp: 0,
          cp: 0,
        },
      },
    });
  };

  // Añadir item personalizado
  const handleAddCustomItem = () => {
    if (!customItem.name.trim()) return;

    const currentItems = character.equipment?.items || [];

    updateCharacter({
      equipment: {
        ...character.equipment,
        items: [
          ...currentItems,
          {
            name: customItem.name,
            quantity: customItem.quantity,
            equipped: false,
          },
        ],
      },
    });

    setCustomItem({ name: '', quantity: 1 });
  };

  // Eliminar item personalizado
  const handleRemoveItem = (index: number) => {
    const currentItems = character.equipment?.items || [];
    const newItems = currentItems.filter((_, i) => i !== index);

    updateCharacter({
      equipment: {
        ...character.equipment,
        items: newItems,
      },
    });
  };

  // Verificar si hay clase seleccionada
  if (!character.class) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12 bg-dungeon-800/30 rounded-lg border border-dungeon-700">
          <Package className="w-16 h-16 text-dungeon-600 mx-auto mb-4" />
          <p className="text-dungeon-400 text-sm">
            Selecciona una clase en la pestaña "Información Básica" para ver opciones de equipo inicial
          </p>
        </div>
      </div>
    );
  }

  // Si no hay kits disponibles para esta clase
  if (kits.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12 bg-dungeon-800/30 rounded-lg border border-dungeon-700">
          <Package className="w-16 h-16 text-dungeon-600 mx-auto mb-4" />
          <p className="text-dungeon-400 text-sm">
            No hay kits predefinidos para esta clase aún.
          </p>
          <Button
            onClick={() => setMode('custom')}
            variant="primary"
            size="sm"
            className="mt-4"
          >
            <Edit className="w-4 h-4" />
            Crear equipo manualmente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selector de modo */}
      <div className="flex gap-3">
        <Button
          onClick={() => setMode('selection')}
          variant={mode === 'selection' ? 'primary' : 'ghost'}
          size="sm"
          className="flex-1"
        >
          <Package className="w-4 h-4" />
          Kits Predefinidos
        </Button>
        <Button
          onClick={() => setMode('custom')}
          variant={mode === 'custom' ? 'primary' : 'ghost'}
          size="sm"
          className="flex-1"
        >
          <Edit className="w-4 h-4" />
          Equipo Personalizado
        </Button>
      </div>

      {/* Modo: Kits predefinidos */}
      {mode === 'selection' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {kits.map((kit, index) => (
            <div
              key={index}
              className={`
                p-4 rounded-lg border-2 transition-all cursor-pointer
                ${
                  selectedKit === index
                    ? 'border-gold-500 bg-gold-900/20'
                    : 'border-dungeon-700 bg-dungeon-800/50 hover:border-dungeon-600'
                }
              `}
              onClick={() => handleSelectKit(index)}
            >
              {/* Header del kit */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-gold-400 font-semibold text-sm flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    {kit.name}
                  </h3>
                  <p className="text-dungeon-400 text-xs mt-1 line-clamp-2">
                    {kit.description}
                  </p>
                </div>
                {selectedKit === index && (
                  <Check className="w-5 h-5 text-gold-500 flex-shrink-0 ml-2" />
                )}
              </div>

              {/* Estadísticas del kit */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                <div className="bg-dungeon-900/50 rounded px-2 py-1">
                  <span className="text-dungeon-500">Costo:</span>{' '}
                  <span className="text-gold-400 font-semibold">{kit.totalCost} po</span>
                </div>
                <div className="bg-dungeon-900/50 rounded px-2 py-1">
                  <span className="text-dungeon-500">Peso:</span>{' '}
                  <span className="text-dungeon-300 font-semibold">{kit.totalWeight} lb</span>
                </div>
              </div>

              {/* Lista de items (primeros 5) */}
              <div className="space-y-1">
                <p className="text-dungeon-500 text-xs font-semibold mb-1">
                  Incluye ({kit.items.length} items):
                </p>
                <div className="space-y-0.5 max-h-32 overflow-y-auto custom-scrollbar">
                  {kit.items.slice(0, 8).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <div className="w-1 h-1 rounded-full bg-gold-500/50" />
                      <span className="text-dungeon-300">
                        {item.name}
                        {item.quantity > 1 && (
                          <span className="text-dungeon-500"> (×{item.quantity})</span>
                        )}
                      </span>
                    </div>
                  ))}
                  {kit.items.length > 8 && (
                    <p className="text-dungeon-500 text-xs italic pl-3">
                      ... y {kit.items.length - 8} items más
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modo: Equipo personalizado */}
      {mode === 'custom' && (
        <div className="space-y-4">
          {/* Formulario para añadir items */}
          <div className="bg-dungeon-800/50 rounded-lg border border-dungeon-700 p-4">
            <h3 className="text-gold-400 font-semibold text-sm mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Añadir Item
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={customItem.name}
                onChange={(e) => setCustomItem({ ...customItem, name: e.target.value })}
                placeholder="Nombre del item..."
                className="flex-1 px-3 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-sm text-dungeon-100 placeholder-dungeon-500 focus:border-gold-500 focus:outline-none"
              />
              <input
                type="number"
                min="1"
                value={customItem.quantity}
                onChange={(e) => setCustomItem({ ...customItem, quantity: parseInt(e.target.value) || 1 })}
                className="w-20 px-3 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-sm text-dungeon-100 focus:border-gold-500 focus:outline-none text-center"
              />
              <Button
                onClick={handleAddCustomItem}
                variant="primary"
                size="sm"
                disabled={!customItem.name.trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Lista de items personalizados */}
          <div className="bg-dungeon-800/50 rounded-lg border border-dungeon-700 p-4">
            <h3 className="text-gold-400 font-semibold text-sm mb-3">
              Inventario ({character.equipment?.items?.length || 0} items)
            </h3>
            {(!character.equipment?.items || character.equipment.items.length === 0) ? (
              <p className="text-dungeon-500 text-sm text-center py-8">
                Aún no has añadido ningún item.
              </p>
            ) : (
              <div className="space-y-2">
                {character.equipment.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-dungeon-900/50 rounded px-3 py-2 group hover:bg-dungeon-900 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-dungeon-500" />
                      <span className="text-dungeon-200 text-sm">{item.name}</span>
                      {item.quantity > 1 && (
                        <span className="text-dungeon-500 text-xs">×{item.quantity}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Eliminar item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Resumen del equipo seleccionado */}
      {selectedKit !== null && mode === 'selection' && (
        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-400 font-semibold text-sm">
                Kit "{kits[selectedKit].name}" seleccionado
              </p>
              <p className="text-green-300/80 text-xs mt-1">
                {kits[selectedKit].items.length} items añadidos a tu inventario
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Botón Listo */}
      {onContinue && (
        <div className="flex justify-end mt-6">
          <Button
            onClick={onContinue}
            variant="default"
            size="lg"
          >
            ✓ Listo
          </Button>
        </div>
      )}
    </div>
  );
}
