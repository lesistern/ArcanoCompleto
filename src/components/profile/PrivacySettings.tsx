'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, MapPin, Users, Activity, Loader2, Lock, Unlock, AlertTriangle, Sparkles, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { SaveStatusIndicator, SaveStatus } from '@/components/ui/SaveStatusIndicator';

interface PrivacySettingsProps {
  userId: string;
  currentData: {
    show_email: boolean;
    show_location: boolean;
    show_characters: boolean;
    show_activity: boolean;
    profile_hidden: boolean;
  };
  onUpdate: (data: Partial<PrivacySettingsProps['currentData']>) => void;
}

interface PrivacyToggle {
  id: keyof PrivacySettingsProps['currentData'];
  label: string;
  description: string;
  icon: React.ReactNode;
  warning?: string;
  isDestructive?: boolean;
}

const PRIVACY_TOGGLES: PrivacyToggle[] = [
  {
    id: 'profile_hidden',
    label: 'Ocultar perfil completo',
    description: 'Tu perfil no será visible para otros usuarios (excepto administradores)',
    icon: <EyeOff className="w-4 h-4" />,
    warning: 'Esto ocultará todo tu perfil de la vista pública',
    isDestructive: true,
  },
  {
    id: 'show_email',
    label: 'Mostrar email',
    description: 'Permitir que otros vean tu dirección de correo',
    icon: <Mail className="w-4 h-4" />,
  },
  {
    id: 'show_location',
    label: 'Mostrar ubicación',
    description: 'Mostrar tu ubicación en tu perfil público',
    icon: <MapPin className="w-4 h-4" />,
  },
  {
    id: 'show_characters',
    label: 'Mostrar personajes',
    description: 'Permitir que otros vean tus personajes guardados',
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: 'show_activity',
    label: 'Mostrar actividad',
    description: 'Mostrar tu historial de actividad reciente',
    icon: <Activity className="w-4 h-4" />,
  },
];

export function PrivacySettings({
  userId,
  currentData,
  onUpdate,
}: PrivacySettingsProps) {
  const [values, setValues] = useState(currentData);
  const [saveStatus, setSaveStatus] = useState<Record<string, SaveStatus>>({
    profile_hidden: 'idle',
    show_email: 'idle',
    show_location: 'idle',
    show_characters: 'idle',
    show_activity: 'idle',
  });
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleToggle = async (toggle: PrivacyToggle) => {
    const newValue = !values[toggle.id];
    setSaveStatus(prev => ({ ...prev, [toggle.id]: 'saving' }));
    setError(null);

    // Optimistic update
    setValues((prev) => ({ ...prev, [toggle.id]: newValue }));

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ [toggle.id]: newValue })
        .eq('id', userId);

      if (updateError) throw updateError;

      setSaveStatus(prev => ({ ...prev, [toggle.id]: 'saved' }));
      onUpdate({ [toggle.id]: newValue });

      // Reset to idle after 2 seconds
      setTimeout(() => {
        setSaveStatus(prev => ({ ...prev, [toggle.id]: 'idle' }));
      }, 2000);
    } catch (err: any) {
      // Revert on error
      setValues((prev) => ({ ...prev, [toggle.id]: !newValue }));
      setSaveStatus(prev => ({ ...prev, [toggle.id]: 'error' }));
      setError(err.message || 'Error al guardar');
    }
  };

  // Count visible items
  const visibleCount = [
    values.show_email,
    values.show_location,
    values.show_characters,
    values.show_activity,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Error */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="p-1 hover:bg-red-500/20 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Toggles */}
      <div className="space-y-3">
        {PRIVACY_TOGGLES.map((toggle) => {
          const isEnabled = values[toggle.id];
          const isDestructive = toggle.isDestructive;
          const status = saveStatus[toggle.id];

          return (
            <div
              key={toggle.id}
              className={`p-4 rounded-xl border transition-all ${
                isDestructive
                  ? 'bg-red-500/5 border-red-500/30'
                  : 'bg-dungeon-800/50 border-dungeon-700 hover:border-dungeon-600'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    isDestructive
                      ? 'bg-red-500/20'
                      : isEnabled
                        ? 'bg-green-500/20'
                        : 'bg-dungeon-700/50'
                  }`}>
                    <span className={
                      isDestructive
                        ? 'text-red-400'
                        : isEnabled
                          ? 'text-green-400'
                          : 'text-dungeon-400'
                    }>
                      {toggle.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium text-sm ${isDestructive ? 'text-red-300' : 'text-dungeon-100'}`}>
                        {toggle.label}
                      </p>
                      <SaveStatusIndicator status={status} showLabel={false} />
                    </div>
                    <p className="text-xs text-dungeon-400 mt-0.5 truncate">
                      {toggle.description}
                    </p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={() => handleToggle(toggle)}
                  disabled={status === 'saving'}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all flex-shrink-0
                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dungeon-900
                             disabled:opacity-50 ${
                    isEnabled
                      ? isDestructive
                        ? 'bg-red-500 focus:ring-red-500/50'
                        : 'bg-green-500 focus:ring-green-500/50'
                      : 'bg-dungeon-600 focus:ring-dungeon-500/50'
                  }`}
                >
                  {status === 'saving' ? (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-3 h-3 animate-spin text-white" />
                    </span>
                  ) : (
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${
                        isEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  )}
                </button>
              </div>

              {toggle.warning && isEnabled && (
                <div className="mt-3 p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-xs text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                    {toggle.warning}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Privacy Summary */}
      <div className="p-4 bg-dungeon-800/30 border border-dungeon-700/50 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4 text-purple-400" />
          <h4 className="text-sm font-medium text-dungeon-200">Resumen de visibilidad</h4>
        </div>

        {/* Profile Status */}
        <div className="flex items-center justify-between p-3 bg-dungeon-900/50 rounded-lg mb-3">
          <div className="flex items-center gap-2">
            {values.profile_hidden ? (
              <Lock className="w-4 h-4 text-red-400" />
            ) : (
              <Unlock className="w-4 h-4 text-green-400" />
            )}
            <span className="text-sm text-dungeon-300">Estado del perfil</span>
          </div>
          <span className={`text-sm font-medium px-2 py-0.5 rounded ${
            values.profile_hidden
              ? 'bg-red-500/20 text-red-400'
              : 'bg-green-500/20 text-green-400'
          }`}>
            {values.profile_hidden ? 'Oculto' : 'Público'}
          </span>
        </div>

        {/* Visible Items */}
        {!values.profile_hidden ? (
          <>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'show_email', icon: Mail, label: 'Email' },
                { key: 'show_location', icon: MapPin, label: 'Ubicación' },
                { key: 'show_characters', icon: Users, label: 'Personajes' },
                { key: 'show_activity', icon: Activity, label: 'Actividad' },
              ].map(({ key, icon: Icon, label }) => {
                const isVisible = values[key as keyof typeof values];
                return (
                  <div
                    key={key}
                    className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                      isVisible ? 'bg-green-500/10 text-green-400' : 'bg-dungeon-900/50 text-dungeon-500'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                    <span className="ml-auto">{isVisible ? '✓' : '✗'}</span>
                  </div>
                );
              })}
            </div>

            {/* Counter */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-dungeon-700/50">
              <span className="text-xs text-dungeon-400">
                {visibleCount} de 4 secciones visibles
              </span>
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i < visibleCount ? 'bg-green-400' : 'bg-dungeon-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <EyeOff className="w-8 h-8 text-dungeon-600 mx-auto mb-2" />
            <p className="text-sm text-dungeon-500">
              Nadie puede ver tu perfil mientras esté oculto
            </p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="flex items-start gap-3 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
        <div className="p-1.5 bg-purple-500/20 rounded-lg flex-shrink-0">
          <Sparkles className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <p className="text-sm text-purple-300 font-medium">Tu privacidad es importante</p>
          <p className="text-xs text-dungeon-400 mt-0.5">
            Los cambios se guardan automáticamente. Los administradores siempre pueden ver perfiles ocultos.
          </p>
        </div>
      </div>
    </div>
  );
}
