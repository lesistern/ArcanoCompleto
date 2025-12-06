'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { pageContainerPadding } from '@/lib/utils/responsive-spacing';
import { FeedbackForm } from '@/components/feedback/FeedbackForm';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Loader2,
  Eye,
} from 'lucide-react';
import type { FeedbackStatus } from '@/lib/schemas/feedback';

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: FeedbackStatus;
  page_url: string | null;
  created_at: string;
  user_email?: string;
  author_display_name?: string | null;
  author_username?: string;
}

const STATUS_LABELS: Record<FeedbackStatus, { label: string; icon: typeof Clock; color: string }> = {
  open: { label: 'Abierto', icon: Clock, color: 'text-blue-400' },
  in_progress: { label: 'En Progreso', icon: Loader2, color: 'text-yellow-400' },
  resolved: { label: 'Resuelto', icon: CheckCircle, color: 'text-green-400' },
  closed: { label: 'Cerrado', icon: CheckCircle, color: 'text-gray-400' },
  wont_fix: { label: 'No se Arreglará', icon: AlertTriangle, color: 'text-red-400' },
};

export default function FeedbackPage() {
  const [myTickets, setMyTickets] = useState<Ticket[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [similarTickets, setSimilarTickets] = useState<Ticket[]>([]);
  const [checkingSimilar, setCheckingSimilar] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const supabase = createClient();

  const loadMyTickets = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoadingTickets(false);
        return;
      }

      const { data, error } = await supabase
        .from('v_feedback_tickets_with_author')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMyTickets(data || []);
    } catch (err) {
      console.error('Error loading tickets:', err);
    } finally {
      setLoadingTickets(false);
    }
  }, [supabase]);

  const checkSimilarTickets = useCallback(async (title: string) => {
    if (title.length < 5) {
      setSimilarTickets([]);
      return;
    }

    setCheckingSimilar(true);
    try {
      const { data, error } = await supabase
        .from('feedback_tickets')
        .select('*')
        .ilike('title', `%${title}%`)
        .neq('status', 'closed')
        .limit(3);

      if (error) throw error;
      const filtered = (data || []).filter((ticket) => ticket.title !== title);
      setSimilarTickets(filtered);
    } catch (err) {
      console.error('Error checking similar tickets:', err);
    } finally {
      setCheckingSimilar(false);
    }
  }, [supabase]);

  useEffect(() => {
    loadMyTickets();
  }, [loadMyTickets]);

  return (
    <div className={`min-h-screen bg-dungeon-950 ${pageContainerPadding}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gold-500 mb-2">
            Reportar Problema o Sugerencia
          </h1>
          <p className="text-dungeon-300">
            Tu feedback nos ayuda a mejorar Compendio Arcano. Gracias por participar en la beta! 🚀
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <Card className="mb-6 bg-green-900/20 border-green-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-green-400 font-semibold">
                    ¡Feedback enviado exitosamente!
                  </p>
                  <p className="text-green-300 text-sm mb-2">
                    Revisaremos tu reporte lo antes posible.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById('mis-reportes')?.scrollIntoView({ behavior: 'smooth' });
                      setShowSuccess(false);
                    }}
                    className="text-green-400 hover:text-green-300 text-sm font-medium underline transition-colors"
                  >
                    📋 Ver en &quot;Mis Reportes&quot; ↓
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Similar Tickets Warning */}
        {checkingSimilar && (
          <Card className="mb-6 bg-yellow-900/20 border-yellow-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
                <p className="text-yellow-300 text-sm">Buscando reportes similares...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {!checkingSimilar && similarTickets.length > 0 && (
          <Card className="mb-6 bg-yellow-900/20 border-yellow-500/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-400 font-semibold text-sm">
                    ⚠️ Encontramos reportes similares
                  </p>
                  <p className="text-yellow-300 text-xs mt-1">
                    Verifica si alguno ya describe tu problema:
                  </p>
                </div>
              </div>
              <div className="space-y-2 ml-7">
                {similarTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-2 bg-dungeon-900/50 border border-dungeon-700 rounded text-sm"
                  >
                    <p className="text-dungeon-200 font-medium">{ticket.title}</p>
                    <p className="text-dungeon-400 text-xs line-clamp-2 mt-1">
                      {ticket.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form Card */}
        <Card className="card mb-12">
          <CardHeader>
            <CardTitle className="text-gold-400">Nuevo Reporte</CardTitle>
            <CardDescription className="text-dungeon-300">
              Completa el formulario con los detalles del problema o sugerencia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FeedbackForm
              onSubmitSuccess={() => {
                setShowSuccess(true);
                loadMyTickets();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onCheckSimilar={checkSimilarTickets}
            />
          </CardContent>
        </Card>

        {/* My Tickets Section */}
        <div id="mis-reportes" className="scroll-mt-20">
          <h2 className="text-2xl font-bold text-gold-500 mb-4">Mis Reportes</h2>

          {loadingTickets ? (
            <Card>
              <CardContent className="p-8 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gold-400" />
              </CardContent>
            </Card>
          ) : myTickets.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-dungeon-400">Aún no has creado ningún reporte</p>
                <p className="text-dungeon-500 text-sm mt-2">
                  Los reportes que crees aparecerán aquí
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {myTickets.map((ticket) => {
                const statusInfo = STATUS_LABELS[ticket.status];
                const StatusIcon = statusInfo.icon;

                return (
                  <Card key={ticket.id} className="hover:border-dungeon-600 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-dungeon-100 mb-1">{ticket.title}</h3>
                          <p className="text-sm text-dungeon-400 line-clamp-2 mb-2">
                            {ticket.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="px-2 py-1 rounded bg-dungeon-800 text-dungeon-300">
                              {ticket.category}
                            </span>
                            <span className="px-2 py-1 rounded bg-dungeon-800 text-dungeon-300">
                              Prioridad: {ticket.priority}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm flex-shrink-0">
                          <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                          <span className={statusInfo.color}>{statusInfo.label}</span>
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
    </div>
  );
}
