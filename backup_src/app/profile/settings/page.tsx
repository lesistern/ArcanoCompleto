'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import AvatarUpload from '@/components/profile/AvatarUpload';
import {
  Save,
  User,
  Globe,
  FileText,
  Shield,
  Bell,
  Palette,
  Link as LinkIcon,
  Trash2,
  Lock,
  Image,
  Moon,
  Sun,
  Loader2
} from 'lucide-react';

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { user, profile, updateProfile, updatePassword, loading, isAuthenticated } = useAuth();

  // Información Básica
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('es');

  // Apariencia
  const [theme, setTheme] = useState('dark');

  // Notificaciones
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [translationUpdates, setTranslationUpdates] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Enlaces
  const [discordUsername, setDiscordUsername] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');

  // Estado
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/');
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setBio(profile.bio || '');
      setPreferredLanguage(profile.preferred_language || 'es');
      // TODO: Cargar desde perfil cuando se agreguen estos campos a la BD
      // setDiscordUsername(profile.discord_username || '');
      // setTwitterHandle(profile.twitter_handle || '');
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const { error } = await updateProfile({
        display_name: displayName,
        bio: bio,
        preferred_language: preferredLanguage,
      });

      if (error) {
        setErrorMessage('Error al guardar los cambios: ' + error.message);
      } else {
        setSuccessMessage('¡Perfil actualizado exitosamente!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err: any) {
      setErrorMessage('Error inesperado: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (newPassword.length < 8) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    setPasswordSaving(true);
    const { error } = await updatePassword(newPassword);
    if (error) {
      setErrorMessage('No se pudo actualizar la contraseña: ' + error.message);
    } else {
      setSuccessMessage('Contraseña actualizada correctamente.');
      setNewPassword('');
      setConfirmPassword('');
    }
    setPasswordSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dungeon-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto"></div>
          <p className="mt-4 text-dungeon-300">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dungeon-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <Link href="/profile">
              <Button variant="secondary">Volver al Perfil</Button>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-dungeon-50">Configuración del perfil</h1>
          <p className="text-dungeon-400 mt-2">
            Personaliza tu información, apariencia, notificaciones, enlaces sociales y preferencias de seguridad
          </p>
        </div>

        {/* Mensajes */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p className="text-sm text-green-400">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-sm text-red-400">{errorMessage}</p>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Grid de 2 columnas en desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Información Básica */}
            <div className="bg-dungeon-900 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold text-dungeon-50 mb-6 flex items-center space-x-2">
              <User className="text-gold-500" size={24} />
              <span>Información Básica</span>
            </h2>

            <div className="space-y-4">
              {/* Email (readonly) */}
              <div>
                <label className="block text-sm font-medium text-dungeon-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email || ''}
                  disabled
                  className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded-md text-dungeon-400 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-dungeon-500">
                  El email no se puede modificar
                </p>
              </div>

              {/* Display Name */}
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-dungeon-300 mb-2">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded-md text-dungeon-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  placeholder="Tu nombre o apodo"
                  maxLength={50}
                />
                <p className="mt-1 text-xs text-dungeon-500">
                  Este nombre se mostrará públicamente
                </p>
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-dungeon-300 mb-2 flex items-center space-x-2">
                  <FileText size={16} />
                  <span>Biografía</span>
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded-md text-dungeon-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  placeholder="Cuéntanos un poco sobre ti..."
                  maxLength={500}
                />
                <p className="mt-1 text-xs text-dungeon-500">
                  {bio.length} / 500 caracteres
                </p>
              </div>
            </div>
          </div>

          {/* Preferencias */}
          <div className="bg-dungeon-900 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold text-dungeon-50 mb-6 flex items-center space-x-2">
              <Globe className="text-gold-500" size={24} />
              <span>Preferencias</span>
            </h2>

            <div className="space-y-4">
              {/* Idioma Preferido */}
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-dungeon-300 mb-2">
                  Idioma preferido
                </label>
                <select
                  id="language"
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded-md text-dungeon-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
                <p className="mt-1 text-xs text-dungeon-500">
                  Idioma principal para las contribuciones
                </p>
              </div>

              {/* Sistema de Medidas */}
              <div>
                <label htmlFor="measurement" className="block text-sm font-medium text-dungeon-300 mb-2">
                  Sistema de medidas
                </label>
                <select
                  id="measurement"
                  defaultValue="imperial"
                  className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded-md text-dungeon-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="imperial">Imperial (pies, libras)</option>
                  <option value="metric">Métrico (metros, kilogramos)</option>
                </select>
                <p className="mt-1 text-xs text-dungeon-500">
                  Sistema de medición para distancias y pesos
                </p>
              </div>
            </div>
          </div>

          {/* Apariencia */}
          <div className="bg-dungeon-900 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold text-dungeon-50 mb-6 flex items-center space-x-2">
              <Palette className="text-gold-500" size={24} />
              <span>Apariencia</span>
            </h2>

            <div className="space-y-4">
              {/* Tema */}
              <div>
                <label className="block text-sm font-medium text-dungeon-300 mb-3">
                  Tema de color
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-md border-2 transition-all ${
                      theme === 'dark'
                        ? 'border-gold-500 bg-dungeon-800'
                        : 'border-dungeon-700 bg-dungeon-800/50 hover:border-dungeon-600'
                    }`}
                  >
                    <Moon size={18} />
                    <span className="text-dungeon-100">Oscuro</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-md border-2 transition-all ${
                      theme === 'light'
                        ? 'border-gold-500 bg-dungeon-800'
                        : 'border-dungeon-700 bg-dungeon-800/50 hover:border-dungeon-600'
                    }`}
                    disabled
                  >
                    <Sun size={18} />
                    <span className="text-dungeon-400">Claro (Próximamente)</span>
                  </button>
                </div>
              </div>

              {/* Avatar Upload */}
              <div>
                <AvatarUpload
                  currentAvatarUrl={profile?.avatar_url || undefined}
                  onUploadSuccess={async (url) => {
                    // Update profile with new avatar URL
                    const { error } = await updateProfile({ avatar_url: url });
                    if (!error) {
                      setSuccessMessage('¡Avatar actualizado exitosamente!');
                      setTimeout(() => setSuccessMessage(''), 3000);
                    } else {
                      setErrorMessage('Avatar subido pero error al guardar en perfil: ' + error.message);
                    }
                  }}
                  onUploadError={(error) => {
                    setErrorMessage(error);
                    setTimeout(() => setErrorMessage(''), 5000);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="bg-dungeon-900 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold text-dungeon-50 mb-6 flex items-center space-x-2">
              <Bell className="text-gold-500" size={24} />
              <span>Notificaciones</span>
            </h2>

            <div className="space-y-4">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-dungeon-100">Notificaciones por email</p>
                  <p className="text-xs text-dungeon-500 mt-1">
                    Recibir actualizaciones importantes en tu correo
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    emailNotifications ? 'bg-gold-500' : 'bg-dungeon-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Translation Updates */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-dungeon-100">Actualizaciones de traducciones</p>
                  <p className="text-xs text-dungeon-500 mt-1">
                    Notificar cuando tus traducciones sean aprobadas o rechazadas
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setTranslationUpdates(!translationUpdates)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    translationUpdates ? 'bg-gold-500' : 'bg-dungeon-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      translationUpdates ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Weekly Digest */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-dungeon-100">Resumen semanal</p>
                  <p className="text-xs text-dungeon-500 mt-1">
                    Recibir un resumen de actividad cada semana
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWeeklyDigest(!weeklyDigest)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    weeklyDigest ? 'bg-gold-500' : 'bg-dungeon-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Enlaces y Redes Sociales */}
          <div className="bg-dungeon-900 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold text-dungeon-50 mb-6 flex items-center space-x-2">
              <LinkIcon className="text-gold-500" size={24} />
              <span>Enlaces y redes sociales</span>
            </h2>

            <div className="space-y-4">
              {/* Discord */}
              <div>
                <label htmlFor="discord" className="block text-sm font-medium text-dungeon-300 mb-2">
                  Discord
                </label>
                <input
                  type="text"
                  id="discord"
                  value={discordUsername}
                  onChange={(e) => setDiscordUsername(e.target.value)}
                  className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded-md text-dungeon-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  placeholder="usuario#1234"
                />
              </div>

              {/* Twitter/X */}
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-dungeon-300 mb-2">
                  Twitter/X
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-dungeon-700 bg-dungeon-800 text-dungeon-400 text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    id="twitter"
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value)}
                    className="flex-1 px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded-r-md text-dungeon-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="tu_usuario"
                  />
                </div>
              </div>
            </div>
          </div>

            {/* Seguridad */}
            <div className="bg-dungeon-900 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold text-dungeon-50 mb-6 flex items-center space-x-2">
              <Shield className="text-gold-500" size={24} />
              <span>Seguridad</span>
            </h2>

            <div className="space-y-4">
              {/* Cambiar Contraseña */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-dungeon-100 mb-2">Contraseña</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-dungeon-300 mb-1">Nueva contraseña</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded-md text-dungeon-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      placeholder="Mínimo 8 caracteres"
                      minLength={8}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-dungeon-300 mb-1">Confirmar contraseña</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded-md text-dungeon-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      placeholder="Repite la nueva contraseña"
                      minLength={8}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePasswordChange}
                    disabled={passwordSaving}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-100 rounded-md transition-colors text-sm disabled:opacity-50"
                  >
                    {passwordSaving ? (
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
                  <p className="text-xs text-dungeon-500">Se cerrarán otras sesiones al cambiarla.</p>
                </div>
              </div>

              {/* Privacidad del Perfil */}
              <div>
                <p className="text-sm font-medium text-dungeon-100 mb-2">Privacidad del perfil</p>
                <select
                  defaultValue="public"
                  className="w-full px-4 py-2 bg-dungeon-800 border border-dungeon-700 rounded-md text-dungeon-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  disabled
                >
                  <option value="public">Público (cualquiera puede ver)</option>
                  <option value="private">Privado (solo yo)</option>
                </select>
                <p className="mt-1 text-xs text-dungeon-500">
                  Controla quién puede ver tu perfil y contribuciones
                </p>
              </div>
            </div>
          </div>
          </div>

          {/* Zona de Peligro - Ocupa todo el ancho */}
          <div className="bg-red-900/20 border-2 border-red-500/50 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold text-red-400 mb-6 flex items-center space-x-2">
              <Trash2 size={24} />
              <span>Zona de peligro</span>
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-dungeon-100 mb-2">Eliminar cuenta</p>
                <p className="text-xs text-dungeon-400 mb-3">
                  Una vez eliminada tu cuenta, no hay vuelta atrás. Por favor, asegúrate de esto.
                </p>
                <button
                  type="button"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors text-sm font-semibold"
                  disabled
                >
                  <Trash2 size={16} />
                  <span>Eliminar mi cuenta (Próximamente)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/profile')}
              className="px-6 py-2 bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-100 rounded-md transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center space-x-2 px-6 py-2 bg-gold-600 hover:bg-gold-500 text-dungeon-950 rounded-md transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
