#!/usr/bin/env python3
"""UserPromptSubmit equivalent for opencode. Called from plugin.js on
experimental.chat.system.transform, once per turn, before the LLM call.

opencode has no UserPromptSubmit hook name — that event only exists in the
Claude Code side of the opencode-claude-hooks bridge, which does not
forward it. This script does the same job as ste-inject.py, adapted for a
direct CLI call from JS instead of a stdin JSON payload:

1. Return the rule card, so the discipline does not depend on the model
   remembering to load the skill.
2. Return the score of the last reply, when oc-gate.py wrote a warning
   instead of a hard stop. Read-once: the file is deleted after reading.
3. Reset the turn's tool-call counter, which ste-refresh.py increments
   (ste-refresh.py itself is unchanged, reused as-is via the bridge).

Usage: python3 oc-inject.py --session <id>
Output: JSON on stdout, {"system": "<card>[\\n\\n<feedback>]"}

Canonical copy: ~/.config/opencode/asd-ste100/hooks/oc-inject.py. Not part of
the upstream chele-bi kit — written for the opencode port, 2026-09-11.
"""
import argparse
import hashlib
import json
import os
import sys

STATE = os.path.expanduser("~/.config/opencode/ste-gate")


def find_lint():
    root = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
    path = os.path.join(root, "scripts", "ste-lint.py")
    return path if os.path.exists(path) else None


CARD = """<asd-ste100-standing-rule>
ASD-STE100 governs every word the reader sees in this reply, and in any prose
you write to a file: chat text, commit messages, docs, code comments, PR text,
error messages, task trackers, wiki pages. It never applies to code,
identifiers, or command syntax. Default mode: STE-flavored. Use strict mode for
runbooks, procedures, error messages, and safety text.

LAYER 1 - the words
- Active voice. Simple tenses only. No present perfect, no stacked modals.
- One instruction per sentence. Max 20 words for an instruction, 25 otherwise.
- No contractions. No semicolons. Keep the articles.
- Short common words: use, start, make sure, do, give, show, before, about.
- No phrasal verbs: spin up, dive into, kick off, roll out, reach out.
- No marketing adjectives: seamless, robust, powerful, effortless, elegant.
- One name for one thing. Do not rotate synonyms for the same action.
- Use a verb for an action. Write "analyze the log", not "perform an analysis".
- Multi-word nouns: three words maximum.

LAYER 2 - the shape (a reply to a person, a task, a PR description)
- The reader has ADHD. Lead with the action, the command, or the path.
- Number a multi-step task. One bounded action for each step.
- No preamble, no recap, no closer. Start with the answer, stop when it is done.
- Cap an action list at five items. A reference table has no cap.
- Restate the state each turn: step N of M, what is done, what is next.
- Give an estimate in minutes, hours, or days. Never "a while".
- Show what now works, in concrete terms. Stay matter-of-fact about an error.
- Finish one issue. Offer the second one as a separate question.
- Cut a hedge that carries no fact. Keep a qualifier that bounds a claim.

Lint the draft BEFORE you send it:
  python3 {lint} --fail-over 2.5 FILE
Full rules, both modes, and the four layer conflicts: load the asd-ste100 skill.
</asd-ste100-standing-rule>""".format(lint=find_lint() or "scripts/ste-lint.py")


def key_for(session):
    return hashlib.sha1((session or "none").encode()).hexdigest()[:16]


def feedback(session):
    path = os.path.join(STATE, "{}.warn.json".format(key_for(session)))
    if not os.path.exists(path):
        return None
    try:
        with open(path, encoding="utf-8") as fh:
            warn = json.load(fh)
    except Exception:
        warn = None
    try:
        os.remove(path)
    except OSError:
        pass
    if not warn:
        return None
    lines = ["<asd-ste100-feedback>",
             "Your last reply scored {} violations per 100 words. The target "
             "is {}.".format(warn.get("score"), warn.get("limit"))]
    if warn.get("top"):
        lines.append("Worst Layer 1 categories: {}.".format(", ".join(warn["top"])))
    if warn.get("shape_total"):
        lines.append("Layer 2 shape hits: {} ({}).".format(
            warn["shape_total"], ", ".join(warn.get("shape_top") or [])))
    if warn.get("long_samples"):
        lines.append("Longest offenders: {}.".format(" | ".join(warn["long_samples"])))
    lines.append("Longest sentence: {} words.".format(
        warn.get("longest_sentence_words", 0)))
    lines.append("Lint the draft of this reply before you send it.")
    lines.append("</asd-ste100-feedback>")
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--session", default="")
    args = parser.parse_args()

    try:
        os.makedirs(STATE, exist_ok=True)
        with open(os.path.join(STATE, "{}.count".format(key_for(args.session))),
                  "w", encoding="utf-8") as fh:
            fh.write("0")
    except Exception:
        pass

    parts = [CARD]
    warn = feedback(args.session)
    if warn:
        parts.append(warn)
    print(json.dumps({"system": "\n\n".join(parts)}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
