// asd-ste100 - opencode plugin, for opencode V2 and V1.
//
// One default export serves both plugin APIs:
//
//   id + setup()   opencode V2 (2.x). V2 loads a plugin DIRECTORY and
//                  resolves index.js in it. A path to a single file is
//                  refused with "configured plugin path must be a directory".
//   server()       opencode V1 (1.18.29 and newer reads this object form).
//                  The V1 hooks are unchanged from the first port.
//
// V2 has native tool hooks, so V2 needs no Claude Code hooks bridge.
// The four Claude Code hooks map like this:
//
//   Claude Code        V2 hook                          script
//   UserPromptSubmit   session "prompt" + "context"     oc-inject.py
//   PreToolUse         tool "execute.before"            ste-pregate.py
//   PostToolUse        tool "execute.after"             ste-refresh.py
//   Stop               event session.execution.succeeded  oc-gate.py
//
// V1 keeps the old split: oc-inject.py and oc-gate.py here, PreToolUse and
// PostToolUse through the opencode-claude-hooks bridge (see README.md).
//
// The PreToolUse deny really blocks on V2. A throw from execute.before
// rejects the tool call before it runs, and the model gets the reason.
// The Stop gate still cannot force a same-turn rewrite. V2 events are
// notification-only, the same as V1. oc-gate.py writes the warn file, and
// the next turn shows the warning.
//
// One system message, always. The card is merged into the last existing
// system part. It is never a second entry. A local llama.cpp Qwen chat
// template crashes on a second system message. Cloud backends do not care.
//
// Every script call fails open: a broken linter, a missing script, or an
// unexpected payload skips the feature. It never blocks a turn.
//
// Options (V2, from the "plugins" entry in opencode.json):
//   kit         path to the asd-ste100 kit. Default:
//               <opencode config dir>/asd-ste100
//   toolHooks   false turns off the PreToolUse and PostToolUse ports, for
//               a setup that still runs them through a hooks bridge.

import { execFile, execFileSync, spawn } from "node:child_process";
import os from "node:os";
import path from "node:path";

function opencodeConfigDir() {
	if (process.env.XDG_CONFIG_HOME) {
		return path.join(process.env.XDG_CONFIG_HOME, "opencode");
	}
	if (process.platform === "win32") {
		return path.join(
			process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming"),
			"opencode",
		);
	}
	return path.join(os.homedir(), ".config", "opencode");
}

const PYTHON = process.platform === "win32" ? "python" : "python3";

function kitPaths(kitDir) {
	const hook = (name) => path.join(kitDir, "hooks", name);
	return {
		inject: hook("oc-inject.py"),
		gate: hook("oc-gate.py"),
		pregate: hook("ste-pregate.py"),
		refresh: hook("ste-refresh.py"),
	};
}

function parseJson(out) {
	const text = (out || "").trim();
	if (!text) return null;
	try {
		return JSON.parse(text);
	} catch {
		return null;
	}
}

// Async on V2: the plugin runs inside the server process, so a sync call
// would stop every other session for the length of the lint.
function runPython(script, args, input, timeout = 20000) {
	return new Promise((resolve) => {
		try {
			const child = execFile(
				PYTHON,
				[script, ...args],
				{ encoding: "utf-8", timeout },
				(error, stdout) => resolve(error ? null : parseJson(stdout)),
			);
			child.stdin?.on("error", () => {});
			child.stdin?.end(input ?? "");
		} catch {
			resolve(null);
		}
	});
}

// For the end-of-turn gate. Its only output is the warn file it writes, so
// nothing waits for it. Detached, because "opencode run" stops the server
// about 0.2 s after the turn ends, and that kills an attached child.
function runPythonDetached(script, args, input) {
	try {
		const child = spawn(PYTHON, [script, ...args], {
			detached: true,
			stdio: ["pipe", "ignore", "ignore"],
		});
		child.on("error", () => {});
		child.stdin.on("error", () => {});
		child.stdin.end(input ?? "");
		child.unref();
	} catch {
		// Fail open.
	}
}

function runPythonSync(script, args, input) {
	try {
		const out = execFileSync(PYTHON, [script, ...args], {
			input: input ?? "",
			encoding: "utf-8",
			timeout: 20000,
		});
		return parseJson(out);
	} catch {
		return null;
	}
}

// ---------------------------------------------------------------- V2 ----

// Append to the last system part. Never add a second part when one exists.
// V2's OpenAI-compatible route joins all parts into one message, but other
// routes and later versions may not, so the plugin keeps the rule itself.
function mergeSystem(system, text) {
	if (!Array.isArray(system) || !text) return;
	if (system.some((part) => part?.text?.includes(text))) return;
	const last = system.length - 1;
	if (last < 0) {
		system.push({ type: "text", text });
		return;
	}
	system[last] = { ...system[last], text: `${system[last].text}\n\n${text}` };
}

// The V2 tool ids and input fields, in the shape the Claude Code hook
// scripts read. V2 calls the shell tool "shell", names a file "path" (it can
// be relative), and names an MCP tool "<server>_<tool>".
function claudePayload(event, directory, hookEventName) {
	const input =
		event.input && typeof event.input === "object" ? event.input : {};
	let toolName = event.tool;
	const toolInput = { ...input };
	if (event.tool === "shell" || event.tool === "bash") {
		toolName = "Bash";
	} else if (event.tool === "write" || event.tool === "edit") {
		toolName = event.tool === "write" ? "Write" : "Edit";
		const file = input.path ?? input.filePath ?? input.file_path;
		if (typeof file === "string") {
			toolInput.file_path = path.isAbsolute(file)
				? file
				: path.resolve(directory, file);
		}
	} else if (/^elliptic_/.test(event.tool)) {
		toolName = `mcp__elliptic__${event.tool.slice("elliptic_".length)}`;
	}
	return {
		hook_event_name: hookEventName,
		session_id: event.sessionID,
		transcript_path: "",
		cwd: directory,
		permission_mode: "default",
		tool_name: toolName,
		tool_input: toolInput,
	};
}

function gatedTool(tool) {
	return tool === "shell" || tool === "bash" || /^elliptic_/.test(tool);
}

// Same rule as normalizeContent in V2 core: content wins, then output.
function withNote(result, note) {
	const content =
		typeof result.content === "string"
			? [{ type: "text", text: result.content }]
			: Array.isArray(result.content) && result.content.length > 0
				? [...result.content]
				: [
						{
							type: "text",
							text:
								typeof result.output === "string"
									? result.output
									: JSON.stringify(result.output ?? ""),
						},
					];
	content.push({ type: "text", text: note });
	return { ...result, content };
}

async function setup(ctx) {
	const options = ctx.options ?? {};
	const kitDir = options.kit || path.join(opencodeConfigDir(), "asd-ste100");
	const scripts = kitPaths(kitDir);
	const directory = ctx.location?.directory ?? process.cwd();

	// UserPromptSubmit. "prompt" runs once when a prompt is admitted, so
	// oc-inject.py runs once per turn, the same as on Claude Code. Its
	// read-once warning and its tool-counter reset depend on that. "context"
	// runs before EVERY model request of the turn and only adds the stored
	// text, so each step of a long tool loop keeps the card.
	const cards = new Map();
	const loadCard = async (sessionID) => {
		const result = await runPython(scripts.inject, [
			"--session",
			sessionID || "",
		]);
		const text = typeof result?.system === "string" ? result.system : null;
		cards.set(sessionID, text);
		return text;
	};

	await ctx.session.hook("prompt", async (event) => {
		await loadCard(event.sessionID);
	});

	await ctx.session.hook("context", async (event) => {
		const text = cards.has(event.sessionID)
			? cards.get(event.sessionID)
			: await loadCard(event.sessionID);
		mergeSystem(event.system, text);
	});

	if (options.toolHooks !== false) {
		// PreToolUse. A throw here rejects the call before it runs.
		await ctx.tool.hook("execute.before", async (event) => {
			if (!gatedTool(event.tool)) return;
			const payload = claudePayload(event, directory, "PreToolUse");
			const result = await runPython(
				scripts.pregate,
				[],
				JSON.stringify(payload),
				15000,
			);
			const out = result?.hookSpecificOutput;
			if (out?.permissionDecision === "deny") {
				throw new Error(
					out.permissionDecisionReason || "ASD-STE100 pre-send gate: denied.",
				);
			}
		});

		// PostToolUse. The extra context goes into the tool result the model
		// reads next, the same place Claude Code puts additionalContext.
		await ctx.tool.hook("execute.after", async (event) => {
			if (event.status !== "completed") return;
			const payload = claudePayload(event, directory, "PostToolUse");
			const result = await runPython(
				scripts.refresh,
				[],
				JSON.stringify(payload),
				15000,
			);
			const note = result?.hookSpecificOutput?.additionalContext;
			if (typeof note === "string" && note)
				event.result = withNote(event.result ?? {}, note);
		});
	}

	// Stop. V2 has no session.idle event any more. The turn ends with
	// session.execution.succeeded. The reply text arrives before that, in
	// session.text.ended, so keep the text of the last assistant message.
	const replies = new Map();
	const abort = new AbortController();
	const listen = async () => {
		const stream = await ctx.event.subscribe({ signal: abort.signal });
		for await (const event of stream) {
			const data = event?.data ?? {};
			const sessionID = data.sessionID;
			if (!sessionID) continue;
			if (event.type === "session.execution.started") {
				replies.delete(sessionID);
			} else if (
				event.type === "session.text.ended" &&
				typeof data.text === "string"
			) {
				const reply = replies.get(sessionID);
				if (reply?.messageID === data.assistantMessageID)
					reply.parts.push(data.text);
				else
					replies.set(sessionID, {
						messageID: data.assistantMessageID,
						parts: [data.text],
					});
			} else if (event.type === "session.execution.succeeded") {
				const text = replies.get(sessionID)?.parts.join("\n").trim();
				replies.delete(sessionID);
				// The next prompt must read the warn file oc-gate.py writes now.
				cards.delete(sessionID);
				if (text)
					runPythonDetached(scripts.gate, ["--session", sessionID], text);
			} else if (
				event.type === "session.execution.failed" ||
				event.type === "session.execution.interrupted" ||
				event.type === "session.deleted"
			) {
				replies.delete(sessionID);
				if (event.type === "session.deleted") cards.delete(sessionID);
			}
		}
	};
	listen().catch(() => {
		// Fail open: no event stream means no end-of-turn check.
	});

	return () => abort.abort();
}

// ---------------------------------------------------------------- V1 ----

// Extract the last assistant message's plain text from a session.messages()
// response. Defensive on shape: any mismatch skips silently.
function lastAssistantText(messages) {
	if (!Array.isArray(messages)) return null;
	for (let i = messages.length - 1; i >= 0; i--) {
		const entry = messages[i];
		const info = entry?.info ?? entry;
		if (info?.role !== "assistant") continue;
		const parts = entry?.parts ?? [];
		const text = parts
			.filter((p) => p?.type === "text" && typeof p.text === "string")
			.map((p) => p.text)
			.join("\n")
			.trim();
		return text || null;
	}
	return null;
}

async function server({ client }) {
	const scripts = kitPaths(path.join(opencodeConfigDir(), "asd-ste100"));
	return {
		"experimental.chat.system.transform": async (input, output) => {
			const result = runPythonSync(scripts.inject, [
				"--session",
				input.sessionID || "",
			]);
			if (result?.system) {
				// Merge into one entry. Do not add a new one (see the header).
				// Change the array in place. V1 1.18.31 keeps its own reference
				// to output.system, so a new array never reaches the model.
				if (!Array.isArray(output.system)) return;
				const merged = [...output.system, result.system].join("\n\n");
				output.system.splice(0, output.system.length, merged);
			}
		},

		event: async ({ event }) => {
			if (event.type !== "session.idle") return;
			const sessionID = event.properties?.sessionID;
			if (!sessionID || !client) return;
			try {
				const res = await client.session.messages({ path: { id: sessionID } });
				const text = lastAssistantText(res?.data ?? res);
				if (!text) return;
				runPythonSync(scripts.gate, ["--session", sessionID], text);
			} catch {
				// Fail open.
			}
		},
	};
}

export default {
	id: "asd-ste100",
	setup,
	server,
};
