-- Population Data

INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Adapt Body',
  'adapt-body',
  'Psychometabolism',
  'Psion/wilder 5, psychic warrior 5',
  '1 standard action',
  'Personal',
  'You',
  '1 hour/level (D)',
  NULL,
  NULL,
  'Your body automatically adapts to hostile environments. You can adapt to underwater, extremely hot, extremely cold, or airless environments, allowing you to survive as if you were a creature native to that environment. You can breathe and move (though penalties to movement and attacks, if any for a particular environment, remain), and you take no damage simply from being in that environment. You need not specify what environment you are adapting to when you manifest this power; simply activate it, and your body will instantly adapt to any hostile environment as needed throughout the duration.

You can somewhat adapt to extreme environmental features such as acid, lava, fire, and electricity. Any environmental feature that normally directly deals 1 or more dice of damage per round deals you only half the usual amount of damage.',
  true,
  '9'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Affinity Field',
  'affinity-field',
  'Psychometabolism',
  'Psion/wilder 9',
  '1 standard action',
  '20 ft.',
  NULL,
  '1 round/level (D)',
  'Fortitude negates (potentially harmless)',
  'Yes',
  'You create an affinity feedback loop with all creatures within the area. While the duration lasts, affected creatures take all damage (including ability damage) as you do and heal all wounds as you do. Hit points gained or lost persist after this power ends.

Creatures in range are also subject to magical and psionic effects of 3rd level or lower. Creatures that have an affinity to you gain a saving throw against each new power transferred through the affinity field as if the power were manifested upon them normally. All magical and psionic effects transferred to subjects fade at the end of this power&rsquo;s duration, although instantaneous effects remain. If you suddenly become immune to a particular effect or power, the effect or power to which you are immune cannot be transferred to creatures that have affinity to you.',
  true,
  '17'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Anchored Navigation',
  'anchored-navigation',
  'Clairsentience',
  'Seer 4',
  '1 standard action',
  'Personal',
  'You',
  '1 hour/level',
  NULL,
  NULL,
  'You know where you are in relation to a fixed starting point, which is essential for setting up a mishap-free teleport beacon. While the duration lasts, you are aware of your exact distance and route (physical or psychoportive) back to a fixed starting point. The &ldquo;anchored&rdquo; starting point is your exact location when you manifest the power. To designate other anchored starting points, you must manifest this power multiple times and be present at the desired locations when you do so.

You can also retrace your steps through a maze automatically while the power lasts, without resorting to a map.

Anchored navigation grants you a mindlink with one designated creature who remains within a 60-foot radius of the starting point, regardless of the distance between you and the creature. The use of anchored navigation is confined to the plane of existence where you manifest it.

Augment: If you spend 6 additional power points, the effect of this power extends across all planar boundaries.',
  true,
  '7'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Animal Affinity',
  'animal-affinity',
  'Psychometabolism',
  'Egoist 2, psychic warrior 2',
  '1 standard action',
  'Personal',
  'You',
  '1 min./level',
  NULL,
  NULL,
  'You forge a psychometabolic affinity with an idealized animal form, thereby boosting one of your ability scores (choose either Strength, Dexterity, Constitution, Intelligence, Wisdom, or Charisma). The power grants a +4 enhancement bonus to the ability score you choose, adding the usual benefits provided by a high ability bonus. Because you are emulating the idealized form of an animal, you also take on minor aspects of the animal you choose. If you choose to increase the ability you use to manifest powers, you do not gain the benefit of an increased ability score long enough to gain any bonus power points for a high ability score, but the save DCs of your powers increase for the duration of this power.

Augment: For every 5 additional power points you spend, this power grants a +4 enhancement bonus to another ability.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Apopsi',
  'apopsi',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 9',
  '1 round',
  'Close (25 ft. + 5 ft./2 levels)',
  'One living psionic creature',
  'Instantaneous',
  'Fortitude negates',
  'Yes',
  'By using this power, you delete 1d4 powers permanently from the subject&rsquo;s mind. You specify the level of each power, and the DM randomly determines which of the subject&rsquo;s powers is actually deleted. Psychic chirurgery or reality revision can be used to restore the lost powers, but it must be performed within 1 week of losing the powers.

XP Cost: 50 XP per level of the deleted powers.',
  true,
  '17, XP'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Assimilate',
  'assimilate',
  'Psychometabolism',
  'Psion/wilder 9',
  '1 standard action',
  'Touch',
  'One living creature touched',
  'Instantaneous and 1 hour; see text',
  'Fortitude half',
  'Yes',
  'Your pointing finger turns black as obsidian. A creature touched by you is partially assimilated into your form and takes 20d6 points of damage. Any creature reduced to 0 or fewer hit points by this power is killed, entirely assimilated into your form, leaving behind only a trace of fine dust. An assimilated creature&rsquo;s equipment is unaffected.

A creature that is partially assimilated into your form (that is, a creature that has at least 1 hit point following your use of this power) grants you a number of temporary hit points equal to half the damage you dealt for 1 hour.

A creature that is completely assimilated grants you a number of temporary hit points equal to the damage you dealt and a +4 bonus to each of your ability scores for 1 hour. If the assimilated creature knows psionic powers, you gain knowledge of one of its powers for 1 hour. You gain some semblance of a creature you completely assimilate for 1 hour, granting you a +10 bonus on Disguise checks made to appear as that creature during that time.',
  true,
  '17'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Astral Caravan',
  'astral-caravan',
  'Psychoportation',
  'Nomad 3',
  '1 hour',
  'Personal',
  NULL,
  'See text',
  NULL,
  NULL,
  'You lead a caravan into the Astral Plane, leaving the Material Plane behind. Since the Astral Plane touches upon other planes, you can travel astrally to any of these other planes as you wish, but only if you know your way (see below).

You can bring other willing creatures with you, provided that these subjects have each manifested astral traveler and are linked hand to hand with you at the time of the astral caravan&rsquo;s manifestation. These fellow travelers are dependent upon you and must accompany you at all times. If something happens to you during the journey that causes you to break hand-to-hand contact, your companions are stranded wherever you leave them. Because the planes are a dangerous place, those who lead astral caravans usually choose to manifest this power only if they have a large party of travelers assembled. Sometimes groups of lower-level adventurers may hire you to lead forays beyond the Material Plane.

The astral caravan power lasts while you and your fellow travelers maintain your original formation, until (1) you reach your intended destination plane, (2) you desire to end the power while still traversing the Astral Plane, (3) you or anyone traveling with you breaks the hand-to-hand chain connecting the travelers for 2 consecutive rounds, or (4) the power is terminated by some outside means, such as dispel psionics. When the power ends, you and your fellow travelers halt in whatever portion of the Astral Plane you happen to be traversing (the Astral Plane is in many ways subjective in location; in any event, one place on the Astral looks much like any other).

While you are traveling through the Astral Plane, those natives who happen to glimpse you and your fellow travelers perceive you to be moving at a speed of 30 feet (you can&rsquo;t run), with you flying in the lead and your fellow travelers strung out behind you, each linked to the next by one hand.

Depending on your knowledge of the planes, your journey through the subjective space that is the Astral Plane may take a longer or shorter period of time. For each 24 hours you travel, make a Knowledge (the planes) check. Unless a location is particularly hard to find and well guarded, or conversely easy to find and well advertised, the average DC for an astral caravan journey should be set at 20. You cannot take 20 on this check, though you can take 10. Each check may be modified by your degree of familiarity with the destination or by some connection you have with the place; see the tables below.

Each successful check indicates that you are one step closer to your goal. To finally arrive at your location, you must succeed on six checks within a span of 12 days. (If you fail to make six successful checks within the first 12 days, you can continue to make one check per day until you get the requisite six successes within a span of 12 consecutive days). When you successfully make the requisite number of checks, the journey ends, and you appear on your chosen plane within 10-1,000 (1d% x 10) miles of your intended destination on that plane.

Augment: If you spend 2 additional power points, this power weaves a quasi-real filmy membrane around yourself and all those adjacent to each other in the caravan (being linked by hand is not required if this membrane is used). You remain visible within the translucent, amorphous enclosure. You can pick up or drop willing passengers, easily reaching through the film. Anything you hold is enveloped by the film. Any attacks made through the enclosure in either direction have a 25% miss chance due to the rippling membrane.

When you manifest this power in its augmented form, your apparent speed to those observing on the Astral Plane is 40 feet, and you can make a Knowledge (the planes) check once every 12 hours to attempt to make it to your destination (six successful checks within 12 consecutive days still sees you to your desired goal).',
  true,
  '5'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Astral Construct',
  'astral-construct',
  'Metacreativity (Creation)',
  'Shaper 1',
  '1 round',
  'Close (25 ft. + 5 ft./2 levels)',
  NULL,
  '1 round/level (D)',
  'None',
  'No',
  'This power creates one 1st-level astral construct of solidified ectoplasm that attacks your enemies. It appears where you designate and acts immediately, on your turn. It attacks your opponents to the best of its ability. As a free action, you can mentally direct it not to attack, to attack particular enemies, or to perform other actions. The astral construct acts normally on the last round of the power&rsquo;s duration and dissipates at the end of its turn.

Astral constructs are not summoned; they are created on the plane you inhabit (using ectoplasm drawn from the Astral Plane). Thus, they are not subject to effects that hedge out or otherwise affect outsiders; they are constructs, not outsiders.

Augment: For every 2 additional power points you spend, the level of the astral construct increases by one.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Astral Seed',
  'astral-seed',
  'Metacreativity',
  'Shaper 8',
  '10 minutes',
  '0 ft.',
  NULL,
  'Instantaneous',
  'None',
  'No',
  'This power weaves strands of astral ectoplasm into a crystal containing the seed of your living mind (hardness 1 and 1 hit point). You can have only one astral seed in existence at any one time. Until such time as you perish, the astral seed (also called the storage crystal) is utterly inert. If you are slain at some later date, your soul transfers into the storage crystal, which begins to dimly glow.

Upon transference, your physical remains (should they still exist) become inert matter and cannot thereafter be restored to life. The transfer from the slain body to the astral seed works over any distance, physical or extradimensional.

Once your body&rsquo;s physical demise activates the storage crystal, you have the abilities of a psicrystal of the appropriate level, plus all the powers you knew and the maximum power points you possessed when astral seed was manifested-but you also have a negative level that cannot be healed and that does not convert to real level loss in your current crystalline form. You have thirty days to grow an organic body, after which time your sentience fades and your soul passes on if it hasn&rsquo;t entered a new body.

To grow a body, you (in the storage crystal) must spend ten days in uninterrupted solitude. The body&rsquo;s constituent parts are pulled as ectoplasm from the Astral Plane, then slowly molded and transformed into a living, breathing body that is an exact duplicate of your body at the time you manifested astral seed (the crystal itself breaks down and becomes a part of the new organic body). When the tenth day ends, you completely and totally inhabit the new body. You possess all the abilities you possessed when astral seed was manifested, at one level lower, but you have none of your equipment.

If the body is struck for any amount of damage during the ten-day period when it is growing, it is destroyed and your soul passes on.

Conceivably, you could manifest mind switch to utilize a temporary body, but only an evil creature would smash his own temporarily empty storage crystal to permanently usurp a subject&rsquo;s organic body (unless the subject is itself irredeemably evil).',
  true,
  '15'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Astral Traveler',
  'astral-traveler',
  'Psychoportation',
  'Psion/wilder 1, psychic warrior 1',
  '1 hour',
  'Touch',
  'Creature touched',
  'See text',
  'Will negates (harmless)',
  'Yes (harmless)',
  'This power allows you or a creature you touch to participate in an astral caravan created through use of the astral caravan power. While participating in a journey allowed by the astral caravan power, you must hold the hand of both your fellow passenger ahead of you (or the caravan leader) and your fellow passenger behind you (unless you happen to be the last in the hand-linked line). If you or any one of your fellow passengers breaks the hand-to-hand link for 2 consecutive rounds, the impetus through the Astral Plane provided by astral caravan fails. See the astral caravan power for more information.

All those who are part of the caravan who are capable of performing purely mental actions, such as manifesting a power, may do so while maintaining hand-to-hand contact with their fellow travelers. When astral travelers begin their journey, each one is connected to the Material Plane by an insubstantial silvery cord. Very few weapons exist that can damage a silvery cord.

The last creature in the line of those making up the caravan is sometimes referred to as the rear guard, because he or she has one hand free and can use it to wield a weapon without relinquishing his or her grip on the next traveler in line. The weightless, subjective environment of the Astral Plane allows the caravan to flex and bend as necessary to bring the rear guard&rsquo;s weapon to bear.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Attraction',
  'attraction',
  'Telepathy (Charm) [Mind-Affecting]',
  'Psion/wilder 1',
  '1 standard action',
  'Close (25 ft. + 5 ft./2 levels)',
  'One creature',
  '1 hour/level',
  'Will negates',
  'Yes',
  'You plant a compelling attraction in the mind of the subject. The attraction can be toward a particular person or an object. The subject will take reasonable steps to meet, get close to, attend, or find the object of its implanted attraction. For the purpose of this power, &ldquo;reasonable&rdquo; means that, while attracted, the subject doesn&rsquo;t suffer from blind obsession. He will act on this attraction only when not engaged in combat. The subject won&rsquo;t perform obviously suicidal actions. He can still recognize danger but will not flee unless the threat is immediate. If you make the subject feel an attraction to yourself, you can&rsquo;t command him indiscriminately, although he will be willing to listen to you (even if he disagrees). This power grants you a +4 bonus on any interaction checks you make involving the subject (such as Bluff, Diplomacy, Intimidate, and Sense Motive).

Augment: For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1 and the bonus on interaction checks increases by 1.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Aura Alteration',
  'aura-alteration',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 6',
  '1 standard action',
  'Medium (100 ft. + 10 ft./ level)',
  'One willing creature',
  '10 min./level or instantaneous; see text',
  NULL,
  NULL,
  'You can use this power in one of two ways: to disguise the subject&rsquo;s aura (alignment) and level, or to remove a compulsion or charm effect from the subject.

Disguise: If you use this power to disguise the subject&rsquo;s alignment and level, the power has a duration of 10 minutes per level. You can change the subject&rsquo;s alignment by only one step. You can adjust the subject&rsquo;s apparent level up or down by a number equal to one-half your own level (rounded down) or less.

Remove Compulsion: If you use this power to attempt to cleanse the subject&rsquo;s aura of a baleful or controlling effect, the duration is instantaneous. This power can remove the compulsion of a curse or a geas/quest effect. It can also negate any charm and compulsion powers of 6th level or lower, such as crisis of breath or death urge. When aura alteration is manifested for this purpose, the subject gains another saving throw to remove the compulsion afflicting it against the original save DC, but with a +2 bonus.

Augment: You can augment this power in one or both of the following ways.

1. For every additional power point you spend, the duration of the disguise aura increases by 10 minutes.

2. If you spend 2 additional power points, the subject&rsquo;s alignment shifts an additional step; if you spend 4 additional power points, the subject&rsquo;s alignment changes to its opposite.',
  true,
  '11'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Aura Sight',
  'aura-sight',
  'Clairsentience',
  'Psion/wilder 4',
  '1 standard action',
  '60 ft.',
  NULL,
  'Concentration, up to 10 min./level',
  'None',
  'No',
  'You discern auras. Auras are invisible to the naked eye, but to a psionic viewer manifesting this power they appear as glowing halos or envelopes of colored light that surround all objects. The color of each aura reveals information to the psionic character. The amount of information revealed depends on how long you study a particular area.

1st Round: Presence of good and evil auras in the area. You can&rsquo;t pin an aura to a particular object or individual at this stage; instead, you see a colored haze suffusing the area. (This power can detect lawful and chaotic auras as well, but doing so requires a separate manifestation that focuses only on that alignment axis.)

2nd Round: Number of auras (creatures, objects, powers, or spells) in the area. You know how many auras are in the area, even though each aura doesn&rsquo;t resolve to its actual location quite yet.

3rd Round: The owner of each aura is revealed, unless the individual is outside your line of sight. If a creature whose aura you detect has 5 or more Hit Dice than you do, you are overwhelmed by its presence and dazed for 1 round, and the power ends.

Augment: For every 2 additional power points you spend, this power&rsquo;s range increases by 5 feet.',
  true,
  '7'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Aversion',
  'aversion',
  'Telepathy (Compulsion) [Mind-Affecting]',
  'Telepath 2',
  '1 standard action',
  'Close (25 ft. + 5 ft./2 levels)',
  'One creature',
  '1 hour/level',
  'Will negates',
  'Yes',
  'You plant a powerful aversion in the mind of the subject. If the object of the implanted aversion is an individual or a physical object, she will prefer not to approach within 30 feet of it. If it is a word, she will try not to utter it; if it is an action, she will not willingly attempt to perform it; and if it is an event, she will not willingly attend it. The subject will take reasonable steps to avoid the object of its aversion, but will not put herself in jeopardy by doing so.

If the subject is forced into taking an action she has an aversion to, she takes a -2 penalty on any attack rolls, ability checks, or skill checks involved.

Augment: For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1 and the duration increases by 1 hour.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Baleful Teleport',
  'baleful-teleport',
  'Psychoportation (Teleportation)',
  'Nomad 5',
  '1 standard action',
  'Close (25 ft. + 5 ft./2 levels)',
  'One corporeal creature',
  'Instantaneous',
  'Fortitude half',
  'Yes',
  'You psychoportively disperse minuscule portions of the subject, dealing 9d6 points of damage. Targets can be protected from the effects of baleful teleport by dimensional anchor.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by 1d6 points. For each extra 2d6 points of damage, this power&rsquo;s save DC increases by 1 and your manifester level increases by 1 for the purpose of overcoming power resistance.',
  true,
  '9'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Banishment, Psionic',
  'banishment-psionic',
  'Psychoportation',
  'Nomad 6',
  '1 standard action',
  'Close (25 ft. + 5 ft./2 levels)',
  NULL,
  'Instantaneous',
  'Will negates',
  'Yes',
  'As the banishment spell, except as noted here.

Psions gain no benefit from presenting objects or substances that the target hates, fears, or otherwise opposes.

Augment: For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1 and your manifester level increases by 1 for the purpose of overcoming power resistance.',
  true,
  '11'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Bend Reality',
  'bend-reality',
  'Clairsentience',
  'Psion/wilder 8',
  '1 standard action',
  'See text',
  NULL,
  'See text',
  'None; see text',
  'Yes',
  'Bend reality lets you create nearly any type of effect. For example, bend reality can do any of the following:

Duplicate any psion power of 6th level or lower, provided the power is not of a discipline prohibited to you.

Duplicate any other power (but not a spell) of 5th level or lower, provided the power is not of a discipline prohibited to you.

Duplicate any psion power of 5th level or lower, even if it&rsquo;s of a prohibited discipline.

Duplicate any other power (but not a spell) of 4th level or lower, even if it&rsquo;s of a prohibited discipline.

Undo the harmful effects of many powers, such as psionic dominate, geas/quest, or insanity.

Produce any other effect whose power level is in line with the above effects, such as a single creature automatically hitting on its next attack or taking a -8 penalty on its next saving throw.

A duplicated power allows saving throws and power resistance as normal (but the save DC is for a 8th-level power).

When bend reality duplicates a power that has an XP cost, you must pay that cost or 300 XP, whichever is more. When bend reality duplicates a spell with a material component, you must pay additional XP equal to the value of the material component divided by 5.

XP Cost: 300 XP or more (see above).',
  true,
  '15, XP'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Bestow Power',
  'bestow-power',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 2',
  '1 standard action',
  '20 ft.',
  'One psionic creature',
  'Instantaneous',
  'None',
  'No',
  'You link your mind with another psionic creature&rsquo;s mind, creating a brief conduit through which mental energy can be shared. When you manifest this power, the subject gains up to 2 power points. You can transfer only as many power points to a subject as it has manifester levels.

Because of the intimate nature of this power, it cannot be fabricated into a psionic item - only power points generated by a psionic creature in the moment can be shared using bestow power.

Augment: For every 3 additional power points you spend, the subject gains 2 additional power points.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Biofeedback',
  'biofeedback',
  'Psychometabolism',
  'Psion/wilder 2, psychic warrior 1',
  '1 standard action',
  'Personal',
  'You',
  '1 min./level (D)',
  NULL,
  NULL,
  'You can toughen your body against wounds, lessening their impact. During the duration of this power, you gain damage reduction 2/-.

Augment: For every 3 additional power points you spend, your damage reduction increases by 1.',
  true,
  'Psion/wilder 3, psychic warrior 1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Bite of the Wolf',
  'bite-of-the-wolf',
  'Psychometabolism',
  'Psychic warrior 1',
  '1 standard action',
  'Personal',
  'You',
  '1 min./level',
  NULL,
  NULL,
  'Your posture becomes stooped forward, and you grow a muzzle complete with fangs. You gain one bite attack each round, instead of or in addition to any other attacks you have, that deals 1d8 points of damage (assuming you are a Medium creature) when it hits.

Your bite attack is a natural weapon, so you are considered armed when attacking with it, and it can be affected by powers, spells, and effects that enhance or improve natural weapons. You can choose to deal nonlethal damage with your bite, taking the standard -4 penalty on your attack roll. If you bite as your only attack, you use your highest base attack bonus on the attack roll, and you can apply your full Strength bonus to damage. If you bite in addition to making other attacks, the bite is a secondary attack.

If you are not a Medium creature, your bite attack&rsquo;s base damage varies as follows: Fine 1d2, Diminutive 1d3, Tiny 1d4, Small 1d6, Large 2d6, Huge 2d8, Gargantuan 4d6, Colossal 6d6.

Based on your psychic warrior level, your bite increases in ferocity as noted here: at 5th level your bite deals an extra 1d8 points of damage, at 10th level an extra 2d8, at 15th level an extra 3d8, and at 20th level an extra 4d8 points.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Body Adjustment',
  'body-adjustment',
  'Psychometabolism (Healing)',
  'Psion/wilder 3, psychic warrior 2',
  '1 round',
  'Personal',
  'You',
  'Instantaneous',
  NULL,
  NULL,
  'You take control of your body&rsquo;s healing process, curing yourself of 1d12 points of damage. As usual, when regular damage is healed, an equal amount of nonlethal damage is also healed.

Augment: For every 2 additional power points you spend, this power heals an additional 1d12 points of damage.',
  true,
  'Psion/wilder 5, psychic warrior 3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Body Equilibrium',
  'body-equilibrium',
  'Psychometabolism',
  'Psion/wilder 2, psychic warrior 2',
  '1 standard action',
  'Personal',
  'You',
  '10 min./level (D)',
  NULL,
  NULL,
  'You can adjust your body&rsquo;s equilibrium to correspond with any solid or liquid that you stand on. Thus, you can walk on water, quicksand, or even a spider&rsquo;s web without sinking or breaking through (this effect does not confer any resistance to particularly sticky webs). You can move at your normal speed, but you cannot run (x4 speed) on an unfirm surface without sinking or breaking through.

If you fall from any height while using this power, damage from the impact is halved.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Body Purification',
  'body-purification',
  'Psychometabolism (Healing)',
  'Psion/wilder 3, psychic warrior 2',
  '1 round',
  'Personal',
  'You',
  'Instantaneous',
  NULL,
  NULL,
  'You restore up to 2 points of damage to a single ability score. You cannot use body purification to heal ability drain.

Augment: For every additional power point you spend, this power heals 1 additional point of damage to the same ability score.',
  true,
  'Psion/wilder 5, psychic warrior 3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Bolt',
  'bolt',
  'Metacreativity (Creation)',
  'Psion/wilder 1',
  '1 standard action',
  '0 ft.',
  NULL,
  '1 min./level',
  'None',
  'No',
  'You create 2d4 ectoplasmic crossbow bolts, arrows, or sling bullets, appropriate to your size, which dissipate into their constituent ectoplasmic particles when the duration ends or after being fired. Ammunition you create has a +1 enhancement bonus on attack rolls and damage rolls.

Augment: For every 3 additional power points you spend, this power improves the ammunition&rsquo;s enhancement bonus on attack rolls and damage rolls by 1.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Brain Lock',
  'brain-lock',
  'Telepathy (Compulsion) [Mind-Affecting]',
  'Telepath 2',
  '1 standard action',
  'Medium (100 ft. + 10 ft./ level)',
  'One humanoid',
  'Concentration + 1 round',
  'Will negates',
  'Yes',
  'The subject&rsquo;s higher mind is locked away. He is dazed and cannot take psionic actions (including manifesting powers or using psionic feats that require a decision to be used) for the duration of the power.

A brain locked subject is not stunned, so attackers get no special advantage against him.

Augment: You can augment this power in one or both of the following ways.

1. If you spend 2 additional power points, this power can also affect an animal, fey, giant, magical beast, or monstrous humanoid.

2. If you spend 4 additional power points, this power can also affect an aberration, dragon, elemental, or outsider in addition to the creature types mentioned above.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Breath of the Black Dragon',
  'breath-of-the-black-dragon',
  'Psychometabolism [Acid]',
  'Psion/wilder 6, psychic warrior 6',
  '1 standard action',
  'Close (25 ft. + 5 ft./2 levels)',
  NULL,
  'Instantaneous',
  'Reflex half',
  'Yes',
  'Your mouth spews forth vitriolic acid that deals 11d6 points of acid damage to any targets in the area.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by 1d6 points.',
  true,
  '11'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Burst',
  'burst',
  'Psychoportation',
  'Nomad 1, psychic warrior 1',
  '1 swift action',
  'Personal',
  'You',
  '1 round',
  NULL,
  NULL,
  'This power increases your land speed by 10 feet. (This adjustment counts as an enhancement bonus to speed.)

You can manifest this power with an instant thought, quickly enough to gain the benefit of the power on your turn before you move. Manifesting this power is a swift action, like manifesting a quickened power, and it counts toward the normal limit of one quickened power per round. You cannot manifest this power when it isn&rsquo;t your turn.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Call to Mind',
  'call-to-mind',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 1',
  '1 minute',
  'Personal',
  'You',
  'Instantaneous',
  NULL,
  NULL,
  'By meditating on a subject, you can recall natural memories and knowledge otherwise inaccessible to you.

On a failed Knowledge check, you can manifest this power to gain a new check with a +4 competence bonus. If successful, you instantly recall what was previously buried in your subconscious.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Call Weaponry',
  'call-weaponry',
  'Psychoportation (Teleportation)',
  'Psychic warrior 1',
  '1 round',
  '0 ft.',
  NULL,
  '1 min./level; see text (D)',
  'None',
  'No',
  'You call a weapon &ldquo;from thin air&rdquo; into your waiting hand (actually, it is a real weapon hailing from another location in space and time). You don&rsquo;t have to see or know of a weapon to call it-in fact, you can&rsquo;t call a specific weapon; you just specify the kind. If you call a projectile weapon, it comes with 3d6 nonmagical bolts, arrows, or sling bullets, as appropriate. The weapon is made of ordinary materials as appropriate for its kind. If you relinquish your grip on the weapon you called for 2 or more consecutive rounds, it automatically returns to wherever it originated.

Weapons gained by call weaponry are distinctive due to their astral glimmer. They are considered magic weapons and thus are effective against damage reduction that requires a magic weapon to overcome.

Augment: For every 4 additional power points you spend, this power improves the weapon&rsquo;s enhancement bonus on attack rolls and damage rolls by 1.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Catapsi',
  'catapsi',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 5, psychic warrior 5',
  '1 standard action',
  '30 ft.',
  NULL,
  '1 round/level',
  'Will negates; see text',
  'Yes',
  'By manifesting this power, you generate psychic static, interfering with the ability of other psionic characters to manifest their powers or use psi-like abilities (you are not affected by your own catapsi manifestation). All psionic activity within the area requires 4 more power points to manifest than normal, unless a character makes a Will save each time he attempts to manifest a power. Using a psi-like ability becomes a full-round action, instead of a standard action, in a catapsi field. If two or more fields of catapsi overlap, the effects are not cumulative.

The limit on the number of power points a subject can spend on a power remains in effect; thus, a subject may not be able to manifest its highest-level powers. If manifesting a power would cause the manifester to exceed his available power points or his spending limits, the manifestation fails automatically, but no power points are expended.

Augment: For every 4 additional power points you spend, this power&rsquo;s range and the radius of its area both increase by 5 feet.',
  true,
  '9'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Catfall',
  'catfall',
  'Psychoportation',
  'Psion/wilder 1, psychic warrior 1',
  '1 immediate action',
  'Personal',
  'You',
  'Until landing or 1 round/ level',
  NULL,
  NULL,
  'You recover instantly from a fall and can absorb some damage from falling. You land on your feet no matter how far you fall, and you take damage as if the fall were 10 feet shorter than it actually is. This power affects you and anything you carry or hold (up to your maximum load). You can manifest this power with an instant thought, quickly enough to gain the benefit of the power while you fall. Manifesting the power is an immediate action. You can manifest this power even when it isn&rsquo;t your turn.

Augment: For every additional power point you spend, this power reduces your damage as if the fall were an additional 10 feet shorter.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Chameleon',
  'chameleon',
  'Psychometabolism',
  'Egoist 2, psychic warrior 1',
  '1 standard action',
  'Personal',
  'You',
  '10 min./level (D)',
  NULL,
  NULL,
  'Your skin and equipment take on the color and texture of nearby objects, including floors and walls. You receive a +10 enhancement bonus on Hide checks.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Charm, Psionic',
  'charm-psionic',
  'Telepathy (Charm) [Mind-Affecting]',
  'Telepath 1',
  '1 standard action',
  'Close (25 ft. + 5 ft./2 levels)',
  'One humanoid',
  '1 hour/level',
  'Will negates',
  'Yes',
  'As the charm person spell, except as noted here.

Augment: You can augment this power in one or more of the following ways.

1. If you spend 2 additional power points, this power can also affect an animal, fey, giant, magical beast, or monstrous humanoid.

2. If you spend 4 additional power points, this power can also affect an aberration, dragon, elemental, or outsider in addition to the creature types mentioned above.

3. If you spend 4 additional power points, this power&rsquo;s duration increases to one day per level.

In addition, for every 2 additional power points you spend to achieve any of these effects, this power&rsquo;s save DC increases by 1.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Clairtangent Hand',
  'clairtangent-hand',
  'Clairsentience (Scrying)',
  'Seer 5',
  '1 standard action',
  'See text',
  NULL,
  'Up to 1 min./level; see text (D)',
  'None',
  'No',
  'You can emulate a far hand effect at any distance while simultaneously emulating clairvoyant sense to target your far hand; see the appropriate power descriptions. Clairtangent hand&rsquo;s duration is up to 1 minute per level when used with a far hand effect.

Augment: If you spend 8 additional power points, you can emulate clairvoyant sense in conjunction with either telekinetic force, telekinetic maneuver, or telekinetic thrust, but this power&rsquo;s duration expires as soon as any of the noted telekinetic powers deals damage.',
  true,
  '9'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Clairvoyant Sense',
  'clairvoyant-sense',
  'Clairsentience (Scrying)',
  'Seer 2',
  '1 standard action',
  'See text',
  NULL,
  '1 min./level (D)',
  'None',
  'No',
  'You can see and hear a distant location almost as if you were there. You don&rsquo;t need line of sight or line of effect, but the locale must be known-a place familiar to you or an obvious one, such as behind a door, around a corner, or in a grove of trees. Once you have selected the locale, the focus of your clairvoyant sense doesn&rsquo;t move, but you can rotate it in all directions to view the area as desired. Unlike other scrying powers, this power does not allow psionically or supernaturally enhanced senses to work through it.

If the chosen locale is magically or psionically dark, you see nothing. If it is naturally pitch black, you can see in a 10- foot radius around the center of the power&rsquo;s effect or out to the extent of your natural darkvision. The power does not work across planes.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Claw of Energy',
  'claw-of-energy',
  'Psychokinesis [see text]',
  'Psychic warrior 4',
  '1 standard action',
  'Personal',
  'You',
  '1 round/level',
  NULL,
  NULL,
  'If you have a claw attack (either from an actual natural weapon or from an effect such as claws of the beast), you can use this power to energize that weapon. The claw attack deals an extra 1d6 points of cold, electricity, or fire damage (as chosen by you at the time of manifestation) on a successful hit. On a critical hit, it deals an extra 1d10 points of energy damage. If the claw&rsquo;s critical multiplier is x3, add 2d10 points of energy damage instead; if the multiplier is x4, add 3d10 points of energy damage.

This power can be manifested on a claw attack that already deals energy damage, but if the claw already deals the same type of damage as the power, the effects stack. If this power is manifested on a claw attack already benefiting from the effect of the power, the newer manifestation supersedes the older manifestation, even if both manifestations are of different energy types.

This power&rsquo;s subtype is the same as the type of energy infused in the natural weapon.',
  true,
  '7'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Claws of the Beast',
  'claws-of-the-beast',
  'Psychometabolism',
  'Psychic warrior 1',
  '1 swift action',
  'Personal',
  'You',
  '1 hour/level',
  NULL,
  NULL,
  'You call forth the aggressive nature of the beast inherent in yourself, psionically transforming your hands into deadly claws. You gain two natural attacks with your claws, each dealing 1d4 points of damage (1d6 if you are Large, or 1d3 if you are Small) plus your Strength bonus.

Your claws are natural weapons, so you are considered armed when attacking with them, and they can be affected by powers, spells, and effects that enhance or improve natural. You can choose to deal nonlethal damage with your claws, taking the standard -4 penalty on your attack roll.

Your claws work just like the natural weapons of many monsters. You can make an attack with one claw or a full attack with two claws at your normal attack bonus, replacing your normal attack routine. You take no penalties for two-weapon fighting, and neither attack is a secondary attack. If your base attack bonus is +6 or higher, you do not gain any additional attacks-you simply have two claw attacks at your normal attack bonus.

You can manifest this power with an instant thought, quickly enough to gain the benefit of the power on your turn before you attack. Manifesting this power is a swift action, like manifesting a quickened power, and it counts toward the normal limit of one quickened power per round. You cannot manifest this power when it isn&rsquo;t your turn.

You can call or dismiss the claws as a swift action during the duration of the power. If you attack with a manufactured weapon or another natural attack, you can&rsquo;t make any claw attacks in that round. You can still hold and manipulate items with your claws or cast spells just as well as you could with your hands.

Augment: If you spend additional power points, you can create larger, sharper, and more deadly claws, as shown on the table below.',
  true,
  'see text'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Claws of the Vampire',
  'claws-of-the-vampire',
  'Psychometabolism',
  'Psychic warrior 3',
  '1 standard action',
  'Personal',
  'You',
  '1 round/level',
  NULL,
  NULL,
  'If you have a claw attack (either from an actual natural weapon or from an effect such as claws of the beast), you can use this power to change the nature of that weapon. When this power is manifested, your claws take on an ominous glimmer. Each time you make a successful claw attack against a living creature of Small or larger size, you are healed of some amount of damage.

You heal a number of hit points equal to half the base damage dealt by your claws of the vampire, rounded down (additional damage dealt because of a high Strength score or other enhancements does not count toward the amount you heal). You heal as many hit points as can be gained while the creature remains at 1 hit point or higher. Any damage that would reduce the creature to 0 or fewer hit points does not benefit you.

You do not heal damage if your attack deals nonlethal damage, such as when you attack a creature that has the regeneration ability. Moreover, you gain no healing from attacking any creature that is under the effect of biofeedback. Using fission on yourself and then attacking your duplicate also fails to grant any healing.',
  true,
  '5'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Cloud Mind',
  'cloud-mind',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 2',
  '1 standard action',
  'Close (25 ft. +5 ft./2 levels)',
  'One creature',
  '1 min./level',
  'Will negates',
  'Yes',
  'You make yourself completely undetectable to the subject by erasing all awareness of your presence from its mind. This power has the following effects.

First, you are invisible and inaudible to the creature. It cannot even detect your presence by means of blindsense, blindsight, scent, or tremorsense. It cannot pinpoint your location by any means.

Second, the subject remains unaware of your actions, provided you do not make any attacks or cause any obvious or directly threatening changes in the subject&rsquo;s environment. If you attack the subject creature, the effect ends.

If you take an action that creates a sustained and obvious change in the subject&rsquo;s environment - for example, attacking a creature aside from the subject or moving a large or attended object the subject can see - the subject immediately gains a new saving throw against the power. An ally of the subject creature that is able to see or perceive you can use a move action to warn the subject and thereby grant it a new saving throw.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Cloud Mind, Mass',
  'cloud-mind-mass',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 6',
  NULL,
  NULL,
  'One creature/level',
  NULL,
  NULL,
  NULL,
  'As cloud mind, except as noted above. Each creature is affected individually.',
  true,
  '11'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Compression',
  'compression',
  'Psychometabolism',
  'Psychic warrior 1',
  '1 standard action',
  'Personal',
  'You',
  '1 round/level (D)',
  NULL,
  NULL,
  'This power causes instant diminution, halving your height, length, and width and dividing your weight by 8. This decrease changes your size category to the next smaller one. You gain a +2 size bonus to Dexterity, a -2 size penalty to Strength (to a minimum effective Strength score of 1), a +1 size bonus on attack rolls, and a +1 size bonus to Armor Class due to your reduced size. If your new size is Tiny, you have a space of 2 1/2 feet and a natural reach of 0 feet (meaning that you must enter an opponent&rsquo;s square to attack). If your new size is Diminutive, you have a space of 1 foot and a natural reach of 0 feet. This power doesn&rsquo;t change your speed.

All your equipment, worn or carried, is similarly reduced by the power. Melee and projectile weapons deal less damage. Other psionic or magical properties are not affected by this power. Any affected item that leaves your possession (including a projectile or thrown weapon) instantly returns to its normal size. This means that thrown weapons deal their normal damage (projectiles deal damage based on the size of the weapon that fired them). Multiple effects that reduce size do not stack, which means (among other things) that you can&rsquo;t use a second manifestation of this power to further reduce yourself.

Augment: You can augment this power in one or more of the following ways.

1. If you spend 6 additional power points, this power decreases your size by two size categories. You gain a +4 size bonus to Dexterity, a -4 size penalty to Strength (to a minimum effective Strength score of 1), a +2 size bonus on attack rolls, and a +2 size bonus to Armor Class due to your reduced size.

2. If you spend 6 additional power points, you can manifest this power as a swift action instead of a standard action.

3. If you spend 2 additional power points, this power&rsquo;s duration is 1 minute per level rather than 1 round per level.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Conceal Thoughts',
  'conceal-thoughts',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 1, psychic warrior 1',
  '1 standard action',
  'Close (25 ft. + 5 ft./2 levels)',
  'One willing creature',
  '1 hour/level',
  'Will negates (harmless)',
  'Yes (harmless)',
  'You protect the subject&rsquo;s thoughts from analysis. While the duration lasts, the subject gains a +10 circumstance bonus on Bluff checks against those attempting to discern its true intentions with Sense Motive. It also gains a +4 bonus on its saving throw against any power or spell used to read its mind (such as read thoughts or mind probe).',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Concealing Amorpha',
  'concealing-amorpha',
  'Metacreativity (Creation)',
  'Psion/wilder 2, psychic warrior 2',
  '1 standard action',
  '0 ft.',
  NULL,
  '1 min./level (D)',
  NULL,
  NULL,
  'Using concealing amorpha, you weave a quasi-real membrane around yourself. You remain visible within the translucent, amorphous enclosure. This distortion grants you concealment (opponents have a 20% miss chance), thanks to the rippling membrane encasing your form. You can pick up or drop objects, easily reaching through the film. Anything you hold is enveloped by the amorpha. Likewise, you can engage in melee, make ranged attacks, and manifest powers without hindrance.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Concealing Amorpha, Greater',
  'concealing-amorpha-greater',
  'Metacreativity (Creation)',
  'Shaper 3, psychic warrior 3',
  NULL,
  NULL,
  NULL,
  '1 round/level (D)',
  NULL,
  NULL,
  'As concealing amorpha, except the quasi-real membrane so distorts your image and actual position that you gain total concealment (opponents have a 50% miss chance), but for a shorter period of time.',
  true,
  '5'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Concussion Blast',
  'concussion-blast',
  'Psychokinesis [Force]',
  'Psion/wilder 2',
  '1 standard action',
  'Medium (100 ft. + 10 ft./ level)',
  'One creature or object',
  'Instantaneous',
  'None',
  'Yes',
  'A subject you select is pummeled with telekinetic force for 1d6 points of force damage. You can choose to have the power deal an equal amount of nonlethal damage instead. Concussion blast always affects a subject within range that you can see, even if the subject is in melee or has cover or concealment (you cannot use this power against creatures with total cover or total concealment).

Nonmagical, unattended objects (including doors, walls, locks, and so on) may also be damaged by this power.

Augment: You can augment this power in one or both of the following ways.

1. For every 2 additional power points you spend, this power&rsquo;s damage increases by 1d6 points.

2. For every 2 additional power points you spend, this power can affect an additional target. Any additional target cannot be more than 15 feet from another target of the power.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Contingency, Psionic',
  'contingency-psionic',
  'Clairsentience',
  'Psion/wilder 6',
  '10 minutes or longer; see text',
  'Personal',
  'You',
  'One day/level (D) or until discharged',
  NULL,
  NULL,
  'You can place another power upon your person so that it comes into effect under some condition you dictate when manifesting psionic contingency. The psionic contingency power and the companion power are manifest at the same time. The 10-minute manifesting time is the minimum total for both manifestations; if the companion power has a manifesting time longer than 10 minutes, use that instead. The power to be brought into effect by the psionic contingency must be one that affects your person and be of a power level no higher than one-third your manifester level (rounded down, maximum 6th level).

The conditions needed to bring the power into effect must be clear, although they can be general. In all cases, the psionic contingency immediately brings into effect the companion power, the latter being &ldquo;manifested&rdquo; instantaneously only when the prescribed circumstances occur. If complicated or convoluted conditions are prescribed, the power combination (psionic contingency and the companion power) may fail when called on.

You can use only one psionic contingency companion power at a time; if a second is manifested, the first one (if still active) is dismissed.

XP Cost: 15 XP.',
  true,
  '11, XP'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Control Air',
  'control-air',
  'Psychokinesis',
  'Kineticist 2',
  '1 standard action',
  'Long (400 ft. + 40 ft./level)',
  NULL,
  'Concentration, up to 1 min./level',
  'None',
  'No',
  'You have some control over wind speed and direction. The speed of the wind within the area of this power can be increased or decreased by up to 10 miles per hour.

You can spend as many as 5 additional power points to augment this power, with each point allowing you to modify the wind speed by an additional 10 miles per hour, to a maximum change in wind speed of 60 miles per hour.

This power also gives you the ability to alter the direction of the wind by as much as 90 degrees.

Powerful enough winds can cause creatures to be blown away, knocked down, or checked.

Augment: See above.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Control Body',
  'control-body',
  'Psychokinesis',
  'Kineticist 4',
  '1 standard action',
  'Medium (100 ft. + 10 ft./level)',
  'One Medium or smaller creature with humanoid physiology',
  'Concentration, up to 1 min./level',
  'Fortitude negates',
  'Yes',
  'You psychokinetically control the actions of any humanoid (including undead or outsiders with a humanoid physiology) that is within range and to which you have line of sight. Control body doesn&rsquo;t require mental contact with the subject, since you are actually forcing limb movements independent of the target&rsquo;s mind. You can force the subject to stand up, sit down, walk, turn around, and so on, but operating the vocal cords is too difficult. You can also hold the subject immobile, rendering it helpless. You cannot force the subject to manifest powers, cast spells, or use any special ability that is not a function of just its body movements. If you lose line of sight to the subject, the effect of this power ends.

If you force the subject to engage in combat, its attack bonus is equal to your base attack bonus + your Intelligence bonus, and its bonus on damage rolls is equal to your Intelligence bonus. A subject of this power cannot make attacks of opportunity. The subject gains no benefit to Armor Class from its Dexterity, but it does gain a bonus to its AC equal to your Intelligence bonus.

Although the subject&rsquo;s body is under your control, the subject&rsquo;s mind is not. Creatures capable of taking purely mental actions (such as manifesting powers) can do so.

Augment: For every 2 additional power points you spend, this power can affect a target one size category larger.',
  true,
  '7'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Control Flames',
  'control-flames',
  'Psychokinesis [Fire]',
  'Psion/wilder 1',
  '1 standard action',
  'Medium (100 ft. + 10 ft./level)',
  NULL,
  'Concentration, up to 1 min./level',
  'See text',
  'No',
  'You pyrokinetically control the intensity or movements of one fire source. A nonmagical fire source can be controlled if it is equal to or smaller than the maximum size of fire you can control according to your manifester level, as noted on the accompanying table. You can freely switch control between fire sources, or change the nature of your control, while you maintain concentration, but only one specified change (keeping a fire burning, animating it, or altering its size) can be made to one fire source in a round. When your control over a fire source lapses, that fire immediately returns to its original state (or goes out if it has no fuel or has been moved away from its original location). With this power, you can artificially keep a fire burning that would normally expire for lack of fuel; even dousing a controlled flame with water does not put it out (though completely submerging the flame would). Normally, a creature at risk of catching on fire can avoid this fate by making
a DC 15 Reflex saving throw, with success indicating that the fire has gone out. If the fire is one that has been kept burning by the use of control flames, then the DC of the Reflex save needed to put out the flames increases to 25.

This power also enables you to make a fire move as if it were a living creature. You can animate only a naturally burning fire; if you attempt to animate one that has been increased or decreased in size by your augmentation of this power, the fire immediately returns to its original size. An animated fire moves at a speed of 30 feet. A fire that moves away from its fuel or its original location dies as soon as your control over it lapses.

An animated fire can enter any square, even if a creature already occupies it. If an animated fire enters a square occupied by a creature, that creature can make a Reflex save to get out of the way (DC 11 + the number of dice of damage the fire does + your Int modifier if you are a psion or your Cha modifier if you are a wilder). A successful Reflex save moves the creature to the nearest unoccupied square. The flames deal the indicated damage to any creature that is either on fire or surrounded by the flames (in the fire&rsquo;s space); see the accompanying table).

At the start of your turn, the animated fire deals damage to any creature in its space, and the creature catches on fire unless it makes a Reflex save (DC as noted above). A victim on fire takes 1d6 points of damage each round. Additional rounds in the same space as the animated fire occupies mean additional chances of ignition. The damage from multiple normal fires stacks, but the victim gets a saving throw each round to negate each fire. It is possible to switch control from the animated fire (causing it to disappear) to intensify flames that are already burning (thus denying the foe Reflex saves after the first).

Augment: You can augment this power in one or both of the following ways.

1. For every 2 additional power points you spend, you can increase the size of a fire you want to control by one step, up to the maximum size of fire you can control according to your manifester level.

2. For every 2 additional power points you spend, you can decrease the size of a fire you want to control by one step. You can reduce a Tiny or smaller fire to nothing, extinguishing it.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Control Light',
  'control-light',
  'Psychokinesis [Light]',
  'Psion/wilder 1',
  '1 standard action',
  'Medium (100 ft. + 10 ft./level)',
  NULL,
  'Concentration, up to 1 min./level, or 1 round; see text',
  'None',
  'No',
  'By manipulating the ambient light level, you can decrease or increase the illumination of an area. The change in illumination can be gradual (taking as long as 1 minute) or sudden (occurring immediately when you manifest this power). You can alter the level of illumination from its original level at any time during the power&rsquo;s duration.

Decrease: You can decrease the illumination of an area by as little as 5% (barely perceptible) or as much as 100% (total darkness). If you decrease the light by 50% or more, the visual ability of creatures that depend on light to see declines accordingly.If you decrease the ambient light in an area by 100%, even those with lowlight vision are unable to see within the affected area. For each 25% decrease in ambient light, characters in the area gain a cumulative +1 circumstance bonus on Hide checks (to a maximum of +4 when all the light is gone).

Increase: You can increase the illumination of an area by as little as 5% (barely perceptible) or as much as 100%. If you increase the light by 50% or more, the visual ability of creatures that depend on light to see improves accordingly.

You can use this power to increase the illumination of an area by 200%� (improving visual abilities accordingly), but in such a case the power&rsquo;s duration is only 1 round.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Control Object',
  'control-object',
  'Psychokinesis',
  'Kineticist 1',
  '1 standard action',
  'Medium (100 ft. + 10 ft./ level)',
  'One unattended object weighing up to 100 lb.',
  'Concentration, up to 1 round/level',
  'None',
  'No',
  'You telekinetically &ldquo;bring to life&rdquo; an inanimate object. Though it is not actually alive, the object moves under your control. Live vegetation cannot be controlled in this fashion, nor can already animated objects or undead. The controlled object moves like a puppet, with jerky and clumsy movements, at a speed of up to 20 feet. If its form is rigid, it makes creaking, groaning, or grating sounds as you control it.

A controlled object can attack an opponent if you direct it to do so. It has one slam attack, at a base attack bonus equal to your base attack bonus plus your Intelligence modifier. If the attack hits, it deals points of damage equal to 1d6 plus your Intelligence modifier. A controlled object has its usual hardness and hit points.

You can use this power on a nonmagical lock, making it move in such a way as to attempt to unlock itself. If another character makes an Open Lock check involving a lock that you are concentrating on controlling, the character gains a +4 bonus on the check.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Control Sound',
  'control-sound',
  'Psychokinesis [Sonic]',
  'Psion/wilder 2',
  '1 standard action',
  'Medium (100 ft. + 10 ft./ level)',
  'One sound or mixture of related sounds',
  'Concentration, up to 1 min./level; see text',
  'None',
  'No',
  'You shape and alter existing sounds. You can target one sound, such as a person speaking or singing, or a group of related sounds, such as the patter of many raindrops or the tramp of soldiers passing by. A sound as quiet as a snapping finger can be controlled. You can substitute any sound you have heard for the target sound. If you attempt to exactly duplicate the voice of a specific individual, or an inherently terrifying sound (such as a dragon&rsquo;s roar), you must succeed on a Bluff check with a +5 circumstance bonus opposed by the intended listener&rsquo;s Sense Motive check to avoid arousing suspicion.

You can entirely muffle a noise or magnify a sound to such loudness that it drowns out all other conversation in the immediate area. In this way, you can provide yourself or any with a +4 circumstance bonus on Move Silently and Listen checks.

Alternatively, you can use up the power in an instant. You do this by modulating a sound into a one-time destructive impetus that shatters nonmagical/nonpsionic, unattended objects of crystal, glass, ceramics, or porcelain (vials, bottles, flasks, jugs, mirrors, and so forth) in the area.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Co-Opt Concentration',
  'co-opt-concentration',
  'Telepathy (Compulsion) [Mind-Affecting]',
  'Psion/wilder 6',
  '1 standard action',
  'Medium (100 ft. + 10 ft./ level)',
  'One creature',
  'Concentration, up to 1 round/level',
  'Will negates',
  'Yes',
  'You take over control of a power that was manifested by the subject and that must be maintained through concentration. Once you wrest control of the power from the subject, you have several options.

Allow the power to function as normal.

Keep the power targeted on the subject (if a personal power) but decide how the power fulfills its function each round.

Retarget the power on yourself (if a personal power).

Choose not to concentrate on the co-opted power in the next round, ending the power at that point.

When the duration of co-opt concentration expires, the power you took control of ends (even if this would mean that the power ends earlier than normal).',
  true,
  '11'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Correspond',
  'correspond',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 4',
  '10 minutes',
  'See text',
  'One creature with an Intelligence score of 3 or higher',
  '1 round/level',
  'None',
  'No',
  'You forge a passive mental link with a creature with which you have previously had physical or mental contact. The subject need not be within sight or even on the same plane as you are. The subject recognizes you, and you can mentally communicate with it for the duration (though nothing forces the subject to respond to you), exchanging messages of twenty-five words or less once per round. Receiving a message is not an action and does not provoke attacks of opportunity; however, sending a message is equivalent to a standard action that can provoke attacks of opportunity.',
  true,
  '7'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Create Sound',
  'create-sound',
  'Metacreativity (Creation) [Sonic]',
  'Psion/wilder 1',
  '1 standard action',
  'Close (25 ft. + 5 ft./2 levels)',
  NULL,
  '1 round/level (D)',
  'None',
  'No',
  'You create a volume of sound that rises, recedes, approaches, or remains at a fixed place. You choose what type of sound the power creates when manifesting it and cannot thereafter change its basic character. The volume of sound created, however, depends on your level. You can produce as much noise as four normal humans per manifester level (maximum twenty humans). Thus, talking, singing, shouting, walking, marching, or running sounds can be created. The noise produced can be virtually any type of sound within the volume limit. A horde of rats running and squeaking is about the same volume as eight humans running and shouting. A roaring lion is equal to the noise from sixteen humans, while a roaring dire lion is equal to the noise from twenty humans.

If you wish to create a specific message, up to twenty-five words can be created, and those words repeat over and over until the duration expires or the power is dismissed. If you attempt to exactly duplicate the voice of a specific individual or an inherently terrifying sound (such as a dragon&rsquo;s roar), you must succeed on a Bluff check with a +2 circumstance bonus opposed by the listener&rsquo;s Sense Motive check to avoid arousing suspicion.

Create sound can be used to bring sounds into existence that you later manipulate by manifesting control sound.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Crisis of Breath',
  'crisis-of-breath',
  'Telepathy (Compulsion) [Mind-Affecting]',
  'Telepath 3',
  '1 standard action',
  'Medium (100 ft. + 10 ft./ level)',
  'One breathing humanoid',
  '1 round/level',
  'Will negates, Fortitude partial; see text',
  'Yes',
  'You compel the subject to purge its entire store of air in one explosive exhalation, and thereby disrupt the subject&rsquo;s autonomic breathing cycle. The subject&rsquo;s lungs do not automatically function again while the power&rsquo;s duration lasts.

If the target succeeds on a Will save when crisis of breath is manifested, it is unaffected by this power. If it fails its Will save, it can still continue to breathe by taking a standard action in each round to gasp for breath.

An affected creature can attempt to take actions normally (instead of consciously controlling its breathing), but each round it does so, beginning in the round when it failed its Will save, the subject risks blacking out from lack of oxygen. It must succeed on a Fortitude save at the end of any of its turns in which it did not consciously take a breath. The DC of this save increases by 1 in every consecutive round after the first one that goes by without a breath; the DC drops back to its original value if the subject spends an action to take a breath.

If a subject fails a Fortitude save, it is disabled (0 hp). In the following round, it drops to -1 hit points and is dying. Curing powers or spells can revive a dying subject normally, so long as this power&rsquo;s duration has expired; if the power is still in effect, a revived creature is still subject to Fortitude saves in each round when it does not consciously breathe.

Augment: You can augment this power in one or more of the following ways.

1. If you spend 2 additional power points, this power can also affect an animal, fey, giant, magical beast, or monstrous humanoid.

2. If you spend 4 additional power points, this power can also affect an aberration, dragon, elemental, or outsider in addition to the creature types mentioned above.

3. If you spend 6 additional power points, this power can affect up to four creatures all within a 20-ft.-radius burst.

In addition, for every 2 additional power points you spend to achieve any of these effects, this power&rsquo;s save DC increases by 1.',
  true,
  '5'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Crisis of Life',
  'crisis-of-life',
  'Telepathy [Mind-Affecting, Death]',
  'Telepath 7',
  '1 standard action',
  'Medium (100 ft. + 10 ft./ level)',
  'One creature',
  'Instantaneous',
  'Fortitude partial; see text',
  'Yes',
  'You interrupt the subject&rsquo;s autonomic heart rhythm, killing it instantly on a failed saving throw if it has 11 Hit Dice or less. If the target makes its saving throw or has more than 11 Hit Dice, it takes 7d6 points of damage.

Augment: For every additional power point you spend, this power can kill a subject that has Hit Dice equal to 11 + the number of additional points.',
  true,
  '13'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Crystal Shard',
  'crystal-shard',
  'Metacreativity (Creation)',
  'Psion/wilder 1',
  '1 standard action',
  'Close (25 ft. + 5 ft./2 levels)',
  NULL,
  'Instantaneous',
  'None',
  'No',
  'Upon manifesting this power, you propel a razor-sharp crystal shard at your target. You must succeed on a ranged touch attack with the ray to deal damage to a target. The ray deals 1d6 points of piercing damage.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by 1d6 points.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Crystallize',
  'crystallize',
  'Metacreativity',
  'Shaper 6',
  '1 standard action',
  'Medium (100 ft. + 10 ft./ level)',
  'One living creature',
  'Permanent',
  'Fortitude negates',
  'Yes',
  'You seed the subject&rsquo;s flesh with supersaturated crystal. In an eyeblink, the subject&rsquo;s form seems to freeze over, as its flesh and fluids are instantly crystallized. Following the application of this power, the subject appears lifeless. In fact, it is not dead (though no life can be detected with powers or spells that detect such).

This power has a chance of being dispelled only by a manifester of a higher level than you when you manifested this power. When the power is dispelled, crystal melts back into flesh, and the subject is in exactly the state he was prior being affected by crystallize.',
  true,
  '11'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Danger Sense',
  'danger-sense',
  'Clairsentience',
  'Psion/wilder 3, psychic warrior 3',
  '1 standard action',
  'Personal',
  'You',
  '1 hour/level (D)',
  NULL,
  NULL,
  'You can sense the presence of danger before your senses would normally allow it. Your intuitive sense alerts you to danger from traps, giving you a +4 insight bonus on Reflex saves to avoid traps and a +4 insight bonus to Armor Class against attacks by traps.

Augment: If you spend 3 additional power points, this power also gives you the uncanny dodge ability; if you spend 6 additional power points, this power gives you the improved uncanny dodge ability as well.',
  true,
  '5'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Darkvision, Psionic',
  'darkvision-psionic',
  'Clairsentience',
  'Psion/wilder 3, psychic warrior 2',
  '1 standard action',
  'Personal',
  'You',
  '1 hour/level',
  NULL,
  NULL,
  'As the darkvision spell, except as noted here.',
  true,
  'Psion/wilder 5, psychic warrior 3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Daze, Psionic',
  'daze-psionic',
  'Telepathy (Compulsion) [Mind-Affecting]',
  'Psion/wilder 1',
  '1 standard action',
  'Close (25 ft. + 5 ft./2 levels)',
  'One humanoid creature that has 4 HD or less',
  '1 round',
  'Will negates',
  'Yes',
  'As the daze spell, except as noted here.

Augment: For every additional power point you spend, this power can affect a target that has Hit Dice equal to 4 + the additional points.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Death Urge',
  'death-urge',
  'Telepathy (Compulsion) [Mind-Affecting]',
  'Psion/wilder 4',
  '1 standard action',
  'Medium (100 ft. + 10 ft./ level)',
  'One living creature',
  '1 round',
  'Will negates',
  'Yes',
  'You plant a hidden death-urge impulse in the subject&rsquo;s unconscious. On the subject&rsquo;s next turn, it looks for the quickest method to end its life and attempts to do so. The subject takes no other action on its turn except attempting to harm itself.

If armed, the subject attacks itself as a full-round action. The attack automatically succeeds and deals damage as a critical hit. If unarmed, the subject moves adjacent to the nearest enemy and provokes an attack of opportunity, offering its opponent an opening, which the opponent may or may not choose to take advantage of.

If the subject is unarmed and no enemy is nearby, the subject simply does nothing at all. A subject close to an immediate and lethal hazard such as a cliff or a fire might hurl itself off the cliff or into the fire instead of striking itself with a weapon.

Augment: For every 4 additional power points you spend, this power&rsquo;s save DC increases by 2 and its duration increases by 1 round.',
  true,
  '7'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Deceleration',
  'deceleration',
  'Psychoportation',
  'Psion/wilder 1',
  '1 standard action',
  'Close (25 ft. + 5 ft./level)',
  'One Medium or smaller creature',
  '1 min./level',
  'Reflex negates',
  'Yes',
  'You warp space around an individual, hindering the subject&rsquo;s ability to move. The subject&rsquo;s speed (in any movement mode it possesses) is halved. A subsequent manifestation of deceleration on the subject does not further decrease its speed.

Augment: For every 2 additional power points you spend, this power can affect a target one size category larger.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Decerebrate',
  'decerebrate',
  'Psychoportation [Teleportation]',
  'Psion/wilder 7',
  '1 standard action',
  'Close (25 ft. + 5 ft./level)',
  'One living creature',
  'Instantaneous',
  'Fortitude negates',
  'Yes',
  'With decerebrate, you selectively remove a portion of the subject&rsquo;s brain stem. The creature loses all cerebral function, vision, hearing, and other sensory abilities, and all voluntary motor activity. The subject becomes limp and unresponsive. Without extreme measures, such as greater restoration or some other suitable effect of 7th level or higher, the creature perishes in 1d4 days.',
  true,
  '13'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'D&eacute;j&agrave; Vu',
  'd-eacute-j-agrave-vu',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 1',
  '1 standard action',
  'Medium (100 ft. + 10 ft./level)',
  'One creature',
  '1 round',
  'Will negates',
  'Yes',
  'Your mental impulse forces the subject to repeat the actions it took on its previous turn. If the situation has changed in such a way that the subject can&rsquo;t take the same actions again (if its foe is dead, or the subject has run out of power points, and so on), the subject stands still and takes no actions for 1 round. In any event, the subject can still defend itself, and it retains its Dexterity bonus to AC even if it stands still.

Augment: For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Demoralize',
  'demoralize',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 1',
  '1 standard action',
  '30 ft.',
  NULL,
  '1 min./level',
  'Will negates',
  'Yes',
  'You fill your enemies with self-doubt. Any enemy in the area that fails its save becomes shaken for the duration of the power. Allies and creatures without an Intelligence score are unaffected.

Augment: For every 2 additional power points you spend, this power&rsquo;s range and the radius of its area both increase by 5 feet, and the power&rsquo;s save DC increases by 1.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Destiny Dissonance',
  'destiny-dissonance',
  'Clairsentience',
  'Seer 1',
  '1 standard action',
  'Touch',
  'Creature touched',
  '1 round/level',
  'None',
  'Yes',
  'Your mere touch grants your foe an imperfect, unfocused glimpse of the many possible futures in store. Unaccustomed to and unable to process the information, the subject becomes sickened for 1 round per level of the manifester.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Detect Hostile Intent',
  'detect-hostile-intent',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 2, psychic warrior 2',
  '1 standard action',
  '30 ft.',
  NULL,
  '10 min./level (D)',
  'None',
  'No',
  'While the duration of this power lasts, you become aware of the presence of any creatures with hostile intent within 30 feet of you, and their direction from you (but not their specific location). The power detects active aggression, as opposed to vigilance. In addition, while this power is active you cannot be surprised or caught flatfooted by creatures that are susceptible to mind-affecting powers.

While under the effect of this power, you can make Sense Motive checks as a free action against anyone within 30 feet of you.

The power can penetrate barriers, but 3 feet of stone, 3 inches of common metal, 1 inch of lead, or 6 feet of wood or dirt blocks it.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Detect Psionics',
  'detect-psionics',
  'Clairsentience',
  'Psion/wilder 1, psychic warrior 1',
  '1 standard action',
  '60 ft.',
  NULL,
  'Concentration, up to 1 min./level (D)',
  'None',
  'No',
  'You detect psionic auras. A psionic aura is given off by any active or permanent power, or during the use of any psionic feat. Characters who have levels in a psionic class, creatures with the psionic subtype, and creatures with the Wild Talent feat possess psionic auras. The amount of information revealed by the manifestation of this power depends on how long you study a particular area or subject.

1st Round: Presence or absence of psionic auras.

2nd Round: Number of different psionic auras and the strength of the most potent aura.

3rd Round: The strength and location of each aura. If the items or creatures bearing the auras are in line of sight, you can make Psicraft checks to determine the discipline involved in each aura. (Make one check per aura; DC 15 + power level, or 15 + one-half manifester level for an effect that is not created by a power, such as that of a psionic item.)

Psionically charged locations, multiple disciplines, or strong local psionic emanations may confuse or conceal weaker auras.

Aura Strength: A psionic aura&rsquo;s strength depends on a functioning power&rsquo;s level or an item&rsquo;s manifester level. If an aura falls into more than one category, detect psionics indicates the stronger of the two. Detection of an overwhelming aura (see the accompanying table) dazes you for 1 round and the power ends.

Lingering Aura: A psionic aura lingers after its original source dissipates (in the case of a power) or is destroyed (in the case of a psionic item). If detect psionics is manifested and directed at such a location, the power indicates an aura of dim (even weaker than a faint aura). How long the aura lingers at this dim level depends on its original strength:

Each round, you can turn to detect psionics in a new area. You can tell the difference between magical and psionic auras. The power can penetrate barriers, but 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt blocks it.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Detect Remote Viewing',
  'detect-remote-viewing',
  'Clairsentience',
  'Psion/wilder 4',
  '1 standard action',
  '40 ft.',
  NULL,
  '24 hours',
  'None',
  'No',
  'You immediately become aware of any attempt to observe you by means of a clairsentience (scrying) power or divination (scrying) spell. The power&rsquo;s effect radiates from you and moves as you move. You know the location of every psionic or magical sensor within the power&rsquo;s area.

If the viewing attempt originates within the area, you also know the viewer&rsquo;s location. Otherwise, you and the remote viewer immediately make opposed manifester level checks (1d20 + manifester level, or viewer&rsquo;s caster level as appropriate). If you at least match the remote viewer&rsquo;s result, you get a visual image of the remote viewer and an accurate sense of the remote viewer&rsquo;s direction and distance from you.',
  true,
  '7'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Detect Teleportation',
  'detect-teleportation',
  'Clairsentience',
  'Nomad 1',
  '1 standard action',
  '40 ft.',
  NULL,
  'Concentration, up to 1 minute (D)',
  'No',
  'No',
  'You sense the use of any effects of the teleportation subdiscipline within the area. You sense the use of these powers whether or not you have line of sight or line of effect (although a force effect prevents this detection). When you sense the use of an appropriate power, you know the direction in which the power was used, though not the distance or the exact effect.

Augment: If you spend 2 additional power points, this power&rsquo;s range increases to Medium (100 ft. + 10 ft./level).',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Dimension Door, Psionic',
  'dimension-door-psionic',
  'Psychoportation (Teleportation)',
  'Psion/wilder 4, psychic warrior 4',
  '1 standard action',
  'Long (400 ft. + 40 ft./level)',
  NULL,
  'Instantaneous',
  'None and Will negates (object)',
  'No and Yes (object)',
  'As the dimension door spell, except as noted here.

Augment: If you spend 6 additional power points, you can manifest this power as a move action.',
  true,
  '7'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Dimension Slide',
  'dimension-slide',
  'Psychoportation (Teleportation)',
  'Psychic warrior 3',
  '1 standard action',
  'Close (25 ft. + 5 ft./2 levels)',
  'You; see text',
  'Instantaneous',
  NULL,
  NULL,
  'You instantly transfer yourself from your current location to any other spot within range to which you have line of sight. You can bring along possessions that amount to as much as a medium load, including living creatures that weigh as much as 20 pounds. Movement caused by the use of dimension slide does not provoke attacks of opportunity.

If you somehow attempt to transfer yourself to a location occupied by a solid body or a location you can&rsquo;t see the power simply fails to function.

Augment: If you spend 4 additional power points, you can manifest this power as a move action.',
  true,
  '5'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Dimension Swap',
  'dimension-swap',
  'Psychoportation (Teleportation)',
  'Nomad 2, psychic warrior 2',
  '1 standard action',
  'Close (25 ft. + 5 ft./2 levels)',
  NULL,
  'Instantaneous',
  'Will negates (harmless, object)',
  'Yes (harmless, object)',
  'You instantly swap positions between your current position and that of a designated ally in range. Alternatively, you can swap the positions of any two allies in range. This power affects creatures of Large or smaller size. You can bring along objects, but not other creatures.

Special: A psychic warrior can manifest this power to swap positions with an ally, but not to swap the positions of two allies.

Augment: For every 2 additional power points you spend, this power can affect a target one size category larger.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Dimensional Anchor, Psionic',
  'dimensional-anchor-psionic',
  'Psychoportation',
  'Nomad 4',
  '1 standard action',
  'Medium (100 ft. + 10 ft./ level)',
  NULL,
  '1 min./level',
  'None',
  'Yes (object)',
  'As the dimensional anchor spell, except as noted here.',
  true,
  '7'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Disable',
  'disable',
  'Telepathy (Compulsion) [Mind-Affecting]',
  'Psion/wilder 1',
  '1 standard action',
  '20 ft.',
  NULL,
  '1 min./level (D)',
  'Will negates',
  'Yes',
  'You broadcast a mental compulsion that convinces one or more creatures of 4 Hit Dice or less that they are disabled. Creatures with the fewest HD are affected first. Among creatures with equal Hit Dice, those who are closest to the power&rsquo;s point of origin are affected first. Hit Dice that are not sufficient to affect a creature are wasted. Creatures that are rendered helpless or are destroyed when they reach 0 hit points cannot be affected.

Creatures affected by this power believe that they have somehow been brought to the brink of unconsciousness and must act accordingly. While it&rsquo;s possible for an important nonplayer character to attempt some sort of &ldquo;heroic&rdquo; action, common NPCs and creatures under the effect of this power typically cower or retreat.

Any creature that attempts to take a standard action immediately breaks the compulsion and can act normally. A creature that attempts to heal itself or that receives healing is likewise freed of the compulsion, and if it is not actually wounded, the healing is wasted. A creature that takes damage is also instantly freed of the compulsion (although the damage still counts against its actual current hit points).

Augment: For every 2 additional power points you spend, this power&rsquo;s range increases by 5 feet and its save DC increases by 1.

In addition, for every additional power point you spend to increase the range and the save DC, this power can affect targets that have Hit Dice equal to 4 + the number of additional points.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Disintegrate, Psionic',
  'disintegrate-psionic',
  'Psychoportation',
  'Psion/wilder 6',
  '1 standard action',
  'Medium (100 ft. + 10 ft./ level)',
  NULL,
  'Instantaneous',
  'Fortitude partial (object)',
  'Yes',
  'A thin, green ray springs from your pointing finger. You must make a successful ranged touch attack to hit. Any creature struck by the ray takes 22d6 points of damage. Any creature reduced to 0 or fewer hit points by this power is entirely disintegrated, leaving behind only a trace of fine dust. A disintegrated creature&rsquo;s equipment is unaffected.

When used against an object, the ray simply disintegrates as much as one 10-foot cube of nonliving matter. Thus, the power disintegrates only part of any very large object or structure targeted. The ray affects even objects constructed entirely of force, but not psionic effects such as a null psionics field.

A creature or object that makes a successful Fortitude save is partially affected, taking only 5d6 points of damage. If this damage reduces the creature or object to 0 or fewer hit points, it is entirely disintegrated.

Only the first creature or object struck can be affected; that is, the ray affects only one target per manifestation.

Augment: For every additional power point you spend, the damage this power deals to a subject that fails its saving throw increases by 2d6 points. Augmenting this power does not change the amount of damage the target takes if it succeeds on its saving throw.',
  true,
  '11'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Dismissal, Psionic',
  'dismissal-psionic',
  'Psychoportation',
  'Nomad 4',
  '1 standard action',
  'Close (25 ft. + 5 ft./2 levels)',
  'One extraplanar creature',
  'Instantaneous',
  'Will negates',
  'Yes',
  'As the dismissal spell, except as noted here.',
  true,
  '7'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Dismiss Ectoplasm',
  'dismiss-ectoplasm',
  'Metacreativity',
  'Psion/wilder 3',
  '1 standard action',
  'Medium (100 ft. + 10 ft./ level)',
  NULL,
  'Instantaneous',
  'Will negates; see text',
  'No',
  'You dismiss creatures, objects, or effects composed of ectoplasm, such as astral constructs or the ectoplasmic cocoon power, or that were formerly composed of ectoplasm, such as items created by metacreativity (creation) powers.

An ectoplasmic creature that fails its Will saving throw dissipates into so much constituent ectoplasm, which evaporates immediately.

A creature under the effect of the ectoplasmic form power that fails its saving throw is either destroyed out right or physically shifted to a random location on the Astral Plane (50% chance for either result).

Other ongoing powers that create ectoplasmic objects or effects, such as ectoplasmic cocoon, are dismissed if you succeed on a manifester level check (1d20 + your manifester level, maximum +10) against a DC of 11 + the power&rsquo;s manifester level.',
  true,
  '5'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Dispel Psionics',
  'dispel-psionics',
  'Psychokinesis',
  'Psion/wilder 3',
  '1 standard action',
  'Medium (100 ft. + 10 ft./level)',
  NULL,
  'Instantaneous or 1d4 rounds; see text',
  'None',
  'No',
  'You can use dispel psionics to end ongoing powers that have been manifested on a creature or object, to temporarily suppress the psionic abilities of a psionic item, or to end ongoing powers (or at least their effects) within an area. A dispelled power ends as if its duration had expired. Some powers, as detailed in their descriptions, can&rsquo;t be defeated by dispel psionics, or can be ended only if you manifest dispel psionics at a high enough manifester level. Dispel psionics can end spell-like effects just as it does powers.

The effect of a power with an instantaneous duration can&rsquo;t be dispelled, because the psionic effect is already over before the dispel psionics can take effect.

You choose to use dispel psionics in one of two ways: a targeted dispel or an area dispel.

Targeted Dispel: One object, creature, or power is the target of the dispel psionics power. You make a dispel check (1d20 + your manifester level, maximum +10) against the power or against each ongoing power currently in effect on the object or creature. The DC for this dispel check is 11 + the power&rsquo;s manifester level. If you succeed on a particular check, that power is dispelled; if you fail, that power remains in effect.

If you target an object or creature that is the effect of an ongoing power or is under the effect of an ongoing power, you make a dispel check to end the power or its effect. If the object that you target is a psionic item, you make a dispel check against the item&rsquo;s manifester level. If you succeed, all the item&rsquo;s psionic properties are suppressed for 1d4 rounds, after which the item recovers on its own. A suppressed item becomes nonpsionic for the duration of the effect. An interdimensional interface� is temporarily closed. A psionic item&rsquo;s physical properties are unchanged: A suppressed psionic sword is still a sword (a masterwork sword, in fact). Artifacts and deities are unaffected by mortal power such as this.

You automatically succeed on your dispel check against any power that you manifested yourself.

Area Dispel: When dispel psionics is used in this way, the power affects everything within a 20-foot radius. For each creature within the area that is the subject of one or more powers, you make a dispel check against the power with the highest manifester level. If that check fails, you make dispel checks against progressively weaker powers until you dispel one power (which discharges the dispel psionics power so far as that target is concerned) or until you fail all your checks. The creature&rsquo;s psionic items are not affected.

For each object within the area that is the target of one or more powers, you make dispel checks as with creatures. Psionic items are not affected by an area dispel.

For each ongoing area or effect power whose point of origin is within the area of the dispel psionics power, you can make a dispel check to dispel the power.

For each ongoing power whose area overlaps that of the dispel psionics power, you can make a dispel check to end the effect, but only within the overlapping area.

If an object or creature that is the effect of an ongoing power is in the area, you can make a dispel check to end the power that created that object or construct in addition to attempting to dispel powers targeting the creature or object. You can choose to automatically succeed on dispel checks against any power that you have manifested.

Augment: For every additional power point you spend, the bonus on your dispel check increases by 2 (to a maximum bonus of +20 for a 5-point expenditure).',
  true,
  '5'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Dispelling Buffer',
  'dispelling-buffer',
  'Psychokinesis',
  'Kineticist 6, psychic warrior 6',
  '1 standard action',
  'Personal or close (25 ft. + 5 ft./2 levels); see text',
  'You or one willing creature or one object (object weighing up to 100 lb./level); see text',
  '1 hour/level (D)',
  'None',
  'Yes (harmless, object)',
  'You create a psychokinetic shield around the subject that improves the chance that any powers affecting the subject will resist a dispel psionics power (or a dispel magic spell) or a negation effect that targets a specific power (such as shatter mind blank). When dispelling buffer is manifested on a creature or object, add +5 to the DC of the dispel check for each ongoing effect that is subject to being dispelled.

Dispel psionics can negate dispelling buffer, but against a targeted dispel, dispelling buffer is always checked last (with the same +5 bonus). Against an area dispel, dispelling buffer is checked in the order according to its level (with the same +5 bonus).

Special: When a psychic warrior manifests this power, the range is personal and the target is the manifester.',
  true,
  '11'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Dissipating Touch',
  'dissipating-touch',
  'Psychoportation (Teleportation)',
  'Psion/wilder 1, psychic warrior 1',
  '1 standard action',
  'Touch',
  'Creature or object touched',
  'Instantaneous',
  'None',
  'Yes (object)',
  'Your mere touch can disperse the surface material of a foe or object, sending a tiny portion of it far away. This effect is disruptive; thus, your successful melee touch attack deals 1d6 points of damage.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by 1d6 points.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Dissolving Touch',
  'dissolving-touch',
  'Psychometabolism [Acid]',
  'Psychic warrior 2',
  '1 standard action',
  'Touch',
  'Creature or object touched',
  'Instantaneous',
  'None',
  'No',
  'Your touch, claw, or bite is corrosive, and sizzling moisture visibly oozes from your natural weapon or hand. You deal 4d6 points of acid damage to any creature or object you touch with your successful melee touch attack. Acid you secrete denatures 1 round after use, losing all efficacy and ability to deal damage. You are immune to your own acid.

Augment: For every 2 additional power points you spend, this power&rsquo;s damage increases by 1d6 points.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Dissolving Weapon',
  'dissolving-weapon',
  'Psychometabolism [Acid]',
  'Psychic warrior 2',
  '1 standard action',
  'Personal',
  'One held weapon; see text',
  'Instantaneous',
  'None',
  'No',
  'As dissolving touch, except your weapon is charged with acid until you make a successful attack.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Distract',
  'distract',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 1, psychic warrior 1',
  '1 standard action',
  'Close (25 ft. + 5 ft./2 levels)',
  'One creature',
  'Concentration, up to 1 min./level (D)',
  'Will negates',
  'Yes',
  'You cause your subject&rsquo;s mind to wander, distracting her. Subjects under the effect of distract make all Listen, Spot, Search, and Sense Motive checks at a -4 penalty.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Divert Teleport',
  'divert-teleport',
  'Psychoportation (Teleportation)',
  'Psion/wilder 7',
  '1 immediate action; see text',
  'Medium (100 ft. + 10 ft./level)',
  NULL,
  '10 min./level (D)',
  'Will negates (foils diversion)',
  'Yes (foils diversion)',
  'Similar to detect teleportation, except that you know the intended destination, and you can divert the final destination of any teleportation attempt made by others within the area. This is an immediate action. You can manifest this power even if it is not your turn.

You can divert the destination of both incoming and outgoing teleportations, psionic and magical. You must overcome the power resistance of creatures that possess it to make a successful diversion, and the teleporting creature can make a Will save to foil the diversion as well.

For the purpose of this power, &ldquo;divert&rdquo; means you choose the actual destination of any teleportation attempt you can affect, as if you yourself were teleporting to that location, regardless of the teleportation range of the effect you are diverting. The destination you choose must be a location with which you are very familiar or that you have studied carefully.',
  true,
  '13'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Divination, Psionic',
  'divination-psionic',
  'Clairsentience',
  'Psion/wilder 4',
  '10 minutes',
  'Personal',
  'You',
  'Instantaneous',
  NULL,
  NULL,
  'As the divination spell, except as noted here.',
  true,
  '7'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Dominate, Psionic',
  'dominate-psionic',
  'Telepathy (Compulsion) [Mind-Affecting]',
  'Telepath 4',
  '1 round',
  'Medium (100 ft. + 10 ft./level)',
  'One humanoid',
  'Concentration',
  'Will negates',
  'Yes',
  'As the dominate person spell, except as noted here.

Augment: You can augment this power in one or more of the following ways.

1. If you spend 2 additional power points, this power can also affect an animal, fey, giant, magical beast, or monstrous humanoid.

2. If you spend 4 additional power points, this power can also affect an aberration, dragon, elemental, or outsider in addition to the creature types mentioned above.

3. For every 2 additional power points you spend, this power can affect an additional target. Any additional target cannot be more than 15 feet from another target of the power.

4. If you spend 1 additional power point, this power''s duration is 1 hour rather than concentration. If you spend 2 additional power points, this power''s duration is 1 day rather than concentration. If you spend 4 additional power points, this power''s duration is 1 day per manifester level rather than concentration.

In addition, for every 2 additional power points you spend to achieve any of these effects, this power&rsquo;s save DC increases by 1.',
  true,
  '7'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Dream Travel',
  'dream-travel',
  'Psychoportation',
  'Nomad 7',
  '1 standard action',
  'Touch',
  NULL,
  '1 hour/level (D)',
  'Will negates',
  'Yes',
  'You and any creature you touch are drawn along a crystal arc of reverie to the edge of conscious thought and into the region of dreams. You can take more than one creature along with you (subject to your level limit), but each one must be touching another one. You physically enter the land of dreams, leaving nothing behind.

In the region of dreams, you move through a menagerie of thoughts, desires, and phantoms created by the minds of dreamers everywhere. For every minute you move through dream, you can &ldquo;wake&rdquo; to find yourself five miles displaced in the waking world. Thus, a character can use this power to travel rapidly by physically entering where only dreams normally prowl, moving the desired distance, and then stepping back into the waking world. You know where you will come out in the waking world.

Dream travel can also be used to travel to other planes that contain creatures that dream, but doing this requires crossing into the dreams of outsiders, where you are subject to the vagaries of many dream realities - a potentially perilous proposition. Transferring to another plane of existence in this fashion requires 1d4 hours of uninterrupted travel.

Any creatures that come along when dream travel is manifested also make the transition to the borders of unconscious thought. A creature separated from you wanders off into the dreamscape. When the duration ends, all affected creatures return to the waking world as much as 1,000 miles (d%x10) from their starting point. If a creature remains in the dreamscape, it is powerless to leave unless it can manifest the dream travel power itself or someone who manifests the power seeks out the lost creature.

Augment: For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1.',
  true,
  '13'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Duodimensional Claw',
  'duodimensional-claw',
  'Psychometabolism',
  'Psychic warrior 3',
  '1 standard action',
  'Personal',
  'You',
  '10 min./level',
  NULL,
  NULL,
  'If you have a claw attack (either from an actual natural weapon or from an effect such as claws of the beast), you can use this power to improve that weapon. One of your claws becomes two-dimensional, making it razorsharp. The weapon is now psionically keen, increasing its threat range from 20 to 19-20. This benefit does not stack with other effects that improve a weapon&rsquo;s threat range.',
  true,
  '5'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Ecto Protection',
  'ecto-protection',
  'Metacreativity',
  'Psion/wilder 1',
  '1 standard action; see text',
  'Close (25 ft. + 5 ft./2 levels)',
  'An astral construct you manifest',
  '1 min./level',
  'None',
  'No',
  'This power reinforces an astral construct created by the astral construct power, giving you a +1 bonus on any manifester level checks you make to protect it against dispel psionics or a similar effect, and a +1 bonus on its saving throw to resist dismiss ectoplasm. This power can be manifested as a swift action in the same round that you manifest an astral construct, as long as the power points you spend to perform both actions does not exceed your manifester level.

Augment: For every 2 additional power points you spend, your bonus on manifester level checks to protect your astral construct increases by 1, and your astral construct&rsquo;s bonus on its saving throw to resist dismiss ectoplasm increases by 1.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Ectoplasmic Cocoon',
  'ectoplasmic-cocoon',
  'Metacreativity',
  'Shaper 3',
  '1 standard action',
  'Medium (100 ft. + 10 ft./ level)',
  'One Medium or smaller creature',
  '1 round/level (D)',
  'Reflex negates',
  'No',
  'You draw writhing strands of ectoplasm from the Astral Plane that wrap up the subject like a mummy. The subject can still breathe but is otherwise helpless, unable to see outside the cocoon, speak, or take any physical actions. The subject&rsquo;s nostrils are clear (air passes through the cocoon normally). The subject can execute purely mental actions (such as manifesting powers or casting spells with no verbal, somatic, or material components).

Cutting or damaging the cocoon can free a victim. The cocoon has hardness 8 and 20 hit points. Teleportation and other forms of travel provide a means of escape, but the cocoon extends into the Ethereal Plane, blocking ethereal travel. An ectoplasmic cocoon can&rsquo;t be affected by dispel psionics, but it can be dismissed with dismiss ectoplasm, or otherwise destroyed by extreme measures or items.

The creature within the cocoon is visible only as a vague shape (substantial enough to interrupt line of sight) and cannot be directly harmed or interacted with unless the cocoon is destroyed. The cocooned creature can be moved normally (the weight of the cocoon is negligible).

A creature that is cocooned while aloft begins to fall immediately, and a creature that is cocooned while swimming or underwater may drown.

Augment: You can augment this power in one or both of the following ways.

1. For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1.

2. For every 2 additional power points you spend, this power can affect a target one size category larger.',
  true,
  '5'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Ectoplasmic Cocoon, Mass',
  'ectoplasmic-cocoon-mass',
  'Metacreativity',
  'Shaper 7',
  NULL,
  'Medium (100 ft. + 10 ft./level)',
  NULL,
  '1 hour/level (D)',
  'Reflex negates',
  'No',
  'As ectoplasmic cocoon, except you can cocoon several creatures (or a single big creature that fits in a 20-footradius sphere or hemisphere) in a mass of writhing ectoplasm. Targets entirely within the area who fail their save are caught and cocooned. If a creature&rsquo;s body is only partially within the area, this power does not affect that creature.

Augment: For every 2 additional power points you spend, the radius of this power&rsquo;s area increases by 5 feet.',
  true,
  '13'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Ectoplasmic Form',
  'ectoplasmic-form',
  'Psychometabolism',
  'Egoist 3, psychic warrior 3',
  '1 standard action',
  'Personal',
  'You',
  '1 min./level (D)',
  NULL,
  NULL,
  'You and all your gear become a partially translucent mass of rippling ectoplasm that generally conforms to your normal shape. You gain damage reduction 10/psionics, and you gain immunity to poison and critical hits. Your material armor becomes meaningless, although your size, Dexterity, deflection bonuses, and armor bonuses from force effects still apply to your Armor Class.

You can manifest powers while in ectoplasmic form, but you must make a Concentration check (DC 20 + power level) for each power you attempt to manifest.

You cannot physically attack, you lose supernatural abilities (if any), and you can&rsquo;t speak while in ectoplasmic form. You can&rsquo;t run, but you can fly at a speed of 20 feet (perfect). You can pass through small holes or narrow openings, even mere cracks, with all you were wearing or holding in your hands. You are subject to the effects of wind, and you can&rsquo;t enter water or other liquid. You also can&rsquo;t manipulate objects or activate items, even those carried along with you. Continuously active items remain active, though in some cases their effects may be moot (such as items that provide armor or natural armor bonuses).',
  true,
  '5'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Ectoplasmic Shambler',
  'ectoplasmic-shambler',
  'Metacreativity (Creation)',
  'Psion/wilder 5',
  '1 round',
  'Long (400 ft. + 40 ft./level)',
  NULL,
  '1 min./level',
  'None',
  'No',
  'You fashion an ephemeral, manylegged mass of pseudo-living ectoplasm called an ectoplasmic shambler. You can direct the shambler as a free action. It has a speed of 10 feet. It can completely surround objects (and opponents) over which it is manifested or onto which it moves, because it has the consistency of thick mist. The vision of those within the shambler is limited to 5 feet, and manifesting powers (or casting spells) within the shambler is difficult due to the constant turbulence felt by those caught in the shambler&rsquo;s form.

Creatures enveloped by the shambler, regardless of Armor Class, take 1 point of damage for every two manifester levels you have in each round they become or remain within the roiling turbulence of the shambler. Anyone trying to manifest a power must make a Concentration check (DC 15 + power&rsquo;s or spell&rsquo;s level) to successfully manifest a power or cast a spell inside the shambler.

A wind stronger than 20 miles per hour that blows against the shambler reduces its speed to 0 feet during the first round, and in subsequent rounds moves it in the direction of the wind at a speed of 5 feet. A wind stronger than 20 miles per hour that blows in the direction the shambler travels increases its speed to 15 feet.',
  true,
  '9'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Ego Whip',
  'ego-whip',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 2',
  '1 standard action',
  'Medium (100 ft. +10 ft./level)',
  'One creature',
  'Instantaneous',
  'Will half; see text',
  'Yes',
  'Your rapid mental lashings assault the ego of your enemy, debilitating its confidence. The target takes 1d4 points of Charisma damage, or half that amount (minimum 1 point) on a successful save. A target that fails its save is also dazed for 1 round.

Augment: For every 4 additional power points you spend, this power&rsquo;s Charisma damage increases by 1d4 points and its save DC increases by 2.',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Elfsight',
  'elfsight',
  'Psychometabolism',
  'Psion/wilder 2, psychic warrior 1',
  '1 standard action',
  'Personal',
  'You',
  '1 hour/level',
  NULL,
  NULL,
  'You gain low-light vision (as an elf ) for the duration of the power, as well as a +2 bonus on Search and Spot checks.

In addition, you gain the ability to notice secret or concealed doors by merely passing within 5 feet of one, getting to make a Search check as if you were actively looking for it.

If elfsight is used in conjunction with my light, the cone of light extends out to 40 feet instead of 20 feet.',
  true,
  'Psion/wilder 3, psychic warrior 1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Empathic Feedback',
  'empathic-feedback',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 4, psychic warrior 3',
  '1 standard action',
  'Personal',
  'You',
  '10 min./level',
  NULL,
  NULL,
  'You empathically share your pain and suffering with your attacker. Each time a creature strikes you in melee, it takes damage equal to the amount it dealt to you or 5 points, whichever is less. This damage is empathic in nature, so powers and abilities the attacker may have such as damage reduction and regeneration do not lessen or change this damage. The damage from empathic feedback has no type, so even if you took fire damage from a creature that has immunity to fire, empathic feedback will damage your attacker.

Augment: For every additional power point you spend, this power&rsquo;s damage potential increases by 1 point.',
  true,
  'Psion/wilder 7, psychic warrior 5'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Empathic Transfer',
  'empathic-transfer',
  'Psychometabolism',
  'Egoist 2, psychic warrior 2',
  '1 standard action',
  'Touch',
  'Willing creature touched',
  'Instantaneous',
  NULL,
  NULL,
  'You heal another creature&rsquo;s wounds, transferring some of its damage to yourself. When you manifest this power, you can heal as much as 2d10 points of damage. The target regains a number of hit points equal to the dice result, and you lose hit points equal to half of that amount. (This loss can bring you to 0 or fewer hit points.) Powers and abilities you may have such as damage damage reduction and regeneration do not lessen or change this damage, since you are taking the target&rsquo;s pain into yourself in an empathic manner. The damage transferred by this power has no type, so even if you have immunity to the type of damage the target originally took, the transfer occurs normally and deals hit point damage to you.

Alternatively, you can use this power to absorb one poison or one disease afflicting the target creature into yourself. When you absorb a poison or disease, you do not take any of the damage previously dealt to the target by the affliction, but you do assume the burden of making the secondary and/or continuing Fortitude saves to combat the affliction.

Finally, you can use this power to transfer up to 1 point of ability damage per manifester level from the target to yourself.

Augment: For every additional power point you spend, you can heal an additional 2d10 points of damage (to a maximum of 10d10 points per manifestation).',
  true,
  '3'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Empathic Transfer, Hostile',
  'empathic-transfer-hostile',
  'Telepathy [Mind-Affecting]',
  'Telepath 3, psychic warrior 3',
  '1 standard action',
  'Touch',
  'Creature touched',
  'Instantaneous',
  'Will half',
  'Yes',
  'You transfer your hurt to another. When you manifest this power and then make a successful touch attack, you can transfer 50 points of damage (or less, if you choose) from yourself to the touched creature. You immediately regain hit points equal to the amount of damage you transfer.

You cannot use this power to gain hit points in excess of your full normal total. The transferred damage is empathic in nature, so powers and abilities the subject may have such as damage reduction and regeneration do not lessen or change this damage.

The damage transferred by this power has no type, so even if the subject has immunity to the type of damage you originally took, the transfer occurs normally and deals hit point damage to the subject.

Augment: You can augment this power in one or both of the following ways.

1. For every additional power point you spend, you can transfer an additional 10 points of damage (maximum 90 points per manifestation).

2. If you spend 6 additional power points, this power affects all creatures in a 20-foot-radius spread centered on you.',
  true,
  '5'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Empathy',
  'empathy',
  'Telepathy [Mind-Affecting]',
  'Psion/wilder 1',
  '1 standard action',
  '30 ft.',
  NULL,
  'Concentration, up to 1 min./level (D)',
  'None',
  'No',
  'You detect the surface emotions of any creature you can see that is in the power&rsquo;s area. You can sense basic needs, drives, and emotions. Thirst, hunger, fear, fatigue, pain, rage, hatred, uncertainty, curiosity, friendliness, and many other kinds of sensations and moods can all be perceived.

You gain a +2 insight bonus on any Bluff, Diplomacy, Intimidate, or Sense Motive checks that you make in the round when you cease concentrating on this power.

Augment: You can augment this power in one or both of the following ways.

1. For every additional power point you spend, this power&rsquo;s range and the radius of its area increases by 5 feet.

2. If you spend 2 additional power points, this power&rsquo;s maximum duration increases to 1 hour/level.',
  true,
  '1'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Empty Mind',
  'empty-mind',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You empty your mind of all transitory and distracting thoughts, improving your self-control. You gain a +2 bonus on all Will saves until your next action.

You can manifest this power instantly, quickly enough to gain its benefit in an emergency. Manifesting this power is an immediate action, like manifesting a quickened power, and it counts toward the normal limit of one quickened power per round. You can use this power even when it is not your turn.

Augment: For every 2 additional power points you spend, the bonus on your Will saves increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Adaptation',
  'energy-adaptation',
  'Psychometabolism [see text]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your body assimilates some of the effect of an energy attack and converts it to harmless light. You gain resistance 10 against any attack that deals acid, cold, electricity, fire, or sonic damage.

When you absorb damage, you can choose to radiate visible light that illuminates a 60-foot radius for a number of rounds equal to the points of damage you successfully resisted, or merely dissipate the energy without giving off a visual display.

The energy resistance provided by this power increases to 20 points at 9th manifester level and to a maximum of 30 points at 13th level. The power protects your equipment as well.

The resistance provided by this power does not stack with other forms of energy resistance.

This power&rsquo;s subtype is the same as the type of damage it protects against.

Augment: If you spend 4 additional power points, you can manifest this power as an immediate action.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Adaptation, Specified',
  'energy-adaptation-specified',
  'Psychometabolism [see text]',
  'Psion/wilder 2, psychic warrior 2',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As energy adaptation, except you must choose one type of energy to which you gain resistance when this power is manifested.

This power&rsquo;s subtype is the same as the type of damage it protects against.

Augment: If you spend 4 additional power points, you can manifest this power as an immediate action.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Ball',
  'energy-ball',
  'Psychokinesis [see text]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Upon manifesting this power, you choose cold, electricity, fire, or sonic. You create an explosion of energy of the chosen type that deals 7d6 points of damage to every creature or object within the area. The explosion creates almost no pressure.

Cold: A ball of this energy type deals +1 point of damage per die. The saving throw to reduce damage from a cold ball is a Fortitude save instead of a Reflex save.

Electricity: Manifesting a ball of this energy type provides a +2 bonus to the save DC and a +2 bonus on manifester level checks for the purpose of overcoming power resistance.

Fire: A ball of this energy type deals +1 point of damage per die.

Sonic: A ball of this energy type deals -1 point of damage per die and ignores an object&rsquo;s hardness.

This power&rsquo;s subtype is the same as the type of energy you manifest.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by one die (d6). For each extra two dice of damage, this power&rsquo;s save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Bolt',
  'energy-bolt',
  'Psychokinesis [see text]',
  'Psion/wilder 3',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Upon manifesting this power, you choose cold, electricity, fire, or sonic. You release a powerful stroke of energy of the chosen type that deals 5d6 points of damage to every creature or object within the area. The beam begins at your fingertips.

Cold: A bolt of this energy type deals +1 point of damage per die. The saving throw to reduce damage from a cold bolt is a Fortitude save instead of a Reflex save.

Electricity: Manifesting a bolt of this energy type provides a +2 bonus to the save DC and a +2 bonus on manifester level checks for the purpose of overcoming power resistance.

Fire: A bolt of this energy type deals +1 point of damage per die.

Sonic: A bolt of this energy type deals -1 point of damage per die and ignores an object&rsquo;s hardness.

This power&rsquo;s subtype is the same as the type of energy you manifest.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by one die (d6). For each extra two dice of damage, this power&rsquo;s save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Burst',
  'energy-burst',
  'Psychokinesis [see text]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Upon manifesting this power, you choose cold, electricity, fire, or sonic. You create an explosion of unstable ectoplasmic energy of the chosen type that deals 5d6 points of damage to every creature or object within the area. The explosion creates almost no pressure. Since this power extends outward from you, you are not affected by the damage.

Cold: A burst of this energy type deals +1 point of damage per die. The saving throw to reduce damage from a cold burst is a Fortitude save instead of a Reflex save.

Electricity: Manifesting a burst of this energy type provides a +2 bonus to the save DC and a +2 bonus on manifester level checks for the purpose of overcoming power resistance.

Fire: A burst of this energy type deals +1 point of damage per die.

Sonic: A burst of this energy type deals -1 point of damage per die and ignores an object&rsquo;s hardness.

This power&rsquo;s subtype is the same as the type of energy you manifest.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by one die (d6). For each extra two dice of damage, this power&rsquo;s save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Cone',
  'energy-cone',
  'Psychokinesis [see text]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Upon manifesting this power, you choose cold, electricity, fire, or sonic. You create a cone of energy of the chosen type, extending outward from your hand, that deals 5d6 points of damage to every creature or object within the area.

Cold: A cone of this energy type deals +1 point of damage per die. The saving throw to reduce damage from a cold cone is a Fortitude save instead of a Reflex save.

Electricity: Manifesting a cone of this energy type provides a +2 bonus to the save DC and a +2 bonus on manifester level checks for the purpose of overcoming power resistance.

Fire: A cone of this energy type deals +1 point of damage per die.

Sonic: A cone of this energy type deals -1 point of damage per die and ignores an object&rsquo;s hardness.

This power&rsquo;s subtype is the same as the type of energy you manifest.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by one die (d6). For each extra two dice of damage, this power&rsquo;s save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Conversion',
  'energy-conversion',
  'Psychometabolism [see text]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As energy adaptation, except that instead of radiating away energy as light, you store up the energy and can later discharge it as a ray. To discharge a ray requires a standard action. You can choose to fire any number of rays during the power&rsquo;s duration. The ray you fire must be of one of the energy types you have stored (if you have stored more than one type, you can choose what kind of energy to use for each ray). If a ray successfully strikes its target (requiring a ranged touch attack), the target takes damage equal to the amount of energy damage of that type you have stored, up to a maximum of three times your manifester level. As long as this power remains in effect, you can continue to absorb energy damage and fire additional rays using the stored damage.

This power&rsquo;s subtype is the same as the type of energy you discharge in a ray; thus, its subtype can change during the course of the power&rsquo;s duration.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Current',
  'energy-current',
  'Psychokinesis [see text]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Upon manifesting this power, you choose cold, electricity, fire, or sonic. Your body&rsquo;s psionically fueled bioenergetic currents produce an arc of energy of the chosen type that targets a creature you designate as the primary foe for 9d6 points of damage in every round when the power remains in effect. Energy also arcs off the primary foe to strike one additional foe that is initially within 15 feet of the primary foe, or that subsequently moves within 15 feet of the primary foe while the duration lasts. Secondary foes take half the damage that the primary foe takes in every round while the duration lasts.

Should either the primary or secondary foe fall to less than 0 hit points (or should a target completely evade the effect with a special ability or power), the energy current &rsquo;s arc randomly retargets another primary and/or secondary foe while the duration lasts. Targeted foes can move normally, possibly moving out of range of the effect, but each round they are targeted and remain in range they must make a saving throw to avoid taking full damage in that round.

Concentrating to maintain energy current is a full-round action. If you take damage while maintaining energy current, you must make a successful Concentration check (DC 10 + damage dealt) to avoid losing your concentration on the power.

Cold: A current of this energy type deals +1 point of damage per die. The saving throw to reduce damage from a cold current is a Fortitude save instead of a Reflex save.

Electricity: Manifesting a current of this energy type provides a +2 bonus to the save DC and a +2 bonus on manifester level checks for the purpose of overcoming power resistance.

Fire: A current of this energy type deals +1 point of damage per die.

Sonic: A current of this energy type deals -1 point of damage per die and ignores an object&rsquo;s hardness.

This power&rsquo;s subtype is the same as the type of energy you manifest.

Augment: You can augment this power in one or both of the following ways.

1. For every additional power point you spend, this power&rsquo;s damage increases by one die (d6). For each extra two dice of damage, this power&rsquo;s save DC increases by 1.

2. For every 4 additional power points you spend, this power can affect an additional secondary target. Any additional secondary target cannot be more than 15 feet from another target of the power.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Missile',
  'energy-missile',
  'Psychokinesis [see text]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Upon manifesting this power, you choose cold, electricity, fire, or sonic. You release a powerful missile of energy of the chosen type at your foe. The missile deals 3d6 points of damage to each creature or object you target, to the maximum of five targets. You cannot hit the same target multiple times with the same manifestation of this power.

Cold: A missile of this energy type deals +1 point of damage per die. The saving throw to reduce damage from a cold missile is a Fortitude save instead of a Reflex save.

Electricity: Manifesting a missile of this energy type provides a +2 bonus to the save DC and a +2 bonus on manifester level checks for the purpose of overcoming power resistance.

Fire: A missile of this energy type deals +1 point of damage per die.

Sonic: A missile of this energy type deals -1 point of damage per die and ignores an object&rsquo;s hardness.

This power&rsquo;s subtype is the same as the type of energy you manifest.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by one die (d6) and its save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Push',
  'energy-push',
  'Psychokinetic [see text]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Upon manifesting this power, you choose cold, electricity, fire, or sonic. You project a solid blast of energy of the chosen type at a target, dealing it 2d6 points of damage. In addition, if a subject of up to one size category larger than you fails a Strength check (DC equal to the save DC of this power), the driving force of the energy blast pushes it back 5 feet plus another 5 feet for every 5 points of damage it takes. If a wall or other solid object prevents the subject from being pushed back, the subject instead slams into the object and takes an extra 2d6 points of damage from the impact (no save). The movement caused by energy push does not provoke attacks of opportunity.

Cold: A blast of this energy type deals +1 point of damage per die (damage from impact remains at 2d6 points). The saving throw to reduce damage from a cold push is a Fortitude save instead of a Reflex save.

Electricity: Manifesting a blast of this energy type provides a +2 bonus to the save DC and a +2 bonus on manifester level checks for the purpose of overcoming power resistance.

Fire: A blast of this energy type deals +1 point of damage per die (damage from impact remains at 2d6 points).

Sonic: A blast of this energy type deals -1 point of damage per die (damage from impact remains at 2d6 points) and ignores an object&rsquo;s hardness.

This power&rsquo;s subtype is the same as the type of energy you manifest.

Augment: For every 2 additional power points you spend, this power&rsquo;s damage increases by one die (d6) and its save DC increases by 1. The damage increase applies to both the initial blast and any damage from impact with an object.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Ray',
  'energy-ray',
  'Psychokinesis [see text]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Upon manifesting this power, you choose cold, electricity, fire, or sonic. You create a ray of energy of the chosen type that shoots forth from your fingertip and strikes a target within range, dealing 1d6 points of damage, if you succeed on a ranged touch attack with the ray.

Cold: A ray of this energy type deals +1 point of damage per die.

Electricity: Manifesting a ray of this energy type provides a +3 bonus on your attack roll if the target is wearing metal armor and a +2 bonus on manifester level checks for the purpose of overcoming power resistance.

Fire: A ray of this energy type deals +1 point of damage per die.

Sonic: A ray of this energy type deals -1 point of damage per die and ignores an object&rsquo;s hardness.

This power&rsquo;s subtype is the same as the type of energy you manifest.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by one die (d6).',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Retort',
  'energy-retort',
  'Psychokinesis [see text]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Upon manifesting this power, you choose cold, electricity, fire, or sonic. You weave a field of potential energy of the chosen type around your body. The first successful attack made against you in each round during the power&rsquo;s duration prompts a response from the field without any effort on your part. The attack may be physical, the effect of a power, or the effect of a spell (including spell-like, supernatural, and extraordinary abilities). An &ldquo;ectoburst&rdquo; discharges from the field, targeting the source of the attack and dealing 4d6 points of damage of the chosen energy type. To be affected, a target must be within close range, you must have line of sight and line of effect to it, and you must be able to identify the source of the attack. The ectoburst is a ranged touch attack made using your base attack bonus plus your key ability modifier for your manifesting class.

Cold: A field of this energy type deals +1 point of damage per die. The saving throw to reduce damage from a cold retort is a Fortitude save instead of a Reflex save.

Electricity: Manifesting a field of this energy type provides a +2 bonus to the save DC and a +2 bonus on manifester level checks for the purpose of overcoming power resistance.

Fire: A field of this energy type deals +1 point of damage per die.

Sonic: A field of this energy type deals -1 point of damage per die and ignores an object&rsquo;s hardness.

This power&rsquo;s subtype is the same as the type of energy you manifest.

Augment: For every additional power point you spend, this power&rsquo;s duration increases by 1 minute.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Stun',
  'energy-stun',
  'Psychokinesis [see text]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Upon manifesting this power, you choose cold, electricity, fire, or sonic. You release a powerful stroke of the chosen energy type that encircles all creatures in the area, dealing 1d6 points of damage to each of them. In addition, any creature that fails its save for half damage must succeed on a Will save or be stunned for 1 round.

Cold: A stroke of this energy type deals +1 point of damage per die. The saving throw to reduce damage from a cold stun is a Fortitude save instead of a Reflex save.

Electricity: Manifesting a stroke of this energy type provides a +2 bonus to the save DC and a +2 bonus on manifester level checks for the purpose of overcoming power resistance.

Fire: A stroke of this energy type deals +1 point of damage per die.

Sonic: A stroke of this energy type deals -1 point of damage per die and ignores an object&rsquo;s hardness.

This power&rsquo;s subtype is the same as the type of energy you manifest.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by one die (d6) and its save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Wall',
  'energy-wall',
  'Metacreativity (Creation) [see text]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Upon manifesting this power, you choose cold, electricity, fire, or sonic. You create an immobile sheet of energy of the chosen type formed out of unstable ectoplasm. One side of the wall, selected by you, sends forth waves of energy, dealing 2d6 points of damage to creatures and objects within 10 feet and 1d6 points of damage to those beyond 10 feet but within 20 feet. In addition, anyone passing though the energy wall takes 2d6 points of damage +1 point per manifester level (maximum +20).

If you manifest the wall so that it appears where creatures are, each creature takes damage as if passing through the wall.

If you manifest this power in the form of a ring of energy, you choose whether the waves of energy radiate inward or outward from the ring.

Cold: A sheet of this energy type deals +1 point of damage per die. The saving throw to reduce damage from a cold wall is a Fortitude save instead of a Reflex save.

Electricity: Manifesting a sheet of this energy type provides a +2 bonus to the save DC and a +2 bonus on manifester level checks for the purpose of overcoming power resistance.

Fire: A sheet of this energy type deals +1 point of damage per die.

Sonic: A sheet of this energy type deals -1 point of damage per die and ignores an object&rsquo;s hardness.

This power&rsquo;s subtype is the same as the type of energy you manifest.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Energy Wave',
  'energy-wave',
  'Psychokinesis [see text]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Upon manifesting this power, you choose cold, electricity, fire, or sonic. You create a flood of energy of the chosen type out of unstable ectoplasm that deals 13d6 points of damage to each creature and object in the area. This power originates at your hand and extends outward in a cone.

Cold: A wave of this energy type deals +1 point of damage per die. The saving throw to reduce damage from a cold wave is a Fortitude save instead of a Reflex save.

Electricity: Manifesting a wave of this energy type provides a +2 bonus to the save DC and a +2 bonus on manifester level checks for the purpose of overcoming power resistance.

Fire: A wave of this energy type deals +1 point of damage per die.

Sonic: A wave of this energy type deals -1 point of damage per die and ignores an object&rsquo;s hardness.

This power&rsquo;s subtype is the same as the type of energy you manifest.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by one die (d6). For each extra two dice of damage, this power&rsquo;s save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Entangling Ectoplasm',
  'entangling-ectoplasm',
  'Metacreativity (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You draw forth a glob of ectoplasmic goo from the Astral Plane and immediately throw it as a ranged touch attack at any creature in range. On a successful hit, the subject is covered in goo and becomes entangled. The goo evaporates at the end of the power&rsquo;s duration.

Augment: For every 2 additional power points you spend, this power can affect a target one size category larger.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Eradicate Invisibility',
  'eradicate-invisibility',
  'Psychokinesis',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You radiate a psychokinetic burst that disrupts and negates all types of invisibility (though this power can&rsquo;t negate the effect of cloud mind). Any creature that fails its save to avoid the effect loses its invisibility.

Creatures that are naturally invisible, such as an invisible stalker, are revealed as a dim outline for 1 round (until the beginning of your next turn) and do not have total concealment during this period.

Augment: For every additional power point you spend, this power&rsquo;s range and the radius of the burst in which it functions both increase by 5 feet.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Escape Detection',
  'escape-detection',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You (plus all your gear and any objects you carry) become difficult to detect by clairsentience powers such as clairvoyant sense, remote viewing, and psionic true seeing. If a clairsentience power or similar effect is attempted against you, the manifester of the power must succeed on a manifester level check (1d20 + manifester level, or caster level if the opponent is not a manifester) against a DC of 13 + your manifester level (maximum +10).',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Ethereal Jaunt, Psionic',
  'ethereal-jaunt-psionic',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the ethereal jaunt spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Etherealness, Psionic',
  'etherealness-psionic',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the etherealness spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Evade Burst',
  'evade-burst',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You throw off a faux ectoplasmic shell, allowing you to slide out of range of a damaging effect. When you manifest this power in conjunction with making a successful Reflex save against an attack that normally deals half damage on a successful save, you instead take no damage.

You can manifest this power with an instant thought, quickly enough to save yourself if you unexpectedly come within range of a dangerous effect. Manifesting this power is an immediate action. You can even manifest this power when it isn&rsquo;t your turn.

Augment: If you spend 4 additional power points, you take only half damage on a failed Reflex save.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Exhalation of the Black Dragon',
  'exhalation-of-the-black-dragon',
  'Psychometabolism [Acid]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You spit forth vitriolic acid, originating from your mouth, at your target. If you succeed on a ranged touch attack, the target takes 3d6 points of acid damage.

Augment: For every 2 additional power points you spend, this power&rsquo;s damage increases by 1d6 points.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Expansion',
  'expansion',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'This power causes instant growth, doubling your height, length, and width and multiplying your weight by 8. This increase changes your size category to the next larger one. You gain a +2 size bonus to Strength, a -2 size penalty to Dexterity (to a minimum effective Dexterity score of 1), a -1 size penalty on attack rolls, and a -1 size penalty to Armor Class due to your increased size.

If your new size is Large or larger, you have a space of at least 10 feet and a natural reach of at least 10 feet. This power doesn&rsquo;t change your speed. If insufficient room is available for the desired growth, you attain the maximum possible size and can make a Strength check (using your increased Strength score) to burst any enclosures in the process. If you fail, you are constrained without harm by the materials enclosing you - you cannot crush yourself to death by increasing your size.

All your equipment, worn or carried, is similarly expanded by this power. Melee and projectile weapons deal more damage.

Other psionic or magical properties are not affected by this power. Any affected item that leaves your possession (including a projectile or thrown weapon) instantly returns to its normal size. This means that thrown weapons deal their normal damage (projectiles deal damage based on the size of the weapon that fired them). Multiple effects that increase size do not stack, which means (among other things) that you can&rsquo;t use a second manifestation of this power to further expand yourself.

Augment: You can augment this power in one or more of the following ways.

1. If you spend 6 additional power points, this power increases your size by two size categories instead of one. You gain a +4 size bonus to Strength, a -4 size penalty to Dexterity (to a minimum effective Dexterity score of 1), a -2 size penalty on attack rolls, and a -2 size penalty to Armor Class due to your increased size.

2. If you spend 6 additional power points, you can manifest this power as a swift action instead of a standard action.

3. If you spend 2 additional power points, this power&rsquo;s duration is 10 minutes per level rather than 1 round per level.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Fabricate, Psionic',
  'fabricate-psionic',
  'Metacreativity (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the fabricate spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Fabricate, Greater Psionic',
  'fabricate-greater-psionic',
  'Metacreativity (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As psionic fabricate, except ten times as much material is affected by the power.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'False Sensory Input',
  'false-sensory-input',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You have a limited ability to falsify one of the subject&rsquo;s senses. The subject thinks she sees, hears, smells, tastes, or feels something other than what her senses actually report. You can&rsquo;t create a sensation where none exists, nor make the subject completely oblivious to a sensation, but you can replace the specifics of one sensation with different specifics. For instance, you could make a human look like a dwarf (or one human look like another specific human), a closed door look like it is open, a vat of acid smell like rose water, a parrot look like a bookend, stale rations taste like fresh fruit, a light pat feel like a dagger thrust, a scream sound like the howling wind, and so on.

You can switch between senses you falsify round by round. You can&rsquo;t alter the size of an object by more than 50% by using this power. Thus, you couldn&rsquo;t make a castle look like a hovel, but you could make it look like a different castle, or a rough hillock of approximately the same size. If this power is used to distract an enemy manifester who is attempting to use his powers, the enemy must make a Concentration check as if being grappling or pinned.

Because you override a victim&rsquo;s senses, you can fool a victim who is using true seeing or some other method of gathering information, assuming you know that the victim is actively using such an effect and you can maintain concentration.

Augment: For every 2 additional power points you spend, this power can affect an additional target. Any additional target cannot be more than 15 feet from another target of the power.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Far Hand',
  'far-hand',
  'Psychokinesis',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can mentally lift and move an object at will from a distance. As a move action, you can propel the object as far as 15 feet in any direction, though the power ends if the distance between you and the object exceeds the power&rsquo;s range.

Augment: You can augment this power in one or both of the following ways.

1. For every 2 additional power points you spend, this power&rsquo;s range increases by 5 feet.

2. For every additional power point you spend, the weight limit of the target increases by 2 pounds.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Fate Link',
  'fate-link',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You temporarily link the fates of any two creatures, if both fail their saving throws. If either linked creature experiences pain, both feel it. When one loses hit points, the other loses the same amount. If one takes nonlethal damage, so does the other. If one creature is subjected to an effect to which it is immune (such as a type of energy damage), the linked creature is not subjected to it either. If one dies, the other must immediately succeed on a Fortitude save against this power&rsquo;s save DC or gain two negative levels.

No other effects are transferred by the fate link.

Augment: For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Fate of One',
  'fate-of-one',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your limited omniscience allows you to reroll a saving throw, attack roll, or skill check. Whatever the result of the reroll, you must use it even if it is worse than the original roll.

You can manifest this power instantly, quickly enough to gain its benefits in an emergency. Manifesting this power is an immediate action. If you use the power to reroll a saving throw, you can manifest this power even when it is not your turn.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Feat Leech',
  'feat-leech',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can use another&rsquo;s psionic or metapsionic feats for yourself. You make a melee touch attack against a target. If successful, you immediately are familiar with the target&rsquo;s psionic and metapsionic feats, if any, and you can choose a number of these feats to &ldquo;leech&rdquo; equal to your Wisdom modifier (minimum one).

While the power lasts, you are treated as if you possessed the stolen feats, despite the fact that you have more feats than normally allowed. During this same period, the target can make no use of the stolen feats. When the power&rsquo;s duration expires, you lose access to the feats, and the target gains immediate use of them. This transfer occurs regardless of the distance between you and the target.

If the duration of feat leech is extended by the use of a metapsionic feat, the target gains a Will saving throw every 10 minutes beyond the normal duration. If this save succeeds, the power&rsquo;s duration ends. If the target is killed before the duration expires, you immediately lose the benefit of the stolen feats.

You cannot steal a feat for which you do not meet the prerequisites, if any. However, you can use a stolen feat as the prerequisite for another stolen feat.

Augment: For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Fiery Discorporation',
  'fiery-discorporation',
  'Psychokinesis [Fire]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You use your mastery of energy to cheat death. If you are within 30 feet of an open flame, you can use this power. Any damage that would reduce you to 0 hit points or lower instead has a chance to discorporate you. You attempt a Will save (DC 5 + damage dealt); if it succeeds, you simply break apart into dozens of flitting tongues of flame and vanish, along with all your gear and anything you are holding or carrying.

One day later, you reappear adjacent to an open flame nearest to the place where you discorporated, seeming to materialize from the fire (you choose where you appear along the perimeter of that open flame). While discorporated, you do not exist - you can do nothing, nor can any of your enemies do anything to you.

Augment: For every 3 additional power points you spend, you gain a +1 bonus on your Will save to determine whether you discorporate.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Fission',
  'fission',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can divide yourself, creating a duplicate that comes into existence 5 feet away. Your duplicate thinks and acts exactly as you do and follows your orders, although it will not do anything you wouldn&rsquo;t do yourself. Your duplicate has all your abilities but none of your psionic or magical equipment (it does possess a duplicate of all your mundane equipment, clothing, armor, and implements, as well as mundane versions of any psionic or magical equipment you have). You and your duplicate evenly split your power points, your remaining usages of pertinent special abilities for the day, and so on. You retain your psionic focus, if you maintain such when this power is manifested. Treat your duplicate as yourself with two negative levels for the purpose of determining the powers to which the duplicate has access (while the duration of this power lasts, those negative levels
cannot be removed by any means). Your duplicate has all other physical traits you had at the time you manifest this power. Powers, spells, or other effects affecting you when you manifest this power do not transfer to your duplicate.

When the duration expires or when you dismiss the power, you and your duplicate rejoin, no matter how far from each other you are. You gain back any power points the duplicate has not spent. At the time of rejoining, you take half of the damage your duplicate has taken since this power was manifested. This damage could potentially leave you with negative hit points, but it can&rsquo;t reduce your hit points to less than -9.

If your duplicate dies before the duration expires, no rejoining occurs, and you gain one negative level. If you die, your duplicate remains in existence, and is for all intents you, but with two negative levels. (Once the duration expires, one of the negative levels immediately converts to one lost level; the other negative level can be removed by standard means.)

You can have only one fissioned duplicate in existence at one time; your duplicate cannot use this power. You cannot use fusion or metaconcert with a duplicate, or share any other power or effect that pools abilities (the sum of you and you is still just you). Similarly, attempting to use powers such as claws of the vampire or vampiric blade to hurt your duplicate only damages your duplicate; these powers do not heal you. Empathic transfer and similar powers are likewise ineffective (transferring wounds to yourself isn&rsquo;t a good healing strategy).

All powers affecting a fissioned creature, either the original or the duplicate, end when the fission ends. All damage, including hit point damage, ability damage, ability drain, and ability burn damage, is added together.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Float',
  'float',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You mentally support yourself in water or similar liquid. You can swim at a speed of 10 feet using the power alone, or use it to boost your swim speed by 10 feet.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Fly, Psionic',
  'fly-psionic',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the fly spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Force Screen',
  'force-screen',
  'Psychokinesis [Force]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You create an invisible mobile disk of force that hovers in front of you. The force screen provides a +4 shield bonus to Armor Class (which applies against incorporeal touch attacks, since the force screen is a force effect). Since it hovers in front of you, the effect has no armor check penalty associated with it.

Augment: For every 4 additional power points you spend, the shield bonus to Armor Class improves by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Form of Doom',
  'form-of-doom',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You wrench from your subconscious a terrifying visage of deadly hunger and become one with it. You are transformed into a nightmarish version of yourself, complete with an ooze-sleek skin coating, lashing tentacles, and a fright-inducing countenance. You effectively gain a +10 bonus on Disguise checks, though you retain your basic shape and can continue to use your equipment. This power cannot be used to impersonate someone; while horrible, your form is recognizably your own.

You gain the frightful presence extraordinary ability, which takes effect automatically when you charge a foe. Opponents within 30 feet of you that have fewer Hit Dice or levels than you and that witness your charge become shaken for 5d6 rounds if they fail a Will save (DC 16 + your Cha modifier). An opponent that succeeds on the saving throw is immune to your frightful presence for 24 hours. Frightful presence is a mind-affecting fear effect.

Your horrific form grants you a natural armor bonus of +5, damage reduction 5/-, and a +4 bonus to your Strength score. In addition, you gain +10 feet to your land speed as well as a +10 bonus on Climb and Jump checks.

A nest of violently flailing black tentacles sprout from your hair and back. You can make up to four additional attacks with these tentacles in addition to your regular melee attacks in each round that you take a full attack action. You can make tentacle attacks within the space you normally threaten. If you make your tentacle attacks in addition to you regular melee attacks, each tentacle attacks at your highest base attack bonus with a -5 penalty. If you forgo all your other attacks, making only tentacle attacks, you make your tentacle attacks at your highest base attack bonus with no penalty. These tentacles deal 2d8 points of damage plus one-half your Strength bonus on each successful strike.

This power functions only while you inhabit your base form (for instance, you can&rsquo;t be metamorphed or polymorphed into another form, though you can use, claws of the beast, and bite of the wolf in conjunction with this power for your regular attacks), and while your mind resides within your own body.

Augment: For every additional power point you spend, this power&rsquo;s duration increases by 2 rounds.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Freedom of Movement, Psionic',
  'freedom-of-movement-psionic',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the freedom of movement spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Fuse Flesh',
  'fuse-flesh',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You cause the touched subject&rsquo;s flesh to ripple, grow together, and fuse into a nearly seamless whole. The subject is forced into a fetal position (if humanoid), with only the vaguest outline of its folded arms and legs visible below the all-encompassing wave of flesh. The subject retains the ability to breathe, eat, and excrete, but may lose the use of its senses (see below). If the sudden transformation would prove fatal to the creature (such as fusing a swimming airbreathing subject, or a flying subject), the subject gets a +4 bonus on the save. Unless it loses the use of its senses (see below), the creature can still perform purely mental actions, such as manifesting powers.

If the target fails its Fortitude save to avoid the power&rsquo;s effect, the subject must immediately attempt a second Fortitude save. If this second save is failed, the creature&rsquo;s eyes and ears fuse over, effectively blinding and deafening it. Moreover, it loses its extraordinary, supernatural, and spell-like abilities, as well as its ability to manifest powers (if any), and is generally in sorry shape.

Incorporeal or gaseous creatures and creatures not composed of flesh are immune to fuse flesh, and a shapechanger can revert to its unfused form as a standard action.

Augment: For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Fusion',
  'fusion',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You and another willing, corporeal, living creature of the same or smaller size fuse into one being. As the manifester, you control the actions of the fused being. However, you can give up this control to the other creature. Once you give up control, you cannot regain it unless the other creature relinquishes it.

The fused being has your current hit points plus the other creature&rsquo;s current hit points. The fused being knows all the powers you and the other creature know, has the sum of your and the other creature&rsquo;s power points, and knows or has prepared any spells you or the other creature possesses (if any). Likewise, all feats, racial abilities, and class features are pooled (if both creatures have the same ability, the fused being gains it only once). For each of the six ability scores, the fused being&rsquo;s score is the higher of yours and the other creature&rsquo;s, and the fused being also has the higher Hit Dice or manifester level - this effectively means the fused being uses the better saving throws, attack bonus, and skill modifiers of either member, and it manifests powers at the higher of the manifester levels that you or the other creature possessed before becoming fused.

You decide what equipment is absorbed into the fused being and what equipment remains available for use. These fused items are restored once the power ends.

When the power ends, the fused being separates. The other creature appears in an area adjacent to you that you determine. If separation occurs in a cramped space, the other creature is expelled through the Astral Plane, finally coming to rest materially in the nearest empty space and taking 1d6 points of damage for each 10 feet of solid material passed through.

Damage taken by the fused being is split evenly between you and the other creature when the power ends. You do not leave the fusion with more hit points than you entered it with, unless you were damaged prior to the fusion and the fused being was subsequently healed. In a like manner, the fused being&rsquo;s remaining power points are split between you and the other creature (you can leave with more points than you entered with, as long as you don&rsquo;t exceed the maximum power points for your level and ability score). Ability damage and negative levels are also split between you and the other creature. (If an odd number of negative levels or ability score reductions must be split, you decide whether you or the other creature receives the additional loss.)

If a fused being is killed, it separates into its constituent creatures, both ofwhich are also dead. You cannot use fission on a fused being.

XP Cost: 50 XP.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Genesis',
  'genesis',
  'Metacreativity (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You create a finite plane with limited access: a demiplane. Demiplanes created by this power are very small, very minor planes. This power works best when manifested while you are on the Astral Plane. Manifestation of this power creates a local density fluctuation that precipitates the creation of a demiplane. At first, the fledgling plane grows in radius at a rate of 1 foot per day to an initial maximum radius of 180 feet as it rapidly draws substance from the surrounding astral ectoplasm. Once the new demiplane reaches its maximum size, it doesn&rsquo;t really stop growing, but its growth rate decreases to only 1 foot per week (approximately a 50-foot increase in radius per year). Once your demiplane is created, you can travel to it using astral caravan, plane shift, or some other power or permanent link that you arrange for
separately.

You determine the environment within the demiplane when you manifest genesis, reflecting most any desire you can visualize. You determine factors such as atmosphere, water, temperature, and the general shape of the terrain. This power cannot create life (including vegetation), nor can it create construction (such as buildings, roads, wells, dungeons, and so forth). You must add these details in some other fashion if you desire. You can&rsquo;t create lingering psionic effects with this power; you have to add those separately, if desired. Similarly, you can&rsquo;t create a demiplane out of esoteric material, such as silver or uranium; you&rsquo;re limited to stone and dirt. You can&rsquo;t manipulate the time trait on your demiplane; its time trait is as the Material Plane. Once your demiplane reaches 180 feet in radius, you can manifest this power again to gradually add another 180 feet of radius to it, and so on.

Antigenesis: If genesis is manifested on the Material Plane, the power takes effect and the demiplane begins to grow at the rate noted above, but it gets no larger than a radius of 1 foot per level. The energies of the new plane are exactly canceled by the energies of the original plane, creating a dead spot like a limited cancer on the original plane. The expanding boundary of the dead spot wipes away all construction, crumbles natural land forms, and evaporates water, leaving behind a uniformly level area of inert dust. Living creatures that pass the boundary of the growing dead spot are not directly affected, but plants can find no sustenance in the dust of the dead spot, water-breathing creatures die quickly when water turns to dust, and mobile animals know enough to leave the area alone. Once the wave of change passes, no special essence remains in the dead spot, and it may be colonized naturally over the course of several years by
bacteria, plants, and animals.

XP Cost: 1,000 XP.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Graft Weapon',
  'graft-weapon',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You attach any melee weapon you can use in one hand - mundane, psionic, or magical - onto the end of one of your arms. The weapon becomes a natural extension of your arm, and that hand blends seamlessly into the shaft, hilt, or head of the weapon. Now that the weapon and you are one, you gain a +1 competence bonus on all attack and damage rolls while using the weapon.

The grafted weapon is considered both a standard weapon and a natural weapon for the purpose of effects that distinguish between either weapon type. For instance, the grafted weapon is treated as a natural weapon for the purpose of delivering a touch attack with a power in conjunction with the weapon attack. As with any power (or spell) melee touch attack made in conjunction with a natural weapon attack, the touch attack effect is not delivered unless the natural weapon strikes normally; on a failed attack, the touch power (or spell) is wasted.

For a psychic warrior under the effect of the claws of the beast power, grafting a weapon means that attacks with this hand deal the base damage of the weapon, instead of the claw upon which a psychic warrior normally relies.

While your hand is grafted to a weapon, you lose the use of that hand and take a -2 penalty on all skill checks requiring the use of hands. Powers that temporarily polymorph or metamorph you can ignore the grafted weapon or alter it normally, at your discretion. If the weapon takes damage, you take damage as well. If you are healed, so is your grafted weapon. If your weapon is destroyed, you permanently lose 2 points of Constitution; the ability drain persists until you can restore your natural anatomy (by means of regenerate or a similar effect).

When this power&rsquo;s duration expires, the grafted weapon falls to the ground and your hand returns.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Grease, Psionic',
  'grease-psionic',
  'Metacreativity (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the grease spell, except as noted here.

Sometimes this power is referred to as ectoplasmic sheen.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Grip of Iron',
  'grip-of-iron',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can improve your chances in a grapple as an immediate action, gaining a +4 enhancement bonus on your grapple checks.

You can manifest this power with an instant thought, quickly enough to gain the benefit of the power in the current round. Manifesting this power is an immediate action. You can manifest this power when it isn&rsquo;t your turn (if you are grappled).

Augment: For every 4 additional power points you spend, the enhancement bonus on your grapple checks increases by 2.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Hail of Crystals',
  'hail-of-crystals',
  'Metacreativity (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'A tiny ectoplasmic crystal emanates from your outstretched hand and rapidly expands to a 2-foot-diameter ball of crystal as it speeds toward the location you designate. You can choose to aim this crystal at a single target or at a specific point in space (a grid intersection).

If you aim the crystal at a single target, you must make a ranged touch attack to strike the target. Any creature or object struck by the ball of crystal takes 5d4 points of bludgeoning damage.

Whether the crystal hits its target, misses, or was aimed at a point in space, it explodes upon arrival at the location you designated. Anyone within 20 feet of the explosion takes 9d4 points of slashing damage from the thousands of crystal shards that spray forth.

Augment: For every additional power point you spend, this power&rsquo;s damage from the explosion of the crystal increases by 1d4 points.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Hammer',
  'hammer',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'None',
  'Yes',
  'This power charges your touch with the force of a sledgehammer. A successful melee touch attack deals 1d8 points of bludgeoning damage. This damage is not increased or decreased by your Strength modifier.

Augment: For every additional power point you spend, this power&rsquo;s duration increases by 1 round.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Hustle',
  'hustle',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You gain an additional move action in the current round. Taking a full round&rsquo;s worth of attacks and then using this power to move away from your foe does provoke attacks of opportunity.

You can manifest this power with an instant thought, quickly enough to gain the benefit of the power before you move. Manifesting the power is a swift action, like manifesting a quickened power, and it counts toward the normal limit of one quickened power per round. You cannot manifest this power when it isn&rsquo;t your turn.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Hypercognition',
  'hypercognition',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You make lightning-fast deductions based on only the slightest clue, pattern, or scrap of memory resident in your mind. You can make reasonable statements about a person, place, or object, seemingly from very little knowledge. However, your knowledge is in fact the result of a rigorously logical process that you force your mind to undertake, digging up and correlating every possible piece of knowledge bearing on the topic (possibly even extracting echoes of knowledge from the Astral Plane).

The nature of the knowledge you gain concerning the subject of your analysis might include the answer to a riddle, the way out of a maze, stray bits of information about a person, legends about a place or an object, or even a conclusion concerning a dilemma that your conscious mind is unable to arrive at.

An Intelligence check may be required to obtain the desired information. If so, you can manifest hypercognition as an immediate action prior to making the check and receive a +20 bonus for doing so.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Id Insinuation',
  'id-insinuation',
  'Telepathy (Compulsion) [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the confusion spell, except as noted here.

Swift tendrils of thought disrupt the unconscious mind of any one creature, sapping its might. As long as the manifester remains concentrating fully on this power, the subject is confused, making it unable to independently determine it will do. Roll on the following table at the beginning of each of the subject&rsquo;s turns to see what the subject does in that round.

Augment: For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1, and the power can affect an additional target. Any additional target cannot be more than 15 feet from another target of the power.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Identify, Psionic',
  'identify-psionic',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the identify spell, except as noted here.

This power is used to identify the abilities of psionic items.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Immovability',
  'immovability',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You are almost impossible to move. Your weight does not vary; instead, you mentally attach yourself to the underlying fabric of the plane. Thus, you could conceivably anchor yourself in midair. Any creature attempting to physically move you must succeed on an opposed Strength check, and you gain a +20 bonus on the check. You can&rsquo;t voluntarily move to a new location unless you stop concentrating, which ends the power.

You cannot apply your Dexterity bonus to Armor Class; however, your anchored body gains damage reduction 15/-.

You cannot make physical attacks or perform any other large-scale movements (you can make smallscale movements, such as breathing, turning your head, moving your eyes, talking, and so on). Powers with the teleportation descriptor, or any telekinetic effect, manifested on you automatically fail.

Augment: If you spend 8 additional power points, you can manifest this power as an immediate action.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Incarnate',
  'incarnate',
  'Metacreativity',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'This power makes certain other powers permanent. Depending on the power to be affected, you must be of a minimum manifester level and must expend a number of XP.

You can make the following powers permanent only in regard to yourself.

You manifest the desired power and then follow it with the incarnate manifestation.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Inertial Armor',
  'inertial-armor',
  'Psychokinesis',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your mind generates a tangible field of force that provides a +4 armor bonus to Armor Class. Unlike mundane armor, inertial armor entails no armor check penalty or speed reduction. Because inertial armor is composed of psychokinetic force, incorporeal creatures can&rsquo;t bypass it the way they do normal armor.

Your inertial armor can be invisible or can appear as a colored glow, at your option.

The armor bonus provided by inertial armor does not stack with the armor bonus provided by regular armor.

Augment: For every 2 additional power points you spend, the armor bonus to Armor Class increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Inertial Barrier',
  'inertial-barrier',
  'Psychokinesis',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You create a skin-tight psychokinetic barrier around yourself that resists blows, cuts, stabs, and slashes, as well as providing some protection against falling. You gain damage reduction 5/-. Inertial barrier also absorbs half the damage you take from any fall.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Inflict Pain',
  'inflict-pain',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You telepathically stab the mind of your foe, causing horrible agony. The subject suffers wracking pain that imposes a -4 penalty on attack rolls, skill checks, and ability checks. If the target makes its save, it takes only a -2 penalty.

Augment: For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1, and the power can affect an additional target. Any additional target cannot be more than 15 feet from another target of the power.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Insanity',
  'insanity',
  'Telepathy (Compulsion) [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the confusion spell, except as noted here.

Creatures affected by this power are permanently confused and constantly behave randomly. Roll on the following table at the beginning the subject&rsquo;s turn each round to see what the subject does in that round.

Only psychic chirurgery, reality revision, and other similarly extreme measures can restore the subject&rsquo;s sanity.

Augment: For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1, and the power can affect an additional target. Any additional target cannot be more than 15 feet from another target of the power.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Intellect Fortress',
  'intellect-fortress',
  'Psychokinesis',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You encase yourself and your allies in a shimmering fortress of telekinetic force. All damage from powers and psi-like abilities taken by subjects inside the area of the intellect fortress, including ability damage, is halved. This lowering takes place prior to the effects of other powers or abilities that lessen damage, such as damage reduction and evasion.

Powers that are not subject to power resistance are not affected by an intellect fortress.

You can manifest this power instantly, quickly enough to gain its benefits in an emergency. Manifesting the power is an immediate action. You can use this power even when it&rsquo;s not your turn.

Augment: For every additional power point you spend, this power&rsquo;s duration increases by 1 round.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Iron Body, Psionic',
  'iron-body-psionic',
  'Metacreativity (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the iron body spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Keen Edge, Psionic',
  'keen-edge-psionic',
  'Metacreativity',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the keen edge spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Knock, Psionic',
  'knock-psionic',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the knock spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Know Direction and Location',
  'know-direction-and-location',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You generally know where you are. This power is useful to characters who end up at unfamiliar destinations after teleporting, using a gate, or traveling to or from other planes of existence. The power reveals general information about your location as a feeling or presentiment. The information is usually no more detailed than a summary that locates you according to a prominent local or regional site. Using this power also tells you what direction you are facing.

Using this power prior to making a Knowledge (the planes) check with astral caravan grants a +2 bonus on the check.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Leech Field',
  'leech-field',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You raise a field of potentiality that drains the vitality from powers that you successfully save against. When you succeed on a saving throw to negate the effect of a foe&rsquo;s power on you, and the power is one that leech field is effective against (see below), your body erupts in a brief flash of crackling dark energy. You gain 1 power point for every 2 power points your foe spent to manifest the power you just saved against (to a maximum number of points equal to your manifester level). You cannot gain power points that would cause you to exceed your normal daily maximum.

This power is effective against any power that targets a single creature and allows the target a saving throw to negate it, except those that are delivered by a touch attack or a ranged touch attack (including a ray).

Augment: For every 2 additional power points you spend, this power&rsquo;s duration increases by 1 minute.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Levitate, Psionic',
  'levitate-psionic',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the levitate spell, except as noted here.

Special: When a psion, wilder, or a psychic warrior manifests this power, the target is the manifester (not a willing creature or an object).',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Major Creation, Psionic',
  'major-creation-psionic',
  'Metacreativity (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the major creation spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Matter Agitation',
  'matter-agitation',
  'Psychokinesis',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can excite the structure of a nonpsionic, nonmagical object, heating it to the point of combustion over time. The agitation grows more intense in the second and third rounds after you manifest the power, as described below.

1st Round: Readily flammable material (paper, dry grass, tinder, torches) ignites. Skin reddens (1 point of damage).

2nd Round: Wood smolders and smokes, metal becomes hot to the touch, skin blisters (1d4 points of damage), hair smolders, paint shrivels, water boils.

3rd and Subsequent Rounds: Wood ignites, metal scorches (1d4 points of damage for those holding metallic objects). Skin burns and hair ignites (1d6 points of damage), lead melts.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Matter Manipulation',
  'matter-manipulation',
  'Metacreativity',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can weaken or strengthen the substance of an object or structure. You can affect both mundane and magical inanimate material. Weakening an object&rsquo;s substance decreases its hardness and hit points, and strengthening it increases its hardness and hit points. You can increase or decrease an object&rsquo;s hardness by up to 5 from its original hardness. When hardness increases, the object (or portion of an object) gains 3 hit points per inch of thickness for every point of increased hardness. When hardness decreases, the object (or portion of an object) loses 2 hit points per inch of thickness for every point of decreased hardness (to a minimum of 1 hit point per inch of thickness).

You can&rsquo;t decrease the hardness of an object that already has hardness 0.

Working Manipulated Metals: An object or portion thereof whose hardness is decreased or increased is permanently changed. Even hardening adamantine to 25 is possible. You can also harden or weaken a preforged weapon, a suit of armor, or some other finished item.

XP Cost: 250 XP for each point by which the object&rsquo;s hardness is altered.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Mental Barrier',
  'mental-barrier',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You project a field of improbability around yourself, creating a fleeting protective shell. You gain a +4 deflection bonus to Armor Class.

You can manifest this power instantly, quickly enough to gain its benefits in an emergency. Manifesting the power is an immediate action. You can use this power even when it&rsquo;s not your turn; however, you must manifest it prior to an opponent&rsquo;s attack roll in order to gain this power&rsquo;s benefit against that attack.

Augment: You can augment this power in one or both of the following ways.

1. If you spend 4 additional power points, the deflection bonus to Armor Class increases by 1.

2. For every additional power point you spend, this power&rsquo;s duration increases by 1 round.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Mental Disruption',
  'mental-disruption',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You generate a mental wave of confusion that instantly sweeps out from your location. All creatures you designate in the affected area (you can choose certain creatures to be unaffected) must make a Will save or become dazed for 1 round.

Augment: You can augment this power in one or both of the following ways.

1. For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1.

2. For every 2 additional power points you spend, this power&rsquo;s range and the radius of its area both increase by 5 feet.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Metaconcert',
  'metaconcert',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You link your psychic might with other psionic creatures, creating an entity more powerful than the sum of its parts.

When you manifest this power, a number of power points you designate flows from each participant into a collective pool. One individual is chosen as the metaconcert conductor by mutual consent of the other participants (this is usually the manifester, but doesn&rsquo;t have to be). Until the power ends, this conductor directs the efforts of the group. Misty strands of glowing power link the brows of all the participants in a complex and shifting pattern.

All the powers of each participant are known to the mental entity created with metaconcert (which is under the conductor&rsquo;s command). This entity can&rsquo;t take any more actions than a normal individual, but it manifests all its powers more effectively. Each participant contributing to the entity provides a cumulative +1 bonus to save DCs that apply when manifesting a power or using a psi-like ability. Likewise, each individual provides a cumulative +1 bonus when the entity makes its own saving throws in response to powers or psi-like abilities.

If the psionic entity takes ability damage from a psionic attack the total is divided among all the members as determined by the conductor.

If the entity manifests a power that has an XP cost, all the participants pay an equal share (the conductor pays the remainder if the cost can&rsquo;t be divided evenly).

Once linked, the participants must remain within a 20-foot-radius area, and as a group can move at a speed of 10 feet. If a participant moves outside the 20-foot-radius area occupied by the others (whether willingly or involuntarily), that individual drops out of the group, and the power point pool of the metaconcert is instantly recalculated.

All participants who leave before a metaconcert ends or is dismissed reclaim a number of power points equal to the current power point pool divided by the number of members. If the conductor drops out, the power ends. That same number of points is removed from the power point pool.

When a metaconcert ends normally or is dismissed, remaining power points in the pool are divided among all the participants (the conductor receives the remainder if the points can&rsquo;t be divided evenly).

Augment: For every additional power point you spend, this power&rsquo;s duration increases by 1 minute.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Metafaculty',
  'metafaculty',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You elevate your mind to a near-universal consciousness, cogitating countless impressions and predictions involving any creature you have seen before, whether personally or by means of another power such as remote viewing.

This process gives you an uncannily accurate vision of the creature&rsquo;s nature, activities, and whereabouts. When you manifest the power, you learn the following facts about the creature.

Its name, race, alignment, and character class.

A general estimate of its level or Hit Dice: low (5 HD or lower), medium (6 to 11 HD), high (12 to 20 HD), very high (21 HD to 40 HD), or deific (41 HD or higher).

Its location (including place of residence, town, country, world, and plane of existence).

Significant items currently in its possession.

Any significant activities or actions the creature has undertaken in the previous 8 hours, including details such as locales traveled through, the names or races of those the creature fought, spells it cast, items it acquired, and items it left behind (including the location of those items).

A current mental view of the creature, as described in the remote viewing power, which you can maintain for up to 1 minute per level.

Metafaculty can defeat spells, powers, and special abilities such as screen or mind blank (or even a wish spell) that normally obscure clairsentience powers. You can attempt a caster level check (DC 6 + caster level of the creator of the obscuring effect) to defeat these sorts of otherwise impervious defenses.

Metafaculty is defeated by epic powers, epic spells, and epic special abilities that obscure divinations and clairsentience powers.

XP Cost: 1,000.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Metamorphosis',
  'metamorphosis',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You assume the form of a creature of the same type as your normal form, or any other type except construct, elemental, outsider, and undead. The assumed form can have as many Hit Dice as your manifester level, to a maximum of 15.

You can&rsquo;t assume a form smaller than Fine, nor can you assume an incorporeal, ectoplasmic, or gaseous form. You cannot take the form of any creature that has a template. Your type and subtype (if applicable) change to match the new form.

Upon changing, you regain lost hit points as if you had rested for a night (though this healing does not restore ability damage and provide other benefits of resting; and changing back does not heal you further). If you are slain while under the effect of this power, you revert to your original form, though you remain dead. You gain the Strength, Dexterity, and Constitution scores of the new form but retain your own Intelligence, Wisdom, and Charisma scores. You also gain all extraordinary special attacks possessed by the form (such as constrict, improved grab, and poison) but do not gain the extraordinary special qualities possessed by the new form (such as blindsense, fast healing, regeneration, and scent) or any supernatural, psionic, or spell-like abilities.

You retain all supernatural and spell-like special attacks and special qualities of your normal form, except for those requiring a body part that the new form does not have, if any. You keep all extraordinary special attacks and special qualities derived from class levels, but you lose any benefits of the racial traits of your normal form. If you have a template, special abilities it provides are likewise not retained. If the assumed form is capable of speech, you can communicate normally. You retain any manifesting ability you had in your original form.

You acquire the physical qualities of the new form while retaining your own mind. Physical qualities include natural size, mundane movement capabilities (such as burrowing, climbing, walking, swimming, and flight with wings, to a maximum speed of 120 feet for flying or 60 feet for nonflying movement), natural armor bonus, natural weapons (such as claws or a bite), racial bonuses on skill checks, racial bonus feats, and any anatomical qualities (presence or absence of wings, number of extremities, and so forth). A body with extra limbs does not allow you to make more attacks (or more advantageous two-weapon attacks) than normal.

You can freely designate the new form&rsquo;s minor physical qualities (such as hair color, hair texture, and skin color) within the normal ranges for a creature of that type. The new form&rsquo;s significant physical qualities (such as height, weight, and gender) are also under your control, but they must fall within the norms for the new form&rsquo;s species. You are effectively disguised as an average member of the new form&rsquo;s race. If you use this power to create a disguise, you get a +10 bonus on your Disguise check.

When the change occurs, your equipment either remains worn or held by the new form (if it is capable of wearing or holding the item in question) or melds into the new form and becomes nonfunctional. When you revert to your normal form, any objects previously melded into the new form reappear in the same location on your body they previously occupied and are once again functional. Any new items you wore in the assumed form and can&rsquo;t wear in your normal form fall off and land at your feet; any that you could wear in either form or carry in a body part common to both forms (mouth, hands, or the like) at the time of reversion are still held in the same way. Any part of the body or piece of equipment that is separated from the whole reverts to its normal form.

You can also use this power to assume the form of an inanimate object. You gain the object&rsquo;s hardness and retain your own hit points. You can take the shape of almost any simple object you can think of. If you attempt to take the form of a complex object, you must make an appropriate skill check.. If you fail the check, your manifestation of the power does not succeed. Likewise, you cannot take the form of a complex mechanical mechanism unless you have some sort of skill associated with the object. You cannot use this power to assume the form of a psionic item or a magic item, or any object with a hardness of 15 or higher. You also cannot take the form of a psionically animated mechanism or any object formed of ectoplasm.

As an inanimate object, you lose all mobility. You retain your normal senses and your ability to speak. You can manifest a power if you make a Concentration check (DC 20 + power level); however, doing so ends the duration of this power. If you take damage while in the form of an object, your actual body also takes damage (but the object&rsquo;s hardness, if any, protects you).',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Metamorphosis, Greater',
  'metamorphosis-greater',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As metamorphosis, except that this power enables you to assume the form of any single nonunique object or creature (of any type) from Fine to Colossal size. The assumed form cannot have more Hit Dice than your manifester level (to a maximum of 25 HD). Unlike metamorphosis, this power allows incorporeal, ectoplasmic, or gaseous forms to be assumed.

You gain all extraordinary and supernatural abilities (both special attacks and special qualities) of the assumed form, but you lose your own supernatural abilities. You also gain the type of the new form (for example, dragon or magical beast) in place of your own. The new form does not disorient you. Parts of your body or pieces of equipment that are separated from you do not revert to their original form.

You can become just about anything you are familiar with. You can change form once each round as a swift action.

The change takes place either immediately before your regular action or immediately after it, but not during the action.

If you use this power to create a disguise, you get a +10 bonus on your Disguise check.

As an inanimate object, you lose all mobility; however, you retain your ability to manifest powers normally.

XP Cost: 200 XP.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Metaphysical Claw',
  'metaphysical-claw',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'If you have a claw attack (either from an actual natural weapon or from an effect such as claws of the beast) or a bite attack (which could be a natural bite attack or one you gain by means of the power bite of the wolf), you can use this power to provide one of your natural weapons a +1 enhancement bonus on attack rolls and damage rolls.

Augment: If you spend 4 additional power points, this power&rsquo;s duration increases to 1 hour per level.

In addition, for every 4 additional power points you spend, this power improves the natural weapon&rsquo;s enhancement bonus on attack rolls and damage rolls by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Metaphysical Weapon',
  'metaphysical-weapon',
  'Metacreativity',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Metaphysical weapon gives a weapon a +1 enhancement bonus on attack rolls and damage rolls. (An enhancement bonus does not stack with a masterwork weapon&rsquo;s +1 bonus on attack rolls.)

Alternatively, you can affect up to fifty arrows, bolts, or bullets. The projectiles must be of the same type, and they have to be together (such as in the same quiver). Projectiles, but not thrown weapons, lose their enhancement when used. (Treat shuriken as projectiles, rather than thrown weapons, for the purpose of this power.)

You can&rsquo;t manifest this power on most natural weapons, including a psychic warrior&rsquo;s claw strike. This power does work on a weapon brought into being by the graft weapon power.

Augment: If you spend 4 additional power points, this power&rsquo;s duration increases to 1 hour per level.

In addition, for every 4 additional power points you spend, this power improves the weapon&rsquo;s enhancement bonus on attack rolls and damage rolls by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Microcosm',
  'microcosm',
  'Telepathy (Compulsion) [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'This power enables you to warp the consciousness and senses of one or more creatures, sending the victim into a catatonic state. When microcosm is manifested, you can target either a single creature within range or a group of creatures all located within the power&rsquo;s area.

Single Target: If microcosm targets a single creature, that creature&rsquo;s senses are pinched off from the real world if it currently has 100 or fewer hit points. The subject&rsquo;s senses are all completely fabricated from within its own mind, though it may not realize this. In reality, the subject sprawls limply, drooling and mewling, and eventually dies of thirst and starvation without care. The subject lives within its own made-up world until the time of its actual death.

Area Effect: If microcosm is manifested on an area, it sends all affected creatures into a shared catatonia (the world is a construct, but within the world, the victims can interact with each other). It affects only creatures that currently have 30 or fewer hit points, and only up to a total of 300 hit points of such creatures. The power affects creatures with the lowest hit point totals first. (Creatures with negative hit points count as having 0 hit points.)

Manifesting microcosm a second time on an affected creature turns its sensory pathways outward once more. Otherwise, only very potent powers (such as psychic chirurgery or reality revision) or similar effects (such as miracle or wish) can undo the mental crosswiring that this power brings about.

Augment: For every additional power point you spend, the number of individual and group hit points the power can affect increases by 10.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Mind Blank, Personal',
  'mind-blank-personal',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As psionic mind blank (see below), except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Mind Blank, Psionic',
  'mind-blank-psionic',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'The subject is protected from all devices, powers, and spells that detect, influence, or read emotions or thoughts. This power protects against powers with the mind-affecting or scrying descriptors. Psionic mind blank even foils bend reality, limited wish, miracle, reality revision, and wish when they are used in such a way as to affect the subject&rsquo;s mind or to gain information about it (however, metafaculty can pierce the protective quality of psionic mind blank).
In the case of remote viewing or scrying that scans an area the creature is in, the effect works but the creature simply isn&rsquo;t detected. Remote viewing (scrying) attempts that are targeted specifically at the subject do not work at all.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Mind Probe',
  'mind-probe',
  'Telepathy (Charm) [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'All the subject&rsquo;s memories and knowledge are accessible to you, from memories deep below the surface to those still easily called to mind. You can learn the answer to one question per round, to the best of the subject&rsquo;s knowledge. If the subject succeeds on a Will save, it is not required to answer the question; however, making a save does not end the power. You can ask the subject a new question (or the same question) in subsequent rounds for as long as the power&rsquo;s duration persists.

You can probe a sleeping subject and automatically get an answer to your question. If the subject then succeeds on a Will save, it wakes after providing the answer and thereafter can resist answering by making Will saves as described above.

Subjects that do not wish to be probed can attempt to move beyond the power&rsquo;s range, unless they are somehow hindered. You pose the questions telepathically, and the answers to those questions are imparted directly to your mind. You and the subject do not need to speak the same language, though less intelligent creatures may yield up only appropriate visual images in answer to your questions.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Mind Seed',
  'mind-seed',
  'Telepathy (Compulsion) [Evil, Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You impress the totality of your psyche into a subject&rsquo;s subconscious. If successfully implanted, the seed of your mind &ldquo;germinates&rdquo; over the period of one week. During this time, the subject begins to unconsciously take on your mannerisms.

When integration is complete (after one week), the subject becomes you in mind as you were when you manifested the power, but the subject&rsquo;s level is eight lower than your own. (In effect, the subject has received eight negative levels - but these are negative levels that can&rsquo;t be removed.) The subject does not have any of your physical ability scores or equipment, but does have the Intelligence, Wisdom, and Charisma scores you had when you were eight levels lower. The subject also knows the powers you knew when you were eight levels lower.

While the subject is initially your mental duplicate, the two personalities diverge over time. Although the subject starts off with memories of your experiences, it possesses its original &ldquo;soul&rdquo; and physical body and is free to develop its own personality based on its own new experiences. Thus, the subject is not your slave or servant, but instead a nonplayer character in its own right that shares your earlier memories.

Protection from evil or a similar spell or power can prevent you from implanting mind seed, or prevent a seed from germinating while the protective power lasts. Otherwise, a germinating seed can be removed (prior to germination) only by psychic chirurgery, reality revision, or similarly high-level effects. Manifesting mind seed again during the germination period also cleanses the subject&rsquo;s mind.

XP Cost: 3,000 XP.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Mind Switch',
  'mind-switch',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can attempt to take control of a nearby living creature, forcing your mind (and soul) into its body, and its mind into your body. You can target any creature whose Hit Dice are equal to or less than your manifester level.

You possess the target&rsquo;s body and force the creature&rsquo;s mind into your body unless it succeeds on a Will save. You can move your mind back into your own body whenever you desire, which returns the subject&rsquo;s mind to its own body and ends the power. If the manifestation succeeds, your life force occupies the host body, and the host&rsquo;s life force takes over yours.

You can call on rudimentary or instinctive knowledge of the subject creature, but not upon its acquired or learned knowledge (such as skills and feats it possesses). The same is true for the subject in your body. The mind switch brings about the following changes.

You gain the type of your assumed body.

You gain the Strength, Dexterity, and Constitution scores of your assumed body.

You gain the natural armor, natural attacks, movement, and other simple physical characteristics of your assumed body.

You gain the extraordinary special attacks and qualities of your assumed body, but you do not gain supernatural or spell-like abilities.

You gain the possessions and equipment of your assumed body.

You retain your own hit points, saving throws (possibly modified by new ability scores), class abilities, supernatural and spell-like abilities, spells and powers, and skills and feats (although skill checks use your new ability scores, and you may be temporarily unable to use feats whose requirements you do not meet in your new body).

Supernatural abilities that require a certain body part may be unavailable in your new form.

If either body is killed while the power is in effect, the other participant also dies when the power ends. If one participant&rsquo;s body becomes petrified, imprisoned by temporal stasis or imprisonment, or incapacitated in some other way, the other participant will be incapacitated in that way when the power ends.

A targeted dispel psionics (or similar spells or effects) successfully manifested on either participant causes both minds to return to their original bodies.

XP Cost: 100 XP.

Augment: For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Mind Switch, True',
  'mind-switch-true',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As mind switch, except as noted here. You permanently exchange bodies with the subject. Since this power&rsquo;s duration is instantaneous, you cannot be forced to return to your natural body by means of dispel psionics, an antimagic field, or a similar effect. If the subject&rsquo;s body dies while you are in it, you are dead. The subject immediately loses one level, but otherwise survives the experience in your natural body. If your natural body dies while the subject is in it, you immediately lose one level, but you likewise survive the experience in your new body.

Your &ldquo;natural&rdquo; body is always considered to be the last one you switched out of. If you exchange bodies with a chain of multiple subjects, you need worry only about the welfare of the last body you switched with. In other words, if your mind is expelled from your current body, your mind returns to the last body you switched with, not to your original body. Similarly, if your original body dies but you have since switched minds with a second subject, you take no penalty. You lose a level only if the body you inhabited immediately prior to your current body is killed.

XP Cost: 10,000 XP.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Mind Thrust',
  'mind-thrust',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You instantly deliver a massive assault on the thought pathways of any one creature, dealing 1d10 points of damage to it.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by 1d10 points. For each extra 2d10 points of damage, this power&rsquo;s save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Mind Trap',
  'mind-trap',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You set up a trap in your mind against psionic intruders. Anyone who attacks you with a telepathy power immediately loses 1d6 power points. This power&rsquo;s effect does not negate the power that is currently being used against you.

You can manifest this power instantly, quickly enough to gain its benefit in an emergency. Manifesting the power is an immediate action. You can use this power even when it is not your turn.

Augment: For every additional power point you spend, this power&rsquo;s duration increases by 1 round.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Mindlink',
  'mindlink',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You forge a telepathic bond with your target. You can communicate telepathically through the bond even if you do not share a common language. No special power or influence is established as a result of the bond. Once the bond is formed, it works over any distance (although not from one plane to another).

Augment: You can augment this power in one or both of the following ways.

1. If you spend 4 additional power points, you can attempt to create a telepathic bond with a creature that is not willing (Will save negates).

2. For every additional power point you spend, this power can affect an additional target. Any additional target cannot be more than 15 feet from another target of the power.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Mindlink, Thieving',
  'mindlink-thieving',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As mindlink, except that if the target is a psionic character or creature that knows powers, you can temporarily borrow a power of your choice (you are aware of what powers the subject knows, up to the highest level of power you can manifest).

Borrowing the subject&rsquo;s power is a separate standard action that provokes an attack of opportunity. If that attack succeeds, the mental communication provided by this power ends immediately. The borrowed power fades from the subject&rsquo;s awareness and appears within your own. You can now spend power points to manifest the borrowed power just as if it were one of your powers known. You maintain knowledge of the borrowed power until the duration of your thieving mindlink expires, at which time you lose knowledge of the power and the power reappears in the mind of the subject, no matter how far from you the subject is. Even if the subject is slain, you lose knowledge of the borrowed power when this power&rsquo;s duration expires.

Augment: For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Mindwipe',
  'mindwipe',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You partially wipe your victim&rsquo;s mind of past experiences, bestowing two negative levels upon it. If the subject has at least as many negative levels as Hit Dice, it dies. For each negative level it gains, a psionic creature loses knowledge of one power from its highest available level, and a number of power points from its maximum power point total sufficient to manifest that power. The effects of multiple negative levels stack.

If the subject survives, it loses these two negative levels after 1 hour. (No Fortitude save is necessary to avoid gaining the negative level permanently.)

Augment: You can manifest this power in one or both of the following ways.

1. For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1.

2. For every 3 additional power points you spend, this power bestows an additional negative level on the subject.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Minor Creation, Psionic',
  'minor-creation-psionic',
  'Metacreativity (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the minor creation spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Missive',
  'missive',
  'Telepathy [Mind-Affecting, Language-Dependent]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You send a telepathic message of up to ten words to any living creature within range. Missive is strictly a one-way exchange from you to the subject. If you do not share a common language, the subject &ldquo;hears&rdquo; meaningless mental syllables.

Augment: For every 2 additional power points you spend, this power&rsquo;s range increases by 5 feet.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Missive, Mass',
  'missive-mass',
  'Telepathy [Mind-Affecting, Language-Dependent]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You send a telepathic message of up to twenty-five words to all creatures within range. You can include or exclude from this broadcast any creature you can see, as well as any creature that you know or know of. Mass missive is strictly a one-way exchange from you to the subjects. If you do not share a common language, the subjects &ldquo;hear&rdquo; meaningless mental syllables.

Augment: For every 2 additional power points you spend, this power&rsquo;s range increases by 40 feet and its save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Modify Memory, Psionic',
  'modify-memory-psionic',
  'Telepathy (Compulsion) [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the modify memory spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Moment of Prescience, Psionic',
  'moment-of-prescience-psionic',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the moment of prescience spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'My Light',
  'my-light',
  'Psychokinesis [Light]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your eyes beam forth a 20-foot cone of light. You and other creatures can see normally in the light. If you walk into an area filled with psionic or magical darkness, my light goes dark while you stay within that area.

If my light is used in conjunction with elfsight, the cone of light extends out to 40 feet instead of 20 feet.

Augment: If you spend 2 additional power points, you can manifest this power as a swift action.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Null Psionics Field',
  'null-psionics-field',
  'Psychokinesis',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'An invisible barrier surrounds you and moves with you. The space within this barrier is impervious to most psionic effects, including powers, psi-like abilities, and supernatural abilities. Likewise, it prevents the functioning of any psionic items or powers within its confines. A null psionics field suppresses any power or psionic effect used within, brought into, or manifested into its area, but does not negate it. Time spent within a null psionics field counts against a suppressed effect&rsquo;s duration.

Astral constructs and summoned creatures wink out if they enter a null psionics field. They reappear in the same spot once the field goes away. Time spent winked out counts normally against the duration of the power that is maintaining the construct or summoned creature.

Creation powers with instantaneous durations and calling powers are not affected by a null psionics field because the power itself is no longer in effect, only its result.

A normal creature (a normally encountered construct rather than a created one, for instance) can enter the area, as can normal missiles. Furthermore, while a psionic sword does not function psionically within the area, it is still a sword (and a masterwork sword at that). The power has no effect on golems and other constructs that are imbued with magic during their creation process and are thereafter self-supporting (unless they have been summoned or have a limited duration, in which case they are treated like any other summoned creatures). Elementals, corporeal undead, and outsiders are likewise unaffected unless summoned. These creatures&rsquo; spell-like or supernatural abilities, however, may be temporarily nullified by the field.

Dispel psionics does not remove the field. Two or more null psionics fields sharing any of the same space have no effect on each other. Certain powers may be unaffected by null psionics field (see the individual power descriptions). Artifacts and deities are unaffected by mortal power such as this. Should a creature&rsquo;s space extend across the boundary of the area enclosed by the field, any part of the creature that lies outside the effect is unaffected by the field.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Oak Body',
  'oak-body',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'This power transforms your body into living oak, which grants you several advantages.

You gain damage reduction 10/ slashing and a +5 bonus to natural armor that overlaps (does not stack with) any natural armor bonus you may already have. You are immune to ability damage, blindness, deafness, disease, drowning, poison, stunning, and all powers, spells, or attacks that affect your physiology or respiration, because you have no physiology or respiration while this power is in effect.

You take only half damage from cold effects of all kinds. However, you become susceptible to all special attacks that affect wood, and you gain vulnerability to fire.

You gain a +4 enhancement bonus to Strength, but you take a -2 penalty to Dexterity (to a minimum Dexterity score of 1), and your speed is reduced to half normal. You can speak but cannot drink (and thus can&rsquo;t use potions) or play wind instruments. You have an armor check penalty of -4 and an arcane spell failure chance of 25%.

Your unarmed attacks deal damage equal to a club sized for you (1d4 for Small characters, 1d6 for Medium characters), and you are considered armed when making unarmed attacks. When you make a full attack against an object or structure using your unarmed strike, you deal double damage.

Augment: For every additional power point you spend, this power&rsquo;s duration increases by 1 minute.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Object Reading',
  'object-reading',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can learn details of an inanimate object&rsquo;s previous owner. Objects accumulate psychic impressions left by their previous owners, which can be read by use of this power. The amount of information revealed depends on how long you study a particular object.

1st Minute: Last owner&rsquo;s race.

2nd Minute: Last owner&rsquo;s gender.

3rd Minute: Last owner&rsquo;s age.

4th Minute: Last owner&rsquo;s alignment.

5th Minute: How last owner gained and lost the object.

6th+ Minute: Next-to-last owner&rsquo;s race, and so on.

The power always correctly identifies the last owner of the item, and the original owner (if you keep the power active long enough).

There is a 90% chance that this power will successfully identify all other former owners in sequence, but there is a 10% chance that one former owner will be skipped and thus not identified.

This power will not identify casual users as owners. (Anyone who uses an object to attack someone or something is not thereafter considered a casual user.)

An object without any previous owners reveals no information. You can continue to run through a list of previous owners and learn details about them as long as the power&rsquo;s duration lasts. If you use this power additional times on the same object, the information yielded is the same as if you were using the power on the object for the first time.

Augment: For every additional power point you spend, this power&rsquo;s maximum duration increases by 10 minutes.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Overland Flight, Psionic',
  'overland-flight-psionic',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the overland flight spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Painful Strike',
  'painful-strike',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your natural weapons cause additional pain. Each successful attack you make with a natural weapon deals an extra 1d6 points of nonlethal damage to the target.

Augment: If you spend 6 additional power points, you can manifest this power as a swift action.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Personality Parasite',
  'personality-parasite',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You attempt to briefly partition the mind of your foe, calving off a minor personality that is antagonistic to the main personality. The parasitic personality functions with complete autonomy from the main personality. It does not control the body physically, but it can take one standard action each round that is purely mental, such as manifesting a power, in the same turn that the subject takes its normal actions.

The parasitic personality manifests powers using the subject&rsquo;s power point reserve and known powers, but can only manifest powers three or more levels lower than the highest level of power the subject can normally manifest.

The parasitic personality actively attempts to manifest powers that negatively impact the subject, using the highest-level powers possible (so as to deplete the subject&rsquo;s power point reserve), and the most deadly to the subject. You do not have control over what the parasitic personality does, though it always works against the interest of the subject.

Both minds communicate with each other telepathically. If a creature is targeted by a compulsion or charm effect while under the effect of this power, it can make a second saving throw if the first one fails. If both saving throws fail, then this power ends and the creature is affected by the charm or compulsion effect.

The parasitic personality does not gain any advantages if the main personality is subjected to a haste or schism effect.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Phase Door, Psionic',
  'phase-door-psionic',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the phase door spell, except as noted here. This power is subject to dispel psionics.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Plane Shift, Psionic',
  'plane-shift-psionic',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the plane shift spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Power Leech',
  'power-leech',
  'Telepathy (Compulsion) [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your brow erupts with an arc of crackling dark energy that connects with your foe, draining it of 1d6 power points and adding 1 of those points to your reserve (unless that gain would cause you to exceed your maximum).

The drain continues in each round you maintain concentration while the subject of the drain remains in range. If the subject is drained to 0 power points, this power ends.

Concentrating to maintain power leech is a full-round action (you can take no other actions aside from a 5-foot step) instead of a standard action.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Power Resistance',
  'power-resistance',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'The creature gains power resistance equal to 12 + your manifester level.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Precognition',
  'precognition',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Precognition allows your mind to glimpse fragments of potential future events - what you see will probably happen if no one takes action to change it. However, your vision is incomplete, and it makes no real sense until the actual events you glimpsed begin to unfold. That&rsquo;s when everything begins to come together, and you can act, if you act swiftly, on the information you previously received when you manifested this power.

In practice, manifesting this power grants you a &ldquo;precognitive edge.&rdquo; Normally, you can have only a single precognitive edge at one time. You must use your edge within a period of no more than 10 minutes per level, at which time your preknowledge fades and you lose your edge.

You can use your precognitive edge in a variety of ways. Essentially, the edge translates into a +2 insight bonus that you can apply at any time to either an attack roll, a damage roll, a saving throw, or a skill check. You can elect to apply the bonus to the roll after you determine that your unmodified roll is lower than desired.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Precognition, Defensive',
  'precognition-defensive',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your awareness extends a fraction of a second into the future, allowing you to better evade an opponent&rsquo;s blows.

You gain a +1 insight bonus to AC and on all saving throws. If caught in a situation where your Dexterity bonus isn&rsquo;t applied to your Armor Class, this bonus to AC and saving throws does not apply.

Augment: You can augment this power in one or both of the following ways.

1. For every 3 additional power points you spend, the insight bonus gained increases by 1.

2. If you spend 6 additional power points, you can manifest this power as a swift action.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Precognition, Greater',
  'precognition-greater',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As precognition, except as noted here.

You gain a +4 insight bonus instead of a +2 bonus.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Precognition, Offensive',
  'precognition-offensive',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your awareness extends a fraction of a second into the future, allowing you to better land blows against your opponent. You gain a +1 insight bonus on your attack rolls.

Augment: You can augment this power in one or both of the following ways.

1. For every 3 additional power points you spend, the insight bonus gained on your attack rolls increases by 1.

2. If you spend 6 additional power points, you can manifest this power as a swift action.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Prescience, Offensive',
  'prescience-offensive',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your awareness extends a fraction of a second into the future, allowing you to better aim blows against your opponent. You gain a +2 insight bonus on your damage rolls.

Augment: You can augment this power in one or both of the following ways.

1. For every 3 additional power points you spend, the insight bonus gained on your damage rolls increases by 1.

2. If you spend 6 additional power points, you can manifest this power as a swift action.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Prevenom',
  'prevenom',
  'Psychometabolism (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'If you have a claw attack (either from an actual natural weapon or from an effect such as claws of the beast), you can use this power to produce a mild venom that coats one of your claws. On your next successful melee attack, the venom deals 2 points of Constitution damage. A target struck by the poison can make a Fortitude save (DC 10 + 1/2 your manifester level + your key ability modifier) to negate the damage.

Augment: For every 6 additional power points you spend, this power&rsquo;s Constitution damage increases by 2 points.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Prevenom Weapon',
  'prevenom-weapon',
  'Psychometabolism (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As prevenom, except your weapon gains the poison coating as long as it remains in your grip.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Prowess',
  'prowess',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'If an enemy provokes an attack of opportunity from you, you can make the attack even if you&rsquo;ve already taken your allotted number of attacks of opportunity this round (usually one).

You can manifest this power instantly, quickly enough to gain an extra attack of opportunity in the same round. Manifesting this power is an immediate action.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Psionic Blast',
  'psionic-blast',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'The air ripples with the force of your mental attack, which blasts the minds of all creatures in range. Psionic blast stuns all affected creatures for 1 round.

Augment: For every 2 additional power points you spend, the duration of the stun effect increases by 1 round.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Psionic Lion&rsquo;s Charge',
  'psionic-lion-rsquo-s-charge',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You gain the powerful charging ability of a lion. When you charge, you can make a full attack in the same round.

You can manifest this power with an instant thought, quickly enough to gain the benefit of the power as you charge. Manifesting the power is a swift action, like manifesting a quickened power, and it counts toward the normal limit of one quickened power per round. You cannot manifest this power when it isn&rsquo;t your turn.

Augment: For every additional power point you spend, each of your attacks after a charge in the current round gains a circumstance bonus on damage equal to the number of additional points spent.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Psionic Lock',
  'psionic-lock',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'A psionic lock manifested upon a door, chest, or portal psionically locks it. You can freely pass your own lock without affecting it; otherwise, a door or object secured with psionic lock can be opened only by breaking in or by a successful dispel psionics effect. Add +10 to the normal DC to break open a door or portal affected by this power.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Psionic Repair Damage',
  'psionic-repair-damage',
  'Metacreativity',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'When laying your hands upon a construct that has at least 1 hit point remaining, you reknit its structure to repair damage it has taken. The power repairs 3d8 points of damage +1 point per manifester level. Constructs that are immune to psionics or magic cannot be repaired in this fashion.

Augment: For every 2 additional power points you spend, this power repairs an additional 1d8 points of damage.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Psionic Revivify',
  'psionic-revivify',
  'Psychometabolism (Healing) [Good]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Psionic revivify lets a manifester reconnect a corpse&rsquo;s psyche with its body, restoring life to a recently deceased creature. The power must be manifested within 1 round of the victim&rsquo;s death. Before the psyche of the deceased has completely left the body, this power halts its journey while repairing somewhat the damage to the body.

This power functions like the raise dead spell, except that the affected creature receives no level loss, no Constitution loss, and no loss of powers.

The creature has -1 hit points (but is stable) after being restored to life.

XP Cost: 200 XP.

Augment: For every 100 additional experience points that both you and the subject pay, the manifestation of this power can be delayed by 1 additional round.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Psionic Scent',
  'psionic-scent',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You gain an enhanced sense of smell, equivalent to the scent ability of some monsters. This ability allows you to detect approaching enemies, sniff out hidden foes, and track by sense of smell. With the scent ability, you can identify familiar odors just as humanoids do familiar sights.

You can detect opponents within 30 feet by sense of smell. If the opponent is upwind, the range increases to 60 feet; if downwind, it drops to 15 feet. Strong scents, such as smoke or rotting garbage, can be detected at twice the ranges noted above. Overpowering scents, such as skunk musk or troglodyte stench, can be detected at triple normal range.

When you detect a scent, the exact location of the source is not revealed-only its presence somewhere within range. You can take a move action to note the direction of the scent. Whenever you come within 5 feet of the source, you pinpoint the source&rsquo;s location.

If you have the Track feat, you can follow tracks by smell, making a Wisdom (or Survival) check to find or follow a track. The typical DC for a fresh trail is 10 (no matter what kind of surface holds the scent). This DC increases or decreases depending on how strong the quarry&rsquo;s odor is, the number of creatures, and the age of the trail. For each hour that the trail is cold, the DC increases by 2. The ability otherwise follows the rules for the Track feat. If you are tracking with psionic scent, you ignore the effects of surface conditions and poor visibility.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Psychic Chirurgery',
  'psychic-chirurgery',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can repair psychic damage or grant another creature knowledge of powers you know, depending on the version of this power you manifest.

Repair Psychic Damage: You can remove any compulsions and charms affecting the subject. In fact, you can remove any instantaneous or permanent effect caused by a psychic power with psychic chirurgery. Unlike with aura alteration, these effects end or are negated as soon as this power is manifested, with no need for another saving throw.

You can remove all negative levels affecting the subject, regardless of how it lost those levels, restoring it to the highest level it had previously attained. Also, you can restore levels lost to energy drain or a similar effect if the level drain occurred within a number of hours equal to your manifester level.

You can also remove all psionic effects penalizing the subject&rsquo;s ability scores, heal all ability damage, and remove any ability drain affecting the subject. Psychic chirurgery negates all forms of insanity, confusion, the effect of such powers as microcosm, and so on, but it does not restore levels or Constitution points lost due to death.

Transfer Knowledge: If desired, you can use this power to directly transfer knowledge of a power you know to another psionic character. You can give a character knowledge of a power of any level that she can manifest, even if the power is not normally on the character&rsquo;s power list. Knowledge of powers gained through psychic chirurgery does not count toward the maximum number of powers a character can know per level.

XP Cost: Each time you use psychic chirurgery to implant knowledge of a power in another creature, you pay an XP cost equal to 1,000 x the level of the power implanted. If you and the subject are both willing to do so, you can split this cost evenly.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Psychic Crush',
  'psychic-crush',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your will abruptly and brutally crushes the mental essence of any one creature, debilitating its acumen. The target must make a Will save with a +4 bonus or collapse unconscious and dying at -1 hit points. If the target succeeds on the save, it takes 3d6 points of damage.

Augment: For every 2 additional power points you spend, this power&rsquo;s damage increases by 1d6 points.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Psychic Reformation',
  'psychic-reformation',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'When this power is manifested, the subject can choose to spend its most recently gained skill points differently (picking new skills and abandoning old ones if it chooses) and to choose a different feat from the one it selected when advancing from its previous level to its current level.

The subject can also choose to forget powers it acquired when advancing to its current level, replacing them with new ones.

The subject can undo decisions of these sorts that were made at lower levels, if both the subject and the manifester agree to pay the necessary XP before this power is manifested (see below). The subject must abide by the standard rules for selecting skills and feats, and so it cannot take feats for which it doesn&rsquo;t qualify or take crossclass skills as class skills.

XP Cost: This power costs 50 XP to manifest to reformat choices made when the character reached her current level. For each additional previous level into which the revision reaches, the power costs an additional 50 XP. The manifester and subject split all XP costs evenly.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Psychic Vampire',
  'psychic-vampire',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'This power shrouds your hand or a natural weapon you possess with darkness that you can use to drain an opponent&rsquo;s power.

If you manifest this power to affect your hand, the next successful melee touch attack you make (if the victim fails its Fortitude save) drains 2 power points from your foe for every manifester level you have. The drained points simply dissipate. Your touch attack, charged with psionic power, is treated as an armed attack.

If you manifest this power to affect a natural weapon you possess, you must make a successful melee attack with the weapon to gain the power&rsquo;s benefit.

Against a psionic being that has no power points or a nonpsionic foe, your attack instead deals 2 points of Intelligence, Wisdom, or Charisma damage (your choice).',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Psychofeedback',
  'psychofeedback',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can readjust your body to boost one physical ability score at the expense of one or more other scores. Select one ability score you would like to boost, and increase it by the same amount that you decrease one or more other scores. All score decreases are treated as a special form of ability damage, called ability burn, which cannot be magically or psionically healed - it goes away only through natural healing.

You can boost your Strength, Dexterity or Constitution score by an amount equal to your manifester level (or any lesser amount), assuming you can afford to burn your other ability scores to such an extent.

When the duration of this power expires, your ability boost also ends, but your ability burn remains until it is healed naturally.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Quintessence',
  'quintessence',
  'Metacreativity (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You collapse a bit of time from the continuum, forming a 1-ounce dollop of thick, gooey material called quintessence. This substance shimmers like a silver mirror when viewed from some angles but is transparent from other viewpoints. You can smooth a dollop of quintessence around any extremely small object.

Objects sealed within quintessence are protected from the effects of time; in practical terms, they enter a state of stasis. Living flesh with only partial contact with quintessence is also partially pulled out of the time stream (the manifester is immune to this effect). This disruption deals 1 point of damage per round beginning 10 rounds after partial contact occurs.

Quintessence can be manually scraped away from a protected object, freeing it to rejoin the time stream. When you do this, there is a 75% chance that the quintessence evaporates back into the continuum. Otherwise, it coalesces again into a 1-inch-diameter bead, available for later use.

Large quantities of quintessence could theoretically be gathered to preserve large items or structures (or even a complete living creature; if completely immersed, a living creature would not take the damage associated with partial contact). However, psionic characters and creatures are generally loath to do so because accumulations of quintessence weighing 1 pound or more hinder psionic activity within a 5-foot radius of the accumulation: Powers require twice as many power points to manifest, unless the manifester makes a successful DC 16 Will save each time he or she attempts to manifest a power. Also in these circumstances, manifesting a psi-like ability that is usable at will is a full-round action rather than a standard action.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Read Thoughts',
  'read-thoughts',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You know the surface thoughts of the mind of any creature in the area that fails a Will save. A target that succeeds on its save is not affected by this manifestation of the power, even if it leaves the area and then reenters the area before the duration expires.

Creatures of animal intelligence have simple, instinctual thoughts that you can pick up. If you read the thoughts of a creature with an Intelligence of 26 or higher (and at least 10 points higher than your own Intelligence score), you are stunned for 1 round and the power ends. This power does not let you pinpoint the location of an affected mind if you don&rsquo;t have line of sight to the subject.

Each round, you can turn to use this power in a new area. The power can penetrate barriers, but 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt blocks it.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Reality Revision',
  'reality-revision',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As bend reality, but with more farreaching effects. A reality revision can produce any one of the following effects.

Duplicate any psion power of 8th level or lower, provided the power is not prohibited to you.

Duplicate any other power (but not a spell) of 6th level or lower, such as a psychic warrior power.

Duplicate any psion power of 7th level or lower even if it&rsquo;s a power prohibited to you.

Undo the harmful effects of many other powers, such as microcosm, geas/quest, or insanity.

Create a nonpsionic item of up to 25,000 gp in value.

Create a psionic item, or add to the powers of an existing psionic item (see XP cost below).

Grant a creature a +1 inherent bonus to an ability score. Two to five reality revisions manifested in immediate succession can grant a creature a +2 to +5 inherent bonus to an ability score. Inherent bonuses are instantaneous, so they cannot be negated or dispelled. An inherent bonus cannot exceed +5 for a single ability score. Inherent bonuses to a particular ability score do not stack; only the best one applies.

Remove injuries and afflictions. A single reality revision can aid one creature per manifester level, and all subjects are cured of the same kind of affliction.
Reality revision can not restore the experience point loss from manifesting a power or casting a spell, or the level or� Constitution loss from being returned to life by those effects that reduce level or Constitution.

Revive the dead. Reality revision can bring a dead creature back to life by duplicating a resurrection spell. This power can revive a dead creature whose body has been destroyed, but the task takes two manifestations of reality revision, one to recreate the body and another to infuse the body with life again. Reality revision cannot prevent a character who is brought back to life from losing a level.

Transport travelers. This power can lift one creature per manifester level from anywhere on any plane and place those creatures anywhere else on any plane regardless of local conditions. An unwilling target gets a Will save to negate the effect, and power resistance (if any) applies.

Undo misfortune. Reality revision can undo a single recent event. Manifesting the power forces a reroll of any roll made within the last round (including your last turn). Reality reshapes itself to accommodate the new result. The reroll, however, may be as bad as or worse than the original roll. An unwilling target gets a Will save to negate the effect, and power resistance (if any) applies.

You can try to use reality revision to produce more powerful effects than these, but doing so is dangerous. The manifestation may pervert your intent into a literal but undesirable fulfillment or only a partial fulfillment.

Duplicated powers allow saves and power resistance as normal (but save DCs are calculated as though the power is 9th level).

XP Cost: The minimum XP cost for manifesting reality revision is 5,000 XP. When a manifestation duplicates a power that has an XP cost, you must pay 5,000 XP or that cost, whichever is more. When a manifestation creates or improves a psionic item, you must pay twice the normal XP cost for crafting or improving the item, plus an additional 5,000 XP.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Recall Agony',
  'recall-agony',
  'Clairsentience [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'The fabric of time parts to your will, revealing wounds your foe has received in the past (or has yet to receive). That foe takes 2d6 points of damage as the past (or future) impinges briefly on the present.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by 1d6 points. For each extra 2d6 points of damage, this power&rsquo;s save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Recall Death',
  'recall-death',
  'Clairsentience [Death, Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As recall agony, except the wounds revealed by folding the fourth dimension are potentially fatal. If the target fails its Will save. it dies. If the save succeeds, the target instead takes 5d6 points of damage.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Reddopsi',
  'reddopsi',
  'Psychokinesis',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'When you manifest reddopsi, powers targeted against you rebound to affect the original manifester. This effect reverses powers that have only you as a target (except dispel psionics and similar powers or effects). Powers that affect an area and those that produce effects can&rsquo;t be reversed. Reddopsi also can&rsquo;t reverse any power with a range of touch.

Should you rebound a power back against a manifester who also is protected by reddopsi, the power rebounds once more upon you.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Remote View Trap',
  'remote-view-trap',
  'Clairsentience [Electricity]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'When others use clairvoyant sense, remote viewing, or other means of scrying you from afar, your prepared trap gives them a nasty surprise. If the scryer fails its saving throw, you are undetected. Moreover, the would-be observer takes 8d6 points of electricity damage. If the scryer makes its saving throw, it takes only 4d6 points of electricity damage and is able to observe you normally. Either way, you are aware of the attempt to view you, but not of the viewer or the viewer&rsquo;s location. It is possible that you might recognize the quasireal viewpoint of someone using the remote viewing power if you could pierce its invisibility (which is true for remote viewing whether or not you use this power).',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Remote Viewing',
  'remote-viewing',
  'Clairsentience (Scrying; see text)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You send your mind across space and dimensions, forming it into a quasireal viewpoint from which you can see and hear some creature located at any distance from you, even if planar boundaries separate you. If the subject succeeds on a Will save, the remote viewing attempt fails, and you can&rsquo;t attempt to view that creature again for at least 24 hours. The difficulty of the save depends on how well you know the subject and what sort of physical connection (if any) you have to that creature. Furthermore, if the subject is on another plane, it gets a +5 bonus on its Will save.

If the subject fails its Will save, your mind coalesces a quasi-real viewpoint near enough to the subject to see and hear the subject and its immediate surroundings (up 30 feet in all directions away from the subject).

While the remote viewing lasts, your real body remains unmoving and unaware of your actual surroundings. On the other hand, your quasi-real viewpoint is treated in some ways as if it were an invisible ectoplasmic form of yourself, except as follows. This power is of the Scrying subdiscipline, but use the following information in place of the standard scrying sensor. As a quasi-real viewpoint, you can speak (though your voice is whispery).

You may potentially be sensed by the subject of your viewing (subjects who can see or sense invisible or hidden creatures automatically sense you; otherwise you make a Hide check with a +40 bonus to escape detection if immobile, or a +20 bonus if moving). You could be attacked (although if you become subject to dispel psionics, the remote viewing simply ends). If the subject moves, you can attempt to follow it at a speed of 20 feet, though if it gets farther than 30 feet from you (or you move farther than 30 feet from it), the power ends.

You can attempt to manifest one power through your quasi-real viewpoint, but you must make a Concentration check (DC 20 + level of the power you wish to manifest) to succeed. Manifesting (or attempting and failing to manifest) a power immediately ends the remote viewing.

Furthermore, all powers from your quasi-real viewpoint cost twice the usual number of power points (you can&rsquo;t exceed the power point limit set by your manifester level, so you are restricted to manifesting lower-level powers than you otherwise could). Power points you spend as a quasireal viewpoint are drained from your real body.

XP Cost: 20 XP.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Restoration, Psionic',
  'restoration-psionic',
  'Psychometabolism (Healing)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'This power cures all ability damage, and it restores all points drained from a single ability score (your choice if more than one score is drained). It also eliminates any fatigue or exhaustion suffered by the target. Restoration does not restore levels or Constitution points lost due to death.

Restoration can remove negative levels. It can also restore one level to a creature who has had a level drained, if the number of days since the creature lost the level is equal to or less than your manifester level. In such a case, restoration brings the creature up to the minimum number of experience points necessary to advance it to the next higher level, gaining it an additional Hit Die and level benefits accordingly.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Restore Extremity',
  'restore-extremity',
  'Psychometabolism (Healing)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You restore a severed extremity to a creature that has lost a digit, hand, arm, leg, or even its head. This power does not restore life, but it returns a lost extremity to a living or dead creature if the creature is otherwise mostly intact. The original extremity need not be present when this power is manifested; a new extremity is created by the power. If a head is restored to a body, the original head (if not already destroyed) loses all spark of identity, and can be considered so much dead tissue.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Retrieve',
  'retrieve',
  'Psychoportation (Teleportation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You automatically teleport an item you can see within range directly to your hand. If the object is in the possession of an opponent, it comes to your hand if your opponent fails a Will save.

Augment: For every additional power point you spend, the weight limit of the target increases by 10 pounds.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Schism',
  'schism',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your mind splits into two independent parts. Each part functions in complete autonomy, like two characters in one body. Your new &ldquo;second mind&rdquo; does not control your body physically but is free to take one standard action in each round if the action is purely mental (such as manifesting a power) in the same round you take your normal actions.

Your second mind can manifest powers using your power point reserve, but only as if your manifester level were six lower than it is. Your second mind doesn&rsquo;t provoke attacks of opportunity when manifesting a power, because doing so doesn&rsquo;t distract your primary mind.

Your second mind takes its first action on your turn in the round after schism is manifested.

Both your minds communicate with each other telepathically. If you are subject to a compulsion or charm effect while you are of two minds, make a second saving throw if you fail the first. If you fail both, then the schism ends and you are affected normally by the power. If you fail just one, the schism ends immediately, but you are not subject to the compulsion or charm.

Your second mind does not gain any advantages if you are subject to a haste effect, although you gain the overall standard benefits.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Second Chance',
  'second-chance',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You take a hand in influencing the probable outcomes of your immediate environment. You see the many alternative branches that reality could take in the next few seconds, and with this foreknowledge you gain the ability to reroll one attack roll, one saving throw, one ability check, or one skill check each round. You must take the result of the reroll, even if it&rsquo;s worse than the original roll. You do not have to make another roll if satisfied with your original roll.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Sense Link',
  'sense-link',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You perceive what the subject creature perceives using its sight, hearing, taste, or smell. Only one sense is linked, and you cannot switch between senses with the same manifestation.

You make any skill checks involving senses, such as Spot or Listen, as the subject, and only within the subject&rsquo;s field of view. You lose your Dexterity bonus to AC while directly sensing what the subject senses.

Once sense link is manifested, the link persists even if the subject moves out of the range of the original manifestation (but the link does not work across planes). You do not control the subject, nor can you communicate with it by means of this power.

The strength of the subject&rsquo;s linked sense could be enhanced by other powers or items, allowing you the same enhanced sense. You are subject to any gaze attack affecting the subject creature (if you linked vision). If you are blinded or deafened, or suffer some other sensory deprivation, the linked creature functions as an independent sensory organ, and provides you the benefit of the linked sense from its perspective while this power&rsquo;s duration lasts.

Augment: You can augment this power in one or both of the following ways.

1. If you spend 2 additional power points, you can have the subject perceive one of your senses instead of the other way around.

2. If you spend 4 additional power points, you can link to a second sense of the same subject.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Sense Link, Forced',
  'sense-link-forced',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As sense link, except you can use this power on any creature (willing or unwilling), and this power can&rsquo;t be augmented.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Sensitivity to Psychic Impressions',
  'sensitivity-to-psychic-impressions',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You gain historical vision in a given location. Rooms, streets, tunnels, and other discrete locations accumulate psychic impressions left by powerful emotions experienced in a given area. These impressions offer you a picture of the location&rsquo;s past.

The types of events most likely to leave psychic impressions are those that elicited strong emotions: battles and betrayals, marriages and murders, births and great pain, or any other event where one emotion dominates. Everyday occurrences leave no residue for a manifester to detect.

The vision of the event is dreamlike and shadowy. You do not gain special knowledge of those involved in the vision, though you might be able to read large banners or other writing if they are in your language.

Beginning with the most recent significant event at a location and working backward in time, you can sense one distinct event for every 10 minutes you maintain concentration, if any such events exist to be sensed. Your sensitivity extends into the past a maximum number of years equal to 100 x your manifester level.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Sequester, Psionic',
  'sequester-psionic',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the sequester spell, except as noted here.

XP Cost: 75 XP.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Shadow Body',
  'shadow-body',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your body and all your equipment are subsumed by your shadow. As a living shadow, you blend perfectly into any other shadow and vanish in darkness. You appear as an unattached shadow in areas of full light.

You can move at your normal speed, on any surface, including walls and ceilings, as well as across the surfaces of liquids - even up the face of a waterfall.

Your space does not change, so you cannot move into locations you would not normally be able to move into.

While in your shadow body, you gain damage reduction 10/magic and darkvision out to 60 feet. You are immune to extra damage from critical hits, ability damage, disease, drowning, and poison. You take only half damage from acid, electricity, and fire of all kinds.

While affected by this power, you can be detected by powers that read thoughts, life, or presences (including true seeing), or if you make suspicious movements in lighted areas.

You cannot harm anyone physically or manipulate any objects, but you can use your powers normally. Doing so may attract notice, but if you remain in a shadowed area, you get a +15 bonus on your Hide check to remain unnoticed.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Share Pain',
  'share-pain',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'This power creates a psychometabolic connection between you and a willing subject so that some of your wounds are transferred to the subject. You take half damage from all attacks that deal hit point damage to you, and the subject takes the remainder. The amount of damage not taken by you is taken by the subject. If your hit points are reduced by a lowered Constitution score, that reduction is not shared with the subject because it is not a form of hit point damage. When this power ends, subsequent damage is no longer divided between the subject and you, but damage already shared is not reassigned.

If you and the subject move farther away from each other than close range, the power ends.

You can manifest this power on two willing subjects, one of which you designate to share its damage with the other.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Share Pain, Forced',
  'share-pain-forced',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As share pain, except as noted here.

You attempt to force the sharing of your wounds with an unwilling creature, and for less time. If you are immune to the type of damage dealt, or if you convert lethal damage into nonlethal damage, the target takes no damage.

Augment: For every 2 additional power points you spend, this power&rsquo;s save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Shatter Mind Blank',
  'shatter-mind-blank',
  'Telepathy',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'This power can negate a psionic mind blank or a personal mind blank affecting the target. If the target fails its save and does not overcome your attempt with its power resistance, you can shatter the mind blank by making a successful check (1d20 + your manifester level, maximum +20) against a DC equal to 11 + the manifester level of the creator of the mind blank effect. If you succeed, the psionic mind blank or personal mind blank ends, allowing you to affect the target thereafter with mind-affecting powers.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Skate',
  'skate',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You, another willing creature, or an unattended object can slide along solid ground as if on smooth ice. If you manifest skate on yourself or another creature, the subject of the power retains equilibrium by mental desire alone, allowing her to gracefully skate along the ground, turn, or stop suddenly as desired. The skater&rsquo;s land speed increases by 15 feet. (This adjustment is treated as an enhancement bonus.) As with any effect that increases speed, this power affects the subject&rsquo;s maximum jumping distance.

The subject can skate up or down any incline or decline she could normally walk upon without mishap, though skating up an incline reduces the subject&rsquo;s speed to normal, while skating down a decline increases her speed by an additional 15 feet. (This adjustment is treated as a circumstance bonus.)

If you manifest skate on an object, treat the object as having only one-tenth of its normal weight for the purpose of dragging it along the ground.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Solicit Psicrystal',
  'solicit-psicrystal',
  'Telepathy',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your psicrystal takes over the responsibility of maintaining concentration on any single power you have manifested and are concentrating on. While maintaining this concentration, the psicrystal is limited to move actions in each round, as normal. When the duration of solicit psicrystal expires, the power you transferred to the psicrystal ends (even if this would mean that the power ends earlier than normal). If necessary, the psicrystal makes Concentration checks using your Concentration modifier.

You can manifest this power (and transfer the responsibility) with an instant thought, quickly enough to gain the benefit of the power before you take any other actions in a round. Manifesting the power is a swift action, like manifesting a quickened power, and it counts toward the normal limit of one quickened power per round. You cannot manifest this power when it isn&rsquo;t your turn.

Augment: For every additional power point you spend, this power&rsquo;s maximum duration increases by 1 round.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Steadfast Perception',
  'steadfast-perception',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your vision cannot be distracted or misled, granting you immunity to all figments and glamers (such as invisibility). Moreover, your Spot and Search checks receive a +6 enhancement bonus for the duration of this power. This power also grants you another saving throw against someone using false sensory input on you, but you must realize that that power has been used in order to know enough to manifest steadfast perception.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Stomp',
  'stomp',
  'Psychokinesis',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your foot stomp precipitates a psychokinetic shock wave that travels along the ground, toppling creatures and loose objects. The shock wave affects only creatures standing on the ground within the power&rsquo;s area. Creatures that fail their saves are thrown to the ground, become prone, and take 1d4 points of nonlethal damage.

Augment: For every additional power point you spend, this power&rsquo;s nonlethal damage increases by 1d4 points.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Strength of My Enemy',
  'strength-of-my-enemy',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You gain the ability to siphon away your enemy&rsquo;s strength for your own use. One of your natural or manufactured weapons becomes the instrument of your desire, and deals 1 point of Strength damage on each successful hit. You gain that point of Strength as an enhancement bonus to your Strength score. Strength you siphon from different foes is tracked separately - the total siphoned from each individual foe is considered a separate enhancement bonus to your Strength (maximum +8), and you gain only the highest total.

Augment: You can augment this power in one or both of the following ways.

1. For every 3 additional power points you spend, the maximum enhancement bonus you can add to your Strength increases by 2.

2. If you spend 6 additional power points, you can manifest this power as a swift action.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Suggestion, Psionic',
  'suggestion-psionic',
  'Telepathy (Compulsion) [Mind-Affecting, Language-Dependent]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the suggestion spell, except as noted here.

Augment: For every 2 additional power points you spend, this power can affect an additional target. Any additional target cannot be more than 15 feet from another target of the power.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Suspend Life',
  'suspend-life',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can place yourself into a trance so deep that you are almost in suspended animation. Even powers that detect life or thought are incapable of determining that you are alive.

While you are suspended, you are aware of your surroundings. You feel the passage of one day for every year that actually passes. Though on a slower schedule, you grow hungry after a &ldquo;day&rdquo; without food (though a year passes in actuality) and begin to suffer the effects of thirst and starvation as appropriate.

If you take any damage, you come out of your trance 4 rounds later. The trance can also be ended by a successful use of dispel psionics. If you choose to dismiss the power, your trance ends 10 rounds later.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Sustenance',
  'sustenance',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can go without food and water for one day. Each time you manifest this power, your body manufactures sufficient solid and liquid nourishment to satisfy your needs for that time.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Swarm of Crystals',
  'swarm-of-crystals',
  'Metacreativity (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Thousands of tiny crystal shards spray forth in an arc from your hand. These razorlike crystals slice everything in their path. Anyone caught in the cone takes 3d4 points of slashing damage.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by 1d4 points.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Synesthete',
  'synesthete',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You receive one kind of sensory input when a different sense is stimulated. In particular, you can either feel light or feel sound. You can shift your stimulated sense between these two options once per round as a swift action. Your senses continue to work normally as well, unless they are impaired for some reason.

Your face must be uncovered to use this power, because it is the skin of your face that acts as the sensory receiver.

If you are feeling light by absorbing ambient light onto your skin, you have your normal visual abilities (except for darkvision), even if your eyes are closed or you are blinded. If your eyes are working normally, you gain a +4 circumstance bonus on all Spot and Search checks. While feeling light, you are immune to gaze attacks.

If you are feeling sound by absorbing sound onto your skin and your ears are working normally, the expanded audio input provides you with a +4 circumstance bonus on Listen checks.

Psionic or magical displacement effects, invisibility effects, illusions, and other similar effects confuse your synesthete senses just as they would your normal senses.

You can also use this power to see sound if you are deafened, or hear light if you are blinded, thus removing all penalties associated with either condition (though you gain no bonuses for using the power in this way if you are not deafened or blinded).',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Telekinetic Force',
  'telekinetic-force',
  'Psychokinesis [Force]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You move an object by concentrating your mind upon its current location and then the location you desire, creating a sustained force. You can move an object weighing no more than 250 pounds up to 20 feet per round. A creature can negate the effect on an object it possesses with a successful Will save or with power resistance. The weight can be moved across the ground or through the air. This power ends if the object is forced out of range. If you cease concentration, the object falls or stops.

You can drop a weight and pick up another during the power&rsquo;s duration, as long as you don&rsquo;t stop concentrating on maintaining the power. An object can be ally manipulated as if you were moving it with one hand.

If you spend at least 5 rounds concentrating on an unattended object, you can attempt to break or burst it as if making a Strength check, except that you apply your key ability modifier to the check instead of your Strength modifier.

Augment: For every additional power point you spend, the weight limit of the target increases by 25 pounds.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Telekinetic Maneuver',
  'telekinetic-maneuver',
  'Psychokinesis [Force]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can affect a foe by concentrating your mind upon its current status and the status you desire, once per round. You can perform a bull rush, a disarm, a grapple (including a pin), or a trip. Resolve these attempts as normal, except that they don&rsquo;t provoke attacks of opportunity, you use your manifester level in place of your base attack bonus (for disarm and grapple attempts), you use your Intelligence modifier in place of your Strength modifier or Dexterity modifier, and a failed attempt doesn&rsquo;t allow a reactive attempt by the target (such as normally allowed on disarm or trip attempts). No save is allowed
against these attempts, but power resistance applies normally.

Augment: For every 2 additional power points you spend, this power grants a +1 bonus on your checks involving bull rush, disarm, grapple, or trip attempts.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Telekinetic Sphere, Psionic',
  'telekinetic-sphere-psionic',
  'Psychokinesis [Force]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the telekinetic sphere spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Telekinetic Thrust',
  'telekinetic-thrust',
  'Psychokinesis',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can affect one or more objects or creatures by concentrating your mind upon, sending them in a deadly hail at your foes - or simply by hurling your foe! You can hurl one object or creature per manifester level (maximum fifteen separate targets), as long as all are within the power&rsquo;s range and each is no more than 10 feet away from another one. Each object or creature can be hurled a maximum distance of 10 feet per level.

You must succeed on ranged attack rolls (one per creature or object thrown) to hit the target of the hurled items with the items, applying your Intelligence modifier to the attack roll instead of your Dexterity modifier. Hurled weapons deal their standard damage (your Strength bonus does not apply; arrows or bolts deal damage as daggers of their size when used in this manner). Other objects deal damage ranging from 1 point per 25 pounds of weight (for less dangerous objects such as an empty barrel) to 1d6 points per 25 pounds of weight (for hard, dense objects such as a boulder).

Creatures are allowed Will saves (and power resistance) to negate the effect, as are those whose held possessions are targeted by this power.

If you use this power to hurl a creature against a solid surface, it takes damage as if it had fallen 10 feet (1d6 points).

Augment: For every additional power point you spend, the weight limit of the target or targets increases by 25 pounds.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Telempathic Projection',
  'telempathic-projection',
  'Telepathy (Charm) [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You alter the subject&rsquo;s mood, adjusting its attitude toward you by one step in a positive direction. For instance, an unfriendly creature can be made indifferent, or a hostile creature unfriendly. You can grant a +4 bonus on your own (or others&rsquo;) Bluff, Diplomacy, Intimidate, Perform, or Sense Motive checks involving the affected creature.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Teleport, Psionic',
  'teleport-psionic',
  'Psychoportation (Teleportation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the teleport spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Teleport, Psionic Greater',
  'teleport-psionic-greater',
  'Psychoportation (Teleportation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the greater teleport spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Teleportation Circle, Psionic',
  'teleportation-circle-psionic',
  'Psychoportation (Teleportation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the teleportation circle spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Teleport Trigger',
  'teleport-trigger',
  'Psychoportation (Teleportation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You specify a situation that triggers your automatic manifestation of a psionic teleport, taking you to a predetermined location. You must know the psionic teleport power and have sufficient power points to manifest it when the specified situation occurs.

The teleport trigger goes off on the initiative count immediately after the specified situation occurs, even if you are flat-footed or you have already taken your turn in the current round. The specified situation can be described in general terms or specific terms.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Temporal Acceleration',
  'temporal-acceleration',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You enter another time frame, speeding up so greatly that all other creatures seem frozen, though they are actually still moving at normal speed. You are free to act for 1 round of apparent time. You can manifest powers, cast spells, move, or perform other types of actions, subject to the restrictions outlined below.

While your temporal acceleration is in effect, other creatures are invulnerable to your attacks and powers. This means you cannot target a creature with any attack or power. However, a power you manifest that affects an area and has a duration longer than the remaining duration of your temporal acceleration has its normal effect on creatures in the area once this power ends.

You can affect an unattended object but not an object held, carried, or worn by another creature. You are undetectable by any means while your temporal acceleration lasts.

While under the effect of this power, you cannot enter an area protected by a null psionics field or by a power or spell that neutralizes high-level powers or spells. Normal and magical fire, cold, acid, and the like can still harm you.

When your temporal acceleration expires, you resume acting during your current turn in the standard time frame. You are shaken for 1 round upon your return to the standard time frame.

Splintered or partitioned minds within your own mind, such as might be in effect through the use of powers such as schism, are not temporally speeded up, even if your second mind manifested this power (your primary mind gains the benefit, while your second mind remains stuck in the standard time frame).

Manifesting this power is a swift action, like manifesting a quickened power, and it counts toward the normal limit of one quickened power per round. You cannot manifest this power when it isn&rsquo;t your turn.

Augment: For every 4 additional power points you spend, this power&rsquo;s duration (in apparent time) increases by 1 round.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Thicken Skin',
  'thicken-skin',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your skin or natural armor thickens and spreads across your body, providing a +1 enhancement bonus to your Armor Class.

Augment: You can augment this power in one or both of the following ways.

1. For every 3 additional power points you spend, the enhancement bonus increases by 1.

2. If you spend 6 additional power points, you can manifest this power as a swift action.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Thought Shield',
  'thought-shield',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You fortify your mind against intrusions, gaining power resistance 13 against all mind-affecting powers.

You can manifest this power instantly, quickly enough to gain its benefits in an emergency. Manifesting the power is an immediate action. You can use this power even when it&rsquo;s not your turn.

Augment: For every additional power point you spend, this power&rsquo;s duration increases by 1 round, and the power resistance it provides increases by 1 point.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Time Hop',
  'time-hop',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'The subject of the power hops forward in time 1 round for every manifester level you have. In effect, the subject seems to disappear in a shimmer of silver energy, then reappear after the duration of this power expires. The subject reappears in exactly the same orientation and condition as before. From the subject&rsquo;s point of view, no time has passed at all.

In each round of the power&rsquo;s duration, on what would have been the subject&rsquo;s turn, it can attempt a DC 15 Wisdom check. Success allows the subject to return. The subject can act normally on its next turn after this power ends.

If the space from which the subject departed is occupied upon his return to the time stream, he appears in the closest unoccupied space, still in his original orientation. Determine the closest space randomly if necessary.

Augment: You can augment this power in one or both of the following ways.

1. For every 2 additional power points you spend, you can affect a creature of one size category larger, or double the weight of an object to be affected.

2. For every 2 additional power points you spend, this power can affect an additional target. Any additional target cannot be more than 15 feet from another target of the power.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Time Hop, Mass',
  'time-hop-mass',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As time hop, except you can affect any number of willing subjects in range, including yourself. You can choose which creatures are affected by the power. The subjects hop forward in time a number of hours equal to your manifester level, or some shorter number of hours; you decide how many hours the mass time hop lasts when you manifest the power.

Augment: If you spend 6 additional power points, you can manifest this power as an immediate action.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Time Regression',
  'time-regression',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can regress apparent time 1 round into the past. In effect, you &ldquo;replay&rdquo; the previous round of activity. The power regresses time to the point along the time stream just prior to your previous turn, undoing the effects of everyone else&rsquo;s actions in the meantime. Once you have used time regression, only you retain knowledge of what happened during the round that is being replayed; however, you can communicate that knowledge verbally to your companions, if desired. During the round that you live through a second time, you can act on knowledge you previously gained by already living through the immediate future. In all likelihood, you&rsquo;ll probably not choose to manifest time regression during your second pass through the time stream, instead taking completely new actions, but you pay the XP cost all the same.

XP Cost: 1,000 XP.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Timeless Body',
  'timeless-body',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Your body ignores all harmful (and helpful) effects, beginning when you finish manifesting this power and ending at the end of your next turn. While timeless body is in effect, you are invulnerable to all attacks and powers.

This power cannot be quickened.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Tongues, Psionic',
  'tongues-psionic',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the tongues spell, except as noted here. This power does not enable you to speak with creatures immune to mind-affecting powers.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Tornado Blast',
  'tornado-blast',
  'Psychokinesis',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You induce the formation of a slender vortex of fiercely swirling air. When you manifest it, a vortex of air visibly and audibly snakes out from your outstretched hand.

If you want to aim the vortex at a specific creature, you can make a ranged touch attack to strike the creature. If you succeed, direct contact with the vortex deals 8d6 points of damage to the creature (no save).

Regardless of whether your ranged touch attack hits (and even if you forgo the attack), all creatures in the area (including the one possibly damaged by direct contact) are picked up and violently dashed about, dealing 17d6 points of damage to each one. Creatures that make a successful Reflex save take half damage.

After being dashed about, each creature that was affected finds itself situated in a new space 1d4 x 10 feet away from its original space in a random direction. Walls and other barriers can restrict this relocation; in such a case, the creature ends up adjacent to the barrier.

Augment: For every additional power point you spend, this power&rsquo;s area damage (not the damage from direct contact dealt to a specific creature) increases by 1d6 points (to a maximum of 24d6 points). For each extra 2d6 points of damage, this power&rsquo;s save DC increases by 1.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Touchsight',
  'touchsight',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You generate a subtle telekinetic field of mental contact, allowing you to &ldquo;feel&rdquo; your surroundings even in total darkness or when your sight would otherwise be obscured by your physical environment. Your touchsight field emanates from you out to 60 feet. You ignore invisibility, darkness, and concealment, though you must have line of effect to a creature or an object to discern it. You do not need to make Spot or Listen checks to notice creatures; you can detect and pinpoint all creatures within 60 feet. In many circumstances, comparing your regular senses to what you learn with touchsight is enough to tell you the difference between visible, invisible, hiding, and concealed creatures.

Augment: For every 2 additional power points you spend, the radius of your touchsight field increases by 10 feet.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Tower of Iron Will',
  'tower-of-iron-will',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You generate a bastion of thought so strong that it offers protection to you and everyone around you, improving the self-control of all. You and all creatures in the power&rsquo;s area gain power resistance 19 against all mind-affecting powers.

You can manifest this power instantly, quickly enough to gain its benefits in an emergency. Manifesting the power is an immediate action. You can use this power even when it is not your turn.

Augment: For every additional power point you spend, this power&rsquo;s duration increases by 1 round and the power resistance it provides increases by 1 point.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Trace Teleport',
  'trace-teleport',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As detect teleportation, except you can trace the destination of any psionic or magical teleportation made by others within this power&rsquo;s area within the last minute.

You know the direction and distance the individuals traveled and could teleport to the location yourself if you so desired (and if you know the psionic teleport power), as if you had &ldquo;seen casually&rdquo; the location. This power does not grant you any information on the conditions at the other end of the trace beyond the mental coordinates of the location.

Augment: If you spend 2 additional power points, this power&rsquo;s range increases to Medium (100 ft. + 10 ft./level).',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'True Creation',
  'true-creation',
  'Metacreativity (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As psionic major creation, except items created are enduring and cannot be negated by dispelling magic or negating powers. For all intents and purposes, these items are completely real.

XP Cost: 1/5 of the item&rsquo;s gold piece value, or a minimum of 1 XP.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'True Metabolism',
  'true-metabolism',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You are difficult to kill while this power persists. You automatically heal damage at the rate of 10 hit points per round.

This power is not effective against damage from starvation, thirst, or suffocation. Also, attack forms that don&rsquo;t deal hit point damage (for example, most poisons) ignore true metabolism. You can also use this power to regrow lost portions of your body and to reattach severed limbs or body parts, if you do nothing but concentrate on regrowing the lost body part or reattaching the severed limb for the duration of the power. You do not gain the benefits described earlier when you manifest true metabolism for this purpose. You must have a Constitution score to gain any of this power&rsquo;s benefits.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'True Seeing, Psionic',
  'true-seeing-psionic',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As the true seeing spell, except as noted here.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Truevenom',
  'truevenom',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'If you have a claw attack (either from an actual natural weapon or from an effect such as claws of the beast), you can use this power to produce a horrible poison that coats one of your claws. On your next successful melee attack with the claw during the power&rsquo;s duration, the poison deals 1d8 points of Constitution damage immediately and another 1d8 points of Constitution damage 1 minute later. The target of your attack can negate each instance of damage with a Fortitude save.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Truevenom Weapon',
  'truevenom-weapon',
  'Psychometabolism (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As truevenom, except your weapon gains the poison coating as long as it remains in your grip, until the effect is discharged, or until the duration expires, whichever occurs first.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Ubiquitous Vision',
  'ubiquitous-vision',
  'Clairsentience',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You have metaphoric &ldquo;eyes in the back of your head,&rdquo; and on the sides and top as well, granting you benefits in specific situations. In effect, you have a 360-degree sphere of sight, allowing you a perfect view of creatures that might otherwise flank you. Thus, flanking opponents gain no bonus on their attack rolls, and rogues are denied their sneak attack ability because you do not lose your Dexterity bonus (but they may still sneak attack you if you are caught flat-footed). Your Spot and Search checks gain a +4 enhancement bonus. Concurrently, you take a -4 penalty on saves against all gaze attacks during the power&rsquo;s duration.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Ultrablast',
  'ultrablast',
  'Telepathy [Mind-Affecting]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You &ldquo;grumble&rdquo; psychically (which both psionic and nonpsionic creatures can detect), then release a horrid shriek from your subconscious that disrupts the brains of all enemies in the power&rsquo;s area, dealing 13d6 points of damage to each enemy.

Augment: For every additional power point you spend, this power&rsquo;s damage increases by 1d6 points.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Vampiric Blade',
  'vampiric-blade',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As claws of the vampire, except your weapon is affected as long as it remains in your grip or until this power&rsquo;s duration expires.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Vigor',
  'vigor',
  'Psychometabolism',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You suffuse yourself with power, gaining 5 temporary hit points. Using this power again when an earlier manifestation has not expired merely replaces the older temporary hit points (if any remain) with the newer ones.

Augment: For every additional power point you spend, the number of temporary hit points you gain increases by 5.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Wall of Ectoplasm',
  'wall-of-ectoplasm',
  'Metacreativity (Creation)',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You fashion a roiling wall of ectoplasm, imbuing it with solidity. The wall cannot move once it is formed. It is 1 inch thick per four manifester levels and occupies up to one 10-foot square per level. Each 10-foot square of the wall has 10 hit points per inch of thickness and hardness 5. A section of the wall whose hit points drop to 0 is breached. If a creature tries to break through the wall, the DC for the Strength check is 15 + 2 per inch of thickness.

The wall of ectoplasm is susceptible to dispel psionics, but it gains a +4 bonus on any check to determine whether the wall is negated. Spells, powers, and breath weapons cannot pass through the wall in either direction (though they could damage it). It blocks ethereal creatures as well as material creatures (though ethereal creatures can usually get around the wall by floating under or over it through material floors and ceilings). The wall is opaque, so neither vision nor gaze attacks operate through it. The wall does not block psychoportive travel, such as that provided by the psionic teleport power.

You can form the wall into a flat, vertical plane whose area is up to one 10-foot square per level or into a sphere or hemisphere with a radius of up to 1 foot per level.

The wall of ectoplasm must be continuous and unbroken when manifested. If its surface is interrupted by any object or creature, the power fails.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Wall Walker',
  'wall-walker',
  'Psychoportation',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'You can walk on vertical surfaces or even traverse ceilings (you need not make Climb checks to traverse these surfaces). Because of the need to keep at least one foot in contact with the wall or ceiling at all times, you cannot jump or use the run action, and you can move at only half speed.

You retain your Dexterity bonus to Armor Class, if any, and opponents gain no special bonuses against you.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


INSERT INTO public.srd_spells (
  name, slug, school, level, casting_time, range, target, duration, saving_throw, spell_resistance, description, is_psionic, power_points_section
) VALUES (
  'Weapon of Energy',
  'weapon-of-energy',
  'Psychokinesis [see text]',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'As claw of energy, except this power can be manifested on a touched weapon. This power&rsquo;s subtype is the same as the type of energy infused in the touched weapon.',
  true,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  school = EXCLUDED.school,
  level = EXCLUDED.level,
  casting_time = EXCLUDED.casting_time,
  range = EXCLUDED.range,
  target = EXCLUDED.target,
  duration = EXCLUDED.duration,
  saving_throw = EXCLUDED.saving_throw,
  spell_resistance = EXCLUDED.spell_resistance,
  description = EXCLUDED.description,
  is_psionic = EXCLUDED.is_psionic,
  power_points_section = EXCLUDED.power_points_section;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'padded',
    'Padded',
    'armor',
    '5 gp',
    '10 lb.',
    10
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  1,
  8,
  0,
  5
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'leather',
    'Leather',
    'armor',
    '10 gp',
    '15 lb.',
    15
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  2,
  6,
  0,
  10
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'studded-leather',
    'Studded leather',
    'armor',
    '25 gp',
    '20 lb.',
    20
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  3,
  5,
  1,
  15
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'chain-shirt',
    'Chain shirt',
    'armor',
    '100 gp',
    '25 lb.',
    25
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  4,
  4,
  2,
  20
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'hide',
    'Hide',
    'armor',
    '15 gp',
    '25 lb.',
    25
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  3,
  4,
  3,
  20
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'scale-mail',
    'Scale mail',
    'armor',
    '50 gp',
    '30 lb.',
    30
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  4,
  3,
  4,
  25
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'chainmail',
    'Chainmail',
    'armor',
    '150 gp',
    '40 lb.',
    40
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  5,
  2,
  5,
  30
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'breastplate',
    'Breastplate',
    'armor',
    '200 gp',
    '30 lb.',
    30
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  5,
  3,
  4,
  25
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'splint-mail',
    'Splint mail',
    'armor',
    '200 gp',
    '45 lb.',
    45
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  6,
  0,
  7,
  40
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'banded-mail',
    'Banded mail',
    'armor',
    '250 gp',
    '35 lb.',
    35
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  6,
  1,
  6,
  35
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'half-plate',
    'Half-plate',
    'armor',
    '600 gp',
    '50 lb.',
    50
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  7,
  0,
  7,
  40
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'full-plate',
    'Full plate',
    'armor',
    '1,500 gp',
    '50 lb.',
    50
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  8,
  1,
  6,
  35
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'buckler',
    'Buckler',
    'armor',
    '15 gp',
    '5 lb.',
    5
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  1,
  NULL,
  1,
  5
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shield-light-wooden',
    'Shield, light wooden',
    'armor',
    '3 gp',
    '5 lb.',
    5
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  1,
  NULL,
  1,
  5
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shield-light-steel',
    'Shield, light steel',
    'armor',
    '9 gp',
    '6 lb.',
    6
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  1,
  NULL,
  1,
  5
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shield-heavy-wooden',
    'Shield, heavy wooden',
    'armor',
    '7 gp',
    '10 lb.',
    10
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  2,
  NULL,
  2,
  15
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shield-heavy-steel',
    'Shield, heavy steel',
    'armor',
    '20 gp',
    '15 lb.',
    15
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  2,
  NULL,
  2,
  15
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shield-tower',
    'Shield, tower',
    'armor',
    '30 gp',
    '45 lb.',
    45
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  43,
  2,
  10,
  50
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'armor-spikes',
    'Armor spikes',
    'armor',
    '+50 gp',
    '+10 lb.',
    10
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  NULL,
  NULL,
  NULL,
  NULL
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'gauntlet-locked',
    'Gauntlet, locked',
    'armor',
    '8 gp',
    '+5 lb.',
    5
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  NULL,
  NULL,
  NULL,
  4
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shield-spikes',
    'Shield spikes',
    'armor',
    '+10 gp',
    '+5 lb.',
    5
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  NULL,
  NULL,
  NULL,
  NULL
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'padded',
    'Padded',
    'armor',
    '5 gp',
    '10 lb.',
    10
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  1,
  8,
  0,
  5
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'leather',
    'Leather',
    'armor',
    '10 gp',
    '15 lb.',
    15
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  2,
  6,
  0,
  10
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'studded-leather',
    'Studded leather',
    'armor',
    '25 gp',
    '20 lb.',
    20
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  3,
  5,
  82111,
  15
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'chain-shirt',
    'Chain shirt',
    'armor',
    '100 gp',
    '25 lb.',
    25
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  4,
  4,
  82112,
  20
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'hide',
    'Hide',
    'armor',
    '15 gp',
    '25 lb.',
    25
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  3,
  4,
  82113,
  20
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'scale-mail',
    'Scale mail',
    'armor',
    '50 gp',
    '30 lb.',
    30
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  4,
  3,
  82114,
  25
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'chainmail',
    'Chainmail',
    'armor',
    '150 gp',
    '40 lb.',
    40
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  5,
  2,
  82115,
  30
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'breastplate',
    'Breastplate',
    'armor',
    '200 gp',
    '30 lb.',
    30
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  5,
  3,
  82114,
  25
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'splint-mail',
    'Splint mail',
    'armor',
    '200 gp',
    '45 lb.',
    45
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  6,
  0,
  82117,
  40
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'banded-mail',
    'Banded mail',
    'armor',
    '250 gp',
    '35 lb.',
    35
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  6,
  1,
  82116,
  35
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'half-plate',
    'Half-plate',
    'armor',
    '600 gp',
    '50 lb.',
    50
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  7,
  0,
  82117,
  40
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'full-plate',
    'Full plate',
    'armor',
    '1,500 gp',
    '50 lb.',
    50
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  8,
  1,
  82116,
  35
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'buckler',
    'Buckler',
    'armor',
    '15 gp',
    '5 lb.',
    5
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  1,
  NULL,
  82111,
  5
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shield-light-wooden',
    'Shield, light wooden',
    'armor',
    '3 gp',
    '5 lb.',
    5
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  1,
  NULL,
  82111,
  5
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shield-light-steel',
    'Shield, light steel',
    'armor',
    '9 gp',
    '6 lb.',
    6
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  1,
  NULL,
  82111,
  5
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shield-heavy-wooden',
    'Shield, heavy wooden',
    'armor',
    '7 gp',
    '10 lb.',
    10
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  2,
  NULL,
  82112,
  15
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shield-heavy-steel',
    'Shield, heavy steel',
    'armor',
    '20 gp',
    '15 lb.',
    15
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  2,
  NULL,
  82112,
  15
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shield-tower',
    'Shield, tower',
    'armor',
    '30 gp',
    '45 lb.',
    45
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  43,
  2,
  821110,
  50
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'armor-spikes',
    'Armor spikes',
    'armor',
    '+50 gp',
    '+10 lb.',
    10
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  NULL,
  NULL,
  NULL,
  NULL
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'gauntlet-locked',
    'Gauntlet, locked',
    'armor',
    '8 gp',
    '+5 lb.',
    5
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  NULL,
  NULL,
  NULL,
  4
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shield-spikes',
    'Shield spikes',
    'armor',
    '+10 gp',
    '+5 lb.',
    5
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_armors (
  item_id, armor_category, armor_bonus, max_dex_bonus, armor_check_penalty, arcane_spell_failure
)
SELECT
  id,
  'Armor',
  NULL,
  NULL,
  NULL,
  NULL
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  armor_bonus = EXCLUDED.armor_bonus,
  max_dex_bonus = EXCLUDED.max_dex_bonus,
  armor_check_penalty = EXCLUDED.armor_check_penalty,
  arcane_spell_failure = EXCLUDED.arcane_spell_failure;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'unarmed-attacks',
    'Unarmed Attacks',
    'weapon',
    '',
    '',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', ''),
  '20',
  'x2',
  ARRAY['slashing']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'gauntlet',
    'Gauntlet',
    'weapon',
    '2 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d2'),
  '1d3',
  'x2',
  ARRAY['1 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'unarmed-strike',
    'Unarmed strike',
    'weapon',
    '&mdash;',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d23'),
  '1d33',
  'x2',
  ARRAY['&mdash;']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'dagger',
    'Dagger',
    'weapon',
    '2 gp',
    '10 ft.',
    10
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d3'),
  '1d4',
  'x2',
  ARRAY['1 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'dagger-punching',
    'Dagger, punching',
    'weapon',
    '2 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d3'),
  '1d4',
  'x2',
  ARRAY['1 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'gauntlet-spiked',
    'Gauntlet, spiked',
    'weapon',
    '5 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d3'),
  '1d4',
  'x2',
  ARRAY['1 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'mace-light',
    'Mace, light',
    'weapon',
    '5 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['4 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'sickle',
    'Sickle',
    'weapon',
    '6 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'club',
    'Club',
    'weapon',
    '&mdash;',
    '10 ft.',
    10
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['3 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'mace-heavy',
    'Mace, heavy',
    'weapon',
    '12 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '1d8',
  'x2',
  ARRAY['8 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'morningstar',
    'Morningstar',
    'weapon',
    '8 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '1d8',
  'x2',
  ARRAY['6 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shortspear',
    'Shortspear',
    'weapon',
    '1 gp',
    '20 ft.',
    20
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['3 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'longspear4',
    'Longspear4',
    'weapon',
    '5 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '1d8',
  'x2',
  ARRAY['9 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'quarterstaff5',
    'Quarterstaff5',
    'weapon',
    '&mdash;',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4/1d4'),
  '1d6',
  '1d6',
  ARRAY['4 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'spear',
    'Spear',
    'weapon',
    '2 gp',
    '20 ft.',
    20
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '1d8',
  'x2',
  ARRAY['6 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'crossbow-heavy',
    'Crossbow, heavy',
    'weapon',
    '50 gp',
    '120 ft.',
    120
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d8'),
  '1d10',
  'x2',
  ARRAY['8 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'bolts-crossbow-10',
    'Bolts, crossbow (10)',
    'weapon',
    '1 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '&mdash;'),
  '&mdash;',
  'x2',
  ARRAY['1 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'crossbow-light',
    'Crossbow, light',
    'weapon',
    '35 gp',
    '80 ft.',
    80
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '1d8',
  'x2',
  ARRAY['4 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'bolts-crossbow-10',
    'Bolts, crossbow (10)',
    'weapon',
    '1 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '&mdash;'),
  '&mdash;',
  'x2',
  ARRAY['1 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'dart',
    'Dart',
    'weapon',
    '5 sp',
    '20 ft.',
    20
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d3'),
  '1d4',
  'x2',
  ARRAY['1/2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'javelin',
    'Javelin',
    'weapon',
    '1 gp',
    '30 ft.',
    30
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'sling',
    'Sling',
    'weapon',
    '&mdash;',
    '50 ft.',
    50
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d3'),
  '1d4',
  'x2',
  ARRAY['0 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'bullets-sling-10',
    'Bullets, sling (10)',
    'weapon',
    '1 sp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '&mdash;'),
  '&mdash;',
  'x2',
  ARRAY['5 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'axe-throwing',
    'Axe, throwing',
    'weapon',
    '8 gp',
    '10 ft.',
    10
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'hammer-light',
    'Hammer, light',
    'weapon',
    '1 gp',
    '20 ft.',
    20
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d3'),
  '1d4',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'handaxe',
    'Handaxe',
    'weapon',
    '6 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['3 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'kukri',
    'Kukri',
    'weapon',
    '8 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d3'),
  '1d4',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'pick-light',
    'Pick, light',
    'weapon',
    '4 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d3'),
  '1d4',
  'x2',
  ARRAY['3 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'sap',
    'Sap',
    'weapon',
    '1 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d43'),
  '1d63',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shield-light',
    'Shield, light',
    'weapon',
    'special',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d2'),
  '1d3',
  'x2',
  ARRAY['special']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'spiked-armor',
    'Spiked armor',
    'weapon',
    'special',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['special']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'spiked-shield-light',
    'Spiked, shield light',
    'weapon',
    'special',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d3'),
  '1d4',
  'x2',
  ARRAY['special']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'sword-short',
    'Sword short',
    'weapon',
    '10 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'battleaxe',
    'Battleaxe',
    'weapon',
    '10 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '1d8',
  'x2',
  ARRAY['6 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'flail',
    'Flail',
    'weapon',
    '8 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '1d8',
  'x2',
  ARRAY['5 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'longsword',
    'Longsword',
    'weapon',
    '15 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '1d8',
  'x2',
  ARRAY['4 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'pick-heavy',
    'Pick, heavy',
    'weapon',
    '8 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['6 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'rapier',
    'Rapier',
    'weapon',
    '20 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'scimitar',
    'Scimitar',
    'weapon',
    '15 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['4 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shield-heavy',
    'Shield, heavy',
    'weapon',
    'special',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d3'),
  '1d4',
  'x2',
  ARRAY['special']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'spiked-shield-heavy',
    'Spiked shield, heavy',
    'weapon',
    'special',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['special']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'trident',
    'Trident',
    'weapon',
    '15 gp',
    '10 ft.',
    10
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '1d8',
  'x2',
  ARRAY['4 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'warhammer',
    'Warhammer',
    'weapon',
    '12 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '1d8',
  'x2',
  ARRAY['5 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'falchion',
    'Falchion',
    'weapon',
    '75 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '2d4',
  'x2',
  ARRAY['8 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'glaive4',
    'Glaive4',
    'weapon',
    '8 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d8'),
  '1d10',
  'x2',
  ARRAY['10 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'greataxe',
    'Greataxe',
    'weapon',
    '20 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d10'),
  '1d12',
  'x2',
  ARRAY['12 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'greatclub',
    'Greatclub',
    'weapon',
    '5 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d8'),
  '1d10',
  'x2',
  ARRAY['8 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'flail-heavy',
    'Flail, heavy',
    'weapon',
    '15 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d8'),
  '1d10',
  'x2',
  ARRAY['10 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'greatsword',
    'Greatsword',
    'weapon',
    '50 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d10'),
  '2d6',
  'x2',
  ARRAY['8 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'guisarme4',
    'Guisarme4',
    'weapon',
    '9 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '2d4',
  'x2',
  ARRAY['12 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'halberd',
    'Halberd',
    'weapon',
    '10 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d8'),
  '1d10',
  'x2',
  ARRAY['12 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'lance4',
    'Lance4',
    'weapon',
    '10 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '1d8',
  'x2',
  ARRAY['10 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'ranseur4',
    'Ranseur4',
    'weapon',
    '10 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '2d4',
  'x2',
  ARRAY['12 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'scythe',
    'Scythe',
    'weapon',
    '18 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '2d4',
  'x2',
  ARRAY['10 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'longbow',
    'Longbow',
    'weapon',
    '75 gp',
    '100 ft.',
    100
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '1d8',
  'x2',
  ARRAY['3 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'arrows-20',
    'Arrows (20)',
    'weapon',
    '1 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '&mdash;'),
  '&mdash;',
  'x2',
  ARRAY['3 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'longbow-composite',
    'Longbow, composite',
    'weapon',
    '100 gp',
    '110 ft.',
    110
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '1d8',
  'x2',
  ARRAY['3 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'arrows-20',
    'Arrows (20)',
    'weapon',
    '1 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '&mdash;'),
  '&mdash;',
  'x2',
  ARRAY['3 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shortbow',
    'Shortbow',
    'weapon',
    '30 gp',
    '60 ft.',
    60
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'arrows-20',
    'Arrows (20)',
    'weapon',
    '1 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '&mdash;'),
  '&mdash;',
  'x2',
  ARRAY['3 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shortbow-composite',
    'Shortbow, composite',
    'weapon',
    '75 gp',
    '70 ft.',
    70
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'arrows-20',
    'Arrows (20)',
    'weapon',
    '1 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '&mdash;'),
  '&mdash;',
  'x2',
  ARRAY['3 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'kama',
    'Kama',
    'weapon',
    '2 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'nunchaku',
    'Nunchaku',
    'weapon',
    '2 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'sai',
    'Sai',
    'weapon',
    '1 gp',
    '10 ft.',
    10
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d3'),
  '1d4',
  'x2',
  ARRAY['1 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'siangham',
    'Siangham',
    'weapon',
    '3 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d4'),
  '1d6',
  'x2',
  ARRAY['1 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'sword-bastard',
    'Sword, bastard',
    'weapon',
    '35 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d8'),
  '1d10',
  'x2',
  ARRAY['6 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'waraxe-dwarven',
    'Waraxe, dwarven',
    'weapon',
    '30 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d8'),
  '1d10',
  'x2',
  ARRAY['8 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'whip4',
    'Whip4',
    'weapon',
    '1 gp',
    '',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d23'),
  '1d33',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'axe-orc-double5',
    'Axe, orc double5',
    'weapon',
    '60 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6/1d6'),
  '1d8',
  '1d8',
  ARRAY['15 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'chain-spiked4',
    'Chain, spiked4',
    'weapon',
    '25 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '2d4',
  'x2',
  ARRAY['10 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'flail-dire5',
    'Flail, dire5',
    'weapon',
    '90 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6/1d6'),
  '1d8',
  '1d8',
  ARRAY['10 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'hammer-gnome-hooked5',
    'Hammer, gnome hooked5',
    'weapon',
    '20 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6/1d4'),
  '1d8',
  '1d6',
  ARRAY['6 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'sword-two-bladed5',
    'Sword, two-bladed5',
    'weapon',
    '100 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6/1d6'),
  '1d8',
  '1d8',
  ARRAY['10 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'urgrosh-dwarven5',
    'Urgrosh, dwarven5',
    'weapon',
    '50 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6/1d4'),
  '1d8',
  '1d6',
  ARRAY['12 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'bolas',
    'Bolas',
    'weapon',
    '5 gp',
    '10 ft.',
    10
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d33'),
  '1d43',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'crossbow-hand',
    'Crossbow, hand',
    'weapon',
    '100 gp',
    '30 ft.',
    30
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d3'),
  '1d4',
  'x2',
  ARRAY['2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'bolts-10',
    'Bolts (10)',
    'weapon',
    '1 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '&mdash;'),
  '&mdash;',
  'x2',
  ARRAY['1 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'crossbow-repeating-heavy',
    'Crossbow, repeating heavy',
    'weapon',
    '400 gp',
    '120 ft.',
    120
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d8'),
  '1d10',
  'x2',
  ARRAY['12 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'bolts-5',
    'Bolts (5)',
    'weapon',
    '1 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '&mdash;'),
  '&mdash;',
  'x2',
  ARRAY['1 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'crossbow-repeating-light',
    'Crossbow, repeating light',
    'weapon',
    '250 gp',
    '80 ft.',
    80
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1d6'),
  '1d8',
  'x2',
  ARRAY['6 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'bolts-5',
    'Bolts (5)',
    'weapon',
    '1 gp',
    '&mdash;',
    NULL
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '&mdash;'),
  '&mdash;',
  'x2',
  ARRAY['1 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'net',
    'Net',
    'weapon',
    '20 gp',
    '10 ft.',
    10
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '&mdash;'),
  '&mdash;',
  'x2',
  ARRAY['6 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


WITH new_item AS (
  INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
  VALUES (
    'shuriken-5',
    'Shuriken (5)',
    'weapon',
    '1 gp',
    '10 ft.',
    10
  )
  ON CONFLICT (system_slug, slug) DO UPDATE SET
    name = EXCLUDED.name,
    price_text = EXCLUDED.price_text,
    weight_text = EXCLUDED.weight_text,
    weight_lb = EXCLUDED.weight_lb
  RETURNING id
)
INSERT INTO public.srd_weapons (
  item_id, weapon_category, weapon_type, handedness, damage_by_size, critical_range, critical_mult, damage_type
)
SELECT
  id,
  'simple',
  'melee',
  'one-handed',
  jsonb_build_object('M', '1'),
  '1d2',
  'x2',
  ARRAY['1/2 lb.']::text[]
FROM new_item
ON CONFLICT (item_id) DO UPDATE SET
  damage_by_size = EXCLUDED.damage_by_size,
  critical_range = EXCLUDED.critical_range,
  critical_mult = EXCLUDED.critical_mult;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'backpack-empty',
  'Backpack (empty)',
  'goods',
  '2 gp',
  '2 lb.1',
  2.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'barrel-empty',
  'Barrel (empty)',
  'goods',
  '2 gp',
  '30 lb.',
  30
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'basket-empty',
  'Basket (empty)',
  'goods',
  '4 sp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'bedroll',
  'Bedroll',
  'goods',
  '1 sp',
  '5 lb.1',
  5.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'bell',
  'Bell',
  'goods',
  '1 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'blanket-winter',
  'Blanket, winter',
  'goods',
  '5 sp',
  '3 lb.1',
  3.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'block-and-tackle',
  'Block and tackle',
  'goods',
  '5 gp',
  '5 lb.',
  5
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'bottle-wine-glass',
  'Bottle, wine glass',
  'goods',
  '2 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'bucket-empty',
  'Bucket (empty)',
  'goods',
  '5 sp',
  '2 lb.',
  2
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'caltrops',
  'Caltrops',
  'goods',
  '1 gp',
  '2 lb.',
  2
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'candle',
  'Candle',
  'goods',
  '1 cp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'canvas-sq-yd',
  'Canvas (sq. yd.)',
  'goods',
  '1 sp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'case-map-or-scroll',
  'Case, map or scroll',
  'goods',
  '1 gp',
  '1/2 lb.',
  12
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'chain-10-ft',
  'Chain (10 ft.)',
  'goods',
  '30 gp',
  '2 lb.',
  2
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'chalk-1-piece',
  'Chalk, 1 piece',
  'goods',
  '1 cp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'chest-empty',
  'Chest (empty)',
  'goods',
  '2 gp',
  '25 lb.',
  25
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'crowbar',
  'Crowbar',
  'goods',
  '2 gp',
  '5 lb.',
  5
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'firewood-per-day',
  'Firewood (per day)',
  'goods',
  '1 cp',
  '20 lb.',
  20
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'fishhook',
  'Fishhook',
  'goods',
  '1 sp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'fishing-net-25-sq-ft',
  'Fishing net, 25 sq. ft.',
  'goods',
  '4 gp',
  '5 lb.',
  5
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'flask-empty',
  'Flask (empty)',
  'goods',
  '3 cp',
  '1-1/2 lb.',
  112
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'flint-and-steel',
  'Flint and steel',
  'goods',
  '1 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'grappling-hook',
  'Grappling hook',
  'goods',
  '1 gp',
  '4 lb.',
  4
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'hammer',
  'Hammer',
  'goods',
  '5 sp',
  '2 lb.',
  2
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'ink-1-oz-vial',
  'Ink (1 oz. vial)',
  'goods',
  '8 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'inkpen',
  'Inkpen',
  'goods',
  '1 sp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'jug-clay',
  'Jug, clay',
  'goods',
  '3 cp',
  '9 lb.',
  9
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'ladder-10-foot',
  'Ladder, 10-foot',
  'goods',
  '5 cp',
  '20 lb.',
  20
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'lamp-common',
  'Lamp, common',
  'goods',
  '1 sp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'lantern-bullseye',
  'Lantern, bullseye',
  'goods',
  '12 gp',
  '3 lb.',
  3
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'lantern-hooded',
  'Lantern, hooded',
  'goods',
  '7 gp',
  '2 lb.',
  2
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'lock',
  'Lock',
  'goods',
  '',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'very-simple',
  'Very simple',
  'goods',
  '20 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'average',
  'Average',
  'goods',
  '40 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'good',
  'Good',
  'goods',
  '80 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'amazing',
  'Amazing',
  'goods',
  '150 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'manacles',
  'Manacles',
  'goods',
  '15 gp',
  '2 lb.',
  2
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'manacles-masterwork',
  'Manacles, masterwork',
  'goods',
  '50 gp',
  '2 lb.',
  2
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'mirror-small-steel',
  'Mirror, small steel',
  'goods',
  '10 gp',
  '1/2 lb.',
  12
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'mug-tankard-clay',
  'Mug/Tankard, clay',
  'goods',
  '2 cp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'oil-1-pint-flask',
  'Oil (1-pint flask)',
  'goods',
  '1 sp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'paper-sheet',
  'Paper (sheet)',
  'goods',
  '4 sp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'parchment-sheet',
  'Parchment (sheet)',
  'goods',
  '2 sp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'pick-miner-rsquo-s',
  'Pick, miner&rsquo;s',
  'goods',
  '3 gp',
  '10 lb.',
  10
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'pitcher-clay',
  'Pitcher, clay',
  'goods',
  '2 cp',
  '5 lb.',
  5
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'piton',
  'Piton',
  'goods',
  '1 sp',
  '1/2 lb.',
  12
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'pole-10-foot',
  'Pole 10-foot',
  'goods',
  '2 sp',
  '8 lb.',
  8
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'pot-iron',
  'Pot, iron',
  'goods',
  '5 sp',
  '10 lb.',
  10
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'pouch-belt-empty',
  'Pouch, belt (empty)',
  'goods',
  '1 gp',
  '1/2 lb.1',
  12.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'ram-portable',
  'Ram, portable',
  'goods',
  '10 gp',
  '20 lb.',
  20
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'rations-trail-per-day',
  'Rations, trail (per day)',
  'goods',
  '5 sp',
  '1 lb.1',
  1.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'rope-hempen-50-ft',
  'Rope, hempen (50 ft.)',
  'goods',
  '1 gp',
  '10 lb.',
  10
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'rope-silk-50-ft',
  'Rope, silk (50 ft.)',
  'goods',
  '10 gp',
  '5 lb.',
  5
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'sack-empty',
  'Sack (empty)',
  'goods',
  '1 sp',
  '1/2 lb.1',
  12.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'sealing-wax',
  'Sealing wax',
  'goods',
  '1 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'sewing-needle',
  'Sewing needle',
  'goods',
  '5 sp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'signal-whistle',
  'Signal whistle',
  'goods',
  '8 sp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'signet-ring',
  'Signet ring',
  'goods',
  '5 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'sledge',
  'Sledge',
  'goods',
  '1 gp',
  '10 lb.',
  10
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'soap-per-lb',
  'Soap (per lb.)',
  'goods',
  '5 sp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'spade-or-shovel',
  'Spade or shovel',
  'goods',
  '2 gp',
  '8 lb.',
  8
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'spyglass',
  'Spyglass',
  'goods',
  '1000 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'tent',
  'Tent',
  'goods',
  '10 gp',
  '20 lb.1',
  20.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'torch',
  'Torch',
  'goods',
  '1 cp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'vial-ink-or-potion',
  'Vial ink or potion',
  'goods',
  '1 gp',
  '1/10 lb.',
  110
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'waterskin',
  'Waterskin',
  'goods',
  '1 gp',
  '4 lb.1',
  4.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'whetstone',
  'Whetstone',
  'goods',
  '2 cp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'acid-flask',
  'Acid (flask)',
  'goods',
  '10 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'alchemist-rsquo-s-fire-flask',
  'Alchemist&rsquo;s fire (flask)',
  'goods',
  '20 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'antitoxin-vial',
  'Antitoxin (vial)',
  'goods',
  '50 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'everburning-torch',
  'Everburning torch',
  'goods',
  '110 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'holy-water-flask',
  'Holy water (flask)',
  'goods',
  '25 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'smokestick',
  'Smokestick',
  'goods',
  '20 gp',
  '1/2 lb.',
  12
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'sunrod',
  'Sunrod',
  'goods',
  '2 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'tanglefoot-bag',
  'Tanglefoot bag',
  'goods',
  '50 gp',
  '4 lb.',
  4
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'thunderstone',
  'Thunderstone',
  'goods',
  '30 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'tindertwig',
  'Tindertwig',
  'goods',
  '1 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'alchemist-rsquo-s-lab',
  'Alchemist&rsquo;s lab',
  'goods',
  '500 gp',
  '40 lb.',
  40
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'artisan-rsquo-s-tools',
  'Artisan&rsquo;s tools',
  'goods',
  '5 gp',
  '5 lb.',
  5
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'artisan-rsquo-s-tools-masterwork',
  'Artisan&rsquo;s tools, masterwork',
  'goods',
  '55 gp',
  '5 lb.',
  5
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'climber-rsquo-s-kit',
  'Climber&rsquo;s kit',
  'goods',
  '80 gp',
  '5 lb.1',
  5.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'disguise-kit',
  'Disguise kit',
  'goods',
  '50 gp',
  '8 lb.1',
  8.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'healer-rsquo-s-kit',
  'Healer&rsquo;s kit',
  'goods',
  '50 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'holly-and-mistletoe',
  'Holly and mistletoe',
  'goods',
  '&mdash;',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'holy-symbol-wooden',
  'Holy symbol, wooden',
  'goods',
  '1 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'holy-symbol-silver',
  'Holy symbol, silver',
  'goods',
  '25 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'hourglass',
  'Hourglass',
  'goods',
  '25 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'magnifying-glass',
  'Magnifying glass',
  'goods',
  '100 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'musical-instrument-common',
  'Musical instrument, common',
  'goods',
  '5 gp',
  '3 lb.1',
  3.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'musical-instrument-masterwork',
  'Musical instrument, masterwork',
  'goods',
  '100 gp',
  '3 lb.1',
  3.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'scale-merchant-rsquo-s',
  'Scale, merchant&rsquo;s',
  'goods',
  '2 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'spell-component-pouch',
  'Spell component pouch',
  'goods',
  '5 gp',
  '2 lb.',
  2
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'spellbook-wizard-rsquo-s-blank',
  'Spellbook, wizard&rsquo;s (blank)',
  'goods',
  '15 gp',
  '3 lb.',
  3
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'thieves-rsquo-tools',
  'Thieves&rsquo; tools',
  'goods',
  '30 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'thieves-rsquo-tools-masterwork',
  'Thieves&rsquo; tools, masterwork',
  'goods',
  '100 gp',
  '2 lb.',
  2
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'tool-masterwork',
  'Tool, masterwork',
  'goods',
  '50 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'water-clock',
  'Water clock',
  'goods',
  '1000 gp',
  '200 lb.',
  200
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'artisan-rsquo-s-outfit',
  'Artisan&rsquo;s outfit',
  'goods',
  '1 gp',
  '4 lb.1',
  4.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'cleric-rsquo-s-vestments',
  'Cleric&rsquo;s vestments',
  'goods',
  '5 gp',
  '6 lb.1',
  6.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'cold-weather-outfit',
  'Cold weather outfit',
  'goods',
  '8 gp',
  '7 lb.1',
  7.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'courtier-rsquo-s-outfit',
  'Courtier&rsquo;s outfit',
  'goods',
  '30 gp',
  '6 lb.1',
  6.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'entertainer-rsquo-s-outfit',
  'Entertainer&rsquo;s outfit',
  'goods',
  '3 gp',
  '4 lb.1',
  4.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'explorer-rsquo-s-outfit',
  'Explorer&rsquo;s outfit',
  'goods',
  '10 gp',
  '8 lb.1',
  8.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'monk-rsquo-s-outfit',
  'Monk&rsquo;s outfit',
  'goods',
  '5 gp',
  '2 lb.1',
  2.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'noble-rsquo-s-outfit',
  'Noble&rsquo;s outfit',
  'goods',
  '75 gp',
  '10 lb.1',
  10.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'peasant-rsquo-s-outfit',
  'Peasant&rsquo;s outfit',
  'goods',
  '1 sp',
  '2 lb.1',
  2.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'royal-outfit',
  'Royal outfit',
  'goods',
  '200 gp',
  '15 lb.1',
  15.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'scholar-rsquo-s-outfit',
  'Scholar&rsquo;s outfit',
  'goods',
  '5 gp',
  '6 lb.1',
  6.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'traveler-rsquo-s-outfit',
  'Traveler&rsquo;s outfit',
  'goods',
  '1 gp',
  '5 lb.1',
  5.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'ale',
  'Ale',
  'goods',
  '',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'gallon',
  'Gallon',
  'goods',
  '2 sp',
  '8 lb.',
  8
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'mug',
  'Mug',
  'goods',
  '4 cp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'banquet-per-person',
  'Banquet (per person)',
  'goods',
  '10 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'bread-per-loaf',
  'Bread, per loaf',
  'goods',
  '2 cp',
  '1/2 lb.',
  12
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'cheese-hunk-of',
  'Cheese, hunk of',
  'goods',
  '1 sp',
  '1/2 lb.',
  12
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'inn-stay-per-day',
  'Inn stay (per day)',
  'goods',
  '',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'good',
  'Good',
  'goods',
  '2 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'common',
  'Common',
  'goods',
  '5 sp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'poor',
  'Poor',
  'goods',
  '2 sp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'meals-per-day',
  'Meals (per day)',
  'goods',
  '',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'good',
  'Good',
  'goods',
  '5 sp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'common',
  'Common',
  'goods',
  '3 sp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'poor',
  'Poor',
  'goods',
  '1 sp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'meat-chunk-of',
  'Meat, chunk of',
  'goods',
  '3 sp',
  '1/2 lb.',
  12
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'wine',
  'Wine',
  'goods',
  '',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'common-pitcher',
  'Common (pitcher)',
  'goods',
  '2 sp',
  '6 lb.',
  6
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'fine-bottle',
  'Fine (bottle)',
  'goods',
  '10 gp',
  '1-1/2 lb.',
  112
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'barding',
  'Barding',
  'goods',
  '',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'medium-creature',
  'Medium creature',
  'goods',
  'x2',
  'x1',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'large-creature',
  'Large creature',
  'goods',
  'x4',
  'x2',
  2
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'bit-and-bridle',
  'Bit and bridle',
  'goods',
  '2 gp',
  '1 lb.',
  1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'dog-guard',
  'Dog, guard',
  'goods',
  '25 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'dog-riding',
  'Dog, riding',
  'goods',
  '150 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'donkey-or-mule',
  'Donkey or mule',
  'goods',
  '8 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'feed-per-day',
  'Feed (per day)',
  'goods',
  '5 cp',
  '10 lb.',
  10
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'horse',
  'Horse',
  'goods',
  '',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'horse-heavy',
  'Horse, heavy',
  'goods',
  '200 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'horse-light',
  'Horse, light',
  'goods',
  '75 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'pony',
  'Pony',
  'goods',
  '30 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'warhorse-heavy',
  'Warhorse, heavy',
  'goods',
  '400 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'warhorse-light',
  'Warhorse, light',
  'goods',
  '150 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'warpony',
  'Warpony',
  'goods',
  '100 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'saddle',
  'Saddle',
  'goods',
  '',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'military',
  'Military',
  'goods',
  '20 gp',
  '30 lb.',
  30
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'pack',
  'Pack',
  'goods',
  '5 gp',
  '15 lb.',
  15
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'riding',
  'Riding',
  'goods',
  '10 gp',
  '25 lb.',
  25
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'saddle-exotic',
  'Saddle, Exotic',
  'goods',
  '',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'military',
  'Military',
  'goods',
  '60 gp',
  '40 lb.',
  40
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'pack',
  'Pack',
  'goods',
  '15 gp',
  '20 lb.',
  20
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'riding',
  'Riding',
  'goods',
  '30 gp',
  '30 lb.',
  30
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'saddlebags',
  'Saddlebags',
  'goods',
  '4 gp',
  '8 lb.',
  8
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'stabling-per-day',
  'Stabling (per day)',
  'goods',
  '5 sp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'carriage',
  'Carriage',
  'goods',
  '100 gp',
  '600 lb.',
  600
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'cart',
  'Cart',
  'goods',
  '15 gp',
  '200 lb.',
  200
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'galley',
  'Galley',
  'goods',
  '30,000 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'keelboat',
  'Keelboat',
  'goods',
  '3,000 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'longship',
  'Longship',
  'goods',
  '10,000 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'rowboat',
  'Rowboat',
  'goods',
  '50 gp',
  '100 lb.',
  100
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'oar',
  'Oar',
  'goods',
  '2 gp',
  '10 lb.',
  10
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'sailing-ship',
  'Sailing ship',
  'goods',
  '10,000 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'sled',
  'Sled',
  'goods',
  '20 gp',
  '300 lb.',
  300
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'wagon',
  'Wagon',
  'goods',
  '35 gp',
  '400 lb.',
  400
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'warship',
  'Warship',
  'goods',
  '25,000 gp',
  '&mdash;',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'coach-cab',
  'Coach cab',
  'goods',
  '3 cp per mile',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'hireling-trained',
  'Hireling, trained',
  'goods',
  '3 sp per day',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'hireling-untrained',
  'Hireling, untrained',
  'goods',
  '1 sp per day',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'messenger',
  'Messenger',
  'goods',
  '2 cp per mile',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'road-or-gate-toll',
  'Road or gate toll',
  'goods',
  '1 cp',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'ship-rsquo-s-passage',
  'Ship&rsquo;s passage',
  'goods',
  '1 sp per mile',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'spell-0-level',
  'Spell, 0-level',
  'goods',
  'Caster level x 5 gp2',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'spell-1st-level',
  'Spell, 1st-level',
  'goods',
  'Caster level x 10 gp2',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'spell-2nd-level',
  'Spell, 2nd-level',
  'goods',
  'Caster level x 20 gp2',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'spell-3rd-level',
  'Spell, 3rd-level',
  'goods',
  'Caster level x 30 gp2',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'spell-4th-level',
  'Spell, 4th-level',
  'goods',
  'Caster level x 40 gp2',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'spell-5th-level',
  'Spell, 5th-level',
  'goods',
  'Caster level x 50 gp2',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'spell-6th-level',
  'Spell, 6th-level',
  'goods',
  'Caster level x 60 gp2',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'spell-7th-level',
  'Spell, 7th-level',
  'goods',
  'Caster level x 70 gp2',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'spell-8th-level',
  'Spell, 8th-level',
  'goods',
  'Caster level x 80 gp2',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'spell-9th-level',
  'Spell, 9th-level',
  'goods',
  'Caster level x 90 gp2',
  '',
  NULL
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'medium',
  'Medium',
  'goods',
  '30 ft.',
  '35 ft.',
  35
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;


INSERT INTO public.srd_items (slug, name, item_category, price_text, weight_text, weight_lb)
VALUES (
  'heavy',
  'Heavy',
  'goods',
  '30 ft.1',
  '35 ft.1',
  35.1
)
ON CONFLICT (system_slug, slug) DO UPDATE SET
  name = EXCLUDED.name,
  price_text = EXCLUDED.price_text,
  weight_text = EXCLUDED.weight_text,
  weight_lb = EXCLUDED.weight_lb;

