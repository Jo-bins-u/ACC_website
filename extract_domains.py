import os
import re
from bs4 import BeautifulSoup

files = [
    'animation.html', 'liturgy.html', 'outreach.html', 
    'audiovisual.html', 'logistic.html', 'mediadoc.html'
]

domains_data = []

for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            soup = BeautifulSoup(file, 'html.parser')
            
            # Domain ID
            domain_id = f.replace('.html', '')
            
            # Landing Banner
            bnr = soup.find(class_='bnr')
            img_src = bnr.find('img')['src'] if bnr and bnr.find('img') else ''
            h1 = bnr.find('h1').text.strip() if bnr and bnr.find('h1') else ''
            subtitle = bnr.find('p').text.strip() if bnr and bnr.find('p') else ''
            
            # What We Do
            domhis_div = soup.find('div', id='domhis')
            what_we_do = domhis_div.find('p').text.strip() if domhis_div and domhis_div.find('p') else ''
            
            # How We Contribute List
            contributions = []
            contrib_ul = soup.find_all('div', id='domhis')
            if len(contrib_ul) > 1:
                ul = contrib_ul[1].find('ul')
                if ul:
                    for li in ul.find_all('li'):
                        contributions.append(li.decode_contents().strip())
                        
            # More on us
            domabt = soup.find(class_='domabt')
            more_on_us = domabt.find('p').text.strip() if domabt and domabt.find('p') else ''
            
            # Join Us link
            join_btn = soup.find_all(class_='joinbtn')
            join_url = ''
            if len(join_btn) > 0:
                a_tag = join_btn[0].find('a')
                if a_tag: join_url = a_tag['href']
                
            mail_url = ''
            if len(join_btn) > 1:
                a_tag = join_btn[1].find('a')
                if a_tag: mail_url = a_tag['href']

            domains_data.append({
                'id': domain_id,
                'title': h1,
                'subtitle': subtitle,
                'banner': img_src,
                'whatWeDo': what_we_do,
                'contributions': contributions,
                'moreOnUs': more_on_us,
                'joinLink': join_url,
                'mailLink': mail_url
            })

import json
with open('domains_extracted.json', 'w', encoding='utf-8') as f:
    json.dump(domains_data, f, indent=4)
print("Extracted domains data.")
