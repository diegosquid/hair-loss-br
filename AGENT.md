# Capilarmente — manutenção editorial

Estas instruções substituem o antigo fluxo de geração por volume e personas.

## 1. Princípios

- A autoria atual é `equipe-editorial`, Redação Capilarmente. Não invente profissionais, CRM, RQE, experiência de uso ou revisão médica. `medicalReviewer` só pode ser restabelecido com identidade, credenciais, autorização e revisão efetivamente documentadas.
- Use português brasileiro claro. Responda à intenção da busca sem preencher uma contagem mínima de palavras.
- Não transforme estudos exploratórios em promessas, nem escreva prescrição individual. Não ofereça combinações de medicamentos como pacotes de compra.
- Não altere a data original de publicação. Use `updatedAt` e `correctionNote` somente quando houver mudança editorial relevante.
- Não acrescente seções ou referências apenas para aparentar atualização. Corrija ou remova afirmações erradas, mesmo que a página fique menor.

## 2. Fluxo de execução

1. Verifique o branch, as alterações locais e o histórico. Se houver trabalho de outra pessoa, pare sem stash, reset ou limpeza.
2. Leia `reports/IMPLEMENTACAO.md`, quando existir, e priorize correções pendentes. Escolha no máximo um artigo por execução. Os primeiros temas são custo, shampoos, PRF, barba, latanoprosta e laser.
3. Leia a página existente e confira intenção, duplicação temática e links internos. Não crie outra URL para a mesma dúvida.
4. Pesquise fontes primárias: documentos oficiais, bula do fabricante, estudos originais e orientações de sociedades profissionais. Leia a fonte que sustenta a afirmação. Um DOI resolvendo não prova que o estudo diz aquilo.
5. Confira autores, título, desenho, população, desfechos e limitações. Dados sobre couro cabeludo não podem ser transferidos para barba/cílios, nem uma formulação para outra sem justificativa.
6. Preços precisam de produto/apresentação, vendedor, URL e data observada. Identifique exemplos hipotéticos. Não invente levantamento nacional ou regional, experiência de teste ou taxas de sucesso.
7. Edite apenas o necessário. Cada artigo recebe um H1 pelo template: o corpo começa com introdução e H2. Use links para guias relacionados existentes, parágrafos curtos e tabelas legíveis.
8. Registre fontes e a verificação das afirmações em `reports/editorial/`. Se a fonte não estiver acessível ou não sustentar a afirmação, remova/reformule a afirmação ou deixe uma pendência explícita; não publique material não verificado.
9. Rode `npm run covers`, `npm run lint`, `npm test`, `npm run build`, `npm run verify:build` e o verificador de referências quando fontes mudarem. Inspecione manualmente os alertas e registre a resolução. A checagem bibliográfica não equivale a revisão clínica.
10. Faça commit seletivo, descrevendo o problema e a correção. Publicação só segue o escopo de autorização da tarefa. Não trate o cron como autorização para substituir arquivos locais ou publicar material sem verificação.
11. Após a publicação autorizada, confira o HTML público, canonical, conteúdo e imagem real da URL alterada. Só depois rode `npm run indexnow -- --submit URL`. Não envie todas as URLs repetidamente e não solicite indexação de rascunhos.

## 3. Frontmatter

```yaml
---
title: "Título claro para a pessoa que vai ler"
seoTitle: "Título de busca, se precisar ser mais curto"
description: "Resumo preciso da dúvida respondida, sem promessa clínica."
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD" # somente quando o conteúdo mudar
correctionNote: "O que foi corrigido, quando aplicável."
author: "equipe-editorial"
category: "Blog" # ou Medicamentos, Tratamentos, Causas
tags: ["termos pertinentes"]
featured: false
---
```

Use a data de Brasília (`TZ=America/Sao_Paulo date +%F`). A imagem é gerada em `public/images/articles/categoria-slug.png`; revise a composição. Não crie imagens de antes/depois ou pacientes fictícios apresentados como reais.

## 4. Comparações e monetização

- Diferencie análise documental de teste prático. Para declarar teste, documente método, condições e resultado realmente observado.
- Use o custo por unidade para comparar embalagens e o custo total para manutenção/serviços. Sem preços atuais, explique os critérios e não invente faixas.
- Links remunerados devem ter aviso visível e `rel="sponsored nofollow"`. Só configure URLs de afiliado fornecidas e verificadas; nunca invente parceria.
- O roteiro educativo não calcula diagnóstico, gravidade, risco ou tratamento. Não envie suas respostas, valores da calculadora ou dados pessoais à análise de navegação.

## 5. SEO e publicação

- Mantenha slugs úteis, canonical HTTPS com www, sitemap com URLs indexáveis e datas verdadeiras.
- Não inclua FAQPage para perguntas ocultas. O template não usa esse recurso; escreva perguntas e respostas úteis no corpo.
- Preserve evidências do HTML publicado. Build verde, HTTP 200 e envio de sitemap não significam indexação ou melhoria de ranking.
- Em erro de build, fonte, autenticação ou Git, pare e registre o motivo. Não contorne falhas prosseguindo para push.
