'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { MetricCard } from '@/components/admin/MetricCard';
import { ActionCard } from '@/components/admin/ActionCard';
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
  AlertCircle,
  Eye,
  Ban,
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


  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Panel de Administración
        </h1>
        <p className="text-dungeon-400">
          Gestiona contenido, usuarios y configuración de la plataforma
        </p>
      </div>

      {/* Primary Metrics - 4 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Reportes Pendientes"
          value={stats.openTickets}
          icon={AlertCircle}
          color="red"
          trend={
            stats.openTickets > 0
              ? {
                  value: Math.min(stats.openTickets, 20),
                  positive: false,
                  label: 'actualmente',
                }
              : undefined
          }
        />
        <MetricCard
          title="Usuarios Registrados"
          value={stats.totalUsers}
          icon={Users}
          color="blue"
          description="Miembros activos"
        />
        <MetricCard
          title="Contenido Disponible"
          value={
            stats.totalClasses +
            stats.totalRaces +
            stats.totalFeats +
            stats.totalSpells
          }
          icon={BookOpen}
          color="green"
          description="Elementos en total"
        />
        <MetricCard
          title="Deidades Catalogadas"
          value={stats.totalDeities}
          icon={Church}
          color="purple"
          description="Del panteón D&D"
        />
      </div>

      {/* Quick Actions Panel */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActionCard
            title="Ver Reportes Pendientes"
            count={stats.openTickets}
            href="/admin/tickets?status=pending"
            icon={AlertCircle}
            color="red"
            description="Tickets que requieren atención"
          />
          <ActionCard
            title="Gestionar Usuarios"
            count={stats.totalUsers}
            href="/admin/usuarios"
            icon={Users}
            color="blue"
            description="Permisos y restricciones"
          />
          <ActionCard
            title="Moderación de Contenido"
            count={0}
            href="/admin/foro"
            icon={Eye}
            color="orange"
            description="Hilos y respuestas"
          />
        </div>
      </div>

      {/* Content Overview Grid */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          Resumen de Contenido
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div className="card p-4 text-center">
            <p className="text-dungeon-400 text-sm mb-2">Clases</p>
            <p className="text-2xl font-bold text-white">
              {stats.totalClasses}
            </p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-dungeon-400 text-sm mb-2">Razas</p>
            <p className="text-2xl font-bold text-white">
              {stats.totalRaces}
            </p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-dungeon-400 text-sm mb-2">Dotes</p>
            <p className="text-2xl font-bold text-white">
              {stats.totalFeats}
            </p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-dungeon-400 text-sm mb-2">Conjuros</p>
            <p className="text-2xl font-bold text-white">
              {stats.totalSpells}
            </p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-dungeon-400 text-sm mb-2">Deidades</p>
            <p className="text-2xl font-bold text-white">
              {stats.totalDeities}
            </p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-dungeon-400 text-sm mb-2">Total Tickets</p>
            <p className="text-2xl font-bold text-white">
              {stats.totalTickets}
            </p>
          </div>
        </div>
      </div>

      {/* Admin Info Card */}
      <div className="bg-gradient-to-r from-blue-900/20 to-blue-900/10 border border-blue-500/20 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Acceso de Administrador
            </h3>
            <p className="text-sm text-dungeon-400">
              Tienes acceso completo al panel de administración. Usa estos permisos de manera responsable para mantener la integridad de la plataforma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
