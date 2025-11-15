  (SELECT id FROM spells WHERE slug = 'protection-from-evil'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-evil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Protection from Good - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-good'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-good')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-good'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-good')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-good'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-good')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Protection from Law - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-law'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-law')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-law'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-law')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-law'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-law')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Protection from Spells - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-spells'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-spells')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-spells'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-spells')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Prying Eyes - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prying-eyes'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prying-eyes')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prying-eyes'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prying-eyes')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Prying Eyes, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prying-eyes-greater'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prying-eyes-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prying-eyes-greater'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prying-eyes-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Purify Food and Drink - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'purify-food-and-drink'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'purify-food-and-drink')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'purify-food-and-drink'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'purify-food-and-drink')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Pyrotechnics - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'pyrotechnics'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'pyrotechnics')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'pyrotechnics'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'pyrotechnics')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'pyrotechnics'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'pyrotechnics')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Quench - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'quench'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'quench')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Rage - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'rage'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'rage')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'rage'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'rage')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'rage'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'rage')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Rainbow Pattern - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'rainbow-pattern'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'rainbow-pattern')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'rainbow-pattern'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'rainbow-pattern')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'rainbow-pattern'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'rainbow-pattern')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Raise Dead - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'raise-dead'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'raise-dead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Ray of Enfeeblement - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ray-of-enfeeblement'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ray-of-enfeeblement')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ray-of-enfeeblement'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ray-of-enfeeblement')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Ray of Exhaustion - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ray-of-exhaustion'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ray-of-exhaustion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ray-of-exhaustion'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ray-of-exhaustion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Ray of Frost - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ray-of-frost'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ray-of-frost')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ray-of-frost'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ray-of-frost')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Read Magic - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'read-magic'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'read-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'read-magic'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'read-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'read-magic'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'read-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'read-magic'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'read-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'read-magic'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'read-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'read-magic'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'read-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'read-magic'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'read-magic')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Reduce Animal - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'reduce-animal'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'reduce-animal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'reduce-animal'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'reduce-animal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Reduce Person - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'reduce-person'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'reduce-person')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'reduce-person'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'reduce-person')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Reduce Person, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'reduce-person-mass'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'reduce-person-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'reduce-person-mass'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'reduce-person-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Refuge - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'refuge'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'refuge')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'refuge'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'refuge')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'refuge'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'refuge')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Regenerate - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'regenerate'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'regenerate')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'regenerate'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'regenerate')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Reincarnate - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'reincarnate'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'reincarnate')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Remove Blindness/Deafness - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'remove-blindness-deafness'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'remove-blindness-deafness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'remove-blindness-deafness'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'remove-blindness-deafness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Remove Curse - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'remove-curse'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'remove-curse')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'remove-curse'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'remove-curse')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'remove-curse'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'remove-curse')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'remove-curse'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'remove-curse')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'remove-curse'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'remove-curse')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Remove Disease - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'remove-disease'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'remove-disease')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'remove-disease'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'remove-disease')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'remove-disease'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'remove-disease')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Remove Fear - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'remove-fear'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'remove-fear')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'remove-fear'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'remove-fear')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Remove Paralysis - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'remove-paralysis'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'remove-paralysis')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'remove-paralysis'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'remove-paralysis')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Repel Metal or Stone - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'repel-metal-or-stone'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'repel-metal-or-stone')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Repel Vermin - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'repel-vermin'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'repel-vermin')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'repel-vermin'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'repel-vermin')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'repel-vermin'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'repel-vermin')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'repel-vermin'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'repel-vermin')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Repel Wood - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'repel-wood'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'repel-wood')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Repulsion - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'repulsion'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'repulsion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'repulsion'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'repulsion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'repulsion'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'repulsion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Resilient Sphere - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resilient-sphere'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resilient-sphere')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resilient-sphere'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resilient-sphere')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Resistance - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resistance'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resistance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resistance'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resistance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resistance'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resistance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resistance'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resistance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resistance'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resistance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resistance'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resistance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Resist Energy - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resist-energy'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resist-energy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resist-energy'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resist-energy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resist-energy'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resist-energy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resist-energy'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resist-energy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resist-energy'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resist-energy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resist-energy'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resist-energy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Restoration - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'restoration'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'restoration')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'restoration'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'restoration')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Restoration, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'restoration-greater'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'restoration-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Restoration, Lesser - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'restoration-lesser'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'restoration-lesser')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'restoration-lesser'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'restoration-lesser')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'restoration-lesser'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'restoration-lesser')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Resurrection - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'resurrection'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'resurrection')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Reverse Gravity - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'reverse-gravity'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'reverse-gravity')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'reverse-gravity'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'reverse-gravity')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'reverse-gravity'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'reverse-gravity')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Righteous Might - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'righteous-might'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'righteous-might')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Rope Trick - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'rope-trick'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'rope-trick')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'rope-trick'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'rope-trick')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Rusting Grasp - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'rusting-grasp'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'rusting-grasp')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Sanctuary - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sanctuary'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sanctuary')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Scare - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scare'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scare')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scare'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scare')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scare'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scare')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Scintillating Pattern - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scintillating-pattern'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scintillating-pattern')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scintillating-pattern'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scintillating-pattern')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Scorching Ray - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scorching-ray'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scorching-ray')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scorching-ray'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scorching-ray')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Screen - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'screen'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'screen')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'screen'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'screen')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Scrying - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scrying'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scrying')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scrying'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scrying')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scrying'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scrying')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scrying'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scrying')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scrying'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scrying')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Scrying, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scrying-greater'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scrying-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scrying-greater'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scrying-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scrying-greater'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scrying-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scrying-greater'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scrying-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'scrying-greater'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'scrying-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Sculpt Sound - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sculpt-sound'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sculpt-sound')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Searing Light - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'searing-light'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'searing-light')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Secret Chest - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'secret-chest'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'secret-chest')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'secret-chest'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'secret-chest')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Secret Page - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'secret-page'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'secret-page')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'secret-page'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'secret-page')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'secret-page'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'secret-page')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Secure Shelter - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'secure-shelter'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'secure-shelter')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'secure-shelter'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'secure-shelter')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'secure-shelter'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'secure-shelter')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- See Invisibility - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'see-invisibility'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'see-invisibility')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'see-invisibility'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'see-invisibility')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'see-invisibility'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'see-invisibility')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Seeming - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'seeming'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'seeming')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'seeming'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'seeming')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'seeming'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'seeming')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Sending - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sending'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sending')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sending'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sending')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sending'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sending')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Sepia Snake Sigil - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sepia-snake-sigil'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sepia-snake-sigil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sepia-snake-sigil'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sepia-snake-sigil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sepia-snake-sigil'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sepia-snake-sigil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Sequester - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sequester'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sequester')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sequester'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sequester')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shades - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shades'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shades')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shades'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shades')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shadow Conjuration - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shadow-conjuration'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shadow-conjuration')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shadow-conjuration'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shadow-conjuration')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shadow-conjuration'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shadow-conjuration')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shadow Conjuration, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shadow-conjuration-greater'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shadow-conjuration-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shadow-conjuration-greater'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shadow-conjuration-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shadow Evocation - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shadow-evocation'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shadow-evocation')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shadow-evocation'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shadow-evocation')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shadow-evocation'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shadow-evocation')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shadow Evocation, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shadow-evocation-greater'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shadow-evocation-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shadow-evocation-greater'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shadow-evocation-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shadow Walk - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shadow-walk'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shadow-walk')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shadow-walk'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shadow-walk')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shadow-walk'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shadow-walk')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shambler - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shambler'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shambler')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shapechange - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shapechange'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shapechange')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shapechange'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shapechange')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shapechange'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shapechange')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shatter - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shatter'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shatter')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shatter'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shatter')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shatter'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shatter')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shatter'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shatter')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shield - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shield'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shield')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shield'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shield')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shield of Faith - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shield-of-faith'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shield-of-faith')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shield of Law - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shield-of-law'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shield-of-law')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shield Other - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shield-other'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shield-other')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shield-other'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shield-other')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shillelagh - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shillelagh'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shillelagh')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shocking Grasp - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shocking-grasp'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shocking-grasp')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shocking-grasp'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shocking-grasp')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shout - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shout'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shout')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shout'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shout')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shout'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shout')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shout, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shout-greater'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shout-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shout-greater'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shout-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shout-greater'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shout-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Shrink Item - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shrink-item'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shrink-item')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'shrink-item'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'shrink-item')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Silence - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'silence'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'silence')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'silence'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'silence')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Silent Image - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'silent-image'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'silent-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'silent-image'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'silent-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'silent-image'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'silent-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Simulacrum - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'simulacrum'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'simulacrum')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'simulacrum'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'simulacrum')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Slay Living - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'slay-living'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'slay-living')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Sleep - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sleep'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sleep')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sleep'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sleep')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sleep'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sleep')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Sleet Storm - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sleet-storm'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sleet-storm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sleet-storm'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sleet-storm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sleet-storm'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sleet-storm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Slow - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'slow'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'slow')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'slow'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'slow')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'slow'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'slow')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Snare - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'snare'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'snare')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'snare'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'snare')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Soften Earth and Stone - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'soften-earth-and-stone'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'soften-earth-and-stone')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Solid Fog - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'solid-fog'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'solid-fog')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'solid-fog'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'solid-fog')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Song of Discord - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'song-of-discord'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'song-of-discord')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Soul Bind - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'soul-bind'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'soul-bind')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'soul-bind'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'soul-bind')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'soul-bind'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'soul-bind')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Sound Burst - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sound-burst'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sound-burst')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sound-burst'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sound-burst')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Speak with Animals - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'speak-with-animals'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'speak-with-animals')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'speak-with-animals'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'speak-with-animals')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'speak-with-animals'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'speak-with-animals')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Speak with Dead - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'speak-with-dead'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'speak-with-dead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Speak with Plants - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'speak-with-plants'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'speak-with-plants')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'speak-with-plants'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'speak-with-plants')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'speak-with-plants'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'speak-with-plants')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Spectral Hand - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spectral-hand'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spectral-hand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spectral-hand'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spectral-hand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Spell Immunity - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spell-immunity'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spell-immunity')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Spell Immunity, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spell-immunity-greater'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spell-immunity-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Spell Resistance - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spell-resistance'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spell-resistance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Spellstaff - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spellstaff'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spellstaff')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Spell Turning - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spell-turning'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spell-turning')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spell-turning'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spell-turning')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Spider Climb - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spider-climb'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spider-climb')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spider-climb'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spider-climb')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spider-climb'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spider-climb')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Spike Growth - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spike-growth'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spike-growth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spike-growth'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spike-growth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Spike Stones - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spike-stones'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spike-stones')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Spiritual Weapon - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'spiritual-weapon'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'spiritual-weapon')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Statue - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'statue'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'statue')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'statue'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'statue')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Status - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'status'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'status')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Stinking Cloud - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'stinking-cloud'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'stinking-cloud')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'stinking-cloud'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'stinking-cloud')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Stone Shape - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'stone-shape'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'stone-shape')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'stone-shape'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'stone-shape')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'stone-shape'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'stone-shape')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'stone-shape'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'stone-shape')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Stoneskin - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'stoneskin'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'stoneskin')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'stoneskin'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'stoneskin')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'stoneskin'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'stoneskin')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Stone Tell - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'stone-tell'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'stone-tell')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Stone to Flesh - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'stone-to-flesh'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'stone-to-flesh')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'stone-to-flesh'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'stone-to-flesh')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Storm of Vengeance - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'storm-of-vengeance'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'storm-of-vengeance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'storm-of-vengeance'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'storm-of-vengeance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Suggestion - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'suggestion'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'suggestion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'suggestion'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'suggestion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'suggestion'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'suggestion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Suggestion, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'suggestion-mass'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'suggestion-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'suggestion-mass'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'suggestion-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'suggestion-mass'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'suggestion-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Instrument - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-instrument'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-instrument')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Monster I - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-i'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-i')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-i'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-i')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-i'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-i')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-i'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-i')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Monster II - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-ii'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-ii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-ii'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-ii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-ii'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-ii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-ii'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-ii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Monster III - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-iii'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-iii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-iii'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-iii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-iii'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-iii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-iii'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-iii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Monster IV - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-iv'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-iv')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-iv'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-iv')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-iv'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-iv')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-iv'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-iv')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Monster IX - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-ix'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-ix')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-ix'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-ix')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-ix'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-ix')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Monster V - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-v'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-v')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-v'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-v')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-v'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-v')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-v'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-v')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Monster VI - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-vi'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-vi')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-vi'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-vi')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-vi'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-vi')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-vi'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-vi')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Monster VII - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-vii'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-vii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-vii'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-vii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-vii'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-vii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Monster VIII - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-viii'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-viii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-viii'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-viii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-monster-viii'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-monster-viii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Nature’s Ally I - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-nature-s-ally-i'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-nature-s-ally-i')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-nature-s-ally-i'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-nature-s-ally-i')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Nature’s Ally II - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-nature-s-ally-ii'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-nature-s-ally-ii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-nature-s-ally-ii'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-nature-s-ally-ii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Nature’s Ally III - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-nature-s-ally-iii'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-nature-s-ally-iii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-nature-s-ally-iii'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-nature-s-ally-iii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Nature’s Ally IV - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-nature-s-ally-iv'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-nature-s-ally-iv')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-nature-s-ally-iv'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-nature-s-ally-iv')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Nature’s Ally IX - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-nature-s-ally-ix'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-nature-s-ally-ix')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Nature’s Ally V - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-nature-s-ally-v'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-nature-s-ally-v')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Nature’s Ally VI - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-nature-s-ally-vi'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-nature-s-ally-vi')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Nature’s Ally VII - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-nature-s-ally-vii'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-nature-s-ally-vii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Nature’s Ally VIII - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-nature-s-ally-viii'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-nature-s-ally-viii')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Summon Swarm - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-swarm'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-swarm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-swarm'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-swarm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-swarm'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-swarm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'summon-swarm'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'summon-swarm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Sunbeam - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sunbeam'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sunbeam')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Sunburst - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sunburst'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sunburst')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sunburst'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sunburst')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sunburst'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sunburst')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Symbol of Death - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-death'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-death')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-death'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-death')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-death'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-death')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Symbol of Fear - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-fear'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-fear')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-fear'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-fear')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-fear'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-fear')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Symbol of Insanity - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-insanity'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-insanity')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-insanity'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-insanity')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-insanity'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-insanity')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Symbol of Pain - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-pain'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-pain')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-pain'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-pain')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-pain'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-pain')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Symbol of Persuasion - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-persuasion'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-persuasion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-persuasion'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-persuasion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-persuasion'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-persuasion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Symbol of Sleep - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-sleep'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-sleep')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-sleep'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-sleep')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-sleep'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-sleep')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Symbol of Stunning - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-stunning'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-stunning')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-stunning'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-stunning')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-stunning'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-stunning')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Symbol of Weakness - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-weakness'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-weakness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-weakness'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-weakness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'symbol-of-weakness'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'symbol-of-weakness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Sympathetic Vibration - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sympathetic-vibration'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sympathetic-vibration')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Sympathy - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sympathy'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sympathy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sympathy'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sympathy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'sympathy'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'sympathy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Telekinesis - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'telekinesis'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'telekinesis')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'telekinesis'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'telekinesis')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Telekinetic Sphere - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'telekinetic-sphere'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'telekinetic-sphere')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'telekinetic-sphere'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'telekinetic-sphere')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Telepathic Bond - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'telepathic-bond'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'telepathic-bond')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'telepathic-bond'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'telepathic-bond')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Teleport - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'teleport'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'teleport')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'teleport'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'teleport')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Teleportation Circle - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'teleportation-circle'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'teleportation-circle')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'teleportation-circle'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'teleportation-circle')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Teleport, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'teleport-greater'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'teleport-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'teleport-greater'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'teleport-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Teleport Object - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'teleport-object'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'teleport-object')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'teleport-object'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'teleport-object')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Temporal Stasis - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'temporal-stasis'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'temporal-stasis')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'temporal-stasis'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'temporal-stasis')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Time Stop - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'time-stop'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'time-stop')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'time-stop'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'time-stop')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Tiny Hut - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'tiny-hut'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'tiny-hut')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'tiny-hut'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'tiny-hut')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'tiny-hut'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'tiny-hut')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Tongues - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'tongues'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'tongues')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'tongues'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'tongues')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'tongues'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'tongues')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'tongues'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'tongues')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Touch of Fatigue - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'touch-of-fatigue'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'touch-of-fatigue')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'touch-of-fatigue'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'touch-of-fatigue')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Touch of Idiocy - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'touch-of-idiocy'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'touch-of-idiocy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'touch-of-idiocy'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'touch-of-idiocy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Transformation - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'transformation'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'transformation')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'transformation'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'transformation')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Transmute Metal to Wood - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'transmute-metal-to-wood'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'transmute-metal-to-wood')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Transmute Mud to Rock - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'transmute-mud-to-rock'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'transmute-mud-to-rock')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'transmute-mud-to-rock'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'transmute-mud-to-rock')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'transmute-mud-to-rock'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'transmute-mud-to-rock')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Transmute Rock to Mud - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'transmute-rock-to-mud'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'transmute-rock-to-mud')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'transmute-rock-to-mud'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'transmute-rock-to-mud')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'transmute-rock-to-mud'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'transmute-rock-to-mud')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Transport via Plants - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'transport-via-plants'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'transport-via-plants')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Trap the Soul - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'trap-the-soul'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'trap-the-soul')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'trap-the-soul'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'trap-the-soul')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Tree Shape - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'tree-shape'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'tree-shape')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'tree-shape'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'tree-shape')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Tree Stride - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'tree-stride'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'tree-stride')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'tree-stride'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'tree-stride')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- True Resurrection - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'true-resurrection'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'true-resurrection')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- True Seeing - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'true-seeing'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'true-seeing')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'true-seeing'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'true-seeing')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'true-seeing'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'true-seeing')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'true-seeing'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'true-seeing')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- True Strike - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'true-strike'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'true-strike')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'true-strike'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'true-strike')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Undeath to Death - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'undeath-to-death'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'undeath-to-death')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'undeath-to-death'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'undeath-to-death')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'undeath-to-death'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'undeath-to-death')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Undetectable Alignment - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'undetectable-alignment'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'undetectable-alignment')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'undetectable-alignment'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'undetectable-alignment')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'undetectable-alignment'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'undetectable-alignment')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Unhallow - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'unhallow'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'unhallow')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'unhallow'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'unhallow')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Unholy Aura - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'unholy-aura'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'unholy-aura')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Unseen Servant - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'unseen-servant'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'unseen-servant')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'unseen-servant'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'unseen-servant')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'unseen-servant'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'unseen-servant')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Vampiric Touch - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'vampiric-touch'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'vampiric-touch')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'vampiric-touch'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'vampiric-touch')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Veil - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'veil'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'veil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'veil'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'veil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'veil'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'veil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Ventriloquism - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ventriloquism'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ventriloquism')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ventriloquism'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ventriloquism')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ventriloquism'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ventriloquism')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Virtue - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'virtue'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'virtue')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'virtue'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'virtue')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'virtue'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'virtue')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Vision - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'vision'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'vision')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'vision'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'vision')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Wail of the Banshee - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wail-of-the-banshee'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wail-of-the-banshee')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wail-of-the-banshee'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wail-of-the-banshee')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Wall of Fire - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wall-of-fire'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wall-of-fire')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wall-of-fire'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wall-of-fire')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wall-of-fire'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wall-of-fire')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Wall of Force - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wall-of-force'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wall-of-force')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wall-of-force'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wall-of-force')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Wall of Ice - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wall-of-ice'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wall-of-ice')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wall-of-ice'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wall-of-ice')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Wall of Iron - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wall-of-iron'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wall-of-iron')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wall-of-iron'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wall-of-iron')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Wall of Stone - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wall-of-stone'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wall-of-stone')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wall-of-stone'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wall-of-stone')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wall-of-stone'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wall-of-stone')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wall-of-stone'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wall-of-stone')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Wall of Thorns - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wall-of-thorns'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wall-of-thorns')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Warp Wood - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'warp-wood'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'warp-wood')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Water Breathing - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'water-breathing'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'water-breathing')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'water-breathing'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'water-breathing')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'water-breathing'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'water-breathing')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'water-breathing'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'water-breathing')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Water Walk - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'water-walk'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'water-walk')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'water-walk'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'water-walk')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Waves of Exhaustion - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'waves-of-exhaustion'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'waves-of-exhaustion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'waves-of-exhaustion'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'waves-of-exhaustion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Waves of Fatigue - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'waves-of-fatigue'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'waves-of-fatigue')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'waves-of-fatigue'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'waves-of-fatigue')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Web - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'web'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'web')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'web'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'web')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Weird - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'weird'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'weird')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'weird'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'weird')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Whirlwind - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'whirlwind'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'whirlwind')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Whispering Wind - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'whispering-wind'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'whispering-wind')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'whispering-wind'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'whispering-wind')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'whispering-wind'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'whispering-wind')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Wind Walk - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wind-walk'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wind-walk')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wind-walk'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wind-walk')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Wind Wall - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wind-wall'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wind-wall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wind-wall'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wind-wall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wind-wall'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wind-wall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wind-wall'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wind-wall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wind-wall'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wind-wall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Wish - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wish'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wish')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wish'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wish')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Wood Shape - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'wood-shape'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'wood-shape')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Word of Chaos - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'word-of-chaos'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'word-of-chaos')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Word of Recall - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'word-of-recall'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'word-of-recall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'word-of-recall'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'word-of-recall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Zone of Silence - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'zone-of-silence'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'zone-of-silence')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Zone of Truth - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'zone-of-truth'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'zone-of-truth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'zone-of-truth'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'zone-of-truth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

