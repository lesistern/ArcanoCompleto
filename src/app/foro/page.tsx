import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import {
  BookOpen,
  Swords,
  Scroll,
  Wand2,
  HelpCircle,
  Coffee,
  Users,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Foro de la Comunidad | Compendio Arcano',
  description: 'Foro de discusión sobre D&D 3.5: reglas, builds, roleplay, homebrew y más',
};

// Mapa de iconos por tipo de categoría
const CATEGORY_ICONS = {
  rules: BookOpen,
  builds: Swords,
  roleplay: Scroll,
  homebrew: Wand2,
  help: HelpCircle,
  offtopic: Coffee,
} as const;

interface ForumCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category_type: keyof typeof CATEGORY_ICONS;
  thread_count: number;
  post_count: number;
  is_active: boolean;
  display_order: number;
}

interface ForumStats {
  total_threads: number;
  total_posts: number;
  total_upvotes: number;
  active_thread_authors: number;
}

async function loadForumData() {
  const supabase = await createClient();

  // Cargar categorías
  const { data: categories, error: categoriesError } = await supabase
    .from('forum_categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (categoriesError) {
    console.error('Error loading categories:', categoriesError);
  }

  // Cargar estadísticas
  const { data: stats, error: statsError } = await supabase
    .from('v_forum_stats')
    .select('*')
    .single();

  if (statsError) {
    console.error('Error loading stats:', statsError);
  }

  return {
    categories: (categories as ForumCategory[]) || [],
    stats: stats as ForumStats | null,
  };
}

export default async function ForoPage() {
  const { categories, stats } = await loadForumData();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gold-400 mb-2">
          Foro de la Comunidad
        </h1>
        <p className="text-lg text-dungeon-300">
          Comparte conocimiento, resuelve dudas y conecta con otros jugadores de D&D 3.5
        </p>
      </div>

      {/* Estadísticas Globales */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-dungeon-800 rounded-lg p-4 border border-dungeon-700">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-dungeon-400">Hilos</span>
            </div>
            <div className="text-2xl font-bold text-dungeon-100">
              {stats.total_threads.toLocaleString()}
            </div>
          </div>

          <div className="bg-dungeon-800 rounded-lg p-4 border border-dungeon-700">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-green-400" />
              <span className="text-sm text-dungeon-400">Respuestas</span>
            </div>
            <div className="text-2xl font-bold text-dungeon-100">
              {stats.total_posts.toLocaleString()}
            </div>
          </div>

          <div className="bg-dungeon-800 rounded-lg p-4 border border-dungeon-700">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-dungeon-400">Upvotes</span>
            </div>
            <div className="text-2xl font-bold text-dungeon-100">
              {stats.total_upvotes.toLocaleString()}
            </div>
          </div>

          <div className="bg-dungeon-800 rounded-lg p-4 border border-dungeon-700">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-dungeon-400">Participantes</span>
            </div>
            <div className="text-2xl font-bold text-dungeon-100">
              {stats.active_thread_authors.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Categorías */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-dungeon-100 mb-4">
          Categorías
        </h2>

        {categories.length === 0 ? (
          <div className="bg-dungeon-800 rounded-lg p-8 border border-dungeon-700 text-center">
            <p className="text-dungeon-400">
              No hay categorías disponibles actualmente.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => {
              const IconComponent = CATEGORY_ICONS[category.category_type] || MessageSquare;

              return (
                <Link
                  key={category.id}
                  href={`/foro/${category.slug}`}
                  className="group"
                >
                  <div className="bg-dungeon-800 rounded-lg p-6 border border-dungeon-700 hover:border-gold-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/10">
                    {/* Header de la categoría */}
                    <div className="flex items-start gap-4 mb-3">
                      {/* Icono */}
                      <div className={`p-3 rounded-lg bg-${category.color}-900/30 border border-${category.color}-500/30`}>
                        <IconComponent className={`w-6 h-6 text-${category.color}-400`} />
                      </div>

                      {/* Nombre y descripción */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-dungeon-100 group-hover:text-gold-400 transition-colors mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm text-dungeon-400 line-clamp-2">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="flex items-center gap-4 text-sm text-dungeon-400 pt-3 border-t border-dungeon-700">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{category.thread_count.toLocaleString()} hilos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{category.post_count.toLocaleString()} respuestas</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Botón Crear Hilo */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/foro/nuevo"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-dungeon-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          Crear Nuevo Hilo
        </Link>
      </div>

      {/* Información de Trust Levels */}
      <div className="mt-12 bg-dungeon-800/50 rounded-lg p-6 border border-dungeon-700">
        <h3 className="text-lg font-bold text-dungeon-100 mb-4">
          💡 Niveles de Confianza (Trust Levels)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          <div>
            <div className="font-semibold text-gray-400 mb-1">TL0 - Nuevo</div>
            <div className="text-dungeon-400">Ver y crear hilos</div>
          </div>
          <div>
            <div className="font-semibold text-blue-400 mb-1">TL1 - Básico</div>
            <div className="text-dungeon-400">100 XP - Puede votar</div>
          </div>
          <div>
            <div className="font-semibold text-green-400 mb-1">TL2 - Regular</div>
            <div className="text-dungeon-400">500 XP - Downvotes</div>
          </div>
          <div>
            <div className="font-semibold text-purple-400 mb-1">TL3 - Confiable</div>
            <div className="text-dungeon-400">2,000 XP - Editar</div>
          </div>
          <div>
            <div className="font-semibold text-gold-400 mb-1">TL4 - Líder</div>
            <div className="text-dungeon-400">10,000 XP - Moderar</div>
          </div>
        </div>
      </div>
    </div>
  );
}
