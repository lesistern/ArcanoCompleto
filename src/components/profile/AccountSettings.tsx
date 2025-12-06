'use client';

import { useState } from 'react';
import {
  Lock,
  Trash2,
  AlertTriangle,
  Loader2,
  Check,
  Mail,
  LogOut,
  Key,
  Shield,
  Sparkles,
  Eye,
  EyeOff,
  X,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface AccountSettingsProps {
  userId: string;
  userEmail: string;
}

export function AccountSettings({ userId, userEmail }: AccountSettingsProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const supabase = createClient();
  const router = useRouter();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

    setIsChangingPassword(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setNewPassword('');
      setConfirmPassword('');
      setPasswordSuccess(true);
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err: any) {
      setPasswordError(err.message || 'Error al cambiar la contraseña');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'ELIMINAR') {
      setDeleteError('Escribe ELIMINAR para confirmar');
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          profile_hidden: true,
          display_name: '[Cuenta Eliminada]',
          bio: null,
          location: null,
          avatar_url: null,
        })
        .eq('id', userId);

      if (error) throw error;

      await supabase.auth.signOut();
      router.push('/');
    } catch (err: any) {
      setDeleteError(err.message || 'Error al eliminar la cuenta');
      setIsDeleting(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!newPassword) return { level: 0, text: '', color: '' };
    if (newPassword.length < 8) return { level: 1, text: 'Muy débil', color: 'bg-red-500' };
    if (newPassword.length < 12) return { level: 2, text: 'Débil', color: 'bg-orange-500' };
    if (newPassword.length < 16 && /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)) {
      return { level: 3, text: 'Media', color: 'bg-yellow-500' };
    }
    if (/[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) && /[^A-Za-z0-9]/.test(newPassword)) {
      return { level: 4, text: 'Fuerte', color: 'bg-green-500' };
    }
    return { level: 2, text: 'Débil', color: 'bg-orange-500' };
  };

  const passwordStrength = getPasswordStrength();
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <div className="space-y-6">
      {/* Email Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium text-dungeon-200">
            <div className="p-1.5 bg-orange-500/20 rounded-lg">
              <Mail className="w-4 h-4 text-orange-400" />
            </div>
            Email de la cuenta
          </label>
        </div>
        <div className="px-4 py-3 bg-dungeon-800/50 border border-dungeon-700 rounded-xl text-dungeon-100">
          {userEmail}
        </div>
        <p className="text-xs text-dungeon-500 flex items-center gap-1.5">
          <Shield className="w-3 h-3" />
          El email no se puede cambiar. Contacta con soporte si lo necesitas.
        </p>
      </div>

      {/* Change Password Section */}
      <div className="pt-4 border-t border-dungeon-800/50">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-amber-500/20 rounded-lg">
            <Key className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-sm font-medium text-dungeon-200">Cambiar contraseña</span>
        </div>

        {/* Success Message */}
        {passwordSuccess && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>¡Contraseña actualizada!</span>
          </div>
        )}

        {/* Error Message */}
        {passwordError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{passwordError}</span>
            </div>
            <button onClick={() => setPasswordError(null)} className="p-1 hover:bg-red-500/20 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* New Password */}
            <div className="space-y-2">
              <label className="block text-xs text-dungeon-400">Nueva contraseña</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  minLength={8}
                  className="w-full px-4 py-3 bg-dungeon-800/50 border border-dungeon-700 rounded-xl text-dungeon-100
                             placeholder-dungeon-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dungeon-500 hover:text-dungeon-300 transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength */}
              {newPassword && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          level <= passwordStrength.level ? passwordStrength.color : 'bg-dungeon-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${
                    passwordStrength.level >= 3 ? 'text-green-400' :
                    passwordStrength.level >= 2 ? 'text-orange-400' : 'text-red-400'
                  }`}>
                    {passwordStrength.text}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-xs text-dungeon-400">Confirmar contraseña</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la contraseña"
                  minLength={8}
                  className={`w-full px-4 py-3 bg-dungeon-800/50 border rounded-xl text-dungeon-100
                             placeholder-dungeon-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all pr-12
                             ${confirmPassword && !passwordsMatch ? 'border-red-500/50' : 'border-dungeon-700'}
                             ${passwordsMatch ? 'border-green-500/50' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dungeon-500 hover:text-dungeon-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {confirmPassword && (
                <p className={`text-xs flex items-center gap-1 ${passwordsMatch ? 'text-green-400' : 'text-red-400'}`}>
                  {passwordsMatch ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  {passwordsMatch ? 'Las contraseñas coinciden' : 'No coinciden'}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isChangingPassword || !newPassword || !confirmPassword || !passwordsMatch}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-dungeon-700
                         text-white disabled:text-dungeon-500 font-medium rounded-xl
                         transition-all flex items-center gap-2 text-sm"
            >
              {isChangingPassword ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              {isChangingPassword ? 'Guardando...' : 'Cambiar contraseña'}
            </button>
          </div>
        </form>
      </div>

      {/* Sign Out Section */}
      <div className="pt-4 border-t border-dungeon-800/50">
        <div className="flex items-center justify-between p-4 bg-dungeon-800/30 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-dungeon-700/50 rounded-lg">
              <LogOut className="w-4 h-4 text-dungeon-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-dungeon-200">Cerrar sesión</p>
              <p className="text-xs text-dungeon-500">Cerrar sesión en este dispositivo</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-dungeon-700 hover:bg-dungeon-600 text-dungeon-200
                       font-medium rounded-xl transition-all flex items-center gap-2 text-sm"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-4 border-t border-red-500/20">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-red-500/20 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <span className="text-sm font-medium text-red-300">Zona de Peligro</span>
        </div>

        {!showDeleteConfirm ? (
          <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
            <div>
              <p className="text-sm font-medium text-dungeon-200">Eliminar cuenta</p>
              <p className="text-xs text-dungeon-500">Acción permanente e irreversible</p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400
                         font-medium rounded-xl transition-all flex items-center gap-2 text-sm
                         border border-red-500/30"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        ) : (
          <div className="p-4 bg-red-500/5 border border-red-500/30 rounded-xl space-y-4">
            <div className="p-3 bg-red-500/10 rounded-lg">
              <p className="text-sm text-red-300 font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                ¿Estás seguro?
              </p>
              <p className="text-xs text-red-400/80 mt-1">
                Se eliminarán todos tus datos permanentemente.
              </p>
            </div>

            {deleteError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {deleteError}
              </div>
            )}

            <div>
              <label className="block text-xs text-red-300 mb-2">
                Escribe <strong>ELIMINAR</strong> para confirmar
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value.toUpperCase())}
                placeholder="ELIMINAR"
                className="w-full px-4 py-2.5 bg-dungeon-900/60 border border-red-500/30 rounded-xl
                           text-dungeon-100 placeholder-dungeon-600 focus:outline-none focus:ring-2 focus:ring-red-500/50
                           uppercase tracking-widest font-mono text-sm"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText('');
                  setDeleteError(null);
                }}
                className="flex-1 px-4 py-2.5 bg-dungeon-700 hover:bg-dungeon-600 text-dungeon-200
                           font-medium rounded-xl transition-colors text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting || deleteConfirmText !== 'ELIMINAR'}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-red-500/30
                           text-white disabled:text-red-400/50 font-medium rounded-xl
                           transition-all flex items-center justify-center gap-2 text-sm"
              >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="flex items-start gap-3 p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
        <div className="p-1.5 bg-orange-500/20 rounded-lg flex-shrink-0">
          <Sparkles className="w-4 h-4 text-orange-400" />
        </div>
        <div>
          <p className="text-sm text-orange-300 font-medium">Seguridad</p>
          <p className="text-xs text-dungeon-400 mt-0.5">
            Usa una contraseña única con mayúsculas, números y símbolos.
          </p>
        </div>
      </div>
    </div>
  );
}
