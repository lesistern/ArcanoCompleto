'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Copy,
  Loader2,
  Shield,
  Heart,
  Swords,
  Brain,
  Eye,
  Zap,
  CheckCircle2,
  Globe,
  Lock
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { getCharacter, copyPublicCharacter, type CharacterRow } from '@/lib/supabase/characters';
import { createClient } from '@/lib/supabase/client';
import { getAlignmentLabel } from '@/lib/utils/alignment';

export default function CharacterDetailPage() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;

  const [character, setCharacter] = useState<CharacterRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // ========================================================================
  // CARGAR PERSONAJE Y USUARIO ACTUAL
  // ========================================================================

  useEffect(() => {
    loadCharacter();
    loadCurrentUser();
  }, [characterId]);

  async function loadCurrentUser() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);
  }

  async function loadCharacter() {
    try {
      setLoading(true);
      setError(null);
      const data = await getCharacter(characterId);

      // Verificar si el personaje es público o si el usuario es el dueño
      if (!data.is_public && data.user_id !== currentUserId) {
        setError('Este personaje es privado');
        return;
      }

      setCharacter(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar personaje';
      setError(message);
      console.error('Error loading character:', err);
    } finally {
      setLoading(false);
    }
  }

  // ========================================================================
  // COPIAR PERSONAJE
  // ========================================================================

  async function handleCopyCharacter() {
    if (!currentUserId) {
      alert('Debes iniciar sesión para copiar personajes');
      return;
    }

    if (!character?.is_public) {
      alert('Este personaje no es público');
      return;
    }

    try {
      setCopying(true);
      await copyPublicCharacter(characterId);

      // Mostrar confirmación
      setCopied(true);
      setTimeout(() => {
        router.push('/personajes');
      }, 2000);
    } catch (err) {
      console.error('Error copying character:', err);
      alert(err instanceof Error ? err.message : 'Error al copiar personaje');
      setCopying(false);
    }
  }

  // ========================================================================
  // CALCULAR MODIFICADOR DE HABILIDAD
  // ========================================================================

  const calculateModifier = (score: number): string => {
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  };

  // ========================================================================
  // RENDER: LOADING
  // ========================================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-dungeon-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-gold-500 animate-spin" />
          <p className="text-dungeon-400">Cargando personaje...</p>
        </div>
      </div>
    );
  }

  // ========================================================================
  // RENDER: ERROR
  // ========================================================================

  if (error || !character) {
    return (
      <div className="min-h-screen bg-dungeon-950">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-6">
              <Lock className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-lg font-bold text-red-500 mb-2">
                {error || 'Personaje no encontrado'}
              </h2>
              <p className="text-dungeon-300 mb-4">
                Este personaje no existe o es privado
              </p>
              <Link href="/showroom">
                <Button variant="primary">
                  Volver al Showroom
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = character.user_id === currentUserId;
  const abilityScores = character.ability_scores.current;

  // ========================================================================
  // RENDER: PÁGINA PRINCIPAL
  // ========================================================================

  return (
    <div className="min-h-screen bg-dungeon-950">
      {/* Header */}
      <div className="border-b border-dungeon-700 bg-dungeon-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/showroom">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Showroom
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              {character.is_public ? (
                <div className="flex items-center gap-1 text-xs text-gold-500">
                  <Globe className="h-4 w-4" />
                  <span>Público</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs text-dungeon-500">
                  <Lock className="h-4 w-4" />
                  <span>Privado</span>
                </div>
              )}

              {!isOwner && character.is_public && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCopyCharacter}
                  disabled={copying || !currentUserId}
                >
                  {copying ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Copiando...
                    </>
                  ) : copied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar a mi cuenta
                    </>
                  )}
                </Button>
              )}

              {isOwner && (
                <Link href="/personajes">
                  <Button variant="primary" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Mis Personajes
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Character Name */}
          <div className="mb-2">
            <h1 className="text-4xl font-heading font-bold text-dungeon-100">
              {character.name}
            </h1>
          </div>

          {/* Character Info */}
          <div className="flex items-center gap-3 text-dungeon-400">
            {character.race_slug && (
              <span className="capitalize">{character.race_slug.replace('-', ' ')}</span>
            )}
            {character.class_slug && (
              <>
                <span>•</span>
                <span className="capitalize">{character.class_slug.replace('-', ' ')}</span>
              </>
            )}
            {character.level > 1 && (
              <>
                <span>•</span>
                <span>Nivel {character.level}</span>
              </>
            )}
            {character.alignment && (
              <>
                <span>•</span>
                <span>{getAlignmentLabel(character.alignment)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Ability Scores */}
          <div className="lg:col-span-1">
            <div className="bg-dungeon-900 border border-dungeon-700 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-heading font-bold text-dungeon-100 mb-4">
                Puntuaciones de Habilidad
              </h2>

              <div className="space-y-3">
                {Object.entries(abilityScores).map(([ability, score]) => (
                  <div
                    key={ability}
                    className="flex items-center justify-between p-3 bg-dungeon-800 rounded-lg"
                  >
                    <span className="text-dungeon-300 capitalize">{ability}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-dungeon-100">{score}</span>
                      <span className="text-lg font-medium text-gold-500 min-w-[3rem] text-right">
                        {calculateModifier(score)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Combat Stats */}
            <div className="bg-dungeon-900 border border-dungeon-700 rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold text-dungeon-100 mb-4">
                Estadísticas de Combate
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-dungeon-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-gold-500" />
                    <span className="text-dungeon-300">Clase de Armadura</span>
                  </div>
                  <span className="text-2xl font-bold text-dungeon-100">
                    {character.armor_class || 10}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-dungeon-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span className="text-dungeon-300">Puntos de Golpe</span>
                  </div>
                  <span className="text-2xl font-bold text-dungeon-100">
                    {character.hit_points_current || 0} / {character.hit_points_max || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-dungeon-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="text-dungeon-300">Velocidad</span>
                  </div>
                  <span className="text-2xl font-bold text-dungeon-100">
                    {character.speed || 30} pies
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Skills, Feats, Equipment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            {Object.keys(character.skills).length > 0 && (
              <div className="bg-dungeon-900 border border-dungeon-700 rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                  <Brain className="h-6 w-6 text-gold-500" />
                  Pericias
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(character.skills)
                    .filter(([_, ranks]) => ranks > 0)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([skill, ranks]) => (
                      <div
                        key={skill}
                        className="flex items-center justify-between p-2 bg-dungeon-800 rounded"
                      >
                        <span className="text-dungeon-300 text-sm capitalize">
                          {skill.replace(/_/g, ' ')}
                        </span>
                        <span className="text-dungeon-100 font-medium">{ranks} rangos</span>
                      </div>
                    ))}
                </div>

                {Object.values(character.skills).every((ranks) => ranks === 0) && (
                  <p className="text-dungeon-500 text-center py-4">Sin pericias entrenadas</p>
                )}
              </div>
            )}

            {/* Feats */}
            {character.feats.length > 0 && (
              <div className="bg-dungeon-900 border border-dungeon-700 rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold text-dungeon-100 mb-4 flex items-center gap-2">
                  <Swords className="h-6 w-6 text-gold-500" />
                  Dotes
                </h2>

                <div className="flex flex-wrap gap-2">
                  {character.feats.map((feat, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-dungeon-800 border border-dungeon-700 rounded-full text-sm text-dungeon-300"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment */}
            {(character.equipment.weapons.length > 0 ||
              character.equipment.armor.length > 0 ||
              character.equipment.items.length > 0) && (
              <div className="bg-dungeon-900 border border-dungeon-700 rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold text-dungeon-100 mb-4">
                  Equipamiento
                </h2>

                {character.equipment.weapons.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-dungeon-200 mb-2">Armas</h3>
                    <ul className="space-y-1 text-dungeon-400">
                      {character.equipment.weapons.map((weapon: any, index: number) => (
                        <li key={index}>{weapon.name || weapon}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {character.equipment.armor.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-dungeon-200 mb-2">Armadura</h3>
                    <ul className="space-y-1 text-dungeon-400">
                      {character.equipment.armor.map((armor: any, index: number) => (
                        <li key={index}>{armor.name || armor}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {character.equipment.items.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-dungeon-200 mb-2">Objetos</h3>
                    <ul className="space-y-1 text-dungeon-400">
                      {character.equipment.items.map((item: any, index: number) => (
                        <li key={index}>{item.name || item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Currency */}
                {(character.equipment.gold > 0 ||
                  character.equipment.silver > 0 ||
                  character.equipment.copper > 0) && (
                  <div className="mt-4 pt-4 border-t border-dungeon-700">
                    <h3 className="text-lg font-semibold text-dungeon-200 mb-2">Monedas</h3>
                    <div className="flex gap-4 text-dungeon-400">
                      {character.equipment.gold > 0 && (
                        <span>{character.equipment.gold} po</span>
                      )}
                      {character.equipment.silver > 0 && (
                        <span>{character.equipment.silver} pp</span>
                      )}
                      {character.equipment.copper > 0 && (
                        <span>{character.equipment.copper} pc</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Background & Notes */}
            {(character.background || character.notes) && (
              <div className="bg-dungeon-900 border border-dungeon-700 rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold text-dungeon-100 mb-4">
                  Información Adicional
                </h2>

                {character.background && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-dungeon-200 mb-2">
                      Trasfondo
                    </h3>
                    <p className="text-dungeon-400 whitespace-pre-wrap">
                      {character.background}
                    </p>
                  </div>
                )}

                {character.notes && (
                  <div>
                    <h3 className="text-lg font-semibold text-dungeon-200 mb-2">Notas</h3>
                    <p className="text-dungeon-400 whitespace-pre-wrap">{character.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
