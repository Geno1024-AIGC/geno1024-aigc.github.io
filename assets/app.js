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

    var active = location.hash.indexOf("#/about") === 0 ? navAbout : navProjects;
    navProjects.classList.toggle("active", active === navProjects);
    navAbout.classList.toggle("active", active === navAbout);

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

  /* ---------- detail view ---------- */

  function renderDetail(id) {
    var idx = -1;
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].id === id) { idx = i; break; }
    }
    if (idx === -1) { location.hash = "#/"; return; }
    var p = PROJECTS[idx];

    view.innerHTML = "";
    var page = el("div", "detail fade-in");

    var back = el("a", "back-link", "&larr;&nbsp;" + esc(t(SITE.ui.back)));
    back.href = "#/";
    page.appendChild(back);

    page.appendChild(el("h1", null, esc(p.name)));
    page.appendChild(el("p", "detail-tagline", esc(t(p.tagline))));

    var repo = el("a", "detail-repo", esc(p.repo) + " &nbsp;&nearr;");
    repo.href = p.url;
    repo.target = "_blank";
    repo.rel = "noopener";
    page.appendChild(repo);

    var sumBlock = el("div", "detail-block");
    sumBlock.appendChild(el("h2", "section-label", esc(t(SITE.ui.summary))));
    sumBlock.appendChild(el("p", "detail-summary", esc(t(p.summary))));
    page.appendChild(sumBlock);

    var hlBlock = el("div", "detail-block");
    hlBlock.appendChild(el("h2", "section-label", esc(t(SITE.ui.highlights))));
    var ul = el("ul", "points");
    p.highlights.forEach(function (h) { ul.appendChild(el("li", null, esc(t(h)))); });
    hlBlock.appendChild(ul);
    page.appendChild(hlBlock);

    var stBlock = el("div", "detail-block");
    stBlock.appendChild(el("h2", "section-label", esc(t(SITE.ui.stack))));
    var chips = el("div", "chip-row");
    p.stack.forEach(function (s) { chips.appendChild(el("span", "stack-chip", esc(s))); });
    stBlock.appendChild(chips);
    page.appendChild(stBlock);

    var mBlock = el("div", "detail-block");
    mBlock.appendChild(el("h2", "section-label", esc(t(SITE.ui.metrics))));
    var grid = el("div", "metrics");
    [
      [num(p.loc), SITE.ui.lines, ""],
      [num(p.commits), SITE.ui.commits, ""],
      [p.tests > 0 ? num(p.tests) : t(SITE.ui.no), SITE.ui.tests, p.tests > 0 ? "on" : "off"],
      [p.ci ? t(SITE.ui.yes) : t(SITE.ui.no), SITE.ui.ci, p.ci ? "on" : "off"],
      [fmtDate(p.updated), SITE.ui.updated, ""]
    ].forEach(function (m) {
      var cell = el("div", "metric");
      cell.appendChild(el("div", "metric-val " + m[2], esc(String(m[0]))));
      cell.appendChild(el("div", "metric-key", esc(t(m[1]))));
      grid.appendChild(cell);
    });
    mBlock.appendChild(grid);
    page.appendChild(mBlock);

    var tgBlock = el("div", "detail-block");
    tgBlock.appendChild(el("h2", "section-label", esc(t(SITE.ui.tags))));
    var tg = el("div", "chip-row");
    p.tags.forEach(function (tag) { tg.appendChild(el("span", "stack-chip", esc(t(TAGS[tag])))); });
    tgBlock.appendChild(tg);
    page.appendChild(tgBlock);

    var nav = el("div", "detail-nav");
    if (idx > 0) {
      var prev = PROJECTS[idx - 1];
      var a = el("a", null, "<small>" + esc(t(SITE.ui.prev)) + "</small>" + esc(prev.name));
      a.href = "#/p/" + prev.id;
      nav.appendChild(a);
    } else {
      nav.appendChild(el("span", "spacer"));
    }
    if (idx < PROJECTS.length - 1) {
      var nxt = PROJECTS[idx + 1];
      var b = el("a", "next", "<small>" + esc(t(SITE.ui.next)) + "</small>" + esc(nxt.name));
      b.href = "#/p/" + nxt.id;
      nav.appendChild(b);
    }
    page.appendChild(nav);

    view.appendChild(page);
    applyChrome();
    window.scrollTo(0, 0);
  }

  /* ---------- about view ---------- */

  function renderAbout() {
    view.innerHTML = "";
    var page = el("div", "about fade-in");

    page.appendChild(el("h1", null, esc(t(SITE.about.title))));
    page.appendChild(el("p", "about-lead", esc(t(SITE.about.lead))));

    var grid = el("div", "principle-grid");
    SITE.about.principles.forEach(function (pr) {
      var c = el("div", "principle");
      c.appendChild(el("h3", null, esc(t({ zh: pr.zh, en: pr.en }))));
      c.appendChild(el("p", null, esc(t(pr.body))));
      grid.appendChild(c);
    });
    page.appendChild(grid);

    var nBlock = el("div", "detail-block");
    nBlock.appendChild(el("h2", "section-label", esc(t(SITE.about.notesTitle))));
    var ul = el("ul", "notes");
    SITE.about.notes.forEach(function (n) { ul.appendChild(el("li", null, esc(t(n)))); });
    nBlock.appendChild(ul);
    page.appendChild(nBlock);

    view.appendChild(page);
    applyChrome();
    window.scrollTo(0, 0);
  }

  /* ---------- router ---------- */

  function route() {
    var h = location.hash || "#/";
    if (h.indexOf("#/p/") === 0) renderDetail(decodeURIComponent(h.slice(4)));
    else if (h.indexOf("#/about") === 0) renderAbout();
    else renderList();
  }

  /* ---------- init ---------- */

  document.getElementById("lang-toggle").addEventListener("click", function () {
    lang = lang === "zh" ? "en" : "zh";
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
    route();
  });

  window.addEventListener("hashchange", route);

  var header = document.querySelector(".site-header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  route();
})();