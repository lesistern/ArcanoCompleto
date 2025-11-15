-- ============================================================================
-- CONJUROS DEL PLAYER'S HANDBOOK - PARTE 7/7
-- Conjuros 601-608 de 608 totales
-- Datos extraídos de d20srd.org
-- ============================================================================

-- Insertar conjuros (parte 7)
INSERT INTO public.spells (
  slug, name, school, subschool, descriptors,
  casting_time, range_info, target, area, effect, duration,
  saving_throw, spell_resistance, description,
  material_components, focus, xp_cost,
  component_verbal, component_somatic, component_material,
  component_focus, component_divine_focus, component_xp
)
VALUES
  ('wind-walk', 'Wind Walk', 'Transmutación', NULL, ARRAY['Aire']::TEXT[], '1 standard action', 'Toque', 'You and one touched creature per three levels', NULL, NULL, '1 hour/Nivel (D); see text', 'No and Voluntad anula (harmless)', 'No and Sí (harmless)', 'You alter the substance of your body to a cloudlike vapor (as the gaseous form spell) and move through the air, possibly at great speed. You can take other creatures with you, each of which acts independently.

Normally, a wind walker flies at a speed of 10 feet with perfect maneuverability. If desired by the subject, a magical wind wafts a wind walker along at up to 600 feet per round (60 mph) with poor maneuverability. Wind walkers are not invisible but rather appear misty and translucent. If fully clothed in white, they are 80% likely to be mistaken for clouds, fog, vapors, or the like.

A wind walker can regain its physical form as desired and later resume the cloud form. Each change to and from vaporous form takes 5 rounds, which counts toward the duration of the spell (as does any time spent in physical form). As noted above, you can dismiss the spell, and you can even dismiss it for individual wind walkers and not others.

For the last minute of the spell’s duration, a wind walker in cloud form automatically descends 60 feet per round (for a total of 600 feet), though it may descend faster if it wishes. This descent serves as a warning that the spell is about to end.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('wind-wall', 'Wind Wall', 'Evocación', NULL, ARRAY['Aire']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Wall up to 10 ft./Nivel Largo and 5 ft./Nivel high (S)', '1 round/Nivel', 'Ninguna; see text', 'Sí', 'An invisible vertical curtain of wind appears. It is 2 feet thick and of considerable strength. It is a roaring blast sufficient to blow away any bird smaller than an eagle, or tear papers and similar materials from unsuspecting hands. (A Reflex save allows a creature to maintain its grasp on an object.) Tiny and Small flying creatures cannot pass through the barrier. Loose materials and cloth garments fly upward when caught in a wind wall. Arrows and bolts are deflected upward and miss, while any other normal ranged weapon passing through the wall has a 30% miss chance. (A giant-thrown boulder, a siege engine projectile, and other massive ranged weapons are not affected.) Gases, most gaseous breath weapons, and creatures in gaseous form cannot pass through the wall (although it is no barrier to incorporeal creatures).

While the wall must be vertical, you can shape it in any continuous path along the ground that you like. It is possible to create cylindrical or square wind walls to enclose specific points.

A tiny fan and a feather of exotic origin.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('wish', 'Wish', 'Universal', NULL, NULL, '1 standard action', 'See text', NULL, NULL, NULL, 'See text', 'See text', 'Sí', 'Wish is the mightiest spell a wizard or sorcerer can cast. By simply speaking aloud, you can alter reality to better suit you.

Even wish, however, has its limits.

A wish can produce any one of the following effects.

You may try to use a wish to produce greater effects than these, but doing so is dangerous. (The wish may pervert your intent into a literal but undesirable fulfillment or only a partial fulfillment.)

Duplicated spells allow saves and spell resistance as normal (but save DCs are for 9th-level spells).', 'When a wish duplicates a spell with a that costs more than 10,000 gp, you must provide that component.', NULL, 'The minimum for casting wish is 5,000 XP. When a wish duplicates a spell that has an XP cost, you must pay 5,000 XP or that cost, whichever is more. When a wish creates or improves a magic item, you must pay twice the normal XP cost for crafting or improving the item, plus an additional 5,000 XP.', true, false, false, false, false, true),
  ('wood-shape', 'Wood Shape', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'One touched piece of wood No larger than 10 cu. ft. + 1 cu. ft./Nivel', NULL, NULL, 'Instantáneo', 'Voluntad anula (object)', 'Sí (object)', 'Wood shape enables you to form one existing piece of wood into any shape that suits your purpose. While it is possible to make crude coffers, doors, and so forth, fine detail isn’t possible. There is a 30% chance that any shape that includes moving parts simply doesn’t work.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('word-of-chaos', 'Word of Chaos', 'Evocación', NULL, ARRAY['Caótico, Sónico']::TEXT[], '1 standard action', '40 ft.', NULL, 'Nonchaotic creatures in a 40-ft.- radius spread centered on you', NULL, 'Instantáneo', 'Ninguna or Voluntad anula; see text', 'Sí', 'Any nonchaotic creature within the area who hears the word of chaos suffers the following ill effects.

The effects are cumulative and concurrent. No saving throw is allowed against these effects.

The creature is deafened for 1d4 rounds.

The creature is stunned for 1 round.

The creature is confused, as by the confusion spell, for 1d10 minutes. This is a mind-affecting enchantment effect.

Living creatures die. Undead creatures are destroyed.

Furthermore, if you are on your home plane when you cast this spell, nonchaotic extraplanar creatures within the area are instantly banished back to their home planes. Creatures so banished cannot return for at least 24 hours. This effect takes place regardless of whether the creatures hear the word of chaos. The banishment effect allows a Will save (at a -4 penalty) to negate.

Creatures whose HD exceed your caster level are unaffected by word of chaos.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('word-of-recall', 'Word of Recall', 'Conjuración', 'Teletransportación', NULL, '1 standard action', 'Ilimitado', 'You and touched objects or other willing creatures', NULL, NULL, 'Instantáneo', 'Ninguna or Voluntad anula (harmless, object)', 'No or Sí (harmless, object)', 'Word of recall teleports you instantly back to your sanctuary when the word is uttered. You must designate the sanctuary when you prepare the spell, and it must be a very familiar place. The actual point of arrival is a designated area no larger than 10 feet by 10 feet. You can be transported any distance within a plane but cannot travel between planes. You can transport, in addition to yourself, any objects you carry, as long as their weight doesn’t exceed your maximum load. You may also bring one additional willing Medium or smaller creature (carrying gear or objects up to its maximum load) or its equivalent per three caster levels. A Large creature counts as two Medium creatures, a Huge creature counts as two Large creatures, and so forth. All creatures to be transported must be in contact with one another, and at least one of those creatures must be in contact with you. Exceeding this limit causes the spell to fail.

An unwilling creature can’t be teleported by word of recall. Likewise, a creature’s Will save (or spell resistance) prevents items in its possession from being teleported. Unattended, nonmagical objects receive no saving throw.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('zone-of-silence', 'Zone of Silence', 'Ilusión', 'Glamour', NULL, '1 round', 'Personal', NULL, '5-ft.-radius emanation centered on you', NULL, '1 hour/Nivel (D)', NULL, 'No', 'By casting zone of silence, you manipulate sound waves in your immediate vicinity so that you and those within the spell’s area can converse normally, yet no one outside can hear your voices or any other noises from within, including language-dependent or sonic spell effects. This effect is centered on you and moves with you. Anyone who enters the zone immediately becomes subject to its effects, but those who leave are no longer affected. Note, however, that a successful Spot check to read lips can still reveal what’s said inside a zone of silence.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('zone-of-truth', 'Zone of Truth', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, '20-ft.-radius emanation', NULL, '1 min./Nivel', 'Voluntad anula', 'Sí', 'Creatures within the emanation area (or those who enter it) can’t speak any deliberate and intentional lies. Each potentially affected creature is allowed a save to avoid the effects when the spell is cast or when the creature first enters the emanation area. Affected creatures are aware of this enchantment. Therefore, they may avoid answering questions to which they would normally respond with a lie, or they may be evasive as long as they remain within the boundaries of the truth. Creatures who leave the area are free to speak as they choose.', NULL, NULL, NULL, true, true, false, false, true, false)
ON CONFLICT (slug) DO UPDATE
  SET
    name = EXCLUDED.name,
    school = EXCLUDED.school,
    subschool = EXCLUDED.subschool,
    descriptors = EXCLUDED.descriptors,
    casting_time = EXCLUDED.casting_time,
    range_info = EXCLUDED.range_info,
    target = EXCLUDED.target,
    area = EXCLUDED.area,
    effect = EXCLUDED.effect,
    duration = EXCLUDED.duration,
    saving_throw = EXCLUDED.saving_throw,
    spell_resistance = EXCLUDED.spell_resistance,
    description = EXCLUDED.description,
    material_components = EXCLUDED.material_components,
    focus = EXCLUDED.focus,
    xp_cost = EXCLUDED.xp_cost,
    component_verbal = EXCLUDED.component_verbal,
    component_somatic = EXCLUDED.component_somatic,
    component_material = EXCLUDED.component_material,
    component_focus = EXCLUDED.component_focus,
    component_divine_focus = EXCLUDED.component_divine_focus,
    component_xp = EXCLUDED.component_xp,
    updated_at = NOW();

-- Verificación de la parte 7
SELECT 'Parte 7/7 insertada' AS status, COUNT(*) AS count FROM public.spells;
