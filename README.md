# Ponto Público — informação que aproxima

**Projeto avaliativo da disciplina Aplicações Frontend**, orientada pelo professor **Renan Costa Filgueiras**.

O **Ponto Público** é uma aplicação web de **utilidade pública** que ajuda pessoas a consultar endereços por CEP, identificar DDDs, planejar-se pelos feriados nacionais e explorar os municípios brasileiros. Reúne dados públicos de **ViaCEP, BrasilAPI e IBGE** em uma interface acessível, responsiva e gratuita.

## Integrante

| Nome completo | Matrícula |
|---|---|
| Fábio da Silva de Abreu | 202511368 |

## Links de entrega — preencher antes de enviar

- **Aplicação no GitHub Pages:** `https://SEU_USUARIO.github.io/ponto-publico/`
- **Repositório no GitHub:** `https://github.com/SEU_USUARIO/ponto-publico`
- **Vídeo explicativo de até 5 minutos:** `COLE_AQUI_O_LINK_DO_VIDEO_NAO_LISTADO`

> **Importante:** substitua `SEU_USUARIO` pelo seu usuário real no GitHub e preencha o endereço do vídeo depois de publicá-lo. Esses três links precisam funcionar antes de enviar o trabalho.

## Funcionalidades

1. **Consulta de CEP**: busca rua, bairro, município, unidade federativa e DDD, permitindo copiar o endereço e atualizar a UF do explorador de municípios.
2. **Consulta de DDD**: informa a UF e exibe os municípios relacionados à área telefônica.
3. **Calendário de feriados nacionais**: permite selecionar o ano, ver o total de datas, filtrar somente feriados a partir do dia atual e atualizar a consulta.
4. **Explorador de municípios**: carrega os estados brasileiros, consulta os municípios de uma UF e permite filtrar por nome, inclusive com acentos diferentes, além de mostrar mais resultados.
5. **Tratamento de falhas**: apresenta avisos visíveis de entrada inválida, resultado vazio, códigos HTTP e problemas de rede, com botão para tentar novamente.

## APIs e cinco endpoints distintos

Os dados são consumidos diretamente no navegador via `fetch`, com `async` / `await`. **Não existe back-end**.

| Nº | Método | Endpoint | Uso na interface | Fonte |
|---|---|---|---|---|
| 1 | `GET` | `https://viacep.com.br/ws/{cep}/json/` | Endereço localizado pelo CEP | [ViaCEP](https://viacep.com.br/) |
| 2 | `GET` | `https://brasilapi.com.br/api/ddd/v1/{ddd}` | Estado e cidades do DDD informado | [BrasilAPI](https://brasilapi.com.br/docs) |
| 3 | `GET` | `https://brasilapi.com.br/api/feriados/v1/{ano}` | Lista e filtros dos feriados nacionais | [BrasilAPI](https://brasilapi.com.br/docs) |
| 4 | `GET` | `https://servicodados.ibge.gov.br/api/v1/localidades/estados` | Opções de unidades federativas | [IBGE](https://servicodados.ibge.gov.br/api/docs/localidades) |
| 5 | `GET` | `https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios` | Municípios da UF selecionada | [IBGE](https://servicodados.ibge.gov.br/api/docs/localidades) |

**Critério de contagem:** os caminhos dos cinco recursos acima são diferentes. Trocar `{cep}`, `{ddd}`, `{ano}` ou `{UF}` não é contado como um endpoint novo. Todos os cinco recursos têm resultado visível na página.

## Tecnologias utilizadas

- **HTML5**: estrutura semântica com `header`, `nav`, `main`, `section` e `footer`.
- **CSS3**: aparência própria, layout responsivo, estados de foco e suporte a tela pequena.
- **Bootstrap 5.3.6 (CSS)**: fornecido localmente em `css/vendor/bootstrap.min.css`. A interface usa o **grid responsivo**, formulários, botões, alertas, cards e spinners do framework.
- **JavaScript puro (Vanilla JS)**: sem React, Vue, Angular, jQuery, Axios ou bibliotecas JS adicionais.
- **Fetch API**: requisições HTTPS, validação de `response.ok`, timeout e `try/catch`.

## Estrutura dos arquivos

A aplicação foi dividida em arquivos pequenos, separados por responsabilidade. O `index.html` carrega os scripts na ordem correta, e `css/estilo.css` importa os estilos na ordem original.

```text
ponto-publico/
├── index.html                      # Estrutura da página
├── css/
│   ├── estilo.css                  # Ponto de entrada do CSS (@import)
│   ├── base.css                    # Variáveis, tipografia e elementos globais
│   ├── cabecalho.css               # Menu e navegação
│   ├── inicio.css                  # Seção inicial e ilustração
│   ├── consultas.css               # Formulários de CEP/DDD e resultados
│   ├── feriados.css                # Calendário e filtros
│   ├── municipios.css              # Busca e lista de municípios
│   ├── sobre-rodape.css            # Sobre, rodapé e mensagem de cópia
│   ├── responsivo.css              # Media queries e dispositivos móveis
│   └── vendor/
│       ├── bootstrap.min.css       # Framework CSS local
│       └── LICENSE-bootstrap.txt
├── js/
│   ├── app.js                      # Inicialização e eventos
│   ├── core/
│   │   ├── config.js               # URLs, elementos DOM e estado da aplicação
│   │   ├── api.js                  # fetch, HTTP, timeout e falhas de rede
│   │   └── ui.js                   # Formatação e avisos para o usuário
│   └── servicos/
│       ├── cep.js                  # Endpoint ViaCEP e renderização
│       ├── ddd.js                  # Endpoint BrasilAPI /ddd
│       ├── feriados.js             # Endpoint BrasilAPI /feriados
│       └── municipios.js           # Dois endpoints IBGE
├── img/
│   └── favicon.svg
├── docs/                         # Material auxiliar e opcional
│   ├── INSTRUCOES_DE_ENTREGA.md
│   └── ROTEIRO_DO_VIDEO.md
├── .nojekyll                       # Configuração do GitHub Pages
└── README.md                       # Documentação obrigatória
```

**Onde encontrar as requisições:** a função `consultarJSON()` está em `js/core/api.js`; os cinco endpoints estão configurados em `js/core/config.js` e são usados pelas funções de `js/servicos/`. O arquivo `js/app.js` apenas inicializa e conecta os eventos da interface. Nenhuma biblioteca JavaScript foi adicionada.

**Sobre a pasta `docs/`:** serve somente como apoio para a publicação e a apresentação. Pode ser excluída **após consultar o roteiro e as instruções**, sem afetar o funcionamento; mantenha o `README.md` na raiz do projeto.

## Como executar

1. Extraia o arquivo ZIP.
2. Abra `index.html` no Chrome, Edge ou Firefox, com acesso à internet.
3. Use os campos e seletores para fazer as consultas.
4. Para desenvolvimento, é possível usar a extensão **Live Server** do Visual Studio Code, embora nenhum servidor de back-end seja necessário.
5. **Para a correção, utilize a URL pública do GitHub Pages**, pois a publicação é requisito da atividade.

> As APIs são serviços externos e precisam de internet. Caso algum serviço esteja indisponível, a respectiva área informa a falha e oferece uma nova tentativa, sem impedir o uso das outras funcionalidades. O Bootstrap está incluído no projeto, sem exigir conexão para o carregamento do estilo.

## Validação e tratamento de erros

- CEP vazio, curto ou longo: a aplicação interrompe a consulta e solicita **8 dígitos**.
- CEP válido, porém não encontrado: o ViaCEP pode retornar `{ "erro": true }`; a aplicação exibe um aviso visível.
- DDD com comprimento incorreto: a aplicação solicita **2 dígitos**.
- HTTP 404: indicação de registro não encontrado.
- HTTP 429, 500 e outros: mensagem adequada ao status.
- Falha de rede, CORS, API fora do ar ou tempo esgotado: aviso com **Tentar novamente**.
- Lista vazia de feriados ou municípios: mensagem de ausência de resultados.
- Durante `fetch`: **spinner** de carregamento e controle de botão bloqueado ou seletor desativado.

## Demonstração sugerida

1. CEP `01001-000`: localizar Praça da Sé e observar UF/DDD.
2. DDD `61`: consultar municípios relacionados ao código.
3. Feriados: alterar o ano e alternar entre todos e futuros.
4. Municípios: selecionar `DF`, depois `SP`, e filtrar por nome.
5. Falha: abrir **DevTools → Network → Offline** e tentar consultar o CEP; depois voltar a **No throttling/Online** e clicar em **Tentar novamente**.
6. Responsividade: abrir **DevTools → Toggle device toolbar**, configurar largura em torno de **360 px** e navegar pela aplicação.

Se a pasta opcional `docs/` for mantida, há um roteiro completo em `docs/ROTEIRO_DO_VIDEO.md`.

## Como publicar / entregar

Se a pasta opcional `docs/` for mantida, as instruções detalhadas estão em `docs/INSTRUCOES_DE_ENTREGA.md`.

## Observações

- Aplicação educacional, independente e sem vínculo oficial com órgãos governamentais.
- Os feriados exibidos são **nacionais**; pontos facultativos e datas estaduais/municipais não são garantidos na API.
- Dados sujeitos à disponibilidade e atualização das fontes.
- Nenhuma API exige chave ou senha neste projeto.
- O projeto não envia informações digitadas a um servidor próprio; as consultas são feitas diretamente às APIs listadas.
- O Bootstrap é distribuído sob a licença MIT; veja `css/vendor/LICENSE-bootstrap.txt`.
