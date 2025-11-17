import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  ArrowLeft,
  MessageSquare,
  AlertCircle,
  Tag as TagIcon
} from 'lucide-react';
import NewThreadForm from '@/components/forum/NewThreadForm';

export const metadata: Metadata = {
  title: 'Crear Nuevo Hilo | Foro D&D 3.5',
  description: 'Crea un nuevo hilo de discusión en el foro de D&D 3.5',
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

  const { data: { user } } = await supabase.auth.getUser();

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

  // Redirigir a login si no está autenticado
  if (!userStatus.authenticated) {
    redirect('/auth/login?redirect=/foro/nuevo');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/foro"
          className="inline-flex items-center gap-2 text-sm text-dungeon-400 hover:text-gold-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Foro
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gold-400 mb-2 flex items-center gap-3">
          <MessageSquare className="w-8 h-8" />
          Crear Nuevo Hilo
        </h1>
        <p className="text-dungeon-300">
          Inicia una nueva discusión en el foro de D&D 3.5
        </p>
      </div>

      {/* Avisos de Restricciones */}
      {userStatus.banned && (
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-300 mb-1">
              Cuenta Suspendida
            </h3>
            <p className="text-sm text-red-200">
              Tu cuenta está suspendida hasta el{' '}
              <span className="font-semibold">
                {new Date(userStatus.banUntil!).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              . No puedes crear hilos durante este período.
            </p>
          </div>
        </div>
      )}

      {userStatus.restricted && (
        <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-orange-300 mb-1">
              Restricción Activa
            </h3>
            <p className="text-sm text-orange-200">
              {userStatus.restrictionReason}
            </p>
          </div>
        </div>
      )}

      {/* Guía de Buenas Prácticas */}
      {!userStatus.banned && !userStatus.restricted && (
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
            <TagIcon className="w-4 h-4" />
            Consejos para un Buen Hilo
          </h3>
          <ul className="text-sm text-blue-200 space-y-1 ml-6 list-disc">
            <li>Usa un título claro y descriptivo (10-200 caracteres)</li>
            <li>Explica tu pregunta o tema con detalle (mínimo 20 caracteres)</li>
            <li>Selecciona la categoría correcta para tu hilo</li>
            <li>Añade etiquetas relevantes para facilitar la búsqueda</li>
            <li>Sé respetuoso y constructivo con otros usuarios</li>
          </ul>
        </div>
      )}

      {/* Formulario o Mensaje de Bloqueo */}
      {userStatus.banned || userStatus.restricted ? (
        <div className="bg-dungeon-800 rounded-lg p-8 border border-dungeon-700 text-center">
          <AlertCircle className="w-16 h-16 text-dungeon-600 mx-auto mb-4" />
          <p className="text-dungeon-400">
            No puedes crear hilos en este momento. Por favor, contacta con un moderador si crees que esto es un error.
          </p>
        </div>
      ) : (
        <NewThreadForm
          categories={categories}
          defaultCategorySlug={defaultCategorySlug}
        />
      )}
    </div>
  );
}
