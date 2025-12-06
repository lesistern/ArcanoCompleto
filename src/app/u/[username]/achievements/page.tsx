'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Award } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/Card';
import { pageContainerPadding } from '@/lib/utils/responsive-spacing';
import { AchievementsByCategory } from '@/components/profile/AchievementsByCategory';

interface ProfileData {
  id: string;
  username_slug: string;
  display_name: string | null;
  profile_hidden: boolean;
  can_view: boolean;
}

interface Achievement {
  achievement_id: string;
  category: string;
  name: string;
  description: string;
  icon: string;
  xp_reward: number;
  unlocked_at: string | null;
  is_unlocked: boolean;
}

export default function UserAchievementsPage() {
  const params = useParams();
  const username = params.username as string;

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, [username]);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      // Cargar perfil
      const { data: profileData, error: profileError } = await supabase.rpc(
        'get_profile_by_username',
        { p_username_slug: username }
      );

      if (profileError || !profileData || profileData.length === 0) {
        setError('Perfil no encontrado');
        return;
      }

      const userProfile = profileData[0];

      if (!userProfile.can_view) {
        setError('Este perfil está oculto');
        return;
      }

      setProfile(userProfile);

      // Cargar achievements
      if (userProfile.id) {
        const { data: achievementsData, error: achievementsError } = await supabase.rpc(
          'get_user_achievements',
          { p_user_id: userProfile.id }
        );

        if (!achievementsError && achievementsData) {
          setAchievements(achievementsData);
        }
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  }

  const handleShareAchievement = async (achievementId: string) => {
    const achievement = achievements.find(a => a.achievement_id === achievementId);
    if (!achievement) return;

    const shareUrl = `${window.location.origin}/u/${username}/achievements#${achievementId}`;
    const shareText = `¡Desbloqueé el achievement "${achievement.name}" en D&D Compendium! ${shareUrl}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: achievement.name,
          text: shareText,
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen bg-dungeon-950 ${pageContainerPadding}`}>
        <div className="max-w-6xl mx-auto text-center py-12 text-dungeon-200" role="status" aria-live="polite">
          Cargando achievements...
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className={`min-h-screen bg-dungeon-950 ${pageContainerPadding}`}>
        <div className="max-w-6xl mx-auto">
          <Card className="card">
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold text-dungeon-200 mb-2 font-heading">
                {error || 'Perfil no encontrado'}
              </h2>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const unlockedAchievements = achievements.filter(a => a.is_unlocked);
  const totalXpEarned = unlockedAchievements.reduce((sum, a) => sum + (a.xp_reward || 0), 0);

  return (
    <div className={`min-h-screen bg-dungeon-950 ${pageContainerPadding}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href={`/u/${username}`}
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al perfil
          </Link>
        </div>

        {/* Page Header */}
        <Card className="card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold-500/20 to-orange-500/20 flex items-center justify-center border-2 border-gold-500/40">
                <Award className="w-8 h-8 text-gold-400" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gold-300 mb-2 font-heading">
                  Achievements de {profile.display_name || profile.username_slug}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-dungeon-300">
                  <span className="flex items-center gap-2">
                    <span className="text-gold-400 font-bold">{unlockedAchievements.length}</span>
                    de {achievements.length} desbloqueados
                    <span className="text-dungeon-400">
                      ({achievements.length > 0 ? Math.round((unlockedAchievements.length / achievements.length) * 100) : 0}%)
                    </span>
                  </span>
                  <span className="text-dungeon-500">•</span>
                  <span className="flex items-center gap-2">
                    <span className="text-gold-400 font-bold">{totalXpEarned}</span>
                    XP ganada
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements por Categoría */}
        {achievements.length > 0 ? (
          <AchievementsByCategory
            achievements={achievements.map(a => ({
              id: a.achievement_id,
              name: a.name,
              description: a.description,
              icon: a.icon,
              category: a.category,
              unlocked_at: a.unlocked_at,
              xp_reward: a.xp_reward
            }))}
            showShareButtons={true}
            onShareAchievement={handleShareAchievement}
          />
        ) : (
          <Card className="card">
            <CardContent className="p-12 text-center">
              <Award className="w-16 h-16 text-dungeon-500 mx-auto mb-4" />
              <p className="text-dungeon-300">No hay achievements disponibles</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
