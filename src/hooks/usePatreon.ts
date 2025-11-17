'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

type PatreonTier = 'free' | 'heroe_emergente' | 'campeon_consagrado' | 'leyenda_viviente';

interface TierInfo {
  tier_code: PatreonTier;
  tier_name: string;
  tier_price: string;
  tier_color: string;
  tier_icon: string;
}

interface PatreonProfile {
  patreon_tier: PatreonTier;
  patreon_since: string | null;
  patreon_status: string;
}

export function usePatreon(user?: User | null) {
  const [tier, setTier] = useState<PatreonTier>('free');
  const [tierInfo, setTierInfo] = useState<TierInfo | null>(null);
  const [profile, setProfile] = useState<PatreonProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatreonData = async () => {
      const supabase = createClient();

      // Get current user if not provided
      let currentUser = user;
      if (!currentUser) {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        currentUser = authUser;
      }

      if (!currentUser) {
        setTier('free');
        setLoading(false);
        return;
      }

      try {
        // Fetch user's Patreon tier
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('patreon_tier, patreon_since, patreon_status')
          .eq('id', currentUser.id)
          .single();

        if (profileError) throw profileError;

        const userTier = (profileData?.patreon_tier || 'free') as PatreonTier;
        setTier(userTier);
        setProfile(profileData);

        // Fetch tier info using RPC function
        const { data: tierData, error: tierError } = await supabase
          .rpc('get_tier_info', { tier: userTier });

        if (tierError) throw tierError;

        if (tierData && tierData.length > 0) {
          setTierInfo(tierData[0]);
        }
      } catch (error) {
        console.error('Error fetching Patreon data:', error);
        setTier('free');
      } finally {
        setLoading(false);
      }
    };

    fetchPatreonData();
  }, [user]);

  /**
   * Check if user has access to a specific benefit
   * @param requiredTier - Minimum tier required
   * @returns true if user has access, false otherwise
   */
  const hasBenefit = (requiredTier: PatreonTier): boolean => {
    const hierarchy: Record<PatreonTier, number> = {
      free: 0,
      heroe_emergente: 1,
      campeon_consagrado: 2,
      leyenda_viviente: 3,
    };

    return hierarchy[tier] >= hierarchy[requiredTier];
  };

  /**
   * Check if user's subscription is active
   */
  const isActive = (): boolean => {
    return profile?.patreon_status === 'active';
  };

  /**
   * Get days since user became a patron
   */
  const getDaysSincePatron = (): number | null => {
    if (!profile?.patreon_since) return null;

    const since = new Date(profile.patreon_since);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - since.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  return {
    tier,
    tierInfo,
    profile,
    loading,
    hasBenefit,
    isActive,
    getDaysSincePatron,
    // Shortcuts for common tier checks
    isFree: tier === 'free',
    isHeroeEmergente: tier === 'heroe_emergente',
    isCampeonConsagrado: tier === 'campeon_consagrado',
    isLeyendaViviente: tier === 'leyenda_viviente',
  };
}
