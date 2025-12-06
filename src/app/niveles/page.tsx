'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Trophy, Target, Zap, Award, Crown } from 'lucide-react';
import Link from 'next/link';

interface LevelInfo {
  level: number;
  xp_required: number;
  title: string;
  tier: string;
}

// Colores por tier de nivel
const LEVEL_TIER_COLORS = {
  'Novato': {
    text: 'text-gray-400',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/30',
    gradient: 'from-gray-500/20',
    icon: Target
  },
  'Héroe': {
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    gradient: 'from-blue-500/20',
    icon: Award
  },
  'Épico': {
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    gradient: 'from-purple-500/20',
    icon: Trophy
  },
  'Legendario': {
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    gradient: 'from-amber-500/20',
    icon: Crown
  },
};

export default function NivelesPage() {
  const [levels, setLevels] = useState<LevelInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    loadLevels();
  }, []);

  async function loadLevels() {
    try {
      const { data, error } = await supabase
        .from('user_levels')
        .select('level, xp_required, title, tier')
        .order('level', { ascending: true });

      if (error) throw error;

      setLevels(data || []);
    } catch (error) {
      console.error('Error cargando niveles:', error);
    } finally {
      setLoading(false);
    }
  }

  // Agrupar niveles por tier
  const levelsByTier = levels.reduce((acc, level) => {
    const tier = level.tier;
    if (!acc[tier]) {
      acc[tier] = [];
    }
    acc[tier].push(level);
    return acc;
  }, {} as Record<string, LevelInfo[]>);

  // Orden de tiers
  const tierOrder = ['Novato', 'Héroe', 'Épico', 'Legendario'];

  if (loading) {
    return (
      <div className="min-h-screen bg-dungeon-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-dungeon-300">Cargando niveles...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dungeon-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-gold-500" />
            <h1 className="text-3xl font-bold text-gold-500">Sistema de Niveles</h1>
          </div>
          <p className="text-dungeon-300 mb-4">
            Gana experiencia reportando bugs y contribuyendo a la comunidad. Cada nivel alcanzado desbloquea nuevos títulos y reconocimientos.
          </p>
          <Link
            href="/leaderboard"
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            ← Volver al Leaderboard
          </Link>
        </div>

        {/* Niveles por Tier */}
        {tierOrder.map((tierName) => {
          const tierLevels = levelsByTier[tierName];
          if (!tierLevels || tierLevels.length === 0) return null;

          const colors = LEVEL_TIER_COLORS[tierName as keyof typeof LEVEL_TIER_COLORS];
          const Icon = colors.icon;

          return (
            <div key={tierName} className="mb-8">
              {/* Tier Header */}
              <div className={`flex items-center gap-3 mb-4 p-4 rounded-lg border ${colors.border} ${colors.bg}`}>
                <Icon className={`w-6 h-6 ${colors.text}`} />
                <h2 className={`text-2xl font-bold ${colors.text}`}>
                  Tier {tierName}
                </h2>
                <span className="text-dungeon-400 text-sm ml-auto">
                  Niveles {tierLevels[0].level}-{tierLevels[tierLevels.length - 1].level}
                </span>
              </div>

              {/* Grid de Niveles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tierLevels.map((level) => (
                  <Card
                    key={level.level}
                    className={`bg-dungeon-800 border ${colors.border} hover:border-opacity-60 transition-all`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className={`text-lg ${colors.text}`}>
                          Nivel {level.level}
                        </CardTitle>
                      </div>
                      <p className="text-dungeon-200 text-sm font-medium">
                        {level.title}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-gold-500" />
                        <span className="text-dungeon-300 text-sm">
                          {level.xp_required.toLocaleString()} XP
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {/* Footer Info */}
        <Card className="card mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-dungeon-200 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-gold-500" />
              ¿Cómo ganar experiencia?
            </h3>
            <div className="space-y-2 text-sm text-dungeon-300">
              <div className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <div>
                  <strong className="text-green-400">Reportes resueltos:</strong> De 10 a 500 XP según prioridad (Baja: 10 | Media: 50 | Alta: 100 | Crítica: 500)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <div>
                  <strong className="text-purple-400">Votos positivos:</strong> +10 XP por cada voto que recibas en tus reportes
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <div>
                  <strong className="text-red-400">Reportes rechazados:</strong> -100 XP si tu reporte es marcado como spam o falso
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
