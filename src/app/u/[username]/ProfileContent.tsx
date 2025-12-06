'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { EyeOff, Settings, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/Card';
import { pageContainerPadding } from '@/lib/utils/responsive-spacing';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileStatsGrid } from '@/components/profile/ProfileStatsGrid';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { AchievementBadge } from '@/components/profile/AchievementBadge';
import { ShareProfileButton } from '@/components/profile/ShareProfileButton';
import { FeaturedCharacterCard } from '@/components/profile/FeaturedCharacterCard';
import { BadgeCollectionDisplay } from '@/components/profile/BadgeCollectionDisplay';
import { getNextLevelXp, getCurrentLevelXp } from '@/lib/utils/levelUtils';

// Lazy load heavy components - solo se cargan cuando se necesitan
const SelectFeaturedCharacterModal = dynamic(
  () => import('@/components/profile/SelectFeaturedCharacterModal').then(mod => ({ default: mod.SelectFeaturedCharacterModal })),
  {
    loading: () => <div className="fixed inset-0 bg-black/50 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gold-400" /></div>,
    ssr: false
  }
);

const CharacterGalleryGrid = dynamic(
  () => import('@/components/profile/CharacterGalleryGrid').then(mod => ({ default: mod.CharacterGalleryGrid })),
  {
    loading: () => <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{[...Array(6)].map((_, i) => <div key={i} className="h-32 bg-dungeon-800 animate-pulse rounded-lg" />)}</div>,
    ssr: false
  }
);

export interface ProfileData {
  id: string;
  username_slug: string;
  display_name: string | null;
  tier: string;
  experience_points: number;
  level: number;
  level_title: string;
  level_tier: string;
  reports_submitted: number;
  reports_resolved: number;
  total_votes_received: number;
  profile_hidden: boolean;
  created_at: string;
  resolution_rate: number;
  avg_votes_per_report: number;
  global_rank: number;
  can_view: boolean;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  twitter_url: string | null;
  website_url: string | null;
  show_email: boolean;
  show_location: boolean;
  show_characters: boolean;
  show_activity: boolean;
  featured_character_id: string | null;
  featured_character_name: string | null;
  featured_character_class: string | null;
  featured_character_race: string | null;
  featured_character_level: number | null;
  featured_character_avatar_url: string | null;
  banner_url: string | null;
  theme: string;
  badges_unlocked: string[];
}

interface FeaturedCharacter {
  id: string;
  name: string;
  class_slug: string;
  race_slug: string;
  level: number;
  avatar_url: string | null;
}

interface Achievement {
  achievement_id: string;
  category: string;
  name: string;
  description: string;
  icon: string;
  xp_reward: number;
  unlocked_at: string | null;
  is_unlocked: boolean;
}

interface ProfileContentProps {
  initialProfile: ProfileData;
  username: string;
}

export function ProfileContent({ initialProfile, username }: ProfileContentProps) {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [charactersCount, setCharactersCount] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [featuredCharacter, setFeaturedCharacter] = useState<FeaturedCharacter | null>(null);

  const supabase = useMemo(() => createClient(), []);

  const checkOwnership = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsOwner(user?.id === profile.id);
  }, [supabase, profile.id]);

  const loadAchievements = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('get_user_achievements', { p_user_id: userId });
      if (!error && data) {
        setAchievements(data);
      }
    } catch (err) {
      console.error('Error loading achievements:', err);
    }
  }, [supabase]);

  const loadCharactersCount = useCallback(async (userId: string) => {
    try {
      const { count, error } = await supabase
        .from('characters')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (!error && count !== null) {
        setCharactersCount(count);
      }
    } catch (err) {
      console.error('Error loading characters count:', err);
    }
  }, [supabase]);

  useEffect(() => {
    checkOwnership();
    loadAchievements(profile.id);
    loadCharactersCount(profile.id);

    // Inicializar featured character si existe
    if (profile.featured_character_id && profile.featured_character_name) {
      setFeaturedCharacter({
        id: profile.featured_character_id,
        name: profile.featured_character_name,
        class_slug: profile.featured_character_class || '',
        race_slug: profile.featured_character_race || '',
        level: profile.featured_character_level || 1,
        avatar_url: profile.featured_character_avatar_url
      });
    }
  }, [profile.id, profile.featured_character_id, profile.featured_character_name, profile.featured_character_class, profile.featured_character_race, profile.featured_character_level, profile.featured_character_avatar_url, checkOwnership, loadAchievements, loadCharactersCount]);

  const handleSelectFeaturedCharacter = useCallback(async (characterId: string) => {
    try {
      const { error } = await supabase.rpc('set_featured_character', {
        p_character_id: characterId
      });

      if (error) {
        console.error('Error setting featured character:', error);
        alert('Error al establecer personaje destacado');
        return;
      }

      // Recargar datos del personaje
      const { data } = await supabase
        .from('characters')
        .select('id, name, class_slug, race_slug, level, avatar_url')
        .eq('id', characterId)
        .single();

      if (data) {
        setFeaturedCharacter(data);
      }
      setShowSelectModal(false);
    } catch (err) {
      console.error('Error:', err);
      alert('Error al establecer personaje destacado');
    }
  }, [supabase]);

  const handleRemoveFeaturedCharacter = useCallback(async () => {
    if (!confirm('¿Estás seguro de que quieres remover el personaje destacado?')) {
      return;
    }

    try {
      const { error } = await supabase.rpc('remove_featured_character');

      if (error) {
        console.error('Error removing featured character:', error);
        alert('Error al remover personaje destacado');
        return;
      }

      setFeaturedCharacter(null);
    } catch (err) {
      console.error('Error:', err);
      alert('Error al remover personaje destacado');
    }
  }, [supabase]);

  const nextLevelXp = getNextLevelXp(profile.level);
  const currentLevelXp = getCurrentLevelXp(profile.level);
  const unlockedAchievements = useMemo(() => achievements.filter(a => a.is_unlocked), [achievements]);

  const tabContent = useMemo(() => ({
    resumen: (
      <div className="space-y-6">
        {/* Personaje Destacado */}
        <div>
          <h3 className="text-lg font-bold text-gold-400 mb-4">
            Personaje Destacado
          </h3>
          <FeaturedCharacterCard
            character={featuredCharacter}
            isOwner={isOwner}
            onRemove={isOwner ? handleRemoveFeaturedCharacter : undefined}
            onSelect={isOwner ? () => setShowSelectModal(true) : undefined}
          />
        </div>

        {/* Achievements */}
        {achievements.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gold-400">
                Achievements ({unlockedAchievements.length}/{achievements.length})
              </h3>
              <Link
                href={`/u/${username}/achievements`}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Ver todos →
              </Link>
            </div>

            {unlockedAchievements.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {unlockedAchievements.slice(0, 8).map((a) => (
                  <AchievementBadge
                    key={a.achievement_id}
                    achievement={{
                      id: a.achievement_id,
                      name: a.name,
                      description: a.description,
                      icon: a.icon,
                      category: a.category,
                      unlocked_at: a.unlocked_at,
                      xp_reward: a.xp_reward
                    }}
                    locked={false}
                    size="md"
                    showShareButton={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-dungeon-700 rounded-xl bg-dungeon-950/50">
                <p className="text-dungeon-300">Este usuario aún no ha desbloqueado ningún achievement</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-dungeon-700 rounded-xl bg-dungeon-950/50">
            <p className="text-dungeon-300">No hay achievements disponibles</p>
          </div>
        )}

        {/* Badges */}
        <div>
          <h3 className="text-lg font-bold text-gold-400 mb-4">
            Colección de Badges
          </h3>
          <BadgeCollectionDisplay
            userId={profile.id}
            unlockedBadges={profile.badges_unlocked}
            isOwner={isOwner}
          />
        </div>
      </div>
    ),
    personajes: profile.show_characters ? (
      <CharacterGalleryGrid
        userId={profile.id}
        isOwner={false}
        showCreateButton={false}
      />
    ) : (
      <div className="text-center py-12 border border-dashed border-dungeon-700 rounded-xl bg-dungeon-950/50" role="status">
        <p className="text-dungeon-200">Este usuario ha ocultado sus personajes</p>
      </div>
    ),
  }), [profile.id, profile.show_characters, achievements, unlockedAchievements, featuredCharacter, isOwner, username, handleRemoveFeaturedCharacter]);

  return (
    <div className={`min-h-screen bg-dungeon-950 ${pageContainerPadding}`} data-theme={profile.theme || 'clasico'}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-end gap-3">
          {isOwner && (
            <Link
              href="/profile/settings"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-dungeon-950 rounded-md px-3 py-2"
              aria-label="Configurar perfil"
            >
              <Settings className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Configuración</span>
            </Link>
          )}
          <ShareProfileButton
            username={profile.username_slug}
            displayName={profile.display_name || profile.username_slug}
            tier={profile.tier}
            level={profile.level}
            variant="icon-only"
          />
        </div>

        <ProfileHeader
          profile={profile}
          nextLevelXp={nextLevelXp}
          currentLevelXp={currentLevelXp}
        />

        <ProfileStatsGrid
          charactersCount={charactersCount}
          achievementsUnlocked={unlockedAchievements.length}
          level={profile.level}
          memberSince={profile.created_at}
        />

        <ProfileTabs children={tabContent} onTabChange={() => {}} />
      </div>

      {/* Modal para seleccionar personaje destacado */}
      <SelectFeaturedCharacterModal
        isOpen={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        onSelect={handleSelectFeaturedCharacter}
        currentFeaturedId={featuredCharacter?.id || null}
      />
    </div>
  );
}

// Error component for profile not found or hidden
export function ProfileError({ error }: { error: string }) {
  return (
    <div className={`min-h-screen bg-dungeon-950 ${pageContainerPadding}`}>
      <div className="max-w-6xl mx-auto">
        <Card className="card" role="alert" aria-live="assertive">
          <CardContent className="p-12 text-center">
            <EyeOff className="w-16 h-16 text-dungeon-500 mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-dungeon-200 mb-2 font-heading">
              {error}
            </h2>
            <p className="text-dungeon-300">
              {error === 'Este perfil está oculto'
                ? 'El usuario ha configurado su perfil como privado.'
                : 'No se pudo encontrar este perfil.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
