import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Backpack, Coins } from 'lucide-react';

interface EquipmentStepProps {
    data: any;
    updateData: (key: string, value: any) => void;
    selectedClass: any;
}

export function EquipmentStep({ data, updateData, selectedClass }: EquipmentStepProps) {
    const [selectedMethod, setSelectedMethod] = useState<'starting' | 'gold'>(data.equipmentMethod || 'starting');

    // Default D&D 3.5 gold by class reference (simplified)
    const getStartingGold = (className: string) => {
        const lowerName = className?.toLowerCase() || '';
        if (lowerName.includes('bárbaro')) return '4d4 x 10';
        if (lowerName.includes('bardo')) return '4d4 x 10';
        if (lowerName.includes('clérigo')) return '5d4 x 10';
        if (lowerName.includes('druida')) return '2d4 x 10';
        if (lowerName.includes('guerrero')) return '6d4 x 10';
        if (lowerName.includes('monje')) return '5d4';
        if (lowerName.includes('paladín')) return '6d4 x 10';
        if (lowerName.includes('explorador')) return '6d4 x 10';
        if (lowerName.includes('pícaro')) return '5d4 x 10';
        if (lowerName.includes('hechicero')) return '3d4 x 10';
        if (lowerName.includes('mago')) return '3d4 x 10';
        return '4d4 x 10'; // Default rough average
    };

    useEffect(() => {
        updateData('equipmentMethod', selectedMethod);
    }, [selectedMethod, updateData]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                    onClick={() => setSelectedMethod('starting')}
                    className={`cursor-pointer border rounded-xl p-6 transition-all hover:scale-[1.02] ${selectedMethod === 'starting' ? 'bg-indigo-900/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-dungeon-900/50 border-dungeon-700 hover:border-dungeon-500'}`}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-full ${selectedMethod === 'starting' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-dungeon-800 text-dungeon-400'}`}>
                            <Backpack className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className={`text-xl font-bold ${selectedMethod === 'starting' ? 'text-indigo-100' : 'text-dungeon-200'}`}>Equipo Inicial</h3>
                            <p className="text-sm text-dungeon-400">Basado en tu clase</p>
                        </div>
                    </div>
                    <p className="text-dungeon-300 mb-4">
                        Recibe el paquete estándar de equipo sugerido para la clase <strong>{selectedClass?.name || 'seleccionada'}</strong>. Incluye armadura básica, armas y herramientas de aventurero.
                    </p>
                    <ul className="text-sm text-dungeon-400 list-disc list-inside space-y-1">
                        <li>Ahorra tiempo eligiendo</li>
                        <li>Equilibrado para nivel 1</li>
                        <li>Incluye mochila básica</li>
                    </ul>
                </div>

                <div
                    onClick={() => setSelectedMethod('gold')}
                    className={`cursor-pointer border rounded-xl p-6 transition-all hover:scale-[1.02] ${selectedMethod === 'gold' ? 'bg-gold-900/20 border-gold-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'bg-dungeon-900/50 border-dungeon-700 hover:border-dungeon-500'}`}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-full ${selectedMethod === 'gold' ? 'bg-gold-500/20 text-gold-400' : 'bg-dungeon-800 text-dungeon-400'}`}>
                            <Coins className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className={`text-xl font-bold ${selectedMethod === 'gold' ? 'text-gold-100' : 'text-dungeon-200'}`}>Oro Inicial</h3>
                            <p className="text-sm text-dungeon-400">Comprar equipo manualmente</p>
                        </div>
                    </div>
                    <p className="text-dungeon-300 mb-4">
                        Comienza con una bolsa de oro y compra cada objeto individualmente. El monto depende de tu clase.
                    </p>
                    <div className="bg-dungeon-950/50 p-3 rounded text-center border border-dungeon-800">
                        <span className="text-dungeon-400 text-sm">Tu oro inicial estimado:</span>
                        <div className="text-2xl font-bold text-gold-400 mt-1">
                            {getStartingGold(selectedClass?.name)} <span className="text-sm font-normal text-gold-600">po</span>
                        </div>
                    </div>
                </div>
            </div>

            {selectedMethod === 'gold' && (
                <div className="p-4 bg-yellow-900/10 border border-yellow-700/30 rounded-lg text-yellow-200 text-sm">
                    <p>⚠️ Nota: Al seleccionar esta opción, deberás ir a la pestaña de "Inventario" de tu hoja de personaje finalizada para comprar los objetos.</p>
                </div>
            )}
        </div>
    );
}
