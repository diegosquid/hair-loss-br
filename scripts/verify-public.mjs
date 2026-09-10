import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';
const origin='https://www.capilarmente.com.br';
const expected=JSON.parse(fs.readFileSync('reports/build-validation.json','utf8'));
const errors=[]; const assets=new Set(['/images/home/cuidado-capilar-1120.webp','/images/home/cuidado-capilar-640.webp','/images/home/cuidado-capilar-800.webp','/images/home/cuidados-e-escolhas-640.webp','/images/home/cuidados-e-escolhas-960.webp']);
const sitemapResponse=await fetch(`${origin}/sitemap.xml`,{redirect:'manual'});
if(sitemapResponse.status!==200) throw new Error(`Sitemap HTTP ${sitemapResponse.status}`);
const sitemap=load(await sitemapResponse.text(),{xmlMode:true});
const urls=sitemap('url>loc').map((_,el)=>sitemap(el).text()).get();
if(JSON.stringify([...urls].sort())!==JSON.stringify(expected.rows.map(r=>r.url).sort())) throw new Error('Public sitemap differs from validated build');
async function batch(items,fn){const results=[];let next=0;await Promise.all(Array.from({length:6},async()=>{while(next<items.length){const index=next++;try{results[index]=await fn(items[index]);}catch(error){errors.push(`${items[index].url||items[index]}: ${error.message}`);}}}));return results;}
const rows=await batch(expected.rows,async row=>{
 const response=await fetch(row.url,{redirect:'manual'}); if(response.status!==200)throw new Error(`HTTP ${response.status}`);
 const $=load(await response.text());
 if($('h1').length!==1)throw new Error('H1 count differs');
 if($('title').text()!==row.title)throw new Error('Title differs from build');
 if(new URL($('link[rel=canonical]').attr('href')).href!==new URL(row.canonical).href)throw new Error('Canonical differs');
 if(/noindex/i.test($('meta[name=robots]').attr('content')||''))throw new Error('noindex');
 if($('meta[property="og:image"]').attr('content')!==row.ogImage)throw new Error('OG image differs');
 if(row.article && !$('article').text().includes('Redação Capilarmente'))throw new Error('Editorial author not present');
 $('img[src]').each((_,el)=>assets.add(new URL($(el).attr('src'),origin).pathname));
 assets.add(new URL(row.ogImage).pathname);
 if(new URL(row.url).pathname==='/'){
  if(!$('#home-title').text().includes('Entenda a queda.')||!$('#path-tab-2').length)throw new Error('New homepage missing');
 }
 if(row.url.endsWith('/contato')&&!$('a[href="mailto:contato@capilarmente.com.br"]').length)throw new Error('Contact address missing');
 return {url:row.url,status:response.status,title:$('title').text(),canonical:$('link[rel=canonical]').attr('href')};
});
const assetRows=await batch([...assets],async asset=>{
 const response=await fetch(origin+asset,{redirect:'manual'});if(response.status!==200)throw new Error(`Asset HTTP ${response.status}`);
 const bytes=Buffer.from(await response.arrayBuffer());const local=fs.readFileSync(path.join('dist',asset));
 const sha=data=>createHash('sha256').update(data).digest('hex');
 if(sha(bytes)!==sha(local))throw new Error('Public asset differs from built asset');
 return {path:asset,bytes:bytes.length,sha256:sha(bytes)};
});
const redirects=await batch(['https://capilarmente.com.br/','https://capilarmente.com.br/blog/custo-tratar-calvicie-brasil',...['dr-silva','dr-santos','dr-almeida','dra-oliveira','dra-costa','dra-lima'].map(s=>origin+'/autores/'+s)],async url=>{
 const response=await fetch(url,{redirect:'manual'});const destination=response.headers.get('location');const wanted=new URL(url).hostname==='capilarmente.com.br'?origin+new URL(url).pathname:origin+'/autores/equipe-editorial';
 if(![301,308].includes(response.status)||new URL(destination,url).href!==wanted)throw new Error(`Redirect ${response.status} ${destination}`);
 return {url,status:response.status,destination};
});
const result={checkedAt:new Date().toISOString(),pages:urls.length,assets:assetRows.length,errors,rows,assetRows,redirects};
fs.writeFileSync('reports/public-validation.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({pages:result.pages,assets:result.assets,redirects:redirects.length,errors},null,2));
if(errors.length)process.exit(1);
