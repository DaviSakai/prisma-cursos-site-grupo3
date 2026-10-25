(function () {
  "use strict";

  // Mesmo ponto de quebra usado em css/components/navbar-mobile.css
  var DESKTOP_QUERY = "(min-width: 1024px)";

  var botao = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-menu]");

  if (!botao || !menu) {
    return;
  }

  var desktop = window.matchMedia(DESKTOP_QUERY);

  function estaAberto() {
    return botao.getAttribute("aria-expanded") === "true";
  }

  function abrirMenu() {
    menu.classList.add("is-open");
    botao.setAttribute("aria-expanded", "true");
    botao.setAttribute("aria-label", "Fechar menu");
  }

  function fecharMenu(devolverFoco) {
    menu.classList.remove("is-open");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");

    if (devolverFoco) {
      botao.focus();
    }
  }

  // Clique no botão: abre ou fecha
  botao.addEventListener("click", function () {
    if (estaAberto()) {
      fecharMenu(false);
    } else {
      abrirMenu();
    }
  });

  // Clique em qualquer link do menu: fecha (a navegação por âncora continua)
  menu.addEventListener("click", function (evento) {
    if (evento.target.closest("a")) {
      fecharMenu(false);
    }
  });

  // Tecla Escape: fecha e devolve o foco ao botão
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && estaAberto()) {
      fecharMenu(true);
    }
  });

  // Clique fora do menu: fecha
  document.addEventListener("click", function (evento) {
    if (!estaAberto()) {
      return;
    }

    if (!menu.contains(evento.target) && !botao.contains(evento.target)) {
      fecharMenu(false);
    }
  });

  // Ao ir para a largura de desktop, volta ao estado fechado (evita estado inconsistente)
  function aoMudarLargura(evento) {
    if (evento.matches) {
      fecharMenu(false);
    }
  }

  if (desktop.addEventListener) {
    desktop.addEventListener("change", aoMudarLargura);
  } else {
    // Navegadores antigos
    desktop.addListener(aoMudarLargura);
  }
})();
