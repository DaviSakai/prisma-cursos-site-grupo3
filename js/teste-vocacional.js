/* Teste vocacional: lógica (Issue 14)
   Usa a estrutura da Issue 13: #etapa-N, radios name="pergunta-N",
   botões [data-quiz-acao], erro #erro-N e resultado #quiz-resultado.
   As respostas ficam só em memória (sem localStorage, sem serviços externos). */
(function () {
  "use strict";

  var TOTAL_ETAPAS = 5;
  var MENSAGEM_ERRO = "Escolha uma alternativa para continuar.";
  var INTERVALO_MS = 250; // ignora cliques repetidos logo após trocar de etapa

  /* ------------------------------------------------------------------
     REGRAS DO RESULTADO
     - Cada resposta vale 1 ponto para a área associada à alternativa.
     - Vence a área com mais pontos; se mais de uma área empatar no topo,
       o resultado é "empate" (tela própria no Figma).
     ATENÇÃO: a tabela PONTOS abaixo foi deduzida do texto das alternativas.
     Confirmar com o grupo antes de considerar a regra aprovada.
     ------------------------------------------------------------------ */
  var PONTOS = {
    1: { a: "design", b: "tecnologia", c: "gestao" },
    2: { a: "tecnologia", b: "gestao", c: "design" },
    3: { a: "gestao", b: "tecnologia", c: "design" },
    4: { a: "design", b: "tecnologia", c: "gestao" },
    5: { a: "tecnologia", b: "design", c: "gestao" },
  };

  // Conteúdo das telas de resultado (conforme os frames do Figma)
  var DESTINO_CURSOS = "cursos.html"; // ajustar quando o catálogo tiver destinos próprios
  var IMAGEM_EMPATE = "../assets/images/resultado-empate.png";

  var AREAS = {
    tecnologia: {
      nome: "Tecnologia",
      subtitulo: "Ideias inteligentes para solucionar problemas.",
      texto:
        "Você demonstra afinidade com o raciocínio lógico, a investigação e a resolução de problemas. Gosta de entender como as coisas funcionam, testar possibilidades e encontrar soluções eficientes por meio da tecnologia.",
      caracteristicas: [
        "Raciocínio lógico",
        "Curiosidade e investigação",
        "Resolução de problemas",
        "Interesse por inovação",
      ],
      cursos: [
        {
          nome: "Desenvolvimento Web Fullstack",
          link: "curso-web-fullstack.html",
          descricao: "",
          imagem: "../assets/images/curso-web.png",
          fundo: "#9b0a0a",
          texto: "#ffffff",
        },
        {
          nome: "Análise de Dados",
          link: "curso-analise-dados.html",
          descricao: "Transforme números em decisões estratégicas",
          imagem: "../assets/images/curso-analise-dados.jpg",
          fundo: "#f28c1b",
          texto: "#0a0a0a",
        },
      ],
      cupom: "PRISMATECH",
      cupomTexto:
        "Use o cupom “PRISMATECH” para obter 15% de desconto na sua inscrição em um dos cursos de tecnologia da Prisma Cursos.",
      imagem: "../assets/images/resultado-tecnologia.png",
    },
    design: {
      nome: "Design",
      subtitulo: "Criatividade que transforma ideias em realidade.",
      texto:
        "Você tem afinidade com a criatividade, a comunicação visual e a busca por soluções originais. Gosta de explorar possibilidades, prestar atenção aos detalhes e transformar ideias em algo visualmente interessante.",
      caracteristicas: [
        "Atenção aos detalhes",
        "Criatividade e inovação",
        "Sensibilidade estética",
        "Comunicação visual",
      ],
      cursos: [
        {
          nome: "UX/UI Design",
          link: "curso-ux-ui.html",
          descricao: "Mergulhe na mente do utilizador",
          imagem: "../assets/images/curso-ux.png",
          fundo: "#cfcf14",
          texto: "#0a0a0a",
        },
        {
          nome: "Design Gráfico e Branding",
          link: "curso-design-grafico.html",
          descricao: "Dê vida a marcas de sucesso",
          imagem: "../assets/images/curso-design-grafico.jpg",
          fundo: "#0c4fb0",
          texto: "#ffffff",
        },
      ],
      cupom: "DESIGNPRISMA",
      cupomTexto:
        "Use o cupom “DESIGNPRISMA” para obter 15% de desconto na sua inscrição em um dos cursos de design da Prisma Cursos.",
      imagem: "../assets/images/resultado-design.png",
    },
    gestao: {
      nome: "Gestão",
      subtitulo: "Organização e estratégia para alcançar grandes objetivos.",
      texto:
        "Você tem afinidade com o planejamento, a organização e a coordenação de atividades. Gosta de estabelecer prioridades, estruturar processos e colaborar com outras pessoas para transformar objetivos em resultados.",
      caracteristicas: [
        "Visão estratégica",
        "Organização e planejamento",
        "Liderança e colaboração",
        "Tomada de decisões",
      ],
      cursos: [
        {
          nome: "Gestão Ágil de Projetos",
          link: "curso-gestao-agil.html",
          descricao: "Tome as rédeas que o mercado precisa",
          imagem: "../assets/images/curso-agil.png",
          fundo: "#16a34a",
          texto: "#0a0a0a",
        },
        {
          nome: "Administração e Negócios",
          link: "curso-admin-negocios.html",
          descricao: "Uma base sólida para o mundo corporativo",
          imagem: "../assets/images/curso-administracao.jpg",
          fundo: "#6d3fb0",
          texto: "#ffffff",
        },
      ],
      cupom: "GESTPRISMA",
      cupomTexto:
        "Use o cupom “GESTPRISMA” para obter 15% de desconto na sua inscrição em um dos cursos de gestão da Prisma Cursos.",
      imagem: "../assets/images/resultado-gestao.png",
    },
  };

  var etapas = document.querySelectorAll("[data-quiz-etapa]");
  var resultado = document.getElementById("quiz-resultado");
  var container = document.querySelector("[data-quiz-etapas]");
  var quiz = document.querySelector(".quiz");

  if (!etapas.length || !resultado || !container || !quiz) {
    return;
  }

  var respostas = {}; // { 1: "a", 2: "c", ... }
  var etapaAtual = 1;
  var ultimaNavegacao = 0;

  /* ---------- Cálculo (separado da interface) ---------- */
  function calcularResultado(dados) {
    var pontos = { tecnologia: 0, design: 0, gestao: 0 };

    for (var n = 1; n <= TOTAL_ETAPAS; n++) {
      var area = PONTOS[n][dados[n]];
      if (area in pontos) {
        pontos[area] += 1;
      }
    }

    var ids = Object.keys(pontos);
    var maximo = Math.max.apply(
      null,
      ids.map(function (id) {
        return pontos[id];
      }),
    );
    var lideres = ids.filter(function (id) {
      return pontos[id] === maximo;
    });

    if (lideres.length > 1) {
      return { tipo: "empate" };
    }
    return { tipo: "area", area: lideres[0] };
  }

  /* ---------- Auxiliares ---------- */
  function pegarEtapa(n) {
    return document.querySelector('[data-quiz-etapa="' + n + '"]');
  }

  function pegarErro(n) {
    return document.getElementById("erro-" + n);
  }

  function limparErro(n) {
    var erro = pegarErro(n);
    if (erro) {
      erro.textContent = "";
      erro.hidden = true;
    }
  }

  function mostrarErro(n) {
    var erro = pegarErro(n);
    if (erro) {
      erro.textContent = MENSAGEM_ERRO;
      erro.hidden = false;
    }

    var primeiro = pegarEtapa(n).querySelector('input[type="radio"]');
    if (primeiro) {
      primeiro.focus();
    }
  }

  function etapaRespondida(n) {
    return Boolean(respostas[n]);
  }

  function primeiraSemResposta() {
    for (var n = 1; n <= TOTAL_ETAPAS; n++) {
      if (!etapaRespondida(n)) {
        return n;
      }
    }
    return 0;
  }

  function mostrarEtapa(n, moverFoco) {
    etapaAtual = n;

    etapas.forEach(function (etapa) {
      etapa.hidden = Number(etapa.getAttribute("data-quiz-etapa")) !== n;
    });
    resultado.hidden = true;
    quiz.classList.remove("quiz--resultado");

    if (moverFoco) {
      // Leitores de tela anunciam a nova pergunta
      var pergunta = pegarEtapa(n).querySelector(".quiz__pergunta");
      if (pergunta) {
        pergunta.setAttribute("tabindex", "-1");
        pergunta.focus();
      }
    }
  }

  function campo(seletor) {
    return resultado.querySelector(seletor);
  }

  function limparLista(lista) {
    while (lista.firstChild) {
      lista.removeChild(lista.firstChild);
    }
  }

  function carregarImagem(img, origem) {
    if (!img) {
      return;
    }
    img.hidden = true;
    img.onload = function () {
      img.hidden = false;
    };
    img.onerror = function () {
      img.hidden = true;
    }; // imagem ausente: some sem quebrar o layout
    img.src = origem;
  }

  function preencherArea(area) {
    campo("[data-quiz-resultado-titulo]").textContent = area.nome;
    campo("[data-quiz-resultado-subtitulo]").textContent = area.subtitulo;
    campo("[data-quiz-resultado-texto]").textContent = area.texto;
    campo("[data-quiz-resultado-cupom]").textContent = area.cupom;
    campo("[data-quiz-resultado-cupom-texto]").textContent = area.cupomTexto;
    carregarImagem(campo("[data-quiz-resultado-imagem]"), area.imagem);

    var tags = campo("[data-quiz-resultado-tags]");
    limparLista(tags);
    area.caracteristicas.forEach(function (texto) {
      var item = document.createElement("li");
      item.textContent = texto;
      tags.appendChild(item);
    });

    var lista = campo("[data-quiz-resultado-cursos]");
    limparLista(lista);
    area.cursos.forEach(function (curso) {
      var item = document.createElement("li");
      item.className = "quiz__res-curso";
      item.style.backgroundColor = curso.fundo;
      item.style.color = curso.texto;

      if (curso.imagem) {
        var foto = document.createElement("img");
        foto.className = "quiz__res-curso-img";
        foto.alt = "";
        foto.hidden = true;
        foto.onload = function () {
          this.hidden = false;
        };
        foto.onerror = function () {
          this.hidden = true;
        }; // sem imagem: cartão continua inteiro
        foto.src = curso.imagem;
        item.appendChild(foto);
      }

      var rodape = document.createElement("div");
      rodape.className = "quiz__res-curso-rodape";

      var textos = document.createElement("div");
      var nome = document.createElement("p");
      nome.className = "quiz__res-curso-nome";
      nome.textContent = curso.nome;
      textos.appendChild(nome);

      if (curso.descricao) {
        var descricao = document.createElement("p");
        descricao.className = "quiz__res-curso-descricao";
        descricao.textContent = curso.descricao;
        textos.appendChild(descricao);
      }

      var link = document.createElement("a");
      link.className = "quiz__res-curso-link";
      link.href = curso.link || DESTINO_CURSOS;
      link.textContent = "Veja os detalhes";
      link.setAttribute(
        "aria-label",
        "Veja os detalhes do curso " + curso.nome,
      );

      rodape.appendChild(textos);
      rodape.appendChild(link);
      item.appendChild(rodape);
      lista.appendChild(item);
    });
  }

  function mostrarResultado() {
    var pendente = primeiraSemResposta();
    if (pendente) {
      // Só calcula com as cinco respostas válidas
      mostrarEtapa(pendente, true);
      mostrarErro(pendente);
      return;
    }

    var calculo = calcularResultado(respostas);
    var blocoArea = campo("[data-quiz-resultado-area]");
    var blocoEmpate = campo("[data-quiz-resultado-empate]");

    if (calculo.tipo === "area") {
      preencherArea(AREAS[calculo.area]);
      blocoArea.hidden = false;
      blocoEmpate.hidden = true;
    } else {
      carregarImagem(
        campo("[data-quiz-resultado-imagem-empate]"),
        IMAGEM_EMPATE,
      );
      blocoArea.hidden = true;
      blocoEmpate.hidden = false;
    }

    etapas.forEach(function (etapa) {
      etapa.hidden = true;
    });
    resultado.hidden = false;
    quiz.classList.add("quiz--resultado");
    resultado.focus();
  }

  function reiniciar() {
    respostas = {};

    document.querySelectorAll('input[type="radio"]').forEach(function (radio) {
      radio.checked = false;
    });
    for (var n = 1; n <= TOTAL_ETAPAS; n++) {
      limparErro(n);
    }

    campo("[data-quiz-resultado-area]").hidden = true;
    campo("[data-quiz-resultado-empate]").hidden = true;

    mostrarEtapa(1, true);
  }

  /* ---------- Ações ---------- */
  function avancar() {
    if (!etapaRespondida(etapaAtual)) {
      mostrarErro(etapaAtual);
      return;
    }
    limparErro(etapaAtual);
    mostrarEtapa(etapaAtual + 1, true);
  }

  function voltar() {
    if (etapaAtual > 1) {
      limparErro(etapaAtual);
      mostrarEtapa(etapaAtual - 1, true);
    }
  }

  function verResultado() {
    if (!etapaRespondida(etapaAtual)) {
      mostrarErro(etapaAtual);
      return;
    }
    limparErro(etapaAtual);
    mostrarResultado();
  }

  var acoes = {
    avancar: avancar,
    voltar: voltar,
    resultado: verResultado,
    reiniciar: reiniciar,
  };

  /* ---------- Eventos ---------- */
  quiz.addEventListener("click", function (evento) {
    var botao = evento.target.closest("[data-quiz-acao]");
    if (!botao) {
      return;
    }

    var agora = Date.now();
    if (agora - ultimaNavegacao < INTERVALO_MS) {
      return; // clique duplicado: evita pular etapa ou mostrar erro sem querer
    }
    ultimaNavegacao = agora;

    var acao = acoes[botao.getAttribute("data-quiz-acao")];
    if (acao) {
      acao();
    }
  });

  // Guarda (ou troca) a resposta da etapa
  container.addEventListener("change", function (evento) {
    var radio = evento.target;
    if (radio.type !== "radio") {
      return;
    }

    var numero = Number(radio.name.replace("pergunta-", ""));
    respostas[numero] = radio.value;
    limparErro(numero);
  });

  // Estado inicial
  mostrarEtapa(1, false);
})();
