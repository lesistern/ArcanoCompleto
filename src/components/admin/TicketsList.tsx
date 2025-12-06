'use client';

import { MessageSquare, AlertTriangle, Clock, CheckCircle, Loader2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

type FeedbackStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'wont_fix' | 'pending';

interface TicketsListProps {
  loading: boolean;
  filteredTickets: any[];
  showCompleted: boolean;
  onShowCompletedToggle: (show: boolean) => void;
  onTicketSelect: (ticket: any) => void;
  categories: Record<string, { label: string; icon: any; color: string }>;
  statusOptions: Record<FeedbackStatus, { label: string; icon: any; color: string }>;
  priorities: Record<string, { label: string; color: string }>;
}

export function TicketsList({
  loading,
  filteredTickets,
  showCompleted,
  onShowCompletedToggle,
  onTicketSelect,
  categories,
  statusOptions,
  priorities,
}: TicketsListProps) {
  const activeTickets = filteredTickets.filter(t =>
    t.status !== 'resolved' && t.status !== 'closed' && t.status !== 'wont_fix'
  );
  const completedTickets = filteredTickets.filter(t =>
    t.status === 'resolved' || t.status === 'closed' || t.status === 'wont_fix'
  );

  const ticketsByPriority = {
    critical: activeTickets.filter(t => t.priority === 'critical'),
    high: activeTickets.filter(t => t.priority === 'high'),
    medium: activeTickets.filter(t => t.priority === 'medium'),
    low: activeTickets.filter(t => t.priority === 'low'),
  };

  const renderTicket = (ticket: any) => {
    const categoryInfo = categories[ticket.category];
    const CategoryIcon = categoryInfo.icon;
    const statusInfo = statusOptions[ticket.status as FeedbackStatus] || statusOptions.open;
    const StatusIcon = statusInfo.icon;
    const priorityInfo = priorities[ticket.priority];

    return (
      <div
        key={ticket.id}
        className="p-4 bg-dungeon-900 border border-dungeon-700 rounded-lg hover:border-gold-500/30 transition-colors cursor-pointer"
        onClick={() => onTicketSelect(ticket)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CategoryIcon className={`w-5 h-5 ${categoryInfo.color}`} />
              <h3 className="text-lg font-semibold text-dungeon-100 font-heading">
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

  if (loading) {
    return (
      <Card className="card">
        <CardContent className="py-12">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-gold-500 mb-4" />
            <p className="text-dungeon-400">Cargando tickets...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (filteredTickets.length === 0) {
    return (
      <Card className="card">
        <CardContent className="py-12">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 mx-auto text-dungeon-600 mb-4" />
            <p className="text-dungeon-400">No hay tickets con los filtros seleccionados</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {activeTickets.length > 0 && (
        <>
          {/* Críticos */}
          {ticketsByPriority.critical.length > 0 && (
            <Card className="card border-red-500/50">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2 font-heading">
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
            <Card className="card border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2 font-heading">
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
            <Card className="card border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2 font-heading">
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
            <Card className="card">
              <CardHeader>
                <CardTitle className="text-dungeon-400 flex items-center gap-2 font-heading">
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
        <Card className="card border-green-500/30">
          <CardHeader>
            <button
              onClick={() => onShowCompletedToggle(!showCompleted)}
              className="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
            >
              <CardTitle className="text-green-400 flex items-center gap-2 font-heading">
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
  );
}
