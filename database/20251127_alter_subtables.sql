-- Add bilingual columns to class_features
ALTER TABLE class_features ADD COLUMN IF NOT EXISTS name_en text;
ALTER TABLE class_features ADD COLUMN IF NOT EXISTS name_es text;
ALTER TABLE class_features ADD COLUMN IF NOT EXISTS description_en text;
ALTER TABLE class_features ADD COLUMN IF NOT EXISTS description_es text;
ALTER TABLE class_features ADD COLUMN IF NOT EXISTS summary_en text;
ALTER TABLE class_features ADD COLUMN IF NOT EXISTS summary_es text;
ALTER TABLE class_features ADD COLUMN IF NOT EXISTS type text;

-- Add bilingual columns to class_progression
ALTER TABLE class_progression ADD COLUMN IF NOT EXISTS bab text;
ALTER TABLE class_progression ADD COLUMN IF NOT EXISTS special_en text[];
ALTER TABLE class_progression ADD COLUMN IF NOT EXISTS special_es text[];
