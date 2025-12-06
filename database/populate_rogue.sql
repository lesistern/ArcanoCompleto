-- Rogue class population script
-- Generated from Rogue.md

-- CLASS PROGRESSION
INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_en, special_es)
VALUES
('rogue', 1, '+0', 0, 2, 0, ARRAY['Sneak attack +1d6', 'trapfinding'], NULL),
('rogue', 2, '+1', 0, 3, 0, ARRAY['Evasion'], NULL),
('rogue', 3, '+2', 1, 3, 1, ARRAY['Sneak attack +2d6', 'trap sense +1'], NULL),
('rogue', 4, '+3', 1, 4, 1, ARRAY['Uncanny dodge'], NULL),
('rogue', 5, '+3', 1, 4, 1, ARRAY['Sneak attack +3d6'], NULL),
('rogue', 6, '+4', 2, 5, 2, ARRAY['Trap sense +2'], NULL),
('rogue', 7, '+5', 2, 5, 2, ARRAY['Sneak attack +4d6'], NULL),
('rogue', 8, '+6/+1', 2, 6, 2, ARRAY['Improved uncanny dodge'], NULL),
('rogue', 9, '+6/+1', 3, 6, 3, ARRAY['Sneak attack +5d6', 'trap sense +3'], NULL),
('rogue', 10, '+7/+2', 3, 7, 3, ARRAY['Special ability'], NULL),
('rogue', 11, '+8/+3', 3, 7, 3, ARRAY['Sneak attack +6d6'], NULL),
('rogue', 12, '+9/+4', 4, 8, 4, ARRAY['Trap sense +4'], NULL),
('rogue', 13, '+9/+4', 4, 8, 4, ARRAY['Sneak attack +7d6', 'special ability'], NULL),
('rogue', 14, '+10/+5', 4, 9, 4, NULL, NULL),
('rogue', 15, '+11/+6/+1', 5, 9, 5, ARRAY['Sneak attack +8d6', 'trap sense +5'], NULL),
('rogue', 16, '+12/+7/+2', 5, 10, 5, ARRAY['Special ability'], NULL),
('rogue', 17, '+12/+7/+2', 5, 10, 5, ARRAY['Sneak attack +9d6'], NULL),
('rogue', 18, '+13/+8/+3', 6, 11, 6, ARRAY['Trap sense +6'], NULL),
('rogue', 19, '+14/+9/+4', 6, 11, 6, ARRAY['Sneak attack +10d6', 'special ability'], NULL),
('rogue', 20, '+15/+10/+5', 6, 12, 6, NULL, NULL)
ON CONFLICT (class_slug, level)
DO UPDATE SET
  base_attack_bonus = EXCLUDED.base_attack_bonus,
  fort_save = EXCLUDED.fort_save,
  ref_save = EXCLUDED.ref_save,
  will_save = EXCLUDED.will_save,
  special_en = EXCLUDED.special_en,
  special_es = EXCLUDED.special_es;
