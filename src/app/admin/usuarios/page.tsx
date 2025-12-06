'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Users, Search, Shield, Loader2, RefreshCw } from 'lucide-react';
import { UserProfile, getUserTiers, calculateUserStats, ALL_TIERS } from '@/lib/data/user-management';
import { UserCard } from '@/components/admin/UserCard';
import { TierManagementModal } from '@/components/admin/TierManagementModal';

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
          <Card className="card">
            <CardContent className="p-4">
              <p className="text-dungeon-400 text-sm">Total Usuarios</p>
              <p className="text-2xl font-bold text-dungeon-100 font-heading">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border border-red-500/30">
            <CardContent className="p-4">
              <p className="text-red-400 text-sm">Administradores</p>
              <p className="text-2xl font-bold text-red-400 font-heading">{stats.admins}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border border-orange-500/30">
            <CardContent className="p-4">
              <p className="text-orange-400 text-sm">Revisores</p>
              <p className="text-2xl font-bold text-orange-400 font-heading">{stats.reviewers}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border border-yellow-500/30">
            <CardContent className="p-4">
              <p className="text-yellow-300 text-sm">Editores</p>
              <p className="text-2xl font-bold text-yellow-300 font-heading">{stats.editors}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border border-blue-500/30">
            <CardContent className="p-4">
              <p className="text-blue-400 text-sm">Beta Testers</p>
              <p className="text-2xl font-bold text-blue-400 font-heading">{stats.beta_testers}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="card mb-8">
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
                  return (
                    <UserCard
                      key={user.id}
                      user={user}
                      userTiers={userTiers}
                      onNavigate={(userId) => router.push(`/admin/usuarios/${userId}`)}
                      onEditTiers={(user) => {
                        setSelectedUser(user);
                        setShowTierModal(true);
                      }}
                      onRemoveTier={removeTier}
                      onBan={toggleBan}
                      processing={processing}
                      currentUserIsAdmin={currentUserIsAdmin}
                    />
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <TierManagementModal
          selectedUser={showTierModal ? selectedUser : null}
          onAddTier={addTier}
          onClose={() => {
            setShowTierModal(false);
            setSelectedUser(null);
          }}
          processing={processing}
          currentUserIsAdmin={currentUserIsAdmin}
          getUserTiers={getUserTiers}
        />
      </div>
    </div>
  );
}
