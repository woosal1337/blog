// asd-ste100 — opencode plugin
//
// Ports three of the four Claude Code hooks that are not covered by the
// opencode-claude-hooks bridge plugin (PreToolUse and PostToolUse ARE
// covered by that bridge — see ~/.config/opencode/hooks.json, which reuses
// ste-pregate.py and ste-refresh.py unchanged):
//
//   experimental.chat.system.transform  → UserPromptSubmit equivalent
//                                          (calls oc-inject.py)
//   event, filtered to session.idle     → Stop equivalent
//                                          (calls oc-gate.py)
//
// Known real gap, not a bug: opencode's event hook is notification-only
// (returns void). There is no exposed way for a plugin to block a finished
// turn and force a same-turn rewrite, the way Claude Code's Stop hook can.
// oc-gate.py writes the same warn-state file either way; a reply that would
// have been hard-blocked in Claude Code instead surfaces a stronger warning
// on the NEXT turn, via oc-inject.py. See oc-gate.py's own header for the
// full reasoning.
//
// Layout once installed:
//   ~/.config/opencode/plugins/asd-ste100/
//   ├── package.json
//   └── plugin.js              ← this file
//   ~/.config/opencode/asd-ste100/
//   ├── hooks/oc-inject.py, oc-gate.py, ste-pregate.py, ste-refresh.py
//   └── scripts/ste-lint.py

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import os from 'node:os';
import path from 'node:path';

function opencodeConfigDir() {
  if (process.env.XDG_CONFIG_HOME) {
    return path.join(process.env.XDG_CONFIG_HOME, 'opencode');
  }
  if (process.platform === 'win32') {
    return path.join(
      process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'),
      'opencode'
    );
  }
  return path.join(os.homedir(), '.config', 'opencode');
}

const kitDir = path.join(opencodeConfigDir(), 'asd-ste100');
const injectScript = path.join(kitDir, 'hooks', 'oc-inject.py');
const gateScript = path.join(kitDir, 'hooks', 'oc-gate.py');

function runPython(scriptPath, args, input) {
  try {
    const out = execFileSync('python3', [scriptPath, ...args], {
      input: input ?? '',
      encoding: 'utf-8',
      timeout: 20000,
    });
    return JSON.parse(out);
  } catch (e) {
    // Fails open, same rule every original hook uses: a broken linter or a
    // missing script never blocks the turn, it just skips the feature.
    return null;
  }
}

// Extract the last assistant message's plain text from a session.messages()
// response. Defensive on shape — this is advisory tooling, not a contract
// with the SDK, so any mismatch here should skip silently, not throw.
function lastAssistantText(messages) {
  if (!Array.isArray(messages)) return null;
  for (let i = messages.length - 1; i >= 0; i--) {
    const entry = messages[i];
    const info = entry?.info ?? entry;
    if (info?.role !== 'assistant') continue;
    const parts = entry?.parts ?? [];
    const text = parts
      .filter((p) => p?.type === 'text' && typeof p.text === 'string')
      .map((p) => p.text)
      .join('\n')
      .trim();
    return text || null;
  }
  return null;
}

export const AsdSte100Plugin = async ({ client }) => ({
  'experimental.chat.system.transform': async (input, output) => {
    const result = runPython(injectScript, ['--session', input.sessionID || '']);
    if (result?.system) {
      output.system = output.system || [];
      output.system.push(result.system);
    }
  },

  event: async ({ event }) => {
    if (event.type !== 'session.idle') return;
    const sessionID = event.properties?.sessionID;
    if (!sessionID || !client) return;
    try {
      const res = await client.session.messages({ path: { id: sessionID } });
      const messages = res?.data ?? res;
      const text = lastAssistantText(messages);
      if (!text) return;
      runPython(gateScript, ['--session', sessionID], text);
    } catch (e) {
      // Same fail-open rule — a session.messages() shape mismatch or a
      // transient API error skips this turn's check, never blocks anything.
    }
  },
});

export default AsdSte100Plugin;
