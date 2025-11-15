-- ============================================================================
-- CONJUROS DEL PLAYER'S HANDBOOK - PARTE 6/7
-- Conjuros 501-600 de 608 totales
-- Datos extraídos de d20srd.org
-- ============================================================================

-- Insertar conjuros (parte 6)
INSERT INTO public.spells (
  slug, name, school, subschool, descriptors,
  casting_time, range_info, target, area, effect, duration,
  saving_throw, spell_resistance, description,
  material_components, focus, xp_cost,
  component_verbal, component_somatic, component_material,
  component_focus, component_divine_focus, component_xp
)
VALUES
  ('spell-resistance', 'Spell Resistance', 'Abjuración', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 min./Nivel', 'Voluntad anula (harmless)', 'Sí (harmless)', 'The creature gains spell resistance equal to 12 + your caster level.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('spellstaff', 'Spellstaff', 'Transmutación', NULL, NULL, '10 minutes', 'Toque', 'Wooden quarterstaff touched', NULL, NULL, 'Permanente until discharged (D)', 'Voluntad anula (object)', 'Sí (object)', 'The staff that stores the spell.', 'You store one spell that you can normally cast in a wooden quarterstaff. Only one such spell can be stored in a staff at a given time, and you cannot have more than one spellstaff at any given time. You can cast a spell stored within a staff just as though it were among those you had prepared, but it does not count against your normal allotment for a given day. You use up any applicable s required to cast the spell when you store it in the spellstaff.', NULL, NULL, true, true, false, true, false, false),
  ('spell-turning', 'Spell Turning', 'Abjuración', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, 'Until expended or 10 min./Nivel', NULL, 'No', 'Spells and spell-like effects targeted on you are turned back upon the original caster. The abjuration turns only spells that have you as a target. Effect and area spells are not affected. Spell turning also fails to stop touch range spells.

From seven to ten (1d4+6) spell levels are affected by the turning. The exact number is rolled secretly.

When you are targeted by a spell of higher level than the amount of spell turning you have left, that spell is partially turned. The subtract the amount of spell turning left from the spell level of the incoming spell, then divide the result by the spell level of the incoming spell to see what fraction of the effect gets through. For damaging spells, you and the caster each take a fraction of the damage. For nondamaging spells, each of you has a proportional chance to be affected.

If you and a spellcasting attacker are both warded by spell turning effects in operation, a resonating field is created.

Roll randomly to determine the result.

A small silver mirror.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('spider-climb', 'Spider Climb', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '10 min./Nivel', 'Voluntad anula (harmless)', 'Sí (harmless)', 'The subject can climb and travel on vertical surfaces or even traverse ceilings as well as a spider does. The affected creature must have its hands free to climb in this manner. The subject gains a climb speed of 20 feet; furthermore, it need not make Climb checks to traverse a vertical or horizontal surface (even upside down). A spider climbing creature retains its Dexterity bonus to Armor Class (if any) while climbing, and opponents get no special bonus to their attacks against it. It cannot, however, use the run action while climbing.

A drop of bitumen and a live spider, both of which must be eaten by the subject.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('spike-growth', 'Spike Growth', 'Transmutación', NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, 'One 20-ft. square/Nivel', NULL, '1 hour/Nivel (D)', 'Reflejos parcial', 'Sí', 'Any ground-covering vegetation in the spell’s area becomes very hard and sharply pointed without changing its appearance.

In areas of bare earth, roots and rootlets act in the same way. Typically, spike growth can be cast in any outdoor setting except open water, ice, heavy snow, sandy desert, or bare stone. Any creature moving on foot into or through the spell’s area takes 1d4 points of piercing damage for each 5 feet of movement through the spiked area.

Any creature that takes damage from this spell must also succeed on a Reflex save or suffer injuries to its feet and legs that slow its land speed by one-half. This speed penalty lasts for 24 hours or until the injured creature receives a cure spell (which also restores lost hit points). Another character can remove the penalty by taking 10 minutes to dress the injuries and succeeding on a Heal check against the spell’s save DC.

Spike growth can’t be disabled with the Disable Device skill.

Note: Magic traps such as spike growth are hard to detect. A rogue (only) can use the Search skill to find a spike growth. The DC is 25 + spell level, or DC 28 for spike growth (or DC 27 for spike growth cast by a ranger).', NULL, NULL, NULL, true, true, false, false, true, false),
  ('spike-stones', 'Spike Stones', 'Transmutación', NULL, ARRAY['Tierra']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, 'One 20-ft. square/Nivel', NULL, '1 hour/Nivel (D)', 'Reflejos parcial', 'Sí', 'Rocky ground, stone floors, and similar surfaces shape themselves into long, sharp points that blend into the background.

Spike stones impede progress through an area and deal damage. Any creature moving on foot into or through the spell’s area moves at half speed.

In addition, each creature moving through the area takes 1d8 points of piercing damage for each 5 feet of movement through the spiked area.

Any creature that takes damage from this spell must also succeed on a Reflex save to avoid injuries to its feet and legs. A failed save causes the creature’s speed to be reduced to half normal for 24 hours or until the injured creature receives a cure spell (which also restores lost hit points). Another character can remove the penalty by taking 10 minutes to dress the injuries and succeeding on a Heal check against the spell’s save DC.

Spike stones is a magic trap that can’t be disabled with the Disable Device skill.

Note: Magic traps such as spike stones are hard to detect. A rogue (only) can use the Search skill to find spike stones. The DC is 25 + spell level, or DC 29 for spike stones.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('spiritual-weapon', 'Spiritual Weapon', 'Evocación', NULL, ARRAY['Fuerza']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Magic weapon of Fuerza', '1 round/Nivel (D)', 'Ninguna', 'Sí', 'A weapon made of pure force springs into existence and attacks opponents at a distance, as you direct it, dealing 1d8 force damage per hit, +1 point per three caster levels (maximum +5 at 15th level). The weapon takes the shape of a weapon favored by your deity or a weapon with some spiritual significance or symbolism to you (see below) and has the same threat range and critical multipliers as a real weapon of its form. It strikes the opponent you designate, starting with one attack in the round the spell is cast and continuing each round thereafter on your turn. It uses your base attack bonus (possibly allowing it multiple attacks per round in subsequent rounds) plus your Wisdom modifier as its attack bonus. It strikes as a spell, not as a weapon, so, for example, it can damage creatures that have damage reduction. As a force effect, it can strike incorporeal creatures without the normal miss chance associated with incorporeality. The weapon always strikes from your direction. It does not get a flanking bonus or help a combatant get one. Your feats or combat actions do not affect the weapon. If the weapon goes beyond the spell range, if it goes out of your sight, or if you are not directing it, the weapon returns to you and hovers.

Each round after the first, you can use a move action to redirect the weapon to a new target. If you do not, the weapon continues to attack the previous round’s target. On any round that the weapon switches targets, it gets one attack. Subsequent rounds of attacking that target allow the weapon to make multiple attacks if your base attack bonus would allow it to. Even if the spiritual weapon is a ranged weapon, use the spell’s range, not the weapon’s normal range increment, and switching targets still is a move action.

A spiritual weapon cannot be attacked or harmed by physical attacks, but dispel magic, disintegrate, a sphere of annihilation, or a rod of cancellation affects it. A spiritual weapon’s AC against touch attacks is 12 (10 + size bonus for Tiny object).

If an attacked creature has spell resistance, you make a caster level check (1d20 + caster level) against that spell resistance the first time the spiritual weapon strikes it. If the weapon is successfully resisted, the spell is dispelled. If not, the weapon has its normal full effect on that creature for the duration of the spell.

The weapon that you get is often a force replica of your deity’s own personal weapon. A cleric without a deity gets a weapon based on his alignment. A neutral cleric without a deity can create a spiritual weapon of any alignment, provided he is acting at least generally in accord with that alignment at the time. The weapons associated with each alignment are as follows.

Battleaxe

Flail

Warhammer

Longsword', NULL, NULL, NULL, true, true, false, false, true, false),
  ('statue', 'Statue', 'Transmutación', NULL, NULL, '1 round', 'Toque', 'Creature touched', NULL, NULL, '1 hour/Nivel (D)', 'Voluntad anula (harmless)', 'Sí (harmless)', 'A statue spell turns the subject to solid stone, along with any garments and equipment worn or carried. In statue form, the subject gains hardness 8. The subject retains its own hit points.

The subject can see, hear, and smell normally, but it does not need to eat or breathe. Feeling is limited to those sensations that can affect the granite-hard substance of the individual’s body. Chipping is equal to a mere scratch, but breaking off one of the statue’s arms constitutes serious damage.

The subject of a statue spell can return to its normal state, act, and then return instantly to the statue state (a free action) if it so desires, as long as the spell duration is in effect.

Lime, sand, and a drop of water stirred by an iron bar, such as a nail or spike.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('status', 'Status', 'Adivinación', NULL, NULL, '1 standard action', 'Toque', 'One living creature touched per three levels', NULL, NULL, '1 hour/Nivel', 'Voluntad anula (harmless)', 'Sí (harmless)', 'When you need to keep track of comrades who may get separated, status allows you to mentally monitor their relative positions and general condition. You are aware of direction and distance to the creatures and any conditions affecting them: unharmed, wounded, disabled, staggered, unconscious, dying, nauseated, panicked, stunned, poisoned, diseased, confused, or the like. Once the spell has been cast upon the subjects, the distance between them and the caster does not affect the spell as long as they are on the same plane of existence. If a subject leaves the plane, or if it dies, the spell ceases to function for it.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('stinking-cloud', 'Stinking Cloud', 'Conjuración', 'Creación', NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Cloud spreads in 20-ft. radius, 20 ft. high', '1 round/Nivel', 'Fortaleza anula; see text', 'No', 'Stinking cloud creates a bank of fog like that created by fog cloud, except that the vapors are nauseating. Living creatures in the cloud become nauseated. This condition lasts as long as the creature is in the cloud and for 1d4+1 rounds after it leaves. (Roll separately for each nauseated character.) Any creature that succeeds on its save but remains in the cloud must continue to save each round on your turn.

Stinking cloud can be made permanent with a permanency spell. A permanent stinking cloud dispersed by wind reforms in 10 minutes.

A rotten egg or several skunk cabbage leaves.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('stone-shape', 'Stone Shape', 'Transmutación', NULL, ARRAY['Tierra']::TEXT[], '1 standard action', 'Toque', 'Stone or stone object touched, up to 10 cu. ft. + 1 cu. ft./Nivel', NULL, NULL, 'Instantáneo', 'Ninguna', 'No', 'You can form an existing piece of stone into any shape that suits your purpose. While it’s possible to make crude coffers, doors, and so forth with stone shape, fine detail isn’t possible. There is a 30% chance that any shape including moving parts simply doesn’t work.

Soft clay, which must be worked into roughly the desired shape of the stone object and then touched to the stone while the verbal component is uttered.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('stoneskin', 'Stoneskin', 'Abjuración', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '10 min./Nivel or until discharged', 'Voluntad anula (harmless)', 'Sí (harmless)', 'The warded creature gains resistance to blows, cuts, stabs, and slashes. The subject gains damage reduction 10/adamantine. (It ignores the first 10 points of damage each time it takes damage from a weapon, though an adamantine weapon bypasses the reduction.) Once the spell has prevented a total of 10 points of damage per caster level (maximum 150 points), it is discharged.

Granite and 250 gp worth of diamond dust sprinkled on the target’s skin.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('stone-tell', 'Stone Tell', 'Adivinación', NULL, NULL, '10 minutes', 'Personal', 'You', NULL, NULL, '1 min./Nivel', NULL, 'No', 'You gain the ability to speak with stones, which relate to you who or what has touched them as well as revealing what is covered or concealed behind or under them. The stones relate complete descriptions if asked. A stone’s perspective, perception, and knowledge may prevent the stone from providing the details you are looking for.

You can speak with natural or worked stone.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('stone-to-flesh', 'Stone to Flesh', 'Transmutación', NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'One petrified creature or a cylinder of stone from 1 ft. to 3 ft. in diameter and up to 10 ft. Largo', NULL, NULL, 'Instantáneo', 'Fortaleza anula (object); see text', 'Sí', 'This spell restores a petrified creature to its normal state, restoring life and goods. The creature must make a DC 15 Fortitude save to survive the process. Any petrified creature, regardless of size, can be restored.

The spell also can convert a mass of stone into a fleshy substance. Such flesh is inert and lacking a vital life force unless a life force or magical energy is available. (For example, this spell would turn a stone golem into a flesh golem, but an ordinary statue would become a corpse.) You can affect an object that fits within a cylinder from 1 foot to 3 feet in diameter and up to 10 feet long or a cylinder of up to those dimensions in a larger mass of stone.

A pinch of earth and a drop of blood.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('storm-of-vengeance', 'Storm of Vengeance', 'Conjuración', 'Convocación', NULL, '1 round', 'Largo (400 ft. + 40 ft./Nivel)', NULL, NULL, '360-ft.-radius storm cloud', 'Concentración (maximum 10 rounds) (D)', 'See text', 'Sí', 'This spell creates an enormous black storm cloud. Lightning and crashing claps of thunder appear within the storm. Each creature beneath the cloud must succeed on a Fortitude save or be deafened for 1d4×10 minutes.

If you do not maintain concentration on the spell after casting it, the spell ends. If you continue to concentrate, the spell generates additional effects in each following round, as noted below. Each effect occurs during your turn.

Acid rains down in the area, dealing 1d6 points of acid damage (no save).

You call six bolts of lightning down from the cloud. You decide where the bolts strike. No two bolts may be directed at the same target. Each bolt deals 10d6 points of electricity damage. A creature struck can attempt a Reflex save for half damage.

Hailstones rain down in the area, dealing 5d6 points of bludgeoning damage (no save).

Violent rain and wind gusts reduce visibility. The rain obscures all sight, including darkvision, beyond 5 feet. A creature 5 feet away has concealment (attacks have a 20% miss chance). Creatures farther away have total concealment (50% miss chance, and the attacker cannot use sight to locate the target). Speed is reduced by three-quarters.

Ranged attacks within the area of the storm are impossible. Spells cast within the area are disrupted unless the caster succeeds on a Concentration check against a DC equal to the storm of vengeance’s save DC + the level of the spell the caster is trying to cast.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('suggestion', 'Suggestion', 'Encantamiento', 'Compulsión', ARRAY['Dependiente del Lenguaje, Afecta la Mente']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One living creature', NULL, NULL, '1 hour/Nivel or until completed', 'Voluntad anula', 'Sí', 'You influence the actions of the target creature by suggesting a course of activity (limited to a sentence or two). The suggestion must be worded in such a manner as to make the activity sound reasonable. Asking the creature to do some obviously harmful act automatically negates the effect of the spell.

The suggested course of activity can continue for the entire duration. If the suggested activity can be completed in a shorter time, the spell ends when the subject finishes what it was asked to do. You can instead specify conditions that will trigger a special activity during the duration. If the condition is not met before the spell duration expires, the activity is not performed.

A very reasonable suggestion causes the save to be made with a penalty (such as -1 or -2).

A snake’s tongue and either a bit of honeycomb or a drop of sweet oil.', NULL, NULL, NULL, true, false, true, false, false, false),
  ('suggestion-mass', 'Suggestion, Mass', 'Encantamiento', 'Compulsión', ARRAY['Dependiente del Lenguaje, Afecta la Mente']::TEXT[], NULL, 'Medio (100 ft. + 10 ft./Nivel)', 'One creature/Nivel, No two of which can be more than 30 ft. apart', NULL, NULL, NULL, NULL, 'No', 'This spell functions like suggestion, except that it can affect more creatures. The same suggestion applies to all these creatures.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-instrument', 'Summon Instrument', 'Conjuración', 'Convocación', NULL, '1 round', '0 ft.', NULL, NULL, 'One summoned handheld musical instrument', '1 min./Nivel (D)', 'Ninguna', 'No', 'This spell summons one handheld musical instrument of your choice. This instrument appears in your hands or at your feet (your choice). The instrument is typical for its type. Only one instrument appears per casting, and it will play only for you. You can’t summon an instrument too large to be held in two hands.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('summon-monster-i', 'Summon Monster I', 'Conjuración', 'Convocación', ARRAY['see text']::TEXT[], '1 round', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'One summoned creature', '1 round/Nivel (D)', 'Ninguna', 'No', 'This spell summons an extraplanar creature (typically an outsider, elemental, or magical beast native to another plane). It appears where you designate and acts immediately, on your turn. It attacks your opponents to the best of its ability. If you can communicate with the creature, you can direct it not to attack, to attack particular enemies, or to perform other actions.

The spell conjures one of the creatures from the 1st-level list on the accompanying Summon Monster table. You choose which kind of creature to summon, and you can change that choice each time you cast the spell.

A summoned monster cannot summon or otherwise conjure another creature, nor can it use any teleportation or planar travel abilities. Creatures cannot be summoned into an environment that cannot support them.

When you use a summoning spell to summon an air, chaotic, earth, evil, fire, good, lawful, or water creature, it is a spell of that type.

A tiny bag and a small (not necessarily lit) candle.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('summon-monster-ii', 'Summon Monster II', 'Conjuración', 'Convocación', ARRAY['see text for summon monster I']::TEXT[], NULL, NULL, NULL, NULL, 'One or more summoned creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'No', 'This spell functions like summon monster I, except that you can summon one creature from the 2nd-level list or 1d3 creatures of the same kind from the 1st-level list.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-monster-iii', 'Summon Monster III', 'Conjuración', 'Convocación', ARRAY['see text for summon monster I']::TEXT[], NULL, NULL, NULL, NULL, 'One or more summoned creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'No', 'This spell functions like summon monster I, except that you can summon one creature from the 3rd-level list, 1d3 creatures of the same kind from the 2nd-level list, or 1d4+1 creatures of the same kind from the 1st-level list.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-monster-iv', 'Summon Monster IV', 'Conjuración', 'Convocación', ARRAY['see text for summon monster I']::TEXT[], NULL, NULL, NULL, NULL, 'One or more summoned creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'No', 'This spell functions like summon monster I, except that you can summon one creature from the 4th-level list, 1d3 creatures of the same kind from the 3rd-level list, or 1d4+1 creatures of the same kind from a lower-level list.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-monster-ix', 'Summon Monster IX', 'Conjuración', 'Convocación', ARRAY['see text for summon monster I']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like summon monster I, except that you can summon one creature from the 9th-level list, 1d3 creatures of the same kind from the 8th-level list, or 1d4+1 creatures of the same kind from a lower-level list.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-monster-v', 'Summon Monster V', 'Conjuración', 'Convocación', ARRAY['see text for summon monster I']::TEXT[], NULL, NULL, NULL, NULL, 'One or more summoned creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'No', 'This spell functions like summon monster I, except that you can summon one creature from the 5th-level list, 1d3 creatures of the same kind from the 4th-level list, or 1d4+1 creatures of the same kind from a lower-level list.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-monster-vi', 'Summon Monster VI', 'Conjuración', 'Convocación', ARRAY['see text for summon monster I']::TEXT[], NULL, NULL, NULL, NULL, 'One or more summoned creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'No', 'This spell functions like summon monster I, except you can summon one creature from the 6th-level list, 1d3 creatures of the same kind from the 5th-level list, or 1d4+1 creatures of the same kind from a lower-level list.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-monster-vii', 'Summon Monster VII', 'Conjuración', 'Convocación', ARRAY['see text for summon monster I']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like summon monster I, except that you can summon one creature from the 7th-level list, 1d3 creatures of the same kind from the 6th-level list, or 1d4+1 creatures of the same kind from a lower-level list.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-monster-viii', 'Summon Monster VIII', 'Conjuración', 'Convocación', ARRAY['see text for summon monster I']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like summon monster I, except that you can summon one creature from the 8th-level list, 1d3 creatures of the same kind from the 7th-level list, or 1d4+1 creatures of the same kind from a lower-level list.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-nature-s-ally-i', 'Summon Nature’s Ally I', 'Conjuración', 'Convocación', NULL, '1 round', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'One summoned creature', '1 round/Nivel (D)', 'Ninguna', 'No', 'This spell summons a natural creature. It appears where you designate and acts immediately, on your turn. It attacks your opponents to the best of its ability. If you can communicate with the creature, you can direct it not to attack, to attack particular enemies, or to perform other actions.

A summoned monster cannot summon or otherwise conjure another creature, nor can it use any teleportation or planar travel abilities. Creatures cannot be summoned into an environment that cannot support them.

The spell conjures one of the creatures from the 1st-level list on the accompanying Summon Nature’s Ally table. You choose which kind of creature to summon, and you can change that choice each time you cast the spell. All the creatures on the table are neutral unless otherwise noted.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('summon-nature-s-ally-ii', 'Summon Nature’s Ally II', 'Conjuración', 'Convocación', NULL, NULL, NULL, NULL, NULL, 'One or more creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'No', 'This spell functions like summon nature’s ally I, except that you can summon one 2nd-level creature or 1d3 1st-level creatures of the same kind.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-nature-s-ally-iii', 'Summon Nature’s Ally III', 'Conjuración', 'Convocación', ARRAY['see text']::TEXT[], NULL, NULL, NULL, NULL, 'One or more creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'No', 'This spell functions like summon nature’s ally I, except that you can summon one 3rd-level creature, 1d3 2nd-level creatures of the same kind, or 1d4+1 1st-level creatures of the same kind.

When you use a summoning spell to summon an air, chaotic, earth, evil, fire, good, lawful, or water creature, it is a spell of that type.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-nature-s-ally-iv', 'Summon Nature’s Ally IV', 'Conjuración', 'Convocación', ARRAY['see text']::TEXT[], NULL, NULL, NULL, NULL, 'One or more creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'No', 'This spell functions like summon nature’s ally I, except that you can summon one 4th-level creature, 1d3 3rd-level creatures of the same kind, or 1d4+1 lower-level creatures of the same kind.

When you use a summoning spell to summon an air, chaotic, earth, evil, fire, good, lawful, or water creature, it is a spell of that type.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-nature-s-ally-ix', 'Summon Nature’s Ally IX', 'Conjuración', 'Convocación', ARRAY['see text']::TEXT[], NULL, NULL, NULL, NULL, 'One or more creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'No', 'This spell functions like summon nature’s ally I, except that you can summon one 9th-level creature, 1d3 8th-level creatures of the same kind, or 1d4+1 lower-level creatures of the same kind.

When you use a summoning spell to summon an air, chaotic, earth, evil, fire, good, lawful, or water creature, it is a spell of that type.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-nature-s-ally-v', 'Summon Nature’s Ally V', 'Conjuración', 'Convocación', ARRAY['see text']::TEXT[], NULL, NULL, NULL, NULL, 'One or more creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'No', 'This spell functions like summon nature’s ally I, except that you can summon one 5th-level creature, 1d3 4th-level creatures of the same kind, or 1d4+1 lower-level creatures of the same kind.

When you use a summoning spell to summon an air, chaotic, earth, evil, fire, good, lawful, or water creature, it is a spell of that type.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-nature-s-ally-vi', 'Summon Nature’s Ally VI', 'Conjuración', 'Convocación', ARRAY['see text']::TEXT[], NULL, NULL, NULL, NULL, 'One or more creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'No', 'This spell functions like summon nature’s ally I, except that you can summon one 6th-level creature, 1d3 5th-level creatures of the same kind, or 1d4+1 lower-level creatures of the same kind.

When you use a summoning spell to summon an air, chaotic, earth, evil, fire, good, lawful, or water creature, it is a spell of that type.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-nature-s-ally-vii', 'Summon Nature’s Ally VII', 'Conjuración', 'Convocación', ARRAY['see text']::TEXT[], NULL, NULL, NULL, NULL, 'One or more creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'No', 'This spell functions like summon nature’s ally I, except that you can summon one 7th-level creature, 1d3 6th-level creatures of the same kind, or 1d4+1 lower-level creatures of the same kind.

When you use a summoning spell to summon an air, chaotic, earth, evil, fire, good, lawful, or water creature, it is a spell of that type.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-nature-s-ally-viii', 'Summon Nature’s Ally VIII', 'Conjuración', 'Convocación', ARRAY['see text']::TEXT[], NULL, NULL, NULL, NULL, 'One or more creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'No', 'This spell functions like summon nature’s ally I, except that you can summon one 8th-level creature, 1d3 7th-level creatures of the same kind, or 1d4+1 lower-level creatures of the same kind.

When you use a summoning spell to summon an air, chaotic, earth, evil, fire, good, lawful, or water creature, it is a spell of that type.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('summon-swarm', 'Summon Swarm', 'Conjuración', 'Convocación', NULL, '1 round', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'One swarm of bats, rats, or spiders', 'Concentración + 2 rounds', 'Ninguna', 'No', 'You summon a swarm of bats, rats, or spiders (your choice), which attacks all other creatures within its area. (You may summon the swarm so that it shares the area of other creatures.) If no living creatures are within its area, the swarm attacks or pursues the nearest creature as best it can. The caster has no control over its target or direction of travel.

A square of red cloth.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('sunbeam', 'Sunbeam', 'Evocación', NULL, ARRAY['Luz']::TEXT[], '1 standard action', '60 ft.', NULL, 'Line from your hand', NULL, '1 round/Nivel or until all beams are exhausted', 'Reflejos anula and Reflejos mitad; see text', 'Sí', 'For the duration of this spell, you can use a standard action to evoke a dazzling beam of intense light each round. You can call forth one beam per three caster levels (maximum six beams at 18th level). The spell ends when its duration runs out or your allotment of beams is exhausted.

Each creature in the beam is blinded and takes 4d6 points of damage. Any creatures to which sunlight is harmful or unnatural take double damage. A successful Reflex save negates the blindness and reduces the damage by half.

An undead creature caught within the beam takes 1d6 points of damage per caster level (maximum 20d6), or half damage if a Reflex save is successful. In addition, the beam results in the destruction of any undead creature specifically harmed by bright light if it fails its save.

The ultraviolet light generated by the spell deals damage to fungi, mold, oozes, and slimes just as if they were undead creatures.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('sunburst', 'Sunburst', 'Evocación', NULL, ARRAY['Luz']::TEXT[], '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, '80-ft.-radius burst', NULL, 'Instantáneo', 'Reflejos parcial; see text', 'Sí', 'Sunburst causes a globe of searing radiance to explode silently from a point you select. All creatures in the globe are blinded and take 6d6 points of damage. A creature to which sunlight is harmful or unnatural takes double damage. A successful Reflex save negates the blindness and reduces the damage by half.

An undead creature caught within the globe takes 1d6 points of damage per caster level (maximum 25d6), or half damage if a Reflex save is successful. In addition, the burst results in the destruction of any undead creature specifically harmed by bright light if it fail its save.

The ultraviolet light generated by the spell deals damage to fungi, mold, oozes, and slimes just as if they were undead creatures.

Sunburst dispels any darkness spells of lower than 9th level within its area.

A piece of sunstone and a naked flame.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('symbol-of-death', 'Symbol of Death', 'Nigromancia', NULL, ARRAY['Muerte']::TEXT[], '10 minutes', '0 ft.; see text', NULL, NULL, 'One symbol', 'See text', 'Fortaleza anula', 'Sí', 'This spell allows you to scribe a potent rune of power upon a surface. When triggered, a symbol of death slays one or more creatures within 60 feet of the symbol (treat as a burst) whose combined total current hit points do not exceed 150. The symbol of death affects the closest creatures first, skipping creatures with too many hit points to affect. Once triggered, the symbol becomes active and glows, lasting for 10 minutes per caster level or until it has affected 150 hit points’ worth of creatures, whichever comes first. Any creature that enters the area while the symbol of death is active is subject to its effect, whether or not that creature was in the area when it was triggered. A creature need save against the symbol only once as long as it remains within the area, though if it leaves the area and returns while the symbol is still active, it must save again.

Until it is triggered, the symbol of death is inactive (though visible and legible at a distance of 60 feet). To be effective, a symbol of death must always be placed in plain sight and in a prominent location. Covering or hiding the rune renders the symbol of death ineffective, unless a creature removes the covering, in which case the symbol of death works normally.

As a default, a symbol of death is triggered whenever a creature does one or more of the following, as you select: looks at the rune; reads the rune; touches the rune; passes over the rune; or passes through a portal bearing the rune. Regardless of the trigger method or methods chosen, a creature more than 60 feet from a symbol of death can’t trigger it (even if it meets one or more of the triggering conditions, such as reading the rune). Once the spell is cast, a symbol of death’s triggering conditions cannot be changed.

In this case, “reading” the rune means any attempt to study it, identify it, or fathom its meaning. Throwing a cover over a symbol of death to render it inoperative triggers it if the symbol reacts to touch. You can’t use a symbol of death offensively; for instance, a touch-triggered symbol of death remains untriggered if an item bearing the symbol of death is used to touch a creature. Likewise, a symbol of death cannot be placed on a weapon and set to activate when the weapon strikes a foe.

You can also set special triggering limitations of your own. These can be as simple or elaborate as you desire. Special conditions for triggering a symbol of death can be based on a creature’s name, identity, or alignment, but otherwise must be based on observable actions or qualities. Intangibles such as level, class, Hit Dice, and hit points don’t qualify.

When scribing a symbol of death, you can specify a password or phrase that prevents a creature using it from triggering the effect. Anyone using the password remains immune to that particular rune’s effects so long as the creature remains within 60 feet of the rune. If the creature leaves the radius and returns later, it must use the password again.

You also can attune any number of creatures to the symbol of death, but doing this can extend the casting time. Attuning one or two creatures takes negligible time, and attuning a small group (as many as ten creatures) extends the casting time to 1 hour. Attuning a large group (as many as twenty-five creatures) takes 24 hours. Attuning larger groups takes proportionately longer. Any creature attuned to a symbol of death cannot trigger it and is immune to its effects, even if within its radius when triggered. You are automatically considered attuned to your own symbols of death, and thus always ignore the effects and cannot inadvertently trigger them.

Read magic allows you to identify a symbol of death with a DC 19 Spellcraft check. Of course, if the symbol of death is set to be triggered by reading it, this will trigger the symbol.

A symbol of death can be removed by a successful dispel magic targeted solely on the rune. An erase spell has no effect on a symbol of death. Destruction of the surface where a symbol of death is inscribed destroys the symbol but also triggers it.

Symbol of death can be made permanent with a permanency spell. A permanent symbol of death that is disabled or that has affected its maximum number of hit points becomes inactive for 10 minutes, then can be triggered again as normal.

Note: Magic traps such as symbol of death are hard to detect and disable. A rogue (only) can use the Search skill to find a symbol of death and Disable Device to thwart it. The DC in each case is 25 + spell level, or 33 for symbol of death.

Mercury and phosphorus, plus powdered diamond and opal with a total value of at least 5,000 gp each.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('symbol-of-fear', 'Symbol of Fear', 'Nigromancia', NULL, ARRAY['Miedo, Afecta la Mente']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, 'Voluntad anula', 'No', 'This spell functions like symbol of death, except that all creatures within 60 feet of the symbol of fear instead become panicked for 1 round per caster level.

Note: Magic traps such as symbol of fear are hard to detect and disable. A rogue (only) can use the Search skill to find a symbol of fear and Disable Device to thwart it. The DC in each case is 25 + spell level, or 31 for symbol of fear.

Mercury and phosphorus, plus powdered diamond and opal with a total value of at least 1,000 gp.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('symbol-of-insanity', 'Symbol of Insanity', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, 'Voluntad anula', 'No', 'This spell functions like symbol of death, except that all creatures within the radius of the symbol of insanity instead become permanently insane (as the insanity spell).

Unlike symbol of death, symbol of insanity has no hit point limit; once triggered, a symbol of insanity simply remains active for 10 minutes per caster level.

Note: Magic traps such as symbol of insanity are hard to detect and disable. A rogue (only) can use the Search skill to find a symbol of insanity and Disable Device to thwart it. The DC in each case is 25 + spell level, or 33 for symbol of insanity.

Mercury and phosphorus, plus powdered diamond and opal with a total value of at least 5,000 gp.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('symbol-of-pain', 'Symbol of Pain', 'Nigromancia', NULL, ARRAY['Maligno']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like symbol of death, except that each creature within the radius of a symbol of pain instead suffers wracking pains that impose a -4 penalty on attack rolls, skill checks, and ability checks. These effects last for 1 hour after the creature moves farther than 60 feet from the symbol.

Unlike symbol of death, symbol of pain has no hit point limit; once triggered, a symbol of pain simply remains active for 10 minutes per caster level.

Note: Magic traps such as symbol of pain are hard to detect and disable. A rogue (only) can use the Search skill to find a symbol of pain and Disable Device to thwart it. The DC in each case is 25 + spell level, or 30 for symbol of pain.

Mercury and phosphorus, plus powdered diamond and opal with a total value of at least 1,000 gp.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('symbol-of-persuasion', 'Symbol of Persuasion', 'Encantamiento', 'Hechizo', ARRAY['Afecta la Mente']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, 'Voluntad anula', 'No', 'This spell functions like symbol of death, except that all creatures within the radius of a symbol of persuasion instead become charmed by the caster (as the charm monster spell) for 1 hour per caster level.

Unlike symbol of death, symbol of persuasion has no hit point limit; once triggered, a symbol of persuasion simply remains active for 10 minutes per caster level.

Note: Magic traps such as symbol of persuasion are hard to detect and disable. A rogue (only) can use the Search skill to find a symbol of persuasion and Disable Device to thwart it. The DC in each case is 25 + spell level, or 31 for symbol of persuasion.

Mercury and phosphorus, plus powdered diamond and opal with a total value of at least 5,000 gp.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('symbol-of-sleep', 'Symbol of Sleep', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, 'Voluntad anula', 'No', 'This spell functions like symbol of death, except that all creatures of 10 HD or less within 60 feet of the symbol of sleep instead fall into a catatonic slumber for 3d6×10 minutes. Unlike with the sleep spell, sleeping creatures cannot be awakened by nonmagical means before this time expires.

Unlike symbol of death, symbol of sleep has no hit point limit; once triggered, a symbol of sleep simply remains active for 10 minutes per caster level.

Note: Magic traps such as symbol of sleep are hard to detect and disable. A rogue (only) can use the Search skill to find a symbol of sleep and Disable Device to thwart it. The DC in each case is 25 + spell level, or 30 for symbol of sleep.

Mercury and phosphorus, plus powdered diamond and opal with a total value of at least 1,000 gp.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('symbol-of-stunning', 'Symbol of Stunning', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, 'Voluntad anula', 'No', 'This spell functions like symbol of death, except that all creatures within 60 feet of a symbol of stunning instead become stunned for 1d6 rounds.

Note: Magic traps such as symbol of stunning are hard to detect and disable. A rogue (only) can use the Search skill to find a symbol of stunning and Disable Device to thwart it. The DC in each case is 25 + spell level, or 32 for symbol of stunning.

Mercury and phosphorus, plus powdered diamond and opal with a total value of at least 5,000 gp.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('symbol-of-weakness', 'Symbol of Weakness', 'Nigromancia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like symbol of death, except that every creature within 60 feet of a symbol of weakness instead suffers crippling weakness that deals 3d6 points of Strength damage.

Unlike symbol of death, symbol of weakness has no hit point limit; once triggered, a symbol of weakness simply remains active for 10 minutes per caster level.

Note: Magic traps such as symbol of weakness are hard to detect and disable. A rogue (only) can use the Search skill to find a symbol of weakness and Disable Device to thwart it. The DC in each case is 25 + spell level, or 32 for symbol of weakness.

Mercury and phosphorus, plus powdered diamond and opal with a total value of at least 5,000 gp.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('sympathetic-vibration', 'Sympathetic Vibration', 'Evocación', NULL, ARRAY['Sónico']::TEXT[], '10 minutes', 'Toque', 'One freestanding structure', NULL, NULL, 'Up to 1 round/Nivel', 'Ninguna; see text', 'Sí', 'By attuning yourself to a freestanding structure such you can create a damaging vibration within it. Once it begins, the vibration deals 2d10 points of damage per round to the target structure. (Hardness has no effect on the spell’s damage.) You can choose at the time of casting to limit the duration of the spell; otherwise it lasts for 1 round/ level. If the spell is cast upon a target that is not freestanding the surrounding stone dissipates the effect and no damage occurs.

Sympathetic vibration cannot affect creatures (including constructs). Since a structure is an unattended object, it gets no saving throw to resist the effect.

A tuning fork.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('sympathy', 'Sympathy', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 hour', 'Cercano (25 ft. + 5 ft./2 levels)', 'One location (up to a 10-ft. cube/Nivel) or one object', NULL, NULL, '2 hours/Nivel (D)', 'Voluntad anula; see text', 'Sí', 'You cause an object or location to emanate magical vibrations that attract either a specific kind of intelligent creature or creatures of a particular alignment, as defined by you. The particular kind of creature to be affected must be named specifically. A creature subtype is not specific enough. Likewise, the specific alignment must be named.

Creatures of the specified kind or alignment feel elated and pleased to be in the area or desire to touch or to possess the object. The compulsion to stay in the area or touch the object is overpowering. If the save is successful, the creature is released from the enchantment, but a subsequent save must be made 1d6×10 minutes later. If this save fails, the affected creature attempts to return to the area or object.

Sympathy counters and dispels antipathy.

1,500 gp worth of crushed pearls and a drop of honey.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('telekinesis', 'Telekinesis', 'Transmutación', NULL, NULL, '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, NULL, NULL, 'Concentración (up to 1 round/ Nivel) or Instantáneo; see text', 'Voluntad anula (object) or Ninguna; see text', 'Sí (object); see text', 'You move objects or creatures by concentrating on them. Depending on the version selected, the spell can provide a gentle, sustained force, perform a variety of combat maneuvers, or exert a single short, violent thrust.

A sustained force moves an object weighing no more than 25 pounds per caster level (maximum 375 pounds at 15th level) up to 20 feet per round. A creature can negate the effect on an object it possesses with a successful Will save or with spell resistance.

This version of the spell can last 1 round per caster level, but it ends if you cease concentration. The weight can be moved vertically, horizontally, or in both directions. An object cannot be moved beyond your range. The spell ends if the object is forced beyond the range. If you cease concentration for any reason, the object falls or stops.

An object can be telekinetically manipulated as if with one hand. For example, a lever or rope can be pulled, a key can be turned, an object rotated, and so on, if the force required is within the weight limitation. You might even be able to untie simple knots, though delicate activities such as these require Intelligence checks.

Alternatively, once per round, you can use telekinesis to perform a bull rush, disarm, grapple (including pin), or trip. Resolve these attempts as normal, except that they don’t provoke attacks of opportunity, you use your caster level in place of your base attack bonus (for disarm and grapple), you use your Intelligence modifier (if a wizard) or Charisma modifier (if a sorcerer) in place of your Strength or Dexterity modifier, and a failed attempt doesn’t allow a reactive attempt by the target (such as for disarm or trip). No save is allowed against these attempts, but spell resistance applies normally. This version of the spell can last 1 round per caster level, but it ends if you cease concentration.

Alternatively, the spell energy can be spent in a single round. You can hurl one object or creature per caster level (maximum 15) that are within range and all within 10 feet of each other toward any target within 10 feet per level of all the objects. You can hurl up to a total weight of 25 pounds per caster level (maximum 375 pounds at 15th level).

You must succeed on attack rolls (one per creature or object thrown) to hit the target with the items, using your base attack bonus + your Intelligence modifier (if a wizard) or Charisma modifier (if a sorcerer). Weapons cause standard damage (with no Strength bonus; note that arrows or bolts deal damage as daggers of their size when used in this manner). Other objects cause damage ranging from 1 point per 25 pounds (for less dangerous objects) to 1d6 points of damage per 25 pounds (for hard, dense objects).

Creatures who fall within the weight capacity of the spell can be hurled, but they are allowed Will saves (and spell resistance) to negate the effect, as are those whose held possessions are targeted by the spell. If a telekinesed creature is hurled against a solid surface, it takes damage as if it had fallen 10 feet (1d6 points).', NULL, NULL, NULL, true, true, false, false, false, false),
  ('telekinetic-sphere', 'Telekinetic Sphere', 'Evocación', NULL, ARRAY['Fuerza']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, '1-ft.-diameter/Nivel sphere, centered around creatures or objects', '1 min./Nivel (D)', 'Reflejos anula (object)', 'Sí (object)', 'This spell functions like resilient sphere, with the addition that the creatures or objects inside the globe are nearly weightless. Anything contained within an telekinetic sphere weighs only one-sixteenth of its normal weight. You can telekinetically lift anything in the sphere that normally weighs 5,000 pounds or less. The telekinetic control extends from you out to medium range (100 feet + 10 feet per caster level) after the sphere has succeeded in encapsulating its contents.

You can move objects or creatures in the sphere that weigh a total of 5,000 pounds or less by concentrating on the sphere. You can begin moving a sphere in the round after casting the spell. If you concentrate on doing so (a standard action), you can move the sphere as much as 30 feet in a round. If you cease concentrating, the sphere does not move in that round (if on a level surface) or descends at its falling rate (if aloft) until it reaches a level surface, or the spell’s duration expires, or you begin concentrating again. If you cease concentrating (voluntarily or due to failing a Concentration check), you can resume concentrating on your next turn or any later turn during the spell’s duration.

The sphere falls at a rate of only 60 feet per round, which is not fast enough to cause damage to the contents of the sphere.

You can move the sphere telekinetically even if you are in it.

A hemispherical piece of clear crystal, a matching hemispherical piece of gum arabic, and a pair of small bar magnets.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('telepathic-bond', 'Telepathic Bond', 'Adivinación', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'You plus one willing creature per three levels, No two of which can be more than 30 ft. apart', NULL, NULL, '10 min./Nivel (D)', 'Ninguna', 'No', 'You forge a telepathic bond among yourself and a number of willing creatures, each of which must have an Intelligence score of 3 or higher. Each creature included in the link is linked to all the others. The creatures can communicate telepathically through the bond regardless of language. No special power or influence is established as a result of the bond. Once the bond is formed, it works over any distance (although not from one plane to another).

If desired, you may leave yourself out of the telepathic bond forged. This decision must be made at the time of casting.

Telepathic bond can be made permanent with a permanency spell, though it only bonds two creatures per casting of permanency.

Pieces of eggshell from two different kinds of creatures.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('teleport', 'Teleport', 'Conjuración', 'Teletransportación', NULL, '1 standard action', 'Personal and Toque', 'You and touched objects or other touched willing creatures', NULL, NULL, 'Instantáneo', 'Ninguna and Voluntad anula (object)', 'No and Sí (object)', 'This spell instantly transports you to a designated destination, which may be as distant as 100 miles per caster level. Interplanar travel is not possible. You can bring along objects as long as their weight doesn’t exceed your maximum load. You may also bring one additional willing Medium or smaller creature (carrying gear or objects up to its maximum load) or its equivalent (see below) per three caster levels. A Large creature counts as two Medium creatures, a Huge creature counts as two Large creatures, and so forth. All creatures to be transported must be in contact with one another, and at least one of those creatures must be in contact with you. As with all spells where the range is personal and the target is you, you need not make a saving throw, nor is spell resistance applicable to you. Only objects held or in use (attended) by another person receive saving throws and spell resistance.

You must have some clear idea of the location and layout of the destination. The clearer your mental image, the more likely the teleportation works. Areas of strong physical or magical energy may make teleportation more hazardous or even impossible.

To see how well the teleportation works, roll d% and consult the Teleport table. Refer to the following information for definitions of the terms on the table.

“Very familiar” is a place where you have been very often and where you feel at home. “Studied carefully” is a place you know well, either because you can currently see it, you’ve been there often, or you have used other means (such as scrying) to study the place for at least one hour. “Seen casually” is a place that you have seen more than once but with which you are not very familiar. “Viewed once” is a place that you have seen once, possibly using magic.

“False destination” is a place that does not truly exist or if you are teleporting to an otherwise familiar location that no longer exists as such or has been so completely altered as to no longer be familiar to you. When traveling to a false destination, roll 1d20+80 to obtain results on the table, rather than rolling d%, since there is no real destination for you to hope to arrive at or even be off target from.

You appear where you want to be.

You appear safely a random distance away from the destination in a random direction. Distance off target is 1d10×1d10% of the distance that was to be traveled. The direction off target is determined randomly

You wind up in an area that’s visually or thematically similar to the target area.

Generally, you appear in the closest similar place within range. If no such area exists within the spell’s range, the spell simply fails instead.

You and anyone else teleporting with you have gotten “scrambled.” You each take 1d10 points of damage, and you reroll on the chart to see where you wind up. For these rerolls, roll 1d20+80. Each time “Mishap” comes up, the characters take more damage and must reroll.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('teleportation-circle', 'Teleportation Circle', 'Conjuración', 'Teletransportación', NULL, '10 minutes', '0 ft.', NULL, NULL, '5-ft.-radius circle that teleports those who activate it', '10 min./Nivel (D)', 'Ninguna', 'Sí', 'You create a circle on the floor or other horizontal surface that teleports, as greater teleport, any creature who stands on it to a designated spot. Once you designate the destination for the circle, you can’t change it. The spell fails if you attempt to set the circle to teleport creatures into a solid object, to a place with which you are not familiar and have no clear description, or to another plane.

The circle itself is subtle and nearly impossible to notice. If you intend to keep creatures from activating it accidentally, you need to mark the circle in some way.

Teleportation circle can be made permanent with a permanency spell. A permanent teleportation circle that is disabled becomes inactive for 10 minutes, then can be triggered again as normal.

Note: Magic traps such as teleportation circle are hard to detect and disable. A rogue (only) can use the Search skill to find the circle and Disable Device to thwart it. The DC in each case is 25 + spell level, or 34 in the case of teleportation circle.

Amber dust to cover the area of the circle (cost 1,000 gp).', NULL, NULL, NULL, true, false, true, false, false, false),
  ('teleport-greater', 'Teleport, Greater', 'Conjuración', 'Teletransportación', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like teleport, except that there is no range limit and there is no chance you arrive off target. In addition, you need not have seen the destination, but in that case you must have at least a reliable description of the place to which you are teleporting. If you attempt to teleport with insufficient information (or with misleading information), you disappear and simply reappear in your original location. Interplanar travel is not possible.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('teleport-object', 'Teleport Object', 'Conjuración', 'Teletransportación', NULL, NULL, 'Toque', 'One touched object of up to 50 lb./Nivel and 3 cu. ft./Nivel', NULL, NULL, NULL, 'Voluntad anula (object)', 'Sí (object)', 'This spell functions like teleport, except that it teleports an object, not you. Creatures and magical forces cannot be teleported.

If desired, the target object can be sent to a distant location on the Ethereal Plane. In this case, the point from which the object was teleported remains faintly magical until the item is retrieved. A successful targeted dispel magic spell cast on that point brings the vanished item back from the Ethereal Plane.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('temporal-stasis', 'Temporal Stasis', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, 'Permanente', 'Fortaleza anula', 'Sí', 'You must succeed on a melee touch attack. You place the subject into a state of suspended animation. For the creature, time ceases to flow and its condition becomes fixed. The creature does not grow older. Its body functions virtually cease, and no force or effect can harm it. This state persists until the magic is removed (such as by a successful dispel magic spell or a freedom spell).

A powder composed of diamond, emerald, ruby, and sapphire dust with a total value of at least 5,000 gp.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('time-stop', 'Time Stop', 'Transmutación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1d4+1 rounds (apparent time); see text', NULL, 'No', 'This spell seems to make time cease to flow for everyone but you. In fact, you speed up so greatly that all other creatures seem frozen, though they are actually still moving at their normal speeds. You are free to act for 1d4+1 rounds of apparent time. Normal and magical fire, cold, gas, and the like can still harm you. While the time stop is in effect, other creatures are invulnerable to your attacks and spells; you cannot target such creatures with any attack or spell. A spell that affects an area and has a duration longer than the remaining duration of the time stop have their normal effects on other creatures once the time stop ends. Most spellcasters use the additional time to improve their defenses, summon allies, or flee from combat.

You cannot move or harm items held, carried, or worn by a creature stuck in normal time, but you can affect any item that is not in another creature’s possession.

You are undetectable while time stop lasts. You cannot enter an area protected by an antimagic field while under the effect of time stop.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('tiny-hut', 'Tiny Hut', 'Evocación', NULL, ARRAY['Fuerza']::TEXT[], '1 standard action', '20 ft.', NULL, NULL, '20-ft.-radius sphere centered on your location', '2 hours/Nivel (D)', 'Ninguna', 'No', 'You create an unmoving, opaque sphere of force of any color you desire around yourself. Half the sphere projects above the ground, and the lower hemisphere passes through the ground. As many as nine other Medium creatures can fit into the field with you; they can freely pass into and out of the hut without harming it. However, if you remove yourself from the hut, the spell ends.

The temperature inside the hut is 70° F if the exterior temperature is between 0° and 100° F. An exterior temperature below 0° or above 100° lowers or raises the interior temperature on a 1-degree-for-1 basis. The hut also provides protection against the elements, such as rain, dust, and sandstorms. The hut withstands any wind of less than hurricane force, but a hurricane (75+ mph wind speed) or greater force destroys it.

The interior of the hut is a hemisphere. You can illuminate it dimly upon command or extinguish the light as desired. Although the force field is opaque from the outside, it is transparent from within. Missiles, weapons, and most spell effects can pass through the hut without affecting it, although the occupants cannot be seen from outside the hut (they have total concealment).

A small crystal bead that shatters when the spell duration expires or the hut is dispelled.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('tongues', 'Tongues', 'Adivinación', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '10 min./Nivel', 'Voluntad anula (harmless)', 'No', 'This spell grants the creature touched the ability to speak and understand the language of any intelligent creature, whether it is a racial tongue or a regional dialect. The subject can speak only one language at a time, although it may be able to understand several languages. Tongues does not enable the subject to speak with creatures who don’t speak. The subject can make itself understood as far as its voice carries. This spell does not predispose any creature addressed toward the subject in any way.

Tongues can be made permanent with a permanency spell.

A small clay model of a ziggurat, which shatters when the verbal component is pronounced.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('touch-of-fatigue', 'Touch of Fatigue', 'Nigromancia', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 round/Nivel', 'Fortaleza anula', 'Sí', 'You channel negative energy through your touch, fatiguing the target. You must succeed on a touch attack to strike a target.

The subject is immediately fatigued for the spell’s duration.

This spell has no effect on a creature that is already fatigued. Unlike with normal fatigue, the effect ends as soon as the spell’s duration expires.

A drop of sweat.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('touch-of-idiocy', 'Touch of Idiocy', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Toque', 'Living creature touched', NULL, NULL, '10 min./Nivel', 'No', 'Sí', 'With a touch, you reduce the target’s mental faculties. Your successful melee touch attack applies a 1d6 penalty to the target’s Intelligence, Wisdom, and Charisma scores. This penalty can’t reduce any of these scores below 1.

This spell’s effect may make it impossible for the target to cast some or all of its spells, if the requisite ability score drops below the minimum required to cast spells of that level.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('transformation', 'Transformation', 'Transmutación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 round/Nivel', NULL, 'No', 'You become a virtual fighting machine—stronger, tougher, faster, and more skilled in combat. Your mind-set changes so that you relish combat and you can’t cast spells, even from magic items.

You gain a +4 enhancement bonus to Strength, Dexterity, and Constitution, a +4 natural armor bonus to AC, a +5 competence bonus on Fortitude saves, and proficiency with all simple and martial weapons. Your base attack bonus equals your character level (which may give you multiple attacks).

You lose your spellcasting ability, including your ability to use spell trigger or spell completion magic items, just as if the spells were no longer on your class list.

A potion of bull’s strength, which you drink (and whose effects are subsumed by the spell effects).', NULL, NULL, NULL, true, true, true, false, false, false),
  ('transmute-metal-to-wood', 'Transmute Metal to Wood', 'Transmutación', NULL, NULL, '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, 'All metal objects within a 40-ft.-radius burst', NULL, 'Instantáneo', 'Ninguna', 'Sí (object; see text)', 'This spell enables you to change all metal objects within its area to wood. Weapons, armor, and other metal objects carried by creatures are affected as well. A magic object made of metal effectively has spell resistance equal to 20 + its caster level against this spell. Artifacts cannot be transmuted. Weapons converted from metal to wood take a -2 penalty on attack and damage rolls. The armor bonus of any armor converted from metal to wood is reduced by 2. Weapons changed by this spell splinter and break on any natural attack roll of 1 or 2, and armor changed by this spell loses an additional point of armor bonus every time it is struck with a natural attack roll of 19 or 20.

Only limited wish, miracle, wish, or similar magic can restore a transmuted object to its metallic state.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('transmute-mud-to-rock', 'Transmute Mud to Rock', 'Transmutación', NULL, ARRAY['Tierra']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, 'Up to two 10-ft. cubes/Nivel (S)', NULL, 'Permanente', 'See text', 'No', 'This spell transforms normal mud or quicksand of any depth into soft stone (sandstone or a similar mineral) permanently.

Any creature in the mud is allowed a Reflex save to escape before the area is hardened to stone.

Transmute mud to rock counters and dispels transmute rock to mud.

Sand, lime, and water.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('transmute-rock-to-mud', 'Transmute Rock to Mud', 'Transmutación', NULL, ARRAY['Tierra']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, 'Up to two 10-ft. cubes/Nivel (S)', NULL, 'Permanente; see text', 'See text', 'No', 'This spell turns natural, uncut or unworked rock of any sort into an equal volume of mud. Magical stone is not affected by the spell. The depth of the mud created cannot exceed 10 feet. A creature unable to levitate, fly, or otherwise free itself from the mud sinks until hip- or chest-deep, reducing its speed to 5 feet and causing a -2 penalty on attack rolls and AC. Brush thrown atop the mud can support creatures able to climb on top of it. Creatures large enough to walk on the bottom can wade through the area at a speed of 5 feet.

If transmute rock to mud is cast upon the ceiling of a cavern or tunnel, the mud falls to the floor and spreads out in a pool at a depth of 5 feet. The falling mud and the ensuing cave-in deal 8d6 points of bludgeoning damage to anyone caught directly beneath the area, or half damage to those who succeed on Reflex saves.

Castles and large stone buildings are generally immune to the effect of the spell, since transmute rock to mud can’t affect worked stone and doesn’t reach deep enough to undermine such buildings’ foundations. However, small buildings or structures often rest upon foundations shallow enough to be damaged or even partially toppled by this spell.

The mud remains until a successful dispel magic or transmute mud to rock spell restores its substance—but not necessarily its form. Evaporation turns the mud to normal dirt over a period of days. The exact time depends on exposure to the sun, wind, and normal drainage.

Clay and water.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('transport-via-plants', 'Transport via Plants', 'Conjuración', 'Teletransportación', NULL, '1 standard action', 'Ilimitado', 'You and touched objects or other touched willing creatures', NULL, NULL, '1 round', 'Ninguna', 'No', 'You can enter any normal plant (Medium or larger) and pass any distance to a plant of the same kind in a single round, regardless of the distance separating the two. The entry plant must be alive. The destination plant need not be familiar to you, but it also must be alive. If you are uncertain of the location of a particular kind of destination plant, you need merely designate direction and distance and the transport via plants spell moves you as close as possible to the desired location. If a particular destination plant is desired but the plant is not living, the spell fails and you are ejected from the entry plant.

You can bring along objects as long as their weight doesn’t exceed your maximum load. You may also bring one additional willing Medium or smaller creature (carrying gear or objects up to its maximum load) or its equivalent per three caster levels. Use the following equivalents to determine the maximum number of larger creatures you can bring along: A Large creature counts as two Medium creatures, a Huge creature counts as two Large creatures, and so forth. All creatures to be transported must be in contact with one another, and at least one of those creatures must be in contact with you.

You can’t use this spell to travel through plant creatures.

The destruction of an occupied plant slays you and any creatures you have brought along, and ejects the bodies and all carried objects from the tree.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('trap-the-soul', 'Trap the Soul', 'Conjuración', 'Convocación', NULL, '1 standard action or see text', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature', NULL, NULL, 'Permanente; see text', 'See text', 'Sí; see text', 'Trap the soul forces a creature’s life force (and its material body) into a gem. The gem holds the trapped entity indefinitely or until the gem is broken and the life force is released, which allows the material body to reform. If the trapped creature is a powerful creature from another plane it can be required to perform a service immediately upon being freed. Otherwise, the creature can go free once the gem imprisoning it is broken.

Depending on the version selected, the spell can be triggered in one of two ways.

First, the spell can be completed by speaking its final word as a standard action as if you were casting a regular spell at the subject. This allows spell resistance (if any) and a Will save to avoid the effect. If the creature’s name is spoken as well, any spell resistance is ignored and the save DC increases by 2. If the save or spell resistance is successful, the gem shatters.

The second method is far more insidious, for it tricks the subject into accepting a trigger object inscribed with the final spell word, automatically placing the creature’s soul in the trap. To use this method, both the creature’s name and the trigger word must be inscribed on the trigger object when the gem is enspelled. A sympathy spell can also be placed on the trigger object. As soon as the subject picks up or accepts the trigger object, its life force is automatically transferred to the gem without the benefit of spell resistance or a save.

Before the actual casting of trap the soul, you must procure a gem of at least 1,000 gp value for every Hit Die possessed by the creature to be trapped. If the gem is not valuable enough, it shatters when the entrapment is attempted. (While creatures have no concept of level or Hit Dice as such, the value of the gem needed to trap an individual can be researched. Remember that this value can change over time as creatures gain more Hit Dice.)

If the trigger object method is used, a special trigger object, prepared as described above, is needed.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('tree-shape', 'Tree Shape', 'Transmutación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 hour/Nivel (D)', NULL, 'No', 'By means of this spell, you are able to assume the form of a Large living tree or shrub or a Large dead tree trunk with a small number of limbs. The closest inspection cannot reveal that the tree in question is actually a magically concealed creature. To all normal tests you are, in fact, a tree or shrub, although a detect magic spell reveals a faint transmutation on the tree. While in tree form, you can observe all that transpires around you just as if you were in your normal form, and your hit points and save bonuses remain unaffected. You gain a +10 natural armor bonus to AC but have an effective Dexterity score of 0 and a speed of 0 feet. You are immune to critical hits while in tree form. All clothing and gear carried or worn changes with you.

You can dismiss tree shape as a free action (instead of as a standard action).', NULL, NULL, NULL, true, true, false, false, true, false),
  ('tree-stride', 'Tree Stride', 'Conjuración', 'Teletransportación', NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 hour/Nivel or until expended; see text', NULL, 'No', 'You gain the ability to enter trees and move from inside one tree to inside another tree. The first tree you enter and all others you enter must be of the same kind, must be living, and must have girth at least equal to yours. By moving into an oak tree (for example), you instantly know the location of all other oak trees within transport range (see below) and may choose whether you want to pass into one or simply step back out of the tree you moved into. You may choose to pass to any tree of the appropriate kind within the transport range as shown on the following table.

You may move into a tree up to one time per caster level (passing from one tree to another counts only as moving into one tree). The spell lasts until the duration expires or you exit a tree. Each transport is a full-round action.

You can, at your option, remain within a tree without transporting yourself, but you are forced out when the spell ends. If the tree in which you are concealed is chopped down or burned, you are slain if you do not exit before the process is complete.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('true-resurrection', 'True Resurrection', 'Conjuración', 'Curación', NULL, '10 minutes', NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like raise dead, except that you can resurrect a creature that has been dead for as long as 10 years per caster level. This spell can even bring back creatures whose bodies have been destroyed, provided that you unambiguously identify the deceased in some fashion (reciting the deceased’s time and place of birth or death is the most common method).

Upon completion of the spell, the creature is immediately restored to full hit points, vigor, and health, with no loss of level (or Constitution points) or prepared spells.

You can revive someone killed by a death effect or someone who has been turned into an undead creature and then destroyed. This spell can also resurrect elementals or outsiders, but it can’t resurrect constructs or undead creatures.

Even true resurrection can’t restore to life a creature who has died of old age.

A sprinkle of holy water and diamonds worth a total of at least 25,000 gp.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('true-seeing', 'True Seeing', 'Adivinación', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 min./Nivel', 'Voluntad anula (harmless)', 'Sí (harmless)', 'True seeing, however, does not penetrate solid objects. It in no way confers X-ray vision or its equivalent. It does not negate concealment, including that caused by fog and the like. True seeing does not help the viewer see through mundane disguises, spot creatures who are simply hiding, or notice secret doors hidden by mundane means. In addition, the spell effects cannot be further enhanced with known magic, so one cannot use true seeing through a crystal ball or in conjunction with clairaudience/clairvoyance.

An ointment for the eyes that costs 250 gp and is made from mushroom powder, saffron, and fat.', NULL, 'You confer on the subject the ability to see all things as they actually are. The subject sees through normal and magical darkness, notices secret doors hidden by magic, sees the exact locations of creatures or objects under blur or displacement effects, sees invisible creatures or objects normally, sees through illusions, and sees the true form of polymorphed, changed, or transmuted things. Further, the subject can its vision to see into the Ethereal Plane (but not into extradimensional spaces). The range of true seeing conferred is 120 feet.', NULL, true, true, true, false, false, false),
  ('true-strike', 'True Strike', 'Adivinación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, 'See text', NULL, 'No', 'You gain temporary, intuitive insight into the immediate future during your next attack. Your next single attack roll (if it is made before the end of the next round) gains a +20 insight bonus. Additionally, you are not affected by the miss chance that applies to attackers trying to strike a concealed target.

A small wooden replica of an archery target.', NULL, NULL, NULL, true, false, false, true, false, false),
  ('undeath-to-death', 'Undeath to Death', 'Nigromancia', NULL, NULL, NULL, NULL, NULL, 'Several undead creatures within a 40-ft.-radius burst', NULL, NULL, 'Voluntad anula', 'No', 'This spell functions like circle of death, except that it destroys undead creatures as noted above.

The powder of a crushed diamond worth at least 500 gp.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('undetectable-alignment', 'Undetectable Alignment', 'Abjuración', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature or object', NULL, NULL, '24 hours', 'Voluntad anula (object)', 'Sí (object)', 'An undetectable alignment spell conceals the alignment of an object or a creature from all forms of divination.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('unhallow', 'Unhallow', 'Evocación', NULL, ARRAY['Maligno']::TEXT[], '24 hours', 'Toque', NULL, '40-ft. radius emanating from the touched point', NULL, 'Instantáneo', 'See text', 'See text', 'Unhallow makes a particular site, building, or structure an unholy site. This has three major effects.

First, the site or structure is guarded by a magic circle against good effect.

Second, all turning checks made to turn undead take a -4 penalty, and turning checks to rebuke undead gain a +4 profane bonus. Spell resistance does not apply to this effect. (This provision does not apply to the druid version of the spell.)

Finally, you may choose to fix a single spell effect to the unhallowed site. The spell effect lasts for one year and functions throughout the entire site, regardless of its normal duration and area or effect. You may designate whether the effect applies to all creatures, creatures that share your faith or alignment, or creatures that adhere to another faith or alignment. At the end of the year, the chosen effect lapses, but it can be renewed or replaced simply by casting unhallow again.

Spell effects that may be tied to an unhallowed site include aid, bane, bless, cause fear, darkness, daylight, death ward, deeper darkness, detect magic, detect good, dimensional anchor, discern lies, dispel magic, endure elements, freedom of movement, invisibility purge, protection from energy, remove fear, resist energy, silence, tongues, and zone of truth.

Saving throws and spell resistance might apply to these spells’ effects. (See the individual spell descriptions for details.)

An area can receive only one unhallow spell (and its associated spell effect) at a time.

Unhallow counters but does not dispel hallow.

Herbs, oils, and incense worth at least 1,000 gp, plus 1,000 gp per level of the spell to be tied to the unhallowed area.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('unholy-aura', 'Unholy Aura', 'Abjuración', NULL, ARRAY['Maligno']::TEXT[], '1 standard action', '20 ft.', 'One creature/Nivel in a 20-ft.-radius burst centered on you', NULL, NULL, '1 round/Nivel (D)', 'See text', 'Sí (harmless)', 'A malevolent darkness surrounds the subjects, protecting them from attacks, granting them resistance to spells cast by good creatures, and weakening good creatures when they strike the subjects. This abjuration has four effects.

First, each warded creature gains a +4 deflection bonus to AC and a +4 resistance bonus on saves. Unlike the effect of protection from good, this benefit applies against all attacks, not just against attacks by good creatures.

Second, a warded creature gains spell resistance 25 against good spells and spells cast by good creatures.

Third, the abjuration blocks possession and mental influence, just as protection from good does.

Finally, if a good creature succeeds on a melee attack against a warded creature, the offending attacker takes 1d6 points of temporary Strength damage (Fortitude negates).

A tiny reliquary containing some sacred relic, such as a piece of parchment from an unholy text. The reliquary costs at least 500 gp.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('unholy-blight', 'Unholy Blight', 'Evocación', NULL, ARRAY['Maligno']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, '20-ft.-radius spread', NULL, 'Instantáneo (1d4 rounds); see text', 'Voluntad parcial', 'Sí', 'You call up unholy power to smite your enemies. The power takes the form of a cold, cloying miasma of greasy darkness.

Only good and neutral (not evil) creatures are harmed by the spell.

The spell deals 1d8 points of damage per two caster levels (maximum 5d8) to a good creature (or 1d6 per caster level, maximum 10d6, to a good outsider) and causes it to be sickened for 1d4 rounds. A successful Will save reduces damage to half and negates the sickened effect. The effects cannot be negated by remove disease or heal, but remove curse is effective.

The spell deals only half damage to creatures who are neither evil nor good, and they are not sickened. Such a creature can reduce the damage in half again (down to one-quarter) with a successful Will save.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('unseen-servant', 'Unseen Servant', 'Conjuración', 'Creación', NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'One invisible, mindless, shapeless servant', '1 hour/Nivel', 'Ninguna', 'No', 'An unseen servant is an invisible, mindless, shapeless force that performs simple tasks at your command. It can run and fetch things, open unstuck doors, and hold chairs, as well as clean and mend. The servant can perform only one activity at a time, but it repeats the same activity over and over again if told to do so as long as you remain within range. It can open only normal doors, drawers, lids, and the like. It has an effective Strength score of 2 (so it can lift 20 pounds or drag 100 pounds). It can trigger traps and such, but it can exert only 20 pounds of force, which is not enough to activate certain pressure plates and other devices. It can’t perform any task that requires a skill check with a DC higher than 10 or that requires a check using a skill that can’t be used untrained. Its speed is 15 feet.

The servant cannot attack in any way; it is never allowed an attack roll. It cannot be killed, but it dissipates if it takes 6 points of damage from area attacks. (It gets no saves against attacks.) If you attempt to send it beyond the spell’s range (measured from your current position), the servant ceases to exist.

A piece of string and a bit of wood.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('vampiric-touch', 'Vampiric Touch', 'Nigromancia', NULL, NULL, '1 standard action', 'Toque', 'Living creature touched', NULL, NULL, 'Instantáneo/1 hour; see text', 'Ninguna', 'Sí', 'You must succeed on a melee touch attack. Your touch deals 1d6 points of damage per two caster levels (maximum 10d6). You gain temporary hit points equal to the damage you deal. However, you can’t gain more than the subject’s current hit points +10, which is enough to kill the subject. The temporary hit points disappear 1 hour later.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('veil', 'Veil', 'Ilusión', 'Glamour', NULL, '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', 'One or more creatures, No two of which can be more than 30 ft. apart', NULL, NULL, 'Concentración + 1 hour/Nivel (D)', 'Voluntad anula; see text', 'Sí; see text', 'You instantly change the appearance of the subjects and then maintain that appearance for the spell’s duration. You can make the subjects appear to be anything you wish. The subjects look, feel, and smell just like the creatures the spell makes them resemble. Affected creatures resume their normal appearances if slain. You must succeed on a Disguise check to duplicate the appearance of a specific individual. This spell gives you a +10 bonus on the check.

Unwilling targets can negate the spell’s effect on them by making Will saves or with spell resistance. Those who interact with the subjects can attempt Will disbelief saves to see through the glamer, but spell resistance doesn’t help.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('ventriloquism', 'Ventriloquism', 'Ilusión', 'Engaño', NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Intelligible sound, usually speech', '1 min./Nivel (D)', 'Voluntad incredulidad (if interacted with)', 'No', 'You can make your voice (or any sound that you can normally make vocally) seem to issue from someplace else. You can speak in any language you know. With respect to such voices and sounds, anyone who hears the sound and rolls a successful save recognizes it as illusory (but still hears it).

A parchment rolled up into a small cone.', NULL, NULL, NULL, true, false, false, true, false, false),
  ('virtue', 'Virtue', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 min.', 'Fortaleza anula (harmless)', 'Sí (harmless)', 'The subject gains 1 temporary hit point.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('vision', 'Vision', 'Adivinación', NULL, NULL, '1 standard action', NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like legend lore, except that it works more quickly but produces some strain on you. You pose a question about some person, place, or object, then cast the spell. If the person or object is at hand or if you are in the place in question, you receive a vision about it by succeeding on a caster level check (1d20 +1 per caster level; maximum +25) against DC 20. If only detailed information on the person, place, or object is known, the DC is 25, and the information gained is incomplete. If only rumors are known, the DC is 30, and the information gained is vague.

100 XP.', NULL, NULL, NULL, true, true, true, false, false, true),
  ('wail-of-the-banshee', 'Wail of the Banshee', 'Nigromancia', NULL, ARRAY['Muerte, Sónico']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, 'One living creature/Nivel within a 40-ft.-radius spread', NULL, 'Instantáneo', 'Fortaleza anula', 'Sí', 'You emit a terrible scream that kills creatures that hear it (except for yourself). Creatures closest to the point of origin are affected first.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('wall-of-fire', 'Wall of Fire', 'Evocación', NULL, ARRAY['Fuego']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Opaque sheet of flame up to 20 ft. Largo/Nivel or a ring of Fuego with a radius of up to 5 ft. per two levels; either form 20 ft. high', 'Concentración + 1 round/Nivel', 'Ninguna', 'Sí', 'An immobile, blazing curtain of shimmering violet fire springs into existence. One side of the wall, selected by you, sends forth waves of heat, dealing 2d4 points of fire damage to creatures within 10 feet and 1d4 points of fire damage to those past 10 feet but within 20 feet. The wall deals this damage when it appears and on your turn each round to all creatures in the area. In addition, the wall deals 2d6 points of fire damage +1 point of fire damage per caster level (maximum +20) to any creature passing through it. The wall deals double damage to undead creatures.

If you evoke the wall so that it appears where creatures are, each creature takes damage as if passing through the wall. If any 5-foot length of wall takes 20 points of cold damage or more in 1 round, that length goes out. (Do not divide cold damage by 4, as normal for objects.)

Wall of fire can be made permanent with a permanency spell. A permanent wall of fire that is extinguished by cold damage becomes inactive for 10 minutes, then reforms at normal strength.

A small piece of phosphorus.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('wall-of-force', 'Wall of Force', 'Evocación', NULL, ARRAY['Fuerza']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Wall whose Área is up to one 10-ft. square/Nivel', '1 round /Nivel (D)', 'Ninguna', 'No', 'A wall of force spell creates an invisible wall of force. The wall cannot move, it is immune to damage of all kinds, and it is unaffected by most spells, including dispel magic. However, disintegrate immediately destroys it, as does a rod of cancellation, a sphere of annihilation, or a mage’s disjunction spell. Breath weapons and spells cannot pass through the wall in either direction, although dimension door, teleport, and similar effects can bypass the barrier. It blocks ethereal creatures as well as material ones (though ethereal creatures can usually get around the wall by floating under or over it through material floors and ceilings). Gaze attacks can operate through a wall of force.

The caster can form the wall into a flat, vertical plane whose area is up to one 10-foot square per level. The wall must be continuous and unbroken when formed. If its surface is broken by any object or creature, the spell fails.

Wall of force can be made permanent with a permanency spell.

A pinch of powder made from a clear gem.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('wall-of-ice', 'Wall of Ice', 'Evocación', NULL, ARRAY['Frío']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Anchored plane of ice, up to one 10-ft. square/Nivel, or hemisphere of ice with a radius of up to 3 ft. + 1 ft./Nivel', '1 min./Nivel', 'Reflejos anula; see text', 'Sí', 'This spell creates an anchored plane of ice or a hemisphere of ice, depending on the version selected. A wall of ice cannot form in an area occupied by physical objects or creatures. Its surface must be smooth and unbroken when created. Any creature adjacent to the wall when it is created may attempt a Reflex save to disrupt the wall as it is being formed. A successful save indicates that the spell automatically fails. Fire can melt a wall of ice, and it deals full damage to the wall (instead of the normal half damage taken by objects). Suddenly melting a wall of ice creates a great cloud of steamy fog that lasts for 10 minutes.

A sheet of strong, hard ice appears. The wall is 1 inch thick per caster level. It covers up to a 10-foot-square area per caster level (so a 10th-level wizard can create a wall of ice 100 feet long and 10 feet high, a wall 50 feet long and 20 feet high, or some other combination of length and height that does not exceed 1,000 square feet). The plane can be oriented in any fashion as long as it is anchored. A vertical wall need only be anchored on the floor, while a horizontal or slanting wall must be anchored on two opposite sides.

Each 10-foot square of wall has 3 hit points per inch of thickness. Creatures can hit the wall automatically. A section of wall whose hit points drop to 0 is breached. If a creature tries to break through the wall with a single attack, the DC for the Strength check is 15 + caster level.

Even when the ice has been broken through, a sheet of frigid air remains. Any creature stepping through it (including the one who broke through the wall) takes 1d6 points of cold damage +1 point per caster level (no save).

The wall takes the form of a hemisphere whose maximum radius is 3 feet + 1 foot per caster level. The hemisphere is as hard to break through as the ice plane form, but it does not deal damage to those who go through a breach.

A small piece of quartz or similar rock crystal.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('wall-of-iron', 'Wall of Iron', 'Conjuración', 'Creación', NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Iron wall whose Área is up to one 5-ft. square/Nivel; see text', 'Instantáneo', 'See text', 'No', 'You cause a flat, vertical iron wall to spring into being. The wall inserts itself into any surrounding nonliving material if its area is sufficient to do so. The wall cannot be conjured so that it occupies the same space as a creature or another object. It must always be a flat plane, though you can shape its edges to fit the available space.

A wall of iron is 1 inch thick per four caster levels. You can double the wall’s area by halving its thickness. Each 5-foot square of the wall has 30 hit points per inch of thickness and hardness 10. A section of wall whose hit points drop to 0 is breached. If a creature tries to break through the wall with a single attack, the DC for the Strength check is 25 + 2 per inch of thickness.

If you desire, the wall can be created vertically resting on a flat surface but not attached to the surface, so that it can be tipped over to fall on and crush creatures beneath it. The wall is 50% likely to tip in either direction if left unpushed. Creatures can push the wall in one direction rather than letting it fall randomly. A creature must make a DC 40 Strength check to push the wall over. Creatures with room to flee the falling wall may do so by making successful Reflex saves. Any Large or smaller creature that fails takes 10d6 points of damage. The wall cannot crush Huge and larger creatures.

Like any iron wall, this wall is subject to rust, perforation, and other natural phenomena.

A small piece of sheet iron plus gold dust worth 50 gp (1 pound of gold dust).', NULL, NULL, NULL, true, true, true, false, false, false),
  ('wall-of-stone', 'Wall of Stone', 'Conjuración', 'Creación', ARRAY['Tierra']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Stone wall whose Área is up to one 5-ft. square/Nivel (S)', 'Instantáneo', 'See text', 'No', 'This spell creates a wall of rock that merges into adjoining rock surfaces. A wall of stone is 1 inch thick per four caster levels and composed of up to one 5-foot square per level. You can double the wall’s area by halving its thickness. The wall cannot be conjured so that it occupies the same space as a creature or another object.

Unlike a wall of iron, you can create a wall of stone in almost any shape you desire. The wall created need not be vertical, nor rest upon any firm foundation; however, it must merge with and be solidly supported by existing stone. It can be used to bridge a chasm, for instance, or as a ramp. For this use, if the span is more than 20 feet, the wall must be arched and buttressed. This requirement reduces the spell’s area by half. The wall can be crudely shaped to allow crenellations, battlements, and so forth by likewise reducing the area.

Like any other stone wall, this one can be destroyed by a disintegrate spell or by normal means such as breaking and chipping. Each 5-foot square of the wall has 15 hit points per inch of thickness and hardness 8. A section of wall whose hit points drop to 0 is breached. If a creature tries to break through the wall with a single attack, the DC for the Strength check is 20 + 2 per inch of thickness.

It is possible, but difficult, to trap mobile opponents within or under a wall of stone, provided the wall is shaped so it can hold the creatures. Creatures can avoid entrapment with successful Reflex saves.

A small block of granite.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('wall-of-thorns', 'Wall of Thorns', 'Conjuración', 'Creación', NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Wall of thorny brush, up to one 10-ft. cube/Nivel (S)', '10 min./Nivel (D)', 'Ninguna', 'No', 'A wall of thorns spell creates a barrier of very tough, pliable, tangled brush bearing needle-sharp thorns as long as a human’s finger. Any creature forced into or attempting to move through a wall of thorns takes slashing damage per round of movement equal to 25 minus the creature’s AC. Dexterity and dodge bonuses to AC do not count for this calculation. (Creatures with an Armor Class of 25 or higher, without considering Dexterity and dodge bonuses, take no damage from contact with the wall.)

You can make the wall as thin as 5 feet thick, which allows you to shape the wall as a number of 10-by-10-by-5-foot blocks equal to twice your caster level. This has no effect on the damage dealt by the thorns, but any creature attempting to break through takes that much less time to force its way through the barrier.

Creatures can force their way slowly through the wall by making a Strength check as a full-round action. For every 5 points by which the check exceeds 20, a creature moves 5 feet (up to a maximum distance equal to its normal land speed). Of course, moving or attempting to move through the thorns incurs damage as described above. A creature trapped in the thorns can choose to remain motionless in order to avoid taking any more damage.

Any creature within the area of the spell when it is cast takes damage as if it had moved into the wall and is caught inside. In order to escape, it must attempt to push its way free, or it can wait until the spell ends. Creatures with the ability to pass through overgrown areas unhindered can pass through a wall of thorns at normal speed without taking damage.

A wall of thorns can be breached by slow work with edged weapons. Chopping away at the wall creates a safe passage 1 foot deep for every 10 minutes of work. Normal fire cannot harm the barrier, but magical fire burns it away in 10 minutes.

Despite its appearance, a wall of thorns is not actually a living plant, and thus is unaffected by spells that affect plants.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('warp-wood', 'Warp Wood', 'Transmutación', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', '1 Small wooden object/Nivel, all within a 20-ft. radius', NULL, NULL, 'Instantáneo', 'Voluntad anula (object)', 'Sí (object)', 'You cause wood to bend and warp, permanently destroying its straightness, form, and strength. A warped door springs open (or becomes stuck, requiring a Strength check to open, at your option). A boat or ship springs a leak. Warped ranged weapons are useless. A warped melee weapon causes a -4 penalty on attack rolls.

You may warp one Small or smaller object or its equivalent per caster level. A Medium object counts as two Small objects, a Large object as four, a Huge object as eight, a Gargantuan object as sixteen, and a Colossal object as thirty-two.

Alternatively, you can unwarp wood (effectively warping it back to normal) with this spell, straightening wood that has been warped by this spell or by other means. Make whole, on the other hand, does no good in repairing a warped item.

You can combine multiple consecutive warp wood spells to warp (or unwarp) an object that is too large for you to warp with a single spell.

Until the object is completely warped, it suffers no ill effects.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('water-breathing', 'Water Breathing', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Living creatures touched', NULL, NULL, '2 hours/Nivel; see text', 'Voluntad anula (harmless)', 'Sí (harmless)', 'The transmuted creatures can breathe water freely. Divide the duration evenly among all the creatures you touch.

The spell does not make creatures unable to breathe air.

A short reed or piece of straw.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('water-walk', 'Water Walk', 'Transmutación', NULL, ARRAY['Agua']::TEXT[], '1 standard action', 'Toque', 'One touched creature/Nivel', NULL, NULL, '10 min./Nivel (D)', 'Voluntad anula (harmless)', 'Sí (harmless)', 'The transmuted creatures can tread on any liquid as if it were firm ground. Mud, oil, snow, quicksand, running water, ice, and even lava can be traversed easily, since the subjects’ feet hover an inch or two above the surface. (Creatures crossing molten lava still take damage from the heat because they are near it.) The subjects can walk, run, charge, or otherwise move across the surface as if it were normal ground.

If the spell is cast underwater (or while the subjects are partially or wholly submerged in whatever liquid they are in), the subjects are borne toward the surface at 60 feet per round until they can stand on it.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('waves-of-exhaustion', 'Waves of Exhaustion', 'Nigromancia', NULL, NULL, '1 standard action', '60 ft.', NULL, 'Cone-shaped burst', NULL, 'Instantáneo', 'No', 'Sí', 'Waves of negative energy cause all living creatures in the spell’s area to become exhausted. This spell has no effect on a creature that is already exhausted.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('waves-of-fatigue', 'Waves of Fatigue', 'Nigromancia', NULL, NULL, '1 standard action', '30 ft.', NULL, 'Cone-shaped burst', NULL, 'Instantáneo', 'No', 'Sí', 'Waves of negative energy render all living creatures in the spell’s area fatigued. This spell has no effect on a creature that is already fatigued.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('web', 'Web', 'Conjuración', 'Creación', NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Webs in a 20-ft.-radius spread', '10 min./Nivel (D)', 'Reflejos anula; see text', 'No', 'Web creates a many-layered mass of strong, sticky strands. These strands trap those caught in them. The strands are similar to spider webs but far larger and tougher. These masses must be anchored to two or more solid and diametrically opposed points or else the web collapses upon itself and disappears. Creatures caught within a web become entangled among the gluey fibers. Attacking a creature in a web won’t cause you to become entangled.

Anyone in the effect’s area when the spell is cast must make a Reflex save. If this save succeeds, the creature is entangled, but not prevented from moving, though moving is more difficult than normal for being entangled (see below). If the save fails, the creature is entangled and can’t move from its space, but can break loose by spending 1 round and making a DC 20 Strength check or a DC 25 Escape Artist check. Once loose (either by making the initial Reflex save or a later Strength check or Escape Artist check), a creature remains entangled, but may move through the web very slowly. Each round devoted to moving allows the creature to make a new Strength check or Escape Artist check. The creature moves 5 feet for each full 5 points by which the check result exceeds 10.

If you have at least 5 feet of web between you and an opponent, it provides cover. If you have at least 20 feet of web between you, it provides total cover.

The strands of a web spell are flammable. A magic flaming sword can slash them away as easily as a hand brushes away cobwebs. Any fire can set the webs alight and burn away 5 square feet in 1 round. All creatures within flaming webs take 2d4 points of fire damage from the flames.

Web can be made permanent with a permanency spell. A permanent web that is damaged (but not destroyed) regrows in 10 minutes.

A bit of spider web.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('weird', 'Weird', 'Ilusión', 'Fantasma', ARRAY['Miedo, Afecta la Mente']::TEXT[], NULL, NULL, 'Any number of creatures, No two of which can be more than 30 ft. apart', NULL, NULL, NULL, NULL, 'No', 'This spell functions like phantasmal killer, except it can affect more than one creature. Only the affected creatures see the phantasmal creatures attacking them, though you see the attackers as shadowy shapes.

If a subject’s Fortitude save succeeds, it still takes 3d6 points of damage and is stunned for 1 round. The subject also takes 1d4 points of temporary Strength damage.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('whirlwind', 'Whirlwind', 'Evocación', NULL, ARRAY['Aire']::TEXT[], '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, NULL, 'Cyclone 10 ft. wide at base, 30 ft. wide at top, and 30 ft. tall', '1 round/Nivel (D)', 'Reflejos anula; see text', 'Sí', 'This spell creates a powerful cyclone of raging wind that moves through the air, along the ground, or over water at a speed of 60 feet per round. You can concentrate on controlling the cyclone’s every movement or specify a simple program. Directing the cyclone’s movement or changing its programmed movement is a standard action for you. The cyclone always moves during your turn. If the cyclone exceeds the spell’s range, it moves in a random, uncontrolled fashion for 1d3 rounds and then dissipates. (You can’t regain control of the cyclone, even if comes back within range.)

Any Large or smaller creature that comes in contact with the spell effect must succeed on a Reflex save or take 3d6 points of damage. A Medium or smaller creature that fails its first save must succeed on a second one or be picked up bodily by the cyclone and held suspended in its powerful winds, taking 1d8 points of damage each round on your turn with no save allowed. You may direct the cyclone to eject any carried creatures whenever you wish, depositing the hapless souls wherever the cyclone happens to be when they are released.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('whispering-wind', 'Whispering Wind', 'Transmutación', NULL, ARRAY['Aire']::TEXT[], '1 standard action', '1 mile/Nivel', NULL, '10-ft.-radius spread', NULL, 'No more than 1 hour/Nivel or until discharged (destination is reached)', 'Ninguna', 'No', 'You send a message or sound on the wind to a designated spot. The whispering wind travels to a specific location within range that is familiar to you, provided that it can find a way to the location. A whispering wind is as gentle and unnoticed as a zephyr until it reaches the location. It then delivers its whisper-quiet message or other sound. Note that the message is delivered regardless of whether anyone is present to hear it. The wind then dissipates.

You can prepare the spell to bear a message of no more than twenty-five words, cause the spell to deliver other sounds for 1 round, or merely have the whispering wind seem to be a faint stirring of the air. You can likewise cause the whispering wind to move as slowly as 1 mile per hour or as quickly as 1 mile per 10 minutes.

When the spell reaches its objective, it swirls and remains in place until the message is delivered. As with magic mouth, whispering wind cannot speak verbal components, use command words, or activate magical effects.', NULL, NULL, NULL, true, true, false, false, false, false)
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

-- Verificación de la parte 6
SELECT 'Parte 6/7 insertada' AS status, COUNT(*) AS count FROM public.spells;
