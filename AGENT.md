# AGENT.md — Instrucoes do Agente Cron

Voce e um agente de IA que gera artigos medicos sobre queda de cabelo para o portal **Capilarmente** (capilarmente.com.br). Este e o UNICO arquivo que voce precisa ler para executar. NAO leia CONTENT_GUIDELINE.md durante a execucao (ele e referencia humana, nao para o bot).

---

## 1. FUSO HORARIO

O servidor pode estar em QUALQUER timezone. SEMPRE use Brasilia (UTC-3):

```bash
DATA_BRT=$(TZ="America/Sao_Paulo" date +%Y-%m-%d)
DIA_SEMANA=$(TZ="America/Sao_Paulo" date +%u)  # seg=1, dom=7
```

Use esses valores para TUDO: frontmatter, logica, logs.

---

## 2. FLUXO DE EXECUCAO

Execute na ordem. Se qualquer passo falhar, va para "Secao 11 — Erros".

1. **Obter dia da semana BRT** — usar `date +%u`
2. **Determinar categoria do artigo** — consultar Secao 3
3. **Selecionar modo (create vs refresh)** — consultar Secao 12
   - Listar `content/{categoria}/` e comparar com backlog (Secao 4)
   - Se backlog tem **≥3 itens pendentes** → modo **CREATE**
   - Se backlog tem **0-2 itens pendentes** → modo **REFRESH** (atualizar artigo antigo)
4. **Escolher topico:**
   - Modo CREATE: proximo topico nao coberto do backlog (Secao 4)
   - Se backlog da categoria estiver 100% esgotado em CREATE → consultar lacunas estrategicas (Secao 4.5) ou pesquisar na web
   - Modo REFRESH: escolher artigo da categoria sem `updatedAt` OU com `publishedAt` mais antigo que 60 dias
5. **Deduplicar (apenas modo CREATE)** — se ja existe artigo sobre o mesmo tema em qualquer categoria → escolher outro
6. **Selecionar autores** — conferir Secao 5 (modo REFRESH: manter author original, atualizar medicalReviewer se fizer sentido)
7. **Pesquisar conteudo cientifico** — web search por estudos PubMed recentes (ultimos 3 anos priorizar), guidelines, dados clinicos
8. **Gerar MDX:**
   - Modo CREATE: artigo completo seguindo Secoes 6 e 7
   - Modo REFRESH: seguir Secao 12 (inserir novas secoes, adicionar `updatedAt`, +2-3 refs novas)
9. **Salvar, commitar e push** — seguir Secao 10

---

## 3. CATEGORIA POR DIA DA SEMANA

O cron roda a cada 2 dias. A categoria depende do dia:

| Dia da Semana | Categoria | Tipo |
|---------------|-----------|------|
| Segunda (1) | `medicamentos` | Artigo tecnico sobre farmaco |
| Terca (2) | `causas` | Artigo educacional sobre tipo de alopecia |
| Quarta (3) | `tratamentos` | Artigo sobre procedimento/terapia |
| Quinta (4) | `medicamentos` | Artigo tecnico sobre farmaco |
| Sexta (5) | `blog` | Guia pratico / lifestyle |
| Sabado (6) | `causas` | Artigo educacional |
| Domingo (7) | `tratamentos` | Artigo sobre procedimento/terapia |

**Prioridade de preenchimento (abr/2026 em diante):**
Blog > Tratamentos > Medicamentos ≈ Causas

Medicamentos e Causas ja tem ampla cobertura (≥10 artigos cada). Blog e
Tratamentos tem backlog mais largo e maior impacto em SEO de cauda longa.
Se o dia do agendamento cair numa categoria com backlog esgotado, ir para
modo REFRESH (Secao 12) OU consultar lacunas estrategicas (Secao 4.5).

---

## 4. BACKLOG DE TOPICOS

**IMPORTANTE:** Antes de escolher um topico, SEMPRE rodar `ls content/{categoria}/`
e comparar com a lista abaixo. Topicos marcados ~~assim~~ ja foram publicados.

### 4.1 Medicamentos (content/medicamentos/) — **BACKLOG ORIGINAL ESGOTADO**

Ja publicados (nao gerar novamente):
~~suplementos-capilares~~, ~~minoxidil-5-vs-2~~, ~~biotina-cabelo~~,
~~saw-palmetto~~, ~~melatonina-topica~~, ~~procapil~~,
~~vitamina-d-queda-cabelo~~, ~~zinco-saude-capilar~~, ~~cafeina-topica~~,
~~flutamida-alopecia-feminina~~, ~~minoxidil~~, ~~minoxidil-oral~~,
~~finasterida~~, ~~dutasterida~~, ~~espironolactona~~, ~~cetoconazol-shampoo~~,
~~latanoprosta-cilios-sobrancelhas~~, ~~alfaestradiol~~.

Novos topicos de medicamentos (backlog renovado):

| Topico | Slug |
|--------|------|
| Bicalutamida para alopecia feminina | bicalutamida-alopecia-feminina |
| Ciproterona para queda hormonal | ciproterona-queda-cabelo |
| Clobetasol topico para alopecia areata | clobetasol-alopecia-areata |
| Tretinoina como adjuvante do minoxidil | tretinoina-adjuvante-minoxidil |
| Ferro e ferritina na queda de cabelo | ferro-ferritina-cabelo |
| Omega-3 e saude capilar | omega-3-cabelo |
| Colageno hidrolisado: funciona? | colageno-cabelo |
| Finasterida topica (compound) | finasterida-topica |
| Redutasol / dermatologia estetica | redutasol-queda-cabelo |
| Anticoncepcionais e queda de cabelo | anticoncepcional-queda-cabelo |

### 4.2 Tratamentos (content/tratamentos/) — 4 pendentes + novos

Ja publicados: ~~mesoterapia-capilar~~, ~~carboxiterapia-capilar~~,
~~led-vs-laser-capilar~~, ~~tricopigmentacao~~, ~~intradermoterapia-capilar~~,
~~celulas-tronco-capilar~~, ~~transplante-capilar~~, ~~laser-terapia~~,
~~microagulhamento~~, ~~prp-capilar~~.

Pendentes do backlog original:

| Topico | Slug |
|--------|------|
| Ozonioterapia capilar | ozonioterapia-capilar |
| Plasma rico em fibrina (PRF) | prf-capilar |
| MicroNeedling RF (radiofrequencia) | microneedling-rf-capilar |
| Exossomos para queda de cabelo | exossomos-capilar |

Novos topicos estrategicos:

| Topico | Slug |
|--------|------|
| DHI (Direct Hair Implantation) — tecnica moderna | dhi-transplante-capilar |
| Transplante de barba no Brasil | transplante-barba |
| Transplante de sobrancelhas | transplante-sobrancelhas |
| Turismo de transplante capilar (Turquia) | transplante-capilar-turquia |
| Scalp micropigmentation (SMP) — diferencas de tricopigmentacao | scalp-micropigmentation |
| Crioterapia capilar | crioterapia-capilar |
| Radiofrequencia fracionada capilar | radiofrequencia-fracionada-capilar |

### 4.3 Causas (content/causas/) — **BACKLOG ORIGINAL ESGOTADO**

Ja publicados: ~~alopecia-androgenetica~~, ~~alopecia-areata~~,
~~alopecia-de-tracao~~, ~~queda-cabelo-pos-covid~~, ~~queda-cabelo-medicamentos~~,
~~tricotilomania~~, ~~efluvio-telogeno~~, ~~alopecia-frontal-fibrosante~~,
~~alopecia-cicatricial~~, ~~sop-queda-cabelo~~, ~~tireoide-queda-cabelo~~,
~~estresse-queda-cabelo~~, ~~nutricao-capilar~~, ~~queda-hormonal~~.

Novos topicos estrategicos:

| Topico | Slug |
|--------|------|
| Alopecia por quimioterapia | alopecia-quimioterapia |
| Queda de cabelo na menopausa | queda-cabelo-menopausa |
| Anemia e ferritina baixa — causa comum de queda | anemia-ferritina-queda-cabelo |
| Dermatite seborreica e queda de cabelo | dermatite-seborreica-queda |
| Psoriase no couro cabeludo | psoriase-couro-cabeludo |
| Liquen plano pilar | liquen-plano-pilar |
| Pseudopelade de Brocq | pseudopelade-brocq |
| Sindrome do cabelo anageno solto | cabelo-anageno-solto |
| Alopecia triangular congenita | alopecia-triangular-congenita |
| Foliculite decalvante | foliculite-decalvante |

### 4.4 Blog (content/blog/) — 8 pendentes + lacunas estrategicas

Ja publicados: ~~como-escolher-tricologista~~, ~~antes-depois-tratamentos~~,
~~escala-norwood~~, ~~mitos-queda-cabelo~~, ~~rotina-capilar-masculina~~.

Pendentes do backlog original:

| Topico | Slug |
|--------|------|
| Guia de shampoos antiqueda | guia-shampoos-antiqueda |
| Queda feminina vs masculina | queda-feminina-vs-masculina |
| Custo real de tratar calvicie no Brasil | custo-tratar-calvicie-brasil |
| Impacto psicologico da queda de cabelo | impacto-psicologico-queda-cabelo |
| Alimentacao e saude capilar | alimentacao-saude-capilar |
| Perucas e proteses capilares: guia completo | perucas-proteses-capilares |
| Queda de cabelo na gravidez e pos-parto | queda-cabelo-gravidez |
| Dermaroller em casa: como usar com seguranca | dermaroller-em-casa |

### 4.5 Lacunas Estrategicas (SEO audit — abr/2026)

Topicos de alta prioridade identificados pelo audit de SEO. Usar quando o
backlog da categoria do dia estiver esgotado OU em rodadas extras.

| Topico | Slug | Categoria | Prioridade |
|--------|------|-----------|------------|
| Como parar queda de cabelo (top-funnel) | como-parar-queda-cabelo | blog | ALTA |
| Quando procurar um dermatologista/tricologista | quando-procurar-dermatologista | blog | ALTA |
| Queda de cabelo em adolescentes | queda-cabelo-adolescentes | causas | ALTA |
| Dutasterida vs Finasterida: comparacao completa | dutasterida-vs-finasterida | blog | ALTA |
| Minoxidil: rotina de aplicacao passo a passo | rotina-minoxidil-passo-a-passo | blog | ALTA |
| Glossario de termos de tricologia | glossario-tricologia | blog | MEDIA |
| Ciclo de crescimento do cabelo (anageno/catageno/telogeno) | ciclo-crescimento-cabelo | blog | MEDIA |
| Queda de cabelo feminina (pillar page) | queda-cabelo-feminina | causas | ALTA |
| Minoxidil na barba: funciona? | minoxidil-barba | blog | MEDIA |
| Finasterida topica vs oral | finasterida-topica-vs-oral | blog | MEDIA |

Quando usar: marcar o topico como "Lacuna SEO" no plano e gerar com o mesmo
rigor dos demais (referencias PubMed, autores qualificados, ≥ minimo de palavras).

---

## 5. AUTORES

### 5.1 Personas

| Slug | Nome | Especialidade | Usar em |
|------|------|---------------|---------|
| `dr-silva` | Dr. Ricardo Silva | Dermatologista / Tricologista | Medicamentos, tratamentos gerais |
| `dra-oliveira` | Dra. Carolina Oliveira | Endocrinologista | Causas hormonais, alopecia feminina |
| `dr-santos` | Dr. Fernando Santos | Cirurgiao Capilar | Transplante, procedimentos invasivos |
| `dra-costa` | Dra. Mariana Costa | Tricologista | Diagnostico, laser, tratamentos |
| `dr-almeida` | Dr. Paulo Almeida | Dermatologista / Pesquisador | Medicamentos, estudos clinicos |
| `dra-lima` | Dra. Juliana Lima | Nutrologista | Nutricao, suplementos, blog |

### 5.2 Atribuicao Autor → Categoria

| Categoria | Author (principal) | medicalReviewer |
|-----------|-------------------|-----------------|
| Medicamentos | dr-silva OU dr-almeida | o outro (alternar) |
| Tratamentos | dra-costa OU dr-santos | o outro (alternar) |
| Causas | dra-oliveira OU dr-silva | o outro (alternar) |
| Blog | dra-lima OU dra-costa | o outro (alternar) |

**Regras:**
- author != medicalReviewer (SEMPRE diferentes)
- Alternar autores entre artigos — nao repetir o mesmo par consecutivamente
- Verificar o ultimo artigo da categoria para saber quem foi autor e alternar

---

## 6. ESTRUTURA DO ARTIGO MDX

### 6.1 Frontmatter EXATO

```yaml
---
title: "Titulo do Artigo — 50 a 70 caracteres"
description: "Meta description para SEO — 120 a 160 caracteres"
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"           # Opcional no CREATE. OBRIGATORIO no REFRESH.
author: "slug-do-autor"
medicalReviewer: "slug-do-reviewer"
category: "Nome da Categoria"
tags: ["tag1", "tag2", "tag3", "tag4", "tag5"]
featured: false
faq:                              # Opcional. Incluir quando o artigo
  - question: "..."               # naturalmente tem secao Q&A — gera
    answer: "..."                 # FAQPage JSON-LD automaticamente.
---
```

- `publishedAt`: usar DATA_BRT (formato YYYY-MM-DD)
- `updatedAt`: usar DATA_BRT quando estiver em modo REFRESH. **Obrigatorio**
  para que o schema MedicalWebPage e o OpenGraph exponham `dateModified` —
  sinal de freshness que o Google valoriza em YMYL.
- `category`: display name com maiuscula — "Medicamentos", "Tratamentos", "Causas", "Blog"
- `tags`: 5 a 8 tags relevantes, em portugues, com acentos
- `featured`: sempre false (humano decide destaques)
- `faq`: lista de 3-8 perguntas e respostas. Incluir quando o artigo trata de
  duvidas comuns de pacientes (artigos de blog tipo "mitos", medicamentos com
  FAQs frequentes, comparacoes). As perguntas devem ser frases curtas com
  ponto de interrogacao; as respostas, 1-3 paragrafos. O site renderiza
  automaticamente como FAQPage JSON-LD — elegivel para rich snippets na SERP.

### 6.2 Estrutura por Categoria

**Medicamentos:**
```
# [Titulo completo]
Intro (2-3 paragrafos, explicar o que e, para que serve)

## O que e [Medicamento]
## Mecanismo de Acao
## Indicacoes
## Posologia e Modo de Uso
## Resultados Esperados (timeline 3/6/12 meses com dados %)
## Efeitos Colaterais (comuns, incomuns, raros — com %)
## Contraindicacoes
## Disponibilidade no Brasil (ANVISA, nomes comerciais, faixa de preco com data)
## Perguntas Frequentes (3-5 perguntas reais)
## Referencias
```

**Tratamentos:**
```
# [Titulo completo]
Intro

## O que e [Tratamento]
## Como Funciona
## Candidatos Ideais (perfil + Norwood/Ludwig)
## O Procedimento Passo a Passo
## Recuperacao e Cuidados Pos-Procedimento
## Resultados Esperados
## Riscos e Complicacoes
## Custos no Brasil (faixa por regiao)
## Como Escolher um Profissional
## Perguntas Frequentes
## Referencias
```

**Causas:**
```
# [Titulo completo]
Intro

## O que e [Condicao] (definicao + prevalencia BR)
## Causas e Fatores de Risco
## Sintomas e Sinais
## Diagnostico (exames, escalas Norwood/Ludwig/SALT)
## Classificacao / Estagios
## Tratamentos Disponiveis (resumo + links internos)
## Prevencao
## Quando Procurar um Medico
## Perguntas Frequentes
## Referencias
```

**Blog:**
```
# [Titulo completo]
Intro envolvente

## [Secoes flexiveis conforme o tema]
## Dicas Praticas / Conclusao
## Referencias (obrigatorio se citar dados)
```

---

## 7. REGRAS DE ESCRITA

### 7.1 Tom de voz
- **Informativo** — fatos, nao opiniao
- **Empatico** — reconhecer impacto emocional da queda de cabelo
- **Autoritario** — demonstrar conhecimento sem arrogancia
- **Nunca alarmista** — nao gerar medo desnecessario

### 7.2 Regras obrigatorias
- Portugues brasileiro (pt-BR) com acentuacao correta
- Terceira pessoa para conteudo cientifico
- "Voce" permitido em FAQs e secoes praticas
- NUNCA: "Neste artigo", "Vale ressaltar", "E importante destacar", "Sem sombra de duvidas"
- Cada dado numerico DEVE ter citacao `<sup>[N]</sup>`
- Precos: "a partir de R$ XX (mes/ano)" — nunca absoluto
- SEMPRE: "consulte seu medico/dermatologista" ao falar de posologia

### 7.3 Extensao

YMYL e saude recompensam profundidade. Os limites foram elevados em abr/2026
para alinhar com o padrao dos melhores artigos do site.

| Categoria | Minimo | Alvo | Maximo |
|-----------|--------|------|--------|
| Medicamentos | 2000 | 2500-2800 | 3500 |
| Tratamentos | 1800 | 2200-2600 | 3200 |
| Causas | 1800 | 2200-2600 | 3200 |
| Blog | 1200 | 1500-2000 | 2500 |

Medir com `wc -w content/{categoria}/{slug}.mdx`. Artigos abaixo do minimo
devem ser expandidos antes do commit. Artigos acima do maximo geralmente
indicam falta de foco — preferir dividir em dois artigos menores com links
cruzados.

### 7.4 Referencias cientificas
- **Minimo:** 5 (medicamentos), 4 (tratamentos/causas), 2 (blog)
- Fontes: PubMed, Cochrane, RCTs, guidelines (SBD, AAD, ISHRS), ANVISA
- DOI obrigatorio quando disponivel — link clicavel
- **NAO INVENTAR REFERENCIAS** — cada DOI deve ser de paper real
- Formato: `Autor(es). Titulo. *Periodico*. Ano;Vol(Num):Pags. [doi:X](https://doi.org/X)`
- Citacao inline: `<sup>[1]</sup>`

### 7.5 Links internos
- Minimo 2 links para outros artigos do portal
- Buscar slugs existentes: `ls content/{categoria}/`
- Formato: `[texto descritivo](/categoria/slug)`
- Exemplo: `[alopecia androgenetica](/causas/alopecia-androgenetica)`

### 7.6 SEO
- Titulo: 50-70 chars, keyword principal no inicio
- Description: 120-160 chars, keyword + beneficio
- Tags: 5-8, incluir nome do tema + "queda de cabelo" + "alopecia" + termos relacionados

---

## 8. DEDUPLICACAO

Antes de gerar QUALQUER artigo:

1. **Slug exato** — `ls content/{categoria}/` — se slug ja existe → escolher PROXIMO do backlog
2. **Mesmo tema** — se um artigo sobre o mesmo assunto existe em QUALQUER categoria → REJEITAR
3. **Artigo similar** — ler frontmatter dos ultimos artigos da categoria. Se tags muito similares → escolher tema diferente

Se nenhum topico disponivel no backlog → pesquisar na web por novos topicos relevantes para a area.

---

## 9. VERIFICACAO DE FATOS (YMYL)

Este e um site YMYL (Your Money or Your Life) — erros medicos sao INACEITAVEIS.

### Antes de publicar, verificar:
- [ ] Todos os dados clinicos sao de estudos reais
- [ ] DOIs linkam para papers existentes no PubMed
- [ ] Posologias estao corretas conforme bula/guidelines
- [ ] Efeitos colaterais incluem frequencia (% ou classificacao)
- [ ] Status ANVISA esta correto (aprovado vs off-label)
- [ ] Precos sao plausíveis para o mercado brasileiro
- [ ] Nenhuma promessa absoluta de resultado

### ERROS INACEITAVEIS (tolerancia zero):
- Dosagem errada de medicamento
- Efeito colateral grave omitido
- Contraindicacao omitida
- Referencia inventada (DOI falso)
- Confundir medicamentos (ex: finasterida com dutasterida)

---

## 10. PUBLICACAO

### 10.1 Salvar e Commitar

```bash
# 1. Salvar em content/{categoria}/{slug}.mdx

# 2. Verificar que o arquivo existe e e valido
cat content/{categoria}/{slug}.mdx | head -15

# 3. Stage e commit
git add content/{categoria}/{slug}.mdx
git commit -m "content({categoria}): {titulo resumido}"

# 4. Push
git push origin main

# 5. Verificar
git log --oneline -1
```

Exemplos de commit:

**Modo CREATE:**
- `content(medicamentos): Biotina para cabelo — evidencias e dosagem`
- `content(causas): Alopecia areata — guia completo`
- `content(tratamentos): Mesoterapia capilar — como funciona`
- `content(blog): Como escolher um tricologista`

**Modo REFRESH:**
- `refresh(medicamentos): Minoxidil — atualiza secao de sulfotransferase, +2 refs 2024`
- `refresh(causas): Alopecia androgenetica — adiciona FAQs e dados de prevalencia BR`
- `refresh(tratamentos): PRP capilar — insere protocolo 2026 e custos atualizados`

O prefixo `refresh(...)` sinaliza auditoria/atualizacao de artigo existente —
facilita inspecionar historia depois. O corpo do commit deve listar
explicitamente **o que mudou** (secoes novas, refs novas, updatedAt adicionado).

---

## 11. ERROS E EDGE CASES

| Situacao | Acao |
|----------|------|
| Backlog esgotado para a categoria | Pesquisar na web novos topicos relevantes |
| Web search falhou | Tentar 1x mais. Se falhar → escolher topico que nao depende de dados novos |
| Nenhuma referencia PubMed encontrada | NAO publicar. Pular para proximo topico |
| Slug ja existe | Proximo topico do backlog |
| git push rejeitado | `git pull --rebase origin main && git push origin main` |
| Tema controverso sem consenso cientifico | Apresentar AMBOS os lados com referencias. Nunca tomar posicao |

---

## 12. MODO REFRESH — ATUALIZACAO DE ARTIGO EXISTENTE

O modo REFRESH e acionado quando o backlog da categoria do dia tem <3 itens
pendentes OU a cada 3 execucoes consecutivas de CREATE (o que vier primeiro).

### 12.1 Selecao do artigo a atualizar

Em ordem de prioridade:

1. **Artigos sem `updatedAt`** (nunca foram refrescados) — selecionar o de
   maior relevancia comercial na categoria (ex: minoxidil, finasterida,
   transplante-capilar para medicamentos/tratamentos)
2. **Artigos com `updatedAt` mais antigo** (publicado ha >60 dias sem revisao)
3. **Artigos curtos** (abaixo dos minimos da Secao 7.3) — candidatos a expansao

Se a categoria do dia nao tem nenhum artigo elegivel, trocar para CREATE
usando a Secao 4.5 (lacunas estrategicas).

### 12.2 O que fazer no refresh

O objetivo e aumentar profundidade, atualizar dados e adicionar schema
moderno — nao reescrever o texto existente.

**Sempre fazer:**
- [ ] Adicionar `updatedAt: "YYYY-MM-DD"` no frontmatter (DATA_BRT)
- [ ] Adicionar 2-3 secoes novas ao final (antes da secao de referencias)
- [ ] Adicionar 2-4 FAQs novas se ja existir secao "Perguntas Frequentes"
- [ ] Adicionar 2-4 referencias novas (preferencialmente papers dos ultimos
      3 anos) e citar no texto com `<sup>[N]</sup>`
- [ ] Verificar links internos — corrigir se alguma URL quebrou

**Quando fizer sentido:**
- [ ] Adicionar bloco `faq:` no frontmatter se o artigo tem Q&A natural e
      ainda nao tem schema FAQPage
- [ ] Atualizar precos para "(mes/ano atual)"
- [ ] Adicionar tabela de evidencia cientifica resumida com dados de RCTs

**NUNCA fazer no refresh:**
- Apagar secoes existentes (a nao ser que estejam cientificamente
  incorretas — nesse caso, substituir)
- Mudar o `publishedAt` original
- Mudar o `author` original
- Mudar o slug ou o title

### 12.3 Secoes tipicamente valiosas em refresh

Dependendo do que o artigo ja tem:

| Secao a adicionar | Quando usar |
|-------------------|-------------|
| Evidencia Cientifica Resumida | Artigo discute eficacia mas nao cita trials por extenso |
| Comparacao [A] vs [B] | Existe medicamento/tratamento relacionado que merece comparacao direta |
| Consideracoes Especificas (mulheres, adolescentes, idosos) | Artigo aborda apenas publico geral |
| Protocolo de Monitoramento | Medicamento/tratamento com efeitos que exigem follow-up |
| Combinacoes Terapeuticas | Artigo trata um medicamento isoladamente |
| Erros Comuns / O Que Evitar | Topico onde pacientes cometem erros praticos |
| Duracao do Tratamento e Descontinuacao | Medicamentos cronicos |
| Disponibilidade no Brasil (atualizada) | Precos/status ANVISA mudaram |

### 12.4 Verificacao pos-refresh

Antes do commit:

```bash
wc -w content/{categoria}/{slug}.mdx  # acima do minimo da Secao 7.3?
grep -c "doi.org" content/{categoria}/{slug}.mdx  # >= minimo + 2?
grep "updatedAt:" content/{categoria}/{slug}.mdx  # presente?
```

---

## 13. DISCLAIMER

O disclaimer medico e renderizado automaticamente pelo componente da pagina. NAO incluir no corpo do MDX.

Porem, no corpo do artigo:
- Nao fazer recomendacoes diretas de tratamento
- Sempre usar "consulte seu medico" ao falar de posologia
- Nao citar precos como definitivos
