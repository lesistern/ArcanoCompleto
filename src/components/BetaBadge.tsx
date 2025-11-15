'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Shield, User } from 'lucide-react';

interface Profile {
  email: string;
  role: string;
  display_name: string | null;
}

export function BetaBadge() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('email, role, display_name')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        setLoading(false);
        return;
      }

      setProfile(profileData);
      setLoading(false);
    } catch (error) {
      console.error('Error in loadProfile:', error);
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.push('/beta-landing');
      router.refresh();
    } catch (error) {
      console.error('Error logging out:', error);
      setLoggingOut(false);
    }
  }

  if (loading) {
    return null;
  }

  if (!profile) {
    return null;
  }

  const displayName = profile.display_name || profile.email.split('@')[0];
  const isBetaTester = profile.role === 'beta_tester';
  const isAdmin = profile.role === 'admin';

  return (
    <div className="flex items-center gap-3">
      {/* Beta/Admin Badge */}
      {(isBetaTester || isAdmin) && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full">
          <Shield className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-medium text-amber-400">
            {isAdmin ? 'ADMIN' : 'BETA TESTER'}
          </span>
        </div>
      )}

      {/* User Info */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-dungeon-800 border border-dungeon-700 rounded-lg">
        <User className="w-4 h-4 text-dungeon-400" />
        <span className="text-sm text-dungeon-200">{displayName}</span>
      </div>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        disabled={loggingOut}
        variant="ghost"
        size="sm"
        className="text-dungeon-400 hover:text-dungeon-100 hover:bg-dungeon-800"
      >
        <LogOut className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">
          {loggingOut ? 'Saliendo...' : 'Salir'}
        </span>
      </Button>
    </div>
  );
}
