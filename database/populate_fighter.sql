-- Fighter class population script
-- Generated from Fighter.md

-- CLASS PROGRESSION
INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_en, special_es)
VALUES
('fighter', 1, '+1', 2, 0, 0, ARRAY['Bonus feat'], NULL),
('fighter', 2, '+2', 3, 0, 0, ARRAY['Bonus feat'], NULL),
('fighter', 3, '+3', 3, 1, 1, NULL, NULL),
('fighter', 4, '+4', 4, 1, 1, ARRAY['Bonus feat'], NULL),
('fighter', 5, '+5', 4, 1, 1, NULL, NULL),
('fighter', 6, '+6/+1', 5, 2, 2, ARRAY['Bonus feat'], NULL),
('fighter', 7, '+7/+2', 5, 2, 2, NULL, NULL),
('fighter', 8, '+8/+3', 6, 2, 2, ARRAY['Bonus feat'], NULL),
('fighter', 9, '+9/+4', 6, 3, 3, NULL, NULL),
('fighter', 10, '+10/+5', 7, 3, 3, ARRAY['Bonus feat'], NULL),
('fighter', 11, '+11/+6/+1', 7, 3, 3, NULL, NULL),
('fighter', 12, '+12/+7/+2', 8, 4, 4, ARRAY['Bonus feat'], NULL),
('fighter', 13, '+13/+8/+3', 8, 4, 4, NULL, NULL),
('fighter', 14, '+14/+9/+4', 9, 4, 4, ARRAY['Bonus feat'], NULL),
('fighter', 15, '+15/+10/+5', 9, 5, 5, NULL, NULL),
('fighter', 16, '+16/+11/+6/+1', 10, 5, 5, ARRAY['Bonus feat'], NULL),
('fighter', 17, '+17/+12/+7/+2', 10, 5, 5, NULL, NULL),
('fighter', 18, '+18/+13/+8/+3', 11, 6, 6, ARRAY['Bonus feat'], NULL),
('fighter', 19, '+19/+14/+9/+4', 11, 6, 6, NULL, NULL),
('fighter', 20, '+20/+15/+10/+5', 12, 6, 6, ARRAY['Bonus feat'], NULL)
ON CONFLICT (class_slug, level)
DO UPDATE SET
  base_attack_bonus = EXCLUDED.base_attack_bonus,
  fort_save = EXCLUDED.fort_save,
  ref_save = EXCLUDED.ref_save,
  will_save = EXCLUDED.will_save,
  special_en = EXCLUDED.special_en,
  special_es = EXCLUDED.special_es;
