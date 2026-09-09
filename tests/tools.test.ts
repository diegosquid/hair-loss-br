import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateCosts } from '../lib/costs';
import { sanitizeAnswers, isComplete, answerSummary, readingForInterest } from '../lib/avaliacao/questions';
import { validateOffers } from '../lib/affiliates';
test('annual budget separates recurring expenses from a one-time procedure', () => {
 assert.deepEqual(calculateCosts({monthly:80,consultation:300,visits:2,procedure:200}), {recurringAnnual:1560,firstYear:1760,monthlyEquivalent:1760/12});
 assert.deepEqual(calculateCosts({monthly:0,consultation:0,visits:0,procedure:0}), {recurringAnnual:0,firstYear:0,monthlyEquivalent:0});
 assert.equal(calculateCosts({monthly:19.99,consultation:0,visits:0,procedure:0}).firstYear,239.88);
 for(const bad of [-1,NaN,Infinity]) assert.throws(()=>calculateCosts({monthly:bad,consultation:0,visits:0,procedure:0}));
 assert.throws(()=>calculateCosts({monthly:0,consultation:0,visits:1.5,procedure:0}));
});
test('restoring the quiz rejects legacy, malformed and injected health data', () => {
 for(const raw of [null,[],42,'text']) assert.deepEqual(sanitizeAnswers(raw),{});
 assert.deepEqual(sanitizeAnswers({tempo:'0',percepcao:['1','1','<script>',1],diagnosis:'alopecia',email:'someone@example.com',registro:['0'],consulta:'999'}), {tempo:'0',percepcao:['1']});
 const complete={tempo:'0',percepcao:['1'],registro:'2',mudancas:'1',duvida:'3',consulta:'1'};
 assert.equal(isComplete(complete),true); assert.equal(isComplete({...complete,consulta:'999'}),false);
 assert.ok(answerSummary(complete).every(r=>r.answer!=='Não informado'));
 assert.equal(readingForInterest('bad').href,'/blog/como-escolher-tricologista');
});
test('affiliate configuration rejects insecure URLs, duplicates and drug pages', () => {
 const offer={id:'fibra-teste',title:'Produto',merchant:'Loja',url:'https://example.com/item',note:'Comparar cor e peso.',articleSlugs:['fibras-capilares-como-escolher']};
 assert.equal(validateOffers([offer]).length,1);
 for (const url of ['javascript:alert(1)','http://example.com','https://user:pass@example.com']) assert.throws(()=>validateOffers([{...offer,url}]));
 assert.throws(()=>validateOffers([offer,offer]));
 assert.throws(()=>validateOffers([{...offer,articleSlugs:['finasterida']}]));
});
