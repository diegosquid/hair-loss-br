import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
const origin='https://www.capilarmente.com.br';
const root='dist';
const sitemap=load(fs.readFileSync(`${root}/sitemap.xml`,'utf8'),{xmlMode:true});
const urls=sitemap('url > loc').map((_,el)=>sitemap(el).text()).get();
const errors=[];const warnings=[];const rows=[];const titles=new Map();
function fileFor(url){const pathname=decodeURIComponent(new URL(url,origin).pathname);const base=path.join(root,pathname);return [base,base+'.html',path.join(base,'index.html')].find(f=>fs.existsSync(f)&&fs.statSync(f).isFile());}
if(new Set(urls).size!==urls.length)errors.push('Duplicate sitemap URL');
for(const url of urls){
 const file=fileFor(url);if(!file){errors.push(`${url}: missing file`);continue;}
 const $=load(fs.readFileSync(file,'utf8')); const title=$('title').text();const canonical=$('link[rel=canonical]').attr('href'); const og=$('meta[property="og:image"]').attr('content');
 const check=(ok,message)=>{if(!ok)errors.push(`${url}: ${message}`);};
 check(url.startsWith(origin+'/'),'noncanonical sitemap host');check(canonical && new URL(canonical).href===new URL(url).href,'canonical mismatch');check($('h1').length===1,'H1 count '+$('h1').length);check(!!title,'missing title');check(!!$('meta[name=description]').attr('content'),'missing description');check(!/noindex/i.test($('meta[name=robots]').attr('content')||''),'indexable URL has noindex');check(!!og&&!!fileFor(og),'missing OG image');check($('meta[name="twitter:card"]').attr('content')==='summary_large_image','missing Twitter image card');
 if(titles.has(title))errors.push(`${url}: duplicate title with ${titles.get(title)}`);titles.set(title,url);
 if(title.length>75)warnings.push(`${url}: title ${title.length} chars`);
 $('a[href]').each((_,a)=>{const href=$(a).attr('href');if(/^(mailto:|tel:|#)/.test(href))return;const dest=new URL(href,url);if(dest.origin!==origin)return;check(!!fileFor(dest.href),'broken internal link '+href); if(dest.hash){const target=fileFor(dest.href);if(target?.endsWith('.html')){const doc=load(fs.readFileSync(target,'utf8'));check(doc('[id]').toArray().some(n=>doc(n).attr('id')===decodeURIComponent(dest.hash.slice(1))),'missing anchor '+href);}}});
 $('img').each((_,img)=>{const src=$(img).attr('src');check(!!src&&!!fileFor(src),'missing image '+src);check($(img).attr('alt')!==undefined,'missing alt attribute');check(Number($(img).attr('width'))>0&&Number($(img).attr('height'))>0,'missing image dimensions');});
 let article=false;
 $('script[type="application/ld+json"]').each((_,script)=>{try{const parsed=JSON.parse($(script).text());const entries=Array.isArray(parsed)?parsed:parsed['@graph']||[parsed];for(const entry of entries){check(entry['@type']!=='FAQPage','hidden FAQ schema');if(['BlogPosting','Article'].includes(entry['@type'])){article=true;check(entry.author?.['@type']==='Organization','unverified personal authorship');check(!!entry.image,'missing schema image');check(!entry.reviewedBy&&!entry.lastReviewed,'unverified review schema');}}}catch{check(false,'invalid JSON-LD');}});
 if(article){check($('article img').length>0,'article missing cover');check($('h2[id]').length>0,'article missing navigation headings');}
 rows.push({url,title,h1:$('h1').length,canonical,ogImage:og,article});
}
const result={checkedAt:new Date().toISOString(),pages:urls.length,articles:rows.filter(r=>r.article).length,errors,warnings,rows};fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/build-validation.json',JSON.stringify(result,null,2));console.log(JSON.stringify({pages:result.pages,articles:result.articles,errors,warnings},null,2));if(errors.length)process.exit(1);
