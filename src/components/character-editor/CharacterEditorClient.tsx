'use client';


import { useState, useEffect } from 'react';
import { ArrowLeft, User, Sword, Calculator, Backpack, Users, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

import { createClient } from '@/lib/supabase/client';
import { SideAd } from '@/components/ads/SideAd';
import { User as SupabaseUser } from '@supabase/supabase-js';

import { RaceSelectionStep } from './steps/RaceSelectionStep';
import { ClassSelectionStep } from './steps/ClassSelectionStep';
import { AbilityScoresStep } from './steps/AbilityScoresStep';
import { EquipmentStep } from './steps/EquipmentStep';
import { PreferencesStep } from './steps/PreferencesStep';
import { DnDRace } from '@/lib/types/race';
import { generateFantasyName } from '@/lib/utils/name-generator';

interface CharacterEditorClientProps {
    initialRaces: any[];
    initialClasses: any[];
}

export function CharacterEditorClient({ initialRaces, initialClasses }: CharacterEditorClientProps) {
    const [step, setStep] = useState(1);
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [characterData, setCharacterData] = useState({
        name: 'New Character', // Default name
        playerName: '',
        alignment: '',
        deity: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        race: null as DnDRace | null,
        avatarUrl: '', // Avatar handled in header now
        campaign: '',
        size: '',
        class: null as any | null,
        equipmentMethod: 'starting',
        preferences: {
            homebrew: false,
            advancement: 'xp',
            hpType: 'fixed',
            digitalDice: true,
            ignoreCoinWeight: false
        },
        privacy: 'public',
        abilityScores: {
            str: 10,
            dex: 10,
            con: 10,
            int: 10,
            wis: 10,
            cha: 10
        }
    });

    // Check user auth status
    useEffect(() => {
        const checkUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoadingUser(false);
        };
        checkUser();
    }, []);

    const updateData = (key: string, value: any) => {
        setCharacterData(prev => ({ ...prev, [key]: value }));
    };

    // Helper for updating nested ability scores
    const updateAbilityScore = (key: string, value: number) => {
        setCharacterData(prev => ({
            ...prev,
            abilityScores: {
                ...prev.abilityScores,
                [key]: value
            }
        }));
    };

    const steps = [
        { id: 1, label: 'Inicio', icon: Home, color: 'indigo' },
        { id: 2, label: 'Clase', icon: Sword, color: 'red' },
        { id: 3, label: 'Raza', icon: Users, color: 'purple' },
        { id: 4, label: 'Atributos', icon: Calculator, color: 'gold' },
        { id: 5, label: 'Equipo', icon: Backpack, color: 'blue' },
    ];

    const activeStep = steps.find(s => s.id === step) || steps[0];

    const handleGenerateName = () => {
        updateData('name', generateFantasyName());
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-dungeon-900 border border-dungeon-800 shadow-2xl">
                <div className="absolute inset-0 bg-[url('/images/textures/parchment-dark.jpg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-dungeon-950 via-dungeon-900/90 to-dungeon-950/50"></div>

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Link href="/3.5">
                                <Button variant="ghost" size="sm" className="text-dungeon-400 hover:text-dungeon-200 pl-0">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver al Inicio
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-dungeon-100 leading-tight">
                            Editor de Personajes
                        </h1>
                        <p className="text-lg text-dungeon-300 leading-relaxed">
                            Forja tu leyenda. Sigue los pasos para crear tu héroe.
                        </p>
                    </div>
                </div>
            </div>

            {/* Fixed Header: Name & Avatar */}
            <div className="sticky top-4 z-40 bg-dungeon-950/95 backdrop-blur-md border border-dungeon-700 rounded-lg p-4 shadow-xl flex items-center gap-6 animate-in slide-in-from-top-4 duration-500">
                {/* Avatar Placeholder/Uploader */}
                <div className="relative group shrink-0">
                    <div className="h-16 w-16 rounded-full bg-dungeon-800 border-2 border-dungeon-600 flex items-center justify-center overflow-hidden">
                        {characterData.avatarUrl ? (
                            <img src={characterData.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                        ) : (
                            <User className="h-8 w-8 text-dungeon-500" />
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                            <span className="text-[10px] text-white font-medium uppercase tracking-wider">Cambiar</span>
                        </div>
                    </div>
                    {/* Hidden Avatar Uploader (Mock logic) */}
                    <button
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onClick={() => updateData('avatarUrl', 'https://api.dicebear.com/7.x/adventurer/svg?seed=' + characterData.name)}
                        title="Click para generar avatar aleatorio (Mock)"
                    />
                </div>

                {/* Name Input */}
                <div className="flex-1 space-y-1">
                    <label className="text-xs uppercase font-bold text-dungeon-500 tracking-wider">Nombre del Personaje</label>
                    <div className="relative max-w-md">
                        <input
                            type="text"
                            className="w-full bg-transparent border-none text-2xl font-heading font-bold text-dungeon-100 placeholder-dungeon-700 focus:ring-0 px-0 py-0"
                            placeholder="Nombre del Personaje"
                            value={characterData.name}
                            onChange={(e) => updateData('name', e.target.value)}
                        />
                        <button
                            onClick={handleGenerateName}
                            className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline mt-1 block"
                        >
                            Ver sugerencias
                        </button>
                    </div>
                </div>

                {/* Current Step Indicator (Mobile/Compact) */}
                <div className="hidden md:block text-right">
                    <div className="text-3xl font-heading font-bold text-dungeon-600">
                        {step} <span className="text-lg text-dungeon-700">/ {steps.length}</span>
                    </div>
                    <div className="text-sm font-bold text-dungeon-500 uppercase">{activeStep.label}</div>
                </div>
            </div>

            {/* Wizard Navigation Tabs */}
            <div className="flex items-center justify-between md:justify-start gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {steps.map((s, idx) => {
                    const isActive = step === s.id;
                    const isCompleted = step > s.id;

                    return (
                        <button
                            key={s.id}
                            onClick={() => setStep(s.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all whitespace-nowrap ${isActive
                                ? `bg-${s.color}-900/30 border-${s.color}-500 text-${s.color}-200 shadow-[0_0_15px_rgba(var(--${s.color}-rgb),0.3)]`
                                : isCompleted
                                    ? 'bg-dungeon-900 border-dungeon-700 text-dungeon-400 hover:text-dungeon-200'
                                    : 'bg-transparent border-transparent text-dungeon-600 hover:text-dungeon-500'
                                }`}
                        >
                            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${isActive ? `bg-${s.color}-500 text-white` : 'bg-dungeon-800'
                                }`}>
                                {s.id}
                            </div>
                            <span className="font-heading font-bold tracking-wide">{s.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Layout Container with Sidebar for Ads */}
            <div className="flex gap-8 items-start">
                {/* Main Content Area */}
                <div className="flex-1 min-w-0 min-h-[500px] animate-in slide-in-from-bottom-8 duration-500">
                    {step === 1 && (
                        <PreferencesStep
                            data={characterData}
                            updateData={updateData}
                        />
                    )}

                    {step === 2 && (
                        <ClassSelectionStep
                            classes={initialClasses}
                            selectedClass={characterData.class}
                            onSelect={(cls) => updateData('class', cls)}
                        />
                    )}

                    {step === 3 && (
                        <RaceSelectionStep
                            races={initialRaces}
                            selectedRace={characterData.race}
                            onSelect={(race) => updateData('race', race)}
                        />
                    )}

                    {step === 4 && (
                        <AbilityScoresStep
                            data={characterData.abilityScores}
                            updateData={updateAbilityScore}
                            selectedRace={characterData.race}
                        />
                    )}

                    {step === 5 && (
                        <EquipmentStep
                            data={characterData}
                            updateData={updateData}
                            selectedClass={characterData.class}
                        />
                    )}
                </div>

                {/* Right Sidebar - Ads for non-members */}
                {/* DEBUG: Logic temporarily loosened for visibility testing. Original: !loadingUser && !user && */}
                {!loadingUser && (
                    <SideAd />
                )}
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-between items-center py-6 border-t border-dungeon-800 mt-12 bg-dungeon-950/50 backdrop-blur fixed bottom-0 left-0 right-0 px-8 z-30">
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    className="text-dungeon-300 hover:text-dungeon-100"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" /> Anterior
                </Button>

                <div className="flex gap-4">
                    {step === steps.length ? (
                        <Button
                            variant="primary"
                            size="lg"
                            className="bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/50"
                        >
                            Finalizar Personaje
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => setStep(Math.min(steps.length, step + 1))}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/50"
                        >
                            Siguiente Paso
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
