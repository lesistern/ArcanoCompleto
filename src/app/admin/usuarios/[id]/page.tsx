'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  Loader2,
  Pencil,
  RefreshCw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  UserCog,
  Users,
} from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  preferred_language?: string | null;
  translations_submitted?: number | null;
  translations_approved?: number | null;
  reviews_completed?: number | null;
  reputation_points?: number | null;
  created_at: string;
  updated_at?: string | null;
  last_active_at?: string | null;
  profile_hidden?: boolean | null;
  username_slug: string;
  experience_points: number;
  reports_submitted: number;
  reports_resolved: number;
  total_votes_received: number;
  level: number;
  exp_to_next_level?: number | null;
  tier: string;
  tier_code: string;
  tier_codes?: string[] | null;
  daily_reports_count?: number | null;
  last_report_date?: string | null;
  trust_score?: number | null;
  location?: string | null;
  github_url?: string | null;
  twitter_url?: string | null;
  website_url?: string | null;
  show_email?: boolean | null;
  show_location?: boolean | null;
  show_characters?: boolean | null;
  show_activity?: boolean | null;
  forum_trust_level?: string | null;
  forum_threads_created?: number | null;
  forum_posts_created?: number | null;
  forum_solutions_accepted?: number | null;
  forum_upvotes_received?: number | null;
  forum_upvotes_given?: number | null;
  forum_banned_until?: string | null;
  forum_restriction_reason?: string | null;
  patreon_tier: string;
  patreon_user_id?: string | null;
  patreon_since?: string | null;
  patreon_status?: string | null;
  patreon_last_sync?: string | null;
  last_sign_in_at?: string | null;
  phone?: string | null;
  provider?: string | null;
}

const TIER_BADGES = {
  admin: { label: 'Admin', color: 'text-red-400 border-red-500/30 bg-red-500/10', icon: Shield },
  reviewer: { label: 'Mod', color: 'text-orange-400 border-orange-500/30 bg-orange-500/10', icon: ShieldCheck },
  editor: { label: 'Editor', color: 'text-yellow-300 border-yellow-500/30 bg-yellow-500/10', icon: Pencil },
  translator: { label: 'Traductor', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10', icon: ShieldAlert },
  contributor: { label: 'Beta tester', color: 'text-green-400 border-green-500/30 bg-green-500/10', icon: UserCog },
  user: { label: 'Usuario', color: 'text-dungeon-400 border-dungeon-700 bg-dungeon-800', icon: Users },
} as const;

const SAFE_FORMAT = {
  val: (val: any, fallback = '-') => (val === undefined || val === null || val === '' ? fallback : val),
  bool: (val?: boolean | null) => (val ? 'Si' : 'No'),
  date: (val?: string | null) => (val ? new Date(val).toLocaleString() : '-'),
};

export default function AdminUsuarioPerfilPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [banReason, setBanReason] = useState('');
  const [banUntil, setBanUntil] = useState('');

  const supabase = createClient();

  const userId = useMemo(() => {
    const raw = (params as { id?: string | string[] })?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const getUserTiers = (profile: UserProfile) => {
    const baseCodes =
      profile.tier_codes && profile.tier_codes.length
        ? profile.tier_codes
        : [profile.tier_code || profile.tier || 'user'];
    const codes = Array.from(new Set(baseCodes.filter(Boolean)));
    const isLesistern =
      profile.email?.toLowerCase().includes('lesistern') ||
      profile.username_slug?.toLowerCase().includes('lesistern') ||
      (profile.display_name || '').toLowerCase().includes('lesistern');
    if (isLesistern && !codes.includes('admin')) codes.unshift('admin');
    if (isLesistern && !codes.includes('editor')) codes.unshift('editor');
    return codes;
  };

  useEffect(() => {
    checkAuthorization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function checkAuthorization() {
    if (!userId) {
      router.replace('/admin/usuarios');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      router.replace('/');
      return;
    }
    const email = data.user.email?.toLowerCase() || '';
    const { data: profile } = await supabase
      .from('profiles')
      .select('tier_code, tier_codes')
      .eq('id', data.user.id)
      .maybeSingle();

    const tiers = profile?.tier_codes && profile.tier_codes.length ? profile.tier_codes : [profile?.tier_code ?? 'user'];
    const isAdmin = email.includes('lesistern') || tiers.includes('admin');

    if (!isAdmin && !tiers.includes('reviewer')) {
      router.replace('/');
      return;
    }

    setAuthorized(true);
    await loadUserProfile(userId);
    setLoading(false);
  }

  async function loadUserProfile(id: string) {
    if (!id) return;
    setProcessing(true);
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
      if (error || !data) throw error;
      const profile = data as UserProfile;
      setUser(profile);
      setEditForm({
        email: profile.email,
        phone: profile.phone || '',
      });
      setBanReason(profile.forum_restriction_reason || '');
      setBanUntil(profile.forum_banned_until ? new Date(profile.forum_banned_until).toISOString().slice(0, 16) : '');
    } catch (err) {
      console.error('Error loading user profile:', err);
      alert('No se pudo cargar el usuario');
      router.push('/admin/usuarios');
    } finally {
      setProcessing(false);
    }
  }

  async function applyBan() {
    if (!userId) return;
    if (!banUntil) {
      alert('Selecciona fecha/hora de fin de baneo');
      return;
    }
    const untilDate = new Date(banUntil);
    if (Number.isNaN(untilDate.getTime())) {
      alert('Fecha de baneo invalida');
      return;
    }
    setProcessing(true);
    try {
      const updatePayload = {
        forum_banned_until: untilDate.toISOString(),
        forum_restriction_reason: banReason || 'Ban aplicado manualmente',
        profile_hidden: true,
      };
      const { error } = await supabase.from('profiles').update(updatePayload).eq('id', userId);
      if (error) throw error;
      setUser((prev) => (prev ? { ...prev, ...updatePayload } : prev));
    } catch (err) {
      console.error('Error aplicando baneo:', err);
      alert('No se pudo aplicar el baneo');
    } finally {
      setProcessing(false);
    }
  }

  async function removeBan() {
    if (!userId) return;
    setProcessing(true);
    try {
      const updatePayload = { forum_banned_until: null, forum_restriction_reason: null, profile_hidden: false };
      const { error } = await supabase.from('profiles').update(updatePayload).eq('id', userId);
      if (error) throw error;
      setUser((prev) => (prev ? { ...prev, ...updatePayload } : prev));
      setBanReason('');
      setBanUntil('');
    } catch (err) {
      console.error('Error removiendo baneo:', err);
      alert('No se pudo remover el baneo');
    } finally {
      setProcessing(false);
    }
  }
  async function saveProfileEdits() {
    if (!user || !userId) return;
    setProcessing(true);
    try {
      const payload: Record<string, any> = {};
      const editableKeys: (keyof UserProfile)[] = [
        'email',
        'phone',
      ];
      editableKeys.forEach((key) => {
        if (key in editForm) payload[key] = (editForm as any)[key];
      });
      const { error } = await supabase.from('profiles').update(payload).eq('id', userId);
      if (error) throw error;
      setUser((prev) => (prev ? { ...prev, ...payload } : prev));
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('No se pudo guardar el perfil');
    } finally {
      setProcessing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dungeon-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-gold-500" />
      </div>
    );
  }
  if (!authorized) return null;
  if (!user) return null;

  const tiers = getUserTiers(user);
  const badge = TIER_BADGES[tiers[0] as keyof typeof TIER_BADGES] || TIER_BADGES.user;
  const BadgeIcon = badge.icon;

  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <Button onClick={() => router.push('/admin/usuarios')} variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-red-500 mb-1 flex items-center gap-2">
                <Users className="w-8 h-8" />
                Perfil de usuario
              </h1>
              <p className="text-dungeon-300">Detalle completo y edicion rapida del perfil</p>
            </div>
          </div>
          <Button
            onClick={() => {
              if (userId) loadUserProfile(userId);
            }}
            variant="secondary"
            disabled={processing || !userId}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Recargar datos
          </Button>
        </div>

        <Card className="bg-dungeon-900 border border-dungeon-800">
          <CardContent className="p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded bg-dungeon-800 border border-dungeon-700 flex items-center justify-center uppercase text-xl font-semibold text-gold-400">
                  {(user.display_name || user.email || '?').slice(0, 1)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold border flex items-center gap-2 bg-dungeon-800 border-dungeon-700`}
                    >
                      <BadgeIcon className="w-4 h-4" />
                      <span>{user.display_name || 'Sin nombre'}</span>
                      <span className="text-dungeon-400 text-xs">{user.email}</span>
                    </div>
                    {tiers.slice(1).map((tier) => {
                      const tierInfo = TIER_BADGES[tier as keyof typeof TIER_BADGES] || TIER_BADGES.user;
                      const TierIcon = tierInfo.icon;
                      return (
                        <span
                          key={tier}
                          className={`px-2 py-1 rounded text-xs font-semibold border ${tierInfo.color} flex items-center gap-1`}
                        >
                          <TierIcon className="w-3 h-3" />
                          {tierInfo.label}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-sm text-dungeon-300">
                    Slug: {user.username_slug} - Nivel {user.level} - EXP {user.experience_points}
                  </p>
                  <p className="text-xs text-dungeon-400">
                    Ultima actividad: {SAFE_FORMAT.date(user.last_active_at)} - Creado: {SAFE_FORMAT.date(user.created_at)}
                  </p>
                </div>
              </div>
              <div className="text-sm text-dungeon-300 space-y-1">
                <p>
                  <span className="text-dungeon-400 font-semibold">Reputacion:</span>{' '}
                  {SAFE_FORMAT.val(user.reputation_points)}
                </p>
                <p>
                  <span className="text-dungeon-400 font-semibold">Reportes:</span>{' '}
                  {SAFE_FORMAT.val(user.reports_submitted)} / {SAFE_FORMAT.val(user.reports_resolved)}
                </p>
                <p>
                  <span className="text-dungeon-400 font-semibold">Votos recibidos:</span>{' '}
                  {SAFE_FORMAT.val(user.total_votes_received)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-dungeon-900 border border-dungeon-800">
            <CardHeader>
              <CardTitle className="text-gold-400 text-lg">Detalle general</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-dungeon-200">
              <div><span className="text-dungeon-400 font-semibold">Email:</span> {SAFE_FORMAT.val(user.email)}</div>
              <div><span className="text-dungeon-400 font-semibold">Telefono:</span> {SAFE_FORMAT.val(user.phone)}</div>
              <div><span className="text-dungeon-400 font-semibold">Proveedor:</span> {SAFE_FORMAT.val(user.provider)}</div>
              <div><span className="text-dungeon-400 font-semibold">Idioma:</span> {SAFE_FORMAT.val(user.preferred_language)}</div>
              <div><span className="text-dungeon-400 font-semibold">Ubicacion:</span> {SAFE_FORMAT.val(user.location)}</div>
              <div><span className="text-dungeon-400 font-semibold">Bio:</span> {SAFE_FORMAT.val(user.bio)}</div>
              <div><span className="text-dungeon-400 font-semibold">EXP a siguiente nivel:</span> {SAFE_FORMAT.val(user.exp_to_next_level)}</div>
              <div><span className="text-dungeon-400 font-semibold">Ultima conexion:</span> {SAFE_FORMAT.date(user.last_sign_in_at)}</div>
              <div><span className="text-dungeon-400 font-semibold">Ultimo reporte:</span> {SAFE_FORMAT.val(user.last_report_date)}</div>
              <div><span className="text-dungeon-400 font-semibold">Reportes diarios:</span> {SAFE_FORMAT.val(user.daily_reports_count)}</div>
            </CardContent>
          </Card>

          <Card className="bg-dungeon-900 border border-dungeon-800">
            <CardHeader>
              <CardTitle className="text-gold-400 text-lg">Foro, Patreon y visibilidad</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-dungeon-200">
              <div><span className="text-dungeon-400 font-semibold">Nivel confianza foro:</span> {SAFE_FORMAT.val(user.forum_trust_level)}</div>
              <div><span className="text-dungeon-400 font-semibold">Posts foro:</span> {SAFE_FORMAT.val(user.forum_posts_created)}</div>
              <div><span className="text-dungeon-400 font-semibold">Hilos foro:</span> {SAFE_FORMAT.val(user.forum_threads_created)}</div>
              <div><span className="text-dungeon-400 font-semibold">Soluciones aceptadas:</span> {SAFE_FORMAT.val(user.forum_solutions_accepted)}</div>
              <div><span className="text-dungeon-400 font-semibold">Upvotes recibidos:</span> {SAFE_FORMAT.val(user.forum_upvotes_received)}</div>
              <div><span className="text-dungeon-400 font-semibold">Upvotes dados:</span> {SAFE_FORMAT.val(user.forum_upvotes_given)}</div>
              <div><span className="text-dungeon-400 font-semibold">Baneo hasta:</span> {SAFE_FORMAT.date(user.forum_banned_until)}</div>
              <div><span className="text-dungeon-400 font-semibold">Razon restriccion:</span> {SAFE_FORMAT.val(user.forum_restriction_reason)}</div>
              <div><span className="text-dungeon-400 font-semibold">Patreon tier:</span> {SAFE_FORMAT.val(user.patreon_tier)}</div>
              <div><span className="text-dungeon-400 font-semibold">Patreon estado:</span> {SAFE_FORMAT.val(user.patreon_status)}</div>
              <div><span className="text-dungeon-400 font-semibold">Patreon ultima sync:</span> {SAFE_FORMAT.date(user.patreon_last_sync)}</div>
              <div><span className="text-dungeon-400 font-semibold">Perfil oculto:</span> {SAFE_FORMAT.bool(user.profile_hidden)}</div>
              <div><span className="text-dungeon-400 font-semibold">Mostrar email:</span> {SAFE_FORMAT.bool(user.show_email)}</div>
              <div><span className="text-dungeon-400 font-semibold">Mostrar ubicacion:</span> {SAFE_FORMAT.bool(user.show_location)}</div>
              <div><span className="text-dungeon-400 font-semibold">Mostrar personajes:</span> {SAFE_FORMAT.bool(user.show_characters)}</div>
              <div><span className="text-dungeon-400 font-semibold">Mostrar actividad:</span> {SAFE_FORMAT.bool(user.show_activity)}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-dungeon-900 border border-dungeon-800">
          <CardHeader>
            <CardTitle className="text-gold-400 text-lg">Editar campos rapidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-sm text-dungeon-200">
                Email
                <input
                  value={(editForm.email as string | undefined) || ''}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-dungeon-200">
                Telefono
                <input
                  value={(editForm.phone as string | undefined) || ''}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2"
                />
              </label>
            </div>

            <div className="space-y-3">
              <h4 className="text-dungeon-100 font-semibold text-sm">Baneo manual</h4>
              <div className="grid md:grid-cols-3 gap-3 text-sm text-dungeon-200">
                <label className="flex flex-col gap-1 md:col-span-2">
                  Motivo
                  <input
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                    className="bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  Fin del baneo
                  <input
                    type="datetime-local"
                    value={banUntil}
                    onChange={(e) => setBanUntil(e.target.value)}
                    className="bg-dungeon-800 border border-dungeon-700 rounded px-3 py-2"
                  />
                </label>
              </div>
              <div className="flex items-center gap-2 text-xs text-dungeon-400">
                <span>Baneo actual: {SAFE_FORMAT.date(user.forum_banned_until)}</span>
                {user.forum_restriction_reason && <span>- Motivo: {user.forum_restriction_reason}</span>}
              </div>
              <div className="flex gap-2">
                <Button onClick={applyBan} disabled={processing || !userId}>
                  Aplicar baneo
                </Button>
                {user.forum_banned_until && (
                  <Button onClick={removeBan} variant="secondary" disabled={processing || !userId}>
                    Desbanear
                  </Button>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => {
                  if (userId) loadUserProfile(userId);
                }}
                variant="ghost"
                disabled={processing || !userId}
              >
                Cancelar
              </Button>
              <Button onClick={saveProfileEdits} disabled={processing || !userId}>
                Guardar cambios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
