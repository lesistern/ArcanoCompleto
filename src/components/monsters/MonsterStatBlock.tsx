'use client';

import React from 'react';
import { MonsterStats } from '@/lib/data/monster-advancement-rules';
import { RotateCcw, Shield, Heart, Zap, Activity, Sword, Skull } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

interface MonsterStatBlockProps {
    stats: MonsterStats;
    targetCR?: number;
    initialCR?: number;
    onCRChange?: (val: number) => void;
}

const TaperedRule = () => (
    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-700/40 to-transparent my-3" />
);

const PropertyLine = ({ label, value, icon, className = '' }: { label: string; value: React.ReactNode; icon?: React.ReactNode; className?: string }) => {
    if (!value) return null;
    return (
        <div className={`flex items-baseline gap-2 py-2 px-3 ${className}`}>
            {icon && <span className="self-center shrink-0 text-gold-400">{icon}</span>}
            <div className="text-sm leading-relaxed text-gray-200 w-full">
                <span className="font-bold text-gold-400 font-heading tracking-wide uppercase text-xs mr-2">{label}:</span>
                <span className="text-base text-gray-100">{value}</span>
            </div>
        </div>
    );
};

const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-2 mt-6 mb-3 px-2">
        <div className="h-1 w-1 rounded-full bg-gold-500"></div>
        <h3 className="text-gold-400 font-bold uppercase tracking-widest text-xs font-cinzel">{title}</h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-gold-500/30 to-transparent"></div>
    </div>
);

const AbilityScoreBox = ({ label, value }: { label: string; value: number }) => {
    const mod = Math.floor((value - 10) / 2);
    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;

    // Colores específicos por habilidad (regla general de /reglas/caracteristicas)
    // Usando clases completas para que Tailwind las detecte en build time
    let boxClasses = '';
    let labelClasses = '';

    switch(label) {
        case 'FUE':
            boxClasses = 'flex flex-col items-center bg-red-900/20 border border-red-500/30 rounded p-2 min-w-[3.5rem]';
            labelClasses = 'text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1';
            break;
        case 'DES':
            boxClasses = 'flex flex-col items-center bg-green-900/20 border border-green-500/30 rounded p-2 min-w-[3.5rem]';
            labelClasses = 'text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1';
            break;
        case 'CON':
            boxClasses = 'flex flex-col items-center bg-orange-900/20 border border-orange-500/30 rounded p-2 min-w-[3.5rem]';
            labelClasses = 'text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1';
            break;
        case 'INT':
            boxClasses = 'flex flex-col items-center bg-blue-900/20 border border-blue-500/30 rounded p-2 min-w-[3.5rem]';
            labelClasses = 'text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1';
            break;
        case 'SAB':
            boxClasses = 'flex flex-col items-center bg-cyan-900/20 border border-cyan-500/30 rounded p-2 min-w-[3.5rem]';
            labelClasses = 'text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1';
            break;
        case 'CAR':
            boxClasses = 'flex flex-col items-center bg-pink-900/20 border border-pink-500/30 rounded p-2 min-w-[3.5rem]';
            labelClasses = 'text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-1';
            break;
        default:
            boxClasses = 'flex flex-col items-center bg-gray-900/60 border border-gray-700/40 rounded p-2 min-w-[3.5rem]';
            labelClasses = 'text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-1';
    }

    return (
        <div className={boxClasses}>
            <span className={labelClasses}>{label}</span>
            <span className="text-xl font-bold text-gray-100 font-heading">{value}</span>
            <span className="text-xs text-gray-400 font-mono">{modStr}</span>
        </div>
    );
};

// Helper: Format CR (Integers or Fractions)
export const formatCR = (cr: number): string => {
    if (cr <= 0) return "0";
    if (Math.abs(cr - 0.5) < 0.01) return "1/2";
    if (Math.abs(cr - 0.25) < 0.01) return "1/4";
    if (Math.abs(cr - 0.125) < 0.01) return "1/8";
    if (Math.abs(cr - 1 / 3) < 0.01) return "1/3";
    if (Math.abs(cr - 1 / 6) < 0.01) return "1/6";

    if (Math.abs(cr % 1) < 0.01) {
        if (cr >= 1 && cr < 2 && cr !== 1) return cr.toFixed(0);
        return cr.toFixed(0);
    }

    if (Math.abs((cr % 1) - 0.5) < 0.01) {
        return `${Math.floor(cr)} 1/2`;
    }

    if (Math.abs((cr % 1) - 0.25) < 0.01) {
        return `${Math.floor(cr)} 1/4`;
    }

    return cr.toFixed(2).replace(/\.00$/, '');
};


export default function MonsterStatBlock({ stats, targetCR, initialCR, onCRChange }: MonsterStatBlockProps) {
    if (!stats) return null;

    // Helper to format skills from record
    const skillsList = Object.entries(stats.computed_skills || {})
        .map(([name, bonus]) => `${name} ${bonus >= 0 ? '+' : ''}${bonus}`)
        .join(', ');

    // Helper to format feats
    const featsList = (stats.computed_feats || []).join(', ');

    const showSlider = targetCR !== undefined && onCRChange !== undefined;

    return (
        <div className="w-full max-w-4xl mx-auto font-sans relative group">

            {/* Main Card Container - Matching DM Screen Style */}
            <Card className="card bg-gray-900/90 shadow-2xl relative transition-all duration-500 overflow-visible">

                {/* Background Texture & Decor */}
                <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-5 pointer-events-none mix-blend-overlay rounded-xl"></div>

                {/* --- HEADER SECTION --- */}
                <div className="relative p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-900/40 via-gray-900/20 to-transparent rounded-t-xl">
                    <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-gray-900/50 hidden md:block">
                                <Skull className="h-8 w-8 text-gold-400" />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-100 font-heading tracking-wide uppercase">
                                    {stats.name}
                                </h2>
                                <div className="flex items-center gap-2 mt-1 text-gray-400/80 italic text-sm">
                                    <span>{stats.size}</span>
                                    <span className="h-1 w-1 rounded-full bg-gray-600"></span>
                                    <span>{stats.creature_type}</span>
                                    {stats.creature_subtypes && stats.creature_subtypes.length > 0 && (
                                        <>
                                            <span className="h-1 w-1 rounded-full bg-gray-600"></span>
                                            <span>({stats.creature_subtypes.join(', ')})</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* CR Badge */}
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest">Desafío</span>
                            <span className="text-3xl font-bold text-gray-100 font-heading leading-none">
                                {formatCR(stats.computed_cr)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* --- CONTENT BODY --- */}
                <div className="relative p-6 pt-6 space-y-1">

                    {/* Primary Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
                        <PropertyLine
                            label="Dados de Golpe"
                            value={`${stats.computed_hd}d${stats.creature_type === 'no-muerto' ? '12' : '8'} (${stats.computed_hp} pg)`}
                        />
                        <PropertyLine
                            label="Iniciativa"
                            value={stats.computed_initiative !== undefined ? (stats.computed_initiative >= 0 ? `+${stats.computed_initiative}` : stats.computed_initiative) : '--'}
                        />
                        <PropertyLine
                            label="Velocidad"
                            value={typeof stats.speed === 'string' ? stats.speed :
                                stats.speed ? `${(stats.speed as any).base} pies (${Math.floor((stats.speed as any).base / 5)} casillas)` : '30 pies'}
                        />
                        <PropertyLine
                            label="Clase de Armadura"
                            value={
                                <span>
                                    <span className="font-bold">{stats.computed_ac.total}</span>
                                    <span className="text-gray-400 italic ml-1 text-sm">
                                        (toque {stats.computed_ac.touch}, desprevenido {stats.computed_ac.flat_footed})
                                    </span>
                                    {stats.computed_ac.breakdown && (
                                        <div className="text-xs text-gray-500 block mt-0.5">{stats.computed_ac.breakdown}</div>
                                    )}
                                </span>
                            }
                        />
                    </div>

                    <SectionHeader title="Ataque & Defensa" />

                    <div className="space-y-1">
                        <PropertyLine
                            label="Ataque Base/Presa"
                            value={`${stats.computed_bab >= 0 ? '+' : ''}${stats.computed_bab} / ${stats.computed_grapple >= 0 ? '+' : ''}${stats.computed_grapple}`}
                        />

                        {/* Attack Block */}
                        <div className="bg-gray-900/40 p-3 rounded-lg my-2">
                            <div className="flex items-start gap-2">
                                <div className="flex-1">
                                    <span className="font-bold text-gold-400 font-heading tracking-wide uppercase text-xs block mb-1">Ataque</span>
                                    <div className="text-sm leading-relaxed text-gray-200 flex flex-wrap gap-x-2">
                                        {stats.computed_attacks.map((atk: any, i: number) => (
                                            <span key={i}>
                                                {i > 0 && ' o '}
                                                {atk.name} <span className="font-bold">{atk.bonus >= 0 ? '+' : ''}{atk.bonus}</span> {atk.type === 'melee' ? 'cuerpo a cuerpo' : 'a distancia'}
                                                <span className="text-gray-500 text-xs mx-1">(</span>
                                                {atk.damage}{atk.critical ? `/${atk.critical}` : ''}
                                                <span className="text-gray-500 text-xs mx-1">)</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <PropertyLine
                            label="Espacio/Alcance"
                            value={stats.space && stats.reach ? `${stats.space}/${stats.reach}` : '5 pies/5 pies'}
                        />
                        <PropertyLine
                            label="Ataques Especiales"
                            value={Array.isArray(stats.special_attacks) ? stats.special_attacks.join(', ') : stats.special_attacks || ''}
                        />
                    </div>

                    <SectionHeader title="Estadísticas" />

                    {/* Ability Scores Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-4 py-4 bg-gray-900/40 rounded-lg mb-4">
                        <AbilityScoreBox label="FUE" value={stats.computed_abilities.str} />
                        <AbilityScoreBox label="DES" value={stats.computed_abilities.dex} />
                        <AbilityScoreBox label="CON" value={stats.computed_abilities.con} />
                        <AbilityScoreBox label="INT" value={stats.computed_abilities.int} />
                        <AbilityScoreBox label="SAB" value={stats.computed_abilities.wis} />
                        <AbilityScoreBox label="CAR" value={stats.computed_abilities.cha} />
                    </div>

                    <div className="space-y-1">
                        <PropertyLine
                            label="Salvaciones"
                            value={`Fort +${stats.computed_saves.fort}, Ref +${stats.computed_saves.ref}, Vol +${stats.computed_saves.will}`}
                        />
                        <PropertyLine
                            label="Cualidades Especiales"
                            value={stats.special_qualities?.join(', ')}
                        />
                        <PropertyLine
                            label="Habilidades"
                            value={skillsList || '—'}
                        />
                        <PropertyLine
                            label="Dotes"
                            value={featsList || '—'}
                        />
                    </div>

                    <SectionHeader title="Detalles" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                        <PropertyLine
                            label="Entorno"
                            value={stats.environment}
                        />
                        <PropertyLine
                            label="Tesoro"
                            value={stats.treasure}
                        />
                        <PropertyLine
                            label="Alineamiento"
                            value={stats.alignment}
                        />
                        <PropertyLine
                            label="Avance"
                            value={stats.advancement}
                        />
                        <PropertyLine
                            label="Ajuste de Nivel"
                            value={stats.level_adjustment !== undefined ? (typeof stats.level_adjustment === 'number' && stats.level_adjustment >= 0 ? `+${stats.level_adjustment}` : `${stats.level_adjustment}`) : '+0'}
                        />
                    </div>
                </div>

                {/* --- FOOTER SLIDER CONTROLS --- */}
                {showSlider && (
                    <div className="sticky bottom-0 z-10 bg-gray-900/95 p-6 rounded-b-xl backdrop-blur-md shadow-lg">
                        <div className="flex flex-col md:flex-row items-center gap-6">

                            {/* Current CR Display */}
                            <div className="flex items-center gap-3 shrink-0 bg-gray-950 px-4 py-2 rounded-lg w-full md:w-auto justify-center md:justify-start shadow-inner">
                                <label className="text-xs font-bold text-gold-400 uppercase tracking-widest">VD</label>
                                <span className={`text-2xl font-heading font-bold text-gray-200 transition-colors duration-300`}>
                                    {formatCR(targetCR!)}
                                </span>
                            </div>

                            {/* Slider Track */}
                            <div className="flex-1 w-full relative group/slider">
                                <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-wider mb-2 font-bold px-1">
                                    <span>0</span>
                                    <span>30</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="30"
                                    step="0.5"
                                    value={targetCR}
                                    onChange={(e) => onCRChange!(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer hover:border-gold-500/40 transition-all accent-gold-500"
                                />
                            </div>

                            {/* Reset Button */}
                            {initialCR !== undefined && Math.abs(targetCR! - initialCR) > 0.01 && (
                                <button
                                    onClick={() => onCRChange!(initialCR)}
                                    className="shrink-0 p-2.5 rounded-full bg-gray-800 hover:bg-gray-700/40 text-gray-400 hover:text-gold-400 hover:border-gold-500/40 transition-all shadow-lg group/btn"
                                    title="Restaurar Valores Originales"
                                >
                                    <RotateCcw className="w-4 h-4 group-hover/btn:-rotate-180 transition-transform duration-500" />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
