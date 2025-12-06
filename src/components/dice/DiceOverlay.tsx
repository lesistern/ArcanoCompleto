"use client";
import { useEffect, useState } from "react";
import { diceController } from "@/lib/dice/controller";

export default function DiceOverlay() {
    const [result, setResult] = useState<{ total: number, notation: string } | null>(null);

    useEffect(() => {
        // Initialize on mount
        // The ID must match what we pass to init
        diceController.init("#dice-overlay");

        // Subscribe to result events
        diceController.onShowResult((data) => {
            setResult(data);
        });
    }, []);

    return (
        <>
            <div
                id="dice-overlay"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: 9000,
                }}
            >
                <style dangerouslySetInnerHTML={{
                    __html: `
                #dice-overlay canvas {
                    width: 100% !important;
                    height: 100% !important;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            `}} />
            </div>

            {/* Result Display Overlay - Now managed globally here */}
            {result && (
                <div
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-none"
                    style={{ zIndex: 99999 }}
                >
                    <div className="bg-dungeon-900/90 border-2 border-gold-500 rounded-xl p-4 shadow-2xl backdrop-blur-sm min-w-[200px] text-center">
                        <div className="text-gold-400 text-xs uppercase font-bold tracking-wider mb-1">Resultado</div>
                        <div className="text-4xl font-bold text-white drop-shadow-md font-mono">
                            {result.total}
                        </div>
                        <div className="text-dungeon-300 text-xs mt-1 font-mono">
                            {result.notation}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
