'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
      <DialogContent className="bg-dungeon-900 border-dungeon-700 text-dungeon-100 max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            {icon}
            <span>{title}</span>
          </DialogTitle>
          <Button
            onClick={onClose}
            className="absolute right-4 top-4 h-8 w-8 p-0"
            variant="ghost"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </Button>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {subtitle && (
            <div className="text-sm font-semibold text-dungeon-400 uppercase tracking-wide">
              {subtitle}
            </div>
          )}

          <div className="text-dungeon-200 leading-relaxed whitespace-pre-wrap">
            {content}
          </div>

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
      </DialogContent>
    </Dialog>
  );
}