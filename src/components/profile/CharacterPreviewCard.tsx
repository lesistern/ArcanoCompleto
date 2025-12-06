'use client';

import { useState, memo } from 'react';
import Link from 'next/link';
import { Swords, Eye, Edit2, Copy, Trash2, MoreVertical, Star } from 'lucide-react';
import { getClassIcon } from '@/lib/utils/classIcons';
import { getClassColor, extractTextColor } from '@/lib/utils/icons';

interface CharacterPreviewCardProps {
  character: {
    id: string;
    name: string;
    race_slug: string | null;
    class_slug: string | null;
    level: number;
    is_favorite: boolean;
    updated_at: string;
  };
  onEdit?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string, isFavorite: boolean) => void;
  isOwner?: boolean;
}

export const CharacterPreviewCard = memo(function CharacterPreviewCard({
  character,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleFavorite,
  isOwner = false
}: CharacterPreviewCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Obtener icono y color de la clase
  const ClassIcon = character.class_slug ? getClassIcon(character.class_slug) : Swords;
  const classColor = character.class_slug ? getClassColor(character.class_slug) : 'text-gold-400';
  const iconColor = extractTextColor(classColor);

  // Formatear nombre de clase y raza
  const className = character.class_slug
    ? character.class_slug.charAt(0).toUpperCase() + character.class_slug.slice(1).replace(/-/g, ' ')
    : 'Sin clase';
  const raceName = character.race_slug
    ? character.race_slug.charAt(0).toUpperCase() + character.race_slug.slice(1).replace(/-/g, ' ')
    : 'Sin raza';

  const handleAction = async (action: () => void) => {
    setIsLoading(true);
    setShowMenu(false);
    try {
      await action();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-dungeon-800 to-dungeon-900 border border-dungeon-700 rounded-xl p-6 hover:border-dungeon-600 transition-all hover:shadow-xl hover:-translate-y-1">
      {/* Favorite Star Badge */}
      {character.is_favorite && (
        <div className="absolute top-3 right-3 z-10" aria-hidden="true">
          <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
        </div>
      )}

      {/* Class Icon */}
      <div className="flex items-center justify-center mb-4" aria-hidden="true">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${classColor.replace('text-', 'from-')}/20 to-dungeon-900 flex items-center justify-center border-2 ${classColor.replace('text-', 'border-')}/40`}>
          <ClassIcon className={`w-10 h-10 ${iconColor}`} />
        </div>
      </div>

      {/* Character Info */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-dungeon-100 mb-1 truncate font-heading">
          {character.name || 'Sin nombre'}
        </h3>
        <p className={`text-sm font-semibold ${classColor} mb-1`}>
          {className} - Nivel {character.level}
        </p>
        <p className="text-xs text-dungeon-300">
          {raceName}
        </p>
      </div>

      {/* Last Updated */}
      <div className="text-center mb-4">
        <p className="text-xs text-dungeon-400">
          Actualizado: {new Date(character.updated_at).toLocaleDateString('es-ES')}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-2">
        {/* View Button */}
        <Link
          href={`/personajes/${character.id}`}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-dungeon-900"
          aria-label={`Ver detalles de ${character.name || 'personaje sin nombre'}`}
        >
          <Eye className="w-4 h-4" aria-hidden="true" />
          Ver
        </Link>

        {/* Owner Actions */}
        {isOwner && (
          <>
            {/* Edit Button */}
            {onEdit && (
              <button
                onClick={() => handleAction(() => onEdit(character.id))}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 rounded-lg transition-colors text-green-400 text-sm font-semibold disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-dungeon-900"
                aria-label={`Editar ${character.name || 'personaje'}`}
              >
                <Edit2 className="w-4 h-4" aria-hidden="true" />
                Editar
              </button>
            )}

            {/* More Actions Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 bg-dungeon-700/50 border border-dungeon-600 hover:bg-dungeon-700 rounded-lg transition-colors text-dungeon-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-900"
                aria-label="Más acciones"
                aria-expanded={showMenu}
                aria-haspopup="true"
              >
                <MoreVertical className="w-4 h-4" aria-hidden="true" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                    aria-hidden="true"
                  />

                  {/* Menu */}
                  <div
                    className="absolute right-0 top-full mt-2 w-48 bg-dungeon-800 border border-dungeon-700 rounded-lg shadow-xl z-20 overflow-hidden"
                    role="menu"
                    aria-label="Acciones del personaje"
                  >
                    {onToggleFavorite && (
                      <button
                        onClick={() => handleAction(() => onToggleFavorite(character.id, !character.is_favorite))}
                        disabled={isLoading}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-dungeon-700 transition-colors text-left text-sm text-dungeon-200 disabled:opacity-50 focus:outline-none focus:bg-dungeon-700 focus:ring-2 focus:ring-inset focus:ring-gold-500"
                        role="menuitem"
                        aria-label={character.is_favorite ? `Quitar ${character.name || 'personaje'} de favoritos` : `Marcar ${character.name || 'personaje'} como favorito`}
                      >
                        <Star className={`w-4 h-4 ${character.is_favorite ? 'fill-gold-400 text-gold-400' : 'text-dungeon-400'}`} aria-hidden="true" />
                        {character.is_favorite ? 'Quitar favorito' : 'Marcar favorito'}
                      </button>
                    )}

                    {onDuplicate && (
                      <button
                        onClick={() => handleAction(() => onDuplicate(character.id))}
                        disabled={isLoading}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-dungeon-700 transition-colors text-left text-sm text-dungeon-200 disabled:opacity-50 focus:outline-none focus:bg-dungeon-700 focus:ring-2 focus:ring-inset focus:ring-gold-500"
                        role="menuitem"
                        aria-label={`Duplicar ${character.name || 'personaje'}`}
                      >
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        Duplicar
                      </button>
                    )}

                    {onDelete && (
                      <button
                        onClick={() => {
                          if (confirm('¿Estás seguro de que quieres eliminar este personaje?')) {
                            handleAction(() => onDelete(character.id));
                          } else {
                            setShowMenu(false);
                          }
                        }}
                        disabled={isLoading}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-900/30 transition-colors text-left text-sm text-red-400 disabled:opacity-50 border-t border-dungeon-700 focus:outline-none focus:bg-red-900/30 focus:ring-2 focus:ring-inset focus:ring-red-500"
                        role="menuitem"
                        aria-label={`Eliminar ${character.name || 'personaje'}`}
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                        Eliminar
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-dungeon-900/80 rounded-xl flex items-center justify-center" role="status" aria-live="polite" aria-label="Procesando acción">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500" />
        </div>
      )}
    </div>
  );
});
