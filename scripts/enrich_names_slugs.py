import json
import os
import re
import unicodedata
from deep_translator import GoogleTranslator

INPUT_FILE = os.path.join(os.path.dirname(__file__), '../src/lib/data/3.5/monsters_translated.json')
OUTPUT_FILE = INPUT_FILE # Overwrite in place or create new? Let's overwrite to keep it simple.

def slugify(text):
    """
    Convert to ASCII, lowercase, remove non-alphanumeric (except hyphens), 
    replace spaces with hyphens.
    """
    if not text: return ""
    text = text.lower()
    # Normalize unicode characters
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text).strip('-')
    return text

def main():
    if not os.path.exists(INPUT_FILE):
        print(f"File not found: {INPUT_FILE}")
        return

    print("Loading data...")
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    translator = GoogleTranslator(source='en', target='es')
    
    count = 0
    total = len(data)
    
    print(f"Processing {total} entries...")

    for m in data:
        english_name = m.get('name', '')
        if not english_name:
            continue
            
        # skip if already has spanish name (idempotency)
        if 'name_es' in m and m['name_es']:
             continue

        # Translate Name
        try:
            # Special case for core names to ensure match?
            # Ideally we'd use a glossary, but Google is decent for most.
            name_es = translator.translate(english_name)
            m['name_es'] = name_es
            m['slug_es'] = slugify(name_es)
            
            print(f"[{count+1}] {english_name} -> {name_es} ({m['slug_es']})")
        except Exception as e:
            print(f"Error translating {english_name}: {e}")
            m['name_es'] = english_name # Fallback
            m['slug_es'] = slugify(english_name)

        count += 1
        
        # Save periodically
        if count % 10 == 0:
             with open(INPUT_FILE, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

    # Final save
    with open(INPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print("Done! Names and slugs enriched.")

if __name__ == "__main__":
    main()
