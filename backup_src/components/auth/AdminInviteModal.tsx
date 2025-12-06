'use client';

import { useState } from 'react';
import { X, Mail, UserPlus, CheckCircle } from 'lucide-react';

interface AdminInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInviteUser: (email: string, data?: { display_name?: string; tier_code?: string }) => Promise<{ error: any }>;
}

export default function AdminInviteModal({
  isOpen,
  onClose,
  onInviteUser,
}: AdminInviteModalProps) {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [tierCode, setTierCode] = useState('contributor');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  if (!isOpen) return null;

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !isValidEmail(email)) {
      setError('Ingresa un email válido');
      triggerShake();
      return;
    }

    setLoading(true);

    const { error } = await onInviteUser(email, {
      display_name: displayName || undefined,
      tier_code: tierCode,
    });

    if (error) {
      setError(error.message || 'Error al enviar la invitación');
      triggerShake();
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  };

  const handleClose = () => {
    onClose();
    setEmail('');
    setDisplayName('');
    setTierCode('contributor');
    setError(null);
    setSuccess(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-lg flex items-center justify-center z-[9999] p-4"
      onClick={handleClose}
    >
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        .shake {
          animation: shake 0.5s;
        }
      `}</style>
      <div
        className={`relative card w-full max-w-md ${shake ? 'shake' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-dungeon-400 hover:text-dungeon-200 transition-colors z-10"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        <div className="px-8 pt-10 pb-8">
          {/* Success State */}
          {success ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <CheckCircle size={64} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gold-500 mb-2 font-heading">
                ¡Invitación Enviada!
              </h2>
              <p className="text-dungeon-300 text-sm">
                El usuario recibirá un email con instrucciones para unirse.
              </p>
            </div>
          ) : (
            <>
              {/* Título */}
              <div className="flex items-center justify-center mb-2">
                <UserPlus size={32} className="text-gold-500 mr-2" />
                <h2 className="text-2xl font-bold text-gold-500 font-heading">
                  Invitar Usuario
                </h2>
              </div>
              <p className="text-dungeon-400 text-sm text-center mb-6">
                Envía una invitación a un nuevo usuario para unirse al compendio
              </p>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              {/* Admin Notice */}
              <div className="mb-4 p-3 bg-gold-500/10 border border-gold-500/30 rounded-md">
                <p className="text-xs text-gold-400">
                  Solo administradores pueden enviar invitaciones
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="invite-email" className="block text-sm font-medium text-dungeon-300 mb-2">
                    Email del Usuario *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dungeon-400" />
                    <input
                      type="email"
                      id="invite-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input w-full pl-10"
                      placeholder="usuario@email.com"
                      disabled={loading}
                      autoFocus
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="invite-display-name" className="block text-sm font-medium text-dungeon-300 mb-2">
                    Nombre de Usuario (Opcional)
                  </label>
                  <input
                    type="text"
                    id="invite-display-name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="input w-full"
                    placeholder="Nombre del aventurero"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="invite-tier" className="block text-sm font-medium text-dungeon-300 mb-2">
                    Nivel de Permisos
                  </label>
                  <select
                    id="invite-tier"
                    value={tierCode}
                    onChange={(e) => setTierCode(e.target.value)}
                    className="input w-full"
                    disabled={loading}
                  >
                    <option value="user">Usuario (0 ediciones/día)</option>
                    <option value="contributor">Colaborador (10 ediciones/día)</option>
                    <option value="translator">Traductor (50 ediciones/día)</option>
                    <option value="reviewer">Revisor (100 ediciones/día)</option>
                    <option value="admin">Administrador (Sin límites)</option>
                  </select>
                  <p className="text-xs text-dungeon-500 mt-1">
                    El usuario podrá subir de nivel según su reputación
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dungeon-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    'Enviar Invitación'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={handleClose}
                  className="text-sm text-gold-500 hover:text-gold-400 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
