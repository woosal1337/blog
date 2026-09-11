#!/usr/bin/env python3
"""Stop hook equivalent for opencode. Called from plugin.js on the generic
event hook, filtered to event.type == "session.idle" — the closest opencode
signal to "the assistant turn just finished."

Known gap, real and permanent given opencode's current plugin API: Claude
Code's Stop hook can return {"decision": "block"}, which makes the model send
a second, corrected reply before the reader sees anything else. opencode's
event hook is notification-only — it returns void, nothing in the exposed
Hooks type lets a plugin re-open a finished turn. So there is no hard block
here. Every band below writes the same warn-state file, read and cleared by
oc-inject.py on the next turn. A reply that would have been hard-blocked in
Claude Code instead gets a stronger-worded warning shown before the next
reply — real feedback, one turn later, not a same-turn correction.

Usage: python3 oc-gate.py --session <id>   (reply text on stdin)
Output: JSON on stdout, {"status": "pass"|"warn"|"over_ceiling"}

Canonical copy: ~/.config/opencode/asd-ste100/hooks/oc-gate.py. Not part of
the upstream chele-bi kit — written for the opencode port, 2026-09-11.
"""
import argparse
import hashlib
import json
import os
import re
import subprocess
import sys

STATE = os.path.expanduser("~/.config/opencode/ste-gate")
TARGET = 2.5
SHAPE_TARGET = 1
BLOCK_AT = 4.0          # no hard block available — this band gets a
SHAPE_BLOCK_AT = 4      # stronger-worded warning instead, same file
MIN_WORDS = 60


def find_lint():
    root = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
    path = os.path.join(root, "scripts", "ste-lint.py")
    return path if os.path.exists(path) else None


LINT = find_lint()


def key_for(session):
    return hashlib.sha1((session or "none").encode()).hexdigest()[:16]


def state_path(session, suffix):
    os.makedirs(STATE, exist_ok=True)
    return os.path.join(STATE, "{}.{}".format(key_for(session), suffix))


def write_warn(session, report, over_ceiling):
    hits = {k: v for k, v in (report.get("violations") or {}).items() if v}
    shape = {k: v for k, v in (report.get("shape") or {}).items() if v}
    top = sorted(hits.items(), key=lambda kv: -kv[1])[:3]
    payload = {
        "score": report.get("total_per100w", 0),
        "limit": TARGET,
        "top": ["{} {}".format(k, v) for k, v in top],
        "shape_total": report.get("shape_total", 0),
        "shape_top": list(shape)[:3],
        "long_samples": (report.get("sample_long_sentence") or [])[:2],
        "longest_sentence_words": report.get("longest_sentence_words", 0),
        "over_ceiling": over_ceiling,
    }
    with open(state_path(session, "warn.json"), "w", encoding="utf-8") as fh:
        json.dump(payload, fh)


def clear_warn(session):
    try:
        os.remove(state_path(session, "warn.json"))
    except OSError:
        pass


def strip_noise(text):
    text = re.sub(r"^\s*\|.*\|\s*$", " ", text, flags=re.M)
    text = re.sub(r"https?://\S+", " ", text)
    return text


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--session", default="")
    args = parser.parse_args()

    if not LINT:
        return 0

    text = sys.stdin.read()
    prose = strip_noise(text)
    if len(prose.split()) < MIN_WORDS:
        clear_warn(args.session)
        print(json.dumps({"status": "pass"}))
        return 0

    try:
        proc = subprocess.run([sys.executable, LINT], input=prose,
                              capture_output=True, text=True, timeout=20)
        report = json.loads(proc.stdout)
    except Exception:
        return 0  # never block on a broken linter

    score = report.get("total_per100w", 0)
    shape_total = report.get("shape_total", 0)
    if score <= TARGET and shape_total <= SHAPE_TARGET:
        clear_warn(args.session)
        print(json.dumps({"status": "pass"}))
        return 0

    over_ceiling = score > BLOCK_AT or shape_total > SHAPE_BLOCK_AT
    write_warn(args.session, report, over_ceiling)
    print(json.dumps({"status": "over_ceiling" if over_ceiling else "warn",
                       "score": score}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
