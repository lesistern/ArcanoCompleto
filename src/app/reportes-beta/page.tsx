'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Filter, X, Loader2, MessageSquare } from 'lucide-react';
import { FilterButton } from '@/components/feedback/FilterButton';
import { TicketCard } from '@/components/feedback/TicketCard';
import {
  FEEDBACK_CATEGORIES,
  FEEDBACK_PRIORITIES,
  FEEDBACK_STATUSES,
  type FeedbackStatus,
} from '@/lib/data/feedback-config';

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: FeedbackStatus;
  page_url: string | null;
  created_at: string;
  user_email: string;
  vote_count?: number;
  user_has_voted?: boolean;
  author_display_name?: string | null;
  author_username?: string;
  author_karma?: number;
  author_tier?: string;
}

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
          <h1 className="text-4xl font-bold text-gold-500 mb-2 font-heading">Reportes de beta testers</h1>
          <p className="text-dungeon-300 font-heading">
            Todos los reportes, problemas y sugerencias reportados por la comunidad de beta testers
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="card mb-6">
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
                  className="w-full pl-10 pr-4 py-2 input"
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
                  <label className="block text-sm font-medium text-dungeon-200 mb-2 font-heading">Categoría</label>
                  <FilterButton
                    items={FEEDBACK_CATEGORIES}
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
                    getIcon={(cat) => cat.icon}
                    getColor={(cat) => cat.color}
                  />
                </div>

                {/* Priority Filter */}
                <div>
                  <label className="block text-sm font-medium text-dungeon-200 mb-2 font-heading">Prioridad</label>
                  <FilterButton
                    items={FEEDBACK_PRIORITIES}
                    selected={selectedPriority}
                    onSelect={setSelectedPriority}
                    renderItem={(prio, isSelected) => (
                      <>
                        {prio.value !== 'all' && <div className={`w-2 h-2 rounded-full ${prio.color}`} />}
                        {prio.label}
                      </>
                    )}
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-dungeon-200 mb-2 font-heading">Estado</label>
                  <FilterButton
                    items={FEEDBACK_STATUSES}
                    selected={selectedStatus}
                    onSelect={setSelectedStatus}
                    getIcon={(status) => status.icon}
                    getColor={(status) => status.color}
                  />
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
          <Card className="card">
            <CardContent className="p-8">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto text-gold-500 mb-3" />
                <p className="text-dungeon-400">Cargando reportes...</p>
              </div>
            </CardContent>
          </Card>
        ) : filteredTickets.length === 0 ? (
          <Card className="card">
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
            {filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                {...ticket}
                isLoading={votingTicketId === ticket.id}
                isLoggedIn={!!currentUser}
                onVote={handleVote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
