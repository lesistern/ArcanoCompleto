-- ============================================================================
-- CONJUROS DEL PLAYER'S HANDBOOK - PARTE 2/7
-- Conjuros 101-200 de 605 totales
-- Datos extraídos de d20srd.org
-- ============================================================================

-- Insertar conjuros (parte 2)
INSERT INTO public.spells (
  slug, name, school, subschool, descriptors,
  casting_time, range_info, target, area, effect, duration,
  saving_throw, spell_resistance, description,
  material_components, focus, xp_cost,
  component_verbal, component_somatic, component_material,
  component_focus, component_divine_focus, component_xp
)
VALUES
  ('crushing-despair', 'Crushing Despair', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', '30 ft.', NULL, 'Cone-shaped burst', NULL, '1 min./Nivel', 'Voluntad anula', 'Sí', 'An invisible cone of despair causes great sadness in the subjects. Each affected creature takes a -2 penalty on attack rolls, saving throws, ability checks, skill checks, and weapon damage rolls.

Crushing despair counters and dispels good hope.

A vial of tears.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('crushing-hand', 'Crushing Hand', 'Evocación', NULL, ARRAY['Fuerza']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like interposing hand, except that the hand can interpose itself, push, or crush one opponent that you select.

The crushing hand can grapple an opponent like grasping hand does. Its grapple bonus equals your caster level + your Intelligence, Wisdom, or Charisma modifier (for a wizard, cleric, or sorcerer, respectively), +12 for the hand’s Strength score (35), +4 for being Large. The hand deals 2d6+12 points of damage (lethal, not nonlethal) on each successful grapple check against an opponent.

The crushing hand can also interpose itself as interposing hand does, or it can bull rush an opponent as forceful hand does, but at a +18 bonus.

Directing the spell to a new target is a move action.

Clerics who cast this spell name it for their deities.

The shell of an egg.

A glove of snakeskin.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('cure-critical-wounds', 'Cure Critical Wounds', 'Conjuración', 'Curación', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like cure light wounds, except that it cures 4d8 points of damage +1 point per caster level (maximum +20).', NULL, NULL, NULL, false, false, false, false, false, false),
  ('cure-critical-wounds-mass', 'Cure Critical Wounds, Mass', 'Conjuración', 'Curación', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like mass cure light wounds, except that it cures 4d8 points of damage +1 point per caster level (maximum +40).', NULL, NULL, NULL, false, false, false, false, false, false),
  ('cure-light-wounds', 'Cure Light Wounds', 'Conjuración', 'Curación', NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, 'Instantáneo', 'Voluntad mitad (harmless); see text', 'Sí (harmless); see text', 'When laying your hand upon a living creature, you channel positive energy that cures 1d8 points of damage +1 point per caster level (maximum +5).

Since undead are powered by negative energy, this spell deals damage to them instead of curing their wounds. An undead creature can apply spell resistance, and can attempt a Will save to take half damage.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('cure-light-wounds-mass', 'Cure Light Wounds, Mass', 'Conjuración', 'Curación', NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature/Nivel, No two of which can be more than 30 ft. apart', NULL, NULL, 'Instantáneo', 'Voluntad mitad (harmless) or Voluntad mitad; see text', 'Sí (harmless) or Sí; see text', 'You channel positive energy to cure 1d8 points of damage +1 point per caster level (maximum +25) in each selected creature.

Like other cure spells, mass cure light wounds deals damage to undead in its area rather than curing them. Each affected undead may attempt a Will save for half damage.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('cure-minor-wounds', 'Cure Minor Wounds', 'Conjuración', 'Curación', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like cure light wounds, except that it cures only 1 point of damage.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('cure-moderate-wounds', 'Cure Moderate Wounds', 'Conjuración', 'Curación', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like cure light wounds, except that it cures 2d8 points of damage +1 point per caster level (maximum +10).', NULL, NULL, NULL, false, false, false, false, false, false),
  ('cure-moderate-wounds-mass', 'Cure Moderate Wounds, Mass', 'Conjuración', 'Curación', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like mass cure light wounds, except that it cures 2d8 points of damage +1 point per caster level (maximum +30).', NULL, NULL, NULL, false, false, false, false, false, false),
  ('cure-serious-wounds', 'Cure Serious Wounds', 'Conjuración', 'Curación', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like cure light wounds, except that it cures 3d8 points of damage +1 point per caster level (maximum +15).', NULL, NULL, NULL, false, false, false, false, false, false),
  ('cure-serious-wounds-mass', 'Cure Serious Wounds, Mass', 'Conjuración', 'Curación', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like mass cure light wounds, except that it cures 3d8 points of damage +1 point per caster level (maximum +35).', NULL, NULL, NULL, false, false, false, false, false, false),
  ('curse-water', 'Curse Water', 'Nigromancia', NULL, ARRAY['Maligno']::TEXT[], '1 minute', 'Toque', 'Flask of Agua touched', NULL, NULL, 'Instantáneo', 'Voluntad anula (object)', 'Sí (object)', 'This spell imbues a flask (1 pint) of water with negative energy, turning it into unholy water. Unholy water damages good outsiders the way holy water damages undead and evil outsiders.

5 pounds of powdered silver (worth 25 gp).', NULL, NULL, NULL, true, true, true, false, false, false),
  ('dancing-lights', 'Dancing Lights', 'Evocación', NULL, ARRAY['Luz']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Up to four lights, all within a 10-ft.-radius Área', '1 minute (D)', 'Ninguna', 'No', 'Depending on the version selected, you create up to four lights that resemble lanterns or torches (and cast that amount of light), or up to four glowing spheres of light (which look like will-o’-wisps), or one faintly glowing, vaguely humanoid shape. The dancing lights must stay within a 10-foot-radius area in relation to each other but otherwise move as you desire (no concentration required): forward or back, up or down, straight or turning corners, or the like. The lights can move up to 100 feet per round. A light winks out if the distance between you and it exceeds the spell’s range.

Dancing lights can be made permanent with a permanency spell.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('darkness', 'Darkness', 'Evocación', NULL, ARRAY['Oscuridad']::TEXT[], '1 standard action', 'Toque', 'Object touched', NULL, NULL, '10 min./Nivel (D)', 'Ninguna', 'No', 'This spell causes an object to radiate shadowy illumination out to a 20-foot radius. All creatures in the area gain concealment (20% miss chance). Even creatures that can normally see in such conditions (such as with darkvision or low-light vision) have the miss chance in an area shrouded in magical darkness.

Normal lights (torches, candles, lanterns, and so forth) are incapable of brightening the area, as are light spells of lower level. Higher level light spells are not affected by darkness.

If darkness is cast on a small object that is then placed inside or under a lightproof covering, the spell’s effect is blocked until the covering is removed.

Darkness counters or dispels any light spell of equal or lower spell level.

A bit of bat fur and either a drop of pitch or a piece of coal.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('darkvision', 'Darkvision', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 hour/Nivel', 'Voluntad anula (harmless)', 'Sí (harmless)', 'The subject gains the ability to see 60 feet even in total darkness. Darkvision is black and white only but otherwise like normal sight. Darkvision does not grant one the ability to see in magical darkness.

Darkvision can be made permanent with a permanency spell.

Either a pinch of dried carrot or an agate.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('daylight', 'Daylight', 'Evocación', NULL, ARRAY['Luz']::TEXT[], '1 standard action', 'Toque', 'Object touched', NULL, NULL, '10 min./Nivel (D)', 'Ninguna', 'No', 'The object touched sheds light as bright as full daylight in a 60-foot radius, and dim light for an additional 60 feet beyond that. Creatures that take penalties in bright light also take them while within the radius of this magical light. Despite its name, this spell is not the equivalent of daylight for the purposes of creatures that are damaged or destroyed by bright light.

If daylight is cast on a small object that is then placed inside or under a light-proof covering, the spell’s effects are blocked until the covering is removed.

Daylight brought into an area of magical darkness (or vice versa) is temporarily negated, so that the otherwise prevailing light conditions exist in the overlapping areas of effect.

Daylight counters or dispels any darkness spell of equal or lower level, such as darkness.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('daze', 'Daze', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One humanoid creature of 4 HD or less', NULL, NULL, '1 round', 'Voluntad anula', 'Sí', 'This enchantment clouds the mind of a humanoid creature with 4 or fewer Hit Dice so that it takes no actions. Humanoids of 5 or more HD are not affected. A dazed subject is not stunned, so attackers get no special advantage against it.

A pinch of wool or similar substance.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('daze-monster', 'Daze Monster', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], NULL, 'Medio (100 ft. + 10 ft./Nivel)', 'One living creature of 6 HD or less', NULL, NULL, NULL, NULL, 'No', 'This spell functions like daze, but daze monster can affect any one living creature of any type. Creatures of 7 or more HD are not affected.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('death-knell', 'Death Knell', 'Nigromancia', NULL, ARRAY['Muerte, Maligno']::TEXT[], '1 standard action', 'Toque', 'Living creature touched', NULL, NULL, 'Instantáneo/10 minutes per HD of subject; see text', 'Voluntad anula', 'Sí', 'You draw forth the ebbing life force of a creature and use it to fuel your own power. Upon casting this spell, you touch a living creature that has -1 or fewer hit points. If the subject fails its saving throw, it dies, and you gain 1d8 temporary hit points and a +2 bonus to Strength. Additionally, your effective caster level goes up by +1, improving spell effects dependent on caster level. (This increase in effective caster level does not grant you access to more spells.) These effects last for 10 minutes per HD of the subject creature.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('death-ward', 'Death Ward', 'Nigromancia', NULL, NULL, '1 standard action', 'Toque', 'Living creature touched', NULL, NULL, '1 min./Nivel', 'Voluntad anula (harmless)', 'Sí (harmless)', 'The subject is immune to all death spells, magical death effects, energy drain, and any negative energy effects.

This spell doesn’t remove negative levels that the subject has already gained, nor does it affect the saving throw necessary 24 hours after gaining a negative level.

Death ward does not protect against other sorts of attacks even if those attacks might be lethal.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('deathwatch', 'Deathwatch', 'Nigromancia', NULL, ARRAY['Maligno']::TEXT[], '1 standard action', '30 ft.', NULL, 'Cone-shaped emanation', NULL, '10 min./Nivel', 'Ninguna', 'No', 'Using the foul sight granted by the powers of unlife, you can determine the condition of creatures near death within the spell’s range. You instantly know whether each creature within the area is dead, fragile (alive and wounded, with 3 or fewer hit points left), fighting off death (alive with 4 or more hit points), undead, or neither alive nor dead (such as a construct).

Deathwatch sees through any spell or ability that allows creatures to feign death.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('deeper-darkness', 'Deeper Darkness', 'Evocación', NULL, ARRAY['Oscuridad']::TEXT[], NULL, NULL, NULL, NULL, NULL, 'One day/Nivel (D)', NULL, 'No', 'This spell functions like darkness, except that the object radiates shadowy illumination in a 60-foot radius and the darkness lasts longer.

Daylight brought into an area of deeper darkness (or vice versa) is temporarily negated, so that the otherwise prevailing light conditions exist in the overlapping areas of effect.

Deeper darkness counters and dispels any light spell of equal or lower level, including daylight and light.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('deep-slumber', 'Deep Slumber', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], NULL, 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like sleep, except that it affects 10 HD of creatures.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('delayed-blast-fireball', 'Delayed Blast Fireball', 'Evocación', NULL, ARRAY['Fuego']::TEXT[], NULL, NULL, NULL, NULL, NULL, '5 rounds or less; see text', NULL, 'No', 'This spell functions like fireball, except that it is more powerful and can detonate up to 5 rounds after the spell is cast. The burst of flame deals 1d6 points of fire damage per caster level (maximum 20d6).

The glowing bead created by delayed blast fireball can detonate immediately if you desire, or you can choose to delay the burst for as many as 5 rounds. You select the amount of delay upon completing the spell, and that time cannot change once it has been set unless someone touches the bead (see below). If you choose a delay, the glowing bead sits at its destination until it detonates. A creature can pick up and hurl the bead as a thrown weapon (range increment 10 feet). If a creature handles and moves the bead within 1 round of its detonation, there is a 25% chance that the bead detonates while being handled.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('delay-poison', 'Delay Poison', 'Conjuración', 'Curación', NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 hour/Nivel', 'Fortaleza anula (harmless)', 'Sí (harmless)', 'The subject becomes temporarily immune to poison. Any poison in its system or any poison to which it is exposed during the spell’s duration does not affect the subject until the spell’s duration has expired. Delay poison does not cure any damage that poison may have already done.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('demand', 'Demand', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, 'Voluntad parcial', 'Sí', 'This spell functions like sending, but the message can also contain a suggestion (see the suggestion spell), which the subject does its best to carry out. A successful Will save negates the suggestion effect but not the contact itself. The demand, if received, is understood even if the subject’s Intelligence score is as low as 1. If the message is impossible or meaningless according to the circumstances that exist for the subject at the time the demand is issued, the message is understood but the suggestion is ineffective.

The demand’s message to the creature must be twenty-five words or less, including the suggestion. The creature can also give a short reply immediately.

A short piece of copper wire and some small part of the subject—a hair, a bit of nail, or the like.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('desecrate', 'Desecrate', 'Evocación', NULL, ARRAY['Maligno']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, '20-ft.-radius emanation', NULL, '2 hours/Nivel', 'Ninguna', 'Sí', 'This spell imbues an area with negative energy. Each Charisma check made to turn undead within this area takes a -3 profane penalty, and every undead creature entering a desecrated area gains a +1 profane bonus on attack rolls, damage rolls, and saving throws. An undead creature created within or summoned into such an area gains +1 hit points per HD.

If the desecrated area contains an altar, shrine, or other permanent fixture dedicated to your deity or aligned higher power, the modifiers given above are doubled (-6 profane penalty on turning checks, +2 profane bonus and +2 hit points per HD for undead in the area).

Furthermore, anyone who casts animate dead within this area may create as many as double the normal amount of undead (that is, 4 HD per caster level rather than 2 HD per caster level).

If the area contains an altar, shrine, or other permanent fixture of a deity, pantheon, or higher power other than your patron, the desecrate spell instead curses the area, cutting off its connection with the associated deity or power. This secondary function, if used, does not also grant the bonuses and penalties relating to undead, as given above.

Desecrate counters and dispels consecrate.

A vial of unholy water and 25 gp worth (5 pounds) of silver dust, all of which must be sprinkled around the area.', NULL, NULL, NULL, true, true, true, false, true, false),
  ('destruction', 'Destruction', 'Nigromancia', NULL, ARRAY['Muerte']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature', NULL, NULL, 'Instantáneo', 'Fortaleza parcial', 'Sí', 'This spell instantly slays the subject and consumes its remains (but not its equipment and possessions) utterly. If the target’s Fortitude saving throw succeeds, it instead takes 10d6 points of damage. The only way to restore life to a character who has failed to save against this spell is to use true resurrection, a carefully worded wish spell followed by resurrection, or miracle.

A special holy (or unholy) symbol of silver marked with verses of anathema (cost 500 gp).', NULL, NULL, NULL, true, true, false, true, false, false),
  ('detect-animals-or-plants', 'Detect Animals or Plants', 'Adivinación', NULL, NULL, '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, 'Cone-shaped emanation', NULL, 'Concentración, up to 10 min./Nivel (D)', 'Ninguna', 'No', 'Presence or absence of that kind of animal or plant in the area.

Number of individuals of the specified kind in the area, and the condition of the healthiest specimen.

The condition (see below) and location of each individual present. If an animal or plant is outside your line of sight, then you discern its direction but not its exact location.

For purposes of this spell, the categories of condition are as follows:

Has at least 90% of full normal hit points, free of disease.

30% to 90% of full normal hit points remaining.

Less than 30% of full normal hit points remaining, afflicted with a disease, or suffering from a debilitating injury.

0 or fewer hit points remaining, afflicted with a disease in the terminal stage, or crippled.

If a creature falls into more than one category, the spell indicates the weaker of the two.

Each round you can turn to detect a kind of animal or plant in a new area. The spell can penetrate barriers, but 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt blocks it.', NULL, 'You can detect a particular kind of animal or plant in a cone emanating out from you in whatever direction you face. You must think of a kind of animal or plant when using the spell, but you can change the animal or plant kind each round. The amount of information revealed depends on how long you search a particular area or on a specific kind of animal or plant.', NULL, true, true, false, false, false, false),
  ('detect-chaos', 'Detect Chaos', 'Adivinación', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like detect evil, except that it detects the auras of chaotic creatures, clerics of chaotic deities, chaotic spells, and chaotic magic items, and you are vulnerable to an overwhelming chaotic aura if you are lawful.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('detect-evil', 'Detect Evil', 'Adivinación', NULL, NULL, '1 standard action', '60 ft.', NULL, 'Cone-shaped emanation', NULL, 'Concentración, up to 10 min./ Nivel (D)', 'Ninguna', 'No', 'You can sense the presence of evil. The amount of information revealed depends on how long you study a particular area or subject.

Presence or absence of evil.

Number of evil auras (creatures, objects, or spells) in the area and the power of the most potent evil aura present.

If you are of good alignment, and the strongest evil aura’s power is overwhelming (see below), and the HD or level of the aura’s source is at least twice your character level, you are stunned for 1 round and the spell ends.

The power and location of each aura. If an aura is outside your line of sight, then you discern its direction but not its exact location.

An evil aura’s power depends on the type of evil creature or object that you’re detecting and its HD, caster level, or (in the case of a cleric) class level; see the accompanying table. If an aura falls into more than one strength category, the spell indicates the stronger of the two.

An evil aura lingers after its original source dissipates (in the case of a spell) or is destroyed (in the case of a creature or magic item). If detect evil is cast and directed at such a location, the spell indicates an aura strength of dim (even weaker than a faint aura). How long the aura lingers at this dim level depends on its original power:

Animals, traps, poisons, and other potential perils are not evil, and as such this spell does not detect them.

Each round, you can turn to detect evil in a new area. The spell can penetrate barriers, but 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt blocks it.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('detect-good', 'Detect Good', 'Adivinación', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like detect evil, except that it detects the auras of good creatures, clerics or paladins of good deities, good spells, and good magic items, and you are vulnerable to an overwhelming good aura if you are evil. Healing potions, antidotes, and similar beneficial items are not good.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('detect-law', 'Detect Law', 'Adivinación', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like detect evil, except that it detects the auras of lawful creatures, clerics of lawful deities, lawful spells, and lawful magic items, and you are vulnerable to an overwhelming lawful aura if you are chaotic.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('detect-magic', 'Detect Magic', 'Adivinación', NULL, NULL, '1 standard action', '60 ft.', NULL, 'Cone-shaped emanation', NULL, 'Concentración, up to 1 min./Nivel (D)', 'Ninguna', 'No', 'You detect magical auras. The amount of information revealed depends on how long you study a particular area or subject.

Presence or absence of magical auras.

Number of different magical auras and the power of the most potent aura.

The strength and location of each aura. If the items or creatures bearing the auras are in line of sight, you can make Spellcraft skill checks to determine the school of magic involved in each. (Make one check per aura; DC 15 + spell level, or 15 + half caster level for a nonspell effect.)

Magical areas, multiple types of magic, or strong local magical emanations may distort or conceal weaker auras.

An aura’s power depends on a spell’s functioning spell level or an item’s caster level. If an aura falls into more than one category, detect magic indicates the stronger of the two.

A magical aura lingers after its original source dissipates (in the case of a spell) or is destroyed (in the case of a magic item). If detect magic is cast and directed at such a location, the spell indicates an aura strength of dim (even weaker than a faint aura). How long the aura lingers at this dim level depends on its original power:

Outsiders and elementals are not magical in themselves, but if they are summoned, the conjuration spell registers.

Each round, you can turn to detect magic in a new area. The spell can penetrate barriers, but 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt blocks it.

Detect magic can be made permanent with a permanency spell.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('detect-poison', 'Detect Poison', 'Adivinación', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, NULL, 'Instantáneo', 'Ninguna', 'No', 'You determine whether a creature, object, or area has been poisoned or is poisonous. You can determine the exact type of poison with a DC 20 Wisdom check. A character with the Craft (alchemy) skill may try a DC 20 Craft (alchemy) check if the Wisdom check fails, or may try the Craft (alchemy) check prior to the Wisdom check.

The spell can penetrate barriers, but 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt blocks it.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('detect-scrying', 'Detect Scrying', 'Adivinación', NULL, NULL, '1 standard action', '40 ft.', NULL, '40-ft.-radius emanation centered on you', NULL, '24 hours', 'Ninguna', 'No', 'You immediately become aware of any attempt to observe you by means of a divination (scrying) spell or effect. The spell’s area radiates from you and moves as you move. You know the location of every magical sensor within the spell’s area.

If the scrying attempt originates within the area, you also know its location; otherwise, you and the scrier immediately make opposed caster level checks (1d20 + caster level). If you at least match the scrier’s result, you get a visual image of the scrier and an accurate sense of his or her direction and distance from you.

A small piece of mirror and a miniature brass hearing trumpet.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('detect-secret-doors', 'Detect Secret Doors', 'Adivinación', NULL, NULL, '1 standard action', '60 ft.', NULL, 'Cone-shaped emanation', NULL, 'Concentración, up to 1 min./Nivel (D)', 'Ninguna', 'No', 'You can detect secret doors, compartments, caches, and so forth. Only passages, doors, or openings that have been specifically constructed to escape detection are detected by this spell. The amount of information revealed depends on how long you study a particular area or subject.

Presence or absence of secret doors.

Number of secret doors and the location of each. If an aura is outside your line of sight, then you discern its direction but not its exact location.

The mechanism or trigger for one particular secret portal closely examined by you. Each round, you can turn to detect secret doors in a new area. The spell can penetrate barriers, but 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt blocks it.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('detect-snares-and-pits', 'Detect Snares and Pits', 'Adivinación', NULL, NULL, '1 standard action', '60 ft.', NULL, 'Cone-shaped emanation', NULL, 'Concentración, up to 10 min./Nivel (D)', 'Ninguna', 'No', 'You can detect simple pits, deadfalls, and snares as well as mechanical traps constructed of natural materials. The spell does not detect complex traps, including trapdoor traps.

Detect snares and pits does detect certain natural hazards—quicksand (a snare), a sinkhole (a pit), or unsafe walls of natural rock (a deadfall). However, it does not reveal other potentially dangerous conditions. The spell does not detect magic traps (except those that operate by pit, deadfall, or snaring; see the spell snare), nor mechanically complex ones, nor those that have been rendered safe or inactive.

The amount of information revealed depends on how long you study a particular area.

Presence or absence of hazards.

Number of hazards and the location of each. If a hazard is outside your line of sight, then you discern its direction but not its exact location.

The general type and trigger for one particular hazard closely examined by you.

Each round, you can turn to detect snares and pits in a new area. The spell can penetrate barriers, but 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt blocks it.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('detect-thoughts', 'Detect Thoughts', 'Adivinación', NULL, ARRAY['Afecta la Mente']::TEXT[], '1 standard action', '60 ft.', NULL, 'Cone-shaped emanation', NULL, 'Concentración, up to 1 min./Nivel (D)', 'Voluntad anula; see text', 'No', 'You detect surface thoughts. The amount of information revealed depends on how long you study a particular area or subject.

Presence or absence of thoughts (from conscious creatures with Intelligence scores of 1 or higher).

Number of thinking minds and the Intelligence score of each. If the highest Intelligence is 26 or higher (and at least 10 points higher than your own Intelligence score), you are stunned for 1 round and the spell ends. This spell does not let you determine the location of the thinking minds if you can’t see the creatures whose thoughts you are detecting.

Surface thoughts of any mind in the area. A target’s Will save prevents you from reading its thoughts, and you must cast detect thoughts again to have another chance. Creatures of animal intelligence (Int 1 or 2) have simple, instinctual thoughts that you can pick up.

Each round, you can turn to detect thoughts in a new area. The spell can penetrate barriers, but 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt blocks it.

A copper piece.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('detect-undead', 'Detect Undead', 'Adivinación', NULL, NULL, '1 standard action', '60 ft.', NULL, 'Cone-shaped emanation', NULL, 'Concentración, up to 1 minute/ Nivel (D)', 'Ninguna', 'No', 'You can detect the aura that surrounds undead creatures. The amount of information revealed depends on how long you study a particular area.

Presence or absence of undead auras.

Number of undead auras in the area and the strength of the strongest undead aura present. If you are of good alignment, and the strongest undead aura’s strength is overwhelming (see below), and the creature has HD of at least twice your character level, you are stunned for 1 round and the spell ends.

The strength and location of each undead aura. If an aura is outside your line of sight, then you discern its direction but not its exact location.

The strength of an undead aura is determined by the HD of the undead creature, as given on the following table:

An undead aura lingers after its original source is destroyed. If detect undead is cast and directed at such a location, the spell indicates an aura strength of dim (even weaker than a faint aura). How long the aura lingers at this dim level depends on its original power:

Each round, you can turn to detect undead in a new area. The spell can penetrate barriers, but 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt blocks it.

A bit of earth from a grave.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('dictum', 'Dictum', 'Evocación', NULL, ARRAY['Legal, Sónico']::TEXT[], '1 standard action', '40 ft.', NULL, 'Nonlawful creatures in a 40-ft.-radius spread centered on you', NULL, 'Instantáneo', 'Ninguna or Voluntad anula; see text', 'Sí', 'Any nonlawful creature within the area of a dictum spell suffers the following ill effects.

The effects are cumulative and concurrent. No saving throw is allowed against these effects.

The creature is deafened for 1d4 rounds.

The creature is slowed, as by the slow spell, for 2d4 rounds.

The creature is paralyzed and helpless for 1d10 minutes.

Living creatures die. Undead creatures are destroyed.

Furthermore, if you are on your home plane when you cast this spell, nonlawful extraplanar creatures within the area are instantly banished back to their home planes. Creatures so banished cannot return for at least 24 hours. This effect takes place regardless of whether the creatures hear the dictum. The banishment effect allows a Will save (at a -4 penalty) to negate.

Creatures whose HD exceed your caster level are unaffected by dictum.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('dimensional-anchor', 'Dimensional Anchor', 'Abjuración', NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Ray', '1 min./Nivel', 'Ninguna', 'Sí (object)', 'A green ray springs from your outstretched hand. You must make a ranged touch attack to hit the target. Any creature or object struck by the ray is covered with a shimmering emerald field that completely blocks extradimensional travel. Forms of movement barred by a dimensional anchor include astral projection, blink, dimension door, ethereal jaunt, etherealness, gate, maze, plane shift, shadow walk, teleport, and similar spell-like or psionic abilities. The spell also prevents the use of a gate or teleportation circle for the duration of the spell.

A dimensional anchor does not interfere with the movement of creatures already in ethereal or astral form when the spell is cast, nor does it block extradimensional perception or attack forms. Also, dimensional anchor does not prevent summoned creatures from disappearing at the end of a summoning spell.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('dimensional-lock', 'Dimensional Lock', 'Abjuración', NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, '20-ft.-radius emanation centered on a point in space', NULL, 'One day/Nivel', 'Ninguna', 'Sí', 'You create a shimmering emerald barrier that completely blocks extradimensional travel. Forms of movement barred include astral projection, blink, dimension door, ethereal jaunt, etherealness, gate, maze, plane shift, shadow walk, teleport, and similar spell-like or psionic abilities. Once dimensional lock is in place, extradimensional travel into or out of the area is not possible.

A dimensional lock does not interfere with the movement of creatures already in ethereal or astral form when the spell is cast, nor does it block extradimensional perception or attack forms. Also, the spell does not prevent summoned creatures from disappearing at the end of a summoning spell.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('dimension-door', 'Dimension Door', 'Conjuración', 'Teletransportación', NULL, '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', 'You and touched objects or other touched willing creatures', NULL, NULL, 'Instantáneo', 'Ninguna and Voluntad anula (object)', 'No and Sí (object)', 'You instantly transfer yourself from your current location to any other spot within range. You always arrive at exactly the spot desired—whether by simply visualizing the area or by stating direction. After using this spell, you can’t take any other actions until your next turn. You can bring along objects as long as their weight doesn’t exceed your maximum load. You may also bring one additional willing Medium or smaller creature (carrying gear or objects up to its maximum load) or its equivalent per three caster levels. A Large creature counts as two Medium creatures, a Huge creature counts as two Large creatures, and so forth. All creatures to be transported must be in contact with one another, and at least one of those creatures must be in contact with you.

If you arrive in a place that is already occupied by a solid body, you and each creature traveling with you take 1d6 points of damage and are shunted to a random open space on a suitable surface within 100 feet of the intended location.

If there is no free space within 100 feet, you and each creature traveling with you take an additional 2d6 points of damage and are shunted to a free space within 1,000 feet. If there is no free space within 1,000 feet, you and each creature travelling with you take an additional 4d6 points of damage and the spell simply fails.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('diminish-plants', 'Diminish Plants', 'Transmutación', NULL, NULL, '1 standard action', 'See text', NULL, NULL, NULL, 'Instantáneo', 'Ninguna', 'No', 'This spell has two versions.

This version causes normal vegetation within long range (400 feet + 40 feet per level) to shrink to about one-third of their normal size, becoming untangled and less bushy. The affected vegetation appears to have been carefully pruned and trimmed.

At your option, the area can be a 100-foot-radius circle, a 150-foot-radius semicircle, or a 200-foot-radius quarter-circle.

You may also designate portions of the area that are not affected.

This version targets normal plants within a range of ½ mile, reducing their potential productivity over the course of the following year to one third below normal.

Diminish plants counters plant growth.

This spell has no effect on plant creatures.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('discern-lies', 'Discern Lies', 'Adivinación', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature/Nivel, No two of which can be more than 30 ft. apart', NULL, NULL, 'Concentración, up to 1 round/Nivel', 'Voluntad anula', 'No', 'Each round, you concentrate on one subject, who must be within range. You know if the subject deliberately and knowingly speaks a lie by discerning disturbances in its aura caused by lying. The spell does not reveal the truth, uncover unintentional inaccuracies, or necessarily reveal evasions.

Each round, you may concentrate on a different subject.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('discern-location', 'Discern Location', 'Adivinación', NULL, NULL, '10 minutes', 'Ilimitado', 'One creature or object', NULL, NULL, 'Instantáneo', 'Ninguna', 'No', 'A discern location spell is among the most powerful means of locating creatures or objects. Nothing short of a mind blank spell or the direct intervention of a deity keeps you from learning the exact location of a single individual or object. Discern location circumvents normal means of protection from scrying or location. The spell reveals the name of the creature or object’s location (place, name, business name, building name, or the like), community, county (or similar political division), country, continent, and the plane of existence where the target lies.

To find a creature with the spell, you must have seen the creature or have some item that once belonged to it. To find an object, you must have touched it at least once.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('disguise-self', 'Disguise Self', 'Ilusión', 'Glamour', NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '10 min./Nivel (D)', NULL, 'No', 'You make yourself—including clothing, armor, weapons, and equipment—look different. You can seem 1 foot shorter or taller, thin, fat, or in between. You cannot change your body type. Otherwise, the extent of the apparent change is up to you. You could add or obscure a minor feature or look like an entirely different person.

The spell does not provide the abilities or mannerisms of the chosen form, nor does it alter the perceived tactile (touch) or audible (sound) properties of you or your equipment.

If you use this spell to create a disguise, you get a +10 bonus on the Disguise check.

A creature that interacts with the glamer gets a Will save to recognize it as an illusion.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('disintegrate', 'Disintegrate', 'Transmutación', NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Ray', 'Instantáneo', 'Fortaleza parcial (object)', 'Sí', 'A thin, green ray springs from your pointing finger. You must make a successful ranged touch attack to hit. Any creature struck by the ray takes 2d6 points of damage per caster level (to a maximum of 40d6). Any creature reduced to 0 or fewer hit points by this spell is entirely disintegrated, leaving behind only a trace of fine dust. A disintegrated creature’s equipment is unaffected.

When used against an object, the ray simply disintegrates as much as one 10-foot cube of nonliving matter. Thus, the spell disintegrates only part of any very large object or structure targeted. The ray affects even objects constructed entirely of force, such as forceful hand or a wall of force, but not magical effects such as a globe of invulnerability or an antimagic field.

A creature or object that makes a successful Fortitude save is partially affected, taking only 5d6 points of damage. If this damage reduces the creature or object to 0 or fewer hit points, it is entirely disintegrated.

Only the first creature or object struck can be affected; that is, the ray affects only one target per casting.

A lodestone and a pinch of dust.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('dismissal', 'Dismissal', 'Abjuración', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One extraplanar creature', NULL, NULL, 'Instantáneo', 'Voluntad anula; see text', 'Sí', 'This spell forces an extraplanar creature back to its proper plane if it fails a special Will save (DC = spell’s save DC - creature’s HD + your caster level). If the spell is successful, the creature is instantly whisked away, but there is a 20% chance of actually sending the subject to a plane other than its own.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('dispel-chaos', 'Dispel Chaos', 'Abjuración', NULL, ARRAY['Legal']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like dispel evil, except that you are surrounded by constant, blue, lawful energy, and the spell affects chaotic creatures and spells rather than evil ones.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('dispel-evil', 'Dispel Evil', 'Abjuración', NULL, ARRAY['Bondadoso']::TEXT[], '1 standard action', 'Toque', NULL, NULL, NULL, '1 round/Nivel or until discharged, whichever comes first', 'See text', 'See text', 'Shimmering, white, holy energy surrounds you. This power has three effects.

First, you gain a +4 deflection bonus to AC against attacks by evil creatures.

Second, on making a successful melee touch attack against an evil creature from another plane, you can choose to drive that creature back to its home plane. The creature can negate the effects with a successful Will save (spell resistance applies). This use discharges and ends the spell.

Third, with a touch you can automatically dispel any one enchantment spell cast by an evil creature or any one evil spell. Exception: Spells that can’t be dispelled by dispel magic also can’t be dispelled by dispel evil. Saving throws and spell resistance do not apply to this effect. This use discharges and ends the spell.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('dispel-good', 'Dispel Good', 'Abjuración', NULL, ARRAY['Maligno']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like dispel evil, except that you are surrounded by dark, wavering, unholy energy, and the spell affects good creatures and spells rather than evil ones.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('dispel-law', 'Dispel Law', 'Abjuración', NULL, ARRAY['Caótico']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like dispel evil, except that you are surrounded by flickering, yellow, chaotic energy, and the spell affects lawful creatures and spells rather than evil ones.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('dispel-magic', 'Dispel Magic', 'Abjuración', NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, NULL, 'Instantáneo', 'Ninguna', 'No', 'You can use dispel magic to end ongoing spells that have been cast on a creature or object, to temporarily suppress the magical abilities of a magic item, to end ongoing spells (or at least their effects) within an area, or to counter another spellcaster’s spell. A dispelled spell ends as if its duration had expired. Some spells, as detailed in their descriptions, can’t be defeated by dispel magic. Dispel magic can dispel (but not counter) spell-like effects just as it does spells.

Note: The effect of a spell with an instantaneous duration can’t be dispelled, because the magical effect is already over before the dispel magic can take effect.

You choose to use dispel magic in one of three ways: a targeted dispel, an area dispel, or a counterspell:

One object, creature, or spell is the target of the dispel magic spell. You make a dispel check (1d20 + your caster level, maximum +10) against the spell or against each ongoing spell currently in effect on the object or creature. The DC for this dispel check is 11 + the spell’s caster level. If you succeed on a particular check, that spell is dispelled; if you fail, that spell remains in effect.

If you target an object or creature that is the effect of an ongoing spell (such as a monster summoned by monster summoning), you make a dispel check to end the spell that conjured the object or creature.

If the object that you target is a magic item, you make a dispel check against the item’s caster level. If you succeed, all the item’s magical properties are suppressed for 1d4 rounds, after which the item recovers on its own. A suppressed item becomes nonmagical for the duration of the effect. An interdimensional interface (such as a bag of holding) is temporarily closed. A magic item’s physical properties are unchanged: A suppressed magic sword is still a sword (a masterwork sword, in fact). Artifacts and deities are unaffected by mortal magic such as this.

You automatically succeed on your dispel check against any spell that you cast yourself.

When dispel magic is used in this way, the spell affects everything within a 20-foot radius.

For each creature within the area that is the subject of one or more spells, you make a dispel check against the spell with the highest caster level. If that check fails, you make dispel checks against progressively weaker spells until you dispel one spell (which discharges the dispel magic spell so far as that target is concerned) or until you fail all your checks. The creature’s magic items are not affected.

For each object within the area that is the target of one or more spells, you make dispel checks as with creatures. Magic items are not affected by an area dispel.

For each ongoing area or effect spell whose point of origin is within the area of the dispel magic spell, you can make a dispel check to dispel the spell.

For each ongoing spell whose area overlaps that of the dispel magic spell, you can make a dispel check to end the effect, but only within the overlapping area.

If an object or creature that is the effect of an ongoing spell (such as a monster summoned by monster summoning) is in the area, you can make a dispel check to end the spell that conjured that object or creature (returning it whence it came) in addition to attempting to dispel spells targeting the creature or object.

You may choose to automatically succeed on dispel checks against any spell that you have cast.

When dispel magic is used in this way, the spell targets a spellcaster and is cast as a counterspell. Unlike a true counterspell, however, dispel magic may not work; you must make a dispel check to counter the other spellcaster’s spell.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('dispel-magic-greater', 'Dispel Magic, Greater', 'Abjuración', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like dispel magic, except that the maximum caster level on your dispel check is +20 instead of +10.

Additionally, greater dispel magic has a chance to dispel any effect that remove curse can remove, even if dispel magic can’t dispel that effect.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('displacement', 'Displacement', 'Ilusión', 'Glamour', NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 round/Nivel (D)', 'Voluntad anula (harmless)', 'Sí (harmless)', 'The subject of this spell appears to be about 2 feet away from its true location. The creature benefits from a 50% miss chance as if it had total concealment. However, unlike actual total concealment, displacement does not prevent enemies from targeting the creature normally. True seeing reveals its true location.

A small strip of leather twisted into a loop.', NULL, NULL, NULL, true, false, true, false, false, false),
  ('disrupting-weapon', 'Disrupting Weapon', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'One melee weapon', NULL, NULL, '1 round/Nivel', 'Voluntad anula (harmless, object); see text', 'Sí (harmless, object)', 'This spell makes a melee weapon deadly to undead. Any undead creature with HD equal to or less than your caster level must succeed on a Will save or be destroyed utterly if struck in combat with this weapon. Spell resistance does not apply against the destruction effect.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('disrupt-undead', 'Disrupt Undead', 'Nigromancia', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Ray', 'Instantáneo', 'Ninguna', 'Sí', 'You direct a ray of positive energy. You must make a ranged touch attack to hit, and if the ray hits an undead creature, it deals 1d6 points of damage to it.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('divination', 'Divination', 'Adivinación', NULL, NULL, '10 minutes', 'Personal', 'You', NULL, NULL, 'Instantáneo', NULL, 'No', 'Similar to augury but more powerful, a divination spell can provide you with a useful piece of advice in reply to a question concerning a specific goal, event, or activity that is to occur within one week. The advice can be as simple as a short phrase, or it might take the form of a cryptic rhyme or omen. If your party doesn’t act on the information, the conditions may change so that the information is no longer useful. The base chance for a correct divination is 70% + 1% per caster level, to a maximum of 90%. If the dice roll fails, you know the spell failed, unless specific magic yielding false information is at work.

As with augury, multiple divinations about the same topic by the same caster use the same dice result as the first divination spell and yield the same answer each time.

Incense and a sacrificial offering appropriate to your religion, together worth at least 25 gp.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('divine-favor', 'Divine Favor', 'Evocación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 minute', NULL, 'No', 'Calling upon the strength and wisdom of a deity, you gain a +1 luck bonus on attack and weapon damage rolls for every three caster levels you have (at least +1, maximum +3). The bonus doesn’t apply to spell damage.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('divine-power', 'Divine Power', 'Evocación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 round/Nivel', NULL, 'No', 'Calling upon the divine power of your patron, you imbue yourself with strength and skill in combat. Your base attack bonus becomes equal to your character level (which may give you additional attacks), you gain a +6 enhancement bonus to Strength, and you gain 1 temporary hit point per caster level.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('dominate-animal', 'Dominate Animal', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 round', 'Cercano (25 ft. + 5 ft./2 levels)', 'One animal', NULL, NULL, '1 round/Nivel', 'Voluntad anula', 'Sí', 'You can enchant an animal and direct it with simple commands such as “Attack,” “Run,” and “Fetch.” Suicidal or self-destructive commands (including an order to attack a creature two or more size categories larger than the dominated animal) are simply ignored.

Dominate animal establishes a mental link between you and the subject creature. The animal can be directed by silent mental command as long as it remains in range. You need not see the creature to control it. You do not receive direct sensory input from the creature, but you know what it is experiencing. Because you are directing the animal with your own intelligence, it may be able to undertake actions normally beyond its own comprehension. You need not concentrate exclusively on controlling the creature unless you are trying to direct it to do something it normally couldn’t do. Changing your instructions or giving a dominated creature a new command is the equivalent of redirecting a spell, so it is a move action.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('dominate-monster', 'Dominate Monster', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], NULL, NULL, 'One creature', NULL, NULL, NULL, NULL, 'No', 'This spell functions like dominate person, except that the spell is not restricted by creature type.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('dominate-person', 'Dominate Person', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 round', 'Cercano (25 ft. + 5 ft./2 levels)', 'One humanoid', NULL, NULL, 'One day/Nivel', 'Voluntad anula', 'Sí', 'You can control the actions of any humanoid creature through a telepathic link that you establish with the subject’s mind.

If you and the subject have a common language, you can generally force the subject to perform as you desire, within the limits of its abilities. If no common language exists, you can communicate only basic commands, such as “Come here,” “Go there,” “Fight,” and “Stand still.” You know what the subject is experiencing, but you do not receive direct sensory input from it, nor can it communicate with you telepathically.

Once you have given a dominated creature a command, it continues to attempt to carry out that command to the exclusion of all other activities except those necessary for day-to-day survival (such as sleeping, eating, and so forth). Because of this limited range of activity, a Sense Motive check against DC 15 (rather than DC 25) can determine that the subject’s behavior is being influenced by an enchantment effect (see the Sense Motive skill description).

Changing your instructions or giving a dominated creature a new command is the equivalent of redirecting a spell, so it is a move action.

By concentrating fully on the spell (a standard action), you can receive full sensory input as interpreted by the mind of the subject, though it still can’t communicate with you. You can’t actually see through the subject’s eyes, so it’s not as good as being there yourself, but you still get a good idea of what’s going on.

Subjects resist this control, and any subject forced to take actions against its nature receives a new saving throw with a +2 bonus. Obviously self-destructive orders are not carried out. Once control is established, the range at which it can be exercised is unlimited, as long as you and the subject are on the same plane. You need not see the subject to control it.

If you don’t spend at least 1 round concentrating on the spell each day, the subject receives a new saving throw to throw off the domination.

Protection from evil or a similar spell can prevent you from exercising control or using the telepathic link while the subject is so warded, but such an effect neither prevents the establishment of domination nor dispels it.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('doom', 'Doom', 'Nigromancia', NULL, ARRAY['Miedo, Afecta la Mente']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'One living creature', NULL, NULL, '1 min./Nivel', 'Voluntad anula', 'Sí', 'This spell fills a single subject with a feeling of horrible dread that causes it to become shaken.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('dream', 'Dream', 'Ilusión', 'Fantasma', ARRAY['Afecta la Mente']::TEXT[], '1 minute', 'Ilimitado', 'One living creature touched', NULL, NULL, 'See text', 'Ninguna', 'Sí', 'You, or a messenger touched by you, sends a phantasmal message to others in the form of a dream. At the beginning of the spell, you must name the recipient or identify him or her by some title that leaves no doubt as to identity. The messenger then enters a trance, appears in the intended recipient’s dream, and delivers the message. The message can be of any length, and the recipient remembers it perfectly upon waking. The communication is one-way. The recipient cannot ask questions or offer information, nor can the messenger gain any information by observing the dreams of the recipient.

Once the message is delivered, the messenger’s mind returns instantly to its body. The duration of the spell is the time required for the messenger to enter the recipient’s dream and deliver the message.

If the recipient is awake when the spell begins, the messenger can choose to wake up (ending the spell) or remain in the trance. The messenger can remain in the trance until the recipient goes to sleep, then enter the recipient’s dream and deliver the message as normal. A messenger that is disturbed during the trance comes awake, ending the spell.

Creatures who don’t sleep (such as elves, but not half-elves) or don’t dream cannot be contacted by this spell.

The messenger is unaware of its own surroundings or of the activities around it while in the trance. It is defenseless both physically and mentally (always fails any saving throw) while in the trance.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('eagle-s-splendor', 'Eagle’s Splendor', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 min./Nivel', 'Voluntad anula (harmless)', 'Sí', 'The transmuted creature becomes more poised, articulate, and personally forceful. The spell grants a +4 enhancement bonus to Charisma, adding the usual benefits to Charisma-based skill checks and other uses of the Charisma modifier. Sorcerers and bards (and other spellcasters who rely on Charisma) affected by this spell do not gain any additional bonus spells for the increased Charisma, but the save DCs for spells they cast while under this spell’s effect do increase.

A few feathers or a pinch of droppings from an eagle.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('eagle-s-splendor-mass', 'Eagle’s Splendor, Mass', 'Transmutación', NULL, NULL, NULL, 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature/Nivel, No two of which can be more than 30 ft. apart', NULL, NULL, NULL, NULL, 'No', 'This spell functions like eagle’s splendor, except that it affects multiple creatures.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('earthquake', 'Earthquake', 'Evocación', NULL, ARRAY['Tierra']::TEXT[], '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, '80-ft.-radius spread (S)', NULL, '1 round', 'See text', 'No', 'When you cast earthquake, an intense but highly localized tremor rips the ground. The shock knocks creatures down, collapses structures, opens cracks in the ground, and more. The effect lasts for 1 round, during which time creatures on the ground can’t move or attack. A spellcaster on the ground must make a Concentration check (DC 20 + spell level) or lose any spell he or she tries to cast. The earthquake affects all terrain, vegetation, structures, and creatures in the area. The specific effect of an earthquake spell depends on the nature of the terrain where it is cast.

The spell collapses the roof, dealing 8d6 points of bludgeoning damage to any creature caught under the cave-in (Reflex DC 15 half) and pinning that creature beneath the rubble (see below). An earthquake cast on the roof of a very large cavern could also endanger those outside the actual area but below the falling debris.

Earthquake causes a cliff to crumble, creating a landslide that travels horizontally as far as it fell vertically. Any creature in the path takes 8d6 points of bludgeoning damage (Reflex DC 15 half) and is pinned beneath the rubble (see below).

Each creature standing in the area must make a DC 15 Reflex save or fall down. Fissures open in the earth, and every creature on the ground has a 25% chance to fall into one (Reflex DC 20 to avoid a fissure). At the end of the spell, all fissures grind shut, killing any creatures still trapped within.

Any structure standing on open ground takes 100 points of damage, enough to collapse a typical wooden or masonry building, but not a structure built of stone or reinforced masonry. Hardness does not reduce this damage, nor is it halved as damage dealt to objects normally is. Any creature caught inside a collapsing structure takes 8d6 points of bludgeoning damage (Reflex DC 15 half) and is pinned beneath the rubble (see below).

Fissures open underneath the water, draining away the water from that area and forming muddy ground. Soggy marsh or swampland becomes quicksand for the duration of the spell, sucking down creatures and structures. Each creature in the area must make a DC 15 Reflex save or sink down in the mud and quicksand. At the end of the spell, the rest of the body of water rushes in to replace the drained water, possibly drowning those caught in the mud.

Any creature pinned beneath rubble takes 1d6 points of nonlethal damage per minute while pinned. If a pinned character falls unconscious, he or she must make a DC 15 Constitution check or take 1d6 points of lethal damage each minute thereafter until freed or dead.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('elemental-swarm', 'Elemental Swarm', 'Conjuración', 'Convocación', ARRAY['see text']::TEXT[], '10 minutes', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Two or more summoned creatures, No two of which can be more than 30 ft. apart', '10 min./Nivel (D)', 'Ninguna', 'No', 'This spell opens a portal to an Elemental Plane and summons elementals from it. A druid can choose the plane (Air, Earth, Fire, or Water); a cleric opens a portal to the plane matching his domain.

When the spell is complete, 2d4 Large elementals appear. Ten minutes later, 1d4 Huge elementals appear. Ten minutes after that, one greater elemental appears. Each elemental has maximum hit points per HD. Once these creatures appear, they serve you for the duration of the spell.

The elementals obey you explicitly and never attack you, even if someone else manages to gain control over them. You do not need to concentrate to maintain control over the elementals. You can dismiss them singly or in groups at any time.

When you use a summoning spell to summon an air, earth, fire, or water creature, it is a spell of that type.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('endure-elements', 'Endure Elements', 'Abjuración', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '24 hours', 'Voluntad anula (harmless)', 'Sí (harmless)', 'A creature protected by endure elements suffers no harm from being in a hot or cold environment. It can exist comfortably in conditions between -50 and 140 degrees Fahrenheit without having to make Fortitude saves). The creature’s equipment is likewise protected.

Endure elements doesn’t provide any protection from fire or cold damage, nor does it protect against other environmental hazards such as smoke, lack of air, and so forth.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('energy-drain', 'Energy Drain', 'Nigromancia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Fortaleza parcial; see text for enervation', 'No', 'This spell functions like enervation, except that the creature struck gains 2d4 negative levels, and the negative levels last longer.

There is no saving throw to avoid gaining the negative levels, but 24 hours after gaining them, the subject must make a Fortitude saving throw (DC = energy drain spell’s save DC) for each negative level. If the save succeeds, that negative level is removed. If it fails, the negative level also goes away, but one of the subject’s character levels is permanently drained.

An undead creature struck by the ray gains 2d4×5 temporary hit points for 1 hour.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('enervation', 'Enervation', 'Nigromancia', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Ray of negative energy', 'Instantáneo', 'Ninguna', 'Sí', 'You point your finger and utter the incantation, releasing a black ray of crackling negative energy that suppresses the life force of any living creature it strikes. You must make a ranged touch attack to hit. If the attack succeeds, the subject gains 1d4 negative levels.

If the subject has at least as many negative levels as HD, it dies. Each negative level gives a creature a -1 penalty on attack rolls, saving throws, skill checks, ability checks, and effective level (for determining the power, duration, DC, and other details of spells or special abilities).

Additionally, a spellcaster loses one spell or spell slot from his or her highest available level. Negative levels stack.

Assuming the subject survives, it regains lost levels after a number of hours equal to your caster level (maximum 15 hours). Usually, negative levels have a chance of permanently draining the victim’s levels, but the negative levels from enervation don’t last long enough to do so.

An undead creature struck by the ray gains 1d4×5 temporary hit points for 1 hour.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('enlarge-person', 'Enlarge Person', 'Transmutación', NULL, NULL, '1 round', 'Cercano (25 ft. + 5 ft./2 levels)', 'One humanoid creature', NULL, NULL, '1 min./Nivel (D)', 'Fortaleza anula', 'Sí', 'This spell causes instant growth of a humanoid creature, doubling its height and multiplying its weight by 8. This increase changes the creature’s size category to the next larger one. The target gains a +2 size bonus to Strength, a -2 size penalty to Dexterity (to a minimum of 1), and a -1 penalty on attack rolls and AC due to its increased size.

A humanoid creature whose size increases to Large has a space of 10 feet and a natural reach of 10 feet. This spell does not change the target’s speed.

If insufficient room is available for the desired growth, the creature attains the maximum possible size and may make a Strength check (using its increased Strength) to burst any enclosures in the process. If it fails, it is constrained without harm by the materials enclosing it— the spell cannot be used to crush a creature by increasing its size.

All equipment worn or carried by a creature is similarly enlarged by the spell. Melee and projectile weapons affected by this spell deal more damage. Other magical properties are not affected by this spell. Any enlarged item that leaves an enlarged creature’s possession (including a projectile or thrown weapon) instantly returns to its normal size. This means that thrown weapons deal their normal damage, and projectiles deal damage based on the size of the weapon that fired them. Magical properties of enlarged items are not increased by this spell.

Multiple magical effects that increase size do not stack,.

Enlarge person counters and dispels reduce person.

Enlarge person can be made permanent with a permanency spell.

A pinch of powdered iron.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('enlarge-person-mass', 'Enlarge Person, Mass', 'Transmutación', NULL, NULL, NULL, NULL, 'One humanoid creature/Nivel, No two of which can be more than 30 ft. apart', NULL, NULL, NULL, NULL, 'No', 'This spell functions like enlarge person, except that it affects multiple creatures.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('entangle', 'Entangle', 'Transmutación', NULL, NULL, '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, 'Plants in a 40-ft.-radius spread', NULL, '1 min./Nivel (D)', 'Reflejos parcial; see text', 'No', 'Grasses, weeds, bushes, and even trees wrap, twist, and entwine about creatures in the area or those that enter the area, holding them fast and causing them to become entangled. The creature can break free and move half its normal speed by using a full-round action to make a DC 20 Strength check or a DC 20 Escape Artist check. A creature that succeeds on a Reflex save is not entangled but can still move at only half speed through the area. Each round on your turn, the plants once again attempt to entangle all creatures that have avoided or escaped entanglement.

Note: The effects of the spell may be altered somewhat, based on the nature of the entangling plants.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('enthrall', 'Enthrall', 'Encantamiento', 'Hechizo', ARRAY['Language Dependent, Afecta la Mente, Sónico']::TEXT[], '1 round', 'Medio (100 ft. + 10 ft./Nivel)', 'Any number of creatures', NULL, NULL, '1 hour or less', 'Voluntad anula; see text', 'Sí', 'If you have the attention of a group of creatures, you can use this spell to hold them spellbound. To cast the spell, you must speak or sing without interruption for 1 full round. Thereafter, those affected give you their undivided attention, ignoring their surroundings. They are considered to have an attitude of friendly while under the effect of the spell. Any potentially affected creature of a race or religion unfriendly to yours gets a +4 bonus on the saving throw.

A creature with 4 or more HD or with a Wisdom score of 16 or higher remains aware of its surroundings and has an attitude of indifferent. It gains a new saving throw if it witnesses actions that it opposes.

The effect lasts as long as you speak or sing, to a maximum of 1 hour. Those enthralled by your words take no action while you speak or sing and for 1d3 rounds thereafter while they discuss the topic or performance. Those entering the area during the performance must also successfully save or become enthralled. The speech ends (but the 1d3-round delay still applies) if you lose concentration or do anything other than speak or sing.

If those not enthralled have unfriendly or hostile attitudes toward you, they can collectively make a Charisma check to try to end the spell by jeering and heckling. For this check, use the Charisma bonus of the creature with the highest Charisma in the group; others may make Charisma checks to assist. The heckling ends the spell if this check result beats your Charisma check result. Only one such challenge is allowed per use of the spell.

If any member of the audience is attacked or subjected to some other overtly hostile act, the spell ends and the previously enthralled members become immediately unfriendly toward you. Each creature with 4 or more HD or with a Wisdom score of 16 or higher becomes hostile.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('entropic-shield', 'Entropic Shield', 'Abjuración', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 min./Nivel (D)', NULL, 'No', 'A magical field appears around you, glowing with a chaotic blast of multicolored hues. This field deflects incoming arrows, rays, and other ranged attacks. Each ranged attack directed at you for which the attacker must make an attack roll has a 20% miss chance (similar to the effects of concealment). Other attacks that simply work at a distance are not affected.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('erase', 'Erase', 'Transmutación', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One scroll or two pages', NULL, NULL, 'Instantáneo', 'See text', 'No', 'Erase removes writings of either magical or mundane nature from a scroll or from one or two pages of paper, parchment, or similar surfaces. With this spell, you can remove explosive runes, a glyph of warding, a sepia snake sigil, or an arcane mark, but not illusory script or a symbol spell. Nonmagical writing is automatically erased if you touch it and no one else is holding it. Otherwise, the chance of erasing nonmagical writing is 90%.

Magic writing must be touched to be erased, and you also must succeed on a caster level check (1d20 + caster level) against DC 15. (A natural 1 or 2 is always a failure on this check.) If you fail to erase explosive runes, a glyph of warding, or a sepia snake sigil, you accidentally activate that writing instead.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('ethereal-jaunt', 'Ethereal Jaunt', 'Transmutación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 round/Nivel (D)', NULL, 'No', 'You become ethereal, along with your equipment. For the duration of the spell, you are in a place called the Ethereal Plane, which overlaps the normal, physical, Material Plane. When the spell expires, you return to material existence.

An ethereal creature is invisible, insubstantial, and capable of moving in any direction, even up or down, albeit at half normal speed. As an insubstantial creature, you can move through solid objects, including living creatures. An ethereal creature can see and hear on the Material Plane, but everything looks gray and ephemeral. Sight and hearing onto the Material Plane are limited to 60 feet.

Force effects and abjurations affect an ethereal creature normally. Their effects extend onto the Ethereal Plane from the Material Plane, but not vice versa. An ethereal creature can’t attack material creatures, and spells you cast while ethereal affect only other ethereal things. Certain material creatures or objects have attacks or effects that work on the Ethereal Plane.

Treat other ethereal creatures and ethereal objects as if they were material.

If you end the spell and become material while inside a material object (such as a solid wall), you are shunted off to the nearest open space and take 1d6 points of damage per 5 feet that you so travel.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('etherealness', 'Etherealness', 'Transmutación', NULL, NULL, NULL, 'Toque; see text', 'You and one other touched creature per three levels', NULL, NULL, '1 min./Nivel (D)', NULL, 'Sí', 'This spell functions like ethereal jaunt, except that you and other willing creatures joined by linked hands (along with their equipment) become ethereal. Besides yourself, you can bring one creature per three caster levels to the Ethereal Plane. Once ethereal, the subjects need not stay together.

When the spell expires, all affected creatures on the Ethereal Plane return to material existence.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('expeditious-retreat', 'Expeditious Retreat', 'Transmutación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 min./Nivel (D)', NULL, 'No', 'This spell increases your base land speed by 30 feet. (This adjustment is treated as an enhancement bonus.) There is no effect on other modes of movement, such as burrow, climb, fly, or swim. As with any effect that increases your speed, this spell affects your jumping distance (see the Jump skill).', NULL, NULL, NULL, true, true, false, false, false, false),
  ('explosive-runes', 'Explosive Runes', 'Abjuración', NULL, ARRAY['Fuerza']::TEXT[], '1 standard action', 'Toque', 'One touched object weighing No more than 10 lb.', NULL, NULL, 'Permanente until discharged (D)', 'See text', 'Sí', 'You trace these mystic runes upon a book, map, scroll, or similar object bearing written information. The runes detonate when read, dealing 6d6 points of force damage. Anyone next to the runes (close enough to read them) takes the full damage with no saving throw; any other creature within 10 feet of the runes is entitled to a Reflex save for half damage. The object on which the runes were written also takes full damage (no saving throw).

You and any characters you specifically instruct can read the protected writing without triggering the runes. Likewise, you can remove the runes whenever desired. Another creature can remove them with a successful dispel magic or erase spell, but attempting to dispel or erase the runes and failing to do so triggers the explosion.

Note: Magic traps such as explosive runes are hard to detect and disable. A rogue (only) can use the Search skill to find the runes and Disable Device to thwart them. The DC in each case is 25 + spell level, or 28 for explosive runes.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('eyebite', 'Eyebite', 'Nigromancia', NULL, ARRAY['Maligno']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One living creature', NULL, NULL, '1 round per three levels; see text', 'Fortaleza anula', 'Sí', 'Each round, you may target a single living creature, striking it with waves of evil power. Depending on the target’s HD, this attack has as many as three effects.

The effects are cumulative and concurrent.

Sudden pain and fever sweeps over the subject’s body. A sickened creature takes a -2 penalty on attack rolls, weapon damage rolls, saving throws, skill checks, and ability checks. A creature affected by this spell remains sickened for 10 minutes per caster level. The effects cannot be negated by a remove disease or heal spell, but a remove curse is effective.

The subject becomes panicked for 1d4 rounds. Even after the panic ends, the creature remains shaken for 10 minutes per caster level, and it automatically becomes panicked again if it comes within sight of you during that time. This is a fear effect.

The subject falls into a catatonic coma for 10 minutes per caster level. During this time, it cannot be awakened by any means short of dispelling the effect. This is not a sleep effect, and thus elves are not immune to it.

The spell lasts for 1 round per three caster levels. You must spend a move action each round after the first to target a foe.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('fabricate', 'Fabricate', 'Transmutación', NULL, NULL, 'See text', 'Cercano (25 ft. + 5 ft./2 levels)', 'Up to 10 cu. ft./Nivel; see text', NULL, NULL, 'Instantáneo', 'Ninguna', 'No', 'You convert material of one sort into a product that is of the same material. Creatures or magic items cannot be created or transmuted by the fabricate spell. The quality of items made by this spell is commensurate with the quality of material used as the basis for the new fabrication. If you work with a mineral, the target is reduced to 1 cubic foot per level instead of 10 cubic feet.

You must make an appropriate Craft check to fabricate articles requiring a high degree of craftsmanship.

Casting requires 1 round per 10 cubic feet (or 1 cubic foot) of material to be affected by the spell.

The original material, which costs the same amount as the raw materials required to craft the item to be created.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('faerie-fire', 'Faerie Fire', 'Evocación', NULL, ARRAY['Luz']::TEXT[], '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, 'Creatures and objects within a 5-ft.-radius burst', NULL, '1 min./Nivel (D)', 'Ninguna', 'Sí', 'A pale glow surrounds and outlines the subjects. Outlined subjects shed light as candles. Outlined creatures do not benefit from the concealment normally provided by darkness (though a 2nd-level or higher magical darkness effect functions normally), blur, displacement, invisibility, or similar effects. The light is too dim to have any special effect on undead or dark-dwelling creatures vulnerable to light. The faerie fire can be blue, green, or violet, according to your choice at the time of casting. The faerie fire does not cause any harm to the objects or creatures thus outlined.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('false-life', 'False Life', 'Nigromancia', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 hour/Nivel or until discharged; see text', NULL, 'No', 'You harness the power of unlife to grant yourself a limited ability to avoid death. While this spell is in effect, you gain temporary hit points equal to 1d10 +1 per caster level (maximum +10).

A small amount of alcohol or distilled spirits, which you use to trace certain sigils on your body during casting. These sigils cannot be seen once the alcohol or spirits evaporate.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('false-vision', 'False Vision', 'Ilusión', 'Glamour', NULL, '1 standard action', 'Toque', NULL, '40-ft.-radius emanation', NULL, '1 hour/Nivel (D)', 'Ninguna', 'No', 'Any divination (scrying) spell used to view anything within the area of this spell instead receives a false image (as the major image spell), as defined by you at the time of casting. As long as the duration lasts, you can concentrate to change the image as desired. While you aren’t concentrating, the image remains static.

The ground dust of a piece of jade worth at least 250 gp, which is sprinkled into the air when the spell is cast.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('fear', 'Fear', 'Nigromancia', NULL, ARRAY['Miedo, Afecta la Mente']::TEXT[], '1 standard action', '30 ft.', NULL, 'Cone-shaped burst', NULL, '1 round/Nivel or 1 round; see text', 'Voluntad parcial', 'Sí', 'An invisible cone of terror causes each living creature in the area to become panicked unless it succeeds on a Will save. If cornered, a panicked creature begins cowering. If the Will save succeeds, the creature is shaken for 1 round.

Either the heart of a hen or a white feather.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('feather-fall', 'Feather Fall', 'Transmutación', NULL, NULL, '1 immediate action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One Medio or smaller freefalling object or creature/Nivel, No two of which may be more than 20 ft. apart', NULL, NULL, 'Until landing or 1 round/Nivel', 'Voluntad anula (harmless) or Voluntad anula (object)', 'Sí (object)', 'The affected creatures or objects fall slowly. Feather fall instantly changes the rate at which the targets fall to a mere 60 feet per round (equivalent to the end of a fall from a few feet), and the subjects take no damage upon landing while the spell is in effect. However, when the spell duration expires, a normal rate of falling resumes.

The spell affects one or more Medium or smaller creatures (including gear and carried objects up to each creature’s maximum load) or objects, or the equivalent in larger creatures: A Large creature or object counts as two Medium creatures or objects, a Huge creature or object counts as two Large creatures or objects, and so forth.

You can cast this spell with an instant utterance, quickly enough to save yourself if you unexpectedly fall. Casting the spell is a immediate action, allowing you to cast this spell even when it isn’t your turn.

This spell has no special effect on ranged weapons unless they are falling quite a distance. If the spell is cast on a falling item the object does half normal damage based on its weight, with no bonus for the height of the drop.

Feather fall works only upon free-falling objects. It does not affect a sword blow or a charging or flying creature.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('feeblemind', 'Feeblemind', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'One creature', NULL, NULL, 'Instantáneo', 'Voluntad anula; see text', 'Sí', 'If the target creature fails a Will saving throw, its Intelligence and Charisma scores each drop to 1. The affected creature is unable to use Intelligence- or Charisma-based skills, cast spells, understand language, or communicate coherently. Still, it knows who its friends are and can follow them and even protect them. The subject remains in this state until a heal, limited wish, miracle, or wish spell is used to cancel the effect of the feeblemind. A creature that can cast arcane spells, such as a sorcerer or a wizard, takes a -4 penalty on its saving throw.

A handful of clay, crystal, glass, or mineral spheres.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('find-the-path', 'Find the Path', 'Adivinación', NULL, NULL, '3 rounds', 'Personal or Toque', 'You or creature touched', NULL, NULL, '10 min./Nivel', 'Ninguna or Voluntad anula (harmless)', 'No or Sí (harmless)', 'The recipient of this spell can find the shortest, most direct physical route to a specified destination, be it the way into or out of a locale. The locale can be outdoors, underground, or even inside a maze spell. Find the path works with respect to locations, not objects or creatures at a locale. The location must be on the same plane as you are at the time of casting.

The spell enables the subject to sense the correct direction that will eventually lead it to its destination, indicating at appropriate times the exact path to follow or physical actions to take. For example, the spell enables the subject to sense trip wires or the proper word to bypass a glyph of warding. The spell ends when the destination is reached or the duration expires, whichever comes first. Find the path can be used to remove the subject and its companions from the effect of a maze spell in a single round.

This divination is keyed to the recipient, not its companions, and its effect does not predict or allow for the actions of creatures (including guardians).

A set of divination counters of the sort you favor.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('find-traps', 'Find Traps', 'Adivinación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 min./Nivel', NULL, 'No', 'You gain intuitive insight into the workings of traps. You can use the Search skill to detect traps just as a rogue can. In addition, you gain an insight bonus equal to one-half your caster level (maximum +10) on Search checks made to find traps while the spell is in effect.

Note that find traps grants no ability to disable the traps that you may find.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('finger-of-death', 'Finger of Death', 'Nigromancia', NULL, ARRAY['Muerte']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One living creature', NULL, NULL, 'Instantáneo', 'Fortaleza parcial', 'Sí', 'You can slay any one living creature within range. The target is entitled to a Fortitude saving throw to survive the attack. If the save is successful, the creature instead takes 3d6 points of damage +1 point per caster level (maximum +25).

The subject might die from damage even if it succeeds on its saving throw.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('fireball', 'Fireball', 'Evocación', NULL, ARRAY['Fuego']::TEXT[], '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, '20-ft.-radius spread', NULL, 'Instantáneo', 'Reflejos mitad', 'Sí', 'A fireball spell is an explosion of flame that detonates with a low roar and deals 1d6 points of fire damage per caster level (maximum 10d6) to every creature within the area. Unattended objects also take this damage. The explosion creates almost no pressure.

You point your finger and determine the range (distance and height) at which the fireball is to burst. A glowing, pea-sized bead streaks from the pointing digit and, unless it impacts upon a material body or solid barrier prior to attaining the prescribed range, blossoms into the fireball at that point. (An early impact results in an early detonation.) If you attempt to send the bead through a narrow passage, such as through an arrow slit, you must “hit” the opening with a ranged touch attack, or else the bead strikes the barrier and detonates prematurely.

The fireball sets fire to combustibles and damages objects in the area. It can melt metals with low melting points, such as lead, gold, copper, silver, and bronze. If the damage caused to an interposing barrier shatters or breaks through it, the fireball may continue beyond the barrier if the area permits; otherwise it stops at the barrier just as any other spell effect does.

A tiny ball of bat guano and sulfur.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('fire-seeds', 'Fire Seeds', 'Conjuración', 'Creación', ARRAY['Fuego']::TEXT[], '1 standard action', 'Toque', 'Up to four touched acorns or up to eight touched holly berries', NULL, NULL, '10 min./Nivel or until used', 'Ninguna or Reflejos mitad; see text', 'No', 'Depending on the version of fire seeds you choose, you turn acorns into splash weapons that you or another character can throw, or you turn holly berries into bombs that you can detonate on command.

As many as four acorns turn into special splash weapons that can be hurled as far as 100 feet. A ranged touch attack roll is required to strike the intended target. Together, the acorns are capable of dealing 1d6 points of fire damage per caster level (maximum 20d6), divided up among the acorns as you wish.

Each acorn explodes upon striking any hard surface. In addition to its regular fire damage, it deals 1 point of splash damage per die, and it ignites any combustible materials within 10 feet. A creature within this area that makes a successful Reflex saving throw takes only half damage; a creature struck directly is not allowed a saving throw.

You turn as many as eight holly berries into special bombs. The holly berries are usually placed by hand, since they are too light to make effective thrown weapons (they can be tossed only 5 feet). If you are within 200 feet and speak a word of command, each berry instantly bursts into flame, causing 1d8 points of fire damage +1 point per caster level to every creature in a 5-foot radius burst and igniting any combustible materials within 5 feet. A creature in the area that makes a successful Reflex saving throw takes only half damage.

The acorns or holly berries.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('fire-shield', 'Fire Shield', 'Evocación', NULL, ARRAY['Fuego or Frío']::TEXT[], '1 standard action', 'Personal', 'You', NULL, NULL, '1 round/Nivel (D)', NULL, 'No', 'This spell wreathes you in flame and causes damage to each creature that attacks you in melee. The flames also protect you from either cold-based or fire-based attacks (your choice).

Any creature striking you with its body or a handheld weapon deals normal damage, but at the same time the attacker takes 1d6 points of damage +1 point per caster level (maximum +15). This damage is either cold damage (if the shield protects against fire-based attacks) or fire damage (if the shield protects against cold-based attacks). If the attacker has spell resistance, it applies to this effect. Creatures wielding weapons with exceptional reach are not subject to this damage if they attack you.

When casting this spell, you appear to immolate yourself, but the flames are thin and wispy, giving off light equal to only half the illumination of a normal torch (10 feet). The color of the flames is determined randomly (50% chance of either color)—blue or green if the chill shield is cast, violet or blue if the warm shield is employed. The special powers of each version are as follows.

The flames are warm to the touch. You take only half damage from cold-based attacks. If such an attack allows a Reflex save for half damage, you take no damage on a successful save.

The flames are cool to the touch. You take only half damage from fire-based attacks. If such an attack allows a Reflex save for half damage, you take no damage on a successful save.

A bit of phosphorus for the warm shield; a live firefly or glowworm or the tail portions of four dead ones for the chill shield.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('fire-storm', 'Fire Storm', 'Evocación', NULL, ARRAY['Fuego']::TEXT[], '1 round', 'Medio (100 ft. + 10 ft./Nivel)', NULL, 'Two 10-ft. cubes per Nivel (S)', NULL, 'Instantáneo', 'Reflejos mitad', 'Sí', 'When a fire storm spell is cast, the whole area is shot through with sheets of roaring flame. The raging flames do not harm natural vegetation, ground cover, and any plant creatures in the area that you wish to exclude from damage. Any other creature within the area takes 1d6 points of fire damage per caster level (maximum 20d6).', NULL, NULL, NULL, true, true, false, false, false, false),
  ('fire-trap', 'Fire Trap', 'Abjuración', NULL, ARRAY['Fuego']::TEXT[], '10 minutes', 'Toque', 'Object touched', NULL, NULL, 'Permanente until discharged (D)', 'Reflejos mitad; see text', 'Sí', 'Fire trap creates a fiery explosion when an intruder opens the item that the trap protects. A fire trap can ward any object that can be opened and closed.

When casting fire trap, you select a point on the object as the spell’s center. When someone other than you opens the object, a fiery explosion fills the area within a 5-foot radius around the spell’s center. The flames deal 1d4 points of fire damage +1 point per caster level (maximum +20). The item protected by the trap is not harmed by this explosion.

A fire trapped item cannot have a second closure or warding spell placed on it.

A knock spell does not bypass a fire trap. An unsuccessful dispel magic spell does not detonate the spell.

Underwater, this ward deals half damage and creates a large cloud of steam.

You can use the fire trapped object without discharging it, as can any individual to whom the object was specifically attuned when cast. Attuning a fire trapped object to an individual usually involves setting a password that you can share with friends.

Note: Magic traps such as fire trap are hard to detect and disable. A rogue (only) can use the Search skill to find a fire trap and Disable Device to thwart it. The DC in each case is 25 + spell level (DC 27 for a druid’s fire trap or DC 29 for the arcane version).

A half-pound of gold dust (cost 25 gp) sprinkled on the warded object.', NULL, NULL, NULL, true, true, true, false, false, false)
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

-- Verificación de la parte 2
SELECT 'Parte 2/7 insertada' AS status, COUNT(*) AS count FROM public.spells;
