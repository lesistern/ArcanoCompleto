-- ============================================================================
-- CONJUROS DEL PLAYER'S HANDBOOK - PARTE 4/7
-- Conjuros 301-400 de 605 totales
-- Datos extraídos de d20srd.org
-- ============================================================================

-- Insertar conjuros (parte 4)
INSERT INTO public.spells (
  slug, name, school, subschool, descriptors,
  casting_time, range_info, target, area, effect, duration,
  saving_throw, spell_resistance, description,
  material_components, focus, xp_cost,
  component_verbal, component_somatic, component_material,
  component_focus, component_divine_focus, component_xp
)
VALUES
  ('know-direction', 'Know Direction', 'Adivinación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, 'Instantáneo', NULL, 'No', 'You instantly know the direction of north from your current position. The spell is effective in any environment in which “north” exists, but it may not work in extraplanar settings. Your knowledge of north is correct at the moment of casting, but you can get lost again within moments if you don’t find some external reference point to help you keep track of direction.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('legend-lore', 'Legend Lore', 'Adivinación', NULL, NULL, 'See text', 'Personal', 'You', NULL, NULL, 'See text', NULL, 'No', 'Legend lore brings to your mind legends about an important person, place, or thing. If the person or thing is at hand, or if you are in the place in question, the casting time is only 1d4×10 minutes. If you have only detailed information on the person, place, or thing, the casting time is 1d10 days, and the resulting lore is less complete and specific (though it often provides enough information to help you find the person, place, or thing, thus allowing a better legend lore result next time). If you know only rumors, the casting time is 2d6 weeks, and the resulting lore is vague and incomplete (though it often directs you to more detailed information, thus allowing a better legend lore result next time).

During the casting, you cannot engage in other than routine activities: eating, sleeping, and so forth. When completed, the divination brings legends (if any) about the person, place, or things to your mind. These may be legends that are still current, legends that have been forgotten, or even information that has never been generally known. If the person, place, or thing is not of legendary importance, you gain no information. As a rule of thumb, characters who are 11th level and higher are “legendary,” as are the sorts of creatures they contend with, the major magic items they wield, and the places where they perform their key deeds.

Incense worth at least 250 gp.

Four strips of ivory (worth 50 gp each) formed into a rectangle.', NULL, NULL, NULL, true, true, true, true, false, false),
  ('levitate', 'Levitate', 'Transmutación', NULL, NULL, '1 standard action', 'Personal or Cercano (25 ft. + 5 ft./2 levels)', 'You or one willing creature or one object (total weight up to 100 lb./Nivel)', NULL, NULL, '1 min./Nivel (D)', 'Ninguna', 'No', 'Levitate allows you to move yourself, another creature, or an object up and down as you wish. A creature must be willing to be levitated, and an object must be unattended or possessed by a willing creature. You can mentally direct the recipient to move up or down as much as 20 feet each round; doing so is a move action. You cannot move the recipient horizontally, but the recipient could clamber along the face of a cliff, for example, or push against a ceiling to move laterally (generally at half its base land speed).

A levitating creature that attacks with a melee or ranged weapon finds itself increasingly unstable; the first attack has a -1 penalty on attack rolls, the second -2, and so on, to a maximum penalty of -5. A full round spent stabilizing allows the creature to begin again at -1.

Either a small leather loop or a piece of golden wire bent into a cup shape with a long shank on one end.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('light', 'Light', 'Evocación', NULL, ARRAY['Luz']::TEXT[], '1 standard action', 'Toque', 'Object touched', NULL, NULL, '10 min./Nivel (D)', 'Ninguna', 'No', 'This spell causes an object to glow like a torch, shedding bright light in a 20-foot radius (and dim light for an additional 20 feet) from the point you touch. The effect is immobile, but it can be cast on a movable object. Light taken into an area of magical darkness does not function.

A light spell (one with the light descriptor) counters and dispels a darkness spell (one with the darkness descriptor) of an equal or lower level.

A firefly or a piece of phosphorescent moss.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('lightning-bolt', 'Lightning Bolt', 'Evocación', NULL, ARRAY['Electricidad']::TEXT[], '1 standard action', '120 ft.', NULL, '120-ft. line', NULL, 'Instantáneo', 'Reflejos mitad', 'Sí', 'You release a powerful stroke of electrical energy that deals 1d6 points of electricity damage per caster level (maximum 10d6) to each creature within its area. The bolt begins at your fingertips.

The lightning bolt sets fire to combustibles and damages objects in its path. It can melt metals with a low melting point, such as lead, gold, copper, silver, or bronze. If the damage caused to an interposing barrier shatters or breaks through it, the bolt may continue beyond the barrier if the spell’s range permits; otherwise, it stops at the barrier just as any other spell effect does.

A bit of fur and an amber, crystal, or glass rod.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('limited-wish', 'Limited Wish', 'Universal', NULL, NULL, '1 standard action', 'See text', NULL, NULL, NULL, 'See text', 'Ninguna; see text', 'Sí', 'A limited wish lets you create nearly any type of effect. For example, a limited wish can do any of the following things.

300 XP or more (see above).', 'A duplicated spell allows saving throws and spell resistance as normal (but the save DC is for a 7th-level spell). When a limited wish duplicates a spell that has an XP cost, you must pay that cost or 300 XP, whichever is more. When a limited wish spell duplicates a spell with a that costs more than 1,000 gp, you must provide that component.', NULL, NULL, true, true, false, false, false, true),
  ('liveoak', 'Liveoak', 'Transmutación', NULL, NULL, '10 minutes', 'Toque', 'Tree touched', NULL, NULL, 'One day/Nivel (D)', 'Ninguna', 'No', 'This spell turns an oak tree into a protector or guardian. The spell can be cast on only a single tree at a time; while liveoak is in effect, you can’t cast it again on another tree. The tree on which the spell is cast must be within 10 feet of your dwelling place, within a place sacred to you, or within 300 feet of something that you wish to guard or protect.

Liveoak must be cast on a healthy, Huge oak. A triggering phrase of up to one word per caster level is placed on the targeted oak. The liveoak spell triggers the tree into animating as a treant.

If liveoak is dispelled, the tree takes root immediately, wherever it happens to be. If released by you, the tree tries to return to its original location before taking root.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('locate-creature', 'Locate Creature', 'Adivinación', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10 min./Nivel', NULL, 'No', 'This spell functions like locate object, except this spell locates a known or familiar creature.

You slowly turn and sense when you are facing in the direction of the creature to be located, provided it is within range. You also know in which direction the creature is moving, if any.

The spell can locate a creature of a specific kind or a specific creature known to you. It cannot find a creature of a certain type. To find a kind of creature, you must have seen such a creature up close (within 30 feet) at least once.

Running water blocks the spell. It cannot detect objects. It can be fooled by mislead, nondetection, and polymorph spells.

A bit of fur from a bloodhound.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('locate-object', 'Locate Object', 'Adivinación', NULL, NULL, '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, 'Circle, centered on you, with a radius of 400 ft. + 40 ft./Nivel', NULL, '1 min./Nivel', 'Ninguna', 'No', 'You sense the direction of a well-known or clearly visualized object. You can search for general items, in which case you locate the nearest one of its kind if more than one is within range. Attempting to find a certain item requires a specific and accurate mental image; if the image is not close enough to the actual object, the spell fails. You cannot specify a unique item unless you have observed that particular item firsthand (not through divination).

The spell is blocked by even a thin sheet of lead. Creatures cannot be found by this spell. Polymorph any object fools it.

A forked twig.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('longstrider', 'Longstrider', 'Transmutación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 hour/Nivel (D)', NULL, 'No', 'This spell increases your base land speed by 10 feet. (This adjustment counts as an enhancement bonus.) It has no effect on other modes of movement, such as burrow, climb, fly, or swim.

A pinch of dirt.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('lullaby', 'Lullaby', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, 'Living creatures within a 10-ft.-radius burst', NULL, 'Concentración + 1 round/Nivel (D)', 'Voluntad anula', 'Sí', 'Any creature within the area that fails a Will save becomes drowsy and inattentive, taking a -5 penalty on Listen and Spot checks and a -2 penalty on Will saves against sleep effects while the lullaby is in effect. Lullaby lasts for as long as the caster concentrates, plus up to 1 round per caster level thereafter.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('mage-armor', 'Mage Armor', 'Conjuración', 'Creación', ARRAY['Fuerza']::TEXT[], '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 hour/Nivel (D)', 'Voluntad anula (harmless)', 'No', 'An invisible but tangible field of force surrounds the subject of a mage armor spell, providing a +4 armor bonus to AC.

Unlike mundane armor, mage armor entails no armor check penalty, arcane spell failure chance, or speed reduction. Since mage armor is made of force, incorporeal creatures can’t bypass it the way they do normal armor.

A piece of cured leather.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('mage-hand', 'Mage Hand', 'Transmutación', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One nonmagical, unattended object weighing up to 5 lb.', NULL, NULL, 'Concentración', 'Ninguna', 'No', 'You point your finger at an object and can lift it and move it at will from a distance. As a move action, you can propel the object as far as 15 feet in any direction, though the spell ends if the distance between you and the object ever exceeds the spell’s range.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('mage-s-disjunction', 'Mage’s Disjunction', 'Abjuración', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, 'All magical effects and magic items within a 40-ft.-radius burst', NULL, 'Instantáneo', 'Voluntad anula (object)', 'No', 'All magical effects and magic items within the radius of the spell, except for those that you carry or touch, are disjoined. That is, spells and spell-like effects are separated into their individual components (ending the effect as a dispel magic spell does), and each permanent magic item must make a successful Will save or be turned into a normal item. An item in a creature’s possession uses its own Will save bonus or its possessor’s Will save bonus, whichever is higher.

You also have a 1% chance per caster level of destroying an antimagic field. If the antimagic field survives the disjunction, no items within it are disjoined.

Even artifacts are subject to disjunction, though there is only a 1% chance per caster level of actually affecting such powerful items. Additionally, if an artifact is destroyed, you must make a DC 25 Will save or permanently lose all spellcasting abilities. (These abilities cannot be recovered by mortal magic, not even miracle or wish.)

Note: Destroying artifacts is a dangerous business, and it is 95% likely to attract the attention of some powerful being who has an interest in or connection with the device.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('mage-s-faithful-hound', 'Mage’s Faithful Hound', 'Conjuración', 'Creación', NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Phantom watchdog', '1 hour/caster Nivel or until discharged, then 1 round/caster Nivel; see text', 'Ninguna', 'No', 'You conjure up a phantom watchdog that is invisible to everyone but yourself. It then guards the area where it was conjured (it does not move). The hound immediately starts barking loudly if any Small or larger creature approaches within 30 feet of it. (Those within 30 feet of the hound when it is conjured may move about in the area, but if they leave and return, they activate the barking.) The hound sees invisible and ethereal creatures. It does not react to figments, but it does react to shadow illusions.

If an intruder approaches to within 5 feet of the hound, the dog stops barking and delivers a vicious bite (+10 attack bonus, 2d6+3 points of piercing damage) once per round. The dog also gets the bonuses appropriate to an invisible creature.

The dog is considered ready to bite intruders, so it delivers its first bite on the intruder’s turn. Its bite is the equivalent of a magic weapon for the purpose of damage reduction. The hound cannot be attacked, but it can be dispelled.

The spell lasts for 1 hour per caster level, but once the hound begins barking, it lasts only 1 round per caster level. If you are ever more than 100 feet distant from the hound, the spell ends.

A tiny silver whistle, a piece of bone, and a thread.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('mage-s-lucubration', 'Mage’s Lucubration', 'Transmutación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, 'Instantáneo', NULL, 'No', 'You instantly recall any one spell of 5th level or lower that you have used during the past 24 hours. The spell must have been actually cast during that period. The recalled spell is stored in your mind as through prepared in the normal fashion.', 'If the recalled spell requires s, you must provide them. The recovered spell is not usable until the material components are available.', NULL, NULL, true, true, false, false, false, false),
  ('mage-s-magnificent-mansion', 'Mage’s Magnificent Mansion', 'Conjuración', 'Creación', NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Extradimensional mansion, up to three 10-ft. cubes/Nivel (S)', '2 hours/Nivel (D)', 'Ninguna', 'No', 'You conjure up an extradimensional dwelling that has a single entrance on the plane from which the spell was cast. The entry point looks like a faint shimmering in the air that is 4 feet wide and 8 feet high. Only those you designate may enter the mansion, and the portal is shut and made invisible behind you when you enter. You may open it again from your own side at will. Once observers have passed beyond the entrance, they are in a magnificent foyer with numerous chambers beyond. The atmosphere is clean, fresh, and warm.

You can create any floor plan you desire to the limit of the spell’s effect. The place is furnished and contains sufficient foodstuffs to serve a nine-course banquet to a dozen people per caster level. A staff of near-transparent servants (as many as two per caster level), liveried and obedient, wait upon all who enter. The servants function as unseen servant spells except that they are visible and can go anywhere in the mansion.

Since the place can be entered only through its special portal, outside conditions do not affect the mansion, nor do conditions inside it pass to the plane beyond.

A miniature portal carved from ivory, a small piece of polished marble, and a tiny silver spoon (each item worth 5 gp).', NULL, NULL, NULL, true, true, false, true, false, false),
  ('mage-s-private-sanctum', 'Mage’s Private Sanctum', 'Abjuración', NULL, NULL, '10 minutes', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, '30-ft. cube/Nivel (S)', NULL, '24 hours (D)', 'Ninguna', 'No', 'This spell ensures privacy. Anyone looking into the area from outside sees only a dark, foggy mass. Darkvision cannot penetrate it. No sounds, no matter how loud, can escape the area, so nobody can eavesdrop from outside. Those inside can see out normally.

Divination (scrying) spells cannot perceive anything within the area, and those within are immune to detect thoughts. The ward prevents speech between those inside and those outside (because it blocks sound), but it does not prevent other communication, such as a sending or message spell, or telepathic communication, such as that between a wizard and her familiar.

The spell does not prevent creatures or objects from moving into and out of the area.

Mage’s private sanctum can be made permanent with a permanency spell.

A thin sheet of lead, a piece of opaque glass, a wad of cotton or cloth, and powdered chrysolite.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('mage-s-sword', 'Mage’s Sword', 'Evocación', NULL, ARRAY['Fuerza']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'One sword', '1 round/Nivel (D)', 'Ninguna', 'Sí', 'This spell brings into being a shimmering, swordlike plane of force. The sword strikes at any opponent within its range, as you desire, starting in the round that you cast the spell. The sword attacks its designated target once each round on your turn. Its attack bonus is equal to your caster level + your Int bonus or your Cha bonus (for wizards or sorcerers, respectively) with an additional +3 enhancement bonus. As a force effect, it can strike ethereal and incorporeal creatures. It deals 4d6+3 points of force damage, with a threat range of 19-20 and a critical multiplier of ×2.

The sword always strikes from your direction. It does not get a bonus for flanking or help a combatant get one. If the sword goes beyond the spell range from you, if it goes out of your sight, or if you are not directing it, the sword returns to you and hovers.

Each round after the first, you can use a standard action to switch the sword to a new target. If you do not, the sword continues to attack the previous round’s target.

The sword cannot be attacked or harmed by physical attacks, but dispel magic, disintegrate, a sphere of annihilation, or a rod of cancellation affects it. The sword’s AC is 13 (10, +0 size bonus for Medium object, +3 deflection bonus).

If an attacked creature has spell resistance, the resistance is checked the first time Mage’s sword strikes it. If the sword is successfully resisted, the spell is dispelled. If not, the sword has its normal full effect on that creature for the duration of the spell.

A miniature platinum sword with a grip and pommel of copper and zinc. It costs 250 gp to construct.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('magic-aura', 'Magic Aura', 'Ilusión', 'Glamour', NULL, '1 standard action', 'Toque', 'One touched object weighing up to 5 lb./Nivel', NULL, NULL, 'One day/Nivel (D)', 'Ninguna; see text', 'No', 'You alter an item’s aura so that it registers to detect spells (and spells with similar capabilities) as though it were nonmagical, or a magic item of a kind you specify, or the subject of a spell you specify.

If the object bearing magic aura has identify cast on it or is similarly examined, the examiner recognizes that the aura is false and detects the object’s actual qualities if he succeeds on a Will save. Otherwise, he believes the aura and no amount of testing reveals what the true magic is.

If the targeted item’s own aura is exceptionally powerful (if it is an artifact, for instance), magic aura doesn’t work.

Note: A magic weapon, shield, or suit of armor must be a masterwork item, so a sword of average make, for example, looks suspicious if it has a magical aura.

A small square of silk that must be passed over the object that receives the aura.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('magic-circle-against-chaos', 'Magic Circle against Chaos', 'Abjuración', NULL, ARRAY['Legal']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like magic circle against evil, except that it is similar to protection from chaos instead of protection from evil, and it can imprison a nonlawful called creature.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('magic-circle-against-evil', 'Magic Circle against Evil', 'Abjuración', NULL, ARRAY['Bondadoso']::TEXT[], '1 standard action', 'Toque', NULL, '10-ft.-radius emanation from touched creature', NULL, '10 min./Nivel', 'Voluntad anula (harmless)', 'No; see text', 'All creatures within the area gain the effects of a protection from evil spell, and no nongood summoned creatures can enter the area either. You must overcome a creature’s spell resistance in order to keep it at bay (as in the third function of protection from evil), but the deflection and resistance bonuses and the protection from mental control apply regardless of enemies’ spell resistance.

A magic circle leaves much to be desired as a trap. If the circle of powdered silver laid down in the process of spellcasting is broken, the effect immediately ends. The trapped creature can do nothing that disturbs the circle, directly or indirectly, but other creatures can. If the called creature has spell resistance, it can test the trap once a day. If you fail to overcome its spell resistance, the creature breaks free, destroying the circle. A creature capable of any form of dimensional travel (astral projection, blink, dimension door, etherealness, gate, plane shift, shadow walk, teleport, and similar abilities) can simply leave the circle through that means. You can prevent the creature’s extradimensional escape by casting a dimensional anchor spell on it, but you must cast the spell before the creature acts. If you are successful, the anchor effect lasts as long as the magic circle does. The creature cannot reach across the magic circle, but its ranged attacks (ranged weapons, spells, magical abilities, and the like) can. The creature can attack any target it can reach with its ranged attacks except for the circle itself.

You can add a special diagram (a two-dimensional bounded figure with no gaps along its circumference, augmented with various magical sigils) to make the magic circle more secure. Drawing the diagram by hand takes 10 minutes and requires a DC 20 Spellcraft check. You do not know the result of this check. If the check fails, the diagram is ineffective. You can take 10 when drawing the diagram if you are under no particular time pressure to complete the task. This task also takes 10 full minutes. If time is no factor at all, and you devote 3 hours and 20 minutes to the task, you can take 20.

A successful diagram allows you to cast a dimensional anchor spell on the magic circle during the round before casting any summoning spell. The anchor holds any called creatures in the magic circle for 24 hours per caster level. A creature cannot use its spell resistance against a magic circle prepared with a diagram, and none of its abilities or attacks can cross the diagram. If the creature tries a Charisma check to break free of the trap (see the lesser planar binding spell), the DC increases by 5. The creature is immediately released if anything disturbs the diagram—even a straw laid across it. However, the creature itself cannot disturb the diagram either directly or indirectly, as noted above.

This spell is not cumulative with protection from evil and vice versa.

A little powdered silver with which you trace a 3-foot diameter circle on the floor (or ground) around the creature to be warded.', NULL, 'This spell has an alternative version that you may choose when casting it. A magic circle against evil can be ed inward rather than outward. When focused inward, the spell binds a nongood called creature (such as those called by the lesser planar binding, planar binding, and greater planar binding spells) for a maximum of 24 hours per caster level, provided that you cast the spell that calls the creature within 1 round of casting the magic circle. The creature cannot cross the circle’s boundaries. If a creature too large to fit into the spell’s area is the subject of the spell, the spell acts as a normal protection from evil spell for that creature only.', NULL, true, true, false, false, false, false),
  ('magic-circle-against-good', 'Magic Circle against Good', 'Abjuración', NULL, ARRAY['Maligno']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like magic circle against evil, except that it is similar to protection from good instead of protection from evil, and it can imprison a nonevil called creature.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('magic-circle-against-law', 'Magic Circle against Law', 'Abjuración', NULL, ARRAY['Caótico']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like magic circle against evil, except that it is similar to protection from law instead of protection from evil, and it can imprison a nonchaotic called creature.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('magic-fang', 'Magic Fang', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Living creature touched', NULL, NULL, '1 min./Nivel', 'Voluntad anula (harmless)', 'Sí (harmless)', 'Magic fang gives one natural weapon of the subject a +1 enhancement bonus on attack and damage rolls. The spell can affect a slam attack, fist, bite, or other natural weapon. (The spell does not change an unarmed strike’s damage from nonlethal damage to lethal damage.)

Magic fang can be made permanent with a permanency spell.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('magic-fang-greater', 'Magic Fang, Greater', 'Transmutación', NULL, NULL, NULL, 'Cercano (25 ft. + 5 ft./2 levels)', 'One living creature', NULL, NULL, '1 hour/Nivel', NULL, 'No', 'This spell functions like magic fang, except that the enhancement bonus on attack and damage rolls is +1 per four caster levels (maximum +5).

Alternatively, you may imbue all of the creature’s natural weapons with a +1 enhancement bonus (regardless of your caster level).

Greater magic fang can be made permanent with a permanency spell.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('magic-jar', 'Magic Jar', 'Nigromancia', NULL, NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'One creature', NULL, NULL, '1 hour/Nivel or until you return to your body', 'Voluntad anula; see text', 'Sí', 'By casting magic jar, you place your soul in a gem or large crystal (known as the magic jar), leaving your body lifeless. Then you can attempt to take control of a nearby body, forcing its soul into the magic jar. You may move back to the jar (thereby returning the trapped soul to its body) and attempt to possess another body. The spell ends when you send your soul back to your own body, leaving the receptacle empty.

To cast the spell, the magic jar must be within spell range and you must know where it is, though you do not need line of sight or line of effect to it. When you transfer your soul upon casting, your body is, as near as anyone can tell, dead.

While in the magic jar, you can sense and attack any life force within 10 feet per caster level (and on the same plane of existence). You do need line of effect from the jar to the creatures. You cannot determine the exact creature types or positions of these creatures. In a group of life forces, you can sense a difference of 4 or more Hit Dice between one creature and another and can determine whether a life force is powered by positive or negative energy. (Undead creatures are powered by negative energy. Only sentient undead creatures have, or are, souls.)

You could choose to take over either a stronger or a weaker creature, but which particular stronger or weaker creature you attempt to possess is determined randomly.

Attempting to possess a body is a full-round action. It is blocked by protection from evil or a similar ward. You possess the body and force the creature’s soul into the magic jar unless the subject succeeds on a Will save. Failure to take over the host leaves your life force in the magic jar, and the target automatically succeeds on further saving throws if you attempt to possess its body again.

If you are successful, your life force occupies the host body, and the host’s life force is imprisoned in the magic jar. You keep your Intelligence, Wisdom, Charisma, level, class, base attack bonus, base save bonuses, alignment, and mental abilities. The body retains its Strength, Dexterity, Constitution, hit points, natural abilities, and automatic abilities. A body with extra limbs does not allow you to make more attacks (or more advantageous two-weapon attacks) than normal. You can’t choose to activate the body’s extraordinary or supernatural abilities. The creature’s spells and spell-like abilities do not stay with the body.

As a standard action, you can shift freely from a host to the magic jar if within range, sending the trapped soul back to its body. The spell ends when you shift from the jar to your own body.

If the host body is slain, you return to the magic jar, if within range, and the life force of the host departs (it is dead). If the host body is slain beyond the range of the spell, both you and the host die. Any life force with nowhere to go is treated as slain.

If the spell ends while you are in the magic jar, you return to your body (or die if your body is out of range or destroyed). If the spell ends while you are in a host, you return to your body (or die, if it is out of range of your current position), and the soul in the magic jar returns to its body (or dies if it is out of range). Destroying the receptacle ends the spell, and the spell can be dispelled at either the magic jar or at the host’s location.

A gem or crystal worth at least 100 gp.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('magic-missile', 'Magic Missile', 'Evocación', NULL, ARRAY['Fuerza']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'Up to five creatures, No two of which can be more than 15 ft. apart', NULL, NULL, 'Instantáneo', 'Ninguna', 'Sí', 'A missile of magical energy darts forth from your fingertip and strikes its target, dealing 1d4+1 points of force damage.

The missile strikes unerringly, even if the target is in melee combat or has less than total cover or total concealment. Specific parts of a creature can’t be singled out. Inanimate objects are not damaged by the spell.

For every two caster levels beyond 1st, you gain an additional missile—two at 3rd level, three at 5th, four at 7th, and the maximum of five missiles at 9th level or higher. If you shoot multiple missiles, you can have them strike a single creature or several creatures. A single missile can strike only one creature. You must designate targets before you check for spell resistance or roll damage.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('magic-mouth', 'Magic Mouth', 'Ilusión', 'Glamour', NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature or object', NULL, NULL, 'Permanente until discharged', 'Voluntad anula (object)', 'Sí (object)', 'This spell imbues the chosen object or creature with an enchanted mouth that suddenly appears and speaks its message the next time a specified event occurs. The message, which must be twenty-five or fewer words long, can be in any language known by you and can be delivered over a period of 10 minutes. The mouth cannot utter verbal components, use command words, or activate magical effects. It does, however, move according to the words articulated; if it were placed upon a statue, the mouth of the statue would move and appear to speak. Of course, magic mouth can be placed upon a tree, rock, or any other object or creature.

The spell functions when specific conditions are fulfilled according to your command as set in the spell. Commands can be as general or as detailed as desired, although only visual and audible triggers can be used. Triggers react to what appears to be the case. Disguises and illusions can fool them. Normal darkness does not defeat a visual trigger, but magical darkness or invisibility does. Silent movement or magical silence defeats audible triggers. Audible triggers can be keyed to general types of noises or to a specific noise or spoken word. Actions can serve as triggers if they are visible or audible. A magic mouth cannot distinguish alignment, level, Hit Dice, or class except by external garb.

The range limit of a trigger is 15 feet per caster level, so a 6th-level caster can command a magic mouth to respond to triggers as far as 90 feet away. Regardless of range, the mouth can respond only to visible or audible triggers and actions in line of sight or within hearing distance.

Magic mouth can be made permanent with a permanency spell.

A small bit of honeycomb and jade dust worth 10 gp.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('magic-stone', 'Magic Stone', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Up to three pebbles touched', NULL, NULL, '30 minutes or until discharged', 'Voluntad anula (harmless, object)', 'Sí (harmless, object)', 'You transmute as many as three pebbles, which can be no larger than sling bullets, so that they strike with great force when thrown or slung. If hurled, they have a range increment of 20 feet. If slung, treat them as sling bullets (range increment 50 feet). The spell gives them a +1 enhancement bonus on attack and damage rolls. The user of the stones makes a normal ranged attack. Each stone that hits deals 1d6+1 points of damage (including the spell’s enhancement bonus), or 2d6+2 points against undead.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('magic-vestment', 'Magic Vestment', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Armor or shield touched', NULL, NULL, '1 hour/Nivel', 'Voluntad anula (harmless, object)', 'Sí (harmless, object)', 'You imbue a suit of armor or a shield with an enhancement bonus of +1 per four caster levels (maximum +5 at 20th level).

An outfit of regular clothing counts as armor that grants no AC bonus for the purpose of this spell.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('magic-weapon', 'Magic Weapon', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Weapon touched', NULL, NULL, '1 min./Nivel', 'Voluntad anula (harmless, object)', 'Sí (harmless, object)', 'Magic weapon gives a weapon a +1 enhancement bonus on attack and damage rolls. (An enhancement bonus does not stack with a masterwork weapon’s +1 bonus on attack rolls.)

You can’t cast this spell on a natural weapon, such as an unarmed strike (instead, see magic fang). A monk’s unarmed strike is considered a weapon, and thus it can be enhanced by this spell.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('magic-weapon-greater', 'Magic Weapon, Greater', 'Transmutación', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One weapon or fifty projectiles (all of which must be in contact with each other at the time of casting)', NULL, NULL, '1 hour/Nivel', 'Voluntad anula (harmless, object)', 'Sí (harmless, object)', 'This spell functions like magic weapon, except that it gives a weapon an enhancement bonus on attack and damage rolls of +1 per four caster levels (maximum +5).

Alternatively, you can affect as many as fifty arrows, bolts, or bullets. The projectiles must be of the same kind, and they have to be together (in the same quiver or other container). Projectiles, but not thrown weapons, lose their transmutation when used. (Treat shuriken as projectiles, rather than as thrown weapons, for the purpose of this spell.)

Powdered lime and carbon.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('major-creation', 'Major Creation', 'Conjuración', 'Creación', NULL, '10 minutes', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, NULL, 'See text', NULL, 'No', 'This spell functions like minor creation, except that you can also create an object of mineral nature: stone, crystal, metal, or the like. The duration of the created item varies with its relative hardness and rarity, as indicated on the following table.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('major-image', 'Major Image', 'Ilusión', 'Engaño', NULL, NULL, NULL, NULL, NULL, NULL, 'Concentración + 3 rounds', NULL, 'No', 'This spell functions like silent image, except that sound, smell, and thermal illusions are included in the spell effect. While concentrating, you can move the image within the range.

The image disappears when struck by an opponent unless you cause the illusion to react appropriately.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('make-whole', 'Make Whole', 'Transmutación', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One object of up to 10 cu. ft./ Nivel', NULL, NULL, NULL, NULL, 'No', 'This spell functions like mending, except that make whole completely repairs an object made of any substance, even one with multiple breaks, to be as strong as new. The spell does not restore the magical abilities of a broken magic item made whole, and it cannot mend broken magic rods, staffs, or wands. The spell does not repair items that have been warped, burned, disintegrated, ground to powder, melted, or vaporized, nor does it affect creatures (including constructs).', NULL, NULL, NULL, false, false, false, false, false, false),
  ('mark-of-justice', 'Mark of Justice', 'Nigromancia', NULL, NULL, '10 minutes', 'Toque', 'Creature touched', NULL, NULL, 'Permanente; see text', 'Ninguna', 'Sí', 'You draw an indelible mark on the subject and state some behavior on the part of the subject that will activate the mark. When activated, the mark curses the subject. Typically, you designate some sort of criminal behavior that activates the mark, but you can pick any act you please. The effect of the mark is identical with the effect of bestow curse.

Since this spell takes 10 minutes to cast and involves writing on the target, you can cast it only on a creature that is willing or restrained.

Like the effect of bestow curse, a mark of justice cannot be dispelled, but it can be removed with a break enchantment, limited wish, miracle, remove curse, or wish spell. Remove curse works only if its caster level is equal to or higher than your mark of justice caster level. These restrictions apply regardless of whether the mark has activated.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('maze', 'Maze', 'Conjuración', 'Teletransportación', NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature', NULL, NULL, 'See text', 'Ninguna', 'Sí', 'You banish the subject into an extradimensional labyrinth of force planes. Each round on its turn, it may attempt a DC 20 Intelligence check to escape the labyrinth as a full-round action. If the subject doesn’t escape, the maze disappears after 10 minutes, forcing the subject to leave.

On escaping or leaving the maze, the subject reappears where it had been when the maze spell was cast. If this location is filled with a solid object, the subject appears in the nearest open space. Spells and abilities that move a creature within a plane, such as teleport and dimension door, do not help a creature escape a maze spell, although a plane shift spell allows it to exit to whatever plane is designated in that spell. Minotaurs are not affected by this spell.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('meld-into-stone', 'Meld into Stone', 'Transmutación', NULL, ARRAY['Tierra']::TEXT[], '1 standard action', 'Personal', 'You', NULL, NULL, '10 min./Nivel', NULL, 'No', 'Meld into stone enables you to meld your body and possessions into a single block of stone. The stone must be large enough to accommodate your body in all three dimensions. When the casting is complete, you and not more than 100 pounds of nonliving gear merge with the stone. If either condition is violated, the spell fails and is wasted.

While in the stone, you remain in contact, however tenuous, with the face of the stone through which you melded. You remain aware of the passage of time and can cast spells on yourself while hiding in the stone. Nothing that goes on outside the stone can be seen, but you can still hear what happens around you. Minor physical damage to the stone does not harm you, but its partial destruction (to the extent that you no longer fit within it) expels you and deals you 5d6 points of damage. The stone’s complete destruction expels you and slays you instantly unless you make a DC 18 Fortitude save.

Any time before the duration expires, you can step out of the stone through the surface that you entered. If the spell’s duration expires or the effect is dispelled before you voluntarily exit the stone, you are violently expelled and take 5d6 points of damage.

The following spells harm you if cast upon the stone that you are occupying: Stone to flesh expels you and deals you 5d6 points of damage. Stone shape deals you 3d6 points of damage but does not expel you. Transmute rock to mud expels you and then slays you instantly unless you make a DC 18 Fortitude save, in which case you are merely expelled. Finally, passwall expels you without damage.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('mending', 'Mending', 'Transmutación', NULL, NULL, '1 standard action', '10 ft.', 'One object of up to 1 lb.', NULL, NULL, 'Instantáneo', 'Voluntad anula (harmless, object)', 'Sí (harmless, object)', 'Mending repairs small breaks or tears in objects (but not warps, such as might be caused by a warp wood spell). It will weld broken metallic objects such as a ring, a chain link, a medallion, or a slender dagger, providing but one break exists.

Ceramic or wooden objects with multiple breaks can be invisibly rejoined to be as strong as new. A hole in a leather sack or a wineskin is completely healed over by mending. The spell can repair a magic item, but the item’s magical abilities are not restored. The spell cannot mend broken magic rods, staffs, or wands, nor does it affect creatures (including constructs).', NULL, NULL, NULL, true, true, false, false, false, false),
  ('message', 'Message', 'Transmutación', NULL, ARRAY['Dependiente del Lenguaje']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'One creature/Nivel', NULL, NULL, '10 min./Nivel', 'Ninguna', 'No', 'You can whisper messages and receive whispered replies with little chance of being overheard. You point your finger at each creature you want to receive the message. When you whisper, the whispered message is audible to all targeted creatures within range. Magical silence, 1 foot of stone, 1 inch of common metal (or a thin sheet of lead), or 3 feet of wood or dirt blocks the spell. The message does not have to travel in a straight line. It can circumvent a barrier if there is an open path between you and the subject, and the path’s entire length lies within the spell’s range. The creatures that receive the message can whisper a reply that you hear. The spell transmits sound, not meaning. It doesn’t transcend language barriers.

Note: To speak a message, you must mouth the words and whisper, possibly allowing observers the opportunity to read your lips.

A short piece of copper wire.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('meteor-swarm', 'Meteor Swarm', 'Evocación', NULL, ARRAY['Fuego']::TEXT[], '1 standard action', 'Largo (400 ft. + 40 ft./Nivel)', NULL, 'Four 40-ft.-radius spreads; see text', NULL, 'Instantáneo', 'Ninguna or Reflejos mitad; see text', 'Sí', 'Meteor swarm is a very powerful and spectacular spell that is similar to fireball in many aspects. When you cast it, four 2-foot-diameter spheres spring from your outstretched hand and streak in straight lines to the spots you select. The meteor spheres leave a fiery trail of sparks.

If you aim a sphere at a specific creature, you may make a ranged touch attack to strike the target with the meteor. Any creature struck by one of these spheres takes 2d6 points of bludgeoning damage (no save) and receives no saving throw against the sphere’s fire damage (see below). If a targeted sphere misses its target, it simply explodes at the nearest corner of the target’s space. You may aim more than one meteor at the same target.

Once a sphere reaches its destination, it explodes in a 40-foot-radius spread, dealing 6d6 points of fire damage to each creature in the area. If a creature is within the area of more than one sphere, it must save separately against each. (Fire resistance applies to each sphere’s damage individually.)', NULL, NULL, NULL, true, true, false, false, false, false),
  ('mind-blank', 'Mind Blank', 'Abjuración', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature', NULL, NULL, '24 hours', 'Voluntad anula (harmless)', 'Sí (harmless)', 'The subject is protected from all devices and spells that detect, influence, or read emotions or thoughts. This spell protects against all mind-affecting spells and effects as well as information gathering by divination spells or effects. Mind blank even foils limited wish, miracle, and wish spells when they are used in such a way as to affect the subject’s mind or to gain information about it. In the case of scrying that scans an area the creature is in, such as arcane eye, the spell works but the creature simply isn’t detected. Scrying attempts that are targeted specifically at the subject do not work at all.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('mind-fog', 'Mind Fog', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'Fog spreads in 20-ft. radius, 20 ft. high', '30 minutes and 2d6 rounds; see text', 'Voluntad anula', 'Sí', 'Mind fog produces a bank of thin mist that weakens the mental resistance of those caught in it. Creatures in the mind fog take a -10 competence penalty on Wisdom checks and Will saves. (A creature that successfully saves against the fog is not affected and need not make further saves even if it remains in the fog.) Affected creatures take the penalty as long as they remain in the fog and for 2d6 rounds thereafter. The fog is stationary and lasts for 30 minutes (or until dispersed by wind).

A moderate wind (11+ mph) disperses the fog in four rounds; a strong wind (21+ mph) disperses the fog in 1 round.

The fog is thin and does not significantly hamper vision.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('minor-creation', 'Minor Creation', 'Conjuración', 'Creación', NULL, '1 minute', '0 ft.', NULL, NULL, 'Unattended, nonmagical object of nonliving plant matter, up to 1 cu. ft./Nivel', '1 hour/Nivel (D)', 'Ninguna', 'No', 'You create a nonmagical, unattended object of nonliving, vegetable matter. The volume of the item created cannot exceed 1 cubic foot per caster level. You must succeed on an appropriate skill check to make a complex item.

A tiny piece of matter of the same sort of item you plan to create with minor creation.', 'Attempting to use any created object as a causes the spell to fail.', NULL, NULL, true, true, true, false, false, false),
  ('minor-image', 'Minor Image', 'Ilusión', 'Engaño', NULL, NULL, NULL, NULL, NULL, NULL, 'Concentración +2 rounds', NULL, 'No', 'This spell functions like silent image, except that minor image includes some minor sounds but not understandable speech.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('miracle', 'Miracle', 'Evocación', NULL, NULL, '1 standard action', 'See text', NULL, NULL, NULL, 'See text', 'See text', 'Sí', 'You don’t so much cast a miracle as request one. You state what you would like to have happen and request that your deity (or the power you pray to for spells) intercede.

A miracle can do any of the following things.

If the miracle has any of the above effects, casting it has no experience point cost.

Alternatively, a cleric can make a very powerful request. Casting such a miracle costs the cleric 5,000 XP because of the powerful divine energies involved. Examples of especially powerful miracles of this sort could include the following.

In any event, a request that is out of line with the deity’s (or alignment’s) nature is refused.

5,000 XP (for some uses of the miracle spell; see above).', 'A duplicated spell allows saving throws and spell resistance as normal, but the save DCs are as for a 9th-level spell. When a miracle duplicates a spell that has an XP cost, you must pay that cost. When a miracle spell duplicates a spell with a that costs more than 100 gp, you must provide that component.', NULL, NULL, true, true, false, false, false, false),
  ('mirage-arcana', 'Mirage Arcana', 'Ilusión', 'Glamour', NULL, '1 standard action', NULL, NULL, 'One 20-ft. cube/Nivel (S)', NULL, 'Concentración +1 hour/ Nivel (D)', NULL, 'No', 'This spell functions like hallucinatory terrain, except that it enables you to make any area appear to be something other than it is. The illusion includes audible, visual, tactile, and olfactory elements. Unlike hallucinatory terrain, the spell can alter the appearance of structures (or add them where none are present). Still, it can’t disguise, conceal, or add creatures (though creatures within the area might hide themselves within the illusion just as they can hide themselves within a real location).', NULL, NULL, NULL, true, true, false, false, false, false),
  ('mirror-image', 'Mirror Image', 'Ilusión', 'Engaño', NULL, '1 standard action', 'Personal; see text', 'You', NULL, NULL, '1 min./Nivel (D)', NULL, 'No', 'Several illusory duplicates of you pop into being, making it difficult for enemies to know which target to attack. The figments stay near you and disappear when struck.

Mirror image creates 1d4 images plus one image per three caster levels (maximum eight images total). These figments separate from you and remain in a cluster, each within 5 feet of at least one other figment or you. You can move into and through a mirror image. When you and the mirror image separate, observers can’t use vision or hearing to tell which one is you and which the image. The figments may also move through each other. The figments mimic your actions, pretending to cast spells when you cast a spell, drink potions when you drink a potion, levitate when you levitate, and so on.

Enemies attempting to attack you or cast spells at you must select from among indistinguishable targets. Generally, roll randomly to see whether the selected target is real or a figment. Any successful attack against an image destroys it. An image’s AC is 10 + your size modifier + your Dex modifier. Figments seem to react normally to area spells (such as looking like they’re burned or dead after being hit by a fireball).

While moving, you can merge with and split off from figments so that enemies who have learned which image is real are again confounded.

An attacker must be able to see the images to be fooled. If you are invisible or an attacker shuts his or her eyes, the spell has no effect. (Being unable to see carries the same penalties as being blinded.)', NULL, NULL, NULL, true, true, false, false, false, false),
  ('misdirection', 'Misdirection', 'Ilusión', 'Glamour', NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature or object, up to a 10-ft. cube in size', NULL, NULL, '1 hour/Nivel', 'Ninguna or Voluntad anula; see text', 'No', 'By means of this spell, you misdirect the information from divination spells that reveal auras (detect evil, detect magic, discern lies, and the like). On casting the spell, you choose another object within range. For the duration of the spell, the subject of misdirection is detected as if it were the other object. (Neither the subject nor the other object gets a saving throw against this effect.) Detection spells provide information based on the second object rather than on the actual target of the detection unless the caster of the detection succeeds on a Will save. For instance, you could make yourself detect as a tree if one were within range at casting: not evil, not lying, not magical, neutral in alignment, and so forth. This spell does not affect other types of divination magic (augury, detect thoughts, clairaudience/clairvoyance, and the like).', NULL, NULL, NULL, true, true, false, false, false, false),
  ('mislead', 'Mislead', 'Ilusión', 'Engaño, Glamour', NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, NULL, '1 round/Nivel (D) and Concentración + 3 rounds; see text', 'Ninguna or Voluntad incredulidad (if interacted with); see text', 'No', 'You become invisible (as greater invisibility, a glamer), and at the same time, an illusory double of you (as major image, a figment) appears. You are then free to go elsewhere while your double moves away. The double appears within range but thereafter moves as you direct it (which requires concentration beginning on the first round after the casting). You can make the figment appear superimposed perfectly over your own body so that observers don’t notice an image appearing and you turning invisible. You and the figment can then move in different directions. The double moves at your speed and can talk and gesture as if it were real, but it cannot attack or cast spells, though it can pretend to do so.

The illusory double lasts as long as you concentrate upon it, plus 3 additional rounds. After you cease concentration, the illusory double continues to carry out the same activity until the duration expires. The greater invisibility lasts for 1 round per level, regardless of concentration.', NULL, NULL, NULL, false, true, false, false, false, false),
  ('mnemonic-enhancer', 'Mnemonic Enhancer', 'Transmutación', NULL, NULL, '10 minutes', 'Personal', 'You', NULL, NULL, 'Instantáneo', NULL, 'No', 'Casting this spell allows you to prepare additional spells or retain spells recently cast. Pick one of these two versions when the spell is cast.

You prepare up to three additional levels of spells. A cantrip counts as ½ level for this purpose. You prepare and cast these spells normally.

You retain any spell of 3rd level or lower that you had cast up to 1 round before you started casting the mnemonic enhancer. This restores the previously cast spell to your mind.

In either event, the spell or spells prepared or retained fade after 24 hours (if not cast).

A piece of string, and ink consisting of squid secretion with black dragon’s blood.

An ivory plaque of at least 50 gp value.', NULL, NULL, NULL, true, true, true, true, false, false),
  ('modify-memory', 'Modify Memory', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 round; see text', 'Cercano (25 ft. + 5 ft./2 levels)', 'One living creature', NULL, NULL, 'Permanente', 'Voluntad anula', 'Sí', 'You reach into the subject’s mind and modify as many as 5 minutes of its memories in one of the following ways.

Casting the spell takes 1 round. If the subject fails to save, you proceed with the spell by spending as much as 5 minutes (a period of time equal to the amount of memory time you want to modify) visualizing the memory you wish to modify in the subject. If your concentration is disturbed before the visualization is complete, or if the subject is ever beyond the spell’s range during this time, the spell is lost.

A modified memory does not necessarily affect the subject’s actions, particularly if it contradicts the creature’s natural inclinations. An illogical modified memory is dismissed by the creature as a bad dream or a memory muddied by too much wine.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('moment-of-prescience', 'Moment of Prescience', 'Adivinación', NULL, NULL, '1 standard action', 'Personal', 'You', NULL, NULL, '1 hour/Nivel or until discharged', NULL, 'No', 'This spell grants you a powerful sixth sense in relation to yourself. Once during the spell’s duration, you may choose to use its effect. This spell grants you an insight bonus equal to your caster level (maximum +25) on any single attack roll, opposed ability or skill check, or saving throw. Alternatively, you can apply the insight bonus to your AC against a single attack (even if flat-footed). Activating the effect doesn’t take an action; you can even activate it on another character’s turn if needed. You must choose to use the moment of prescience before you make the roll it is to modify. Once used, the spell ends.

You can’t have more than one moment of prescience active on you at the same time.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('mount', 'Mount', 'Conjuración', 'Convocación', NULL, '1 round', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'One mount', '2 hours/Nivel (D)', 'Ninguna', 'No', 'You summon a light horse or a pony (your choice) to serve you as a mount. The steed serves willingly and well. The mount comes with a bit and bridle and a riding saddle.

A bit of horse hair.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('move-earth', 'Move Earth', 'Transmutación', NULL, ARRAY['Tierra']::TEXT[], 'See text', 'Largo (400 ft. + 40 ft./Nivel)', NULL, 'Dirt in an Área up to 750 ft. square and up to 10 ft. deep (S)', NULL, 'Instantáneo', 'Ninguna', 'No', 'Move earth moves dirt (clay, loam, sand), possibly collapsing embankments, moving hillocks, shifting dunes, and so forth.

However, in no event can rock formations be collapsed or moved. The area to be affected determines the casting time. For every 150-foot square (up to 10 feet deep), casting takes 10 minutes. The maximum area, 750 feet by 750 feet, takes 4 hours and 10 minutes to move.

This spell does not violently break the surface of the ground. Instead, it creates wavelike crests and troughs, with the earth reacting with glacierlike fluidity until the desired result is achieved. Trees, structures, rock formations, and such are mostly unaffected except for changes in elevation and relative topography.

The spell cannot be used for tunneling and is generally too slow to trap or bury creatures. Its primary use is for digging or filling moats or for adjusting terrain contours before a battle.

This spell has no effect on earth creatures.

A mixture of soils (clay, loam, and sand) in a small bag, and an iron blade.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('neutralize-poison', 'Neutralize Poison', 'Conjuración', 'Curación', NULL, '1 standard action', 'Toque', 'Creature or object of up to 1 cu. ft./Nivel touched', NULL, NULL, '10 min./Nivel', 'Voluntad anula (harmless, object)', 'Sí (harmless, object)', 'You detoxify any sort of venom in the creature or object touched. A poisoned creature suffers no additional effects from the poison, and any temporary effects are ended, but the spell does not reverse instantaneous effects, such as hit point damage, temporary ability damage, or effects that don’t go away on their own.

The creature is immune to any poison it is exposed to during the duration of the spell. Unlike with delay poison, such effects aren’t postponed until after the duration —the creature need not make any saves against poison effects applied to it during the length of the spell.

This spell can instead neutralize the poison in a poisonous creature or object for the duration of the spell, at the caster’s option.

A bit of charcoal.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('nightmare', 'Nightmare', 'Ilusión', 'Fantasma', ARRAY['Afecta la Mente, Maligno']::TEXT[], '10 minutes', 'Ilimitado', 'One living creature', NULL, NULL, 'Instantáneo', 'Voluntad anula; see text', 'Sí', 'You send a hideous and unsettling phantasmal vision to a specific creature that you name or otherwise specifically designate.

The nightmare prevents restful sleep and causes 1d10 points of damage. The nightmare leaves the subject fatigued and unable to regain arcane spells for the next 24 hours.

The difficulty of the save depends on how well you know the subject and what sort of physical connection (if any) you have to that creature.

Dispel evil cast on the subject while you are casting the spell dispels the nightmare and causes you to be stunned for 10 minutes per caster level of the dispel evil.

If the recipient is awake when the spell begins, you can choose to cease casting (ending the spell) or to enter a trance until the recipient goes to sleep, whereupon you become alert again and complete the casting. If you are disturbed during the trance, you must succeed on a Concentration check as if you were in the midst of casting a spell or the spell ends.

If you choose to enter a trance, you are not aware of your surroundings or the activities around you while in the trance.

You are defenseless, both physically and mentally, while in the trance. (You always fail any saving throw, for example.)

Creatures who don’t sleep (such as elves, but not half-elves) or dream are immune to this spell.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('nondetection', 'Nondetection', 'Abjuración', NULL, NULL, '1 standard action', 'Toque', 'Creature or object touched', NULL, NULL, '1 hour/Nivel', 'Voluntad anula (harmless, object)', 'Sí (harmless, object)', 'The warded creature or object becomes difficult to detect by divination spells such as clairaudience/clairvoyance, locate object, and detect spells. Nondetection also prevents location by such magic items as crystal balls. If a divination is attempted against the warded creature or item, the caster of the divination must succeed on a caster level check (1d20 + caster level) against a DC of 11 + the caster level of the spellcaster who cast nondetection. If you cast nondetection on yourself or on an item currently in your possession, the DC is 15 + your caster level.

If cast on a creature, nondetection wards the creature’s gear as well as the creature itself.

A pinch of diamond dust worth 50 gp.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('obscure-object', 'Obscure Object', 'Abjuración', NULL, NULL, '1 standard action', 'Toque', 'One object touched of up to 100 lb./Nivel', NULL, NULL, '8 hours (D)', 'Voluntad anula (object)', 'Sí (object)', 'This spell hides an object from location by divination (scrying) effects, such as the scrying spell or a crystal ball. Such an attempt automatically fails (if the divination is targeted on the object) or fails to perceive the object (if the divination is targeted on a nearby location, object, or person).

A piece of chameleon skin.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('obscuring-mist', 'Obscuring Mist', 'Conjuración', 'Creación', NULL, '1 standard action', '20 ft.', NULL, NULL, 'Cloud spreads in 20-ft. radius from you, 20 ft. high', '1 min./Nivel', 'Ninguna', 'No', 'A misty vapor arises around you. It is stationary once created. The vapor obscures all sight, including darkvision, beyond 5 feet. A creature 5 feet away has concealment (attacks have a 20% miss chance). Creatures farther away have total concealment (50% miss chance, and the attacker cannot use sight to locate the target).

A moderate wind (11+ mph), such as from a gust of wind spell, disperses the fog in 4 rounds. A strong wind (21+ mph) disperses the fog in 1 round. A fireball, flame strike, or similar spell burns away the fog in the explosive or fiery spell’s area. A wall of fire burns away the fog in the area into which it deals damage.

This spell does not function underwater.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('open-close', 'Open/Close', 'Transmutación', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'Object weighing up to 30 lb. or portal that can be opened or closed', NULL, NULL, 'Instantáneo', 'Voluntad anula (object)', 'Sí (object)', 'You can open or close (your choice) a door, chest, box, window, bag, pouch, bottle, barrel, or other container. If anything resists this activity (such as a bar on a door or a lock on a chest), the spell fails. In addition, the spell can only open and close things weighing 30 pounds or less. Thus, doors, chests, and similar objects sized for enormous creatures may be beyond this spell’s ability to affect.

A brass key.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('order-s-wrath', 'Order’s Wrath', 'Evocación', NULL, ARRAY['Legal']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, 'Nonlawful creatures within a burst that fills a 30-ft. cube', NULL, 'Instantáneo (1 round); see text', 'Voluntad parcial; see text', 'Sí', 'You channel lawful power to smite enemies. The power takes the form of a three-dimensional grid of energy. Only chaotic and neutral (not lawful) creatures are harmed by the spell.

The spell deals 1d8 points of damage per two caster levels (maximum 5d8) to chaotic creatures (or 1d6 points of damage per caster level, maximum 10d6, to chaotic outsiders) and causes them to be dazed for 1 round. A successful Will save reduces the damage to half and negates the daze effect.

The spell deals only half damage to creatures who are neither chaotic nor lawful, and they are not dazed. They can reduce the damage in half again (down to one-quarter of the roll) with a successful Will save.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('overland-flight', 'Overland Flight', 'Transmutación', NULL, NULL, NULL, 'Personal', 'You', NULL, NULL, '1 hour/Nivel', NULL, 'No', 'This spell functions like a fly spell, except you can fly at a speed of 40 feet (30 feet if wearing medium or heavy armor, or if carrying a medium or heavy load) with average maneuverability. When using this spell for long-distance movement, you can hustle without taking nonlethal damage (a forced march still requires Constitution checks). This means you can cover 64 miles in an eight-hour period of flight (or 48 miles at a speed of 30 feet).', NULL, NULL, NULL, true, true, false, false, false, false),
  ('owl-s-wisdom', 'Owl’s Wisdom', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 min./Nivel', 'Voluntad anula (harmless)', 'Sí', 'The transmuted creature becomes wiser. The spell grants a +4 enhancement bonus to Wisdom, adding the usual benefit to Wisdom-related skills. Clerics, druids, paladins, and rangers (and other Wisdom-based spellcasters) who receive owl’s wisdom do not gain any additional bonus spells for the increased Wisdom, but the save DCs for their spells increase.

A few feathers, or a pinch of droppings, from an owl.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('owl-s-wisdom-mass', 'Owl’s Wisdom, Mass', 'Transmutación', NULL, NULL, NULL, 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature/Nivel, No two of which can be more than 30 ft. apart', NULL, NULL, NULL, NULL, 'No', 'This spell functions like owl’s wisdom, except that it affects multiple creatures.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('passwall', 'Passwall', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', NULL, NULL, '5 ft. by 8 ft. opening, 10 ft. deep plus 5 ft. deep per three additional levels', '1 hour/Nivel (D)', 'Ninguna', 'No', 'You create a passage through wooden, plaster, or stone walls, but not through metal or other harder materials. The passage is 10 feet deep plus an additional 5 feet deep per three caster levels above 9th (15 feet at 12th, 20 feet at 15th, and a maximum of 25 feet deep at 18th level). If the wall’s thickness is more than the depth of the passage created, then a single passwall simply makes a niche or short tunnel. Several passwall spells can then form a continuing passage to breach very thick walls. When passwall ends, creatures within the passage are ejected out the nearest exit. If someone dispels the passwall or you dismiss it, creatures in the passage are ejected out the far exit, if there is one, or out the sole exit if there is only one.

A pinch of sesame seeds.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('pass-without-trace', 'Pass without Trace', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'One creature/Nivel touched', NULL, NULL, '1 hour/Nivel (D)', 'Voluntad anula (harmless)', 'Sí (harmless)', 'The subject or subjects can move through any type of terrain and leave neither footprints nor scent. Tracking the subjects is impossible by nonmagical means.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('permanency', 'Permanency', 'Universal', NULL, NULL, '2 rounds', 'See text', NULL, NULL, NULL, 'Permanente; see text', 'Ninguna', 'No', 'This spell makes certain other spells permanent.

Depending on the spell, you must be of a minimum caster level and must expend a number of XP.

You can make the following spells permanent in regard to yourself.

You cast the desired spell and then follow it with the permanency spell. You cannot cast these spells on other creatures. This application of permanency can be dispelled only by a caster of higher level than you were when you cast the spell.

In addition to personal use, permanency can be used to make the following spells permanent on yourself, another creature, or an object (as appropriate).

Additionally, the following spells can be cast upon objects or areas only and rendered permanent.

Spells cast on other creatures, objects, or locations (not on you) are vulnerable to dispel magic as normal.

See tables above.', NULL, NULL, NULL, true, true, false, false, false, true),
  ('permanent-image', 'Permanent Image', 'Ilusión', 'Engaño', NULL, NULL, NULL, NULL, NULL, 'Engaño that cannot extend beyond a 20-ft. cube + one 10-ft. cube/Nivel (S)', 'Permanente (D)', NULL, 'No', 'This spell functions like silent image, except that the figment includes visual, auditory, olfactory, and thermal elements, and the spell is permanent. By concentrating, you can move the image within the limits of the range, but it is static while you are not concentrating.

Powdered jade worth 100 gp.

A bit of fleece.', NULL, NULL, NULL, true, true, true, true, false, false),
  ('persistent-image', 'Persistent Image', 'Ilusión', 'Engaño', NULL, NULL, NULL, NULL, NULL, NULL, '1 min./Nivel (D)', NULL, 'No', 'This spell functions like silent image, except that the figment includes visual, auditory, olfactory, and thermal components, and the figment follows a script determined by you. The figment follows that script without your having to concentrate on it. The illusion can include intelligible speech if you wish.

A bit of fleece and several grains of sand.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('phantasmal-killer', 'Phantasmal Killer', 'Ilusión', 'Fantasma', ARRAY['Miedo, Afecta la Mente']::TEXT[], '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', 'One living creature', NULL, NULL, 'Instantáneo', 'Voluntad incredulidad (if interacted with), then Fortaleza parcial; see text', 'Sí', 'You create a phantasmal image of the most fearsome creature imaginable to the subject simply by forming the fears of the subject’s subconscious mind into something that its conscious mind can visualize: this most horrible beast. Only the spell’s subject can see the phantasmal killer. You see only a vague shape. The target first gets a Will save to recognize the image as unreal. If that save fails, the phantasm touches the subject, and the subject must succeed on a Fortitude save or die from fear. Even if the Fortitude save is successful, the subject takes 3d6 points of damage.

If the subject of a phantasmal killer attack succeeds in disbelieving and is wearing a helm of telepathy, the beast can be turned upon you. You must then disbelieve it or become subject to its deadly fear attack.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('phantom-steed', 'Phantom Steed', 'Conjuración', 'Creación', NULL, '10 minutes', '0 ft.', NULL, NULL, 'One quasi-real, horselike creature', '1 hour/Nivel (D)', 'Ninguna', 'No', 'You conjure a Large, quasi-real, horselike creature. The steed can be ridden only by you or by the one person for whom you specifically created the mount. A phantom steed has a black head and body, gray mane and tail, and smoke-colored, insubstantial hooves that make no sound. It has what seems to be a saddle, bit, and bridle. It does not fight, but animals shun it and refuse to attack it.

The mount has an AC of 18 (-1 size, +4 natural armor, +5 Dex) and 7 hit points +1 hit point per caster level. If it loses all its hit points, the phantom steed disappears. A phantom steed has a speed of 20 feet per caster level, to a maximum of 240 feet. It can bear its rider’s weight plus up to 10 pounds per caster level.

These mounts gain certain powers according to caster level. A mount’s abilities include those of mounts of lower caster levels.

The mount can ride over sandy, muddy, or even swampy ground without difficulty or decrease in speed.

The mount can use water walk at will (as the spell, no action required to activate this ability).

The mount can use air walk at will (as the spell, no action required to activate this ability) for up to 1 round at a time, after which it falls to the ground.

The mount can fly at its speed (average maneuverability).', NULL, NULL, NULL, true, true, false, false, false, false),
  ('phantom-trap', 'Phantom Trap', 'Ilusión', 'Glamour', NULL, '1 standard action', 'Toque', 'Object touched', NULL, NULL, 'Permanente (D)', 'Ninguna', 'No', 'This spell makes a lock or other small mechanism seem to be trapped to anyone who can detect traps. You place the spell upon any small mechanism or device, such as a lock, hinge, hasp, cork, cap, or ratchet. Any character able to detect traps, or who uses any spell or device enabling trap detection, is 100% certain a real trap exists. Of course, the effect is illusory and nothing happens if the trap is “sprung”; its primary purpose is to frighten away thieves or make them waste precious time.

If another phantom trap is active within 50 feet when the spell is cast, the casting fails.

A piece of iron pyrite touched to the object to be trapped while the object is sprinkled with a special dust requiring 50 gp to prepare.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('phase-door', 'Phase Door', 'Conjuración', 'Creación', NULL, '1 standard action', '0 ft.', NULL, NULL, 'Ethereal 5 ft. by 8 ft. opening, 10 ft. deep + 5 ft. deep per three levels', 'One usage per two levels', 'Ninguna', 'No', 'This spell creates an ethereal passage through wooden, plaster, or stone walls, but not other materials. The phase door is invisible and inaccessible to all creatures except you, and only you can use the passage. You disappear when you enter the phase door and appear when you exit. If you desire, you can take one other creature (Medium or smaller) through the door. This counts as two uses of the door. The door does not allow light, sound, or spell effects through it, nor can you see through it without using it. Thus, the spell can provide an escape route, though certain creatures, such as phase spiders, can follow with ease. A gem of true seeing or similar magic reveals the presence of a phase door but does not allow its use.

A phase door is subject to dispel magic. If anyone is within the passage when it is dispelled, he is harmlessly ejected just as if he were inside a passwall effect.

You can allow other creatures to use the phase door by setting some triggering condition for the door. Such conditions can be as simple or elaborate as you desire. They can be based on a creature’s name, identity, or alignment, but otherwise must be based on observable actions or qualities. Intangibles such as level, class, Hit Dice, and hit points don’t qualify.

Phase door can be made permanent with a permanency spell.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('planar-ally', 'Planar Ally', 'Conjuración', 'Llamada', ARRAY['see text for lesser planar ally']::TEXT[], NULL, NULL, NULL, NULL, 'One or two called elementals or outsiders, totaling No more than 12 HD, which cannot be more than 30 ft. apart when they appear', NULL, NULL, 'No', 'This spell functions like lesser planar ally, except you may call a single creature of 12 HD or less, or two creatures of the same kind whose Hit Dice total no more than 12. The creatures agree to help you and request your return payment together.

250 XP.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('planar-ally-greater', 'Planar Ally, Greater', 'Conjuración', 'Llamada', ARRAY['see text for lesser planar ally']::TEXT[], NULL, NULL, NULL, NULL, 'Up to three called elementals or outsiders, totaling No more than 18 HD, No two of which can be more than 30 ft. apart when they appear.', NULL, NULL, 'No', 'This spell functions like lesser planar ally, except that you may call a single creature of 18 HD or less, or up to three creatures of the same kind whose Hit Dice total no more than 18. The creatures agree to help you and request your return payment together.

500 XP.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('planar-ally-lesser', 'Planar Ally, Lesser', 'Conjuración', 'Llamada', ARRAY['see text']::TEXT[], '10 minutes', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'One called elemental or outsider of 6 HD or less', 'Instantáneo', 'Ninguna', 'No', 'By casting this spell, you request your deity to send you an elemental or outsider (of 6 HD or less) of the deity’s choice. If you serve no particular deity, the spell is a general plea answered by a creature sharing your philosophical alignment. If you know an individual creature’s name, you may request that individual by speaking the name during the spell (though you might get a different creature anyway).

You may ask the creature to perform one task in exchange for a payment from you. Tasks might range from the simple to the complex. You must be able to communicate with the creature called in order to bargain for its services.

The creature called requires a payment for its services. This payment can take a variety of forms, from donating gold or magic items to an allied temple, to a gift given directly to the creature, to some other action on your part that matches the creature’s alignment and goals. Regardless, this payment must be made before the creature agrees to perform any services. The bargaining takes at least 1 round, so any actions by the creature begin in the round after it arrives.

A task taking up to 1 minute per caster level requires a payment of 100 gp per HD of the creature called. For a task taking up to 1 hour per caster level, the creature requires a payment of 500 gp per HD. A long-term task, one requiring up to one day per caster level, requires a payment of 1,000 gp per HD.

A nonhazardous task requires only half the indicated payment, while an especially hazardous task might require a greater gift. Few if any creatures will accept a task that seems suicidal (remember, a called creature actually dies when it is killed, unlike a summoned creature). However, if the task is strongly aligned with the creature’s ethos, it may halve or even waive the payment.

At the end of its task, or when the duration bargained for expires, the creature returns to its home plane (after reporting back to you, if appropriate and possible).

Note: When you use a calling spell that calls an air, chaotic, earth, evil, fire, good, lawful, or water creature, it is a spell of that type.

100 XP.', NULL, NULL, NULL, true, true, false, false, true, true),
  ('planar-binding', 'Planar Binding', 'Conjuración', 'Llamada', ARRAY['see text for lesser planar binding']::TEXT[], NULL, NULL, 'Up to three elementals or outsiders, totaling No more than 12 HD, No two of which can be more than 30 ft. apart when they appear', NULL, NULL, NULL, NULL, 'No', 'This spell functions like lesser planar binding, except that you may call a single creature of 12 HD or less, or up to three creatures of the same kind whose Hit Dice total no more than 12. Each creature gets a save, makes an independent attempt to escape, and must be individually persuaded to aid you.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('planar-binding-greater', 'Planar Binding, Greater', 'Conjuración', 'Llamada', ARRAY['see text for lesser planar binding']::TEXT[], NULL, NULL, 'Up to three elementals or outsiders, totaling No more than 18 HD, No two of which can be more than 30 ft. apart when they appear.', NULL, NULL, NULL, NULL, 'No', 'This spell functions like lesser planar binding, except that you may call a single creature of 18 HD or less, or up to three creatures of the same kind whose Hit Dice total no more than 18. Each creature gets a saving throw, makes independent attempts to escape, and must be persuaded to aid you individually.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('planar-binding-lesser', 'Planar Binding, Lesser', 'Conjuración', 'Llamada', ARRAY['see text']::TEXT[], '10 minutes', 'Cercano (25 ft. + 5 ft./2 levels); see text', 'One elemental or outsider with 6 HD or less', NULL, NULL, 'Instantáneo', 'Voluntad anula', 'No and Sí; see text', 'Casting this spell attempts a dangerous act: to lure a creature from another plane to a specifically prepared trap, which must lie within the spell’s range. The called creature is held in the trap until it agrees to perform one service in return for its freedom.

The target creature is allowed a Will saving throw. If the saving throw succeeds, the creature resists the spell. If the saving throw fails, the creature is immediately drawn to the trap (spell resistance does not keep it from being called). The creature can escape from the trap with by successfully pitting its spell resistance against your caster level check, by dimensional travel, or with a successful Charisma check (DC 15 + ½ your caster level + your Cha modifier). It can try each method once per day. If it breaks loose, it can flee or attack you. A dimensional anchor cast on the creature prevents its escape via dimensional travel. You can also employ a calling diagram (see magic circle against evil) to make the trap more secure.

If the creature does not break free of the trap, you can keep it bound for as long as you dare. You can attempt to compel the creature to perform a service by describing the service and perhaps offering some sort of reward. You make a Charisma check opposed by the creature’s Charisma check. The check is assigned a bonus of +0 to +6 based on the nature of the service and the reward. If the creature wins the opposed check, it refuses service. New offers, bribes, and the like can be made or the old ones reoffered every 24 hours. This process can be repeated until the creature promises to serve, until it breaks free, or until you decide to get rid of it by means of some other spell. Impossible demands or unreasonable commands are never agreed to. If you roll a 1 on the Charisma check, the creature breaks free of the binding and can escape or attack you.

Once the requested service is completed, the creature need only so inform you to be instantly sent back whence it came. The creature might later seek revenge. If you assign some open-ended task that the creature cannot complete though its own actions the spell remains in effect for a maximum of one day per caster level, and the creature gains an immediate chance to break free. Note that a clever recipient can subvert some instructions.

When you use a calling spell to call an air, chaotic, earth, evil, fire, good, lawful, or water creature, it is a spell of that type.', NULL, 'To create the trap, you must use a magic circle spell, ed inward. The kind of creature to be bound must be known and stated. If you wish to call a specific individual, you must use that individual’s proper name in casting the spell.', NULL, true, true, false, false, false, false),
  ('plane-shift', 'Plane Shift', 'Conjuración', 'Teletransportación', NULL, '1 standard action', 'Toque', 'Creature touched, or up to eight willing creatures joining hands', NULL, NULL, 'Instantáneo', 'Voluntad anula', 'Sí', 'You move yourself or some other creature to another plane of existence or alternate dimension. If several willing persons link hands in a circle, as many as eight can be affected by the plane shift at the same time. Precise accuracy as to a particular arrival location on the intended plane is nigh impossible. From the Material Plane, you can reach any other plane, though you appear 5 to 500 miles (5d%) from your intended destination.

Note: Plane shift transports creatures instantaneously and then ends. The creatures need to find other means if they are to travel back.

A small, forked metal rod. The size and metal type dictates to which plane of existence or alternate dimension the spell sends the affected creatures.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('plant-growth', 'Plant Growth', 'Transmutación', NULL, NULL, '1 standard action', 'See text', NULL, NULL, NULL, 'Instantáneo', 'Ninguna', 'No', 'Plant growth has different effects depending on the version chosen.

This effect causes normal vegetation (grasses, briars, bushes, creepers, thistles, trees, vines) within long range (400 feet + 40 feet per caster level) to become thick and overgrown. The plants entwine to form a thicket or jungle that creatures must hack or force a way through. Speed drops to 5 feet, or 10 feet for Large or larger creatures. The area must have brush and trees in it for this spell to take effect.

At your option, the area can be a 100-foot-radius circle, a 150-foot-radius semicircle, or a 200-foot-radius quarter circle.

You may designate places within the area that are not affected.

This effect targets plants within a range of one-half mile, raising their potential productivity over the course of the next year to one-third above normal.

Plant growth counters diminish plants.

This spell has no effect on plant creatures.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('poison', 'Poison', 'Nigromancia', NULL, NULL, '1 standard action', 'Toque', 'Living creature touched', NULL, NULL, 'Instantáneo; see text', 'Fortaleza anula; see text', 'Sí', 'Calling upon the venomous powers of natural predators, you infect the subject with a horrible poison by making a successful melee touch attack. The poison deals 1d10 points of temporary Constitution damage immediately and another 1d10 points of temporary Constitution damage 1 minute later. Each instance of damage can be negated by a Fortitude save (DC 10 + ½ your caster level + your Wis modifier).', NULL, NULL, NULL, true, true, false, false, true, false),
  ('polar-ray', 'Polar Ray', 'Evocación', NULL, ARRAY['Frío']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Ray', 'Instantáneo', 'Ninguna', 'Sí', 'A blue-white ray of freezing air and ice springs from your hand. You must succeed on a ranged touch attack with the ray to deal damage to a target. The ray deals 1d6 points of cold damage per caster level (maximum 25d6).

A small, white ceramic cone or prism.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('polymorph', 'Polymorph', 'Transmutación', NULL, NULL, '1 standard action', 'Toque', 'Willing living creature touched', NULL, NULL, '1 min./Nivel (D)', 'Ninguna', 'No', 'This spell functions like alter self, except that you change the willing subject into another form of living creature. The new form may be of the same type as the subject or any of the following types: aberration, animal, dragon, fey, giant, humanoid, magical beast, monstrous humanoid, ooze, plant, or vermin. The assumed form can’t have more Hit Dice than your caster level (or the subject’s HD, whichever is lower), to a maximum of 15 HD at 15th level. You can’t cause a subject to assume a form smaller than Fine, nor can you cause a subject to assume an incorporeal or gaseous form. The subject’s creature type and subtype (if any) change to match the new form.

Upon changing, the subject regains lost hit points as if it had rested for a night (though this healing does not restore temporary ability damage and provide other benefits of resting; and changing back does not heal the subject further). If slain, the subject reverts to its original form, though it remains dead.

The subject gains the Strength, Dexterity, and Constitution scores of the new form but retains its own Intelligence, Wisdom, and Charisma scores. It also gains all extraordinary special attacks possessed by the form but does not gain the extraordinary special qualities possessed by the new form or any supernatural or spell-like abilities.

Incorporeal or gaseous creatures are immune to being polymorphed, and a creature with the shapechanger subtype can revert to its natural form as a standard action.

An empty cocoon.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('polymorph-any-object', 'Polymorph Any Object', 'Transmutación', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature, or one nonmagical object of up to 100 cu. ft./Nivel', NULL, NULL, 'See text', 'Fortaleza anula (object); see text', 'Sí (object)', 'This spell functions like polymorph, except that it changes one object or creature into another. The duration of the spell depends on how radical a change is made from the original state to its enchanted state. The duration is determined by using the following guidelines.

Unlike polymorph, polymorph any object does grant the creature the Intelligence score of its new form. If the original form didn’t have a Wisdom or Charisma score, it gains those scores as appropriate for the new form.

Damage taken by the new form can result in the injury or death of the polymorphed creature. In general, damage occurs when the new form is changed through physical force.

A nonmagical object cannot be made into a magic item with this spell. Magic items aren’t affected by this spell.

This spell cannot create material of great intrinsic value, such as copper, silver, gems, silk, gold, platinum, mithral, or adamantine. It also cannot reproduce the special properties of cold iron in order to overcome the damage reduction of certain creatures.

This spell can also be used to duplicate the effects of baleful polymorph, polymorph, flesh to stone, stone to flesh, transmute mud to rock, transmute metal to wood, or transmute rock to mud.

Mercury, gum arabic, and smoke.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('power-word-blind', 'Power Word Blind', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature with 200 hp or less', NULL, NULL, 'See text', 'Ninguna', 'Sí', 'You utter a single word of power that causes one creature of your choice to become blinded, whether the creature can hear the word or not. The duration of the spell depends on the target’s current hit point total. Any creature that currently has 201 or more hit points is unaffected by power word blind.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('power-word-kill', 'Power Word Kill', 'Encantamiento', 'Compulsión', ARRAY['Muerte, Afecta la Mente']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One living creature with 100 hp or less', NULL, NULL, 'Instantáneo', 'Ninguna', 'Sí', 'You utter a single word of power that instantly kills one creature of your choice, whether the creature can hear the word or not. Any creature that currently has 101 or more hit points is unaffected by power word kill.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('power-word-stun', 'Power Word Stun', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', 'One creature with 150 hp or less', NULL, NULL, 'See text', 'Ninguna', 'Sí', 'You utter a single word of power that instantly causes one creature of your choice to become stunned, whether the creature can hear the word or not. The duration of the spell depends on the target’s current hit point total. Any creature that currently has 151 or more hit points is unaffected by power word stun.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('prayer', 'Prayer', 'Encantamiento', 'Compulsión', ARRAY['Afecta la Mente']::TEXT[], '1 standard action', '40 ft.', NULL, 'All allies and foes within a 40-ft.-radius burst centered on you', NULL, '1 round/Nivel', 'Ninguna', 'Sí', 'You bring special favor upon yourself and your allies while bringing disfavor to your enemies. You and your each of your allies gain a +1 luck bonus on attack rolls, weapon damage rolls, saves, and skill checks, while each of your foes takes a -1 penalty on such rolls.', NULL, NULL, NULL, true, true, false, false, true, false),
  ('prestidigitation', 'Prestidigitation', 'Universal', NULL, NULL, '1 standard action', '10 ft.', NULL, NULL, NULL, '1 hour', 'See text', 'No', 'Prestidigitations are minor tricks that novice spellcasters use for practice. Once cast, a prestidigitation spell enables you to perform simple magical effects for 1 hour. The effects are minor and have severe limitations. A prestidigitation can slowly lift 1 pound of material. It can color, clean, or soil items in a 1-foot cube each round. It can chill, warm, or flavor 1 pound of nonliving material. It cannot deal damage or affect the concentration of spellcasters. Prestidigitation can create small objects, but they look crude and artificial. The materials created by a prestidigitation spell are extremely fragile, and they cannot be used as tools, weapons, or spell components. Finally, a prestidigitation lacks the power to duplicate any other spell effects. Any actual change to an object (beyond just moving, cleaning, or soiling it) persists only 1 hour.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('prismatic-sphere', 'Prismatic Sphere', 'Abjuración', NULL, NULL, NULL, '10 ft.', NULL, NULL, '10-ft.-radius sphere centered on you', NULL, NULL, 'No', 'This spell functions like prismatic wall, except you conjure up an immobile, opaque globe of shimmering, multicolored light that surrounds you and protects you from all forms of attack. The sphere flashes in all colors of the visible spectrum.

The sphere’s blindness effect on creatures with less than 8 HD lasts 2d4×10 minutes.

You can pass into and out of the prismatic sphere and remain near it without harm. However, when you’re inside it, the sphere blocks any attempt to project something through the sphere (including spells). Other creatures that attempt to attack you or pass through suffer the effects of each color, one at a time.

Typically, only the upper hemisphere of the globe will exist, since you are at the center of the sphere, so the lower half is usually excluded by the floor surface you are standing on.

The colors of the sphere have the same effects as the colors of a prismatic wall.

Prismatic sphere can be made permanent with a permanency spell.', NULL, NULL, NULL, true, false, false, false, false, false),
  ('prismatic-spray', 'Prismatic Spray', 'Evocación', NULL, NULL, '1 standard action', '60 ft.', NULL, 'Cone-shaped burst', NULL, 'Instantáneo', 'See text', 'Sí', 'This spell causes seven shimmering, intertwined, multicolored beams of light to spray from your hand. Each beam has a different power. Creatures in the area of the spell with 8 HD or less are automatically blinded for 2d4 rounds. Every creature in the area is randomly struck by one or more beams, which have additional effects.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('prismatic-wall', 'Prismatic Wall', 'Abjuración', NULL, NULL, '1 standard action', 'Cercano (25 ft. + 5 ft./2 levels)', NULL, NULL, 'Wall 4 ft./Nivel wide, 2 ft./Nivel high', '10 min./Nivel (D)', 'See text', 'See text', 'Prismatic wall creates a vertical, opaque wall—a shimmering, multicolored plane of light that protects you from all forms of attack. The wall flashes with seven colors, each of which has a distinct power and purpose. The wall is immobile, and you can pass through and remain near the wall without harm. However, any other creature with less than 8 HD that is within 20 feet of the wall is blinded for 2d4 rounds by the colors if it looks at the wall.

The wall’s maximum proportions are 4 feet wide per caster level and 2 feet high per caster level. A prismatic wall spell cast to materialize in a space occupied by a creature is disrupted, and the spell is wasted.

Each color in the wall has a special effect. The accompanying table shows the seven colors of the wall, the order in which they appear, their effects on creatures trying to attack you or pass through the wall, and the magic needed to negate each color.

The wall can be destroyed, color by color, in consecutive order, by various magical effects; however, the first color must be brought down before the second can be affected, and so on. A rod of cancellation or a mage’s disjunction spell destroys a prismatic wall, but an antimagic field fails to penetrate it. Dispel magic and greater dispel magic cannot dispel the wall or anything beyond it. Spell resistance is effective against a prismatic wall, but the caster level check must be repeated for each color present.

Prismatic wall can be made permanent with a permanency spell.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('produce-flame', 'Produce Flame', 'Evocación', NULL, ARRAY['Fuego']::TEXT[], '1 standard action', '0 ft.', NULL, NULL, 'Flame in your palm', '1 min./Nivel (D)', 'Ninguna', 'Sí', 'Flames as bright as a torch appear in your open hand. The flames harm neither you nor your equipment.

In addition to providing illumination, the flames can be hurled or used to touch enemies. You can strike an opponent with a melee touch attack, dealing fire damage equal to 1d6 +1 point per caster level (maximum +5). Alternatively, you can hurl the flames up to 120 feet as a thrown weapon. When doing so, you attack with a ranged touch attack (with no range penalty) and deal the same damage as with the melee attack. No sooner do you hurl the flames than a new set appears in your hand. Each attack you make reduces the remaining duration by 1 minute. If an attack reduces the remaining duration to 0 minutes or less, the spell ends after the attack resolves.

This spell does not function underwater.', NULL, NULL, NULL, true, true, false, false, false, false),
  ('programmed-image', 'Programmed Image', 'Ilusión', 'Engaño', NULL, NULL, NULL, NULL, NULL, 'Visual Engaño that cannot extend beyond a 20-ft. cube + one 10-ft. cube/Nivel (S)', 'Permanente until triggered, then 1 round/Nivel', NULL, 'No', 'This spell functions like silent image, except that this spell’s figment activates when a specific condition occurs. The figment includes visual, auditory, olfactory, and thermal elements, including intelligible speech.

You set the triggering condition (which may be a special word) when casting the spell. The event that triggers the illusion can be as general or as specific and detailed as desired but must be based on an audible, tactile, olfactory, or visual trigger. The trigger cannot be based on some quality not normally obvious to the senses, such as alignment. (See magic mouth for more details about such triggers.)

A bit of fleece and jade dust worth 25 gp.', NULL, NULL, NULL, false, false, false, false, false, false),
  ('project-image', 'Project Image', 'Ilusión', 'Sombra', NULL, '1 standard action', 'Medio (100 ft. + 10 ft./Nivel)', NULL, NULL, 'One Sombra duplicate', '1 round/Nivel (D)', 'Voluntad incredulidad (if interacted with)', 'No', 'You tap energy from the Plane of Shadow to create a quasi-real, illusory version of yourself. The projected image looks, sounds, and smells like you but is intangible. The projected image mimics your actions (including speech) unless you direct it to act differently (which is a move action).

You can see through its eyes and hear through its ears as if you were standing where it is, and during your turn you can switch from using its senses to using your own, or back again, as a free action. While you are using its senses, your body is considered blinded and deafened.

If you desire, any spell you cast whose range is touch or greater can originate from the projected image instead of from you. The projected image can’t cast any spells on itself except for illusion spells. The spells affect other targets normally, despite originating from the projected image.

Objects are affected by the projected image as if they had succeeded on their Will save.

You must maintain line of effect to the projected image at all times. If your line of effect is obstructed, the spell ends. If you use dimension door, teleport, plane shift, or a similar spell that breaks your line of effect, even momentarily, the spell ends.

A small replica of you (a doll), which costs 5 gp to create.', NULL, NULL, NULL, true, true, true, false, false, false),
  ('protection-from-arrows', 'Protection from Arrows', 'Abjuración', NULL, NULL, '1 standard action', 'Toque', 'Creature touched', NULL, NULL, '1 hour/Nivel or until discharged', 'Voluntad anula (harmless)', 'Sí (harmless)', 'The warded creature gains resistance to ranged weapons. The subject gains damage reduction 10/magic against ranged weapons. (This spell doesn’t grant you the ability to damage creatures with similar damage reduction.) Once the spell has prevented a total of 10 points of damage per caster level (maximum 100 points), it is discharged.

A piece of shell from a tortoise or a turtle.', NULL, NULL, NULL, true, true, false, true, false, false),
  ('protection-from-chaos', 'Protection from Chaos', 'Abjuración', NULL, ARRAY['Legal']::TEXT[], NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'No', 'This spell functions like protection from evil, except that the deflection and resistance bonuses apply to attacks from chaotic creatures, and chaotic summoned creatures cannot touch the subject.', NULL, NULL, NULL, false, false, false, false, false, false)
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

-- Verificación de la parte 4
SELECT 'Parte 4/7 insertada' AS status, COUNT(*) AS count FROM public.spells;
