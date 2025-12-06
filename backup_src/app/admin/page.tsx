'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { StatsCard } from './components/StatsCard';
import { QuickActions } from './components/QuickActions';
import { RecentActivity } from './components/RecentActivity';
import {
  Shield,
  Users,
  BookOpen,
  Zap,
  Wand2,
  Sword,
  Church,
  FileText,
  TrendingUp,
  Loader2,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalClasses: number;
  totalRaces: number;
  totalFeats: number;
  totalDeities: number;
  totalSpells: number;
  openTickets: number;
  totalTickets: number;
}

interface ActivityItem {
  id: string;
  type: 'create' | 'update' | 'delete';
  resourceType: string;
  resourceTitle: string;
  resourceHref?: string;
  user: {
    name: string;
    username: string;
  };
  timestamp: Date;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalClasses: 0,
    totalRaces: 0,
    totalFeats: 0,
    totalDeities: 0,
    totalSpells: 0,
    openTickets: 0,
    totalTickets: 0,
  });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    Promise.all([loadStats(), loadRecentActivity()]);
  }, []);

  async function loadStats() {
    try {
      // Fetch all stats in parallel
      const [
        { count: totalUsers },
        { count: totalClasses },
        { count: totalRaces },
        { count: totalFeats },
        { count: totalDeities },
        { count: totalSpells },
        { count: totalTickets },
        { count: openTickets },
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('classes').select('*', { count: 'exact', head: true }),
        supabase.from('races').select('*', { count: 'exact', head: true }),
        supabase.from('feats').select('*', { count: 'exact', head: true }),
        supabase.from('deities').select('*', { count: 'exact', head: true }),
        supabase.from('spells').select('*', { count: 'exact', head: true }),
        supabase.from('feedback_tickets').select('*', { count: 'exact', head: true }),
        supabase.from('feedback_tickets').select('*', { count: 'exact', head: true }).eq('status', 'open'),
      ]);

      setStats({
        totalUsers: totalUsers || 0,
        totalClasses: totalClasses || 0,
        totalRaces: totalRaces || 0,
        totalFeats: totalFeats || 0,
        totalDeities: totalDeities || 0,
        totalSpells: totalSpells || 0,
        totalTickets: totalTickets || 0,
        openTickets: openTickets || 0,
      });
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  }

  async function loadRecentActivity() {
    try {
      // TODO: Implement actual activity tracking with audit logs
      // For now, showing empty state
      setActivities([]);
    } catch (err) {
      console.error('Error loading activity:', err);
    } finally {
      setLoadingActivities(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dungeon-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-gold-500 mb-3" />
          <p className="text-dungeon-400">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      label: 'Nueva Clase',
      href: '/admin/clases',
      icon: BookOpen,
      description: 'Crear clase'
    },
    {
      label: 'Nueva Raza',
      href: '/admin/razas',
      icon: Users,
      description: 'Crear raza'
    },
    {
      label: 'Nueva Dote',
      href: '/admin/dotes',
      icon: Zap,
      description: 'Crear dote'
    },
    {
      label: 'Nuevo Conjuro',
      href: '/admin/conjuros',
      icon: Wand2,
      description: 'Crear conjuro'
    },
    {
      label: 'Nueva Deidad',
      href: '/admin/deidades',
      icon: Church,
      description: 'Crear deidad'
    },
    {
      label: 'Nuevo Objeto',
      href: '/admin/objetos',
      icon: Sword,
      description: 'Crear objeto'
    },
    {
      label: 'Ver Tickets',
      href: '/admin/tickets',
      icon: FileText,
      description: `${stats.openTickets} abiertos`
    },
    {
      label: 'Gestionar Usuarios',
      href: '/admin/usuarios',
      icon: Users,
      description: `${stats.totalUsers} usuarios`
    },
  ];

  return (
    <div className="min-h-screen bg-dungeon-950 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-red-900/20 border border-red-500/30">
              <Shield className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-red-500">
                Panel de Administración
              </h1>
              <p className="text-dungeon-300 mt-1">
                Gestiona contenido, usuarios y configuración de la plataforma
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Usuarios Totales"
            value={stats.totalUsers}
            icon={Users}
            href="/admin/usuarios"
            loading={loading}
          />
          <StatsCard
            title="Clases"
            value={stats.totalClasses}
            icon={BookOpen}
            href="/admin/clases"
            loading={loading}
          />
          <StatsCard
            title="Razas"
            value={stats.totalRaces}
            icon={Users}
            href="/admin/razas"
            loading={loading}
          />
          <StatsCard
            title="Dotes"
            value={stats.totalFeats}
            icon={Zap}
            href="/admin/dotes"
            loading={loading}
          />
          <StatsCard
            title="Conjuros"
            value={stats.totalSpells}
            icon={Wand2}
            href="/admin/conjuros"
            loading={loading}
          />
          <StatsCard
            title="Deidades"
            value={stats.totalDeities}
            icon={Church}
            href="/admin/deidades"
            loading={loading}
          />
          <StatsCard
            title="Tickets Abiertos"
            value={stats.openTickets}
            icon={FileText}
            href="/admin/tickets"
            description={`${stats.totalTickets} total`}
            loading={loading}
          />
          <StatsCard
            title="Reportes Beta"
            value={0}
            icon={TrendingUp}
            href="/admin/reportes"
            loading={loading}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions actions={quickActions} />

        {/* Recent Activity */}
        <RecentActivity
          activities={activities}
          loading={loadingActivities}
        />

        {/* Admin Notice */}
        <div className="bg-blue-900/10 border border-blue-500/30 rounded-lg p-4">
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
        </div>
      </div>
    </div>
  );
}
