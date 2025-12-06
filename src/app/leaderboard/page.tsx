'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { pageContainerPadding } from '@/lib/utils/responsive-spacing';
import { Award, Trophy, Medal, Star, TrendingUp, CheckCircle2, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  display_name: string | null;
  username_slug: string;
  experience_points: number;
  level: number;
  title: string;
  tier: string;
  exp_to_next_level: number;
  current_level_xp?: number; // XP total del nivel actual (opcional hasta ejecutar SQL)
  next_level_xp?: number; // XP total del nivel siguiente (opcional hasta ejecutar SQL)
  reports_submitted: number;
  reports_resolved: number;
  total_votes_received: number;
  resolution_rate: number;
  rank: number;
}

interface UserStats {
  experience_points: number;
  level: number;
  title: string;
  tier: string;
  exp_to_next_level: number;
  current_level_xp: number; // XP total del nivel actual
  next_level_xp: number; // XP total del nivel siguiente
  progress_percentage: number; // Calculado por la vista (0-100)
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
  const [levelMeta, setLevelMeta] = useState<Record<number, { title: string; tier: string }>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default true (mobile-first)

  const itemsPerPage = isMobile ? 10 : 20;

  const supabase = createClient();

  // Detectar tamaño de pantalla
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsMobile(!mediaQuery.matches);

    const handleChange = () => {
      setIsMobile(!mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getDisplayTitle = (title?: string | null, tier?: string | null, level?: number) => {
    if (typeof level === 'number' && levelMeta[level]?.title) return levelMeta[level].title;
    if (title && title.trim().length > 0) return title;
    if (typeof level === 'number' && levelMeta[level]?.tier) return levelMeta[level].tier;
    if (tier && tier.trim().length > 0) return tier;
    if (typeof level === 'number') return `Nivel ${level}`;
    return 'Aventurero';
  };

  useEffect(() => {
    loadLevelMeta();
    loadUserStats();
  }, []);

  useEffect(() => {
    setCurrentPage(0); // Reset a página 0 cuando cambia itemsPerPage
  }, [itemsPerPage]);

  useEffect(() => {
    setLoading(true);
    loadLeaderboard();
  }, [currentPage, itemsPerPage]);

  async function loadLevelMeta() {
    try {
      const { data, error } = await supabase
        .from('user_levels')
        .select('level, title, tier')
        .order('level', { ascending: true });

      if (error) throw error;

      const map = (data || []).reduce((acc: Record<number, { title: string; tier: string }>, lvl) => {
        if (typeof lvl.level === 'number') {
          acc[lvl.level] = { title: lvl.title, tier: lvl.tier };
        }
        return acc;
      }, {});

      setLevelMeta(map);
    } catch (err) {
      console.error('Error loading level metadata:', err);
    }
  }

  async function loadLeaderboard() {
    try {
      const offset = currentPage * itemsPerPage;
      // Solicitamos itemsPerPage + 1 para detectar si hay más páginas
      const { data, error } = await supabase
        .from('v_level_leaderboard')
        .select('*')
        .neq('username_slug', 'lesistern')
        .range(offset, offset + itemsPerPage);

      if (error) throw error;

      const items = data || [];
      // Si recibimos más elementos que itemsPerPage, significa que hay más páginas
      if (items.length > itemsPerPage) {
        setLeaderboard(items.slice(0, itemsPerPage));
        setHasMorePages(true);
      } else {
        setLeaderboard(items);
        setHasMorePages(false);
      }
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

  function calculateProgressPercentage(
    currentXp: number,
    currentLevelXp: number | undefined,
    nextLevelXp: number | undefined
  ): number {
    // Validación defensiva: si faltan datos (SQL no ejecutado), retornar 0%
    if (currentLevelXp === undefined || nextLevelXp === undefined) {
      return 0;
    }

    // Si está en nivel máximo
    if (nextLevelXp === 0 || currentLevelXp === nextLevelXp) return 100;

    // XP dentro del nivel actual = XP total - XP del inicio del nivel
    const xpWithinLevel = currentXp - currentLevelXp;

    // Rango del nivel = XP siguiente nivel - XP nivel actual
    const levelRange = nextLevelXp - currentLevelXp;

    // Evitar división por cero o valores negativos
    if (levelRange <= 0) return 100;
    if (xpWithinLevel < 0) return 0;

    // Progreso = (XP dentro del nivel / Rango del nivel) * 100
    const percentage = Math.round((xpWithinLevel / levelRange) * 100);

    // Asegurar que esté entre 0 y 100
    return Math.max(0, Math.min(100, percentage));
  }

  return (
    <div className={`min-h-screen bg-dungeon-950 ${pageContainerPadding}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Trophy className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-gold-500" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gold-500">Leaderboard de Niveles</h1>
          </div>
          <p className="text-dungeon-300">
            Top aventureros reconocidos por sus contribuciones a la comunidad
          </p>
        </div>

        {/* User Stats Card (si está autenticado) */}
        {currentUser && userStats && (
          <Card className={`mb-6 bg-gradient-to-r ${getTierColors(userStats.tier).gradient} to-dungeon-800 border-gold-500/30`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold-400 font-heading">
                <Star className="w-5 h-5" />
                Tus estadísticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Nivel y Título */}
              <div className="mb-4 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className={`text-5xl font-bold font-heading ${getTierColors(userStats.tier).text}`}>
                    Nivel {userStats.level}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full border ${getTierColors(userStats.tier).border} ${getTierColors(userStats.tier).bg} ${getTierColors(userStats.tier).text}`}>
                    {userStats.tier}
                  </span>
                </div>
                <div className="text-xl text-dungeon-200 mb-3 font-heading">
                  {getDisplayTitle(userStats.title, userStats.tier, userStats.level)}
                </div>

                {/* Barra de Progreso */}
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-sm text-dungeon-400 mb-1">
                    <span>{userStats.experience_points.toLocaleString()} EXP</span>
                    <span>{userStats.level < 20 ? `${userStats.next_level_xp.toLocaleString()} EXP` : 'Máximo'}</span>
                  </div>
                  <div className="w-full bg-dungeon-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 bg-gradient-to-r ${getTierColors(userStats.tier).gradient} to-gold-500`}
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
                  <div className="text-3xl font-bold text-gold-400 font-heading">#{userStats.global_rank}</div>
                  <div className="text-sm text-dungeon-400">Ranking Global</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 font-heading">{userStats.reports_submitted}</div>
                  <div className="text-sm text-dungeon-400">Reportes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 font-heading">{userStats.reports_resolved}</div>
                  <div className="text-sm text-dungeon-400">Resueltos</div>
                  <div className="text-xs text-dungeon-500">{userStats.resolution_rate}% éxito</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 font-heading">{userStats.total_votes_received}</div>
                  <div className="text-sm text-dungeon-400">Votos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cómo ganar experiencia */}
        <Card className="card mb-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-dungeon-200 font-semibold mb-2 font-heading">¿Cómo ganar experiencia?</p>
                <ul className="space-y-1 text-sm text-dungeon-300">
                  <li className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-green-400" />
                      <span className="font-semibold text-green-400">Cuando un mod marca tu reporte como resuelto:</span>
                    </div>
                    <div className="ml-6 space-y-0.5 text-xs">
                      <div><span className="text-gray-400">Baja:</span> <span className="text-green-300">+10 EXP</span></div>
                      <div><span className="text-blue-400">Media:</span> <span className="text-green-300">+50 EXP</span></div>
                      <div><span className="text-orange-400">Alta:</span> <span className="text-green-300">+100 EXP</span></div>
                      <div><span className="text-red-400">Crítica:</span> <span className="text-green-300 font-semibold">+500 EXP</span></div>
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span><span className="text-purple-400 font-semibold">+10 EXP</span> cada vez que alguien vota positivamente tu reporte</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-red-400" />
                    <span><span className="text-red-400 font-semibold">-100 EXP</span> si tu reporte es marcado como spam o falso</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-dungeon-400 italic">Próximamente: traducir contenido, ayudar en foros, y más...</span>
                  </li>
                </ul>
                <Link
                  href="/niveles"
                  className="inline-flex items-center gap-2 mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Trophy className="w-4 h-4" />
                  Ver todos los niveles y recompensas
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="text-gold-400 font-heading">Top 100 aventureros</CardTitle>
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
                  const tierColors = getTierColors(entry.tier);
                  const isCurrentUser = currentUser?.id === entry.id;
                  const progressPercentage = entry.level < 20
                    ? calculateProgressPercentage(
                      entry.experience_points,
                      entry.current_level_xp,
                      entry.next_level_xp
                    )
                    : 100;

                  return (
                    <div
                      key={entry.id}
                      className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-3 md:p-4 rounded-lg transition-colors ${isCurrentUser
                          ? 'bg-gold-500/10 border-2 border-gold-500/30'
                          : 'bg-dungeon-900/50 border border-dungeon-700 hover:border-dungeon-600'
                        }`}
                    >
                      {/* Rank */}
                      <div className="w-10 md:w-12 flex items-center justify-center flex-shrink-0">
                        {getRankIcon(entry.rank)}
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Link
                            href={`/u/${entry.username_slug}`}
                            className="text-sm md:text-base text-dungeon-100 font-semibold truncate hover:text-gold-400 transition-colors"
                          >
                            {entry.display_name || 'Usuario'}
                          </Link>
                          {isCurrentUser && (
                            <span className="text-xs text-gold-400 font-semibold">(Tú)</span>
                          )}
                        </div>

                        {/* Nivel y Título */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs md:text-sm font-bold ${tierColors.text}`}>
                            Nivel {entry.level}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded border ${tierColors.border} ${tierColors.bg} ${tierColors.text}`}>
                            {getDisplayTitle(entry.title, entry.tier, entry.level)}
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
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-dungeon-400">
                          <span>{entry.reports_submitted} reportes</span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-400" />
                            {entry.reports_resolved} resueltos
                          </span>
                          <span>{entry.total_votes_received} votos</span>
                        </div>
                      </div>

                      {/* Experience Points - Responsive Box */}
                      <div className={`w-full md:w-auto text-right md:text-left flex items-center justify-between md:flex-col md:items-end gap-2 px-3 md:px-4 py-2 md:py-2 ${tierColors.bg} border ${tierColors.border} rounded-lg flex-shrink-0`}>
                        <div className="flex items-center gap-2 md:flex-col md:items-end">
                          <Award className={`w-4 md:w-5 h-4 md:h-5 ${tierColors.text} flex-shrink-0`} />
                          <div>
                            <div className={`text-lg md:text-2xl font-bold ${tierColors.text}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
                              {entry.experience_points.toLocaleString()}
                            </div>
                            <div className="text-xs text-dungeon-400" style={{ fontVariantNumeric: 'tabular-nums' }}>
                              {entry.level < 20
                                ? `${entry.exp_to_next_level.toLocaleString()} para lvl ${entry.level + 1}`
                                : 'Máximo'
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {!loading && leaderboard.length > 0 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-dungeon-700">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  variant="secondary"
                  size="sm"
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Anterior</span>
                </Button>

                <div className="flex items-center gap-2 text-sm text-dungeon-300">
                  <span>Página</span>
                  <span className="font-semibold text-gold-400">{currentPage + 1}</span>
                  <span className="text-dungeon-500">
                    {isMobile ? `(${leaderboard.length} de ~${currentPage * itemsPerPage + leaderboard.length} total)` : `(${leaderboard.length} de muchos)`}
                  </span>
                </div>

                <Button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={!hasMorePages}
                  variant="secondary"
                  size="sm"
                  className="gap-2"
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
