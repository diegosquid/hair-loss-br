import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Resvg } from '@resvg/resvg-js';
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function lines(text, max=25) { const result=[]; let row=''; for(const word of text.split(/\s+/)){if(row && (row+' '+word).length>max){result.push(row);row=word;}else row+=(row?' ':'')+word;}if(row)result.push(row);return result; }
const colors={blog:'#355d46',causas:'#8e523f',tratamentos:'#426263',medicamentos:'#47633a'};
function art(slug, category){
 if(slug.includes('custo')) return `<g fill="none" stroke="#e8efdb" stroke-width="3"><rect x="770" y="180" width="280" height="240" rx="20"/>${[0,1,2].map(i=>`<rect x="805" y="${215+i*58}" width="36" height="32" rx="6"/><path d="M865 ${231+i*58}h140"/>`).join('')}</g><text x="910" y="475" text-anchor="middle" fill="#e8efdb" font-family="Arial" font-size="25">12 meses + despesas únicas</text>`;
 if(slug.includes('shampoo') || slug.includes('cetoconazol')) return `<g fill="#e8efdb"><rect x="785" y="215" width="115" height="230" rx="28"/><rect x="810" y="170" width="65" height="50" rx="8"/><rect x="945" y="245" width="90" height="200" rx="20"/><rect x="963" y="205" width="54" height="43" rx="6"/></g><g stroke="#355d46" stroke-width="3"><path d="M810 300h65m-65 20h65m95 5h45m-45 20h45"/></g><text x="910" y="490" text-anchor="middle" fill="#e8efdb" font-family="Arial" font-size="24">Rótulo · composição · custo</text>`;
 if(slug.includes('laser') || slug.includes('led')) return `<g fill="none" stroke="#e8efdb" stroke-width="4"><path d="M780 280q130-180 260 0z"/>${[800,840,880,920,960,1000].map(x=>`<path d="M${x} 310v85" stroke-dasharray="8 10"/>`).join('')}<path d="M765 430q145-55 290 0"/></g><text x="910" y="490" text-anchor="middle" fill="#e8efdb" font-family="Arial" font-size="24">Dispositivo · evidência · uso</text>`;
 if(slug.includes('prf') || slug.includes('prp')) return `<g fill="none" stroke="#e8efdb" stroke-width="4">${[790,890,990].map((x,i)=>`<rect x="${x}" y="205" width="55" height="215" rx="22"/><path d="M${x+1} ${310-i*15}h53"/><path d="M${x-5} 200h65"/>`).join('')}</g><text x="910" y="490" text-anchor="middle" fill="#e8efdb" font-family="Arial" font-size="24">Preparos e protocolos variam</text>`;
 if(slug.includes('cilios')||slug.includes('sobrancelhas')) return `<g fill="none" stroke="#e8efdb" stroke-width="4"><path d="M775 320q135-120 270 0q-135 120-270 0z"/><circle cx="910" cy="320" r="36"/><path d="M790 240q120-75 240 0M800 300l-24-28m55 10l-14-37m62 24l-3-39m55 39l6-39m42 52l16-37m28 55l26-28"/></g><text x="910" y="490" text-anchor="middle" fill="#e8efdb" font-family="Arial" font-size="24">Medicamentos não são iguais</text>`;
 if(slug.includes('transplante')||slug.includes('barba')||slug.includes('perucas')||slug.includes('fibras')) return `<g fill="none" stroke="#e8efdb" stroke-width="4"><path d="M835 410v-50q-65-40-45-135q20-80 105-72q100 5 108 100l32 60h-38v47q-4 30-60 30v40"/><path d="M815 208q72-77 158 6M850 175l-24 65m68-77l-18 70m59-57l-8 54"/></g><text x="910" y="490" text-anchor="middle" fill="#e8efdb" font-family="Arial" font-size="24">Aparência · cuidados · escolhas</text>`;
 if(category==='medicamentos') return `<g fill="none" stroke="#e8efdb" stroke-width="4"><rect x="795" y="225" width="100" height="185" rx="16"/><path d="M815 225v-50h60v50m-62 73h64m-64 22h64"/><rect x="940" y="195" width="85" height="215" rx="42"/><path d="M940 302h85"/></g><text x="910" y="490" text-anchor="middle" fill="#e8efdb" font-family="Arial" font-size="24">Usos · riscos · acompanhamento</text>`;
 return `<g fill="none" stroke="#e8efdb" stroke-width="4"><path d="M775 395q135-32 270 0"/>${[805,870,935,1000].map((x,i)=>`<path d="M${x} 420v-150q0-50 ${i%2?20:-20}-70"/><ellipse cx="${x}" cy="435" rx="15" ry="25"/>`).join('')}</g><text x="910" y="505" text-anchor="middle" fill="#e8efdb" font-family="Arial" font-size="23">Entender antes de escolher</text>`;
}
function make(title,category,slug,label){const rows=lines(title,25);const size=rows.length>5?42:49;return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f7f4ec"/><rect x="700" width="500" height="630" fill="${colors[category]||colors.blog}"/><path d="M0 600H700" stroke="#d7d3c8"/><text x="60" y="78" font-family="Arial" font-size="21" letter-spacing="3" fill="#355d46">CAPILARMENTE</text><text x="60" y="145" font-family="Arial" font-size="18" fill="#655f50">${esc(label.toUpperCase())}</text>${rows.map((line,i)=>`<text x="60" y="${220+i*(size+10)}" font-family="Georgia" font-size="${size}" fill="#253829">${esc(line)}</text>`).join('')}<text x="60" y="566" font-family="Arial" font-size="19" fill="#655f50">Informação para cuidar e escolher</text>${art(slug,category)}</svg>`;}
fs.mkdirSync('public/images/articles',{recursive:true});
let count=0;
for(const category of fs.readdirSync('content')){
 for(const file of fs.readdirSync(path.join('content',category)).filter(n=>n.endsWith('.mdx'))){
  const {data}=matter(fs.readFileSync(path.join('content',category,file),'utf8'));const slug=file.slice(0,-4);
  const svg=make(data.seoTitle||data.title,category,slug,data.category);
  fs.writeFileSync(`public/images/articles/${category}-${slug}.png`,new Resvg(svg).render().asPng());count++;
 }
}
fs.writeFileSync('public/images/capilarmente-social.png',new Resvg(make('Entenda a queda. Escolha com calma.','blog','home','Cuidados capilares')).render().asPng());
console.log(`Generated ${count} article covers and the site image.`);
