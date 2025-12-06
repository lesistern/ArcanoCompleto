'use client';

import { usePatreonFixed } from '@/hooks/usePatreon';
import { User } from '@supabase/supabase-js';

interface PatreonBadgeProps {
  user?: User | null;
  size?: 'sm' | 'md' | 'lg';
  showPrice?: boolean;
}

/**
 * PatreonBadge - Muestra el badge del tier de Patreon del usuario
 *
 * @param user - Usuario de Supabase (opcional, se obtiene automáticamente si no se proporciona)
 * @param size - Tamaño del badge (sm, md, lg)
 * @param showPrice - Mostrar el precio del tier
 */
export default function PatreonBadge({ user, size = 'md', showPrice = false }: PatreonBadgeProps) {
  const { tierInfo, loading, isFree } = usePatreonFixed(user);

  // No mostrar nada para usuarios free o mientras carga
  if (loading || isFree || !tierInfo) {
    return null;
  }

  // Clases de tamaño
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-1.5 text-base gap-2',
  };

  const iconSizeClasses = {
    sm: 'text-xs',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Efectos especiales según tier
  const getEffects = () => {
    switch (tierInfo.tier_code) {
      case 'leyenda_viviente':
        return 'animate-pulse shadow-lg shadow-purple-500/50 border-purple-500/40';
      case 'campeon_consagrado':
        return 'shadow-md shadow-gold-500/30 border-gold-500/40';
      case 'heroe_emergente':
        return 'border-blue-500/40';
      default:
        return '';
    }
  };

  return (
    <div
      className={`
        inline-flex items-center
        rounded-full border-2
        ${tierInfo.tier_color} border-current
        bg-dungeon-800/50 backdrop-blur-sm
        font-semibold
        ${sizeClasses[size]}
        ${getEffects()}
        transition-all duration-300
      `}
      title={`${tierInfo.tier_name}${showPrice ? ` - ${tierInfo.tier_price}` : ''}`}
    >
      <span className={iconSizeClasses[size]}>{tierInfo.tier_icon}</span>
      <span>{tierInfo.tier_name}</span>
      {showPrice && (
        <span className="opacity-70 text-xs">({tierInfo.tier_price})</span>
      )}
    </div>
  );
}
