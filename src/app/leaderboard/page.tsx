'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Award, Trophy, Medal, Star, TrendingUp, CheckCircle2 } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  email: string;
  display_name: string | null;
  tier_code: string;
  karma_points: number;
  reports_submitted: number;
  reports_resolved: number;
  total_votes_received: number;
  success_rate: number;
  avg_votes_per_report: number;
}

const TIER_BADGES = {
  admin: { label: 'Admin', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
  reviewer: { label: 'Revisor', color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
  translator: { label: 'Traductor', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
  contributor: { label: 'Colaborador', color: 'text-green-400 border-green-500/30 bg-green-500/10' },
  beta_tester: { label: 'Beta Tester', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
  user: { label: 'Usuario', color: 'text-dungeon-400 border-dungeon-700 bg-dungeon-800' },
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userStats, setUserStats] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    loadLeaderboard();
    loadUserStats();
  }, []);

  async function loadLeaderboard() {
    try {
      const { data, error } = await supabase
        .from('v_karma_leaderboard')
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
        const { data, error } = await supabase.rpc('get_user_stats', {
          p_user_id: user.id,
        });

        if (!error && data && data.length > 0) {
          setUserStats(data[0]);
        }
      }
    } catch (err) {
      console.error('Error loading user stats:', err);
    }
  }

  function getRankIcon(index: number) {
    if (index === 0) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-300" />;
    if (index === 2) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-dungeon-400 font-bold">#{index + 1}</span>;
  }

  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Trophy className="w-12 h-12 text-gold-500" />
            <h1 className="text-4xl font-bold text-gold-500">Leaderboard de karma</h1>
          </div>
          <p className="text-dungeon-300">
            Top beta testers reconocidos por sus contribuciones a la comunidad
          </p>
        </div>

        {/* User Stats Card (si está autenticado) */}
        {currentUser && userStats && (
          <Card className="mb-6 bg-gradient-to-r from-gold-900/20 to-dungeon-800 border-gold-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold-400">
                <Star className="w-5 h-5" />
                Tus estadísticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400">{userStats.karma_points}</div>
                  <div className="text-sm text-dungeon-400">Karma</div>
                  <div className="text-xs text-dungeon-500">Ranking #{userStats.karma_rank}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{userStats.reports_submitted}</div>
                  <div className="text-sm text-dungeon-400">Reportes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{userStats.reports_resolved}</div>
                  <div className="text-sm text-dungeon-400">Resueltos</div>
                  <div className="text-xs text-dungeon-500">{userStats.success_rate}% éxito</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{userStats.total_votes_received}</div>
                  <div className="text-sm text-dungeon-400">Votos totales</div>
                  <div className="text-xs text-dungeon-500">{userStats.avg_votes_per_report} por reporte</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Como ganar karma */}
        <Card className="mb-6 bg-dungeon-800 border-dungeon-700">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-dungeon-200 font-semibold mb-2">¿Cómo ganar karma?</p>
                <ul className="space-y-1 text-sm text-dungeon-300">
                  <li>• <span className="text-gold-400">+1 punto</span> cada vez que alguien vota tu reporte</li>
                  <li>• <span className="text-green-400">+5 puntos</span> cuando tu reporte es marcado como resuelto</li>
                  <li>• Reporta bugs importantes y útiles para ganar más votos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="bg-dungeon-800 border-dungeon-700">
          <CardHeader>
            <CardTitle className="text-gold-400">Top 100 contribuidores</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-dungeon-400">Cargando leaderboard...</div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-8 text-dungeon-400">
                Aún no hay contribuidores en el leaderboard
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => {
                  const tierInfo = TIER_BADGES[entry.tier_code as keyof typeof TIER_BADGES] || TIER_BADGES.user;
                  const isCurrentUser = currentUser?.email === entry.email;

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
                      <div className="w-12 flex items-center justify-center">
                        {getRankIcon(index)}
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-dungeon-100 font-semibold truncate">
                            {entry.display_name || entry.email.split('@')[0]}
                          </span>
                          {isCurrentUser && (
                            <span className="text-xs text-gold-400 font-semibold">(Tú)</span>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded border ${tierInfo.color}`}>
                            {tierInfo.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-dungeon-400">
                          <span>{entry.reports_submitted} reportes</span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-400" />
                            {entry.success_rate}% resueltos
                          </span>
                          <span>{entry.avg_votes_per_report} votos/reporte</span>
                        </div>
                      </div>

                      {/* Karma Points */}
                      <div className="flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-lg">
                        <Award className="w-5 h-5 text-gold-400" />
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gold-400">{entry.karma_points}</div>
                          <div className="text-xs text-dungeon-400">karma</div>
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
