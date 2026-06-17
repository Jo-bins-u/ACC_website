import os
import re

nav_replacement = '<a class="nav-item nav-link" href="domains.html">Domains</a>'

files = [f for f in os.listdir('.') if f.endswith('.html')]
files.append('admin/index.html')

for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Regex to find the Domains dropdown
        pattern = r'<li class="nav-item dropdown">\s*<a class="nav-link[^>]*>\s*Domains\s*</a>\s*<ul class="dropdown-menu"[^>]*>.*?</ul>\s*</li>'
        
        new_content = re.sub(pattern, nav_replacement, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f'Updated navbar in {f}')
