/* Calendário e filtros de feriados nacionais. */

"use strict";

// ===== Endpoint 3: BrasilAPI — feriados nacionais. =====
function preencherAnos() {
  const atual = new Date().getFullYear();
  for (let ano = atual - 1; ano <= atual + 3; ano += 1) {
    const opcao = document.createElement("option");
    opcao.value = String(ano);
    opcao.textContent = String(ano);
    if (ano === atual) opcao.selected = true;
    ELEMENTOS.year.append(opcao);
  }
  ELEMENTOS.yearLabel.textContent = String(atual);
  document.querySelector("#footer-year").textContent = String(atual);
}

function soDataLocal(dataISO) {
  return new Date(`${dataISO}T12:00:00`);
}

function inicioDeHoje() {
  const agora = new Date();
  return new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
}

function formatarData(data) {
  return new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" }).format(data);
}

function desenharFeriados() {
  const hoje = inicioDeHoje();
  const lista = ESTADO.feriados.filter((item) => {
    if (ESTADO.filtroFeriados === "all") return true;
    const data = soDataLocal(item.date);
    return data >= hoje;
  });
  ELEMENTOS.holidayCount.textContent = `${lista.length} feriado${lista.length === 1 ? "" : "s"}`;
  if (lista.length === 0) {
    ELEMENTOS.holidayList.innerHTML = blocoVazio(
      ESTADO.filtroFeriados === "future" ? "Não há feriados nacionais restantes para o ano selecionado." : "Nenhum feriado foi informado para este ano."
    );
    return;
  }
  ELEMENTOS.holidayList.innerHTML = lista.map((feriado) => {
    const data = soDataLocal(feriado.date);
    const dias = Math.round((new Date(data.getFullYear(), data.getMonth(), data.getDate()) - hoje) / 86400000);
    const estado = dias === 0 ? "É hoje" : dias > 0 ? `Em ${dias} dia${dias === 1 ? "" : "s"}` : "Já passou";
    const classeEstado = dias === 0 ? "today" : dias < 0 ? "past" : "";
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(data).replace(".", "").toUpperCase();
    return `<article class="holiday-item">
      <div class="date-tile" aria-hidden="true"><strong>${dia}</strong><small>${escaparHTML(mes)}</small></div>
      <div class="holiday-detail"><h4>${nomeSeguro(feriado.name)}</h4><p>${escaparHTML(formatarData(data))}</p></div>
      <div class="holiday-state ${classeEstado}">${estado}</div>
    </article>`;
  }).join("");
}

async function carregarFeriados() {
  const ano = Number(ELEMENTOS.year.value);
  ELEMENTOS.yearLabel.textContent = String(ano);
  limparMensagem(ELEMENTOS.holidayFeedback);
  ELEMENTOS.holidayReload.disabled = true;
  ELEMENTOS.year.disabled = true;
  ELEMENTOS.holidayCount.textContent = "Buscando...";
  carregando(ELEMENTOS.holidayList, "Buscando os feriados nacionais...");
  try {
    const dados = await consultarJSON(URLS.feriados(ano));
    if (!Array.isArray(dados)) throw new ErroDaAPI("Os feriados não vieram no formato esperado.");
    ESTADO.feriados = dados.filter((feriado) => /^\d{4}-\d{2}-\d{2}$/.test(String(feriado.date)) && feriado.name)
      .sort((a, b) => a.date.localeCompare(b.date));
    if (ESTADO.feriados.length === 0) mostrarMensagem(ELEMENTOS.holidayFeedback, "info", "A API não retornou feriados nacionais para esse ano.");
    desenharFeriados();
  } catch (erro) {
    ESTADO.feriados = [];
    ELEMENTOS.holidayCount.textContent = "Indisponível";
    ELEMENTOS.holidayList.innerHTML = blocoVazio("Não foi possível carregar o calendário.");
    mostrarMensagem(ELEMENTOS.holidayFeedback, "danger", erro.message, carregarFeriados);
  } finally {
    ELEMENTOS.holidayReload.disabled = false;
    ELEMENTOS.year.disabled = false;
  }
}

function configurarFiltroFeriados() {
  document.querySelectorAll("[data-holiday-filter]").forEach((botao) => {
    botao.addEventListener("click", () => {
      ESTADO.filtroFeriados = botao.dataset.holidayFilter;
      document.querySelectorAll("[data-holiday-filter]").forEach((outro) => {
        const ativo = outro === botao;
        outro.classList.toggle("active", ativo);
        outro.setAttribute("aria-pressed", String(ativo));
      });
      if (!ELEMENTOS.holidayReload.disabled) desenharFeriados();
    });
  });
}
