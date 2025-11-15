  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'find-traps')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Finger of Death - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'finger-of-death'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'finger-of-death')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'finger-of-death'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'finger-of-death')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'finger-of-death'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'finger-of-death')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Fireball - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fireball'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fireball')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fireball'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fireball')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Fire Seeds - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fire-seeds'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fire-seeds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Fire Shield - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fire-shield'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fire-shield')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fire-shield'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fire-shield')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Fire Storm - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fire-storm'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fire-storm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fire-storm'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fire-storm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Fire Trap - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fire-trap'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fire-trap')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fire-trap'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fire-trap')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fire-trap'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fire-trap')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Flame Arrow - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'flame-arrow'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'flame-arrow')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'flame-arrow'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'flame-arrow')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Flame Blade - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'flame-blade'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'flame-blade')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Flame Strike - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'flame-strike'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'flame-strike')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'flame-strike'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'flame-strike')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Flaming Sphere - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'flaming-sphere'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'flaming-sphere')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'flaming-sphere'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'flaming-sphere')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'flaming-sphere'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'flaming-sphere')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Flare - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'flare'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'flare')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'flare'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'flare')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'flare'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'flare')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'flare'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'flare')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Flesh to Stone - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'flesh-to-stone'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'flesh-to-stone')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'flesh-to-stone'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'flesh-to-stone')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Floating Disk - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'floating-disk'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'floating-disk')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'floating-disk'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'floating-disk')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Fly - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fly'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fly')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fly'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fly')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Fog Cloud - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fog-cloud'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fog-cloud')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fog-cloud'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fog-cloud')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fog-cloud'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fog-cloud')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Forbiddance - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'forbiddance'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'forbiddance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Forcecage - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'forcecage'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'forcecage')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'forcecage'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'forcecage')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Forceful Hand - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'forceful-hand'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'forceful-hand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'forceful-hand'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'forceful-hand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Foresight - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'foresight'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'foresight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'foresight'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'foresight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'foresight'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'foresight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Fox’s Cunning - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fox-s-cunning'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fox-s-cunning')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fox-s-cunning'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fox-s-cunning')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fox-s-cunning'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fox-s-cunning')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Fox’s Cunning, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fox-s-cunning-mass'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fox-s-cunning-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fox-s-cunning-mass'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fox-s-cunning-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'fox-s-cunning-mass'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'fox-s-cunning-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Freedom - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'freedom'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'freedom')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'freedom'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'freedom')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Freedom of Movement - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'freedom-of-movement'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'freedom-of-movement')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'freedom-of-movement'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'freedom-of-movement')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'freedom-of-movement'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'freedom-of-movement')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'freedom-of-movement'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'freedom-of-movement')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Freezing Sphere - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'freezing-sphere'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'freezing-sphere')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'freezing-sphere'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'freezing-sphere')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Gaseous Form - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'gaseous-form'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'gaseous-form')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'gaseous-form'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'gaseous-form')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'gaseous-form'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'gaseous-form')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Gate - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'gate'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'gate')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'gate'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'gate')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'gate'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'gate')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Geas, Lesser - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'geas-lesser'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'geas-lesser')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'geas-lesser'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'geas-lesser')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'geas-lesser'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'geas-lesser')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Geas/Quest - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'geas-quest'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'geas-quest')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'geas-quest'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'geas-quest')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'geas-quest'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'geas-quest')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'geas-quest'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'geas-quest')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Gentle Repose - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'gentle-repose'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'gentle-repose')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'gentle-repose'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'gentle-repose')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'gentle-repose'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'gentle-repose')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Ghost Sound - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ghost-sound'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ghost-sound')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ghost-sound'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ghost-sound')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ghost-sound'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ghost-sound')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Ghoul Touch - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ghoul-touch'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ghoul-touch')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ghoul-touch'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ghoul-touch')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Giant Vermin - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'giant-vermin'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'giant-vermin')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'giant-vermin'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'giant-vermin')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Glibness - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'glibness'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'glibness')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Glitterdust - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'glitterdust'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'glitterdust')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'glitterdust'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'glitterdust')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'glitterdust'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'glitterdust')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Globe of Invulnerability - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'globe-of-invulnerability'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'globe-of-invulnerability')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'globe-of-invulnerability'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'globe-of-invulnerability')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Globe of Invulnerability, Lesser - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'globe-of-invulnerability-lesser'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'globe-of-invulnerability-lesser')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'globe-of-invulnerability-lesser'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'globe-of-invulnerability-lesser')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Glyph of Warding - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'glyph-of-warding'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'glyph-of-warding')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Glyph of Warding, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'glyph-of-warding-greater'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'glyph-of-warding-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Goodberry - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'goodberry'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'goodberry')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Good Hope - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'good-hope'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'good-hope')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Grasping Hand - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'grasping-hand'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'grasping-hand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'grasping-hand'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'grasping-hand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Grease - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'grease'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'grease')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'grease'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'grease')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'grease'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'grease')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Guards and Wards - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'guards-and-wards'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'guards-and-wards')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'guards-and-wards'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'guards-and-wards')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Guidance - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'guidance'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'guidance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'guidance'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'guidance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Gust of Wind - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'gust-of-wind'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'gust-of-wind')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'gust-of-wind'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'gust-of-wind')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'gust-of-wind'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'gust-of-wind')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Hallow - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hallow'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hallow')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hallow'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hallow')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Hallucinatory Terrain - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hallucinatory-terrain'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hallucinatory-terrain')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hallucinatory-terrain'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hallucinatory-terrain')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hallucinatory-terrain'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hallucinatory-terrain')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Halt Undead - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'halt-undead'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'halt-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'halt-undead'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'halt-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Harm - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'harm'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'harm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Haste - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'haste'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'haste')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'haste'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'haste')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'haste'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'haste')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Heal - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'heal'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'heal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'heal'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'heal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Heal, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'heal-mass'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'heal-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Heal Mount - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'heal-mount'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'heal-mount')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Heat Metal - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'heat-metal'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'heat-metal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Helping Hand - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'helping-hand'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'helping-hand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Heroes’ Feast - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'heroes-feast'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'heroes-feast')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'heroes-feast'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'heroes-feast')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Heroism - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'heroism'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'heroism')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'heroism'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'heroism')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'heroism'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'heroism')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Heroism, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'heroism-greater'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'heroism-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'heroism-greater'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'heroism-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'heroism-greater'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'heroism-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Hide from Animals - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hide-from-animals'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hide-from-animals')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hide-from-animals'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hide-from-animals')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Hide from Undead - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hide-from-undead'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hide-from-undead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Hideous Laughter - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hideous-laughter'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hideous-laughter')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hideous-laughter'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hideous-laughter')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hideous-laughter'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hideous-laughter')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Hold Animal - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-animal'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-animal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-animal'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-animal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Hold Monster - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-monster'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-monster')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-monster'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-monster')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-monster'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-monster')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Hold Monster, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-monster-mass'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-monster-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-monster-mass'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-monster-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Hold Person - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-person'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-person')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-person'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-person')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-person'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-person')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-person'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-person')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Hold Person, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-person-mass'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-person-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-person-mass'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-person-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Hold Portal - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-portal'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-portal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hold-portal'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hold-portal')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Holy Aura - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'holy-aura'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'holy-aura')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Holy Sword - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'holy-sword'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'holy-sword')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Holy Word - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'holy-word'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'holy-word')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Horrid Wilting - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'horrid-wilting'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'horrid-wilting')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'horrid-wilting'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'horrid-wilting')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Hypnotic Pattern - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hypnotic-pattern'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hypnotic-pattern')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hypnotic-pattern'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hypnotic-pattern')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hypnotic-pattern'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hypnotic-pattern')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Hypnotism - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hypnotism'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hypnotism')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hypnotism'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hypnotism')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'hypnotism'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'hypnotism')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Ice Storm - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ice-storm'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ice-storm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ice-storm'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ice-storm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ice-storm'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ice-storm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Identify - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'identify'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'identify')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'identify'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'identify')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'identify'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'identify')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Illusory Script - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'illusory-script'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'illusory-script')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'illusory-script'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'illusory-script')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'illusory-script'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'illusory-script')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Illusory Wall - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'illusory-wall'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'illusory-wall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'illusory-wall'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'illusory-wall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Imbue with Spell Ability - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'imbue-with-spell-ability'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'imbue-with-spell-ability')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Implosion - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'implosion'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'implosion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Imprisonment - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'imprisonment'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'imprisonment')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'imprisonment'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'imprisonment')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Incendiary Cloud - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'incendiary-cloud'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'incendiary-cloud')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'incendiary-cloud'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'incendiary-cloud')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Inflict Critical Wounds - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'inflict-critical-wounds'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'inflict-critical-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Inflict Critical Wounds, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'inflict-critical-wounds-mass'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'inflict-critical-wounds-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Inflict Light Wounds - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'inflict-light-wounds'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'inflict-light-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Inflict Light Wounds, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'inflict-light-wounds-mass'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'inflict-light-wounds-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Inflict Minor Wounds - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'inflict-minor-wounds'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'inflict-minor-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Inflict Moderate Wounds - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'inflict-moderate-wounds'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'inflict-moderate-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Inflict Moderate Wounds, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'inflict-moderate-wounds-mass'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'inflict-moderate-wounds-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Inflict Serious Wounds - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'inflict-serious-wounds'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'inflict-serious-wounds')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Inflict Serious Wounds, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'inflict-serious-wounds-mass'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'inflict-serious-wounds-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Insanity - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'insanity'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'insanity')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'insanity'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'insanity')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Insect Plague - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'insect-plague'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'insect-plague')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'insect-plague'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'insect-plague')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Instant Summons - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'instant-summons'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'instant-summons')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'instant-summons'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'instant-summons')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Interposing Hand - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'interposing-hand'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'interposing-hand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'interposing-hand'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'interposing-hand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Invisibility - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'invisibility'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'invisibility')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'invisibility'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'invisibility')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'invisibility'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'invisibility')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Invisibility, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'invisibility-greater'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'invisibility-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'invisibility-greater'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'invisibility-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'invisibility-greater'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'invisibility-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Invisibility, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'invisibility-mass'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'invisibility-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'invisibility-mass'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'invisibility-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Invisibility Purge - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'invisibility-purge'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'invisibility-purge')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Invisibility Sphere - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'invisibility-sphere'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'invisibility-sphere')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'invisibility-sphere'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'invisibility-sphere')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'invisibility-sphere'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'invisibility-sphere')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Iron Body - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'iron-body'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'iron-body')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'iron-body'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'iron-body')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Ironwood - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'ironwood'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'ironwood')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Irresistible Dance - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'irresistible-dance'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'irresistible-dance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'irresistible-dance'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'irresistible-dance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'irresistible-dance'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'irresistible-dance')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Jump - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'jump'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'jump')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'jump'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'jump')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'jump'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'jump')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'jump'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'jump')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Keen Edge - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'keen-edge'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'keen-edge')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'keen-edge'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'keen-edge')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Knock - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'knock'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'knock')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'knock'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'knock')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Know Direction - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'know-direction'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'know-direction')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'know-direction'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'know-direction')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Legend Lore - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'legend-lore'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'legend-lore')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'legend-lore'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'legend-lore')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'legend-lore'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'legend-lore')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Levitate - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'levitate'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'levitate')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'levitate'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'levitate')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Light - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'light'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'light')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'light'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'light')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'light'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'light')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'light'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'light')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'light'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'light')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Lightning Bolt - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'lightning-bolt'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'lightning-bolt')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'lightning-bolt'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'lightning-bolt')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Limited Wish - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'limited-wish'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'limited-wish')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'limited-wish'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'limited-wish')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Liveoak - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'liveoak'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'liveoak')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Locate Creature - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'locate-creature'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'locate-creature')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'locate-creature'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'locate-creature')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'locate-creature'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'locate-creature')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Locate Object - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'locate-object'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'locate-object')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'locate-object'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'locate-object')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'locate-object'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'locate-object')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'locate-object'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'locate-object')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Longstrider - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'longstrider'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'longstrider')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'longstrider'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'longstrider')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Lullaby - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'lullaby'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'lullaby')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mage Armor - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-armor'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-armor')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-armor'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-armor')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mage Hand - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-hand'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-hand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-hand'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-hand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-hand'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-hand')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mage’s Disjunction - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-s-disjunction'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-s-disjunction')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-s-disjunction'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-s-disjunction')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mage’s Faithful Hound - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-s-faithful-hound'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-s-faithful-hound')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-s-faithful-hound'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-s-faithful-hound')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mage’s Magnificent Mansion - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-s-magnificent-mansion'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-s-magnificent-mansion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-s-magnificent-mansion'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-s-magnificent-mansion')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mage’s Private Sanctum - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-s-private-sanctum'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-s-private-sanctum')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-s-private-sanctum'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-s-private-sanctum')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mage’s Sword - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-s-sword'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-s-sword')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mage-s-sword'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mage-s-sword')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Magic Aura - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-aura'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-aura')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-aura'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-aura')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-aura'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-aura')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Magic Circle against Chaos - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-circle-against-chaos'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-circle-against-chaos')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-circle-against-chaos'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-circle-against-chaos')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-circle-against-chaos'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-circle-against-chaos')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-circle-against-chaos'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-circle-against-chaos')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Magic Circle against Evil - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-circle-against-evil'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-circle-against-evil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-circle-against-evil'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-circle-against-evil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-circle-against-evil'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-circle-against-evil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-circle-against-evil'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-circle-against-evil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Magic Circle against Good - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-circle-against-good'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-circle-against-good')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-circle-against-good'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-circle-against-good')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-circle-against-good'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-circle-against-good')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Magic Circle against Law - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-circle-against-law'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-circle-against-law')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-circle-against-law'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-circle-against-law')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-circle-against-law'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-circle-against-law')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Magic Fang - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-fang'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-fang')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-fang'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-fang')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Magic Fang, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-fang-greater'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-fang-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-fang-greater'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-fang-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Magic Jar - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-jar'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-jar')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-jar'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-jar')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Magic Missile - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-missile'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-missile')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-missile'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-missile')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Magic Mouth - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-mouth'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-mouth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-mouth'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-mouth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-mouth'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-mouth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Magic Stone - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-stone'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-stone')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-stone'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-stone')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Magic Vestment - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-vestment'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-vestment')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Magic Weapon - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-weapon'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-weapon')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-weapon'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-weapon')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-weapon'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-weapon')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-weapon'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-weapon')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Magic Weapon, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-weapon-greater'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-weapon-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-weapon-greater'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-weapon-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-weapon-greater'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-weapon-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'magic-weapon-greater'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'magic-weapon-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Major Creation - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'major-creation'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'major-creation')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'major-creation'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'major-creation')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Major Image - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'major-image'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'major-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'major-image'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'major-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'major-image'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'major-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Make Whole - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'make-whole'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'make-whole')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mark of Justice - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mark-of-justice'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mark-of-justice')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mark-of-justice'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mark-of-justice')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Maze - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'maze'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'maze')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'maze'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'maze')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Meld into Stone - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'meld-into-stone'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'meld-into-stone')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'meld-into-stone'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'meld-into-stone')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mending - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mending'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mending')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mending'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mending')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mending'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mending')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mending'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mending')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mending'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mending')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Message - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'message'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'message')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'message'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'message')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'message'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'message')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Meteor Swarm - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'meteor-swarm'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'meteor-swarm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'meteor-swarm'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'meteor-swarm')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mind Blank - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mind-blank'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mind-blank')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mind-blank'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mind-blank')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mind Fog - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mind-fog'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mind-fog')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mind-fog'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mind-fog')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mind-fog'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mind-fog')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Minor Creation - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'minor-creation'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'minor-creation')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'minor-creation'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'minor-creation')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Minor Image - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'minor-image'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'minor-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'minor-image'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'minor-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'minor-image'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'minor-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Miracle - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'miracle'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'miracle')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mirage Arcana - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mirage-arcana'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mirage-arcana')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mirage-arcana'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mirage-arcana')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mirage-arcana'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mirage-arcana')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mirror Image - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mirror-image'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mirror-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mirror-image'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mirror-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mirror-image'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mirror-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Misdirection - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'misdirection'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'misdirection')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'misdirection'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'misdirection')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'misdirection'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'misdirection')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mislead - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mislead'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mislead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mislead'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mislead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mislead'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mislead')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Modify Memory - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'modify-memory'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'modify-memory')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Moment of Prescience - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'moment-of-prescience'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'moment-of-prescience')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'moment-of-prescience'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'moment-of-prescience')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Mount - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mount'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mount')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'mount'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'mount')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Move Earth - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'move-earth'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'move-earth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'move-earth'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'move-earth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'move-earth'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'move-earth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Neutralize Poison - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'neutralize-poison'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'neutralize-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'neutralize-poison'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'neutralize-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'neutralize-poison'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'neutralize-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'neutralize-poison'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'neutralize-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'neutralize-poison'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'neutralize-poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Nightmare - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'nightmare'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'nightmare')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'nightmare'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'nightmare')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'nightmare'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'nightmare')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Nondetection - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'nondetection'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'nondetection')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'nondetection'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'nondetection')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'nondetection'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'nondetection')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Obscure Object - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'obscure-object'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'obscure-object')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'obscure-object'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'obscure-object')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'obscure-object'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'obscure-object')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'obscure-object'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'obscure-object')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Obscuring Mist - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'obscuring-mist'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'obscuring-mist')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'obscuring-mist'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'obscuring-mist')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'obscuring-mist'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'obscuring-mist')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'obscuring-mist'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'obscuring-mist')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Open/Close - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'open-close'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'open-close')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'open-close'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'open-close')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'open-close'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'open-close')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Overland Flight - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'overland-flight'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'overland-flight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'overland-flight'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'overland-flight')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Owl’s Wisdom - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'owl-s-wisdom'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'owl-s-wisdom')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'owl-s-wisdom'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'owl-s-wisdom')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'owl-s-wisdom'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'owl-s-wisdom')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'owl-s-wisdom'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'owl-s-wisdom')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'owl-s-wisdom'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'owl-s-wisdom')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'owl-s-wisdom'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'owl-s-wisdom')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Owl’s Wisdom, Mass - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'owl-s-wisdom-mass'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'owl-s-wisdom-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'owl-s-wisdom-mass'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'owl-s-wisdom-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'owl-s-wisdom-mass'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'owl-s-wisdom-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'owl-s-wisdom-mass'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'owl-s-wisdom-mass')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Passwall - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'passwall'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'passwall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'passwall'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'passwall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Pass without Trace - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'pass-without-trace'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'pass-without-trace')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'pass-without-trace'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'pass-without-trace')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Permanency - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'permanency'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'permanency')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'permanency'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'permanency')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Permanent Image - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'permanent-image'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'permanent-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'permanent-image'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'permanent-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'permanent-image'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'permanent-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Persistent Image - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'persistent-image'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'persistent-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'persistent-image'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'persistent-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'persistent-image'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'persistent-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Phantasmal Killer - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'phantasmal-killer'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'phantasmal-killer')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'phantasmal-killer'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'phantasmal-killer')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Phantom Steed - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'phantom-steed'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'phantom-steed')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'phantom-steed'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'phantom-steed')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'phantom-steed'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'phantom-steed')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Phantom Trap - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'phantom-trap'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'phantom-trap')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'phantom-trap'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'phantom-trap')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Phase Door - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'phase-door'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'phase-door')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'phase-door'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'phase-door')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Planar Ally - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'planar-ally'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'planar-ally')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Planar Ally, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'planar-ally-greater'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'planar-ally-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Planar Ally, Lesser - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'planar-ally-lesser'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'planar-ally-lesser')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Planar Binding - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'planar-binding'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'planar-binding')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'planar-binding'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'planar-binding')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Planar Binding, Greater - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'planar-binding-greater'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'planar-binding-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'planar-binding-greater'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'planar-binding-greater')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Planar Binding, Lesser - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'planar-binding-lesser'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'planar-binding-lesser')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'planar-binding-lesser'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'planar-binding-lesser')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Plane Shift - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'plane-shift'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'plane-shift')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'plane-shift'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'plane-shift')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'plane-shift'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  5
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'plane-shift')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Plant Growth - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'plant-growth'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'plant-growth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'plant-growth'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'plant-growth')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Poison - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'poison'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'poison'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'poison')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Polar Ray - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'polar-ray'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'polar-ray')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'polar-ray'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'polar-ray')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Polymorph - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'polymorph'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'polymorph')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'polymorph'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  4
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'polymorph')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Polymorph Any Object - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'polymorph-any-object'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'polymorph-any-object')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'polymorph-any-object'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'polymorph-any-object')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Power Word Blind - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'power-word-blind'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'power-word-blind')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'power-word-blind'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'power-word-blind')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Power Word Kill - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'power-word-kill'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'power-word-kill')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'power-word-kill'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'power-word-kill')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Power Word Stun - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'power-word-stun'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'power-word-stun')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'power-word-stun'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'power-word-stun')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Prayer - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prayer'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prayer')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prayer'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prayer')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Prestidigitation - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prestidigitation'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prestidigitation')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prestidigitation'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prestidigitation')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prestidigitation'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  0
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prestidigitation')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Prismatic Sphere - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prismatic-sphere'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prismatic-sphere')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prismatic-sphere'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  9
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prismatic-sphere')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Prismatic Spray - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prismatic-spray'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prismatic-spray')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prismatic-spray'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prismatic-spray')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Prismatic Wall - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prismatic-wall'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prismatic-wall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'prismatic-wall'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  8
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'prismatic-wall')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Produce Flame - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'produce-flame'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'produce-flame')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Programmed Image - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'programmed-image'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'programmed-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'programmed-image'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'programmed-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'programmed-image'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'programmed-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Project Image - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'project-image'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'project-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'project-image'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  7
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'project-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'project-image'),
  (SELECT id FROM classes WHERE slug = 'bardo'),
  6
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'project-image')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'bardo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Protection from Arrows - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-arrows'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-arrows')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-arrows'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-arrows')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Protection from Chaos - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-chaos'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-chaos')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-chaos'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-chaos')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-chaos'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-chaos')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-chaos'),
  (SELECT id FROM classes WHERE slug = 'paladin'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-chaos')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'paladin')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Protection from Energy - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-energy'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-energy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-energy'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-energy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-energy'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-energy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-energy'),
  (SELECT id FROM classes WHERE slug = 'druida'),
  3
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-energy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'druida')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-energy'),
  (SELECT id FROM classes WHERE slug = 'explorador'),
  2
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-energy')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'explorador')
ON CONFLICT (spell_id, class_id) DO NOTHING;

-- Protection from Evil - Niveles
INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-evil'),
  (SELECT id FROM classes WHERE slug = 'hechicero'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-evil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'hechicero')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-evil'),
  (SELECT id FROM classes WHERE slug = 'mago'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-evil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'mago')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 
  (SELECT id FROM spells WHERE slug = 'protection-from-evil'),
  (SELECT id FROM classes WHERE slug = 'clerigo'),
  1
WHERE EXISTS (SELECT 1 FROM spells WHERE slug = 'protection-from-evil')
  AND EXISTS (SELECT 1 FROM classes WHERE slug = 'clerigo')
ON CONFLICT (spell_id, class_id) DO NOTHING;

INSERT INTO spell_class_levels (spell_id, class_id, spell_level)
SELECT 