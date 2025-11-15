'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  Users,
  Search,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Award,
  Plus,
  X,
  Loader2,
  UserCog,
  AlertTriangle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  tier_code: string;
  tier_codes: string[];
  karma_points: number;
  reports_submitted: number;
  reports_resolved: number;
  total_votes_received: number;
  created_at: string;
  is_admin: boolean;
  is_reviewer: boolean;
  is_translator: boolean;
  is_contributor: boolean;
  is_beta_tester: boolean;
}

const TIER_BADGES = {
  admin: { label: 'Admin', color: 'text-red-400 border-red-500/30 bg-red-500/10', icon: Shield },
  reviewer: { label: 'Revisor', color: 'text-orange-400 border-orange-500/30 bg-orange-500/10', icon: ShieldCheck },
  translator: { label: 'Traductor', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10', icon: ShieldAlert },
  contributor: { label: 'Colaborador', color: 'text-green-400 border-green-500/30 bg-green-500/10', icon: UserCog },
  beta_tester: { label: 'Beta Tester', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10', icon: Award },
  user: { label: 'Usuario', color: 'text-dungeon-400 border-dungeon-700 bg-dungeon-800', icon: Users },
};

const ALL_TIERS = [
  { value: 'admin', label: 'Admin', description: 'Acceso total al sistema', protected: true },
  { value: 'reviewer', label: 'Revisor', description: 'Puede revisar y aprobar contenido', adminOnly: true },
  { value: 'translator', label: 'Traductor', description: 'Puede traducir y revisar traducciones' },
  { value: 'contributor', label: 'Colaborador', description: 'Puede contribuir con contenido' },
  { value: 'beta_tester', label: 'Beta Tester', description: 'Participa en pruebas beta' },
  { value: 'user', label: 'Usuario', description: 'Usuario estándar' },
];

export default function AdminUsuariosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showTierModal, setShowTierModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    checkAuthorization();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, searchTerm, filterTier]);

  async function checkAuthorization() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push('/');
        return;
      }

      // Verificar si es admin o reviewer
      const { data: profile } = await supabase
        .from('profiles')
        .select('tier_code, tier_codes')
        .eq('id', user.id)
        .single();

      if (!profile) {
        router.push('/');
        return;
      }

      const tiers = profile.tier_codes || [profile.tier_code];
      const isAdmin = tiers.includes('admin');
      const isReviewer = tiers.includes('reviewer');

      if (!isAdmin && !isReviewer) {
        router.push('/');
        return;
      }

      setCurrentUserIsAdmin(isAdmin);
      setAuthorized(true);
      await loadUsers();
    } catch (error) {
      console.error('Error checking authorization:', error);
      router.push('/');
    }
  }

  async function loadUsers() {
    try {
      const { data, error } = await supabase
        .from('v_users_with_tiers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUsers(data || []);
    } catch (err) {
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  }

  function applyFilters() {
    let filtered = users;

    // Filtrar por búsqueda
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.display_name?.toLowerCase().includes(search) ||
          user.email?.toLowerCase().includes(search)
      );
    }

    // Filtrar por tier
    if (filterTier !== 'all') {
      filtered = filtered.filter((user) => user.tier_codes?.includes(filterTier));
    }

    setFilteredUsers(filtered);
  }

  async function addTier(userId: string, tier: string) {
    setProcessing(true);
    try {
      const { data, error } = await supabase.rpc('add_tier_to_user', {
        target_user_id: userId,
        new_tier: tier,
      });

      if (error) throw error;

      if (data) {
        alert(`Tier "${tier}" agregado exitosamente`);
        await loadUsers();
      } else {
        alert('El usuario ya tiene este tier');
      }
    } catch (err: any) {
      console.error('Error adding tier:', err);
      alert(err.message || 'Error al agregar tier');
    } finally {
      setProcessing(false);
    }
  }

  async function removeTier(userId: string, tier: string) {
    // Validaciones del cliente
    const tierInfo = ALL_TIERS.find(t => t.value === tier);

    if (tierInfo?.protected) {
      alert('El tier Admin no puede ser removido por seguridad');
      return;
    }

    if (tierInfo?.adminOnly && !currentUserIsAdmin) {
      alert('Solo los administradores pueden remover el tier Revisor');
      return;
    }

    if (!confirm(`¿Estás seguro de remover el tier "${tierInfo?.label || tier}"?`)) {
      return;
    }

    setProcessing(true);
    try {
      const { data, error } = await supabase.rpc('remove_tier_from_user', {
        target_user_id: userId,
        tier_to_remove: tier,
      });

      if (error) throw error;

      if (data) {
        alert(`Tier "${tier}" removido exitosamente`);
        await loadUsers();
      } else {
        alert('El usuario no tiene este tier');
      }
    } catch (err: any) {
      console.error('Error removing tier:', err);
      alert(err.message || 'Error al remover tier');
    } finally {
      setProcessing(false);
    }
  }

  function openTierModal(user: UserProfile) {
    setSelectedUser(user);
    setShowTierModal(true);
  }

  function closeTierModal() {
    setShowTierModal(false);
    setSelectedUser(null);
  }

  const stats = {
    total: users.length,
    admins: users.filter(u => u.is_admin).length,
    reviewers: users.filter(u => u.is_reviewer).length,
    beta_testers: users.filter(u => u.is_beta_tester).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dungeon-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-gold-500" />
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-500 mb-2 flex items-center gap-3">
            <Users className="w-10 h-10" />
            Gestión de Usuarios
          </h1>
          <p className="text-dungeon-300">
            Administra usuarios y roles - Los usuarios pueden tener múltiples tiers
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-dungeon-800 border-dungeon-700">
            <CardContent className="p-4">
              <p className="text-dungeon-400 text-sm">Total Usuarios</p>
              <p className="text-2xl font-bold text-dungeon-100">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border-red-500/30">
            <CardContent className="p-4">
              <p className="text-red-400 text-sm">Administradores</p>
              <p className="text-2xl font-bold text-red-400">{stats.admins}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border-orange-500/30">
            <CardContent className="p-4">
              <p className="text-orange-400 text-sm">Revisores</p>
              <p className="text-2xl font-bold text-orange-400">{stats.reviewers}</p>
            </CardContent>
          </Card>
          <Card className="bg-dungeon-800 border-blue-500/30">
            <CardContent className="p-4">
              <p className="text-blue-400 text-sm">Beta Testers</p>
              <p className="text-2xl font-bold text-blue-400">{stats.beta_testers}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-dungeon-800 border-dungeon-700">
          <CardContent className="p-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dungeon-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre o email..."
                  className="w-full pl-10 pr-4 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-dungeon-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Tier Filter */}
              <div>
                <select
                  value={filterTier}
                  onChange={(e) => setFilterTier(e.target.value)}
                  className="w-full px-3 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-dungeon-100"
                >
                  <option value="all">Todos los tiers</option>
                  <option value="admin">Administradores</option>
                  <option value="reviewer">Revisores</option>
                  <option value="translator">Traductores</option>
                  <option value="contributor">Colaboradores</option>
                  <option value="beta_tester">Beta Testers</option>
                  <option value="user">Usuarios</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card className="bg-dungeon-800 border-dungeon-700">
          <CardHeader>
            <CardTitle className="text-gold-400">
              Usuarios ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto text-dungeon-600 mb-4" />
                <p className="text-dungeon-400">No se encontraron usuarios</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredUsers.map((user) => {
                  const userTiers = user.tier_codes || [user.tier_code];

                  return (
                    <div
                      key={user.id}
                      className="p-4 bg-dungeon-900 border border-dungeon-700 rounded-lg hover:border-gold-500/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          {/* Avatar */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {user.display_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                          </div>

                          {/* Info */}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-dungeon-100 mb-1">
                              {user.display_name || user.email}
                            </h3>

                            {/* Tier Badges */}
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              {userTiers.map((tier) => {
                                const tierInfo = TIER_BADGES[tier as keyof typeof TIER_BADGES] || TIER_BADGES.user;
                                const TierIcon = tierInfo.icon;
                                const tierConfig = ALL_TIERS.find(t => t.value === tier);
                                const canRemove = currentUserIsAdmin && tier !== 'admin';

                                return (
                                  <div
                                    key={tier}
                                    className={`px-2 py-1 rounded text-xs font-semibold border ${tierInfo.color} flex items-center gap-1.5`}
                                  >
                                    <TierIcon className="w-3 h-3" />
                                    <span>{tierInfo.label}</span>
                                    {canRemove && (
                                      <button
                                        onClick={() => removeTier(user.id, tier)}
                                        disabled={processing}
                                        className="ml-1 hover:text-red-400 transition-colors disabled:opacity-50"
                                        title={`Remover tier ${tierInfo.label}`}
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    )}
                                    {tierConfig?.protected && (
                                      <span title="Tier protegido">
                                        <Shield className="w-3 h-3 text-red-400" />
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4 text-xs text-dungeon-400">
                              <span className="flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                {user.karma_points} karma
                              </span>
                              <span>{user.reports_submitted} reportes</span>
                              <span>{user.reports_resolved} resueltos</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => openTierModal(user)}
                            variant="secondary"
                            className="flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Agregar Tier
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Tier Modal */}
        {showTierModal && selectedUser && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full bg-dungeon-800 border-gold-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-gold-400">
                      Agregar Tier
                    </CardTitle>
                    <p className="text-dungeon-400 text-sm mt-1">
                      {selectedUser.display_name || selectedUser.email}
                    </p>
                  </div>
                  <button
                    onClick={closeTierModal}
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
                      <p className="font-semibold text-blue-300 mb-1">Información importante:</p>
                      <ul className="space-y-1 text-blue-200">
                        <li>• El tier <strong>Admin</strong> no puede ser removido (protegido)</li>
                        <li>• Solo <strong>Admins</strong> pueden remover el tier <strong>Revisor</strong></li>
                        <li>• Los usuarios pueden tener múltiples tiers simultáneamente</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {ALL_TIERS.filter(tier => {
                  const userTiers = selectedUser.tier_codes || [selectedUser.tier_code];
                  return !userTiers.includes(tier.value);
                }).map((tier) => {
                  const tierInfo = TIER_BADGES[tier.value as keyof typeof TIER_BADGES];
                  const TierIcon = tierInfo?.icon || Users;

                  return (
                    <Button
                      key={tier.value}
                      onClick={() => {
                        addTier(selectedUser.id, tier.value);
                        closeTierModal();
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
                      {tier.protected && (
                        <span title="Tier protegido">
                          <Shield className="w-4 h-4 text-red-400" />
                        </span>
                      )}
                      {tier.adminOnly && (
                        <span title="Solo admins pueden remover">
                          <ShieldCheck className="w-4 h-4 text-orange-400" />
                        </span>
                      )}
                    </Button>
                  );
                })}

                {ALL_TIERS.filter(tier => {
                  const userTiers = selectedUser.tier_codes || [selectedUser.tier_code];
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
