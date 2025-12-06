'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  icon?: React.ReactNode;
  subtitle?: string;
  additionalInfo?: {
    label: string;
    value: React.ReactNode;
  };
}

export function InfoModal({
  isOpen,
  onClose,
  title,
  content,
  icon,
  subtitle,
  additionalInfo
}: InfoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dungeon-900 border-dungeon-700 text-dungeon-100 w-[95vw] max-w-2xl max-h-[90vh] md:max-h-[80vh] overflow-y-auto p-4 md:p-6">
        <DialogHeader className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="flex items-center gap-3 text-xl md:text-2xl font-bold text-left leading-tight">
              {icon}
              <span>{title}</span>
            </DialogTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              className="h-8 w-8 -mt-2 -mr-2 text-dungeon-400 hover:text-dungeon-100 p-0"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-2 md:mt-4 space-y-4">
          {subtitle && (
            <div className="text-sm font-semibold text-dungeon-400 uppercase tracking-wide">
              {subtitle}
            </div>
          )}

          <DialogDescription className="text-dungeon-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap text-justify">
            {content}
          </DialogDescription>

          {additionalInfo && (
            <div className="mt-4 pt-4 border-t border-dungeon-700">
              <div className="text-sm font-semibold text-dungeon-400 uppercase tracking-wide mb-2">
                {additionalInfo.label}
              </div>
              <div className="text-dungeon-200">
                {additionalInfo.value}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={onClose} className="w-full md:w-auto">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}