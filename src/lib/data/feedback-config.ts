import { LucideIcon } from 'lucide-react';
import {
  Bug,
  Lightbulb,
  Languages,
  Database,
  Palette,
  Zap,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

export type FeedbackCategory = 'bug' | 'feature' | 'translation' | 'data' | 'ui' | 'performance' | 'other';
export type FeedbackPriority = 'low' | 'medium' | 'high' | 'critical';
export type FeedbackStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'wont_fix';

export interface CategoryConfig {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

export interface PriorityConfig {
  value: string;
  label: string;
  color: string;
}

export interface StatusConfig {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

export interface StatusLabel {
  label: string;
  icon: LucideIcon;
  color: string;
}

export const FEEDBACK_CATEGORIES: CategoryConfig[] = [
  { value: 'all', label: 'Todas', icon: MessageSquare, color: 'text-gray-400' },
  { value: 'bug', label: 'Bug / Error', icon: Bug, color: 'text-red-400' },
  { value: 'feature', label: 'Nueva funcionalidad', icon: Lightbulb, color: 'text-yellow-400' },
  { value: 'translation', label: 'Error de traducción', icon: Languages, color: 'text-blue-400' },
  { value: 'data', label: 'Error en datos', icon: Database, color: 'text-purple-400' },
  { value: 'ui', label: 'Problema de UI/Diseño', icon: Palette, color: 'text-pink-400' },
  { value: 'performance', label: 'Rendimiento', icon: Zap, color: 'text-orange-400' },
  { value: 'other', label: 'Otro', icon: MessageSquare, color: 'text-gray-400' },
];

export const FEEDBACK_PRIORITIES: PriorityConfig[] = [
  { value: 'all', label: 'Todas', color: 'bg-gray-500' },
  { value: 'low', label: 'Baja', color: 'bg-gray-500' },
  { value: 'medium', label: 'Media', color: 'bg-blue-500' },
  { value: 'high', label: 'Alta', color: 'bg-orange-500' },
  { value: 'critical', label: 'Crítica', color: 'bg-red-500' },
];

export const FEEDBACK_STATUSES: StatusConfig[] = [
  { value: 'all', label: 'Todos', icon: MessageSquare, color: 'text-gray-400' },
  { value: 'open', label: 'Abierto', icon: Clock, color: 'text-blue-400' },
  { value: 'in_progress', label: 'En progreso', icon: Loader2, color: 'text-yellow-400' },
  { value: 'resolved', label: 'Resuelto', icon: CheckCircle, color: 'text-green-400' },
  { value: 'closed', label: 'Cerrado', icon: CheckCircle, color: 'text-gray-400' },
  { value: 'wont_fix', label: 'No se arreglará', icon: AlertTriangle, color: 'text-red-400' },
];

export const FEEDBACK_STATUS_LABELS: Record<FeedbackStatus, StatusLabel> = {
  open: { label: 'Abierto', icon: Clock, color: 'text-blue-400' },
  in_progress: { label: 'En progreso', icon: Loader2, color: 'text-yellow-400' },
  resolved: { label: 'Resuelto', icon: CheckCircle, color: 'text-green-400' },
  closed: { label: 'Cerrado', icon: CheckCircle, color: 'text-gray-400' },
  wont_fix: { label: 'No se arreglará', icon: AlertTriangle, color: 'text-red-400' },
};

export function getCategoryConfig(value: string): CategoryConfig | undefined {
  return FEEDBACK_CATEGORIES.find((cat) => cat.value === value);
}

export function getPriorityConfig(value: string): PriorityConfig | undefined {
  return FEEDBACK_PRIORITIES.find((pri) => pri.value === value);
}

export function getStatusConfig(value: string): StatusConfig | undefined {
  return FEEDBACK_STATUSES.find((stat) => stat.value === value);
}

export function getStatusLabel(status: FeedbackStatus): StatusLabel {
  return FEEDBACK_STATUS_LABELS[status];
}
