---
title: Stop explaining yourself to AI - the kit
description: The templates, the worked example, the agent prompt, and the exercise from the episode.
ste_mode: flavored
---
# Stop explaining yourself to AI - the kit

Everything the episode promises "in the description": the record templates, a complete fictional project, the prompt that adapts the kit to your own setup, and the exercise that checks what a new conversation recovers. Plain Markdown. Nothing to install.

Open [the worked project](workspace/projects/lantern/README.md) to see the result. Then use [the setup guide](setup-guide.md) with your own project.

```
README.md                 this page
setup-guide.md            four routes: a native AI project, a local agent, Obsidian and your phone, a task board
agent-handoff.md          the prompt from the episode: an agent adapts the kit to your project
fresh-session-check.md    the exercise: correct a decision, close the session, ask again
sources.md                the product documentation behind every memory claim, with the check date

templates/                one shape per record, and unknown stays unknown
  README.md               which template fits which record
  meeting.md              source, limits, summary, full transcript, corrections, related records
  decision.md             an accepted or proposed choice, its passage, and the decision it replaces
  project.md              the entry note: what the project is, the current decision, the task board
  task-handoff.md         what an agent did, what it checked, and what remains
  report.md               a daily report: a dated snapshot that links to live task state

workspace/                the worked example: the fictional Lantern project, with relative links
  README.md               the index a new session reads first
  AGENTS.md               the working instructions, and CLAUDE.md imports them
  projects/lantern/       the entry note
  meetings/               two meetings in one week folder: blue accepted, then amber
  decisions/              blue (v1), then amber (v2) with the link back to blue
  tasks/                  the review task: owner Mira, deadline unknown, publication awaiting approval
  reports/                the daily snapshot
```

| Start here | Purpose |
|---|---|
| [Setup guide](setup-guide.md) | Choose a native project or a local file workflow. |
| [Agent handoff](agent-handoff.md) | Ask an agent to adapt the kit to your existing setup. |
| [Fresh-session exercise](fresh-session-check.md) | Check a correction without supplying the answer in the next question. |
| [Templates](templates/README.md) | Reusable meeting, decision, project, report, and task records. |
| [Sources](sources.md) | Product documentation and the original LLM Wiki reference. |

## How to use it

1. Copy the `workspace/` folder. Keep this guide and the exercise outside that copy.
2. Open an agent in the copy, or add the records to a project in your AI app. The [setup guide](setup-guide.md) has the steps for each route.
3. Ask the agent to resume Lantern and cite the current record.
4. Run [the exercise](fresh-session-check.md). Change the decision, close the session, open a new one, and ask again.
5. To adapt the kit to your own project, paste [the handoff prompt](agent-handoff.md) into your agent.

Obsidian is optional. You can read the files in a text editor or give a permitted copy to an agent. All Lantern people, meetings, decisions, and tasks are fictional.

The example uses a local task record. If you use a task board, move live task state there and keep a link in the project note. Avoid editing two current task records in parallel.

## What the kit does not do

It does not connect a service, grant a permission, or configure a sandbox. It does not include private notes, credentials, production scripts, or a recording. It makes no claim about token or time savings: the episode did not measure them.

The writing rules the reports follow are the ASD-STE100 skill from [the previous episode](https://www.chele.bi/videos/the-cure-for-ai-slop).
