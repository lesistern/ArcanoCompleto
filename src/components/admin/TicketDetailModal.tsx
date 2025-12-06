'use client';

import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type FeedbackStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'wont_fix' | 'pending';

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: FeedbackStatus;
  user_email: string;
  created_at: string;
  browser_info: string | null;
  resolution_notes: string | null;
}

interface TicketDetailModalProps {
  ticket: Ticket | null;
  resolutionNotes: string;
  updating: boolean;
  onClose: () => void;
  onResolutionNotesChange: (notes: string) => void;
  onStatusChange: (ticketId: string, newStatus: FeedbackStatus) => Promise<void>;
  priorities: Record<string, { label: string; color: string }>;
  categories: Record<string, { label: string }>;
}

export function TicketDetailModal({
  ticket,
  resolutionNotes,
  updating,
  onClose,
  onResolutionNotesChange,
  onStatusChange,
  priorities,
  categories,
}: TicketDetailModalProps) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-dungeon-800 border-gold-500">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-gold-400 mb-2 font-heading">{ticket.title}</CardTitle>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full text-white ${priorities[ticket.priority].color}`}>
                  {priorities[ticket.priority].label}
                </span>
                <span className="text-dungeon-400 text-sm">
                  {categories[ticket.category].label}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-dungeon-400 hover:text-dungeon-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-dungeon-400 mb-1">Descripción:</p>
            <p className="text-dungeon-200">{ticket.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-dungeon-400">Usuario:</p>
              <p className="text-dungeon-200">{ticket.user_email}</p>
            </div>
            <div>
              <p className="text-dungeon-400">Fecha:</p>
              <p className="text-dungeon-200">
                {new Date(ticket.created_at).toLocaleString('es-ES')}
              </p>
            </div>
          </div>

          {ticket.browser_info && (
            <div>
              <p className="text-sm text-dungeon-400 mb-1">Navegador:</p>
              <p className="text-xs text-dungeon-300 font-mono">{ticket.browser_info}</p>
            </div>
          )}

          {ticket.resolution_notes && (
            <div>
              <p className="text-sm text-dungeon-400 mb-1">Notas de resolución:</p>
              <p className="text-dungeon-200">{ticket.resolution_notes}</p>
            </div>
          )}

          {ticket.status === 'open' && (
            <div>
              <label className="block text-sm text-dungeon-400 mb-2">
                Notas de resolución (opcional):
              </label>
              <textarea
                value={resolutionNotes}
                onChange={(e) => onResolutionNotesChange(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-dungeon-100 input"
                placeholder="Añade notas sobre cómo se resolvió..."
              />
            </div>
          )}

          <div className="flex gap-2">
            {ticket.status === 'open' && (
              <>
                <Button
                  onClick={() => onStatusChange(ticket.id, 'in_progress')}
                  disabled={updating}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                >
                  Marcar En Progreso
                </Button>
                <Button
                  onClick={() => onStatusChange(ticket.id, 'resolved')}
                  disabled={updating}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Marcar Resuelto
                </Button>
              </>
            )}
            {ticket.status === 'in_progress' && (
              <Button
                onClick={() => onStatusChange(ticket.id, 'resolved')}
                disabled={updating}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Marcar Resuelto
              </Button>
            )}
            {ticket.status !== 'open' && (
              <Button
                onClick={() => onStatusChange(ticket.id, 'open')}
                disabled={updating}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Reabrir
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
