#!/usr/bin/env python3
"""Installer for the asd-ste100 skill on opencode. One command arms every
layer. Companion to ../install.py, which does the same job for Claude Code —
run both if you use both clients.

    python3 install-opencode.py              install or repair
    python3 install-opencode.py --dry-run    show the plan, write nothing
    python3 install-opencode.py --uninstall  remove what this script added

What it wires, for opencode:

1. ~/.config/opencode/asd-ste100          symlink to the repo root (one
                                           level up from this file) — both
                                           the skill content and the two
                                           opencode-only hook scripts live
                                           under here
2. ~/.config/opencode/skills/asd-ste100   symlink to the same target, so
                                           opencode's skills.paths setting
                                           picks it up (see opencode.json)
3. ~/.config/opencode/hooks.json          PreToolUse + PostToolUse entries,
                                           read by the opencode-claude-hooks
                                           bridge plugin (a separate,
                                           already-published package — see
                                           README.md's "Prereq" section).
                                           Reuses ste-pregate.py and
                                           ste-refresh.py UNCHANGED — full
                                           parity with the Claude Code side.
4. ~/.config/opencode/opencode.json       "plugin" array gets the path to
                                           opencode/plugins/asd-ste100/plugin.js
                                           appended. That plugin covers the
                                           two events the bridge does not
                                           forward — see README.md for the
                                           real gap on the Stop side.

The script is idempotent. A second run repairs the install rather than
duplicating entries. Every JSON file this script writes is backed up once,
next to itself, before the first change (opencode.json.ste-backup,
hooks.json.ste-backup).
"""
import argparse
import json
import os
import sys

SRC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # repo root
HOME = os.path.expanduser("~")
OPENCODE_DIR = os.path.join(HOME, ".config", "opencode")
OPENCODE_JSON = os.path.join(OPENCODE_DIR, "opencode.json")
HOOKS_JSON = os.path.join(OPENCODE_DIR, "hooks.json")
KIT_LINK = os.path.join(OPENCODE_DIR, "asd-ste100")
SKILL_LINK = os.path.join(OPENCODE_DIR, "skills", "asd-ste100")
PLUGIN_PATH = os.path.join(OPENCODE_DIR, "plugins", "asd-ste100", "plugin.js")

MARKER = "asd-ste100"


def ensure_link(link, target, actions, dry):
    if os.path.exists(link) and os.path.realpath(link) == os.path.realpath(target):
        actions.append("ok       {} already points here".format(link))
        return
    if os.path.islink(link):
        actions.append("relink   {} (pointed elsewhere)".format(link))
        if not dry:
            os.remove(link)
    elif os.path.isdir(link) or os.path.isfile(link):
        backup = link + ".pre-ste-backup"
        actions.append("backup   {} -> {}".format(link, backup))
        if not dry:
            if os.path.exists(backup):
                actions.append("skip     backup exists, remove {} by hand".format(link))
                return
            os.rename(link, backup)
    else:
        actions.append("link     {} -> {}".format(link, target))
    if not dry:
        os.makedirs(os.path.dirname(link), exist_ok=True)
        if not os.path.islink(link):
            os.symlink(target, link)


def drop_link(link, actions, dry):
    if os.path.islink(link) and os.path.realpath(link).startswith(os.path.realpath(SRC)):
        actions.append("unlink   {}".format(link))
        if not dry:
            os.remove(link)


def backup_once(path):
    backup = path + ".ste-backup"
    if os.path.exists(path) and not os.path.exists(backup):
        with open(path, encoding="utf-8") as fh:
            data = fh.read()
        with open(backup, "w", encoding="utf-8") as fh:
            fh.write(data)
        return True
    return False


def load_json(path):
    try:
        with open(path, encoding="utf-8") as fh:
            return json.load(fh)
    except FileNotFoundError:
        return {}
    except json.JSONDecodeError:
        print("error: {} is not valid JSON. Fix it first.".format(path))
        sys.exit(1)


def hooks_entry():
    return {
        # oc-pretooluse-wrap.py, not ste-pregate.py directly — see README.md's
        # "A second real gap" section. The wrapper computes the right answer;
        # whether it actually blocks depends on a real, confirmed bug in
        # opencode-claude-hooks itself, outside this repo's control.
        "PreToolUse": [{
            "matcher": "[Bb]ash|mcp__elliptic__.*",
            "hooks": [{"type": "command",
                       "command": "python3 {}/hooks/oc-pretooluse-wrap.py".format(KIT_LINK),
                       "timeout": 15}],
        }],
        "PostToolUse": [{
            "matcher": "*",
            "hooks": [{"type": "command",
                       "command": "python3 {}/hooks/ste-refresh.py".format(KIT_LINK),
                       "timeout": 15}],
        }],
    }


def main():
    parser = argparse.ArgumentParser(description="Install the asd-ste100 skill on opencode.")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--uninstall", action="store_true")
    args = parser.parse_args()
    dry = args.dry_run
    actions = []

    oc_config = load_json(OPENCODE_JSON)
    hooks_config = load_json(HOOKS_JSON)

    if args.uninstall:
        drop_link(SKILL_LINK, actions, dry)
        drop_link(KIT_LINK, actions, dry)
        for event in ("PreToolUse", "PostToolUse"):
            groups = hooks_config.get("hooks", {}).get(event, [])
            kept = [g for g in groups
                    if not any(MARKER in h.get("command", "") or "ste-pregate" in h.get("command", "")
                               or "ste-refresh" in h.get("command", "")
                               or "oc-pretooluse-wrap" in h.get("command", "")
                               for h in g.get("hooks", []))]
            if kept:
                hooks_config.setdefault("hooks", {})[event] = kept
            else:
                hooks_config.get("hooks", {}).pop(event, None)
        plugins = oc_config.get("plugin", [])
        before = len(plugins)
        plugins = [p for p in plugins if not (isinstance(p, str) and MARKER in p)]
        if len(plugins) != before:
            actions.append("remove   asd-ste100 entry from opencode.json plugin array")
            oc_config["plugin"] = plugins
    else:
        ensure_link(KIT_LINK, SRC, actions, dry)
        ensure_link(SKILL_LINK, SRC, actions, dry)

        hooks_config.setdefault("hooks", {}).update(hooks_entry())
        actions.append("set      PreToolUse + PostToolUse in hooks.json")

        plugins = oc_config.setdefault("plugin", [])
        if not any(isinstance(p, str) and p == PLUGIN_PATH for p in plugins):
            plugins.append(PLUGIN_PATH)
            actions.append("add      {} to opencode.json plugin array".format(PLUGIN_PATH))
        else:
            actions.append("ok       plugin already registered in opencode.json")

    if not dry:
        os.makedirs(OPENCODE_DIR, exist_ok=True)
        if backup_once(HOOKS_JSON):
            actions.append("backup   hooks.json -> hooks.json.ste-backup")
        with open(HOOKS_JSON, "w", encoding="utf-8") as fh:
            json.dump(hooks_config, fh, indent=2)
            fh.write("\n")
        if backup_once(OPENCODE_JSON):
            actions.append("backup   opencode.json -> opencode.json.ste-backup")
        with open(OPENCODE_JSON, "w", encoding="utf-8") as fh:
            json.dump(oc_config, fh, indent=2)
            fh.write("\n")

    for line in actions:
        print(line)
    print("{}{}. Prereq for PreToolUse/PostToolUse: opencode-claude-hooks installed "
          "in ~/.config/opencode (npm install, in that directory) and registered "
          "in opencode.json's plugin array — see README.md. Restart opencode to "
          "load the hooks.".format(
              "planned " if dry else "",
              "uninstalled" if args.uninstall else "installed"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
