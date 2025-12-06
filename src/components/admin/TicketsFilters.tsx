'use client';

import { Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

type FeedbackCategory = 'bug' | 'feature' | 'translation' | 'data' | 'ui' | 'performance' | 'other';
type FeedbackPriority = 'low' | 'medium' | 'high' | 'critical';
type FeedbackStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'wont_fix' | 'pending';

interface TicketsFiltersProps {
  filterCategory: FeedbackCategory | 'all';
  filterStatus: FeedbackStatus | 'all';
  filterPriority: FeedbackPriority | 'all';
  onCategoryChange: (category: FeedbackCategory | 'all') => void;
  onStatusChange: (status: FeedbackStatus | 'all') => void;
  onPriorityChange: (priority: FeedbackPriority | 'all') => void;
  categories: Record<FeedbackCategory, any>;
  statusFilters: Array<{ value: FeedbackStatus | 'all'; label: string }>;
  priorities: Record<FeedbackPriority, { label: string }>;
}

export function TicketsFilters({
  filterCategory,
  filterStatus,
  filterPriority,
  onCategoryChange,
  onStatusChange,
  onPriorityChange,
  categories,
  statusFilters,
  priorities,
}: TicketsFiltersProps) {
  return (
    <Card className="card mb-6">
      <CardHeader>
        <CardTitle className="text-gold-400 flex items-center gap-2 font-heading">
          <Filter className="w-5 h-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-dungeon-300 mb-2">
              Categoría
            </label>
            <select
              value={filterCategory}
              onChange={(e) => onCategoryChange(e.target.value as any)}
              className="w-full px-3 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-dungeon-100 input"
            >
              <option value="all">Todas</option>
              {Object.entries(categories).map(([key, cat]) => (
                key !== 'all' && <option key={key} value={key}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-dungeon-300 mb-2">
              Estado
            </label>
            <select
              value={filterStatus}
              onChange={(e) => onStatusChange(e.target.value as any)}
              className="w-full px-3 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-dungeon-100 input"
            >
              {statusFilters.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-dungeon-300 mb-2">
              Prioridad
            </label>
            <select
              value={filterPriority}
              onChange={(e) => onPriorityChange(e.target.value as any)}
              className="w-full px-3 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-dungeon-100 input"
            >
              <option value="all">Todas</option>
              {Object.entries(priorities).map(([key, prio]) => (
                <option key={key} value={key}>{prio.label}</option>
              ))}
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
