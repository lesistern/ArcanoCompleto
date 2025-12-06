import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Dices, RefreshCw, X } from 'lucide-react';
import { DnDRace } from '@/lib/types/race';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { diceController } from '@/lib/dice/controller';

interface AbilityScoresStepProps {
    data: any;
    updateData: (key: string, value: number) => void;
    selectedRace: DnDRace | null;
}

type RollResult = {
    id: string; // Unique ID for assignment tracking
    total: number;
    dice: number[]; // The 4 dice rolled
    dropped: number; // The dropped die value
};

export function AbilityScoresStep({ data, updateData, selectedRace }: AbilityScoresStepProps) {
    const [method, setMethod] = useState<'manual' | 'standard' | 'pointbuy'>('manual');
    const [rolledPool, setRolledPool] = useState<RollResult[]>([]);
    const [isRolling, setIsRolling] = useState(false);
    const [assignments, setAssignments] = useState<Record<string, string>>({}); // attrKey -> rollId
    const [selectedRollId, setSelectedRollId] = useState<string | null>(null);

    const attributes = [
        { key: 'str', label: 'Fuerza', short: 'FUE', color: 'text-red-400', border: 'border-red-500/30' },
        { key: 'dex', label: 'Destreza', short: 'DES', color: 'text-green-400', border: 'border-green-500/30' },
        { key: 'con', label: 'Constitución', short: 'CON', color: 'text-orange-400', border: 'border-orange-500/30' },
        { key: 'int', label: 'Inteligencia', short: 'INT', color: 'text-blue-400', border: 'border-blue-500/30' },
        { key: 'wis', label: 'Sabiduría', short: 'SAB', color: 'text-indigo-400', border: 'border-indigo-500/30' },
        { key: 'cha', label: 'Carisma', short: 'CAR', color: 'text-purple-400', border: 'border-purple-500/30' }
    ];

    const getModifier = (score: number) => Math.floor((score - 10) / 2);
    const formatModifier = (mod: number) => mod >= 0 ? `+${mod}` : `${mod}`;

    const generateId = () => Math.random().toString(36).substr(2, 9);

    const rollSingleStat = (): RollResult => {
        const rolls = Array(4).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
        const sorted = [...rolls].sort((a, b) => b - a);
        const dropped = sorted.pop() || 0; // Remove lowest
        const total = sorted.reduce((a, b) => a + b, 0);
        return {
            id: generateId(),
            total,
            dice: rolls,
            dropped
        };
    };

    const rollDicePool = async () => {
        if (isRolling) return;
        setIsRolling(true);
        setAssignments({});
        setSelectedRollId(null);
        attributes.forEach(attr => updateData(attr.key, 10));

        // Clear previous 3D dice if any
        diceController.clear();

        const newPool: RollResult[] = [];
        setRolledPool([]); // Clear visualization

        try {
            // Roll 6 times, one for each stat
            for (let i = 0; i < 6; i++) {
                // Roll 4d6
                const result = await diceController.roll('4d6');

                let diceValues: number[] = [];

                if (Array.isArray(result)) {
                    diceValues = result.map((d: any) => d.value);
                } else if (result && Array.isArray(result.result)) {
                    diceValues = result.result.map((d: any) => typeof d === 'object' ? d.value : d);
                } else if (result && result.result) {
                    // single object sometimes? or just fallback
                    diceValues = Array.isArray(result.result) ? result.result : [];
                }

                if (diceValues.length !== 4) {
                    console.warn("Unexpected 3d dice result, fallback", result);
                    const fallback = rollSingleStat();
                    diceValues = fallback.dice;
                }

                const sorted = [...diceValues].sort((a, b) => b - a);
                const dropped = sorted.pop() || 0;
                const total = sorted.reduce((a, b) => a + b, 0);

                newPool.push({
                    id: generateId(),
                    total,
                    dice: diceValues,
                    dropped
                });

                // Update state to show this roll
                setRolledPool([...newPool]);

                // Small delay between rolls for effect
                await new Promise(r => setTimeout(r, 600));
            }
        } catch (error) {
            console.error("3D Dice roll failed, using fallback", error);
            // Complete the rest with fallback
            while (newPool.length < 6) {
                newPool.push(rollSingleStat());
            }
            setRolledPool([...newPool]);
        }

        setIsRolling(false);
    };

    const getRacialBonus = (attrKey: string) => {
        if (!selectedRace) return 0;
        const map: { [key: string]: string } = { str: 'strength', dex: 'dexterity', con: 'constitution', int: 'intelligence', wis: 'wisdom', cha: 'charisma' };
        return selectedRace.abilityModifiers?.[map[attrKey] as keyof typeof selectedRace.abilityModifiers] || 0;
    };

    const handleAssignment = (attrKey: string) => {
        if (selectedRollId) {
            // Assign selected roll to this attribute
            const newAssignments = { ...assignments };

            // If this roll was assigned elsewhere, remove it from there
            Object.keys(newAssignments).forEach(k => {
                if (newAssignments[k] === selectedRollId) delete newAssignments[k];
            });

            newAssignments[attrKey] = selectedRollId;
            setAssignments(newAssignments);

            // Update the actual character data
            const roll = rolledPool.find(r => r.id === selectedRollId);
            if (roll) updateData(attrKey, roll.total);

            setSelectedRollId(null);
        } else if (assignments[attrKey]) {
            // Unassign if clicking an assigned slot without a selection
            const newAssignments = { ...assignments };
            delete newAssignments[attrKey];
            setAssignments(newAssignments);
            updateData(attrKey, 10); // Reset to base 10 (or whatever default)
        }
    };

    const isRollAssigned = (id: string) => Object.values(assignments).includes(id);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Method Selector */}
            <div className="flex justify-center">
                <div className="flex bg-dungeon-950 p-1 rounded-lg border border-dungeon-800">
                    <button
                        onClick={() => setMethod('manual')}
                        className={cn("px-4 py-2 rounded-md transition-all text-sm font-bold", method === 'manual' ? 'bg-indigo-600 text-white shadow-lg' : 'text-dungeon-400 hover:text-dungeon-200')}
                    >
                        Manual / Tiradas
                    </button>
                    <button
                        onClick={() => setMethod('standard')}
                        className={cn("px-4 py-2 rounded-md transition-all text-sm font-bold", method === 'standard' ? 'bg-indigo-600 text-white shadow-lg' : 'text-dungeon-400 hover:text-dungeon-200')}
                    >
                        Array Estándar
                    </button>
                    <button
                        onClick={() => setMethod('pointbuy')}
                        className={cn("px-4 py-2 rounded-md transition-all text-sm font-bold", method === 'pointbuy' ? 'bg-indigo-600 text-white shadow-lg' : 'text-dungeon-400 hover:text-dungeon-200')}
                    >
                        Compra de Puntos
                    </button>
                </div>
            </div>

            {/* Manual Rolling Section */}
            {method === 'manual' && (
                <div className="space-y-6">
                    <Card className="bg-dungeon-900/50 border-dungeon-700 overflow-visible">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-dungeon-100 flex items-center gap-2">
                                        <Dices className="h-5 w-5 text-indigo-400" />
                                        Banco de Tiradas
                                    </h3>
                                    <p className="text-sm text-dungeon-400">
                                        Selecciona un valor y luego haz clic en el atributo deseado.
                                    </p>
                                </div>
                                <Button
                                    onClick={rollDicePool}
                                    disabled={isRolling}
                                    className="bg-indigo-600 hover:bg-indigo-500 min-w-[140px]"
                                >
                                    {isRolling ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Dices className="mr-2 h-4 w-4" />}
                                    {isRolling ? 'Tirando...' : 'Tirar Dados'}
                                </Button>
                            </div>

                            {rolledPool.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                                    {rolledPool.map((roll) => {
                                        const assigned = isRollAssigned(roll.id);
                                        const selected = selectedRollId === roll.id;

                                        return (
                                            <div
                                                key={roll.id}
                                                onClick={() => !assigned && setSelectedRollId(selected ? null : roll.id)}
                                                className={cn(
                                                    "relative group p-3 rounded-lg border transition-all cursor-pointer flex flex-col items-center justify-center gap-2",
                                                    selected
                                                        ? "bg-indigo-600/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)] scale-105"
                                                        : assigned
                                                            ? "bg-dungeon-950/30 border-dungeon-800 opacity-50 grayscale"
                                                            : "bg-dungeon-950 border-dungeon-700 hover:border-dungeon-500 hover:bg-dungeon-900"
                                                )}
                                            >
                                                <span className={cn("text-3xl font-bold font-heading", selected ? "text-indigo-300" : assigned ? "text-dungeon-600" : "text-dungeon-200")}>
                                                    {roll.total}
                                                </span>

                                                {/* Dice Detail */}
                                                <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {roll.dice.map((d, i) => (
                                                        <span key={i} className={cn("text-[9px] w-3 h-3 flex items-center justify-center rounded bg-dungeon-800", roll.dice.indexOf(roll.dropped) === i && roll.dice.filter(x => x === roll.dropped).length === 1 ? "text-red-500/50 line-through" : "")}>
                                                            {d}
                                                        </span>
                                                    ))}
                                                </div>

                                                {assigned && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Badge variant="outline" className="bg-dungeon-950/80 text-dungeon-400 border-dungeon-700 backdrop-blur-sm">
                                                            Asignado
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-dungeon-500 border-2 border-dashed border-dungeon-800 rounded-lg">
                                    Tira los dados para comenzar a generar tu personaje...
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {attributes.map((attr) => {
                            const currentRollId = assignments[attr.key];
                            const assignedRoll = currentRollId ? rolledPool.find(r => r.id === currentRollId) : null;
                            const baseScore = assignedRoll ? assignedRoll.total : 10;
                            const racialBonus = getRacialBonus(attr.key);
                            const totalScore = baseScore + racialBonus;
                            const modifier = getModifier(totalScore);

                            const isTargetable = selectedRollId !== null && !currentRollId;

                            return (
                                <div
                                    key={attr.key}
                                    onClick={() => (selectedRollId || currentRollId) && handleAssignment(attr.key)}
                                    className={cn(
                                        "bg-dungeon-950 border rounded-lg overflow-hidden flex flex-col transition-all duration-300",
                                        isTargetable ? "ring-2 ring-indigo-500 cursor-pointer animate-pulse bg-indigo-900/10" : "border-dungeon-800",
                                        currentRollId ? "border-dungeon-700" : "border-dashed"
                                    )}
                                >
                                    {/* Header */}
                                    <div className="bg-dungeon-900/80 p-3 flex items-center justify-between border-b border-dungeon-800">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("w-2 h-2 rounded-full", attr.color.replace('text-', 'bg-'))}></div>
                                            <span className="font-bold text-dungeon-100 uppercase tracking-wider text-sm">{attr.label}</span>
                                        </div>
                                        <span className={cn("text-xs font-bold font-mono px-1.5 py-0.5 rounded bg-dungeon-950 text-dungeon-400")}>
                                            {attr.short}
                                        </span>
                                    </div>

                                    {/* Main Score Display */}
                                    <div className="flex border-b border-dungeon-800">
                                        <div className="flex-1 p-4 bg-dungeon-900/30 border-r border-dungeon-800 flex flex-col items-center justify-center relative min-h-[80px]">
                                            <span className="text-[10px] text-dungeon-500 uppercase font-bold tracking-widest mb-1">Total</span>
                                            <span className={cn("text-4xl font-black font-heading", attr.color)}>
                                                {totalScore}
                                            </span>
                                        </div>
                                        <div className="flex-1 p-4 bg-dungeon-900/30 flex flex-col items-center justify-center min-h-[80px]">
                                            <span className="text-[10px] text-dungeon-500 uppercase font-bold tracking-widest mb-1">Mod</span>
                                            <span className="text-2xl font-bold text-dungeon-200">
                                                {formatModifier(modifier)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Base Calculation Footer */}
                                    <div className="p-3 bg-dungeon-950/50 space-y-2 text-xs">
                                        <div className="flex justify-between items-center text-dungeon-400">
                                            <span>Base (Tirada)</span>
                                            {currentRollId ? (
                                                <Badge variant="secondary" className="bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50 border-indigo-800 cursor-pointer group">
                                                    {baseScore}
                                                    <X className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100" />
                                                </Badge>
                                            ) : (
                                                <span className="text-dungeon-600 dark:text-dungeon-700 italic">--</span>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center text-dungeon-400">
                                            <span>Racial</span>
                                            <span className={cn(racialBonus !== 0 && "font-bold", racialBonus > 0 ? "text-green-400" : racialBonus < 0 ? "text-red-400" : "text-dungeon-600")}>
                                                {formatModifier(racialBonus)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Interaction Text */}
                                    {!currentRollId && selectedRollId && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-indigo-500/10 pointer-events-none fade-in">
                                            <span className="text-indigo-300 font-bold text-sm bg-dungeon-950/80 px-3 py-1 rounded-full border border-indigo-500/50 shadow-lg animate-bounce">
                                                Haz clic para asignar
                                            </span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {method !== 'manual' && (
                <Card>
                    <CardContent className="p-8 text-center text-dungeon-400">
                        <p>Los métodos "Array Estándar" y "Compra de Puntos" estarán disponibles próximamente.</p>
                        <Button variant="outline" className="mt-4" onClick={() => setMethod('manual')}>
                            Volver a Manual
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
