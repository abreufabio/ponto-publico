# Roteiro para vídeo de demonstração — Ponto Público

**Duração-alvo:** aproximadamente 4 min 30 s.  
**Importante:** grave **sua própria voz** e mostre a aplicação publicada no GitHub Pages. Abra `js/core/config.js`, `js/core/api.js` e `js/servicos/` no editor quando for explicar o código. Abaixo está uma sugestão de fala, que pode ser adaptada.

## 00:00–00:30 — Apresentação

> Olá, meu nome é Fábio da Silva de Abreu e este é o Ponto Público, um projeto de utilidade pública desenvolvido para a disciplina de Aplicações Frontend. O objetivo é reunir em uma página consultas úteis sobre endereços, DDDs, feriados nacionais e municípios brasileiros. O sistema foi construído com HTML, CSS, JavaScript puro e Bootstrap, sem back-end, e está publicado no GitHub Pages.

**Na tela:** mostrar URL do GitHub Pages, cabeçalho e a apresentação do site.

## 00:30–01:15 — CEP e DDD

> Vou começar pela consulta de CEP. Digito 01001-000 e clico em Consultar CEP. O sistema faz uma requisição GET ao ViaCEP e apresenta o logradouro, o bairro, a cidade, a UF e o DDD. Há também um botão para copiar o endereço. Agora, na consulta de DDD, digito 61 e pesquiso. A BrasilAPI retorna o estado e a relação de cidades que usam esse código telefônico.

**Na tela:** pesquisar `01001-000`, mostrar os dados, consultar DDD `61`.

## 01:15–01:55 — Feriados e municípios

> O terceiro serviço exibe os feriados nacionais. Posso mudar o ano e filtrar as datas que ainda vão acontecer. Na área de municípios, o sistema primeiro busca a lista dos estados na API do IBGE. Depois, quando escolho uma UF, faz outra requisição para carregar seus municípios. Também consigo filtrar a lista digitando o nome de uma cidade.

**Na tela:** alterar ano, aplicar filtro; selecionar `SP`, pesquisar `são`.

## 01:55–03:15 — Explicação dos cinco endpoints no código

> Agora vou mostrar como o código funciona. No arquivo `js/core/config.js`, o objeto `URLS` armazena os endereços dos cinco endpoints. O primeiro é GET do ViaCEP para consultar um CEP. O segundo é GET da BrasilAPI para consultar um DDD. O terceiro é GET da BrasilAPI para listar os feriados de um ano. O quarto é GET do IBGE para obter os estados. E o quinto é GET do IBGE para obter os municípios de uma UF. São cinco caminhos de recursos distintos, não apenas parâmetros diferentes.
>
> No arquivo `js/core/api.js`, a função `consultarJSON` centraliza o uso de `fetch`, com `async/await`. Ela verifica `response.ok`, usa `response.json()` e envolve o procedimento em `try/catch`. Também possui um limite de 12 segundos para uma resposta. Os arquivos da pasta `js/servicos/` usam os dados recebidos e atualizam cada parte da interface: `buscarCEP`, `buscarDDD`, `carregarFeriados`, `carregarEstados` e `carregarMunicipios`. O `js/app.js` registra os eventos e inicia as consultas. O resultado aparece em cartões, listas e campos de seleção.

**Na tela:** abrir `config.js` e mostrar `URLS`; abrir `api.js` e apontar `fetch` e tratamento de falhas; abrir os quatro arquivos de `js/servicos/` e mostrar as cinco funções que usam os resultados. Por fim, apontar a inicialização em `js/app.js`.

## 03:15–03:55 — Erro de rede e validação

> Para demonstrar o tratamento de falhas, vou abrir o DevTools, entrar na aba Network e colocar em Offline. Agora, ao tentar buscar um CEP, o sistema avisa na própria tela que não conseguiu conectar e oferece o botão Tentar novamente. Voltando à conexão normal, posso refazer a consulta. Além disso, o formulário impede CEP com menos de oito dígitos e informa quando o CEP não foi encontrado. Durante as consultas, aparecem indicadores de carregamento.

**Na tela:** F12 → Network → Offline; fazer pesquisa; mostrar erro; desligar Offline; repetir. Depois testar CEP `123` se houver tempo.

## 03:55–04:30 — Responsividade e encerramento

> Por fim, vou mostrar a responsividade. No modo dispositivo do DevTools, com largura próxima de 360 pixels, o menu se adapta ao celular, e os cartões e formulários continuam legíveis, sem rolagem horizontal. O projeto usa grid e componentes do Bootstrap, mas mantém uma identidade visual própria. Os links do GitHub Pages e do repositório, os dados do integrante e a tabela de APIs estão documentados no README. Obrigado!

**Na tela:** abrir Toggle device toolbar (Ctrl+Shift+M), selecionar ~360 px, navegar e encerrar.

## Cuidados durante a gravação

- Abra a aplicação **pela URL do GitHub Pages**, não apenas por um arquivo local.
- Mostre o **código de todos os cinco endpoints** e explique como cada resposta aparece na tela.
- Mostre pelo menos **um erro visual**, preferencialmente usando Offline.
- Mostre **largura de celular** e navegue um pouco.
- Fale naturalmente e adapte o texto para ficar **abaixo de 5 minutos**.
- Se o vídeo estiver no YouTube, use **Não listado** (não "Privado") e teste o link em uma aba anônima.
