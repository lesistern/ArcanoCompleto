'use client';

import { useState } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendResetEmail: (email: string) => Promise<{ error: any }>;
}

export default function PasswordResetModal({
  isOpen,
  onClose,
  onSendResetEmail,
}: PasswordResetModalProps) {
  const [email, setEmail] = useState('');
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

    const { error } = await onSendResetEmail(email);

    if (error) {
      setError(error.message || 'Error al enviar el email de recuperación');
      triggerShake();
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        onClose();
        setEmail('');
        setSuccess(false);
      }, 3000);
    }
  };

  const handleClose = () => {
    onClose();
    setEmail('');
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-lg flex items-center justify-center z-[9999] p-4">
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
      <div className={`relative bg-dungeon-900 border-2 border-dungeon-700 rounded-lg shadow-2xl w-full max-w-md ${shake ? 'shake' : ''}`}>
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
                ¡Email Enviado!
              </h2>
              <p className="text-dungeon-300 text-sm">
                Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
              </p>
            </div>
          ) : (
            <>
              {/* Título */}
              <h2 className="text-2xl font-bold text-gold-500 mb-2 text-center font-heading">
                Recuperar Contraseña
              </h2>
              <p className="text-dungeon-400 text-sm text-center mb-6">
                Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
              </p>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-medium text-dungeon-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dungeon-400" />
                    <input
                      type="email"
                      id="reset-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 px-4 py-3 bg-dungeon-800 border border-dungeon-700 rounded-md text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                      placeholder="tu@email.com"
                      disabled={loading}
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-dungeon-950 py-3 px-4 rounded-md text-base font-semibold hover:from-gold-500 hover:to-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
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
                    'Enviar Email de Recuperación'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={handleClose}
                  className="text-sm text-gold-500 hover:text-gold-400 transition-colors"
                >
                  Volver al inicio de sesión
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
