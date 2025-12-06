'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@/lib/supabase/client';
import {
  Bug,
  Lightbulb,
  Languages,
  Database,
  Palette,
  Zap,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { TicketsHeader } from '@/components/admin/TicketsHeader';
import { TicketsStats } from '@/components/admin/TicketsStats';
import { TicketsFilters } from '@/components/admin/TicketsFilters';
import { TicketsList } from '@/components/admin/TicketsList';

// Lazy-load modal component (only shown when user opens detail)
const TicketDetailModal = dynamic(() => import('@/components/admin/TicketDetailModal').then(mod => ({ default: mod.TicketDetailModal })), {
  loading: () => <div className="fixed inset-0 bg-black/50 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gold-400" /></div>
});

type FeedbackCategory = 'bug' | 'feature' | 'translation' | 'data' | 'ui' | 'performance' | 'other';
type FeedbackPriority = 'low' | 'medium' | 'high' | 'critical';
type FeedbackStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'wont_fix' | 'pending';

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
  pending: { label: 'Pendiente', icon: Clock, color: 'text-yellow-300' },
  open: { label: 'Abierto', icon: Clock, color: 'text-blue-400' },
  in_progress: { label: 'En Progreso', icon: Loader2, color: 'text-yellow-400' },
  resolved: { label: 'Resuelto', icon: CheckCircle, color: 'text-green-400' },
  closed: { label: 'Cerrado', icon: CheckCircle, color: 'text-gray-400' },
  wont_fix: { label: 'No se Arreglará', icon: AlertTriangle, color: 'text-red-400' },
};

const STATUS_FILTERS: Array<{ value: FeedbackStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Pendiente' },
  { value: 'open', label: 'Abierto' },
  { value: 'in_progress', label: 'En Progreso' },
  { value: 'resolved', label: 'Resuelto' },
  { value: 'closed', label: 'Cerrado' },
  { value: 'wont_fix', label: 'No se Arreglará' },
];

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
      // Preferir vista con autor (evita RLS que filtra por usuario)
      const { data: viewData, error: viewError } = await supabase
        .from('v_feedback_tickets_with_author')
        .select('id, title, description, category, priority, status, page_url, browser_info, user_email, created_at, resolution_notes')
        .order('created_at', { ascending: false });

      if (!viewError && viewData) {
        setTickets(viewData as Ticket[]);
        return;
      }

      // Fallback a tabla base
      const { data, error } = await supabase
        .from('feedback_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTickets((data as Ticket[]) || []);
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
    total: filteredTickets.length,
    pending: filteredTickets.filter(t => t.status === 'pending').length,
    open: filteredTickets.filter(t => t.status === 'open').length,
    in_progress: filteredTickets.filter(t => t.status === 'in_progress').length,
    resolved: filteredTickets.filter(t => t.status === 'resolved').length,
    critical: filteredTickets.filter(t => t.priority === 'critical').length,
  };

  // Separar tickets activos y completados
  const activeTickets = filteredTickets.filter(t =>
    t.status !== 'resolved' && t.status !== 'closed' && t.status !== 'wont_fix'
  );
  const completedTickets = filteredTickets.filter(t =>
    t.status === 'resolved' || t.status === 'closed' || t.status === 'wont_fix'
  );


  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <TicketsHeader />
        <TicketsStats stats={stats} />
        <TicketsFilters
          filterCategory={filterCategory}
          filterStatus={filterStatus}
          filterPriority={filterPriority}
          onCategoryChange={setFilterCategory}
          onStatusChange={setFilterStatus}
          onPriorityChange={setFilterPriority}
          categories={CATEGORIES}
          statusFilters={STATUS_FILTERS}
          priorities={PRIORITIES}
        />
        <TicketsList
          loading={loading}
          filteredTickets={filteredTickets}
          showCompleted={showCompleted}
          onShowCompletedToggle={setShowCompleted}
          onTicketSelect={setSelectedTicket}
          categories={CATEGORIES}
          statusOptions={STATUS_OPTIONS}
          priorities={PRIORITIES}
        />
        <TicketDetailModal
          ticket={selectedTicket}
          resolutionNotes={resolutionNotes}
          updating={updating}
          onClose={() => setSelectedTicket(null)}
          onResolutionNotesChange={setResolutionNotes}
          onStatusChange={updateTicketStatus}
          priorities={PRIORITIES}
          categories={CATEGORIES}
        />
      </div>
    </div>
  );
}
