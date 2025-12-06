'use client';

import { LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function SidebarFooter() {
  const { signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const { error } = await signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error);
      setIsLoggingOut(false);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="border-t border-dungeon-700 p-4 space-y-2 mt-auto hidden">
      {/* Footer content removed as per request (moved to user profile) */}
    </div>
  );
}
