#!/usr/bin/env python3
import json
import os
import re

def build_index():
    web_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(web_dir)
    manifest_path = os.path.join(project_root, 'notes', 'manifest.json')
    index_path = os.path.join(web_dir, 'index.html')

    with open(manifest_path, 'r', encoding='utf-8') as f:
        notes = json.load(f)

    html_rows = []
    
    # Process notes in pairs to create rows
    for i in range(0, len(notes), 2):
        row_notes = notes[i:i+2]
        is_last_row = (i + 2 >= len(notes))
        
        margin_style = "" if is_last_row else ' style="margin-bottom: 18px;"'
        row_html = [f'        <div class="note-grid"{margin_style}>']
        
        for j, note in enumerate(row_notes):
            global_index = i + j
            
            # Hybrid theme: check if 'theme' is explicitly set in manifest, otherwise auto-assign checkerboard
            theme = note.get('theme')
            if not theme:
                # Checkerboard logic:
                # 0: dark, 1: light
                # 2: light, 3: dark
                is_dark = (global_index % 4 == 0) or (global_index % 4 == 3)
                theme = "note-card-dark" if is_dark else "note-card-light"
            else:
                # ensure it has note-card- prefix if user just put "dark"
                if not theme.startswith("note-card-"):
                    theme = f"note-card-{theme}"
                    
            note_num = str(global_index + 1).zfill(2)
            
            icon_html = f'<div class="card-icon">{note["icon"]}</div>'
            if note["icon"] == "bars":
                icon_html = '<div class="complexity-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>'
            
            card_html = f"""          <a class="note-card {theme}" href="reader.html?file=./notes/{note['file']}">
            <div class="card-top"><span>NOTE {note_num}</span><span>↗</span></div>
            {icon_html}
            <h3>{note['title']}</h3>
            <p>{note['description']}</p>
            <div class="card-bottom"><span>{note['time']}</span><span class="arrow">→</span></div>
          </a>"""
            row_html.append(card_html)
            
        row_html.append('        </div>')
        html_rows.append('\n'.join(row_html))
        
    grid_html = '\n\n'.join(html_rows)
    
    # Read index.html
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace the grid
    start_marker = '<!-- NOTES_GRID_START -->'
    end_marker = '<!-- NOTES_GRID_END -->'
    
    pattern = re.compile(f'({start_marker}).*?({end_marker})', re.DOTALL)
    new_content = pattern.sub(f'\\1\n{grid_html}\n        \\2', content)
    
    # Update stats
    count_str = str(len(notes)).zfill(2)
    stats_pattern = re.compile(r'<div><strong>\d+</strong><span>core notes</span></div>')
    new_content = stats_pattern.sub(f'<div><strong>{count_str}</strong><span>core notes</span></div>', new_content)
    
    # Write back
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"Successfully built index.html with {len(notes)} notes.")

if __name__ == "__main__":
    build_index()
