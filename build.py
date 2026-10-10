#!/usr/bin/env python3
"""Generate the static pages of the Geno1024-AIGC site.

    python3 build.py                 # refresh tokens, then write every page
    python3 build.py --no-collect    # reuse src/tokens.json as committed

Reads src/data.json (site copy, tags, languages, projects) and src/tokens.json
(per-project AI token usage), and writes index.html, about.html and p/<id>.html.
Bilingual copy lives in the DOM: Chinese is the element text, English rides in a
data-en attribute that assets/app.js swaps on toggle.
"""

import argparse
import html
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
PAGES = ROOT / "p"

TOKEN_LABELS = [
    ("in", {"zh": "输入", "en": "Input"}),
    ("out", {"zh": "输出", "en": "Output"}),
    ("rea", {"zh": "推理", "en": "Reasoning"}),
    ("crd", {"zh": "缓存读", "en": "Cache read"}),
    ("cwr", {"zh": "缓存写", "en": "Cache write"}),
    ("fresh", {"zh": "非缓存", "en": "Fresh"}),
    ("total", {"zh": "合计", "en": "Total"}),
]

TOKENS_TITLE = {"zh": "AI Token 用量", "en": "AI token usage"}

FAVICON = (
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>"
    "<rect width='64' height='64' rx='14' fill='%230b0d10'/>"
    "<text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' "
    "font-family='monospace' font-size='34' font-weight='700' fill='%235eead4'>G</text></svg>"
)

DESCRIPTION = (
    "Projects written entirely by AI — 0% human code. "
    "Android apps, Go services, Qt and C++ desktop tools by Geno1024."
)
OG_DESCRIPTION = (
    "Written entirely by AI, 0% human code: Android, Go, Qt/C++ desktop tools and codecs."
)


# ---------- text helpers ----------


def esc(value):
    return html.escape(str(value), quote=True)


def T(node, lang="zh"):
    if isinstance(node, dict):
        return node.get(lang) or node.get("zh") or ""
    return node


def bi(tag, node, cls=None, **attrs):
    """Render one bilingual element: Chinese text, English in data-en."""
    parts = [tag]
    if cls:
        parts.append(f'class="{esc(cls)}"')
    for key, value in attrs.items():
        if value is not None:
            parts.append(f'{key.replace("_", "-")}="{esc(value)}"')
    parts.append(f'data-en="{esc(T(node, "en"))}"')
    return f'<{" ".join(parts)}>{esc(T(node, "zh"))}</{tag}>'


def num(n):
    return f"{n:,}"


def fmt_tokens(n):
    if n >= 1_000_000_000:
        return f"{n / 1_000_000_000:.2f}B"
    if n >= 1_000_000:
        return f"{n / 1_000_000:.1f}M"
    if n >= 1_000:
        return f"{n / 1_000:.1f}K"
    return str(n)


def plural(n, word):
    return word if n == 1 else word + "s"


def dates(iso):
    y, m, d = iso[:4], iso[5:7], iso[8:10]
    return {"zh": f"{y}-{m}-{d}", "en": f"{y}/{m}/{d}"}


def plain_val(text, cls=""):
    extra = f" {cls}" if cls else ""
    return f'<div class="metric-val{extra}">{esc(text)}</div>'


def metric_cell(val_html, key):
    return f'<div class="metric">{val_html}{bi("div", key, cls="metric-key")}</div>'


def block(label, inner):
    return (
        '<div class="detail-block">'
        + bi("h2", label, cls="section-label")
        + inner
        + "</div>"
    )


# ---------- page shell ----------


def shell(ctx, *, pre, nav_active, title_zh, title_en, description, og_description, main):
    ui = ctx["site"]["ui"]
    t = ctx["totals"]

    def nav(key, href):
        active = " class=\"active\"" if key == nav_active else ""
        return f'<a href="{pre}{href}" data-nav="{key}"{active} data-en="{esc(T(ui[key], "en"))}">{esc(T(ui[key], "zh"))}</a>'

    stats = (
        f"{t['projects']} · {num(t['loc'])} LOC · {num(t['commits'])} commits · "
        f"{fmt_tokens(t['tokens'])} tok"
    )

    return f"""<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title_zh)}</title>
<meta name="description" content="{esc(description)}">
<meta property="og:title" content="{esc(title_zh)}">
<meta property="og:description" content="{esc(og_description)}">
<meta property="og:type" content="website">
<link rel="icon" href="{FAVICON}">
<link rel="stylesheet" href="{pre}assets/style.css">
</head>
<body data-title-en="{esc(title_en)}">
<div class="bg-grid" aria-hidden="true"></div>
<div class="bg-glow" aria-hidden="true"></div>

<header class="site-header">
  <a class="brand" href="{pre}index.html">
    <span class="brand-mark">G</span>
    <span class="brand-text">Geno1024<span class="brand-dim">-AIGC</span></span>
  </a>
  <nav class="site-nav">
    {nav("projects", "index.html")}
    {nav("about", "about.html")}
    <button id="lang-toggle" type="button" aria-label="Switch language">
      <span class="lang-opt" data-lang-opt="zh">中</span>
      <span class="lang-sep"></span>
      <span class="lang-opt" data-lang-opt="en">EN</span>
    </button>
  </nav>
</header>

{main}

<footer class="site-footer">
  <div class="footer-inner">
    {bi("p", ui["footer"], cls="footer-note")}
    <div class="footer-links">
      <a href="{ctx["site"]["github"]}" target="_blank" rel="noopener">GitHub org</a>
      <span class="footer-dot"></span>
      <span class="footer-stats">{esc(stats)}</span>
    </div>
  </div>
</footer>

<script src="{pre}assets/app.js"></script>
</body>
</html>
"""


# ---------- detail page ----------


def detail_main(ctx, p, idx):
    ui = ctx["site"]["ui"]
    tags = ctx["tags"]
    projects = ctx["projects"]
    toks = ctx["tokens"].get(p["id"])

    out = ['<main>', '<div class="detail fade-in">']

    out.append(
        f'<a class="back-link" href="../index.html"><span aria-hidden="true">&larr;</span>'
        f'{bi("span", ui["back"])}</a>'
    )
    out.append(f"<h1>{esc(p['name'])}</h1>")
    out.append(bi("p", p["tagline"], cls="detail-tagline"))
    out.append(
        f'<a class="detail-repo" href="{esc(p["url"])}" target="_blank" rel="noopener">'
        f'{esc(p["repo"])} &nbsp;&nearr;</a>'
    )

    out.append(block(ui["summary"], bi("p", p["summary"], cls="detail-summary")))

    points = "".join(bi("li", h) for h in p["highlights"])
    out.append(block(ui["highlights"], f'<ul class="points">{points}</ul>'))

    stack = "".join(f'<span class="stack-chip">{esc(s)}</span>' for s in p["stack"])
    out.append(block(ui["stack"], f'<div class="chip-row">{stack}</div>'))

    cells = [
        metric_cell(plain_val(num(p["loc"])), ui["lines"]),
        metric_cell(plain_val(num(p["commits"])), ui["commits"]),
        metric_cell(
            plain_val(num(p["tests"]))
            if p["tests"] > 0
            else bi("div", ui["no"], cls="metric-val off"),
            ui["tests"],
        ),
        metric_cell(
            bi("div", ui["yes"], cls="metric-val on")
            if p["ci"]
            else bi("div", ui["no"], cls="metric-val off"),
            ui["ci"],
        ),
        metric_cell(bi("div", dates(p["updated"]), cls="metric-val"), ui["updated"]),
    ]
    out.append(block(ui["metrics"], f'<div class="metrics">{"".join(cells)}</div>'))

    if toks:
        tok_cells = "".join(
            f'<div class="metric">{plain_val(num(toks[key]), "tok")}'
            f'{bi("div", label, cls="metric-key")}</div>'
            for key, label in TOKEN_LABELS
        )
        out.append(block(TOKENS_TITLE, f'<div class="metrics tokens">{tok_cells}</div>'))

    chips = "".join(bi("span", tags[t], cls="stack-chip") for t in p["tags"])
    out.append(block(ui["tags"], f'<div class="chip-row">{chips}</div>'))

    nav = ['<div class="detail-nav">']
    if idx > 0:
        prev = projects[idx - 1]
        nav.append(
            f'<a href="{prev["id"]}.html">{bi("small", ui["prev"])}{esc(prev["name"])}</a>'
        )
    else:
        nav.append('<span class="spacer"></span>')
    if idx < len(projects) - 1:
        nxt = projects[idx + 1]
        nav.append(
            f'<a class="next" href="{nxt["id"]}.html">{bi("small", ui["next"])}'
            f'{esc(nxt["name"])}</a>'
        )
    nav.append("</div>")
    out.append("".join(nav))

    out += ["</div>", "</main>"]
    return "\n".join(out)


def write_detail(ctx):
    PAGES.mkdir(exist_ok=True)
    expected = {f"{p['id']}.html" for p in ctx["projects"]}

    for p in ctx["projects"]:
        idx = ctx["projects"].index(p)
        page = shell(
            ctx,
            pre="../",
            nav_active="projects",
            title_zh=f"{p['name']} · {ctx['site']['org']}",
            title_en=f"{p['name']} · {ctx['site']['org']}",
            description=T(p["tagline"], "en"),
            og_description=T(p["tagline"], "en"),
            main=detail_main(ctx, p, idx),
        )
        (PAGES / f"{p['id']}.html").write_text(page, encoding="utf-8")

    for stale in sorted(PAGES.glob("*.html")):
        if stale.name not in expected:
            stale.unlink()
            print(f"removed {stale.relative_to(ROOT)}")

    print(f"wrote {len(ctx['projects'])} detail pages -> p/")


# ---------- about page ----------


def about_main(ctx):
    about = ctx["site"]["about"]
    out = ["<main>", '<div class="about fade-in">']

    out.append(bi("h1", about["title"]))
    out.append(bi("p", about["lead"], cls="about-lead"))

    cards = []
    for pr in about["principles"]:
        cards.append(
            '<div class="principle">'
            + bi("h3", {"zh": pr["zh"], "en": pr["en"]})
            + bi("p", pr["body"])
            + "</div>"
        )
    out.append('<div class="principle-grid">' + "".join(cards) + "</div>")

    notes = "".join(bi("li", n) for n in about["notes"])
    out.append(block(about["notesTitle"], f'<ul class="notes">{notes}</ul>'))

    out += ["</div>", "</main>"]
    return "\n".join(out)


def write_about(ctx):
    site = ctx["site"]
    page = shell(
        ctx,
        pre="",
        nav_active="about",
        title_zh=f"{T(site['about']['title'], 'zh')} · {site['org']}",
        title_en=f"{T(site['about']['title'], 'en')} · {site['org']}",
        description=T(site["about"]["lead"], "en"),
        og_description=T(site["about"]["lead"], "en"),
        main=about_main(ctx),
    )
    (ROOT / "about.html").write_text(page, encoding="utf-8")
    print("wrote about.html")


# ---------- list page ----------


def index_main(ctx):
    site = ctx["site"]
    ui = site["ui"]
    tags = ctx["tags"]
    projects = ctx["projects"]
    t = ctx["totals"]

    counts = {}
    for p in projects:
        for tag in p["tags"]:
            counts[tag] = counts.get(tag, 0) + 1

    stats = [
        (str(t["projects"]), site["stats"]["projects"]),
        (num(t["loc"]), site["stats"]["loc"]),
        (num(t["commits"]), site["stats"]["commits"]),
        (num(t["tests"]), site["stats"]["tests"]),
        (f"{t['ci']} / {t['projects']}", site["stats"]["ci"]),
    ]
    strip = "".join(
        f'<div class="stat"><div class="stat-num">{esc(value)}</div>'
        f'{bi("div", label, cls="stat-label")}</div>'
        for value, label in stats
    )

    chips = [f'<button class="chip on" type="button" data-tag="">'
             f'{bi("span", ui["all"])}<span class="chip-n">{t["projects"]}</span></button>']
    for tag, label in tags.items():
        if not counts.get(tag):
            continue
        chips.append(
            f'<button class="chip" type="button" data-tag="{esc(tag)}">'
            f'{bi("span", label)}<span class="chip-n">{counts[tag]}</span></button>'
        )

    options = "".join(
        f'<option value="{value}" data-en="{esc(T(label, "en"))}"'
        f'{" selected" if value == "updated" else ""}>{esc(T(label, "zh"))}</option>'
        for value, label in [
            ("updated", ui["sortUpdated"]),
            ("loc", ui["sortLoc"]),
            ("commits", ui["sortCommits"]),
            ("name", ui["sortName"]),
        ]
    )

    cards = "".join(index_card(ctx, p) for p in projects)

    return f"""<main>
<div class="fade-in">
<section class="hero">
  {bi("div", site["hero"]["kicker"], cls="hero-kicker")}
  {bi("h1", site["hero"]["title"])}
  {bi("p", site["hero"]["subtitle"], cls="hero-sub")}
  <div class="stat-strip">{strip}</div>
</section>

<div class="filters">
  <div class="search-box">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>
    <input type="search" id="search-input" placeholder="{esc(T(ui["search"], "zh"))}" data-en-ph="{esc(T(ui["search"], "en"))}" aria-label="搜索 / Search">
  </div>
  {"".join(chips)}
  <div class="filters-right">
    <div class="select-wrap">
      <select id="sort-select" aria-label="排序 / Sort">{options}</select>
    </div>
    <button class="link-btn" id="clear-btn" type="button" hidden>{bi("span", ui["clear"])}</button>
  </div>
</div>

<p class="result-line" id="result-line" data-tpl-zh="{esc(T(ui["showing"], "zh"))}" data-tpl-en="{esc(T(ui["showing"], "en"))}">{esc(T(ui["showing"], "zh").replace("{n}", str(t["projects"])))}</p>

<div class="grid" id="grid">{cards}</div>

<div class="empty" id="empty" hidden>
  <p data-en="{esc(T(ui["empty"], "en"))}">{esc(T(ui["empty"], "zh"))}</p>
  <button class="chip on" type="button" id="empty-clear">{bi("span", ui["clear"])}</button>
</div>
</div>
</main>"""


def index_card(ctx, p):
    tags = ctx["tags"]
    points = "".join(bi("li", h) for h in p["highlights"][:3])

    foot = [
        f"<span>{num(p['loc'])} LOC</span>",
        f"<span>{p['commits']} {plural(p['commits'], 'commit')}</span>",
    ]
    if p["tests"] > 0:
        foot.append(f"<span>{p['tests']} {plural(p['tests'], 'test')}</span>")
    foot.append(bi("span", dates(p["updated"])))
    foot.append('<span class="spacer go">&rarr;</span>')

    return (
        f'<a class="card" href="p/{p["id"]}.html"'
        f' data-tags="{esc(",".join(p["tags"]))}"'
        f' data-name="{esc(p["name"])}"'
        f' data-loc="{p["loc"]}" data-commits="{p["commits"]}"'
        f' data-updated="{esc(p["updated"])}">'
        f'<div class="card-head"><span class="card-name">{esc(p["name"])}</span>'
        f'<span class="lang-tag">{esc(ctx["langs"][p["lang"]])}</span></div>'
        f'{bi("p", p["tagline"], cls="card-title")}'
        f'<ul class="card-points">{points}</ul>'
        f'<div class="card-foot">{"".join(foot)}</div>'
        f"</a>"
    )


def write_index(ctx):
    site = ctx["site"]
    page = shell(
        ctx,
        pre="",
        nav_active="projects",
        title_zh=site["org"],
        title_en=site["org"],
        description=DESCRIPTION,
        og_description=OG_DESCRIPTION,
        main=index_main(ctx),
    )
    (ROOT / "index.html").write_text(page, encoding="utf-8")
    print("wrote index.html")


# ---------- context ----------


def load_context(collect=True):
    data = json.loads((SRC / "data.json").read_text(encoding="utf-8"))

    if collect:
        sys.path.insert(0, str(ROOT / "scripts"))
        import collect_tokens  # noqa: PLC0415 - only needed when refreshing

        token_payload = collect_tokens.write()
    else:
        token_payload = json.loads((SRC / "tokens.json").read_text(encoding="utf-8"))

    projects = data["PROJECTS"]
    token_projects = token_payload["projects"]

    totals = {
        "projects": len(projects),
        "loc": sum(p["loc"] for p in projects),
        "commits": sum(p["commits"] for p in projects),
        "tests": sum(p["tests"] for p in projects),
        "ci": sum(1 for p in projects if p["ci"]),
        "tokens": 0,
    }

    missing = []
    for p in projects:
        entry = token_projects.get(p["id"])
        if entry is None:
            missing.append(p["id"])
        else:
            totals["tokens"] += entry["total"]
    for name in missing:
        print(f"warning: no token data for {name}", file=sys.stderr)

    return {
        "site": data["SITE"],
        "tags": data["TAGS"],
        "langs": data["LANGS"],
        "projects": projects,
        "tokens": token_projects,
        "totals": totals,
    }


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument(
        "--no-collect",
        action="store_true",
        help="reuse src/tokens.json instead of querying the OpenCode database",
    )
    args = ap.parse_args(argv)

    ctx = load_context(collect=not args.no_collect)
    write_index(ctx)
    write_detail(ctx)
    write_about(ctx)

    t = ctx["totals"]
    print(
        f"totals: {t['projects']} projects · {num(t['loc'])} LOC · "
        f"{num(t['commits'])} commits · {num(t['tests'])} tests · "
        f"{t['ci']}/{t['projects']} CI · {fmt_tokens(t['tokens'])} tok"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
