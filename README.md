# Prisma Cursos | Site Institucional

Site institucional responsivo da **Prisma Cursos**, instituto de educação profissionalizante com cursos de tecnologia, design e gestão e modelo de ensino híbrido (presencial + online).

Projeto desenvolvido para o **Processo Trainee 26.2** da **Orc'estra Gamificação**, a partir do protótipo de alta fidelidade criado no Figma na etapa de concepção.

🔗 **Site publicado:** https://samukasan1518.github.io/prisma-cursos-site-grupo3/  
🎨 **Protótipo no Figma:** https://www.figma.com/design/ae4fbRKPPikS58AbWG3lZ0/Prot%C3%B3tipo-de-Alta-Fidelidade---Grupo-3?node-id=0-1&t=yz9fv04XC5S1WN3U-1

---

## Sobre o projeto

A Prisma Cursos não possuía presença digital estruturada, o que limitava a captação de alunos e a credibilidade da instituição. Este site resolve isso ao:

- Apresentar o instituto, sua proposta e seus valores;
- Divulgar os cursos oferecidos e o formato híbrido como diferencial;
- Exibir depoimentos de alunos como prova de resultados;
- Facilitar o contato por meio de formulário e informações diretas.

**Público-alvo:** jovens de 18 a 25 anos em busca do primeiro emprego e profissionais em transição de carreira.

---

## Funcionalidades

| ID | Funcionalidade |
|---|---|
| RF01 | Barra de navegação fixa com logotipo e links para as seções |
| RF02 | Menu responsivo (colapsável) para mobile e tablet |
| RF03 | Seção inicial com imagem, frase de impacto e CTAs |
| RF04 | Seção "Quem Somos" (apresentação, missão, valores e história) |
| RF05 | Seção "Cursos" com nome e descrição de cada curso |
| RF06 | Seção "Depoimentos" com nome do aluno e depoimento |
| RF07 | Seção "Contato" (telefone, e-mail, redes sociais e localização) |
| RF08 | Formulário de contato (nome, e-mail e mensagem) |
| RF09 | Validação dos campos e mensagem de confirmação no envio |

### Elemento de gamificação

[DESCREVER AQUI A GAMIFICAÇÃO DEFINIDA NO PROTÓTIPO: o que é, onde aparece no site e como o usuário interage com ela.]

---

## Tecnologias

- **HTML5**: estrutura semântica (header, nav, main, section, footer)
- **CSS3**: estilização, Flexbox e media queries
- **JavaScript**: menu responsivo, validação do formulário e gamificação
- **Git e GitHub**: versionamento
- **GitHub Pages**: publicação

---

## Estrutura do repositório

```
prisma-cursos-site/
├── index.html
├── README.md
├── .gitignore
├── css/
│   ├── variables.css
│   ├── global.css
│   └── components/
│       ├── typography.css
│       ├── buttons.css
│       └── cards.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── icons/
└── pages/
    └── design-system.html
```

Cada seção pode ter seu próprio arquivo em `css/`, importado no `index.html`.

---

## Design System (Issue #2)

A base visual reutilizável está organizada em `css/variables.css`, `css/global.css` e `css/components/` (com vitrine de validação em `pages/design-system.html`):

- **Tokens de Cores (`css/variables.css`)**:
  - Principais: `--color-primary` (`#13AEF9`), `--color-background` (`#000000`), `--color-surface` (`#262626`), `--color-white` (`#FFFFFF`).
  - Cores Refratadas pelo Prisma: `--color-prism-red` (`#B80004`), `--color-prism-orange` (`#F18D1A`), `--color-prism-yellow` (`#C6BF00`), `--color-prism-green` (`#00B454`), `--color-prism-blue` (`#017BF6`), `--color-prism-purple` (`#9146FC`).
- **Tipografia (`css/components/typography.css`)**:
  - Família `--font-primary: "Montserrat", sans-serif` (pesos `400`, `500`, `600`, `700`).
  - Classes principais: `.heading-hero`, `.section-header`, `.section-title`, `.section-subtitle`, `.text-lead`, `.text-body`, `.text-sm`, `.text-secondary`.
- **Layout e Containers (`css/global.css`)**:
  - `.container` (largura máxima de `1200px` com padding lateral responsivo), `.section` (espaçamento vertical padrão) e `.section--surface` (bloco `#262626` com bordas arredondadas).
- **Botões (`css/components/buttons.css`)**:
  - `.btn` combinado com `.btn--primary`, `.btn--secondary`, `.btn--outline` e modificadores `.btn--sm`, `.btn--lg`, `.btn--full` (compatível com `<button>` e `<a>`).
- **Cards e Badges (`css/components/cards.css`)**:
  - `.card` combinado com `.card--prism-red`, `.card--prism-orange`, `.card--prism-yellow`, `.card--prism-green`, `.card--prism-blue`, `.card--prism-purple`, `.card--info`, `.card--elevated`, `.card--pill` e `.badge`.

---

## Como rodar localmente

1. Clone o repositório:
   ```
   git clone https://github.com/DaviSakai/prisma-cursos-site-grupo3.git
   ```
2. Abra a pasta no VS Code.
3. Abra o `index.html` no navegador, ou use a extensão **Live Server** (botão direito no `index.html` → *Open with Live Server*).

O projeto usa só HTML, CSS e JavaScript, então não precisa instalar nada.
