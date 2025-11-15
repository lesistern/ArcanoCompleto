'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
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
  Search,
  Filter,
  X,
  ThumbsUp,
  Award
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
  created_at: string;
  user_email: string;
  vote_count?: number;
  user_has_voted?: boolean;
  author_display_name?: string | null;
  author_karma?: number;
  author_tier?: string;
}

const CATEGORIES = [
  { value: 'all', label: 'Todas', icon: MessageSquare, color: 'text-gray-400' },
  { value: 'bug', label: 'Bug / Error', icon: Bug, color: 'text-red-400' },
  { value: 'feature', label: 'Nueva funcionalidad', icon: Lightbulb, color: 'text-yellow-400' },
  { value: 'translation', label: 'Error de traducción', icon: Languages, color: 'text-blue-400' },
  { value: 'data', label: 'Error en datos', icon: Database, color: 'text-purple-400' },
  { value: 'ui', label: 'Problema de UI/Diseño', icon: Palette, color: 'text-pink-400' },
  { value: 'performance', label: 'Rendimiento', icon: Zap, color: 'text-orange-400' },
  { value: 'other', label: 'Otro', icon: MessageSquare, color: 'text-gray-400' },
] as const;

const PRIORITIES = [
  { value: 'all', label: 'Todas', color: 'bg-gray-500' },
  { value: 'low', label: 'Baja', color: 'bg-gray-500' },
  { value: 'medium', label: 'Media', color: 'bg-blue-500' },
  { value: 'high', label: 'Alta', color: 'bg-orange-500' },
  { value: 'critical', label: 'Crítica', color: 'bg-red-500' },
] as const;

const STATUSES = [
  { value: 'all', label: 'Todos', icon: MessageSquare, color: 'text-gray-400' },
  { value: 'open', label: 'Abierto', icon: Clock, color: 'text-blue-400' },
  { value: 'in_progress', label: 'En progreso', icon: Loader2, color: 'text-yellow-400' },
  { value: 'resolved', label: 'Resuelto', icon: CheckCircle, color: 'text-green-400' },
  { value: 'closed', label: 'Cerrado', icon: CheckCircle, color: 'text-gray-400' },
  { value: 'wont_fix', label: 'No se arreglará', icon: AlertTriangle, color: 'text-red-400' },
] as const;

const STATUS_LABELS = {
  open: { label: 'Abierto', icon: Clock, color: 'text-blue-400' },
  in_progress: { label: 'En progreso', icon: Loader2, color: 'text-yellow-400' },
  resolved: { label: 'Resuelto', icon: CheckCircle, color: 'text-green-400' },
  closed: { label: 'Cerrado', icon: CheckCircle, color: 'text-gray-400' },
  wont_fix: { label: 'No se arreglará', icon: AlertTriangle, color: 'text-red-400' },
};

export default function PublicReportsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'votes'>('votes');
  const [votingTicketId, setVotingTicketId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    checkUser();
    loadTickets();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  }

  useEffect(() => {
    filterTickets();
  }, [tickets, searchTerm, selectedCategory, selectedPriority, selectedStatus, sortBy]);

  async function loadTickets() {
    try {
      // Intentar cargar desde la vista con autor y votos
      const { data: viewData, error: viewError } = await supabase
        .from('v_feedback_tickets_with_author')
        .select('*')
        .order('created_at', { ascending: false });

      if (!viewError && viewData) {
        setTickets(viewData);
      } else if (viewError && viewError.message.includes('v_feedback_tickets_with_author')) {
        // Fallback a vista anterior si la nueva no existe
        console.warn('Vista v_feedback_tickets_with_author no disponible, intentando v_feedback_tickets_with_votes');
        const { data: oldViewData, error: oldViewError } = await supabase
          .from('v_feedback_tickets_with_votes')
          .select('*')
          .order('created_at', { ascending: false });

        if (!oldViewError && oldViewData) {
          setTickets(oldViewData);
        } else {
          throw oldViewError;
        }
      } else {
        // Fallback: cargar tickets sin votos si la vista no existe
        console.warn('Vista v_feedback_tickets_with_votes no disponible, usando tabla base');
        const { data, error } = await supabase
          .from('feedback_tickets')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Cargar votos manualmente
        const ticketsWithVotes = await Promise.all(
          (data || []).map(async (ticket) => {
            const { count } = await supabase
              .from('feedback_votes')
              .select('*', { count: 'exact', head: true })
              .eq('ticket_id', ticket.id);

            const { data: { user } } = await supabase.auth.getUser();
            let userHasVoted = false;
            if (user) {
              const { data: voteData } = await supabase
                .from('feedback_votes')
                .select('id')
                .eq('ticket_id', ticket.id)
                .eq('user_id', user.id)
                .single();
              userHasVoted = !!voteData;
            }

            return {
              ...ticket,
              vote_count: count || 0,
              user_has_voted: userHasVoted,
            };
          })
        );

        setTickets(ticketsWithVotes);
      }
    } catch (err) {
      console.error('Error loading tickets:', err);
    } finally {
      setLoading(false);
    }
  }

  function filterTickets() {
    let filtered = [...tickets];

    // Filtrar por búsqueda
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(search) ||
          ticket.description.toLowerCase().includes(search)
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((ticket) => ticket.category === selectedCategory);
    }

    // Filtrar por prioridad
    if (selectedPriority !== 'all') {
      filtered = filtered.filter((ticket) => ticket.priority === selectedPriority);
    }

    // Filtrar por estado
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((ticket) => ticket.status === selectedStatus);
    }

    // Ordenar
    if (sortBy === 'votes') {
      filtered.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));
    } else {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    setFilteredTickets(filtered);
  }

  async function handleVote(ticketId: string) {
    if (!currentUser) {
      alert('Debes iniciar sesión para votar');
      return;
    }

    setVotingTicketId(ticketId);

    try {
      const { data, error } = await supabase.rpc('toggle_feedback_vote', {
        p_ticket_id: ticketId,
      });

      if (error) throw error;

      if (data && data.length > 0) {
        const result = data[0];
        // Actualizar el ticket localmente
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === ticketId
              ? {
                  ...ticket,
                  vote_count: result.vote_count,
                  user_has_voted: result.user_has_voted,
                }
              : ticket
          )
        );
      }
    } catch (err: any) {
      console.error('Error toggling vote:', err);
      alert(err.message || 'Error al votar. Intenta de nuevo.');
    } finally {
      setVotingTicketId(null);
    }
  }

  function clearFilters() {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedPriority('all');
    setSelectedStatus('all');
  }

  const hasActiveFilters =
    searchTerm || selectedCategory !== 'all' || selectedPriority !== 'all' || selectedStatus !== 'all';

  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gold-500 mb-2">Reportes de beta testers</h1>
          <p className="text-dungeon-300">
            Todos los reportes, problemas y sugerencias reportados por la comunidad de beta testers
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 bg-dungeon-800 border-dungeon-700">
          <CardContent className="p-4">
            {/* Search Bar */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dungeon-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar en reportes..."
                  className="w-full pl-10 pr-4 py-2 bg-dungeon-900 border border-dungeon-700 rounded-lg text-dungeon-100 focus:outline-none focus:border-gold-500"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="ghost" className="flex items-center gap-2">
                  <X className="w-4 h-4" />
                  Limpiar
                </Button>
              )}
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="space-y-4 pt-4 border-t border-dungeon-700">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-dungeon-200 mb-2">Categoría</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = selectedCategory === cat.value;
                      return (
                        <button
                          key={cat.value}
                          onClick={() => setSelectedCategory(cat.value)}
                          className={`px-3 py-1.5 rounded-lg border text-sm flex items-center gap-2 transition-all ${
                            isSelected
                              ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                              : 'border-dungeon-700 bg-dungeon-900 text-dungeon-300 hover:border-dungeon-600'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-gold-400' : cat.color}`} />
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Priority Filter */}
                <div>
                  <label className="block text-sm font-medium text-dungeon-200 mb-2">Prioridad</label>
                  <div className="flex flex-wrap gap-2">
                    {PRIORITIES.map((prio) => {
                      const isSelected = selectedPriority === prio.value;
                      return (
                        <button
                          key={prio.value}
                          onClick={() => setSelectedPriority(prio.value)}
                          className={`px-3 py-1.5 rounded-lg border text-sm flex items-center gap-2 transition-all ${
                            isSelected
                              ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                              : 'border-dungeon-700 bg-dungeon-900 text-dungeon-300 hover:border-dungeon-600'
                          }`}
                        >
                          {prio.value !== 'all' && <div className={`w-2 h-2 rounded-full ${prio.color}`} />}
                          {prio.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-dungeon-200 mb-2">Estado</label>
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map((status) => {
                      const Icon = status.icon;
                      const isSelected = selectedStatus === status.value;
                      return (
                        <button
                          key={status.value}
                          onClick={() => setSelectedStatus(status.value)}
                          className={`px-3 py-1.5 rounded-lg border text-sm flex items-center gap-2 transition-all ${
                            isSelected
                              ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                              : 'border-dungeon-700 bg-dungeon-900 text-dungeon-300 hover:border-dungeon-600'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-gold-400' : status.color}`} />
                          {status.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count and Sort */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-dungeon-400 text-sm">
            {loading ? (
              'Cargando reportes...'
            ) : (
              <>
                Mostrando {filteredTickets.length} de {tickets.length} reportes
                {hasActiveFilters && ' (filtrado)'}
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-dungeon-400 text-sm">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'votes')}
              className="px-3 py-1.5 bg-dungeon-800 border border-dungeon-700 rounded-lg text-dungeon-200 text-sm focus:outline-none focus:border-gold-500"
            >
              <option value="votes">Más votados</option>
              <option value="date">Más recientes</option>
            </select>
          </div>
        </div>

        {/* Tickets List */}
        {loading ? (
          <Card className="bg-dungeon-800 border-dungeon-700">
            <CardContent className="p-8">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto text-gold-500 mb-3" />
                <p className="text-dungeon-400">Cargando reportes...</p>
              </div>
            </CardContent>
          </Card>
        ) : filteredTickets.length === 0 ? (
          <Card className="bg-dungeon-800 border-dungeon-700">
            <CardContent className="p-8">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto text-dungeon-600 mb-3" />
                <p className="text-dungeon-400">
                  {hasActiveFilters
                    ? 'No se encontraron reportes con los filtros aplicados'
                    : 'Aún no hay reportes'}
                </p>
                {hasActiveFilters && (
                  <Button onClick={clearFilters} variant="secondary" className="mt-4">
                    Limpiar filtros
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => {
              const categoryInfo = CATEGORIES.find((c) => c.value === ticket.category);
              const CategoryIcon = categoryInfo?.icon || MessageSquare;
              const statusInfo = STATUS_LABELS[ticket.status];
              const StatusIcon = statusInfo.icon;
              const priorityInfo = PRIORITIES.find((p) => p.value === ticket.priority);

              return (
                <Card key={ticket.id} className="bg-dungeon-800 border-dungeon-700 hover:border-dungeon-600 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Vote Button */}
                      <div className="flex flex-col items-center gap-1 pt-1">
                        <button
                          onClick={() => handleVote(ticket.id)}
                          disabled={votingTicketId === ticket.id || !currentUser}
                          className={`p-2 rounded-lg border transition-all ${
                            ticket.user_has_voted
                              ? 'bg-gold-500/20 border-gold-500 text-gold-400'
                              : 'border-dungeon-700 text-dungeon-400 hover:border-gold-500 hover:text-gold-400'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                          title={!currentUser ? 'Inicia sesión para votar' : ticket.user_has_voted ? 'Quitar voto' : 'Votar'}
                        >
                          {votingTicketId === ticket.id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <ThumbsUp className="w-5 h-5" fill={ticket.user_has_voted ? 'currentColor' : 'none'} />
                          )}
                        </button>
                        <span className={`text-sm font-semibold ${ticket.vote_count && ticket.vote_count > 0 ? 'text-gold-400' : 'text-dungeon-500'}`}>
                          {ticket.vote_count || 0}
                        </span>
                      </div>

                      {/* Ticket Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2 flex-1">
                            <CategoryIcon className={`w-5 h-5 ${categoryInfo?.color} flex-shrink-0`} />
                            <h3 className="text-lg font-semibold text-dungeon-100">{ticket.title}</h3>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {priorityInfo && priorityInfo.value !== 'all' && (
                              <span className={`px-2 py-0.5 text-xs rounded-full text-white ${priorityInfo.color}`}>
                                {priorityInfo.label}
                              </span>
                            )}
                            <div className="flex items-center gap-1">
                              <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                              <span className={`text-sm ${statusInfo.color}`}>{statusInfo.label}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-dungeon-300 text-sm mb-3 whitespace-pre-line">{ticket.description}</p>
                        <div className="flex items-center justify-between text-xs text-dungeon-500">
                          <div className="flex items-center gap-3">
                            <span>
                              Reportado por{' '}
                              <span className="text-dungeon-300 font-medium">
                                {ticket.author_display_name || ticket.user_email.split('@')[0]}
                              </span>
                              {' '}el{' '}
                              {new Date(ticket.created_at).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            {ticket.author_karma !== undefined && ticket.author_karma > 0 && (
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-gold-500/10 border border-gold-500/30 rounded text-gold-400">
                                <Award className="w-3 h-3" />
                                <span className="font-semibold">{ticket.author_karma}</span>
                                <span className="text-dungeon-400">karma</span>
                              </span>
                            )}
                          </div>
                          {ticket.page_url && (
                            <a
                              href={ticket.page_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gold-400 hover:text-gold-300 underline"
                            >
                              Ver página
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
