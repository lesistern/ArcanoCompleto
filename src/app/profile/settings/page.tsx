'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Settings,
  Loader2,
  User,
  Link2,
  Shield,
  Palette,
  Award,
  UserCog,
  ChevronRight,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Home,
  Bell,
  Gamepad2,
  Accessibility,
  PlugZap,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// Settings components
import { ProfileInfoEditor } from '@/components/profile/ProfileInfoEditor';
import { SocialLinksEditor } from '@/components/profile/SocialLinksEditor';
import { PrivacySettings } from '@/components/profile/PrivacySettings';
import { AccountSettings } from '@/components/profile/AccountSettings';
import { ProfileBannerUpload } from '@/components/profile/ProfileBannerUpload';
import { ThemeSelector } from '@/components/profile/ThemeSelector';
import { BadgeCollectionDisplay } from '@/components/profile/BadgeCollectionDisplay';
import { NotificationsSettings } from '@/components/profile/NotificationsSettings';
import { GamePreferences } from '@/components/profile/GamePreferences';
import { AccessibilitySettings } from '@/components/profile/AccessibilitySettings';
import { ConnectionsSettings } from '@/components/profile/ConnectionsSettings';

// ============================================================================
// TYPES & CONFIGURATION
// ============================================================================

type SettingsSection = 'profile' | 'social' | 'privacy' | 'notifications' | 'game' | 'appearance' | 'accessibility' | 'connections' | 'badges' | 'account';

interface SectionConfig {
  id: SettingsSection;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  gradient: string;
}

interface ProfileData {
  id: string;
  username_slug: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  github_url: string | null;
  twitter_url: string | null;
  website_url: string | null;
  show_email: boolean;
  show_location: boolean;
  show_characters: boolean;
  show_activity: boolean;
  profile_hidden: boolean;
  banner_url: string | null;
  theme: string;
  badges_unlocked: string[];
}

const SECTIONS: SectionConfig[] = [
  {
    id: 'profile',
    label: 'Perfil',
    description: 'Avatar, nombre y biografía',
    icon: <User className="w-5 h-5" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'social',
    label: 'Enlaces',
    description: 'Redes sociales y web',
    icon: <Link2 className="w-5 h-5" />,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'privacy',
    label: 'Privacidad',
    description: 'Controla tu visibilidad',
    icon: <Shield className="w-5 h-5" />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    id: 'notifications',
    label: 'Notificaciones',
    description: 'Alertas y correos',
    icon: <Bell className="w-5 h-5" />,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    gradient: 'from-cyan-500 to-sky-500',
  },
  {
    id: 'game',
    label: 'Preferencias D&D',
    description: 'Unidades y edición',
    icon: <Gamepad2 className="w-5 h-5" />,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    id: 'appearance',
    label: 'Apariencia',
    description: 'Tema y banner',
    icon: <Palette className="w-5 h-5" />,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'accessibility',
    label: 'Accesibilidad',
    description: 'Fuentes y contraste',
    icon: <Accessibility className="w-5 h-5" />,
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
    gradient: 'from-teal-500 to-emerald-500',
  },
  {
    id: 'connections',
    label: 'Conexiones',
    description: 'Cuentas y sesiones',
    icon: <PlugZap className="w-5 h-5" />,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    id: 'badges',
    label: 'Insignias',
    description: 'Colección de logros',
    icon: <Award className="w-5 h-5" />,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'account',
    label: 'Cuenta',
    description: 'Seguridad y acceso',
    icon: <UserCog className="w-5 h-5" />,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    gradient: 'from-red-500 to-rose-500',
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');

  const router = useRouter();
  const supabase = createClient();

  // Load profile data
  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push('/login');
          return;
        }

        setUserEmail(user.email || '');

        const { data, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        setProfile({
          ...data,
          show_email: data.show_email ?? false,
          show_location: data.show_location ?? true,
          show_characters: data.show_characters ?? true,
          show_activity: data.show_activity ?? true,
          profile_hidden: data.profile_hidden ?? false,
          theme: data.theme || 'clasico',
          badges_unlocked: data.badges_unlocked || [],
        });
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [supabase, router]);

  const handleProfileUpdate = (updates: Partial<ProfileData>) => {
    if (profile) {
      setProfile({ ...profile, ...updates });
    }
  };

  const currentSection = SECTIONS.find(s => s.id === activeSection)!;

  // ============================================================================
  // LOADING STATE
  // ============================================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dungeon-950 via-dungeon-900 to-dungeon-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500/20 to-amber-500/20 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-gold-400 animate-spin" />
            </div>
          </div>
          <h2 className="mt-6 text-xl font-semibold text-dungeon-100">Cargando configuración</h2>
          <p className="mt-2 text-sm text-dungeon-500">Preparando tu panel de ajustes...</p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // ERROR STATE
  // ============================================================================

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dungeon-950 via-dungeon-900 to-dungeon-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-dungeon-900/80 border border-red-500/30 rounded-2xl p-8 text-center backdrop-blur-sm">
          <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-dungeon-100 mb-2">Error al cargar</h2>
          <p className="text-dungeon-400 mb-6">{error || 'No se pudo cargar tu perfil'}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-dungeon-800 hover:bg-dungeon-700 border border-dungeon-700 text-dungeon-200 rounded-xl transition-colors"
            >
              Reintentar
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-dungeon-950 font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER SECTION CONTENT
  // ============================================================================

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <ProfileInfoEditor
            userId={profile.id}
            currentData={{
              avatar_url: profile.avatar_url,
              display_name: profile.display_name,
              bio: profile.bio,
              location: profile.location,
            }}
            onUpdate={handleProfileUpdate}
          />
        );

      case 'social':
        return (
          <SocialLinksEditor
            userId={profile.id}
            currentData={{
              github_url: profile.github_url,
              twitter_url: profile.twitter_url,
              website_url: profile.website_url,
            }}
            onUpdate={handleProfileUpdate}
          />
        );

      case 'privacy':
        return (
          <PrivacySettings
            userId={profile.id}
            currentData={{
              show_email: profile.show_email,
              show_location: profile.show_location,
              show_characters: profile.show_characters,
              show_activity: profile.show_activity,
              profile_hidden: profile.profile_hidden,
            }}
            onUpdate={handleProfileUpdate}
          />
        );

      case 'notifications':
        return <NotificationsSettings userId={profile.id} />;

      case 'game':
        return <GamePreferences userId={profile.id} />;

      case 'appearance':
        return (
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-pink-500/10">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dungeon-100">Banner del Perfil</h3>
                  <p className="text-sm text-dungeon-500">Imagen de cabecera de tu perfil</p>
                </div>
              </div>
              <ProfileBannerUpload
                currentBannerUrl={profile.banner_url}
                userId={profile.id}
                onBannerUpdate={(url) => handleProfileUpdate({ banner_url: url })}
              />
            </div>

            <div className="border-t border-dungeon-800/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Palette className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dungeon-100">Tema del Perfil</h3>
                  <p className="text-sm text-dungeon-500">Elige según tu clase favorita</p>
                </div>
              </div>
              <ThemeSelector
                currentTheme={profile.theme}
                userId={profile.id}
                onThemeUpdate={(theme) => handleProfileUpdate({ theme })}
              />
            </div>
          </div>
        );

      case 'accessibility':
        return <AccessibilitySettings userId={profile.id} />;

      case 'connections':
        return <ConnectionsSettings userId={profile.id} userEmail={userEmail} />;

      case 'badges':
        return (
          <BadgeCollectionDisplay
            userId={profile.id}
            unlockedBadges={profile.badges_unlocked}
            isOwner={true}
          />
        );

      case 'account':
        return <AccountSettings userId={profile.id} userEmail={userEmail} />;

      default:
        return null;
    }
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="container mx-auto px-4 py-6 lg:py-8">
      {/* Page Header - Consistent with site aesthetic */}
      <div className="mb-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dungeon-400 mb-4">
          <Link href="/" className="hover:text-gold-400 transition-colors">Inicio</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/u/${profile.username_slug}`} className="hover:text-gold-400 transition-colors">
            Mi Perfil
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-dungeon-200">Configuración</span>
        </nav>

        {/* Title Card - Same style as ProfileHeader */}
        <div className="bg-gradient-to-br from-gold-900/30 via-dungeon-800 to-dungeon-900 border border-gold-500/30 rounded-lg p-6 md:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-gold-500/20 to-amber-500/20 border border-gold-500/30">
                <Settings className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gold-300">Configuración</h1>
                <p className="text-dungeon-300 mt-1">Personaliza tu experiencia en D&D Compendium</p>
              </div>
            </div>
            <Link
              href={`/u/${profile.username_slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-dungeon-950 font-semibold rounded-xl transition-colors group self-start sm:self-auto"
            >
              <span>Ver mi perfil</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* ================================================================ */}
          {/* SIDEBAR - Desktop Only */}
          {/* ================================================================ */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <nav className="bg-dungeon-800/50 border border-dungeon-700/50 rounded-lg p-3 space-y-1">
                {SECTIONS.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? 'bg-gold-500/20 border border-gold-500/30'
                          : 'hover:bg-dungeon-700/50 border border-transparent'
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-colors ${
                        isActive ? 'bg-gold-500/20' : section.bgColor
                      }`}>
                        <span className={isActive ? 'text-gold-400' : section.color}>
                          {section.icon}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className={`font-medium ${isActive ? 'text-gold-300' : 'text-dungeon-200 group-hover:text-dungeon-100'}`}>
                          {section.label}
                        </p>
                        <p className={`text-xs ${isActive ? 'text-dungeon-400' : 'text-dungeon-500'}`}>
                          {section.description}
                        </p>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-all ${
                        isActive
                          ? 'text-gold-400 translate-x-0.5'
                          : 'text-dungeon-600 opacity-0 group-hover:opacity-100'
                      }`} />
                    </button>
                  );
                })}
              </nav>

              {/* Info Card */}
              <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">Auto-guardado</span>
                </div>
                <p className="text-xs text-dungeon-300 leading-relaxed">
                  Todos los cambios se guardan automáticamente. No necesitas hacer clic en guardar.
                </p>
              </div>
            </div>
          </aside>

          {/* ================================================================ */}
          {/* MOBILE NAVIGATION */}
          {/* ================================================================ */}
          <div className="lg:hidden mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-gold-500/20 border border-gold-500/30 text-gold-300'
                        : 'bg-dungeon-800/50 text-dungeon-400 border border-dungeon-700/50 hover:border-dungeon-600'
                    }`}
                  >
                    <span className={isActive ? 'text-gold-400' : section.color}>
                      {section.icon}
                    </span>
                    <span className="text-sm font-medium">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================================ */}
          {/* MAIN CONTENT */}
          {/* ================================================================ */}
          <main className="flex-1 min-w-0">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-dungeon-700/50">
              <div className={`p-3 rounded-lg ${currentSection.bgColor} border ${currentSection.borderColor}`}>
                <span className={currentSection.color}>{currentSection.icon}</span>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-dungeon-100">{currentSection.label}</h2>
                <p className="text-sm text-dungeon-400 mt-0.5">{currentSection.description}</p>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-dungeon-800/30 border border-dungeon-700/50 rounded-lg p-5 sm:p-6 lg:p-8">
              {renderContent()}
            </div>

            {/* Mobile Auto-save indicator */}
            <div className="lg:hidden mt-6 flex items-center justify-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-dungeon-300">Los cambios se guardan automáticamente</span>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
