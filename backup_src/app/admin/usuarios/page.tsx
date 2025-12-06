'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Users,
  Search,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Plus,
  X,
  Loader2,
  UserCog,
  AlertTriangle,
  Pencil,
  Ban,
  RefreshCw,
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

const ALL_TIERS = [
  { value: 'admin', label: 'Admin', description: 'Acceso total al sistema', protected: true, adminOnly: true },
  { value: 'reviewer', label: 'Mod', description: 'Puede revisar y aprobar contenido', adminOnly: true },
  { value: 'editor', label: 'Editor', description: 'Puede editar textos (requiere revision)', adminOnly: true },
  { value: 'translator', label: 'Traductor', description: 'Puede traducir y revisar traducciones' },
  { value: 'contributor', label: 'Beta tester', description: 'Puede contribuir con contenido' },
  { value: 'user', label: 'Usuario', description: 'Usuario estandar' },
] as const;

const SAFE_FORMAT = {
  val: (val: any, fallback = '—') => (val === undefined || val === null || val === '' ? fallback : val),
  bool: (val?: boolean | null) => (val ? 'Si' : 'No'),
  date: (val?: string | null) => (val ? new Date(val).toLocaleString() : '—'),
};

export default function AdminUsuariosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showTierModal, setShowTierModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  const supabase = createClient();

  const getUserTiers = (user: UserProfile) => {
    const baseCodes = (user.tier_codes && user.tier_codes.length ? user.tier_codes : [user.tier_code || user.tier || 'user']).filter(Boolean);
    const codes = Array.from(new Set(baseCodes));
    const isLesistern =
      user.email?.toLowerCase().includes('lesistern') ||
      user.username_slug?.toLowerCase().includes('lesistern') ||
      (user.display_name || '').toLowerCase().includes('lesistern');
    if (isLesistern && !codes.includes('admin')) codes.unshift('admin');
    if (isLesistern && !codes.includes('editor')) codes.unshift('editor');
    return codes;
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        user.email?.toLowerCase().includes(search) ||
        (user.display_name || '').toLowerCase().includes(search) ||
        (user.username_slug || '').toLowerCase().includes(search);
      const tiers = getUserTiers(user);
      const matchesTier = filterTier === 'all' || tiers.includes(filterTier);
      return matchesSearch && matchesTier;
    });
  }, [users, searchTerm, filterTier]);

  useEffect(() => {
    checkAuthorization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkAuthorization() {
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

    const tiers = profile?.tier_codes && profile.tier_codes.length
      ? profile.tier_codes
      : [profile?.tier_code ?? 'user'];
    const isAdmin = email.includes('lesistern') || tiers.includes('admin');

    if (!isAdmin && !tiers.includes('reviewer')) {
      router.replace('/');
      return;
    }

    setAuthorized(true);
    setCurrentUserIsAdmin(isAdmin);
    await loadUsers();
    setLoading(false);
  }
  async function loadUsers() {
    try {
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setUsers((data as UserProfile[]) || []);
    } catch (err) {
      console.error('Error loading users:', err);
      alert('No se pudieron cargar los usuarios');
    }
  }

  async function addTier(userId: string, tier: string) {
    const tierInfo = ALL_TIERS.find((t) => t.value === tier);
    if (tierInfo && (tierInfo as any).adminOnly && !currentUserIsAdmin) {
      alert('Solo los administradores pueden asignar este tier');
      return;
    }
    setProcessing(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('tier_codes, tier_code')
        .eq('id', userId)
        .single();
      if (error) throw error;

      const currentDb = (data?.tier_codes as string[] | null) ?? [];
      const base = data?.tier_code || 'user';
      const merged = Array.from(new Set([...currentDb, base, tier].filter(Boolean)));
      const primary = merged.find((t) => t !== 'user') || merged[0] || 'user';

      const { error: updError } = await supabase
        .from('profiles')
        .update({ tier_codes: merged, tier_code: primary })
        .eq('id', userId);
      if (updError) throw updError;

      // Refetch to confirm persistence (evita perder tiers si el cache estaba desfasado)
      const { data: refreshed, error: refetchError } = await supabase
        .from('profiles')
        .select('tier_codes, tier_code')
        .eq('id', userId)
        .single();
      const nextTierCodes = (refetchError ? merged : (refreshed?.tier_codes as string[] | null) ?? merged).filter(
        Boolean
      );
      const nextTierCode = (refetchError ? primary : refreshed?.tier_code) || primary;
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, tier_codes: nextTierCodes, tier_code: nextTierCode } : u))
      );
      await loadUsers();
    } catch (err) {
      console.error('Error adding tier:', err);
      alert(err instanceof Error ? err.message : 'Error al agregar tier');
    } finally {
      setProcessing(false);
    }
  }

  async function removeTier(userId: string, tier: string) {
    const tierInfo = ALL_TIERS.find((t) => t.value === tier);
    if (tierInfo && (tierInfo as any).protected) {
      alert('El tier Admin no puede ser removido por seguridad');
      return;
    }
    if (tierInfo && (tierInfo as any).adminOnly && !currentUserIsAdmin) {
      alert('Solo los administradores pueden remover este tier');
      return;
    }
    if (!confirm(`¿Estás seguro de remover el tier "${tierInfo?.label || tier}"?`)) return;
    setProcessing(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('tier_codes, tier_code')
        .eq('id', userId)
        .single();
      if (error) throw error;
      const currentDb = (data?.tier_codes as string[] | null) ?? [];
      const base = data?.tier_code || 'user';
      const merged = Array.from(new Set([...currentDb, base].filter(Boolean)));
      const updated = merged.filter((t) => t !== tier);
      const next = updated.length ? updated : ['user'];
      const primary = next.find((t) => t !== 'user') || next[0] || 'user';
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ tier_codes: next, tier_code: primary })
        .eq('id', userId);
      if (updateError) throw updateError;
      const { data: refreshed, error: refetchError } = await supabase
        .from('profiles')
        .select('tier_codes, tier_code')
        .eq('id', userId)
        .single();
      const nextTierCodes = (refetchError ? next : (refreshed?.tier_codes as string[] | null) ?? next).filter(Boolean);
      const nextTierCode = (refetchError ? primary : refreshed?.tier_code) || primary;
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, tier_codes: nextTierCodes, tier_code: nextTierCode } : u))
      );
      await loadUsers();
    } catch (err) {
      console.error('Error removing tier:', err);
      alert(err instanceof Error ? err.message : 'Error al remover tier');
    } finally {
      setProcessing(false);
    }
  }

  async function toggleBan(user: UserProfile) {
    setProcessing(true);
    try {
      const banned = Boolean(user.forum_banned_until);
      const updatePayload = banned
        ? { forum_banned_until: null, profile_hidden: false, forum_restriction_reason: null }
        : {
          forum_banned_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          profile_hidden: true,
          forum_restriction_reason: 'Ban aplicado manualmente',
        };
      const { error } = await supabase.from('profiles').update(updatePayload).eq('id', user.id);
      if (error) throw error;
      await loadUsers();
    } catch (err) {
      console.error('Error toggling ban:', err);
      alert('No se pudo actualizar el estado de baneo');
    } finally {
      setProcessing(false);
    }
  }

  const stats = useMemo(
    () => ({
      total: users.length,
      admins: users.filter((u) => getUserTiers(u).includes('admin')).length,
      reviewers: users.filter((u) => getUserTiers(u).includes('reviewer')).length,
      editors: users.filter((u) => getUserTiers(u).includes('editor')).length,
      beta_testers: users.filter((u) => getUserTiers(u).includes('contributor')).length,
    }),
    [users]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-dungeon-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-gold-500" />
      </div>
    );
  }
  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-4xl font-bold text-red-500 mb-2 flex items-center gap-3 font-heading">
              <Users className="w-10 h-10" />
              Gestion de Usuarios
            </h1>
            <p className="text-dungeon-300">
              Administra usuarios, tiers y baneos directamente desde Supabase
            </p>
          </div>
          <Button onClick={loadUsers} variant="secondary" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Recargar
          </Button>
        </div>

        <div className="mb-6 text-sm text-dungeon-200 bg-dungeon-800 border border-dungeon-700 rounded-lg p-4">
          <p className="font-semibold text-dungeon-100 mb-1">Nota</p>
          <p>
            La creación/invitación depende de una función server-side (<code>admin-create-user</code>). Se muestra la
            clave generada para compartirla manualmente si es necesario.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-dungeon-800 border-dungeon-700">
            <CardContent className="p-4">
              <p className="text-dungeon-400 text-sm">Total Usuarios</p>
              <p className="text-2xl font-bold text-dungeon-100 font-heading">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border-red-500/30">
            <CardContent className="p-4">
              <p className="text-red-400 text-sm">Administradores</p>
              <p className="text-2xl font-bold text-red-400 font-heading">{stats.admins}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border-orange-500/30">
            <CardContent className="p-4">
              <p className="text-orange-400 text-sm">Revisores</p>
              <p className="text-2xl font-bold text-orange-400 font-heading">{stats.reviewers}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border-yellow-500/30">
            <CardContent className="p-4">
              <p className="text-yellow-300 text-sm">Editores</p>
              <p className="text-2xl font-bold text-yellow-300 font-heading">{stats.editors}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border-blue-500/30">
            <CardContent className="p-4">
              <p className="text-blue-400 text-sm">Beta Testers</p>
              <p className="text-2xl font-bold text-blue-400 font-heading">{stats.beta_testers}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-dungeon-800 border-dungeon-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-heading">
              <Shield className="w-5 h-5 text-gold-400" />
              Usuarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredUsers.length === 0 ? (
              <p className="text-center text-dungeon-400 py-6">No hay usuarios con ese filtro</p>
            ) : (
              <div className="space-y-3">
                {filteredUsers.map((user) => {
                  const userTiers = getUserTiers(user);
                  const badge = TIER_BADGES[userTiers[0] as keyof typeof TIER_BADGES] || TIER_BADGES.user;
                  const BadgeIcon = badge.icon;
                  const banned = Boolean(user.forum_banned_until);
                  return (
                    <div
                      key={user.id}
                      className="border border-dungeon-700 rounded-lg p-4 bg-dungeon-900 flex flex-col md:flex-row justify-between gap-3"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="w-11 h-11 rounded bg-dungeon-800 border border-dungeon-700 flex items-center justify-center uppercase text-lg font-semibold text-gold-400 font-heading">
                          {(user.display_name || user.email || '?').slice(0, 1)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="px-3 py-1 rounded-full text-sm font-semibold border flex items-center gap-2 bg-dungeon-800 border-dungeon-700">
                              <BadgeIcon className="w-4 h-4" />
                              <span>{user.display_name || 'Sin nombre'}</span>
                              <span className="text-dungeon-400 text-xs">{user.email}</span>
                            </div>
                            {banned && (
                              <span className="text-xs px-2 py-1 rounded border border-red-500/40 text-red-300 bg-red-500/10">
                                Baneado
                              </span>
                            )}
                          </div>
                          <div className="mt-2 grid md:grid-cols-2 gap-1 text-sm text-dungeon-300">
                            <div>
                              <span className="font-semibold text-dungeon-400">Slug:</span>{' '}
                              {SAFE_FORMAT.val(user.username_slug)}
                            </div>
                            <div>
                              <span className="font-semibold text-dungeon-400">Telefono:</span>{' '}
                              {SAFE_FORMAT.val(user.phone)}
                            </div>
                            <div>
                              <span className="font-semibold text-dungeon-400">Nivel:</span>{' '}
                              {SAFE_FORMAT.val(user.level)}
                            </div>
                            <div>
                              <span className="font-semibold text-dungeon-400">EXP:</span>{' '}
                              {SAFE_FORMAT.val(user.experience_points)}
                            </div>
                            <div>
                              <span className="font-semibold text-dungeon-400">Reportes:</span>{' '}
                              {SAFE_FORMAT.val(user.reports_submitted)} / {SAFE_FORMAT.val(user.reports_resolved)}
                            </div>
                            <div>
                              <span className="font-semibold text-dungeon-400">Votos recibidos:</span>{' '}
                              {SAFE_FORMAT.val(user.total_votes_received)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-2 flex-wrap mt-2">
                            {userTiers.map((tier) => {
                              const tierInfo = TIER_BADGES[tier as keyof typeof TIER_BADGES] || TIER_BADGES.user;
                              const TierIcon = tierInfo.icon;
                              return (
                                <div
                                  key={tier}
                                  className={`px-2 py-1 rounded text-xs font-semibold border ${tierInfo.color} flex items-center gap-1.5`}
                                >
                                  <TierIcon className="w-3 h-3" />
                                  <span>{tierInfo.label}</span>
                                  {currentUserIsAdmin && tier !== 'admin' && (
                                    <button
                                      onClick={() => removeTier(user.id, tier)}
                                      disabled={processing}
                                      className="ml-1 hover:text-red-400 transition-colors disabled:opacity-50"
                                      title={`Remover tier ${tierInfo.label}`}
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => {
                            router.push(`/admin/usuarios/${user.id}`);
                          }}
                          variant="ghost"
                          className="flex items-center gap-2"
                        >
                          Ver perfil
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowTierModal(true);
                          }}
                          variant="secondary"
                          className="flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Tiers
                        </Button>
                        <Button
                          onClick={() => toggleBan(user)}
                          variant={banned ? 'secondary' : 'danger'}
                          className="flex items-center gap-2"
                          disabled={processing}
                        >
                          <Ban className="w-4 h-4" />
                          {banned ? 'Desbanear' : 'Banear'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {showTierModal && selectedUser && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full bg-dungeon-800 border-gold-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-gold-400 font-heading">Gestionar tiers</CardTitle>
                    <p className="text-dungeon-400 text-sm mt-1">
                      {selectedUser.display_name || selectedUser.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowTierModal(false);
                      setSelectedUser(null);
                    }}
                    className="text-dungeon-400 hover:text-dungeon-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-dungeon-400 mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-blue-300 mb-1">Informacion importante:</p>
                      <ul className="space-y-1 text-blue-200">
                        <li>• Se guardan multiples tiers en tier_codes; tier_code usa el primero.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {ALL_TIERS.filter((tier) => {
                  const userTiers = getUserTiers(selectedUser);
                  return !userTiers.includes(tier.value);
                }).map((tier) => {
                  const tierInfo = TIER_BADGES[tier.value as keyof typeof TIER_BADGES];
                  const TierIcon = tierInfo?.icon || Users;
                  return (
                    <Button
                      key={tier.value}
                      onClick={() => {
                        addTier(selectedUser.id, tier.value);
                        setShowTierModal(false);
                        setSelectedUser(null);
                      }}
                      disabled={processing}
                      variant="secondary"
                      className="w-full justify-start gap-3 p-4 h-auto"
                    >
                      <TierIcon className="w-5 h-5 flex-shrink-0" />
                      <div className="text-left flex-1">
                        <p className="font-semibold">{tier.label}</p>
                        <p className="text-xs text-dungeon-400 font-normal">{tier.description}</p>
                      </div>
                      {(tier as any).protected && (
                        <span title="Tier protegido">
                          <Shield className="w-4 h-4 text-red-400" />
                        </span>
                      )}
                      {(tier as any).adminOnly && (
                        <span title="Solo admins pueden remover">
                          <ShieldCheck className="w-4 h-4 text-orange-400" />
                        </span>
                      )}
                    </Button>
                  );
                })}
                {ALL_TIERS.filter((tier) => {
                  const userTiers = getUserTiers(selectedUser);
                  return !userTiers.includes(tier.value);
                }).length === 0 && (
                    <p className="text-center text-dungeon-400 py-4">
                      El usuario ya tiene todos los tiers disponibles
                    </p>
                  )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
