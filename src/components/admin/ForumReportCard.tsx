'use client';

import Link from 'next/link';
import {
  MessageSquare,
  AlertTriangle,
  User,
  Calendar,
  Eye,
} from 'lucide-react';
import ModerationActions from '@/components/forum/ModerationActions';
import {
  ReportCardProps,
  formatDate,
  generateReportLink,
  getReportTypeLabel,
} from '@/lib/data/forum-moderation';

/**
 * ForumReportCard component displays a single forum report
 *
 * Shows:
 * - Report type (thread or post)
 * - Content title/preview
 * - Report reason
 * - Reporter and author metadata
 * - Action buttons (View, Hide, Dismiss, Suspend)
 *
 * Usage:
 * ```tsx
 * <ForumReportCard report={forumReport} />
 * ```
 */
export function ForumReportCard({ report }: ReportCardProps) {
  const reportLink = generateReportLink(report);
  const reportType = getReportTypeLabel(report);

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Tipo de contenido reportado */}
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-dungeon-500" />
            <span className="text-sm text-dungeon-400">
              {reportType}
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
              <span className="text-sm font-semibold text-red-300">
                Motivo del reporte:
              </span>
            </div>
            <p className="text-sm text-red-200">{report.reason}</p>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-dungeon-500">
            {/* Reporter */}
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

            {/* Reported User */}
            {report.reported_user_name && (
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>
                  Autor:{' '}
                  <span className="text-dungeon-300">
                    {report.reported_user_name}
                  </span>
                </span>
              </div>
            )}

            {/* Date */}
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
          href={reportLink}
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
