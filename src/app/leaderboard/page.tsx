'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Award, Trophy, Medal, Star, TrendingUp, CheckCircle2, Zap } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  display_name: string | null;
  username_slug: string;
  experience_points: number;
  level: number;
  level_title: string;
  level_tier: string;
  exp_to_next_level: number;
  next_level_xp: number;
  reports_submitted: number;
  reports_resolved: number;
  total_votes_received: number;
  resolution_rate: number;
  rank: number;
}

interface UserStats {
  experience_points: number;
  level: number;
  level_title: string;
  level_tier: string;
  exp_to_next_level: number;
  next_level_xp: number;
  progress_percentage: number;
  reports_submitted: number;
  reports_resolved: number;
  total_votes_received: number;
  resolution_rate: number;
  global_rank: number;
}

// Colores por tier de nivel
const LEVEL_TIER_COLORS = {
  'Novato': {
    text: 'text-gray-400',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/30',
    gradient: 'from-gray-500/20'
  },
  'Héroe': {
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    gradient: 'from-blue-500/20'
  },
  'Épico': {
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    gradient: 'from-purple-500/20'
  },
  'Legendario': {
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    gradient: 'from-amber-500/20'
  },
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);

  const supabase = createClient();

  useEffect(() => {
    loadLeaderboard();
    loadUserStats();
  }, []);

  async function loadLeaderboard() {
    try {
      const { data, error } = await supabase
        .from('v_level_leaderboard')
        .select('*')
        .limit(100);

      if (error) throw error;

      setLeaderboard(data || []);
    } catch (err) {
      console.error('Error loading leaderboard:', err);
    } finally {
      setLoading(false);
    }
  }

  async function loadUserStats() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);

      if (user) {
        const { data, error } = await supabase
          .from('v_user_profile_with_level')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setUserStats(data);
        }
      }
    } catch (err) {
      console.error('Error loading user stats:', err);
    }
  }

  function getRankIcon(rank: number) {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-dungeon-400 font-bold">#{rank}</span>;
  }

  function getTierColors(tier: string) {
    return LEVEL_TIER_COLORS[tier as keyof typeof LEVEL_TIER_COLORS] || LEVEL_TIER_COLORS['Novato'];
  }

  function calculateProgressPercentage(currentExp: number, currentLevelXp: number, nextLevelXp: number): number {
    if (nextLevelXp === 0) return 100; // Nivel máximo
    const expInCurrentLevel = currentExp - currentLevelXp;
    const expNeededForLevel = nextLevelXp - currentLevelXp;
    return Math.round((expInCurrentLevel / expNeededForLevel) * 100);
  }

  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Trophy className="w-12 h-12 text-gold-500" />
            <h1 className="text-4xl font-bold text-gold-500">Leaderboard de Niveles</h1>
          </div>
          <p className="text-dungeon-300">
            Top aventureros reconocidos por sus contribuciones a la comunidad
          </p>
        </div>

        {/* User Stats Card (si está autenticado) */}
        {currentUser && userStats && (
          <Card className={`mb-6 bg-gradient-to-r ${getTierColors(userStats.level_tier).gradient} to-dungeon-800 border-gold-500/30`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold-400">
                <Star className="w-5 h-5" />
                Tus estadísticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Nivel y Título */}
              <div className="mb-4 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className={`text-5xl font-bold ${getTierColors(userStats.level_tier).text}`}>
                    Nivel {userStats.level}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full border ${getTierColors(userStats.level_tier).border} ${getTierColors(userStats.level_tier).bg} ${getTierColors(userStats.level_tier).text}`}>
                    {userStats.level_tier}
                  </span>
                </div>
                <div className="text-xl text-dungeon-200 mb-3">{userStats.level_title}</div>

                {/* Barra de Progreso */}
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-sm text-dungeon-400 mb-1">
                    <span>{userStats.experience_points.toLocaleString()} EXP</span>
                    <span>{userStats.level < 20 ? `${userStats.next_level_xp.toLocaleString()} EXP` : 'Máximo'}</span>
                  </div>
                  <div className="w-full bg-dungeon-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 bg-gradient-to-r ${getTierColors(userStats.level_tier).gradient} to-gold-500`}
                      style={{ width: `${userStats.progress_percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-center text-dungeon-500 mt-1">
                    {userStats.level < 20 ? `${userStats.exp_to_next_level.toLocaleString()} EXP para nivel ${userStats.level + 1}` : 'Nivel Máximo Alcanzado'}
                  </div>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-dungeon-700">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400">#{userStats.global_rank}</div>
                  <div className="text-sm text-dungeon-400">Ranking Global</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{userStats.reports_submitted}</div>
                  <div className="text-sm text-dungeon-400">Reportes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{userStats.reports_resolved}</div>
                  <div className="text-sm text-dungeon-400">Resueltos</div>
                  <div className="text-xs text-dungeon-500">{userStats.resolution_rate}% éxito</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{userStats.total_votes_received}</div>
                  <div className="text-sm text-dungeon-400">Votos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cómo ganar experiencia */}
        <Card className="mb-6 bg-dungeon-800 border-dungeon-700">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-dungeon-200 font-semibold mb-2">¿Cómo ganar experiencia?</p>
                <ul className="space-y-1 text-sm text-dungeon-300">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span><span className="text-blue-400 font-semibold">+50 EXP</span> por reportar un bug</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span><span className="text-green-400 font-semibold">+200 EXP</span> cuando tu reporte es marcado como resuelto</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span><span className="text-purple-400 font-semibold">+10 EXP</span> cada vez que alguien vota positivamente tu reporte</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-dungeon-400 italic">Próximamente: traducir contenido, ayudar en foros, y más...</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="bg-dungeon-800 border-dungeon-700">
          <CardHeader>
            <CardTitle className="text-gold-400">Top 100 aventureros</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-dungeon-400">Cargando leaderboard...</div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-8 text-dungeon-400">
                Aún no hay aventureros en el leaderboard
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry) => {
                  const tierColors = getTierColors(entry.level_tier);
                  const isCurrentUser = currentUser?.id === entry.id;
                  const progressPercentage = entry.level < 20
                    ? calculateProgressPercentage(
                        entry.experience_points,
                        entry.next_level_xp - entry.exp_to_next_level,
                        entry.next_level_xp
                      )
                    : 100;

                  return (
                    <div
                      key={entry.id}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                        isCurrentUser
                          ? 'bg-gold-500/10 border-2 border-gold-500/30'
                          : 'bg-dungeon-900/50 border border-dungeon-700 hover:border-dungeon-600'
                      }`}
                    >
                      {/* Rank */}
                      <div className="w-12 flex items-center justify-center flex-shrink-0">
                        {getRankIcon(entry.rank)}
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Link
                            href={`/u/${entry.username_slug}`}
                            className="text-dungeon-100 font-semibold truncate hover:text-gold-400 transition-colors"
                          >
                            {entry.display_name || 'Usuario'}
                          </Link>
                          {isCurrentUser && (
                            <span className="text-xs text-gold-400 font-semibold">(Tú)</span>
                          )}
                        </div>

                        {/* Nivel y Título */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-sm font-bold ${tierColors.text}`}>
                            Nivel {entry.level}
                          </span>
                          <span className="text-sm text-dungeon-300">
                            {entry.level_title}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded border ${tierColors.border} ${tierColors.bg} ${tierColors.text}`}>
                            {entry.level_tier}
                          </span>
                        </div>

                        {/* Barra de Progreso */}
                        <div className="mb-2">
                          <div className="w-full bg-dungeon-700 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full bg-gradient-to-r ${tierColors.gradient} to-gold-500`}
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>

                        {/* Estadísticas */}
                        <div className="flex items-center gap-4 text-xs text-dungeon-400">
                          <span>{entry.reports_submitted} reportes</span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-400" />
                            {entry.resolution_rate}% resueltos
                          </span>
                          <span>{entry.total_votes_received} votos</span>
                        </div>
                      </div>

                      {/* Experience Points */}
                      <div className={`flex items-center gap-2 px-4 py-2 ${tierColors.bg} border ${tierColors.border} rounded-lg flex-shrink-0`}>
                        <Award className={`w-5 h-5 ${tierColors.text}`} />
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${tierColors.text}`}>
                            {entry.experience_points.toLocaleString()}
                          </div>
                          <div className="text-xs text-dungeon-400">EXP</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
