/* Consulta e apresentação de localidades por DDD. */

"use strict";

// ===== Endpoint 2: BrasilAPI — UF e cidades de um DDD. =====
async function buscarDDD(evento) {
  evento?.preventDefault();
  const ddd = limparDigitos(ELEMENTOS.inputDDD.value);
  limparMensagem(ELEMENTOS.feedbackDDD);
  if (!/^\d{2}$/.test(ddd)) {
    mostrarMensagem(ELEMENTOS.feedbackDDD, "warning", "Digite um DDD com exatamente 2 números, como 61 ou 11.");
    ELEMENTOS.inputDDD.focus();
    return;
  }
  botaoOcupado(ELEMENTOS.buttonDDD, true, "Pesquisar");
  carregando(ELEMENTOS.resultDDD, "Consultando cidades deste DDD...");
  try {
    const resposta = await consultarJSON(URLS.ddd(ddd));
    const cidades = Array.isArray(resposta.cities) ? resposta.cities : [];
    if (!resposta.state || cidades.length === 0) {
      ELEMENTOS.resultDDD.innerHTML = blocoVazio("O DDD consultado não possui cidades cadastradas.");
      mostrarMensagem(ELEMENTOS.feedbackDDD, "info", "Nenhuma cidade foi encontrada para esse DDD.");
      return;
    }
    const maximo = 10;
    ELEMENTOS.resultDDD.innerHTML = `
      <div class="result-box result-box-blue">
        <p class="result-kicker">ÁREA TELEFÔNICA</p>
        <h4 class="result-heading">DDD ${escaparHTML(ddd)} <span class="fw-normal">· ${nomeSeguro(resposta.state)}</span></h4>
        <p class="mb-2" style="font-size:11px;color:#7491a3">${cidades.length} cidade(s) cadastrada(s). Exibindo ${Math.min(cidades.length,maximo)}:</p>
        <div class="ddd-city-list">${cidades.slice(0, maximo).map((cidade) => `<span>${nomeSeguro(cidade)}</span>`).join("")}</div>
        <div class="result-actions"><span>Fonte: BrasilAPI</span><span>${cidades.length > maximo ? `+ ${cidades.length - maximo} outras cidades` : "Consulta completa"}</span></div>
      </div>`;
    ESTADO.ultimoDDD = ddd;
  } catch (erro) {
    ELEMENTOS.resultDDD.innerHTML = blocoVazio("Não foi possível apresentar as cidades deste DDD.");
    const mensagem = erro.codigo === 404 ? "DDD não encontrado. Confira se o código está correto." : erro.message;
    mostrarMensagem(ELEMENTOS.feedbackDDD, erro.codigo === 404 ? "info" : "danger", mensagem, buscarDDD);
  } finally {
    botaoOcupado(ELEMENTOS.buttonDDD, false, "Pesquisar");
  }
}
