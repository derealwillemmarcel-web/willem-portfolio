/* Theme toggle, hamburger, scroll reveal */
(function () {
  // ---------- Theme ----------
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved === "dark") root.setAttribute("data-theme", "dark");

  document.addEventListener("click", function (e) {
    const t = e.target.closest("[data-theme-toggle]");
    if (!t) return;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    if (next === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    localStorage.setItem("theme", next);
  });

  // ---------- Hamburger ----------
  document.addEventListener("click", function (e) {
    const h = e.target.closest("[data-hamburger]");
    if (h) {
      const links = document.querySelector(".nav-links");
      h.classList.toggle("open");
      if (links) links.classList.toggle("open");
      return;
    }
    // close menu on link click (mobile)
    if (e.target.closest(".nav-links a")) {
      const h2 = document.querySelector(".hamburger");
      const links = document.querySelector(".nav-links");
      if (h2) h2.classList.remove("open");
      if (links) links.classList.remove("open");
    }
  });

  // ---------- Scroll reveal ----------
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && els.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add("is-visible"));
  }
})();
