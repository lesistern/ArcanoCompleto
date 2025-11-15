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
} from 'lucide-react';

interface ContributionStats {
  total_submissions: number;
  approved: number;
  rejected: number;
  pending: number;
  approval_rate: number;
  recent_edits: any[];
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, tier, loading, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<ContributionStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

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
      guest: 'from-gray-400 to-gray-600',
      user: 'from-blue-400 to-blue-600',
      contributor: 'from-green-400 to-green-600',
      translator: 'from-purple-400 to-purple-600',
      reviewer: 'from-orange-400 to-orange-600',
      admin: 'from-red-400 to-red-600',
    };
    return colors[tierCode] || 'from-blue-400 to-blue-600';
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
      <div className="min-h-screen bg-dungeon-950 flex items-center justify-center">
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
    <div className="min-h-screen bg-dungeon-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header con Avatar y Info Básica */}
        <div className="bg-dungeon-900 rounded-lg shadow-xl overflow-hidden mb-8">
          <div className={`h-32 bg-gradient-to-r ${getTierColor(tier.code)}`}></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-12">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-5xl border-4 border-dungeon-900 shadow-lg">
                {profile.display_name?.[0]?.toUpperCase() || 'U'}
              </div>

              {/* Info */}
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
                <h1 className="text-3xl font-bold text-dungeon-50">{profile.display_name}</h1>
                <p className="text-dungeon-400">{user.email}</p>

                <div className="mt-3 flex flex-wrap gap-3 justify-center sm:justify-start">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r ${getTierColor(tier.code)} text-white text-sm font-semibold`}>
                    <Award size={16} />
                    <span>{tier.name}</span>
                  </div>

                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-dungeon-800 text-gold-500 text-sm font-semibold">
                    <Trophy size={16} />
                    <span>{profile.reputation_points} pts de reputación</span>
                  </div>
                </div>
              </div>

              {/* Botón Editar */}
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => router.push('/profile/settings')}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-100 rounded-md transition-colors"
                >
                  <Edit size={16} />
                  <span>Editar Perfil</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progreso al Siguiente Tier */}
        {nextTier && (
          <div className="bg-dungeon-900 rounded-lg shadow-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-dungeon-50 flex items-center space-x-2">
                <Target className="text-gold-500" size={24} />
                <span>Progreso al Siguiente Nivel</span>
              </h2>
              <span className="text-sm text-dungeon-400">
                {profile.reputation_points} / {nextTier.requiredPoints} pts
              </span>
            </div>

            <div className="relative pt-1">
              <div className="overflow-hidden h-4 text-xs flex rounded-full bg-dungeon-800">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-500"
                ></div>
              </div>
            </div>

            <p className="mt-3 text-sm text-dungeon-400">
              Te faltan {nextTier.requiredPoints - profile.reputation_points} puntos para alcanzar el tier{' '}
              <span className="font-semibold text-dungeon-200">{nextTier.name}</span>
            </p>
          </div>
        )}

        {/* Estadísticas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Contribuciones */}
          <div className="bg-dungeon-900 rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dungeon-400">Total Contribuciones</p>
                <p className="text-3xl font-bold text-dungeon-50 mt-2">
                  {profile.translations_submitted}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Edit className="text-blue-400" size={24} />
              </div>
            </div>
          </div>

          {/* Aprobadas */}
          <div className="bg-dungeon-900 rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dungeon-400">Aprobadas</p>
                <p className="text-3xl font-bold text-green-400 mt-2">
                  {profile.translations_approved}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-400" size={24} />
              </div>
            </div>
          </div>

          {/* Tasa de Aprobación */}
          <div className="bg-dungeon-900 rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dungeon-400">Tasa de Aprobación</p>
                <p className="text-3xl font-bold text-gold-400 mt-2">
                  {stats ? Math.round(stats.approval_rate) : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-gold-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-gold-400" size={24} />
              </div>
            </div>
          </div>

          {/* Revisiones Completadas */}
          <div className="bg-dungeon-900 rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dungeon-400">Revisiones</p>
                <p className="text-3xl font-bold text-purple-400 mt-2">
                  {profile.reviews_completed}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Star className="text-purple-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-dungeon-900 rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-bold text-dungeon-50 mb-6 flex items-center space-x-2">
            <Clock className="text-gold-500" size={24} />
            <span>Actividad Reciente</span>
          </h2>

          {stats && stats.recent_edits.length > 0 ? (
            <div className="space-y-4">
              {stats.recent_edits.map((edit) => (
                <div
                  key={edit.id}
                  className="flex items-center justify-between p-4 bg-dungeon-800 rounded-lg hover:bg-dungeon-750 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-dungeon-100">
                      {edit.entity_type} - {edit.field_name}
                    </p>
                    <p className="text-xs text-dungeon-400 mt-1 line-clamp-1">
                      {edit.new_value}
                    </p>
                    <p className="text-xs text-dungeon-500 mt-1 flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{new Date(edit.submitted_at).toLocaleDateString('es-ES')}</span>
                    </p>
                  </div>

                  <div className="ml-4">
                    {edit.status === 'approved' && (
                      <span className="inline-flex items-center space-x-1 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-semibold">
                        <CheckCircle size={14} />
                        <span>Aprobado</span>
                      </span>
                    )}
                    {edit.status === 'rejected' && (
                      <span className="inline-flex items-center space-x-1 px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold">
                        <XCircle size={14} />
                        <span>Rechazado</span>
                      </span>
                    )}
                    {edit.status === 'pending' && (
                      <span className="inline-flex items-center space-x-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-semibold">
                        <Clock size={14} />
                        <span>Pendiente</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-dungeon-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="text-dungeon-600" size={32} />
              </div>
              <p className="text-dungeon-400">No has realizado ninguna contribución aún</p>
              <button
                onClick={() => router.push('/contribute/translate')}
                className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-dungeon-950 rounded-md transition-colors font-semibold"
              >
                <span>Comenzar a Contribuir</span>
              </button>
            </div>
          )}
        </div>

        {/* Biografía */}
        {profile.bio && (
          <div className="bg-dungeon-900 rounded-lg shadow-xl p-6 mt-8">
            <h2 className="text-xl font-bold text-dungeon-50 mb-4">Acerca de mí</h2>
            <p className="text-dungeon-300 whitespace-pre-wrap">{profile.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
