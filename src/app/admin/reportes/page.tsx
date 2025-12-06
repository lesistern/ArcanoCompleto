'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  MessageSquare,
  ExternalLink,
  User,
  ShieldAlert,
  X,
  Loader2,
  Eye
} from 'lucide-react';
import Link from 'next/link';

type ReportStatus = 'pending' | 'investigating' | 'resolved' | 'dismissed';
type ReportReason = 'spam' | 'harassment' | 'inappropriate' | 'misinformation' | 'other';
type ContentType = 'thread' | 'post' | 'user' | 'comment';

interface Report {
  id: string;
  reporter_id: string;
  reported_user_id?: string;
  content_type: ContentType;
  content_id: string;
  reason: ReportReason;
  description?: string;
  status: ReportStatus;
  created_at: string;
  resolved_at?: string;
  resolved_by?: string;
  resolution_notes?: string;
  reporter_email?: string;
  reported_user_email?: string;
  content_preview?: string;
  content_url?: string;
}

const REASONS = {
  spam: { label: 'Spam', color: 'text-yellow-400' },
  harassment: { label: 'Acoso', color: 'text-red-400' },
  inappropriate: { label: 'Contenido Inapropiado', color: 'text-orange-400' },
  misinformation: { label: 'Desinformación', color: 'text-purple-400' },
  other: { label: 'Otro', color: 'text-gray-400' },
};

const STATUSES = {
  pending: { label: 'Pendiente', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' },
  investigating: { label: 'Investigando', icon: Eye, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
  resolved: { label: 'Resuelto', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' },
  dismissed: { label: 'Descartado', icon: X, color: 'text-gray-400', bg: 'bg-gray-500/10 border-gray-500/30' },
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<ReportStatus | 'all'>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const { data, error } = await supabase
        .from('feedback_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading reports:', error);
        setReports([]);
      } else {
        // Mapear feedback_tickets al formato de Report
        const mappedReports = (data || []).map((ticket: any) => ({
          id: ticket.id,
          reporter_id: ticket.user_id,
          reporter_email: ticket.user_email,
          reported_user_id: undefined,
          reported_user_email: undefined,
          content_type: 'comment' as ContentType,
          content_id: ticket.id,
          reason: ticket.category as ReportReason || 'other',
          description: ticket.description,
          status: ticket.status as ReportStatus,
          created_at: ticket.created_at,
          resolved_at: ticket.resolved_at,
          resolved_by: ticket.assigned_to,
          resolution_notes: ticket.resolution_notes,
          content_preview: ticket.title,
          content_url: ticket.page_url,
        }));
        setReports(mappedReports);
      }
    } catch (err) {
      console.error('Error loading reports:', err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(reportId: string, newStatus: ReportStatus) {
    setUpdating(true);
    try {
      // Actualizar en tabla feedback_tickets (la fuente real de datos)
      const { error } = await supabase
        .from('feedback_tickets')
        .update({
          status: newStatus,
          resolved_at: newStatus === 'resolved' || newStatus === 'dismissed' ? new Date().toISOString() : null,
          resolution_notes: resolutionNotes
        })
        .eq('id', reportId);

      if (error) throw error;

      // Actualizar estado local
      setReports(prev => prev.map(r =>
        r.id === reportId
          ? { ...r, status: newStatus, resolution_notes: resolutionNotes }
          : r
      ));
      setSelectedReport(null);
      setResolutionNotes('');
    } catch (err) {
      console.error('Error updating report:', err);
      alert('Error al actualizar el reporte');
    } finally {
      setUpdating(false);
    }
  }

  const filteredReports = reports.filter(r =>
    filterStatus === 'all' ? true : r.status === filterStatus
  );

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    investigating: reports.filter(r => r.status === 'investigating').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
  };

  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-500 mb-2 flex items-center gap-3 font-heading">
            <ShieldAlert className="w-10 h-10" />
            Reportes de Contenido
          </h1>
          <p className="text-dungeon-300">
            Moderación de contenido y reportes de usuarios
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="card">
            <CardContent className="p-4">
              <p className="text-dungeon-400 text-sm">Total Reportes</p>
              <p className="text-2xl font-bold text-dungeon-100 font-heading">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border-yellow-500/30">
            <CardContent className="p-4">
              <p className="text-yellow-400 text-sm">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-400 font-heading">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border-blue-500/30">
            <CardContent className="p-4">
              <p className="text-blue-400 text-sm">Investigando</p>
              <p className="text-2xl font-bold text-blue-400 font-heading">{stats.investigating}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border-green-500/30">
            <CardContent className="p-4">
              <p className="text-green-400 text-sm">Resueltos</p>
              <p className="text-2xl font-bold text-green-400 font-heading">{stats.resolved}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2 bg-dungeon-800 p-1 rounded-lg border border-dungeon-700">
            {(['all', 'pending', 'investigating', 'resolved', 'dismissed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterStatus === status
                    ? 'bg-dungeon-700 text-dungeon-100 shadow-sm'
                    : 'text-dungeon-400 hover:text-dungeon-200'
                  }`}
              >
                {status === 'all' ? 'Todos' : STATUSES[status].label}
              </button>
            ))}
          </div>
        </div>

        {/* Reports List */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-heading">
              <MessageSquare className="w-5 h-5 text-gold-400" />
              Reportes Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
              </div>
            ) : filteredReports.length === 0 ? (
              <div className="text-center py-12 text-dungeon-400">
                No hay reportes con el estado seleccionado
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReports.map((report) => {
                  const StatusIcon = STATUSES[report.status].icon;
                  return (
                    <div
                      key={report.id}
                      className="p-4 bg-dungeon-900 border border-dungeon-700 rounded-lg hover:border-dungeon-600 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${STATUSES[report.status].bg} ${STATUSES[report.status].color} flex items-center gap-1`}>
                              <StatusIcon className="w-3 h-3" />
                              {STATUSES[report.status].label}
                            </span>
                            <span className="text-dungeon-400 text-sm">•</span>
                            <span className={`text-sm font-medium ${REASONS[report.reason].color}`}>
                              {REASONS[report.reason].label}
                            </span>
                            <span className="text-dungeon-400 text-sm">•</span>
                            <span className="text-dungeon-400 text-sm">
                              {new Date(report.created_at).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="mb-3">
                            <p className="text-dungeon-200 text-sm mb-1">
                              <span className="text-dungeon-400">Reportado por:</span> {report.reporter_email || 'Anónimo'}
                            </p>
                            <p className="text-dungeon-200 text-sm">
                              <span className="text-dungeon-400">Usuario reportado:</span> {report.reported_user_email || 'N/A'}
                            </p>
                          </div>

                          {report.description && (
                            <div className="bg-dungeon-950 p-3 rounded border border-dungeon-800 mb-3">
                              <p className="text-sm text-dungeon-300 italic">"{report.description}"</p>
                            </div>
                          )}

                          {report.content_preview && (
                            <div className="mb-3">
                              <p className="text-xs text-dungeon-500 uppercase font-bold mb-1">Contenido Reportado:</p>
                              <p className="text-sm text-dungeon-200 line-clamp-2">{report.content_preview}</p>
                            </div>
                          )}

                          <div className="flex items-center gap-3">
                            {report.content_url && (
                              <Link
                                href={report.content_url}
                                target="_blank"
                                className="text-sm text-gold-400 hover:text-gold-300 flex items-center gap-1"
                              >
                                Ver Contenido <ExternalLink className="w-3 h-3" />
                              </Link>
                            )}
                            <button
                              onClick={() => setSelectedReport(report)}
                              className="text-sm text-blue-400 hover:text-blue-300"
                            >
                              Gestionar Reporte
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Report Management Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full bg-dungeon-800 border-gold-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-gold-400 font-heading">Gestionar Reporte</CardTitle>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-dungeon-400 hover:text-dungeon-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm bg-dungeon-900 p-4 rounded border border-dungeon-700">
                  <div>
                    <p className="text-dungeon-400 mb-1">Razón</p>
                    <p className="text-dungeon-100 font-medium">{REASONS[selectedReport.reason].label}</p>
                  </div>
                  <div>
                    <p className="text-dungeon-400 mb-1">Estado Actual</p>
                    <p className={`font-medium ${STATUSES[selectedReport.status].color}`}>
                      {STATUSES[selectedReport.status].label}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-dungeon-400 mb-1">Descripción del Reporte</p>
                    <p className="text-dungeon-200">{selectedReport.description || 'Sin descripción'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dungeon-300 mb-2">
                    Notas de Resolución
                  </label>
                  <textarea
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    className="w-full h-24 px-3 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-dungeon-100 resize-none input"
                    placeholder="Explica las acciones tomadas..."
                  />
                </div>

                <div className="flex gap-2 justify-end pt-4 border-t border-dungeon-700">
                  <Button
                    onClick={() => updateStatus(selectedReport.id, 'dismissed')}
                    variant="ghost"
                    disabled={updating}
                    className="text-dungeon-400 hover:text-dungeon-200"
                  >
                    Descartar
                  </Button>
                  <Button
                    onClick={() => updateStatus(selectedReport.id, 'investigating')}
                    variant="secondary"
                    disabled={updating}
                    className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                  >
                    Investigar
                  </Button>
                  <Button
                    onClick={() => updateStatus(selectedReport.id, 'resolved')}
                    disabled={updating || !resolutionNotes.trim()}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Resolver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// Mock Data for UI Development
const MOCK_REPORTS: Report[] = [
  {
    id: '1',
    reporter_id: 'user1',
    reporter_email: 'usuario@ejemplo.com',
    reported_user_id: 'user2',
    reported_user_email: 'spammer@ejemplo.com',
    content_type: 'post',
    content_id: 'post1',
    reason: 'spam',
    description: 'Este usuario está publicando enlaces sospechosos repetidamente.',
    status: 'pending',
    created_at: new Date().toISOString(),
    content_preview: '¡Gana dinero rápido visitando este enlace! http://spam-link.com',
    content_url: '/foro/general/hilo-spam'
  },
  {
    id: '2',
    reporter_id: 'user3',
    reporter_email: 'mod@ejemplo.com',
    reported_user_id: 'user4',
    reported_user_email: 'troll@ejemplo.com',
    content_type: 'comment',
    content_id: 'comment1',
    reason: 'harassment',
    description: 'Insultos directos hacia otro usuario.',
    status: 'investigating',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    content_preview: 'Eres un idiota y no sabes jugar.',
    content_url: '/foro/reglas/discusion'
  },
  {
    id: '3',
    reporter_id: 'user5',
    reporter_email: 'beta@ejemplo.com',
    reported_user_id: 'user6',
    reported_user_email: 'newbie@ejemplo.com',
    content_type: 'thread',
    content_id: 'thread1',
    reason: 'misinformation',
    description: 'Reglas inventadas que confunden a los nuevos.',
    status: 'resolved',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    resolved_at: new Date().toISOString(),
    resolution_notes: 'Hilo cerrado y usuario advertido.',
    content_preview: 'En D&D 5e puedes lanzar 3 hechizos por turno si eres mago nivel 1.',
    content_url: '/foro/dudas/reglas-magia'
  }
];
