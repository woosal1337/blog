---
title: Set up the starter
description: Choose a route and connect the agent to the records.
ste_mode: strict
---
# Set up the starter

Choose the route that fits where you work. Start with a copy of the example. Keep your existing project instructions.

## Use a native AI project

1. Create a project in your current AI app.
2. Add the project record and its relevant sources through the supported file or connector controls in the app.
3. Add instructions to read the current decision, cite its source, and report unresolved conflicts.
4. Start another chat in that project and run [the exercise](fresh-session-check.md).

Do not assume an upload grants access to the original folder. Local links can require separate uploads. Check which files the app can access. Refresh uploaded copies when the source changes.

## Use a local agent

1. Copy `workspace/` to a new folder. Open the agent in that folder.
2. Give the agent access to that copy and the tools needed to read it.
3. Check the active instructions before the exercise.
4. Ask the agent to resume Lantern and cite the current record.

Codex uses `AGENTS.md`. The included `CLAUDE.md` imports it for Claude Code. Check `/context` in Claude Code or inspect the instruction evidence from your client. A claim by the model that it loaded a file is not enough to prove how it loaded. See [the official guides](sources.md).

Merge the working rules into existing instructions when you adopt the kit. Do not overwrite existing project rules. The included files do not configure a sandbox, connect MCP, or grant permission.

## Use Obsidian and your phone

Open the copied workspace as an Obsidian vault. To use an existing vault, check its folder conventions before you copy the records. Use its templates with your current note structure.

For Mac and iPhone, use [the Obsidian iCloud guide](https://obsidian.md/help/sync-notes#iCloud). Use the Obsidian iCloud container, allow sync to finish, and open a sample on the phone. Extra iCloud storage is separate from the free Obsidian app. Keep a separate backup and test recovery.

## Use a task board

Connect the board through a method your agent supports. Read the current project and search for an existing task before creating one. Keep status, owner, and work notes on that board. Link the note to the task with a stable identifier.

For Elliptic, resolve the organization first. Resume the project, then read the relevant task and comments. Limited recent results can require more lookup. Verify the returned status after a change. The example contains no real board task.
