'use client';

import { useState, useEffect } from 'react';
import {
  Laptop,
  Smartphone,
  Monitor,
  Globe,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Clock,
  MapPin,
  Info,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// Provider icons (SVG components)
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" fill="#5865F2" />
  </svg>
);

interface Session {
  id: string;
  device_type: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  location: string;
  last_active: string;
  is_current: boolean;
}

interface ConnectedAccount {
  provider: 'google' | 'discord';
  email: string;
  connected_at: string;
}

interface ConnectionsSettingsProps {
  userId: string;
  userEmail: string;
}

const PROVIDER_CONFIG = {
  google: {
    name: 'Google',
    icon: GoogleIcon,
    color: 'text-white',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    description: 'Inicia sesión con tu cuenta de Google',
  },
  discord: {
    name: 'Discord',
    icon: DiscordIcon,
    color: 'text-[#5865F2]',
    bgColor: 'bg-[#5865F2]',
    borderColor: 'border-[#5865F2]',
    description: 'Conecta tu cuenta de Discord',
  },
};

const DEVICE_ICONS = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Laptop,
};

export function ConnectionsSettings({ userId, userEmail }: ConnectionsSettingsProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    // Simulate loading connected accounts and sessions
    // In a real implementation, you'd fetch from Supabase
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock data - in production, fetch from auth.identities
      setConnectedAccounts([]);

      // Mock sessions - in production, fetch from auth.sessions
      setSessions([
        {
          id: 'current',
          device_type: 'desktop',
          browser: 'Chrome en Windows',
          location: 'Buenos Aires, Argentina',
          last_active: new Date().toISOString(),
          is_current: true,
        },
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  const handleConnectProvider = async (provider: 'google' | 'discord') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/profile/settings`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('Error connecting provider:', error);
    }
  };

  const handleSignOutSession = async (sessionId: string) => {
    setSigningOut(sessionId);
    // In production, call supabase.auth.admin.deleteSession or similar
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSessions(sessions.filter(s => s.id !== sessionId));
    setSigningOut(null);
  };

  const handleSignOutAllSessions = async () => {
    setSigningOut('all');
    await supabase.auth.signOut({ scope: 'global' });
    // User will be redirected to login
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ahora mismo';
    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours} h`;
    if (days < 7) return `Hace ${days} días`;
    return date.toLocaleDateString('es-ES');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-gold-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Connected Accounts */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Globe className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-dungeon-100">Cuentas Conectadas</h3>
            <p className="text-xs text-dungeon-400">Vincula otras cuentas para iniciar sesión más fácil</p>
          </div>
        </div>

        <div className="space-y-3">
          {(Object.keys(PROVIDER_CONFIG) as Array<keyof typeof PROVIDER_CONFIG>).map((provider) => {
            const config = PROVIDER_CONFIG[provider];
            const Icon = config.icon;
            const connected = connectedAccounts.find(a => a.provider === provider);

            return (
              <div
                key={provider}
                className="flex items-center justify-between p-4 rounded-lg bg-dungeon-800/30 border border-dungeon-700/30"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${provider === 'google' ? 'bg-white' : 'bg-[#5865F2]/20'}`}>
                    <Icon />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dungeon-200">{config.name}</p>
                    {connected ? (
                      <p className="text-xs text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Conectado como {connected.email}
                      </p>
                    ) : (
                      <p className="text-xs text-dungeon-400">{config.description}</p>
                    )}
                  </div>
                </div>

                {connected ? (
                  <button
                    className="px-4 py-2 text-sm text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    Desconectar
                  </button>
                ) : (
                  <button
                    onClick={() => handleConnectProvider(provider)}
                    className="px-4 py-2 text-sm text-dungeon-200 hover:text-dungeon-100 bg-dungeon-700/50 hover:bg-dungeon-700 rounded-lg transition-colors"
                  >
                    Conectar
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Sessions */}
      <div className="pt-6 border-t border-dungeon-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Laptop className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-dungeon-100">Sesiones Activas</h3>
              <p className="text-xs text-dungeon-400">Dispositivos donde has iniciado sesión</p>
            </div>
          </div>
          {sessions.length > 1 && (
            <button
              onClick={handleSignOutAllSessions}
              disabled={signingOut === 'all'}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
            >
              {signingOut === 'all' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              Cerrar todas
            </button>
          )}
        </div>

        <div className="space-y-3">
          {sessions.map((session) => {
            const DeviceIcon = DEVICE_ICONS[session.device_type];
            return (
              <div
                key={session.id}
                className={`p-4 rounded-lg border ${session.is_current
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-dungeon-800/30 border-dungeon-700/30'
                  }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${session.is_current ? 'bg-emerald-500/20' : 'bg-dungeon-700/50'}`}>
                      <DeviceIcon className={`w-5 h-5 ${session.is_current ? 'text-emerald-400' : 'text-dungeon-400'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-dungeon-200">{session.browser}</p>
                        {session.is_current && (
                          <span className="px-2 py-0.5 text-xs font-medium text-emerald-400 bg-emerald-500/20 rounded-full">
                            Sesión actual
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-xs text-dungeon-400">
                          <MapPin className="w-3 h-3" />
                          {session.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-dungeon-400">
                          <Clock className="w-3 h-3" />
                          {formatDate(session.last_active)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {!session.is_current && (
                    <button
                      onClick={() => handleSignOutSession(session.id)}
                      disabled={signingOut === session.id}
                      className="p-2 text-dungeon-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {signingOut === session.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <LogOut className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Warning */}
      <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-400">Seguridad de tu cuenta</p>
          <p className="text-xs text-dungeon-300 mt-1">
            Si ves una sesión que no reconoces, ciérrala inmediatamente y cambia tu contraseña. También puedes activar la autenticación en dos pasos para mayor seguridad.
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <Info className="w-5 h-5 text-blue-400 mt-0.5" />
        <div>
          <p className="text-sm text-dungeon-200">
            Conectar cuentas de Google o Discord te permite iniciar sesión más rápido sin necesidad de recordar una contraseña adicional.
          </p>
        </div>
      </div>
    </div>
  );
}
