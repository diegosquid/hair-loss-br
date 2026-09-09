"""Resolve DOI metadata against Crossref; HTTP success is not claim verification."""
import concurrent.futures, difflib, html, json, re, time, unicodedata, urllib.parse, urllib.request, urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'reports' / 'references'
OUT.mkdir(parents=True, exist_ok=True)
CACHE = OUT / 'crossref-cache.json'
cache = json.loads(CACHE.read_text()) if CACHE.exists() else {}
occurrences = {}
for p in sorted((ROOT / 'content').glob('*/*.mdx')):
    for number, line in enumerate(p.read_text().splitlines(), 1):
        for doi in re.findall(r'\[doi:[^\]]+\]\(https?://(?:dx\.)?doi\.org/(10\.[^\s]+)\)', line):
            doi = urllib.parse.unquote(doi).rstrip('.,;')
            occurrences.setdefault(doi, []).append({'file':str(p.relative_to(ROOT)), 'line':number, 'citation':line})

def fetch(doi):
    if doi in cache and 'title' in cache[doi]: return doi, cache[doi]
    time.sleep(0.6)
    url = 'https://api.crossref.org/works/' + urllib.parse.quote(doi, safe='/')
    try:
        req=urllib.request.Request(url, headers={'User-Agent':'CapilarmenteReferenceAudit/1.0'})
        data=json.load(urllib.request.urlopen(req, timeout=30))['message']
        return doi, {'title':data.get('title', []), 'authors':[a.get('family','') for a in data.get('author',[])], 'published':data.get('published'), 'url':data.get('URL')}
    except Exception as e: return doi, {'error':str(e)}

with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
    for doi, result in pool.map(fetch, occurrences): cache[doi]=result
CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=2))
def normalize(s):
    s=re.sub('<[^>]+>', '', html.unescape(s))
    return re.sub(r'[^a-z0-9]+',' ', unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower()).strip()
rows=[]
for doi, found in occurrences.items():
    meta=cache[doi]
    for ref in found:
        title=' '.join(meta.get('title',[]))
        words=set(normalize(title).split())
        overlap=len(words & set(normalize(ref['citation']).split())) / max(len(words),1)
        rows.append({**ref, 'doi':doi, 'resolved_title':title, 'authors':meta.get('authors',[]), 'title_word_overlap':round(overlap,3), 'needs_manual_check':bool(meta.get('error')) or overlap < 0.72, 'error':meta.get('error')})
(OUT/'audit.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2))
print(json.dumps({'unique_dois':len(occurrences), 'citations':len(rows), 'flagged':sum(r['needs_manual_check'] for r in rows), 'unresolved':sum('error' in cache[d] for d in occurrences)}))
print('Metadata matching only; clinical claim support must be reviewed separately.')
