'use client';

import { Badge } from '@/components/ui/Badge';
import Tooltip from '@/components/ui/Tooltip';
import { AlignmentBadge } from '@/components/alignment/AlignmentBadge';
import { Edit2, Trash2, Copy } from 'lucide-react';
import { truncateText } from '@/lib/utils/text';

interface DeityCardProps {
  deity: {
    id: string;
    slug: string;
    name: string;
    alignment?: string;
    portfolio?: string;
    description?: string;
    symbol?: string;
    worshipers?: string;
    home_plane?: string;
  };
  onEdit?: (deityId: string) => void;
  onDelete?: (deityId: string) => void;
  onDuplicate?: (deityId: string) => void;
  isLoading?: boolean;
}

/**
 * DeityCard Component
 * Displays a summary card of a deity with 255-character truncated description.
 * Shows alignment badge, portfolio, and action buttons (edit, delete, duplicate).
 *
 * @param deity - Deity data to display
 * @param onEdit - Callback when edit button is clicked
 * @param onDelete - Callback when delete button is clicked
 * @param onDuplicate - Callback when duplicate button is clicked
 * @param isLoading - Whether the card is in a loading state
 */
export function DeityCard({
  deity,
  onEdit,
  onDelete,
  onDuplicate,
  isLoading = false,
}: DeityCardProps) {
  // Truncate description to 255 characters
  const truncatedDescription = deity.description
    ? truncateText(deity.description, 255)
    : 'Sin descripción disponible';

  const handleEdit = () => onEdit?.(deity.id);
  const handleDelete = () => onDelete?.(deity.id);
  const handleDuplicate = () => onDuplicate?.(deity.id);

  return (
    <div className="card">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-dungeon-800 to-dungeon-900">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gold-400 truncate">
              {deity.name}
            </h3>
            {deity.portfolio && (
              <p className="text-sm text-dungeon-300 truncate mt-1">
                {deity.portfolio}
              </p>
            )}
          </div>
          {deity.alignment && (
            <div className="flex-shrink-0">
              <Tooltip content={`Alineamiento: ${deity.alignment}`} position="left">
                <div>
                  <AlignmentBadge code={deity.alignment} size="sm" />
                </div>
              </Tooltip>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Symbol and Worshipers Info */}
        {(deity.symbol || deity.worshipers) && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {deity.symbol && (
              <div>
                <p className="text-xs text-dungeon-400 font-semibold uppercase">
                  Símbolo
                </p>
                <p className="text-sm text-dungeon-200">
                  {deity.symbol}
                </p>
              </div>
            )}
            {deity.worshipers && (
              <div>
                <p className="text-xs text-dungeon-400 font-semibold uppercase">
                  Adoradores
                </p>
                <p className="text-sm text-dungeon-200">
                  {deity.worshipers}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div className="mb-4">
          <p className="text-xs text-dungeon-400 font-semibold uppercase mb-1">
            Descripción
          </p>
          <p className="text-sm text-dungeon-200 line-clamp-3 leading-relaxed">
            {truncatedDescription}
          </p>
          {deity.description && deity.description.length > 255 && (
            <p className="text-xs text-gold-400 mt-1">
              ... (ver más en detalle)
            </p>
          )}
        </div>

        {/* Home Plane */}
        {deity.home_plane && (
          <div className="mb-4 p-2 bg-dungeon-800/50 rounded border border-dungeon-700">
            <p className="text-xs text-dungeon-400 font-semibold uppercase">
              Plano de Origen
            </p>
            <p className="text-sm text-dungeon-200">
              {deity.home_plane}
            </p>
          </div>
        )}
      </div>

      {/* Footer - Action Buttons */}
      <div className="px-4 py-3 bg-dungeon-900/50 border-t border-dungeon-700 flex gap-2">
        <Tooltip content="Editar deidad" position="top">
          <button
            onClick={handleEdit}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 hover:text-gold-300 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            <Edit2 className="h-4 w-4" />
            Editar
          </button>
        </Tooltip>

        <Tooltip content="Duplicar deidad" position="top">
          <button
            onClick={handleDuplicate}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            <Copy className="h-4 w-4" />
            Duplicar
          </button>
        </Tooltip>

        <Tooltip content="Eliminar deidad" position="top">
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            <Trash2 className="h-4 w-4" />
            Eliminar
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
