'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AdminSidebar } from './components/AdminSidebar';
import { ToastProvider } from '@/contexts/ToastContext';

// Lazy-load search and help components (not critical for initial load)
const GlobalSearch = dynamic(() => import('./components/GlobalSearch').then(mod => ({ default: mod.GlobalSearch })), {
  loading: () => <div className="h-10 bg-dungeon-800 rounded animate-pulse" />
});
const ShortcutsHelpLazy = dynamic(() => import('@/components/admin/ShortcutsHelp').then(mod => ({ default: mod.ShortcutsHelp })), {
  loading: () => null
});

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        // Authorization check
        checkAuthorization();
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

    if (!authorized) return null;

    return (
        <ToastProvider>
            {/* Main flexbox container - Full screen, no scroll */}
            <div className="flex h-screen overflow-hidden bg-dungeon-950">

                {/* Sidebar - AdminSidebar Component handles its own styling */}
                <AdminSidebar />

                {/* Main area - Flex column, full remaining width */}
                <div className="flex-1 flex flex-col overflow-hidden">

                    {/* Admin Header - Sticky, fixed height */}
                    <header className="
          sticky top-0 z-40
          flex-shrink-0
          bg-dungeon-900 border-b border-dungeon-700
          px-6 py-4
        ">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 max-w-xl">
                                <GlobalSearch />
                            </div>
                        </div>
                    </header>

                    {/* Main content - Scrollable */}
                    <main className="flex-1 overflow-y-auto overflow-x-hidden">
                        <div className="p-6">
                            {children}
                        </div>
                    </main>
                </div>

                <ShortcutsHelpLazy />
            </div>
        </ToastProvider>
    );
}
