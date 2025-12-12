"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/Button";
import {
    Weight,
    Map,
    Lightbulb,
    Coins,
    LucideIcon,
    Zap,
    Backpack,
    Footprints,
    Flashlight,
    BarChart3,
    ArrowLeft,
    Compass
} from 'lucide-react';
import { CarryingCapacity } from './CarryingCapacity';
import { AdventureMovement } from './AdventureMovement';
import { Exploration } from './Exploration';
import { Treasure } from './Treasure';
import { useUnitPreference } from '@/lib/hooks/useUnitPreference';
import { formatDistance } from '@/lib/utils/distance';
import { formatWeight } from '@/lib/utils/weight';

type Tab = 'carga' | 'movimiento' | 'exploracion' | 'tesoro';

export default function AdventurePage() {
    const [activeTab, setActiveTab] = useState<Tab>('carga');
    const contentRef = useRef<HTMLDivElement>(null);
    const { unitSystem } = useUnitPreference();

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
        { id: 'carga', label: 'Carga y Equipo', icon: Weight },
        { id: 'movimiento', label: 'Movimiento y Viajes', icon: Map },
        { id: 'exploracion', label: 'Exploración', icon: Lightbulb },
        { id: 'tesoro', label: 'Tesoros', icon: Coins },
    ];

    return (
        <div className="container mx-auto py-8 space-y-8">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/90 to-amber-950/30"></div>

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
                            Aventura
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            El mundo es vasto y peligroso. Aqui aprenderas a sobrevivir en el camino, gestionar tu equipo y reclamar tus recompensas.
                        </p>
                    </div>

                    <div className="p-6 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm">
                        <Compass className="h-12 w-12 text-amber-400" />
                    </div>
                </div>
            </div>

            {/* TL;DR - Resumen Rápido */}
            <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/20 to-gray-900 border-2 border-green-500/40 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500/20 rounded-full p-2">
                        <Zap className="h-6 w-6 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-400">TL;DR - Aventura en 30 Segundos</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 hover:bg-orange-900/30 transition-colors">
                        <Backpack className="h-8 w-8 text-orange-400 mb-2" />
                        <div className="font-bold text-orange-400 mb-1">Carga = Fue × 3</div>
                        <div className="text-gray-400 text-xs">
                            Ligera/Media/Pesada afecta velocidad
                        </div>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 hover:bg-blue-900/30 transition-colors">
                        <Footprints className="h-8 w-8 text-blue-400 mb-2" />
                        <div className="font-bold text-blue-400 mb-1">Velocidad = {formatDistance(30, unitSystem)} (humano)</div>
                        <div className="text-gray-400 text-xs">
                            x4 carrera, /2 terreno dificil
                        </div>
                    </div>
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-900/30 transition-colors">
                        <Flashlight className="h-8 w-8 text-purple-400 mb-2" />
                        <div className="font-bold text-purple-400 mb-1">Antorcha = {formatDistance(20, unitSystem)} luz</div>
                        <div className="text-gray-400 text-xs">
                            Sin luz = ciego (-2 CA, no ves)
                        </div>
                    </div>
                    <div className="bg-gold-900/20 border border-gold-500/30 rounded-lg p-4 hover:bg-gold-900/30 transition-colors">
                        <Coins className="h-8 w-8 text-gold-400 mb-2" />
                        <div className="font-bold text-gold-400 mb-1">1 po = 10 pp = 100 pc</div>
                        <div className="text-gray-400 text-xs">
                            50 monedas = {formatWeight(1, unitSystem)}
                        </div>
                    </div>
                </div>

                {/* Ejemplo Visual de Carga */}
                <div className="mt-6 bg-gray-950/50 border border-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>Ejemplo: Guerrero con Fuerza 16 (carga maxima):</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="bg-gray-800 px-3 py-1 rounded font-mono">Fue 16</span>
                        <span className="text-gray-500">=</span>
                        <span className="bg-green-900/40 border border-green-500/30 px-3 py-1 rounded">0-{formatWeight(76, unitSystem, false)} <span className="text-green-400 text-xs">(ligera)</span></span>
                        <span className="text-gray-500">|</span>
                        <span className="bg-yellow-900/40 border border-yellow-500/30 px-3 py-1 rounded">{formatWeight(77, unitSystem, false)}-{formatWeight(153, unitSystem, false)} <span className="text-yellow-400 text-xs">(media)</span></span>
                        <span className="text-gray-500">|</span>
                        <span className="bg-red-900/40 border border-red-500/30 px-3 py-1 rounded">{formatWeight(154, unitSystem, false)}-{formatWeight(230, unitSystem, false)} <span className="text-red-400 text-xs">(pesada)</span></span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Carga ligera: sin penalizadores. Media: -3 armadura, velocidad x3/4. Pesada: -6 armadura, velocidad x1/2.</p>
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
                                ? 'bg-amber-900/80 hover:bg-amber-800 text-amber-100 border-amber-700 shadow-lg shadow-amber-900/20 scale-105'
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
                {activeTab === 'carga' && <CarryingCapacity />}
                {activeTab === 'movimiento' && <AdventureMovement />}
                {activeTab === 'exploracion' && <Exploration />}
                {activeTab === 'tesoro' && <Treasure />}
            </div>
        </div>
    );
}
