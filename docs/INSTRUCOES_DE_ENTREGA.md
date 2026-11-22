# Ponto Público — instruções para entregar a atividade

**Prazo informado no enunciado:** 22/11/2026 (domingo), até **23h59**.  
**Formato exigido:** um único **ZIP** pelo ambiente da disciplina.  
**Nome para entrega individual:** `FabioAbreu.zip`.

## 1. Publicar o código no GitHub

1. Entre em **https://github.com/** e faça login.
2. Clique em **New repository**.
3. Nome do repositório: **`ponto-publico`**.
4. Selecione **Public** e crie o repositório. **Não marque** a criação de um README automático, pois o projeto já inclui um.
5. Extraia o ZIP recebido. Abra a pasta **`ponto-publico`**.
6. No GitHub, clique em **Add file → Upload files**. Arraste **o conteúdo de dentro da pasta `ponto-publico`** (o `index.html`, o `README.md` e as pastas `css`, `js`, `img` e, se desejar, `docs`) para a **raiz** do repositório. Não crie uma pasta `ponto-publico` dentro de outra pasta `ponto-publico`.
7. Confirme em **Commit changes**. Veja se o `index.html` aparece na tela principal do repositório.

## 2. Ativar o GitHub Pages

1. No repositório, acesse **Settings → Pages**.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha a branch **main**, pasta **/(root)**, e clique em **Save**.
4. Acesse a URL indicada no Pages, geralmente:

   `https://SEU_USUARIO.github.io/ponto-publico/`

5. **Teste o endereço em uma janela anônima**. Ele precisa abrir e mostrar CEP, DDD, feriados e municípios. Caso os dados não apareçam, confira sua internet e a seção de avisos na tela.

## 3. Gravar o vídeo (até 5 minutos)

1. Deixe aberta a página **publicada no GitHub Pages** e abra também `js/core/config.js`, `js/core/api.js` e os arquivos de `js/servicos/` no editor para mostrar as requisições.
2. Grave a sua tela e sua voz, explicando todos os **cinco endpoints**.
3. Demonstre o sistema, o tratamento de falhas e a responsividade em largura aproximada de 360 px.
4. Para simular uma falha, use **F12 → Network → Offline**, consulte um CEP, mostre o aviso e volte a Online.
5. Veja o texto pronto em `docs/ROTEIRO_DO_VIDEO.md`.
6. Envie o vídeo ao YouTube como **Não listado** ou ao Google Drive com acesso por link. Copie a URL que qualquer avaliador pode abrir. O vídeo também poderia estar no ZIP, mas um link deixa o arquivo mais leve.

## 4. Atualizar o README (obrigatório)

1. No repositório, abra `README.md` e clique no ícone de edição (lápis).
2. Substitua as duas ocorrências de **`SEU_USUARIO`** pelo seu usuário real.
3. Troque **`COLE_AQUI_O_LINK_DO_VIDEO_NAO_LISTADO`** pela URL do vídeo publicado.
4. Salve com **Commit changes**.
5. Confira se os três links do README são acessíveis: **repositório**, **GitHub Pages** e **vídeo**.

## 5. Baixar o ZIP definitivo e enviar

1. No GitHub, na página principal do repositório, clique em **Code → Download ZIP**.
2. Renomeie o arquivo baixado para **`FabioAbreu.zip`**.
3. Abra o ZIP e confira que contém `index.html`, `css`, `js`, `img`, `README.md`; a pasta `docs` é opcional. Os links do README já devem estar atualizados.
4. Envie **somente esse `FabioAbreu.zip`** na atividade no ambiente da disciplina **até 22/11/2026, 23h59**.

## Checklist final

- [ ] Abri o GitHub Pages em uma aba anônima.
- [ ] Consultei CEP `01001-000` com sucesso.
- [ ] Consultei DDD `61` com sucesso.
- [ ] Verifiquei feriados, estados e municípios.
- [ ] Testei o aviso de erro com DevTools → Network → Offline.
- [ ] Testei a interface com largura de 360 px.
- [ ] Gravei o vídeo, com minha voz, em até 5 minutos.
- [ ] Atualizei o README com os links públicos e meus dados de integrante.
- [ ] Renomeei o ZIP para `FabioAbreu.zip` e o enviei na plataforma.

**O trabalho acadêmico prevê que o estudante consiga explicar o código. Leia `js/core/config.js` (URLs), `js/core/api.js` (`consultarJSON`), `js/servicos/cep.js` (`buscarCEP`), `js/servicos/ddd.js` (`buscarDDD`), `js/servicos/feriados.js` (`carregarFeriados`), `js/servicos/municipios.js` (`carregarEstados` e `carregarMunicipios`) e `js/app.js` (eventos).**
