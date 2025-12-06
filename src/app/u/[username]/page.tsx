import { Metadata } from 'next';
import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import { ProfileContent, ProfileData, ProfileError } from './ProfileContent';

// ISR: Revalidar cada hora
export const revalidate = 3600;

// Dynamic params - páginas se generan on-demand y se cachean
export const dynamicParams = true;

// Cache de datos del perfil para evitar queries duplicados
const getProfileForMetadata = cache(async (username: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('profiles')
    .select('display_name, username_slug, bio, avatar_url, level, tier_code, experience_points, created_at, twitter_url, website_url')
    .eq('username_slug', username)
    .eq('profile_hidden', false)
    .single();
  return data;
});

// Metadata dinámica para SEO y Open Graph
export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfileForMetadata(username);

  if (!profile) {
    return {
      title: 'Perfil no encontrado | D&D Compendium',
      description: 'Este perfil no existe o es privado.',
    };
  }

  const displayName = profile.display_name || profile.username_slug;
  const title = `${displayName} - Nivel ${profile.level} | D&D Compendium`;
  const description = profile.bio
    ? `${profile.bio.slice(0, 150)}${profile.bio.length > 150 ? '...' : ''}`
    : `Perfil de ${displayName} en D&D Compendium. Nivel ${profile.level} con ${profile.experience_points.toLocaleString()} XP.`;

  const ogImage = profile.avatar_url || '/og-default.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `https://compendioarcano.com/u/${username}`,
      images: [
        {
          url: ogImage,
          width: 400,
          height: 400,
          alt: `Avatar de ${displayName}`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://compendioarcano.com/u/${username}`,
    },
  };
}

// JSON-LD Structured Data para SEO
function generateJsonLd(profile: ProfileData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.display_name || profile.username_slug,
    url: `https://compendioarcano.com/u/${profile.username_slug}`,
    image: profile.avatar_url || undefined,
    description: profile.bio || undefined,
    sameAs: [
      profile.twitter_url,
      profile.website_url,
    ].filter(Boolean),
    memberOf: {
      '@type': 'Organization',
      name: 'D&D Compendium',
      url: 'https://compendioarcano.com',
    },
  };
}

// Función para obtener datos del perfil en el servidor
async function getProfileData(username: string): Promise<{ profile: ProfileData | null; error: string | null }> {
  const supabase = await createClient();

  // Intentar con la función RPC primero
  const { data, error: rpcError } = await supabase.rpc('get_profile_by_username', {
    p_username_slug: username,
  });

  // Si RPC funciona, retornar datos
  if (!rpcError && data && data.length > 0) {
    const profileData = data[0];

    if (!profileData.can_view) {
      return { profile: null, error: 'Este perfil está oculto' };
    }

    return { profile: profileData, error: null };
  }

  // Fallback: buscar directamente en profiles
  const { data: profileDirect, error: directError } = await supabase
    .from('profiles')
    .select(`
      id,
      username_slug,
      display_name,
      tier_code,
      experience_points,
      level,
      reports_submitted,
      reports_resolved,
      total_votes_received,
      profile_hidden,
      created_at,
      avatar_url,
      bio,
      location,
      twitter_url,
      website_url,
      show_email,
      show_location,
      show_characters,
      show_activity,
      banner_url,
      theme,
      badges_unlocked
    `)
    .eq('username_slug', username)
    .maybeSingle();

  if (directError || !profileDirect) {
    return { profile: null, error: 'Perfil no encontrado' };
  }

  // Verificar si el perfil está oculto
  if (profileDirect.profile_hidden) {
    // TODO: Verificar si el usuario actual es admin/dueño
    return { profile: null, error: 'Este perfil está oculto' };
  }

  // Construir ProfileData desde el fallback
  const profileData: ProfileData = {
    id: profileDirect.id,
    username_slug: profileDirect.username_slug,
    display_name: profileDirect.display_name,
    tier: profileDirect.tier_code || 'user',
    experience_points: profileDirect.experience_points || 0,
    level: profileDirect.level || 1,
    level_title: 'Aventurero',
    level_tier: 'Novato',
    reports_submitted: profileDirect.reports_submitted || 0,
    reports_resolved: profileDirect.reports_resolved || 0,
    total_votes_received: profileDirect.total_votes_received || 0,
    profile_hidden: profileDirect.profile_hidden || false,
    created_at: profileDirect.created_at,
    resolution_rate: profileDirect.reports_submitted > 0
      ? (profileDirect.reports_resolved / profileDirect.reports_submitted) * 100
      : 0,
    avg_votes_per_report: profileDirect.reports_submitted > 0
      ? profileDirect.total_votes_received / profileDirect.reports_submitted
      : 0,
    global_rank: 0,
    can_view: true,
    avatar_url: profileDirect.avatar_url,
    bio: profileDirect.bio,
    location: profileDirect.location,
    twitter_url: profileDirect.twitter_url,
    website_url: profileDirect.website_url,
    show_email: profileDirect.show_email ?? true,
    show_location: profileDirect.show_location ?? true,
    show_characters: profileDirect.show_characters ?? true,
    show_activity: profileDirect.show_activity ?? true,
    featured_character_id: null,
    featured_character_name: null,
    featured_character_class: null,
    featured_character_race: null,
    featured_character_level: null,
    featured_character_avatar_url: null,
    banner_url: profileDirect.banner_url,
    theme: profileDirect.theme || 'clasico',
    badges_unlocked: profileDirect.badges_unlocked || [],
  };

  return { profile: profileData, error: null };
}

// Server Component principal
export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const { profile, error } = await getProfileData(username);

  // Si hay error, mostrar página de error
  if (error || !profile) {
    return <ProfileError error={error || 'Perfil no encontrado'} />;
  }

  const jsonLd = generateJsonLd(profile);

  // Pasar datos al Client Component para interactividad
  return (
    <>
      {/* JSON-LD Structured Data para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProfileContent initialProfile={profile} username={username} />
    </>
  );
}
