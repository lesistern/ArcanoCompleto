-- ============================================================================
-- DOTES DEL PLAYER'S HANDBOOK
-- Total de dotes: 109
-- ============================================================================

-- Insertar dotes
INSERT INTO public.feats (
  slug, name, category, prerequisites, benefit, special, normal
)
VALUES
  ('acrobatic', 'Acrobatic', 'General', 'None', 'You get a +2 bonus on all Jump checks and Tumble checks.', NULL, NULL),
  ('agile', 'Agile', 'General', 'None', 'You get a +2 bonus on all Balance checks and Escape Artist checks.', NULL, NULL),
  ('alertness', 'Alertness', 'General', 'None', 'You get a +2 bonus on all Listen checks and Spot checks.', 'The master of a familiar gains the benefit of the Alertness feat whenever the familiar is within arm’s reach.', NULL),
  ('animal-affinity', 'Animal Affinity', 'General', 'None', 'You get a +2 bonus on all Handle Animal checks and Ride checks.', NULL, NULL),
  ('armor-proficiency-heavy', 'Armor Proficiency (Heavy)', 'General', 'Armor Proficiency (light), Armor Proficiency (medium).', 'See Armor Proficiency (light).', 'Fighters, paladins, and clerics automatically have Armor Proficiency (heavy) as a bonus feat. They need not select it.', 'See Armor Proficiency (light).'),
  ('armor-proficiency-light', 'Armor Proficiency (Light)', 'General', 'None', 'When you wear a type of armor with which you are proficient, the armor check penalty for that armor applies only to Balance, Climb, Escape Artist, Hide, Jump, Move Silently, Sleight of Hand, and Tumble checks.', 'All characters except wizards, sorcerers, and monks automatically have Armor Proficiency (light) as a bonus feat. They need not select it.', 'A character who is wearing armor with which she is not proficient applies its armor check penalty to attack rolls and to all skill checks that involve moving, including Ride.'),
  ('armor-proficiency-medium', 'Armor Proficiency (Medium)', 'General', 'Armor Proficiency (light).', 'See Armor Proficiency (light).', 'Fighters, barbarians, paladins, clerics, druids, and bards automatically have Armor Proficiency (medium) as a bonus feat. They need not select it.', 'See Armor Proficiency (light).'),
  ('athletic', 'Athletic', 'General', 'None', 'You get a +2 bonus on all Climb checks and Swim checks.', NULL, NULL),
  ('augment-summoning', 'Augment Summoning', 'General', 'Spell Focus (conjuration).', 'Each creature you conjure with any summon spell gains a +4 enhancement bonus to Strength and Constitution for the duration of the spell that summoned it.', NULL, NULL),
  ('blind-fight', 'Blind-Fight', 'General', 'None', 'In melee, every time you miss because of concealment, you can reroll your miss chance percentile roll one time to see if you actually hit.

An invisible attacker gets no advantages related to hitting you in melee. That is, you don’t lose your Dexterity bonus to Armor Class, and the attacker doesn’t get the usual +2 bonus for being invisible. The invisible attacker’s bonuses do still apply for ranged attacks, however.

You take only half the usual penalty to speed for being unable to see. Darkness and poor visibility in general reduces your speed to three-quarters normal, instead of one-half.', 'The Blind-Fight feat is of no use against a character who is the subject of a blink spell.

A fighter may select Blind-Fight as one of his fighter bonus feats.', 'Regular attack roll modifiers for invisible attackers trying to hit you apply, and you lose your Dexterity bonus to AC. The speed reduction for darkness and poor visibility also applies.'),
  ('brew-potion', 'Brew Potion', 'Creación de objetos', 'Caster level 3rd.', 'You can create a potion of any 3rd-level or lower spell that you know and that targets one or more creatures. Brewing a potion takes one day. When you create a potion, you set the caster level, which must be sufficient to cast the spell in question and no higher than your own level. The base price of a potion is its spell level × its caster level × 50 gp. To brew a potion, you must spend 1/25 of this base price in XP and use up raw materials costing one half this base price.

When you create a potion, you make any choices that you would normally make when casting the spell. Whoever drinks the potion is the target of the spell.

Any potion that stores a spell with a costly material component or an XP cost also carries a commensurate cost. In addition to the costs derived from the base price, you must expend the material component or pay the XP when creating the potion.', NULL, NULL),
  ('cleave', 'Cleave', 'General', 'Str 13, Power Attack.', 'If you deal a creature enough damage to make it drop (typically by dropping it to below 0 hit points or killing it), you get an immediate, extra melee attack against another creature within reach. You cannot take a 5-foot step before making this extra attack. The extra attack is with the same weapon and at the same bonus as the attack that dropped the previous creature. You can use this ability once per round.', 'A fighter may select Cleave as one of his fighter bonus feats.', NULL),
  ('combat-casting', 'Combat Casting', 'General', 'None', 'You get a +4 bonus on Concentration checks made to cast a spell or use a spell-like ability while on the defensive or while you are grappling or pinned.', NULL, NULL),
  ('combat-expertise', 'Combat Expertise', 'General', 'Int 13.', 'When you use the attack action or the full attack action in melee, you can take a penalty of as much as -5 on your attack roll and add the same number (+5 or less) as a dodge bonus to your Armor Class. This number may not exceed your base attack bonus. The changes to attack rolls and Armor Class last until your next action.', 'A fighter may select Combat Expertise as one of his fighter bonus feats.', 'A character without the Combat Expertise feat can fight defensively while using the attack or full attack action to take a -4 penalty on attack rolls and gain a +2 dodge bonus to Armor Class.'),
  ('combat-reflexes', 'Combat Reflexes', 'General', 'None', 'You may make a number of additional attacks of opportunity equal to your Dexterity bonus.

With this feat, you may also make attacks of opportunity while flat-footed.', 'The Combat Reflexes feat does not allow a rogue to use her opportunist ability more than once per round.

A fighter may select Combat Reflexes as one of his fighter bonus feats.

A monk may select Combat Reflexes as a bonus feat at 2nd level.', 'A character without this feat can make only one attack of opportunity per round and can’t make attacks of opportunity while flat-footed.'),
  ('craft-magic-arms-and-armor', 'Craft Magic Arms And Armor', 'Creación de objetos', 'Caster level 5th.', 'You can create any magic weapon, armor, or shield whose prerequisites you meet. Enhancing a weapon, suit of armor, or shield takes one day for each 1,000 gp in the price of its magical features. To enhance a weapon, suit of armor, or shield, you must spend 1/25 of its features’ total price in XP and use up raw materials costing one-half of this total price.

The weapon, armor, or shield to be enhanced must be a masterwork item that you provide. Its cost is not included in the above cost.

You can also mend a broken magic weapon, suit of armor, or shield if it is one that you could make. Doing so costs half the XP, half the raw materials, and half the time it would take to craft that item in the first place.', NULL, NULL),
  ('craft-rod', 'Craft Rod', 'Creación de objetos', 'Caster level 9th.', 'You can create any rod whose prerequisites you meet. Crafting a rod takes one day for each 1,000 gp in its base price. To craft a rod, you must spend 1/25 of its base price in XP and use up raw materials costing one-half of its base price.

Some rods incur extra costs in material components or XP, as noted in their descriptions. These costs are in addition to those derived from the rod’s base price.', NULL, NULL),
  ('craft-staff', 'Craft Staff', 'Creación de objetos', 'Caster level 12th.', 'You can create any staff whose prerequisites you meet.

Crafting a staff takes one day for each 1,000 gp in its base price. To craft a staff, you must spend 1/25 of its base price in XP and use up raw materials costing one-half of its base price. A newly created staff has 50 charges.

Some staffs incur extra costs in material components or XP, as noted in their descriptions. These costs are in addition to those derived from the staff’s base price.', NULL, NULL),
  ('craft-wand', 'Craft Wand', 'Creación de objetos', 'Caster level 5th.', 'You can create a wand of any 4th-level or lower spell that you know. Crafting a wand takes one day for each 1,000 gp in its base price. The base price of a wand is its caster level × the spell level × 750 gp. To craft a wand, you must spend 1/25 of this base price in XP and use up raw materials costing one-half of this base price. A newly created wand has 50 charges.

Any wand that stores a spell with a costly material component or an XP cost also carries a commensurate cost. In addition to the cost derived from the base price, you must expend fifty copies of the material component or pay fifty times the XP cost.', NULL, NULL),
  ('craft-wondrous-item', 'Craft Wondrous Item', 'Creación de objetos', 'Caster level 3rd.', 'You can create any wondrous item whose prerequisites you meet. Enchanting a wondrous item takes one day for each 1,000 gp in its price. To enchant a wondrous item, you must spend 1/25 of the item’s price in XP and use up raw materials costing half of this price.

You can also mend a broken wondrous item if it is one that you could make. Doing so costs half the XP, half the raw materials, and half the time it would take to craft that item in the first place.

Some wondrous items incur extra costs in material components or XP, as noted in their descriptions. These costs are in addition to those derived from the item’s base price. You must pay such a cost to create an item or to mend a broken one.', NULL, NULL),
  ('deceitful', 'Deceitful', 'General', 'None', 'You get a +2 bonus on all Disguise checks and Forgery checks.', NULL, NULL),
  ('deflect-arrows', 'Deflect Arrows', 'General', 'Dex 13, Improved Unarmed Strike.', 'You must have at least one hand free (holding nothing) to use this feat. Once per round when you would normally be hit with a ranged weapon, you may deflect it so that you take no damage from it. You must be aware of the attack and not flat-footed.

Attempting to deflect a ranged weapon doesn’t count as an action. Unusually massive ranged weapons and ranged attacks generated by spell effects can’t be deflected.', 'A monk may select Deflect Arrows as a bonus feat at 2nd level, even if she does not meet the prerequisites.

A fighter may select Deflect Arrows as one of his fighter bonus feats.', NULL),
  ('deft-hands', 'Deft Hands', 'General', 'None', 'You get a +2 bonus on all Sleight of Hand checks and Use Rope checks.', NULL, NULL),
  ('diehard', 'Diehard', 'General', 'Endurance.', 'When reduced to between -1 and -9 hit points, you automatically become stable. You don’t have to roll d% to see if you lose 1 hit point each round.

When reduced to negative hit points, you may choose to act as if you were disabled, rather than dying. You must make this decision as soon as you are reduced to negative hit points (even if it isn’t your turn). If you do not choose to act as if you were disabled, you immediately fall unconscious.

When using this feat, you can take either a single move or standard action each turn, but not both, and you cannot take a full round action. You can take a move action without further injuring yourself, but if you perform any standard action (or any other action deemed as strenuous, including some free actions, swift actions, or immediate actions, such as casting a quickened spell) you take 1 point of damage after completing the act. If you reach -10 hit points, you immediately die.', NULL, 'A character without this feat who is reduced to between -1 and -9 hit points is unconscious and dying.'),
  ('diligent', 'Diligent', 'General', 'None', 'You get a +2 bonus on all Appraise checks and Decipher Script checks.', NULL, NULL),
  ('dodge', 'Dodge', 'General', 'Dex 13.', 'During your action, you designate an opponent and receive a +1 dodge bonus to Armor Class against attacks from that opponent. You can select a new opponent on any action.

A condition that makes you lose your Dexterity bonus to Armor Class (if any) also makes you lose dodge bonuses. Also, dodge bonuses stack with each other, unlike most other types of bonuses.', 'A fighter may select Dodge as one of his fighter bonus feats.', NULL),
  ('empower-spell', 'Empower Spell', 'Metamágica', 'None', 'All variable, numeric effects of an empowered spell are increased by one-half.

Saving throws and opposed rolls are not affected, nor are spells without random variables. An empowered spell uses up a spell slot two levels higher than the spell’s actual level.', NULL, NULL),
  ('endurance', 'Endurance', 'General', 'None', 'You gain a +4 bonus on the following checks and saves: Swim checks made to resist nonlethal damage, Constitution checks made to continue running, Constitution checks made to avoid nonlethal damage from a forced march, Constitution checks made to hold your breath, Constitution checks made to avoid nonlethal damage from starvation or thirst, Fortitude saves made to avoid nonlethal damage from hot or cold environments, and Fortitude saves made to resist damage from suffocation. Also, you may sleep in light or medium armor without becoming fatigued.', 'A ranger automatically gains Endurance as a bonus feat at 3rd level. He need not select it.', 'A character without this feat who sleeps in medium or heavier armor is automatically fatigued the next day.'),
  ('enlarge-spell', 'Enlarge Spell', 'Metamágica', 'None', 'You can alter a spell with a range of close, medium, or long to increase its range by 100%. An enlarged spell with a range of close now has a range of 50 ft. + 5 ft./level, while medium-range spells have a range of 200 ft. + 20 ft./level and long-range spells have a range of 800 ft. + 80 ft./level. An enlarged spell uses up a spell slot one level higher than the spell’s actual level.

Spells whose ranges are not defined by distance, as well as spells whose ranges are not close, medium, or long, do not have increased ranges.', NULL, NULL),
  ('eschew-materials', 'Eschew Materials', 'General', 'None', 'You can cast any spell that has a material component costing 1 gp or less without needing that component. (The casting of the spell still provokes attacks of opportunity as normal.) If the spell requires a material component that costs more than 1 gp, you must have the material component at hand to cast the spell, just as normal.', NULL, NULL),
  ('exotic-weapon-proficiency', 'Exotic Weapon Proficiency', 'General', 'Base attack bonus +1 (plus Str 13 for bastard sword or dwarven waraxe).', 'Choose a type of exotic weapon. You understand how to use that type of exotic weapon in combat.

You make attack rolls with the weapon normally.', 'You can gain Exotic Weapon Proficiency multiple times. Each time you take the feat, it applies to a new type of exotic weapon. Proficiency with the bastard sword or the dwarven waraxe has an additional prerequisite of Str 13.

A fighter may select Exotic Weapon Proficiency as one of his fighter bonus feats.', 'A character who uses a weapon with which he or she is not proficient takes a -4 penalty on attack rolls.'),
  ('extend-spell', 'Extend Spell', 'Metamágica', 'None', 'An extended spell lasts twice as long as normal. A spell with a duration of concentration, instantaneous, or permanent is not affected by this feat. An extended spell uses up a spell slot one level higher than the spell’s actual level.', NULL, NULL),
  ('extra-turning', 'Extra Turning', 'General', 'Ability to turn or rebuke creatures.', 'Each time you take this feat, you can use your ability to turn or rebuke creatures four more times per day than normal.

If you have the ability to turn or rebuke more than one kind of creature each of your turning or rebuking abilities gains four additional uses per day.', 'You can gain Extra Turning multiple times. Its effects stack. Each time you take the feat, you can use each of your turning or rebuking abilities four additional times per day.', 'Without this feat, a character can typically turn or rebuke undead (or other creatures) a number of times per day equal to 3 + his or her Charisma modifier.'),
  ('far-shot', 'Far Shot', 'General', 'Point Blank Shot.', 'When you use a projectile weapon, such as a bow, its range increment increases by one-half (multiply by 1½). When you use a thrown weapon, its range increment is doubled.', 'A fighter may select Far Shot as one of his fighter bonus feats.', NULL),
  ('forge-ring', 'Forge Ring', 'Creación de objetos', 'Caster level 12th.', 'You can create any ring whose prerequisites you meet. Crafting a ring takes one day for each 1,000 gp in its base price. To craft a ring, you must spend 1/25 of its base price in XP and use up raw materials costing one-half of its base price.

You can also mend a broken ring if it is one that you could make. Doing so costs half the XP, half the raw materials, and half the time it would take to forge that ring in the first place.

Some magic rings incur extra costs in material components or XP, as noted in their descriptions. You must pay such a cost to forge such a ring or to mend a broken one.', NULL, NULL),
  ('great-cleave', 'Great Cleave', 'General', 'Str 13, Cleave, Power Attack, base attack bonus +4.', 'This feat works like Cleave, except that there is no limit to the number of times you can use it per round.', 'A fighter may select Great Cleave as one of his fighter bonus feats.', NULL),
  ('great-fortitude', 'Great Fortitude', 'General', 'None', 'You get a +2 bonus on all Fortitude saving throws.', NULL, NULL),
  ('greater-spell-focus', 'Greater Spell Focus', 'General', 'None', 'Choose a school of magic to which you already have applied the Spell Focus feat.

Add +1 to the Difficulty Class for all saving throws against spells from the school of magic you select. This bonus stacks with the bonus from Spell Focus.', 'You can gain this feat multiple times. Its effects do not stack. Each time you take the feat, it applies to a new school of magic to which you already have applied the Spell Focus feat.', NULL),
  ('greater-spell-penetration', 'Greater Spell Penetration', 'General', 'Spell Penetration.', 'You get a +2 bonus on caster level checks (1d20 + caster level) made to overcome a creature’s spell resistance. This bonus stacks with the one from Spell Penetration.', NULL, NULL),
  ('greater-two-weapon-fighting', 'Greater Two-Weapon Fighting', 'General', 'Dex 19, Improved Two-Weapon Fighting, Two-Weapon Fighting, base attack bonus +11.', 'You get a third attack with your off-hand weapon, albeit at a -10 penalty. See the Two-Weapon Fighting special attack.', 'A fighter may select Greater Two-Weapon Fighting as one of his fighter bonus feats.

An 11th-level ranger who has chosen the two-weapon combat style is treated as having Greater Two-Weapon Fighting, even if he does not have the prerequisites for it, but only when he is wearing light or no armor.', NULL),
  ('greater-weapon-focus', 'Greater Weapon Focus', 'General', 'Proficiency with selected weapon, Weapon Focus with selected weapon, fighter level 8th.', 'Choose one type of weapon for which you have already selected Weapon Focus. You can also choose unarmed strike or grapple as your weapon for purposes of this feat.

You gain a +1 bonus on all attack rolls you make using the selected weapon. This bonus stacks with other bonuses on attack rolls, including the one from Weapon Focus (see below).', 'You can gain Greater Weapon Focus multiple times. Its effects do not stack. Each time you take the feat, it applies to a new type of weapon.

A fighter must have Greater Weapon Focus with a given weapon to gain the Greater Weapon Specialization feat for that weapon.

A fighter may select Greater Weapon Focus as one of his fighter bonus feats.', NULL),
  ('greater-weapon-specialization', 'Greater Weapon Specialization', 'General', 'Proficiency with selected weapon, Greater Weapon Focus with selected weapon, Weapon Focus with selected weapon, Weapon Specialization with selected weapon, fighter level 12th.', 'Choose one type of weapon for which you have already selected Weapon Specialization. You can also choose unarmed strike or grapple as your weapon for purposes of this feat.

You gain a +2 bonus on all damage rolls you make using the selected weapon. This bonus stacks with other bonuses on damage rolls, including the one from Weapon Specialization (see below).', 'You can gain Greater Weapon Specialization multiple times. Its effects do not stack. Each time you take the feat, it applies to a new type of weapon.

A fighter may select Greater Weapon Specialization as one of his fighter bonus feats.', NULL),
  ('heighten-spell', 'Heighten Spell', 'Metamágica', 'None', 'A heightened spell has a higher spell level than normal (up to a maximum of 9th level). Unlike other metamagic feats, Heighten Spell actually increases the effective level of the spell that it modifies. All effects dependent on spell level (such as saving throw DCs and ability to penetrate a lesser globe of invulnerability) are calculated according to the heightened level. The heightened spell is as difficult to prepare and cast as a spell of its effective level.', NULL, NULL),
  ('improved-bull-rush', 'Improved Bull Rush', 'General', 'Str 13, Power Attack.', 'When you perform a bull rush you do not provoke an attack of opportunity from the defender. You also gain a +4 bonus on the opposed Strength check you make to push back the defender.', 'A fighter may select Improved Bull Rush as one of his fighter bonus feats.', NULL),
  ('improved-counterspell', 'Improved Counterspell', 'General', 'None', 'When counterspelling, you may use a spell of the same school that is one or more spell levels higher than the target spell.', NULL, 'Without this feat, you may counter a spell only with the same spell or with a spell specifically designated as countering the target spell.'),
  ('improved-critical', 'Improved Critical', 'General', 'Proficient with weapon, base attack bonus +8.', 'Choose one type of weapon.

When using the weapon you selected, your threat range is doubled.', 'You can gain Improved Critical multiple times. The effects do not stack. Each time you take the feat, it applies to a new type of weapon.

This effect doesn’t stack with any other effect that expands the threat range of a weapon.

A fighter may select Improved Critical as one of his fighter bonus feats.', NULL),
  ('improved-disarm', 'Improved Disarm', 'General', 'Int 13, Combat Expertise.', 'You do not provoke an attack of opportunity when you attempt to disarm an opponent, nor does the opponent have a chance to disarm you. You also gain a +4 bonus on the opposed attack roll you make to disarm your opponent.', 'A fighter may select Improved Disarm as one of his fighter bonus feats.

A monk may select Improved Disarm as a bonus feat at 6th level, even if she does not meet the prerequisites.', 'See the normal disarm rules.'),
  ('improved-familiar', 'Improved Familiar', 'General', 'Ability to acquire a new familiar, compatible alignment, sufficiently high level (see below).', 'This feat allows spellcasters to acquire a new familiar from a nonstandard list, but only when they could normally acquire a new familiar.

When choosing a familiar, the creatures listed below are also available to the spellcaster. The spellcaster may choose a familiar with an alignment up to one step away on each of the alignment axes (lawful through chaotic, good through evil).

Improved familiars otherwise use the rules for regular familiars, with two exceptions: If the creature’s type is something other than animal, its type does not change; and improved familiars do not gain the ability to speak with other creatures of their kind (although many of them already have the ability to communicate).

The list in Table: Improved Familiar by Alignment presents only a few possible improved familiars. Almost any creature of the same general size and power as those on the list makes a suitable familiar. Nor is the master’s alignment the only possible categorization. For instance, improved familiars could be assigned by the master’s creature type or subtype, as shown in Table: Improved Familiar by Type/Subtype.', NULL, NULL),
  ('improved-feint', 'Improved Feint', 'General', 'Int 13, Combat Expertise.', 'You can make a Bluff check to feint in combat as a move action.', NULL, 'Feinting in combat is a standard action.

A fighter may select Improved Feint as one of his fighter bonus feats.'),
  ('improved-grapple', 'Improved Grapple', 'General', 'Dex 13, Improved Unarmed Strike.', 'You do not provoke an attack of opportunity when you make a touch attack to start a grapple. You also gain a +4 bonus on all grapple checks, regardless of whether you started the grapple.', 'A fighter may select Improved Grapple as one of his fighter bonus feats.

A monk may select Improved Grapple as a bonus feat at 1st level, even if she does not meet the prerequisites.', 'Without this feat, you provoke an attack of opportunity when you make a touch attack to start a grapple.'),
  ('improved-initiative', 'Improved Initiative', 'General', 'None', 'You get a +4 bonus on initiative checks.', 'A fighter may select Improved Initiative as one of his fighter bonus feats.', NULL),
  ('improved-overrun', 'Improved Overrun', 'General', 'Str 13, Power Attack.', 'When you attempt to overrun an opponent, the target may not choose to avoid you. You also gain a +4 bonus on your Strength check to knock down your opponent.', 'A fighter may select Improved Overrun as one of his fighter bonus feats.', 'Without this feat, the target of an overrun can choose to avoid you or to block you.'),
  ('improved-precise-shot', 'Improved Precise Shot', 'General', 'Dex 19, Point Blank Shot, Precise Shot, base attack bonus +11.', 'Your ranged attacks ignore the AC bonus granted to targets by anything less than total cover, and the miss chance granted to targets by anything less than total concealment. Total cover and total concealment provide their normal benefits against your ranged attacks.

In addition, when you shoot or throw ranged weapons at a grappling opponent, you automatically strike at the opponent you have chosen.', 'A fighter may select Improved Precise Shot as one of his fighter bonus feats.

An 11th-level ranger who has chosen the archery combat style is treated as having Improved Precise Shot, even if he does not have the prerequisites for it, but only when he is wearing light or no armor.', 'See the normal rules on the effects of cover and concealment. Without this feat, a character who shoots or throws a ranged weapon at a target involved in a grapple must roll randomly to see which grappling combatant the attack strikes.'),
  ('improved-shield-bash', 'Improved Shield Bash', 'General', 'Shield Proficiency.', 'When you perform a shield bash, you may still apply the shield’s shield bonus to your AC.', 'A fighter may select Improved Shield Bash as one of his fighter bonus feats.', 'Without this feat, a character who performs a shield bash loses the shield’s shield bonus to AC until his or her next turn.'),
  ('improved-sunder', 'Improved Sunder', 'General', 'Str 13, Power Attack.', 'When you strike at an object held or carried by an opponent (such as a weapon or shield), you do not provoke an attack of opportunity.

You also gain a +4 bonus on any attack roll made to attack an object held or carried by another character.', 'A fighter may select Improved Sunder as one of his fighter bonus feats.', 'Without this feat, you provoke an attack of opportunity when you strike at an object held or carried by another character.'),
  ('improved-trip', 'Improved Trip', 'General', 'Int 13, Combat Expertise.', 'You do not provoke an attack of opportunity when you attempt to trip an opponent while you are unarmed. You also gain a +4 bonus on your Strength check to trip your opponent.

If you trip an opponent in melee combat, you immediately get a melee attack against that opponent as if you hadn’t used your attack for the trip attempt.', 'At 6th level, a monk may select Improved Trip as a bonus feat, even if she does not have the prerequisites.

A fighter may select Improved Trip as one of his fighter bonus feats.', 'Without this feat, you provoke an attack of opportunity when you attempt to trip an opponent while you are unarmed.'),
  ('improved-turning', 'Improved Turning', 'General', 'Ability to turn or rebuke creatures.', 'You turn or rebuke creatures as if you were one level higher than you are in the class that grants you the ability.', NULL, NULL),
  ('improved-two-weapon-fighting', 'Improved Two-Weapon Fighting', 'General', 'Dex 17, Two-Weapon Fighting, base attack bonus +6.', 'In addition to the standard single extra attack you get with an off-hand weapon, you get a second attack with it, albeit at a -5 penalty. See the Two-Weapon Fighting special attack.', 'A fighter may select Improved Two-Weapon Fighting as one of his fighter bonus feats.

A 6th-level ranger who has chosen the two-weapon combat style is treated as having Improved Two-Weapon Fighting, even if he does not have the prerequisites for it, but only when he is wearing light or no armor.', 'Without this feat, you can only get a single extra attack with an off-hand weapon.'),
  ('improved-unarmed-strike', 'Improved Unarmed Strike', 'General', 'None', 'You are considered to be armed even when unarmed —that is, you do not provoke attacks or opportunity from armed opponents when you attack them while unarmed. However, you still get an attack of opportunity against any opponent who makes an unarmed attack on you.

In addition, your unarmed strikes can deal lethal or nonlethal damage, at your option.', 'A monk automatically gains Improved Unarmed Strike as a bonus feat at 1st level. She need not select it.

A fighter may select Improved Unarmed Strike as one of his fighter bonus feats.', 'Without this feat, you are considered unarmed when attacking with an unarmed strike, and you can deal only nonlethal damage with such an attack.'),
  ('investigator', 'Investigator', 'General', 'None', 'You get a +2 bonus on all Gather Information checks and Search checks.', NULL, NULL),
  ('iron-will', 'Iron Will', 'General', 'None', 'You get a +2 bonus on all Will saving throws.', NULL, NULL),
  ('leadership', 'Leadership', 'General', 'Character level 6th.', 'Having this feat enables the character to attract loyal companions and devoted followers, subordinates who assist her. See the table below for what sort of cohort and how many followers the character can recruit.

A character’s base Leadership score equals his level plus any Charisma modifier. In order to take into account negative Charisma modifiers, this table allows for very low Leadership scores, but the character must still be 6th level or higher in order to gain the Leadership feat. Outside factors can affect a character’s Leadership score, as detailed above.

The character can attract a cohort of up to this level. Regardless of a character’s Leadership score, he can only recruit a cohort who is two or more levels lower than himself. The cohort should be equipped with gear appropriate for its level. A character can try to attract a cohort of a particular race, class, and alignment. The cohort’s alignment may not be opposed to the leader’s alignment on either the law-vs-chaos or good-vs-evil axis, and the leader takes a Leadership penalty if he recruits a cohort of an alignment different from his own.

Cohorts earn XP as follows:

The cohort does not count as a party member when determining the party’s XP.

Divide the cohort’s level by the level of the PC with whom he or she is associated (the character with the Leadership feat who attracted the cohort).

Multiply this result by the total XP awarded to the PC and add that number of experience points to the cohort’s total.

If a cohort gains enough XP to bring it to a level one lower than the associated PC’s character level, the cohort does not gain the new level—its new XP total is 1 less than the amount needed attain the next level.

The character can lead up to the indicated number of characters of each level. Followers are similar to cohorts, except they’re generally low-level NPCs. Because they’re generally five or more levels behind the character they follow, they’re rarely effective in combat.

Followers don’t earn experience and thus don’t gain levels. However, when a character with Leadership attains a new level, the player consults the table above to determine if she has acquired more followers, some of which may be higher level than the existing followers. (You don’t consult the table to see if your cohort gains levels, however, because cohorts earn experience on their own.)

Several factors can affect a character’s Leadership score, causing it to vary from the base score (character level + Cha modifier). A character’s reputation (from the point of view of the cohort or follower he is trying to attract) raises or lowers his Leadership score, see Table: Reputation.

Other modifiers may apply when the character tries to attract a cohort, see Table: Attracting Cohorts.

Followers have different priorities from cohorts. When the character tries to attract a new follower, use any of the modifiers that apply on Table: Attracting Followers.', NULL, NULL),
  ('lightning-reflexes', 'Lightning Reflexes', 'General', 'None', 'You get a +2 bonus on all Reflex saving throws.', NULL, NULL),
  ('magical-aptitude', 'Magical Aptitude', 'General', 'None', 'You get a +2 bonus on all Spellcraft checks and Use Magic Device checks.', NULL, NULL),
  ('manyshot', 'Manyshot', 'General', 'Dex 17, Point Blank Shot, Rapid Shot, base attack bonus +6', 'As a standard action, you may fire two arrows at a single opponent within 30 feet. Both arrows use the same attack roll (with a -4 penalty) to determine success and deal damage normally (but see Special).

For every five points of base attack bonus you have above +6, you may add one additional arrow to this attack, to a maximum of four arrows at a base attack bonus of +16. However, each arrow after the second adds a cumulative -2 penalty on the attack roll (for a total penalty of -6 for three arrows and -8 for four).

Damage reduction and other resistances apply separately against each arrow fired.', 'Regardless of the number of arrows you fire, you apply precision-based damage only once. If you score a critical hit, only the first arrow fired deals critical damage; all others deal regular damage.

A fighter may select Manyshot as one of his fighter bonus feats.

A 6th-level ranger who has chosen the archery combat style is treated as having Manyshot even if he does not have the prerequisites for it, but only when he is wearing light or no armor.', NULL),
  ('martial-weapon-proficiency', 'Martial Weapon Proficiency', 'General', 'None', 'Choose a type of martial weapon. You understand how to use that type of martial weapon in combat.

You make attack rolls with the selected weapon normally.', 'Barbarians, fighters, paladins, and rangers are proficient with all martial weapons. They need not select this feat.

You can gain Martial Weapon Proficiency multiple times. Each time you take the feat, it applies to a new type of weapon.

A cleric who chooses the War domain automatically gains the Martial Weapon Proficiency feat related to his deity’s favored weapon as a bonus feat, if the weapon is a martial one. He need not select it.', 'When using a weapon with which you are not proficient, you take a -4 penalty on attack rolls.'),
  ('maximize-spell', 'Maximize Spell', 'Metamágica', 'None', 'All variable, numeric effects of a spell modified by this feat are maximized. Saving throws and opposed rolls are not affected, nor are spells without random variables. A maximized spell uses up a spell slot three levels higher than the spell’s actual level.

An empowered, maximized spell gains the separate benefits of each feat: the maximum result plus one-half the normally rolled result.', NULL, NULL),
  ('mobility', 'Mobility', 'General', 'Dex 13, Dodge.', 'You get a +4 dodge bonus to Armor Class against attacks of opportunity caused when you move out of or within a threatened area. A condition that makes you lose your Dexterity bonus to Armor Class (if any) also makes you lose dodge bonuses.

Dodge bonuses stack with each other, unlike most types of bonuses.', 'A fighter may select Mobility as one of his fighter bonus feats.', NULL),
  ('mounted-archery', 'Mounted Archery', 'General', 'Ride 1 rank, Mounted Combat.', 'The penalty you take when using a ranged weapon while mounted is halved: -2 instead of -4 if your mount is taking a double move, and -4 instead of -8 if your mount is running.', 'A fighter may select Mounted Archery as one of his fighter bonus feats.', NULL),
  ('mounted-combat', 'Mounted Combat', 'General', 'Ride 1 rank.', 'Once per round when your mount is hit in combat, you may attempt a Ride check (as a reaction) to negate the hit. The hit is negated if your Ride check result is greater than the opponent’s attack roll. (Essentially, the Ride check result becomes the mount’s Armor Class if it’s higher than the mount’s regular AC.)', 'A fighter may select Mounted Combat as one of his fighter bonus feats.', NULL),
  ('natural-spell', 'Natural Spell', 'General', 'Wis 13, wild shape ability.', 'You can complete the verbal and somatic components of spells while in a wild shape. You substitute various noises and gestures for the normal verbal and somatic components of a spell.

You can also use any material components or focuses you possess, even if such items are melded within your current form. This feat does not permit the use of magic items while you are in a form that could not ordinarily use them, and you do not gain the ability to speak while in a wild shape.', NULL, NULL),
  ('negotiator', 'Negotiator', 'General', 'None', 'You get a +2 bonus on all Diplomacy checks and Sense Motive checks.', NULL, NULL),
  ('nimble-fingers', 'Nimble Fingers', 'General', 'None', 'You get a +2 bonus on all Disable Device checks and Open Lock checks.', NULL, NULL),
  ('persuasive', 'Persuasive', 'General', 'None', 'You get a +2 bonus on all Bluff checks and Intimidate checks.', NULL, NULL),
  ('point-blank-shot', 'Point Blank Shot', 'General', 'None', 'You get a +1 bonus on attack and damage rolls with ranged weapons at ranges of up to 30 feet.', 'A fighter may select Point Blank Shot as one of his fighter bonus feats.', NULL),
  ('power-attack', 'Power Attack', 'General', 'Str 13.', 'On your action, before making attack rolls for a round, you may choose to subtract a number from all melee attack rolls and add the same number to all melee damage rolls. This number may not exceed your base attack bonus. The penalty on attacks and bonus on damage apply until your next turn.', 'If you attack with a two-handed weapon, or with a one-handed weapon wielded in two hands, instead add twice the number subtracted from your attack rolls. You can’t add the bonus from Power Attack to the damage dealt with a light weapon (except with unarmed strikes or natural weapon attacks), even though the penalty on attack rolls still applies. (Normally, you treat a double weapon as a one-handed weapon and a light weapon. If you choose to use a double weapon like a two-handed weapon, attacking with only one end of it in a round, you treat it as a two-handed weapon.)

A fighter may select Power Attack as one of his fighter bonus feats.', NULL),
  ('precise-shot', 'Precise Shot', 'General', 'Point Blank Shot.', 'You can shoot or throw ranged weapons at an opponent engaged in melee without taking the standard -4 penalty on your attack roll.', 'A fighter may select Precise Shot as one of his fighter bonus feats.', NULL),
  ('quick-draw', 'Quick Draw', 'General', 'Base attack bonus +1.', 'You can draw a weapon as a free action instead of as a move action. You can draw a hidden weapon (see the Sleight of Hand skill) as a move action.

A character who has selected this feat may throw weapons at his full normal rate of attacks (much like a character with a bow).', 'A fighter may select Quick Draw as one of his fighter bonus feats.', 'Without this feat, you may draw a weapon as a move action, or (if your base attack bonus is +1 or higher) as a free action as part of movement. Without this feat, you can draw a hidden weapon as a standard action.'),
  ('quicken-spell', 'Quicken Spell', 'Metamágica', 'None', 'Casting a quickened spell is an swift action. You can perform another action, even casting another spell, in the same round as you cast a quickened spell. You may cast only one quickened spell per round. A spell whose casting time is more than 1 full round action cannot be quickened. A quickened spell uses up a spell slot four levels higher than the spell’s actual level. Casting a quickened spell doesn’t provoke an attack of opportunity.', 'This feat can’t be applied to any spell cast spontaneously (including sorcerer spells, bard spells, and cleric or druid spells cast spontaneously), since applying a metamagic feat to a spontaneously cast spell automatically increases the casting time to a full-round action.', NULL),
  ('rapid-reload', 'Rapid Reload', 'General', 'Weapon Proficiency (crossbow type chosen).', 'Choose a type of crossbow (hand, light, or heavy).

The time required for you to reload your chosen type of crossbow is reduced to a free action (for a hand or light crossbow) or a move action (for a heavy crossbow). Reloading a crossbow still provokes an attack of opportunity.

If you have selected this feat for hand crossbow or light crossbow, you may fire that weapon as many times in a full attack action as you could attack if you were using a bow.', 'You can gain Rapid Reload multiple times. Each time you take the feat, it applies to a new type of crossbow.

A fighter may select Rapid Reload as one of his fighter bonus feats.', 'A character without this feat needs a move action to reload a hand or light crossbow, or a full-round action to reload a heavy crossbow.'),
  ('rapid-shot', 'Rapid Shot', 'General', 'Dex 13, Point Blank Shot.', 'You can get one extra attack per round with a ranged weapon. The attack is at your highest base attack bonus, but each attack you make in that round (the extra one and the normal ones) takes a -2 penalty. You must use the full attack action to use this feat.', 'A fighter may select Rapid Shot as one of his fighter bonus feats.

A 2nd-level ranger who has chosen the archery combat style is treated as having Rapid Shot, even if he does not have the prerequisites for it, but only when he is wearing light or no armor.', NULL),
  ('ride-by-attack', 'Ride-By Attack', 'General', 'Ride 1 rank, Mounted Combat.', 'When you are mounted and use the charge action, you may move and attack as if with a standard charge and then move again (continuing the straight line of the charge). Your total movement for the round can’t exceed double your mounted speed. You and your mount do not provoke an attack of opportunity from the opponent that you attack.', 'A fighter may select Ride-By Attack as one of his fighter bonus feats.', NULL),
  ('run', 'Run', 'General', 'None', 'When running, you move five times your normal speed (if wearing medium, light, or no armor and carrying no more than a medium load) or four times your speed (if wearing heavy armor or carrying a heavy load). If you make a jump after a running start (see the Jump skill description), you gain a +4 bonus on your Jump check. While running, you retain your Dexterity bonus to AC.', NULL, 'You move four times your speed while running (if wearing medium, light, or no armor and carrying no more than a medium load) or three times your speed (if wearing heavy armor or carrying a heavy load), and you lose your Dexterity bonus to AC.'),
  ('scribe-scroll', 'Scribe Scroll', 'Creación de objetos', 'Caster level 1st.', 'You can create a scroll of any spell that you know. Scribing a scroll takes one day for each 1,000 gp in its base price. The base price of a scroll is its spell level × its caster level × 25 gp. To scribe a scroll, you must spend 1/25 of this base price in XP and use up raw materials costing one-half of this base price.

Any scroll that stores a spell with a costly material component or an XP cost also carries a commensurate cost. In addition to the costs derived from the base price, you must expend the material component or pay the XP when scribing the scroll.', NULL, NULL),
  ('self-sufficient', 'Self-Sufficient', 'General', 'None', 'You get a +2 bonus on all Heal checks and Survival checks.', NULL, NULL),
  ('shield-proficiency', 'Shield Proficiency', 'General', 'None', 'You can use a shield and take only the standard penalties.', 'Barbarians, bards, clerics, druids, fighters, paladins, and rangers automatically have Shield Proficiency as a bonus feat. They need not select it.', 'When you are using a shield with which you are not proficient, you take the shield’s armor check penalty on attack rolls and on all skill checks that involve moving, including Ride checks.'),
  ('shot-on-the-run', 'Shot On The Run', 'General', 'Dex 13, Dodge, Mobility, Point Blank Shot, base attack bonus +4.', 'When using the attack action with a ranged weapon, you can move both before and after the attack, provided that your total distance moved is not greater than your speed.', 'A fighter may select Shot on the Run as one of his fighter bonus feats.', NULL),
  ('silent-spell', 'Silent Spell', 'Metamágica', 'None', 'A silent spell can be cast with no verbal components. Spells without verbal components are not affected. A silent spell uses up a spell slot one level higher than the spell’s actual level.', 'Bard spells cannot be enhanced by this metamagic feat.', NULL),
  ('simple-weapon-proficiency', 'Simple Weapon Proficiency', 'General', 'None', 'You make attack rolls with simple weapons normally.', 'All characters except for druids, monks, and wizards are automatically proficient with all simple weapons. They need not select this feat.', 'When using a weapon with which you are not proficient, you take a -4 penalty on attack rolls.'),
  ('skill-focus', 'Skill Focus', 'General', 'None', 'Choose a skill.

You get a +3 bonus on all checks involving that skill.', 'You can gain this feat multiple times. Its effects do not stack. Each time you take the feat, it applies to a new skill.', NULL),
  ('snatch-arrows', 'Snatch Arrows', 'General', 'Dex 15, Deflect Arrows, Improved Unarmed Strike.', 'When using the Deflect Arrows feat you may catch the weapon instead of just deflecting it. Thrown weapons can immediately be thrown back at the original attacker (even though it isn’t your turn) or kept for later use.

You must have at least one hand free (holding nothing) to use this feat.', 'A fighter may select Snatch Arrows as one of his fighter bonus feats.', NULL),
  ('spell-focus', 'Spell Focus', 'General', 'None', 'Choose a school of magic.

Add +1 to the Difficulty Class for all saving throws against spells from the school of magic you select.', 'You can gain this feat multiple times. Its effects do not stack. Each time you take the feat, it applies to a new school of magic.', NULL),
  ('spell-mastery', 'Spell Mastery', 'General', 'Wizard level 1st.', 'Each time you take this feat, choose a number of spells equal to your Intelligence modifier that you already know. From that point on, you can prepare these spells without referring to a spellbook.', NULL, 'Without this feat, you must use a spellbook to prepare all your spells, except read magic.'),
  ('spell-penetration', 'Spell Penetration', 'General', 'None', 'You get a +2 bonus on caster level checks (1d20 + caster level) made to overcome a creature’s spell resistance.', NULL, NULL),
  ('spirited-charge', 'Spirited Charge', 'General', 'Ride 1 rank, Mounted Combat, Ride-By Attack.', 'When mounted and using the charge action, you deal double damage with a melee weapon (or triple damage with a lance).', 'A fighter may select Spirited Charge as one of his fighter bonus feats.', NULL),
  ('spring-attack', 'Spring Attack', 'General', 'Dex 13, Dodge, Mobility, base attack bonus +4.', 'When using the attack action with a melee weapon, you can move both before and after the attack, provided that your total distance moved is not greater than your speed. Moving in this way does not provoke an attack of opportunity from the defender you attack, though it might provoke attacks of opportunity from other creatures, if appropriate. You can’t use this feat if you are wearing heavy armor.

You must move at least 5 feet both before and after you make your attack in order to utilize the benefits of Spring Attack.', 'A fighter may select Spring Attack as one of his fighter bonus feats.', NULL),
  ('stealthy', 'Stealthy', 'General', 'None', 'You get a +2 bonus on all Hide checks and Move Silently checks.', NULL, NULL),
  ('still-spell', 'Still Spell', 'Metamágica', 'None', 'A stilled spell can be cast with no somatic components.

Spells without somatic components are not affected. A stilled spell uses up a spell slot one level higher than the spell’s actual level.', NULL, NULL),
  ('stunning-fist', 'Stunning Fist', 'General', 'Dex 13, Wis 13, Improved Unarmed Strike, base attack bonus +8.', 'You must declare that you are using this feat before you make your attack roll (thus, a failed attack roll ruins the attempt). Stunning Fist forces a foe damaged by your unarmed attack to make a Fortitude saving throw (DC 10 + ½ your character level + your Wis modifier), in addition to dealing damage normally. A defender who fails this saving throw is stunned for 1 round (until just before your next action). A stunned creature drops everything held, can’t take actions, takes a -2 penalty to AC, and loses his Dexterity bonus to AC. You may attempt a stunning attack once per day for every four levels you have attained (but see Special), and no more than once per round. Constructs, oozes, plants, undead, incorporeal creatures, and creatures immune to critical hits cannot be stunned.', 'A monk may select Stunning Fist as a bonus feat at 1st level, even if she does not meet the prerequisites. A monk who selects this feat may attempt a stunning attack a number of times per day equal to her monk level, plus one more time per day for every four levels she has in classes other than monk.

A fighter may select Stunning Fist as one of his fighter bonus feats.', NULL),
  ('toughness', 'Toughness', 'General', 'None', 'You gain +3 hit points.', 'A character may gain this feat multiple times. Its effects stack.', NULL),
  ('tower-shield-proficiency', 'Tower Shield Proficiency', 'General', 'Shield Proficiency.', 'You can use a tower shield and suffer only the standard penalties.', 'Fighters automatically have Tower Shield Proficiency as a bonus feat. They need not select it.', 'A character who is using a shield with which he or she is not proficient takes the shield’s armor check penalty on attack rolls and on all skill checks that involve moving, including Ride.'),
  ('trample', 'Trample', 'General', 'Ride 1 rank, Mounted Combat.', 'When you attempt to overrun an opponent while mounted, your target may not choose to avoid you. Your mount may make one hoof attack against any target you knock down, gaining the standard +4 bonus on attack rolls against prone targets.', 'A fighter may select Trample as one of his fighter bonus feats.', NULL),
  ('two-weapon-defense', 'Two-Weapon Defense', 'General', 'Dex 15, Two-Weapon Fighting.', 'When wielding a double weapon or two weapons (not including natural weapons or unarmed strikes), you gain a +1 shield bonus to your AC. See the Two-Weapon Fighting special attack.

When you are fighting defensively or using the total defense action, this shield bonus increases to +2.', 'A fighter may select Two-Weapon Defense as one of his fighter bonus feats.', NULL),
  ('two-weapon-fighting', 'Two-Weapon Fighting', 'General', 'Dex 15.', 'You can fight with a weapon in each hand. You can make one extra attack each round with the second weapon.

Your penalties on attack rolls for fighting with two weapons are reduced. The penalty for your primary hand lessens by 2 and the one for your off hand lessens by 6. See the Two-Weapon Fighting special attack.', 'A 2nd-level ranger who has chosen the two-weapon combat style is treated as having Two-Weapon Fighting, even if he does not have the prerequisite for it, but only when he is wearing light or no armor.

A fighter may select Two-Weapon Fighting as one of his fighter bonus feats.', 'If you wield a second weapon in your off hand, you can get one extra attack per round with that weapon. When fighting in this way you suffer a -6 penalty with your regular attack or attacks with your primary hand and a -10 penalty to the attack with your off hand. If your off-hand weapon is light the penalties are reduced by 2 each. (An unarmed strike is always considered light.)'),
  ('weapon-finesse', 'Weapon Finesse', 'General', 'Base attack bonus +1.', 'With a light weapon, rapier, whip, or spiked chain made for a creature of your size category, you may use your Dexterity modifier instead of your Strength modifier on attack rolls. If you carry a shield, its armor check penalty applies to your attack rolls.', 'A fighter may select Weapon Finesse as one of his fighter bonus feats.

Natural weapons are always considered light weapons.', NULL),
  ('weapon-focus', 'Weapon Focus', 'General', 'Proficiency with selected weapon, base attack bonus +1.', 'Choose one type of weapon. You can also choose unarmed strike or grapple (or ray, if you are a spellcaster) as your weapon for purposes of this feat.

You gain a +1 bonus on all attack rolls you make using the selected weapon.', 'You can gain this feat multiple times. Its effects do not stack. Each time you take the feat, it applies to a new type of weapon.

A fighter may select Weapon Focus as one of his fighter bonus feats. He must have Weapon Focus with a weapon to gain the Weapon Specialization feat for that weapon.', NULL),
  ('weapon-specialization', 'Weapon Specialization', 'General', 'Proficiency with selected weapon, Weapon Focus with selected weapon, fighter level 4th.', 'Choose one type of weapon for which you have already selected the Weapon Focus feat. You can also choose unarmed strike or grapple as your weapon for purposes of this feat. You deal extra damage when using this weapon.

You gain a +2 bonus on all damage rolls you make using the selected weapon.', 'You can gain this feat multiple times. Its effects do not stack. Each time you take the feat, it applies to a new type of weapon.

A fighter may select Weapon Specialization as one of his fighter bonus feats.', NULL),
  ('whirlwind-attack', 'Whirlwind Attack', 'General', 'Dex 13, Int 13, Combat Expertise, Dodge, Mobility, Spring Attack, base attack bonus +4.', 'When you use the full attack action, you can give up your regular attacks and instead make one melee attack at your full base attack bonus against each opponent within reach.

When you use the Whirlwind Attack feat, you also forfeit any bonus or extra attacks granted by other feats, spells, or abilities.', 'A fighter may select Whirlwind Attack as one of his fighter bonus feats.', NULL),
  ('widen-spell', 'Widen Spell', 'Metamágica', 'None', 'You can alter a burst, emanation, line, or spread shaped spell to increase its area. Any numeric measurements of the spell’s area increase by 100%.A widened spell uses up a spell slot three levels higher than the spell’s actual level.

Spells that do not have an area of one of these four sorts are not affected by this feat.', NULL, NULL)
ON CONFLICT (slug) DO UPDATE
  SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    prerequisites = EXCLUDED.prerequisites,
    benefit = EXCLUDED.benefit,
    special = EXCLUDED.special,
    normal = EXCLUDED.normal,
    updated_at = NOW();

-- Verificación
SELECT
  'Dotes insertadas exitosamente' AS status,
  COUNT(*) AS total_feats
FROM public.feats;

-- Estadísticas por categoría
SELECT
  category,
  COUNT(*) as count
FROM public.feats
GROUP BY category
ORDER BY count DESC;
