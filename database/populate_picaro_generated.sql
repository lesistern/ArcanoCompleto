-- Population script for ROGUE (picaro)
BEGIN;

        UPDATE classes 
        SET hit_die = 6, dg = 6
        WHERE slug = 'picaro';
        

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 1, '+0', '+0', '+2', '+0', ARRAY['Sneak attack +1d6', 'trapfinding'], '+0', '+0', '+2', '+0')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 2, '+1', '+0', '+3', '+0', ARRAY['Evasion'], '+1', '+0', '+3', '+0')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 3, '+2', '+1', '+3', '+1', ARRAY['Sneak attack +2d6', 'trap sense +1'], '+2', '+1', '+3', '+1')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 4, '+3', '+1', '+4', '+1', ARRAY['Uncanny dodge'], '+3', '+1', '+4', '+1')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 5, '+3', '+1', '+4', '+1', ARRAY['Sneak attack +3d6'], '+3', '+1', '+4', '+1')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 6, '+4', '+2', '+5', '+2', ARRAY['Trap sense +2'], '+4', '+2', '+5', '+2')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 7, '+5', '+2', '+5', '+2', ARRAY['Sneak attack +4d6'], '+5', '+2', '+5', '+2')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 8, '+6/+1', '+2', '+6', '+2', ARRAY['Improved uncanny dodge'], '+6/+1', '+2', '+6', '+2')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 9, '+6/+1', '+3', '+6', '+3', ARRAY['Sneak attack +5d6', 'trap sense +3'], '+6/+1', '+3', '+6', '+3')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 10, '+7/+2', '+3', '+7', '+3', ARRAY['Special ability'], '+7/+2', '+3', '+7', '+3')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 11, '+8/+3', '+3', '+7', '+3', ARRAY['Sneak attack +6d6'], '+8/+3', '+3', '+7', '+3')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 12, '+9/+4', '+4', '+8', '+4', ARRAY['Trap sense +4'], '+9/+4', '+4', '+8', '+4')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 13, '+9/+4', '+4', '+8', '+4', ARRAY['Sneak attack +7d6', 'special ability'], '+9/+4', '+4', '+8', '+4')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 14, '+10/+5', '+4', '+9', '+4', ARRAY['15th +11/+6/+1 +5 +9 +5 Sneak attack +8d6', 'trap sense +5'], '+10/+5', '+4', '+9', '+4')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 16, '+12/+7/+2', '+5', '+10', '+5', ARRAY['Special ability'], '+12/+7/+2', '+5', '+10', '+5')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 17, '+12/+7/+2', '+5', '+10', '+5', ARRAY['Sneak attack +9d6'], '+12/+7/+2', '+5', '+10', '+5')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 18, '+13/+8/+3', '+6', '+11', '+6', ARRAY['Trap sense +6'], '+13/+8/+3', '+6', '+11', '+6')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 19, '+14/+9/+4', '+6', '+11', '+6', ARRAY['Sneak attack +10d6', 'special ability'], '+14/+9/+4', '+6', '+11', '+6')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('picaro', 20, '+15/+10/+5', '+6', '+12', '+6', NULL, '+15/+10/+5', '+6', '+12', '+6')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Sneak attack +1d6', 1, 'Descripción pendiente.', 'Sneak attack +1d6', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'trapfinding', 1, 'Descripción pendiente.', 'trapfinding', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Evasion', 2, 'Descripción pendiente.', 'Evasion', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Sneak attack +2d6', 3, 'Descripción pendiente.', 'Sneak attack +2d6', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'trap sense +1', 3, 'Descripción pendiente.', 'trap sense +1', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Uncanny dodge', 4, 'Descripción pendiente.', 'Uncanny dodge', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Sneak attack +3d6', 5, 'Descripción pendiente.', 'Sneak attack +3d6', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Trap sense +2', 6, 'Descripción pendiente.', 'Trap sense +2', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Sneak attack +4d6', 7, 'Descripción pendiente.', 'Sneak attack +4d6', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Improved uncanny dodge', 8, 'Descripción pendiente.', 'Improved uncanny dodge', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Sneak attack +5d6', 9, 'Descripción pendiente.', 'Sneak attack +5d6', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'trap sense +3', 9, 'Descripción pendiente.', 'trap sense +3', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Special ability', 10, 'Descripción pendiente.', 'Special ability', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Sneak attack +6d6', 11, 'Descripción pendiente.', 'Sneak attack +6d6', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Trap sense +4', 12, 'Descripción pendiente.', 'Trap sense +4', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Sneak attack +7d6', 13, 'Descripción pendiente.', 'Sneak attack +7d6', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'special ability', 13, 'Descripción pendiente.', 'special ability', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', '15th +11/+6/+1 +5 +9 +5 Sneak attack +8d6', 14, 'Descripción pendiente.', '15th +11/+6/+1 +5 +9 +5 Sneak attack +8d6', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'trap sense +5', 14, 'Descripción pendiente.', 'trap sense +5', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Sneak attack +9d6', 17, 'Descripción pendiente.', 'Sneak attack +9d6', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Trap sense +6', 18, 'Descripción pendiente.', 'Trap sense +6', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            

            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('picaro', 'Sneak attack +10d6', 19, 'Descripción pendiente.', 'Sneak attack +10d6', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            
COMMIT;