import fs from 'node:fs';
import matter from 'gray-matter';
const pages = {'/':'Capilarmente','/blog':'Artigos e guias','/causas':'Causas da queda','/medicamentos':'Medicamentos','/tratamentos':'Tratamentos','/avaliacao':'Roteiro para consulta','/sobre':'Sobre','/editorial':'Política editorial','/privacidade':'Privacidade','/contato':'Contato','/autores':'Autoria','/autores/equipe-editorial':'Redação Capilarmente'};
for (const category of fs.readdirSync('content')) for (const name of fs.readdirSync(`content/${category}`).filter(n => n.endsWith('.mdx'))) {const {data}=matter(fs.readFileSync(`content/${category}/${name}`, 'utf8')); pages[`/${category}/${name.replace(/\.mdx$/,'')}`]=data.seoTitle || data.title;}
fs.writeFileSync('lib/analytics-pages.json', JSON.stringify(pages,null,2)+'\n');
