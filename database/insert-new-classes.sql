-- ============================================================================
-- Inserción de Clases Adicionales
-- ============================================================================
-- Generado automáticamente
-- Fecha: 2025-11-20T23:20:34.704Z
-- ============================================================================

-- Ninja
INSERT INTO classes (
    slug, name, hit_die, skill_points_per_level,
    class_skills, weapon_proficiencies, armor_proficiencies,
    bab_progression, fort_save, ref_save, will_save,
    primary_ability, description, good_saves, source
) VALUES (
    'ninja',
    'Ninja',
    'd6',
    6,
    ARRAY['Balance', 'Bluff', 'Climb', 'Concentration', 'Craft', 'Disable Device', 'Disguise', 'Escape Artist', 'Gather Information', 'Hide', 'Jump', 'Listen', 'Move Silently', 'Open Lock', 'Search', 'Sense Motive', 'Sleight of Hand', 'Spot', 'Swim', 'and Tumble'],
    ARRAY['all simple weapons, plus the hand crossbow, kama, kukri, nunchaku, sai, shortbow, short sword, shuriken, and siangham'],
    ARRAY['all simple weapons, plus the hand crossbow, kama, kukri, nunchaku, sai, shortbow, short sword, shuriken, and siangham. Ninjas are not proficient with any type of armor or shield.

AC Bonus (Ex): A ninja is highly trained at dodging blows, and she has a sixth sense that lets her avoid even unanticipated attacks. When unarmored and unencumbered, a ninja adds her Wisdom bonus (if any) to her Armor Class. This ability does not stack with the monk''s AC bonus ability (a ninja with levels of monk does not add the bonus twice). In addition, a ninja gains a +1 bonus to AC at 5th level. This bonus increases by 1 for every five ninja levels thereafter (+2 at 10th, +3 at 15th, and +4 at 20th level).

These bonuses to AC apply even against touch attacks or when a ninja is flat-footed. The character loses these bonuses when she is immobilized or helpless, when she wears any armor, when she carries a shield, or when she carries a medium or heavy load.

Ki Power (Su): A ninja can channel her ki to manifest special powers of stealth and mobility. She can use her ki powers a number of times per day equal to one-half her class level (minimum 1) plus her Wisdom bonus (if any). Ki powers can be used only if a ninja is wearing no armor'],
    'good',
    'poor',
    'good',
    'poor',
    'Wis',
    'Ninjas move through the shadows, striking down the unwary and vanishing again with ease. Ninjas walk where others cannot. They blend their training in stealth and assassination with a focused mind. Their rigorous preparation sharpens their minds and bodies, giving them supernatural abilities of stealth and making them phantoms in the eyes of many. Although ninjas in battle lack the staying power of martial characters such as fighters or barbarians, they excel at making combat occur on their terms - appearing and disappearing seemingly at a whim.

Historically, ninjas came from clans of assassins and guerrilla warriors in feudal Japan. In a fantasy setting, they blend a gift for stealth and infiltration with devastating surprise attacks and supernatural means of avoiding blows. Although the specific abilities of the class differ from those attributed to the historical ninja, they mirror the ninja''s fearsome reputation as a spy, assassin, and martial artist.

Ninjas adventure for a variety of reasons. A loyal ninja might adventure at her lord''s command, using her abilities of stealth and subterfuge to ferret out his enemies or recover powerful treasures to be used in his service. A mercenary ninja might seek only treasure and fame, while a more idealistic ninja might seek to thwart a growing evil. Most ninjas prefer anonymity to fame, and they go out of their way to disguise their profession and abilities. A rare few, however, revel in the mysterious reputation that surrounds ninjas and their training, making known their abilities and their role in a famous adventuring group. As ninjas grow in wealth and power, their goals often change, and their ability to uncover secrets and kill stealthily can shape the plans of entire nations. Rulers both fear and covet the skills of the ninja, and high-level ninjas whose identities are known often find adventures coming to them rather than the converse.',
    ARRAY['Ref'],
    'Complete Arcane / Complete Psionic / Oriental Adventures'
);

-- Guerrero Psíquico
INSERT INTO classes (
    slug, name, hit_die, skill_points_per_level,
    class_skills, weapon_proficiencies, armor_proficiencies,
    bab_progression, fort_save, ref_save, will_save,
    primary_ability, description, good_saves, source
) VALUES (
    'guerrero_psiquico',
    'Guerrero Psíquico',
    'd8',
    2,
    ARRAY['Autohypnosis', 'Climb', 'Concentration', 'Craft', 'Jump', 'Knowledge (psionics)', 'Profession', 'Ride', 'Search', 'and Swim'],
    ARRAY['all simple and martial weapons, with all types of armor (heavy, medium, and light), and with shields (except tower shields)'],
    ARRAY['Light armor'],
    'good',
    'good',
    'poor',
    'poor',
    'Int',
    'One who turns the mind''s potential to the warrior''s art is known as a psychic warrior. Where psions devote themselves wholly to the development of mind-engendered abilities, psychic warriors give emphasis to the development of the body. With mental and physical energy working in union, the psychic warrior strives toward martial perfection. The sword, axe, and bow are physical tools that psychic warriors embrace along with their psionic abilities. Well trained in both physical and psionic matters, the psychic warrior is a formidable adversary.

Psychic warriors know that only through conflict will their skills grow. Prone to showing off their flamboyant abilities, they claim to fear nothing. Psychic warriors are eager to accumulate the treasure that adventuring brings and the power it buys.

The defining trait of the psychic warrior is his ability to supplement his physical attacks with psionic feats and powers. A combination of strength, martial skill, and psionic ability allows the psychic warrior to match and sometimes surpass a normal fighter of equal experience. As the psychic warrior gains experience and power, his fighting skills and psionic abilities grow in concert.',
    ARRAY['Fort'],
    'Complete Arcane / Complete Psionic / Oriental Adventures'
);

-- Psiónico
INSERT INTO classes (
    slug, name, hit_die, skill_points_per_level,
    class_skills, weapon_proficiencies, armor_proficiencies,
    bab_progression, fort_save, ref_save, will_save,
    primary_ability, description, good_saves, source
) VALUES (
    'psionico',
    'Psiónico',
    'd4',
    2,
    ARRAY['Concentration', 'Craft', 'Knowledge (all skills, taken individually)', 'Profession', 'and Psicraft'],
    ARRAY['the club, dagger, heavy crossbow, light crossbow, quarterstaff, and shortspear'],
    ARRAY['Light armor'],
    'medium',
    'poor',
    'poor',
    'good',
    'Int',
    'Psionic Classes
PSION

The striking fist or flashing sword pales beside a psion''s focused stare. Psionic powers arise from a regimen of strict mental discipline developed over months and years of selfscrutiny and subconscious discovery. Those who overcome their personal demons, fears, and other pitfalls of intense self-reflection learn to call upon an internal reservoir of psionic power. Psions depend on a continual study of their own minds to discover an ever wider range of mental powers. They meditate on memories and the nature of memory itself, debate with their own fragment personalities, and delve into the dark recesses of their minds'' convoluted corridors. "Know thyself" is not just a saying for a psion - it''s the road to power.

A psion adventures to stimulate his mind. New experiences translate to new avenues of thought, and eventually to the discovery of previously latent abilities. A psion''s powers are innate but not effortlessly attained. Good psions seek what is best in the world and attempt to preserve those elements with their mastery of mental powers. Evil psions seek to mold others to their own desires, whether using their powers openly or in secret.',
    ARRAY['Will'],
    'Complete Arcane / Complete Psionic / Oriental Adventures'
);

-- Scout
INSERT INTO classes (
    slug, name, hit_die, skill_points_per_level,
    class_skills, weapon_proficiencies, armor_proficiencies,
    bab_progression, fort_save, ref_save, will_save,
    primary_ability, description, good_saves, source
) VALUES (
    'explorador_scout',
    'Scout',
    'd8',
    8,
    ARRAY['Balance', 'Climb', 'Craft', 'Disable Device', 'Escape Artist', 'Hide', 'Jump', 'Knowledge(dungeoneering)', 'Knowledge(geography)', 'Knowledge(nature)', 'Listen', 'Move Silently', 'Ride', 'Search', 'Sense Motive', 'Speak Language', 'Spot', 'Survival', 'Swim', 'Tumble', 'and Use Rope'],
    ARRAY['all simple weapons, plus the handaxe, throwing axe, short sword, and shortbow'],
    ARRAY['all simple weapons, plus the handaxe, throwing axe, short sword, and shortbow. Scouts are proficient with light armor, but not with shields.

Skirmish (Ex):A scout relies on mobility to deal extra damage and improve her defense. She deals an extra 1d6 points of damage on all attacks she makes during any round in which she moves at least 10 feet away from where she was at the start of her turn. The extra damage applies only to attacks made after the scout has moved at least 10 feet. The skirmish ability cannot be used while mounted. The extra damage applies only to attacks taken during the scout''s turn. This extra damage increases by 1d6 for every four levels gained above 1st (2d6 at 5th, 3d6 at 9th, 4d6 at 13th, and 5d6 at 17th level).

The extra damage only applies against living creatures that have a discernible anatomy. Undead, constructs, oozes, plants, incorporeal creatures, and creatures immune to extra damage from critical hits are not vulnerable to this additional damage. The scout must be able to see the target well enough to pick out a vital spot and must be able to reach such a spot. Scouts can apply this extra damage to ranged attacks made while skirmishing, but only if the target is within 30 feet.

At 3rd level, a scout gains a +1 competence bonus to Armor Class during any round in which she moves at least 10 feet. The bonus applies as soon as the scout has moved 10 feet, and lasts until the start of her next turn. This bonus improves by 1 for every four levels gained above 3rd (+2 at 7th, +3 at 11th, +4 at 15th, and +5 at 19th level).

A scout loses this ability when wearing medium or heavy armor or when carrying a medium or heavy load. If she gains the skirmish ability from another class, the bonuses stack.

Trapfinding (Ex):A scout can use the Search skill to locate traps with a DC higher than 20, and she can use Disable Device to bypass a trap or disarm magic traps. See the rogue class feature.

Battle Fortitude (Ex):At 2nd level, a scout gains a +1 competence bonus on Fortitude saves and initiative checks. This bonus increases to +2 at 11th level and +3 at 20th level. A scout loses this bonus when wearing medium or heavy armor or when carrying a medium or heavy load.

Uncanny Dodge (Ex):Starting at 2nd level, a scout cannot be caught fat-footed and reacts to danger before her senses would normally allow her to do so. See the barbarian class feature.

Fast Movement (Ex):Starting at 3rd level, a scout''s gains a +10 foot enhancement bonus to her base land speed. At 11th level, this bonus increases to +20 feet. See the monk class feature. A scout loses this benefit when wearing medium or heavy armor or when carrying a medium or heavy load.

Trackless Step (Ex):Beginning at 3rd level, a scout cannot be tracked in natural surroundings. See the druid class feature.

Bonus Feats: At 4th level and every four levels thereafter (8th, 12th, 16th, and 20th level), a scout gains a bonus feat, which must be selected from the following list: Acrobatic, Agile, Alertness, Athletic, Blind-fight, Brachiation, Combat Expertise, Danger Sense, Dodge, Endurance, Far Shot, Great Fortitude, Hear the Unseen, Improved Initiative, Improved Swimming, Iron Will, Lightning Refexes, Mobility, Point Blank Shot, Precise Shot, Quick Draw, Quick Reconnoiter, Rapid Reload, Shot on the Run, Skill Focus, Spring Attack, Track. She must meet all the prerequisites for the feat.

Evasion (Ex):Beginning at 5th level, a scout can avoid damage from certain attacks with a successful Refex save. See the monk class feature.

Flawless Stride (Ex):Starting at 6th level, a scout can move through any sort of terrain that slows movement (such as undergrowth, rubble, and similar terrain) at her normal speed and without taking damage or suffering any other impairment.

This ability does not let her move more quickly through terrain that requires a Climb or Swim check to navigate, nor can she move more quickly through terrain or undergrowth that has been magically manipulated to impede motion.

A scout loses this benefit when wearing medium or heavy armor or when carrying a medium or heavy load.

Camouflage (Ex):Beginning at 8th level, a scout can use the Hide skill in any sort of natural terrain. See the ranger class feature. She loses this benefit when wearing medium or heavy armor or when carrying a medium or heavy load.

Blindsense (Ex): At 10th level, a scout gains the blindsense ability out to 30 feet.

Hide in Plain Sight (Ex):Beginning at 14th level, a scout can use the Hide skill in natural terrain even while being observed. See the ranger class feature. A scout loses this benefit when wearing medium or heavy armor or when carrying a medium or heavy load.

Free Movement (Ex):At 18th level and higher, a scout can slip out of bonds, grapples, and even the effects of confining spells easily. This ability duplicates the effect of a freedom of movement spell, except that it is always active. A scout loses this benefit when wearing medium or heavy armor or when carrying a medium or heavy load.

Blindsight (Ex):A 20th-level scout gains the blindsight ability out to 30 feet. Her senses become so acute that she can maneuver and fight flawlessly even in total darkness. Invisibility, darkness, and most kinds of concealment are irrelevant, though the scout must have line of effect to a creature or object to discern it.

SCOUT VARIANTS
Variant Classes
Alternative Class Features
Aquatic Scout
Dungeon Specialist
Go to Ground
Hidden Stalker
Light Cavalry
Riposte
Skilled City-Dweller
Sniper
Spell Reflection
Substitution Levels

Aquatic Scout
The quick, nimble scout makes an excellent aquatic adventurer, both above and below the waves. In fact, in most aquatic-themed campaigns, the scout is almost certainly better suited for inclusion in an adventuring party than the rogue. Fast movement allows the scout to move more quickly through the water, while a scout who focuses on Balance, Climb, Jump, and Tumble can get along well aboard any ship. Flawless stride applies equally well in underwater conditions, though it doesn''t change the normal distance covered by a Swim check. At 18th level, a scout can function underwater as if affected by freedom of movement - a great boon to underwater combatants.

Fast Movement (Ex): Scouts who possess a racial swim speed can choose to apply their fast movement bonus to their swim speed instead of their land speed. The choice must be made when the character gains the class feature, and cannot be changed later. This benefit still applies only when the scout is wearing no armor or light armor'],
    'good',
    'poor',
    'good',
    'poor',
    'Wis',
    'Any force on the move, whether it''s an army or an adventuring group, needs information about what''s ahead and what''s behind and, more important, time to prepare for battle. A scout can navigate difficult terrain at good speed, and she specializes in seeing her foe before the opponent ever detects her presence. In a dungeon or in the wild, a scout is seen only when she wants to be.

Scouts adventure for numerous reasons. Many have a role in a military organization. Whether serving as outriders for a large army or as foresters for a small border fort, these scouts venture into the wilderness under orders. Although more common than other scouts, those attached to the military are unlikely to have the time or permission necessary to undertake regular adventures. Instead, adventuring scouts come from rural villages, having honed their skills over a lifetime of wandering the woods. Others have left their military service behind and find themselves attracted to the adventuring lifestyle. Many adventuring scouts begin their careers as guides hired to lead other adventurers through the wilderness. Those who find the excitement and challenge of adventuring to their taste then seek out a group of their own.

A scout has some training in weapons and a unique combat style that favors fast movement and devastating attacks. She excels in performing during running battles, which allow her to maximize her special fighting techniques and high movement rate. Although a scout can hold her own in a fight, she''s at her best before combat begins, when she can use her powers of stealth and observation to find an enemy and give her companions accurate information about what they face. The scout is a backcountry expert, exceeding even the ranger''s ability to navigate rough terrain and lead a group of companions through the wilderness.',
    ARRAY['Ref'],
    'Complete Arcane / Complete Psionic / Oriental Adventures'
);

-- Cuchilla del Alma
INSERT INTO classes (
    slug, name, hit_die, skill_points_per_level,
    class_skills, weapon_proficiencies, armor_proficiencies,
    bab_progression, fort_save, ref_save, will_save,
    primary_ability, description, good_saves, source
) VALUES (
    'cuchilla_del_alma',
    'Cuchilla del Alma',
    'd10',
    4,
    ARRAY['Autohypnosis', 'Climb', 'Concentration', 'Craft', 'Hide', 'Jump', 'Knowledge (psionics)', 'Listen', 'Move Silently', 'Profession', 'Spot', 'and Tumble'],
    ARRAY['all simple weapons, with their own mind blades, and with light armor and shields (except tower shields)'],
    ARRAY['all simple weapons, with their own mind blades, and with light armor'],
    'good',
    'poor',
    'good',
    'good',
    'Int',
    'A soulknife recognizes his own mind as the most beautiful - and the most deadly - thing in all creation. With this understanding and through extended practice, a soulknife learns to forge his mental strength into a shimmering blade of semisolid psychic energy. Each soulknife''s personal blade, referred to as a mind blade, differs in color and shape according to his personality, mental strength, and even mood. Although no two mind blades look alike, all share the same lethal qualities. Because soulknives turn the power of their minds to such weaponry, they are notorious for their violence.

While caution and forethought go into a soulknife''s preparation for adventure, most have a hard time restraining their natural bravado and showmanship. After all, how many adventurers can dispatch opponents with a blade materialized from pure thought? Thus, for many soulknives, adventuring presents an opportunity to do what they love most: Wield the idealized blade wrought of their innermost desires.

More than any other psionic class, the soulknife fights with psionic power directly in both melee and ranged combat. Strength, combat prowess, and psionic talent allow the soulknife to claim equal footing - at least - with any other combat-oriented class on the field of battle.',
    ARRAY['Ref', 'Will'],
    'Complete Arcane / Complete Psionic / Oriental Adventures'
);

-- Ladrón de Conjuros
INSERT INTO classes (
    slug, name, hit_die, skill_points_per_level,
    class_skills, weapon_proficiencies, armor_proficiencies,
    bab_progression, fort_save, ref_save, will_save,
    primary_ability, description, good_saves, source
) VALUES (
    'ladron_de_conjuros',
    'Ladrón de Conjuros',
    'd6',
    6,
    ARRAY['Appraise', 'Bluff', 'Concentration', 'Craft', 'Decipher Script', 'Disable Device', 'Escape Artist', 'Gather Information', 'Hide', 'Jump', 'Knowledge(arcana)', 'Knowledge(local)', 'Listen', 'Move Silently', 'Open Lock', 'Search', 'Speak Language', 'Spellcraft', 'Spot', 'Swim', 'Tumble', 'and Use Magic Device'],
    ARRAY['all simple weapons and with light armor but not with shields'],
    ARRAY['all simple weapons and with light armor'],
    'good',
    'poor',
    'poor',
    'good',
    'Int',
    'Spellthieves use skill and arcane magic to drain the abilities of their opponents and turn their foes'' own powers against them. Spellthieves love the challenges that adventure brings, and they relish finding unique and inventive ways to use their abilities. Because they have such a wide variety of abilities, spellthieves can adapt themselves to overcome nearly any challenge, but they have neither the overpowering arcane might of wizards nor the brute force of fighters. Spellthieves never cast two spells when one will do, and they excel at using misdirection and deception to overcome seemingly stronger opponents.

Good spellthieves use their skills and magic to entertain themselves, protect those less gifted than themselves, and occasionally serve a cause or nation as a spy. Evil spellthieves use their versatile skills to trick and deceive, or plague large cities as daring cat burglars.

Spellthieves adventure because they love a challenge. They see each puzzle, trap, or monster as a new way to test their skills. This does not mean that they are all overconfident. Some are, but many simply have a healthy dose of curiosity and a keen interest in proving their own mastery. Because they have such versatile abilities, they know they have a chance to overcome nearly any kind of challenge. When confronted with a powerful physical foe, a spellthief often can''t help wanting to know whether his stealth and cunning could overcome the foe''s brute force. When confronted with a clever trap, a spellthief can''t help wondering whether his speed and skill could overcome the trapmaker''s ingenuity and preparation. Like other characters, spellthieves are attracted to the wealth that adventuring offers. Living an open, flamboyant (and therefore expensive) lifestyle suits many, if not all, spellthieves, and adventuring offers ready rewards both in gold and fame.',
    ARRAY['Will'],
    'Complete Arcane / Complete Psionic / Oriental Adventures'
);

-- Brujo
INSERT INTO classes (
    slug, name, hit_die, skill_points_per_level,
    class_skills, weapon_proficiencies, armor_proficiencies,
    bab_progression, fort_save, ref_save, will_save,
    primary_ability, description, good_saves, source
) VALUES (
    'brujo',
    'Brujo',
    'd6',
    2,
    ARRAY['Bluff', 'Concentration', 'Craft', 'Disguise', 'Intimidate', 'Jump', 'Knowledge(arcana)', 'Knowledge(the planes)', 'Knowledge(religion)', 'Profession', 'Sense Motive', 'Spellcraft', 'Use Magic Device'],
    ARRAY['all simple weapons'],
    ARRAY['all simple weapons. They are proficient with light armor'],
    'good',
    'poor',
    'poor',
    'good',
    'Cha',
    'Born of a supernatural bloodline, a warlock seeks to master the perilous magic that suffuses his soul. Unlike sorcerers or wizards, who approach arcane magic through the medium of spells, a warlock invokes powerful magic through nothing more than an effort of will. By harnessing his innate magical gift through fearsome determination and force of will, a warlock can perform feats of supernatural stealth, beguile the weak-minded, or scour his foes with blasts of eldritch power.

Many warlocks are champions of dark and chaotic powers. Long ago, they (or in some cases, their ancestors) forged grim pacts with dangerous extraplanar powers, trading portions of their souls in exchange for supernatural power. While many warlocks have turned away from evil, seeking to undo the wrongs of their former colleagues, they are still chained by the old pacts through which they acquired their powers. The demand to further the designs of their dark patrons, or to resist them, drives most warlocks to seek the opportunities for power, wealth, and great deeds (for good or ill) offered by adventuring.

Warlocks harbor great reserves of mystical energy. The font of dark magic burning in their souls makes them resistant to many forms of attack and arms them with dangerous power. Warlocks do not wield spells, but they do learn to harness their power to perform a small number of specific attacks and tricks called invocations. Warlocks make up for their lack of versatility by being tougher and more resilient than sorcerers or wizards.',
    ARRAY['Will'],
    'Complete Arcane / Complete Psionic / Oriental Adventures'
);

-- Shugenja
INSERT INTO classes (
    slug, name, hit_die, skill_points_per_level,
    class_skills, weapon_proficiencies, armor_proficiencies,
    bab_progression, fort_save, ref_save, will_save,
    primary_ability, description, good_saves, source
) VALUES (
    'shugenja',
    'Shugenja',
    'd6',
    2,
    ARRAY['Concentration', 'Craft', 'Diplomacy', 'Heal', 'Knowledge (all skills, taken individually)', 'Profession', 'and Spellcraft'],
    ARRAY['all simple weapons and with the short sword (they often carry a masterwork short sword called a wakizashi)'],
    ARRAY['Light armor'],
    'medium',
    'poor',
    'poor',
    'good',
    'Wis',
    'A class inspired by the mythologies of Asian cultures, the shugenja is a divine spellcaster who casts spells by attuning himself to the primal energies around him and focusing such energy through his body to produce magical effects. Like the samurai (described in Complete Warrior), shugenjas are often members of the noble class, though they are not as bound by honor and the code of bushido as their martial counterparts.

Shugenjas often adventure to increase their magical knowledge and personal power. They are particularly drawn to investigate disturbances in the natural harmony of the four classical elements (earth, air, fire, and water). Some shugenjas dedicate their lives to keeping the world''s magic in balance, while others simply crave the power that the unchecked elements offer. Still others are drawn to plumb the depths of magic for magic''s own sake, hoping eventually to learn the mysteries of void, the "fifth element" that binds the others together.

Shugenjas are much more than spell slinging sorcerers. In a fantasy culture inspired by real-world Japan, they can be the foundation of religious life - priests who teach the rituals of piety, venerate the memory of long-departed ancestors, and even measure the passage of time. They study for years to learn even the fundamental elements of their magical practice, and are the most literate class in many quasi-Asian societies. A shugenja''s spells are written on ofudas (nonmagical prayer scrolls) that the shugenja carries with him, serving as a divine focus for casting the spell.',
    ARRAY['Will'],
    'Complete Arcane / Complete Psionic / Oriental Adventures'
);

-- Wu Jen
INSERT INTO classes (
    slug, name, hit_die, skill_points_per_level,
    class_skills, weapon_proficiencies, armor_proficiencies,
    bab_progression, fort_save, ref_save, will_save,
    primary_ability, description, good_saves, source
) VALUES (
    'wu_jen',
    'Wu Jen',
    'd4',
    2,
    ARRAY['Concentration', 'Craft', 'Knowledge(all skills, taken individually)', 'Profession', 'Spellcraft'],
    ARRAY['all simple weapons'],
    ARRAY['Light armor'],
    'medium',
    'poor',
    'poor',
    'good',
    'Int',
    'Wu jen are spellcasters with mysterious powers. They command the elements, spirit forces, and the powers of nature. They are seldom found living with the rest of human society. Instead, they live as hermits in the wilderness, purifying their bodies and minds to contact the various natural and supernatural powers of the world. From these entities they learn their spells - magical means to control the invisible forces of the world.

Wu jen typically adventure to expand their knowledge of the world, both magical and mundane. Like wizards, they tend to approach adventures with careful planning, since their daily spell selection is vitally important.

Wu jen are the arcane spellcasters of the Far East. As with wizards, their spells are their primary class feature, and as such assume an all-important role in their lives. Many wu jen spells draw on the power of the five elements (earth, fire, metal, water, and wood). finally, wu jen are adept at manipulating their spells, increasing their range, duration, or effect, or eliminating verbal or somatic components through permanent metamagic effects.',
    ARRAY['Will'],
    'Complete Arcane / Complete Psionic / Oriental Adventures'
);

