'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import {
  Award,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trophy,
  Star,
  Calendar,
  Target,
  Filter,
} from 'lucide-react';

interface ContributionStats {
  total_submissions: number;
  approved: number;
  rejected: number;
  pending: number;
  approval_rate: number;
  recent_edits: any[];
}

type TranslationFilterStatus = 'all' | 'approved' | 'pending' | 'rejected';

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, tier, loading, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<ContributionStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [translationFilter, setTranslationFilter] = useState<TranslationFilterStatus>('all');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/');
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (user && profile) {
      loadContributionStats();
    }
  }, [user, profile]);

  const loadContributionStats = async () => {
    if (!user) return;

    const supabase = createClient();

    try {
      // Obtener estadísticas de traducciones
      const { data: edits, error } = await supabase
        .from('translation_edits')
        .select('*')
        .eq('submitted_by', user.id)
        .order('submitted_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const approved = edits?.filter(e => e.status === 'approved').length || 0;
      const rejected = edits?.filter(e => e.status === 'rejected').length || 0;
      const pending = edits?.filter(e => e.status === 'pending').length || 0;
      const total = edits?.length || 0;

      setStats({
        total_submissions: total,
        approved,
        rejected,
        pending,
        approval_rate: total > 0 ? (approved / total) * 100 : 0,
        recent_edits: edits || [],
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const getTierColor = (tierCode: string) => {
    const colors: Record<string, string> = {
      guest: 'from-dungeon-400 to-dungeon-600',
      user: 'from-blue-500 to-blue-700',
      contributor: 'from-green-500 to-green-700',
      translator: 'from-purple-500 to-purple-700',
      reviewer: 'from-orange-500 to-orange-700',
      admin: 'from-crimson-500 to-crimson-700',
    };
    return colors[tierCode] || 'from-blue-500 to-blue-700';
  };

  const getNextTier = () => {
    const tiers = [
      { code: 'user', name: 'Usuario', requiredPoints: 0 },
      { code: 'contributor', name: 'Colaborador', requiredPoints: 10 },
      { code: 'translator', name: 'Traductor', requiredPoints: 50 },
      { code: 'reviewer', name: 'Revisor', requiredPoints: 200 },
    ];

    const currentIndex = tiers.findIndex(t => t.code === tier?.code);
    if (currentIndex === -1 || currentIndex === tiers.length - 1) return null;

    return tiers[currentIndex + 1];
  };

  const calculateProgress = () => {
    const nextTier = getNextTier();
    if (!nextTier || !profile) return 100;

    const currentPoints = profile.reputation_points;
    const requiredPoints = nextTier.requiredPoints;

    return Math.min((currentPoints / requiredPoints) * 100, 100);
  };

  if (loading || loadingStats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto"></div>
          <p className="mt-4 text-dungeon-300">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile || !tier) {
    return null;
  }

  const nextTier = getNextTier();
  const progress = calculateProgress();

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Header con Avatar y Info Básica */}
        <div className="card overflow-hidden">
          <div className={`h-32 bg-gradient-to-r ${getTierColor(tier.code)}`}></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-12">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-dungeon-800 flex items-center justify-center text-dungeon-100 font-bold text-5xl border-4 border-dungeon-900 shadow-xl">
                {profile.display_name?.[0]?.toUpperCase() || 'U'}
              </div>

              {/* Info */}
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
                <h1 className="text-3xl font-bold text-gold-400 font-heading">{profile.display_name}</h1>
                <p className="text-dungeon-400">{user.email}</p>

                <div className="mt-3 flex flex-wrap gap-3 justify-center sm:justify-start">
                  <div className={`tag px-3 py-1 bg-gradient-to-r ${getTierColor(tier.code)} text-white border-none`}>
                    <Award size={14} className="mr-1" />
                    {tier.name}
                  </div>

                  <div className="tag tag-secondary">
                    <Trophy size={14} className="mr-1 text-gold-500" />
                    {profile.reputation_points} pts de reputación
                  </div>
                </div>
              </div>

              {/* Botón Editar */}
              <div className="mt-6 sm:mt-0">
                <button
                  onClick={() => router.push('/profile/settings')}
                  className="btn btn-secondary"
                >
                  <Edit size={16} />
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progreso al Siguiente Tier */}
        {nextTier && (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-dungeon-100 flex items-center gap-2 font-heading">
                <Target className="text-gold-500" size={24} />
                Progreso al Siguiente Nivel
              </h2>
              <span className="text-sm text-dungeon-400 font-mono">
                {profile.reputation_points} / {nextTier.requiredPoints} pts
              </span>
            </div>

            <div className="relative pt-1">
              <div className="overflow-hidden h-3 text-xs flex rounded-full bg-dungeon-950 border border-dungeon-800">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500"
                ></div>
              </div>
            </div>

            <p className="mt-3 text-sm text-dungeon-400">
              Te faltan <span className="text-gold-400 font-bold">{nextTier.requiredPoints - profile.reputation_points}</span> puntos para alcanzar el tier{' '}
              <span className="font-bold text-dungeon-200">{nextTier.name}</span>
            </p>
          </div>
        )}

        {/* Estadísticas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Contribuciones */}
          <div className="card p-6 hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="label text-xs">Total Contribuciones</p>
                <p className="text-3xl font-bold text-dungeon-100 mt-1">
                  {profile.translations_submitted}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                <Edit className="text-blue-400" size={24} />
              </div>
            </div>
          </div>

          {/* Aprobadas */}
          <div className="card p-6 hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="label text-xs">Aprobadas</p>
                <p className="text-3xl font-bold text-green-400 mt-1">
                  {profile.translations_approved}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20">
                <CheckCircle className="text-green-400" size={24} />
              </div>
            </div>
          </div>

          {/* Tasa de Aprobación */}
          <div className="card p-6 hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="label text-xs">Tasa de Aprobación</p>
                <p className="text-3xl font-bold text-gold-400 mt-1">
                  {stats ? Math.round(stats.approval_rate) : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center border border-gold-500/20">
                <TrendingUp className="text-gold-400" size={24} />
              </div>
            </div>
          </div>

          {/* Revisiones Completadas */}
          <div className="card p-6 hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="label text-xs">Revisiones</p>
                <p className="text-3xl font-bold text-purple-400 mt-1">
                  {profile.reviews_completed}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20">
                <Star className="text-purple-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dungeon-100 flex items-center gap-2 font-heading">
              <Clock className="text-gold-500" size={24} />
              Actividad Reciente
            </h2>
          </div>

          {/* Filtros */}
          {stats && stats.recent_edits.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-dungeon-700">
              <button
                onClick={() => setTranslationFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  translationFilter === 'all'
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                    : 'bg-dungeon-800/50 text-dungeon-300 hover:bg-dungeon-700/50'
                }`}
              >
                Todas ({stats.total_submissions})
              </button>
              <button
                onClick={() => setTranslationFilter('approved')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  translationFilter === 'approved'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                    : 'bg-dungeon-800/50 text-dungeon-300 hover:bg-dungeon-700/50'
                }`}
              >
                Aprobadas ({stats.approved})
              </button>
              <button
                onClick={() => setTranslationFilter('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  translationFilter === 'pending'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                    : 'bg-dungeon-800/50 text-dungeon-300 hover:bg-dungeon-700/50'
                }`}
              >
                Pendientes ({stats.pending})
              </button>
              <button
                onClick={() => setTranslationFilter('rejected')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  translationFilter === 'rejected'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-dungeon-800/50 text-dungeon-300 hover:bg-dungeon-700/50'
                }`}
              >
                Rechazadas ({stats.rejected})
              </button>
            </div>
          )}

          {stats && stats.recent_edits.length > 0 ? (
            <div className="space-y-3">
              {stats.recent_edits
                .filter((edit) => translationFilter === 'all' || edit.status === translationFilter)
                .map((edit) => (
                <div
                  key={edit.id}
                  className="flex items-center justify-between p-4 bg-dungeon-950/50 border border-dungeon-800 rounded-xl hover:border-dungeon-600 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-bold text-dungeon-200">
                      {edit.entity_type} <span className="text-dungeon-500 font-normal">/</span> {edit.field_name}
                    </p>
                    <p className="text-xs text-dungeon-400 mt-1 line-clamp-1 italic">
                      "{edit.new_value}"
                    </p>
                    <p className="text-xs text-dungeon-500 mt-2 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(edit.submitted_at).toLocaleDateString('es-ES')}
                    </p>
                  </div>

                  <div className="ml-4">
                    {edit.status === 'approved' && (
                      <span className="tag bg-green-500/10 text-green-400 border-green-500/20">
                        <CheckCircle size={12} className="mr-1" /> Aprobado
                      </span>
                    )}
                    {edit.status === 'rejected' && (
                      <span className="tag bg-red-500/10 text-red-400 border-red-500/20">
                        <XCircle size={12} className="mr-1" /> Rechazado
                      </span>
                    )}
                    {edit.status === 'pending' && (
                      <span className="tag bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                        <Clock size={12} className="mr-1" /> Pendiente
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-dungeon-700 rounded-xl">
              <div className="w-16 h-16 bg-dungeon-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="text-dungeon-600" size={32} />
              </div>
              <p className="text-dungeon-400 mb-6">No has realizado ninguna contribución aún</p>
              <button
                onClick={() => router.push('/contribute/translate')}
                className="btn btn-primary"
              >
                Comenzar a Contribuir
              </button>
            </div>
          )}
        </div>

        {/* Biografía */}
        {profile.bio && (
          <div className="card p-6">
            <h2 className="text-xl font-bold text-dungeon-100 mb-4 font-heading">Acerca de mí</h2>
            <div className="prose prose-invert max-w-none text-dungeon-300">
              <p className="whitespace-pre-wrap">{profile.bio}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
