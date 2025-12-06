/**
 * Hook para obtener información del tier del usuario
 */

import { useAuth } from './useAuth';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export type UserTier = 'guest' | 'user' | 'contributor' | 'translator' | 'reviewer' | 'admin';

export interface UserTierInfo {
  tier: UserTier;
  canTranslate: boolean;
  canReview: boolean;
  canApprove: boolean;
  maxEditsPerDay: number;
  hasTranslationAccess: boolean;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook que obtiene información del tier del usuario
 */
export function useUserTier(): UserTierInfo {
  const { user } = useAuth();
  const [tier, setTier] = useState<UserTier>('guest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserTier = async () => {
      if (!user) {
        setTier('guest');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const client = createClient();

        const { data, error: fetchError } = await client
          .from('profiles')
          .select('tier_code')
          .eq('id', user.id)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        setTier((data?.tier_code as UserTier) || 'user');
        setError(null);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Error fetching user tier');
        setError(error);
        console.error('Error fetching user tier:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTier();
  }, [user]);

  // Calcular permisos basados en tier
  const canTranslate = ['contributor', 'translator', 'reviewer', 'admin'].includes(tier);
  const canReview = ['reviewer', 'admin'].includes(tier);
  const canApprove = ['reviewer', 'admin'].includes(tier);
  const hasTranslationAccess = canTranslate;

  // Máximo de ediciones por día
  const maxEditsPerDay = {
    guest: 0,
    user: 0,
    contributor: 10,
    translator: 50,
    reviewer: 100,
    admin: 999,
  }[tier];

  return {
    tier,
    canTranslate,
    canReview,
    canApprove,
    maxEditsPerDay,
    hasTranslationAccess,
    isLoading,
    error,
  };
}

/**
 * Función auxiliar para verificar si un tier tiene un permiso
 */
export function hasTierPermission(tier: UserTier, permission: string): boolean {
  const permissions: Record<UserTier, string[]> = {
    guest: [],
    user: ['view'],
    contributor: ['view', 'suggest_edits', 'vote'],
    translator: ['view', 'suggest_edits', 'vote', 'create_translations', 'review_own'],
    reviewer: ['view', 'suggest_edits', 'vote', 'create_translations', 'review_all', 'approve'],
    admin: ['*'],
  };

  const tierPermissions = permissions[tier];
  return tierPermissions.includes('*') || tierPermissions.includes(permission);
}
