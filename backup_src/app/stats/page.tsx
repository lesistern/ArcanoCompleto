'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { usePatreonFixed } from '@/hooks/usePatreon';
import { TrendingUp, Users, DollarSign, Award, Loader2, Lock } from 'lucide-react';
import Link from 'next/link';

interface PatreonStats {
  total_patrons: number;
  tier_breakdown: {
    heroe_emergente?: number;
    campeon_consagrado?: number;
    leyenda_viviente?: number;
  };
  total_monthly_revenue: number;
  newest_patrons: Array<{
    username: string;
    display_name: string;
    tier: string;
    since: string;
  }>;
}

export default function StatsPage() {
  const { tierInfo, loading: patreonLoading, isFree, hasBenefit } = usePatreonFixed();
  const [stats, setStats] = useState<PatreonStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      // Esperar a que termine de cargar el tier del usuario
      if (patreonLoading) return;

      // Verificar si tiene acceso
      if (!hasBenefit('campeon_consagrado')) {
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient();
        const { data, error: rpcError } = await supabase.rpc('get_patreon_stats');

        if (rpcError) {
          console.error('Error fetching stats:', rpcError);
          setError('Error al cargar las estadísticas');
        } else {
          setStats(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('Error inesperado al cargar las estadísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [hasBenefit, patreonLoading]);

  // Loading state
  if (patreonLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gold-400 animate-spin mx-auto mb-4" />
          <p className="text-dungeon-400">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  // Access denied
  if (!hasBenefit('campeon_consagrado')) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border-2 border-gold-500/30 rounded-lg p-8 text-center">
            <div className="bg-gold-500/10 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Lock className="w-10 h-10 text-gold-400" />
            </div>

            <h1 className="text-2xl font-bold text-gold-300 mb-4">
              Estadísticas del Proyecto
            </h1>

            <p className="text-dungeon-300 mb-6">
              Esta página es exclusiva para mecenas de tier{' '}
              <span className="text-gold-400 font-semibold">Campeón Consagrado</span> o superior.
            </p>

            <div className="bg-dungeon-900/50 border border-dungeon-700 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-dungeon-400 mb-3">
                Al convertirte en mecenas obtienes acceso a:
              </p>
              <ul className="space-y-2 text-sm text-dungeon-300">
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                  <span>Estadísticas en tiempo real del proyecto</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                  <span>Información sobre la comunidad de mecenas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="w-4 w-4 text-gold-400 mt-0.5 flex-shrink-0" />
                  <span>Badge exclusivo y derecho a voto</span>
                </li>
              </ul>
            </div>

            <a
              href="https://www.patreon.com/c/compendioarcano"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-orange-500 text-white font-bold rounded-lg hover:from-gold-600 hover:to-orange-600 transition-all transform hover:scale-105"
            >
              Ver Tiers en Patreon
            </a>

            <Link
              href="/"
              className="block mt-4 text-sm text-dungeon-400 hover:text-dungeon-300 transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Stats display
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent mb-2">
            📊 Estadísticas del Proyecto
          </h1>
          <p className="text-dungeon-400">
            Datos en tiempo real sobre el crecimiento de Compendio Arcano
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Patrons */}
          <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-blue-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-blue-400" />
              <h2 className="text-sm font-semibold text-dungeon-400 uppercase tracking-wider">
                Mecenas Activos
              </h2>
            </div>
            <div className="text-4xl font-bold text-blue-400">
              {stats?.total_patrons || 0}
            </div>
            <p className="text-xs text-dungeon-500 mt-1">
              Usuarios apoyando el proyecto
            </p>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-green-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              <h2 className="text-sm font-semibold text-dungeon-400 uppercase tracking-wider">
                Ingresos Mensuales
              </h2>
            </div>
            <div className="text-4xl font-bold text-green-400">
              ${stats?.total_monthly_revenue || 0}
            </div>
            <p className="text-xs text-dungeon-500 mt-1">
              Para hosting y desarrollo
            </p>
          </div>

          {/* Legends */}
          <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-purple-400" />
              <h2 className="text-sm font-semibold text-dungeon-400 uppercase tracking-wider">
                Leyendas Vivientes
              </h2>
            </div>
            <div className="text-4xl font-bold text-purple-400">
              {stats?.tier_breakdown?.leyenda_viviente || 0}
            </div>
            <p className="text-xs text-dungeon-500 mt-1">
              Mecenas de tier más alto
            </p>
          </div>
        </div>

        {/* Tier Breakdown */}
        <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gold-400 mb-6">
            Distribución por Tier
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-dungeon-900/50 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🛡️</span>
                <h3 className="font-semibold text-blue-300">Héroe Emergente</h3>
              </div>
              <div className="text-3xl font-bold text-blue-400">
                {stats?.tier_breakdown?.heroe_emergente || 0}
              </div>
              <p className="text-xs text-dungeon-500 mt-1">$2/mes</p>
            </div>

            <div className="bg-dungeon-900/50 border border-gold-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">👑</span>
                <h3 className="font-semibold text-gold-300">Campeón Consagrado</h3>
              </div>
              <div className="text-3xl font-bold text-gold-400">
                {stats?.tier_breakdown?.campeon_consagrado || 0}
              </div>
              <p className="text-xs text-dungeon-500 mt-1">$5/mes</p>
            </div>

            <div className="bg-dungeon-900/50 border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✨</span>
                <h3 className="font-semibold text-purple-300">Leyenda Viviente</h3>
              </div>
              <div className="text-3xl font-bold text-purple-400">
                {stats?.tier_breakdown?.leyenda_viviente || 0}
              </div>
              <p className="text-xs text-dungeon-500 mt-1">$10/mes</p>
            </div>
          </div>
        </div>

        {/* Newest Patrons */}
        {stats?.newest_patrons && stats.newest_patrons.length > 0 && (
          <div className="bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gold-400 mb-6">
              Mecenas Más Recientes
            </h2>

            <div className="space-y-3">
              {stats.newest_patrons.map((patron, index) => (
                <div
                  key={index}
                  className="bg-dungeon-900/50 border border-dungeon-700 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gold-500/10 rounded-full p-2">
                      <Users className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <Link
                        href={`/u/${patron.username}`}
                        className="font-semibold text-dungeon-200 hover:text-gold-400 transition-colors"
                      >
                        {patron.display_name || patron.username}
                      </Link>
                      <p className="text-xs text-dungeon-500">
                        {new Date(patron.since).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm font-semibold">
                    {patron.tier === 'heroe_emergente' && (
                      <span className="text-blue-400">🛡️ Héroe</span>
                    )}
                    {patron.tier === 'campeon_consagrado' && (
                      <span className="text-gold-400">👑 Campeón</span>
                    )}
                    {patron.tier === 'leyenda_viviente' && (
                      <span className="text-purple-400">✨ Leyenda</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-br from-gold-900/30 via-dungeon-800 to-dungeon-900 border-2 border-gold-500/40 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gold-400 mb-4">
            ¡Gracias por Apoyar el Proyecto! 🙏
          </h2>
          <p className="text-dungeon-300 mb-6 max-w-2xl mx-auto">
            Tu contribución hace posible el desarrollo continuo de Compendio Arcano.
            Juntos estamos construyendo el mejor recurso de D&D en español.
          </p>
          <a
            href="https://www.patreon.com/c/compendioarcano"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-orange-500 text-white font-bold rounded-lg hover:from-gold-600 hover:to-orange-600 transition-all"
          >
            Gestionar Mi Suscripción
          </a>
        </div>
      </div>
    </div>
  );
}
