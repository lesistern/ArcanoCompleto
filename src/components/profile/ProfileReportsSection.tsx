'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MessageSquare } from 'lucide-react';

interface UserReport {
  id: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
  vote_count: number;
}

interface ProfileReportsSectionProps {
  reports: UserReport[];
}

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

const PRIORITY_COLORS: Record<string, string> = {
  low: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  high: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  critical: 'bg-red-500/10 text-red-400 border-red-500/30',
};

const STATUS_COLORS: Record<string, string> = {
  open: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  in_progress: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  resolved: 'bg-green-500/10 text-green-400 border-green-500/30',
  closed: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
  wont_fix: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
};

export function ProfileReportsSection({ reports }: ProfileReportsSectionProps) {
  if (reports.length === 0) {
    return (
      <Card className="card">
        <CardContent className="py-12 text-center">
          <MessageSquare className="w-12 h-12 text-dungeon-600 mx-auto mb-4 opacity-50" />
          <p className="text-dungeon-400">Sin reportes</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <Link
          key={report.id}
          href={`/reportes-beta#report-${report.id}`}
          className="block group"
        >
          <Card className="card hover:border-dungeon-600 transition-colors">
            <CardContent className="py-4 px-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white group-hover:text-gold-400 transition-colors truncate">
                    {report.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {CATEGORY_LABELS[report.category] || report.category}
                    </Badge>
                    <Badge className={`text-xs border ${PRIORITY_COLORS[report.priority as keyof typeof PRIORITY_COLORS] || PRIORITY_COLORS.low}`}>
                      {report.priority}
                    </Badge>
                    <Badge className={`text-xs border ${STATUS_COLORS[report.status as keyof typeof STATUS_COLORS] || STATUS_COLORS.open}`}>
                      {STATUS_LABELS[report.status] || report.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end text-right">
                  <p className="text-sm text-dungeon-400">
                    {new Date(report.created_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-xs text-gold-400 font-semibold">
                    {report.vote_count} votos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
