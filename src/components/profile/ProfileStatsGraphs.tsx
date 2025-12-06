'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, Award, Calendar, Users } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ProfileStatsGraphsProps {
  userId: string;
  displayName: string;
}

interface XPByMonth {
  month: string;
  xp: number;
}

interface AchievementsByCategory {
  category: string;
  count: number;
  [key: string]: string | number;
}

// Colores para el pie chart
const COLORS = ['#F59E0B', '#3B82F6', '#8B5CF6', '#10B981', '#EF4444', '#EC4899'];

// Colores de las categorías de achievements
const CATEGORY_COLORS: Record<string, string> = {
  'reportes': '#3B82F6',
  'votos': '#10B981',
  'niveles': '#F59E0B',
  'personajes': '#8B5CF6',
  'traducciones': '#EC4899',
  'especiales': '#EF4444'
};

export function ProfileStatsGraphs({ userId, displayName }: ProfileStatsGraphsProps) {
  const [xpData, setXpData] = useState<XPByMonth[]>([]);
  const [achievementsData, setAchievementsData] = useState<AchievementsByCategory[]>([]);
  const [communityAvg, setCommunityAvg] = useState<number>(0);
  const [userTotal, setUserTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatsData();
  }, [userId]);

  async function loadStatsData() {
    const supabase = createClient();

    try {
      setLoading(true);

      // 1. Cargar XP por mes (últimos 6 meses)
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const { data: activityData } = await supabase
        .from('activity_log')
        .select('created_at, xp_earned')
        .eq('user_id', userId)
        .gte('created_at', sixMonthsAgo.toISOString())
        .order('created_at', { ascending: true });

      if (activityData) {
        // Agrupar por mes
        const xpByMonth: Record<string, number> = {};
        activityData.forEach(activity => {
          const date = new Date(activity.created_at);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          xpByMonth[monthKey] = (xpByMonth[monthKey] || 0) + (activity.xp_earned || 0);
        });

        // Convertir a array para recharts
        const xpArray = Object.entries(xpByMonth).map(([month, xp]) => ({
          month: formatMonthName(month),
          xp
        }));

        setXpData(xpArray);
        setUserTotal(xpArray.reduce((sum, item) => sum + item.xp, 0));
      }

      // 2. Cargar achievements por categoría
      const { data: achievementsData } = await supabase.rpc('get_user_achievements', {
        p_user_id: userId
      });

      if (achievementsData) {
        const unlockedAchievements = achievementsData.filter((a: any) => a.is_unlocked);
        const categoryCount: Record<string, number> = {};

        unlockedAchievements.forEach((achievement: any) => {
          const category = achievement.category || 'otros';
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        });

        const achievementsArray = Object.entries(categoryCount).map(([category, count]) => ({
          category: formatCategoryName(category),
          count
        }));

        setAchievementsData(achievementsArray);
      }

      // 3. Calcular promedio de la comunidad (últimos 6 meses)
      const { data: communityData } = await supabase
        .from('activity_log')
        .select('user_id, xp_earned')
        .gte('created_at', sixMonthsAgo.toISOString());

      if (communityData && communityData.length > 0) {
        // Agrupar por usuario y sumar XP
        const userXP: Record<string, number> = {};
        communityData.forEach(activity => {
          userXP[activity.user_id] = (userXP[activity.user_id] || 0) + (activity.xp_earned || 0);
        });

        // Calcular promedio
        const totalUsers = Object.keys(userXP).length;
        const totalXP = Object.values(userXP).reduce((sum, xp) => sum + xp, 0);
        setCommunityAvg(totalUsers > 0 ? Math.round(totalXP / totalUsers) : 0);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatMonthName(monthKey: string): string {
    const [year, month] = monthKey.split('-');
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${months[parseInt(month) - 1]} ${year}`;
  }

  function formatCategoryName(category: string): string {
    const names: Record<string, string> = {
      'reportes': 'Reportes',
      'votos': 'Votos',
      'niveles': 'Niveles',
      'personajes': 'Personajes',
      'traducciones': 'Traducciones',
      'especiales': 'Especiales'
    };
    return names[category] || category.charAt(0).toUpperCase() + category.slice(1);
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4" />
        <p className="text-dungeon-400">Cargando estadísticas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* XP Over Time Chart */}
      {xpData.length > 0 && (
        <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-gold-500" />
            <h3 className="text-xl font-bold text-dungeon-100 font-heading">
              Experiencia Ganada (Últimos 6 Meses)
            </h3>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={xpData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="month"
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                  formatter={(value: number) => [`${value} XP`, 'Experiencia']}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="line"
                />
                <Line
                  type="monotone"
                  dataKey="xp"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="XP Ganada"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-sm text-dungeon-400 mt-4 text-center">
            Total en 6 meses: <span className="text-gold-400 font-bold">{userTotal.toLocaleString()} XP</span>
          </p>
        </div>
      )}

      {/* Achievements by Category + Community Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Achievements */}
        {achievementsData.length > 0 && (
          <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-purple-500" />
              <h3 className="text-xl font-bold text-dungeon-100 font-heading">
                Achievements por Categoría
              </h3>
            </div>

            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={achievementsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                    nameKey="category"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {achievementsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }}
                    formatter={(value: number, name: string) => [`${value} achievements`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-2">
              {achievementsData.map((entry, index) => (
                <div key={entry.category} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-dungeon-300">{entry.category}</span>
                  </div>
                  <span className="text-dungeon-100 font-semibold">{entry.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bar Chart - User vs Community */}
        <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-bold text-dungeon-100 font-heading">
              Comparación con la Comunidad
            </h3>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    name: displayName || 'Tú',
                    xp: userTotal,
                    fill: '#F59E0B'
                  },
                  {
                    name: 'Promedio',
                    xp: communityAvg,
                    fill: '#3B82F6'
                  }
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="name"
                  stroke="#9CA3AF"
                  style={{ fontSize: '14px' }}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                  formatter={(value: number) => [`${value.toLocaleString()} XP`, 'Experiencia']}
                />
                <Bar dataKey="xp" radius={[8, 8, 0, 0]}>
                  {[
                    { fill: '#F59E0B' },
                    { fill: '#3B82F6' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 text-center">
            {userTotal > communityAvg ? (
              <p className="text-green-400 font-semibold">
                🎉 ¡Estás {Math.round(((userTotal - communityAvg) / communityAvg) * 100)}% por encima del promedio!
              </p>
            ) : userTotal < communityAvg ? (
              <p className="text-blue-400">
                Estás {Math.round(((communityAvg - userTotal) / communityAvg) * 100)}% por debajo del promedio
              </p>
            ) : (
              <p className="text-dungeon-300">Estás en el promedio de la comunidad</p>
            )}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {xpData.length === 0 && achievementsData.length === 0 && (
        <div className="text-center py-16 border border-dashed border-dungeon-700 rounded-xl bg-dungeon-950/50">
          <Calendar className="w-16 h-16 text-dungeon-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-dungeon-300 mb-2 font-heading">
            Sin datos de estadísticas
          </h3>
          <p className="text-dungeon-500">
            Las estadísticas aparecerán cuando el usuario tenga actividad en los últimos 6 meses
          </p>
        </div>
      )}
    </div>
  );
}
