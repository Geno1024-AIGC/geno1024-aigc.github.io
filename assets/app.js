(function () {
  "use strict";

  var view = document.getElementById("view");
  var LANG_KEY = "g1024-lang";
  var lang = "zh";

  try {
    var stored = localStorage.getItem(LANG_KEY);
    if (stored === "zh" || stored === "en") lang = stored;
    else if ((navigator.language || "").toLowerCase().indexOf("zh") !== 0) lang = "en";
  } catch (e) { /* private mode */ }

  /* ---------- helpers ---------- */

  function t(node) {
    if (node == null) return "";
    if (typeof node === "string") return node;
    return node[lang] != null ? node[lang] : node.zh || "";
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function num(n) {
    return n.toLocaleString("en-US");
  }

  function fmtDate(iso) {
    var y = iso.slice(0, 4), m = iso.slice(5, 7), d = iso.slice(8, 10);
    return lang === "zh" ? y + "-" + m + "-" + d : [y, m, d].join("/");
  }

  function plural(n, word) {
    return lang === "en" && n === 1 ? word : word + "s";
  }

  /* ---------- derived stats ---------- */

  var TOTALS = (function () {
    var s = { projects: PROJECTS.length, loc: 0, commits: 0, tests: 0, ci: 0 };
    PROJECTS.forEach(function (p) {
      s.loc += p.loc; s.commits += p.commits; s.tests += p.tests; if (p.ci) s.ci++;
    });
    return s;
  })();

  /* ---------- shared chrome ---------- */

  function applyChrome() {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = SITE.org;

    var opts = document.querySelectorAll("[data-lang-opt]");
    for (var i = 0; i < opts.length; i++) {
      opts[i].classList.toggle("on", opts[i].getAttribute("data-lang-opt") === lang);
    }

    var navProjects = document.querySelector('[data-nav="projects"]');
    var navAbout = document.querySelector('[data-nav="about"]');
    navProjects.textContent = t(SITE.ui.projects);
    navAbout.textContent = t(SITE.ui.about);
    navAbout.classList.remove("active");
    navProjects.classList.add("active");

    document.getElementById("footer-note").textContent = t(SITE.ui.footer);
    document.getElementById("footer-stats").textContent =
      TOTALS.projects + " · " + num(TOTALS.loc) + " LOC · " + num(TOTALS.commits) + " commits";
  }

  function statStrip() {
    var strip = el("div", "stat-strip");
    var items = [
      [TOTALS.projects, SITE.stats.projects],
      [num(TOTALS.loc), SITE.stats.loc],
      [num(TOTALS.commits), SITE.stats.commits],
      [num(TOTALS.tests), SITE.stats.tests],
      [TOTALS.ci + " / " + TOTALS.projects, SITE.stats.ci]
    ];
    items.forEach(function (it) {
      var s = el("div", "stat");
      s.appendChild(el("div", "stat-num", esc(String(it[0]))));
      s.appendChild(el("div", "stat-label", esc(t(it[1]))));
      strip.appendChild(s);
    });
    return strip;
  }

  /* ---------- list view ---------- */

  function renderList() {
    view.innerHTML = "";
    var page = el("div", "fade-in");

    var hero = el("section", "hero");
    hero.appendChild(el("div", "hero-kicker", esc(t(SITE.hero.kicker))));
    hero.appendChild(el("h1", null, esc(t(SITE.hero.title))));
    hero.appendChild(el("p", "hero-sub", esc(t(SITE.hero.subtitle))));
    hero.appendChild(statStrip());
    page.appendChild(hero);

    if (PROJECTS.length) {
      var grid = el("div", "grid");
      PROJECTS.forEach(function (p) { grid.appendChild(card(p)); });
      page.appendChild(grid);
    } else {
      page.appendChild(el("div", "empty", esc(t(SITE.ui.empty))));
    }

    view.appendChild(page);
    applyChrome();
  }

  function card(p) {
    var a = el("a", "card");
    a.href = "#/p/" + p.id;

    var head = el("div", "card-head");
    head.appendChild(el("span", "card-name", esc(p.name)));
    head.appendChild(el("span", "lang-tag", esc(LANGS[p.lang])));
    a.appendChild(head);

    a.appendChild(el("p", "card-title", esc(t(p.tagline))));

    var ul = el("ul", "card-points");
    p.highlights.slice(0, 3).forEach(function (h) {
      ul.appendChild(el("li", null, esc(t(h))));
    });
    a.appendChild(ul);

    var foot = el("div", "card-foot");
    foot.appendChild(el("span", null, num(p.loc) + " LOC"));
    foot.appendChild(el("span", null, p.commits + "&nbsp;" + plural(p.commits, "commit")));
    if (p.tests > 0) foot.appendChild(el("span", null, p.tests + "&nbsp;" + plural(p.tests, "test")));
    foot.appendChild(el("span", null, fmtDate(p.updated)));
    foot.appendChild(el("span", "spacer go", "&rarr;"));
    a.appendChild(foot);

    return a;
  }

  /* ---------- router ---------- */

  function route() {
    renderList();
  }

  /* ---------- init ---------- */

  window.addEventListener("hashchange", route);

  var header = document.querySelector(".site-header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  route();
})();