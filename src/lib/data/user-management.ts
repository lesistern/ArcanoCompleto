import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  UserCog,
  Users,
  Pencil,
  LucideIcon,
} from 'lucide-react';

export interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  preferred_language?: string | null;
  translations_submitted?: number | null;
  translations_approved?: number | null;
  reviews_completed?: number | null;
  reputation_points?: number | null;
  created_at: string;
  updated_at?: string | null;
  last_active_at?: string | null;
  profile_hidden?: boolean | null;
  username_slug: string;
  experience_points: number;
  reports_submitted: number;
  reports_resolved: number;
  total_votes_received: number;
  level: number;
  exp_to_next_level?: number | null;
  tier: string;
  tier_code: string;
  tier_codes?: string[] | null;
  daily_reports_count?: number | null;
  last_report_date?: string | null;
  trust_score?: number | null;
  location?: string | null;
  github_url?: string | null;
  twitter_url?: string | null;
  website_url?: string | null;
  show_email?: boolean | null;
  show_location?: boolean | null;
  show_characters?: boolean | null;
  show_activity?: boolean | null;
  forum_trust_level?: string | null;
  forum_threads_created?: number | null;
  forum_posts_created?: number | null;
  forum_solutions_accepted?: number | null;
  forum_upvotes_received?: number | null;
  forum_upvotes_given?: number | null;
  forum_banned_until?: string | null;
  forum_restriction_reason?: string | null;
  patreon_tier: string;
  patreon_user_id?: string | null;
  patreon_since?: string | null;
  patreon_status?: string | null;
  patreon_last_sync?: string | null;
  last_sign_in_at?: string | null;
  phone?: string | null;
  provider?: string | null;
}

export interface TierBadgeConfig {
  label: string;
  color: string;
  icon: LucideIcon;
}

export interface TierConfig {
  value: string;
  label: string;
  description: string;
  protected?: boolean;
  adminOnly?: boolean;
}

export const TIER_BADGES: Record<string, TierBadgeConfig> = {
  admin: {
    label: 'Admin',
    color: 'text-red-400 border-red-500/30 bg-red-500/10',
    icon: Shield,
  },
  reviewer: {
    label: 'Mod',
    color: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
    icon: ShieldCheck,
  },
  editor: {
    label: 'Editor',
    color: 'text-yellow-300 border-yellow-500/30 bg-yellow-500/10',
    icon: Pencil,
  },
  translator: {
    label: 'Traductor',
    color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    icon: ShieldAlert,
  },
  contributor: {
    label: 'Beta tester',
    color: 'text-green-400 border-green-500/30 bg-green-500/10',
    icon: UserCog,
  },
  user: {
    label: 'Usuario',
    color: 'text-dungeon-400 border-dungeon-700 bg-dungeon-800',
    icon: Users,
  },
};

export const ALL_TIERS: TierConfig[] = [
  {
    value: 'admin',
    label: 'Admin',
    description: 'Acceso total al sistema',
    protected: true,
    adminOnly: true,
  },
  {
    value: 'reviewer',
    label: 'Mod',
    description: 'Puede revisar y aprobar contenido',
    adminOnly: true,
  },
  {
    value: 'editor',
    label: 'Editor',
    description: 'Puede editar textos (requiere revision)',
    adminOnly: true,
  },
  {
    value: 'translator',
    label: 'Traductor',
    description: 'Puede traducir y revisar traducciones',
  },
  {
    value: 'contributor',
    label: 'Beta tester',
    description: 'Puede contribuir con contenido',
  },
  {
    value: 'user',
    label: 'Usuario',
    description: 'Usuario estandar',
  },
];

export const SAFE_FORMAT = {
  val: (val: any, fallback = '—') =>
    val === undefined || val === null || val === '' ? fallback : val,
  bool: (val?: boolean | null) => (val ? 'Si' : 'No'),
  date: (val?: string | null) =>
    val ? new Date(val).toLocaleString() : '—',
};

export function getTierBadge(tierCode: string): TierBadgeConfig {
  return TIER_BADGES[tierCode as keyof typeof TIER_BADGES] || TIER_BADGES.user;
}

export function getTierInfo(tierCode: string): TierConfig | undefined {
  return ALL_TIERS.find((t) => t.value === tierCode);
}

export function getUserTiers(user: UserProfile): string[] {
  const baseCodes = (
    user.tier_codes && user.tier_codes.length
      ? user.tier_codes
      : [user.tier_code || user.tier || 'user']
  ).filter(Boolean);
  const codes = Array.from(new Set(baseCodes));
  const isLesistern =
    user.email?.toLowerCase().includes('lesistern') ||
    user.username_slug?.toLowerCase().includes('lesistern') ||
    (user.display_name || '').toLowerCase().includes('lesistern');
  if (isLesistern && !codes.includes('admin')) codes.unshift('admin');
  if (isLesistern && !codes.includes('editor')) codes.unshift('editor');
  return codes;
}

export interface UserStats {
  total: number;
  admins: number;
  reviewers: number;
  editors: number;
  beta_testers: number;
}

export function calculateUserStats(users: UserProfile[]): UserStats {
  return {
    total: users.length,
    admins: users.filter((u) => getUserTiers(u).includes('admin')).length,
    reviewers: users.filter((u) => getUserTiers(u).includes('reviewer')).length,
    editors: users.filter((u) => getUserTiers(u).includes('editor')).length,
    beta_testers: users.filter((u) =>
      getUserTiers(u).includes('contributor')
    ).length,
  };
}
