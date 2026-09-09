# Capilarmente — critérios de conteúdo

Este guia foi corrigido em 9/9/2026 e deve ser usado junto com `AGENT.md`. O plano antigo de preencher artigos por volume, atribuir personas médicas e repetir percentuais sem conferência foi substituído por manutenção baseada em evidência e intenção de busca.

## Autoria e transparência

A autoria atualmente publicada é `equipe-editorial` (Redação Capilarmente), uma organização editorial com apoio de IA. Não há revisão médica independente declarada. Não invente CRM, RQE, vínculo profissional, experiência prática, testes de produtos ou aprovação de especialista. Uma revisão só pode receber atribuição quando a pessoa, as credenciais, a autorização e o trabalho realizado estiverem documentados.

## Conteúdo que ajuda a decidir

Responda à pergunta principal logo no início. A estrutura deve seguir a dúvida, sem obrigação de preencher seções, palavras, tags ou quantidade de referências. Cada fato precisa de fonte suficiente; acumular citações não corrige uma afirmação sem suporte.

Para temas clínicos, diferencie mecanismo, associação observacional, ensaio controlado e recomendação de sociedade profissional. Descreva população, intervenção, comparação, duração e limitações quando forem relevantes. Resultados de couro cabeludo não provam resultados de barba ou cílios. Uma fórmula combinada não demonstra o efeito isolado de cada ingrediente.

Não transforme uma descrição em prescrição individual. Doses, riscos, status regulatório e indicação precisam de documento oficial atual e contexto; não publique protocolos de automedicação nem instruções de procedimentos invasivos em casa. Se o dado não foi confirmado, reformule ou remova a afirmação.

## Fontes e referências

Leia as fontes primárias. Compare título, autores e identificadores DOI/PMID/PMC com o trabalho que de fato sustenta o texto. Resolva alertas dos scripts `audit-references.py` e `audit-pubmed.py` manualmente. O sucesso de um link ou a correspondência de metadados não provam suporte clínico.

Use links diretos para estudo, documento regulatório, bula ou orientação profissional. Não invente DOI, referência brasileira, dado de prevalência, faixa regional de preços ou taxa de sucesso. Não transfira uma autorização dos EUA para o Brasil.

Preserve `publishedAt`. Atualize `updatedAt` somente após mudança relevante e explique correções em `correctionNote`. Registre o que foi conferido em `reports/editorial/`.

## Compra e monetização

Os primeiros guias comerciais são shampoos cosméticos, perucas/próteses e fibras de camuflagem. A configuração é `config/affiliate-offers.json`; use somente links reais fornecidos ou autorizados pelo responsável. Não crie uma parceria nem uma credencial de afiliado por suposição.

O aviso de comissão deve aparecer antes da oferta e todo link remunerado deve usar `rel="sponsored nofollow"`. Não invente avaliação, nota, número de compradores, escassez ou experiência de teste. Diferencie análise documental de teste de uso.

Preços reais exigem apresentação, loja, data e URL. Exemplos matemáticos devem ser identificados como hipotéticos. Compare unidade, frete, manutenção e custo total. Uma comissão não deve determinar a conclusão editorial.

Não há regra geral de que inserir um link de afiliado em um domínio novo cause uma penalidade, nem garantia de que um texto sem links será indexado. Evite esse tipo de afirmação sem evidência.

## Formato e validação

O frontmatter segue o modelo de `AGENT.md`. O template produz o único H1; o corpo começa por introdução e H2. Perguntas frequentes úteis podem aparecer no corpo, sem FAQPage oculto. Toda página precisa de título claro, descrição fiel, canonical, imagem pertinente e links internos úteis.

Antes da entrega: `npm run covers`, `npm run lint`, `npm test`, `npm run build` e `npm run verify:build`. Se fontes mudarem, execute `npm run audit:references`. Revise visualmente a página e a imagem. Depois de publicação autorizada, confirme conteúdo e arquivos no domínio real antes de enviar as URLs alteradas ao IndexNow.
