'use client';

import { useSidebar } from '@/hooks/useSidebar';
import { ReactNode } from 'react';

export default function LayoutWrapper({ children }: { children: ReactNode }) {
    const { isCollapsed } = useSidebar();

    return (
        <div className={`flex min-h-screen flex-col md:grid transition-all duration-300 ${isCollapsed ? 'md:grid-cols-[80px_1fr]' : 'md:grid-cols-[288px_1fr]'
            }`}>
            {children}
        </div>
    );
}
