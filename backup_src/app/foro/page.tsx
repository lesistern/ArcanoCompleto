import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { MessageSquare, TrendingUp, Users } from 'lucide-react';
import { CATEGORY_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Foro de la Comunidad | Compendio Arcano',
  description: 'Foro de discusión sobre D&D 3.5: reglas, builds, roleplay, homebrew y más',
};

interface ForumCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category_type: string;
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

  const { data: categories } = await supabase
    .from('forum_categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  const { data: statsRow } = await supabase.from('v_forum_stats').select('*').single();

  const stats: ForumStats = {
    total_threads: statsRow?.total_threads ?? 0,
    total_posts: statsRow?.total_posts ?? 0,
    total_upvotes: statsRow?.total_upvotes ?? 0,
    active_thread_authors: statsRow?.active_thread_authors ?? 0,
  };

  return {
    categories: (categories as ForumCategory[]) || [],
    stats,
  };
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    orange: 'text-orange-400',
    purple: 'text-purple-400',
  };

  return (
    <div className="card p-4 flex flex-col justify-center items-center text-center hover:border-dungeon-600 transition-colors">
      <div className={`mb-2 p-2 rounded-full bg-dungeon-900/50 ${colorMap[color] || 'text-dungeon-300'}`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-dungeon-100 font-heading">{value.toLocaleString()}</div>
      <span className="text-sm text-dungeon-400 uppercase tracking-wider font-semibold">{label}</span>
    </div>
  );
}

export default async function ForoPage() {
  const { categories, stats } = await loadForumData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-8">
      <div className="bg-dungeon-800 border border-dungeon-700 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xl">
        <div>
          <p className="text-sm uppercase tracking-wide text-gold-500 font-semibold mb-1">Comunidad</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-dungeon-100 leading-tight">Foro de la Comunidad</h1>
          <p className="text-lg text-dungeon-300 mt-2">
            Comparte conocimiento, resuelve dudas y conecta con otros jugadores de D&D 3.5
          </p>
        </div>
        <Link
          href="/foro/nuevo"
          className="btn btn-primary flex items-center gap-2 shadow-lg shadow-gold-500/20"
        >
          <MessageSquare className="w-5 h-5" />
          Crear nuevo hilo
        </Link>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<MessageSquare className="w-5 h-5" />} label="Hilos" value={stats.total_threads} color="blue" />
          <StatCard icon={<MessageSquare className="w-5 h-5" />} label="Respuestas" value={stats.total_posts} color="green" />
          <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Votos" value={stats.total_upvotes} color="orange" />
          <StatCard icon={<Users className="w-5 h-5" />} label="Autores" value={stats.active_thread_authors} color="purple" />
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dungeon-50">Categorías</h2>
          <Link href="/search" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
            Buscar en el foro →
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="bg-dungeon-800 rounded-lg p-8 border border-dungeon-700 text-center">
            <p className="text-dungeon-400">No hay categorías disponibles actualmente.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => {
              const config = CATEGORY_CONFIG[category.category_type] || CATEGORY_CONFIG.default;
              const IconComponent = config.icon;

              return (
                <Link key={category.id} href={`/foro/${category.slug}`} className="group">
                  <div className="bg-dungeon-850 rounded-xl p-5 border border-dungeon-700 hover:border-gold-500/40 transition-all duration-200 hover:shadow-lg hover:shadow-gold-500/10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-xl border shadow-inner ${config.bgColor} ${config.borderColor}`}>
                        <IconComponent className={`w-6 h-6 ${config.color}`} />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-dungeon-100 group-hover:text-gold-400 transition-colors mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm text-dungeon-400 line-clamp-2">{category.description}</p>
                      </div>
                    </div>

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

      <div className="mt-2 bg-dungeon-800/50 rounded-lg p-6 border border-dungeon-700">
        <h3 className="text-lg font-bold text-dungeon-100 mb-4">
          Niveles de Confianza (Trust Levels)
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
