'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X, ChevronDown, User, Users, LogOut, Settings, Award, UserPlus, MessageSquarePlus, FileText } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../ui/Button';
import { LanguageSelector } from '../LanguageSelector';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/auth/AuthModal';
import PasswordResetModal from '@/components/auth/PasswordResetModal';
import AdminInviteModal from '@/components/auth/AdminInviteModal';
import SearchBar from '@/components/search/SearchBar';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editionMenuOpen, setEditionMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [passwordResetModalOpen, setPasswordResetModalOpen] = useState(false);
  const [adminInviteModalOpen, setAdminInviteModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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

    // Esperar un momento para mostrar feedback visual
    setTimeout(() => {
      setIsLoggingOut(false);
      window.location.href = '/beta-landing';
    }, 500);
  };

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Clases', href: '/clases' },
    { name: 'Razas', href: '/razas' },
    { name: 'Habilidades', href: '/habilidades' },
    { name: 'Dotes', href: '/dotes' },
    { name: 'Conjuros', href: '/conjuros' },
    { name: 'Objetos', href: '/objetos' },
    { name: 'Monstruos', href: '/monstruos' },
    { name: 'Leaderboard', href: '/leaderboard' },
  ];

  const editions = [
    { name: '3.5e', href: '/', current: true, description: 'Edición 3.5' },
    { name: '5e', href: '/5e', current: false, description: 'Quinta Edición' },
    { name: '5.5e', href: '/5.5e', current: false, description: 'Revisión 2024 (Opcional)' },
  ];

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-dungeon-700 bg-dungeon-900/95 backdrop-blur supports-[backdrop-filter]:bg-dungeon-900/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1 items-center gap-4">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="font-heading text-lg lg:text-xl font-bold bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-clip-text text-transparent">
              Compendio Arcano
            </span>
          </Link>

          {/* Edition Dropdown - Desktop Only */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setEditionMenuOpen(!editionMenuOpen)}
              className="flex items-center gap-1.5 rounded border border-dungeon-700 bg-dungeon-800/50 px-2.5 py-1 text-sm text-dungeon-300 hover:border-dungeon-600 hover:text-dungeon-100 transition-colors"
            >
              <span className="font-mono">3.5e</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {editionMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setEditionMenuOpen(false)}
                />
                <div className="absolute left-0 top-full mt-2 w-56 rounded-md border border-dungeon-700 bg-dungeon-800 shadow-lg z-20">
                  {editions.map((edition) => (
                    <Link
                      key={edition.name}
                      href={edition.href}
                      onClick={() => setEditionMenuOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors first:rounded-t-md last:rounded-b-md ${
                        edition.current
                          ? 'bg-dungeon-700 text-gold-500'
                          : 'text-dungeon-300 hover:bg-dungeon-700 hover:text-dungeon-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-semibold">{edition.name}</span>
                        {edition.current && (
                          <span className="text-xs text-gold-500">●</span>
                        )}
                      </div>
                      <div className="text-xs text-dungeon-400 mt-0.5">{edition.description}</div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile: Login button and menu toggle */}
        <div className="flex lg:hidden items-center gap-3">
          {user && profile ? (
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="p-1"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {profile.display_name?.[0]?.toUpperCase() || 'U'}
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
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-dungeon-300 hover:text-dungeon-100 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop: Language, Search, and Login */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 lg:items-center">
          <LanguageSelector />

          {/* Full-Text Search Bar */}
          <SearchBar />

          {/* User Menu / Login Button */}
          {user && profile ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 text-sm font-medium text-dungeon-100 hover:text-gold-500 transition-colors"
              >
                {profile.avatar_url ? (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-dungeon-700">
                    <Image
                      src={profile.avatar_url}
                      alt={profile.display_name || 'Avatar'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {profile.display_name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                <span className="hidden xl:block">{profile.display_name}</span>
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-dungeon-800 rounded-lg shadow-xl border border-dungeon-700 py-2 z-20">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-dungeon-700">
                      <p className="text-sm font-medium text-dungeon-100">{profile.display_name}</p>
                      <p className="text-xs text-dungeon-400 truncate">{user.email}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <Award className={`w-4 h-4 ${getTierColor(tier?.code || 'user')}`} />
                        <span className={`text-xs font-semibold ${getTierColor(tier?.code || 'user')}`}>
                          {tier?.name || 'Usuario'}
                        </span>
                        <span className="text-xs text-dungeon-400">
                          {profile.reputation_points} pts
                        </span>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <Link
                      href="/profile"
                      prefetch={false}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-dungeon-300 hover:bg-dungeon-700 hover:text-dungeon-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User size={16} />
                      <span>Mi perfil</span>
                    </Link>

                    <Link
                      href="/profile/settings"
                      prefetch={false}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-dungeon-300 hover:bg-dungeon-700 hover:text-dungeon-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings size={16} />
                      <span>Configuración</span>
                    </Link>

                    <Link
                      href="/reportes-beta"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-dungeon-300 hover:bg-dungeon-700 hover:text-dungeon-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <MessageSquarePlus size={16} />
                      <span>Reportes beta</span>
                    </Link>

                    {/* Admin/Mod: Panel de administración */}
                    {(tier?.code === 'admin' || tier?.code === 'mod') && (
                      <>
                        <hr className="my-2 border-dungeon-700" />
                        <Link
                          href="/admin/tickets"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gold-400 hover:bg-dungeon-700 hover:text-gold-300"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <MessageSquarePlus size={16} />
                          <span>Panel de Tickets</span>
                        </Link>
                        <Link
                          href="/admin/reportes"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gold-400 hover:bg-dungeon-700 hover:text-gold-300"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FileText size={16} />
                          <span>Exportar Reportes</span>
                        </Link>
                        <Link
                          href="/admin/usuarios"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gold-400 hover:bg-dungeon-700 hover:text-gold-300"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Users size={16} />
                          <span>Gestionar Usuarios</span>
                        </Link>
                      </>
                    )}

                    {/* Admin: Invite User */}
                    {tier?.code === 'admin' && (
                      <button
                        onClick={() => {
                          setAdminInviteModalOpen(true);
                          setUserMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gold-400 hover:bg-dungeon-700 hover:text-gold-300 w-full"
                      >
                        <UserPlus size={16} />
                        <span>Invitar usuario</span>
                      </button>
                    )}

                    <hr className="my-2 border-dungeon-700" />

                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-dungeon-700 hover:text-red-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LogOut size={16} className={isLoggingOut ? 'animate-spin' : ''} />
                      <span>{isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Button
              onClick={() => setAuthModalOpen(true)}
              variant="ghost"
              size="sm"
              className="text-dungeon-300"
            >
              <User className="h-4 w-4" />
              <span className="ml-2 text-sm">Acceder</span>
            </Button>
          )}
        </div>
      </nav>


      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {/* Edition selector for mobile */}
            <div className="mb-4 pb-4 border-b border-dungeon-700">
              <p className="text-xs text-dungeon-400 uppercase tracking-wider mb-2 px-3">
                Edición
              </p>
              {editions.map((edition) => (
                <Link
                  key={edition.name}
                  href={edition.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    edition.current
                      ? 'bg-dungeon-700 text-gold-500'
                      : 'text-dungeon-300 hover:bg-dungeon-700 hover:text-dungeon-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-semibold">{edition.name}</span>
                    {edition.current && <span className="text-xs">●</span>}
                  </div>
                  <div className="text-xs text-dungeon-400 mt-0.5">{edition.description}</div>
                </Link>
              ))}
            </div>

            {/* Navigation links */}
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

            {/* Language selector */}
            <div className="mt-4 pt-4 border-t border-dungeon-700">
              <div className="px-3">
                <p className="text-xs text-dungeon-400 uppercase tracking-wider mb-2">
                  Idioma
                </p>
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile User Menu Dropdown */}
      {userMenuOpen && user && profile && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setUserMenuOpen(false)}
          />
          <div className="lg:hidden absolute right-4 top-16 w-64 bg-dungeon-800 rounded-lg shadow-xl border border-dungeon-700 py-2 z-50">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-dungeon-700">
              <p className="text-sm font-medium text-dungeon-100">{profile.display_name}</p>
              <p className="text-xs text-dungeon-400 truncate">{user.email}</p>
              <div className="mt-2 flex items-center space-x-2">
                <Award className={`w-4 h-4 ${getTierColor(tier?.code || 'user')}`} />
                <span className={`text-xs font-semibold ${getTierColor(tier?.code || 'user')}`}>
                  {tier?.name || 'Usuario'}
                </span>
                <span className="text-xs text-dungeon-400">
                  {profile.reputation_points} pts
                </span>
              </div>
            </div>

            {/* Menu Items */}
            <Link
              href="/profile"
              prefetch={false}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-dungeon-300 hover:bg-dungeon-700 hover:text-dungeon-100"
              onClick={() => setUserMenuOpen(false)}
            >
              <User size={16} />
              <span>Mi perfil</span>
            </Link>

            <Link
              href="/profile/settings"
              prefetch={false}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-dungeon-300 hover:bg-dungeon-700 hover:text-dungeon-100"
              onClick={() => setUserMenuOpen(false)}
            >
              <Settings size={16} />
              <span>Configuración</span>
            </Link>

            <Link
              href="/reportes-beta"
              className="flex items-center space-x-2 px-4 py-2 text-sm text-dungeon-300 hover:bg-dungeon-700 hover:text-dungeon-100"
              onClick={() => setUserMenuOpen(false)}
            >
              <MessageSquarePlus size={16} />
              <span>Reportes beta</span>
            </Link>

            {/* Admin: Invite User (Mobile) */}
            {tier?.code === 'admin' && (
              <>
                <hr className="my-2 border-dungeon-700" />
                <button
                  onClick={() => {
                    setAdminInviteModalOpen(true);
                    setUserMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gold-400 hover:bg-dungeon-700 hover:text-gold-300 w-full"
                >
                  <UserPlus size={16} />
                  <span>Invitar usuario</span>
                </button>
              </>
            )}

            <hr className="my-2 border-dungeon-700" />

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-dungeon-700 hover:text-red-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut size={16} className={isLoggingOut ? 'animate-spin' : ''} />
              <span>{isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}</span>
            </button>
          </div>
        </>
      )}

    </header>
    {typeof window !== 'undefined' && createPortal(
      <>
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSignIn={signIn}
          onSignUp={signUp}
          onSignInWithMagicLink={signInWithMagicLink}
          onSignInWithProvider={signInWithProvider}
          onPasswordResetRequest={() => {
            setAuthModalOpen(false);
            setPasswordResetModalOpen(true);
          }}
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
      </>,
      document.body
    )}
    </>
  );
}
