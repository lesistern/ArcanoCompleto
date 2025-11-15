-- ============================================================================
-- CONJUROS DEL PLAYER'S HANDBOOK - PARTE 5/7
-- Conjuros 401-500 de 608 totales
-- Datos extraídos de d20srd.org
-- ============================================================================

-- Insertar conjuros (parte 5)
INSERT INTO public.spells (
  slug, name, name_es,
  school, subschool, descriptor,
  level,
  verbal, somatic, material_component, focus, divine_focus, xp_component,
  material_description, focus_description, xp_cost_description,
  casting_time, range, target, area, effect, duration,
  saving_throw, spell_resistance,
  description, description_es
)
VALUES
  ('project-image', 'Project Image', 'Project Image', 'Ilusión', 'Sombra', NULL, '{"sorcerer":7,"wizard":7,"bard":6}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'One Sombra duplicate', '1 round/Nivel (D)', 'Voluntad incredulidad (if interacted with)', false, 'You tap energy from the Plane of Shadow to create a quasi-real, illusory version of yourself. The projected image looks, sounds, and smells like you but is intangible. The projected image mimics your actions (including speech) unless you direct it to act differently (which is a move action).

You can see through its eyes and hear through its ears as if you were standing where it is, and during your turn you can switch from using its senses to using your own, or back again, as a free action. While you are using its senses, your body is considered blinded and deafened.

If you desire, any spell you cast whose range is touch or greater can originate from the projected image instead of from you. The projected image can’t cast any spells on itself except for illusion spells. The spells affect other targets normally, despite originating from the projected image.

Objects are affected by the projected image as if they had succeeded on their Will save.

You must maintain line of effect to the projected image at all times. If your line of effect is obstructed, the spell ends. If you use dimension door, teleport, plane shift, or a similar spell that breaks your line of effect, even momentarily, the spell ends.

A small replica of you (a doll), which costs 5 gp to create.', 'You tap energy from the Plane of Shadow to create a quasi-real, illusory version of yourself. The projected image looks, sounds, and smells like you but is intangible. The projected image mimics your actions (including speech) unless you direct it to act differently (which is a move action).

You can see through its eyes and hear through its ears as if you were standing where it is, and during your turn you can switch from using its senses to using your own, or back again, as a free action. While you are using its senses, your body is considered blinded and deafened.

If you desire, any spell you cast whose range is touch or greater can originate from the projected image instead of from you. The projected image can’t cast any spells on itself except for illusion spells. The spells affect other targets normally, despite originating from the projected image.

Objects are affected by the projected image as if they had succeeded on their Will save.

You must maintain line of effect to the projected image at all times. If your line of effect is obstructed, the spell ends. If you use dimension door, teleport, plane shift, or a similar spell that breaks your line of effect, even momentarily, the spell ends.

A small replica of you (a doll), which costs 5 gp to create.'),
  ('protection-from-arrows', 'Protection from Arrows', 'Protection from Arrows', 'Abjuración', NULL, NULL, '{"sorcerer":2,"wizard":2}'::JSONB, true, true, false, true, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 hour/Nivel or until discharged', 'Voluntad anula (harmless)', true, 'The warded creature gains resistance to ranged weapons. The subject gains damage reduction 10/magic against ranged weapons. (This spell doesn’t grant you the ability to damage creatures with similar damage reduction.) Once the spell has prevented a total of 10 points of damage per caster level (maximum 100 points), it is discharged.

A piece of shell from a tortoise or a turtle.', 'The warded creature gains resistance to ranged weapons. The subject gains damage reduction 10/magic against ranged weapons. (This spell doesn’t grant you the ability to damage creatures with similar damage reduction.) Once the spell has prevented a total of 10 points of damage per caster level (maximum 100 points), it is discharged.

A piece of shell from a tortoise or a turtle.'),
  ('protection-from-chaos', 'Protection from Chaos', 'Protection from Chaos', 'Abjuración', NULL, ARRAY['Legal']::TEXT[], '{"sorcerer":1,"wizard":1,"cleric":1,"paladin":1}'::JSONB, false, false, false, false, false, false, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'This spell functions like protection from evil, except that the deflection and resistance bonuses apply to attacks from chaotic creatures, and chaotic summoned creatures cannot touch the subject.', 'This spell functions like protection from evil, except that the deflection and resistance bonuses apply to attacks from chaotic creatures, and chaotic summoned creatures cannot touch the subject.'),
  ('protection-from-energy', 'Protection from Energy', 'Protection from Energy', 'Abjuración', NULL, NULL, '{"sorcerer":3,"wizard":3,"cleric":3,"druid":3,"ranger":2}'::JSONB, true, true, false, false, true, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '10 min./Nivel or until discharged', 'Fortaleza anula (harmless)', true, 'Protection from energy grants temporary immunity to the type of energy you specify when you cast it (acid, cold, electricity, fire, or sonic). When the spell absorbs 12 points per caster level of energy damage (to a maximum of 120 points at 10th level), it is discharged.

Note: Protection from energy overlaps (and does not stack with) resist energy. If a character is warded by protection from energy and resist energy, the protection spell absorbs damage until its power is exhausted.', 'Protection from energy grants temporary immunity to the type of energy you specify when you cast it (acid, cold, electricity, fire, or sonic). When the spell absorbs 12 points per caster level of energy damage (to a maximum of 120 points at 10th level), it is discharged.

Note: Protection from energy overlaps (and does not stack with) resist energy. If a character is warded by protection from energy and resist energy, the protection spell absorbs damage until its power is exhausted.'),
  ('protection-from-evil', 'Protection from Evil', 'Protection from Evil', 'Abjuración', NULL, ARRAY['Bondadoso']::TEXT[], '{"sorcerer":1,"wizard":1,"cleric":1,"paladin":1}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 min./Nivel (D)', 'Voluntad anula (harmless)', false, 'This spell wards a creature from attacks by evil creatures, from mental control, and from summoned creatures. It creates a magical barrier around the subject at a distance of 1 foot. The barrier moves with the subject and has three major effects.

First, the subject gains a +2 deflection bonus to AC and a +2 resistance bonus on saves. Both these bonuses apply against attacks made or effects created by evil creatures.

Second, the barrier blocks any attempt to possess the warded creature (by a magic jar attack, for example) or to exercise mental control over the creature (including enchantment (charm) effects and enchantment (compulsion) effects that grant the caster ongoing control over the subject, such as dominate person). The protection does not prevent such effects from targeting the protected creature, but it suppresses the effect for the duration of the protection from evil effect. If the protection from evil effect ends before the effect granting mental control does, the would-be controller would then be able to mentally command the controlled creature. Likewise, the barrier keeps out a possessing life force but does not expel one if it is in place before the spell is cast. This second effect works regardless of alignment.

Third, the spell prevents bodily contact by summoned creatures. This causes the natural weapon attacks of such creatures to fail and the creatures to recoil if such attacks require touching the warded creature. Good summoned creatures are immune to this effect. The protection against contact by summoned creatures ends if the warded creature makes an attack against or tries to force the barrier against the blocked creature. Spell resistance can allow a creature to overcome this protection and touch the warded creature.

A little powdered silver with which you trace a 3-foot -diameter circle on the floor (or ground) around the creature to be warded.', 'This spell wards a creature from attacks by evil creatures, from mental control, and from summoned creatures. It creates a magical barrier around the subject at a distance of 1 foot. The barrier moves with the subject and has three major effects.

First, the subject gains a +2 deflection bonus to AC and a +2 resistance bonus on saves. Both these bonuses apply against attacks made or effects created by evil creatures.

Second, the barrier blocks any attempt to possess the warded creature (by a magic jar attack, for example) or to exercise mental control over the creature (including enchantment (charm) effects and enchantment (compulsion) effects that grant the caster ongoing control over the subject, such as dominate person). The protection does not prevent such effects from targeting the protected creature, but it suppresses the effect for the duration of the protection from evil effect. If the protection from evil effect ends before the effect granting mental control does, the would-be controller would then be able to mentally command the controlled creature. Likewise, the barrier keeps out a possessing life force but does not expel one if it is in place before the spell is cast. This second effect works regardless of alignment.

Third, the spell prevents bodily contact by summoned creatures. This causes the natural weapon attacks of such creatures to fail and the creatures to recoil if such attacks require touching the warded creature. Good summoned creatures are immune to this effect. The protection against contact by summoned creatures ends if the warded creature makes an attack against or tries to force the barrier against the blocked creature. Spell resistance can allow a creature to overcome this protection and touch the warded creature.

A little powdered silver with which you trace a 3-foot -diameter circle on the floor (or ground) around the creature to be warded.'),
  ('protection-from-good', 'Protection from Good', 'Protection from Good', 'Abjuración', NULL, ARRAY['Maligno']::TEXT[], '{"sorcerer":1,"wizard":1,"cleric":1}'::JSONB, false, false, false, false, false, false, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'This spell functions like protection from evil, except that the deflection and resistance bonuses apply to attacks from good creatures, and good summoned creatures cannot touch the subject.', 'This spell functions like protection from evil, except that the deflection and resistance bonuses apply to attacks from good creatures, and good summoned creatures cannot touch the subject.'),
  ('protection-from-law', 'Protection from Law', 'Protection from Law', 'Abjuración', NULL, ARRAY['Caótico']::TEXT[], '{"sorcerer":1,"wizard":1,"cleric":1}'::JSONB, false, false, false, false, false, false, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'This spell functions like protection from evil, except that the deflection and resistance bonuses apply to attacks from lawful creatures, and lawful summoned creatures cannot touch the subject.', 'This spell functions like protection from evil, except that the deflection and resistance bonuses apply to attacks from lawful creatures, and lawful summoned creatures cannot touch the subject.'),
  ('protection-from-spells', 'Protection from Spells', 'Protection from Spells', 'Abjuración', NULL, NULL, '{"sorcerer":8,"wizard":8}'::JSONB, true, true, true, true, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Up to one creature touched per four levels', NULL, NULL, '10 min./Nivel', 'Voluntad anula (harmless)', true, 'The subject gains a +8 resistance bonus on saving throws against spells and spell-like abilities (but not against supernatural and extraordinary abilities).

A diamond of at least 500 gp value, which must be crushed and sprinkled over the targets.

One 1,000 gp diamond per creature to be granted the protection. Each subject must carry one such gem for the duration of the spell. If a subject loses the gem, the spell ceases to affect him.', 'The subject gains a +8 resistance bonus on saving throws against spells and spell-like abilities (but not against supernatural and extraordinary abilities).

A diamond of at least 500 gp value, which must be crushed and sprinkled over the targets.

One 1,000 gp diamond per creature to be granted the protection. Each subject must carry one such gem for the duration of the spell. If a subject loses the gem, the spell ceases to affect him.'),
  ('prying-eyes', 'Prying Eyes', 'Prying Eyes', 'Adivinación', NULL, NULL, '{"sorcerer":5,"wizard":5}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 minute', 'One mile', NULL, NULL, 'Ten or more levitating eyes', '1 hour/Nivel; see text (D)', 'Ninguna', false, 'You create a number of semitangible, visible magical orbs (called “eyes”) equal to 1d4 + your caster level. These eyes move out, scout around, and return as you direct them when casting the spell. Each eye can see 120 feet (normal vision only) in all directions.

While the individual eyes are quite fragile, they’re small and difficult to spot. Each eye is a Fine construct, about the size of a small apple, that has 1 hit point, AC 18 (+8 bonus for its size), flies at a speed of 30 feet with perfect maneuverability, and has a +16 Hide modifier. It has a Spot modifier equal to your caster level (maximum +15) and is subject to illusions, darkness, fog, and any other factors that would affect your ability to receive visual information about your surroundings. An eye traveling through darkness must find its way by touch.

When you create the eyes, you specify instructions you want them to follow in a command of no more than twenty-five words. Any knowledge you possess is known by the eyes as well.

In order to report their findings, the eyes must return to your hand. Each replays in your mind all it has seen during its existence. It takes an eye 1 round to replay 1 hour of recorded images. After relaying its findings, an eye disappears.

If an eye ever gets more than 1 mile away from you, it instantly ceases to exist. However, your link with the eye is such that you won’t know if the eye was destroyed because it wandered out of range or because of some other event.

The eyes exist for up to 1 hour per caster level or until they return to you. Dispel magic can destroy eyes. Roll separately for each eye caught in an area dispel. Of course, if an eye is sent into darkness, it could hit a wall or similar obstacle and destroy itself.

A handful of crystal marbles.', 'You create a number of semitangible, visible magical orbs (called “eyes”) equal to 1d4 + your caster level. These eyes move out, scout around, and return as you direct them when casting the spell. Each eye can see 120 feet (normal vision only) in all directions.

While the individual eyes are quite fragile, they’re small and difficult to spot. Each eye is a Fine construct, about the size of a small apple, that has 1 hit point, AC 18 (+8 bonus for its size), flies at a speed of 30 feet with perfect maneuverability, and has a +16 Hide modifier. It has a Spot modifier equal to your caster level (maximum +15) and is subject to illusions, darkness, fog, and any other factors that would affect your ability to receive visual information about your surroundings. An eye traveling through darkness must find its way by touch.

When you create the eyes, you specify instructions you want them to follow in a command of no more than twenty-five words. Any knowledge you possess is known by the eyes as well.

In order to report their findings, the eyes must return to your hand. Each replays in your mind all it has seen during its existence. It takes an eye 1 round to replay 1 hour of recorded images. After relaying its findings, an eye disappears.

If an eye ever gets more than 1 mile away from you, it instantly ceases to exist. However, your link with the eye is such that you won’t know if the eye was destroyed because it wandered out of range or because of some other event.

The eyes exist for up to 1 hour per caster level or until they return to you. Dispel magic can destroy eyes. Roll separately for each eye caught in an area dispel. Of course, if an eye is sent into darkness, it could hit a wall or similar obstacle and destroy itself.

A handful of crystal marbles.'),
  ('prying-eyes-greater', 'Prying Eyes, Greater', 'Prying Eyes, Greater', 'Adivinación', NULL, NULL, '{"sorcerer":8,"wizard":8}'::JSONB, false, false, false, false, false, false, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'This spell functions like prying eyes, except that the eyes can see all things as they actually are, just as if they had true seeing with a range of 120 feet. Thus, they can navigate darkened areas at full normal speed. Also, a greater prying eye’s maximum Spot modifier is +25 instead of +15.', 'This spell functions like prying eyes, except that the eyes can see all things as they actually are, just as if they had true seeing with a range of 120 feet. Thus, they can navigate darkened areas at full normal speed. Also, a greater prying eye’s maximum Spot modifier is +25 instead of +15.'),
  ('purify-food-and-drink', 'Purify Food and Drink', 'Purify Food and Drink', 'Transmutación', NULL, NULL, '{"cleric":0,"druid":0}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', '10 ft.', '1 cu. ft./Nivel of contaminated food and Agua', NULL, NULL, 'Instantáneo', 'Voluntad anula (object)', true, 'This spell makes spoiled, rotten, poisonous, or otherwise contaminated food and water pure and suitable for eating and drinking. This spell does not prevent subsequent natural decay or spoilage. Unholy water and similar food and drink of significance is spoiled by purify food and drink, but the spell has no effect on creatures of any type nor upon magic potions.

Note: Water weighs about 8 pounds per gallon. One cubic foot of water contains roughly 8 gallons and weighs about 60 pounds.', 'This spell makes spoiled, rotten, poisonous, or otherwise contaminated food and water pure and suitable for eating and drinking. This spell does not prevent subsequent natural decay or spoilage. Unholy water and similar food and drink of significance is spoiled by purify food and drink, but the spell has no effect on creatures of any type nor upon magic potions.

Note: Water weighs about 8 pounds per gallon. One cubic foot of water contains roughly 8 gallons and weighs about 60 pounds.'),
  ('pyrotechnics', 'Pyrotechnics', 'Pyrotechnics', 'Transmutación', NULL, NULL, '{"sorcerer":2,"wizard":2,"bard":2}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', 'One Fuego source, up to a 20-ft. cube', NULL, NULL, '1d4+1 rounds, or 1d4+1 rounds after creatures leave the smoke cloud; see text', 'Voluntad anula or Fortaleza anula; see text', true, 'Pyrotechnics turns a fire into either a burst of blinding fireworks or a thick cloud of choking smoke, depending on the version you choose.

The fireworks are a flashing, fiery, momentary burst of glowing, colored aerial lights. This effect causes creatures within 120 feet of the fire source to become blinded for 1d4+1 rounds (Will negates). These creatures must have line of sight to the fire to be affected. Spell resistance can prevent blindness.

A writhing stream of smoke billows out from the source, forming a choking cloud. The cloud spreads 20 feet in all directions and lasts for 1 round per caster level. All sight, even darkvision, is ineffective in or through the cloud. All within the cloud take -4 penalties to Strength and Dexterity (Fortitude negates). These effects last for 1d4+1 rounds after the cloud dissipates or after the creature leaves the area of the cloud. Spell resistance does not apply.

The spell uses one fire source, which is immediately extinguished. A fire so large that it exceeds a 20-foot cube is only partly extinguished. Magical fires are not extinguished, although a fire-based creature used as a source takes 1 point of damage per caster level.', 'Pyrotechnics turns a fire into either a burst of blinding fireworks or a thick cloud of choking smoke, depending on the version you choose.

The fireworks are a flashing, fiery, momentary burst of glowing, colored aerial lights. This effect causes creatures within 120 feet of the fire source to become blinded for 1d4+1 rounds (Will negates). These creatures must have line of sight to the fire to be affected. Spell resistance can prevent blindness.

A writhing stream of smoke billows out from the source, forming a choking cloud. The cloud spreads 20 feet in all directions and lasts for 1 round per caster level. All sight, even darkvision, is ineffective in or through the cloud. All within the cloud take -4 penalties to Strength and Dexterity (Fortitude negates). These effects last for 1d4+1 rounds after the cloud dissipates or after the creature leaves the area of the cloud. Spell resistance does not apply.

The spell uses one fire source, which is immediately extinguished. A fire so large that it exceeds a 20-foot cube is only partly extinguished. Magical fires are not extinguished, although a fire-based creature used as a source takes 1 point of damage per caster level.'),
  ('quench', 'Quench', 'Quench', 'Transmutación', NULL, NULL, '{"druid":3}'::JSONB, true, true, false, false, true, false, NULL, NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, NULL, 'Instantáneo', 'Ninguna or Voluntad anula (object)', true, 'Quench is often used to put out forest fires and other conflagrations. It extinguishes all nonmagical fires in its area. The spell also dispels any fire spells in its area, though you must succeed on a dispel check (1d20 +1 per caster level, maximum +15) against each spell to dispel it. The DC to dispel such spells is 11 + the caster level of the fire spell.

Each elemental (fire) creature within the area of a quench spell takes 1d6 points of damage per caster level (maximum 15d6, no save allowed).

Alternatively, you can target the spell on a single magic item that creates or controls flame. The item loses all its fire-based magical abilities for 1d4 hours unless it succeeds on a Will save. (Artifacts are immune to this effect.)', 'Quench is often used to put out forest fires and other conflagrations. It extinguishes all nonmagical fires in its area. The spell also dispels any fire spells in its area, though you must succeed on a dispel check (1d20 +1 per caster level, maximum +15) against each spell to dispel it. The DC to dispel such spells is 11 + the caster level of the fire spell.

Each elemental (fire) creature within the area of a quench spell takes 1d6 points of damage per caster level (maximum 15d6, no save allowed).

Alternatively, you can target the spell on a single magic item that creates or controls flame. The item loses all its fire-based magical abilities for 1d4 hours unless it succeeds on a Will save. (Artifacts are immune to this effect.)'),
  ('rage', 'Rage', 'Rage', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '{"sorcerer":3,"wizard":3,"bard":2}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'One willing living creature per three levels, No two of which may be more than 30 ft. apart', NULL, NULL, 'Concentración + 1 round/Nivel (D)', 'Ninguna', true, 'Each affected creature gains a +2 morale bonus to Strength and Constitution, a +1 morale bonus on Will saves, and a -2 penalty to AC. The effect is otherwise identical with a barbarian’s rage except that the subjects aren’t fatigued at the end of the rage.', 'Each affected creature gains a +2 morale bonus to Strength and Constitution, a +1 morale bonus on Will saves, and a -2 penalty to AC. The effect is otherwise identical with a barbarian’s rage except that the subjects aren’t fatigued at the end of the rage.'),
  ('rainbow-pattern', 'Rainbow Pattern', 'Rainbow Pattern', 'Ilusión', 'Patrón', ARRAY['Afecta la Mente']::TEXT[], '{"sorcerer":4,"wizard":4,"bard":4}'::JSONB, false, true, true, false, false, false, NULL, NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Colorful lights with a 20-ft.-radius spread', 'Concentración +1 round/ Nivel (D)', 'Voluntad anula', true, 'A glowing, rainbow-hued pattern of interweaving colors fascinates those within it. Rainbow pattern fascinates a maximum of 24 Hit Dice of creatures. Creatures with the fewest HD are affected first. Among creatures with equal HD, those who are closest to the spell’s point of origin are affected first. An affected creature that fails its saves is fascinated by the pattern.

With a simple gesture (a free action), you can make the rainbow pattern move up to 30 feet per round (moving its effective point of origin). All fascinated creatures follow the moving rainbow of light, trying to get or remain within the effect. Fascinated creatures who are restrained and removed from the pattern still try to follow it. If the pattern leads its subjects into a dangerous area each fascinated creature gets a second save. If the view of the lights is completely blocked creatures who can’t see them are no longer affected.

The spell does not affect sightless creatures.

A wizard or sorcerer need not utter a sound to cast this spell, but a bard must sing, play music, or recite a rhyme as a verbal component.

A piece of phosphor.

A crystal prism.', 'A glowing, rainbow-hued pattern of interweaving colors fascinates those within it. Rainbow pattern fascinates a maximum of 24 Hit Dice of creatures. Creatures with the fewest HD are affected first. Among creatures with equal HD, those who are closest to the spell’s point of origin are affected first. An affected creature that fails its saves is fascinated by the pattern.

With a simple gesture (a free action), you can make the rainbow pattern move up to 30 feet per round (moving its effective point of origin). All fascinated creatures follow the moving rainbow of light, trying to get or remain within the effect. Fascinated creatures who are restrained and removed from the pattern still try to follow it. If the pattern leads its subjects into a dangerous area each fascinated creature gets a second save. If the view of the lights is completely blocked creatures who can’t see them are no longer affected.

The spell does not affect sightless creatures.

A wizard or sorcerer need not utter a sound to cast this spell, but a bard must sing, play music, or recite a rhyme as a verbal component.

A piece of phosphor.

A crystal prism.'),
  ('raise-dead', 'Raise Dead', 'Raise Dead', 'Conjuración', 'Curación', NULL, '{"cleric":5}'::JSONB, true, true, true, false, true, false, NULL, NULL, NULL, '1 minute', 'Toque', 'Dead creature touched', NULL, NULL, 'Instantáneo', 'Ninguna; see text', true, 'You restore life to a deceased creature. You can raise a creature that has been dead for no longer than one day per caster level. In addition, the subject’s soul must be free and willing to return. If the subject’s soul is not willing to return, the spell does not work; therefore, a subject that wants to return receives no saving throw.

Coming back from the dead is an ordeal. The subject of the spell loses one level (or 1 Hit Die) when it is raised, just as if it had lost a level or a Hit Die to an energy-draining creature. If the subject is 1st level, it loses 2 points of Constitution instead (if this would reduce its Con to 0 or less, it can’t be raised). This level/HD loss or Constitution loss cannot be repaired by any means. A character who died with spells prepared has a 50% chance of losing any given spell upon being raised, in addition to losing spells for losing a level. A spellcasting creature that doesn’t prepare spells (such as a sorcerer) has a 50% chance of losing any given unused spell slot as if it had been used to cast a spell, in addition to losing spell slots for losing a level.

A raised creature has a number of hit points equal to its current Hit Dice. Any ability scores damaged to 0 are raised to 1. Normal poison and normal disease are cured in the process of raising the subject, but magical diseases and curses are not undone. While the spell closes mortal wounds and repairs lethal damage of most kinds, the body of the creature to be raised must be whole. Otherwise, missing parts are still missing when the creature is brought back to life. None of the dead creature’s equipment or possessions are affected in any way by this spell.

A creature who has been turned into an undead creature or killed by a death effect can’t be raised by this spell. Constructs, elementals, outsiders, and undead creatures can’t be raised. The spell cannot bring back a creature that has died of old age.

Diamonds worth a total of least 5,000 gp.', 'You restore life to a deceased creature. You can raise a creature that has been dead for no longer than one day per caster level. In addition, the subject’s soul must be free and willing to return. If the subject’s soul is not willing to return, the spell does not work; therefore, a subject that wants to return receives no saving throw.

Coming back from the dead is an ordeal. The subject of the spell loses one level (or 1 Hit Die) when it is raised, just as if it had lost a level or a Hit Die to an energy-draining creature. If the subject is 1st level, it loses 2 points of Constitution instead (if this would reduce its Con to 0 or less, it can’t be raised). This level/HD loss or Constitution loss cannot be repaired by any means. A character who died with spells prepared has a 50% chance of losing any given spell upon being raised, in addition to losing spells for losing a level. A spellcasting creature that doesn’t prepare spells (such as a sorcerer) has a 50% chance of losing any given unused spell slot as if it had been used to cast a spell, in addition to losing spell slots for losing a level.

A raised creature has a number of hit points equal to its current Hit Dice. Any ability scores damaged to 0 are raised to 1. Normal poison and normal disease are cured in the process of raising the subject, but magical diseases and curses are not undone. While the spell closes mortal wounds and repairs lethal damage of most kinds, the body of the creature to be raised must be whole. Otherwise, missing parts are still missing when the creature is brought back to life. None of the dead creature’s equipment or possessions are affected in any way by this spell.

A creature who has been turned into an undead creature or killed by a death effect can’t be raised by this spell. Constructs, elementals, outsiders, and undead creatures can’t be raised. The spell cannot bring back a creature that has died of old age.

Diamonds worth a total of least 5,000 gp.'),
  ('ray-of-enfeeblement', 'Ray of Enfeeblement', 'Ray of Enfeeblement', 'Nigromancia', NULL, NULL, '{"sorcerer":1,"wizard":1}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Ray', '1 min./Nivel', 'Ninguna', true, 'A coruscating ray springs from your hand. You must succeed on a ranged touch attack to strike a target. The subject takes a penalty to Strength equal to 1d6+1 per two caster levels (maximum 1d6+5). The subject’s Strength score cannot drop below 1.', 'A coruscating ray springs from your hand. You must succeed on a ranged touch attack to strike a target. The subject takes a penalty to Strength equal to 1d6+1 per two caster levels (maximum 1d6+5). The subject’s Strength score cannot drop below 1.'),
  ('ray-of-exhaustion', 'Ray of Exhaustion', 'Ray of Exhaustion', 'Nigromancia', NULL, NULL, '{"sorcerer":3,"wizard":3}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Ray', '1 min./Nivel', 'Fortaleza parcial; see text', true, 'A black ray projects from your pointing finger. You must succeed on a ranged touch attack with the ray to strike a target.

The subject is immediately exhausted for the spell’s duration. A successful Fortitude save means the creature is only fatigued.

A character that is already fatigued instead becomes exhausted.

This spell has no effect on a creature that is already exhausted. Unlike normal exhaustion or fatigue, the effect ends as soon as the spell’s duration expires.

A drop of sweat.', 'A black ray projects from your pointing finger. You must succeed on a ranged touch attack with the ray to strike a target.

The subject is immediately exhausted for the spell’s duration. A successful Fortitude save means the creature is only fatigued.

A character that is already fatigued instead becomes exhausted.

This spell has no effect on a creature that is already exhausted. Unlike normal exhaustion or fatigue, the effect ends as soon as the spell’s duration expires.

A drop of sweat.'),
  ('ray-of-frost', 'Ray of Frost', 'Ray of Frost', 'Evocación', NULL, ARRAY['Frío']::TEXT[], '{"sorcerer":0,"wizard":0}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Ray', 'Instantáneo', 'Ninguna', true, 'A ray of freezing air and ice projects from your pointing finger. You must succeed on a ranged touch attack with the ray to deal damage to a target. The ray deals 1d3 points of cold damage.', 'A ray of freezing air and ice projects from your pointing finger. You must succeed on a ranged touch attack with the ray to deal damage to a target. The ray deals 1d3 points of cold damage.'),
  ('read-magic', 'Read Magic', 'Read Magic', 'Adivinación', NULL, NULL, '{"sorcerer":0,"wizard":0,"cleric":0,"druid":0,"bard":0,"paladin":1,"ranger":1}'::JSONB, true, true, false, true, false, false, NULL, NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '10 min./Nivel', NULL, NULL, 'By means of read magic, you can decipher magical inscriptions on objects—books, scrolls, weapons, and the like—that would otherwise be unintelligible. This deciphering does not normally invoke the magic contained in the writing, although it may do so in the case of a cursed scroll. Furthermore, once the spell is cast and you have read the magical inscription, you are thereafter able to read that particular writing without recourse to the use of read magic. You can read at the rate of one page (250 words) per minute. The spell allows you to identify a glyph of warding with a DC 13 Spellcraft check, a greater glyph of warding with a DC 16 Spellcraft check, or any symbol spell with a Spellcraft check (DC 10 + spell level).

Read magic can be made permanent with a permanency spell.

A clear crystal or mineral prism.', 'By means of read magic, you can decipher magical inscriptions on objects—books, scrolls, weapons, and the like—that would otherwise be unintelligible. This deciphering does not normally invoke the magic contained in the writing, although it may do so in the case of a cursed scroll. Furthermore, once the spell is cast and you have read the magical inscription, you are thereafter able to read that particular writing without recourse to the use of read magic. You can read at the rate of one page (250 words) per minute. The spell allows you to identify a glyph of warding with a DC 13 Spellcraft check, a greater glyph of warding with a DC 16 Spellcraft check, or any symbol spell with a Spellcraft check (DC 10 + spell level).

Read magic can be made permanent with a permanency spell.

A clear crystal or mineral prism.'),
  ('reduce-animal', 'Reduce Animal', 'Reduce Animal', 'Transmutación', NULL, NULL, '{"druid":2,"ranger":3}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'One willing animal of Small, Medio, Large, or Huge size', NULL, NULL, '1 hour/Nivel (D)', 'Ninguna', false, 'This spell functions like reduce person, except that it affects a single willing animal. Reduce the damage dealt by the animal’s natural attacks as appropriate for its new size.', 'This spell functions like reduce person, except that it affects a single willing animal. Reduce the damage dealt by the animal’s natural attacks as appropriate for its new size.'),
  ('reduce-person', 'Reduce Person', 'Reduce Person', 'Transmutación', NULL, NULL, '{"sorcerer":1,"wizard":1}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 round', 'Cercano (25 ft. + 5 ft./2 levels)', 'One humanoid creature', NULL, NULL, '1 min./Nivel (D)', 'Fortaleza anula', true, 'This spell causes instant diminution of a humanoid creature, halving its height, length, and width and dividing its weight by 8. This decrease changes the creature’s size category to the next smaller one. The target gains a +2 size bonus to Dexterity, a -2 size penalty to Strength (to a minimum of 1), and a +1 bonus on attack rolls and AC due to its reduced size.

A Small humanoid creature whose size decreases to Tiny has a space of 2½ feet and a natural reach of 0 feet (meaning that it must enter an opponent’s square to attack). A Large humanoid creature whose size decreases to Medium has a space of 5 feet and a natural reach of 5 feet. This spell doesn’t change the target’s speed.

All equipment worn or carried by a creature is similarly reduced by the spell.

Melee and projectile weapons deal less damage. Other magical properties are not affected by this spell. Any reduced item that leaves the reduced creature’s possession (including a projectile or thrown weapon) instantly returns to its normal size. This means that thrown weapons deal their normal damage (projectiles deal damage based on the size of the weapon that fired them).

Multiple magical effects that reduce size do not stack.

Reduce person counters and dispels enlarge person.

Reduce person can be made permanent with a permanency spell.

A pinch of powdered iron.', 'This spell causes instant diminution of a humanoid creature, halving its height, length, and width and dividing its weight by 8. This decrease changes the creature’s size category to the next smaller one. The target gains a +2 size bonus to Dexterity, a -2 size penalty to Strength (to a minimum of 1), and a +1 bonus on attack rolls and AC due to its reduced size.

A Small humanoid creature whose size decreases to Tiny has a space of 2½ feet and a natural reach of 0 feet (meaning that it must enter an opponent’s square to attack). A Large humanoid creature whose size decreases to Medium has a space of 5 feet and a natural reach of 5 feet. This spell doesn’t change the target’s speed.

All equipment worn or carried by a creature is similarly reduced by the spell.

Melee and projectile weapons deal less damage. Other magical properties are not affected by this spell. Any reduced item that leaves the reduced creature’s possession (including a projectile or thrown weapon) instantly returns to its normal size. This means that thrown weapons deal their normal damage (projectiles deal damage based on the size of the weapon that fired them).

Multiple magical effects that reduce size do not stack.

Reduce person counters and dispels enlarge person.

Reduce person can be made permanent with a permanency spell.

A pinch of powdered iron.'),
  ('reduce-person-mass', 'Reduce Person, Mass', 'Reduce Person, Mass', 'Transmutación', NULL, NULL, '{"sorcerer":4,"wizard":4}'::JSONB, false, false, false, false, false, false, NULL, NULL, NULL, NULL, NULL, 'One humanoid creature/Nivel, No two of which can be more than 30 ft. apart', NULL, NULL, NULL, NULL, NULL, 'This spell functions like reduce person, except that it affects multiple creatures.', 'This spell functions like reduce person, except that it affects multiple creatures.'),
  ('refuge', 'Refuge', 'Refuge', 'Conjuración', 'Teletransportación', NULL, '{"sorcerer":9,"wizard":9,"cleric":7}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Object touched', NULL, NULL, 'Permanente until discharged', 'Ninguna', false, 'You create powerful magic in some specially prepared object. This object contains the power to instantly transport its possessor across any distance within the same plane to your abode. Once the item is transmuted, you must give it willingly to a creature and at the same time inform it of a command word to be spoken when the item is used. To make use of the item, the subject speaks the command word at the same time that it rends or breaks the item (a standard action). When this is done, the individual and all objects it is wearing and carrying (to a maximum of the character’s heavy load) are instantly transported to your abode. No other creatures are affected (aside from a familiar that is touching the subject).

You can alter the spell when casting it so that it transports you to within 10 feet of the possessor of the item when it is broken and the command word spoken. You will have a general idea of the location and situation of the item possessor at the time the refuge spell is discharged, but once you decide to alter the spell in this fashion, you have no choice whether or not to be transported.

The specially prepared object, whose construction requires gems worth 1,500 gp.', 'You create powerful magic in some specially prepared object. This object contains the power to instantly transport its possessor across any distance within the same plane to your abode. Once the item is transmuted, you must give it willingly to a creature and at the same time inform it of a command word to be spoken when the item is used. To make use of the item, the subject speaks the command word at the same time that it rends or breaks the item (a standard action). When this is done, the individual and all objects it is wearing and carrying (to a maximum of the character’s heavy load) are instantly transported to your abode. No other creatures are affected (aside from a familiar that is touching the subject).

You can alter the spell when casting it so that it transports you to within 10 feet of the possessor of the item when it is broken and the command word spoken. You will have a general idea of the location and situation of the item possessor at the time the refuge spell is discharged, but once you decide to alter the spell in this fashion, you have no choice whether or not to be transported.

The specially prepared object, whose construction requires gems worth 1,500 gp.'),
  ('regenerate', 'Regenerate', 'Regenerate', 'Conjuración', 'Curación', NULL, '{"cleric":7,"druid":9}'::JSONB, true, true, false, false, true, false, NULL, NULL, NULL, '3 full rounds', 'Toque', 'Living creature touched', NULL, NULL, 'Instantáneo', 'Fortaleza anula (harmless)', true, 'The subject’s severed body members (fingers, toes, hands, feet, arms, legs, tails, or even heads of multiheaded creatures), broken bones, and ruined organs grow back. After the spell is cast, the physical regeneration is complete in 1 round if the severed members are present and touching the creature. It takes 2d10 rounds otherwise.

Regenerate also cures 4d8 points of damage +1 point per caster level (maximum +35), rids the subject of exhaustion and/or fatigue, and eliminates all nonlethal damage the subject has taken. It has no effect on nonliving creatures (including undead).', 'The subject’s severed body members (fingers, toes, hands, feet, arms, legs, tails, or even heads of multiheaded creatures), broken bones, and ruined organs grow back. After the spell is cast, the physical regeneration is complete in 1 round if the severed members are present and touching the creature. It takes 2d10 rounds otherwise.

Regenerate also cures 4d8 points of damage +1 point per caster level (maximum +35), rids the subject of exhaustion and/or fatigue, and eliminates all nonlethal damage the subject has taken. It has no effect on nonliving creatures (including undead).'),
  ('reincarnate', 'Reincarnate', 'Reincarnate', 'Transmutación', NULL, NULL, '{"druid":4}'::JSONB, true, true, true, false, true, false, NULL, NULL, NULL, '10 minutes', 'Toque', 'Dead creature touched', NULL, NULL, 'Instantáneo', 'Ninguna; see text', true, 'With this spell, you bring back a dead creature in another body, provided that its death occurred no more than one week before the casting of the spell and the subject’s soul is free and willing to return. If the subject’s soul is not willing to return, the spell does not work; therefore, a subject that wants to return receives no saving throw.

Since the dead creature is returning in a new body, all physical ills and afflictions are repaired. The condition of the remains is not a factor. So long as some small portion of the creature’s body still exists, it can be reincarnated, but the portion receiving the spell must have been part of the creature’s body at the time of death. The magic of the spell creates an entirely new young adult body for the soul to inhabit from the natural elements at hand. This process takes 1 hour to complete. When the body is ready, the subject is reincarnated.

A reincarnated creature recalls the majority of its former life and form. It retains any class abilities, feats, or skill ranks it formerly possessed. Its class, base attack bonus, base save bonuses, and hit points are unchanged. Strength, Dexterity, and Constitution scores depend partly on the new body. First eliminate the subject’s racial adjustments (since it is no longer of his previous race) and then apply the adjustments found below to its remaining ability scores. The subject’s level (or Hit Dice) is reduced by 1. If the subject was 1st level, its new Constitution score is reduced by 2. (If this reduction would put its Con at 0 or lower, it can’t be reincarnated). This level/HD loss or Constitution loss cannot be repaired by any means.

It’s possible for the change in the subject’s ability scores to make it difficult for it to pursue its previous character class. If this is the case, the subject is well advised to become a multiclass character.

For a humanoid creature, the new incarnation is determined using the following table. For nonhumanoid creatures, a similar table of creatures of the same type should be created.

A creature that has been turned into an undead creature or killed by a death effect can’t be returned to life by this spell. Constructs, elementals, outsiders, and undead creatures can’t be reincarnated. The spell cannot bring back a creature who has died of old age.

The reincarnated creature gains all abilities associated with its new form, including forms of movement and speeds, natural armor, natural attacks, extraordinary abilities, and the like, but it doesn’t automatically speak the language of the new form.

A wish or a miracle spell can restore a reincarnated character to his or her original form.

Rare oils and unguents worth a total of least 1,000 gp, spread over the remains.', 'With this spell, you bring back a dead creature in another body, provided that its death occurred no more than one week before the casting of the spell and the subject’s soul is free and willing to return. If the subject’s soul is not willing to return, the spell does not work; therefore, a subject that wants to return receives no saving throw.

Since the dead creature is returning in a new body, all physical ills and afflictions are repaired. The condition of the remains is not a factor. So long as some small portion of the creature’s body still exists, it can be reincarnated, but the portion receiving the spell must have been part of the creature’s body at the time of death. The magic of the spell creates an entirely new young adult body for the soul to inhabit from the natural elements at hand. This process takes 1 hour to complete. When the body is ready, the subject is reincarnated.

A reincarnated creature recalls the majority of its former life and form. It retains any class abilities, feats, or skill ranks it formerly possessed. Its class, base attack bonus, base save bonuses, and hit points are unchanged. Strength, Dexterity, and Constitution scores depend partly on the new body. First eliminate the subject’s racial adjustments (since it is no longer of his previous race) and then apply the adjustments found below to its remaining ability scores. The subject’s level (or Hit Dice) is reduced by 1. If the subject was 1st level, its new Constitution score is reduced by 2. (If this reduction would put its Con at 0 or lower, it can’t be reincarnated). This level/HD loss or Constitution loss cannot be repaired by any means.

It’s possible for the change in the subject’s ability scores to make it difficult for it to pursue its previous character class. If this is the case, the subject is well advised to become a multiclass character.

For a humanoid creature, the new incarnation is determined using the following table. For nonhumanoid creatures, a similar table of creatures of the same type should be created.

A creature that has been turned into an undead creature or killed by a death effect can’t be returned to life by this spell. Constructs, elementals, outsiders, and undead creatures can’t be reincarnated. The spell cannot bring back a creature who has died of old age.

The reincarnated creature gains all abilities associated with its new form, including forms of movement and speeds, natural armor, natural attacks, extraordinary abilities, and the like, but it doesn’t automatically speak the language of the new form.

A wish or a miracle spell can restore a reincarnated character to his or her original form.

Rare oils and unguents worth a total of least 1,000 gp, spread over the remains.'),
  ('remove-blindness-deafness', 'Remove Blindness/Deafness', 'Remove Blindness/Deafness', 'Conjuración', 'Curación', NULL, '{"cleric":3,"paladin":3}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, 'Instantáneo', 'Fortaleza anula (harmless)', true, 'Remove blindness/deafness cures blindness or deafness (your choice), whether the effect is normal or magical in nature. The spell does not restore ears or eyes that have been lost, but it repairs them if they are damaged.

Remove blindness/deafness counters and dispels blindness/deafness.', 'Remove blindness/deafness cures blindness or deafness (your choice), whether the effect is normal or magical in nature. The spell does not restore ears or eyes that have been lost, but it repairs them if they are damaged.

Remove blindness/deafness counters and dispels blindness/deafness.'),
  ('remove-curse', 'Remove Curse', 'Remove Curse', 'Abjuración', NULL, NULL, '{"sorcerer":4,"wizard":4,"cleric":3,"bard":3,"paladin":3}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Creature or item touched', NULL, NULL, 'Instantáneo', 'Voluntad anula (harmless)', true, 'Remove curse instantaneously removes all curses on an object or a creature. Remove curse does not remove the curse from a cursed shield, weapon, or suit of armor, although the spell typically enables the creature afflicted with any such cursed item to remove and get rid of it. Certain special curses may not be countered by this spell or may be countered only by a caster of a certain level or higher.

Remove curse counters and dispels bestow curse.', 'Remove curse instantaneously removes all curses on an object or a creature. Remove curse does not remove the curse from a cursed shield, weapon, or suit of armor, although the spell typically enables the creature afflicted with any such cursed item to remove and get rid of it. Certain special curses may not be countered by this spell or may be countered only by a caster of a certain level or higher.

Remove curse counters and dispels bestow curse.'),
  ('remove-disease', 'Remove Disease', 'Remove Disease', 'Conjuración', 'Curación', NULL, '{"cleric":3,"druid":3,"ranger":3}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, 'Instantáneo', 'Fortaleza anula (harmless)', true, 'Remove disease cures all diseases that the subject is suffering from. The spell also kills parasites, including green slime and others. Certain special diseases may not be countered by this spell or may be countered only by a caster of a certain level or higher.

Note: Since the spell’s duration is instantaneous, it does not prevent reinfection after a new exposure to the same disease at a later date.', 'Remove disease cures all diseases that the subject is suffering from. The spell also kills parasites, including green slime and others. Certain special diseases may not be countered by this spell or may be countered only by a caster of a certain level or higher.

Note: Since the spell’s duration is instantaneous, it does not prevent reinfection after a new exposure to the same disease at a later date.'),
  ('remove-fear', 'Remove Fear', 'Remove Fear', 'Abjuración', NULL, NULL, '{"cleric":1,"bard":1}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature plus one additional creature per four levels, No two of which can be more than 30 ft. apart', NULL, NULL, '10 minutes; see text', 'Voluntad anula (harmless)', true, 'You instill courage in the subject, granting it a +4 morale bonus against fear effects for 10 minutes. If the subject is under the influence of a fear effect when receiving the spell, that effect is suppressed for the duration of the spell.

Remove fear counters and dispels cause fear.', 'You instill courage in the subject, granting it a +4 morale bonus against fear effects for 10 minutes. If the subject is under the influence of a fear effect when receiving the spell, that effect is suppressed for the duration of the spell.

Remove fear counters and dispels cause fear.'),
  ('remove-paralysis', 'Remove Paralysis', 'Remove Paralysis', 'Conjuración', 'Curación', NULL, '{"cleric":2,"paladin":2}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'Up to four creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'Instantáneo', 'Voluntad anula (harmless)', true, 'You can free one or more creatures from the effects of any temporary paralysis or related magic, including a ghoul’s touch or a slow spell. If the spell is cast on one creature, the paralysis is negated. If cast on two creatures, each receives another save with a +4 resistance bonus against the effect that afflicts it. If cast on three or four creatures, each receives another save with a +2 resistance bonus.

The spell does not restore ability scores reduced by penalties, damage, or drain.', 'You can free one or more creatures from the effects of any temporary paralysis or related magic, including a ghoul’s touch or a slow spell. If the spell is cast on one creature, the paralysis is negated. If cast on two creatures, each receives another save with a +4 resistance bonus against the effect that afflicts it. If cast on three or four creatures, each receives another save with a +2 resistance bonus.

The spell does not restore ability scores reduced by penalties, damage, or drain.'),
  ('repel-metal-or-stone', 'Repel Metal or Stone', 'Repel Metal or Stone', 'Abjuración', NULL, ARRAY['Tierra']::TEXT[], '{"druid":8}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', '60 ft.', NULL, '60-ft. line from you', NULL, '1 round/Nivel (D)', 'Ninguna', false, 'Like repel wood, this spell creates waves of invisible and intangible energy that roll forth from you. All metal or stone objects in the path of the spell are pushed away from you to the limit of the range. Fixed metal or stone objects larger than 3 inches in diameter and loose objects weighing more than 500 pounds are not affected. Anything else, including animated objects, small boulders, and creatures in metal armor, moves back. Fixed objects 3 inches in diameter or smaller bend or break, and the pieces move with the wave of energy. Objects affected by the spell are repelled at the rate of 40 feet per round.

Objects such as metal armor, swords, and the like are pushed back, dragging their bearers with them. Even magic items with metal components are repelled, although an antimagic field blocks the effects.

The waves of energy continue to sweep down the set path for the spell’s duration. After you cast the spell, the path is set, and you can then do other things or go elsewhere without affecting the spell’s power.', 'Like repel wood, this spell creates waves of invisible and intangible energy that roll forth from you. All metal or stone objects in the path of the spell are pushed away from you to the limit of the range. Fixed metal or stone objects larger than 3 inches in diameter and loose objects weighing more than 500 pounds are not affected. Anything else, including animated objects, small boulders, and creatures in metal armor, moves back. Fixed objects 3 inches in diameter or smaller bend or break, and the pieces move with the wave of energy. Objects affected by the spell are repelled at the rate of 40 feet per round.

Objects such as metal armor, swords, and the like are pushed back, dragging their bearers with them. Even magic items with metal components are repelled, although an antimagic field blocks the effects.

The waves of energy continue to sweep down the set path for the spell’s duration. After you cast the spell, the path is set, and you can then do other things or go elsewhere without affecting the spell’s power.'),
  ('repel-vermin', 'Repel Vermin', 'Repel Vermin', 'Abjuración', NULL, NULL, '{"cleric":4,"druid":4,"bard":4,"ranger":3}'::JSONB, true, true, false, false, true, false, NULL, NULL, NULL, '1 standard action', '10 ft.', NULL, '10-ft.-radius emanation centered on you', NULL, '10 min./Nivel (D)', 'Ninguna or Voluntad anula; see text', true, 'An invisible barrier holds back vermin. A vermin with Hit Dice of less than one-third your level cannot penetrate the barrier.

A vermin with Hit Dice of one-third your level or more can penetrate the barrier if it succeeds on a Will save. Even so, crossing the barrier deals the vermin 2d6 points of damage, and pressing against the barrier causes pain, which deters most vermin.', 'An invisible barrier holds back vermin. A vermin with Hit Dice of less than one-third your level cannot penetrate the barrier.

A vermin with Hit Dice of one-third your level or more can penetrate the barrier if it succeeds on a Will save. Even so, crossing the barrier deals the vermin 2d6 points of damage, and pressing against the barrier causes pain, which deters most vermin.'),
  ('repel-wood', 'Repel Wood', 'Repel Wood', 'Transmutación', NULL, NULL, '{"druid":6}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', '60 ft.', NULL, '60-ft. line-shaped emanation from you', NULL, '1 min./Nivel (D)', 'Ninguna', false, 'Waves of energy roll forth from you, moving in the direction that you determine, causing all wooden objects in the path of the spell to be pushed away from you to the limit of the range. Wooden objects larger than 3 inches in diameter that are fixed firmly are not affected, but loose objects are. Objects 3 inches in diameter or smaller that are fixed in place splinter and break, and the pieces move with the wave of energy. Objects affected by the spell are repelled at the rate of 40 feet per round.

Objects such as wooden shields, spears, wooden weapon shafts and hafts, and arrows and bolts are pushed back, dragging those carrying them along. (A creature being dragged by an item it is carrying can let go. A creature being dragged by a shield can loose it as a move action and drop it as a free action.) If a spear is planted (set) to prevent this forced movement, it splinters. Even magic items with wooden sections are repelled, although an antimagic field blocks the effects.

The waves of energy continue to sweep down the set path for the spell’s duration. After you cast the spell, the path is set, and you can then do other things or go elsewhere without affecting the spell’s power.', 'Waves of energy roll forth from you, moving in the direction that you determine, causing all wooden objects in the path of the spell to be pushed away from you to the limit of the range. Wooden objects larger than 3 inches in diameter that are fixed firmly are not affected, but loose objects are. Objects 3 inches in diameter or smaller that are fixed in place splinter and break, and the pieces move with the wave of energy. Objects affected by the spell are repelled at the rate of 40 feet per round.

Objects such as wooden shields, spears, wooden weapon shafts and hafts, and arrows and bolts are pushed back, dragging those carrying them along. (A creature being dragged by an item it is carrying can let go. A creature being dragged by a shield can loose it as a move action and drop it as a free action.) If a spear is planted (set) to prevent this forced movement, it splinters. Even magic items with wooden sections are repelled, although an antimagic field blocks the effects.

The waves of energy continue to sweep down the set path for the spell’s duration. After you cast the spell, the path is set, and you can then do other things or go elsewhere without affecting the spell’s power.'),
  ('repulsion', 'Repulsion', 'Repulsion', 'Abjuración', NULL, NULL, '{"sorcerer":6,"wizard":6,"cleric":7}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Up to 10 ft./Nivel', NULL, 'Up to 10-ft.-radius/Nivel emanation centered on you', NULL, '1 round/Nivel (D)', 'Voluntad anula', true, 'An invisible, mobile field surrounds you and prevents creatures from approaching you. You decide how big the field is at the time of casting (to the limit your level allows). Any creature within or entering the field must attempt a save. If it fails, it becomes unable to move toward you for the duration of the spell. Repelled creatures’ actions are not otherwise restricted.

They can fight other creatures and can cast spells and attack you with ranged weapons. If you move closer to an affected creature, nothing happens. (The creature is not forced back.) The creature is free to make melee attacks against you if you come within reach. If a repelled creature moves away from you and then tries to turn back toward you, it cannot move any closer if it is still within the spell’s area.

A pair of small iron bars attached to two small canine statuettes, one black and one white, the whole array worth 50 gp.', 'An invisible, mobile field surrounds you and prevents creatures from approaching you. You decide how big the field is at the time of casting (to the limit your level allows). Any creature within or entering the field must attempt a save. If it fails, it becomes unable to move toward you for the duration of the spell. Repelled creatures’ actions are not otherwise restricted.

They can fight other creatures and can cast spells and attack you with ranged weapons. If you move closer to an affected creature, nothing happens. (The creature is not forced back.) The creature is free to make melee attacks against you if you come within reach. If a repelled creature moves away from you and then tries to turn back toward you, it cannot move any closer if it is still within the spell’s area.

A pair of small iron bars attached to two small canine statuettes, one black and one white, the whole array worth 50 gp.'),
  ('resilient-sphere', 'Resilient Sphere', 'Resilient Sphere', 'Evocación', NULL, ARRAY['Fuerza']::TEXT[], '{"sorcerer":4,"wizard":4}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, '1-ft.-diameter/Nivel sphere, centered around a creature', '1 min./Nivel (D)', 'Reflejos anula', true, 'A globe of shimmering force encloses a creature, provided the creature is small enough to fit within the diameter of the sphere. The sphere contains its subject for the spell’s duration. The sphere is not subject to damage of any sort except from a rod of cancellation, a rod of negation, a disintegrate spell, or a targeted dispel magic spell. These effects destroy the sphere without harm to the subject. Nothing can pass through the sphere, inside or out, though the subject can breathe normally.

The subject may struggle, but the sphere cannot be physically moved either by people outside it or by the struggles of those within.

A hemispherical piece of clear crystal and a matching hemispherical piece of gum arabic.', 'A globe of shimmering force encloses a creature, provided the creature is small enough to fit within the diameter of the sphere. The sphere contains its subject for the spell’s duration. The sphere is not subject to damage of any sort except from a rod of cancellation, a rod of negation, a disintegrate spell, or a targeted dispel magic spell. These effects destroy the sphere without harm to the subject. Nothing can pass through the sphere, inside or out, though the subject can breathe normally.

The subject may struggle, but the sphere cannot be physically moved either by people outside it or by the struggles of those within.

A hemispherical piece of clear crystal and a matching hemispherical piece of gum arabic.'),
  ('resistance', 'Resistance', 'Resistance', 'Abjuración', NULL, NULL, '{"sorcerer":0,"wizard":0,"cleric":0,"druid":0,"bard":0,"paladin":1}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 minute', 'Voluntad anula (harmless)', true, 'You imbue the subject with magical energy that protects it from harm, granting it a +1 resistance bonus on saves.

Resistance can be made permanent with a permanency spell.

A miniature cloak.', 'You imbue the subject with magical energy that protects it from harm, granting it a +1 resistance bonus on saves.

Resistance can be made permanent with a permanency spell.

A miniature cloak.'),
  ('resist-energy', 'Resist Energy', 'Resist Energy', 'Abjuración', NULL, NULL, '{"sorcerer":2,"wizard":2,"cleric":2,"druid":2,"paladin":2,"ranger":1}'::JSONB, true, true, false, false, true, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '10 min./Nivel', 'Fortaleza anula (harmless)', true, 'This abjuration grants a creature limited protection from damage of whichever one of five energy types you select: acid, cold, electricity, fire, or sonic. The subject gains energy resistance 10 against the energy type chosen, meaning that each time the creature is subjected to such damage (whether from a natural or magical source), that damage is reduced by 10 points before being applied to the creature’s hit points. The value of the energy resistance granted increases to 20 points at 7th level and to a maximum of 30 points at 11th level. The spell protects the recipient’s equipment as well.

Resist energy absorbs only damage. The subject could still suffer unfortunate side effects.

Note: Resist energy overlaps (and does not stack with) protection from energy. If a character is warded by protection from energy and resist energy, the protection spell absorbs damage until its power is exhausted.', 'This abjuration grants a creature limited protection from damage of whichever one of five energy types you select: acid, cold, electricity, fire, or sonic. The subject gains energy resistance 10 against the energy type chosen, meaning that each time the creature is subjected to such damage (whether from a natural or magical source), that damage is reduced by 10 points before being applied to the creature’s hit points. The value of the energy resistance granted increases to 20 points at 7th level and to a maximum of 30 points at 11th level. The spell protects the recipient’s equipment as well.

Resist energy absorbs only damage. The subject could still suffer unfortunate side effects.

Note: Resist energy overlaps (and does not stack with) protection from energy. If a character is warded by protection from energy and resist energy, the protection spell absorbs damage until its power is exhausted.'),
  ('restoration', 'Restoration', 'Restoration', 'Conjuración', 'Curación', NULL, '{"cleric":4,"paladin":4}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'This spell functions like lesser restoration, except that it also dispels negative levels and restores one experience level to a creature who has had a level drained. The drained level is restored only if the time since the creature lost the level is equal to or less than one day per caster level. A character who has a level restored by restoration has exactly the minimum number of experience points necessary to restore him or her to his or her previous level.

Restoration cures all temporary ability damage, and it restores all points permanently drained from a single ability score (your choice if more than one is drained). It also eliminates any fatigue or exhaustion suffered by the target.

Restoration does not restore levels or Constitution points lost due to death.

Diamond dust worth 100 gp that is sprinkled over the target.', 'This spell functions like lesser restoration, except that it also dispels negative levels and restores one experience level to a creature who has had a level drained. The drained level is restored only if the time since the creature lost the level is equal to or less than one day per caster level. A character who has a level restored by restoration has exactly the minimum number of experience points necessary to restore him or her to his or her previous level.

Restoration cures all temporary ability damage, and it restores all points permanently drained from a single ability score (your choice if more than one is drained). It also eliminates any fatigue or exhaustion suffered by the target.

Restoration does not restore levels or Constitution points lost due to death.

Diamond dust worth 100 gp that is sprinkled over the target.'),
  ('restoration-greater', 'Restoration, Greater', 'Restoration, Greater', 'Conjuración', 'Curación', NULL, '{"cleric":7}'::JSONB, true, true, false, false, false, true, NULL, NULL, NULL, '10 minutes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'This spell functions like lesser restoration, except that it dispels all negative levels afflicting the healed creature. This effect also reverses level drains by a force or creature, restoring the creature to the highest level it had previously attained. The drained levels are restored only if the time since the creature lost the level is no more than one week per caster level.

Greater restoration also dispels all magical effects penalizing the creature’s abilities, cures all temporary ability damage, and restores all points permanently drained from all ability scores. It also eliminates fatigue and exhaustion, and removes all forms of insanity, confusion, and similar mental effects. Greater restoration does not restore levels or Constitution points lost due to death.

500 XP.', 'This spell functions like lesser restoration, except that it dispels all negative levels afflicting the healed creature. This effect also reverses level drains by a force or creature, restoring the creature to the highest level it had previously attained. The drained levels are restored only if the time since the creature lost the level is no more than one week per caster level.

Greater restoration also dispels all magical effects penalizing the creature’s abilities, cures all temporary ability damage, and restores all points permanently drained from all ability scores. It also eliminates fatigue and exhaustion, and removes all forms of insanity, confusion, and similar mental effects. Greater restoration does not restore levels or Constitution points lost due to death.

500 XP.'),
  ('restoration-lesser', 'Restoration, Lesser', 'Restoration, Lesser', 'Conjuración', 'Curación', NULL, '{"cleric":2,"druid":2,"paladin":1}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '3 rounds', 'Toque', 'Creature touched', NULL, NULL, 'Instantáneo', 'Voluntad anula (harmless)', true, 'Lesser restoration dispels any magical effects reducing one of the subject’s ability scores or cures 1d4 points of temporary ability damage to one of the subject’s ability scores. It also eliminates any fatigue suffered by the character, and improves an exhausted condition to fatigued. It does not restore permanent ability drain.', 'Lesser restoration dispels any magical effects reducing one of the subject’s ability scores or cures 1d4 points of temporary ability damage to one of the subject’s ability scores. It also eliminates any fatigue suffered by the character, and improves an exhausted condition to fatigued. It does not restore permanent ability drain.'),
  ('resurrection', 'Resurrection', 'Resurrection', 'Conjuración', 'Curación', NULL, '{"cleric":7}'::JSONB, false, false, false, false, false, false, NULL, NULL, NULL, '10 minutes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'This spell functions like raise dead, except that you are able to restore life and complete strength to any deceased creature.

The condition of the remains is not a factor. So long as some small portion of the creature’s body still exists, it can be resurrected, but the portion receiving the spell must have been part of the creature’s body at the time of death. (The remains of a creature hit by a disintegrate spell count as a small portion of its body.) The creature can have been dead no longer than 10 years per caster level.

Upon completion of the spell, the creature is immediately restored to full hit points, vigor, and health, with no loss of prepared spells. However, the subject loses one level, or 2 points of Constitution if the subject was 1st level. (If this reduction would bring its Con to 0 or lower, it can’t be resurrected). This level loss or Constitution loss cannot be repaired by any means.

You can resurrect someone killed by a death effect or someone who has been turned into an undead creature and then destroyed. You cannot resurrect someone who has died of old age. Constructs, elementals, outsiders, and undead creatures can’t be resurrected.

A sprinkle of holy water and diamonds worth a total of at least 10,000 gp.', 'This spell functions like raise dead, except that you are able to restore life and complete strength to any deceased creature.

The condition of the remains is not a factor. So long as some small portion of the creature’s body still exists, it can be resurrected, but the portion receiving the spell must have been part of the creature’s body at the time of death. (The remains of a creature hit by a disintegrate spell count as a small portion of its body.) The creature can have been dead no longer than 10 years per caster level.

Upon completion of the spell, the creature is immediately restored to full hit points, vigor, and health, with no loss of prepared spells. However, the subject loses one level, or 2 points of Constitution if the subject was 1st level. (If this reduction would bring its Con to 0 or lower, it can’t be resurrected). This level loss or Constitution loss cannot be repaired by any means.

You can resurrect someone killed by a death effect or someone who has been turned into an undead creature and then destroyed. You cannot resurrect someone who has died of old age. Constructs, elementals, outsiders, and undead creatures can’t be resurrected.

A sprinkle of holy water and diamonds worth a total of at least 10,000 gp.'),
  ('reverse-gravity', 'Reverse Gravity', 'Reverse Gravity', 'Transmutación', NULL, NULL, '{"sorcerer":7,"wizard":7,"druid":8}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, 'Up to one 10-ft. cube per two levels (S)', NULL, '1 round/Nivel (D)', 'Ninguna; see text', false, 'This spell reverses gravity in an area, causing all unattached objects and creatures within that area to fall upward and reach the top of the area in 1 round. If some solid object (such as a ceiling) is encountered in this fall, falling objects and creatures strike it in the same manner as they would during a normal downward fall. If an object or creature reaches the top of the area without striking anything, it remains there, oscillating slightly, until the spell ends. At the end of the spell duration, affected objects and creatures fall downward.

Provided it has something to hold onto, a creature caught in the area can attempt a Reflex save to secure itself when the spell strikes. Creatures who can fly or levitate can keep themselves from falling.

A lodestone and iron filings.', 'This spell reverses gravity in an area, causing all unattached objects and creatures within that area to fall upward and reach the top of the area in 1 round. If some solid object (such as a ceiling) is encountered in this fall, falling objects and creatures strike it in the same manner as they would during a normal downward fall. If an object or creature reaches the top of the area without striking anything, it remains there, oscillating slightly, until the spell ends. At the end of the spell duration, affected objects and creatures fall downward.

Provided it has something to hold onto, a creature caught in the area can attempt a Reflex save to secure itself when the spell strikes. Creatures who can fly or levitate can keep themselves from falling.

A lodestone and iron filings.'),
  ('righteous-might', 'Righteous Might', 'Righteous Might', 'Transmutación', NULL, NULL, '{"cleric":5}'::JSONB, true, true, false, false, true, false, NULL, NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 round/Nivel (D)', NULL, NULL, 'This spell causes you to grow, doubling your height and multiplying your weight by 8. This increase changes your size category to the next larger one, and you gain a +4 size bonus to Strength and a +2 size bonus to Constitution. You gain a +2 enhancement bonus to your natural armor. You gain damage reduction 3/evil (if you normally channel positive energy) or damage reduction 3/good (if you normally channel negative energy). At 12th level this damage reduction becomes 6/evil or 6/good, and at 15th level it becomes 9/evil or 9/good (the maximum). Your size modifier for AC and attacks changes as appropriate to your new size category. This spell doesn’t change your speed. Determine space and reach as appropriate to your new size.

If insufficient room is available for the desired growth, you attain the maximum possible size and may make a Strength check (using your increased Strength) to burst any enclosures in the process. If you fail, you are constrained without harm by the materials enclosing you— the spell cannot crush you by increasing your size.

All equipment you wear or carry is similarly enlarged by the spell. Melee and projectile weapons deal more damage. Other magical properties are not affected by this spell. Any enlarged item that leaves your possession (including a projectile or thrown weapon) instantly returns to its normal size. This means that thrown weapons deal their normal damage (projectiles deal damage based on the size of the weapon that fired them).

Multiple magical effects that increase size do not stack.', 'This spell causes you to grow, doubling your height and multiplying your weight by 8. This increase changes your size category to the next larger one, and you gain a +4 size bonus to Strength and a +2 size bonus to Constitution. You gain a +2 enhancement bonus to your natural armor. You gain damage reduction 3/evil (if you normally channel positive energy) or damage reduction 3/good (if you normally channel negative energy). At 12th level this damage reduction becomes 6/evil or 6/good, and at 15th level it becomes 9/evil or 9/good (the maximum). Your size modifier for AC and attacks changes as appropriate to your new size category. This spell doesn’t change your speed. Determine space and reach as appropriate to your new size.

If insufficient room is available for the desired growth, you attain the maximum possible size and may make a Strength check (using your increased Strength) to burst any enclosures in the process. If you fail, you are constrained without harm by the materials enclosing you— the spell cannot crush you by increasing your size.

All equipment you wear or carry is similarly enlarged by the spell. Melee and projectile weapons deal more damage. Other magical properties are not affected by this spell. Any enlarged item that leaves your possession (including a projectile or thrown weapon) instantly returns to its normal size. This means that thrown weapons deal their normal damage (projectiles deal damage based on the size of the weapon that fired them).

Multiple magical effects that increase size do not stack.'),
  ('rope-trick', 'Rope Trick', 'Rope Trick', 'Transmutación', NULL, NULL, '{"sorcerer":2,"wizard":2}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'One touched piece of rope from 5 ft. to 30 ft. Largo', NULL, NULL, '1 hour/Nivel (D)', 'Ninguna', false, 'When this spell is cast upon a piece of rope from 5 to 30 feet long, one end of the rope rises into the air until the whole rope hangs perpendicular to the ground, as if affixed at the upper end. The upper end is, in fact, fastened to an extradimensional space that is outside the multiverse of extradimensional spaces (“planes”). Creatures in the extradimensional space are hidden, beyond the reach of spells (including divinations), unless those spells work across planes. The space holds as many as eight creatures (of any size). Creatures in the space can pull the rope up into the space, making the rope “disappear.” In that case, the rope counts as one of the eight creatures that can fit in the space. The rope can support up to 16,000 pounds. A weight greater than that can pull the rope free.

Spells cannot be cast across the extradimensional interface, nor can area effects cross it. Those in the extradimensional space can see out of it as if a 3-foot by 5-foot window were centered on the rope. The window is present on the Material Plane, but it’s invisible, and even creatures that can see the window can’t see through it. Anything inside the extradimensional space drops out when the spell ends. The rope can be climbed by only one person at a time. The rope trick spell enables climbers to reach a normal place if they do not climb all the way to the extradimensional space.

Note: It is hazardous to create an extradimensional space within an existing extradimensional space or to take an extradimensional space into an existing one.

Powdered corn extract and a twisted loop of parchment.', 'When this spell is cast upon a piece of rope from 5 to 30 feet long, one end of the rope rises into the air until the whole rope hangs perpendicular to the ground, as if affixed at the upper end. The upper end is, in fact, fastened to an extradimensional space that is outside the multiverse of extradimensional spaces (“planes”). Creatures in the extradimensional space are hidden, beyond the reach of spells (including divinations), unless those spells work across planes. The space holds as many as eight creatures (of any size). Creatures in the space can pull the rope up into the space, making the rope “disappear.” In that case, the rope counts as one of the eight creatures that can fit in the space. The rope can support up to 16,000 pounds. A weight greater than that can pull the rope free.

Spells cannot be cast across the extradimensional interface, nor can area effects cross it. Those in the extradimensional space can see out of it as if a 3-foot by 5-foot window were centered on the rope. The window is present on the Material Plane, but it’s invisible, and even creatures that can see the window can’t see through it. Anything inside the extradimensional space drops out when the spell ends. The rope can be climbed by only one person at a time. The rope trick spell enables climbers to reach a normal place if they do not climb all the way to the extradimensional space.

Note: It is hazardous to create an extradimensional space within an existing extradimensional space or to take an extradimensional space into an existing one.

Powdered corn extract and a twisted loop of parchment.'),
  ('rusting-grasp', 'Rusting Grasp', 'Rusting Grasp', 'Transmutación', NULL, NULL, '{"druid":4}'::JSONB, true, true, false, false, true, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'One nonmagical ferrous object (or the volume of the object within 3 ft. of the touched point) or one ferrous creature', NULL, NULL, 'See text', 'Ninguna', false, 'Any iron or iron alloy item you touch becomes instantaneously rusted, pitted, and worthless, effectively destroyed. If the item is so large that it cannot fit within a 3-foot radius a 3-foot-radius volume of the metal is rusted and destroyed. Magic items made of metal are immune to this spell.

You may employ rusting grasp in combat with a successful melee touch attack. Rusting grasp used in this way instantaneously destroys 1d6 points of Armor Class gained from metal armor (to the maximum amount of protection the armor offered) through corrosion.

Weapons in use by an opponent targeted by the spell are more difficult to grasp. You must succeed on a melee touch attack against the weapon. A metal weapon that is hit is destroyed.

Note: Striking at an opponent’s weapon provokes an attack of opportunity. Also, you must touch the weapon and not the other way around.

Against a ferrous creature, rusting grasp instantaneously deals 3d6 points of damage +1 per caster level (maximum +15) per successful attack. The spell lasts for 1 round per level, and you can make one melee touch attack per round.', 'Any iron or iron alloy item you touch becomes instantaneously rusted, pitted, and worthless, effectively destroyed. If the item is so large that it cannot fit within a 3-foot radius a 3-foot-radius volume of the metal is rusted and destroyed. Magic items made of metal are immune to this spell.

You may employ rusting grasp in combat with a successful melee touch attack. Rusting grasp used in this way instantaneously destroys 1d6 points of Armor Class gained from metal armor (to the maximum amount of protection the armor offered) through corrosion.

Weapons in use by an opponent targeted by the spell are more difficult to grasp. You must succeed on a melee touch attack against the weapon. A metal weapon that is hit is destroyed.

Note: Striking at an opponent’s weapon provokes an attack of opportunity. Also, you must touch the weapon and not the other way around.

Against a ferrous creature, rusting grasp instantaneously deals 3d6 points of damage +1 per caster level (maximum +15) per successful attack. The spell lasts for 1 round per level, and you can make one melee touch attack per round.'),
  ('sanctuary', 'Sanctuary', 'Sanctuary', 'Abjuración', NULL, NULL, '{"cleric":1}'::JSONB, true, true, false, false, true, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 round/Nivel', 'Voluntad anula', false, 'Any opponent attempting to strike or otherwise directly attack the warded creature, even with a targeted spell, must attempt a Will save. If the save succeeds, the opponent can attack normally and is unaffected by that casting of the spell. If the save fails, the opponent can’t follow through with the attack, that part of its action is lost, and it can’t directly attack the warded creature for the duration of the spell. Those not attempting to attack the subject remain unaffected. This spell does not prevent the warded creature from being attacked or affected by area or effect spells. The subject cannot attack without breaking the spell but may use nonattack spells or otherwise act.', 'Any opponent attempting to strike or otherwise directly attack the warded creature, even with a targeted spell, must attempt a Will save. If the save succeeds, the opponent can attack normally and is unaffected by that casting of the spell. If the save fails, the opponent can’t follow through with the attack, that part of its action is lost, and it can’t directly attack the warded creature for the duration of the spell. Those not attempting to attack the subject remain unaffected. This spell does not prevent the warded creature from being attacked or affected by area or effect spells. The subject cannot attack without breaking the spell but may use nonattack spells or otherwise act.'),
  ('scare', 'Scare', 'Scare', 'Nigromancia', NULL, ARRAY['Miedo, Afecta la Mente']::TEXT[], '{"sorcerer":2,"wizard":2,"bard":2}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'One living creature per three levels, No two of which can be more than 30 ft. apart', NULL, NULL, '1 round/Nivel or 1 round; see text for cause Miedo', 'Voluntad parcial', true, 'This spell functions like cause fear, except that it causes all targeted creatures of less than 6 HD to become frightened.

A bit of bone from an undead skeleton, zombie, ghoul, ghast, or mummy.', 'This spell functions like cause fear, except that it causes all targeted creatures of less than 6 HD to become frightened.

A bit of bone from an undead skeleton, zombie, ghoul, ghast, or mummy.'),
  ('scintillating-pattern', 'Scintillating Pattern', 'Scintillating Pattern', 'Ilusión', 'Patrón', ARRAY['Afecta la Mente']::TEXT[], '{"sorcerer":8,"wizard":8}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Colorful lights in a 20-ft.-radius spread', 'Concentración + 2 rounds', 'Ninguna', true, 'A twisting pattern of discordant, coruscating colors weaves through the air, affecting creatures within it. The spell affects a total number of Hit Dice of creatures equal to your caster level (maximum 20). Creatures with the fewest HD are affected first; and, among creatures with equal HD, those who are closest to the spell’s point of origin are affected first. Hit Dice that are not sufficient to affect a creature are wasted. The spell affects each subject according to its Hit Dice.

Unconscious for 1d4 rounds, then stunned for 1d4 rounds, and then confused for 1d4 rounds. (Treat an unconscious result as stunned for nonliving creatures.)

Stunned for 1d4 rounds, then confused for 1d4 rounds.

Confused for 1d4 rounds.

Sightless creatures are not affected by scintillating pattern.

A small crystal prism.', 'A twisting pattern of discordant, coruscating colors weaves through the air, affecting creatures within it. The spell affects a total number of Hit Dice of creatures equal to your caster level (maximum 20). Creatures with the fewest HD are affected first; and, among creatures with equal HD, those who are closest to the spell’s point of origin are affected first. Hit Dice that are not sufficient to affect a creature are wasted. The spell affects each subject according to its Hit Dice.

Unconscious for 1d4 rounds, then stunned for 1d4 rounds, and then confused for 1d4 rounds. (Treat an unconscious result as stunned for nonliving creatures.)

Stunned for 1d4 rounds, then confused for 1d4 rounds.

Confused for 1d4 rounds.

Sightless creatures are not affected by scintillating pattern.

A small crystal prism.'),
  ('scorching-ray', 'Scorching Ray', 'Scorching Ray', 'Evocación', NULL, ARRAY['Fuego']::TEXT[], '{"sorcerer":2,"wizard":2}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'One or more rays', 'Instantáneo', 'Ninguna', true, 'You blast your enemies with fiery rays. You may fire one ray, plus one additional ray for every four levels beyond 3rd (to a maximum of three rays at 11th level). Each ray requires a ranged touch attack to hit and deals 4d6 points of fire damage.

The rays may be fired at the same or different targets, but all bolts must be aimed at targets within 30 feet of each other and fired simultaneously.', 'You blast your enemies with fiery rays. You may fire one ray, plus one additional ray for every four levels beyond 3rd (to a maximum of three rays at 11th level). Each ray requires a ranged touch attack to hit and deals 4d6 points of fire damage.

The rays may be fired at the same or different targets, but all bolts must be aimed at targets within 30 feet of each other and fired simultaneously.'),
  ('screen', 'Screen', 'Screen', 'Ilusión', 'Glamour', NULL, '{"sorcerer":8,"wizard":8}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '10 minutes', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, '30-ft. cube/Nivel (S)', NULL, '24 hours', 'Ninguna or Voluntad incredulidad (if interacted with); see text', false, 'This spell combines several elements to create a powerful protection from scrying and direct observation. When casting the spell, you dictate what will and will not be observed in the spell’s area. The illusion created must be stated in general terms. Once the conditions are set, they cannot be changed.

Attempts to scry the area automatically detect the image stated by you with no save allowed. Sight and sound are appropriate to the illusion created.

Direct observation may allow a save (as per a normal illusion), if there is cause to disbelieve what is seen. Even entering the area does not cancel the illusion or necessarily allow a save, assuming that hidden beings take care to stay out of the way of those affected by the illusion.', 'This spell combines several elements to create a powerful protection from scrying and direct observation. When casting the spell, you dictate what will and will not be observed in the spell’s area. The illusion created must be stated in general terms. Once the conditions are set, they cannot be changed.

Attempts to scry the area automatically detect the image stated by you with no save allowed. Sight and sound are appropriate to the illusion created.

Direct observation may allow a save (as per a normal illusion), if there is cause to disbelieve what is seen. Even entering the area does not cancel the illusion or necessarily allow a save, assuming that hidden beings take care to stay out of the way of those affected by the illusion.'),
  ('scrying', 'Scrying', 'Scrying', 'Adivinación', 'Adivinación', NULL, '{"sorcerer":4,"wizard":4,"cleric":5,"druid":4,"bard":3}'::JSONB, true, true, false, true, false, false, NULL, NULL, NULL, '1 hour', 'See text', NULL, NULL, 'Magical sensor', '1 min./Nivel', 'Voluntad anula', true, 'You can see and hear some creature, which may be at any distance. If the subject succeeds on a Will save, the scrying attempt simply fails. The difficulty of the save depends on how well you know the subject and what sort of physical connection (if any) you have to that creature. Furthermore, if the subject is on another plane, it gets a +5 bonus on its Will save.

If the save fails, you can see and hear the subject and the subject’s immediate surroundings (approximately 10 feet in all directions of the subject). If the subject moves, the sensor follows at a speed of up to 150 feet.

As with all divination (scrying) spells, the sensor has your full visual acuity, including any magical effects. In addition, the following spells have a 5% chance per caster level of operating through the sensor: detect chaos, detect evil, detect good, detect law, detect magic, and message.

If the save succeeds, you can’t attempt to scry on that subject again for at least 24 hours.

The eye of a hawk, an eagle, or a roc, plus nitric acid, copper, and zinc.

A mirror of finely wrought and highly polished silver costing not less than 1,000 gp. The mirror must be at least 2 feet by 4 feet.

A holy water font costing not less than 100 gp.

A natural pool of water.', 'You can see and hear some creature, which may be at any distance. If the subject succeeds on a Will save, the scrying attempt simply fails. The difficulty of the save depends on how well you know the subject and what sort of physical connection (if any) you have to that creature. Furthermore, if the subject is on another plane, it gets a +5 bonus on its Will save.

If the save fails, you can see and hear the subject and the subject’s immediate surroundings (approximately 10 feet in all directions of the subject). If the subject moves, the sensor follows at a speed of up to 150 feet.

As with all divination (scrying) spells, the sensor has your full visual acuity, including any magical effects. In addition, the following spells have a 5% chance per caster level of operating through the sensor: detect chaos, detect evil, detect good, detect law, detect magic, and message.

If the save succeeds, you can’t attempt to scry on that subject again for at least 24 hours.

The eye of a hawk, an eagle, or a roc, plus nitric acid, copper, and zinc.

A mirror of finely wrought and highly polished silver costing not less than 1,000 gp. The mirror must be at least 2 feet by 4 feet.

A holy water font costing not less than 100 gp.

A natural pool of water.'),
  ('scrying-greater', 'Scrying, Greater', 'Scrying, Greater', 'Adivinación', 'Adivinación', NULL, '{"sorcerer":7,"wizard":7,"cleric":7,"druid":7,"bard":6}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', NULL, NULL, NULL, NULL, '1 hour/Nivel', NULL, NULL, 'This spell functions like scrying, except as noted above. Additionally, all of the following spells function reliably through the sensor: detect chaos, detect evil, detect good, detect law, detect magic, message, read magic, and tongues.', 'This spell functions like scrying, except as noted above. Additionally, all of the following spells function reliably through the sensor: detect chaos, detect evil, detect good, detect law, detect magic, message, read magic, and tongues.'),
  ('sculpt-sound', 'Sculpt Sound', 'Sculpt Sound', 'Transmutación', NULL, NULL, '{"bard":3}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature or object/Nivel, No two of which can be more than 30 ft. apart', NULL, NULL, '1 hour/Nivel (D)', 'Voluntad anula (object)', true, 'You change the sounds that creatures or objects make. You can create sounds where none exist, deaden sounds, or transform sounds into other sounds. All affected creatures or objects must be transmuted in the same way. Once the transmutation is made, you cannot change it.

You can change the qualities of sounds but cannot create words with which you are unfamiliar yourself.

A spellcaster whose voice is changed dramatically is unable to cast spells with verbal components.', 'You change the sounds that creatures or objects make. You can create sounds where none exist, deaden sounds, or transform sounds into other sounds. All affected creatures or objects must be transmuted in the same way. Once the transmutation is made, you cannot change it.

You can change the qualities of sounds but cannot create words with which you are unfamiliar yourself.

A spellcaster whose voice is changed dramatically is unable to cast spells with verbal components.'),
  ('searing-light', 'Searing Light', 'Searing Light', 'Evocación', NULL, NULL, '{"cleric":3}'::JSONB, true, true, false, false, false, false, NULL, 'ing divine power like a ray of the sun, you project a blast of light from your open palm. You must succeed on a ranged touch attack to strike your target. A creature struck by this ray of light takes 1d8 points of damage per two caster levels (maximum 5d8). An undead creature takes 1d6 points of damage per caster level (maximum 10d6), and an undead creature particularly vulnerable to bright light takes 1d8 points of damage per caster level (maximum 10d8). A construct or inanimate object takes only 1d6 points of damage per two caster levels (maximum 5d6).', NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Ray', 'Instantáneo', 'Ninguna', true, NULL, NULL),
  ('secret-chest', 'Secret Chest', 'Secret Chest', 'Conjuración', 'Convocación', NULL, '{"sorcerer":5,"wizard":5}'::JSONB, true, true, false, true, false, false, NULL, NULL, NULL, '10 minutes', 'See text', 'One chest and up to 1 cu. ft. of goods/caster Nivel', NULL, NULL, 'Sixty days or until discharged', 'Ninguna', false, 'You hide a chest on the Ethereal Plane for as long as sixty days and can retrieve it at will. The chest can contain up to 1 cubic foot of material per caster level (regardless of the chest’s actual size, which is about 3 feet by 2 feet by 2 feet). If any living creatures are in the chest, there is a 75% chance that the spell simply fails. Once the chest is hidden, you can retrieve it by concentrating (a standard action), and it appears next to you.

The chest must be exceptionally well crafted and expensive, constructed for you by master crafters. The cost of such a chest is never less than 5,000 gp. Once it is constructed, you must make a tiny replica (of the same materials and perfect in every detail), so that the miniature of the chest appears to be a perfect copy. (The replica costs 50 gp.) You can have but one pair of these chests at any given time—even a wish spell does not allow more. The chests are nonmagical and can be fitted with locks, wards, and so on, just as any normal chest can be.

To hide the chest, you cast the spell while touching both the chest and the replica. The chest vanishes into the Ethereal Plane. You need the replica to recall the chest. After sixty days, there is a cumulative chance of 5% per day that the chest is irretrievably lost. If the miniature of the chest is lost or destroyed, there is no way, not even with a wish spell, that the large chest can be summoned back, although an extraplanar expedition might be mounted to find it.

Living things in the chest eat, sleep, and age normally, and they die if they run out of food, air, water, or whatever they need to survive.

The chest and its replica.', 'You hide a chest on the Ethereal Plane for as long as sixty days and can retrieve it at will. The chest can contain up to 1 cubic foot of material per caster level (regardless of the chest’s actual size, which is about 3 feet by 2 feet by 2 feet). If any living creatures are in the chest, there is a 75% chance that the spell simply fails. Once the chest is hidden, you can retrieve it by concentrating (a standard action), and it appears next to you.

The chest must be exceptionally well crafted and expensive, constructed for you by master crafters. The cost of such a chest is never less than 5,000 gp. Once it is constructed, you must make a tiny replica (of the same materials and perfect in every detail), so that the miniature of the chest appears to be a perfect copy. (The replica costs 50 gp.) You can have but one pair of these chests at any given time—even a wish spell does not allow more. The chests are nonmagical and can be fitted with locks, wards, and so on, just as any normal chest can be.

To hide the chest, you cast the spell while touching both the chest and the replica. The chest vanishes into the Ethereal Plane. You need the replica to recall the chest. After sixty days, there is a cumulative chance of 5% per day that the chest is irretrievably lost. If the miniature of the chest is lost or destroyed, there is no way, not even with a wish spell, that the large chest can be summoned back, although an extraplanar expedition might be mounted to find it.

Living things in the chest eat, sleep, and age normally, and they die if they run out of food, air, water, or whatever they need to survive.

The chest and its replica.'),
  ('secret-page', 'Secret Page', 'Secret Page', 'Transmutación', NULL, NULL, '{"sorcerer":3,"wizard":3,"bard":3}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '10 minutes', 'Toque', 'Page touched, up to 3 sq. ft. in size', NULL, NULL, 'Permanente', 'Ninguna', false, 'Secret page alters the contents of a page so that they appear to be something entirely different. The text of a spell can be changed to show even another spell. Explosive runes or sepia snake sigil can be cast upon the secret page.

A comprehend languages spell alone cannot reveal a secret page’s contents. You are able to reveal the original contents by speaking a special word. You can then peruse the actual page, and return it to its secret page form at will. You can also remove the spell by double repetition of the special word. A detect magic spell reveals dim magic on the page in question but does not reveal its true contents. True seeing reveals the presence of the hidden material but does not reveal the contents unless cast in combination with comprehend languages. A secret page spell can be dispelled, and the hidden writings can be destroyed by means of an erase spell.

Powdered herring scales and will-o’-wisp essence.', 'Secret page alters the contents of a page so that they appear to be something entirely different. The text of a spell can be changed to show even another spell. Explosive runes or sepia snake sigil can be cast upon the secret page.

A comprehend languages spell alone cannot reveal a secret page’s contents. You are able to reveal the original contents by speaking a special word. You can then peruse the actual page, and return it to its secret page form at will. You can also remove the spell by double repetition of the special word. A detect magic spell reveals dim magic on the page in question but does not reveal its true contents. True seeing reveals the presence of the hidden material but does not reveal the contents unless cast in combination with comprehend languages. A secret page spell can be dispelled, and the hidden writings can be destroyed by means of an erase spell.

Powdered herring scales and will-o’-wisp essence.'),
  ('secure-shelter', 'Secure Shelter', 'Secure Shelter', 'Conjuración', 'Creación', NULL, '{"sorcerer":4,"wizard":4,"bard":4}'::JSONB, true, true, true, false, false, false, NULL, 'The of the alarm spell (silver wire and a tiny bell) if this benefit is to be included.', NULL, '10 minutes', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, '20-ft.-square structure', '2 hours/Nivel (D)', 'Ninguna', false, 'You conjure a sturdy cottage or lodge made of material that is common in the area where the spell is cast. The floor is level, clean, and dry. In all respects the lodging resembles a normal cottage, with a sturdy door, two shuttered windows, and a small fireplace.

The shelter has no heating or cooling source (other than natural insulation qualities). Therefore, it must be heated as a normal dwelling, and extreme heat adversely affects it and its occupants. The dwelling does, however, provide considerable security otherwise—it is as strong as a normal stone building, regardless of its material composition. The dwelling resists flames and fire as if it were stone. It is impervious to normal missiles (but not the sort cast by siege engines or giants).

The door, shutters, and even chimney are secure against intrusion, the former two being arcane locked and the latter secured by an iron grate at the top and a narrow flue. In addition, these three areas are protected by an alarm spell. Finally, an unseen servant is conjured to provide service to you for the duration of the shelter.

The secure shelter contains rude furnishings —eight bunks, a trestle table, eight stools, and a writing desk.

A square chip of stone, crushed lime, a few grains of sand, a sprinkling of water, and several splinters of wood. These must be augmented by the components of the unseen servant spell (string and a bit of wood) if this benefit is to be included.', 'You conjure a sturdy cottage or lodge made of material that is common in the area where the spell is cast. The floor is level, clean, and dry. In all respects the lodging resembles a normal cottage, with a sturdy door, two shuttered windows, and a small fireplace.

The shelter has no heating or cooling source (other than natural insulation qualities). Therefore, it must be heated as a normal dwelling, and extreme heat adversely affects it and its occupants. The dwelling does, however, provide considerable security otherwise—it is as strong as a normal stone building, regardless of its material composition. The dwelling resists flames and fire as if it were stone. It is impervious to normal missiles (but not the sort cast by siege engines or giants).

The door, shutters, and even chimney are secure against intrusion, the former two being arcane locked and the latter secured by an iron grate at the top and a narrow flue. In addition, these three areas are protected by an alarm spell. Finally, an unseen servant is conjured to provide service to you for the duration of the shelter.

The secure shelter contains rude furnishings —eight bunks, a trestle table, eight stools, and a writing desk.

A square chip of stone, crushed lime, a few grains of sand, a sprinkling of water, and several splinters of wood. These must be augmented by the components of the unseen servant spell (string and a bit of wood) if this benefit is to be included.'),
  ('see-invisibility', 'See Invisibility', 'See Invisibility', 'Adivinación', NULL, NULL, '{"sorcerer":2,"wizard":2,"bard":3}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '10 min./Nivel (D)', NULL, NULL, 'You can see any objects or beings that are invisible within your range of vision, as well as any that are ethereal, as if they were normally visible. Such creatures are visible to you as translucent shapes, allowing you easily to discern the difference between visible, invisible, and ethereal creatures.

The spell does not reveal the method used to obtain invisibility. It does not reveal illusions or enable you to see through opaque objects. It does not reveal creatures who are simply hiding, concealed, or otherwise hard to see.

See invisibility can be made permanent with a permanency spell.

A pinch of talc and a small sprinkling of powdered silver.', 'You can see any objects or beings that are invisible within your range of vision, as well as any that are ethereal, as if they were normally visible. Such creatures are visible to you as translucent shapes, allowing you easily to discern the difference between visible, invisible, and ethereal creatures.

The spell does not reveal the method used to obtain invisibility. It does not reveal illusions or enable you to see through opaque objects. It does not reveal creatures who are simply hiding, concealed, or otherwise hard to see.

See invisibility can be made permanent with a permanency spell.

A pinch of talc and a small sprinkling of powdered silver.'),
  ('seeming', 'Seeming', 'Seeming', 'Ilusión', 'Glamour', NULL, '{"sorcerer":5,"wizard":5,"bard":5}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature per two levels, No two of which can be more than 30 ft. apart', NULL, NULL, '12 hours (D)', 'Voluntad anula or Voluntad incredulidad (if interacted with)', true, 'This spell functions like disguise self, except that you can change the appearance of other people as well. Affected creatures resume their normal appearances if slain.

Unwilling targets can negate the spell’s effect on them by making Will saves or with spell resistance.', 'This spell functions like disguise self, except that you can change the appearance of other people as well. Affected creatures resume their normal appearances if slain.

Unwilling targets can negate the spell’s effect on them by making Will saves or with spell resistance.'),
  ('sending', 'Sending', 'Sending', 'Evocación', NULL, NULL, '{"sorcerer":5,"wizard":5,"cleric":4}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '10 minutes', 'See text', 'One creature', NULL, NULL, '1 round; see text', 'Ninguna', false, 'You contact a particular creature with which you are familiar and send a short message of twenty-five words or less to the subject. The subject recognizes you if it knows you. It can answer in like manner immediately. A creature with an Intelligence score as low as 1 can understand the sending, though the subject’s ability to react is limited as normal by its Intelligence score. Even if the sending is received, the subject is not obligated to act upon it in any manner.

If the creature in question is not on the same plane of existence as you are, there is a 5% chance that the sending does not arrive. (Local conditions on other planes may worsen this chance considerably.)

A short piece of fine copper wire.', 'You contact a particular creature with which you are familiar and send a short message of twenty-five words or less to the subject. The subject recognizes you if it knows you. It can answer in like manner immediately. A creature with an Intelligence score as low as 1 can understand the sending, though the subject’s ability to react is limited as normal by its Intelligence score. Even if the sending is received, the subject is not obligated to act upon it in any manner.

If the creature in question is not on the same plane of existence as you are, there is a 5% chance that the sending does not arrive. (Local conditions on other planes may worsen this chance considerably.)

A short piece of fine copper wire.'),
  ('sepia-snake-sigil', 'Sepia Snake Sigil', 'Sepia Snake Sigil', 'Conjuración', 'Creación', ARRAY['Fuerza']::TEXT[], '{"sorcerer":3,"wizard":3,"bard":3}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '10 minutes', 'Toque', 'One touched book or written work', NULL, NULL, 'Permanente or until discharged; until released or 1d4 days + one day/Nivel; see text', 'Reflejos anula', false, 'When you cast sepia snake sigil, a small symbol appears in the text of one written work such as a book, scroll, or map. The text containing the symbol must be at least twenty-five words long. When anyone reads the text containing the symbol, the sepia snake springs into being and strikes the reader, provided there is line of effect between the symbol and the reader.

Simply seeing the enspelled text is not sufficient to trigger the spell; the subject must deliberately read it. The target is entitled to a save to evade the snake’s strike. If it succeeds, the sepia snake dissipates in a flash of brown light accompanied by a puff of dun-colored smoke and a loud noise. If the target fails its save, it is engulfed in a shimmering amber field of force and immobilized until released, either at your command or when 1d4 days + one day per caster level have elapsed.

While trapped in the amber field of force, the subject does not age, breathe, grow hungry, sleep, or regain spells. It is preserved in a state of suspended animation, unaware of its surroundings. It can be damaged by outside forces (and perhaps even killed), since the field provides no protection against physical injury. However, a dying subject does not lose hit points or become stable until the spell ends.

The hidden sigil cannot be detected by normal observation, and detect magic reveals only that the entire text is magical.

A dispel magic can remove the sigil. An erase spell destroys the entire page of text.

Sepia snake sigil can be cast in combination with other spells that hide or garble text, such as secret page.

500 gp worth of powdered amber, a scale from any snake, and a pinch of mushroom spores.', 'When you cast sepia snake sigil, a small symbol appears in the text of one written work such as a book, scroll, or map. The text containing the symbol must be at least twenty-five words long. When anyone reads the text containing the symbol, the sepia snake springs into being and strikes the reader, provided there is line of effect between the symbol and the reader.

Simply seeing the enspelled text is not sufficient to trigger the spell; the subject must deliberately read it. The target is entitled to a save to evade the snake’s strike. If it succeeds, the sepia snake dissipates in a flash of brown light accompanied by a puff of dun-colored smoke and a loud noise. If the target fails its save, it is engulfed in a shimmering amber field of force and immobilized until released, either at your command or when 1d4 days + one day per caster level have elapsed.

While trapped in the amber field of force, the subject does not age, breathe, grow hungry, sleep, or regain spells. It is preserved in a state of suspended animation, unaware of its surroundings. It can be damaged by outside forces (and perhaps even killed), since the field provides no protection against physical injury. However, a dying subject does not lose hit points or become stable until the spell ends.

The hidden sigil cannot be detected by normal observation, and detect magic reveals only that the entire text is magical.

A dispel magic can remove the sigil. An erase spell destroys the entire page of text.

Sepia snake sigil can be cast in combination with other spells that hide or garble text, such as secret page.

500 gp worth of powdered amber, a scale from any snake, and a pinch of mushroom spores.'),
  ('sequester', 'Sequester', 'Sequester', 'Abjuración', NULL, NULL, '{"sorcerer":7,"wizard":7}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'One willing creature or object (up to a 2-ft. cube/Nivel) touched', NULL, NULL, 'One day/Nivel (D)', 'Ninguna or Voluntad anula (object)', true, 'When cast, this spell not only prevents divination spells from working to detect or locate the creature or object affected by sequester, it also renders the affected creature or object invisible to any form of sight or seeing (as the invisibility spell). The spell does not prevent the subject from being discovered through tactile means or through the use of devices. Creatures affected by sequester become comatose and are effectively in a state of suspended animation until the spell wears off or is dispelled.

Note: The Will save prevents an attended or magical object from being sequestered. There is no save to see the sequestered creature or object or to detect it with a divination spell.

A basilisk eyelash, gum arabic, and a dram of whitewash.', 'When cast, this spell not only prevents divination spells from working to detect or locate the creature or object affected by sequester, it also renders the affected creature or object invisible to any form of sight or seeing (as the invisibility spell). The spell does not prevent the subject from being discovered through tactile means or through the use of devices. Creatures affected by sequester become comatose and are effectively in a state of suspended animation until the spell wears off or is dispelled.

Note: The Will save prevents an attended or magical object from being sequestered. There is no save to see the sequestered creature or object or to detect it with a divination spell.

A basilisk eyelash, gum arabic, and a dram of whitewash.'),
  ('shades', 'Shades', 'Shades', 'Ilusión', 'Sombra', NULL, '{"sorcerer":9,"wizard":9}'::JSONB, false, false, false, false, false, false, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'This spell functions like shadow conjuration, except that it mimics sorcerer and wizard conjuration spells of 8th level or lower. The illusory conjurations created deal four-fifths (80%) damage to nonbelievers, and nondamaging effects are 80% likely to work against nonbelievers.', 'This spell functions like shadow conjuration, except that it mimics sorcerer and wizard conjuration spells of 8th level or lower. The illusory conjurations created deal four-fifths (80%) damage to nonbelievers, and nondamaging effects are 80% likely to work against nonbelievers.'),
  ('shadow-conjuration', 'Shadow Conjuration', 'Shadow Conjuration', 'Ilusión', 'Sombra', NULL, '{"sorcerer":4,"wizard":4,"bard":4}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'See text', NULL, NULL, 'See text', 'See text', 'Voluntad incredulidad (if interacted with); varies; see text', true, 'You use material from the Plane of Shadow to shape quasi-real illusions of one or more creatures, objects, or forces. Shadow conjuration can mimic any sorcerer or wizard conjuration (summoning) or conjuration (creation) spell of 3rd level or lower.

Shadow conjurations are actually one-fifth (20%) as strong as the real things, though creatures who believe the shadow conjurations to be real are affected by them at full strength.

Any creature that interacts with the conjured object, force, or creature can make a Will save to recognize its true nature.

Spells that deal damage have normal effects unless the affected creature succeeds on a Will save. Each disbelieving creature takes only one-fifth (20%) damage from the attack. If the disbelieved attack has a special effect other than damage, that effect is only 20% likely to occur. Regardless of the result of the save to disbelieve, an affected creature is also allowed any save that the spell being simulated allows, but the save DC is set according to shadow conjuration’s level (4th) rather than the spell’s normal level. In addition, any effect created by shadow conjuration allows spell resistance, even if the spell it is simulating does not. Shadow objects or substances have normal effects except against those who disbelieve them.

Against disbelievers, they are 20% likely to work.

A shadow creature has one-fifth the hit points of a normal creature of its kind (regardless of whether it’s recognized as shadowy). It deals normal damage and has all normal abilities and weaknesses. Against a creature that recognizes it as a shadow creature, however, the shadow creature’s damage is one-fifth (20%) normal, and all special abilities that do not deal lethal damage are only 20% likely to work. (Roll for each use and each affected character separately.) Furthermore, the shadow creature’s AC bonuses are one-fifth as large.

A creature that succeeds on its save sees the shadow conjurations as transparent images superimposed on vague, shadowy forms.

Objects automatically succeed on their Will saves against this spell.', 'You use material from the Plane of Shadow to shape quasi-real illusions of one or more creatures, objects, or forces. Shadow conjuration can mimic any sorcerer or wizard conjuration (summoning) or conjuration (creation) spell of 3rd level or lower.

Shadow conjurations are actually one-fifth (20%) as strong as the real things, though creatures who believe the shadow conjurations to be real are affected by them at full strength.

Any creature that interacts with the conjured object, force, or creature can make a Will save to recognize its true nature.

Spells that deal damage have normal effects unless the affected creature succeeds on a Will save. Each disbelieving creature takes only one-fifth (20%) damage from the attack. If the disbelieved attack has a special effect other than damage, that effect is only 20% likely to occur. Regardless of the result of the save to disbelieve, an affected creature is also allowed any save that the spell being simulated allows, but the save DC is set according to shadow conjuration’s level (4th) rather than the spell’s normal level. In addition, any effect created by shadow conjuration allows spell resistance, even if the spell it is simulating does not. Shadow objects or substances have normal effects except against those who disbelieve them.

Against disbelievers, they are 20% likely to work.

A shadow creature has one-fifth the hit points of a normal creature of its kind (regardless of whether it’s recognized as shadowy). It deals normal damage and has all normal abilities and weaknesses. Against a creature that recognizes it as a shadow creature, however, the shadow creature’s damage is one-fifth (20%) normal, and all special abilities that do not deal lethal damage are only 20% likely to work. (Roll for each use and each affected character separately.) Furthermore, the shadow creature’s AC bonuses are one-fifth as large.

A creature that succeeds on its save sees the shadow conjurations as transparent images superimposed on vague, shadowy forms.

Objects automatically succeed on their Will saves against this spell.'),
  ('shadow-conjuration-greater', 'Shadow Conjuration, Greater', 'Shadow Conjuration, Greater', 'Ilusión', 'Sombra', NULL, '{"sorcerer":7,"wizard":7}'::JSONB, false, false, false, false, false, false, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'This spell functions like shadow conjuration, except that it can duplicate any sorcerer or wizard conjuration (summoning) or conjuration (creation) spell of 6th level or lower. The illusory conjurations created deal three-fifths (60%) damage to nonbelievers, and nondamaging effects are 60% likely to work against nonbelievers.', 'This spell functions like shadow conjuration, except that it can duplicate any sorcerer or wizard conjuration (summoning) or conjuration (creation) spell of 6th level or lower. The illusory conjurations created deal three-fifths (60%) damage to nonbelievers, and nondamaging effects are 60% likely to work against nonbelievers.'),
  ('shadow-evocation', 'Shadow Evocation', 'Shadow Evocation', 'Ilusión', 'Sombra', NULL, '{"sorcerer":5,"wizard":5,"bard":5}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'See text', NULL, NULL, 'See text', 'See text', 'Voluntad incredulidad (if interacted with)', true, 'You tap energy from the Plane of Shadow to cast a quasi-real, illusory version of a sorcerer or wizard evocation spell of 4th level or lower. (For a spell with more than one level, use the best one applicable to you.)

Spells that deal damage have normal effects unless an affected creature succeeds on a Will save. Each disbelieving creature takes only one-fifth damage from the attack. If the disbelieved attack has a special effect other than damage, that effect is one-fifth as strong (if applicable) or only 20% likely to occur. If recognized as a shadow evocation, a damaging spell deals only one-fifth (20%) damage. Regardless of the result of the save to disbelieve, an affected creature is also allowed any save (or spell resistance) that the spell being simulated allows, but the save DC is set according to shadow evocation’s level (5th) rather than the spell’s normal level.

Nondamaging effects have normal effects except against those who disbelieve them. Against disbelievers, they have no effect.

Objects automatically succeed on their Will saves against this spell.', 'You tap energy from the Plane of Shadow to cast a quasi-real, illusory version of a sorcerer or wizard evocation spell of 4th level or lower. (For a spell with more than one level, use the best one applicable to you.)

Spells that deal damage have normal effects unless an affected creature succeeds on a Will save. Each disbelieving creature takes only one-fifth damage from the attack. If the disbelieved attack has a special effect other than damage, that effect is one-fifth as strong (if applicable) or only 20% likely to occur. If recognized as a shadow evocation, a damaging spell deals only one-fifth (20%) damage. Regardless of the result of the save to disbelieve, an affected creature is also allowed any save (or spell resistance) that the spell being simulated allows, but the save DC is set according to shadow evocation’s level (5th) rather than the spell’s normal level.

Nondamaging effects have normal effects except against those who disbelieve them. Against disbelievers, they have no effect.

Objects automatically succeed on their Will saves against this spell.'),
  ('shadow-evocation-greater', 'Shadow Evocation, Greater', 'Shadow Evocation, Greater', 'Ilusión', 'Sombra', NULL, '{"sorcerer":8,"wizard":8}'::JSONB, false, false, false, false, false, false, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'This spell functions like shadow evocation, except that it enables you to create partially real, illusory versions of sorcerer or wizard evocation spells of 7th level or lower. If recognized as a greater shadow evocation, a damaging spell deals only three-fifths (60%) damage.', 'This spell functions like shadow evocation, except that it enables you to create partially real, illusory versions of sorcerer or wizard evocation spells of 7th level or lower. If recognized as a greater shadow evocation, a damaging spell deals only three-fifths (60%) damage.'),
  ('shadow-walk', 'Shadow Walk', 'Shadow Walk', 'Ilusión', 'Sombra', NULL, '{"sorcerer":6,"wizard":6,"bard":5}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Up to one touched creature/ Nivel', NULL, NULL, '1 hour/Nivel (D)', 'Voluntad anula', true, 'To use the shadow walk spell, you must be in an area of shadowy illumination. You and any creature you touch are then transported along a coiling path of shadowstuff to the edge of the Material Plane where it borders the Plane of Shadow. The effect is largely illusory, but the path is quasi-real. You can take more than one creature along with you (subject to your level limit), but all must be touching each other.

In the region of shadow, you move at a rate of 50 miles per hour, moving normally on the borders of the Plane of Shadow but much more rapidly relative to the Material Plane. Thus, you can use this spell to travel rapidly by stepping onto the Plane of Shadow, moving the desired distance, and then stepping back onto the Material Plane.

Because of the blurring of reality between the Plane of Shadow and the Material Plane, you can’t make out details of the terrain or areas you pass over during transit, nor can you predict perfectly where your travel will end. It’s impossible to judge distances accurately, making the spell virtually useless for scouting or spying. Furthermore, when the spell effect ends, you are shunted 1d10×100 feet in a random horizontal direction from your desired endpoint. If this would place you within a solid object, you are shunted 1d10×1,000 feet in the same direction. If this would still place you within a solid object, you (and any creatures with you) are shunted to the nearest empty space available, but the strain of this activity renders each creature fatigued (no save).

Shadow walk can also be used to travel to other planes that border on the Plane of Shadow, but this usage requires the transit of the Plane of Shadow to arrive at a border with another plane of reality. The transit of the Plane of Shadow requires 1d4 hours.

Any creatures touched by you when shadow walk is cast also make the transition to the borders of the Plane of Shadow.

They may opt to follow you, wander off through the plane, or stumble back into the Material Plane (50% chance for either of the latter results if they are lost or abandoned by you). Creatures unwilling to accompany you into the Plane of Shadow receive a Will saving throw, negating the effect if successful.', 'To use the shadow walk spell, you must be in an area of shadowy illumination. You and any creature you touch are then transported along a coiling path of shadowstuff to the edge of the Material Plane where it borders the Plane of Shadow. The effect is largely illusory, but the path is quasi-real. You can take more than one creature along with you (subject to your level limit), but all must be touching each other.

In the region of shadow, you move at a rate of 50 miles per hour, moving normally on the borders of the Plane of Shadow but much more rapidly relative to the Material Plane. Thus, you can use this spell to travel rapidly by stepping onto the Plane of Shadow, moving the desired distance, and then stepping back onto the Material Plane.

Because of the blurring of reality between the Plane of Shadow and the Material Plane, you can’t make out details of the terrain or areas you pass over during transit, nor can you predict perfectly where your travel will end. It’s impossible to judge distances accurately, making the spell virtually useless for scouting or spying. Furthermore, when the spell effect ends, you are shunted 1d10×100 feet in a random horizontal direction from your desired endpoint. If this would place you within a solid object, you are shunted 1d10×1,000 feet in the same direction. If this would still place you within a solid object, you (and any creatures with you) are shunted to the nearest empty space available, but the strain of this activity renders each creature fatigued (no save).

Shadow walk can also be used to travel to other planes that border on the Plane of Shadow, but this usage requires the transit of the Plane of Shadow to arrive at a border with another plane of reality. The transit of the Plane of Shadow requires 1d4 hours.

Any creatures touched by you when shadow walk is cast also make the transition to the borders of the Plane of Shadow.

They may opt to follow you, wander off through the plane, or stumble back into the Material Plane (50% chance for either of the latter results if they are lost or abandoned by you). Creatures unwilling to accompany you into the Plane of Shadow receive a Will saving throw, negating the effect if successful.'),
  ('shambler', 'Shambler', 'Shambler', 'Conjuración', 'Creación', NULL, '{"druid":9}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Three or more shambling mounds, No two of which can be more than 30 ft. apart; see text', 'Seven days or seven months (D); see text', 'Ninguna', false, 'The shambler spell creates 1d4+2 shambling mounds with 11 HD each. The creatures willingly aid you in combat or battle, perform a specific mission, or serve as bodyguards. The creatures remain with you for seven days unless you dismiss them. If the shamblers are created only for guard duty, however, the duration of the spell is seven months. In this case, the shamblers can only be ordered to guard a specific site or location. Shamblers summoned to guard duty cannot move outside the spell’s range, which is measured from the point where each first appeared.

The shamblers have resistance to fire as normal shambling mounds do only if the terrain is rainy, marshy, or damp.', 'The shambler spell creates 1d4+2 shambling mounds with 11 HD each. The creatures willingly aid you in combat or battle, perform a specific mission, or serve as bodyguards. The creatures remain with you for seven days unless you dismiss them. If the shamblers are created only for guard duty, however, the duration of the spell is seven months. In this case, the shamblers can only be ordered to guard a specific site or location. Shamblers summoned to guard duty cannot move outside the spell’s range, which is measured from the point where each first appeared.

The shamblers have resistance to fire as normal shambling mounds do only if the terrain is rainy, marshy, or damp.'),
  ('shapechange', 'Shapechange', 'Shapechange', 'Transmutación', NULL, NULL, '{"sorcerer":9,"wizard":9,"druid":9}'::JSONB, true, true, false, true, false, false, NULL, 'A jade circlet worth no less than 1,500 gp, which you must place on your head when casting the spell. (The melds into your new form when you change shape.)', NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '10 min./Nivel (D)', NULL, NULL, 'This spell functions like polymorph, except that it enables you to assume the form of any single nonunique creature (of any type) from Fine to Colossal size. The assumed form cannot have more than your caster level in Hit Dice (to a maximum of 25 HD). Unlike polymorph, this spell allows incorporeal or gaseous forms to be assumed.

You gain all extraordinary and supernatural abilities (both attacks and qualities) of the assumed form, but you lose your own supernatural abilities. You also gain the type of the new form in place of your own. The new form does not disorient you. Parts of your body or pieces of equipment that are separated from you do not revert to their original forms.

You can become just about anything you are familiar with. You can change form once each round as a free action. The change takes place either immediately before your regular action or immediately after it, but not during the action. If you use this spell to create a disguise, you get a +10 bonus on your Disguise check.', 'This spell functions like polymorph, except that it enables you to assume the form of any single nonunique creature (of any type) from Fine to Colossal size. The assumed form cannot have more than your caster level in Hit Dice (to a maximum of 25 HD). Unlike polymorph, this spell allows incorporeal or gaseous forms to be assumed.

You gain all extraordinary and supernatural abilities (both attacks and qualities) of the assumed form, but you lose your own supernatural abilities. You also gain the type of the new form in place of your own. The new form does not disorient you. Parts of your body or pieces of equipment that are separated from you do not revert to their original forms.

You can become just about anything you are familiar with. You can change form once each round as a free action. The change takes place either immediately before your regular action or immediately after it, but not during the action. If you use this spell to create a disguise, you get a +10 bonus on your Disguise check.'),
  ('shatter', 'Shatter', 'Shatter', 'Evocación', NULL, ARRAY['Sónico']::TEXT[], '{"sorcerer":2,"wizard":2,"cleric":2,"bard":2}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, NULL, 'Instantáneo', 'Voluntad anula (object); Voluntad anula (object) or Fortaleza mitad; see text', true, 'Shatter creates a loud, ringing noise that breaks brittle, nonmagical objects; sunders a single solid, nonmagical object; or damages a crystalline creature.

Used as an area attack, shatter destroys nonmagical objects of crystal, glass, ceramic, or porcelain. All such objects within a 5-foot radius of the point of origin are smashed into dozens of pieces by the spell. Objects weighing more than 1 pound per your level are not affected, but all other objects of the appropriate composition are shattered.

Alternatively, you can target shatter against a single solid object, regardless of composition, weighing up to 10 pounds per caster level. Targeted against a crystalline creature (of any weight), shatter deals 1d6 points of sonic damage per caster level (maximum 10d6), with a Fortitude save for half damage.

A chip of mica.', 'Shatter creates a loud, ringing noise that breaks brittle, nonmagical objects; sunders a single solid, nonmagical object; or damages a crystalline creature.

Used as an area attack, shatter destroys nonmagical objects of crystal, glass, ceramic, or porcelain. All such objects within a 5-foot radius of the point of origin are smashed into dozens of pieces by the spell. Objects weighing more than 1 pound per your level are not affected, but all other objects of the appropriate composition are shattered.

Alternatively, you can target shatter against a single solid object, regardless of composition, weighing up to 10 pounds per caster level. Targeted against a crystalline creature (of any weight), shatter deals 1d6 points of sonic damage per caster level (maximum 10d6), with a Fortitude save for half damage.

A chip of mica.'),
  ('shield', 'Shield', 'Shield', 'Abjuración', NULL, ARRAY['Fuerza']::TEXT[], '{"sorcerer":1,"wizard":1}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 min./Nivel (D)', NULL, NULL, 'Shield creates an invisible, tower shield-sized mobile disk of force that hovers in front of you. It negates magic missile attacks directed at you. The disk also provides a +4 shield bonus to AC. This bonus applies against incorporeal touch attacks, since it is a force effect. The shield has no armor check penalty or arcane spell failure chance. Unlike with a normal tower shield, you can’t use the shield spell for cover.', 'Shield creates an invisible, tower shield-sized mobile disk of force that hovers in front of you. It negates magic missile attacks directed at you. The disk also provides a +4 shield bonus to AC. This bonus applies against incorporeal touch attacks, since it is a force effect. The shield has no armor check penalty or arcane spell failure chance. Unlike with a normal tower shield, you can’t use the shield spell for cover.'),
  ('shield-of-faith', 'Shield of Faith', 'Shield of Faith', 'Abjuración', NULL, NULL, '{"cleric":1}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 min./Nivel', 'Voluntad anula (harmless)', true, 'This spell creates a shimmering, magical field around the touched creature that averts attacks. The spell grants the subject a +2 deflection bonus to AC, with an additional +1 to the bonus for every six levels you have (maximum +5 deflection bonus at 18th level).

A small parchment with a bit of holy text written upon it.', 'This spell creates a shimmering, magical field around the touched creature that averts attacks. The spell grants the subject a +2 deflection bonus to AC, with an additional +1 to the bonus for every six levels you have (maximum +5 deflection bonus at 18th level).

A small parchment with a bit of holy text written upon it.'),
  ('shield-of-law', 'Shield of Law', 'Shield of Law', 'Abjuración', NULL, ARRAY['Legal']::TEXT[], '{"cleric":8}'::JSONB, true, true, false, true, false, false, NULL, NULL, NULL, '1 standard action', '20 ft.', 'One creature/Nivel in a 20-ft.-radius burst centered on you', NULL, NULL, '1 round/Nivel (D)', 'See text', true, 'A dim, blue glow surrounds the subjects, protecting them from attacks, granting them resistance to spells cast by chaotic creatures, and slowing chaotic creatures when they strike the subjects. This abjuration has four effects.

First, each warded creature gains a +4 deflection bonus to AC and a +4 resistance bonus on saves. Unlike protection from chaos, this benefit applies against all attacks, not just against attacks by chaotic creatures.

Second, a warded creature gains spell resistance 25 against chaotic spells and spells cast by chaotic creatures.

Third, the abjuration blocks possession and mental influence, just as protection from chaos does.

Finally, if a chaotic creature succeeds on a melee attack against a warded creature, the attacker is slowed (Will save negates, as the slow spell, but against shield of law’s save DC).

A tiny reliquary containing some sacred relic, such as a scrap of parchment from a lawful text. The reliquary costs at least 500 gp.', 'A dim, blue glow surrounds the subjects, protecting them from attacks, granting them resistance to spells cast by chaotic creatures, and slowing chaotic creatures when they strike the subjects. This abjuration has four effects.

First, each warded creature gains a +4 deflection bonus to AC and a +4 resistance bonus on saves. Unlike protection from chaos, this benefit applies against all attacks, not just against attacks by chaotic creatures.

Second, a warded creature gains spell resistance 25 against chaotic spells and spells cast by chaotic creatures.

Third, the abjuration blocks possession and mental influence, just as protection from chaos does.

Finally, if a chaotic creature succeeds on a melee attack against a warded creature, the attacker is slowed (Will save negates, as the slow spell, but against shield of law’s save DC).

A tiny reliquary containing some sacred relic, such as a scrap of parchment from a lawful text. The reliquary costs at least 500 gp.'),
  ('shield-other', 'Shield Other', 'Shield Other', 'Abjuración', NULL, NULL, '{"cleric":2,"paladin":2}'::JSONB, true, true, false, true, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature', NULL, NULL, '1 hour/Nivel (D)', 'Voluntad anula (harmless)', true, 'This spell wards the subject and creates a mystic connection between you and the subject so that some of its wounds are transferred to you. The subject gains a +1 deflection bonus to AC and a +1 resistance bonus on saves. Additionally, the subject takes only half damage from all wounds and attacks (including that dealt by special abilities) that deal hit point damage. The amount of damage not taken by the warded creature is taken by you. Forms of harm that do not involve hit points, such as charm effects, temporary ability damage, level draining, and death effects, are not affected. If the subject suffers a reduction of hit points from a lowered Constitution score, the reduction is not split with you because it is not hit point damage. When the spell ends, subsequent damage is no longer divided between the subject and you, but damage already split is not reassigned to the subject.

If you and the subject of the spell move out of range of each other, the spell ends.

A pair of platinum rings (worth at least 50 gp each) worn by both you and the warded creature.', 'This spell wards the subject and creates a mystic connection between you and the subject so that some of its wounds are transferred to you. The subject gains a +1 deflection bonus to AC and a +1 resistance bonus on saves. Additionally, the subject takes only half damage from all wounds and attacks (including that dealt by special abilities) that deal hit point damage. The amount of damage not taken by the warded creature is taken by you. Forms of harm that do not involve hit points, such as charm effects, temporary ability damage, level draining, and death effects, are not affected. If the subject suffers a reduction of hit points from a lowered Constitution score, the reduction is not split with you because it is not hit point damage. When the spell ends, subsequent damage is no longer divided between the subject and you, but damage already split is not reassigned to the subject.

If you and the subject of the spell move out of range of each other, the spell ends.

A pair of platinum rings (worth at least 50 gp each) worn by both you and the warded creature.'),
  ('shillelagh', 'Shillelagh', 'Shillelagh', 'Transmutación', NULL, NULL, '{"druid":1}'::JSONB, true, true, false, false, true, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'One touched nonmagical oak club or quarterstaff', NULL, NULL, '1 min./Nivel', 'Voluntad anula (object)', true, 'Your own nonmagical club or quarterstaff becomes a weapon with a +1 enhancement bonus on attack and damage rolls. (A quarterstaff gains this enhancement for both ends of the weapon.) It deals damage as if it were two size categories larger. These effects only occur when the weapon is wielded by you. If you do not wield it, the weapon behaves as if unaffected by this spell.', 'Your own nonmagical club or quarterstaff becomes a weapon with a +1 enhancement bonus on attack and damage rolls. (A quarterstaff gains this enhancement for both ends of the weapon.) It deals damage as if it were two size categories larger. These effects only occur when the weapon is wielded by you. If you do not wield it, the weapon behaves as if unaffected by this spell.'),
  ('shocking-grasp', 'Shocking Grasp', 'Shocking Grasp', 'Evocación', NULL, ARRAY['Electricidad']::TEXT[], '{"sorcerer":1,"wizard":1}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Creature or object touched', NULL, NULL, 'Instantáneo', 'Ninguna', true, 'Your successful melee touch attack deals 1d6 points of electricity damage per caster level (maximum 5d6). When delivering the jolt, you gain a +3 bonus on attack rolls if the opponent is wearing metal armor (or made out of metal, carrying a lot of metal, or the like).', 'Your successful melee touch attack deals 1d6 points of electricity damage per caster level (maximum 5d6). When delivering the jolt, you gain a +3 bonus on attack rolls if the opponent is wearing metal armor (or made out of metal, carrying a lot of metal, or the like).'),
  ('shout', 'Shout', 'Shout', 'Evocación', NULL, ARRAY['Sónico']::TEXT[], '{"sorcerer":4,"wizard":4,"bard":4}'::JSONB, true, false, false, false, false, false, NULL, NULL, NULL, '1 standard action', '30 ft.', NULL, 'Cone-shaped burst', NULL, 'Instantáneo', 'Fortaleza parcial or Reflejos anula (object); see text', true, 'You emit an ear-splitting yell that deafens and damages creatures in its path. Any creature within the area is deafened for 2d6 rounds and takes 5d6 points of sonic damage. A successful save negates the deafness and reduces the damage by half. Any exposed brittle or crystalline object or crystalline creature takes 1d6 points of sonic damage per caster level (maximum 15d6). An affected creature is allowed a Fortitude save to reduce the damage by half, and a creature holding fragile objects can negate damage to them with a successful Reflex save.

A shout spell cannot penetrate a silence spell.', 'You emit an ear-splitting yell that deafens and damages creatures in its path. Any creature within the area is deafened for 2d6 rounds and takes 5d6 points of sonic damage. A successful save negates the deafness and reduces the damage by half. Any exposed brittle or crystalline object or crystalline creature takes 1d6 points of sonic damage per caster level (maximum 15d6). An affected creature is allowed a Fortitude save to reduce the damage by half, and a creature holding fragile objects can negate damage to them with a successful Reflex save.

A shout spell cannot penetrate a silence spell.'),
  ('shout-greater', 'Shout, Greater', 'Shout, Greater', 'Evocación', NULL, ARRAY['Sónico']::TEXT[], '{"sorcerer":8,"wizard":8,"bard":6}'::JSONB, true, true, false, true, false, false, NULL, NULL, NULL, NULL, '60 ft.', NULL, NULL, NULL, NULL, 'Fortaleza parcial or Reflejos anula (object); see text', NULL, 'This spell functions like shout, except that the cone deals 10d6 points of sonic damage (or 1d6 points of sonic damage per caster level, maximum 20d6, against exposed brittle or crystalline objects or crystalline creatures). It also causes creatures to be stunned for 1 round and deafened for 4d6 rounds. A creature in the area of the cone can negate the stunning and halve both the damage and the duration of the deafness with a successful Fortitude save. A creature holding vulnerable objects can attempt a Reflex save to negate the damage to those objects.

A small metal or ivory horn.', 'This spell functions like shout, except that the cone deals 10d6 points of sonic damage (or 1d6 points of sonic damage per caster level, maximum 20d6, against exposed brittle or crystalline objects or crystalline creatures). It also causes creatures to be stunned for 1 round and deafened for 4d6 rounds. A creature in the area of the cone can negate the stunning and halve both the damage and the duration of the deafness with a successful Fortitude save. A creature holding vulnerable objects can attempt a Reflex save to negate the damage to those objects.

A small metal or ivory horn.'),
  ('shrink-item', 'Shrink Item', 'Shrink Item', 'Transmutación', NULL, NULL, '{"sorcerer":3,"wizard":3}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'One touched object of up to 2 cu. ft./Nivel', NULL, NULL, 'One day/Nivel; see text', 'Voluntad anula (object)', true, 'You are able to shrink one nonmagical item (if it is within the size limit) to 1/16 of its normal size in each dimension (to about 1/4,000 the original volume and mass). This change effectively reduces the object’s size by four categories. Optionally, you can also change its now shrunken composition to a clothlike one. Objects changed by a shrink item spell can be returned to normal composition and size merely by tossing them onto any solid surface or by a word of command from the original caster. Even a burning fire and its fuel can be shrunk by this spell. Restoring the shrunken object to its normal size and composition ends the spell.

Shrink item can be made permanent with a permanency spell, in which case the affected object can be shrunk and expanded an indefinite number of times, but only by the original caster.', 'You are able to shrink one nonmagical item (if it is within the size limit) to 1/16 of its normal size in each dimension (to about 1/4,000 the original volume and mass). This change effectively reduces the object’s size by four categories. Optionally, you can also change its now shrunken composition to a clothlike one. Objects changed by a shrink item spell can be returned to normal composition and size merely by tossing them onto any solid surface or by a word of command from the original caster. Even a burning fire and its fuel can be shrunk by this spell. Restoring the shrunken object to its normal size and composition ends the spell.

Shrink item can be made permanent with a permanency spell, in which case the affected object can be shrunk and expanded an indefinite number of times, but only by the original caster.'),
  ('silence', 'Silence', 'Silence', 'Ilusión', 'Glamour', NULL, '{"cleric":2,"bard":2}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, '20-ft.-radius emanation centered on a creature, object, or point in space', NULL, '1 min./Nivel (D)', 'Voluntad anula; see text or Ninguna (object)', true, 'Upon the casting of this spell, complete silence prevails in the affected area. All sound is stopped: Conversation is impossible, spells with verbal components cannot be cast, and no noise whatsoever issues from, enters, or passes through the area. The spell can be cast on a point in space, but the effect is stationary unless cast on a mobile object. The spell can be centered on a creature, and the effect then radiates from the creature and moves as it moves. An unwilling creature can attempt a Will save to negate the spell and can use spell resistance, if any. Items in a creature’s possession or magic items that emit sound receive the benefits of saves and spell resistance, but unattended objects and points in space do not. This spell provides a defense against sonic or language-based attacks.', 'Upon the casting of this spell, complete silence prevails in the affected area. All sound is stopped: Conversation is impossible, spells with verbal components cannot be cast, and no noise whatsoever issues from, enters, or passes through the area. The spell can be cast on a point in space, but the effect is stationary unless cast on a mobile object. The spell can be centered on a creature, and the effect then radiates from the creature and moves as it moves. An unwilling creature can attempt a Will save to negate the spell and can use spell resistance, if any. Items in a creature’s possession or magic items that emit sound receive the benefits of saves and spell resistance, but unattended objects and points in space do not. This spell provides a defense against sonic or language-based attacks.'),
  ('silent-image', 'Silent Image', 'Silent Image', 'Ilusión', 'Engaño', NULL, '{"sorcerer":1,"wizard":1,"bard":1}'::JSONB, true, true, false, true, false, false, NULL, NULL, NULL, '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, NULL, 'Visual Engaño that cannot extend beyond four 10-ft. cubes + one 10-ft. cube/Nivel (S)', 'Concentración', 'Voluntad incredulidad (if interacted with)', false, 'This spell creates the visual illusion of an object, creature, or force, as visualized by you. The illusion does not create sound, smell, texture, or temperature. You can move the image within the limits of the size of the effect.

A bit of fleece.', 'This spell creates the visual illusion of an object, creature, or force, as visualized by you. The illusion does not create sound, smell, texture, or temperature. You can move the image within the limits of the size of the effect.

A bit of fleece.'),
  ('simulacrum', 'Simulacrum', 'Simulacrum', 'Ilusión', 'Sombra', NULL, '{"sorcerer":7,"wizard":7}'::JSONB, true, true, true, false, false, true, NULL, NULL, NULL, '12 hours', '0 ft.', NULL, NULL, 'One duplicate creature', 'Instantáneo', 'Ninguna', false, 'Simulacrum creates an illusory duplicate of any creature. The duplicate creature is partially real and formed from ice or snow. It appears to be the same as the original, but it has only one-half of the real creature’s levels or Hit Dice (and the appropriate hit points, feats, skill ranks, and special abilities for a creature of that level or HD). You can’t create a simulacrum of a creature whose Hit Dice or levels exceed twice your caster level. You must make a Disguise check when you cast the spell to determine how good the likeness is. A creature familiar with the original might detect the ruse with a successful Spot check (opposed by the caster’s Disguise check) or a DC 20 Sense Motive check.

At all times the simulacrum remains under your absolute command. No special telepathic link exists, so command must be exercised in some other manner. A simulacrum has no ability to become more powerful. It cannot increase its level or abilities. If reduced to 0 hit points or otherwise destroyed, it reverts to snow and melts instantly into nothingness. A complex process requiring at least 24 hours, 100 gp per hit point, and a fully equipped magical laboratory can repair damage to a simulacrum.

The spell is cast over the rough snow or ice form, and some piece of the creature to be duplicated (hair, nail, or the like) must be placed inside the snow or ice. Additionally, the spell requires powdered ruby worth 100 gp per HD of the simulacrum to be created.

100 XP per HD of the simulacrum to be created (minimum 1,000 XP).', 'Simulacrum creates an illusory duplicate of any creature. The duplicate creature is partially real and formed from ice or snow. It appears to be the same as the original, but it has only one-half of the real creature’s levels or Hit Dice (and the appropriate hit points, feats, skill ranks, and special abilities for a creature of that level or HD). You can’t create a simulacrum of a creature whose Hit Dice or levels exceed twice your caster level. You must make a Disguise check when you cast the spell to determine how good the likeness is. A creature familiar with the original might detect the ruse with a successful Spot check (opposed by the caster’s Disguise check) or a DC 20 Sense Motive check.

At all times the simulacrum remains under your absolute command. No special telepathic link exists, so command must be exercised in some other manner. A simulacrum has no ability to become more powerful. It cannot increase its level or abilities. If reduced to 0 hit points or otherwise destroyed, it reverts to snow and melts instantly into nothingness. A complex process requiring at least 24 hours, 100 gp per hit point, and a fully equipped magical laboratory can repair damage to a simulacrum.

The spell is cast over the rough snow or ice form, and some piece of the creature to be duplicated (hair, nail, or the like) must be placed inside the snow or ice. Additionally, the spell requires powdered ruby worth 100 gp per HD of the simulacrum to be created.

100 XP per HD of the simulacrum to be created (minimum 1,000 XP).'),
  ('slay-living', 'Slay Living', 'Slay Living', 'Nigromancia', NULL, ARRAY['Muerte']::TEXT[], '{"cleric":5}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Living creature touched', NULL, NULL, 'Instantáneo', 'Fortaleza parcial', true, 'You can slay any one living creature. You must succeed on a melee touch attack to touch the subject, and it can avoid death with a successful Fortitude save. If it succeeds, it instead takes 3d6 points of damage +1 point per caster level.', 'You can slay any one living creature. You must succeed on a melee touch attack to touch the subject, and it can avoid death with a successful Fortitude save. If it succeeds, it instead takes 3d6 points of damage +1 point per caster level.'),
  ('sleep', 'Sleep', 'Sleep', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '{"sorcerer":1,"wizard":1,"bard":1}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 round', 'Medio (100 ft. + 10 ft./Nivel)', NULL, 'One or more living creatures within a 10-ft.-radius burst', NULL, '1 min./Nivel', 'Voluntad anula', true, 'A sleep spell causes a magical slumber to come upon 4 Hit Dice of creatures. Creatures with the fewest HD are affected first.

Among creatures with equal HD, those who are closest to the spell’s point of origin are affected first. Hit Dice that are not sufficient to affect a creature are wasted.

Sleeping creatures are helpless. Slapping or wounding awakens an affected creature, but normal noise does not. Awakening a creature is a standard action (an application of the aid another action).

Sleep does not target unconscious creatures, constructs, or undead creatures.

A pinch of fine sand, rose petals, or a live cricket.', 'A sleep spell causes a magical slumber to come upon 4 Hit Dice of creatures. Creatures with the fewest HD are affected first.

Among creatures with equal HD, those who are closest to the spell’s point of origin are affected first. Hit Dice that are not sufficient to affect a creature are wasted.

Sleeping creatures are helpless. Slapping or wounding awakens an affected creature, but normal noise does not. Awakening a creature is a standard action (an application of the aid another action).

Sleep does not target unconscious creatures, constructs, or undead creatures.

A pinch of fine sand, rose petals, or a live cricket.'),
  ('sleet-storm', 'Sleet Storm', 'Sleet Storm', 'Conjuración', 'Creación', ARRAY['Frío']::TEXT[], '{"sorcerer":3,"wizard":3,"druid":3}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, 'Cylinder (40-ft. radius, 20 ft. high)', NULL, '1 round/Nivel', 'Ninguna', false, 'Driving sleet blocks all sight (even darkvision) within it and causes the ground in the area to be icy. A creature can walk within or through the area of sleet at half normal speed with a DC 10 Balance check. Failure means it can’t move in that round, while failure by 5 or more means it falls (see the Balance skill for details).

The sleet extinguishes torches and small fires.

A pinch of dust and a few drops of water.', 'Driving sleet blocks all sight (even darkvision) within it and causes the ground in the area to be icy. A creature can walk within or through the area of sleet at half normal speed with a DC 10 Balance check. Failure means it can’t move in that round, while failure by 5 or more means it falls (see the Balance skill for details).

The sleet extinguishes torches and small fires.

A pinch of dust and a few drops of water.'),
  ('slow', 'Slow', 'Slow', 'Transmutación', NULL, NULL, '{"sorcerer":3,"wizard":3,"bard":3}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature/Nivel, No two of which can be more than 30 ft. apart', NULL, NULL, '1 round/Nivel', 'Voluntad anula', true, 'An affected creature moves and attacks at a drastically slowed rate. A slowed creature can take only a single move action or standard action each turn, but not both (nor may it take full-round actions). Additionally, it takes a -1 penalty on attack rolls, AC, and Reflex saves. A slowed creature moves at half its normal speed (round down to the next 5-foot increment), which affects the creature’s jumping distance as normal for decreased speed.

Multiple slow effects don’t stack. Slow counters and dispels haste.

A drop of molasses.', 'An affected creature moves and attacks at a drastically slowed rate. A slowed creature can take only a single move action or standard action each turn, but not both (nor may it take full-round actions). Additionally, it takes a -1 penalty on attack rolls, AC, and Reflex saves. A slowed creature moves at half its normal speed (round down to the next 5-foot increment), which affects the creature’s jumping distance as normal for decreased speed.

Multiple slow effects don’t stack. Slow counters and dispels haste.

A drop of molasses.'),
  ('snare', 'Snare', 'Snare', 'Transmutación', NULL, NULL, '{"druid":3,"ranger":2}'::JSONB, true, true, false, false, true, false, NULL, NULL, NULL, '3 rounds', 'Toque', 'Touched nonmagical circle of vine, rope, or thong with a 2 ft. diameter + 2 ft./Nivel', NULL, NULL, 'Until triggered or broken', 'Ninguna', false, 'This spell enables you to make a snare that functions as a magic trap. The snare can be made from any supple vine, a thong, or a rope. When you cast snare upon it, the cordlike object blends with its surroundings (Search DC 23 for a character with the trapfinding ability to locate). One end of the snare is tied in a loop that contracts around one or more of the limbs of any creature stepping inside the circle.

If a strong and supple tree is nearby, the snare can be fastened to it. The spell causes the tree to bend and then straighten when the loop is triggered, dealing 1d6 points of damage to the creature trapped and lifting it off the ground by the trapped limb or limbs. If no such tree is available, the cordlike object tightens around the creature, dealing no damage but causing it to be entangled.

The snare is magical. To escape, a trapped creature must make a DC 23 Escape Artist check or a DC 23 Strength check that is a full-round action. The snare has AC 7 and 5 hit points. A successful escape from the snare breaks the loop and ends the spell.', 'This spell enables you to make a snare that functions as a magic trap. The snare can be made from any supple vine, a thong, or a rope. When you cast snare upon it, the cordlike object blends with its surroundings (Search DC 23 for a character with the trapfinding ability to locate). One end of the snare is tied in a loop that contracts around one or more of the limbs of any creature stepping inside the circle.

If a strong and supple tree is nearby, the snare can be fastened to it. The spell causes the tree to bend and then straighten when the loop is triggered, dealing 1d6 points of damage to the creature trapped and lifting it off the ground by the trapped limb or limbs. If no such tree is available, the cordlike object tightens around the creature, dealing no damage but causing it to be entangled.

The snare is magical. To escape, a trapped creature must make a DC 23 Escape Artist check or a DC 23 Strength check that is a full-round action. The snare has AC 7 and 5 hit points. A successful escape from the snare breaks the loop and ends the spell.'),
  ('soften-earth-and-stone', 'Soften Earth and Stone', 'Soften Earth and Stone', 'Transmutación', NULL, ARRAY['Tierra']::TEXT[], '{"druid":2}'::JSONB, true, true, false, false, true, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, '10-ft. square/Nivel; see text', NULL, 'Instantáneo', 'Ninguna', false, 'When this spell is cast, all natural, undressed earth or stone in the spell’s area is softened. Wet earth becomes thick mud, dry earth becomes loose sand or dirt, and stone becomes soft clay that is easily molded or chopped. You affect a 10-footsquare area to a depth of 1 to 4 feet, depending on the toughness or resilience of the ground at that spot. Magical, enchanted, dressed, or worked stone cannot be affected. Earth or stone creatures are not affected.

A creature in mud must succeed on a Reflex save or be caught for 1d2 rounds and unable to move, attack, or cast spells. A creature that succeeds on its save can move through the mud at half speed, and it can’t run or charge.

Loose dirt is not as troublesome as mud, but all creatures in the area can move at only half their normal speed and can’t run or charge over the surface.

Stone softened into clay does not hinder movement, but it does allow characters to cut, shape, or excavate areas they may not have been able to affect before.

While soften earth and stone does not affect dressed or worked stone, cavern ceilings or vertical surfaces such as cliff faces can be affected. Usually, this causes a moderate collapse or landslide as the loosened material peels away from the face of the wall or roof and falls.

A moderate amount of structural damage can be dealt to a manufactured structure by softening the ground beneath it, causing it to settle. However, most well-built structures will only be damaged by this spell, not destroyed.', 'When this spell is cast, all natural, undressed earth or stone in the spell’s area is softened. Wet earth becomes thick mud, dry earth becomes loose sand or dirt, and stone becomes soft clay that is easily molded or chopped. You affect a 10-footsquare area to a depth of 1 to 4 feet, depending on the toughness or resilience of the ground at that spot. Magical, enchanted, dressed, or worked stone cannot be affected. Earth or stone creatures are not affected.

A creature in mud must succeed on a Reflex save or be caught for 1d2 rounds and unable to move, attack, or cast spells. A creature that succeeds on its save can move through the mud at half speed, and it can’t run or charge.

Loose dirt is not as troublesome as mud, but all creatures in the area can move at only half their normal speed and can’t run or charge over the surface.

Stone softened into clay does not hinder movement, but it does allow characters to cut, shape, or excavate areas they may not have been able to affect before.

While soften earth and stone does not affect dressed or worked stone, cavern ceilings or vertical surfaces such as cliff faces can be affected. Usually, this causes a moderate collapse or landslide as the loosened material peels away from the face of the wall or roof and falls.

A moderate amount of structural damage can be dealt to a manufactured structure by softening the ground beneath it, causing it to settle. However, most well-built structures will only be damaged by this spell, not destroyed.'),
  ('solid-fog', 'Solid Fog', 'Solid Fog', 'Conjuración', 'Creación', NULL, '{"sorcerer":4,"wizard":4}'::JSONB, true, true, true, false, false, false, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1 min./Nivel', NULL, false, 'This spell functions like fog cloud, but in addition to obscuring sight, the solid fog is so thick that any creature attempting to move through it progresses at a speed of 5 feet, regardless of its normal speed, and it takes a -2 penalty on all melee attack and melee damage rolls. The vapors prevent effective ranged weapon attacks (except for magic rays and the like). A creature or object that falls into solid fog is slowed, so that each 10 feet of vapor that it passes through reduces falling damage by 1d6. A creature can’t take a 5-foot step while in solid fog.

However, unlike normal fog, only a severe wind (31+ mph) disperses these vapors, and it does so in 1 round.

Solid fog can be made permanent with a permanency spell. A permanent solid fog dispersed by wind reforms in 10 minutes.

A pinch of dried, powdered peas combined with powdered animal hoof.', 'This spell functions like fog cloud, but in addition to obscuring sight, the solid fog is so thick that any creature attempting to move through it progresses at a speed of 5 feet, regardless of its normal speed, and it takes a -2 penalty on all melee attack and melee damage rolls. The vapors prevent effective ranged weapon attacks (except for magic rays and the like). A creature or object that falls into solid fog is slowed, so that each 10 feet of vapor that it passes through reduces falling damage by 1d6. A creature can’t take a 5-foot step while in solid fog.

However, unlike normal fog, only a severe wind (31+ mph) disperses these vapors, and it does so in 1 round.

Solid fog can be made permanent with a permanency spell. A permanent solid fog dispersed by wind reforms in 10 minutes.

A pinch of dried, powdered peas combined with powdered animal hoof.'),
  ('song-of-discord', 'Song of Discord', 'Song of Discord', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente, Sónico']::TEXT[], '{"bard":5}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, 'Creatures within a 20-ft.-radius spread', NULL, '1 round/Nivel', 'Voluntad anula', true, 'This spell causes those within the area to turn on each other rather than attack their foes. Each affected creature has a 50% chance to attack the nearest target each round. (Roll to determine each creature’s behavior every round at the beginning of its turn.) A creature that does not attack its nearest neighbor is free to act normally for that round.

Creatures forced by a song of discord to attack their fellows employ all methods at their disposal, choosing their deadliest spells and most advantageous combat tactics. They do not, however, harm targets that have fallen unconscious.', 'This spell causes those within the area to turn on each other rather than attack their foes. Each affected creature has a 50% chance to attack the nearest target each round. (Roll to determine each creature’s behavior every round at the beginning of its turn.) A creature that does not attack its nearest neighbor is free to act normally for that round.

Creatures forced by a song of discord to attack their fellows employ all methods at their disposal, choosing their deadliest spells and most advantageous combat tactics. They do not, however, harm targets that have fallen unconscious.'),
  ('soul-bind', 'Soul Bind', 'Soul Bind', 'Nigromancia', NULL, NULL, '{"sorcerer":9,"wizard":9,"cleric":9}'::JSONB, true, true, false, true, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'Corpse', NULL, NULL, 'Permanente', 'Voluntad anula', false, 'You draw the soul from a newly dead body and imprison it in a black sapphire gem. The subject must have been dead no more than 1 round per caster level. The soul, once trapped in the gem, cannot be returned through clone, raise dead, reincarnation, resurrection, true resurrection, or even a miracle or a wish. Only by destroying the gem or dispelling the spell on the gem can one free the soul (which is then still dead).

A black sapphire of at least 1,000 gp value for every Hit Die possessed by the creature whose soul is to be bound. If the gem is not valuable enough, it shatters when the binding is attempted. (While creatures have no concept of level or Hit Dice as such, the value of the gem needed to trap an individual can be researched. Remember that this value can change over time as creatures gain more Hit Dice.)', 'You draw the soul from a newly dead body and imprison it in a black sapphire gem. The subject must have been dead no more than 1 round per caster level. The soul, once trapped in the gem, cannot be returned through clone, raise dead, reincarnation, resurrection, true resurrection, or even a miracle or a wish. Only by destroying the gem or dispelling the spell on the gem can one free the soul (which is then still dead).

A black sapphire of at least 1,000 gp value for every Hit Die possessed by the creature whose soul is to be bound. If the gem is not valuable enough, it shatters when the binding is attempted. (While creatures have no concept of level or Hit Dice as such, the value of the gem needed to trap an individual can be researched. Remember that this value can change over time as creatures gain more Hit Dice.)'),
  ('sound-burst', 'Sound Burst', 'Sound Burst', 'Evocación', NULL, ARRAY['Sónico']::TEXT[], '{"cleric":2,"bard":2}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, '10-ft.-radius spread', NULL, 'Instantáneo', 'Fortaleza parcial', true, 'You blast an area with a tremendous cacophony. Every creature in the area takes 1d8 points of sonic damage and must succeed on a Fortitude save to avoid being stunned for 1 round.

Creatures that cannot hear are not stunned but are still damaged.

A musical instrument.', 'You blast an area with a tremendous cacophony. Every creature in the area takes 1d8 points of sonic damage and must succeed on a Fortitude save to avoid being stunned for 1 round.

Creatures that cannot hear are not stunned but are still damaged.

A musical instrument.'),
  ('speak-with-animals', 'Speak with Animals', 'Speak with Animals', 'Adivinación', NULL, NULL, '{"druid":1,"bard":3,"ranger":1}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 min./Nivel', NULL, NULL, 'You can comprehend and communicate with animals. You are able to ask questions of and receive answers from animals, although the spell doesn’t make them any more friendly or cooperative than normal. Furthermore, wary and cunning animals are likely to be terse and evasive, while the more stupid ones make inane comments. If an animal is friendly toward you, it may do some favor or service for you.', 'You can comprehend and communicate with animals. You are able to ask questions of and receive answers from animals, although the spell doesn’t make them any more friendly or cooperative than normal. Furthermore, wary and cunning animals are likely to be terse and evasive, while the more stupid ones make inane comments. If an animal is friendly toward you, it may do some favor or service for you.'),
  ('speak-with-dead', 'Speak with Dead', 'Speak with Dead', 'Nigromancia', NULL, ARRAY['Dependiente del Lenguaje']::TEXT[], '{"cleric":3}'::JSONB, true, true, false, false, true, false, NULL, NULL, NULL, '10 minutes', '10 ft.', 'One dead creature', NULL, NULL, '1 min./Nivel', 'Voluntad anula; see text', false, 'You grant the semblance of life and intellect to a corpse, allowing it to answer several questions that you put to it. You may ask one question per two caster levels. Unasked questions are wasted if the duration expires. The corpse’s knowledge is limited to what the creature knew during life, including the languages it spoke (if any). Answers are usually brief, cryptic, or repetitive. If the creature’s alignment was different from yours, the corpse gets a Will save to resist the spell as if it were alive.

If the corpse has been subject to speak with dead within the past week, the new spell fails. You can cast this spell on a corpse that has been deceased for any amount of time, but the body must be mostly intact to be able to respond. A damaged corpse may be able to give partial answers or partially correct answers, but it must at least have a mouth in order to speak at all.

This spell does not let you actually speak to the person (whose soul has departed). It instead draws on the imprinted knowledge stored in the corpse. The partially animated body retains the imprint of the soul that once inhabited it, and thus it can speak with all the knowledge that the creature had while alive. The corpse, however, cannot learn new information.

Indeed, it can’t even remember being questioned.

This spell does not affect a corpse that has been turned into an undead creature.', 'You grant the semblance of life and intellect to a corpse, allowing it to answer several questions that you put to it. You may ask one question per two caster levels. Unasked questions are wasted if the duration expires. The corpse’s knowledge is limited to what the creature knew during life, including the languages it spoke (if any). Answers are usually brief, cryptic, or repetitive. If the creature’s alignment was different from yours, the corpse gets a Will save to resist the spell as if it were alive.

If the corpse has been subject to speak with dead within the past week, the new spell fails. You can cast this spell on a corpse that has been deceased for any amount of time, but the body must be mostly intact to be able to respond. A damaged corpse may be able to give partial answers or partially correct answers, but it must at least have a mouth in order to speak at all.

This spell does not let you actually speak to the person (whose soul has departed). It instead draws on the imprinted knowledge stored in the corpse. The partially animated body retains the imprint of the soul that once inhabited it, and thus it can speak with all the knowledge that the creature had while alive. The corpse, however, cannot learn new information.

Indeed, it can’t even remember being questioned.

This spell does not affect a corpse that has been turned into an undead creature.'),
  ('speak-with-plants', 'Speak with Plants', 'Speak with Plants', 'Adivinación', NULL, NULL, '{"druid":3,"bard":4,"ranger":2}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 min./Nivel', NULL, NULL, 'You can comprehend and communicate with plants, including both normal plants and plant creatures. You are able to ask questions of and receive answers from plants. A regular plant’s sense of its surroundings is limited, so it won’t be able to give (or recognize) detailed descriptions of creatures or answer questions about events outside its immediate vicinity.

The spell doesn’t make plant creatures any more friendly or cooperative than normal. Furthermore, wary and cunning plant creatures are likely to be terse and evasive, while the more stupid ones may make inane comments. If a plant creature is friendly toward you, it may do some favor or service for you.', 'You can comprehend and communicate with plants, including both normal plants and plant creatures. You are able to ask questions of and receive answers from plants. A regular plant’s sense of its surroundings is limited, so it won’t be able to give (or recognize) detailed descriptions of creatures or answer questions about events outside its immediate vicinity.

The spell doesn’t make plant creatures any more friendly or cooperative than normal. Furthermore, wary and cunning plant creatures are likely to be terse and evasive, while the more stupid ones may make inane comments. If a plant creature is friendly toward you, it may do some favor or service for you.'),
  ('spectral-hand', 'Spectral Hand', 'Spectral Hand', 'Nigromancia', NULL, NULL, '{"sorcerer":2,"wizard":2}'::JSONB, true, true, false, false, false, false, NULL, NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'One spectral hand', '1 min./Nivel (D)', 'Ninguna', false, 'A ghostly, glowing hand shaped from your life force materializes and moves as you desire, allowing you to deliver low-level, touch range spells at a distance. On casting the spell, you lose 1d4 hit points that return when the spell ends (even if it is dispelled), but not if the hand is destroyed. (The hit points can be healed as normal.) For as long as the spell lasts, any touch range spell of 4th level or lower that you cast can be delivered by the spectral hand. The spell gives you a +2 bonus on your melee touch attack roll, and attacking with the hand counts normally as an attack. The hand always strikes from your direction. The hand cannot flank targets like a creature can. After it delivers a spell, or if the hand goes beyond the spell range, goes out of your sight, the hand returns to you and hovers.

The hand is incorporeal and thus cannot be harmed by normal weapons. It has improved evasion (half damage on a failed Reflex save and no damage on a successful save), your save bonuses, and an AC of at least 22. Your Intelligence modifier applies to the hand’s AC as if it were the hand’s Dexterity modifier. The hand has 1 to 4 hit points, the same number that you lost in creating it.', 'A ghostly, glowing hand shaped from your life force materializes and moves as you desire, allowing you to deliver low-level, touch range spells at a distance. On casting the spell, you lose 1d4 hit points that return when the spell ends (even if it is dispelled), but not if the hand is destroyed. (The hit points can be healed as normal.) For as long as the spell lasts, any touch range spell of 4th level or lower that you cast can be delivered by the spectral hand. The spell gives you a +2 bonus on your melee touch attack roll, and attacking with the hand counts normally as an attack. The hand always strikes from your direction. The hand cannot flank targets like a creature can. After it delivers a spell, or if the hand goes beyond the spell range, goes out of your sight, the hand returns to you and hovers.

The hand is incorporeal and thus cannot be harmed by normal weapons. It has improved evasion (half damage on a failed Reflex save and no damage on a successful save), your save bonuses, and an AC of at least 22. Your Intelligence modifier applies to the hand’s AC as if it were the hand’s Dexterity modifier. The hand has 1 to 4 hit points, the same number that you lost in creating it.'),
  ('spell-immunity', 'Spell Immunity', 'Spell Immunity', 'Abjuración', NULL, NULL, '{"cleric":4}'::JSONB, true, true, false, false, true, false, NULL, NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '10 min./Nivel', 'Voluntad anula (harmless)', true, 'The warded creature is immune to the effects of one specified spell for every four levels you have. The spells must be of 4th level or lower. The warded creature effectively has unbeatable spell resistance regarding the specified spell or spells. Naturally, that immunity doesn’t protect a creature from spells for which spell resistance doesn’t apply. Spell immunity protects against spells, spell-like effects of magic items, and innate spell-like abilities of creatures. It does not protect against supernatural or extraordinary abilities, such as breath weapons or gaze attacks.

Only a particular spell can be protected against, not a certain domain or school of spells or a group of spells that are similar in effect.

A creature can have only one spell immunity or greater spell immunity spell in effect on it at a time.', 'The warded creature is immune to the effects of one specified spell for every four levels you have. The spells must be of 4th level or lower. The warded creature effectively has unbeatable spell resistance regarding the specified spell or spells. Naturally, that immunity doesn’t protect a creature from spells for which spell resistance doesn’t apply. Spell immunity protects against spells, spell-like effects of magic items, and innate spell-like abilities of creatures. It does not protect against supernatural or extraordinary abilities, such as breath weapons or gaze attacks.

Only a particular spell can be protected against, not a certain domain or school of spells or a group of spells that are similar in effect.

A creature can have only one spell immunity or greater spell immunity spell in effect on it at a time.'),
  ('spell-immunity-greater', 'Spell Immunity, Greater', 'Spell Immunity, Greater', 'Abjuración', NULL, NULL, '{"cleric":8}'::JSONB, false, false, false, false, false, false, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'This spell functions like spell immunity, except the immunity applies to spells of 8th level or lower.

A creature can have only one spell immunity or greater spell immunity spell in effect on it at a time.', 'This spell functions like spell immunity, except the immunity applies to spells of 8th level or lower.

A creature can have only one spell immunity or greater spell immunity spell in effect on it at a time.')
ON CONFLICT (slug) DO UPDATE
  SET
    name = EXCLUDED.name,
    name_es = EXCLUDED.name_es,
    school = EXCLUDED.school,
    subschool = EXCLUDED.subschool,
    descriptor = EXCLUDED.descriptor,
    level = EXCLUDED.level,
    verbal = EXCLUDED.verbal,
    somatic = EXCLUDED.somatic,
    material_component = EXCLUDED.material_component,
    focus = EXCLUDED.focus,
    divine_focus = EXCLUDED.divine_focus,
    xp_component = EXCLUDED.xp_component,
    material_description = EXCLUDED.material_description,
    focus_description = EXCLUDED.focus_description,
    xp_cost_description = EXCLUDED.xp_cost_description,
    casting_time = EXCLUDED.casting_time,
    range = EXCLUDED.range,
    target = EXCLUDED.target,
    area = EXCLUDED.area,
    effect = EXCLUDED.effect,
    duration = EXCLUDED.duration,
    saving_throw = EXCLUDED.saving_throw,
    spell_resistance = EXCLUDED.spell_resistance,
    description = EXCLUDED.description,
    description_es = EXCLUDED.description_es,
    updated_at = NOW();

-- Verificación de la parte 5
SELECT 'Parte 5/7 insertada' AS status, COUNT(*) AS count FROM public.spells;
