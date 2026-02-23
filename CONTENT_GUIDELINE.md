# Capilarmente — Guia de Produção de Conteúdo

> Documento de referência para criação de artigos do Capilarmente.
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

## 8. Calendário Editorial e Frequência

### Frequência de Publicação

**3 artigos por semana** — ritmo sustentável para conteúdo médico de qualidade.

| Dia | Tipo de Conteúdo | Exemplo |
|---|---|---|
| **Segunda** | Artigo técnico (medicamentos ou tratamentos) | "Minoxidil 5%: Guia Completo" |
| **Quarta** | Artigo educacional (causas ou ciência) | "Por que o DHT causa calvície?" |
| **Sexta** | Blog / lifestyle / guia prático | "5 Sinais de que Você Deve Consultar um Tricologista" |

### Regra de Ouro: Atualizar ≥ Criar

- **Semanas 1-8:** Foco em preencher todas as categorias (meta: 40 artigos)
- **A partir do mês 3:** Dedicar 1 dos 3 slots semanais para **atualizar** artigos existentes
- Google premia **freshness** em conteúdo YMYL — um artigo atualizado com novos estudos ganha mais autoridade que um artigo novo superficial

### Prioridade por Categoria (Topical Authority)

Completar uma categoria inteira antes de expandir demais outra. Sequência recomendada:

1. **Medicamentos** — maior intenção de busca, alta conversão
2. **Causas** — funil de descoberta, captura tráfego informacional
3. **Tratamentos** — pacientes já decididos, alta intenção
4. **Blog** — SEO de cauda longa, tráfego orgânico amplo

### Backlog de Tópicos Sugeridos

#### Medicamentos (próximos)
- Alfaestradiol tópico
- Cetoconazol shampoo: funciona para queda?
- Latanoprosta para sobrancelhas e cílios
- Minoxidil 5% vs 2%: qual escolher
- Suplementos capilares: o que funciona e o que é marketing

#### Tratamentos (próximos)
- Mesoterapia capilar
- Carboxiterapia para couro cabeludo
- Terapia com LED vs laser: diferenças
- Tricopigmentação (micropigmentação capilar)
- Intradermoterapia capilar

#### Causas (próximos)
- Alopecia areata: guia completo
- Alopecia de tração
- Queda de cabelo pós-COVID
- Queda de cabelo por medicamentos
- Tricotilomania

#### Blog (próximos)
- Como escolher um dermatologista/tricologista
- Antes e depois: o que esperar de cada tratamento
- Guia de shampoos antiqueda: o que diz a ciência
- Queda de cabelo feminina vs masculina
- Custo real de tratar calvície no Brasil

---

## 9. Estratégia de Monetização por Afiliados

### Roadmap de Monetização (Fases)

**Não começar com links de afiliado.** Primeiro construir autoridade, depois monetizar.

| Fase | Período | Ação | Meta |
|---|---|---|---|
| **1. Conteúdo puro** | Meses 1-2 | Publicar 3x/semana, zero links de afiliado | Indexar 30-40 artigos, construir autoridade no Google |
| **2. Analytics** | Mês 2-3 | Instalar Google Analytics + Search Console, identificar top artigos | Saber quais artigos geram mais tráfego |
| **3. Primeiros testes** | Mês 3 | Adicionar links de afiliado nos **3-5 artigos mais acessados** | Testar CTR, validar que não impacta ranking |
| **4. Buy box** | Mês 4 | Criar componente React de buy box, aplicar nos artigos de medicamentos OTC | Padronizar experiência de compra |
| **5. Escalar** | Mês 5+ | Expandir para todos os artigos relevantes, A/B testar posicionamento | Otimizar receita por artigo |

**Por que essa ordem:**
- Sites novos com links de afiliado desde o dia 1 podem ser penalizados pelo Google
- Artigos "limpos" indexam melhor e constroem E-E-A-T orgânico
- Quando os links forem adicionados, o tráfego já existe — monetizar é só "ligar a chave"
- Permite comparar métricas: artigo com link vs sem link → mudou o ranking? Mudou o tempo na página?

**Regra:** Ao adicionar links, monitorar por 2 semanas. Se o ranking cair, remover e investigar.

### Princípios Éticos (YMYL)

A monetização por afiliados em conteúdo de saúde exige cuidado redobrado:

- **Transparência total** — sempre divulgar a relação de afiliado
- **Recomendação honesta** — só indicar produtos com evidência científica
- **Nunca sacrificar a confiança** — o leitor confia no site pela autoridade médica, perder isso é irreversível
- **Disclosure obrigatório** — incluir aviso visível antes de qualquer link de afiliado

### Disclosure Padrão

Incluir no topo de artigos que contenham links de afiliado:

```markdown
> **Transparência:** Este artigo contém links de afiliado. Se você comprar através deles, podemos receber uma comissão — sem custo adicional para você. Isso ajuda a manter o site gratuito e atualizado. Nossas recomendações são baseadas exclusivamente em evidências científicas.
```

### Tipos de Produtos para Afiliação

| Categoria | Produtos | Plataformas |
|---|---|---|
| **Medicamentos OTC** | Minoxidil (Kirkland, Pant, Rogaine), shampoos antiqueda (ketoconazol) | Amazon, Mercado Livre, farmácias online |
| **Dispositivos** | Capacetes laser (iRestore, HairMax), dermarollers, pentes laser | Amazon, sites oficiais |
| **Suplementos** | Biotina, complexos capilares, colágeno (somente com evidência) | Amazon, Beleza na Web |
| **Cuidados capilares** | Shampoos, condicionadores, tônicos com ingredientes comprovados | Amazon, farmácias |
| **Consultas** | Telemedicina dermatológica, plataformas de saúde | Programas próprios |

### Onde Inserir Links de Afiliado (Estratégia por Seção)

#### 1. Seção "Disponibilidade no Brasil" (melhor local)
O leitor já leu sobre eficácia, efeitos colaterais e decidiu que quer comprar. Momento ideal.

```markdown
## Disponibilidade no Brasil

O minoxidil 5% solução tópica está disponível sem receita no Brasil.

**Onde comprar:**
- [Kirkland Minoxidil 5% — frasco 60ml](link-afiliado) — a partir de R$ 89 (fev/2026)
- [Pant Minoxidil 5% — nacional](link-afiliado) — a partir de R$ 65 (fev/2026)

*Preços sujeitos a alteração. Última verificação: fev/2026.*
```

#### 2. Seção "O Procedimento" — para dispositivos
Quando o artigo descreve equipamentos que o paciente pode usar em casa.

```markdown
### Dispositivos para Uso Domiciliar

Para LLLT em casa, os dispositivos mais estudados clinicamente são:

- [iRestore Essential](link-afiliado) — FDA-cleared, 51 lasers — a partir de R$ 2.500
- [HairMax LaserBand 82](link-afiliado) — FDA-cleared, 82 lasers — a partir de R$ 4.200

> ⚠️ Dispositivos sem certificação FDA/ANVISA não possuem garantia de segurança ou eficácia.
```

#### 3. Comparativos (artigos de blog)
Artigos como "Minoxidil 5% vs 2%" ou "Melhor shampoo antiqueda" são naturalmente orientados a compra.

```markdown
## Comparativo de Preços

| Produto | Concentração | Preço Médio | Link |
|---|---|---|---|
| Kirkland Minoxidil | 5% | R$ 89 | [Ver preço](link-afiliado) |
| Pant Minoxidil | 5% | R$ 65 | [Ver preço](link-afiliado) |
| Rogaine | 5% espuma | R$ 189 | [Ver preço](link-afiliado) |
```

#### 4. Sidebar/CTA Box (componente reutilizável)
Criar um componente React para CTA boxes padronizados:

```markdown
> 🛒 **Produto mais recomendado pelos leitores:**
> [Minoxidil Kirkland 5% — 6 meses de tratamento](link-afiliado)
> ★★★★★ 4.8/5 (12.000+ avaliações) — a partir de R$ 249
```

### Onde NÃO Colocar Links de Afiliado

| Local | Motivo |
|---|---|
| ❌ Seção "Efeitos Colaterais" | Gera desconfiança — parece que está minimizando riscos para vender |
| ❌ Seção "Contraindicações" | Mesmo motivo — conflito de interesse evidente |
| ❌ Dentro de citações científicas | Destrói credibilidade acadêmica |
| ❌ Disclaimer médico | Jamais misturar aviso legal com monetização |
| ❌ FAQ médicas | O leitor está buscando informação imparcial |
| ❌ Primeiros 2 parágrafos | Agressivo demais, afasta o leitor antes de gerar confiança |

### Métricas e Otimização

- **CTR por seção:** Rastrear qual seção gera mais cliques (usar UTM parameters)
- **A/B test de copy:** Testar "Ver preço" vs "Comprar agora" vs "Onde encontrar"
- **Sazonalidade:** Reforçar links em janeiro (resolução de ano novo) e setembro (primavera)
- **Atualizar preços:** Revisar preços nos artigos mensalmente — preço desatualizado gera abandono

### Programas de Afiliado Recomendados

| Programa | Comissão | Ideal Para |
|---|---|---|
| Amazon Associados BR | 4-8% | Minoxidil, dispositivos, suplementos |
| Mercado Livre Afiliados | 5-12% | Produtos nacionais, volume alto |
| Beleza na Web | 5-10% | Shampoos, cuidados capilares |
| Programas diretos (marcas) | 10-20% | Dispositivos laser, clínicas parceiras |
| Hotmart / Eduzz | 30-50% | Cursos/ebooks sobre saúde capilar (se aplicável) |

### Regras de Compliance

1. **Disclosure FTC/CONAR:** Todo artigo com links de afiliado deve ter aviso no topo
2. **Não recomendar medicamentos tarjados:** Links de afiliado apenas para produtos OTC (sem receita)
3. **Preços com data:** Sempre incluir "(mês/ano)" ao lado do preço
4. **Não criar urgência falsa:** Evitar "últimas unidades" ou "desconto por tempo limitado"
5. **Separar editorial de comercial:** O texto científico deve existir independente dos links — se remover todos os links, o artigo ainda deve fazer sentido completo

---

## 10. Resumo da Estratégia (para automação/bot)

```
📋 Estratégia de Conteúdo — Capilarmente

Frequência: 3x por semana
- Segunda → artigo técnico (medicamentos/tratamentos)
- Quarta → artigo educacional (causas/ciência)
- Sexta → blog/guia prático

Meses 1-2: Foco total em publicar. Meta: 40 artigos. Zero links de afiliado.

Mês 3+: 2 artigos novos + 1 atualização de artigo existente por semana.

Prioridade de categorias: Medicamentos → Causas → Tratamentos → Blog
(completar uma antes de expandir outra).

Freshness: Artigos existentes devem ser revisados a cada 3-6 meses com
novos estudos/dados. Google premia conteúdo médico atualizado mais do que
conteúdo novo raso.

Monetização: Só a partir do mês 3, começando pelos 3-5 artigos com mais
tráfego. Mês 4 buy box. Mês 5+ escalar.

Regra: Todo artigo precisa de referências PubMed reais com DOI. Mínimo 5
para medicamentos, 4 para tratamentos/causas, 2 para blog.
```

---

## 11. Checklist de Publicação

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
