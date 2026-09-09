# Correções de SEO — Capilarmente

Data: 9/9/2026. Branch: `codex/seo-recovery-2026-09-09`. Base: `7591f50`.

## Resultado local validado

- 95 páginas no sitemap, incluindo 83 artigos. As seis páginas antigas de autores são substituídas por uma redação editorial e redirecionamentos permanentes. Novo guia de fibras capilares e página de contato preparada.
- Um H1 por página. Títulos de busca ajustados; nenhum título excedeu 75 caracteres no HTML validado. Canonicals, links internos, âncoras e imagens validados em todas as páginas do sitemap.
- 83 capas originais geradas por código e imagem social do site. Open Graph/Twitter com imagens, dimensões e prévia grande. Nenhum paciente ou antes/depois fictício.
- Schema de artigo e organização coerente com a autoria publicada. Removidas credenciais profissionais sem comprovação, revisão médica atribuída sem registro e FAQPage de conteúdo oculto.
- Página inicial, autoria, política editorial, privacidade e rodapé reformulados. Cron e guias internos deixam de incentivar geração por volume e personas. O cron preserva mudanças locais e só continua após atualização Git bem-sucedida.
- Roteiro de seis perguntas substitui pontuação diagnóstica e recomendação de medicamentos. Respostas locais, resumo imprimível, restauração validada, descarte de dados antigos/malformados, foco e navegação acessíveis.
- Calculadora de orçamento sem indicação de tratamento. Separa custos recorrentes e compra única; valida campos e não transmite quantias às métricas.
- Guias de custo, shampoos, PRF, barba, latanoprosta, laser, biotina, vitamina D, pós-Covid, Procapil, radiofrequência, SMP, tricopigmentação e perucas/próteses receberam correções substanciais. Novo guia de fibras. Evidência em `editorial/2026-09-09.md`.
- Auditoria bibliográfica final: 394 citações DOI / 347 DOIs únicos, todos resolvidos e sem alertas de correspondência de título; 54 links PubMed/PMC, sem alertas de identidade no verificador. Isso não significa revisão clínica de todas as afirmações.
- Next.js/React e dependências atualizados. `npm audit`: zero vulnerabilidades na verificação. Lint, TypeScript, cinco testes e build passaram.

## GA4

- Conta existente DLTecnologia; propriedade Capilarmente `553499292`.
- Fluxo Web `15750113744`, medição `G-5HGNQ66T34`, URL `https://www.capilarmente.com.br`.
- Medição automática ampliada desativada. Eventos principais `quiz_complete` e `affiliate_click` criados sem valor monetário presumido. `purchase` é o evento padrão da plataforma e não é disparado pelo site.
- Search Console do domínio vinculado com sucesso ao novo fluxo em 9/9/2026.
- Tag só carrega após aceitar métricas e somente no domínio público. Recusa, DNT/GPC e previews bloqueiam a medição. Eventos permitidos: `quiz_start`, `quiz_step`, `quiz_complete`, `calculator_use`, `affiliate_click`. Nenhuma resposta, sintoma ou valor digitado faz parte do payload.
- URLs limitadas a páginas conhecidas, sem query/hash; origem de referência limitada ao domínio. Publicidade e Google Signals desativados no código. Cookies configurados para até 180 dias sem renovação a cada visita.
- Registro de eventos no domínio real: aguardando publicação e conferência.

## Domínio e indexação

- Domínio sem www configurado na Vercel com destino www e status permanente 308 (API confirmou a gravação).
- Chave pública e comando IndexNow preparados. O envio valida primeiro a chave publicada, HTTP e canonical. Ainda não foi enviado antes da conferência pública.
- Sitemap canônico local: 95 URLs, sem perfis profissionais antigos. Google/Bing serão atualizados após publicação.
- Linha de base da auditoria: Google 20 cliques / 2,69 mil impressões / CTR 0,7% / posição 11,1; Bing 266 cliques / 16,2 mil impressões / CTR 1,64% / posição 5,3, nas janelas registradas no relatório original.

## Testes de navegador

Chrome, build estático, desktop e viewport de 390 × 844. Página inicial e menu mobile conferidos. Roteiro concluído em seis etapas, avanço bloqueado sem resposta e progresso restaurado ao recarregar. Link de leitura abriu a calculadora. Teste de orçamento: 80 mensais + duas consultas de 300 + 200 únicos = 1.760 no primeiro ano, 146,67 equivalentes por mês e 1.560 recorrentes por ano. Campos vazios produziram mensagem de validação.

## Pendências reais

1. O usuário autorizou `contato@capilarmente.com.br` como contato editorial. Endereço incluído; o encaminhamento no Cloudflare foi explicitamente deixado para depois. O recebimento de e-mail ainda não foi validado.
2. O usuário pediu para deixar afiliados preparados e enviará os links posteriormente. O componente, aviso e medição estão prontos; `config/affiliate-offers.json` permanece vazio. Ainda não há receita de afiliados implementada.
3. Revisão médica independente exige um profissional real, autorizado, e conferência documentada dos textos. Não foi simulada.
4. Core Web Vitals de campo: dados insuficientes na auditoria. A skill web-perf exige Chrome DevTools MCP para seu trace; esse MCP não está disponível. Validação funcional/visual não substitui medição de desempenho.
5. Publicação, crawl público, IndexNow e atualização de sitemaps: em execução. Indexação e evolução de ranking dependem dos buscadores e devem ser comparadas à linha de base, sem garantia de resultado.

## Próxima leitura dos indicadores

Após os buscadores processarem as alterações, comparar custo, PRF, barba, latanoprosta, laser e shampoos por página e consulta. Medir CTR junto com posição e impressões; observar conversões do roteiro e cliques nas ofertas quando houver ofertas reais. Não interpretar ausência de dados da propriedade recém-criada como tráfego histórico zero.

## Identidade de publicação

O primeiro preview foi bloqueado pela Vercel por não associar o e-mail corporativo do autor à conta GitHub. A API GitHub confirmou a conta `diegosquid` (ID 7774898) e que o commit antigo não tinha autor associado. O usuário autorizou o endereço noreply dessa conta somente neste projeto. A configuração Git local foi corrigida para `7774898+diegosquid@users.noreply.github.com`; nenhuma permissão ou associação de conta foi alterada.
