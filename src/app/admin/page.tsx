'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Shield,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Activity,
  Loader2
} from 'lucide-react';

interface DashboardStats {
  total_users: number;
  total_tickets: number;
  open_tickets: number;
  resolved_tickets: number;
  total_reports: number;
  pending_reports: number;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    total_users: 0,
    total_tickets: 0,
    open_tickets: 0,
    resolved_tickets: 0,
    total_reports: 0,
    pending_reports: 0,
  });

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuthorization();
  }, []);

  async function checkAuthorization() {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
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
      await loadStats();
    } catch (err) {
      console.error('Error checking authorization:', err);
      router.push('/');
    }
  }

  async function loadStats() {
    try {
      // Obtener estadísticas de usuarios
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Obtener estadísticas de tickets
      const { count: totalTickets } = await supabase
        .from('feedback_tickets')
        .select('*', { count: 'exact', head: true });

      const { count: openTickets } = await supabase
        .from('feedback_tickets')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'open');

      const { count: resolvedTickets } = await supabase
        .from('feedback_tickets')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'resolved');

      setStats({
        total_users: totalUsers || 0,
        total_tickets: totalTickets || 0,
        open_tickets: openTickets || 0,
        resolved_tickets: resolvedTickets || 0,
        total_reports: 0,
        pending_reports: 0,
      });
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  }

  if (!authorized && !loading) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dungeon-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-gold-500 mb-3" />
          <p className="text-dungeon-400">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-10 h-10 text-red-500" />
            <h1 className="text-4xl font-bold text-red-500">Panel de Administración</h1>
          </div>
          <p className="text-dungeon-300">
            Gestiona usuarios, reportes de feedback y contenido de la plataforma
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-900/20 to-dungeon-800 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300 mb-1">Usuarios Totales</p>
                  <p className="text-3xl font-bold text-blue-400">{stats.total_users}</p>
                </div>
                <Users className="w-12 h-12 text-blue-400 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-dungeon-800 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-300 mb-1">Tickets Abiertos</p>
                  <p className="text-3xl font-bold text-yellow-400">{stats.open_tickets}</p>
                </div>
                <AlertCircle className="w-12 h-12 text-yellow-400 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-dungeon-800 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-300 mb-1">Tickets Resueltos</p>
                  <p className="text-3xl font-bold text-green-400">{stats.resolved_tickets}</p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-400 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-dungeon-800 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300 mb-1">Total Tickets</p>
                  <p className="text-3xl font-bold text-purple-400">{stats.total_tickets}</p>
                </div>
                <Activity className="w-12 h-12 text-purple-400 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/tickets">
            <Card className="bg-dungeon-800 border-dungeon-700 hover:border-gold-500 transition-all cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gold-400 group-hover:text-gold-300">
                  <FileText className="w-6 h-6" />
                  Gestión de Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-dungeon-300 text-sm mb-4">
                  Administra y responde a los tickets de feedback de los usuarios
                </p>
                <div className="flex items-center justify-between text-xs text-dungeon-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {stats.open_tickets} pendientes
                  </span>
                  <span className="text-gold-400 group-hover:text-gold-300">
                    Ver todos →
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/usuarios">
            <Card className="bg-dungeon-800 border-dungeon-700 hover:border-gold-500 transition-all cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gold-400 group-hover:text-gold-300">
                  <Users className="w-6 h-6" />
                  Gestión de Usuarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-dungeon-300 text-sm mb-4">
                  Administra usuarios, roles y permisos del sistema
                </p>
                <div className="flex items-center justify-between text-xs text-dungeon-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {stats.total_users} usuarios
                  </span>
                  <span className="text-gold-400 group-hover:text-gold-300">
                    Ver todos →
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/reportes">
            <Card className="bg-dungeon-800 border-dungeon-700 hover:border-gold-500 transition-all cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gold-400 group-hover:text-gold-300">
                  <TrendingUp className="w-6 h-6" />
                  Reportes Beta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-dungeon-300 text-sm mb-4">
                  Visualiza y gestiona los reportes de beta testing
                </p>
                <div className="flex items-center justify-between text-xs text-dungeon-400">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    Sistema de karma
                  </span>
                  <span className="text-gold-400 group-hover:text-gold-300">
                    Ver estadísticas →
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-900/10 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-300 font-semibold mb-1">
                  Acceso de Administrador
                </p>
                <p className="text-sm text-blue-200">
                  Tienes acceso completo al panel de administración. Usa estos permisos de manera responsable.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
