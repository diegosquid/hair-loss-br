# Capilarmente

Publicação sobre queda de cabelo, cuidados e custos no Brasil. Next.js com exportação estática para `dist/`, hospedada no projeto Vercel `hair-loss-br`.

## Desenvolvimento e validação

```sh
npm ci
npm run dev
```

```sh
npm run covers
npm run lint
npm test
npm run build
npm run verify:build
```

As imagens são geradas por código a partir de títulos e categorias. O build atualiza a lista de páginas conhecidas para a medição. `npm run audit:references` confere identificadores bibliográficos; os alertas e o suporte das afirmações exigem leitura editorial.

## Conteúdo

Leia `AGENT.md`, `CONTENT_GUIDELINE.md` e `reports/IMPLEMENTACAO.md`. Os arquivos em `content/` preservam a data original e usam a Redação Capilarmente como autoria. Não há revisão médica independente declarada.

## Analytics

GA4: propriedade `553499292`, fluxo `15750113744`, medição `G-5HGNQ66T34`.

O componente `SiteAnalytics` carrega a tag somente após consentimento, no domínio público com www. Preview e localhost não enviam eventos. Coleta automática ampliada desativada; eventos personalizados têm parâmetros permitidos por uma lista restrita. Respostas e valores digitados não são transmitidos. Publicidade e Google Signals desativados no código.

## Contato e ofertas

O endereço editorial autorizado é `contato@capilarmente.com.br`. O encaminhamento de e-mail no Cloudflare será configurado em etapa posterior pelo responsável. `NEXT_PUBLIC_CONTACT_EMAIL` permite substituir o endereço em um novo build.

`config/affiliate-offers.json` está vazio até receber links reais. Cada item deve ter `id`, `title`, `merchant`, `url` HTTPS, `note` e `articleSlugs`. Slugs permitidos: `guia-shampoos-antiqueda`, `perucas-proteses-capilares`, `fibras-capilares-como-escolher`. O aviso de comissão e `rel="sponsored nofollow"` são aplicados pelo componente. Não configure produtos medicamentosos nesses espaços.

## IndexNow

A chave de verificação é publicada no arquivo de texto correspondente em `public/`. O comando sem `--submit` apenas mostra o lote:

```sh
npm run indexnow -- https://www.capilarmente.com.br/blog/fibras-capilares-como-escolher
npm run indexnow -- --submit https://www.capilarmente.com.br/blog/fibras-capilares-como-escolher
```

O envio verifica primeiro chave, status HTTP e canonical públicos. Uma resposta 200/202 confirma recebimento, não indexação ou ranking. Envie somente URLs alteradas e já publicadas.
