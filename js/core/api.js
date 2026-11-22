/* Cliente HTTP único: fetch, timeout e erros. */

"use strict";

class ErroDaAPI extends Error {
  constructor(message, codigo = null) {
    super(message);
    this.name = "ErroDaAPI";
    this.codigo = codigo;
  }
}

// Faz requisições com timeout, status HTTP verificado e JSON validado.
async function consultarJSON(url) {
  const controlador = new AbortController();
  const timeout = setTimeout(() => controlador.abort(), 12000);
  try {
    const resposta = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controlador.signal
    });
    if (!resposta.ok) {
      if (resposta.status === 404) throw new ErroDaAPI("O registro solicitado não foi encontrado.", 404);
      if (resposta.status === 429) throw new ErroDaAPI("Muitas consultas em pouco tempo. Tente novamente em instantes.", 429);
      throw new ErroDaAPI(`O serviço retornou um erro HTTP ${resposta.status}. Tente novamente.`, resposta.status);
    }
    try {
      return await resposta.json();
    } catch {
      throw new ErroDaAPI("O serviço respondeu com dados que não puderam ser lidos.");
    }
  } catch (erro) {
    if (erro.name === "AbortError") throw new ErroDaAPI("A consulta demorou demais. Verifique sua internet e tente novamente.");
    if (erro instanceof ErroDaAPI) throw erro;
    throw new ErroDaAPI("Não foi possível conectar ao serviço. Confira a internet e tente novamente.");
  } finally {
    clearTimeout(timeout);
  }
}
