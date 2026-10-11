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
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
    var searchInput = document.getElementById("search-input");
    var sortSelect = document.getElementById("sort-select");
    var clearBtn = document.getElementById("clear-btn");
    var emptyEl = document.getElementById("empty");
    var emptyClear = document.getElementById("empty-clear");
    var chips = Array.prototype.slice.call(document.querySelectorAll(".filters .chip[data-tag]"));
    var state = { q: "", tag: "", sort: "updated" };

    shown = cards.length;

    function key(card, field) {
      return field === "loc" || field === "commits"
        ? Number(card.getAttribute("data-" + field))
        : card.getAttribute("data-" + field);
    }

    function apply() {
      var q = state.q.toLowerCase();
      var ordered = cards.slice().sort(function (a, b) {
        if (state.sort === "name") return key(a, "name").localeCompare(key(b, "name"));
        if (state.sort === "updated") return key(b, "updated").localeCompare(key(a, "updated"));
        return key(b, state.sort) - key(a, state.sort);
      });

      shown = 0;
      ordered.forEach(function (card) {
        var tags = card.getAttribute("data-tags").split(",");
        var visible =
          (!state.tag || tags.indexOf(state.tag) !== -1) &&
          (!q ||
            (card.getAttribute("data-search") || card.textContent)
              .toLowerCase()
              .indexOf(q) !== -1);
        card.hidden = !visible;
        if (visible) shown++;
        grid.appendChild(card);
      });

      if (emptyEl) emptyEl.hidden = shown !== 0;
      if (clearBtn) clearBtn.hidden = !state.q && !state.tag;
      updateResultLine();
    }

    function reset() {
      state.q = "";
      state.tag = "";
      if (searchInput) searchInput.value = "";
      chips.forEach(function (chip) {
        chip.classList.toggle("on", chip.getAttribute("data-tag") === "");
      });
      apply();
    }

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.q = searchInput.value.trim();
        apply();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        state.sort = sortSelect.value;
        apply();
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        state.tag = chip.getAttribute("data-tag");
        chips.forEach(function (c) { c.classList.toggle("on", c === chip); });
        apply();
      });
    });

    if (clearBtn) clearBtn.addEventListener("click", reset);
    if (emptyClear) emptyClear.addEventListener("click", reset);

    apply();
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
