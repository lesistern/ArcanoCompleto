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
  Trash2
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  tier_code: string;
  karma_points: number;
  reports_submitted: number;
  reports_resolved: number;
  total_votes_received: number;
  created_at: string;
}

const TIER_BADGES = {
  admin: { label: 'Admin', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
  reviewer: { label: 'Revisor', color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
  translator: { label: 'Traductor', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
  contributor: { label: 'Colaborador', color: 'text-green-400 border-green-500/30 bg-green-500/10' },
  beta_tester: { label: 'Beta Tester', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
  user: { label: 'Usuario', color: 'text-dungeon-400 border-dungeon-700 bg-dungeon-800' },
};

export default function AdminUsuariosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showTierModal, setShowTierModal] = useState(false);
  const [selectedTierToChange, setSelectedTierToChange] = useState('');
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
        .select('tier_code')
        .eq('id', user.id)
        .single();

      if (!profile || !['admin', 'reviewer'].includes(profile.tier_code)) {
        router.push('/');
        return;
      }

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
        .from('profiles')
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
      filtered = filtered.filter((user) => user.tier_code === filterTier);
    }

    setFilteredUsers(filtered);
  }

  async function changeTier(userId: string, newTier: string) {
    if (!confirm(`¿Estás seguro de cambiar el tier de este usuario a "${newTier}"?`)) {
      return;
    }

    setProcessing(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ tier_code: newTier })
        .eq('id', userId);

      if (error) throw error;

      alert('Tier actualizado exitosamente');
      await loadUsers();
      setShowTierModal(false);
      setSelectedUser(null);
    } catch (err: any) {
      console.error('Error changing tier:', err);
      alert(err.message || 'Error al cambiar tier');
    } finally {
      setProcessing(false);
    }
  }

  function openTierModal(user: UserProfile) {
    setSelectedUser(user);
    setSelectedTierToChange(user.tier_code);
    setShowTierModal(true);
  }

  function closeTierModal() {
    setShowTierModal(false);
    setSelectedUser(null);
    setSelectedTierToChange('');
  }

  const stats = {
    total: users.length,
    admins: users.filter(u => u.tier_code === 'admin').length,
    reviewers: users.filter(u => u.tier_code === 'reviewer').length,
    beta_testers: users.filter(u => u.tier_code === 'beta_tester').length,
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
            Administra usuarios y roles (Solo Admin/Reviewers)
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
                  const tierInfo = TIER_BADGES[user.tier_code as keyof typeof TIER_BADGES] || TIER_BADGES.user;

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

                            {/* Tier Badge */}
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-1 rounded text-xs font-semibold border ${tierInfo.color}`}>
                                {tierInfo.label}
                              </span>
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
                            <UserCog className="w-4 h-4" />
                            Cambiar Tier
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

        {/* Tier Change Modal */}
        {showTierModal && selectedUser && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full bg-dungeon-800 border-gold-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-gold-400">
                      Cambiar Tier
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
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dungeon-200 mb-2">
                    Nuevo Tier
                  </label>
                  <select
                    value={selectedTierToChange}
                    onChange={(e) => setSelectedTierToChange(e.target.value)}
                    className="w-full px-3 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-dungeon-100"
                  >
                    <option value="user">Usuario</option>
                    <option value="beta_tester">Beta Tester</option>
                    <option value="contributor">Colaborador</option>
                    <option value="translator">Traductor</option>
                    <option value="reviewer">Revisor</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                <Button
                  onClick={() => selectedUser && changeTier(selectedUser.id, selectedTierToChange)}
                  disabled={processing || selectedTierToChange === selectedUser.tier_code}
                  className="w-full bg-gold-600 hover:bg-gold-700 flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    'Cambiar Tier'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
