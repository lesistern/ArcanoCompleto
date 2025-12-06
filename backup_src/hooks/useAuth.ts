'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  tier_code: string;
  display_name: string | null;
  username?: string | null;
  avatar_url: string | null;
  bio: string | null;
  preferred_language: string;
  translations_submitted: number;
  translations_approved: number;
  reviews_completed: number;
  reputation_points: number;
  created_at: string;
  updated_at: string;
  role?: string | null;
  is_admin?: boolean | null;
}

export interface UserTier {
  code: string;
  name: string;
  description: string | null;
  can_translate: boolean;
  can_review: boolean;
  can_approve: boolean;
  max_edits_per_day: number | null;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  tier: UserTier | null;
  session: Session | null;
  loading: boolean;
  error: Error | null;
}

export function useAuth() {
  const supabase = createClient();
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    tier: null,
    session: null,
    loading: true,
    error: null,
  });

  // Cargar perfil y tier del usuario
  const loadUserData = async (userId: string) => {
    try {
      // Cargar perfil
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      // Cargar tier
      const { data: tier, error: tierError } = await supabase
        .from('user_tiers')
        .select('*')
        .eq('code', profile.tier_code)
        .single();

      if (tierError) throw tierError;

      setState(prev => ({
        ...prev,
        profile,
        tier,
        loading: false,
        error: null,
      }));

      // Actualizar last_active_at
      await supabase
        .from('profiles')
        .update({ last_active_at: new Date().toISOString() })
        .eq('id', userId);

    } catch (error) {
      console.error('Error loading user data:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error as Error,
      }));
    }
  };

  // Efecto para gestionar la sesión
  useEffect(() => {
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
        setState(prev => ({ ...prev, loading: false, error }));
        return;
      }

      setState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
      }));

      if (session?.user) {
        loadUserData(session.user.id);
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    });

    // Escuchar cambios en la autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
      }));

      if (session?.user) {
        loadUserData(session.user.id);
      } else {
        setState({
          user: null,
          profile: null,
          tier: null,
          session: null,
          loading: false,
          error: null,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Funciones de autenticación
  const signUp = async (email: string, password: string, displayName?: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      setState(prev => ({ ...prev, loading: false, error }));
      return { data: null, error };
    }

    return { data, error: null };
  };

  const signIn = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setState(prev => ({ ...prev, loading: false, error }));
      return { data: null, error };
    }

    return { data, error: null };
  };

  const signOut = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const { error } = await supabase.auth.signOut();

    if (error) {
      setState(prev => ({ ...prev, loading: false, error }));
      return { error };
    }

    setState({
      user: null,
      profile: null,
      tier: null,
      session: null,
      loading: false,
      error: null,
    });

    return { error: null };
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!state.user) {
      return { error: new Error('No authenticated user') };
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', state.user.id)
      .select()
      .single();

    if (error) {
      setState(prev => ({ ...prev, loading: false, error }));
      return { data: null, error };
    }

    setState(prev => ({
      ...prev,
      profile: data,
      loading: false,
    }));

    return { data, error: null };
  };

  // Magic Link Login
  const signInWithMagicLink = async (email: string, redirectTo?: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      },
    });

    setState(prev => ({ ...prev, loading: false }));

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  };

  // OAuth Login
  const signInWithProvider = async (
    provider: 'apple' | 'azure' | 'bitbucket' | 'discord' | 'facebook' | 'figma' | 'gitlab' | 'google' | 'kakao' | 'keycloak' | 'linkedin' | 'linkedin_oidc' | 'notion' | 'slack' | 'slack_oidc' | 'spotify' | 'twitch' | 'twitter' | 'workos' | 'zoom' | 'fly',
    redirectTo?: string
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: 'consent',
        },
      },
    });

    setState(prev => ({ ...prev, loading: false }));

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  };

  // Password Reset Request
  const sendPasswordReset = async (email: string, redirectTo?: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo || `${window.location.origin}/auth/reset-password`,
    });

    setState(prev => ({ ...prev, loading: false }));

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  };

  // Update Password (after reset or for logged-in users)
  const updatePassword = async (newPassword: string) => {
    if (!state.user) {
      return { error: new Error('No authenticated user') };
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setState(prev => ({ ...prev, loading: false }));

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  };

  // Update User Email
  const updateEmail = async (newEmail: string) => {
    if (!state.user) {
      return { error: new Error('No authenticated user') };
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    const { data, error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    setState(prev => ({ ...prev, loading: false }));

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  };

  // Admin: Invite User via Email (requires service role key in backend)
  const inviteUserByEmail = async (email: string, data?: { display_name?: string; tier_code?: string }) => {
    if (!state.tier?.can_approve) {
      return { error: new Error('Insufficient permissions. Only admins can invite users.') };
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    // This should be done via a backend API endpoint with service role key
    // For now, we'll use the client SDK which requires proper RLS policies
    try {
      const response = await fetch('/api/admin/invite-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, data }),
      });

      const result = await response.json();

      setState(prev => ({ ...prev, loading: false }));

      if (!response.ok) {
        return { data: null, error: new Error(result.error || 'Failed to send invite') };
      }

      return { data: result, error: null };
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
      return { data: null, error: error as Error };
    }
  };

  return {
    ...state,
    signUp,
    signIn,
    signOut,
    updateProfile,
    signInWithMagicLink,
    signInWithProvider,
    sendPasswordReset,
    updatePassword,
    updateEmail,
    inviteUserByEmail,
    isAuthenticated: !!state.user,
    canTranslate: state.tier?.can_translate ?? false,
    canReview: state.tier?.can_review ?? false,
    canApprove: state.tier?.can_approve ?? false,
  };
}
