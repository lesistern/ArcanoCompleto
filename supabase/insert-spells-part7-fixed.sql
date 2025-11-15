-- ============================================================================
-- CONJUROS DEL PLAYER'S HANDBOOK - PARTE 7/7
-- Conjuros 601-605 de 605 totales
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
