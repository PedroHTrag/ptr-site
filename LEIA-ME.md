# P.TR — Site institucional

Site do estúdio P.TR, construído com HTML, CSS e JavaScript. A página do blog
e os artigos são gerados com Jekyll para GitHub Pages; as outras páginas
institucionais continuam em HTML estático.

## Estrutura

```
index.html        → Home
servicos.html      → Serviços
projetos.html      → Projetos (portfólio)
portfolio.html     → Portfólio dinâmico da coleção Jekyll
blog.html          → Blog · Insights (listagem Liquid do Jekyll)
_config.yml         → Configuração do Jekyll
_layouts/default.html → Estrutura compartilhada do blog
_layouts/post.html  → Layout dos artigos Markdown
_posts/             → Artigos publicados em Markdown
_layouts/projeto.html → Layout dos cases da coleção
_projetos/          → Cases de portfólio em Markdown
projeto-<nome>.html → 1 página de case por projeto (aurora/VetGroom, hapuk,
                       kudissanga, HS Telecom)
sitemap.xml · robots.txt → SEO (ver "Antes de publicar")
css/style.css       → todo o estilo do site (1 arquivo, seções comentadas)
js/main.js          → menu mobile, accordion de serviços, carrossel de
                       depoimento, filtros de Projetos/Blog, reveal on
                       scroll, validação simples dos formulários
assets/logo/        → as 5 variações de logo enviadas (svg) + favicon.svg
assets/img/         → imagens do site (ver abaixo)
assets/img/kudissanga/ → aplicações visuais do case (fachada, cardápio,
                         embalagens, uniforme, mesa e gastronomia)
assets/img/hs-telecom/ → aplicações visuais do rebranding HS Telecom
```

As páginas institucionais e os templates Jekyll compartilham
`css/style.css`; os templates também reutilizam `js/main.js`.
Ao abrir `blog.html` diretamente como arquivo, um fallback em JavaScript
monta a listagem com o mesmo layout, pois o navegador não processa Liquid nem
Front Matter. Para conferir os artigos Markdown publicados, use o Jekyll.

## Imagens

As capas dos artigos são fotografias gratuitas do Pexels, escolhidas para
representar cada tema e armazenadas em `assets/img/blog/`. As imagens são
carregadas localmente pelo blog e pelos artigos Markdown do Jekyll. As imagens
do restante do site mantêm seus nomes atuais para que possam ser substituídas
sem alterar o HTML.

Sugestão de proporção por grupo (para cortar a foto real no mesmo formato):
- `hero-fundo.jpg` — imagem de fundo da seção inicial (foto atual em 3:2; `object-fit: cover` preserva a proporção e recorta conforme a tela)
- `service-identidade-visual.jpg`, `service-design-marca.jpg` e
  `service-web-design.jpg` — imagens que acompanham os serviços selecionados
- `sobre-pedro.jpg` — retrato do designer na seção de apresentação
- `service-identidade-visual.jpg`, `service-design-marca.jpg` e
  `service-web-design.jpg` — imagens dos serviços na Home e na página Serviços
- `projeto-*.jpg` — paisagem, ~4:3
- `assets/img/blog/*.jpg` — fotografias do Pexels, exibidas com recorte próximo de 4:3

## Tipografia e cores

- Fonte: **Outfit** (Google Fonts, carregada via `<link>` no `<head>` de
  cada página — pesos 400/500/600/700/800).
- Paleta (direto do Manual de Identidade):
  - `#8c8372` marrom claro (destaque/accent)
  - `#5a5241` marrom escuro
  - `#0c0d0d` preto
  - `#bfbdb8` cinza
  - `#edecf4` fundo

Todos os valores estão centralizados como variáveis CSS no topo de
`css/style.css` (`:root { --brown-l, --brown-d, --black, --gray, --bg, ... }`).

## Funcionalidades implementadas

- Menu responsivo com toggle mobile (abaixo de 720px)
- Accordion "Meus serviços" (clique para expandir cada item)
- Carrossel de depoimento com dots (autoplay de 6s + clique manual)
- Filtros por categoria em Projetos e Blog (client-side, sem reload)
- Artigos Markdown gerados pelo Jekyll com layout único e listagem Liquid no Blog
- Capas ilustradas originais e específicas para os artigos do blog
- Cases de portfólio gerados pela coleção `projetos` do Jekyll
- Ticker/marquee "Forma · Identidade · Síntese" em CSS puro
- Reveal-on-scroll sutil (`IntersectionObserver`, respeita
  `prefers-reduced-motion`)
- Formulário de contato (rodapé, presente em todas as páginas) e newsletter
  (Blog) com validação simples no front-end — **sem backend**: o `submit`
  hoje só valida e mostra uma mensagem de confirmação. Para ativar o envio
  de verdade, plugue o `<form>` num serviço (Formspree, backend próprio,
  etc.) ou ajuste `data-contact-form` / `data-newsletter-form` em
  `js/main.js`.

## O que ficou como suposição (não estava especificado no briefing)

- Página **Sobre** e o link **Contato** apontam para âncoras dentro da Home
  (`#sobre`, que é a seção "Da ideia à identidade", e `#contato`, o rodapé
  com o formulário) — não havia mockup dedicado para essas duas telas.
- Sem integração de WhatsApp (não havia esse elemento nos mockups
  fornecidos); os campos de funcionalidade do briefing ficaram em branco,
  então nada foi inventado além do que os prints mostram.
- Textos de "Design de Marca", "Web Design" etc. no accordion de serviços
  (a versão completa, exibida ao clicar) foram escritos no mesmo tom do
  texto de "Identidade Visual" que já vinha pronto no mockup — ajuste
  livremente.

## Rodar localmente

Para conferir o site com a geração Jekyll, instale Ruby e Bundler e execute:

```
gem install jekyll bundler
jekyll serve
```

O blog gerado estará em `http://localhost:4000/blog.html`. As páginas HTML
estáticas continuam disponíveis na mesma raiz.

## Páginas de projeto (cases)

Cada `projeto-<nome>.html` segue o mesmo modelo: hero com imagem, ficha
(cliente/serviços/categoria/ano), Desafio × Solução, galeria, paleta +
tipografia, citação da direção criativa e card "Próximo →" (o último volta
para o primeiro). A marca d'água ao fundo usa `Logo_cinza_1.svg`.

- **Os textos do VetGroom e do Hapuk** vieram dos materiais dos projetos.
- O case **Kudissanga** usa a apresentação do projeto e os materiais de
  identidade fornecidos. O ponto de Bauru é apresentado como conceito
  simulado no plano de negócios, não como endereço confirmado.
- O case **HS Telecom** apresenta o redesign da identidade visual, a paleta e
  aplicações fornecidas para a marca.
- Imagens: substitua os arquivos de `assets/img/projetos/` mantendo o nome
  (`-hero` ~ 21:10, `-01` ~ 12:13, `-02`/`-03` ~ 4:3).
- As fontes de cada case são carregadas do Google Fonts no `<head>` da própria
  página; a tipografia exibida na página pode ser trocada ali e no `style`
  inline do bloco "Tipografia".

## Antes de publicar

1. **Domínio**: `pedrotragante.online` está configurado em `og:image`,
   `sitemap.xml`, `robots.txt`, `_config.yml` e no arquivo `CNAME`. Aponte o
   domínio para o GitHub Pages no provedor DNS e ative o HTTPS nas configurações
   de Pages do repositório.
2. **Formulários**: adicione `data-endpoint="https://formspree.io/f/SEU_ID"`
   (ou outro serviço que aceite POST JSON) nos `<form data-contact-form>`.
   Sem o atributo, continua só validando no front.
3. **Blog/Jekyll**: crie cada artigo em `_posts/` com o nome
   `YYYY-MM-DD-titulo-do-artigo.md`. Inclua Front Matter com `layout: post`,
   `title`, `date` e `description`; opcionalmente use `category`,
   `category_label`, `image`, `image_alt` e `read_time`. A página `blog.html`
   lista os posts automaticamente com Liquid. Atualize também `sitemap.xml`
   com a URL do novo post. Para publicar no GitHub Pages, configure o domínio
   em `url` no `_config.yml` e publique a branch/pasta configurada no
   repositório.
4. **Portfólio/Jekyll**: adicione cada case em `_projetos/` como Markdown.
   Configure `title`, `cliente`, `categoria` e `imagem_capa` no Front Matter;
   opcionalmente use `servicos`, `ano` e `imagem_alt`. A coleção gera páginas
   individuais em `/portfolio/nome-do-arquivo/`, e `portfolio.html` lista os
   cases automaticamente. Adicione as imagens em `assets/` e atualize o
   caminho no Front Matter.
