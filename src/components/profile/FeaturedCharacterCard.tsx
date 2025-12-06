'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Swords, Users, TrendingUp, Star, X } from 'lucide-react';
import { getClassIcon } from '@/lib/utils/classIcons';
import { getClassColor, getRaceIcon, getRaceColor } from '@/lib/utils/icons';

interface FeaturedCharacter {
  id: string;
  name: string;
  class_slug: string;
  race_slug: string;
  level: number;
  avatar_url: string | null;
}

interface FeaturedCharacterCardProps {
  character: FeaturedCharacter | null;
  isOwner: boolean;
  onRemove?: () => void;
  onSelect?: () => void;
}

export function FeaturedCharacterCard({
  character,
  isOwner,
  onRemove,
  onSelect
}: FeaturedCharacterCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  // Si no hay personaje destacado y es propietario, mostrar CTA
  if (!character && isOwner) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-dashed border-dungeon-600 bg-dungeon-900/50 p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10 border-2 border-gold-500/30">
            <Star className="h-8 w-8 text-gold-400" />
          </div>
          <h3 className="text-xl font-bold text-gold-300 mb-2">
            Destaca un Personaje
          </h3>
          <p className="text-dungeon-300 mb-6 max-w-md mx-auto">
            Selecciona uno de tus personajes para mostrarlo en tu perfil público.
            Los visitantes verán sus estadísticas principales.
          </p>
          {onSelect && (
            <button
              onClick={onSelect}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-dungeon-950 font-semibold rounded-lg transition-colors"
            >
              <Star className="h-5 w-5" />
              Seleccionar Personaje
            </button>
          )}
        </div>
      </div>
    );
  }

  // Si no hay personaje y no es propietario, no mostrar nada
  if (!character) {
    return null;
  }

  // Obtener info de clase y raza
  const classColor = getClassColor(character.class_slug);
  const raceColor = getRaceColor(character.race_slug);
  const ClassIcon = getClassIcon(character.class_slug);
  const RaceIcon = getRaceIcon(character.race_slug);

  // Formatear nombre de clase y raza
  const className = character.class_slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const raceName = character.race_slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const handleRemove = async () => {
    if (!onRemove) return;
    setIsRemoving(true);
    try {
      await onRemove();
    } catch (error) {
      console.error('Error removing featured character:', error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-gold-500/30 bg-gradient-to-br from-gold-900/30 via-dungeon-800 to-dungeon-900">
      {/* Overlay de brillo */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none" />

      {/* Badge "Destacado" */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gold-500/20 border border-gold-500/40 rounded-full backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 text-gold-400 fill-gold-400" />
          <span className="text-xs font-semibold text-gold-300">Destacado</span>
        </div>
      </div>

      {/* Botón de remover (solo para owner) */}
      {isOwner && onRemove && (
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="absolute top-4 left-4 z-10 p-2 bg-dungeon-800/80 hover:bg-red-500/20 border border-dungeon-700 hover:border-red-500/40 rounded-lg transition-colors group"
          aria-label="Remover personaje destacado"
        >
          <X className="h-4 w-4 text-dungeon-400 group-hover:text-red-400 transition-colors" />
        </button>
      )}

      <div className="relative p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Link
              href={`/personajes/${character.id}`}
              className="block group"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-2 border-gold-500/40 group-hover:border-gold-400/60 transition-colors">
                {character.avatar_url ? (
                  <Image
                    src={character.avatar_url}
                    alt={character.name}
                    fill
                    sizes="(max-width: 768px) 96px, 128px"
                    className="object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-dungeon-700 to-dungeon-800 flex items-center justify-center">
                    <User className="h-12 w-12 md:h-16 md:h-16 text-dungeon-500" />
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* Info del personaje */}
          <div className="flex-1 min-w-0">
            {/* Nombre */}
            <Link
              href={`/personajes/${character.id}`}
              className="group"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gold-300 group-hover:text-gold-400 transition-colors mb-2">
                {character.name}
              </h3>
            </Link>

            {/* Stats principales */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {/* Clase */}
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${classColor.replace('text-', 'from-')}/20 to-dungeon-800/50 border border-${classColor.replace('text-', '')}/30`}>
                  <ClassIcon className={`h-5 w-5 ${classColor}`} />
                </div>
                <div>
                  <p className="text-xs text-dungeon-400">Clase</p>
                  <p className={`font-semibold ${classColor}`}>{className}</p>
                </div>
              </div>

              {/* Raza */}
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${raceColor.replace('text-', 'from-')}/20 to-dungeon-800/50 border border-${raceColor.replace('text-', '')}/30`}>
                  <RaceIcon className={`h-5 w-5 ${raceColor}`} />
                </div>
                <div>
                  <p className="text-xs text-dungeon-400">Raza</p>
                  <p className={`font-semibold ${raceColor}`}>{raceName}</p>
                </div>
              </div>

              {/* Nivel */}
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-dungeon-800/50 border border-purple-500/30">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-dungeon-400">Nivel</p>
                  <p className="font-semibold text-purple-400">Nivel {character.level}</p>
                </div>
              </div>
            </div>

            {/* Link a ver detalles */}
            <Link
              href={`/personajes/${character.id}`}
              className="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors"
            >
              Ver Ficha Completa
              <Swords className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
