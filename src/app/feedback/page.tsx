'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
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
  Send,
  Loader2
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
}

const CATEGORIES = [
  { value: 'bug', label: 'Bug / Error', icon: Bug, color: 'text-red-400' },
  { value: 'feature', label: 'Nueva Funcionalidad', icon: Lightbulb, color: 'text-yellow-400' },
  { value: 'translation', label: 'Error de Traducción', icon: Languages, color: 'text-blue-400' },
  { value: 'data', label: 'Error en Datos', icon: Database, color: 'text-purple-400' },
  { value: 'ui', label: 'Problema de UI/Diseño', icon: Palette, color: 'text-pink-400' },
  { value: 'performance', label: 'Rendimiento', icon: Zap, color: 'text-orange-400' },
  { value: 'other', label: 'Otro', icon: MessageSquare, color: 'text-gray-400' },
] as const;

const PRIORITIES = [
  { value: 'low', label: 'Baja', color: 'bg-gray-500' },
  { value: 'medium', label: 'Media', color: 'bg-blue-500' },
  { value: 'high', label: 'Alta', color: 'bg-orange-500' },
  { value: 'critical', label: 'Crítica', color: 'bg-red-500' },
] as const;

const STATUS_LABELS = {
  open: { label: 'Abierto', icon: Clock, color: 'text-blue-400' },
  in_progress: { label: 'En Progreso', icon: Loader2, color: 'text-yellow-400' },
  resolved: { label: 'Resuelto', icon: CheckCircle, color: 'text-green-400' },
  closed: { label: 'Cerrado', icon: CheckCircle, color: 'text-gray-400' },
  wont_fix: { label: 'No se Arreglará', icon: AlertTriangle, color: 'text-red-400' },
};

export default function FeedbackPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<FeedbackCategory>('bug');
  const [priority, setPriority] = useState<FeedbackPriority>('medium');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [myTickets, setMyTickets] = useState<Ticket[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [similarTickets, setSimilarTickets] = useState<Ticket[]>([]);
  const [checkingSimilar, setCheckingSimilar] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    loadMyTickets();
  }, []);

  // Buscar tickets similares mientras escribe
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title.length >= 5) {
        checkSimilarTickets();
      } else {
        setSimilarTickets([]);
      }
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timer);
  }, [title]);

  async function loadMyTickets() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('feedback_tickets')
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
  }

  async function checkSimilarTickets() {
    setCheckingSimilar(true);
    try {
      // Buscar tickets con títulos similares usando ILIKE
      const { data, error } = await supabase
        .from('feedback_tickets')
        .select('*')
        .ilike('title', `%${title}%`)
        .neq('status', 'closed') // No mostrar tickets cerrados
        .limit(3);

      if (error) throw error;

      // Filtrar el ticket actual si estamos editando
      const filtered = (data || []).filter((ticket) => ticket.title !== title);

      setSimilarTickets(filtered);
    } catch (err) {
      console.error('Error checking similar tickets:', err);
    } finally {
      setCheckingSimilar(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Debes estar autenticado');
      }

      const { error: insertError } = await supabase
        .from('feedback_tickets')
        .insert({
          user_id: user.id,
          user_email: user.email,
          title,
          description,
          category,
          priority,
          page_url: window.location.href,
          browser_info: navigator.userAgent,
        });

      if (insertError) throw insertError;

      setSuccess(true);
      setTitle('');
      setDescription('');
      setCategory('bug');
      setPriority('medium');

      // Recargar tickets
      await loadMyTickets();

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err: any) {
      console.error('Error submitting feedback:', err);
      setError(err.message || 'Error al enviar el feedback');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gold-500 mb-2">
            Reportar Problema o Sugerencia
          </h1>
          <p className="text-dungeon-300">
            Tu feedback nos ayuda a mejorar Arcano Completo. Gracias por participar en la beta! 🚀
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <Card className="mb-6 bg-green-900/20 border-green-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-green-400 font-semibold">
                    ¡Feedback enviado exitosamente!
                  </p>
                  <p className="text-green-300 text-sm">
                    Revisaremos tu reporte lo antes posible.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Message */}
        {error && (
          <Card className="mb-6 bg-red-900/20 border-red-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <div>
                  <p className="text-red-400 font-semibold">Error</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        <Card className="mb-8 bg-dungeon-800 border-dungeon-700">
          <CardHeader>
            <CardTitle className="text-gold-400">Nuevo Reporte</CardTitle>
            <CardDescription className="text-dungeon-300">
              Completa el formulario con los detalles del problema o sugerencia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-dungeon-200 mb-2">
                  Título <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={200}
                  className="w-full px-4 py-2 bg-dungeon-900 border border-dungeon-700 rounded-lg text-dungeon-100 focus:outline-none focus:border-gold-500"
                  placeholder="Ej: Error al cargar la página de Clases"
                />

                {/* Similar Tickets Warning */}
                {checkingSimilar && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-dungeon-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Buscando reportes similares...
                  </div>
                )}

                {!checkingSimilar && similarTickets.length > 0 && (
                  <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-yellow-400 font-semibold text-sm">
                          ⚠️ Encontramos reportes similares
                        </p>
                        <p className="text-yellow-300 text-xs mt-1">
                          Antes de crear un nuevo reporte, verifica si alguno de estos ya describe tu problema:
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 mt-3">
                      {similarTickets.map((ticket) => {
                        const categoryInfo = CATEGORIES.find(c => c.value === ticket.category);
                        const CategoryIcon = categoryInfo?.icon || MessageSquare;
                        const statusInfo = STATUS_LABELS[ticket.status];

                        return (
                          <div
                            key={ticket.id}
                            className="p-2 bg-dungeon-900/50 border border-dungeon-700 rounded text-sm"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <CategoryIcon className={`w-4 h-4 ${categoryInfo?.color}`} />
                              <span className="text-dungeon-200 font-medium">{ticket.title}</span>
                              <span className={`text-xs ${statusInfo.color}`}>
                                ({statusInfo.label})
                              </span>
                            </div>
                            <p className="text-dungeon-400 text-xs line-clamp-2 ml-6">
                              {ticket.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-yellow-200 text-xs mt-2 italic">
                      💡 Si ninguno de estos reportes describe tu problema, continúa creando uno nuevo.
                    </p>
                  </div>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-dungeon-200 mb-2">
                  Categoría <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = category === cat.value;
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setCategory(cat.value as FeedbackCategory)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-gold-500 bg-gold-500/10'
                            : 'border-dungeon-700 bg-dungeon-900 hover:border-dungeon-600'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-1 ${cat.color}`} />
                        <p className="text-xs text-dungeon-200 text-center">{cat.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-dungeon-200 mb-2">
                  Prioridad <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {PRIORITIES.map((prio) => {
                    const isSelected = priority === prio.value;
                    return (
                      <button
                        key={prio.value}
                        type="button"
                        onClick={() => setPriority(prio.value as FeedbackPriority)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-gold-500 bg-gold-500/10'
                            : 'border-dungeon-700 bg-dungeon-900 hover:border-dungeon-600'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${prio.color}`} />
                        <p className="text-sm text-dungeon-200 text-center">{prio.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-dungeon-200 mb-2">
                  Descripción <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={6}
                  maxLength={2000}
                  className="w-full px-4 py-2 bg-dungeon-900 border border-dungeon-700 rounded-lg text-dungeon-100 focus:outline-none focus:border-gold-500 resize-none"
                  placeholder="Describe el problema o sugerencia con el mayor detalle posible. Incluye pasos para reproducir si es un bug."
                />
                <p className="text-xs text-dungeon-500 mt-1">
                  {description.length}/2000 caracteres
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !title || !description}
                className="w-full bg-gold-600 hover:bg-gold-700 text-dungeon-950 font-bold py-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Reporte
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* My Tickets */}
        <Card className="bg-dungeon-800 border-dungeon-700">
          <CardHeader>
            <CardTitle className="text-gold-400">Mis Reportes ({myTickets.length})</CardTitle>
            <CardDescription className="text-dungeon-300">
              Historial de problemas y sugerencias reportadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingTickets ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-gold-500" />
                <p className="text-dungeon-400 mt-2">Cargando tickets...</p>
              </div>
            ) : myTickets.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 mx-auto text-dungeon-600 mb-3" />
                <p className="text-dungeon-400">Aún no has reportado ningún problema</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myTickets.map((ticket) => {
                  const categoryInfo = CATEGORIES.find(c => c.value === ticket.category);
                  const CategoryIcon = categoryInfo?.icon || MessageSquare;
                  const statusInfo = STATUS_LABELS[ticket.status];
                  const StatusIcon = statusInfo.icon;
                  const priorityInfo = PRIORITIES.find(p => p.value === ticket.priority);

                  return (
                    <div
                      key={ticket.id}
                      className="p-4 bg-dungeon-900 border border-dungeon-700 rounded-lg hover:border-dungeon-600 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CategoryIcon className={`w-5 h-5 ${categoryInfo?.color}`} />
                          <h3 className="text-lg font-semibold text-dungeon-100">
                            {ticket.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {priorityInfo && (
                            <span className={`px-2 py-0.5 text-xs rounded-full text-white ${priorityInfo.color}`}>
                              {priorityInfo.label}
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                            <span className={`text-sm ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-dungeon-300 text-sm mb-2 line-clamp-2">
                        {ticket.description}
                      </p>
                      <p className="text-xs text-dungeon-500">
                        Reportado el {new Date(ticket.created_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
