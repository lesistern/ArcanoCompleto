-- ============================================================================
-- CONJUROS DEL PLAYER'S HANDBOOK - PARTE 3/7
-- Conjuros 201-300 de 608 totales
-- Datos extraídos de d20srd.org
-- ============================================================================

-- Insertar conjuros (parte 3)
INSERT INTO public.spells (
  slug, name, school, subschool, descriptors,
  casting_time, range_info, target, area, effect, duration,
  saving_throw, spell_resistance, description,
  material_components, focus, xp_cost,
  component_verbal, component_somatic, component_material,
  component_focus, component_divine_focus, component_xp
)
VALUES
  ('flame-arrow', 'Flame Arrow', 'Transmutación', NULL, ARRAY['Fuego']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'Fifty projectiles, all of which must be in contact with each other at the time of casting', NULL, NULL, '10 min./Nivel', 'Ninguna', 'No', 'You turn ammunition (such as arrows, bolts, shuriken, and stones) into fiery projectiles. Each piece of ammunition deals an extra 1d6 points of fire damage to any target it hits. A flaming projectile can easily ignite a flammable object or structure, but it won’t ignite a creature it strikes.

A drop of oil and a small piece of flint.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('flame-blade', 'Flame Blade', 'Evocación', NULL, ARRAY['Fuego']::TEXT[], '1 standard action', '0 ft.', NULL, NULL, 'Sword-like beam', '1 min./Nivel (D)', 'Ninguna', 'Sí', 'A 3-foot-long, blazing beam of red-hot fire springs forth from your hand. You wield this bladelike beam as if it were a scimitar. Attacks with the flame blade are melee touch attacks. The blade deals 1d8 points of fire damage +1 point per two caster levels (maximum +10). Since the blade is immaterial, your Strength modifier does not apply to the damage. A flame blade can ignite combustible materials such as parchment, straw, dry sticks, and cloth.

The spell does not function underwater.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('flame-strike', 'Flame Strike', 'Evocación', NULL, ARRAY['Fuego']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, 'Cylinder (10-ft. radius, 40 ft. high)', NULL, 'Instantáneo', 'Reflejos mitad', 'Sí', 'A flame strike produces a vertical column of divine fire roaring downward. The spell deals 1d6 points of damage per caster level (maximum 15d6). Half the damage is fire damage, but the other half results directly from divine power and is therefore not subject to being reduced by resistance to fire-based attacks.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('flaming-sphere', 'Flaming Sphere', 'Evocación', NULL, ARRAY['Fuego']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, '5-ft.-diameter sphere', '1 round/Nivel', 'Reflejos anula', 'Sí', 'A burning globe of fire rolls in whichever direction you point and burns those it strikes. It moves 30 feet per round. As part of this movement, it can ascend or jump up to 30 feet to strike a target. If it enters a space with a creature, it stops moving for the round and deals 2d6 points of fire damage to that creature, though a successful Reflex save negates that damage. A flaming sphere rolls over barriers less than 4 feet tall. It ignites flammable substances it touches and illuminates the same area as a torch would.

The sphere moves as long as you actively direct it (a move action for you); otherwise, it merely stays at rest and burns. It can be extinguished by any means that would put out a normal fire of its size. The surface of the sphere has a spongy, yielding consistency and so does not cause damage except by its flame. It cannot push aside unwilling creatures or batter down large obstacles. A flaming sphere winks out if it exceeds the spell’s range.

A bit of tallow, a pinch of brimstone, and a dusting of powdered iron.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('flare', 'Flare', 'Evocación', NULL, ARRAY['Luz']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Burst of Luz', 'Instantáneo', 'Fortaleza anula', 'Sí', 'This cantrip creates a burst of light. If you cause the light to burst directly in front of a single creature, that creature is dazzled for 1 minute unless it makes a successful Fortitude save. Sightless creatures, as well as creatures already dazzled, are not affected by flare.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('flesh-to-stone', 'Flesh to Stone', 'Transmutación', NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'One creature', NULL, NULL, 'Instantáneo', 'Fortaleza anula', 'Sí', 'The subject, along with all its carried gear, turns into a mindless, inert statue. If the statue resulting from this spell is broken or damaged, the subject (if ever returned to its original state) has similar damage or deformities. The creature is not dead, but it does not seem to be alive either when viewed with spells such as deathwatch.

Only creatures made of flesh are affected by this spell.

Lime, water, and earth.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('floating-disk', 'Floating Disk', 'Evocación', NULL, ARRAY['Fuerza']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, '3-ft.-diameter disk of Fuerza', '1 hour/Nivel', 'Ninguna', 'No', 'You create a slightly concave, circular plane of force that follows you about and carries loads for you. The disk is 3 feet in diameter and 1 inch deep at its center. It can hold 100 pounds of weight per caster level. (If used to transport a liquid, its capacity is 2 gallons.) The disk floats approximately 3 feet above the ground at all times and remains level. It floats along horizontally within spell range and will accompany you at a rate of no more than your normal speed each round. If not otherwise directed, it maintains a constant interval of 5 feet between itself and you. The disk winks out of existence when the spell duration expires. The disk also winks out if you move beyond range or try to take the disk more than 3 feet away from the surface beneath it. When the disk winks out, whatever it was supporting falls to the surface beneath it.

A drop of mercury.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('fly', 'Fly', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 min./Nivel', 'Voluntad anula (harmless)', 'Sí (harmless)', 'The subject can fly at a speed of 60 feet (or 40 feet if it wears medium or heavy armor, or if it carries a medium or heavy load). It can ascend at half speed and descend at double speed, and its maneuverability is good. Using a fly spell requires only as much concentration as walking, so the subject can attack or cast spells normally. The subject of a fly spell can charge but not run, and it cannot carry aloft more weight than its maximum load, plus any armor it wears.

Should the spell duration expire while the subject is still aloft, the magic fails slowly. The subject floats downward 60 feet per round for 1d6 rounds. If it reaches the ground in that amount of time, it lands safely. If not, it falls the rest of the distance, taking 1d6 points of damage per 10 feet of fall. Since dispelling a spell effectively ends it, the subject also descends in this way if the fly spell is dispelled, but not if it is negated by an antimagic field.

A wing feather from any bird.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('fog-cloud', 'Fog Cloud', 'Conjuración', 'Creación', NULL, '1 standard action', 'Medio (100 ft. + 10 ft. Nivel)', NULL, NULL, 'Fog spreads in 20-ft. radius, 20 ft. high', '10 min./Nivel', 'Ninguna', 'No', 'A bank of fog billows out from the point you designate. The fog obscures all sight, including darkvision, beyond 5 feet. A creature within 5 feet has concealment (attacks have a 20% miss chance). Creatures farther away have total concealment (50% miss chance, and the attacker can’t use sight to locate the target).

A moderate wind (11+ mph) disperses the fog in 4 rounds; a strong wind (21+ mph) disperses the fog in 1 round.

The spell does not function underwater.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('forbiddance', 'Forbiddance', 'Abjuración', NULL, NULL, '6 rounds', 'Medio (100 ft. + 10 ft./Nivel)', NULL, '60-ft. cube/Nivel (S)', NULL, 'Permanente', 'See text', 'Sí', 'Forbiddance seals an area against all planar travel into or within it. This includes all teleportation spells (such as dimension door and teleport), plane shifting, astral travel, ethereal travel, and all summoning spells. Such effects simply fail automatically.

In addition, it damages entering creatures whose alignments are different from yours. The effect on those attempting to enter the warded area is based on their alignment relative to yours (see below). A creature inside the area when the spell is cast takes no damage unless it exits the area and attempts to reenter, at which time it is affected as normal.

No effect. The creature may enter the area freely (although not by planar travel).

The creature takes 6d6 points of damage. A successful Will save halves the damage, and spell resistance applies.

The creature takes 12d6 points of damage. A successful Will save halves the damage, and spell resistance applies.

At your option, the abjuration can include a password, in which case creatures of alignments different from yours can avoid the damage by speaking the password as they enter the area. You must select this option (and the password) at the time of casting.

Dispel magic does not dispel a forbiddance effect unless the dispeller’s level is at least as high as your caster level.

You can’t have multiple overlapping forbiddance effects. In such a case, the more recent effect stops at the boundary of the older effect.

A sprinkling of holy water and rare incenses worth at least 1,500 gp, plus 1,500 gp per 60-foot cube. If a password is desired, this requires the burning of additional rare incenses worth at least 1,000 gp, plus 1,000 gp per 60-foot cube.', NULL, NULL, NULL, true, true, true, false, true, false),
  ('forcecage', 'Forcecage', 'Evocación', NULL, ARRAY['Fuerza']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, 'Barred cage (20-ft. cube) or windowless cell (10-ft. cube)', NULL, '2 hours/Nivel (D)', 'Ninguna', 'No', 'This powerful spell brings into being an immobile, invisible cubical prison composed of either bars of force or solid walls of force (your choice).

Creatures within the area are caught and contained unless they are too big to fit inside, in which case the spell automatically fails. Teleportation and other forms of astral travel provide a means of escape, but the force walls or bars extend into the Ethereal Plane, blocking ethereal travel.

Like a wall of force spell, a forcecage resists dispel magic, but it is vulnerable to a disintegrate spell, and it can be destroyed by a sphere of annihilation or a rod of cancellation.

This version of the spell produces a 20-foot cube made of bands of force (similar to a wall of force spell) for bars. The bands are a half-inch wide, with half-inch gaps between them. Any creature capable of passing through such a small space can escape; others are confined. You can’t attack a creature in a barred cage with a weapon unless the weapon can fit between the gaps. Even against such weapons (including arrows and similar ranged attacks), a creature in the barred cage has cover. All spells and breath weapons can pass through the gaps in the bars.

This version of the spell produces a 10-foot cube with no way in and no way out. Solid walls of force form its six sides.

Ruby dust worth 1,500 gp, which is tossed into the air and disappears when you cast the spell.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('forceful-hand', 'Forceful Hand', 'Evocación', NULL, ARRAY['Fuerza']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like interposing hand, except that the forceful hand pursues and pushes away the opponent that you designate. Treat this attack as a bull rush with a +14 bonus on the Strength check (+8 for Strength 27, +4 for being Large, and a +2 bonus for charging, which it always gets). The hand always moves with the opponent to push that target back the full distance allowed, and it has no speed limit. Directing the spell to a new target is a move action.

A very strong creature could not push the hand out of its way because the latter would instantly reposition itself between the creature and you, but an opponent could push the hand up against you by successfully bull rushing it.

A sturdy glove made of leather or heavy cloth.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('foresight', 'Foresight', 'Adivinación', NULL, NULL, '1 standard action', 'Personal or Toque', 'See text', NULL, NULL, '10 min./Nivel', 'Ninguna or Voluntad anula (harmless)', 'No or Sí (harmless)', 'This spell grants you a powerful sixth sense in relation to yourself or another. Once foresight is cast, you receive instantaneous warnings of impending danger or harm to the subject of the spell. You are never surprised or flat-footed. In addition, the spell gives you a general idea of what action you might take to best protect yourself and gives you a +2 insight bonus to AC and Reflex saves. This insight bonus is lost whenever you would lose a Dexterity bonus to AC.

When another creature is the subject of the spell, you receive warnings about that creature. You must communicate what you learn to the other creature for the warning to be useful, and the creature can be caught unprepared in the absence of such a warning. Shouting a warning, yanking a person back, and even telepathically communicating (via an appropriate spell) can all be accomplished before some danger befalls the subject, provided you act on the warning without delay. The subject, however, does not gain the insight bonus to AC and Reflex saves.

A hummingbird’s feather.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('fox-s-cunning', 'Fox’s Cunning', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 min./Nivel', 'Voluntad anula (harmless)', 'Sí', 'The transmuted creature becomes smarter. The spell grants a +4 enhancement bonus to Intelligence, adding the usual benefits to Intelligence-based skill checks and other uses of the Intelligence modifier. Wizards (and other spellcasters who rely on Intelligence) affected by this spell do not gain any additional bonus spells for the increased Intelligence, but the save DCs for spells they cast while under this spell’s effect do increase. This spell doesn’t grant extra skill points.

A few hairs, or a pinch of dung, from a fox.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('fox-s-cunning-mass', 'Fox’s Cunning, Mass', 'Transmutación', NULL, NULL, NULL, 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature/Nivel, No two of which can be more than 30 ft. apart', NULL, NULL, NULL, NULL, 'No', 'This spell functions like fox’s cunning, except that it affects multiple creatures.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('freedom', 'Freedom', 'Abjuración', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels) or see text', 'One creature', NULL, NULL, 'Instantáneo', 'Voluntad anula (harmless)', 'Sí', 'The subject is freed from spells and effects that restrict its movement, including binding, entangle, grappling, imprisonment, maze, paralysis, petrification, pinning, sleep, slow, stunning, temporal stasis, and web. To free a creature from imprisonment or maze, you must know its name and background, and you must cast this spell at the spot where it was entombed or banished into the maze.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('freedom-of-movement', 'Freedom of Movement', 'Abjuración', NULL, NULL, '1 standard action', 'Personal or Toque', 'You or creature touched', NULL, NULL, '10 min./Nivel', 'Voluntad anula (harmless)', 'Sí (harmless)', 'This spell enables you or a creature you touch to move and attack normally for the duration of the spell, even under the influence of magic that usually impedes movement, such as paralysis, solid fog, slow, and web. The subject automatically succeeds on any grapple check made to resist a grapple attempt, as well as on grapple checks or Escape Artist checks made to escape a grapple or a pin.

The spell also allows the subject to move and attack normally while underwater, even with slashing weapons such as axes and swords or with bludgeoning weapons such as flails, hammers, and maces, provided that the weapon is wielded in the hand rather than hurled. The freedom of movement spell does not, however, allow water breathing.

A leather thong, bound around the arm or a similar appendage.', NULL, NULL, NULL, true, true, true, false, true, false),
  ('freezing-sphere', 'Freezing Sphere', 'Evocación', NULL, ARRAY['Frío']::TEXT[], '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, NULL, NULL, 'Instantáneo or 1 round/Nivel; see text', 'Reflejos mitad; see text', 'Sí', 'Freezing sphere creates a frigid globe of cold energy that streaks from your fingertips to the location you select, where it explodes in a 10-foot-radius burst, dealing 1d6 points of cold damage per caster level (maximum 15d6) to each creature in the area. An elemental (water) creature instead takes 1d8 points of cold damage per caster level (maximum 15d8).

If the freezing sphere strikes a body of water or a liquid that is principally water (not including water-based creatures), it freezes the liquid to a depth of 6 inches over an area equal to 100 square feet (a 10-foot square) per caster level (maximum 1,500 square feet). This ice lasts for 1 round per caster level. Creatures that were swimming on the surface of frozen water become trapped in the ice. Attempting to break free is a full-round action. A trapped creature must make a DC 25 Strength check or a DC 25 Escape Artist check to do so.

You can refrain from firing the globe after completing the spell, if you wish. Treat this as a touch spell for which you are holding the charge. You can hold the charge for as long as 1 round per level, at the end of which time the freezing sphere bursts centered on you (and you receive no saving throw to resist its effect). Firing the globe in a later round is a standard action.

A small crystal sphere.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('gaseous-form', 'Gaseous Form', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Willing corporeal creature touched', NULL, NULL, '2 min./Nivel (D)', 'Ninguna', 'No', 'A gaseous creature can’t run, but it can fly at a speed of 10 feet (maneuverability perfect). It can pass through small holes or narrow openings, even mere cracks, with all it was wearing or holding in its hands, as long as the spell persists. The creature is subject to the effects of wind, and it can’t enter water or other liquid. It also can’t manipulate objects or activate items, even those carried along with its gaseous form. Continuously active items remain active, though in some cases their effects may be moot.

A bit of gauze and a wisp of smoke.', NULL, 'The subject and all its gear become insubstantial, misty, and translucent. Its material armor (including natural armor) becomes worthless, though its size, Dexterity, deflection bonuses, and armor bonuses from force effects still apply. The subject gains damage reduction 10/magic and becomes immune to poison and critical hits. It can’t attack or cast spells with verbal, somatic, material, or components while in gaseous form. (This does not rule out the use of certain spells that the subject may have prepared using the feats Silent Spell, Still Spell, and Eschew Materials.) The subject also loses supernatural abilities while in gaseous form. If it has a touch spell ready to use, that spell is discharged harmlessly when the gaseous form spell takes effect.', NULL, false, true, false, false, false, false),
  ('gate', 'Gate', 'Conjuración', 'Creación or Llamada', NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'See text', 'Instantáneo or Concentración (up to 1 round/Nivel); see text', 'Ninguna', 'No', 'Casting a gate spell has two effects. First, it creates an interdimensional connection between your plane of existence and a plane you specify, allowing travel between those two planes in either direction.

Second, you may then call a particular individual or kind of being through the gate.

The gate itself is a circular hoop or disk from 5 to 20 feet in diameter (caster’s choice), oriented in the direction you desire when it comes into existence (typically vertical and facing you). It is a two-dimensional window looking into the plane you specified when casting the spell, and anyone or anything that moves through is shunted instantly to the other side.

A gate has a front and a back. Creatures moving through the gate from the front are transported to the other plane; creatures moving through it from the back are not.

As a mode of planar travel, a gate spell functions much like a plane shift spell, except that the gate opens precisely at the point you desire (a creation effect). Deities and other beings who rule a planar realm can prevent a gate from opening in their presence or personal demesnes if they so desire. Travelers need not join hands with you—anyone who chooses to step through the portal is transported. A gate cannot be opened to another point on the same plane; the spell works only for interplanar travel.

You may hold the gate open only for a brief time (no more than 1 round per caster level), and you must concentrate on doing so, or else the interplanar connection is severed.

If you choose to call a kind of creature instead of a known individual you may call either a single creature (of any HD) or several creatures. You can call and control several creatures as long as their HD total does not exceed your caster level. In the case of a single creature, you can control it if its HD do not exceed twice your caster level. A single creature with more HD than twice your caster level can’t be controlled. Deities and unique beings cannot be controlled in any event. An uncontrolled being acts as it pleases, making the calling of such creatures rather dangerous. An uncontrolled being may return to its home plane at any time.

A controlled creature can be commanded to perform a service for you. Such services fall into two categories: immediate tasks and contractual service. Fighting for you in a single battle or taking any other actions that can be accomplished within 1 round per caster level counts as an immediate task; you need not make any agreement or pay any reward for the creature’s help. The creature departs at the end of the spell.

If you choose to exact a longer or more involved form of service from a called creature, you must offer some fair trade in return for that service. The service exacted must be reasonable with respect to the promised favor or reward; see the lesser planar ally spell for appropriate rewards. (Some creatures may want their payment in “livestock” rather than in coin, which could involve complications.) Immediately upon completion of the service, the being is transported to your vicinity, and you must then and there turn over the promised reward. After this is done, the creature is instantly freed to return to its own plane.

Failure to fulfill the promise to the letter results in your being subjected to service by the creature or by its liege and master, at the very least. At worst, the creature or its kin may attack you.

Note: When you use a calling spell such as gate to call an air, chaotic, earth, evil, fire, good, lawful, or water creature, it becomes a spell of that type.

1,000 XP (only for the calling creatures function).', NULL, NULL, 'The second effect of the gate spell is to call an extraplanar creature to your aid (a calling effect). By naming a particular being or kind of being as you cast the spell, you cause the gate to open in the immediate vicinity of the desired creature and pull the subject through, willing or unwilling. Deities and unique beings are under no compulsion to come through the gate, although they may choose to do so of their own accord. This use of the spell creates a gate that remains open just long enough to transport the called creatures. This use of the spell has an (see below).', true, true, false, false, false, false),
  ('geas-lesser', 'Geas, Lesser', 'Encantamiento', 'Compulsión', ARRAY['Dependiente del Lenguaje, Afecta la Mente']::TEXT[], '1 round', 'Cercano (25 ft. + 5 ft./2 levels)', 'One living creature with 7 HD or less', NULL, NULL, 'One day/Nivel or until discharged (D)', 'Voluntad anula', 'Sí', 'A lesser geas places a magical command on a creature to carry out some service or to refrain from some action or course of activity, as desired by you. The creature must have 7 or fewer Hit Dice and be able to understand you. While a geas cannot compel a creature to kill itself or perform acts that would result in certain death, it can cause almost any other course of activity.

The geased creature must follow the given instructions until the geas is completed, no matter how long it takes.

If the instructions involve some open-ended task that the recipient cannot complete through his own actions the spell remains in effect for a maximum of one day per caster level. A clever recipient can subvert some instructions:

If the subject is prevented from obeying the lesser geas for 24 hours, it takes a -2 penalty to each of its ability scores. Each day, another -2 penalty accumulates, up to a total of -8. No ability score can be reduced to less than 1 by this effect. The ability score penalties are removed 24 hours after the subject resumes obeying the lesser geas.

A lesser geas (and all ability score penalties) can be ended by break enchantment, limited wish, remove curse, miracle, or wish. Dispel magic does not affect a lesser geas.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('geas-quest', 'Geas/Quest', 'Encantamiento', 'Compulsión', ARRAY['Dependiente del Lenguaje, Afecta la Mente']::TEXT[], '10 minutes', NULL, 'One living creature', NULL, NULL, NULL, 'Ninguna', 'No', 'This spell functions similarly to lesser geas, except that it affects a creature of any HD and allows no saving throw.

Instead of taking penalties to ability scores (as with lesser geas), the subject takes 3d6 points of damage each day it does not attempt to follow the geas/quest. Additionally, each day it must make a Fortitude saving throw or become sickened. These effects end 24 hours after the creature attempts to resume the geas/quest.

A remove curse spell ends a geas/quest spell only if its caster level is at least two higher than your caster level. Break enchantment does not end a geas/quest, but limited wish, miracle, and wish do.

Bards, sorcerers, and wizards usually refer to this spell as geas, while clerics call the same spell quest.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('gentle-repose', 'Gentle Repose', 'Nigromancia', NULL, NULL, '1 standard action', 'Toque', 'Corpse touched', NULL, NULL, 'One day/Nivel', 'Voluntad anula (object)', 'Sí (object)', 'You preserve the remains of a dead creature so that they do not decay. Doing so effectively extends the time limit on raising that creature from the dead (see raise dead). Days spent under the influence of this spell don’t count against the time limit. Additionally, this spell makes transporting a fallen comrade more pleasant.

The spell also works on severed body parts and the like.

A pinch of salt, and a copper piece for each eye the corpse has (or had).', NULL, NULL, NULL, true, true, false, false, false, false),
  ('ghost-sound', 'Ghost Sound', 'Ilusión', 'Engaño', NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Illusory sounds', '1 round/Nivel (D)', 'Voluntad incredulidad (if interacted with)', 'No', 'Ghost sound allows you to create a volume of sound that rises, recedes, approaches, or remains at a fixed place. You choose what type of sound ghost sound creates when casting it and cannot thereafter change the sound’s basic character.

The volume of sound created depends on your level. You can produce as much noise as four normal humans per caster level (maximum twenty humans). Thus, talking, singing, shouting, walking, marching, or running sounds can be created. The noise a ghost sound spell produces can be virtually any type of sound within the volume limit. A horde of rats running and squeaking is about the same volume as eight humans running and shouting. A roaring lion is equal to the noise from sixteen humans, while a roaring dire tiger is equal to the noise from twenty humans.

Ghost sound can enhance the effectiveness of a silent image spell.

Ghost sound can be made permanent with a permanency spell.

A bit of wool or a small lump of wax.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('ghoul-touch', 'Ghoul Touch', 'Nigromancia', NULL, NULL, '1 standard action', 'Toque', 'Living humanoid touched', NULL, NULL, '1d6+2 rounds', 'Fortaleza anula', 'Sí', 'Imbuing you with negative energy, this spell allows you to paralyze a single living humanoid for the duration of the spell with a successful melee touch attack.

Additionally, the paralyzed subject exudes a carrion stench that causes all living creatures (except you) in a 10-foot-radius spread to become sickened (Fortitude negates). A neutralize poison spell removes the effect from a sickened creature, and creatures immune to poison are unaffected by the stench.

A small scrap of cloth taken from clothing worn by a ghoul, or a pinch of earth from a ghoul’s lair.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('giant-vermin', 'Giant Vermin', 'Transmutación', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'Up to three vermin, No two of which can be more than 30 ft. apart', NULL, NULL, '1 min./Nivel', 'Ninguna', 'Sí', 'You turn three normal-sized centipedes, two normal-sized spiders, or a single normal-sized scorpion into larger forms. Only one type of vermin can be transmuted (so a single casting cannot affect both a centipede and a spider), and all must be grown to the same size. The size to which the vermin can be grown depends on your level; see the table.

Any giant vermin created by this spell do not attempt to harm you, but your control of such creatures is limited to simple commands (“Attack,” “Defend,” “Stop,” and so forth). Orders to attack a certain creature when it appears or guard against a particular occurrence are too complex for the vermin to understand. Unless commanded to do otherwise, the giant vermin attack whoever or whatever is near them.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('glibness', 'Glibness', 'Transmutación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '10 min./Nivel (D)', NULL, 'No', 'Your speech becomes fluent and more believable. You gain a +30 bonus on Bluff checks made to convince another of the truth of your words. (This bonus doesn’t apply to other uses of the Bluff skill, such as feinting in combat, creating a diversion to hide, or communicating a hidden message via innuendo.)

If a magical effect is used against you that would detect your lies or force you to speak the truth the user of the effect must succeed on a caster level check (1d20 + caster level) against a DC of 15 + your caster level to succeed. Failure means the effect does not detect your lies or force you to speak only the truth.', NULL, NULL, NULL, false, true, false, false, false, false),
  ('glitterdust', 'Glitterdust', 'Conjuración', 'Creación', NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, 'Creatures and objects within 10-ft.-radius spread', NULL, '1 round/Nivel', 'Voluntad anula (blinding only)', 'No', 'A cloud of golden particles covers everyone and everything in the area, causing creatures to become blinded and visibly outlining invisible things for the duration of the spell. All within the area are covered by the dust, which cannot be removed and continues to sparkle until it fades.

Any creature covered by the dust takes a -40 penalty on Hide checks.

Ground mica.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('globe-of-invulnerability', 'Globe of Invulnerability', 'Abjuración', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like lesser globe of invulnerability, except that it also excludes 4th-level spells and spell-like effects.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('globe-of-invulnerability-lesser', 'Globe of Invulnerability, Lesser', 'Abjuración', NULL, NULL, '1 standard action', '10 ft.', NULL, '10-ft.-radius spherical emanation, centered on you', NULL, '1 round/Nivel (D)', 'Ninguna', 'No', 'An immobile, faintly shimmering magical sphere surrounds you and excludes all spell effects of 3rd level or lower. The area or effect of any such spells does not include the area of the lesser globe of invulnerability. Such spells fail to affect any target located within the globe. Excluded effects include spell-like abilities and spells or spell-like effects from items. However, any type of spell can be cast through or out of the magical globe. Spells of 4th level and higher are not affected by the globe, nor are spells already in effect when the globe is cast. The globe can be brought down by a targeted dispel magic spell, but not by an area dispel magic. You can leave and return to the globe without penalty.

Note that spell effects are not disrupted unless their effects enter the globe, and even then they are merely suppressed, not dispelled.

If a given spell has more than one level depending on which character class is casting it, use the level appropriate to the caster to determine whether lesser globe of invulnerability stops it.

A glass or crystal bead that shatters at the expiration of the spell.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('glyph-of-warding', 'Glyph of Warding', 'Abjuración', NULL, NULL, '10 minutes', 'Toque', NULL, NULL, NULL, 'Permanente until discharged (D)', 'See text', 'No (object) and Sí; see text', 'This powerful inscription harms those who enter, pass, or open the warded area or object. A glyph of warding can guard a bridge or passage, ward a portal, trap a chest or box, and so on.

You set the conditions of the ward. Typically, any creature entering the warded area or opening the warded object without speaking a password (which you set when casting the spell) is subject to the magic it stores. Alternatively or in addition to a password trigger, glyphs can be set according to physical characteristics (such as height or weight) or creature type, subtype, or kind. Glyphs can also be set with respect to good, evil, law, or chaos, or to pass those of your religion. They cannot be set according to class, Hit Dice, or level. Glyphs respond to invisible creatures normally but are not triggered by those who travel past them ethereally. Multiple glyphs cannot be cast on the same area. However, if a cabinet has three drawers, each can be separately warded.

When casting the spell, you weave a tracery of faintly glowing lines around the warding sigil. A glyph can be placed to conform to any shape up to the limitations of your total square footage. When the spell is completed, the glyph and tracery become nearly invisible.

Glyphs cannot be affected or bypassed by such means as physical or magical probing, though they can be dispelled. Mislead, polymorph, and nondetection (and similar magical effects) can fool a glyph, though nonmagical disguises and the like can’t. Read magic allows you to identify a glyph of warding with a DC 13 Spellcraft check. Identifying the glyph does not discharge it and allows you to know the basic nature of the glyph (version, type of damage caused, what spell is stored).

Note: Magic traps such as glyph of warding are hard to detect and disable. A rogue (only) can use the Search skill to find the glyph and Disable Device to thwart it. The DC in each case is 25 + spell level, or 28 for glyph of warding.

Depending on the version selected, a glyph either blasts the intruder or activates a spell.

A blast glyph deals 1d8 points of damage per two caster levels (maximum 5d8) to the intruder and to all within 5 feet of him or her. This damage is acid, cold, fire, electricity, or sonic (caster’s choice, made at time of casting). Each creature affected can attempt a Reflex save to take half damage. Spell resistance applies against this effect.

You can store any harmful spell of 3rd level or lower that you know. All level-dependent features of the spell are based on your caster level at the time of casting the glyph. If the spell has a target, it targets the intruder. If the spell has an area or an amorphous effect the area or effect is centered on the intruder. If the spell summons creatures, they appear as close as possible to the intruder and attack. Saving throws and spell resistance operate as normal, except that the DC is based on the level of the spell stored in the glyph.

You trace the glyph with incense, which must first be sprinkled with powdered diamond worth at least 200 gp.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('glyph-of-warding-greater', 'Glyph of Warding, Greater', 'Abjuración', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like glyph of warding, except that a greater blast glyph deals up to 10d8 points of damage, and a greater spell glyph can store a spell of 6th level or lower.

You trace the glyph with incense, which must first be sprinkled with powdered diamond worth at least 400 gp.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('goodberry', 'Goodberry', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', '2d4 fresh berries touched', NULL, NULL, 'One day/Nivel', 'Ninguna', 'Sí', 'Casting goodberry upon a handful of freshly picked berries makes 2d4 of them magical. You (as well as any other druid of 3rd or higher level) can immediately discern which berries are affected. Each transmuted berry provides nourishment as if it were a normal meal for a Medium creature. The berry also cures 1 point of damage when eaten, subject to a maximum of 8 points of such curing in any 24-hour period.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('good-hope', 'Good Hope', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'One living creature/Nivel, No two of which may be more than 30 ft. apart', NULL, NULL, '1 min./Nivel', 'Voluntad anula (harmless)', 'Sí (harmless)', 'This spell instills powerful hope in the subjects. Each affected creature gains a +2 morale bonus on saving throws, attack rolls, ability checks, skill checks, and weapon damage rolls.

Good hope counters and dispels crushing despair.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('grasping-hand', 'Grasping Hand', 'Evocación', NULL, ARRAY['Fuerza']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like interposing hand, except the hand can also grapple one opponent that you select. The grasping hand gets one grapple attack per round.

Its attack bonus to make contact equals your caster level + your Intelligence, Wisdom, or Charisma modifier (for wizards, clerics, and sorcerers, respectively), +10 for the hand’s Strength score (31), -1 for being Large. Its grapple bonus is this same figure, except with a +4 modifier for being Large instead of -1. The hand holds but does not harm creatures it grapples.

Directing the spell to a new target is a move action.

The grasping hand can also bull rush an opponent as forceful hand does, but at a +16 bonus on the Strength check (+10 for Strength 31, +4 for being Large, and a +2 bonus for charging, which it always gets), or interpose itself as interposing hand does.

Clerics who cast this spell name it for their deities.

A leather glove.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('grease', 'Grease', 'Conjuración', 'Creación', NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, NULL, '1 round/Nivel (D)', 'See text', 'No', 'A grease spell covers a solid surface with a layer of slippery grease. Any creature in the area when the spell is cast must make a successful Reflex save or fall. This save is repeated on your turn each round that the creature remains within the area. A creature can walk within or through the area of grease at half normal speed with a DC 10 Balance check. Failure means it can’t move that round (and must then make a Reflex save or fall), while failure by 5 or more means it falls (see the Balance skill for details).

The spell can also be used to create a greasy coating on an item. Material objects not in use are always affected by this spell, while an object wielded or employed by a creature receives a Reflex saving throw to avoid the effect. If the initial saving throw fails, the creature immediately drops the item. A saving throw must be made in each round that the creature attempts to pick up or use the greased item. A creature wearing greased armor or clothing gains a +10 circumstance bonus on Escape Artist checks and on grapple checks made to resist or escape a grapple or to escape a pin.

A bit of pork rind or butter.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('greater-spell-name', 'Greater (Spell Name)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'Any spell whose name begins with greater is alphabetized in this chapter according to the second word of the spell name. Thus, the description of a greater spell appears near the description of the spell on which it is based. Spell chains that have greater spells in them include those based on the spells arcane sight, command, dispel magic, glyph of warding, invisibility, magic fang, magic weapon, planar ally, planar binding, prying eyes, restoration, scrying, shadow conjuration, shadow evocation, shout, and teleport.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('guards-and-wards', 'Guards and Wards', 'Abjuración', NULL, NULL, '30 minutes', 'Anywhere within the Área to be warded', NULL, 'Up to 200 sq. ft./Nivel (S)', NULL, '2 hours/Nivel (D)', 'See text', 'See text', 'This powerful spell is primarily used to defend your stronghold. The ward protects 200 square feet per caster level. The warded area can be as much as 20 feet high, and shaped as you desire. You can ward several stories of a stronghold by dividing the area among them; you must be somewhere within the area to be warded to cast the spell. The spell creates the following magical effects within the warded area.

Fog fills all corridors, obscuring all sight, including darkvision, beyond 5 feet. A creature within 5 feet has concealment (attacks have a 20% miss chance). Creatures farther away have total concealment (50% miss chance, and the attacker cannot use sight to locate the target). Saving Throw: None. Spell Resistance: No.

All doors in the warded area are arcane locked. Saving Throw: None. Spell Resistance: No.

Webs fill all stairs from top to bottom. These strands are identical with those created by the web spell, except that they regrow in 10 minutes if they are burned or torn away while the guards and wards spell lasts. Saving Throw: Reflex negates; see text for web. Spell Resistance: No.

Where there are choices in direction—such as a corridor intersection or side passage—a minor confusion-type effect functions so as to make it 50% probable that intruders believe they are going in the opposite direction from the one they actually chose. This is an enchantment, mind-affecting effect. Saving Throw: None. Spell Resistance: Yes.

One door per caster level is covered by a silent image to appear as if it were a plain wall. Saving Throw: Will disbelief (if interacted with). Spell Resistance: No.

In addition, you can place your choice of one of the following five magical effects.

1. Dancing lights in four corridors. You can designate a simple program that causes the lights to repeat as long as the guards and wards spell lasts. Saving Throw: None. Spell Resistance: No.

2. A magic mouth in two places. Saving Throw: None. Spell Resistance: No.

3. A stinking cloud in two places. The vapors appear in the places you designate; they return within 10 minutes if dispersed by wind while the guards and wards spell lasts. Saving Throw: Fortitude negates; see text for stinking cloud. Spell Resistance: No.

4. A gust of wind in one corridor or room. Saving Throw: Fortitude negates. Spell Resistance: Yes.

5. A suggestion in one place. You select an area of up to 5 feet square, and any creature who enters or passes through the area receives the suggestion mentally. Saving Throw: Will negates. Spell Resistance: Yes.

The whole warded area radiates strong magic of the abjuration school. A dispel magic cast on a specific effect, if successful, removes only that effect. A successful Mage’s disjunction destroys the entire guards and wards effect.

Burning incense, a small measure of brimstone and oil, a knotted string, and a small amount of blood.

A small silver rod.', NULL, NULL, NULL, true, true, true, true, false, false),
  ('guidance', 'Guidance', 'Adivinación', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 minute or until discharged', 'Voluntad anula (harmless)', 'Sí', 'This spell imbues the subject with a touch of divine guidance. The creature gets a +1 competence bonus on a single attack roll, saving throw, or skill check. It must choose to use the bonus before making the roll to which it applies.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('gust-of-wind', 'Gust of Wind', 'Evocación', NULL, ARRAY['Aire']::TEXT[], '1 standard action', '60 ft.', NULL, NULL, 'Line-shaped gust of severe wind emanating out from you to the extreme of the Alcance', '1 round', 'Fortaleza anula', 'Sí', 'This spell creates a severe blast of air (approximately 50 mph) that originates from you, affecting all creatures in its path.

A Tiny or smaller creature on the ground is knocked down and rolled 1d4×10 feet, taking 1d4 points of nonlethal damage per 10 feet. If flying, a Tiny or smaller creature is blown back 2d6×10 feet and takes 2d6 points of nonlethal damage due to battering and buffeting.

Small creatures are knocked prone by the force of the wind, or if flying are blown back 1d6×10 feet.

Medium creatures are unable to move forward against the force of the wind, or if flying are blown back 1d6×5 feet.

Large or larger creatures may move normally within a gust of wind effect.

A gust of wind can’t move a creature beyond the limit of its range.

Any creature, regardless of size, takes a -4 penalty on ranged attacks and Listen checks in the area of a gust of wind.

The force of the gust automatically extinguishes candles, torches, and similar unprotected flames. It causes protected flames, such as those of lanterns, to dance wildly and has a 50% chance to extinguish those lights.

In addition to the effects noted, a gust of wind can do anything that a sudden blast of wind would be expected to do. It can create a stinging spray of sand or dust, fan a large fire, overturn delicate awnings or hangings, heel over a small boat, and blow gases or vapors to the edge of its range.

Gust of wind can be made permanent with a permanency spell.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('hallow', 'Hallow', 'Evocación', NULL, ARRAY['Bondadoso']::TEXT[], '24 hours', 'Toque', NULL, '40-ft. radius emanating from the touched point', NULL, 'Instantáneo', 'See text', 'See text', 'Hallow makes a particular site, building, or structure a holy site. This has four major effects.

First, the site or structure is guarded by a magic circle against evil effect.

Second, all Charisma checks made to turn undead gain a +4 sacred bonus, and Charisma checks to command undead take a -4 penalty. Spell resistance does not apply to this effect. (This provision does not apply to the druid version of the spell.)

Third, any dead body interred in a hallowed site cannot be turned into an undead creature.

Finally, you may choose to fix a single spell effect to the hallowed site. The spell effect lasts for one year and functions throughout the entire site, regardless of the normal duration and area or effect. You may designate whether the effect applies to all creatures, creatures who share your faith or alignment, or creatures who adhere to another faith or alignment. At the end of the year, the chosen effect lapses, but it can be renewed or replaced simply by casting hallow again.

Spell effects that may be tied to a hallowed site include aid, bane, bless, cause fear, darkness, daylight, death ward, deeper darkness, detect evil, detect magic, dimensional anchor, discern lies, dispel magic, endure elements, freedom of movement, invisibility purge, protection from energy, remove fear, resist energy, silence, tongues, and zone of truth. Saving throws and spell resistance might apply to these spells’ effects. (See the individual spell descriptions for details.)

An area can receive only one hallow spell (and its associated spell effect) at a time. Hallow counters but does not dispel unhallow.

Herbs, oils, and incense worth at least 1,000 gp, plus 1,000 gp per level of the spell to be included in the hallowed area.', NULL, NULL, NULL, true, true, true, false, true, false),
  ('hallucinatory-terrain', 'Hallucinatory Terrain', 'Ilusión', 'Glamour', NULL, '10 minutes', 'Largo (400 ft. + 40 ft./Nivel)', NULL, 'One 30-ft. cube/Nivel (S)', NULL, '2 hours/Nivel (D)', 'Voluntad incredulidad (if interacted with)', 'No', 'You make natural terrain look, sound, and smell like some other sort of natural terrain. Structures, equipment, and creatures within the area are not hidden or changed in appearance.

A stone, a twig, and a bit of green plant.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('halt-undead', 'Halt Undead', 'Nigromancia', NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'Up to three undead creatures, No two of which can be more than 30 ft. apart', NULL, NULL, '1 round/Nivel', 'Voluntad anula (see text)', 'Sí', 'This spell renders as many as three undead creatures immobile. A nonintelligent undead creature gets no saving throw; an intelligent undead creature does. If the spell is successful, it renders the undead creature immobile for the duration of the spell (similar to the effect of hold person on a living creature). The effect is broken if the halted creatures are attacked or take damage.

A pinch of sulfur and powdered garlic.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('harm', 'Harm', 'Nigromancia', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, 'Instantáneo', 'Voluntad mitad; see text', 'Sí', 'Harm charges a subject with negative energy that deals 10 points of damage per caster level (to a maximum of 150 points at 15th level). If the creature successfully saves, harm deals half this amount, but it cannot reduce the target’s hit points to less than 1.

If used on an undead creature, harm acts like heal.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('haste', 'Haste', 'Transmutación', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature/Nivel, No two of which can be more than 30 ft. apart', NULL, NULL, '1 round/Nivel', 'Fortaleza anula (harmless)', 'Sí (harmless)', 'The transmuted creatures move and act more quickly than normal. This extra speed has several effects.

When making a full attack action, a hasted creature may make one extra attack with any weapon he is holding. The attack is made using the creature’s full base attack bonus, plus any modifiers appropriate to the situation. (This effect is not cumulative with similar effects, such as that provided by a weapon of speed, nor does it actually grant an extra action, so you can’t use it to cast a second spell or otherwise take an extra action in the round.)

A hasted creature gains a +1 bonus on attack rolls and a +1 dodge bonus to AC and Reflex saves. Any condition that makes you lose your Dexterity bonus to Armor Class (if any) also makes you lose dodge bonuses.

All of the hasted creature’s modes of movement (including land movement, burrow, climb, fly, and swim) increase by 30 feet, to a maximum of twice the subject’s normal speed using that form of movement. This increase counts as an enhancement bonus, and it affects the creature’s jumping distance as normal for increased speed.

Multiple haste effects don’t stack. Haste dispels and counters slow.

A shaving of licorice root.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('heal', 'Heal', 'Conjuración', 'Curación', NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, 'Instantáneo', 'Voluntad anula (harmless)', 'Sí (harmless)', 'Heal enables you to channel positive energy into a creature to wipe away injury and afflictions. It immediately ends any and all of the following adverse conditions affecting the Target: ability damage, blinded, confused, dazed, dazzled, deafened, diseased, exhausted, fatigued, feebleminded, insanity, nauseated, sickened, stunned, and poisoned. It also cures 10 hit points of damage per level of the caster, to a maximum of 150 points at 15th level.

Heal does not remove negative levels, restore permanently drained levels, or restore permanently drained ability score points.

If used against an undead creature, heal instead acts like harm.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('heal-mass', 'Heal, Mass', 'Conjuración', 'Curación', NULL, NULL, 'Cercano (25 ft. + 5 ft./2 levels)', 'One or more creatures, No two of which can be more than 30 ft. apart', NULL, NULL, NULL, NULL, 'No', 'This spell functions like heal, except as noted above. The maximum number of hit points restored to each creature is 250.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('heal-mount', 'Heal Mount', 'Conjuración', 'Curación', NULL, '1 standard action', 'Toque', 'Your mount touched', NULL, NULL, 'Instantáneo', 'Voluntad anula (harmless)', 'Sí (harmless)', 'This spell functions like heal, but it affects only the paladin’s special mount (typically a warhorse).', NULL, NULL, NULL, true, true, false, false, false, false),
  ('heat-metal', 'Heat Metal', 'Transmutación', NULL, ARRAY['Fuego']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'Metal equipment of one creature per two levels, No two of which can be more than 30 ft. apart; or 25 lb. of metal/Nivel, all of which must be within a 30-ft. circle', NULL, NULL, '7 rounds', 'Voluntad anula (object)', 'Sí (object)', 'Heat metal makes metal extremely warm. Unattended, nonmagical metal gets no saving throw. Magical metal is allowed a saving throw against the spell. An item in a creature’s possession uses the creature’s saving throw bonus unless its own is higher.

A creature takes fire damage if its equipment is heated. It takes full damage if its armor is affected or if it is holding, touching, wearing, or carrying metal weighing one-fifth of its weight. The creature takes minimum damage (1 point or 2 points; see the table) if it’s not wearing metal armor and the metal that it’s carrying weighs less than one-fifth of its weight.

On the first round of the spell, the metal becomes warm and uncomfortable to touch but deals no damage. The same effect also occurs on the last round of the spell’s duration. During the second (and also the next-to-last) round, intense heat causes pain and damage. In the third, fourth, and fifth rounds, the metal is searing hot, causing more damage, as shown on the table below.

Any cold intense enough to damage the creature negates fire damage from the spell (and vice versa) on a point-for-point basis. If cast underwater, heat metal deals half damage and boils the surrounding water.

Heat metal counters and dispels chill metal.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('helping-hand', 'Helping Hand', 'Evocación', NULL, NULL, '1 standard action', '5 miles', NULL, NULL, 'Ghostly hand', '1 hour/Nivel', 'Ninguna', 'No', 'You create the ghostly image of a hand, which you can send to find a creature within 5 miles. The hand then beckons to that creature and leads it to you if the creature is willing to follow.

When the spell is cast, the hand appears in front of you. You then specify a person (or any creature) by physical description, which can include race, gender, and appearance but not ambiguous factors such as level, alignment, or class. When the description is complete, the hand streaks off in search of a subject that fits the description. The amount of time it takes to find the subject depends on how far away she is.

Once the hand locates the subject, it beckons the creature to follow it. If the subject does so, the hand points in your direction, indicating the most direct feasible route. The hand hovers 10 feet in front of the subject, moving before it at a speed of as much as 240 feet per round. Once the hand leads the subject back to you, it disappears.

The subject is not compelled to follow the hand or act in any particular way toward you. If the subject chooses not to follow, the hand continues to beckon for the duration of the spell, then disappears. If the spell expires while the subject is en route to you, the hand disappears; the subject must then rely on her own devices to locate you.

If more than one subject in a 5-mile radius meets the description, the hand locates the closest creature. If that creature refuses to follow the hand, the hand does not seek out a second subject.

If, at the end of 4 hours of searching, the hand has found no subject that matches the description within 5 miles, it returns to you, displays an outstretched palm (indicating that no such creature was found), and disappears.

The ghostly hand has no physical form. It is invisible to anyone except you and a potential subject. It cannot engage in combat or execute any other task aside from locating a subject and leading it back to you. The hand can’t pass through solid objects but can ooze through small cracks and slits. The hand cannot travel more than 5 miles from the spot it appeared when you cast the spell.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('heroes-feast', 'Heroes’ Feast', 'Conjuración', 'Creación', NULL, '10 minutes', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Feast for one creature/Nivel', '1 hour plus 12 hours; see text', 'Ninguna', 'No', 'You bring forth a great feast, including a magnificent table, chairs, service, and food and drink. The feast takes 1 hour to consume, and the beneficial effects do not set in until this hour is over. Every creature partaking of the feast is cured of all diseases, sickness, and nausea; becomes immune to poison for 12 hours; and gains 1d8 temporary hit points +1 point per two caster levels (maximum +10) after imbibing the nectar-like beverage that is part of the feast. The ambrosial food that is consumed grants each creature that partakes a +1 morale bonus on attack rolls and Will saves and immunity to fear effects for 12 hours.

If the feast is interrupted for any reason, the spell is ruined and all effects of the spell are negated.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('heroism', 'Heroism', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '10 min./Nivel', 'Voluntad anula (harmless)', 'Sí (harmless)', 'This spell imbues a single creature with great bravery and morale in battle. The target gains a +2 morale bonus on attack rolls, saves, and skill checks.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('heroism-greater', 'Heroism, Greater', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], NULL, NULL, NULL, NULL, NULL, '1 min./Nivel', NULL, 'No', 'This spell functions like heroism, except the creature gains a +4 morale bonus on attack rolls, saves, and skill checks, immunity to fear effects, and temporary hit points equal to your caster level (maximum 20).', NULL, NULL, NULL, false, false, false, false, false, false),
  ('hide-from-animals', 'Hide from Animals', 'Abjuración', NULL, NULL, '1 standard action', 'Toque', 'One creature touched/Nivel', NULL, NULL, '10 min./Nivel (D)', 'Voluntad anula (harmless)', 'Sí', 'Animals cannot see, hear, or smell the warded creatures. Even extraordinary or supernatural sensory capabilities, such as blindsense, blindsight, scent, and tremorsense, cannot detect or locate warded creatures. Animals simply act as though the warded creatures are not there. If a warded character touches an animal or attacks any creature, even with a spell, the spell ends for all recipients.', NULL, NULL, NULL, false, true, false, false, true, false),
  ('hide-from-undead', 'Hide from Undead', 'Abjuración', NULL, NULL, '1 standard action', 'Toque', 'One touched creature/Nivel', NULL, NULL, '10 min./Nivel (D)', 'Voluntad anula (harmless); see text', 'Sí', 'Undead cannot see, hear, or smell the warded creatures. Even extraordinary or supernatural sensory capabilities, such as blindsense, blindsight, scent, and tremorsense, cannot detect or locate warded creatures. Nonintelligent undead creatures are automatically affected and act as though the warded creatures are not there. An intelligent undead creature gets a single Will saving throw. If it fails, the subject can’t see any of the warded creatures. However, if it has reason to believe unseen opponents are present, it can attempt to find or strike them. If a warded creature attempts to turn or command undead, touches an undead creature, or attacks any creature (even with a spell), the spell ends for all recipients.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('hideous-laughter', 'Hideous Laughter', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature; see text', NULL, NULL, '1 round/Nivel', 'Voluntad anula', 'Sí', 'This spell afflicts the subject with uncontrollable laughter. It collapses into gales of manic laughter, falling prone. The subject can take no actions while laughing, but is not considered helpless. After the spell ends, it can act normally.

A creature with an Intelligence score of 2 or lower is not affected. A creature whose type is different from the caster’s receives a +4 bonus on its saving throw, because humor doesn’t “translate” well.

Tiny tarts that are thrown at the target and a feather that is waved in the air.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('hold-animal', 'Hold Animal', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], NULL, NULL, 'One animal', NULL, NULL, NULL, NULL, 'No', 'This spell functions like hold person, except that it affects an animal instead of a humanoid.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('hold-monster', 'Hold Monster', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], NULL, NULL, 'One living creature', NULL, NULL, NULL, NULL, 'No', 'This spell functions like hold person, except that it affects any living creature that fails its Will save.

One hard metal bar or rod, which can be as small as a three-penny nail.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('hold-monster-mass', 'Hold Monster, Mass', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], NULL, NULL, 'One or more creatures, No two of which can be more than 30 ft. apart', NULL, NULL, NULL, NULL, 'No', 'This spell functions like hold person, except that it affects multiple creatures and holds any living creature that fails its Will save.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('hold-person', 'Hold Person', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'One humanoid creature', NULL, NULL, '1 round/Nivel (D); see text', 'Voluntad anula; see text', 'Sí', 'The subject becomes paralyzed and freezes in place. It is aware and breathes normally but cannot take any actions, even speech. Each round on its turn, the subject may attempt a new saving throw to end the effect. (This is a full-round action that does not provoke attacks of opportunity.)

A winged creature who is paralyzed cannot flap its wings and falls. A swimmer can’t swim and may drown.

A small, straight piece of iron.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('hold-person-mass', 'Hold Person, Mass', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], NULL, NULL, 'One or more humanoid creatures, No two of which can be more than 30 ft. apart', NULL, NULL, NULL, NULL, 'No', 'This spell functions like hold person, except as noted above.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('hold-portal', 'Hold Portal', 'Abjuración', NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'One portal, up to 20 sq. ft./Nivel', NULL, NULL, '1 min./Nivel (D)', 'Ninguna', 'No', 'This spell magically holds shut a door, gate, window, or shutter of wood, metal, or stone. The magic affects the portal just as if it were securely closed and normally locked. A knock spell or a successful dispel magic spell can negate a hold portal spell.

For a portal affected by this spell, add 5 to the normal DC for forcing open the portal.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('holy-aura', 'Holy Aura', 'Abjuración', NULL, ARRAY['Bondadoso']::TEXT[], '1 standard action', '20 ft.', 'One creature/Nivel in a 20-ft.-radius burst centered on you', NULL, NULL, '1 round/Nivel (D)', 'See text', 'Sí (harmless)', 'A brilliant divine radiance surrounds the subjects, protecting them from attacks, granting them resistance to spells cast by evil creatures, and causing evil creatures to become blinded when they strike the subjects. This abjuration has four effects.

First, each warded creature gains a +4 deflection bonus to AC and a +4 resistance bonus on saves. Unlike protection from evil, this benefit applies against all attacks, not just against attacks by evil creatures.

Second, each warded creature gains spell resistance 25 against evil spells and spells cast by evil creatures.

Third, the abjuration blocks possession and mental influence, just as protection from evil does.

Finally, if an evil creature succeeds on a melee attack against a warded creature, the offending attacker is blinded (Fortitude save negates, as blindness/deafness, but against holy aura’s save DC).

A tiny reliquary containing some sacred relic. The reliquary costs at least 500 gp.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('holy-smite', 'Holy Smite', 'Evocación', NULL, ARRAY['Bondadoso']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, '20-ft.-radius burst', NULL, 'Instantáneo (1 round); see text', 'Voluntad parcial; see text', 'Sí', 'You draw down holy power to smite your enemies. Only evil and neutral creatures are harmed by the spell; good creatures are unaffected.

The spell deals 1d8 points of damage per two caster levels (maximum 5d8) to each evil creature in the area (or 1d6 points of damage per caster level, maximum 10d6, to an evil outsider) and causes it to become blinded for 1 round. A successful Will saving throw reduces damage to half and negates the blinded effect.

The spell deals only half damage to creatures who are neither good nor evil, and they are not blinded. Such a creature can reduce that damage by half (down to one-quarter of the roll) with a successful Will save.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('holy-sword', 'Holy Sword', 'Evocación', NULL, ARRAY['Bondadoso']::TEXT[], '1 standard action', 'Toque', 'Melee weapon touched', NULL, NULL, '1 round/Nivel', 'Ninguna', 'No', 'This spell allows you to channel holy power into your sword, or any other melee weapon you choose. The weapon acts as a +5 holy weapon (+5 enhancement bonus on attack and damage rolls, extra 2d6 damage against evil opponents). It also emits a magic circle against evil effect (as the spell). If the magic circle ends, the sword creates a new one on your turn as a free action. The spell is automatically canceled 1 round after the weapon leaves your hand. You cannot have more than one holy sword at a time.

If this spell is cast on a magic weapon, the powers of the spell supersede any that the weapon normally has, rendering the normal enhancement bonus and powers of the weapon inoperative for the duration of the spell. This spell is not cumulative with bless weapon or any other spell that might modify the weapon in any way.

This spell does not work on artifacts.

Note: A masterwork weapon’s bonus to attack does not stack with an enhancement bonus to attack.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('holy-word', 'Holy Word', 'Evocación', NULL, ARRAY['Bondadoso, Sónico']::TEXT[], '1 standard action', '40 ft.', NULL, 'Nongood creatures in a 40-ft.-radius spread centered on you', NULL, 'Instantáneo', 'Ninguna or Voluntad anula; see text', 'Sí', 'Any nongood creature within the area that hears the holy word suffers the following ill effects.

The effects are cumulative and concurrent. No saving throw is allowed against these effects.

The creature is deafened for 1d4 rounds.

The creature is blinded for 2d4 rounds.

The creature is paralyzed and helpless for 1d10 minutes.

Living creatures die. Undead creatures are destroyed.

Furthermore, if you are on your home plane when you cast this spell, nongood extraplanar creatures within the area are instantly banished back to their home planes. Creatures so banished cannot return for at least 24 hours. This effect takes place regardless of whether the creatures hear the holy word. The banishment effect allows a Will save (at a -4 penalty) to negate.

Creatures whose HD exceed your caster level are unaffected by holy word.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('horrid-wilting', 'Horrid Wilting', 'Nigromancia', NULL, NULL, '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', 'Living creatures, No two of which can be more than 60 ft. apart', NULL, NULL, 'Instantáneo', 'Fortaleza mitad', 'Sí', 'This spell evaporates moisture from the body of each subject living creature, dealing 1d6 points of damage per caster level (maximum 20d6). This spell is especially devastating to water elementals and plant creatures, which instead take 1d8 points of damage per caster level (maximum 20d8).

A bit of sponge.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('hypnotic-pattern', 'Hypnotic Pattern', 'Ilusión', 'Patrón', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Colorful lights in a 10-ft.-radius spread', 'Concentración + 2 rounds', 'Voluntad anula', 'Sí', 'A twisting pattern of subtle, shifting colors weaves through the air, fascinating creatures within it. Roll 2d4 and add your caster level (maximum 10) to determine the total number of Hit Dice of creatures affected. Creatures with the fewest HD are affected first; and, among creatures with equal HD, those who are closest to the spell’s point of origin are affected first. Hit Dice that are not sufficient to affect a creature are wasted. Affected creatures become fascinated by the pattern of colors. Sightless creatures are not affected.

A wizard or sorcerer need not utter a sound to cast this spell, but a bard must sing, play music, or recite a rhyme as a verbal component.

A glowing stick of incense or a crystal rod filled with phosphorescent material.', NULL, NULL, NULL, false, true, false, false, false, false),
  ('hypnotism', 'Hypnotism', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 round', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, 'Several living creatures, No two of which may be more than 30 ft. apart', NULL, '2d4 rounds (D)', 'Voluntad anula', 'Sí', 'Your gestures and droning incantation fascinate nearby creatures, causing them to stop and stare blankly at you. In addition, you can use their rapt attention to make your suggestions and requests seem more plausible. Roll 2d4 to see how many total Hit Dice of creatures you affect. Creatures with fewer HD are affected before creatures with more HD. Only creatures that can see or hear you are affected, but they do not need to understand you to be fascinated.

If you use this spell in combat, each target gains a +2 bonus on its saving throw. If the spell affects only a single creature not in combat at the time, the saving throw has a penalty of -2.

While the subject is fascinated by this spell, it reacts as though it were two steps more friendly in attitude. This allows you to make a single request of the affected creature (provided you can communicate with it). The request must be brief and reasonable. Even after the spell ends, the creature retains its new attitude toward you, but only with respect to that particular request.

A creature that fails its saving throw does not remember that you enspelled it.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('ice-storm', 'Ice Storm', 'Evocación', NULL, ARRAY['Frío']::TEXT[], '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, 'Cylinder (20-ft. radius, 40 ft. high)', NULL, '1 full round', 'Ninguna', 'Sí', 'Great magical hailstones pound down for 1 full round, dealing 3d6 points of bludgeoning damage and 2d6 points of cold damage to every creature in the area. A -4 penalty applies to each Listen check made within the ice storm’s effect, and all land movement within its area is at half speed. At the end of the duration, the hail disappears, leaving no aftereffects (other than the damage dealt).

A pinch of dust and a few drops of water.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('identify', 'Identify', 'Adivinación', NULL, NULL, '1 hour', 'Toque', 'One touched object', NULL, NULL, 'Instantáneo', 'Ninguna', 'No', 'The spell determines all magic properties of a single magic item, including how to activate those functions (if appropriate), and how many charges are left (if any).

Identify does not function when used on an artifact.

A pearl of at least 100 gp value, crushed and stirred into wine with an owl feather; the infusion must be drunk prior to spellcasting.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('illusory-script', 'Illusory Script', 'Ilusión', 'Fantasma', ARRAY['Afecta la Mente']::TEXT[], '1 minute or longer; see text', 'Toque', 'One touched object weighing No more than 10 lb.', NULL, NULL, 'One day/Nivel (D)', 'Voluntad anula; see text', 'Sí', 'You write instructions or other information on parchment, paper, or any suitable writing material. The illusory script appears to be some form of foreign or magical writing. Only the person (or people) designated by you at the time of the casting are able to read the writing; it’s unintelligible to any other character, although an illusionist recognizes it as illusory script.

Any unauthorized creature attempting to read the script triggers a potent illusory effect and must make a saving throw. A successful saving throw means the creature can look away with only a mild sense of disorientation. Failure means the creature is subject to a suggestion implanted in the script by you at the time the illusory script spell was cast. The suggestion lasts only 30 minutes. Typical suggestions include “Close the book and leave,” “Forget the existence of the book,” and so forth. If successfully dispelled by dispel magic, the illusory script and its secret message disappear. The hidden message can be read by a combination of the true seeing spell with the read magic or comprehend languages spell.

The casting time depends on how long a message you wish to write, but it is always at least 1 minute.

A lead-based ink (cost of not less than 50 gp).', NULL, NULL, NULL, true, true, true, false, false, false),
  ('illusory-wall', 'Illusory Wall', 'Ilusión', 'Engaño', NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Image 1 ft. by 10 ft. by 10 ft.', 'Permanente', 'Voluntad incredulidad (if interacted with)', 'No', 'This spell creates the illusion of a wall, floor, ceiling, or similar surface. It appears absolutely real when viewed, but physical objects can pass through it without difficulty. When the spell is used to hide pits, traps, or normal doors, any detection abilities that do not require sight work normally. Touch or a probing search reveals the true nature of the surface, though such measures do not cause the illusion to disappear.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('imbue-with-spell-ability', 'Imbue with Spell Ability', 'Evocación', NULL, NULL, '10 minutes', 'Toque', 'Creature touched; see text', NULL, NULL, 'Permanente until discharged (D)', 'Voluntad anula (harmless)', 'Sí (harmless)', 'You transfer some of your currently prepared spells, and the ability to cast them, to another creature. Only a creature with an Intelligence score of at least 5 and a Wisdom score of at least 9 can receive this bestowal. Only cleric spells from the schools of abjuration, divination, and conjuration (healing) can be transferred. The number and level of spells that the subject can be granted depends on its Hit Dice; even multiple castings of imbue with spell ability can’t exceed this limit.

The transferred spell’s variable characteristics (range, duration, area, and the like) function according to your level, not the level of the recipient.

Once you cast imbue with spell ability, you cannot prepare a new 4th-level spell to replace it until the recipient uses the imbued spells or is slain, or until you dismiss the imbue with spell ability spell. In the meantime, you remain responsible to your deity or your principles for the use to which the spell is put. If the number of 4th-level spells you can cast decreases, and that number drops below your current number of active imbue with spell ability spells, the more recently cast imbued spells are dispelled.', 'To cast a spell with a verbal component, the subject must be able to speak. To cast a spell with a somatic component, it must have humanlike hands. To cast a spell with a or focus, it must have the materials or focus.', NULL, NULL, true, true, false, false, true, false),
  ('implosion', 'Implosion', 'Evocación', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One corporeal creature/round', NULL, NULL, 'Concentración (up to 4 rounds)', 'Fortaleza anula', 'Sí', 'You create a destructive resonance in a corporeal creature’s body. For each round you concentrate, you cause one creature to collapse in on itself, killing it. (This effect, being instantaneous, cannot be dispelled.)

You can target a particular creature only once with each casting of the spell.

Implosion has no effect on creatures in gaseous form or on incorporeal creatures.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('imprisonment', 'Imprisonment', 'Abjuración', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, 'Instantáneo', 'Voluntad anula; see text', 'Sí', 'When you cast imprisonment and touch a creature, it is entombed in a state of suspended animation (see the temporal stasis spell) in a small sphere far beneath the surface of the earth. The subject remains there unless a freedom spell is cast at the locale where the imprisonment took place. Magical search by a crystal ball, a locate object spell, or some other similar divination does not reveal the fact that a creature is imprisoned, but discern location does. A wish or miracle spell will not free the recipient, but will reveal where it is entombed. If you know the target’s name and some facts about its life, the target takes a -4 penalty on its save.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('incendiary-cloud', 'Incendiary Cloud', 'Conjuración', 'Creación', ARRAY['Fuego']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Cloud spreads in 20-ft. radius, 20 ft. high', '1 round/Nivel', 'Reflejos mitad; see text', 'No', 'An incendiary cloud spell creates a cloud of roiling smoke shot through with white-hot embers. The smoke obscures all sight as a fog cloud does. In addition, the white-hot embers within the cloud deal 4d6 points of fire damage to everything within the cloud on your turn each round. All targets can make Reflex saves each round to take half damage.

As with a cloudkill spell, the smoke moves away from you at 10 feet per round. Figure out the smoke’s new spread each round based on its new point of origin, which is 10 feet farther away from where you were when you cast the spell. By concentrating, you can make the cloud (actually its point of origin) move as much as 60 feet each round. Any portion of the cloud that would extend beyond your maximum range dissipates harmlessly, reducing the remainder’s spread thereafter.

As with fog cloud, wind disperses the smoke, and the spell can’t be cast underwater.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('inflict-critical-wounds', 'Inflict Critical Wounds', 'Nigromancia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like inflict light wounds, except that you deal 4d8 points of damage +1 point per caster level (maximum +20).', NULL, NULL, NULL, false, false, false, false, false, false),
  ('inflict-critical-wounds-mass', 'Inflict Critical Wounds, Mass', 'Nigromancia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like mass inflict light wounds, except that it deals 4d8 points of damage +1 point per caster level (maximum +40).', NULL, NULL, NULL, false, false, false, false, false, false),
  ('inflict-light-wounds', 'Inflict Light Wounds', 'Nigromancia', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, 'Instantáneo', 'Voluntad mitad', 'Sí', 'When laying your hand upon a creature, you channel negative energy that deals 1d8 points of damage +1 point per caster level (maximum +5).

Since undead are powered by negative energy, this spell cures such a creature of a like amount of damage, rather than harming it.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('inflict-light-wounds-mass', 'Inflict Light Wounds, Mass', 'Nigromancia', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature/Nivel, No two of which can be more than 30 ft. apart', NULL, NULL, 'Instantáneo', 'Voluntad mitad', 'Sí', 'Negative energy spreads out in all directions from the point of origin, dealing 1d8 points of damage +1 point per caster level (maximum +25) to nearby living enemies.

Like other inflict spells, mass inflict light wounds cures undead in its area rather than damaging them. A cleric capable of spontaneously casting inflict spells can also spontaneously cast mass inflict spells.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('inflict-minor-wounds', 'Inflict Minor Wounds', 'Nigromancia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Voluntad anula', 'No', 'This spell functions like inflict light wounds, except that you deal 1 point of damage and a Will save negates the damage instead of halving it.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('inflict-moderate-wounds', 'Inflict Moderate Wounds', 'Nigromancia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like inflict light wounds, except that you deal 2d8 points of damage +1 point per caster level (maximum +10).', NULL, NULL, NULL, false, false, false, false, false, false),
  ('inflict-moderate-wounds-mass', 'Inflict Moderate Wounds, Mass', 'Nigromancia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like mass inflict light wounds, except that it deals 2d8 points of damage +1 point per caster level (maximum +30).', NULL, NULL, NULL, false, false, false, false, false, false),
  ('inflict-serious-wounds', 'Inflict Serious Wounds', 'Nigromancia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like inflict light wounds, except that you deal 3d8 points of damage +1 point per caster level (maximum +15).', NULL, NULL, NULL, false, false, false, false, false, false),
  ('inflict-serious-wounds-mass', 'Inflict Serious Wounds, Mass', 'Nigromancia', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like mass inflict light wounds, except that it deals 3d8 points of damage +1 point per caster level (maximum +35).', NULL, NULL, NULL, false, false, false, false, false, false),
  ('insanity', 'Insanity', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'One living creature', NULL, NULL, 'Instantáneo', 'Voluntad anula', 'Sí', 'The affected creature suffers from a continuous confusion effect, as the spell.

Remove curse does not remove insanity. Greater restoration, heal, limited wish, miracle, or wish can restore the creature.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('insect-plague', 'Insect Plague', 'Conjuración', 'Convocación', NULL, '1 round', 'Largo (400 ft. + 40 ft./Nivel)', NULL, NULL, 'One swarm of locusts per three levels, each of which must be adjacent to at least one other swarm', '1 min./Nivel', 'Ninguna', 'No', 'You summon a number of swarms of locusts (one per three levels, to a maximum of six swarms at 18th level). The swarms must be summoned so that each one is adjacent to at least one other swarm (that is, the swarms must fill one contiguous area). You may summon the locust swarms so that they share the area of other creatures. Each swarm attacks any creatures occupying its area. The swarms are stationary after being summoned, and won’t pursue creatures that flee.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('instant-summons', 'Instant Summons', 'Conjuración', 'Convocación', NULL, '1 standard action', 'See text', 'One object weighing 10 lb. or less whose longest dimension is 6 ft. or less', NULL, NULL, 'Permanente until discharged', 'Ninguna', 'No', 'You call some nonliving item from virtually any location directly to your hand.

First, you must place your arcane mark on the item. Then you cast this spell, which magically and invisibly inscribes the name of the item on a sapphire worth at least 1,000 gp. Thereafter, you can summon the item by speaking a special word (set by you when the spell is cast) and crushing the gem. The item appears instantly in your hand. Only you can use the gem in this way.

If the item is in the possession of another creature, the spell does not work, but you know who the possessor is and roughly where that creature is located when the summons occurs.

The inscription on the gem is invisible. It is also unreadable, except by means of a read magic spell, to anyone but you.

The item can be summoned from another plane, but only if no other creature has claimed ownership of it.

A sapphire worth at least 1,000 gp.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('interposing-hand', 'Interposing Hand', 'Evocación', NULL, ARRAY['Fuerza']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, '10-ft. hand', '1 round/Nivel (D)', 'Ninguna', 'Sí', 'Interposing hand creates a Large magic hand that appears between you and one opponent. This floating, disembodied hand then moves to remain between the two of you, regardless of where you move or how the opponent tries to get around it, providing cover (+4 AC) for you against that opponent. Nothing can fool the hand—it sticks with the selected opponent in spite of darkness, invisibility, polymorphing, or any other attempt at hiding or disguise. The hand does not pursue an opponent, however.

An interposing hand is 10 feet long and about that wide with its fingers outstretched. It has as many hit points as you do when you’re undamaged, and its AC is 20 (-1 size, +11 natural). It takes damage as a normal creature, but most magical effects that don’t cause damage do not affect it.

The hand never provokes attacks of opportunity from opponents. It cannot push through a wall of force or enter an antimagic field, but it suffers the full effect of a prismatic wall or prismatic sphere. The hand makes saving throws as its caster.

Disintegrate or a successful dispel magic destroys it.

Any creature weighing 2,000 pounds or less that tries to push past the hand is slowed to half its normal speed. The hand cannot reduce the speed of a creature weighing more than 2,000 pounds, but it still affects the creature’s attacks.

Directing the spell to a new target is a move action.

A soft glove.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('invisibility', 'Invisibility', 'Ilusión', 'Glamour', NULL, '1 standard action', 'Personal or Toque', 'You or a creature or object weighing No more than 100 lb./Nivel', NULL, NULL, '1 min./Nivel (D)', 'Voluntad anula (harmless) or Voluntad anula (harmless, object)', 'Sí (harmless) or Sí (harmless, object)', 'The creature or object touched becomes invisible, vanishing from sight, even from darkvision. If the recipient is a creature carrying gear, that vanishes, too. If you cast the spell on someone else, neither you nor your allies can see the subject, unless you can normally see invisible things or you employ magic to do so.

Items dropped or put down by an invisible creature become visible; items picked up disappear if tucked into the clothing or pouches worn by the creature. Light, however, never becomes invisible, although a source of light can become so (thus, the effect is that of a light with no visible source). Any part of an item that the subject carries but that extends more than 10 feet from it becomes visible.

Of course, the subject is not magically silenced, and certain other conditions can render the recipient detectable (such as stepping in a puddle). The spell ends if the subject attacks any creature. For purposes of this spell, an attack includes any spell targeting a foe or whose area or effect includes a foe. (Exactly who is a foe depends on the invisible character’s perceptions.) Actions directed at unattended objects do not break the spell. Causing harm indirectly is not an attack. Thus, an invisible being can open doors, talk, eat, climb stairs, summon monsters and have them attack, cut the ropes holding a rope bridge while enemies are on the bridge, remotely trigger traps, open a portcullis to release attack dogs, and so forth. If the subject attacks directly, however, it immediately becomes visible along with all its gear. Spells such as bless that specifically affect allies but not foes are not attacks for this purpose, even when they include foes in their area.

Invisibility can be made permanent (on objects only) with a permanency spell.

An eyelash encased in a bit of gum arabic.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('invisibility-greater', 'Invisibility, Greater', 'Ilusión', 'Glamour', NULL, NULL, NULL, 'You or creature touched', NULL, NULL, '1 round/Nivel (D)', 'Voluntad anula (harmless)', 'No', 'This spell functions like invisibility, except that it doesn’t end if the subject attacks.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('invisibility-mass', 'Invisibility, Mass', 'Ilusión', 'Glamour', NULL, NULL, 'Largo (400 ft. + 40 ft./Nivel)', 'Any number of creatures, No two of which can be more than 180 ft. apart', NULL, NULL, NULL, NULL, 'No', 'This spell functions like invisibility, except that the effect is mobile with the group and is broken when anyone in the group attacks. Individuals in the group cannot see each other. The spell is broken for any individual who moves more than 180 feet from the nearest member of the group. (If only two individuals are affected, the one moving away from the other one loses its invisibility. If both are moving away from each other, they both become visible when the distance between them exceeds 180 feet.)

An eyelash encased in a bit of gum arabic.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('invisibility-purge', 'Invisibility Purge', 'Evocación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 min./Nivel (D)', NULL, 'No', 'You surround yourself with a sphere of power with a radius of 5 feet per caster level that negates all forms of invisibility.

Anything invisible becomes visible while in the area.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('invisibility-sphere', 'Invisibility Sphere', 'Ilusión', 'Glamour', NULL, NULL, NULL, NULL, '10-ft.-radius emanation around the creature or object touched', NULL, NULL, NULL, 'No', 'This spell functions like invisibility, except that this spell confers invisibility upon all creatures within 10 feet of the recipient. The center of the effect is mobile with the recipient.

Those affected by this spell can see each other and themselves as if unaffected by the spell. Any affected creature moving out of the area becomes visible, but creatures moving into the area after the spell is cast do not become invisible. Affected creatures (other than the recipient) who attack negate the invisibility only for themselves. If the spell recipient attacks, the invisibility sphere ends.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('iron-body', 'Iron Body', 'Transmutación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 min./Nivel (D)', NULL, 'No', 'This spell transforms your body into living iron, which grants you several powerful resistances and abilities.

You gain damage reduction 15/adamantine. You are immune to blindness, critical hits, ability score damage, deafness, disease, drowning, electricity, poison, stunning, and all spells or attacks that affect your physiology or respiration, because you have no physiology or respiration while this spell is in effect. You take only half damage from acid and fire of all kinds. However, you also become vulnerable to all special attacks that affect iron golems.

You gain a +6 enhancement bonus to your Strength score, but you take a -6 penalty to Dexterity as well (to a minimum Dexterity score of 1), and your speed is reduced to half normal. You have an arcane spell failure chance of 50% and a -8 armor check penalty, just as if you were clad in full plate armor. You cannot drink (and thus can’t use potions) or play wind instruments.

Your unarmed attacks deal damage equal to a club sized for you (1d4 for Small characters or 1d6 for Medium characters), and you are considered armed when making unarmed attacks.

Your weight increases by a factor of ten, causing you to sink in water like a stone. However, you could survive the crushing pressure and lack of air at the bottom of the ocean—at least until the spell duration expires.

A small piece of iron that was once part of either an iron golem, a hero’s armor, or a war machine.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('ironwood', 'Ironwood', 'Transmutación', NULL, NULL, '1 minute/lb. created', '0 ft.', NULL, NULL, 'An ironwood object weighing up to 5 lb./Nivel', 'One day/Nivel (D)', 'Ninguna', 'No', 'Ironwood is a magical substance created by druids from normal wood. While remaining natural wood in almost every way, ironwood is as strong, heavy, and resistant to fire as steel. Spells that affect metal or iron do not function on ironwood. Spells that affect wood do affect ironwood, although ironwood does not burn. Using this spell with wood shape or a wood-related Craft check, you can fashion wooden items that function as steel items. Thus, wooden plate armor and wooden swords can be created that are as durable as their normal steel counterparts. These items are freely usable by druids.

Further, if you make only half as much ironwood as the spell would normally allow, any weapon, shield, or suit of armor so created is treated as a magic item with a +1 enhancement bonus.

Wood shaped into the form of the intended ironwood object.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('irresistible-dance', 'Irresistible Dance', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Toque', 'Living creature touched', NULL, NULL, '1d4+1 rounds', 'Ninguna', 'Sí', 'The subject feels an undeniable urge to dance and begins doing so, complete with foot shuffling and tapping. The spell effect makes it impossible for the subject to do anything other than caper and prance in place. The effect imposes a -4 penalty to Armor Class and a -10 penalty on Reflex saves, and it negates any AC bonus granted by a shield the target holds. The dancing subject provokes attacks of opportunity each round on its turn.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('jump', 'Jump', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 min./Nivel (D)', 'Voluntad anula (harmless)', 'Sí', 'The subject gets a +10 enhancement bonus on Jump checks. The enhancement bonus increases to +20 at caster level 5th, and to +30 (the maximum) at caster level 9th.

A grasshopper’s hind leg, which you break when the spell is cast.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('keen-edge', 'Keen Edge', 'Transmutación', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One weapon or fifty projectiles, all of which must be in contact with each other at the time of casting', NULL, NULL, '10 min./Nivel', 'Voluntad anula (harmless, object)', 'Sí (harmless, object)', 'This spell makes a weapon magically keen, improving its ability to deal telling blows. This transmutation doubles the threat range of the weapon. A threat range of 20 becomes 19-20, a threat range of 19-20 becomes 17-20, and a threat range of 18-20 becomes 15-20. The spell can be cast only on piercing or slashing weapons. If cast on arrows or crossbow bolts, the keen edge on a particular projectile ends after one use, whether or not the missile strikes its intended target. (Treat shuriken as arrows, rather than as thrown weapons, for the purpose of this spell.)

Multiple effects that increase a weapon’s threat range (such as the keen edge spell and the Improved Critical feat) don’t stack. You can’t cast this spell on a natural weapon, such as a claw.', NULL, NULL, NULL, true, true, false, false, false, false)
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

-- Verificación de la parte 3
SELECT 'Parte 3/7 insertada' AS status, COUNT(*) AS count FROM public.spells;
