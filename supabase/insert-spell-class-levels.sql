-- ============================================================================
-- NIVELES DE HECHIZO POR CLASE
-- Relaciones entre conjuros y clases con sus niveles
-- Total de relaciones: 1410
-- ============================================================================

-- Insertar niveles de hechizo por clase
-- Usa subconsultas para obtener IDs desde slugs
INSERT INTO public.spell_class_levels (spell_id, class_id, spell_level)
VALUES
  (
    (SELECT id FROM public.spells WHERE slug = 'acid-arrow'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'acid-arrow'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'acid-fog'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'acid-fog'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'acid-splash'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'acid-splash'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'aid'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'air-walk'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'air-walk'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'alarm'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'alarm'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'alarm'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'alarm'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'align-weapon'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'alter-self'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'alter-self'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'alter-self'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'analyze-dweomer'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'analyze-dweomer'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'analyze-dweomer'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animal-growth'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animal-growth'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animal-growth'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animal-growth'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animal-messenger'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animal-messenger'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animal-messenger'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animal-shapes'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animal-trance'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animal-trance'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animate-dead'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animate-dead'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animate-dead'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animate-objects'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animate-objects'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animate-plants'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animate-rope'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animate-rope'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'animate-rope'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'antilife-shell'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'antilife-shell'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'antimagic-field'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'antimagic-field'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'antimagic-field'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'antipathy'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'antipathy'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'antipathy'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'antiplant-shell'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'arcane-eye'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'arcane-eye'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'arcane-lock'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'arcane-lock'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'arcane-mark'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'arcane-mark'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'arcane-sight'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'arcane-sight'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'arcane-sight-greater'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'arcane-sight-greater'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'astral-projection'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'astral-projection'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'astral-projection'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'atonement'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'atonement'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'augury'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'awaken'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'baleful-polymorph'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'baleful-polymorph'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'baleful-polymorph'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bane'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'banishment'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'banishment'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'banishment'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'barkskin'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'barkskin'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bear-s-endurance'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bear-s-endurance'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bear-s-endurance'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bear-s-endurance'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bear-s-endurance'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bear-s-endurance-mass'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bear-s-endurance-mass'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bear-s-endurance-mass'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bear-s-endurance-mass'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bestow-curse'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bestow-curse'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bestow-curse'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'binding'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'binding'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'black-tentacles'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'black-tentacles'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blade-barrier'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blasphemy'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bless'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bless'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bless-water'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bless-water'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bless-weapon'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blight'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blight'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blight'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blindness-deafness'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blindness-deafness'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blindness-deafness'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blindness-deafness'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blink'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blink'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blink'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blur'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blur'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'blur'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'break-enchantment'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'break-enchantment'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'break-enchantment'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'break-enchantment'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'break-enchantment'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bull-s-strength'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bull-s-strength'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bull-s-strength'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bull-s-strength'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bull-s-strength'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bull-s-strength-mass'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bull-s-strength-mass'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bull-s-strength-mass'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'bull-s-strength-mass'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'burning-hands'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'burning-hands'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'call-lightning'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'call-lightning-storm'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'calm-animals'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'calm-animals'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'calm-emotions'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'calm-emotions'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cat-s-grace'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cat-s-grace'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cat-s-grace'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cat-s-grace'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cat-s-grace'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cat-s-grace-mass'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cat-s-grace-mass'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cat-s-grace-mass'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cat-s-grace-mass'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cause-fear'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cause-fear'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cause-fear'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cause-fear'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'chain-lightning'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'chain-lightning'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'changestaff'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'charm-animal'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'charm-animal'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'charm-monster'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'charm-monster'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'charm-monster'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'charm-monster-mass'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'charm-monster-mass'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'charm-monster-mass'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'charm-person'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'charm-person'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'charm-person'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'chill-metal'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'chill-touch'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'chill-touch'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'circle-of-death'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'circle-of-death'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'clairaudience-clairvoyance'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'clairaudience-clairvoyance'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'clairaudience-clairvoyance'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'clenched-fist'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'clenched-fist'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cloak-of-chaos'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'clone'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'clone'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cloudkill'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cloudkill'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'color-spray'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'color-spray'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'command'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'command-greater'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'command-plants'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'command-plants'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'command-undead'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'command-undead'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'commune'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'commune-with-nature'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'commune-with-nature'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'comprehend-languages'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'comprehend-languages'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'comprehend-languages'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'comprehend-languages'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cone-of-cold'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cone-of-cold'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'confusion'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'confusion'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'confusion'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'confusion-lesser'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'consecrate'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'contact-other-plane'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'contact-other-plane'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'contagion'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'contagion'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'contagion'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'contagion'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'contingency'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'contingency'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'continual-flame'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'continual-flame'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'continual-flame'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'control-plants'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'control-undead'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'control-undead'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'control-water'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'control-water'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'control-water'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'control-water'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'control-weather'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'control-weather'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'control-weather'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'control-weather'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'control-winds'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'create-food-and-water'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'create-greater-undead'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'create-greater-undead'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'create-greater-undead'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'create-undead'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'create-undead'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'create-undead'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'create-water'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'create-water'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'create-water'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'creeping-doom'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'crushing-despair'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'crushing-despair'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'crushing-despair'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'crushing-hand'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'crushing-hand'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-critical-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-critical-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-critical-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-critical-wounds-mass'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-critical-wounds-mass'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-light-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-light-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-light-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-light-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-light-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-light-wounds-mass'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-light-wounds-mass'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-light-wounds-mass'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-minor-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-minor-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-moderate-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-moderate-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-moderate-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-moderate-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-moderate-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-moderate-wounds-mass'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-moderate-wounds-mass'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-moderate-wounds-mass'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-serious-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-serious-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-serious-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-serious-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-serious-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-serious-wounds-mass'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'cure-serious-wounds-mass'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'curse-water'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dancing-lights'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dancing-lights'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dancing-lights'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'darkness'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'darkness'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'darkness'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'darkness'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'darkvision'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'darkvision'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'darkvision'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'daylight'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'daylight'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'daylight'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'daylight'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'daylight'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'daylight'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'daze'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'daze'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'daze'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'daze-monster'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'daze-monster'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'daze-monster'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'death-knell'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'death-ward'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'death-ward'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'death-ward'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'deathwatch'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'deeper-darkness'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'deep-slumber'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'deep-slumber'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'deep-slumber'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'delayed-blast-fireball'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'delayed-blast-fireball'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'delay-poison'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'delay-poison'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'delay-poison'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'delay-poison'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'delay-poison'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'demand'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'demand'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'desecrate'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'destruction'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-animals-or-plants'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-animals-or-plants'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-chaos'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-evil'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-good'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-law'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-magic'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-magic'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-magic'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-magic'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-magic'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-poison'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-poison'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-poison'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-poison'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-poison'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-poison'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-scrying'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-scrying'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-scrying'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-secret-doors'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-secret-doors'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-secret-doors'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-snares-and-pits'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-snares-and-pits'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-thoughts'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-thoughts'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-thoughts'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-undead'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-undead'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-undead'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'detect-undead'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dictum'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dimensional-anchor'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dimensional-anchor'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dimensional-anchor'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dimensional-lock'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dimensional-lock'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dimensional-lock'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dimension-door'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dimension-door'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dimension-door'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'diminish-plants'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'diminish-plants'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'discern-lies'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'discern-lies'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'discern-location'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'discern-location'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'discern-location'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'disguise-self'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'disguise-self'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'disguise-self'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'disintegrate'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'disintegrate'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dismissal'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dismissal'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dismissal'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-chaos'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-chaos'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-evil'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-evil'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-good'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-law'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-magic'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-magic'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-magic'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-magic'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-magic'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-magic'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-magic-greater'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-magic-greater'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-magic-greater'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-magic-greater'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dispel-magic-greater'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'displacement'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'displacement'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'displacement'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'disrupting-weapon'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'disrupt-undead'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'disrupt-undead'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'divination'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'divine-favor'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'divine-favor'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'divine-power'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dominate-animal'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dominate-monster'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dominate-monster'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dominate-person'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dominate-person'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dominate-person'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'doom'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dream'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dream'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'dream'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'eagle-s-splendor'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'eagle-s-splendor'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'eagle-s-splendor'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'eagle-s-splendor'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'eagle-s-splendor'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'eagle-s-splendor-mass'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'eagle-s-splendor-mass'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'eagle-s-splendor-mass'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'eagle-s-splendor-mass'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'earthquake'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'earthquake'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'elemental-swarm'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'endure-elements'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'endure-elements'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'endure-elements'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'endure-elements'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'endure-elements'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'endure-elements'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'energy-drain'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'energy-drain'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'energy-drain'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'enervation'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'enervation'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'enlarge-person'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'enlarge-person'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'enlarge-person-mass'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'enlarge-person-mass'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'entangle'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'entangle'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'enthrall'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'enthrall'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'entropic-shield'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'erase'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'erase'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'erase'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ethereal-jaunt'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ethereal-jaunt'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ethereal-jaunt'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'etherealness'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'etherealness'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'etherealness'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'expeditious-retreat'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'expeditious-retreat'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'expeditious-retreat'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'explosive-runes'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'explosive-runes'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'eyebite'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'eyebite'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'eyebite'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fabricate'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fabricate'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'faerie-fire'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'false-life'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'false-life'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'false-vision'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'false-vision'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'false-vision'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fear'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fear'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fear'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'feather-fall'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'feather-fall'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'feather-fall'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'feeblemind'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'feeblemind'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'find-the-path'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'find-the-path'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'find-the-path'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'find-traps'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'finger-of-death'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'finger-of-death'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'finger-of-death'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fireball'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fireball'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fire-seeds'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fire-shield'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fire-shield'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fire-storm'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fire-storm'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fire-trap'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fire-trap'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fire-trap'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'flame-arrow'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'flame-arrow'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'flame-blade'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'flame-strike'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'flame-strike'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'flaming-sphere'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'flaming-sphere'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'flaming-sphere'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'flare'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'flare'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'flare'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'flare'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'flesh-to-stone'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'flesh-to-stone'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'floating-disk'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'floating-disk'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fly'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fly'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fog-cloud'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fog-cloud'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fog-cloud'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'forbiddance'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'forcecage'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'forcecage'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'forceful-hand'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'forceful-hand'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'foresight'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'foresight'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'foresight'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fox-s-cunning'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fox-s-cunning'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fox-s-cunning'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fox-s-cunning-mass'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fox-s-cunning-mass'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'fox-s-cunning-mass'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'freedom'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'freedom'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'freedom-of-movement'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'freedom-of-movement'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'freedom-of-movement'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'freedom-of-movement'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'freezing-sphere'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'freezing-sphere'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'gaseous-form'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'gaseous-form'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'gaseous-form'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'gate'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'gate'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'gate'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'geas-lesser'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'geas-lesser'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'geas-lesser'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'geas-quest'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'geas-quest'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'geas-quest'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'geas-quest'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'gentle-repose'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'gentle-repose'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'gentle-repose'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ghost-sound'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ghost-sound'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ghost-sound'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ghoul-touch'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ghoul-touch'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'giant-vermin'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'giant-vermin'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'glibness'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'glitterdust'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'glitterdust'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'glitterdust'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'globe-of-invulnerability'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'globe-of-invulnerability'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'globe-of-invulnerability-lesser'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'globe-of-invulnerability-lesser'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'glyph-of-warding'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'glyph-of-warding-greater'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'goodberry'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'good-hope'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'grasping-hand'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'grasping-hand'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'grease'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'grease'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'grease'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'guards-and-wards'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'guards-and-wards'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'guidance'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'guidance'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'gust-of-wind'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'gust-of-wind'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'gust-of-wind'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hallow'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hallow'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hallucinatory-terrain'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hallucinatory-terrain'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hallucinatory-terrain'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'halt-undead'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'halt-undead'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'harm'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'haste'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'haste'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'haste'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'heal'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'heal'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'heal-mass'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'heal-mount'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'heat-metal'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'helping-hand'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'heroes-feast'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'heroes-feast'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'heroism'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'heroism'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'heroism'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'heroism-greater'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'heroism-greater'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'heroism-greater'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hide-from-animals'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hide-from-animals'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hide-from-undead'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hideous-laughter'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hideous-laughter'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hideous-laughter'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-animal'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-animal'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-monster'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-monster'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-monster'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-monster-mass'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-monster-mass'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-person'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-person'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-person'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-person'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-person-mass'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-person-mass'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-portal'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hold-portal'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'holy-aura'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'holy-sword'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'holy-word'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'horrid-wilting'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'horrid-wilting'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hypnotic-pattern'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hypnotic-pattern'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hypnotic-pattern'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hypnotism'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hypnotism'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'hypnotism'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ice-storm'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ice-storm'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ice-storm'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'identify'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'identify'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'identify'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'illusory-script'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'illusory-script'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'illusory-script'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'illusory-wall'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'illusory-wall'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'imbue-with-spell-ability'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'implosion'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'imprisonment'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'imprisonment'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'incendiary-cloud'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'incendiary-cloud'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'inflict-critical-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'inflict-critical-wounds-mass'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'inflict-light-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'inflict-light-wounds-mass'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'inflict-minor-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'inflict-moderate-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'inflict-moderate-wounds-mass'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'inflict-serious-wounds'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'inflict-serious-wounds-mass'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'insanity'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'insanity'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'insect-plague'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'insect-plague'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'instant-summons'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'instant-summons'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'interposing-hand'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'interposing-hand'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'invisibility'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'invisibility'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'invisibility'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'invisibility-greater'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'invisibility-greater'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'invisibility-greater'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'invisibility-mass'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'invisibility-mass'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'invisibility-purge'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'invisibility-sphere'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'invisibility-sphere'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'invisibility-sphere'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'iron-body'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'iron-body'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ironwood'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'irresistible-dance'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'irresistible-dance'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'irresistible-dance'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'jump'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'jump'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'jump'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'jump'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'keen-edge'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'keen-edge'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'knock'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'knock'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'know-direction'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'know-direction'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'legend-lore'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'legend-lore'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'legend-lore'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'levitate'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'levitate'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'light'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'light'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'light'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'light'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'light'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'lightning-bolt'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'lightning-bolt'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'limited-wish'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'limited-wish'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'liveoak'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'locate-creature'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'locate-creature'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'locate-creature'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'locate-object'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'locate-object'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'locate-object'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'locate-object'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'longstrider'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'longstrider'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'lullaby'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-armor'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-armor'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-hand'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-hand'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-hand'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-s-disjunction'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-s-disjunction'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-s-faithful-hound'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-s-faithful-hound'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-s-magnificent-mansion'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-s-magnificent-mansion'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-s-private-sanctum'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-s-private-sanctum'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-s-sword'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mage-s-sword'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-aura'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-aura'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-aura'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-circle-against-chaos'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-circle-against-chaos'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-circle-against-chaos'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-circle-against-chaos'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-circle-against-evil'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-circle-against-evil'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-circle-against-evil'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-circle-against-evil'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-circle-against-good'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-circle-against-good'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-circle-against-good'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-circle-against-law'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-circle-against-law'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-circle-against-law'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-fang'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-fang'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-fang-greater'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-fang-greater'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-jar'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-jar'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-missile'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-missile'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-mouth'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-mouth'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-mouth'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-stone'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-stone'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-vestment'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-weapon'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-weapon'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-weapon'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-weapon'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-weapon-greater'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-weapon-greater'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-weapon-greater'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'magic-weapon-greater'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'major-creation'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'major-creation'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'major-image'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'major-image'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'major-image'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'make-whole'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mark-of-justice'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mark-of-justice'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'maze'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'maze'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'meld-into-stone'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'meld-into-stone'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mending'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mending'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mending'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mending'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mending'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'message'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'message'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'message'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'meteor-swarm'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'meteor-swarm'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mind-blank'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mind-blank'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mind-fog'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mind-fog'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mind-fog'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'minor-creation'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'minor-creation'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'minor-image'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'minor-image'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'minor-image'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'miracle'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mirage-arcana'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mirage-arcana'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mirage-arcana'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mirror-image'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mirror-image'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mirror-image'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'misdirection'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'misdirection'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'misdirection'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mislead'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mislead'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mislead'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'modify-memory'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'moment-of-prescience'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'moment-of-prescience'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mount'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'mount'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'move-earth'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'move-earth'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'move-earth'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'neutralize-poison'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'neutralize-poison'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'neutralize-poison'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'neutralize-poison'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'neutralize-poison'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'nightmare'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'nightmare'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'nightmare'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'nondetection'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'nondetection'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'nondetection'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'obscure-object'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'obscure-object'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'obscure-object'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'obscure-object'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'obscuring-mist'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'obscuring-mist'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'obscuring-mist'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'obscuring-mist'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'open-close'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'open-close'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'open-close'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'overland-flight'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'overland-flight'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'owl-s-wisdom'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'owl-s-wisdom'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'owl-s-wisdom'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'owl-s-wisdom'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'owl-s-wisdom'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'owl-s-wisdom'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'owl-s-wisdom-mass'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'owl-s-wisdom-mass'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'owl-s-wisdom-mass'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'owl-s-wisdom-mass'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'passwall'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'passwall'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'pass-without-trace'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'pass-without-trace'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'permanency'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'permanency'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'permanent-image'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'permanent-image'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'permanent-image'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'persistent-image'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'persistent-image'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'persistent-image'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'phantasmal-killer'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'phantasmal-killer'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'phantom-steed'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'phantom-steed'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'phantom-steed'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'phantom-trap'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'phantom-trap'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'phase-door'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'phase-door'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'planar-ally'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'planar-ally-greater'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'planar-ally-lesser'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'planar-binding'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'planar-binding'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'planar-binding-greater'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'planar-binding-greater'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'planar-binding-lesser'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'planar-binding-lesser'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'plane-shift'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'plane-shift'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'plane-shift'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'plant-growth'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'plant-growth'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'poison'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'poison'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'polar-ray'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'polar-ray'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'polymorph'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'polymorph'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'polymorph-any-object'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'polymorph-any-object'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'power-word-blind'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'power-word-blind'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'power-word-kill'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'power-word-kill'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'power-word-stun'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'power-word-stun'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prayer'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prayer'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prestidigitation'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prestidigitation'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prestidigitation'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prismatic-sphere'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prismatic-sphere'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prismatic-spray'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prismatic-spray'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prismatic-wall'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prismatic-wall'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'produce-flame'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'programmed-image'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'programmed-image'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'programmed-image'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'project-image'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'project-image'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'project-image'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-arrows'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-arrows'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-chaos'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-chaos'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-chaos'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-chaos'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-energy'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-energy'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-energy'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-energy'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-energy'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-evil'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-evil'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-evil'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-evil'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-good'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-good'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-good'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-law'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-law'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-law'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-spells'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'protection-from-spells'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prying-eyes'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prying-eyes'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prying-eyes-greater'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'prying-eyes-greater'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'purify-food-and-drink'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'purify-food-and-drink'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'pyrotechnics'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'pyrotechnics'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'pyrotechnics'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'quench'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'rage'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'rage'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'rage'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'rainbow-pattern'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'rainbow-pattern'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'rainbow-pattern'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'raise-dead'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ray-of-enfeeblement'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ray-of-enfeeblement'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ray-of-exhaustion'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ray-of-exhaustion'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ray-of-frost'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ray-of-frost'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'read-magic'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'read-magic'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'read-magic'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'read-magic'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'read-magic'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'read-magic'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'read-magic'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'reduce-animal'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'reduce-animal'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'reduce-person'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'reduce-person'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'reduce-person-mass'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'reduce-person-mass'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'refuge'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'refuge'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'refuge'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'regenerate'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'regenerate'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'reincarnate'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'remove-blindness-deafness'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'remove-blindness-deafness'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'remove-curse'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'remove-curse'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'remove-curse'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'remove-curse'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'remove-curse'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'remove-disease'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'remove-disease'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'remove-disease'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'remove-fear'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'remove-fear'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'remove-paralysis'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'remove-paralysis'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'repel-metal-or-stone'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'repel-vermin'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'repel-vermin'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'repel-vermin'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'repel-vermin'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'repel-wood'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'repulsion'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'repulsion'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'repulsion'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resilient-sphere'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resilient-sphere'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resistance'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resistance'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resistance'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resistance'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resistance'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resistance'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resist-energy'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resist-energy'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resist-energy'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resist-energy'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resist-energy'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resist-energy'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'restoration'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'restoration'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'restoration-greater'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'restoration-lesser'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'restoration-lesser'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'restoration-lesser'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'resurrection'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'reverse-gravity'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'reverse-gravity'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'reverse-gravity'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'righteous-might'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'rope-trick'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'rope-trick'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'rusting-grasp'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sanctuary'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scare'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scare'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scare'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scintillating-pattern'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scintillating-pattern'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scorching-ray'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scorching-ray'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'screen'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'screen'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scrying'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scrying'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scrying'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scrying'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scrying'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scrying-greater'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scrying-greater'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scrying-greater'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scrying-greater'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'scrying-greater'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sculpt-sound'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'searing-light'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'secret-chest'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'secret-chest'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'secret-page'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'secret-page'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'secret-page'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'secure-shelter'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'secure-shelter'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'secure-shelter'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'see-invisibility'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'see-invisibility'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'see-invisibility'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'seeming'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'seeming'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'seeming'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sending'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sending'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sending'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sepia-snake-sigil'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sepia-snake-sigil'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sepia-snake-sigil'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sequester'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sequester'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shades'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shades'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shadow-conjuration'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shadow-conjuration'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shadow-conjuration'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shadow-conjuration-greater'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shadow-conjuration-greater'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shadow-evocation'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shadow-evocation'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shadow-evocation'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shadow-evocation-greater'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shadow-evocation-greater'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shadow-walk'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shadow-walk'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shadow-walk'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shambler'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shapechange'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shapechange'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shapechange'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shatter'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shatter'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shatter'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shatter'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shield'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shield'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shield-of-faith'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shield-of-law'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shield-other'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shield-other'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shillelagh'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shocking-grasp'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shocking-grasp'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shout'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shout'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shout'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shout-greater'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shout-greater'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shout-greater'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shrink-item'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'shrink-item'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'silence'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'silence'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'silent-image'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'silent-image'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'silent-image'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'simulacrum'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'simulacrum'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'slay-living'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sleep'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sleep'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sleep'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sleet-storm'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sleet-storm'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sleet-storm'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'slow'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'slow'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'slow'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'snare'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'snare'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'soften-earth-and-stone'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'solid-fog'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'solid-fog'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'song-of-discord'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'soul-bind'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'soul-bind'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'soul-bind'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sound-burst'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sound-burst'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'speak-with-animals'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'speak-with-animals'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'speak-with-animals'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'speak-with-dead'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'speak-with-plants'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'speak-with-plants'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'speak-with-plants'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spectral-hand'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spectral-hand'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spell-immunity'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spell-immunity-greater'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spell-resistance'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spellstaff'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spell-turning'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spell-turning'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spider-climb'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spider-climb'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spider-climb'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spike-growth'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spike-growth'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spike-stones'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'spiritual-weapon'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'statue'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'statue'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'status'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'stinking-cloud'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'stinking-cloud'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'stone-shape'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'stone-shape'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'stone-shape'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'stone-shape'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'stoneskin'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'stoneskin'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'stoneskin'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'stone-tell'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'stone-to-flesh'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'stone-to-flesh'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'storm-of-vengeance'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'storm-of-vengeance'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'suggestion'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'suggestion'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'suggestion'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'suggestion-mass'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'suggestion-mass'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'suggestion-mass'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-instrument'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-i'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-i'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-i'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-i'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-ii'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-ii'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-ii'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-ii'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-iii'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-iii'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-iii'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-iii'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-iv'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-iv'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-iv'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-iv'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-ix'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-ix'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-ix'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-v'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-v'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-v'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-v'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-vi'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-vi'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-vi'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-vi'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-vii'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-vii'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-vii'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-viii'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-viii'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-monster-viii'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-nature-s-ally-i'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-nature-s-ally-i'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-nature-s-ally-ii'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-nature-s-ally-ii'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-nature-s-ally-iii'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-nature-s-ally-iii'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-nature-s-ally-iv'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-nature-s-ally-iv'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-nature-s-ally-ix'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-nature-s-ally-v'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-nature-s-ally-vi'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-nature-s-ally-vii'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-nature-s-ally-viii'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-swarm'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-swarm'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-swarm'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'summon-swarm'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sunbeam'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sunburst'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sunburst'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sunburst'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-death'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-death'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-death'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-fear'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-fear'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-fear'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-insanity'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-insanity'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-insanity'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-pain'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-pain'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-pain'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-persuasion'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-persuasion'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-persuasion'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-sleep'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-sleep'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-sleep'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-stunning'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-stunning'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-stunning'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-weakness'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-weakness'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'symbol-of-weakness'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sympathetic-vibration'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sympathy'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sympathy'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'sympathy'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'telekinesis'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'telekinesis'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'telekinetic-sphere'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'telekinetic-sphere'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'telepathic-bond'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'telepathic-bond'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'teleport'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'teleport'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'teleportation-circle'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'teleportation-circle'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'teleport-greater'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'teleport-greater'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'teleport-object'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'teleport-object'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'temporal-stasis'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'temporal-stasis'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'time-stop'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'time-stop'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'tiny-hut'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'tiny-hut'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'tiny-hut'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'tongues'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'tongues'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'tongues'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'tongues'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'touch-of-fatigue'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'touch-of-fatigue'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'touch-of-idiocy'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'touch-of-idiocy'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'transformation'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'transformation'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'transmute-metal-to-wood'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'transmute-mud-to-rock'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'transmute-mud-to-rock'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'transmute-mud-to-rock'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'transmute-rock-to-mud'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'transmute-rock-to-mud'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'transmute-rock-to-mud'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'transport-via-plants'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'trap-the-soul'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'trap-the-soul'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'tree-shape'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'tree-shape'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'tree-stride'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'tree-stride'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'true-resurrection'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'true-seeing'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'true-seeing'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'true-seeing'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'true-seeing'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'true-strike'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'true-strike'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'undeath-to-death'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'undeath-to-death'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'undeath-to-death'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'undetectable-alignment'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'undetectable-alignment'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'undetectable-alignment'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'unhallow'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'unhallow'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'unholy-aura'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'unseen-servant'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'unseen-servant'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'unseen-servant'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'vampiric-touch'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'vampiric-touch'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'veil'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'veil'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'veil'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ventriloquism'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ventriloquism'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'ventriloquism'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'virtue'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'virtue'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    0
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'virtue'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    1
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'vision'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'vision'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wail-of-the-banshee'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wail-of-the-banshee'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wall-of-fire'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wall-of-fire'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wall-of-fire'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wall-of-force'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wall-of-force'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wall-of-ice'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wall-of-ice'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wall-of-iron'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wall-of-iron'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wall-of-stone'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wall-of-stone'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wall-of-stone'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wall-of-stone'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wall-of-thorns'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'warp-wood'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'water-breathing'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'water-breathing'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'water-breathing'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'water-breathing'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'water-walk'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'water-walk'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'waves-of-exhaustion'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'waves-of-exhaustion'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'waves-of-fatigue'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'waves-of-fatigue'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    5
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'web'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'web'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'weird'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'weird'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'whirlwind'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'whispering-wind'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'whispering-wind'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'whispering-wind'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wind-walk'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wind-walk'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wind-wall'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wind-wall'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wind-wall'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wind-wall'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    3
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wind-wall'),
    (SELECT id FROM public.classes WHERE slug = 'ranger'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wish'),
    (SELECT id FROM public.classes WHERE slug = 'sorcerer'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wish'),
    (SELECT id FROM public.classes WHERE slug = 'wizard'),
    9
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'wood-shape'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'word-of-chaos'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    7
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'word-of-recall'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    6
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'word-of-recall'),
    (SELECT id FROM public.classes WHERE slug = 'druid'),
    8
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'zone-of-silence'),
    (SELECT id FROM public.classes WHERE slug = 'bard'),
    4
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'zone-of-truth'),
    (SELECT id FROM public.classes WHERE slug = 'cleric'),
    2
  ),
  (
    (SELECT id FROM public.spells WHERE slug = 'zone-of-truth'),
    (SELECT id FROM public.classes WHERE slug = 'paladin'),
    2
  )
ON CONFLICT (spell_id, class_id) DO UPDATE
  SET spell_level = EXCLUDED.spell_level;

-- Verificación
SELECT
  'Niveles de hechizo insertados' AS status,
  COUNT(*) AS total_relations
FROM public.spell_class_levels;

-- Estadísticas por clase
SELECT
  c.name as class_name,
  COUNT(*) as spell_count
FROM public.spell_class_levels scl
JOIN public.classes c ON scl.class_id = c.id
GROUP BY c.name
ORDER BY spell_count DESC;

-- Estadísticas por nivel de conjuro (Sorcerer/Wizard)
SELECT
  scl.spell_level,
  COUNT(*) as count
FROM public.spell_class_levels scl
JOIN public.classes c ON scl.class_id = c.id
WHERE c.slug IN ('sorcerer', 'wizard')
GROUP BY scl.spell_level
ORDER BY scl.spell_level;

-- Ver algunos ejemplos
SELECT
  s.name as spell_name,
  c.name as class_name,
  scl.spell_level
FROM public.spell_class_levels scl
JOIN public.spells s ON scl.spell_id = s.id
JOIN public.classes c ON scl.class_id = c.id
ORDER BY s.name, c.name
LIMIT 20;
