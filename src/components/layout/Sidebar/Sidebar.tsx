'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSidebar, useIsMobile } from '@/hooks/useSidebar';
import SidebarNavigation from './SidebarNavigation';
import SidebarFooter from './SidebarFooter';

export default function Sidebar() {
  const { isOpen, isCollapsed, toggle, toggleCollapse, setCollapsed, close } = useSidebar();
  const { user, profile } = useAuth();
  const pathname = usePathname();
  const { isMobile: responsiveIsMobile } = useIsMobile();

  // Restaurar estado colapsado desde localStorage al montar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sidebar-collapsed');
        if (stored === 'true') {
          setCollapsed(true);
        }
      } catch (e) {
        console.error('Error restoring sidebar state:', e);
      }
    }
  }, [setCollapsed]);

  // Cerrar sidebar al cambiar de ruta (solo en mobile)
  useEffect(() => {
    if (responsiveIsMobile) {
      close();
    }
  }, [pathname, close, responsiveIsMobile]);

  // Prevenir scroll del body cuando sidebar abierto en mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cerrar sidebar con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, close]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggle}
        className="fixed top-4 left-4 z-40 md:hidden p-3 rounded-lg bg-dungeon-800 text-gold-400 hover:bg-dungeon-700 transition-colors duration-200 min-h-12 min-w-12 flex items-center justify-center"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay (solo mobile) */}
      {isOpen && responsiveIsMobile && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          transition-all duration-300 ease-out
          ${responsiveIsMobile
            ? `fixed inset-y-0 left-0 z-40 w-72 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-dungeon-900 border-r border-dungeon-700 flex flex-col`
            : `sticky top-16 z-20 h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] border-r border-dungeon-700 bg-dungeon-900 ${isCollapsed ? 'w-20' : 'w-72'} flex flex-col`
          }
        `}
        role="navigation"
        aria-label="Navegación principal"
      >
        {/* Collapse/Expand toggle button */}
        {!responsiveIsMobile && (
          <button
            onClick={toggleCollapse}
            className="absolute -right-3 top-12 z-50 w-6 h-6 rounded-full bg-dungeon-800 border border-dungeon-700 flex items-center justify-center text-dungeon-400 hover:text-gold-400 hover:bg-dungeon-700 hover:border-gold-500 transition-all duration-200 shadow-lg"
            aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
            style={{ top: '3rem' }} // Force top position
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}

        {/* Navigation - Scrollable area */}
        <nav className="flex-1 min-h-0 overflow-y-auto overflow-x-auto px-3 py-2 sidebar-scrollbar">
          <SidebarNavigation
            user={user ?? undefined}
            profile={profile as any ?? undefined}
            onNavigate={close}
            isCollapsed={isCollapsed && !responsiveIsMobile}
          />
        </nav>

        {/* Footer */}
        {user && profile && !isCollapsed && <SidebarFooter />}
      </aside>

    </>
  );
}
