import re
import json
import os
import sys

# Force UTF-8 for stdout/stderr
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Configuration
MD_FILE_PATH = r"D:\CalabozosYDragones\recursos\PDF_Extraidos\Core_Rules\Players_Handbook\Players_Handbook.md"
OUTPUT_DIR = r"D:\CalabozosYDragones\dnd-compendium\scripts\output"

# ONLY RANGER
CLASSES = ["RANGER"]

HEADER_MAP = {
    "WIZARD": "WIZARDS",
    "SORCERER": "SORCERER"
}

def extract_classes(md_path):
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    extracted_data = {}

    for class_name in CLASSES:
        print(f"Extracting {class_name}...")
        
        start_index = -1
        
        if class_name == "SORCERER":
            pattern = re.compile(r'Sorcerers create magic the', re.IGNORECASE)
            match = pattern.search(content)
            if match:
                start_index = match.start()
        else:
            header_name = HEADER_MAP.get(class_name, class_name)
            pattern = re.compile(r'^####\s+' + header_name + r'.*$', re.MULTILINE | re.IGNORECASE)
            match = pattern.search(content)
            if match:
                start_index = match.end()
        
        if start_index == -1:
            print(f"Could not find start of {class_name}")
            continue

        next_header_pattern = re.compile(r'^####\s+[A-Z]+.*$', re.MULTILINE)
        next_match = next_header_pattern.search(content, start_index)
        
        if next_match:
            print(f"DEBUG: Next header found: {repr(next_match.group())} at index {next_match.start()}")
            end_index = next_match.start()
        else:
            print("DEBUG: No next header found, reading to end of file")
            end_index = len(content)
        
        class_text = content[start_index:end_index]
        
        # Explicit write
        debug_path = os.path.join(OUTPUT_DIR, "ranger_debug_explicit.txt")
        print(f"Writing debug to {debug_path}")
        with open(debug_path, "w", encoding="utf-8") as f_debug:
             f_debug.write(f"START RANGER TEXT ({len(class_text)} chars)\n")
             f_debug.write(class_text)
             f_debug.write("\nEND RANGER TEXT\n")
        
        extracted_data[class_name] = parse_class_text(class_name, class_text)

    return extracted_data

def parse_class_text(class_name, text):
    data = {
        "name": class_name,
        "progression_table": [],
        "features": [],
        "starting_package": {},
        "skills": [],
        "hit_die": ""
    }
    return data

if __name__ == "__main__":
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    data = extract_classes(MD_FILE_PATH)
    print("Done.")
