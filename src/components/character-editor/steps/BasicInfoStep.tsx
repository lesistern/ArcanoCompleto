import React, { useEffect } from 'react';
import { Sparkles, Lock } from 'lucide-react';
import { generateFantasyName } from '@/lib/utils/name-generator';
import { DnDRace } from '@/lib/types/race';

interface BasicInfoStepProps {
    data: any;
    updateData: (key: string, value: any) => void;
    selectedRace: DnDRace | null;
    selectedClass: any | null;
}

export function BasicInfoStep({ data, updateData, selectedRace, selectedClass }: BasicInfoStepProps) {
    const allAlignments = [
        'Legal Bueno', 'Neutral Bueno', 'Caótico Bueno',
        'Legal Neutral', 'Neutral', 'Caótico Neutral',
        'Legal Malvado', 'Neutral Malvado', 'Caótico Malvado'
    ];

    // Filter alignments based on Class regulations (D&D 3.5 SRD)
    const getAllowedAlignments = () => {
        if (!selectedClass) return allAlignments;
        const className = selectedClass.name.toLowerCase();

        if (className.includes('paladín')) return ['Legal Bueno'];
        if (className.includes('bárbaro')) return allAlignments.filter(a => !a.startsWith('Legal'));
        if (className.includes('bardo')) return allAlignments.filter(a => !a.startsWith('Legal'));
        if (className.includes('monje')) return allAlignments.filter(a => a.startsWith('Legal'));
        if (className.includes('druida')) return ['Neutral Bueno', 'Legal Neutral', 'Neutral', 'Caótico Neutral', 'Neutral Malvado'];

        return allAlignments;
    };

    const allowedAlignments = getAllowedAlignments();

    // Auto-set Size based on Race
    useEffect(() => {
        if (selectedRace && selectedRace.size && data.size !== selectedRace.size) {
            updateData('size', selectedRace.size);
        }
    }, [selectedRace, data.size, updateData]);


    const handleGenerateName = () => {
        const newName = generateFantasyName();
        updateData('name', newName);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Logic Feedback */}
            {(selectedRace || selectedClass) && (
                <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-lg flex gap-4 text-sm text-indigo-200">
                    {selectedRace && (
                        <div>
                            <span className="font-bold text-indigo-400">Raza:</span> {selectedRace.name}
                            <span className="opacity-70 ml-1">(Define Tám. y Edad)</span>
                        </div>
                    )}
                    {selectedClass && (
                        <div>
                            <span className="font-bold text-red-400">Clase:</span> {selectedClass.name}
                            <span className="opacity-70 ml-1">(Restringe Alineamiento)</span>
                        </div>
                    )}
                </div>
            )}

            {/* Fila 1: Nombres */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-dungeon-300">Nombre del Personaje</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => updateData('name', e.target.value)}
                            className="w-full bg-dungeon-950 border border-dungeon-700 rounded-md px-3 py-2 text-dungeon-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-dungeon-600 pr-10"
                            placeholder="Ej: Aragorn"
                        />
                        <button
                            onClick={handleGenerateName}
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-dungeon-400 hover:text-indigo-400 bg-dungeon-800/50 hover:bg-dungeon-800 rounded transition-colors"
                            title="Generar nombre aleatorio"
                        >
                            <Sparkles className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-dungeon-300">Nombre del Jugador</label>
                    <input
                        type="text"
                        value={data.playerName}
                        onChange={(e) => updateData('playerName', e.target.value)}
                        className="w-full bg-dungeon-950 border border-dungeon-700 rounded-md px-3 py-2 text-dungeon-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-dungeon-600"
                        placeholder="Tu nombre"
                    />
                </div>
            </div>

            {/* Fila 2: Detalles Roleros */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-dungeon-300">Alineamiento</label>
                    <select
                        value={data.alignment}
                        onChange={(e) => updateData('alignment', e.target.value)}
                        className="w-full bg-dungeon-950 border border-dungeon-700 rounded-md px-3 py-2 text-dungeon-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="">Selecciona</option>
                        {allowedAlignments.map(a => (
                            <option key={a} value={a}>{a}</option>
                        ))}
                    </select>
                    {selectedClass && allowedAlignments.length < 9 && (
                        <p className="text-xs text-dungeon-400 mt-1">
                            * Restringido por la clase {selectedClass.name}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-dungeon-300">Deidad</label>
                    <input
                        type="text"
                        value={data.deity}
                        onChange={(e) => updateData('deity', e.target.value)}
                        className="w-full bg-dungeon-950 border border-dungeon-700 rounded-md px-3 py-2 text-dungeon-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-dungeon-600"
                        placeholder="Ej: Pelor"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-dungeon-300">Campaña</label>
                    <input
                        type="text"
                        value={data.campaign}
                        onChange={(e) => updateData('campaign', e.target.value)}
                        className="w-full bg-dungeon-950 border border-dungeon-700 rounded-md px-3 py-2 text-dungeon-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-dungeon-600"
                        placeholder="Ej: La Tumba de los Horrores"
                    />
                </div>
            </div>

            {/* Fila 3: Físico y Edad */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-dungeon-300 flex items-center gap-2">
                        Tamaño
                        {selectedRace && <Lock className="h-3 w-3 text-dungeon-500" />}
                    </label>
                    <select
                        value={data.size}
                        onChange={(e) => updateData('size', e.target.value)}
                        disabled={!!selectedRace}
                        className={`w-full bg-dungeon-950 border border-dungeon-700 rounded-md px-3 py-2 text-dungeon-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${selectedRace ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <option value="">Selecciona</option>
                        <option value="Minúsculo">Minúsculo</option>
                        <option value="Diminuto">Diminuto</option>
                        <option value="Menudo">Menudo</option>
                        <option value="Pequeño">Pequeño</option>
                        <option value="Mediano">Mediano</option>
                        <option value="Grande">Grande</option>
                        <option value="Enorme">Enorme</option>
                        <option value="Gargantuesco">Gargantuesco</option>
                        <option value="Colosal">Colosal</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-dungeon-300">Edad</label>
                    <input
                        type="text"
                        value={data.age}
                        onChange={(e) => updateData('age', e.target.value)}
                        className="w-full bg-dungeon-950 border border-dungeon-700 rounded-md px-3 py-2 text-dungeon-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-dungeon-600"
                        placeholder="Ej: 25"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-dungeon-300">Sexo</label>
                    <select
                        value={data.gender}
                        onChange={(e) => updateData('gender', e.target.value)}
                        className="w-full bg-dungeon-950 border border-dungeon-700 rounded-md px-3 py-2 text-dungeon-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="">Selecciona</option>
                        <option value="Hombre">Hombre</option>
                        <option value="Mujer">Mujer</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-dungeon-300">Altura</label>
                    <input
                        type="text"
                        value={data.height}
                        onChange={(e) => updateData('height', e.target.value)}
                        className="w-full bg-dungeon-950 border border-dungeon-700 rounded-md px-3 py-2 text-dungeon-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-dungeon-600"
                        placeholder="Ej: 1.80m"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-dungeon-300">Peso</label>
                    <input
                        type="text"
                        value={data.weight}
                        onChange={(e) => updateData('weight', e.target.value)}
                        className="w-full bg-dungeon-950 border border-dungeon-700 rounded-md px-3 py-2 text-dungeon-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-dungeon-600"
                        placeholder="Ej: 80kg"
                    />
                </div>
            </div>
        </div>
    );
}
