/*
 * Ponto Público — consumo de APIs públicas com JavaScript puro.
 * Cada serviço possui funções de consulta, apresentação e falhas próprias.
 * Endpoints GET usados na interface:
 * 1. https://viacep.com.br/ws/{cep}/json/
 * 2. https://brasilapi.com.br/api/ddd/v1/{ddd}
 * 3. https://brasilapi.com.br/api/feriados/v1/{ano}
 * 4. https://servicodados.ibge.gov.br/api/v1/localidades/estados
 * 5. https://servicodados.ibge.gov.br/api/v1/localidades/estados/{uf}/municipios
 */

"use strict";

const URLS = Object.freeze({
  cep: (cep) => `https://viacep.com.br/ws/${cep}/json/`,
  ddd: (ddd) => `https://brasilapi.com.br/api/ddd/v1/${ddd}`,
  feriados: (ano) => `https://brasilapi.com.br/api/feriados/v1/${ano}`,
  estados: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
  municipios: (uf) => `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
});

const ELEMENTOS = {
  formCEP: document.querySelector("#cep-form"),
  inputCEP: document.querySelector("#cep-input"),
  buttonCEP: document.querySelector("#cep-button"),
  feedbackCEP: document.querySelector("#cep-feedback"),
  resultCEP: document.querySelector("#cep-result"),
  formDDD: document.querySelector("#ddd-form"),
  inputDDD: document.querySelector("#ddd-input"),
  buttonDDD: document.querySelector("#ddd-button"),
  feedbackDDD: document.querySelector("#ddd-feedback"),
  resultDDD: document.querySelector("#ddd-result"),
  year: document.querySelector("#year-select"),
  yearLabel: document.querySelector("#holiday-year-label"),
  holidayReload: document.querySelector("#holiday-reload"),
  holidayFeedback: document.querySelector("#holiday-feedback"),
  holidayList: document.querySelector("#holiday-list"),
  holidayCount: document.querySelector("#holiday-count"),
  state: document.querySelector("#state-select"),
  citySearch: document.querySelector("#city-search"),
  statesFeedback: document.querySelector("#states-feedback"),
  citiesFeedback: document.querySelector("#cities-feedback"),
  cityStat: document.querySelector("#city-stat"),
  citiesCaption: document.querySelector("#cities-caption"),
  citiesRegion: document.querySelector("#cities-region"),
  citiesList: document.querySelector("#cities-list"),
  citiesMore: document.querySelector("#cities-more"),
  toast: document.querySelector("#toast"),
  toastText: document.querySelector("#toast-text")
};

const ESTADO = {
  feriados: [],
  filtroFeriados: "all",
  estados: [],
  municipios: [],
  limiteMunicipios: 12,
  ultimoDDD: "",
  ultimaConsultaCEP: "",
  ultimoEstado: ""
};
