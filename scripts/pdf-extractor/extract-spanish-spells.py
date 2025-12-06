#!/usr/bin/env python3
"""
Extrae nombres de hechizos en español del Manual del Jugador oficial
"""

import pdfplumber
import json
import re

pdf_path = r"D:\CalabozosYDragones\PDF\Libros PDF\Jugador\D&D 3.5 - Manual del Jugador español.pdf"

# Los hechizos están aproximadamente en las páginas 200-270
# Vamos a extraer página por página buscando el formato de hechizos

spell_translations = {}
current_spell = None

print("Extrayendo hechizos del PDF español...")
print("=" * 60)

with pdfplumber.open(pdf_path) as pdf:
    # Buscar en páginas 200-280 (capítulo de hechizos)
    for page_num in range(200, 280):
        if page_num >= len(pdf.pages):
            break

        page = pdf.pages[page_num]
        text = page.extract_text()

        if not text:
            continue

        # Buscar nombres de hechizos (suelen estar en negrita/mayúsculas)
        # Formato típico: "NOMBRE DEL HECHIZO" seguido de nivel, escuela, etc.
        lines = text.split('\n')

        for i, line in enumerate(lines):
            line = line.strip()

            # Buscar patrones de hechizos
            # Ejemplo: "BOLA DE FUEGO"
            # Seguido de: "Evocación [Fuego]"
            if line.isupper() and len(line) > 3 and len(line) < 50:
                # Verificar si la siguiente línea contiene info de hechizo
                if i + 1 < len(lines):
                    next_line = lines[i + 1].strip()
                    # Buscar escuelas de magia
                    schools = ['Abjuración', 'Conjuración', 'Adivinación', 'Encantamiento',
                              'Evocación', 'Ilusión', 'Necromancia', 'Transmutación']

                    if any(school in next_line for school in schools):
                        spell_name = line.title()  # Convertir a formato título
                        print(f"[OK] Encontrado: {spell_name}")

                        # Guardar el contexto (escuela, nivel, etc.)
                        context = []
                        for j in range(1, min(6, len(lines) - i)):
                            context.append(lines[i + j].strip())

                        spell_translations[spell_name] = {
                            'spanish_name': spell_name,
                            'page': page_num,
                            'context': '\n'.join(context)
                        }

print("\n" + "=" * 60)
print(f"[OK] Total de hechizos encontrados: {len(spell_translations)}")

# Guardar en JSON
output_file = 'scripts/pdf-extractor/spanish_spells_extracted.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(spell_translations, f, ensure_ascii=False, indent=2)

print(f"Guardado en: {output_file}")

# Mostrar primeros 20
print("\nPRIMEROS 20 HECHIZOS:")
print("-" * 60)
for i, (name, data) in enumerate(list(spell_translations.items())[:20]):
    print(f"{i+1}. {name} (pág. {data['page']})")
