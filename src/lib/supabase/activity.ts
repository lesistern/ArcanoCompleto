// src/lib/supabase/activity.ts
import { createClient } from '@/lib/supabase/server';

export interface UserActivity {
  id: string;
  activity_type: string;
  activity_data: any;
  xp_earned: number;
  created_at: string;
}

export interface RecentActivity extends UserActivity {
  user_id: string;
  username_slug: string;
  display_name: string;
  avatar_url: string | null;
}

/**
 * Obtiene el timeline de actividad de un usuario
 */
export async function getUserActivityTimeline(
  userId: string,
  limit: number = 20,
  offset: number = 0
): Promise<UserActivity[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .rpc('get_user_activity_timeline', {
      p_user_id: userId,
      p_limit: limit,
      p_offset: offset
    });

  if (error) {
    console.error('Error fetching user activity:', error);
    return [];
  }

  return data || [];
}

/**
 * Obtiene actividad reciente de todos los usuarios públicos
 */
export async function getRecentActivityAll(limit: number = 50): Promise<RecentActivity[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .rpc('get_recent_activity_all', {
      p_limit: limit
    });

  if (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }

  return data || [];
}

/**
 * Obtiene estadísticas de actividad de un usuario
 */
export async function getUserActivityStats(userId: string) {
  const activities = await getUserActivityTimeline(userId, 1000);

  const totalActivities = activities.length;
  const totalXpEarned = activities.reduce((sum, a) => sum + a.xp_earned, 0);

  const byType = activities.reduce((acc, a) => {
    acc[a.activity_type] = (acc[a.activity_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Actividad por día (últimos 30 días)
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const recentActivities = activities.filter(
    a => new Date(a.created_at) >= last30Days
  );

  const activityByDay = recentActivities.reduce((acc, a) => {
    const date = new Date(a.created_at).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalActivities,
    totalXpEarned,
    byType,
    activityByDay,
    last30DaysCount: recentActivities.length
  };
}

/**
 * Registra una actividad manualmente (para casos especiales)
 * Normalmente no es necesario ya que los triggers lo hacen automáticamente
 */
export async function logActivity(
  userId: string,
  activityType: string,
  activityData: any,
  xpEarned: number = 0
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('user_activity_log')
    .insert({
      user_id: userId,
      activity_type: activityType,
      activity_data: activityData,
      xp_earned: xpEarned
    })
    .select()
    .single();

  if (error) {
    console.error('Error logging activity:', error);
    return null;
  }

  return data;
}
