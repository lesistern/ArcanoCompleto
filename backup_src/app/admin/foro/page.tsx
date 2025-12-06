import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  Shield,
  AlertTriangle,
  Eye,
  EyeOff,
  Pin,
  Lock,
  Unlock,
  UserX,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  User,
  Calendar
} from 'lucide-react';
import ModerationActions from '@/components/forum/ModerationActions';

export const metadata: Metadata = {
  title: 'Panel de Moderación | Foro D&D 3.5',
  description: 'Panel de administración y moderación del foro',
};

interface ForumReport {
  id: string;
  thread_id: string | null;
  post_id: string | null;
  reporter_id: string;
  reporter_name: string;
  reporter_username: string;
  reason: string;
  status: 'open' | 'reviewed' | 'dismissed';
  created_at: string;
  thread_title: string | null;
  thread_slug?: string | null;
  thread_category_slug?: string | null;
  post_content: string | null;
  reported_user_id: string | null;
  reported_user_name: string | null;
  reported_user_username?: string | null;
  is_deleted?: boolean;
  thread_locked?: boolean;
  thread_pinned?: boolean;
}

interface ModerationStats {
  pending_reports: number;
  total_threads: number;
  total_posts: number;
  suspended_users: number;
  hidden_threads: number;
  hidden_posts: number;
}

async function checkModeratorAccess() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login?redirect=/admin/foro');
  }

  // Verificar que el usuario tiene TL4 o es admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('forum_trust_level, is_admin')
    .eq('id', user.id)
    .single();

  const isAdmin = profile?.is_admin === true;
  const isTL4 = profile?.forum_trust_level === 'TL4';

  if (!isAdmin && !isTL4) {
    redirect('/foro');
  }

  return user;
}

async function loadModerationData() {
  const supabase = await createClient();

  // Cargar estadísticas
  const [{ count: total_threads }, { count: total_posts }] = await Promise.all([
    supabase.from('forum_threads').select('id', { count: 'exact', head: true }),
    supabase.from('forum_posts').select('id', { count: 'exact', head: true }),
  ]);

  const stats: ModerationStats = {
    pending_reports: 0,
    total_threads: total_threads || 0,
    total_posts: total_posts || 0,
    suspended_users: 0,
    hidden_threads: 0,
    hidden_posts: 0,
  };

  const { data: reports } = await supabase
    .from('forum_reports')
    .select(`
      id,
      thread_id,
      post_id,
      reporter_id,
      reason,
      status,
      created_at,
      reporter:reporter_id (
        display_name,
        username_slug
      ),
      thread:thread_id (
        slug,
        category_id,
        title,
        category:category_id (slug, name)
      ),
      post:post_id (
        content_md,
        content_html,
        author_id,
        author:author_id (
          display_name,
          username_slug
        )
      )
    `)
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(50);

  const formattedReports = (reports || []).map((report: any) => ({
    id: report.id,
    thread_id: report.thread_id,
    post_id: report.post_id,
    reporter_id: report.reporter_id,
    reporter_name: report.reporter?.display_name || 'Usuario',
    reporter_username: report.reporter?.username_slug || '',
    reason: report.reason,
    status: report.status,
    created_at: report.created_at,
    thread_title: report.thread?.title || null,
    thread_slug: report.thread?.slug || null,
    thread_category_slug: report.thread?.category?.slug || null,
    post_content: report.post?.content_html || report.post?.content_md || null,
    reported_user_id: report.post?.author_id || null,
    reported_user_name: report.post?.author?.display_name || null,
    reported_user_username: report.post?.author?.username_slug || null,
    is_deleted: report.post?.is_deleted ?? false,
    thread_locked: report.thread?.locked ?? false,
    thread_pinned: report.thread?.pinned ?? false,
  }));

  const pendingCount = formattedReports.length;

  return {
    stats: { ...stats, pending_reports: pendingCount },
    reports: formattedReports as ForumReport[],
  };
}

export default async function ModerationPage() {
  await checkModeratorAccess();
  const { stats, reports } = await loadModerationData();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8 text-gold-400" />
          <h1 className="text-4xl font-bold text-gold-400">
            Panel de Moderación
          </h1>
        </div>
        <p className="text-lg text-dungeon-300">
          Gestión y administración del foro de la comunidad
        </p>
      </div>

      {/* Estadísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard
            icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
            label="Reportes Pendientes"
            value={stats.pending_reports}
            color="red"
          />
          <StatCard
            icon={<MessageSquare className="w-5 h-5 text-blue-400" />}
            label="Total Hilos"
            value={stats.total_threads}
            color="blue"
          />
          <StatCard
            icon={<MessageSquare className="w-5 h-5 text-green-400" />}
            label="Total Respuestas"
            value={stats.total_posts}
            color="green"
          />
          <StatCard
            icon={<UserX className="w-5 h-5 text-orange-400" />}
            label="Usuarios Suspendidos"
            value={stats.suspended_users}
            color="orange"
          />
          <StatCard
            icon={<EyeOff className="w-5 h-5 text-purple-400" />}
            label="Hilos Ocultos"
            value={stats.hidden_threads}
            color="purple"
          />
          <StatCard
            icon={<EyeOff className="w-5 h-5 text-pink-400" />}
            label="Posts Ocultos"
            value={stats.hidden_posts}
            color="pink"
          />
        </div>
      )}

      {/* Reportes Pendientes */}
      <div className="bg-dungeon-800 rounded-lg border border-dungeon-700 mb-8">
        <div className="p-6 border-b border-dungeon-700">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h2 className="text-2xl font-bold text-dungeon-100">
              Reportes Pendientes ({reports.length})
            </h2>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-dungeon-400">
              No hay reportes pendientes. ¡Todo en orden! 🎉
            </p>
          </div>
        ) : (
          <div className="divide-y divide-dungeon-700">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>

      {/* Enlaces Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActionCard
          icon={<UserX className="w-6 h-6" />}
          title="Gestión de Usuarios"
          description="Ver usuarios suspendidos y gestionar sanciones"
          href="/admin/foro/usuarios"
          color="orange"
        />
        <QuickActionCard
          icon={<EyeOff className="w-6 h-6" />}
          title="Contenido Oculto"
          description="Ver y gestionar hilos y posts ocultos"
          href="/admin/foro/contenido-oculto"
          color="purple"
        />
      </div>
    </div>
  );
}

// Componente StatCard
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className={`bg-dungeon-800 rounded-lg border border-${color}-500/30 p-4`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-dungeon-400">{label}</span>
      </div>
      <div className="text-2xl font-bold text-dungeon-100">
        {value.toLocaleString()}
      </div>
    </div>
  );
}

// Componente ReportCard
function ReportCard({ report }: { report: ForumReport }) {
  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Tipo de contenido reportado */}
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-dungeon-500" />
            <span className="text-sm text-dungeon-400">
              {report.thread_id && !report.post_id ? 'Hilo reportado' : 'Respuesta reportada'}
            </span>
          </div>

          {/* Título o contenido */}
          {report.thread_title && (
            <h3 className="text-lg font-semibold text-dungeon-100 mb-2">
              {report.thread_title}
            </h3>
          )}

          {report.post_content && (
            <div className="bg-dungeon-900 rounded-lg p-3 mb-3 border border-dungeon-700">
              <p className="text-sm text-dungeon-300 line-clamp-3">
                {report.post_content}
              </p>
            </div>
          )}

          {/* Razón del reporte */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-red-300">Motivo del reporte:</span>
            </div>
            <p className="text-sm text-red-200">{report.reason}</p>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-dungeon-500">
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>
                Reportado por:{' '}
                <Link
                  href={`/u/${report.reporter_username}`}
                  className="text-dungeon-300 hover:text-gold-400 transition-colors"
                >
                  {report.reporter_name}
                </Link>
              </span>
            </div>

            {report.reported_user_name && (
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>
                  Autor:{' '}
                  <span className="text-dungeon-300">{report.reported_user_name}</span>
                </span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(report.created_at)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones de Moderación */}
      <div className="flex flex-wrap gap-2">
        {/* Botón Ver Contenido */}
        <Link
          href={
            report.thread_category_slug && report.thread_slug
              ? report.post_id
                ? `/foro/${report.thread_category_slug}/${report.thread_slug}#post-${report.post_id}`
                : `/foro/${report.thread_category_slug}/${report.thread_slug}`
              : '#'
          }
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border bg-blue-900/30 border-blue-500/50 text-blue-300 hover:bg-blue-900/50 transition-colors"
        >
          <Eye className="w-4 h-4" />
          Ver Contenido
        </Link>

        {/* Componente de Acciones de Moderación */}
        <ModerationActions
          reportId={report.id}
          threadId={report.thread_id}
          postId={report.post_id}
          isDeleted={report.is_deleted}
          threadLocked={report.thread_locked}
          threadPinned={report.thread_pinned}
        />
      </div>
    </div>
  );
}

// Componente QuickActionCard
function QuickActionCard({
  icon,
  title,
  description,
  href,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className={`block bg-dungeon-800 rounded-lg border border-${color}-500/30 p-6 hover:border-${color}-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-${color}-500/10`}
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-${color}-900/30 border border-${color}-500/30 mb-4`}>
        <div className={`text-${color}-400`}>{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-dungeon-100 mb-2">{title}</h3>
      <p className="text-sm text-dungeon-400">{description}</p>
    </Link>
  );
}

// Función helper para formatear fecha
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Hace un momento';
  if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
  if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;

  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
