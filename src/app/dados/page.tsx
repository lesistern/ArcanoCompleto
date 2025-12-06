"use client";
import { useState, useEffect } from "react";
import { diceController } from "@/lib/dice/controller";
import { Crown, User, Sparkles, Palette, Dices, ChevronRight, Check } from "lucide-react";

// Types
type UserTier = 'free' | 'patreon' | 'member';

const PRESETS = [
    // Free Tier
    { name: "Clásico", bg: "#000000", text: "#ff0000" },
    { name: "Luz Divina", bg: "#ffffff", text: "#000000" },

    // Tier 1 (Patreon) - Bases de Clases
    { name: "Bárbaro", bg: "#8B0000", text: "#FFFFF0" },
    { name: "Bardo", bg: "#4B0082", text: "#FFD700" },
    { name: "Clérigo", bg: "#F8F8FF", text: "#00008B" },
    { name: "Druida", bg: "#556B2F", text: "#F4A460" },
    { name: "Explorador", bg: "#064e3b", text: "#F4A460" },
    { name: "Guerrero", bg: "#708090", text: "#B22222" },
    { name: "Hechicero", bg: "#ef4444", text: "#1f2937" },
    { name: "Mago", bg: "#1e3a8a", text: "#e5e7eb" },
    { name: "Paladín", bg: "#fefce8", text: "#ca8a04" },
    { name: "Pícaro", bg: "#171717", text: "#10b981" },
];

export default function DadosPage() {
    const [history, setHistory] = useState<string[]>([]);
    const [userTier, setUserTier] = useState<UserTier>('free');

    // Theme State
    const [selectedPreset, setSelectedPreset] = useState(0); // For free/patreon
    const [customBg, setCustomBg] = useState("#000000");
    const [customText, setCustomText] = useState("#ff0000");

    useEffect(() => {
        // Subscribe to results
        diceController.onRollComplete((result: any) => {
            console.log("Roll result:", result);
            let val = "";
            if (result.total !== undefined) {
                val = `${result.notation} = ${result.total}`;
            } else if (Array.isArray(result)) {
                // If it's a flattened array from our manual parser or standard dicebox array
                // dice-box structure varies but usually has objects with 'value'
                const sum = result.flat().reduce((acc: number, r: any) => acc + (r.value || 0), 0);
                val = `Total: ${sum}`;
            } else {
                val = JSON.stringify(result);
            }
            setHistory(prev => [`${new Date().toLocaleTimeString()}: ${val}`, ...prev]);
        });
    }, []);

    // Apply theme changes
    const applyTheme = (bg: string, text: string) => {
        diceController.setTheme(bg, text);
        // Visual feedback roll
        diceController.roll('1d20');
    };

    const handlePresetSelect = (index: number) => {
        setSelectedPreset(index);
        const preset = PRESETS[index];
        applyTheme(preset.bg, preset.text);
    };

    const handleCustomApply = () => {
        applyTheme(customBg, customText);
    };

    return (
        <div className="container mx-auto p-4 md:p-8 pt-24 text-dungeon-100 min-h-screen">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Main Configuration Panel */}
                <div className="flex-1 space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold font-merriweather mb-2 text-gold-500 flex items-center gap-3">
                            <Dices className="w-10 h-10" />
                            Forja de Dados
                        </h1>
                        <p className="text-dungeon-300">Personaliza tus dados según tu rango de aventurero.</p>
                    </div>

                    {/* Tier Selector (Dev/Mock) */}
                    <div className="bg-dungeon-900/50 p-4 rounded-xl border border-dungeon-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-dungeon-400 uppercase tracking-wider">Tu Nivel de Suscripción (Simulación)</h3>
                            <span className="text-xs text-dungeon-500">Solo para desarrollo</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setUserTier('free')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${userTier === 'free' ? 'bg-dungeon-700 text-white shadow-lg' : 'bg-dungeon-950/30 text-dungeon-500 hover:bg-dungeon-800'}`}
                            >
                                <User className="w-4 h-4" />
                                <span className="font-bold">Aventurero</span>
                            </button>
                            <button
                                onClick={() => setUserTier('patreon')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${userTier === 'patreon' ? 'bg-orange-900/80 text-orange-200 border border-orange-500/50 shadow-lg shadow-orange-900/20' : 'bg-dungeon-950/30 text-dungeon-500 hover:bg-dungeon-800'}`}
                            >
                                <Sparkles className="w-4 h-4" />
                                <span className="font-bold">Héroe (Patreon)</span>
                            </button>
                            <button
                                onClick={() => setUserTier('member')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${userTier === 'member' ? 'bg-purple-900/80 text-purple-200 border border-purple-500/50 shadow-lg shadow-purple-900/20' : 'bg-dungeon-950/30 text-dungeon-500 hover:bg-dungeon-800'}`}
                            >
                                <Crown className="w-4 h-4" />
                                <span className="font-bold">Leyenda</span>
                            </button>
                        </div>
                    </div>

                    {/* Customization Area */}
                    <div className="bg-dungeon-800 border border-dungeon-600 rounded-xl p-6 shadow-2xl">
                        <h2 className="text-2xl font-bold font-merriweather mb-6 flex items-center gap-2">
                            <Palette className="w-6 h-6 text-gold-400" />
                            Estilo de Dados
                        </h2>

                        {/* Free Tier Config */}
                        {userTier === 'free' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                                <p className="text-dungeon-300 text-sm mb-4">Elige entre las opciones básicas de alto contraste.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {PRESETS.slice(0, 2).map((preset, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handlePresetSelect(idx)}
                                            className={`relative group p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${selectedPreset === idx ? 'border-gold-500 bg-dungeon-700' : 'border-dungeon-600 hover:border-dungeon-500 bg-dungeon-900/50'}`}
                                        >
                                            <div
                                                className="w-12 h-12 rounded-lg shadow-inner flex items-center justify-center font-bold text-lg border border-white/10"
                                                style={{ backgroundColor: preset.bg, color: preset.text }}
                                            >
                                                20
                                            </div>
                                            <div className="text-left">
                                                <div className="font-bold text-white group-hover:text-gold-400 transition-colors">{preset.name}</div>
                                                <div className="text-xs text-dungeon-400">Estilo {idx === 0 ? 'Estándar' : 'Invertido'}</div>
                                            </div>
                                            {selectedPreset === idx && <div className="absolute top-4 right-4 text-gold-500"><Check className="w-5 h-5" /></div>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Patreon Tier Config */}
                        {userTier === 'patreon' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                                <p className="text-dungeon-300 text-sm mb-4">¡Gracias por tu apoyo! Disfruta de estos estilos exclusivos de clase.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {PRESETS.slice(2).map((preset, idx) => {
                                        const globalIndex = idx + 2;
                                        return (
                                            <button
                                                key={globalIndex}
                                                onClick={() => handlePresetSelect(globalIndex)}
                                                className={`relative group p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${selectedPreset === globalIndex ? 'border-orange-500 bg-dungeon-700' : 'border-dungeon-600 hover:border-orange-500/50 bg-dungeon-900/50'}`}
                                            >
                                                <div
                                                    className="w-12 h-12 rounded-lg shadow-inner flex items-center justify-center font-bold text-lg border border-white/10"
                                                    style={{ backgroundColor: preset.bg, color: preset.text }}
                                                >
                                                    20
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-bold text-white group-hover:text-gold-400 transition-colors">{preset.name}</div>
                                                </div>
                                                {selectedPreset === globalIndex && <div className="absolute top-4 right-4 text-orange-500"><Check className="w-5 h-5" /></div>}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Member Tier Config */}
                        {userTier === 'member' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
                                <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                                    <h3 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        Personalización Total
                                    </h3>
                                    <p className="text-dungeon-300 text-sm">Forja dados únicos con los colores de tu casa o facción.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-dungeon-300">Color del Dado</label>
                                        <div className="flex items-center gap-3 bg-dungeon-900 p-2 rounded-lg border border-dungeon-700">
                                            <input
                                                type="color"
                                                value={customBg}
                                                onChange={(e) => setCustomBg(e.target.value)}
                                                className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
                                            />
                                            <span className="font-mono text-dungeon-400">{customBg}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-dungeon-300">Color del Número</label>
                                        <div className="flex items-center gap-3 bg-dungeon-900 p-2 rounded-lg border border-dungeon-700">
                                            <input
                                                type="color"
                                                value={customText}
                                                onChange={(e) => setCustomText(e.target.value)}
                                                className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
                                            />
                                            <span className="font-mono text-dungeon-400">{customText}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        onClick={handleCustomApply}
                                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-purple-900/50 transition-all transform hover:-translate-y-1"
                                    >
                                        Aplicar Diseño Personalizado
                                    </button>
                                </div>

                                {/* Preview */}
                                <div className="mt-8 flex justify-center">
                                    <div className="text-center">
                                        <div className="text-xs uppercase tracking-widest text-dungeon-500 mb-2">Vista Previa</div>
                                        <div
                                            className="w-24 h-24 rounded-2xl shadow-2xl flex items-center justify-center font-bold text-4xl border border-white/10 mx-auto transition-colors duration-500"
                                            style={{ backgroundColor: customBg, color: customText }}
                                        >
                                            20
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar: History */}
                <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-dungeon-800/50 p-6 rounded-xl border border-dungeon-600 h-full max-h-[calc(100vh-120px)] overflow-hidden flex flex-col sticky top-24">
                        <h2 className="text-lg font-bold mb-4 font-merriweather text-dungeon-200 border-b border-dungeon-700 pb-2">
                            Historial de Tiradas
                        </h2>
                        <div className="space-y-3 font-mono text-sm overflow-y-auto flex-1 pr-2 custom-scrollbar">
                            {history.length === 0 && (
                                <div className="text-center py-10 opacity-50">
                                    <Dices className="w-12 h-12 mx-auto mb-2 text-dungeon-600" />
                                    <p>Tus hazañas aparecerán aquí</p>
                                </div>
                            )}
                            {history.map((entry, i) => (
                                <div key={i} className="bg-dungeon-900/50 p-3 rounded border border-dungeon-700/50 animate-in slide-in-from-right-2 fade-in duration-300">
                                    {entry}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
