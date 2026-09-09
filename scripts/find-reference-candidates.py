"""Read-only bibliographic candidates. Never edits published claims or citations."""
import json, re, time, urllib.request, urllib.parse
from pathlib import Path
root=Path(__file__).resolve().parents[1]; out=root/'reports/references'; rows=json.loads((out/'audit.json').read_text()); cache_path=out/'candidates.json'; cache=json.loads(cache_path.read_text()) if cache_path.exists() else {}
for row in rows:
 doi=row['doi']
 if not row['needs_manual_check'] or doi in cache:continue
 query=re.split(r'\[doi:',row['citation'])[0]
 query=re.sub(r'^\d+\.\s*','',query).replace('*','')
 url='https://api.crossref.org/works?'+urllib.parse.urlencode({'query.bibliographic':query,'rows':3})
 try:
  data=json.load(urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'CapilarmenteReferenceAudit/1.0'}),timeout=30))['message']['items']
  cache[doi]={'original':row['citation'],'candidates':[{'doi':x['DOI'],'title':x.get('title'), 'authors':[a.get('family') for a in x.get('author',[])], 'year':x.get('published'),'score':x['score']} for x in data]}
 except Exception as error: cache[doi]={'error':str(error),'original':row['citation']}
 cache_path.write_text(json.dumps(cache,ensure_ascii=False,indent=2));time.sleep(0.8)
print('Candidate searches:',len(cache))
