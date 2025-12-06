-- Monk class population script
-- Generated from Monk.md

-- CLASS PROGRESSION
INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_en, special_es)
VALUES
('monk', 1, '+0', 2, 2, 2, ARRAY['Bonus feat', 'flurry of blows', 'unarmed strike'], NULL),
('monk', 2, '+1', 3, 3, 3, ARRAY['Bonus feat', 'evasion'], NULL),
('monk', 3, '+2', 3, 3, 3, ARRAY['Still mind'], NULL),
('monk', 4, '+3', 4, 4, 4, ARRAY['Ki strike (magic)', 'slow fall 20 ft.'], NULL),
('monk', 5, '+3', 4, 4, 4, ARRAY['Purity of body'], NULL),
('monk', 6, '+4', 5, 5, 5, ARRAY['Bonus feat', 'slow fall 30 ft.'], NULL),
('monk', 7, '+5', 5, 5, 5, ARRAY['Wholeness of body'], NULL),
('monk', 8, '+6/+1', 6, 6, 6, ARRAY['Slow fall 40 ft.'], NULL),
('monk', 9, '+6/+1', 6, 6, 6, ARRAY['Improved evasion'], NULL),
('monk', 10, '+7/+2', 7, 7, 7, ARRAY['Ki strike (lawful)', 'slow fall 50 ft.'], NULL),
('monk', 11, '+8/+3', 7, 7, 7, ARRAY['Diamond body', 'greater flurry'], NULL),
('monk', 12, '+9/+4', 8, 8, 8, ARRAY['Abundant step', 'slow fall 60 ft.'], NULL),
('monk', 13, '+9/+4', 8, 8, 8, ARRAY['Diamond soul'], NULL),
('monk', 14, '+10/+5', 9, 9, 9, ARRAY['Slow fall 70 ft.'], NULL),
('monk', 15, '+11/+6/+1', 9, 9, 9, ARRAY['Quivering palm'], NULL),
('monk', 16, '+12/+7/+2', 10, 10, 10, ARRAY['Ki strike (adamantine)', 'slow fall 80 ft.'], NULL),
('monk', 17, '+12/+7/+2', 10, 10, 10, ARRAY['Timeless body', 'tongue of the sun and moon'], NULL),
('monk', 18, '+13/+8/+3', 11, 11, 11, ARRAY['Slow fall 90 ft.'], NULL),
('monk', 19, '+14/+9/+4', 11, 11, 11, ARRAY['Empty body'], NULL),
('monk', 20, '+15/+10/+5', 12, 12, 12, ARRAY['Perfect self', 'slow fall any distance'], NULL)
ON CONFLICT (class_slug, level)
DO UPDATE SET
  base_attack_bonus = EXCLUDED.base_attack_bonus,
  fort_save = EXCLUDED.fort_save,
  ref_save = EXCLUDED.ref_save,
  will_save = EXCLUDED.will_save,
  special_en = EXCLUDED.special_en,
  special_es = EXCLUDED.special_es;
