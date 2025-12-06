'use client';

import { useState, useEffect } from 'react';
import {
  Bell,
  Mail,
  MessageSquare,
  Trophy,
  TrendingUp,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface NotificationPreferences {
  email_forum_replies: boolean;
  email_votes_received: boolean;
  email_achievements: boolean;
  email_level_ups: boolean;
  email_weekly_digest: boolean;
  email_announcements: boolean;
}

interface NotificationsSettingsProps {
  userId: string;
}

const NOTIFICATION_OPTIONS = [
  {
    key: 'email_forum_replies' as const,
    label: 'Respuestas en el foro',
    description: 'Cuando alguien responde a tus hilos o te menciona',
    icon: MessageSquare,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    key: 'email_votes_received' as const,
    label: 'Votos recibidos',
    description: 'Cuando alguien vota positivamente tus reportes o respuestas',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    key: 'email_achievements' as const,
    label: 'Logros desbloqueados',
    description: 'Cuando desbloqueas una nueva insignia o logro',
    icon: Trophy,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
  {
    key: 'email_level_ups' as const,
    label: 'Subidas de nivel',
    description: 'Cuando subes de nivel por tu experiencia acumulada',
    icon: TrendingUp,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    key: 'email_weekly_digest' as const,
    label: 'Resumen semanal',
    description: 'Un resumen de actividad y novedades cada semana',
    icon: FileText,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
  {
    key: 'email_announcements' as const,
    label: 'Anuncios importantes',
    description: 'Actualizaciones del sitio y nuevas funcionalidades',
    icon: Bell,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
  },
];

export function NotificationsSettings({ userId }: NotificationsSettingsProps) {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email_forum_replies: true,
    email_votes_received: false,
    email_achievements: true,
    email_level_ups: true,
    email_weekly_digest: false,
    email_announcements: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  // Load preferences from localStorage (or could be from DB)
  useEffect(() => {
    const stored = localStorage.getItem('notification_preferences');
    if (stored) {
      try {
        setPreferences(JSON.parse(stored));
      } catch {
        // Use defaults
      }
    }
    setLoading(false);
  }, []);

  const handleToggle = async (key: keyof NotificationPreferences) => {
    setSaving(key);
    setError(null);

    const newValue = !preferences[key];
    const newPreferences = { ...preferences, [key]: newValue };

    // Simulate network delay for better UX feedback
    await new Promise(resolve => setTimeout(resolve, 300));

    setPreferences(newPreferences);
    localStorage.setItem('notification_preferences', JSON.stringify(newPreferences));

    setSaving(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <Mail className="w-5 h-5 text-blue-400 mt-0.5" />
        <div>
          <p className="text-sm text-dungeon-200">
            Configura qué notificaciones deseas recibir por correo electrónico.
          </p>
          <p className="text-xs text-dungeon-400 mt-1">
            Las notificaciones en el sitio siempre están activas.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-sm text-red-400">{error}</span>
        </div>
      )}

      {/* Notification Toggles */}
      <div className="space-y-3">
        {NOTIFICATION_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isEnabled = preferences[option.key];
          const isSaving = saving === option.key;

          return (
            <div
              key={option.key}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                isEnabled
                  ? 'bg-dungeon-700/30 border-dungeon-600/50'
                  : 'bg-dungeon-800/30 border-dungeon-700/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${option.bgColor}`}>
                  <Icon className={`w-5 h-5 ${option.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-dungeon-100">{option.label}</p>
                  <p className="text-xs text-dungeon-400 mt-0.5">{option.description}</p>
                </div>
              </div>

              <button
                onClick={() => handleToggle(option.key)}
                disabled={isSaving}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                  isEnabled ? 'bg-gold-500' : 'bg-dungeon-600'
                } ${isSaving ? 'opacity-50' : ''}`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 flex items-center justify-center ${
                    isEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                >
                  {isSaving && (
                    <Loader2 className="w-3 h-3 text-dungeon-600 animate-spin" />
                  )}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-dungeon-700/50">
        <button
          onClick={() => {
            const allEnabled: NotificationPreferences = {
              email_forum_replies: true,
              email_votes_received: true,
              email_achievements: true,
              email_level_ups: true,
              email_weekly_digest: true,
              email_announcements: true,
            };
            setPreferences(allEnabled);
            localStorage.setItem('notification_preferences', JSON.stringify(allEnabled));
          }}
          className="px-4 py-2 text-sm text-dungeon-300 hover:text-dungeon-100 bg-dungeon-700/50 hover:bg-dungeon-700 rounded-lg transition-colors"
        >
          Activar todas
        </button>
        <button
          onClick={() => {
            const allDisabled: NotificationPreferences = {
              email_forum_replies: false,
              email_votes_received: false,
              email_achievements: false,
              email_level_ups: false,
              email_weekly_digest: false,
              email_announcements: false,
            };
            setPreferences(allDisabled);
            localStorage.setItem('notification_preferences', JSON.stringify(allDisabled));
          }}
          className="px-4 py-2 text-sm text-dungeon-300 hover:text-dungeon-100 bg-dungeon-700/50 hover:bg-dungeon-700 rounded-lg transition-colors"
        >
          Desactivar todas
        </button>
      </div>
    </div>
  );
}
