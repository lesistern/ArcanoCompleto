'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Award,
  FileText,
  Loader2,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CategoryStat {
  category: string;
  count: number;
  percentage: number;
}

interface StatusStat {
  status: string;
  count: number;
  percentage: number;
}

interface TopContributor {
  id: string;
  display_name: string | null;
  email: string;
  username_slug: string;
  reports_submitted: number;
  reports_resolved: number;
  karma_points: number;
  success_rate: number;
}

interface RecentReport {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
  author_display_name: string | null;
  author_username: string;
  vote_count: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  bug: 'Error/Bug',
  feature: 'Nueva funcionalidad',
  translation: 'Error de traducción',
  data: 'Error en datos',
  ui: 'Problema de interfaz',
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

const CATEGORY_COLORS: Record<string, string> = {
  bug: 'text-red-400',
  feature: 'text-blue-400',
  translation: 'text-purple-400',
  data: 'text-yellow-400',
  ui: 'text-green-400',
  performance: 'text-orange-400',
  other: 'text-dungeon-400',
};

const STATUS_COLORS: Record<string, string> = {
  open: 'text-yellow-400',
  in_progress: 'text-blue-400',
  resolved: 'text-green-400',
  closed: 'text-dungeon-400',
  wont_fix: 'text-red-400',
};

export default function AdminReportesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
  const [statusStats, setStatusStats] = useState<StatusStat[]>([]);
  const [topContributors, setTopContributors] = useState<TopContributor[]>([]);
  const [recentReports, setRecentReports] = useState<RecentReport[]>([]);
  const [totalReports, setTotalReports] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);

  // Estados para el exportador
  const [exportLoading, setExportLoading] = useState(false);
  const [exportFilters, setExportFilters] = useState({
    category: 'all',
    status: 'all',
    priority: 'all',
  });

  const supabase = createClient();

  useEffect(() => {
    checkAuthorization();
  }, []);

  async function checkAuthorization() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push('/');
        return;
      }

      // Verificar si es admin o reviewer
      const { data: profile } = await supabase
        .from('profiles')
        .select('tier')
        .eq('id', user.id)
        .single();

      if (!profile || !['admin', 'reviewer'].includes(profile.tier)) {
        router.push('/');
        return;
      }

      setAuthorized(true);
      await loadStats();
    } catch (error) {
      console.error('Error checking authorization:', error);
      router.push('/');
    }
  }

  async function loadStats() {
    try {
      // Total de reportes
      const { count: total } = await supabase
        .from('feedback_tickets')
        .select('*', { count: 'exact', head: true });

      setTotalReports(total || 0);

      // Estadísticas por categoría
      const { data: categoryData } = await supabase
        .from('feedback_tickets')
        .select('category');

      if (categoryData) {
        const categoryCount: Record<string, number> = {};
        categoryData.forEach((ticket) => {
          categoryCount[ticket.category] = (categoryCount[ticket.category] || 0) + 1;
        });

        const categoryStatsData = Object.entries(categoryCount).map(([category, count]) => ({
          category,
          count,
          percentage: total ? Math.round((count / total) * 100) : 0,
        }));

        setCategoryStats(categoryStatsData);
      }

      // Estadísticas por estado
      const { data: statusData } = await supabase
        .from('feedback_tickets')
        .select('status');

      if (statusData) {
        const statusCount: Record<string, number> = {};
        statusData.forEach((ticket) => {
          statusCount[ticket.status] = (statusCount[ticket.status] || 0) + 1;
        });

        const statusStatsData = Object.entries(statusCount).map(([status, count]) => ({
          status,
          count,
          percentage: total ? Math.round((count / total) * 100) : 0,
        }));

        setStatusStats(statusStatsData);
      }

      // Top contributors (de la tabla de leaderboard)
      const { data: contributors } = await supabase
        .from('v_karma_leaderboard')
        .select('*')
        .limit(5);

      if (contributors) {
        setTopContributors(contributors);
      }

      // Total de votos
      const { count: votes } = await supabase
        .from('feedback_votes')
        .select('*', { count: 'exact', head: true });

      setTotalVotes(votes || 0);

      // Reportes recientes
      const { data: recent } = await supabase
        .from('v_feedback_tickets_with_author')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (recent) {
        setRecentReports(recent);
      }
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  }

  async function exportToMarkdown() {
    setExportLoading(true);
    try {
      // Construir query con filtros
      let query = supabase
        .from('v_feedback_tickets_with_author')
        .select('*')
        .order('created_at', { ascending: false });

      // Aplicar filtros
      if (exportFilters.category !== 'all') {
        query = query.eq('category', exportFilters.category);
      }
      if (exportFilters.status !== 'all') {
        query = query.eq('status', exportFilters.status);
      }
      if (exportFilters.priority !== 'all') {
        query = query.eq('priority', exportFilters.priority);
      }

      const { data: reports, error } = await query;

      if (error) throw error;

      // Generar contenido Markdown
      let markdown = `# Reporte de Feedback - Beta Testers\n\n`;
      markdown += `**Fecha de exportación:** ${new Date().toLocaleString('es-ES')}\n\n`;
      markdown += `**Filtros aplicados:**\n`;
      markdown += `- Categoría: ${exportFilters.category === 'all' ? 'Todas' : CATEGORY_LABELS[exportFilters.category]}\n`;
      markdown += `- Estado: ${exportFilters.status === 'all' ? 'Todos' : STATUS_LABELS[exportFilters.status]}\n`;
      markdown += `- Prioridad: ${exportFilters.priority === 'all' ? 'Todas' : exportFilters.priority.toUpperCase()}\n\n`;
      markdown += `**Total de reportes:** ${reports?.length || 0}\n\n`;
      markdown += `---\n\n`;

      // Agregar cada reporte
      reports?.forEach((report, index) => {
        markdown += `## ${index + 1}. ${report.title}\n\n`;
        markdown += `**ID:** ${report.id}\n`;
        markdown += `**Categoría:** ${CATEGORY_LABELS[report.category]}\n`;
        markdown += `**Estado:** ${STATUS_LABELS[report.status]}\n`;
        markdown += `**Prioridad:** ${report.priority?.toUpperCase() || 'N/A'}\n`;
        markdown += `**Autor:** ${report.author_display_name || 'Usuario'} (@${report.author_username})\n`;
        markdown += `**Fecha:** ${new Date(report.created_at).toLocaleString('es-ES')}\n`;
        markdown += `**Votos:** ${report.vote_count || 0}\n\n`;
        markdown += `### Descripción\n\n`;
        markdown += `${report.description || 'Sin descripción'}\n\n`;

        if (report.page_url) {
          markdown += `**URL de la página:** ${report.page_url}\n\n`;
        }

        if (report.browser_info) {
          markdown += `**Información del navegador:** ${report.browser_info}\n\n`;
        }

        markdown += `---\n\n`;
      });

      // Crear archivo y descargar
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Generar nombre de archivo con fecha y filtros
      const fecha = new Date().toISOString().split('T')[0];
      const categoryPart = exportFilters.category !== 'all' ? `-${exportFilters.category}` : '';
      const statusPart = exportFilters.status !== 'all' ? `-${exportFilters.status}` : '';
      link.download = `reportes-beta-${fecha}${categoryPart}${statusPart}.md`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Error exportando reportes:', err);
      alert('Error al exportar reportes. Por favor, intenta de nuevo.');
    } finally {
      setExportLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dungeon-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-gold-500" />
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-500 mb-2 flex items-center gap-3">
            <BarChart3 className="w-10 h-10" />
            Estadísticas de Reportes Beta
          </h1>
          <p className="text-dungeon-300">
            Análisis completo del sistema de feedback (Solo Admin/Reviewers)
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-900/20 to-dungeon-800 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300 mb-1">Total Reportes</p>
                  <p className="text-3xl font-bold text-blue-400">{totalReports}</p>
                </div>
                <FileText className="w-12 h-12 text-blue-400 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-dungeon-800 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-300 mb-1">Total Votos</p>
                  <p className="text-3xl font-bold text-green-400">{totalVotes}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-400 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-dungeon-800 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300 mb-1">Contribuidores</p>
                  <p className="text-3xl font-bold text-purple-400">{topContributors.length}</p>
                </div>
                <Users className="w-12 h-12 text-purple-400 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-dungeon-800 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-300 mb-1">Promedio Votos</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    {totalReports > 0 ? (totalVotes / totalReports).toFixed(1) : '0'}
                  </p>
                </div>
                <Award className="w-12 h-12 text-yellow-400 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category and Status Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Category Breakdown */}
          <Card className="bg-dungeon-800 border-dungeon-700">
            <CardHeader>
              <CardTitle className="text-gold-400 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Reportes por Categoría
              </CardTitle>
            </CardHeader>
            <CardContent>
              {categoryStats.length === 0 ? (
                <p className="text-dungeon-400 text-center py-8">No hay datos disponibles</p>
              ) : (
                <div className="space-y-3">
                  {categoryStats
                    .sort((a, b) => b.count - a.count)
                    .map((stat) => (
                      <div key={stat.category} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <span className={`font-medium ${CATEGORY_COLORS[stat.category]}`}>
                            {CATEGORY_LABELS[stat.category] || stat.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-dungeon-300 text-sm">{stat.count} reportes</span>
                          <span className="text-gold-400 font-semibold min-w-[3rem] text-right">
                            {stat.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status Breakdown */}
          <Card className="bg-dungeon-800 border-dungeon-700">
            <CardHeader>
              <CardTitle className="text-gold-400 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Reportes por Estado
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statusStats.length === 0 ? (
                <p className="text-dungeon-400 text-center py-8">No hay datos disponibles</p>
              ) : (
                <div className="space-y-3">
                  {statusStats
                    .sort((a, b) => b.count - a.count)
                    .map((stat) => (
                      <div key={stat.status} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <span className={`font-medium ${STATUS_COLORS[stat.status]}`}>
                            {STATUS_LABELS[stat.status] || stat.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-dungeon-300 text-sm">{stat.count} reportes</span>
                          <span className="text-gold-400 font-semibold min-w-[3rem] text-right">
                            {stat.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top Contributors */}
        <Card className="bg-dungeon-800 border-dungeon-700 mb-8">
          <CardHeader>
            <CardTitle className="text-gold-400 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Top Contribuidores
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topContributors.length === 0 ? (
              <p className="text-dungeon-400 text-center py-8">No hay contribuidores aún</p>
            ) : (
              <div className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div
                    key={contributor.id}
                    className="p-4 bg-dungeon-900 border border-dungeon-700 rounded-lg hover:border-gold-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-dungeon-950 font-bold">
                          {index + 1}
                        </div>

                        {/* User Info */}
                        <div>
                          <Link
                            href={`/u/${contributor.username_slug}`}
                            className="text-dungeon-100 font-semibold hover:text-gold-400 transition-colors"
                          >
                            {contributor.display_name || contributor.email.split('@')[0]}
                          </Link>
                          <div className="flex items-center gap-3 text-xs text-dungeon-400 mt-1">
                            <span className="flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              {contributor.karma_points} karma
                            </span>
                            <span>{contributor.reports_submitted} reportes</span>
                            <span>{contributor.reports_resolved} resueltos</span>
                            <span className="text-green-400">
                              {contributor.success_rate.toFixed(1)}% éxito
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="bg-dungeon-800 border-dungeon-700 mb-8">
          <CardHeader>
            <CardTitle className="text-gold-400 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentReports.length === 0 ? (
              <p className="text-dungeon-400 text-center py-8">No hay reportes recientes</p>
            ) : (
              <div className="space-y-3">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-4 bg-dungeon-900 border border-dungeon-700 rounded-lg hover:border-gold-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-dungeon-100 font-semibold mb-2">{report.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-dungeon-400">
                          <span className={`${CATEGORY_COLORS[report.category]}`}>
                            {CATEGORY_LABELS[report.category]}
                          </span>
                          <span className={`${STATUS_COLORS[report.status]}`}>
                            {STATUS_LABELS[report.status]}
                          </span>
                          <span>
                            Por{' '}
                            <Link
                              href={`/u/${report.author_username}`}
                              className="hover:text-gold-400 transition-colors"
                            >
                              {report.author_display_name || 'Usuario'}
                            </Link>
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {report.vote_count || 0} votos
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(report.created_at).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Exportador de Reportes */}
        <Card className="bg-gradient-to-br from-gold-900/20 to-dungeon-800 border-gold-500/30">
          <CardHeader>
            <CardTitle className="text-gold-400 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Exportar Reportes a Markdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Filtros */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Filtro de Categoría */}
                <div>
                  <label className="block text-sm font-medium text-dungeon-200 mb-2">
                    Categoría
                  </label>
                  <select
                    value={exportFilters.category}
                    onChange={(e) => setExportFilters({ ...exportFilters, category: e.target.value })}
                    className="w-full px-4 py-2 bg-dungeon-900 border border-dungeon-700 rounded-lg text-dungeon-100 focus:outline-none focus:border-gold-500"
                  >
                    <option value="all">Todas las categorías</option>
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtro de Estado */}
                <div>
                  <label className="block text-sm font-medium text-dungeon-200 mb-2">
                    Estado
                  </label>
                  <select
                    value={exportFilters.status}
                    onChange={(e) => setExportFilters({ ...exportFilters, status: e.target.value })}
                    className="w-full px-4 py-2 bg-dungeon-900 border border-dungeon-700 rounded-lg text-dungeon-100 focus:outline-none focus:border-gold-500"
                  >
                    <option value="all">Todos los estados</option>
                    {Object.entries(STATUS_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtro de Prioridad */}
                <div>
                  <label className="block text-sm font-medium text-dungeon-200 mb-2">
                    Prioridad
                  </label>
                  <select
                    value={exportFilters.priority}
                    onChange={(e) => setExportFilters({ ...exportFilters, priority: e.target.value })}
                    className="w-full px-4 py-2 bg-dungeon-900 border border-dungeon-700 rounded-lg text-dungeon-100 focus:outline-none focus:border-gold-500"
                  >
                    <option value="all">Todas las prioridades</option>
                    <option value="low">Baja (LOW)</option>
                    <option value="medium">Media (MEDIUM)</option>
                    <option value="high">Alta (HIGH)</option>
                    <option value="critical">Crítica (CRITICAL)</option>
                  </select>
                </div>
              </div>

              {/* Botón de Exportar */}
              <div className="flex items-center justify-between pt-4 border-t border-dungeon-700">
                <p className="text-sm text-dungeon-400">
                  Los reportes se exportarán en formato Markdown (.md) con los filtros seleccionados
                </p>
                <button
                  onClick={exportToMarkdown}
                  disabled={exportLoading}
                  className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-700 hover:from-gold-600 hover:to-gold-800 text-dungeon-950 font-semibold rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {exportLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Exportando...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Exportar a .md
                    </>
                  )}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
