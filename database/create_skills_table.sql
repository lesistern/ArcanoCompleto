-- ============================================
-- Migration: Create skills table
-- Description: Creates the skills table for D&D 3.5 skills
-- Execute this in Supabase SQL Editor
-- ============================================

-- Drop existing skills table if it exists (to fix schema issues)
DROP TABLE IF EXISTS public.skills CASCADE;

-- Create skills table with correct schema
CREATE TABLE public.skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT,
    description TEXT,
    key_ability TEXT,
    category TEXT,
    trained_only BOOLEAN DEFAULT false,
    armor_check_penalty BOOLEAN DEFAULT false,
    uses JSONB,
    check_description TEXT,
    action TEXT,
    retry BOOLEAN DEFAULT false,
    retry_details TEXT,
    special JSONB,
    synergies JSONB,
    class_skill_for JSONB,
    untrained_use TEXT,
    source JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_skills_slug ON public.skills(slug);
CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_class_skill_for ON public.skills USING GIN(class_skill_for);

-- Enable Row Level Security
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to skills"
    ON public.skills
    FOR SELECT
    TO public
    USING (true);

-- Add comment to table
COMMENT ON TABLE public.skills IS 'D&D 3.5 skills with their properties, uses, and synergies';
