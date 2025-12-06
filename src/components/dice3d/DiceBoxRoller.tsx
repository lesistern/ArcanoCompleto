'use client';

import React, { useEffect, useRef, useState } from 'react';

// Define types for the dice-box library since we are loading it from CDN
interface DiceBoxOptions {
    id?: string;
    assetPath: string;
    scale?: number;
    theme?: string;
    themeColor?: string;
    offscreen?: boolean;
    container?: HTMLElement | string;
}

interface RollResult {
    value: number;
    type: string;
    groupId: number;
    rollId: number;
    sides: number;
    theme: string;
}

interface DiceBoxInstance {
    init: () => Promise<void>;
    roll: (notation: string | string[]) => Promise<RollResult[]>;
    clear: () => void;
    hide: () => void;
    show: () => void;
}

interface DiceBoxRollerProps {
    onRollComplete?: (total: number, resultString: string) => void;
    onError?: (error: string) => void;
}

const DiceBoxRoller: React.FC<DiceBoxRollerProps> = ({ onRollComplete, onError }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<DiceBoxInstance | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [lastResult, setLastResult] = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Visual scaling: base vendor scale and multiplier (150% = 1.5)
    const BASE_VENDOR_SCALE = 10;
    const SCALE_FACTOR = 1.5; // 150%
    const computedScale = Math.round(BASE_VENDOR_SCALE * SCALE_FACTOR);

    useEffect(() => {
        // mark mounted to avoid hydration mismatch between server/client
        setMounted(true);

        let mounted = true;
        let script: HTMLScriptElement | null = null;

        const loadDiceBox = async () => {
            if (boxRef.current) return;

            try {
                console.log('Starting DiceBox loading...');

                // Adapt to whichever dice engine is available on window (DiceBoxConstructor, dices, or DICE)
                const win = window as any;

                // Helper to load a script sequentially
                const loadScript = (src: string) => new Promise<void>((resolve, reject) => {
                    if (document.querySelector(`script[src="${src}"]`)) return resolve();
                    const s = document.createElement('script');
                    s.src = src;
                    s.async = true;
                    s.onload = () => resolve();
                    s.onerror = () => reject(new Error(`Failed to load ${src}`));
                    document.body.appendChild(s);
                });

                // Ensure core dependencies are loaded (THREE, CANNON, teal)
                try {
                    if (!('THREE' in win)) await loadScript('/scripts/three.min.js');
                    if (!('CANNON' in win)) await loadScript('/scripts/cannon.min.js');
                    if (!('teal' in win) && !('Teal' in win)) await loadScript('/scripts/teal.js');
                } catch (e) {
                    throw new Error('Failed to load prerequisite scripts: ' + (e as Error).message);
                }

                // If the modern packaged constructor is available (from vendor attach), instantiate it
                if (win.DiceBoxConstructor) {
                    const selector = '#dice-box-container';
                    const instance = new win.DiceBoxConstructor({ container: selector, assetPath: '/vendor/dice-box/assets/dice-box/', offscreen: true, scale: computedScale });
                    if (typeof instance.init === 'function') {
                        await instance.init();
                    }
                    boxRef.current = instance;
                    setIsInitialized(true);
                    setTimeout(() => rollDice('1d20'), 500);
                    return;
                }

                // If the attach helper is present, ensure and reuse that box
                if (win.dices && typeof win.dices._ensureBox === 'function') {
                    const instance = await win.dices._ensureBox();
                    boxRef.current = instance;
                    setIsInitialized(true);
                    setTimeout(() => rollDice('1d20'), 500);
                    return;
                }

                // Try loading vendor attach as an ES module (it uses `import` so must be loaded with type="module")
                try {
                    if (!document.querySelector('script[src="/vendor/dice-box/attach.js"]')) {
                        const modScript = document.createElement('script');
                        modScript.type = 'module';
                        modScript.src = '/vendor/dice-box/attach.js';
                        await new Promise<void>((resolve, reject) => {
                            modScript.onload = () => resolve();
                            modScript.onerror = () => reject(new Error('Failed to load /vendor/dice-box/attach.js as module'));
                            document.body.appendChild(modScript);
                        });
                    }
                } catch (e) {
                    // ignore — we'll try the other engine below
                }

                // Re-check after attach.js
                if (win.DiceBoxConstructor) {
                    const selector = '#dice-box-container';
                    const instance = new win.DiceBoxConstructor({ container: selector, assetPath: '/vendor/dice-box/assets/dice-box/', offscreen: true, scale: computedScale });
                    if (typeof instance.init === 'function') await instance.init();
                    boxRef.current = instance;
                    setIsInitialized(true);
                    setTimeout(() => rollDice('1d20'), 500);
                    return;
                }

                if (win.dices && typeof win.dices._ensureBox === 'function') {
                    const instance = await win.dices._ensureBox();
                    boxRef.current = instance;
                    setIsInitialized(true);
                    setTimeout(() => rollDice('1d20'), 500);
                    return;
                }

                // If older DICE engine is present on window, adapt it
                if (win.DICE && typeof win.DICE.dice_box === 'function') {
                    const container = containerRef.current || document.getElementById('dice-box-container');
                    const instance = new win.DICE.dice_box(container);
                    // Try to reduce camera distance if available to make dice appear larger by SCALE_FACTOR
                    try {
                        if (typeof instance.reinit === 'function') {
                            instance.reinit(container);
                        }
                        if (instance.camera && instance.camera.position && typeof instance.camera.position.z === 'number') {
                            instance.camera.position.z = instance.camera.position.z / SCALE_FACTOR;
                        }
                    } catch (e) {
                        // non-fatal: continue if camera manipulation not supported
                    }
                    const adapter = {
                        init: async () => Promise.resolve(),
                        roll: (notation: string | string[]) => new Promise<any[]>((resolve, reject) => {
                            try {
                                if (typeof instance.setDice === 'function') instance.setDice(notation);
                                if (typeof instance.start_throw === 'function') {
                                    instance.start_throw(() => { }, (notationResult: any) => {
                                        const res = (notationResult && notationResult.result) || [];
                                        resolve(res.map((r: number) => ({ value: r })));
                                    });
                                } else if (typeof instance.roll === 'function') {
                                    instance.roll(notation, [], (res: any) => {
                                        const arr = (res && res.result) || res || [];
                                        resolve(arr.map((r: number) => ({ value: r })));
                                    });
                                } else {
                                    resolve([]);
                                }
                            } catch (e) { reject(e); }
                        }),
                        clear: () => instance.clear && instance.clear(),
                        hide: () => instance.hide && instance.hide(),
                        show: () => instance.show && instance.show(),
                    };
                    boxRef.current = adapter as unknown as DiceBoxInstance;
                    setIsInitialized(true);
                    setTimeout(() => rollDice('1d20'), 500);
                    return;
                }

                // If none found yet, try the alternative engine script
                try {
                    await loadScript('/scripts/dice-engine.js');
                } catch (e) {
                    throw new Error('Failed to load dice engine: ' + (e as Error).message);
                }

                // After loading, adapt the global if present
                if (win.DICE && typeof win.DICE.dice_box === 'function') {
                    const container = containerRef.current || document.getElementById('dice-box-container');
                    const instance = new win.DICE.dice_box(container);
                    // Adjust camera for visibility
                    try {
                        if (instance.camera && instance.camera.position && typeof instance.camera.position.z === 'number') {
                            instance.camera.position.z = instance.camera.position.z / SCALE_FACTOR;
                        }
                    } catch (e) { /* ignore */ }
                    const adapter = {
                        init: async () => Promise.resolve(),
                        roll: (notation: string | string[]) => new Promise<any[]>((resolve, reject) => {
                            try {
                                if (typeof instance.setDice === 'function') instance.setDice(notation);
                                if (typeof instance.start_throw === 'function') {
                                    instance.start_throw(() => { }, (notationResult: any) => {
                                        const res = (notationResult && notationResult.result) || [];
                                        resolve(res.map((r: number) => ({ value: r })));
                                    });
                                } else {
                                    resolve([]);
                                }
                            } catch (e) { reject(e); }
                        }),
                        clear: () => instance.clear && instance.clear(),
                        hide: () => instance.hide && instance.hide(),
                        show: () => instance.show && instance.show(),
                    };
                    boxRef.current = adapter as unknown as DiceBoxInstance;
                    setIsInitialized(true);
                    setTimeout(() => rollDice('1d20'), 500);
                    return;
                }

                // nothing worked
                throw new Error('Dice engine not found after script load');
            } catch (err) {
                console.error('DiceBox load error:', err);
                if (onError) onError('Error loading 3D engine: ' + (err as Error).message);
                // Force initialization state to remove loading spinner and show error
                setIsInitialized(true);
                setLastResult('Error: ' + (err as Error).message);
            }
        };

        loadDiceBox();

        return () => {
            mounted = false;
        };
    }, []);

    const rollDice = async (notation: string) => {
        if (!boxRef.current) return;

        try {
            // boxRef.current.clear(); 
            const results = await boxRef.current.roll(notation);

            // Calculate total
            const total = results.reduce((sum, die) => sum + die.value, 0);
            const resultStr = results.map(d => d.value).join(' + ');

            setLastResult(`${total} (${resultStr})`);

            if (onRollComplete) {
                onRollComplete(total, `${total}`);
            }
        } catch (err) {
            console.error('Roll error:', err);
        }
    };

    return (
        <div className={
            `relative w-full h-full min-h-[400px] ${isFullscreen ? 'fixed inset-0 w-screen h-screen z-50 bg-dungeon-950/95 rounded-none' : 'bg-dungeon-950/50 rounded-xl'} overflow-hidden border border-dungeon-700`
        }>
            {!isInitialized && (
                <div className="absolute inset-0 flex items-center justify-center text-dungeon-300">
                    <div className="animate-pulse">Cargando motor 3D...</div>
                </div>
            )}

            <div id="dice-box-container" ref={containerRef} className="w-full h-full absolute inset-0" />

            {/* Fullscreen toggle control */}
            {mounted && (
                <div className="absolute top-4 right-4 pointer-events-auto">
                <button
                    onClick={async () => {
                        setIsFullscreen(!isFullscreen);
                        // attempt to reinit engine for the new container size
                        try {
                            const inst: any = boxRef.current;
                            const container = containerRef.current || document.getElementById('dice-box-container');
                            if (inst && typeof inst.reinit === 'function') inst.reinit(container);
                            if (inst && typeof inst.init === 'function') await inst.init();
                            // for legacy camera adjust again
                            if (inst && inst.camera && typeof inst.camera.position?.z === 'number') {
                                inst.camera.position.z = inst.camera.position.z / SCALE_FACTOR;
                            }
                        } catch (e) {
                            // ignore
                        }
                    }}
                    className="px-3 py-1 bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-100 rounded border border-dungeon-600 text-sm font-medium"
                >
                    {isFullscreen ? 'Cerrar pantalla' : 'Pantalla completa'}
                </button>
                </div>
            )}

            {/* Controls Overlay */}
            {mounted && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                    <div className="pointer-events-auto flex gap-2 bg-dungeon-950/80 p-2 rounded-lg backdrop-blur-sm border border-dungeon-700">
                    {['d4', 'd6', 'd8', 'd10', 'd12', 'd20'].map(type => (
                        <button
                            key={type}
                            onClick={() => rollDice(`1${type}`)}
                            disabled={!isInitialized}
                            className="px-3 py-1.5 bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-100 rounded border border-dungeon-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                            {type.toUpperCase()}
                        </button>
                    ))}
                    </div>
                </div>
            )}

            {/* Result Display */}
            {mounted && lastResult && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
                    <div className="bg-dungeon-950/90 text-gold-400 px-6 py-2 rounded-full border border-gold-500/30 shadow-lg backdrop-blur-md text-xl font-bold animate-in fade-in slide-in-from-top-4">
                        {lastResult}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiceBoxRoller;
