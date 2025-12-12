import json
import os

INPUT_FILE = os.path.join(os.path.dirname(__file__), '../src/lib/data/3.5/monsters_translated.json')
OUTPUT_SQL = os.path.join(os.path.dirname(__file__), '../enrich_monsters.sql')

def escape_sql(text):
    if not text: return ""
    return text.replace("'", "''")

def main():
    if not os.path.exists(INPUT_FILE):
        print(f"File not found: {INPUT_FILE}")
        return

    print("Generating SQL...")
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    sql_statements = []
    
    # We will try to update by slug_es (Spanish slug) first, as that's likely the key in a Spanish DB.
    # However, some DB entries might still use English slugs.
    # We can create a comprehensive logic:
    # UPDATE monsters SET description = 'DESC' WHERE slug = 'slug_es' OR slug = 'slug_en';
    # This is safe because slugs are unique ID keys presumably.
    
    ignored = 0
    generated = 0
    
    for m in data:
        desc_es = m.get('description_es')
        slug_en = m.get('slug')
        slug_es = m.get('slug_es')
        
        # Skip if no description
        if not desc_es or len(desc_es.strip()) < 10:
            ignored += 1
            continue
            
        safe_desc = escape_sql(desc_es)
        safe_slug_en = escape_sql(slug_en)
        safe_slug_es = escape_sql(slug_es)
        
        # Construct Query
        # We target both possible slugs to catch the record.
        query = f"UPDATE monsters SET description = '{safe_desc}' WHERE slug IN ('{safe_slug_en}', '{safe_slug_es}');"
        sql_statements.append(query)
        generated += 1

    print(f"Generated {generated} updates. Ignored {ignored} empty entries.")
    
    with open(OUTPUT_SQL, 'w', encoding='utf-8') as f:
        f.write("\n".join(sql_statements))
        
    print(f"Saved to {OUTPUT_SQL}")

if __name__ == "__main__":
    main()
