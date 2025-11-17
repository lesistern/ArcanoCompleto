'use client';

import { useState, useEffect } from 'react';
import { Search, Eye, EyeOff, AlertTriangle, Skull, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { getMonsters, type Monster } from '@/lib/services/monsterService.client';

// Tipos de criaturas para categorización
type CreatureCategory = 'Humanoides y Gigantes' | 'No-Muertos' | 'Dragones y Bestias Mágicas' | 'Otros';

export default function MonstruosPage() {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revealedMonsters, setRevealedMonsters] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchMonsters() {
      try {
        setLoading(true);
        setError(null);
        const data = await getMonsters();
        setMonsters(data);
      } catch (err) {
        console.error('Error fetching monsters:', err);
        setError('Error al cargar los monstruos. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchMonsters();
  }, []);

  // Filtrar monstruos por búsqueda
  const filteredMonsters = monsters.filter((monster) =>
    monster.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Agrupar monstruos por categoría
  const monstersByCategory: Record<CreatureCategory, Monster[]> = {
    'Humanoides y Gigantes': filteredMonsters.filter(m =>
      ['Humanoide', 'Gigante', 'Humanoide Monstruoso'].includes(m.creature_type)
    ),
    'No-Muertos': filteredMonsters.filter(m => m.creature_type === 'No-Muerto'),
    'Dragones y Bestias Mágicas': filteredMonsters.filter(m =>
      ['Dragón', 'Bestia', 'Bestia Mágica'].includes(m.creature_type)
    ),
    'Otros': filteredMonsters.filter(m =>
      !['Humanoide', 'Gigante', 'Humanoide Monstruoso', 'No-Muerto', 'Dragón', 'Bestia', 'Bestia Mágica'].includes(m.creature_type)
    ),
  };

  // Iconos por categoría
  const getCategoryIcon = (category: CreatureCategory) => {
    switch (category) {
      case 'Humanoides y Gigantes': return Skull;
      case 'No-Muertos': return AlertTriangle;
      case 'Dragones y Bestias Mágicas': return Zap;
      case 'Otros': return Shield;
    }
  };

  // Colores por categoría
  const getCategoryColor = (category: CreatureCategory) => {
    switch (category) {
      case 'Humanoides y Gigantes': return 'text-orange-400';
      case 'No-Muertos': return 'text-purple-400';
      case 'Dragones y Bestias Mágicas': return 'text-red-400';
      case 'Otros': return 'text-blue-400';
    }
  };

  // Toggle reveal de un monstruo específico
  const toggleReveal = (monsterId: string) => {
    setRevealedMonsters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(monsterId)) {
        newSet.delete(monsterId);
      } else {
        newSet.add(monsterId);
      }
      return newSet;
    });
  };

  // Toggle reveal all
  const revealAll = () => {
    setRevealedMonsters(new Set(filteredMonsters.map((m) => m.id)));
  };

  const hideAll = () => {
    setRevealedMonsters(new Set());
  };

  // Orden de categorías
  const categoryOrder: CreatureCategory[] = [
    'Humanoides y Gigantes',
    'No-Muertos',
    'Dragones y Bestias Mágicas',
    'Otros'
  ];

  // Renderizar card de monstruo
  const renderMonsterCard = (monster: Monster) => {
    const isRevealed = revealedMonsters.has(monster.id);

    return (
      <Card key={monster.id} className="hover:border-gold-500/30 transition-all bg-dungeon-800 border-dungeon-700">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl text-gold-400">{monster.name}</CardTitle>
            <button
              onClick={() => toggleReveal(monster.id)}
              className={`
                p-2 rounded transition-all
                ${
                  isRevealed
                    ? 'bg-green-900/30 text-green-400 hover:bg-green-900/40'
                    : 'bg-red-900/30 text-red-400 hover:bg-red-900/40'
                }
              `}
              aria-label={isRevealed ? 'Ocultar estadísticas' : 'Ver estadísticas'}
            >
              {isRevealed ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Información siempre visible (no es spoiler) */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-dungeon-500">Tipo:</span>
              <span className="text-dungeon-300">{monster.creature_type}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-dungeon-500">Tamaño:</span>
              <span className="text-dungeon-300">{monster.size}</span>
            </div>
          </div>

          {/* Estadísticas (spoiler) */}
          {isRevealed ? (
            <div className="space-y-2 pt-4 border-t border-dungeon-700">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-dungeon-500">CR:</span>
                <span className="px-2 py-1 bg-purple-900/30 border border-purple-700/50 rounded text-purple-300 font-semibold">
                  {monster.challenge_rating}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-dungeon-500">CA:</span>
                <span className="text-dungeon-300">{monster.armor_class}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-dungeon-500">DG:</span>
                <span className="text-dungeon-300">{monster.hit_dice}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-dungeon-500">Alineamiento:</span>
                <span className="text-dungeon-300">{monster.alignment}</span>
              </div>
              {monster.environment && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-dungeon-500">Entorno:</span>
                  <span className="text-dungeon-300">{monster.environment}</span>
                </div>
              )}

              {/* Link a página de detalle */}
              <Link
                href={`/monstruos/${monster.slug}`}
                className="mt-4 block w-full text-center px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded transition-colors"
              >
                Ver Detalles Completos
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-dungeon-700">
              <div className="flex items-center gap-2 text-sm text-dungeon-500 italic">
                <EyeOff className="h-4 w-4" />
                <span>Estadísticas ocultas (anti-spoiler)</span>
              </div>
              <button
                onClick={() => toggleReveal(monster.id)}
                className="mt-3 w-full px-4 py-2 bg-dungeon-700 hover:bg-dungeon-600 text-dungeon-300 hover:text-dungeon-100 rounded transition-colors"
              >
                Ver Estadísticas
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Header con estilo de /clases */}
      <div className="border-l-4 border-gold-500 pl-6 mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 mb-3">
          Bestiario
        </h1>
        <p className="text-lg text-dungeon-300">
          Monstruos de D&D 3.5 con sistema anti-spoiler
        </p>
      </div>

      {/* Advertencia de Spoilers */}
      <div className="flex items-start gap-3 rounded-lg border border-orange-500/30 bg-orange-900/20 p-4 mb-6">
        <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-orange-300 mb-1">Sistema Anti-Spoiler Activado</p>
          <p className="text-orange-200/80">
            Las estadísticas de los monstruos están ocultas por defecto. Ideal para jugadores que solo necesitan verificar el nombre durante una partida.
          </p>
        </div>
      </div>

      {/* Búsqueda y Controles */}
      <Card className="mb-6 bg-dungeon-800 border-dungeon-700">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Barra de búsqueda */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dungeon-500" />
              <input
                type="text"
                placeholder="Buscar monstruo por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dungeon-900 border border-dungeon-700 rounded text-dungeon-100 placeholder-dungeon-500 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>

            {/* Botones de control */}
            <div className="flex gap-2">
              <button
                onClick={revealAll}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded transition-colors flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Revelar Todos
              </button>
              <button
                onClick={hideAll}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded transition-colors flex items-center gap-2"
              >
                <EyeOff className="h-4 w-4" />
                Ocultar Todos
              </button>
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 text-sm text-dungeon-400">
            {filteredMonsters.length} monstruo(s) encontrado(s)
            {revealedMonsters.size > 0 && ` • ${revealedMonsters.size} revelado(s)`}
          </div>
        </CardContent>
      </Card>

      {/* Estados de loading/error */}
      {loading ? (
        <div className="text-center py-12 text-dungeon-400">
          Cargando monstruos...
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      ) : filteredMonsters.length === 0 ? (
        <div className="text-center py-12">
          <AlertTriangle className="h-16 w-16 text-dungeon-600 mx-auto mb-4" />
          <p className="text-dungeon-400">No se encontraron monstruos con ese nombre</p>
        </div>
      ) : (
        <>
          {/* Monstruos por Categoría */}
          <div className="space-y-6 mb-16">
            {categoryOrder.map((category) => {
              const categoryMonsters = monstersByCategory[category];

              // Solo mostrar categoría si tiene monstruos
              if (categoryMonsters.length === 0) return null;

              const Icon = getCategoryIcon(category);
              const colorClass = getCategoryColor(category);

              return (
                <Card key={category} className="bg-dungeon-800 border-dungeon-700">
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                      {category} ({categoryMonsters.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryMonsters.map((monster) => renderMonsterCard(monster))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* Información adicional */}
      <div className="bg-dungeon-800/30 border border-dungeon-700 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">
          Información del Bestiario
        </h3>
        <div className="space-y-3 text-sm text-dungeon-300">
          <p>
            El bestiario contiene monstruos del Monster Manual de D&D 3.5. Usa el sistema anti-spoiler
            para evitar revelaciones accidentales durante tus partidas.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">CR (Challenge Rating):</span> Indica la
            dificultad del encuentro. Un CR igual al nivel del grupo es un desafío equilibrado.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">CA (Clase de Armadura):</span> Determina
            qué tan difícil es golpear a la criatura.
          </p>
          <p>
            <span className="text-gold-500 font-semibold">DG (Dados de Golpe):</span> Indica los
            puntos de golpe y nivel aproximado de la criatura.
          </p>
        </div>
      </div>

      {/* Nota al pie */}
      <div className="mt-8 text-center text-sm text-dungeon-500">
        <p>
          ¿Falta un monstruo?{' '}
          <Link href="/feedback" className="text-gold-400 hover:text-gold-300">
            Reporta el bug aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
