/* Ponto Público: entrada da aplicação. Carregue após core e serviços. */

"use strict";

// ===== Inicialização e eventos de navegação. =====
function configurarNavegacao() {
  const botaoMenu = document.querySelector("#menu-toggle");
  const menu = document.querySelector("#menu-links");
  botaoMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("open");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menu.classList.remove("open");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
  }));
}

function iniciar() {
  configurarNavegacao();
  configurarFiltroFeriados();
  preencherAnos();
  ELEMENTOS.inputCEP.addEventListener("input", () => {
    ELEMENTOS.inputCEP.value = formatarCEP(ELEMENTOS.inputCEP.value);
  });
  ELEMENTOS.inputDDD.addEventListener("input", () => {
    ELEMENTOS.inputDDD.value = limparDigitos(ELEMENTOS.inputDDD.value).slice(0, 2);
  });
  ELEMENTOS.formCEP.addEventListener("submit", buscarCEP);
  ELEMENTOS.formDDD.addEventListener("submit", buscarDDD);
  document.querySelector("#cep-example").addEventListener("click", () => {
    ELEMENTOS.inputCEP.value = "01001-000";
    ELEMENTOS.inputCEP.focus();
  });
  document.querySelector("#ddd-example").addEventListener("click", () => {
    ELEMENTOS.inputDDD.value = "61";
    ELEMENTOS.inputDDD.focus();
  });
  ELEMENTOS.year.addEventListener("change", carregarFeriados);
  ELEMENTOS.holidayReload.addEventListener("click", carregarFeriados);
  ELEMENTOS.state.addEventListener("change", carregarMunicipios);
  ELEMENTOS.citySearch.addEventListener("input", () => {
    ESTADO.limiteMunicipios = 12;
    desenharMunicipios();
  });
  ELEMENTOS.citiesMore.addEventListener("click", () => {
    ESTADO.limiteMunicipios += 12;
    desenharMunicipios();
  });
  // Independentes: se uma API falhar, as outras áreas continuam funcionando.
  carregarEstados();
  carregarFeriados();
}

iniciar();
