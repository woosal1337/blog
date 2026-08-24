# The cure for AI slop is a 1986 aircraft manual - the kit

Everything the episode promises "in the description": the agent skill, the
linter, and the full first-party test data. Nothing here needs more than
Python 3.

The kit has two parts. `ste-writing/` is the thing you install. `experiment/`
is the evidence that it works.

```
ste-writing/     the agent skill - drop the folder into your skills directory
  SKILL.md                  the skill itself, two modes
  ste-lint.py               the heuristic anti-slop linter
  ste-recurring-errors.md   the spec's list of the 39 most frequent errors

experiment/      the claim test - 6 writing tasks x 4 conditions, 2 models
  results-cross-model.md    the headline numbers, and what did not hold
  results-openai.md         per-category detail for the gpt-5.5 run
  before-after-samples.md   the real outputs quoted in the episode
  run-openai.py             the script that produced the OpenAI side
```

## The skill

`ste-writing/` is a complete skill directory. `SKILL.md` holds the distilled
ASD-STE100 rules in two modes: strict for procedures, error messages and safety
text, and flavored for general prose. `ste-recurring-errors.md` is the spec's
own list of the 39 words writers reach for on autopilot, with the approved
replacement for each.

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
