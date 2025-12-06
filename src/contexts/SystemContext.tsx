'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';

export type SystemKey = 'dnd_35' | 'dnd_5e' | 'dnd_55' | 'pathfinder' | 'starfinder';

interface SystemContextType {
    system: SystemKey;
    setSystem: (system: SystemKey) => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: React.ReactNode }) {
    const [system, setSystemState] = useState<SystemKey>('dnd_35');
    const { user, profile, updateProfile } = useAuth();

    // Load from local storage on mount
    useEffect(() => {
        const savedSystem = localStorage.getItem('preferred_system') as SystemKey;
        if (savedSystem) {
            setSystemState(savedSystem);
        }
    }, []);

    // Sync from profile when loaded
    useEffect(() => {
        if (profile?.preferred_system && profile.preferred_system !== system) {
            setSystemState(profile.preferred_system as SystemKey);
            localStorage.setItem('preferred_system', profile.preferred_system);
        }
    }, [profile, system]);

    const setSystem = async (newSystem: SystemKey) => {
        setSystemState(newSystem);
        localStorage.setItem('preferred_system', newSystem);

        if (user) {
            await updateProfile({ preferred_system: newSystem });
        }
    };

    return (
        <SystemContext.Provider value={{ system, setSystem }}>
            {children}
        </SystemContext.Provider>
    );
}

export function useSystem() {
    const context = useContext(SystemContext);
    if (context === undefined) {
        throw new Error('useSystem must be used within a SystemProvider');
    }
    return context;
}
