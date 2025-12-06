'use client';

import { Card, CardContent } from '@/components/ui/Card';

interface TicketsStatsProps {
  stats: {
    total: number;
    pending: number;
    open: number;
    in_progress: number;
    resolved: number;
    critical: number;
  };
}

export function TicketsStats({ stats }: TicketsStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
      <Card className="card">
        <CardContent className="p-4">
          <p className="text-dungeon-400 text-sm">Total</p>
          <p className="text-2xl font-bold text-dungeon-100 font-heading">{stats.total}</p>
        </CardContent>
      </Card>
      <Card className="card border-yellow-500/30">
        <CardContent className="p-4">
          <p className="text-yellow-400 text-sm">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-400 font-heading">{stats.pending}</p>
        </CardContent>
      </Card>
      <Card className="card border-blue-500/30">
        <CardContent className="p-4">
          <p className="text-blue-400 text-sm">Abiertos</p>
          <p className="text-2xl font-bold text-blue-400 font-heading">{stats.open}</p>
        </CardContent>
      </Card>
      <Card className="card border-yellow-500/30">
        <CardContent className="p-4">
          <p className="text-yellow-400 text-sm">En Progreso</p>
          <p className="text-2xl font-bold text-yellow-400 font-heading">{stats.in_progress}</p>
        </CardContent>
      </Card>
      <Card className="card border-green-500/30">
        <CardContent className="p-4">
          <p className="text-green-400 text-sm">Resueltos</p>
          <p className="text-2xl font-bold text-green-400 font-heading">{stats.resolved}</p>
        </CardContent>
      </Card>
      <Card className="card border-red-500/30">
        <CardContent className="p-4">
          <p className="text-red-400 text-sm">Críticos</p>
          <p className="text-2xl font-bold text-red-400 font-heading">{stats.critical}</p>
        </CardContent>
      </Card>
    </div>
  );
}
