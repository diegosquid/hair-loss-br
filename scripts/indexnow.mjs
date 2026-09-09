import fs from 'node:fs';
import {load} from 'cheerio';
const host='www.capilarmente.com.br';const origin=`https://${host}`;
const config=JSON.parse(fs.readFileSync('config/indexnow.json','utf8'));
const args=process.argv.slice(2);const submit=args.includes('--submit');const urls=[...new Set(args.filter(a=>!a.startsWith('--')))];
if(!urls.length)throw new Error('Informe as URLs alteradas. Sem --submit, apenas mostra o lote.');
for(const input of urls){const u=new URL(input);if(u.origin!==origin||u.hash||u.search)throw new Error('Use apenas URLs canônicas HTTPS com www, sem parâmetros.');}
const keyLocation=`${origin}/${config.key}.txt`;
const payload={host,key:config.key,keyLocation,urlList:urls};
if(!submit){console.log(JSON.stringify({mode:'dry-run',host,keyLocation,urlList:urls},null,2));process.exit(0);}
const keyResponse=await fetch(keyLocation,{redirect:'error'});if(!keyResponse.ok||(await keyResponse.text()).trim()!==config.key)throw new Error('A chave ainda não está publicada corretamente');
for(const url of urls){const r=await fetch(url,{redirect:'error'});if(!r.ok)throw new Error(`URL indisponível: ${url}`);const $=load(await r.text());if(new URL($('link[rel=canonical]').attr('href')||'https://invalid.example').href!==new URL(url).href||/noindex/i.test($('meta[name=robots]').attr('content')||''))throw new Error(`URL não indexável/canônica: ${url}`);}
const response=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify(payload)});const body=await response.text();
const result={submittedAt:new Date().toISOString(),status:response.status,urlList:urls,body};fs.mkdirSync('reports/indexnow',{recursive:true});fs.writeFileSync(`reports/indexnow/${Date.now()}.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));if(![200,202].includes(response.status))process.exit(1);
