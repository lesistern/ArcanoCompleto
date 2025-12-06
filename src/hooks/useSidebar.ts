'use client';

import { create } from 'zustand';
import { useEffect, useState } from 'react';

interface SidebarStore {
  isOpen: boolean;
  isCollapsed: boolean;
  isMobile: boolean;
  isPortrait: boolean;
  toggle: () => void;
  toggleCollapse: () => void;
  setCollapsed: (isCollapsed: boolean) => void;
  close: () => void;
  setIsMobile: (isMobile: boolean) => void;
  setIsPortrait: (isPortrait: boolean) => void;
}



export const useSidebar = create<SidebarStore>((set) => ({
  isOpen: false,
  isCollapsed: false,
  isMobile: false,
  isPortrait: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
  toggleCollapse: () => set((state) => {
    const newCollapsed = !state.isCollapsed;
    // Guardar en localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sidebar-collapsed', String(newCollapsed));
      } catch (error) {
        console.error('Error saving sidebar state:', error);
      }
    }
    return { isCollapsed: newCollapsed };
  }),
  close: () => set({ isOpen: false }),
  setIsMobile: (isMobile) => set({ isMobile }),
  setIsPortrait: (isPortrait) => set({ isPortrait }),
}));

// Hook para detectar cambios en viewport y orientación
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const updateIsMobile = useSidebar((state) => state.setIsMobile);
  const updateIsPortrait = useSidebar((state) => state.setIsPortrait);

  useEffect(() => {
    const checkResponsive = () => {
      const mobile = window.innerWidth < 768; // md breakpoint (768px)
      const portrait = window.innerHeight > window.innerWidth; // Portrait si altura > ancho

      setIsMobile(mobile);
      setIsPortrait(portrait);
      updateIsMobile(mobile);
      updateIsPortrait(portrait);
    };

    checkResponsive();

    // Detectar cambios de viewport y orientación
    window.addEventListener('resize', checkResponsive);
    window.addEventListener('orientationchange', checkResponsive);

    return () => {
      window.removeEventListener('resize', checkResponsive);
      window.removeEventListener('orientationchange', checkResponsive);
    };
  }, [updateIsMobile, updateIsPortrait]);

  return { isMobile, isPortrait };
};
