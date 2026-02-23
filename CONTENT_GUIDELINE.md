# Hair Loss BR — Guia de Produção de Conteúdo

> Documento de referência para criação de artigos do Hair Loss BR.
> Todas as publicações devem seguir este guia para manter consistência, autoridade médica e qualidade editorial.

---

## 1. Princípios Fundamentais

### E-E-A-T (Google YMYL)

Este site trata de saúde (YMYL — Your Money or Your Life). Todo conteúdo deve demonstrar:

- **Experience** — Experiência prática do autor no tema
- **Expertise** — Credenciais médicas verificáveis (CRM, RQE)
- **Authoritativeness** — Referências em periódicos indexados, vínculo com sociedades médicas
- **Trustworthiness** — Transparência sobre limitações, disclaimer médico obrigatório

### Idioma

- Português brasileiro (pt-BR) com acentuação correta
- Termos técnicos devem ser explicados na primeira ocorrência
- Evitar anglicismos quando houver termo equivalente em português

---

## 2. Schema do Frontmatter

Cada arquivo `.mdx` em `/content/{categoria}/` deve iniciar com:

```yaml
---
title: "Título do Artigo — 50 a 70 caracteres"
description: "Meta description para SEO — 120 a 160 caracteres"
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"           # Opcional. Adicionar ao atualizar o conteúdo.
author: "slug-do-autor"           # Obrigatório. Deve existir em lib/content.ts
medicalReviewer: "slug-do-autor"  # Opcional. Diferente do author.
category: "Nome da Categoria"     # Display name: "Medicamentos", "Tratamentos", "Causas", "Blog"
tags: ["tag1", "tag2", "tag3"]    # 5 a 8 tags relevantes
featured: false                   # true para destaque na homepage
---
```

### Autores Disponíveis

| Slug | Nome | Especialidade |
|------|------|---------------|
| `dr-silva` | Dr. Ricardo Silva | Dermatologista / Tricologista |
| `dra-oliveira` | Dra. Carolina Oliveira | Endocrinologista |
| `dr-santos` | Dr. Fernando Santos | Cirurgião Capilar |
| `dra-costa` | Dra. Mariana Costa | Tricologista |
| `dr-almeida` | Dr. Paulo Almeida | Dermatologista / Pesquisador |
| `dra-lima` | Dra. Juliana Lima | Nutrologista |

### Regra de Autoria

- **author** = quem escreveu o artigo (escolher pela especialidade mais relevante)
- **medicalReviewer** = quem revisou (diferente do autor, idealmente de outra especialidade)

---

## 3. Estrutura por Categoria

### 3.1 Medicamentos (`content/medicamentos/`)

Artigos sobre fármacos para tratamento capilar.

```
## O que é [Medicamento]
Introdução breve + classificação farmacológica

## Mecanismo de Ação
Como o medicamento funciona no nível molecular/celular

## Indicações
Para quem é indicado, tipos de alopecia tratáveis

## Posologia e Modo de Uso
Dosagem, frequência, forma de aplicação

## Resultados Esperados
Timeline realista: 3 meses, 6 meses, 12 meses
Incluir dados de estudos clínicos com % de eficácia

## Efeitos Colaterais
Comuns, incomuns e raros — com frequência (%)
Quando procurar atendimento médico

## Contraindicações
Quem NÃO deve usar

## Disponibilidade no Brasil
- Status ANVISA (aprovado/off-label)
- Nomes comerciais
- Faixa de preço (com data de referência)
- Necessidade de prescrição

## Perguntas Frequentes
3 a 5 perguntas reais dos pacientes

## Referências
[Ver seção 4 para formato]
```

### 3.2 Tratamentos (`content/tratamentos/`)

Artigos sobre procedimentos e terapias.

```
## O que é [Tratamento]
Introdução + contexto histórico breve

## Como Funciona
Mecanismo de ação ou princípio do procedimento

## Candidatos Ideais
Perfil do paciente ideal, classificação Norwood/Ludwig aplicável

## O Procedimento Passo a Passo
Descrição detalhada do que o paciente pode esperar

## Recuperação e Cuidados Pós-Procedimento
Timeline de recuperação, cuidados necessários

## Resultados Esperados
Tempo para resultados, taxa de satisfação, fotos de antes/depois (quando aplicável)

## Riscos e Complicações
Frequência de eventos adversos

## Custos no Brasil
Faixa de preço por região, o que influencia o custo

## Como Escolher um Profissional
Certificações necessárias, perguntas para fazer na consulta

## Perguntas Frequentes
3 a 5 perguntas

## Referências
```

### 3.3 Causas (`content/causas/`)

Artigos sobre tipos de alopecia e seus fatores.

```
## O que é [Condição]
Definição médica + prevalência no Brasil

## Causas e Fatores de Risco
Genéticos, hormonais, ambientais, nutricionais

## Sintomas e Sinais
Como identificar, padrões de queda

## Diagnóstico
Exames necessários, escalas de classificação (Norwood, Ludwig, SALT)

## Classificação / Estágios
Graus da condição com descrição de cada fase

## Tratamentos Disponíveis
Resumo com links para artigos detalhados de medicamentos/tratamentos

## Prevenção
O que a ciência diz sobre prevenção

## Quando Procurar um Médico
Sinais de alerta, qual especialista consultar

## Perguntas Frequentes

## Referências
```

### 3.4 Blog (`content/blog/`)

Artigos informativos, guias práticos e lifestyle.

```
## [Introdução envolvente]
Contexto do tema + por que importa

## [Seções de conteúdo — flexível]
Organizar conforme o tema exigir

## Dicas Práticas / Conclusão
Takeaways acionáveis para o leitor

## Referências
Obrigatório quando citar dados ou estudos
```

---

## 4. Padrão de Referências Científicas

### 4.1 Requisitos Mínimos

| Tipo de Artigo | Mínimo de Referências | Ideal |
|---|---|---|
| Medicamentos | 5 | 8-12 |
| Tratamentos | 4 | 6-10 |
| Causas | 4 | 6-10 |
| Blog | 2 | 3-6 |

### 4.2 Fontes Aceitáveis (em ordem de preferência)

1. **Meta-análises e revisões sistemáticas** (Cochrane, PubMed)
2. **Ensaios clínicos randomizados** (RCTs)
3. **Estudos de coorte e caso-controle**
4. **Guidelines de sociedades médicas** (SBD, AAD, BAD, ISHRS)
5. **Documentos regulatórios** (ANVISA, FDA)
6. **Estudos observacionais e séries de casos**

### 4.3 Formato de Citação no Texto

Usar `<sup>` HTML para citações inline:

```markdown
A finasterida 1mg reduz os níveis séricos de DHT em aproximadamente 70%<sup>[1]</sup>,
com melhora clínica em até 90% dos pacientes após 2 anos<sup>[2]</sup>.
```

### 4.4 Formato da Seção de Referências

```markdown
## Referências

1. Kaufman KD, Olsen EA, Whiting D, et al. Finasteride in the treatment of men with
   androgenetic alopecia. *J Am Acad Dermatol*. 1998;39(4 Pt 1):578-589.
   [doi:10.1016/S0190-9622(98)70007-6](https://doi.org/10.1016/S0190-9622(98)70007-6)

2. Olsen EA, Hordinsky M, Whiting D, et al. The importance of dual 5alpha-reductase
   inhibition in the treatment of male pattern hair loss. *J Am Acad Dermatol*.
   2006;55(6):1014-1023.
   [doi:10.1016/j.jaad.2006.05.007](https://doi.org/10.1016/j.jaad.2006.05.007)
```

**Regras:**
- Autor(es), título, periódico (itálico), ano, volume, páginas
- DOI obrigatório quando disponível — link clicável
- Para ANVISA: `ANVISA. [Nome do documento]. [Ano]. Disponível em: [URL]`
- Estudos brasileiros (HCFMUSP, UNIFESP, etc.) são preferidos quando existem

### 4.5 Referências Reais Obrigatórias

**Não inventar referências.** Cada DOI deve ser de um paper real existente no PubMed ou periódico indexado. Papers frequentemente citados na área:

- Kaufman KD, 1998 — Finasterida (JAAD)
- Olsen EA, 2002 — Minoxidil 5% vs 2% (JAAD)
- Piraccini BM, Alessandrini A, 2014 — Androgenetic alopecia (G Ital Dermatol Venereol)
- Dhurat R, Sukesh M, 2013 — Microagulhamento + minoxidil
- Avram MR, Rogers NE, 2009 — Transplante capilar (Dermatol Surg)
- Jimenez-Cauhe J, et al, 2020 — Minoxidil oral (JAAD)
- Sinclair R, 2005 — Espironolactona para alopecia feminina
- Kim H, et al, 2013 — Laser de baixa potência (Lasers Med Sci)

---

## 5. Tom de Voz e Estilo

### Tom
- **Informativo** — apresentar fatos, não opiniões
- **Empático** — reconhecer o impacto emocional da queda de cabelo
- **Autoritário** — demonstrar conhecimento sem ser arrogante
- **Nunca alarmista** — não usar linguagem que gere medo desnecessário

### Regras de Escrita

| Fazer | Não Fazer |
|---|---|
| "Estudos demonstram eficácia de 80%" | "É o melhor tratamento que existe" |
| "Resultados podem variar entre pacientes" | "Garantia de resultado em 3 meses" |
| "Consulte um dermatologista" | "Comece a usar imediatamente" |
| "A partir de R$ 80 (fev/2026)" | "Custa apenas R$ 80" |
| Citar fonte para cada dado numérico | Apresentar dados sem referência |

### Pessoa gramatical

- **Terceira pessoa** para conteúdo médico-científico
- **Segunda pessoa** ("você") permitida em seções práticas e FAQs
- **Primeira pessoa do plural** ("nosso guia") apenas em introduções/conclusões

---

## 6. SEO

### Títulos (tag `<title>`)
- 50 a 70 caracteres
- Formato: `{Tema}: {Benefício/Contexto}`
- Exemplo: `Finasterida: Guia Completo para Tratamento da Calvície`

### Meta Description
- 120 a 160 caracteres
- Incluir palavra-chave principal + benefício
- Exemplo: `Tudo sobre finasterida 1mg para calvície — eficácia, efeitos colaterais, preço no Brasil e orientações de uso seguro.`

### Tags
- 5 a 8 tags por artigo
- Incluir: nome do tratamento, "queda de cabelo", "alopecia", termos relacionados
- Evitar tags genéricas demais ("saúde", "medicina")

### Links Internos
- Cada artigo deve linkar para 2-3 artigos relacionados de outras categorias
- Exemplo: artigo de minoxidil linka para alopecia androgenética (causas) e microagulhamento (tratamentos)

---

## 7. Disclaimer Médico

Todo artigo é automaticamente exibido com o disclaimer:

> **Aviso médico:** Este conteúdo é informativo e não substitui consulta com dermatologista ou médico especialista. Sempre procure orientação profissional antes de iniciar qualquer tratamento.

Este disclaimer é renderizado pelo componente `app/[category]/[slug]/page.tsx`. Não é necessário incluí-lo no corpo do MDX.

Além disso, no corpo do artigo:
- Não fazer recomendações diretas de tratamento
- Sempre usar "consulte seu médico" ao falar de posologia
- Não citar preços como definitivos — usar "a partir de" com data

---

## 8. Checklist de Publicação

Antes de publicar qualquer artigo, verificar:

- [ ] Frontmatter completo com todos os campos obrigatórios
- [ ] Author e medicalReviewer são slugs válidos
- [ ] Título entre 50-70 caracteres
- [ ] Description entre 120-160 caracteres
- [ ] 5-8 tags relevantes
- [ ] Mínimo de referências atendido para a categoria
- [ ] Todas as referências possuem DOI links reais
- [ ] Acentuação correta em todo o texto
- [ ] Links internos para 2-3 artigos relacionados
- [ ] Sem promessas absolutas ou linguagem alarmista
- [ ] Dados numéricos possuem citação
- [ ] Preços com data de referência e "a partir de"
