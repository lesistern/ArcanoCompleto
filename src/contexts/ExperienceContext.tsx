'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';

export type ExperienceLevel = 'novato' | 'intermedio' | 'experto';

interface ExperienceContextType {
    level: ExperienceLevel;
    setLevel: (level: ExperienceLevel) => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
    const [level, setLevelState] = useState<ExperienceLevel>('novato');
    const { user, profile, updateProfile } = useAuth();

    // Load from local storage on mount
    useEffect(() => {
        const savedLevel = localStorage.getItem('experience_level') as ExperienceLevel;
        if (savedLevel) {
            setLevelState(savedLevel);
        }
    }, []);

    // Sync from profile when loaded
    useEffect(() => {
        if (profile?.experience_level && profile.experience_level !== level) {
            setLevelState(profile.experience_level as ExperienceLevel);
            localStorage.setItem('experience_level', profile.experience_level);
        }
    }, [profile, level]);

    const setLevel = async (newLevel: ExperienceLevel) => {
        setLevelState(newLevel);
        localStorage.setItem('experience_level', newLevel);

        if (user) {
            await updateProfile({ experience_level: newLevel });
        }
    };

    return (
        <ExperienceContext.Provider value={{ level, setLevel }}>
            {children}
        </ExperienceContext.Provider>
    );
}

export function useExperience() {
    const context = useContext(ExperienceContext);
    if (context === undefined) {
        throw new Error('useExperience must be used within a ExperienceProvider');
    }
    return context;
}
