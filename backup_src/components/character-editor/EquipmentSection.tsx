'use client';

import { useState, useEffect } from 'react';
import { useCharacterStore } from '@/lib/store/characterStore';
import { getStartingEquipmentKitsByClass, type StartingEquipmentKit } from '@/lib/services/equipmentService.client';
import { Package, Edit, Check, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
  const [kits, setKits] = useState<StartingEquipmentKit[]>([]);
  const [loadingKits, setLoadingKits] = useState(false);

  // Obtener clase seleccionada (solo la primera, sin multiclase)
  const selectedClass = character.classes?.[0]?.class;

  // Cargar kits cuando cambia la clase seleccionada
  useEffect(() => {
    if (selectedClass?.slug) {
      setLoadingKits(true);
      getStartingEquipmentKitsByClass(selectedClass.slug).then((fetchedKits) => {
        setKits(fetchedKits);
        setLoadingKits(false);
      }).catch(err => {
        console.error('Error fetching equipment kits:', err);
        setKits([]);
        setLoadingKits(false);
      });
    } else {
      setKits([]);
    }
  }, [selectedClass?.slug]);
  const equipment = character.equipment ?? {
    weapons: [],
    armor: [],
    items: [],
    magicItems: [],
  };

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
        magicItems: [],
      },
    });
  };

  // Añadir item personalizado
  const handleAddCustomItem = () => {
    if (!customItem.name.trim()) return;

    const currentItems = equipment.items || [];

    updateCharacter({
      equipment: {
        ...equipment,
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
    const currentItems = equipment.items || [];
    const newItems = currentItems.filter((_, i) => i !== index);

    updateCharacter({
      equipment: {
        ...equipment,
        items: newItems,
      },
    });
  };

  // Verificar si hay clase seleccionada
  if (!selectedClass) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12 bg-dungeon-800/30 rounded-lg border border-dungeon-700 card">
          <Package className="w-16 h-16 text-dungeon-600 mx-auto mb-4" />
          <p className="text-dungeon-400 text-sm">
            Selecciona una clase en la pestaña "Información Básica" para ver opciones de equipo inicial
          </p>
        </div>
      </div>
    );
  }

  // Si está cargando los kits
  if (loadingKits) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12 bg-dungeon-800/30 rounded-lg border border-dungeon-700 card">
          <Package className="w-16 h-16 text-dungeon-600 mx-auto mb-4 animate-pulse" />
          <p className="text-dungeon-400 text-sm">
            Cargando kits de equipo...
          </p>
        </div>
      </div>
    );
  }

  // Si no hay kits disponibles para esta clase
  if (kits.length === 0 && !loadingKits) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12 bg-dungeon-800/30 rounded-lg border border-dungeon-700 card">
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
                p-4 rounded-lg border-2 transition-all cursor-pointer card
                ${selectedKit === index
                  ? 'border-gold-500 bg-gold-900/20'
                  : 'border-dungeon-700 bg-dungeon-800/50 hover:border-dungeon-600'
                }
              `}
              onClick={() => handleSelectKit(index)}
            >
              {/* Header del kit */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-gold-400 font-semibold text-sm flex items-center gap-2 font-heading">
                    <Package className="w-4 h-4" />
                    {kit.kit_name}
                  </h3>
                  <p className="text-dungeon-400 text-xs mt-1 line-clamp-2">
                    {kit.description || `Kit de equipamiento para ${selectedClass?.name || 'clase'}`}
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
                  <span className="text-gold-400 font-semibold">{kit.total_cost_gp} po</span>
                </div>
                <div className="bg-dungeon-900/50 rounded px-2 py-1">
                  <span className="text-dungeon-500">Peso:</span>{' '}
                  <span className="text-dungeon-300 font-semibold">{kit.total_weight_lb} lb</span>
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
          <div className="bg-dungeon-800/50 rounded-lg border border-dungeon-700 p-4 card">
            <h3 className="text-gold-400 font-semibold text-sm mb-3 flex items-center gap-2 font-heading">
              <Plus className="w-4 h-4" />
              Añadir Item
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={customItem.name}
                onChange={(e) => setCustomItem({ ...customItem, name: e.target.value })}
                placeholder="Nombre del item..."
                className="flex-1 input"
              />
              <input
                type="number"
                min="1"
                value={customItem.quantity}
                onChange={(e) => setCustomItem({ ...customItem, quantity: parseInt(e.target.value) || 1 })}
                className="w-20 input text-center"
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
          <div className="bg-dungeon-800/50 rounded-lg border border-dungeon-700 p-4 card">
            <h3 className="text-gold-400 font-semibold text-sm mb-3 font-heading">
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
              <p className="text-green-400 font-semibold text-sm font-heading">
                Kit "{kits[selectedKit].kit_name}" seleccionado
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
            variant="primary"
            size="lg"
          >
            ✓ Listo
          </Button>
        </div>
      )}
    </div>
  );
}
