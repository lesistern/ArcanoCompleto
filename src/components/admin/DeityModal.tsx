'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlignmentBadge } from '@/components/alignment/AlignmentBadge';
import { X } from 'lucide-react';

interface DeityModalProps {
  isOpen: boolean;
  deity?: {
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
  onClose: () => void;
}

/**
 * DeityModal Component
 * Displays full deity information in a modal dialog.
 * Shows complete description and all fields without truncation.
 *
 * @param isOpen - Whether the modal is open
 * @param deity - Deity data to display (full, untruncated)
 * @param onClose - Callback when modal is closed
 */
export function DeityModal({
  isOpen,
  deity,
  onClose,
}: DeityModalProps) {
  if (!deity) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-dungeon-900 border-dungeon-700">
        {/* Header */}
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gold-400">
                {deity.name}
              </DialogTitle>
              {deity.portfolio && (
                <DialogDescription className="text-dungeon-300 text-base mt-2">
                  {deity.portfolio}
                </DialogDescription>
              )}
            </div>
            {deity.alignment && (
              <div className="flex-shrink-0 pt-1">
                <AlignmentBadge code={deity.alignment} size="md" />
              </div>
            )}
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-6 py-4">
          {/* Full Description */}
          {deity.description && (
            <div>
              <h3 className="text-sm font-bold text-dungeon-300 uppercase mb-3 tracking-wide">
                Descripción Completa
              </h3>
              <p className="text-dungeon-200 leading-relaxed whitespace-pre-wrap">
                {deity.description}
              </p>
            </div>
          )}

          {/* Grid of Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Symbol */}
            {deity.symbol && (
              <div className="p-4 bg-dungeon-800/50 rounded-lg border border-dungeon-700">
                <p className="text-xs text-dungeon-400 font-bold uppercase mb-2 tracking-wide">
                  Símbolo
                </p>
                <p className="text-dungeon-100 text-base">
                  {deity.symbol}
                </p>
              </div>
            )}

            {/* Worshipers */}
            {deity.worshipers && (
              <div className="p-4 bg-dungeon-800/50 rounded-lg border border-dungeon-700">
                <p className="text-xs text-dungeon-400 font-bold uppercase mb-2 tracking-wide">
                  Adoradores
                </p>
                <p className="text-dungeon-100 text-base">
                  {deity.worshipers}
                </p>
              </div>
            )}

            {/* Home Plane */}
            {deity.home_plane && (
              <div className="p-4 bg-dungeon-800/50 rounded-lg border border-dungeon-700">
                <p className="text-xs text-dungeon-400 font-bold uppercase mb-2 tracking-wide">
                  Plano de Origen
                </p>
                <p className="text-dungeon-100 text-base">
                  {deity.home_plane}
                </p>
              </div>
            )}

            {/* Alignment Info */}
            {deity.alignment && (
              <div className="p-4 bg-dungeon-800/50 rounded-lg border border-dungeon-700">
                <p className="text-xs text-dungeon-400 font-bold uppercase mb-2 tracking-wide">
                  Alineamiento
                </p>
                <p className="text-dungeon-100 text-base">
                  {deity.alignment}
                </p>
              </div>
            )}
          </div>

          {/* Slug Info (for reference) */}
          <div className="pt-4 border-t border-dungeon-700">
            <p className="text-xs text-dungeon-500 font-mono">
              Slug: {deity.slug}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
