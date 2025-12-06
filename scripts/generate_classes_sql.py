import json
import re
import os
import sys

# Force UTF-8 for stdout/stderr
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

INPUT_FILE = r"D:\CalabozosYDragones\dnd-compendium\scripts\output\extracted_classes.json"
OUTPUT_DIR = r"D:\CalabozosYDragones\dnd-compendium\database"

CLASS_MAP = {
    "BARBARIAN": "barbaro",
    "BARD": "bardo",
    "CLERIC": "clerigo",
    "DRUID": "druida",
    "FIGHTER": "guerrero",
    "MONK": "monje",
    "PALADIN": "paladin",
    "RANGER": "montaraz",
    "ROGUE": "picaro",
    "SORCERER": "hechicero",
    "WIZARD": "mago"
}

def generate_sql():
    print(f"Reading input file: {INPUT_FILE}")
    if not os.path.exists(INPUT_FILE):
        print("Input file does not exist!")
        return

    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"Loaded {len(data)} classes.")
    print(f"Keys: {list(data.keys())}")

    for class_name, class_data in data.items():
        slug = CLASS_MAP.get(class_name)
        if not slug:
            print(f"Skipping {class_name} (no slug mapping)")
            continue
            
        print(f"Generating SQL for {class_name} ({slug})...")
        
        sql_lines = []
        sql_lines.append(f"-- Population script for {class_name} ({slug})")
        sql_lines.append("BEGIN;")
        
        hit_die = class_data.get("hit_die", "d8").replace("d", "")
        sql_lines.append(f"""
        UPDATE classes 
        SET hit_die = {hit_die}, dg = {hit_die}
        WHERE slug = '{slug}';
        """)

        progression_lines = class_data.get("progression_table_raw", [])
        features_list = []
        
        for line in progression_lines:
            parts = re.split(r'\s+', line.strip())
            if len(parts) < 5:
                continue
                
            level_str = parts[0]
            match = re.match(r'\d+', level_str)
            if not match:
                continue
            level = int(match.group())
            
            bab = parts[1]
            fort = parts[2]
            ref = parts[3]
            will = parts[4]
            
            remaining = parts[5:]
            special_tokens = []
            spells_tokens = []
            
            found_spells = False
            for token in remaining:
                if re.match(r'^\d+$', token) or token == '-': 
                    found_spells = True
                
                if found_spells:
                    spells_tokens.append(token)
                else:
                    special_tokens.append(token)
            
            special_text = " ".join(special_tokens)
            
            if special_text == "-":
                special_text = ""
            
            if special_text:
                feats = [f.strip() for f in special_text.split(',')]
                for f in feats:
                    if f and f != "-":
                        features_list.append({"name": f, "level": level})
            
            special_array = "ARRAY[" + ", ".join([f"'{f.strip()}'" for f in special_text.split(',') if f.strip() and f != "-"]) + "]"
            if not special_text:
                special_array = "NULL"
                
            sql_lines.append(f"""
            INSERT INTO class_progression (class_slug, level, base_attack_bonus, fort_save, ref_save, will_save, special_abilities, bab, fort, ref, will)
            VALUES ('{slug}', {level}, '{bab}', '{fort}', '{ref}', '{will}', {special_array}, '{bab}', '{fort}', '{ref}', '{will}')
            ON CONFLICT (class_slug, level) DO UPDATE SET
                base_attack_bonus = EXCLUDED.base_attack_bonus,
                fort_save = EXCLUDED.fort_save,
                ref_save = EXCLUDED.ref_save,
                will_save = EXCLUDED.will_save,
                special_abilities = EXCLUDED.special_abilities;
            """)

        seen_features = set()
        for feat in features_list:
            name = feat["name"]
            if name in seen_features:
                continue
            seen_features.add(name)
            
            sql_lines.append(f"""
            INSERT INTO class_features (class_slug, name, level, description, name_en, description_en)
            VALUES ('{slug}', '{name}', {feat['level']}, 'Descripci\u00f3n pendiente.', '{name}', 'Pending description.')
            ON CONFLICT (class_slug, name) DO NOTHING;
            """)

        sql_lines.append("COMMIT;")
        
        output_file = os.path.join(OUTPUT_DIR, f"populate_{slug}_generated.sql")
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("\n".join(sql_lines))
            
        print(f"Saved {output_file}")

if __name__ == "__main__":
    generate_sql()
