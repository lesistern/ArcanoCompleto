
-- ============================================================================
-- TABLA DE PROGRESIÓN DE CLASES
-- Niveles 1-20 para cada clase base con BAB, salvaciones y habilidades
-- ============================================================================

DROP TABLE IF EXISTS public.class_progression CASCADE;

CREATE TABLE public.class_progression (
  id BIGSERIAL PRIMARY KEY,
  class_slug TEXT NOT NULL REFERENCES public.classes(slug) ON DELETE CASCADE,
  level INTEGER NOT NULL CHECK (level >= 1 AND level <= 20),
  base_attack_bonus TEXT NOT NULL,
  fort_save INTEGER NOT NULL,
  ref_save INTEGER NOT NULL,
  will_save INTEGER NOT NULL,
  special_abilities TEXT,
  spells_per_day JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraint único por clase y nivel
  UNIQUE(class_slug, level)
);

-- Índices para consultas rápidas
CREATE INDEX idx_class_progression_class ON public.class_progression(class_slug);
CREATE INDEX idx_class_progression_level ON public.class_progression(level);

-- Comentarios
COMMENT ON TABLE public.class_progression IS 'Tabla de progresión de niveles 1-20 para cada clase base de D&D 3.5';
COMMENT ON COLUMN public.class_progression.base_attack_bonus IS 'BAB por nivel (ej: "+1", "+6/+1", "+15/+10/+5")';
COMMENT ON COLUMN public.class_progression.special_abilities IS 'Habilidades especiales obtenidas en este nivel';
COMMENT ON COLUMN public.class_progression.spells_per_day IS 'Conjuros por día por nivel de conjuro (JSON)';


-- Progresión de Bárbaro (20 niveles)
INSERT INTO public.class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities)
VALUES
  ('barbarian', 1, '+1', 2, 0, 0, 'Fast movement, illiteracy, rage 1/day'),
  ('barbarian', 2, '+2', 3, 0, 0, 'Uncanny dodge'),
  ('barbarian', 3, '+3', 3, 1, 1, 'Trap sense +1'),
  ('barbarian', 4, '+4', 4, 1, 1, 'Rage 2/day'),
  ('barbarian', 5, '+5', 4, 1, 1, 'Improved uncanny dodge'),
  ('barbarian', 6, '+6/+1', 5, 2, 2, 'Trap sense +2'),
  ('barbarian', 7, '+7/+2', 5, 2, 2, 'Damage reduction 1/—'),
  ('barbarian', 8, '+8/+3', 6, 2, 2, 'Rage 3/day'),
  ('barbarian', 9, '+9/+4', 6, 3, 3, 'Trap sense +3'),
  ('barbarian', 10, '+10/+5', 7, 3, 3, 'Damage reduction 2/—'),
  ('barbarian', 11, '+11/+6/+1', 7, 3, 3, 'Greater rage'),
  ('barbarian', 12, '+12/+7/+2', 8, 4, 4, 'Rage 4/day, trap sense +4'),
  ('barbarian', 13, '+13/+8/+3', 8, 4, 4, 'Damage reduction 3/—'),
  ('barbarian', 14, '+14/+9/+4', 9, 4, 4, 'Indomitable will'),
  ('barbarian', 15, '+15/+10/+5', 9, 5, 5, 'Trap sense +5'),
  ('barbarian', 16, '+16/+11/+6/+1', 10, 5, 5, 'Damage reduction 4/—, rage 5/day'),
  ('barbarian', 17, '+17/+12/+7/+2', 10, 5, 5, 'Tireless rage'),
  ('barbarian', 18, '+18/+13/+8/+3', 11, 6, 6, 'Trap sense +6'),
  ('barbarian', 19, '+19/+14/+9/+4', 11, 6, 6, 'Damage reduction 5/—'),
  ('barbarian', 20, '+20/+15/+10/+5', 12, 6, 6, 'Mighty rage, rage 6/day')
ON CONFLICT (class_slug, level) DO UPDATE
  SET base_attack_bonus = EXCLUDED.base_attack_bonus,
      fort_save = EXCLUDED.fort_save,
      ref_save = EXCLUDED.ref_save,
      will_save = EXCLUDED.will_save,
      special_abilities = EXCLUDED.special_abilities,
      updated_at = NOW();


-- Progresión de Bardo (20 niveles)
INSERT INTO public.class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities)
VALUES
  ('bard', 1, '+0', 0, 2, 2, 'Bardic music, bardic knowledge,countersong, fascinate,inspire courage +1 | 2 | — | — | — | — | — | — | 4 | — | — | — | — | — | —'),
  ('bard', 2, '+1', 0, 3, 3, ' | 3 | 0 | — | — | — | — | — | 5 | 21 | — | — | — | — | —'),
  ('bard', 3, '+2', 1, 3, 3, 'Inspire competence | 3 | 1 | — | — | — | — | — | 6 | 3 | — | — | — | — | —'),
  ('bard', 4, '+3', 1, 4, 4, ' | 3 | 2 | 0 | — | — | — | — | 6 | 3 | 21 | — | — | — | —'),
  ('bard', 5, '+3', 1, 4, 4, ' | 3 | 3 | 1 | — | — | — | — | 6 | 4 | 3 | — | — | — | —'),
  ('bard', 6, '+4', 2, 5, 5, 'Suggestion | 3 | 3 | 2 | — | — | — | — | 6 | 4 | 3 | — | — | — | —'),
  ('bard', 7, '+5', 2, 5, 5, ' | 3 | 3 | 2 | 0 | — | — | — | 6 | 4 | 4 | 21 | — | — | —'),
  ('bard', 8, '+6/+1', 2, 6, 6, 'Inspire courage +2 | 3 | 3 | 3 | 1 | — | — | — | 6 | 4 | 4 | 3 | — | — | —'),
  ('bard', 9, '+6/+1', 3, 6, 6, 'Inspire greatness | 3 | 3 | 3 | 2 | — | — | — | 6 | 4 | 4 | 3 | — | — | —'),
  ('bard', 10, '+7/+2', 3, 7, 7, ' | 3 | 3 | 3 | 2 | 0 | — | — | 6 | 4 | 4 | 4 | 21 | — | —'),
  ('bard', 11, '+8/+3', 3, 7, 7, ' | 3 | 3 | 3 | 3 | 1 | — | — | 6 | 4 | 4 | 4 | 3 | — | —'),
  ('bard', 12, '+9/+4', 4, 8, 8, 'Song of freedom | 3 | 3 | 3 | 3 | 2 | — | — | 6 | 4 | 4 | 4 | 3 | — | —'),
  ('bard', 13, '+9/+4', 4, 8, 8, ' | 3 | 3 | 3 | 3 | 2 | 0 | — | 6 | 4 | 4 | 4 | 4 | 21 | —'),
  ('bard', 14, '+10/+5', 4, 9, 9, 'Inspire courage +3 | 4 | 3 | 3 | 3 | 3 | 1 | — | 6 | 4 | 4 | 4 | 4 | 3 | —'),
  ('bard', 15, '+11/+6/+1', 5, 9, 9, 'Inspire heroics | 4 | 4 | 3 | 3 | 3 | 2 | — | 6 | 4 | 4 | 4 | 4 | 3 | —'),
  ('bard', 16, '+12/+7/+2', 5, 10, 10, ' | 4 | 4 | 4 | 3 | 3 | 2 | 0 | 6 | 5 | 4 | 4 | 4 | 4 | 21'),
  ('bard', 17, '+12/+7/+2', 5, 10, 10, ' | 4 | 4 | 4 | 4 | 3 | 3 | 1 | 6 | 5 | 5 | 4 | 4 | 4 | 3'),
  ('bard', 18, '+13/+8/+3', 6, 11, 11, 'Mass suggestion | 4 | 4 | 4 | 4 | 4 | 3 | 2 | 6 | 5 | 5 | 5 | 4 | 4 | 3'),
  ('bard', 19, '+14/+9/+4', 6, 11, 11, ' | 4 | 4 | 4 | 4 | 4 | 4 | 3 | 6 | 5 | 5 | 5 | 5 | 4 | 4'),
  ('bard', 20, '+15/+10/+5', 6, 12, 12, 'Inspire courage +4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 6 | 5 | 5 | 5 | 5 | 5 | 4')
ON CONFLICT (class_slug, level) DO UPDATE
  SET base_attack_bonus = EXCLUDED.base_attack_bonus,
      fort_save = EXCLUDED.fort_save,
      ref_save = EXCLUDED.ref_save,
      will_save = EXCLUDED.will_save,
      special_abilities = EXCLUDED.special_abilities,
      updated_at = NOW();


-- Progresión de Clérigo (20 niveles)
INSERT INTO public.class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities)
VALUES
  ('cleric', 1, '+0', 2, 0, 2, 'Turn or rebuke undead | 3 | 1+1 | — | — | — | — | — | — | — | —'),
  ('cleric', 2, '+1', 3, 0, 3, ' | 4 | 2+1 | — | — | — | — | — | — | — | —'),
  ('cleric', 3, '+2', 3, 1, 3, ' | 4 | 2+1 | 1+1 | — | — | — | — | — | — | —'),
  ('cleric', 4, '+3', 4, 1, 4, ' | 5 | 3+1 | 2+1 | — | — | — | — | — | — | —'),
  ('cleric', 5, '+3', 4, 1, 4, ' | 5 | 3+1 | 2+1 | 1+1 | — | — | — | — | — | —'),
  ('cleric', 6, '+4', 5, 2, 5, ' | 5 | 3+1 | 3+1 | 2+1 | — | — | — | — | — | —'),
  ('cleric', 7, '+5', 5, 2, 5, ' | 6 | 4+1 | 3+1 | 2+1 | 1+1 | — | — | — | — | —'),
  ('cleric', 8, '+6/+1', 6, 2, 6, ' | 6 | 4+1 | 3+1 | 3+1 | 2+1 | — | — | — | — | —'),
  ('cleric', 9, '+6/+1', 6, 3, 6, ' | 6 | 4+1 | 4+1 | 3+1 | 2+1 | 1+1 | — | — | — | —'),
  ('cleric', 10, '+7/+2', 7, 3, 7, ' | 6 | 4+1 | 4+1 | 3+1 | 3+1 | 2+1 | — | — | — | —'),
  ('cleric', 11, '+8/+3', 7, 3, 7, ' | 6 | 5+1 | 4+1 | 4+1 | 3+1 | 2+1 | 1+1 | — | — | —'),
  ('cleric', 12, '+9/+4', 8, 4, 8, ' | 6 | 5+1 | 4+1 | 4+1 | 3+1 | 3+1 | 2+1 | — | — | —'),
  ('cleric', 13, '+9/+4', 8, 4, 8, ' | 6 | 5+1 | 5+1 | 4+1 | 4+1 | 3+1 | 2+1 | 1+1 | — | —'),
  ('cleric', 14, '+10/+5', 9, 4, 9, ' | 6 | 5+1 | 5+1 | 4+1 | 4+1 | 3+1 | 3+1 | 2+1 | — | —'),
  ('cleric', 15, '+11/+6/+1', 9, 5, 9, ' | 6 | 5+1 | 5+1 | 5+1 | 4+1 | 4+1 | 3+1 | 2+1 | 1+1 | —'),
  ('cleric', 16, '+12/+7/+2', 10, 5, 10, ' | 6 | 5+1 | 5+1 | 5+1 | 4+1 | 4+1 | 3+1 | 3+1 | 2+1 | —'),
  ('cleric', 17, '+12/+7/+2', 10, 5, 10, ' | 6 | 5+1 | 5+1 | 5+1 | 5+1 | 4+1 | 4+1 | 3+1 | 2+1 | 1+1'),
  ('cleric', 18, '+13/+8/+3', 11, 6, 11, ' | 6 | 5+1 | 5+1 | 5+1 | 5+1 | 4+1 | 4+1 | 3+1 | 3+1 | 2+1'),
  ('cleric', 19, '+14/+9/+4', 11, 6, 11, ' | 6 | 5+1 | 5+1 | 5+1 | 5+1 | 5+1 | 4+1 | 4+1 | 3+1 | 3+1'),
  ('cleric', 20, '+15/+10/+5', 12, 6, 12, ' | 6 | 5+1 | 5+1 | 5+1 | 5+1 | 5+1 | 4+1 | 4+1 | 4+1 | 4+1')
ON CONFLICT (class_slug, level) DO UPDATE
  SET base_attack_bonus = EXCLUDED.base_attack_bonus,
      fort_save = EXCLUDED.fort_save,
      ref_save = EXCLUDED.ref_save,
      will_save = EXCLUDED.will_save,
      special_abilities = EXCLUDED.special_abilities,
      updated_at = NOW();


-- Progresión de Druida (20 niveles)
INSERT INTO public.class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities)
VALUES
  ('druid', 1, '+0', 2, 0, 2, 'Animal companion, nature sense, wild empathy | 3 | 1 | — | — | — | — | — | — | — | —'),
  ('druid', 2, '+1', 3, 0, 3, 'Woodland stride | 4 | 2 | — | — | — | — | — | — | — | —'),
  ('druid', 3, '+2', 3, 1, 3, 'Trackless step | 4 | 2 | 1 | — | — | — | — | — | — | —'),
  ('druid', 4, '+3', 4, 1, 4, 'Resist nature’s lure | 5 | 3 | 2 | — | — | — | — | — | — | —'),
  ('druid', 5, '+3', 4, 1, 4, 'Wild shape (1/day) | 5 | 3 | 2 | 1 | — | — | — | — | — | —'),
  ('druid', 6, '+4', 5, 2, 5, 'Wild shape (2/day) | 5 | 3 | 3 | 2 | — | — | — | — | — | —'),
  ('druid', 7, '+5', 5, 2, 5, 'Wild shape (3/day) | 6 | 4 | 3 | 2 | 1 | — | — | — | — | —'),
  ('druid', 8, '+6/+1', 6, 2, 6, 'Wild shape (Large) | 6 | 4 | 3 | 3 | 2 | — | — | — | — | —'),
  ('druid', 9, '+6/+1', 6, 3, 6, 'Venom immunity | 6 | 4 | 4 | 3 | 2 | 1 | — | — | — | —'),
  ('druid', 10, '+7/+2', 7, 3, 7, 'Wild shape (4/day) | 6 | 4 | 4 | 3 | 3 | 2 | — | — | — | —'),
  ('druid', 11, '+8/+3', 7, 3, 7, 'Wild shape (Tiny) | 6 | 5 | 4 | 4 | 3 | 2 | 1 | — | — | —'),
  ('druid', 12, '+9/+4', 8, 4, 8, 'Wild shape (plant) | 6 | 5 | 4 | 4 | 3 | 3 | 2 | — | — | —'),
  ('druid', 13, '+9/+4', 8, 4, 8, 'A thousand faces | 6 | 5 | 5 | 4 | 4 | 3 | 2 | 1 | — | —'),
  ('druid', 14, '+10/+5', 9, 4, 9, 'Wild shape (5/day) | 6 | 5 | 5 | 4 | 4 | 3 | 3 | 2 | — | —'),
  ('druid', 15, '+11/+6/+1', 9, 5, 9, 'Timeless body, wild shape (Huge) | 6 | 5 | 5 | 5 | 4 | 4 | 3 | 2 | 1 | —'),
  ('druid', 16, '+12/+7/+2', 10, 5, 10, 'Wild shape (elemental 1/day) | 6 | 5 | 5 | 5 | 4 | 4 | 3 | 3 | 2 | —'),
  ('druid', 17, '+12/+7/+2', 10, 5, 10, ' | 6 | 5 | 5 | 5 | 5 | 4 | 4 | 3 | 2 | 1'),
  ('druid', 18, '+13/+8/+3', 11, 6, 11, 'Wild shape (6/day, elemental 2/day) | 6 | 5 | 5 | 5 | 5 | 4 | 4 | 3 | 3 | 2'),
  ('druid', 19, '+14/+9/+4', 11, 6, 11, ' | 6 | 5 | 5 | 5 | 5 | 5 | 4 | 4 | 3 | 3'),
  ('druid', 20, '+15/+10/+5', 12, 6, 12, 'Wild shape (elemental 3/day, Huge elemental) | 6 | 5 | 5 | 5 | 5 | 5 | 4 | 4 | 4 | 4')
ON CONFLICT (class_slug, level) DO UPDATE
  SET base_attack_bonus = EXCLUDED.base_attack_bonus,
      fort_save = EXCLUDED.fort_save,
      ref_save = EXCLUDED.ref_save,
      will_save = EXCLUDED.will_save,
      special_abilities = EXCLUDED.special_abilities,
      updated_at = NOW();


-- Progresión de Guerrero (20 niveles)
INSERT INTO public.class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities)
VALUES
  ('fighter', 1, '+1', 2, 0, 0, 'Bonus feat'),
  ('fighter', 2, '+2', 3, 0, 0, 'Bonus feat'),
  ('fighter', 3, '+3', 3, 1, 1, ''),
  ('fighter', 4, '+4', 4, 1, 1, 'Bonus feat'),
  ('fighter', 5, '+5', 4, 1, 1, ''),
  ('fighter', 6, '+6/+1', 5, 2, 2, 'Bonus feat'),
  ('fighter', 7, '+7/+2', 5, 2, 2, ''),
  ('fighter', 8, '+8/+3', 6, 2, 2, 'Bonus feat'),
  ('fighter', 9, '+9/+4', 6, 3, 3, ''),
  ('fighter', 10, '+10/+5', 7, 3, 3, 'Bonus feat'),
  ('fighter', 11, '+11/+6/+1', 7, 3, 3, ''),
  ('fighter', 12, '+12/+7/+2', 8, 4, 4, 'Bonus feat'),
  ('fighter', 13, '+13/+8/+3', 8, 4, 4, ''),
  ('fighter', 14, '+14/+9/+4', 9, 4, 4, 'Bonus feat'),
  ('fighter', 15, '+15/+10/+5', 9, 5, 5, ''),
  ('fighter', 16, '+16/+11/+6/+1', 10, 5, 5, 'Bonus feat'),
  ('fighter', 17, '+17/+12/+7/+2', 10, 5, 5, ''),
  ('fighter', 18, '+18/+13/+8/+3', 11, 6, 6, 'Bonus feat'),
  ('fighter', 19, '+19/+14/+9/+4', 11, 6, 6, ''),
  ('fighter', 20, '+20/+15/+10/+5', 12, 6, 6, 'Bonus feat')
ON CONFLICT (class_slug, level) DO UPDATE
  SET base_attack_bonus = EXCLUDED.base_attack_bonus,
      fort_save = EXCLUDED.fort_save,
      ref_save = EXCLUDED.ref_save,
      will_save = EXCLUDED.will_save,
      special_abilities = EXCLUDED.special_abilities,
      updated_at = NOW();


-- Progresión de Monje (20 niveles)
INSERT INTO public.class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities)
VALUES
  ('monk', 1, '+0', 2, 2, 2, 'Bonus feat, flurry of blows, unarmed strike | -2/-2 | 1d6 | +0 | +0 ft.'),
  ('monk', 2, '+1', 3, 3, 3, 'Bonus feat, evasion | -1/-1 | 1d6 | +0 | +0 ft.'),
  ('monk', 3, '+2', 3, 3, 3, 'Still mind | +0/+0 | 1d6 | +0 | +10 ft.'),
  ('monk', 4, '+3', 4, 4, 4, 'Ki strike (magic), slow fall 20 ft. | +1/+1 | 1d8 | +0 | +10 ft.'),
  ('monk', 5, '+3', 4, 4, 4, 'Purity of body | +2/+2 | 1d8 | +1 | +10 ft.'),
  ('monk', 6, '+4', 5, 5, 5, 'Bonus feat, slow fall 30 ft. | +3/+3 | 1d8 | +1 | +20 ft.'),
  ('monk', 7, '+5', 5, 5, 5, 'Wholeness of body | +4/+4 | 1d8 | +1 | +20 ft.'),
  ('monk', 8, '+6/+1', 6, 6, 6, 'Slow fall 40 ft. | +5/+5/+0 | 1d10 | +1 | +20 ft.'),
  ('monk', 9, '+6/+1', 6, 6, 6, 'Improved evasion | +6/+6/+1 | 1d10 | +1 | +30 ft.'),
  ('monk', 10, '+7/+2', 7, 7, 7, 'Ki strike (lawful), slow fall 50 ft. | +7/+7/+2 | 1d10 | +2 | +30 ft.'),
  ('monk', 11, '+8/+3', 7, 7, 7, 'Diamond body, greater flurry | +8/+8/+8/+3 | 1d10 | +2 | +30 ft.'),
  ('monk', 12, '+9/+4', 8, 8, 8, 'Abundant step, slow fall 60 ft. | +9/+9/+9/+4 | 2d6 | +2 | +40 ft.'),
  ('monk', 13, '+9/+4', 8, 8, 8, 'Diamond soul | +9/+9/+9/+4 | 2d6 | +2 | +40 ft.'),
  ('monk', 14, '+10/+5', 9, 9, 9, 'Slow fall 70 ft. | +10/+10/+10/+5 | 2d6 | +2 | +40 ft.'),
  ('monk', 15, '+11/+6/+1', 9, 9, 9, 'Quivering palm | +11/+11/+11/+6/+1 | 2d6 | +3 | +50 ft.'),
  ('monk', 16, '+12/+7/+2', 10, 10, 10, 'Ki strike (adamantine), slow fall 80 ft. | +12/+12/+12/+7/+2 | 2d8 | +3 | +50 ft.'),
  ('monk', 17, '+12/+7/+2', 10, 10, 10, 'Timeless body, tongue of the sun and moon | +12/+12/+12/+7/+2 | 2d8 | +3 | +50 ft.'),
  ('monk', 18, '+13/+8/+3', 11, 11, 11, 'Slow fall 90 ft. | +13/+13/+13/+8/+3 | 2d8 | +3 | +60 ft.'),
  ('monk', 19, '+14/+9/+4', 11, 11, 11, 'Empty body | +14/+14/+14/+9/+4 | 2d8 | +3 | +60 ft.'),
  ('monk', 20, '+15/+10/+5', 12, 12, 12, 'Perfect self, slow fall any distance | +15/+15/+15/+10/+5 | 2d10 | +4 | +60 ft.')
ON CONFLICT (class_slug, level) DO UPDATE
  SET base_attack_bonus = EXCLUDED.base_attack_bonus,
      fort_save = EXCLUDED.fort_save,
      ref_save = EXCLUDED.ref_save,
      will_save = EXCLUDED.will_save,
      special_abilities = EXCLUDED.special_abilities,
      updated_at = NOW();


-- Progresión de Paladín (20 niveles)
INSERT INTO public.class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities)
VALUES
  ('paladin', 1, '+1', 2, 0, 0, 'Aura of good, detect evil, smite evil 1/day | — | — | — | —'),
  ('paladin', 2, '+2', 3, 0, 0, 'Divine grace, lay on hands | — | — | — | —'),
  ('paladin', 3, '+3', 3, 1, 1, 'Aura of courage, divine health | — | — | — | —'),
  ('paladin', 4, '+4', 4, 1, 1, 'Turn undead | 0 | — | — | —'),
  ('paladin', 5, '+5', 4, 1, 1, 'Smite evil 2/day, special mount | 0 | — | — | —'),
  ('paladin', 6, '+6/+1', 5, 2, 2, 'Remove disease 1/week | 1 | — | — | —'),
  ('paladin', 7, '+7/+2', 5, 2, 2, ' | 1 | — | — | —'),
  ('paladin', 8, '+8/+3', 6, 2, 2, ' | 1 | 0 | — | —'),
  ('paladin', 9, '+9/+4', 6, 3, 3, 'Remove disease 2/week | 1 | 0 | — | —'),
  ('paladin', 10, '+10/+5', 7, 3, 3, 'Smite evil 3/day | 1 | 1 | — | —'),
  ('paladin', 11, '+11/+6/+1', 7, 3, 3, ' | 1 | 1 | 0 | —'),
  ('paladin', 12, '+12/+7/+2', 8, 4, 4, 'Remove disease 3/week | 1 | 1 | 1 | —'),
  ('paladin', 13, '+13/+8/+3', 8, 4, 4, ' | 1 | 1 | 1 | —'),
  ('paladin', 14, '+14/+9/+4', 9, 4, 4, ' | 2 | 1 | 1 | 0'),
  ('paladin', 15, '+15/+10/+5', 9, 5, 5, 'Remove disease 4/week, smite evil 4/day | 2 | 1 | 1 | 1'),
  ('paladin', 16, '+16/+11/+6/+1', 10, 5, 5, ' | 2 | 2 | 1 | 1'),
  ('paladin', 17, '+17/+12/+7/+2', 10, 5, 5, ' | 2 | 2 | 2 | 1'),
  ('paladin', 18, '+18/+13/+8/+3', 11, 6, 6, 'Remove disease 5/week | 3 | 2 | 2 | 1'),
  ('paladin', 19, '+19/+14/+9/+4', 11, 6, 6, ' | 3 | 3 | 3 | 2'),
  ('paladin', 20, '+20/+15/+10/+5', 12, 6, 6, 'Smite evil 5/day | 3 | 3 | 3 | 3')
ON CONFLICT (class_slug, level) DO UPDATE
  SET base_attack_bonus = EXCLUDED.base_attack_bonus,
      fort_save = EXCLUDED.fort_save,
      ref_save = EXCLUDED.ref_save,
      will_save = EXCLUDED.will_save,
      special_abilities = EXCLUDED.special_abilities,
      updated_at = NOW();


-- Progresión de Explorador (20 niveles)
INSERT INTO public.class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities)
VALUES
  ('ranger', 1, '+1', 2, 2, 0, '1st favored enemy, Track, wild empathy | — | — | — | —'),
  ('ranger', 2, '+2', 3, 3, 0, 'Combat style | — | — | — | —'),
  ('ranger', 3, '+3', 3, 3, 1, 'Endurance | — | — | — | —'),
  ('ranger', 4, '+4', 4, 4, 1, 'Animal companion | 0 | — | — | —'),
  ('ranger', 5, '+5', 4, 4, 1, '2nd favored enemy | 0 | — | — | —'),
  ('ranger', 6, '+6/+1', 5, 5, 2, 'Improved combat style | 1 | — | — | —'),
  ('ranger', 7, '+7/+2', 5, 5, 2, 'Woodland stride | 1 | — | — | —'),
  ('ranger', 8, '+8/+3', 6, 6, 2, 'Swift tracker | 1 | 0 | — | —'),
  ('ranger', 9, '+9/+4', 6, 6, 3, 'Evasion | 1 | 0 | — | —'),
  ('ranger', 10, '+10/+5', 7, 7, 3, '3rd favored enemy | 1 | 1 | — | —'),
  ('ranger', 11, '+11/+6/+1', 7, 7, 3, 'Combat style mastery | 1 | 1 | 0 | —'),
  ('ranger', 12, '+12/+7/+2', 8, 8, 4, ' | 1 | 1 | 1 | —'),
  ('ranger', 13, '+13/+8/+3', 8, 8, 4, 'Camouflage | 1 | 1 | 1 | —'),
  ('ranger', 14, '+14/+9/+4', 9, 9, 4, ' | 2 | 1 | 1 | 0'),
  ('ranger', 15, '+15/+10/+5', 9, 9, 5, '4th favored enemy | 2 | 1 | 1 | 1'),
  ('ranger', 16, '+16/+11/+6/+1', 10, 10, 5, ' | 2 | 2 | 1 | 1'),
  ('ranger', 17, '+17/+12/+7/+2', 10, 10, 5, 'Hide in plain sight | 2 | 2 | 2 | 1'),
  ('ranger', 18, '+18/+13/+8/+3', 11, 11, 6, ' | 3 | 2 | 2 | 1'),
  ('ranger', 19, '+19/+14/+9/+4', 11, 11, 6, ' | 3 | 3 | 3 | 2'),
  ('ranger', 20, '+20/+15/+10/+5', 12, 12, 6, '5th favored enemy | 3 | 3 | 3 | 3')
ON CONFLICT (class_slug, level) DO UPDATE
  SET base_attack_bonus = EXCLUDED.base_attack_bonus,
      fort_save = EXCLUDED.fort_save,
      ref_save = EXCLUDED.ref_save,
      will_save = EXCLUDED.will_save,
      special_abilities = EXCLUDED.special_abilities,
      updated_at = NOW();


-- Progresión de Pícaro (20 niveles)
INSERT INTO public.class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities)
VALUES
  ('rogue', 1, '+0', 0, 2, 0, 'Sneak attack +1d6, trapfinding'),
  ('rogue', 2, '+1', 0, 3, 0, 'Evasion'),
  ('rogue', 3, '+2', 1, 3, 1, 'Sneak attack +2d6, trap sense +1'),
  ('rogue', 4, '+3', 1, 4, 1, 'Uncanny dodge'),
  ('rogue', 5, '+3', 1, 4, 1, 'Sneak attack +3d6'),
  ('rogue', 6, '+4', 2, 5, 2, 'Trap sense +2'),
  ('rogue', 7, '+5', 2, 5, 2, 'Sneak attack +4d6'),
  ('rogue', 8, '+6/+1', 2, 6, 2, 'Improved uncanny dodge'),
  ('rogue', 9, '+6/+1', 3, 6, 3, 'Sneak attack +5d6, trap sense +3'),
  ('rogue', 10, '+7/+2', 3, 7, 3, 'Special ability'),
  ('rogue', 11, '+8/+3', 3, 7, 3, 'Sneak attack +6d6'),
  ('rogue', 12, '+9/+4', 4, 8, 4, 'Trap sense +4'),
  ('rogue', 13, '+9/+4', 4, 8, 4, 'Sneak attack +7d6, special ability'),
  ('rogue', 14, '+10/+5', 4, 9, 4, ''),
  ('rogue', 15, '+11/+6/+1', 5, 9, 5, 'Sneak attack +8d6, trap sense +5'),
  ('rogue', 16, '+12/+7/+2', 5, 10, 5, 'Special ability'),
  ('rogue', 17, '+12/+7/+2', 5, 10, 5, 'Sneak attack +9d6'),
  ('rogue', 18, '+13/+8/+3', 6, 11, 6, 'Trap sense +6'),
  ('rogue', 19, '+14/+9/+4', 6, 11, 6, 'Sneak attack +10d6, special ability'),
  ('rogue', 20, '+15/+10/+5', 6, 12, 6, '')
ON CONFLICT (class_slug, level) DO UPDATE
  SET base_attack_bonus = EXCLUDED.base_attack_bonus,
      fort_save = EXCLUDED.fort_save,
      ref_save = EXCLUDED.ref_save,
      will_save = EXCLUDED.will_save,
      special_abilities = EXCLUDED.special_abilities,
      updated_at = NOW();


-- Progresión de Hechicero (20 niveles)
INSERT INTO public.class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities)
VALUES
  ('sorcerer', 1, '+0', 0, 0, 2, 'Summonfamiliar | 5 | 3 | — | — | — | — | — | — | — | —'),
  ('sorcerer', 2, '+1', 0, 0, 3, ' | 6 | 4 | — | — | — | — | — | — | — | —'),
  ('sorcerer', 3, '+1', 1, 1, 3, ' | 6 | 5 | — | — | — | — | — | — | — | —'),
  ('sorcerer', 4, '+2', 1, 1, 4, ' | 6 | 6 | 3 | — | — | — | — | — | — | —'),
  ('sorcerer', 5, '+2', 1, 1, 4, ' | 6 | 6 | 4 | — | — | — | — | — | — | —'),
  ('sorcerer', 6, '+3', 2, 2, 5, ' | 6 | 6 | 5 | 3 | — | — | — | — | — | —'),
  ('sorcerer', 7, '+3', 2, 2, 5, ' | 6 | 6 | 6 | 4 | — | — | — | — | — | —'),
  ('sorcerer', 8, '+4', 2, 2, 6, ' | 6 | 6 | 6 | 5 | 3 | — | — | — | — | —'),
  ('sorcerer', 9, '+4', 3, 3, 6, ' | 6 | 6 | 6 | 6 | 4 | — | — | — | — | —'),
  ('sorcerer', 10, '+5', 3, 3, 7, ' | 6 | 6 | 6 | 6 | 5 | 3 | — | — | — | —'),
  ('sorcerer', 11, '+5', 3, 3, 7, ' | 6 | 6 | 6 | 6 | 6 | 4 | — | — | — | —'),
  ('sorcerer', 12, '+6/+1', 4, 4, 8, ' | 6 | 6 | 6 | 6 | 6 | 5 | 3 | — | — | —'),
  ('sorcerer', 13, '+6/+1', 4, 4, 8, ' | 6 | 6 | 6 | 6 | 6 | 6 | 4 | — | — | —'),
  ('sorcerer', 14, '+7/+2', 4, 4, 9, ' | 6 | 6 | 6 | 6 | 6 | 6 | 5 | 3 | — | —'),
  ('sorcerer', 15, '+7/+2', 5, 5, 9, ' | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 4 | — | —'),
  ('sorcerer', 16, '+8/+3', 5, 5, 10, ' | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 5 | 3 | —'),
  ('sorcerer', 17, '+8/+3', 5, 5, 10, ' | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 4 | —'),
  ('sorcerer', 18, '+9/+4', 6, 6, 11, ' | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 5 | 3'),
  ('sorcerer', 19, '+9/+4', 6, 6, 11, ' | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 4'),
  ('sorcerer', 20, '+10/+5', 6, 6, 12, ' | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6')
ON CONFLICT (class_slug, level) DO UPDATE
  SET base_attack_bonus = EXCLUDED.base_attack_bonus,
      fort_save = EXCLUDED.fort_save,
      ref_save = EXCLUDED.ref_save,
      will_save = EXCLUDED.will_save,
      special_abilities = EXCLUDED.special_abilities,
      updated_at = NOW();


-- Progresión de Mago (20 niveles)
INSERT INTO public.class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities)
VALUES
  ('wizard', 1, '+0', 0, 0, 2, 'Summonfamiliar | 5 | 3 | — | — | — | — | — | — | — | —'),
  ('wizard', 2, '+1', 0, 0, 3, ' | 6 | 4 | — | — | — | — | — | — | — | —'),
  ('wizard', 3, '+1', 1, 1, 3, ' | 6 | 5 | — | — | — | — | — | — | — | —'),
  ('wizard', 4, '+2', 1, 1, 4, ' | 6 | 6 | 3 | — | — | — | — | — | — | —'),
  ('wizard', 5, '+2', 1, 1, 4, ' | 6 | 6 | 4 | — | — | — | — | — | — | —'),
  ('wizard', 6, '+3', 2, 2, 5, ' | 6 | 6 | 5 | 3 | — | — | — | — | — | —'),
  ('wizard', 7, '+3', 2, 2, 5, ' | 6 | 6 | 6 | 4 | — | — | — | — | — | —'),
  ('wizard', 8, '+4', 2, 2, 6, ' | 6 | 6 | 6 | 5 | 3 | — | — | — | — | —'),
  ('wizard', 9, '+4', 3, 3, 6, ' | 6 | 6 | 6 | 6 | 4 | — | — | — | — | —'),
  ('wizard', 10, '+5', 3, 3, 7, ' | 6 | 6 | 6 | 6 | 5 | 3 | — | — | — | —'),
  ('wizard', 11, '+5', 3, 3, 7, ' | 6 | 6 | 6 | 6 | 6 | 4 | — | — | — | —'),
  ('wizard', 12, '+6/+1', 4, 4, 8, ' | 6 | 6 | 6 | 6 | 6 | 5 | 3 | — | — | —'),
  ('wizard', 13, '+6/+1', 4, 4, 8, ' | 6 | 6 | 6 | 6 | 6 | 6 | 4 | — | — | —'),
  ('wizard', 14, '+7/+2', 4, 4, 9, ' | 6 | 6 | 6 | 6 | 6 | 6 | 5 | 3 | — | —'),
  ('wizard', 15, '+7/+2', 5, 5, 9, ' | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 4 | — | —'),
  ('wizard', 16, '+8/+3', 5, 5, 10, ' | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 5 | 3 | —'),
  ('wizard', 17, '+8/+3', 5, 5, 10, ' | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 4 | —'),
  ('wizard', 18, '+9/+4', 6, 6, 11, ' | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 5 | 3'),
  ('wizard', 19, '+9/+4', 6, 6, 11, ' | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 4'),
  ('wizard', 20, '+10/+5', 6, 6, 12, ' | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6')
ON CONFLICT (class_slug, level) DO UPDATE
  SET base_attack_bonus = EXCLUDED.base_attack_bonus,
      fort_save = EXCLUDED.fort_save,
      ref_save = EXCLUDED.ref_save,
      will_save = EXCLUDED.will_save,
      special_abilities = EXCLUDED.special_abilities,
      updated_at = NOW();
