'use client';

import { useEffect } from 'react';
import { useSystem, SystemKey } from '@/contexts/SystemContext';

export function SystemSyncer({ systemKey }: { systemKey: SystemKey }) {
    const { setSystem } = useSystem();

    useEffect(() => {
        setSystem(systemKey);
    }, [systemKey, setSystem]);

    return null;
}
