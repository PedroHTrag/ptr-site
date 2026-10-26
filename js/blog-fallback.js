(function () {
  "use strict";

  if (!document.body.textContent.includes("{%")) return;

  const articles = window.PTR_ARTICLES || {};
  const entries = Object.entries(articles);
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = "css/style.css";
  document.head.append(stylesheet);

  const fontPreconnect = document.createElement("link");
  fontPreconnect.rel = "preconnect";
  fontPreconnect.href = "https://fonts.googleapis.com";
  document.head.append(fontPreconnect);

  const fontStylesheet = document.createElement("link");
  fontStylesheet.rel = "stylesheet";
  fontStylesheet.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap";
  document.head.append(fontStylesheet);

  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/svg+xml";
  favicon.href = "assets/logo/favicon.svg?v=2";
  document.head.append(favicon);

  document.title = "Blog · Insights | P.TR — designer gráfico";
  document.body.className = "";
  document.body.replaceChildren();

  function element(tagName, className, text) {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  const navWrap = element("div", "nav-wrap");
  navWrap.setAttribute("data-nav-wrap", "");
  const nav = element("nav", "navbar");
  nav.setAttribute("aria-label", "Navegação principal");
  nav.innerHTML = `
    <div class="nav-links-left">
      <a href="index.html#sobre" class="nav-link">Sobre</a>
      <a href="servicos.html" class="nav-link">Serviços</a>
    </div>
    <a href="index.html" class="nav-logo" aria-label="P.TR designer gráfico — página inicial">
      <img src="assets/logo/Logo_preto.svg" alt="P.TR designer gráfico" width="72" height="44">
    </a>
    <div class="nav-right">
      <div class="nav-links-right">
        <a href="projetos.html" class="nav-link">Projetos</a>
        <a href="blog.html" class="nav-link is-active">Blog</a>
      </div>
      <a href="index.html#contato" class="btn btn-primary nav-cta">Contato</a>
      <button class="nav-toggle" data-nav-toggle aria-label="Abrir menu" aria-expanded="false" aria-controls="mobile-menu"><span></span></button>
    </div>
    <div class="mobile-menu" id="mobile-menu">
      <a href="index.html#sobre" class="nav-link">Sobre</a>
      <a href="servicos.html" class="nav-link">Serviços</a>
      <a href="projetos.html" class="nav-link">Projetos</a>
      <a href="blog.html" class="nav-link is-active">Blog</a>
      <a href="index.html#contato" class="btn btn-primary btn-block">Contato</a>
    </div>`;
  navWrap.append(nav);
  document.body.append(navWrap);

  const main = element("main");
  main.id = "conteudo";
  const intro = element("section", "section");
  intro.style.paddingBottom = "0";
  intro.innerHTML = `
    <div class="container">
      <span class="eyebrow">Publicações</span>
      <h1>Blog · Insights</h1>
      <p class="lede" style="margin-top:16px;">Reflexões sobre design, identidade de marca, SEO e o futuro da presença digital.</p>
    </div>`;
  main.append(intro);

  if (entries.length) {
    const listing = element("section", "section");
    const container = element("div", "container");
    const featured = entries[0];
    const categories = [...new Set(entries.map(([, article]) => article.category))];
    const filterRow = element("div", "filter-row");
    filterRow.setAttribute("data-filter-group", "#blog-grid");

    const filters = ["Todos", ...categories];
    filters.forEach((category, index) => {
      const button = element("button", `filter-pill${index === 0 ? " is-active" : ""}`, category);
      button.type = "button";
      button.dataset.cat = index === 0
        ? "todos"
        : category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
      filterRow.append(button);
    });
    container.append(filterRow);

    function createCard(slug, article, isFeatured) {
      const card = element("a", isFeatured ? "blog-featured" : "blog-card");
      card.href = `artigo.html?artigo=${encodeURIComponent(slug)}`;
      card.dataset.category = article.category
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");

      if (isFeatured) {
        const figure = element("figure");
        const image = element("img");
        image.src = article.image;
        image.alt = article.imageAlt || article.title;
        figure.append(image);
        card.append(figure);

        const copy = element("div", "blog-featured-copy");
        const tags = element("div", "tags");
        tags.append(
          element("span", "tag-solid", article.category),
          element("span", "tag-muted", "Em destaque")
        );
        copy.append(tags, element("h2", "", article.title), element("p", "", article.excerpt));
        const meta = element("div", "meta-row");
        meta.append(element("span", "", `${article.date} · ${article.readTime}`));
        meta.append(element("span", "text-link", "Ler artigo →"));
        copy.append(meta);
        card.append(copy);
        return card;
      }

      const figure = element("figure");
      const image = element("img");
      image.loading = "lazy";
      image.decoding = "async";
      image.src = article.image;
      image.alt = article.imageAlt || article.title;
      figure.append(image);
      card.append(figure);

      const tags = element("div", "tags");
      tags.append(
        element("span", "tag-outline", article.category),
        element("span", "tag-muted", `${article.date} · ${article.readTime}`)
      );
      card.append(tags, element("h3", "", article.title), element("p", "", article.excerpt));
      card.append(element("span", "text-link", "Ler artigo →"));
      return card;
    }

    container.append(createCard(featured[0], featured[1], true));
    const grid = element("div", "blog-grid");
    grid.id = "blog-grid";
    entries.slice(1).forEach(([slug, article]) => grid.append(createCard(slug, article, false)));
    container.append(grid);
    listing.append(container);
    main.append(listing);

    filterRow.querySelectorAll(".filter-pill").forEach((button) => {
      button.addEventListener("click", () => {
        filterRow.querySelectorAll(".filter-pill").forEach((pill) => pill.classList.remove("is-active"));
        button.classList.add("is-active");
        const category = button.dataset.cat;
        grid.querySelectorAll(".blog-card").forEach((card) => {
          card.hidden = category !== "todos" && card.dataset.category !== category;
        });
      });
    });
  } else {
    const empty = element("section", "section");
    empty.append(element("div", "container article-not-found", "Ainda não há artigos publicados. Volte em breve para conferir as novidades."));
    main.append(empty);
  }

  const footer = element("footer", "site-footer");
  footer.id = "contato";
  footer.innerHTML = `
    <div class="container">
      <div class="newsletter-bar">
        <div class="newsletter-copy">
          <span class="eyebrow on-dark">Novos artigos</span>
          <h2>Fique por dentro</h2>
          <p>Novos conteúdos sobre design, estratégia de marca e presença digital publicados regularmente.</p>
        </div>
        <a href="index.html#contato" class="btn btn-accent">Fale comigo</a>
      </div>
      <div class="footer-bottom">
        <span>© <span data-year>2026</span> P.TR · designer gráfico. Todos os direitos reservados.</span>
        <span>Síntese · Forma · Identidade</span>
      </div>
    </div>`;
  document.body.append(main, footer);

  const mainScript = document.createElement("script");
  mainScript.src = "js/main.js";
  document.body.append(mainScript);
})();
