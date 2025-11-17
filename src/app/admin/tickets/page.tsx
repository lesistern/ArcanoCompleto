'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  Bug,
  Lightbulb,
  Languages,
  Database,
  Palette,
  Zap,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
  Loader2,
  Filter,
  X,
  ExternalLink
} from 'lucide-react';

type FeedbackCategory = 'bug' | 'feature' | 'translation' | 'data' | 'ui' | 'performance' | 'other';
type FeedbackPriority = 'low' | 'medium' | 'high' | 'critical';
type FeedbackStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'wont_fix';

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: FeedbackCategory;
  priority: FeedbackPriority;
  status: FeedbackStatus;
  page_url: string | null;
  browser_info: string | null;
  user_email: string;
  created_at: string;
  resolution_notes: string | null;
}

const CATEGORIES = {
  bug: { label: 'Bug', icon: Bug, color: 'text-red-400' },
  feature: { label: 'Feature', icon: Lightbulb, color: 'text-yellow-400' },
  translation: { label: 'Traducción', icon: Languages, color: 'text-blue-400' },
  data: { label: 'Datos', icon: Database, color: 'text-purple-400' },
  ui: { label: 'UI', icon: Palette, color: 'text-pink-400' },
  performance: { label: 'Performance', icon: Zap, color: 'text-orange-400' },
  other: { label: 'Otro', icon: MessageSquare, color: 'text-gray-400' },
};

const PRIORITIES = {
  low: { label: 'Baja', color: 'bg-gray-500' },
  medium: { label: 'Media', color: 'bg-blue-500' },
  high: { label: 'Alta', color: 'bg-orange-500' },
  critical: { label: 'Crítica', color: 'bg-red-500' },
};

const STATUS_OPTIONS = {
  open: { label: 'Abierto', icon: Clock, color: 'text-blue-400' },
  in_progress: { label: 'En Progreso', icon: Loader2, color: 'text-yellow-400' },
  resolved: { label: 'Resuelto', icon: CheckCircle, color: 'text-green-400' },
  closed: { label: 'Cerrado', icon: CheckCircle, color: 'text-gray-400' },
  wont_fix: { label: 'No se Arreglará', icon: AlertTriangle, color: 'text-red-400' },
};

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<FeedbackCategory | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<FeedbackStatus | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<FeedbackPriority | 'all'>('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    loadTickets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tickets, filterCategory, filterStatus, filterPriority]);

  async function loadTickets() {
    try {
      const { data, error } = await supabase
        .from('feedback_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTickets(data || []);
    } catch (err) {
      console.error('Error loading tickets:', err);
    } finally {
      setLoading(false);
    }
  }

  function applyFilters() {
    let filtered = tickets;

    if (filterCategory !== 'all') {
      filtered = filtered.filter(t => t.category === filterCategory);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(t => t.status === filterStatus);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(t => t.priority === filterPriority);
    }

    setFilteredTickets(filtered);
  }

  async function updateTicketStatus(ticketId: string, newStatus: FeedbackStatus) {
    setUpdating(true);
    try {
      const updateData: any = { status: newStatus };

      if (newStatus === 'resolved') {
        updateData.resolved_at = new Date().toISOString();
        if (resolutionNotes) {
          updateData.resolution_notes = resolutionNotes;
        }
      }

      const { error } = await supabase
        .from('feedback_tickets')
        .update(updateData)
        .eq('id', ticketId);

      if (error) throw error;

      await loadTickets();
      setSelectedTicket(null);
      setResolutionNotes('');
    } catch (err) {
      console.error('Error updating ticket:', err);
      alert('Error al actualizar el ticket');
    } finally {
      setUpdating(false);
    }
  }

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    critical: tickets.filter(t => t.priority === 'critical').length,
  };

  // Separar tickets activos y completados
  const activeTickets = filteredTickets.filter(t =>
    t.status !== 'resolved' && t.status !== 'closed' && t.status !== 'wont_fix'
  );
  const completedTickets = filteredTickets.filter(t =>
    t.status === 'resolved' || t.status === 'closed' || t.status === 'wont_fix'
  );

  // Organizar tickets activos por prioridad
  const ticketsByPriority = {
    critical: activeTickets.filter(t => t.priority === 'critical'),
    high: activeTickets.filter(t => t.priority === 'high'),
    medium: activeTickets.filter(t => t.priority === 'medium'),
    low: activeTickets.filter(t => t.priority === 'low'),
  };

  const renderTicket = (ticket: Ticket) => {
    const categoryInfo = CATEGORIES[ticket.category];
    const CategoryIcon = categoryInfo.icon;
    const statusInfo = STATUS_OPTIONS[ticket.status];
    const StatusIcon = statusInfo.icon;
    const priorityInfo = PRIORITIES[ticket.priority];

    return (
      <div
        key={ticket.id}
        className="p-4 bg-dungeon-900 border border-dungeon-700 rounded-lg hover:border-gold-500/30 transition-colors cursor-pointer"
        onClick={() => setSelectedTicket(ticket)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CategoryIcon className={`w-5 h-5 ${categoryInfo.color}`} />
              <h3 className="text-lg font-semibold text-dungeon-100">
                {ticket.title}
              </h3>
              <span className={`px-2 py-0.5 text-xs rounded-full text-white ${priorityInfo.color}`}>
                {priorityInfo.label}
              </span>
            </div>
            <p className="text-dungeon-300 text-sm mb-2 line-clamp-1">
              {ticket.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-dungeon-500">
              <span>{ticket.user_email}</span>
              <span>•</span>
              <span>{new Date(ticket.created_at).toLocaleDateString('es-ES')}</span>
              {ticket.page_url && (
                <>
                  <span>•</span>
                  <a
                    href={ticket.page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gold-400 hover:text-gold-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Ver página <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 ml-4">
            <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
            <span className={`text-sm ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gold-500 mb-2">
            Panel de Tickets
          </h1>
          <p className="text-dungeon-300">
            Gestión de feedback de beta testers
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-dungeon-800 border-dungeon-700">
            <CardContent className="p-4">
              <p className="text-dungeon-400 text-sm">Total</p>
              <p className="text-2xl font-bold text-dungeon-100">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border-blue-500/30">
            <CardContent className="p-4">
              <p className="text-blue-400 text-sm">Abiertos</p>
              <p className="text-2xl font-bold text-blue-400">{stats.open}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border-yellow-500/30">
            <CardContent className="p-4">
              <p className="text-yellow-400 text-sm">En Progreso</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.in_progress}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border-green-500/30">
            <CardContent className="p-4">
              <p className="text-green-400 text-sm">Resueltos</p>
              <p className="text-2xl font-bold text-green-400">{stats.resolved}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border-red-500/30">
            <CardContent className="p-4">
              <p className="text-red-400 text-sm">Críticos</p>
              <p className="text-2xl font-bold text-red-400">{stats.critical}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-dungeon-800 border-dungeon-700">
          <CardHeader>
            <CardTitle className="text-gold-400 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-dungeon-300 mb-2">
                  Categoría
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-dungeon-100"
                >
                  <option value="all">Todas</option>
                  {Object.entries(CATEGORIES).map(([key, cat]) => (
                    <option key={key} value={key}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-dungeon-300 mb-2">
                  Estado
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-dungeon-100"
                >
                  <option value="all">Todos</option>
                  {Object.entries(STATUS_OPTIONS).map(([key, status]) => (
                    <option key={key} value={key}>{status.label}</option>
                  ))}
                </select>
              </div>

              {/* Priority Filter */}
              <div>
                <label className="block text-sm font-medium text-dungeon-300 mb-2">
                  Prioridad
                </label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as any)}
                  className="w-full px-3 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-dungeon-100"
                >
                  <option value="all">Todas</option>
                  {Object.entries(PRIORITIES).map(([key, prio]) => (
                    <option key={key} value={key}>{prio.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets List */}
        {loading ? (
          <Card className="bg-dungeon-800 border-dungeon-700">
            <CardContent className="py-12">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto text-gold-500 mb-4" />
                <p className="text-dungeon-400">Cargando tickets...</p>
              </div>
            </CardContent>
          </Card>
        ) : filteredTickets.length === 0 ? (
          <Card className="bg-dungeon-800 border-dungeon-700">
            <CardContent className="py-12">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto text-dungeon-600 mb-4" />
                <p className="text-dungeon-400">No hay tickets con los filtros seleccionados</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Tickets Activos por Prioridad */}
            {activeTickets.length > 0 && (
              <>
                {/* Críticos */}
                {ticketsByPriority.critical.length > 0 && (
                  <Card className="bg-dungeon-800 border-red-500/50">
                    <CardHeader>
                      <CardTitle className="text-red-400 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Prioridad Crítica ({ticketsByPriority.critical.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {ticketsByPriority.critical.map(renderTicket)}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Alta */}
                {ticketsByPriority.high.length > 0 && (
                  <Card className="bg-dungeon-800 border-orange-500/30">
                    <CardHeader>
                      <CardTitle className="text-orange-400 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Prioridad Alta ({ticketsByPriority.high.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {ticketsByPriority.high.map(renderTicket)}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Media */}
                {ticketsByPriority.medium.length > 0 && (
                  <Card className="bg-dungeon-800 border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-blue-400 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Prioridad Media ({ticketsByPriority.medium.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {ticketsByPriority.medium.map(renderTicket)}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Baja */}
                {ticketsByPriority.low.length > 0 && (
                  <Card className="bg-dungeon-800 border-dungeon-700">
                    <CardHeader>
                      <CardTitle className="text-dungeon-400 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Prioridad Baja ({ticketsByPriority.low.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {ticketsByPriority.low.map(renderTicket)}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Tickets Completados */}
            {completedTickets.length > 0 && (
              <Card className="bg-dungeon-800 border-green-500/30">
                <CardHeader>
                  <button
                    onClick={() => setShowCompleted(!showCompleted)}
                    className="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
                  >
                    <CardTitle className="text-green-400 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Tickets Completados ({completedTickets.length})
                    </CardTitle>
                    <span className="text-dungeon-400 text-sm">
                      {showCompleted ? '▼ Ocultar' : '▶ Mostrar'}
                    </span>
                  </button>
                </CardHeader>
                {showCompleted && (
                  <CardContent>
                    <div className="space-y-3">
                      {completedTickets.map(renderTicket)}
                    </div>
                  </CardContent>
                )}
              </Card>
            )}
          </div>
        )}

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-dungeon-800 border-gold-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-gold-400 mb-2">{selectedTicket.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full text-white ${PRIORITIES[selectedTicket.priority].color}`}>
                        {PRIORITIES[selectedTicket.priority].label}
                      </span>
                      <span className="text-dungeon-400 text-sm">
                        {CATEGORIES[selectedTicket.category].label}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-dungeon-400 hover:text-dungeon-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-dungeon-400 mb-1">Descripción:</p>
                  <p className="text-dungeon-200">{selectedTicket.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-dungeon-400">Usuario:</p>
                    <p className="text-dungeon-200">{selectedTicket.user_email}</p>
                  </div>
                  <div>
                    <p className="text-dungeon-400">Fecha:</p>
                    <p className="text-dungeon-200">
                      {new Date(selectedTicket.created_at).toLocaleString('es-ES')}
                    </p>
                  </div>
                </div>

                {selectedTicket.browser_info && (
                  <div>
                    <p className="text-sm text-dungeon-400 mb-1">Navegador:</p>
                    <p className="text-xs text-dungeon-300 font-mono">{selectedTicket.browser_info}</p>
                  </div>
                )}

                {selectedTicket.resolution_notes && (
                  <div>
                    <p className="text-sm text-dungeon-400 mb-1">Notas de resolución:</p>
                    <p className="text-dungeon-200">{selectedTicket.resolution_notes}</p>
                  </div>
                )}

                {selectedTicket.status === 'open' && (
                  <div>
                    <label className="block text-sm text-dungeon-400 mb-2">
                      Notas de resolución (opcional):
                    </label>
                    <textarea
                      value={resolutionNotes}
                      onChange={(e) => setResolutionNotes(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-dungeon-100"
                      placeholder="Añade notas sobre cómo se resolvió..."
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  {selectedTicket.status === 'open' && (
                    <>
                      <Button
                        onClick={() => updateTicketStatus(selectedTicket.id, 'in_progress')}
                        disabled={updating}
                        className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                      >
                        Marcar En Progreso
                      </Button>
                      <Button
                        onClick={() => updateTicketStatus(selectedTicket.id, 'resolved')}
                        disabled={updating}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        Marcar Resuelto
                      </Button>
                    </>
                  )}
                  {selectedTicket.status === 'in_progress' && (
                    <Button
                      onClick={() => updateTicketStatus(selectedTicket.id, 'resolved')}
                      disabled={updating}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Marcar Resuelto
                    </Button>
                  )}
                  {selectedTicket.status !== 'open' && (
                    <Button
                      onClick={() => updateTicketStatus(selectedTicket.id, 'open')}
                      disabled={updating}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      Reabrir
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
