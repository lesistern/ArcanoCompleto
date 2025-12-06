'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Sun, Moon, Ruler } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
// import { LanguageSelector } from '@/components/LanguageSelector'; // Deshabilitado temporalmente
import UserMenu from '@/components/header/UserMenu';
import { useUnitPreference } from '@/lib/hooks/useUnitPreference';

// Lazy-load auth modals (only needed when user interacts)
const AuthModal = dynamic(() => import('@/components/auth/AuthModal'));
const PasswordResetModal = dynamic(() => import('@/components/auth/PasswordResetModal'));
const AdminInviteModal = dynamic(() => import('@/components/auth/AdminInviteModal'));

// Lazy-load search components (not always used)
const SearchBar = dynamic(() => import('@/components/search/SearchBar'));
const CommandPalette = dynamic(() => import('@/components/search/CommandPalette'));

export default function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [passwordResetModalOpen, setPasswordResetModalOpen] = useState(false);
  const [adminInviteModalOpen, setAdminInviteModalOpen] = useState(false);
  const [mode, setMode] = useState<'dark' | 'light'>('dark');

  const {
    user,
    profile,
    signIn,
    signUp,
    signInWithMagicLink,
    signInWithProvider,
    sendPasswordReset,
    inviteUserByEmail,
  } = useAuth();

  const { unitSystem, toggleUnitSystem, isLoaded: unitLoaded } = useUnitPreference();

  // Load mode from localStorage and apply to document
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as 'dark' | 'light' | null;
    const initialMode = savedMode || 'dark';
    setMode(initialMode);
    document.documentElement.setAttribute('data-mode', initialMode);
  }, []);

  // Apply theme from user profile to document
  useEffect(() => {
    const theme = profile?.theme || 'clasico';
    document.documentElement.setAttribute('data-theme', theme);
  }, [profile]);

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global Ctrl+K listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
    document.documentElement.setAttribute('data-mode', newMode);
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-dungeon-700 bg-dungeon-900/95 backdrop-blur supports-[backdrop-filter]:bg-dungeon-900/80">
        <nav className="mx-auto flex items-center justify-between gap-3 px-4 py-3 lg:px-8" aria-label="Global">
          {/* Logo y título (siempre visible). Added margin-left on mobile to avoid overlap with Sidebar button */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-colors pl-12 sm:pl-0">
            <Image
              src="/logo.png"
              alt="Compendio Arcano"
              width={32}
              height={32}
              className="h-8 w-auto flex-shrink-0"
              priority
            />
            <span className="text-sm font-semibold text-dungeon-100 hidden sm:inline">
              Compendio Arcano
            </span>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search + mode toggle + language + user menu */}
          <div className="flex items-center gap-3 h-10">
            {/* Search bar (desktop) */}
            <div className="hidden sm:block w-72 h-10">
              <SearchBar />
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="sm:hidden group flex items-center justify-center w-10 h-10 rounded-lg border border-dungeon-700 bg-dungeon-800 hover:bg-dungeon-700 transition-all duration-300"
              aria-label="Buscar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-dungeon-400 group-hover:text-gold-400 transition-colors"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {/* Mode toggle (dark/light) */}
            <button
              onClick={toggleMode}
              className="group flex items-center justify-center w-10 h-10 rounded-lg border border-dungeon-700 bg-dungeon-800 hover:bg-dungeon-700 transition-all duration-300 hover:scale-110"
              aria-label={mode === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {mode === 'dark' ? (
                <Sun className="h-5 w-5 text-gold-400 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
              ) : (
                <Moon className="h-5 w-5 text-blue-400 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
              )}
            </button>

            {/* Unit toggle (imperial/metric) */}
            {unitLoaded && (
              <button
                onClick={toggleUnitSystem}
                className="group flex items-center justify-center w-10 h-10 rounded-lg border border-dungeon-700 bg-dungeon-800 hover:bg-dungeon-700 transition-all duration-300 hover:scale-110"
                aria-label={unitSystem === 'imperial' ? 'Cambiar a sistema métrico' : 'Cambiar a sistema imperial'}
                title={unitSystem === 'imperial' ? 'Unidades: Imperial (pies)' : 'Unidades: Métrico (metros)'}
              >
                {unitSystem === 'imperial' ? (
                  <span className="text-xs font-bold text-green-400 transition-transform duration-300 group-hover:scale-110">ft</span>
                ) : (
                  <span className="text-xs font-bold text-cyan-400 transition-transform duration-300 group-hover:scale-110">m</span>
                )}
              </button>
            )}

            {/* Language selector - Deshabilitado temporalmente */}
            {/* <LanguageSelector /> */}

            {/* User menu (derecha) */}
            <UserMenu
              user={user || undefined}
              profile={profile as any}
              onLoginClick={() => setAuthModalOpen(true)}
            />
          </div>
        </nav>
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

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
}
