'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, User, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getUserCharacters, type CharacterSummary } from '@/lib/supabase/characters';
import { useCharacterStore } from '@/lib/store/characterStore';

interface LoadCharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoadCharacterModal({ isOpen, onClose }: LoadCharacterModalProps) {
  const { loadFromSupabase } = useCharacterStore();
  const [characters, setCharacters] = useState<CharacterSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingCharacterId, setLoadingCharacterId] = useState<string | null>(null);

  // ========================================================================
  // CARGAR PERSONAJES
  // ========================================================================
  useEffect(() => {
    if (isOpen) {
      loadCharacters();
    }
  }, [isOpen]);

  const loadCharacters = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getUserCharacters();
      console.log('🔍 DEBUG - Personajes cargados:', data);
      console.log('🔍 DEBUG - Primer personaje:', data[0]);
      setCharacters(data);
    } catch (err) {
      console.error('Error loading characters:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar personajes');
    } finally {
      setIsLoading(false);
    }
  };

  // ========================================================================
  // CARGAR PERSONAJE SELECCIONADO
  // ========================================================================
  const handleLoadCharacter = async (characterId: string) => {
    try {
      setLoadingCharacterId(characterId);
      await loadFromSupabase(characterId);
      onClose();
    } catch (err) {
      console.error('Error loading character:', err);
      alert('Error al cargar el personaje');
    } finally {
      setLoadingCharacterId(null);
    }
  };

  // ========================================================================
  // FORMATEAR FECHA
  // ========================================================================
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'hace unos segundos';
    if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 86400) return `hace ${Math.floor(diffInSeconds / 3600)} horas`;
    if (diffInSeconds < 604800) return `hace ${Math.floor(diffInSeconds / 86400)} días`;

    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // ========================================================================
  // NO RENDERIZAR SI NO ESTÁ ABIERTO
  // ========================================================================
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-dungeon-900 border-2 border-gold-600/50 rounded-lg shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dungeon-700">
          <h2 className="text-2xl font-heading font-bold text-dungeon-100">
            Cargar Personaje
          </h2>
          <button
            onClick={onClose}
            className="text-dungeon-400 hover:text-dungeon-100 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gold-500 mb-4" />
              <p className="text-dungeon-400">Cargando personajes...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400 mb-4">{error}</p>
              <Button variant="primary" size="sm" onClick={loadCharacters}>
                Reintentar
              </Button>
            </div>
          ) : characters.length === 0 ? (
            <div className="text-center py-12">
              <User className="h-16 w-16 mx-auto mb-4 text-dungeon-600" />
              <p className="text-dungeon-400 mb-2">No tienes personajes guardados</p>
              <p className="text-sm text-dungeon-500">
                Guarda este personaje para poder cargarlo más tarde
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {characters.map((character) => {
                // Validar que character tenga la estructura correcta
                const name = typeof character.name === 'string' ? character.name : 'Sin nombre';
                const raceSlug = typeof character.race_slug === 'string' ? character.race_slug : null;
                const classSlug = typeof character.class_slug === 'string' ? character.class_slug : null;
                const level = typeof character.level === 'number' ? character.level : 1;
                const isFavorite = Boolean(character.is_favorite);
                const updatedAt = typeof character.updated_at === 'string' ? character.updated_at : new Date().toISOString();

                return (
                  <button
                    key={character.id}
                    onClick={() => handleLoadCharacter(character.id)}
                    disabled={loadingCharacterId === character.id}
                    className="text-left bg-dungeon-800 border border-dungeon-700 rounded-lg p-4 hover:border-gold-600/50 transition-all disabled:opacity-50"
                  >
                    {/* Character Info */}
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-heading font-bold text-dungeon-100">
                        {name}
                      </h3>
                      {isFavorite && (
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 flex-shrink-0 ml-2" />
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-dungeon-400 mb-3">
                      {raceSlug && (
                        <span className="capitalize">{raceSlug.replace(/-/g, ' ')}</span>
                      )}
                      {raceSlug && classSlug && (
                        <span>•</span>
                      )}
                      {classSlug && (
                        <span className="capitalize">{classSlug.replace(/-/g, ' ')}</span>
                      )}
                      {level > 1 && (
                        <>
                          <span>•</span>
                          <span>Nivel {level}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-dungeon-500">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(updatedAt)}</span>
                    </div>

                    {/* Loading State */}
                    {loadingCharacterId === character.id && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-gold-500">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Cargando...</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-dungeon-700">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
