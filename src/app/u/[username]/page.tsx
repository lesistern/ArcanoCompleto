'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Award,
  Trophy,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowLeft,
  Calendar,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

interface ProfileData {
  id: string;
  username_slug: string;
  display_name: string | null;
  tier_code: string;
  karma_points: number;
  reports_submitted: number;
  reports_resolved: number;
  total_votes_received: number;
  profile_hidden: boolean;
  created_at: string;
  success_rate: number;
  avg_votes_per_report: number;
  karma_rank: number;
  can_view: boolean;
}

interface UserReport {
  id: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
  vote_count: number;
}

const TIER_BADGES = {
  admin: { label: 'Admin', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
  reviewer: { label: 'Revisor', color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
  translator: { label: 'Traductor', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
  contributor: { label: 'Colaborador', color: 'text-green-400 border-green-500/30 bg-green-500/10' },
  beta_tester: { label: 'Beta Tester', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
  user: { label: 'Usuario', color: 'text-dungeon-400 border-dungeon-700 bg-dungeon-800' },
};

const CATEGORY_LABELS: Record<string, string> = {
  bug: 'Bug',
  feature: 'Característica',
  translation: 'Traducción',
  data: 'Datos',
  ui: 'Interfaz',
  performance: 'Rendimiento',
  other: 'Otro',
};

const STATUS_LABELS: Record<string, string> = {
  open: 'Abierto',
  in_progress: 'En progreso',
  resolved: 'Resuelto',
  closed: 'Cerrado',
  wont_fix: 'No se arreglará',
};

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [reports, setReports] = useState<UserReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    loadProfile();
    loadUserReports();
  }, [username]);

  async function loadProfile() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: rpcError } = await supabase.rpc('get_profile_by_username', {
        p_username_slug: username,
      });

      if (rpcError) {
        console.error('Error loading profile:', rpcError);
        setError('Perfil no encontrado');
        return;
      }

      if (!data || data.length === 0) {
        setError('Perfil no encontrado');
        return;
      }

      const profileData = data[0];

      // Check if user can view this profile
      if (!profileData.can_view) {
        setError('Este perfil está oculto');
        return;
      }

      setProfile(profileData);
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
  }

  async function loadUserReports() {
    if (!username) return;

    try {
      const { data, error } = await supabase
        .from('v_user_public_reports')
        .select('*')
        .eq('author_username', username)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error loading user reports:', error);
        return;
      }

      setReports(data || []);
    } catch (err) {
      console.error('Error loading reports:', err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dungeon-950 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12 text-dungeon-400">
            Cargando perfil...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dungeon-950 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al leaderboard
          </Link>

          <Card className="bg-dungeon-800 border-dungeon-700">
            <CardContent className="p-12 text-center">
              <EyeOff className="w-16 h-16 text-dungeon-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-dungeon-300 mb-2">
                {error}
              </h2>
              <p className="text-dungeon-500">
                {error === 'Este perfil está oculto'
                  ? 'El usuario ha configurado su perfil como privado.'
                  : 'No se pudo encontrar este perfil.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const tierInfo = TIER_BADGES[profile.tier_code as keyof typeof TIER_BADGES] || TIER_BADGES.user;

  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back to Leaderboard */}
        <Link
          href="/leaderboard"
          className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al leaderboard
        </Link>

        {/* Profile Header */}
        <Card className="mb-6 bg-gradient-to-r from-gold-900/20 to-dungeon-800 border-gold-500/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gold-400">
                    {profile.display_name || `Usuario ${profile.username_slug}`}
                  </h1>
                  <span className={`text-sm px-3 py-1 rounded border ${tierInfo.color}`}>
                    {tierInfo.label}
                  </span>
                  {profile.profile_hidden && (
                    <span className="text-xs px-2 py-1 rounded border border-dungeon-600 bg-dungeon-800 text-dungeon-400 flex items-center gap-1">
                      <EyeOff className="w-3 h-3" />
                      Perfil oculto
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-dungeon-400">
                  <Calendar className="w-4 h-4" />
                  Miembro desde {new Date(profile.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3 px-6 py-3 bg-gold-500/10 border border-gold-500/30 rounded-lg">
                <Trophy className="w-8 h-8 text-gold-400" />
                <div className="text-right">
                  <div className="text-3xl font-bold text-gold-400">{profile.karma_points}</div>
                  <div className="text-xs text-dungeon-400">karma</div>
                  <div className="text-xs text-dungeon-500">Ranking #{profile.karma_rank}</div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-dungeon-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{profile.reports_submitted}</div>
                <div className="text-sm text-dungeon-400">Reportes enviados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{profile.reports_resolved}</div>
                <div className="text-sm text-dungeon-400">Resueltos</div>
                <div className="text-xs text-dungeon-500">{profile.success_rate}% éxito</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{profile.total_votes_received}</div>
                <div className="text-sm text-dungeon-400">Votos recibidos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{profile.avg_votes_per_report}</div>
                <div className="text-sm text-dungeon-400">Votos por reporte</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="bg-dungeon-800 border-dungeon-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gold-400">
              <MessageSquare className="w-5 h-5" />
              Reportes recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reports.length === 0 ? (
              <div className="text-center py-8 text-dungeon-400">
                Este usuario aún no ha enviado reportes públicos
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((report) => (
                  <Link
                    key={report.id}
                    href={`/reportes-beta`}
                    className="block p-4 bg-dungeon-900/50 border border-dungeon-700 rounded-lg hover:border-dungeon-600 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-dungeon-100 font-semibold mb-1 truncate">
                          {report.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-dungeon-400">
                          <span className="capitalize">{CATEGORY_LABELS[report.category]}</span>
                          <span>•</span>
                          <span className={
                            report.status === 'resolved' ? 'text-green-400' :
                            report.status === 'in_progress' ? 'text-blue-400' :
                            'text-dungeon-400'
                          }>
                            {STATUS_LABELS[report.status]}
                          </span>
                          <span>•</span>
                          <span>{new Date(report.created_at).toLocaleDateString('es-ES')}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-semibold text-blue-400">{report.vote_count}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
