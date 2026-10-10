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

  function matches(p, q) {
    if (!q) return true;
    q = q.toLowerCase();
    if (p.name.toLowerCase().indexOf(q) !== -1) return true;
    if (t(p.tagline).toLowerCase().indexOf(q) !== -1) return true;
    if (t(p.summary).toLowerCase().indexOf(q) !== -1) return true;
    if (p.stack.join(" ").toLowerCase().indexOf(q) !== -1) return true;
    if (LANGS[p.lang].toLowerCase().indexOf(q) !== -1) return true;
    return p.tags.some(function (tag) {
      return t(TAGS[tag]).toLowerCase().indexOf(q) !== -1;
    });
  }

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

  var state = { q: "", tag: null, sort: "updated" };

  var SORTS = {
    updated: function (a, b) { return b.updated.localeCompare(a.updated); },
    loc: function (a, b) { return b.loc - a.loc; },
    commits: function (a, b) { return b.commits - a.commits; },
    name: function (a, b) { return a.name.localeCompare(b.name); }
  };

  function visibleProjects() {
    return PROJECTS.filter(function (p) {
      return (!state.tag || p.tags.indexOf(state.tag) !== -1) && matches(p, state.q);
    }).sort(SORTS[state.sort]);
  }

  function renderList() {
    view.innerHTML = "";
    var page = el("div", "fade-in");

    var hero = el("section", "hero");
    hero.appendChild(el("div", "hero-kicker", esc(t(SITE.hero.kicker))));
    hero.appendChild(el("h1", null, esc(t(SITE.hero.title))));
    hero.appendChild(el("p", "hero-sub", esc(t(SITE.hero.subtitle))));
    hero.appendChild(statStrip());
    page.appendChild(hero);

    var filters = el("div", "filters");

    var search = el("div", "search-box");
    search.innerHTML =
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle>' +
      '<path d="m20 20-3.5-3.5"></path></svg>';
    var input = el("input");
    input.type = "search";
    input.placeholder = t(SITE.ui.search);
    input.value = state.q;
    input.setAttribute("aria-label", t(SITE.ui.search));
    search.appendChild(input);
    filters.appendChild(search);

    var usedTags = {};
    PROJECTS.forEach(function (p) {
      p.tags.forEach(function (tag) { usedTags[tag] = (usedTags[tag] || 0) + 1; });
    });

    var allChip = el("button", "chip" + (state.tag ? "" : " on"),
      esc(t(SITE.ui.all)) + '<span class="chip-n">' + PROJECTS.length + "</span>");
    allChip.type = "button";
    allChip.addEventListener("click", function () { state.tag = null; renderList(); });
    filters.appendChild(allChip);

    Object.keys(TAGS).forEach(function (tag) {
      if (!usedTags[tag]) return;
      var b = el("button", "chip" + (state.tag === tag ? " on" : ""),
        esc(t(TAGS[tag])) + '<span class="chip-n">' + usedTags[tag] + "</span>");
      b.type = "button";
      b.addEventListener("click", function () {
        state.tag = state.tag === tag ? null : tag;
        renderList();
      });
      filters.appendChild(b);
    });

    var right = el("div", "filters-right");

    var wrap = el("div", "select-wrap");
    var sel = el("select");
    sel.setAttribute("aria-label", t(SITE.ui.sort));
    [["updated", SITE.ui.sortUpdated], ["loc", SITE.ui.sortLoc],
     ["commits", SITE.ui.sortCommits], ["name", SITE.ui.sortName]].forEach(function (o) {
      var opt = el("option", null, esc(t(o[1])));
      opt.value = o[0];
      if (state.sort === o[0]) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener("change", function () {
      state.sort = sel.value;
      renderList();
    });
    wrap.appendChild(sel);
    right.appendChild(wrap);

    if (state.q || state.tag) {
      var clear = el("button", "link-btn", esc(t(SITE.ui.clear)));
      clear.type = "button";
      clear.addEventListener("click", function () {
        state.q = ""; state.tag = null; renderList();
      });
      right.appendChild(clear);
    }

    filters.appendChild(right);
    page.appendChild(filters);

    var items = visibleProjects();
    page.appendChild(el("p", "result-line",
      esc(t(SITE.ui.showing).replace("{n}", items.length))));

    if (!items.length) {
      var empty = el("div", "empty");
      empty.appendChild(el("p", null, esc(PROJECTS.length ? t(SITE.ui.empty) : t(SITE.ui.noProjects))));
      var reset = el("button", "chip on", esc(t(SITE.ui.clear)));
      reset.type = "button";
      reset.addEventListener("click", function () {
        state.q = ""; state.tag = null; renderList();
      });
      empty.appendChild(reset);
      page.appendChild(empty);
    } else {
      var grid = el("div", "grid");
      items.forEach(function (p) { grid.appendChild(card(p)); });
      page.appendChild(grid);
    }

    view.appendChild(page);
    applyChrome();

    input.addEventListener("input", function () {
      state.q = input.value.trim();
      renderList();
      var again = view.querySelector(".search-box input");
      if (again) { again.focus(); again.setSelectionRange(again.value.length, again.value.length); }
    });
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