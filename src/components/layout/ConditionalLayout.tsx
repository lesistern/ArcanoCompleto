'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

// Load components dynamically
const Sidebar = dynamic(() => import('@/components/layout/Sidebar/Sidebar'), {
  ssr: true,
});
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'));
const FloatingButtonGroup = dynamic(() => import('@/components/FloatingButtonGroup'));

interface ConditionalLayoutProps {
  children: ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Check if we're in an admin route (handles both /admin and /es/admin, etc.)
  const isAdminRoute = pathname?.includes('/admin');
  const isRootPage = pathname === '/';

  // For admin routes or root landing page, render only the children (no layout wrapper)
  if (isAdminRoute || isRootPage) {
    return <>{children}</>;
  }

  // For public routes, render the full public layout
  return (
    <>
      {/* Header - Full width */}
      <Header />

      {/* Layout con sidebar y contenido */}
      <LayoutWrapper>
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido principal */}
        <div className="flex flex-col min-h-screen">
          {/* Main content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </LayoutWrapper>

      {/* Botones flotantes */}
      <ScrollToTop />
      <FloatingButtonGroup />
    </>
  );
}
