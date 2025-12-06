'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: string | number;
  isAdmin?: boolean;
  onClick?: () => void;
  isCollapsed?: boolean;
}

export default function SidebarItem({
  href,
  icon: Icon,
  label,
  badge,
  isAdmin = false,
  onClick,
  isCollapsed = false,
  target,
}: SidebarItemProps & { target?: string }) {
  const pathname = usePathname();

  // Remover locale del pathname para comparación
  const normalizedPathname = pathname.replace(/^\/[a-z]{2}/, '');
  const normalizedHref = href.replace(/^\/[a-z]{2}/, '');

  const isActive =
    normalizedPathname === normalizedHref ||
    normalizedPathname.startsWith(normalizedHref + '/');

  const handleClick = () => {
    onClick?.();
  };

  const baseClasses = `
    flex items-center gap-3 px-4 py-2.5 rounded-lg
    text-dungeon-400 transition-all duration-200
    hover:bg-dungeon-800 hover:text-gold-400 group
    ${isCollapsed ? 'justify-center' : ''}
  `;

  const activeClasses = isActive
    ? 'bg-dungeon-800 text-gold-400 border-l-4 border-gold-500'
    : '';

  const adminClasses = isAdmin ? 'opacity-75 hover:opacity-100' : '';

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${baseClasses} ${activeClasses} ${adminClasses}`}
      aria-current={isActive ? 'page' : undefined}
      title={isCollapsed ? label : undefined}
      target={target}
    >
      <Icon size={20} className="flex-shrink-0 transition-transform group-hover:scale-110" />
      {!isCollapsed && (
        <>
          <span className="flex-1 whitespace-nowrap text-sm font-medium">{label}</span>
          {badge && (
            <span
              className={`px-2 py-1 text-xs font-bold rounded-full flex-shrink-0 ${isActive
                ? 'bg-gold-500/30 text-gold-300'
                : 'bg-dungeon-700 text-dungeon-300'
                }`}
            >
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}
