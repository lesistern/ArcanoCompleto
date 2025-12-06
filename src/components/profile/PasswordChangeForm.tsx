// Password change form component
import { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { PASSWORD_REQUIREMENTS } from '@/lib/data/profile-settings';

interface PasswordChangeFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  onPasswordChange: (password: string) => Promise<{ error?: any }>;
}

export function PasswordChangeForm({
  onSuccess,
  onError,
  onPasswordChange,
}: PasswordChangeFormProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError('');

    if (newPassword.length < PASSWORD_REQUIREMENTS.minLength) {
      onError(PASSWORD_REQUIREMENTS.message);
      return;
    }

    if (newPassword !== confirmPassword) {
      onError(PASSWORD_REQUIREMENTS.mismatchMessage);
      return;
    }

    setIsLoading(true);
    const { error } = await onPasswordChange(newPassword);
    if (error) {
      onError('No se pudo actualizar la contraseña: ' + error.message);
    } else {
      setNewPassword('');
      setConfirmPassword('');
      onSuccess();
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-dungeon-100 mb-2">Contraseña</p>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-dungeon-300 mb-1">
            Nueva contraseña
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded-md text-dungeon-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            placeholder="Mínimo 8 caracteres"
            minLength={PASSWORD_REQUIREMENTS.minLength}
          />
        </div>
        <div>
          <label className="block text-sm text-dungeon-300 mb-1">
            Confirmar contraseña
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded-md text-dungeon-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            placeholder="Repite la nueva contraseña"
            minLength={PASSWORD_REQUIREMENTS.minLength}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-100 rounded-md transition-colors text-sm disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Guardando...</span>
            </>
          ) : (
            <>
              <Lock size={16} />
              <span>Cambiar contraseña</span>
            </>
          )}
        </button>
        <p className="text-xs text-dungeon-500">
          Se cerrarán otras sesiones al cambiarla.
        </p>
      </div>
    </div>
  );
}
