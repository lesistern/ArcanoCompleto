import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft, MessageSquare, AlertCircle, Tag as TagIcon } from 'lucide-react';
import NewThreadForm from '@/components/forum/NewThreadForm';

export const metadata: Metadata = {
  title: 'Crear Nuevo Hilo | Foro D&D 3.5',
  description: 'Crea un nuevo hilo de discusion en el foro de D&D 3.5',
};

interface PageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

async function loadCategories() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from('forum_categories')
    .select('id, slug, name, description, icon, color, category_type')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  return categories || [];
}

async function checkUserStatus() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { authenticated: false, banned: false, restricted: false };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('forum_banned_until, forum_restriction_reason')
    .eq('id', user.id)
    .single();

  const banned = profile?.forum_banned_until && new Date(profile.forum_banned_until) > new Date();
  const restricted = !!profile?.forum_restriction_reason && !banned;

  return {
    authenticated: true,
    banned,
    restricted,
    banUntil: profile?.forum_banned_until,
    restrictionReason: profile?.forum_restriction_reason,
  };
}

export default async function NewThreadPage({ searchParams }: PageProps) {
  const { category: defaultCategorySlug } = await searchParams;
  const categories = await loadCategories();
  const userStatus = await checkUserStatus();

  // Redirigir a login si no esta autenticado
  if (!userStatus.authenticated) {
    redirect('/auth/login?redirect=/foro/nuevo');
  }

  return (
    <div className="min-h-screen bg-dungeon-950">
      <div className="border-b border-dungeon-800 bg-dungeon-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between text-sm text-dungeon-400">
          <Link href="/foro" className="inline-flex items-center gap-2 hover:text-gold-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al foro
          </Link>
          <div className="flex items-center gap-2 text-dungeon-500">
            <span>Borradores</span>
            <span className="inline-flex h-5 min-w-[1.75rem] items-center justify-center rounded-full bg-dungeon-800 px-2 text-xs text-dungeon-200 border border-dungeon-700">
              0
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-4 text-dungeon-200 mb-8">
          <div className="p-3 rounded-xl bg-dungeon-800 border border-dungeon-700 shadow-lg">
            <MessageSquare className="w-8 h-8 text-gold-500" />
          </div>
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-dungeon-100">Publicar</h1>
            <p className="text-sm text-dungeon-400">Comparte una nueva pregunta o discusión con la comunidad.</p>
          </div>
        </div>

        {userStatus.banned && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-300 mb-1">Cuenta suspendida</h3>
              <p className="text-sm text-red-200">
                Tu cuenta esta suspendida hasta{' '}
                <span className="font-semibold">
                  {new Date(userStatus.banUntil!).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                . No puedes crear hilos durante este periodo.
              </p>
            </div>
          </div>
        )}

        {userStatus.restricted && (
          <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-300 mb-1">Restriccion activa</h3>
              <p className="text-sm text-orange-200">{userStatus.restrictionReason}</p>
            </div>
          </div>
        )}

        {!userStatus.banned && !userStatus.restricted && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h3 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
              <TagIcon className="w-4 h-4" />
              Consejos para un buen hilo
            </h3>
            <ul className="text-sm text-blue-200 space-y-1 ml-6 list-disc">
              <li>Usa un titulo claro y descriptivo (10-200 caracteres)</li>
              <li>Explica tu pregunta o tema con detalle (minimo 20 caracteres)</li>
              <li>Selecciona la categoria correcta para tu hilo</li>
              <li>Anade etiquetas relevantes para facilitar la busqueda</li>
              <li>Se respetuoso y constructivo con otros usuarios</li>
            </ul>
          </div>
        )}

        {userStatus.banned || userStatus.restricted ? (
          <div className="bg-dungeon-850 rounded-xl p-10 border border-dungeon-800 text-center shadow-xl">
            <AlertCircle className="w-16 h-16 text-dungeon-600 mx-auto mb-4" />
            <p className="text-dungeon-300">
              No puedes crear hilos en este momento. Contacta con un moderador si crees que esto es un error.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-dungeon-800 bg-dungeon-900/80 shadow-2xl">
            <NewThreadForm categories={categories} defaultCategorySlug={defaultCategorySlug} />
          </div>
        )}
      </div>
    </div>
  );
}
