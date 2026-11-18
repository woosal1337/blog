#!/usr/bin/env python3
"""Exit-code wrapper for ste-pregate.py, opencode only.

Real bug, confirmed live 2026-09-11, in the opencode-claude-hooks bridge
(the package that reuses ste-pregate.py unchanged for PreToolUse — see
../../opencode/README.md): its tool.execute.before handler only blocks a
tool call on exit code 2. It parses hookSpecificOutput.permissionDecision
from stdout JSON into result.permissionDecision, then never reads that
field back out — only execResult.blocked, which is hardcoded to
`exitCode === 2` in its own executeCommandHook. ste-pregate.py, correct
per Claude Code's own documented hook contract, always exits 0 and
signals a deny purely through that JSON field. Against this bridge, that
JSON is silently ignored and the bad commit lands unchanged. Confirmed
by a real opencode run: a 38-word slop commit message, scored 31.58
against a ceiling of 4.0, committed with no denial.

ste-pregate.py itself is not changed for this — it is correct, shared
with Claude Code's native hook runner, and changing its exit code would
risk that side (an exit-2 block there reads stderr for the reason, not
the stdout JSON this hook actually writes to). This wrapper is the fix,
opencode-only: run the real hook, read its JSON, and if it denies,
re-signal that denial the way this specific bridge actually checks for
it — stderr plus exit code 2 — leaving ste-pregate.py itself untouched.

Usage: same stdin contract as ste-pregate.py. Wired from hooks.json
instead of ste-pregate.py directly, PreToolUse only. PostToolUse still
points straight at ste-refresh.py — advisory only, no deny path, nothing
this bridge's exit-code gap can break.
"""
import json
import os
import subprocess
import sys

REAL_GATE = os.path.join(os.path.dirname(os.path.realpath(__file__)), "ste-pregate.py")


def main():
    payload = sys.stdin.read()
    try:
        proc = subprocess.run([sys.executable, REAL_GATE], input=payload,
                              capture_output=True, text=True, timeout=20)
    except Exception:
        return 0  # fail open, same rule every hook here uses

    if proc.stdout.strip():
        try:
            out = json.loads(proc.stdout)
            reason = out.get("hookSpecificOutput", {}).get("permissionDecisionReason")
            decision = out.get("hookSpecificOutput", {}).get("permissionDecision")
        except Exception:
            reason, decision = None, None
        if decision == "deny" and reason:
            sys.stderr.write(reason)
            return 2

    return 0


if __name__ == "__main__":
    sys.exit(main())
