"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
    Sword,
    Shield,
    Activity,
    Footprints,
    Zap,
    Skull,
    Clock,
    AlertTriangle,
    Flame,
    Target,
    LucideIcon,
    Dices,
    BarChart3,
    ArrowLeft,
    Swords
} from 'lucide-react';
import { CombatBasics } from './CombatBasics';
import { Initiative } from './Initiative';
import { Actions } from './Actions';
import { Injury } from './Injury';
import { Movement } from './Movement';
import { Modifiers } from './Modifiers';
import { SpecialAttacks } from './SpecialAttacks';
import { SpecialAbilities } from './SpecialAbilities';
import { SpecialInitiative } from './SpecialInitiative';

type Tab = 'fundamentos' | 'tu-turno' | 'atacar-danar' | 'tacticas' | 'avanzado';

export default function CombatPage() {
    const [activeTab, setActiveTab] = useState<Tab>('fundamentos');
    const contentRef = useRef<HTMLDivElement>(null);

    const handleTabChange = (tabId: Tab) => {
        setActiveTab(tabId);
        // Small timeout to ensure state update and render cycle have started
        setTimeout(() => {
            if (contentRef.current) {
                const y = contentRef.current.getBoundingClientRect().top + window.scrollY - 180; // Adjust offset for header + tabs
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 0);
    };

    const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
        { id: 'fundamentos', label: 'Fundamentos', icon: Sword },
        { id: 'tu-turno', label: 'Tu Turno', icon: Clock },
        { id: 'atacar-danar', label: 'Atacar y Dañar', icon: Target },
        { id: 'tacticas', label: 'Tácticas', icon: Zap },
        { id: 'avanzado', label: 'Avanzado', icon: AlertTriangle },
    ];

    return (
        <div className="container mx-auto py-8 space-y-8">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/90 to-red-950/30"></div>

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Link href="/reglas">
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200 pl-0">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver a Reglas
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-100 leading-tight">
                            Combate
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            El choque de acero, el rugido de la magia y el caos de la batalla. Aqui encontraras todo lo necesario para resolver conflictos armados.
                        </p>
                    </div>

                    <div className="p-6 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
                        <Swords className="h-12 w-12 text-red-400" />
                    </div>
                </div>
            </div>

            {/* TL;DR - Resumen Rápido */}
            <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/20 to-gray-900 border-2 border-green-500/40 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500/20 rounded-full p-2">
                        <Zap className="h-6 w-6 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-400">TL;DR - Combate en 30 Segundos</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 hover:bg-blue-900/30 transition-colors">
                        <Sword className="h-8 w-8 text-blue-400 mb-2" />
                        <div className="font-bold text-blue-400 mb-1">Ataque = d20 + BAB + mod</div>
                        <div className="text-gray-400 text-xs">
                            Supera la CA del enemigo = golpeas
                        </div>
                    </div>
                    <div className="bg-gold-900/20 border border-gold-500/30 rounded-lg p-4 hover:bg-gold-900/30 transition-colors">
                        <Dices className="h-8 w-8 text-gold-400 mb-2" />
                        <div className="font-bold text-gold-400 mb-1">Iniciativa = d20 + Des</div>
                        <div className="text-gray-400 text-xs">
                            Define quién actúa primero
                        </div>
                    </div>
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 hover:bg-red-900/30 transition-colors">
                        <Zap className="h-8 w-8 text-red-400 mb-2" />
                        <div className="font-bold text-red-400 mb-1">1 Acción Estándar</div>
                        <div className="text-gray-400 text-xs">
                            + 1 de movimiento por turno
                        </div>
                    </div>
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-900/30 transition-colors">
                        <Shield className="h-8 w-8 text-purple-400 mb-2" />
                        <div className="font-bold text-purple-400 mb-1">CA = 10 + Arm + Des</div>
                        <div className="text-gray-400 text-xs">
                            Número que deben superar para golpearte
                        </div>
                    </div>
                </div>

                {/* Ejemplo Visual de Ataque */}
                <div className="mt-6 bg-gray-950/50 border border-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>Ejemplo: Guerrero nivel 3 ataca a un orco (CA 13):</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="bg-gray-800 px-3 py-1 rounded font-mono">d20</span>
                        <span className="text-gray-500">=</span>
                        <span className="bg-gold-900/40 border border-gold-500/30 px-3 py-1 rounded">12 <span className="text-gray-500 text-xs">(tirada)</span></span>
                        <span className="text-green-400 font-bold">+</span>
                        <span className="bg-blue-900/40 border border-blue-500/30 px-3 py-1 rounded">3 <span className="text-gray-500 text-xs">(BAB)</span></span>
                        <span className="text-green-400 font-bold">+</span>
                        <span className="bg-red-900/40 border border-red-500/30 px-3 py-1 rounded">3 <span className="text-gray-500 text-xs">(Fue)</span></span>
                        <span className="text-gray-500">=</span>
                        <span className="bg-green-900/40 border border-green-500/50 px-4 py-1 rounded font-bold text-green-400">18</span>
                        <span className="text-green-400">≥ 13</span>
                        <span className="text-green-400 font-bold">¡IMPACTO!</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Ahora tira daño del arma + mod Fuerza.</p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-2 sticky top-20 z-40 bg-gray-950/90 p-4 rounded-xl backdrop-blur-sm border border-gray-800 shadow-xl">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <Button
                            key={tab.id}
                            variant={activeTab === tab.id ? "default" : "outline"}
                            onClick={() => handleTabChange(tab.id)}
                            className={`flex items-center gap-2 transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-red-900/80 hover:bg-red-800 text-red-100 border-red-700 shadow-lg shadow-red-900/20 scale-105'
                                : 'text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-gray-100'
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                            <span className="hidden md:inline">{tab.label}</span>
                        </Button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div ref={contentRef} className="min-h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-500 scroll-mt-40">
                {activeTab === 'fundamentos' && <CombatBasics />}
                {activeTab === 'tu-turno' && (
                    <div className="space-y-8">
                        <Initiative />
                        <Actions />
                        <Movement />
                    </div>
                )}
                {activeTab === 'atacar-danar' && <Injury />}
                {activeTab === 'tacticas' && (
                    <div className="space-y-8">
                        <SpecialAttacks />
                        <SpecialAbilities />
                    </div>
                )}
                {activeTab === 'avanzado' && (
                    <div className="space-y-8">
                        <Modifiers />
                        <SpecialInitiative />
                    </div>
                )}
            </div>
        </div>
    );
}
