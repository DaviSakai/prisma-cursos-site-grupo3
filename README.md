# Prisma Cursos | Site Institucional

Site institucional responsivo da **Prisma Cursos**, instituto de educação profissionalizante com cursos de tecnologia, design e gestão e modelo de ensino híbrido.

Projeto desenvolvido para o **Processo Trainee 26.2** da **Orc'estra Gamificação**, a partir do protótipo de alta fidelidade criado no Figma na etapa de concepção.

🔗 **Site publicado:** https://samukasan1518.github.io/prisma-cursos-site-grupo3/

🔗 **Repositório:** https://github.com/DaviSakai/prisma-cursos-site-grupo3

🎨 **Protótipo no Figma:** https://www.figma.com/design/ae4fbRKPPikS58AbWG3lZ0/Prot%C3%B3tipo-de-Alta-Fidelidade---Grupo-3?node-id=0-1&t=yz9fv04XC5S1WN3U-1

---

## Sobre o projeto

A Prisma Cursos não possuía presença digital estruturada, o que limitava a captação de alunos e a credibilidade da instituição. Este site resolve isso ao:

* Apresentar o instituto, sua proposta e seus valores.
* Divulgar os cursos oferecidos e o formato híbrido como diferencial.
* Exibir depoimentos de alunos como prova de resultados.
* Facilitar o contato por meio de formulário e informações diretas.

**Público-alvo:** jovens em busca do primeiro emprego e profissionais em transição de carreira.

---

## Funcionalidades

| ID | Funcionalidade |
| --- | --- |
| RF01 | Barra de navegação fixa com logotipo e links para as seções |
| RF02 | Menu responsivo (colapsável) para mobile e tablet |
| RF03 | Seção inicial com imagem, frase de impacto e CTAs |
| RF04 | Seção "Quem Somos" (apresentação, missão, valores e história) |
| RF05 | Seção "Cursos" com nome e descrição de cada curso |
| RF06 | Seção "Depoimentos" com nome do aluno e depoimento |
| RF07 | Seção "Contato" (telefone, e-mail, redes sociais e localização) |
| RF08 | Formulário de contato (nome, e-mail e mensagem) |
| RF09 | Validação dos campos e mensagem de confirmação no envio |

### Gamificação: Teste de Perfil Profissional

O site conta com um elemento de gamificação posicionado diretamente na página inicial

* **Justificativa:** Como o público-alvo (jovens à procura do primeiro emprego e profissionais em transição de carreira) frequentemente enfrenta dificuldades e indecisão na hora de escolher uma formação, o teste serve como uma ferramenta para facilitar o primeiro contato. Ele ajuda o visitante a explorar as suas possibilidades profissionais com maior clareza, reduzindo o desgaste de procurar em várias páginas diferentes.
* **Mecânica:** O usuário responde a 5 perguntas de múltipla escolha focadas em situações práticas de trabalho, habilidades e interesses.
* **Resultado:** O sistema avalia as respostas em conjunto e indica qual das três áreas da Prisma Cursos (Tecnologia, Design ou Gestão) é a mais compatível com o perfil do visitante.
* **Recompensa:** Ao concluir o teste, o usuário recebe a indicação da área e um cupom de 15% de desconto, o que agrega valor à experiência e incentiva a matrícula.

---

## Tecnologias

* **HTML5**: estrutura semântica (header, nav, main, section, footer).
* **CSS3**: estilização, Flexbox e media queries.
* **JavaScript**: menu responsivo, validação do formulário e lógica do teste vocacional.
* **Git e GitHub**: versionamento e colaboração.
* **GitHub Pages**: publicação estática.

---

## Estrutura do repositório

A organização atual dos diretórios e arquivos do projeto:

- `prisma-cursos-site-grupo3/`
- `.vscode/`
- `assets/`
  - `icons/`
  - `images/`

- `css/`
- `js/`
- `pages/`
- `.gitignore`
- `index.html`
- `README.md`



---

## Equipe e Responsabilidades

O desenvolvimento foi dividido em módulos focados e integrados através de Pull Requests. As responsabilidades foram distribuídas da seguinte forma:

* **Samuel Chaves Gomes da Silva** (`@SamukaSan1518`): Infraestrutura inicial, navegação fixa e preparação da publicação no GitHub Pages (Issues #01, #03, #17).
* **Davi Kenichi Watanabe Sakai** (`@DaviSakai`): Criação do Design System, seção Hero inicial e seção institucional (Issues #02, #05, #06).
* **Adriel Cabra Viana Morais** (`@adriel-cmorais`): Menu responsivo mobile/tablet, interface visual e lógica de funcionamento do Teste Vocacional (Issues #04, #13, #14).
* **Deivyton Tawan Leite Cavalcante** (`@tawcavalcante`): Estruturação dos cards de destaque, página do catálogo de cursos e documentação final (Issues #07, #08, #18).
* **Daniel Fernandes de Aguiar Castro** (`@Daniel-castroo`): Seção de depoimentos, seção de contato/rodapé e coordenação da auditoria de responsividade (Issues #09, #10, #15).
* **Rickelme de Souza Gomes Oliveira** (`@ItsRSGO`): Interface do formulário, lógica de validação/envio e coordenação da auditoria funcional e visual (Issues #11, #12, #16).

---

## Testes e Validação

* **Auditoria de Responsividade (Issue #15):** O site foi testado nas resoluções de desktop, tablet e mobile para garantir a adaptação sem quebras de layout ou sobreposições.
* **Auditoria Funcional e Visual (Issue #16):** Verificação de consistência de cores e tipografia em relação ao Figma, testes de links âncoras e verificação de erros no console do navegador.

---

## Como rodar localmente

1. Clone o repositório na sua máquina:
`git clone https://github.com/DaviSakai/prisma-cursos-site-grupo3.git`
2. Abra a pasta do projeto no VS Code.
3. Abra o arquivo `index.html` diretamente no navegador, ou utilize a extensão **Live Server** (clique com o botão direito no `index.html` → *Open with Live Server*).
4. Não há necessidade de instalar pacotes via gerenciadores de dependências, pois o projeto utiliza HTML, CSS e JS puros.

Ficou do jeito que você queria para fazer o commit final na documentação?
