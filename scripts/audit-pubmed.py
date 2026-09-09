"""Check PubMed/PMC link identity using Europe PMC bibliographic metadata."""
from pathlib import Path
import json,re,time,urllib.request,urllib.parse,unicodedata,html
root=Path(__file__).resolve().parents[1];out=root/'reports/references';cachefile=out/'pubmed-cache.json'
cache=json.loads(cachefile.read_text()) if cachefile.exists() else {}
rows=[]
for p in sorted((root/'content').glob('*/*.mdx')):
 for n,line in enumerate(p.read_text().splitlines(),1):
  for kind,ids in [('MED',re.findall(r'https://pubmed.ncbi.nlm.nih.gov/(\d+)',line)),('PMC',re.findall(r'https://pmc.ncbi.nlm.nih.gov/articles/(PMC\d+)',line))]:
   for id in ids:
    key=kind+':'+id
    if key not in cache:
     q=f'EXT_ID:{id} AND SRC:MED' if kind=='MED' else f'PMCID:{id}'
     url='https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&resultType=core&query='+urllib.parse.quote(q)
     try:
      result=json.load(urllib.request.urlopen(url,timeout=30))['resultList']['result'];cache[key]=result[0] if result else {'error':'not found'}
     except Exception as e:cache[key]={'error':str(e)}
     cachefile.write_text(json.dumps(cache,ensure_ascii=False,indent=2));time.sleep(.2)
    meta=cache[key]
    def norm(s):return re.sub(r'[^a-z0-9]+',' ',unicodedata.normalize('NFKD',html.unescape(s)).encode('ascii','ignore').decode().lower())
    words=set(norm(meta.get('title','')).split());overlap=len(words & set(norm(line).split()))/max(len(words),1)
    rows.append({'file':str(p.relative_to(root)),'line':n,'id':key,'citation':line,'title':meta.get('title'),'authors':meta.get('authorString'),'doi':meta.get('doi'),'overlap':round(overlap,3),'needs_manual_check':bool(meta.get('error')) or (bool(re.match(r'^\d+\.',line)) and overlap<.65)})
(out/'pubmed-audit.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
print(json.dumps({'links':len(rows),'unique':len(cache),'flagged':sum(r['needs_manual_check'] for r in rows)}))
for r in rows:
 if r['needs_manual_check']:print(r['file'],r['id'],r['title'])
