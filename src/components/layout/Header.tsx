'use client';

import Link from 'next/link';
import { Search, Menu, X, ChevronDown, User, LogOut, Settings, Award, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../ui/Button';
import { LanguageSelector } from '../LanguageSelector';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/auth/AuthModal';
import PasswordResetModal from '@/components/auth/PasswordResetModal';
import AdminInviteModal from '@/components/auth/AdminInviteModal';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editionMenuOpen, setEditionMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [passwordResetModalOpen, setPasswordResetModalOpen] = useState(false);
  const [adminInviteModalOpen, setAdminInviteModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Diccionario bilingüe para búsqueda
  const searchData = {
    classes: [
      { es: 'Bárbaro', en: 'Barbarian', slug: 'barbarian' },
      { es: 'Bardo', en: 'Bard', slug: 'bard' },
      { es: 'Clérigo', en: 'Cleric', slug: 'cleric' },
      { es: 'Druida', en: 'Druid', slug: 'druid' },
      { es: 'Guerrero', en: 'Fighter', slug: 'fighter' },
      { es: 'Monje', en: 'Monk', slug: 'monk' },
      { es: 'Paladín', en: 'Paladin', slug: 'paladin' },
      { es: 'Explorador', en: 'Ranger', slug: 'ranger' },
      { es: 'Pícaro', en: 'Rogue', slug: 'rogue' },
      { es: 'Hechicero', en: 'Sorcerer', slug: 'sorcerer' },
      { es: 'Mago', en: 'Wizard', slug: 'wizard' },
    ],
    races: [
      { es: 'Humano', en: 'Human', slug: 'human' },
      { es: 'Elfo', en: 'Elf', slug: 'elf' },
      { es: 'Enano', en: 'Dwarf', slug: 'dwarf' },
      { es: 'Mediano', en: 'Halfling', slug: 'halfling' },
      { es: 'Gnomo', en: 'Gnome', slug: 'gnome' },
      { es: 'Semielfo', en: 'Half-Elf', slug: 'half-elf' },
      { es: 'Semiorco', en: 'Half-Orc', slug: 'half-orc' },
    ],
    spells: [
      { es: 'Bola de Fuego', en: 'Fireball', slug: 'bola-de-fuego' },
      { es: 'Rayo', en: 'Lightning Bolt', slug: 'rayo' },
      { es: 'Curar Heridas Leves', en: 'Cure Light Wounds', slug: 'curar-heridas-leves' },
      { es: 'Detectar Magia', en: 'Detect Magic', slug: 'detectar-magia' },
      { es: 'Escudo Arcano', en: 'Shield', slug: 'escudo-arcano' },
      { es: 'Misil Mágico', en: 'Magic Missile', slug: 'misil-magico' },
      { es: 'Invisibilidad', en: 'Invisibility', slug: 'invisibilidad' },
      { es: 'Volar', en: 'Fly', slug: 'volar' },
    ],
  };

  // Función de búsqueda bilingüe
  const searchItems = (category: 'classes' | 'races' | 'spells', query: string) => {
    const lowerQuery = query.toLowerCase();
    return searchData[category].filter(item =>
      item.es.toLowerCase().includes(lowerQuery) ||
      item.en.toLowerCase().includes(lowerQuery)
    );
  };

  // Obtener todas las coincidencias
  const classResults = searchItems('classes', searchQuery).slice(0, 3);
  const raceResults = searchItems('races', searchQuery).slice(0, 3);
  const spellResults = searchItems('spells', searchQuery).slice(0, 3);
  const hasResults = classResults.length > 0 || raceResults.length > 0 || spellResults.length > 0;

  // Sugerencias populares cuando no hay resultados
  const popularSuggestions = [
    { text: 'Guerrero', type: 'clase' },
    { text: 'Mago', type: 'clase' },
    { text: 'Elfo', type: 'raza' },
    { text: 'Bola de Fuego', type: 'conjuro' },
  ];

  const getTierColor = (tierCode: string) => {
    const colors: Record<string, string> = {
      guest: 'text-gray-500',
      user: 'text-blue-500',
      contributor: 'text-green-500',
      translator: 'text-purple-500',
      reviewer: 'text-orange-500',
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
      window.location.href = '/';
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

        {/* Mobile: Search and Login buttons */}
        <div className="flex lg:hidden items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-dungeon-300 p-2"
          >
            <Search className="h-5 w-5" />
          </Button>

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

          <Button
            variant="ghost"
            size="sm"
            className="text-dungeon-300"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-4 w-4" />
            <span className="ml-2 text-sm">Buscar</span>
          </Button>

          {/* User Menu / Login Button */}
          {user && profile ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 text-sm font-medium text-dungeon-100 hover:text-gold-500 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {profile.display_name?.[0]?.toUpperCase() || 'U'}
                </div>
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
                      <span>Mi Perfil</span>
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

                    {/* Admin: Invite User */}
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
                          <span>Invitar Usuario</span>
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
                      <span>{isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}</span>
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

      {/* Mobile Search Bar - Expandible */}
      <div
        className={`lg:hidden overflow-visible transition-all duration-300 ease-in-out ${
          searchOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar clases, razas, conjuros..."
              className="w-full px-4 py-3 pl-10 bg-dungeon-800 border border-gold-500/30 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-500 focus:shadow-[0_0_0_1px_rgba(234,179,8,0.5)] transition-all"
              autoFocus={searchOpen}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dungeon-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dungeon-400 hover:text-dungeon-200 transition-colors z-10"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Autocomplete Dropdown */}
            {searchQuery && searchOpen && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-dungeon-800 border border-gold-500/30 rounded-lg shadow-xl max-h-64 overflow-y-auto z-50"
                style={{
                  animation: 'slideDown 200ms ease-out, fadeIn 200ms ease-out',
                  transformOrigin: 'top'
                }}
              >
                <style jsx>{`
                  @keyframes slideDown {
                    from {
                      opacity: 0;
                      transform: translateY(-8px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                  }
                  @keyframes slideInLeft {
                    from {
                      opacity: 0;
                      transform: translateX(-10px);
                    }
                    to {
                      opacity: 1;
                      transform: translateX(0);
                    }
                  }
                `}</style>
                {/* Clases */}
                {classResults.map((item, idx) => (
                  <Link
                    key={`class-${idx}`}
                    href={`/clases/${item.slug}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="flex items-center px-4 py-2.5 hover:bg-dungeon-700 hover:pl-5 transition-all duration-200 border-b border-dungeon-700 last:border-b-0"
                    style={{
                      animation: `slideInLeft 300ms ease-out ${idx * 50}ms backwards`
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mr-3 transition-all duration-200">
                      <span className="text-red-400 text-xs font-bold">C</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-dungeon-100">{item.es}</div>
                      <div className="text-xs text-dungeon-400">Clase · {item.en}</div>
                    </div>
                  </Link>
                ))}

                {/* Razas */}
                {raceResults.map((item, idx) => (
                  <Link
                    key={`race-${idx}`}
                    href={`/razas/${item.slug}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="flex items-center px-4 py-2.5 hover:bg-dungeon-700 hover:pl-5 transition-all duration-200 border-b border-dungeon-700 last:border-b-0"
                    style={{
                      animation: `slideInLeft 300ms ease-out ${(idx + classResults.length) * 50}ms backwards`
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 transition-all duration-200">
                      <span className="text-green-400 text-xs font-bold">R</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-dungeon-100">{item.es}</div>
                      <div className="text-xs text-dungeon-400">Raza · {item.en}</div>
                    </div>
                  </Link>
                ))}

                {/* Conjuros */}
                {spellResults.map((item, idx) => (
                  <Link
                    key={`spell-${idx}`}
                    href={`/hechizos/${item.slug}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="flex items-center px-4 py-2.5 hover:bg-dungeon-700 hover:pl-5 transition-all duration-200 border-b border-dungeon-700 last:border-b-0"
                    style={{
                      animation: `slideInLeft 300ms ease-out ${(idx + classResults.length + raceResults.length) * 50}ms backwards`
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 transition-all duration-200">
                      <span className="text-purple-400 text-xs font-bold">H</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-dungeon-100">{item.es}</div>
                      <div className="text-xs text-dungeon-400">Conjuro · {item.en}</div>
                    </div>
                  </Link>
                ))}

                {/* No results - Show suggestions */}
                {!hasResults && (
                  <div
                    className="px-4 py-4"
                    style={{ animation: 'fadeIn 300ms ease-out' }}
                  >
                    <p className="text-center text-dungeon-400 text-sm mb-3">
                      No se encontraron resultados para "{searchQuery}"
                    </p>
                    <p className="text-xs text-dungeon-500 text-center mb-2">Búsquedas populares:</p>
                    <div className="space-y-1">
                      {popularSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSearchQuery(suggestion.text)}
                          className="w-full text-left px-3 py-2 rounded text-sm text-dungeon-300 hover:bg-dungeon-700 hover:text-gold-500 transition-colors"
                          style={{
                            animation: `slideInLeft 300ms ease-out ${idx * 50}ms backwards`
                          }}
                        >
                          <span className="font-medium">{suggestion.text}</span>
                          <span className="text-xs text-dungeon-500 ml-2">({suggestion.type})</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-dungeon-500 text-center mt-3">
                      💡 Puedes buscar en inglés o español
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Search Bar - Expandible */}
      <div
        className={`hidden lg:block overflow-visible transition-all duration-300 ease-in-out ${
          searchOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-dungeon-700 px-4 py-4 bg-dungeon-900/50">
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar clases, razas, conjuros..."
              className="w-full px-4 py-3 pl-10 bg-dungeon-800 border border-gold-500/30 rounded-lg text-dungeon-100 placeholder-dungeon-400 focus:outline-none focus:border-gold-500 focus:shadow-[0_0_0_1px_rgba(234,179,8,0.5)] transition-all"
              autoFocus={searchOpen}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dungeon-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dungeon-400 hover:text-dungeon-200 transition-colors z-10"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Autocomplete Dropdown - Desktop */}
            {searchQuery && searchOpen && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-dungeon-800 border border-gold-500/30 rounded-lg shadow-xl max-h-64 overflow-y-auto z-50"
                style={{
                  animation: 'slideDown 200ms ease-out, fadeIn 200ms ease-out',
                  transformOrigin: 'top'
                }}
              >
                <style jsx>{`
                  @keyframes slideDown {
                    from {
                      opacity: 0;
                      transform: translateY(-8px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                  }
                  @keyframes slideInLeft {
                    from {
                      opacity: 0;
                      transform: translateX(-10px);
                    }
                    to {
                      opacity: 1;
                      transform: translateX(0);
                    }
                  }
                `}</style>
                {/* Clases */}
                {classResults.map((item, idx) => (
                  <Link
                    key={`class-${idx}`}
                    href={`/clases/${item.slug}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="flex items-center px-4 py-2.5 hover:bg-dungeon-700 hover:pl-5 transition-all duration-200 border-b border-dungeon-700 last:border-b-0"
                    style={{
                      animation: `slideInLeft 300ms ease-out ${idx * 50}ms backwards`
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mr-3 transition-all duration-200">
                      <span className="text-red-400 text-xs font-bold">C</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-dungeon-100">{item.es}</div>
                      <div className="text-xs text-dungeon-400">Clase · {item.en}</div>
                    </div>
                  </Link>
                ))}

                {/* Razas */}
                {raceResults.map((item, idx) => (
                  <Link
                    key={`race-${idx}`}
                    href={`/razas/${item.slug}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="flex items-center px-4 py-2.5 hover:bg-dungeon-700 hover:pl-5 transition-all duration-200 border-b border-dungeon-700 last:border-b-0"
                    style={{
                      animation: `slideInLeft 300ms ease-out ${(idx + classResults.length) * 50}ms backwards`
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 transition-all duration-200">
                      <span className="text-green-400 text-xs font-bold">R</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-dungeon-100">{item.es}</div>
                      <div className="text-xs text-dungeon-400">Raza · {item.en}</div>
                    </div>
                  </Link>
                ))}

                {/* Conjuros */}
                {spellResults.map((item, idx) => (
                  <Link
                    key={`spell-${idx}`}
                    href={`/hechizos/${item.slug}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="flex items-center px-4 py-2.5 hover:bg-dungeon-700 hover:pl-5 transition-all duration-200 border-b border-dungeon-700 last:border-b-0"
                    style={{
                      animation: `slideInLeft 300ms ease-out ${(idx + classResults.length + raceResults.length) * 50}ms backwards`
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 transition-all duration-200">
                      <span className="text-purple-400 text-xs font-bold">H</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-dungeon-100">{item.es}</div>
                      <div className="text-xs text-dungeon-400">Conjuro · {item.en}</div>
                    </div>
                  </Link>
                ))}

                {/* No results - Show suggestions */}
                {!hasResults && (
                  <div
                    className="px-4 py-4"
                    style={{ animation: 'fadeIn 300ms ease-out' }}
                  >
                    <p className="text-center text-dungeon-400 text-sm mb-3">
                      No se encontraron resultados para "{searchQuery}"
                    </p>
                    <p className="text-xs text-dungeon-500 text-center mb-2">Búsquedas populares:</p>
                    <div className="space-y-1">
                      {popularSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSearchQuery(suggestion.text)}
                          className="w-full text-left px-3 py-2 rounded text-sm text-dungeon-300 hover:bg-dungeon-700 hover:text-gold-500 transition-colors"
                          style={{
                            animation: `slideInLeft 300ms ease-out ${idx * 50}ms backwards`
                          }}
                        >
                          <span className="font-medium">{suggestion.text}</span>
                          <span className="text-xs text-dungeon-500 ml-2">({suggestion.type})</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-dungeon-500 text-center mt-3">
                      💡 Puedes buscar en inglés o español
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

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
              <span>Mi Perfil</span>
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
                  <span>Invitar Usuario</span>
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
              <span>{isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}</span>
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
