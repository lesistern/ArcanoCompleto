'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BookOpen } from 'lucide-react';
import { InfoModal } from './InfoModal';

interface InfoCardProps {
  title: string;
  summary: string;
  fullContent: string;
  icon: React.ReactNode;
  iconColor?: string;
  subtitle?: string;
  additionalInfo?: {
    label: string;
    value: React.ReactNode;
  };
  noTruncate?: boolean;
}

export function InfoCard({
  title,
  summary,
  fullContent,
  icon,
  iconColor,
  subtitle,
  additionalInfo,
  noTruncate = false
}: InfoCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="border-dungeon-700 bg-dungeon-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className={iconColor}>
              {icon}
            </div>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {subtitle && (
            <div className="text-xs font-semibold text-dungeon-400 uppercase tracking-wide">
              {subtitle}
            </div>
          )}

          <p className={`text-dungeon-200 text-sm leading-relaxed ${noTruncate ? '' : 'line-clamp-2'}`}>
            {summary}
          </p>

          {additionalInfo && (
            <div className="text-xs">
              <span className="font-semibold text-dungeon-400 uppercase tracking-wide">
                {additionalInfo.label}:{' '}
              </span>
              <span className="text-dungeon-200">
                {additionalInfo.value}
              </span>
            </div>
          )}

          {!noTruncate && (
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="ghost"
              className="mt-2 text-gold-400 hover:text-gold-300 p-0 h-auto font-medium text-sm"
            >
              <BookOpen className="h-3 w-3 mr-1" />
              Leer más
            </Button>
          )}
        </CardContent>
      </Card>

      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        content={fullContent}
        icon={icon}
        subtitle={subtitle}
        additionalInfo={additionalInfo}
      />
    </>
  );
}