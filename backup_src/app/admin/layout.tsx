'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AdminSidebar } from './components/AdminSidebar';
import { GlobalSearch } from './components/GlobalSearch';
import { ToastProvider } from '@/contexts/ToastContext';
import { ShortcutsHelp } from '@/components/admin/ShortcutsHelp';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        checkAuthorization();

        // Load sidebar state from localStorage
        const savedState = localStorage.getItem('admin-sidebar-collapsed');
        if (savedState !== null) {
            setSidebarCollapsed(JSON.parse(savedState));
        }

        // Listen for sidebar state changes
        const handleStorage = () => {
            const state = localStorage.getItem('admin-sidebar-collapsed');
            if (state !== null) {
                setSidebarCollapsed(JSON.parse(state));
            }
        };

        window.addEventListener('storage', handleStorage);
        window.addEventListener('sidebar-toggle', handleStorage as EventListener);

        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('sidebar-toggle', handleStorage as EventListener);
        };
    }, []);

    async function checkAuthorization() {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/');
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('tier_code')
                .eq('id', user.id)
                .single();

            if (!profile || !['admin', 'reviewer'].includes(profile.tier_code)) {
                router.push('/');
                return;
            }

            setAuthorized(true);
        } catch (err) {
            console.error('Error checking authorization:', err);
            router.push('/');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-dungeon-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-dungeon-400">Verificando permisos...</p>
                </div>
            </div>
        );
    }

    if (!authorized) {
        return null;
    }

    return (
        <ToastProvider>
            <div className="min-h-screen bg-dungeon-950">
                <AdminSidebar />
                <div
                    className={`
            transition-all duration-300 ease-in-out
            ${sidebarCollapsed ? 'ml-16' : 'ml-64'}
          `}
                >
                    <header className="sticky top-0 z-30 bg-dungeon-900 border-b border-dungeon-700 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 max-w-xl">
                                <GlobalSearch />
                            </div>
                        </div>
                    </header>

                    <main>
                        {children}
                    </main>
                </div>

                <ShortcutsHelp />
            </div>
        </ToastProvider>
    );
}
