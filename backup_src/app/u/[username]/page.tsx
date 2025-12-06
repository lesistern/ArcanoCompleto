'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Award,
  Trophy,
  EyeOff,
  ArrowLeft,
  Calendar,
  TrendingUp,
  MessageSquare,
  MapPin,
  Globe,
  Twitter
} from 'lucide-react';
import { ProfileAvatar } from '@/components/profile/ProfileAvatar';
import { XPProgressBar } from '@/components/profile/XPProgressBar';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { AchievementBadge } from '@/components/profile/AchievementBadge';
import { ActivityTimeline } from '@/components/profile/ActivityTimeline';
import { getNextLevelXp, getCurrentLevelXp } from '@/lib/utils/levelUtils';

interface ProfileData {
  id: string;
  username_slug: string;
  display_name: string | null;
  tier: string;
  experience_points: number;
  level: number;
  level_title: string;
  level_tier: string;
  reports_submitted: number;
  reports_resolved: number;
  total_votes_received: number;
  profile_hidden: boolean;
  created_at: string;
  resolution_rate: number;
  avg_votes_per_report: number;
  global_rank: number;
  can_view: boolean;
  // Nuevos campos
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  twitter_url: string | null;
  website_url: string | null;
  show_email: boolean;
  show_location: boolean;
  show_characters: boolean;
  show_activity: boolean;
}

interface UserReport {
  id: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
  vote_count: number;
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

interface Activity {
  id: string;
  activity_type: string;
  activity_data: any;
  xp_earned: number;
  created_at: string;
}

const TIER_BADGES = {
  admin: { label: 'Admin', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
  reviewer: { label: 'Revisor', color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
  translator: { label: 'Traductor', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
  contributor: { label: 'Colaborador', color: 'text-green-400 border-green-500/30 bg-green-500/10' },
  beta_tester: { label: 'Beta Tester', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
  user: { label: 'Usuario', color: 'text-dungeon-400 border-dungeon-700 bg-dungeon-800' },
};

const CATEGORY_LABELS: Record<string, string> = {
  bug: 'Bug',
  feature: 'Característica',
  translation: 'Traducción',
  data: 'Datos',
  ui: 'Interfaz',
  performance: 'Rendimiento',
  other: 'Otro',
};

const STATUS_LABELS: Record<string, string> = {
  open: 'Abierto',
  in_progress: 'En progreso',
  resolved: 'Resuelto',
  closed: 'Cerrado',
  wont_fix: 'No se arreglará',
};

const TIER_COLORS: Record<string, string> = {
  Novato: 'text-gray-400',
  Héroe: 'text-blue-400',
  Épico: 'text-purple-400',
  Legendario: 'text-orange-400',
};

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [reports, setReports] = useState<UserReport[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    loadProfile();
    loadUserReports();
  }, [username]);

  async function loadProfile() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: rpcError } = await supabase.rpc('get_profile_by_username', {
        p_username_slug: username,
      });

      if (rpcError) {
        console.error('Error loading profile:', rpcError);
        setError('Perfil no encontrado');
        return;
      }

      if (!data || data.length === 0) {
        setError('Perfil no encontrado');
        return;
      }

      const profileData = data[0];

      // Check if user can view this profile
      if (!profileData.can_view) {
        setError('Este perfil está oculto');
        return;
      }

      setProfile(profileData);

      // Cargar achievements y actividad si el perfil es visible
      if (profileData.id) {
        loadAchievements(profileData.id);
        if (profileData.show_activity) {
          loadActivity(profileData.id);
        }
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
  }

  async function loadUserReports() {
    if (!username) return;

    try {
      const { data, error } = await supabase
        .from('v_user_public_reports')
        .select('*')
        .eq('author_username', username)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error loading user reports:', error);
        return;
      }

      setReports(data || []);
    } catch (err) {
      console.error('Error loading reports:', err);
    }
  }

  async function loadAchievements(userId: string) {
    try {
      const { data, error } = await supabase
        .rpc('get_user_achievements', {
          p_user_id: userId
        });

      if (error) {
        console.error('Error loading achievements:', error);
        return;
      }

      setAchievements(data || []);
    } catch (err) {
      console.error('Error loading achievements:', err);
    }
  }

  async function loadActivity(userId: string) {
    try {
      const { data, error } = await supabase
        .rpc('get_user_activity_timeline', {
          p_user_id: userId,
          p_limit: 20,
          p_offset: 0
        });

      if (error) {
        console.error('Error loading activity:', error);
        return;
      }

      setActivities(data || []);
    } catch (err) {
      console.error('Error loading activity:', err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dungeon-950 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12 text-dungeon-400">
            Cargando perfil...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dungeon-950 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al leaderboard
          </Link>

          <Card className="bg-dungeon-800 border-dungeon-700">
            <CardContent className="p-12 text-center">
              <EyeOff className="w-16 h-16 text-dungeon-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-dungeon-300 mb-2 font-heading">
                {error}
              </h2>
              <p className="text-dungeon-500">
                {error === 'Este perfil está oculto'
                  ? 'El usuario ha configurado su perfil como privado.'
                  : 'No se pudo encontrar este perfil.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const tierInfo = TIER_BADGES[profile.tier as keyof typeof TIER_BADGES] || TIER_BADGES.user;

  // Calcular XP para siguiente nivel
  const nextLevelXp = getNextLevelXp(profile.level);
  const currentLevelXp = getCurrentLevelXp(profile.level);

  const unlockedAchievements = achievements.filter(a => a.is_unlocked);

  return (
    <div className="min-h-screen bg-dungeon-950 py-4 md:py-8 px-3 md:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back to Leaderboard */}
        <Link
          href="/leaderboard"
          className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-4 md:mb-6 text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al leaderboard
        </Link>

        {/* Profile Header */}
        <Card className="mb-6 bg-gradient-to-br from-gold-900/30 via-dungeon-800 to-dungeon-900 border-gold-500/40 shadow-2xl shadow-gold-900/20 overflow-hidden relative">
          {/* Efecto de brillo de fondo */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none -z-10" />

          <CardContent className="p-4 md:p-8 relative z-10">
            {/* Layout Mobile First: Vertical en móvil, horizontal en desktop */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 mb-6 md:mb-8">
              {/* Avatar - Centrado en móvil */}
              <div className="relative flex-shrink-0 mx-auto md:mx-0">
                <ProfileAvatar
                  userId={profile.id}
                  avatarUrl={profile.avatar_url}
                  displayName={profile.display_name}
                  size="xl"
                  editable={false}
                />
              </div>

              {/* Info principal */}
              <div className="flex-1 min-w-0 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <h1 className="text-2xl md:text-4xl font-bold text-gold-300 font-heading">
                    {profile.display_name || `Usuario ${profile.username_slug}`}
                  </h1>
                  <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                    <span className={`text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full border font-semibold ${tierInfo.color} shadow-lg`}>
                      {tierInfo.label}
                    </span>
                    {profile.profile_hidden && (
                      <span className="text-xs px-3 py-1.5 rounded-full border border-dungeon-600 bg-dungeon-800/80 text-dungeon-400 flex items-center gap-1 backdrop-blur-sm">
                        <EyeOff className="w-3 h-3" />
                        Perfil oculto
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-sm md:text-base text-gold-500/70 mb-3 md:mb-4 font-medium">
                  @{profile.username_slug}
                </div>

                {/* Bio */}
                {profile.bio && (
                  <p className="text-dungeon-200 mb-3 md:mb-4 max-w-2xl text-sm md:text-base leading-relaxed">
                    {profile.bio}
                  </p>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dungeon-800/50 border border-dungeon-700/50 text-sm text-dungeon-300">
                    <Calendar className="w-4 h-4 text-gold-400" />
                    Miembro desde {new Date(profile.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </div>

                  {profile.show_location && profile.location && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dungeon-800/50 border border-dungeon-700/50 text-sm text-dungeon-300">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      {profile.location}
                    </div>
                  )}

                  {/* Enlaces sociales */}
                  {profile.twitter_url && (
                    <a
                      href={profile.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dungeon-800/50 border border-dungeon-700/50 text-sm text-dungeon-300 hover:bg-dungeon-700/50 hover:border-blue-500/50 hover:text-blue-400 transition-all"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </a>
                  )}

                  {profile.website_url && (
                    <a
                      href={profile.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dungeon-800/50 border border-dungeon-700/50 text-sm text-dungeon-300 hover:bg-dungeon-700/50 hover:border-green-500/50 hover:text-green-400 transition-all"
                    >
                      <Globe className="w-4 h-4" />
                      Sitio web
                    </a>
                  )}
                </div>
              </div>

              {/* Nivel y XP - Card mejorada - Full width en móvil */}
              <div className="relative w-full md:w-auto md:flex-shrink-0">
                <div className="flex items-center gap-3 md:gap-4 px-4 md:px-8 py-4 md:py-6 bg-gradient-to-br from-gold-900/40 to-orange-900/40 border-2 border-gold-500/40 rounded-xl backdrop-blur-sm">
                  <Trophy className="w-10 h-10 md:w-12 md:h-12 text-gold-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                  <div className="flex-1 md:text-right">
                    <div className="text-2xl md:text-4xl font-bold text-gold-300 mb-1 font-heading">
                      {profile.experience_points.toLocaleString()}
                    </div>
                    <div className="text-xs text-gold-400/80 font-semibold mb-1 md:mb-2">EXP</div>
                    <div className={`text-xs md:text-sm font-bold ${TIER_COLORS[profile.level_tier] || 'text-gold-400'} mb-1`}>
                      Nivel {profile.level} · {profile.level_title}
                    </div>
                    <div className="text-xs text-dungeon-400 flex items-center gap-1 md:justify-end">
                      <Award className="w-3 h-3" />
                      Ranking #{profile.global_rank}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Barra de progreso de nivel */}
            <div className="mb-6 md:mb-8">
              <XPProgressBar
                currentXp={profile.experience_points}
                currentLevelXp={currentLevelXp}
                nextLevelXp={nextLevelXp}
                level={profile.level}
              />
            </div>

            {/* Stats Grid - Cards individuales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-4 md:pt-6 border-t border-gold-500/20">
              <div className="p-3 md:p-4 rounded-lg bg-dungeon-800/50 border border-dungeon-700 hover:border-blue-500/50 transition-all">
                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1 font-heading">{profile.reports_submitted}</div>
                <div className="text-xs md:text-sm text-dungeon-300 font-medium">Reportes enviados</div>
              </div>

              <div className="p-3 md:p-4 rounded-lg bg-dungeon-800/50 border border-dungeon-700 hover:border-green-500/50 transition-all">
                <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1 font-heading">{profile.reports_resolved}</div>
                <div className="text-xs md:text-sm text-dungeon-300 font-medium">Resueltos</div>
                <div className="text-xs text-green-400/70 mt-1">{profile.resolution_rate}% resolución</div>
              </div>

              <div className="p-3 md:p-4 rounded-lg bg-dungeon-800/50 border border-dungeon-700 hover:border-purple-500/50 transition-all">
                <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1 font-heading">{profile.total_votes_received}</div>
                <div className="text-xs md:text-sm text-dungeon-300 font-medium">Votos recibidos</div>
              </div>

              <div className="p-3 md:p-4 rounded-lg bg-dungeon-800/50 border border-dungeon-700 hover:border-orange-500/50 transition-all">
                <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1 font-heading">{profile.avg_votes_per_report}</div>
                <div className="text-xs md:text-sm text-dungeon-300 font-medium">Votos por reporte</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile: Todo visible en scroll vertical */}
        <div className="md:hidden space-y-4">
          {/* Achievements desbloqueados */}
          {unlockedAchievements.length > 0 && (
            <Card className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border-gold-500/30 shadow-lg">
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2 text-base font-heading">
                  <Award className="w-4 h-4 text-gold-400" />
                  <span className="text-gold-400">
                    Achievements ({unlockedAchievements.length}/{achievements.length})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-2 gap-3">
                  {unlockedAchievements.slice(0, 4).map((achievement, index) => (
                    <div
                      key={achievement.achievement_id}
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                      }}
                    >
                      <AchievementBadge
                        achievement={{
                          id: achievement.achievement_id,
                          name: achievement.name,
                          description: achievement.description,
                          icon: achievement.icon,
                          category: achievement.category,
                          unlocked_at: achievement.unlocked_at,
                          xp_reward: achievement.xp_reward
                        }}
                        locked={false}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actividad reciente - Mobile */}
          {profile.show_activity && activities.length > 0 && (
            <Card className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border-blue-500/30 shadow-lg">
              <CardHeader className="relative z-10">
                <CardTitle className="text-gold-400 text-base font-heading">Actividad reciente</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <ActivityTimeline activities={activities} limit={3} />
              </CardContent>
            </Card>
          )}

          {/* Reportes recientes - Mobile */}
          {reports.length > 0 && (
            <Card className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border-purple-500/30 shadow-lg">
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2 text-gold-400 text-base font-heading">
                  <MessageSquare className="w-4 h-4" />
                  Reportes recientes
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-2">
                  {reports.slice(0, 3).map((report, index) => (
                    <Link
                      key={report.id}
                      href={`/reportes-beta`}
                      className="block"
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                      }}
                    >
                      <div className="p-3 bg-gradient-to-br from-dungeon-900/80 to-dungeon-950/80 border border-dungeon-700/50 rounded-lg hover:border-dungeon-600 transition-all">
                        <h3 className="text-sm text-dungeon-100 font-semibold mb-1 truncate">
                          {report.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-dungeon-400">
                          <span className="px-2 py-0.5 rounded bg-dungeon-800/50 border border-dungeon-700/50">
                            {CATEGORY_LABELS[report.category]}
                          </span>
                          <span className={`px-2 py-0.5 rounded border ${report.status === 'resolved' ? 'text-green-400 bg-green-500/10 border-green-500/30' :
                              report.status === 'in_progress' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30' :
                                'text-dungeon-400 bg-dungeon-800/50 border-dungeon-700/50'
                            }`}>
                            {STATUS_LABELS[report.status]}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats - Mobile */}
          <Card className="bg-gradient-to-br from-gold-900/30 to-dungeon-900 border-gold-500/40 shadow-lg">
            <CardHeader className="relative z-10">
              <CardTitle className="text-gold-400 text-base font-heading">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 rounded-lg bg-gradient-to-br from-gold-900/20 to-dungeon-800/50 border border-gold-500/20">
                  <span className="text-xs text-dungeon-300 font-medium">Achievements</span>
                  <span className="text-lg font-bold text-gold-400">
                    {unlockedAchievements.length}/{achievements.length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-gradient-to-br from-green-900/20 to-dungeon-800/50 border border-green-500/20">
                  <span className="text-xs text-dungeon-300 font-medium">Tasa de resolución</span>
                  <span className="text-lg font-bold text-green-400">
                    {profile.resolution_rate}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-gradient-to-br from-blue-900/20 to-dungeon-800/50 border border-blue-500/20">
                  <span className="text-xs text-dungeon-300 font-medium">Votos totales</span>
                  <span className="text-lg font-bold text-blue-400">
                    {profile.total_votes_received}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desktop: Tabs System */}
        <div className="hidden md:block">
          <ProfileTabs>
            {{
              resumen: (
                <div className="space-y-6">
                  {/* Achievements desbloqueados */}
                  {unlockedAchievements.length > 0 && (
                    <Card className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border-gold-500/30 shadow-lg">
                      <CardHeader className="relative z-10">
                        <CardTitle className="flex items-center justify-between font-heading">
                          <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-gold-400" />
                            <span className="text-gold-400">
                              Achievements ({unlockedAchievements.length}/{achievements.length})
                            </span>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {unlockedAchievements.slice(0, 8).map((achievement, index) => (
                            <div
                              key={achievement.achievement_id}
                              style={{
                                animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                              }}
                            >
                              <AchievementBadge
                                achievement={{
                                  id: achievement.achievement_id,
                                  name: achievement.name,
                                  description: achievement.description,
                                  icon: achievement.icon,
                                  category: achievement.category,
                                  unlocked_at: achievement.unlocked_at,
                                  xp_reward: achievement.xp_reward
                                }}
                                locked={false}
                                size="sm"
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Actividad reciente */}
                  {profile.show_activity && activities.length > 0 && (
                    <Card className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border-blue-500/30 shadow-lg">
                      <CardHeader className="relative z-10">
                        <CardTitle className="text-gold-400 font-heading">Actividad reciente</CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <ActivityTimeline activities={activities} limit={5} />
                      </CardContent>
                    </Card>
                  )}

                  {/* Reportes recientes */}
                  <Card className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border-purple-500/30 shadow-lg">
                    <CardHeader className="relative z-10">
                      <CardTitle className="flex items-center gap-2 text-gold-400 font-heading">
                        <MessageSquare className="w-5 h-5" />
                        Reportes recientes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      {reports.length === 0 ? (
                        <div className="text-center py-8 text-dungeon-400">
                          Este usuario aún no ha enviado reportes públicos
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {reports.slice(0, 5).map((report, index) => (
                            <Link
                              key={report.id}
                              href={`/reportes-beta`}
                              className="block"
                              style={{
                                animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                              }}
                            >
                              <div className="p-4 bg-gradient-to-br from-dungeon-900/80 to-dungeon-950/80 border border-dungeon-700/50 rounded-lg hover:border-dungeon-600 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-dungeon-100 font-semibold mb-1 truncate group-hover:text-gold-300 transition-colors">
                                      {report.title}
                                    </h3>
                                    <div className="flex items-center gap-3 text-xs text-dungeon-400">
                                      <span className="capitalize px-2 py-0.5 rounded bg-dungeon-800/50 border border-dungeon-700/50">
                                        {CATEGORY_LABELS[report.category]}
                                      </span>
                                      <span className={`px-2 py-0.5 rounded border ${report.status === 'resolved' ? 'text-green-400 bg-green-500/10 border-green-500/30' :
                                          report.status === 'in_progress' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30' :
                                            'text-dungeon-400 bg-dungeon-800/50 border-dungeon-700/50'
                                        }`}>
                                        {STATUS_LABELS[report.status]}
                                      </span>
                                      <span className="text-dungeon-500">{new Date(report.created_at).toLocaleDateString('es-ES')}</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                    <TrendingUp className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm font-semibold text-blue-400">{report.vote_count}</span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ),

              actividad: (
                <Card className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border-blue-500/30 shadow-lg">
                  <CardContent className="p-6 relative z-10">
                    {profile.show_activity ? (
                      activities.length > 0 ? (
                        <ActivityTimeline activities={activities} />
                      ) : (
                        <div className="text-center py-12 text-dungeon-400">
                          No hay actividad registrada aún
                        </div>
                      )
                    ) : (
                      <div className="text-center py-12 text-dungeon-400">
                        <EyeOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>El usuario ha ocultado su actividad</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ),

              personajes: (
                <Card className="bg-dungeon-800 border-dungeon-700">
                  <CardContent className="p-6 relative z-10">
                    {profile.show_characters ? (
                      <div className="text-center py-12 text-dungeon-400">
                        Sistema de personajes próximamente
                      </div>
                    ) : (
                      <div className="text-center py-12 text-dungeon-400">
                        <EyeOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>El usuario ha ocultado sus personajes</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ),

              reportes: (
                <Card className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border-purple-500/30 shadow-lg">
                  <CardContent className="p-6 relative z-10">
                    {reports.length === 0 ? (
                      <div className="text-center py-12 text-dungeon-400">
                        Este usuario aún no ha enviado reportes públicos
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {reports.map((report, index) => (
                          <Link
                            key={report.id}
                            href={`/reportes-beta`}
                            className="block"
                            style={{
                              animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`
                            }}
                          >
                            <div className="p-4 bg-gradient-to-br from-dungeon-900/80 to-dungeon-950/80 border border-dungeon-700/50 rounded-lg hover:border-dungeon-600 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-dungeon-100 font-semibold mb-1 truncate group-hover:text-gold-300 transition-colors">
                                    {report.title}
                                  </h3>
                                  <div className="flex items-center gap-3 text-xs text-dungeon-400">
                                    <span className="capitalize px-2 py-0.5 rounded bg-dungeon-800/50 border border-dungeon-700/50">
                                      {CATEGORY_LABELS[report.category]}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded border ${report.status === 'resolved' ? 'text-green-400 bg-green-500/10 border-green-500/30' :
                                        report.status === 'in_progress' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30' :
                                          'text-dungeon-400 bg-dungeon-800/50 border-dungeon-700/50'
                                      }`}>
                                      {STATUS_LABELS[report.status]}
                                    </span>
                                    <span className="text-dungeon-500">{new Date(report.created_at).toLocaleDateString('es-ES')}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                  <TrendingUp className="w-4 h-4 text-blue-400" />
                                  <span className="text-sm font-semibold text-blue-400">{report.vote_count}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ),

              stats: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-gold-900/30 to-dungeon-900 border-gold-500/40 shadow-lg">
                    <CardHeader className="relative z-10">
                      <CardTitle className="text-gold-400 font-heading">
                        Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="grid grid-cols-2 gap-4">
                        {achievements.map((achievement) => (
                          <AchievementBadge
                            key={achievement.achievement_id}
                            achievement={{
                              id: achievement.achievement_id,
                              name: achievement.name,
                              description: achievement.description,
                              icon: achievement.icon,
                              category: achievement.category,
                              unlocked_at: achievement.unlocked_at,
                              xp_reward: achievement.xp_reward
                            }}
                            locked={!achievement.is_unlocked}
                            size="sm"
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            }}
          </ProfileTabs>
        </div>
      </div>
    </div>
  );
}
