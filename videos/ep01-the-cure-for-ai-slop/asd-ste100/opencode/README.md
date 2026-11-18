# asd-ste100 on opencode

A port of the four Claude Code hooks to opencode. It works on opencode V2
(2.x) and on opencode V1 (1.18.29 and newer). Each claim below was tested
on a real opencode run, or it is marked as not confirmed.

## opencode V2

V2 has a new plugin API, and V1 plugins do not load in it. V2 also has
native tool hooks, so V2 needs no Claude Code hooks bridge. The plugin
handles all four hooks itself:

| Claude Code hook | V2 plugin hook | Script | State on V2 2.0.29 |
|---|---|---|---|
| UserPromptSubmit | session `prompt` (once a turn) + `context` (each model request) | `oc-inject.py` | confirmed live |
| PreToolUse | tool `execute.before`. A throw stops the call | `ste-pregate.py` | confirmed live, it BLOCKS |
| PostToolUse | tool `execute.after`. The note goes into the tool result | `ste-refresh.py` | confirmed live |
| Stop | event `session.execution.succeeded` | `oc-gate.py` | confirmed live, warns on the next turn |

Test evidence, 2026-10-14, opencode 2.0.29, a local Qwen model behind an
OpenAI-compatible proxy that logged each request:

- Each agent request had exactly one system message, with the rule card
  merged into it.
- A commit message at 22.22 violations per 100 words was stopped before
  the shell ran. The model got the gate reason. No commit landed.
- A write of a bad `notes.md` file added the `ste:` score note to the tool
  result that the model read next.
- A chatty reply scored 5.41. `oc-gate.py` wrote the warn file. The next
  turn in the same session showed the `<asd-ste100-feedback>` block, and
  the file was then cleared.

What changed from V1, and why:

- V2 loads a plugin DIRECTORY. A path to a single file gets the warning
  "configured plugin path must be a directory" and does not load. The
  installer now registers the directory. `index.js` is the entry.
- V2 has no `session.idle` event. The turn ends with
  `session.execution.succeeded`. The reply text comes from
  `session.text.ended`.
- `opencode run` stops the server about 0.2 seconds after the turn ends.
  That killed the gate script. The gate now runs as a detached process.
- The Stop gate still cannot force a same-turn rewrite. V2 events are
  notification-only, the same as V1.

Plugin options, in an object entry of the `plugins` array:

```json
{ "package": "/path/to/plugins/asd-ste100", "options": { "kit": "/path/to/asd-ste100", "toolHooks": false } }
```

`kit` is the kit root (default `<opencode config dir>/asd-ste100`).
`toolHooks: false` turns off the PreToolUse and PostToolUse ports, for a
setup that runs them in another plugin. Do not run them twice.

One system message, always. The card is appended to the last system part.
The plugin never adds a second system message. A llama.cpp Qwen chat
template fails on a second system message ("System message must be at the
beginning"). Cloud backends accept it.

## opencode V1

V1 uses the `server()` function of the same default export. The V1 notes
below are from the first port, 2026-09-11. One fix since then: V1 1.18.31
did not send the card to the model when the plugin replaced
`output.system` with a new array. The plugin now changes that array in
place. Confirmed live on 1.18.31, 2026-10-14.

## Setup (V1 and V2)

1. Add `opencode-claude-hooks` to the dependencies list in
   `~/.config/opencode/package.json`, then run `npm install` in that
   directory. This is a separate, already-published package — a
   Claude-Code-hooks-format bridge for opencode, not part of this repo.
   Confirm it is loaded: it must also appear in the `"plugin"` array inside
   `~/.config/opencode/opencode.json` (its resolved
   `node_modules/.../dist/index.js` path).
2. `python3 opencode/install-opencode.py` — wires everything below.
   On V2 the bridge is not used. Step 1 is for V1 only.
3. Restart opencode. Kill any already-running background `opencode` process
   first. This port's own testing found one still holding a stale config in
   memory from before an edit.

## V1 status, by hook (2026-09-11)

| Hook | State | Evidence |
|---|---|---|
| PostToolUse (`ste-refresh.py`) | confirmed firing, correct payload | real payload capture from a live run — see below |
| UserPromptSubmit-equivalent (`oc-inject.py`) | wired, not independently confirmed live | each piece tested correct in isolation. The end-to-end context-injection effect itself was not separately verified — the PreToolUse finding below took priority |
| Stop-equivalent (`oc-gate.py`) | wired, not independently confirmed live | same as above, plus the known structural gap (see "The one real gap" below) |
| PreToolUse (`ste-pregate.py`) | **confirmed NOT blocking, live** | see "A second real gap" below — this is the headline finding of this port |

## What ports 1:1, confirmed

opencode has no native `UserPromptSubmit` or `Stop` hook. It does have
`PreToolUse` and `PostToolUse`, forwarded by the `opencode-claude-hooks`
bridge plugin, in the same JSON shape Claude Code uses. **PostToolUse is
confirmed working**: a debug-instrumented copy of `ste-refresh.py`, wired
live, captured this real payload from an actual opencode tool call —

```json
{"session_id": "ses_f6dd2b94bffexG2j6Cvb8xbTDh", "tool_name": "bash",
 "tool_input": {}, "tool_output": "hello-from-opencode-test\n", ...}
```

— which is how the one real bug here was found and fixed, in both files
(shared with Claude Code, not opencode-only): **opencode's own tool ids are
lowercase** (`bash`, not `Bash`). Both `ste-pregate.py` and `ste-refresh.py`
now compare case-insensitively — safe for both clients, since
`"Bash".lower() == "bash".lower()` either way.

## A second real gap, found the hard way

`ste-pregate.py` itself is correct — confirmed by feeding it the exact
payload a live run produces and getting a correct deny JSON back, every
time. The problem is one layer up.

Claude Code's PreToolUse hooks communicate a deny through
`hookSpecificOutput.permissionDecision: "deny"` on stdout, exit code 0. That
is what `ste-pregate.py` sends. The `opencode-claude-hooks` bridge parses
that field into a `permissionDecision` variable — then never reads it back
out. Its actual block signal is hardcoded elsewhere: `const blocked =
exitCode === 2`. A deny sent the modern, documented way is silently
dropped.

`hooks/oc-pretooluse-wrap.py` works around exactly that: it runs
`ste-pregate.py` unchanged, reads its JSON, and on a deny, re-signals it the
way this specific bridge actually checks for — stderr text plus exit code
2. Confirmed correct in isolation: given the identical payload a live run
produces, the wrapper exits 2 with the deny reason on stderr.

Wired end to end, it still did not block. Four separate live opencode runs,
each with a commit message scored well over the ceiling (24–32 violations
per 100 words against a limit of 4.0), all landed the commit unchanged. One
run was mid-test-cycle contaminated by a stale, already-running `opencode`
process holding old config — killed, retested, same result. One test was
invalidated by a path-resolution mistake in the debug copy itself — fixed,
retested with full tracing, and the trace shows the wrapper correctly
computing `permissionDecision: "deny"` from `ste-pregate.py`'s real
output — and the commit still lands.

Conclusion, not a guess: `tool.execute.before`'s block path in
`opencode-claude-hooks`, as installed here (`opencode-claude-hooks@^0.1.0`
against `@opencode-ai/plugin@1.14.48`), does not actually prevent tool
execution, regardless of which signal shape triggers it. Its own code sets
`output.args = { _blocked: true, _reason: ... }` on a block — a value
mutation, not a cancellation — and nothing in the opencode tool-execution
path appears to treat that as "do not run this." This reads as a real bug
in the bridge package itself, worth filing upstream. `oc-pretooluse-wrap.py`
stays wired — it computes the right answer, costs nothing when idle, and
picks up correct behavior for free if the bridge (or opencode's own
`tool.execute.before` contract) ever gains real cancellation.

## The other real gap, structural rather than a bug

Claude Code's Stop hook can return `{"decision": "block"}`, which makes the
model send a second, corrected reply before the reader sees anything else.
opencode's `event` hook — the closest signal to "the assistant turn just
finished" (`event.type === "session.idle"`) — returns `void`. Nothing in
the exposed plugin API lets a hook reopen a turn that already finished.
There is no way to force a same-turn rewrite here, independent of the
bridge bug above.

`oc-gate.py` degrades gracefully instead of pretending to block: every
band — warn and over-ceiling alike — writes the same warn-state file that
`oc-inject.py` reads and clears on the next turn. A reply that would have
been hard-blocked in Claude Code instead surfaces a stronger-worded warning
one turn later, not the same turn.

## Files

- `plugins/asd-ste100/package.json`, `index.js` — the opencode plugin
  itself, one default export for V2 (`id`, `setup`) and V1 (`server`).
  `plugin.js` re-exports it, so an old V1 entry that names `plugin.js`
  still loads on V1. Reads `~/.config/opencode/asd-ste100/hooks/{oc-inject,oc-gate}.py`
  via `execFileSync`, same fail-open rule as every original hook: a broken
  linter or a missing script skips the feature, never blocks a turn.
- `install-opencode.py` — idempotent installer, mirrors `../install.py`'s
  conventions (symlink, JSON-merge, `--dry-run`, `--uninstall`, one backup
  before the first write). Wires `PreToolUse` to `oc-pretooluse-wrap.py`,
  not `ste-pregate.py` directly — see the gap above for why.
- `../hooks/oc-inject.py`, `../hooks/oc-gate.py`,
  `../hooks/oc-pretooluse-wrap.py` — the three new opencode-only scripts.
  Live in the shared `hooks/` directory, not here, since nothing about them
  needs to be opencode-specific by location — same card text, same
  warn-file format, same linter as the Claude Code side.
