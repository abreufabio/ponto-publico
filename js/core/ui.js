/* Utilitários visuais, validação e cópia de texto. */

"use strict";

// Protege os trechos dinâmicos inseridos como HTML.
function escaparHTML(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, (caractere) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[caractere]));
}

function mostrarMensagem(container, tipo, mensagem, tentarNovamente = null) {
  container.replaceChildren();
  const aviso = document.createElement("div");
  aviso.className = `alert alert-${tipo}`;
  aviso.setAttribute("role", "alert");
  const texto = document.createElement("span");
  texto.textContent = mensagem;
  aviso.append(texto);
  if (tentarNovamente) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "retry-link ms-2";
    botao.textContent = "Tentar novamente";
    botao.addEventListener("click", tentarNovamente);
    aviso.append(botao);
  }
  container.append(aviso);
}

function limparMensagem(container) {
  container.replaceChildren();
}

function carregando(container, texto = "Consultando dados...") {
  container.innerHTML = `<div class="loading-message"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>${escaparHTML(texto)}</div>`;
}

function botaoOcupado(botao, ocupado, textoNormal = null) {
  botao.disabled = ocupado;
  botao.setAttribute("aria-busy", String(ocupado));
  const rotulo = botao.querySelector(".button-label");
  if (rotulo) rotulo.textContent = ocupado ? "Aguarde..." : textoNormal;
}

function formatarCEP(digitos) {
  const numeros = String(digitos).replace(/\D/g, "").slice(0, 8);
  return numeros.length > 5 ? `${numeros.slice(0, 5)}-${numeros.slice(5)}` : numeros;
}

function limparDigitos(texto) {
  return String(texto).replace(/\D/g, "");
}

function nomeSeguro(valor, alternativa = "Não informado") {
  const texto = String(valor ?? "").trim();
  return texto ? escaparHTML(texto) : alternativa;
}

function blocoVazio(mensagem) {
  return `<div class="no-results"><svg class="i"><use href="#i-search"/></svg><p>${escaparHTML(mensagem)}</p></div>`;
}

async function copiarTexto(conteudo) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(conteudo);
    } else {
      const temporario = document.createElement("textarea");
      temporario.value = conteudo;
      temporario.setAttribute("readonly", "");
      temporario.style.position = "fixed";
      temporario.style.left = "-9999px";
      document.body.append(temporario);
      temporario.select();
      const copiou = document.execCommand("copy");
      temporario.remove();
      if (!copiou) throw new Error("Falha ao copiar");
    }
    ELEMENTOS.toastText.textContent = "Endereço copiado!";
  } catch {
    ELEMENTOS.toastText.textContent = "Não foi possível copiar automaticamente.";
  }
  ELEMENTOS.toast.hidden = false;
  window.setTimeout(() => { ELEMENTOS.toast.hidden = true; }, 2400);
}
