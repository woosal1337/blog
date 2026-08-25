# The cure for AI slop is a 1986 aircraft manual - the kit

Everything the episode promises "in the description": the agent skill, the
linter, and the full first-party test data. Nothing here needs more than
Python 3.

The kit has two parts. `ste-writing/` is the thing you install. `experiment/`
is the evidence that it works.

```
ste-writing/     the agent skill - drop the folder into your skills directory
  SKILL.md                  the skill itself, version 2.0, two layers
  ste-lint.py               the heuristic anti-slop linter
  ste-recurring-errors.md   the spec's list of the 39 most frequent errors
  hooks/ste-inject.sh       puts the rule card in context on every turn
  hooks/ste-gate.py         lints the reply and scores it, three bands

experiment/      the claim test - 6 writing tasks x 4 conditions, 2 models
  results-cross-model.md    the headline numbers, and what did not hold
  results-openai.md         per-category detail for the gpt-5.5 run
  before-after-samples.md   the real outputs quoted in the episode
  run-openai.py             the script that produced the OpenAI side
```

## The skill

`ste-writing/` is a complete skill directory. Version 2.0 has two layers.

**Layer 1 is the words.** `SKILL.md` holds the distilled ASD-STE100 rules in
two modes: strict for procedures, error messages and safety text, and flavored
for general prose. `ste-recurring-errors.md` is the spec's own list of the 39
words writers reach for on autopilot, with the approved replacement for each.

**Layer 2 is the shape.** STE fixes a sentence. It does nothing about the
answer that sat in paragraph four. Layer 2 sets the order of a reply to a
person: the next action first, numbered steps, real time estimates, no preamble
and no closer. It came from a separate skill for an ADHD reader, and 2.0 merged
it in. Layer 1 applies to every text a human reads. Layer 2 applies to a reply,
a task, or a PR description - not to a reference doc, and not to writing that
needs a voice.

Claude Code, or any CLI that reads a skill directory:

```
ln -s "$PWD/ste-writing" ~/.claude/skills/ste-writing
```

Any other agent: paste `ste-writing/SKILL.md` into the system prompt or the
custom instructions. The skill works without the linter. The linter closes the
loop.

## The linter

```
python3 ste-writing/ste-lint.py your-draft.md            # flavored: general prose
python3 ste-writing/ste-lint.py --strict your-draft.md   # strict: adds the STE word set, counts em dashes
python3 ste-writing/ste-lint.py --shape your-draft.md    # add the Layer 2 counts
```

Score is violations per 100 words - lower is cleaner. Lint a draft, apply the
skill, then lint it again. The delta between the two scores is the signal.
Useful flags: `--json` for machine-readable output, `--fail-over N` to exit 1
when the score is over N (CI gates, pre-commit hooks).

The linter reports `score_version: 2`. Version 2 catches perfect tenses and
modal stacks, no longer counts adjectival participles ("the valve is closed")
as passive, and moves "provide" to the banned list. The headline numbers below
were measured with score v1 - this file's git history at the episode date. The
two versions score close but are not directly comparable.

Skill 2.0 added the Layer 2 counts under `shape`, with `shape_version: 1`. They
stay out of `total`, so `total_per100w` still means what it meant, and the
numbers below still compare.

## The hooks

The skill tells a model what to do. A hook makes it happen without you asking.
Two of them, for Claude Code, in `ste-writing/hooks/`:

```json
"UserPromptSubmit": [{"hooks": [
  {"type": "command", "command": "bash ~/.claude/skills/ste-writing/hooks/ste-inject.sh"}
]}],
"Stop": [{"hooks": [
  {"type": "command", "command": "python3 ~/.claude/skills/ste-writing/hooks/ste-gate.py"}
]}]
```

`ste-inject.sh` puts the rule card into context on every turn, so the style does
not depend on the model loading the skill first.

`ste-gate.py` lints the reply after the model sends it. Here is the part that
took a second version to get right. The reply is already on the reader's screen
when the hook runs, so a block does not retract it. The model sends a corrected
reply below the first one, and the reader gets the same answer two times. Gate
v1 blocked at the target, so a reply that scored 2.54 against a limit of 2.50
cost a full duplicate.

Gate v2 keeps three bands:

| Score | What happens |
|---|---|
| under 2.5 | nothing |
| 2.5 to 4.0 | a warning goes to a session file. The inject hook shows it on the next turn. No second reply. |
| over 4.0 | one block, one time for that turn. A lock file holds the turn number, so a retry cannot stack a third copy. |

The real fix is in the skill, not the hook: lint the draft before you send it,
and the gate never fires.

## The experiment

Six realistic engineer-writing tasks, four conditions each, on two model
families. Read `experiment/results-cross-model.md` first: it carries the
headline table, the caveats, and the one result that did not survive the second
model. `run-openai.py` needs `prompts.json` and the four condition prompts,
which were not published.

| Condition | Claude sonnet | gpt-5.5 |
|---|---|---|
| baseline | 4.36 | 3.54 |
| banned-words list | 4.21 (-3%) | 2.14 (-40%) |
| Orwell's 6 rules | 2.48 (-43%) | 1.69 (-52%) |
| STE skill | 1.12 (-74%) | 1.76 (-50%) |

Give the model a writing system and slop drops by half or more, on every model
tested. STE was best or tied-best. A banned-words list is the least reliable fix.

Not a certified STE checker. The judgment rules of ASD-STE100 need a human;
this covers the mechanical subset - which is where the slop lives. Unofficial
and not affiliated with ASD. ASD-STE100 is a registered EU trademark
(No. 017966390).

Spec: ASD-STE100 Issue 9, free at asd-ste100.org
