(function () {
  "use strict";

  var LANG_KEY = "g1024-lang";
  var lang = "zh";
  var i;

  try {
    var stored = localStorage.getItem(LANG_KEY);
    if (stored === "zh" || stored === "en") lang = stored;
    else if ((navigator.language || "").toLowerCase().indexOf("zh") !== 0) lang = "en";
  } catch (e) { /* private mode */ }

  var langOpts = document.querySelectorAll("[data-lang-opt]");
  var resultLine = document.getElementById("result-line");
  var shown = 0;

  /* ---------- language ---------- */

  function updateResultLine() {
    if (!resultLine) return;
    var tpl = lang === "en"
      ? resultLine.getAttribute("data-tpl-en")
      : resultLine.getAttribute("data-tpl-zh");
    resultLine.textContent = tpl.replace("{n}", String(shown));
  }

  function applyLang() {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

    var body = document.body;
    if (body.getAttribute("data-title-en")) {
      if (!body.hasAttribute("data-title-zh")) {
        body.setAttribute("data-title-zh", document.title);
      }
      document.title = lang === "en"
        ? body.getAttribute("data-title-en")
        : body.getAttribute("data-title-zh");
    }

    var nodes = document.querySelectorAll("[data-en]");
    for (i = 0; i < nodes.length; i++) {
      if (!nodes[i].hasAttribute("data-zh")) {
        nodes[i].setAttribute("data-zh", nodes[i].textContent);
      }
      nodes[i].textContent = lang === "en"
        ? nodes[i].getAttribute("data-en")
        : nodes[i].getAttribute("data-zh");
    }

    var fields = document.querySelectorAll("[data-en-ph]");
    for (i = 0; i < fields.length; i++) {
      if (!fields[i].hasAttribute("data-zh-ph")) {
        fields[i].setAttribute("data-zh-ph", fields[i].getAttribute("placeholder") || "");
      }
      fields[i].setAttribute(
        "placeholder",
        lang === "en" ? fields[i].getAttribute("data-en-ph") : fields[i].getAttribute("data-zh-ph")
      );
    }

    for (i = 0; i < langOpts.length; i++) {
      langOpts[i].classList.toggle("on", langOpts[i].getAttribute("data-lang-opt") === lang);
    }

    updateResultLine();
  }

  /* ---------- list: search, filter, sort ---------- */

  var grid = document.getElementById("grid");

  if (grid) {
    var rows = Array.prototype.slice.call(grid.querySelectorAll("tr"));
    var headers = Array.prototype.slice.call(
      document.querySelectorAll(".proj-table th[data-sort]")
    );
    var searchInput = document.getElementById("search-input");
    var clearBtn = document.getElementById("clear-btn");
    var emptyEl = document.getElementById("empty");
    var emptyClear = document.getElementById("empty-clear");
    var chips = Array.prototype.slice.call(document.querySelectorAll(".filters .chip[data-tag]"));
    var statusChips = Array.prototype.slice.call(
      document.querySelectorAll(".filters .chip[data-status]")
    );
    var NUMERIC = { loc: 1, commits: 1, tokens: 1 };
    var ASCENDING = { name: 1, lang: 1, status: 1, tags: 1 };
    var state = { q: "", tag: "", status: "", sort: "updated", dir: "desc" };

    shown = rows.length;

    function key(row, field) {
      var raw = row.getAttribute("data-" + field);
      return NUMERIC[field] ? Number(raw) : raw;
    }

    function markHeaders() {
      headers.forEach(function (th) {
        var on = th.getAttribute("data-sort") === state.sort;
        th.classList.toggle("on", on);
        th.classList.toggle("desc", on && state.dir === "desc");
        th.setAttribute(
          "aria-sort",
          on ? (state.dir === "asc" ? "ascending" : "descending") : "none"
        );
      });
    }

    function apply() {
      var q = state.q.toLowerCase();
      var ordered = rows.slice().sort(function (a, b) {
        var ka = key(a, state.sort);
        var kb = key(b, state.sort);
        var r = NUMERIC[state.sort] ? ka - kb : ka.localeCompare(kb);
        return state.dir === "desc" ? -r : r;
      });

      shown = 0;
      ordered.forEach(function (row) {
        var tags = row.getAttribute("data-tags").split(",");
        var visible =
          (!state.tag || tags.indexOf(state.tag) !== -1) &&
          (!state.status || row.getAttribute("data-status") === state.status) &&
          (!q ||
            (row.getAttribute("data-search") || row.textContent)
              .toLowerCase()
              .indexOf(q) !== -1);
        row.hidden = !visible;
        if (visible) shown++;
        grid.appendChild(row);
      });

      if (emptyEl) emptyEl.hidden = shown !== 0;
      if (clearBtn) clearBtn.hidden = !state.q && !state.tag && !state.status;
      updateResultLine();
      syncFade();
    }

    function reset() {
      state.q = "";
      state.tag = "";
      state.status = "";
      if (searchInput) searchInput.value = "";
      chips.forEach(function (chip) {
        chip.classList.toggle("on", chip.getAttribute("data-tag") === "");
      });
      statusChips.forEach(function (chip) {
        chip.classList.toggle("on", chip.getAttribute("data-status") === "");
      });
      apply();
    }

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.q = searchInput.value.trim();
        apply();
      });
    }

    headers.forEach(function (th) {
      function activate() {
        var field = th.getAttribute("data-sort");
        if (state.sort === field) {
          state.dir = state.dir === "asc" ? "desc" : "asc";
        } else {
          state.sort = field;
          state.dir = ASCENDING[field] ? "asc" : "desc";
        }
        markHeaders();
        apply();
      }
      th.addEventListener("click", activate);
      th.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      });
    });

    rows.forEach(function (row) {
      row.addEventListener("click", function (e) {
        if (e.target.closest("a")) return;
        var link = row.querySelector(".row-name");
        if (link) window.location.href = link.href;
      });
    });

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        state.tag = chip.getAttribute("data-tag");
        chips.forEach(function (c) { c.classList.toggle("on", c === chip); });
        apply();
      });
    });

    statusChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        state.status = chip.getAttribute("data-status");
        statusChips.forEach(function (c) { c.classList.toggle("on", c === chip); });
        apply();
      });
    });

    if (clearBtn) clearBtn.addEventListener("click", reset);
    if (emptyClear) emptyClear.addEventListener("click", reset);

    var shell = document.querySelector(".table-shell");
    var scroller = shell ? shell.firstElementChild : null;

    function syncFade() {
      if (!scroller) return;
      shell.classList.toggle(
        "at-end",
        scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2
      );
    }

    if (scroller) scroller.addEventListener("scroll", syncFade, { passive: true });
    window.addEventListener("resize", syncFade);

    markHeaders();
    apply();
    syncFade();
  }

  /* ---------- chrome ---------- */

  document.getElementById("lang-toggle").addEventListener("click", function () {
    lang = lang === "zh" ? "en" : "zh";
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
    applyLang();
  });

  var header = document.querySelector(".site-header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  applyLang();
})();
