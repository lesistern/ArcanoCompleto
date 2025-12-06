import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { ModerationStatCard } from '@/components/admin/ModerationStatCard';
import { ForumReportCard } from '@/components/admin/ForumReportCard';
import { QuickActionCard } from '@/components/admin/QuickActionCard';
import {
  ForumReport,
  ModerationStats,
  STAT_CARDS_CONFIG,
  QUICK_ACTION_CARDS,
} from '@/lib/data/forum-moderation';

export const metadata: Metadata = {
  title: 'Panel de Moderación | Foro D&D 3.5',
  description: 'Panel de administración y moderación del foro',
};

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
          {STAT_CARDS_CONFIG.map((config) => (
            <ModerationStatCard
              key={config.key}
              icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
              label={config.label}
              value={stats[config.key as keyof ModerationStats]}
              color={config.color}
            />
          ))}
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
              <ForumReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>

      {/* Enlaces Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {QUICK_ACTION_CARDS.map((card) => (
          <QuickActionCard
            key={card.href}
            icon={<AlertTriangle className="w-6 h-6" />}
            title={card.title}
            description={card.description}
            href={card.href}
            color={card.color}
          />
        ))}
      </div>
    </div>
  );
}
