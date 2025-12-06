'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Filter, Star, Calendar } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { CharacterPreviewCard } from './CharacterPreviewCard';
import { duplicateCharacter, deleteCharacter } from '@/lib/supabase/characters';

interface Character {
  id: string;
  name: string;
  race_slug: string | null;
  class_slug: string | null;
  level: number;
  is_favorite: boolean;
  is_public: boolean;
  updated_at: string;
}

interface CharacterGalleryGridProps {
  userId: string;
  isOwner?: boolean;
  showCreateButton?: boolean;
}

type FilterType = 'all' | 'favorites' | 'recent';

export function CharacterGalleryGrid({
  userId,
  isOwner = false,
  showCreateButton = false
}: CharacterGalleryGridProps) {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    loadCharacters();
  }, [userId]);

  useEffect(() => {
    applyFilter();
  }, [characters, filter]);

  async function loadCharacters() {
    const supabase = createClient();

    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('characters')
        .select('id, name, race_slug, class_slug, level, is_favorite, is_public, updated_at')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      // Si no es el dueño, solo mostrar personajes públicos
      if (!isOwner) {
        query = query.eq('is_public', true);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setCharacters(data || []);
    } catch (err) {
      console.error('Error loading characters:', err);
      setError('Error al cargar los personajes');
    } finally {
      setLoading(false);
    }
  }

  function applyFilter() {
    let filtered = [...characters];

    switch (filter) {
      case 'favorites':
        filtered = filtered.filter(c => c.is_favorite);
        break;
      case 'recent':
        // Already sorted by updated_at DESC
        filtered = filtered.slice(0, 6);
        break;
      case 'all':
      default:
        // No filtering
        break;
    }

    setFilteredCharacters(filtered);
  }

  async function handleToggleFavorite(id: string, isFavorite: boolean) {
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('characters')
        .update({ is_favorite: isFavorite })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setCharacters(prev =>
        prev.map(char =>
          char.id === id ? { ...char, is_favorite: isFavorite } : char
        )
      );
    } catch (err) {
      console.error('Error toggling favorite:', err);
      alert('Error al actualizar favorito');
    }
  }

  async function handleDuplicate(id: string) {
    try {
      const newCharacterId = await duplicateCharacter(id);
      if (newCharacterId) {
        alert('Personaje duplicado exitosamente');
        await loadCharacters(); // Recargar lista
      }
    } catch (err) {
      console.error('Error duplicating character:', err);
      alert('Error al duplicar personaje');
    }
  }

  async function handleDelete(id: string) {
    try {
      const success = await deleteCharacter(id);
      if (success) {
        alert('Personaje eliminado');
        await loadCharacters(); // Recargar lista
      }
    } catch (err) {
      console.error('Error deleting character:', err);
      alert('Error al eliminar personaje');
    }
  }

  function handleEdit(id: string) {
    router.push(`/editor-personajes?loadCharacter=${id}`);
  }

  if (loading) {
    return (
      <div className="text-center py-12" role="status" aria-live="polite">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4" />
        <p className="text-dungeon-200">Cargando personajes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 border border-dashed border-red-500/30 rounded-xl bg-red-900/10" role="alert">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={loadCharacters}
          className="px-4 py-2 bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 rounded-lg text-red-300 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-dungeon-950"
          aria-label="Reintentar carga de personajes"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Empty state
  if (characters.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-dungeon-700 rounded-xl bg-dungeon-950/50" role="status">
        <div className="w-20 h-20 bg-dungeon-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Plus className="w-10 h-10 text-dungeon-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-dungeon-200 mb-2 font-heading">
          {isOwner ? 'No tienes personajes aún' : 'Este usuario no tiene personajes públicos'}
        </h3>
        <p className="text-dungeon-400 mb-8 max-w-md mx-auto">
          {isOwner
            ? 'Crea tu primer personaje para comenzar tu aventura en el mundo de D&D'
            : 'Cuando el usuario haga público algún personaje, aparecerá aquí'}
        </p>
        {isOwner && showCreateButton && (
          <button
            onClick={() => router.push('/editor-personajes')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-950"
            aria-label="Ir al editor de personajes para crear tu primer personaje"
          >
            <Plus className="w-5 h-5" aria-hidden="true" />
            Crear Primer Personaje
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-dungeon-100 flex items-center gap-2 font-heading">
            <Filter className="w-5 h-5 text-gold-500" aria-hidden="true" />
            Personajes
            <span className="text-sm font-normal text-dungeon-300">
              ({filteredCharacters.length} {filteredCharacters.length === 1 ? 'personaje' : 'personajes'})
            </span>
          </h3>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtros de personajes">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-950 ${
              filter === 'all'
                ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                : 'bg-dungeon-800/50 text-dungeon-300 hover:bg-dungeon-700/50 border border-dungeon-700'
            }`}
            aria-pressed={filter === 'all'}
            aria-label={`Mostrar todos los personajes (${characters.length})`}
          >
            Todos ({characters.length})
          </button>

          <button
            onClick={() => setFilter('favorites')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-950 ${
              filter === 'favorites'
                ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                : 'bg-dungeon-800/50 text-dungeon-300 hover:bg-dungeon-700/50 border border-dungeon-700'
            }`}
            aria-pressed={filter === 'favorites'}
            aria-label={`Mostrar solo favoritos (${characters.filter(c => c.is_favorite).length})`}
          >
            <Star className={`w-3 h-3 ${filter === 'favorites' ? 'fill-gold-400' : ''}`} aria-hidden="true" />
            Favoritos ({characters.filter(c => c.is_favorite).length})
          </button>

          <button
            onClick={() => setFilter('recent')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-950 ${
              filter === 'recent'
                ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                : 'bg-dungeon-800/50 text-dungeon-300 hover:bg-dungeon-700/50 border border-dungeon-700'
            }`}
            aria-pressed={filter === 'recent'}
            aria-label="Mostrar personajes recientes (6)"
          >
            <Calendar className="w-3 h-3" aria-hidden="true" />
            Recientes (6)
          </button>
        </div>
      </div>

      {/* Create Button (for owner) */}
      {isOwner && showCreateButton && (
        <button
          onClick={() => router.push('/editor-personajes')}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dungeon-950"
          aria-label="Ir al editor de personajes para crear un nuevo personaje"
        >
          <Plus className="w-5 h-5" aria-hidden="true" />
          Crear Nuevo Personaje
        </button>
      )}

      {/* Characters Grid */}
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCharacters.map(character => (
            <CharacterPreviewCard
              key={character.id}
              character={character}
              onEdit={isOwner ? handleEdit : undefined}
              onDuplicate={isOwner ? handleDuplicate : undefined}
              onDelete={isOwner ? handleDelete : undefined}
              onToggleFavorite={isOwner ? handleToggleFavorite : undefined}
              isOwner={isOwner}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-dungeon-700 rounded-xl bg-dungeon-950/50" role="status">
          <p className="text-dungeon-200">
            {filter === 'favorites' && 'No tienes personajes marcados como favoritos'}
            {filter === 'recent' && 'No hay personajes recientes'}
          </p>
        </div>
      )}
    </div>
  );
}
