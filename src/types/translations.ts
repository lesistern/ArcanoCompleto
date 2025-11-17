/**
 * Tipos TypeScript para el Sistema de Traducciones Colaborativo
 */

// ============================================================================
// USER TIERS
// ============================================================================

export type TierCode = 'guest' | 'user' | 'contributor' | 'translator' | 'reviewer' | 'admin';

export interface UserTier {
  code: TierCode;
  name: string;
  description: string | null;
  can_translate: boolean;
  can_review: boolean;
  can_approve: boolean;
  max_edits_per_day: number | null;
  created_at: string;
}

// ============================================================================
// USER PROFILES
// ============================================================================

export interface UserProfile {
  id: string;
  tier_code: TierCode;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  preferred_language: string;
  translations_submitted: number;
  translations_approved: number;
  reviews_completed: number;
  reputation_points: number;
  created_at: string;
  updated_at: string;
  last_active_at: string | null;

  // Joined data
  tier?: UserTier;
}

// ============================================================================
// TRANSLATION EDITS
// ============================================================================

export type EntityType = 'spell' | 'class' | 'race' | 'feat' | 'skill' | 'weapon' | 'armor' | 'monster' | 'magic_item';
export type TranslationStatus = 'pending' | 'approved' | 'rejected';
export type TranslationMethod = 'manual' | 'deepl' | 'google' | 'community';

export interface TranslationEdit {
  id: string;
  entity_type: EntityType;
  entity_id: string;
  language_code: string;
  field_name: string;
  old_value: string | null;
  new_value: string;
  submitted_by: string | null;
  submitted_at: string;
  status: TranslationStatus;
  reviewed_by: string | null;
  reviewed_at: string | null;
  review_comment: string | null;
  translation_method: TranslationMethod | null;
  confidence_score: number | null;

  // Joined data
  submitter?: UserProfile;
  reviewer?: UserProfile;
  vote_count?: number;
  user_vote?: number; // -1, 0, 1
}

// ============================================================================
// TRANSLATION VOTES
// ============================================================================

export interface TranslationVote {
  id: string;
  edit_id: string;
  user_id: string;
  vote: -1 | 1;
  created_at: string;
}

// ============================================================================
// ENTITY DATA (para mostrar contexto)
// ============================================================================

export interface SpellData {
  id: string;
  slug: string;
  name: string;
  name_es: string | null;
  description: string | null;
  description_es: string | null;
  school: string | null;
  level: number;
}

export interface ClassData {
  id: string;
  slug: string;
  name: string;
  name_es: string | null;
  description: string | null;
  description_es: string | null;
}

export interface RaceData {
  id: string;
  slug: string;
  name: string;
  name_es: string | null;
  description: string | null;
  description_es: string | null;
}

export interface FeatData {
  id: string;
  slug: string;
  name: string;
  name_es: string | null;
  benefit: string | null;
  benefit_es: string | null;
}

export type EntityData = SpellData | ClassData | RaceData | FeatData;

// ============================================================================
// FILTERS & SEARCH
// ============================================================================

export interface TranslationFilters {
  entity_type?: EntityType | 'all';
  status?: TranslationStatus | 'all';
  language_code?: string;
  submitted_by?: string;
  search?: string;
  sort_by?: 'created_at' | 'vote_count' | 'confidence_score';
  sort_order?: 'asc' | 'desc';
}

// ============================================================================
// STATISTICS
// ============================================================================

export interface TranslationStats {
  total_pending: number;
  total_approved: number;
  total_rejected: number;
  total_by_entity: Record<EntityType, number>;
  user_submitted: number;
  user_approved: number;
  user_reputation: number;
}
