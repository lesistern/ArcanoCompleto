-- Add unique constraint to class_features to support ON CONFLICT
ALTER TABLE class_features ADD CONSTRAINT class_features_slug_name_level_key UNIQUE (class_slug, name_en, level);
