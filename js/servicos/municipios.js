/* Estados, municípios e filtros do IBGE. */

"use strict";

// ===== Endpoints 4 e 5: IBGE — UFs e municípios por UF. =====
async function carregarEstados() {
  limparMensagem(ELEMENTOS.statesFeedback);
  ELEMENTOS.state.disabled = true;
  ELEMENTOS.state.innerHTML = '<option value="">Carregando estados...</option>';
  try {
    const dados = await consultarJSON(URLS.estados);
    if (!Array.isArray(dados) || dados.length === 0) throw new ErroDaAPI("Nenhum estado foi retornado pelo IBGE.");
    ESTADO.estados = dados.filter((estado) => estado.sigla && estado.nome)
      .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    ELEMENTOS.state.innerHTML = '<option value="">Selecione uma UF</option>';
    ESTADO.estados.forEach((estado) => {
      const opcao = document.createElement("option");
      opcao.value = estado.sigla;
      opcao.textContent = `${estado.nome} (${estado.sigla})`;
      ELEMENTOS.state.append(opcao);
    });
    ELEMENTOS.state.disabled = false;
    // Exemplo inicial de uso real do endpoint de municípios: DF.
    const ufInicial = ESTADO.estados.some((estado) => estado.sigla === "DF") ? "DF" : ESTADO.estados[0].sigla;
    ELEMENTOS.state.value = ufInicial;
    await carregarMunicipios();
  } catch (erro) {
    ESTADO.estados = [];
    ELEMENTOS.state.innerHTML = '<option value="">Estados indisponíveis</option>';
    mostrarMensagem(ELEMENTOS.statesFeedback, "danger", erro.message, carregarEstados);
    ELEMENTOS.citiesList.innerHTML = blocoVazio("Não foi possível carregar as unidades federativas.");
  }
}

function simplificarNome(nome) {
  return String(nome).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function desenharMunicipios() {
  const filtro = simplificarNome(ELEMENTOS.citySearch.value.trim());
  const filtrados = ESTADO.municipios.filter((cidade) => simplificarNome(cidade.nome).includes(filtro));
  const visiveis = filtrados.slice(0, ESTADO.limiteMunicipios);
  ELEMENTOS.cityStat.innerHTML = `<strong>${filtrados.length.toLocaleString("pt-BR")}</strong><span>municípios encontrados</span>`;
  ELEMENTOS.citiesCaption.textContent = filtro
    ? `Resultados para “${ELEMENTOS.citySearch.value.trim()}”`
    : `Municípios de ${ESTADO.estados.find((e) => e.sigla === ELEMENTOS.state.value)?.nome || ELEMENTOS.state.value}`;
  if (filtrados.length === 0) {
    ELEMENTOS.citiesList.innerHTML = `<div class="col-12">${blocoVazio("Nenhum município corresponde à sua busca.")}</div>`;
  } else {
    ELEMENTOS.citiesList.innerHTML = visiveis.map((cidade) => `
      <div class="col-sm-6 col-lg-4"><div class="city-item">${nomeSeguro(cidade.nome)}</div></div>
    `).join("");
  }
  const restantes = filtrados.length - visiveis.length;
  ELEMENTOS.citiesMore.hidden = restantes <= 0;
  ELEMENTOS.citiesMore.textContent = restantes > 0 ? `Mostrar mais municípios (${restantes} restantes) →` : "";
}

async function carregarMunicipios() {
  const uf = ELEMENTOS.state.value;
  limparMensagem(ELEMENTOS.citiesFeedback);
  if (!/^[A-Z]{2}$/.test(uf)) {
    ESTADO.municipios = [];
    ELEMENTOS.citySearch.disabled = true;
    ELEMENTOS.citiesList.innerHTML = blocoVazio("Selecione uma unidade federativa para começar.");
    ELEMENTOS.cityStat.innerHTML = "<strong>—</strong><span>municípios encontrados</span>";
    ELEMENTOS.citiesMore.hidden = true;
    return;
  }
  ELEMENTOS.state.disabled = true;
  ELEMENTOS.citySearch.disabled = true;
  ELEMENTOS.citySearch.value = "";
  ELEMENTOS.citiesCaption.textContent = "Carregando municípios...";
  ELEMENTOS.citiesRegion.hidden = true;
  ELEMENTOS.citiesMore.hidden = true;
  carregando(ELEMENTOS.citiesList, "Consultando os municípios no IBGE...");
  try {
    const municipios = await consultarJSON(URLS.municipios(uf));
    if (!Array.isArray(municipios)) throw new ErroDaAPI("O IBGE retornou dados inesperados para este estado.");
    ESTADO.municipios = municipios.filter((municipio) => municipio.nome)
      .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    ESTADO.limiteMunicipios = 12;
    ESTADO.ultimoEstado = uf;
    const estado = ESTADO.estados.find((item) => item.sigla === uf);
    ELEMENTOS.citiesRegion.textContent = estado?.regiao?.nome ? `Região ${estado.regiao.nome}` : `UF ${uf}`;
    ELEMENTOS.citiesRegion.hidden = false;
    ELEMENTOS.citySearch.disabled = false;
    if (ESTADO.municipios.length === 0) {
      mostrarMensagem(ELEMENTOS.citiesFeedback, "info", "O IBGE não retornou municípios para a UF selecionada.");
    }
    desenharMunicipios();
  } catch (erro) {
    ESTADO.municipios = [];
    ELEMENTOS.citiesCaption.textContent = "Consulta indisponível";
    ELEMENTOS.cityStat.innerHTML = "<strong>—</strong><span>municípios encontrados</span>";
    ELEMENTOS.citiesList.innerHTML = blocoVazio("Não foi possível exibir os municípios deste estado.");
    mostrarMensagem(ELEMENTOS.citiesFeedback, "danger", erro.message, carregarMunicipios);
  } finally {
    ELEMENTOS.state.disabled = ESTADO.estados.length === 0;
  }
}
