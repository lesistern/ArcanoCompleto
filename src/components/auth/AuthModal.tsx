'use client';

import { useState } from 'react';
import { X, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import {
  FaGoogle,
  FaMicrosoft,
  FaDiscord,
  FaApple,
  FaGitlab,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaSpotify,
  FaTwitch,
  FaSlack,
  FaFigma,
  FaBitbucket
} from 'react-icons/fa';
import { SiNotion, SiKakao, SiZoom } from 'react-icons/si';

type OAuthProvider = 'apple' | 'azure' | 'bitbucket' | 'discord' | 'facebook' | 'figma' | 'gitlab' | 'google' | 'kakao' | 'keycloak' | 'linkedin' | 'linkedin_oidc' | 'notion' | 'slack' | 'slack_oidc' | 'spotify' | 'twitch' | 'twitter' | 'workos' | 'zoom' | 'fly';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (email: string, password: string) => Promise<{ error: any }>;
  onSignUp: (email: string, password: string, displayName: string) => Promise<{ error: any }>;
  onSignInWithMagicLink?: (email: string) => Promise<{ error: any }>;
  onSignInWithProvider?: (provider: OAuthProvider) => Promise<{ error: any }>;
  onPasswordResetRequest?: () => void;
}

type AuthMode = 'signin' | 'signup' | 'magiclink';

const SOCIAL_PROVIDERS = {
  primary: [
    { id: 'google', name: 'Google', icon: FaGoogle, color: 'hover:bg-blue-600' },
    { id: 'azure', name: 'Microsoft', icon: FaMicrosoft, color: 'hover:bg-blue-700' },
    { id: 'discord', name: 'Discord', icon: FaDiscord, color: 'hover:bg-indigo-600' },
    { id: 'apple', name: 'Apple', icon: FaApple, color: 'hover:bg-gray-800' },
  ],
  secondary: [
    { id: 'gitlab', name: 'GitLab', icon: FaGitlab, color: 'hover:bg-orange-600' },
    { id: 'facebook', name: 'Facebook', icon: FaFacebook, color: 'hover:bg-blue-800' },
    { id: 'twitter', name: 'Twitter', icon: FaTwitter, color: 'hover:bg-blue-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: FaLinkedin, color: 'hover:bg-blue-700' },
    { id: 'spotify', name: 'Spotify', icon: FaSpotify, color: 'hover:bg-green-600' },
    { id: 'twitch', name: 'Twitch', icon: FaTwitch, color: 'hover:bg-purple-600' },
    { id: 'slack', name: 'Slack', icon: FaSlack, color: 'hover:bg-purple-700' },
    { id: 'notion', name: 'Notion', icon: SiNotion, color: 'hover:bg-gray-800' },
    { id: 'figma', name: 'Figma', icon: FaFigma, color: 'hover:bg-purple-500' },
    { id: 'bitbucket', name: 'Bitbucket', icon: FaBitbucket, color: 'hover:bg-blue-600' },
    { id: 'kakao', name: 'Kakao', icon: SiKakao, color: 'hover:bg-yellow-500' },
    { id: 'zoom', name: 'Zoom', icon: SiZoom, color: 'hover:bg-blue-500' },
  ],
};

export default function AuthModal({
  isOpen,
  onClose,
  onSignIn,
  onSignUp,
  onSignInWithMagicLink,
  onSignInWithProvider,
  onPasswordResetRequest,
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: boolean; password?: boolean; confirmPassword?: boolean; displayName?: boolean }>({});
  const [shake, setShake] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showMoreProviders, setShowMoreProviders] = useState(false);

  if (!isOpen) return null;

  // Función para calcular fortaleza de contraseña
  const calculatePasswordStrength = (pwd: string): number => {
    let strength = 0;
    if (pwd.length >= 6) strength += 25;
    if (pwd.length >= 8) strength += 15;
    if (/[A-Z]/.test(pwd)) strength += 20;
    if (/[0-9]/.test(pwd)) strength += 20;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 20;
    return Math.min(strength, 100);
  };

  // Validar formato de email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar requisitos de contraseña
  const validatePassword = (pwd: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    if (pwd.length < 6) errors.push('Mínimo 6 caracteres');
    if (!/[A-Z]/.test(pwd)) errors.push('una mayúscula');
    if (!/[0-9]/.test(pwd)) errors.push('un número');
    if (!/[^A-Za-z0-9]/.test(pwd)) errors.push('un símbolo');
    return { valid: errors.length === 0, errors };
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSocialLogin = async (provider: OAuthProvider) => {
    if (!onSignInWithProvider) return;

    setLoading(true);
    setError(null);

    const { error } = await onSignInWithProvider(provider);

    if (error) {
      setError(`Error al conectar con ${provider}: ${error.message}`);
      triggerShake();
    }

    setLoading(false);
  };

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSignInWithMagicLink) return;

    setError(null);
    setSuccessMessage(null);
    setFieldErrors({});

    if (!email || !isValidEmail(email)) {
      setFieldErrors({ email: true });
      setError('Ingresa un email válido');
      triggerShake();
      return;
    }

    setLoading(true);

    const { error } = await onSignInWithMagicLink(email);

    if (error) {
      setError(error.message);
      triggerShake();
    } else {
      setSuccessMessage('¡Magic link enviado! Revisa tu email para acceder.');
    }

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setFieldErrors({});
    setLoading(true);

    // Validaciones
    const errors: typeof fieldErrors = {};

    if (!email) {
      errors.email = true;
    }

    if (!password) {
      errors.password = true;
    }

    if (mode === 'signup') {
      if (!displayName) {
        errors.displayName = true;
      }

      if (email && !isValidEmail(email)) {
        errors.email = true;
        setError('Ingresa un email válido');
      }

      if (!confirmPassword || password !== confirmPassword) {
        errors.confirmPassword = true;
        setError('Las contraseñas no coinciden');
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        errors.password = true;
        setError(`La contraseña debe tener: ${passwordValidation.errors.join(', ')}`);
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      if (!error) {
        setError('Por favor completa todos los campos correctamente');
      }
      triggerShake();
      setLoading(false);
      return;
    }

    try {
      if (mode === 'signin') {
        const { error } = await onSignIn(email, password);
        if (error) {
          setFieldErrors({ email: true, password: true });
          if (error.message.includes('Invalid login credentials')) {
            setError('Credenciales incorrectas. Verifica tu email y contraseña.');
          } else {
            setError(error.message);
          }
          triggerShake();
        } else {
          setSuccessMessage('¡Bienvenido de nuevo!');
          setTimeout(() => {
            onClose();
            resetForm();
            window.location.href = '/';
          }, 1000);
        }
      } else {
        const { error } = await onSignUp(email, password, displayName);
        if (error) {
          setFieldErrors({ email: true });
          if (error.message.includes('already registered')) {
            setError('Este email ya está registrado. Intenta iniciar sesión.');
          } else {
            setError(error.message);
          }
          triggerShake();
        } else {
          setSuccessMessage('¡Cuenta creada! Revisa tu email para confirmar tu cuenta.');
          setTimeout(() => {
            setMode('signin');
            setSuccessMessage(null);
          }, 3000);
        }
      }
    } catch (err: any) {
      setError('Error inesperado. Por favor intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
    setError(null);
    setSuccessMessage(null);
    setFieldErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setPasswordStrength(0);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-lg flex items-center justify-center z-[9999] p-2 sm:p-4">
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
      <div className={`relative bg-dungeon-900 border-2 border-dungeon-700 rounded-lg shadow-2xl w-full max-w-[95vw] sm:max-w-md max-h-[95vh] overflow-y-auto my-auto ${shake ? 'shake' : ''}`}>
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-dungeon-400 hover:text-dungeon-200 transition-colors z-10"
          aria-label="Cerrar"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="px-4 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8">
          {/* Título */}
          <h2 className="text-xl sm:text-2xl font-bold text-gold-500 mb-2 text-center font-heading">
            {mode === 'signin' && 'Iniciar sesión'}
            {mode === 'signup' && 'Crear cuenta'}
            {mode === 'magiclink' && 'Magic link'}
          </h2>
          <p className="text-dungeon-400 text-xs sm:text-sm text-center mb-4 sm:mb-6">
            {mode === 'signin' && 'Accede a tu compendio de aventuras'}
            {mode === 'signup' && 'Únete a la comunidad de aventureros'}
            {mode === 'magiclink' && 'Te enviaremos un enlace mágico a tu email'}
          </p>

          {/* Mensajes */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-md">
              <p className="text-sm text-green-300">{successMessage}</p>
            </div>
          )}

          {/* Tabs de modo */}
          <div className="flex space-x-2 mb-4 bg-dungeon-800 rounded-lg p-1">
            <button
              onClick={() => switchMode('signin')}
              className={`flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-medium transition-all ${
                mode === 'signin'
                  ? 'bg-gold-500 text-dungeon-950'
                  : 'text-dungeon-400 hover:text-dungeon-200'
              }`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => switchMode('signup')}
              className={`flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-medium transition-all ${
                mode === 'signup'
                  ? 'bg-gold-500 text-dungeon-950'
                  : 'text-dungeon-400 hover:text-dungeon-200'
              }`}
            >
              Registrarse
            </button>
            <button
              onClick={() => switchMode('magiclink')}
              className={`flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-medium transition-all ${
                mode === 'magiclink'
                  ? 'bg-gold-500 text-dungeon-950'
                  : 'text-dungeon-400 hover:text-dungeon-200'
              }`}
            >
              Magic link
            </button>
          </div>

          {/* Social Login - Solo en signin y signup, NO en magiclink */}
          {onSignInWithProvider && mode !== 'magiclink' && (
            <div className="mb-4">
              <p className="text-xs text-dungeon-400 text-center mb-3">Continuar con:</p>

              {/* Primary providers - Always visible */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                {SOCIAL_PROVIDERS.primary.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => handleSocialLogin(provider.id as OAuthProvider)}
                    disabled={loading}
                    className={`flex items-center justify-center space-x-2 py-2.5 px-3 bg-dungeon-800 border border-dungeon-700 rounded-md text-sm text-dungeon-200 ${provider.color} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <provider.icon className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">{provider.name}</span>
                  </button>
                ))}
              </div>

              {/* Show more button */}
              <button
                onClick={() => setShowMoreProviders(!showMoreProviders)}
                className="w-full flex items-center justify-center space-x-1 py-2 text-xs text-dungeon-400 hover:text-dungeon-200 transition-colors"
              >
                <span>{showMoreProviders ? 'Mostrar menos' : 'Mostrar más opciones'}</span>
                {showMoreProviders ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {/* Secondary providers - Collapsible */}
              {showMoreProviders && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {SOCIAL_PROVIDERS.secondary.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => handleSocialLogin(provider.id as OAuthProvider)}
                      disabled={loading}
                      className={`flex items-center justify-center space-x-2 py-2.5 px-3 bg-dungeon-800 border border-dungeon-700 rounded-md text-sm text-dungeon-200 ${provider.color} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <provider.icon className="w-4 h-4" />
                      <span className="text-xs">{provider.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Divisor */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dungeon-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-dungeon-900 text-dungeon-500">o</span>
                </div>
              </div>
            </div>
          )}

          {/* Magic Link Form */}
          {mode === 'magiclink' && onSignInWithMagicLink && (
            <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
              <div>
                <label htmlFor="email-magic" className="block text-sm font-medium text-dungeon-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email-magic"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: false });
                  }}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-dungeon-800 border rounded-md text-sm sm:text-base text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all ${
                    fieldErrors.email ? 'border-red-500' : 'border-dungeon-700'
                  }`}
                  placeholder="tu@email.com"
                  disabled={loading}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-dungeon-950 py-2 sm:py-3 px-4 rounded-md text-sm sm:text-base font-semibold hover:from-gold-500 hover:to-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {loading ? 'Enviando...' : 'Enviar magic link'}
              </button>
            </form>
          )}

          {/* Email/Password Form */}
          {(mode === 'signin' || mode === 'signup') && (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {mode === 'signup' && (
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-dungeon-300 mb-2">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    value={displayName}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                      if (fieldErrors.displayName) setFieldErrors({ ...fieldErrors, displayName: false });
                    }}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-dungeon-800 border rounded-md text-sm sm:text-base text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all ${
                      fieldErrors.displayName ? 'border-red-500' : 'border-dungeon-700'
                    }`}
                    placeholder="Tu nombre de aventurero"
                    disabled={loading}
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dungeon-300 mb-2">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: false });
                  }}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-dungeon-800 border rounded-md text-sm sm:text-base text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all ${
                    fieldErrors.email ? 'border-red-500' : 'border-dungeon-700'
                  }`}
                  placeholder="tu@email.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-dungeon-300 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: false });
                      if (mode === 'signup') {
                        setPasswordStrength(calculatePasswordStrength(e.target.value));
                      }
                    }}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 pr-10 bg-dungeon-800 border rounded-md text-sm sm:text-base text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all ${
                      fieldErrors.password ? 'border-red-500' : 'border-dungeon-700'
                    }`}
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dungeon-400 hover:text-dungeon-200 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {mode === 'signup' && password && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-dungeon-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ease-out ${
                          passwordStrength < 40
                            ? 'bg-red-500'
                            : passwordStrength < 70
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                    <p className="text-xs text-dungeon-400 mt-1">
                      {passwordStrength < 40
                        ? 'Contraseña débil'
                        : passwordStrength < 70
                        ? 'Contraseña media'
                        : 'Contraseña fuerte'}
                    </p>
                  </div>
                )}
              </div>

              {mode === 'signup' && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-dungeon-300 mb-2">
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: false });
                      }}
                      className={`w-full px-3 py-2 sm:px-4 sm:py-3 pr-10 bg-dungeon-800 border rounded-md text-sm sm:text-base text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all ${
                        fieldErrors.confirmPassword ? 'border-red-500' : 'border-dungeon-700'
                      }`}
                      placeholder="••••••••"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-dungeon-400 hover:text-dungeon-200 transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-dungeon-950 py-2 sm:py-3 px-4 rounded-md text-sm sm:text-base font-semibold hover:from-gold-500 hover:to-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dungeon-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  mode === 'signin' ? 'Iniciar sesión' : 'Crear cuenta'
                )}
              </button>

              {/* Forgot Password */}
              {mode === 'signin' && onPasswordResetRequest && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={onPasswordResetRequest}
                    className="text-xs text-gold-500 hover:text-gold-400 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
