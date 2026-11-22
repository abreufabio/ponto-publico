/* Consulta e apresentação de endereços pelo ViaCEP. */

"use strict";

// ===== Endpoint 1: ViaCEP — endereço por CEP. =====
async function buscarCEP(evento) {
  evento?.preventDefault();
  const cep = limparDigitos(ELEMENTOS.inputCEP.value);
  limparMensagem(ELEMENTOS.feedbackCEP);
  if (!/^\d{8}$/.test(cep)) {
    mostrarMensagem(ELEMENTOS.feedbackCEP, "warning", "Informe um CEP válido com exatamente 8 números.");
    ELEMENTOS.inputCEP.focus();
    return;
  }
  botaoOcupado(ELEMENTOS.buttonCEP, true, "Consultar CEP");
  carregando(ELEMENTOS.resultCEP, "Buscando o endereço do CEP informado...");
  try {
    const endereco = await consultarJSON(URLS.cep(cep));
    if (endereco.erro === true || endereco.erro === "true") {
      mostrarMensagem(ELEMENTOS.feedbackCEP, "info", "Nenhum endereço foi encontrado para esse CEP. Confira os números.");
      ELEMENTOS.resultCEP.innerHTML = blocoVazio("CEP não encontrado na base consultada.");
      return;
    }
    if (!endereco.localidade || !endereco.uf) throw new ErroDaAPI("O serviço retornou um endereço incompleto. Tente outro CEP.");
    const enderecoCompleto = [endereco.logradouro, endereco.bairro, `${endereco.localidade} - ${endereco.uf}`, endereco.cep]
      .filter(Boolean).join(", ");
    ELEMENTOS.resultCEP.innerHTML = `
      <div class="result-box">
        <p class="result-kicker">✓ Endereço localizado</p>
        <h4 class="result-heading">${nomeSeguro(endereco.logradouro, "CEP localizado")}</h4>
        <dl class="result-meta">
          <div><dt>Bairro</dt><dd>${nomeSeguro(endereco.bairro)}</dd></div>
          <div><dt>CEP</dt><dd>${nomeSeguro(endereco.cep, formatarCEP(cep))}</dd></div>
          <div><dt>Município</dt><dd>${nomeSeguro(endereco.localidade)}</dd></div>
          <div><dt>UF / DDD</dt><dd>${nomeSeguro(endereco.uf)} / ${nomeSeguro(endereco.ddd)}</dd></div>
        </dl>
        <div class="result-actions"><button type="button" id="copy-address"><svg class="i"><use href="#i-copy"/></svg>Copiar endereço</button><span>Fonte: ViaCEP</span></div>
      </div>`;
    ELEMENTOS.resultCEP.querySelector("#copy-address").addEventListener("click", () => copiarTexto(enderecoCompleto));
    ESTADO.ultimaConsultaCEP = cep;
    if (/^\d{2}$/.test(String(endereco.ddd ?? ""))) {
      ELEMENTOS.inputDDD.value = endereco.ddd;
    }
    // Sincroniza a UF com o explorador do IBGE (se os estados já carregaram).
    if (ESTADO.estados.some((estado) => estado.sigla === endereco.uf) && ELEMENTOS.state.value !== endereco.uf) {
      ELEMENTOS.state.value = endereco.uf;
      carregarMunicipios();
    }
  } catch (erro) {
    ELEMENTOS.resultCEP.innerHTML = blocoVazio("Não foi possível exibir o endereço agora.");
    mostrarMensagem(ELEMENTOS.feedbackCEP, "danger", erro.message, buscarCEP);
  } finally {
    botaoOcupado(ELEMENTOS.buttonCEP, false, "Consultar CEP");
  }
}
