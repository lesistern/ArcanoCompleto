"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Play, Trash2, Plus, Minus, X, AlertTriangle } from 'lucide-react';
import { diceController } from "@/lib/dice/controller";
import { D4Icon, D6Icon, D8Icon, D10Icon, D12Icon, D20Icon } from "@/lib/utils/diceIcons";

const DIES = [
    { type: "d4", icon: <D4Icon className="w-5 h-5" /> },
    { type: "d6", icon: <D6Icon className="w-5 h-5" /> },
    { type: "d8", icon: <D8Icon className="w-5 h-5" /> },
    { type: "d10", icon: <D10Icon className="w-5 h-5" /> },
    { type: "d12", icon: <D12Icon className="w-5 h-5" /> },
    { type: "d20", icon: <D20Icon className="w-5 h-5" /> },
    {
        type: "d100",
        icon: (
            <div className="relative flex items-center justify-center">
                <D10Icon className="w-5 h-5 opacity-30" />
                <span className="absolute text-[9px] font-bold">%</span>
            </div>
        )
    },
];

export default function DiceLauncher() {
    const [isOpen, setIsOpen] = useState(false);
    const [pool, setPool] = useState<string[]>([]);
    const [modifier, setModifier] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [placeholder, setPlaceholder] = useState("Ej: 4d6+2d20+3");

    // const [lastRoll, setLastRoll] = useState<{ total: number, notation: string } | null>(null);
    const [advMode, setAdvMode] = useState<'normal' | 'ven' | 'des'>('normal');

    // Alert/Notification State (replaces modals and browser alerts)
    type AlertState = {
        type: 'error' | 'warning';
        message: string;
        action?: {
            label: string;
            onClick: () => void;
        };
    };
    const [alertState, setAlertState] = useState<AlertState | null>(null);

    const [limitOverride, setLimitOverride] = useState(false);
    const [pendingDie, setPendingDie] = useState<string | null>(null);

    // Generate random placeholder on mount
    useEffect(() => {
        const types = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
        const r1 = Math.floor(Math.random() * 3) + 1;
        const d1 = types[Math.floor(Math.random() * types.length)];
        const r2 = Math.floor(Math.random() * 2) + 1;
        const d2 = types[Math.floor(Math.random() * types.length)];
        const mod = Math.floor(Math.random() * 5) + 1;
        setPlaceholder(`Ej: ${r1}${d1} + ${r2}${d2} + ${mod}`);
    }, []);

    // Helper to calculate notation string from pool/mod logic
    const calculateNotation = (currentPool: string[], currentMod: number) => {
        if (currentPool.length === 0 && currentMod === 0) return "";

        const counts = currentPool.reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const parts = Object.entries(counts).map(([type, count]) => `${count}${type}`);
        let notation = parts.join(' + ');

        if (currentMod !== 0) {
            notation += (notation ? ' ' : '') + (currentMod > 0 ? `+ ${currentMod}` : `- ${Math.abs(currentMod)}`);
        }
        return notation;
    };

    // Update input value when pool or modifier changes (one-way sync)
    useEffect(() => {
        const newVal = calculateNotation(pool, modifier);
        // Buttons override manual input.
        setInputValue(newVal);
    }, [pool, modifier]);


    const handleAddDie = (type: string) => {
        if (pool.length >= 20 && !limitOverride) {
            setPendingDie(type);
            setAlertState({
                type: 'warning',
                message: "Lanzar más de 20 dados podría causar lentitud. ¿Continuar?",
                action: {
                    label: "Arriesgarse",
                    onClick: handleAcceptRisk
                }
            });
            return;
        }
        setPool([...pool, type]);
    };

    const handleAcceptRisk = () => {
        setLimitOverride(true);
        if (pendingDie) {
            setPool([...pool, pendingDie]);
            setAlertState(null);
            setPendingDie(null);
        } else {
            // Triggered by roll action, so we execute the roll with force=true
            setAlertState(null);
            // We need to pass clean state or just force.
            // Since handleRoll reads from state which hasn't updated limitOverride yet in this closure if we rely on it,
            // we pass an explicit force flag.
            handleRoll(true);
        }
    };

    const handleCancelRisk = () => {
        setAlertState(null);
        setPendingDie(null);
    };

    const handleClear = () => {
        setPool([]);
        setModifier(0);
        setInputValue("");
        setAdvMode('normal');
        setLimitOverride(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const hasD20 = pool.includes('d20') || inputValue.includes('d20');

    const toggleAdvMode = () => {
        if (!hasD20) return;
        setAdvMode(current => {
            if (current === 'normal') return 'ven';
            if (current === 'ven') return 'des';
            return 'normal';
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleRoll();
        }
    };

    const handleRoll = async (force: boolean = false) => {
        if (!inputValue && modifier === 0 && pool.length === 0) return;

        // Use inputValue as the source of truth if populated, otherwise generate from pool
        let rollNotation = inputValue || calculateNotation(pool, modifier);
        let displayNotation = rollNotation;

        // Logic for Advantage/Disadvantage
        const applyingAdvantage = (advMode !== 'normal') && hasD20;

        if (applyingAdvantage) {
            if (rollNotation.includes('1d20')) {
                rollNotation = rollNotation.replace('1d20', '2d20');
            } else if (/\bd20\b/.test(rollNotation) && !/\b[0-9]+d20\b/.test(rollNotation)) {
                rollNotation = rollNotation.replace(/\bd20\b/, '2d20');
            } else if (/^\s*d20/.test(rollNotation)) {
                rollNotation = rollNotation.replace(/^\s*d20/, '2d20');
            }
            displayNotation += ` (${advMode === 'ven' ? 'ADV' : 'DES'})`;
        }

        // Parse notation to count dice and validate limits
        const cleanStr = rollNotation.replace(/\s+/g, '');
        const regex = /([+-]?)([^+-]+)/g;
        let match;
        const diceTerms: string[] = [];
        let modifierTotal = 0;
        let totalDiceCount = 0;

        while ((match = regex.exec(cleanStr)) !== null) {
            const sign = match[1] === '-' ? -1 : 1;
            const term = match[2];

            if (term.toLowerCase().includes('d')) {
                let diceTerm = term;
                if (/^d\d/.test(diceTerm)) {
                    diceTerm = '1' + diceTerm;
                }

                // Validate Die Type
                const parts = diceTerm.toLowerCase().split('d');
                const dieType = parseInt(parts[1]);
                const validDice = [4, 6, 8, 10, 12, 20, 100];

                if (isNaN(dieType) || !validDice.includes(dieType)) {
                    setAlertState({
                        type: 'error',
                        message: `d${parts[1]} no es válido. Usa: d4, d6, d8, d10, d12, d20, % (2d10).`
                    });
                    // Ensure panel is open so user sees context
                    setIsOpen(true);
                    return;
                }

                diceTerms.push(diceTerm);

                // Count dice
                const count = parseInt(parts[0]);
                if (!isNaN(count)) totalDiceCount += count;
            } else {
                const num = parseInt(term);
                if (!isNaN(num)) {
                    modifierTotal += (sign * num);
                }
            }
        }

        // Validation Checks
        if (totalDiceCount > 100) {
            // Hard limit
            setAlertState({
                type: 'error',
                message: "No puedes lanzar más de 100 dados a la vez."
            });
            setIsOpen(true);
            return;
        }

        if (totalDiceCount > 20 && !limitOverride && !force) {
            // Soft limit warning
            setAlertState({
                type: 'warning',
                message: "Más de 20 dados pueden causar lag. ¿Confirmar?",
                action: {
                    label: "Lanzar",
                    onClick: () => handleAcceptRisk() // will trigger handleRoll(true) logic inside handleAcceptRisk logic if pendingDie is null? 
                    // NO: handleAcceptRisk logic: if pendingDie is null, it calls handleRoll(true).
                }
            });
            setIsOpen(true);
            return;
        }

        console.log("DiceLauncher: Rolling", rollNotation);

        setIsOpen(false);
        handleClear();

        // Output fallback if empty
        if (diceTerms.length === 0) {
            diceController.showResult({ total: modifierTotal, notation: displayNotation });
            setTimeout(() => diceController.showResult(null), 8000);
            return;
        }

        try {
            const rawResult = await diceController.roll(diceTerms);
            let diceSum = 0;



            // Flatten all results
            let allDieResults: any[] = [];
            const normalize = (data: any) => {
                if (Array.isArray(data)) {
                    data.forEach(normalize);
                } else if (data.rolls && Array.isArray(data.rolls)) {
                    // Grouped result (some versions of dice-box)
                    data.rolls.forEach((r: any) => allDieResults.push({ ...r, sides: data.sides || r.sides }));
                } else if (data.value !== undefined) {
                    // Single die result
                    allDieResults.push(data);
                }
            };
            normalize(rawResult);

            if (applyingAdvantage) {
                const d20s = allDieResults.filter(d => d.sides === 20);
                const others = allDieResults.filter(d => d.sides !== 20);

                // Sum all non-d20 dice
                diceSum += others.reduce((acc, d) => acc + (d.value || 0), 0);

                if (d20s.length > 0) {
                    const values = d20s.map(d => d.value);
                    // Pick best/worst d20
                    const picked = advMode === 'ven' ? Math.max(...values) : Math.min(...values);
                    diceSum += picked;
                    console.log(`Advantage Applied: d20 values [${values.join(', ')}]. Picked ${picked}.`);
                }
            } else {
                diceSum = allDieResults.reduce((acc, d) => acc + (d.value || 0), 0);
            }

            const finalTotal = diceSum + modifierTotal;



            diceController.showResult({
                total: finalTotal,
                notation: displayNotation
            });

            setTimeout(() => {
                diceController.showResult(null);
            }, 8000);

        } catch (error) {
            console.error("Roll failed", error);
        }
    };

    return (
        <>
            {/* Result Display Overlay - Moved to DiceOverlay.tsx via diceController */}

            <div className="relative flex justify-end">
                {/* Stack Popup Container */}
                <div className="absolute bottom-full right-0 mb-3 flex flex-col-reverse items-end gap-2 w-[280px] z-50 pointer-events-none">

                    {/* Panel Expandido */}
                    {isOpen && (
                        <div className="pointer-events-auto bg-dungeon-900 border border-gold-500 rounded-xl p-4 w-full shadow-2xl animate-in slide-in-from-bottom-2 fade-in duration-200">
                            {/* Header: Input Display */}
                            <div className="mb-4 bg-dungeon-950 p-2 rounded-lg border border-dungeon-700 min-h-[40px] flex items-center justify-between gap-2">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder={placeholder}
                                        className="w-full bg-transparent border-none outline-none text-gold-400 font-mono text-sm placeholder:text-dungeon-600/50"
                                    />
                                    {advMode !== 'normal' && (
                                        <span className={`absolute right-0 top-1/2 -translate-y-1/2 text-[10px] px-1 rounded border mr-1 ${advMode === 'ven' ? 'text-green-400 border-green-500/30 bg-green-900/40' : 'text-red-400 border-red-500/30 bg-red-900/40'
                                            }`}>
                                            {advMode === 'ven' ? 'VEN' : 'DES'}
                                        </span>
                                    )}
                                </div>
                                {(inputValue.length > 0 || pool.length > 0) && (
                                    <button onClick={handleClear} className="text-red-400 hover:text-red-300 p-1 flex-shrink-0">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Grid de Dados */}
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {DIES.map((die) => (
                                    <button
                                        key={die.type}
                                        onClick={() => handleAddDie(die.type)}
                                        className="flex flex-col items-center justify-center p-2 rounded bg-dungeon-800 hover:bg-dungeon-700 border border-dungeon-600 hover:border-gold-500/50 transition-colors"
                                    >
                                        <div className="text-dungeon-200">{die.icon}</div>
                                        <span className="text-[10px] text-dungeon-400 mt-1 uppercase">{die.type}</span>
                                    </button>
                                ))}
                                {/* Adv/Dis Toggle Button - 8th Slot */}
                                <button
                                    onClick={toggleAdvMode}
                                    disabled={!hasD20}
                                    className={`flex flex-col items-center justify-center p-2 rounded border transition-colors ${!hasD20
                                        ? 'bg-dungeon-800/50 border-dungeon-800 text-dungeon-600 cursor-not-allowed'
                                        : advMode === 'normal'
                                            ? 'bg-dungeon-800 border-dungeon-600 text-dungeon-500 hover:border-dungeon-500'
                                            : advMode === 'ven'
                                                ? 'bg-green-950/40 border-green-500/50 text-green-400 hover:bg-green-900/60'
                                                : 'bg-red-950/40 border-red-500/50 text-red-400 hover:bg-red-900/60'
                                        }`}
                                >
                                    <div className="text-sm font-bold">
                                        {advMode === 'normal' ? '—' : advMode === 'ven' ? 'VEN' : 'DES'}
                                    </div>
                                    <span className="text-[9px] mt-1 uppercase opacity-70">
                                        {!hasD20 ? 'NO D20' : advMode === 'normal' ? 'MODE' : advMode === 'ven' ? 'ADV' : 'DIS'}
                                    </span>
                                </button>
                            </div>

                            {/* Modificadores y Acción */}
                            <div className="flex items-center gap-3">
                                {/* Modifier Controls */}
                                <div className="flex items-center bg-dungeon-800 rounded-lg border border-dungeon-600 overflow-hidden">
                                    <button
                                        onClick={() => setModifier(m => m - 1)}
                                        className="p-2 hover:bg-dungeon-700 text-dungeon-300"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-8 text-center text-sm font-mono text-dungeon-200">
                                        {modifier > 0 ? '+' : ''}{modifier}
                                    </span>
                                    <button
                                        onClick={() => setModifier(m => m + 1)}
                                        className="p-2 hover:bg-dungeon-700 text-dungeon-300"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Roll Button */}
                                <button
                                    onClick={() => handleRoll()}
                                    disabled={inputValue.trim().length === 0 && pool.length === 0 && modifier === 0}
                                    className={`
                                        flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-bold text-sm
                                        transition-all duration-200
                                        ${(inputValue.trim().length > 0 || pool.length > 0 || modifier !== 0)
                                            ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg transform hover:scale-105'
                                            : 'bg-dungeon-800 text-dungeon-500 cursor-not-allowed'}
                                    `}
                                >
                                    <Play className="w-4 h-4" />
                                    LANZAR
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Alerts (Stacked above panel) */}
                    {alertState && (
                        <div className={`
                            pointer-events-auto w-full p-3 rounded-lg border shadow-lg animate-in slide-in-from-bottom-2 fade-in duration-200
                            flex flex-col gap-2 items-start
                            ${alertState.type === 'error' ? 'bg-red-950/90 border-red-500 text-red-100' : 'bg-yellow-900/90 border-yellow-500 text-yellow-100'}
                        `}>
                            <div className="flex items-start gap-2 w-full">
                                <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${alertState.type === 'error' ? 'text-red-400' : 'text-yellow-400'}`} />
                                <span className="text-xs font-medium leading-tight">{alertState.message}</span>
                                <button
                                    onClick={() => handleCancelRisk()}
                                    className="ml-auto text-white/50 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {alertState.action && (
                                <div className="flex gap-2 w-full mt-1">
                                    <button
                                        onClick={() => handleCancelRisk()}
                                        className="flex-1 py-1 px-2 text-xs rounded bg-black/20 hover:bg-black/40 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={alertState.action.onClick}
                                        className={`flex-1 py-1 px-2 text-xs rounded font-bold transition-colors ${alertState.type === 'error'
                                                ? 'bg-red-600 hover:bg-red-500 text-white'
                                                : 'bg-yellow-600 hover:bg-yellow-500 text-black'
                                            }`}
                                    >
                                        {alertState.action.label}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Botón Principal (Toggle) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        flex items-center justify-center
                        w-14 h-14 rounded-full shadow-lg overflow-hidden
                        transition-all duration-300 ease-in-out
                        hover:scale-110 active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-dungeon-900
                        ${isOpen
                            ? 'bg-dungeon-800 text-dungeon-400 rotate-90 border-2 border-dungeon-600'
                            : 'bg-dungeon-900 border-2 border-red-500/30'}
                    `}
                    title="Lanzador de Dados"
                >
                    {isOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <div className="w-full h-full p-2 relative">
                            <Image
                                src="/d20-dice.png"
                                alt="D20"
                                width={56}
                                height={56}
                                className="w-full h-full object-contain"
                                style={{ filter: 'invert(35%) sepia(100%) saturate(1000%) hue-rotate(330deg)' }}
                            />
                        </div>
                    )}
                </button>
            </div>
        </>
    );
}
