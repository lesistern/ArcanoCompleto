import requests
from bs4 import BeautifulSoup, NavigableString
import json
import os
import re
import time
from urllib.parse import urljoin, urlparse
from markdownify import markdownify as md

# CONFIGURATION
BASE_URL = 'https://srd.dndtools.org/srd/tools/toolsMonsterIndex.html'
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '../src/lib/data/3.5/monsters_srd_scraped.json')

def slugify(text):
    return text.lower().strip().replace(' ', '-').replace("'", '').replace(',', '')

def clean_text(text):
    if not text:
        return ""
    text = text.replace('\r\n', '\n')
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def main():
    print("Starting SRD Monster Scraper (Heuristic Refined)...")
    
    try:
        response = requests.get(BASE_URL)
        response.raise_for_status()
        index_soup = BeautifulSoup(response.content, 'html.parser')
        
        links = index_soup.find_all('a')
        monster_urls = set()
        for link in links:
            href = link.get('href')
            if href and 'monsters/monsters/core/' in href:
                full_url = urljoin(BASE_URL, href)
                monster_urls.add(full_url)
        
        print(f"Found {len(monster_urls)} unique monster references.")
        
        pages_to_visit = set()
        monster_anchors = {} 
        
        for m_url in monster_urls:
            parsed = urlparse(m_url)
            base_page = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
            pages_to_visit.add(base_page)
            if parsed.fragment:
                if base_page not in monster_anchors:
                    monster_anchors[base_page] = []
                monster_anchors[base_page].append(parsed.fragment)

        print(f"Will process {len(pages_to_visit)} pages.")
        
        collected_data = []
        counter = 0
        
        for page_url in pages_to_visit:
            print(f"[{counter+1}/{len(pages_to_visit)}] Processing {page_url}")
            try:
                res = requests.get(page_url)
                soup = BeautifulSoup(res.content, 'html.parser')
                target_anchors = monster_anchors.get(page_url, [])
                
                # Sort anchors by position in file?
                # Hard to do without finding them first.
                # We'll just process each anchor.
                
                for anchor in target_anchors:
                    elem = soup.find(id=anchor) or soup.find('a', attrs={'name': anchor})
                    
                    if elem:
                        header = elem
                        if elem.name == 'a' and elem.parent.name in ['h1','h2','h3','h4']:
                            header = elem.parent
                        
                        name = header.get_text(strip=True)
                        print(f"  Found monster: {name}")
                        
                        full_text = ""
                        curr = header.next_sibling
                        
                        while curr:
                            # Break condition:
                            # 1. H1 or H2 (Major section)
                            # 2. H3 if it looks like a new monster (uppercase or has anchor)
                            # 3. Anchor with name
                            
                            is_break = False
                            if curr.name in ['h1', 'h2']:
                                is_break = True
                            elif curr.name == 'h3':
                                # If it's a header with an ID or Anchor inside, it's likely a monster
                                if curr.get('id') or curr.find('a', attrs={'name': True}):
                                    is_break = True
                                # Heuristic: If text is short and Uppercase, it's likely a monster name
                                txt = curr.get_text(strip=True)
                                if txt and txt.isupper() and len(txt) < 50 and "COMBAT" not in txt:
                                    is_break = True
                            
                            if is_break:
                                break

                            try:
                                html_segment = str(curr)
                                chunk = md(html_segment, heading_style="ATX")
                                if chunk.strip():
                                    full_text += chunk + "\n"
                            except:
                                pass
                            
                            curr = curr.next_sibling
                        
                        full_text = full_text.replace('#### ', '### ') 
                        
                        collected_data.append({
                            "name": name,
                            "slug": slugify(name),
                            "description": clean_text(full_text),
                            "source_url": f"{page_url}#{anchor}"
                        })

            except Exception as e:
                print(f"Failed to process {page_url}: {e}")
            
            counter += 1
            time.sleep(0.5)

        print(f"Saving {len(collected_data)} monsters to {OUTPUT_FILE}")
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(collected_data, f, ensure_ascii=False, indent=2)
            
    except Exception as e:
        print(f"Fatal Error: {e}")

if __name__ == "__main__":
    main()
