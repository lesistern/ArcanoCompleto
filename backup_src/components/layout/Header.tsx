'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '../ui/Button';
import AuthModal from '@/components/auth/AuthModal';
import PasswordResetModal from '@/components/auth/PasswordResetModal';
import AdminInviteModal from '@/components/auth/AdminInviteModal';
import SearchBar from '@/components/search/SearchBar';
import CommandPalette from '@/components/search/CommandPalette';
import { ChevronDown, Menu, X, User, LogOut, Settings, Award, UserPlus, Users, Ticket } from 'lucide-react';

const LanguageSelector = dynamic(
  () => import('../LanguageSelector').then(mod => ({ default: mod.LanguageSelector })),
  { ssr: false }
);

interface NavItem {
  name: string;
  href: string;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [manualMenuOpen, setManualMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [passwordResetModalOpen, setPasswordResetModalOpen] = useState(false);
  const [adminInviteModalOpen, setAdminInviteModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const userMenuButtonRef = useRef<HTMLButtonElement | null>(null);

  const {
    user,
    profile,
    tier,
    signIn,
    signUp,
    signOut,
    signInWithMagicLink,
    signInWithProvider,
    sendPasswordReset,
    inviteUserByEmail,
  } = useAuth();

  const navigation: NavItem[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Foro', href: '/foro' },
    { name: 'Dados 3D', href: '/dados' },
  ];

  const manualLinks: NavItem[] = [
    { name: 'Clases', href: '/clases' },
    { name: 'Conjuros', href: '/conjuros' },
    { name: 'Dotes', href: '/dotes' },
    { name: 'Dungeon Master', href: '/dungeon-master' },
    { name: 'Habilidades', href: '/habilidades' },
    { name: 'Monstruos', href: '/monstruos' },
    { name: 'Objetos', href: '/objetos' },
    { name: 'Razas', href: '/razas' },
    { name: 'Reglas', href: '/reglas' },
  ];

  const getTierColor = (tierCode: string) => {
    const colors: Record<string, string> = {
      guest: 'text-gray-500',
      user: 'text-blue-500',
      contributor: 'text-green-500',
      translator: 'text-purple-500',
      reviewer: 'text-orange-500',
      mod: 'text-pink-500',
      admin: 'text-red-500',
    };
    return colors[tierCode] || 'text-blue-500';
  };

  // Tier llega como objeto; normalizamos usando el código de tier en minúsculas
  const normalizedTier = tier?.code?.toLowerCase();
  const isProfileAdmin = profile?.role === 'admin' || (profile as any)?.is_admin === true;
  const effectiveTier = isProfileAdmin ? 'admin' : normalizedTier;
  const tierClass = effectiveTier ? getTierColor(effectiveTier) : 'text-gray-500';
  const tierLabel = effectiveTier ? effectiveTier.toUpperCase() : 'GUEST';
  const avatarInitial = (
    profile?.display_name?.[0] ||
    profile?.username?.[0] ||
    user?.email?.[0] ||
    'U'
  ).toUpperCase();

  const isAdminTier =
    effectiveTier === 'admin' ||
    effectiveTier === 'mod' ||
    profile?.role === 'admin' ||
    (profile as any)?.is_admin === true;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setUserMenuOpen(false);

    const { error } = await signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error);
      setIsLoggingOut(false);
      alert('Error al cerrar sesión. Por favor, intenta de nuevo.');
      return;
    }

    setTimeout(() => {
      setIsLoggingOut(false);
      window.location.href = '/beta-landing';
    }, 500);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!userMenuOpen) return;
      const target = event.target as Node;
      if (userMenuRef.current?.contains(target)) return;
      if (userMenuButtonRef.current?.contains(target)) return;
      setUserMenuOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keyup', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keyup', handleEscape);
    };
  }, [userMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-dungeon-700 bg-dungeon-900/95 backdrop-blur supports-[backdrop-filter]:bg-dungeon-900/80">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-8" aria-label="Global">
          {/* Logo + Manual dropdown + main nav (desktop) */}
          <div className="flex items-center gap-4">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                src="/logo.png"
                alt="Compendio Arcano"
                width={225}
                height={50}
                className="h-10 lg:h-12 w-auto"
                priority
              />
            </Link>

            {/* Manual dropdown (desktop) */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setManualMenuOpen(!manualMenuOpen)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl border border-transparent text-dungeon-300 transition-all duration-300 hover:bg-dungeon-900/60 hover:backdrop-blur-md hover:border-dungeon-600 hover:shadow-xl hover:-translate-y-1 hover:text-dungeon-100"
              >
                <span className="font-semibold">Manual</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {manualMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setManualMenuOpen(false)}
                  />
                  <div className="absolute left-0 top-full mt-2 w-48 rounded-2xl border border-dungeon-800 shadow-xl overflow-hidden z-20 p-1 bg-dungeon-950">
                    {manualLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setManualMenuOpen(false)}
                        className="block px-4 py-2 text-sm transition-colors text-dungeon-200 hover:bg-dungeon-700 hover:text-dungeon-100 rounded-md"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Main nav desktop */}
            <div className="hidden lg:flex lg:gap-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium rounded-xl border border-transparent text-dungeon-300 transition-all duration-300 hover:bg-dungeon-900/60 hover:backdrop-blur-md hover:border-dungeon-600 hover:shadow-xl hover:-translate-y-1 hover:text-dungeon-100"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile: auth + burger */}
          <div className="relative flex lg:hidden items-center gap-3">
            {user && profile ? (
              <button
                ref={userMenuButtonRef}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="p-1 rounded-md bg-dungeon-800 hover:bg-dungeon-700"
              >
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <div className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-base">
                    {avatarInitial}
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-dungeon-50 font-semibold truncate max-w-[7rem]">
                      {profile?.display_name || profile?.username || user?.email || 'Usuario'}
                    </div>
                  </div>
                </div>
              </button>
            ) : (
              <Button
                onClick={() => setAuthModalOpen(true)}
                variant="ghost"
                size="sm"
                className="text-dungeon-300 p-2"
              >
                <User className="h-5 w-5" />
              </Button>
            )}

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-dungeon-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>

            {user && userMenuOpen && (
              <div
                ref={userMenuRef}
                className="absolute right-0 top-14 z-30 w-56 card p-1 lg:hidden"
              >
                <Link
                  href="/profile"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-dungeon-200 hover:bg-dungeon-700 transition-colors rounded-md"
                >
                  <Settings className="h-4 w-4" />
                  Perfil
                </Link>
                {isAdminTier && (
                  <>
                    <Link
                      href="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-dungeon-200 hover:bg-dungeon-700 transition-colors rounded-md"
                    >
                      <Award className="h-4 w-4" />
                      Admin
                    </Link>
                    <Link
                      href="/admin/tickets"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-dungeon-200 hover:bg-dungeon-700 transition-colors rounded-md"
                    >
                      <Ticket className="h-4 w-4" />
                      Tickets
                    </Link>
                    <Link
                      href="/admin/usuarios"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-dungeon-200 hover:bg-dungeon-700 transition-colors rounded-md"
                    >
                      <Users className="h-4 w-4" />
                      Gestión de usuarios
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setAdminInviteModalOpen(true);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-dungeon-200 hover:bg-dungeon-700 transition-colors text-left rounded-md"
                    >
                      <UserPlus className="h-4 w-4" />
                      Invitar usuario
                    </button>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-dungeon-700 transition-colors text-left rounded-md"
                >
                  <LogOut className="h-4 w-4" />
                  {isLoggingOut ? 'Cerrando...' : 'Cerrar sesión'}
                </button>
              </div>
            )}
          </div>

          {/* Search + language + user (desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-72">
              <SearchBar />
            </div>
            <LanguageSelector />
            {user && profile ? (
              <div className="relative">
                <button
                  ref={userMenuButtonRef}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-transparent transition-all duration-300 hover:bg-dungeon-900/60 hover:backdrop-blur-md hover:border-dungeon-600 hover:shadow-xl hover:-translate-y-1 min-h-[3rem]"
                >
                  <div className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-base">
                    {avatarInitial}
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-dungeon-100 font-semibold truncate">
                      {profile?.display_name || profile?.username || user?.email || 'Usuario'}
                    </div>
                  </div>
                </button>

                {userMenuOpen && (
                  <div
                    ref={userMenuRef}
                    className="absolute right-0 mt-2 w-56 rounded-2xl border border-dungeon-800 shadow-xl overflow-hidden z-20 p-1 bg-dungeon-950"
                  >
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-dungeon-200 hover:bg-dungeon-700 transition-colors rounded-md"
                    >
                      <Settings className="h-4 w-4" />
                      Perfil
                    </Link>
                    {isAdminTier ? (
                      <>
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-dungeon-200 hover:bg-dungeon-700 transition-colors rounded-md"
                        >
                          <Award className="h-4 w-4" />
                          Admin
                        </Link>
                        <Link
                          href="/admin/tickets"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-dungeon-200 hover:bg-dungeon-700 transition-colors rounded-md"
                        >
                          <Ticket className="h-4 w-4" />
                          Tickets
                        </Link>
                        <Link
                          href="/admin/usuarios"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-dungeon-200 hover:bg-dungeon-700 transition-colors rounded-md"
                        >
                          <Users className="h-4 w-4" />
                          Gestión de usuarios
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setUserMenuOpen(false);
                            setAdminInviteModalOpen(true);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-dungeon-200 hover:bg-dungeon-700 transition-colors text-left rounded-md"
                        >
                          <UserPlus className="h-4 w-4" />
                          Invitar usuario
                        </button>
                      </>
                    ) : null}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-dungeon-700 transition-colors rounded-md"
                    >
                      <LogOut className="h-4 w-4" />
                      {isLoggingOut ? 'Cerrando...' : 'Cerrar sesión'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm"
                  onClick={() => setAuthModalOpen(true)}
                >
                  Iniciar sesión
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="text-sm"
                  onClick={() => setAuthModalOpen(true)}
                >
                  Registrarse
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-dungeon-800 bg-dungeon-900">
            <div className="space-y-1 px-4 pb-4 pt-2">
              {/* Manual collapsible in mobile */}
              <div className="border border-dungeon-800 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-dungeon-200 bg-dungeon-800"
                  onClick={() => setManualMenuOpen(!manualMenuOpen)}
                >
                  <span className="font-semibold">Manual</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${manualMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {manualMenuOpen && (
                  <div className="bg-dungeon-900">
                    {manualLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="block px-3 py-2 text-sm text-dungeon-200 hover:bg-dungeon-800"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-dungeon-100 hover:bg-dungeon-700 hover:text-gold-500 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="mt-3">
                <SearchBar />
              </div>

              <div className="flex items-center justify-between mt-2">
                <LanguageSelector />
              </div>

              <div className="mt-3">
                {user ? (
                  <div className="flex flex-col gap-2">
                    {isAdminTier && (
                      <>
                        <Link
                          href="/admin"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 rounded-md bg-dungeon-800 px-4 py-2 text-sm text-dungeon-100 hover:bg-dungeon-700 transition-colors"
                        >
                          <Award className="h-4 w-4" />
                          Admin
                        </Link>
                        <Link
                          href="/admin/tickets"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 rounded-md bg-dungeon-800 px-4 py-2 text-sm text-dungeon-100 hover:bg-dungeon-700 transition-colors"
                        >
                          <Ticket className="h-4 w-4" />
                          Tickets
                        </Link>
                        <Link
                          href="/admin/usuarios"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 rounded-md bg-dungeon-800 px-4 py-2 text-sm text-dungeon-100 hover:bg-dungeon-700 transition-colors"
                        >
                          <Users className="h-4 w-4" />
                          Gestión de usuarios
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 rounded-md bg-dungeon-800 px-4 py-2 text-sm text-red-400 hover:bg-dungeon-700 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      {isLoggingOut ? 'Cerrando...' : 'Cerrar sesión'}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button onClick={() => setAuthModalOpen(true)} variant="outline" size="sm">
                      Iniciar sesión
                    </Button>
                    <Button onClick={() => setAuthModalOpen(true)} variant="primary" size="sm">
                      Registrarse
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Modales de auth */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSignIn={signIn}
        onSignUp={(email, password, displayName) => signUp(email, password, displayName)}
        onSignInWithMagicLink={signInWithMagicLink}
        onSignInWithProvider={(provider) => signInWithProvider(provider)}
        onPasswordResetRequest={() => setPasswordResetModalOpen(true)}
      />

      <PasswordResetModal
        isOpen={passwordResetModalOpen}
        onClose={() => setPasswordResetModalOpen(false)}
        onSendResetEmail={sendPasswordReset}
      />

      <AdminInviteModal
        isOpen={adminInviteModalOpen}
        onClose={() => setAdminInviteModalOpen(false)}
        onInviteUser={inviteUserByEmail}
      />

      <CommandPalette />
    </>
  );
}
