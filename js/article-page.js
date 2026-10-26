(function () {
  "use strict";

  const articles = window.PTR_ARTICLES || {};
  const root = document.querySelector("[data-article-page]");
  if (!root) return;

  const slug = new URLSearchParams(window.location.search).get("artigo");
  const article = slug ? articles[slug] : null;
  if (!article) {
    document.title = "Artigo não encontrado — Blog P.TR";
    root.innerHTML = '<section class="section"><div class="container article-not-found"><span class="eyebrow">Blog · Insights</span><h1>Este artigo não foi encontrado</h1><p>Confira as publicações disponíveis no blog.</p><a class="btn btn-primary" href="blog.html">Voltar ao Blog</a></div></section>';
    return;
  }

  const description = article.excerpt;
  document.title = article.title + " — Blog P.TR";
  document.querySelector('meta[name="description"]').content = description;
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[property="og:description"]').content = description;
  document.querySelector('meta[property="og:image"]').content = new URL(article.image, window.location.href).href;
  document.querySelector('meta[property="og:url"]').content = window.location.href;
  document.querySelector('link[rel="canonical"]').href = window.location.href;

  const section = document.createElement("article");
  section.className = "article-page";

  const header = document.createElement("header");
  header.className = "article-header container";

  const breadcrumb = document.createElement("a");
  breadcrumb.className = "article-back";
  breadcrumb.href = "blog.html";
  breadcrumb.textContent = "← Blog";

  const category = document.createElement("span");
  category.className = "eyebrow";
  category.textContent = article.category;

  const title = document.createElement("h1");
  title.textContent = article.title;

  const excerpt = document.createElement("p");
  excerpt.className = "article-excerpt";
  excerpt.textContent = article.excerpt;

  const meta = document.createElement("p");
  meta.className = "article-meta";
  meta.textContent = article.date + " · " + article.readTime;

  header.append(breadcrumb, category, title, excerpt, meta);

  const image = document.createElement("img");
  image.className = "article-cover";
  image.src = article.image;
  image.alt = article.imageAlt;
  image.width = 1200;
  image.height = 800;
  image.fetchPriority = "high";

  const content = document.createElement("div");
  content.className = "article-content";
  content.setAttribute("data-article-content", "");

  article.sections.forEach((item) => {
    const subsection = document.createElement("section");
    if (item.heading) {
      const heading = document.createElement("h2");
      heading.textContent = item.heading;
      subsection.append(heading);
    }
    (item.paragraphs || []).forEach((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      subsection.append(paragraph);
    });
    if (item.items) {
      const list = document.createElement("ul");
      item.items.forEach((text) => {
        const listItem = document.createElement("li");
        listItem.textContent = text;
        list.append(listItem);
      });
      subsection.append(list);
    }
    content.append(subsection);
  });

  const footer = document.createElement("footer");
  footer.className = "article-end";
  const backLink = document.createElement("a");
  backLink.className = "btn btn-primary";
  backLink.href = "blog.html";
  backLink.textContent = "Voltar a todos os artigos";
  footer.append(backLink);

  section.append(header, image, content, footer);
  root.replaceChildren(section);
})();
