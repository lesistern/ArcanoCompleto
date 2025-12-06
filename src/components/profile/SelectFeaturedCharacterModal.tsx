'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, User, Star, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { getClassIcon } from '@/lib/utils/classIcons';
import { getClassColor, getRaceIcon, getRaceColor } from '@/lib/utils/icons';

interface Character {
  id: string;
  name: string;
  class_slug: string;
  race_slug: string;
  level: number;
  avatar_url: string | null;
  is_favorite: boolean;
}

interface SelectFeaturedCharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (characterId: string) => void;
  currentFeaturedId: string | null;
}

export function SelectFeaturedCharacterModal({
  isOpen,
  onClose,
  onSelect,
  currentFeaturedId
}: SelectFeaturedCharacterModalProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    if (isOpen) {
      loadCharacters();
    }
  }, [isOpen]);

  async function loadCharacters() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.error('Usuario no autenticado');
        return;
      }

      const { data, error } = await supabase
        .from('characters')
        .select('id, name, class_slug, race_slug, level, avatar_url, is_favorite')
        .eq('user_id', user.id)
        .order('is_favorite', { ascending: false })
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error loading characters:', error);
        return;
      }

      setCharacters(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleSelect = async (characterId: string) => {
    setSelecting(characterId);
    try {
      await onSelect(characterId);
      onClose();
    } catch (error) {
      console.error('Error selecting character:', error);
    } finally {
      setSelecting(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-dungeon-900 border border-dungeon-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dungeon-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold-500/20 border border-gold-500/40">
              <Star className="h-5 w-5 text-gold-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gold-300">
                Seleccionar Personaje Destacado
              </h2>
              <p className="text-sm text-dungeon-400">
                Elige el personaje que quieres mostrar en tu perfil
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dungeon-800 rounded-lg transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="h-6 w-6 text-dungeon-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-gold-400 animate-spin mb-4" />
              <p className="text-dungeon-400">Cargando personajes...</p>
            </div>
          ) : characters.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dungeon-800 border-2 border-dungeon-700">
                <User className="h-8 w-8 text-dungeon-500" />
              </div>
              <p className="text-dungeon-300 mb-2">No tienes personajes</p>
              <p className="text-sm text-dungeon-400">
                Crea tu primer personaje en el editor para poder destacarlo
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {characters.map((character) => {
                const classColor = getClassColor(character.class_slug);
                const raceColor = getRaceColor(character.race_slug);
                const ClassIcon = getClassIcon(character.class_slug);
                const RaceIcon = getRaceIcon(character.race_slug);
                const isCurrentFeatured = character.id === currentFeaturedId;
                const isSelecting = selecting === character.id;

                const className = character.class_slug.split('-').map(word =>
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');

                const raceName = character.race_slug.split('-').map(word =>
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');

                return (
                  <button
                    key={character.id}
                    onClick={() => handleSelect(character.id)}
                    disabled={isSelecting || isCurrentFeatured}
                    className={`
                      relative group text-left p-4 rounded-lg border-2 transition-all
                      ${isCurrentFeatured
                        ? 'border-gold-500 bg-gold-500/10 cursor-default'
                        : 'border-dungeon-700 hover:border-gold-500/50 bg-dungeon-800 hover:bg-dungeon-800/80'
                      }
                      ${isSelecting ? 'opacity-50 cursor-wait' : ''}
                    `}
                  >
                    {/* Badge de destacado actual */}
                    {isCurrentFeatured && (
                      <div className="absolute top-2 right-2">
                        <div className="flex items-center gap-1 px-2 py-1 bg-gold-500/20 border border-gold-500/40 rounded-full">
                          <Star className="h-3 w-3 text-gold-400 fill-gold-400" />
                          <span className="text-xs font-semibold text-gold-300">Actual</span>
                        </div>
                      </div>
                    )}

                    {/* Loader mientras selecciona */}
                    {isSelecting && (
                      <div className="absolute inset-0 flex items-center justify-center bg-dungeon-900/80 rounded-lg">
                        <Loader2 className="h-6 w-6 text-gold-400 animate-spin" />
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-dungeon-600 group-hover:border-gold-500/50 transition-colors">
                        {character.avatar_url ? (
                          <Image
                            src={character.avatar_url}
                            alt={character.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-dungeon-700 to-dungeon-800 flex items-center justify-center">
                            <User className="h-8 w-8 text-dungeon-500" />
                          </div>
                        )}
                        {character.is_favorite && (
                          <div className="absolute top-1 right-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gold-300 truncate mb-1">
                          {character.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={classColor}>
                            {className} {character.level}
                          </span>
                          <span className="text-dungeon-500">•</span>
                          <span className={raceColor}>
                            {raceName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-dungeon-700 bg-dungeon-900/50">
          <p className="text-sm text-dungeon-400">
            {characters.length} personaje{characters.length !== 1 ? 's' : ''} disponible{characters.length !== 1 ? 's' : ''}
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-200 rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
