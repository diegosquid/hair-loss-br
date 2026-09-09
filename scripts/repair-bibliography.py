"""One-time verified DOI/title repairs from the September 2026 audit.
The explicit map identifies the intended work, not a new source chosen by rank.
It corrects bibliographic identity only; claim review is recorded separately.
"""
import json,re,time,urllib.request,urllib.parse,html
from pathlib import Path
root=Path(__file__).resolve().parents[1]
mapping={
'10.1016/j.abdp.2022.03.017':'10.1016/j.abd.2021.08.008',
'10.1016/j.jaad.2021.02.026':'10.1016/j.jaad.2021.02.054',
'10.1111/jdv.17378':'10.1111/ijd.15482',
'10.1016/j.jpsychires.2022.07.006':'10.1016/j.jpsychires.2022.06.058',
'10.1016/j.comppsych.2024.152461':'10.1016/j.comppsych.2024.152506',
'10.1016/j.abd.2023.03.005':'10.1016/j.abd.2022.09.006',
'10.1002/ddr.20235':'10.1002/ddr.20244',
'10.1016/j.jaad.2020.03.068':'10.1016/j.jaad.2020.04.054',
'10.7759/cureus.5950':'10.7759/cureus.5470',
'10.4103/0974-7753.100090':'10.4103/0974-7753.100096',
'10.1016/S0015-0282(02)04555-6':'10.1016/s0015-0282(02)04551-x',
'10.1016/j.jaad.2010.11.018':'10.1111/j.1529-8019.2011.01441.x',
'10.1002/1097-0142(19930201)71:3+<1046::AID-CNCR2820711408>3.0.CO;2-M':'10.1002/1097-0142(19930201)71:3+<1046::aid-cncr2820711424>3.0.co;2-m',
'10.1111/jocd.14771':'10.1111/jocd.14788',
'10.1046/j.1365-2133.1998.02110.x':'10.1046/j.1365-2133.1998.02115.x',
'10.1046/j.0022-202x.2001.01567.x':'10.1046/j.0022-202x.2001.01570.x',
'10.1016/j.jaad.2010.09.026':'10.1016/j.jaad.2010.09.724',
'10.1067/mjd.2002.119614':'10.1067/mjd.2002.119104',
'10.1016/j.jaad.2020.02.012':'10.1016/j.jaad.2019.04.054',
'10.1016/j.jnutbio.2022.109223':'10.1016/j.celrep.2022.111804',
'10.1111/dth.12386':'10.1111/dth.12390',
'10.1016/S0190-9622(86)70242-9':'10.1016/s0190-9622(86)80024-x',
'10.1016/S0190-9622(85)70158-5':'10.1016/s0190-9622(85)70157-0',
'10.1111/jocd.15873':'10.7759/cureus.67264',
'10.2147/CCID.S472946':'10.2147/ccid.s543451',
'10.3390/pharmaceutics16101310':'10.1097/dss.0000000000004480',
'10.1159/000527869':'10.1159/000528446',
'10.1016/j.jdin.2023.04.002':'10.1016/j.jdin.2023.04.011',
'10.1016/j.clindermatol.2025.05.013':'10.1016/j.clindermatol.2025.07.006',
'10.1016/j.det.2007.09.007':'10.1080/14764170701817056'
}
cachepath=root/'reports/references/verified-replacements.json';cache=json.loads(cachepath.read_text()) if cachepath.exists() else {}
for doi in mapping.values():
 if doi in cache:continue
 try:
  url='https://api.crossref.org/works/'+urllib.parse.quote(doi,safe='/')
  data=json.load(urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'CapilarmenteReferenceAudit/1.0'}),timeout=25))['message'];cache[doi]=data
 except Exception as error:print('FAILED',doi,str(error))
 cachepath.write_text(json.dumps(cache,ensure_ascii=False,indent=2));time.sleep(.7)
def plain(s):return re.sub('<[^>]+>','',html.unescape(s)).strip()
log=[]
for p in (root/'content').glob('*/*.mdx'):
 old=p.read_text(); new=[];changed=[]
 for line in old.splitlines():
  match=re.search(r'\[doi:[^\]]+\]\(https?://(?:dx\.)?doi.org/(10\..+)\)',line)
  doi=urllib.parse.unquote(match[1]) if match else ''
  number=re.match(r'^(\d+)\. ',line)
  if doi in mapping and mapping[doi] in cache and number:
   data=cache[mapping[doi]];a=data.get('author',[]);names=', '.join((x.get('family','')+' '+''.join(y[0] for y in x.get('given','').split() if y)).strip() for x in a[:3])+(' et al.' if len(a)>3 else '')
   title=plain(' '.join(data.get('title',[])));journal=plain(' '.join(data.get('container-title',[])));year=data.get('published',{}).get('date-parts',[['']])[0][0]; url='https://doi.org/'+urllib.parse.quote(mapping[doi],safe='/():;+-._')
   line=f"{number[1]}. {names}. {title}. *{journal}*. {year}. [doi:{html.escape(mapping[doi])}]({url})";changed.append({'old':doi,'new':mapping[doi],'title':title})
  new.append(line)
 if changed:
  result='\n'.join(new)+'\n';note='Em 9/9/2026, corrigimos a identificação bibliográfica de referências que apontavam para outros trabalhos. Essa conferência de fontes não equivale a revisão médica independente.'
  if not re.search(r'^correctionNote:',result,re.M):result=result.replace('---\n','---\ncorrectionNote: '+json.dumps(note,ensure_ascii=False)+'\n',1)
  result=re.sub(r'^updatedAt:.*\n','',result,flags=re.M).replace('---\n','---\nupdatedAt: "2026-09-09"\n',1)
  p.write_text(result);log.append({'file':str(p.relative_to(root)),'changes':changed})
(root/'reports/references/repairs.json').write_text(json.dumps(log,ensure_ascii=False,indent=2));print('Repaired',sum(len(x['changes']) for x in log),'references in',len(log),'articles')
