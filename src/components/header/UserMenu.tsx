'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { LogOut, Settings, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface UserProfile {
  id?: string;
  display_name?: string;
  username?: string;
  avatar_url?: string;
  tier_code?: string;
  level?: number;
}

interface UserMenuProps {
  user?: { email?: string };
  profile?: UserProfile;
  onLoginClick?: () => void;
}

export default function UserMenu({ user, profile, onLoginClick }: UserMenuProps) {
  const { signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const displayName = profile?.display_name || profile?.username || user?.email || 'Usuario';

  const levelLabel = profile?.level ? `Nivel ${profile.level}` : 'Nivel 1';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setIsOpen(false);
    const { error } = await signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error);
      setIsLoggingOut(false);
    } else {
      window.location.href = '/';
    }
  };

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return;
      const target = event.target as Node;
      if (menuRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keyup', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keyup', handleEscape);
    };
  }, [isOpen]);

  // Si no está autenticado
  if (!user || !profile) {
    return (
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-dungeon-300 hover:bg-dungeon-800 hover:text-gold-400 transition-all duration-200"
        onClick={onLoginClick}
      >
        <User size={18} />
        <span className="text-sm font-medium hidden sm:inline">Iniciar Sesión</span>
      </button>
    );
  }

  return (
    <div className="relative">
      {/* Botón de perfil */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-dungeon-800 transition-all duration-200 group min-h-12 min-w-12"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden bg-dungeon-800 flex-shrink-0">
          {profile?.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={displayName}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-xs">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Info (oculto en mobile) */}
        <div className="hidden sm:flex flex-col items-start min-w-0">
          <p className="text-xs font-medium text-dungeon-100 truncate group-hover:text-gold-400">
            {displayName}
          </p>
          <span className="text-xs px-1.5 py-0 rounded font-medium text-dungeon-400">
            {levelLabel}
          </span>
        </div>

        {/* Icono dropdown */}
        <ChevronDown
          size={16}
          className={`text-dungeon-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 bg-dungeon-800 border border-dungeon-700 rounded-lg shadow-xl overflow-hidden z-50"
        >
          {/* Header con info del perfil */}
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="px-4 py-3 border-b border-dungeon-700 hover:bg-dungeon-700 transition-colors block"
          >
            <p className="text-sm font-medium text-dungeon-100">{displayName}</p>
            <p className="text-xs text-dungeon-500 mt-1">Ver perfil completo</p>
          </Link>

          {/* Opciones del menú */}
          <div className="py-2">
            {/* Settings */}
            <a
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-dungeon-400 hover:bg-dungeon-700 hover:text-gold-400 transition-colors"
            >
              <Settings size={16} />
              <span>Configuración</span>
            </a>

            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-dungeon-400 hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-50 min-h-12"
            >
              <LogOut size={16} />
              <span>{isLoggingOut ? 'Cerrando...' : 'Cerrar Sesión'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}