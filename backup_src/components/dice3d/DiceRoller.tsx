'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Loader2, AlertCircle, Dices, Trash2, Plus, Minus, Settings, Palette, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { D4Icon, D6Icon, D8Icon, D10Icon, D12Icon, D20Icon } from '@/lib/utils/diceIcons';
import { useAuth } from '@/hooks/useAuth';

declare global {
    interface Window {
        DICE?: any;
        $t?: any;
        THREE?: any;
    }
}

const DICE_TYPES = [
    { type: 'd4', label: 'd4', color: 'text-red-400', icon: D4Icon },
    { type: 'd6', label: 'd6', color: 'text-blue-400', icon: D6Icon },
    { type: 'd8', label: 'd8', color: 'text-green-400', icon: D8Icon },
    { type: 'd10', label: 'd10', color: 'text-purple-400', icon: D10Icon },
    { type: 'd12', label: 'd12', color: 'text-orange-400', icon: D12Icon },
    { type: 'd20', label: 'd20', color: 'text-gold-400', icon: D20Icon },
    { type: 'd100', label: 'd100', color: 'text-gray-400', icon: D10Icon },
];

const DICE_PRESETS = [
    { name: 'Clásico', dice: '#f5f5f5', label: '#000000' },
    { name: 'Magma', dice: '#991b1b', label: '#000000' },
    { name: 'Océano', dice: '#1e3a8a', label: '#22d3ee' },
    { name: 'Bosque', dice: '#14532d', label: '#fbbf24' },
    { name: 'Real', dice: '#581c87', label: '#fbbf24' },
    { name: 'Hueso', dice: '#f5f5dc', label: '#000000' },
    { name: 'Galaxia', dice: '#312e81', label: '#e2e8f0' },
    { name: 'Sangre', dice: '#7f1d1d', label: '#ffffff' },
    { name: 'Sombra', dice: '#1f2937', label: '#000000' },
    { name: 'Luz', dice: '#ffffff', label: '#fbbf24' },
];

const MATERIAL_PRESETS = [
    { name: 'Plástico', options: { specular: 0x172022, shininess: 40, shading: 1 } },
    { name: 'Metal', options: { specular: 0xffffff, shininess: 300, shading: 2 } },
    { name: 'Cristal', options: { specular: 0xffffff, shininess: 100, shading: 2, transparent: true, opacity: 0.6 } },
    { name: 'Madera', options: { specular: 0x000000, shininess: 0, shading: 1 } },
];

type RollMode = 'normal' | 'advantage' | 'disadvantage';

export default function DiceRoller() {
    const containerRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<any>(null);
    const [scriptsLoaded, setScriptsLoaded] = useState({
        three: false,
        cannon: false,
        teal: false,
        dice: false
    });
    const [isInitialized, setIsInitialized] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastResult, setLastResult] = useState<{ total: number, details: string, mode: RollMode } | null>(null);
    const [isRolling, setIsRolling] = useState(false);
    const [modifier, setModifier] = useState(0);

    const { tier } = useAuth();
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [theme, setTheme] = useState({
        dice_color: '#202020',
        label_color: '#aaaaaa',
        material: { specular: 0x172022, shininess: 40, shading: 1 }
    });

    const [diceCounts, setDiceCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        if (scriptsLoaded.three && scriptsLoaded.cannon && scriptsLoaded.teal && scriptsLoaded.dice && !isInitialized) {
            initializeDiceBox();
        }
    }, [scriptsLoaded, isInitialized]);

    const initializeDiceBox = () => {
        try {
            if (containerRef.current && window.DICE) {
                containerRef.current.innerHTML = '';
                const box = new window.DICE.dice_box(containerRef.current);
                boxRef.current = box;
                setIsInitialized(true);
                // Auto-roll to show dice immediately
                setTimeout(() => {
                    rollDice('1d20', 'normal');
                }, 500);
            }
        } catch (err) {
            setError('Error initializing dice engine: ' + (err as Error).message);
        }
    };

    const updateCount = (type: string, delta: number) => {
        setDiceCounts(prev => {
            const newCount = (prev[type] || 0) + delta;
            if (newCount <= 0) {
                const { [type]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [type]: newCount };
        });
    };

    const getPoolNotation = () => {
        return Object.entries(diceCounts)
            .map(([type, count]) => {
                if (type === 'd100') {
                    return `${count}d10+${count}d100`;
                }
                return `${count}${type}`;
            })
            .join('+');
    };

    const rollDice = (notation: string, mode: RollMode = 'normal') => {
        if (!boxRef.current) return;

        setIsRolling(true);
        setLastResult(null);

        try {
            boxRef.current.setDice(notation);
            boxRef.current.start_throw(
                () => { },
                (notationResult: any) => {
                    setIsRolling(false);
                    const results = notationResult.result || [];
                    const types = notationResult.set || [];

                    let total = 0;
                    let details = '';

                    if (mode === 'advantage') {
                        const [r1, r2] = results;
                        const roll = Math.max(r1, r2);
                        total = roll + modifier;
                        details = `(Advantage: ${r1}, ${r2})`;
                    } else if (mode === 'disadvantage') {
                        const [r1, r2] = results;
                        const roll = Math.min(r1, r2);
                        total = roll + modifier;
                        details = `(Disadvantage: ${r1}, ${r2})`;
                    } else {
                        const roll = results.reduce((a: number, b: number) => a + b, 0);
                        total = roll + modifier;
                        const breakdown = results.map((r: number, i: number) => `${types[i]}: ${r}`).join(', ');
                        details = `(${breakdown})`;
                    }

                    if (modifier !== 0) {
                        details += ` ${modifier >= 0 ? '+' : '-'} ${Math.abs(modifier)}`;
                    }

                    setLastResult({ total, details, mode });
                }
            );
        } catch (e) {
            setError('Error rolling dice: ' + (e as Error).message);
            setIsRolling(false);
        }
    };

    const handlePoolRoll = () => {
        const notation = getPoolNotation();
        if (!notation) return;
        rollDice(notation, 'normal');
    };

    const handleD20Roll = (mode: RollMode) => {
        if (mode === 'normal') rollDice('1d20', 'normal');
        else rollDice('2d20', mode);
    };

    const clearDice = () => {
        setLastResult(null);
        setDiceCounts({});
        setModifier(0);
    };

    const applyTheme = () => {
        if (window.DICE && window.DICE.set_theme) {
            window.DICE.set_theme(theme);
        }
        setShowCustomizer(false);
    };

    useEffect(() => {
        if (showCustomizer && window.DICE && window.DICE.set_theme && boxRef.current && isInitialized) {
            window.DICE.set_theme(theme);
            setTimeout(() => {
                rollDice('1d20', 'normal');
            }, 100);
        }
    }, [theme.dice_color, theme.label_color, theme.material]);

    useEffect(() => {
        if (showCustomizer && boxRef.current && isInitialized) {
            setTimeout(() => {
                rollDice('1d20', 'normal');
            }, 300);
        }
    }, [showCustomizer]);

    const poolSize = Object.values(diceCounts).reduce((a, b) => a + b, 0);

    return (
        <div className="w-full h-[700px] relative bg-dungeon-900/50 rounded-xl border border-dungeon-700 overflow-hidden flex flex-col md:flex-row">
            <Script
                src="/scripts/three.min.js"
                strategy="afterInteractive"
                onLoad={() => setScriptsLoaded(prev => ({ ...prev, three: true }))}
            />
            {scriptsLoaded.three && (
                <Script
                    src="/scripts/cannon.min.js"
                    strategy="afterInteractive"
                    onLoad={() => setScriptsLoaded(prev => ({ ...prev, cannon: true }))}
                />
            )}
            {scriptsLoaded.cannon && (
                <Script
                    src="/scripts/teal.js"
                    strategy="afterInteractive"
                    onLoad={() => setScriptsLoaded(prev => ({ ...prev, teal: true }))}
                />
            )}
            {scriptsLoaded.teal && (
                <Script
                    src="/scripts/dice-engine.js"
                    strategy="afterInteractive"
                    onLoad={() => setScriptsLoaded(prev => ({ ...prev, dice: true }))}
                />
            )}

            <div className="w-full md:w-80 bg-dungeon-900/90 border-b md:border-b-0 md:border-r border-dungeon-700 p-3 flex flex-col gap-3 z-20 backdrop-blur-sm order-2 md:order-1 overflow-y-auto custom-scrollbar relative">
                {tier?.code === 'admin' && (
                    <button
                        onClick={() => setShowCustomizer(!showCustomizer)}
                        className="absolute top-3 right-3 text-dungeon-400 hover:text-gold-400 transition-colors"
                        title="Personalizar Dados"
                    >
                        {showCustomizer ? <X className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
                    </button>
                )}

                {showCustomizer ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-left-4 mt-6">
                        <div className="flex items-center gap-2 text-gold-400 mb-2">
                            <Palette className="w-4 h-4" />
                            <h3 className="font-heading text-sm uppercase tracking-wider">Personalización</h3>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs text-dungeon-300 block">Estilos Predefinidos</label>
                            <div className="grid grid-cols-5 gap-2">
                                {DICE_PRESETS.map((preset) => (
                                    <button
                                        key={preset.name}
                                        onClick={() => setTheme(prev => ({ ...prev, dice_color: preset.dice, label_color: preset.label }))}
                                        className="w-full aspect-square rounded border border-dungeon-600 hover:border-gold-400 transition-all hover:scale-110 relative group"
                                        style={{ backgroundColor: preset.dice }}
                                        title={preset.name}
                                    >
                                        <span
                                            className="absolute inset-0 flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                                            style={{ color: preset.label }}
                                        >
                                            20
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs text-dungeon-300 block">Material</label>
                            <div className="grid grid-cols-4 gap-2">
                                {MATERIAL_PRESETS.map((preset) => (
                                    <button
                                        key={preset.name}
                                        onClick={() => setTheme(prev => ({ ...prev, material: preset.options }))}
                                        className="px-2 py-1.5 rounded border border-dungeon-600 bg-dungeon-900/50 text-xs text-dungeon-200 hover:border-gold-400 hover:text-gold-400 transition-colors"
                                    >
                                        {preset.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-xs text-dungeon-300 block">Color del Dado</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={theme.dice_color}
                                        onChange={(e) => setTheme(prev => ({ ...prev, dice_color: e.target.value }))}
                                        className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                                    />
                                    <span className="text-xs font-mono text-dungeon-400">{theme.dice_color}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-dungeon-300 block">Color del Texto</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={theme.label_color}
                                        onChange={(e) => setTheme(prev => ({ ...prev, label_color: e.target.value }))}
                                        className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                                    />
                                    <span className="text-xs font-mono text-dungeon-400">{theme.label_color}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-dungeon-700">
                            <Button variant="primary" onClick={applyTheme} className="w-full text-xs">
                                <Save className="w-3 h-3 mr-2" />
                                Aplicar Cambios
                            </Button>
                            <p className="text-[10px] text-dungeon-500 mt-2 text-center">
                                Los cambios se ven en tiempo real. Haz clic para guardar.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="space-y-1">
                            <h3 className="text-dungeon-200 font-heading text-xs uppercase tracking-wider">Tirada Rápida (d20)</h3>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => handleD20Roll('normal')}
                                    disabled={!isInitialized || isRolling}
                                    className="p-2 rounded bg-dungeon-800 border border-dungeon-600 hover:border-gold-500/50 hover:bg-dungeon-700 transition-colors text-center flex flex-col items-center justify-center gap-1"
                                >
                                    <D20Icon className="w-5 h-5 text-gold-400" />
                                    <span className="text-[10px] text-dungeon-400">Normal</span>
                                </button>
                                <button
                                    onClick={() => handleD20Roll('advantage')}
                                    disabled={!isInitialized || isRolling}
                                    className="p-2 rounded bg-dungeon-800 border border-dungeon-600 hover:border-green-500/50 hover:bg-green-900/20 transition-colors text-center group flex flex-col items-center justify-center gap-1"
                                >
                                    <div className="relative">
                                        <D20Icon className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                                        <Plus className="w-3 h-3 text-green-400 absolute -top-1 -right-1 bg-dungeon-900 rounded-full" />
                                    </div>
                                    <span className="text-[10px] text-green-400">Ventaja</span>
                                </button>
                                <button
                                    onClick={() => handleD20Roll('disadvantage')}
                                    disabled={!isInitialized || isRolling}
                                    className="p-2 rounded bg-dungeon-800 border border-dungeon-600 hover:border-red-500/50 hover:bg-red-900/20 transition-colors text-center group flex flex-col items-center justify-center gap-1"
                                >
                                    <div className="relative">
                                        <D20Icon className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                                        <Minus className="w-3 h-3 text-red-400 absolute -top-1 -right-1 bg-dungeon-900 rounded-full" />
                                    </div>
                                    <span className="text-[10px] text-red-400">Desventaja</span>
                                </button>
                            </div>
                        </div>

                        <div className="h-px bg-dungeon-700/50" />

                        <div className="space-y-1">
                            <h3 className="text-dungeon-200 font-heading text-xs uppercase tracking-wider">Modificador</h3>
                            <div className="flex items-center justify-between bg-dungeon-950/50 p-1.5 rounded border border-dungeon-800">
                                <button
                                    onClick={() => setModifier(m => m - 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-300 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-mono text-lg font-bold text-gold-400 w-16 text-center">
                                    {modifier >= 0 ? `+${modifier}` : modifier}
                                </span>
                                <button
                                    onClick={() => setModifier(m => m + 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded bg-dungeon-800 hover:bg-dungeon-700 text-gold-400 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="h-px bg-dungeon-700/50" />

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-dungeon-200 font-heading text-xs uppercase tracking-wider">Constructor</h3>
                                {poolSize > 0 && (
                                    <button
                                        onClick={clearDice}
                                        className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1"
                                    >
                                        <Trash2 className="w-3 h-3" /> Limpiar
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-1.5">
                                {DICE_TYPES.map((dice) => (
                                    <div key={dice.type} className="flex items-center justify-between bg-dungeon-950/50 p-1.5 rounded border border-dungeon-800">
                                        <div className="flex items-center gap-2">
                                            <dice.icon className={`w-5 h-5 ${dice.color}`} />
                                            <span className={`font-bold text-sm ${dice.color}`}>{dice.label}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateCount(dice.type, -1)}
                                                disabled={!diceCounts[dice.type]}
                                                className="w-6 h-6 flex items-center justify-center rounded bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-6 text-center font-mono text-base text-dungeon-100">
                                                {diceCounts[dice.type] || 0}
                                            </span>
                                            <button
                                                onClick={() => updateCount(dice.type, 1)}
                                                className="w-6 h-6 flex items-center justify-center rounded bg-dungeon-800 hover:bg-dungeon-700 text-gold-400 transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button
                                variant="primary"
                                className="w-full mt-2 py-2"
                                onClick={handlePoolRoll}
                                disabled={!isInitialized || isRolling || poolSize === 0}
                            >
                                <Dices className="w-4 h-4 mr-2" />
                                {poolSize > 0 ? `Lanzar (${getPoolNotation()})` : 'Agregar Dados'}
                            </Button>
                        </div>
                    </>
                )}
            </div>

            <div className="flex-1 relative order-1 md:order-2">
                {!isInitialized && !error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-dungeon-950/80 z-10">
                        <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-dungeon-950/80 z-10 p-4">
                        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                        <p className="text-red-300 text-center">{error}</p>
                        <Button variant="primary" onClick={() => window.location.reload()} className="mt-4">
                            Recargar
                        </Button>
                    </div>
                )}

                <div ref={containerRef} className="w-full h-full" />

                {lastResult && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-dungeon-900/95 border border-gold-500/50 rounded-lg p-4 shadow-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-gold-400 mb-2">{lastResult.total}</div>
                            <div className="text-sm text-dungeon-300">{lastResult.details}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
