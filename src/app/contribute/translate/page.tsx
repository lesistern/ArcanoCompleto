'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import TranslationModal from '@/components/translations/TranslationModal';
import {
  Languages,
  Filter,
  Search,
  ThumbsUp,
  ThumbsDown,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';
import type {
  TranslationEdit,
  EntityType,
  TranslationStatus,
  TranslationFilters,
  UserProfile
} from '@/types/translations';

const ENTITY_TYPES = [
  { value: 'all', label: 'Todos los tipos' },
  { value: 'spell', label: 'Conjuros' },
  { value: 'class', label: 'Clases' },
  { value: 'race', label: 'Razas' },
  { value: 'feat', label: 'Dotes' },
  { value: 'skill', label: 'Habilidades' },
  { value: 'weapon', label: 'Armas' },
  { value: 'armor', label: 'Armaduras' },
  { value: 'monster', label: 'Monstruos' },
  { value: 'magic_item', label: 'Objetos mágicos' },
] as const;

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos los estados', icon: Filter },
  { value: 'pending', label: 'Pendiente', icon: Clock, color: 'text-yellow-400' },
  { value: 'approved', label: 'Aprobado', icon: CheckCircle, color: 'text-green-400' },
  { value: 'rejected', label: 'Rechazado', icon: XCircle, color: 'text-red-400' },
] as const;

const SORT_OPTIONS = [
  { value: 'created_at', label: 'Más recientes' },
  { value: 'vote_count', label: 'Más votados' },
  { value: 'confidence_score', label: 'Mayor confianza' },
] as const;

export default function TranslatePage() {
  const [filters, setFilters] = useState<TranslationFilters>({
    entity_type: 'all',
    status: 'pending',
    sort_by: 'created_at',
    sort_order: 'desc',
    search: '',
  });

  const [edits, setEdits] = useState<TranslationEdit[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState({
    total_pending: 0,
    total_approved: 0,
    total_rejected: 0,
    user_submitted: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [reviewingEdit, setReviewingEdit] = useState<TranslationEdit | null>(null);

  const supabase = createClient();

  useEffect(() => {
    loadUserProfile();
    loadEdits();
    loadStats();
  }, [filters]);

  async function loadUserProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*, tier:user_tiers(*)')
        .eq('id', user.id)
        .single();

      if (error) {
        // Si la tabla user_tiers no existe, solo mostrar warning
        if (error.message?.includes('relation') || error.message?.includes('does not exist')) {
          console.warn('Tabla user_tiers no configurada. Algunas funciones pueden no estar disponibles.');
          return;
        }
        throw error;
      }

      if (data) setUserProfile(data as UserProfile);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  async function loadEdits() {
    setLoading(true);
    try {
      let query = supabase
        .from('translation_edits')
        .select(`
          *,
          submitter:profiles!translation_edits_submitted_by_fkey(id, display_name, tier_code),
          reviewer:profiles!translation_edits_reviewed_by_fkey(id, display_name)
        `)
        .order(filters.sort_by || 'created_at', { ascending: filters.sort_order === 'asc' });

      // Aplicar filtros
      if (filters.entity_type && filters.entity_type !== 'all') {
        query = query.eq('entity_type', filters.entity_type);
      }

      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters.search && filters.search.length >= 3) {
        query = query.or(`new_value.ilike.%${filters.search}%,old_value.ilike.%${filters.search}%`);
      }

      const { data, error } = await query.limit(50);

      if (error) {
        // Si la tabla no existe, solo log silencioso y establecer edits vacío
        if (error.message?.includes('relation') || error.message?.includes('does not exist')) {
          console.warn('Sistema de traducciones no configurado todavía. Ejecuta el SQL en Supabase.');
          setEdits([]);
          return;
        }
        throw error;
      }

      // Cargar conteo de votos para cada edit
      if (data && data.length > 0) {
        const editIds = data.map(e => e.id);
        const { data: votesData } = await supabase
          .from('translation_votes')
          .select('edit_id, vote')
          .in('edit_id', editIds);

        // Cargar voto del usuario actual
        const { data: { user } } = await supabase.auth.getUser();
        let userVotes: Record<string, number> = {};
        if (user) {
          const { data: userVotesData } = await supabase
            .from('translation_votes')
            .select('edit_id, vote')
            .in('edit_id', editIds)
            .eq('user_id', user.id);

          if (userVotesData) {
            userVotes = Object.fromEntries(userVotesData.map(v => [v.edit_id, v.vote]));
          }
        }

        // Calcular conteo de votos
        const voteCounts: Record<string, number> = {};
        if (votesData) {
          votesData.forEach(v => {
            voteCounts[v.edit_id] = (voteCounts[v.edit_id] || 0) + v.vote;
          });
        }

        const editsWithVotes = data.map(edit => ({
          ...edit,
          vote_count: voteCounts[edit.id] || 0,
          user_vote: userVotes[edit.id] || 0,
        }));

        setEdits(editsWithVotes as TranslationEdit[]);
      } else {
        setEdits([]);
      }
    } catch (error) {
      console.error('Error loading edits:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadStats() {
    try {
      const { data: pending, error: pendingError } = await supabase
        .from('translation_edits')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Si la tabla no existe, solo establecer stats en 0
      if (pendingError && (pendingError.message?.includes('relation') || pendingError.message?.includes('does not exist'))) {
        setStats({ total_pending: 0, total_approved: 0, total_rejected: 0, user_submitted: 0 });
        return;
      }

      const { data: approved } = await supabase
        .from('translation_edits')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'approved');

      const { data: rejected } = await supabase
        .from('translation_edits')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'rejected');

      const { data: { user } } = await supabase.auth.getUser();
      let userSubmitted = 0;
      if (user) {
        const { data: userEdits } = await supabase
          .from('translation_edits')
          .select('id', { count: 'exact', head: true })
          .eq('submitted_by', user.id);
        userSubmitted = userEdits?.count || 0;
      }

      setStats({
        total_pending: pending?.count || 0,
        total_approved: approved?.count || 0,
        total_rejected: rejected?.count || 0,
        user_submitted: userSubmitted,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      setStats({ total_pending: 0, total_approved: 0, total_rejected: 0, user_submitted: 0 });
    }
  }

  async function handleVote(editId: string, vote: 1 | -1) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Debes iniciar sesión para votar');
      return;
    }

    try {
      const currentVote = edits.find(e => e.id === editId)?.user_vote;

      if (currentVote === vote) {
        // Remove vote
        await supabase
          .from('translation_votes')
          .delete()
          .eq('edit_id', editId)
          .eq('user_id', user.id);
      } else {
        // Upsert vote
        await supabase
          .from('translation_votes')
          .upsert({
            edit_id: editId,
            user_id: user.id,
            vote,
          }, {
            onConflict: 'edit_id,user_id'
          });
      }

      // Reload edits
      await loadEdits();
    } catch (error) {
      console.error('Error voting:', error);
    }
  }

  async function handleApprove(editId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Debes iniciar sesión');
      return;
    }

    if (!canApprove()) {
      alert('No tienes permisos para aprobar traducciones');
      return;
    }

    const comment = prompt('Comentario opcional sobre la aprobación:');

    try {
      const { error } = await supabase
        .from('translation_edits')
        .update({
          status: 'approved',
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
          review_comment: comment || null,
        })
        .eq('id', editId);

      if (error) throw error;

      alert('Traducción aprobada exitosamente');
      await loadEdits();
      await loadStats();
    } catch (error) {
      console.error('Error approving:', error);
      alert('Error al aprobar la traducción');
    }
  }

  async function handleReject(editId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Debes iniciar sesión');
      return;
    }

    if (!canReview()) {
      alert('No tienes permisos para rechazar traducciones');
      return;
    }

    const comment = prompt('Razón del rechazo (requerido):');
    if (!comment) return;

    try {
      const { error } = await supabase
        .from('translation_edits')
        .update({
          status: 'rejected',
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
          review_comment: comment,
        })
        .eq('id', editId);

      if (error) throw error;

      alert('Traducción rechazada');
      await loadEdits();
      await loadStats();
    } catch (error) {
      console.error('Error rejecting:', error);
      alert('Error al rechazar la traducción');
    }
  }

  function handleEdit(editId: string) {
    setEditingId(editId);
    setIsModalOpen(true);
  }

  function handleNewTranslation() {
    setEditingId(undefined);
    setIsModalOpen(true);
  }

  function canTranslate() {
    return userProfile?.tier?.can_translate || false;
  }

  function canReview() {
    return userProfile?.tier?.can_review || false;
  }

  function canApprove() {
    return userProfile?.tier?.can_approve || false;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Languages className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sistema de traducciones colaborativo
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Ayuda a traducir y mejorar el contenido de D&D 3.5 al español
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.total_pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Aprobadas</p>
                  <p className="text-2xl font-bold text-green-400">{stats.total_approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Rechazadas</p>
                  <p className="text-2xl font-bold text-red-400">{stats.total_rejected}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Tus Contribuciones</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.user_submitted}</p>
                </div>
                <Award className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Tier Info */}
        {userProfile && (
          <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/50 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Tu nivel de colaborador</p>
                  <p className="text-2xl font-bold text-blue-400">{userProfile.tier?.name}</p>
                  <p className="text-gray-400 mt-1">{userProfile.tier?.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Reputación</p>
                  <p className="text-2xl font-bold text-gold-400">{userProfile.reputation_points}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-green-400">✓ {userProfile.translations_approved} aprobadas</span>
                    <span className="text-gray-400">📝 {userProfile.translations_submitted} enviadas</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {userProfile.tier?.can_translate && (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    ✓ Puede traducir
                  </span>
                )}
                {userProfile.tier?.can_review && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                    ✓ Puede revisar
                  </span>
                )}
                {userProfile.tier?.can_approve && (
                  <span className="px-3 py-1 bg-gold-500/20 text-gold-400 rounded-full text-sm">
                    ✓ Puede aprobar
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Entity Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de contenido
                </label>
                <select
                  value={filters.entity_type || 'all'}
                  onChange={(e) => setFilters({ ...filters, entity_type: e.target.value as EntityType | 'all' })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {ENTITY_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Estado
                </label>
                <select
                  value={filters.status || 'all'}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value as TranslationStatus | 'all' })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {STATUS_OPTIONS.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Ordenar por
                </label>
                <select
                  value={filters.sort_by || 'created_at'}
                  onChange={(e) => setFilters({ ...filters, sort_by: e.target.value as any })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar traducciones..."
                    value={filters.search || ''}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Translation Edits List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-gray-400 mt-4">Cargando traducciones...</p>
          </div>
        ) : edits.length === 0 ? (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-12 text-center">
              <Languages className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No se encontraron traducciones con los filtros aplicados</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {edits.map((edit) => (
              <Card key={edit.id} className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                          {edit.entity_type}
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                          {edit.field_name}
                        </span>
                        {edit.status === 'pending' && (
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Pendiente
                          </span>
                        )}
                        {edit.status === 'approved' && (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Aprobado
                          </span>
                        )}
                        {edit.status === 'rejected' && (
                          <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            Rechazado
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-3">
                        Por <span className="text-blue-400">{edit.submitter?.display_name || 'Anónimo'}</span> • {new Date(edit.submitted_at).toLocaleDateString('es-ES')}
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Original</p>
                          <div className="bg-red-900/20 border border-red-500/30 rounded p-3">
                            <p className="text-gray-300">{edit.old_value || '(vacío)'}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Traducción propuesta</p>
                          <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
                            <p className="text-gray-300">{edit.new_value}</p>
                          </div>
                        </div>
                      </div>

                      {edit.translation_method && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                          <span>Método: {edit.translation_method}</span>
                          {edit.confidence_score && (
                            <span>• Confianza: {(edit.confidence_score * 100).toFixed(0)}%</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Voting Section */}
                    <div className="flex flex-col items-center gap-2 ml-6">
                      <button
                        onClick={() => handleVote(edit.id, 1)}
                        className={`p-2 rounded-lg transition-all ${
                          edit.user_vote === 1
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-gray-400 hover:bg-green-500/20 hover:text-green-400'
                        }`}
                        disabled={!userProfile}
                      >
                        <ThumbsUp className="w-5 h-5" />
                      </button>
                      <span className={`text-lg font-bold ${
                        (edit.vote_count || 0) > 0 ? 'text-green-400' :
                        (edit.vote_count || 0) < 0 ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {edit.vote_count || 0}
                      </span>
                      <button
                        onClick={() => handleVote(edit.id, -1)}
                        className={`p-2 rounded-lg transition-all ${
                          edit.user_vote === -1
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-700 text-gray-400 hover:bg-red-500/20 hover:text-red-400'
                        }`}
                        disabled={!userProfile}
                      >
                        <ThumbsDown className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
                    {canReview() && edit.status === 'pending' && (
                      <>
                        {canApprove() && (
                          <Button
                            variant="success"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => handleApprove(edit.id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Aprobar
                          </Button>
                        )}
                        <Button
                          variant="danger"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => handleReject(edit.id)}
                        >
                          <XCircle className="w-4 h-4" />
                          Rechazar
                        </Button>
                      </>
                    )}
                    {canTranslate() && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => handleEdit(edit.id)}
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </Button>
                    )}
                  </div>

                  {edit.review_comment && (
                    <div className="mt-4 p-3 bg-gray-700/50 rounded border border-gray-600">
                      <p className="text-sm text-gray-400 mb-1">
                        Comentario del revisor ({edit.reviewer?.display_name}):
                      </p>
                      <p className="text-gray-300">{edit.review_comment}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Floating Action Button */}
        {canTranslate() && (
          <div className="fixed bottom-8 right-8">
            <Button
              variant="primary"
              size="lg"
              className="rounded-full shadow-lg shadow-blue-500/50 flex items-center gap-2"
              onClick={handleNewTranslation}
            >
              <Languages className="w-5 h-5" />
              Nueva traducción
            </Button>
          </div>
        )}
      </div>

      {/* Translation Modal */}
      <TranslationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(undefined);
        }}
        onSuccess={() => {
          loadEdits();
          loadStats();
        }}
        editId={editingId}
      />
    </div>
  );
}
