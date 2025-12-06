"use client";
import { useEffect } from "react";
import { diceController } from "@/lib/dice/controller";

export default function DiceOverlay() {
    useEffect(() => {
        // Initialize on mount
        // The ID must match what we pass to init
        diceController.init("#dice-overlay");
    }, []);

    return (
        <div
            id="dice-overlay"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 99999,
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
    );
}
