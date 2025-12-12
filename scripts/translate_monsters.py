import json
import os
import time
from deep_translator import GoogleTranslator

# CONFIGURATION
INPUT_FILE = os.path.join(os.path.dirname(__file__), '../src/lib/data/3.5/monsters_srd_scraped.json')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '../src/lib/data/3.5/monsters_translated.json')

# D&D 3.5 Terminology Glossary (EN -> ES)
GLOSSARY = {
    "Hit Dice": "Dados de Golpe",
    "Initiative": "Iniciativa",
    "Speed": "Velocidad",
    "Armor Class": "Clase de Armadura",
    "Base Attack/Grapple": "Ataque Base/Presa",
    "Attack": "Ataque",
    "Full Attack": "Ataque Completo",
    "Space/Reach": "Espacio/Alcance",
    "Special Attacks": "Ataques Especiales",
    "Special Qualities": "Cualidades Especiales",
    "Saves": "Salvaciones",
    "Abilities": "Características",
    "Skills": "Habilidades",
    "Feats": "Dotes",
    "Environment": "Entorno",
    "Organization": "Organización",
    "Challenge Rating": "Desafío",
    "Treasure": "Tesoro",
    "Alignment": "Alineamineto",
    "Advancement": "Avance",
    "Level Adjustment": "Ajuste de Nivel",
    "Combat": "Combate",
    "Saving Throw": "Tirada de Salvación",
    "Fortitude": "Fortaleza",
    "Reflex": "Reflejos",
    "Will": "Voluntad",
    "Strength": "Fuerza",
    "Dexterity": "Destreza",
    "Constitution": "Constitución",
    "Intelligence": "Inteligencia",
    "Wisdom": "Sabiduría",
    "Charisma": "Carisma",
    "damage reduction": "reducción de daño",
    "spell resistance": "resistencia a conjuros",
    "darkvision": "visión en la oscuridad",
    "low-light vision": "visión en la penumbra",
    "immunity to": "inmunidad a",
    "vulnerability to": "vulnerabilidad a",
    "Spot": "Avistar",
    "Listen": "Escuchar",
    "Search": "Buscar",
    "Hide": "Esconderse",
    "Move Silently": "Moverse Sigilosamente",
    "Concentration": "Concentración",
    "Spellcraft": "Conocimiento de Conjuros",
    "Knowledge": "Saber",
    "Survival": "Supervivencia"
}

def apply_glossary(text):
    """Pre-replace known terms to ensure technical accuracy."""
    for en, es in GLOSSARY.items():
        # Simple case-insensitive replacement could be dangerous aka 'Will' vs 'I will'.
        # For now, strict replacement for Stat Block headers is safer, but mixed text is hard.
        # We will iterate and replace strict capitalization matches first.
        if en in text:
            text = text.replace(en, es)
    return text

def translate_text(text, translator):
    if not text or len(text) < 2:
        return text
    
    # Pre-process with glossary
    # text = apply_glossary(text) # Applying before might confuse grammar, applying after might be better for specific terms.
    # Let's try raw translation first, then post-process specific headers if they remain English.
    
    try:
        # Initial Glossary replace for Stat Block headers which are distinctive
        # (e.g. "Hit Dice:" -> "Dados de Golpe:")
        for term, trans in GLOSSARY.items():
            text = text.replace(f"{term}:", f"{trans}:")
            text = text.replace(f"### {term.upper()}", f"### {trans.upper()}")

        # Chunking handled by deep_translator usually, but 5000 chars is limit.
        if len(text) > 4000:
            chunks = [text[i:i+4000] for i in range(0, len(text), 4000)]
            translated_chunks = []
            for chunk in chunks:
                translated_chunks.append(translator.translate(chunk))
            result = "".join(translated_chunks)
        else:
            result = translator.translate(text)
            
        return result
    except Exception as e:
        print(f"Error translating: {e}")
        return text

def main():
    print("Loading monsters...")
    try:
        with open(INPUT_FILE, 'r', encoding='utf-8') as f:
            monsters = json.load(f)
    except Exception as e:
        print(f"Could not read {INPUT_FILE}: {e}")
        return

    translator = GoogleTranslator(source='en', target='es')
    
    translated_data = []
    # Check if we have partial progress
    if os.path.exists(OUTPUT_FILE):
         try:
            with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
                translated_data = json.load(f)
            print(f"Resuming... found {len(translated_data)} already translated.")
         except:
             pass
    
    start_index = len(translated_data)
    total = len(monsters)
    
    print(f"Starting translation from index {start_index} of {total}...")

    for i in range(start_index, total):
        m = monsters[i]
        name = m.get('name', '')
        desc = m.get('description', '')
        
        if not name or not desc:
            print(f"[{i+1}/{total}] Skipping empty entry")
            translated_data.append(m) # Keep empty as is
            continue
            
        print(f"[{i+1}/{total}] Translating {name}...")
        
        # Translate Name (optional, usually names are kept or simple)
        # We might want to keep the English name as specific key or just trust the DB has the Spanish name.
        # But for 'description', we definitely need translation.
        
        trans_desc = translate_text(desc, translator)
        
        # Post-process Glossary to ensure headers are definitely Spanish if the translator missed them
        # (Double check)
        for term, trans in GLOSSARY.items():
             trans_desc = trans_desc.replace(f"### {term.upper()}", f"### {trans.upper()}")
        
        m['description_es'] = trans_desc
        translated_data.append(m)
        
        # Save every 5 entries to avoid data loss
        if i % 5 == 0:
            with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                json.dump(translated_data, f, ensure_ascii=False, indent=2)
            time.sleep(0.5) # Rate limit politeness

    # Final save
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(translated_data, f, ensure_ascii=False, indent=2)
        
    print("Translation complete!")

if __name__ == "__main__":
    main()
