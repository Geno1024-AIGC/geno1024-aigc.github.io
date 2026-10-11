#!/usr/bin/env python3
"""Collect per-project AI token usage from the local OpenCode database.

Reads session-level token aggregates, keyed by the project directory name so
they line up with the project ids used on the site, and writes src/tokens.json.

    python3 scripts/collect_tokens.py [--db PATH] [--out PATH]
"""

import argparse
import datetime
import json
import os
import sqlite3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SIBLINGS = ROOT.parent
DEFAULT_DB = Path.home() / ".local" / "share" / "opencode" / "opencode.db"
DEFAULT_OUT = ROOT / "src" / "tokens.json"

FIELDS = ("in", "out", "rea", "crd", "cwr")

# session columns, in the order of FIELDS
COLUMNS = (
    "tokens_input",
    "tokens_output",
    "tokens_reasoning",
    "tokens_cache_read",
    "tokens_cache_write",
)

QUERY = """
SELECT p.worktree AS worktree,
       COUNT(s.id) AS sessions,
       {cols}
FROM project p
LEFT JOIN session s ON s.project_id = p.id
GROUP BY p.id
""".format(cols=",\n       ".join(f"COALESCE(SUM(s.{c}), 0) AS {c}" for c in COLUMNS))


def collect(db_path=DEFAULT_DB):
    """Return {project_id: {in, out, rea, crd, cwr, fresh, total, sessions}}."""
    db_path = Path(db_path).expanduser()
    if not db_path.is_file():
        raise SystemExit(f"opencode database not found: {db_path}")

    con = sqlite3.connect(f"file:{db_path}?mode=ro", uri=True)
    con.row_factory = sqlite3.Row
    try:
        rows = con.execute(QUERY).fetchall()
    finally:
        con.close()

    projects = {}
    for row in rows:
        worktree = row["worktree"] or ""
        path = Path(worktree)
        if not worktree or not path.name or not worktree.startswith(str(SIBLINGS)):
            continue

        values = {f: int(row[c] or 0) for f, c in zip(FIELDS, COLUMNS)}
        fresh = values["in"] + values["out"] + values["rea"]
        values["fresh"] = fresh
        values["total"] = fresh + values["crd"] + values["cwr"]
        values["sessions"] = int(row["sessions"] or 0)
        projects[path.name] = values

    return projects


def totals(projects):
    keys = FIELDS + ("fresh", "total", "sessions")
    out = {k: sum(p[k] for p in projects.values()) for k in keys}
    return out


def write(db_path=DEFAULT_DB, out_path=DEFAULT_OUT, project_ids=None):
    projects = collect(db_path)
    if project_ids is not None:
        missing = [i for i in project_ids if i not in projects]
        for i in missing:
            print(f"warning: no token data for {i}", file=sys.stderr)
        projects = {i: projects[i] for i in project_ids if i in projects}

    payload = {
        "generated": datetime.datetime.now().astimezone().isoformat(timespec="seconds"),
        "projects": dict(sorted(projects.items())),
        "totals": totals(projects),
    }

    out_path = Path(out_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=False) + "\n",
        encoding="utf-8",
    )
    return payload


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--db", default=os.environ.get("OPENCODE_DB", str(DEFAULT_DB)))
    ap.add_argument("--out", default=str(DEFAULT_OUT))
    args = ap.parse_args(argv)

    payload = write(db_path=args.db, out_path=args.out)
    t = payload["totals"]
    print(f"{len(payload['projects'])} projects -> {args.out}")
    print(
        f"  in={t['in']:,} out={t['out']:,} rea={t['rea']:,} "
        f"crd={t['crd']:,} cwr={t['cwr']:,} fresh={t['fresh']:,} total={t['total']:,}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
