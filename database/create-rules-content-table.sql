-- Create rules_content table for storing additional rule documents
CREATE TABLE IF NOT EXISTS rules_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'character-creation', 'gameplay', 'setting', etc.
    description TEXT,
    content TEXT NOT NULL, -- Full markdown content
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_rules_content_slug ON rules_content(slug);
CREATE INDEX IF NOT EXISTS idx_rules_content_category ON rules_content(category);
CREATE INDEX IF NOT EXISTS idx_rules_content_order ON rules_content(display_order);

-- Enable RLS
ALTER TABLE rules_content ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to rules_content"
    ON rules_content
    FOR SELECT
    TO public
    USING (true);

-- Add comment
COMMENT ON TABLE rules_content IS 'Additional rule documents and content from markdown files';
