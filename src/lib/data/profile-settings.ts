// Profile settings configuration and utilities
import type { ReactNode } from 'react';

export interface FormSection {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
}

export interface LanguageOption {
  value: string;
  label: string;
}

export interface MeasurementOption {
  value: string;
  label: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Português' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];

export const MEASUREMENT_OPTIONS: MeasurementOption[] = [
  { value: 'imperial', label: 'Imperial (pies, libras)' },
  { value: 'metric', label: 'Métrico (metros, kilogramos)' },
];

export interface NotificationToggleConfig {
  id: string;
  label: string;
  description: string;
}

export const NOTIFICATION_TOGGLES: NotificationToggleConfig[] = [
  {
    id: 'emailNotifications',
    label: 'Notificaciones por email',
    description: 'Recibir actualizaciones importantes en tu correo',
  },
  {
    id: 'translationUpdates',
    label: 'Actualizaciones de traducciones',
    description: 'Notificar cuando tus traducciones sean aprobadas o rechazadas',
  },
  {
    id: 'weeklyDigest',
    label: 'Resumen semanal',
    description: 'Recibir un resumen de actividad cada semana',
  },
];

export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  message: 'La contraseña debe tener al menos 8 caracteres.',
  mismatchMessage: 'Las contraseñas no coinciden.',
};

export const FORM_DEFAULTS = {
  displayName: '',
  bio: '',
  preferredLanguage: 'es',
  theme: 'dark',
  discordUsername: '',
  twitterHandle: '',
  newPassword: '',
  confirmPassword: '',
};
