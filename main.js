/* =========================================================
   P.TR — designer gráfico | Site institucional
   JS compartilhado entre todas as páginas
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Menu mobile ---------- */
  const navWrap = document.querySelector("[data-nav-wrap]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  if (navWrap && navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = navWrap.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navWrap.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => navWrap.classList.remove("is-open"));
    });
  }

  /* ---------- Accordion "Meus serviços" ---------- */
  document.querySelectorAll("[data-service-list]").forEach((list) => {
    const items = list.querySelectorAll(".service-item");
    const grid = list.closest(".services-grid");
    const visual = grid ? grid.querySelector("[data-service-visual]") : null;
    items.forEach((item) => {
      const toggle = item.querySelector(".service-toggle");
      if (!toggle) return;
      toggle.addEventListener("click", () => {
        const alreadyActive = item.classList.contains("is-active");
        items.forEach((i) => i.classList.remove("is-active"));
        if (!alreadyActive) {
          item.classList.add("is-active");
          if (visual && item.dataset.serviceImage) {
            visual.src = item.dataset.serviceImage;
            visual.alt = item.dataset.serviceImageAlt || "";
          }
        }
      });
    });
  });

  /* ---------- Filtro de Projetos / Blog ---------- */
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const pills = group.querySelectorAll(".filter-pill");
    const gridSelector = group.getAttribute("data-filter-group");
    const grid = document.querySelector(gridSelector);
    if (!grid) return;
    const cards = grid.querySelectorAll("[data-category]");

    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        pills.forEach((p) => p.classList.remove("is-active"));
        pill.classList.add("is-active");
        const cat = pill.getAttribute("data-cat");
        cards.forEach((card) => {
          const show = cat === "todos" || card.getAttribute("data-category") === cat;
          card.style.display = show ? "" : "none";
        });
      });
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Formulário de contato (rodapé) ---------- */
  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    const note = form.querySelector(".form-note");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nome = (data.get("nome") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nome || !emailOk) {
        if (note) {
          note.textContent = "Preencha nome e um e-mail válido para enviar.";
          note.style.color = "#f2b4a3";
        }
        return;
      }
      const whatsappNumber = form.getAttribute("data-whatsapp-number");
      if (whatsappNumber) {
        const sobrenome = (data.get("sobrenome") || "").toString().trim();
        const mensagem = (data.get("mensagem") || "").toString().trim();
        const texto = [
          `Olá! Meu nome é ${[nome, sobrenome].filter(Boolean).join(" ")}.`,
          `Meu e-mail é ${email}.`,
          mensagem
        ].filter(Boolean).join("\n\n");
        window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(texto)}`;
        return;
      }
      const endpoint = form.getAttribute("data-endpoint");
      if (!endpoint) {
        if (note) {
          note.textContent = "Mensagem pronta para envio — defina data-endpoint no <form> para ativar o envio real.";
          note.style.color = "";
        }
        form.reset();
        return;
      }
      if (note) { note.textContent = "Enviando…"; note.style.color = ""; }
      fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries()))
      })
        .then((r) => {
          if (!r.ok) throw new Error("HTTP " + r.status);
          if (note) note.textContent = "Mensagem enviada! Retorno em breve.";
          form.reset();
        })
        .catch(() => {
          if (note) {
            note.textContent = "Não foi possível enviar agora. Tente novamente em instantes.";
            note.style.color = "#f2b4a3";
          }
        });
    });
  });

  /* ---------- Newsletter (blog) ---------- */
  document.querySelectorAll("[data-newsletter-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input) input.value = "";
      const btn = form.querySelector("button");
      if (btn) {
        const original = btn.textContent;
        btn.textContent = "Inscrito!";
        setTimeout(() => { btn.textContent = original; }, 2200);
      }
    });
  });

  /* ---------- Ano corrente no rodapé ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
