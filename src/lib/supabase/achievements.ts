// src/lib/supabase/achievements.ts
import { createClient } from '@/lib/supabase/server';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  xp_reward: number;
  requirement_type: string;
  requirement_value: number | null;
  is_hidden: boolean;
}

export interface UserAchievement {
  achievement_id: string;
  category: string;
  name: string;
  description: string;
  icon: string;
  xp_reward: number;
  unlocked_at: string | null;
  is_unlocked: boolean;
}

/**
 * Obtiene todos los achievements de un usuario (desbloqueados y disponibles)
 * Los achievements ocultos solo se muestran si están desbloqueados
 */
export async function getUserAchievements(userId: string): Promise<UserAchievement[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .rpc('get_user_achievements', {
      p_user_id: userId
    });

  if (error) {
    console.error('Error fetching user achievements:', error);
    return [];
  }

  return data || [];
}

/**
 * Obtiene los achievements desbloqueados de un usuario
 */
export async function getUnlockedAchievements(userId: string): Promise<UserAchievement[]> {
  const all = await getUserAchievements(userId);
  return all.filter(a => a.is_unlocked);
}

/**
 * Obtiene los achievements bloqueados de un usuario
 */
export async function getLockedAchievements(userId: string): Promise<UserAchievement[]> {
  const all = await getUserAchievements(userId);
  return all.filter(a => !a.is_unlocked);
}

/**
 * Obtiene achievements por categoría
 */
export async function getAchievementsByCategory(userId: string, category: string): Promise<UserAchievement[]> {
  const all = await getUserAchievements(userId);
  return all.filter(a => a.category === category);
}

/**
 * Verifica y desbloquea achievements manualmente (llamada desde acciones del usuario)
 * Normalmente no es necesario llamar esto ya que los triggers lo hacen automáticamente
 */
export async function checkAndUnlockAchievements(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .rpc('check_and_unlock_achievements', {
      p_user_id: userId
    });

  if (error) {
    console.error('Error checking achievements:', error);
    return null;
  }

  return data;
}

/**
 * Obtiene estadísticas de achievements de un usuario
 */
export async function getAchievementStats(userId: string) {
  const achievements = await getUserAchievements(userId);

  const unlocked = achievements.filter(a => a.is_unlocked);
  const total = achievements.length;
  const percentage = total > 0 ? Math.round((unlocked.length / total) * 100) : 0;

  const byCategory = achievements.reduce((acc, a) => {
    if (!acc[a.category]) {
      acc[a.category] = { total: 0, unlocked: 0 };
    }
    acc[a.category].total++;
    if (a.is_unlocked) {
      acc[a.category].unlocked++;
    }
    return acc;
  }, {} as Record<string, { total: number; unlocked: number }>);

  const totalXpEarned = unlocked.reduce((sum, a) => sum + a.xp_reward, 0);

  return {
    total,
    unlocked: unlocked.length,
    locked: total - unlocked.length,
    percentage,
    byCategory,
    totalXpEarned
  };
}
