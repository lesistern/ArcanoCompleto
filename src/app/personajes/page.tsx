'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  Star,
  Loader2,
  User,
  Swords,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getUserCharacters, duplicateCharacter, deleteCharacter, toggleFavorite, togglePublic } from '@/lib/supabase/characters';
import type { CharacterSummary } from '@/lib/supabase/characters';
import { useCharacterStore } from '@/lib/store/characterStore';
import { pageContainerPadding } from '@/lib/utils/responsive-spacing';
import { ClassBadge, formatClassName } from '@/components/classes/ClassBadge';

export default function PersonajesPage() {
  const router = useRouter();
  const { loadFromSupabase } = useCharacterStore();

  const [characters, setCharacters] = useState<CharacterSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // ID del personaje con acción en progreso

  // ========================================================================
  // CARGAR PERSONAJES
  // ========================================================================

  useEffect(() => {
    loadCharacters();
  }, []);

  async function loadCharacters() {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserCharacters();
      setCharacters(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar personajes';
      setError(message);
      console.error('Error loading characters:', err);
    } finally {
      setLoading(false);
    }
  }

  // ========================================================================
  // ACCIONES DE PERSONAJE
  // ========================================================================

  /**
   * Carga un personaje en el editor y redirige
   */
  async function handleEditCharacter(characterId: string) {
    try {
      setActionLoading(characterId);
      await loadFromSupabase(characterId);
      router.push('/editor-personajes');
    } catch (err) {
      console.error('Error loading character:', err);
      alert('Error al cargar el personaje');
      setActionLoading(null);
    }
  }

  /**
   * Duplica un personaje
   */
  async function handleDuplicateCharacter(characterId: string) {
    try {
      setActionLoading(characterId);
      await duplicateCharacter(characterId);
      await loadCharacters(); // Recargar lista
      setActionLoading(null);
    } catch (err) {
      console.error('Error duplicating character:', err);
      alert('Error al duplicar el personaje');
      setActionLoading(null);
    }
  }

  /**
   * Elimina un personaje
   */
  async function handleDeleteCharacter(characterId: string, characterName: string) {
    if (!confirm(`¿Estás seguro de que quieres eliminar a ${characterName}?`)) {
      return;
    }

    try {
      setActionLoading(characterId);
      await deleteCharacter(characterId);
      await loadCharacters(); // Recargar lista
      setActionLoading(null);
    } catch (err) {
      console.error('Error deleting character:', err);
      alert('Error al eliminar el personaje');
      setActionLoading(null);
    }
  }

  /**
   * Marca/desmarca un personaje como favorito
   */
  async function handleToggleFavorite(characterId: string, currentValue: boolean) {
    try {
      setActionLoading(characterId);
      await toggleFavorite(characterId, !currentValue);
      await loadCharacters(); // Recargar lista
      setActionLoading(null);
    } catch (err) {
      console.error('Error toggling favorite:', err);
      alert('Error al actualizar favorito');
      setActionLoading(null);
    }
  }

  /**
   * Marca/desmarca un personaje como público
   */
  async function handleTogglePublic(characterId: string, currentValue: boolean) {
    try {
      setActionLoading(characterId);
      await togglePublic(characterId, !currentValue);
      await loadCharacters(); // Recargar lista
      setActionLoading(null);
    } catch (err) {
      console.error('Error toggling public:', err);
      alert('Error al actualizar visibilidad');
      setActionLoading(null);
    }
  }

  // ========================================================================
  // RENDER
  // ========================================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-dungeon-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-gold-500 animate-spin" />
          <p className="text-dungeon-400">Cargando personajes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dungeon-950">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-6">
              <h2 className="text-lg font-bold text-red-500 mb-2">Error</h2>
              <p className="text-dungeon-300 mb-4">{error}</p>
              <Button variant="primary" onClick={loadCharacters}>
                Reintentar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dungeon-950">
      {/* Header */}
      <div className="border-b border-dungeon-700 bg-dungeon-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-dungeon-100 mb-2">
                Mis Personajes
              </h1>
              <p className="text-dungeon-400">
                {characters.length === 0
                  ? 'No tienes personajes guardados'
                  : `${characters.length} ${characters.length === 1 ? 'personaje' : 'personajes'} guardados`}
              </p>
            </div>

            <Link href="/editor-personajes">
              <Button variant="primary">
                <Plus className="h-4 w-4 mr-2" />
                Crear Nuevo Personaje
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Character Grid */}
      <div className={`container mx-auto ${pageContainerPadding}`}>
        {characters.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="bg-dungeon-900 border border-dungeon-700 rounded-lg p-8">
              <User className="h-16 w-16 text-dungeon-600 mx-auto mb-4" />
              <h2 className="text-xl font-heading font-bold text-dungeon-100 mb-2">
                No tienes personajes
              </h2>
              <p className="text-dungeon-400 mb-6">
                Crea tu primer personaje usando el editor de personajes
              </p>
              <Link href="/editor-personajes">
                <Button variant="primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Personaje
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {characters.map((character) => (
              <div
                key={character.id}
                className="bg-dungeon-900 border border-dungeon-700 rounded-lg overflow-hidden hover:border-gold-500 transition-colors"
              >
                {/* Card Header */}
                <div className="p-4 border-b border-dungeon-700 bg-dungeon-800/50">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-heading font-bold text-dungeon-100 truncate">
                      {character.name}
                    </h3>
                    <button
                      onClick={() => handleToggleFavorite(character.id, character.is_favorite)}
                      disabled={actionLoading === character.id}
                      className={`flex-shrink-0 ml-2 ${
                        character.is_favorite
                          ? 'text-yellow-500'
                          : 'text-dungeon-600 hover:text-dungeon-400'
                      } transition-colors`}
                    >
                      <Star
                        className={`h-5 w-5 ${character.is_favorite ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    {character.race_slug && (
                      <span className="truncate capitalize text-dungeon-400">{character.race_slug.replace(/-/g, ' ')}</span>
                    )}
                    {character.race_slug && character.class_slug && (
                      <span className="text-dungeon-600">•</span>
                    )}
                    {character.class_slug && (
                      <ClassBadge
                        classSlug={character.class_slug}
                        size="xs"
                        clickable={false}
                      />
                    )}
                  </div>

                  {character.level > 1 && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gold-500/10 text-gold-500 text-xs font-medium">
                        Nivel {character.level}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <div className="text-xs text-dungeon-500 mb-4">
                    Actualizado {new Date(character.updated_at).toLocaleDateString('es-ES')}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditCharacter(character.id)}
                      disabled={actionLoading === character.id}
                      className="w-full"
                    >
                      {actionLoading === character.id ? (
                        <>
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Cargando...
                        </>
                      ) : (
                        <>
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </>
                      )}
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="md"
                        onClick={() => handleTogglePublic(character.id, character.is_public || false)}
                        disabled={actionLoading === character.id}
                        title={character.is_public ? 'Hacer privado' : 'Hacer público'}
                        aria-label={character.is_public ? 'Hacer privado' : 'Hacer público'}
                        className="flex-1 min-h-12 hover:bg-dungeon-700 transition-colors"
                      >
                        {character.is_public ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="md"
                        onClick={() => handleDuplicateCharacter(character.id)}
                        disabled={actionLoading === character.id}
                        title="Duplicar personaje"
                        aria-label="Duplicar personaje"
                        className="flex-1 min-h-12 hover:bg-dungeon-700 transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="md"
                        onClick={() => handleDeleteCharacter(character.id, character.name)}
                        disabled={actionLoading === character.id}
                        title="Eliminar personaje"
                        aria-label="Eliminar personaje"
                        className="flex-1 min-h-12 hover:bg-red-900 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
