'use client';

import { useState } from 'react';
import { Character } from '@/lib/types/character';
import { CheckCircle2, Circle, User, Users, Dices, Trophy, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface ProgressSidebarProps {
  character: Character;
  className?: string;
}

/**
 * Barra de progreso para el editor de personajes
 * - Desktop: Sidebar lateral integrada en el layout
 * - Móvil: Panel colapsable en la parte superior
 */
export default function ProgressSidebar({ character, className = '' }: ProgressSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calcular progreso de cada sección
  const progress = {
    name: !!character.name && character.name.trim().length > 0,
    race: !!character.race,
    class: character.classes.length > 0,
    abilities: Object.values(character.abilityScores.current).every(score => score > 0),
    skills: false, // TODO: Implementar cuando tengamos skills
  };

  // Calcular porcentaje total
  const completedSections = Object.values(progress).filter(Boolean).length;
  const totalSections = Object.keys(progress).length;
  const completionPercentage = Math.round((completedSections / totalSections) * 100);

  return (
    <>
      {/* Versión móvil - Panel colapsable */}
      <div className={`lg:hidden ${className}`}>
        {/* Header colapsable */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 bg-dungeon-900 border border-dungeon-700 rounded-lg mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="text-gold-500 font-semibold text-sm">
              Progreso del Personaje
            </div>
            <div className="text-xs text-dungeon-400">
              {completedSections}/{totalSections}
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-dungeon-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-dungeon-400" />
          )}
        </button>

        {/* Contenido colapsable */}
        {isExpanded && (
          <div className="bg-dungeon-900 border border-dungeon-700 rounded-lg p-4 mb-4 animate-fadeInUp">
            {/* Barra de progreso */}
            <div className="mb-4">
              <div className="w-full bg-dungeon-800 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-gold-600 to-gold-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-xs text-dungeon-400 text-center">
                {completionPercentage}% completado
              </p>
            </div>

            {/* Items de progreso - Grid horizontal en móvil */}
            <div className="grid grid-cols-2 gap-3">
              <ProgressItemCompact
                icon={User}
                label="Nombre"
                isComplete={progress.name}
              />
              <ProgressItemCompact
                icon={Users}
                label="Raza"
                isComplete={progress.race}
              />
              <ProgressItemCompact
                icon={Trophy}
                label="Clase"
                isComplete={progress.class}
              />
              <ProgressItemCompact
                icon={Dices}
                label="Habilidades"
                isComplete={progress.abilities}
              />
              <ProgressItemCompact
                icon={BookOpen}
                label="Skills"
                isComplete={progress.skills}
                disabled
              />
            </div>
          </div>
        )}
      </div>

      {/* Versión desktop - Sidebar lateral */}
      <div className={`hidden lg:block w-64 bg-dungeon-900/95 backdrop-blur-sm border-l border-dungeon-700 p-5 overflow-y-auto ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-gold-500 font-semibold text-lg mb-2">Progreso del Personaje</h3>
        <div className="w-full bg-dungeon-800 rounded-full h-2 mb-2">
          <div
            className="bg-gradient-to-r from-gold-600 to-gold-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="text-xs text-dungeon-400">
          {completedSections} de {totalSections} secciones completas
        </p>
      </div>

      {/* Progress Items */}
      <div className="space-y-4">
        {/* Nombre */}
        <ProgressItem
          icon={User}
          label="Nombre del Personaje"
          isComplete={progress.name}
          value={character.name || 'Sin nombre'}
        />

        {/* Raza */}
        <ProgressItem
          icon={Users}
          label="Raza"
          isComplete={progress.race}
          value={character.race?.name || 'No seleccionada'}
        />

        {/* Clase */}
        <ProgressItem
          icon={Trophy}
          label="Clase"
          isComplete={progress.class}
          value={
            character.classes.length > 0
              ? `${character.classes[0].class.name} ${character.classes[0].level}`
              : 'No seleccionada'
          }
        />

        {/* Habilidades */}
        <ProgressItem
          icon={Dices}
          label="Puntuaciones de Habilidad"
          isComplete={progress.abilities}
          value={
            progress.abilities
              ? 'Asignadas'
              : `${Object.values(character.abilityScores.current).filter(s => s > 0).length}/6 completas`
          }
        />

        {/* Skills (placeholder) */}
        <ProgressItem
          icon={BookOpen}
          label="Habilidades"
          isComplete={progress.skills}
          value="Pendiente"
          disabled
        />
      </div>

      {/* Footer con acciones rápidas */}
      <div className="mt-8 pt-6 border-t border-dungeon-700">
        <p className="text-xs text-dungeon-500 mb-3">Acciones Rápidas</p>
        <div className="space-y-2">
          <button
            className="w-full text-left text-xs px-3 py-2 rounded bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-300 hover:text-gold-400 transition-colors"
            onClick={() => {
              const element = document.querySelector('[data-section="basic"]');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ir a Información Básica
          </button>
          <button
            className="w-full text-left text-xs px-3 py-2 rounded bg-dungeon-800 hover:bg-dungeon-700 text-dungeon-300 hover:text-gold-400 transition-colors"
            onClick={() => {
              const element = document.querySelector('[data-section="abilities"]');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ir a Habilidades
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

/**
 * Componente para cada item del progreso (versión desktop)
 */
interface ProgressItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isComplete: boolean;
  value: string;
  disabled?: boolean;
}

function ProgressItem({ icon: Icon, label, isComplete, value, disabled }: ProgressItemProps) {
  return (
    <div className={`flex items-start gap-3 ${disabled ? 'opacity-50' : ''}`}>
      {/* Check icon */}
      <div className="flex-shrink-0 mt-0.5">
        {isComplete ? (
          <CheckCircle2 className="h-5 w-5 text-green-400" />
        ) : (
          <Circle className="h-5 w-5 text-dungeon-600" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Icon className={`h-4 w-4 ${isComplete ? 'text-gold-400' : 'text-dungeon-500'}`} />
          <p className={`text-xs font-semibold ${isComplete ? 'text-dungeon-200' : 'text-dungeon-400'}`}>
            {label}
          </p>
        </div>
        <p className={`text-xs ${isComplete ? 'text-dungeon-300' : 'text-dungeon-500'} truncate`}>
          {value}
        </p>
      </div>
    </div>
  );
}

/**
 * Componente compacto para móvil
 */
interface ProgressItemCompactProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isComplete: boolean;
  disabled?: boolean;
}

function ProgressItemCompact({ icon: Icon, label, isComplete, disabled }: ProgressItemCompactProps) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
      isComplete
        ? 'bg-green-500/10 border border-green-500/30'
        : 'bg-dungeon-800 border border-dungeon-700'
    } ${disabled ? 'opacity-50' : ''}`}>
      {isComplete ? (
        <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
      ) : (
        <Circle className="h-4 w-4 text-dungeon-600 flex-shrink-0" />
      )}
      <Icon className={`h-4 w-4 ${isComplete ? 'text-gold-400' : 'text-dungeon-500'} flex-shrink-0`} />
      <p className={`text-xs font-medium ${isComplete ? 'text-dungeon-200' : 'text-dungeon-400'} truncate`}>
        {label}
      </p>
    </div>
  );
}
