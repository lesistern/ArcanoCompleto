-- PARTE 2: RELACIONES SPELL_CLASS_LEVELS
-- ============================================================================
-- Relaciona cada conjuro con las clases que pueden lanzarlo
-- ============================================================================

-- Acid Arrow - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'acid-arrow'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'acid-arrow')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'acid-arrow'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'acid-arrow')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Acid Fog - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'acid-fog'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'acid-fog')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'acid-fog'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'acid-fog')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Acid Splash - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'acid-splash'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'acid-splash')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'acid-splash'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'acid-splash')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Aid - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'aid'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'aid')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Air Walk - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'air-walk'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'air-walk')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'air-walk'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'air-walk')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Alarm - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'alarm'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'alarm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'alarm'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'alarm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'alarm'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'alarm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'alarm'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'alarm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Align Weapon - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'align-weapon'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'align-weapon')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Alter Self - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'alter-self'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'alter-self')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'alter-self'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'alter-self')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'alter-self'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'alter-self')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Analyze Dweomer - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'analyze-dweomer'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'analyze-dweomer')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'analyze-dweomer'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'analyze-dweomer')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'analyze-dweomer'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'analyze-dweomer')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Animal Growth - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animal-growth'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animal-growth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animal-growth'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animal-growth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animal-growth'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animal-growth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animal-growth'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animal-growth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Animal Messenger - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animal-messenger'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animal-messenger')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animal-messenger'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animal-messenger')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animal-messenger'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animal-messenger')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Animal Shapes - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animal-shapes'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animal-shapes')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Animal Trance - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animal-trance'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animal-trance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animal-trance'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animal-trance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Animate Dead - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animate-dead'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animate-dead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animate-dead'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animate-dead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animate-dead'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animate-dead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Animate Objects - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animate-objects'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animate-objects')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animate-objects'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animate-objects')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Animate Plants - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animate-plants'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animate-plants')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Animate Rope - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animate-rope'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animate-rope')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animate-rope'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animate-rope')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'animate-rope'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'animate-rope')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Antilife Shell - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'antilife-shell'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'antilife-shell')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'antilife-shell'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'antilife-shell')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Antimagic Field - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'antimagic-field'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'antimagic-field')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'antimagic-field'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'antimagic-field')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'antimagic-field'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'antimagic-field')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Antipathy - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'antipathy'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'antipathy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'antipathy'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'antipathy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'antipathy'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'antipathy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Antiplant Shell - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'antiplant-shell'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'antiplant-shell')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Arcane Eye - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'arcane-eye'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'arcane-eye')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'arcane-eye'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'arcane-eye')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Arcane Lock - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'arcane-lock'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'arcane-lock')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'arcane-lock'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'arcane-lock')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Arcane Mark - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'arcane-mark'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'arcane-mark')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'arcane-mark'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'arcane-mark')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Arcane Sight - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'arcane-sight'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'arcane-sight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'arcane-sight'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'arcane-sight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Arcane Sight, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'arcane-sight-greater'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'arcane-sight-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'arcane-sight-greater'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'arcane-sight-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Astral Projection - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'astral-projection'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'astral-projection')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'astral-projection'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'astral-projection')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'astral-projection'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'astral-projection')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Atonement - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'atonement'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'atonement')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'atonement'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'atonement')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Augury - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'augury'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'augury')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Awaken - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'awaken'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'awaken')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Baleful Polymorph - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'baleful-polymorph'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'baleful-polymorph')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'baleful-polymorph'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'baleful-polymorph')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'baleful-polymorph'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'baleful-polymorph')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Bane - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bane'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bane')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Banishment - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'banishment'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'banishment')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'banishment'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'banishment')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'banishment'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'banishment')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Barkskin - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'barkskin'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'barkskin')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'barkskin'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'barkskin')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Bear’s Endurance - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bear-s-endurance'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bear-s-endurance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bear-s-endurance'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bear-s-endurance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bear-s-endurance'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bear-s-endurance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bear-s-endurance'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bear-s-endurance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bear-s-endurance'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bear-s-endurance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Bear’s Endurance, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bear-s-endurance-mass'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bear-s-endurance-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bear-s-endurance-mass'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bear-s-endurance-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bear-s-endurance-mass'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bear-s-endurance-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bear-s-endurance-mass'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bear-s-endurance-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Bestow Curse - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bestow-curse'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bestow-curse')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bestow-curse'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bestow-curse')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bestow-curse'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bestow-curse')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Binding - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'binding'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'binding')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'binding'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'binding')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Black Tentacles - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'black-tentacles'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'black-tentacles')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'black-tentacles'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'black-tentacles')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Blade Barrier - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blade-barrier'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blade-barrier')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Blasphemy - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blasphemy'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blasphemy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Bless - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bless'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bless')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bless'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bless')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Bless Water - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bless-water'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bless-water')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bless-water'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bless-water')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Bless Weapon - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bless-weapon'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bless-weapon')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Blight - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blight'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blight'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blight'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Blindness/Deafness - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blindness-deafness'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blindness-deafness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blindness-deafness'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blindness-deafness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blindness-deafness'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blindness-deafness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blindness-deafness'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blindness-deafness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Blink - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blink'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blink')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blink'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blink')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blink'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blink')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Blur - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blur'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blur')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blur'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blur')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'blur'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'blur')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Break Enchantment - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'break-enchantment'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'break-enchantment')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'break-enchantment'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'break-enchantment')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'break-enchantment'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'break-enchantment')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'break-enchantment'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'break-enchantment')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'break-enchantment'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'break-enchantment')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Bull’s Strength - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bull-s-strength'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bull-s-strength')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bull-s-strength'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bull-s-strength')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bull-s-strength'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bull-s-strength')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bull-s-strength'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bull-s-strength')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bull-s-strength'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bull-s-strength')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Bull’s Strength, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bull-s-strength-mass'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bull-s-strength-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bull-s-strength-mass'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bull-s-strength-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bull-s-strength-mass'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bull-s-strength-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'bull-s-strength-mass'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'bull-s-strength-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Burning Hands - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'burning-hands'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'burning-hands')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'burning-hands'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'burning-hands')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Call Lightning - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'call-lightning'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'call-lightning')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Call Lightning Storm - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'call-lightning-storm'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'call-lightning-storm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Calm Animals - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'calm-animals'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'calm-animals')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'calm-animals'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'calm-animals')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Calm Emotions - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'calm-emotions'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'calm-emotions')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'calm-emotions'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'calm-emotions')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cat’s Grace - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cat-s-grace'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cat-s-grace')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cat-s-grace'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cat-s-grace')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cat-s-grace'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cat-s-grace')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cat-s-grace'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cat-s-grace')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cat-s-grace'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cat-s-grace')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cat’s Grace, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cat-s-grace-mass'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cat-s-grace-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cat-s-grace-mass'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cat-s-grace-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cat-s-grace-mass'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cat-s-grace-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cat-s-grace-mass'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cat-s-grace-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cause Fear - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cause-fear'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cause-fear')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cause-fear'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cause-fear')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cause-fear'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cause-fear')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cause-fear'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cause-fear')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Chain Lightning - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'chain-lightning'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'chain-lightning')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'chain-lightning'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'chain-lightning')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Changestaff - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'changestaff'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'changestaff')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Charm Animal - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'charm-animal'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'charm-animal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'charm-animal'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'charm-animal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Charm Monster - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'charm-monster'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'charm-monster')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'charm-monster'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'charm-monster')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'charm-monster'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'charm-monster')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Charm Monster, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'charm-monster-mass'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'charm-monster-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'charm-monster-mass'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'charm-monster-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'charm-monster-mass'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'charm-monster-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Charm Person - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'charm-person'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'charm-person')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'charm-person'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'charm-person')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'charm-person'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'charm-person')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Chill Metal - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'chill-metal'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'chill-metal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Chill Touch - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'chill-touch'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'chill-touch')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'chill-touch'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'chill-touch')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Circle of Death - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'circle-of-death'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'circle-of-death')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'circle-of-death'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'circle-of-death')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Clairaudience/Clairvoyance - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'clairaudience-clairvoyance'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'clairaudience-clairvoyance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'clairaudience-clairvoyance'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'clairaudience-clairvoyance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'clairaudience-clairvoyance'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'clairaudience-clairvoyance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Clenched Fist - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'clenched-fist'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'clenched-fist')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'clenched-fist'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'clenched-fist')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cloak of Chaos - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cloak-of-chaos'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cloak-of-chaos')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Clone - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'clone'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'clone')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'clone'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'clone')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cloudkill - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cloudkill'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cloudkill')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cloudkill'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cloudkill')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Color Spray - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'color-spray'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'color-spray')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'color-spray'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'color-spray')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Command - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'command'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'command')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Command, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'command-greater'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'command-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Command Plants - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'command-plants'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'command-plants')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'command-plants'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'command-plants')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Command Undead - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'command-undead'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'command-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'command-undead'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'command-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Commune - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'commune'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'commune')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Commune with Nature - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'commune-with-nature'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'commune-with-nature')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'commune-with-nature'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'commune-with-nature')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Comprehend Languages - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'comprehend-languages'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'comprehend-languages')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'comprehend-languages'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'comprehend-languages')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'comprehend-languages'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'comprehend-languages')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'comprehend-languages'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'comprehend-languages')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cone of Cold - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cone-of-cold'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cone-of-cold')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cone-of-cold'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cone-of-cold')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Confusion - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'confusion'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'confusion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'confusion'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'confusion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'confusion'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'confusion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Confusion, Lesser - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'confusion-lesser'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'confusion-lesser')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Consecrate - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'consecrate'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'consecrate')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Contact Other Plane - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'contact-other-plane'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'contact-other-plane')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'contact-other-plane'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'contact-other-plane')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Contagion - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'contagion'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'contagion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'contagion'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'contagion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'contagion'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'contagion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'contagion'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'contagion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Contingency - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'contingency'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'contingency')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'contingency'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'contingency')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Continual Flame - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'continual-flame'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'continual-flame')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'continual-flame'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'continual-flame')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'continual-flame'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'continual-flame')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Control Plants - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'control-plants'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'control-plants')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Control Undead - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'control-undead'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'control-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'control-undead'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'control-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Control Water - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'control-water'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'control-water')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'control-water'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'control-water')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'control-water'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'control-water')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'control-water'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'control-water')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Control Weather - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'control-weather'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'control-weather')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'control-weather'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'control-weather')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'control-weather'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'control-weather')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'control-weather'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'control-weather')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Control Winds - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'control-winds'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'control-winds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Create Food and Water - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'create-food-and-water'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'create-food-and-water')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Create Greater Undead - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'create-greater-undead'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'create-greater-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'create-greater-undead'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'create-greater-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'create-greater-undead'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'create-greater-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Create Undead - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'create-undead'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'create-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'create-undead'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'create-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'create-undead'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'create-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Create Water - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'create-water'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'create-water')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'create-water'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'create-water')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'create-water'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'create-water')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Creeping Doom - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'creeping-doom'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'creeping-doom')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Crushing Despair - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'crushing-despair'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'crushing-despair')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'crushing-despair'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'crushing-despair')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'crushing-despair'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'crushing-despair')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Crushing Hand - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'crushing-hand'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'crushing-hand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'crushing-hand'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'crushing-hand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cure Critical Wounds - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-critical-wounds'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-critical-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-critical-wounds'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-critical-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-critical-wounds'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-critical-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cure Critical Wounds, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-critical-wounds-mass'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-critical-wounds-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-critical-wounds-mass'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-critical-wounds-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cure Light Wounds - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-light-wounds'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-light-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-light-wounds'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-light-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-light-wounds'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-light-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-light-wounds'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-light-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-light-wounds'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-light-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cure Light Wounds, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-light-wounds-mass'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-light-wounds-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-light-wounds-mass'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-light-wounds-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-light-wounds-mass'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-light-wounds-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cure Minor Wounds - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-minor-wounds'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-minor-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-minor-wounds'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-minor-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cure Moderate Wounds - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-moderate-wounds'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-moderate-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-moderate-wounds'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-moderate-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-moderate-wounds'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-moderate-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-moderate-wounds'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-moderate-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-moderate-wounds'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-moderate-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cure Moderate Wounds, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-moderate-wounds-mass'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-moderate-wounds-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-moderate-wounds-mass'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-moderate-wounds-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-moderate-wounds-mass'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-moderate-wounds-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cure Serious Wounds - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-serious-wounds'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-serious-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-serious-wounds'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-serious-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-serious-wounds'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-serious-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-serious-wounds'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-serious-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-serious-wounds'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-serious-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Cure Serious Wounds, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-serious-wounds-mass'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-serious-wounds-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'cure-serious-wounds-mass'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'cure-serious-wounds-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Curse Water - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'curse-water'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'curse-water')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dancing Lights - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dancing-lights'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dancing-lights')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dancing-lights'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dancing-lights')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dancing-lights'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dancing-lights')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Darkness - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'darkness'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'darkness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'darkness'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'darkness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'darkness'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'darkness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'darkness'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'darkness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Darkvision - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'darkvision'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'darkvision')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'darkvision'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'darkvision')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'darkvision'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'darkvision')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Daylight - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'daylight'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'daylight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'daylight'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'daylight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'daylight'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'daylight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'daylight'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'daylight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'daylight'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'daylight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'daylight'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'daylight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Daze - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'daze'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'daze')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'daze'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'daze')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'daze'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'daze')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Daze Monster - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'daze-monster'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'daze-monster')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'daze-monster'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'daze-monster')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'daze-monster'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'daze-monster')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Death Knell - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'death-knell'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'death-knell')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Death Ward - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'death-ward'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'death-ward')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'death-ward'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'death-ward')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'death-ward'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'death-ward')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Deathwatch - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'deathwatch'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'deathwatch')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Deeper Darkness - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'deeper-darkness'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'deeper-darkness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Deep Slumber - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'deep-slumber'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'deep-slumber')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'deep-slumber'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'deep-slumber')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'deep-slumber'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'deep-slumber')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Delayed Blast Fireball - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'delayed-blast-fireball'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'delayed-blast-fireball')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'delayed-blast-fireball'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'delayed-blast-fireball')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Delay Poison - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'delay-poison'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'delay-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'delay-poison'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'delay-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'delay-poison'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'delay-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'delay-poison'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'delay-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'delay-poison'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'delay-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Demand - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'demand'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'demand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'demand'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'demand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Desecrate - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'desecrate'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'desecrate')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Destruction - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'destruction'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'destruction')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Detect Animals or Plants - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-animals-or-plants'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-animals-or-plants')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-animals-or-plants'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-animals-or-plants')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Detect Chaos - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-chaos'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-chaos')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Detect Evil - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-evil'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-evil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Detect Good - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-good'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-good')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Detect Law - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-law'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-law')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Detect Magic - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-magic'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-magic'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-magic'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-magic'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-magic'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Detect Poison - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-poison'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-poison'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-poison'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-poison'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-poison'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-poison'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Detect Scrying - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-scrying'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-scrying')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-scrying'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-scrying')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-scrying'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-scrying')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Detect Secret Doors - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-secret-doors'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-secret-doors')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-secret-doors'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-secret-doors')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-secret-doors'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-secret-doors')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Detect Snares and Pits - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-snares-and-pits'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-snares-and-pits')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-snares-and-pits'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-snares-and-pits')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Detect Thoughts - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-thoughts'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-thoughts')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-thoughts'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-thoughts')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-thoughts'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-thoughts')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Detect Undead - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-undead'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-undead'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-undead'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'detect-undead'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'detect-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dictum - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dictum'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dictum')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dimensional Anchor - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dimensional-anchor'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dimensional-anchor')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dimensional-anchor'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dimensional-anchor')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dimensional-anchor'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dimensional-anchor')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dimensional Lock - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dimensional-lock'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dimensional-lock')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dimensional-lock'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dimensional-lock')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dimensional-lock'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dimensional-lock')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dimension Door - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dimension-door'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dimension-door')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dimension-door'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dimension-door')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dimension-door'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dimension-door')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Diminish Plants - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'diminish-plants'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'diminish-plants')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'diminish-plants'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'diminish-plants')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Discern Lies - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'discern-lies'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'discern-lies')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'discern-lies'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'discern-lies')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Discern Location - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'discern-location'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'discern-location')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'discern-location'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'discern-location')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'discern-location'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'discern-location')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Disguise Self - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'disguise-self'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'disguise-self')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'disguise-self'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'disguise-self')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'disguise-self'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'disguise-self')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Disintegrate - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'disintegrate'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'disintegrate')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'disintegrate'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'disintegrate')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dismissal - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dismissal'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dismissal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dismissal'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dismissal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dismissal'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dismissal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dispel Chaos - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-chaos'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-chaos')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-chaos'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-chaos')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dispel Evil - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-evil'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-evil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-evil'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-evil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dispel Good - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-good'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-good')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dispel Law - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-law'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-law')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dispel Magic - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-magic'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-magic'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-magic'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-magic'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-magic'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-magic'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dispel Magic, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-magic-greater'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-magic-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-magic-greater'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-magic-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-magic-greater'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-magic-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-magic-greater'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-magic-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dispel-magic-greater'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dispel-magic-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Displacement - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'displacement'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'displacement')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'displacement'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'displacement')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'displacement'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'displacement')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Disrupting Weapon - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'disrupting-weapon'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'disrupting-weapon')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Disrupt Undead - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'disrupt-undead'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'disrupt-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'disrupt-undead'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'disrupt-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Divination - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'divination'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'divination')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Divine Favor - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'divine-favor'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'divine-favor')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'divine-favor'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'divine-favor')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Divine Power - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'divine-power'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'divine-power')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dominate Animal - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dominate-animal'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dominate-animal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dominate Monster - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dominate-monster'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dominate-monster')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dominate-monster'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dominate-monster')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dominate Person - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dominate-person'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dominate-person')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dominate-person'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dominate-person')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dominate-person'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dominate-person')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Doom - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'doom'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'doom')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Dream - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dream'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dream')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dream'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dream')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'dream'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'dream')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Eagle’s Splendor - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'eagle-s-splendor'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'eagle-s-splendor')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'eagle-s-splendor'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'eagle-s-splendor')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'eagle-s-splendor'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'eagle-s-splendor')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'eagle-s-splendor'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'eagle-s-splendor')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'eagle-s-splendor'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'eagle-s-splendor')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Eagle’s Splendor, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'eagle-s-splendor-mass'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'eagle-s-splendor-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'eagle-s-splendor-mass'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'eagle-s-splendor-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'eagle-s-splendor-mass'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'eagle-s-splendor-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'eagle-s-splendor-mass'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'eagle-s-splendor-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Earthquake - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'earthquake'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'earthquake')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'earthquake'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'earthquake')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Elemental Swarm - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'elemental-swarm'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'elemental-swarm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Endure Elements - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'endure-elements'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'endure-elements')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'endure-elements'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'endure-elements')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'endure-elements'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'endure-elements')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'endure-elements'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'endure-elements')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'endure-elements'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'endure-elements')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'endure-elements'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'endure-elements')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Energy Drain - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'energy-drain'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'energy-drain')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'energy-drain'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'energy-drain')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'energy-drain'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'energy-drain')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Enervation - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'enervation'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'enervation')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'enervation'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'enervation')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Enlarge Person - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'enlarge-person'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'enlarge-person')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'enlarge-person'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'enlarge-person')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Enlarge Person, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'enlarge-person-mass'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'enlarge-person-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'enlarge-person-mass'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'enlarge-person-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Entangle - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'entangle'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'entangle')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'entangle'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'entangle')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Enthrall - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'enthrall'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'enthrall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'enthrall'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'enthrall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Entropic Shield - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'entropic-shield'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'entropic-shield')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Erase - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'erase'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'erase')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'erase'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'erase')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'erase'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'erase')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Ethereal Jaunt - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ethereal-jaunt'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ethereal-jaunt')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ethereal-jaunt'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ethereal-jaunt')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ethereal-jaunt'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ethereal-jaunt')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Etherealness - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'etherealness'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'etherealness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'etherealness'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'etherealness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'etherealness'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'etherealness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Expeditious Retreat - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'expeditious-retreat'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'expeditious-retreat')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'expeditious-retreat'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'expeditious-retreat')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'expeditious-retreat'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'expeditious-retreat')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Explosive Runes - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'explosive-runes'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'explosive-runes')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'explosive-runes'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'explosive-runes')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Eyebite - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'eyebite'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'eyebite')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'eyebite'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'eyebite')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'eyebite'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'eyebite')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Fabricate - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fabricate'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fabricate')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fabricate'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fabricate')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Faerie Fire - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'faerie-fire'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'faerie-fire')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- False Life - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'false-life'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'false-life')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'false-life'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'false-life')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- False Vision - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'false-vision'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'false-vision')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'false-vision'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'false-vision')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'false-vision'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'false-vision')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Fear - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fear'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fear')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fear'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fear')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fear'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fear')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Feather Fall - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'feather-fall'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'feather-fall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'feather-fall'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'feather-fall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'feather-fall'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'feather-fall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Feeblemind - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'feeblemind'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'feeblemind')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'feeblemind'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'feeblemind')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Find the Path - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'find-the-path'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'find-the-path')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'find-the-path'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'find-the-path')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'find-the-path'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'find-the-path')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Find Traps - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'find-traps'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),ON CONFLICT (spell_id, class_id) DO NOTHING;
