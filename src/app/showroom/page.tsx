'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Copy,
  Loader2,
  User,
  Shield,
  Calendar,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getPublicCharacters, copyPublicCharacter, type CharacterSummary } from '@/lib/supabase/characters';
import { createClient } from '@/lib/supabase/client';
import { ClassBadge } from '@/components/classes/ClassBadge';

export default function ShowroomPage() {
  const [characters, setCharacters] = useState<CharacterSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copyingId, setCopyingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // ========================================================================
  // CARGAR PERSONAJES PÚBLICOS Y USUARIO ACTUAL
  // ========================================================================

  useEffect(() => {
    loadPublicCharacters();
    loadCurrentUser();
  }, []);

  async function loadCurrentUser() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);
  }

  async function loadPublicCharacters() {
    try {
      setLoading(true);
      setError(null);
      const data = await getPublicCharacters(100); // Obtener hasta 100 personajes
      setCharacters(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar personajes';
      setError(message);
      console.error('Error loading public characters:', err);
    } finally {
      setLoading(false);
    }
  }

  // ========================================================================
  // COPIAR PERSONAJE
  // ========================================================================

  async function handleCopyCharacter(characterId: string) {
    if (!currentUserId) {
      alert('Debes iniciar sesión para copiar personajes');
      return;
    }

    try {
      setCopyingId(characterId);
      await copyPublicCharacter(characterId);

      // Mostrar confirmación
      setCopiedId(characterId);
      setTimeout(() => setCopiedId(null), 3000); // Ocultar después de 3s
    } catch (err) {
      console.error('Error copying character:', err);
      alert(err instanceof Error ? err.message : 'Error al copiar personaje');
    } finally {
      setCopyingId(null);
    }
  }

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
  // RENDER: LOADING
  // ========================================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-dungeon-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-gold-500 animate-spin" />
          <p className="text-dungeon-400">Cargando showroom...</p>
        </div>
      </div>
    );
  }

  // ========================================================================
  // RENDER: ERROR
  // ========================================================================

  if (error) {
    return (
      <div className="min-h-screen bg-dungeon-950">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-6">
              <h2 className="text-lg font-bold text-red-500 mb-2">Error</h2>
              <p className="text-dungeon-300 mb-4">{error}</p>
              <Button variant="primary" onClick={loadPublicCharacters}>
                Reintentar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================================
  // RENDER: PÁGINA PRINCIPAL
  // ========================================================================

  return (
    <div className="min-h-screen bg-dungeon-950">
      {/* Header */}
      <div className="border-b border-dungeon-700 bg-dungeon-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Globe className="h-8 w-8 text-gold-500" />
                <h1 className="text-3xl font-heading font-bold text-dungeon-100">
                  Showroom de Personajes
                </h1>
              </div>
              <p className="text-dungeon-400">
                {characters.length === 0
                  ? 'No hay personajes públicos disponibles'
                  : `${characters.length} ${characters.length === 1 ? 'personaje público' : 'personajes públicos'}`}
              </p>
            </div>

            {currentUserId && (
              <Link href="/personajes">
                <Button variant="ghost">
                  <User className="h-4 w-4 mr-2" />
                  Mis Personajes
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Character Grid */}
      <div className="container mx-auto px-4 py-8">
        {characters.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="bg-dungeon-900 border border-dungeon-700 rounded-lg p-8">
              <Globe className="h-16 w-16 text-dungeon-600 mx-auto mb-4" />
              <h2 className="text-xl font-heading font-bold text-dungeon-100 mb-2">
                No hay personajes públicos
              </h2>
              <p className="text-dungeon-400 mb-6">
                Sé el primero en compartir un personaje público
              </p>
              {currentUserId && (
                <Link href="/personajes">
                  <Button variant="primary">
                    <User className="h-4 w-4 mr-2" />
                    Ir a Mis Personajes
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character) => {
              const isOwner = character.user_id === currentUserId;
              const isCopied = copiedId === character.id;
              const isCopying = copyingId === character.id;

              return (
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
                      <Globe className="h-5 w-5 text-gold-500 flex-shrink-0 ml-2" />
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
                          clickable={true}
                        />
                      )}
                    </div>

                    {character.level > 1 && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded bg-gold-500/10 text-gold-500 text-xs font-medium">
                          <Shield className="h-3 w-3 mr-1" />
                          Nivel {character.level}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    <div className="flex items-center gap-1 text-xs text-dungeon-500 mb-4">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(character.updated_at)}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link href={`/personajes/${character.id}`} className="flex-1">
                        <Button variant="ghost" size="sm" className="w-full">
                          Ver Detalles
                        </Button>
                      </Link>

                      {!isOwner && (
                        <Button
                          variant={isCopied ? 'primary' : 'primary'}
                          size="sm"
                          onClick={() => handleCopyCharacter(character.id)}
                          disabled={isCopying || !currentUserId}
                          title={!currentUserId ? 'Inicia sesión para copiar' : 'Copiar a tu cuenta'}
                          className="flex-1"
                        >
                          {isCopying ? (
                            <>
                              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              Copiando...
                            </>
                          ) : isCopied ? (
                            <>
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              ¡Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 mr-1" />
                              Copiar
                            </>
                          )}
                        </Button>
                      )}

                      {isOwner && (
                        <div className="flex-1 flex items-center justify-center text-xs text-dungeon-500">
                          (Tu personaje)
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
